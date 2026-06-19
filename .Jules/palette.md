## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-06-19 - Native Tooltips for Icon-Only Buttons
**Learning:** Sighted mouse users lack context for icon-only buttons that only rely on `aria-label`, as ARIA attributes are not natively exposed via tooltips in most browsers.
**Action:** Add a `title` attribute mirroring the `aria-label` for icon-only buttons to provide a native hover tooltip, ensuring both screen reader and mouse users receive the same affordance description.
