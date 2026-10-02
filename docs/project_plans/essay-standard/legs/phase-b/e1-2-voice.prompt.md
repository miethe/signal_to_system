Target-Node: node_01M3YVPKEDPA3Z2M23P22FAA6Z

Lane: ICA `claude-opus-5-5[1m]` (taste bar: editorial voice pass against the exemplar).

# Stage 2 of 3: editorial re-pass in Nick's voice

Stage 1 already migrated structure and components (see `docs/blog-work/governed-agentic-sdlc-01-productivity-paradox/polish/migration-notes.md`). Now edit the prose.

Read also: `docs/authoring/essay-voice-profile.md` (voice profile, incl. the 12-question editor's audit), `docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/voice/nick-voice-rules.md` and `nick-hunks.md` (Nick's own hand edits: HIGHEST authority), and the gap matrix's "Voice gaps" and "Stale-claim candidates" for E1.

Do:
- Fix every listed voice gap, then run the editor's audit section by section and fix every "no" on questions 1-6.
- Opening: incident first, owned in the first person, using only the incident the essay already contains. The harder-problem turn. The close: short, returns to the opening object, says what it needed, hands the next essay's question forward (arc table). Nick spends the most effort on the close; so should you.
- Arc handoffs: the body should state the prior question it answers and seed the next essay's question in a sentence, per the Arc coherence table. Body links to published essays use `/essays/<slug>/`.
- Keep Nick's own existing sentences and conversational asides; voice comes from the exemplar and his hand edits, never from a generic "humanize" pass.
- Stale-claim candidates: do NOT rewrite them. Write `docs/blog-work/governed-agentic-sdlc-01-productivity-paradox/polish/stale-claims.md`: one row per candidate (line, quote under 15 words, why it may be stale, recommendation: keep-as-historical / rescope / needs-Nick).
- Write `docs/blog-work/governed-agentic-sdlc-01-productivity-paradox/polish/voice-notes.md`: at most 40 bullets of what you changed and why, citing the profile section.

Files you may edit/create: the essay mdx and the two polish notes above.

Repo: Signal to System (Astro blog; a PUBLIC repo). Your cwd is a linked git worktree. Work only inside cwd.
Essay: E1 "The AI Productivity Paradox", file `src/content/posts/governed-agentic-sdlc-01-productivity-paradox.mdx`. Tracker node node_01M3YVPKEDPA3Z2M23P22FAA6Z.

Binding references (read before editing):
- `docs/authoring/essay-standard.md` (the standard; sections 1-5 and 7).
- `docs/project_plans/essay-standard/gap-matrix.md`, the "E1" section and the "Arc coherence" table (your work order).
- `src/content/posts/the-registry-wave-agentic-artifact-supply-chain.mdx` (the published exemplar; NEVER edit it).

Essay-specific constraint: E1 PREMISE HOLD: the gap matrix says E1 may need a narrow re-argument (the absence-of-infrastructure claim near L145/L181 and the gates-cannot-work claim near L158-167). That is Nick's decision and is NOT made yet. Keep those claims' meaning exactly as they are: do not soften, scope, or rewrite them, and do not build BoundaryGrid/ImplementationStatus rows that assert a position on them. List each in the stale-claims sidecar under a 'Premise decisions for Nick' heading. Add no RevisionNote.

Hard rules for every stage:
- Preserve meaning, claims, numbers, dates, receipts, quotes, and footnote sources. Never invent facts, numbers, dates, sources, URLs, logs, hashes, or first-person memories.
- Zero em dashes (U+2014) anywhere you write. Contractions in body prose. No raw tracker ids, PR numbers, commit SHAs, or schema field names in body prose.
- Imagery is out of scope: never add, remove, restyle, or renumber images or Figures; keep hero fields' values; do not add ThreadScene tags.
- Do not edit any layout, component, style, or the Registry Wave essay. Edit only the files this stage names.
- Before finishing, run in the foreground: `node scripts/check-essay.mjs src/content/posts/governed-agentic-sdlc-01-productivity-paradox.mdx` and `node scripts/check-prose.mjs`; both must report no errors for this essay. You cannot run the Astro build; the lead will.
- Do not attempt `git commit`; leave files on disk (the dispatch script commits each stage). Never set SUITE_GATE_SKIP.
- Final report: at most 200 words plus file paths; include the check-essay result line for this essay.
