---
title: "@miethe/ui Component Showcase v2 — Implementation Plan"
description: "Phase-by-phase task breakdown for scaling component coverage, detecting version updates, and enabling efficient catalog filtering."
created: 2026-04-16
status: draft
related:
  - "/Users/miethe/dev/homelab/development/signal_to_system/docs/specs/ui-showcase-v2.md"
  - "/Users/miethe/dev/homelab/development/signal_to_system/docs/specs/ui-showcase-v1-implementation.md"
---

# Implementation Plan: @miethe/ui Component Showcase v2

**Complexity**: Large (L) | **Track**: Full
**Total Effort**: ~35 story points | **Timeline**: 2-3 weeks
**Critical Path**: Phase 1 (manifest + scaffolder) unlocks all downstream work; Phase 3 (filters) is independent and can run in parallel after infrastructure is ready

## Executive Summary

v2 extends the v1 showcase from 7 to 35 components by removing friction and automating detection. Three pillars: (1) a one-command scaffolder + contributor guide that makes adding components a 2-minute task; (2) a detection script that surfaces @miethe/ui version bumps and missing exports; (3) shadcn.com-style filtering (search, category pills, status toggles) on the landing page.

**Why this matters**: v1 proved the concept; v2 removes the friction that kept 28 components undocumented. Once Phase 1 completes, contributors can scaffold any component in seconds. Phase 2 ensures maintainers never miss a package update. Phase 3 gives visitors the discoverability tools to navigate a full catalog efficiently.

**Key wins**: Under 2 minutes to scaffold a new component; automatic drift detection when @miethe/ui updates; instant filtering by name, category, or status on landing page; clear, documented contributor workflow.

**Approach**: Build the scaffolder first (Phase 1), validate it works with 1-2 manual components (Phase 2), then enhance landing-page UX (Phase 3), then add version-detection automation (Phase 4), then validate end-to-end (Phase 5).

## Phase Overview

| Phase | Title | Effort | Dependencies | Status |
|-------|-------|--------|--------------|--------|
| 1 | Manifest & Scaffolder Foundation | 8 SP | None | Ready to start |
| 2 | Component Population & Dogfood | 6 SP | Phase 1 | Blocked on Phase 1 |
| 3 | Search, Filters & View Modes | 10 SP | Phase 1 (data structure only) | Can start after Phase 1 |
| 4 | Version-Update Detection & Remediation | 7 SP | Phase 1 | Can start after Phase 1 |
| 5 | Validation & Documentation | 4 SP | Phases 2-4 | Final phase |

---

## Phase 1: Manifest & Scaffolder Foundation

**Objective**: Define manifest schema, create _manifest.json populated with all @miethe/ui exports, build scaffolder script, author contributor guide, create templates.

**Scope**: This phase is the unlock. Once it completes, anyone can scaffold a component in <2 minutes and contributors have a clear, step-by-step guide. No feature work; pure scaffolding + documentation.

**Key Files Created**:
- `src/data/ui/_manifest.json` (new; tracks all components + status)
- `scripts/scaffold-ui-component.mjs` (new; Node CLI)
- `scripts/templates/component.mdx` (new; MDX stub)
- `scripts/templates/ComponentNameDemo.tsx` (new; demo stub)
- `scripts/templates/component.json` (new; props JSON stub)
- `docs/ui-showcase-contributing.md` (new; full guide)

### Tasks

