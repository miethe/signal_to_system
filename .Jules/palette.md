## 2026-04-16 - Add Skip-to-Content Link
**Learning:** Found that a `.skip-link` accessibility class was defined in the global CSS, but the corresponding HTML element was missing from the BaseLayout. This highlights that styling setup doesn't automatically mean the structural HTML is in place for accessibility features.
**Action:** Always verify that corresponding structural HTML exists when noticing accessibility-related CSS classes during initial explorations.
