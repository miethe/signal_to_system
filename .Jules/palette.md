## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-05-13 - Add title attribute to icon-only buttons
**Learning:** While 'aria-label' provides crucial context for screen reader users on icon-only buttons, sighted mouse users benefit from the native tooltip provided by the 'title' attribute. Adding both enhances usability and accessibility simultaneously.
**Action:** Always verify that icon-only buttons, such as a scroll-to-top button, have both 'aria-label' and 'title' attributes if a tooltip would clarify their function.
