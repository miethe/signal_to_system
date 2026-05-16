## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-05-16 - Native Tooltips for Icon Buttons
**Learning:** Sighted desktop users frequently miss the context of icon-only buttons if they rely solely on screen-reader friendly `aria-label` attributes.
**Action:** Always pair `aria-label` with a native `title` attribute on icon-only interactive elements to provide a hover tooltip without duplicating information for assistive tech.
