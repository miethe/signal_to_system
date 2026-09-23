import { readFileSync } from "node:fs";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import { getObservatoryDarkTokens } from "./tokens";

// ---------------------------------------------------------------------------
// Build-time Open Graph card renderer ("Observatory dark").
//
// Runs only from static endpoints during `astro build` (src/pages/og/*),
// never at request time — satori lays out a plain object tree (no JSX
// pragma needed) into SVG, then @resvg/resvg-js rasterizes that SVG to a
// 1200x630 PNG buffer.
//
// Asset paths are resolved from process.cwd() (the project root `astro
// build` is always invoked from), not import.meta.url — this module is
// bundled into dist/.prerender/chunks/* during the build, so a path
// relative to its own module location would resolve inside dist/.
// ---------------------------------------------------------------------------

const repoRoot = process.cwd();

const CARD_WIDTH = 1200;
const CARD_HEIGHT = 630;

// ---------------------------------------------------------------------------
// Minimal hyperscript — satori accepts a plain {type, props} tree that
// mirrors a React element; no JSX/React runtime is required.
// ---------------------------------------------------------------------------

type Node = {
  type: string;
  props: Record<string, unknown> & { children?: Node[] | string };
};

function h(
  type: string,
  props: Record<string, unknown> = {},
  children?: Node[] | string
): Node {
  return { type, props: children === undefined ? props : { ...props, children } };
}

// ---------------------------------------------------------------------------
// Cached, lazily-computed build-time assets (fonts, image data URIs).
// ---------------------------------------------------------------------------

interface SatoriFont {
  name: string;
  data: Buffer;
  weight: 400 | 500;
  style: "normal";
}

let fontsCache: SatoriFont[] | null = null;

function loadFonts(): SatoriFont[] {
  if (fontsCache) return fontsCache;
  const fontFile = (pkg: string, file: string) =>
    readFileSync(path.join(repoRoot, "node_modules", pkg, "files", file));

  fontsCache = [
    {
      name: "Newsreader",
      data: fontFile("@fontsource/newsreader", "newsreader-latin-400-normal.woff"),
      weight: 400,
      style: "normal",
    },
    {
      name: "Inter",
      data: fontFile("@fontsource/inter", "inter-latin-400-normal.woff"),
      weight: 400,
      style: "normal",
    },
    {
      name: "Inter",
      data: fontFile("@fontsource/inter", "inter-latin-500-normal.woff"),
      weight: 500,
      style: "normal",
    },
    {
      name: "JetBrains Mono",
      data: fontFile("@fontsource/jetbrains-mono", "jetbrains-mono-latin-400-normal.woff"),
      weight: 400,
      style: "normal",
    },
  ];
  return fontsCache;
}

let markDataUriCache: string | null = null;

/**
 * The waveform brand mark, embedded as-is — never redrawn. Uses
 * mark-mono.svg (the same seven-bar waveform geometry as mark.svg, one
 * `fill="currentColor"` ink) rather than the gradient primary mark: the
 * primary mark's gradient stops are set via `var(--mark-top, ...)` CSS
 * custom properties, which resvg's embedded-SVG renderer does not resolve,
 * so it would render as an unreadable near-black shape on the dark canvas.
 * We set `color` on the root <svg> so currentColor resolves to the ink
 * token — the file's own designed color mechanism, no geometry touched.
 */
function loadMarkDataUri(): string {
  if (markDataUriCache) return markDataUriCache;
  const t = getObservatoryDarkTokens();
  const svg = readFileSync(path.join(repoRoot, "public/brand/mark-mono.svg"), "utf8");
  const colored = svg.replace("<svg ", `<svg color="${t["--s2s-ink"]}" `);
  markDataUriCache = `data:image/svg+xml;base64,${Buffer.from(colored).toString("base64")}`;
  return markDataUriCache;
}

let heroDataUriCache: Promise<string> | null = null;

/** The observatory hero photo, re-encoded as JPEG (satori cannot decode webp). */
function loadHeroDataUri(): Promise<string> {
  if (heroDataUriCache) return heroDataUriCache;
  heroDataUriCache = sharp(path.join(repoRoot, "public/images/v2/hero/observatory-1024.webp"))
    .jpeg({ quality: 86 })
    .toBuffer()
    .then((buf) => `data:image/jpeg;base64,${buf.toString("base64")}`);
  return heroDataUriCache;
}

// ---------------------------------------------------------------------------
// Title sizing — step the Newsreader size down for long titles so the
// title never exceeds 3 lines inside the 700px content column. Thresholds
// are a character-count estimate (~13.5px/char at 64px, ~11.5 at 54px,
// ~10px at 46px against a 700px column, 3 lines) — verified visually
// against the built cards, not derived from precise glyph metrics.
// ---------------------------------------------------------------------------

function pickTitleFontSize(title: string): number {
  const len = title.length;
  if (len <= 46) return 64;
  if (len <= 78) return 54;
  return 46;
}

// ---------------------------------------------------------------------------
// Card input / kinds
// ---------------------------------------------------------------------------

export type OgCardKind = "default" | "essay" | "story" | "series";

