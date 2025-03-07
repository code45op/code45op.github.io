import os
import requests
from PIL import Image
import io
import base64

# Create assets directory if it doesn't exist
if not os.path.exists('assets'):
    os.makedirs('assets')

def generate_image(prompt, output_path):
    # Replace with your actual API key
    API_KEY = "sk-6yTr53MRvVHZTnMRWOXYwyrT5kddHjJViffmXW9NKnpEw44W"
    API_URL = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image"
    
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    
    body = {
        "text_prompts": [
            {
                "text": prompt,
                "weight": 1
            },
            {
                "text": "blurry, low quality, distorted, ugly, deformed",
                "weight": -1
            }
        ],
        "cfg_scale": 7,
        "height": 1024,
        "width": 1024,
        "samples": 1,
        "steps": 30,
        "style_preset": "pixel-art"
    }
    
    response = requests.post(API_URL, headers=headers, json=body)
    
    if response.status_code == 200:
        data = response.json()
        image_data = base64.b64decode(data["artifacts"][0]["base64"])
        image = Image.open(io.BytesIO(image_data))
        image.save(output_path)
        print(f"Generated image saved to {output_path}")
    else:
        print(f"Error generating image: {response.text}")

# Background prompts for each section
backgrounds = {
    'hero-bg': """A majestic Minecraft landscape with mountains and floating islands.
        Include a dramatic sunset in the background.
        The scene should have floating blocks and particles.
        Style should be exactly like Minecraft with pixel art textures.
        Use warm colors for the sunset.""",
    
    'about-bg': """A cozy Minecraft library interior with rows of bookshelves.
        Include an enchanting table in the center with floating magical particles.
        Add glowing lanterns and ambient lighting.
        Style should be exactly like Minecraft with pixel art textures.
        Use warm, inviting colors.""",
    
    'experience-bg': """A grand Minecraft castle courtyard with redstone machinery.
        Include automated pistons and redstone contraptions.
        Add floating item frames with tools and equipment.
        Style should be exactly like Minecraft with pixel art textures.
        Use cool, technical colors.""",
    
    'skills-bg': """A Minecraft laboratory with brewing stands and crafting tables.
        Include glowing item frames with various tools and potions.
        Add particle effects and ambient lighting.
        Style should be exactly like Minecraft with pixel art textures.
        Use mysterious, magical colors.""",
    
    'education-bg': """A Minecraft university campus with grand lecture halls.
        Include graduation ceremony decorations and banners.
        Add floating books and educational items.
        Style should be exactly like Minecraft with pixel art textures.
        Use scholarly, dignified colors."""
}

# Generate character avatar
character_prompt = """A Minecraft-style pixel art character avatar of a professional software developer. 
The character should be wearing a business suit but in Minecraft pixel art style. 
The character should have a confident pose and a friendly expression. 
The background should be transparent. 
The style should be exactly like Minecraft character skins."""

# Generate all images
print("Generating character avatar...")
generate_image(character_prompt, "assets/character.png")

print("\nGenerating section backgrounds...")
for name, prompt in backgrounds.items():
    print(f"\nGenerating {name}...")
    generate_image(prompt, f"assets/{name}.jpg") 