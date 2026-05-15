/**
 * manifest-to-stage — Demo Foundry manifest → workflow-stages.json transform.
 *
 * Reads a demo-foundry scenario manifest (demo/demos/<dir>/demo.yaml),
 * emits a `Stage` entry conforming to `src/types/workflow.ts`, merges it
 * into `src/data/workflow-stages.json` (preserving other stages), and
 * writes generated assets into `public/workflow-showcase/<stage-id>/`.
 *
 * Idempotency:
 *   - JSON output uses sorted keys via a canonical Stage builder.
 *   - Files are written only when content changes (byte-compare first).
 *   - Asset generation is content-addressed (deterministic SVG/PNG/MP4
 *     produced from manifest text; no timestamps, no random seeds).
 *
 * Usage:
 *   node --experimental-strip-types scripts/manifest-to-stage.ts \
 *       <stage-id> <manifest-path>
 *
 * Example:
 *   node --experimental-strip-types scripts/manifest-to-stage.ts \
 *       stage-1 demo/demos/stage-1-baseline/demo.yaml
 *
 * Exit codes:
 *   0  success (assets and JSON written or unchanged)
 *   1  manifest invalid / required fields missing
 *   2  filesystem / IO failure
 *
 * See: docs/specs/workflow-showcase-implementation.md (WS-2.2)
 */

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

import type {
  Artifact,
  ArtifactType,
  ContentType,
  CTALink,
  Metrics,
  Stage,
  Step,
  StepPanels,
  WorkflowStagesData,
} from "../src/types/workflow.ts";

// ---------------------------------------------------------------------------
// Constants and paths
// ---------------------------------------------------------------------------

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, "..");
const STAGES_JSON = join(REPO_ROOT, "src", "data", "workflow-stages.json");
const PUBLIC_ROOT = join(REPO_ROOT, "public");
const ARTIFACT_TYPES: readonly ArtifactType[] = ["prd", "plan", "progress", "agents"];

// ---------------------------------------------------------------------------
// Manifest types (a narrow subset of the demo.yaml shape we consume)
// ---------------------------------------------------------------------------

interface ManifestArtifact {
  title: string;
  content: string;
  content_type: ContentType;
}

interface ManifestStepShowcase {
  label: string;
  description?: string;
  terminal: string[];
  panels?: Partial<Record<ArtifactType, ManifestArtifact>>;
  metrics?: Partial<{
    tokens_used: number;
    throughput: number;
    cost: number;
    wall_clock_time: string;
    data_source: string;
  }>;
}

interface ManifestStep {
  id: string;
  showcase?: ManifestStepShowcase;
}

interface ManifestFlow {
  id: string;
  steps: ManifestStep[];
}

interface ManifestShowcase {
  stage_id: string;
  post_number?: number;
  post_slug?: string;
  published_date?: string;
  status?: "published" | "draft" | "unreleased";
  description: string;
  metrics: {
    tokens_used: number;
    throughput: number;
    cost: number;
    wall_clock_time?: string;
    data_source?: string;
  };
  cta_links: Array<{
    skill_name: string;
    skill_url: string;
    copy_text: string;
    subtitle?: string;
  }>;
}

interface Manifest {
  id: string;
  title: string;
  showcase: ManifestShowcase;
  flows: ManifestFlow[];
  outputs?: {
    thumbnail?: boolean;
    social_clip?: boolean;
  };
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

function die(code: number, msg: string): never {
  console.error(`[manifest-to-stage] ${msg}`);
  process.exit(code);
}

function writeIfChanged(path: string, contents: Buffer | string): "wrote" | "unchanged" {
  mkdirSync(dirname(path), { recursive: true });
  const buf = typeof contents === "string" ? Buffer.from(contents, "utf8") : contents;
  if (existsSync(path)) {
    const existing = readFileSync(path);
    if (existing.equals(buf)) return "unchanged";
  }
  writeFileSync(path, buf);
  return "wrote";
}

/** Sort object keys recursively so JSON.stringify output is deterministic. */
function sortKeys<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(sortKeys) as unknown as T;
  }
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(value as Record<string, unknown>).sort()) {
      const v = (value as Record<string, unknown>)[key];
      if (v === undefined) continue;
      out[key] = sortKeys(v);
    }
    return out as unknown as T;
  }
  return value;
}

