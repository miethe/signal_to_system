---
name: dev-story-editor
description: >-
  Turns a sanitized AAR (after-action report) into an EDITORIALIZED Signal to System Dev Story:
  a narrative with cross-cutting context, called-out wins/losses, and an Agentic-OS-arc framing,
  never a raw AAR dump, and emits the "stories" collection frontmatter (workflow / projects /
  aos / aosAreas / storyType). Use when acting as the `op story` pipeline blog-chain seam
  ($OP_STORY_BLOG_CHAIN_CMD, JSON in on stdin / MDX out on stdout), when redrafting pending
  `status: draft` stories in `src/content/stories/` or open `story/*` PRs in one batched pass, or
  when asked to backfill/repair Dev Story frontmatter. Triggers: "editorialize this AAR", "draft
  a dev story", "redraft the story backlog", "op story blog chain", "dev story frontmatter", "turn
  this AAR into a story". Do NOT use for: hand-authored essays (`blog-drafter` / `voice-writer`
  directly), editing the `op story` adapter code itself (that lives in `agentic_meta_dev`, not this
  repo), or publishing a story past draft (this skill never merges: drafts + PR only).
version: 0.1
app_version: "2026-07-30"
updated: 2026-07-30
spec: ./references/pipeline-contract.md
---

# dev-story-editor

Owns the last mile of the Signal→System pipeline: given a sanitized AAR (plus whatever forensic
and catalog context it can gather), produce a **story**, not a transcript, and then emit
frontmatter that conforms to the `stories` collection schema (`src/content.config.ts`).

## What It Does

- Reads a sanitized AAR (and optional forensic context) and drafts a Dev Story: a narrative lede,
  the stated goal, what actually happened, explicit **Wins** and **Losses**, the meta-findings that
  changed the workflow, and how the work fits the broader Agentic OS arc, with the raw AAR
  preserved verbatim in a collapsed appendix, never inlined as the body.
- Assigns `storyType`, `projects[]`, `aos`, `aosAreas[]`, and the `workflow{}` block from AAR
  content, the op-story pointer, and CCDash feature metrics, never from invention.
- Runs the editorial chain (`blog-drafter` draft → `voice-writer` calibration → `humanizer` last)
  and enforces the site's no-em-dash prose rule.
- Never publishes. Output is always `status: draft` plus a PR; a human approves the merge.

## When To Use

- You are invoked as the `op story` pipeline's blog-chain command
  (`$OP_STORY_BLOG_CHAIN_CMD`); see **Entry Mode A** below.
- Someone asks to sweep `src/content/stories/*.mdx` for `status: draft` entries (or open
  `story/*` PRs) and redraft them in one batched pass; see **Entry Mode B**.
- Someone hands you a raw AAR (or a migrated-but-unedited story like
  `src/content/stories/after-action-report-fable-5-one-shot-command-center-build.mdx`, which is
  still on the old post-schema fallback shape) and asks for a proper Dev Story out of it.
- Dev Story frontmatter needs backfilling: missing `workflow{}`, `projects[]`, `aos`/`aosAreas[]`,
  or a `storyType` that doesn't match the content.

## When NOT To Use

