## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-05-12 - Applied existing custom focus-ring utility class
**Learning:** Found the custom global class .focus-ring in styles/global.css but it was unused. It enhances keyboard accessibility by providing a standardized, clear visual focus state that uses the CSS variable --accent.
**Action:** Replace hardcoded tailwind focus classes (e.g. `focus-visible:ring-2`) with the custom `.focus-ring` class in global components (e.g., `Navigation.astro`, `SearchBox.tsx`, `ModeToggle.tsx`, `ThemeToggle.tsx`) so that keyboard navigation provides consistent and accessible visual feedback across the site.
