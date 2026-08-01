---
title: Living Workflow Showcase — Feature Request
description: Interactive visualization of the Governed Agentic SDLC workflow, unlocked stage-by-stage as blog series posts ship.
audience: [ai-agents, developers]
tags: [blog-feature, visualization, workflow, agentic-sdlc]
created: 2026-05-10
status: draft
category: site-feature
related:
  - "/Users/miethe/dev/homelab/development/signal_to_system/docs/specs/ui-showcase-v2-implementation.md"
  - "/Users/miethe/Documents/Other/PKM/MeatyBrain/Blogs/Governed Agentic SDLC/Post 2/notes/strategic-memo-post6-and-exec-summary.md"
---

# Living Workflow Showcase — Feature Request

**Complexity**: Large (L) | **Effort**: ~25–35 story points | **Timeline**: 4–6 weeks (dependent on blog series cadence)

---

## Executive Summary

The Living Workflow Showcase is a companion site section on signaltosystem.com that visualizes Nick Miethe's actual agentic SDLC workflow as an interactive, stage-by-stage artifact. Each post in the "Governed Agentic SDLC" blog series unlocks a new stage of the visualization, mirroring the post's content with a scrubbable/animated representation: a central scriptable terminal-style scrubber paired with artifact panels showing PRDs, plan tables, progress YAML, and agent role labels.

Unlike generic design system showcases or marketing demos, this is proof-of-concept documentation: readers follow a live workflow from diagnosis through implementation, see what the tooling actually looks like (not animated mockups), and can click "try it yourself" to experiment with the MeatySkills referenced at each stage.

This feature bridges the strategic gap identified in Post 2: the series argues that specs should be living, machine-readable intent artifacts, but readers don't actually see what that looks like until Post 6. The Showcase lets readers see it in stages, in parallel with the narrative.

---

## Context & Background

The Governed Agentic SDLC series (Posts 1–6+) establishes a philosophy and tooling for running concurrent AI-assisted development projects. The strategic memo (Post 6 recommendations) flagged a critical gap: Post 2 establishes the *why* (specs should be living artifacts), but the series doesn't show the *how* until readers reach Post 6 — more than a month away for typical weekly cadence.

The Living Workflow Showcase solves this by:

1. **Visualizing the workflow in real time** — As each post ships, readers unlock a new stage of the workflow artifact, seeing the actual PRD frontmatter, plan structure, progress tracking YAML, and CCDash output from that post's topic
2. **Reducing cognitive load** — Instead of describing IntentTree structure or CCDash boards in prose, the Showcase *shows* them at each stage with an interactive scrubber
3. **Driving engagement with MeatySkills** — Each stage has a "try it yourself" link to the relevant skill repo, converting spectators into practitioners
4. **Positioning signaltosystem.com as proof** — The Showcase is not a marketing demo; it is Nick's actual workflow artifact, updated as the series progresses

The feature is tightly coupled to the blog series cadence: each new post triggers the addition of one new stage. The shell and pattern are built once (Phase 1–3); subsequent stages are authored as part of Phase 5.5 of the blog-drafter workflow.

---

## Problem Statement

Without the Workflow Showcase:

1. Readers must mentally reconstruct the workflow from prose descriptions alone, with no concrete visual reference until Week 6
2. Technical practitioners cannot quickly assess whether the tooling is worth adopting; they have to read the entire series
3. The site has no "living proof" artifact; it's all description, not demonstration
4. Hiring managers visiting the site see blog essays but no interactive evidence that Nick has built the systems described

The Showcase is the bridge from narrative to proof.

---

## Goals & Success Metrics

### Primary Goals

1. **Engagement depth**: Measure scrub interaction time, panel expand/collapse frequency, and "try it yourself" click-through rate per stage
2. **Series momentum**: Track return-visit rate post-publication (readers returning to interact with newly unlocked stages)
3. **Portfolio credibility**: Gather feedback from technical hiring signals whether the Showcase felt credible vs. "demo theater"
4. **Practitioner adoption**: Count click-throughs to MeatySkills repos and conversions to repo stars/clones

### Secondary Goals

1. Social shares of Showcase URL with stage context
2. Scroll depth on companion blog posts
3. Time-on-page for Showcase (target: 2–5 minutes per stage for committed engagement)

### Anti-Goals

- NOT a generic design system showcase (see UI Showcase v2 for that pattern)
- NOT a step-by-step tutorial (readers come for the blog, not a course)
- NOT a marketing animation (curated real data preferred; "demo theater" is the failure mode)

