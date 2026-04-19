## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-04-19 - Use global focus-ring utility instead of custom tailwind
**Learning:** Found inconsistent implementation of keyboard focus states; many interactive global components (like nav links or theme togglers) either lacked focus states completely or used hardcoded Tailwind classes that diverged from the project's global design.
**Action:** Replaced hardcoded classes with the project's standardized `.focus-ring` utility class in global components, ensuring consistent accessible focus styles and preventing design drift in keyboard interaction states.
