## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-06-28 - Native Tooltips for Icon-only Buttons
**Learning:** Icon-only buttons with `aria-label` are accessible to screen readers, but sighted users (e.g. desktop pointer users) may not know what the icon means. Adding a `title` attribute that mirrors the `aria-label` provides a native hover tooltip, enhancing usability without altering screen reader behavior.
**Action:** Always include a `title` attribute mirroring the `aria-label` on icon-only buttons (like scroll-to-top, navigation toggles, or copy code buttons).
