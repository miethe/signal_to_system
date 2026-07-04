## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.

## 2024-07-04 - Active States & Stateful Tooltips
**Learning:** For dynamic navigation elements and interactive toggle buttons, adding `aria-current="page"` and synchronizing stateful attributes (like `title` for hover tooltips with `aria-label`) greatly enhances accessibility for screen readers and sighted users. Relying purely on DOM node structure for styling leaves out assistive tech.
**Action:** Always combine semantic `aria-current` with visual cues (like `nav-underline`) and keep interactive button attributes (`title` and `aria-label`) synchronized dynamically in scripts.
