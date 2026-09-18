/**
 * Shared by PostSidebar's TOC and ThreadRail's step list: given a full item
 * count and how many rows actually fit, pick a contiguous window around the
 * active item so the reader's current position is never scrolled out of
 * view. Both callers measure `maxVisible` themselves (their rows differ in
 * height) — this is just the centering arithmetic, once.
 */
export interface ListWindow {
  /** First visible index (inclusive). */
  start: number;
  /** Last visible index (inclusive). */
  end: number;
  /** Items hidden above `start`. */
  above: number;
  /** Items hidden below `end`. */
  below: number;
}

export function computeListWindow(total: number, active: number, maxVisible: number): ListWindow {
  if (total <= 0) return { start: 0, end: -1, above: 0, below: 0 };
  if (maxVisible >= total || maxVisible <= 0) {
    return { start: 0, end: total - 1, above: 0, below: 0 };
  }

  const safeActive = Math.min(Math.max(active, 0), total - 1);
  const half = Math.floor(maxVisible / 2);
  let start = safeActive - half;
  let end = start + maxVisible - 1;

  if (start < 0) {
    end -= start;
    start = 0;
  }
  if (end > total - 1) {
    start -= end - (total - 1);
    end = total - 1;
  }
  start = Math.max(0, start);

  return { start, end, above: start, below: total - 1 - end };
}