Do NOT use this skill for:
- Hand-authored essays for `src/content/posts/`: use `/blog-drafter` and `/voice-writer` directly;
  posts are curated, not automated (`automated` doesn't even exist on the posts schema).
- Editing the `op story` adapter, its triage scoring, or its scrub/dedup logic: that code lives in
  `agentic_meta_dev` (`src/operator_core/adapters/story.py`); this skill is a consumer of its
  pipeline seam, not a maintainer of it. File follow-ups against
  `docs/dev-stories/frontmatter-contract.md` §"Follow-ups for the op side" instead.
- Merging or publishing a story. This skill's ceiling is `status: draft` + an open PR. Flipping
  `status` to `published`/`evergreen` is always a separate, human-initiated act.
- Raw, unsanitized AAR text. The AAR arriving in this skill's input MUST already have passed the
  op-side public-safety scrub (`PublicSafetyScrubber`); this skill trusts that boundary and does
  not re-implement it.

## Entry Mode A: Pipeline Seam ($OP_STORY_BLOG_CHAIN_CMD)

The `op story approve_draft` hop (agentic_meta_dev) shells out to whatever
`OP_STORY_BLOG_CHAIN_CMD` names, with **cwd = this repo**, and pipes one JSON object on stdin:

```json
{ "pointer": {...}, "aar": "<scrubbed AAR markdown>", "forensic": {"git": "...", "ccdash": "..."}, "schema": "..." }
```

This process must print **only** the finished stories MDX (YAML frontmatter + body) to stdout and
exit 0. Anything else on stdout gets treated as the draft verbatim: no chatter, no markdown code
fences around the whole file. Full field-by-field contract, timeouts, and the env vars involved:
`references/pipeline-contract.md`. Step-by-step run: `workflows/single-story.md`.

**No literal wrapper binary ships in v0.1.** `OP_STORY_BLOG_CHAIN_CMD` should point at a headless
Claude Code invocation that is instructed to follow `workflows/single-story.md` for the JSON it
receives on stdin; see `references/pipeline-contract.md` §"Wiring the command" for the exact
shape that invocation needs to satisfy.

## Entry Mode B: Batch / Interactive Redraft

Run this when asked to sweep the backlog rather than react to one pipeline call:

1. Scan `src/content/stories/*.mdx` for `status: draft` and open `story/*` PRs (`gh pr list --head
   'story/*'`).
2. For each candidate, apply the same editorial chain and frontmatter backfill as Entry Mode A,
   using the file's existing frontmatter + body as the "AAR" input where no separate raw AAR is
   available (e.g. migrated-but-unedited stories still on old post-schema fields).
3. Open **ONE** batched PR covering every redrafted story, not one PR per story.

Full steps: `workflows/batch-redraft.md`.

## The Editorial Chain

Order matters: humanizer is always last, after voice is calibrated, never before:

```
blog-drafter (draft the story shape)  →  voice-writer (calibrate to Nick's voice)  →  humanizer (strip AI-tells)
```

- **Delegate the heavy drafting pass**, not the final synthesis. Route the `blog-drafter`
  first-draft pass (and, if large, the `voice-writer` pass) to
  `~/ica-claude.sh -p "<prompt>" --model 'claude-sonnet-5[1m]'` when running non-interactively or
  when the AAR + forensic context is large; this is free/cost-shifted capacity per the model
  scorecard (global `CLAUDE.md` §"Model routing"). **Keep the final assembly, frontmatter
  emission, and the humanizer pass in the driving session**: the process that owns stdout (Entry
  Mode A) or the PR branch (Entry Mode B) is the one that must be able to vouch for the output.
  Never let a delegate's raw draft become the final artifact untouched.
- Interactively, invoke `/blog-drafter`, `/voice-writer`, `/humanizer` directly instead of shelling
  to ICA; the chain is the same, only the driver differs.

**Local-only corpus guardrail (required reading before using the delegation line above).**
The delegation line above routes the `blog-drafter` first-draft pass, and (when large) the
`voice-writer` pass, to `~/ica-claude.sh` (an external, ICA-hosted model). This is permitted
**only for the mechanical drafting/rewriting work**, on input that does not include corpus-sourced
material.

The moment `voice-writer` or `humanizer` is upgraded to read from a real local corpus store (per
those skills' Local-Only Corpus Boundary sections), the following becomes binding and must be
checked before every delegation:

- **Never** route a `voice-writer` or `humanizer` pass through `~/ica-claude.sh` (or any other
  external-gateway call: Codex, Gemini, or otherwise) if that pass will touch corpus-sourced
  material: a real story, a real opinion, a real technical detail, or any lookup against the
  corpus store.
- Any corpus-backed voice-calibration or humanization step **must run locally**, either
  in-session or via a local (non-gateway) model, never through this skill's existing ICA
  delegation line, and never through a new delegation line added later without this same
  annotation.
- If a Dev Story's voice/humanize pass needs to be delegated for cost or context-size reasons
  (the stated reason for the existing line), **split the work**: resolve the corpus-sourced
  material locally first, then delegate only the corpus-free formatting/rewriting step externally.
- This guardrail does not relax when the delegation is "just for the draft pass": `blog-drafter`'s
  first-draft pass is in scope for this same check the moment it starts consulting corpus material
  for tone/example selection, not only once `voice-writer`/`humanizer` explicitly do.

This is not a hypothetical caveat: it is the specific reason the corpus-egress boundary
(`.claude/rules/aos-operating-rules.md` § CHCW corpus, in `agentic_meta_dev`) exists at the
launchpad level, and this skill is the one place in the current editorial-skill set where an
external delegation line and a corpus-touching voice-calibration pass are already documented as
capable of colliding.

## Enrichment Sources

Gather before drafting, not after: these fill the `workflow{}` block and the wins/losses/AOS-arc
framing that a raw AAR alone can't supply.

| Source | What it gives | How |
|---|---|---|
| Local catalog | Existing `projects[]`/`aos`/`aosAreas[]`/tag vocabulary in use, series continuity, dedup signal | `scripts/read_catalog.py` over `src/content/{posts,stories}` frontmatter |
| `op recall [query]` | Persona-memory facts related to the feature/subsystem (no model call) | shell out; treat as read-only context, never as a citable metric |
| `itt` (IntentTree) | The intent/task-graph node this work traced to (scope, tier, points) | shell out if `pointer.metrics`/AAR body names an intent id |
| `ccdash report aar --feature <id> --json` | Curated cost/timing/signals/follow-ups for the feature | primary source for `workflow.tokens/tier/points/commits` |
| Research Foundry API (optional) | Prior-art / evidence bundle context, only if the AAR references a run | `GET $RF_API_URL/api/runs/<id>` with `RF_TOKEN_AGENT` |

Full source-by-source detail, precedence rules, and degrade behavior:
`references/enrichment-sources.md`.

## Frontmatter Emission + Backfill

Emit frontmatter that validates against the `stories` collection schema in
`src/content.config.ts`; required keys: `title, excerpt, date, readTime, status, storyType,
tags[]`; provenance `automated (default true), sourceAar?`; discovery `projects[], aos?,
aosAreas[]?`; optional `workflow{}`. `status` is **always** `draft` from this skill; never write
`published`/`evergreen`.

Backfill rules (source AAR body + pointer + CCDash → frontmatter fields), the `storyType`
classification heuristic, and the taxonomy-slug validation this skill must run tags/projects/areas
through before emitting: `references/frontmatter-contract.md`. The canonical, authoritative schema
+ op-side follow-ups doc lives at `docs/dev-stories/frontmatter-contract.md`: that file is the
source of truth if the two ever drift; this skill's reference is the operational mapping guide.

Use `scripts/emit_frontmatter.py` to assemble and validate the YAML block from a plain dict before
writing it into the MDX; it enforces required keys, enum values, and taxonomy-slug membership,
and fails loudly rather than silently coercing.

## Voice Rules

- **No em-dashes, ever**, in any prose this skill writes: not in frontmatter strings, not in the
  body, not in the appendix header. Use parentheses, colons, semicolons, or commas.
- `/humanizer` runs **after** `/voice-writer`, never before or in place of it: voice calibration
  first, then the naturalness pass on top of already-voiced prose.
- Full rules and the concrete patterns to avoid: `references/voice-rules.md`.

## Output Story Shape

Every emitted story body follows this order. Sections are prose headers in the body, not
frontmatter keys (only `whyItMatters`/`leaderTakeaway` have dedicated frontmatter+layout treatment
via `StoryLayout.astro`; everything else is body markdown):

1. **Narrative lede**: one paragraph that hooks on the situation, not a restated title.
2. **What we set out to do**: the stated goal/intent before the work started.
3. **What happened**: the arc of the work, compressed; not a session transcript.
4. **Wins**: an explicit `## Wins` (or `### Wins`) section; called out, not buried in prose.
5. **Losses**: an explicit `## Losses` section, same treatment; honest, not softened.
6. **What it changed / meta-findings**: what this work taught the workflow itself (process
   lessons, doctrine changes, tooling gaps found), distinct from the feature's own wins/losses.
7. **How it fits the AOS arc**: ties the work to the Agentic OS narrative, which subsystem, which
   prior post/story it extends or contradicts, what it sets up next.
8. **Collapsed raw-AAR appendix**: the scrubbed AAR verbatim, wrapped in a `<details>` block so it
   never renders as the primary content. See `references/frontmatter-contract.md`
   §"Appendix markup" for the exact snippet.

## Workflows

- `workflows/single-story.md`: the pipeline-seam run (parse stdin, enrich, draft, assemble, print
  MDX to stdout). Use for Entry Mode A.
- `workflows/batch-redraft.md`: the sweep-and-batch-PR run. Use for Entry Mode B.

## Scripts

Both are offline, Python-stdlib-only (`json`, `re`, `pathlib`, `yaml`-free: hand-rolled minimal
YAML emission to avoid a PyYAML dependency this repo doesn't otherwise carry for skills). Neither
calls a model or the network; the editorial chain is a separate, explicit step this skill's
workflows drive around them.

| Script | Purpose |
|---|---|
| `scripts/read_catalog.py` | Extract frontmatter across `src/content/{posts,stories}/*.mdx` into JSON, used for dedup, series continuity, and taxonomy-slug discovery. |
| `scripts/emit_frontmatter.py` | Assemble + validate a stories-schema YAML block from a dict; enforces required keys, enum membership, and taxonomy-slug membership before returning the block. |

## Guardrails

- **Never publish.** This skill's ceiling is `status: draft`. Flipping to `published`/`evergreen`
  is a separate human act, always.
- **Never write past `src/content/stories/`.** Do not touch `src/content/posts/`; that migration
  boundary belongs to the Dev Stories launch, not to this skill's steady-state job.
- **Never fabricate a metric.** Every number in the workflow block or the prose (tokens, tier,
  points, commits, timing) must trace to the AAR body, the op-story pointer, or a CCDash/RF read.
  If a number isn't there, omit the field; don't estimate and don't round to something plausible.
- **Never invent taxonomy.** `projects[]`, `aosAreas[]`, and `tags[]` values must exist in
  `PROJECTS_REGISTRY` / `AOS_AREAS_REGISTRY` / `TAG_REGISTRY` (`src/data/taxonomy.ts`). Unmapped
  signal is omitted, not coined as a new slug.
- **One batched PR per Entry Mode B run**, not one PR per story; see `workflows/batch-redraft.md`.
- **Reuse the frozen components/helpers.** `hrefFor()`, `StoryCard.astro`, `AutomatedDisclaimer.astro`,
  `StoryMetaHeader.astro`, `StoryLayout.astro` are frozen and already wired to this schema; this
  skill emits data for them, it does not reimplement their rendering.

## Deferred / Do Not Say

| Claim | Status |
|---|---|
| "This skill publishes the story" | Never: draft + PR only. Do NOT say this skill can merge or flip `status`. |
| "Missing metrics get estimated from context" | Not built, and never will be; missing means omitted. Do NOT say a number was "approximated." |
| "The raw AAR gets summarized away" | Wrong: it is preserved verbatim in the collapsed appendix. Do NOT say detail is lost. |
| "`OP_STORY_BLOG_CHAIN_CMD` ships a ready-made wrapper script in this skill" | Not in v0.1; only `read_catalog.py`/`emit_frontmatter.py` (offline helpers) exist under `scripts/`. Do NOT say there's a turnkey chain binary here; see `references/pipeline-contract.md` §"Wiring the command". |
| "`op story` on the agentic_meta_dev side already targets `src/content/stories/`" | Not yet: as of this writing it still targets `src/content/posts/` with the old post schema and schema id `signal_to_system.posts.dev_story`. That's an open follow-up; see `docs/dev-stories/frontmatter-contract.md` §"Follow-ups for the op side". Do NOT say the op-side wiring is done. |
| "AAR discovery on the op side finds every AAR" | Known gap: `op story scan`'s repo walk matches `type: aar` frontmatter or a `*-aar.md` filename glob; newer AARs stamped `doc_type: aar` + `feature_slug` (e.g. `aar.md`, `AAR-<date>.md`) match neither and are silently skipped. Documented as a follow-up, not fixed by this skill. |

**Known gaps:**
- No literal chain-invocation script ships yet (see table above); `OP_STORY_BLOG_CHAIN_CMD` must be
  wired to a headless model invocation per `references/pipeline-contract.md`.
- `storyType`/`aosAreas[]` assignment is heuristic (keyword-driven), not a trained classifier;
  expect to override it by hand for ambiguous AARs (see `references/frontmatter-contract.md`).

## Key References

All paths below are absolute and resolve on disk:

- /Users/miethe/dev/homelab/development/signal_to_system/.claude/skills/dev-story-editor/references/pipeline-contract.md (stdin/stdout JSON contract, env vars; load for Entry Mode A)
- /Users/miethe/dev/homelab/development/signal_to_system/.claude/skills/dev-story-editor/references/frontmatter-contract.md (schema + backfill mapping; load before assembling any frontmatter)
- /Users/miethe/dev/homelab/development/signal_to_system/.claude/skills/dev-story-editor/references/enrichment-sources.md (source-by-source detail + precedence; load before drafting)
- /Users/miethe/dev/homelab/development/signal_to_system/.claude/skills/dev-story-editor/references/voice-rules.md (no-em-dash rule + humanizer-last detail; load before/while drafting prose)
- /Users/miethe/dev/homelab/development/signal_to_system/.claude/skills/dev-story-editor/workflows/single-story.md (Entry Mode A steps)
- /Users/miethe/dev/homelab/development/signal_to_system/.claude/skills/dev-story-editor/workflows/batch-redraft.md (Entry Mode B steps)
- /Users/miethe/dev/homelab/development/signal_to_system/.claude/skills/dev-story-editor/scripts/read_catalog.py (offline catalog extraction)
- /Users/miethe/dev/homelab/development/signal_to_system/.claude/skills/dev-story-editor/scripts/emit_frontmatter.py (offline frontmatter assembly + validation)
- /Users/miethe/dev/homelab/development/signal_to_system/docs/dev-stories/frontmatter-contract.md (canonical stories frontmatter contract + op-side follow-ups)
- /Users/miethe/dev/homelab/development/signal_to_system/src/content.config.ts (canonical `stories` collection Zod schema)
- /Users/miethe/dev/homelab/development/signal_to_system/src/data/taxonomy.ts (`PROJECTS_REGISTRY`, `AOS_AREAS_REGISTRY`, `TAG_REGISTRY`)
- /Users/miethe/dev/homelab/development/agentic_meta_dev/docs/agentic-operator/contracts/story.md (the `op story` adapter's own contract, upstream, read-only from here)
