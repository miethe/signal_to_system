## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.

## 2026-04-17 - Enhancing Icon-Only Buttons with Tooltips and Custom Focus Rings
**Learning:** When adding focus states to custom interactive components that do not naturally receive Tailwind's focus utilities (or when overriding defaults), the global `.focus-ring` class handles complex multi-layered styling. Also, while `aria-label` handles screen readers, adding a standard `title` attribute brings native tooltip functionality for sighted users. In cases where component states change (like a hamburger menu toggling open/closed), the `title` attribute must be updated in JavaScript alongside `aria-label`.
**Action:** Add `title` to icon-only buttons as a standard practice alongside `aria-label`. Sync both attributes in any JavaScript state-toggling handlers. Use the existing `.focus-ring` global utility class for components requiring manual focus state definitions rather than rewriting Tailwind classes.
