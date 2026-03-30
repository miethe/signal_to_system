---
title: Agent Delegation Patterns
description: Universal patterns for delegating work to specialized AI agents in orchestrated workflows
audience: ai-agents
tags:
  - agents
  - delegation
  - orchestration
  - token-efficiency
created: 2026-03-20
updated: 2026-03-20
category: agentic-workflow
status: active
references: []
extracted_from: .claude/context/key-context/debugging-patterns.md
---

# Agent Delegation Patterns

Universal patterns for orchestrating work across specialized AI agents.

## Core Principle

**Opus orchestrates; subagents execute.**

- Orchestrator focuses on reasoning, analysis, planning
- Implementation delegated to specialized agents
- File context given as paths, not contents (subagents read themselves)
- No `TaskOutput()` for file-writing agents — verify on disk instead

## Agent Selection by Task Type

| Task Type | Primary Agent | Model |
|-----------|---------------|-------|
| Find files/patterns | codebase-explorer | Haiku |
| Deep analysis | ultrathink-debugger | Sonnet/Opus |
| React/UI components | ui-engineer-enhanced | Sonnet |
| TypeScript backend | backend-typescript-architect | Sonnet |
| Python backend | python-backend-engineer | Sonnet |
| Database/ORM | data-layer-expert | Sonnet |
| Documentation | documentation-writer | Haiku |
| Validation/review | task-completion-validator | Sonnet |

## Delegation Prompt Pattern

```
Task("[AGENT]", "[TASK_DESCRIPTION]:

Location: [FILE_PATH]
Pattern: Follow [EXISTING_PATTERN_PATH]
Changes:
- [CHANGE_1]
- [CHANGE_2]

Constraints:
- [CONSTRAINT]")
```

## When to Use Subagents vs Direct Work

### Use Subagents For
- Implementation work (code writing)
- Multi-file changes
- Pattern discovery across codebase
- Documentation generation
- Review/validation

### Do Directly (as Orchestrator)
- Git commits
- Progress tracking updates
- CLI commands for verification
- Reading small config files
- Planning decisions

## Parallel vs Sequential

**Parallel** (single message with multiple Task() calls):
- Independent tasks with no shared files
- Different files/modules
- No dependency between outputs

**Sequential** (separate messages):
- Task B needs output from Task A
- Same file modified by both
- Validation after implementation

## Context Budget Rules

- Task prompts < 500 words
- Provide file paths, not file contents
- No `TaskOutput()` for file-writing agents
- Always scope Glob with `path` parameter
- Budget ~25-30K tokens per phase
