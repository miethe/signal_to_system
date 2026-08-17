## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-05-10 - Standardize Focus States
**Learning:** Hardcoding `focus-visible:ring-2 focus-visible:ring-offset-2` across different components creates inconsistent keyboard navigation experiences and makes it hard to update focus styles globally.
**Action:** Use a single, globally defined utility class (like `.focus-ring`) for all interactive elements to ensure a consistent, accessible keyboard focus indicator across the entire design system.

## 2024-08-07 - Accessible Multi-step Indicators
**Learning:** Using `aria-hidden="true"` on a container holding interactive elements (like slide indicators) hides them from screen readers but leaves them focusable via keyboard, causing confusion and a WCAG violation. Furthermore, multi-step progress controls need a semantic way to identify the current step.
**Action:** Use `role="group"` and a descriptive `aria-label` on the container instead of hiding it. For the individual indicators, use `aria-current="step"` on the active item rather than just styling it differently.
## 2026-05-18 - Semantic Active States
**Learning:** Using purely visual active states via background classes (e.g. `bg-muted` on mobile) or visual pseudo-element indicators (e.g. underline on desktop) is insufficient for screen readers. The active state must be represented semantically.
**Action:** Use `aria-current="page"` on links that represent the currently active page in global navigations. Ensure `aria-current` gets dynamically populated based on the current `pathname`.

## 2024-08-17 - Missing Tooltips on Icon-Only Buttons
**Learning:** Icon-only buttons (like modals, search dialogs, nav hamburger toggles) across various interactive components in Astro/React often lack `title` attributes, which are crucial for sighted users' native tooltips even when `aria-label`s are correctly implemented for screen readers.
**Action:** Always verify and enforce the presence of `title` attributes mirroring `aria-label`s for all icon-only buttons to enhance the experience for sighted pointer users.
