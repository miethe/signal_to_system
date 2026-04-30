## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.

## 2026-04-30 - Standardized Keyboard Focus States
**Learning:** Found an accessibility issue pattern where keyboard focus states were inconsistently hardcoded or entirely missing on key navigation elements (e.g., logo, menu toggle). Discovered that the design system actually provides a standard reusable `.focus-ring` utility class in global.css for this exact purpose.
**Action:** Always check `src/styles/global.css` for custom utility classes before hardcoding Tailwind outline/ring states. Consistently apply `.focus-ring` to all interactive elements to ensure unified and highly visible keyboard navigation across the app.
