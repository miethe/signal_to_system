## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-04-28 - Focus Management in Modals
**Learning:** When opening a modal, returning the trigger button rather than unmounting it ensures we can easily capture the reference to return keyboard focus back to the button on modal close, fulfilling WCAG 2.4.3 focus order requirements.
**Action:** Use Fragments to keep modal triggers mounted and attach `useRef` to them, optionally using a `setTimeout` in the close callback to safely return focus.
