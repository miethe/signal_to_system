---
name: humanizer
description: >
  Apply a naturalness and humanization pass to blog drafts to reduce AI-detectable patterns.
  Use after /voice-writer has produced a draft, or on any content that reads too much like
  polished AI output. Preserves Nick Miethe's voice characteristics while adding sentence
  variation, unexpected word choices, natural imperfections, and conversational flow. Works
  best when applied to drafts that are already technically sound and voice-calibrated.
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

Before applying any humanization techniques, read these sources in order:

1. **Voice spec** — `/Users/miethe/Documents/Other/PKM/MeatyBrain/Blogs/My Voice.md`
   Read this completely. The humanizer must NOT override Nick's established voice — it enhances
   naturalness within his existing patterns.

2. **The draft being humanized** — Read it in full before making any edits.

The humanizer is an enhancement layer, not a rewrite. Preserve the core voice, structure, and
point of view. You are making it sound more naturally written, not changing it into something
different.

## Humanization Techniques

### Perplexity & Vocabulary Control
- Replace predictable word choices with slightly unexpected but accurate alternatives
- Vary vocabulary across sentences (avoid repeating the same technical terms immediately)
- Include colloquialisms and natural speech patterns where they fit Nick's voice
- Add subtle imperfections that humans naturally make (minor redundancies, false starts that
  get corrected, natural speech cadence)

Examples:
- Instead of "The key consideration is X" → "X is really what matters here"
- Instead of "It is important to understand" → "You need to grasp"
- Instead of "Specifically" → "For example" or "Concretely" (vary these throughout)

### Burstiness & Sentence Variation
- Mix very short sentences (3-5 words) with longer, complex ones (25+ words)
- Alternate sentence structures: vary between simple, compound, complex, and compound-complex
- Start sentences with different elements: adverbs, questions, dependent clauses, prepositional phrases
- Use parenthetical asides for authentic flow (Nick's voice already supports this)
- **Do NOT use emdashes (—)** for asides or interruptions; replace with parentheses, colons, semicolons, or commas (emdashes are a strong AI-writing tell)
- Include occasional sentence fragments where natural

Examples:
- "This matters. Why? Because..." (short, question, explanation)
- "While X is technically true, Y actually changes how you should think about it." (long with pivot)
- "Performance. Reliability. Cost. Pick two." (fragment list)

### Emotional Intelligence & Human Touch
- Add personal qualifiers and hesitations where authentic: "I think," "arguably," "probably," "it seems"
- Use contractions naturally throughout ("it's," "don't," "that's") — Nick's voice supports this
- Include direct reader address: "If you're in this situation..." or "Consider..."
- Add subtle humor or personality where appropriate (not forced)
- Mix formal and informal vocabulary within the same passage (not jarring, but natural)

Examples:
- Instead of "The correct approach is..." → "I'd probably reach for..."
- Instead of "It is recommended..." → "You're better off..."
- Add a conversational aside: "Which, frankly, is why most people get this wrong."

### Structural Pattern Disruption
- Avoid overly formulaic introduction-body-conclusion flow within sections
- Include tangential thoughts or natural digressions that tie back to the main point
- Use irregular paragraph lengths (some very short, others longer)
- Break conventional transitions with more conversational ones
- Occasionally start mid-thought or with an observation rather than a formal topic sentence

Examples:
- Instead of formal transition: "Now let's examine..." → "Here's where it gets tricky..."
- Vary paragraph structure: one-sentence paragraphs next to multi-paragraph blocks
- Start a section with an observation rather than a question or topic sentence

### Contextual Authenticity
- Replace generic statements with concrete details and specific examples
- Use personal metaphors and analogies that feel chosen (not generic)
- Reference lived experience or actual patterns observed
- Use conversational transitional phrases: "In practice," "From what I've seen," "It turns out"
- Ground abstract concepts in real-world trade-offs

Examples:
- Instead of "Teams often struggle with this" → "In every org I've worked with..."
- Instead of generic example → specific tool, framework, or concrete scenario
- Ground concepts: "This matters in practice because X actually changes how you..."

### Detection-Specific Counters
- Remove or replace AI-era reduction phrases: "delve into," "unlock," "journey," "landscape,"
  "game-changer" (unless used intentionally for specific effect)
- Avoid empty universals: "in today's fast-paced world," "more important than ever"
- Replace fake certainty with qualified statements where evidence is thin
- Vary sentence openers to avoid patterns (don't start many sentences with "This" or "The")
- Add natural imperfections: self-corrections that feel authentic, minor word choices that
  show thinking rather than polish

Examples:
- Instead of "Game-changing approach..." → "Actually useful approach..."
- Instead of "In today's world..." → "Right now, what I'm seeing is..."
- Add self-correction: "The key metric (or really, the one that matters most) is..."

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

3. **Identify AI-detectable patterns** — Mark sections that:
   - Use predictable word choices or phrasing
   - Have overly polished transitions
   - Sound formulaic or mechanically structured
   - Lack conversational flow or natural qualification
   - Contain reduction-list phrases used excessively
   - Use emdashes (—) for asides, qualifiers, or interruptions

4. **Apply humanization selectively** — Do NOT rewrite everything. Target:
   - Sentence-level word choice and structure variation
   - Transitions and connectors (make them more conversational)
   - Phrasing of recommendations (add qualifiers, personal voice)
   - Paragraph structure (vary length, break up dense blocks)
   - Opening and closing sentences (avoid formula)

5. **Output revised draft** — Complete, humanized MDX with all frontmatter intact

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
- [ ] Sentence variation and conversational flow have improved
- [ ] Frontmatter is complete and untouched
- [ ] Output is valid MDX

## Integration with Other Skills

- `/voice-writer` — produces voice-calibrated drafts. Use `/humanizer` after this skill outputs
  a draft that is technically sound but needs a naturalness pass.
- `/blog-drafter` — handles research and structural outlining. Humanizer is the final pass
  before publishing content that `/blog-drafter` has shaped.

This skill is the last stop before publication. It does not add structure or research — it
enhances naturalness and readability in content that is already correct and voice-aligned.
