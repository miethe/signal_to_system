---
title: "@miethe/ui Showcase Implementation Plan"
description: "Phase-by-phase task breakdown for embedding @miethe/ui into Signal to System as a shadcn.com-style component showcase."
created: 2026-04-16
status: draft
related: "/Users/miethe/dev/homelab/development/signal_to_system/docs/specs/ui-showcase-v1.md"
---

# Implementation Plan: @miethe/ui Component Showcase (v1)

**Complexity**: Medium (M) | **Track**: Standard  
**Total Effort**: ~20 story points | **Timeline**: 3-4 work days  
**Critical Path**: Phase 1 (Tailwind glob fix) unlocks all downstream phases

## Phase Overview

| Phase | Title | Effort | Dependencies | Status |
|-------|-------|--------|--------------|--------|
| 1 | Foundation (Dependencies & Config) | 3 SP | None | Blocked until executed |
| 2 | Showcase Infrastructure | 4 SP | Phase 1 | Blocked |
| 3 | Demo Hydration & Styling | 3 SP | Phase 2 | Blocked |
| 4 | Component Population (v1 Set) | 7 SP | Phase 3 | Blocked |
| 5 | Portfolio Integration | 2 SP | Phase 4 | Blocked |
| 6 | Validation & Polish | 1 SP | Phase 5 | Blocked |

## Architecture Sequence (Prose)

The showcase uses Astro's Content Collections to define component metadata (title, category, description, status, demos). Each component is authored as an MDX file in `src/content/ui/`. Shared Astro layout components (`ComponentDemo.astro`, `PropTable.astro`, `CodeBlock.astro`) provide consistent styling across all pages. React islands use `client:visible` hydration to defer component mounting until scroll into viewport, preserving static-first performance.

The critical unlock is Phase 1's Tailwind content glob update: without including `./node_modules/@miethe/ui/dist/**/*.js`, Tailwind's purge will strip all component classes and demos render completely unstyled. Phase 2 builds route infrastructure; Phase 3 establishes the reusable demo pattern; Phase 4 populates content; Phase 5 integrates with Portfolio page navigation; Phase 6 validates accessibility and performance.

## Phase 1: Foundation (Dependencies & Config)

**Objective**: Install `@miethe/ui`, verify React/Astro versions, update Tailwind configuration, create content collection schema, scaffold shared components.

| ID | Task | Files | Acceptance | Est |
|----|----|-------|-----------|-----|
| 1.1 | Verify `@miethe/ui` can install and import | `package.json` | `pnpm add @miethe/ui` succeeds; no peer dep conflicts | S |
| 1.2 | Verify React 19 compatibility | `package.json`, package docs | `@miethe/ui` supports React 18+ (check npm page); site uses 19.2.4 | S |
| 1.3 | Update Tailwind content glob for `@miethe/ui` dist | `tailwind.config.mjs` or `src/styles/global.css` | Config includes `./node_modules/@miethe/ui/dist/**/*.js`; verify in `tailwind.config.mjs` or via Tailwind v4 `@source` directive | M |
| 1.4 | Test one `@miethe/ui` component renders with correct styles | Temporary test file (delete after) | Import any component (e.g., Button); verify it renders styled in dev server | M |
| 1.5 | Add `ui` collection to `src/content.config.ts` | `src/content.config.ts` | Schema includes: title, category (enum), description, status, since, demos array; loader uses glob pattern for `src/content/ui/**/*.mdx` | M |
| 1.6 | Scaffold shared Astro components | `src/components/ui-showcase/ComponentDemo.astro`, `PropTable.astro`, `CodeBlock.astro` | Each component exports correct Props interface; demo wrapper renders labeled border; prop table renders array; code block displays syntax-highlighted code + copy button | M |

**Quality Gate**: One `<Button>` from `@miethe/ui` renders in a test page with correct Tailwind classes (background, padding, hover effects). Delete test page before proceeding.

**Assigned Subagent**: `astro-dev` (Astro configuration and scaffolding)

**Dependencies**: None (foundational phase)

---

