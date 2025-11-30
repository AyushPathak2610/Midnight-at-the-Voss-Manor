# 👻 Shadowed Haven

**A Gothic-Cyberpunk Ghost Story Powered by 5 Independent AI Agents**

> *"Five souls trapped in limbo. Five AI minds that must agree to set them free."*

---

## 🎮 What Is This?

Shadowed Haven is a narrative puzzle game where you help a ghost family find peace. But here's the twist: **each ghost is a separate AI agent** that debates with the others in real-time to help you solve puzzles.

Built for the **Kiro Frankenstein Hackathon** to showcase:
- ✅ 5 Independent Grok Agents (one per ghost character)
- ✅ Agent Hooks (automated debate triggers, memory storage)
- ✅ MCP Extensions (blockchain vows, image generation, vector memory)
- ✅ Spec-Driven Development + Vibe Coding hybrid
- ✅ Steering Docs for consistent AI personalities
- ✅ Real-time Inter-Agent Debates

---

## 🚀 Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Get Your FREE Groq API Key
1. Go to [console.groq.com/keys](https://console.groq.com/keys)
2. Sign up (30 seconds, no credit card)
3. Copy your API key

### 3. Set Up Environment
```bash
cp .env.example .env
```

Edit `.env` and add your Groq key:
```env
GROQ_API_KEY=gsk_your_actual_key_here
```

### 4. Run the Game
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and play!

---

## 🎭 The Five Ghost Agents

Each ghost is a **separate AI agent** with unique personality and capabilities:

| Ghost | Personality | Built With | MCP Extension |
|-------|-------------|------------|---------------|
| **Elara** | Maternal, gentle, seeks harmony | Vibe Coding | Sentiment Analysis |
| **Harlan** | Scientific, amnesiac, logical | Spec-Driven | Vector Memory (Pinecone) |
| **Mira** | Childlike, innocent, playful | Steering Docs | Image Generation (Replicate) |
| **Theo** | Dramatic, regretful, romantic | Voice-First | Text-to-Speech |
| **Selene** | Cold but softening, seeks truth | Hook-Driven | Blockchain Vows |

---

## 🔮 How Agent Debates Work

When you click **"🔮 Ask Ghost Council"** during a puzzle:

1. All 5 agents are invoked **in parallel** via Groq API
2. Each responds based on their unique personality (under 30 words)
3. Agents can **disagree** — Mira wants play, Harlan wants logic, Selene demands truth
4. Elara synthesizes a **consensus hint** from all perspectives
5. The full debate is visible in the Ghost Council panel

**This is the Frankenstein magic:** 5 incompatible agents forming one emergent consciousness.

---

## 🎨 Game Scenes

### 1. Intro - The Forest
Cinematic entrance. Lost in a storm, you find the mansion.

### 2. Foyer - Elara's Domain
**Puzzle:** Harlan's Threads (match family photos to memory categories)  
**Ghost:** Elara (Mother) introduces the family's tragedy

### 3. Study - Harlan's Lab
**Puzzle:** Neural Maze (navigate fragmented memories)  
**Ghost:** Dr. Harlan Voss explains the Eternal Harmony experiment  
**MCP Demo:** Harlan stores solutions in vector memory

### 4. Nursery - Mira's Room
**Puzzle:** Love Harvest (connect memories to family tree)  
**Ghost:** Mira (Daughter) wants to remember happy times  
**MCP Demo:** Mira draws crayon pictures when happy

### 5. Chapel - The Reunion
**Final Debate:** All 5 ghosts decide their fate together  
**Puzzle:** Vow Ritual (complete the binding ceremony)  
**MCP Demo:** Selene verifies Theo's promises on blockchain ledger

---

## 🛠️ Kiro Features Showcase

### Agent Hooks
Located in `.kiro/hooks/`:

- **`ghost-debate-trigger.json`** - Manual button to summon all 5 agents
- **`mira-crayon-draw.json`** - Auto-generates images when Mira is happy
- **`harlan-memory-store.json`** - Auto-stores puzzle solutions after completion

### MCP Extensions
Configured in `.kiro/settings/mcp.json`:

- **Blockchain Vows** (Custom Node.js) - Selene's promise ledger
- **Replicate Image Gen** (uvx) - Mira's crayon drawings
- **Pinecone Vector Memory** (uvx) - Harlan's memory storage

### Spec-Driven Development
See `.kiro/specs/ghost-agents/`:

- `requirements.md` - 5 acceptance criteria
- `design.md` - Architecture + correctness properties
- `tasks.md` - Implementation checklist

### Steering Docs
Located in `.kiro/steering/`:

- `ghost-agent-rules.md` - Personality definitions + debate protocol
- `scene-structure.md` - Standard scene component template

---

## 📁 Project Structure

```
shadowed-haven/
├── app/
│   ├── api/
│   │   └── ghost-debate/route.ts    # Debate orchestrator
│   ├── page.tsx                      # Main game controller
│   └── globals.css                   # Gothic-cyberpunk styles
├── components/
│   ├── scenes/
│   │   ├── IntroScene.tsx           # Forest entrance
│   │   ├── FoyerScene.tsx           # Elara + Tapestry puzzle
│   │   ├── StudyScene.tsx           # Harlan + Neural maze
│   │   ├── NurseryScene.tsx         # Mira + Love harvest
│   │   └── ChapelScene.tsx          # Final debate + ritual
│   ├── GhostDebatePanel.tsx         # Real-time debate display
│   └── TTSToggle.tsx                # Voice narration toggle
├── lib/
│   ├── agents/
│   │   └── ghostAgents.ts           # 5 agent definitions + Groq API
│   ├── mcp/                          # MCP integration helpers
│   └── tts/                          # Text-to-speech service
├── mcp-servers/
│   └── blockchain-vows-server.js    # Custom MCP for Selene
├── public/
│   └── shots/                        # 26 pre-generated scene images
├── .kiro/
│   ├── hooks/                        # Agent hook configs
│   ├── settings/mcp.json            # MCP server configs
│   ├── specs/ghost-agents/          # Spec-driven docs
│   └── steering/                     # AI personality rules
└── docs/
    ├── API_KEYS_GUIDE.md            # Detailed setup instructions
    ├── MCP_SETUP.md                 # MCP configuration guide
    └── TTS_GUIDE.md                 # Voice setup guide
```

---

## 🎯 Optional: Enable MCP Extensions

The game works great with just Groq, but MCP extensions add magic:

### Mira's Crayon Drawings (Replicate)
1. Get free $5 credit: [replicate.com/account/api-tokens](https://replicate.com/account/api-tokens)
2. Add to `.env`: `REPLICATE_API_KEY=r8_...`
3. Install uvx: `pip install uv` (or use homebrew)
4. Mira will now draw pictures when happy!

### Harlan's Memory Storage (Pinecone)
1. Get free tier: [app.pinecone.io](https://app.pinecone.io)
2. Add to `.env`: `PINECONE_API_KEY=pcsk_...`
3. Harlan will remember puzzle solutions across sessions!

### Selene's Blockchain Vows (Custom)
Already included! No setup needed. Run:
```bash
npm run test-mcp
```

---

## 🎬 Demo Video Script

**Perfect for hackathon submission:**

1. **0:00-0:15** - Intro cinematic (show gothic-cyberpunk art style)
2. **0:15-0:45** - Foyer puzzle + trigger first debate (show all 5 agents responding)
3. **0:45-1:00** - Mira's crayon drawing auto-generated via MCP hook
4. **1:00-1:15** - Harlan's memory storage hook triggered on puzzle complete
5. **1:15-1:45** - Chapel final debate (unscripted 5-agent conversation)
6. **1:45-2:00** - Ending + credits showing Kiro features used

---

## 🏆 Frankenstein Category Highlights

### Why This Is Frankenstein-Worthy

**Five Incompatible Agents → One Emergent Consciousness**

- Each agent built with DIFFERENT Kiro paradigms (vibe, spec, hooks, steering)
- Agents debate and disagree, creating authentic conflict
- MCP extensions enable capabilities impossible with standard APIs
- Agent Hooks make the system feel alive even when player isn't interacting
- The Nexus Crystal acts as MCP router between all agents

**The Magic:** It's not just 5 agents — it's 5 agents that were built differently, think differently, and yet form a single coherent family consciousness through Kiro's orchestration.

---

## 📚 Documentation

- **[FRANKENSTEIN_SUBMISSION.md](./FRANKENSTEIN_SUBMISSION.md)** - Full hackathon submission
- **[API_KEYS_GUIDE.md](./docs/API_KEYS_GUIDE.md)** - Detailed API setup
- **[MCP_SETUP.md](./docs/MCP_SETUP.md)** - MCP configuration guide
- **[TTS_GUIDE.md](./docs/TTS_GUIDE.md)** - Voice narration setup
- **[KIRO_FEATURES.md](./KIRO_FEATURES.md)** - How we used each Kiro feature

---

## 🐛 Troubleshooting

### "Missing GROQ_API_KEY" error
Make sure you copied `.env.example` to `.env` and added your actual key.

### Agents not responding
Check your Groq API key is valid at [console.groq.com](https://console.groq.com)

### MCP extensions not working
They're optional! The game works great without them. See [MCP_SETUP.md](./docs/MCP_SETUP.md) for detailed setup.

### Images not loading
Run: `npm run download-images` to fetch placeholder images if needed.

---

## 🤝 Contributing

This is a hackathon project, but feel free to:
- Add new ghost personalities
- Create additional puzzles
- Improve the debate system
- Add more MCP extensions

---

## 📜 License

MIT License - Built for Kiro Frankenstein Hackathon 2024

---

## 🙏 Credits

- **AI Agents**: Powered by Groq (llama-3.3-70b)
- **MCP Extensions**: Replicate, Pinecone, Custom Node.js
- **Art Style**: Gothic-Cyberpunk (AI-generated concept art)
- **Built With**: Next.js, React, Kiro Agent Hooks, MCP Protocol

---

**Ready to help the ghosts find peace?**

```bash
npm run dev
```

*"Five souls. Five minds. One family. One chance."*
