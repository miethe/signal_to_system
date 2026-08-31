---
type: quick-feature-plan
feature_slug: author-profile
request_log_id: null
status: completed
created: 2026-08-31
completed_at: 2026-08-31T15:44:51-04:00
estimated_scope: medium
---

# Reusable Author Profile

## Scope
Create one canonical, accessible author profile and place it prominently in the homepage hero and alongside hand-authored essays without changing automated Dev Story provenance.

## Affected Files
- `src/data/site.ts`: centralize author identity, avatar, role, bio, and profile links.
- `public/assets/nick-miethe-portrait.webp`: provide an optimized 2× author portrait derivative.
- `src/components/content/AuthorProfile.astro`: add featured, sidebar, and compact profile variants.
- `src/components/ui/Button.astro`: repair the primary action's semantic color-token reference.
- `src/components/global/Footer.astro`: consume the canonical short author bio.
- `src/pages/index.astro`: move the author profile into the hero and remove the old duplicate.
- `src/layouts/PostLayout.astro`: add responsive in-flow and sticky side-rail placements.
- `src/pages/about.astro`: reuse the compact canonical profile at the top of the existing narrative.

## Implementation Steps
1. Discover current site-data, layout, responsive, and accessibility patterns → @author_profile_patterns
2. Implement the canonical author data and reusable component → @author_profile_implementation
3. Integrate homepage, essay, and About placements → @author_profile_implementation
4. Run static gates and local responsive/theme visual QA → @author_profile_implementation

## Testing
- Run Node 22 `npm run check`, `npm run check:prose`, and `npm run build`.
- Run `git diff --check`.
- Inspect homepage and a representative essay at desktop/mobile widths in light and dark themes.

## Completion Criteria
- [x] Implementation complete
- [x] Feature-owned files have no Astro diagnostics
- [x] Prose check passes
- [x] Build succeeds
- [x] Homepage and essay visual QA completed
- [ ] Repository-wide strict Astro check passes

## Gate Notes
- `npm run check` remains red with 2,635 pre-existing repository diagnostics, dominated by the unrelated root-level `Nick Miethe Blog.ts` and existing content-card schema mismatches. The filtered diagnostic log contains no errors for `AuthorProfile.astro`, `PostLayout.astro`, `about.astro`, or `site.ts`; `index.astro` reports only its pre-existing `ProjectCard` visibility mismatch and unused declarations.
- `npm run check:prose`, `npm run build` (66 pages), and `git diff --check` pass under Node 22.23.2.
- The canonical portrait is a 240×263 WebP at 15KB, reduced from the 894KB source PNG while retaining more than 2× intrinsic resolution for its 80px maximum display size.
- Chrome screenshots for homepage and `/essays/the-contract-is-the-work/` at desktop/mobile widths in both light and dark themes, plus focused About checks, are stored in `/private/tmp/s2s-author-profile-qa-corrected/`.
