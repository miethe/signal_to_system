## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-05-24 - Syncing ARIA and Title on Interactive Elements
**Learning:** When using inline client-side JavaScript to dynamically update `aria-label` on stateful icon buttons (like the mobile hamburger menu), the `title` attribute must also be updated simultaneously. Sighted desktop users relying on tooltips will otherwise see stale information.
**Action:** Always check existing event listeners in Astro components or React hooks to keep `aria-label` and `title` states synchronized when modifying interactive elements.
