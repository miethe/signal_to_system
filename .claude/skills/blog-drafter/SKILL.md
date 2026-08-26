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
- Save spec to PKM: `MeatyBrain/Blogs/<Series>/<Post>/[post-slug]-spec.md`
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
  - Write to PKM: `MeatyBrain/Blogs/<Series>/<Post>/drafts/[post-slug]-draft.mdx`
  - Include complete frontmatter (see `references/frontmatter-schema.md`)
  - Follow voice spec and structural patterns from published posts
  - Structure: problem/misconception → definition → practical why → decision components → recommendations with rationale → caveats → practical takeaway
  - Clear headings, scannable prose, code blocks, named tools
  - Ground all claims in spec, research, or lived experience
- Proceed to Phase 5

### Phase 3.5: Forensic Grounding (optional)

**Triggered by**: Any Dev Stories or "I Let Claude Build My App" post — or any post making numeric claims about a shipped feature (story points, timelines, agent counts, session counts, percentages, parallelism).

**Actions**:
- Enumerate the PRs and features the post references
- For each feature, run:
  - `ccdash feature list` — find candidate features
  - `ccdash feature show <id>` — feature mapping and metadata
  - `ccdash feature sessions <id>` — session telemetry and task attribution grounded in provenance
- Save consolidated output to PKM: `MeatyBrain/Blogs/<Series>/<Post>/notes/ccdash/ccdash-insights-report.md`
- Use that report as the single source of truth for numeric claims in the draft

This step bridges Phase 3 and Phase 4 — the spec frames the story; the forensics report supplies the evidence. Validated on Dev Stories B2, where CCDash replaced several guessed metrics with verifiable numbers.

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

### Phase 5b: Editorial Review Sequence (the "review board")

Before a draft is treated as revision-complete, run these checks in this order. Each check may
be skipped only if it genuinely does not apply (e.g. no lived-experience claim in the piece), and
a skip must be stated, not silent.

1. **Taste pass**: a whole-piece editorial read against this site's conventions (voice, the
   nugget-mosaic convention of dated/receipt-backed moments over generic essay prose). Verdict is
   either "publish-worthy" or a named, bounded structural fix. If the fix requires adding
   real vignettes/receipts, flag Step 4 (egress check) as now REQUIRED, not optional (a taste
   pass that adds specifics is exactly the trigger that makes an egress check load-bearing).
2. **Weakest-claims pass**: enumerate every claim a skeptical reader would attack, phrased as
   "a skeptic will ask X." Each claim gets a fix: a citation, a scope qualifier, a softened
   framing, or an explicit "this is [Proposed], not [Observed]" tag.
3. **(When available) ARC council pass**: route the draft through the Agent Review Council
   (`council-review` skill / `arc` CLI) for a structured, role-based adversarial read (skeptic,
   evidence-auditor, market-realist), producing Evidence Gaps, Overclaimed Statements, Internal
   Consistency Issues, Missing Context, Tone & Positioning Issues, and a scored Weakest Claims
   table. **Note the target-document discipline**: ARC must run against *this post's own current
   draft*, not a sibling document; a review of related-but-different material does not discharge
   this step, even where its findings happen to overlap.
4. **Egress check**: a narrow, binary check for identifier/PII/employer/dollar-figure leakage.
   REQUIRED whenever any prior step (1-3) introduced or referenced concrete receipts, dates,
   vignettes, or examples drawn from real work. Record a pass/fail and a session id for audit.

Revision may interleave with these steps (a taste-pass fix can be applied before a weakest-claims
pass runs, or vice versa); this sequence names the *checks*, not a rigid waterfall order.

### Phase 5.5: Stage Authoring (Workflow Showcase)

**Triggered by**: Post is part of the Governed Agentic SDLC series and corresponds to a Showcase stage (post-to-stage mapping in `docs/specs/workflow-showcase/blog-metadata-sync.md`).

**Source of truth**: the demo-foundry manifest. The site only renders what the manifest produces; do not hand-edit `src/data/workflow-stages.json`.

**Workflow**:
1. Confirm the post-to-stage mapping via `docs/specs/workflow-showcase/blog-metadata-sync.md` (post slug, stage number, deep-link anchor).
2. Author the manifest at `demo/demos/stage-N-<slug>/manifest.yaml` following the template and checklist in `docs/specs/workflow-showcase/stage-authoring-template.md`. Gold examples: `demo/demos/stage-1-baseline/manifest.yaml` and `demo/demos/stage-2-idd/manifest.yaml`.
3. Run `demo-foundry dry-run` to validate the manifest; then `demo-foundry apply` to produce screenshots, the walkthrough MP4, the thumbnail, and the social clip.
4. Regenerate the stage data and copy assets: `node scripts/manifest-to-stage.ts stage-N` (updates `src/data/workflow-stages.json` and `public/workflow-showcase/...`).
5. Verify locally: `npm run dev`, then load `/workflow-showcase/?stage=N` and confirm media, transcript, and metadata render.
6. Add a deep-link from the post body into the showcase (anchor per `blog-metadata-sync.md`).

