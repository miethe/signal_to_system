#!/usr/bin/env python3
"""read_catalog.py: extract frontmatter across src/content/{posts,stories} (stdlib-only, offline).

Used by the dev-story-editor skill's workflows for dedup, series-continuity, and taxonomy-in-use
checks before drafting or redrafting a story (see ../references/enrichment-sources.md §1). Never
calls a model or the network; reads local MDX/MD files only.

This ships its own minimal YAML-subset frontmatter parser rather than importing PyYAML, per the
skill's "offline and stdlib-only" scripts constraint. It supports what this repo's Astro content
frontmatter actually uses: scalar/quoted values, flow lists (`["a", "b"]`), block lists (`- item`,
including PyYAML's same-indent-as-key convention), one level of nested mapping (e.g. the
`workflow:` block), and multi-line-wrapped scalars (both the plain "line got too long" wrap and a
double-quoted scalar with a backslash line-continuation). Multi-line handling is BEST-EFFORT: it
joins continuation lines with a single space rather than reproducing YAML's exact folding rules.
That is adequate for this script's job (fuzzy dedup / cataloging), not a byte-exact YAML round
trip; the canonical parse of any given file is Astro's own content-collection loader at build
time, not this script.

Usage:
    python3 read_catalog.py [--repo-root PATH] [--collection posts|stories|all]

Output: a JSON array of {collection, slug, path, frontmatter} records to stdout, one record per
content file found. Missing collections/files are simply absent from the output, never an error.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any

FENCE = "---"

_UNESCAPE_RE = re.compile(r"\\u([0-9a-fA-F]{4})|\\n|\\t|\\\"|\\\\")
_KEY_LINE_RE = re.compile(r"^([^:\s][^:]*):\s*(.*)$")


def _unescape_double_quoted(text: str) -> str:
    """Best-effort unescape for the double-quote escapes this repo's frontmatter actually uses."""

    def repl(match: "re.Match[str]") -> str:
        if match.group(1):
            return chr(int(match.group(1), 16))
        table = {"\\n": "\n", "\\t": "\t", '\\"': '"', "\\\\": "\\"}
        return table[match.group(0)]

    return _UNESCAPE_RE.sub(repl, text)


def _strip_quotes(raw: str) -> str:
    raw = raw.strip()
    if len(raw) >= 2 and raw[0] == raw[-1] and raw[0] in "\"'":
        inner = raw[1:-1]
        return _unescape_double_quoted(inner) if raw[0] == '"' else inner
    return raw


def _split_flow_list(inner: str) -> list[str]:
    items: list[str] = []
    current: list[str] = []
    depth = 0
    quote: str | None = None
    for ch in inner:
        if quote:
            current.append(ch)
            if ch == quote:
                quote = None
            continue
        if ch in "\"'":
            quote = ch
            current.append(ch)
            continue
        if ch == "," and depth == 0:
            items.append("".join(current))
            current = []
            continue
        if ch in "[{":
            depth += 1
        if ch in "]}":
            depth -= 1
        current.append(ch)
    if current:
        items.append("".join(current))
    return items


def _parse_scalar(raw: str) -> Any:
    raw = raw.strip()
    if raw == "" or raw in ("null", "~"):
        return None
    if raw in ("true", "True"):
        return True
    if raw in ("false", "False"):
        return False
    if raw.startswith("[") and raw.endswith("]"):
        inner = raw[1:-1].strip()
        if not inner:
            return []
        return [_strip_quotes(item.strip()) for item in _split_flow_list(inner)]
    if re.fullmatch(r"-?\d+", raw):
        return int(raw)
    if re.fullmatch(r"-?\d+\.\d+", raw):
        return float(raw)
    return _strip_quotes(raw)


def _indent(line: str) -> int:
    return len(line) - len(line.lstrip(" "))


def _is_new_entry(line: str) -> bool:
    stripped = line.strip()
    if not stripped or stripped.startswith("#"):
        return True
    if stripped.startswith("- "):
        return True
    return bool(_KEY_LINE_RE.match(stripped))


def _unclosed_double_quote(val: str) -> bool:
    """True if `val` opens a double-quoted scalar with no matching close on the same line."""
    if not val.startswith('"'):
        return False
    escaped = False
    closed = False
    for ch in val[1:]:
        if escaped:
            escaped = False
            continue
        if ch == "\\":
            escaped = True
            continue
        if ch == '"':
            closed = True
    return not closed


