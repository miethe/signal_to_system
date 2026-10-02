Target-Node: node_01M3YVPJZY5SSMRNBNNEEH09QK

# Leg A3: gap matrix and polish plans for three Theses-arc essays

Lane: Codex `gpt-6.1-sol`, effort medium (structural analysis and arc-coherence critique; cross-family from the ICA editor who will do the voice pass).
Repo: Signal to System (Astro blog). Your cwd is a linked git worktree. Work only inside cwd.

## Why
The published Registry Wave essay (E3) is Nick's golden standard. The essay standard
`docs/authoring/essay-standard.md` encodes it (anatomy, frontmatter, components, arc obligations,
machine checklist). Three other arc essays must be polished to it. You produce the plan the polish
legs will execute. You do not edit any essay.

Essays in scope (arc order, from `src/data/reading-paths.json`):
- E1 `src/content/posts/governed-agentic-sdlc-01-productivity-paradox.mdx`
- E2 `src/content/posts/agentic-operations-flow.mdx`
- E4 `src/content/posts/the-contract-is-the-work.mdx`
Context only: E3 exemplar `src/content/posts/the-registry-wave-agentic-artifact-supply-chain.mdx`;
companion `src/content/posts/contract-as-spec-worked-example.mdx`; E5 plan `docs/blog-work/deterministic-envelope/`;
arc record `docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/v2-research-integrated/ARC-DELTA.md`;
voice rules `docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/voice/nick-voice-rules.md`;
data `src/data/glossary.ts`, `src/data/threads.ts`, `src/data/evidence.ts`; components `src/components/content/`.

Run first, in the foreground: `node scripts/check-essay.mjs` and include its per-essay result.

## Write exactly one file
`docs/project_plans/essay-standard/gap-matrix.md`:
1. **Matrix**: rows = standard section 1 anatomy rows 0-17 plus section 2 frontmatter, section 3 components, section 5 arc obligations; columns = E1, E2, E4. Cells: `meets` / `partial` / `missing` / `n/a` plus a few words of evidence (line refs).
2. **Per essay** (one H2 each):
   - Current argument in 3 sentences; its prior question, thesis, next question; whether the forward link to the next arc essay exists and where.
   - Running-example candidate: the concrete incident/example already in the text that can carry the thread, with 4-6 proposed beat names. (Images are out of scope; beats will be wired later.)
   - Receipts: every evidence-bearing claim that should become a `ClaimBadge` paragraph, with its kind (observed/measured/proposed/external) and the existing footnote or source it rests on. Do not invent sources.
   - Component migration list: exact components to add/convert (e.g. Callout to PullQuote/ImplementationStatus), frontmatter to add, glossary terms needed (existing ids vs new), `## Sources` restructuring.
   - Voice gap summary: 5-8 concrete departures from the exemplar/voice rules, with line refs (no rewrites).
   - **Stale-claim candidates**: statements about the author's own systems, models, tools, or numbers that may no longer hold. Known changes since these essays published, for reference: the "Hermes" scheduler runtime was retired on 2026-09-26 and replaced by zero-model scheduled timers; the default flagship model moved to Opus 5.5 on 2026-09-22 (Opus 4.x and Opus 5 are legacy); the hop-based autonomous execution unit is still under construction. List each candidate with its line and why; do not resolve it.
   - Polish acceptance criteria (5-10 checkable bullets).
   - **Polish or re-argue?** If an essay's argument no longer fits the arc (not just its prose), say so plainly with the reason. That is a decision for Nick, so be specific.
3. **Arc coherence**: one table E1 to E5: question, thesis, what it hands the next essay, broken/missing handoffs.

## Rules
- Read-only on everything except the one output file. No em dashes in the output.
- Do not attempt `git commit`; leave the file on disk. Run commands in the foreground. Never set SUITE_GATE_SKIP.
- Final report: at most 200 words plus the file path: the three verdicts (polish vs re-argue) and the count of stale-claim candidates per essay.
