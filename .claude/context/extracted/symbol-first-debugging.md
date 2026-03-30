---
title: Symbol-First Debugging Workflow
description: Token-efficient debugging methodology using symbol graphs before file exploration
audience: ai-agents
tags:
  - debugging
  - symbols
  - token-efficiency
created: 2026-03-20
updated: 2026-03-20
category: debugging
status: active
references:
  - ai/symbols-*.json
extracted_from: .claude/context/key-context/debugging-patterns.md
---

# Symbol-First Debugging Workflow

**Prime Directive**: Start with symbols. Fall back to exploration only when needed.

Symbols provide 96% token savings over reading files. Use them as first-line investigation.

## Workflow

1. **Identify module**: From stack trace or error context
2. **Query symbols** (150 tokens): `grep "[name]" ai/symbols-*.json`
3. **Analyze locally**: Use grep/jq on symbol results
4. **Delegate if needed**: Send to ultrathink-debugger with symbol context
5. **Implement fix**: Use specialist agent

## Decision Tree: Symbols vs Codebase Explorer

### Use Symbols When (150 tokens)

- Looking for function/class definitions
- Understanding module structure
- Tracing call paths between components
- Finding where a name is defined/imported
- Quick architectural overview
- Identifying dependencies

**Example**:
```bash
# Find where module is defined
grep -r "\"name\": \"module_name\"" ai/symbols-*.json

# Check if it's exported
grep -A5 "\"exports\"" ai/symbols-backend.json | grep "module_name"
```

### Use Codebase Explorer When (5,000-15,000 tokens)

- Symbols don't have the name you're searching for
- Need to see actual implementation logic
- Investigating string literals or config values
- Pattern discovery across multiple files
- Need file content for complex analysis
- New codebase where symbols don't exist yet

### Hybrid Approach (Most Efficient: 2,000-5,000 tokens)

1. Query symbols first → get file paths
2. Use codebase-explorer with targeted file list
3. Read only specific files needed

**Example**:
```bash
# Step 1: Query symbols for file paths
grep "Manager" ai/symbols-backend.json | jq -r '.file_path'

# Step 2: Delegate to codebase-explorer with specific files
Task("codebase-explorer", "Analyze these files for validation logic:
     - src/core/manager.py
     - src/api/schemas/entity.py")
```
