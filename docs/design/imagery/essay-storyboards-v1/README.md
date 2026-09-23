# Essay imagery storyboards v1 — external image-generation handoff

For an **external image-generation agent**. No site build or code change is asked of you.
Revised by the Opus taste pass (2026-09-23); `../REVIEW-opus-taste-pass.md` explains the changes.

> **Distribution entry point:** use the two-recipient [S2S imagery handoff guide](../HANDOFF-GUIDE.md). Its Pack A → Pack B sequence and role-slot join contract govern external delivery; this directory is Pack B's storyboard family.

## Read first

1. `00-style-reference.md`, all of it. §2 says what the Registry Wave images actually do, §3 is
   the night-twin recipe, §4 are the four templates (T1-T4) whose prompt blocks you paste before
   every board-specific prompt, §5 is the checklist every output must pass.
2. The storyboard for the essay you are working on.
3. `manifest.yaml` for ids, targets, priorities, and the two dependencies.

## Inputs to attach

Use the curated external designer asset pack at `/Users/miethe/dev/homelab/development/_s2s-imagery-asset-pack/` (or distribute `/Users/miethe/dev/homelab/development/_s2s-imagery-asset-pack.zip`) before generating. Its tracked guide is [`../asset-pack/INDEX.md`](../asset-pack/INDEX.md); it identifies visual authority versus behavior-only reference, and the latter may inform product behavior but must not be imitated as image style.

## Style references to attach (by template)

All under `public/assets/posts/the-registry-wave-agentic-artifact-supply-chain/`:

| Template | Attach |
|---|---|
| T1 atelier-hero (Registry Wave only) | `hero-governed-cube.png` |
| T1b subject-hero (every non-Registry-Wave essay) | a T2/T3 reference for the shared plate, reticle, and serif-title family; follow the board-specific hero concept |
| T2 serial-plate | `registry-wave-incident-resolution-flow.png`, `registry-wave-presence-vs-behavior.png` |
| T3 comparison-plate | `agentic-os-artifact-estate-before-and-after.png` |
| T4 thesis-plate | `some-copies-must-change.png` |

Never attach `not-every-difference-is-drift.png` (off-family type and frame) or any
`diagram-*.svg` (coded twins, not the look).

## Order of work

1. **Priority 1 — heroes, paper-light halves.** `aof-hero`, `pp-hero`, `contract-hero`. Stop for
   approval. Then generate each **night twin as an edit of the approved master**, plus
   `rw-hero-night` as an edit of `hero-governed-cube.png`. Then cut the four social art plates
   from the approved twins.
2. **Priority 2 — core plates.** Generate **one** serial plate first (`aof-plate-01-triage`) and get
   it approved as the family proof; every later plate matches it. Then the other priority-2 plates.
3. **Priority 3 — second-wave plates.**
4. **Priority 4 — optional** (`worked-plate-claim-binding`, `rw-plate-not-every-difference`).

## Exact on-image text

The studio/atelier staging is exclusive to **The Registry Wave**. Every other essay uses its board-specific subject hero, while retaining the shared plate/ringed-node/serif-title family.

Every string under **Exact text** is verbatim: no paraphrase, no added punctuation, no
synonyms, no omissions. If a string does not fit, reduce size or break at a word boundary. A
plate with one wrong character is a failed render: re-render, do not retouch type by hand. Heroes
and social art carry **no** text at all.

Plate furniture text (eyebrow, the four corner stacks, footer tagline) is part of Exact text and
is given in each storyboard's "Family constants". Never reuse the Registry Wave corner words on
another essay.

## Return format

- **Heroes:** PNG master 2400x1350 per half, plus AVIF and WebP; both halves submitted together
  with a toggle GIF or side-by-side proving geometry matches.
- **Plates:** PNG master 2000x1125, plus WebP; a contact proof at 720px wide (the reader column)
  to prove label legibility.
- **Social art:** 1520x1260 JPEG/PNG, no text, under 300 KB.
- **Metadata:** model, seed, and the full prompt as sent, per render.

## Naming

`<slug>--<class>--<purpose>--<scheme>.<ext>` (standards §4); omit `--<scheme>` for `single`;
append `--<width>w` for responsive derivatives. Targets in `manifest.yaml` are authoritative.

## Out of scope

- Final palette and type values (arrive with the design-language package). Prompts describe the
  observed Registry Wave paper-light rendering ("navy", "copper", "cream", "serif") so a generator can see it;
  those words are not token values. The signal-dark `accent-1` value is **decided by design-language package**; do not choose violet or copper for it.
- Site build, MDX edits, figure renumbering, and the later per-post OG renderer change
  (`manifest.yaml` → `dependencies`). Social assets are art-only plates; that later `src/lib/og/render.ts` work resolves per-post art with fallback while the renderer composites titles live.
- Promotion of the `rw-v2-features` SVG twins.
