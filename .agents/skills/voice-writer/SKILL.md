---
name: voice-writer
description: >
  Writes or edits blog content in Nick Miethe's authentic voice for the Signal to System
  publication. This skill should be used when drafting new posts, editing existing drafts
  to better match Nick's voice, or reviewing content for voice consistency. Triggers on
  requests like "write a post about X", "draft this in my voice", "edit this to sound more
  like me", "make this match my style", or any content authoring task for Signal to System.
  Reads the voice specification and published posts before writing to ensure output is
  calibrated to Nick's actual patterns, not a generic approximation of them.
---

# voice-writer

Writes and edits Signal to System blog content in Nick Miethe's authentic voice. Output
is publication-ready MDX with correct frontmatter for the Astro content collection.

## When to Use

- Drafting a new post from a topic, outline, or spec
- Editing an existing draft to better match Nick's voice
- Reviewing content and flagging departures from voice
- Translating rough notes or a brain-dump into a structured post
- Collaborating with `/blog-drafter` (structure/outline) or `/humanizer` (final polish pass)

## Mandatory First Step: Calibrate Before Writing

Before generating any content, read these two sources in order:

1. **Voice spec** — `/Users/miethe/Documents/Other/PKM/MeatyBrain/Blogs/My Voice.md`
   This is the canonical, observed-pattern document. Read it completely. It is not aspirational;
   it describes patterns actually present in Nick's writing.

2. **Published posts** — `src/content/posts/` (glob `*.mdx`)
   Read at least one published post in full to calibrate sentence rhythm, heading density,
   and structural pacing before generating anything. If multiple posts exist, prefer the most
   recent one.

