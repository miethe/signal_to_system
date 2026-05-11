---
title: Implementation Plan — Living Workflow Showcase
description: "Phase-by-phase task breakdown for interactive visualization of the Governed Agentic SDLC workflow, with stage progression unlocked as blog series ships."
audience: [ai-agents, developers]
tags: [blog-feature, visualization, workflow, agentic-sdlc, implementation]
created: 2026-05-10
status: draft
category: site-feature
related:
  - "/Users/miethe/dev/homelab/development/signal_to_system/docs/specs/workflow-showcase-prd.md"
  - "/Users/miethe/dev/homelab/development/signal_to_system/docs/specs/ui-showcase-v2-implementation.md"
---

# Implementation Plan: Living Workflow Showcase

**Complexity**: Large (L) | **Track**: Full | **Total Effort**: ~28–35 story points | **Timeline**: 5–6 weeks

---

## Executive Summary

The Living Workflow Showcase is an interactive companion feature that visualizes Nick Miethe's actual Governed Agentic SDLC workflow as a scrubbable, stage-by-stage artifact. Each post in the blog series unlocks a new stage, showing readers a live example of PRD authoring, planning, governance, and agent coordination. This plan covers five phases: (1) SPIKE to select interaction tech; (2) build the reusable `<WorkflowStage>` component shell and routing; (3–4) author Stage 1 and Stage 2 content; (5) polish, accessibility audit, and launch. The feature is production-ready when both stages render smoothly, "try it yourself" CTAs convert, and accessibility is WCAG AA compliant.

---

## Implementation Strategy

### Sequencing & Critical Path

**Phase 0 (SPIKE)** is the unlock: the tech choice for scrubber interaction (Framer Motion vs. asciinema vs. hybrid) gates the component API design in Phase 1. Phases 1 and 0 must complete sequentially before downstream work begins.

**Phase 1** (component shell + routing) is parallel-safe: it defines the data schema and component API, allowing Phases 2–4 (content authoring) to run in parallel once the shell is validated. Phase 1 is critical path.

**Phases 2–4** (stage authoring) depend only on Phase 1 completion and can run independently. These can be parallelized or staggered based on blog post publication timing.

**Phase 5** (polish + launch) depends on Phases 1–4 completion. It unblocks production deployment.

```
Phase 0 (SPIKE) ──┐
                 ├─→ Phase 1 (Shell + Routing) ──┐
                                                  ├─→ [Phase 2, 3, 4 parallel]
                                                  ├─→ Phase 5 (Polish + Launch)
```

### Parallelization Opportunities

- **Phase 2 & 3 authoring**: Once Phase 1 shell is complete, Stage 1 and Stage 2 content can be authored in parallel if two developers are available. Data schema must be final before this split.
- **Phase 1 cleanup (A11y, performance)**: Accessibility and performance tuning in Phase 5 can start early if Phase 1 component is complete, allowing Phase 5 to happen in parallel with content authoring in Phases 2–3.

### Risk Management

The primary risk is **interaction tech choice regret**: selecting Framer Motion in Phase 0 but discovering poor performance or bundle size in Phase 1 testing. Mitigation: Phase 0 SPIKE includes prototypes with actual metrics. Secondary risk is **content authoring friction**: if the stage data schema is painful to author, Phases 2–3 slip. Mitigation: test schema with one real stage before declaring Phase 1 complete.

---

## Phase 0: SPIKE — Interaction Technology Choice

**Duration**: 1–2 days | **Effort**: 4 SP | **Exit Criteria**: ADR-style SPIKE decision doc with rejection rationale

**Goal**: Evaluate interaction tech candidates (Lottie/Framer Motion vs. asciinema-style scrubber vs. Monaco IDE mock vs. hybrid scrubber+panels) and lock in a recommendation before Phase 1 begins.

### Tasks

| ID | Task | Description | Acceptance Criteria | Est | Assigned |
|----|------|-------------|-------|-----|----------|
| **WS-0.1** | Design SPIKE evaluation criteria | Define metrics: bundle size impact, interaction latency, authoring ergonomics (how hard to script a stage), accessibility story, visual fidelity. Document in spike-writer doc. | Metrics defined; examples provided (e.g., "Framer Motion: <35KB gzipped, <100ms scrub latency"). | 2 SP | spike-writer |
| **WS-0.2** | Build minimal prototypes for each candidate | (1) Framer Motion + state machine: play/pause/scrub through 5 mock steps. (2) Asciinema-style cast player: replay 5-step cast file with scrubber. (3) Monaco IDE mock: syntax-highlighted artifact panels with step transitions. Pick top 2 to prototype. | Working demo for each; bundle size measured via `esbuild --analyze`. Performance profile from Chrome DevTools. | 5 SP | frontend-architect |
| **WS-0.3** | Measure bundle size, interaction latency, and accessibility implications | For each prototype: (a) gzipped bundle size (target: <60KB Showcase-specific code). (b) Paint-to-interactive latency (target: <100ms scrub response). (c) Screen reader behavior (do panels update with aria-live?). (d) Keyboard navigation feasibility. | Comparison table: candidate, bundle size, latency, a11y grade, recommendation ranking. | 3 SP | frontend-architect |
| **WS-0.4** | Evaluate authoring ergonomics per tech | For each candidate, document how painful it is to script a stage. Example: Framer Motion requires writing step objects in JSON; asciinema requires cast files; Monaco mock requires artifact JSON. Rate on 1–5 (1=painful, 5=smooth). | Authoring checklist per tech (e.g., "Framer Motion: write JSON step object, define animation timing, test in browser"). | 2 SP | frontend-architect |
| **WS-0.5** | Document SPIKE findings and recommendation | Write SPIKE doc at `docs/specs/workflow-showcase-spike.md`: executive summary, evaluation criteria, candidate analysis (pros/cons per candidate), metrics comparison table, rejected alternatives section, final ADR recommendation. | SPIKE doc published; clear recommendation locked in (e.g., "Recommend hybrid Framer Motion + custom state machine"). Team consensus on decision. | 3 SP | spike-writer |

