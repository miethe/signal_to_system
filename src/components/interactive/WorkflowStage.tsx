/**
 * WorkflowStage — main React island for the Living Workflow Showcase.
 *
 * Orchestrates:
 *   - WorkflowScrubber       (step navigation; desktop chips + mobile prev/next)
 *   - terminal output pane   (mono-font lines for the active step)
 *   - WorkflowArtifactPanel  (tabbed PRD/plan/progress/agents view)
 *   - WorkflowMetrics        (fixed overlay; dismissible)
 *   - WorkflowCTACard        (per-stage "try it yourself" link)
 *
 * Animation: uses the Web Animations API on the terminal pane when the step
 * changes (fade + lift). No external animation library.
 *
 * State: reads/writes via Nanostores atoms in `src/store/workflowStageStore.ts`.
 *
 * Hydration: intended to be mounted with `client:idle` from the Astro page
 * (the entire feature lives below the fold and is non-critical).
 *
 * @example
 *   <WorkflowStage client:idle stage={stage} />
 *
 * Spec references:
 *   - docs/specs/workflow-showcase-spike.md (locked tech decision)
 *   - docs/specs/workflow-showcase-implementation.md (WS-1.2)
 */

import { useEffect, useRef } from "react";
import { useStore } from "@nanostores/react";
import type { Stage } from "../../types/workflow";
import {
  $activeStageId,
  $activeStepIndex,
  $expandedPanels,
  setActiveStage,
  setActiveStep,
  togglePanel,
} from "../../store/workflowStageStore";
import WorkflowScrubber from "./WorkflowScrubber";
import WorkflowArtifactPanel from "./WorkflowArtifactPanel";
import WorkflowMetrics from "./WorkflowMetrics";
import WorkflowCTACard from "./WorkflowCTACard";

export interface WorkflowStageProps {
  /** Stage data (id, steps, metrics, ctaLinks, etc.) */
  stage: Stage;
  /** Optional callback fired on step changes (for analytics in later phases). */
  onStepChange?: (stepIndex: number, stepId: string) => void;
}

export default function WorkflowStage({
  stage,
  onStepChange,
}: WorkflowStageProps) {
  const activeStageId = useStore($activeStageId);
  const activeIndex = useStore($activeStepIndex);
  const expandedPanels = useStore($expandedPanels);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Sync incoming stage prop into the store on mount / stage switch.
  useEffect(() => {
    if (activeStageId !== stage.id) {
      setActiveStage(stage.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage.id]);

  const maxIndex = stage.steps.length - 1;
  const safeIndex = Math.min(activeIndex, maxIndex);
  const currentStep = stage.steps[safeIndex];
  const primaryCta = stage.ctaLinks[0];

  // Web Animations API: fade-and-lift the terminal pane on step change.
  useEffect(() => {
    const el = terminalRef.current;
    if (!el || typeof el.animate !== "function") return;
    if (typeof window !== "undefined") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
    }
    el.animate(
      [
        { opacity: 0, transform: "translateY(6px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 220, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" },
    );
  }, [safeIndex, stage.id]);

  const handleStep = (idx: number) => {
    setActiveStep(idx, maxIndex);
    onStepChange?.(idx, stage.steps[idx]?.stepId ?? "");
  };

  return (
    <div className="ws-stage" role="region" aria-label={`Workflow stage: ${stage.title}`}>
      <header className="ws-stage__header">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">{stage.title}</h2>
        <p className="text-[var(--text-secondary)] mt-1">{stage.description}</p>
      </header>

      <WorkflowScrubber
        steps={stage.steps}
        activeIndex={safeIndex}
        onStep={handleStep}
        stageTitle={stage.title}
      />

      <div
        ref={terminalRef}
        className="ws-terminal"
        aria-label={`Terminal output for step ${safeIndex + 1}`}
        aria-live="polite"
      >
        {currentStep?.description && (
          <div className="ws-terminal__line ws-terminal__line--prompt">
            # {currentStep.description}
          </div>
        )}
        {currentStep?.terminal?.map((line, i) => (
          <div key={i} className="ws-terminal__line">
            {line.startsWith("$") ? (
              <>
                <span className="ws-terminal__line--prompt">{line.slice(0, 1)}</span>
                {line.slice(1)}
              </>
            ) : (
              line
            )}
          </div>
        ))}
      </div>

      <WorkflowArtifactPanel
        panels={currentStep?.panels}
        expanded={expandedPanels}
        onTogglePanel={togglePanel}
      />

      {(currentStep?.terminalRecording || currentStep?.artifactSnapshots) && (
        <div className="ws-snapshots" aria-label="Captured snapshots for this step">
          {currentStep?.terminalRecording && (
            <a
              className="ws-snapshots__link"
              href={currentStep.terminalRecording}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open captured terminal
            </a>
          )}
          {currentStep?.artifactSnapshots &&
            Object.entries(currentStep.artifactSnapshots).map(([type, path]) =>
              path ? (
                <a
                  key={type}
                  className="ws-snapshots__link"
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open {type} snapshot
                </a>
              ) : null,
            )}
        </div>
      )}

      {primaryCta && <WorkflowCTACard cta={primaryCta} />}

      {stage.socialClip && (
        <div className="ws-social-clip" aria-label="Social clip for this stage">
          <video controls preload="metadata" poster={stage.thumbnail}>
            <source src={stage.socialClip} type="video/mp4" />
          </video>
        </div>
      )}

      <WorkflowMetrics metrics={stage.metrics} />
    </div>
  );
}
