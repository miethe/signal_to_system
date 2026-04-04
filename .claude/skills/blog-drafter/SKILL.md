---
name: blog-drafter
description: >
  Orchestrate the full blog drafting workflow for Signal to System, from post spec through
  drafting, review, and publication prep. Use when starting a new blog post from a topic or
  idea, continuing a draft from a post spec, reviewing and revising an existing draft, or
  preparing content for publication. Handles post design, research integration, MDX drafting
  with complete frontmatter, self-review, and final publication preparation. Coordinates with
  /voice-writer for voice calibration and /humanizer for final polish.
---

# blog-drafter

Orchestrates the full blog drafting workflow for Signal to System, from topic through publication.
Manages post design, spec creation, research integration, MDX drafting, review, and publication
preparation. Works in coordination with `/voice-writer` (voice calibration), `/humanizer` (final
polish), `/notebooklm` (research grounding), `/gemini-cli` (web search), and `/nano-banana`
(diagrams/images).

## When to Use

- **Starting a new post from a topic or idea** — begins at Phase 3 (Post Design)
- **Continuing from an existing post spec** — begins at Phase 4 (Drafting)
- **Reviewing/revising an existing draft** — begins at Phase 5 (Review)
- **Preparing a draft for publication** — begins at Phase 6 (Publication Prep)

## Entry Points and Workflow Phases

The skill adapts based on what you provide. Each entry point corresponds to a phase:

### Phase 3: Post Design (Topic → Spec)

**Triggered by**: Topic, idea, or raw concept

**Actions**:
1. Clarify the post angle, structure, and scope:
   - What problem or misconception is this addressing?
   - Who is the primary audience? (practitioner, technical leader, both?)
   - Desired content type: essay (long-form, structured argument) or field-note (shorter,
     opinionated, less formal)?
   - Does this belong to an existing series in the PKM `Blogs/` directory? If so, note the
     series context and order.

2. Create a post spec using the template at `docs/templates/post-planning.md`:
   - Working title and excerpt
   - Thesis or core argument
   - Section outline (3-6 sections)
   - Key claims and where they come from (research sources, experience, analysis)
   - Related or prerequisite posts in Signal to System
   - Any series information

3. Save the spec to `docs/specs/[post-slug]-spec.md`

4. Proceed to Phase 4 (Drafting)

### Phase 4: Drafting (Spec → MDX Draft)

**Triggered by**: Post spec file (either from Phase 3 or provided by the user)

**Actions**:
1. **Read calibration materials** (mandatory before writing):
   - Voice spec at `/Users/miethe/Documents/Other/PKM/MeatyBrain/Blogs/My Voice.md` — fully
   - At least one published post from `src/content/posts/` (prefer the most recent) — fully
   - Post spec provided or created in Phase 3

2. **Research integration** (if needed):
   - If the spec references research materials, PKM notebooks, or context packs, read them
   - Check PKM `Blogs/` directory for any series materials, previous posts in the same series,
     or related thinking
   - Use `/notebooklm` skill if research needs to be source-grounded
   - Use `/gemini-cli` skill for web search or second opinions
   - Flag any gaps where source material is thin — do not invent factual claims

3. **Draft MDX**:
   - Write in `docs/drafts/[post-slug]-draft.mdx`
   - Include complete frontmatter (see Content Schema below)
   - Follow voice spec and structural patterns from published posts
   - Structure: problem/misconception → concept definition → practical why → decision-relevant
     components → recommendations with rationale → caveats/when-not-to-use → practical takeaway
   - Use clear headings, subheadings, and scannable prose
   - Include code blocks, examples, and named tools where relevant
   - Never freewheel from thin air — always ground claims in the spec and research materials

4. Proceed to Phase 5 (Review)

### Phase 5: Review (Draft → Annotated Feedback)

**Triggered by**: Existing draft file

**Actions**:
1. **Read the draft fully** before producing any feedback

