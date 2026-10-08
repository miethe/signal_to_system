# E1 voice notes (editorial re-pass, 2026-10-02)

Profile = `docs/authoring/essay-voice-profile.md`; rules = `nick-voice-rules.md`; gap = the gap matrix's E1 "Voice gaps". Meaning, numbers, dates, and footnotes are unchanged. Premise and stale claims are held (see `stale-claims.md`).

## Opening (gap 1, 2; profile 2.1, 2.2, 2.3)
- New cold-open H2, "Each fix was correct. The same bug still took three sessions.": a two-beat claim instead of a topic (profile 2.1; standard anatomy 3).
- The opening paragraph now carries the FastAPI 204 incident, using only facts already in the essay (February-March 2026, three sessions, three layers, SkillMeat). It's owned in the first person ("one of my own projects"). The sequence of fixes isn't invented.
- Added a one-line reversal beat, "Each fix was correct, but none of the sessions knew...". It uses a joined ", but" pair instead of a staccato fragment pair (profile 3, H917:L22-23).
- Added a bridge line tying the incident to the paradox so the portfolio of gains reads as context, not as the hook (gap 2).
- Cut "Let me be direct" from the opening and replaced it with "Here's what I'm actually seeing" (profile 4, stock phrases). The second instance in the governed section stays, so the tic appears once.
- "Anyone who tells you... hasn't used them" became "If someone tells me..., my bet is they haven't". This owns a bounded observation instead of challenging the reader (gap 1; profile 1 stance). The claim and "last 6 months" are kept.
- The thesis prose now gets a semicolon-balanced tie back to the incident: "had the fixes; they didn't have the shared state" (profile 2.8).
- The plain question is its own paragraph and is the arc's prior question: "So why can task speed fail to improve delivery?" (profile 2.2; standard section 5; arc table E1). It replaces the stage-1 glue question.
- Kept Nick's "Features shipped. Defects resolved... Not even close." run untouched (voice-rules 6: keep personal cadence).

## Body sections (audit Q1-6)
- Every H2 is now a declarative sentence ending in a period (standard anatomy 8). The "Close" H2 is gone, so the close follows WhereThisSits the way the exemplar's does.
- Tiers section: opens on a concrete contrast (scaffolding in minutes versus one bug across three sessions) before the table framing (audit Q1).
- Harder-problem turn: "Faster tasks are the easy half." is a standalone beat, followed by "The harder problem is..." (profile 2.4, 2.10).
- Added a ", which is why a better tool alone doesn't fix it" turn to the four-failures setup, so that corrective lands with a ", not"-style turn instead of a flat statement (audit Q4; profile 2.7). Consistent with the thesis.
- Volume Trap: fixed a semicolon misused as a comma before "nearly double" (profile 2.8).
- Context Collapse: opens on a concrete one-line beat ("passes every test and still break a rule nobody wrote down") drawn from the section's own claim (audit Q1). Merged the first two clipped sentences with ", and" (profile 3, joining pairs).
- The November sprawl paragraph is split in two (origin and script; then inventory and rules). The personal embarrassment, the counts, and the file names are all kept (gap 3; voice-rules 2 split rule).
- Joined "each with its own fragmented directory" and "fixing a prompt rule..." with ", and" to make one medium sentence with one turn (profile 3).
- "Skillmeat" is normalized to "SkillMeat". The `Term` moved to its new first use in the opening (profile 3, Term on first use).
- Accountability Gap: the FastAPI paragraph now calls back to the opening ("from the opening is this gap at its smallest"). It keeps Nick's "Three agents, one bug, zero shared memory." and the mechanism sentence verbatim.
- Shadow AI: semicolon before a list became a colon (profile 2.8). "won't reduce risk, it just hides the risk" became "won't reduce the risk; it just hides it": a comma splice plus an exact-word repeat (voice-rules 2 redundancy; profile 2.8).
- Kept Nick's asides: "For three months!", the amplifier line, "Not equivalent. Better.", and "more than just a rounding error" (voice-rules 3, personality; profile 6 open tension).

## Infrastructure and governed sections (gap 5)
- "we're all racking our brains" became first person: "I was racking my brain... I wasn't alone in that". This keeps the general claim and the "assuming... made it that far" aside (gap 5; profile 3 "puts himself in the sentence").
- "We are now" became "We're now" (profile 2.9).
- The Agentic Systems Engineering sentence now reads "the broader discipline of... a name already in use", which is attribution-safe and matches the exemplar's framing (standard 3.2, 5).
- Governed section: cut the series-announcement opener (gap 7, L171). It now opens by returning to the FastAPI sessions (audit Q1).
- Harness Engineering Control Plane paragraph: it now opens on the layer's concrete job before the term and the Kubernetes analogy (gap 5; voice-rules 2 "formal-definition register to direct"). The term is unchanged (stale #5).
- Added a one-sentence seed for E2's question after Agent Amnesia ("what has to survive a session, and in what shape"). The premise sentence before it is untouched (standard 5; arc table).
- Fixed the stray period inside the DiffViewer parenthetical. Fixed the semicolon in "over a year now; in my own projects".

## Receipts rail
- Contracted the rail and Sources prose: "aren't controlled measurements", "they're source gaps", "didn't match", "don't independently verify", "doesn't establish" (profile 2.9).
- "this leg has not independently inspected them" became "this edition hasn't independently re-inspected them", which removes process jargon from reader-facing prose (standard 4 audience contract).

## Close (profile 2.12; voice-rules 4)
- Replaced the stage-1 glue ("The prior question was...") with a close that returns to the opening object, the three FastAPI sessions.
- It states what they didn't need (a faster model), then one sentence per need: a record of the fix, the context to recognize where it applied, and an owner for knowing it was done. The last of these is the harder-problem need, carried from the accountability gap.
- It ends on a first-person bar ("That's the bar I want for my own agent work"), then a one-sentence limit ("documents the repeated work, not a working shared-memory remedy", profile 2.6).
- It hands E2's question forward as a question, with a body link to `/essays/agentic-operations-flow/` (arc table).
- `draftNotes` gets a one-line provenance entry for this pass. No RevisionNote was added.

## Audit flags for the lead (Q7-12)
- Q11: the remaining "Let me be direct" is a mild stock phrase; I kept it as Nick's.
- Q3: the premise paragraphs (L180, L192-201, L213) intentionally lack a same-paragraph limit, per the hold.
- The bulleted "In practice" list and the gate bullets stay as bullets (profile 4 listicle). Converting them is a structural or visual call, not a prose call.
