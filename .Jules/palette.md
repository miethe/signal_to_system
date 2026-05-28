## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-05-28 - Native Tooltips on Icon-Only Buttons
**Learning:** Sighted desktop users may not understand the function of icon-only buttons even if they are perfectly accessible to screen readers via `aria-label`. The `title` attribute serves as a simple, native tooltip that bridges this gap without requiring complex JS/CSS popovers.
**Action:** Add `title` attributes alongside `aria-label` attributes on global icon-only buttons (like social links and navigation toggles) to improve usability for sighted users while maintaining accessibility.
