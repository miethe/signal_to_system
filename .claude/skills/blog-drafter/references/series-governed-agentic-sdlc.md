# Series Brief: Governed Agentic SDLC

**Status**: Active (Drafting)  
**Target**: 5 posts  
**Audience**: CTOs, VP Engineering, Platform Engineering Leads, Enterprise Architects  
**Scope**: `Oct 2025 – March 2026` initiative; ongoing at publication time

## Core Thesis

Generative AI is not a tool; it is a **nondeterministic runtime**. To scale it safely and measure ROI, enterprises must transition from manual "vibe coding" in stateless chat windows to a **Governed Agentic SDLC** where:
- Human intent is source code
- Context is the environment
- Agent execution is fully observable

## Series Outline

### Post 1: The AI Productivity Paradox (And the Rise of "Shadow AI")

**Hook**: Developers are 50% faster, yet enterprise release cycles haven't budged. Why?

**Key Concepts**:
- **Shadow AI Crisis**: Developers manually pasting proprietary code into unmonitored agent sessions, bypassing security and architectural review
- **Agent Amnesia**: Loss of complex legacy knowledge when chat windows close; next developer starts from zero
- **Missing Layer**: Platform Engineering must govern cognitive infrastructure (context, memory, tools), not just deployment pipelines

**Pivot**: Introduce "Governed Agentic SDLC" as solution to move from stateless chaos to stateful engineering

**Status**: Draft complete (Post 1 Outline exists; currently under Gemini review cycle)

---

### Post 2: Intent-Driven Development (Turning Specs into State Machines)

**Hook**: Stop writing tickets for humans. Start writing state machines for agents.

**Key Concepts**:
- **Beyond Markdown**: Why traditional PRDs and static text files fail in agentic workflows
- **Power of Frontmatter**: Injecting strict YAML frontmatter (`feature_slug`, `phase`, `status`, `lineage`) transforms static documents into machine-readable, living databases
- **Stateful Orchestration**: How the system infers "done." When all phase progress documents linked to a feature are marked complete, feature state updates automatically

**Takeaway**: Shift developer job from writing syntax to engineering intent

**Status**: Outline complete (Post 2 Outline with call-outs exists; not yet drafted)

---

### Post 3: Day 0 Governance: Engineering the Agent's Environment (Control Plane / SkillMeat)

**Hook**: You wouldn't let a junior engineer commit to production without onboarding. Why let an AI do it?

**Key Concepts**:
- **Agent Experience (AX)**: Curating the agent's environment is as critical as Developer Experience (DX)
- **Context Entities**: Treating `CLAUDE.md`, architectural specs, and coding standards as versioned, first-class deployment artifacts
- **Golden Context Pack**: Dynamically inject exact right rules, skills, and boundaries into a repo on Day 0, binding agent to enterprise standards before first prompt

**Scope**: Traces evolution of SkillMeat (SAM) from `skillman` CLI to Context Collections and Memory Items to cryptographic provenance (SkillBOM)

**Status**: Outline complete (Detailed Series Outline); not yet drafted

---

### Post 4: Closing the Loop: Telemetry, Forensics, and AI ROI (CCDash Observability)

**Hook**: If you can't trace token burn back to a specific business feature, you don't have an AI strategy—you have a leaky budget.

**Key Concepts**:
- **Agentic Observability**: Moving beyond basic APM to monitor the software development process itself
- **Forensic Attribution**: Intercepting session logs, tool sidecars, terminal actions to map every action directly back to `feature_slug` in spec
- **Integrity Signals**: Test visualizers and anomaly detectors catch regressions, trace to exact agent session and commit (prevent AI technical debt)

**Takeaway**: Prove ROI of agentic development through verifiable attribution

**Scope**: Chronicles CCDash evolution from basic forensics → SDLC Intelligence & Usage Attribution → Feature Execution Workbench with effectiveness scoring

**Status**: Outline complete (Detailed Series Outline); not yet drafted

---

### Post 5: The Enterprise Software Factory: Scaling Agentic Teams

**Hook**: How do we scale from one high-performing developer's machine to 5,000-person engineering organization?

