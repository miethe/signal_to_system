---
title: Layered Context Model
description: Universal context governance pattern for AI agent projects with token budgets
audience: ai-agents
tags:
  - context
  - governance
  - token-efficiency
  - architecture
created: 2026-03-20
updated: 2026-03-20
category: general
status: active
references: []
extracted_from: .claude/context/key-context/layered-context-governance.md
---

# Layered Context Model

Defines a ratified context model and budget guardrails for AI-assisted development.

## Ratified Layers

1. **Layer 0 — Runtime Truth**: Machine-readable artifacts (`openapi.json`, hooks barrel, symbols JSON). Always canonical.
2. **Layer 1 — Entry CLAUDE.md**: Routing + non-negotiable invariants only.
3. **Layer 2 — Key Context**: Compact task-routing playbooks.
4. **Layer 3 — Deep Context**: Domain docs and detailed references.
5. **Layer 4 — Historical Docs**: Reports/plans — never runtime truth; use for rationale only.
6. **Layer 5 — External Retrieval**: NotebookLM/RAG synthesis — always verify against Layer 0.

## Token Budgets

| Layer | Target |
|-------|--------|
| Layer 1 entry files | 150-300 lines each |
| Layer 2 key-context docs | 120-250 lines each |
| Rules files (if used) | ≤ 40 lines, universal only |
| Per-task loaded context | ≤ 2,500 tokens (excluding code reads) |

## Context Loading Ladder

1. Query **runtime truth** first (openapi, hooks barrel, symbols).
2. Read **entry CLAUDE.md** for scope invariants and routing.
3. Read the relevant **key-context file** for task-level playbook.
4. Pull **deep context** only for unresolved details.
5. Use **reports/plans** for rationale only — re-verify from runtime truth.

## Stop Conditions

Stop loading more docs when all are true:
- Target files identified
- Contract behavior confirmed from machine artifacts
- One implementation pattern is selected and testable

## Change Policy

- New guidance starts in key-context unless globally universal.
- Rules additions require universal-scope justification.
- Historical plans must not be cited as canonical without Layer 0 verification.
