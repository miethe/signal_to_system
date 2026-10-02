# Theses arc: gap matrix and polish plans

Target-Node: `node_01M3YVPJZY5SSMRNBNNEEH09QK`

Read-only assessment, 2026-10-02, checkout HEAD `6808a82d43167d7d9aa3dd5a69c1fc83f1638a62`. Line references below refer to the unchanged manuscripts in this checkout. E1 = `src/content/posts/governed-agentic-sdlc-01-productivity-paradox.mdx`; E2 = `src/content/posts/agentic-operations-flow.mdx`; E4 = `src/content/posts/the-contract-is-the-work.mdx`. E3 = `src/content/posts/the-registry-wave-agentic-artifact-supply-chain.mdx`.

Authority: `docs/authoring/essay-standard.md`, Nick's hand-edit-derived `docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/voice/nick-voice-rules.md`, then published E3. Five calibration moves from E3: open on an owned failure (L55-65); complicate the repair (L75-81); date the origin and introduce the system in human terms (L102-104); separate mechanism from assurance (L280-307); close on what the opening reviewer needed (L408). The standard's `docs/authoring/essay-voice-profile.md` and the voice-writer skill's canonical `My Voice.md` path are absent locally. This assessment uses the available hand-edit rules and exemplar, not an inferred replacement profile. No external source was freshly verified; source inventories below describe what the manuscripts already cite.

## Checker baseline

First command: `node scripts/check-essay.mjs`. Exit 1. Exact per-essay output:

```text
FAIL src/content/posts/agentic-operations-flow.mdx  (3 errors, 3 warnings)
  error F1: missing frontmatter: relatedSlugs
  error S1: no <ExecutiveSignal>
  error S2: expected exactly 1 thesis-marker PullQuote, found 0
  warn  F4: recommended frontmatter absent: heroAlt, heroPlacement
  warn  S5: no <ClaimBadge> receipts rail
  warn  S6: H2 count 11 outside 5-9
FAIL src/content/posts/governed-agentic-sdlc-01-productivity-paradox.mdx  (4 errors, 2 warnings)
  error F1: missing frontmatter: relatedSlugs, seoTitle, seoDescription
  error S1: no <ExecutiveSignal>
  error S2: expected exactly 1 thesis-marker PullQuote, found 0
  error S4: footnotes present but no '## Sources' heading
  warn  F4: recommended frontmatter absent: heroAlt, heroPlacement
  warn  S5: no <ClaimBadge> receipts rail
FAIL src/content/posts/the-contract-is-the-work.mdx  (4 errors, 2 warnings)
  error F1: missing frontmatter: seoTitle, seoDescription
  error S1: no <ExecutiveSignal>
  error S2: expected exactly 1 thesis-marker PullQuote, found 0
  error S4: footnotes present but no '## Sources' heading
  warn  F4: recommended frontmatter absent: heroAlt, heroPlacement, draftNotes
  warn  S5: no <ClaimBadge> receipts rail
PASS src/content/posts/the-registry-wave-agentic-artifact-supply-chain.mdx  (0 errors, 1 warnings)
  warn  N1: footnote definition never referenced: [^coverage]
```

This is the retained red baseline for a planning-only leg. No gate bypass, push, or essay repair was attempted. Structural PASS is not evidence of editorial or factual completeness.

## Matrix

`partial` means relevant material exists but does not fulfill the whole movement. `missing` means absent in this manuscript, not absent in the author's systems. `n/a` marks conditional or optional movements with no current need.

| Standard movement | E1 | E2 | E4 |
| --- | --- | --- | --- |
| 0. Frontmatter | partial: metadata, missing SEO/relations, L1-24 | partial: missing relations, L1-25 | partial: missing SEO, L1-23 |
| 1. RevisionNote | partial: updated edition L5, no argument-change note; review revision scope | n/a: upcoming prose polish alone need not add note, L4 | n/a: no argument revision declared, L4; review planned changes |
| 2. ExecutiveSignal | missing: rail fields only, L21-22 | missing: rail fields only, L20-21 | missing: rail fields only, L17-18 |
| 3. Cold open H2 | partial: question H2, general experience, L30-40 | missing: general opening before first H2, L33-54 | partial: real incident L32-34, but generic scenario first and no opening H2, L28 |
| 4. Thesis marker | partial: late thesis Callout L173-175, question L64 | partial: first-artifact question L39, no marker | partial: authority thesis L46, no marker |
| 5. Harder problem | meets: gains vary by task/context, L46-60 | partial: chat critique L74-84, no complication of proposed graph | meets: criteria can defeat intent, L69-71, within second movement rather than second H2 |
| 6. Origin beat | partial: November 2025 L97; SkillMeat lacks Term/intro | partial: undated origin L56 and internal deck L42 | partial: personal build L103-108, no dated origin/SkillMeat Term |
| 7. Field already solved | partial: studies L38-60, ADLC L142, no RelatedWork | missing: tool roles L58, L249-258, no sourced related work | partial: primitives L168 and source review L254-315, no RelatedWork |
| 8. Mechanisms | partial: four H3s L83-119, H2s mostly topic labels | partial: mechanisms L93-234, 11 H2s, title-case labels | partial: mechanisms L52-238, declarative H2s lack periods |
| 9. Running thread | partial: three separate incidents L97, L109, L183 | partial: repeated discovery example L82, no carried outcome | partial: timeout example L73-93 and L246, missing intermediate beats |
| 10. Boundaries | partial: task tiers L48-58 and audience L177, no assurance limits | partial: curated model caveat L42, hard-boundary L207-209 | meets: bad evidence/blind spots L42, wrong criteria L71, market limits L240 |
| 11. Own tooling misled | meets: repeated fix L109 and tests/lag L183; no disclosure | partial: generic repeated session L82, no real incident receipt | meets: missing dispatch L33 and unswept state L196-200; no disclosure |
| 12. Implementation status | missing: CCDash completion assertion L186 only | missing: current-system assertions L80, L146-180 | missing: daily operation assertions L156, L230 |
| 13. Receipts rail | partial: footnotes L219-237, no badges or measurement limits | missing: deck caveat L42 only; no receipt rail | partial: bracket classes L33-244, no consolidated badges/method limits |
| 14. Inside my lab | n/a: optional; technical details currently inline L97-109 | n/a: optional; schema could move from L170-176 | n/a: optional; landscape methods currently L160-162 |
| 15. WhereThisSits | meets: own slug L213 | meets: own slug L280 | meets: own slug L252 |
| 16. Close | partial: old series preview L205-217, no incident return/E2 link | partial: recap L268-278, no example return/E3 link | partial: timeout return L246, no E5 question/link |
| 17. Sources | partial: ten definitions L219-237, no heading/scope | missing: no Sources section/footnotes, L280 EOF | partial: Sources variant L254 and definitions L326-332, heading fails exact gate |
| Section 2. Metadata semantics | partial: excerpt four sentences L3, takeaway descriptive L22 | partial: roles are clear L20-23, post-polish updatedDate needed | partial: excerpt starts “How” L3, relations omit E3 L19-22 |
| Section 3. Purpose components | partial: Figure/Term/placement, legacy Callouts L25-28 | partial: Figure/Term/interactive/placement L26-31 | partial: Term/placement and legacy Callout labels L24-26 |
| Section 5. Prior question | n/a: arc entry has no prior essay; motivation L36 | partial: routing diagnosis L33-39, not explicit E1 handoff | partial: continuity L40-46, no explicit E3 assurance handoff |
| Section 5. Thesis | partial: governance L174, late and overbroad premises | meets: durable graph L80, L274-276 | meets: binding authority L44-46 |
| Section 5. Next question + forward link | missing: old Post 2 promise L207; no E2 body link | missing: different series agenda L278; no E3 body link | missing: reuse L218, no Envelope handoff L242-252 |
| Section 5. Shared umbrella, safe attribution | missing: narrower Agentic Engineering L177 | missing: no Agentic Systems Engineering L33-280 | missing: no Agentic Systems Engineering L28-324 |