| ID | Task | Acceptance Criteria | Est | Owner |
|----|------|-------|-----|-------|
| 1.1 | Design manifest schema and document | `_manifest.json` includes: name, export, status (documented/stub/deprecated), since (version), slug. Schema validated via TypeScript interface. Documentation in inline comments. | M | documentation-expert |
| 1.2 | Populate _manifest.json with all 35 @miethe/ui exports | Load @miethe/ui package exports (check package.json or dist folder) and seed manifest with all exports. Current 7 components marked "documented"; remaining 28 marked "stub". All have valid slugs (kebab-case). Run script/manual check to verify count matches installed package. | M | general-purpose |
| 1.3 | Build scaffolder script (scaffold-ui-component.mjs) | Script accepts component name (PascalCase or kebab-case). Generates: MDX file (src/content/ui/), demo TSX (src/components/ui-showcase/demos/), props JSON (src/data/ui/). Validates: name not already in manifest, no file collisions, valid naming. Output lists files created + next steps checklist. Error messages are clear (e.g., "Button already exists; see manifest at..."). Runs in <1 second. | L | general-purpose |
| 1.4 | Create template files for scaffolder | (a) component.mdx template: includes frontmatter with placeholders (title, slug, category, status, description, since), intro section, demo section, props reference, a11y section. (b) ComponentNameDemo.tsx: stub React island with useCallback, props passed in, minimal JSX. (c) component.json: empty props array with schema comment (name, type, default, description, example fields). All templates use clear placeholder syntax (e.g., {{ COMPONENT_NAME }}). | M | frontend-developer |
| 1.5 | Author contributor guide (ui-showcase-contributing.md) | Comprehensive guide covering: prerequisites (Node 22, pnpm, React + Astro familiarity), end-to-end workflow, template code examples, frontmatter schema docs, props JSON schema docs, testing/verification checklist, link to existing components as reference. Step-by-step: "List desired components -> run scaffolder -> fill metadata -> write demo -> populate props -> build -> verify". Should enable someone unfamiliar with repo to complete a component in <5 minutes. | M | documentation-writer |
| 1.6 | Wire scaffolder into package.json scripts | Add convenience script to package.json (e.g., `"scaffold": "node scripts/scaffold-ui-component.mjs"`). Document invocation in CLAUDE.md or inline. Verify script works: `npm run scaffold Button`. | S | general-purpose |
| 1.7 | Create example scaffolded component for demo purposes | Run scaffolder once manually (e.g., `node scripts/scaffold-ui-component.mjs ChipInput`). Inspect generated files; fix any template bugs. Keep component as example in guide. Document "Reference implementation for scaffold output" in contributing guide. | M | frontend-developer |
| 1.8 | Update .claude/skills or AGENTS.md if scaffolder is agent-facing | If scaffolder is meant to be invoked by agents, document it in AGENTS.md (e.g., "To add component X, run: node scripts/scaffold-ui-component.mjs ComponentName; then fill in..."). | S | documentation-writer |

**Quality Gates**:
- Manifest JSON validates as valid JSON with correct schema
- Scaffolder runs without errors on test component name
- Generated MDX, TSX, JSON files are valid (build passes)
- Contributor guide is clear and testable by someone external to repo
- Next steps checklist is actionable

**Assigned Subagents**: documentation-expert (schema), general-purpose (script), frontend-developer (templates), documentation-writer (guide)

**Dependencies**: None (foundational)

---

## Phase 2: Component Population & Dogfood

**Objective**: Validate scaffolder works end-to-end by populating 5 additional components. Iterate on scaffolder UX if needed. Leave stubs for the remaining 23 components to be filled incrementally.

**Scope**: Apply scaffolder to 5 components outside the original v1 set, author their demos and prop tables, verify build passes, ensure they render correctly on landing and detail pages. This serves two purposes: (1) proof that scaffolder works, (2) dogfood validation that guide is clear.

**Key Files Modified**: All files created in Phase 1; new component content files for 5 scaffolded components.

### Tasks

