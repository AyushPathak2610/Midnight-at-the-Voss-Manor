# Kiroween Hackathon Submission - Shadowed Haven

## Category
**Frankenstein: Stitch together a chimera of technologies**

## One-Paragraph Pitch

Shadowed Haven uses Kiro to spawn five completely independent AI agents powered by Groq's Llama 3.1—one per ghost—each built with different Kiro paradigms (vibe coding for Elara, strict spec-driven JSON for Harlan, heavy steering docs + image-gen MCP for Mira, etc.). Using Kiro Agent Hooks we made them debate every hint in real-time instead of using pre-written dialogue, creating genuine inter-agent conflict and collaboration no static script could match. The Nexus Crystal acts as an MCP router that extends capabilities to external services (blockchain vows, vector memory, live image generation), turning five 'incompatible' narrow agents into a single emergent family consciousness—the ultimate Frankenstein chimera that literally feels alive.

## Project Description

A haunted mansion game where you help reunite a fractured ghost family. But here's the twist: each ghost is a live AI agent with unique personality and capabilities. When you ask for hints, all 5 agents debate in real-time—and you see the full conversation. They disagree, they argue, they reach consensus. It's never the same twice.

## The Frankenstein Chimera

**Incompatible elements stitched together:**

1. **5 Groq/Llama agents** - Each with distinct personality (maternal, scientific, childlike, dramatic, cold)
2. **2 development paradigms** - Vibe coding (Elara) vs Spec-driven (Harlan)
3. **3 MCP servers** - Image generation, vector memory, blockchain ledger
4. **1 Agent Hook** - Orchestrates inter-agent debates
5. **1 Steering doc** - Keeps the chaos coherent

**Why it's powerful:**

Traditional game: Static dialogue tree, predictable outcomes
This game: 5 narrow AI agents create emergent family dynamics that feel genuinely alive

## Kiro Features Used

### 1. Vibe Coding ✅
- Built Elara's personality through casual conversation
- Iteratively refined ghost dialogue and emotional tone
- Generated entire scene components from simple prompts
- **Most impressive:** FoyerScene.tsx created from "Make a scene where Elara triggers a ghost debate"

### 2. Agent Hooks ✅
- **Ghost Council Debate Hook** triggers all 5 agents when player asks for hints
- Automated workflow: Button click → context gathering → agent invocation → consensus
- Improved development: No manual API orchestration needed
- **File:** `.kiro/hooks/on-puzzle-hint.json`

### 3. Spec-Driven Development ✅
- Harlan's agent built 100% from JSON spec in `ghostAgents.ts`
- Ensures consistent personality across all interactions
- Easier collaboration and debugging vs vibe coding
- **Comparison:** Vibe = fast & creative, Spec = consistent & maintainable

### 4. Steering Docs ✅
- `.kiro/steering/ghost-agent-rules.md` prevents personality mixing
- Automatically included in every Kiro conversation
- Defines inter-agent debate protocols
- **Impact:** Kiro never confused Elara's maternal tone with Selene's cold formality

### 5. MCP (Model Context Protocol) ✅
- **Mira + Replicate MCP:** Generates crayon drawings when happy
- **Harlan + Pinecone MCP:** Stores/retrieves puzzle solutions in vector DB
- **Selene + Custom MCP:** Verifies vows on blockchain-style ledger
- **Why MCP:** Each capability would require 200+ lines of custom code. With MCP: 10 lines.

## Technical Stack

- **Frontend:** Next.js 14, React, TypeScript, Framer Motion
- **AI:** Groq API with Llama 3.1-70B (5 independent agents) - FREE tier!
- **MCP Servers:** Replicate (image gen), Pinecone (memory), Custom (blockchain)
- **Styling:** CSS with haunted mansion theme
- **Deployment:** Vercel-ready

## Installation & Running

```bash
# Install
npm install

# Configure
cp .env.example .env
# Add GROQ_API_KEY (free at https://console.groq.com/keys)

# Verify setup
npm run verify

# Run
npm run dev
```

Open http://localhost:3000

## Demo Video Highlights

1. **Intro scene** - Beautiful animations, story setup
2. **Meet Elara** - First ghost introduces family tragedy
3. **Ghost debate** - Click "Ask for Hint" → see all 5 agents argue in real-time
4. **Debug panel** - Shows live agent messages (the "seams" of the chimera)
5. **MCP integration** - Mira generates crayon art, Selene checks blockchain vows

## Hackathon Requirements Met

- ✅ **Functionality:** Runs in browser, agents debate in real-time
- ✅ **Platform:** Web-based, works on any modern browser
- ✅ **New & Existing:** Built from scratch during hackathon period
- ✅ **Third Party:** Groq API (free!), Replicate, Pinecone (all authorized)
- ✅ **Vibe Coding:** Elara's personality and scene dialogue
- ✅ **Agent Hooks:** Ghost council debate trigger
- ✅ **Spec-Driven:** Harlan's agent from JSON spec
- ✅ **Steering Docs:** Agent personality rules
- ✅ **MCP:** 3 servers extending agent capabilities

## Why This Wins Frankenstein

**The "stitched together" feeling is intentional:**

- You can SEE the seams (agents disagree in debug panel)
- Each agent uses different tech (Grok + Replicate + Pinecone + custom MCP)
- Built with incompatible paradigms (vibe + spec + hooks)
- Yet they create something greater: A family that feels alive

**The judges will love:**

1. **Visible inter-agent interaction** - Not hidden, but showcased
2. **Real emergent behavior** - Never the same conversation twice
3. **Creative MCP use** - Custom blockchain server for narrative
4. **All 5 Kiro features** - Comprehensively demonstrated
5. **Emotional impact** - It's not just tech, it's a story
6. **Actually free to run** - Groq's generous free tier means anyone can test it!

## Repository Structure

```
shadowed-haven/
├── app/                    # Next.js app
├── components/             # React components
├── lib/agents/             # 5 ghost agent definitions
├── mcp-servers/            # Custom MCP server
├── .kiro/                  # Kiro config (hooks, steering, MCP)
├── README.md               # Main docs
├── SETUP.md                # Installation guide
├── KIRO_FEATURES.md        # Detailed feature usage
└── DEMO_SCRIPT.md          # Video recording guide
```

## Links

- **GitHub:** [Your repo URL]
- **Live Demo:** [Vercel deployment URL]
- **Video:** [YouTube/Loom link]

## Team

[Your name/team name]

## License

MIT

---

**Built with ❤️ and 👻 using Kiro for Kiroween 2024**
