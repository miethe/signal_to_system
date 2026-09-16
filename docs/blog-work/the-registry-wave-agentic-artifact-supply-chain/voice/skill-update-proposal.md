# Skill update proposal — voice-writer

**NOT APPLIED.** This is a proposal only, per brief instructions — the front routes skill edits
through the upstream + SkillMeat registration gate, and I do not have standing to merge into a
shared skill from a leg dispatch.

## Which skill, and why

Target: `.claude/skills/voice-writer/SKILL.md` — its "Voice Summary" section already carries the
sentence-level, phrase, and reduction rules this essay's editing pass would draw on; the new
rules in `nick-voice-rules.md` are refinements/additions to that same taxonomy, not a new
category. Adding them there means every future essay draft benefits, not just this one.

**Not proposing changes to:**
- `blog-drafter` — orchestrates the chain and gates on reading the voice spec; it delegates actual
  voice execution to `voice-writer`, so the rule content belongs downstream, not here.
- `humanizer` — its job is corpus-sourced idiosyncrasy *material* insertion (a real story, a real
  detail), not sentence-pattern rules; out of scope for what was distilled here.
- `dev-story-editor` — scoped to Dev Stories' automated-provenance framing, a different content
  type from essays; its existing `references/voice-rules.md` (em-dash + chain-order rules) needs
  no change from this evidence.
- `content-research-writer` — carries no Nick-specific voice doctrine at all (generic stock
  skill); flagging that separately, not proposing to graft essay-editing rules onto it.

## Upstream note

Checked `agentic_meta_dev/docs/ARTIFACT-UPSTREAM-REGISTRY.md` in full (395 lines, two passes):
**no row exists for `blog-drafter`, `humanizer`, or `dev-story-editor`.** All three appear to be
authored directly in `signal_to_system/.claude/skills/`, not deployed from an upstream repo via
SkillMeat. So there is no upstream copy to edit instead of this one — but that absence is itself
a gap worth a separate flag to Nick: the registry's own stated purpose is "find the row, edit the
upstream," and these three per-project content skills aren't covered by it at all. This proposal
edits the repo-local file directly (once approved) rather than inventing an upstream that doesn't
exist.

## Proposed diff (unified, NOT applied)

```diff
--- a/.claude/skills/voice-writer/SKILL.md
+++ b/.claude/skills/voice-writer/SKILL.md
@@ -85,6 +85,10 @@
 - Colons for setup-payoff beats: "In theory: the developer. In practice: the accountability model dissolves fast."
 - Semicolons to connect related thoughts that AI drafts would split into two sentences
 - First-person over impersonal: "Before I diagnose" not "Before diagnosing"
 - Anecdotes with forensic detail: commit hashes, exact file counts, named projects/components, specific dates
+- Split a sentence carrying two claims into two declaratives, often ending on a fragment: "The accepted method becomes a versioned, discoverable artifact..." → "The point of this stage is not the artifact. It's whether the artifact still holds up..." This corrects the long-to-medium default above, not replaces it — split when a sentence starts carrying more than one claim.
+- Elaborate a short, flat claim with a colon instead of leaving it bare: "These are integration questions, not generation questions." → "...not generation questions: whether the planner that wrote a contract like fc-example-041 and the verifier that checks it three weeks later... are looking at the same acceptance criteria."
+- "Rather," "But," and "Thus" open corrective or contrasting sentences, often paired with a contraction: "They are not. The important point is..." → "...because they aren't. Rather, it's that..."
+- Contractions increase under a real editing pass, not decrease (aren't, can't, doesn't, isn't, it's, didn't). Un-contracted formal phrasing throughout body prose is a machine-draft tell.

@@ -90,7 +94,8 @@
 ### Phrase patterns to use naturally (not to force)
 "Of course...", "That said...", "In short...", "The key is...", "I personally...",
 "I generally recommend...", "Rather than...", "While...", "This is because...",
 "Especially if...", "Not equivalent. Better." (fragment-for-emphasis pattern),
-colon-beat constructions, semicolon connectors
+colon-beat constructions, semicolon connectors, "...because they aren't. Rather, it's...",
+"But at [larger] scale...", "That can't be overstated."

@@ -111,6 +116,15 @@
 - The "The answer isn't X. It's Y." template — replace with reasoning chains that show the logic
 - Impersonal constructions where first-person is more natural ("Before diagnosing" → "Before I diagnose")
 - Uniformly polished cadence — every 4-5 paragraphs should include a cadence break (a line that sounds discovered, not assembled)
+- A hedge stacked on a hedge ("not something I can honestly claim is finished") — cut to one plain qualifier ("not a finished system")
+- Exact-word repetition across adjacent sentences ("The enterprise control plane... enterprises will need" → "The control plane... enterprises will need")
+
+### Structural instincts (apply during an editing pass, not first drafting)
+- Currency-check terminology against current system/product naming before calling a pass done — don't just polish prose that uses a term the system has since renamed.
+- Where a section is list-heavy or compares several abstract things, consider whether a described visual (a `Figure`, an interactive component) would carry the comparison better than prose or bullets — Nick reads visually and metaphorically over enumerating.
+- Seed forward-links: an allusion to a future post or an adjacent system, rather than closing every thread inside one essay.
+- The closing section gets more editorial effort than the opening, not less — a thesis that trails off at the end reads as unfinished even when the body is strong.
+- Ground an abstract capability claim in the author's own concrete, native functionality early, before generalizing.
+- Don't let every example in a general claim come from a single product if the claim is meant to generalize across the author's systems.
```

## Caveats for whoever applies this

- Line numbers above are exact against the current `SKILL.md` (read in full before drafting this
  diff); re-check with `grep -n` before applying if the file has moved since.
- The "Structural instincts" subsection is new; it sits between the existing "What to reduce" list
  and "## Common Voice Failure Modes" — verify it doesn't collide with a future edit to that
  boundary.
- Flag to Nick separately: no upstream-registry row exists for any of the four content skills
  checked here (see "Upstream note"). Worth deciding whether they should get one.
