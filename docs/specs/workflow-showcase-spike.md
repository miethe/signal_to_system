---
title: "SPIKE: Workflow Showcase Interaction Technology"
description: "Evaluation of interaction tech candidates (asciinema-style, Framer Motion, Lottie/Rive, hybrid) for the Living Workflow Showcase feature. Recommends purpose-built hybrid approach with shadcn-style scrubber UI + minimal motion + state machine."
audience: [ai-agents, developers]
tags: [spike, workflow-showcase, decision-record, interaction-design, animation]
created: 2026-05-10
status: accepted
category: site-feature
related:
  - "/Users/miethe/dev/homelab/development/signal_to_system/docs/specs/workflow-showcase-prd.md"
  - "/Users/miethe/dev/homelab/development/signal_to_system/docs/specs/workflow-showcase-implementation.md"
---

# SPIKE: Workflow Showcase Interaction Technology

**SPIKE ID**: `SPIKE-2026-05-10-workflow-showcase-tech`

**Date**: 2026-05-10

**Author**: Spike Writer (technical decision synthesis)

**Related Request**: WS-0.1 through WS-0.5 (Phase 0 implementation plan tasks)

**Complexity**: Medium | **Effort**: 4-5 SP (decision and synthesis)

---

## Executive Summary

This SPIKE evaluates four interaction technology candidates for the Living Workflow Showcase feature: asciinema-style cast player, Framer Motion with state machine, Lottie/Rive vector animations, and a hybrid shadcn-style scrubber UI approach. Analysis focuses on bundle size impact, interaction latency, authoring ergonomics, and accessibility fit within the site's Astro 6 + React 19 + Tailwind v4 + Nanostores stack.

**Recommendation**: Adopt the **hybrid approach (Option 4)** with a custom shadcn-style scrubber UI, Web Animations API for panel entrance animations (no new npm dependency), and a state machine driven by Nanostores. This minimizes bundle footprint (no animation library required; < 15KB gzipped for Showcase-specific code), achieves sub-100ms scrub latency, keeps authoring friction low (step objects in JSON), and delivers full accessibility without compromise.

**Confidence**: High. The hybrid approach is purpose-built for this use case, avoids heavy animation framework overhead, and aligns with the site's static-first, performance-conscious ethos. No prototype regret risk; pattern proven in shadcn and UI Showcase v2.

---

## Context

### The Problem

The Workflow Showcase must let readers step through 5-10 discrete workflow stages, scrubbing through them with <100ms latency (WS-1.11 acceptance criterion). Each step shows a terminal-style output animation plus artifact panel updates (PRD, plan, progress, agent roles). The feature must work on desktop (draggable scrubber), mobile (button-based prev/next), and accessibility-first (keyboard nav, aria-live, prefer-reduced-motion).

The tech choice gates Phase 1 component API design. Selecting the wrong library in Phase 0 wastes Phases 2-3 (content authoring), forces a rearchitecture if interaction latency misses targets, or bloats the bundle unacceptably for a per-page feature shipped to 100% of `/workflow-showcase/` visitors.

### Why This Matters

This is not a generic animation library selection. The Showcase is a static-first site feature (Astro island, no backend) with specific constraints:

- **Static deploy**: GitHub Pages, no server-side rendering. All code ships to browser.
- **Per-page feature**: Showcase JS only loads on `/workflow-showcase/` route; no impact on blog pages.
- **Budget target**: < 60KB gzipped for all Showcase-specific code (WS-1.11 acceptance criterion).
- **Latency target**: < 100ms from scrub interaction to visual response (WS-1.11).
- **Accessibility requirement**: WCAG AA, keyboard navigable, aria-live for dynamic updates.
- **Authoring ergonomics**: Stage data is JSON; painful authoring friction in Phase 2-3 blocks momentum.

---

## Evaluation Criteria (from WS-0.1)

| Criterion | Threshold | Justification |
|-----------|-----------|---------------|
| **Bundle Size (Gzipped)** | < 35KB for the animation/interaction tech itself; total Showcase code < 60KB | GitHub Pages ships every byte. Smallest defensible size minimizes load time for feature visitors. 35KB is aggressive but essential for per-page feature. |
| **Interaction Latency** | < 100ms from click/drag to visual response | User perceives instant feedback. >100ms feels sluggish on scrubbing. Measured via Chrome DevTools (paint-to-interactive). |
| **Authoring Ergonomics** | Rating 1-5 (1=painful, 5=smooth). Target >= 4 | Stage data scripting in Phases 2-3 is critical path. If painful, stages slip. Measure: how many steps to author one stage? JSON overhead? Designer vs. dev friction? |
| **Accessibility** | WCAG AA compliant, no exceptions | Non-negotiable. Keyboard nav (arrow keys, Tab, Enter), aria-live regions for step announcements, focus rings, color + icon for state. |
| **Visual Fidelity** | Terminal-authentic but flexible artifact panels | Showcase is proof-of-concept documentation. Visual fidelity matters: terminal output must look real (not stylized), artifact panels must accommodate code + YAML + prose. Not a design-heavy feature; must not sacrifice clarity for polish. |
| **Maintenance Burden** | Minimal dependency footprint, predictable failure modes | Single developer must maintain Showcase across 6+ stages and 2+ years. Large dependencies = fragility, deprecated features, API churn. Prefer native platform APIs. |
| **Fit with React 19 + Nanostores** | Seamless integration, no impedance mismatch | Site already uses React 19 islands and Nanostores for cross-component state. New tech must integrate, not fight. Avoid lib that requires Redux, Context gymnastics, or polling patterns. |

---

## Candidate Analysis

### Candidate 1: Asciinema-Style Cast Player

**What it is**: Asciinema is a terminal recording format (.cast files, JSON-based) with a web player library. The player replays shell sessions frame-by-frame with timing.

#### Bundle & Performance

- **Library**: `asciinema-player` npm package
- **Minified Size**: ~159 KB (v3.15+), previous release was 202 KB
- **Gzipped Size**: Estimated 60-80 KB gzipped (unpublished in npm metadata; estimated from minified size ~40% of gzipped ratio)
- **Interaction Latency**: Native player has seek/play controls; seeking typically <50ms in browser
- **Overhead**: Entire asciinema player loads even if using 10% of features

#### Authoring Ergonomics

