## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.

## 2026-06-26 - Dynamic Active Link Styles and Semantic Accessibility in Navigation
**Learning:** Adding visual distinction to active navigation links requires a combination of semantic state (`aria-current="page"`) and robust visible indicators. Using dynamic classes (like `.nav-underline` and explicitly scoped text colors) ensures the active page is immediately clear, while utility classes like `.focus-ring` must be coupled properly with `focus-visible:outline-none` on both desktop and mobile versions to provide consistent and visible keyboard navigation without conflicts.
**Action:** Always combine `aria-current="page"` with visual indicators (such as explicit color highlights and custom underline classes) and ensure customized keyboard focus rings (.focus-ring) are explicitly paired with `focus-visible:outline-none` when improving component active and focused states.
