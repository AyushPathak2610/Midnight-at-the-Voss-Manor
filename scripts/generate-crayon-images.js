#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load environment variables
require('dotenv').config();

const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;

if (!REPLICATE_API_KEY) {
  console.error('Error: REPLICATE_API_KEY not found in .env file');
  process.exit(1);
}

const prompts = [
  "happy family with mom, dad, and little girl holding hands, simple crayon drawing",
  "family playing together in park, child's crayon art style, colorful and innocent",
  "mom and dad hugging child, hearts and flowers, kids crayon drawing",
  "family having picnic under tree, simple childlike drawing with crayons",
  "parents reading bedtime story to child, warm crayon sketch style"
];

async function generateImage(prompt, index) {
  console.log(`\n[${index + 1}/5] Generating: ${prompt}`);
  
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      version: '39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
      input: {
        prompt: `child's crayon drawing style, simple colorful sketch: ${prompt}`,
        negative_prompt: 'realistic, photographic, detailed, professional, 3d, complex',
        width: 512,
        height: 512,
        num_inference_steps: 30,
        guidance_scale: 7.5
      }
    });

    const options = {
      hostname: 'api.replicate.com',
      path: '/v1/predictions',
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          console.log('API Response:', JSON.stringify(response, null, 2));
          
          if (response.id) {
            console.log(`Prediction started: ${response.id}`);
            pollForResult(response.id, index).then(resolve).catch(reject);
          } else if (response.detail) {
            reject(new Error(`API Error: ${response.detail}`));
          } else {
            reject(new Error(`No prediction ID returned. Response: ${body}`));
          }
        } catch (error) {
          console.error('Parse error:', error);
          console.error('Response body:', body);
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function pollForResult(predictionId, index) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const maxAttempts = 60; // 60 seconds max

    const poll = () => {
      attempts++;
      console.log(`Polling attempt ${attempts}/${maxAttempts}...`);

      const options = {
        hostname: 'api.replicate.com',
        path: `/v1/predictions/${predictionId}`,
        method: 'GET',
        headers: {
          'Authorization': `Token ${REPLICATE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          try {
            const response = JSON.parse(body);
            
            if (response.status === 'succeeded' && response.output) {
              console.log(`✓ Image generated successfully!`);
              const imageUrl = Array.isArray(response.output) ? response.output[0] : response.output;
              downloadImage(imageUrl, index).then(resolve).catch(reject);
            } else if (response.status === 'failed') {
              reject(new Error('Image generation failed'));
            } else if (attempts >= maxAttempts) {
              reject(new Error('Timeout waiting for image'));
            } else {
              // Still processing, poll again
              setTimeout(poll, 1000);
            }
          } catch (error) {
            reject(error);
          }
        });
      });

      req.on('error', reject);
      req.end();
    };

    poll();
  });
}

async function downloadImage(url, index) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading image ${index + 1}...`);
    
    const outputDir = path.join(__dirname, '..', 'public', 'images', 'crayon-drawings');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filename = `family-${index + 1}.png`;
    const filepath = path.join(outputDir, filename);
    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ Saved: ${filename}`);
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('🎨 Generating 5 crayon-style family drawings...\n');
  console.log('This will take about 2-3 minutes.\n');

  try {
    for (let i = 0; i < prompts.length; i++) {
      await generateImage(prompts[i], i);
      // Small delay between requests
      if (i < prompts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.log('\n✓ All images generated successfully!');
    console.log('Images saved to: public/images/crayon-drawings/');
    console.log('\nYou can now run the game and see real AI-generated crayon art!');
  } catch (error) {
    console.error('\n✗ Error:', error.message);
    process.exit(1);
  }
}

main();
