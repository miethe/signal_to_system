---
title: Bug Categories Investigation Guide
description: Common bug types with symbol-based investigation commands and fix delegation
audience: ai-agents
tags:
  - debugging
  - investigation
  - error-handling
created: 2026-03-20
updated: 2026-03-20
category: debugging
status: active
references:
  - ai/symbols-*.json
extracted_from: .claude/context/key-context/debugging-patterns.md
---

# Bug Categories Investigation Guide

## 1. Import/Module Errors

**Symptoms**: `ModuleNotFoundError`, `ImportError`, `AttributeError` on import

**Investigation Commands**:
```bash
# Find where module is defined
grep -r "\"name\": \"module_name\"" ai/symbols-*.json

# Check if it's exported
grep -A5 "\"exports\"" ai/symbols-backend.json | grep "module_name"

# Find all imports of this module
grep "\"imports\"" ai/symbols-*.json | grep "module_name"
```

**Common Causes**:
- Module not exported in `__init__.py`
- Circular import dependency
- Incorrect import path
- Module renamed but imports not updated

**Fix Agent**: `python-backend-engineer` (Sonnet)

---

## 2. Type Errors / Schema Mismatches

**Symptoms**: `ValidationError`, Pydantic errors, TypeScript type errors

**Investigation Commands**:
```bash
# Find schema definition
grep "class.*Schema" ai/symbols-backend.json | grep "SchemaName"

# Get full schema details
grep -B2 -A15 "\"name\": \"SchemaName\"" ai/symbols-backend.json

# Find where schema is used
grep "SchemaName" ai/symbols-backend.json | jq -r '.file_path' | sort -u
```

**Common Causes**:
- Required field missing from request
- Field type mismatch (str vs int)
- Optional field marked as required
- Frontend/backend type mismatch

**Fix Agent**: Python → `python-backend-engineer`; TypeScript → `ui-engineer`

---

## 3. API Endpoint Errors

**Symptoms**: 404, 422, 500 errors from FastAPI/Express/etc.

**Investigation Commands**:
```bash
# Find router/endpoint definition
grep "\"router\"" ai/symbols-backend.json | grep "/api/path"

# Find endpoint handler
grep -B5 -A15 "\"router\": \"/api/v1/endpoint\"" ai/symbols-backend.json
```

**Common Causes**:

**404 Not Found**:
- Route not registered
- Incorrect URL prefix
- Path parameter mismatch

**422 Unprocessable Entity**:
- Request body validation failed
- Required field missing
- Schema constraint violation

**500 Internal Server Error**:
- Unhandled exception in handler
- Database connection issue
- Missing dependency injection

**Fix Agent**: `python-backend-engineer` or `backend-typescript-architect`

---

## 4. Database/ORM Errors

**Symptoms**: `IntegrityError`, `NoResultFound`, SQLAlchemy/Prisma errors

**Investigation Commands**:
```bash
# Find model definition
grep "class.*Base" ai/symbols-backend.json | grep "ModelName"

# Check model fields and relationships
grep -A25 "\"name\": \"ModelName\"" ai/symbols-backend.json

# Find repository methods
grep "Repository" ai/symbols-backend.json | grep "ModelName"
```

**Common Causes**:

**IntegrityError**: FK/unique/NOT NULL constraint violation

**NoResultFound**: Query returned no results when one() used; incorrect filter

**Other**: Detached instance, lazy loading outside session, concurrent modification

**Fix Agent**: `python-backend-engineer` or `data-layer-expert`

---

## 5. Frontend Component Errors

**Symptoms**: React errors, hooks errors, rendering issues, TypeScript errors

**Investigation Commands**:
```bash
# Find component definition
grep "\"name\": \"ComponentName\"" ai/symbols-frontend.json

# Check props interface
grep -A10 "ComponentNameProps" ai/symbols-frontend.json

# Check hooks usage
grep -A20 "\"name\": \"ComponentName\"" ai/symbols-frontend.json | grep "use"
```

**Common Causes**:
- Incorrect prop types
- Hook called conditionally or outside component
- State update during render
- Missing dependency in useEffect
- Stale closure in callback

**Fix Agent**: `ui-engineer-enhanced` or `frontend-developer`
