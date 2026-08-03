## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-05-10 - Standardize Focus States
**Learning:** Hardcoding `focus-visible:ring-2 focus-visible:ring-offset-2` across different components creates inconsistent keyboard navigation experiences and makes it hard to update focus styles globally.
**Action:** Use a single, globally defined utility class (like `.focus-ring`) for all interactive elements to ensure a consistent, accessible keyboard focus indicator across the entire design system.

## 2026-08-03 - Title Sync for Dynamic States
**Learning:** When adding native tooltips via `title` to interactive elements with dynamic states (like open/close toggles), the `title` must be updated in tandem with the `aria-label` via JavaScript to ensure visual hover text remains accurate.
**Action:** Always check the element's associated event listeners when adding or modifying stateful attributes to ensure synchronized client-side updates.
