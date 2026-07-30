# Pipeline Contract: `$OP_STORY_BLOG_CHAIN_CMD` seam

This is the normative contract for **Entry Mode A**. It documents what the `op story` adapter
(`agentic_meta_dev/src/operator_core/adapters/story.py`, method `_invoke_blog_chain`) actually
sends today, byte-for-byte, plus what this skill must return.

## 1. Invocation

`op story approve_draft` runs, roughly:

```python
run = adapter_base.run_subprocess(
    shlex.split(os.environ["OP_STORY_BLOG_CHAIN_CMD"]),
    cwd=str(self._signal_repo()),           # this repo (signal_to_system)
    input_text=json.dumps(payload, indent=2),
    timeout=900.0,                           # 15 minutes, hard
)
if run.returncode == 0 and run.stdout.strip():
    return run.stdout
# else: falls back to a no-model raw-dump template (the thing this skill exists to replace)
```

Consequences for anything wired to `OP_STORY_BLOG_CHAIN_CMD`:

- **cwd is always this repo** (`signal_to_system`, or wherever `OP_STORY_SIGNAL_REPO` points; see
  §4). Relative paths in the command/prompt resolve from here.
- **stdin is the JSON payload below, once, then EOF.** Do not expect interactive turns.
- **stdout, in full, becomes the draft** if the process exits 0 and stdout is non-empty after
  stripping whitespace. There is no secondary parse step that discards preamble; whatever is
  printed is what lands in the file. Print **only** the finished MDX: YAML frontmatter fenced by
  `---`, then the body. No commentary, no "Here's the story:", no wrapping markdown code fence
  around the whole document.
- **A non-zero exit, or empty stdout, silently falls back** to op's built-in no-model template,
  which is exactly the raw-AAR-dump shape this skill exists to prevent. Fail loudly to logs/stderr,
  but still exit non-zero rather than printing something malformed to stdout.
- **900-second hard timeout.** Anything delegated to ICA (see SKILL.md "The Editorial Chain") must
  complete, end to end, well inside that budget; leave margin for the local voice-writer/humanizer
  pass that runs after the delegate returns.

## 2. Input JSON shape (stdin)

```json
{
  "pointer": {
    "id": "uuid",
    "aar_path": "/absolute/path/to/AAR.md",
    "project": "agentic-node",
    "title": "Agentic Node Bootstrap",
    "date": "2026-06-15",
    "session": null,
    "domains": ["infra", "podman", "deploy"],
    "source": "manual | frontmatter | glob | ccdash_synthetic | ccdash_aar_review",
    "metrics": {},
    "status": "held",
    "content_hash": "sha256..."
  },
  "aar": "<scrubbed AAR markdown, full text, already passed PublicSafetyScrubber>",
  "forensic": {
    "git": "<`git log --oneline --follow` output for the AAR file, or empty string>",
    "ccdash": "<`ccdash report aar --feature <session>` markdown output, or empty string>"
  },
  "schema": "signal_to_system.posts.dev_story"
}
```

Field notes:

- `pointer.title`/`pointer.date` are **advisory**: the AAR's own frontmatter (`doc_type: aar`,
  `feature_slug`, embedded title) is usually more precise. Prefer AAR content; fall back to pointer
  fields when the AAR is unstamped.
- `pointer.domains` is the closest thing to a tag/topic hint from the op side, but it is **not**
  validated against this repo's taxonomy: run every value through `TAG_REGISTRY` /
  `AOS_AREAS_REGISTRY` membership before using it (see `frontmatter-contract.md`).
  `pointer.project` is similarly a free-text hint, not a `PROJECTS_REGISTRY` slug.
- `forensic.git`/`forensic.ccdash` are **best-effort and frequently empty**. CCDash may be
  unreachable, or the AAR file may have no git history worth showing. Never treat their absence as
  an error; treat their presence as bonus context (see `enrichment-sources.md`).
