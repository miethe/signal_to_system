/**
 * Labs public contract (M3b) — the shape a Lab's public snapshot carries and
 * the view model every /labs page renders. Lead-owned: pages, fixtures, the
 * loader's zod schema (./schema.mjs) and the capsules all code to THIS file.
 * Change it here first, then mirror the schema.
 *
 * Source contracts:
 *  - docs/project_plans/s2s-v2/labs/research-lab/04-s2s-snapshot-contract.md
 *    (reports primary, films optional; public/ is the only thing S2S reads)
 *  - build handoff specs/04 (method profiles, ClaimCard, figures, reproduce)
 *    and specs/08 (orthogonal axes: evidence status, review, reproduction are
 *    separate fields; never one boolean or a confidence percentage)
 *
 * Binding to the M3a gate (src/lib/projection/): a bundle renders only when
 * its release passes evaluateReleaseGate AND
 *   investigation  -> an approved `lab-investigation` record (publicId, version)
 *   report         -> an approved `lab-report` record (publicId, version)
 *   every claim    -> an approved `rf-claim` record (publicId, version)
 *   every artifact -> an approved `lab-artifact` record (publicId, version)
 * A missing investigation/report/claim record fails the whole Lab closed.
 * A missing artifact record removes that artifact; figures bound to it fall
 * to the "data not released" state (never a chart without its data).
 */

// ---------- Orthogonal axes (spec 08). Never collapse them. ----------

/** Evidence evaluation of a claim. There is no generic "verified". */
export type ClaimStatus = 'supported-within-scope' | 'mixed' | 'contradicted' | 'unresolved' | 'unreviewed';
/** What kind of statement it is. A grouping is not itself support. */
export type ClaimType = 'run-claim' | 'source-assertion' | 'inference' | 'speculation' | 'canonical-group';
/** Qualitative, reviewed confidence; always shown next to its uncertainty. */
export type Confidence = 'high' | 'moderate' | 'low' | 'not-assessed';
export type ReviewState = 'unreviewed' | 'author-reviewed' | 'automated-checks-passed' | 'independently-reviewed' | 'externally-peer-reviewed';
export type ReproState = 'not-attempted' | 'local-rerun' | 'external-reproduction' | 'independent-replication' | 'failed' | 'inconclusive' | 'not-applicable';
export type FigureClass = 'measured' | 'simulated' | 'reconstructed' | 'illustrative';
export type MethodProfileId =
  | 'computational-experiment' | 'evidence-review' | 'mathematical-analysis'
  | 'design-study' | 'physical-investigation' | 'philosophical-inquiry';
export type Contribution =
  | 'replication' | 'reanalysis' | 'synthesis' | 'method-contribution'
  | 'negative-result' | 'original-finding-proposed';
export type EvidenceRelation = 'supports' | 'contradicts' | 'qualifies';
export type EvidenceKind = 'dataset' | 'analysis' | 'study' | 'notebook' | 'source-passage' | 'experiment';
/** `denied` renders as a fixed access token: no title, locator, count or id (RLARC-005). */
export type AccessLevel = 'public' | 'metadata-only' | 'excerpt' | 'denied';
export type ReceiptKind = 'source-pointer-resolved' | 'author-reviewed' | 'automated-check' | 'independent-review';
export type SourceKind = 'dataset' | 'journal-article' | 'report' | 'book' | 'web' | 'software';
export type ArtifactKind = 'code' | 'notebook' | 'dataset' | 'package' | 'document';
export type TimelineKind = 'run' | 'release' | 'correction' | 'review' | 'withdrawal';
export type ReproScope = 'rerun' | 'reproduce' | 'replicate';

/** Exact versions only: never latest / main / HEAD (enforced by the schema). */
export type ExactVersion = string;
/** ISO date, YYYY-MM-DD. */
export type IsoDate = string;

// ---------- Snapshot bundle: public/lab.json (schemaVersion '1') ----------

export interface LabBundle {
  schemaVersion: '1';
  /** true only for fixtures; the loader rejects a synthetic bundle in the real store and vice versa. */
  synthetic: boolean;
  /** Must equal the release manifest's releaseId. */
  releaseId: string;
  investigation: Investigation;
  report: Report;
  claims: Claim[];
  evidence: EvidenceItem[];
  sources: Source[];
  figures: FigureRecord[];
  artifacts: Artifact[];
  method: MethodRecord;
  reproduce: ReproduceRecord;
  timeline: TimelineEvent[];
}

export interface Investigation {
  /** Slug-shaped (^[a-z][a-z0-9-]{2,79}$); also the route: /labs/<publicId>/. */
  publicId: string;
  version: ExactVersion;
  title: string;
  /** The narrative question, one sentence. */
  question: string;
  /** Short dek for cards (<= 200 chars). */
  dek: string;
  whyItMatters: string;
  domains: string[];
  methodProfile: MethodProfileId;
  contribution: Contribution;
  contributors: { name: string; role: string }[];
  publishedAt: IsoDate;
  updatedAt: IsoDate;
  readMinutes?: number;
  license: string;
  /** Figure id to feature on the report overview (optional). */
  featuredFigureId?: string;
}

