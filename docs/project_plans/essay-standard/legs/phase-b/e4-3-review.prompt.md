Target-Node: node_01M3YVPKSNG346KKGHAQSVT45R

Lane: Codex `gpt-6.1-sol`, effort medium (independent cross-family review; read-only on the essay).

# Stage 3 of 3: independent cross-family review

Two earlier stages edited this essay (Codex migration, then an ICA Opus voice pass). Review the net change. Base commit: `45e7274` (`git diff 45e7274 -- src/content/posts/the-contract-is-the-work.mdx src/data/glossary.ts docs/blog-work/the-contract-is-the-work/`). Read also `docs/authoring/essay-voice-profile.md`, the polish notes in `docs/blog-work/the-contract-is-the-work/polish/`, and `docs/blog-work/the-contract-is-the-work/thread-beats.md`.

Check, with line refs:
1. Meaning preservation: any claim, number, date, quote, receipt, or source that was changed, dropped, strengthened, or added without support. Any invented first-person memory. (Blocker class.)
2. Standard conformance: anatomy rows, frontmatter, components, arc obligations; `check-essay` output.
3. Voice: run the profile's 12-question editor's audit per section; flag generic or machine-sounding passages and lost Nick sentences.
4. Hygiene: em dashes, identifier leakage, broken internal links/anchors, Term ids, footnote pairing.
5. Stale-claims sidecar: is every gap-matrix candidate present with a recommendation?
6. Thread-beats manifest: grounded in the text, nothing invented.

Write exactly one file: `docs/blog-work/the-contract-is-the-work/polish/review.md` with a verdict (SHIP / FIX-THEN-SHIP / REWORK), then a findings table (id, severity blocker/major/minor, line, finding, suggested fix). Do NOT edit the essay or any other file.

Repo: Signal to System (Astro blog; a PUBLIC repo). Your cwd is a linked git worktree. Work only inside cwd.
Essay: E4 "The Contract Is the Work", file `src/content/posts/the-contract-is-the-work.mdx`. Tracker node node_01M3YVPKSNG346KKGHAQSVT45R.

Binding references (read before editing):
- `docs/authoring/essay-standard.md` (the standard; sections 1-5 and 7).
- `docs/project_plans/essay-standard/gap-matrix.md`, the "E4" section and the "Arc coherence" table (your work order).
- `src/content/posts/the-registry-wave-agentic-artifact-supply-chain.mdx` (the published exemplar; NEVER edit it).

Essay-specific constraint: E4 contains Nick's own hand edits (see nick-hunks.md, commit bca1cd5f section): preserve those sentences verbatim unless a checklist error forces a change. Keep the companion link and its synthetic-example label. Seed E5's question (when judgment gets promoted to a deterministic rule, and when it is withdrawn) without promising a live system and without linking an unpublished slug.

Hard rules for every stage:
- Preserve meaning, claims, numbers, dates, receipts, quotes, and footnote sources. Never invent facts, numbers, dates, sources, URLs, logs, hashes, or first-person memories.
- Zero em dashes (U+2014) anywhere you write. Contractions in body prose. No raw tracker ids, PR numbers, commit SHAs, or schema field names in body prose.
- Imagery is out of scope: never add, remove, restyle, or renumber images or Figures; keep hero fields' values; do not add ThreadScene tags.
- Do not edit any layout, component, style, or the Registry Wave essay. Edit only the files this stage names.
- Before finishing, run in the foreground: `node scripts/check-essay.mjs src/content/posts/the-contract-is-the-work.mdx` and `node scripts/check-prose.mjs`; both must report no errors for this essay. You cannot run the Astro build; the lead will.
- Do not attempt `git commit`; leave files on disk (the dispatch script commits each stage). Never set SUITE_GATE_SKIP.
- Final report: at most 200 words plus file paths; include the check-essay result line for this essay.
