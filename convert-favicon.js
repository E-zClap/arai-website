const sharp = require('sharp');
const fs = require('fs');

async function convertSvgToFavicon() {
  try {
    const svgBuffer = fs.readFileSync('./frontend/public/diam.svg');
    
    // Generate different sizes for favicon
    // 32x32 for favicon.ico
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile('./frontend/public/favicon-32.png');
    
    // 16x16 for favicon.ico
    await sharp(svgBuffer)
      .resize(16, 16)
      .png()
      .toFile('./frontend/public/favicon-16.png');
    
    // 192x192 for PWA
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile('./frontend/public/logo192.png');
    
    // 512x512 for PWA
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile('./frontend/public/logo512.png');
    
    console.log('Successfully created favicon images!');
  } catch (error) {
    console.error('Error converting favicon:', error);
  }
}

convertSvgToFavicon();
