## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2024-05-18 - Improve icon-only button tooltips and focus visibility
**Learning:** For icon-only buttons and links, using an `aria-label` alone hides their purpose from sighted desktop pointer users who rely on hover tooltips. Also, applying generic Tailwind focus outlines can conflict with the custom `focus-ring` utility resulting in inconsistent or invisible focus states for keyboard navigation.
**Action:** Always include a `title` attribute mirroring the `aria-label` on icon-only interactive elements to provide a native hover tooltip. For consistent keyboard accessibility, apply the existing custom utility class `.focus-ring` and explicitly set `focus-visible:outline-none` to avoid Tailwind specificity conflicts.
