# Outline — The Deterministic Envelope

Each section names the receipt(s) it leans on (see `receipt-rail.md` for the full table) and the
external prior art it should cite or acknowledge (marked `to-verify` where the exact source needs
a fresh primary-source check before publication, per the Registry Wave precedent of stale citations).

## 1. Open on a control that lied (no taxonomy yet)
- Hook: a governance mechanism that existed, was correctly named, and still didn't catch what it
  was built to catch, because it watched the wrong signal.
- Receipt: the overnight-loop token-budget gate reporting `used=0` across ~26h of real 26.56M
  input token traffic (195:1 ratio). Strip the loop's proper name and any dollar/vendor figures
  per the method-only flag; describe it generically ("an autonomous overnight loop").
- Land the reframe: this is not a story about a bad control. It's a story about where determinism
  was assumed and wasn't actually present.
- To-verify: none (fully internal receipt, dated, re-derivable).

## 2. Why "make AI deterministic" is the wrong goal
- State plainly: temperature-zero, seeded sampling, and prompt pinning reduce variance; they do
  not make a model's output a function you can prove correct the way a hash function is.
- Reframe the goal: not a deterministic model, a deterministic *boundary* around a probabilistic
  core.
- To-verify: one external citation on why fixed sampling parameters don't guarantee reproducible
  model output at the API/inference-stack level (model-provider docs on determinism caveats,
  e.g. OpenAI/Anthropic's own stated non-guarantees around seed/temperature) — `to-verify`.

## 3. The deterministic envelope, defined
- Definition, stated once, clean: the ordinary software controls (identity, permissions, budgets,
  schemas, validators, policy gates) wrapped around a probabilistic core, so the model's freedom
  is scoped to the part of the decision that actually needs judgment.
- Introduce `<Term id="deterministic-envelope">` here.
- Receipt: the leg-dispatch base-layer sha256 pin (`infra/dispatch/leg`) as the simplest possible
  instance of the envelope, one deterministic fact (which bytes ran) wrapped around the executor.
- To-verify: none (internal receipt).

## 4. The determinism gradient
- Four zones: hard deterministic (ordinary software/rules) / bounded probabilistic (model chooses
  inside a typed, validated contract) / governed judgment (ambiguity needs stronger evidence,
  independent validation, maybe human approval) / novel exploration (explicit uncertainty, high
  human/research involvement).
- Introduce `<Term id="determinism-gradient">` here.
- Key move: the boundary between zones is a property of the *system's configuration*, not a
  property of the model's intelligence. A smarter model does not automatically deserve a wider
  zone.
- To-verify: acknowledge adjacent published framings (staged autonomy ladders, graduated
  human-in-the-loop models already in market/research use) without claiming priority —
  `to-verify` for 2-3 current examples (see `research-asks.md` Q2).

## 5. Registered is not enforced (the second "lied to us" instance)
- Receipt: an artifact-registration rule document stating, in its own text, that its fleet-wide
  compliance-scan clause is "target state," not built. Framed positively: a system disclosing its
  own gap in writing is a better receipt than a system that got caught by someone else.
- Second receipt, shorter mention: a front-dispatch guard that is fully wired and firing in
  observe-only mode (nothing blocked yet), bridging into section 6's sustained example.
- To-verify: none (internal receipts, both dated and re-derivable).

## 6. The sustained example: same envelope, two outcomes
- Walk the full leg-dispatch pipeline in order (see `post-spec.md` for the five-step version):
  1. pinned base layer (sha256, refused if stale)
  2. sandboxed execution primitive, tested against five explicit contracts on the real node
     (mount, UID, network, resource, cleanup), not assumed from a config file
  3. the probabilistic core doing the actual judgment inside that envelope
  4. the observe-only policy gate: identical dispatch, allowed today, would be denied once the
     enforcement flag flips, no change to the model or the task
- This section carries the essay's proof weight; keep every claim inside it traceable to the
  `m3-1-sandbox-probe.md` report and the guard's own shadow-mode status, both dated 2026-09.
- Explicit caveat sentence required here: the sandbox-probe report lives on an unmerged branch as
  of this writing; state the branch/date, not that it is shipped production behavior yet.
- To-verify: none (internal receipts); this section is receipts-only by design, no external
  citation needed.

## 7. The learning loop: from cognition to infrastructure
- Loop: novel problem -> probabilistic resolution -> evidence -> repeated pattern? -> candidate
  rule/artifact -> evaluation + approval -> governed deterministic fast path.
- Ground it in the same sustained example: the base-layer pin, the sandbox contracts, and the
  guard's rule set all started as one-off judgment calls that got resolved once and then written
  down as checks that no longer need a model to re-decide.
- State the proposed (not yet measured) metric explicitly as a hypothesis: what fraction of
  previously cognitive work has been safely compiled into deterministic execution. Label it
  `[Proposed]`, not `[Measured]`.
- To-verify: 1-2 external examples of "compile the repeated case away" already happening in
  production ML/agent systems (cached-decision layers, policy distillation, rule-mining from
  agent logs) — `to-verify`, see `research-asks.md` Q4.

## 8. The four non-equivalences, reframed for execution
- Restate the Registry Wave callout, but aimed at execution rather than artifacts: authenticity
  is not safety; authorization is not correctness; traceability is not causal attribution; pinned
  inputs do not make probabilistic reasoning deterministic (this essay's own precursor claim,
  carried forward explicitly).
- Use a `<Callout>` matching the sibling essay's non-equivalence pattern.
- To-verify: none (internally authored framing, already published once in Registry Wave; this
  section cites that essay, not new external sources).

## 9. What this claims and what it doesn't (novelty posture)
- One paragraph, direct: does not claim to have coined "deterministic envelope" or "determinism
  gradient"; near-identical language exists in data contracts, agent-gateway policy enforcement,
  and hybrid deterministic-agent workflow research. The contribution claimed is the integration
  and the receipted lab-scale learning loop, not the primitives.
- To-verify: 2-3 named external systems/papers using adjacent terminology, for the "related work"
  acknowledgment — `to-verify`, see `research-asks.md` Q1 and Q3.

## 10. Close: what shrinks, not what grows
- Land on the reframe from the thesis: the measure of a mature agentic system is not how much
  autonomy the model has earned; it's how much of the organization's routine cognition has been
  safely compiled away, leaving the model's judgment for what's actually still novel.
- One open question to the reader, matching sibling-essay closing convention (Registry Wave's
  "what breaks first," Contract Is the Work's "who pays").

## Section-to-receipt cross-reference (quick check before drafting)
| Section | Primary receipt | Status |
|---|---|---|
| 1 | Token-budget gate blind spot (2026-09-09) | public/method-only, strip $ figures |
| 3 | Base-layer sha256 pin (`infra/dispatch/leg`) | public, method-only (strip path if needed) |
| 5 | Artifact-registration self-declared gap (2026-09-10) | method-only |
| 5, 6 | Front-dispatch guard, shadow mode | method-only |
| 6 | Sandbox probe contracts (2026-09-15) | method-only, unmerged branch caveat required |
| 8 | Four non-equivalences | already public (Registry Wave) |
