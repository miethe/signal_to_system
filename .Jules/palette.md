## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.
## 2026-05-08 - Prioritize global accessibility utilities
**Learning:** Found scattered and inconsistent keyboard focus indicators (some missing entirely, some hardcoded via Tailwind utilities like `focus-visible:ring-indigo-500`). Global focus utility classes (like `.focus-ring`) ensure uniform visual feedback and are easier to maintain.
**Action:** Always favor existing global utility classes (`.focus-ring`) over hardcoding styles when verifying keyboard accessibility and focus states across navigation and form elements.
