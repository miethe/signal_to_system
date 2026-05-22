## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.

## 2026-05-22 - Normalize focus states & add icon tooltips
**Learning:** Found components inconsistently applying custom focus ring styling via hardcoded Tailwind classes, and icon-only buttons missing `title` attributes.
**Action:** Replaced hardcoded `focus-visible` classes with the globally available `.focus-ring` utility class to maintain consistent styling. Added `title` attributes to icon-only buttons matching their `aria-label`s to provide native hover tooltips for sighted users.
