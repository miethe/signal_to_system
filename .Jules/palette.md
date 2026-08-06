## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-05-10 - Standardize Focus States
**Learning:** Hardcoding `focus-visible:ring-2 focus-visible:ring-offset-2` across different components creates inconsistent keyboard navigation experiences and makes it hard to update focus styles globally.
**Action:** Use a single, globally defined utility class (like `.focus-ring`) for all interactive elements to ensure a consistent, accessible keyboard focus indicator across the entire design system.
## 2026-08-06 - Use global classes for stateful link underlining
**Learning:** Hardcoding active text colors on stateful links works but misses visual consistency and semantic clarity (`aria-current`). A centralized underline solution via a custom CSS class ensures semantic active state visualization.
**Action:** Use existing `.nav-underline` styling combined with conditional `aria-current="page"` to handle active link states across desktop and mobile components.
