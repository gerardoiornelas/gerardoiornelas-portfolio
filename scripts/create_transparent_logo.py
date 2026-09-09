import math
from PIL import Image, ImageFilter

def remove_background(img_path, out_path, bg_rgb=(8, 18, 27), threshold_low=12, threshold_high=65):
    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    
    bg_r, bg_g, bg_b = bg_rgb
    
    # Create new image with transparency
    out_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    pixels_in = img.load()
    pixels_out = out_img.load()
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels_in[x, y]
            
            # Distance from background color
            dr = r - bg_r
            dg = g - bg_g
            db = b - bg_b
            dist = math.sqrt(dr*dr + dg*dg + db*db)
            
            # Additional luminance above background
            lum_in = 0.299 * r + 0.587 * g + 0.114 * b
            lum_bg = 0.299 * bg_r + 0.587 * bg_g + 0.114 * bg_b
            lum_diff = lum_in - lum_bg
            
            # Determine alpha
            if dist < threshold_low and lum_diff <= 2:
                alpha = 0
            elif dist > threshold_high or lum_diff > 45:
                alpha = 255
            else:
                factor = (dist - threshold_low) / (threshold_high - threshold_low)
                alpha = int(255 * min(1.0, max(0.0, factor)))
            
            if alpha == 0:
                pixels_out[x, y] = (0, 0, 0, 0)
            else:
                # Color de-contamination (un-premultiply background)
                a_float = alpha / 255.0
                fg_r = int(min(255, max(0, bg_r + dr / max(0.05, a_float))))
                fg_g = int(min(255, max(0, bg_g + dg / max(0.05, a_float))))
                fg_b = int(min(255, max(0, bg_b + db / max(0.05, a_float))))
                pixels_out[x, y] = (fg_r, fg_g, fg_b, alpha)
                
    out_img.save(out_path, "PNG")
    print(f"Saved transparent PNG to {out_path}")

if __name__ == "__main__":
    # 1. Process user's uploaded image
    user_img = "/Users/ornelastechnologies/.gemini/antigravity/brain/0221ffe1-bad4-459d-ad38-3cc193026f15/.user_uploaded/media_1788752208977.png"
    out_user = "/Users/ornelastechnologies/.gemini/antigravity/brain/0221ffe1-bad4-459d-ad38-3cc193026f15/uigates_icon_transparent.png"
    remove_background(user_img, out_user)

    # 2. Also create high-res cropped transparent icon from master image
    master_img = "/Users/ornelastechnologies/.gemini/antigravity/brain/0221ffe1-bad4-459d-ad38-3cc193026f15/uigates_shadow_depth_final_1788747050823.jpg"
    img_m = Image.open(master_img)
    # The left icon is roughly bounded in [50, 80, 650, 680]
    crop_box = (60, 100, 620, 660)
    cropped_m = img_m.crop(crop_box)
    cropped_path = "/Users/ornelastechnologies/.gemini/antigravity/brain/0221ffe1-bad4-459d-ad38-3cc193026f15/master_icon_crop.png"
    cropped_m.save(cropped_path)
    
    out_master_hd = "/Users/ornelastechnologies/.gemini/antigravity/brain/0221ffe1-bad4-459d-ad38-3cc193026f15/uigates_icon_hd_transparent.png"
    remove_background(cropped_path, out_master_hd, threshold_low=10, threshold_high=60)
    
    # Save copies into src/images/uig/
    remove_background(cropped_path, "/Users/ornelastechnologies/Documents/Git/violetek/gerardoiornelas-portfolio/src/images/uig/uigates-icon-transparent.png", threshold_low=10, threshold_high=60)
