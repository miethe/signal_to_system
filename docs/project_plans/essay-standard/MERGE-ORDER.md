# Essay standard campaign: merge order and open items for Nick (2026-10-02)

All PRs target the integration branch directly (none is stacked on another PR's branch). Nick merges; nothing is auto-merged.

1. #167 essay standard, voice profile, `check:essay`, `s2s-essay` skill, gap matrix, E5 packet.
2. #168 Registry Wave `[^coverage]` footnote (one token; no `updatedDate` bump, per Nick).
3. #169 E1, #170 E2, #171 E4 polish, any order. Each branch already contains #167's commits; content is identical, so they merge clean after #167.
4. Then node_01M3Z29TDF86PTBMMC60CH16BX: add `check:essay` to `npm run verify`; register `s2s-essay` in SkillMeat enterprise after it reaches main.

## Needs Nick's own words (pointers only)

- E4 "goes through" gated review (normative wording or a receipt): `docs/blog-work/the-contract-is-the-work/polish/review2.md` R2-2.
- E4 dated origin beat: same file, R2-3.
- E4 "As of August 25, 2026, I run..." tense: same file, R2-4; stale-claims row 3a.
- E2 real first-person incident, origin date, external-work account: `docs/blog-work/agentic-operations-flow/polish/review2.md` V2-2, V2-5.
- E1 "correct by construction" boundary: `docs/blog-work/governed-agentic-sdlc-01-productivity-paradox/polish/premise-check.md` PC05; stale-claims P5.
- Stale-claim sidecars: `docs/blog-work/<slug>/polish/stale-claims.md` for the three slugs above.
- E5: the display title is still a proposal (`docs/blog-work/deterministic-envelope/READY-TO-DRAFT.md` section 1).
