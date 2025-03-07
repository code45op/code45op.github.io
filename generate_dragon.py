from PIL import Image, ImageDraw

def create_pixel_dragon(size=100):
    # Create a new image with transparency
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Define dragon colors
    body_color = (40, 0, 60, 255)  # Dark purple
    eye_color = (200, 0, 255, 255)  # Bright purple
    wing_color = (20, 0, 30, 255)  # Darker purple
    
    # Create pixel art (coordinates are relative to size)
    scale = size // 20  # This will create a 20x20 pixel art scaled up
    
    # Draw wings
    wing_pixels = [
        (5, 8), (6, 8), (7, 8),  # Left wing
        (12, 8), (13, 8), (14, 8),  # Right wing
        (4, 9), (5, 9), (6, 9),  # Left wing
        (13, 9), (14, 9), (15, 9),  # Right wing
    ]
    
    # Draw body
    body_pixels = [
        (9, 7), (10, 7),  # Head
        (8, 8), (9, 8), (10, 8), (11, 8),  # Upper body
        (9, 9), (10, 9),  # Lower body
        (9, 10), (10, 10),  # Tail
        (9, 11),  # Tail tip
    ]
    
    # Draw eyes
    eye_pixels = [(8, 7), (11, 7)]
    
    # Scale and draw all pixels
    for x, y in wing_pixels:
        draw.rectangle([x*scale, y*scale, (x+1)*scale-1, (y+1)*scale-1], wing_color)
    
    for x, y in body_pixels:
        draw.rectangle([x*scale, y*scale, (x+1)*scale-1, (y+1)*scale-1], body_color)
    
    for x, y in eye_pixels:
        draw.rectangle([x*scale, y*scale, (x+1)*scale-1, (y+1)*scale-1], eye_color)
    
    # Add glow effect
    glow_img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_img)
    
    # Draw larger rectangles with lower alpha for glow
    for x, y in eye_pixels:
        glow_draw.rectangle([
            (x*scale)-scale//2, 
            (y*scale)-scale//2, 
            (x+1)*scale+scale//2-1, 
            (y+1)*scale+scale//2-1
        ], (200, 0, 255, 50))
    
    # Composite the glow and main image
    img = Image.alpha_composite(glow_img, img)
    
    # Save the image
    img.save('assets/ender-dragon.png', 'PNG')
    print("Pixel art dragon generated successfully!")

if __name__ == "__main__":
    create_pixel_dragon(100)  # Creates a 100x100 pixel art 