# Tier A fidelity review (gpt-5.6-sol on ICA ccx)

## 01 essay entry (hero, title block, author card, executive signal)

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/01_essay-entry__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/01_essay-entry__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/entry-tall__desktop-tall__dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/executive-signal__desktop__dark.jpg`

## Fidelity score: 6/10

1. **Essay layout shell:** The live content is constrained to roughly 970px and leaves excessive side margins, causing the headline to wrap to three lines. Set `.essay-layout { width: min(calc(100% - 80px), 1060px); grid-template-columns: minmax(0, 756px) 266px; column-gap: 40px; margin-inline: auto; }`. The target uses a substantially wider primary pane and a tighter rail gap.

2. **Title-block ordering:** The live block places only the category above the title, then inserts the series pill, date, and tags below the deck. Reorder with grid or flex `order` so the sequence is `breadcrumbs`, `metadata`, `h1`, `dek`, `tags`, `revision-row`. Use `.breadcrumbs { order: 1; margin-top: 20px; }`, `.entry-meta { order: 2; margin-top: 12px; }`, `h1 { order: 3; margin-top: 14px; }`, `.dek { order: 4; }`, `.tags { order: 5; }`. Move or hide the large `ARC · Agentic Systems Engineering · 3 of 5` pill from this title stack.

3. **Essay headline:** The current headline occupies three lines and creates excessive vertical depth. After widening the primary column, set `font-size: 43px; line-height: 1.03; font-weight: 700; letter-spacing: -0.025em; max-width: 756px; margin-bottom: 16px; color: #F4F0E8;`. The target headline resolves in two lines.

4. **Hero image:** The live hero is approximately 673px wide by 212px tall and has a softer 10px corner treatment. Set `.essay-hero { width: 100%; height: 220px; object-fit: cover; border-radius: 8px; overflow: hidden; }`. Add the target’s bottom-left caption plate with `position: absolute; left: 0; bottom: 0; padding: 6px 12px; font-size: 10px; color: #C8D2DF; background: rgba(4,15,29,.82); border-radius: 0 6px 0 0;`.

5. **Deck and metadata density:** The live deck is small and wraps across three lines, while metadata is spread over multiple separated rows. Set `.essay-dek { font-size: 19px; line-height: 1.45; color: #B7C0D0; max-width: 750px; margin: 0 0 18px; }` and `.entry-meta { display: flex; align-items: center; gap: 10px; font-size: 11px; line-height: 1; color: #99A8BB; }`. Use `::before` separators with `color: #465A74` rather than large spacing.

6. **Author card:** The live card is about 241px tall, uses a photographic avatar, and has generous vertical gaps. Target a compact 182px card: `.author-card { min-height: 182px; padding: 14px 15px; border: 1px solid #29445F; border-radius: 9px; background: rgba(8,25,45,.72); box-shadow: inset 0 1px 0 rgba(255,255,255,.025); }`. Use a 38px initials avatar with `background: #28244A; border: 1px solid #514B78; font-size: 14px`, a `17px/1.1` serif name, `11px/1.3` role, and `12px/1.35` body copy. Keep internal section gaps between 10px and 12px.

7. **Executive Signal card:** The live card is roughly 307px tall and reads as two equally weighted text sections. Replace that hierarchy with one eyebrow, one prominent takeaway, and one supporting paragraph. Set `.executive-signal { min-height: 164px; padding: 15px; border-radius: 9px; border: 1px solid #5747A8; background: linear-gradient(145deg, #21164B 0%, #16183D 48%, #101C36 100%); box-shadow: inset 0 1px 0 rgba(180,156,255,.12), 0 8px 24px rgba(24,12,74,.18); }`. Style the takeaway at `21px/1.08`, serif, `font-weight: 700`, and supporting text at `12px/1.4`. Remove the center divider and secondary subsection treatment.

8. **Right-rail vertical rhythm:** Because both live cards are oversized, the navigation rail begins far below the target position. Use `.essay-rail { display: flex; flex-direction: column; gap: 14px; }`, with the author card at 182px and Executive Signal at 164px. The next rail component should begin about 14px below the signal card, rather than more than 300px below the author card.

9. **Page plates and background:** The live page background is slightly brighter and flatter. Set the main canvas to `#071629` with `background-image: radial-gradient(circle at 72% 12%, rgba(40,61,112,.12), transparent 34%), linear-gradient(180deg, #081A30 0%, #061426 100%);`. Keep ordinary cards near-transparent navy, reserving saturated violet glow for the Executive Signal.

10. **Header scale:** The live header is approximately 59px tall and the compact anniversary mark has less presence than the target lockup. Set `.site-header { height: 48px; border-bottom: 1px solid #1C3550; background: rgba(5,19,35,.92); }`, `.header-inner { width: min(calc(100% - 80px), 1060px); height: 100%; }`, and size the primary logo lockup to approximately `130px × 24px`. Use `font-size: 11px` navigation with `24px` item gaps.

