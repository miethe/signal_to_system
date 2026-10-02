Target-Node: node_01M3YVPKEDPA3Z2M23P22FAA6Z

Lane: ICA `claude-opus-5-5[1m]` (taste bar: editorial fix round).

# Fix round: apply the accepted review findings, in Nick's voice

An independent review is at `docs/blog-work/governed-agentic-sdlc-01-productivity-paradox/polish/review.md`. The lead already fixed the blockers by hand (commit `5ac6b3d`). Your job is the remaining editorial findings the lead ACCEPTED for you:

R08 (carry known dates into rail rows: November 2025, February-March 2026; mark unknown dates as unstated), R09 (sections failing audit Q1-6: ground openings in existing concrete objects, put limits next to non-held claims, make the second movement complicate the easy fix), R10 (thesis-display PullQuote must be a sentence that also does work in the body), R11 (refresh thread-beats.md quotes to exact current sentences), R12 (own the observations in first person in the rail; remove workflow-leaking sentences like 'this edition hasn't independently re-inspected them'; tighten the close without losing its needs, the E2 question, or the restored observation).

Out of scope for you: E1 PREMISE HOLD (Nick has not decided): the 'zero cognitive infrastructure' paragraph, the gates-cannot-work passages, and the absence-of-memory claims keep their meaning exactly; do not soften, scope, or rebut them, and add no status rows about them.

PROTECTED lines restored by the lead for meaning; keep each one's wording and claim (you may only move it as a unit):
- `I've since addressed this observability gap with another project`
- `I've watched it break teams that were otherwise doing everything right`
- `none of them knew the fix already existed somewhere else in the codebase`
- `a name already in use in academic and enterprise work.[^ase]`

Nick's standing decision, 2026-10-02: **keep his asides.** Preserve and, where an earlier pass smoothed them away, restore his parenthetical and conversational asides (compare with `git show 45e7274:src/content/posts/governed-agentic-sdlc-01-productivity-paradox.mdx`). His register is closer to his own 2026-09-17 hand edits than to smoothed text: see `docs/authoring/essay-voice-profile.md` sections 2.8, 2.13, 3 and 6.

Read: the review, `docs/authoring/essay-voice-profile.md`, `docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/voice/nick-voice-rules.md`, `docs/authoring/essay-standard.md`.

Edit only: the essay mdx, `docs/blog-work/governed-agentic-sdlc-01-productivity-paradox/thread-beats.md`, `docs/blog-work/governed-agentic-sdlc-01-productivity-paradox/polish/stale-claims.md` (only to correct line numbers or descriptions the review found wrong). Write `docs/blog-work/governed-agentic-sdlc-01-productivity-paradox/polish/voice2-notes.md`: one line per accepted finding id saying what you did, plus any aside you restored.

Repo: Signal to System (Astro blog; PUBLIC). Your cwd is a linked git worktree. Work only inside cwd.
Essay E1: `src/content/posts/governed-agentic-sdlc-01-productivity-paradox.mdx`. Tracker node node_01M3YVPKEDPA3Z2M23P22FAA6Z.

Hard rules: preserve meaning, claims, numbers, dates, receipts, and sources; never invent facts, dates, sources, URLs, or first-person memories. Zero em dashes (U+2014). Contractions in body prose. No raw tracker ids, PR numbers, or SHAs in body prose (footnote method notes may keep existing commit refs). Never touch Figures, images, hero fields, layouts, components, or the Registry Wave essay. Run in the foreground before finishing: `node scripts/check-essay.mjs src/content/posts/governed-agentic-sdlc-01-productivity-paradox.mdx` and `node scripts/check-prose.mjs` (both must pass for this essay). Do not attempt `git commit`. Never set SUITE_GATE_SKIP. Final report: at most 200 words plus file paths, including the check-essay result line.
