# Phase 5: Review & Revision Checklist

This document guides editorial feedback during Phase 5 review. Use for both self-review and feedback loops.

## Self-Review Checklist (Complete)

Run through all items before producing feedback. Flag issues with specific line refs or section names.

### Thesis & Argument

- [ ] Thesis is clear and stated early (by end of introduction)
- [ ] Thesis is defensible (not overstated, not hedged beyond recognition)
- [ ] Post offers meaningful insight or useful guidance (not just explanation)
- [ ] Core argument builds logically from setup to conclusion
- [ ] No major logical gaps or unsubstantiated leaps

### Content & Claims

- [ ] All major claims are supported by spec, research materials, or lived experience
- [ ] No factual errors or misattributions
- [ ] Research claims are grounded (use `/notebooklm` to verify if uncertain)
- [ ] Thin-sourced claims are flagged or removed (not invented)
- [ ] Code examples are tested and correct
- [ ] Links and references are valid

### Structure & Scannability

- [ ] Opening grounds topic in real problem or misconception
- [ ] Clear headings and subheadings (no dense blocks)
- [ ] Progressive specificity: broad framing → narrow concept → concrete detail → example → recommendation
- [ ] Every section has practical payoff (clarifies, compares, cautions, or guides)
- [ ] No filler sections that don't earn their space
- [ ] Transitions between sections are clear (not abrupt)
- [ ] Closing ties back to opening problem and provides practical takeaway

### Tone & Voice

- [ ] Tone matches published Signal to System posts (confident, technical, practical, mildly conversational)
- [ ] Voice patterns present:
  - [ ] Long-to-medium sentences with internal pivots (hinge words: however, while, rather than, especially, additionally)
  - [ ] Contrast definitions (setting boundaries around ideas)
  - [ ] Embedded side remarks and caveats (parenthetical, dash-based qualifications)
  - [ ] Direct reader address (when, if, consider, naturally present)
  - [ ] First-person experience when relevant ("I recommend", "in my experience")
  - [ ] Category-based organization (breaking broad topics into decision buckets)
  - [ ] Concrete examples and named tools (not abstract or generic)
  - [ ] Caveats and constraints stated clearly
- [ ] Nuanced recommendation language (best when paired with trade-offs or rationale)
- [ ] Trade-off framing present ("X has this advantage, but Y matters more because...")
- [ ] "Here is what matters in practice" energy (not just theory)

### AI-Detectable Language (Reduction List)

Reduce or remove these patterns:

- [ ] Empty universals ("in today's fast-paced world", "more important than ever")
- [ ] Generic AI phrasing ("delve into", "unlock", "journey", "landscape", "game-changer") — use sparingly and only where intentional
- [ ] Fake certainty where evidence is thin
- [ ] Excessive trailing summaries that restate the obvious
- [ ] Product-brochure energy (overly polished, promotional)
- [ ] Repetitive phrases or formulaic transitions
- [ ] Overly polished motivational language

### Series Awareness & Continuity

- [ ] If post is part of a series, review `references/series-*.md` for context
- [ ] Key series concepts are properly seeded in this post
- [ ] Post maintains continuity with earlier posts in the series
- [ ] Series-specific terminology is consistent with prior posts
- [ ] Post-to-post dependencies are clear (if any)
- [ ] No contradictions with series thesis or prior posts

### Practical Payoff

Every major section should enable the reader to:
- Clarify their thinking
- Compare options
- Caution against risks
- Guide a decision or action

- [ ] Introduction clarifies why the topic matters
- [ ] Concept sections explain the "what" and "why"
- [ ] Decision sections help readers choose between options
- [ ] Recommendation sections provide rationale (not just verdicts)
- [ ] Caveat sections state boundaries clearly (when NOT to use this)
- [ ] Conclusion provides actionable takeaway

### Technical Depth

- [ ] Technical accuracy verified (no hand-waving or made-up details)
- [ ] Technical terms are explained (not just named)
- [ ] Depth matches audience (CTOs/architects/practitioners — assume intelligence, not expertise)
- [ ] Code examples use correct syntax and patterns
- [ ] Architectural or operational details are sound

### Frontmatter Readiness

- [ ] Title is clear and specific (not generic or tagline-like)
- [ ] Excerpt is one sentence, direct, and specific
- [ ] contentType is appropriate (essay or field-note)
- [ ] category matches one of 7 fixed categories
- [ ] tags are from `src/data/taxonomy.ts` registry (3–6 tags)
- [ ] status is set to `published` or `evergreen`

## Feedback Annotation Convention

When flagging issues for revision, use these markers:

### `[NEEDS INPUT: ...]`

Use when author input, research, or clarification is required:

