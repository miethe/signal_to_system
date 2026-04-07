# Series Brief: Dev Stories / I Let Claude Build My App

**Status**: Planning phase (Rich source materials available)  
**Target**: 14 main posts + 5 bonus posts  
**Audience**: CTOs, architects, platform engineering leaders (Primary); Developers and Claude Code power users (Secondary)  
**Scope**: 5-month journey building SkillMeat (Oct 2025–March 2026); ~650K lines of code; 2,600+ commits; 128 PRs; Full-stack AI-driven development

## Core Thesis

AI agents are capable of building production-quality full-stack applications when the human acts as architect and orchestrator rather than implementor. The key is infrastructure: CLAUDE.md as control plane, specialized agent roles, context budgeting, and orchestration-driven development. This series proves the thesis with concrete metrics, git history, and honest reflection on successes and failures.

## Narrative Arc

### Act 1: The Audacious Experiment (Posts 1–2)

Establish the thesis, key metrics, and architecture evolution.

- **Post 1**: Series introduction and project overview. 5 months, 2,600+ commits, 128 PRs, ~650K LOC. The Opus Delegation Principle.
- **Post 2**: Architecture evolution from simple CLI tool to production full-stack platform. Scope growth narrative.

### Act 2: How It Actually Works (Posts 3–11)

The mechanics of agentic development, from orchestration to infrastructure to debugging.

- **Post 3**: Agent taxonomy and specialized roles. Implementation, exploration, review, orchestration agents. Model selection.
- **Post 4**: PRD → Implementation Plan → Phase Progress Files → Batch Delegation workflow. Orchestration-driven development.
- **Post 5**: Context window as budget. Token economics, 200K context, 52K baseline tax, progressive disclosure.
- **Post 6**: Frontend at scale. 50+ React components, UnifiedEntityModal, Tiered Card System, 388K lines of TypeScript.
- **Post 7**: Marketplace architecture. GitHub-powered artifact discovery, heuristic scoring, FTS5 full-text search.
- **Post 8**: The bug factory. Bug taxonomy, famous debugging sagas (DiffViewer scrolling, SQLAlchemy cache poisoning), delegation patterns.
- **Post 9**: Multi-model orchestration. Claude, Copilot, Jules, Gemini. Contributor stats, disagreement protocol, model selection heuristics.
- **Post 10**: Memory systems. Dual memory (file-based + in-app), types and promotion workflows, candidate-to-approved lifecycle.
- **Post 11**: CLAUDE.md as control plane. 680-line file that runs everything. Progressive disclosure, prime directives, agent delegation tables.

### Act 3: The Bigger Picture (Posts 12–14)

Lessons, analytics, retrospective.

- **Post 12**: Versioning and merge system. Three-way diffs, conflict resolution, artifact versioning, change attribution.
- **Post 13**: CCDash analytics dashboard. Mining JSONL transcripts, subagent topology, cost attribution, effectiveness scoring.
- **Post 14**: Comprehensive retrospective. What worked, what didn't, economics analysis, practical advice for agentic development.

## Complete Post Breakdown

### Main Series (14 Posts)

