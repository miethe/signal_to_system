# Leg brief — cont-backfill (node_01M35CKN9CFNQC1AM7K43PJC42, S2S-017)

Read `_common.md` first. Base commit: `53ca251`. Lane: ICA Sonnet 5 (or gpt-5.6-terra), file-local.

## Goal
Every post and story states its Writing format explicitly, and authors get one MDX template per
format plus a review checklist that runs the eligibility gate.

## Context (already built; do not change these files' logic)
- `src/lib/writing.ts` — the read model. Formats: `essay | field-note | dev-story | guide | companion`.
  Posts: `format` (optional in schema, falls back to `contentType`). Stories: always `dev-story`,
  subtype = `storyType`; provenance from `automated` + `reviewed` (never inferred).
- `src/content.config.ts` — `posts.format` optional enum `essay|field-note|guide|companion`;
  `stories.reviewed` optional boolean.
- Eligibility gate: `src/lib/publication.mjs` (`isPublishable`) and
  `tests/m0/publication-eligibility.test.mjs`.

## Work
1. Posts (`src/content/posts/*.mdx`): add an explicit `format:` line to each, equal to what the
   read model resolves today (`format ?? contentType`). Do not change `contentType`, dates, status,
   or any body text. Result: the /writing page renders identically.
2. Stories (`src/content/stories/*.mdx`): do not add `format`. Leave `reviewed` absent unless a
   story's own frontmatter or body already records a named human review; never set it to true on
   inference. List any story you were unsure about in your report instead of editing it.
3. Add a test `tests/m0/writing-format.test.mjs`: every post has an explicit `format` in the enum;
   every story has `storyType` and a boolean `automated` (frontmatter parse like
   `tests/m0/series-integrity.test.mjs`).
4. Templates: `src/content/_templates/` (underscore dir is outside the glob loaders — verify the
   build ignores it) with one file per format: `essay.mdx`, `field-note.mdx`, `guide.mdx`,
   `companion.mdx`, `dev-story.mdx`. Each has complete, schema-valid frontmatter with
   `status: draft`, placeholder values clearly marked `TODO`, and a short body skeleton
   (headings only). Dev Story template sets `automated: false` and a comment explaining
   `automated` / `reviewed`. Import `Callout` from `components/content/Callout.astro` where used.
5. `docs/authoring/review-checklist.md` (create dir if needed): the pre-publish checklist —
   format set, series id valid (not a title), excerpt, hero image alt, `reviewed` only when a review
   happened, then the commands `npm run test:m0` and `npm run verify` (the eligibility gate).
   Link it from `src/content/CLAUDE.md` in one line.

## Acceptance
- `npm run verify` exits 0; `/writing/` and `/essays/` output unchanged
  (compare `dist/writing/index.html` before/after: identical).
- Templates exist for all 5 formats; `tests/m0/writing-format.test.mjs` passes.
