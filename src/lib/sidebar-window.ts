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

/**
 * Fully-expanded, unwindowed height of `source` — measured off-screen on a
 * clone so the real element never flickers open to be measured. Elements
 * matching `keepHiddenSelector` (e.g. the "+N more" indicators, which are
 * meaningless once nothing is windowed) stay hidden on the clone; every
 * other `hidden` attribute and `.is-window-hidden` class is stripped so the
 * clone renders as if every row were showing. `width` should come from a
 * currently-visible ancestor (the source itself may be `display:none`).
 */
export function measureExpandedHeight(source: HTMLElement, width: number, keepHiddenSelector?: string): number {
  const clone = source.cloneNode(true) as HTMLElement;
  clone.removeAttribute('hidden');
  clone.querySelectorAll('[hidden]').forEach((el) => {
    if (keepHiddenSelector && el.matches(keepHiddenSelector)) return;
    el.removeAttribute('hidden');
  });
  clone.querySelectorAll('.is-window-hidden').forEach((el) => el.classList.remove('is-window-hidden'));
  clone.style.position = 'fixed';
  clone.style.top = '-9999px';
  clone.style.left = '-9999px';
  clone.style.margin = '0';
  clone.style.visibility = 'hidden';
  clone.style.pointerEvents = 'none';
  clone.style.width = `${width}px`;
  document.body.appendChild(clone);
  const height = clone.getBoundingClientRect().height;
  clone.remove();
  return height;
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
