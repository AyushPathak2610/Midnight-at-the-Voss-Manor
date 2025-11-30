# 🎙️ ElevenLabs Voice Integration

## ✅ Now Active!

Your game now uses **ElevenLabs AI voices** for all characters and narration!

---

## Voice Assignments

Each character has a unique ElevenLabs voice with personalized settings:

### 👻 Ghost Characters

**Elara (Mother)**
- Voice: Bella
- Style: Gentle, maternal, warm
- Stability: 0.3 (very expressive for emotional moments)
- Perfect for: Soft, caring dialogue

**Harlan (Father/Scientist)**
- Voice: Clyde
- Style: Mature, thoughtful, confused
- Stability: 0.5 (moderate for confusion)
- Perfect for: Logical but uncertain dialogue

**Mira (Daughter)**
- Voice: Dorothy
- Style: Childlike, sweet, innocent
- Stability: 0.2 (very expressive, emotional)
- Perfect for: Playful, excited dialogue

**Theo (Uncle)**
- Voice: Antoni
- Style: Emotional, dramatic, theatrical
- Stability: 0.25 (very expressive for drama)
- Perfect for: Regretful, passionate dialogue

**Selene (Aunt)**
- Voice: Charlotte
- Style: Elegant, controlled, sophisticated
- Stability: 0.6 (more controlled, cold)
- Perfect for: Commanding, dignified dialogue

### 📖 Narrator

**Narrator**
- Voice: Sam
- Style: Clear, atmospheric, storytelling
- Stability: 0.45 (balanced)
- Perfect for: Scene descriptions and narration

---

## What Gets Voiced

### ✅ Automatically Voiced

**Scene Introductions:**
- Intro scene narrations (4 shots)
- Foyer entrance narration
- Study entrance narration
- Nursery entrance narration
- Chapel entrance narration

**Character Dialogue:**
- Elara's introduction
- Harlan's introduction
- Mira's introduction
- Chapel reunion dialogue (all 5 ghosts)
- Completion messages

**Ghost Debates:**
- All 5 agent responses
- Consensus messages
- Each ghost speaks with their unique voice

**Ending:**
- Final narration
- Credits

---

## How It Works

### The Flow

1. **Scene loads** → Narrator speaks scene description
2. **Ghost appears** → Ghost speaks with their unique voice
3. **Player clicks "Ask Ghost Council"** → All 5 ghosts debate
4. **Each response** → Spoken by the corresponding ghost
5. **Consensus** → Spoken by Elara (as mediator)

### Technical Details

**ElevenLabs API:**
- Model: `eleven_monolingual_v1`
- Format: MP3 audio
- Streaming: Sequential queue (one at a time)
- Fallback: Browser TTS if API fails

**Voice Settings:**
- Stability: Controls expressiveness (lower = more emotional)
- Similarity Boost: Controls voice consistency
- Speaker Boost: Enabled for clarity
- Style: 0.5 (balanced)

---

## What You'll Hear

### Intro Scene
```
Narrator: "Lost in the storm..."
Narrator: "Something watches from the shadows..."
Narrator: "A mansion looms ahead..."
Narrator: "The gate opens... there's no turning back."
```

### Foyer Scene
```
Narrator: "You enter the foyer. Dust hangs in moonbeams..."
Elara: "Welcome, traveler. I am Elara... once mother to this family..."
[Player clicks Ask Ghost Council]
Elara: "Focus on love and family bonds..."
Harlan: "I analyze the categories logically..."
Mira: "The happy ones! Like when we played!"
Theo: "Your family moments define you..."
Selene: "Truth matters. Match honestly."
Elara: [Consensus] "Start with the obvious happy memories..."
```

### Chapel Reunion
```
Narrator: "The five ghosts stand in a circle..."
Elara: "My family... together again."
Harlan: "I remember everything now."
Mira: "Mommy! Daddy! You can see me!"
Theo: "Brother... I'm sorry I ran."
Selene: "Theo... I forgive you."
```

---

## Performance

**API Usage:**
- ~50-100 characters per narration line
- ~20-30 characters per ghost response
- Total per playthrough: ~1,000-1,500 characters
- ElevenLabs free tier: 10,000 characters/month
- **You can play ~7-10 full games per month on free tier**

**Response Time:**
- ElevenLabs API: ~1-2 seconds per line
- Audio playback: Real-time (matches speech length)
- Queue system: Prevents overlapping voices

---

## Toggle Voice

**TTS Toggle Button** (top-right corner):
- Click to enable/disable all voices
- Persists across page reloads
- Stops current speech immediately

---

## Fallback Behavior

If ElevenLabs API fails:
1. Automatically falls back to browser TTS
2. Uses same voice configurations (pitch, rate, volume)
3. Continues gameplay without interruption
4. Console logs the fallback

---

## API Key Status

✅ **ElevenLabs API Key Configured**
- Key found in `.env`
- Service initialized successfully
- All voices will use ElevenLabs

To verify:
```bash
# Check console on game start
# Should see: "TTS: ElevenLabs API key found"
# NOT: "TTS: ElevenLabs API key not found, using browser TTS fallback"
```

---

## Emotional Delivery

The system adds **emotional pauses** based on character:

**Mira (Excited):**
- Extra emphasis on exclamations
- Faster delivery
- "Yay! The tree is pretty now!"

**Theo (Dramatic):**
- Pauses after questions
- Theatrical timing
- "Brother... I'm sorry I ran."

**Selene (Cold):**
- Deliberate pauses after periods
- Slow, commanding delivery
- "Theo... I forgive you."

**Elara (Gentle):**
- Soft pauses after ellipsis
- Warm, maternal pacing
- "Welcome, traveler..."

**Harlan (Confused):**
- Uncertain pauses
- Measured, analytical delivery
- "I... I remember fragments..."

---

## What Changed

**Before:**
- Browser TTS only
- Generic voices
- No character personality in voice

**After:**
- ✅ ElevenLabs AI voices
- ✅ Unique voice per character
- ✅ Emotional delivery
- ✅ Professional narration
- ✅ Automatic fallback to browser TTS

---

## Test It

```bash
npm run dev
```

1. Start game
2. Listen to intro narration (Narrator voice)
3. Meet Elara (Bella voice - gentle, maternal)
4. Click "Ask Ghost Council"
5. Hear all 5 unique voices debate
6. Continue to hear Harlan (Clyde), Mira (Dorothy), etc.

**You should hear professional AI voices, not robotic browser TTS!**

---

## Troubleshooting

**No voice at all:**
- Check TTS toggle (top-right) is enabled
- Check browser console for errors
- Verify `.env` has `NEXT_PUBLIC_ELEVENLABS_API_KEY`

**Robotic browser voice instead of AI:**
- Check API key is correct
- Check console for "ElevenLabs API error"
- Verify you have characters remaining in free tier

**Voice cuts off:**
- This is normal - queue system prevents overlap
- Each voice waits for previous to finish

---

**Your game now has professional voice acting! 🎙️✨**
