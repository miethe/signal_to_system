#!/usr/bin/env bash
# Render the favicon/app-icon PNGs from the hand-authored SVG sources in public/brand/.
# Requires rsvg-convert (brew install librsvg). PNGs are committed; re-run after editing a source SVG.
set -euo pipefail
cd "$(dirname "$0")/../public/brand"
command -v rsvg-convert >/dev/null || { echo "rsvg-convert not found (brew install librsvg)" >&2; exit 1; }
r() { rsvg-convert -w "$2" -h "$2" "$1" -o "$3"; echo "  $3 (${2}px from $1)"; }
r icon-tile-small.svg 16  favicon-16.png
r icon-tile-small.svg 32  favicon-32.png
r icon-tile.svg       180 apple-touch-icon.png
r icon-tile.svg       192 icon-192.png
r icon-tile.svg       512 icon-512.png
r icon-maskable.svg   512 icon-maskable-512.png
