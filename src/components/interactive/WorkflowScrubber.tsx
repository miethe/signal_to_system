/**
 * WorkflowScrubber — horizontal timeline with discrete step indicators.
 *
 * Desktop: clickable step chips + progress fill; arrow keys, Home/End navigate.
 * Mobile (compact): Prev/Next buttons with current label.
 *
 * Accessibility:
 * - role="slider", aria-valuemin/max/now/text on the track
 * - aria-label on every step button
 * - Keyboard: ArrowLeft/Right, Home, End
 *
 * No external animation libraries; CSS transitions only.
 */

import { useEffect, useRef, useState } from "react";
import type { Step } from "../../types/workflow";

interface WorkflowScrubberProps {
  steps: Step[];
  activeIndex: number;
  onStep: (index: number) => void;
  stageTitle: string;
}

export default function WorkflowScrubber({
  steps,
  activeIndex,
  onStep,
  stageTitle,
}: WorkflowScrubberProps) {
  const [compact, setCompact] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Detect compact (mobile) mode via matchMedia
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const maxIndex = steps.length - 1;
  const progressPct = maxIndex === 0 ? 100 : (activeIndex / maxIndex) * 100;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        onStep(Math.min(activeIndex + 1, maxIndex));
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        onStep(Math.max(activeIndex - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        onStep(0);
        break;
      case "End":
        e.preventDefault();
        onStep(maxIndex);
        break;
    }
  };

  const currentStep = steps[activeIndex];

  return (
    <div className="ws-scrubber" aria-label={`Workflow scrubber for ${stageTitle}`}>
      <div
        ref={trackRef}
        className="ws-scrubber__track"
        role="slider"
        tabIndex={0}
        aria-label={`Step ${activeIndex + 1} of ${steps.length}: ${currentStep?.label ?? ""}`}
        aria-valuemin={0}
        aria-valuemax={maxIndex}
        aria-valuenow={activeIndex}
        aria-valuetext={currentStep?.label}
        onKeyDown={handleKeyDown}
      >
        <div
          className="ws-scrubber__fill"
          style={{ width: `${progressPct}%` }}
          aria-hidden="true"
        />
      </div>

      {compact ? (
        <div className="ws-scrubber__controls">
          <button
            type="button"
            className="ws-scrubber__btn"
            onClick={() => onStep(Math.max(activeIndex - 1, 0))}
            disabled={activeIndex === 0}
            aria-label="Previous step"
          >
            ‹ Prev
          </button>
          <span className="ws-scrubber__label" aria-live="polite">
            <strong>Step {activeIndex + 1} / {steps.length}</strong>
            <br />
            {currentStep?.label}
          </span>
          <button
            type="button"
            className="ws-scrubber__btn"
            onClick={() => onStep(Math.min(activeIndex + 1, maxIndex))}
            disabled={activeIndex === maxIndex}
            aria-label="Next step"
          >
            Next ›
          </button>
        </div>
      ) : (
        <div className="ws-scrubber__steps" role="tablist" aria-label="Workflow steps">
          {steps.map((step, idx) => {
            const state =
              idx === activeIndex
                ? "active"
                : idx < activeIndex
                  ? "visited"
                  : "idle";
            return (
              <button
                key={step.stepId}
                type="button"
                role="tab"
                className="ws-step"
                data-state={state}
                aria-selected={idx === activeIndex}
                aria-label={`Step ${idx + 1}: ${step.label}`}
                onClick={() => onStep(idx)}
              >
                <span className="ws-step__index" aria-hidden="true">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span>{step.label}</span>
                {state === "visited" && (
                  <svg
                    className="ws-step__check"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 011.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
