# E2 voice notes (stage 2 editorial pass)

Profile = `docs/authoring/essay-voice-profile.md`; rules = `nick-voice-rules.md`; gaps = gap matrix E2 "Voice gaps".

## Voice gaps
- Gap 1 (opening): the cold open now owns the existing lost-discovery example in first person ("The failure I keep designing against", "my system just forgot") and adds a one-line reversal beat. Profile 2.1, 2.10.
- Gap 1 limit: the opening says plainly it's a conceptual example, not a recorded incident, matching the ClaimBadge. No incident, date, or memory added. Profile 2.6. The incident gap from the gap matrix is still open for Nick.
- Gap 2: "I have started" became "I've started". No timeline anchor added because the manuscript gives none (rules 3, checklist 8): flag for Nick if he wants a date.
- Gap 2: contracted body prose throughout (isn't, it's, doesn't, can't, they're, I'm). Kept "is not" only in maxims: "Exploration is not a side quest", "Metered automation is not maturity by itself". Profile 2.9.
- Gap 3: replaced the triple "It doesn't know" with one sentence about what the scrollback can't tell the next agent, tied back to the lost discovery. Profile 2.8, 4 (repeats).
- Gap 4: cut the prose catalog that repeated the artifact table (Exploration Charter, PRD, Implementation Plan sentences). Kept the FeasibilityBrief, Feature Contract, and Progress File sentences, since they carry claims the table doesn't (or stale-claim #3). Added a paragraph running the lost discovery through the table. Rules 7, checklist 13.
- Gap 5: moved the `waves[]/phases[]` schema block into an "Inside my lab" `<details>` disclosure after the human explanation. Code text unchanged. Standard section 1, row 14.
- Gap 6: gave CCDash, MeatyWiki, IntentTree, HTML Capsules, and SkillMeat one-clause intros taken from glossary wording, plus a limit about uneven coverage. Standard 4 (audience contract); rules 3 (AOS breadth).
- Gap 7: cut the recap paragraph and joined the slogan into one sentence ("A transcript decays; a graph compounds."). Opened the section on the opening session instead. Profile 2.12; rules 6 (close energy).

## Structure (movements)
- Retitled H2 2 to "The harder problem: the first artifact depends on the uncertainty." and opened it with the easy-half / harder-problem turn, which restates the existing claim that different uncertainty needs different artifacts. Profile 2.4.
- Moved "The better question isn't..." from the cold open into the harder-problem section, where it works as the reframe question. Profile 2.2.
- H2 count stays at 9 including Sources (7 body movements + proof + Sources). Figure order 01-07, the interactive island, and the CSS import haven't changed.
- "Risk determines..." now opens on the concrete typo-fix-versus-database list (moved up from later in the section) before the abstraction. Audit Q1.
- "Review has distinct boundaries." now opens on a concrete pair (validator vs council) taken from the existing table. Audit Q1.
- "Evidence and cost..." now opens by going back to the lost discovery ("had a code change ... didn't have ... anything else"). Audit Q1; running thread.

## Corrective connectives and cadence
- Added "Rather," openers where a flat second sentence did the correcting: the better question, the orchestration question, progress as the product of the run, tool roles, the operating system line. Rules 2 (load-bearing).
- Turned "Not a model failure. An operating-state failure." into a ", not" turn. Profile 2.7, 3 (joins staccato pairs).
- Joined staccato pairs with ", but" or ";": "interaction surface, but", "Tool choice still matters;", "Specific tools change, but", "Autonomy isn't binary;". Profile 3.
- Mode D's "The storyboard requirement does not establish an enforced stop" now opens with "But" and ends on a colon unpack ("where the brake belongs, not that it fires"). Meaning unchanged. Profile 2.7, 2.8.
- Unwrapped the duplicate second `<Term id="mode-d">` and the second Feature Contract Term (first use only). Standard 3.

## Honesty about limits (audit Q3, hedged once each)
- Artifacts compounding: "That's the design intent, not a measured gain."
- Tier table: "documented mapping, not a log", with no classification or reviewer invocation shown.
- Execution graph: "shows the design, not a collision test."
- Interactive: "walks the June model as documented, not a recording of it running." This keeps the line between documented model and demonstrated behavior.
- BoundaryGrid intro sentence added so the grid reads as the boundary list, not decoration.

## Arc handoffs
- Prior question: one body sentence links `/essays/governed-agentic-sdlc-01-productivity-paradox/` and quotes E1's own gap ("no mechanism for one session's fix to survive into the next"). E1's FastAPI incident is not imported. Standard 5.
- Seed: the execution-graph section notes that every task lands on a reusable agent or skill (the validator is one). Keeping that true across projects is left to the next essay, unresolved. Standard 5.
- Umbrella line: "I place this essay within ... already named", matching the exemplar's wording. No novelty claim.

## Close
- Rewrote the close to return to the session that found the fix and state its needs one per sentence (discovery, intent, evidence, deferral vs rejection), plus the harder-problem need (right first artifact). It ends on a first-person bar ("when I'm not the one opening the next session"). Profile 2.12; hunks §11 note 12.
- The handoff paragraph opens with "But" and passes forward E3's question (copied, deployed, changed for good local reasons) with the `/essays/the-registry-wave-agentic-artifact-supply-chain/` link. Arc table E2 row.

## Flags for the lead
- Audit Q7-12: there's no self-deprecating aside; none exists in the manuscript, and inventing one would break the hard rules. Profile 2.13.
- "HTML Capsules, readable summaries for stakeholders" maps to the evidence table's "Human capsule" row. That's an inference with no glossary entry: please verify.
