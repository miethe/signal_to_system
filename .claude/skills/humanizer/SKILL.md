---
name: humanizer
description: >
  Apply a corpus-sourced idiosyncrasy pass to blog drafts to reduce AI-detectable patterns.
  Use after /voice-writer has produced a draft, or on any content that reads too much like
  polished AI output. Preserves Nick Miethe's voice characteristics by retrieving and inserting
  verified, corpus-sourced personal material (a real story, a real technical detail, a real
  opinion) rather than manufacturing imperfection. Works best when applied to drafts that are
  already technically sound and voice-calibrated. Never sources or delegates corpus material to
  an external model; see the Local-Only Corpus Boundary below.
---

# humanizer

Applies a post-processing pass to blog drafts to reduce AI-detectable patterns while preserving
the author's voice. This skill enhances naturalness, readability, and human authenticity without
compromising technical precision or structural integrity.

## When to Use

- After `/voice-writer` has produced a draft that is technically sound but reads too polished
- On any content that sounds overly structured or formulaic despite being voice-calibrated
- When AI detection tools might flag the content, but the underlying ideas are strong
- Before final publication via `/blog-drafter` when a final naturalness pass is needed
- On editing passes where content needs to feel less "crafted" and more conversational

Do NOT use this skill on:
- Content that is still being researched or outlined (use `/voice-writer` or `/blog-drafter` first)
- Technical documentation that requires formal precision over conversational flow
- Content where naturalness would compromise clarity or accuracy

## Mandatory First Step: Preserve the Voice

Before running the Idiosyncrasy Insertion pass (below), read these sources in order:

1. **Voice spec** — `/Users/miethe/Documents/Other/PKM/MeatyBrain/Blogs/My Voice.md`
   Read this completely. The humanizer must NOT override Nick's established voice: it enhances
   naturalness within his existing patterns by inserting corpus-sourced material, not by
   manufacturing it.

2. **The draft being humanized** — Read it in full before making any edits.

The humanizer is an enhancement layer, not a rewrite. Preserve the core voice, structure, and
point of view. You are making it sound more naturally written, not changing it into something
different.

## Idiosyncrasy Insertion (replaces "Humanization Techniques")

This skill no longer manufactures naturalness. It never invents a hedge, a false start, a
minor redundancy, or a "slightly unexpected but accurate" word substitution as a mechanical
technique. Per the site's own reviewed doctrine: manufactured imperfection is the "AI humanizer"
pattern, and it is explicitly the wrong fix. LLMs write expository prose well enough now that
*good* expository writing itself can read as AI-generated, so degrading it on purpose is both
counterfeit and, per external review, easy to spot as counterfeit.

**What this pass does instead:** pull specific, verifiable idiosyncrasy material from the local
corpus store (see Local-Only Corpus Boundary below) and use it verbatim or near-verbatim:

- A real story only Nick could tell (an actual incident, dated if the corpus has a date for it).
- A real, specific technical detail that reveals firsthand knowledge (not a generic technical
  aside; a detail that could only come from having actually built the thing).
- A real stated opinion, in Nick's actual vocabulary as attested by the corpus, not a paraphrase.
- A real place where Nick was genuinely uncertain, if the corpus attests one relevant to this
  post's claim.

**What this pass never does:**
- Insert a hedge word, a false start, or a "redundancy" that is not corpus-attested.
- Substitute a "slightly unexpected but accurate" synonym as a naturalness technique.
- Run as a context-free checklist against the draft's prose alone, with no corpus lookup.
- Treat the static voice-spec file (`My Voice.md`) as a substitute for corpus material. The
  voice-spec file describes register and tone; it is not a source of verifiable specific
  material, and using it alone for this pass reproduces the manufactured-imperfection problem one
  layer removed (a *learned style* rather than a *retrieved fact*).

If the corpus has nothing relevant to insert for a given section, **this pass does nothing to that
section.** Leaving a section un-"humanized" is the correct outcome, not a failure to complete the
pass.

### Local-Only Corpus Boundary

