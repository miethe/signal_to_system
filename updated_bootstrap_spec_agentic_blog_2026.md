# Updated Bootstrap Spec: 2026 Professional Technical Blog (Astro)

## 1. Project Overview

### Objective
Bootstrap a statically generated, professional technical blog and portfolio using Astro for a new 2026 publication focused on:
- AI agents
- agentic SDLC
- technical leadership / CTO-level thinking
- architecture and platform engineering
- selected side projects, artifacts, and portfolio work

The site must balance three roles at once:
1. **Publication** — durable essays, field notes, frameworks, and series
2. **Professional surface** — credible enough to link internally, externally, and on company-adjacent pages
3. **Portfolio / artifact hub** — selected projects, talks, components, and links to other sites and initiatives

### Deployment Target
- Static deployment via **GitHub Pages** initially
- Custom domain support should be first-class

### Reference Material
- A functional, single-file React prototype (`App.jsx`) contains desired UI components, styling, layout, and interactive logic.
- This Astro implementation should preserve those strengths while expanding the site into a complete publication system.

### Key Positioning Constraint
This site is **not** a generic blog and **not** a pure portfolio. It should behave like a **technical publication for the agentic era**, authored by a practicing technical executive / builder.

---

## 2. Product Goals

### Primary Goals
- Publish long-form, high-signal technical writing
- Support topic-based exploration across major themes
- Showcase selected projects and artifacts in a professional way
- Create a credible author platform for technical thought leadership
- Keep content authoring Markdown/MDX-first and Git-friendly
- Model strong machine-readable structure for both humans and AI agents

### Non-Goals
- No CMS-heavy or database-backed editorial system at launch
- No comments system at launch
- No migration tooling for legacy blog posts
- No requirement to host unrelated hobby blog content here
- No need for e-commerce, community features, or multi-author workflows at launch

---

## 3. Brand & Site Identity Assumptions

### Brand Assumption
The implementation must remain flexible enough to support either:
- a **personal domain + publication title** model, or
- a **single publication brand/domain** model

Do **not** hardcode branding assumptions deeply into information architecture. Titles, subtitles, nav labels, and footer metadata should be centralized in a configurable site config.

### Publication Identity
This site should present as:
- modern
- technical
- executive-capable
- reflective but grounded
- systems-oriented
- high-signal, low-hype

### Professional Boundary
The site represents the author’s own views and work. It should be compatible with professional use but not read like a corporate publication.

---

## 4. Technology Stack

- **Framework:** Astro (latest stable)
- **UI Integrations:** React (`@astrojs/react`)
- **Content:** MDX (`@astrojs/mdx`) with Astro Content Collections
- **Styling:** Tailwind CSS (`@astrojs/tailwind`)
- **Icons:** `lucide-react`
- **State Management (Island-to-Island):** Nano Stores (`nanostores`, `@nanostores/react`)
- **Content Validation:** Zod via Astro Content Collections
- **Syntax Highlighting:** Astro-native or Shiki-compatible approach
- **Feed / Metadata:** Astro RSS, sitemap support, Open Graph generation
- **Search:** lightweight client-side search or prebuilt static index

### Optional but Recommended Enhancements
- Mermaid or compatible diagram rendering for technical posts
- automated Open Graph image generation
- content linting / frontmatter lint checks
- link checking in CI
- accessibility audit in CI where practical

---

## 5. Architectural Principles

1. **Static-first** — default to static pages and generated content wherever possible
2. **Interactive only when justified** — use React islands surgically for diagrams, demos, and interactive visualizations
3. **Content-first** — content collections and taxonomy should drive most rendering decisions
4. **Machine-readable by design** — pages, metadata, and publication structure should be legible to AI agents
5. **Low-friction authoring** — adding a new essay, series entry, or project should be simple and repeatable
6. **Performance-aware** — rich mode is allowed; heavy interaction must degrade gracefully
7. **Portfolio-integrated** — support a professional ecosystem of linked sites, projects, and artifacts

---

## 6. Site Content Model

The site must support the following content surfaces:

