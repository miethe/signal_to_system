## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-07-01 - Syncing stateful accessibility attributes
**Learning:** When using inline client-side JavaScript to manually toggle stateful attributes like `aria-label` (e.g., in Astro components like `Navigation.astro`), developers often forget to mirror these changes to native tooltip attributes like `title`. This leads to desynchronized hover states for sighted mouse users compared to screen reader users.
**Action:** Always verify that JS event listeners are updated to keep both `aria-label` and `title` in sync on interactive elements with dynamic states.
