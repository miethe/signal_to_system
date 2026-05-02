## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.

## 2025-05-02 - Standardized Keyboard Focus State
**Learning:** Found that key navigational elements (links, social icons, mobile toggles) in the global header and footer were missing clear keyboard focus states, while some utility buttons used hardcoded Tailwind focus classes instead of the design system's `.focus-ring` utility class.
**Action:** Applied `.focus-ring` consistently across all interactive header/footer elements to ensure a highly visible and unified keyboard accessibility experience.