---

## Open Questions & Recommendations

### Question 1: Single Scrubbable Page vs. Separate Stage Pages

**Recommendation: Single scrubbable page that grows, with stage navigation.**

**Rationale:**

- **URL simplicity**: A single `/workflow-showcase/` canonical URL is shareable and SEO-friendly. Adding stages doesn't fragment the site structure or create canonical ambiguity
- **Progression narrative**: Readers see the series progression in one place; they can compare Stage 1 to Stage 2 without page navigation friction
- **Current state view**: Readers always land on the latest unlocked stage by default, with a stage selector (dropdown or carousel) to jump backward
- **Performance**: Single page hydrates once; stage switching is local state management (Nanostores), no full page reload

**Implementation detail**: The page should feel like a "scrubber within a gallery" — main viewport shows the active stage's interaction, sidebar or modal shows stage thumbnails or a stage list with publication date + series post title.

**Alternative (rejected)**: Separate pages per stage (e.g., `/workflow-showcase/stage-1/`) fragment the URL space and require O(n) navigation overhead as stages pile up. Better for exploration, worse for series continuity.

---

### Question 2: Metrics Source — Real CCDash Data vs. Curated/Illustrative

**Recommendation: Hybrid phased approach — curated in MVP (Stages 1–2), real data pipeline in v2.**

**Rationale:**

- **MVP credibility**: Stages 1–2 use curated/cleansed real data from Nick's actual workflow (pull from production CCDash, then format and anonymize as needed). This is "real data, presented cleanly," not fabricated metrics
- **Trust ceiling**: Readers will notice if metrics feel invented. Using real numbers (even if slightly adjusted for clarity) maintains credibility without requiring a full production integration
- **v2 upgrade path**: Once CCDash is stable and a public API exists, stages 3+ can pull live data or near-live snapshots, eliminating manual curation. This is a feature for later, not a blocker for MVP
- **No private infra exposure**: Curated data avoids publishing raw production data or tying the Showcase to internal infrastructure instability

**Alternative (rejected)**: Fully fabricated "illustrative" metrics feel like demo theater and undermine the "proof of concept" goal. Real data is the whole point.

**Alternative (rejected)**: Live CCDash integration in MVP adds implementation complexity, infra dependency, and risk of breaking the Showcase if CCDash changes. Not worth the risk for the first two stages.

---

### Question 3: Standalone Product/Repo vs. Always Part of signaltosystem.com

**Recommendation: Always embedded in signaltosystem.com; do not carve into a separate repo.**

**Rationale:**

- **Series integration**: The Showcase's value is as a companion to the blog series. Splitting it into a separate site creates navigational friction and dilutes the series narrative
- **Maintenance simplicity**: One codebase, one deployment pipeline. Synchronizing blog posts with a separate Showcase repo introduces drift and authoring overhead
- **Content lifecycle**: New stages are authored as part of Phase 5.5 of blog-drafter (the skill already handles the blog publication); appending a new stage to an embedded component is a single file addition
- **SEO benefit**: Keeping the Showcase on the main domain improves series discoverability and link equity

**Future open-source potential**: If the Showcase pattern proves reusable, the component library and interaction patterns can be extracted into `@miethe/showcase` as an npm package. The workflow data stays embedded in signaltosystem.com; the UI framework can be shared. This is a v2+ decision.

---

### Question 4: Mobile Experience Strategy

**Recommendation: Simplified touch-optimized mode with animated-only scrubbing, no draggable slider.**

**Rationale:**

- **Interactive scrubbing is fiddly on touch**: Dragging a slider to step through 10+ terminal commands is frustrating on mobile (low precision, fat fingers). Button-based step-through is more accessible
- **Breakpoint strategy**:
  - **Desktop (>1024px)**: Full interaction — scrubbable timeline/scrubber, side panels, metrics overlay
  - **Tablet (768–1024px)**: Button-based step-through (prev/next buttons), stacked panels, simplified metrics
  - **Mobile (<768px)**: Auto-animated playthrough with step-by-step text narration below, all in a single column. Viewers can play/pause/step, but dragging is not an option
- **Panel collapsibility**: On mobile, artifact panels (PRD, plan, progress) are tabs or accordions, not permanent side panels

**Mobile success metric**: >60% mobile visitors can reach stage 5+ (vs. abandoning by stage 2).

