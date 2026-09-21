# Tier A fidelity review (gpt-5.6-sol on ICA ccx)

## 01 essay entry (hero, title block, author card, executive signal)

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/01_essay-entry__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/01_essay-entry__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/entry-tall__desktop-tall__dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/executive-signal__desktop__dark.jpg`

## Fidelity score: 4/10

1. **Essay entry grid and hero region:** Change the page shell from the current full-width stacked hero to a two-column grid at desktop: `grid-template-columns: minmax(0, 756px) 266px; gap: 22px; max-width: 1118px; margin-inline: auto;`. The hero must occupy only the left column, with the author card starting at the same top edge in the right column.

2. **Hero image sizing:** The live hero is roughly 1100 × 620px and dominates the entire viewport. Set `.essay-hero` to `width: 100%; height: 220px; aspect-ratio: auto; object-fit: cover; border-radius: 8px; overflow: hidden;`. Remove the oversized outer frame and use `border: 1px solid #243A5C; box-shadow: 0 10px 30px rgba(0,0,0,.22);`.

3. **Title block vertical rhythm:** Move breadcrumbs, metadata, title, dek, tags, and revision row directly beneath the compact hero with `margin-top: 18px`. Use `h1 { font-size: 43px; line-height: 1.08; font-weight: 600; letter-spacing: -0.025em; max-width: 760px; margin: 12px 0 14px; }`. The current title begins far below the image and reads smaller relative to the oversized hero.

4. **Author card treatment:** Replace the live opaque gray plate with the target dark glass card: `background: linear-gradient(145deg, rgba(13,29,51,.96), rgba(10,23,42,.92)); border: 1px solid #29476B; border-radius: 9px; padding: 16px; box-shadow: 0 10px 28px rgba(0,0,0,.2);`. Size the avatar to `38px`, author name to `18px/1.15` at `600`, body copy to `12px/1.45`, and keep the card near `182px` tall rather than the current tall, light slab.

5. **Executive Signal card:** Replace the live two-column “Why this matters / Carry this forward” treatment with one compact highlighted card immediately below the author card. Use `min-height: 164px; padding: 17px 15px; border-radius: 9px; background: linear-gradient(145deg, #191A48 0%, #15143B 58%, #101D3B 100%); border: 1px solid #5548A8; box-shadow: inset 0 0 28px rgba(108,74,255,.12), 0 8px 22px rgba(0,0,0,.2);`. Set its headline to `20px/1.12`, `font-weight: 600`, and supporting text to `12px/1.4`.

6. **Reading Companion sidebar:** Add the missing desktop sticky navigation directly beneath Executive Signal: `position: sticky; top: 76px; padding: 15px; border: 1px solid #29476B; border-radius: 9px; background: #0B1B30;`. Target width is `266px`; section rows should be `font-size: 11px; min-height: 25px; padding: 5px 8px 5px 28px`, with the active row on `background: #17294A` and a `#756CFF` timeline marker.

7. **Revision notice density:** The live expanded revision content and duplicated sidebar summary consume too much height. Render the entry-state notice as a single collapsed row: `height: 38px; padding: 0 4px; margin-top: 12px; border-top: 1px solid #233752; border-bottom: 1px solid #233752; background: transparent; font-size: 11px;`. Keep the disclosure icon left and read time right.

8. **Metadata and taxonomy styling:** Consolidate the live series badge, date row, and tags into tighter lines. Use `gap: 10px`, `font-size: 11px`, `line-height: 1`, and `margin-block: 10px`. Pills should be `height: 24px; padding: 0 12px; border: 1px solid #3A5274; border-radius: 999px; background: rgba(16,31,54,.72); color: #B9C5DA;`, rather than the current scattered low-contrast badges.

9. **Page density and first section position:** Reduce the accumulated whitespace so the first section heading appears within the initial desktop viewport, as in the target. Set the title-area bottom margin to `24px`, remove large spacer margins around the revision module, and use `.essay-section { margin-top: 26px; }`. The current implementation delays article content by several hundred pixels.

10. **Global color and type contrast:** Darken the page canvas to `#071425` with a subtle `radial-gradient(circle at 25% 0%, rgba(20,53,91,.18), transparent 42%)`. Use `#F2EFEA` for serif headings, `#B8C2D3` for body text, and `#7790B1` for secondary metadata. The live gray cards and muted body text flatten the hierarchy compared with the target’s navy plates, cool borders, and violet accents.

**Keep as is:** The restrained dark navigation, serif editorial headline style, rounded taxonomy pills, hero artwork crop quality, and consistent cool-blue accent family.

