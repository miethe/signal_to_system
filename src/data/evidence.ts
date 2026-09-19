// ---------------------------------------------------------------------------
// Evidence Record Registry
// ---------------------------------------------------------------------------
//
// Flat, site-wide store of receipts an essay can cite from a "Receipts behind
// the argument" section, an Evidence Focus route, or a thread beat's
// `relatedEvidenceIds` (see `src/data/threads.ts`). The field set follows
// `PublicEvidenceRecord` in the reading-experience-v2 handoff's
// `contracts/types.ts`, widened per that handoff's own ARCHITECTURE.md risk
// 2: `relatedSceneIds` is `string[]` here, not a per-post `BeatId[]` enum, so
// a second essay's thread can reference a record without a type change.
//
// Every record below is re-grounded against the receipts actually published
// in `src/content/posts/the-registry-wave-agentic-artifact-supply-chain.mdx`
// (its footnotes, its "Receipts behind the argument" section, and its two
// redacted inline captures: the deployment-manifest YAML excerpt and the
// September 15 drift-check shell output) and
// `docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/notes/`.
// Nothing here invents a hash, a version, or an internal identifier the
// manuscript doesn't already state. Where the manuscript itself says a date
// is unresolved or gives no date, this file records `null` rather than
// reusing a date an earlier handoff draft guessed (`contracts/evidence-records.json`'s
// "provisioning" entry states "Aug. 4, 2026"; the manuscript's own footnote
// for that receipt says "origin date unresolved", so this file follows the
// manuscript and leaves both dates `null`).
//
// `captureType` is honest: `redacted-original` only for the two records that
// correspond to the manuscript's two real redacted inline captures
// (`drift-manifest-excerpt`, `drift-live-run-2026-09-15`); every other
// empirical receipt is `method-summary`. `run-record` is the one deliberate
// exception, set to `not-applicable` rather than `method-summary`: it is a
// design proposal with no method run to summarize, and `not-applicable` is
// the value `contracts/types.ts`'s `CaptureType` enum and the source
// contract's own annotation ("Not applicable, proposal") both provide for
// exactly this case.

export type EvidenceClass = "observed" | "externally-reported" | "proposed" | "measured" | "illustrative";
export type CaptureType = "original" | "redacted-original" | "method-summary" | "illustrative" | "not-applicable";

export interface EvidenceRecord {
  id: string;
  title: string;
  evidenceClass: EvidenceClass;
  captureType: CaptureType;
  sourceUrl: string | null;
  sourceRevision: string | null;
  eventDate: string | null; // ISO date; null when the manuscript doesn't state one
  recordedDate: string | null; // ISO date the receipt/check/audit was recorded or committed
  verifiedAt: string | null;
  supports: string[];
  limitations: string[];
  publicability: "approved" | "pending" | "withheld";
  relatedSceneIds: string[]; // ids into a thread's beats; post-scoped strings, not a per-thread BeatId enum
  publicCapturePath: string | null;
}

