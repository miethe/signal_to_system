## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-05-10 - Standardize Focus States
**Learning:** Hardcoding `focus-visible:ring-2 focus-visible:ring-offset-2` across different components creates inconsistent keyboard navigation experiences and makes it hard to update focus styles globally.
**Action:** Use a single, globally defined utility class (like `.focus-ring`) for all interactive elements to ensure a consistent, accessible keyboard focus indicator across the entire design system.
## 2026-08-04 - Add semantic active state mapping in navigation
**Learning:** Adding the `aria-current="page"` attribute properly conveys active state context semantically to screen readers. Relying solely on visual CSS styling for active states is an accessibility gap.
**Action:** When adding visual active state indicators (like underlines or bold text) to navigation menus in Astro or React components, always pair it with conditional logic to inject `aria-current="page"` on the currently active route item.