## E1: The AI Productivity Paradox

### Argument and handoff

AI accelerates scoped tasks, but delivery depends on coordination, context, review, and ownership. The essay diagnoses four governance failures, illustrated by repeated fixes and unobserved performance problems in SkillMeat. It proposes cognitive infrastructure, but shifts from a defensible systems diagnosis to blanket claims that infrastructure is absent and reactive gates cannot work.

Prior question: at the arc entrance, why should an enterprise distrust local speed as its delivery measure? Thesis: task speed needs governed context, verification, and persistent operating state to compound. Next question for E2: what must survive a session, and how does work become routable state? No authored forward link to E2 exists; L207 promises an Intent-Driven Development Post 2, L209 previews a different five-post sequence, and L213 supplies only data-driven arc placement. Keep the independent series identity, but distinguish it from the core reading path.

### Running example candidate

Use the real three-session FastAPI 204 fix (L109), not three unrelated anecdotes. Five proposed beats: **The empty response**; **The first layer fixes it**; **The next session rediscovers it**; **Three fixes reveal missing shared state**; **What the next session must inherit**. The final beat is a proposed obligation, not a recorded successful remediation. The text names API, web, and tests but supplies no detailed session chronology, so do not invent which fix happened first. Keep the November instruction sprawl (L97) and DiffViewer (L183) as supporting exhibits. A future thread-beats manifest should label historical versus proposed beats; no ThreadScene tags or images in the polish pass.

### Receipt paragraphs to carry into ClaimBadge

These are the evidence-bearing claim clusters, including unsupported claims needing an explicit source-gap disposition. Split clusters if their source or scope differs. Dates and methods must come from the existing material or a separately supplied receipt; do not infer them from publication dates.

| Lines / claim | Kind | Existing basis and limit |
| --- | --- | --- |
| L32-36: scaffolding, repeatable 5-10x+ speedups, aggregate delivery lag | observed | Author testimony only; no timed runs, denominator, or team delivery dataset. Do not badge measured. |
| L38: GitClear churn, 150M+ lines, net output comparison | external | `[^gitclear]`, L219; definition says 153M lines. Retain projection wording; source support for net output needs review. |
| L38: Google microtasks/flat delivery, optimistic 20-30% team gain | external | No dedicated citation in manuscript. Explicit source gap; no borrowing `[^dora]` as proof. |
| L40: METR 19% slower, perceived 20% faster, 39-point gap | external | `[^metr]`, L221; narrowly early-2025 experienced open-source tasks, not all AI work. |
| L48-58: current task tiers and governance moving tasks upward | proposed | Author classification, no benchmark for 2-5x+ table. Keep apart from observed 5-10x+ claim. |
| L60: McKinsey task-specific gains | external | `[^mckinsey]`, L223; retain task/survey boundaries. |
| L60, L87: DORA system metrics and adoption/instability association | external | `[^dora]`, L225; association is not causal attribution. |
| L70-85, L99, L105, L111, L119: recurring failures and recommended interventions | proposed | Operator interpretation; no cross-team study proving universality or that governed alternatives alone change behavior. |
| L87: PR size 2-3x, Faros 50,000+ PRs and 91% review-time rise | external | `[^faros]`, L227 supports cited report; PR size multiplier has no separate support identified. |
| L95: 48% faster without comprehension gains | external | `[^qiao]`, L229; keep study population and task scope. |
| L97: November 2025 multi-project copies, script lasted two weeks, 1,703 files/50+ directories | observed | Named directory/script narrative only, no linked inventory snapshot. Exact count is not yet a measured receipt. |
| L107: 62% vulnerable code and review assertions | external | `[^rewire]`, L231; cited blog, not independently inspected underlying study. “Sails through review” needs separate support or qualification. |
| L109: same 204 bug fixed at three layers in February-March 2026 | observed | Existing three commit references in prose. Move references into a method-summary footnote; they have not been independently inspected by this leg. |
| L115: roughly 40% shadow use, 86% zero visibility | external | `[^ibm-governance]`, L233, two IBM links; support for each statistic needs editorial source check. |
| L117: hallucinated packages/slopsquatting | external | No dedicated source. Do not treat adjacent breach footnote as substantiation. |
| L117: 20% breaches, approximately $670K premium | external | `[^ibm-breach]`, L235; preserve population and report-year bounds. |
| L127-145: infrastructure-transition analogy and absent cognitive infrastructure | proposed | Historical synthesis, not a market survey. `[^adlc]` supports named lifecycle framing, not “zero” infrastructure. |
| L142: IBM/Arthur ADLC framing | external | `[^adlc]`, L237; distinguish existing work from the author's operational architecture. |
| L158-167, L179-181, L189-201: proactive governance/control plane and correct-by-construction ambition | proposed | Design argument, no outcome comparison or proof that context makes code correct. |
| L183: three months of DiffViewer reparsing, lag, small fix | observed | Existing fix commit reference; no profiler capture or token-cost measurement. Render cost and model token burn are different claims. |
| L186: CCDash addressed observability gap | observed | Assertion only, no operational receipt or stated coverage. Do not infer full closure. |

