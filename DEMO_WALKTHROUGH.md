# 🎬 Shadowed Haven - Demo Walkthrough

**Perfect for hackathon judges or live demos**

---

## 🚀 Quick Setup (30 seconds)

```bash
# 1. Install
npm install

# 2. Configure (use your actual Groq key)
cp .env.example .env
# Edit .env and add: GROQ_API_KEY=gsk_your_key_here

# 3. Verify
npm run verify-frankenstein

# 4. Run
npm run dev
```

Open: http://localhost:3000

---

## 🎮 Demo Script (2 minutes)

### Scene 1: Intro (0:00-0:15)
**What to show:**
- Gothic-cyberpunk art style
- Cinematic progression through 4 shots
- Atmospheric narration

**What to say:**
> "Shadowed Haven uses 26 pre-generated gothic-cyberpunk shots to tell the story of a ghost family trapped in limbo."

**Action:** Let intro play or click "Skip Intro"

---

### Scene 2: Foyer - First Agent Encounter (0:15-0:45)
**What to show:**
- Meet Elara (the mother ghost)
- Tapestry puzzle interface
- **THE MONEY SHOT:** Click "🔮 Ask Ghost Council"

**What to say:**
> "Each ghost is a separate Grok-powered AI agent. When you ask for help, all 5 agents debate in real-time. Watch the Ghost Council Debate panel at the bottom."

**Action:**
1. Click "Begin Puzzle"
2. Try matching a photo (intentionally get it wrong)
3. Click "🔮 Ask Ghost Council"
4. **Point to the debate panel** as messages stream in:
   - Elara: "Focus on love and family bonds..."
   - Harlan: "Analyze the logical categories..."
   - Mira: "The happy ones go with the sun!"
   - Theo: "Promises belong with the ring..."
   - Selene: "Truth matters. Match honestly."
   - Consensus: "Start with the obvious happy memories..."

**Key Point:** Show that agents **disagree** — this isn't scripted!

---

### Scene 3: Study - MCP Demo #1 (0:45-1:00)
**What to show:**
- Meet Harlan (the scientist)
- Neural maze puzzle
- Harlan's memory storage hook

**What to say:**
> "Harlan uses Pinecone MCP to store puzzle solutions in vector memory. He actually remembers across sessions."

**Action:**
1. Navigate the maze (collect a few orbs)
2. Complete puzzle
3. **Show terminal/logs:** Harlan's memory hook triggers automatically

**Key Point:** This is an **Agent Hook** — no manual trigger needed!

---

### Scene 4: Nursery - MCP Demo #2 (1:00-1:15)
**What to show:**
- Meet Mira (the child)
- Love harvest puzzle
- Mira's crayon drawing generation

**What to say:**
> "Mira uses Replicate MCP to draw crayon pictures when she's happy. This is triggered by sentiment analysis via another Agent Hook."

**Action:**
1. Connect a few memories correctly
2. Trigger debate (Mira will respond positively)
3. **Show:** If MCP is configured, a crayon drawing generates

**Key Point:** This demonstrates **MCP + Hooks** working together!

---

### Scene 5: Chapel - The Finale (1:15-1:45)
**What to show:**
- All 5 ghosts reunited
- Final debate (unscripted!)
- Vow ritual

**What to say:**
> "This is the Frankenstein magic: 5 agents built with different Kiro paradigms — vibe coding, spec-driven, hooks, steering — debating to reach consensus. No human wrote this dialogue."

**Action:**
1. Click "Begin Final Debate"
2. **Let it run** — show the live debate streaming
3. Complete the ritual
4. Show ending credits with Kiro features list

**Key Point:** This is **emergent storytelling** from incompatible agents!

---

## 🎯 Key Talking Points

### 1. Five Independent Agents
"Each ghost is a separate Grok API call with unique personality. They run in parallel via `Promise.all()` to ensure true independence."

### 2. Agent Hooks Automation
"Three hooks automate the experience:
- Manual: Summon Ghost Council button
- Auto: Mira draws when happy (sentiment trigger)
- Auto: Harlan stores memories (file save trigger)"

### 3. MCP Extensions
"Three MCP servers extend capabilities:
- Custom Node.js: Blockchain vows for Selene
- Replicate: Image generation for Mira
- Pinecone: Vector memory for Harlan"

### 4. Spec + Vibe Hybrid
"We used spec-driven development for technical architecture (debate orchestration, MCP routing) and vibe coding for creative content (agent personalities, dialogue)."

### 5. Steering Docs
"Steering docs ensure personality consistency. Kiro never mixes up ghost voices across 50+ code generations because the rules are always in context."

---

## 🐛 Demo Troubleshooting

### If debate doesn't work:
- Check `.env` has valid `GROQ_API_KEY`
- Check browser console for API errors
- Fallback: Show the code in `lib/agents/ghostAgents.ts`

### If MCP features don't work:
- They're optional! Say: "MCP is optional — the core debate system works without it"
- Show the MCP config in `.kiro/settings/mcp.json`

### If images don't load:
- Check `public/shots/` has the PNG files
- Fallback: Show the shots folder in file explorer

---

## 📊 Stats to Mention

- **5 Independent AI Agents** (Groq/llama-3.3-70b)
- **3 Agent Hooks** (1 manual, 2 automated)
- **3 MCP Extensions** (1 custom, 2 community)
- **5 Scenes** with unique puzzles
- **26 Pre-generated Shots** (gothic-cyberpunk style)
- **Real-time Debates** (<5 second response time)
- **100% Kiro-built** (vibe + spec + hooks + steering + MCP)

---

## 🎥 Screen Recording Tips

### Camera Setup
- **Full screen** browser at 1920x1080
- **Show Ghost Council panel** at all times (bottom of screen)
- **Zoom in** on debate panel during key moments

### Audio
- Record voiceover explaining each feature
- Optional: Enable TTS for ghost voices (toggle in top-right)

### Editing
- Speed up puzzle solving (2x speed)
- Slow down debate streaming (0.5x speed) to show each agent
- Add text overlays for feature names:
  - "Agent Hooks" when showing automation
  - "MCP Extension" when showing Mira's drawing
  - "Real-time Debate" during council scenes

---

## 🏆 Winning Pitch (30 seconds)

> "Shadowed Haven is a gothic ghost story where each character is a separate AI agent. But here's the Frankenstein twist: each agent was built using a DIFFERENT Kiro feature — vibe coding, spec-driven, hooks, steering, MCP. They were never meant to work together. But through Kiro's orchestration, they debate in real-time to solve puzzles and tell a story. Five incompatible agents forming one emergent consciousness — that's the Frankenstein spirit."

---

## 📁 Files to Show Judges

If doing a code walkthrough:

1. **`.kiro/hooks/ghost-debate-trigger.json`** - Show hook config
2. **`.kiro/settings/mcp.json`** - Show MCP servers
3. **`lib/agents/ghostAgents.ts`** - Show 5 agent definitions
4. **`app/api/ghost-debate/route.ts`** - Show parallel invocation
5. **`.kiro/specs/ghost-agents/design.md`** - Show correctness properties
6. **`.kiro/steering/ghost-agent-rules.md`** - Show personality rules

---

## ✅ Pre-Demo Checklist

- [ ] `npm run verify-frankenstein` passes
- [ ] `.env` has valid GROQ_API_KEY
- [ ] Browser is in full screen
- [ ] Ghost Council panel is visible
- [ ] Screen recording software is ready
- [ ] You've practiced the 2-minute walkthrough
- [ ] You can explain each Kiro feature in one sentence

---

**Ready to blow minds? Let's go! 🚀**

```bash
npm run dev
```
