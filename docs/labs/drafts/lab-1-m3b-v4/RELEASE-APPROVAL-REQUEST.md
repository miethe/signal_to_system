# Lab #1 M3b v4 release approval request

**Status:** candidate prepared; no approval has been recorded.

- Release id: `lab-m3b-v4-20261009`
- Destination: `/labs/lab-m3b-v4/`
- Candidate bundle: `candidate/lab-m3b-v4-20261009/`

## Candidate records

| publicId | kind | version | sha256 digest | sourceRefs |
|---|---|---|---|---|
| lab-m3b-v4 | lab-investigation | 1.0.0 | sha256:5aeada9ea756d736730140601ab1ab9f0af84cfe834c0df2955550f661970992 | rf:lab:m3b-v4-preregistration@1, rf:lab:m3b-v4-deviations@1, rf:lab:m3b-v4-verdicts@1, rf:lab:m3b-v4-aggregate-score@1 |
| lab-m3b-v4-report | lab-report | 1.0.0 | sha256:0f065751d6befb5a03f4692ec9efb7e3fdf07cff9ab53304393d33b22e4e85dd | rf:lab:m3b-v4-preregistration@1, rf:lab:m3b-v4-deviations@1, rf:lab:m3b-v4-verdicts@1, rf:lab:m3b-v4-aggregate-score@1 |

## Projection gate result (verbatim)

```json
{"publishable":[],"errors":["not-approved:lab-m3b-v4","unapproved:lab-m3b-v4","not-approved:lab-m3b-v4-report","unapproved:lab-m3b-v4-report"]}
```

The gate reports these records as non-publishable because no approval receipts have been supplied.

## Receipt JSON for Nick to complete

Each object below is a receipt template bound to the exact candidate record. Replace only `approvedAt` after Nick decides; no receipt is present in the candidate bundle.

```json
{
  "schemaVersion": "1",
  "action": "release",
  "publicId": "lab-m3b-v4",
  "kind": "lab-investigation",
  "version": "1.0.0",
  "digest": "sha256:5aeada9ea756d736730140601ab1ab9f0af84cfe834c0df2955550f661970992",
  "approver": "human:nick",
  "approvedAt": "<Nick supplies an ISO 8601 timestamp>",
  "sourceRefs": [
    "rf:lab:m3b-v4-preregistration@1",
    "rf:lab:m3b-v4-deviations@1",
    "rf:lab:m3b-v4-verdicts@1",
    "rf:lab:m3b-v4-aggregate-score@1"
  ]
}
```

```json
{
  "schemaVersion": "1",
  "action": "release",
  "publicId": "lab-m3b-v4-report",
  "kind": "lab-report",
  "version": "1.0.0",
  "digest": "sha256:0f065751d6befb5a03f4692ec9efb7e3fdf07cff9ab53304393d33b22e4e85dd",
  "approver": "human:nick",
  "approvedAt": "<Nick supplies an ISO 8601 timestamp>",
  "sourceRefs": [
    "rf:lab:m3b-v4-preregistration@1",
    "rf:lab:m3b-v4-deviations@1",
    "rf:lab:m3b-v4-verdicts@1",
    "rf:lab:m3b-v4-aggregate-score@1"
  ]
}
```
