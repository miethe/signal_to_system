## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-04-18 - Missing interactive state sync and focus indicator on Astro mobile menu toggle
**Learning:** The mobile menu toggle lacked a visible focus indicator (for keyboard navigation), a native hover tooltip (`title`), and failed to reset its `aria-label` (and `title`) state after closing the menu via a link click.
**Action:** Always verify that stateful attributes like `title` and `aria-label` are kept in sync during all client-side DOM updates (especially reset actions like closing menus via link clicks), and ensure all custom interactive elements include the `.focus-ring` class or similar focus states.
