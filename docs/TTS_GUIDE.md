# Text-to-Speech (TTS) Guide

## Overview

Shadowed Haven features a comprehensive TTS system that brings every character and story moment to life with voice narration. The system supports two modes:

1. **ElevenLabs API** (Premium) - High-quality, emotionally expressive voices
2. **Browser TTS** (Fallback) - Built-in browser speech synthesis

## Features

✅ **Character-Specific Voices** - Each ghost has a unique voice that matches their personality
✅ **Emotional Delivery** - Pauses, emphasis, and tone adjusted per character
✅ **Automatic Narration** - All story text and dialogue is spoken automatically
✅ **Real-time Debates** - Ghost council debates are voiced as they appear
✅ **Toggle Control** - Players can enable/disable voice at any time

## Character Voice Profiles

### Elara (Maternal, Gentle)
- **Voice**: Rachel (ElevenLabs) - Soft, warm, nurturing
- **Rate**: Slow (0.85) - Deliberate, caring delivery
- **Stability**: 0.4 - More expressive for emotional moments
- **Personality**: Speaks with gentle pauses, maternal warmth

### Harlan (Scientific, Confused)
- **Voice**: Adam (ElevenLabs) - Deep, authoritative
- **Rate**: Measured (0.9) - Thoughtful, logical
- **Stability**: 0.6 - More stable, analytical
- **Personality**: Speaks with confusion, searching for memories

### Mira (Childlike, Innocent)
- **Voice**: Elli (ElevenLabs) - Young, bright, playful
- **Rate**: Fast (1.05) - Energetic, excited
- **Stability**: 0.3 - Very expressive, emotional
- **Personality**: High-pitched, enthusiastic, innocent

### Theo (Dramatic, Regretful)
- **Voice**: Josh (ElevenLabs) - Deep, theatrical
- **Rate**: Deliberate (0.95) - Dramatic pauses
- **Stability**: 0.35 - Very expressive for drama
- **Personality**: Theatrical delivery, seeking redemption

### Selene (Cold, Elegant)
- **Voice**: Domi (ElevenLabs) - Strong, commanding
- **Rate**: Slow (0.8) - Deliberate, controlled
- **Stability**: 0.7 - More controlled, cold
- **Personality**: Icy but softening, demands truth

### Narrator (Storytelling)
- **Voice**: Callum (ElevenLabs) - Clear, narrative
- **Rate**: Slow (0.85) - Immersive storytelling
- **Stability**: 0.5 - Balanced
- **Personality**: Neutral, atmospheric narration

## Setup Instructions

### Option 1: ElevenLabs API (Recommended)

1. **Sign up for ElevenLabs**
   - Visit: https://elevenlabs.io/sign-up
   - Free tier: 10,000 characters/month
   - No credit card required

2. **Get your API key**
   - Go to: https://elevenlabs.io/app/settings/api-keys
   - Click "Create API Key"
   - Copy the key

3. **Add to your .env file**
   ```bash
   NEXT_PUBLIC_ELEVENLABS_API_KEY=your_api_key_here
   ```

4. **Restart the dev server**
   ```bash
   npm run dev
   ```

### Option 2: Browser TTS (Automatic Fallback)

If no ElevenLabs API key is provided, the system automatically falls back to browser TTS:
- Works in all modern browsers
- No setup required
- Free and unlimited
- Quality varies by browser/OS

## How It Works

### Automatic Narration

Every story moment triggers TTS automatically:

```typescript
// Scene dialogue
<motion.div
  onAnimationComplete={() => {
    speak("Weaver of threads... I am Elara...", 'elara')
  }}
>
  <p>Story text here</p>
</motion.div>
```

### Ghost Debate Voices

The `GhostDebatePanel` component automatically speaks each agent's response:

```typescript
// Debates are voiced in real-time
useEffect(() => {
  if (messages.length > lastMessageCount.current) {
    const newMessages = messages.slice(lastMessageCount.current)
    newMessages.forEach((msg, idx) => {
      setTimeout(() => {
        speak(msg.message, msg.ghost as GhostVoice)
      }, idx * 500)
    })
  }
}, [messages])
```

### Emotional Pauses

The system adds natural pauses for emotional delivery:

- `...` → Dramatic pause
- `,` → Breath pause
- `!` → Emphasis (especially for Mira)
- `?` → Question pause (especially for Theo)
- `.` → Sentence pause (especially for Selene)

## Voice Toggle

Players can toggle voice on/off using the button in the top-right corner:

- 🔊 Voice On
- 🔇 Voice Off

The toggle is persistent across scenes and stops any currently playing audio.

## Technical Details

### ElevenLabs Integration

```typescript
const response = await fetch(
  `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
  {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey
    },
    body: JSON.stringify({
      text: processedText,
      model_id: 'eleven_monolingual_v1',
      voice_settings: {
        stability: 0.4,        // Expressiveness
        similarity_boost: 0.75, // Voice consistency
        style: 0.5,            // Style exaggeration
        use_speaker_boost: true
      }
    })
  }
)
```

### Browser TTS Fallback

```typescript
const utterance = new SpeechSynthesisUtterance(text)
utterance.pitch = 1.2  // Higher for female characters
utterance.rate = 0.9   // Slower for dramatic effect
utterance.volume = 0.9
window.speechSynthesis.speak(utterance)
```

## Performance

- **ElevenLabs**: ~1-2 second latency per request
- **Browser TTS**: Instant, no latency
- **Memory**: Audio blobs are cleaned up after playback
- **Bandwidth**: ~50KB per 30-word sentence (ElevenLabs)

## Troubleshooting

### No voice playing

1. Check browser console for errors
2. Verify ElevenLabs API key is correct
3. Check browser TTS is enabled (Settings → Accessibility)
4. Ensure voice toggle is ON (🔊)

### Voice sounds wrong

- ElevenLabs: Check API key and quota
- Browser TTS: Try different browser (Chrome/Edge recommended)
- Check character voice settings in `speechService.ts`

### Voice cuts off

- Reduce speech rate in voice config
- Check for overlapping speak() calls
- Ensure previous audio is stopped before new audio

## Cost Estimation

### ElevenLabs Free Tier (10,000 chars/month)

Average game playthrough:
- Intro: ~500 characters
- Foyer: ~800 characters
- Study: ~600 characters
- Nursery: ~700 characters
- Chapel: ~1,200 characters
- Debates: ~2,000 characters

**Total per playthrough**: ~5,800 characters
**Free tier allows**: ~1.7 playthroughs/month

For unlimited use, consider:
- Browser TTS fallback (free, unlimited)
- ElevenLabs paid plan ($5/month for 30,000 chars)

## Future Enhancements

- [ ] Voice caching to reduce API calls
- [ ] SSML support for advanced prosody
- [ ] Voice cloning for custom characters
- [ ] Multi-language support
- [ ] Background music mixing
- [ ] Voice speed controls for players

## Credits

Voice technology powered by:
- **ElevenLabs** - Premium AI voice synthesis
- **Web Speech API** - Browser TTS fallback
