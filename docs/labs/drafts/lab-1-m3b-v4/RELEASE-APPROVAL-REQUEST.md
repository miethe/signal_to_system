# Lab #1 release approval request

**Status:** awaiting a pipeline-generated candidate bundle; no receipt is approved.

The Lab report and companion draft are ready for editorial review. The S2S projection gate approves immutable projection records, not prose files. A complete candidate must contain `manifest.json`, `receipts.json`, `records.json`, and `lab.json`. The release store requires the Lab pipeline to generate these files and prohibits hand-editing them.

There is no candidate bundle for this report in `src/data/labs/releases/`, and this checkout does not expose the Lab release preparation command. As a result, the exact record digests, source references, release identifier, and gate result are unavailable. The request is not ready for Nick's digest-bound approval yet.

`npm run check:projection` passes for the current checked-in release store. Since that store contains no Lab #1 candidate, this result does not evaluate or approve this report.

## Receipt Nick will review

For every candidate record, the gate requires a schema-version `1` release receipt with these fields. This is a field map only, not a valid or approvable receipt until the pipeline supplies the exact values:

```json
{
  "schemaVersion": "1",
  "action": "release",
  "publicId": "<pipeline-generated public id>",
  "kind": "<pipeline-generated projection kind>",
  "version": "<exact candidate version>",
  "digest": "sha256:<digest of exact candidate record>",
  "approver": "human:nick",
  "approvedAt": "<Nick supplies an ISO 8601 timestamp>",
  "sourceRefs": ["<pipeline-generated public source reference>"]
}
```

The receipt must match the record's identity, exact version, digest, and `sourceRefs`. It must cover the Lab investigation, report, each claim, and any released artifact. The gate rejects missing or mismatched receipts. No identity, digest, timestamp, or human approval is guessed here.

## Required handoff

1. Run the Lab release preparation pipeline and stage its complete candidate bundle outside the production release store.
2. Run `npm run check:projection` against the generated candidate through the pipeline's gate path and retain the exact result.
3. Give Nick the candidate release identifier, destination, record digests, public source references, and gate result for approval.
4. Only after approval, add the schema-valid `human:nick` receipts and promote the generated bundle to `src/data/labs/releases/<releaseId>/`.

The prose cites the public aggregate package. The forbidden-token scan receipt is `FORBIDDEN-TOKEN-SCAN.md` in this directory.
