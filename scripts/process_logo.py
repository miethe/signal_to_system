from PIL import Image, ImageChops

def process_image(input_path, output_path):
    # Open the image and convert to RGBA
    img = Image.open(input_path).convert("RGBA")
    
    # Ensure it's not mostly transparent already
    # For a black background, we want to handle the alpha channel based on lightness
    # Or just use a straightforward approach:
    # 1. Convert to grayscale to use as alpha channel (if text is white/bright, background is black)
    # The text is gold/beige. Let's create an alpha mask from the luminance.
    
    gray = img.convert("L")
    
    # Let's crop it first. Calculate bounding box of non-black pixels.
    # getbbox() works on non-zero pixels. It's essentially non-black for an 'L' mode.
    # threshold to avoid noise:
    point_table = [0 if i < 15 else 255 for i in range(256)]
    mask = gray.point(point_table)
    bbox = mask.getbbox()
    
    if bbox:
        img = img.crop(bbox)
        gray = gray.crop(bbox)
        
    # Now replace the black background with transparency.
    # But because of anti-aliasing, a simple threshold leaves a dark halo.
    # A better trick for black backgrounds is to keep the color the same but set alpha to brightness!
    # Wait, if we set alpha to brightness, the gold color will become semi-transparent gold.
    # Let's use actual un-multiply:
    # Alpha = max(R,G,B). If Alpha > 0: R = R/Alpha, G = G/Alpha, B = B/Alpha.
    
    r, g, b, a = img.split()
    
    new_r = []
    new_g = []
    new_b = []
    new_a = []
    
    for rp, gp, bp in zip(r.getdata(), g.getdata(), b.getdata()):
        alpha = max(rp, gp, bp)
        # boost alpha a bit to preserve solidity of the gold, maybe map domain [0, 255]?
        # simplest:
        if alpha < 15: # threshold black
            new_r.append(0)
            new_g.append(0)
            new_b.append(0)
            new_a.append(0)
        else:
            # We don't necessarily need to un-multiply if it looks okay, but let's do a simple un-multiply to avoid dark edges
            if alpha > 0:
                new_r.append(min(255, int(rp * 255 / alpha)))
                new_g.append(min(255, int(gp * 255 / alpha)))
                new_b.append(min(255, int(bp * 255 / alpha)))
                new_a.append(alpha)
            else:
                new_r.append(0); new_g.append(0); new_b.append(0); new_a.append(0)
                
    r.putdata(new_r)
    g.putdata(new_g)
    b.putdata(new_b)
    a.putdata(new_a)
    
    out = Image.merge("RGBA", (r, g, b, a))
    out.save(output_path, "PNG")

process_image("src/assets/wordmark.png", "src/assets/wordmark_transparent.png")
print("Image processed successfully.")
