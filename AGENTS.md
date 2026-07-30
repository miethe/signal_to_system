# AGENTS.md

This is the source repository for Signal to System, a technical publication.

## Structure
- Content lives in src/content/ as MDX files with Zod-validated frontmatter
- Site configuration in src/data/
- Astro layouts in src/layouts/
- React islands in src/components/interactive/

## Content Collections
- posts: essays and field notes (src/content/posts/)
- projects: portfolio artifacts (src/content/projects/)
- series: multi-post sequences (src/content/series/)
- stories: automated agentic build notes / dev stories, after-action | feature-story | build-note (src/content/stories/)

## Routes
- /essays/ — posts collection
- /projects/ — projects collection
- /series/ — series collection
- /dev-stories/ — stories collection (automated build notes)
- /systems/ — cross-collection facet (posts + stories) by project/system slug
- /aos/ — cross-collection facet (posts + stories) by AOS subsystem area

## Adding Content
1. Create .mdx file in appropriate src/content/ directory
2. Include required frontmatter per schema in src/content.config.ts
3. Build validates all frontmatter at compile time

## Build
- npm run dev — development server
- npm run build — static build to dist/
- npm run preview — preview build locally
