const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function generateIcon(size, outputPath) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Fill background with green color (matching app theme)
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(0, 0, size, size);

  // Draw tree emoji
  // Since canvas doesn't support emoji directly, we'll use a large font
  ctx.font = `${Math.floor(size * 0.7)}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Try to render emoji (may not work on all systems)
  try {
    ctx.fillText('🌳', size / 2, size / 2);
  } catch (e) {
    // Fallback: draw a simple tree shape
    console.log('Emoji rendering not supported, using fallback tree shape');
    drawTreeShape(ctx, size);
  }

  // Save as PNG
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Generated ${outputPath} (${size}x${size})`);
}

function drawTreeShape(ctx, size) {
  const centerX = size / 2;
  const centerY = size / 2;
  const treeSize = size * 0.6;

  // Draw tree trunk (brown)
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(centerX - treeSize * 0.1, centerY + treeSize * 0.2, treeSize * 0.2, treeSize * 0.3);

  // Draw tree top (green triangle)
  ctx.fillStyle = '#228B22';
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - treeSize * 0.3);
  ctx.lineTo(centerX - treeSize * 0.4, centerY + treeSize * 0.1);
  ctx.lineTo(centerX + treeSize * 0.4, centerY + treeSize * 0.1);
  ctx.closePath();
  ctx.fill();
}

// Generate icons
const publicDir = path.join(__dirname, '..', 'public');

// Generate 192x192 icon
generateIcon(192, path.join(publicDir, 'icon-192x192.png'));

// Generate 512x512 icon
generateIcon(512, path.join(publicDir, 'icon-512x512.png'));

console.log('\n✅ All icons generated successfully!');
console.log('Icons saved to public/ folder');