**Expected effort**: ~1 to 2 days per stage (manifest authoring and capture review dominate).

**Rules**:
- Manifest first, site data second; never the reverse.
- Do not duplicate stage details in the post; link to the showcase.
- If capture output drifts from the post's claims, fix the manifest (or the claim), not the JSON.

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
  - Copy finalized MDX from PKM `drafts/` to `src/content/posts/[post-slug].mdx`
  - Also copy finalized MDX to PKM `final/` directory (see PKM Folder Structure)
  - Verify move was successful
- **Generate social summary**:
  - Create `social-summary.md` in the PKM `final/` directory alongside the published MDX
  - Format: YAML frontmatter (`post`, `series`, `platform`, `created`) + two sections:
    - **LinkedIn Post** (200-350 words): Hook with core insight, evidence highlights, key concepts, series context (if first post or new series, announce the series), forward pointer, link to post, 3-5 hashtags
    - **Key Quotes for Pull**: 2-4 standalone quotable lines from the post for social snippets or comment replies
  - Voice: match Nick's direct, practitioner tone — no marketing, no hype. Grounded in data and lived experience.
  - Delegate writing to a subagent with full context from the post
- **Optional polish**: Offer `/humanizer` for final pass reducing AI-detectable patterns

### Phase 6c: AI-Involvement Disclosure Classification

Before finalizing frontmatter, classify this post's AI involvement against the four-level
standard below, and let the level determine what ships in the post itself.

| Level | AI involvement | Disclosure |
|---|---|---|
| 1 | Proofreading, wording, editing | Usually none |
| 2 | Outlining/drafting an established argument | Standing sitewide disclosure covers it |
| 3 | Substantive synthesis, adversarial reasoning, research assistance | Yes: a per-post Method/Provenance note (below) |
| 4 | AI develops thesis, evidence, and conclusions with minimal human intellectual contribution | Absolutely, and reconsider whether this should publish under Nick's byline at all |

The discriminating question is not "who wrote each sentence" but "where did the epistemic
contribution come from": who noticed the phenomenon, formulated the hypothesis, decided what
mattered, supplied the observations, challenged the argument, verified the evidence, and is
willing to defend the conclusion. A post that used AI heavily for drafting/editing (Level 1-2)
but whose thesis and evidence are Nick's own operating observations is NOT Level 3 or 4 merely
because a model wrote most of the sentences.

### Phase 6d: Method/Provenance Note (Level 3+ only)

For any post classified Level 3 or above, add a short Method/Provenance note near the top or
bottom of the post (site convention TBD, see the top-level `docs/` notes on this gap). Suggested
per-post text (adapt per post):

> The ideas and system described here derive from my own architecture work and operating
> observations. AI systems assisted with research, analysis, adversarial review, and drafting.
> [Where a bounded research artifact underlies a claim:] The N-source landscape review was
> conducted using an AI-assisted research workflow; its scope and limitations are described
> above. I reviewed the resulting claims and take responsibility for the final argument.

### Phase 6e: Provenance Block (Level 3+ only)

Append a small structured Provenance block. Treat this as **part of the piece's thesis, not a
disclaimer bolted on for liability cover**: for a piece arguing that agents can participate in
producing a governed, evidence-backed artifact without hiding that fact, an honest provenance
block is confirming evidence, not an admission.

> **Provenance**
> Author: Nick Miethe. Thesis: Human-originated. Evidence: operating observations plus linked
> research. AI roles: research, adversarial review, drafting, editing. Human verification:
> final claim and source review. Research artifact: `<artifact-slug>`. Version: `<n.n>`.

Adapt the `AI roles` / `Research artifact` fields to what actually happened per Phase 5b's log;
do not default to the template if this post's process differed (e.g. no ARC pass ran, say so by
omission or an explicit "N/A").

## PKM Folder Structure

Each post in `MeatyBrain/Blogs/<Series>/<Post N>/` follows this layout:

```
Post N/
├── drafts/                  # Working drafts, intermediate revisions
├── notes/                   # Research notes, review feedback, editorial notes, sources
├── final/                   # Published MDX, social summary
│   ├── <post-slug>.mdx
│   └── social-summary.md
└── Post N Outline.md        # Spec/outline stays at root level
```

**Conventions**:
- Series-level docs (`Blog Series.md`, `Detailed Series Outline.md`, `Post N Outline.md`) stay at their respective root level
- `drafts/` holds iterative draft files (e.g., `<slug>-draft-v1.mdx`, `<slug>-draft-v2.mdx`)
- `notes/` holds research, review feedback, humanizer notes, sources — anything informing the draft
- `final/` holds the publication-ready MDX and the social summary
- When reorganizing an existing post folder, move files into the appropriate subdirectory; do not delete or rename content files

## Key Rules