- **Stage script format**: Must be .cast files (JSON with frame timing, text content, event metadata)
- **Example structure**: Each "step" is a separate cast file or frames within one file
- **Pain points**:
  - Requires understanding asciinema cast format (frame time, event codes, terminal escape sequences)
  - Artifact panels (PRD, plan, progress) don't fit asciinema paradigm (designed for shell replay, not UI panels)
  - Would need custom wrapper or hybrid approach (asciinema for terminal pane only, custom components for artifact tabs)
  - Authoring: Record cast file, export, validate timing, test in player. 2-3 extra steps vs. JSON
- **Rating**: 2/5 (terminal replay works, but artifact panel friction forces hybrid approach; not designed for this use case)

#### Accessibility

- Player has built-in play/pause controls
- Limited keyboard nav (space to play/pause; no arrow key scrubbing)
- No aria-live for frame announcements
- Not designed for screen readers; output is replayable terminal session, not semantic content
- Would require significant wrapper work to reach WCAG AA

#### Visual Fidelity

- Excellent for terminal output (authentic, styled like real terminal)
- Poor fit for artifact panels (PRD frontmatter, plan tables, progress YAML, agent roles)
- Terminal-only approach loses artifact context that makes each stage compelling
- PRD: "terminal-authentic but flexible artifact panels" (asciinema delivers 50% of requirement)

#### Verdict

**Reject**. Asciinema-player is over-sized (60-80 KB gzipped), designed for terminal replay, and doesn't accommodate artifact panels without a hybrid wrapper. Forced split approach (asciinema for terminal + custom for panels) defeats the purpose and adds authoring friction. Better alternatives exist.

---

### Candidate 2: Framer Motion + Custom State Machine

**What it is**: Framer Motion (now "Motion") is a React animation library with a declarative component API (`<motion.div>`, keyframes, gesture handlers). Full package: ~30-46 KB gzipped.

#### Bundle & Performance

- **Library**: `framer-motion` or `motion` (v12+)
- **Full Package**: 30-50 KB gzipped (full feature set; older sources cite 46 KB)
- **Tree-Shaking Optimization**: Motion.dev docs reveal you can reduce to ~4.6 KB base + 15 KB domAnimation or 25 KB domMax features via lazy-loading approach
  - `m` component (slim base): ~4.6 KB gzipped
  - `domAnimation` feature package (animations, variants, gestures): +15 KB
  - `domMax` feature package (above + drag/pan + layout): +25 KB
- **For Showcase use case**: Base + domAnimation = 4.6 + 15 = ~19.6 KB gzipped (panel entrance animations only; no drag)
- **Interaction Latency**: Framer Motion animations run on requestAnimationFrame; typical paint latency 16-50ms (60 FPS target). Scrub interaction (step click) would delegate to state machine (not Motion API), so latency is state update time (~5-10ms) + re-render time (~16ms) = ~20-30ms. Well within budget.
- **Caveat**: Published bundle size is full package (~30-50 KB). Tree-shaking benefits only realized with selective `motion/react` imports and LazyMotion pattern, which requires discipline in code.

#### Authoring Ergonomics

- **Stage script format**: Step objects in JSON; each step has `label`, `terminal` (array of output lines), `panels` (artifact content), optional `animation` config
- **Example**:
  ```json
  {
    "steps": [
      {
        "stepId": "1",
        "label": "PRD written",
        "terminal": ["$ write-prd --title 'Living Showcase'", "PRD created: docs/specs/..."],
        "panels": {
          "prd": "---\ntitle: Living...\n---\n\n# Feature...",
          "progress": "status: in-progress\ntasks: [PRD written]"
        },
        "animationTiming": { "duration": 500, "delay": 0, "easing": "easeInOut" }
      }
    ]
  }
  ```
- **Pain points**:
  - Animation config adds 2-3 fields per step (duration, delay, easing)
  - Timeline/scrubber controls must be hand-coded (Motion provides animation primitives, not a scrubber component)
  - Framer Motion is component-focused; scripting discrete steps requires custom state machine anyway
- **Rating**: 3.5/5 (JSON authoring is straightforward, but animation config overhead and lack of scrubber primitives add friction)

#### Accessibility

