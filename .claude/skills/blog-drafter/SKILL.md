---
name: blog-drafter
description: >
  Orchestrate the full blog workflow for Signal to System: from post conception through design, drafting, editorial review/revision, and publication prep. Use when starting a new post from a topic, continuing from a spec, reviewing/revising an existing draft, or preparing content for publication. Coordinates drafting, voice calibration, review feedback, series continuity, and publication preparation. Handles all content phases (design → draft → review → publish) and editorial modes (review, revise, story-craft).
---

# blog-drafter

Orchestrates the complete blog workflow for Signal to System, spanning post design through publication. Manages topic ideation, spec creation, research integration, MDX drafting with complete frontmatter, editorial review and revision, series continuity, and publication preparation. Works with `/voice-writer` (voice calibration), `/humanizer` (naturalness polish), `/notebooklm` (research grounding), `/gemini-cli` (web search), and `/nano-banana` (diagrams/images).

## When to Use

- **Starting a new post from a topic or idea** — Phase 3 (Post Design)
- **Continuing from an existing post spec** — Phase 4 (Drafting)
- **Reviewing/editing an existing draft** — Phase 5 (Review & Revision)
- **Reviewing for editorial quality** — Phase 5, mode: `review` or `revise`
- **Series narrative evaluation** — Phase 5, mode: `story`
- **Preparing a draft for publication** — Phase 6 (Publication Prep)

## Entry Points and Workflow Phases

The skill adapts to the input provided. Each entry point corresponds to a phase in the content lifecycle:

### Phase 3: Post Design (Topic → Spec)

**Triggered by**: Topic, idea, or raw concept

**Actions**:
- Clarify the post angle, structure, and scope
  - Problem or misconception being addressed?
  - Primary audience (practitioner, technical leader, both)?
  - Content type (essay: long-form, structured; field-note: shorter, opinionated)?
  - Series context (belongs to a series in PKM `Blogs/` directory)?
- Create a post spec using the template at `docs/templates/post-planning.md`
  - Working title, excerpt, thesis, section outline (3-6 sections)
  - Key claims with sources (research, experience, analysis)
  - Related posts in Signal to System
  - Series information
- Save spec to `docs/specs/[post-slug]-spec.md`
- Proceed to Phase 4

### Phase 4: Drafting (Spec → MDX Draft)

**Triggered by**: Post spec file

**Actions**:
- **Read calibration materials** (mandatory):
  - Voice spec: `/Users/miethe/Documents/Other/PKM/MeatyBrain/Blogs/My Voice.md` — in full
  - At least one published post from `src/content/posts/` — recent preferred, in full
  - Post spec — in full
- **Research integration** (as needed):
  - Read series materials from PKM `Blogs/` directory if applicable
  - Use `/notebooklm` for source-grounded research
  - Use `/gemini-cli` for web search or external validation
  - Flag gaps; do not invent claims
- **Draft MDX**:
  - Write to `docs/drafts/[post-slug]-draft.mdx`
  - Include complete frontmatter (see `references/frontmatter-schema.md`)
  - Follow voice spec and structural patterns from published posts
  - Structure: problem/misconception → definition → practical why → decision components → recommendations with rationale → caveats → practical takeaway
  - Clear headings, scannable prose, code blocks, named tools
  - Ground all claims in spec, research, or lived experience
- Proceed to Phase 5

### Phase 5: Review & Revision (Draft → Polish)

**Triggered by**: Mode shortcut (`review`, `revise`, `story`) or user signal "review this draft"

**Invocation modes**:
- **Review mode**: Read draft fully; produce annotated editorial feedback using `references/review-checklist.md`
  - Flag sections with `[NEEDS INPUT: ...]` when author input required
  - Identify voice departures and structural issues
  - Suggest 3-5 specific revisions with rationale
  - Recommend next phase (return to Phase 4 for major revisions, proceed to Phase 6 for minor polish)
- **Revise mode**: Apply editorial feedback directly to draft while preserving voice
- **Story-craft mode**: Evaluate series-level narrative: post sequencing, concept timing, payoff structure

**Self-review checklist** (see `references/review-checklist.md` for full detail):
- Thesis is clear and defensible
- Post offers meaningful insight or useful guidance
- All major claims are supported by spec, research, or lived experience
- Writing is skimmable (clear headings, segmented blocks)
- Tone matches published posts (confident, technical, practical, conversational)
- Every section has practical payoff
- Voice spec patterns present (long-medium sentences, contrast definitions, embedded caveats, direct reader address)
- Reduction-list phrases (generic AI language) are minimal or absent
- Series awareness maintained (concepts properly seeded, continuity with earlier posts)

**Proceed to Phase 6** when ready (minor polish or voice integration remaining)

### Phase 6: Publication Prep (Draft → Published)

**Triggered by**: User signal "ready to publish"

**Actions**:
- **Finalize frontmatter** (see `references/frontmatter-schema.md`):
  - Verify title (clear, specific, not generic or tagline-like)
  - Verify excerpt (one sentence, direct, specific)
  - Verify date (today or desired publish date)
  - Verify readTime (5 min, 8 min, etc.)
  - Verify contentType (essay or field-note)
  - Verify category (one of 7 fixed categories from taxonomy)
  - Verify tags (3-6 tags from `src/data/taxonomy.ts` registry only)
  - Set status to "published" or "evergreen"
  - Optional: series, seriesOrder, featured, whyItMatters, leaderTakeaway, relatedSlugs, seoTitle, seoDescription