1. **Never freewheel** — draft from spec + research + voice doc. Flag gaps rather than inventing claims.
2. **Structure over ornament** — clarity and practical payoff beat "sounding nice." Thesis clarity beats ornamentation.
3. **Voice calibration is mandatory** — read voice spec and at least one published post before drafting Phase 4 content. Do not approximate Nick's voice.
4. **PKM is the working space; blog repo is the published artifact** — specs, drafts, research notes, and review feedback live in the PKM vault (`MeatyBrain/Blogs/<Series>/<Post>/`). Only final, publication-ready MDX gets copied to `src/content/posts/`. Do NOT save working files to `docs/specs/` or `docs/drafts/` in the blog repo.
5. **Research grounding** — use `/notebooklm` for source-grounded answers. Use `/gemini-cli` for web search. Prefer primary sources and lived experience.
6. **Series awareness** — check if post belongs to a series. If so, read series materials from PKM and maintain continuity with earlier posts. Load series brief from `references/series-*.md`.
7. **Taxonomy compliance** — respect the 7 fixed categories and tag registry. Do not invent new categories or tags. Escalate to user if post does not fit.
8. **Voice guardrails** — keep: nuanced recommendations, trade-off framing, "here's what matters in practice" energy, first-person experience, concrete examples, stated caveats. Reduce: empty universals, generic AI phrasing, fake certainty, excessive summaries, product-brochure energy.
9. **Anti-patterns** — don't flatten opinions into neutral prose; don't add hype or futurism; don't over-explain to technical readers; don't let posts read as purely skeptical; don't revise sections you weren't asked to touch; don't generate research claims without grounding.
10. **Cite-or-cut** — for posts making numeric claims about shipped features (story points, timelines, agent counts, session counts, percentages, parallelism), every number must trace to CCDash, git history, or another authoritative source. If a number can't be grounded, either cut it or replace with a qualitative claim. Guessed metrics undermine credibility and are a common failure mode in agent-driven Dev Stories posts; readers will notice when the math doesn't reconcile with the artifact.

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
- **`/ccdash`** — use for forensic analysis of agent-driven development work during the research phase. Run for any post making claims about shipped features, agent rosters, session counts, timelines, or parallelism. Produces a `notes/ccdash/ccdash-insights-report.md` with feature mapping, session telemetry, and task attribution grounded in provenance — the source of truth for numeric claims.

## Quality Checklist by Phase

**Phase 3 (Post Design)**
- Spec has clear thesis or core argument
- Section outline is 3-6 levels deep
- Key claims are sourced (research, experience, analysis)
- Series information noted (if applicable)
- Spec saved to PKM series directory

**Phase 4 (Drafting)**
- Voice spec was read in full
- At least one published post was read
- Spec, research materials, and series context were read
- For posts making numeric claims about shipped features, the CCDash forensics report has been generated and saved to `notes/ccdash/` before drafting began
- Opening grounds topic in a real problem or misconception
- Every section has practical payoff
- Recommendations include rationale, not just verdicts
- Caveats and trade-offs stated clearly
- Tone and register match published posts
- Frontmatter is complete and uses valid taxonomy values
- Draft saved to PKM series directory (`drafts/` subfolder)

**Phase 5 (Review)**
- Entire draft was read before feedback produced
- All Phase 4 checklist items verified
- Feedback is specific and actionable
- Gaps flagged with `[NEEDS INPUT]`
- Top revisions suggested with rationale

**Phase 5b (Editorial Review Sequence)**
- Taste pass run; verdict recorded (publish-worthy, or a named bounded fix)
- Weakest-claims pass run; every flagged claim has a fix or a provenance tag
- ARC council pass run when available, against this post's own current draft (not a sibling document); explicitly skipped and stated when unavailable
- Egress check run and recorded (pass/fail plus session id) whenever any prior step introduced concrete receipts, dates, vignettes, or real-work examples
- Any skipped step is stated, not silent

**Phase 5.5 (Stage Authoring, Governed Agentic SDLC only)**
- Post-to-stage mapping confirmed via `docs/specs/workflow-showcase/blog-metadata-sync.md`
- Manifest authored at `demo/demos/stage-N-<slug>/manifest.yaml` per template
- `demo-foundry dry-run` passes; `demo-foundry apply` produced screenshots, walkthrough MP4, thumbnail, social clip
- `node scripts/manifest-to-stage.ts stage-N` ran cleanly; `src/data/workflow-stages.json` updated
- `/workflow-showcase/?stage=N` renders correctly locally
- Deep-link from post body to the showcase added

**Phase 6 (Publication Prep)**
- Frontmatter is finalized and verified
- Categories and tags are from fixed registry
- Internal links to related posts added
- Code blocks have language identifiers
- All claims are factual or sourced
- Final MDX moved to `src/content/posts/`
- Final MDX copied to PKM `final/` directory
- Social summary generated in PKM `final/social-summary.md`
- PKM post folder organized per convention (drafts/, notes/, final/)
- AI-involvement level classified (Phase 6c) against the four-level standard
- For Level 3+: a Method/Provenance note is present (Phase 6d)
- For Level 3+: a Provenance block is present and its fields reflect what actually happened, not the unmodified template (Phase 6e)

---

**File locations**: See `references/` subdirectory for detailed schema, checklists, and series briefs.
