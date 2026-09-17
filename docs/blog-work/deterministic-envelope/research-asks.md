# Research asks — for ChatGPT Pro / Deep Research, ahead of drafting

Each question is bounded and states what a good answer contains, per the dispatch brief's
instruction. Ordered by how early in the outline the answer is needed. None of these require
internal/IBM-sensitive context; all are external prior-art or market-grounding questions safe to
send off-LAN as-is.

## Q1. Prior art on "deterministic envelope" and adjacent terminology
**Question:** Who else, in published research or product documentation (2024-2026), uses
"deterministic envelope," "determinism gradient," "bounded autonomy," "policy envelope," or
functionally equivalent language to describe wrapping deterministic controls around a
probabilistic/LLM-driven core? Include both academic (arXiv, workshop papers) and industry
(vendor docs, engineering blogs) sources.
**A good answer contains:** 3-6 named sources with direct quotes or paraphrases of their framing,
each dated, each with a one-line note on how close the framing is to "wrap deterministic controls
around probabilistic judgment" vs. a looser usage (e.g. "deterministic" used loosely to mean
"repeatable" or "auditable" rather than the stricter software sense). Flag any source using the
exact phrase "deterministic envelope."

## Q2. Graduated autonomy / human-in-the-loop staging models already published
**Question:** What published frameworks (research or industry) stage AI-agent autonomy across
more than two levels (i.e., not just "supervised vs. autonomous"), keyed to something other than
raw task complexity, e.g. evidence quality, reversibility, or verification strength? Include
frameworks from robotics/autonomous-vehicle autonomy levels if the underlying staging logic
transfers.
**A good answer contains:** 3-5 named frameworks, each with its actual stage count and stage
names/criteria, and a one-line note on whether the staging is keyed to model capability, task
risk, evidence/verification state, or something else, so the essay can correctly position its own
four-zone gradient as one instance of a known pattern rather than the first.

## Q3. Policy enforcement in agent gateways and control planes, current state
**Question:** As of September 2026, which agent-gateway or control-plane products (e.g. from
Microsoft, Google, ServiceNow, IBM, or open-source projects) enforce runtime policy on agent tool
calls, and what specifically do they gate: which tools can be invoked, under what data-access
scope, with what approval requirement? Distinguish products that merely log/observe from products
that actually block.
**A good answer contains:** 4-6 named products/projects with a one-line description of what each
one's policy layer actually enforces (not just markets), a direct source link per product, and an
explicit note on which ones are "shadow/observe-only by default" vs. "deny by default," since that
distinction is the essay's own central claim about registered-vs-enforced.

## Q4. Compiling repeated agent decisions into deterministic automation, existing examples
**Question:** Are there published examples (research or production case studies) of a system that
started by using an LLM/agent to resolve a class of decisions, then converted the repeated,
validated resolutions into a deterministic rule, cache, or rule-based system, explicitly to reduce
future inference calls for that decision class? This includes "policy distillation," "cached
decision layers," "rule mining from agent logs," or similarly named techniques.
**A good answer contains:** 2-4 concrete examples with enough detail to cite (what decision class,
what triggered the conversion to a rule, what evidence showed the rule was safe to trust), plus
whatever measurable metric each example used to decide the compiled rule was still correct
(accuracy delta, override rate, drift detection), since the essay proposes exactly this kind of
metric as a hypothesis and needs to know if anyone has already operationalized one.

## Q5. Model-provider statements on inference determinism and reproducibility
**Question:** What do the major LLM API providers (Anthropic, OpenAI, Google) currently state,
in their own documentation, about whether fixed sampling parameters (temperature=0, a fixed seed)
guarantee reproducible output? Include any stated caveats about non-determinism at the
infrastructure level (batching, hardware, MoE routing) even under fixed parameters.
**A good answer contains:** a direct quote or close paraphrase from each provider's own docs,
dated, establishing that "pinning the inputs" is not equivalent to "guaranteeing the output," which
is the essay's foundational claim in its opening section and needs a primary-source citation
rather than an assumed-true statement.

## Q6. SAP-to-Oracle-and-Confluent-style architecture pattern, external validation
**Question:** Outside of any single vendor's marketing, is there a generally-recognized enterprise
architecture pattern that reads as: incoming data validated against a schema/contract, a
deterministic transformation or rule applied for known cases, and an LLM or human-in-the-loop
process invoked only for unknown/exception cases, with the resolution of exceptions feeding back
into the rule set? Name the pattern if one already has a name (e.g. "exception-based automation,"
"straight-through processing with exception queues").
**A good answer contains:** the pattern's name if one exists, 2-3 sources describing it (pre-dating
or independent of the agentic-AI wave, since this pattern likely predates LLMs in classic
straight-through-processing/RPA contexts), and a note on how directly it maps to this essay's
learning loop (novel case -> resolution -> evidence -> rule) so the essay can cite it as prior art
for the *pattern* while still claiming the *agentic* application as the newer piece.

## Market moves (folded into Q3, not a separate research ask)
The dispatch brief also asked for "market moves" coverage; Q3 already covers the control-plane
angle. If a dedicated pass is wanted separately, narrow it to: any named product announcement
(2026, not earlier) specifically framing itself around "governed autonomy," "policy-bounded
agents," or "deterministic guardrails for AI agents," since that is the closest existing market
language to this essay's own framing and the essay should acknowledge it by name if it exists.