- `schema` is currently the literal string `"signal_to_system.posts.dev_story"`, a leftover from
  before the `stories` collection existed. It identifies the *shape of this payload contract*, not
  the target collection. Do not infer from it that output belongs in `src/content/posts/`; it
  always belongs in `src/content/stories/`. This is flagged as an op-side follow-up (rename to a
  stories-scoped id) in `docs/dev-stories/frontmatter-contract.md` §"Follow-ups for the op side".

## 3. Output shape (stdout)

One complete MDX document:

```mdx
---
title: "..."
excerpt: "..."
date: 2026-07-30
readTime: "7 min read"
status: draft
storyType: after-action
tags: ["agent-ready-repos", "human-ai-workflow"]
automated: true
sourceAar: "<safe label, see below>"
projects: ["agentic-node"]
aos: true
aosAreas: ["infra"]
workflow:
  orchestrator: "..."
  model: "..."
  tokens: 123456
  tier: 3
  points: 24
  commits: 7
---

<narrative body per SKILL.md "Output Story Shape">
```

Everything here must independently satisfy `references/frontmatter-contract.md`; this contract
only governs the transport, not the field-by-field rules.

`sourceAar` is a free-text label, not a filesystem path. Never emit `pointer.aar_path` (an
absolute local path) into public MDX. Use something like the AAR's own title/feature-slug, or
`pointer.project` + `pointer.date`.

## 4. Environment variables

| Var | Read by | Meaning | Default |
|---|---|---|---|
| `OP_STORY_BLOG_CHAIN_CMD` | op-side (`story.py::_invoke_blog_chain`) | The command line this skill's chain is wired to. Split with `shlex.split`, so quote carefully. | unset: op's raw-dump fallback (no model) |
| `OP_STORY_SIGNAL_REPO` | op-side (`story.py::_signal_repo`) | Absolute path to this repo. Sets the `cwd` the chain command runs in and the repo `op story approve_draft` writes/commits/pushes/opens the PR against. | `../signal_to_system` relative to `agentic_meta_dev` |
| `GH_TOKEN` (or `GITHUB_TOKEN`) | the `gh` CLI itself, **not** read directly by `story.py` | Non-interactive auth for `gh pr create --draft`, which `op story approve_draft` runs against `OP_STORY_SIGNAL_REPO` **after** this skill's chain returns. Only matters for the surrounding pipeline run, not for this skill's own process, but if unset in an unattended run, the whole pipeline fails after a successful draft, which looks like this skill's fault. | none; `gh` degrades to its own auth resolution / fails |

## 5. Wiring the command

No literal wrapper script ships in this skill (see SKILL.md "Deferred / Do Not Say"). Point
`OP_STORY_BLOG_CHAIN_CMD` at a command that:

1. Is invokable as a single shlex-splittable string (no shell pipes/redirects; `shlex.split`
   doesn't run a shell).
2. Reads stdin fully, follows `workflows/single-story.md` against the JSON contract above, and
   prints only the finished MDX to stdout.
3. Returns within well under 900s.

Two shapes satisfy that today:

- **Headless Claude Code**, instructed (via its prompt) to load this skill and execute
  `workflows/single-story.md` against stdin. The prompt text itself, not a flag, is what points it
  at this skill; reference the skill and this file by absolute path in the prompt.
- **ICA-backed Claude Code** for the same invocation, via `~/ica-claude.sh`, when the intent is to
  run the whole pipeline seam on cost-shifted capacity rather than just the drafting sub-step (see
  SKILL.md "The Editorial Chain" for the narrower per-step delegation case, which is the more
  common path; this whole-seam case is coarser-grained).

Either way, the *process* invoked by `OP_STORY_BLOG_CHAIN_CMD` is the "driving session" SKILL.md
refers to: it may itself delegate the drafting substep further out (to ICA), but it owns stdout and
must not hand that ownership to a delegate.