### 6.1 Essays
Longer, durable, high-signal posts. These are the flagship publication artifacts.

### 6.2 Field Notes
Shorter, polished observations, experiments, or directional notes.

### 6.3 Series
Curated multi-post sequences around a common theme, such as Agentic SDLC, Practical CTO, or Canonical CS for the Agentic Era.

### 6.4 Projects / Artifacts
Professional portfolio entries for apps, architecture concepts, decks, component libraries, diagrams, internal-style concept writeups, or build experiments.

### 6.5 Pages
Static pages such as:
- About
- Start Here
- Portfolio
- Other Sites
- Now (optional)
- Talks / Reading (optional future expansion)

### 6.6 Topic Hubs
Generated index pages for major categories such as:
- AI Agents
- Agentic SDLC
- Technical Leadership
- CTO
- Architecture
- Platform Engineering
- Projects

---

## 7. Directory Structure

Agents must construct the project using the following Astro-oriented architecture:

```text
/
├── public/
│   ├── brand/                # logos, avatars, favicons, brand assets
│   ├── og/                   # generated or static open graph images
│   ├── assets/               # raw static assets, PDFs, downloads if needed
│   ├── llms.txt              # machine-readable site guidance
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── global/           # Navigation, Footer, ThemeToggle, ModeToggle, SearchBox
│   │   ├── interactive/      # InteractiveNetwork, AgenticDiagram, ContextVisualizer, DeckViewer, ComponentDemo
│   │   ├── content/          # Prose helpers, Callouts, TagList, RelatedContent, ReadingPathNav
│   │   ├── cards/            # EssayCard, ProjectCard, SeriesCard, SiteLinkCard
│   │   └── ui/               # buttons, badges, pills, separators, metadata rows
│   ├── content/
│   │   ├── config.ts         # Astro content collection schemas
│   │   ├── posts/            # essays and field notes (.mdx)
│   │   ├── projects/         # portfolio / artifacts (.mdx)
│   │   ├── series/           # series definition files (.md or .json/.ts-backed)
│   │   └── pages/            # optional content-backed static pages
│   ├── data/
│   │   ├── site.ts           # title, subtitle, nav, footer config, social links
│   │   ├── taxonomy.ts       # categories, topic hubs, allowed tag registry
│   │   ├── external-sites.ts # other blogs / portfolio properties / links
│   │   └── portfolio.ts      # selected links, offerings, component libs, profiles
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── PostLayout.astro
│   │   ├── ProjectLayout.astro
│   │   ├── SeriesLayout.astro
│   │   └── PageLayout.astro
│   ├── lib/
│   │   ├── content.ts        # collection helpers, sorting, related-content resolution
│   │   ├── seo.ts            # metadata helpers, canonical URL logic, JSON-LD
│   │   ├── search.ts         # search index generation helpers
│   │   ├── tags.ts           # tag normalization / validation helpers
│   │   └── reading-paths.ts  # series and topic traversal helpers
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── start-here.astro
│   │   ├── portfolio.astro
│   │   ├── other-sites.astro
│   │   ├── tags/
│   │   │   ├── index.astro
│   │   │   └── [tag].astro
│   │   ├── topics/
│   │   │   ├── [topic].astro
│   │   ├── essays/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── projects/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── series/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── rss.xml.ts
│   │   ├── sitemap.xml.ts
│   │   ├── search.json.ts    # optional prebuilt search index
│   │   └── 404.astro
│   ├── store/
│   │   └── themeStore.ts
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tailwind.config.cjs
├── package.json
└── README.md
```

---

## 8. Global State Architecture

Because Astro uses an Islands architecture, React components do not share a single React root. To allow the navbar and page controls to toggle modes that affect interactive components and site presentation, use **Nano Stores**.

### Required Store
Create `src/store/themeStore.ts` with:
- `export const $theme = atom<'light' | 'dark'>('light')`
- `export const $performanceMode = atom<'rich' | 'lite'>('rich')`

### Optional Future Store State
Design in a way that can later support:
- reduced motion preference override
- search dialog state
- table-of-contents visibility

