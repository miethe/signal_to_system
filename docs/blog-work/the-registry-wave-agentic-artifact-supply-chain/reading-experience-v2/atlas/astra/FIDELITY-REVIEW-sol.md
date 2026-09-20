# Tier A fidelity review (gpt-5.6-sol on ICA ccx)

## 01 essay entry (hero, title block, author card, executive signal)

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/01_essay-entry__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/01_essay-entry__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/astra/01-entry--dark.jpg`

## Fidelity score: 6.5/10

1. **Page content grid:** The live layout is substantially wider, with an approximately 891px article column and 286px rail. Set the shared content wrapper to `max-width: 1120px; margin-inline: auto; padding-inline: 0;` and the desktop grid to `grid-template-columns: minmax(0, 756px) 266px; column-gap: 40px;`. Add a `1px solid #263957` divider 20px before the rail.

2. **Hero illustration:** The live hero is about `891px × 261px`, making it dominate the opening. At desktop, constrain it to `width: 756px; aspect-ratio: 756 / 221; object-fit: cover; border-radius: 8px;`. Keep the caption as a compact bottom-left overlay with `font-size: 10px; padding: 5px 12px; background: rgba(5, 15, 29, 0.72)`.

3. **Header and navigation:** The live header is taller and the logo is much smaller than the target. Use `height: 48px`, constrain the header inner wrapper to `max-width: 1120px`, and size the full SIGNAL / SYSTEM wordmark to roughly `132px × 24px`. Set navigation labels to `font-size: 11px; font-weight: 500; gap: 26px`. Hide the additional Portfolio and Other Sites links at this breakpoint, and retain the outlined AI AGENTS control at the right with `height: 26px; padding: 0 14px; border: 1px solid #334a6d; border-radius: 999px`.

4. **Article hierarchy below the hero:** The live build omits the breadcrumb row and moves directly into metadata. Insert a breadcrumb row between the hero and article metadata with `margin-top: 18px; font-size: 11px; line-height: 18px; color: #7f9ab8; gap: 9px`. Place the category pill, author, updated date, and read time on the following row with `margin-top: 8px`.

5. **Title block typography:** The live title and deck feel oversized and reduce above-the-fold density. Set the article title to `font-size: 44px; line-height: 1.07; font-weight: 700; letter-spacing: -0.02em; color: #f3f0eb; margin-top: 13px`. Set the deck to `font-size: 20px; line-height: 1.45; color: #b7bfd0; margin-top: 18px; max-width: 740px`.

6. **Author card:** The live card is approximately 286px wide and 247px tall, while the target is a compact 266px by roughly 182px plate. Use `padding: 15px; min-height: 182px; border-radius: 9px; background: #091a30; border: 1px solid #29415f; box-shadow: 0 10px 28px rgba(0,0,0,0.18)`. Keep the avatar at `38px`, the author name at `20px/1.1`, descriptive copy at `12px/1.45`, and links at `11px`.

7. **Executive Signal card:** The live purple card is more than twice the target height and includes an additional “Why this matters” section. Limit the card to about `164px` high with `padding: 15px`, and remove or collapse the secondary subsection from the opening state. Use `background: linear-gradient(145deg, #20194c 0%, #15183b 52%, #101a34 100%); border: 1px solid #51459a; border-radius: 9px; box-shadow: 0 12px 30px rgba(40, 25, 112, 0.22)`. Set the headline to `24px/1.02`, supporting text to `13px/1.4`, and the corner signal icon to `14px`.

8. **Tags and revision controls:** The live build adds a separate ARC series pill and a tall revision area, extending the title block. Remove the series pill from this region or set it to `display: none`. Render the revision disclosure as one `36px` row immediately below the tags with `margin-top: 14px; border-top: 1px solid #203550; border-bottom: 1px solid #203550; font-size: 11px`, with the revision label left-aligned and reading time right-aligned.

9. **Reading Companion density:** The live rail either shows a long 11-item list or an overly collapsed preview, while the target shows five compact entries followed by the Thread Dock in the same card. Use `padding: 15px; border-radius: 9px; background: #091a30; border: 1px solid #29415f`; render five rows at `25px` each with `font-size: 11px`, then add a `1px solid #263957` divider and a `76px` Thread Dock footer. Target total height is approximately `277px`.

10. **Opening vertical rhythm:** The live opening pushes the first essay section much farther below the fold. After applying the narrower grid and shorter hero, use `24px` from hero to breadcrumbs, `12px` from metadata to title, `16px` from title to deck, `16px` from deck to tags, and `25px` from the revision row to the first section heading. This should bring the first section into view near the target’s vertical position.

**Keep as is:** Dark navy foundation, serif and sans-serif pairing, illustration treatment, rounded taxonomy pills, active Essays state, sidebar alignment, and the restrained cyan-purple accent palette.

