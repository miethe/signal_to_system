## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.

## 2026-06-16 - Syncing Tooltips with ARIA Labels in Astro
**Learning:** In Astro components where state (like 'aria-expanded' or 'aria-label') is managed via inline client-side JavaScript, corresponding accessibility tooltips (like the 'title' attribute on icon-only buttons) must also be explicitly updated within the same event listeners to keep states synchronized for both screen readers and sighted mouse/keyboard users.
**Action:** When adding or updating stateful attributes (e.g., 'aria-label') on interactive elements via vanilla JS, ensure visual counterparts like 'title' are toggled simultaneously.
