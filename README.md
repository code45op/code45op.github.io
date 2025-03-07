# Minecraft-Style Resume Website

A unique, interactive resume website styled after Minecraft, featuring parallax scrolling and level-up animations.

## Features

- Minecraft-style UI elements and animations
- Parallax scrolling effects
- Interactive skill cards
- Level-up animations when scrolling through sections
- Responsive design for all devices
- Pixel-perfect typography using Press Start 2P font

## Setup

1. Clone this repository
2. Add the following images to the `assets` folder:
   - `character.png`: A Minecraft-style character avatar
   - `minecraft-bg.jpg`: A Minecraft-style background image

3. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

## Required Assets

The following images are required in the `assets` folder:
- `character.png`: A Minecraft-style character avatar (200x200px recommended)
- `minecraft-bg.jpg`: A Minecraft-style background image (1920x1080px recommended)

## Customization

You can customize the website by:
1. Modifying colors in `styles.css` (look for the `:root` variables)
2. Adjusting parallax speeds in `index.html` (modify the `data-parallax` attributes)
3. Adding more sections or content in `index.html`
4. Modifying animations in `script.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License 