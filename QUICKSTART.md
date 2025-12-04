# Midnight at the Voss Manor - Quickstart

## 🎮 Play Online (Instant)

**Live Demo:** [https://midnightatthevossmanor.vercel.app/](https://midnightatthevossmanor.vercel.app/)

No installation needed! Just click and play.

---

## 🚀 Run Locally (5 Minutes)

Get running in 3 commands:

```bash
npm install
cp .env.example .env
npm run dev
```

Then open http://localhost:3000

---

## Required: Add Your Groq API Key (FREE!)

Edit `.env`:
```env
GROQ_API_KEY=gsk_your-actual-key-here
```

**Get your FREE key:** https://console.groq.com/keys

(Groq offers generous free tier with fast inference - no credit card required!)

---

## Test It Works

1. Click through intro scene
2. Meet Elara in the foyer
3. Click **"Ask Ghosts for Hint"**
4. Watch all 5 ghosts debate in real-time!

---

## What You're Seeing

- **5 independent AI agents** powered by Groq's Llama 3.3-70b
- **Real-time debate** (not pre-scripted, never the same twice)
- **Unique personalities** (Elara is maternal, Harlan is logical, Mira is childlike)
- **Emergent storytelling** (agents genuinely disagree with each other)

---

## Optional: Add Voice Acting

**The game works perfectly without this!** But Azure TTS adds professional voice acting.

### Azure Cognitive Services TTS (Recommended)

1. Go to https://azure.microsoft.com/free/cognitive-services
2. Sign up (free 500,000 chars/month)
3. Create a Speech resource
4. Get API key and region
5. Add to `.env`:

```env
NEXT_PUBLIC_AZURE_TTS_API_KEY=your-key-here
NEXT_PUBLIC_AZURE_TTS_REGION=eastus
```

**Each character gets unique voice:**
- Elara: Soft, maternal warmth
- Harlan: Deep, confused scientist
- Mira: High-pitched, childlike innocence
- Theo: Dramatic, regretful
- Selene: Cold, elegant, commanding
- Narrator: Professional storytelling

**Without Azure TTS:** Browser's built-in TTS is used (still works, just less expressive)

---

## Troubleshooting

### "Missing GROQ_API_KEY" error
- Make sure `.env` exists with valid key
- Get free key at https://console.groq.com/keys
- Restart dev server: Ctrl+C, then `npm run dev`

### Agents not responding
- Check Groq API key is valid at console.groq.com
- Check browser console for errors
- Groq free tier has rate limits (usually generous enough)

### Voice not working
- Azure TTS is optional! Game works with browser TTS
- If you want Azure TTS, check API key and region in `.env`
- Make sure keys start with `NEXT_PUBLIC_` prefix

---

## Next Steps

### Explore the Code
- `lib/agents/ghostAgents.ts` - See the 5 agent personalities
- `.kiro/steering/ghost-agent-rules.md` - Personality rules
- `app/api/ghost-debate/route.ts` - Debate orchestration

### Try Kiro Features
- Open Kiro IDE
- Chat with Kiro: "Make Elara more poetic"
- Watch it refine the personality in real-time

### Record Your Demo
- Show the debate system prominently
- Emphasize real-time agent responses
- Highlight how agents disagree (not forced consensus)

---

## Ready to Submit?

See `KIRO_FEATURES.md` for:
- Detailed writeup on how we used Kiro
- Vibe coding vs spec-driven comparison
- Steering docs strategy
- Why this is Frankenstein-worthy

---

## 🎨 AI-Powered Everything

This game showcases AI across every modality:

- **AI Agents**: Groq (llama-3.3-70b) - 5 debating personalities
- **Voice Acting**: Azure TTS - 6 unique neural voices
- **Scene Images**: Google Gemini (Nano Banano Pro) - 26 gothic-cyberpunk scenes
- **Background Music**: Suno AI - 6 atmospheric scores
- **Development**: Kiro IDE - vibe coding + spec-driven + steering docs

**This is the Frankenstein magic:** Different AI systems stitched together into one cohesive experience.

---

**You're 5 minutes away from seeing 5 AI ghosts argue about your fate. Let's go! 👻**