### Quality Gates

- SPIKE doc is published at `docs/specs/workflow-showcase-spike.md`
- Decision is ADR-style with rejection rationale for each alternative
- Metrics are quantified (bundle size in KB, latency in ms)
- Recommendation is clear and defended with evidence
- No ambiguity remains for Phase 1 implementation

### Assigned Subagents

- **spike-writer**: Document structure, synthesis, ADR format
- **frontend-architect**: Prototypes, metrics measurement, accessibility evaluation

---

## Phase 1: Reusable Stage Component Shell + Routing + Data Schema

**Duration**: 3–4 days | **Effort**: 7 SP | **Exit Criteria**: `<WorkflowStage>` component compiles and renders with test fixture; routing works; types are sound

**Goal**: Build the reusable `<WorkflowStage>` React island, Astro page infrastructure, TypeScript types, Zod schema (if using content collections), Nanostores state, shared UI primitives, and Tailwind tokens. End with a test fixture stage to validate shell works end-to-end.

### Key Files Created/Modified

- `src/components/islands/WorkflowStage.tsx` (new; React island, main component)
- `src/pages/workflow-showcase.astro` (new; Astro page)
- `src/stores/workflow-stage.ts` (new; Nanostores atoms for active stage, expanded panels)
- `src/types/workflow.ts` (new; TypeScript types for stage manifest)
- `src/data/workflow-stages.json` (new; stage manifest: id, title, steps[], artifacts[], metrics[], ctaLinks[])
- `src/components/islands/WorkflowScrubber.tsx` (new; scrubber/timeline UI)
- `src/components/islands/WorkflowArtifactPanel.tsx` (new; tab-based artifact display)
- `src/components/islands/WorkflowMetrics.tsx` (new; metrics overlay)
- `src/components/islands/WorkflowCTACard.tsx` (new; "try it yourself" card)
- `src/styles/workflow-showcase.css` (new; Tailwind v4 theme tokens for stage UI)
- `src/CLAUDE.md` (modified; add workflow-showcase notes if needed)

### Tasks

