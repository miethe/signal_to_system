---
edition: september-2026
created: 2026-09-15
post: the-registry-wave-agentic-artifact-supply-chain
status: ready-for-nick-review
---

# Publicization Checklist: September 2026 Edition

## Pre-Launch Verification

### Deep Research Verification (Pending)

All four vendor footnotes require verification before publication. None may appear in outbound copy until confirmed:

- [ ] `[^github]`: GitHub Changelog, [Manage agent skills with GitHub CLI](https://github.blog/changelog/2026-04-16-manage-agent-skills-with-github-cli/). Verify scope of skill discovery, installation, and publishing availability as of September 2026.
- [ ] `[^jfrog]`: JFrog, [Agent Skills Registry](https://jfrog.com/ai-catalog/skills-registry/) and [Skills Repositories](https://docs.jfrog.com/artifactory/docs/skills-repositories). Verify versioning, scanning, signing, and access-control scope.
- [ ] `[^redhat]`: Red Hat, [agentic catalog](https://catalog.redhat.com/en/ai) and [MCP catalog blog post](https://www.redhat.com/en/blog/mcp-catalog-here-discover-deploy-and-connect-red-hat-openshift-ai). Verify deployment/connectivity scope and preview status boundaries.
- [ ] `[^mcp]`: Model Context Protocol, [The MCP Registry](https://modelcontextprotocol.io/registry/about). Verify metadata and discovery scope as of September 2026.

### Em-Dash Compliance

All outbound copy must contain zero em-dashes (replace with commas, semicolons, parentheses, or colons):

- [ ] LinkedIn 7-post thread (linkedin_post_thread_2026-09.md): grep result = **zero**
- [ ] LinkedIn single-post variant: grep result = **zero**
- [ ] Pull-quotes file: grep result = **zero**
- [ ] Main essay (src/content/posts/the-registry-wave-agentic-artifact-supply-chain.mdx): grep result = **zero**

---

## Launch Sequence

### 1. Cross-Link to Sibling Essays

Before publishing, add cross-links from the three sibling essays in the reading path:

| Sibling Essay | Slug | Task |
|---|---|---|
| "The Productivity Paradox" | `governed-agentic-sdlc-01-productivity-paradox` | Add link to Registry Wave in "Next" or related callout |
| "The Work Is a Graph" | `agentic-operations-flow` | Add link to Registry Wave in "Next" or related callout |
| "The Contract Is the Work" | `the-contract-is-the-work` | Add link to Registry Wave in "Prior" or related callout |

**Verify slugs in their actual frontmatter before linking.**

### 2. LinkedIn Publicization

- [ ] Post the 7-post thread to LinkedIn (posted over 1-2 days, one post per ~4 hours)
- [ ] Follow with single-post condensed variant as a long-form comment thread
- [ ] Use pull-quotes file for social-media callouts and follow-up engagement
- [ ] Do NOT include em-dashes in any LinkedIn copy
- [ ] Do NOT include hashtags (editorial voice, not branded)

### 3. Series Page (Blocked)

The reading-path series landing page (Governed Agentic SDLC series home) is not yet live. Once it launches:

- [ ] Confirm the series page URL structure
- [ ] Add Registry Wave essay to the series reading order
- [ ] Update nav/discovery to surface the series

**Note:** Do not assume publication until the series page is confirmed live.

### 4. Related Entries

- [ ] Ensure `relatedSlugs` in essay frontmatter match the three sibling essays
- [ ] Verify backlinks exist in those essays pointing to the Registry Wave
- [ ] Confirm tags in taxonomy are consistent across all four essays

---

## Nick's Review Checklist

Before marking "ready to publish":

- [ ] Nick has reviewed the main essay working copy (`src/content/posts/the-registry-wave-agentic-artifact-supply-chain.mdx`)
- [ ] Nick has approved the LinkedIn thread and pull-quotes
- [ ] Deep Research verification pass confirms all four vendor footnotes
- [ ] Em-dash audit across all files returns zero matches
- [ ] Cross-links to sibling essays are in place
- [ ] Series page readiness is confirmed (or explicitly deferred with target date)

---

## Archive & Reference

**LinkedIn thread locations:**
- 7-post variant: `docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/final/linkedin_post_thread_2026-09.md`
- Pull-quotes: `docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/final/pull-quotes.md`

**Edition info:**
- Published date: September 15, 2026
- Last updated: September 15, 2026
- Status: Draft (pending Deep Research verification + Nick review)

**Notes for future editions:**
- Pull-quotes are lifted verbatim; maintain quote-match accuracy when updating essay
- If essay changes materially, re-run pull-quote extraction
- All outbound variants must pass zero em-dash audit before any launch phase
