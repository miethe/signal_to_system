Target-Node: node_01M3YVPKM3EE8N43SKV2BQM3F4

Lane: ICA `claude-opus-5-5[1m]` (taste bar: editorial voice pass against the exemplar).

# Stage 2 of 3: editorial re-pass in Nick's voice

Stage 1 already migrated structure and components (see `docs/blog-work/agentic-operations-flow/polish/migration-notes.md`). Now edit the prose.

Read also: `docs/authoring/essay-voice-profile.md` (voice profile, incl. the 12-question editor's audit), `docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/voice/nick-voice-rules.md` and `nick-hunks.md` (Nick's own hand edits: HIGHEST authority), and the gap matrix's "Voice gaps" and "Stale-claim candidates" for E2.

Do:
- Fix every listed voice gap, then run the editor's audit section by section and fix every "no" on questions 1-6.
- Opening: incident first, owned in the first person, using only the incident the essay already contains. The harder-problem turn. The close: short, returns to the opening object, says what it needed, hands the next essay's question forward (arc table). Nick spends the most effort on the close; so should you.
- Arc handoffs: the body should state the prior question it answers and seed the next essay's question in a sentence, per the Arc coherence table. Body links to published essays use `/essays/<slug>/`.
- Keep Nick's own existing sentences and conversational asides; voice comes from the exemplar and his hand edits, never from a generic "humanize" pass.
- Stale-claim candidates: do NOT rewrite them. Write `docs/blog-work/agentic-operations-flow/polish/stale-claims.md`: one row per candidate (line, quote under 15 words, why it may be stale, recommendation: keep-as-historical / rescope / needs-Nick).
- Write `docs/blog-work/agentic-operations-flow/polish/voice-notes.md`: at most 40 bullets of what you changed and why, citing the profile section.

Files you may edit/create: the essay mdx and the two polish notes above.

Repo: Signal to System (Astro blog; a PUBLIC repo). Your cwd is a linked git worktree. Work only inside cwd.
Essay: E2 "The Work Is a Graph", file `src/content/posts/agentic-operations-flow.mdx`. Tracker node node_01M3YVPKM3EE8N43SKV2BQM3F4.

Binding references (read before editing):
- `docs/authoring/essay-standard.md` (the standard; sections 1-5 and 7).
- `docs/project_plans/essay-standard/gap-matrix.md`, the "E2" section and the "Arc coherence" table (your work order).
- `src/content/posts/the-registry-wave-agentic-artifact-supply-chain.mdx` (the published exemplar; NEVER edit it).

Essay-specific constraint: E2 keeps the AgenticOperationsFlow interactive component (client:visible), its CSS import, and all seven Figures exactly. The gap matrix recommends consolidating 11 H2s into about seven movements: do it by regrouping and retitling existing sections, not by writing new arguments. The essay describes a June curated operating model: keep the distinction between the documented model and demonstrated behavior explicit.

Hard rules for every stage:
- Preserve meaning, claims, numbers, dates, receipts, quotes, and footnote sources. Never invent facts, numbers, dates, sources, URLs, logs, hashes, or first-person memories.
- Zero em dashes (U+2014) anywhere you write. Contractions in body prose. No raw tracker ids, PR numbers, commit SHAs, or schema field names in body prose.
- Imagery is out of scope: never add, remove, restyle, or renumber images or Figures; keep hero fields' values; do not add ThreadScene tags.
- Do not edit any layout, component, style, or the Registry Wave essay. Edit only the files this stage names.
- Before finishing, run in the foreground: `node scripts/check-essay.mjs src/content/posts/agentic-operations-flow.mdx` and `node scripts/check-prose.mjs`; both must report no errors for this essay. You cannot run the Astro build; the lead will.
- Do not attempt `git commit`; leave files on disk (the dispatch script commits each stage). Never set SUITE_GATE_SKIP.
- Final report: at most 200 words plus file paths; include the check-essay result line for this essay.
