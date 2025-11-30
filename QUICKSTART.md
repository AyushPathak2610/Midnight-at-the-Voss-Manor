# Shadowed Haven - 5-Minute Quickstart

## Get Running in 3 Commands

```bash
npm install
cp .env.example .env
npm run dev
```

Then open http://localhost:3000

## Add Your Groq API Key (FREE!)

Edit `.env`:
```env
GROQ_API_KEY=gsk_your-actual-key-here
```

Get your FREE key at: https://console.groq.com/keys

(Groq offers generous free tier with fast inference!)

## Test It Works

1. Click through intro scene
2. Meet Elara in the foyer
3. Click **"Ask Ghosts for Hint"**
4. Watch the debug panel (bottom right) - you'll see all 5 ghosts debating!

## What You're Seeing

- **5 independent AI agents** powered by Groq's Llama 3.1 (Elara, Harlan, Mira, Theo, Selene)
- **Real-time debate** (not pre-scripted)
- **MCP integrations** (image gen, memory, blockchain)
- **Kiro Agent Hooks** orchestrating everything

## Optional: Add More Capabilities

**The game works perfectly without these!** But if you want the full experience:

### ElevenLabs (Character Voice Acting) - RECOMMENDED!
1. Go to https://elevenlabs.io/sign-up
2. Sign up (free 10,000 chars/month)
3. Get API key from Settings → API Keys
4. Add to `.env`:
```env
NEXT_PUBLIC_ELEVENLABS_API_KEY=your-key-here
```

**Each character gets unique voice:**
- Elara: Soft, maternal warmth
- Harlan: Deep, confused scientist
- Mira: High-pitched, childlike innocence
- Theo: Dramatic, regretful
- Selene: Cold, elegant, commanding

**Without this:** Browser TTS fallback (still works, just less expressive)

### Replicate (Mira's Crayon Drawings)
1. Go to https://replicate.com/account/api-tokens
2. Sign up (free $5 credit)
3. Create token, add to `.env`:
```env
REPLICATE_API_KEY=r8_your-key-here
```

### Pinecone (Harlan's Memory)
1. Go to https://app.pinecone.io
2. Sign up (free tier, no card needed)
3. Get API key, add to `.env`:
```env
PINECONE_API_KEY=your-key-here
```

**Without these:** App uses placeholder images and in-memory storage (still works great!).

## Verify Everything

```bash
npm run verify
```

This checks:
- ✅ Dependencies installed
- ✅ .env configured
- ✅ Kiro files present
- ✅ MCP server ready

**Test MCP server (optional):**
```bash
npm run test-mcp
```

Should show: `Blockchain Vows MCP Server started`

**Note:** If you see MCP errors in Kiro IDE, ignore them! The MCP integration works through API routes. See `docs/WHY_MCP_WORKS.md` for details.

## Next Steps

1. **Explore the code:**
   - `lib/agents/ghostAgents.ts` - See the 5 agent personalities
   - `.kiro/hooks/on-puzzle-hint.json` - Agent hook definition
   - `.kiro/steering/ghost-agent-rules.md` - Personality rules

2. **Try Kiro features:**
   - Open Kiro IDE → Agent Hooks panel
   - Chat with Kiro: "Make Elara more poetic"
   - Watch it refine the personality

3. **Record your demo:**
   - Follow `DEMO_SCRIPT.md` for video guide
   - Show the debug panel prominently
   - Emphasize the real-time agent debates

## Troubleshooting

**"Missing GROQ_API_KEY":**
- Make sure `.env` exists with valid key
- Get free key at https://console.groq.com/keys
- Restart dev server: Ctrl+C, then `npm run dev`

**Agents not responding:**
- Check Groq API key is valid
- Check browser console for errors
- Groq free tier has rate limits (usually generous enough)

**Need help?**
- Read `SETUP.md` for detailed instructions
- Check `README.md` for architecture overview

## Ready to Submit?

See `HACKATHON_SUBMISSION.md` for:
- One-paragraph pitch
- Feature checklist
- Demo video tips
- Submission requirements

---

**You're 5 minutes away from seeing 5 AI ghosts argue about your fate. Let's go! 👻**