| ID | Task | Description | Acceptance Criteria | Est | Assigned |
|----|------|-------------|-------|-----|----------|
| **WS-1.1** | Design and document stage data schema | Create TypeScript types for stage manifest: `Stage { id, postSlug, title, steps[], artifacts[], metrics[], ctaLinks[] }`. Each step: `{ stepId, label, terminal[], panels[], metrics? }`. Each artifact: `{ type ('prd' \| 'plan' \| 'progress' \| 'agents'), title, content (raw text or path to file) }`. Document in types file with examples. | TypeScript types are complete and exported from `src/types/workflow.ts`. Zod schema optional but recommended. Example stage manifest shows all fields. | 2 SP | frontend-architect |
| **WS-1.2** | Build `<WorkflowStage>` React island component | Main island that orchestrates: (1) scrubber (controls step progression), (2) artifact panels (tabs/accordions), (3) metrics overlay, (4) CTA card. Props: stage data, active step index, callbacks for step change/panel toggle. Uses Nanostores atoms. Per PRD: scrubber is delegated to SPIKE-chosen tech (Framer Motion or custom state machine). | Component renders without errors. Props are typed. Nanostores integration works (active step persists across re-renders). No console errors. Component accepts test fixture data. | 5 SP | frontend-architect |
| **WS-1.3** | Build scrubber/timeline UI component | Horizontal timeline with discrete step indicators. Desktop: draggable slider or clickable progress bar. Mobile: prev/next buttons only (no dragging). Step styling: active (bold/highlighted), visited (checkmark), unvisited (faded). Visual feedback instant. Uses SPIKE-recommended tech for animations. | Timeline renders correctly on desktop and mobile. Dragging/clicking steps updates active step. No layout shift. Styling matches wireframe. Keyboard navigation support (arrow keys). | 4 SP | frontend-architect |
| **WS-1.4** | Build artifact panel component | Tabbed (desktop) or accordion (mobile) display for PRD, plan, progress, agent roles. Each tab shows artifact content (code block or formatted text). Content is scrollable if tall. Copy-to-clipboard button on code blocks. Styling: mono font for YAML/JSON, prose font for text. Dark mode support. | Tabs/accordions toggle without full component re-render. Content displays with correct syntax highlighting (if applicable). Copy button works. Mobile accordion stacks vertically. | 3 SP | frontend-architect |
| **WS-1.5** | Build metrics overlay component | Small overlay (bottom-right or top-right corner) displaying: Tokens Used, Throughput (tokens/sec), Cost ($). Styled consistently with site theme. Optional: animated counter for tokens/cost. Dismissible (close icon). Data sourced from stage config JSON. | Overlay renders in corner without obscuring main content. Metrics are readable (sufficient contrast). Close button functional. Position adaptive on mobile (move to top if bottom-right is cramped). | 2 SP | frontend-architect |
| **WS-1.6** | Build CTA card component | Bottom of scrubber viewport: card with icon, benefit-driven copy ("Unlock planning layers like Nick does"), button linking to MeatySkills repo. Skill link per stage (e.g., Stage 1 → spike skill, Stage 2 → planning skill). Copy is clear and benefit-focused. | Card renders below scrubber. Button is href-based (no JS required). Link is correct per stage config. Card is not obscured by metrics overlay. Mobile: full-width card. | 2 SP | frontend-architect |
| **WS-1.7** | Wire Nanostores state for active stage + panel toggles | Create atoms: `activeStageId` (tracks which stage is displayed), `expandedPanels` (Set of artifact types currently shown). Functions to toggle panels. Initialize from localStorage if available (persist panel state across visits). | Atoms are exported from `src/stores/workflow-stage.ts`. Toggling panel in WorkflowStage island updates store. Other islands react to state changes. No memory leaks. | 2 SP | frontend-architect |
| **WS-1.8** | Build Astro page (`/workflow-showcase/`) with routing | Create `src/pages/workflow-showcase.astro`: renders WorkflowStage island, passes active stage ID from URL params (`?stage=N` or URL slug). Page shell: nav, layout, theme integration. Stage selector (dropdown or carousel) to jump between stages. Load only published stages (query blog collection for published posts, filter stages). | Page loads without errors. Stage selector works (click stage, URL updates, island re-renders). Published stages appear; unreleased stages hidden. URL parameter parsing works (`?stage=1`). Dark/light mode works. | 4 SP | frontend-architect |
| **WS-1.9** | Create Tailwind v4 theme tokens for Showcase UI | Define color tokens for: active step highlight, visited step checkmark, scrubber bar background, panel backgrounds, CTA button. Use `@theme` block in `src/styles/workflow-showcase.css` to avoid polluting global theme. Validate tokens in light and dark modes. | CSS file created; tokens applied to all Showcase components. Light mode contrast passes WCAG AA. Dark mode contrast passes WCAG AA. No color conflicts with site theme. | 2 SP | frontend-architect |
| **WS-1.10** | Create test fixture stage in config | Create a minimal but realistic test stage with 5–8 mock steps, sample artifacts (mock PRD excerpt, mock plan table, mock progress YAML), sample metrics. Place in `src/data/workflow-stages.json`. Use this to validate Phase 1 shell works end-to-end before authoring real content. | Test stage is in config. `<WorkflowStage>` island accepts test data and renders without errors. Scrubber, panels, metrics, and CTA card all display. No console errors. | 1 SP | frontend-architect |
| **WS-1.11** | Build and validate Phase 1 shell end-to-end | Run `npm run build` with test fixture stage. Verify: `/workflow-showcase/?stage=0` (or test stage ID) loads, renders scrubber + panels + metrics + CTA. Test scrubber interaction (click/drag steps). Verify no TypeScript errors. Validate bundle size increase (<60KB gzipped for Showcase code). | Build passes with zero errors. Test page loads in <2.5s (LCP target). Scrubber latency <100ms. No console errors in browser. Bundle size delta measured and within budget. | 2 SP | frontend-architect |
| **WS-1.12** | Document component API and stage authoring guide (preliminary) | Write brief README for WorkflowStage component in code comments: props interface, expected stage data shape, example stage config. Create `docs/specs/workflow-showcase/stage-authoring-template.md` with checklist of what content each stage needs (script, artifacts, metrics, CTA link). | Component API documented in code. README is clear enough for next phases. Authoring template exists and includes field descriptions, examples, file naming conventions. | 2 SP | documentation-writer |

### Quality Gates

- `npm run build` passes; zero TypeScript errors
- Test fixture stage renders without console errors
- `/workflow-showcase/?stage=test` loads and is interactive
- Scrubber interaction latency <100ms (measured via Chrome DevTools)
- LCP <2.5s for initial load
- Bundle size for Showcase code <60KB gzipped
- Nanostores state persists across page reloads (localStorage)
- Dark mode renders correctly
- Component API is documented and ready for content authors
- All Tailwind tokens apply correctly (light and dark modes)

### Assigned Subagents

- **frontend-architect**: Component design, Nanostores integration, performance tuning, theme tokens
- **documentation-writer**: API documentation, stage authoring template

---

## Phase 2: Stage 1 — Post 1 Baseline Content

**Duration**: 2–3 days | **Effort**: 5 SP | **Exit Criteria**: Stage 1 renders with 5–8 steps, artifact panels show content, metrics visible, CTA links to spike skill

**Goal**: Author the "pre-governance" stage, showing what an ungoverned agentic workflow looks like. 5–8 steps illustrating: vague prompt → confident-and-wrong output → no traceability → session ends → no learning carried forward. Artifact panels show absence of structure. Metrics show the "before" baseline (real or curated data).

### Key Artifacts

- Update `src/data/workflow-stages.json` to add Stage 1 config
- Create artifact files (or inline content): mock pre-governance PRD excerpt (showing lack of structure), mock agent session log (showing wrong output), mock progress file (or notes showing no tracking)
- Curate metrics data (tokens, throughput, cost) for Stage 1

### Tasks