2. **Self-review checklist**:
   - [ ] Thesis is clear and defensible
   - [ ] Post offers meaningful insight or useful guidance, not just explanation
   - [ ] Content is novel relative to existing Signal to System posts and common internet takes
   - [ ] All major claims are supported by the spec, research materials, or lived experience
   - [ ] Writing is skimmable: clear headings, segmented blocks, progressive specificity
   - [ ] Tone and register match published posts (not generic AI, not too academic, not too
         promotional)
   - [ ] Every section has a practical payoff (clarifies, compares, cautions, or guides)
   - [ ] Voice spec patterns are present: long-to-medium sentences with internal pivots, contrast
         definitions, embedded caveats, occasional direct reader address
   - [ ] Reduction-list phrases (generic AI language) are absent or minimal

3. **Produce annotated feedback**:
   - Flag sections needing author input with `[NEEDS INPUT: description]`
   - Identify voice departures (sentences that sound generic, lack practical payoff, or use
     reduction-list phrases)
   - Note structural issues (missing concession, weak close, unclear thesis)
   - Suggest top 3-5 specific revisions with rationale

4. **Share feedback** and suggest which phases to enter next:
   - If major revisions needed → return to Phase 4 (Drafting)
   - If minor polish needed → proceed to Phase 6 (Publication Prep)
   - If voice polish needed → offer `/voice-writer` or `/humanizer` integration

5. Proceed to Phase 6 when ready (Publication Prep)

### Phase 6: Publication Prep (Draft → Published)

**Triggered by**: User signal "ready to publish" or "move to src/content/"

**Actions**:
1. **Finalize frontmatter**:
   - Verify title is clear and specific (not generic or tagline-like)
   - Verify excerpt is one sentence, direct, specific (not a tagline)
   - Verify date is correct (today or desired publish date)
   - Verify readTime is accurate (5 min, 8 min, etc.)
   - Verify contentType is essay or field-note
   - Verify category is one of: AI Agents, Agentic SDLC, Technical Leadership, CTO, Architecture,
     Platform Engineering, Projects
   - Verify tags: 3-6 tags from the registry in `src/data/taxonomy.ts` (do not invent new tags)
   - Set status to "published" (or "evergreen" if intended to be timeless)
   - Optional: add series, seriesOrder, featured, whyItMatters, leaderTakeaway, relatedSlugs,
     seoTitle, seoDescription

2. **Structural polish**:
   - Add internal links to related Signal to System posts (using slug references)
   - Verify code blocks have language identifiers
   - Ensure prose is scannable (no dense paragraphs, clear section breaks)
   - Check for formatting consistency (bold, italics, code blocks)

3. **Final content check**:
   - Verify all claims are factual or attributed to the spec/research
   - Check links and references are valid
   - Verify code examples (if present) are tested and correct

4. **Move to publication**:
   - Copy finalized MDX from `docs/drafts/` to `src/content/posts/[post-slug].mdx`
   - Verify the move was successful

5. **Optional polish**:
   - Offer `/humanizer` skill for a final pass reducing AI-detectable patterns (or skip if you
     feel the draft already sounds authentic)

6. **Done** — post is publication-ready

## Content Schema (Frontmatter)

All published posts must include this frontmatter structure:

```yaml
---
title: "Post Title"
excerpt: "One-sentence description — direct and specific, not tagline-like"
date: YYYY-MM-DD
readTime: "N min"
contentType: essay  # or field-note
category: "Category Name"  # one of: AI Agents, Agentic SDLC, Technical Leadership, CTO, Architecture, Platform Engineering, Projects
tags: ["tag-one", "tag-two", "tag-three"]  # 3-6 tags from src/data/taxonomy.ts registry
status: published  # draft | published | evergreen
---
```

**Optional frontmatter fields**: `series`, `seriesOrder`, `featured`, `whyItMatters`,
`leaderTakeaway`, `relatedSlugs`, `heroImage`, `seoTitle`, `seoDescription`, `draftNotes`

**Categories** (fixed set of 7 — do not invent):
- AI Agents
- Agentic SDLC
- Technical Leadership
- CTO
- Architecture
- Platform Engineering
- Projects

