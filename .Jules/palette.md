## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.

## 2026-04-18 - Missing tooltips and focus indicators on icon-only links
**Learning:** Found several icon-only links and buttons in the navigation and footer missing `title` attributes for tooltips, and relying solely on default browser focus outlines instead of the global `.focus-ring` utility class for keyboard accessibility.
**Action:** Applied the existing `.focus-ring` class and added `title` attributes (syncing via JS for stateful buttons) to enhance keyboard visibility and provide context for sighted desktop users. Always check icon-only elements for both `aria-label` (screen readers) and `title` (sighted mouse users), along with explicit focus visible states.