## Phase 2: Showcase Infrastructure

**Objective**: Create dynamic routes, landing page scaffold, and ComponentPage layout.

| ID | Task | Files | Acceptance | Est |
|----|----|-------|-----------|-----|
| 2.1 | Create dynamic route for individual components | `src/pages/portfolio/ui/[...slug].astro` | Exports `getStaticPaths()` fetching all `ui` collection entries; renders `ComponentPage` layout wrapping `<Content />` from MDX; routes like `/portfolio/ui/file-tree/` work and render placeholder | M |
| 2.2 | Create ComponentPage layout | `src/layouts/ComponentPage.astro` | Wraps MDX content in consistent header (title, category badge, status, since version); passes props for title, category to layout | M |
| 2.3 | Create showcase landing page | `src/pages/portfolio/ui/index.astro` | Fetches all `ui` collection entries; groups by category; renders category sections with grid of component cards (title + description + link); responsive layout | M |
| 2.4 | Scaffold component grid card component (optional) | `src/components/ui-showcase/ComponentCard.astro` | Single component card: title, description, status badge, link to detail page; reusable on landing page | S |

**Quality Gate**: Navigate to `/portfolio/ui/`; see empty grid (no components added yet). Click through to `/portfolio/ui/[placeholder-component]/`; see placeholder content rendered in ComponentPage layout.

**Assigned Subagent**: `astro-dev` (route generation, layout design)

**Dependencies**: Phase 1 (content collection schema)

---

## Phase 3: Demo Hydration & Styling Pattern

**Objective**: Establish reusable demo wrapper pattern, code display, and dark-mode testing.

