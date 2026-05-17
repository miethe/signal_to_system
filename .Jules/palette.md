## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.

## 2024-05-17 - Global Focus Rings Consistency
**Learning:** Global interactive components (like nav menus, search toggles, and footer links) often slip through the cracks of a defined design system, resulting in missing or hardcoded focus states. Relying on default browser focus or scattered utility classes degrades keyboard navigation accessibility.
**Action:** Enforce the use of a centralized canonical utility class (like `.focus-ring` combined with `focus-visible:outline-none`) across all standalone global elements to ensure a cohesive and accessible keyboard navigation experience.
