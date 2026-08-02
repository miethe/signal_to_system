## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-05-10 - Standardize Focus States
**Learning:** Hardcoding `focus-visible:ring-2 focus-visible:ring-offset-2` across different components creates inconsistent keyboard navigation experiences and makes it hard to update focus styles globally.
**Action:** Use a single, globally defined utility class (like `.focus-ring`) for all interactive elements to ensure a consistent, accessible keyboard focus indicator across the entire design system.

## 2024-10-31 - Add `title` to Icon-only Buttons
**Learning:** Icon-only interactive elements (like the mobile hamburger menu, RSS link, or search close button) typically have `aria-label`s for screen readers. However, sighted desktop users who use pointer devices rely on native tooltips to understand these unlabelled icons. Adding a `title` attribute matching the `aria-label` provides this context on hover without changing screen reader behavior.
**Action:** Always mirror the `aria-label` onto the `title` attribute for icon-only buttons/links that are visible on desktop viewports. When stateful icons change their `aria-label` via JavaScript (e.g., "Open menu" vs "Close menu"), update their `title` simultaneously.
