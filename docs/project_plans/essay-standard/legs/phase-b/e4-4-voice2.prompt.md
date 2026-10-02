Target-Node: node_01M3YVPKSNG346KKGHAQSVT45R

Lane: ICA `claude-opus-5-5[1m]` (taste bar: editorial fix round).

# Fix round: apply the accepted review findings, in Nick's voice

An independent review is at `docs/blog-work/the-contract-is-the-work/polish/review.md`. The lead already fixed the blockers by hand (commit `45bbc1f`). Your job is the remaining editorial findings the lead ACCEPTED for you:

R4 first half (develop the harder case already named in the cold open as its own second movement, using existing text), R5 (move the fair account of adjacent field work and the scoped RelatedWork examples BEFORE the 'no direct equivalent' gap claim; keep the bounded-review limits), R7 (refresh thread-beats.md quotes; add the companion amendment location for the flake beat), R8 (make 'From sources to decision authority' a declarative H2 with a period), R10 (tighten the close's non-protected glue so it lands on Nick's personal bar after seeding the E5 question; remove the future prediction).

Out of scope for you: R3 ('it goes through ... adversarial review') and the origin-beat half of R4 are NOT yours: leave that sentence verbatim and add no origin date or memory; the lead has put both to Nick. Nick's hand-edited sentences (nick-hunks.md, commit bca1cd5f section; the review lists them under 'Meaning and protected text') stay verbatim.

PROTECTED lines restored by the lead for meaning; keep each one's wording and claim (you may only move it as a unit):
- `Contract-as-spec is a method for preserving that continuity, and it's my approach within`
- `Through August 25, 2026, work in my AOS crossed three LLM vendors`
- `[review of 41 current open-source agent-tooling sources](#sources)`

Nick's standing decision, 2026-10-02: **keep his asides.** Preserve and, where an earlier pass smoothed them away, restore his parenthetical and conversational asides (compare with `git show 45e7274:src/content/posts/the-contract-is-the-work.mdx`). His register is closer to his own 2026-09-17 hand edits than to smoothed text: see `docs/authoring/essay-voice-profile.md` sections 2.8, 2.13, 3 and 6.

Read: the review, `docs/authoring/essay-voice-profile.md`, `docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/voice/nick-voice-rules.md`, `docs/authoring/essay-standard.md`.

Edit only: the essay mdx, `docs/blog-work/the-contract-is-the-work/thread-beats.md`, `docs/blog-work/the-contract-is-the-work/polish/stale-claims.md` (only to correct line numbers or descriptions the review found wrong). Write `docs/blog-work/the-contract-is-the-work/polish/voice2-notes.md`: one line per accepted finding id saying what you did, plus any aside you restored.

Repo: Signal to System (Astro blog; PUBLIC). Your cwd is a linked git worktree. Work only inside cwd.
Essay E4: `src/content/posts/the-contract-is-the-work.mdx`. Tracker node node_01M3YVPKSNG346KKGHAQSVT45R.

Hard rules: preserve meaning, claims, numbers, dates, receipts, and sources; never invent facts, dates, sources, URLs, or first-person memories. Zero em dashes (U+2014). Contractions in body prose. No raw tracker ids, PR numbers, or SHAs in body prose (footnote method notes may keep existing commit refs). Never touch Figures, images, hero fields, layouts, components, or the Registry Wave essay. Run in the foreground before finishing: `node scripts/check-essay.mjs src/content/posts/the-contract-is-the-work.mdx` and `node scripts/check-prose.mjs` (both must pass for this essay). Do not attempt `git commit`. Never set SUITE_GATE_SKIP. Final report: at most 200 words plus file paths, including the check-essay result line.