**Keep as is:** The dark editorial palette, serif and sans-serif pairing, active-navigation violet accent, hero artwork crop, outlined card language, and restrained purple glow are directionally aligned with the target.

## 02 first scroll (section marker, pull quote, first figure, companion rail)

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/02_first-scroll__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/02_first-scroll__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/first-scroll__desktop__dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/threadscene-incident__desktop__dark.jpg`

## Fidelity score: 3/10

1. **First-scroll viewport composition:** The live view still devotes roughly 650px of vertical space to the hero image, title, metadata, and revision area, leaving the first section below the fold. For this scroll state, position the article so the revision strip begins near `top: 108px`, the pull quote near `top: 230px`, the section marker near `top: 364px`, and the first figure is fully visible by `top: 554px`. The hero and title should already be above the viewport.

2. **Reading Companion rail:** The live rail shows author, “Why this matters,” and navigation as separate stacked cards. At this depth, hide the author and executive-summary cards and make the Reading Companion the only rail card. Use `position: sticky; top: 112px; width: 272px; min-height: 318px; padding: 16px; border: 1px solid #29486f; border-radius: 9px; background: linear-gradient(180deg, #0b1a32 0%, #09162b 100%); box-shadow: 0 12px 30px rgba(0,0,0,.28), inset 0 1px 0 rgba(120,170,255,.06)`.

3. **Pull quote component:** The prominent pull quote is missing from the live first-scroll region. Insert it immediately after the revision strip and before section 01. Set `min-height: 106px; padding: 18px 28px 18px 58px; border-left: 4px solid #9a70ff; background: linear-gradient(100deg, rgba(19,42,72,.92), rgba(10,25,47,.55)); box-shadow: inset 0 0 34px rgba(51,112,194,.08)`. Style the quote at `font-size: 27px; line-height: 1.35; font-style: italic; font-weight: 400; color: #f3f1ef`, with a `38px` blue-violet quote glyph positioned `left: 18px; top: 12px`.

4. **First figure visibility and treatment:** The deployment-gap figure is absent from the visible live composition. Place it directly after the first section paragraph with `margin-top: 14px; width: 100%; min-height: 218px; border: 1px solid #315278; border-radius: 9px; overflow: hidden; background: radial-gradient(circle at 50% 35%, rgba(43,90,145,.14), transparent 55%), #08172b; box-shadow: 0 10px 28px rgba(0,0,0,.22), inset 0 1px 0 rgba(112,165,235,.06)`. Give the figure header `height: 40px; padding: 0 15px; border-bottom: 1px solid #243e61`.

5. **Article and rail grid:** The live article begins around `x: 215px` and the rail is narrow and detached, while the target uses a broader, tighter two-column editorial grid. Set the page body to `max-width: 1020px; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 705px) 272px; column-gap: 42px`. Keep the vertical divider at the rail boundary with `border-left: 1px solid rgba(70,104,148,.35); padding-left: 20px`.

6. **Section 01 marker and heading:** The live section marker is only partially visible and lacks the target’s complete hierarchy. Use a section header grid of `grid-template-columns: 40px 1fr; gap: 14px; align-items: start; margin-top: 25px`. Add a `4px` violet rule on the section’s left edge. Style the number badge at `40px × 40px; border: 1px solid #38557c; border-radius: 8px; background: #0b1930; color: #a989ff; font-size: 14px`. Set the eyebrow to `10px/1.2`, `font-weight: 600`, `letter-spacing: .24em`, `color: #aeb9d4`, and the heading to `30px/1.12`, `font-weight: 650`, `color: #f4f1eb`.

7. **Reading Companion density and active state:** The live table of contents uses a conventional numbered list with small, tightly packed text. Replace it with a vertical timeline using `row-gap: 11px`, `font-size: 12px`, and `line-height: 1.25`. Add a `1px solid #315077` connecting line and `10px` circular nodes. The active node should use `background: #eef2ff; border: 2px solid #7662ff; box-shadow: 0 0 0 3px rgba(103,83,255,.22), 0 0 12px rgba(102,113,255,.65)`, with the active row on `background: rgba(83,72,174,.28); border-radius: 4px; padding: 6px 8px`.

8. **Companion Thread Dock:** The live rail does not show the compact Thread Dock beneath the section list. Add a divider `margin: 20px 0 15px; border-top: 1px solid #29415f`, then a compact dock with a `16px` chat icon, `11px` uppercase label at `letter-spacing: .12em`, supporting text at `11px/1.45`, and a `32px` circular action button using `background: #11294a; color: #dbe8ff; box-shadow: 0 0 14px rgba(65,121,205,.18)`.

