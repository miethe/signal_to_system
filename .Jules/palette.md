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

## 2025-02-23 - ARIA Tab Pattern Implementation and Keyboard Focus Visibility
**Learning:** React state-driven view switchers (like preview vs. info tabs) frequently lack semantic HTML roles. Screen readers cannot infer the relationship between a set of buttons and the views they toggle without the `role="tablist"`, `role="tab"`, and `role="tabpanel"` attributes, nor can they determine the active state without `aria-selected` and `aria-controls`/`aria-labelledby` linkages. Additionally, custom tab button designs often lose native focus indicators, making keyboard navigation difficult to track visually without an explicit focus utility class.
**Action:** When creating or modifying state-driven view switchers, strictly apply the full ARIA tab pattern (`tablist`, `tab`, `tabpanel`, `aria-selected`, `aria-controls`, `aria-labelledby`) and ensure focus states are visible using `.focus-ring` or equivalent utility classes.
