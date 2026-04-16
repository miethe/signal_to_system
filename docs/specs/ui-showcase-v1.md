---
title: "@miethe/ui Component Showcase"
description: "Embed @miethe/ui into Signal to System as a shadcn.com-style interactive showcase with live demos, prop tables, and code snippets."
audience: "Nick Miethe, development team"
tags: ["feature", "component-library", "react", "astro", "ui"]
created: 2026-04-16
status: draft
related_documents:
  - "/Users/miethe/Documents/Other/PKM/MeatyBrain/Blogs/Blog-Site/astro-ui-showcase-v1.md"
---

# PRD: @miethe/ui Component Showcase

## Executive Summary

Integrate the `@miethe/ui` React component library (~35 components) into the Signal to System Astro blog as an interactive, shadcn.com-style component showcase. Visitors will browse components by category, view live interactive demos with `client:visible` hydration, reference prop tables, and copy ready-to-use code snippets. This positions the library as a production-ready, documented tool and serves as both a portfolio artifact and functional documentation hub.

## Context & Goals

**Why**: `@miethe/ui` exists as a published npm package (extracted from SkillMeat) but lacks public visibility and interactive documentation. A showcase demonstrates production maturity, gives potential users a way to explore the library before importing, and reinforces the site's position as a technical publication (not just essays).

**When**: Now. The design spec is finalized; technical dependencies (React 19, @astrojs/react, Tailwind v4) are already installed.

**Goals**:
- Provide public, discoverable component browser at `/portfolio/ui/`
- Each component page includes: live demo, prop reference, copy-paste-ready code, installation instructions
- Reuse blog's existing design system (Tailwind custom properties, dark mode)
- Lazy-load computationally expensive components (CodeMirror-based editors) via `client:visible`
- Make prop tables the single source of truth (hand-authored in v1, automatable in v0.3.0+)

## Scope

### In Scope

- Install `@miethe/ui` and required Astro integrations (already installed, but verify versions)
- Update Tailwind configuration to include `./node_modules/@miethe/ui/dist/**/*.js` in content glob
- Create content collection schema (`src/content.config.ts` update) for component metadata (title, category, description, status, demos, since)
- Build showcase route structure: `/portfolio/ui/` (index/landing) and `/portfolio/ui/[component-slug]/` (individual component pages)
- Author shared Astro components: `ComponentDemo.astro`, `PropTable.astro`, `CodeBlock.astro` with copy-to-clipboard button, dark/light mode support
- Create initial component showcase entries for 5-7 high-value components (e.g., FileTree, DiffViewer, MarkdownEditor, FrontmatterDisplay, BulkActionBar); remaining ~28 components deferred to follow-up
- Implement category-based landing page with component grid
- Add navigation link from Portfolio page to showcase
- Accessibility pass: keyboard navigation, focus management, color contrast
- Performance validation: verify TTI budget not exceeded; flag CodeMirror bundling weight as non-blocking follow-up

### Out of Scope (v1)

- Editor components using CodeMirror (excessive bundle weight if all are hydrated)
- Visual regression testing infrastructure
- Server-side rendering (SSR) of component demos
- Auto-generation of prop tables from TypeScript `.d.ts` files (manual MDX is acceptable)
- Storybook integration or separate docs site
- Component registry or CLI install tooling (shadcn.com style)
- Full 35-component library population (batch remaining components in follow-up)

## Requirements

### Functional Requirements

1. **Component Index Page** (`/portfolio/ui/`)
   - Display all components organized by category (content-viewer, diff-viewer, editor, display, filters, pickers, bulk-actions, primitives)
   - Category grid layout with component title, short description, link to full page
   - Show component status badge (stable, beta, experimental) and "since version" metadata

2. **Individual Component Pages** (`/portfolio/ui/[slug]/`)
   - Component title, description, status, version introduced
   - Installation code block: `pnpm add @miethe/ui`; optionally show scoped import path
   - Live interactive demo(s): React island with `client:visible` hydration
   - Props table: name, type, default, description (sourced from JSON or frontmatter)
   - Copy-paste-ready usage code block with syntax highlighting
   - Accessibility section (keyboard shortcuts, ARIA labels) for complex components
   - Related components cross-links (deferred if not feasible in v1)

3. **Demo Hydration**
   - React islands use `client:visible` (not `client:load`) to defer hydration until component scrolls into viewport
   - Demos must render identically in light and dark modes
   - Each demo gets a labeled container with description

4. **Portfolio Page Integration**
   - Add feature card or link section on `/portfolio/` pointing to `/portfolio/ui/`
   - Link text: "Component Showcase" or "@miethe/ui Browser"
   - Visually consistent with existing Portfolio layout

### Non-Functional Requirements

1. **Tailwind Content Glob (Critical)**: Update Tailwind configuration to include `./node_modules/@miethe/ui/dist/**/*.js`. Components will render completely unstyled without this. This is the #1 gotcha.

2. **React 19 Compatibility**: Site already uses React 19.2.4; `@miethe/ui` must support React 18+. Verify peer dependency at install time.

3. **CodeMirror Bundle Overhead**: `@miethe/ui` bundles CodeMirror (~200KB uncompressed). Editor-heavy components must use `client:visible` to avoid loading bundle for users who never scroll to demos. Track as follow-up (v0.3.0) to split `@miethe/ui/editor` into optional entry point.