| ID | Task | Acceptance Criteria | Est | Owner |
|----|------|-------|-----|-------|
| 2.1 | Scaffold 5 new components and author their content | Choose 5 from @miethe/ui exports (e.g., Checkbox, Radio, Select, Card, Badge). For each: (a) run scaffolder, (b) fill frontmatter, (c) author demo TSX with interactive example, (d) populate props JSON, (e) verify build passes. All components should have realistic, working demos. | L | frontend-developer |
| 2.2 | Verify scaffolded components render on landing page | Navigate to `/portfolio/ui/`. All 5 new components appear in correct category grid. Status badge shows correct status (e.g., "stable"). Component card links work. | M | frontend-developer |
| 2.3 | Verify detail pages render correctly | Click through to each new component's detail page. ComponentPage layout renders correctly. Demo hydrates. PropTable displays props. No console errors. Dark mode works. | M | frontend-developer |
| 2.4 | Iterate on scaffolder/guide based on dogfood feedback | If guide is unclear or scaffolder output needs tweaks, update script and guide. Example: if demo template is too minimal, flesh it out. If frontmatter instructions are confusing, clarify. Document decisions in PR description. | M | frontend-developer + documentation-writer |
| 2.5 | Create placeholder stubs for remaining 23 components (optional) | Run scaffolder in batch for all remaining 28-35 components, seeding manifest as "stub" status. Do NOT fill demos/props yet (keep minimal). This surfaces work for Phase 3+. Optional if Phase 1 includes this; prioritize based on roadmap. | M | general-purpose |
| 2.6 | Test scaffolder with edge cases | (a) Component name with hyphens vs. PascalCase. (b) Duplicate component name (should error gracefully). (c) Run on machine without @miethe/ui installed (should handle gracefully). Verify error messages are clear. | M | general-purpose |

**Quality Gates**:
- Build passes (`npm run build`, `npm run check`)
- All 5 new components appear on landing page with correct metadata
- Detail pages render and demos are interactive
- No console errors in light or dark mode
- Scaffolder handles edge cases gracefully

**Assigned Subagents**: frontend-developer (content authoring, dogfood), documentation-writer (iterate guide), general-purpose (batch stubs, edge case testing)

**Dependencies**: Phase 1 (scaffolder and guide completed)

---

## Phase 3: Search, Filters & View Modes

**Objective**: Implement shadcn.com-style filtering UI on landing page: search input, category pills, status toggles, view-mode switcher. All client-side via Nanostores.

**Scope**: Build React island for search + filters; integrate into landing page; ensure instant filtering; add keyboard shortcuts; validate accessibility and mobile responsiveness.

**Key Files Created/Modified**:
- `src/stores/ui-filters.ts` (new; Nanostores atoms)
- `src/components/ui-showcase/UISearchFilter.tsx` (new; React island)
- `src/pages/portfolio/ui/index.astro` (modified; integrate UISearchFilter)
- `src/styles/global.css` (modified; optional: add filter-specific styles)

### Tasks

| ID | Task | Acceptance Criteria | Est | Owner |
|----|------|-------|-----|-------|
| 3.1 | Design and implement Nanostores state (ui-filters.ts) | Four atoms: searchQuery (string), activeCategories (Set<string>), activeStatuses (Set<string>), viewMode ('grid' | 'list'). Each atom is writable. Export: atoms + utility functions to toggle category/status. Initialize from localStorage if available. | M | frontend-architect |
| 3.2 | Build UISearchFilter React island component | Input: all UI components data (from Astro collection). Output: (a) search input with Cmd+K / affordance, (b) category filter pills (toggleable), (c) status filter dropdown/pills, (d) view-mode toggle button (grid/list). Update Nanostores atoms on user interaction. Responsive: filters stack on mobile. | L | frontend-developer |
| 3.3 | Implement client-side filtering logic in landing page | Landing page grid now filters based on atoms. As user types in search, categories toggle, or statuses change, grid re-renders reactively. Filtering logic: search matches component name, description, category, tags. Categories use OR logic if multiple selected. Statuses use AND logic (show only if status in selection). Default: show all; hide stubs and deprecated. | L | frontend-developer |
| 3.4 | Implement view-mode switcher (grid vs. list) | Grid view: current card layout (3 cols desktop, 2 mobile, 1 mobile). List view: minimal rows with name + category + status + link. Icons/buttons to toggle between modes. Density toggle updates CSS class or data attribute. | M | frontend-developer |
| 3.5 | Implement keyboard shortcuts | Cmd+K or / focuses search input. Escape clears search and re-shows all components. Tab navigates through category pills and status filters. Enter/Space toggles pills. Focus management: focus returns to search after clearing. | M | frontend-developer |
| 3.6 | Accessibility audit for filter UI | (a) Search input has <label> + aria-describedby. (b) Category/status pills have role="button" or are <button> elements. (c) Active pills have aria-pressed="true". (d) Results count has aria-live="polite" to announce changes. (e) Keyboard navigation complete (Tab, Shift+Tab, Enter, Space, Escape). (f) Color + text for status indicators (no color-only information). (g) Focus rings visible in both light/dark modes. Run axe DevTools on landing page. | M | frontend-architect |
| 3.7 | Mobile responsiveness test | Load landing page on mobile (iPhone 12 width ~390px, tablet ~768px, desktop >1024px). Verify: filters stack vertically on mobile, search bar spans full width, grid adapts (1 col mobile, 2 col tablet, 3 col desktop), no horizontal scroll, touch targets >=44px. | M | frontend-architect |
| 3.8 | Empty state handling | If filters return no results, show "No components match your filters. Reset filters?" with a clear button to reset all filters. Styling consistent with existing empty state on landing. | S | frontend-developer |
| 3.9 | Performance validation | Filtering and view-mode switch must be instant (no lag). Measure with React Profiler: grid re-render should be <16ms for 35 components on mid-range device. Nanostores should not cause unnecessary island re-renders. | M | frontend-architect |

