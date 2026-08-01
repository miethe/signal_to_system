# Demo Workspace

This directory contains Demo Foundry demo-as-code artifacts.

## Layout

```text
demo/
  demo-foundry.config.yaml
  demos/
  fixtures/
  policy/
  context-updates/
  workflow-updates/
  tools/
```

## Rules

- Use fake deterministic data.
- Keep demo scenario manifests under `demo/demos/<demo-id>/demo.yaml`.
- Keep generated outputs under the relevant demo's `output/` folder.
- Do not update project context or workflows without explicit approval.
- Review screenshots/videos for secrets before publishing.

## Common commands

```bash
node demo/tools/demo-foundry.mjs doctor
npm run demo:capture     # Playwright capture (optional; requires @playwright/test)
npm run demo:review
```

## Local pipeline notes (signal-to-system)

Workflow Showcase stages are **manifest-driven**. The `demo.yaml` for each
stage is the source of truth for steps, terminal output, artifact text, and
metrics. A separate transform script (`scripts/manifest-to-stage.ts`) reads the
manifest and emits a `Stage` entry into `src/data/workflow-stages.json` plus
asset stubs under `public/workflow-showcase/<stage-id>/`.

### Phase 2 scope

The Stage 1 baseline scenario is illustrative narrative content (an
"ungoverned" agentic workflow) — there is no live application to drive with
Playwright. The transform script therefore generates artifact HTML/PNG
snapshots, a hero thumbnail (SVG-to-PNG via a deterministic generator), and a
social-clip placeholder MP4 directly from the manifest. Playwright capture is
plumbed (config + spec template) but only used when a stage actually needs
live UI capture (e.g., recording the showcase itself for the social clip).

### System prerequisites (optional, only when polishing)

| Tool | Purpose | Install |
|------|---------|---------|
| `ffmpeg` | Video composition / MP4 muxing | `brew install ffmpeg` |
| Playwright browsers | Live UI capture | `npx playwright install chromium` |
| `@playwright/test` | Capture spec runner | `npm i -D @playwright/test` (not added by default) |
| Remotion | Polished video render | `npm i -D remotion` (not added by default) |

For Stage 1 / Phase 2, none of these are required; the transform script is
pure Node and produces all assets from the manifest.