```
[NEEDS INPUT: Verify the exact date when SkillMeat was launched. Check git history.]

[NEEDS INPUT: Provide a concrete example of "architectural drift" from a real project.]

[NEEDS INPUT: Clarify whether CLAUDE.md governance applies to external integrations.]
```

### Voice Departures

Flag sections that sound generic or lack practical payoff:

```
VOICE: This sentence sounds generic AI. Rewrite with concrete example:
"Understanding these patterns is crucial for long-term success."
→ Consider: "Without these patterns, your agents will consistently [concrete failure mode]."
```

### Structural Issues

```
STRUCTURE: Missing concession before this assertion. Try acknowledging the downside first:
"Context windows are expensive, but here's why they're worth it: ..."
```

### Suggested Revisions

Provide 3–5 specific revisions with rationale:

```
TOP REVISION #1: Section "The Control Plane Concept"
Rationale: Introduces the control plane in abstract terms. Add a concrete example (e.g., "In SkillMeat, this looks like...").
Suggested action: Ground the definition in a real system or workflow.

TOP REVISION #2: Closing paragraph
Rationale: Reads as generic summary. Needs to circle back to the opening problem.
Suggested action: Connect back to the "shadow AI" crisis from the introduction.
```

## Voice Guardrails

### Keep

- Nuanced recommendation language
- Trade-off framing (X is valuable, but Y matters more because...)
- "Here is what matters in practice" energy
- Technical precision with plain-language explanations
- First-person experience when it strengthens credibility
- Category-based organization for clarity
- Concrete examples and named tools
- Caveats and constraints stated clearly

### Reduce

- Overly polished motivational transitions
- Empty universals ("in today's fast-paced world")
- Generic phrasing ("delve into", "landscape", "game-changer") — use sparingly and intentionally
- Fake certainty where evidence is thin
- Excessive summary language
- Product-brochure tone

### Structural Pattern (Nick's Default)

Posts typically follow this arc:

1. **Ground in real problem, misconception, or need** — Hook the reader with a concrete pain point or false assumption
2. **Define the concept plainly** — Explain what you're talking about in accessible terms
3. **Explain why it matters in practice** — Translation from abstract to decision-relevant
4. **Break it into decision-relevant parts** — How do readers think about this?
5. **Give recommendations with reasons** — Verdict + rationale, not just best/worst
6. **Call out caveats, trade-offs, and when not to use** — Boundaries matter
7. **Close with practical takeaway and optional next-step thread** — Actionable, forward-looking

## Anti-Patterns to Flag

- **Flattened opinions**: Don't neutralize Nick's voice into encyclopedia prose. Keep the conviction.
- **Added hype**: Don't inject breathless futurism or "game-changing" language. Let the substance speak.
- **Over-explanation**: Don't assume technical readers need basic definitions. Trust the audience.
- **Purely skeptical tone**: Don't let a post read as entirely dismissive. Frame problems as solvable.
- **Unasked revisions**: Don't revise sections beyond the feedback scope. Stay focused on the flagged issues.
- **Unsourced claims**: Don't generate research claims without grounding. Use `/notebooklm` to verify.

## Review Output Format

When producing editorial feedback, structure it as:

```
## Editorial Feedback: [Post Title]

### Overall Assessment
[1-2 sentence summary of strengths and main issues]

### Thesis & Argument
[Assessment of clarity, defensibility, logical flow]

### Voice & Tone
[Specific feedback on voice alignment, AI-detection flags, strengths]

### Structure
[Assessment of headings, progressive specificity, practical payoff per section]

### Series Fit (if applicable)
[Assessment of continuity, concept seeding, alignment with series thesis]

### Specific Issues & Revisions

#### [NEEDS INPUT: ...]
[List any sections requiring author research or clarification]

#### Top Revisions (3–5 suggested with rationale)
[Specific, actionable feedback with rationale]

### Recommended Next Steps
- If major revisions: Return to Phase 4 (full rewrite of flagged sections)
- If minor polish: Proceed to Phase 6 with suggested revisions
- If voice integration needed: Consider `/voice-writer` or `/humanizer` pass
```

## Revision Mode (Revise Shortcut)

When running in `revise` mode:

- Apply editorial feedback directly to the draft
- Preserve voice and structure (don't over-police)
- Make syntax/clarity fixes automatically
- Flag sections where author input is still needed with `[NEEDS INPUT: ...]`
- Return a revised draft ready for Phase 6 or author review

## Story-Craft Mode (Series-Level Evaluation)

When running in `story` mode:

- Evaluate the entire series narrative (all posts together)
- Assess post sequencing: Does the order build logically?
- Concept timing: Are key ideas introduced when needed?
- Payoff structure: Does the series build toward a coherent finale?
- Repetition: Are ideas unnecessarily rehashed across posts?
- Gaps: Are there missing connective tissue between posts?
- Return series-level recommendations for reordering or new posts