The rail must explicitly state that this manuscript supplies no controlled lab comparison of task speed versus delivery, no measured reduction in these failures, and no token-burn measurement for DiffViewer. It can preserve firsthand observations without promoting them to measurements.

### Component and metadata migration

- Add `ExecutiveSignal` immediately before the opening movement, using exactly the final `whyItMatters` and `leaderTakeaway` strings. Make the takeaway an instruction and shorten the excerpt to one or two argument sentences.
- Convert the thesis Callout L173-175 into one early `PullQuote variant="thesis-marker"` of roughly ten words or fewer, with the matching thesis in prose and one plain question. Existing blockquotes L42 and L133 are candidates for up to two ordinary PullQuotes if they remain load-bearing.
- Replace broad reassurance in L144-146 with scoped prose after Nick resolves the premise. Use `BoundaryGrid` for task speed versus delivery, passing tests versus intent, explicit context versus correctness; the pairs must not imply measured outcomes.
- Add `RelatedWork` using existing METR, DORA, and ADLC links. Acknowledge what this work establishes before naming the gap; no new source is needed to list these as related work.
- Add `ImplementationStatus` for shared context, cross-session memory, and observability, but obtain current receipts before assigning IMPLEMENTED or PARTIAL. Unverified coverage belongs in TO TEST; design ambitions in PROPOSED. Do not declare all gaps closed because CCDash exists.
- Add `ClaimBadge` paragraphs from the inventory. Add `ReceiptDisclosure` only if the named commit/directory evidence is supplied as real excerpts; a paraphrase is a method summary, not a fabricated raw receipt.
- Preserve all three existing Figures, paths, numbering, and alt text. Keep `WhereThisSits` L213, place it before a concise incident-return close, and add a body link to `/essays/agentic-operations-flow/`.
- Add `relatedSlugs` for E2, E3, E4; add `seoTitle`, `seoDescription`, `heroAlt`, `heroPlacement: frontispiece`; retain and update `draftNotes`. Bump `updatedDate` for body polish. If Nick accepts the argument revision, add a dated `RevisionNote` describing that revision in one sentence.
- Existing glossary ids to keep: `cognitive-debt`, `adlc`, `vibe-coding`, `agentic-engineering`, `harness-engineering-control-plane`, `agent-amnesia`. Add first-use Terms using existing `skillmeat`, `agentic-systems-engineering`, and, if the AOS is named, `aos`. New candidate id `ccdash` is absent; add an attribution-safe entry if the aside survives. Do not duplicate existing ids or conflate the umbrella with the narrower series.
- Introduce exact `## Sources`, one scope sentence, existing ten external definitions, and method-summary footnotes for supplied lab receipts. Remove body hashes into those notes. Optional evidence.ts records may only summarize established sources; missing dates/URLs stay null.

### Voice gaps

1. L32-34 opens on a portfolio of gains and “Let me be direct,” rather than a one- or two-sentence owned incident. The challenge to anyone who disagrees overstates a bounded observation.
2. L38-40 stacks statistics and generalized conclusions before the reader has a concrete failure to follow. E3 earns its abstractions with the stale reviewer first.
3. L97 chains project count, script failure, file inventory, rule names, and interpretation into one paragraph. The hand edits favor separating claims while retaining the personal embarrassment and specificity.
4. L109 and L183 expose commit hashes in body prose. The standard now puts identifiers in receipts, even though the older voice-writer skill recommends forensic hashes.
5. L142 uses collective “we're all” around own operating experience; L179 starts with a formal category/control-plane analogy instead of the named system's concrete job.
6. L145, L158, L167, L181 make categorical absence or failure claims that outrun the cited evidence. The exemplar separates what a check establishes from what remains unknown.
7. L171 and L201 announce the series; L205-217 ends on a multi-post preview instead of returning to one incident with a short unresolved question.

### Stale-claim candidates: 8

Counts group one related assertion cluster per numbered row, not every sentence. These are flags for author review, not corrections.

