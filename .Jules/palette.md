## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2024-05-03 - Consistent Global Focus Rings
**Learning:** Keyboard focus states across the global navigation (`Navigation.astro`), toggles (`ModeToggle.tsx`, `ThemeToggle.tsx`), and `SearchBox.tsx` were either missing entirely or using hardcoded/inconsistent Tailwind classes (e.g., `focus-visible:ring-2`) instead of relying on the design system.
**Action:** Consistently apply the `.focus-ring` custom utility class (defined in `src/styles/global.css`) to all interactive elements to ensure accessible keyboard navigation and unified visual focus states.