- **Structural polish**:
  - Add internal links to related Signal to System posts
  - Verify code blocks have language identifiers
  - Ensure prose is scannable (no dense paragraphs, clear breaks)
  - Check formatting consistency
- **Final content check**:
  - Verify all claims are factual or attributed
  - Check links and references are valid
  - Verify code examples are tested
- **Move to publication**:
  - Copy finalized MDX from `docs/drafts/` to `src/content/posts/[post-slug].mdx`
  - Verify move was successful
- **Optional polish**: Offer `/humanizer` for final pass reducing AI-detectable patterns

## Key Rules

1. **Never freewheel** — draft from spec + research + voice doc. Flag gaps rather than inventing claims.
2. **Structure over ornament** — clarity and practical payoff beat "sounding nice." Thesis clarity beats ornamentation.
3. **Voice calibration is mandatory** — read voice spec and at least one published post before drafting Phase 4 content. Do not approximate Nick's voice.
4. **Blog repo is source of truth** — all working files in `/Users/miethe/dev/homelab/development/signal_to_system/docs/` and `src/content/posts/`. No content split across environments.
5. **Research grounding** — use `/notebooklm` for source-grounded answers. Use `/gemini-cli` for web search. Prefer primary sources and lived experience.
6. **Series awareness** — check if post belongs to a series. If so, read series materials from PKM and maintain continuity with earlier posts. Load series brief from `references/series-*.md`.
7. **Taxonomy compliance** — respect the 7 fixed categories and tag registry. Do not invent new categories or tags. Escalate to user if post does not fit.
8. **Voice guardrails** — keep: nuanced recommendations, trade-off framing, "here's what matters in practice" energy, first-person experience, concrete examples, stated caveats. Reduce: empty universals, generic AI phrasing, fake certainty, excessive summaries, product-brochure energy.
9. **Anti-patterns** — don't flatten opinions into neutral prose; don't add hype or futurism; don't over-explain to technical readers; don't let posts read as purely skeptical; don't revise sections you weren't asked to touch; don't generate research claims without grounding.

## Progressive Disclosure: What to Read When

**Before any Phase 4 drafting or Phase 5 review/revision**:
- Read voice spec in full: `/Users/miethe/Documents/Other/PKM/MeatyBrain/Blogs/My Voice.md`
- Read at least one recent published post from `src/content/posts/`

**Before Phase 6 publication prep**:
- Read `references/frontmatter-schema.md` for complete frontmatter rules and taxonomy details

**If post belongs to a series**:
- Read matching `references/series-*.md` file to understand post sequencing, key concepts, and continuity needs
- Load from: `references/series-governed-agentic-sdlc.md`, `references/series-ai-workflows.md`, `references/series-cs-books.md`, `references/series-dev-stories.md`

**For editorial feedback or revision**:
- Read `references/review-checklist.md` for full self-review criteria and voice guardrails

## Integration with Other Skills

- **`/voice-writer`** — use for voice-calibrated drafting in Phase 4. Hand over spec and voice spec; receive publication-ready draft focused on matching Nick's authentic voice.
- **`/humanizer`** — use for final naturalness pass in Phase 6. Reduces AI-detectable patterns and increases idiomatic smoothness after drafting is complete.
- **`/notebooklm`** — use for research grounding in Phase 3–4. Pass source documents; get source-grounded summaries and Q&A for spec and draft.
- **`/gemini-cli`** — use for web search or second opinions during research phases. Useful for validating claims and finding external context.
- **`/nano-banana` / `/nano-banana-pro`** — use for diagrams or images to include in draft.

## Quality Checklist by Phase

**Phase 3 (Post Design)**
- Spec has clear thesis or core argument
- Section outline is 3-6 levels deep
- Key claims are sourced (research, experience, analysis)
- Series information noted (if applicable)
- Spec saved to `docs/specs/`

**Phase 4 (Drafting)**
- Voice spec was read in full
- At least one published post was read
- Spec, research materials, and series context were read
- Opening grounds topic in a real problem or misconception
- Every section has practical payoff
- Recommendations include rationale, not just verdicts
- Caveats and trade-offs stated clearly
- Tone and register match published posts
- Frontmatter is complete and uses valid taxonomy values
- Draft saved to `docs/drafts/`

**Phase 5 (Review)**
- Entire draft was read before feedback produced
- All Phase 4 checklist items verified
- Feedback is specific and actionable
- Gaps flagged with `[NEEDS INPUT]`
- Top revisions suggested with rationale

**Phase 6 (Publication Prep)**
- Frontmatter is finalized and verified
- Categories and tags are from fixed registry
- Internal links to related posts added
- Code blocks have language identifiers
- All claims are factual or sourced
- Final MDX moved to `src/content/posts/`

---

**File locations**: See `references/` subdirectory for detailed schema, checklists, and series briefs.
