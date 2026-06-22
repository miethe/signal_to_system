## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-04-17 - Icon-only buttons need native tooltips
**Learning:** Sighted mouse users cannot see ARIA labels. Icon-only interactive elements must have native hover tooltips via the `title` attribute, in addition to `aria-label` for screen reader users. Also verified that global auxiliary buttons must have proper keyboard focus visibility (using custom `.focus-ring`).
**Action:** Consistently add `title` corresponding to the `aria-label` for icon-only buttons. Apply `.focus-ring` utility to ensure keyboard navigation visibility for all such elements.
