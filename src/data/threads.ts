// ---------------------------------------------------------------------------
// Running Thread Registry
// ---------------------------------------------------------------------------
//
// Declarative beat lists for essays that carry a single worked example from
// beginning to outcome. One record per beat drives every rendering surface
// (inline scene, ThreadDock, Thread Focus route/overlay, figure route) so
// none of them writes its own second explanation (reading-experience-v2
// DIRECTION.md V3). `ThreadStoryboard.astro`, `ThreadBeat.astro`'s marker
// variant, and `ThreadRail.astro` currently read this same registry; P0-B
// retires the first two and folds the third into `ThreadDock`.
//
// Beat order is the canonical six (DIRECTION.md V12): Incident, Deployment,
// Use, Drift, Detection, Outcome. The essay places each `ThreadScene` beside
// its movement prose in exactly this order, while this record remains the
// one shared account for inline and Thread Focus readers.
//
// Every `recap` / `establishes` / `doesNotEstablish` / `longDescription`
// below is written fresh, grounded in the manuscript's own prose and figure
// captions (`src/content/posts/the-registry-wave-agentic-artifact-supply-chain.mdx`)
// and the six-beat filename/semantic mapping in
// `registry_wave_visual_source_of_truth_2026-09-18/06_SUPPORTING_HANDOFFS/INLINE-FIGURE-IMAGE-USAGE-HANDOFF.md`.
// The reading-experience-v2 handoff's `contracts/thread-manifest.json` prose
// (title/caption/description/nodes) is mockup text for a different draft of
// this essay and is not copied verbatim; only its beat order, `mode`
// classification, and filename mapping are reused as structural facts.

export type ThreadBeatKind = "historical" | "conceptual" | "mechanism" | "proposed";

export interface ThreadBeatImage {
  src: string; // "/assets/posts/<slug>/<file>.png"
  alt: string;
  caption?: string;
}

export interface ThreadBeat {
  id: string; // anchor id is `thread-${id}`
  n: number;
  label: string; // display title, shared by inline and Thread Focus
  recap: string; // one real paragraph; inline and Thread Focus both render it
  kind: ThreadBeatKind; // historical | conceptual | mechanism | proposed (thread-manifest.json's `mode`)
  establishes: string; // what this beat's evidence actually shows
  doesNotEstablish: string; // the boundary readers should not read past
  longDescription: string; // fuller paragraph for Thread Focus / figure long description
  image: ThreadBeatImage;
  secondaryImage?: ThreadBeatImage; // unused by this thread; kept for ThreadStoryboard.astro's existing prop shape
  relatedEvidenceIds: string[]; // ids into `src/data/evidence.ts`; post-scoped strings, not a per-thread BeatId enum
}

export interface Thread {
  slug: string;
  title: string;
  subject: string;
  beats: ThreadBeat[];
}