| # | Lines | Candidate and why |
| --- | --- | --- |
| 1 | L32-34 | “Over a year,” listed tools, current 5-10x+ speedups and “last 6 months”: floating measurement window and evolving model/tool mix; current flagship changed September 22. No specific Opus version is named here. |
| 2 | L97 | 3-4 projects, 1,703 files, 50+ directories, two-week batch script: November origin is partly dated, but the inventory's as-of date is unclear. Could be historical rather than current. |
| 3 | L109 | Three independent fixes and “commits are still there”: dated incident worth preserving, but references and same-root-cause interpretation need confirmation before republication. |
| 4 | L145 | “Zero” cognitive infrastructure, no versioning/observability/trust/memory: later E3 describes implemented or partial systems in each neighborhood. Scope could be industry rhetoric or own lab; unresolved. |
| 5 | L179-181 | Harness Engineering Control Plane terminology and “we have no mechanism” for persistent memory: current architecture uses multiple systems/control-fabric language; absence claim may no longer fit. |
| 6 | L183 | DiffViewer three-month lag incident, tests as the only signal, no observability underneath: preserve as historical if receipted; not a description of today's coverage. Token-burn implication lacks a separate measurement. |
| 7 | L186 | “I've since addressed” the gap with CCDash and will post later: claims closure without scope and carries a potentially outdated publication promise. |
| 8 | L201, L207-209 | Year-long iteration and Parts 2-5 promises: the shipped core path has different questions and order; deterministic execution language also needs separation from the still-unfinished hop-based execution unit. |

### Polish acceptance criteria

- Nick resolves the L145 absence premise and L158-167 rejection of gates before editorial polishing asserts a settled thesis.
- One concrete incident opens the essay and returns at the close; five thread beats distinguish recorded failures from proposed inheritance.
- Exactly one early thesis marker and matching ExecutiveSignal strings; required metadata and valid relatedSlugs present.
- Sources has the exact heading, all external footnotes remain scoped, and unsupported numeric claims receive a source-gap disposition.
- No body commit hashes, no em dashes, no implicit claim that tests/context prove correctness.
- ImplementationStatus rows have scoped receipts; observation, external results, and proposals stay distinct, with explicit unmeasured outcomes.
- Seven voice findings and all eight stale candidates have accept/reject/defer records in the later polish artifacts; numbers are not silently refreshed.
- Prior motivation, attributed Agentic Systems Engineering umbrella, E2 question, and working E2 body link are present without erasing the original series membership.
- Later implementation passes `check:essay`, `check:prose`, and `verify` under Node 22; this analysis itself does not claim those passes.

### Polish or re-argue?

**Re-argue, narrowly, before polish.** Preserve the paradox, failure modes, and lived incidents. Nick must decide whether the actual claim is that traditional gates are insufficient alone, rather than that gates cannot work (L158-167), and whether the gap is fragmented/incomplete infrastructure rather than literal absence (L145, L181). E3's enforced comparisons and E4's meaningful acceptance gates are part of the remedy. Leaving E1's premises intact makes those essays contradict the arc entrance. The “correct by construction” ambition L189 also needs a boundary: deterministic specs do not establish deterministic or correct model output. This is an argument decision, not a copy edit.

## E2: The Work Is a Graph

### Argument and handoff

The essay argues that a transcript cannot carry enough durable state to route, resume, review, and reuse agentic work. Its operating model turns uncertainty into artifacts, ties autonomy to risk, schedules dependent work as a graph, and retains evidence after execution. It describes a curated internal model, but often presents that model's intended properties as current operational guarantees without receipts.

Prior question from E1: what prevents local task gains from becoming delivery gains? Thesis: intent, dependencies, acceptance state, and evidence must survive outside chat as a graph that subsequent actors can inspect. Next question for E3: once that graph depends on reusable capabilities, how do their lineage, deployment bindings, and deliberate differences survive reuse? No authored E3 forward link exists. L278 announces research, PRDs, storyboards, and cost gates for the separate AI Workflows series; L280 is only arc placement.

### Running example candidate

The example already in L82 is a session that discovers and fixes something, closes, and leaves the next agent/reviewer unable to recover its intent. Six proposed beats: **A discovery dies in chat**; **Uncertainty chooses the first artifact**; **Intent becomes a contract**; **Dependencies become owned work**; **Review checks retained evidence**; **The next session inherits state**. This is a conceptual workflow example, not a named real incident. The source deck L42 is an existing operating-model basis, not runtime evidence. The manuscript has no recorded end-to-end outcome or dated first-person failure. A fully conforming incident opening requires a supplied receipt or author account; do not invent one or import E1's case as an E2 observation. Beat manifest later, images and ThreadScene wiring deferred.

### Receipt paragraphs to carry into ClaimBadge

No footnotes or runtime receipts are present. The internal deck and v3 storyboard named at L42 and in draftNotes are the existing source basis; their rendered slides support model description, not measured enforcement. Each present-tense implementation claim needs this limitation made explicit.

| Lines / claim | Kind | Existing basis and limit |
| --- | --- | --- |
| L33-39: most failures are routing failures; transcript loses assumptions | proposed | Thesis/synthesis; no failure-population data establishing “most.” |
| L42, L49, L90: curated graph and operating loop | observed | Author identifies deck/storyboard and supplied slide images; observation is that this operating model was documented, not that all paths execute. |
| L56-72: five routing lenses and first-artifact choice | proposed | Deck/storyboard operating model; no comparison showing all downstream work otherwise guesses. |
| L78-84: graph's listed objects and repeated lost discovery | observed | “My current system” testimony and conceptual example; no persisted objects/run shown. Source gap for implemented coverage. |
| L99-110: four triage paths, exploration as a gate | proposed | Explicitly “in the storyboard”; named commands L105-108 and Figure 03. No block/allow receipt. |
| L121-138: artifacts operate work and enable compounding | proposed | Artifact/job table and model explanation; no measured gain or inherited-state run. |
| L146-155: four autonomy tiers and mandatory validators | proposed | “Model I use,” deck Figure 04. No real tier classification, reviewer invocation, or refusal shown. |
| L168-180: graph shape and collision-safe parallelism | proposed | Schema sketch and Figure 05. Describes design; no concurrent execution or ownership collision test. |
| L193-215: typed review and Mode D stop before edits | proposed | Storyboard table and Figure 06. A control requirement, not observed enforcement. |
| L224-240: five evidence layers and adjacent operating surfaces | proposed | Evidence table and generated Figure 07; neither is proof of writers or durable run coverage. |
| L247-258: tools chosen by artifact role | proposed | Recommendation table; product names are examples, not a researched comparison. |
| L264: subscription first, escalation when warranted | observed | First-person practice only; no cost ledger or measured savings. |
| L266, L270-276: routing exposes cost and graph enables resumability/reuse | proposed | Concluding architectural synthesis; no comparative cost or outcome measurement. |

