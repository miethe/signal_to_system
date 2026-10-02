Target-Node: node_01M3YVPJSFE7MXRHEF28P3N4XQ

# Leg A2: Nick's essay voice profile, derived from the Registry Wave exemplar

Lane: ICA `claude-opus-5-5[1m]` (taste bar: voice derivation is design judgment, the editor lane).
Repo: Signal to System (Astro blog). Your cwd is a linked git worktree of it. Work only inside cwd.

## Why
Nick wants his other Theses-arc essays re-edited in his voice, using the published Registry Wave
essay as the exemplar. An essay standard already exists (`docs/authoring/essay-standard.md`); its
section 4 points at a voice profile that does not exist yet. You write it.

## Read (all inside cwd)
1. `src/content/posts/the-registry-wave-agentic-artifact-supply-chain.mdx` (the published exemplar; read in full).
2. `docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/voice/nick-voice-rules.md` and `nick-hunks.md` (rules distilled from Nick's own hand edits; HIGHER authority than anything you infer).
3. `docs/project_plans/essay-standard/legs/inputs/rw-nick-hand-edits-2026-09-17.diff` (Nick's own hand edits to the essay on 2026-09-17: the minus side is machine text, the plus side is Nick) and `rw-hand-edits-to-published-final.diff` (the later research-integrated final; mixed authorship, treat as weaker evidence).
4. `docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/editorial/review-2026-09-16.md` and `v2-research-integrated/NARRATIVE-TUNE-AUDIT.md` (editorial history).
5. `docs/authoring/essay-standard.md` (context only; do not edit it).

## Write exactly one file
`docs/authoring/essay-voice-profile.md`, at most ~250 lines, with:
- Frontmatter: title, updated 2026-10-02, sources (the files above), authority order (hand edits > exemplar > inference).
- **Register**: who he writes for (technical, exec-accessible, story-first) and how both audiences are served in the same paragraph.
- **Moves**, each with 1-3 SHORT quoted examples (under 15 words each) and the line number in the exemplar or the diff hunk: opening move, claim-then-question, thesis compression, the "harder problem" turn, origin/dating, honesty about limits ("doesn't establish", "I can prove"), corrective connectives, colon/semicolon/parenthetical use, contractions, one-line paragraphs as beats, PullQuote selection, the close.
- **Edits he makes to machine prose** (from the diffs): concrete before/after pairs (short).
- **Never**: a list of patterns he removes or that read as machine (generic transitions, hedges on hedges, abstraction-first openings, listicle cadence, em dashes).
- **Editor's audit**: 10-12 yes/no questions an editor runs per section of a polished essay.
- Mark anything supported by fewer than 2 instances as `inferred`.

## Rules
- Short quotes only; never paste whole paragraphs. No em dashes (U+2014) anywhere in the file.
- Do not edit any other file. Do not invent examples: every quote must be verbatim from a file above.
- No private corpus, journal, or identity material; use only the files above.
- Do not attempt `git commit`; leave the file on disk. If you run anything, run it in the foreground.
- Final report: at most 200 words plus the file path. Say how many quoted examples you used and how many moves are marked `inferred`.
