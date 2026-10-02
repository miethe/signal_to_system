Target-Node: node_01M3YVPKEDPA3Z2M23P22FAA6Z

Lane: Codex `gpt-6-luna`, workspace-write (mechanical structure and component migration).

# Stage 1 of 3: structural and component migration

Do the gap matrix's "Component and metadata migration" list for E1, plus whatever else `check-essay` reports as an error. Concretely:
- Frontmatter: add every missing required key (standard section 2). `relatedSlugs` = the other published arc essays. `seoTitle`/`seoDescription` may reuse the essay's own existing wording. Bump `updatedDate` to 2026-10-02. Keep `series`/`seriesOrder` as they are.
- Add `ExecutiveSignal` with strings identical to frontmatter `whyItMatters` / `leaderTakeaway`.
- Add exactly one `PullQuote variant="thesis-marker"` early, using a sentence that ALREADY exists in the essay (shorten only by cutting words). Convert Callouts as the gap matrix says; up to 3 ordinary PullQuotes, each an existing load-bearing sentence.
- Build the receipts rail section ("What I can prove today." H2 with `ClaimBadge` paragraphs) ONLY from evidence the essay already states or footnotes; each paragraph is a method summary. Add `ImplementationStatus` / `BoundaryGrid` / `RelatedWork` only where the gap matrix calls for them and only from existing content; unverifiable status is `TO TEST` or `PROPOSED`, never `IMPLEMENTED`.
- `## Sources` heading over the footnotes with one scope sentence; move body commit hashes into footnotes as method summaries.
- `<Term>` on first use for existing glossary ids. New glossary entries in `src/data/glossary.ts` only if a named system needs one: attribution-safe wording, inserted in alphabetical position by id (other essays are being edited in parallel; do not append at the end). Do NOT add `src/data/evidence.ts` records in this pass.
- Reorder or regroup sections toward the standard's anatomy only as the gap matrix directs; keep prose changes to the minimum glue a move requires, and mark each glue sentence in `docs/blog-work/governed-agentic-sdlc-01-productivity-paradox/polish/migration-notes.md`.
- Write the running-thread beat manifest `docs/blog-work/governed-agentic-sdlc-01-productivity-paradox/thread-beats.md` (for the imagery effort): the gap matrix's running example, 4-6 beats, each with id, label, one-paragraph recap grounded in the essay text, establishes, doesNotEstablish, and the essay line it sits beside. No images.

Files you may edit/create: the essay mdx, `src/data/glossary.ts`, `docs/blog-work/governed-agentic-sdlc-01-productivity-paradox/thread-beats.md`, `docs/blog-work/governed-agentic-sdlc-01-productivity-paradox/polish/migration-notes.md`.

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
