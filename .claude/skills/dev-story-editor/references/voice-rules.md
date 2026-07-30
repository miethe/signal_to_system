# Voice Rules

Dev Stories are still Signal to System publication content; they carry the site's voice rules
just like essays do, on top of their own automated-provenance framing.

## No em-dashes, ever

This is a hard rule, not a style preference (per project `CLAUDE.md`: "In any human-facing prose
you write, do NOT use em-dashes"). It applies to:

- Every prose section in the body (lede, what-happened, Wins, Losses, meta-findings, AOS-arc).
- Every frontmatter string value (`title`, `excerpt`, `sourceAar` label): these render directly in
  `StoryCard.astro`, `StoryMetaHeader.astro`, and page `<title>`/meta tags.
- Do NOT relax this inside the collapsed raw-AAR appendix by rewriting it. The appendix is
  verbatim AAR text, untouched, so if the source AAR itself contains an em-dash, that's the AAR
  author's prose, not this skill's output, and is left as-is. The rule binds what THIS skill
  writes, not what it quotes.

Replace with parentheses, colons, semicolons, or commas, matching the em-dash's actual grammatical
role:

| Em-dash use | Replacement |
|---|---|
| Aside / parenthetical | `(...)` |
| Introducing an explanation or list | `:` |
| Joining two independent but related clauses | `;` |
| A softer pause than a comma | `,` (usually a comma is enough; don't force a semicolon everywhere) |

Run a literal `—`/`–` (em-dash/en-dash used as a sentence-joiner) grep over the drafted body and
frontmatter strings before finalizing. If `/humanizer` reintroduces one (it can, since it's tuned
for naturalness, not for this site's specific ban), that's the last checkpoint to catch it, not an
excuse to skip the earlier check.

## Humanizer runs last, always

The chain order (`SKILL.md` "The Editorial Chain") is fixed:

```
blog-drafter → voice-writer → humanizer
```

Never run `/humanizer` before `/voice-writer`, and never let a delegate's raw `blog-drafter` output
skip voice calibration on its way to humanizer. The reasons, in order:

1. `/blog-drafter` produces structurally-correct-but-generic prose; it needs voice calibration
   before it sounds like Nick Miethe rather than a competent stranger.
2. `/voice-writer` reads the actual voice specification and prior published posts to calibrate
   sentence-level patterns; running it on already-humanized text would be calibrating against a
   moving target instead of the drafted structure.
3. `/humanizer` is a naturalness pass that reduces AI-detectable patterns; it works best (per its
   own skill description) "on drafts that are already technically sound and voice-calibrated." Run
   it before voice-writer and you'd be polishing prose that's about to be substantially rewritten.

If delegating the `blog-drafter` (and optionally `voice-writer`) step to ICA per SKILL.md "The
Editorial Chain", the delegate returns after step 1 (or step 2); the driving session runs whichever
of steps 2/3 weren't delegated, always ending on `/humanizer` locally before assembling the final
MDX.

## A quick self-check before emitting

- [ ] No `—`/`–` used as a sentence-joiner anywhere in the drafted prose or frontmatter strings.
- [ ] `/humanizer` ran after `/voice-writer`, not before, not instead of it.
- [ ] The prose reads as a story (lede, arc, stakes); if it still reads like a status report with
  headers bolted on, that's a chain failure, not a voice failure, so go back to `blog-drafter`.
