## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-05-10 - Standardize Focus States
**Learning:** Hardcoding `focus-visible:ring-2 focus-visible:ring-offset-2` across different components creates inconsistent keyboard navigation experiences and makes it hard to update focus styles globally.
**Action:** Use a single, globally defined utility class (like `.focus-ring`) for all interactive elements to ensure a consistent, accessible keyboard focus indicator across the entire design system.

## 2025-03-08 - Active State Navigation
**Learning:** Adding active states to navigation links improves both visual orientation and accessibility. `aria-current="page"` is the standard pattern for screen readers.
**Action:** When updating or reviewing navigation components, always check for active state indicators and `aria-current` attributes. Use `Astro.url.pathname` to reliably determine the active route.
