# 🎙️ Audio Generation Guide

## Generate All Static Audio Files

This will pre-generate all voice lines and background music, saving API calls and ensuring consistent quality.

---

## Quick Start

```bash
npm run generate-audio
```

This will create:
- `public/audio/voices/` - 22 voice files (narrations + character dialogue)
- `public/audio/music/` - 5 music files (one per scene)

---

## What Gets Generated

### Voice Files (22 total)

**Intro Narrations (4 files):**
- `narrator_intro_1.mp3` - "Lost in the storm..."
- `narrator_intro_2.mp3` - "Something watches from the shadows..."
- `narrator_intro_3.mp3` - "A mansion looms ahead..."
- `narrator_intro_4.mp3` - "The gate opens..."

**Foyer Scene (3 files):**
- `narrator_foyer_intro.mp3`
- `elara_foyer_intro.mp3`
- `elara_foyer_complete.mp3`

**Study Scene (3 files):**
- `narrator_study_intro.mp3`
- `harlan_study_intro.mp3`
- `harlan_study_complete.mp3`

**Nursery Scene (3 files):**
- `narrator_nursery_intro.mp3`
- `mira_nursery_intro.mp3`
- `mira_nursery_complete.mp3`

**Chapel Scene (9 files):**
- `narrator_chapel_intro.mp3`
- `narrator_chapel_reunion.mp3`
- `elara_chapel_reunion.mp3`
- `harlan_chapel_reunion.mp3`
- `mira_chapel_reunion.mp3`
- `theo_chapel_reunion.mp3`
- `selene_chapel_reunion.mp3`
- `narrator_chapel_ending.mp3`

### Music Files (5 total)

- `intro.mp3` - Dark horror ambience (60s loop)
- `foyer.mp3` - Melancholic piano (60s loop)
- `study.mp3` - Glitchy electronic (60s loop)
- `nursery.mp3` - Distorted music box (60s loop)
- `chapel.mp3` - Epic orchestral (60s loop)

---

## Voice Settings

### Narrator (Adam)
- **Stability:** 0.4 (MORE expressive, natural tonality)
- **Rate:** 1.1 (faster delivery)
- **Style:** Deep, atmospheric, engaging

### Character Voices
- **Elara (Bella):** Gentle, maternal (stability: 0.3)
- **Harlan (Clyde):** Confused scientist (stability: 0.5)
- **Mira (Dorothy):** Childlike, sweet (stability: 0.2)
- **Theo (Antoni):** Dramatic, emotional (stability: 0.25)
- **Selene (Charlotte):** Cold, elegant (stability: 0.6)

---

## Benefits

### 🚀 Performance
- **Zero API calls** for static content
- Instant playback (no generation delay)
- Consistent audio quality

### 💰 Cost Savings
- First playthrough: 27 API calls saved
- Every playthrough after: 27 API calls saved
- Only debates use API (~24 calls)

### 🎵 Better Experience
- No loading delays
- Consistent voice quality
- Reliable music playback
- Works offline (after first load)

---

## API Usage Comparison

### Without Pre-generated Audio

**Per Playthrough:**
- Static voices: ~22 calls
- Music: ~5 calls
- Debates: ~24 calls
- **Total: ~51 calls**

### With Pre-generated Audio

**First Time (Generation):**
- Generate all: ~27 calls (one-time)

**Every Playthrough:**
- Static voices: 0 calls (local files)
- Music: 0 calls (local files)
- Debates: ~24 calls (dynamic, must use API)
- **Total: ~24 calls**

**Savings: 53% per playthrough!**

---

## How It Works

### Voice Service

```typescript
// Check if text has pre-generated file
const staticFilename = this.getStaticAudioFilename(text, character)

if (staticFilename) {
  // Use local file
  const audio = new Audio(`/audio/voices/${staticFilename}.mp3`)
  audio.play()
} else {
  // Dynamic text (debates) - use API
  await this.speakWithElevenLabsAPI(text, character)
}
```

### Music Service

```typescript
// Try local file first
const audio = new Audio(`/audio/music/${scene}.mp3`)

audio.onerror = () => {
  // Fallback to API generation if file missing
  this.generateAndPlayMusic(scene)
}

audio.play()
```

---

## Generation Process

The script will:

1. **Create directories** (`public/audio/voices/`, `public/audio/music/`)
2. **Generate voices** (22 files, ~30 seconds)
3. **Generate music** (5 files, ~2 minutes)
4. **Save as MP3** files
5. **Report completion**

**Total time: ~3-4 minutes**

---

## Requirements

- ElevenLabs API key in `.env`
- Node.js installed
- Internet connection (for generation only)

---

## Troubleshooting

**"API key not found":**
```bash
# Make sure .env has:
NEXT_PUBLIC_ELEVENLABS_API_KEY=sk_your_key_here
```

**"API error: 429" (rate limit):**
- Script has built-in delays
- If it fails, wait a minute and run again
- Already generated files won't be regenerated

**Files not playing in game:**
- Check `public/audio/voices/` and `public/audio/music/` exist
- Check browser console for 404 errors
- Verify files are .mp3 format

**Music not looping:**
- This is normal - 60-second loops
- Music will restart seamlessly

---

## After Generation

### Commit to Git

```bash
git add public/audio/
git commit -m "Add pre-generated audio files"
```

### Deploy

The `public/` folder is automatically deployed with your app. Audio files will be served as static assets.

### Update

To regenerate (if you change text or voices):

```bash
# Delete old files
rm -rf public/audio/

# Regenerate
npm run generate-audio
```

---

## File Sizes

**Approximate sizes:**
- Voice files: ~50-200 KB each (~2 MB total)
- Music files: ~1-2 MB each (~7 MB total)
- **Total: ~9 MB**

This is acceptable for web deployment and provides huge performance benefits.

---

## Next Steps

1. **Generate audio:** `npm run generate-audio`
2. **Test game:** `npm run dev`
3. **Check console:** Should see "Using pre-generated audio"
4. **Verify:** No API calls for static content

---

**Your game will now have instant, high-quality audio with minimal API usage! 🎙️✨**
