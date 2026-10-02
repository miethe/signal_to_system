#!/usr/bin/env python3
"""Render Phase B leg prompts (3 essays x 3 stages) from one template set."""
from pathlib import Path
HERE = Path(__file__).parent
ESSAYS = {
  "e1": dict(slug="governed-agentic-sdlc-01-productivity-paradox", title="The AI Productivity Paradox", node="node_01M3YVPKEDPA3Z2M23P22FAA6Z", arc="E1",
    special="E1 PREMISE HOLD: the gap matrix says E1 may need a narrow re-argument (the absence-of-infrastructure claim near L145/L181 and the gates-cannot-work claim near L158-167). That is Nick's decision and is NOT made yet. Keep those claims' meaning exactly as they are: do not soften, scope, or rewrite them, and do not build BoundaryGrid/ImplementationStatus rows that assert a position on them. List each in the stale-claims sidecar under a 'Premise decisions for Nick' heading. Add no RevisionNote."),
  "e2": dict(slug="agentic-operations-flow", title="The Work Is a Graph", node="node_01M3YVPKM3EE8N43SKV2BQM3F4", arc="E2",
    special="E2 keeps the AgenticOperationsFlow interactive component (client:visible), its CSS import, and all seven Figures exactly. The gap matrix recommends consolidating 11 H2s into about seven movements: do it by regrouping and retitling existing sections, not by writing new arguments. The essay describes a June curated operating model: keep the distinction between the documented model and demonstrated behavior explicit."),
  "e4": dict(slug="the-contract-is-the-work", title="The Contract Is the Work", node="node_01M3YVPKSNG346KKGHAQSVT45R", arc="E4",
    special="E4 contains Nick's own hand edits (see nick-hunks.md, commit bca1cd5f section): preserve those sentences verbatim unless a checklist error forces a change. Keep the companion link and its synthetic-example label. Seed E5's question (when judgment gets promoted to a deterministic rule, and when it is withdrawn) without promising a live system and without linking an unpublished slug."),
}
COMMON = """
Repo: Signal to System (Astro blog; a PUBLIC repo). Your cwd is a linked git worktree. Work only inside cwd.
Essay: {arc} "{title}", file `src/content/posts/{slug}.mdx`. Tracker node {node}.

Binding references (read before editing):
- `docs/authoring/essay-standard.md` (the standard; sections 1-5 and 7).
- `docs/project_plans/essay-standard/gap-matrix.md`, the "{arc}" section and the "Arc coherence" table (your work order).
- `src/content/posts/the-registry-wave-agentic-artifact-supply-chain.mdx` (the published exemplar; NEVER edit it).

Essay-specific constraint: {special}

Hard rules for every stage:
- Preserve meaning, claims, numbers, dates, receipts, quotes, and footnote sources. Never invent facts, numbers, dates, sources, URLs, logs, hashes, or first-person memories.
- Zero em dashes (U+2014) anywhere you write. Contractions in body prose. No raw tracker ids, PR numbers, commit SHAs, or schema field names in body prose.
- Imagery is out of scope: never add, remove, restyle, or renumber images or Figures; keep hero fields' values; do not add ThreadScene tags.
- Do not edit any layout, component, style, or the Registry Wave essay. Edit only the files this stage names.
- Before finishing, run in the foreground: `node scripts/check-essay.mjs src/content/posts/{slug}.mdx` and `node scripts/check-prose.mjs`; both must report no errors for this essay. You cannot run the Astro build; the lead will.
- Do not attempt `git commit`; leave files on disk (the dispatch script commits each stage). Never set SUITE_GATE_SKIP.
- Final report: at most 200 words plus file paths; include the check-essay result line for this essay.
"""
STAGES = {
"1-migrate": ("Codex `gpt-6-luna`, workspace-write (mechanical structure and component migration)", """
# Stage 1 of 3: structural and component migration

Do the gap matrix's "Component and metadata migration" list for {arc}, plus whatever else `check-essay` reports as an error. Concretely:
- Frontmatter: add every missing required key (standard section 2). `relatedSlugs` = the other published arc essays. `seoTitle`/`seoDescription` may reuse the essay's own existing wording. Bump `updatedDate` to 2026-10-02. Keep `series`/`seriesOrder` as they are.
- Add `ExecutiveSignal` with strings identical to frontmatter `whyItMatters` / `leaderTakeaway`.
- Add exactly one `PullQuote variant="thesis-marker"` early, using a sentence that ALREADY exists in the essay (shorten only by cutting words). Convert Callouts as the gap matrix says; up to 3 ordinary PullQuotes, each an existing load-bearing sentence.
- Build the receipts rail section ("What I can prove today." H2 with `ClaimBadge` paragraphs) ONLY from evidence the essay already states or footnotes; each paragraph is a method summary. Add `ImplementationStatus` / `BoundaryGrid` / `RelatedWork` only where the gap matrix calls for them and only from existing content; unverifiable status is `TO TEST` or `PROPOSED`, never `IMPLEMENTED`.
- `## Sources` heading over the footnotes with one scope sentence; move body commit hashes into footnotes as method summaries.
- `<Term>` on first use for existing glossary ids. New glossary entries in `src/data/glossary.ts` only if a named system needs one: attribution-safe wording, inserted in alphabetical position by id (other essays are being edited in parallel; do not append at the end). Do NOT add `src/data/evidence.ts` records in this pass.
- Reorder or regroup sections toward the standard's anatomy only as the gap matrix directs; keep prose changes to the minimum glue a move requires, and mark each glue sentence in `docs/blog-work/{slug}/polish/migration-notes.md`.
- Write the running-thread beat manifest `docs/blog-work/{slug}/thread-beats.md` (for the imagery effort): the gap matrix's running example, 4-6 beats, each with id, label, one-paragraph recap grounded in the essay text, establishes, doesNotEstablish, and the essay line it sits beside. No images.

Files you may edit/create: the essay mdx, `src/data/glossary.ts`, `docs/blog-work/{slug}/thread-beats.md`, `docs/blog-work/{slug}/polish/migration-notes.md`.
"""),
"2-voice": ("ICA `claude-opus-5-5[1m]` (taste bar: editorial voice pass against the exemplar)", """
# Stage 2 of 3: editorial re-pass in Nick's voice

Stage 1 already migrated structure and components (see `docs/blog-work/{slug}/polish/migration-notes.md`). Now edit the prose.

Read also: `docs/authoring/essay-voice-profile.md` (voice profile, incl. the 12-question editor's audit), `docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/voice/nick-voice-rules.md` and `nick-hunks.md` (Nick's own hand edits: HIGHEST authority), and the gap matrix's "Voice gaps" and "Stale-claim candidates" for {arc}.

Do:
- Fix every listed voice gap, then run the editor's audit section by section and fix every "no" on questions 1-6.
- Opening: incident first, owned in the first person, using only the incident the essay already contains. The harder-problem turn. The close: short, returns to the opening object, says what it needed, hands the next essay's question forward (arc table). Nick spends the most effort on the close; so should you.
- Arc handoffs: the body should state the prior question it answers and seed the next essay's question in a sentence, per the Arc coherence table. Body links to published essays use `/essays/<slug>/`.
- Keep Nick's own existing sentences and conversational asides; voice comes from the exemplar and his hand edits, never from a generic "humanize" pass.
- Stale-claim candidates: do NOT rewrite them. Write `docs/blog-work/{slug}/polish/stale-claims.md`: one row per candidate (line, quote under 15 words, why it may be stale, recommendation: keep-as-historical / rescope / needs-Nick).
- Write `docs/blog-work/{slug}/polish/voice-notes.md`: at most 40 bullets of what you changed and why, citing the profile section.

Files you may edit/create: the essay mdx and the two polish notes above.
"""),
"3-review": ("Codex `gpt-6.1-sol`, effort medium (independent cross-family review; read-only on the essay)", """
# Stage 3 of 3: independent cross-family review

Two earlier stages edited this essay (Codex migration, then an ICA Opus voice pass). Review the net change. Base commit: `45e7274` (`git diff 45e7274 -- src/content/posts/{slug}.mdx src/data/glossary.ts docs/blog-work/{slug}/`). Read also `docs/authoring/essay-voice-profile.md`, the polish notes in `docs/blog-work/{slug}/polish/`, and `docs/blog-work/{slug}/thread-beats.md`.

Check, with line refs:
1. Meaning preservation: any claim, number, date, quote, receipt, or source that was changed, dropped, strengthened, or added without support. Any invented first-person memory. (Blocker class.)
2. Standard conformance: anatomy rows, frontmatter, components, arc obligations; `check-essay` output.
3. Voice: run the profile's 12-question editor's audit per section; flag generic or machine-sounding passages and lost Nick sentences.
4. Hygiene: em dashes, identifier leakage, broken internal links/anchors, Term ids, footnote pairing.
5. Stale-claims sidecar: is every gap-matrix candidate present with a recommendation?
6. Thread-beats manifest: grounded in the text, nothing invented.

Write exactly one file: `docs/blog-work/{slug}/polish/review.md` with a verdict (SHIP / FIX-THEN-SHIP / REWORK), then a findings table (id, severity blocker/major/minor, line, finding, suggested fix). Do NOT edit the essay or any other file.
"""),
}
for key, e in ESSAYS.items():
    for stage, (lane, body) in STAGES.items():
        text = f"Target-Node: {e['node']}\n\nLane: {lane}.\n" + (body + COMMON).format(**e)
        (HERE / f"{key}-{stage}.prompt.md").write_text(text)
print("rendered", len(ESSAYS) * len(STAGES))