9. **Revision strip:** The live revision treatment is tall and fragmented into a heading, rule, and indented link. Consolidate it into a single `36px` bar with `display: flex; align-items: center; justify-content: space-between; padding: 0 15px; margin-bottom: 24px; border: 1px solid #29496f; border-radius: 8px; background: rgba(9,25,47,.72)`. Use `font-size: 11px; color: #9ec8e9`, keeping the reading-time action aligned right.

10. **Body density and color:** The live main column has excessive vertical spacing and muted gray text, reducing the target’s editorial density. Set section body copy to `font-size: 16px; line-height: 1.45; color: #d8d5d0; max-width: 680px`, with `margin: 14px 20px 0`. Use the page plate `background: linear-gradient(180deg, #071528 0%, #061225 100%)` and avoid large gaps over `28px` between revision, quote, section header, paragraph, and figure.

**Keep as is:** Serif display typography, dark navy visual language, restrained violet accents, thin card borders, sticky right-rail behavior, and the active-section highlighting concept.

## 04 thread focus

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/04_thread-focus__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/04_thread-deployment__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/thread-focus-route__desktop__dark.jpg`

## Fidelity score: 5/10

1. **Thread-focus main layout:** The live views use inconsistent templates, with one showing an extra “Reading Companion” panel and the other leaving excessive open space below the rail. Use a stable two-column grid: `grid-template-columns: minmax(0, 720px) 288px; column-gap: 30px; align-items: start; max-width: 1060px; margin-inline: auto;`. Hide the Reading Companion in this view with `display: none`.

2. **Primary figure treatment:** The Incident scene uses a bright white raster infographic, while the target uses a native dark interface plate. Style the figure shell with `background: linear-gradient(180deg, #0B2036 0%, #091A2D 100%); border: 1px solid #294766; border-radius: 9px; box-shadow: 0 16px 36px rgba(0,0,0,.24), inset 0 1px 0 rgba(125,190,255,.05); padding: 14px 20px 12px;`. Avoid large white image surfaces in thread-focus figures.

3. **Figure density and internal diagram:** The live Incident figure is a single oversized image, and the Deployment figure is visually denser than the target’s five-step flow. Build the diagram as equal compact nodes using `display: grid; grid-template-columns: repeat(5, minmax(0,1fr)); gap: 18px;`, with each node at `min-height: 112px; padding: 14px; border: 1px solid #315578; border-radius: 8px; background: rgba(8,27,46,.72);`. Use `24px` icons and `12px/1.35` supporting text.

4. **Main title scale:** Live titles are either oversized and wide, such as “Follow the reviewer out of the registry,” or considerably smaller, such as “Incident.” Match the target with `font-size: clamp(42px, 3.4vw, 56px); line-height: .98; font-weight: 700; letter-spacing: -.025em; max-width: 700px; color: #F3F0EA;` and keep the title to roughly two lines.

5. **Introductory text hierarchy:** The first live view presents multiple long serif paragraphs before the figure, while the target has one concise lead block with less vertical weight. Set the thread introduction to `font-size: 17px; line-height: 1.55; color: #C4C9D2; max-width: 700px; margin: 26px 0 14px;`, and cap the pre-figure region near `150px` tall.

6. **Running Example card:** The live cards omit or reorganize the target’s compact metadata rows and use noticeably lower-contrast text. Use `padding: 18px; background: linear-gradient(145deg,#0D2036 0%,#0A192B 100%); border: 1px solid #2A4563; border-radius: 9px; box-shadow: 0 12px 28px rgba(0,0,0,.2);`. Set the heading to `23px/1.1`, metadata to a two-column grid `74px 1fr`, and body/meta text to `13px/1.45; color: #BFC7D4`.

7. **Thread Overview card:** The simpler live overview lacks the target’s bordered scene rows, subtitles, and compact active-state treatment. Give each row `min-height: 40px; padding: 7px 11px; border: 1px solid #29435F; border-radius: 6px; margin-top: 5px;`. Style the active row with `background: linear-gradient(90deg,rgba(91,53,185,.48),rgba(70,37,134,.36)); border-color: #A36CFF; box-shadow: inset 3px 0 #8D5CFF;`.

8. **Thread navigation row:** The target places “Back to essay,” the Thread focus label, and scene progress together above the title. Live versions split these elements across a breadcrumb, centered utility text, and the eyebrow. Use `display: flex; align-items: center; gap: 14px; height: 42px; margin-bottom: 20px; border-bottom: 0;`, with the back button at `height: 34px; padding: 0 14px; border-radius: 6px; background: #102A46;`.

9. **Typography contrast and tracking:** Live secondary labels are too dim and, in places, too widely tracked. Use eyebrow labels at `font-size: 10px; line-height: 1.2; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: #AEB8CC;`. Keep normal paragraphs at `letter-spacing: 0` and `color: #C5CBD5`.

10. **Top navigation polish:** The live navigation varies significantly between screenshots and uses stronger purple text than the target. Normalize the header to `height: 52px; background: rgba(4,18,34,.94); border-bottom: 1px solid #173653;`, set links to `font-size: 12px; color: #C6CBD5;`, and reserve `#A873FF` for the active underline and small interaction accents only.

**Keep as is:** The dark navy foundation, restrained cyan and violet accent palette, serif editorial headings, rounded card corners, and two-column article/sidebar structure are directionally aligned with the target.

## 05 evidence focus

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/05_evidence-focus__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/07_evidence-receipts__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/evidence-focus-index__desktop__dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/evidence-record__desktop__dark.jpg`

## Fidelity score: 4/10

1. **Receipt detail route / page component:** One live screenshot renders the generic 404 page instead of the Evidence Focus interface. Replace the `.not-found-page` output on receipt URLs with `.evidence-focus-page { display: grid; grid-template-columns: minmax(0, 818px) 298px; gap: 18px; }` and render the receipt summary, evidence guide, and receipt index components.

2. **Evidence Focus main layout:** The live content is too narrow and leaves excessive outer margins. Set the page wrapper to `width: calc(100% - 48px); max-width: 1132px; margin-inline: auto; padding-top: 16px;`, with `grid-template-columns: minmax(0, 818px) 298px` and `column-gap: 18px`. Keep the sidebar aligned to the top action row rather than beginning below the title.

3. **Page introduction:** The live view jumps directly from the title into the receipt card and loses the target’s explanatory hierarchy. Add an intro paragraph below `.evidence-focus-title` with `max-width: 760px; margin-top: 6px; margin-bottom: 14px; color: #B7C1D2; font-family: Georgia, serif; font-size: 18px; line-height: 1.22;`. Use `font-size: 40px; line-height: 1.05; font-weight: 700; color: #F3F0EA;` for the title.

4. **Primary receipt card treatment:** The live card is a flat, oversized metadata form, while the target is a compact editorial evidence panel. Style `.receipt-summary-card` with `padding: 18px; border: 1px solid #29476D; border-radius: 11px; background: linear-gradient(145deg, #0A1E36 0%, #07172C 100%); box-shadow: inset 0 1px 0 rgba(150,195,255,.05), 0 12px 30px rgba(0,0,0,.22);`. Remove the large nested metadata box as the dominant first element and place the icon, eyebrow, title, date, and classification note in a compact header.

5. **Receipt header hierarchy and icon:** The live receipt begins with a tiny pill and all-caps label, with no strong visual anchor. Add a `32px` document icon at the left in `#9DD8FF`, then use `.receipt-eyebrow { font-size: 9px; font-weight: 700; letter-spacing: .18em; color: #AFC2DD; }`, `.receipt-title { margin-top: 5px; font: 700 23px/1.1 Georgia, serif; color: #F2EFE9; }`, and `.receipt-date { margin-top: 5px; font-size: 12px; color: #A8B4C7; }`.

6. **Supported claim and limitations region:** The live columns are text-heavy and lack the target’s icons and clear section boundary. Set the region to `display: grid; grid-template-columns: 1fr 1fr; margin-top: 14px; padding-top: 14px; border-top: 1px solid #29476D;`. Give the second column `padding-left: 36px; border-left: 1px solid #29476D;`. Add `20px` circular status icons, cyan `#65C7E8` for support and amber `#FFB65B` for limitations. Use `font-size: 9px; letter-spacing: .16em; font-weight: 700` for labels and `font-size: 14px; line-height: 1.35; color: #D8DFEA` for primary statements.

7. **Evidence asset area:** The live implementation substitutes a muted no-asset message and related links for the target’s prominent captured-evidence panel. Render `.evidence-preview` directly below the support columns with `margin-top: 14px; height: 185px; overflow: hidden; border: 1px solid #315074; border-radius: 9px; background: #E9E6DF; box-shadow: 0 8px 24px rgba(0,0,0,.28);`. Add an uppercase label above it at `9px`, `.18em` letter-spacing, and a top-right redaction badge with `padding: 5px 9px; border-radius: 5px; background: #25354D; color: #F2F5FA; font-size: 9px; font-weight: 700`.

8. **Evidence Guide sidebar:** The live “Evidence Classes” panel reads like a plain glossary and has weak hierarchy. Style it as `.evidence-guide { padding: 18px 20px; border: 1px solid #29476D; border-radius: 10px; background: linear-gradient(155deg, #0B2039 0%, #08192E 100%); box-shadow: 0 14px 32px rgba(0,0,0,.18); }`. Add a `22px` book icon and title, then use `font: 700 22px/1.1 Georgia, serif; color: #F1EEE8;` for the guide headline. Classification names should be plain bold text at `13px`, not outlined pills, with descriptions at `12px/1.4` and `margin-bottom: 17px`.

9. **Receipt index sidebar:** The live list lacks the numbered circles, dates, arrows, dividers, and luminous selected state from the target. Use `padding: 14px 10px; border: 1px solid #29476D; border-radius: 10px; background: #081A30;`. Each row should be `min-height: 44px; padding: 7px 10px; border-bottom: 1px solid rgba(74,105,145,.22);`. Add a `27px` numbered circle, a `10px` muted date, and a right arrow. Style the active row with `background: linear-gradient(90deg, #4130C8 0%, #29218B 100%); border: 1px solid #594DFF; border-radius: 8px; box-shadow: 0 0 18px rgba(89,77,255,.25);`.

10. **Color contrast and typography density:** The live page uses low-contrast gray-blue text and widely spaced form-like blocks. Set primary body copy to `#C7D0DE`, secondary copy to `#8998AE`, card headings to `#F2EFE9`, and borders to `#29476D`. Reduce general metadata spacing to `6px 0`, use body text at `13px to 14px` with `line-height: 1.4`, and reserve uppercase tracking of `.14em to .18em` for eyebrows only.

**Keep as is:** Dark navy visual theme, serif display headings, two-column desktop structure, active Essays navigation state, back-to-essay control, and the basic right-rail grouping.

## 06 figure viewer

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/06_figure-viewer__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/08_figure-viewer__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/figure-viewer__desktop__dark.jpg`

## Fidelity score: 4/10

1. **Figure Viewer container, positioning and state:** The live viewer appears as an inline page card beneath the global navigation. Render it as a centered modal overlay with `position: fixed; inset: 0; display: grid; place-items: center; z-index: 1000;`, plus a backdrop of `background: rgba(1, 8, 20, 0.78); backdrop-filter: blur(2px);`. Size the modal to `width: min(968px, calc(100vw - 64px)); max-height: calc(100vh - 64px);`.

2. **Enlarged figure viewport, aspect ratio:** The live image is a tall approximately 16:9 panel that dominates the page. The target uses a wide panoramic viewport approximately `850px × 264px`. Set `.figure-media { width: 100%; aspect-ratio: 3.22 / 1; overflow: hidden; border-radius: 14px; }` and `.figure-media img { width: 100%; height: 100%; object-fit: cover; }`.

3. **Modal surface and depth:** The live surface is flat and visually merges into the page. Use `background: linear-gradient(145deg, #071b32 0%, #06172c 55%, #081d36 100%); border: 1px solid rgba(112, 84, 255, 0.72); border-radius: 16px; box-shadow: 0 24px 80px rgba(0, 0, 0, 0.58), 0 0 30px rgba(75, 61, 255, 0.12), inset 0 1px 0 rgba(255,255,255,0.04);`.

4. **Figure Viewer header:** Replace the live “Back to essay / Back to thread focus” toolbar with a dedicated modal header measuring `64px` high, using `padding: 0 30px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(145, 174, 211, 0.18);`. Style “FIGURE VIEWER” at `13px`, `font-weight: 700`, `letter-spacing: 0.14em`, and `color: #dce5f5`.

5. **Close and return control:** The live header lacks the target’s clear close affordance and return-context message. Add right-aligned helper text at `12px; color: #aebbd2;` and a `34px × 34px` close button with `border: 1px solid #385174; border-radius: 9px; background: rgba(8, 25, 47, 0.8); color: #dbe8fa;`, using an `18px` close icon.

6. **Viewer content spacing and density:** The live content has excessive vertical depth and loose framing. Set the modal body to `padding: 22px 59px 20px;`, use `12px` between eyebrow and title, `10px` between title and media, and `16px` between media and caption. Keep the full viewer near `575px` tall at desktop rather than extending below the viewport.

7. **Title hierarchy:** The live figure title is oversized relative to the viewport and wraps prominently. Use a serif title with `font-size: 27px; line-height: 1.12; font-weight: 600; letter-spacing: -0.015em; color: #f3f0eb; margin: 4px 0 10px;`. Style the figure eyebrow at `11px; line-height: 1; font-weight: 700; letter-spacing: 0.18em; color: #b7c4d8;`.

8. **Caption and context structure:** The live caption is enclosed inside the same bordered frame as the image, producing a heavy nested card. Remove the outer caption-panel border and background. Place caption content directly beneath the image with `background: transparent; border: 0; padding: 0;`, using a `14px` semibold caption line and context text at `13px; line-height: 1.5; color: #aebbd0;`.

9. **Caption actions:** The target includes a right-aligned download button and a lower long-description action, while the live header only exposes “Copy link.” Add a `Download (PNG)` button at `height: 36px; padding: 0 14px; border: 1px solid #385579; border-radius: 10px; background: rgba(8, 27, 51, 0.68); color: #e0e9f7; font-size: 12px;` with an `18px` download icon. Add a `View long description →` button below at the same height and visual treatment.

10. **Image frame polish:** The live media border is thin but visually plain. Apply `border: 1px solid rgba(151, 180, 218, 0.42); border-radius: 14px; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.025), 0 8px 22px rgba(0,0,0,0.24);` and remove any additional padded frame around the image.

**Keep as is:** The dark navy palette, restrained violet accent, serif figure-title styling, readable light-on-dark contrast, and centered desktop content width are aligned with the target direction.

## 07 managed variation inline

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/07_managed-variation-inline__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/06_managed-variation__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/managed-variation__desktop__dark.jpg`

## Fidelity score: 3/10

1. **Managed variation inline component:** Replace the current oversized white “Figure 08” image plate with the target’s compact dark comparison card. Set `width: 100%`, `min-height: 260px`, `padding: 16px 20px`, `background: linear-gradient(180deg, #09192d 0%, #071528 100%)`, `border: 1px solid #29476d`, `border-radius: 12px`, and `box-shadow: inset 0 1px 0 rgba(130,170,255,.08), 0 10px 28px rgba(0,0,0,.18)`. The current bright white raster dominates the page and does not match the target component.

2. **Comparison card internal layout:** Convert the managed variation card into three equal decision columns using `display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0`. Add `padding-inline: 18px` per column and `border-left: 1px solid rgba(109,139,190,.28)` on columns two and three. Each column should contain a centered mini-diagram around `190px × 92px`, an uppercase heading, two compact body lines, and a bottom action button.

3. **Main content and right rail grid:** The live main column is about `720px` and the rail about `234px`, making the rail cramped and the composition too inset. Set the page container to `max-width: 1125px; margin-inline: auto; padding-inline: 0`, with `grid-template-columns: minmax(0, 790px) 307px; column-gap: 28px`.

4. **Reading Companion rail:** Consolidate the current stack of separate “On this page,” “Running example,” and “Contextual note” cards into one target-style panel. Use `width: 307px`, `background: rgba(7,22,40,.86)`, `border: 1px solid #29476d`, `border-radius: 12px`, `overflow: hidden`, and `box-shadow: 0 12px 32px rgba(0,0,0,.2)`. Keep the contents vertically grouped with `16px 20px` section padding and `border-top: 1px solid rgba(85,119,169,.25)` between sections.

5. **Managed variation section hierarchy:** Add the target eyebrow and section heading directly above the comparison card. Use `font-size: 11px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: #a58cff` for the eyebrow, then `font-family: Georgia, serif; font-size: 31px; line-height: 1.08; font-weight: 700; color: #f5f1ef; margin-top: 10px`.

6. **Body copy sizing and measure:** The live surrounding copy is visually light and spread across a narrower text measure. Set section copy to `font-family: Georgia, serif; font-size: 18px; line-height: 1.42; color: #c9c7cf`, with `max-width: 760px`. Use `margin: 6px 0 8px` between the section heading, introduction, card, and closing paragraph.

7. **Mini-diagram treatment:** Replace the dense raster infographic with vector-like file icons sized around `46px × 58px`, using `stroke-width: 1.5px`, `color: #d7e4ff`, and state accents `#52c8ff`, `#a878ff`, and `#f2b85d`. Add restrained glows such as `filter: drop-shadow(0 0 8px rgba(80,170,255,.28))`; avoid the current large white canvas and tiny unreadable labels.

8. **Decision buttons inside the comparison:** Add one outlined action per column, pinned to the bottom with `margin-top: auto`. Use `height: 32px`, `padding: 0 12px`, `border: 1px solid #4b6f9e`, `border-radius: 7px`, `background: rgba(8,25,45,.55)`, `color: #cbd8ee`, `font-size: 12px`, and `text-align: left`.

9. **Page density and vertical rhythm:** The live figure consumes roughly `500px` of height before its caption, while the target comparison occupies about `260px`. Remove the figure toolbar and caption enclosure, cap the comparison region near `260px`, and use `24px` between major article sections rather than the current large isolated blocks.

10. **Top navigation:** The live sticky bar is approximately `58px` high and densely packed. Match the target with `height: 76px`, `padding-inline: 44px`, `background: rgba(4,17,32,.92)`, and `border-bottom: 1px solid rgba(71,103,151,.35)`. Set navigation links to `font-size: 12px`, `font-weight: 500`, and `gap: 28px` to restore the quieter editorial hierarchy.

**Keep as is:** Dark navy foundation, purple and cyan accent palette, serif editorial voice, outlined card language, sticky navigation, and persistent right-side reading support.

## 08 conclusion / reading path

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/08_conclusion-reading-path__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/09_conclusion__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/conclusion__desktop__dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/conclusion-end__desktop__dark.jpg`

## Fidelity score: 3/10

1. **Conclusion state is visually absent from the live reading flow.** Insert the conclusion block immediately after the closing figure and before the reading-path card. Style it with `border-left: 2px solid #7C5CFF`, `padding-left: 16px`, `margin: 28px 0 14px`; use an uppercase kicker at `11px/1.2`, `font-weight: 700`, `letter-spacing: .16em`, `color: #A78BFA`; set the serif heading to `30px/1.15`, `font-weight: 600`, `color: #F6F1EA`; set body copy to `15px/1.55`, `color: #C3C8D4`, with `max-width: 680px`.

2. **The reading-path component appears before the closing argument instead of functioning as the final handoff.** Reorder the “PART OF THE AGENTIC SYSTEMS ENGINEERING READING PATH” card so it follows the conclusion block. Give it `margin-top: 14px`, `padding: 14px 16px 16px`, `border: 1px solid #46518B`, `border-radius: 8px`, and `background: linear-gradient(135deg, #101A32 0%, #11182C 58%, #17143A 100%)`.

3. **The live reading path is too sparse and resembles three plain links rather than a guided sequence.** Convert its inner area to `grid-template-columns: repeat(3, minmax(0, 1fr))` with `gap: 14px`. Add top dividers using `border-top: 1px solid #4B5576` and `padding-top: 10px`; use category labels at `9px`, `font-weight: 700`, `letter-spacing: .15em`, `text-transform: uppercase`, `color: #8F98B1`; titles at `15px/1.15`, serif, `font-weight: 600`, `color: #F0ECE7`; supporting titles and links at `11px/1.4`, `color: #AEB6C8`. Mark the current essay with a `1px solid #5B4AC7` pill on `#171B39`.

4. **The live page is materially less dense than the target.** Body copy currently reads around `18px` with approximately `28px` line-height and large paragraph gaps. Reduce the conclusion-region article text to `15px/1.55`, set paragraph margins to `0 0 10px`, and use `24px` section spacing instead of the current roughly `40px` to `55px`.

5. **The right rail contains unrelated stacked cards throughout the conclusion region.** In this region, replace the visible “Running Example” and “Contextual Note” stack with one compact “Reading Companion” card containing the section list and a separated “Thread Dock” row. Target `width: 260px`, `padding: 16px`, `border: 1px solid #293D5E`, `border-radius: 8px`, `background: rgba(8, 22, 42, .82)`, and `box-shadow: 0 16px 40px rgba(0,0,0,.20)`.

6. **The right-rail navigation lacks the target’s strong vertical progress treatment.** Add a `1px` vertical rule in `#30466B`, circular nodes sized `12px`, and a selected node with `background: #F6F3FF`, `border: 2px solid #6655E8`, `box-shadow: 0 0 0 3px rgba(103,83,232,.18)`. Set rows to `min-height: 27px`, selected-row background to `#172744`, and `border-radius: 5px`.

7. **The main and sidebar proportions are too narrow and disconnected.** Set the article shell to `max-width: 1038px`, `grid-template-columns: minmax(0, 724px) 260px`, `column-gap: 36px`, and `padding-inline: 24px`. Add `border-left: 1px solid #223754` and `padding-left: 18px` to the rail so the two-column hierarchy matches the target.

8. **The closing figure treatment is too tall and dominant relative to the conclusion.** Constrain the closing figure to `width: 100%`, `aspect-ratio: 3.35 / 1`, `object-fit: cover`, `border-radius: 7px`, and `border: 1px solid #36445C`. Use `margin-bottom: 7px`; style the caption at `10px/1.4`, `color: #8F99AC`, then leave `24px` before the conclusion.

9. **Cards lack the richer violet edge light and depth shown in the reference.** Apply a restrained layered treatment to the reading path and companion cards: `box-shadow: inset 0 1px 0 rgba(255,255,255,.035), 0 0 24px rgba(78,55,190,.08), 0 14px 34px rgba(0,0,0,.18)`. Use border color `#46518B` for the reading path and `#293D5E` for utility cards, rather than the current uniformly muted blue outline.

10. **The conclusion-region heading hierarchy is oversized and inconsistent with the target.** Use `30px/1.15` for the conclusion heading and `24px/1.2` for “Where this sits,” both in the existing serif face at `font-weight: 600`. Keep utility/card headings between `15px` and `18px`; avoid the live `36px+` article-heading scale in this final, compact region.

**Keep as is:** dark navy foundation, serif editorial headings, violet accent language, sticky two-column structure, rounded card corners, and the clear active state in the on-page navigation.

## 09 mobile

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/09_mobile-modes__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/10_mobile__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/entry__mobile__dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/threadscene-incident__mobile__dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/thread-focus-route__mobile__dark.jpg`

## Fidelity score: 3/10

1. **Mobile essay entry, overall density:** The live page is substantially oversized and requires multiple screens to show content that fits within one target viewport. Set the main content container to `padding: 12px 16px 20px`, use `gap: 8px`, and cap major block margins at `12px`. Remove the large `32px–48px` vertical gaps around metadata, tags, and author content.

2. **Mobile header:** The live header is roughly `96px` tall with an oversized logo and four utility icons. Match the target with `height: 56px`, `padding: 0 16px`, a `20px` symbol plus compact wordmark, and a right-aligned `Contents` button at `height: 30px; padding: 0 12px; border: 1px solid #365077; border-radius: 5px; font-size: 12px`. Hide the search, theme, lightning, and hamburger controls in this essay layout.

3. **Hero image:** The live hero sits inside a tall, heavily padded framed region. Use `margin: 8px 16px 0`, `width: calc(100% - 32px)`, `aspect-ratio: 2.25 / 1`, `object-fit: cover`, `border-radius: 3px`, and `border: 1px solid #263D60`. Remove excess outer padding and keep the image directly below the header.

4. **Essay title and excerpt typography:** The live title and introduction are about 30 to 50 percent too large. Set the title to `font-size: 27px; line-height: 0.99; font-weight: 700; letter-spacing: -0.02em; color: #F5F0E8; margin: 10px 0 8px`. Set the excerpt to `font-size: 15px; line-height: 1.35; color: #C7C4C5; margin: 0`. The combined title and excerpt should occupy roughly 190px, not most of the viewport.

5. **Essay metadata hierarchy:** The live build separates category, arc, dates, reading time, and tags into large rows. Consolidate them beneath the image and around the title: eyebrow links at `font-size: 10px`, a compact category/date row at `font-size: 10px; line-height: 16px`, and `column-gap: 7px`. Use `color: #A8AAB7`, with active labels in `#B49AFF`, and limit row margins to `5px`.

6. **Tag chips:** Live tags are large glowing pills spread across several rows. Use `display: flex; flex-wrap: wrap; gap: 5px`, with each chip at `height: 22px; padding: 0 9px; border: 1px solid #34476B; border-radius: 999px; background: rgba(15,31,58,.55); color: #C8C7D8; font-size: 10px; box-shadow: none`. Keep them directly below the excerpt.

7. **Author card and floating Contents control:** The large author card and bottom-right floating `CONTENTS` button are not present in the target entry composition and push essential content below the fold. Hide the author card in the mobile essay lead with `display: none`, and replace the floating control with the compact header button. If author attribution is required later, place it after the article body rather than within the opening viewport.

8. **Contents experience:** The target includes a dedicated full-height contents sheet with a vertical section timeline, five compact rows, and an inline article section beneath it. Implement a mobile sheet at `position: fixed; inset: 56px 0 0; background: #061527; padding: 14px 18px 24px; overflow-y: auto`. Use section rows at `min-height: 27px`, `font-size: 12px`, a `1px solid #31496F` timeline, `8px` circular nodes, and an active row with `background: #11264B; border-radius: 5px`.

9. **Thread focus screen:** The live thread route is a long article scene with a large diagram, while the target is a compact discussion thread. Add a thread header using `font-size: 25px; line-height: 1.05`, followed by comment rows with `display: grid; grid-template-columns: 34px 1fr`, `padding: 12px 0`, and a `1px solid #253956` connecting line. Avatars should be `30px`, comment text `12px/1.45`, metadata `10px`, and actions `11px`. Avoid using the oversized figure card as the primary thread content.

10. **Evidence focus and card treatment:** The target evidence view is absent from the supplied live screens. Add stacked evidence cards using `background: linear-gradient(145deg,#0A1B32 0%,#071425 100%); border: 1px solid #30466C; border-radius: 8px; padding: 12px; box-shadow: 0 8px 20px rgba(0,0,0,.22)`. Use `18px` violet icons, `10px` uppercase labels with `letter-spacing: .14em`, `13px` titles, `11px/1.35` descriptions, and a full-width mini-diagram at `margin-top: 9px; border-radius: 2px`.

**Keep as is:** The deep navy base palette, warm serif display face, violet accent family, outlined card borders, and pale editorial diagram artwork are directionally aligned with the target.
