---
title: "@miethe/ui Component Showcase v2 — Scale & Discovery"
description: "Extend v1 with repeatable component-addition workflows, version-triggered remediation, and shadcn-style catalog filtering to scale from 7 to 35+ documented components."
audience: "Nick Miethe, development team"
tags: ["feature", "component-library", "react", "astro", "ui", "automation"]
created: 2026-04-16
status: draft
related_documents:
  - "/Users/miethe/dev/homelab/development/signal_to_system/docs/specs/ui-showcase-v1.md"
  - "/Users/miethe/dev/homelab/development/signal_to_system/docs/specs/ui-showcase-v1-implementation.md"
---

# PRD: @miethe/ui Component Showcase v2 — Scale & Discovery

## Executive Summary

v1 shipped an interactive showcase for 7 of ~35 @miethe/ui components. v2 focuses on scaling component coverage and making discovery effortless. Three pillars: (1) a generator script + contributor guide to scaffold new components in seconds, (2) a system to detect @miethe/ui version bumps and auto-remediate missing/changed components, and (3) shadcn.com-style filtering (search, categories, status) on the showcase landing page. When complete, adding the remaining 28 components becomes a repeatable, low-friction task; package updates surface their own remediation work; and visitors can navigate the catalog efficiently.

## Context & Background

**v1 delivered**: A hand-authored showcase for 7 components, live at `/portfolio/ui/`, with individual component pages, prop tables, and dark mode support. The foundation is solid.

**v1 constraints that v2 addresses**:
- Adding each component requires manual scaffolding (create MDX, demo file, props JSON). 28 components remain because the friction is high.
- When @miethe/ui publishes a new version with new exports, there is no signal to surface the work. Maintainers don't know what changed.
- The landing page is a flat grid. With 35 components, visitors need better filtering: search, category toggle, status filter.

**v2 goals**: Reduce manual friction; surface dependency update work; improve discoverability.

## Problem Statement

1. **Friction in component onboarding**: Adding a component requires thinking about file structure, metadata, demo patterns. Manual repetition is error-prone and slow.
2. **Blind spots on package updates**: When @miethe/ui bumps (new components, breaking changes, deprecations), the showcase does not auto-detect the gap. Maintenance becomes reactive rather than proactive.
3. **Catalog navigation unscaled**: A flat grid works for 7 components; 35 requires filtering. Shadcn.com solved this with search + category pills + status badges. v1's landing lacks these.

## Goals & Non-Goals

### Goals
- Enable adding a new component in under 2 minutes (run scaffolder, fill metadata, write demo).
- Detect @miethe/ui version bumps and surface missing/changed components automatically.
- Give visitors efficient filtering (search, categories, status) on `/portfolio/ui/`.
- Establish a clear, documented contributor workflow for future component additions.

