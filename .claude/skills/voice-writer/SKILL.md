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
   This is the canonical, observed-pattern document. Read it completely. It is not aspirational
   — it describes patterns actually present in Nick's writing.

2. **Published posts** — `src/content/posts/` (glob `*.mdx`)
   Read at least one published post in full to calibrate sentence rhythm, heading density,
   and structural pacing before generating anything. If multiple posts exist, prefer the most
   recent one.

Do not begin drafting until both reads are complete.

## Voice Summary (Quick Reference — Do Not Substitute for Reading the Spec)

The following is a compressed reference. The full spec takes precedence on any conflict.

### Core register
- Technical precision + plain-language consequence. Explain the thing, then say what it means
  in practice.
- Opinionated and earned — make calls, pair them with rationale or lived experience.
- Practical over decorative — every section should clarify, compare, caution, or guide.
  If a sentence is polished but does not help the reader understand, choose, avoid, or
  implement something, cut it or rewrite it.
- First-person is appropriate when it strengthens credibility; keep anecdotes topic-anchored.

### Structure
Follow this pattern unless the content clearly calls for a different shape:
1. Ground the topic in a real problem, misconception, or need
2. Define the concept plainly
3. Explain why it matters in practice
4. Break into decision-relevant components or categories
5. Give recommendations with reasons and trade-offs
6. Call out caveats and when not to use it
7. Close with a practical takeaway and optional forward thread to a related topic

Use clear headings and subheadings. Write for scan-ability — break long ideas into sections,
not dense paragraphs. Move from broad framing -> narrower concept -> concrete detail -> named
examples -> recommendation.

### Sentence-level patterns
- Long-to-medium sentences with internal pivots using: however, while, rather than, especially,
  additionally, that said, of course, for example
- Define by contrast: "while X is true, Y matters more"
- Parenthetical or dash-based qualifiers to add nuance without derailing the sentence
- Direct reader address, used sparingly: "If you're running X...", "Consider...", "Whether you're..."
- Concession before assertion, practical narrowing, misconception correction

### Phrase patterns to use naturally (not to force)
"Of course...", "That said...", "In short...", "The key is...", "I personally...",
"I generally recommend...", "Rather than...", "While...", "This is because...",
"Especially if..."

### What to reduce
- Generic AI transition phrases: "delve into", "unlock", "journey", "landscape", "game-changer"
- Empty universals: "in today's fast-paced world", "more important than ever"
- Fake certainty where evidence is thin
- Overly polished motivational transitions
- Excessive summary that restates the obvious

## MDX Output Format

All output must be valid MDX for the `posts` collection. Use this frontmatter structure:

```yaml
---
title: "Post Title"
excerpt: "One-sentence description — direct and specific, not tagline-like"
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

1. Read voice spec and at least one published post (mandatory — see above)
2. Clarify if the input is ambiguous:
   - What problem or misconception is the post addressing?
   - Who is the primary reader? (practitioner, technical leader, both?)
   - Is there a specific recommendation or thesis, or is this more exploratory?
   - Desired content type: essay (long-form, structured argument) or field-note (shorter,
     opinionated, less formal)?
3. Draft a section outline before writing body prose — share it and confirm before expanding,
   unless the user has asked for a full draft directly
4. Write the full MDX draft
5. Self-review against voice spec: flag any sentences that read like generic AI prose, lack
   a practical payoff, or use any of the reduction-list phrases

## Workflow: Editing Existing Content

When given a draft to edit for voice:

1. Read voice spec and at least one published post (mandatory — see above)
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
- [ ] Post opens on a real problem, misconception, or need — not a definition
- [ ] Every section has a practical payoff (clarifies, compares, cautions, or guides)
- [ ] Recommendations include rationale or trade-offs, not just verdicts
- [ ] Reduction-list phrases are absent or flagged for review
- [ ] Frontmatter is complete and uses valid taxonomy values
- [ ] Output is valid MDX
