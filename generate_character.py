from PIL import Image, ImageDraw

def create_minecraft_character(size=200):
    # Create a new image with transparency
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Define colors
    skin_color = (235, 206, 179, 255)  # Professional skin tone
    suit_color = (45, 45, 45, 255)     # Dark suit
    tie_color = (150, 20, 20, 255)     # Red tie
    hair_color = (60, 40, 20, 255)     # Dark brown hair
    
    # Scale for pixel art (32x32 base)
    scale = size // 32
    
    # Draw hair (professional style)
    hair_pixels = [
        (12, 8), (13, 8), (14, 8), (15, 8), (16, 8), (17, 8), (18, 8), (19, 8),  # Top
        (12, 9), (13, 9), (14, 9), (15, 9), (16, 9), (17, 9), (18, 9), (19, 9),  # Middle
        (12, 10), (19, 10),  # Sides
    ]
    
    # Draw face
    face_pixels = [
        (13, 10), (14, 10), (15, 10), (16, 10), (17, 10), (18, 10),  # Top
        (13, 11), (14, 11), (15, 11), (16, 11), (17, 11), (18, 11),  # Upper
        (13, 12), (14, 12), (15, 12), (16, 12), (17, 12), (18, 12),  # Middle
        (13, 13), (14, 13), (15, 13), (16, 13), (17, 13), (18, 13),  # Lower
        (13, 14), (14, 14), (15, 14), (16, 14), (17, 14), (18, 14),  # Bottom
    ]
    
    # Draw suit
    suit_pixels = [
        (14, 15), (15, 15), (16, 15), (17, 15),  # Neck
        (13, 16), (14, 16), (15, 16), (16, 16), (17, 16), (18, 16),  # Shoulders
        (13, 17), (14, 17), (15, 17), (16, 17), (17, 17), (18, 17),  # Upper chest
        (13, 18), (14, 18), (15, 18), (16, 18), (17, 18), (18, 18),  # Lower chest
        (13, 19), (14, 19), (15, 19), (16, 19), (17, 19), (18, 19),  # Waist
    ]
    
    # Draw tie
    tie_pixels = [
        (15, 15), (16, 15),  # Top
        (15, 16), (16, 16),  # Upper
        (15, 17), (16, 17),  # Middle
        (15, 18), (16, 18),  # Lower
    ]
    
    # Draw eyes
    eye_pixels = [
        (14, 11), (17, 11)  # Eyes
    ]
    
    # Draw mouth (slight smile)
    mouth_pixels = [
        (15, 13), (16, 13)  # Simple smile
    ]
    
    # Scale and draw all pixels
    def draw_pixels(pixels, color):
        for x, y in pixels:
            draw.rectangle([
                x*scale, y*scale,
                (x+1)*scale-1, (y+1)*scale-1
            ], color)
    
    # Draw in layers
    draw_pixels(hair_pixels, hair_color)
    draw_pixels(face_pixels, skin_color)
    draw_pixels(suit_pixels, suit_color)
    draw_pixels(tie_pixels, tie_color)
    
    # Draw eyes and mouth in black
    draw_pixels(eye_pixels, (0, 0, 0, 255))
    draw_pixels(mouth_pixels, (0, 0, 0, 255))
    
    # Add subtle shading
    shading = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    shade_draw = ImageDraw.Draw(shading)
    
    # Right side shading for 3D effect
    for x, y in face_pixels:
        if x > 15:  # Right side of face
            shade_draw.rectangle([
                x*scale, y*scale,
                (x+1)*scale-1, (y+1)*scale-1
            ], (0, 0, 0, 30))
    
    # Composite the shading
    img = Image.alpha_composite(img, shading)
    
    # Save the image
    img.save('assets/character.png', 'PNG')
    print("Minecraft corporate character generated successfully!")

if __name__ == "__main__":
    create_minecraft_character(200)  # Creates a 200x200 pixel art 