| ID | Task | Description | Acceptance Criteria | Est | Assigned |
|----|------|-------------|-------|-----|----------|
| **WS-2.1** | Script Stage 1 workflow steps | Write 5–8 steps showing the ungoverned agentic workflow from the blog post. Example steps: (1) "Prompt written (vague)", (2) "Agent generates output", (3) "Output is confident but wrong", (4) "Developer trusts output, no verification", (5) "Implementation fails in prod", (6) "No post-mortem recorded", (7) "Same mistake happens again next week", (8) "Lessons lost". Each step is a label and a set of terminal/panel content that animates in. | Step sequence is coherent and matches Post 1 narrative. Terminal copy is concise and illustrative (not full logs, just key lines). Labels are clear. Steps progress logically. | 2 SP | content-curator |
| **WS-2.2** | Curate and author artifact content for Stage 1 | Create artifact panels: (1) Pre-governance PRD (show a vague feature request with no spec structure, no frontmatter). (2) Agent session log (show agent making a wrong assumption, hallucinating details). (3) Notes/progress (show lack of traceability, no record of why decision was made). Use real or realistic synthetic data (avoid round numbers; use actual token counts from workflow if available). | Artifacts are readable and illustrative of the "before" state. PRD is intentionally vague. Agent log shows a plausible hallucination. Progress notes show no structure. Content is anonymized if from real workflows. | 3 SP | content-curator, technical-writer |
| **WS-2.3** | Populate metrics for Stage 1 | Collect or synthesize metrics: tokens used, throughput, cost, wall-clock time. Use real data from Post 1's workflow if available (query CCDash or curate from logs). If unavailable, create illustrative but realistic metrics (e.g., "1.2M tokens, 8.5K tokens/sec, $3.75, 7m 23s"). Label as curated for clarity. | Metrics JSON is valid. Numbers are realistic (not round). Metrics are present for all tracked fields (tokens, throughput, cost, time). Data source documented (real/curated). | 1 SP | technical-writer |
| **WS-2.4** | Add Stage 1 to workflow-stages.json config | Create Stage 1 entry: id, postSlug (post-1-baseline), title, steps (with terminal and panel content), artifacts (PRD, agent log, progress notes), metrics (tokens, throughput, cost), ctaLinks (spike skill). Validate JSON. | Config entry is valid JSON. Stage 1 appears in stage selector. Clicking Stage 1 loads it. Scrubber shows all 5–8 steps. Artifact tabs show content. Metrics overlay shows numbers. CTA links to correct skill. | 2 SP | ai-artifacts-engineer |
| **WS-2.5** | Test Stage 1 rendering and interaction end-to-end | Load `/workflow-showcase/?stage=1` (or equivalent). Scrub through all steps. Expand all artifact panels. Verify dark mode. Check for console errors. Validate metrics display. Click CTA button (verify href). | Page loads without errors. Scrubber progresses through all 8 steps. Each step's terminal and panels update. Artifact tabs toggle without full re-render. Metrics visible and readable. CTA button href is correct. Dark/light mode both work. | 2 SP | frontend-architect |

### Quality Gates

- Stage 1 loads and is fully interactive
- All 5–8 steps render with content
- Artifact panels display correctly (PRD, agent log, progress)
- Metrics overlay shows data
- CTA button links to spike skill repo
- Dark mode works
- No console errors
- Scrubber interaction <100ms latency

### Assigned Subagents

- **content-curator**: Script Stage 1 workflow steps
- **technical-writer**: Artifact content, metrics curation
- **frontend-architect**: Testing and validation
- **ai-artifacts-engineer**: JSON config management

---

## Phase 3: Stage 2 — Post 2 IDD Content

**Duration**: 2–3 days | **Effort**: 5 SP | **Exit Criteria**: Stage 2 renders with 6–10 steps, shows spec authoring and planning workflow, CTA links to planning skill

**Goal**: Author the "spec layer" stage, showing how the Governed Agentic SDLC introduces structure. 6–10 steps illustrating: feature request → PRD with frontmatter → plan generation → progress tracking → agent execution → verification. Artifact panels show real (anonymized) spec/plan/progress artifacts from Post 2. Metrics show the "after" improvement (curated, illustrative).

### Key Artifacts

- Update `src/data/workflow-stages.json` to add Stage 2 config
- Create artifact files: sample PRD with frontmatter (YAML header), sample plan table (markdown), sample progress file (YAML with status tracking), agent role labels
- Curate metrics data showing improvement from Stage 1

### Tasks

| ID | Task | Description | Acceptance Criteria | Est | Assigned |
|----|------|-------------|-------|-----|----------|
| **WS-3.1** | Script Stage 2 workflow steps | Write 6–10 steps showing the IDD spec layer from Post 2. Example: (1) "Feature request received", (2) "PRD authored with frontmatter (title, complexity, effort)", (3) "Plan generated from PRD", (4) "Progress file initialized", (5) "Agent team assigned (frontend, backend, testing)", (6) "Context loaded (PRD, plan, voice guide)", (7) "Execution begins with contract", (8) "Progress updated in real-time", (9) "Execution completes", (10) "Lessons recorded in progress file". Each step is a label + terminal/panel content. | Step sequence matches Post 2 narrative. Each step builds on previous. Terminal shows actual YAML frontmatter, plan snippets, progress snapshots. Labels are clear. Progression is logical. | 3 SP | content-curator |
| **WS-3.2** | Curate and author artifact content for Stage 2 | Create artifacts: (1) PRD with YAML frontmatter (show title, description, audience, tags, complexity, effort, status, related links). (2) Plan table excerpt (show phase breakdown, task estimates). (3) Progress file (YAML with completed tasks, in-progress, blocked, metrics). (4) Agent roles (show team composition with role badges). Use real examples from Post 2 if available; anonymize sensitive content. | Artifacts are realistic and show actual frontmatter/plan/progress structure. YAML is valid. PRD frontmatter is properly formatted. Plan table is readable. Progress shows real status tracking. Anonymization is clean (no accidental private data). | 3 SP | content-curator, technical-writer |
| **WS-3.3** | Populate metrics for Stage 2 | Collect or synthesize metrics showing improvement vs. Stage 1: higher fidelity planning, lower hallucination rate, faster execution, or lower cost. Use real data if available; if not, create illustrative metrics (e.g., "2.1M tokens, 12K tokens/sec, $5.50, 9m 15s"). Label as curated. Note improvement delta vs. Stage 1. | Metrics JSON is valid. Numbers show plausible improvement from Stage 1 (e.g., higher throughput, similar or lower cost due to better planning). Metrics documented as curated. | 1 SP | technical-writer |
| **WS-3.4** | Add Stage 2 to workflow-stages.json config | Create Stage 2 entry: id, postSlug (post-2-spec-layer), title, steps (with terminal and panel content), artifacts (PRD, plan, progress, agents), metrics (tokens, throughput, cost), ctaLinks (planning + artifact-tracking skills). Validate JSON. | Config entry is valid JSON. Stage 2 appears in stage selector. Clicking Stage 2 loads it. Scrubber shows all 6–10 steps. Artifact tabs show all artifact types (PRD, plan, progress, agents). Metrics visible. CTA links to correct skills. | 2 SP | ai-artifacts-engineer |
| **WS-3.5** | Test Stage 2 rendering and interaction end-to-end | Load `/workflow-showcase/?stage=2`. Scrub through all steps. Expand all artifact panels. Verify dark mode. Console error check. Metrics and CTA validation. Compare Stage 1 → Stage 2 progression. | Page loads without errors. All 6–10 steps render and animate. Artifacts display (all 4 types: PRD, plan, progress, agents). Metrics show improvement. CTA buttons href to correct skills. Dark/light mode work. No console errors. Scrubber latency <100ms. | 2 SP | frontend-architect |