### Persistence Requirements
- Persist theme and performance mode to `localStorage`
- Respect system theme preference on first load if no user preference exists
- Prevent flash-of-incorrect-theme where practical

---

## 9. Content Collections & Metadata Schema

Define strict Zod schemas in `src/content/config.ts`.

The site should support **three primary collections at launch**:
1. `posts`
2. `projects`
3. `series`

Optional future expansion can add `talks`, `reading`, or content-backed static pages.

### 9.1 Collection: `posts`
Use one collection for both essays and field notes, differentiated by metadata.

Required fields:
- `title` (string)
- `slug` (string)
- `excerpt` (string)
- `date` (date)
- `readTime` (string)
- `contentType` (enum: `essay` | `field-note`)
- `category` (enum: `AI Agents` | `Agentic SDLC` | `Technical Leadership` | `CTO` | `Architecture` | `Platform Engineering` | `Projects`)
- `tags` (array of strings)
- `status` (enum: `draft` | `published` | `evergreen`)

Optional fields:
- `updatedDate` (date)
- `series` (string)
- `seriesOrder` (number)
- `featured` (boolean)
- `heroImage` (string)
- `seoTitle` (string)
- `seoDescription` (string)
- `canonicalUrl` (string)
- `interactiveElement` (string)
- `relatedSlugs` (array of strings)
- `whyItMatters` (string)
- `leaderTakeaway` (string)
- `disclaimer` (string)
- `draftNotes` (string, optional but ignored in production rendering)

### 9.2 Collection: `projects`
For selected portfolio entries and artifacts.

Required fields:
- `title` (string)
- `slug` (string)
- `excerpt` (string)
- `date` (date)
- `type` (enum: `Deck` | `Component` | `Architecture` | `App` | `Framework` | `Library` | `Artifact`)
- `tags` (array of strings)
- `visibility` (enum: `public` | `summary-only`)

Optional fields:
- `featured` (boolean)
- `heroImage` (string)
- `interactiveElement` (string)
- `repoUrl` (string)
- `artifactUrl` (string)
- `siteUrl` (string)
- `caseStudy` (boolean)
- `engagementType` (enum: `prototype` | `concept` | `library` | `internal-style artifact` | `public artifact`)
- `relatedSlugs` (array of strings)
- `seoTitle` (string)
- `seoDescription` (string)

### 9.3 Collection: `series`
For publication-level organization.

Required fields:
- `title` (string)
- `slug` (string)
- `excerpt` (string)
- `status` (enum: `active` | `planned` | `complete`)

Optional fields:
- `heroImage` (string)
- `featured` (boolean)
- `topic` (string)
- `recommendedOrder` (array of strings)
- `seoTitle` (string)
- `seoDescription` (string)

---

## 10. Categories, Tags, and Taxonomy Strategy

### Category Strategy
Use a **small, durable** category set. Categories should represent high-level lanes, not ephemeral topics.

Allowed categories:
- AI Agents
- Agentic SDLC
- Technical Leadership
- CTO
- Architecture
- Platform Engineering
- Projects

### Tag Strategy
Yes, include tags — but keep them controlled.

Use tags for:
- tactical discoverability
- cross-cutting topics that span categories
- search and filtering support
- related-content computation

Do **not** let tags become uncontrolled tag soup.

### Recommended Tag Policy
- maintain a registry in `src/data/taxonomy.ts`
- normalize slug casing and display labels
- prefer 3–6 tags per post/page/project
- only create tags that are likely to recur
- suppress or redirect ultra-low-value one-off tags later if needed

### Example Tag Families
Technical topics:
- repo design
- context engineering
- prompt engineering
- evaluation
- human-ai workflow
- internal developer platform
- architecture decision records
- delivery systems
- governance
- OpenShift
- Kubernetes
- platform strategy

Leadership / strategic topics:
- operating model
- technical leadership
- organizational design
- consulting
- systems thinking
- decision-making

Artifact / build topics:
- React
- Astro
- MDX
- component library
- design system
- architecture diagram
- prototype

### Tag Pages
Generate static tag pages at `/tags/[tag]` showing:
- tag description if available
- matching essays
- matching projects
- related tags

