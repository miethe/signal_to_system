## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.

## 2026-07-05 - Active Links and Icon Tooltips
**Learning:** Users who rely on sight and a mouse need visual cues (active nav states and tooltips on icon-only buttons) to understand orientation and function, complementing existing screen reader attributes.
**Action:** Always map active pathnames to 'aria-current' and visual highlights in global navigation, and synchronize 'title' attributes with 'aria-label' and JavaScript toggles for icon-only buttons.