### Quality Gates

- Stage 2 loads and is fully interactive
- All 6–10 steps render with content
- All artifact types display (PRD, plan, progress, agents)
- Metrics overlay shows improvement vs. Stage 1
- CTA buttons link to planning and artifact-tracking skills
- Dark mode works
- No console errors
- Scrubber interaction <100ms latency
- Stage 1 and Stage 2 both accessible via stage selector

### Assigned Subagents

- **content-curator**: Script Stage 2 steps and artifact content
- **technical-writer**: Metrics curation and artifact formatting
- **frontend-architect**: Testing and validation
- **ai-artifacts-engineer**: JSON config management

---

## Phase 4: Blog-to-Showcase Link Integration + Navigation Polish

**Duration**: 1 day | **Effort**: 2 SP | **Exit Criteria**: Blog posts can deep-link to stages; stage selector is polished

**Goal**: Update blog posts (Post 1 and Post 2) to include links that deep-link to the corresponding Showcase stage (`/workflow-showcase/?stage=1`, `?stage=2`). Ensure stage selector UX is polished (dropdown or carousel) and navigation is frictionless.

### Tasks

| ID | Task | Description | Acceptance Criteria | Est | Assigned |
|----|------|-------------|-------|-----|----------|
| **WS-4.1** | Implement stage selector UI (dropdown or carousel) | Add dropdown or carousel nav to Showcase page: shows all published stages with stage number, post title, publication date. Clicking a stage updates URL and loads stage. Selector is accessible (keyboard nav, focus rings, aria-label). Mobile: dropdown; desktop: dropdown or carousel. | Selector renders correctly. Clicking stages updates URL without page reload (client-side nav). Accessibility: keyboard nav works, focus visible. Mobile dropdown is full-width and touch-friendly. | 2 SP | frontend-architect |
| **WS-4.2** | Add deep-link handling in Showcase page | Astro page now parses `?stage=N` URL param and passes active stage to island. Default: load latest published stage. If `?stage=X` doesn't exist, 404 or fallback to latest. Validate post exists in blog collection before rendering stage. | URL param parsing works. Landing on `/workflow-showcase/?stage=1` loads Stage 1. Bad stage ID falls back gracefully. Only published stages are linkable. | 1 SP | frontend-architect |
| **WS-4.3** | Add links from blog posts to Showcase | Update Post 1 and Post 2 blog content to include contextual links to the Showcase: "See this in action in the [Workflow Showcase](#)" (link to `/workflow-showcase/?stage=1`). Link placement: mention in introduction or at end of post. Test links from blog content. | Blog posts have links to Showcase. Links are `<a href="/workflow-showcase/?stage=1">` format. Clicking link navigates to correct stage. Link text is benefit-driven ("See this workflow in action"). | 1 SP | content-curator |
| **WS-4.4** | Validate URL scheme is permanent | Document URL scheme in CLAUDE.md or tech spec: `/workflow-showcase/?stage=N` is permanent; if stage order changes, maintain URL mapping via a config. Test that changing stage order doesn't break old links. | URL scheme is documented. Mapping is configurable (e.g., `stage=post-1` vs. `stage=1`). Old links continue to work if stages are reordered. | 1 SP | documentation-writer |

### Quality Gates

- Stage selector renders and is accessible
- URL param parsing works (`?stage=1`, `?stage=2`)
- Blog posts link to Showcase with correct stage IDs
- Links navigate without page reload
- Mobile stage selector is usable
- No broken links

### Assigned Subagents

- **frontend-architect**: Selector UI and URL handling
- **content-curator**: Blog post links
- **documentation-writer**: URL scheme documentation

---

## Phase 5: Accessibility, Mobile Optimization, Performance Validation, and Launch

**Duration**: 2–3 days | **Effort**: 6 SP | **Exit Criteria**: WCAG AA audit passed, LCP <2.5s, bundle size acceptable, mobile experience validated, analytics wired, ready to ship

**Goal**: Comprehensive accessibility audit, mobile testing, performance measurement, analytics integration, final QA, and production deployment.

### Tasks

