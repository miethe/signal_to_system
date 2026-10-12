# Lab #1 M3b v4 release approval record

**Status:** approved and exported.

- Release id: `lab-m3b-v4-20261009`
- Destination: `/labs/lab-m3b-v4/`
- Export: `src/data/labs/releases/lab-m3b-v4-20261009/`
- Approver: `human:nick`
- Approved at: `2026-10-09T23:37:56Z`

Nick's approval was recorded verbatim as “Approve both (Recommended)” and “Pre-approve a lifecycle-only change (Recommended)”.

## Candidate-to-approved digest proof

The approval step checked each candidate digest against its record, re-minted the record with `lifecycle: approved`, recomputed its digest, and mechanically diffed semantic fields. Both records changed only at `/lifecycle`.

| publicId | approved candidate digest | approved record digest | changed paths |
|---|---|---|---|
| lab-m3b-v4 | sha256:5aeada9ea756d736730140601ab1ab9f0af84cfe834c0df2955550f661970992 | sha256:345d10bb3a2a2e43c2d0b72715e213c4dba02c42a4d4c95d3629e4b7cb928778 | `/lifecycle` |
| lab-m3b-v4-report | sha256:0f065751d6befb5a03f4692ec9efb7e3fdf07cff9ab53304393d33b22e4e85dd | sha256:70f8aaaed5cf9f2c11fd19d35819f5a35110dbad13df7e2a38b8701ddc763d96 | `/lifecycle` |

The private release sidecar keeps both digests, approver, timestamp, quotes, and the field-diff proof. The exported gate receipts bind the approved record digests.

## Projection gate result (verbatim)

```json
{"publishable":[{"publicId":"lab-m3b-v4-report","kind":"lab-report","version":"1.0.0","digest":"sha256:70f8aaaed5cf9f2c11fd19d35819f5a35110dbad13df7e2a38b8701ddc763d96","lifecycle":"approved","sourceRefs":["rf:lab:m3b-v4-preregistration@1","rf:lab:m3b-v4-deviations@1","rf:lab:m3b-v4-verdicts@1","rf:lab:m3b-v4-aggregate-score@1"],"dependencies":["lab-m3b-v4"],"destinations":[],"summary":"H1, H2 and H3 are inconclusive; no layering effect is established."},{"publicId":"lab-m3b-v4","kind":"lab-investigation","version":"1.0.0","digest":"sha256:345d10bb3a2a2e43c2d0b72715e213c4dba02c42a4d4c95d3629e4b7cb928778","lifecycle":"approved","sourceRefs":["rf:lab:m3b-v4-preregistration@1","rf:lab:m3b-v4-deviations@1","rf:lab:m3b-v4-verdicts@1","rf:lab:m3b-v4-aggregate-score@1"],"dependencies":[],"destinations":[],"summary":"Preregistered M3b v4 investigation; public aggregate outputs only."}],"errors":[]}
```
