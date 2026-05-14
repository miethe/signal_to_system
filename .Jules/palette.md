## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-05-14 - Native Tooltips on Icon-Only Elements
**Learning:** While icon-only buttons often have `aria-label` for screen readers, sighted users navigating with a mouse miss this context. Adding a native `title` attribute provides a built-in browser tooltip that improves usability without redundant screen reader announcements.
**Action:** Always evaluate icon-only buttons to ensure they have both an `aria-label` (for a11y) and a `title` (for mouse hover context).
