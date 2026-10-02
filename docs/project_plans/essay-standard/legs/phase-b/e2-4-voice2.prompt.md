Target-Node: node_01M3YVPKM3EE8N43SKV2BQM3F4

Lane: ICA `claude-opus-5-5[1m]` (taste bar: editorial fix round).

# Fix round: apply the accepted review findings, in Nick's voice

An independent review is at `docs/blog-work/agentic-operations-flow/polish/review.md`. The lead already fixed the blockers by hand (commit `2465685`). Your job is the remaining editorial findings the lead ACCEPTED for you:

R6 remainder (scope live-sounding sentences near L110, L140, L176, L202, L244, L263 to the documented June model / intended behavior), R7 (put an existing concrete object or the opening example ahead of abstractions in the artifact-graph and tool/cost sections), R8 (tighten repetition, join clipped fragment pairs, split the five-system catalog sentence, trim the closing recap), R9 (refresh thread-beats.md quotes to exact current sentences), R10 (state the June scope plainly in the rail; record inspection dates as unstated; never invent a date).

Out of scope for you: R5 is NOT yours: do not add a first-person incident, an origin date, or new external research; the lead has put those to Nick.

PROTECTED lines restored by the lead for meaning; keep each one's wording and claim (you may only move it as a unit):
- `A rule can be mentioned in the scrollback, but the transcript doesn't carry it as state`
- `When a task in that graph leans on a reusable agent or skill`
- `a review council looking at a production migration`
- `the safer move is to stop the workflow before edits`
- `It's meant to keep the discovery, the intent behind the fix, and whatever verification evidence exists`
- `<ClaimBadge kind="proposed" /> **The lost-discovery example.**`

Nick's standing decision, 2026-10-02: **keep his asides.** Preserve and, where an earlier pass smoothed them away, restore his parenthetical and conversational asides (compare with `git show 45e7274:src/content/posts/agentic-operations-flow.mdx`). His register is closer to his own 2026-09-17 hand edits than to smoothed text: see `docs/authoring/essay-voice-profile.md` sections 2.8, 2.13, 3 and 6.

Read: the review, `docs/authoring/essay-voice-profile.md`, `docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/voice/nick-voice-rules.md`, `docs/authoring/essay-standard.md`.

Edit only: the essay mdx, `docs/blog-work/agentic-operations-flow/thread-beats.md`, `docs/blog-work/agentic-operations-flow/polish/stale-claims.md` (only to correct line numbers or descriptions the review found wrong). Write `docs/blog-work/agentic-operations-flow/polish/voice2-notes.md`: one line per accepted finding id saying what you did, plus any aside you restored.

Repo: Signal to System (Astro blog; PUBLIC). Your cwd is a linked git worktree. Work only inside cwd.
Essay E2: `src/content/posts/agentic-operations-flow.mdx`. Tracker node node_01M3YVPKM3EE8N43SKV2BQM3F4.

Hard rules: preserve meaning, claims, numbers, dates, receipts, and sources; never invent facts, dates, sources, URLs, or first-person memories. Zero em dashes (U+2014). Contractions in body prose. No raw tracker ids, PR numbers, or SHAs in body prose (footnote method notes may keep existing commit refs). Never touch Figures, images, hero fields, layouts, components, or the Registry Wave essay. Run in the foreground before finishing: `node scripts/check-essay.mjs src/content/posts/agentic-operations-flow.mdx` and `node scripts/check-prose.mjs` (both must pass for this essay). Do not attempt `git commit`. Never set SUITE_GATE_SKIP. Final report: at most 200 words plus file paths, including the check-essay result line.
