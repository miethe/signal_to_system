/**
 * WorkflowScrubber — horizontal timeline with discrete step indicators.
 *
 * Desktop: clickable step chips + progress fill; arrow keys, Home/End navigate.
 * Mobile (compact, <640px): Prev/Next buttons with current label; no horizontal
 * scroll; touch targets >=44px.
 *
 * Accessibility (WCAG AA):
 * - role="slider" with aria-valuemin/max/now/text on the track element.
 * - Step buttons: role="tab", aria-selected, numeric label + sr-only status text.
 * - Keyboard: ArrowLeft/Right step, ArrowUp/Down step, Home (first), End (last).
 * - Visible focus rings in both light and dark mode (see workflow-showcase.css).
 * - Compact controls: aria-label on Prev/Next, aria-live label announces step.
 *
 * No external animation libraries; CSS transitions only.
 * Respects prefers-reduced-motion via CSS (see workflow-showcase.css).
 */

import { useEffect, useMemo, useRef, useState } from "react";
import type { Step } from "../../types/workflow";

interface WorkflowScrubberProps {
  steps: Step[];
  activeIndex: number;
  onStep: (index: number) => void;
  stageTitle: string;
  /** Optional tracker for analytics (debounced internally by parent). */
  onAnalyticsStep?: (stepIndex: number) => void;
}

export default function WorkflowScrubber({
  steps,
  activeIndex,
  onStep,
  stageTitle,
  onAnalyticsStep,
}: WorkflowScrubberProps) {
  // Use 640px (Tailwind sm) as the compact breakpoint for mobile prev/next.
  const [compact, setCompact] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const maxIndex = steps.length - 1;
  const progressPct = maxIndex === 0 ? 100 : (activeIndex / maxIndex) * 100;

  const handleStep = (idx: number) => {
    onStep(idx);
    onAnalyticsStep?.(idx);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        handleStep(Math.min(activeIndex + 1, maxIndex));
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        handleStep(Math.max(activeIndex - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        handleStep(0);
        break;
      case "End":
        e.preventDefault();
        handleStep(maxIndex);
        break;
    }
  };

  const currentStep = steps[activeIndex];

  // Compute human-readable state labels for screen readers.
  const stepStatusLabel = useMemo(
    () => (idx: number) => {
      if (idx === activeIndex) return "active";
      if (idx < activeIndex) return "visited";
      return "unvisited";
    },
    [activeIndex],
  );

  return (
    <div
      className="ws-scrubber"
      aria-label={`Workflow scrubber for ${stageTitle}`}
    >
      {/* Progress track — acts as the keyboard-navigable slider. */}
      <div
        ref={trackRef}
        className="ws-scrubber__track"
        role="slider"
        tabIndex={0}
        aria-label={`Step ${activeIndex + 1} of ${steps.length}: ${currentStep?.label ?? ""}`}
        aria-valuemin={0}
        aria-valuemax={maxIndex}
        aria-valuenow={activeIndex}
        aria-valuetext={`Step ${activeIndex + 1} of ${steps.length}: ${currentStep?.label ?? ""}`}
        onKeyDown={handleKeyDown}
      >
        <div
          className="ws-scrubber__fill"
          style={{ width: `${progressPct}%` }}
          aria-hidden="true"
        />
      </div>

      {compact ? (
        /* Mobile: Prev / label / Next layout. */
        <div className="ws-scrubber__controls">
          <button
            type="button"
            className="ws-scrubber__btn"
            onClick={() => handleStep(Math.max(activeIndex - 1, 0))}
            disabled={activeIndex === 0}
            aria-label="Previous step"
          >
            &#8249; Prev
          </button>
          {/* aria-live announces step changes to screen readers on mobile. */}
          <span className="ws-scrubber__label" aria-live="polite" aria-atomic="true">
            <strong>Step {activeIndex + 1} / {steps.length}</strong>
            <br />
            {currentStep?.label}
          </span>
          <button
            type="button"
            className="ws-scrubber__btn"
            onClick={() => handleStep(Math.min(activeIndex + 1, maxIndex))}
            disabled={activeIndex === maxIndex}
            aria-label="Next step"
          >
            Next &#8250;
          </button>
        </div>
      ) : (
        /* Desktop: chip row. role="tablist" because each chip is role="tab". */
        <div className="ws-scrubber__steps" role="tablist" aria-label="Workflow steps">
          {steps.map((step, idx) => {
            const state = stepStatusLabel(idx);
            const isActive = idx === activeIndex;
            return (
              <button
                key={step.stepId}
                type="button"
                role="tab"
                className="ws-step"
                data-state={isActive ? "active" : idx < activeIndex ? "visited" : "idle"}
                aria-selected={isActive}
                aria-label={`Step ${idx + 1}: ${step.label}`}
                onClick={() => handleStep(idx)}
              >
                {/* Numeric index — visible, aria-hidden to avoid duplicate reads. */}
                <span className="ws-step__index" aria-hidden="true">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span>{step.label}</span>
                {/* Status communicated to screen readers without relying on color. */}
                <span className="sr-only">{state}</span>
                {idx < activeIndex && (
                  /* Checkmark SVG for visited steps (color + icon; not color-only). */
                  <svg
                    className="ws-step__check"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
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
