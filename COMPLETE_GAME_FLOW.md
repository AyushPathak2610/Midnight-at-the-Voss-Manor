# 🎮 Complete Game Flow - What Actually Happens

## Traced from Playing Through the Entire Game

---

## Scene 1: Intro (No AI)

**What happens:**
1. Shows 4 shots: `intro_1.png` → `intro_2.png` → `intro_3.png` → `intro_4.png`
2. Auto-advances every 3 seconds
3. Displays narration text
4. Skip button available
5. Auto-advances to Foyer after shot 4

**What's used:**
- ✅ Next.js Image component
- ✅ React useState/useEffect
- ✅ CSS animations
- ✅ Timer logic

**What's NOT used:**
- ❌ No AI
- ❌ No API calls
- ❌ No MCP
- ❌ No debate

---

## Scene 2: Foyer - Elara (First AI Interaction)

### Stage 1: Intro
- Shows `/shots/1a_1.png`
- Narration: "You enter the foyer..."
- Button: "Continue →"

### Stage 2: Meet Elara
- Shows `/shots/1a_2.png`
- Elara's dialogue (hardcoded, not AI)
- Button: "Begin Puzzle"

### Stage 3: Puzzle
- Shows `/shots/1b_1.png`
- 5 photo cards to match to categories
- **Button: "🔮 Ask Ghost Council"** ← FIRST AI CALL

**When you click "Ask Ghost Council":**
1. Calls `/api/ghost-debate` with puzzle context
2. API invokes all 5 Groq agents in parallel
3. Returns 5 responses + 1 consensus
4. Displays in GhostDebatePanel
5. TTS speaks each message

**What's used:**
- ✅ Groq API (6 calls: 5 agents + 1 consensus)
- ✅ `lib/agents/ghostAgents.ts`
- ✅ `app/api/ghost-debate/route.ts`
- ✅ `components/GhostDebatePanel.tsx`
- ✅ `lib/tts/speechService.ts` (browser TTS)

**What's NOT used:**
- ❌ No MCP calls
- ❌ No image generation
- ❌ No memory storage
- ❌ No blockchain vows

### Stage 4: Complete
- Shows success message
- Button: "Enter the Study →"

---

## Scene 3: Study - Harlan (Second AI Interaction)

### Stage 1: Intro
- Shows `/shots/2a_1.png`
- Narration about the study
- Button: "Approach the Crystal →"

### Stage 2: Meet Harlan
- Shows `/shots/2a_2.png`
- Harlan's dialogue (hardcoded)
- Button: "Enter Neural Maze"

### Stage 3: Puzzle
- Shows `/shots/2b_1.png`
- 5x5 maze grid
- Collect 8 memory orbs
- Arrow buttons to move
- **Button: "🔮 Ask Council"** ← SECOND AI CALL

**When you click "Ask Council":**
- Same as Foyer: Calls `/api/ghost-debate`
- All 5 agents respond about the maze
- Displays in debate panel

**What's used:**
- ✅ Same Groq API flow as Foyer
- ✅ Maze game logic (React state)
- ✅ Movement controls

**What's NOT used:**
- ❌ No MCP memory storage (despite the name "memory orbs")
- ❌ Harlan doesn't actually "store" anything
- ❌ Just game state in React

### Stage 4: Complete
- Shows success message
- Button: "Continue to Nursery →"

---

## Scene 4: Nursery - Mira (Third AI Interaction)

### Stage 1: Intro
- Shows `/shots/3a_1.png`
- Narration about floating toys
- Button: "Look in the Crib →"

### Stage 2: Meet Mira
- Shows `/shots/3a_2.png`
- Mira's dialogue (hardcoded)
- Button: "Help Mira Remember"

### Stage 3: Puzzle
- Shows `/shots/3b_1.png`
- 6 memory bubbles to connect to 3 branches
- Match memories to categories (Bedtime, Play, Love)
- **Button: "🔮 Ask Council"** ← THIRD AI CALL

**When you click "Ask Council":**
- Same flow: Calls `/api/ghost-debate`
- All 5 agents respond about memories
- Displays in debate panel

