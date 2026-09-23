/**
 * Labs copy + tone maps. One place, so every surface says the same thing.
 *
 * Honesty rules encoded here (build handoff specs/04, specs/08):
 *  - no generic "Verified": receipts name what was checked;
 *  - evidence status, confidence, review and reproduction are separate axes;
 *  - "not assessed" / "not reviewed" are stated, never left blank.
 */
import type {
  ClaimStatus, ClaimType, Confidence, ReviewState, ReproState, FigureClass, Contribution,
  EvidenceRelation, EvidenceKind, AccessLevel, ReceiptKind, SourceKind, ArtifactKind, TimelineKind, ReproScope,
} from '../../lib/labs/types';
import { METHOD_PROFILES } from '../../lib/labs/profiles.mjs';

export type Tone = 'neutral' | 'accent' | 'secondary' | 'ok' | 'warn' | 'danger' | 'info';

export const STATUS: Record<ClaimStatus, { label: string; tone: Tone; note: string }> = {
  'supported-within-scope': { label: 'Supported within scope', tone: 'ok', note: 'The cited evidence supports the claim inside its stated scope.' },
  mixed: { label: 'Mixed evidence', tone: 'warn', note: 'Some evidence supports the claim and some cuts against it.' },
  contradicted: { label: 'Contradicted', tone: 'danger', note: 'The weight of the cited evidence runs against the claim.' },
  unresolved: { label: 'Unresolved', tone: 'info', note: 'The evidence does not yet settle the claim either way.' },
  unreviewed: { label: 'Not reviewed', tone: 'neutral', note: 'No review receipt exists for this claim yet.' },
};

export const CLAIM_TYPE: Record<ClaimType, string> = {
  'run-claim': 'Run claim',
  'source-assertion': 'Source assertion',
  inference: 'Inference',
  speculation: 'Speculation',
  'canonical-group': 'Claim group',
};

export const CONFIDENCE: Record<Confidence, { label: string; level: number }> = {
  high: { label: 'High confidence', level: 3 },
  moderate: { label: 'Moderate confidence', level: 2 },
  low: { label: 'Low confidence', level: 1 },
  'not-assessed': { label: 'Confidence not assessed', level: 0 },
};

export const REVIEW: Record<ReviewState, { label: string; tone: Tone }> = {
  unreviewed: { label: 'Not reviewed', tone: 'neutral' },
  'author-reviewed': { label: 'Author reviewed', tone: 'accent' },
  'automated-checks-passed': { label: 'Automated checks passed', tone: 'accent' },
  'independently-reviewed': { label: 'Independently reviewed', tone: 'ok' },
  'externally-peer-reviewed': { label: 'Externally peer reviewed', tone: 'ok' },
};

export const REPRO: Record<ReproState, { label: string; tone: Tone }> = {
  'not-attempted': { label: 'Not attempted', tone: 'neutral' },
  'local-rerun': { label: 'Rerun locally', tone: 'accent' },
  'external-reproduction': { label: 'Reproduced externally', tone: 'ok' },
  'independent-replication': { label: 'Independently replicated', tone: 'ok' },
  failed: { label: 'Reproduction failed', tone: 'danger' },
  inconclusive: { label: 'Inconclusive', tone: 'warn' },
  'not-applicable': { label: 'Not applicable', tone: 'neutral' },
};

export const REPRO_SCOPE: Record<ReproScope, { label: string; sub: string }> = {
  rerun: { label: 'Rerun the analysis', sub: 'Same code, same data, same environment.' },
  reproduce: { label: 'Reproduce the pipeline', sub: 'Rebuild the pipeline from the package and recompute.' },
  replicate: { label: 'Replicate the phenomenon', sub: 'New data or setup, independently; not a rerun.' },
};

export const FIGURE_CLASS: Record<FigureClass, string> = {
  measured: 'Measured',
  simulated: 'Simulated',
  reconstructed: 'Reconstructed',
  illustrative: 'Illustrative',
};

