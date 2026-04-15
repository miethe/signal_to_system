## 2026-04-15 - Missing Skip-to-Content Implementation
**Learning:** Found an existing `.skip-link` accessibility CSS class in `global.css` that was never actually implemented in the HTML. It's common to define a11y styles but forget the corresponding markup.
**Action:** Implemented the skip-to-content link in `BaseLayout.astro` targeting `#main-content` on the `<main>` tag to ensure keyboard users can bypass repetitive navigation headers.
