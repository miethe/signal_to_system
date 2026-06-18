## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-06-18 - Adding accessibility to icon-only buttons
**Learning:** When adding `.focus-ring` to non-variant specific interactive elements, it's critical to ensure it does not conflict with existing global CSS variables. Furthermore, stateful icon-only buttons (like mobile hamburger menus) must have their `title` attribute explicitly synchronized with their `aria-label` via JS so the native tooltip accurately reflects the element's current state.
**Action:** When working on navigation or footer icon links, consistently combine `.focus-ring`, `aria-label`, and `title`, updating inline JS toggle states simultaneously.