| # | Title | Focus | Key Topics |
|---|-------|-------|-----------|
| 1 | I Let Claude Build My App: 5 Months and 3,600 Commits Later | Series intro + metrics | Opus Delegation Principle, 2,600+ commits, 128 PRs, ~650K LOC, SkillMeat overview |
| 2 | From CLI Tool to Full-Stack Platform: The Architecture Evolution | Journey to production | FastAPI, Next.js 15, 23+ endpoints, collection architecture pivot, scope growth |
| 3 | The Agent Orchestra: How I Use 30+ Specialized AI Agents | Agent taxonomy | Roles: Implementation, Exploration, Review, Orchestration. Model selection rationale. Permission modes. |
| 4 | Orchestration-Driven Development: PRDs, Progress Files, and YAML | Methodology | PRD → Plan → Progress → Delegation. CLI tracking. YAML frontmatter discipline. |
| 5 | The Context Window is Your Budget: Token Economics | Resource management | 200K budget, 52K baseline tax, progressive disclosure, symbol-first exploration (~150 vs 5–15K tokens) |
| 6 | When AI Writes Your Frontend: Next.js 15, Radix UI, 388K Lines of TS | Frontend scale | 50+ React components, UnifiedEntityModal, Tiered Card, accessibility, testing |
| 7 | The Marketplace: Building a GitHub-Powered Artifact Discovery Engine | Discovery system | Heuristic confidence, GitHub scanner, deduplication, FTS5 full-text search |
| 8 | The Bug Factory: What Happens When AI Agents Create Bugs (And Fix Them) | Debugging patterns | Bug taxonomy, DiffViewer scrolling saga, SQLAlchemy poisoning, delegation, error rates |
| 9 | Multi-Model Development: Claude, Copilot, Jules, and Gemini Walk In | Cross-model orchestration | Stats, heuristics, disagreement protocol, specialized roles |
| 10 | The Memory System: Teaching Your AI to Remember Across Sessions | Long-term context | File-based + in-app memory, types, promotion workflows, candidate → approved lifecycle |
| 11 | CLAUDE.md as Control Plane: The 680-Line File That Runs Everything | Governance | Progressive disclosure, directives, agent tables, rules, 5-month evolution |
| 12 | The Versioning and Merge System: Three-Way Diffs and Conflict Resolution | Git-like versioning | Artifact versioning, DiffEngine, MergeEngine, attribution, conflict resolution |
| 13 | CCDash: The Dashboard I Built to Understand My AI's Work | Analytics | JSONL mining, topology viz, cost attribution, effectiveness scoring |
| 14 | Lessons from 5 Months of Agentic Development: What I'd Do Differently | Retrospective | What worked/didn't, economics, advice, future directions |

### Bonus Series (5 Posts)

| # | Title | Focus | Key Topics |
|---|-------|-------|-----------|
| B1 | The Skill Ecosystem: What Claude Code Artifacts Actually Are | Educational | Artifacts vs skills vs agents, ecosystem, non-technical intro |
| B2 | Enterprise Edition: Adding Multi-Tenancy to a Solo Project | Architecture | UUID PKs, SQLAlchemy 2.x, PostgreSQL JSONB, RBAC |
| B3 | The Great Refactor: Collection Consolidation v2 | Incremental refactoring | 3-page modal consolidation, unified modal, registry-driven, 400+ LOC dedup |
| B4 | Building a Component Library Mid-Project: @miethe/ui Extraction | Component arch | Tiered Card refactor, extracting reusable, design system mid-project |
| B5 | AI Code Review: Having Agents Review Each Other's Work | Review workflow | Review agent ecosystem, read-only permission, peer patterns, quality improvements |

## Key Concepts to Seed Across Series

1. **Opus Delegation Principle**: Opus as orchestrator, other models as specialized implementers
2. **Agent Amnesia → Memory Systems**: Problem (loss of context) → Solution (persistent memory across sessions)
3. **Control Planes**: CLAUDE.md as deployed artifact governing agent behavior
4. **Token Economics**: Context is a resource to budget and optimize
5. **Orchestration-Driven Development**: PRDs and progress files are executable source code
6. **Infrastructure-First**: Tooling (memory, version control, observability) enables scale
7. **Multi-Model Strengths**: Each model has specialized roles; disagreement protocols catch bugs

## Data Sources & Evidence

All posts are grounded in primary sources:

