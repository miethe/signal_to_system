# Series Brief: AI Workflows

**Status**: Planning phase  
**Target**: 5 posts  
**Audience**: Practitioners, technical professionals, AI-native builders  
**Scope**: Workflow-first paradigm, artifact-driven patterns, multi-tool orchestration

## Core Thesis

AI operations must be **workflow-first, not tool-first**. The key to scaling AI is structured artifact handoffs (PRDs, storyboards, research memos) rather than conversational memory. Every task should route to the tool strongest at producing the **first required artifact**, not the final output. This series documents a replicable personal workflow OS.

## Series Outline

### Post 1: The AI Workflow OS — Why Your AI Workflows Are Failing

**Hook**: Most professionals treat AI as one-size-fits-all chat windows, leading to context loss, scope drift, unusable outputs.

**Key Concepts**:
- **Real Pattern**: AI operations must be workflow-first, not tool-first
- **5 Core Decision Lenses**:
  1. Sensitivity / Compliance (public-safe vs. internal-sensitive)
  2. Output Artifact Required (PRD vs. storyboard vs. research memo)
  3. Speed vs Depth (fast single-pass vs. deep multi-agent swarm)
  4. Cost (subscription-included UI vs. metered API)
  5. Reusability (one-off task vs. recurring automated pipeline)
- **Decision Logic**: Route task to the tool strongest at producing the first required artifact
- **Example Run**: Task triage using `TPL_TaskIntakeTriage_v1_2026-03-04.md` template
- **Anti-Patterns**: Using one tool for every phase by default; skipping intermediate artifacts
- **Closing Takeaway**: If your AI output decays, it's a storage bin; if curated and structured, it compounds

**Status**: Storyboard complete; ready for drafting

---

### Post 2: How I Stopped Doing AI Research in One Chat Window

**Hook**: Asking a single LLM to ideate, execute, and synthesize complex research guarantees shallow results.

**Key Concepts**:
- **Real Pattern**: Separate research pipeline into ideation → prompt orchestration → execution → deepening → knowledge retention
- **My Workflow**:
  - Ideation & Orchestration: Gemini Gem #1 (Idea Generator) for fuzzy topics, then Gemini Gem #2 (Deep Research Prompt Generator) to select execution platform
  - Execution: Perplexity Pro for fast, broad first pass
  - Retention: Output imported into NotebookLM for corpus-level synthesis and future recall
- **Decision Logic**: Default path uses subscription-included UIs; for high-stakes multi-lens topics, escalate to Claude Code Research Swarm
- **Example Run**: Competitive analysis on "Gemini grounding vs. Perplexity real-time search" — orchestrate with Gem #2, execute in Perplexity, save in NotebookLM
- **Tradeoffs**: Gemini-to-Perplexity-to-NotebookLM is cost-effective and fast; swarms yield higher rigor but cost more
- **Anti-Patterns**: Starting research without Gem #2 orchestration (poor structure); failing to capture output in NotebookLM (no compounding value)

**Status**: Storyboard complete; ready for drafting

---

### Post 3: The Voice-to-PRD Pipeline (Never Build Without an Artifact)

**Hook**: Jumping straight into AI coding assistant with raw idea leads to scope drift and context collapse.

**Key Concepts**:
- **Real Pattern**: Software development requires distinct tool roles: ChatGPT (ideation) → Gemini (PRD planning) → UI canvas (prototyping) → Claude Code/Codex (active implementation)
- **My Workflow**:
  - Ideate: Voice brainstorming in ChatGPT shapes the net-new concept
  - Plan: Gemini (grounded by NotebookLM project memory) generates structured MVP-style PRD
  - Prototype: Simple ideas → Gemini Canvas; complex scopes → Google AI Studio, then exported locally
  - Implement: PRD handed to Claude Code planning skill to generate implementation plans and `.claude/progress/` markdown files
- **Decision Logic**: Codebase sharing requires strict sensitivity gate. Public-safe projects use full external pipeline; mixed-sensitivity split between abstract (external) and proprietary (internal)
- **Example Run**: Gemini generates MVP PRD → Claude Code creates `.claude/progress/[prd]/phase-N-progress.md` files → execution loop
- **Tradeoffs**: Skipping PRD saves 30 min upfront but costs days of downstream confusion
- **Anti-Patterns**: Collapsing ideation/planning/prototyping into one AI session; going to local IDE too early before prototype validated

**Status**: Storyboard complete; ready for drafting

---

### Post 4: The Storyboard-to-Scaffold Presentation Factory

**Hook**: Asking image generation tool to "make a slide deck" produces expensive, structurally incoherent assets.

**Key Concepts**:
- **Real Pattern**: Lock story narrative first via text storyboards; treat AI-generated images as visual scaffolds (F1 fidelity), not finalized deliverables
- **My Workflow**:
  - Path A (Public-Safe, Grounded): If NotebookLM corpus exists, generate deck narrative directly within notebook
  - Path B (Visual Scaffolding): Gemini storyboards slide-by-slide text; feed visual intent to Nano Banana 2/Pro for design blueprints (slide scaffolds)
  - Path D (Internal-Sensitive): Default to ICA for internal storyboarding; limit external tools to generic visual assets (SVG layouts, placeholder diagrams)
