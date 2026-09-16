# Nick's voice rules — distilled from hand edits

For an EDITOR agent working the Registry Wave rewrite (or any S2S essay). Every rule cites at
least one hunk in `nick-hunks.md`. `inferred` = pattern held on fewer than 3 independent hunks;
treat those as directional, not settled.

## 1. Evidence base

- **Registry Wave, primary source.** Pre-Nick machine draft = commit `06ddd302` (the file
  accidentally committed then reverted at `fc43b88`; confirmed byte-identical to all three
  `docs/blog-work/.../drafts,final` copies added in `90de9d4`, so one machine draft, not several).
  Nick's hand-edited baseline = commit `90de9d4` (12 `{}` notes, all recovered — see `nick-hunks.md`
  §7). Diff: 282 → 289 lines, 3,058 → 3,379 words, 32 lines removed / 39 added, ~20 substantive
  prose hunks + 12 bracket notes.
- **Cross-essay confirmation.** Scanned 30 commits touching `src/content/posts|stories/*.mdx`
  under Nick's git identity; 28 were bot-drafted (Claude/Opus/Fable trailer, or agent content
  under a human-looking commit title — `20d8442` and `f58bd6fa` are both traps of that exact
  shape). Only 2 were genuine hand edits: `bca1cd5f` (*the-contract-is-the-work.mdx*, 23+/6-, 9
  hunks) and `9925c9a` (*the-registry-wave...mdx* itself, a later small pass, 5+/5-, 4 hunks).

## 2. Sentence & cadence rules

- **Split chained sentences into short declaratives.** He breaks a single sentence carrying two
  claims into two sentences, often ending on a fragment. *"The accepted method becomes a
  versioned, discoverable artifact..." → "The point of this stage is not the artifact. It's
  whether the artifact still holds up..."* (`bca1cd5f`). This sits ABOVE the existing voice-writer
  guidance of "long-to-medium sentences with internal pivots" — read that as the default register;
  this is the correction he applies when a sentence starts carrying too much.
- **Colon-elaborate a short claim into a concrete unpacking**, don't leave the claim alone.
  *"These are integration questions, not generation questions." → "...not generation questions:
  whether the planner that wrote a contract like fc-example-041 and the verifier..."* (`bca1cd5f`).
  `inferred` (n=2).
- **Cut the hedge-on-a-hedge.** He removes self-referential qualifiers stacked on an already-hedged
  claim. *"...not something I can honestly claim is finished" → "...not a finished system"*
  (`9925c9a`). Confirmed cross-essay in spirit (`bca1cd5f`'s vulnerability paragraphs hedge once,
  never twice).
- **"Rather," "But," and "Thus" open corrective sentences.** *"They are not. The important point
  is..." → "...because they aren't. Rather, it's that..."*; *"At small scale... → But at enterprise
  scale, they become risk."* (`90de9d4`). This is his most repeated connective move in this essay
  (4+ instances) — treat as load-bearing, not `inferred`.
- **Contractions go up under hand-editing, not down.** *aren't, can't, doesn't, isn't, it's,
  didn't* — added in nearly every hunk that touches a formal sentence. A machine draft that avoids
  contractions in body prose is a tell.
- **Cut exact-word redundancy across adjacent sentences.** *"The enterprise control plane I think
  enterprises will need..." → "The control plane I think enterprises will need..."* (`9925c9a`).
  `inferred` (n=1).
- **Trade a formal-definition register for a direct-address imperative.** *"In SkillMeat's terms,
  an agentic artifact is a reusable, versioned unit such as..." → "Give it a concrete shape for a
  second: a skill, a command..."* (`9925c9a`). `inferred` (n=1).

## 3. Vocabulary rules

- **"Can't be overstated," "we're talking about," "Rather, it's"** replace flatter formal
  equivalents ("that matters," "it is," "they are not") — a move toward spoken-register emphasis.
- **Own systems get named plainly and get a timeline anchor.** *"I started building SkillMeat" →
  "...SkillMeat last year"*; *"I was using AI coding agents heavily" → "It was mid-late 2025, I
  was using..."* He dates things; a machine draft leaves them floating.
  `inferred` on the exact phrasing (n=3, same essay).
- **He widens single-product framing to the AOS breadth** when the machine draft over-indexes on
  one system: his own note flags adding MeatyWiki/ResearchFoundry references alongside SkillMeat.
  Don't let every example be SkillMeat if the essay is making a general claim.
