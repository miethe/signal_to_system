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

## 2026-08-21 - Accessible Stretched Links
**Learning:** When using the "stretched link" CSS pattern on cards (e.g., `before:absolute before:inset-0` on a nested `<a>` tag to make the whole card clickable), default browser focus outlines are often obscured, ugly, or hidden, rendering the card inaccessible to keyboard users.
**Action:** Always explicitly bind keyboard focus states (like `focus-visible:outline-none focus-ring`) directly to the stretched link element (`<a>`) wrapping the card content so that the entire card properly shows an accessible focus ring when tabbed into.

## 2025-02-13 - Stretched Link Focus Rings
**Learning:** Standard outline-based focus rings (like custom `.focus-ring`) fail visually when applied to absolute pseudo-elements used for "stretched link" patterns (e.g., `before:inset-0` on an `<a>` inside a relative card container). The outline only wraps the inline text, not the entire click area, causing an accessibility regression if the default outline is suppressed.
**Action:** For stretched link card patterns, apply `focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[var(--accent)]` (or equivalent Tailwind ring classes) to the parent relative container (e.g., `<article>`), while keeping `focus-visible:outline-none` on the inner anchor tag to prevent double focus indicators.
## 2026-08-29 - Added proper ARIA attributes to expand/collapse button in ContextVisualizer\n**Learning:** When building expand/collapse toggles, the toggling element needs `aria-expanded` and `aria-controls`. A unique ID is required on the toggled element to correctly link them.\n**Action:** Use React's `useId()` combined with standard ARIA attributes (`aria-expanded`, `aria-controls`) in interactive React components to maintain accessible toggle state patterns without causing ID collisions across multiple component instances.
## 2023-10-27 - ComponentDemo Tabs Keyboard Navigation
**Learning:** `ComponentDemo.tsx` lacked ARIA tab roles (`tablist`, `tab`, `tabpanel`) and keyboard focus indicators on its toggle buttons. When modifying generic buttons to act as tabs, utilizing `useId()` in React helps avoid duplicate ID conflicts for `aria-controls` when multiple instances of the component exist on a page.
**Action:** Applied standard ARIA attributes and the custom `.focus-ring` utility combined with `focus-visible:outline-none` for a clear, accessible keyboard interaction pattern.
