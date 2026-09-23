# Pre-publish review checklist

- [ ] Set the Writing `format` explicitly for a post.
- [ ] If the piece belongs to a series, use its series **id**, not its title.
- [ ] Write an excerpt.
- [ ] Provide hero-image alt text when a hero image is present.
- [ ] Set `reviewed: true` on a Dev Story only when a human review happened; do not infer review.
- [ ] Run `npm run test:m0`.
- [ ] Run `npm run verify` to run the eligibility gate and the full publication checks.