### Topic Hubs vs Tags
- **Topics / categories** are primary navigation and durable landing pages
- **Tags** are secondary discovery tools and should not dominate the main navigation

---

## 11. Site Navigation & Information Architecture

### Primary Navigation
- Home
- Essays
- Series
- Projects
- Portfolio
- Other Sites
- About

### Secondary / Contextual Navigation
- Start Here
- Topic hubs
- Tag pages
- RSS

### Homepage Structure
1. Hero / publication framing
2. Short positioning statement
3. Featured essay(s)
4. Active series block
5. Featured projects / artifacts
6. Topic hub links
7. Short author credibility block
8. Link to portfolio / other sites

### Required Pages
- `/about`
- `/start-here`
- `/portfolio`
- `/other-sites`
- `/essays`
- `/projects`
- `/series`

### Portfolio Page
This page should aggregate:
- selected projects
- professional offerings / areas of focus
- component library links such as `@miethe/ui` when available
- GitHub or other public artifacts if desired
- talks / decks / downloadable assets later if added

### Other Sites Page
This page should link to:
- other blogs
- legacy sites
- side-project properties
- external publications or profiles

This allows the new blog to remain focused while still acting as the front door to a broader ecosystem.

---

## 12. Layout & Rendering Requirements

### BaseLayout
Must:
- handle document shell and metadata
- support light/dark theme
- include global navigation and footer
- inject canonical tags, Open Graph tags, and JSON-LD where applicable
- support a max-width content container with good reading ergonomics

### PostLayout
Must support:
- title
- subhead / excerpt
- publish date and updated date
- reading time
- category + tags
- optional why-it-matters callout
- optional leader takeaway callout
- table of contents if headings warrant it
- related content block
- previous / next in series when applicable

### ProjectLayout
Must support:
- title, excerpt, date, type
- tags
- prominent artifact/demo region above or near the fold
- links to repo/site/artifact where available
- summary-only mode for non-public artifacts
- related essays or framework posts

### SeriesLayout
Must support:
- series framing text
- status badge (active/planned/complete)
- recommended reading order
- list of entries with progress / ordering

### PageLayout
For About, Portfolio, Other Sites, Start Here, etc.

---

## 13. Interactive Components & Island Strategy

The site should preserve the strengths of the original React prototype while keeping interactive behavior controlled.

### Required Interactive Components
- `InteractiveNetwork`
- `AgenticDiagram`
- `ContextVisualizer`
- `DeckViewer`
- `ComponentDemo`

### Rules
- interactive islands should only hydrate where they provide real value
- use `client:idle`, `client:visible`, or similar strategies conservatively
- do not block core comprehension on hydration
- every interactive component must have a static or low-cost fallback

### Homepage Hero
- preserve the prototype’s interactive visual identity where feasible
- ensure static textual content stands on its own
- canvas/visual layer must be optional enhancement, not critical path

---

## 14. Lite Mode / Performance Mode

All heavy interactive components must honor `$performanceMode`.

### If mode is `lite`
- `InteractiveNetwork`: render a static gradient / SVG / low-cost visual fallback
- `DeckViewer`: reduce or eliminate animations and heavy shadows
- `ComponentDemo`: reduce motion and expensive UI effects
- `AgenticDiagram` and `ContextVisualizer`: disable mouse tracking, animation loops, or other expensive behaviors

### Performance Principle
Users should be able to understand and navigate the site fully in lite mode.

---

## 15. Search & Discovery

### Search Approach
Use a lightweight static-search approach at launch.

Recommended options:
- prebuilt JSON search index exposed via `/search.json`
- client-side search box over title, excerpt, category, tags, and optionally body summaries

### Search Scope
Include:
- essays / field notes
- projects
- series
- optionally static pages like Start Here or About

### Related Content
Implement a helper that scores related content by:
- shared category
- shared tags
- shared series
- manually declared `relatedSlugs`

Display related content on posts and projects.

---

## 16. SEO, Metadata, and Distribution

This site must include strong metadata support from the beginning.

