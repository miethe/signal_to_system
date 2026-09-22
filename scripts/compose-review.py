#!/usr/bin/env python3
"""Stack a mockup crop above a capture crop for side-by-side review.

  python3 scripts/compose-review.py MOCKUP.png CAPTURE.png OUT.png [--height 200] [--width 1440]

The mockup is resized to --width (the mockups are 1448px wide, captures
1440px) and both are cropped to their top --height pixels, labelled, and
stacked with a thin divider.
"""
import argparse
from PIL import Image, ImageDraw

ap = argparse.ArgumentParser()
ap.add_argument("mockup")
ap.add_argument("capture")
ap.add_argument("out")
ap.add_argument("--height", type=int, default=200)
ap.add_argument("--width", type=int, default=1440)
ap.add_argument("--top", type=int, default=0, help="crop offset from the top of both images")
a = ap.parse_args()

m = Image.open(a.mockup).convert("RGB")
m = m.resize((a.width, round(m.height * a.width / m.width)), Image.LANCZOS)
c = Image.open(a.capture).convert("RGB")
rows = [("MOCKUP", m.crop((0, a.top, a.width, a.top + a.height))), ("BUILD", c.crop((0, a.top, a.width, a.top + a.height)))]
label_h, gap = 22, 6
out = Image.new("RGB", (a.width, len(rows) * (a.height + label_h) + gap), (24, 24, 30))
d = ImageDraw.Draw(out)
y = 0
for name, img in rows:
    d.text((10, y + 5), name, fill=(220, 220, 228))
    out.paste(img, (0, y + label_h))
    y += a.height + label_h + gap
out.save(a.out)
print(a.out)
