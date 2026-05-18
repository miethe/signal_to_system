## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-05-18 - Icon-only buttons: Tooltips and Focus Visibility
**Learning:** Found an app-wide pattern where icon-only interactive elements lacked `title` attributes for desktop tooltips. Also discovered that custom utility classes like `.focus-ring` were being overridden by hardcoded Tailwind classes like `focus-visible:outline-none`, breaking intended focus styles.
**Action:** Always ensure icon-only elements have both `aria-label` (for screen readers) and `title` (for mouse users). Use the established `.focus-ring` utility class consistently across the codebase and avoid combining it with conflicting Tailwind focus classes.
