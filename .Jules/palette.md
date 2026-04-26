## 2024-04-26 - Standardized Focus States

**Learning:** Hardcoded Tailwind focus utilities (`focus-visible:ring-indigo-500`) fragment accessibility consistency and break if theme colors change. The site has a dedicated `.focus-ring` utility in `global.css` that provides a standard, themed outline for all interactive elements.
**Action:** Always prefer the `.focus-ring` utility over hardcoded Tailwind outline classes for keyboard navigation visibility across all interactive components (Astro, React, etc).
