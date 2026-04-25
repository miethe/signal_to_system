## 2026-04-17 - Consistent Focus Rings
**Learning:** Hardcoding standard Tailwind focus utilities (like `focus-visible:ring-2 focus-visible:ring-indigo-500`) introduces inconsistency across components. The project has a central `.focus-ring` utility class in `src/styles/global.css` that provides standard `outline: 2px solid var(--accent)` styling for keyboard accessibility.
**Action:** When adding or updating focus states on interactive elements, always use the custom `.focus-ring` utility class instead of manually assembling Tailwind focus primitives.
