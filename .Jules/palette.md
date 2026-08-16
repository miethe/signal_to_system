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
## 2025-02-18 - ARIA Tabs and Keyboard Navigation
**Learning:** When using `tabIndex={-1}` on inactive tabs to comply with the ARIA tablist pattern (which expects users to tab into the tablist and then use arrow keys to navigate within it), you MUST implement the `onKeyDown` listeners to actually handle the arrow key navigation. Without this, inactive tabs become completely unreachable to keyboard-only users.
**Action:** When implementing ARIA tabs, if you implement the roving tabindex pattern (`tabIndex={0}` on active, `tabIndex={-1}` on inactive), always pair it with the corresponding arrow key event handlers to ensure full accessibility.
