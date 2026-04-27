## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.

## 2026-04-27 - Centralize Focus States
**Learning:** Found multiple instances of hardcoded focus-visible tailwind rings instead of the custom utility class. Standardizing on one utility makes visual keyboard focus styles uniform and easier to maintain.
**Action:** Enforce the usage of the `.focus-ring` utility class across interactive elements rather than manually hardcoding tailwind focus classes.