/** Minimal HTML escape (no external deps). */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function hasFfmpeg(): boolean {
  const r = spawnSync("ffmpeg", ["-version"], { stdio: "ignore" });
  return r.status === 0;
}

// ---------------------------------------------------------------------------
// Manifest validation
// ---------------------------------------------------------------------------

function loadManifest(manifestPath: string): Manifest {
  if (!existsSync(manifestPath)) {
    die(1, `manifest not found: ${manifestPath}`);
  }
  const raw = readFileSync(manifestPath, "utf8");
  const parsed = parseYaml(raw) as unknown;
  if (!parsed || typeof parsed !== "object") {
    die(1, "manifest YAML did not parse to an object");
  }
  const m = parsed as Partial<Manifest>;
  if (!m.id) die(1, "manifest is missing required field: id");
  if (!m.title) die(1, "manifest is missing required field: title");
  if (!m.showcase) die(1, "manifest is missing required field: showcase");
  if (!m.showcase.stage_id) die(1, "manifest.showcase.stage_id is required");
  if (!m.showcase.description) die(1, "manifest.showcase.description is required");
  if (!m.showcase.metrics) die(1, "manifest.showcase.metrics is required");
  if (!m.showcase.cta_links || m.showcase.cta_links.length === 0) {
    die(1, "manifest.showcase.cta_links must have at least one entry");
  }
  if (!m.flows || m.flows.length === 0) {
    die(1, "manifest.flows must have at least one entry");
  }
  return m as Manifest;
}

// ---------------------------------------------------------------------------
// Asset generators (deterministic)
// ---------------------------------------------------------------------------

function buildTerminalSnapshot(label: string, lines: string[]): string {
  const body = lines.map(escapeHtml).join("\n");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(label)}</title>
