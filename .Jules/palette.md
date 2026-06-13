## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2024-05-18 - Keep Title Attributes Synced with Dynamic ARIA Labels
**Learning:** Icon-only buttons with dynamic `aria-label`s (like a hamburger menu toggling open/close) can lose UX sync if native tooltips (`title`) aren't updated alongside them.
**Action:** Always verify that dynamic JavaScript updating `aria-label` also updates the `title` attribute for icon-only buttons so sighted desktop users receive the correct tooltip feedback on state changes.
