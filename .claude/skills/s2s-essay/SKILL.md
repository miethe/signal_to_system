---
name: s2s-essay
description: >-
  Bring a Signal to System essay up to the S2S essay standard (Registry Wave anatomy, components,
  voice, arc obligations) and gate it with the essay checklist. Use when polishing, migrating, or
  reviewing an existing essay against the standard, preparing a ready-to-draft packet for a new
  arc essay, or checking whether an essay meets the standard. Triggers: "polish this essay",
  "bring this essay to the standard", "essay standard", "check:essay", "Registry Wave structure",
  "essay packet", "Theses arc essay". Do NOT use for: field notes, companions, dev stories, or
  imagery/illustration work.
version: 0.1
app_version: "2026-10-02"
updated: 2026-10-02
---

# s2s-essay

Front door for essay-shaped work on Signal to System. It owns the *standard* and the *gate*; it
composes the existing skills for everything else: `voice-writer` for voice, `blog-drafter` for the
end-to-end post workflow and publication prep. It never restates their content.

## When To Use

- Polishing or migrating a published essay to the standard (structure, components, voice).
- Reviewing an essay (or a leg's polished output) against the standard.
- Preparing a ready-to-draft packet for a new essay in the Theses arc.
- Running or interpreting `npm run check:essay`.

## When NOT To Use

- Field notes, companions, guides, dev stories: use `blog-drafter` (the standard is essay-only).
- Drafting a brand-new post from a topic: start in `blog-drafter`, then come here before publish.
- Hero art, figures, running-thread images: the separate imagery effort owns them.
- Changing `ReaderShell` or any layout/visual component: that is design work and Nick's gate.

## Overview

The standard is `docs/authoring/essay-standard.md`, derived from the published Registry Wave.
It is a content contract: the reader shell already renders the Registry Wave composition for
every essay. The gate is `scripts/check-essay.mjs` (errors fail, warnings advise); it proves
structure and hygiene, never voice or accuracy.

## Decision Tree

```
INTENT                                    ACTION
──────────────────────────────────────────────────────────────────────────────
"does this essay meet the standard?"   →  npm run check:essay (+ read standard §6)
"polish essay X"                       →  Workflow 1 (migrate → voice → cross-family review)
"prep the next arc essay"              →  Workflow 2 (packet, no prose)
"edit voice only"                      →  voice-writer, calibrated per standard §4
"publish / frontmatter / disclosure"   →  blog-drafter Phase 6
```

## Workflows

### Workflow 1 — polish an existing essay

1. Read the standard and the exemplar (`src/content/posts/the-registry-wave-agentic-artifact-supply-chain.mdx`).
2. **Migrate** (mechanical lane, Codex workhorse): frontmatter, components, imports, glossary and
   evidence records, `## Sources`, `WhereThisSits`; write the running-thread beat manifest to
   `docs/blog-work/<slug>/thread-beats.md` instead of adding image-less `ThreadScene` tags.
   `node scripts/check-essay.mjs <file>` must report no errors.
3. **Editorial re-pass** (taste lane, ICA Opus): voice against `docs/authoring/essay-voice-profile.md`
   and the hand-edit voice rules. Preserve meaning, claims, numbers, receipts. Stale-looking
   claims go to `docs/blog-work/<slug>/polish/stale-claims.md`, not into silent rewrites.
4. **Cross-family review** (Codex frontier): checklist + voice + arc obligations → findings file
   `docs/blog-work/<slug>/polish/review.md`. The lead applies or rejects each finding.
5. Lead verifies under Node 22: `npm run check:essay`, `npm run check:prose`, `npm run verify`;
   bump `updatedDate` (silent republish); PR to `development`, `wip` label until verified.

### Workflow 2 — prepare the next arc essay

Reconcile the essay's existing plan (`docs/blog-work/<slug-or-name>/`) with standard §1 anatomy
and §5 arc obligations: outline in anatomy order, the arc throughline (what each prior essay hands
forward, what this one must pay off), receipts it can cite, open research asks. No prose.

## Guardrails

- Zero em-dashes, verified by the gate, never self-reported.
- No tracker ids, PR numbers, SHAs, or schema field names in body prose.
- Never invent facts, numbers, dates, receipts, or source URLs; evidence records keep unknowns `null`.
- Never run an automated humanize/rephrase pass as the voice fix.
- Never edit the published Registry Wave under this skill; it is the exemplar and Nick's gate.
- Leg egress: published essay content may go to ICA and personal Codex; no private corpus,
  journal, or identity material.

## Deferred / Do Not Say

| Claim | Status |
|---|---|
| "check:essay is part of `npm run verify`" | Deferred until E1/E2/E4 pass; adding it earlier turns verify red. |
| "The gate checks voice" | False. It checks structure and hygiene only. |
| "ThreadScene can be added without images" | False. `threads.ts` beats require an image; the imagery effort wires them. |
| "This skill replaces voice-writer or blog-drafter" | False. It composes them. |

## Key References

- /Users/miethe/dev/homelab/development/signal_to_system/docs/authoring/essay-standard.md
- /Users/miethe/dev/homelab/development/signal_to_system/scripts/check-essay.mjs
- /Users/miethe/dev/homelab/development/signal_to_system/src/content/posts/the-registry-wave-agentic-artifact-supply-chain.mdx
- /Users/miethe/dev/homelab/development/signal_to_system/.claude/skills/voice-writer/SKILL.md
- /Users/miethe/dev/homelab/development/signal_to_system/.claude/skills/blog-drafter/SKILL.md
- /Users/miethe/dev/homelab/development/signal_to_system/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/voice/nick-voice-rules.md