- **Git History**: 2,600+ commits with detailed messages (commit structure reveals decision-making)
- **Pull Requests**: 128 PRs with descriptions, reviews, discussions (iteration patterns)
- **Progress Tracking**: `.claude/progress/` phase files (project state over time)
- **Architecture Notes**: `.claude/worknotes/` context and bug logs (real-time problem-solving)
- **Session Transcripts**: CCDash JSONL logs (detailed agent behavior, cost, effectiveness)
- **Code Metrics**: LOC by service/language, test coverage growth, OpenAPI evolution
- **Cost Records**: Token accounting and cost attribution by agent/model
- **Agent Logs**: Delegation patterns, model performance analytics

## Publication Plan

**Publication**: Signal to System (signaltosystem.com)  
**Category**: Dev Stories  
**Target Launch**: May 2026 (rolling 1–2 posts per week)  
**Total Word Count**: 60K–75K (main), 10K–15K (bonus)

## Series Continuity Notes

- **Posts 1–2**: Hook with audacity; establish scope and thesis
- **Posts 3–5**: Foundations (agents, methodology, resource budgeting)
- **Posts 6–11**: Implementation deep dives (systems, patterns, infrastructure)
- **Posts 12–14**: Reflection and extraction of lessons
- **Bonus posts**: Standalone explorations of specific subsystems

Each main post stands alone but contributes to cumulative narrative. Bonus posts are educational and optional.

## Tone & Voice Guidelines

- **Technical but accessible**: CTOs should understand without being condescended to
- **First-person narrative**: "I built X" not "one could build X"
- **Grounded in metrics and primary sources**: Use git history, transcripts, code as evidence
- **Honest reflection**: Acknowledge failures, misestimates, lessons learned
- **Anti-hype**: Avoid "revolutionary" or "game-changing" language. Let the work speak.
- **Balance depth with clarity**: Technical readers deserve rigor; general readers deserve accessibility

## Key Decision Points for Drafters

1. **Primary source fidelity**: Always reference git history, transcript excerpts, code patterns when making claims
2. **Honest accounting**: If something didn't work or took longer than expected, say so
3. **Metrics-first**: Lead with numbers (commits, LOC, costs) before narrative
4. **Model naming**: Consistent names: Claude Opus, Claude Sonnet, Claude Haiku (not "Claude 3.5 Sonnet")
5. **Series threading**: Each post should acknowledge earlier posts and hint at later ones
6. **SkillMeat naming**: Use "SkillMeat" in blog (public); SAM is internal codename
7. **Code snippets**: Use sparingly; prefer architectural diagrams and narrative of git history
8. **Cost transparency**: Be explicit about token spend and cost comparisons between models

## Research Directories

- `/Users/miethe/dev/homelab/development/signal_to_system/` — Live codebase, git history, progress files, CCDash
- `/Users/miethe/Documents/Other/PKM/MeatyBrain/` — Supporting context and analysis

## Publication Sources

- **Series Specification**: `/Users/miethe/Documents/Other/PKM/MeatyBrain/Blogs/Dev Stories/Blog Series.md`
- **Detailed Series Outline**: `/Users/miethe/Documents/Other/PKM/MeatyBrain/Blogs/Dev Stories/Detailed Series Outline.md` (17KB; read sections as needed)

## Current Draft Status

| Post | Status | Notes |
|------|--------|-------|
| 1–14 | Outline + detailed specs | Extensive scaffolding in place; rich primary source materials available |
| B1–B5 | Outline + specs | Educational and optional; support main series |

All posts are ready for Phase 3–4 drafting with comprehensive planning materials.

## Frontmatter Metadata

- **Series**: `I Let Claude Build My App` (or `Dev Stories`)
- **Category**: Likely `Projects` (case study focus) or `Agentic SDLC`
- **Tags**: `agentic-sdlc`, `agent-orchestration`, `claude-code`, `full-stack-development`, `platform-engineering`, `developer-experience`, etc.

## When to Load This Brief

Load this brief when:
- Drafting any post in the Dev Stories series
- Reviewing posts for consistency with primary sources and metrics
- Evaluating series narrative arc and continuity
- Verifying technical accuracy against codebase and transcripts

See the main SKILL.md `references/` section for other active series.
