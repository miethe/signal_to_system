## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2024-05-30 - Explicit Button Types and Focus Visibility
**Learning:** Interactive UI buttons created for custom components often lack explicit `type="button"` attributes. If these components are later embedded inside a `<form>`, clicking them will trigger accidental form submissions. Additionally, applying `aria-hidden="true"` on dot indicator containers hides them from screen readers while keeping them keyboard focusable, violating WCAG.
**Action:** Always verify custom React `<button>` elements have `type="button"` and explicitly add the `.focus-ring` class to ensure keyboard users have visual context. Replace `aria-hidden` on interactive groups with `role="group"`, `aria-label`, and `aria-current`.
