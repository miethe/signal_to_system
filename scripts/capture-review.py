#!/usr/bin/env python3
"""Capture review screenshots of a built site (M1a visual review lane).

Starts `astro preview` for the given project root, captures each route in each
theme at each viewport, then stops the server. Theme is forced through the
same localStorage key BaseLayout's boot script reads (`s2s-theme`), so a
capture is exactly what a returning visitor with that preference sees.

Usage:
  python3 scripts/capture-review.py --root . --out docs/project_plans/s2s-v2/m1a-review \
      --route home=/ --route essay=/essays/<slug>/ [--full] [--viewport 1440x900]

Requires Python Playwright (chromium). Node 22 must be first on PATH.
"""
from __future__ import annotations

import argparse
import os
import signal
import socket
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

from playwright.sync_api import sync_playwright


def free_port() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def wait_up(url: str, timeout: float = 60) -> None:
    end = time.time() + timeout
    while time.time() < end:
        try:
            urllib.request.urlopen(url, timeout=2)
            return
        except Exception:
            time.sleep(0.4)
    raise SystemExit(f"preview server did not come up at {url}")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", default=".")
    ap.add_argument("--out", required=True)
    ap.add_argument("--route", action="append", required=True, help="name=/path/")
    ap.add_argument("--viewport", action="append", default=None, help="WxH (default 1440x900 and 390x844)")
    ap.add_argument("--theme", action="append", default=None, help="dark|light (default both)")
    ap.add_argument("--full", action="store_true", help="full-page screenshots")
    ap.add_argument("--prefix", default="")
    args = ap.parse_args()

    root = Path(args.root).resolve()
    out = Path(args.out).resolve()
    out.mkdir(parents=True, exist_ok=True)
    viewports = [tuple(map(int, v.split("x"))) for v in (args.viewport or ["1440x900", "390x844"])]
    themes = args.theme or ["dark", "light"]
    routes = [r.split("=", 1) for r in args.route]

    port = free_port()
    proc = subprocess.Popen(
        ["npx", "astro", "preview", "--port", str(port), "--host", "127.0.0.1"],
        cwd=root,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        start_new_session=True,
    )
    base = f"http://127.0.0.1:{port}"
    try:
        wait_up(base + "/")
        with sync_playwright() as p:
            browser = p.chromium.launch()
            for theme in themes:
                for (w, h) in viewports:
                    ctx = browser.new_context(viewport={"width": w, "height": h}, device_scale_factor=1)
                    ctx.add_init_script(f"try{{localStorage.setItem('s2s-theme','{theme}')}}catch(e){{}}")
                    page = ctx.new_page()
                    for name, path in routes:
                        page.goto(base + path, wait_until="load", timeout=45000)
                        page.wait_for_timeout(800)
                        page.evaluate("document.fonts.ready.then(() => true)")
                        if args.full:
                            # Walk the page so lazy images below the fold load.
                            page.evaluate("""async () => { const h = document.documentElement.scrollHeight;
                              for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
                              window.scrollTo(0, 0); }""")
                            page.wait_for_timeout(500)
                        page.wait_for_timeout(400)
                        fn = out / f"{args.prefix}{name}-{theme}-{w}.png"
                        page.screenshot(path=str(fn), full_page=args.full)
                        print(fn.relative_to(Path.cwd()) if fn.is_relative_to(Path.cwd()) else fn)
                    ctx.close()
            browser.close()
    finally:
        os.killpg(proc.pid, signal.SIGTERM)
        proc.wait(timeout=10)
    return 0


if __name__ == "__main__":
    sys.exit(main())
