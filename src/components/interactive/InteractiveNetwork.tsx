/**
 * InteractiveNetwork — animated network visualization for the homepage hero.
 *
 * In "rich" mode: renders an animated SVG network of connected nodes.
 * In "lite" mode: renders a static gradient background.
 *
 * Usage in Astro:
 *   <InteractiveNetwork client:idle />
 */

import { useEffect, useRef, useState } from "react";
import { useStore } from "@nanostores/react";
import { $performanceMode } from "../../store/performanceStore";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

interface Edge {
  source: number;
  target: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const NODE_COUNT = 28;
const MAX_EDGE_DISTANCE = 180;
const SPEED = 0.25;
const NODE_COLORS = [
  "rgba(99,102,241,", // indigo
  "rgba(139,92,246,", // violet
  "rgba(14,165,233,", // sky
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createNodes(width: number, height: number): Node[] {
  return Array.from({ length: NODE_COUNT }, (_, id) => ({
    id,
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * SPEED,
    vy: (Math.random() - 0.5) * SPEED,
    radius: 2 + Math.random() * 3,
    opacity: 0.4 + Math.random() * 0.6,
  }));
}

function stepNodes(nodes: Node[], width: number, height: number): Node[] {
  return nodes.map((n) => {
    let { x, y, vx, vy } = n;
    x += vx;
    y += vy;
    if (x < 0 || x > width) vx = -vx;
    if (y < 0 || y > height) vy = -vy;
    return { ...n, x, y, vx, vy };
  });
}

function buildEdges(nodes: Node[]): Edge[] {
  const edges: Edge[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < MAX_EDGE_DISTANCE) {
        edges.push({ source: i, target: j });
      }
    }
  }
  return edges;
}

// ---------------------------------------------------------------------------
// Animated SVG canvas (rich mode)
// ---------------------------------------------------------------------------

function AnimatedNetwork({ width, height }: { width: number; height: number }) {
  const [nodes, setNodes] = useState<Node[]>(() => createNodes(width, height));
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let current = nodes;
    function tick() {
      current = stepNodes(current, width, height);
      setNodes([...current]);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  const edges = buildEdges(nodes);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      className="absolute inset-0"
    >
      {/* Edges */}
      {edges.map((e) => {
        const s = nodes[e.source];
        const t = nodes[e.target];
        const dx = s.x - t.x;
        const dy = s.y - t.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const alpha = (1 - dist / MAX_EDGE_DISTANCE) * 0.35;
        return (
          <line
            key={`${e.source}-${e.target}`}
            x1={s.x}
            y1={s.y}
            x2={t.x}
            y2={t.y}
            stroke={`rgba(139,92,246,${alpha.toFixed(3)})`}
            strokeWidth="1"
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((n, i) => {
        const colorBase = NODE_COLORS[i % NODE_COLORS.length];
        return (
          <circle
            key={n.id}
            cx={n.x}
            cy={n.y}
            r={n.radius}
            fill={`${colorBase}${n.opacity.toFixed(2)})`}
          />
        );
      })}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

interface InteractiveNetworkProps {
  className?: string;
}

export default function InteractiveNetwork({ className = "" }: InteractiveNetworkProps) {
  const mode = useStore($performanceMode);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState<{ width: number; height: number } | null>(null);

  // Measure container
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDims({ width, height });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const isRich = mode === "rich";

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-violet-950 to-zinc-950 ${className}`}
      style={{ minHeight: "320px" }}
      aria-hidden="true"
    >
      {isRich && dims ? (
        <AnimatedNetwork width={dims.width} height={dims.height} />
      ) : (
        /* Subtle static pattern in lite mode */
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_30%_50%,rgba(99,102,241,0.4),transparent_60%),radial-gradient(ellipse_at_70%_20%,rgba(139,92,246,0.4),transparent_60%)]" />
      )}

      {/* Overlay gradient for content legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
    </div>
  );
}