export interface Report {
  publicId: string;
  version: ExactVersion;
  /** Executive summary paragraphs (plain text; no MDX, no HTML). */
  summary: string[];
  conclusion: {
    /** The bounded conclusion, or the present uncertainty when there is none yet. */
    statement: string;
    /** false = no conclusion yet; `statement` then states what is still uncertain. */
    bounded: boolean;
    confidence: Confidence;
    /** Required: the conclusion callout always shows uncertainty. */
    uncertainty: string;
    scope: string;
  };
  /** Shown above the fold. */
  largestLimitation: string;
  limitations: string[];
  review: ReviewState;
  reproduction: ReproState;
}

export interface Claim {
  publicId: string;
  version: ExactVersion;
  /** Display label within the report: "C1". */
  label: string;
  type: ClaimType;
  statement: string;
  scope: string;
  status: ClaimStatus;
  confidence: Confidence;
  uncertainty?: string;
  checkedAt: IsoDate;
  domains: string[];
  limitations: string[];
  evidence: { evidenceId: string; relation: EvidenceRelation }[];
  figureIds: string[];
  /** Specific receipts only. An empty list means "not reviewed" and the UI says so. */
  receipts: { kind: ReceiptKind; date: IsoDate; note?: string }[];
}

export interface EvidenceItem {
  /** Display label: "E1". */
  id: string;
  kind: EvidenceKind;
  access: AccessLevel;
  /** Omitted (and ignored) when access is 'denied'. */
  title?: string;
  origin?: string;
  period?: string;
  summary?: string;
  review: ReviewState;
  sourceIds: string[];
  figureIds: string[];
  artifactIds: string[];
  date?: IsoDate;
}

export interface Source {
  /** Display label: "S1". */
  id: string;
  kind: SourceKind;
  access: AccessLevel;
  title?: string;
  publisher?: string;
  period?: string;
  summary?: string;
  /** https only; omitted for denied/metadata-only. */
  href?: string;
  license?: string;
  version?: ExactVersion;
}

export interface ChartSeries { name: string; points: [number, number][] }

export interface FigureRecord {
  /** "F1". */
  id: string;
  number: number;
  title: string;
  caption: string;
  alt: string;
  classification: FigureClass;
  /** false => the figure carries the illustrative / not-reviewed label. */
  reviewed: boolean;
  uncertainty: string;
  /** null for a non-data figure (diagram); a data figure always has a table fallback. */
  chart: null | {
    type: 'scatter' | 'line';
    x: { label: string; unit: string };
    y: { label: string; unit: string };
    series: ChartSeries[];
    fit?: { slope: number; intercept: number; r2: number; note: string };
  };
  /** The approved data artifact (download). Absent/unapproved => "data not released". */
  dataArtifactId?: string;
  codeArtifactId?: string;
  claimIds: string[];
}

export interface Artifact {
  publicId: string;
  version: ExactVersion;
  /** sha256:<64 hex> of the file bytes (checksums.sha256); shown on every download. */
  digest: string;
  /** "A1". */
  id: string;
  kind: ArtifactKind;
  title: string;
  summary: string;
  mediaType: string;
  bytes: number;
  license: string;
  /** https or site-relative download URL. */
  href: string;
}

export interface MethodRecord {
  profile: MethodProfileId;
  /** The profile's required method record, in profile order (see METHOD_PROFILES). */
  fields: { key: string; label: string; value: string }[];
  deviations: string[];
  failures: string[];
}

export interface ReproduceRecord {
  scopes: { scope: ReproScope; state: ReproState; note: string }[];
  environment: { label: string; value: string }[];
  prerequisites: string[];
  /** Commands are shown verbatim; never invented, never pinned to latest. */
  steps: { label: string; command?: string }[];
  expected: string;
  unavailable: string[];
  /** Artifact id of the reproduction package, if one is released. */
  packageArtifactId?: string;
}

export interface TimelineEvent {
  date: IsoDate;
  kind: TimelineKind;
  label: string;
  version?: ExactVersion;
  note?: string;
}

// ---------- Loader output (src/lib/labs/load.mjs) ----------

export interface LabView extends LabBundle {
  /** Artifacts whose lab-artifact record passed the gate (others removed). */
  artifacts: Artifact[];
  /** Per figure: the approved data artifact, or null => "data not released". */
  figureData: Record<string, Artifact | null>;
  counts: { claims: number; evidence: number; sources: number; figures: number; artifacts: number };
  href: string;
}

export interface LabTombstone {
  publicId: string;
  version: ExactVersion;
  state: 'withdrawn';
  withdrawnAt: string;
  reason?: string;
  synthetic: boolean;
  href: string;
}

export interface LabCatalog {
  labs: LabView[];
  tombstones: LabTombstone[];
  /** Releases the gate refused (fixture mode shows them to the author; never rendered publicly). */
  rejected: { releaseId: string; errors: string[] }[];
  fixtures: boolean;
}