**Quality Gates**:
- Search filters components by name/description in real-time
- Category and status filters toggle correctly
- View mode (grid/list) switches instantly
- Keyboard shortcuts functional (Cmd+K focuses search, Escape clears)
- Accessibility checklist passed (aria-live, focus management, keyboard nav)
- Mobile responsive (no horizontal scroll, touch-friendly)
- Build passes with no new warnings

**Assigned Subagents**: frontend-architect (state design, accessibility, performance), frontend-developer (component implementation, filtering logic)

**Dependencies**: Phase 1 (manifest structure); can run in parallel with Phase 2

---

## Phase 4: Version-Update Detection & Remediation

**Objective**: Build script to detect @miethe/ui version bumps and compare installed exports against manifest. Wire into package.json post-install. Optionally add GitHub Action to comment on PRs with update report.

**Scope**: Create `detect-ui-updates.mjs` script, test it with a version change, document usage, optionally add GitHub Action. Detection should emit report of new/removed/unchanged exports and suggest next steps.

**Key Files Created**:
- `scripts/detect-ui-updates.mjs` (new; Node CLI)
- `.github/workflows/ui-update-check.yml` (new; optional GitHub Action)

### Tasks

| ID | Task | Acceptance Criteria | Est | Owner |
|----|------|-------|-----|-------|
| 4.1 | Build detection script (scripts/detect-ui-updates.mjs) | (a) Load @miethe/ui package.json from node_modules to determine version. (b) Read installed exports (via package.json "exports" field or by inspecting dist folder). (c) Load _manifest.json. (d) Compare installed exports to manifest. (e) Output report: lists new exports, removed exports, unchanged count. (f) Categorize new exports as "needs scaffolding". (g) Runs in <2 seconds. (h) Can be invoked as `node scripts/detect-ui-updates.mjs` or from npm script. | L | general-purpose |
| 4.2 | Wire detection script into package.json post-install hook | Add post-install script to package.json that runs detect-ui-updates.mjs when dependencies are installed. Script should print report to stdout without failing the install (warnings, not errors). Optional: suppress output with `--silent` flag. | M | general-purpose |
| 4.3 | Test detection script with version change scenario | Manually test: (a) bump @miethe/ui version in package.json to hypothetical newer release. (b) Run `npm install` or `node scripts/detect-ui-updates.mjs` directly. (c) Verify report correctly identifies new/removed exports. (d) Revert version change. Document test results in PR. | M | general-purpose |
| 4.4 | Create GitHub Action for PR comments (optional, Phase 4.1) | Action triggered on: PR that modifies package.json and changes @miethe/ui version. Action: (a) runs detect-ui-updates.mjs, (b) parses report, (c) comments on PR with formatted list of new/removed exports and next steps ("Run: node scripts/scaffold-ui-component.mjs ComponentName"). Location: `.github/workflows/ui-update-check.yml`. | L | general-purpose |
| 4.5 | Document detection workflow in guide or AGENTS.md | Add section to `docs/ui-showcase-contributing.md` or AGENTS.md explaining: what detection script does, when it runs, how to interpret report, how to use output to scaffold new components. Example: "When @miethe/ui updates, detect-ui-updates.mjs runs post-install and tells you which components are new. Follow up with: node scripts/scaffold-ui-component.mjs YourComponent". | M | documentation-writer |
| 4.6 | Handle manifest sync edge cases | (a) Manifest gets out of sync with installed exports (e.g., manual edit). Script should suggest regenerating manifest. (b) Component name collision in manifest (duplicate slug). Script should warn. (c) Test: manually corrupt manifest, run script, verify error message is helpful. | M | general-purpose |

