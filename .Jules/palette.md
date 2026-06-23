## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-06-23 - Visual Active Link State with aria-current
**Learning:** Found that applying the `aria-current="page"` attribute automatically hooks into the global `.nav-underline` CSS class for active state styling.
**Action:** Leverage semantic ARIA attributes whenever possible because they often carry dual purpose (accessibility and global CSS targeting), avoiding redundant styling logic.
