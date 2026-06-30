## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-06-30 - Synchronizing Semantic and Visual State in Navigation
**Learning:** Using `aria-current="page"` on active navigation links combined with CSS attribute selectors (like `.nav-underline[aria-current="page"]`) effectively couples accessibility with visual design. This prevents visual vs. semantic state divergence and keeps screen reader information perfectly in sync with what sighted users see.
**Action:** Always favor applying state via standard ARIA attributes and styling against them, rather than toggling multiple presentational classes and ARIA attributes separately in logic.
