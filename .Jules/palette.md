## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-06-24 - [Dot Indicator Accessibility]
**Learning:** Hiding focusable interactive elements like dot indicator buttons within an `aria-hidden="true"` container violates WCAG because it hides them from screen readers while remaining keyboard accessible.
**Action:** Use `role="group"` with an `aria-label` on the container instead, and use `aria-current="step"` to semantically indicate the active dot indicator button.