| ID | Task | Description | Acceptance Criteria | Est | Assigned |
|----|------|-------------|-------|-----|----------|
| **WS-5.1** | Accessibility audit (WCAG AA compliance) | Run axe DevTools on Showcase page with both stages. Checklist: (1) Keyboard navigation complete (Tab through controls, arrow keys for scrubber, Enter to select steps). (2) Focus rings visible in light and dark modes. (3) aria-live regions for scrubber step announcements. (4) Artifact panel tabs have aria-selected and role="tab". (5) Color not the only indicator (steps use icons + color). (6) Alt text on graphics. (7) Sufficient color contrast (4.5:1 for text). Document findings; fix issues. | Zero axe audit failures. Keyboard nav complete: Tab cycles through all controls, arrow keys scrub, Escape dismisses modals. Focus rings visible. aria-live announces step changes. WCAG AA compliance confirmed. | 3 SP | frontend-architect |
| **WS-5.2** | Mobile responsiveness testing | Test on multiple devices/viewports: iPhone 12 (~390px), iPad (~768px), desktop (>1024px). Verify: (1) No horizontal scroll. (2) Scrubber layout adapts (buttons stack on mobile, slider on desktop). (3) Artifact panels become tabs/accordion on mobile. (4) Touch targets >=44px. (5) Text readable without pinch-zoom. (6) Metrics overlay doesn't obscure content on small screens. Document results; fix issues. | Device testing results documented. No horizontal scroll on any breakpoint. Touch targets >=44px. Text readable on all devices. Artifact panels responsive. Metrics overlay positioned safely on mobile. | 2 SP | frontend-architect |
| **WS-5.3** | Performance validation and optimization | Measure and log: (1) Lighthouse Performance score (target >=90). (2) LCP (target <2.5s) via Lighthouse/WebVitals. (3) Scrubber interaction latency (target <100ms) via Chrome DevTools. (4) Bundle size delta (target <60KB gzipped for Showcase code). Optimize if needed: code-split, lazy-load, optimize images. Document baseline and optimized measurements. | Lighthouse Performance score >=90. LCP <2.5s. Scrubber latency <100ms (measured). Bundle size <60KB gzipped. Measurements logged in PR. | 3 SP | frontend-architect |
| **WS-5.4** | Wire analytics event tracking | Add event tracking for: (1) Stage view (log stage ID, post slug). (2) Scrub action (log step index). (3) Panel expand/collapse (log artifact type). (4) CTA click (log skill name, stage ID). Use Plausible or site's existing analytics. Events logged without PII. Verify events fire in browser console. | Event tracking code added to components. Console logs show events firing. Analytics backend receives events. Event structure documented (event name, properties). No PII in events. | 2 SP | frontend-architect |
| **WS-5.5** | Final QA pass (smoke test) | (1) Load Showcase on Chrome, Safari, Firefox (desktop + mobile). (2) Test Stage 1 and 2 scrubbers fully. (3) Test artifact panel toggling. (4) Verify CTA buttons navigate correctly. (5) Check dark mode on all browsers. (6) Verify metrics overlay renders. (7) Confirm no console errors. Document test results. | Testing checklist completed for all browsers. No console errors. All interactions work smoothly. Dark/light mode both correct. Performance acceptable on all devices. Ready for production. | 2 SP | frontend-architect |
| **WS-5.6** | Update navigation and sitemap | Add link to Showcase in site nav (header or footer). Update `sitemap.xml` to include `/workflow-showcase/` (mark published stages as included, unreleased stages as noindex or excluded). Update `public/llms.txt` if applicable (add note about Showcase feature for AI agents). | Nav link visible and navigates correctly. Sitemap includes `/workflow-showcase/`. URL shows in search console. llms.txt updated (optional but recommended). | 1 SP | documentation-writer |
| **WS-5.7** | Final build, deployment, and verification | Run `npm run build` and `npm run check`. Zero errors. Deploy to main branch via GitHub Pages (or manual trigger). Verify site is live: load `/workflow-showcase/` on production, test both stages, verify dark mode, check metrics. | Build passes (zero errors, zero warnings). Deployment successful. Site live and accessible. Both stages functional on production. Performance acceptable. Analytics events logging. | 1 SP | general-purpose |
| **WS-5.8** | Document Phase 5.5 stage authoring workflow for blog-drafter | Create or update `docs/specs/workflow-showcase/stage-authoring-template.md` with detailed checklist for authoring future stages (Stages 3+). Checklist: (1) Identify blog post number and topic. (2) Script 6–10 workflow steps. (3) Collect/curate artifact content (PRD, plan, progress, agents). (4) Gather metrics (tokens, throughput, cost, time). (5) Create stage config entry in JSON. (6) Test stage rendering. (7) Add blog post link to Showcase. Include template code snippets and examples. | Template is comprehensive and actionable. Checklist can be followed independently. Examples provided. Expected effort per stage documented (~1–2 days). | 2 SP | documentation-writer |

### Quality Gates

- WCAG AA audit passed (zero critical issues)
- Mobile tested on 3+ breakpoints (390px, 768px, >1024px)
- Lighthouse Performance >=90
- LCP <2.5s
- Scrubber interaction latency <100ms
- Bundle size <60KB gzipped
- Analytics events firing correctly
- Dark and light modes render correctly
- No horizontal scroll on any breakpoint
- Touch targets >=44px
- Sitemap and nav updated
- Build passes with zero errors/warnings
- Site live and fully functional on production

### Assigned Subagents

- **frontend-architect**: Accessibility audit, mobile testing, performance validation, final QA
- **documentation-writer**: Navigation/sitemap updates, stage authoring template
- **general-purpose**: Build and deployment

---

## Phase 5.5: Blog-Drafter Integration (Metadata & Workflow Update)

**Duration**: 1 day | **Effort**: 2 SP | **Status**: Deferred until first post-publication stage authoring

