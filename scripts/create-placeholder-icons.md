# Create Placeholder Icons

You need to create two icon files for the PWA:

1. `/public/icon-192x192.png` (192x192 pixels)
2. `/public/icon-512x512.png` (512x512 pixels)

## Quick Options:

### Option 1: Online Generator
Visit https://realfavicongenerator.net/ and generate icons from an image

### Option 2: Use ImageMagick (if installed)
```bash
# Create a simple green square with plant emoji
convert -size 192x192 xc:#22c55e -gravity center -pointsize 96 -annotate +0+0 "🌱" public/icon-192x192.png
convert -size 512x512 xc:#22c55e -gravity center -pointsize 256 -annotate +0+0 "🌱" public/icon-512x512.png
```

### Option 3: Use any image editor
- Create 192x192 and 512x512 PNG images
- Use a plant/water icon or emoji
- Save to `/public/` folder

### Option 4: Download from icon library
- https://www.flaticon.com/
- https://icons8.com/
- Search for "plant" or "water" icons
- Download PNG format, resize to required dimensions

