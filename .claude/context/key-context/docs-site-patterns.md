---
title: Documentation Site Patterns
description: MkDocs Material docs site architecture, screenshot integration, and maintenance patterns
created: 2026-03-19
references: []
---

# Documentation Site Patterns

## Architecture

- **Framework**: MkDocs Material
- **Config**: `mkdocs.yml` (repo root)
- **Content dir**: `docs/user/` (`docs_dir` setting)
- **Hooks**: `docs/hooks/screenshot_bridge.py` — bridges screenshots from README build system
- **Build**: `mkdocs build --strict` / `mkdocs serve` for local preview
- **Requirements**: `docs/requirements.txt`

## Navigation Structure (6 tabs)

| Tab | Content | When to add pages here |
|-----|---------|----------------------|
| Home | Landing page (`index.md`) | Rarely changes |
| Getting Started | Quickstart, auth setup, examples | New onboarding flows |
| Guides | Feature documentation grouped by domain | New feature guides, usage docs |
| CLI Reference | CLI overview + auto-generated reference | CLI commands auto-update via mkdocs-click |
| Administration | Server setup, config, migration | Platform/infra docs |
| Resources | Release notes, beta, training | New releases, training material |

## Adding a New Guide Page

1. Create the `.md` file under `docs/user/guides/` (or appropriate subdir)
2. Add the page to `mkdocs.yml` nav under the correct tab and section
3. Run `mkdocs serve` to verify navigation and rendering
4. If the page needs screenshots, see "Screenshot Integration" below

## Screenshot Integration

**Source of truth**: `.github/readme/data/screenshots.json`
**Bridge hook**: `docs/hooks/screenshot_bridge.py` (runs on every `mkdocs build`/`serve`)
**Generated dirs** (gitignored): `docs/user/assets/screenshots/`, `docs/user/_includes/`

### Never manually copy screenshots

Do not place PNGs directly into `docs/user/assets/screenshots/` — that directory is managed by the bridge hook and will be overwritten. Always add screenshots via the `screenshots.json` registry.

### Adding screenshots to a doc page

**Option A — Feature snippet include** (preferred for feature overview pages):

```markdown
--8<-- "_includes/screenshots/marketplace.md"
```

This includes ALL captured screenshots tagged with the `marketplace` feature.

**Option B — Direct image reference** (for specific screenshots):

```markdown
![Marketplace sources list](assets/screenshots/features/marketplace/marketplace-sources.png){ loading=lazy }
```

### Adding a new screenshot

1. Capture the screenshot to `docs/screenshots/features/{area}/{name}.png`
2. Add entry to `.github/readme/data/screenshots.json` with `status: "captured"`
3. Run `mkdocs serve` — the hook copies it and regenerates snippets
4. Reference it in docs via Option A or B above

### How the bridge works

```
screenshots.json (source of truth)
       |
       v
screenshot_bridge.py on_pre_build hook
       |
       +---> copies captured PNGs to docs/user/assets/screenshots/
       +---> generates docs/user/_includes/screenshots/{feature}.md snippets
```

- Only screenshots with `status: "captured"` are included
- Feature grouping uses the FIRST entry in the `features` array
- Copies are skipped when dest is already up-to-date (mtime check)

## Validation

```bash
# Local preview
mkdocs serve

# Strict build (CI)
mkdocs build --strict

# Check screenshot availability
node .github/readme/scripts/check-screenshots.js
```

**Note on link warnings**: Cross-repo references (e.g., links to GitHub pages) are downgraded from errors to info-level warnings. `--strict` will still pass for these.

## Key Files

| File | Purpose |
|------|---------|
| `mkdocs.yml` | Site config, nav structure, plugins, hooks |
| `docs/user/` | All user-facing doc content (`docs_dir`) |
| `docs/hooks/screenshot_bridge.py` | Pre-build hook for screenshot bridging |
| `.github/readme/data/screenshots.json` | Screenshot registry (shared with README build) |
| `docs/requirements.txt` | Python deps for MkDocs + plugins |
| `docs/dev/documentation-site.md` | CI/deploy operations reference |

## Related

- `docs/dev/documentation-site.md` — CI integration, GitHub Pages deployment, troubleshooting
- `.claude/specs/doc-policy-spec.md` — Documentation governance and allowed buckets
- `docs/user/CLAUDE.md` — Rules for writing user-facing docs