**Quality Gates**:
- Detection script runs without errors
- Report accurately lists new/removed/unchanged exports
- Post-install hook executes on dependency install
- GitHub Action (if built) comments on PR with actionable report
- Documentation explains usage and next steps
- Build still passes with post-install hook enabled

**Assigned Subagents**: general-purpose (script implementation, testing, GH Action), documentation-writer (guide updates)

**Dependencies**: Phase 1 (manifest exists); can run in parallel with Phase 2-3

---

## Phase 5: Validation & Documentation

**Objective**: Final end-to-end validation, accessibility audit, performance measurement, documentation updates. Ensure all three pillars work together and no regressions.

**Scope**: Build passes; no new warnings; accessibility checklist complete; performance acceptable; AGENTS.md updated; all quality gates met; ready for rollout.

**Key Files Modified**: `AGENTS.md`, `src/CLAUDE.md` (if needed), documentation updates

### Tasks

| ID | Task | Acceptance Criteria | Est | Owner |
|----|------|-------|-----|-------|
| 5.1 | Full build and type check | Run `npm run build` and `npm run check`. Zero errors. Zero warnings related to v2 additions. Build completes in acceptable time (<120s). | M | general-purpose |
| 5.2 | Accessibility final audit | (a) Run axe DevTools on landing page and 2 component detail pages. (b) Check: keyboard navigation complete (Tab/Shift+Tab, Cmd+K, Escape). (c) Focus rings visible in light/dark. (d) Color contrast WCAG AA minimum (use browser inspector or Contrast plugin). (e) No color-only information. (f) All form inputs have labels. (g) aria-live announcements for dynamic content (filter results). Document findings + fixes. | M | frontend-architect |
| 5.3 | Performance validation | (a) Measure Lighthouse score on /portfolio/ui/ (target: >90 for Performance). (b) Measure filter interaction latency (grid re-render, search keypress, toggle response) with React Profiler (target: <16ms). (c) Measure bundle size increase from v1 (target: <50KB gzipped for v2 features). Document baseline + v2 measurements in PR. | M | frontend-architect |
| 5.4 | End-to-end workflow validation | (a) Scaffold a new component using Phase 1 scaffolder. (b) Verify it appears on landing page and is filterable. (c) Verify detection script identifies it as "documented". (d) Update @miethe/ui version mock (or real if available). (e) Verify detection script reports no new/removed. (f) All pages render without console errors. | L | frontend-developer |
| 5.5 | Update AGENTS.md and src/CLAUDE.md | Add to AGENTS.md: description of UI showcase v2 features, scaffolder workflow (with command examples), detection script, landing page filtering. Link to contributor guide. Add to src/CLAUDE.md: reference to ui-showcase-contributing.md if relevant (optional). Keep sections concise; link to full docs. | M | documentation-writer |
| 5.6 | Final dark mode smoke test | Load landing page and 3 component detail pages in light and dark modes (via theme toggle). Verify: search/filter UI renders correctly in both, status badges have sufficient contrast, code blocks readable, no unstyled content. | S | frontend-developer |
| 5.7 | Quality gates sign-off | Verify all phase quality gates are met: (a) Phase 1 gates (manifest + scaffolder working). (b) Phase 2 gates (5 components populate + build passes). (c) Phase 3 gates (filters functional, keyboard nav works, accessible). (d) Phase 4 gates (detection script accurate). (e) Phase 5 gates (build clean, perf acceptable, a11y audit passed). Document in PR checklist. | M | frontend-architect |
| 5.8 | Deployment checklist | (a) All PRs merged to main. (b) CI passes. (c) GitHub Pages build triggered. (d) Site live: check /portfolio/ui/ loads, filters work, components render. (e) Verify mobile view on production. | S | general-purpose |

