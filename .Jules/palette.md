## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-05-11 - Unified Keyboard Focus States
**Learning:** Components across the application were using varied, hardcoded Tailwind `focus-visible:` classes, leading to inconsistent keyboard navigation experiences and difficult maintenance.
**Action:** Replaced all hardcoded focus classes in core interactive components (Button, Navigation, Footer, ThemeToggle, SearchBox) with the central `.focus-ring` utility class to ensure consistent, accessible focus indicators everywhere.
