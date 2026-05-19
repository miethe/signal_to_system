## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.

## 2024-05-19 - Avoid aria-hidden on containers with focusable elements
**Learning:** Adding `aria-hidden="true"` to a container (like dot navigation wrapper) that contains focusable interactive elements (like `<button>`) is an accessibility violation because it hides the elements from screen readers while still allowing keyboard users to tab to them, creating a confusing experience.
**Action:** Always ensure containers for interactive elements use appropriate semantic roles (like `role="group"`) and labels (`aria-label`) instead of being hidden from assistive technologies.