**Quality Gates**:
- `npm run build` and `npm run check` pass with zero errors/warnings
- Accessibility checklist 100% complete
- Lighthouse Performance score >=90
- Filter interactions <16ms latency
- End-to-end workflow validated (scaffold -> appear -> filter -> detect)
- Dark mode parity confirmed
- All documentation updated and reviewed

**Assigned Subagents**: general-purpose (build validation), frontend-architect (accessibility, performance), frontend-developer (e2e workflow), documentation-writer (docs updates)

**Dependencies**: Phases 1-4 complete

---

## Task Dependency Graph

```
Phase 1: Manifest & Scaffolder Foundation
  ├─> 1.1-1.5: Manifest, scaffolder script, templates [CRITICAL]
  ├─> 1.6-1.8: Wiring + example
  └─> Gates: manifest valid, scaffolder works, guide testable

     Phase 2: Component Population & Dogfood (depends on Phase 1 gates)
       ├─> 2.1-2.3: Scaffold 5 components, verify rendering
       ├─> 2.4-2.6: Iterate, optional stubs, edge cases
       └─> Gates: build passes, 5 components live, no console errors

     Phase 3: Search, Filters & View Modes (independent, can run parallel to Phase 2 after Phase 1)
       ├─> 3.1: State (Nanostores)
       ├─> 3.2-3.5: Filter components, keyboard shortcuts
       ├─> 3.6-3.9: Accessibility, mobile, perf, empty state
       └─> Gates: search/filter instant, accessible, responsive

     Phase 4: Version-Update Detection (independent, can run parallel to Phase 2-3 after Phase 1)
       ├─> 4.1-4.2: Detection script + post-install hook
       ├─> 4.3-4.6: Testing, GitHub Action, documentation
       └─> Gates: script accurate, hook executes, docs clear

        Phase 5: Validation & Documentation (depends on Phases 1-4 complete)
          ├─> 5.1-5.3: Build, a11y, perf validation
          ├─> 5.4-5.8: E2E workflow, docs, sign-off, deploy
          └─> Gates: all gates met, ready for production
```

---

## Effort Breakdown by Role

| Role | Tasks | Effort | Notes |
|------|-------|--------|-------|
| **Frontend Developer** (`frontend-developer`) | Phases 1.4, 1.7, 2.1-2.4, 2.6, 3.2-3.3, 3.8, 5.4, 5.6 | 15 SP | Scaffolder templates, component content authoring, filter component impl, E2E validation |
| **Frontend Architect** (`frontend-architect`) | Phases 3.1, 3.6-3.7, 3.9, 5.2-5.3, 5.7 | 8 SP | State design, accessibility, performance, final audit |
| **Documentation Expert** (`documentation-expert`) | Phase 1.1 | 2 SP | Manifest schema design |
| **Documentation Writer** (`documentation-writer`) | Phases 1.5, 1.8, 2.4, 4.5, 5.5 | 6 SP | Contributor guide, AGENTS.md updates |
| **General Purpose** (`general-purpose`) | Phases 1.2-1.3, 1.6, 2.5-2.6, 4.1-4.6, 5.1, 5.8 | 12 SP | Manifest population, scaffolder script, detection script, GH Action, build validation |

---

## Rollout Strategy

### Timing

- **Week 1 (Days 1-3): Phase 1 + early Phase 2**
  - Day 1: Define manifest schema, populate with exports, build scaffolder script
  - Day 2: Author templates, contributor guide, validate scaffolder works
  - Day 3: Dogfood with 2-3 components; iterate guide if needed

- **Week 1-2 (Days 4-5): Phase 2 completion + Phase 3 kickoff**
  - Days 4-5: Author 5 components, validate landing page rendering
  - Parallel: Start Phase 3 (Nanostores state, filter component design)