export const threads: Record<string, Thread> = {
  "the-registry-wave-agentic-artifact-supply-chain": {
    slug: "the-registry-wave-agentic-artifact-supply-chain",
    title: "The stale reviewer",
    subject: "task-completion-validator",
    beats: [
      {
        id: "incident",
        n: 1,
        label: "Incident",
        kind: "historical",
        recap:
          "A reviewer skill was missing a mandatory guard. Fixing it at the source updated the registry immediately, but every project outside that source repository kept loading the pre-fix deployed copy for five days. The registry was right and the runtime's copy was wrong, and nothing compared the two to say so.",
        establishes:
          "The source and registry can be corrected while a deployed project copy stays on the old bytes, and nothing surfaces that mismatch by default.",
        doesNotEstablish:
          "This does not establish which bytes any given run actually loaded, or that a clean registry entry by itself guarantees deployment.",
        longDescription:
          "The reviewer skill's mandatory guard was missing in every project outside its source repository. Fixing the guard at the source updated the registry immediately, but each deployed project copy is a separate object: the registry record didn't rewrite any of them, and nothing compared the deployed bytes against the registered ones to notice they'd fallen behind. The diagram traces that handoff from a corrected source and registry into project copies that stayed on the earlier bytes.",
        image: {
          src: "/assets/posts/the-registry-wave-agentic-artifact-supply-chain/registry-wave-incident-resolution-flow.png",
          alt: "Flow diagram showing a reviewer skill's guard corrected at its source and reflected in the registry, while separate deployed project copies remain on the earlier, uncorrected bytes.",
          caption:
            "The fix landed at the source and reached the registry immediately; the deployed copies had not caught up yet.",
        },
        relatedEvidenceIds: ["drift-check"],
      },
      {
        id: "deployment",
        n: 2,
        label: "Deployment",
        kind: "historical",
        recap:
          "A file copy is a separate object from its source. Updating the source or registering a new revision doesn't update an already-deployed copy, and a clean registration says nothing about what a given project actually has on disk.",
        establishes:
          "Source revision, registry record, and deployed project copy are three separate objects; closing the gap needs a recorded deployment path, not a symlink or a manual copy.",
        doesNotEstablish:
          "A registry entry existing does not establish that any specific project's deployed copy matches it.",
        longDescription:
          "The same handoff repeats through the essay: source, registry, project deployment, runtime loading, and outcome evidence are each a distinct record. A registry entry naming the correct revision says nothing about which bytes a specific project actually deployed, and a deployment record has to name that relationship explicitly rather than assume it from the registry alone. A symlink doesn't solve this either; it follows the source checkout as branches change, so it drifts with the branch instead of leaving a fixed, comparable copy.",
        image: {
          src: "/assets/posts/the-registry-wave-agentic-artifact-supply-chain/registry-wave-from-source-to-outcome.png",
          alt: "Diagram of the handoff from source repository to registry to project deployment to runtime loading to outcome evidence, showing where an artifact's declared and deployed identity can separate.",
          caption:
            "The registry's corrected artifact and the deployed project copies now disagree about what the same skill name means.",
        },
        relatedEvidenceIds: [],
      },
      {
        id: "use",
        n: 3,
        label: "Use",
        kind: "conceptual",
        recap:
          "Even once the corrected copy is deployed, presence in the loaded file doesn't establish that the guard was actually followed during a run; that requires its own observation, not an inference from disk state.",
        establishes:
          "A corrected instruction's presence in a loaded artifact is not, on its own, evidence that the instruction was followed during a run; behavior requires separate verification.",
        doesNotEstablish:
          "This is an analytic branch, not evidence that any specific stale run in the incident did or didn't load a corrected reviewer. It does not establish observed behavior.",
        longDescription:
          "Even after a corrected copy is deployed, an instruction's presence in the loaded file is a different claim from evidence that the instruction was followed during a specific run. This beat is an analytic branch: it separates the two claims rather than reporting that a stale run in the incident did or didn't load a corrected reviewer. Verifying behavior needs its own observation; absent that, the loaded version and its effect on the run stay unknown.",
        image: {
          src: "/assets/posts/the-registry-wave-agentic-artifact-supply-chain/registry-wave-presence-vs-behavior.png",
          alt: "Diagram distinguishing a corrected instruction's presence in a loaded artifact from evidence that the instruction was actually followed during a run.",
          caption: "A guard's presence in a loaded file isn't evidence that the guard was actually followed.",
        },
        relatedEvidenceIds: [],
      },
      {
        id: "drift",
        n: 4,
        label: "Drift",
        kind: "historical",
        recap:
          "For five days, the source and registry stayed corrected while every deployed copy outside the source repository stayed on the pre-fix bytes at the same time. The manifest behind the drift gate classifies each declared path as a diffed tracked copy, a never-diffed allowed copy, or an undeclared failure.",
        establishes:
          "Declared state and deployed state can disagree for a measurable, bounded interval without anything surfacing the disagreement on its own.",
        doesNotEstablish:
          "The figure documents one five-day interval from this incident, not a claim of continuous fleet-wide monitoring or a general drift rate.",
        longDescription:
          "The deployment manifest classifies every declared path into one of three buckets: a tracked copy diffed against its upstream, an allowed copy with no upstream to diff against, or an undeclared copy that fails outright. For five days, that classification stayed silent while the registry and the deployed copies disagreed about the same skill name, and the exact calendar range is preserved from the incident rather than invented here.",
        image: {
          src: "/assets/posts/the-registry-wave-agentic-artifact-supply-chain/registry-wave-drift-across-five-days.png",
          alt: "Timeline diagram spanning a five-day interval in which the registry stayed corrected while deployed copies stayed on the pre-fix bytes, without the disagreement being reported.",
          caption:
            "For five days, “fixed” described one location; the registry and the deployment disagreed the whole time.",
        },
        relatedEvidenceIds: ["drift-check", "drift-manifest-excerpt"],
      },
      {
        id: "detection",
        n: 5,
        label: "Detection",
        kind: "mechanism",
        recap:
          "An August 6 byte-comparison gate compares deployed state against its declared source, classifying each entry as a tracked copy, a justified (allowed) copy, or drift, and flags symlinks separately. A justified copy needs an explicit stated reason; drift fails the check outright.",
        establishes:
          "A byte comparison against the declared source is what actually surfaced the five-day gap; nothing upstream of that comparison had noticed it.",
        doesNotEstablish:
          "A nonzero exit from the check does not by itself identify which specific finding fired, and the check does not recover a per-session loading history.",
        longDescription:
          "An August 6 byte-comparison gate compares each deployed copy against its declared source, classifying tracked copies, justified (allowed) copies, and drift, and separately flags any symlink. A justified copy needs an explicit stated reason to differ; anything else that fails the comparison is drift. The comparison itself, not the registry and not the source, is what surfaced the five-day gap.",
        image: {
          src: "/assets/posts/the-registry-wave-agentic-artifact-supply-chain/registry-wave-detecting-silent-drift.png",
          alt: "Diagram of a byte-comparison check between deployed copies and their declared source, surfacing a mismatch as drift.",
          caption: "A byte comparison against the declared source is what finally noticed the gap no one else was checking.",
        },
        relatedEvidenceIds: ["drift-check", "drift-live-run-2026-09-15"],
      },
      {
        id: "outcome",
        n: 6,
        label: "Outcome",
        kind: "proposed",
        recap:
          "Closing the loop needs a run record naming which reviewer version an agent session actually loaded, joined to the review's findings, verification evidence, and the acceptance decision, with any unrecorded run marked unknown rather than backfilled from the current registry.",
        establishes:
          "What's missing is a specific evidentiary link: the loaded artifact identity, joined to context and policy state, observed actions, verification, and an accepting authority.",
        doesNotEstablish:
          "This is a proposed evidence model. It is not a measured closed loop, an implemented system, or a claim that any run today captures this record.",
        longDescription:
          "The missing piece is a run record that names which artifact version an agent session actually loaded, alongside its context, tools, and policy state, joined to the review's findings, verification evidence, and an accepting authority's decision. Where that identity wasn't captured, the record marks the run's version unknown rather than backfilling it from the current registry. This is a proposed evidence model, not an implemented or measured system.",
        image: {
          src: "/assets/posts/the-registry-wave-agentic-artifact-supply-chain/registry-wave-run-level-provenance-infographic.png",
          alt: "Infographic of a proposed run-level record linking a loaded artifact's identity to its context and policy state, observed actions, verification evidence, and an accepting authority.",
          caption:
            "A proposed run-evidence model, not captured runtime data: name the reviewer version actually loaded, and leave earlier unrecorded runs marked unknown.",
        },
        relatedEvidenceIds: ["run-record"],
      },
    ],
  },
};