## 02 first scroll (section marker, pull quote, first figure, companion rail)

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/02_first-scroll__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/02_first-scroll__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/first-scroll__desktop__dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/threadscene-incident__desktop__dark.jpg`

## Fidelity score: 2/10

1. **First-scroll content order and viewport composition:** The live view is still dominated by a roughly `1100px × 620px` photographic hero, with the article title only appearing below it. In the target first-scroll state, the hero and title are already above the viewport. Position the post-hero content immediately after the header and ensure this state begins with the revision strip, introductory sentence, pull quote, section marker, and first figure visible. The visible content area should start around `top: 106px`, not with the hero media.

2. **Main article and companion-rail grid:** The live article uses an approximately `1150px` wide single composition with an author card on the right. Change the first-scroll wrapper to `display: grid; grid-template-columns: minmax(0, 705px) 272px; column-gap: 42px; max-width: 1020px; margin-inline: auto; align-items: start;`. Add a `1px solid #183354` divider between columns via `border-left` on the rail wrapper or a positioned separator.

3. **Reading Companion rail:** The target has a persistent Reading Companion beginning level with the first-scroll content, while the live view shows only an author biography card. Hide the author card in this region and render the companion as `position: sticky; top: 112px; width: 272px; padding: 16px; border: 1px solid #25496f; border-radius: 9px; background: linear-gradient(180deg, #091a31 0%, #07162a 100%); box-shadow: 0 12px 30px rgba(0,0,0,.22);`. Use `12px` uppercase headings at `600` weight and `0.08em` letter-spacing, with navigation rows around `28px` high.

4. **Pull quote placement and treatment:** The target quote is a compact horizontal plate above the numbered section, but no equivalent appears in the live first-scroll viewport. Add it at `width: 100%; min-height: 106px; margin: 22px 0 25px; padding: 20px 28px 18px 56px; border-left: 4px solid #9d7cff; background: linear-gradient(100deg, rgba(27,55,91,.72) 0%, rgba(10,27,50,.48) 100%);`. Set quote text to a serif italic `28px/1.35`, color `#f1eef8`, and the decorative quote mark to `42px`, color `#7898ef`.

5. **Section marker and title hierarchy:** The live title block uses a large standalone serif heading and lacks the target’s compact numbered marker with active rule. Build the section header as a two-column grid, `grid-template-columns: 40px 1fr; gap: 14px; border-left: 3px solid #8f72ff; padding-left: 12px;`. Style the number box as `40px × 38px`, `border: 1px solid #274a73`, `border-radius: 8px`, `font-size: 14px`, and `color: #b9a7ff`. Set the section eyebrow to `10px/1.2`, `font-weight: 600`, `letter-spacing: .22em`, and the section heading to `30px/1.15` serif, rather than the live approximately `38px` article-title scale.

6. **First figure type, scale, and density:** The live implementation presents a bright photographic image as the dominant figure. The target’s first figure is a compact dark schematic embedded inside the article column. Constrain the first figure to `width: 100%; height: 219px; margin-top: 14px; overflow: hidden; border: 1px solid #285078; border-radius: 8px; background: radial-gradient(circle at 50% 45%, #102746 0%, #08182d 72%); box-shadow: inset 0 1px rgba(255,255,255,.03);`. Use diagram cards around `155px × 100px` with `8px` radii and cyan or violet `1px` borders, instead of a full-width editorial photograph.

7. **Revision strip and introductory sentence:** These target components are absent from the visible live state. Add a `705px` wide revision strip above the intro with `height: 38px; padding: 0 14px; display: flex; align-items: center; justify-content: space-between; border: 1px solid #1f4166; border-radius: 8px; background: #081a30; color: #9fc7e8; font-size: 11px;`. Follow it with an intro paragraph using `margin: 18px 0 0; font: 17px/1.65 Georgia, serif; color: #d9dce6;`.

8. **Overall vertical density:** The live composition has very large vertical blocks and substantial empty travel before article content. Reduce spacing in the first-scroll region to approximately `18px` between the revision strip and intro, `16px` between intro and quote, `25px` between quote and section heading, `18px` between heading and body, and `12px` between body and figure. Avoid the current `70px+` gaps around the hero/title area.

9. **Header height and visual weight:** The live header is a flat light navy bar around `58px` high, while the target uses a darker, more compact application header with a clear lower border. Set the header to `height: 50px; background: rgba(5,18,35,.96); border-bottom: 1px solid #1a3657; box-shadow: 0 4px 16px rgba(0,0,0,.18);`. Keep navigation at `12px`, with the active item using `border-bottom: 2px solid #a888ff`.

