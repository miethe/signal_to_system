---
title: "Nick's essay voice profile (exemplar-derived)"
updated: 2026-10-02
exemplar: src/content/posts/the-registry-wave-agentic-artifact-supply-chain.mdx
sources:
  - src/content/posts/the-registry-wave-agentic-artifact-supply-chain.mdx            # E
  - docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/voice/nick-voice-rules.md
  - docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/voice/nick-hunks.md  # hunks
  - docs/project_plans/essay-standard/legs/inputs/rw-nick-hand-edits-2026-09-17.diff    # H917
  - docs/project_plans/essay-standard/legs/inputs/rw-hand-edits-to-published-final.diff # FIN
  - docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/editorial/review-2026-09-16.md
  - docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/v2-research-integrated/NARRATIVE-TUNE-AUDIT.md
  - docs/authoring/essay-standard.md   # context only
authority: "Nick's hand edits (hunks, H917 plus side) > exemplar (E) > FIN diff (mixed authorship) > inference"
itt: node_01M3YVPJSFE7MXRHEF28P3N4XQ
---

# Nick's essay voice profile

This is the companion to `essay-standard.md` section 4. The standard says *what shape* an essay
has; this file says *how it sounds*. `nick-voice-rules.md` has higher authority: where this file
and that one disagree, that one wins.

**Citation key.** `E:L57` = exemplar line 57. `H917:L23` = line 23 of the 2026-09-17 hand-edit
diff (minus = machine, plus = Nick). `FIN:L99` = line 99 of the later research-integrated diff
(mixed authorship, weaker). `hunks §4` = a section of `nick-hunks.md` (real hand-edit commits).
`inferred` = fewer than 2 independent instances. Treat these as direction, not rule.

## 1. Register

**Who he writes for.** Two readers: one technical enough to know what a deployed copy is, and one
enterprise leader deciding what to govern. He never writes two versions. He writes one paragraph
that serves both, in this order:

1. **A concrete thing happened** (story first, first person, a real artifact): "so I fixed it at
   the source" (E:L61).
2. **The plain-language stake**, in short words an exec can repeat: "The registry was right. The
   copy the runtime loaded was wrong." (E:L65).
3. **The precise mechanism**, for the engineer, kept to one sentence: "nothing compared the
   deployed bytes to the registered ones" (E:L65).

The exec can stop at step 2 and still have the argument. The engineer reads step 3 and trusts it.
Tables, receipts, and footnotes carry the engineer's depth, so the body prose doesn't have to.

