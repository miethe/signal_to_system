## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-05-10 - Standardize Focus States
**Learning:** Hardcoding `focus-visible:ring-2 focus-visible:ring-offset-2` across different components creates inconsistent keyboard navigation experiences and makes it hard to update focus styles globally.
**Action:** Use a single, globally defined utility class (like `.focus-ring`) for all interactive elements to ensure a consistent, accessible keyboard focus indicator across the entire design system.

## 2024-08-07 - Accessible Multi-step Indicators
**Learning:** Using `aria-hidden="true"` on a container holding interactive elements (like slide indicators) hides them from screen readers but leaves them focusable via keyboard, causing confusion and a WCAG violation. Furthermore, multi-step progress controls need a semantic way to identify the current step.
**Action:** Use `role="group"` and a descriptive `aria-label` on the container instead of hiding it. For the individual indicators, use `aria-current="step"` on the active item rather than just styling it differently.
## 2026-05-18 - Active State for Navigation
**Learning:** Ensure global navigation elements provide robust active state feedback using proper semantic attributes (`aria-current="page"`) so screen readers appropriately announce them.
**Action:** Add active states utilizing `Astro.url.pathname` combined with `aria-current` and CSS classes in `Navigation.astro` for desktop and mobile.