Add one explicit sentence that no end-to-end autonomy, enforcement, collision prevention, or delivery improvement is measured here. There is no defensible `measured` badge yet and no existing sourced external research claim to migrate. `RelatedWork` is a source requirement for the later leg, not permission to make up citations.

### Component and metadata migration

- Add `ExecutiveSignal`, exact frontmatter strings; add one early `PullQuote variant="thesis-marker"` with matching prose. L37/L84/L138 are ordinary PullQuote candidates only if needed for rhythm, not all three by default.
- Preserve `AgenticOperationsFlow client:visible`, CSS import, and all seven Figures. Their captions and nearby text must identify the curated model versus live behavior consistently.
- Consolidate 11 topic H2s into approximately seven movements: incident/intake; harder problem; triage/artifact state; risk/graph; typed review; evidence/cost; close. Keep useful H3 sub-turns and use declarative H2s with periods. No new UI work is required.
- Convert source note L41-43 into a Sources scope/method paragraph. Keep the hard-boundary warning L207-209 if useful, but add `BoundaryGrid` pairs: durable artifact versus correct claim; classified risk versus enforced stop; recorded evidence versus authorized acceptance.
- Add `ImplementationStatus` with PROPOSED for the documented operating-model requirements and TO TEST for unsupplied enforcement/coverage. Upgrade rows only against supplied current receipts. Add `ClaimBadge` paragraphs per the inventory; `ReceiptDisclosure` requires real supplied run content.
- Add `RelatedWork` once relevant primary references are supplied. The current manuscript has none; listing preferred products is not a fair researched account of solved work.
- Add `relatedSlugs` for E1, E3, E4; add `updatedDate`, `heroAlt`, `heroPlacement: frontispiece`. Keep `series: ai-workflows`, `seriesOrder: 1`, existing SEO, and provenance in draftNotes. RevisionNote is conditional on an argument change, not automatic for prose/component migration.
- Existing ids to retain: `artifact-graph`, `executiongraph`. Existing ids to introduce on first use: `feature-contract`, `skillmeat`, `intenttree`, `meatywiki`, `aos`, `agentic-systems-engineering`, `task-completion-validator`. Missing candidate ids: `ccdash`, `mode-d`; add only if those names remain and define their actual scoped use. Exploration Charter, FeasibilityBrief, and PRD can stay plain-language roles with short explanations rather than creating a glossary inventory for every schema name.
- Add exact `## Sources` with a sentence identifying internal deck/storyboard as non-public design sources, existing slide-image references where useful, and any later supplied receipt definitions. Do not fabricate public links, run dates, or a citation for the generated illustration. Keep `WhereThisSits`, then a close returning to the lost discovery and a body link to `/essays/the-registry-wave-agentic-artifact-supply-chain/`.

### Voice gaps

1. L33-37 begins with a universal diagnosis and polished contrast, without the owned failure that earns E3's opening.
2. L56 says “I have started” without a timeline anchor, and L121/L155 repeatedly use uncontracted “I do not” rather than the spoken register of the hand edits.
3. L78 repeats “It does not know” three times, carrying abstract capabilities rather than showing what the next actor lost in the example.
4. L123-134 repeats artifact names and definitions in both prose and a table. The example should make each job concrete rather than repeat the catalog.
5. L170-176 puts raw `waves[]`, `phases[]`, and task schema fields in the main argument; technically valid code, but better suited to an optional lab disclosure after a human explanation.
6. L234 name-drops five systems without the one-clause introductions needed by an executive reader; it also keeps collective systems abstract instead of owning their uneven coverage.
7. L270-278 ends with slogan, recap, another contrast, and a series preview. The close never returns to the discovery that failed to survive.

### Stale-claim candidates: 8

| # | Lines | Candidate and why |
| --- | --- | --- |
| 1 | L42, L80 | Deck/storyboard represented as “my current system”: June documentation may no longer map to live artifact/state responsibilities. |
| 2 | L105-110 | `/plan:explore`, `/plan:spike`, `/plan:plan-feature`, `/dev:execute-phase`, and exploration gate: command routing and actual enforcement may have evolved. |
| 3 | L123-134 | Feature Contract as bounded autonomous sprint handoff, Progress File as live run state: hop-based autonomous execution remains under construction; clarify design versus operating scope. |
| 4 | L146-153 | Current Tier 0-3 artifact/review mapping and mandatory validators: check against current tier/risk contracts, without silently changing historical practice. |
| 5 | L168-180 | “Shape I use,” model/provider task hints, dependency-safe graph execution: could describe a planned rather than completed autonomous unit; model defaults also changed September 22. |
| 6 | L199-215 | Review intensity fields and Mode D as a hard stop needing signoff: current routing/enforcement meaning may differ from June storyboard. Prompt warning does not prove mechanism. |
| 7 | L224-234 | Evidence stack and CCDash/MeatyWiki/IntentTree/capsule/SkillMeat integration: current writer coverage is unstated; consumers' existence cannot establish a fed evidence lane. |
| 8 | L264, L278 | Subscription-versus-metered routing practice and promised next posts: current cost policy/tool usage and publication plan may differ. |

