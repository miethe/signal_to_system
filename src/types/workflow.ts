/**
 * Workflow Showcase — TypeScript types.
 *
 * Schema for the Living Workflow Showcase stage manifest. Used by:
 * - `src/data/workflow-stages.json` (data source)
 * - `src/components/interactive/WorkflowStage.tsx` (rendering island)
 * - Phase 2 demo-foundry pipeline (asset paths produced by `scripts/manifest-to-stage.ts`)
 *
 * Inline content fields (`terminal`, `panels.*`) are the Phase 1 source of truth.
 * Optional asset fields (`thumbnail`, `socialClip`, `terminalRecording`,
 * `artifactSnapshots`) accommodate Phase 2 demo-foundry-generated outputs without
 * a future schema migration.
 *
 * See: docs/specs/workflow-showcase-spike.md (locked tech decision)
 *      docs/specs/workflow-showcase-implementation.md (Phase 1, WS-1.1)
 */

// ---------------------------------------------------------------------------
// Discriminated unions
// ---------------------------------------------------------------------------

/** Artifact panel categories. Drives tab/accordion selection in the UI. */
export type ArtifactType = "prd" | "plan" | "progress" | "agents";

/** Content type hints used for syntax highlighting and font selection. */
export type ContentType = "markdown" | "yaml" | "json" | "text";

/** Stage publication state — filters what renders on the public page. */
export type StageStatus = "published" | "draft" | "unreleased";

// ---------------------------------------------------------------------------
// Inline artifact panel content (per-step or stage-wide)
// ---------------------------------------------------------------------------

export interface Artifact {
  /** Display title for the tab/accordion header. */
  title: string;
  /** Raw text content (markdown, YAML, JSON, or plaintext). */
  content: string;
  /** Hint for syntax highlighting + font choice. */
  contentType: ContentType;
}

/** Per-step inline panel content keyed by artifact type. */
export type StepPanels = Partial<Record<ArtifactType, Artifact>>;

// ---------------------------------------------------------------------------
// Step
// ---------------------------------------------------------------------------

export interface Step {
  /** Unique within the stage. e.g. "step-1-1". */
  stepId: string;
  /** Short label shown in scrubber timeline (3–5 words). */
  label: string;
  /** Optional 1–3 line description shown above terminal output. */
  description?: string;
  /** Terminal-style output lines (rendered in mono). */
  terminal: string[];
  /** Panel content shown when this step is active. */
  panels?: StepPanels;
  /** Optional per-step metric override (rarely used; usually stage-wide). */
  metrics?: Partial<Metrics>;

  // Phase 2 demo-foundry asset paths (optional, populated by pipeline) ------

  /** Relative path under /public to an MP4 or asciinema cast recording. */
  terminalRecording?: string;
  /** Relative paths under /public to PNG/HTML snapshots per artifact type. */
  artifactSnapshots?: Partial<Record<ArtifactType, string>>;
}

// ---------------------------------------------------------------------------
// Metrics overlay
// ---------------------------------------------------------------------------

export interface Metrics {
  /** Total LLM tokens consumed (input + output). */
  tokensUsed: number;
  /** Tokens per second. */
  throughput: number;
  /** Cost in USD. */
  cost: number;
  /** Optional wall-clock duration label, e.g. "7m 23s". */
  wallClockTime?: string;
  /** Provenance: "real" or "curated (illustration)". */
  dataSource?: string;
}

// ---------------------------------------------------------------------------
// CTA card
// ---------------------------------------------------------------------------

export interface CTALink {
  /** MeatySkill slug (e.g. "spike", "planning"). */
  skillName: string;
  /** Absolute URL to the skill location. */
  skillUrl: string;
  /** Benefit-driven copy on the CTA button/card. */
  copyText: string;
  /** Optional supplementary subtitle. */
  subtitle?: string;
}

// ---------------------------------------------------------------------------
// Stage (top-level)
// ---------------------------------------------------------------------------

export interface Stage {
  /** URL-safe stage ID (e.g. "stage-1", "test-fixture"). Used in ?stage=<id>. */
  id: string;
  /** Display title (e.g. "Stage 1: Pre-Governance Baseline"). */
  title: string;
  /** 1–2 sentence description. */
  description: string;
  /** Publication state — only "published" stages render on the public page. */
  status: StageStatus;
  /** Blog post number this stage corresponds to (optional for fixtures). */
  postNumber?: number;
  /** Blog post slug (e.g. "post-1-baseline"). */
  postSlug?: string;
  /** ISO date (YYYY-MM-DD). */
  publishedDate?: string;
  /** Ordered list of workflow steps. */
  steps: Step[];
  /** Stage-wide metrics shown in overlay. */
  metrics: Metrics;
  /** "Try it yourself" CTA links. First entry is the primary. */
  ctaLinks: CTALink[];

  // Phase 2 demo-foundry asset paths (optional, populated by pipeline) ------

  /** Relative path under /public to a hero thumbnail PNG. */
  thumbnail?: string;
  /** Relative path under /public to a 30–60s social clip MP4. */
  socialClip?: string;
}

// ---------------------------------------------------------------------------
// Data file shape
// ---------------------------------------------------------------------------

export interface WorkflowStagesData {
  stages: Stage[];
}
