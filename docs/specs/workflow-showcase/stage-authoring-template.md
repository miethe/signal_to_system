---
title: Workflow Showcase — Stage Authoring Checklist
description: "Step-by-step guide for authoring new stages in the Living Workflow Showcase. Used as Phase 5.5 in blog-drafter workflow when publishing Governed Agentic SDLC series posts."
created: 2026-05-10
status: draft
---

# Workflow Showcase — Stage Authoring Checklist

**Purpose**: This checklist is triggered in blog-drafter Phase 5.5 when a Governed Agentic SDLC series post is published. It guides the authoring of a corresponding Workflow Showcase stage.

**Expected Effort**: 1–2 days per stage (4–8 hours active work)

**Outcome**: A new stage config entry in `src/data/workflow-stages.json`, tested and linked from the blog post.

---

## Pre-Authoring: Preparation (30 min)

- [ ] Identify blog post number (e.g., Post 3, Post 4)
- [ ] Review blog post content and finalize publication (stage authoring should happen after post is live)
- [ ] Extract post metadata: publication date, slug, series post number (e.g., `postNumber: 3`)
- [ ] Identify the workflow topic/stage title (e.g., "Spec Layer", "Context & Memory", "CCDash Observability")
- [ ] Determine primary MeatySkill to link in CTA (e.g., planning, notebooklm, ccdash)
- [ ] Gather reference materials: Post content, related spec docs, implementation artifacts from actual workflow

---

## Step 1: Script Workflow Steps (1–2 hours)

**Goal**: Define 6–10 workflow steps that visualize the key narrative of the blog post.

### Checklist