export const evidence: Record<string, EvidenceRecord> = {
  "drift-check": {
    id: "drift-check",
    title: "The reviewer copy",
    evidenceClass: "observed",
    captureType: "method-summary",
    sourceUrl: null,
    sourceRevision: null,
    eventDate: "2026-08-05",
    recordedDate: "2026-08-06",
    verifiedAt: null,
    supports: [
      "A bounded comparison between deployed copies and their declared source can expose a stale reviewer that a clean registry entry alone did not reveal.",
      "The comparison classifies deployed paths as tracked, allowed, or drift, rather than treating every difference the same way.",
    ],
    limitations: [
      "Method summarized from the supplied receipt; it does not recover a per-session loading history or count how many reviews ran against the stale copy.",
      "A nonzero exit from the check does not by itself identify which specific finding fired.",
    ],
    publicability: "approved",
    relatedSceneIds: ["incident", "drift", "detection"],
    publicCapturePath: null,
  },
  "drift-manifest-excerpt": {
    id: "drift-manifest-excerpt",
    title: "Deployment manifest: tracked vs. allowed copies",
    evidenceClass: "observed",
    captureType: "redacted-original",
    sourceUrl: null,
    sourceRevision: null,
    eventDate: null,
    recordedDate: null,
    verifiedAt: null,
    supports: [
      "The manifest driving the drift gate classifies each declared path into exactly one bucket: a diffed tracked copy, or a never-diffed allowed copy carrying an explicit stated reason.",
    ],
    limitations: [
      "Two illustrative entries only; this excerpt does not show full manifest coverage or the undeclared-copy failure path.",
      "Internal paths in the excerpt are partially redacted; nothing beyond what the essay already publishes is disclosed here.",
    ],
    publicability: "approved",
    relatedSceneIds: ["drift"],
    publicCapturePath: null,
  },
  "drift-live-run-2026-09-15": {
    id: "drift-live-run-2026-09-15",
    title: "A live drift-check run, redacted",
    evidenceClass: "observed",
    captureType: "redacted-original",
    sourceUrl: null,
    sourceRevision: null,
    eventDate: "2026-09-15",
    recordedDate: "2026-09-15",
    verifiedAt: null,
    supports: [
      "A live run of the same drift-check tool against the deployment manifest produced a real, redacted undeclared-copy finding.",
    ],
    limitations: [
      "This is a different, unrelated finding from the August 6 drift receipt the essay's detection beat describes; it is not a replay of that receipt.",
      "Internal identifiers (hostnames, paths) are withheld or redacted in the capture.",
    ],
    publicability: "approved",
    relatedSceneIds: ["detection"],
    publicCapturePath: null,
  },
  "instruction-parity": {
    id: "instruction-parity",
    title: "Sibling instructions",
    evidenceClass: "observed",
    captureType: "method-summary",
    sourceUrl: null,
    sourceRevision: null,
    eventDate: null,
    recordedDate: "2026-08-05",
    verifiedAt: null,
    supports: [
      "A defined parity rule can identify a required fact missing from one of a declared pair of harness instruction files.",
    ],
    limitations: [
      "Checks a declared relationship between named sibling files only; it does not establish that every instruction document is identical or that every harness is covered.",
      "Does not establish semantic correctness of the instructions it compares, only their declared parity.",
    ],
    publicability: "approved",
    relatedSceneIds: [],
    publicCapturePath: null,
  },
  "stale-guidance": {
    id: "stale-guidance",
    title: "Stale operating guidance",
    evidenceClass: "observed",
    captureType: "method-summary",
    sourceUrl: null,
    sourceRevision: null,
    eventDate: null,
    recordedDate: "2026-08-07",
    verifiedAt: null,
    supports: [
      "A targeted scan can catch a named, superseded assertion in live operating guidance while leaving dated historical records alone.",
    ],
    limitations: [
      "Catches a specific known assertion pattern; it does not prove that all remaining prose in the scanned documents is current or true.",
    ],
    publicability: "approved",
    relatedSceneIds: [],
    publicCapturePath: null,
  },
  provisioning: {
    id: "provisioning",
    title: "Missing capability: discover before replacing",
    evidenceClass: "observed",
    captureType: "method-summary",
    sourceUrl: null,
    sourceRevision: null,
    eventDate: null,
    recordedDate: null,
    verifiedAt: null,
    supports: [
      "A missing local artifact is treated as unprovisioned rather than nonexistent; a failure hook can direct the operator back to the registry with a suggested deployment command.",
    ],
    limitations: [
      "The receipt's own origin date is unresolved in the supplied source; no date is asserted here.",
      "A suggested deployment action is not evidence that deployment or execution actually occurred.",
    ],
    publicability: "approved",
    relatedSceneIds: [],
    publicCapturePath: null,
  },
  "workflow-sync": {
    id: "workflow-sync",
    title: "Workflow copies needing different repairs",
    evidenceClass: "observed",
    captureType: "method-summary",
    sourceUrl: null,
    sourceRevision: null,
    eventDate: null,
    recordedDate: "2026-08-11",
    verifiedAt: null,
    supports: [
      "A direction-aware synchronization tool can preserve per-project rosters and refuse to overwrite a local-ahead copy, protecting a deliberate difference from being erased by a blanket update.",
    ],
    limitations: [
      "This is a separate incident from the stale reviewer, not evidence that every local difference across projects is legitimate.",
      "The refusal to overwrite protects a difference from erasure; it does not certify that difference as correct or promote it into shared policy.",
    ],
    publicability: "approved",
    relatedSceneIds: [],
    publicCapturePath: null,
  },
  ancestry: {
    id: "ancestry",
    title: "Ancestry versus released content",
    evidenceClass: "measured",
    captureType: "method-summary",
    sourceUrl: null,
    sourceRevision: null,
    eventDate: null,
    recordedDate: null,
    verifiedAt: null,
    supports: [
      "Commit-ancestry and tag-containment checks can return a negative result against a squash-merging dependency repository even when the fix is present in the tagged file, once inspected directly.",
    ],
    limitations: [
      "Measures presence in the tagged source only; it does not measure presence in a deployed process, and it supplies no outcome comparison.",
      "No date is given in the supplied receipt; none is inferred here.",
    ],
    publicability: "approved",
    relatedSceneIds: [],
    publicCapturePath: null,
  },
  "bom-scope": {
    id: "bom-scope",
    title: "A provenance writer on one path",
    evidenceClass: "measured",
    captureType: "method-summary",
    sourceUrl: null,
    sourceRevision: null,
    eventDate: null,
    recordedDate: "2026-09-16",
    verifiedAt: null,
    supports: [
      "Bundle materialization automatically attempts BOM emission, but a separate single-artifact deployment path emitted activity events without invoking that generator.",
    ],
    limitations: [
      "This is the audit's scoped finding for the two paths it inspected, not a measured fleet-wide adoption rate.",
      "A working bundle path does not, by itself, close the single-artifact path's gap.",
    ],
    publicability: "approved",
    relatedSceneIds: [],
    publicCapturePath: null,
  },
  "context-records": {
    id: "context-records",
    title: "Real records, unresolved caller",
    evidenceClass: "measured",
    captureType: "method-summary",
    sourceUrl: null,
    sourceRevision: null,
    eventDate: null,
    recordedDate: "2026-09-16",
    verifiedAt: null,
    supports: [
      "Three real context-provenance rows with deployed-artifact findings exist, and the CLI-to-writer call chain that could produce them was traced.",
    ],
    limitations: [
      "The inspected durable records did not identify which actor, human or automated, produced those three rows.",
      "File modification time was not used as a per-row execution timestamp; the rows are real but the producer stays unresolved.",
    ],
    publicability: "approved",
    relatedSceneIds: [],
    publicCapturePath: null,
  },
  "run-record": {
    id: "run-record",
    title: "A proposed run-level evidence record",
    evidenceClass: "proposed",
    captureType: "not-applicable",
    sourceUrl: null,
    sourceRevision: null,
    eventDate: null,
    recordedDate: null,
    verifiedAt: null,
    supports: [
      "Names the relationships a future run-level record should preserve: loaded artifact identity, context and policy state, observed actions, verification evidence, and an accepting authority.",
    ],
    limitations: [
      "This is a design proposal, not an implementation receipt, an attestation, or a measured outcome.",
      "No run today is claimed to produce this record; where identity wasn't captured, the model marks it unknown rather than backfilling it.",
    ],
    publicability: "approved",
    relatedSceneIds: ["outcome"],
    publicCapturePath: null,
  },
};
