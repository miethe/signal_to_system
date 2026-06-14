## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-04-18 - Hover states on icon-only buttons\n**Learning:** Icon-only buttons lacking a title attribute do not show a hover tooltip natively for sighted users, causing ambiguity even if an ARIA label exists for screen readers.\n**Action:** Add `title` alongside `aria-label` for all icon-only buttons and ensure JavaScript toggles sync both.