4. **Performance**: Non-editor component pages must achieve TTFB under 200ms, TTI under 1s in dev/preview. Editor component pages lazy-load on scroll. Verify build time increase is under 30% (monitor with `time npm run build`).

5. **Dark Mode Parity**: All demos must render correctly in both light and dark modes. Components inherit from blog's `.dark` class on `<html>`. Verify color contrast (WCAG AA minimum) across all themes.

6. **Accessibility**: Keyboard navigation for interactive demos, ARIA labels on buttons/toggles, focus management. No color-only information conveyance (use text or icons + color). Focus rings visible and sufficient contrast.

7. **Build Compatibility**: Astro 6.0.7, Tailwind CSS 4.1.18, @astrojs/mdx 5.0.2, @astrojs/react 5.0.1 already installed. Verify `npm run build` and `npm run check` pass without errors or warnings.

## Information Architecture

### Route Hierarchy

```
/portfolio/              (existing Portfolio page)
  /ui/                   (showcase index/landing)
    /file-tree/          (example component)
    /diff-viewer/
    /markdown-editor/
    [...35+ more]
```

### Data Sources

- **Component metadata** (title, category, status, since): `src/content/ui/[component].mdx` frontmatter
- **Prop definitions**: `src/data/ui/[component].json` (hand-authored in v1)
- **Shared demo/layout patterns**: `src/components/ui-showcase/ComponentDemo.astro`, `PropTable.astro`, `CodeBlock.astro`
- **Landing page config**: Derived from content collection via `getCollection('ui')`

### Navigation Updates

- Portfolio page: Add card or link section "Component Showcase" → `/portfolio/ui/`
- Consider nav bar integration (optional; can add later)
- Update `public/llms.txt` and `AGENTS.md` if they enumerate top-level site sections

## Success Criteria

1. **Completeness**: Initial v1 launch covers 5-7 high-value components with full demos + prop docs. Remaining components batched in follow-up.
2. **Demo Functionality**: All live demo components render correctly, are interactive, toggle dark/light mode without issues. Copy button works on all demos.
3. **Performance**: Non-editor pages load TTFB <200ms, TTI <1s. Editor component pages lazy-load on scroll without blocking page render.
4. **Accessibility**: WCAG AA compliance on all demos (manual testing); keyboard navigation works; focus states visible.
5. **Build Success**: `npm run build` and `npm run check` pass cleanly. Site builds without errors or warnings related to showcase.
6. **Navigation**: Portfolio page link works end-to-end. All component pages are reachable and route correctly.
7. **Dark Mode**: All demos render identically in light and dark modes. No unstyled content, no broken layouts.

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| **Tailwind class purging** | Components render unstyled if Tailwind globals don't include `@miethe/ui` dist | Add `./node_modules/@miethe/ui/dist/**/*.js` to Tailwind content glob. Test with one component before proceeding. |
| **React version mismatch** | Site incompatibility; hydration errors | Verify `@miethe/ui` supports React 18+ (it does). Add to pre-flight checklist. |
| **CodeMirror bundle bloat** | TTI exceeds budget if all demos hydrate at once | Use `client:visible` for editor demos exclusively. Non-editor demos use `client:idle` or static. |
| **Prop table drift from source** | Docs become incorrect as library evolves | Link to GitHub `API.md` as single source of truth in v1. Automate prop extraction in v0.3.0. |
| **Dark mode incompatibility** | Demos unreadable in one theme | Test both light/dark modes before launch. Verify blog's dark mode class (`.dark`) applies to component root. |
| **Build time regression** | CI/CD pipeline slows; dev experience degrades | Monitor baseline with 1 component, then batch remaining 28. Set budget: final build time increase ≤30%. |
| **Scope creep** | Timeline extends; feature doesn't ship | Keep v1 scope to 5-7 components + infrastructure. Batch remaining as separate issue. |

## Open Questions

1. **Exact component set for v1**: 5-7 examples to showcase or different count? (Suggested: FileTree, DiffViewer, MarkdownEditor, FrontmatterDisplay, BulkActionBar, StatusBadge, Tabs)
2. **URL prefix**: Confirm `/portfolio/ui/` is preferred over `/components/` or `/showcase/`
3. **Search/filtering**: In v1? Deferred to follow-up?
4. **CodeMirror strategy**: Accept the bundle weight for v1, or exclude editor demos until optional entry is available in `@miethe/ui@0.3.0`?

## Dependencies & Prerequisites

- `@miethe/ui` published to npm (already done)
- React 19 (site already uses 19.2.4)
- `@astrojs/react` integration (already installed: 5.0.1)
- `@astrojs/mdx` (already installed: 5.0.2)
- Tailwind CSS 4 (already installed: 4.1.18)
- TypeScript (already installed: 5.9.3)

## Implementation Plan Reference

Detailed task breakdown and phase sequencing: `/Users/miethe/dev/homelab/development/signal_to_system/docs/specs/ui-showcase-v1-implementation.md`

## Tracking & Follow-ups

- **v0.3.0 (non-blocking)**: Split `@miethe/ui/editor` into optional entry point to drop CodeMirror weight when unused. Document as GitHub issue.
- **v1.1 (post-launch)**: Automate prop table generation from `.d.ts` using `react-docgen-typescript` or similar.
- **v1.2 (future)**: Add component search/filter, related components cross-linking, visual regression testing.
