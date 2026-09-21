# Tier A fidelity review (gpt-5.6-sol on ICA ccx)

## 01 essay entry (hero, title block, author card, executive signal)

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/01_essay-entry__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/01_essay-entry__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/entry-tall__desktop-tall__dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/executive-signal__desktop__dark.jpg`

## Fidelity score: 6/10

1. **Essay title block, width and wrapping:** The live title is constrained to roughly 640px and wraps to three lines, making the hero substantially taller. Set `.essay-title { max-width: none; width: 100%; font-size: 42px; line-height: 1.08; font-weight: 700; letter-spacing: -0.025em; }` so the title uses the full 750 to 760px primary column and resolves to two lines.

2. **Primary content and sidebar grid:** The live layout is narrower and has only about 20px between columns, while the target has a clearer 40px gutter and a slightly wider content area. Set the page grid to `grid-template-columns: minmax(0, 756px) 266px; column-gap: 40px; max-width: 1062px; margin-inline: auto;` with a vertical divider at the grid boundary using `border-left: 1px solid rgba(117, 139, 181, 0.24)` on the sidebar wrapper and `padding-left: 20px`.

3. **Title metadata hierarchy:** The live page places the category pill directly below the image, then title and deck, with series/date metadata afterward. Add the missing breadcrumb row above the metadata and title, styled as `font-size: 11px; line-height: 16px; color: #78A7D4; gap: 9px; margin-top: 18px;`. Place the category, author/update date, and read time on one compact row immediately below it using `font-size: 10px; color: #9AA9C1; gap: 12px; margin-top: 10px; margin-bottom: 10px;`.

4. **Main-column executive signal duplication:** The live build repeats the purple “Why this matters / Carry this forward” plate inside the article, creating a large block before section 01. Keep the executive signal only in the right rail for this entry treatment. Replace the main-column block with the target’s compact revision disclosure: `height: 36px; padding: 0 4px; border-top: 1px solid #263A53; border-bottom: 1px solid #263A53; background: transparent; font-size: 11px; display: flex; align-items: center; justify-content: space-between;`.

5. **Sidebar executive signal card:** The current card is approximately 300px tall and reads as two dense prose sections. Target a compact 164px leadership callout with `padding: 16px; border-radius: 8px; border: 1px solid #4B3A91; background: linear-gradient(145deg, #171943 0%, #211750 58%, #101A39 100%); box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 10px 28px rgba(2,7,20,.28);`. Use a `20px/22px`, `700` serif headline, a `12px/17px` supporting line, and a `10px`, `letter-spacing: 1.6px` uppercase label. Add a 16px signal-bars icon at the upper right.

6. **Author card density:** The live author card is about 240px tall versus roughly 182px in the target, with excessive body copy height and a prominent internal divider. Set `padding: 14px 15px; border-radius: 8px; min-height: 0;` and clamp the biography to three lines with `font-size: 12px; line-height: 16px; display: -webkit-box; -webkit-line-clamp: 3; overflow: hidden;`. Use a 38px avatar, `18px/21px` author name, `11px/15px` role text, and remove the full-width divider or reduce it to `rgba(100,130,168,.18)`.

7. **Hero-to-article vertical spacing:** The live page accumulates too much space through the three-line title, separate series/date rows, revision heading, and duplicated signal card, pushing section 01 far below the target. After the title-width and duplication fixes, normalize the stack to `hero margin-bottom: 18px`, `title margin: 10px 0 14px`, `deck margin-bottom: 18px`, `tags margin-bottom: 14px`, and `revision-row margin-bottom: 26px`. Section 01 should begin roughly 360 to 390px below the hero image bottom, not over 700px below it.

8. **Reading companion structure:** The live “On this page” card is a plain numbered list and lacks the target’s active-progress treatment and thread dock. Style it with `padding: 14px 14px 12px; border: 1px solid #29415F; border-radius: 8px; background: #08182B;`. Add a `1px` vertical rail at `left: 23px`, 8px circular nodes, an active node in `#8A72FF` with `box-shadow: 0 0 0 3px rgba(138,114,255,.2)`, and an active row background of `#142445`. Add the separated thread dock below the list using `border-top: 1px solid #263B56; margin-top: 12px; padding-top: 12px;`.

9. **Page and card color depth:** The live background is comparatively flat and the cards blend into it. Use `background: radial-gradient(circle at 76% 18%, rgba(31,54,91,.20) 0%, transparent 36%), linear-gradient(180deg, #071629 0%, #061326 100%);` on the page. Standard cards should use `background: rgba(7,22,40,.88); border: 1px solid #29415F; box-shadow: 0 12px 30px rgba(1,7,18,.20);` to match the target’s plate separation.

10. **Tags and supporting typography:** The live tags appear as loose purple text rather than the target’s outlined capsules. Set each tag to `height: 25px; padding: 0 12px; border: 1px solid #40536D; border-radius: 999px; background: rgba(8,21,39,.55); color: #AEBBD0; font-size: 10px; line-height: 23px;`. Keep tag spacing at `8px` and use `16px/26px`, `400`, `#AAB4C7` for the introductory deck.

