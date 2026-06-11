## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-05-18 - Missing native tooltips on icon-only buttons
**Learning:** While `aria-label` ensures icon-only buttons are accessible to screen readers, sighted desktop users are left without context on hover. This is particularly problematic for ambiguous icons like hamburgers or social logos. The `title` attribute provides a native, zero-dependency browser tooltip that solves this without interfering with screen reader behavior or requiring custom UI components.
**Action:** Always include a `title` attribute mirroring the `aria-label` on icon-only interactive elements (unless a custom tooltip UI is explicitly required by design).