**Alternative (rejected)**: Desktop-only mode (responsive: none) excludes a significant audience and feels exclusionary for a feature meant to inspire practitioners. The simplified mobile path still delivers the value without full interaction.

---

### Question 5: "Try It Yourself" Link Placement and MeatySkills Integration

**Recommendation: Per-stage CTA card at the bottom of each scrubber viewport, plus inline link in one artifact panel.**

**Rationale:**

- **Dual placement**: 
  - Primary: Prominent card at the base of the scrubber (below the animated terminal or artifact panels) with text like "Ready to try this? Use the planning skill..." and a button linking to the skill
  - Secondary: Inline link in the primary artifact panel (e.g., "...generated by the plan-feature skill") for context-aware discovery
- **Skill mapping per stage**:
  - **Stage 1** (Diagnosis): Link to `spike` skill (diagnosis framework)
  - **Stage 2** (IDD spec layer): Link to `planning` and `artifact-tracking` skills (PRD authoring, plan creation)
  - **Stage 3** (Context/memory): Link to `notebooklm` skill (context curation)
  - **Stage 4** (CCDash, TBD): Link to `ccdash` skill (observability)
  - **Stage 5+** (TBD): TBD with corresponding skill
- **Copy**: Clear, benefit-driven ("Unlock planning layers like Nick does" vs. generic "try it")

**Alternative (rejected)**: Inline text links blend into prose and get overlooked. CTA cards are higher-intent, match portfolio best practices.

---

## Functional Requirements

### What the User Can Do

1. **Navigate stages**: Visit `/workflow-showcase/` and see the latest unlocked stage. Use a stage selector (dropdown, carousel, or breadcrumb) to jump to earlier stages. Each stage is labeled with the corresponding blog post number and publication date
2. **Scrub through interactions**:
   - **Desktop**: Click and drag a timeline slider (or click a progress bar) to step through the stage's scripted interactions (e.g., "PRD written → plan generated → agent assigned")
   - **Mobile/Touch**: Use prev/next buttons to step through, or tap "play" for auto-play
3. **Expand artifact panels**: Click on "Show PRD", "Show Plan", "Show Progress", "Show Agent Roles", etc. to expand full-text views of the relevant artifact at that step. Panels collapse when deselected
4. **View metrics overlay**: A small overlay (bottom-right or top-right) shows real-time metrics for the stage (e.g., "Tokens used: 1.2M", "Throughput: 15K tokens/sec", "Cost: $3.50") — optional but valuable if data available
5. **Land from a blog post**: A blog post can link directly to `/workflow-showcase/?stage=2` to highlight the corresponding stage; Showcase loads with that stage active
6. **Click "try it yourself"**: The CTA card at the bottom (or inline link) takes the user to the corresponding MeatySkills repository

### Interaction Model

**Scrubber (Interactive Timeline)**

- A horizontal or vertical timeline shows discrete steps (e.g., 8 steps per stage: "Start → PRD Draft → PRD Review → Plan Created → Agent Briefing → Context Loaded → Execution → Complete")
- Clicking a step (or dragging a slider) animates the transition: terminal output is typed out (or appears in chunks), panels update to show the artifact state at that step, metrics shift
- On desktop, dragging is smooth; on mobile, it's button-based (prev/next)
- Visual feedback: active step is highlighted, previously-visited steps show a checkmark or lighter shade

**Artifact Panels (Side-by-Side or Tabbed)**

- **Left panel** (or top, on mobile): Scriptable terminal/IDE output showing the workflow step-by-step. Not a real shell, but styled to look like one (asciinema-style or Monaco mock-up)
- **Right panels** (or tabs on mobile): 
  - **PRD/Spec** — Show the frontmatter and opening section of the blog post's spec
  - **Plan** — Show a simplified version of the implementation plan task table for that post
  - **Progress** — Show a YAML-formatted progress snapshot (status, completed tasks, open tasks)
  - **Agents** — Show the team of agents involved and their roles in colored badges
  - **Metrics** — Show token count, throughput, cost, wall-clock time (if available; optional in MVP)

---

## Non-Functional Requirements

### Performance

