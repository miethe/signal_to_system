## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.

## 2026-04-23 - Focus Ring Consistency
**Learning:** Navigation elements and interactive buttons were using disparate hardcoded Tailwind utility classes for their focus states, making the accessibility experience inconsistent. Using a single `.focus-ring` class centralizes control and improves maintainability.
**Action:** Use existing custom utility classes like `.focus-ring` for keyboard accessibility styling rather than repeating lengthy Tailwind classes across different components.
