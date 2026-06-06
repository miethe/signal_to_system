## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2025-06-06 - Dynamic title attribute for mobile nav
**Learning:** In interactive icon-only buttons (like the mobile hamburger menu), the `aria-label` often toggles state (e.g., "Open navigation menu" to "Close navigation menu"). For sighted users utilizing a pointing device or a keyboard, the `title` attribute must be manually synchronized via JS to maintain parity with the `aria-label` and provide an accurate hover tooltip.
**Action:** When adding state-toggling logic to an icon-only button's `aria-label`, ensure a corresponding `title` update is included in the JavaScript event handler.
