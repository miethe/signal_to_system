# dev-story-editor skill: CHANGELOG

One-line-per-change log. Append a dated entry whenever the skill's routing surface, contract docs,
or scripts change.

## 2026-07-30

- v0.1: initial version. SKILL.md (two entry modes: `op story` pipeline seam via
  `$OP_STORY_BLOG_CHAIN_CMD`, and batch/interactive redraft of `src/content/stories` drafts +
  `story/*` PRs); editorial chain (`blog-drafter` → `voice-writer` → `humanizer`, ICA/Sonnet
  delegation for heavy drafting only, synthesis kept in the driving session); enrichment sources
  (local catalog, `op recall`, `itt`, `ccdash report aar`, optional Research Foundry API);
  frontmatter emission + backfill against the `stories` collection schema; no-em-dash voice rule;
  the eight-part output story shape (lede → goal → what happened → Wins → Losses → meta-findings →
  AOS-arc → collapsed raw-AAR appendix). Sibling references (`pipeline-contract.md`,
  `frontmatter-contract.md`, `enrichment-sources.md`, `voice-rules.md`), workflows
  (`single-story.md`, `batch-redraft.md`), and two offline stdlib-only scripts
  (`read_catalog.py`, `emit_frontmatter.py`). Companion canonical doc:
  `docs/dev-stories/frontmatter-contract.md` (this repo), which also documents the op-side
  follow-ups (schema id, target directory, `OP_STORY_BLOG_CHAIN_CMD` wiring, AAR discovery gap)
  needed in `agentic_meta_dev` before Entry Mode A is live end-to-end.