**What's used:**
- ✅ Same Groq API flow
- ✅ Tree/branch matching logic

**What's NOT used:**
- ❌ No image generation (despite Mira being "artistic")
- ❌ No crayon drawings
- ❌ No MCP image-gen calls
- ❌ Just puzzle logic

### Stage 4: Complete
- Shows success message
- Button: "Continue to Chapel →"

---

## Scene 5: Chapel - All Ghosts (Final AI Interaction)

### Stage 1: Intro
- Shows `/shots/5a_1.png`
- Narration about the chapel
- Button: "Approach the Altar →"

### Stage 2: Reunion
- Shows `/shots/5a_1.png`
- Displays all 5 ghost cards with hardcoded dialogue
- Button: "Begin Final Debate"

### Stage 3: Final Debate
- Shows same background
- **Calls `/api/ghost-debate`** ← FOURTH AI CALL
- Special: Streams responses with 2-second delays between each
- Shows loading spinner
- Displays "Watch the Ghost Council Debate panel below"

**What happens:**
```typescript
// Calls API
const response = await fetch('/api/ghost-debate', {
  puzzleContext: 'Final decision - should family ascend or stay?',
  playerMessage: 'What should the family do?'
})

// Gets 5 responses + consensus
const { debate, consensus } = await response.json()

// Streams them with delays
for (const msg of debate) {
  await new Promise(resolve => setTimeout(resolve, 2000))
  onDebate?.(msg.ghost, msg.message)
}

// Then consensus
await new Promise(resolve => setTimeout(resolve, 2000))
onDebate?.('Consensus', consensus)
```

**What's used:**
- ✅ Same Groq API flow
- ✅ Streaming display with delays
- ✅ All 5 agents + consensus

**What's NOT used:**
- ❌ No blockchain vows check
- ❌ No MCP calls
- ❌ Just the debate API

### Stage 4: Ritual
- Shows `/shots/5b_1.png`
- 5 symbol buttons (Ring, Heart, Hands, Star, Light)
- Click each to progress
- Progress bar fills up

**What's used:**
- ✅ Simple click counter
- ✅ CSS progress bar animation

**What's NOT used:**
- ❌ No AI
- ❌ No API calls
- ❌ Just React state

### Stage 5: Ending
- Shows `/shots/finale_1.png`
- Ending narration
- Credits listing Kiro features
- Button: "Play Again" (reloads page)

**What's used:**
- ✅ `window.location.reload()`

---

## Complete API Call Summary

### Total API Calls in Full Playthrough

**Groq API Calls:**
1. Foyer puzzle: 6 calls (5 agents + 1 consensus)
2. Study puzzle: 6 calls (5 agents + 1 consensus)
3. Nursery puzzle: 6 calls (5 agents + 1 consensus)
4. Chapel debate: 6 calls (5 agents + 1 consensus)

**Total: 24 Groq API calls**

**ElevenLabs API Calls:**
- Intro narrations: 4 calls
- Scene narrations: ~5 calls
- Character dialogue: ~10 calls
- Ghost debate responses: ~24 calls (6 per debate × 4)
- Ending narration: 1 call

**Total: ~44 ElevenLabs API calls (~1,000-1,500 characters)**

**MCP API Calls:**
- **ZERO** - None of the MCP routes are ever called

**Other API Calls:**
- **ZERO** - No Replicate, no Pinecone, no blockchain server

---

## What's Actually Used Throughout the Game

### ✅ Core Technologies

1. **Groq API** (llama-3.3-70b-versatile)
   - 24 total calls across 4 debates
   - Powers all 5 ghost agents
   - Provides consensus synthesis

2. **ElevenLabs API** (AI Voice Acting)
   - ~44 calls per playthrough
   - Unique voice per character (Bella, Clyde, Dorothy, Antoni, Charlotte)
   - Narrator voice (Sam)
   - Professional emotional delivery
   - Fallback to browser TTS if needed

3. **React Components**
   - 5 scene components
   - GhostDebatePanel
   - TTSToggle
   - State management

4. **Next.js**
   - Image component (26 shots)
   - API routes (`/api/ghost-debate`)
   - Server-side rendering