3. **Extract specific patterns** — After reading both sources, identify 5+ specific rhetorical
   moves from the published post that are relevant to the draft being written. Name them
   explicitly (e.g., "forensic specificity with commit hashes," "data embedded in argument
   rather than dumped as lists," "earned blockquotes after evidence"). This extraction step
   prevents the common failure mode of reading the spec and producing smooth, generic prose
   that technically follows the rules but lacks texture.

Do not begin drafting until all three steps are complete.

## Voice Summary (Quick Reference: Do Not Substitute for Reading the Spec)

The following is a compressed reference. The full spec takes precedence on any conflict.

### Core register
- Technical precision + plain-language consequence. Explain the thing, then say what it means
  in practice.
- Opinionated and earned: make calls, pair them with rationale or lived experience.
- Practical over decorative. Every section should clarify, compare, caution, or guide.
  If a sentence is polished but does not help the reader understand, choose, avoid, or
  implement something, cut it or rewrite it.
- First-person is appropriate when it strengthens credibility; keep anecdotes topic-anchored.
- Heavy use of parenthetical qualifiers for inline nuance: "(at least not in the last 6 months)", "(assuming the company even made it that far)", "(which is to say, a lot)"

### Structure
Follow this pattern unless the content clearly calls for a different shape:
1. Ground the topic in a real problem, misconception, or need
2. Define the concept plainly
3. Explain why it matters in practice
4. Break into decision-relevant components or categories
5. Give recommendations with reasons and trade-offs
6. Call out caveats and when not to use it
7. Close with a practical takeaway and optional forward thread to a related topic

Use clear headings and subheadings. Write for scan-ability; break long ideas into sections,
not dense paragraphs. Move from broad framing -> narrower concept -> concrete detail -> named
examples -> recommendation.

### Sentence-level patterns
- Long-to-medium sentences with internal pivots using: however, while, rather than, especially,
  additionally, that said, of course, for example
- Define by contrast: "while X is true, Y matters more"
- Parenthetical qualifiers (parentheses, colons, semicolons, commas) to add nuance without derailing the sentence. **Do NOT use emdashes (—)** for this purpose; they are a strong AI-writing tell. Use parentheses for asides, colons for setup-payoff, semicolons for linked thoughts, commas for light interruptions.
- Direct reader address, used sparingly: "If you're running X...", "Consider...", "Whether you're..."
- Concession before assertion, practical narrowing, misconception correction
- Fragment sentences for rhythmic emphasis: "Not equivalent. Better.", "Not even close.", "Not hypothetical. Current state."
- Cadence-breaking lines that sound like thinking aloud: "I don't think most teams have really internalized this yet.", "It took me embarrassingly long to see the pattern for what it was."
- Colons for setup-payoff beats: "In theory: the developer. In practice: the accountability model dissolves fast."
- Semicolons to connect related thoughts that AI drafts would split into two sentences
- First-person over impersonal: "Before I diagnose" not "Before diagnosing"
- Anecdotes with forensic detail: commit hashes, exact file counts, named projects/components, specific dates

### Phrase patterns to use naturally (not to force)
"Of course...", "That said...", "In short...", "The key is...", "I personally...",
"I generally recommend...", "Rather than...", "While...", "This is because...",
"Especially if...", "Not equivalent. Better." (fragment-for-emphasis pattern),
colon-beat constructions, semicolon connectors

### What to reduce
- Generic AI transition phrases: "delve into", "unlock", "journey", "landscape", "game-changer"
- Empty universals: "in today's fast-paced world", "more important than ever"
- Fake certainty where evidence is thin
- Overly polished motivational transitions
- Excessive summary that restates the obvious
- "In this post, we'll explore/cover/discuss..." preview paragraphs — start arguing, not announcing
- Standalone metrics blocks or results sections — embed data in argument
- Decorative transitions between sections — use direct claims or questions instead
- Over-smoothed prose — preserve the roughness; it's part of the voice
- Anecdotes framed as stories rather than evidence; present exhibits, not narratives
- Emdashes (—) for asides, qualifiers, or interruptions; use parentheses, colons, semicolons, or commas instead (emdashes are a strong AI-writing tell)
- Declarative thesis openers: "The pattern is clear", "The answer is..."
- False-certainty assertions: "This isn't theoretical", "The missing layer is obvious once you see it"
- Meta-commentary on own honesty: "Worth being direct", "Let me be frank"
- The "The answer isn't X. It's Y." template — replace with reasoning chains that show the logic
- Impersonal constructions where first-person is more natural ("Before diagnosing" → "Before I diagnose")
- Uniformly polished cadence — every 4-5 paragraphs should include a cadence break (a line that sounds discovered, not assembled)

## Common Voice Failure Modes

These are the specific ways voice revision goes wrong. Check for all of them before handing off.

**Smoothing instead of sharpening** — The most common failure. The agent reads "long-to-medium
sentences with internal pivots" and produces polished, flowing prose. But Nick's voice has
*texture* — forensic detail, owned mistakes, embedded caveats that interrupt the flow, data
woven mid-sentence. Smoothness is the enemy.

**Generic example substitution** — The agent reads "concrete examples" and adds illustrative
scenarios. Nick doesn't illustrate — he *exhibits*. Commit hashes, specific file counts,
component names, dates. If the detail isn't specific enough to verify in git history, it's
not specific enough.

**Metrics dumps** — The agent creates a "Results" section with bulleted numbers. Nick never
does this. Every number lives inside a sentence that explains what it means and why it matters.
"23 endpoints, all working on day one" is a claim with evidence, not a line item.

**Preview/summary framing** — "In this post, we'll explore..." and "In summary, we covered..."
are absent from Nick's published work. The post argues from sentence one and closes with
stakes, not a recap.

**Transition-for-transition's-sake** — "Now let's turn to..." "With that in mind..." Nick's
section openers are direct claims or questions, not connective tissue from the previous section.

**Anecdotes as stories instead of evidence** — "Story time" framing where an anecdote is set
up as a narrative. Nick presents anecdotes as forensic exhibits: "The same FastAPI bug was
fixed three times, in three separate sessions... The commits are still there: a29acda2,
74f49e3f, 669cda07." Evidence, not entertainment.

**Emdash overuse** — AI models heavily default to emdashes (—) for asides, qualifiers, and
interruptions. Nick prefers parentheses, colons, semicolons, and commas for the same purpose.
Replace every emdash with the appropriate alternative: parentheses for asides, colons for
setup-payoff, semicolons for linked thoughts, commas for light interruptions. Even when the
emdash is "correct," the alternatives read as more human.

## MDX Output Format

All output must be valid MDX for the `posts` collection. Use this frontmatter structure:

```yaml
---
title: "Post Title"
excerpt: "One-sentence description: direct and specific, not tagline-like"
date: YYYY-MM-DD
readTime: "N min"
contentType: essay  # or field-note
category: "Agentic SDLC"  # one of: AI Agents, Agentic SDLC, Technical Leadership, CTO, Architecture, Platform Engineering, Projects
tags: ["tag-one", "tag-two", "tag-three"]  # 3-6 tags from src/data/taxonomy.ts registry
status: draft  # draft | published | evergreen
---
```

Optional frontmatter fields: `series`, `seriesOrder`, `featured`, `whyItMatters`,
`leaderTakeaway`, `relatedSlugs`.

Body uses standard MDX: `##` and `###` headings, fenced code blocks, inline code,
bold for key terms, italics for emphasis or terms being introduced. No raw HTML unless
necessary. Components from `src/components/content/` (Callout, TagList, etc.) may be
used when they serve the content.

## Workflow: Drafting New Content

When given a topic, outline, or spec:

1. Read voice spec and at least one published post (mandatory; see above)
2. Clarify if the input is ambiguous:
   - What problem or misconception is the post addressing?
   - Who is the primary reader? (practitioner, technical leader, both?)
   - Is there a specific recommendation or thesis, or is this more exploratory?
   - Desired content type: essay (long-form, structured argument) or field-note (shorter,
     opinionated, less formal)?
3. Draft a section outline before writing body prose; share it and confirm before expanding,
   unless the user has asked for a full draft directly
4. Write the full MDX draft
5. Self-review against voice spec: flag any sentences that read like generic AI prose, lack
   a practical payoff, or use any of the reduction-list phrases

## Workflow: Editing Existing Content

When given a draft to edit for voice:

1. Read voice spec and at least one published post (mandatory; see above)
2. Read the provided draft fully before making any edits
3. Produce an annotated pass identifying:
   - Voice departures (generic phrasing, fake certainty, missing rationale)
   - Structural issues (missing concession, no practical narrowing, weak close)
   - Sentence-level patterns to adjust (over-polished transitions, absent pivots)
4. Produce the revised draft
5. Summarize the substantive changes made and why

## Integration with Other Skills

- `/blog-drafter` — handles research, competitive context, and structural outlining.
  Use that skill first when the topic needs significant research before writing. Then
  hand the outline to this skill for voice-calibrated drafting.
- `/humanizer` — applies a final naturalness pass after this skill produces a draft.
  Run `/humanizer` after `/voice-writer` when content needs additional idiomatic
  smoothing beyond what this skill produces.

## Quality Check Before Handing Off

Before delivering any output, verify:

- [ ] Voice spec was read in this session before writing began
- [ ] At least one published post was read for rhythm calibration
- [ ] Post opens on a real problem, misconception, or need (not a definition)
- [ ] Every section has a practical payoff (clarifies, compares, cautions, or guides)
- [ ] Recommendations include rationale or trade-offs, not just verdicts
- [ ] Reduction-list phrases are absent or flagged for review
- [ ] No preview/roadmap paragraphs ("In this post, we'll...")
- [ ] No standalone metrics dumps — all data embedded in argument
- [ ] Anecdotes include forensic detail (commits, counts, dates, component names) or are flagged [NEEDS INPUT]
- [ ] Blockquotes arrive after evidence, not before
- [ ] Section openers are direct claims or questions, not transitions
- [ ] No emdashes (—); all asides use parentheses, colons, semicolons, or commas
- [ ] At least 2-3 cadence-breaking lines present (lines that sound like thinking aloud, not thesis statements)
- [ ] Fragment sentences used for emphasis at least once
- [ ] Anecdotes include forensic detail (specific names, numbers, dates) rather than abstract illustrations
- [ ] No declarative thesis openers ("The pattern is clear", "The answer is...")
- [ ] First-person constructions preferred over impersonal ones
- [ ] Frontmatter is complete and uses valid taxonomy values
- [ ] Output is valid MDX