def _collect_continuation(lines: list[str], i: int, base_indent: int) -> tuple[list[str], int]:
    """Collect raw continuation lines for a scalar that started on the key's own line."""
    parts: list[str] = []
    n = len(lines)
    while i < n:
        line = lines[i]
        if not line.strip():
            break
        if _indent(line) <= base_indent or _is_new_entry(line):
            break
        parts.append(line.strip())
        i += 1
    return parts, i


def _join_wrapped(first: str, continuation: list[str]) -> str:
    """Best-effort join: drop a trailing line-continuation backslash, otherwise join with a space."""
    parts = [first[:-1] if first.endswith("\\") else first]
    for idx, part in enumerate(continuation):
        is_last = idx == len(continuation) - 1
        parts.append(part[:-1] if (part.endswith("\\") and not is_last) else part)
    return " ".join(p for p in parts if p != "")


def parse_frontmatter_yaml(lines: list[str]) -> dict[str, Any]:
    """Minimal stdlib YAML-subset parser for Astro content frontmatter. See module docstring."""
    root: dict[str, Any] = {}
    stack: list[tuple[int, Any]] = [(-1, root)]
    i = 0
    n = len(lines)
    while i < n:
        raw_line = lines[i]
        if not raw_line.strip() or raw_line.strip().startswith("#"):
            i += 1
            continue
        indent = _indent(raw_line)
        line = raw_line.strip()

        if line.startswith("- "):
            while len(stack) > 1 and indent < stack[-1][0]:
                stack.pop()
            parent = stack[-1][1]
            if isinstance(parent, list):
                parent.append(_parse_scalar(line[2:]))
            i += 1
            continue

        while len(stack) > 1 and indent <= stack[-1][0]:
            stack.pop()
        parent = stack[-1][1]
        if not isinstance(parent, dict):
            i += 1
            continue

        match = _KEY_LINE_RE.match(line)
        if not match:
            i += 1
            continue
        key = _strip_quotes(match.group(1).strip())
        val = match.group(2).strip()

        if val in (">-", "|", ">", "|-"):
            continuation, i = _collect_continuation(lines, i + 1, indent)
            parent[key] = " ".join(continuation)
            continue

        if val == "":
            nxt = lines[i + 1].strip() if i + 1 < n else ""
            if nxt.startswith("- "):
                new_list: list[Any] = []
                parent[key] = new_list
                stack.append((indent, new_list))
            else:
                new_map: dict[str, Any] = {}
                parent[key] = new_map
                stack.append((indent, new_map))
            i += 1
            continue

        if _unclosed_double_quote(val):
            continuation, i = _collect_continuation(lines, i + 1, indent)
            parent[key] = _strip_quotes('"' + _join_wrapped(val[1:], continuation))
            continue

        # Plain scalar that may still wrap onto indented continuation lines.
        continuation, next_i = _collect_continuation(lines, i + 1, indent)
        if continuation:
            parent[key] = _join_wrapped(val, continuation)
            i = next_i
            continue

        parent[key] = _parse_scalar(val)
        i += 1
    return root


def extract_frontmatter(text: str) -> dict[str, Any]:
    lines = text.splitlines()
    if not lines or lines[0].strip() != FENCE:
        return {}
    end = None
    for idx in range(1, len(lines)):
        if lines[idx].strip() == FENCE:
            end = idx
            break
    if end is None:
        return {}
    return parse_frontmatter_yaml(lines[1:end])


def iter_collection(repo_root: Path, collection: str):
    coll_dir = repo_root / "src" / "content" / collection
    if not coll_dir.exists():
        return
    for path in sorted(coll_dir.rglob("*")):
        if path.suffix.lower() not in (".md", ".mdx"):
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except OSError:
            continue
        yield {
            "collection": collection,
            "slug": path.relative_to(coll_dir).with_suffix("").as_posix(),
            "path": str(path),
            "frontmatter": extract_frontmatter(text),
        }


def _default_repo_root() -> Path:
    # .claude/skills/dev-story-editor/scripts/read_catalog.py -> repo root is 4 parents up.
    return Path(__file__).resolve().parents[4]


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo-root", default=None, help="Repo root (default: inferred)")
    parser.add_argument(
        "--collection", choices=("posts", "stories", "all"), default="all",
        help="Which content collection(s) to read (default: all)",
    )
    args = parser.parse_args(argv)

    repo_root = Path(args.repo_root).expanduser().resolve() if args.repo_root else _default_repo_root()
    collections = ("posts", "stories") if args.collection == "all" else (args.collection,)

    records: list[dict[str, Any]] = []
    for collection in collections:
        records.extend(iter_collection(repo_root, collection))

    json.dump(records, sys.stdout, indent=2, default=str, sort_keys=False)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
