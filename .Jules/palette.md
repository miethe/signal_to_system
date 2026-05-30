## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-05-30 - Pair Title with ARIA Labels for Icon-Only Buttons
**Learning:** When using icon-only buttons with `aria-label` for screen readers, sighted mouse users lack context. Native hover tooltips via the `title` attribute solve this. Additionally, when JavaScript toggles the state of an `aria-label` (e.g., "Open" vs "Close"), the `title` attribute must be kept in sync to prevent conflicting information.
**Action:** Always verify that interactive elements with dynamic `aria-label` attributes also dynamically update their corresponding `title` attributes, or extract the state-toggling logic to ensure both are updated together.