| ID | Task | Files | Acceptance | Est |
|----|----|-------|-----------|-----|
| 3.1 | Refine ComponentDemo.astro for dark-mode toggle | `src/components/ui-showcase/ComponentDemo.astro` | Demo wrapper applies consistent border, padding, background (inherits from blog's light/dark theme); accepts `children` slot for React island; includes demo label/description | M |
| 3.2 | Implement CodeBlock.astro with copy-to-clipboard | `src/components/ui-showcase/CodeBlock.astro` | Code block renders syntax-highlighted code (use existing blog Shiki or prose styles); copy button copies code to clipboard; button shows feedback (e.g., "Copied!" toast or text change) | M |
| 3.3 | Implement PropTable.astro | `src/components/ui-showcase/PropTable.astro` | Table renders prop name, type, default, description; responsive on mobile; inherits blog's table styles from prose config | S |
| 3.4 | Dark-mode smoke test | Demo page in light and dark modes | Toggle theme in browser dev tools or site theme toggle; verify ComponentDemo, CodeBlock, PropTable render identically in both modes (no unstyled content, contrast sufficient) | M |

**Quality Gate**: One example MDX file (e.g., `src/content/ui/button-example.mdx`) uses `<ComponentDemo>`, `<CodeBlock>`, `<PropTable>` components and renders correctly in both light and dark modes. Delete test file before proceeding.

**Assigned Subagent**: `frontend-architect` (component styling, dark-mode parity)

**Dependencies**: Phase 2 (layout and route scaffolding)

---

## Phase 4: Component Population (v1 Initial Set)

**Objective**: Author MDX content and prop data for 5-7 initial high-value components.

| ID | Task | Files | Acceptance | Est |
|----|----|-------|-----------|-----|
| 4.1 | Author MDX file: FileTree | `src/content/ui/file-tree.mdx` | Frontmatter: title, category (content-viewer), description, status (stable), since (version); body: Overview section, Installation code block, Usage example, Props table reference, Accessibility section | M |
| 4.2 | Author JSON prop data for FileTree | `src/data/ui/file-tree.json` | Prop objects: name, type, default, description for each FileTree prop (e.g., files, onSelect, defaultOpen) | S |
| 4.3 | Author MDX + props for DiffViewer | `src/content/ui/diff-viewer.mdx`, `src/data/ui/diff-viewer.json` | Same structure as FileTree | M |
| 4.4 | Author MDX + props for MarkdownEditor | `src/content/ui/markdown-editor.mdx`, `src/data/ui/markdown-editor.json` | Include `client:visible` demo wrapper to lazy-load CodeMirror-heavy component | M |
| 4.5 | Author MDX + props for FrontmatterDisplay | `src/content/ui/frontmatter-display.mdx`, `src/data/ui/frontmatter-display.json` | Same pattern | M |
| 4.6 | Author MDX + props for BulkActionBar | `src/content/ui/bulk-action-bar.mdx`, `src/data/ui/bulk-action-bar.json` | Same pattern | M |
| 4.7 | Author MDX + props for 2 additional utility components (e.g., StatusBadge, Tabs) | `src/content/ui/[comp-7].mdx`, `.json` | Same pattern; totals 7 components for v1 | M |

**Quality Gate**: All 7 components appear on landing page grid. Individual pages render with live demos + prop tables. All demos are interactive and render correctly in dev.

**Assigned Subagent**: `content-writer` (MDX authoring, technical documentation)

**Dependencies**: Phase 3 (demo pattern established)

---

## Phase 5: Portfolio Integration

**Objective**: Add navigation link from Portfolio page to showcase; update site metadata if needed.

| ID | Task | Files | Acceptance | Est |
|----|----|-------|-----------|-----|
| 5.1 | Add showcase feature card/link to Portfolio page | `src/pages/portfolio.astro` | Add new section or card linking to `/portfolio/ui/` with text "@miethe/ui Component Showcase" or "Component Browser"; include short description; visually consistent with existing portfolio sections | M |
| 5.2 | Update site nav (optional) | `src/components/global/Nav.astro` or similar | If applicable, add link in nav or mega-menu pointing to `/portfolio/ui/`; optional for v1 (can defer) | S |
| 5.3 | Update `public/llms.txt` | `public/llms.txt` | If file enumerates top-level site sections, add entry for component showcase under Portfolio or as standalone section | S |

**Quality Gate**: Portfolio page displays new showcase card/link. Clicking link navigates to `/portfolio/ui/` and renders landing page correctly. Navigation end-to-end working.

**Assigned Subagent**: `frontend-architect` (portfolio page integration)

**Dependencies**: Phase 4 (showcase content exists)

---

## Phase 6: Validation & Polish

**Objective**: Accessibility audit, performance measurement, final build validation.

| ID | Task | Files | Acceptance | Est |
|----|----|-------|-----------|-----|
| 6.1 | Accessibility audit (manual) | All showcase pages | Keyboard navigation: Tab/Shift+Tab traverse all interactive elements; focus rings visible; color contrast WCAG AA minimum (use browser dev tools or axe DevTools); no color-only information | L |
| 6.2 | Performance profiling | `npm run build`, Lighthouse | Measure baseline build time; final build time increase ≤30%. Run Lighthouse on `/portfolio/ui/` index and one component page; TTFB <200ms, TTI <1s (or acceptable given editor component lazy-load) | L |
| 6.3 | Bundle size check (CodeMirror note) | npm bundlesize or similar | Measure final bundle size; if CodeMirror dominates and editor demos are rarely viewed, document as follow-up for v0.3.0 optional entry point | S |
| 6.4 | Final build and type check | `npm run build`, `npm run check` | Zero errors, zero warnings related to showcase. Site builds cleanly. | S |
| 6.5 | Content review and final polish | All showcase pages | Nick reviews copy, tone, accuracy. Verify dark-mode rendering end-to-end. Fix any remaining typos or style issues. | M |

**Quality Gate**: `npm run build` succeeds with zero showcase-related errors. Lighthouse scores acceptable. Accessibility checklist passed. All demos functional.

**Assigned Subagent**: `qa-tester` (accessibility, performance validation)

**Dependencies**: Phase 5 (integration complete)

---

## Critical Path Note

**Phase 1's Tailwind content glob update is the unlock for the entire project.** Without including `./node_modules/@miethe/ui/dist/**/*.js` in the Tailwind content glob, all components will render completely unstyled when hydrated. This is the single most critical risk and must be tested as soon as possible (task 1.4).

If Phase 1 succeeds, Phases 2-6 proceed in parallel or series without further blockers.

---

## Task Dependency Graph (Text Form)

```
Phase 1 (Foundation)
  ├─> 1.3: Tailwind glob update [CRITICAL]
  ├─> 1.4: Test one component renders [VERIFICATION]
  └─> 1.5/1.6: Schema + scaffolding

     Phase 2 (Infrastructure) depends on Phase 1.5/1.6
       ├─> 2.1: Dynamic routes
       ├─> 2.2: Layout
       └─> 2.3: Landing page

          Phase 3 (Hydration) depends on Phase 2
            ├─> 3.1/3.2/3.3: Component patterns
            └─> 3.4: Dark-mode smoke test

               Phase 4 (Content) depends on Phase 3
                 └─> 4.1-4.7: Author 7 components

                    Phase 5 (Integration) depends on Phase 4
                      └─> 5.1-5.3: Portfolio nav + metadata

                         Phase 6 (Validation) depends on Phase 5
                           └─> 6.1-6.5: Audit + polish + build
```

---

## Effort Breakdown by Role

| Role | Tasks | Effort | Notes |
|------|-------|--------|-------|
| **Astro Developer** (`astro-dev` skill) | Phases 1, 2, 3 setup | 10 SP | Config, routes, layouts, component scaffolding |
| **Content Writer** | Phase 4 | 7 SP | MDX authoring + prop data |
| **Frontend Architect** | Phase 3 styling, Phase 5 integration | 4 SP | Dark-mode parity, portfolio nav |
| **QA / Accessibility Lead** | Phase 6 | 1 SP | Validation, performance profiling |

---

## Rollout Strategy

1. **Internal validation (Day 1)**: Run Phase 1 locally; ensure Tailwind glob is correct and one component renders styled.
2. **Infrastructure build (Days 1-2)**: Complete Phases 2-3; have empty showcase with working routes and demo pattern.
3. **Content population (Days 2-3)**: Author 5-7 components in Phase 4.
4. **Integration & polish (Day 3-4)**: Phases 5-6; final validation and merge to main.
5. **Deploy**: Push to GitHub; CI/CD handles GitHub Pages deployment.

---

## Success Checklist

- [ ] Phase 1: Tailwind glob includes `@miethe/ui` dist; test component renders styled
- [ ] Phase 2: `/portfolio/ui/` and `/portfolio/ui/[slug]/` routes work with placeholder content
- [ ] Phase 3: ComponentDemo, CodeBlock, PropTable render correctly in light/dark modes
- [ ] Phase 4: 5-7 components authored with live demos + prop tables
- [ ] Phase 5: Portfolio page links to showcase; navigation end-to-end working
- [ ] Phase 6: `npm run build` succeeds; accessibility checklist passed; Lighthouse scores acceptable
- [ ] Final: Site deployed; all links working in production

---

## Follow-Ups (Out of Scope v1)

- **v0.3.0**: Split `@miethe/ui/editor` into optional entry to drop CodeMirror for non-editor use cases. Track as GitHub issue.
- **v1.1**: Automate prop table generation from `.d.ts` files using `react-docgen-typescript`.
- **v1.2**: Add search/filter to showcase landing page.
- **v1.2**: Batch remaining ~28 components in follow-up phase after v1 validates approach.

---

## References

- **Design Spec**: `/Users/miethe/Documents/Other/PKM/MeatyBrain/Blogs/Blog-Site/astro-ui-showcase-v1.md`
- **PRD**: `/Users/miethe/dev/homelab/development/signal_to_system/docs/specs/ui-showcase-v1.md`
- **@miethe/ui npm**: https://www.npmjs.com/package/@miethe/ui
- **Astro Content Collections**: https://docs.astro.build/en/guides/content-collections/
- **Astro + React Integration**: https://docs.astro.build/en/guides/integrations-guide/react/
- **Tailwind v4 Content Glob**: https://tailwindcss.com/docs/content-configuration
- **Reference Design**: https://ui.shadcn.com/
