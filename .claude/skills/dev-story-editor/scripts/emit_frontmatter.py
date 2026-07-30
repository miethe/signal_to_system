#!/usr/bin/env python3
"""emit_frontmatter.py: assemble + validate the `stories` collection YAML block (stdlib-only).

Given a plain dict, builds a YAML frontmatter block that conforms to the `stories` collection
schema (src/content.config.ts) and validates it against the rules in
../references/frontmatter-contract.md and ../../../../docs/dev-stories/frontmatter-contract.md
before returning it. Fails loudly (raises `FrontmatterError`) on a missing required key, an
invalid enum value, or a taxonomy slug that isn't registered in src/data/taxonomy.ts; it never
silently coerces or drops a bad value into something "close enough."

This does NOT import PyYAML; it emits YAML with a small hand-rolled writer covering exactly the
value shapes the stories schema needs (strings, bools, ints, dates, flat lists, and one level of
nested mapping for `workflow{}`). It is not a general-purpose YAML emitter.

Usage:
    # Validate + emit a frontmatter block from a JSON dict on stdin, print the YAML block to stdout
    echo '{"title": "...", ...}' | python3 emit_frontmatter.py

    # Validate against a specific repo's taxonomy (default: inferred from this script's location)
    python3 emit_frontmatter.py --repo-root /path/to/signal_to_system < frontmatter.json

Exit code 0 + the YAML block (between `---` fences) on stdout on success. Exit code 1 + a
human-readable list of every violation (not just the first) on stderr on failure; nothing is
printed to stdout on failure.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any


class FrontmatterError(ValueError):
    """Raised with every violation found, not just the first."""

    def __init__(self, errors: list[str]) -> None:
        self.errors = errors
        super().__init__("; ".join(errors))


REQUIRED_KEYS = ("title", "excerpt", "date", "readTime", "status", "storyType", "tags")
STATUS_VALUES = ("draft", "published", "evergreen")
STORY_TYPE_VALUES = ("after-action", "feature-story", "build-note")
WORKFLOW_KEYS = (
    "version", "orchestrator", "model", "tokens", "tier", "points", "commits", "runId", "intentId",
)
# Fields this skill must never set past draft (SKILL.md Guardrails: "never publish").
SKILL_ENFORCED_STATUS = "draft"


def _default_repo_root() -> Path:
    # .claude/skills/dev-story-editor/scripts/emit_frontmatter.py -> repo root is 4 parents up.
    return Path(__file__).resolve().parents[4]


def _registry_blocks(text: str) -> dict[str, str]:
    """Split taxonomy.ts into per-`export const NAME` slices (declaration order, not hardcoded).

    Avoids a bracket-matching regex against the array literal: `NAME: SomeType[] = [...]` embeds
    a `]` in the *type annotation* itself (`SomeType[]`), which breaks a naive `[^\\]]*?\\];`
    non-greedy match before it ever reaches the array's real closing bracket. Slicing from one
    top-level `export const` to the next sidesteps that entirely.
    """
    markers = [(m.start(), m.group(1)) for m in re.finditer(r"^export const (\w+)", text, re.MULTILINE)]
    blocks: dict[str, str] = {}
    for idx, (start, name) in enumerate(markers):
        end = markers[idx + 1][0] if idx + 1 < len(markers) else len(text)
        blocks[name] = text[start:end]
    return blocks


def load_registries(repo_root: Path) -> dict[str, set[str]]:
    taxonomy_path = repo_root / "src" / "data" / "taxonomy.ts"
    try:
        text = taxonomy_path.read_text(encoding="utf-8")
    except OSError:
        return {"projects": set(), "aos_areas": set(), "tags": set()}
    blocks = _registry_blocks(text)
    return {
        "projects": set(re.findall(r'slug:\s*"([^"]+)"', blocks.get("PROJECTS_REGISTRY", ""))),
        "aos_areas": set(re.findall(r'slug:\s*"([^"]+)"', blocks.get("AOS_AREAS_REGISTRY", ""))),
        "tags": set(re.findall(r'slug:\s*"([^"]+)"', blocks.get("TAG_REGISTRY", ""))),
    }


def validate_frontmatter(data: dict[str, Any], registries: dict[str, set[str]]) -> list[str]:
    errors: list[str] = []

    for key in REQUIRED_KEYS:
        if not data.get(key) and data.get(key) != 0:
            errors.append(f"missing required key: {key!r}")

    status = data.get("status")
    if status is not None and status != SKILL_ENFORCED_STATUS:
        errors.append(
            f"status must be {SKILL_ENFORCED_STATUS!r} from this skill (got {status!r}); "
            "publishing is a separate human act, see SKILL.md Guardrails"
        )

    story_type = data.get("storyType")
    if story_type is not None and story_type not in STORY_TYPE_VALUES:
        errors.append(f"storyType {story_type!r} not in {STORY_TYPE_VALUES}")

    tags = data.get("tags")
    if tags is not None:
        if not isinstance(tags, list) or not tags:
            errors.append("tags must be a non-empty list")
        elif registries.get("tags"):
            unknown = [t for t in tags if t not in registries["tags"]]
            if unknown:
                errors.append(f"tags not in TAG_REGISTRY: {unknown}")

    projects = data.get("projects")
    if projects is not None:
        if not isinstance(projects, list):
            errors.append("projects must be a list")
        elif registries.get("projects"):
            unknown = [p for p in projects if p not in registries["projects"]]
            if unknown:
                errors.append(f"projects not in PROJECTS_REGISTRY: {unknown}")

    aos_areas = data.get("aosAreas")
    if aos_areas is not None:
        if not isinstance(aos_areas, list):
            errors.append("aosAreas must be a list")
        elif registries.get("aos_areas"):
            unknown = [a for a in aos_areas if a not in registries["aos_areas"]]
            if unknown:
                errors.append(f"aosAreas not in AOS_AREAS_REGISTRY: {unknown}")
        if aos_areas and not data.get("aos"):
            errors.append("aosAreas set without aos: true")

    workflow = data.get("workflow")
    if workflow is not None:
        if not isinstance(workflow, dict):
            errors.append("workflow must be an object")
        else:
            unknown_keys = [k for k in workflow if k not in WORKFLOW_KEYS]
            if unknown_keys:
                errors.append(f"workflow has unrecognized keys: {unknown_keys}")

    source_aar = data.get("sourceAar")
    if isinstance(source_aar, str) and (source_aar.startswith("/") or source_aar.startswith("~")):
        errors.append(
            "sourceAar looks like a filesystem path, not a safe label; "
            "see references/pipeline-contract.md §3"
        )

    for key in ("title", "excerpt", "sourceAar", "whyItMatters", "leaderTakeaway"):
        value = data.get(key)
        if isinstance(value, str) and ("—" in value or "–" in value):
            errors.append(f"{key!r} contains an em-dash/en-dash: see references/voice-rules.md")

    return errors


def _yaml_scalar(value: Any) -> str:
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, (int, float)):
        return str(value)
    if value is None:
        return "null"
    text = str(value)
    needs_quotes = (
        text == ""
        or text[0] in "\"'#[]{}!&*|>%@`"
        or text.strip() != text
        or ": " in text
        or text.lower() in ("true", "false", "null", "~")
        or re.fullmatch(r"-?\d+(\.\d+)?", text) is not None
    )
    if not needs_quotes:
        return text
    escaped = text.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def _yaml_lines(data: dict[str, Any], indent: int = 0) -> list[str]:
    pad = "  " * indent
    lines: list[str] = []
    for key, value in data.items():
        if value is None:
            continue
        if isinstance(value, dict):
            if not value:
                continue
            lines.append(f"{pad}{key}:")
            lines.extend(_yaml_lines(value, indent + 1))
        elif isinstance(value, list):
            if not value:
                lines.append(f"{pad}{key}: []")
                continue
            lines.append(f"{pad}{key}:")
            for item in value:
                lines.append(f"{pad}  - {_yaml_scalar(item)}")
        else:
            lines.append(f"{pad}{key}: {_yaml_scalar(value)}")
    return lines


def build_frontmatter_yaml(data: dict[str, Any], *, repo_root: Path | None = None) -> str:
    """Validate `data` and return a `---`-fenced YAML block. Raises FrontmatterError on failure."""
    registries = load_registries(repo_root or _default_repo_root())
    errors = validate_frontmatter(data, registries)
    if errors:
        raise FrontmatterError(errors)
    body = "\n".join(_yaml_lines(data))
    return f"---\n{body}\n---\n"


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo-root", default=None, help="Repo root (default: inferred)")
    parser.add_argument("--input", default="-", help="Path to a JSON dict file, or '-' for stdin")
    args = parser.parse_args(argv)

    raw = sys.stdin.read() if args.input == "-" else Path(args.input).read_text(encoding="utf-8")
    try:
        data = json.loads(raw)
    except json.JSONDecodeError as exc:
        print(f"invalid JSON input: {exc}", file=sys.stderr)
        return 1
    if not isinstance(data, dict):
        print("input must be a JSON object", file=sys.stderr)
        return 1

    repo_root = Path(args.repo_root).expanduser().resolve() if args.repo_root else _default_repo_root()
    try:
        block = build_frontmatter_yaml(data, repo_root=repo_root)
    except FrontmatterError as exc:
        print("frontmatter validation failed:", file=sys.stderr)
        for error in exc.errors:
            print(f"  - {error}", file=sys.stderr)
        return 1

    sys.stdout.write(block)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
