# 👻 Shadowed Haven - Start Here

## What Is This?

A gothic ghost story game where **5 AI agents debate in real-time** to help you solve puzzles.

Each ghost has a unique personality. When you ask for help, they all respond at once - and they disagree. It's never the same twice.

---

## 🚀 Get Started (2 Minutes)

### 1. Install
```bash
npm install
```

### 2. Get FREE Groq API Key
1. Go to https://console.groq.com/keys
2. Sign up (30 seconds, no credit card)
3. Copy your API key

### 3. Configure
```bash
cp .env.example .env
```

Edit `.env` and add your key:
```
GROQ_API_KEY=gsk_your_actual_key_here
```

### 4. Run
```bash
npm run dev
```

Open http://localhost:3000

---

## 🎮 How to Play

1. **Intro** - Watch the cinematic entrance
2. **Foyer** - Meet Elara (the mother ghost)
3. **Click "🔮 Ask Ghost Council"** ← This is the magic
4. **Watch the debate panel** - See all 5 ghosts arguing
5. **Solve the puzzle** with their help
6. **Continue** through Study, Nursery, Chapel

---

## 👻 The Five Ghosts

| Ghost | Personality | What They Say |
|-------|-------------|---------------|
| **Elara** | Maternal, gentle | "Focus on love and family bonds..." |
| **Harlan** | Scientific, logical | "I... analyze the categories logically..." |
| **Mira** | Childlike, playful | "The happy ones! Like when we played!" |
| **Theo** | Dramatic, regretful | "Brother, your family moments define you..." |
| **Selene** | Cold, seeks truth | "Truth matters. Match honestly." |

**They're all separate AI agents. They debate. They disagree. It's live.**

---

## 🏆 Why This Is Cool

### The Innovation
Most games: Pre-written dialogue, predictable responses
This game: 5 AI agents debating in real-time, never the same twice

### The Kiro Angle
- Built using **different development paradigms**
- Spec-driven for architecture
- Vibe coding for personalities
- Steering docs for consistency
- Result: Incompatible approaches working together

**That's the Frankenstein magic.**

---

## 📁 Key Files

Want to see how it works?

- **`lib/agents/ghostAgents.ts`** - The 5 agent definitions
- **`app/api/ghost-debate/route.ts`** - How debates work
- **`.kiro/specs/ghost-agents/`** - Spec-driven docs
- **`.kiro/steering/`** - Personality rules
- **`components/scenes/`** - The 5 game scenes

---

## 🐛 Troubleshooting

**"Missing GROQ_API_KEY"**
- Make sure `.env` exists with your actual key
- Restart: Ctrl+C, then `npm run dev`

**Agents not responding**
- Check your Groq API key is valid
- Check browser console for errors

**Need more help?**
- Read `WHAT_ACTUALLY_WORKS.md` for details
- Check `QUICKSTART.md` for full setup

---

## 🎯 For Hackathon Judges

**What to focus on:**
1. The debate system (click "Ask Ghost Council")
2. How agents have different perspectives
3. The hybrid development approach (spec + vibe + steering)
4. That it actually works and is playable

**What's real:**
- ✅ 5 AI agents debating (Groq API)
- ✅ Real-time parallel responses
- ✅ Unique personalities per ghost
- ✅ Full playable game with puzzles
- ✅ Hybrid Kiro development approach

**What's honest:**
- MCP routes exist but use fallbacks
- Agent hooks are configured for Kiro IDE
- Focus is on the debate system innovation

See `WHAT_ACTUALLY_WORKS.md` for full details.

---

## 🎬 Quick Demo

1. Run `npm run dev`
2. Click through to Foyer scene
3. Click "🔮 Ask Ghost Council"
4. Watch the Ghost Council Debate panel (bottom)
5. See 5 different AI perspectives
6. That's the magic ✨

---

**Ready? Let's see some ghosts argue!**

```bash
npm run dev
```
