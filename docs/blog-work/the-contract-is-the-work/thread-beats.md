# The Contract Is the Work: running-thread beats

Running example: the explicitly synthetic checkout-timeout Feature Contract in the essay and its linked companion. Every beat below is illustrative and proposed. None describes an observed execution or successful correction. The overnight nondispatch and five-day unswept-state incidents remain separate empirical exhibits.

## Beats

### `timeout-as-outcome`: The timeout becomes an outcome

The example begins with an intent to reduce checkout-timeout errors for a specific request class to near zero. This gives the work an outcome to pursue rather than a task description that can be satisfied by a plausible report.

- **Establishes:** The contract names an intended outcome and request scope.
- **Does not establish:** That checkout-timeout errors occurred in a real system, or that any reduction was achieved.
- **Sits beside:** the line “Intent: Reduce checkout-timeout errors for a specific request class to near zero.” in the synthetic Feature Contract code block.

### `criteria-make-done-inspectable`: Criteria make done inspectable

The example lists four acceptance criteria: show the failure doesn't recur under the documented reproduction conditions, retain test coverage, trace the fix to a root cause, and document rollback. Each criterion states a condition that could be inspected before acceptance.

- **Establishes:** The sample contract separates acceptance criteria from its broad intent.
- **Does not establish:** That these are sufficient criteria for a real checkout system or that any test was run.
- **Sits beside:** the numbered acceptance-criteria lines in the synthetic Feature Contract code block.

### `claims-bind-to-runs`: Claims bind to failing and passing runs

The evidence obligations request root-cause analysis with failing and passing runs attached, plus independent verification outside the original reproduction environment. The essay's verification stage separately describes checking support, contradiction, and scope.

- **Establishes:** The illustration connects a claim to requested evidence and a verification boundary.
- **Does not establish:** That such runs or verification records exist for this example.
- **Sits beside:** the line “Root-cause analysis, with the failing and passing runs both attached.” in the synthetic code block.

### `flake-needs-amendment`: A flake requires a visible amendment

The essay says specialists may discover that a criterion is impossible, incomplete, or aimed at the wrong mechanism. They may propose an amendment, but the change must be visible and accepted by someone other than the executor. The flake itself comes from the companion: a pre-existing flaky test on the base commit makes criterion 2 ("no reduction in coverage") undecidable as written, so the specialist proposes Amendment 1 and the on-call lead, not the specialist, accepts it.

- **Establishes:** The proposed method treats changed criteria as a visible contract amendment.
- **Does not establish:** That the companion's illustrative amendment has been exercised in a live system.
- **Sits beside:** the line “A strong Feature Contract should stay stable in purpose while permitting controlled refinement.” in the main essay.
- **Grounded in:** the companion's "A visible amendment" section (`src/content/posts/contract-as-spec-worked-example.mdx`, lines 76-99: the flake paragraph, the synthetic Amendment 1 block, and the proposer/accepter separation).

### `lead-accepts-evidence-state`: The lead accepts a stated evidence state

The synthetic contract names the on-call engineering lead as the person who accepts or rejects the completed contract. The essay distinguishes that authority from the verifier's assessment of claims.

- **Establishes:** The illustration names an accepting authority and separates verification from acceptance.
- **Does not establish:** That an on-call lead accepted an actual checkout-timeout change.
- **Sits beside:** the line “Decision authority: the on-call engineering lead accepts or rejects the completed contract.”

### `reuse-remains-unpromoted`: Reuse remains unpromoted

The essay's final maturity stage asks whether an artifact still works when the person who accepted it is out of the loop. The closing argument distinguishes an authorized decision from a reusable capability another team can pick up cold.

- **Establishes:** Reuse is a further obligation beyond acceptance in the proposed lifecycle.
- **Does not establish:** That this example became a reusable capability or that reuse is safe without further evidence.
- **Sits beside:** the line “A verified claim is not yet an authorized decision, and an authorized decision is not yet a reusable capability the next team can pick up cold.”