5. **Browser APIs**
   - Web Speech API (TTS fallback)
   - Local storage (for TTS toggle)
   - Standard DOM APIs

6. **CSS**
   - Styled JSX
   - Animations
   - Gothic-cyberpunk styling

### ❌ What Exists But Is Never Used

1. **MCP Routes** (`app/api/mcp/*`)
   - `/api/mcp/image-gen` - Never called
   - `/api/mcp/memory` - Never called
   - `/api/mcp/sentiment` - Never called
   - `/api/mcp/vows` - Never called

2. **MCP Client** (`lib/mcp/mcpClient.ts`)
   - Functions exist but never invoked

3. **Custom MCP Server** (`mcp-servers/blockchain-vows-server.js`)
   - Server exists but never started or called

4. **Agent Hooks** (`.kiro/hooks/*.json`)
   - Configs exist but only work in Kiro IDE
   - Not triggered during gameplay

5. **External APIs**
   - No Replicate calls
   - No Pinecone calls
   - No ElevenLabs calls (unless manually configured)

---

## The Honest Truth

### What Makes This Game Work

**The Core Loop:**
1. Player navigates through scenes
2. Meets ghosts (hardcoded dialogue)
3. Solves puzzles (React state logic)
4. Clicks "Ask Ghost Council"
5. **All 5 Groq agents respond in parallel**
6. Debate displays in panel
7. TTS speaks the responses
8. Player continues to next scene

**The Innovation:**
- 5 independent AI agents with unique personalities
- Real-time parallel debates
- Never the same conversation twice
- Emergent dialogue from system prompts

**What's Real:**
- ✅ Groq API integration (working)
- ✅ 5 distinct agent personalities (working)
- ✅ Parallel invocation (working)
- ✅ Real-time debates (working)
- ✅ TTS narration (working)
- ✅ Complete playable game (working)

**What's Aspirational:**
- ⚠️ MCP extensions (code exists, never called)
- ⚠️ Agent hooks (configs exist, IDE-only)
- ⚠️ Memory persistence (in-memory only)
- ⚠️ Image generation (placeholders only)

---

## The Honest Pitch

**"Shadowed Haven is a gothic ghost story where 5 AI agents debate in real-time to help you solve puzzles.**

**Each ghost is a separate Groq API call with a unique personality. When you ask for help, all 5 respond in parallel - and they disagree. Elara wants emotional connections, Harlan wants logic, Mira wants play, Theo wants redemption, Selene wants truth.**

**The debates are never the same twice. It's emergent AI storytelling powered by system prompts and parallel execution.**

**We built it using Kiro's hybrid approach: spec-driven for architecture, vibe coding for personalities, steering docs for consistency. The game has an extensible MCP-ready architecture, but the core innovation is the real-time multi-agent debates."**

---

## What to Demo

1. **Start game** - Show the gothic-cyberpunk art
2. **Get to Foyer puzzle** - Meet Elara
3. **Click "Ask Ghost Council"** - THE MONEY SHOT
4. **Watch debate panel** - 5 different perspectives
5. **Show it's different each time** - Click again, get new responses
6. **Continue to Chapel** - Show final debate with streaming

**Focus 90% on the debate system. That's what actually works. That's what's impressive.**

---

## Files That Matter

**Actually used in gameplay:**
- `app/page.tsx` - Main game controller
- `components/scenes/*.tsx` - All 5 scenes
- `components/GhostDebatePanel.tsx` - Debate display
- `lib/agents/ghostAgents.ts` - Agent definitions
- `app/api/ghost-debate/route.ts` - Debate orchestrator
- `lib/tts/speechService.ts` - Text-to-speech
- `public/shots/*.png` - All 26 images

**Exist but never used:**
- `app/api/mcp/*` - MCP routes
- `lib/mcp/mcpClient.ts` - MCP client
- `mcp-servers/*.js` - MCP servers
- `.kiro/hooks/*.json` - Agent hooks

---

**This is what actually happens when you play the game. No exaggeration. No over-promising. Just the truth.** ✨
