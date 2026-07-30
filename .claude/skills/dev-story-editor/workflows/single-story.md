# Workflow: Single Story (pipeline-seam run)

Use this when running as `$OP_STORY_BLOG_CHAIN_CMD` (Entry Mode A), or when handed one AAR/pointer
directly and asked for one story out of it.

## 1. Read stdin (or the handed-off input)

Parse the JSON payload per `../references/pipeline-contract.md` §2:
`{pointer, aar, forensic, schema}`. If stdin doesn't parse as that shape, fail loudly (non-zero
exit, message to stderr) rather than guessing; do not print a best-effort draft for malformed
input.

## 2. Enrich

Per `../references/enrichment-sources.md`:

1. Run `../scripts/read_catalog.py` against this repo's `src/content/{posts,stories}` for dedup,
   series continuity, and taxonomy-in-use.
2. Check `forensic.ccdash` (already-fetched markdown, from the payload) before considering a fresh
   `ccdash report aar --feature <id>` call.
3. Check `forensic.git` for a commit-count cross-check.
4. Optionally: `op recall`, `itt` lookup, Research Foundry API read, if the AAR names something
   worth chasing (a run id, an intent id, a persona-worthy subsystem).
5. Note any discrepancies between sources for step 5 (do not silently resolve them).

## 3. Classify

Assign `storyType` (heuristic in `../references/frontmatter-contract.md` §2), and resolve
`projects[]`/`aos`/`aosAreas[]` (§4) against `src/data/taxonomy.ts`. Resolve `tags[]` against
`TAG_REGISTRY`. Drop anything that doesn't resolve; do not coin new slugs.

## 4. Draft

Run the editorial chain in order (`../SKILL.md` "The Editorial Chain"):

1. `/blog-drafter` (or an ICA-delegated equivalent per the chain's delegation guidance) produces
   the eight-part narrative shape from `../SKILL.md` "Output Story Shape": lede, goal, what
   happened, Wins, Losses, meta-findings, AOS-arc, and a placeholder for the appendix.
2. `/voice-writer` calibrates it to Nick Miethe's voice.
3. `/humanizer` runs last, in the driving session, never delegated.

Apply `../references/voice-rules.md` throughout, and run its self-check before moving on.

## 5. Assemble the appendix

Wrap the **exact, untouched** `aar` field from the input in the `<details>` block per
`../references/frontmatter-contract.md` §6. Append it after the AOS-arc section.

## 6. Assemble + validate frontmatter

Build the frontmatter dict per `../references/frontmatter-contract.md` and pass it through
`../scripts/emit_frontmatter.py` (`--input -` reading a JSON dict from stdin, or import the module
and call `build_frontmatter_yaml(...)` directly). Let it raise/fail loudly on missing required keys
or unresolvable enum/taxonomy values rather than emitting something invalid.

## 7. Emit

Print the assembled MDX (frontmatter block + body, from step 6 and steps 4-5) to stdout as the
**only** output, and exit 0. No leading/trailing commentary. See
`../references/pipeline-contract.md` §1 and §3 for the exact transport rules: a stray line before
the opening `---` breaks the op side's frontmatter parse.

## Failure modes

| Situation | What to do |
|---|---|
| Malformed/missing stdin JSON | Non-zero exit, message to stderr, no stdout draft. |
| No dedup-safe way to distinguish from an existing published story | Note it prominently in the PR description this feeds into (Entry Mode A's caller opens the PR, not this workflow); do not silently skip drafting, and do not silently duplicate either. Flag it in the story body itself as a caveat if truly ambiguous. |
| A required numeric (`workflow.tokens`, etc.) isn't sourced from anywhere | Omit the field. Never estimate (`../SKILL.md` Guardrails). |
| `/humanizer` reintroduces an em-dash | Re-run the self-check in `../references/voice-rules.md` and hand-fix before emitting; do not re-run the whole chain from scratch for one character-level issue. |
