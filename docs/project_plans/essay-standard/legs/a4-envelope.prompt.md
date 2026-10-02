Target-Node: node_01M3YVPK7T83HNFRFAMGNYBR3X

# Leg A4: ready-to-draft packet for E5, The Deterministic Envelope (no prose)

Lane: Codex `gpt-6.1-sol`, effort medium (arc-coherence and structural reconciliation; cross-family from the ICA editor).
Repo: Signal to System (Astro blog). Your cwd is a linked git worktree. Work only inside cwd.

## Why
The Theses arc is five essays (`src/data/reading-paths.json`, path `agentic-systems-engineering-core`):
E1 `governed-agentic-sdlc-01-productivity-paradox`, E2 `agentic-operations-flow`, E3
`the-registry-wave-agentic-artifact-supply-chain` (the golden-standard exemplar), E4
`the-contract-is-the-work`, E5 The Deterministic Envelope (not yet written). A September plan for
E5 exists in `docs/blog-work/deterministic-envelope/` (post-spec, outline, receipt-rail,
research-asks, visuals), revised by `docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/v2-research-integrated/ARC-DELTA.md`.
The essay standard `docs/authoring/essay-standard.md` now defines the anatomy every essay follows.
Your job: reconcile the plan with the standard and the arc so Nick can start drafting from one packet.

## Read
- `docs/authoring/essay-standard.md` (sections 1, 2, 3, 5 are binding).
- All five files in `docs/blog-work/deterministic-envelope/` and `ARC-DELTA.md`.
- The four published arc essays in `src/content/posts/` (find each one's closing forward link and its stated next question).
- `docs/blog-packets/2026-07-01-skillmeat-agentic-artifact-thesis-handoff-packet.md` (thesis background).

## Write exactly one file
`docs/blog-work/deterministic-envelope/READY-TO-DRAFT.md`:
1. **Status and decisions open for Nick** (top): each open choice from the plan (sustained example, title, anything else), options, and your recommendation with one-line reason.
2. **Arc throughline table** E1 to E5: question, thesis, the exact sentence (short quote, line ref) where it hands forward, and what E5 must pay off from each. Flag any handoff E5's plan currently ignores.
3. **Outline in standard anatomy order** (rows 0-17 of standard section 1): for each row, the planned content as bullet notes (claims, example beats, receipts to cite, component to use), mapped from the existing outline sections. Notes, not paragraphs.
4. **Running thread**: the sustained example as 4-6 beats (id, label, what it establishes, what it does not establish). Images are a separate effort; name image hooks only.
5. **Receipt rail mapped to `ClaimBadge` kinds**, using ONLY receipts the plan marks usable (`public` or `method-only` with the stripping noted). Never promote `ibm-derived-withhold` or `unknown` receipts; list them as excluded.
6. **Frontmatter proposal** (non-prose fields plus candidate title/seoTitle; excerpt/whyItMatters/leaderTakeaway as one-line intents, not final copy).
7. **Glossary**: terms needed, existing ids in `src/data/glossary.ts` vs new entries, with attribution-safe posture.
8. **Research asks**: each ask from the plan with status (still open / answered by a source already cited in E1-E4 / no longer needed) and why.
9. **Risks**: novelty overclaim, stale-claim exposure, scope creep.

## Rules
- NO essay prose. Bullets, tables, and short quotes (under 15 words) only. No em dashes in the file.
- Do not edit any other file. Do not invent sources, receipts, numbers, or dates.
- Do not attempt `git commit`; leave the file on disk. Run commands in the foreground. Never set SUITE_GATE_SKIP.
- Final report: at most 200 words plus the file path: the open decisions for Nick with your recommendations.
