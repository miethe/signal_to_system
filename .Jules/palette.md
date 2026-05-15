## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.

## 2026-05-15 - Consistent Focus Ring Classes
**Learning:** Found scattered implementations of hardcoded Tailwind focus classes instead of using the custom utility class `focus-ring` defined in `src/styles/global.css`. Hardcoded values lead to inconsistent styling for keyboard accessibility states across components.
**Action:** Replace hardcoded Tailwind focus classes (`focus-visible:ring-2`, `focus-visible:ring-indigo-500`, etc.) with the `focus-ring` utility class to unify keyboard accessibility focus states.
