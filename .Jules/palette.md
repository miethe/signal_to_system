## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.

## 2026-04-17 - Centralized Keyboard Focus Styles
**Learning:** Found an existing `.focus-ring` utility class in global styles, but many interactive elements (like nav links, theme toggles, search buttons) were missing it or using hardcoded `focus-visible` classes. Using a single centralized class ensures consistent, accessible keyboard navigation states across the entire application while remaining easy to update.
**Action:** Always check and utilize the global `.focus-ring` utility class when adding new interactive elements or performing accessibility checks, rather than hardcoding Tailwind focus classes, to maintain a consistent accessibility experience.