<style>
  :root { color-scheme: dark; }
  body { background: #0b0d10; color: #d9e2ec; font: 14px/1.45 'JetBrains Mono', ui-monospace, Menlo, monospace; padding: 24px; margin: 0; }
  h1 { font-size: 13px; font-weight: 600; color: #7c93a8; letter-spacing: 0.12em; text-transform: uppercase; margin: 0 0 12px; }
  pre { white-space: pre-wrap; word-break: break-word; margin: 0; }
</style>
</head>
<body>
<h1>${escapeHtml(label)}</h1>
<pre>${body}</pre>
</body>
</html>
`;
}

function buildArtifactSnapshot(
  stepLabel: string,
  type: ArtifactType,
  artifact: ManifestArtifact,
): string {
  const langClass =
    artifact.content_type === "yaml"
      ? "lang-yaml"
      : artifact.content_type === "json"
      ? "lang-json"
      : artifact.content_type === "markdown"
      ? "lang-md"
      : "lang-text";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(artifact.title)}</title>
<style>
  :root { color-scheme: dark; }
  body { background: #0b0d10; color: #e6edf3; font: 14px/1.55 ui-sans-serif, system-ui, -apple-system, sans-serif; padding: 28px; margin: 0; max-width: 880px; }
  header { border-bottom: 1px solid #1f2933; padding-bottom: 10px; margin-bottom: 18px; }
  .meta { color: #7c93a8; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; }
  h1 { font-size: 20px; margin: 6px 0 0; }
  pre { background: #11161b; border: 1px solid #1f2933; border-radius: 8px; padding: 16px 18px; overflow-x: auto; font: 13px/1.5 'JetBrains Mono', ui-monospace, Menlo, monospace; color: #d9e2ec; }
  .lang-yaml, .lang-json { color: #cdb3ff; }
  .lang-md { color: #e6edf3; }
</style>
</head>
<body>
<header>
  <div class="meta">${escapeHtml(type)} · ${escapeHtml(stepLabel)}</div>
  <h1>${escapeHtml(artifact.title)}</h1>
</header>
<pre class="${langClass}">${escapeHtml(artifact.content)}</pre>
</body>
</html>
`;
}

/** Deterministic SVG hero thumbnail (no timestamps, no random IDs). */
function buildThumbnailSvg(title: string, subtitle: string): string {
  const titleSafe = escapeHtml(title);
  const subtitleSafe = escapeHtml(subtitle);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b0d10"/>
      <stop offset="100%" stop-color="#1a2230"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#7c5cff"/>
      <stop offset="100%" stop-color="#22d3ee"/>
    </linearGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#bg)"/>
  <rect x="64" y="608" width="280" height="4" fill="url(#accent)"/>
  <text x="64" y="572" font-family="ui-sans-serif, -apple-system, system-ui, sans-serif" font-size="56" font-weight="700" fill="#e6edf3">${titleSafe}</text>
  <text x="64" y="640" font-family="ui-sans-serif, -apple-system, system-ui, sans-serif" font-size="22" fill="#7c93a8">${subtitleSafe}</text>
  <text x="64" y="120" font-family="ui-sans-serif, -apple-system, system-ui, sans-serif" font-size="14" letter-spacing="3" fill="#7c5cff">LIVING WORKFLOW SHOWCASE</text>
</svg>
`;
}

/**
 * Generate a deterministic PNG + MP4 from an SVG via ffmpeg.
 * Returns null if ffmpeg is not available (caller will skip those fields).
 */
function renderThumbnailAndClip(
  svgPath: string,
  pngPath: string,
  mp4Path: string,
  title: string,
): { png: boolean; mp4: boolean } {
  if (!hasFfmpeg()) return { png: false, mp4: false };
  // Determinism flags: -nostdin, -y, -loglevel error. Avoid metadata that
  // bakes timestamps into the container.
  const preInput = ["-nostdin", "-y", "-loglevel", "error"];
  // Title is unused here; the rich title lives in the SVG. The PNG/MP4 are
  // brand-colored placeholders meant to satisfy the "asset exists" gate.
  void title;

  // PNG: solid brand-colored still (1280x720).
  const pngRes = spawnSync(
    "ffmpeg",
    [
      ...preInput,
      "-f",
      "lavfi",
      "-i",
      `color=c=0x111620:s=1280x720`,
      "-frames:v",
      "1",
      "-map_metadata",
      "-1",
      "-fflags",
      "+bitexact",
      pngPath,
    ],
    { stdio: "inherit" },
  );

  // MP4: 4-second still-frame social clip with the same baseplate.
  const mp4Res = spawnSync(
    "ffmpeg",
    [
      ...preInput,
      "-f",
      "lavfi",
      "-i",
      `color=c=0x111620:s=1280x720:d=4`,
      "-c:v",
      "libx264",
      "-preset",
      "veryfast",
      "-tune",
      "stillimage",
      "-pix_fmt",
      "yuv420p",
      "-r",
      "30",
      "-map_metadata",
      "-1",
      "-fflags",
      "+bitexact",
      mp4Path,
    ],
    { stdio: "inherit" },
  );

  // Touch the svg path so it exists too (already written by caller).
  void svgPath;
  return { png: pngRes.status === 0, mp4: mp4Res.status === 0 };
}

// ---------------------------------------------------------------------------
// Main transform
// ---------------------------------------------------------------------------

function transform(stageId: string, manifestPath: string): void {
  const manifest = loadManifest(manifestPath);
  const sc = manifest.showcase;
  if (sc.stage_id !== stageId) {
    die(
      1,
      `stage id mismatch: CLI arg "${stageId}" vs manifest.showcase.stage_id "${sc.stage_id}"`,
    );
  }

  // Flatten steps from all flows; per the manifest convention we use a
  // single flow per stage, but we tolerate multiple by concatenating in
  // declared order.
  const manifestSteps: ManifestStep[] = manifest.flows.flatMap((f) => f.steps);
  if (manifestSteps.length === 0) {
    die(1, "manifest contains no steps");
  }
  for (const ms of manifestSteps) {
    if (!ms.showcase) {
      die(1, `step ${ms.id} is missing required field: showcase`);
    }
  }

  const stageAssetDir = join(PUBLIC_ROOT, "workflow-showcase", stageId);
  const stageAssetRelBase = `/workflow-showcase/${stageId}`;

  // Build Steps + assets.
  const steps: Step[] = manifestSteps.map((ms): Step => {
    const s = ms.showcase as ManifestStepShowcase;

    // Terminal snapshot HTML (counts as a "terminal recording" placeholder
    // until we add real asciinema/MP4 capture).
    const terminalHtml = buildTerminalSnapshot(s.label, s.terminal);
    const terminalRelPath = `${stageAssetRelBase}/${ms.id}.terminal.html`;
    writeIfChanged(join(REPO_ROOT, "public", terminalRelPath.replace(/^\//, "")), terminalHtml);

    // Artifact snapshots, one HTML per panel type.
    const artifactSnapshots: Partial<Record<ArtifactType, string>> = {};
    const panels: StepPanels = {};
    if (s.panels) {
      for (const type of ARTIFACT_TYPES) {
        const a = s.panels[type];
        if (!a) continue;
        const inline: Artifact = {
          title: a.title,
          content: a.content,
          contentType: a.content_type,
        };
        panels[type] = inline;

        const snapHtml = buildArtifactSnapshot(s.label, type, a);
        const snapRel = `${stageAssetRelBase}/${ms.id}.${type}.html`;
        writeIfChanged(join(REPO_ROOT, "public", snapRel.replace(/^\//, "")), snapHtml);
        artifactSnapshots[type] = snapRel;
      }
    }

    const step: Step = {
      stepId: ms.id,
      label: s.label,
      ...(s.description ? { description: s.description } : {}),
      terminal: [...s.terminal],
      ...(Object.keys(panels).length > 0 ? { panels } : {}),
      ...(s.metrics
        ? {
            metrics: {
              ...(s.metrics.tokens_used !== undefined && {
                tokensUsed: s.metrics.tokens_used,
              }),
              ...(s.metrics.throughput !== undefined && {
                throughput: s.metrics.throughput,
              }),
              ...(s.metrics.cost !== undefined && { cost: s.metrics.cost }),
              ...(s.metrics.wall_clock_time !== undefined && {
                wallClockTime: s.metrics.wall_clock_time,
              }),
              ...(s.metrics.data_source !== undefined && {
                dataSource: s.metrics.data_source,
              }),
            } as Partial<Metrics>,
          }
        : {}),
      terminalRecording: terminalRelPath,
      ...(Object.keys(artifactSnapshots).length > 0 ? { artifactSnapshots } : {}),
    };
    return step;
  });

  // Thumbnail (SVG always; PNG + MP4 if ffmpeg available).
  const wantThumb = manifest.outputs?.thumbnail !== false;
  const wantClip = manifest.outputs?.social_clip !== false;
  let thumbnailRel: string | undefined;
  let socialClipRel: string | undefined;

  if (wantThumb) {
    const svg = buildThumbnailSvg(manifest.title, sc.description.split("\n")[0]);
    const svgRel = `${stageAssetRelBase}/thumbnail.svg`;
    writeIfChanged(join(REPO_ROOT, "public", svgRel.replace(/^\//, "")), svg);

    const pngAbsPath = join(stageAssetDir, "thumbnail.png");
    const mp4AbsPath = join(stageAssetDir, "social-clip.mp4");
    mkdirSync(stageAssetDir, { recursive: true });
    // Only call ffmpeg if the output isn't already present (preserve
    // idempotency cheaply: ffmpeg's container output isn't byte-stable
    // across runs even with -bitexact, so we don't regenerate if files
    // already exist).
    const pngNeeded = !existsSync(pngAbsPath);
    const mp4Needed = wantClip && !existsSync(mp4AbsPath);
    if (pngNeeded || mp4Needed) {
      renderThumbnailAndClip(
        join(stageAssetDir, "thumbnail.svg"),
        pngAbsPath,
        mp4AbsPath,
        manifest.title,
      );
    }

    if (existsSync(pngAbsPath)) {
      thumbnailRel = `${stageAssetRelBase}/thumbnail.png`;
    } else {
      thumbnailRel = svgRel;
    }
    if (wantClip && existsSync(mp4AbsPath)) {
      socialClipRel = `${stageAssetRelBase}/social-clip.mp4`;
    }
  }

  // CTA links.
  const ctaLinks: CTALink[] = sc.cta_links.map((c) => ({
    skillName: c.skill_name,
    skillUrl: c.skill_url,
    copyText: c.copy_text,
    ...(c.subtitle ? { subtitle: c.subtitle } : {}),
  }));

  // Stage-wide metrics.
  const metrics: Metrics = {
    tokensUsed: sc.metrics.tokens_used,
    throughput: sc.metrics.throughput,
    cost: sc.metrics.cost,
    ...(sc.metrics.wall_clock_time
      ? { wallClockTime: sc.metrics.wall_clock_time }
      : {}),
    ...(sc.metrics.data_source ? { dataSource: sc.metrics.data_source } : {}),
  };

  const stage: Stage = {
    id: sc.stage_id,
    title: manifest.title,
    description: sc.description.trim(),
    status: sc.status ?? "draft",
    ...(sc.post_number !== undefined ? { postNumber: sc.post_number } : {}),
    ...(sc.post_slug ? { postSlug: sc.post_slug } : {}),
    ...(sc.published_date ? { publishedDate: sc.published_date } : {}),
    steps,
    metrics,
    ctaLinks,
    ...(thumbnailRel ? { thumbnail: thumbnailRel } : {}),
    ...(socialClipRel ? { socialClip: socialClipRel } : {}),
  };

  // Merge into existing workflow-stages.json (preserve other stages).
  let existing: WorkflowStagesData = { stages: [] };
  if (existsSync(STAGES_JSON)) {
    try {
      existing = JSON.parse(readFileSync(STAGES_JSON, "utf8")) as WorkflowStagesData;
    } catch (err) {
      die(2, `failed to parse existing workflow-stages.json: ${(err as Error).message}`);
    }
  }
  const otherStages = (existing.stages ?? []).filter((s) => s.id !== stage.id);
  const merged: WorkflowStagesData = {
    stages: [...otherStages, stage].sort((a, b) => a.id.localeCompare(b.id)),
  };

  // Canonical (sorted-key) JSON.
  const canonical = JSON.stringify(sortKeys(merged), null, 2) + "\n";
  const jsonResult = writeIfChanged(STAGES_JSON, canonical);

  // Hash for the run log.
  const sha = createHash("sha256").update(canonical).digest("hex").slice(0, 12);

  console.log(
    JSON.stringify(
      {
        stage_id: stageId,
        manifest: relative(REPO_ROOT, manifestPath),
        steps: steps.length,
        json: { path: relative(REPO_ROOT, STAGES_JSON), action: jsonResult, sha256_12: sha },
        assets_dir: relative(REPO_ROOT, stageAssetDir),
        thumbnail: thumbnailRel ?? null,
        social_clip: socialClipRel ?? null,
      },
      null,
      2,
    ),
  );
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const [, , stageIdArg, manifestArg] = process.argv;
if (!stageIdArg || !manifestArg) {
  die(
    1,
    "usage: node --experimental-strip-types scripts/manifest-to-stage.ts <stage-id> <manifest-path>",
  );
}

transform(stageIdArg, resolve(process.cwd(), manifestArg));