### Polish acceptance criteria

- No invented incident: opening is an author-supplied dated case, or the remaining incident gap is explicitly recorded for Nick.
- Six conceptual beats carry one lost-discovery example; desired success is marked proposed until a real inherited-state run is supplied.
- Exactly one early thesis marker, matching ExecutiveSignal, complete frontmatter, unchanged valid series membership, and valid relatedSlugs.
- H2 count lands in 5-9; declarative headings and human explanations carry the graph, with schema detail optional.
- Every claim of a gate, mandatory reviewer, resumability, or integrated evidence has a scoped source/status or is explicitly proposed; the interactive remains labeled curated.
- Exact Sources heading and honest internal-source scope; RelatedWork references are supplied and reviewed rather than invented.
- Existing Figure assets and island behavior are preserved; no ThreadScene without images, no new UI or capture required for this content plan.
- Seven voice gaps and eight stale flags are dispositioned; umbrella attribution and E3 body handoff exist independently of the AI Workflows series preview.
- Later polish runs the essay/prose/Node 22 verification checks and reports any unresolved incident or source gap rather than calling structural green full conformity.

### Polish or re-argue?

**Polish.** The durable-state thesis fits E1 to E3 and need not change. Its central weakness is unsupported implementation posture, not the proposition that session-independent state matters. The later leg must preserve the distinction between the June curated model and demonstrated operating behavior. If Nick intends this essay to claim a completed unattended execution engine, that would require a new argument/evidence pass; the existing text and supplied construction warning cannot support it. An incident/related-work gap can block full standard acceptance without invalidating the thesis.

## E4: The Contract Is the Work

### Argument and handoff

Competent local outputs can still miss intent when handoffs lack binding acceptance criteria, evidence obligations, and decision authority. Contract-as-spec preserves those relationships, permits visible amendments, and distinguishes verification from authority and reusable capability. The essay argues for integration completeness and proportional gates, backed by bounded operating observations and a source-listed landscape review, rather than proof of enterprise-scale success or market demand.

Prior question from E3: after governing artifact lineage and use, what defines and authorizes this run's completion? Thesis: the Feature Contract is the binding object that preserves intent, evidence, and authority across execution. Next question for E5: which decisions still need judgment, and what evidence authorizes promotion to a deterministic rule or withdrawal back to judgment? No Envelope link or explicit next question exists in L242-252. The companion link L93 is present and useful but serves depth, not the next arc step. E5's reading-path slug is null, so seed its question and link the existing core reading path at `/series/agentic-systems-engineering/`, rather than inventing a published Envelope route.

### Running example candidate

Use the explicitly synthetic checkout-timeout contract at L73-93, returned to at L246, extended by `contract-as-spec-worked-example.mdx`. Six proposed beats: **The timeout becomes an outcome**; **Criteria make done inspectable**; **Claims bind to failing and passing runs**; **A flake requires a visible amendment**; **The lead accepts a stated evidence state**; **Reuse remains unpromoted**. The companion provides claim bindings L53-68, amendment L78-99, acceptance L103-118, and explicitly withholds promotion L111-112. Mark every beat illustrative/proposed, not observed or measured. Keep the real nondispatch and unswept-state incidents as contrasting empirical exhibits; do not imply the synthetic timeout is their successful correction.

### Receipt paragraphs to carry into ClaimBadge

| Lines / claim | Kind | Existing basis and limit |
| --- | --- | --- |
| L33: two reports, no dispatch, August 24 overnight cycle | observed | Described durable overnight receipts, no attached excerpt/link or footnote. Request method summary or real disclosure; do not fabricate dispatch logs. |
| L38-46: unauthenticated handoff failure/contract authority method | proposed | Explicit proposed interpretation and own method; not cryptographic authentication or universal failure frequency. |
| L49, L250: longstanding evidence convention/instruction to agents | observed | First-person convention only; “predates ... by years” has no dated record here. |
| L58: tests cannot establish absence of bugs | external | `[^dijkstra]`, L326; keep assurance scope. |
| L58: perceived 20% speedup, 19% measured slowdown | external | `[^metr]`, L328; externally measured, not lab measured. |
| L60-71, L95-101: four contract obligations, independent amendment/authorship review, wrong-criteria risk | proposed | Method specification. Do not classify “our answer” as implemented review coverage without receipts. |
| L73-93: timeout contract and complete companion | proposed | Explicit synthetic sketch and linked companion; an example of shape, not an execution receipt. |
| L112-154: six-stage taxonomy and governance by consequence | proposed | Authored maturity framework, stages described as dimensions; no population study or validated benefit. |
| L140: SWE-bench issue-linked evaluation boundary | external | `[^swebench]`, L330; benchmark scope, no specific score claimed. |
| L156, L230: daily three-vendor/scripts contract handoffs through August 25 | observed | Named daily run records, no attachment or resolved record id in this manuscript. Consolidate duplicate assertion; no enterprise generalization. |
| L156: stages four-six are frontier at organizational scale | external | Landscape context L158-162 may motivate it, but no organizational deployment survey. Keep as bounded interpretation or flag source gap. |
| L158-162: no complete equivalent identified among 41 reviewed sources | observed | Bounded internal comparative review; source list L254-315, 35 public/six non-public; internal scoring not independently audited. Not proof of originality. |
| L168: capable primitive ecosystem | external | Existing source groups L269-315; `RelatedWork` can select representative supplied links with explicit capability scope. |
| L176-184: integration completeness as differentiation/durability | proposed | Explicit synthesis grounded in bounded review, not a demonstrated uniqueness or performance result. |
| L188-194, L202, L206: gates detect obligations, blocked state becomes actionable | proposed | Design argument, not coverage proof or an efficiency comparison. |
| L196-200: cause fixed, produced state ran five more days, spend did not fall | observed | Described August follow-up receipts; no numeric spend series or independent comparison supplied. Keep observed, not measured improvement. |
| L204: AI amplifies organizational strengths/weaknesses | external | `[^dora]`, L332; compatible framing, not proof of the lab mechanism. |
| L210: organizations save prompts, fragility of reuse | proposed | Currently marked Observed without a sample/source. Separate personal interpretation from population claim. |
| L212-218: packaged capability, productization, lineage obligations | proposed | Design/product direction, no customer demand or deployment benefit study. |
| L224-238: heterogeneous boundary can support governance | proposed | Architecture illustrated by dated daily-run testimony; does not prove organizational scaling or reproducible decisions after tool replacement. |
| L240: observed mechanisms versus unproven market | observed | Own operating judgment and explicit market boundary; no market evidence, no comparative outcome rate. |
| L244-250: reliability bet and contract transitions | proposed | Future thesis and illustration; preserving records enables inspection, not guaranteed safe reuse. |

