import re

with open("public/assets/s2s.svg", "r") as f:
    svg_data = f.read()

# Look for paths that start M0.000... 
# Wait, let's parse the paths and remove any subpath that looks like an exact viewBox rectangle.
# The viewBox is 0 0 400 216.32653061224488
# In path1, the bounding box is:
# M0.000 108.167 L 0.000 216.333 200.000 216.333 L 400.000 216.333 400.000 108.167 L 400.000 0.000 200.000 0.000 L 0.000 0.000 0.000 108.167
# Let's remove any subpath matching this.
subpath_to_remove = r"M\s*0\.000\s*\d+\.\d+\s*L\s*0\.000\s*\d+\.\d+\s*(?:L\s*)?\d+\.\d+\s*\d+\.\d+\s*L\s*\d+\.\d+\s*\d+\.\d+\s*\d+\.\d+\s*\d+\.\d+\s*L\s*\d+\.\d+\s*0\.000\s*\d+\.\d+\s*0\.000\s*L\s*0\.000\s*0\.000\s*0\.000\s*\d+\.\d+"

cleaned_svg = re.sub(subpath_to_remove, "", svg_data)

with open("public/assets/s2s_transparent.svg", "w") as f:
    f.write(cleaned_svg)

print("Original length:", len(svg_data))
print("Cleaned length:", len(cleaned_svg))
