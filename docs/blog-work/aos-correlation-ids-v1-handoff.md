---
schema_version: 1
status: metadata-handoff
updated: 2026-07-06
source_plan: /Users/miethe/dev/homelab/development/agentic_meta_dev/.claude/plans/aos-universal-correlation-ids-v1.md
contract: /Users/miethe/dev/homelab/development/agentic_meta_dev/docs/agentic-operator/contracts/aos-correlation.md
---

# AOS Correlation IDs v1 - Signal To System Handoff

Signal To System only needs metadata preservation for v1. When AOS story/AAR publication creates a
draft, preserve `aos_artifact_uuid` and `aos_run_uuid` in the private source packet and public-safe
draft frontmatter. Do not expose local transcript paths or raw sidecar records in public posts.
