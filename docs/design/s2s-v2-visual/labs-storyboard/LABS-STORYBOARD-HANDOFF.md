# Signal to System — Labs Storyboard Handoff

This package contains the new Labs-focused storyboard mockups generated after the main build handoff. It is intended to accompany the prior implementation handoff and provide direct visual guidance for Labs information architecture, page hierarchy, subpages, and reusable components.

## How this package should be used

1. Treat the **prior build handoff** as the implementation contract and system-level specification.
2. Treat this package as the **visual companion** for the Labs section in particular.
3. Use the images here to align on:
   - the Labs homepage shell and modules
   - the structure of an investigation / report page
   - the shape of evidence, claims, sources, figures, and artifact subpages
   - the role of research programs
   - how shared components can be reused across Labs and Writing

## Core design guidance

- **Homogeneity with Essays/Writing:** use the same component family where possible (cards, metadata rows, figure cards, source cards, artifact cards, sidenav modules, section headers, CTA styles). Labs should feel like a richer research-native sibling of Writing, not a different product.
- **Report page as the primary output:** the investigation report should be the canonical object in Labs, with subpages or sectional views for claims, evidence, sources, figures, artifacts, methods, and timeline.
- **Cross-domain identity:** visibly express polymathic, cross-domain synthesis. The “domain constellation” motif is the preferred pattern for showing blended domains such as cognitive science, game theory, religion, design, systems thinking, public policy, evolutionary biology, and more.
- **Inspectability over ornament:** every visual flourish should support navigation, context, or meaning. The site should feel elevated and distinctive, but still operationally useful.
- **Progressive disclosure:** the homepage introduces investigations and programs; the report page summarizes the work; the subpages expose the full record.

## Included visuals

### Labs homepage / investigations index
- **File:** `images/signal_to_system_labs_investigations.webp`
- **Dimensions:** 1448x1086
- **What it shows:** High-level Labs landing page. Shows the Labs hero, filter/search controls, featured investigation, domain constellation, research programs sidebar, popular domains, and the “Inside an investigation” component strip.
- **How to use it:** Use as the canonical direction for the Labs homepage. This establishes the shell, IA, primary CTA structure, filter bar, sidebar modules, and the first expression of cross-domain synthesis via the domain constellation card.

### Investigation report overview page — Urban Heat, Mapped
- **File:** `images/urban_heat_mapped_research_dashboard.webp`
- **Dimensions:** 1448x1086
- **What it shows:** Primary report page / overview state for a single investigation. Shows executive summary, key findings cards, featured figure, evidence-in-context panel, investigation metadata sidebar, research program link, domain constellation, and “Explore the research” section links.
- **How to use it:** Use as the main blueprint for a report page. This should be treated as the core output page of Labs — a full investigation record rather than a simple article.

### Claims & Evidence page / subpage
- **File:** `images/urban_heat_claims_evidence_dashboard.webp`
- **Dimensions:** 1448x1086
- **What it shows:** Detailed evidence navigation view for a report. Shows claim cards, confidence/status labels, structured evidence items, claim network graph, key domains list, and related materials summary.
- **How to use it:** Use as the design reference for claim-first inspection. This is the clearest expression of how claims, evidence, figures, sources, and notebooks can be connected and inspected.

### Sources, Figures & Artifacts page / subpage
- **File:** `images/sources_figures_artifacts_dashboard.webp`
- **Dimensions:** 1448x1086
- **What it shows:** Resource-centric subpage for a report. Shows source cards, figure cards, artifact cards, filters, report-resource counts, reuse-in-essays panel, and a research-lineage / provenance strip.
- **How to use it:** Use as the reference for the resource browser within a report. This also demonstrates the bridge between Labs and Essays by explicitly supporting “reuse in essays.”

### Research program page — Trustworthy Agentic Systems
- **File:** `images/signal_to_system_trustworthy_agentic_systems.webp`
- **Dimensions:** 1448x1086
- **What it shows:** Program-level landing page connecting multiple investigations, essays, projects, artifacts, timeline, mission/scope, methods, key questions, and related programs. Includes a cross-domain constellation around the program.
- **How to use it:** Use as the pattern for Research Program pages. This is how Labs should expose long-running inquiry tracks that span domains and connect multiple content types.

### Labs journey / component storyboard
- **File:** `images/from_questions_to_a_deeper_world.webp`
- **Dimensions:** 1448x1086
- **What it shows:** Storyboard view showing the user flow from Labs homepage → investigation page → report page → deeper exploration, plus the set of reusable subpages and the shared component gallery.
- **How to use it:** Use as the architectural/UX map for Labs. This explains how the pages relate to one another and how the component system is shared between Labs and Writing.

## Recommended implementation mapping

| Visual | Route / feature it should inform |
|---|---|
| Labs homepage / investigations index | `/labs/` or equivalent main Labs landing page |
| Investigation report overview page | `/labs/[slug]/` canonical report route |
| Claims & Evidence page | `/labs/[slug]/claims/` or tab state within the report |
| Sources, Figures & Artifacts page | `/labs/[slug]/resources/` or split subroutes such as `/sources`, `/figures`, `/artifacts` |
| Research program page | `/labs/programs/[program-slug]/` |
| Labs journey / component storyboard | internal design and implementation guide for page relationships and reusable components |

## Notes for agents

- Preserve the shared site shell used in the earlier mockups: global nav, search, dark observatory aesthetic, and consistent typography.
- Keep the **domain constellation** pattern; it is one of the most distinctive ways to show cross-disciplinary synthesis without becoming gimmicky.
- The report page should support both **narrative reading** and **structured inspection**.
- The subpages/components should be reusable in Writing wherever it makes sense, especially for figures, citations, evidence callouts, and linked source records.
- This package is mockup guidance, not a pixel-perfect final spec. Agents should refine spacing, component states, responsiveness, and accessibility during implementation.