export const CONTRIBUTION: Record<Contribution, string> = {
  replication: 'Replication',
  reanalysis: 'Reanalysis',
  synthesis: 'Synthesis',
  'method-contribution': 'Method / tooling contribution',
  'negative-result': 'Negative result',
  'original-finding-proposed': 'Original finding (proposed)',
};

export const RELATION: Record<EvidenceRelation, { label: string; tone: Tone }> = {
  supports: { label: 'Supports', tone: 'ok' },
  contradicts: { label: 'Contradicts', tone: 'danger' },
  qualifies: { label: 'Qualifies', tone: 'warn' },
};

export const EVIDENCE_KIND: Record<EvidenceKind, { label: string; icon: string }> = {
  dataset: { label: 'Dataset', icon: 'datasets' },
  analysis: { label: 'Analysis', icon: 'evidence' },
  study: { label: 'Study', icon: 'sources' },
  notebook: { label: 'Notebook', icon: 'notebooks' },
  'source-passage': { label: 'Source passage', icon: 'sources' },
  experiment: { label: 'Experiment', icon: 'methods' },
};

export const ACCESS: Record<AccessLevel, string> = {
  public: 'Public',
  'metadata-only': 'Metadata only',
  excerpt: 'Excerpt',
  denied: 'Access: denied',
};

export const RECEIPT: Record<ReceiptKind, string> = {
  'source-pointer-resolved': 'Source pointer resolved',
  'author-reviewed': 'Author reviewed',
  'automated-check': 'Automated check',
  'independent-review': 'Independent review',
};

export const SOURCE_KIND: Record<SourceKind, string> = {
  dataset: 'Dataset',
  'journal-article': 'Journal article',
  report: 'Report',
  book: 'Book',
  web: 'Web page',
  software: 'Software',
};

export const ARTIFACT_KIND: Record<ArtifactKind, { label: string; icon: string }> = {
  code: { label: 'Code', icon: 'artifacts' },
  notebook: { label: 'Notebook', icon: 'notebooks' },
  dataset: { label: 'Dataset', icon: 'datasets' },
  package: { label: 'Package', icon: 'reproduce' },
  document: { label: 'Document', icon: 'essays' },
};

export const TIMELINE_KIND: Record<TimelineKind, string> = {
  run: 'Run',
  release: 'Release',
  correction: 'Correction',
  review: 'Review',
  withdrawal: 'Withdrawal',
};

export const methodLabel = (id: keyof typeof METHOD_PROFILES) => METHOD_PROFILES[id]?.label ?? id;

/** "Mar 3, 2026" from an ISO date without timezone drift. */
export function formatIsoDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
}

/** "sha256:3f9a…c21d" — the full digest stays in the title/copy target. */
export function shortDigest(digest: string): string {
  const hex = digest.replace(/^sha256:/, '');
  return `sha256:${hex.slice(0, 8)}…${hex.slice(-4)}`;
}

export const claimHref = (labHref: string, label: string, version: string) =>
  `${labHref}claims/${label.toLowerCase()}/${version}/`;

/**
 * The report's section tabs, shared by every per-Lab page. On the report
 * itself they are #anchors (usable without JS); from a subpage they are
 * links back to those anchors, or to the subpage.
 */
export function reportTabs(href: string, current: 'overview' | 'claims' | 'resources') {
  const at = (anchor: string) => (current === 'overview' ? `#${anchor}` : `${href}#${anchor}`);
  return [
    { label: 'Overview', href: at('overview'), current: current === 'overview' },
    current === 'overview'
      ? { label: 'Claims', href: '#claims' }
      : { label: 'Claims & Evidence', href: `${href}claims/`, current: current === 'claims' },
    { label: 'Evidence', href: current === 'overview' ? '#evidence' : `${href}claims/#evidence` },
    { label: 'Method', href: at('method') },
    { label: 'Reproduce', href: at('reproduce') },
    { label: 'Timeline', href: at('timeline') },
    { label: 'Sources, Figures & Artifacts', href: `${href}resources/`, current: current === 'resources' },
  ];
}