**Goal**: Update the blog-drafter skill to include a "Phase 5.5: Stage Authoring" step that triggers when a blog series post is published. This ensures future stages (3+) are authored as part of the standard blog publication workflow, not as ad-hoc tasks.

### Tasks

| ID | Task | Description | Acceptance Criteria | Est | Assigned |
|----|------|-------------|-------|-----|----------|
| **WS-5.5a** | Update blog-drafter skill with Stage Authoring phase | Add Phase 5.5 to blog-drafter SKILL.md: "After post publication, author Showcase stage if part of Governed Agentic SDLC series." Checklist references the stage-authoring-template.md. Provides example: "For Post 3, create stage config entry, script 8 steps, gather artifacts, test rendering, add blog link." | Blog-drafter SKILL.md includes Phase 5.5 section. Section is actionable and references stage template. Expected effort per stage is documented. | 1 SP | ai-artifacts-engineer |
| **WS-5.5b** | Document metadata sync between blog posts and Showcase stages | Document how post frontmatter (published date, series post number) maps to stage config (postSlug, stageId). Ensure a post's stage can be queried from its frontmatter. This enables automatic stage ordering and unlocking as posts publish. | Metadata mapping documented. Post number → stage ID mapping is clear. Recommendation: use `postNumber` in blog frontmatter to auto-generate stage order. | 1 SP | documentation-writer |

### Assigned Subagents

- **ai-artifacts-engineer**: Blog-drafter skill update
- **documentation-writer**: Metadata sync documentation

---

## Effort Breakdown by Subagent

| Subagent | Phases | Effort | Notes |
|----------|--------|--------|-------|
| **spike-writer** | 0 | 5 SP | SPIKE doc, evaluation criteria, synthesis |
| **frontend-architect** | 0, 1, 2, 3, 4, 5 | 20 SP | Component shell, scrubber, panels, routing, a11y audit, performance, mobile testing, final QA |
| **content-curator** | 2, 3, 4 | 5 SP | Script stages, artifact content, blog post links |
| **technical-writer** | 1, 2, 3, 5 | 4 SP | Component API docs, artifact/metrics curation, stage template, nav/sitemap |
| **ai-artifacts-engineer** | 1, 2, 3, 5.5 | 3 SP | Stage config JSON management, blog-drafter integration |
| **documentation-writer** | 1, 4, 5, 5.5 | 5 SP | API docs, URL scheme, a11y/mobile/perf docs, stage template, blog-drafter update |
| **general-purpose** | 5 | 1 SP | Final build and deployment |
| **Total** | — | **32 SP** | — |

---

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| **SPIKE tech choice regret** | Phase 0 locks in wrong interaction tech; Phase 1 component is unsuitable | Phase 0 prototypes all candidates with bundle size/latency measurements before deciding. Lock decision in writing (SPIKE doc). |
| **Data schema authoring friction** | Stages 2–3 slip due to painful JSON or artifact sourcing | Phase 1 includes test fixture + validation. Author one full stage in Phase 1 before declaring shell complete. Iterate schema if needed. |
| **Mobile scrubber awkwardness** | Mobile users can't figure out prev/next or prefer-reduced-motion not respected | Phase 1 includes mobile-first button layout. Phase 5 includes prefer-reduced-motion testing. Afforance text: "Tap next/prev to step through." |
| **Performance regression on site** | Blog pages slow down due to Showcase JS bloat | Isolate Showcase to `/workflow-showcase/` page only (lazy-load island). Phase 5 measures bundle delta. Target <60KB gzipped. Validate no regression on blog pages. |
| **Unreleased stages leak in build/search** | Future stages appear in sitemap or are indexed | Build-time check: only include stages where post exists in blog collection. Use data attr to mark unreleased. Test with GoogleBot or search simulator. |
| **"Try it yourself" links break or skills are outdated** | CTA traffic drives users to broken or stale repos | Audit MeatySkills before launch. Link to stable release tags, not main branch. Add disclaimer in CTA: "Requires setup; see repo README." Validate links monthly. |
| **Scrubber feels janky on low-end devices** | Mobile experience poor; users abandon | Phase 1 targets <100ms interaction latency. Phase 5 tests on low-end device (Moto G7 emulation). If animation stutters, fall back to static state changes (no animation). |
| **Demo theater perception (curated data looks fake)** | Readers distrust metrics as fabricated | Use real data from actual workflow when possible. If anonymized, label clearly ("curated for privacy"). Avoid round numbers (987K tokens looks more real than 1M). |
| **Stage authoring becomes bottleneck** | Blog-drafter phase 5.5 not enforced; stages fall behind posts | Document stage authoring as forcing function in blog-drafter. Provide template and checklist (expected ~1–2 days per stage). Monitor blog post → stage lag. |

---

## Success Criteria

All must be true for feature launch:

1. **SPIKE decision locked**: ADR-style doc published; tech choice is defensible and final
2. **Component shell works**: `/workflow-showcase/?stage=0` (test fixture) loads, renders, is interactive, no errors
3. **Stages 1–2 live**: Both stages fully authored, content renders, scrubber latency <100ms, no console errors
4. **Accessibility compliant**: WCAG AA audit passed; keyboard nav complete, focus rings visible, aria-live regions work
5. **Mobile responsive**: No horizontal scroll; touch targets >=44px; tested on 3+ breakpoints
6. **Performance acceptable**: LCP <2.5s, Lighthouse >=90, bundle size <60KB gzipped
7. **Blog integration complete**: Post 1 and Post 2 link to Showcase; deep-links work
8. **CTA conversion verified**: "Try it yourself" buttons navigate to correct skill repos
9. **Analytics wired**: Event tracking for stage view, scrub, panel expand, CTA click
10. **Dark mode validated**: Both stages render correctly in light and dark themes
11. **No regressions**: Blog pages and rest of site unaffected; no bundle size increase elsewhere
12. **Documentation complete**: Stage authoring template ready for Phase 5.5 workflow
13. **Production ready**: Deployed to main; site live; all links working; no prod console errors

