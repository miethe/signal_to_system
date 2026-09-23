# Shared component family (Writing + Labs)

Designed in M2 for `/writing` and built so M3b Labs reuses them rather than
forking them (docs/design/s2s-v2-visual/labs-storyboard/: "Labs should feel
like a richer research-native sibling of Writing").

| Component | Writing use | Labs reuse (storyboard) |
|---|---|---|
| `CollectionPanel` | format panels on /writing | "All investigations"; report Sources / Figures / Artifacts sections |
| `FeatureCard` | featured piece per format | featured investigation (+ actions slot), investigation grid (`layout="stack"`) |
| `MetaLine` | date · read time | claim / source / figure / artifact counts |
| `EntryRow` | more pieces in a panel | compact claim, source and timeline rows |
| `PathList` | Start here, Reading paths | Start in Labs, Research programs, Explore the research |

Also shared, from M1 `primitives/`: `PageHero`, `FilterToolbar` (Format /
Domain / Program / Sort), `FacetRail` (Popular topics / Popular domains),
`SectionHeading`, `StatTile` (Report resources), `Tabs`, `StateNotice`, and
the reader's `Callout`, `Figure`, `ReadingPathNav`.

All colors are role tokens; no palette literals.