**Keep as is:** Hero illustration aspect ratio and crop, serif editorial character, dark navy visual direction, purple accent family, author portrait treatment, and the overall two-column essay-plus-companion concept.

## 02 first scroll (section marker, pull quote, first figure, companion rail)

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/02_first-scroll__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/02_first-scroll__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/first-scroll__desktop__dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/threadscene-incident__desktop__dark.jpg`

## Fidelity score: 3/10

1. **First-scroll article state and vertical position:** The live viewport is still dominated by the hero image, title, metadata, and tags, while the target has already advanced into the article body. For the first-scroll anchor/state, place the revision strip at `top: 106px` below the global header using `scroll-margin-top: 96px`; ensure the hero masthead is fully above the viewport and remove any `min-height: 100vh` or oversized bottom padding that delays the article body.

2. **Companion rail composition and sticky behavior:** The live rail still shows the author and “Why this matters” cards before the table of contents. In this state, show only `.reading-companion`, set `position: sticky; top: 112px; width: 272px`, and hide the author/summary cards with `display: none`. Use a single `318px`-tall plate containing the section list and compact thread dock.

3. **Revision strip:** The live revision treatment is a heading followed by a large purple information panel. Replace it with a compact horizontal strip directly above the lead paragraph: `height: 38px; padding: 0 16px; border: 1px solid #264462; border-radius: 8px; background: linear-gradient(90deg, #081a31 0%, #0a1830 100%)`. Set its text to `12px/1`, `font-weight: 500`, and place the read-time action at the right edge.

4. **Pull quote block:** The target’s primary emphasis component is missing from the visible live state. Insert the pull quote after the lead paragraph at approximately `margin-top: 20px; margin-bottom: 24px; min-height: 106px; padding: 18px 28px 18px 56px`; use `background: linear-gradient(110deg, #0c203c 0%, #091a31 100%)`, `border-left: 4px solid #9278ff`, and no full surrounding border. Style the quote at `27px/1.35`, italic serif, `font-weight: 400`, color `#f2f1f7`, with a `32px` lavender quote icon positioned `left: 18px; top: 16px`.

5. **Section marker and heading hierarchy:** The live first body section is not visible and its marker treatment does not match the target. Build a horizontal section header with a `4px solid #806cff` left rule, `padding-left: 16px`, and a `40px × 40px` number tile using `border: 1px solid #294866; border-radius: 8px`. Set the eyebrow to `10px`, `font-weight: 600`, `letter-spacing: .22em`, `text-transform: uppercase`, color `#aeb8d0`; set the section title to `30px/1.12`, serif, `font-weight: 600`, color `#f1eef0`.

6. **First figure placement and density:** No figure appears in the live viewport, while it occupies the lower third of the target. Place the first figure immediately after one introductory paragraph with `margin-top: 12px`, `width: 100%`, and `height: 220px`. The outer plate should use `border: 1px solid #31516d; border-radius: 9px; background: #07182e; box-shadow: inset 0 1px 0 rgba(130,190,255,.05)`.

7. **Figure mini-diagram styling:** Avoid the live concept’s oversized five-column infographic treatment for this figure. Use three compact nodes, one source card, one registry card, and a two-card project stack. Give nodes `border: 1px solid #426888`, `border-radius: 7px`, `background: linear-gradient(145deg, #0b2039, #09162d)`, with the registry/projects accented by `#8659df`. Icons should be `24px`, labels `13px/1.2` at `600`, captions `11px/1.35`, and connectors `1px dashed #6388aa` with small arrowheads.

8. **Main column and rail separation:** The live columns are close in width but lack the target’s strong structural divider and consistent gutter. Set the article shell to `grid-template-columns: minmax(0, 704px) 1px 272px; column-gap: 20px; max-width: 1020px; margin-inline: auto`. Render the divider as `background: #223c57` and extend it through the first-scroll content.

9. **Article body typography:** The live introductory/deck text is predominantly sans-serif and visually light, while the target article prose is editorial serif. In the first-scroll body, use `font-family: Georgia, "Times New Roman", serif; font-size: 17px; line-height: 1.42; font-weight: 400; color: #d9d8dc`. Limit paragraphs to roughly `660px` and use `margin: 0 0 12px`.

10. **Reading Companion plate polish:** The live contents card is tall, flat, and list-dense. Style the target plate with `padding: 16px; border: 1px solid #294968; border-radius: 9px; background: linear-gradient(145deg, #0a1b33 0%, #08162b 100%); box-shadow: 0 10px 30px rgba(0,0,0,.22), inset 0 1px 0 rgba(130,180,255,.05)`. Use `12px` list text, `28px` row height, `8px` gaps, a `#7467db` active-row fill at `24%` opacity, and a compact thread dock separated by `border-top: 1px solid #243c57`.

**Keep as is:** The dark navy palette, purple accent family, centered desktop content width, persistent global navigation, serif display-heading character, and approximate main-column versus rail proportions.

