## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.

## 2026-06-07 - Synchronizing stateful title attributes with JS
**Learning:** When adding `title` attributes to icon-only buttons for sighted users in Astro components, the attribute needs to be synchronized via client-side JavaScript alongside `aria-label` toggling, otherwise the tooltip and screen reader states become mismatched.
**Action:** Always verify that stateful attributes like `title` are synchronized in the component's JavaScript logic when modifying or adding them.