- **Week 2 (Days 6-8): Phase 3 + Phase 4 parallel**
  - Days 6-7: Build UISearchFilter island, integrate into landing, keyboard shortcuts
  - Days 6-8: Build detection script, wire post-install hook, GitHub Action (optional)

- **Week 2-3 (Days 9-10): Phase 5 validation**
  - Day 9: Accessibility audit, performance measurement, end-to-end workflow test
  - Day 10: Final sign-off, documentation updates, deploy

### PRs and Commits

Target 1 PR per task or logical grouping. Example:

1. **PR 1**: Phase 1.1-1.2 (manifest schema + population)
2. **PR 2**: Phase 1.3-1.7 (scaffolder script + templates + guide)
3. **PR 3**: Phase 2.1-2.2 (scaffold 5 components)
4. **PR 4**: Phase 3.1-3.5 (Nanostores + UISearchFilter + keyboard shortcuts)
5. **PR 5**: Phase 3.6-3.9 (accessibility, mobile, perf, empty state)
6. **PR 6**: Phase 4.1-4.2 (detection script + post-install)
7. **PR 7**: Phase 4.3-4.6 (testing, GH Action, docs)
8. **PR 8**: Phase 5 (validation, final docs, sign-off)

Each PR should be reviewable and deployable independently (except dependencies noted in graph above).

---

## Critical Path Note

**Phase 1 is the unlock for the entire project.** The scaffolder and manifest enable all downstream work:
- Phase 2 validates scaffolder works and guide is clear
- Phase 3 depends on manifest structure for filtering
- Phase 4 depends on manifest for detection comparisons

If Phase 1 slips, all downstream phases are blocked. Prioritize tasks 1.1-1.5 as highest priority.

**Second critical lock**: Phase 3 completion (landing page filtering) is required before rolling out stubs for remaining 23 components. Without filtering, landing page becomes too cluttered.

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| **Scaffolder generates invalid MDX/TSX** | Components don't render or build fails | Validate templates with TypeScript + MDX parser before releasing. Test on 2-3 components. Include error-handling in script (file existence checks, validation messages). |
| **Manifest falls out of sync with installed exports** | False positives in detection script | Regenerate manifest from installed exports on each detection run. Document manual correction process. Add consistency check to detection script. |
| **Filter performance degrades with 35+ components** | Landing page jank on large datasets | Use Nanostores (in-memory, no server round-trips). Test with React Profiler before ship. Verify grid re-render <16ms. Lazy-load if needed. |
| **Detection script is hard to maintain** | Script rots; new maintainers confused | Keep logic simple: diff two lists, output JSON. Add unit tests for edge cases (new exports, removals, unchanged). Document internals in code comments. |
| **Contributors skip guide, create inconsistent metadata** | Scaffolded components have messy metadata | Make scaffolder interactive (prompt for category + description). Link to guide in script output. Add build-time validation (e.g., linting frontmatter). |
| **GitHub Action adds noise to PRs** | Team ignores updates | Keep comments concise and actionable. Only comment if new/removed exports found. Provide clear next-step command. Test on real PR before enabling. |
| **Keyboard shortcut conflicts with browser/OS** | Users frustrated, feature feels broken | Use Cmd+K (Mac) and Ctrl+K (Windows/Linux) via cross-platform library. Test on multiple browsers. Provide fallback (e.g., / also works). Document in guide. |
| **Mobile search/filters too cramped** | Filters unusable on small screens | Stack filters vertically on mobile; search spans full width. Test on iPhone 12 (390px) and iPad (768px). Use touch-friendly target sizes (>=44px). |

---

## Success Criteria

All must be true for v2 "complete":