**Key Concepts**:
- **Frictionless Shift-Left**: Integrating Governed Agentic SDLC into Internal Developer Platforms (Backstage/RHDH). Scaffolding new projects with context already attached.
- **SkillBOM**: Cryptographic provenance for AI-authored code. Know exactly which agent, using which context, wrote which line.
- **Adoption Playbook**: Assess gap, pilot the "Steel Thread," scale the factory.

**Takeaway**: From single-developer agentic environment to enterprise platform

**Status**: Outline complete (Detailed Series Outline); not yet drafted

---

## Key Concepts to Seed Across Series

These technical and architectural concepts must be introduced early and reinforced throughout:

1. **Control Plane**: Human intent → structured specs → agent execution → observable state
2. **Agent Amnesia**: Problem statement (Post 1); solved by memory/SkillMeat (Post 3)
3. **Intent-Driven Development (IDD)**: Methodology shift (Post 2)
4. **Golden Context Pack**: Day 0 governance concept (Post 3)
5. **SkillBOM**: Cryptographic provenance for AI code (Post 5)
6. **CCDash Observability**: Telemetry and attribution (Post 4)
7. **Distributed Cognitive Pursuits**: Multi-agent orchestration, governance patterns

## Research Directories

- `/Users/miethe/Documents/Other/PKM/MeatyBrain/Agentic SDLC/` — Core methodology and architecture docs
- `/Users/miethe/Documents/Other/PKM/MeatyBrain/AI Workflows/` — Related workflow OS material
- `/Users/miethe/dev/homelab/development/signal_to_system/` — Live codebase (SkillMeat + CCDash source)

## Publication Sources

- **Blog Series Spec**: `/Users/miethe/Documents/Other/PKM/MeatyBrain/Blogs/Governed Agentic SDLC/Blog Series.md`
- **Detailed Series Outline**: `/Users/miethe/Documents/Other/PKM/MeatyBrain/Blogs/Governed Agentic SDLC/Detailed Series Outline.md`
- **Post 2 Outline**: `/Users/miethe/Documents/Other/PKM/MeatyBrain/Blogs/Governed Agentic SDLC/Post 2 Outline.md`

## Current Draft Status

| Post | Status | Notes |
|------|--------|-------|
| 1 | Draft exists | Under Gemini review (multipart revision cycle active) |
| 2 | Outline + call-outs | Ready for Phase 4 drafting; extensive scaffolding in place |
| 3 | Outline | Ready for Phase 3–4; extensive architectural material available |
| 4 | Outline | Ready for Phase 3–4; CCDash evolution is rich material |
| 5 | Outline | Ready for Phase 3–4; enterprise scaling focus |

## Series Continuity Notes

- **Post 1 establishes the pain**: Shadow AI, Agent Amnesia, missing governance layer
- **Post 2 provides methodology**: Intent-Driven Development replaces "vibe coding"
- **Post 3 introduces tooling**: SkillMeat as the infrastructure to cure Amnesia and enforce governance
- **Post 4 closes observability loop**: CCDash proves ROI through attribution
- **Post 5 brings it to enterprise scale**: From individual to organizational deployment

Each post should reference earlier posts as "prerequisites" or "context" where helpful, but each must stand alone.

## Key Decision Points for Drafters

1. **IDD vs. SDD naming**: Series uses "Intent-Driven Development" rather than "Spec-Driven Development" — maintain consistency
2. **SkillMeat / SAM naming**: SkillMeat is the public name; SAM is internal codename. Use SkillMeat in blog posts.
3. **Frontmatter metadata**: All posts belong to series `"Governed Agentic SDLC"` with `seriesOrder: N`
4. **Tag consistency**: Use tags like `agentic-sdlc`, `intent-driven-development`, `governance`, `context-engineering`, `observability`, `infrastructure`
5. **Category**: Most posts fit `Agentic SDLC` or `Platform Engineering`

## When to Load This Brief

Load this brief when:
- Drafting any post in the Governed Agentic SDLC series
- Reviewing or revising posts for this series
- Evaluating series continuity or cross-post concept threading
- Planning the publication order or timing

See the main SKILL.md `references/` section for other active series.