**Tags** (from registry in `src/data/taxonomy.ts` — do not invent):
- Use 3-6 tags per post
- Only use tags that recur across multiple posts or form a coherent taxonomy
- Check `src/data/taxonomy.ts` for the canonical list

## Key Rules

1. **Never freewheel from thin air** — always draft from spec + research + voice doc. If source
   material is thin, flag gaps rather than inventing claims.

2. **Structure over ornament** — prioritize clarity and practical payoff. Thesis clarity beats
   "sounding nice."

3. **Voice calibration is mandatory** — read the voice spec and at least one published post
   before drafting any Phase 4 content. Do not approximate Nick's voice; read the spec.

4. **Blog repo is the publication source of truth** — all working files live in `/Users/miethe/dev/homelab/development/signal_to_system/docs/` and `src/content/posts/`. Do not split content across environments.

5. **Research grounding** — use `/notebooklm` skill for source-grounded answers. Use `/gemini-cli`
   for web search or second opinions. Prefer primary sources and lived experience over generic
   internet takes.

6. **Series awareness** — before drafting, check if the post belongs to a series. If so, read
   series materials from PKM `Blogs/` directory and maintain continuity with earlier posts in the
   series.

7. **Taxonomy compliance** — respect the fixed category and tag registry. Do not invent new
   categories or tags. If a post does not fit existing categories, escalate to the user before
   publishing.

## Integration with Other Skills

- **`/voice-writer`** — use this skill for voice-calibrated writing in Phase 4. Hand over the
  spec, and `/voice-writer` will produce a publication-ready draft focused on matching Nick's
  authentic voice.

- **`/humanizer`** — use this skill for a final naturalness pass in Phase 6. Run after drafting
  is complete to reduce AI-detectable patterns and increase idiomatic smoothness.

- **`/notebooklm`** — use for research grounding in Phase 3–4. Pass source documents, and get
  source-grounded summaries and Q&A to inform the spec and draft.

- **`/gemini-cli`** — use for web search or second opinions during research phases. Useful for
  validating claims and finding external context.

- **`/nano-banana` / `/nano-banana-pro`** — use for diagrams or images to include in the draft.

## Workflow Modes

Choose the appropriate mode based on the post scope:

| Mode | When | Flow |
|------|------|------|
| **Fast field note** | Crisp insight, minimal research | Idea → quick spec → draft → review → publish |
| **Standard essay** | Needs synthesis, multiple sources | Research (notebooklm) → spec → draft → review → publish |
| **Flagship post** | Spans notebooks, meant to be evergreen | Full research + spec + draft → adversarial review → revisions → polish → publish |

## Quality Checklist

Before handing off from each phase:

**Phase 3 (Post Design)**
- [ ] Spec has clear thesis or core argument
- [ ] Section outline is 3-6 levels deep
- [ ] Key claims are sourced (research, experience, analysis)
- [ ] Series information noted (if applicable)
- [ ] Spec saved to `docs/specs/`

**Phase 4 (Drafting)**
- [ ] Voice spec was read in full
- [ ] At least one published post was read for rhythm calibration
- [ ] Spec, research materials, and series context were read
- [ ] Opening grounds the topic in a real problem or misconception
- [ ] Every section has a practical payoff
- [ ] Recommendations include rationale, not just verdicts
- [ ] Caveats and trade-offs are stated clearly
- [ ] Tone and register match published posts
- [ ] Frontmatter is complete and uses valid taxonomy values
- [ ] Draft saved to `docs/drafts/`
- [ ] MDX is syntactically valid

**Phase 5 (Review)**
- [ ] Entire draft was read before feedback was produced
- [ ] All checklist items from Phase 4 were verified
- [ ] Feedback is specific and actionable
- [ ] Gaps (if any) are flagged with `[NEEDS INPUT]`
- [ ] Top revisions are suggested with rationale

**Phase 6 (Publication Prep)**
- [ ] Frontmatter is finalized and verified
- [ ] Categories and tags are from the fixed registry
- [ ] Internal links to related posts are added
- [ ] Code blocks have language identifiers
- [ ] All claims are factual or sourced
- [ ] Final MDX is moved to `src/content/posts/`
- [ ] Move was successful
