## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-06-15 - Focus Ring and Title Tooltips
**Learning:** Adding a generic utility focus-ring class isn't sufficient without also remembering that icon-only interactive elements need both `aria-label` for screen readers and `title` for native hover tooltips for sighted users.
**Action:** Always pair `aria-label` with `title` for icon-only buttons for comprehensive accessibility.
