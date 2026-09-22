/** Small shared helpers for the data-driven diagram components. */
export const r2 = (n: number) => Math.round(n * 100) / 100;
export const rad = (deg: number) => (deg * Math.PI) / 180;
export const polar = (cx: number, cy: number, r: number, deg: number): [number, number] => [
  r2(cx + r * Math.cos(rad(deg))),
  r2(cy + r * Math.sin(rad(deg))),
];

/** Four-point sparkle, concave sides; k controls waist thickness. */
export function sparkle(cx: number, cy: number, r: number, k = 0.22): string {
  const q = r * k;
  const f = r2;
  return `M${f(cx)} ${f(cy - r)}Q${f(cx + q)} ${f(cy - q)} ${f(cx + r)} ${f(cy)}Q${f(cx + q)} ${f(cy + q)} ${f(cx)} ${f(cy + r)}Q${f(cx - q)} ${f(cy + q)} ${f(cx - r)} ${f(cy)}Q${f(cx - q)} ${f(cy - q)} ${f(cx)} ${f(cy - r)}Z`;
}

/** Open chevron arrowhead whose tip sits at (x, y) pointing along (dx, dy). */
export function arrowhead(x: number, y: number, dx: number, dy: number, len = 7, half = 4.5): string {
  const m = Math.hypot(dx, dy) || 1;
  const ux = dx / m;
  const uy = dy / m;
  const bx = x - ux * len;
  const by = y - uy * len;
  return `M${r2(bx - uy * half)} ${r2(by + ux * half)}L${r2(x)} ${r2(y)}L${r2(bx + uy * half)} ${r2(by - ux * half)}`;
}

/** Signal-like bar heights: a bell envelope with deterministic ripple. */
export function waveformBars(count: number, maxHalf: number): number[] {
  const mid = (count - 1) / 2;
  return Array.from({ length: count }, (_, i) => {
    const env = Math.exp(-(((i - mid) / (count / 3.6)) ** 2));
    const ripple = 0.55 + 0.45 * Math.abs(Math.sin(i * 1.9 + 0.4));
    return r2(1.5 + (maxHalf - 1.5) * env * ripple);
  });
}

let uid = 0;
export const nextId = (prefix: string) => `${prefix}-${++uid}`;
