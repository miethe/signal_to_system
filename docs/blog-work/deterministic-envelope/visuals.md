# Visual specs — The Deterministic Envelope

Three figure specs, written as prompts for the site's `Figure`/interactive component lane
(`src/components/content/Figure.astro` for static SVG, `src/components/interactive/` for a React
island if the interactivity earns its cost). Matches the Registry Wave essay's pattern of
numbered figures with alt text and caption, not a generic stock diagram.

## Figure 1 — The nested deterministic envelope

**Type:** static SVG (`Figure`), primary hero-candidate image for this essay, same role
`diagram-market-wave.svg` plays for Registry Wave.

**What it shows:** Concentric rings, outside in:
1. Outer ring: **deterministic controls** (labeled: identity, permissions, budgets, schemas,
   policy gates, validators).
2. Middle ring: **bounded interface** (the typed/validated contract the model must answer inside,
   e.g. a schema the model's output must satisfy).
3. Inner core: **probabilistic cognition** (the model itself, drawn smaller and less structured
   than the rings around it, to visually subordinate it rather than center it).

**Why this shape and not a pipeline:** every other figure in the series so far (Registry Wave's
four-stage chain, Contract Is the Work's six-stage maturity ladder) is linear. A nested-ring
figure is the one shape in the set that visually argues "the model is not the main event, the
boundary around it is," which is the whole thesis. Worth the deliberate visual break from the
series pattern.

**Caption draft:** "The model does not get smaller by becoming smarter. It gets safer when less
of the decision is left to it."

**Alt text draft:** "Three concentric rings. Outer ring labeled deterministic controls: identity,
permissions, budgets, schemas, policy gates, validators. Middle ring labeled bounded interface.
Inner core, drawn smaller, labeled probabilistic cognition."

## Figure 2 — The determinism gradient (four zones)

**Type:** static SVG (`Figure`), matching the Registry Wave's `diagram-registry-control-plane.svg`
two-column-comparison pattern, but as a four-zone horizontal gradient instead.

**What it shows:** A horizontal bar split into four zones, left to right:
1. **Hard deterministic** (ordinary software/rules; no model involved)
2. **Bounded probabilistic** (model chooses inside a typed, validated contract)
3. **Governed judgment** (ambiguity needs stronger evidence, independent validation, maybe human
   approval)
4. **Novel exploration** (explicit uncertainty; high human/research involvement)

Each zone gets one real example beneath it, drawn from the essay's own sustained example so the
figure and the prose reinforce each other rather than introducing a fifth, unrelated illustration:
- Zone 1 example: the base-layer sha256 pin (no judgment; either the digest matches or it doesn't).
- Zone 2 example: the sandbox's resource-limit contract (the runner picks the container flags
  within a validated range; the flags themselves are enforced deterministically).
- Zone 3 example: the front-dispatch guard's own dispatch decision once promoted out of shadow
  mode (a judgment call about whether to consolidate remaining work into one leg, subject to
  override).
- Zone 4 example: a genuinely novel incident with no prior playbook, no artifact reference (kept
  abstract; do not invent a specific incident for this zone).

**Caption draft:** "The boundary between zones is a configuration decision, not a measure of how
smart the model is. A smarter model does not automatically earn a wider zone."

**Alt text draft:** "A horizontal bar divided into four zones labeled hard deterministic, bounded
probabilistic, governed judgment, and novel exploration, left to right, each with one real
example underneath."

## Figure 3 — Same envelope, two outcomes (the shadow-mode beat)

**Type:** small interactive component (React island, `client:visible`), the one figure in this
essay worth the interactivity cost, because the entire point is a single toggle changing the
outcome with nothing else changing.

**What it shows:** One dispatch scenario (a generic "leg dispatch" icon/card) feeding into a
single toggle switch labeled **enforcement mode: shadow / deny**. Below the toggle, one outcome
line that updates when the toggle flips:
- Shadow (default, matches current real state): "Allowed. Recorded as `would_deny` in the
  ledger."
- Deny (the not-yet-live state): "Denied. Routing decision returned to the operator."

Everything else on the card (the dispatch inputs, the model, the task) stays visually identical
across both toggle states, to make the point physically obvious: nothing about the work changed,
only the enforcement configuration did.

**Why interactive and not static:** this is the one moment in the essay where the argument is
literally "flip one switch, get a different outcome from identical inputs." A static two-panel
before/after loses the felt sense of "nothing else moved." A toggle earns its build cost here in a
way it would not for the nested-envelope or gradient figures, which are structural, not
state-dependent.

**Caption draft:** "The dispatch, the model, and the task are identical in both states. Only the
enforcement mode changed. That gap between registered and enforced is exactly what a deterministic
envelope closes, one gate at a time."

**Alt text (static fallback for reduced-motion/lite mode):** "A dispatch card shown twice, once
with enforcement mode set to shadow, once set to deny. In shadow mode the outcome reads allowed,
recorded as would-deny. In deny mode the outcome reads denied, routed to the operator. All other
card fields are identical between the two."

**Build note:** honor `$performanceMode`; in `lite` mode, render the static two-state fallback
described above rather than the toggle, per `src/CLAUDE.md`'s interactive-islands rule.

## Not recommended: a fourth figure for the learning loop
The GPT master doc's visual program lists a "cognition-to-infrastructure loop" as its own figure
(V6). Recommend folding this into prose with a simple inline text diagram (matching the arrow-chain
style already used in the master doc itself, e.g. `Novel problem -> probabilistic reasoning ->
validated resolution -> repeated pattern? -> candidate rule -> evaluation -> deterministic fast
path`) rather than a fourth commissioned graphic. Three figures is already dense for a ~3,500-word
essay; a fourth risks the same "too many polished graphics implying too much is shipped" problem
the Registry Wave recommendations flagged (P1, "do not let polished architecture graphics imply
every component is production-complete"). If Nick wants a fourth figure anyway, this is the one to
add second, not first.
