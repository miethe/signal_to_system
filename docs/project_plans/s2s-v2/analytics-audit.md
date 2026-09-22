# M0 analytics audit

**Finding:** no analytics collector, consent UI, Firebase configuration, or analytics environment variable is wired in the current repository. `package.json`, source, public assets, and GitHub workflows were inspected; the only outbound browser references are presentation assets such as Google Fonts.

**Decision:** M0 adds no tracker. This preserves the zero-collector baseline and avoids silently creating a second analytics owner. The approved direction for M5 is one GA4 collector with consent, an allowlisted event adapter, no pre-consent queue or identifier store, and no Firebase Storage.

## Operating economics and gate

A static GitHub Pages site has no per-request application service to instrument. Any future collector must document its account owner, consent behavior, retention, allowed event names, vendor cost exposure, and failure behavior before code is merged. Analytics may fail open for reader access, but it must fail closed for event emission without consent. The implementation node remains `node_01M35CKM7HTFJBHHRJTNMZRKZY` (M5); this audit is evidence for that decision, not implementation approval.
