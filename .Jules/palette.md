## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-04-17 - Missing keyboard focus styles on navigation elements
**Learning:** Found that numerous critical interactive elements in global header and footer components (like logo links, social icons, mobile hamburger menus, theme toggles) lacked visible keyboard focus states. Relying on hardcoded Tailwind focus utilities (`focus-visible:ring-...`) can lead to inconsistencies and omissions across components.
**Action:** Always prefer using a centralized design system utility (like `.focus-ring`) and ensure it is applied uniformly across all `a` and `button` tags to guarantee a consistent and accessible keyboard navigation experience.