### Required
- `sitemap.xml`
- RSS feed
- canonical URLs
- Open Graph / Twitter card metadata
- page-level `title` and `description`
- article metadata for posts
- JSON-LD for articles and profile pages where appropriate

### Recommended
- generated OG images for major essays and series
- clear title templates
- robots.txt
- 404 page

### Content Hygiene
- every published post should have SEO title and description defaults if not manually specified
- tags should not replace good titles/excerpts
- series and topic hubs should have metadata too

---

## 17. AI-Native Publishing Surfaces

Because the site focuses on AI agents and agentic software delivery, it should also expose machine-readable surfaces.

### Required
- `public/llms.txt`
- optionally `AGENTS.md` at repo root
- strong structured frontmatter on all content

### Recommended
- concise summaries at top of long posts where appropriate
- clean semantic headings
- linkable sections
- machine-readable topic registry in data files

### Principle
The site should be easy for both humans and AI systems to parse, navigate, and summarize.

---

## 18. Content Authoring Rules

### Authoring Format
- Markdown / MDX first
- frontmatter-driven metadata
- support embedded diagrams/components where appropriate

### Default Post Pattern
A typical essay should support:
1. title
2. excerpt or one-line framing
3. opening claim / tension
4. context
5. core argument or framework
6. examples / implications
7. leader takeaway
8. closing synthesis

### Publishing Checklist
Every published essay should have:
- strong title
- excerpt
- date
- read time
- category
- 3–6 controlled tags
- clear thesis
- at least one practical implication
- related content block
- complete SEO metadata or defaults

### Field Notes
Field notes may be shorter but should still be polished and discoverable.

---

## 19. Professional / Legal Boundary Guidance

Add a configurable footer disclaimer or page-level note when needed.

### Policy
- views are the author’s own
- no confidential or customer-sensitive detail
- no implication of official company publication
- side projects and professional experience should be framed through public-safe lessons and patterns

This should be implementable as a site-wide default plus page-specific override.

---

## 20. Accessibility Requirements

### Required
- semantic HTML
- keyboard-navigable nav and search
- accessible labels for controls
- sufficient contrast in both themes
- reduced-motion friendliness
- headings in logical order
- link text should be descriptive

### For Interactive Components
- fallback text or noninteractive equivalent
- no hover-only critical interactions
- no inaccessible canvas-only meaning

---

## 21. Configuration for GitHub Pages / Custom Domain

Ensure `astro.config.mjs` supports both GH Pages and custom domains.

### Required Configuration
- `site`: set via environment-aware config or centralized site config
- `base`: support repo-name base path for GH Pages when no custom domain is used
- `trailingSlash: 'always'` for clean static routing

### Also Support
- custom domain CNAME support
- preview builds
- broken-link checking in CI if feasible

---

## 22. Implementation Guidance: Prototype to Astro

The provided `App.jsx` prototype contains core design and logic. Deconstruct and evolve it as follows.

### Step 22.1: Layouts & Global Shell
- extract navigation and footer into reusable components
- create `BaseLayout.astro`
- move global site config into `src/data/site.ts`

### Step 22.2: Homepage & Hero
- extract `InteractiveNetwork`
- render hero text, featured essays, active series, and featured artifacts from content collections
- mount interactive hero with `client:idle` or equivalent

### Step 22.3: Essays & MDX Components
- extract `AgenticDiagram` and `ContextVisualizer`
- pass them into MDX renderer through `PostLayout.astro`
- support callout blocks, tags, metadata rows, and related content sections

### Step 22.4: Projects & Portfolio Components
- extract `DeckViewer` and `ComponentDemo`
- render them prominently in `ProjectLayout.astro`
- support full-width or near-hero treatment where appropriate

### Step 22.5: Series
- build list pages and detail pages for active/planned series
- connect posts to series via frontmatter
- generate recommended reading order and next/previous links

### Step 22.6: Portfolio & Other Sites Pages
- create data-backed pages using `src/data/portfolio.ts` and `src/data/external-sites.ts`
- design these as highly scannable card/grid pages, not just long text lists

