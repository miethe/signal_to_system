## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2024-05-09 - Navigation Active States
**Learning:** Adding active states to navigation links via conditional styling (`aria-current="page"` and specific utility classes) is a high-value micro-UX enhancement that requires dynamically extracting the current pathname from the framework router (e.g., `Astro.url.pathname`).
**Action:** Always include accessibility attributes like `aria-current="page"` alongside visual changes for active links. Remember to clean up any temporary Node.js scripts (like `.cjs` files) used for ad-hoc patching before submitting.
