#!/usr/bin/env python3
"""Headless Chromium QA and capture runner for Registry Wave reading experience v2.

This runner uses the existing Astro server. It does not start Node, write src/, or
inspect screenshots. Captures are output only for a human or vision review leg.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError

ROOT = Path(__file__).resolve().parents[3]
ATLAS = ROOT / "docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/atlas/final"
BASE = "http://localhost:4399"
SLUG = "the-registry-wave-agentic-artifact-supply-chain"
ESSAY = f"/essays/{SLUG}/"
THREAD = f"/essays/{SLUG}/thread/"
EVIDENCE = f"/essays/{SLUG}/evidence/"
FIGURE = f"/essays/{SLUG}/figure/"

TESTS = {
    "N01": "Essay to Thread to Close", "N02": "Choose several beats", "N03": "Thread to Figure to Escape",
    "N04": "Thread to Evidence to Figure to return", "N05": "Browser Back/Forward",
    "N06": "Copy/open detail URL in a fresh tab", "N07": "Refresh a focused URL", "N08": "Modifier/middle click",
    "N09": "No JS", "N10": "Navigation or storage unavailable", "N11": "Back to essay vs Read this scene",
    "N12": "Different viewport/content revision return", "A01": "Keyboard focus and Escape",
    "A02": "Reduced motion", "A03": "Zoom / 320px / landscape", "A04": "Screen reader semantics",
    "C01": "Read marker", "C02": "Note selection", "C03": "Collapse and hold", "C04": "Focus sidebars",
    "V01": "Actual canonical art", "V02": "Content/evidence integrity", "V03": "Theme", "V04": "Real manuscript density",
}

def line(status, test, measured): print(f"{status} {test} | {TESTS[test]} | {measured}")
def wait_frames(page, count=2):
    page.evaluate("n => new Promise(resolve => { let i=0; const f=()=> ++i >= n ? resolve() : requestAnimationFrame(f); requestAnimationFrame(f); })", count)
def theme(page, dark): page.evaluate("dark => { const html = document.documentElement; html.classList.remove('dark', 'light'); html.classList.add(dark ? 'dark' : 'light'); }", dark)
def url(path): return BASE + path
def ready(page): page.wait_for_load_state("networkidle"); page.wait_for_timeout(100)
def new_page(context, path=ESSAY, dark=False):
    page = context.new_page(); page.goto(url(path), wait_until="networkidle"); theme(page, dark); return page
def dialog(page): return page.locator("[data-focus-dialog]")
def wait_for_images(page):
    page.wait_for_function("() => [...document.images].every(image => image.complete)")
def preload(page):
    page.evaluate("() => scrollTo(0, document.documentElement.scrollHeight)")
    # Inert focus templates contain lazy figure images that never enter the
    # viewport. Make every image eligible to load before enforcing readiness.
    page.evaluate("() => document.querySelectorAll('img').forEach(image => image.loading = 'eager')")
    wait_for_images(page)
    page.evaluate("() => scrollTo(0, 0)")
    wait_for_images(page)
    page.wait_for_timeout(500)
def wait_for_dialog(page, selector):
    target = page.locator(selector)
    target.wait_for(state="visible")
    page.wait_for_function("selector => { const node = document.querySelector(selector); return node && getComputedStyle(node).opacity === '1' && node.getAnimations().length === 0; }", selector)
    page.wait_for_timeout(300)
    return target
def capture_context(browser, width, height, dark):
    context = browser.new_context(viewport={"width": width, "height": height})
    dark_literal = "true" if dark else "false"
    context.add_init_script(f"""() => {{
        const dark = {dark_literal};
        try {{ localStorage.setItem('s2s-theme', dark ? 'dark' : 'light'); }} catch (_) {{}}
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(dark ? 'dark' : 'light');
    }}""")
    return context
def open_beat(page, beat="incident"):
    trigger = page.locator(f'.thread-scene#{"thread-" + beat} a[href*="/thread/"]').first
    trigger.scroll_into_view_if_needed(); trigger.click(); dialog(page).wait_for(state="visible"); wait_frames(page); return trigger
def close_root(page):
    dialog(page).evaluate("d => d.addEventListener('close', () => window.__qaClosed = true, {once:true})")
    page.evaluate("window.__qaClosed = false")
    page.locator("[data-focus-close]").click()
    page.wait_for_function("() => window.__qaClosed === true")
    wait_frames(page, 4)
def root_scroll(page): return page.evaluate("window.scrollY")
def focus_summary(page): return page.evaluate("() => ({tag:document.activeElement?.tagName, text:(document.activeElement?.textContent||'').trim().slice(0,48)})")
def route_path(page): return page.evaluate("location.pathname + location.hash")
def safely(test_id, fn):
    try: fn()
    except Exception as exc: line("FAIL", test_id, f"exception={type(exc).__name__}: {str(exc).splitlines()[0]}")

def test_suite(browser):
    desktop = browser.new_context(viewport={"width": 1440, "height": 900}, color_scheme="light")

    def n01():
        p = new_page(desktop); trigger = p.locator('.thread-scene#thread-incident a[href*="/thread/"]').first
        trigger.scroll_into_view_if_needed(); before = root_scroll(p); open_beat(p); close_root(p); after = root_scroll(p)
        delta = abs(after - before); focus = focus_summary(p)
        line("PASS" if delta <= 8 and focus["tag"] == "A" else "FAIL", "N01", f"open=True; settledDeltaY={delta}px; focus={focus['tag']}:{focus['text']!r}")
        p.close()
    safely("N01", n01)

    def n02():
        p = new_page(desktop); results=[]
        for beat in ("incident", "deployment", "use", "drift", "detection", "outcome"):
            tr = p.locator(f'.thread-scene#thread-{beat} a[href*="/thread/"]').first; tr.scroll_into_view_if_needed(); before=root_scroll(p); p.evaluate("value => window.__qaBeforeScroll = value", before)
            tr.click(); dialog(p).wait_for(state="visible"); locked=p.evaluate("() => document.body.style.position === 'fixed' && document.body.style.top === `-${window.__qaBeforeScroll}px`"); close_root(p); after=root_scroll(p)
            results.append(f"{beat}:{abs(after-before)}px/{locked}")
        ok=all(part.split(':')[1].split('px')[0] in tuple(str(i) for i in range(9)) and part.endswith('True') for part in results)
        line("PASS" if ok else "FAIL", "N02", "beats=" + ",".join(results)); p.close()
    safely("N02", n02)

    def n03():
        p=new_page(desktop); open_beat(p); title=p.locator("[data-focus-dialog] .thread-focus__title").text_content().strip()
        p.locator("[data-focus-dialog] a[href*='/figure/']").click(); p.wait_for_timeout(60); before=route_path(p)
        p.keyboard.press("Escape"); p.wait_for_timeout(100); wait_frames(p)
        restored=p.locator("[data-focus-dialog] .thread-focus__title").text_content().strip() if dialog(p).get_attribute("open") is not None else ""
        line("PASS" if "/figure/incident/" in before and restored==title else "FAIL", "N03", f"figureURL={before}; restoredTitle={restored!r}; expected={title!r}"); p.close()
    safely("N03", n03)

    def n04():
        p=new_page(desktop); open_beat(p)
        thread_evidence=p.locator("[data-focus-dialog] a[href*='/evidence/']").count()
        p.locator("[data-focus-close]").click(); p.wait_for_timeout(80)
        p.locator("a[href$='/evidence/']").first.click(); dialog(p).wait_for(state="visible")
        evidence_figures=p.locator("[data-focus-dialog] a[href*='/figure/']").count()
        line("FAIL" if thread_evidence == 0 or evidence_figures == 0 else "PASS", "N04", f"threadToEvidenceLinks={thread_evidence}; evidenceToFigureLinks={evidence_figures}; required nested chain is not exposed" if thread_evidence == 0 or evidence_figures == 0 else "nested chain exposed")
        p.close()
    safely("N04", n04)

    def n05():
        p=new_page(desktop); open_beat(p); p.locator("[data-focus-dialog] a[href*='/figure/']").click(); p.wait_for_timeout(80)
        figure=route_path(p); p.go_back(); p.wait_for_timeout(80); back_kind=p.locator("[data-focus-dialog] [data-focus-kind]").get_attribute("data-focus-kind")
        p.go_forward(); p.wait_for_timeout(80); forward_kind=p.locator("[data-focus-dialog] [data-focus-kind]").get_attribute("data-focus-kind")
        p.go_back(); p.go_back(); p.wait_for_timeout(120); root_open=dialog(p).get_attribute("open") is not None
        line("PASS" if "/figure/incident/" in figure and back_kind=="thread" and forward_kind=="figure" and not root_open else "FAIL", "N05", f"figure={figure}; back={back_kind}; forward={forward_kind}; rootDialogOpen={root_open}"); p.close()
    safely("N05", n05)

    def n06():
        fresh=browser.new_context(viewport={"width":1440,"height":900}); p=new_page(fresh, THREAD+"incident/")
        heading=p.locator("h1, h2").first.text_content().strip(); no_dialog=dialog(p).count() == 0
        line("PASS" if "Incident" in heading and no_dialog else "FAIL", "N06", f"freshURL={route_path(p)}; heading={heading!r}; dialogOpen={not no_dialog}"); p.close(); fresh.close()
    safely("N06", n06)

    def n07():
        fresh=browser.new_context(viewport={"width":1440,"height":900}); p=new_page(fresh, THREAD+"incident/"); p.reload(wait_until="networkidle")
        heading=p.locator("h1, h2").first.text_content().strip(); line("PASS" if "Incident" in heading else "FAIL", "N07", f"reloadURL={route_path(p)}; heading={heading!r}"); p.close(); fresh.close()
    safely("N07", n07)

    def n08():
        p=new_page(desktop); link=p.locator('.thread-scene#thread-incident a[href*="/thread/"]').first
        with desktop.expect_page(timeout=5000) as event: link.click(modifiers=["Meta"])
        popup=event.value; popup.wait_for_url("**/thread/incident/", timeout=5000)
        target=popup.url; line("PASS" if target.endswith("/thread/incident/") else "FAIL", "N08", f"newTabURL={target}"); popup.close(); p.close()
    safely("N08", n08)

    def n09():
        nojs=browser.new_context(viewport={"width":1440,"height":900}); nojs.route("**/*.js", lambda route: route.abort())
        p=new_page(nojs); scenes=p.locator(".thread-scene").count(); imgs=p.locator(".thread-scene img").count(); evidence=p.locator("a[href$='/evidence/']").count()
        direct=new_page(nojs, THREAD+"incident/"); heading=direct.locator("h1, h2").first.text_content().strip()
        line("PASS" if scenes==6 and imgs==6 and evidence>0 and "Incident" in heading else "FAIL", "N09", f"blockedJS=True; scenes={scenes}; images={imgs}; evidenceLinks={evidence}; directHeading={heading!r}"); direct.close(); p.close(); nojs.close()
    safely("N09", n09)

    def n10():
        broken=browser.new_context(viewport={"width":1440,"height":900}); broken.add_init_script("History.prototype.pushState = () => { throw new Error('qa pushState blocked') }")
        p=new_page(broken); p.locator('.thread-scene#thread-incident a[href*="/thread/"]').first.click(); p.wait_for_url("**/thread/incident/", timeout=5000)
        open_state=dialog(p).count() > 0 and dialog(p).get_attribute("open") is not None
        line("PASS" if not open_state and route_path(p).endswith("/thread/incident/") else "FAIL", "N10", f"pushState=throws; URL={route_path(p)}; dialogOpen={open_state}"); p.close(); broken.close()
    safely("N10", n10)

    def n11():
        p=new_page(desktop); p.locator("#thread-incident").scroll_into_view_if_needed(); before=root_scroll(p); open_beat(p)
        p.locator("[data-focus-dialog] a[href$='/essays/the-registry-wave-agentic-artifact-supply-chain/']").first.click(); p.wait_for_timeout(120); wait_frames(p); back=root_scroll(p)
        open_beat(p); p.locator("[data-focus-dialog]").get_by_text("Read this scene in the essay", exact=True).click(); p.wait_for_timeout(120); wait_frames(p); anchor_top=p.locator("#thread-incident").evaluate("el => Math.round(el.getBoundingClientRect().top)")
        line("PASS" if abs(back-before)<=8 and abs(anchor_top)<=120 else "FAIL", "N11", f"backDeltaY={abs(back-before)}px; readSceneTop={anchor_top}px"); p.close()
    safely("N11", n11)

    def n12():
        p=new_page(desktop); p.locator("#thread-drift").scroll_into_view_if_needed(); open_beat(p, "drift"); p.set_viewport_size({"width":390,"height":844}); close_root(p)
        top=p.locator("#thread-drift").evaluate("el => Math.round(el.getBoundingClientRect().top)")
        line("PASS" if abs(top)<=160 else "FAIL", "N12", f"returnViewport=390x844; anchorTop={top}px"); p.close()
    safely("N12", n12)

    def a01():
        p=new_page(desktop); trigger=open_beat(p); within=[]
        for _ in range(16): p.keyboard.press("Tab"); within.append(p.evaluate("() => document.querySelector('[data-focus-dialog]').contains(document.activeElement)"))
        p.keyboard.press("Escape"); p.wait_for_timeout(100); wait_frames(p); focus=focus_summary(p)
        line("PASS" if all(within) and focus["tag"]=="A" else "FAIL", "A01", f"tabSteps=16; contained={all(within)}; escapeFocus={focus['tag']}:{focus['text']!r}"); p.close()
    safely("A01", a01)

    def a02():
        reduced=browser.new_context(viewport={"width":1440,"height":900}, reduced_motion="reduce"); p=new_page(reduced); match=p.evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches"); transition=p.locator(".reading-companion__rail-fill").evaluate("el => getComputedStyle(el).transitionDuration")
        line("PASS" if match and float(transition.rstrip('s')) <= .00001 else "FAIL", "A02", f"mediaReduce={match}; railTransition={transition}"); p.close(); reduced.close()
    safely("A02", a02)

    def a03():
        measures=[]
        for size in ((320,844),(844,320)):
            c=browser.new_context(viewport={"width":size[0],"height":size[1]}); p=new_page(c); overflow=p.evaluate("document.documentElement.scrollWidth - innerWidth"); measures.append(f"{size[0]}x{size[1]}:{overflow}px"); p.close(); c.close()
        line("PASS" if all(item.endswith(":0px") for item in measures) else "FAIL", "A03", "; ".join(measures))
    safely("A03", a03)

    def a04():
        p=new_page(desktop); open_beat(p); label=dialog(p).get_attribute("aria-labelledby"); label_text=p.locator("#"+label).text_content().strip() if label else ""; p.locator("[data-focus-close]").click(); tables=p.locator("table").count(); links=p.locator("a[href]").count()
        line("PASS" if label_text and tables>=1 and links>0 else "FAIL", "A04", f"dialogLabel={label_text!r}; semanticTables={tables}; sourceLinks={links}"); p.close()
    safely("A04", a04)

    def c01():
        p=new_page(desktop); p.evaluate("scrollTo(0, document.body.scrollHeight*.45)"); p.wait_for_timeout(250); active=p.locator('[data-companion-link][aria-current="location"]').count()
        line("PASS" if active==1 else "FAIL", "C01", f"activeLocationMarkers={active}"); p.close()
    safely("C01", c01)

    def c02():
        p=new_page(desktop); p.locator("#what-the-registry-wave-actually-solved").scroll_into_view_if_needed(); p.wait_for_timeout(250); note=p.locator("[data-contextual-note]"); item=note.locator("[data-contextual-note-item]:not([hidden])").count(); note.locator("[data-contextual-note-item]:not([hidden]) [data-contextual-note-dismiss]").click() if item else None; p.wait_for_timeout(80); after=note.locator("[data-contextual-note-item]:not([hidden])").count()
        line("PASS" if item==1 and after==0 else "FAIL", "C02", f"visibleNoteBefore={item}; visibleNoteAfterDismiss={after}"); p.close()
    safely("C02", c02)

    def c03():
        p=new_page(desktop); toggle=p.locator("[data-thread-dock-toggle]"); toggle.click(); collapsed=toggle.get_attribute("aria-expanded"); hold=p.locator("[data-thread-dock-hold]").first; toggle.click(); hold.click(); held=hold.get_attribute("aria-pressed"); open_beat(p); persisted=hold.get_attribute("aria-pressed")
        line("PASS" if collapsed=="false" and held=="true" and persisted=="true" else "FAIL", "C03", f"collapsed={collapsed}; held={held}; heldAfterScene={persisted}"); p.close()
    safely("C03", c03)

    def c04():
        tr=new_page(desktop, THREAD+"incident/"); er=new_page(desktop, EVIDENCE); tc=tr.locator(".thread-focus__rail > *").count(); ec=er.locator(".evidence-focus__rail > *").count()
        line("PASS" if tc==2 and ec==2 else "FAIL", "C04", f"threadRailChildren={tc}; evidenceRailChildren={ec}"); tr.close(); er.close()
    safely("C04", c04)

    def v01():
        p=new_page(desktop); scenes=p.locator(".thread-scene").count(); images=p.locator(".thread-scene img").count(); figures=p.locator("a[href*='/figure/']").count()
        line("PASS" if scenes==6 and images==6 and figures>=6 else "FAIL", "V01", f"threadScenes={scenes}; sceneImages={images}; figureRoutes={figures}"); p.close()
    safely("V01", v01)
    line("PENDING", "V02", "browser DOM can confirm rendered evidence fields, but cannot certify source provenance or absence of fabricated claims")

    def v03():
        p=new_page(desktop, dark=False); light=p.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--bg-base').trim()"); theme(p, True); dark=p.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--bg-base').trim()"); mob=browser.new_context(viewport={"width":390,"height":844}); m=new_page(mob, dark=True); trigger=m.locator("[data-mobile-contents-trigger]").count(); app=m.locator("[role=tablist]").count()
        line("PASS" if light!=dark and trigger==1 and app==0 else "FAIL", "V03", f"lightBg={light}; darkBg={dark}; mobileContents={trigger}; appTablists={app}"); m.close(); mob.close(); p.close()
    safely("V03", v03)

    def v04():
        p=new_page(desktop); bytes_=len(p.content().encode()); sections=p.locator("article h2").count(); scenes=p.locator(".thread-scene").count()
        line("PASS" if bytes_>100000 and sections>=6 and scenes==6 else "FAIL", "V04", f"htmlBytes={bytes_}; articleH2={sections}; scenes={scenes}"); p.close()
    safely("V04", v04)
    desktop.close()

def capture_atlas(browser):
    ATLAS.mkdir(parents=True, exist_ok=True)
    for old in ATLAS.glob("*.jpg"):
        old.unlink()
    states=[
        ("entry", ESSAY, None), ("threadscene-incident", ESSAY, "#thread-incident"),
        ("thread-focus-route", THREAD+"incident/", None), ("evidence-focus-index", EVIDENCE, None),
        ("evidence-record", f"/essays/{SLUG}/evidence/drift-check/", None), ("figure-viewer", FIGURE+"incident/", None),
    ]
    written=[]
    def save(page, label, name, dark, clip=None):
        filename=f"{label}__{name}__{'dark' if dark else 'light'}.jpg"
        page.screenshot(path=str(ATLAS/filename), type="jpeg", quality=85, clip=clip)
        written.append(filename)

    for label,path,fragment in states:
        for width,height,name in ((1440,900,"desktop"),(390,844,"mobile")):
            for dark in (False,True):
                context=capture_context(browser,width,height,dark)
                p=new_page(context,path+(fragment or ""),dark); preload(p); save(p,label,name,dark); p.close(); context.close()

    # Narrative positions on the essay, including the executive signal at entry.
    for label, action in (
        ("executive-signal", lambda p: p.locator(".executive-signal:visible").first.scroll_into_view_if_needed()),
        ("first-scroll", lambda p: p.locator("article h2").first.scroll_into_view_if_needed()),
        ("managed-variation", lambda p: p.locator("figure", has=p.locator("img[alt*='Before-and-after diagram']")).scroll_into_view_if_needed()),
        ("conclusion", lambda p: p.locator("article h2", has_text="What I can prove today.").scroll_into_view_if_needed()),
        ("conclusion-end", lambda p: p.locator(".where-this-sits").scroll_into_view_if_needed()),
    ):
        for width,height,name in ((1440,900,"desktop"),(390,844,"mobile")):
            for dark in (False,True):
                context=capture_context(browser,width,height,dark); p=new_page(context,ESSAY,dark); preload(p)
                try: action(p); wait_for_images(p); p.wait_for_timeout(500); save(p,label,name,dark)
                except Exception as exc: print(f'capture-skip {label} {name} {dark}: {type(exc).__name__}: {str(exc).splitlines()[0][:120]}')
                p.close(); context.close()

    for dark in (False,True):
        context=capture_context(browser,1440,1400,dark); p=new_page(context,ESSAY,dark); preload(p); save(p,"entry-tall","desktop-tall",dark); p.close(); context.close()

    # The companion crop is deliberately the rail only, at the first section position.
    for dark in (False,True):
        context=capture_context(browser,1440,900,dark); p=new_page(context,ESSAY,dark); preload(p)
        p.locator("article h2").first.scroll_into_view_if_needed(); p.wait_for_timeout(500)
        rail=p.locator("[data-reading-companion]"); box=rail.bounding_box()
        if box is None: raise RuntimeError("reading companion rail has no bounding box")
        save(p,"rail-companion","desktop",dark,box); p.close(); context.close()

    for dark in (False,True):
        c=capture_context(browser,390,844,dark); p=new_page(c,ESSAY,dark); preload(p); p.locator("[data-mobile-contents-trigger]").click(); wait_for_dialog(p,"[data-mobile-contents]"); save(p,"mobile-contents-sheet","mobile",dark); p.close(); c.close()
    # Overlays are separate from routes because their dialog and parent-state behavior are distinct reviewed surfaces.
    for width,height,name in ((1440,900,"desktop"),(390,844,"mobile")):
        for dark in (False,True):
            c=capture_context(browser,width,height,dark); p=new_page(c,ESSAY,dark); preload(p); open_beat(p); wait_for_dialog(p,"[data-focus-dialog]"); save(p,"thread-focus-overlay",name,dark); p.close(); c.close()
            c=capture_context(browser,width,height,dark); p=new_page(c,ESSAY,dark); preload(p); p.locator("a[href$='/evidence/']").first.click(); wait_for_dialog(p,"[data-focus-dialog]"); save(p,"evidence-focus-overlay",name,dark); p.close(); c.close()
            c=capture_context(browser,width,height,dark); p=new_page(c,ESSAY,dark); preload(p); p.locator("a[href*='/figure/']").first.click(); wait_for_dialog(p,"[data-focus-dialog]"); save(p,"figure-viewer-overlay",name,dark); p.close(); c.close()
    index=[name for name in written]
    (ATLAS/"INDEX.md").write_text("\n".join(index)+"\n")

def main():
    with sync_playwright() as pw:
        browser=pw.chromium.launch(headless=True)
        try:
            test_suite(browser); capture_atlas(browser)
        finally: browser.close()

if __name__ == "__main__": main()