## 04 thread focus

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/04_thread-focus__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/04_thread-deployment__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/thread-focus-route__desktop__dark.jpg`

## Fidelity score: 4/10

1. **Main figure viewer:** Replace the oversized white raster-style figure with the target’s dark, native schematic. Set the figure shell to `height: 300px`, `background: linear-gradient(145deg, #071C33 0%, #06172B 100%)`, `border: 1px solid #294765`, `border-radius: 9px`, and `box-shadow: inset 0 1px 0 rgba(255,255,255,.025), 0 12px 32px rgba(0,0,0,.18)`. Lay out five equal node cards using `grid-template-columns: repeat(5, 1fr)`, `gap: 18px`, with 16px arrows between nodes. Node cards should use `min-height: 112px`, `padding: 14px`, `border: 1px solid #31506D`, and `border-radius: 8px`; the active node uses `border-color: #9565F5` and `background: linear-gradient(145deg, rgba(117,65,190,.32), rgba(44,26,72,.42))`.

2. **Thread overview card:** The current overview is a flat text list. Turn every scene into an outlined row with `min-height: 40px`, `padding: 7px 11px`, `margin-bottom: 5px`, `border: 1px solid #28445F`, `border-radius: 7px`, and `background: rgba(4,20,37,.45)`. Use a two-column row with a 26px number column, `font-size: 13px`, and add a secondary line at `10px`, `color: #8394AD`. Style the active row with `border-color: #9B67FF`, `background: linear-gradient(90deg, rgba(109,63,181,.42), rgba(71,43,116,.34))`, and `box-shadow: 0 0 14px rgba(124,77,255,.14)`.

3. **Figure scale and page density:** The live figure consumes roughly 470px of vertical space and pushes the lower editorial elements below the fold. Constrain the complete figure, including header and caption, to approximately `300px` to `320px`, use `margin-top: 16px`, and keep the left column at about `720px`. The right rail should remain visible through the same viewport with `width: 288px`, `gap: 12px`, and no large blank area under its cards.

4. **Introductory article typography:** The live introductory paragraph is sans serif and visually secondary, while the target uses editorial serif text. Apply `font-family: Georgia, "Times New Roman", serif`, `font-size: 17px`, `line-height: 1.55`, `font-weight: 400`, and `color: #C7CDDA`. Keep paragraph width near `690px` and use `margin-top: 34px` only when separating it from the title block; otherwise use `12px`.

5. **Running Example card:** Replace the current identity-plus-disclaimer layout with the target’s compact metadata card. Use `padding: 17px`, `background: linear-gradient(145deg, rgba(10,30,52,.96), rgba(7,23,42,.96))`, `border: 1px solid #294662`, `border-radius: 9px`, and `min-height: 260px`. Style the title at `22px/1.15`, serif, `font-weight: 700`; the summary at `13px/1.45`; the artifact badge at `11px`, `padding: 5px 10px`, `border: 1px solid #425D78`, and `border-radius: 999px`. Render metadata as a two-column grid, `grid-template-columns: 78px 1fr`, `row-gap: 8px`, with labels in `#8798B0` and values in `#C9D2E0`.

6. **Post-figure editorial components:** Add the target’s compact evidence callout and scene link directly below the figure. The callout should use `border-left: 3px solid #F0B45E`, `padding: 8px 14px`, `margin-top: 10px`, `background: rgba(17,34,51,.52)`, with a `13px/1.35` body and amber `13px`, `font-weight: 700` heading. The scene link should sit below at `margin-top: 8px`, `font-size: 12px`, and `color: #67D5F2`.

7. **Top thread utility row:** The current row is spread across the full column and uses a plain text back link. Match the target with a compact horizontal cluster aligned left: back control `height: 31px`, `padding: 0 13px`, `border: 1px solid #294B69`, `border-radius: 6px`, and `background: #0B2946`; then a `1px × 20px` divider, the thread label, and the scene count. Use `font-size: 11px`, `letter-spacing: .04em`, and `gap: 12px`.

8. **Right-rail card depth:** The live cards look flat against the page. Apply `background: linear-gradient(145deg, rgba(9,29,50,.97) 0%, rgba(6,22,40,.97) 100%)`, `border: 1px solid #294761`, `border-radius: 9px`, and `box-shadow: 0 14px 30px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,255,255,.025)`. Use `12px` between cards and `17px` internal padding.

9. **Page background and contrast:** The live page is a mostly flat navy. Use `background: radial-gradient(circle at 50% -15%, #0A2946 0%, #061A30 30%, #031426 64%, #020D1B 100%)` on the page shell. Primary text should be `#F1F0EC`, secondary text `#A6B1C3`, muted labels `#74869E`, and structural rules `#25435E`.

10. **Global header:** Increase the brand lockup from its current undersized treatment to approximately `150px × 28px`, and use `height: 88px` for the complete header area with a `48px` navigation row. Navigation links should be `12px`, `font-weight: 500`, `color: #D0D5E0`, with an active underline `2px solid #9A6BFF`. Add the compact AI control as a `height: 26px`, `padding: 0 14px`, `border: 1px solid #334A67`, and `border-radius: 999px` pill.

**Keep as is:** The two-column content structure, overall content width, serif display heading, dark navy direction, and placement of the right rail are close to the target.

## 05 evidence focus

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/05_evidence-focus__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/07_evidence-receipts__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/evidence-focus-index__desktop__dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/evidence-record__desktop__dark.jpg`

## Fidelity score: 4/10

1. **Evidence focus route rendering:** Two live screenshots show the full-page `404 Page not found` component instead of the evidence view. Remove the 404 layout from these receipt states and render the same two-column evidence shell in every state: `max-width: 1136px; grid-template-columns: minmax(0, 818px) 298px; gap: 18px; margin-inline: auto;`.

2. **Main evidence layout width:** The live content is compressed to roughly `1058px`, making the primary column only about `749px`. Set the page container to `width: calc(100% - 48px); max-width: 1136px`, with the main receipt column at `818px` and sidebar at `298px`. This will match the target density and prevent the metadata from wrapping prematurely.

3. **Evidence focus introduction:** The live page jumps directly from the `42px` headline into the receipt card. Add the introductory deck below the headline with `max-width: 800px; margin-top: 6px; margin-bottom: 14px; font-family: Georgia, serif; font-size: 19px; line-height: 1.14; color: #b9c3d6;`. The receipt card should begin about `112px` below the headline top, not `42px`.

4. **Receipt card information architecture:** Replace the large two-column metadata grid currently occupying the top of `The reviewer copy` card with the target summary header: `padding: 24px 20px 16px`, a `32px` document icon, `11px` uppercase kicker at `letter-spacing: .18em`, `23px/1.15` serif title, `13px` date line, and an inline evidence badge plus one-line summary. Follow it with a divider and a balanced supported-claim/limitations row using `grid-template-columns: 1fr 1fr; gap: 36px;`.

5. **Evidence asset presence:** The target’s dominant lower-card element is a wide captured-document preview, while the live card ends in text and links. Add an evidence preview directly below the support/limitations row with `width: 100%; min-height: 180px; margin-top: 14px; border-radius: 9px; overflow: hidden; object-fit: cover; border: 1px solid #35577b;`. Give its wrapper `background: #e9e6df` and place the redaction badge at `top: 10px; right: 12px`.

6. **Receipt card density and height:** The live receipt card uses oversized vertical blocks and leaves large low-information areas. Use `padding: 18px`, `row-gap: 14px`, paragraph `font-size: 14px; line-height: 1.35`, and section labels `font-size: 9px; line-height: 1; letter-spacing: .2em;`. Remove the current `24px` to `30px` gaps around metadata and support sections.

7. **Sidebar receipt index:** The live `RECEIPTS` panel is a plain text list with a broad blue selected rectangle. Style it as six compact rows: `min-height: 43px; padding: 7px 10px; border-bottom: 1px solid rgba(92,130,173,.18);`, with a `26px` numbered circle, title at `13px/1.2`, date at `11px`, and a right arrow. Use selected background `linear-gradient(90deg, #4938ca 0%, #272278 100%)`, `border: 1px solid #6547e6`, and `border-radius: 8px`.

8. **Card plate treatment:** Live cards appear flat and gray-blue compared with the target and polish reference. Set evidence and sidebar plates to `background: linear-gradient(145deg, #081b34 0%, #07172d 100%); border: 1px solid #294d74; border-radius: 10px; box-shadow: 0 12px 32px rgba(0,0,0,.22), inset 0 1px 0 rgba(150,195,255,.04);`. Add a restrained outer glow with `filter: drop-shadow(0 0 14px rgba(45,109,184,.08));`.

9. **Typography contrast and hierarchy:** Live body text is too muted and the receipt title is oversized relative to the page headline. Use page headline `40px/1.05`, receipt title `23px/1.15`, sidebar title `23px/1.1`, all at `font-weight: 700; color: #f2eff4`. Set body copy to `#b9c3d3`, metadata to `#98a9c1`, and uppercase labels to `#a9bdd8` with `font-size: 9px; font-weight: 600; letter-spacing: .18em`.

10. **Evidence toolbar controls:** The live top row reduces the target toolbar to text links. Style `Back to essay` and `Open in new tab` as bordered controls with `height: 33px; padding: 0 14px; border: 1px solid #294b72; border-radius: 7px; background: linear-gradient(#0c203d, #091a32); color: #c5d0e2; font-size: 12px;`. Add the adjacent `33px` square overflow button and keep the evidence position breadcrumb between the controls.

**Keep as is:** Dark navy page foundation, serif editorial headline style, active Essays navigation treatment, two-column desktop concept, and the evidence-class guide’s overall ordering.

## 06 figure viewer

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/06_figure-viewer__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/08_figure-viewer__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/figure-viewer__desktop__dark.jpg`

## Fidelity score: 3/10

1. **Figure Viewer presentation mode:** The first live view uses a smaller modal while the second renders as an inline page below the global navigation. Make the viewer consistently modal with `position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center; padding: 32px;`. Add a full-screen backdrop using `background: rgba(1, 10, 24, 0.78); backdrop-filter: blur(3px);`. The underlying essay should remain visible but subdued in both states.

2. **Viewer panel dimensions and plate treatment:** The live modal is too narrow and the inline version is too tall and page-like. Set the panel to `width: min(970px, calc(100vw - 64px)); max-height: calc(100vh - 64px); overflow: auto; border-radius: 14px; background: linear-gradient(145deg, #091D38 0%, #06172E 58%, #08203D 100%); border: 1px solid #5046C8; box-shadow: 0 24px 80px rgba(0,0,0,.62), 0 0 28px rgba(76,63,220,.16);`.

3. **Viewer content hierarchy:** The live builds place the primary figure title below the image or use an oversized incident headline above it. The target requires a compact pre-media title block. Use this order inside the modal: viewer header, `24px` vertical gap, figure eyebrow, title, `10px` gap, image, caption and actions. Style the eyebrow at `11px/1.2`, `font-weight: 700`, `letter-spacing: .18em`, `text-transform: uppercase`, `color: #B8C2D8`; style the title at `28px/1.15`, serif, `font-weight: 600`, `color: #F1EEE8`, with `margin: 6px 24px 10px`.

4. **Enlarged figure proportions:** Both live figures are much taller than the target, approximately 1.8:1 to 2.2:1 rather than the target’s wide cinematic crop. Set the media frame to `width: 100%; aspect-ratio: 3.22 / 1; max-height: 264px; overflow: hidden; border-radius: 12px; border: 1px solid rgba(175,194,225,.55);`. Apply `img { width: 100%; height: 100%; object-fit: cover; display: block; }`.

5. **Viewer header controls:** The first live header adds a cube logo, slide count, previous and next buttons, while the second adds back links and Copy link. Hide these elements for this viewer state with `display: none`. Use a `64px` tall header with `padding: 0 30px; border-bottom: 1px solid rgba(147,169,205,.24);`. Left-align “FIGURE VIEWER” at `13px`, `font-weight: 700`, `letter-spacing: .14em`; right-align contextual helper text at `12px`, `color: #AEB9CF`, followed by a `34px` square close button with `border: 1px solid #465A7D; border-radius: 9px`.

6. **Internal horizontal spacing:** The live content nearly touches the modal edges in places and uses inconsistent widths between header, image, and caption. Give the body `padding: 20px 60px 20px`, with every title, media, and caption region sharing the same left and right edges. At narrower desktop widths use `padding-inline: 32px` through a media query below `900px`.

7. **Caption and context block:** The first live caption is arranged as a large editorial title with a separate action rail, while the second becomes long full-width prose with weak separation. Use `margin-top: 16px; display: grid; grid-template-columns: minmax(0,1fr) auto; column-gap: 28px; align-items: start;`. Set the caption lead to `15px/1.45`, serif, `font-weight: 600`, `color: #E7E3DE`; supporting context to `14px/1.45`, `color: #AEB9CE`, `max-width: 700px`, and keep the total text block compact.

8. **Download action:** The target has one outlined download button aligned to the upper-right of the caption, while live uses multiple text links or only Copy link. Render a single button with `height: 36px; padding: 0 14px; display: inline-flex; gap: 9px; align-items: center; border: 1px solid #3F5D87; border-radius: 9px; background: rgba(8,29,57,.58); color: #E3E9F3; font-size: 12px; font-weight: 500;`. Size the download icon to `17px`.

9. **Long-description control and divider:** The target includes a compact secondary action below the caption, separated from its explanatory text by a vertical rule. Add a footer row with `margin-top: 10px; display: flex; align-items: center; gap: 16px;`. Style the button at `height: 36px; padding: 0 14px; border: 1px solid #3F5D87; border-radius: 9px; background: transparent; font-size: 12px;`. Add `border-left: 1px solid rgba(139,159,190,.32); padding-left: 16px` to the adjacent helper text.

10. **Global density and typography:** The second live screenshot’s headline is oversized and wraps across two lines, pushing the figure far below the viewer header. Cap viewer-specific headings at `28px` and use `line-height: 1.15`; keep body copy at `14px/1.45`. Remove the inline page’s excessive vertical gaps by setting the header-to-title spacing to `24px`, title-to-image spacing to `10px`, and image-to-caption spacing to `16px`.

**Keep as is:** The dark navy visual language, subtle violet border glow, rounded media corners, and the first live view’s dimmed essay backdrop are directionally aligned with the target.

## 07 managed variation inline

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/07_managed-variation-inline__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/06_managed-variation__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/managed-variation__desktop__dark.jpg`

## Fidelity score: 2/10

1. **Article hierarchy and Managed Variation placement:** The live build promotes “Some differences must survive” into a full-page hero at the top. In the target it is an inline article section below the breadcrumb, main essay headline, deck, tags, and divider. Restore the article header above it, then style `.managed-variation-section` with `margin-top: 22px`, `padding-left: 18px`, `border-left: 2px solid #7C5CFF`, and no full-width hero treatment.

2. **Inline explanatory comparison:** The live “Signature diagram” is a large registry flow graphic around `748px × 398px`; the target is a restrained three-column comparison card around `782px × 260px`. Use `.inline-comparison { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); min-height:260px; padding:14px 18px 16px; gap:0; }`, add `border-left:1px solid #263E63` between columns, and cap each document illustration at `64px × 64px`. Hide the cube/project-flow variant in this section with `display:none`.

3. **Right sidebar composition:** The live sidebar stacks author, Executive Signal, Reading Companion, managed-variation note, and running-example cards. The target has one consolidated Reading Companion card only. Set the non-companion cards in this viewport to `display:none`; style `.reading-companion` as `width:308px; min-height:409px; padding:0 15px; border:1px solid #29456F; border-radius:12px; background:rgba(8,22,43,.72); box-shadow:0 12px 32px rgba(0,0,0,.18)`.

4. **Page grid and alignment:** Live content begins around `176px` with a `748px` main column, while the target begins around `138px` with a wider `790px` article column. Set the shell to `max-width:1126px; margin-inline:auto; display:grid; grid-template-columns:minmax(0,790px) 308px; column-gap:28px; padding-inline:0`. Align the sidebar top to the article-header area, not to the inline comparison.

5. **Card color and glow treatment:** Live cards use saturated cyan, violet, green, and amber borders with strong internal glows. The target uses a quieter navy plate with accent color limited to icons and small status details. Set comparison surfaces to `background:linear-gradient(180deg,rgba(14,31,57,.78) 0%,rgba(8,22,42,.9) 100%)`, `border:1px solid #304C73`, `border-radius:12px`, and `box-shadow:inset 0 1px 0 rgba(130,171,255,.06), 0 10px 28px rgba(0,0,0,.16)`. Remove neon outer glows.

6. **Section typography scale:** The live section headline is roughly `38px` and functions as the page title. The target inline headline is about `30px`. Set `.managed-variation-section h2 { font-family:serif; font-size:30px; line-height:1.08; font-weight:700; letter-spacing:-0.02em; color:#F1EDF0; margin:6px 0 4px; }`. Set the section deck to `18px/1.35` and the explanatory paragraph to `18px/1.35`, both in `#C5C0CC`.

7. **Comparison-card density:** Live project panels contain multiple pills, statuses, descriptive blocks, and footer captions, making the component much denser than the target. Reduce each column to one diagram row, one uppercase action heading, a two-line explanation, and one bottom action. Use `padding:6px 18px 0`, `row-gap:8px`, action headings at `11px/1.2`, `font-weight:700`, `letter-spacing:.14em`, and descriptions at `13px/1.35`. Anchor actions with `margin-top:auto`.

8. **Action controls inside the comparison:** Live controls are brightly color-coded pills and badges. The target uses subdued full-width outlined buttons. Style each action as `height:33px; width:100%; padding:0 12px; border:1px solid #54739E; border-radius:8px; background:rgba(10,26,49,.6); color:#C7D1E5; font-size:12px; font-weight:400; box-shadow:none`.

9. **Floating component-label chips:** The live purple labels such as “Managed Variation,” “Signature diagram,” “Executive Signal,” and “ReadingCompanion” read as exposed implementation annotations. Remove them from the rendered UI with `.component-label, [data-component-label] { display:none !important; }`. Preserve only the target’s inline eyebrow, styled as normal text at `11px`, `font-weight:700`, `letter-spacing:.16em`, `color:#A78BFA`.

10. **Second live screenshot state and clipping:** The second screenshot lands on a different figure and shows content clipped beneath the sticky header rather than the Managed Variation region. Ensure the region remains in normal document flow with `display:block; position:relative; visibility:visible`, and set `#managed-variation { scroll-margin-top:88px; }`. Use `main { overflow:visible; }` and avoid transforms on ancestor containers that can break anchor positioning.

**Keep as is:** Dark navy visual language, serif editorial headings, purple active-state accent, compact global navigation, and the general two-column article-plus-sidebar structure.

## 08 conclusion / reading path

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/08_conclusion-reading-path__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/09_conclusion__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/conclusion__desktop__dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/conclusion-end__desktop__dark.jpg`

## Fidelity score: 4/10

1. **“Where This Sits” reading-path component:** Replace the current shallow horizontal breadcrumb plate, approximately `72px` tall, with a full conclusion card around `236px` tall. Use `padding: 14px`, `border: 1px solid #294563`, `border-radius: 8px`, and `background: linear-gradient(135deg, #0b1c31 0%, #0a172a 70%, #11153a 100%)`. Add an inner panel with `margin-top: 8px`, `padding: 12px 16px 14px`, `border: 1px solid #6550b8`, and `border-radius: 8px`. Below the introductory sentence, render previous/current/next items as `grid-template-columns: repeat(3, 1fr)` with `column-gap: 14px`; each column needs a `1px solid #40506a` top rule, `10px` top padding, and a `14px/1.2` serif title.

2. **Conclusion section hierarchy:** The live conclusion is fragmented across a large numbered heading, prose, an “Inside my lab” disclosure, and the reading-path strip. Consolidate it into one closing section immediately below the figure. Apply `border-left: 2px solid #8168ff`, `padding-left: 16px`, `margin-top: 24px`, and `padding-bottom: 12px`. Use a small eyebrow at `10px`, `font-weight: 700`, `letter-spacing: 0.16em`, `color: #a68cff`; then a conclusion heading at `28px/1.15`, `font-weight: 700`, `color: #f1eff0`, with `margin: 8px 0 10px`.

3. **Closing figure proportions:** The live figure occupies a substantially taller diagram area and pushes the conclusion across multiple scroll states. Constrain the closing figure wrapper to `width: 100%`, `aspect-ratio: 3.4 / 1`, `max-height: 214px`, `overflow: hidden`, `border-radius: 7px`, and `border: 1px solid #31455d`. Set the image to `width: 100%; height: 100%; object-fit: cover`. Keep its caption directly below at `font-size: 10px`, `line-height: 1.4`, `color: #8794a8`, with `margin-top: 6px`.

4. **Main-column typography density:** The live article uses approximately `18px` body text with a loose `1.55` line-height and oversized `34px` section headings. For this conclusion region, set body copy to `15px/1.35`, `font-weight: 400`, `color: #b7bdca`, and paragraph spacing to `8px`. Set primary conclusion headings to `28px/1.15`; reserve the live `34px` scale for major chapter openings only. This should keep the figure, conclusion, and reading-path card within one viewport as in the target.

5. **Reading Companion sidebar structure:** Replace the three separate live sidebar cards, “On This Page,” “Running Example,” and “Contextual Note,” with one unified companion plate aligned to the top of the closing figure. Use `width: 260px`, `padding: 16px`, `background: linear-gradient(180deg, #0c1d33 0%, #09192d 100%)`, `border: 1px solid #29415f`, `border-radius: 8px`, and `box-shadow: 0 12px 30px rgba(0,0,0,.18)`. The target plate contains a compact five-item vertical timeline followed by a divider and a thread-dock row, rather than multiple tall utility modules.

6. **Sidebar reading timeline:** The current “On This Page” list is text-heavy, uses numbered rows, and occupies too much vertical space. Remove visible numeric prefixes and render a timeline with a `1px solid #354f73` vertical rail, `16px` row gap, and `12px` circular markers. Active marker should use `background: #ffffff`, `border: 2px solid #725cff`, and `box-shadow: 0 0 10px rgba(111,82,255,.65)`. Set labels to `11px/1.3`; active text should be `#f4f2fa`, inactive text `#aeb8c8`, and the active row background `#142743` with `border-radius: 5px` and `padding: 7px 8px`.

7. **Page layout and vertical rhythm:** Keep the existing two-column widths, but tighten the article sequence. Use `grid-template-columns: minmax(0, 724px) 260px`, `column-gap: 38px`, and align both columns with `align-items: start`. Set figure-to-conclusion spacing to `24px`, conclusion-to-reading-path spacing to `14px`, and reading-path internal section gaps to `8px`. The live build currently introduces large independent blocks and disclosures that break the target’s compact closing cadence.

8. **Color and glow treatment:** The live page has a broad purple wash through the center and a bright purple rule across the viewport top. Remove the global top rule and reduce the ambient glow to `radial-gradient(circle at 48% 38%, rgba(74,56,180,.10) 0%, rgba(74,56,180,0) 38%)`. Use `#07182a` for the page background, `#0a1a2e` for standard plates, `#111638` only as a subtle reading-card gradient endpoint, and `#8168ff` for focused accents. Borders should remain muted at `#29415f`, not neon violet.

9. **Header scale:** The live header is taller and more visually dominant than the target. Set the desktop header to `height: 52px`, navigation links to `11px`, `font-weight: 500`, and `padding-inline: 12px`. Use a `2px` active underline in `#8b70ff` placed `8px` below the label. Keep search and utility icons at `16px` with `20px` gaps so the article remains the primary hierarchy.

10. **Post-conclusion content visibility:** The live “Sources” heading appears immediately after a short reading-path strip. Once the reading-path card is expanded to the target’s `236px` treatment, apply `margin-top: 28px` to the following sources section. At the shown viewport height, sources should begin below the fold rather than competing with the conclusion and reading path.

**Keep as is:** The dark navy foundation, restrained cool-gray text palette, serif display headings, two-column article/sidebar framework, thin card borders, and violet interaction accent are directionally consistent with the target.

## 09 mobile

Target: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/01_CANONICAL_COMPOSITE_MOCKUPS/09_mobile-modes__canonical.png`
Live: `/Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2/registry_wave_visual_source_of_truth_2026-09-18/02_RICH_COMPONENT_DIRECTION/10_mobile__rich-concept.png`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/entry__mobile__dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/threadscene-incident__mobile__dark.jpg`, `/Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay/docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final/thread-focus-route__mobile__dark.jpg`

## Fidelity score: 4/10

1. **Global mobile typography and density:** The live article uses oversized type and desktop-like vertical spacing, producing roughly half the target’s information density. At `max-width: 480px`, set body copy to `15px/1.45`, display headings to `26px/1.08`, section headings to `24px/1.12`, metadata to `11px/1.35`, and labels to `10px` with `0.16em` letter-spacing. Reduce major vertical gaps from the current roughly `32-56px` to `12-20px`.

2. **Mobile essay header:** The live header is approximately `96px` tall and uses a large logo plus four utility icons. The target has a compact `56px` article bar with the Signal/System wordmark on the left and one bordered Contents control on the right. Set `height: 56px; padding: 0 18px; background: #07182B; border-bottom: 1px solid #203653`; size the mark to `20px` and wordmark to `11px; font-weight: 700; letter-spacing: .18em`. Hide search, theme, lightning, and hamburger controls on this article viewport.

3. **Hero media region:** The live hero begins after a large empty band and sits inside a heavy inset frame. Place it directly below the compact header with `margin: 8px 18px 0`, `width: calc(100% - 36px)`, `aspect-ratio: 2.35 / 1`, `border-radius: 6px`, `border: 1px solid #2A4262`, and `box-shadow: 0 8px 24px rgba(0,0,0,.28)`. Remove the current extra top spacing and keep image cropping at `object-fit: cover`.

4. **Essay frontispiece hierarchy:** The live ordering separates category, title, excerpt, series, date, tags, and author into a long stack. Match the target’s compact order: media caption, breadcrumb, category/date/read-time row, title, excerpt, tags, then revision link. Use `gap: 8px`, `margin-top: 8px`, title `26px/1.08 700`, excerpt `15px/1.42`, and metadata `11px/1.3`. Keep total horizontal padding at `18px`.

5. **Metadata pills and tags:** The live series pill and tags are much larger, brighter, and more widely separated than the target. Set chips to `min-height: 24px; padding: 3px 9px; border-radius: 999px; font-size: 10px; line-height: 1.2; color: #B9B5E8; background: rgba(109,82,214,.10); border: 1px solid #39436A`. Use `gap: 6px`, allow a compact wrap, and remove the current glow around individual hashtags.

6. **Contents navigation:** The target presents Contents as either a compact top-right button or a full-screen reading sheet with section timeline. The live build shows a detached bottom-right floating button that overlaps content. Remove the fixed button with `position: static` in the article and use the header control at `height: 30px; padding: 0 11px; border: 1px solid #3B567A; border-radius: 5px; background: #0B1B31; color: #E8EDF7; font-size: 11px`. For the opened sheet, use `position: fixed; inset: 56px 0 0; padding: 18px; background: #07182B`.

7. **Thread focus screen component:** The live “Thread Focus” route displays a full article scene and large figure, while the target is a focused discussion view with section title followed by compact threaded comments. Render the discussion list immediately below the section summary; style each comment with `display: grid; grid-template-columns: 30px 1fr`, `column-gap: 10px`, `padding: 14px 0`, and `border-top: 1px solid #1D3048`. Use `30px` avatars, `12px/600` names, `10px` timestamps, and `13px/1.45` comment text.

8. **Incident figure card:** The live figure dominates the viewport with a tall framed plate and large caption. The target mini-diagram treatment is substantially more compact. Set the card to `margin-top: 16px; padding: 10px; border-radius: 7px; border: 1px solid #294566; background: linear-gradient(145deg,#091B31 0%,#071526 100%); box-shadow: 0 8px 22px rgba(0,0,0,.25)`. Constrain the diagram to `aspect-ratio: 2.25 / 1; object-fit: cover`, and style the caption at `12px/1.4` with `8px` top padding.

9. **Author card:** The live author card is a large standalone block not present in the target’s opening mobile entry and pushes core article navigation below the fold. Collapse it on mobile to a compact row or move it after the article body. Use `padding: 12px`, `margin: 16px 18px`, `border-radius: 7px`, avatar `42px`, name `18px/1.15`, supporting copy `12px/1.4`, and hide the extended biography and secondary links in the opening region with `display: none`.

10. **Color, borders, and glow system:** The live page is flatter and its purple accents are more diffuse than the reference. Use page background `#06172A`, raised plates `#091C33`, separators `#1D334E`, primary text `#F2EEE8`, secondary text `#AEB7C8`, and accent `#8A63FF`. Reserve glow for active controls only with `box-shadow: 0 0 18px rgba(125,79,255,.28)`; use crisp `1px` blue-gray borders and `6-8px` radii elsewhere.

**Keep as is:** Dark navy visual direction, serif editorial headlines, hero illustration aspect ratio, rounded metadata chips, and the restrained blue-purple accent palette.
