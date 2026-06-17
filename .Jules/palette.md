## 2026-04-17 - Found unused skip-link class
**Learning:** Found an unused skip-link class that was implemented to enhance accessibility but not actually applied.
**Action:** Always check the global styles when considering new classes to add to see if they've already been built but ignored, particularly when performing accessibility checks.

## 2026-06-17 - Added semantic grouping and state to dot indicators
**Learning:** When using visual dot indicators for navigation (like in `DeckViewer.tsx`), simply using `aria-hidden='true'` hides them from screen readers but still keeps them in the tab order if they are buttons. This creates confusion. They need to be grouped with `role='group'` and `aria-label` and given state via `aria-current='step'`.
**Action:** Use `role='group'` and `aria-current` rather than `aria-hidden` for interactive multi-step dot indicators to improve screen reader experience while maintaining correct keyboard navigation.
