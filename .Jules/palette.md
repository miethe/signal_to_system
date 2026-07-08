## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-07-08 - Accessible Buttons Tooltips & Focus States
**Learning:** Native `title` attributes on icon-only buttons provide crucial hover text for sighted pointer users. When building toggles with stateful `aria-label`s in JS, the native `title` attribute must also be kept synchronized. Hardcoded Tailwind focus rings can cause inconsistencies; always use the generic `.focus-ring focus-visible:outline-none` utilities.
**Action:** Standardized `.focus-ring` across Nav/Toggle buttons and synchronized stateful `title` attributes in client-side navigation scripts.