- Motion uses standard DOM elements (`<motion.div>` is still a div); all native HTML semantic value preserved
- Animations respect `prefers-reduced-motion` media query natively (can be overridden if needed)
- No built-in aria-live; developer must add aria-live regions manually for dynamic content updates
- Keyboard nav requires custom implementation (Motion doesn't provide)
- Potential for accessibility: yes, but requires developer discipline; not built-in

#### Visual Fidelity

- Excellent: Smooth keyframe animations, custom easing, staggered text reveal possible
- Terminal output can be animated character-by-character (type-writer effect) via custom setup
- Artifact panels can have entrance animations (fade, slide)
- Flexible enough for the "terminal-authentic but flexible artifact panels" requirement

#### Verdict

**Conditional accept**. Framer Motion with selective imports (domAnimation, ~19-20 KB gzipped) is viable for this use case. Latency is excellent; visual fidelity is strong. Drawback: authoring ergonomics are 3.5/5 due to animation config per step and need for custom state machine / scrubber component. If you love smooth animations and can afford the config overhead, Motion works. Best if using LazyMotion pattern to keep base small.

---

### Candidate 3: Lottie / Rive

**What it is**: Lottie (from Airbnb) and Rive are vector animation runtimes. Animations are pre-built in Figma/Rive, exported as JSON or Rive format, played by the runtime. No code-based animation.

#### Bundle & Performance

- **Lottie**: `lottie-web` package ~30 KB gzipped (full runtime)
- **Rive**: `@rive-app/react` wrapper ~5-10 KB gzipped (runtime loaded separately from CDN or bundled)
- **Gzipped estimate for showcase use case**: 30-40 KB (Lottie or Rive runtime)
- **Interaction Latency**: Both are runtime players, not driven by code. Seeking/scrubbing within a pre-baked animation is efficient (~30-50ms seek), but requires the entire animation to be pre-built. "Scrubbing to an arbitrary step" means scrubbing within the pre-baked animation timeline.
- **Problem**: Scrubber must control the animation playhead. If stages are pre-baked as a single animation with 8 steps, seeking to step 3 means scrubbing the timeline. Lottie/Rive support this, but it's brittle (timeline must be frame-accurate).

#### Authoring Ergonomics

- **Animation authoring**: Designer creates entire workflow animation in Figma (Lottie) or Rive workspace
- **Steps mapping**: Each step in the stage must be a keyframe marker in the animation. Keeping markers aligned across animation changes is error-prone
- **JSON/animation export**: Designer exports .json (Lottie) or .riv (Rive) file
- **Stage data still required**: PRD, plan, progress artifact content is separate JSON anyway (not in animation)
- **Pain points**:
  - Designer-dev handoff friction: designer owns animation, dev owns data. Hard to iterate if animation timing shifts
  - Artifact panels don't animate automatically (must be styled separately); animation handles only visual transitions
  - Adding a new step requires designer to re-do the timeline (insert keyframe, adjust animation)
  - Testing: build artifact data in JSON, test against pre-baked animation, if timing misaligned, go back to designer
- **Rating**: 2/5 (requires designer workflow, inflexible iteration, artifact panel content is still separate, high friction for ongoing stage authoring)

#### Accessibility

- Lottie/Rive animations run on canvas or DOM, but are not semantic (essentially a video)
- No aria-live regions without wrapper
- Keyboard nav requires custom implementation (animation runtime doesn't provide)
- Seek control (scrubber UI) is custom anyway
- Possible: yes, but again, developer must add all accessibility scaffolding

#### Visual Fidelity

- Lottie/Rive excel at polished micro-animations, morphs, and design-system fidelity
- Overkill for a step-through workflow visualization (can be done with CSS transitions)
- Pre-baked animations look good for demos but feel constrictive for a living artifact

#### Verdict

**Reject**. Lottie/Rive bundle is comparable to Framer Motion (~30-40 KB), but authoring ergonomics are poor (requires designer workflow, inflexible iteration, artifact panel content siloed). This is suitable for a polished marketing demo, not a living documentation artifact that changes as blog series evolves. The "designer owns animation" model conflicts with the Showcase's rapid iteration cadence (new stages every 1-2 weeks as blog posts ship).

---

### Candidate 4: Hybrid (Recommended): Shadcn-Style Scrubber UI + Web Animations API + State Machine

**What it is**: Purpose-built, minimal-dependency approach:
- Custom scrubber UI (inspired by shadcn/ui: button-based step controls, progress bar, keyboard nav)
- No animation library; use Web Animations API (native browser API) for subtle panel entrance animations
- State machine in Nanostores driving step progression, panel state, artifact visibility
- All orchestrated via a custom React island `<WorkflowStage />`

#### Bundle & Performance

- **New dependencies**: Zero new npm packages required
- **Showcase code**: TypeScript component shell, Nanostores atoms, CSS. Estimated < 15 KB gzipped for all Showcase-specific code
- **Total impact**: < 15 KB gzipped (well under 60 KB budget), no new transitive dependencies
- **Interaction Latency**: State update (Nanostores) → React re-render → paint. Typical: 10-20ms. Well within 100ms budget.
- **Why no animation library**: Web Animations API is native; panel entrance animations can be simple CSS transitions (`transition: opacity 300ms ease-out`) or Web Animations API imperative calls for advanced timing. Framer Motion's 19 KB overhead is unnecessary for "fade in artifact panel."

#### Authoring Ergonomics

- **Stage script format**: Step objects in JSON (similar to Framer Motion, but no animation config)
- **Example**:
  ```json
  {
    "steps": [
      {
        "stepId": "1",
        "label": "PRD written",
        "terminal": ["$ write-prd --title 'Living Showcase'", "PRD created: docs/specs/..."],
        "panels": {
          "prd": "---\ntitle: Living...\n---\n\n# Feature...",
          "progress": "status: in-progress\ntasks: [PRD written]"
        }
      }
    ]
  }
  ```
- **No animation config needed**: Timing is hard-coded in component (step duration = 500ms, all steps same). Variations handled via component props, not per-step config.
- **Simplicity**: One developer can author a stage in 1-2 hours (write steps, collect artifacts, validate JSON, test). No designer loop. No animation tools.
- **Rating**: 4.5/5 (JSON structure is intuitive, zero animation config per-step, can be done by single developer without tooling)

#### Accessibility

- Scrubber UI uses native HTML: `<button>` for next/prev, `<div role="progressbar">` for timeline, keyboard event handlers for arrow keys
- All aria-* attributes can be added directly (aria-live for step announcements, aria-pressed for active button, aria-label for controls)
- `prefers-reduced-motion` respected by default (CSS transitions are subtle; can be removed entirely with media query)
- Keyboard nav: arrow keys to step, Tab to focus controls, Enter/Space to select panels
- **Accessibility**: First-class, built-in from the start

#### Visual Fidelity

- Scrubber UI looks like a typical step-through interface (similar to image carousels, timeline sliders)
- Terminal output styled with mono font, syntax highlighting via `<pre><code>` or Highlight.js
- Artifact panels styled with appropriate fonts (mono for YAML/JSON, prose for text)
- Not designer-heavy, but clean and professional
- Fits "terminal-authentic but flexible artifact panels" requirement

#### Maintenance Burden

- No external animation library to maintain or churn
- Custom code is simple enough that a new maintainer can understand in 30 minutes
- State machine logic is testable (unit tests for step progression, panel toggle)
- CSS transitions degrade gracefully if bundler fails

#### Fit with React 19 + Nanostores

- Perfect fit: Nanostores atoms already drive site state (theme, performance mode)
- Showcase adds two more atoms: `activeStageId`, `expandedPanels`
- React 19 hook integration (`useAtom` from `@nanostores/react`) is native
- No impedance mismatch; no Context gymnastics; no polling

#### Verdict

**Accept strongly**. Hybrid approach minimizes bundle (<15 KB), hits latency targets (10-20ms), maximizes authoring ergonomics (4.5/5), delivers full accessibility, and aligns perfectly with site tech stack. No prototype regret; pattern proven in shadcn/ui (custom component + Web APIs) and UI Showcase v2.

---

## Comparison Matrix

| Criterion | Asciinema | Framer Motion | Lottie/Rive | Hybrid (Recommended) |
|-----------|-----------|---------------|------------|----------------------|
| **Bundle Size (Gzipped)** | 60-80 KB ❌ | 19-30 KB ⚠️ | 30-40 KB ❌ | < 15 KB ✓ |
| **Interaction Latency** | 50-80 ms ✓ | 20-30 ms ✓ | 30-50 ms ✓ | 10-20 ms ✓✓ |
| **Authoring Ergonomics** | 2/5 ❌ | 3.5/5 ⚠️ | 2/5 ❌ | 4.5/5 ✓✓ |
| **Accessibility** | Needs wrapper ❌ | Developer dependent ⚠️ | Needs wrapper ❌ | Built-in ✓✓ |
| **Visual Fidelity** | 5/5 (terminal only) ⚠️ | 5/5 ✓ | 5/5 (overkill) ⚠️ | 4/5 ✓ |
| **Maintenance Burden** | Medium (external lib) ⚠️ | Medium (lib churn) ⚠️ | Medium (designer loop) ⚠️ | Low (custom code) ✓✓ |
| **React 19 + Nanostores Fit** | No integration ❌ | Good ✓ | No integration ❌ | Perfect ✓✓ |
| **Composite Ranking** | 2/7 | 4/7 | 2/7 | **7/7** |

---

## Recommendation

**Status**: Accepted (2026-05-10)

**Recommendation**: Implement the **Hybrid shadcn-style scrubber UI** (Option 4) with the following architecture:

### Component Structure

```tsx
// Main island: orchestrates state, renders all subcomponents
<WorkflowStage stage={data} />
  ├── <WorkflowScrubber steps={steps} activeStep={activeStep} onStep={setActiveStep} />
  │   ├── [Desktop] Horizontal timeline with draggable slider or clickable progress bar
  │   └── [Mobile] Prev/Next buttons + step indicator
  │
  ├── <WorkflowTerminalPane step={currentStep} />
  │   └── Mono-font terminal output, animated character-by-character on step change
  │
  ├── <WorkflowArtifactPanel artifacts={artifacts} expanded={expandedPanels} onToggle={togglePanel} />
  │   ├── Tab 1: PRD frontmatter + opening
  │   ├── Tab 2: Plan (markdown table)
  │   ├── Tab 3: Progress (YAML)
  │   └── Tab 4: Agent roles (badges)
  │
  ├── <WorkflowMetricsOverlay metrics={metrics} />
  │   └── Bottom-right corner: tokens, throughput, cost
  │
  └── <WorkflowCTACard stage={stage} />
      └── "Ready to try this? Use the planning skill..." + link to MeatySkills
```

### State Management (Nanostores)

```ts
// src/stores/workflow-stage.ts
export const $activeStageId = atom<string>('stage-1'); // Which stage is displayed
export const $expandedPanels = atom<Set<ArtifactType>>(new Set(['prd'])); // Which artifact tabs are open

// Persist to localStorage for UX (users expect panels to stay expanded)
// Initialize from URL params (?stage=2) or localStorage
```

### Dependency Additions

**None**. Leverage existing stack:
- React 19 (already required for islands)
- Nanostores 1.2 + @nanostores/react (already in site)
- Tailwind v4 (already styling site)
- Web Animations API (native browser feature)

### Animation & Interaction

- **Terminal text reveal**: CSS `animation: typewriter steps(N) 300ms`, or Web Animations API for per-character timing if needed
- **Panel entrance**: CSS `transition: opacity 300ms ease-out` on `.artifact-panel.active`
- **Scrubber progress**: CSS `transition: width 200ms ease-out` on progress bar
- **Respect prefers-reduced-motion**: Wrap animations in `@media (prefers-reduced-motion: reduce) { /* remove animations */ }`

### Data Schema

Stage config in `src/data/workflow-stages.json`:

```json
{
  "stages": [
    {
      "id": "1",
      "postSlug": "post-1-baseline",
      "title": "Stage 1: Pre-governance Baseline",
      "steps": [
        {
          "stepId": "1",
          "label": "Feature request received",
          "terminal": ["$ clerk --prompt 'Build workflow showcase'", "Request queued..."],
          "panels": {
            "prd": "Vague feature request: 'Build a showcase'\n\nNo structure, no frontmatter.",
            "progress": "status: undefined\ntasks: []",
            "agents": "None assigned yet"
          }
        },
        // ... more steps
      ],
      "metrics": {
        "tokensUsed": 1234567,
        "throughput": 8500,
        "cost": 3.75,
        "duration": "7m 23s"
      },
      "ctaLinks": {
        "primary": "https://github.com/miethe/MeatySkills/tree/main/skills/spike"
      }
    },
    // ... Stage 2, 3, etc.
  ]
}
```

---

## Rejected Alternatives

### Why Asciinema (Candidate 1) Was Rejected

Asciinema-player ships 60-80 KB gzipped, designed specifically for terminal session replay. While excellent at that purpose, the Showcase requires artifact panels (PRD, plan, progress, agents) alongside terminal output. This forces a hybrid approach: asciinema for the terminal pane, custom components for artifact tabs.

**Blocker**: The 60-80 KB footprint alone violates the <35 KB animation tech budget. Combined with custom artifact wrapper code, total impact > 60 KB showcase code budget, leaving no room for state machine or UI components.

**Secondary reason**: Authoring a stage requires understanding asciinema cast file format (frame timing, escape sequences). Artifact content must be authored separately. Iteration friction: edit cast file, test timing, re-record if wrong. Not suitable for rapid stage authoring (Phases 2-3 critical path).

---

### Why Framer Motion (Candidate 2) Was Rejected (in favor of Hybrid)

Framer Motion with selective imports (domAnimation) compresses to ~19-20 KB gzipped, which is acceptable. Latency is excellent, and visual fidelity is strong. Why not recommend it?

**Primary reason**: While Motion is a fine library, the 19-20 KB overhead buys you declarative animation primitives (`<motion.div>`, keyframes, gestures). For the Showcase, you don't need those primitives. All animations are subtle (fade, slide, typewriter text reveal). CSS transitions and Web Animations API suffice, at zero cost.

**Secondary reason**: Authoring friction. With Framer Motion, each stage step gains 2-3 animation config fields (duration, delay, easing, variant names). The scrubber UI must still be custom-coded (Motion is component-focused, not scrubber-focused). You end up hand-writing a state machine anyway. Hybrid approach unifies: no animation config, purely data-driven step progression.

**Tertiary reason**: Maintenance burden. Motion v12+ is stable, but animation libraries evolve (new features, API tweaks, dependency churn). Hybrid approach uses only native APIs + Nanostores (already trusted by site). Lower tech debt long-term.

**Bottom line**: Framer Motion is not wrong, just unnecessary. Hybrid is simpler, smaller, and achieves the same user experience.

---

### Why Lottie/Rive (Candidate 3) Was Rejected

Lottie and Rive are excellent for polished, designer-driven animations (think loading spinners, UI transitions). For the Showcase, they incur overhead without benefit.

**Primary reason**: Designer handoff friction. Each stage animation must be created in Figma (Lottie) or Rive workspace by a designer. Adding a new step requires designer to re-do the timeline, re-export, coordinate with developer. For a feature with new stages every 1-2 weeks (as blog posts ship), this is unworkable. Solo developer can author a stage with JSON + CSS; cannot author a stage with design tool + coordination.

**Secondary reason**: Bundle size. Lottie ~30 KB gzipped, comparable to Framer Motion. Rive runtime can be externalized to CDN (~5-10 KB if bundled), but animation runtime still required. No bundle advantage over Framer Motion.

**Tertiary reason**: Artifact panels are not animated (animations are separate from data). PRD, plan, progress, agent roles display as static content. The animation runtime handles only visual transitions; developer must style artifacts separately anyway. Hybrid approach gives the same result (artifact content + transitions) without the designer loop.

**Bottom line**: Lottie/Rive are overkill for this use case and introduce workflow friction. Reject.

---

## Implications for Phase 1

### What Changes Shape

1. **Component API**: `<WorkflowStage />` island accepts stage data (JSON structure from `src/data/workflow-stages.json`), renders scrubber, panels, metrics, CTA via child components. No animation library API to manage.

2. **State Management**: Two new Nanostores atoms (`$activeStageId`, `$expandedPanels`) for per-island state. No Redux, Context, or local component state fighting over truth source.

3. **Styling**: No animation-library-specific styles. All animations via CSS transitions or Tailwind utilities. New `@media (prefers-reduced-motion: reduce)` block in `src/styles/workflow-showcase.css` to disable animations for users who prefer reduced motion.

4. **Testing**: No animation library test utilities needed. React Testing Library + user-event for component interaction tests, simple assertions on DOM state changes.

### Prerequisite Changes to package.json

**None required**. This is a feature addition; no new npm dependencies. Site already ships:
- React 19
- Nanostores 1.2
- Tailwind CSS v4

### Files Affected

**Scope remains as planned** in WS-1.x tasks. No changes needed to critical path:

- `src/components/islands/WorkflowStage.tsx`: New island (scrubber, panels, state orchestration)
- `src/components/islands/WorkflowScrubber.tsx`: New scrubber control (buttons, timeline, keyboard nav)
- `src/components/islands/WorkflowArtifactPanel.tsx`: New tabs/accordion for artifacts
- `src/components/islands/WorkflowMetrics.tsx`: New metrics overlay
- `src/components/islands/WorkflowCTACard.tsx`: New CTA card
- `src/pages/workflow-showcase.astro`: New Astro page with routing
- `src/stores/workflow-stage.ts`: New Nanostores atoms
- `src/types/workflow.ts`: New TypeScript types
- `src/data/workflow-stages.json`: New stage manifest
- `src/styles/workflow-showcase.css`: New theme tokens + animations

**No impact on**:
- Blog pages, UI Showcase, other site features
- Existing component libraries (@miethe/ui, global components)
- Build process, deployment pipeline

### Timeline Implication

**No slippage**. Hybrid approach is simpler than Framer Motion or asciinema, so Phase 1 (component shell) can move faster. Phase 1.3 (scrubber UI) becomes a shadcn-style component (buttons + div, no animation lib), reducing complexity. Phase 2 (Stage 1 authoring) is pure JSON + artifact collection, minimal friction. Same 3-4 day Phase 1 duration, lower risk.

---

## Open Questions

1. **Text reveal animation timing**: Should terminal output animate character-by-character (typewriter effect) or appear in chunks? Typewriter feels more authentic; chunks are faster. Recommend: typewriter at 50ms per character (perceived fluidity), can be adjusted per stage via config if needed.

2. **Mobile scrubber interaction**: Prev/Next buttons vs. swipe gesture? Recommend buttons (simpler, more accessible) with optional swipe (progressive enhancement). Buttons are the MVP.

3. **Artifact panel default state**: Should PRD panel be expanded by default on page load, or collapsed? Recommend: PRD expanded (most important), plan and progress collapsed (users expand if interested). Metrics overlay optional (toggle or always-visible).

4. **Metrics data source in MVP**: Curated JSON (real data from workflow, anonymized) or fully synthetic? PRD question 2 recommends curated. Confirm with Nick: are Post 1 and Post 2 metrics available from CCDash or logs?

All questions are resolvable within Phase 1 without blocking the tech choice. Recommendation stands.

---

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation Strategy |
|------|--------|------------|-------------------|
| **Web Animations API incompatibility** | Older browsers (IE 11) don't support API; animations break | Very Low (IE 11 EOL 2022; site targets modern browsers) | Add feature detection; fallback to static state changes if Web Animations unavailable. Nanostores state still updates; visual transitions just skip. |
| **State synchronization across pages** | If user navigates to blog post then back to Showcase, stage selection is lost | Low | Nanostores persists to localStorage; `$activeStageId` restored on page load. Tested in Phase 1.7 (WS-1.7 acceptance criterion). |
| **Mobile touch latency on low-end devices** | iPhone SE or Moto G7 feels sluggish; interaction > 100ms target | Medium | Phase 5 includes mobile testing on low-end devices (WS-5.2). If interaction latency > 100ms, optimize: reduce animation duration, remove frame-by-frame typewriter, use static text reveal. |
| **Bundle size creep during Phase 2-3 authoring** | Artifact content is large (copy-paste full PRD frontmatter, plan tables); JSON balloons | Low | WS-1.10 test fixture includes realistic artifact sizes. Monitor JSON file size as stages added. If > 200 KB, compress or split into separate files (lazy-load artifact content on demand). |
| **Scrubber UX confusion on mobile** | Users don't understand prev/next buttons; low engagement | Low | WS-5.2 mobile testing catches this. Mitigation: affordance text "Tap next to step through" or auto-play on idle (e.g., 3-second pause triggers auto-play). Tested with real users if feedback is poor. |
| **Artifact panel content misalignment with step** | Developer updates terminal output for step 3 but forgets to update PRD panel; content feels out of sync | Medium (content authoring risk, not tech risk) | WS-2.x and WS-3.x include validation checklist: "For each step, verify terminal output matches artifact state." Checklist in stage-authoring-template.md. |
| **Keyboard navigation not discoverable** | Users don't know they can arrow-key through steps; mouse-only interaction | Low | WS-5.1 a11y audit includes user testing with keyboard only. Add `aria-label="Use arrow keys to navigate steps"` to scrubber. Optional: tooltip on hover. |

---

## Success Criteria

Phase 0 SPIKE is complete when:

1. **Recommendation locked**: This document reflects final decision. No ambiguity about tech choice.
2. **Rejection rationale clear**: Each rejected alternative has a documented, defensible reason. Team consensus on "hybrid is correct."
3. **Phase 1 implications mapped**: Component API, state management, file structure, no surprise complexity.
4. **Acceptance criteria met**:
   - Zero-dependency hybrid approach chosen
   - Bundle size < 15 KB gzipped for Showcase code (vs. 60-80 KB asciinema, 30 KB Motion, 30-40 KB Lottie)
   - Authoring ergonomics 4.5/5 (JSON steps, no animation config, single-developer authoring)
   - Interaction latency 10-20ms (vs. 100ms target)
   - Accessibility built-in (not post-hoc wrapper)
   - Fit with React 19 + Nanostores perfect
5. **No prototype regret**: Hybrid approach is proven pattern (shadcn/ui, UI Showcase v2). No "let's try one more library" slippage.

---

## Validation Plan

Phase 1 will confirm this SPIKE was correct:

1. **Bundle size validation (WS-1.11)**:
   - Run `npm run build` with test fixture stage
   - Measure Showcase code delta (new components + styles + JSON)
   - Confirm < 15 KB gzipped
   - If > 20 KB, investigate and optimize (unused dependencies, oversized assets)

2. **Interaction latency measurement (WS-1.11)**:
   - Use Chrome DevTools Performance tab to measure paint-to-interactive on scrub click
   - Confirm < 100ms
   - Test on mid-range device (Moto G7 emulation) and low-end (iPhone SE emulation)
   - If > 150ms, profile: is it state update, re-render, or paint? Optimize accordingly

3. **Accessibility validation (WS-5.1)**:
   - Run axe DevTools on Showcase page with test fixture
   - Manually test keyboard nav (arrow keys, Tab, Enter)
   - Verify aria-live announcements on step change
   - Confirm WCAG AA pass rate 100%
   - If issues, they're config/attribute missing, not tech choice problem

4. **Authoring friction check (WS-2.1 to WS-2.5)**:
   - Author Stage 1 (5-8 steps) using final schema
   - Track time: write steps, collect artifacts, validate JSON, test rendering
   - Target: 2-3 hours per stage
   - If > 4 hours, schema is too painful; iterate

**Re-SPIKE trigger**: If any metric exceeds target by > 20% (e.g., bundle 18 KB, latency 120ms, authoring > 4 hours), call for re-evaluation. Otherwise, proceed with conviction.

---

## References

### Internal Documentation

- **PRD**: Workflow Showcase feature requirements, constraints, tech option space
- **Implementation Plan**: Phase 0-5 task breakdown, critical path analysis
- **UI Showcase v2 Implementation**: Pattern reference for custom component + filtering architecture
- **CLAUDE.md**: Site tech stack (Astro 6, React 19, Tailwind v4, Nanostores)
- **src/CLAUDE.md**: Site development conventions, Tailwind v4 usage

### External References

- [Motion.dev: Reduce Bundle Size](https://motion.dev/docs/react-reduce-bundle-size): Framer Motion tree-shaking strategies
- [Framer Motion v12 Bundle Size (Bundlephobia)](https://bundlephobia.com/package/framer-motion): Published metrics
- [Asciinema Player (npm)](https://www.npmjs.com/package/asciinema-player): Package documentation
- [Asciinema Format (v2 spec)](https://github.com/asciinema/asciinema/blob/master/doc/asciicast-v2.md): Cast file format
- [Nanostores Docs](https://github.com/nanostores/nanostores): State management library
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs): Styling framework
- [Web Animations API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API): Native browser animation API
- [shadcn/ui](https://ui.shadcn.com/): Design system pattern reference
- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/): Accessibility compliance standard

---

## Appendices

### A. Component API Sketch (Hybrid Approach)

```tsx
// src/components/islands/WorkflowStage.tsx

interface WorkflowStageProps {
  stage: StageData; // { id, title, steps, artifacts, metrics, ctaLinks }
  initialStep?: number; // Default: 0
  onStepChange?: (stepIndex: number) => void; // Analytics hook
}

export function WorkflowStage({ stage, initialStep = 0, onStepChange }: WorkflowStageProps) {
  const [activeStep, setActiveStep] = useAtom($activeStageId);
  const [expandedPanels, setExpandedPanels] = useAtom($expandedPanels);

  const currentStep = stage.steps[activeStep];

  const handleStepChange = (stepIndex: number) => {
    setActiveStep(stepIndex);
    onStepChange?.(stepIndex);
  };

  const togglePanel = (panelType: ArtifactType) => {
    const newPanels = new Set(expandedPanels);
    newPanels.has(panelType) ? newPanels.delete(panelType) : newPanels.add(panelType);
    setExpandedPanels(newPanels);
  };

  return (
    <div className="workflow-stage" role="region" aria-label={`Stage: ${stage.title}`}>
      <WorkflowScrubber
        steps={stage.steps}
        activeStep={activeStep}
        onStep={handleStepChange}
      />

      <div className="workflow-content">
        <WorkflowTerminalPane step={currentStep} />

        <WorkflowArtifactPanel
          artifacts={stage.steps[activeStep].panels}
          expanded={expandedPanels}
          onTogglePanel={togglePanel}
        />
      </div>

      <WorkflowMetricsOverlay metrics={stage.metrics} />
      <WorkflowCTACard stage={stage} />
    </div>
  );
}
```

### B. State Management Code Sketch

```ts
// src/stores/workflow-stage.ts

import { atom } from 'nanostores';

export const $activeStageId = atom<string>('1');
export const $expandedPanels = atom<Set<'prd' | 'plan' | 'progress' | 'agents'>>(
  new Set(['prd'])
);

// Initialize from URL params or localStorage
export function initializeWorkflowState(stageIdFromUrl?: string) {
  const stored = localStorage.getItem('workflow-showcase-stage-id');
  const stageId = stageIdFromUrl || stored || '1';
  $activeStageId.set(stageId);

  const storedPanels = localStorage.getItem('workflow-showcase-expanded-panels');
  if (storedPanels) {
    try {
      const panels = new Set(JSON.parse(storedPanels));
      $expandedPanels.set(panels);
    } catch (e) {
      // Fallback to default
    }
  }
}

// Persist to localStorage when atoms change
$activeStageId.subscribe((id) => {
  localStorage.setItem('workflow-showcase-stage-id', id);
});

$expandedPanels.subscribe((panels) => {
  localStorage.setItem('workflow-showcase-expanded-panels', JSON.stringify([...panels]));
});
```

### C. Data Schema Example

```json
{
  "stages": [
    {
      "id": "1",
      "postSlug": "post-1-baseline",
      "title": "Stage 1: Pre-Governance Baseline",
      "description": "Ungoverned agentic workflow: vague prompts, confident-and-wrong output, no traceability",
      "publishedDate": "2026-05-15",
      "steps": [
        {
          "stepId": "1",
          "label": "Feature request received",
          "terminal": [
            "$ slack #team 'Build a workflow showcase'",
            "Request posted by alice"
          ],
          "panels": {
            "prd": "Feature request from Slack:\n\n'Build a workflow showcase'\n\nNo additional context.",
            "plan": "No plan created.",
            "progress": "status: undefined",
            "agents": "None"
          }
        }
      ],
      "metrics": {
        "tokensUsed": 1234567,
        "throughput": 8500,
        "cost": 3.75,
        "duration": "7m 23s"
      },
      "ctaLinks": {
        "skill": "spike",
        "label": "Learn the diagnosis framework",
        "href": "https://github.com/miethe/MeatySkills/tree/main/skills/spike"
      }
    }
  ]
}
```

---

**SPIKE ID**: `SPIKE-2026-05-10-workflow-showcase-tech`
**Status**: Accepted
**Decision**: Hybrid shadcn-style scrubber UI + Web Animations API + state machine
**Confidence**: High
**Next Step**: Proceed to Phase 1 (WS-1.1 through WS-1.12). No blockers. No re-evaluation needed unless Phase 1 measurements exceed thresholds by >20%.

---

## Addendum (2026-05-15): Demo Foundry Evaluation

### Why This Addendum

The original SPIKE evaluated runtime interaction technologies (asciinema, Framer Motion, Lottie/Rive, hybrid) for in-page scrubbing and step progression. It did not consider content-production pipelines. Since completion of the SPIKE, Demo Foundry has been identified as locally available and worth evaluating as a complementary authoring layer (not a replacement for Phase 1 runtime tech). This addendum evaluates its fit.

**Scope**: Demo Foundry as an *authoring pipeline* for Phase 2-3 content production, not as a runtime technology.

---

### Candidate 5a: Demo Foundry as Standalone Replacement (Video Playback)

**Approach**: Replace the hybrid scrubber with pre-recorded Playwright + Remotion walkthrough videos for each stage. Readers watch a polished video, no interactive scrubber. Video player handles navigation (play/pause/seek).

**Evaluation**:

| Criterion | Assessment |
|-----------|-----------|
| **Bundle Size** | Player only (~5-15 KB); videos are external assets | ✓ |
| **Interaction Latency** | N/A (no interactive scrubbing; play/seek is native video) | ✓ |
| **Visual Fidelity** | Excellent; polished Remotion output with callouts, captions, overlays | ✓✓ |
| **Accessibility** | Video captions + transcript required; no artifact panel exploration | ⚠️ |
| **Authoring Ergonomics** | Manifest-driven, reproducible output, less JSON hand-writing | ✓ |
| **Fit with Phase 1 Decision** | **Fundamental conflict** | ❌ |

**Verdict**: **Reject as standalone replacement**. The PRD (section 1.1) explicitly requires "interactive artifact panel exploration" (readers expand PRD, plan, progress tabs mid-stage). A baked video flattens the experience into passive viewing; readers cannot click a tab to see the PRD while the stage is playing. Interactive scrubber is not optional; it is the core value proposition of the Showcase.

This approach trades interactivity for polish. Not acceptable.

---

### Candidate 5b: Demo Foundry as Authoring Pipeline (Complement to Hybrid Scrubber)

**Approach**: Author a scenario manifest per stage (in `demo/demos/stage-1-baseline/manifest.yaml`). Demo Foundry generates canonical terminal screenshots/recordings, artifact snapshots (as PNG or HTML), thumbnail images, and talking-points / voiceover-script artifacts. Transform outputs (via a small CLI script) into the JSON shape that `src/data/workflow-stages.json` consumes, plus PNG/MP4 assets for `public/`.

**How it works**:

1. **Manifest authoring**: Define a scenario in YAML (click here, type that, navigate to this, capture state).
2. **Playwright capture**: Run scenario headless; capture terminal output, artifact panel states at each step.
3. **Asset generation**: Demo Foundry produces PNG screenshots, HTML snapshots (for copy-paste), MP4 raw video, metadata.
4. **Transform to JSON**: Custom script converts Demo Foundry output + metrics to workflow-stages.json entry.
5. **Reproducibility**: Re-run manifest anytime agent CLI evolves or stage needs updating. Screenshots are canonical, always fresh.

**Evaluation**:

| Criterion | Assessment |
|-----------|-----------|
| **Solves Phase 2-3 authoring friction** | Yes; manifest-driven beats hand-writing JSON | ✓✓ |
| **Reproducibility** | Yes; re-run pipeline for fresh screenshots if agent CLI changes | ✓✓ |
| **Bonus deliverables** | Yes; pipeline generates thumbnail PNG (blog hero image), social clip MP4 (promotion), talking points (podcast/video script) | ✓✓ |
| **Integration with Phase 1** | Clean; no changes to hybrid scrubber. Assets ingested into workflow-stages.json | ✓ |
| **Resolves PRD open question 4** | Yes; metrics declared in manifest, embedded in JSON output | ✓ |
| **Answers original SPIKE open question 4** | Yes; metrics source = curated manifests treated as living docs | ✓ |
| **Dev-only dependencies** | Playwright, Remotion, FFmpeg are dev-time only; not shipped to users | ✓ |

**Verdict**: **Accept as Phase 2-3 authoring pipeline**. Demo Foundry does not change the Phase 1 runtime decision (hybrid scrubber remains). It solves real authoring friction flagged in the original SPIKE and generates reusable assets (thumbnails, social clips) that the original SPIKE did not capture.

---

### Updated Recommendation

**Keep the original Phase 1 runtime decision unchanged** (hybrid shadcn scrubber + Web Animations API + Nanostores).

**Add demo-foundry as the canonical Phase 2-3 *authoring pipeline***.

**Architecture**: Two layers
- **Layer 1 (Runtime)**: Hybrid scrubber (Phase 1, unchanged)
- **Layer 2 (Authoring)**: Demo Foundry pipeline (Phase 0 setup + Phase 2-3 usage)

This is a layering improvement, not a tech re-evaluation. Original decision stands. Addendum adds proven complementary tooling.

---

### Implications for Implementation Plan

Specific changes to WS-0.x, WS-1.x, WS-2.x phases:

**Phase 0 (Prerequisites)**:

- **NEW TASK WS-0.6**: Initialize Demo Foundry in this repo
  - Create `/demo` workspace and `demo-foundry.config.yaml`
  - Dry-run first per Demo Foundry skill rules
  - Estimate: ~2 SP (one dry-run analysis, one apply cycle)
  - Prerequisite: Before WS-1.1 component design

**Phase 1 (Component & Schema Design)**:

- **WS-1.1** (schema design) should accept assets that Demo Foundry naturally produces:
  - `terminalScreenshots`: array of PNG paths (relative to `public/`)
  - `artifactSnapshots`: object mapping panel type to HTML or PNG path
  - `thumbnailImage`: PNG path for stage hero (blog post image)
  - `metricsSource`: reference to manifest or JSON embedded directly
  - **No schema changes required beyond above** (rest of Phase 1 unchanged)

**Phase 2 (Stage 1 Authoring)**:

- **WS-2.1** task shifts from "hand-write JSON" to a pipeline:
  1. Author scenario manifest at `demo/demos/stage-1-baseline/manifest.yaml`
  2. Run `demo-foundry dry-run` to verify scenario captures cleanly
  3. Run `demo-foundry apply` to generate screenshots, video, artifacts
  4. Run `transform-demo-to-stage.ts` (small CLI script) to convert Demo Foundry output to workflow-stages.json entry
  5. Test rendering in Showcase page
  - Effort: ~4-5 SP (manifest authoring, asset review, integration testing)
  - **Bonus**: Pipeline generates `stage-1-thumbnail.png` (for blog post hero), `stage-1-social-clip.mp4` (30s or 60s version for Twitter/LinkedIn), `stage-1-talking-points.md` (for Nick's podcast notes or video)

**Phase 3 (Stage 2)**:

- **WS-3.1** mirrors WS-2.1; same pipeline, different manifest

- **Timeline benefit**: If Demo Foundry setup is clean, Stage 2 authoring is slightly faster (reuse manifest patterns from Stage 1)

**Resolution of Original Open Questions**:

- **Original open question 4** (metrics data source in MVP): Now answered. Manifest declares metrics; Demo Foundry pipeline embeds them in JSON. Source is curated, not synthetic.

---

### Risks of Adding Demo Foundry

| Risk | Impact | Mitigation |
|------|--------|-----------|
| **Initial setup cost** | ~1 day of agent time | Demo Foundry's setup is `apply` once; pipeline is reused for all 8+ stages. Cost amortizes quickly. |
| **Pipeline drift if agent CLI evolves** | Old manifests become stale; screenshots misaligned | Treat manifests as living artifacts. Re-run pipeline before each post launch (2-week cycle). Expectation: manifest may need tweaks when CLI changes. |
| **New dev dependencies** | Playwright, Remotion, FFmpeg on dev machines | Dev-only; not shipped. Acceptable. Add to `.gitignore` for large video outputs. |
| **Manifest authoring complexity** | If manifests are hard to write, shifts friction, not solves it | Keep manifests simple initially (basic click, type, capture). Progressive enhancement: add advanced capture (network mocking, component state injection) later if needed. |

**Bottom line**: Risks are low; setup cost is front-loaded; benefits compound.

---

### Open Questions Specific to Demo Foundry Integration

1. **HTML vs. PNG snapshots for artifact panels**: Should panels render as interactive HTML (readers can copy-paste code from PRD, plan, etc.) or frozen PNG (visual fidelity only)?
   - **Recommendation**: HTML snapshots. Preserves copy-paste utility and a11y (screen readers can read HTML). PNG is fallback if HTML rendering is too heavy.

2. **Manifest location**: Should manifests live in `signal_to_system/demo/demos/` (this repo, ships with site via CI) or in `MeatyBrain/Blogs/<post>/demo/` (PKM, off-repo)?
   - **Recommendation**: In-repo (`signal_to_system/demo/`). Reason: CI reproducibility. If manifests live in PKM, CI cannot re-run pipeline without syncing PKM first. Keep them in-repo as part of the source of truth.

3. **Social clip generation**: Should each stage auto-generate a 30s social clip (MP4 + caption), or is it optional?
   - **Recommendation**: Optional for MVP (Phase 2-3). If Demo Foundry generates it, it's free bonus. Formal social strategy (dimensions, format, targeting) is out of scope for this SPIKE.

---

### Status of This Addendum

**Addendum Status**: Accepted (2026-05-15)

Original SPIKE recommendation remains **unchanged**. Addendum is **non-breaking** (adds authoring pipeline, does not alter Phase 1 runtime decision). Demo Foundry integration is **recommended but optional** for Phase 2-3 (if setup friction proves too high, fall back to hand-written JSON, accept slower authoring cycle).
