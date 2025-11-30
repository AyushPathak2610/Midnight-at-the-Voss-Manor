# 👻 Shadowed Haven

**A gothic ghost story where 5 AI agents debate in real-time**

---

## What This Actually Is

A playable game where you help reunite a ghost family. The innovation: when you ask for puzzle hints, **5 separate AI agents respond in parallel** - and they disagree.

- **Elara** (mother): "Focus on love and family bonds..."
- **Harlan** (scientist): "I analyze the categories logically..."
- **Mira** (child): "The happy ones! Like when we played!"
- **Theo** (uncle): "Your family moments define you..."
- **Selene** (aunt): "Truth matters. Match honestly."

Each response is unique. It's never the same twice.

---

## Quick Start

```bash
# 1. Install
npm install

# 2. Get FREE Groq API key
# Go to: https://console.groq.com/keys
# Sign up (30 seconds, no credit card)

# 3. Configure
cp .env.example .env
# Edit .env: GROQ_API_KEY=gsk_your_key_here

# 4. Run
npm run dev
```

Open http://localhost:3000

---

## How to Play

1. Watch intro (or skip)
2. Meet Elara in the Foyer
3. **Click "🔮 Ask Ghost Council"**
4. Watch the debate panel fill with 5 different AI responses
5. Solve the puzzle
6. Continue through Study, Nursery, Chapel

**The debate system is the core feature. Everything else supports it.**

---

## What Actually Works

### ✅ Real and Working

**5 AI Agents Debating**
- Powered by Groq API (llama-3.3-70b-versatile)
- Each has unique personality (system prompts)
- Parallel invocation via `Promise.all()`
- Real-time responses (<5 seconds)
- **This is fully functional**

**Complete Game**
- 5 playable scenes
- 3 puzzles (Tapestry, Neural Maze, Love Harvest)
- 26 pre-generated gothic-cyberpunk shots
- **ElevenLabs AI voice acting** (unique voice per character + narrator)
- Production build successful

**Kiro Development Approach**
- Spec-driven for architecture (`.kiro/specs/`)
- Vibe coding for personalities
- Steering docs for consistency (`.kiro/steering/`)

### ⚠️ Exists But Not Used

**MCP Routes**
- Code exists in `app/api/mcp/*`
- Never called during gameplay
- Fallback implementations only

**Agent Hooks**
- Configs exist in `.kiro/hooks/`
- Work in Kiro IDE only
- Not triggered in-game

**External APIs**
- No Replicate (image gen)
- No Pinecone (memory)
- No blockchain server
- Just Groq API

---

## The Tech Stack

**What's actually running:**
- Next.js 14 (React framework)
- Groq API (AI agents)
- **ElevenLabs API (professional voice acting)**
- CSS (gothic-cyberpunk styling)

**What's not running:**
- MCP servers (image gen, memory, blockchain)
- Agent automation hooks

---

## API Calls Per Playthrough

**Groq API:**
- Foyer debate: 6 calls (5 agents + consensus)
- Study debate: 6 calls
- Nursery debate: 6 calls
- Chapel debate: 6 calls
- **Total: 24 calls**

**Everything else:**
- **0 calls**

---

## The Honest Pitch

**For Hackathon Judges:**

"Shadowed Haven demonstrates how Kiro enables building complex AI systems through hybrid development:

- **Spec-driven** for technical architecture
- **Vibe coding** for creative personalities
- **Steering docs** for consistency

The result: 5 AI agents with different personalities debating in real-time. They respond in parallel, disagree authentically, and reach consensus. It's emergent storytelling that's never the same twice.

The game has an MCP-ready architecture with fallback implementations, but the core innovation is the multi-agent debate system powered by Groq."

---

## File Structure

**What matters:**
```
app/
├── api/ghost-debate/route.ts    # Debate orchestrator
└── page.tsx                      # Main game
components/
├── scenes/                       # 5 game scenes
└── GhostDebatePanel.tsx         # Debate display
lib/
├── agents/ghostAgents.ts        # 5 agent definitions
└── tts/speechService.ts         # Text-to-speech
public/shots/                     # 26 images
.kiro/
├── specs/                        # Spec-driven docs
└── steering/                     # Personality rules
```

**What exists but isn't used:**
```
app/api/mcp/                      # MCP routes (never called)
lib/mcp/                          # MCP client (never invoked)
mcp-servers/                      # MCP servers (never started)
.kiro/hooks/                      # Agent hooks (IDE only)
```

---

## Documentation

**Start here:**
- **`COMPLETE_GAME_FLOW.md`** - What actually happens when you play
- **`ACTUAL_DEMO_FLOW.md`** - Detailed API call trace

**Original docs (still valid):**
- `KIRO_FEATURES.md` - How we used Kiro
- `QUICKSTART.md` - Setup guide

---

## Troubleshooting

**"Missing GROQ_API_KEY"**
- Make sure `.env` exists with your actual key
- Get free key at https://console.groq.com/keys

**Agents not responding**
- Check Groq API key is valid
- Check browser console for errors

**Want to see it work?**
- Just run `npm run dev` and click "Ask Ghost Council"

---

## The Bottom Line

**What works:** 5 AI agents debating in real-time  
**What's impressive:** Never the same conversation twice  
**What's honest:** Focus on the debate system  
**What's true:** Hybrid Kiro development approach  

**This is a working demo of multi-agent AI storytelling. The debates are real. The approach is honest.**

---

🎮 **Ready to see ghosts argue?**

```bash
npm run dev
```
