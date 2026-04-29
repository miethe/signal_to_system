## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.

## 2026-04-29 - Use centralized .focus-ring for consistent keyboard a11y
**Learning:** Found several components using inconsistent hardcoded Tailwind `focus-visible:` classes or completely missing focus styles (e.g., ThemeToggle, ModeToggle, Navigation, SearchBox). This created an uneven keyboard navigation experience across the header.
**Action:** Always prefer the centralized `.focus-ring` utility class over hardcoding `focus-visible:` classes, and ensure it's applied to all interactive elements to maintain consistent accessibility standards across the app.
