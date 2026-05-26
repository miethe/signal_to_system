## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.

## 2026-05-26 - Added focus-ring to arbitrary components can be misleading
**Learning:** The focus-ring utility class was safely applied, but if it's misapplied or over-applied to components that have explicit focus styles defined via inline Tailwind classes, it can cause regressions or have no effect due to CSS specificity.
**Action:** When adding focus-ring, verify it doesn't conflict with existing inline focus classes (e.g. `focus-visible:ring-indigo-500`).
