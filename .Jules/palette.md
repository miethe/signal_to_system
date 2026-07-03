## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.

## 2025-02-14 - Active link and stateful attribute synchronization
**Learning:** When using custom active link styling based on `aria-current="page"`, ensure the path matching accounts for trailing slashes or sub-paths correctly depending on the framework (like Astro.url.pathname). Furthermore, stateful attributes updated via client-side scripts (like `aria-label` for toggling menus) must also have their corresponding `title` attributes synchronized for full accessibility.
**Action:** When adding `title` to icon buttons for desktop tooltips, verify if there is an existing client-side script that toggles the `aria-label` state and make sure the script is updated to toggle the `title` as well.
