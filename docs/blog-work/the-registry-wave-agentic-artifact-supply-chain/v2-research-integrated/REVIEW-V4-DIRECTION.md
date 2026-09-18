# Registry Wave: review-v4 integration direction

Date: 2026-09-18. Author: Metis (direction + decisions). Executor: key agent + ICA legs.
Branch: `post/registry-wave-v2-research-integrated` (PR #145), worktree `.wt/rw-v2-essay`.

## Inputs (read these, in this order)

1. `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_current_draft_multipass_review_2026-09-18.md` (the review; P0/P1/P2 lists at the end are the checklist)
2. `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/image-handoff.md` (image placement rules)
3. `src/content/posts/the-registry-wave-agentic-artifact-supply-chain.mdx` (current draft)
4. `src/data/threads.ts`, `src/components/content/{ThreadBeat,ThreadRail,PostSidebar,Figure,LeaderTakeaway,EditionBanner,Callout,Evidence,EvidenceLegend}.astro`, `src/layouts/PostLayout.astro`, `src/pages/essays/[...slug].astro`, `src/styles/global.css`
5. Prior art sources: `/Users/miethe/dev/WIP/agents/theses/registry-wave/registry_wave_research_handoff_2026-09-17_v2/03_prior_art_and_attribution.md` and `09_sources.md`
6. Voice: `.claude/skills/voice-writer/SKILL.md` and the files it references; `docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/voice/`; `notes/do-not-disclose.md`
7. Nick's hand edits are in commit `7c4fc4c` (`git show 7c4fc4c`). Lines he wrote by hand are not rewritten unless the review names them.

## Decisions (settled; do not re-open, do not ask)

D1. **Adopt the review's six-movement structure** (Scan 2) and the "Recommended component/page composition" block. Subtraction wins over addition: where the review says remove/merge, remove/merge.

D2. **Thread system consolidates into one `ThreadStoryboard`** placed once, in movement 4 ("From artifact to use"). One frame, selectable beats, next/prev + keyboard, no autoplay, `prefers-reduced-motion` honored, static no-JS fallback (ordered list of beats + the first figure). Each beat, when selected, expands in place to show: beat label, 1-2 sentence recap, the beat figure (PNG below), caption. Prose in the body no longer repeats the recap. Inline `ThreadBeat` becomes a light marker variant (`variant="marker"`: `2/6 · Divergence`, a real heading element, links to the storyboard state via anchor). The full-card `ThreadBeat` variant and `ThreadRail` stay in the codebase as S2S capabilities (other posts may use them); `ThreadRail` syncs its active beat with the storyboard as progressive enhancement and loses its nested scroll (single scroll owner = the sticky rail).

D3. **Beat order changes to the review's P0.3 sequence**: 1 Incident, 2 Divergence, 3 Detection, 4 Reconcile, 5 Use, 6 Outcome. `src/data/threads.ts` is the single source of truth for beats; update it. Image → beat mapping is by semantics, not filename number:

| Beat | Image (from reg-wave-review-v4/) |
|---|---|
| 1 Incident | `registry_wave_incident_resolution_flow.png` |
| 2 Divergence | `registry_wave_from_source_to_outcome.png` (the anchor image) |
| 3 Detection | `registry_wave_detecting_silent_drift.png`; `registry_wave_drift_across_five_days.png` is the secondary frame for this beat (the five-day elapsed state), shown as a second panel or merged caption, not a separate beat |
| 4 Reconcile | `not_every_difference_is_drift.png` from `registry_wave_research_handoff_2026-09-17_v2/assets/originals/` |
| 5 Use | `registry_wave_presence_vs_behavior.png` |
| 6 Outcome | `registry_wave_run_level_provenance_infographic.png` |

Fix the Use-beat contradiction in prose and captions: by beat 5 the corrected copy is deployed; the question is whether the guard was followed, not whether it was present.

D4. **Figures.** Retire all `diagram-thread-0*.svg`, `diagram-market-wave.svg` (P0.4 blocker) and `diagram-estate-before-after.svg` from the post directory (delete from `public/assets/posts/the-registry-wave-agentic-artifact-supply-chain/`). Keep `diagram-artifact-taxonomy.svg`, `diagram-registry-control-plane.svg`, `diagram-intent-outcome-chain.svg` only if still referenced after restructuring; delete otherwise. New PNGs are copied into that directory with kebab-case names, optimized (target ≤ 400 KB each; use `npx sharp-cli` or `sips`/`pngquant` if available; record the tool used). Hero stays `hero-governed-cube.png` as a frontispiece (see D7). Closing figures: `agentic_os_artifact_estate_before_and_after.png` in movement 6 with a managed-variation caption (lineage + declared intent, never "one canonical version everywhere"); `the_agentic_os_artifact_estate.png` inside an expandable "Inside my lab" `<details>` after it. No optional text-free pair inline. Do not add `registry_wave_thread_diagram_system.png`. Inspect each PNG with Read before placing it; if a PNG's own text contradicts the managed-variation thesis, say so in the report and write the caption to correct it, do not silently place it.

D5. **Signature figure for movement 2** ("Not every difference is drift"): use `not_every_difference_is_drift.png` if its content is the three-project A/B/C story; otherwise build a small inline SVG (three projects: behind → update; local-ahead → reconcile and preserve; pinned → preserve) in the house diagram style. It also serves as beat 4's frame.

D6. **Callout hierarchy.** New `ExecutiveSignal.astro` replaces the Why It Matters + Leader Takeaway pair at the top of the body. `RevisionNote.astro` (one thin line + `<details>` "What's changed?") replaces `EditionBanner` for this post; `EditionBanner` stays available. Remove "The question this essay carries" from the body. New `BoundaryGrid.astro` for the four non-equivalences. New `ImplementationStatus.astro` (rows + status chips IMPLEMENTED / PARTIAL / PROPOSED / TO TEST) for the lab section. New `ReceiptDisclosure.astro` (native `<details>`) wraps the raw YAML and shell output; the finding stays in prose. `ClaimBadge.astro` replaces literal `[Observed]`-style labels; `EvidenceLegend` becomes a small legend near the first badge or a footer disclosure, not a late blue callout. `RelatedWork.astro`: one sentence + disclosure with 2-4 citations taken only from `03_prior_art_and_attribution.md` / `09_sources.md`; never invent a citation; if a needed source is not in those files, leave it out and list it in the report. `PullQuote.astro`: at most 4 in this essay, from the review's shortlist; "Trusted artifact ≠ trusted use." styled as a thesis marker, not a blockquote.

D7. **Takeaway placement (Nick's ask, my call).** No new left column; the existing right rail is the only rail. Add `takeawayPlacement: 'body' | 'rail'` to the post schema/PostLayout (default `body`, preserving current behavior). This essay uses `rail`: on `xl+` the takeaway renders as a compact card at the top of `PostSidebar` (above author/TOC; collapses to a one-line expandable pill once the TOC takes over, same observer). Below `xl` it renders as the second half of `ExecutiveSignal` in the body so nothing is lost on mobile. `ExecutiveSignal` therefore takes `takeaway` + `showTakeaway` props. Also add `heroPlacement: 'default' | 'frontispiece'` (this essay: frontispiece) and separate `ogImage` from `heroImage`, forwarding `heroAlt`.

D8. **`Figure.astro` upgrade** (central, not per-essay): `variant` (`inline | wide | hero | technical`), `expandable` with an accessible modal (labelled "Expand figure" control, Escape closes, focus trapped and restored, caption in modal), `width`/`height` to prevent layout shift, `mobileSrc`, `longDescription`. Existing call sites must keep working unchanged.

D9. **Prose edits**: apply every item in the review's Scan 3 (keep list, tighten list, remove list, malformed italic fix), P0.1 managed-variation insertion (the suggested paragraph is direction, write it in Nick's voice), P0.6 replacement paragraph, P0.7 vendor footnotes replaced with the scoped statements given, P0.9 rephrase ("I place this work within the emerging discipline of Agentic Systems Engineering"), move "Where the system lied to us" forward as the four-lies motif, excerpt/whyItMatters/leaderTakeaway updated per the frontmatter section. Title stays as is (continuity with the PR and prior social posts); the deck and excerpt correct the "comes next" implication. No emdashes anywhere in new prose (parentheses, colons, semicolons, commas). Update `updatedDate` to 2026-09-18.

D10. **Accessibility fixes** from Scan 8: ArtifactTaxonomy and ArtifactControlPlane simplified to plain buttons + `aria-pressed` (drop `role="tab"`/`role="listitem"` misuse); ThreadBeat heading element; single scroll owner in the rail.

## Constraints

- Work only in `.wt/rw-v2-essay` on the PR branch. Commit per phase with explicit paths (never `git add -A` or `git add <dir>`). No push, no merge.
- `nvm use 22`. Gates per phase: `npm run check` and `npm run build` green. A phase is not done until both pass.
- Do not touch `src/content.config.ts` beyond adding the two optional frontmatter fields (`takeawayPlacement`, `heroPlacement`) and `ogImage` if absent.
- Do not read `MeatyBrain/` or `Blogs/` (unreachable from sandbox; do not retry).
- `notes/do-not-disclose.md` is binding for any new prose.
- Delete superseded assets only after every reference is gone (`grep -rn` the src tree first).

## Workstreams (independent; fan these out)

- W1 Components: ThreadStoryboard, ExecutiveSignal, RevisionNote, BoundaryGrid, ImplementationStatus, ReceiptDisclosure, ClaimBadge, RelatedWork, PullQuote, Figure upgrade, ThreadBeat marker variant, ThreadRail sync + scroll fix, PostSidebar takeaway slot, PostLayout/schema options, a11y fixes. Each component gets a short header comment in the existing house style (see `PostSidebar.astro`).
- W2 Assets: copy/rename/optimize PNGs, inspect each for text defects at full res, retire superseded SVGs (after W3 lands), update `threads.ts` figures.
- W3 Manuscript: restructure MDX to the six movements, apply D9, wire the new components, captions, footnotes.
- W4 Verification: `npm run check`, `npm run build`, grep for leftover `[Observed]`-style labels, emdashes in changed prose, dead asset references, `to verify`/`pending` footnote language; then a read-through against the review's P0/P1 checklist and write `docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/v2-research-integrated/REVIEW-V4-CLOSEOUT.md` (checkbox per P0/P1/P2 item: done / deferred + why; assets placed; anything the executor could not verify).

W1 and W2 run in parallel first; W3 depends on W1's component APIs (freeze the prop interfaces in a short `COMPONENT-API.md` beside this file before W3 starts); W4 last.

## Done means

All review P0 items closed; P1 items closed or explicitly deferred with a reason in the closeout; build + check green; every canonical inline figure from image-handoff §1 placed in order near its prose; no superseded thread/market/before-after SVGs referenced; commits on the PR branch; closeout file written.