### Non-Goals (v2)
- Automate prop table generation from TypeScript source (deferred; manual JSON is acceptable).
- Replace Storybook or create a parallel docs site.
- Build a component install/CLI tool (that is @miethe/ui's domain).
- Deprecation review or breaking-change impact analysis (manual, post-remediation).
- Full test coverage for generated scaffolds (minimum: build passes).

## Requirements

### Pillar 1: Repeatable Component-Addition Workflow

#### FR 1.1: Component Scaffolder Script
- **Location**: `scripts/scaffold-ui-component.mjs`
- **Invocation**: `node scripts/scaffold-ui-component.mjs ComponentName`
- **Generates**:
  - `src/content/ui/component-name.mdx` with frontmatter (title, slug, category, status, description, since)
  - `src/components/ui-showcase/demos/ComponentNameDemo.tsx` with stub React island
  - `src/data/ui/component-name.json` with empty props array
- **Validation**: Script checks that component name does not already exist; skips if found. Returns clear error messages.
- **Output**: Prints file paths created and next-steps checklist.

#### FR 1.2: Contributor Guide
- **Location**: `docs/ui-showcase-contributing.md`
- **Contents**:
  - Prerequisites (Node 22, pnpm, understanding of React + Astro).
  - End-to-end workflow: list desired components → run scaffolder → fill frontmatter metadata → write demo → populate props JSON → run build → verify.
  - Template code for demo pattern (example: stateful counter demo with props passed in).
  - Frontmatter schema explanation (all fields, valid status values, category enum).
  - Props JSON schema (name, type, default, description, example).
  - Testing/verification checklist (build passes, demo renders, dark mode works, no console errors).
  - Link to existing component pages as reference.

#### FR 1.3: Component Manifest
- **Location**: `src/data/ui/_manifest.json`
- **Schema**:
  ```json
  {
    "lastUpdated": "2026-04-16T00:00:00Z",
    "components": [
      {
        "name": "FileTree",
        "export": "FileTree",
        "status": "documented",
        "since": "0.1.0",
        "slug": "file-tree"
      },
      {
        "name": "NewComponent",
        "export": "NewComponent",
        "status": "stub",
        "since": "0.2.0",
        "slug": "new-component"
      },
      {
        "name": "DeprecatedComponent",
        "export": "DeprecatedComponent",
        "status": "deprecated",
        "since": "0.1.0",
        "slug": "deprecated-component"
      }
    ]
  }
  ```
- **Maintained by**: Detection script (see Pillar 2) updates automatically; scaffolder updates when run.
- **Usage**: Landing page renders status indicators ("documented", "stub", "deprecated") and "coming soon" cards for stubs. Sidebar nav (optional, Pillar 3) uses it to list all components.

### Pillar 2: Version-Update Triggers & Auto-Remediation

#### FR 2.1: Export-Diff Detection
- **Mechanism**: Post-install script or GitHub Action.
- **Logic**:
  1. Read `@miethe/ui` package.json from node_modules to find version.
  2. Load `src/data/ui/_manifest.json` and compare exports to installed exports.
  3. Categorize diffs: new exports, removed exports, no change.
  4. Output report to stdout or file.
- **Recommendation**: Implement as `scripts/detect-ui-updates.mjs`, called from `package.json` post-install script.
- **Script output**: Lists new exports needing scaffolding, removed exports needing deprecation review.

#### FR 2.2: GitHub Action Option (Alternative / Supplement)
- **Trigger**: On PR that updates `package.json` @miethe/ui version.
- **Action**:
  1. Run `scripts/detect-ui-updates.mjs`.
  2. Comment on PR with list of changes and next steps.
  3. Optional: Auto-commit scaffold stubs for new exports (see FR 2.3).
- **Location**: `.github/workflows/ui-update-check.yml`
- **Recommendation**: Add as optional enhancement post-v2.

#### FR 2.3: Auto-Scaffold Stubs (Optional)
- **Feature**: When new exports are detected, automatically run scaffolder and commit stub files.
- **Caveats**: Commit message explains "stub created; please fill demo + props" for manual follow-up.
- **Recommendation**: Scope to v2.1 or later. Start with detection and manual scaffolding in v2.

### Pillar 3: Catalog / All-Components View

#### FR 3.1: Client-Side Search
- **Element**: Text input at top of landing page.
- **Behavior**: Filters component grid in real time by name, description, tag, category.
- **Implementation**: Nanostores atom for search query; grid updates reactively.
- **Keyboard shortcut**: Cmd+K or / focuses search input (on `/portfolio/ui/` landing only).

#### FR 3.2: Category Filter Chips
- **Element**: Toggle-able pill buttons above grid (categories: content-viewer, diff-viewer, editor, display, filters, pickers, bulk-actions, primitives, etc.).
- **Behavior**: Clicking a category toggles it on/off. Grid filters to show only components in selected categories (OR logic if multiple selected).
- **Default**: All categories shown.
- **Implementation**: Nanostores atom for active categories; grid reactive to changes.

#### FR 3.3: Status Filter
- **Element**: Toggle buttons or dropdown: stable, beta, experimental, deprecated, stub.
- **Behavior**: Clicking toggles visibility of components with that status. Default: hide stubs and deprecated.
- **Implementation**: Nanostores atom; grid reactive.

#### FR 3.4: View Modes
- **Grid view** (current): Card layout with title, description, image, status badge.
- **Compact list**: Simple rows, name + category + status + link (inspired by shadcn sidebar).
- **Density toggle**: Switch between views via button or preference.
- **Implementation**: Nanostores atom; conditional rendering of grid vs. list layout.

#### FR 3.5: Persistent Component Navigation (Optional)
- **Feature**: Sidebar on individual component pages listing all components with quick-jump links.
- **Recommendation**: Defer to v2.1 if time-constrained; focus on landing-page filtering first.

#### FR 3.6: Status Badges & "Coming Soon" Cards
- **Badges**: Display "stable", "beta", "experimental", "deprecated", or "coming soon" on component cards.
- **Coming soon cards**: For stubs, show "Coming Soon" overlay instead of a link.
- **Implementation**: Render based on manifest status.

### Non-Functional Requirements

1. **No Performance Regression**: Filtering and view-mode toggles must be instant (Nanostores in-memory state, no server round-trips).
2. **Accessibility**: Search and filter controls keyboard-accessible; focus management preserved.
3. **Mobile Responsiveness**: Filters stack on mobile; grid adapts to screen size.
4. **Build Script Simplicity**: Scaffolder runs in <1 second; detection script in <2 seconds.
5. **Backward Compatibility**: Existing v1 component pages work without changes; new filtering is opt-in on landing.

## UX / UI Notes

### Shadcn.com Patterns to Emulate

1. **Search bar**: Centered at top; Cmd+K affordance visible (small note or icon).
2. **Filter pills**: Horizontal scrollable row of categories; selected pills highlighted.
3. **Status indicators**: Small badges (stable/beta/experimental) top-right of card.
4. **Grid breakpoints**: 1 col mobile, 2 col tablet, 3 col desktop. Cards have equal height.
5. **List view**: Minimal, scannable; component name + category + status in tight rows.
6. **Empty state**: If no components match filters, show "No components match your filters. Reset filters" with a clear button.

### Accessibility

- Search input has proper `<label>` and `aria-describedby`.
- Filter chips use `role="button"` or native `<button>` elements.
- Keyboard: Tab through filters, Enter/Space to toggle, Escape to close any modals.
- Focus management: When search is cleared, focus returns to grid.
- Color + text for status indicators (don't rely on color alone).
- High contrast: Ensure filter pills and badges meet WCAG AA in both light/dark modes.

## Technical Design Notes

### File Layout

```
src/
  content/
    ui/
      file-tree.mdx          (v1, no changes)
      [28 new components].mdx (v2, scaffolded via script)
  components/
    ui-showcase/
      demos/
        FileTreeDemo.tsx     (v1)
        [28 new].tsx         (v2, stubs from scaffolder)
      ComponentDemo.astro    (v1, no changes)
      PropTable.astro        (v1, no changes)
      UISearchFilter.tsx      (v2, new client component for search + filters)
  data/
    ui/
      _manifest.json         (v2, new; tracks all components + status)
      file-tree.json         (v1, no changes)
      [28 new].json          (v2, stubs from scaffolder)
    taxonomy.ts              (existing; category enum to validate scaffolder input)
  pages/
    portfolio/
      ui/
        index.astro          (v1 + v2 enhancements: use UISearchFilter component)
        [slug].astro         (v1, no changes)

scripts/
  scaffold-ui-component.mjs  (v2, new)
  detect-ui-updates.mjs      (v2, new)

docs/
  ui-showcase-contributing.md (v2, new)
```

### Manifest Schema

See FR 1.3 above.

### Scaffolder Implementation Notes

- Validate component name: alphanumeric + hyphens only.
- Use PascalCase for React file names, kebab-case for content file names.
- Frontmatter template includes all required fields; ask user to fill category + description.
- Demo template uses `useCallback` to avoid re-renders; accepts props from parent.
- Props JSON includes common TypeScript types (string, number, boolean, enum, ReactNode, etc.).

### Detection Script Implementation Notes

- Load @miethe/ui package.json version from node_modules.
- Use dynamic import or require to read the package's export list (check `exports` field in package.json or use `readdirSync` on dist folder).
- Compare to _manifest.json.
- Output JSON report with new/removed/unchanged arrays.
- Optionally auto-update "since" field for new exports.

### Nanostores Integration (Pillar 3)

- Create `src/stores/ui-filters.ts` with atoms for: searchQuery, activeCategories, activeStatuses, viewMode.
- UISearchFilter component updates these atoms on user input.
- Landing page grid subscribed to atoms; re-renders on any change.
- No server-side rendering complexity; all filtering is client-side.

## Phased Rollout Preview

### Phase 1: Scaffolder & Contributor Guide (Weeks 1-2)
- Build `scripts/scaffold-ui-component.mjs`.
- Write `docs/ui-showcase-contributing.md` with templates + checklist.
- Create `src/data/ui/_manifest.json` with v1 components.
- Verify scaffolder generates valid files; test one manual component addition.

### Phase 2: Export-Diff Detection (Weeks 2-3)
- Build `scripts/detect-ui-updates.mjs`.
- Wire into `package.json` post-install.
- Test with @miethe/ui version change; verify report accuracy.
- Optional: add GitHub Action to PR comments.

### Phase 3: Catalog Filtering (Weeks 3-4)
- Build `src/stores/ui-filters.ts` and `UISearchFilter.tsx` component.
- Integrate into `/portfolio/ui/` landing.
- Implement search, category pills, status filter, view-mode toggle.
- Test keyboard shortcuts, accessibility, mobile responsiveness.

### Phase 4: Optional Enhancements (Week 5+)
- Auto-scaffold stubs on version bump.
- Sidebar nav on individual component pages.
- Persistent filter preferences (localStorage).

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| **Scaffolder generates invalid MDX** | Components don't render or build fails | Test scaffolder on 2-3 components before rolling out to contributors. Include validation in script (e.g., check file doesn't exist, component name is valid). |
| **Manifest falls out of sync** | Diffs show false positives | Regenerate manifest from installed exports on each detection run. Document manual correction process if needed. |
| **Filter performance on 35 components** | Page jank, slow search | Use Nanostores (in-memory, no re-renders of grid on type). Verify grid re-render < 16ms with React profiler. |
| **Detection script complexity** | Script is hard to maintain | Keep logic simple: diff two lists, output JSON. Add unit tests for edge cases (new exports, removals, unchanged). |
| **Search UI takes up too much space** | Landing page becomes cluttered | Keep search bar minimal; filters collapse on mobile (sidebar drawer). Prioritize grid content. |
| **Contributors skip contributor guide** | Scaffolded components have inconsistent metadata | Make scaffolder interactive (prompt for category, description). Link to guide in script output. |

## Acceptance Criteria

1. **Scaffolder**: Running `node scripts/scaffold-ui-component.mjs Button` creates valid MDX, TSX demo, and JSON props files. Build passes. No console errors.
2. **Contributor Guide**: Guide is clear, step-by-step, and includes full example. Someone unfamiliar with the repo can follow it and add a component in under 5 minutes.
3. **Manifest**: _manifest.json accurately reflects all @miethe/ui exports (documented + stub). Schema is clear.
4. **Detection Script**: `node scripts/detect-ui-updates.mjs` compares manifest to installed exports and reports diffs correctly. Tested with a version change.
5. **Search & Filters**: Typing in search instantly filters grid. Toggling categories/statuses works. View mode switch renders list and grid. All keyboard shortcuts (Cmd+K, Escape) functional.
6. **Dark Mode**: All filter UI renders correctly in light and dark themes. No contrast issues.
7. **Mobile**: Search bar, filter pills, and grid are responsive. No horizontal scroll on mobile.
8. **Build**: `npm run build` and `npm run check` pass. No warnings related to v2 additions.
9. **Documentation**: All three pillar features documented in `docs/ui-showcase-contributing.md` and inline code comments.
10. **Backward Compatibility**: All v1 component pages still work. Existing content is untouched.

## Open Questions

1. **Auto-scaffold on version bump**: Should detection script auto-create stub files and commit them, or just report and let maintainer run scaffolder manually? Recommend manual for now; auto-scaffold in v2.1 once scaffolder is battle-tested.
2. **Sidebar nav on component pages**: Include in v2 or defer to v2.1? Recommend defer; focus filtering on landing first.
3. **Deprecated component visibility**: Should deprecated components be hidden by default or always shown? Recommend hidden by default; user can toggle "Show deprecated".
4. **Component image/preview in cards**: Keep current text-only cards or add visual previews? Recommend text-only for v2; add visuals in v2.1.
5. **Search indexing**: Should search also match component code snippets or just metadata? Recommend metadata-only for v2; expand scope in v2.1.

## Dependencies & Prerequisites

- `@miethe/ui` npm package (published, all versions supported).
- Existing v1 infrastructure (Astro, React, Tailwind, Nanostores, MDX content collection).
- Node.js 22+ and pnpm.
- No new npm dependencies required (use existing Nanostores and React).

## Implementation Plan Reference

Detailed task breakdown and phase sequencing: `/Users/miethe/dev/homelab/development/signal_to_system/docs/specs/ui-showcase-v2-implementation.md` (to be created during planning phase).

## Tracking & Follow-ups

- **v2.1**: Auto-scaffold stubs on @miethe/ui version bump. GitHub Action integration. Sidebar nav on component pages.
- **v2.2**: Component image previews in cards. Search indexing on code snippets. Persistent filter preferences.
- **v2.3**: Analytics on most-viewed components. "Related components" cross-linking. Visual regression testing.
- **v3.0**: Prop table generation from TypeScript source (react-docgen-typescript or similar). Full 35-component documentation.
