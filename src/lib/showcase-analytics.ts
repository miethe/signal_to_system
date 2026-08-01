/**
 * Workflow Showcase Analytics
 *
 * Thin, no-op-safe wrapper around Plausible-style event tracking.
 * All calls are guarded: if `window.plausible` is not defined the
 * events are silently dropped. No PII is ever sent.
 *
 * Event Schema
 * ------------
 * showcase_stage_view
 *   props: { stageId: string, postSlug: string }
 *   Fired once when a stage becomes visible / active.
 *
 * showcase_scrub
 *   props: { stageId: string, stepIndex: number }
 *   Fired (debounced 250ms) on scrubber step change.
 *
 * showcase_panel_toggle
 *   props: { stageId: string, artifactType: string, expanded: boolean }
 *   Fired when an artifact tab / accordion panel is opened or closed.
 *
 * showcase_cta_click
 *   props: { stageId: string, skillName: string, href: string }
 *   Fired when the CTA "Open skill" link is activated.
 */

// Plausible injects `window.plausible` as a queue function.
// We extend the global Window type minimally here rather than adding a full
// declaration file, keeping the surface area small.
declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, string | number | boolean> },
    ) => void;
  }
}

/** Fire a Plausible-compatible event. No-op when plausible is absent. */
function track(
  name: string,
  props?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  try {
    window.plausible?.(name, { props });
  } catch {
    // Guard against any future API changes.
  }
}

// ---------------------------------------------------------------------------
// Public helpers
// ---------------------------------------------------------------------------

/** Fired once when a stage becomes active/visible. */
export function trackStageView(stageId: string, postSlug: string): void {
  track("showcase_stage_view", { stageId, postSlug });
}

/**
 * Fired on scrubber step change.
 * Returns a debounced dispatcher (250ms); call the returned function directly.
 */
export function makeScrubbingTracker(
  stageId: string,
): (stepIndex: number) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (stepIndex: number) => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      track("showcase_scrub", { stageId, stepIndex });
      timer = null;
    }, 250);
  };
}

/** Fired when an artifact panel tab is toggled open or closed. */
export function trackPanelToggle(
  stageId: string,
  artifactType: string,
  expanded: boolean,
): void {
  track("showcase_panel_toggle", { stageId, artifactType, expanded });
}

/** Fired when the CTA link is clicked. */
export function trackCtaClick(
  stageId: string,
  skillName: string,
  href: string,
): void {
  track("showcase_cta_click", { stageId, skillName, href });
}
