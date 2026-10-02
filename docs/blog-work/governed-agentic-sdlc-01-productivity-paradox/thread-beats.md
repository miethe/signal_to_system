# E1 running thread beats

Running example: the FastAPI 204 response issue reportedly received fixes at API, web, and test layers across three sessions between February and March 2026. The essay does not supply a detailed chronology, so the order below is deliberately not assigned.

## `empty-response` — The empty response

The essay describes a FastAPI 204 No Content response with no body, where calling `response.json()` throws a SyntaxError. This is the issue that anchors the repeated-fix account.

- establishes: The symptom as stated in the essay.
- doesNotEstablish: A session-by-session chronology or independent reproduction by this migration.
- beside: “FastAPI 204 No Content responses have no body, but calling `response.json()` on them throws a SyntaxError.”

## `first-layer-fix` — The first layer fixes it

One session reportedly identified the issue and fixed it in one of the API, web, or test layers. The essay names the three layers but does not say which came first.

- establishes: The essay's report that a layer-specific fix was made.
- doesNotEstablish: Which layer was first, or whether the fix was visible to other sessions.
- beside: “Each agent fixed it in their layer.”

## `rediscovered-fix` — The next session rediscovers it

The essay says separate sessions independently addressed the same issue at three layers, without knowing that a fix already existed elsewhere in the codebase.

- establishes: The reported recurrence across three sessions and layers.
- doesNotEstablish: A verified chronology or a demonstrated cause beyond the essay's account.
- beside: “None of them knew the fix already existed somewhere else in the codebase.”

## `three-fixes-shared-state` — Three fixes reveal missing shared state

The essay interprets the repeated fixes as evidence that knowledge did not carry between the sessions. It says three implementation commits remain, but this migration has not inspected them.

- establishes: The author's interpretation and the existence of cited implementation references in the manuscript.
- doesNotEstablish: That no current mechanism exists anywhere, or a measured rate of repeated work.
- beside: “Three agents, one bug, zero shared memory.”

## `inheritance-obligation` — What the next session must inherit

The close proposes that a future session needs a record of the fix and enough context to recognize where it applies. This is an obligation posed by the essay, not a recorded successful remediation.

- establishes: A proposed question for the next arc essay about durable, routable work state.
- doesNotEstablish: That shared memory has been implemented or that the next session successfully used it.
- beside: “What must survive so the next session can act on it?”