- **LCP** (Largest Contentful Paint): <2.5s for initial page load (page shell + first stage scrubber)
- **Interaction latency**: Scrubbing to the next step must feel instant (<100ms from click to visual response)
- **JS bundle size increase**: <60KB gzipped for Showcase-specific code (scrubber + state, excluding animation libraries)
- **Accessibility (A11y)**:
  - Scrubber timeline is keyboard-navigable (arrow keys to step forward/backward, Enter to scrub)
  - Artifact panels are screen-reader compatible (proper heading hierarchy, aria-live regions for dynamic content)
  - Color is never the only indicator of state (step progression shown with both color + icon/checkmark)
  - Focus rings visible in both light and dark modes
  - All CTAs have sufficient touch target size (>=44px on mobile)
- **Mobile responsiveness**:
  - No horizontal scroll on any breakpoint
  - Scrubber timeline stacks vertically on mobile (<600px width)
  - Artifact panels become tabs or accordions on mobile; readable single-column layout
  - Touch-friendly interaction (no sub-5px targets)
- **SEO**:
  - Each stage has a canonical URL or URL parameter (`/workflow-showcase/?stage=N`)
  - Open Graph meta tags updated per stage (title includes stage number and post title)
  - Sitemap includes Showcase URL
  - No indexing of future/unreleased stages (robots.txt or noindex meta tag for unreleased stages in build)

### Observability & Analytics

- Track interaction events (scrub start/step, panel expand, CTA click) with event category, stage, and user session ID
- Measure engagement funnel: viewers per stage → scrubbers per stage → "try it yourself" clicks per stage
- Collect scroll depth and time-on-page by stage
- Monitor for layout shift or performance regressions post-launch (Lighthouse CI)

---

## Scope

### In Scope (MVP)

- Reusable `<WorkflowStage>` component shell (scriptable, configurable)
- Stage 1 content authored (Post 1: diagnosis/baseline state)
- Stage 2 content authored (Post 2: IDD spec layer)
- Router/navigation between stages (dropdown selector)
- Artifact panel UI (PRD, plan, progress, agent roles)
- "Try it yourself" CTA per stage, linked to MeatySkills
- Metrics overlay (curated data source, no live API)
- Mobile responsiveness (touch-friendly step-through, stacked layout)
- Accessibility audit + fixes
- Blog-to-Showcase link integration (blog post can link to specific stage)

### Out of Scope (v1.1+)

- **Stages 3–6 authoring** (deferred to Phase 5.5 of blog-drafter as each post publishes)
- **Live CCDash API integration** (curated data in MVP; real-time pipeline in v2)
- **Gamification** (badges, points, completion tracking)
- **Comments/annotations** (reader discussion per stage; explore in v2)
- **Export/share** (download stage as PDF or Markdown; v2 feature)
- **Diff view** (show before/after stage comparison; v2)
- **Terminal emulation** (true shell interaction; asciinema-style mock is sufficient)
- **Component library extraction** (patterns can be extracted to `@miethe/showcase` later)

---

## Dependencies & Assumptions

### Technical Dependencies

- **Astro 6** (Content Layer API for blog series metadata)
- **React 19** (islands for interactive Showcase component)
- **Tailwind CSS v4** (`@theme` blocks for metrics overlay styling)
- **Nanostores** (global state for active stage, expanded panels)
- **Framer Motion or Lottie** (micro-animations; SPIKE will decide; see tech options below)
- **React Profiler** (performance validation tooling, not shipped)

### Content Dependencies

