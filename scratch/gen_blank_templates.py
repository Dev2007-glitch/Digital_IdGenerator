import os
# pyrefly: ignore [missing-import]
from PIL import Image, ImageDraw, ImageFont

def get_font(size):
    try:
        return ImageFont.truetype("arial.ttf", size)
    except:
        return ImageFont.load_default()

os.makedirs("public/templates", exist_ok=True)
os.makedirs("public/logos", exist_ok=True)

# 1. DU Template
# Vertical 600x900
img_du = Image.new('RGB', (600, 900), color='#ffffff')
draw_du = ImageDraw.Draw(img_du)
# Blue header
draw_du.rectangle([0, 0, 600, 120], fill='#0C60A8')
# Blue left sidebar
draw_du.rectangle([0, 120, 220, 900], fill='#1E73BE')
# Top white rounded area overlapping the header? No, let's keep it simple.
# Let's add some text for logo area
font_du_large = get_font(36)
font_du_small = get_font(20)
draw_du.text((250, 40), "DELHI UNIVERSITY", fill='#0C60A8', font=font_du_large)
draw_du.text((250, 85), "Lady Shri Ram College", fill='#0C60A8', font=font_du_small)
# White rounded box for the photo in the left sidebar
draw_du.rounded_rectangle([30, 180, 190, 380], radius=10, fill='#ffffff', outline='#ffffff')
# A dummy barcode at the bottom of the white area
for i in range(250, 550, 8):
    draw_du.line([(i, 750), (i, 830)], fill='#000000', width=4)
img_du.save("public/templates/du.png")

# 2. VIT Template
# Vertical 600x900
img_vit = Image.new('RGB', (600, 900), color='#ffffff')
draw_vit = ImageDraw.Draw(img_vit)
draw_vit.rectangle([0, 0, 600, 900], outline='#e0e0e0', width=4)
# Header
font_vit_large = get_font(48)
font_vit_small = get_font(24)
draw_vit.text((230, 40), "VIT", fill='#000000', font=font_vit_large)
draw_vit.text((150, 100), "Vellore Institute of Technology", fill='#000000', font=font_vit_small)
draw_vit.text((180, 130), "CHENNAI CAMPUS", fill='#000000', font=font_vit_small)
# Photo box
draw_vit.rectangle([180, 200, 420, 500], outline='#cccccc', width=2)
# Bottom blue strip
draw_vit.rounded_rectangle([40, 750, 560, 820], radius=10, fill='#1E3A8A')
font_vit_bold = get_font(32)
draw_vit.text((200, 765), "HOSTELLER", fill='#ffffff', font=font_vit_bold)
img_vit.save("public/templates/vit.png")

# 3. VVIT Template
# Vertical 600x900
img_vvit = Image.new('RGB', (600, 900), color='#F1828D')
draw_vvit = ImageDraw.Draw(img_vvit)
# White middle area
draw_vvit.rectangle([0, 450, 600, 800], fill='#ffffff')
# Dark red footer
draw_vvit.rectangle([0, 800, 600, 900], fill='#B22222')
# Photo box at the top
draw_vvit.rectangle([200, 40, 400, 280], fill='#ffffff', outline='#cccccc', width=2)
# VVIT Logo box in the white area
draw_vvit.rectangle([250, 600, 350, 700], fill='#E46A6A')
draw_vvit.text((265, 630), "VVIT", fill='#ffffff', font=get_font(28))
# Footer text
draw_vvit.text((120, 820), "NAMBUR, GUNTUR, A.P, INDIA", fill='#ffffff', font=get_font(20))
draw_vvit.text((180, 850), "WWW.VVIT.NET", fill='#ffffff', font=get_font(20))
img_vvit.save("public/templates/vvit.png")

# 4. VIGNAN Template
# Horizontal 900x600 (or vertical?)
# Let's make it vertical to match the user's photo orientation (the text was sideways).
# Wait, user's Vignan photo is horizontal but the text is rotated.
# I will make it horizontal 900x600 so it's readable.
img_vig = Image.new('RGB', (900, 600), color='#ffffff')
draw_vig = ImageDraw.Draw(img_vig)
# Blue line at the top
draw_vig.rectangle([0, 0, 900, 15], fill='#1E3A8A')
# "STUDENT" text on the right side
# We need to draw rotated text. We can draw it on a separate image and paste.
txt_img = Image.new('RGBA', (600, 100), (255,255,255,0))
txt_draw = ImageDraw.Draw(txt_img)
txt_draw.text((100, 10), "S T U D E N T", fill='#1E3A8A', font=get_font(48))
txt_img = txt_img.rotate(-90, expand=1)
img_vig.paste(txt_img, (750, 0), txt_img)
# Vignan Logo area
draw_vig.text((50, 50), "VIGNAN'S", fill='#D32F2F', font=get_font(48))
draw_vig.text((50, 110), "Foundation for Science, Technology & Research", fill='#555555', font=get_font(20))
draw_vig.text((50, 140), "(Deemed to be UNIVERSITY)", fill='#555555', font=get_font(18))
# Photo box
draw_vig.rectangle([600, 100, 780, 350], outline='#cccccc', width=2)
img_vig.save("public/templates/vignan.png")

print("Templates generated successfully!")
