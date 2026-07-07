## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2025-03-09 - Native Tooltips for Icon-Only Buttons
**Learning:** While `aria-label` makes icon-only buttons accessible to screen readers, sighted pointer users (e.g., mouse users on desktop) lack visual context for what these buttons do unless a `title` attribute or custom tooltip is provided.
**Action:** Always add a `title` attribute mirroring the `aria-label` to icon-only interactive elements to provide a native hover tooltip, enhancing usability for desktop users without disrupting screen reader behavior.
