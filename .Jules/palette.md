## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2024-05-20 - Global Navigation Accessibility
**Learning:** Tailwind's `focus-visible:outline-none` creates CSS specificity conflicts when trying to apply a custom outline-based `.focus-ring` utility class. Also, `aria-label` alone on icon-only buttons doesn't surface information to sighted desktop users on hover.
**Action:** When standardizing on custom `.focus-ring` classes, remember to explicitly remove inline `focus-visible:outline-none` classes. Always add `title` tooltips parallel to `aria-label` on icon buttons to support mouse users while retaining screen reader capability.
