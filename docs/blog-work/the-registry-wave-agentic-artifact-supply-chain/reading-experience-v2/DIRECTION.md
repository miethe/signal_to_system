# Registry Wave reading experience v2: direction

Date: 2026-09-18. Author: Metis (direction + decisions). Executor: key agent + ICA legs.
Branch: `post/registry-wave-v2-research-integrated` (PR #145), worktree `.wt/rw-v2-essay`.

This supersedes `../v2-research-integrated/REVIEW-V4-DIRECTION.md` wherever the two conflict (see §Reconciliation). The review-v4 *prose* program (its D9 and the six-movement content structure) still stands; the review-v4 *experience* decisions (D2, D3, D7, D8) are replaced by the v2 handoff.

## Inputs (read in this order)

Handoff root: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/` (call it `$H`).

1. `$H/README.md`, then `$H/registry_wave_visual_source_of_truth_2026-09-18/README.md` and `IMAGE-GUIDE.md` (precedence rule and the agent checklist in §7 are binding).
2. `$H/02_EXPERIENCE_SPEC.md` (authoritative behavior), `$H/03_NAVIGATION_AND_STATE_CONTRACT.md`, `$H/04_COMPONENTS_AND_ASSETS.md`, `$H/05_IMPLEMENTATION_AND_QA.md` (packages P0-A..D, P1; test table N/A/C/V), `$H/07_OPEN_ITEMS.md`, `$H/01_MOCKUP_AUDIT_AND_DECISIONS.md`.
3. Mockups: `$H/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/` (Tier A, visual target), `02_RICH_COMPONENT_DIRECTION/` (component polish only), `03_V2_PROTOTYPE_MARKUPS/` (state semantics). View them with Read; they are the target, not decoration.
4. `$H/contracts/` (thread-manifest, evidence-records, contextual-notes, reading-map, asset-manifest, types.ts, design-tokens.css) and `$H/prototype/` (index.html, controller.js, styles.css, detail pages).
5. Inline technical figures: `$H/registry_wave_visual_source_of_truth_2026-09-18/06_SUPPORTING_HANDOFFS/INLINE-FIGURE-IMAGE-USAGE-HANDOFF.md` (the same content as `reg-wave-review-v4/image-handoff.md`). PNGs are already optimized in `public/assets/posts/the-registry-wave-agentic-artifact-supply-chain/` (see `../v2-research-integrated/ASSET-MAP.md`).
6. Content program: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_current_draft_multipass_review_2026-09-18.md` (review v4) and `../v2-research-integrated/REVIEW-V4-DIRECTION.md` D1, D4 (caption rule), D5, D6, D9, D10 + `REVIEW-V4-CLOSEOUT.md` (what is already done).
7. Current code: `src/layouts/{BaseLayout,PostLayout}.astro` (BaseLayout uses ClientRouter), `src/components/content/*`, `src/components/interactive/*`, `src/data/threads.ts`, `src/pages/essays/[...slug].astro`, `src/content.config.ts`, `src/styles/global.css`, `src/CLAUDE.md`. Voice: `.claude/skills/voice-writer/SKILL.md` + referenced rule files; `docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/{voice,notes}/` (`notes/do-not-disclose.md` is binding). Nick's hand edits: `git show 7c4fc4c`.

## Decisions (settled; do not re-open)

V1. **Precedence** exactly as `$H` states: current essay/evidence > v2 experience spec + state contract > Tier A composites > V2 markups > rich concepts > V1 > style variations. Mockup text is never copy. No fabricated receipts, hashes, versions, dates, metrics, or "next essay" titles; a missing input stays a labeled pending slot.

V2. **Beat order reverts to the canonical six**: Incident, Deployment, Use, Drift, Detection, Outcome (spec §6/§7). The review-v4 reorder in `src/data/threads.ts` (Divergence/Reconcile) is undone. Image mapping follows the inline-figure handoff §1 by name (01 incident-resolution-flow, 02 from-source-to-outcome, 03 presence-vs-behavior, 04 drift-across-five-days, 05 detecting-silent-drift, 06 run-level-provenance). T03 is labeled a **conceptual branch** in data, inline, and Thread Focus (spec §7 semantic boundaries); the prose is written so the branch is explicit ("suppose the corrected instruction is present").

V3. **Thread = six inline `ThreadScene`s distributed through the essay + one `Thread Focus` surface.** The in-place `ThreadStoryboard.astro` from W1 is superseded; delete it (never wired) unless a leg finds a genuine reuse inside Thread Focus. `ThreadBeat.astro` card variant is retired from this essay; keep the component only if another post uses it (grep), otherwise delete. `ThreadRail.astro` becomes/feeds the `ThreadDock` inside `ReadingCompanion`. One data record per beat (`src/data/threads.ts`, seeded from `$H/contracts/thread-manifest.json`, corrected against the manuscript) drives inline, dock, focus, and figure routes. No second hand-written explanation in focus views.

V4. **Three modes + one viewer, route-backed.** Static routes generated from data under the essay: `/essays/<slug>/thread/<beat>/`, `/essays/<slug>/evidence/` and `/evidence/<record>/`, `/essays/<slug>/figure/<id>/`. They render fully without JS. In-place inspection is a progressive enhancement with **one history owner**: because `BaseLayout` uses Astro `ClientRouter`, the controller must either (a) integrate through the ClientRouter lifecycle (`astro:page-load`, `astro:before-swap`) with tests N05/N07, or (b) opt this reader route group out of ClientRouter (`data-astro-reload` / per-layout choice) and own `history` itself. The front-end leg picks one, writes the reason in `ARCHITECTURE.md` beside this file, and never runs two popstate loops. Return semantics per `$H/03_*`: "Back to essay" restores the original place (anchor-relative); "Read this scene in the essay" jumps to the beat anchor. One dialog host, logical parent stack (thread → evidence/figure), focus containment and restoration.

V5. **Sidebar lifecycle** per Tier A 01/02: `AuthorCard` and `ExecutiveSignal` are in-flow at the top of the rail and scroll away; the single sticky surface at depth is `ReadingCompanion` (compact nearby outline + "All sections", `ThreadDock`, at most one authored `ContextualNote`). Thread Focus rail: `RunningExampleCard` + `ThreadOverview` only. Evidence Focus rail: `EvidenceGuide` + `ReceiptIndex` only. Conclusion rail: compact final outline / next-question. `PostSidebar.astro` is refactored to this contract (keep it generic: posts without a thread get outline-only). The W1 `takeawayPlacement` frontmatter field is replaced by this rail model; remove the field if nothing else uses it. Below ~1000px (measure with real content): no rail; `Contents` bottom sheet (spec §12). No chatbot, no app tab bar.

V6. **Section markers** (spec §5): ordinal + reserved-width left rule, exactly one active (violet accent), `aria-current="location"` in the outline, rAF-throttled or observer-based, no history pushes, no scroll-jacking. Compositions: `measure` (default), `pane` (primary-pane width for dense figures/tables), `split` (prose + compact card, stacks on narrow), `inset`. Dense technical PNGs use `pane` and open in `FigureViewer`.

V7. **`FigureViewer`** replaces the W1 `Figure.astro` lightbox: exact asset, exact caption, long description, real file metadata (read from disk at build), Close/Escape/Back returns to trigger with focus restored; from Thread Focus returns to the same beat and pane scroll. Keep `Figure.astro`'s `variant`/`width`/`height`/`longDescription` props; route its `expandable` through the viewer.

V8. **Managed variation is inline HTML** (spec §9, Tier A 07): a responsive three-column comparison (A behind → update; B local-ahead → inspect/reconcile; C deliberate pin → conditional on policy; explicitly illustrative; no security-waiver implication) in the "Not every difference is drift" movement. `not-every-difference-is-drift.png` is therefore **not** placed in the essay (no duplicate three-way graphic); it stays in assets for social use. The before/after estate PNG keeps the corrective caption from `ASSET-MAP.md`; the deep estate PNG is the last architecture-heavy image, in the closing sequence (spec §11), not in an expandable.

V9. **Evidence.** `src/data/evidence.ts` seeded from `$H/contracts/evidence-records.json` but every record re-grounded against the manuscript's existing receipts (the redacted YAML and shell output already in the MDX, the Aug 6 drift check) and `docs/blog-work/.../notes/`. Fields per spec §8. Capture type is honest (`redacted capture` only for the two real redacted entries; otherwise `method summary`). The essay keeps a concise "Receipts behind the argument" section with `ReceiptDisclosure` summaries; Evidence Focus holds the full set. Evidence labels via `ClaimBadge`; `EvidenceLegend` becomes the `EvidenceGuide` rail component.

V10. **Theme.** The site has light/dark (nanostores). Dark must match Tier A (midnight/navy surfaces, restrained violet/cyan structure); light is the equivalent editorial treatment (Tier E `02_light-editorial-variation.png` as the mood reference), using the existing token system in `global.css` extended from `$H/contracts/design-tokens.css`. Never hardcode dark. Site fonts stay the site's fonts.

V11. **Reuse vs rewrite of the prototype**: the key agent decides per file. Guidance: reuse the `contracts/` data shapes and the `controller.js` state/return semantics as a reference; do not copy prototype markup or CSS wholesale into Astro (it is Georgia/system-font, dark-only, ClientRouter-unaware). Components are Astro-first, server-rendered; React islands only where interaction genuinely needs them.

V12. **Content integration is one Opus leg**, after the shell exists: apply the review-v4 six-movement structure and remaining D9 items (P0.1 managed-variation movement in Nick's voice, P0.2 remove recap triplication, P0.5/P0.8 related-work disclosure from local prior-art files only, four-lies motif moved forward, excerpt/why-it-matters/takeaway refresh, ≤4 pull quotes, thesis marker), wire every component, place the six scenes adjacent to their prose in order, write the per-beat data-record prose (title, one real paragraph, "what this establishes / what it does not", limits) once in `threads.ts` so inline and focus share it. Preserve Nick's hand-edited lines. No emdashes. Read the voice-writer skill files first.

V13. **Site-wide capability, first consumer here.** Everything above is built as reusable S2S machinery keyed off data (a post with `threads[slug]`/`evidence[slug]` gets the modes; a post without gets the plain shell). No Registry-Wave-only hardcoding in layouts or components. Other posts must render unchanged (spot-check two essays and one dev story in the build).

## Reconciliation with REVIEW-V4-DIRECTION.md

| Review-v4 | Status |
|---|---|
| D1 six-movement prose, D9 prose edits, D10 a11y | still binding (V12) |
| D2 single ThreadStoryboard, D3 beat reorder | superseded by V2, V3 |
| D4 asset retirement | still binding: delete `diagram-thread-0*.svg`, `diagram-market-wave.svg`, `diagram-estate-before-after.svg` once unreferenced |
| D5 signature figure | superseded by V8 (HTML comparison) |
| D6 components | still binding, adapted: ExecutiveSignal (rail, in-flow), RevisionNote (slim, closed), BoundaryGrid, ImplementationStatus, ReceiptDisclosure, ClaimBadge, RelatedWork, PullQuote |
| D7 takeaway placement / heroPlacement | superseded by V5; frontispiece hero stays (spec §4 Entry) |
| D8 Figure lightbox | superseded by V7 |

## Lanes

- Visual taste and anything judged by eye (Tier A fidelity pass, component polish, light-theme equivalence): **ICA Opus** `--model 'claude-opus-5[1m]'`, `ICA_KEY=CCx3`. Optional cross-family lens: Codex `gpt-5.6-sol` read-only review of the rendered screenshots.
- Content rewrite (V12): **ICA Opus**.
- Mechanical (data seeding, routes, tests, asset ops, a11y sweeps): **ICA Sonnet** `claude-sonnet-5[1m]`.

## Constraints

- Work only in `.wt/rw-v2-essay`. Commit per package with explicit paths. No push, no merge, no publish.
- `nvm use 22`; `npm run check` (no new errors in touched files; baseline has ~2600 pre-existing) and `npm run build` green at every package boundary.
- Screenshots: use `aos-screenshot` (allowed under ICA) or Playwright against `npm run preview` on a free port; capture desktop 1440 and mobile 390 for entry, first scroll, thread focus, evidence focus, figure viewer, conclusion, mobile contents. Store under `docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/`.
- No dead components left in `src/components/content/` (delete superseded W1 pieces once nothing imports them).
- Superseded prototype/handoff files are not copied into the repo except the seeded data and this directory's docs.

## Packages and order

P0-A data + assets (Sonnet) → P0-B static shell + routes (Sonnet build, Opus taste review) → P0-C controller (Sonnet, `ARCHITECTURE.md` decision first) → V12 content integration (Opus) → P0-D mobile + a11y (Sonnet) → P1 polish: ContextualNotes, dock hold/collapse, active-section styling (Sonnet) → Visual fidelity pass against Tier A at both themes (Opus, iterate ≤3 rounds with screenshots) → QA: run the `$H/05` test table (N01-N12, A01-A04, C01-C04, V01-V04); anything not runnable locally is marked pending, never passed → `CLOSEOUT.md` here (per-test results, per-package commits, open items carried from `$H/07`, deferred items with reasons).

## Done means

Build green; every Tier-A checklist item in `IMAGE-GUIDE.md` §7 checked with a screenshot pointer or an honest "not met + why"; six scenes inline in canonical order with the right PNGs; three modes + viewer working with and without JS; return semantics tested; other posts unchanged; content program from review v4 closed or deferred in `CLOSEOUT.md`; atlas captured at both widths and both themes.
