# Workflow: Batch Redraft (Entry Mode B)

Use this for a sweep: "redraft the story backlog," "clean up the draft stories," or a periodic
maintenance pass. Produces **one** PR covering every story touched in the run.

## 1. Find candidates

Two sources, combine:

1. `src/content/stories/*.mdx` with `status: draft` in frontmatter. Run
   `../scripts/read_catalog.py` and filter its output for `status == "draft"`. Flag entries that
   are additionally missing a `workflow{}` key or a valid `storyType` (these are almost certainly
   pre-editorialization leftovers: as of this writing,
   `after-action-report-fable-5-one-shot-command-center-build.mdx` is exactly this, still
   `status: draft` and still carrying the old post-schema fields `contentType`/`category` instead
   of the stories schema. This backlog moves as migration work lands elsewhere in the repo, so use
   the heuristic, not a hardcoded filename, to find current candidates).
2. Open PRs on branches matching `story/*`: `gh pr list --head "story/*" --state open --json
   number,headRefName,title`. Each such branch/PR is a pending Entry-Mode-A draft awaiting review;
   redrafting a story already in an open PR means checking out that branch's file, not creating a
   second competing file.

## 2. Triage before touching anything

Not every candidate needs a full redraft. Skip (leave as-is, note in the PR description) anything
that:

- Already reads as a proper narrative (lede, Wins, Losses, AOS-arc) and already has a conformant
  `stories`-schema frontmatter block: nothing to do.
- Is `automated: false` (curated/editorial override): this skill's chain is for automated
  provenance; do not overwrite a human's deliberate hand-edit.

Everything else is a candidate: raw-AAR-dump shape, missing/invalid frontmatter fields, old
post-schema leftovers, or a `storyType` that doesn't match the content per
`../references/frontmatter-contract.md` §2.

## 3. Redraft each candidate

For each: follow `single-story.md` steps 2-6, using the candidate file's **existing frontmatter +
body** as the input in place of a fresh pipeline-seam JSON payload (there is no separate `aar`
field here; the file's current body IS the raw material, and if it still contains an embedded
raw AAR dump, that becomes the appendix content in step 5. If the file has no identifiable raw AAR
text at all, note that in the PR description rather than fabricating an appendix).

Write each redrafted file in place at its existing path under `src/content/stories/` (same slug;
do not rename/move files as part of a redraft unless the title change is substantial enough to
warrant a slug change, in which case treat it as a deliberate decision to call out in the PR body,
not a side effect).

## 4. One branch, one PR

- Create a single branch for the whole batch (e.g. `story/batch-redraft-<date>`), not one branch
  per candidate.
- Commit each redrafted file (one commit per story is fine for reviewability; one branch and one
  PR either way).
- Open **one** PR listing every story touched, with a short per-story note (what changed:
  frontmatter backfill, narrative restructure, both). This is the batching guardrail from
  `../SKILL.md`: "One batched PR per Entry Mode B run, not one PR per story."
- Never merge it yourself. Draft PR only, same as Entry Mode A.

## 5. Report

Summarize, per candidate: what was skipped and why, what was redrafted, and any frontmatter fields
left unresolved (e.g. a `workflow.tokens` value that had no source anywhere) so the human reviewer
knows exactly what to check before approving.