## 02 first scroll (section marker, pull quote, first figure, companion rail)

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/02_first-scroll__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/02_first-scroll__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/astra/02-first-scroll--dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/astra/02-pullquote--dark.jpg`

## Fidelity score: 4/10

1. **First-scroll content stack:** The live layout is too tall and cannot show the pull quote, section marker, introductory copy, first figure, and companion rail together. Set the main article column to `max-width: 705px`, use `row-gap: 20px`, reduce body copy to `font-size: 16px; line-height: 1.45`, and keep the first figure near `height: 220px`. The target fits this complete hierarchy within roughly `680px` of vertical space.

2. **First figure:** The live “FIGURE 01” is a large white image plate that dominates the screen. Replace the white canvas with a native dark diagram container using `background: linear-gradient(135deg, #07172B 0%, #0A1B34 100%)`, `border: 1px solid #29486C`, `border-radius: 9px`, `box-shadow: inset 0 0 32px rgba(44,111,190,.08)`, `padding: 48px 22px 34px`, and `min-height: 218px`. Use three compact node cards connected by dashed cyan lines rather than a full-width light infographic.

3. **Pull quote:** The live quote is an unfilled, oversized ruled block. Style it as a filled emphasis plate with `background: linear-gradient(90deg, #10233E 0%, #0B1B31 100%)`, `border-left: 4px solid #A98AFF`, no top or bottom rule, `padding: 18px 20px`, and `margin: 18px 0 24px`. Set quote text to `font-size: 27px; line-height: 1.28; font-style: italic; font-weight: 400; color: #F2F0F5`, with the quote glyph at `38px` in `#7697F8`.

4. **Section marker and heading hierarchy:** The live section begins with a large standalone title and later introduces another “Incident” subheading, while the target uses one compact marker row. Add a `4px` active rule in `#B18CFF` along the section’s left edge, place the `01` badge at `40px × 40px`, and align it with an uppercase eyebrow and title. Use eyebrow `11px/1.2`, `font-weight: 600`, `letter-spacing: .22em`, `color: #A7B4D1`; title `31px/1.12`, `font-weight: 650`, `color: #F5F2EE`; and `gap: 14px`. Remove the redundant secondary heading treatment.

5. **Main content density:** Live paragraphs use a much larger editorial scale and generous vertical margins, pushing the figure below the intended first-scroll composition. Set article paragraphs to `font-size: 16px; line-height: 1.48; color: #D2D2D8`, `max-width: 650px`, and `margin: 0 0 12px`. Set the section intro-to-marker gap to `20px` and marker-to-body gap to `16px`.

6. **Reading Companion contents:** The live rail includes a large “Running Example” module and contextual note, while the target rail contains only the on-page list followed by a compact Thread Dock. Remove those expanded modules from this scroll state. Add a divider `border-top: 1px solid #263E5C; margin-top: 20px; padding-top: 18px`, then render Thread Dock at approximately `74px` high with a `32px` circular arrow action.

7. **Reading Companion card treatment:** The live rail is tall, flat, and visually heavier than the target. Set the card to `width: 272px`, `background: linear-gradient(180deg, rgba(10,26,48,.96) 0%, rgba(7,21,39,.96) 100%)`, `border: 1px solid #29486C`, `border-radius: 9px`, `padding: 17px 16px`, and `box-shadow: 0 12px 30px rgba(0,0,0,.22), inset 0 0 24px rgba(55,101,174,.05)`. Remove internal sections that make it extend beyond roughly `318px`.

8. **Companion navigation density:** Live rail entries are too numerous and vertically spread. Limit the visible list to six section labels, set each row to `height: 27px`, `font-size: 12px`, `line-height: 1.25`, and `color: #AAB7D1`. Style the active row with `background: linear-gradient(90deg, rgba(96,92,204,.34), rgba(74,75,157,.25))`, `border-radius: 4px`, and `padding: 6px 8px`.

9. **Content and rail geometry:** The live main column is about `890px` wide and the gap before the rail is excessive. Use a two-column wrapper with `grid-template-columns: minmax(0, 705px) 272px`, `column-gap: 42px`, and `align-items: start`. Add `border-left: 1px solid #203754` to the rail region with `padding-left: 20px`, matching the target’s clear but compact separation.

10. **Missing revision strip:** Add the compact revision/status bar above the opening paragraph using `height: 38px`, `border: 1px solid #263F61`, `border-radius: 7px`, `background: rgba(8,24,44,.65)`, `padding: 0 14px`, and `font-size: 11px; color: #8FC8EE`. Align revision information left and reading time plus arrow right.

**Keep as is:** The dark navy page palette, lavender active accents, serif editorial voice, sticky right rail behavior, outlined number badge, and thin blue-gray border language are aligned with the target.

## 04 thread focus

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/04_thread-focus__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/04_thread-deployment__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/astra/04-thread--dark.jpg`

## Fidelity score: 4/10

1. **Thread Focus page grid:** Set the desktop content wrapper to `max-width: 1036px; margin-inline: auto; display: grid; grid-template-columns: 720px 287px; gap: 30px`. The current live layout is approximately 914px plus 294px and starts near the viewport edge, making the article too wide and the composition less focused than the target.

2. **Primary figure:** Replace the large cream raster plate with the target’s dark in-product schematic. Style the figure as `height: 300px; padding: 0 22px 18px; background: linear-gradient(180deg, #0b2036 0%, #091a2d 100%); border: 1px solid #294763; border-radius: 8px; box-shadow: 0 14px 32px rgba(0,0,0,.22)`. The current cream figure is roughly 438px tall and visually overwhelms the page.

3. **Figure schematic nodes:** Build the five-step diagram as an equal-width grid using `grid-template-columns: repeat(5, 1fr); gap: 20px`, with each node at approximately `118px 114px`, `padding: 15px`, `background: #0a1d31`, `border: 1px solid #2d5872`, and `border-radius: 8px`. Use `32px` cyan line icons, purple emphasis on step 3, and an amber dashed border on step 5. The current circular infographic does not match the target’s compact card sequence or visual language.

4. **Article heading hierarchy:** Style the Thread Focus heading at `font-family: Georgia, serif; font-size: 34px; line-height: 1.08; font-weight: 700; letter-spacing: -0.02em; color: #f3f0eb; max-width: 690px; margin: 8px 0 8px`. The current live heading is either an oversized single-word title or part of a different scene template, losing the target’s prominent two-line editorial statement.

5. **Intro copy density:** Reduce the lead paragraph to `font-size: 17px; line-height: 1.52; font-weight: 400; color: #c4c9d3; max-width: 690px; margin-bottom: 14px`. The current lead is about 21px with a 31px line-height and occupies substantially more vertical space than the target.

6. **Running Example card:** Use `padding: 18px 16px; min-height: 262px; background: linear-gradient(145deg, rgba(15,34,56,.96), rgba(8,26,44,.96)); border: 1px solid #29435e; border-radius: 9px; box-shadow: inset 0 1px rgba(255,255,255,.025), 0 12px 28px rgba(0,0,0,.18)`. Restore the compact metadata grid below the identity pill using `grid-template-columns: 78px 1fr; row-gap: 9px; font-size: 12px`. The latest live card is taller, sparse, and replaces the target’s structured Role, Source, Versions, and Scope details with a large prose block.

7. **Thread Overview density:** Set the panel to `padding: 16px; border-radius: 8px; background: #091b2e; border: 1px solid #29435e`. Make each scene row `height: 40px; padding: 7px 11px; margin-top: 5px; border-radius: 6px; font-size: 12px`. The current rows are roughly 52px tall, pushing the panel to about 459px instead of the target’s approximately 390px. Keep the active row at `border-color: #8a64ff; background: linear-gradient(90deg, rgba(111,68,214,.34), rgba(111,68,214,.16))`.

8. **Thread Focus template consistency:** In this view, apply `display: none` to `.reading-companion`, `.on-this-page`, and `.thread-pagination`, and render only the Running Example and six-scene Thread Overview in the rail. One live capture shows a Reading Companion, an 11-scene page index, and bottom pagination, all absent from the target and producing a different hierarchy.

9. **Evidence Boundary block and essay CTA:** Place these directly beneath the figure with `margin-top: 10px`. Style the boundary as `padding: 10px 18px; border-left: 3px solid #e8b65d; background: linear-gradient(90deg, rgba(20,39,58,.88), rgba(10,27,45,.3)); font-size: 12px; line-height: 1.45`, followed by the CTA at `margin-top: 5px; font-size: 12px; font-weight: 600; color: #65d2e6`. The current split information panel is oversized and pushes the target’s concise warning and link below the initial viewport.

10. **Header scale and controls:** Reduce the site header to `height: 48px`, constrain its inner wrapper to `max-width: 1080px`, and use navigation text at `11px; font-weight: 500`. Ensure the right side includes the `AI AGENTS` pill at `height: 25px; padding-inline: 15px; border: 1px solid #344761; border-radius: 999px`. The latest live header is 59px tall and omits this target control.

**Keep as is:** Dark navy foundation, serif and sans-serif pairing, purple active-state treatment, outlined card language, cyan link accents, and the Back to essay control.

## 05 evidence focus

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/05_evidence-focus__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/07_evidence-receipts__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/astra/05-evidence--dark.jpg`

## Fidelity score: 5/10

1. **Page content grid:** The live layout is too wide, with the main column starting near `78px` and spanning about `914px`. Set the page container to `max-width: 1130px; margin-inline: auto;` and use `grid-template-columns: minmax(0, 818px) 298px; column-gap: 19px;`. This matches the target’s narrower editorial column and denser right rail.

2. **Evidence Focus header region:** The live page omits the target’s eyebrow and explanatory deck, causing the receipt card to begin too high. Add an uppercase eyebrow above the title at `12px/1.2`, `font-weight: 600`, `letter-spacing: 0.18em`, `color: #9BB6D8`, then a serif deck below the title at `20px/1.15`, `max-width: 760px`, `color: #B7C3D5`, with `margin-top: 8px`. Leave `16px` before the receipt card.

3. **Top utility row:** The live row only shows “Back to essay” and right-aligned links, while the target has a breadcrumb trail and boxed actions. Use `display: flex; align-items: center; height: 60px; border-bottom: 1px solid #1D3858;`. Style the back and action controls as `height: 34px; padding: 0 14px; border: 1px solid #29476D; border-radius: 7px; background: linear-gradient(180deg, #102744 0%, #0B1D36 100%);`.

4. **Primary receipt card hierarchy:** “The reviewer copy” currently appears as an oversized `31px` card heading with no receipt-summary icon treatment. Reduce it to `24px/1.15`, `font-weight: 700`; add a `32px` document icon at the left; and place the uppercase “RECEIPT SUMMARY” label above it at `10px`, `letter-spacing: 0.18em`, `color: #91A9C8`. Use `display: grid; grid-template-columns: 40px 1fr; gap: 16px`.

5. **Receipt card height and density:** The live card runs for roughly `685px` because metadata, callout, and related links are vertically expanded. Target a compact first receipt section around `470px` before the evidence capture: use `padding: 20px 18px`, section gaps of `14px`, and paragraph typography of `14px/1.45`. Remove or collapse the large metadata grid and related-figure block from the primary summary view.

6. **Supported claim and limitations block:** The live two-column text is oversized and visually plain. Use `grid-template-columns: 1fr 1fr; gap: 34px; padding: 16px 8px; border-top: 1px solid #244463; border-bottom: 1px solid #244463;`. Add `20px` cyan and amber status icons, set labels to `10px`, `font-weight: 600`, `letter-spacing: 0.16em`, and body copy to `14px/1.42`. Add `border-left: 1px solid #244463; padding-left: 34px` to the limitations column.

7. **Evidence artifact presence:** The live primary card has no large visual receipt beneath the claim analysis. Add an “EVIDENCE” section with `margin-top: 14px`, a `10px` uppercase label, and a full-width artifact frame at `height: 180px; border-radius: 9px; overflow: hidden; border: 1px solid #355678; background: #E8E5DE;`. Include a top-right redaction badge at `font-size: 10px; padding: 5px 9px; border-radius: 5px; background: #24354B; color: #F3F5F7`.

8. **Card plate treatment:** Live cards are flat navy with weak separation. Apply `background: linear-gradient(145deg, rgba(15,38,66,.96) 0%, rgba(7,24,45,.98) 100%); border: 1px solid #294A72; border-radius: 10px; box-shadow: 0 12px 30px rgba(0,8,24,.24), inset 0 1px 0 rgba(145,190,255,.05);`. Add a restrained blue edge glow using `0 0 24px rgba(43,115,214,.06)`.

9. **Receipt index density:** The live “RECEIPTS” card uses four tall rows of roughly `70px`; the target uses six compact rows around `43px`. Set rows to `min-height: 43px; padding: 7px 10px; gap: 10px; border-bottom: 1px solid rgba(63,92,128,.35);`. Use `13px/1.2` titles, `11px` metadata, `26px` numbered circles, and style the active row with `background: linear-gradient(90deg, #4932B8 0%, #28248C 100%); border: 1px solid #5C49DB; border-radius: 7px;`.

10. **Page background and typography contrast:** The live background is flatter and text is more muted than the target. Use `background-color: #06172B` with `radial-gradient(circle at 15% 25%, rgba(21,73,126,.18), transparent 36%)` and `radial-gradient(circle at 78% 60%, rgba(18,59,105,.12), transparent 42%)`. Set primary serif headings to `#F3F0EA`, body text to `#BBC7D8`, secondary text to `#8298B4`, and dividers to `#234261`.

**Keep as is:** The serif editorial title style, dark navy visual direction, two-column information architecture, uppercase micro-labels, outlined sidebar cards, and selected receipt emphasis are all aligned with the target.

## 06 figure viewer

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/06_figure-viewer__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/08_figure-viewer__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/astra/06-figure--dark.jpg`

## Fidelity score: 4/10

1. **Figure viewer modal sizing:** The live modal is approximately `1088px` wide and nearly the full viewport height, causing the footer and actions to fall below the fold. Set `width: min(968px, calc(100vw - 64px))`, `max-height: calc(100vh - 104px)`, `margin: 52px auto`, and `overflow: hidden`. Keep internal scrolling limited to the content area with `overflow-y: auto`.

2. **Enlarged figure stage:** The live figure is about `900px × 505px`, visually dominating the viewer. Constrain the media stage to `width: 100%`, `height: clamp(240px, 33vh, 264px)`, and use `object-fit: cover`. Apply `border-radius: 14px`, `overflow: hidden`, and `border: 1px solid rgba(155, 177, 209, 0.55)` instead of the current square, oversized presentation.

3. **Modal content alignment:** The live heading, image, and caption use inconsistent horizontal insets of roughly `40px` and `95px`. Give `.figure-viewer__body` a single `padding-inline: 60px`, then set the eyebrow, title, media, caption, and footer to `width: 100%` with no additional horizontal margins.

4. **Header structure and hierarchy:** The live header is a link-heavy toolbar with return controls on the left and text actions on the right. Use a `64px` header with `padding: 0 30px`, place “FIGURE VIEWER” at the left in `12px`, `font-weight: 700`, `letter-spacing: 0.14em`, and place the return-context helper plus a `34px × 34px` close icon button at the right. Add `border-bottom: 1px solid rgba(126, 151, 184, 0.24)`.

5. **Title scale and wrapping:** The live serif heading is approximately `31px`, bold, and wraps across two lines, consuming excessive vertical space. Set the figure title to `font-size: 28px`, `line-height: 1.1`, `font-weight: 500`, `letter-spacing: -0.015em`, and `margin: 4px 0 10px`. Keep the available line width large enough for a single line where the viewport permits.

6. **Modal plate treatment:** The live viewer uses a flat blue-gray panel and a low-contrast gray outline. Use `background: linear-gradient(135deg, #091D34 0%, #07182D 58%, #0A1B33 100%)`, `border: 1px solid rgba(103, 82, 255, 0.72)`, `border-radius: 14px`, and `box-shadow: 0 24px 70px rgba(0, 0, 0, 0.55), 0 0 28px rgba(75, 63, 220, 0.14), inset 0 1px rgba(255,255,255,0.04)`.

7. **Caption and action layout:** The live caption runs as a wide text block while the target uses a compact caption stack with actions aligned alongside it. Use `display: grid`, `grid-template-columns: minmax(0, 1fr) auto`, `gap: 24px`, and `margin-top: 16px`. Style the caption title at `14px/1.4`, `font-weight: 600`, description at `14px/1.45`, and keep the download button visible at `height: 36px`, `padding: 0 14px`, `border-radius: 9px`.

8. **Long-description control and metadata:** The live viewport does not expose the target’s secondary action row because of the oversized media and vertical spacing. Place it directly below the caption with `display: flex`, `align-items: center`, `gap: 16px`, and `margin-top: 12px`. Use a `36px` outlined button with `border: 1px solid #31577F`, `border-radius: 9px`, `font-size: 12px`, and a `16px` document icon.

9. **Backdrop treatment:** The live page behind the modal is blurred too heavily and loses all structural context. Set the overlay to `background: rgba(2, 10, 24, 0.76)` and `backdrop-filter: blur(2px) brightness(0.62)` rather than the current strong blur. Preserve recognizable page shapes while keeping the viewer dominant.

10. **Vertical density:** The live viewer uses roughly `28px` to `40px` gaps between toolbar, eyebrow, title, image, and caption. Reduce the body rhythm to `20px` top padding, `6px` eyebrow-to-title spacing, `10px` title-to-media spacing, `16px` media-to-caption spacing, and `20px` bottom padding so all viewer controls remain visible without scrolling.

**Keep as is:** Centered modal presentation, dark navy visual direction, serif figure-title styling, uppercase figure eyebrow, and the clear separation between the viewer and dimmed essay context.

## 07 managed variation inline

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/07_managed-variation-inline__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/06_managed-variation__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/astra/07-variation--dark.jpg`

## Fidelity score: 4/10

1. **Managed Variation section layout:** Set the desktop content grid to `grid-template-columns: minmax(0, 790px) 308px`, `column-gap: 34px`, and `max-width: 1124px`. The live build alternates between an approximately 750px main pane and an oversized 890px pane, while the target keeps a stable 790px article column aligned beside the reading companion.

2. **Inline explanatory comparison component:** Replace the live full-width “Signature diagram” presentation and the plain three-column card with one consistent inline plate directly below the section introduction. Use `width: 100%`, `min-height: 260px`, `padding: 14px 18px 16px`, `border: 1px solid #29476d`, `border-radius: 12px`, `background: linear-gradient(145deg, #091a31 0%, #07172b 58%, #0a1c34 100%)`, and `box-shadow: inset 0 1px 0 rgba(132,176,255,.08), 0 12px 30px rgba(0,0,0,.18)`.

3. **Comparison card content structure:** Restore the target’s compact header row, three decision labels, explanatory copy, and bottom action rows. Style the header as `display:flex; justify-content:space-between; margin-bottom:14px`; use `font-size:10px`, `font-weight:700`, `letter-spacing:.16em`, `text-transform:uppercase`, and `color:#a987ff`. Each action row should be `height:32px`, `padding:0 11px`, `border:1px solid #49688f`, `border-radius:7px`, `background:rgba(9,25,47,.72)`, and `font-size:12px`.

4. **Three comparison states:** The live lower card uses large generic columns with sparse icons and no contained decision areas. Set the inner grid to `grid-template-columns: repeat(3, 1fr)`, with `gap:0`; give columns two and three `border-left:1px solid rgba(112,145,187,.28)` and all columns `padding:0 20px`. Keep each mini-diagram centered in a `height:105px` region, with primary file icons around `44px × 56px`, connector/badge icons `30px`, and cyan, violet, and amber accents of `#55d8ff`, `#9a72ff`, and `#f5bd63`.

5. **Managed Variation heading hierarchy:** The live section heading is about 36px and dominates the page. Match the target with `font-family: Georgia, "Times New Roman", serif`, `font-size:30px`, `line-height:1.08`, `font-weight:700`, `letter-spacing:-.015em`, `color:#f3f1ee`, and `margin:6px 0 6px`.

6. **Section marker and left rule:** Replace the large boxed “02” treatment with the target’s compact eyebrow and slim rule. Use `border-left:2px solid #8d65ff`, `padding-left:18px`, `font-size:10px`, `font-weight:700`, `letter-spacing:.18em`, `text-transform:uppercase`, `color:#a987ff`, and `margin-bottom:8px`. Remove the numbered box from this managed-variation section with `display:none`.

7. **Article typography and vertical density:** The live body text is approximately 20 to 22px with broad line spacing, making the region much taller than the target. Set article paragraphs around this component to `font-size:17px`, `line-height:1.42`, `font-weight:400`, `color:#c6c7d3`, and `margin:0 0 10px`; constrain the section intro to `max-width:780px`.

8. **Reading Companion sidebar:** Unify both live sidebar variants into the target plate at `width:308px`, `border:1px solid #29476d`, `border-radius:12px`, `background:rgba(8,24,45,.92)`, and `box-shadow:inset 0 1px 0 rgba(124,164,225,.06)`. Use `padding:16px 15px`; make rows `min-height:29px`, `padding:6px 10px 6px 34px`, `font-size:12px`, and highlight the active row with `background:linear-gradient(90deg, rgba(91,65,201,.34), rgba(56,92,173,.18))` plus a `#8f6cff` timeline dot.

9. **Sidebar content density:** The live side rail includes oversized author, executive-signal, and running-example cards that compete with the article, while the target uses one compact companion card with a thread dock and metadata footer. Limit auxiliary blocks within this rail to `padding:14px 16px`, separate them with `border-top:1px solid rgba(77,108,150,.28)`, use `font-size:11px`, `line-height:1.45`, and keep the total visible companion plate near `408px` tall.

10. **Page color and borders:** The live implementation is flatter and grayer than the target. Set the article canvas to `background:#06162a`, main text to `#c8c8d2`, display headings to `#f4f1ee`, subdued labels to `#8391aa`, and standard dividers to `1px solid rgba(77,105,151,.55)`. Reserve saturated violet `#8f62ff` for active states and cyan `#55cfff` for update-state accents.

**Keep as is:** The dark navy visual system, serif editorial headings, three-state comparison concept, sticky right rail, restrained cyan/violet/amber state coding, and rounded bordered cards.

## 08 conclusion / reading path

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/08_conclusion-reading-path__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/09_conclusion__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/astra/08-conclusion--dark.jpg`

## Fidelity score: 4/10

1. **Conclusion sequence and component order:** The live page moves from the reading-path card into long prose and Sources, without the target’s distinct closing argument block. Set the article stack to `display: flex; flex-direction: column`, then order the regions as closing figure, conclusion block, “Where this sits,” and Sources. Render the conclusion as a dedicated block with `border-left: 2px solid #7357ff; padding-left: 16px; margin-top: 26px;` and `display: block`.

2. **Main content and right rail grid:** The live main column is approximately 890px wide and visually overwhelms the rail. Set the page shell to `max-width: 1068px; margin-inline: auto; padding-inline: 28px; display: grid; grid-template-columns: minmax(0, 724px) 260px; column-gap: 20px;`. Add `border-right: 1px solid #18314b; padding-right: 18px;` to the main column.

3. **Closing figure plate:** The live figure is a tall, dark hero with prominent overlaid title and annotations, while the target uses a shallow, bright architectural plate followed by a small caption. Set the figure to `width: 100%; aspect-ratio: 3.4 / 1; max-height: 214px; overflow: hidden; border-radius: 7px;`. Use `object-fit: cover`, remove the heavy dark overlay, and target `filter: brightness(1.08) saturate(0.82) contrast(0.94)`. Place the caption below at `margin-top: 7px; font-size: 10px; line-height: 1.4; color: #8291a7;`.

4. **“Where this sits” composition:** The live reading path is detached above the prose in one screenshot and reduced to a compressed timeline in the other. Wrap the heading, one-line explanation, and three navigation columns in one outer card using `margin-top: 26px; padding: 12px 16px 14px; border: 1px solid #4f4a9a; border-radius: 7px; background: linear-gradient(135deg, #0b1b31 0%, #0d1930 72%, #15143a 100%);`. Inside, use `display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;`, with a `1px solid #40516c` top rule on each item.

5. **Article typography scale:** The live lower-page prose is oversized serif text at roughly 21px with a loose line height, making the conclusion much denser and taller than the target. Set conclusion body copy to `font-family: Inter, system-ui, sans-serif; font-size: 15px; line-height: 1.52; font-weight: 400; color: #c5cbd7;`. Set the conclusion heading to `font-family: Georgia, serif; font-size: 28px; line-height: 1.15; font-weight: 700; letter-spacing: -0.015em; color: #f2f0ee;`.

6. **Reading Companion rail:** The live rail is overloaded with “Running Example” and “Contextual Note” content and extends to roughly 760px tall. For this conclusion viewport, hide those secondary modules with `display: none` and keep a single companion card at `width: 260px; padding: 16px; border: 1px solid #29425d; border-radius: 8px; background: rgba(9, 25, 44, 0.88);`. Add the Thread Dock beneath the section list with `margin-top: 18px; padding-top: 16px; border-top: 1px solid #223951;`.

7. **Section list density and active state:** The live “On this page” list is smaller and more crowded, with many entries visible simultaneously. Use `font-size: 12px; line-height: 1.35; row-gap: 11px;`. Give each row `min-height: 28px; padding: 6px 8px 6px 20px; border-radius: 5px;`. Set the active row to `background: #142847; color: #f1f2f6;`, with a `10px` circular marker using `background: #755cff; border: 2px solid #f4f1ff; box-shadow: 0 0 0 3px rgba(117,92,255,.18);`.

8. **Card borders and depth:** Live panels use brighter blue outlines and flatter fills than the target’s restrained navy plates with selective violet edging. Standardize regular cards to `background: #091a2d; border: 1px solid #263e58; border-radius: 8px; box-shadow: 0 10px 28px rgba(0, 5, 15, .18);`. Reserve `#6654c7` borders and `0 0 22px rgba(91,70,220,.10)` glow for the reading-path card only.

9. **Vertical rhythm around the conclusion:** The live layout has a large gap between the reading-path card and prose, followed by long uninterrupted text. Use `gap: 0` on the article stack, `margin-top: 26px` before the conclusion, `margin-block: 10px 0` between conclusion paragraphs, and `margin-top: 26px` before “Where this sits.” Keep the conclusion block to approximately `165px` to `180px` tall at desktop width.

10. **Top navigation height and emphasis:** The live header is taller and gives every navigation item similar prominence. Set the header to `height: 52px; padding-inline: 28px; background: rgba(7, 20, 36, .96); border-bottom: 1px solid #19324c;`. Use `font-size: 11px; font-weight: 500; color: #b2bbca; gap: 28px;`, with the active item at `color: #ffffff; border-bottom: 2px solid #785dff; padding-bottom: 12px;`.

**Keep as is:** The deep navy foundation, violet and cyan accent family, serif display headings, compact top navigation pattern, and right-side section-progress concept.

## 09 mobile

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/09_mobile-modes__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/10_mobile__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/astra/09-mobile-entry--dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/astra/09-mobile-thread--dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/astra/09-mobile-evidence--dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/astra/09-mobile-contents--dark.jpg`

## Fidelity score: 4/10

1. **Global mobile type scale and density:** The live pages use near-desktop typography, making every view substantially taller and less scannable than the target. Set article `h1` to `28px/1.06`, `font-weight: 700`, body copy to `16px/1.42`, metadata to `11px/1.35`, and section labels to `10px/1.2` with `letter-spacing: .16em`. The live hero title appears roughly `46px`, while body text appears `26–30px`.

2. **Mobile page container:** The live layout has approximately `26px` side padding but scales content for a much wider canvas. Constrain the reading column to `max-width: 390px`, center with `margin-inline: auto`, and use `padding-inline: 18px`. Use `20–24px` vertical gaps between major blocks instead of the current `36–56px`.

3. **Article header and navigation:** The live header is approximately `100px` tall with an oversized logo and widely separated utility icons. Set the app header to `height: 56px`, `padding: 0 18px`, background `#061529`, and `border-bottom: 1px solid #203651`. Size the brand mark to `20px` high, wordmark to `11px` with `letter-spacing: .18em`, and utility icons to `20px` with `20px` gaps. Add the target’s outlined **Contents** control at the right, `height: 30px`, `padding: 0 12px`, `border: 1px solid #355276`, `border-radius: 5px`.

4. **Hero image treatment:** The live hero image is too tall and detached from the typography below. Set `.hero-media` to `aspect-ratio: 2.25 / 1`, `width: 100%`, `object-fit: cover`, `border-radius: 4px`, and `margin-top: 8px`. Place the caption directly below at `10px/1.3`, color `#AAB4C5`, rather than using the large dark caption plaque currently overlaid at the lower left.

5. **Hero metadata and tags:** The live metadata wraps across large, loosely spaced rows and the tag pills are oversized. Use `display:flex; flex-wrap:wrap; gap:6px 8px`; set pills to `height: 22px`, `padding: 0 9px`, `font-size: 10px`, `border: 1px solid #314766`, `border-radius: 999px`, background `rgba(18,39,67,.55)`. Keep the category pill uppercase at `font-weight:600; letter-spacing:.06em`. Target spacing from hero image to metadata is `12px`, metadata to title `12px`, and title to excerpt `10px`.

6. **Contents presentation:** The live Contents view is a very tall, opaque bottom sheet with a large `40px` serif heading and `28px` list text. Match the target’s compact contents treatment: sheet background `#071629`, `border: 1px solid #233C5E`, `border-radius: 16px 16px 0 0`, `padding: 18px 16px 16px`; title `20px/1.2`, list text `13px/1.3`, rows `height: 36px`, and dividers `#203650`. Add the target hierarchy with a `10px` uppercase “ON THIS PAGE” label, a vertical `1px` timeline in `#405A82`, `10px` nodes, and an active row background `#12264B` with `border-radius: 5px`. Remove the live sheet’s excessive `44–56px` row heights.

7. **Thread Focus region:** The live Thread Focus screenshot displays another article scene rather than the target discussion thread. Add a comment-thread stack beneath the section header using `display:grid; grid-template-columns:28px 1fr; gap:10px`; avatars `28px`, vertical connector `1px solid #35496A`, author text `11px/600`, timestamp `9px #8390A7`, comment body `12px/1.45`, and reaction controls `10px`. Separate the introductory section from comments with `border-top:1px solid #203650; margin-top:20px; padding-top:16px`.

8. **Evidence Focus component system:** The live Evidence view is dominated by one oversized receipt card, while the target uses multiple compact evidence cards with distinct figure, source, and related-reading variants. Use a vertical card stack with `gap:10px`; each card should have `padding:12px`, background `linear-gradient(145deg,#0B1A31 0%,#081426 100%)`, `border:1px solid #294261`, `border-radius:7px`, and `box-shadow:0 8px 20px rgba(0,0,0,.22)`. Card titles should be `13px/1.25`, descriptions `11px/1.35`, labels `8px/1.2` with `letter-spacing:.16em`, and violet icons `18px` in `#9B6CFF`.

9. **Figure and mini-diagram treatment:** Live figures use large full-width white plates that overpower the dark interface. For evidence cards, constrain figure previews to `height:92px`, `object-fit:cover`, `border-radius:2px`, and `margin-top:10px`. For inline article figures, use a dark plate `#0A1B31`, `padding:10px`, `border:1px solid #29425F`, `border-radius:7px`; keep the artwork inside at `aspect-ratio:1.9/1`. Set figure labels to `10px`, uppercase, color `#79D7E8`, with `letter-spacing:.12em`.

10. **Color, borders, and glow:** The live build is visually flat and gray compared with the target’s blue-violet depth. Use page background `#041224`, elevated plates `#091A31`, primary text `#F2EEE8`, secondary text `#B7BFCE`, border `#294363`, cyan accent `#7DD8E8`, and violet accent `#9565FF`. Apply focused controls/cards a restrained glow, `box-shadow:0 0 0 1px rgba(119,105,255,.35), 0 0 18px rgba(93,63,255,.16)`, rather than increasing component size.

**Keep as is:** Dark navy editorial palette, serif display face, rounded tag language, thin blue-gray dividers, and the use of bordered figure/card containers.
