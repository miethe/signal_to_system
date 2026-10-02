#!/usr/bin/env python3
"""Render the Phase C fix-round prompts (voice2 + review2) per essay."""
from pathlib import Path
HERE = Path(__file__).parent
E = {
 "e1": dict(slug="governed-agentic-sdlc-01-productivity-paradox", node="node_01M3YVPKEDPA3Z2M23P22FAA6Z", arc="E1", lead="5ac6b3d",
   accept="R08 (carry known dates into rail rows: November 2025, February-March 2026; mark unknown dates as unstated), R09 (sections failing audit Q1-6: ground openings in existing concrete objects, put limits next to non-held claims, make the second movement complicate the easy fix), R10 (thesis-display PullQuote must be a sentence that also does work in the body), R11 (refresh thread-beats.md quotes to exact current sentences), R12 (own the observations in first person in the rail; remove workflow-leaking sentences like 'this edition hasn't independently re-inspected them'; tighten the close without losing its needs, the E2 question, or the restored observation).",
   hold="E1 PREMISE HOLD (Nick has not decided): the 'zero cognitive infrastructure' paragraph, the gates-cannot-work passages, and the absence-of-memory claims keep their meaning exactly; do not soften, scope, or rebut them, and add no status rows about them.",
   protected=["I've since addressed this observability gap with another project", "I've watched it break teams that were otherwise doing everything right", "none of them knew the fix already existed somewhere else in the codebase", "a name already in use in academic and enterprise work.[^ase]"]),
 "e2": dict(slug="agentic-operations-flow", node="node_01M3YVPKM3EE8N43SKV2BQM3F4", arc="E2", lead="2465685",
   accept="R6 remainder (scope live-sounding sentences near L110, L140, L176, L202, L244, L263 to the documented June model / intended behavior), R7 (put an existing concrete object or the opening example ahead of abstractions in the artifact-graph and tool/cost sections), R8 (tighten repetition, join clipped fragment pairs, split the five-system catalog sentence, trim the closing recap), R9 (refresh thread-beats.md quotes to exact current sentences), R10 (state the June scope plainly in the rail; record inspection dates as unstated; never invent a date).",
   hold="R5 is NOT yours: do not add a first-person incident, an origin date, or new external research; the lead has put those to Nick.",
   protected=["A rule can be mentioned in the scrollback, but the transcript doesn't carry it as state", "When a task in that graph leans on a reusable agent or skill", "a review council looking at a production migration", "the safer move is to stop the workflow before edits", "It's meant to keep the discovery, the intent behind the fix, and whatever verification evidence exists", '<ClaimBadge kind="proposed" /> **The lost-discovery example.**']),
 "e4": dict(slug="the-contract-is-the-work", node="node_01M3YVPKSNG346KKGHAQSVT45R", arc="E4", lead="45bbc1f",
   accept="R4 first half (develop the harder case already named in the cold open as its own second movement, using existing text), R5 (move the fair account of adjacent field work and the scoped RelatedWork examples BEFORE the 'no direct equivalent' gap claim; keep the bounded-review limits), R7 (refresh thread-beats.md quotes; add the companion amendment location for the flake beat), R8 (make 'From sources to decision authority' a declarative H2 with a period), R10 (tighten the close's non-protected glue so it lands on Nick's personal bar after seeding the E5 question; remove the future prediction).",
   hold="R3 ('it goes through ... adversarial review') and the origin-beat half of R4 are NOT yours: leave that sentence verbatim and add no origin date or memory; the lead has put both to Nick. Nick's hand-edited sentences (nick-hunks.md, commit bca1cd5f section; the review lists them under 'Meaning and protected text') stay verbatim.",
   protected=["Contract-as-spec is a method for preserving that continuity, and it's my approach within", "Through August 25, 2026, work in my AOS crossed three LLM vendors", "[review of 41 current open-source agent-tooling sources](#sources)"]),
}
COMMON = """
Repo: Signal to System (Astro blog; PUBLIC). Your cwd is a linked git worktree. Work only inside cwd.
Essay {arc}: `src/content/posts/{slug}.mdx`. Tracker node {node}.

Hard rules: preserve meaning, claims, numbers, dates, receipts, and sources; never invent facts, dates, sources, URLs, or first-person memories. Zero em dashes (U+2014). Contractions in body prose. No raw tracker ids, PR numbers, or SHAs in body prose (footnote method notes may keep existing commit refs). Never touch Figures, images, hero fields, layouts, components, or the Registry Wave essay. Run in the foreground before finishing: `node scripts/check-essay.mjs src/content/posts/{slug}.mdx` and `node scripts/check-prose.mjs` (both must pass for this essay). Do not attempt `git commit`. Never set SUITE_GATE_SKIP. Final report: at most 200 words plus file paths, including the check-essay result line.
"""
VOICE2 = """Target-Node: {node}

Lane: ICA `claude-opus-5-5[1m]` (taste bar: editorial fix round).

# Fix round: apply the accepted review findings, in Nick's voice

An independent review is at `docs/blog-work/{slug}/polish/review.md`. The lead already fixed the blockers by hand (commit `{lead}`). Your job is the remaining editorial findings the lead ACCEPTED for you:

{accept}

Out of scope for you: {hold}

PROTECTED lines restored by the lead for meaning; keep each one's wording and claim (you may only move it as a unit):
{protected_list}

Nick's standing decision, 2026-10-02: **keep his asides.** Preserve and, where an earlier pass smoothed them away, restore his parenthetical and conversational asides (compare with `git show 45e7274:src/content/posts/{slug}.mdx`). His register is closer to his own 2026-09-17 hand edits than to smoothed text: see `docs/authoring/essay-voice-profile.md` sections 2.8, 2.13, 3 and 6.

Read: the review, `docs/authoring/essay-voice-profile.md`, `docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/voice/nick-voice-rules.md`, `docs/authoring/essay-standard.md`.

Edit only: the essay mdx, `docs/blog-work/{slug}/thread-beats.md`, `docs/blog-work/{slug}/polish/stale-claims.md` (only to correct line numbers or descriptions the review found wrong). Write `docs/blog-work/{slug}/polish/voice2-notes.md`: one line per accepted finding id saying what you did, plus any aside you restored.
""" + COMMON
REVIEW2 = """Target-Node: {node}

Lane: Codex `gpt-6.1-sol`, effort medium (independent cross-family re-review; read-only on the essay).

# Re-review after the fix round

Read `docs/blog-work/{slug}/polish/review.md` (round 1) and `docs/blog-work/{slug}/polish/voice2-notes.md`. Diff the fix round: `git diff {lead} -- src/content/posts/{slug}.mdx docs/blog-work/{slug}/`. Also skim the full net change `git diff 45e7274 -- src/content/posts/{slug}.mdx`.

Check: (1) every round-1 finding is resolved, held for Nick, or still open (say which); (2) nothing in the fix round changed, dropped, strengthened, or added a claim, number, date, receipt, or source, or invented a memory (blocker class); (3) these protected lines still say what they said: {protected_list_inline}; (4) Nick's asides are preserved or restored; (5) the 12-question voice audit per section; (6) hygiene and `check-essay`.

Write exactly one file: `docs/blog-work/{slug}/polish/review2.md` with a verdict (SHIP / FIX-THEN-SHIP / REWORK) and a findings table (id, severity, line, finding, suggested fix). Do NOT edit any other file.
""" + COMMON
for k, e in E.items():
    pl = "\n".join(f"- `{x}`" for x in e["protected"])
    pi = "; ".join(f"`{x}`" for x in e["protected"])
    (HERE / f"{k}-4-voice2.prompt.md").write_text(VOICE2.format(protected_list=pl, **e))
    (HERE / f"{k}-5-review2.prompt.md").write_text(REVIEW2.format(protected_list_inline=pi, **e))
print("ok")
