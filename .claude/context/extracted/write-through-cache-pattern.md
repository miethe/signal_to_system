---
title: Write-Through Cache Pattern
description: Universal pattern for filesystem-backed data with DB cache synchronization
audience: ai-agents
tags:
  - data-flow
  - caching
  - backend
  - architecture
created: 2026-03-20
updated: 2026-03-20
category: backend
status: active
references: []
extracted_from: .claude/context/key-context/data-flow-patterns.md
---

# Write-Through Cache Pattern

Universal pattern for systems that use filesystem as source of truth with a database cache layer.

## Core Pattern

Web mutations on filesystem-backed data follow this sequence:

1. **Write to filesystem first** (source of truth)
2. **Sync to DB cache** via refresh function
3. **Invalidate frontend caches** (TanStack Query, SWR, etc.)

```
Frontend → API → Filesystem (write) → DB Cache (sync) → Frontend (invalidate)
```

## When to Use

- Config files stored on disk but queried frequently
- Static content with metadata caching
- User-generated content with filesystem persistence
- Any system where "filesystem = truth, DB = derived view"

## Implementation Pattern

```python
# After filesystem write
def create_artifact(data):
    # 1. Write to filesystem
    write_to_disk(data)

    # 2. Sync to DB cache
    refresh_single_artifact_cache(artifact_id)

    # 3. Return success (frontend invalidates on response)
    return {"id": artifact_id, "status": "created"}
```

## Exception: DB-Native Features

Features that are inherently database-native (collections, groups, tags, user preferences) write DB first, then optionally write-back to filesystem:

```
Frontend → API → DB (write) → Filesystem (optional write-back)
```

## Cache Refresh Triggers

| Trigger | Scope | Mechanism |
|---------|-------|-----------|
| Server startup | Full | FS → DB full sync in `lifespan()` |
| Single mutation | Targeted | `refresh_single_artifact_cache()` |
| Manual refresh | Full | `POST /cache/refresh` endpoint |
| Frontend bulk op | Full | `useCacheRefresh()` hook |

## Stale Times by Domain

| Domain | Stale Time | Rationale |
|--------|-----------|-----------|
| List/browse views | 5 min | Standard browsing, cache-backed |
| Search results | 30 sec | Interactive, needs freshness |
| Detail views | 5 min | Low-frequency changes |
| Deployments | 2 min | More dynamic |
| Diff queries | 30 sec | Interactive, expensive |
| Monitoring/analytics | 30 sec | Real-time feedback needed |
| External/marketplace | 1 min | Moderately dynamic |
