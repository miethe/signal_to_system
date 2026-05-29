## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.

## 2026-05-29 - Syncing title with aria-label on stateful icon-only buttons
**Learning:** When adding `title` tooltips to icon-only buttons whose state and `aria-label` toggle via client-side JavaScript (like hamburger menus), the `title` attribute must also be explicitly updated in the JavaScript event listeners to keep the visual tooltip synchronized with the screen reader label.
**Action:** Always check for attached JavaScript event listeners that toggle `aria-label` or `aria-expanded` when adding `title` attributes to interactive Astro components.