- **Self-deprecating asides and inside jokes are voice, not noise.** *"the desire to be lazy,"*
  *"an inside joke for the Claude 5 model-family users"* — both his additions, both survive into
  the baseline unflagged (i.e., not marked `{}` for removal). `inferred` (n=2).
- **Precision swaps toward his own systems' vocabulary**: *"another chat interface" → "another chat
  surface"* — a word choice that reads as internally consistent with how he refers to model UIs
  elsewhere. `inferred` (n=1).

## 4. Structural instincts (from the 12 `{}` notes)

Each note is a paragraph-sited editorial instruction, not prose — these are his structural
reflexes, verbatim in `nick-hunks.md` §7. Recurring instincts across the 12:

- **Currency-check terminology before publishing** — 3 separate notes ask "have we changed our
  verbiage since this was written" (artifact definition, control-plane phrase, naming generally).
  An editor must diff current AOS doctrine language against the draft, not just polish prose.
- **Convert list-heavy abstraction into a visual** — 2 notes ask for an interactive diagram in
  place of a bullet list or a dense paragraph of examples.
- **Seed forward-links** — 2 notes ask to allude to future posts (evidence/context-fabric
  mechanics; other AOS subsystems) rather than close every thread inside this one essay.
- **Strengthen the close** — the final note (before "My Bet") asks to "spend some good time...
  tying everything together very clearly and succinctly" — the ending is where he wants the most
  editorial effort, not the least.
- **Ground abstractions in his own concrete functionality early** — the very first note asks to
  define "artifact" using SkillMeat's native functionality rather than an abstract definition.

## 5. Hard constraints (existing doctrine, pointer only)

- **Zero em-dashes**, verified by grep, never self-reported — `nick-prose-style-no-em-dashes.md`.
- **Dual register** (exec-readable + technically honest, story carries the piece, no raw
  identifiers in body prose) — `s2s-blog-dual-register.md`.
- **Reads visually/metaphorically, not numerically** — translate numbers into stakes/story, not
  bare figures — `nick-reads-visually-metaphorically-not-numerically.md`.
- Evidence-class labeling (Observed / Externally reported / Proposed synthesis / Measured) and
  inevitability-language avoidance are existing site doctrine (`src/content/CLAUDE.md`,
  `voice-writer` reduction list) — restate, don't reinvent.

## 6. Anti-patterns (what the machine draft did that his hunks reverse)

- States a formal definition ("In X's terms, Y is a Z that...") instead of grounding it in his
  own systems or giving it plainly.
- Leaves a corrective claim flat ("They are not.") instead of landing it with personality
  ("because they aren't. Rather, it's...").
- Treats every example as SkillMeat-only when the claim is general to the AOS.
- Leaves claims un-dated ("I started building X") when a timeline anchor is available and true.
- Stacks a hedge on a hedge instead of cutting to one plain qualifier.
- Repeats the same noun across adjacent sentences ("enterprise... enterprises") instead of cutting
  the second instance.
- Ends a section on the same energy it started with, instead of tightening the close.
- Renders a comparison as a bullet list where a visual would carry more of Nick's own reading
  style (metaphorical/visual, per hard constraint 5).

## 7. Checklist (≤15 yes/no, run before calling a pass done)

1. Any em-dashes anywhere (grep `—`/`–`)? Must be zero.
2. Any sentence carrying two+ claims that could split into two declaratives?
3. Any claim left flat that could land with "Rather," "But," or a fragment?
4. Any hedge stacked on a hedge?
5. Any formal-definition register ("In X's terms...") that could ground in a concrete example?
6. Any un-contracted formal phrasing in body prose (avoid, aren't, doesn't)?
7. Every named system/product: is SkillMeat carrying every example, when the claim is general?
8. Any claim about "when I started X" missing a timeline anchor that's actually known?
9. Any raw identifier (ULID, PR number, field name) sitting in body prose instead of a footnote?
10. Does every number carry a sentence of stakes, not a bare figure?
11. Is the closing section as tight as the opening, or does it trail off?
12. Any exact-word repeat across adjacent sentences that reads as redundant?
13. Any list that would land better as a described visual, per his own editorial notes?
14. Does the piece read to both a non-technical exec and a staff engineer (dual register)?
15. Any self-deprecating aside or specific personal detail cut for "cleaner" prose that should
    have stayed?
