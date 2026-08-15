## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-05-10 - Standardize Focus States
**Learning:** Hardcoding `focus-visible:ring-2 focus-visible:ring-offset-2` across different components creates inconsistent keyboard navigation experiences and makes it hard to update focus styles globally.
**Action:** Use a single, globally defined utility class (like `.focus-ring`) for all interactive elements to ensure a consistent, accessible keyboard focus indicator across the entire design system.

## 2024-08-07 - Accessible Multi-step Indicators
**Learning:** Using `aria-hidden="true"` on a container holding interactive elements (like slide indicators) hides them from screen readers but leaves them focusable via keyboard, causing confusion and a WCAG violation. Furthermore, multi-step progress controls need a semantic way to identify the current step.
**Action:** Use `role="group"` and a descriptive `aria-label` on the container instead of hiding it. For the individual indicators, use `aria-current="step"` on the active item rather than just styling it differently.
## 2026-08-15 - Interactive Component ARIA and Type Polish
**Learning:** React components acting as tab switches or expanding/collapsing sections need proper ARIA roles (`role="tablist"`, `role="tab"`, `role="tabpanel"`) and state properties (`aria-selected`, `aria-controls`, `aria-expanded`) for screen reader access. Additionally, generic action buttons inside these components should explicitly define `type="button"` to prevent accidental form submission side effects.
**Action:** When building or modifying interactive tab switchers or expand/collapse toggles, strictly enforce ARIA accessibility standards: use `role="tablist"`, `role="tab"`, `aria-selected`, and `aria-controls` for tab elements, and `aria-expanded` for toggling sections.
