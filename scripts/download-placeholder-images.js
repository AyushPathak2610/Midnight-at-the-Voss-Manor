#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

// Use free placeholder service with crayon-style colors
const images = [
  { url: 'https://picsum.photos/seed/family1/512/512', name: 'family-1.png' },
  { url: 'https://picsum.photos/seed/family2/512/512', name: 'family-2.png' },
  { url: 'https://picsum.photos/seed/family3/512/512', name: 'family-3.png' },
  { url: 'https://picsum.photos/seed/family4/512/512', name: 'family-4.png' },
  { url: 'https://picsum.photos/seed/family5/512/512', name: 'family-5.png' }
];

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${filename}...`);
    
    const outputDir = path.join(__dirname, '..', 'public', 'images', 'crayon-drawings');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filepath = path.join(outputDir, filename);
    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      // Follow redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, (redirectResponse) => {
          redirectResponse.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`✓ Saved: ${filename}`);
            resolve(filepath);
          });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Saved: ${filename}`);
          resolve(filepath);
        });
      }
    }).on('error', reject);
  });
}

async function main() {
  console.log('🎨 Downloading placeholder images for crayon drawings...\n');

  try {
    for (const img of images) {
      await downloadImage(img.url, img.name);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n✓ All images downloaded successfully!');
    console.log('Images saved to: public/images/crayon-drawings/');
    console.log('\nYou can now run the game and see the images!');
  } catch (error) {
    console.error('\n✗ Error:', error.message);
    process.exit(1);
  }
}

main();