### Step 22.7: Search / Taxonomy
- generate tag pages and topic pages
- build search index over posts, projects, and series
- normalize tags at build time

### Step 22.8: Lite Mode
- ensure all interactive islands honor performance mode
- provide static fallbacks everywhere

### Step 22.9: Metadata & Distribution
- wire up RSS, sitemap, canonical URLs, OG metadata, robots, and JSON-LD
- ensure all required metadata falls back gracefully when omitted

---

## 23. Bootstrapping Sequence

Execute the following tasks in order.

1. `npm create astro@latest ./ -- --template minimal --install --no-git`
2. `npx astro add react tailwind mdx`
3. `npm install lucide-react @nanostores/react nanostores`
4. Scaffold directories defined in Section 7
5. Create `src/data/site.ts`, `taxonomy.ts`, `external-sites.ts`, and `portfolio.ts`
6. Create `src/store/themeStore.ts`
7. Port `App.jsx` components into `src/components/`
8. Build `src/content/config.ts` with `posts`, `projects`, and `series` collections
9. Create core layouts
10. Build homepage and list/detail pages for essays, projects, series, topics, and tags
11. Build Portfolio and Other Sites pages
12. Add RSS, sitemap, robots, and metadata helpers
13. Add static search index generation
14. Add lite mode support to all heavy components
15. Seed initial content examples in each collection
16. Validate build, accessibility basics, and metadata output

---

## 24. Initial Seed Content Requirements

Before considering the site launch-ready, create at minimum:

### Essays
- 3 flagship essays
- 2 field notes

### Series
- 2 defined series, even if one is only partially populated

### Projects
- 3 selected projects / artifacts

### Pages
- About
- Start Here
- Portfolio
- Other Sites

This avoids launching with a technically complete shell but editorially empty content.

---

## 25. Initial Series Recommendations

Structure the site to support at least these launch-ready series:

### Series A: The Agentic SDLC
Examples:
- The Agentic SDLC Is Not Just Better Autocomplete
- What an Agent-Ready Repo Actually Looks Like
- Specs, Tasks, Context Packs, and the New Artifact Layer

### Series B: The Practical CTO
Examples:
- The CTO as Designer of Execution Systems
- Technical Leadership in the Agentic Era
- Architecture as an Operating Model

### Series C: Canonical CS for the Agentic Era
Examples:
- Knuth After Copilots
- Abstraction Barriers for AI Agents
- Why Literate Programming Feels Relevant Again

---

## 26. Site Config Data Model

Create a central config in `src/data/site.ts` that includes:
- site title
- subtitle / tagline
- description
- base URL
- nav items
- social/profile links
- footer links
- default OG image
- default disclaimer text
- author metadata

This makes future renaming or publication-title changes low friction.

---

## 27. Portfolio & Ecosystem Data Model

### `src/data/external-sites.ts`
Should support:
- site title
- URL
- short description
- type (`blog`, `project`, `profile`, `publication`, `tool`, etc.)
- featured flag

### `src/data/portfolio.ts`
Should support:
- project/offering title
- description
- status
- link(s)
- category
- featured flag

This makes it easy to feature:
- other blogs
- side properties
- component libraries such as `@miethe/ui`
- public repos
- portfolio highlights

---

## 28. Final Success Criteria

The bootstrap implementation is successful when:
- a new essay can be added quickly via MDX + frontmatter
- series pages and topic pages render automatically
- tag pages work and remain controlled
- projects render as professional portfolio entries
- portfolio / other sites pages can represent a broader ecosystem cleanly
- the homepage feels like a publication, not just a post feed
- metadata, RSS, sitemap, and static search are in place
- interactive islands enhance the experience without becoming mandatory
- the site is usable, readable, and credible in both light/dark and rich/lite modes

---

## 29. Implementation Notes on Tags

Because tags were explicitly requested: include them.

### Final recommendation on tags
- yes, use tags
- keep them **controlled and curated**
- do not expose a massive tag cloud on the homepage
- expose tags mainly on post/project pages, tag indexes, search, and related-content logic

This gives you discoverability without letting taxonomy overwhelm the brand.