- **Blog series authoring cadence**: Assume weekly posts; each new post = one new stage authored within 2–3 days post-publication
- **Blog post frontmatter**: Post metadata (published date, series post number) must be stable and accessible to Showcase
- **MeatySkills repo stability**: Assume skills repo is stable and publicly accessible (https://github.com/miethe/MeatySkills/tree/main/skills)
- **Curated metrics data**: Nick provides stage metrics (tokens, throughput, cost) as JSON or YAML per stage; no runtime CCDash API required in MVP

### Deployment Assumptions

- Showcase is part of static build (GitHub Pages); no server-side dynamic content in MVP
- Unreleased stages are not indexed by search engines (noindex or robots.txt)
- Stages 1–2 are released with post publications; no pre-release staging

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| **Performance regression on blog pages** | Readers abandon blog if load time increases | Isolate Showcase JS to islands (lazy-load `/workflow-showcase/` page only). Don't bundle into core site JS. Measure Lighthouse before/after; target <10% regression. |
| **Authoring burden per stage** | Blog-drafter phase 5.5 becomes bottleneck; stages fall behind posts | Document stage authoring as a single checklist (~45 min per stage: write script, curate artifacts, collect metrics, test). Add to blog-drafter as a forcing function. |
| **Scrubber interaction feels janky on lower-end devices** | Poor mobile experience for significant audience | Test on iPhone SE and Moto G7 (low-end devices). If animation stutters, fall back to static step-by-step (no animation, just state changes). |
| **Demo theater perception** (curated data looks fabricated) | Readers distrust metrics; feature undercuts credibility | Use real data from actual workflow. Clearly label as "curated for clarity" if anonymized/adjusted. Avoid round numbers (1M tokens looks fake; 987K tokens looks real). |
| **"Try it yourself" links drive traffic to MeatySkills that's not ready** | Poor user experience if skills repo is outdated or broken | Audit MeatySkills before Showcase launch. Link to stable skill releases, not main branch. Add a disclaimer: "Requires setup; see README in repo." |
| **Unreleased stages leak in build artifacts or search** | SEO damage or reader confusion from future content | Build-time check: only include stages where post exists in published collection. Use data attribute to mark unreleased stages; filter in component. Test with crawlers. |
| **Terminal/artifact panels look too minimal or unconvincing** | Readers feel it's a mockup, not real workflow | Use actual PRD frontmatter, plan YAML, and progress artifacts from published posts. Screenshot CCDash if visual fidelity matters; paste real output. |
| **Mobile interaction model takes too long to explain** | Readers on mobile don't figure out how to use it | Provide one-line affordance text: "Tap next/previous to step through" (desktop: "Drag timeline or click steps"). Auto-play first scrub on mobile if timeout > 3 seconds idle. |
| **Blog-to-Showcase deep links break if URLs change** | Links from posts point to deleted/moved stages | Implement permanent URL scheme early (e.g., `/workflow-showcase/?post=2` never changes). If stage order shifts, maintain canonical URL mapping. |

---

## Target State

After Phase 5 (Polish & Launch) completes:

1. Showcase is live at `/workflow-showcase/` on signaltosystem.com
2. Stages 1–2 are unlocked and interactive
3. Readers landing from Post 1 or Post 2 blog links see the corresponding stage in active view
4. Scrubbing, panel expansion, and mobile interaction work smoothly (no console errors, <100ms interaction latency)
5. Accessibility audit is complete; keyboard navigation and screen reader behavior validated
6. Mobile experience is touch-friendly and readable on all breakpoints
7. "Try it yourself" CTAs link to stable, documented MeatySkills
8. Metrics overlay shows curated real-world data per stage
9. Analytics event tracking is in place (Plausible or similar)
10. Documentation exists for authoring new stages (Phase 5.5 checklist in blog-drafter)

---

## Acceptance Criteria (MVP: Stages 1–2 + Shell)

All must be true for feature ship:

1. **URL reachable**: `/workflow-showcase/` loads without errors; default active stage is latest published
2. **Stage navigation**: Dropdown/selector works; clicking a stage loads it without page reload
3. **Scrubber functional**: Desktop users can drag timeline (or click steps); mobile users can tap next/prev; step animations play smoothly
4. **Artifact panels render**: PRD, plan, progress, agent roles display correctly; content is readable (contrast, font size)
5. **Metrics visible**: Overlay shows tokens, throughput, cost per stage (sourced from JSON config, not live API)
6. **CTA converts**: "Try it yourself" button is visible per stage; clicking navigates to correct MeatySkills repo
7. **Mobile responsive**: No horizontal scroll on any breakpoint; touch targets >=44px; layout adapts correctly
8. **Accessible**: Keyboard nav works (arrow keys to scrub, Tab to panels); focus rings visible; no axe audit failures (WCAG AA)
9. **Performance acceptable**: LCP <2.5s; scrub latency <100ms; bundle size <60KB gzipped
10. **Link from blog posts**: Post 1 and Post 2 contain links that deep-link to `/workflow-showcase/?stage=1` and `?stage=2` (or equivalent canonical URL)
11. **Dark mode tested**: Scrubber, panels, metrics, and CTAs render correctly in both light and dark theme
12. **No build warnings**: `npm run build` and `npm run check` pass with zero new errors/warnings
13. **Analytics wired**: Click/scrub events tracked and logged to analytics backend

---

## Implementation Phases (Overview)

Detailed task breakdown deferred to implementation plan; summary:

| Phase | Title | Duration | Owner | Goal |
|-------|-------|----------|-------|------|
| 0 | **SPIKE: Interaction & Animation Tech** | 1–2 days | frontend-architect | Validate scrubber tech choice (Framer Motion vs. Lottie vs. custom state machine) |
| 1 | **Reusable Stage Component Shell** | 3–4 days | frontend-architect, frontend-developer | Build `<WorkflowStage>` component, routing, data schema, Nanostores state |
| 2 | **Stage 1 Content & Authoring** | 2–3 days | frontend-developer | Author Stage 1 (diagnosis) script, artifact fixtures, metrics config |
| 3 | **Stage 2 Content & Testing** | 2–3 days | frontend-developer | Author Stage 2 (IDD spec) script, artifacts; validate scrubber works end-to-end |
| 4 | **Blog-to-Showcase Integration** | 1 day | frontend-architect | Wire blog post links to deep-link Showcase stages |
| 5 | **Accessibility, Mobile, Performance** | 2–3 days | frontend-architect, frontend-developer | A11y audit, mobile responsiveness, Lighthouse validation, bundle size check |
| 5.5 | **Blog-Drafter Phase 5.5 Integration** | 1 day | documentation-writer | Add stage authoring checklist to blog-drafter skill for future posts |
| 6 | **Launch & Documentation** | 1 day | general-purpose, documentation-writer | Final sign-off, docs, announcement, production deployment |

**Total effort**: ~25–35 story points | **Timeline**: 4–6 weeks (dependent on blog series release schedule for stages beyond 1–2)

---

## Related Specs & Future Work

- **UI Showcase v2** (`/docs/specs/ui-showcase-v2-implementation.md`): Similar shell pattern; reuse component patterns if possible
- **Post 6 Dependency**: The strategic memo reserves Post 6 for the Planning Layer deep-dive. Stages 4–6 in the Showcase will correspond to Post 4, 5, and 6 content (TBD topic mapping)
- **ReadIn90 Executive Summary Feature**: Separate feature for collapsible "Read in 90 Seconds" blocks on blog posts; works orthogonally to Showcase (mentioned in strategic memo)
- **CCDash Public API** (v2 blocker): Live metrics integration depends on CCDash exposing a public read-only API; deferred to v2
- **@miethe/showcase Component Library** (v2+ future): After patterns stabilize, consider extracting Showcase UI component library as reusable npm package

---

## Tech Option Space (For SPIKE in Phase 0)

The implementation plan will formally evaluate these; PRD notes the candidates:

1. **Asciinema-style cast player** — Lightweight, terminal-authentic, proven pattern for "replaying" command sequences
   - Pros: Lightweight (~20KB), authentic feel, no heavy animation library
   - Cons: Designed for shell output, not generic artifact display; requires cast file format

2. **Framer Motion + custom state machine** — React animation library + local state driving scrubber position
   - Pros: Flexible, works with any React content, smooth animations, integrates well with React 19
   - Cons: Medium bundle size (~35KB gzipped), requires state architecture design

3. **Lottie/Rive** — Vector animation format + runtime player
   - Pros: Highly polished micro-animations, designer-friendly
   - Cons: Animations must be pre-built in Figma/Rive; harder to sync with dynamic scrubber state; overkill for step-through interaction

4. **Hybrid (recommended by PRD)**: shadcn-style scrubber UI (custom buttons/timeline) + Framer Motion for artifact panel entrance animations + custom state machine for step progression. **Not a full animation framework; minimal, purpose-built.**

---

## References

- **Blog series outline**: `/Users/miethe/Documents/Other/PKM/MeatyBrain/Blogs/Governed Agentic SDLC/` (PKM vault)
- **Strategic memo**: `/Users/miethe/Documents/Other/PKM/MeatyBrain/Blogs/Governed Agentic SDLC/Post 2/notes/strategic-memo-post6-and-exec-summary.md`
- **UI Showcase v2 implementation**: `/Users/miethe/dev/homelab/development/signal_to_system/docs/specs/ui-showcase-v2-implementation.md` (pattern reference)
- **MeatySkills repo**: https://github.com/miethe/MeatySkills/tree/main/skills
- **Blog-drafter skill**: Orchestrates blog authoring phases; Phase 5.5 will add stage authoring checkpoint
- **Nanostores docs**: https://github.com/nanostores/nanostores (state management for active stage + expanded panels)
- **Framer Motion docs**: https://www.framer.com/motion/ (animation candidate for SPIKE)
- **Asciinema format**: https://github.com/asciinema/asciinema/blob/master/doc/asciicast-v2.md (cast file format reference)
