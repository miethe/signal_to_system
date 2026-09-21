# Evidence and edition components

These content primitives make the status of a claim visible without turning the
surrounding prose into a bold label.

## `Evidence`

`Evidence.astro` accepts a required `kind` plus optional `date` and `href`:

```mdx
<Evidence kind="observed" date="2026-09-17" href="#receipt-17" />
<Evidence kind="proposed" />
```

Valid classes are `observed`, `measured`, `proposed`, `related-work`,
`external`, and `hypothesis`. Use `EvidenceLegend.astro` in a “How to read the
receipts” callout when a post introduces these labels.

Place evidence tags in receipt sections and captions, where readers are
evaluating a claim’s basis. Do not put them inside ordinary narrative prose.

## `Figure`

`Figure.astro` accepts optional `credit` and `creditHref` props. When supplied,
the credit appears on a muted line beneath the caption.

## `EditionBanner`

`EditionBanner.astro` accepts `edition`, `revisedDate`, `note`, and optional
`changelogHref`. It provides the standard info-callout treatment for revised
editions rather than a hand-authored per-post callout.
