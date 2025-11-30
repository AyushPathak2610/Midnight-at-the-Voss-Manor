#!/usr/bin/env node

/**
 * Pre-generate all static audio files for the game
 * This saves API calls and ensures consistent audio quality
 */

const fs = require('fs')
const path = require('path')
require('dotenv').config()

const ELEVENLABS_API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY?.trim()

if (!ELEVENLABS_API_KEY) {
  console.error('❌ NEXT_PUBLIC_ELEVENLABS_API_KEY not found in .env')
  process.exit(1)
}

console.log(`Using API key: ${ELEVENLABS_API_KEY.substring(0, 10)}...`)
console.log(`Key length: ${ELEVENLABS_API_KEY.length}\n`)

// Voice IDs
const VOICES = {
  narrator: 'pNInz6obpgDQGcFmaJgB', // Adam - deep, natural
  elara: 'EXAVITQu4vr4xnSDxMaL',    // Bella - gentle, maternal
  harlan: '2EiwWnXFnvU5JabPnv8n',   // Clyde - mature, thoughtful
  mira: 'ThT5KcBeYPX3keUQqHPh',     // Dorothy - childlike
  theo: 'ErXwobaYiN019PkySvjV',     // Antoni - dramatic
  selene: 'XB0fDUnXU5powFXDhCwa'    // Charlotte - elegant
}

// Voice settings
const VOICE_SETTINGS = {
  narrator: { stability: 0.4, similarity_boost: 0.75 }, // More expressive
  elara: { stability: 0.3, similarity_boost: 0.7 },
  harlan: { stability: 0.5, similarity_boost: 0.75 },
  mira: { stability: 0.2, similarity_boost: 0.65 },
  theo: { stability: 0.25, similarity_boost: 0.7 },
  selene: { stability: 0.6, similarity_boost: 0.8 }
}

// All static dialogue
const STATIC_AUDIO = {
  // Intro narrations
  'narrator_intro_1': "Lost in the storm...",
  'narrator_intro_2': "Something watches from the shadows...",
  'narrator_intro_3': "A mansion looms ahead...",
  'narrator_intro_4': "The gate opens... there's no turning back.",
  
  // Foyer
  'narrator_foyer_intro': "You enter the foyer. Dust hangs in moonbeams. A lantern ignites on its own...",
  'elara_foyer_intro': "Welcome, traveler. I am Elara... once mother to this family. We are trapped here, our bonds fractured by tragedy. Help us remember... help us weave our memories back together.",
  'elara_foyer_complete': "The tapestry weaves itself... memories restored. Thank you.",
  
  // Study
  'narrator_study_intro': "Books orbit a pulsing crystal. The room itself seems to twist...",
  'harlan_study_intro': "I... I remember fragments. The Eternal Harmony project. I wanted to connect us all... forever. But something went wrong. My memories... scattered like data packets. Help me... reconstruct them.",
  'harlan_study_complete': "I... I remember now. The family. The love. The experiment... it was meant to preserve that.",
  
  // Nursery
  'narrator_nursery_intro': "Toys float in zero gravity. Crayon drawings animate on the walls...",
  'mira_nursery_intro': "Hi! I'm Mira! Do you wanna play? Mommy and Daddy are here but... they can't see me anymore. I miss bedtime stories and hugs. Can you help me remember the happy times?",
  'mira_nursery_complete': "Yay! The tree is pretty now! I remember everything! Thank you for playing with me!",
  
  // Chapel
  'narrator_chapel_intro': "The Chapel. Stained glass windows depict the family in happier times. The Nexus Crystal glows golden on the altar.",
  'narrator_chapel_reunion': "The five ghosts stand in a circle. The Nexus Crystal pulses with their combined energy.",
  'elara_chapel_reunion': "My family... together again.",
  'harlan_chapel_reunion': "I remember everything now.",
  'mira_chapel_reunion': "Mommy! Daddy! You can see me!",
  'theo_chapel_reunion': "Brother... I'm sorry I ran.",
  'selene_chapel_reunion': "Theo... I forgive you.",
  'narrator_chapel_ending': "The light consumes everything. When it fades, the mansion stands peaceful in morning light. The five ghosts have found peace. Not through a single mind, but through five independent AI agents learning to work together."
}

// Music prompts
const MUSIC_PROMPTS = {
  intro: 'Dark atmospheric horror ambience with distant thunder, eerie wind, ominous drones, gothic mansion atmosphere, 60 seconds',
  foyer: 'Melancholic piano melody with strings, sad but beautiful, haunting memories, gentle ghostly atmosphere, 60 seconds',
  study: 'Glitchy electronic ambience, fragmented memories, digital corruption sounds, sci-fi horror atmosphere, 60 seconds',
  nursery: 'Innocent music box melody slowly distorting, childlike wonder turning eerie, soft lullaby with dark undertones, 60 seconds',
  chapel: 'Epic orchestral crescendo, emotional resolution, hope and sadness combined, cinematic finale atmosphere, 60 seconds'
}

async function generateVoice(filename, text, character) {
  const voiceId = VOICES[character]
  const settings = VOICE_SETTINGS[character]
  
  console.log(`Generating: ${filename}...`)
  
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: settings.stability,
            similarity_boost: settings.similarity_boost,
            style: 0.5,
            use_speaker_boost: true
          }
        })
      }
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    const outputPath = path.join(__dirname, '..', 'public', 'audio', 'voices', `${filename}.mp3`)
    fs.writeFileSync(outputPath, buffer)
    
    console.log(`✅ ${filename}.mp3`)
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500))
  } catch (error) {
    console.error(`❌ Failed to generate ${filename}:`, error.message)
  }
}

async function generateMusic(scene, prompt) {
  console.log(`Generating music: ${scene}...`)
  
  try {
    const response = await fetch(
      'https://api.elevenlabs.io/v1/sound-generation',
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY
        },
        body: JSON.stringify({
          text: prompt,
          duration_seconds: 60,
          prompt_influence: 0.3
        })
      }
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    const outputPath = path.join(__dirname, '..', 'public', 'audio', 'music', `${scene}.mp3`)
    fs.writeFileSync(outputPath, buffer)
    
    console.log(`✅ ${scene}.mp3`)
    
    // Longer delay for music generation
    await new Promise(resolve => setTimeout(resolve, 2000))
  } catch (error) {
    console.error(`❌ Failed to generate ${scene} music:`, error.message)
  }
}

async function main() {
  console.log('🎙️ Generating Static Audio Files\n')
  
  // Create directories
  const voicesDir = path.join(__dirname, '..', 'public', 'audio', 'voices')
  const musicDir = path.join(__dirname, '..', 'public', 'audio', 'music')
  
  fs.mkdirSync(voicesDir, { recursive: true })
  fs.mkdirSync(musicDir, { recursive: true })
  
  // Generate all voices
  console.log('\n📢 Generating Voices...\n')
  for (const [filename, text] of Object.entries(STATIC_AUDIO)) {
    const character = filename.split('_')[0] // Extract character from filename
    await generateVoice(filename, text, character)
  }
  
  // Generate all music
  console.log('\n🎵 Generating Music...\n')
  for (const [scene, prompt] of Object.entries(MUSIC_PROMPTS)) {
    await generateMusic(scene, prompt)
  }
  
  console.log('\n✅ All audio files generated!')
  console.log(`\nVoices: public/audio/voices/ (${Object.keys(STATIC_AUDIO).length} files)`)
  console.log(`Music: public/audio/music/ (${Object.keys(MUSIC_PROMPTS).length} files)`)
  console.log('\n💡 These files are now cached locally and won\'t require API calls!')
}

main().catch(console.error)