---

## Post-Implementation Plan: Monitoring & Future Stages

### Engagement Monitoring (Weeks 1–4 Post-Launch)

- **Scrub time per stage**: Users spending 2–5 min per stage? (PRD goal)
- **Panel expand rate**: Are readers exploring artifacts or skipping?
- **CTA click-through**: % of stage viewers clicking "try it yourself"?
- **Return visits**: Are users returning to interact with newly unlocked stages post-publication?
- **Mobile vs. desktop**: Is mobile experience causing abandonment?

**Action if metrics lag**: Iterate UX (e.g., add affordance text, auto-play on idle, highlight CTA button).

### Future Stage Authoring Cadence (Stages 3–6, Months 2–6)

- **Trigger**: Each blog post publication triggers stage authoring
- **Timeline**: Author stage within 2–3 days of post publication (Phase 5.5 of blog-drafter)
- **Effort**: ~1–2 days per stage (documented in template)
- **Metrics update**: Curate or pull live data per stage (v2 feature: CCDash API integration)

### v2 Roadmap (Post-MVP, Month 3+)

- **Live CCDash API integration**: Replace curated metrics with real-time data from CCDash
- **Stages 3–6 content**: As blog series continues (dependent on post publication)
- **Diff view**: Show before/after comparison across stages (Stage 1 → Stage 2 delta, etc.)
- **Component library extraction**: Export Showcase patterns as `@miethe/showcase` npm package
- **Comments/annotations**: Enable reader discussion per stage (v2.1+)
- **Gamification (optional)**: Badges for completing all stages (low priority)

### Maintenance Plan

- **Monthly audit**: Verify all links (blog → Showcase, Showcase → skills) are live
- **Quarterly review**: Check analytics, gather user feedback, prioritize v2 features
- **Post-series review (Month 6)**: Collect engagement metrics, assess value, decide on continuation/sunset

---

## Related Documentation & References

- **PRD**: `/Users/miethe/dev/homelab/development/signal_to_system/docs/specs/workflow-showcase-prd.md`
- **SPIKE Template**: Will be at `docs/specs/workflow-showcase-spike.md` (Phase 0 deliverable)
- **UI Showcase v2 Implementation** (pattern reference): `/Users/miethe/dev/homelab/development/signal_to_system/docs/specs/ui-showcase-v2-implementation.md`
- **Stage Authoring Template**: `/Users/miethe/dev/homelab/development/signal_to_system/docs/specs/workflow-showcase/stage-authoring-template.md` (created in Phase 1)
- **Blog Series Outline**: `/Users/miethe/Documents/Other/PKM/MeatyBrain/Blogs/Governed Agentic SDLC/` (PKM)
- **Blog-Drafter Skill**: Will be updated in Phase 5.5 (`src/.claude/skills/blog-drafter/SKILL.md`)
- **MeatySkills Repo**: https://github.com/miethe/MeatySkills (destination for CTA links)
- **Framer Motion Docs**: https://www.framer.com/motion/ (animation library, if selected in SPIKE)
- **Asciinema Format**: https://github.com/asciinema/asciinema/blob/master/doc/asciicast-v2.md (if selected in SPIKE)
- **Nanostores Docs**: https://github.com/nanostores/nanostores (state management)
- **Tailwind CSS v4 Docs**: https://tailwindcss.com/docs (theme tokens, `@theme` block)

---

## Appendix: Task ID Reference

Quick lookup by phase:

| Phase | Task IDs | Focus |
|-------|----------|-------|
| 0 (SPIKE) | WS-0.1 to WS-0.5 | Tech choice evaluation and decision |
| 1 (Shell) | WS-1.1 to WS-1.12 | Component, routing, schema, Nanostores, test fixture |
| 2 (Stage 1) | WS-2.1 to WS-2.5 | Pre-governance baseline content |
| 3 (Stage 2) | WS-3.1 to WS-3.5 | Spec layer content |
| 4 (Integration) | WS-4.1 to WS-4.4 | Blog links, stage selector, URL scheme |
| 5 (Launch) | WS-5.1 to WS-5.8 | A11y, mobile, performance, analytics, QA |
| 5.5 (Blog-drafter) | WS-5.5a to WS-5.5b | Future stage workflow, metadata sync |

---

## Appendix: Component File Structure (Final State)

```
src/
  components/
    islands/
      WorkflowStage.tsx             (new; main island)
      WorkflowScrubber.tsx          (new; timeline/scrubber control)
      WorkflowArtifactPanel.tsx     (new; artifact tabs/accordion)
      WorkflowMetrics.tsx           (new; metrics overlay)
      WorkflowCTACard.tsx           (new; "try it yourself" CTA)

  pages/
    workflow-showcase.astro         (new; main page, stage routing)

  stores/
    workflow-stage.ts              (new; Nanostores atoms for state)

  types/
    workflow.ts                    (new; TypeScript types for stage data)

  data/
    workflow-stages.json           (new; stage manifest and configs)

  styles/
    workflow-showcase.css          (new; Tailwind v4 theme tokens)

docs/
  specs/
    workflow-showcase-prd.md                   (existing)
    workflow-showcase-implementation.md        (this file)
    workflow-showcase-spike.md                 (new; Phase 0 deliverable)
    workflow-showcase/
      stage-authoring-template.md             (new; Phase 1/5 deliverable)
```