- [ ] Review blog post outline and identify main workflow phases
- [ ] List 6–10 steps showing progression from start to end state
  - Each step should be a discrete action or state transition
  - Steps should be brief enough to fit in terminal/panel display
  - Avoid micro-steps (e.g., don't show "file created", "file opened", "file edited" separately; group as "file created and edited")
- [ ] For each step, write:
  - **Step ID**: Unique identifier (e.g., `step-3-1`, `step-3-2`)
  - **Label**: 3–5 word description visible in timeline (e.g., "Feature Request Received", "PRD Written", "Plan Generated")
  - **Terminal output**: 1–3 lines of terminal-style text showing the action or result (e.g., "$ Request: Build user dashboard\n> Feature type: UI Component\n> Complexity: Medium")
  - **Panel content**: Which artifact panels update at this step (see Step 2 for artifact types)

### Example: Stage 2 (Spec Layer) Steps

```
Step 1: Feature Request Received
  Terminal: "$ Request incoming\n> Feature: Implement user profile page\n> Source: Product team"
  Panels: (none yet; request displayed in terminal only)

Step 2: PRD Authored
  Terminal: "$ PRD generation complete\n> Document: workflow-showcase-prd.md\n> Frontmatter: [title, description, effort]"
  Panels: PRD panel now shows actual PRD frontmatter

Step 3: Plan Generated
  Terminal: "$ Plan created from PRD\n> Phases: 5\n> Tasks: 18\n> Effort: 28 SP"
  Panels: Plan panel shows task table excerpt

Step 4: Progress Tracking Initialized
  Terminal: "$ Progress file created\n> Status: in-progress\n> Tracking: task completion, blockers"
  Panels: Progress panel shows YAML progress file

... and so on for 6–10 total steps
```

---

## Step 2: Curate and Collect Artifacts (2–3 hours)

**Goal**: Gather or create artifact content that will appear in the side panels when users expand each artifact type.

### Artifact Types

Each stage has up to 4 artifact panel types:

1. **PRD**: Feature specification with YAML frontmatter
   - Content: Actual PRD markdown or excerpt showing frontmatter and first section
   - Format: Markdown code block, syntax-highlighted
   - Length: 20–40 lines (keep readable at small text size)
   - Source: Real PRD from the blog post's topic (anonymized if needed)

2. **Plan**: Implementation plan or task table
   - Content: Task breakdown table (Markdown table format) or phase list
   - Format: Markdown table or bullet list
   - Length: 10–20 lines (excerpt or full table for small projects)
   - Source: Real plan from post's workflow (or illustrative if creating new)

3. **Progress**: Progress tracking artifact
   - Content: YAML progress file or status snapshot
   - Format: YAML code block
   - Length: 15–30 lines (shows status, completed, in-progress, metrics)
   - Source: Real progress file from workflow (anonymized)

4. **Agents**: Agent roles and responsibilities
   - Content: List of agents/roles involved at this stage
   - Format: Markdown list with role badges or labels
   - Length: 5–10 lines (agent name, role, responsibility)
   - Source: Derived from blog post content or actual workflow

### Checklist

- [ ] **PRD Artifact**:
  - [ ] Find or create sample PRD with valid YAML frontmatter (at minimum: title, description, effort, audience)
  - [ ] Ensure frontmatter is properly formatted (valid YAML)
  - [ ] Include first 1–2 paragraphs of PRD body
  - [ ] Anonymize if sourced from real project (e.g., "Feature X" instead of client name)
  - [ ] Save as markdown, syntax-highlighted in final config

- [ ] **Plan Artifact**:
  - [ ] Extract or create task table from implementation plan
  - [ ] Include columns: Task ID, Description, Effort (story points)
  - [ ] Show 5–8 representative tasks (don't include full 30-task plan; too long)
  - [ ] Verify table formatting is clean (markdown table syntax correct)

- [ ] **Progress Artifact**:
  - [ ] Create or extract progress YAML with structure:
    ```yaml
    stage: <name>
    status: in-progress | completed
    completed_tasks: <count>
    in_progress_tasks: <count>
    blocked_tasks: <count>
    metrics:
      tokens_used: <number>
      throughput: <number>
      cost: <currency>
    ```
  - [ ] Use real numbers if available (not round numbers; 987K tokens looks more real than 1M)
  - [ ] Anonymize if needed

- [ ] **Agents Artifact**:
  - [ ] Identify 3–5 agents/roles involved at this workflow stage
  - [ ] For each, list: name, role, key responsibility
  - [ ] Example:
    ```
    spike-writer (Planner)
      Designs feature SPIKE and research plan
    
    frontend-architect (UI/UX)
      Evaluates interaction tech, designs component shell
    ```

---

## Step 3: Gather Metrics (1 hour)

**Goal**: Collect quantitative metrics for the metrics overlay (tokens, throughput, cost, wall-clock time).

### Metrics Fields

- **Tokens Used**: Total LLM tokens consumed (input + output) for this stage
- **Throughput**: Tokens per second (e.g., 12K tokens/sec)
- **Cost**: Estimated cost in USD (e.g., $5.50)
- **Wall-Clock Time**: How long the stage took (e.g., 9m 23s)

### Checklist

- [ ] **Source metrics**: Are they available from actual workflow (CCDash, logs)?
  - [ ] If yes: extract real numbers, use as-is
  - [ ] If no: create illustrative metrics based on stage complexity and effort
- [ ] **Avoid fake numbers**: Don't use round numbers (1M tokens, $5.00). Use realistic: 987K tokens, $4.75
- [ ] **Document source**: Note whether metrics are "real" or "curated for illustration"
- [ ] **Populate metrics object**:
  ```json
  {
    "tokensUsed": 987000,
    "throughput": 12500,
    "cost": 4.75,
    "wallClockTime": "9m 23s",
    "dataSource": "curated (illustration)"
  }
  ```

---

## Step 4: Create Stage Config Entry (1–2 hours)

**Goal**: Populate the stage config in `src/data/workflow-stages.json`.

### Config Structure

```json
{
  "id": "stage-3",
  "postNumber": 3,
  "postSlug": "post-3-context-and-memory",
  "title": "Stage 3: Context & Memory",
  "description": "Authoring structured context packs and persistent memory for agentic workflows.",
  "steps": [
    {
      "stepId": "step-3-1",
      "label": "Context Gap Identified",
      "terminal": "$ Analyzing workflow logs\n> Finding: agents lack context\n> Impact: hallucinations increase",
      "panels": []
    },
    {
      "stepId": "step-3-2",
      "label": "Context Pack Authored",
      "terminal": "$ Context pack created\n> Size: 8.2 MB\n> Format: Markdown + YAML",
      "panels": ["context-pack"]
    }
    // ... more steps
  ],
  "artifacts": {
    "prD": {
      "type": "prd",
      "title": "Feature PRD",
      "content": "---\ntitle: Context Management System\n...\n\n## Overview\n...",
      "contentType": "markdown"
    },
    "plan": {
      "type": "plan",
      "title": "Implementation Plan",
      "content": "| Phase | Tasks | Effort |\n|-------|-------|--------|\n| Context Schema | 3 | 5 SP |",
      "contentType": "markdown"
    },
    "progress": {
      "type": "progress",
      "title": "Progress Tracking",
      "content": "status: completed\ncompleted_tasks: 8\ntokens_used: 2.1M",
      "contentType": "yaml"
    },
    "agents": {
      "type": "agents",
      "title": "Agent Team",
      "content": "notebooklm (Research)\n  Primary context source aggregation\n\nfrontend-architect (UI)\n  Context panel design",
      "contentType": "markdown"
    }
  },
  "metrics": {
    "tokensUsed": 2100000,
    "throughput": 14500,
    "cost": 6.25,
    "wallClockTime": "12m 45s",
    "dataSource": "curated (illustration)"
  },
  "ctaLinks": [
    {
      "skillName": "notebooklm",
      "skillUrl": "https://github.com/miethe/MeatySkills/tree/main/skills/notebooklm",
      "copyText": "Learn context authoring with NotebookLM"
    }
  ]
}
```

### Checklist

- [ ] **Stage metadata**:
  - [ ] `id`: Unique stage ID (e.g., "stage-3")
  - [ ] `postNumber`: Blog post number (e.g., 3)
  - [ ] `postSlug`: Blog post slug from frontmatter (e.g., "post-3-context-and-memory")
  - [ ] `title`: Human-readable stage title
  - [ ] `description`: 1–2 sentence summary of stage topic

- [ ] **Steps array**:
  - [ ] 6–10 steps total
  - [ ] Each step has: stepId, label, terminal, panels (array of artifact types to show)
  - [ ] Terminal text is 1–3 lines (concise, readable)
  - [ ] Panels array references artifact keys (e.g., ["prd", "plan"])

- [ ] **Artifacts object**:
  - [ ] PRD artifact populated (or omitted if not relevant)
  - [ ] Plan artifact populated
  - [ ] Progress artifact populated
  - [ ] Agents artifact populated
  - [ ] Each artifact has: type, title, content, contentType (markdown/yaml)

- [ ] **Metrics object**:
  - [ ] All 4 fields: tokensUsed, throughput, cost, wallClockTime
  - [ ] dataSource documented ("real" or "curated")

- [ ] **CTA links array**:
  - [ ] At least 1 primary skill link (most relevant to stage)
  - [ ] Each link has: skillName, skillUrl, copyText
  - [ ] URL points to stable skill location (not main branch)

- [ ] **JSON validation**:
  - [ ] Paste entire config into JSON validator (https://jsonlint.com/)
  - [ ] Zero syntax errors

---

## Step 5: Test Stage Rendering (1–2 hours)

**Goal**: Verify the stage renders correctly in the Showcase and all interactions work.

### Checklist

- [ ] **Local dev setup**:
  - [ ] Run `npm run dev`
  - [ ] Navigate to `http://localhost:3000/workflow-showcase/?stage=<stageId>` (e.g., `?stage=stage-3`)

- [ ] **Visual rendering**:
  - [ ] Page loads without console errors
  - [ ] Stage title and description display
  - [ ] All steps appear in timeline/scrubber
  - [ ] Step labels are readable

- [ ] **Scrubber interaction**:
  - [ ] Click/drag through all steps (desktop)
  - [ ] Prev/next buttons work (mobile, if applicable)
  - [ ] Terminal output updates as you step through
  - [ ] Step highlighting shows active step

- [ ] **Artifact panels**:
  - [ ] Click "Show PRD" tab → PRD content appears (syntax highlighted, readable)
  - [ ] Click "Show Plan" tab → Plan table appears (columns aligned)
  - [ ] Click "Show Progress" tab → Progress YAML appears (valid YAML syntax)
  - [ ] Click "Show Agents" tab → Agent list appears (formatted cleanly)
  - [ ] Switching between tabs doesn't re-render scrubber (smooth UX)

- [ ] **Metrics overlay**:
  - [ ] Bottom-right (or top-right) overlay visible
  - [ ] Shows all 4 metrics: tokens, throughput, cost, time
  - [ ] Numbers are readable (sufficient contrast)

- [ ] **CTA card**:
  - [ ] "Try it yourself" card visible below scrubber
  - [ ] Button text is benefit-driven
  - [ ] Clicking button navigates to skill repo (in new tab or same window)
  - [ ] Link is correct (no 404)

- [ ] **Dark/light mode**:
  - [ ] Toggle theme (if site has theme switcher)
  - [ ] Verify stage renders correctly in both modes
  - [ ] Text contrast sufficient in both modes
  - [ ] Artifact code blocks readable in both modes

- [ ] **Mobile responsiveness**:
  - [ ] Open DevTools, set viewport to iPhone 12 (390px)
  - [ ] Scrubber displays as buttons (Prev/Next) not slider
  - [ ] Artifact panels become accordion or tabs (stacked vertically)
  - [ ] Metrics overlay positioned safely (doesn't obscure content)
  - [ ] No horizontal scroll

- [ ] **Build and production**:
  - [ ] Run `npm run build` (stage config is included in build)
  - [ ] Zero errors or warnings
  - [ ] Verify build artifact size is acceptable

---

## Step 6: Add Blog Post Link (30 min)

**Goal**: Add a contextual link from the blog post to the Showcase stage, enabling readers to see the workflow in action.

### Checklist

- [ ] **Identify link placement**: Find natural mention of the workflow or workflow tool in blog post
  - [ ] Good placement: end of introduction, before diving into details
  - [ ] Good placement: after explaining a workflow concept
  - [ ] Avoid: random mid-paragraph link (feels forced)

- [ ] **Write link text**: Benefit-driven and contextual
  - [ ] Example: "See this workflow in action in the [Living Workflow Showcase](/workflow-showcase/?stage=3)."
  - [ ] Example: "Explore an interactive visualization of this process in the [Workflow Showcase](#)."
  - [ ] Avoid generic: "Click here", "More info"

- [ ] **Verify deep-link URL**: Construct `/workflow-showcase/?stage=<stageId>`
  - [ ] Example: `/workflow-showcase/?stage=stage-3`
  - [ ] Test link in local dev (`npm run dev`)
  - [ ] Verify link loads correct stage and nothing else breaks

- [ ] **Update blog post MDX/markdown**:
  - [ ] Add link to post content in `src/content/posts/<post-slug>.mdx`
  - [ ] Format: `[Workflow Showcase](/workflow-showcase/?stage=stage-3)`
  - [ ] Verify build passes after edit

---

## Step 7: Documentation and Closeout (30 min)

**Goal**: Update docs and finalize.

### Checklist

- [ ] **Update stage selector**: If using a manual list of stages, verify new stage appears
  - [ ] Check `src/data/workflow-stages.json` is properly referenced in Astro page
  - [ ] Verify stage selector dropdown/carousel includes new stage

- [ ] **Validate all links**:
  - [ ] Blog post → Showcase link works
  - [ ] Showcase CTA → skill repo works
  - [ ] Stage selector → all stages load correctly

- [ ] **Final QA smoke test**:
  - [ ] Load stage in dev
  - [ ] Load stage in production (if deployed)
  - [ ] Test on mobile device or emulator
  - [ ] Verify no console errors
  - [ ] Verify dark mode works

- [ ] **Optional: Update analytics/metrics tracking**:
  - [ ] Verify event tracking fires for new stage (stage view, scrubs, CTA clicks)
  - [ ] Check analytics dashboard to confirm events are logged

- [ ] **Document completion**:
  - [ ] Add note to blog post MDX: "Workflow Showcase stage authored and linked" or similar
  - [ ] Update any internal tracking (sprint notes, status doc) if applicable

---

## Troubleshooting

### Issue: JSON config won't parse

**Solution**: Paste config into https://jsonlint.com/ and fix syntax errors (usually missing commas or quotes).

### Issue: Artifact content looks weird or is cut off

**Solution**: Check that artifact content is properly escaped:
  - Use `\n` for newlines in string fields
  - Escape quotes: `\"` inside double-quoted strings
  - Or use triple-quoted strings (MDX/YAML format) if template allows

### Issue: Stage doesn't appear in selector

**Solution**: Verify:
  - Stage is added to `src/data/workflow-stages.json`
  - JSON is valid (use linter)
  - Astro page is querying the data file correctly
  - Blog post exists and `postSlug` matches post frontmatter

### Issue: Link from blog post returns 404

**Solution**: Check:
  - URL is correct: `/workflow-showcase/?stage=<id>`
  - Stage ID in URL matches config ID
  - Build passes (`npm run build`)

### Issue: Scrubber latency is slow or janky

**Solution**: Check:
  - Are artifact panels too large (causing re-render lag)?
  - Is terminal output too long (causing animation stutter)?
  - Consider splitting large artifacts across multiple steps instead of showing all at once

---

## Estimated Time Breakdown

| Task | Duration |
|------|----------|
| Preparation | 30 min |
| Script steps (6–10) | 1–2 hours |
| Curate artifacts (PRD, plan, progress, agents) | 2–3 hours |
| Gather metrics | 1 hour |
| Create config entry (JSON) | 1–2 hours |
| Test rendering and interaction | 1–2 hours |
| Add blog post link | 30 min |
| Final QA and closeout | 30 min |
| **Total** | **4–8 hours (1–2 days)** |

---

## Template: Stage Config JSON (Copy & Paste)

```json
{
  "id": "stage-X",
  "postNumber": X,
  "postSlug": "post-X-<slug>",
  "title": "Stage X: <Title>",
  "description": "<1–2 sentence summary of stage topic>",
  "steps": [
    {
      "stepId": "step-X-1",
      "label": "<Step 1 label>",
      "terminal": "<terminal output line 1>\n<terminal output line 2>",
      "panels": []
    },
    {
      "stepId": "step-X-2",
      "label": "<Step 2 label>",
      "terminal": "<terminal output>",
      "panels": ["prd"]
    }
  ],
  "artifacts": {
    "prd": {
      "type": "prd",
      "title": "Feature PRD",
      "content": "---\ntitle: <Title>\n...\n\n## Overview\n<Content>",
      "contentType": "markdown"
    },
    "plan": {
      "type": "plan",
      "title": "Implementation Plan",
      "content": "| Phase | Tasks | Effort |\n|-------|-------|--------|\n| <Phase> | <Count> | <SP> |",
      "contentType": "markdown"
    },
    "progress": {
      "type": "progress",
      "title": "Progress Tracking",
      "content": "status: <status>\ncompleted_tasks: <count>\n...",
      "contentType": "yaml"
    },
    "agents": {
      "type": "agents",
      "title": "Agent Team",
      "content": "<Agent Name> (<Role>)\n  <Responsibility>",
      "contentType": "markdown"
    }
  },
  "metrics": {
    "tokensUsed": <number>,
    "throughput": <number>,
    "cost": <number>,
    "wallClockTime": "<time>",
    "dataSource": "curated (illustration) | real"
  },
  "ctaLinks": [
    {
      "skillName": "<skill>",
      "skillUrl": "https://github.com/miethe/MeatySkills/tree/main/skills/<skill>",
      "copyText": "<benefit-driven copy>"
    }
  ]
}
```

---

## Questions or Blockers?

If you encounter issues while authoring a stage:

1. **Refer to existing stages**: Review Stage 1 and Stage 2 configs in `src/data/workflow-stages.json` as examples
2. **Check the Showcase component docs**: Review `src/components/islands/WorkflowStage.tsx` component API
3. **Review the main implementation plan**: See `docs/specs/workflow-showcase-implementation.md` for architecture context
4. **Ask**: If something is unclear, ask in a team channel or file a GitHub issue

---

**Last Updated**: 2026-05-15

---

## Phase 1 Implementation Notes (added 2026-05-15)

The Phase 1 shell ships with the following concrete files and conventions; future stages should target this surface:

### File locations (actual repo conventions)

| Concern | Path |
|---------|------|
| TypeScript schema | `src/types/workflow.ts` (`Stage`, `Step`, `Artifact`, `Metrics`, `CTALink`) |
| React islands | `src/components/interactive/WorkflowStage.tsx` (+ siblings) |
| Nanostores state | `src/store/workflowStageStore.ts` |
| Stage manifest | `src/data/workflow-stages.json` |
| Scoped styles | `src/styles/workflow-showcase.css` |
| Astro page | `src/pages/workflow-showcase.astro` |

### Schema deltas vs. the original template

The Phase 1 schema differs from the JSON sketch above in two small ways. **Use the new shape for all stages going forward**:

1. **`status` is required** on `Stage` (`"published" | "draft" | "unreleased"`). Only `"published"` stages are filtered into the page.
2. **`steps[].panels`** is now an inline `Partial<Record<ArtifactType, Artifact>>` (per-step content), not a reference to a stage-wide `artifacts` map. Each step carries the panel content that should be shown when that step is active. This matches the SPIKE recommendation and removes a layer of indirection.
3. **`steps[].terminal`** is an array of strings (`string[]`), not a single string with `\n` escapes.
4. **Optional Phase 2 asset fields** are reserved on both `Stage` (`thumbnail`, `socialClip`) and `Step` (`terminalRecording`, `artifactSnapshots`). The demo-foundry pipeline will populate these in Phase 2; leave them omitted for hand-authored fixtures.

### Reference fixture

`src/data/workflow-stages.json` ships with one stage — `test-fixture` (status: `published`) — which exercises every UI surface. Use it as a copy-and-modify template until Stage 1 lands.

### Validation commands

```
npm run check     # TypeScript + Astro
npm run build     # Full static build
npm run dev       # Visit /workflow-showcase/?stage=<id>
```


---

## URL Scheme (Permanent)

The Workflow Showcase URL scheme is contractual. External links from blog
posts, social media, and the MeatyBrain PKM rely on it remaining stable.

### Canonical Form

```
/workflow-showcase/?stage=<stage-id>
```

- `<stage-id>` is the **string id** from `workflow-stages.json` (e.g.,
  `stage-1`, `stage-2`), not the post number and not a positional index.
- The page resolves the active stage from the `stage` query parameter and
  falls back to the first published stage if the parameter is missing or
  refers to an unpublished/unknown id (with an inline notice).

### Stability Rules

- **Stage IDs are immutable once a stage is published.** Renaming a stage
  id breaks every external link. If you need to change a stage's content
  or title, edit the manifest, regenerate, and keep the id.
- **Reordering stages is allowed.** The selector renders in declaration
  order in `workflow-stages.json`; existing `?stage=stage-N` links continue
  to resolve because lookup is by id, not by position.
- **Adding stages is additive.** A new stage gets its own id (`stage-3`,
  `stage-4`, ...) and a corresponding `demo/demos/<slug>/demo.yaml`
  manifest. Existing links are unaffected.
- **Unpublishing a stage** (setting `status` to anything other than
  `published`) removes it from the selector and the dataset returned to
  the island. Direct links to that id fall back to the latest published
  stage with a "stage not found" notice. Prefer leaving content live and
  versioning the manifest if the goal is to revise.

### Where Blog Posts Should Link

- Post N should link to `?stage=stage-N` (one-to-one mapping where the
  post number equals the stage number in the id).
- Use benefit-driven link text. Example: "See the ungoverned run in
  action in the [Living Workflow Showcase](/workflow-showcase/?stage=stage-1)."

### What Breaks the Contract

Avoid any of these without a planned migration:

- Switching the stage parameter to a positional integer
  (`?stage=1` meaning "the first stage" instead of `stage=stage-1`).
- Moving the page off `/workflow-showcase/`.
- Removing the `stage` query parameter in favour of a path segment
  (`/workflow-showcase/stage-1/`) without a redirect from the query form.

If any of these is unavoidable, ship a redirect for the old form and
document it in this section before merging.