export interface OgCardInput {
  kind: OgCardKind;
  /** Tracked-caps kicker, e.g. "ESSAY", "BUILD NOTE", "SERIES", or the default tagline. */
  kicker: string;
  title: string;
  /** Pre-formatted meta line, e.g. "April 4, 2026 · 13 min read", "3 parts", or "nickmiethe.com". */
  meta: string;
  /** Bottom-left "nickmiethe.com" wordmark — omitted for the default site card. */
  showFooterUrl: boolean;
}

// ---------------------------------------------------------------------------
// Tree builder
// ---------------------------------------------------------------------------

async function buildTree(input: OgCardInput) {
  const t = getObservatoryDarkTokens();
  const [heroDataUri] = await Promise.all([loadHeroDataUri()]);
  const markDataUri = loadMarkDataUri();
  const titleFontSize = pickTitleFontSize(input.title);

  const veilGradient = `linear-gradient(to right, ${t["--s2s-canvas"]} 0px, ${t["--s2s-canvas"]} 380px, transparent 900px, transparent ${CARD_WIDTH}px)`;

  const heroImage = h("img", {
    src: heroDataUri,
    width: 760,
    height: CARD_HEIGHT,
    style: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "760px",
      height: `${CARD_HEIGHT}px`,
      objectFit: "cover",
      objectPosition: "88% 50%",
    },
  });

  const veil = h("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: `${CARD_WIDTH}px`,
      height: `${CARD_HEIGHT}px`,
      display: "flex",
      backgroundImage: veilGradient,
    },
  });

  const brandRow = h(
    "div",
    { style: { display: "flex", flexDirection: "row", alignItems: "center" } },
    [
      h("img", {
        src: markDataUri,
        width: 34,
        height: 34,
        style: { width: "34px", height: "34px", marginRight: "14px" },
      }),
      h(
        "div",
        { style: { display: "flex", flexDirection: "column" } },
        [
          h(
            "div",
            {
              style: {
                display: "flex",
                fontFamily: "Newsreader",
                fontWeight: 400,
                fontSize: "30px",
                color: t["--s2s-ink"],
                lineHeight: 1,
              },
            },
            "Signal to System"
          ),
          h(
            "div",
            {
              style: {
                display: "flex",
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: "13px",
                letterSpacing: "0.32em",
                color: t["--s2s-ink-muted"],
                marginTop: "6px",
              },
            },
            "BY NICK MIETHE"
          ),
        ]
      ),
    ]
  );

  const kicker = h(
    "div",
    {
      style: {
        display: "flex",
        fontFamily: "Inter",
        fontWeight: 500,
        fontSize: "16px",
        letterSpacing: "0.32em",
        color: t["--s2s-accent"],
        marginTop: "44px",
      },
    },
    input.kicker
  );

  const title = h(
    "div",
    {
      style: {
        display: "flex",
        fontFamily: "Newsreader",
        fontWeight: 400,
        fontSize: `${titleFontSize}px`,
        lineHeight: 1.08,
        color: t["--s2s-ink"],
        marginTop: "18px",
        maxWidth: "700px",
        // satori's line-clamp support: caps the title at 3 lines even if
        // the character-count size estimate above runs long.
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 3,
        overflow: "hidden",
      },
    },
    input.title
  );

  const meta = h(
    "div",
    {
      style: {
        display: "flex",
        fontFamily: "JetBrains Mono",
        fontWeight: 400,
        fontSize: "18px",
        color: t["--s2s-ink-muted"],
        marginTop: "22px",
      },
    },
    input.meta
  );

  const contentColumn = h(
    "div",
    {
      style: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        paddingLeft: "64px",
        paddingTop: "64px",
        width: "700px",
      },
    },
    [brandRow, kicker, title, meta]
  );

  const children: Node[] = [heroImage, veil, contentColumn];

  if (input.showFooterUrl) {
    children.push(
      h(
        "div",
        {
          style: {
            position: "absolute",
            left: "64px",
            bottom: "56px",
            display: "flex",
            fontFamily: "Inter",
            fontWeight: 400,
            fontSize: "16px",
            color: t["--s2s-ink-soft"],
          },
        },
        "nickmiethe.com"
      )
    );
  }

  // Inset frame — drawn last so it sits on top of everything else.
  children.push(
    h("div", {
      style: {
        position: "absolute",
        top: "24px",
        left: "24px",
        width: `${CARD_WIDTH - 48}px`,
        height: `${CARD_HEIGHT - 48}px`,
        border: `1px solid ${t["--s2s-rule-strong"]}`,
        borderRadius: "16px",
        display: "flex",
      },
    })
  );

  return h("div", {
    style: {
      position: "relative",
      display: "flex",
      width: `${CARD_WIDTH}px`,
      height: `${CARD_HEIGHT}px`,
      backgroundColor: t["--s2s-canvas"],
      fontFamily: "Inter",
      overflow: "hidden",
    },
    children,
  });
}

/** Render one 1200x630 "Observatory dark" OG card to a PNG buffer. */
export async function renderOgImage(input: OgCardInput): Promise<Buffer> {
  const tree = await buildTree(input);
  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    fonts: loadFonts(),
  });
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: CARD_WIDTH },
  });
  const pngData = resvg.render();
  return pngData.asPng();
}