The rail must state what is not measured: enterprise-scale effectiveness, improvement against uncontracted runs, durability across vendor/model replacement, and market demand. `observed` is not the class for outside product literature merely because a reviewer read it; that material gets `external`, while the fact/method of the bounded internal review gets `observed`.

### Component and metadata migration

- Add `ExecutiveSignal` matching L17-18 metadata; add one early `PullQuote variant="thesis-marker"` around the L46 thesis, echoed in prose. L150 and L194 are strong ordinary PullQuote candidates; preserve Nick's hand-edited “when I'm not watching” and market-doubt passages.
- Start under a claim H2 with the real L33 nondispatch case and an owned first-person account, leaving the generic reliability scenario as illustration. Do not manufacture a first-person memory/date beyond supplied evidence. Keep seven body movements plus Sources within the 5-9 H2 guidance; punctuate declarative headings.
- Convert literal bracket provenance labels to `ClaimBadge` with the classes above, plus a consolidated dated-method receipts rail. Convert the L198-200 duplicate warning into one scoped receipt paragraph. `ReceiptDisclosure` is conditional on actual supplied excerpts for nondispatch/daily runs/five-day follow-up; existing summaries alone cannot be dressed as raw records.
- Replace provenance-convention Callout L48-50 with a short rail/scope explanation; retain a useful warning Callout only where it adds a distinct decision. Add `BoundaryGrid` for tests versus outcome, verified claim versus authorized decision, accepted decision versus reusable capability. These distinctions already exist at L56 and L246.
- Add `ImplementationStatus`: dated lab handoffs only once supported; contract lifecycle/amendment mechanism separated from synthetic example; enterprise coverage and comparative benefit TO TEST; generalized productization PROPOSED. Do not infer implemented amendments from the companion's invented amendment.
- Add `RelatedWork` using representative existing Microsoft Agent Framework checkpoint/approval, Temporal identity/durability, and in-toto/SLSA provenance links from L274-288 and L311-312. Each is adjacent work, not proof of the whole chain. The ARC-DELTA requirement for E4's own prior-art pass remains unresolved; preserve the bounded review and make no originality claim.
- Add `seoTitle`, `seoDescription`, `updatedDate`, `heroAlt`, `heroPlacement: frontispiece`, `draftNotes`; append E3 to existing relatedSlugs. Do not add E5's unpublished slug. No series pair is necessary unless an actual series membership is assigned. Add RevisionNote only if the argument changes.
- Keep existing `contract-as-spec`, `feature-contract`, `evidence-obligations`, `decision-authority`; add first-use `skillmeat`, `aos`, `agentic-artifact-supply-chain`, `agentic-systems-engineering`, and `deterministic-envelope` as appropriate. All exist; no new glossary id is required. Give SkillMeat/AOS a human introduction rather than assuming the reader arrived from E3.
- Rename L254 to exact `## Sources`; update L158's `#sources-the-landscape-review` anchor accordingly. Keep the six non-public and 35 public review items with their bounds, then external footnotes and supplied lab method-summary footnotes. Move L319-324 authorship/provenance metadata into draftNotes or a short subordinate disclosure so Sources ends with sources, not an administrative essay after the close.
- Keep companion link and synthetic label. Keep `WhereThisSits` with own slug, then close on what the timeout contract authorized and what it did not; seed Envelope's promotion/withdrawal question without promising a live system or resolving it.

### Voice gaps

1. L28-30 opens on a generic product leader and anonymous agents before the author's concrete nondispatch incident at L33. E3 leads with the owned failure.
2. L40-44 defines authority relationships abstractly before showing one contract's concrete obligations; the timeout instance is delayed until L73.
3. L69-71 chains amendment, independence, objective drift, wrong criteria, and a new reviewer responsibility into two long paragraphs. The hand edits favor short separate claims while keeping these caveats.
4. L97 uses “Our answer”; L156 and L230 use “we/our” for home work. The own-system register should distinguish Nick's work from named collaborators rather than drift into institutional voice.
5. L156-162 repeats bounded/observed/method qualifiers across labels and prose. Keep one clear scope statement, not a hedge stack, while preserving genuine limits.
6. L174 puts the synthetic `fc-example-041` identifier in explanatory body prose. It belongs in the labeled code example/companion, with a human description in the executive argument.
7. L246-250 repeats the full transition thesis and ends without handing off the next unresolved question; L319-324 adds a second administrative ending after the Sources list. Preserve the concrete timeout return and tighten around it.

### Stale-claim candidates: 5