10. **Page color plates and borders:** The live background is comparatively flat and several content areas lack separation. Use `body { background: radial-gradient(circle at 35% 10%, #0c2240 0%, #07162b 42%, #051326 100%); color: #e8e9ef; }`. Apply restrained blue borders `#203f63` to interactive plates, violet accents `#9475ff` only for active states, and avoid the light gray `#202a40` author-card plate in the first-scroll rail.

**Keep as is:** Dark navy visual direction, serif editorial headings, restrained lavender accents, centered desktop navigation, and strong text contrast.

## 04 thread focus

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/04_thread-focus__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/04_thread-deployment__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/thread-focus-route__desktop__dark.jpg`

## Fidelity score: 5/10

1. **Thread figure:** The full-viewport build uses a tall white editorial image, while the other build uses an overly dense two-column registry diagram. Replace the figure surface with a five-step horizontal flow: `.thread-figure { height: 298px; padding: 14px 22px 18px; background: linear-gradient(180deg, #081d34 0%, #06172b 100%); border: 1px solid #234b72; border-radius: 8px; box-shadow: inset 0 1px 0 rgba(120,190,255,.08), 0 10px 30px rgba(0,0,0,.18); }`. Use `.figure-flow { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:20px; }`, with 114px-high dark cards, 8px radii, cyan borders, and 20px icons. Keep the third card purple and the final card amber.

2. **Reading Companion panel:** The framed live build adds a large purple “Reading Companion” panel above “Running Example,” pushing all sidebar content down. It is not present in the target focus view. Apply `.thread-focus .reading-companion { display:none; }` and place “Running Example” at the top of the sidebar.

3. **Thread title hierarchy:** The full-viewport “Incident” title is too small and visually weak. At desktop width, use `.thread-focus h1 { font-family: Georgia, "Times New Roman", serif; font-size: 36px; line-height: 1.08; font-weight: 700; letter-spacing: -0.02em; color: #f5f1ea; max-width: 700px; margin: 8px 0 30px; }`. Do not reduce this below 34px at a 1400px viewport.

4. **Thread Overview card:** The full-viewport build shows one flat gray selected row and unboxed text links; the framed build compresses the overview into tiny rows. Use a 287px-wide card with `padding: 18px`, `background: rgba(7,23,42,.82)`, `border: 1px solid #244665`, and `border-radius: 8px`. Give every scene row `height: 40px; padding: 7px 11px; margin-top: 5px; border: 1px solid #244665; border-radius: 6px;`. Style the active row with `background: linear-gradient(90deg, rgba(100,55,190,.38), rgba(65,37,118,.42)); border-color: #8c62ff; box-shadow: 0 0 18px rgba(103,65,255,.16);`.

5. **Running Example card:** The full-viewport card is too flat, sparse, and opaque, while the framed version is overly detailed and compressed. Set `.running-example { min-height: 262px; padding: 18px; background: linear-gradient(145deg, rgba(10,29,51,.94), rgba(6,21,39,.9)); border: 1px solid #294b6d; border-radius: 8px; box-shadow: 0 12px 32px rgba(0,0,0,.18); }`. Use a 22px serif title, 12px body text at 1.5 line-height, a pill with `border: 1px solid #355777; border-radius: 999px; padding: 4px 10px`, and four 24px detail rows.

6. **Evidence Boundary and essay return link:** Both live compositions omit the target’s amber callout immediately below the figure, and the framed build substitutes paragraph text and previous/next navigation. Add `.evidence-boundary { display:block; margin-top:10px; padding:9px 16px; border-left:3px solid #f0b95d; background:linear-gradient(90deg,rgba(240,185,93,.09),rgba(240,185,93,0)); }`, with a 13px/700 amber heading and 12px/1.4 body. Add the cyan “Read this scene in the essay” link below it, and hide `.thread-focus .previous-next-nav { display:none; }` in this view.

7. **Main content density:** The framed live build renders labels, metadata, diagram text, and sidebar rows around 20 to 30 percent smaller than the target. Set the primary copy to `font-size: 16px; line-height: 1.58`, figure labels to `12px`, card headings to `14px/700`, and eyebrow labels to `10px/700; letter-spacing: .18em`. Avoid any page-level `transform: scale()` or desktop font-size below `16px`.

8. **Figure header and caption treatment:** The live figures lack the target’s clear internal hierarchy. Add a 34px top bar with `padding: 0 16px`, `border-bottom: 1px solid #214563`, an uppercase 10px label with `.18em` tracking, and a cyan right-aligned “Enlarge figure” action. Keep the caption inside the plate with `margin-top:14px; padding-top:10px; border-top:1px solid #294b69; font-size:11px; color:#aebcd0;`.

9. **Global color and plate contrast:** The full-viewport build is flatter and grayer than the target. Use `body { background: radial-gradient(circle at 44% 18%, rgba(20,73,116,.24) 0%, rgba(5,21,40,0) 45%), #041429; color:#bbc7d8; }`. Standardize panel borders to `#244665`, cyan accents to `#6fd8ff`, purple accents to `#8a63ff`, amber accents to `#efbc68`, and panel radii to `8px`.

10. **Site header scale:** The full-viewport header is 58px tall with an undersized brand mark and oversized navigation. Match the target with `.site-header { height:50px; background:rgba(5,20,39,.96); border-bottom:1px solid #173653; }`, a 104px-wide logo lockup, and navigation at `font-size:11px; font-weight:500; letter-spacing:0`.

**Keep as is:** The desktop two-column structure, approximately 720px article column plus 287px sidebar, 28 to 30px gutter, dark navy foundation, serif editorial voice, and top back-to-essay control are aligned well with the target.

## 05 evidence focus

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/05_evidence-focus__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/07_evidence-receipts__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/evidence-focus-index__desktop__dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/evidence-record__desktop__dark.jpg`

## Fidelity score: 3/10

1. **Receipt route shown as “404 Page not found”: component presence and page shell.** One tested receipt URL does not render the evidence-focus interface at all. Mount the same evidence-focus layout for every receipt route, using `max-width: 1136px`, `grid-template-columns: minmax(0, 818px) 299px`, `gap: 20px`, and `margin: 16px auto 0`.

2. **Main receipt region: replace the flat metadata presentation with the target receipt-summary card.** The live page uses a borderless `#141D30` metadata block followed by detached support text. Wrap the summary, claims, limitations, and evidence in one plate with `background: linear-gradient(145deg, #0B1B33 0%, #08162A 100%)`, `border: 1px solid #29496D`, `border-radius: 12px`, `padding: 18px`, and `box-shadow: 0 12px 32px rgba(0,0,0,.22), inset 0 1px 0 rgba(120,180,255,.05)`.

3. **Evidence asset area: component is missing.** The target ends the receipt card with a large captured-document preview, while the live page only shows a sentence saying no asset is published. Render an evidence-media frame at `width: 100%`, `min-height: 190px`, `margin-top: 16px`, `border-radius: 9px`, `overflow: hidden`, `border: 1px solid #274868`, and `background: #E8E5DD`; use `object-fit: cover` for the capture and position a redaction badge at `top: 12px; right: 12px`.

4. **Hero hierarchy: title is oversized and supporting introduction is absent.** The live title is approximately `52px` and dominates the page; the target is about `40px`. Set `.evidence-focus h1` to `font-size: 40px`, `line-height: 1.02`, `font-weight: 700`, `letter-spacing: -0.02em`, `color: #F2F1F4`, and `margin: 4px 0 8px`. Add the introductory deck beneath it at `20px/1.15`, `max-width: 760px`, and `color: #C7CAD5`.

5. **Supported claim and limits: layout is detached and lacks target visual signals.** Move both sections inside the receipt card and use `display: grid; grid-template-columns: 1fr 1fr; gap: 0`. Add a vertical divider with `border-left: 1px solid #24415F` and `padding-left: 36px` on the limits column; use `padding-right: 36px` on the claim column. Add `20px` circular cyan and amber status icons, with `#63C9EA` and `#FFB85B`, aligned `top: 4px`.

6. **Receipt heading block: current metadata grid does not match the compact summary hierarchy.** Replace the six-field panel with a document icon and title row. Use a `30px` outlined icon in `#9FD8FF`, a `12px` uppercase eyebrow at `letter-spacing: .18em`, a `23px/1.15` serif title, and a `14px` muted date line in `#AAB4C8`. Keep the summary header around `92px` tall before the claim divider.

7. **Right sidebar receipt index: rows lack the target navigation treatment.** The live list is plain text with one gray selected block. Style each row as a `46px` grid with `grid-template-columns: 32px 1fr 18px`, `gap: 10px`, `border-bottom: 1px solid rgba(92,130,170,.16)`. Add `28px` numbered circles and right-arrow icons. Use `background: linear-gradient(90deg, #5030C8 0%, #28208A 100%)`, `border: 1px solid #6544E2`, and `border-radius: 8px` for the active row.

8. **Top evidence toolbar: controls are visually underdeveloped.** The live back action is an unboxed text link and the right action is plain text. Use `height: 34px`, `padding: 0 15px`, `border: 1px solid #29496D`, `border-radius: 7px`, `background: linear-gradient(#10213C, #0B1930)`, and `color: #DCE7F5` for Back and Open controls. Add the breadcrumb and receipt position between them in `12px`, `color: #8498B6`.

9. **Page density and alignment: live content is narrower with excess empty space.** Increase the content shell from roughly `1058px` to `1136px`, reduce the column gap from about `31px` to `20px`, and move the shell upward with `padding-top: 16px`. Set the primary column to `818px` and sidebar to `299px`, matching the denser target composition.

10. **Sidebar plates and overall color treatment: live surfaces are too flat and gray.** Set the page background to `#061225`; use sidebar cards with `background: linear-gradient(155deg, #0D1D35 0%, #09172A 100%)`, `border: 1px solid #29496D`, `border-radius: 11px`, and `padding: 18px 20px`. Use `#F0F2F7` for primary text, `#AEB9CC` for body text, and uppercase labels at `11px`, `font-weight: 600`, `letter-spacing: .16em`.

**Keep as is:** dark navy theme, serif display type paired with sans-serif UI text, persistent top navigation, and the basic two-column evidence-plus-sidebar structure.

## 06 figure viewer

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/06_figure-viewer__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/08_figure-viewer__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/figure-viewer__desktop__dark.jpg`

## Fidelity score: 4/10

1. **Figure Viewer presentation mode:** The standalone live screenshot renders the viewer as a full-page route on a flat `#071126` background. Preserve the essay behind the viewer and use a fixed overlay: `position: fixed; inset: 0; background: rgba(2, 11, 25, 0.76); backdrop-filter: blur(1px); display: grid; place-items: center; z-index: 1000`.

2. **Figure Viewer modal dimensions:** The modal live build is approximately `823px` wide and `536px` tall, while the target is about `968px` by `574px`. Set `width: min(968px, calc(100vw - 64px)); min-height: 574px; max-height: calc(100vh - 64px);` and center it vertically and horizontally.

3. **Modal header controls:** The live header adds a cube icon, “Expanded figure state,” slide count, previous/next buttons, and separators. The target has only the `FIGURE VIEWER` label on the left and return-context copy plus a single close button on the right. Hide the extra controls for this state and use `height: 66px; padding: 0 28px 0 32px; border-bottom: 1px solid rgba(130, 165, 205, 0.22)`.

4. **Figure title hierarchy:** In the modal live build, the figure title appears below the image; in the target it sits above the image as a dedicated title block. Move the eyebrow and title before the media with `margin: 20px 60px 10px;`, eyebrow `font-size: 11px; font-weight: 700; letter-spacing: 0.18em; color: #b8c5d9`, and title `font-size: 27px; line-height: 1.08; font-weight: 600; color: #f2f0ea`.

5. **Enlarged figure geometry:** The live modal image is too tall and diagram-like, approximately `777px × 343px`; the target uses a wide cinematic frame around `850px × 264px`. Set the media wrapper to `margin: 0 59px; width: calc(100% - 118px); aspect-ratio: 3.22 / 1; overflow: hidden; border-radius: 13px;` and the image to `width: 100%; height: 100%; object-fit: cover`.

6. **Modal plate treatment:** The live modal is flatter and more uniformly navy. Apply `background: linear-gradient(145deg, #071b33 0%, #06182f 58%, #081d36 100%); border: 1px solid rgba(104, 82, 255, 0.72); border-radius: 15px; box-shadow: 0 24px 70px rgba(0, 0, 0, 0.58), 0 0 34px rgba(54, 72, 255, 0.13), inset 0 1px 0 rgba(255,255,255,0.035)`.

7. **Caption and context layout:** The live modal compresses caption content into a left column and creates a tall download/link rail. The target uses a nearly full-width caption stack with one compact download button aligned right. Use `display: grid; grid-template-columns: minmax(0, 1fr) auto; column-gap: 24px; padding: 16px 59px 20px;`, body copy `font-size: 13px; line-height: 1.45; color: #aebbd0`, and keep the caption text width near `690px`.

8. **Secondary action row:** The target places “View long description” below the caption with a vertical divider and explanatory text, while the live modal elevates long description beside the title and splits download/copy actions into a side rail. Set the secondary row to `display: flex; align-items: center; gap: 16px; margin-top: 10px;`; button `height: 36px; padding: 0 14px; border: 1px solid #315071; border-radius: 9px; background: rgba(5, 22, 42, 0.48)`, followed by a `1px × 30px` divider in `#29415f`.

9. **Close button styling:** The modal live close control is an unframed `X`, and the standalone viewer has no equivalent close control. Use a visible square button at the upper right: `width: 34px; height: 34px; border: 1px solid #3a5476; border-radius: 9px; background: rgba(8, 27, 49, 0.84); color: #dce6f4; font-size: 20px`, with `margin-left: 16px`.

10. **Standalone page typography and density:** The full-page live version uses an oversized `34px` to `38px` serif headline and a large white figure plate, making the page substantially brighter and less compact than the target overlay. In viewer mode, suppress the page headline and white content card; if retained as fallback, cap the heading at `27px/1.12` and replace the white plate with `background: #071a31; color: #d7dfec; border: 1px solid rgba(85, 104, 190, 0.55); border-radius: 14px`.

**Keep as is:** Dark navy visual language, serif display typography, crisp diagram rendering, restrained blue-purple accents, and clearly legible figure metadata.

## 07 managed variation inline

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/07_managed-variation-inline__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/06_managed-variation__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/managed-variation__desktop__dark.jpg`

## Fidelity score: 2/10

1. **Main article region, component presence:** The live viewport shows the large white “One Estate, Before and After” figure instead of the managed-variation section. Render the “Some differences must survive” section at this scroll position, followed by the three-column inline explanatory comparison card. Remove or relocate the current figure from this region.

2. **Inline explanatory comparison card, layout:** Add a full-width card beneath the section introduction with `display:grid; grid-template-columns:repeat(3, 1fr);`, approximately `780px` wide and `260px` tall. Use `padding:16px 18px`, `border:1px solid #31527A`, `border-radius:12px`, and `background:linear-gradient(180deg, rgba(13,29,52,.92), rgba(8,23,43,.96))`.

3. **Comparison card, internal structure:** Each of the three states needs a centered mini-diagram above its heading, explanatory copy, and a bottom action button. Separate columns with `border-left:1px solid rgba(92,126,170,.35)` and `padding-inline:20px`. Use document icons around `48px × 58px`, connecting arrows or badges around `30px`, and cyan, violet, and amber accents for the three states.

4. **Article and sidebar grid:** The live main column is too wide and dominated by the figure. Set the page body to `display:grid; grid-template-columns:minmax(0, 790px) 308px; gap:28px; max-width:1120px; margin:0 auto;`. The target keeps the reading companion aligned near the article heading rather than beginning beside an oversized media plate.

5. **Managed-variation heading hierarchy:** Add the eyebrow above the section heading at `11px`, `font-weight:700`, `letter-spacing:.16em`, `text-transform:uppercase`, and `color:#A78BFA`. Set “Some differences must survive” to `31px`, `line-height:1.08`, `font-weight:700`, `color:#F4F0F2`, with `margin:8px 0 4px`.

6. **Article body typography:** The live body copy is small and low-contrast. Use a serif face at `18px`, `line-height:1.42`, `font-weight:400`, and `color:#C8C7D4`. Keep introductory paragraphs to roughly `760px` and use `margin-bottom:8px` so the content density matches the target.

7. **Reading companion sidebar:** Consolidate the live “On this page,” “Running example,” and “Contextual note” stack into one reading-companion plate for this region. Use `background:rgba(10,25,47,.88)`, `border:1px solid #29496F`, `border-radius:12px`, `box-shadow:0 14px 34px rgba(0,0,0,.24)`, and `overflow:hidden`. Target width is about `308px`.

8. **Reading companion active row:** Replace the live gray active highlight with a violet-blue treatment: `background:linear-gradient(90deg, rgba(92,72,214,.38), rgba(44,67,137,.24))`, `border-left:3px solid #8367FF`, and `color:#F2EEFF`. Rows should be approximately `29px` high with `padding:6px 12px`.

9. **Page background and plate contrast:** The live page is flatter and more desaturated. Use `background:radial-gradient(circle at 18% 12%, rgba(18,68,113,.22), transparent 38%), #06152A` on the page. Keep cards in the `#0A1A31` to `#0E213B` range, borders near `#29496F`, primary text `#F3EFF4`, and secondary text `#AEB5C8`.

10. **Vertical positioning and density:** The live view has excessive vertical space above the main figure and oversized media density. Start the managed-variation section approximately `24px` below the preceding divider, use `margin-bottom:12px` between introduction and comparison card, and keep the complete heading, card, and closing paragraph within roughly `460px` of vertical height.

**Keep as is:** Dark navy theme, restrained cool-toned borders, two-column article/sidebar foundation, serif editorial styling, and persistent top navigation.

## 08 conclusion / reading path

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/08_conclusion-reading-path__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/09_conclusion__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/conclusion__desktop__dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/conclusion-end__desktop__dark.jpg`

## Fidelity score: 4/10

1. **Page content grid:** The live layout is too wide, with an approximately 823px article column and a large gap before the sidebar. Set the shared content wrapper to `max-width: 1040px; margin-inline: auto; padding-inline: 0;`, using `grid-template-columns: minmax(0, 724px) 260px; column-gap: 38px;`. This will match the target’s tighter editorial composition and shorter line lengths.

2. **“Part of the Agentic Systems Engineering Reading Path” component:** The live version is a shallow, flat breadcrumb strip, while the target is a substantial “Where this sits” closing card. Restyle the outer component with `padding: 10px 15px 16px; min-height: 235px; background: linear-gradient(135deg, #0b1930 0%, #09162a 100%); border: 1px solid #5362a8; border-radius: 8px; box-shadow: inset 0 0 24px rgba(91,72,214,.08), 0 0 18px rgba(69,77,190,.08);`. Remove the current single `border-left` treatment.

3. **Reading-path hierarchy and structure:** The live path places all links in one horizontal sentence and has no clear title or three-step hierarchy. Add a `23px`, `700`, serif heading above an inset panel, then arrange the path as `grid-template-columns: repeat(3, 1fr); gap: 14px;`. Style the inset panel with `margin-top: 8px; padding: 12px 16px 15px; border: 1px solid #6658bd; border-radius: 8px;`. Each column needs a `1px solid #40506c` top rule, an `8px` uppercase label with `letter-spacing: .16em`, a `14px/17px` serif question, and an `11px/16px` supporting title.

4. **Conclusion lead section:** The live conclusion flows directly from the figure into a disclosure and body paragraphs, so the closing argument lacks the target’s dominant editorial moment. Add a conclusion lead immediately below the figure caption with `margin-top: 26px; padding: 0 0 0 16px; border-left: 2px solid #7566e8;`. Use a kicker at `9px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: #9d8cff;`, a headline at `28px/34px; font-family: serif; font-weight: 700; color: #f3f0eb;`, and body copy at `15px/20px; color: #b9c3d4; max-width: 690px;`.

5. **Article typography and density:** Live body text is approximately `18px/29px`, producing oversized paragraphs and a much taller conclusion than the target. Set conclusion body text to `font-size: 15px; line-height: 1.4; color: #b7c1d1;` with `margin-block: 10px 0`. Keep section headings near `27px/33px`, but reduce the large blank intervals around them to `margin-top: 30px; margin-bottom: 16px;`.

6. **Closing figure sizing:** The live white technical figure spans the oversized article column and dominates the region. Constrain the figure wrapper to `width: 100%; aspect-ratio: 3.4 / 1; max-height: 214px; overflow: hidden; border-radius: 8px; background: #ebe9df;`. Apply `img { width: 100%; height: 100%; object-fit: cover; }`. Style the caption with `margin-top: 6px; font-size: 9px; line-height: 14px; color: #748198;`.

7. **Reading Companion sidebar:** The live sidebar is split into multiple stacked cards and remains visually busy during the conclusion. Combine the “On this page” list and continuation action into one card using `background: linear-gradient(180deg, #0a192e 0%, #081629 100%); border: 1px solid #29415e; border-radius: 8px; padding: 16px; box-shadow: inset 0 0 20px rgba(31,76,124,.08);`. In this conclusion state, hide the separate “Running Example” and “Contextual Note” cards and add a continuation row below a `border-top: 1px solid #203653`.

8. **Sidebar active navigation state:** The current selected row uses a broad gray-beige fill that clashes with the navy and violet system. Set the active row to `background: #132541; color: #f2f3fa; border-radius: 5px;`, with `padding: 7px 8px`. Use a `12px` label and a `10px` violet node with `background: #f5f2ff; border: 2px solid #7062e8; box-shadow: 0 0 0 2px rgba(112,98,232,.22);`.

9. **Header plate:** The live header is taller and lighter gray than the target, making it compete with the article. Set it to `height: 52px; background: rgba(5,18,35,.96); border-bottom: 1px solid #203650; box-shadow: none;`. Use navigation labels at `11px; font-weight: 500; color: #b8c2d2;` and retain the active underline at `2px solid #8b72ff`.

10. **Section spacing below the reading path:** “Sources” begins too close to the conclusion content while the target gives the closing card a stronger terminal role. Apply `margin-top: 28px` before the reading-path card and `margin-bottom: 32px` after it; subsequent section dividers should use `border-top: 1px solid #1b2c43` rather than relying on empty vertical space.

**Keep as is:** The dark navy foundation, serif heading and sans-serif body pairing, violet accent family, active Essays underline, figure-caption placement, and desktop two-column article/sidebar model.

## 09 mobile

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/09_mobile-modes__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/10_mobile__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/entry__mobile__dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/threadscene-incident__mobile__dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/thread-focus-route__mobile__dark.jpg`

## Fidelity score: 3/10

1. **Overall mobile density and type scale:** The live build is dramatically oversized, so the hero occupies multiple screens instead of matching the target’s compact editorial composition. Set the base mobile type to `font-size: 15px; line-height: 1.45`, constrain the article to `max-width: 390px`, and use `padding-inline: 20px`. Reduce the essay title from its current roughly `36px` appearance to `26px; line-height: 1.08; font-weight: 700; letter-spacing: -0.02em`. Set introductory copy to `15px; line-height: 1.45`.

2. **Hero image/card:** The live image is a large inset framed card with excessive empty space above and below. In the target it is a shallow editorial banner immediately below the site header. Set the image container to `width: 100%; aspect-ratio: 2.25 / 1; margin: 8px 0 6px; padding: 0; border-radius: 6px; overflow: hidden`; use `object-fit: cover`. Remove the decorative corner marks and heavy outer frame, or reduce it to `border: 1px solid #263B62; box-shadow: 0 0 18px rgba(56,92,255,.12)`.

3. **Hero information hierarchy:** The live build separates category, title, summary, collection, dates, tags, and author with very large vertical gaps. Reorder and compress this region to image caption, breadcrumb, metadata row, title, summary, tags, then revision link. Use `gap: 8px`, section margins of `12px`, chip gaps of `6px`, and remove the large author card from the initial hero viewport. The target hero fits roughly `520px` of content below the browser bar.

4. **Mobile site header:** The live header is too tall and visually heavy, uses a large illustrated logo, and lacks the target’s compact outlined “Contents” control. Set the header to `height: 56px; padding: 0 16px; background: #071326; border-bottom: 1px solid #1C2D49`. Size the brand mark to `22px` high and wordmark to `11px; font-weight: 700; letter-spacing: .18em`. Replace or deprioritize the theme and lightning controls, and add a right-aligned Contents button at `height: 30px; padding: 0 12px; border: 1px solid #456084; border-radius: 5px; font-size: 11px`.

5. **Contents experience:** The live screenshots only show a floating “CONTENTS” pill covering page content, while the target includes a dedicated contents sheet with a section timeline and active row. Make the trigger non-overlapping and render an open sheet/page with `padding: 14px 18px 20px; background: #071326`. Use a `1px solid #203552` vertical timeline, `10px` circular nodes, rows at `height: 38px`, and an active row with `background: #13254A; border-radius: 6px; box-shadow: 0 0 16px rgba(83,94,255,.16)`. Remove the fixed pill from over the author and body content.

6. **Thread Focus screen:** The live “Incident” view is an article section with a large figure, not the target’s focused comment thread. After the section heading and short excerpt, add stacked replies with `display: grid; grid-template-columns: 30px 1fr; column-gap: 10px; padding: 14px 0`, `30px` avatars, a `1px solid #33466D` connector line, `12px` names, `11px` timestamps, `13px/1.45` comment text, and compact reaction/reply actions. This threaded discussion is a primary target component.

7. **Evidence screen/component is missing:** Add the target’s Evidence region with three stacked rich cards for figure, source, and related reading. Use `background: #09172B; border: 1px solid #29436C; border-radius: 7px; padding: 12px; gap: 10px; box-shadow: 0 8px 22px rgba(0,0,0,.18)`. Labels should be `9px; font-weight: 700; letter-spacing: .16em; color: #A5B4D2`, titles `13px; font-weight: 600`, and purple icons `18px; color: #9C68FF`.

8. **Article section and figure sizing:** The live Incident heading, paragraph, and diagram are approximately twice the target density. Set section eyebrow text to `10px; font-weight: 700; letter-spacing: .18em`, heading to `27px; line-height: 1.1`, body to `15px; line-height: 1.48`, and spacing to `8px` after the eyebrow and `10px` after the heading. Set figure margin to `18px 0`, frame padding to `8px`, radius to `7px`, and caption to `12px; line-height: 1.4`.

9. **Color and plate treatment:** The live page uses a flatter near-black field and an overly bright blue glow beneath framed media. Use a consistent page background of `#061225`, raised plates at `#0A182D`, primary text `#F1EEE8`, secondary text `#B6BED0`, muted text `#77849E`, borders `#263B60`, and accent `#8A57FF`. Limit glows to `0 0 20px rgba(78,68,255,.14)` rather than broad saturated blue halos.

10. **Chips and metadata:** The live category, collection, date, and hashtag pills are oversized and inconsistently separated. Set category and tag chips to `min-height: 22px; padding: 3px 9px; border-radius: 999px; font-size: 10px; line-height: 1.2`. Use `background: #101D36; border: 1px solid #2B3D61; color: #C8D0E2`, with metadata at `11px; color: #9BA6BC`. Keep all metadata within compact wrapping rows instead of standalone blocks.

**Keep as is:** The dark navy editorial direction, serif display face, off-white text, purple accent family, generated registry artwork, and rounded tag language are aligned with the target.
