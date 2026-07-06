## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-07-06 - Add native tooltips to icon-only buttons
**Learning:** Screen readers announce `aria-label`, but sighted mouse users often rely on native browser tooltips (`title` attribute) to understand icon-only buttons. The two attributes should ideally be synchronized in state-dependent components.
**Action:** Add `title` attributes mirroring `aria-label` to icon-only interactive elements to bridge the gap between accessibility and general UX.
