/**
 * Server-side chart geometry for FigureWithData (no client JS, no chart
 * library): linear scales, "nice" ticks and SVG path strings. Kept pure so
 * a figure renders identically with JavaScript disabled.
 */
import type { FigureRecord } from '../../lib/labs/types';

export type Chart = NonNullable<FigureRecord['chart']>;

function niceStep(span: number, count: number): number {
  const raw = span / Math.max(count, 1);
  const pow = 10 ** Math.floor(Math.log10(raw));
  const frac = raw / pow;
  const nice = frac <= 1 ? 1 : frac <= 2 ? 2 : frac <= 2.5 ? 2.5 : frac <= 5 ? 5 : 10;
  return nice * pow;
}

export function niceDomain(min: number, max: number, count: number) {
  if (min === max) { min -= 1; max += 1; }
  const step = niceStep(max - min, count);
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = lo; v <= hi + step / 2; v += step) ticks.push(Number(v.toFixed(10)));
  return { lo, hi, ticks, step };
}

export const fmtTick = (v: number, step: number) => {
  const decimals = step >= 1 ? 0 : Math.min(3, Math.ceil(-Math.log10(step)));
  return v.toFixed(decimals);
};

export interface Frame { width: number; height: number; left: number; right: number; top: number; bottom: number }

export function layout(chart: Chart, frame: Frame, zeroBased = false) {
  const xs = chart.series.flatMap((s) => s.points.map((p) => p[0]));
  const ys = chart.series.flatMap((s) => s.points.map((p) => p[1]));
  const xd = niceDomain(Math.min(...xs), Math.max(...xs), 6);
  const yd = niceDomain(zeroBased ? Math.min(0, ...ys) : Math.min(...ys), Math.max(...ys), 5);
  const pw = frame.width - frame.left - frame.right;
  const ph = frame.height - frame.top - frame.bottom;
  const sx = (v: number) => frame.left + ((v - xd.lo) / (xd.hi - xd.lo)) * pw;
  const sy = (v: number) => frame.top + ph - ((v - yd.lo) / (yd.hi - yd.lo)) * ph;
  const clampY = (v: number) => Math.max(yd.lo, Math.min(yd.hi, v));
  const fit = chart.fit
    ? (() => {
        // Clip the fitted line to the plot box.
        const x0 = xd.lo, x1 = xd.hi;
        const y0 = clampY(chart.fit.intercept + chart.fit.slope * x0);
        const y1 = clampY(chart.fit.intercept + chart.fit.slope * x1);
        return { x1: sx(x0), y1: sy(y0), x2: sx(x1), y2: sy(y1) };
      })()
    : null;
  const lines = chart.series.map((s) => [...s.points].sort((a, b) => a[0] - b[0]).map(([x, y], i) => `${i ? 'L' : 'M'}${sx(x).toFixed(1)} ${sy(y).toFixed(1)}`).join(' '));
  return { xd, yd, sx, sy, fit, lines, pw, ph };
}

export const SERIES_VARS = ['--s2s-viz-1', '--s2s-viz-2', '--s2s-viz-3', '--s2s-viz-4', '--s2s-viz-5', '--s2s-viz-6'];
export const seriesColor = (i: number) => `var(${SERIES_VARS[i % SERIES_VARS.length]})`;