1. **Scaffolder works**: Run `node scripts/scaffold-ui-component.mjs ComponentName` generates valid MDX/TSX/JSON. No console errors on build.
2. **Contributor guide is clear**: Someone unfamiliar with repo can read it and scaffold a component in <5 minutes.
3. **Manifest accurate**: All 35 @miethe/ui exports tracked. Status ("documented" / "stub" / "deprecated") correct.
4. **5 components dogfooded**: Beyond v1 initial 7, 5 more components authored and render on landing + detail pages.
5. **Search + filters instant**: Type in search, toggle categories/statuses, switch view mode. All happen in <50ms. No lag.
6. **Keyboard shortcuts work**: Cmd+K focuses search. Escape clears. Tab navigates filters. All on landing page.
7. **Accessible**: Axe audit passes. Focus rings visible. aria-live announcements work. Keyboard nav complete.
8. **Mobile responsive**: No horizontal scroll. Touch targets >=44px. Filters stack on mobile.
9. **Detection accurate**: Version-bump detection script correctly identifies new/removed exports. Post-install hook runs.
10. **No regressions**: Build passes. No new errors/warnings. Lighthouse Performance >=90. All v1 components still work.
11. **Documentation complete**: AGENTS.md + ui-showcase-contributing.md + inline code comments cover all features.
12. **Production ready**: Deployed to main; site live; all links working; no console errors in production.

---

## Out of Scope (v2.1+)

- Auto-scaffold stubs when new @miethe/ui version detected (manual scaffolding in v2; auto in v2.1)
- Sidebar nav on component detail pages (defer to v2.1; focus on landing filtering in v2)
- Component visual previews in cards (text-only in v2; add images in v2.1)
- Search indexing on code snippets (metadata-only in v2; expand scope in v2.1)
- Prop table generation from TypeScript source (manual JSON in v2; consider react-docgen-typescript in v3)
- Analytics on most-viewed components
- Related-components cross-linking
- Visual regression testing

---

## File Structure (Final State)

```
src/
  content/
    ui/
      file-tree.mdx                (v1)
      diff-viewer.mdx              (v1)
      [7 more v1].mdx              (v1)
      [5 dogfood].mdx              (v2, Phase 2)
      [23 stubs].mdx               (v2, optional Phase 2.5 or Phase 5 follow-up)

  components/
    ui-showcase/
      ComponentDemo.astro          (v1, no changes)
      PropTable.astro              (v1, no changes)
      CodeBlock.astro              (v1, no changes)
      ComponentCard.astro          (v1, no changes)
      UISearchFilter.tsx            (v2, Phase 3, new)
      demos/
        [7 v1 demos].tsx
        [5 dogfood demos].tsx      (v2, Phase 2)
        [23 stub demos].tsx        (v2 optional)

  data/
    ui/
      _manifest.json               (v2, Phase 1, new; all 35 exports)
      [all component props].json   (v1 + v2 dogfood)

  stores/
    ui-filters.ts                  (v2, Phase 3, new)

  pages/
    portfolio/
      ui/
        index.astro               (v1 + v2 enhancements: UISearchFilter)
        [...slug].astro           (v1, no changes)

  layouts/
    ComponentPage.astro           (v1, no changes)

scripts/
  scaffold-ui-component.mjs       (v2, Phase 1, new)
  detect-ui-updates.mjs           (v2, Phase 4, new)
  templates/
    component.mdx                 (v2, Phase 1, new)
    ComponentNameDemo.tsx         (v2, Phase 1, new)
    component.json                (v2, Phase 1, new)

.github/
  workflows/
    ui-update-check.yml           (v2, Phase 4 optional)
    [existing ci.yml, deploy.yml unchanged]

docs/
  ui-showcase-contributing.md     (v2, Phase 1, new)
  [existing specs unchanged]
```

---

## References & Related Docs

- **PRD**: `/Users/miethe/dev/homelab/development/signal_to_system/docs/specs/ui-showcase-v2.md`
- **v1 Implementation**: `/Users/miethe/dev/homelab/development/signal_to_system/docs/specs/ui-showcase-v1-implementation.md`
- **Content Collection Schema**: `src/content.config.ts` (lines 139-177)
- **Landing Page**: `src/pages/portfolio/ui/index.astro`
- **Component Layout**: `src/layouts/ComponentPage.astro`
- **Existing Demos**: `src/components/ui-showcase/demos/*.tsx`
- **Nanostores Docs**: https://github.com/nanostores/nanostores
- **Shadcn.com Reference**: https://ui.shadcn.com/
- **Astro Content Collections**: https://docs.astro.build/en/guides/content-collections/
