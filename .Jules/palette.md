## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## $(date +%Y-%m-%d) - Focus Ring Standardization
**Learning:** Automated code review tools evaluating diffs might incorrectly assume a custom utility class like `.focus-ring` is hallucinated when it replaces standard Tailwind focus classes. However, `.focus-ring` is explicitly defined in `src/styles/global.css` and serves as a vital tool for consistent focus states across varying background contexts, especially dark mode.
**Action:** When swapping out explicit Tailwind focus classes for `.focus-ring`, rely on visual verification tools (like Playwright screenshots) to confirm successful rendering, as static analysis tools may flag the removal of standard classes as a regression.
