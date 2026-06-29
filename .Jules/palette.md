## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2024-05-18 - Avoid aria-hidden on interactive containers
**Learning:** Found interactive elements (slide indicator buttons in DeckViewer) nested inside an `aria-hidden="true"` container. This hides the interactive elements from screen readers while leaving them accessible via keyboard navigation, creating a confusing and non-compliant UX (WCAG violation).
**Action:** When hiding decorative UI elements that contain interactive children, replace `aria-hidden` with a semantic role (e.g., `role="group"`) and an `aria-label`. Use `aria-current="step"` for active state indication instead of just visual cues.