| # | Lines | Candidate and why |
| --- | --- | --- |
| 1 | L33 | August 24 overnight executor's nondispatch behavior: dated historical failure could be misread as today's scheduler. Hermes was retired September 26; retain history without identifying this unnamed delegate as Hermes. |
| 2 | L95-101 | Contract authorship “goes through” gated adversarial review before execution: proposed label conflicts with operational present tense; current enforcement coverage is not demonstrated. |
| 3 | L156, L230 | Three-vendor daily handoffs through August 25: explicitly dated, but “every day” can sound current; timers/default model changed and hop execution remains under construction. No automatic update to the count. |
| 4 | L196-200 | Produced state kept running five days and spend did not fall: historical receipt needs precise event/method scope; scheduler retirement may change relevance, not erase the incident. |
| 5 | L240, L250 | Confidence in live mechanism and evidence instruction predating essay by years: current coverage and floating duration are unsupported by attached records. Avoid reading these as proof of a completed autonomous unit. |

### Polish acceptance criteria

- Real nondispatch opening and six explicitly synthetic timeout beats coexist without transferring evidence between them.
- Exactly one early thesis marker, matching ExecutiveSignal, complete metadata, E3 relatedSlug, and no invented published E5 route.
- Literal provenance labels use allowed badges; duplicate daily-handoff and five-day assertions become scoped, sourced receipt paragraphs.
- Four external footnotes, 41-source review record, six private-input boundaries, and corrected Sources anchor survive restructuring intact.
- Current ImplementationStatus is receipted independently of the synthetic companion; no implied measured enterprise benefit or originality.
- Seven voice findings and five stale candidates receive dispositions; Nick's hand-edited reuse bar, objections, and market uncertainty remain.
- Explicit E3 prior question, attribution-safe umbrella, and E5 promotion/withdrawal question make the arc handoff clear without completing E5's argument.
- Exact Sources heading, allowed components/imports/Terms, no body identifier leakage or em dashes, and later essay/prose/Node 22 verification checks pass.

### Polish or re-argue?

**Polish.** The binding-contract thesis directly answers E3's acceptance boundary and leaves room for E5's execution boundary. The six stages already acknowledge multidimensional maturity, wrong criteria, incomplete evidence, and market uncertainty. Reclassifying sourced external work, qualifying implemented coverage, and adding a forward question preserve the argument. The originality/landscape claim needs its separately requested prior-art review before any stronger novelty wording is published; this plan neither settles that review nor upgrades the existing bounded finding.

## Arc coherence: E1 to E5

This table uses the revised arc in `ARC-DELTA.md` and reading-path order, with E5's September 17 post-spec revision taking precedence over older outline wording. The path is a throughline across multiple series, not a renumbering or a literal architecture-layer map.

| Essay | Question | Thesis | Hands the next essay | Broken or missing handoff |
| --- | --- | --- | --- | --- |
| E1: Productivity Paradox | Why can task speed fail to improve delivery? | Governance and persistent context must connect local work to delivery. | Requirement for intent, dependencies, decisions, and evidence to survive sessions. | L207 promises a different Post 2; no E2 body link. Literal absence of infrastructure and rejection of gates conflict with E3/E4. Needs Nick's premise decision. |
| E2: Work Is a Graph | What must survive a session? | Durable artifact state makes work routable, resumable, and reviewable. | A graph depends on reusable artifacts whose identity and conditions of use must survive handoffs. | L278 previews the separate AI Workflows agenda; no E3 body link or capability-lineage question. Documented model must not masquerade as enforced runtime. |
| E3: Registry Wave | How can capability evolve without losing lineage or useful local variation? | Trusted artifact is not trusted use; preserve intended binding, loaded identity, execution evidence, and acceptance separately. | The Feature Contract makes this run's outcome obligations and accepting authority explicit. | E4 body link exists L278. L289 calls Envelope “the next essay,” which ambiguously skips E4 in the five-step path; record for the E3 owner, outside this leg's edits. |
| E4: Contract Is the Work | What defines and authorizes completion? | A binding contract preserves intent, evidence, amendments, and decision authority across specialists. | Contract authority still needs a boundary for model judgment, rule promotion, and withdrawal. | Close L242-252 has no Envelope question. E3 isn't named as the prior assurance problem. Companion link deepens E4 but does not replace arc handoff. |
| E5: Deterministic Envelope, planned | Which decisions need a model, and how can evidence change that boundary? | Validate promotion of judgment into deterministic rules and demotion back to judgment; enforcement must sit outside model discretion. | Open future measurement question: how much cognition was safely compiled away, and how would we detect unsafe compilation? | Not published; reading-path slug is null. September 17 spec supersedes older deterministic-model framing. Example choice remains open; sandbox/shadow-mode receipts are historical scopes, not current release proof. |

All three polish legs must distinguish body handoffs from `WhereThisSits` navigation. The shared umbrella already has an attribution-safe glossary entry. E3's cited Sun/OutSystems sources provide an existing attribution basis if reused explicitly; that does not authorize inventing a new novelty claim. The named model/scheduler changes supplied in the brief are review triggers only: none of E1/E2/E4 explicitly names Hermes, Opus 4.x, Opus 5, or Opus 5.5, so there is no literal version-name replacement to execute.

## Scope, limitations, and assumptions

Only this plan is authored. Essays, data, components, and E5 artifacts remain unchanged. Receipt availability is judged from each manuscript and supplied local context, not a fresh audit of the author's systems. The node JSON was read from `.leg/`; no completion mutation was made. Inbox checks found no pending additions.

```json
{"assumptions":[{"claim":"The November directory count in E1 has no clearly stated inventory as-of date even though its origin story is dated.","confidence":0.9,"blast_radius":"low","evidence_if_wrong":"A supplied dated inventory receipt can remove the as-of ambiguity without changing the incident."},{"claim":"E2's lost-discovery paragraph is a conceptual example rather than a documented single run.","confidence":0.9,"blast_radius":"med","evidence_if_wrong":"An author-supplied run receipt could support a historical opening and observed thread beats."}]}
```