**Stance.** He owns failures in the first person ("is where I lost the thread", E:L166; "my own
tooling kept reporting one of them", E:L293). He states what he wants instead of predicting the
market (see section 3, last paragraph). He's dry and sometimes funny, never breezy.

## 2. Moves

### 2.1 Opening move: incident before idea
The H2 is a two-beat claim. The first paragraph is one short reversal. The incident comes before
any definition.
- "The fix existed. The projects were still wrong." (E:L55)
- "First I had to check the reviewer." (E:L57)
- Nick added a signpost announcing the running example: "To kick this off, let's look at an
  example of a given skill" (H917:L16). The final cut it. `inferred` (n=1): name the thread early.
  A cleaner signpost is fine.

### 2.2 Claim, then a plain question
After the incident lands, he asks the question the essay answers, as its own paragraph. Later
sections reuse the move to reframe.
- "What exactly did the approval attach to?" (E:L67)
- "supported on the operation I just performed?" (E:L301)
- "Thus the enterprise question isn't" / "Rather, the question is" (E:L131, E:L133; hunks §4)

### 2.3 Thesis compression
The thesis fits on one slide-sized line. He uses contrast pairs, negation, or a symbol, and no
adjectives.
- "Trusted artifact ≠ trusted use." (E:L69)
- "Some copies must change. Some differences must survive." (E:L77)
- "an advisory registration is not a gate" (E:L260)

### 2.4 The "harder problem" turn
Once the obvious failure is explained, he calls it the easy half. Then he moves to the case where
the obvious fix is also wrong. This turn is where the essay earns its length.
- "The stale reviewer is the easy half." (E:L75)
- "The harder problem: not every difference should disappear." (E:L79)
- "Even the comparison itself can ask the wrong question." (E:L305)

All the evidence here comes from the exemplar (FIN:L101, L105). No hand edit shows it. Treat it as
a strong pattern, not a hand-edit rule.

### 2.5 Origin and dating
He tells how he got here, with a date and a little self-deprecation. Mechanisms get dates. Those
dates never grow into incident dates or fleet-wide claims.
- "It was mid-late 2025 when I started building" (E:L104; hunks §7b)
- "it started with an annoyance, and the desire to be lazy." (E:L102; hunks §7b)
- "The incident was filed August 5; the check was committed August 6." (E:L353)

### 2.6 Honesty about limits
Every strong claim is followed, in the same paragraph, by what it does *not* establish. He hedges
once, plainly, then stops. "Doesn't establish" and "I can prove" are his working vocabulary.
- "Doesn't establish which bytes the runtime loaded." (E:L124)
- "I can't use those rows to claim autonomous reconciliation." (E:L303)
- "they don't prove a market" (hunks §9); "not a finished system" (hunks §3)

The limit sentence is short and declarative ("This essay reports no measured outcome
improvement.", E:L378). It marks a boundary. It isn't an apology.

### 2.7 Corrective connectives
"Rather," "But," and "Thus" open a corrective sentence. ", but" and ", not" turn a sentence partway
through. This is the connective habit he repeats most (`nick-voice-rules.md` section 2 calls it
load-bearing).
- "But at enterprise scale, they become risk." (hunks §4)
- "But none proves that every remaining instruction is correct." (E:L299)
- "Four responsibilities, not four products" (E:L256)

### 2.8 Colons, semicolons, parentheticals
- **Colon** unpacks a short claim into the concrete thing: "would solve a different problem:
  ensuring nobody uses the system." (E:L209).
- **Semicolon** balances a claim against its limit: "Freezing both makes the inputs inspectable;
  it doesn't freeze the model's reasoning." (E:L156).
- **Parenthetical** carries an aside in his speaking voice, or names the concrete object: "Like
  most good (engineering) stories" (E:L102); "the reviewer (obviously) had the new instruction"
  (E:L61). Nick added a naming parenthetical by hand at H917:L31.

### 2.9 Contractions
Body prose uses contractions. A grep of the exemplar body finds about 59 contractions and about
17 uncontracted forms. His hand edits push the same way: "it is a capability bundle" became "it's
a capability bundle" (H917:L75-76; hunks §5). Uncontracted "is not" appears only inside deliberate
maxims ("is not a gate", E:L260), as item 6 of the editorial review notes.

### 2.10 One-line paragraphs as beats
A single sentence stands alone, about once per H2. It either lands a reversal or opens a section
with a fair concession before the turn.
- "Same skill name, but different instructions reaching the runtime." (E:L63)
- "A registry solves important problems." (E:L110)
- "The registry wave is real, and it isn't evenly distributed." (E:L223)

### 2.11 PullQuote selection
He pulls a sentence that already does argument work in the body, never decoration. Each pulled
line is a contrast or negation that still makes sense out of context. There is one thesis-marker,
then 2-3 more.
- "Copy and paste is fine for discovery, but it will never be a lifecycle." (E:L106; it was a
  plain body paragraph at H917:L47 and was promoted later)
- "The goal is not one approved copy everywhere." (E:L100)

### 2.12 The close
The close is short. It returns to the opening object and says plainly what it needed, one sentence
per need. It adds the harder-problem need, then sets one first-person bar.
- "The reviewer didn't need a better name or another catalog." (E:L408)
- "It also needed room for a project-specific improvement to survive" (E:L408)
- "when I'm no longer watching every project myself." (E:L408)

Nick wants the most editorial effort here: "ensuring we tie everything together very clearly and
succintly" (hunks §11, note 12, sic).

### 2.13 Personality beats
One self-deprecating aside or inside joke per essay is part of the voice, not noise. "the desire
to be lazy" (E:L102) survived. "That distinction is loadbearing (an inside joke for the Claude 5
model-family users)." (H917:L30) was his, and the final cut it (FIN:L87-91; flagged in review item
15). Dry fragments also count: "Production-shaped output, unresolved producer." (E:L303).

## 3. Edits he makes to machine prose

These pairs come from H917 (minus -> plus) and hunks (machine commit -> Nick's commit). They are
the strongest evidence in this file.

| Machine | Nick | Where |
|---|---|---|
| "Same skill name. Different instructions reaching the runtime." | "Same skill name, but different instructions reaching the runtime." | H917:L22-23 |
| "The use was wrong." | "My usage was wrong." | H917:L25-26 |
| "The hard part was not getting an agent to do something useful once." | "Having an agent do something useful once was no longer a challenge." | H917:L44-45 |
| "it was fragile. When another project needed it" | "it was fragile, and when another project needed it" | H917:L44-45 |
| "Fixing that closes one gap. But a correctly deployed reviewer" | "Fixing that closes one gap, but a correctly deployed reviewer" | H917:L66-67 |
| "No hand copy. No symlink as a shortcut around the record." | "No manual copy/paste, no symlink as a shortcut around the record." | H917:L94-95 |
| (nothing) | "Not to even mention if we have multiple worktrees" | H917:L95 |
| "Two real entries, redacted:" | "See below two real entries, redacted:" | H917:L119-122 |
| "it is a capability bundle" | "it's a capability bundle" | H917:L75-76 |
| "They are not." | "because they aren't. Rather, it's that" | hunks §4 |
| "That matters." | "That can't be overstated." | hunks §7b |
| "In SkillMeat's terms, an **agentic artifact** is" | "Give it a concrete shape for a second" | hunks §7 |
| "not something I can honestly claim is finished" | "not a finished system" | hunks §3 |
| "My starting point was not a category name." | "I didn't begin this journey by defining a new category." | hunks §7b |
| "The enterprise control plane I think enterprises will need" | "The control plane I think enterprises will need" | hunks §6 |
| "I started building SkillMeat" | "I started building SkillMeat last year" | hunks §7b |

**Patterns in those edits.**
- **He joins staccato pairs** (4 instances in H917). Two clipped machine fragments become one
  sentence joined with ", but" or ", and". This sits beside the split rule in
  `nick-voice-rules.md` section 2, where he splits a sentence that carries too much. Both edits
  aim at the same target: a medium sentence with one turn. Clipped fragment pairs and two-claim
  run-ons are both wrong.
- **He adds the lived complication** the machine left out (the worktree aside, H917:L95). The final
  rewrote it as "Multiple git worktrees make this worse" (FIN:L224). Keep the content and tidy the
  wording if needed. Don't delete the observation.
- **He puts himself in the sentence** ("My usage was wrong.", H917:L26). The final changed it for
  precision (FIN:L82-83). The editor should keep both: the first-person ownership and the exact
  object.
- **He names the concrete object** inline (the `task-completion-validator` parenthetical,
  H917:L31) and wraps his own systems in `<Term>` on first use (H917:L159, L194, L197).
- **He breaks one-line metadata into scannable lines** (H917:L50-58). `inferred` (n=1).

**Weaker evidence (FIN, mixed authorship).** "The winning metric will be accepted outcomes with
evidence, not activity." became "I want to measure accepted outcomes with evidence." (FIN:L392,
L381). The prediction becomes first-person intent. This matches E:L307 ("I want a deployment
record with a destination"), so there are 2 instances. Neither is confirmed as Nick's own edit.

## 4. Never

These are patterns he removes, or patterns that read as machine-written next to this exemplar:

- **Em dashes.** The exemplar has none (grep). Use a colon, semicolon, comma, or parenthesis.
- **Generic transitions and stock phrases**: "Moreover", "Furthermore", "Additionally", "In
  today's", "delve", "it's worth noting", "not only... but also". The first six have zero hits in
  the exemplar; the list follows `essay-standard.md` V3.
- **Hedges on hedges**: "not something I can honestly claim is finished" (hunks §3). Use one
  qualifier, then the claim.
- **Abstraction-first openings and "X is any Y that..." definitions** (hunks §7; review
  2026-09-16 item 5). Ground the term in a concrete thing first.
- **Listicle cadence**: bulleted receipts and bullet-list comparisons. The final replaced a bullet
  receipt rail with ClaimBadge paragraphs (FIN:L476-479). His own notes ask for visuals instead of
  lists (hunks §11, notes 5 and 7).
- **Staccato fragment pairs** that are rhythm for its own sake (section 3).
- **Flat correctives** ("They are not.") with no "Rather," or "But," to land them (hunks §4).
- **Inevitability and prediction** ("The winning metric will be...", FIN:L392), and novelty claims
  ("coined", "first to"; review G22, G24).
- **Exact-word repeats** across adjacent clauses ("enterprise... enterprises", hunks §6).
- **Raw identifiers** (tracker ids, SHAs, PR numbers) in body prose. Also inline evidence tags like
  "**[Observed]**" in prose where a component can carry the class (FIN:L77-78). The tag rule is
  `inferred` (n=1, FIN only).
- **Uncontracted formal body prose** outside a deliberate maxim (section 2.9).

## 5. Editor's audit (run per section)

Answer yes or no. Any "no" on 1-6 means revise. Any "no" on 7-12 is a flag for the lead.

1. Does the section open on a concrete thing (an artifact, an incident, a receipt) before any
   abstraction or definition?
2. Can an exec stop after the first two sentences and repeat the point, while the engineer gets
   the exact mechanism within the paragraph?
3. Is every strong claim followed closely by what it does not establish, hedged exactly once?
4. Does at least one corrective land with "Rather," "But," "Thus," or a ", not" turn instead of
   a flat negation?
5. Are sentences medium-length with one turn, with no clipped fragment pairs and no two-claim
   run-ons?
6. Is body prose contracted, with uncontracted forms only inside deliberate maxims?
7. Is there one standalone beat (a one-line paragraph or a question), and does it earn its line?
8. Is the first person present where the work or the failure is his, with the object named
   exactly?
9. Are dates attached to mechanisms and the origin, without becoming incident or fleet claims?
10. If a PullQuote sits here, is it a sentence already doing argument work in the body?
11. Are there zero em dashes, stock transitions, prediction or novelty claims, and raw ids?
12. (Close only) Does it return to the opening object, state what it needed, include the harder
    problem, and end on a first-person bar, succinctly?

## 6. Open tension (for the lead, not settled here)

- The published final removed several of Nick's own plus-side lines (the H917:L16 signpost, the
  H917:L30 joke, the H917:L95 wording, and H917:L26 "My usage"). Under the authority order, his
  versions win on voice and accuracy edits win on fact. Re-edits of other Theses essays should
  keep his conversational asides, not inherit the final's smoothing by default.