The corpus this pass reads from (personal chat history, journals, prior writing, or any other
store of verifiable idiosyncratic material) is **local-only, always**. This constraint holds
regardless of how this skill is invoked:
- No corpus content may be sent as input to any external-gateway model call: ICA
  (`~/ica-claude.sh`), Codex, Gemini, or any other non-local provider, under any circumstance,
  including when this pass is itself delegated for cost or speed reasons.
- If a future revision of this skill wires it to a real corpus store and that store is queried by
  a subagent or delegate, the delegate must run against a **local model only**, or the corpus
  query and the drafting/formatting step must be split so the corpus material is resolved locally
  and only the corpus-free output is handed to any external step.
- This mirrors the CHCW corpus egress rule at the launchpad level
  (`docs/policies/corpus-access-policy.md` and `.claude/rules/aos-operating-rules.md` § CHCW
  corpus, in `agentic_meta_dev`): reads are consented; egress and influence on an external party
  are not, absent explicit per-item sign-off, which this skill has no mechanism to obtain and
  should not attempt to obtain in an automated pass.

## Critical Constraints

Humanization must never compromise:
- **Technical accuracy**: Do not sacrifice precision for naturalness
- **Nick's voice**: Enhance it, do not replace it or move it in a different direction
- **Structural integrity**: Keep the section-heavy, skimmable format Nick prefers
- **Practical payoff**: Every section should still clarify, compare, caution, or guide
- **Factual correctness**: Do not introduce errors or weaken arguments for the sake of flow

If a change feels like it reduces clarity, undermines an argument, or sounds unlike Nick's
established voice, do not make it.

## Workflow

1. **Read the voice spec** — `/Users/miethe/Documents/Other/PKM/MeatyBrain/Blogs/My Voice.md`
   (complete read, not skimming)

2. **Read the draft in full** — Understand its argument, structure, and current voice before editing

3. **Identify sections that would benefit from real idiosyncrasy**: Mark sections that:
   - Sound formulaic or mechanically structured, and could carry a real story, opinion, or
     technical detail instead
   - Contain reduction-list phrases used excessively
   - Use emdashes (—) for asides, qualifiers, or interruptions

4. **Query the local corpus store and insert only what it attests** (see Idiosyncrasy Insertion
   above). Do NOT rewrite everything. Target only the sections marked in step 3, and only where
   the corpus has genuinely relevant material. A section with nothing corpus-attested to insert
   is left untouched.

5. **Output revised draft**: complete draft with all frontmatter intact

6. **Summarize changes** — List substantive shifts in voice, structure, or phrasing, and why

## Quality Check Before Handing Off

Before delivering output, verify:

- [ ] Voice spec was read before editing began
- [ ] Draft was read in full before making changes
- [ ] Nick's voice is preserved and enhanced, not replaced
- [ ] Technical accuracy and factual correctness are unchanged
- [ ] Section-heavy, skimmable structure is maintained
- [ ] All practical payoff (clarify, compare, caution, guide) remains intact
- [ ] Changes improve readability without introducing errors
- [ ] Reduction-list phrases are removed or used intentionally (rarely)
- [ ] No emdashes (—); all asides use parentheses, colons, semicolons, or commas
- [ ] Every inserted idiosyncrasy is corpus-attested; nothing was manufactured to *read as* personal
- [ ] A section with no relevant corpus material was left untouched, not "humanized" anyway
- [ ] No corpus content was sent to any external-gateway model call (see Local-Only Corpus Boundary)
- [ ] Frontmatter is complete and untouched
- [ ] Output is valid MDX

## Integration with Other Skills

- `/voice-writer` — produces voice-calibrated drafts. Use `/humanizer` after this skill outputs
  a draft that is technically sound but needs a naturalness pass.
- `/blog-drafter` — handles research and structural outlining. Humanizer is the final pass
  before publishing content that `/blog-drafter` has shaped.

This skill is the last stop before publication. It does not add structure or research — it
enhances naturalness and readability in content that is already correct and voice-aligned.