- **Decision Logic**: Manual UI assembly (R1–R2) is standard; escalate to Claude Code agentic pipeline (R3) only for recurring, high-volume deck formats where API cost of chaining Gemini/Nano Banana/NotebookLM is justified
- **Example Run**: Public-safe slide scaffold. Gemini outlines 12-slide flow. Nano Banana generates "clean enterprise architecture diagram template with placeholder labels" in IBM Plex Sans
- **Anti-Patterns**: Generating visual assets before text storyboard locked; mixing internal-sensitive text into external Nano Banana prompt

**Status**: Storyboard complete; ready for drafting

---

### Post 5: Stop Burning Tokens: Escalate Cost Only When Value is Explicit

**Hook**: Without workflow governance, agentic AI pipelines quietly burn massive API budgets on trivial tasks.

**Key Concepts**:
- **Real Pattern**: Default to lowest marginal-cost path that meets fidelity requirement. Escalate to metered automation only when parameter control, repeatability, or swarm analytics are strictly required
- **My Cost Thresholds**:
  - Level 1 (Subscription UI): Default for exploration, brainstorming, text ideation, first-pass Gemini/NotebookLM storyboards
  - Level 2 (Metered API/CLI): Escalate for visual generation (Nano Banana) where exact resolution/parameters required, or when batching saves time
  - Level 3 (Agentic Swarms): Reserved exclusively for high-stakes decision-grade research or complex SDLC multi-agent workflows
- **Decision Logic**: Only build metered automated pipeline (R3) if it replaces repeated manual steps across 3–10 uses and setup+run costs are lower than expected manual time savings
- **Example Run**: Nano Banana image budgeting. Define target asset count before running; use low-cost standard models for concept validation; only upgrade to Nano Banana Pro for finalized, stakeholder-ready (F3) assets
- **Anti-Patterns**: Re-running paid image generations for basic concept exploration; triggering Claude Code research swarm for simple topics answerable with subscription Perplexity Pro search

**Status**: Storyboard complete; ready for drafting

---

## Key Concepts to Seed Across Series

1. **Workflow-First Paradigm**: Not tool-first; route to tool strongest at producing first artifact
2. **5 Decision Lenses**: Sensitivity, Artifact, Speed/Depth, Cost, Reusability
3. **Artifact Handoffs**: Structured intermediate outputs (PRD, storyboard, research memo) are critical
4. **Cost Governance**: Default subscription, escalate to metered only when justified by repetition or ROI
5. **Sensitivity Gating**: Internal-sensitive work routes to internal tools; public-safe can use full external pipeline
6. **Compounding vs. Decay**: Curated, structured outputs compound; neglected outputs decay

## Research Directories

- `/Users/miethe/Documents/Other/PKM/MeatyBrain/AI Workflows/` — Core workflow OS material
- `/Users/miethe/Documents/Other/PKM/MeatyBrain/Workflow OS/` — 20+ versioned framework docs
- `/Users/miethe/Documents/Other/PKM/MeatyBrain/Agentic SDLC/` — Related governance patterns

## Publication Sources

- **Series Overview**: `/Users/miethe/Documents/Other/PKM/MeatyBrain/Blogs/AI Workflows/series-overview.md`
- **Kickoff Storyboard**: `/Users/miethe/Documents/Other/PKM/MeatyBrain/Blogs/AI Workflows/kickoff-storyboard.md`

## Current Draft Status

| Post | Status | Notes |
|------|--------|-------|
| 1 | Storyboard | Ready for Phase 4 drafting; rich concept material |
| 2 | Storyboard | Ready for Phase 4 drafting; research workflow is well-documented |
| 3 | Storyboard | Ready for Phase 4 drafting; PRD-to-implementation focus |
| 4 | Storyboard | Ready for Phase 4 drafting; presentation factory arc complete |
| 5 | Storyboard | Ready for Phase 4 drafting; cost governance framework |

## Series Continuity Notes

- **Post 1 establishes the frame**: Workflow-first paradigm, 5 decision lenses
- **Posts 2–5 detail specific workflows**: Research, development, presentations, cost governance
- **Each post is a self-contained workflow blueprint**, but all reinforce the central thesis
- Cross-references should point backward (later posts reference earlier lenses) and forward (early posts hint at later workflows)

## Key Decision Points for Drafters

1. **Audience breadth**: This series is less CTO/architect-focused than Governed Agentic SDLC. Audience is practitioners and builders.
2. **Tool neutrality**: While posts reference specific tools (Gemini, Perplexity, Claude Code, etc.), avoid vendor favoritism. Frame as examples of a pattern.
3. **Cost transparency**: Be explicit about cost thresholds and when to escalate. This is a practical guide.
4. **Workflow OS framing**: This is Nick's operational methodology, not a generic how-to. Keep personal voice ("My Workflow") consistent throughout.
5. **Sensitivity patterns**: Internal-sensitive vs. public-safe gating is recurring motif — reinforce across posts.

## Frontmatter Metadata

- **Series**: `AI Workflows`
- **Category**: Likely `AI Agents` or `Projects` (verify against post topic)
- **Tags**: `workflow-orchestration`, `artifact-driven`, `multi-tool-pipelines`, `cost-governance`, `ai-operations`, etc.

## When to Load This Brief

Load this brief when:
- Drafting any post in the AI Workflows series
- Reviewing posts for consistency across workflow patterns
- Evaluating cross-post concept threading (especially decision lenses and cost governance)

See the main SKILL.md `references/` section for other active series.
