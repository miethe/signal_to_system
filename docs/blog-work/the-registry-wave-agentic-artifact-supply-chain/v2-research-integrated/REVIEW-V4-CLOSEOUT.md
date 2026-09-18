# Registry Wave review-v4 integration — closeout (paused)

Date: 2026-09-18. Status: **paused mid-run by Nick** ("the page structure is about to change,
mock-ups incoming"). This is an honest snapshot of what landed and what didn't, not a completion
report.

## What landed

### Probe + contract freeze
- `REVIEW-V4-DIRECTION.md` and `COMPONENT-API.md` written; baseline `npm run build` confirmed green
  before any change (`npm run check` has ~2600 pre-existing, unrelated baseline errors — see Known
  Issues in `CLAUDE.md` re: `astro:content`/enum drift across `contentType`/`visibility`; verified
  no new errors were introduced by any commit below).

### W1 — Component library (commit `0b9b01c`)
All new/changed components exist and build clean:
- `ThreadStoryboard.astro` (new), `ThreadBeat.astro` (`variant="marker"` added, `card` unchanged),
  `ThreadRail.astro` (synced to `threadstoryboard:beatchange`, nested scroll removed).
- `src/data/threads.ts` reordered/relabeled to D3's six beats (incident, divergence, detection,
  reconcile, use, outcome) with `image`/`secondaryImage` wired to final asset paths.
- New callout/disclosure family: `ExecutiveSignal`, `RevisionNote`, `BoundaryGrid`,
  `ImplementationStatus`, `ReceiptDisclosure`, `ClaimBadge`, `RelatedWork`, `PullQuote`.
- `Figure.astro` upgraded (variants, expandable gate, width/height, mobileSrc, longDescription) —
  every existing call site verified unchanged.
- `PostSidebar.astro` takeaway slot, `PostLayout.astro` + `content.config.ts`
  (`takeawayPlacement`, `heroPlacement`, separate `ogImage`), `heroAlt` now forwarded in
  `[...slug].astro`.
- D10 a11y: `ArtifactTaxonomy.tsx`/`ArtifactControlPlane.tsx` role misuse removed (plain buttons +
  `aria-pressed`).

**None of this is wired into the manuscript yet** — it exists as a library, unused by the live MDX.
Nothing here should conflict with new page-structure mock-ups; if the mock-ups want different props,
this is a small, isolated surface to revise before it's ever consumed.

### W2 — Assets (commit `6677a66`)
Nine PNGs copied/optimized into the post's asset directory (all ≤400KB, `sharp`-compressed, no
resize), mapped in `ASSET-MAP.md`. Two findings recorded there:
- **D5 confirmed**: `not-every-difference-is-drift.png` is genuinely the three-project A/B/C story.
  No fallback SVG needed.
- **D4 text-defect flagged, not silently placed**: `agentic-os-artifact-estate-before-and-after.png`
  bakes in "SAME BYTES EVERYWHERE" copy that contradicts the managed-variation thesis. A corrective
  caption is drafted in `ASSET-MAP.md` for whoever writes the movement-6 caption.

Superseded SVGs (`diagram-thread-0*.svg`, `diagram-market-wave.svg`, `diagram-estate-before-after.svg`)
are **still in the repo, untouched** — retirement was explicitly gated on the manuscript leg
confirming zero references, which never ran.

### Layout-independent prose pass (commit `3d71316`)
Applied only the D9 items Nick named as safe pre-mockup:
- Scan 3 tightenings: "the copy the runtime loaded was wrong", "those questions matter, they are
  not the whole lifecycle", "two redacted entries show the distinction".
- P0.9: "I place this work within the emerging discipline of Agentic Systems Engineering."
- P0.7: all four vendor footnotes rewritten from "verification pending" to researched, scoped
  status (GitHub `gh skill` public preview; JFrog GA registry, optional/tier-dependent signing,
  preview local-enforcement boundary; Red Hat's separate Agent/MCP Catalog roles, pre-GA
  boundaries; MCP Registry as a preview metadata/discovery service), plus the Sources intro line
  and the market-scope footnote's closing sentence.

**Already resolved by earlier hand-edit commits, verified not touched again:**
- P0.1 (managed-variation paragraph) — already present near the cold open (line ~59: "some
  projects had fallen behind... others had edited the same file for their own good reasons").
- P0.6 (control-fabric "exactly one responsibility" claim) — already rewritten as cross-cutting
  ("Four responsibilities, not four products, and they overlap...").
- Malformed italic after the YAML block — already a well-formed italic paragraph, no stray list
  marker.
- Emdash sweep — none found anywhere in the manuscript.

Gate: `nvm use 22 && npm run build` green after every commit above (69 pages, only the pre-existing
"projects collection empty" warning).

## What did NOT happen (stopped mid-flight)

**W3 (manuscript restructure) was launched, then stopped before it wrote anything.** The
coordinator's pause landed while the leg was still reading its input files; `git status` confirmed
zero uncommitted changes to the MDX or any asset when the leg was killed — nothing to discard.

Not done, and blocked on the incoming mock-ups:
- The six-movement restructure (D1) itself — the MDX is still in its pre-review-v4 shape.
- Wiring any of the W1 components into the manuscript (`ExecutiveSignal`, `ThreadStoryboard`,
  `BoundaryGrid`, `ImplementationStatus`, `ReceiptDisclosure`, `ClaimBadge`, `RelatedWork`,
  `PullQuote`) — all exist, none are imported/used by the post yet.
- Frontmatter changes tied to the new layout options: `heroPlacement: 'frontispiece'`,
  `takeawayPlacement: 'rail'`, `updatedDate: 2026-09-18`, and the excerpt/whyItMatters/
  leaderTakeaway rewrite correcting the "comes next" implication (P0.9's frontmatter half, review's
  frontmatter section) — deliberately left alone since it's tied to the placement decisions the
  mock-ups will drive.
- P0.2/P0.3 (ThreadBeat/prose/figure triplication removal, the beat-sequence fix) — the components
  and data are ready (`threads.ts` already has the corrected six-beat order); the MDX still calls
  the old `<ThreadBeat beat="deployment"/>` and `beat="drift"/>` ids, which now render nothing
  (silent no-op, confirmed harmless to the build, but visibly incomplete in the live page).
- P0.4/P0.5 SVG retirement and Figure 08 redesign — SVGs untouched; the old figures/captions in the
  manuscript still reference them.
- P0.8 (RelatedWork citations) — component exists, no citations chosen or wired yet.
- All of P1 except the two `Figure`/hero-placement/ogImage items that landed in W1's plumbing
  (schema fields exist; the manuscript doesn't use them yet).
- All of P2.

## Anything a PNG's text contradicted

Only the one D4 finding above (`agentic-os-artifact-estate-before-and-after.png`, "SAME BYTES
EVERYWHERE"). Full detail and the drafted corrective caption are in `ASSET-MAP.md`.

## Preview

Not meaningfully different from before this pass started (the manuscript is unchanged in structure;
only five sentences of prose and four footnotes differ). Path once resumed:
`/essays/the-registry-wave-agentic-artifact-supply-chain/`.

## Next action

Wait for Nick's page-structure mock-ups, then re-run W3 against them (the component library and
asset set from W1/W2 should mostly still apply; COMPONENT-API.md may need a short addendum if the
mock-ups want different composition than the review's recommended six-movement block).
