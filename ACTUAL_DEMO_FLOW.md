# 🎮 What Actually Happens When You Play

## Traced from Actual Code

I ran the game and traced through the code. Here's what ACTUALLY gets called:

---

## 1. Game Starts (`app/page.tsx`)

**What loads:**
- `IntroScene` component
- `GhostDebatePanel` component (empty, waiting)
- `TTSToggle` component (voice toggle button)

**What's used:**
- React state management
- Scene switching logic
- Debate message collection

**What's NOT used:**
- No MCP calls yet
- No agent hooks (those are Kiro IDE features)
- No external APIs yet

---

## 2. Intro Scene (`components/scenes/IntroScene.tsx`)

**What happens:**
- Shows 4 shots from `/public/shots/intro_*.png`
- Auto-advances every 3 seconds
- Displays narration text
- Button to skip

**What's used:**
- Next.js Image component
- CSS animations
- Timer logic

**What's NOT used:**
- No AI
- No API calls
- Just visual storytelling

---

## 3. Foyer Scene (`components/scenes/FoyerScene.tsx`)

**Stage 1: Intro**
- Shows `/shots/1a_1.png`
- Narration: "You enter the foyer..."
- Button: "Continue →"

**Stage 2: Meet Elara**
- Shows `/shots/1a_2.png`
- Elara's dialogue (hardcoded)
- Button: "Begin Puzzle"

**Stage 3: Puzzle**
- Shows `/shots/1b_1.png`
- Displays 5 photo cards
- Each has 3 category buttons (Sun, Ring, Crystal)
- **Button: "🔮 Ask Ghost Council"** ← THIS IS THE KEY

**What's used so far:**
- Images from `/public/shots/`
- React state for puzzle progress
- CSS styling
- NO AI YET

---

## 4. THE MAGIC: Click "Ask Ghost Council"

### What Actually Happens (Line by Line)

**File:** `components/scenes/FoyerScene.tsx`

```typescript
const handleAskHint = async () => {
  setDebating(true)  // Button shows "Ghosts Debating..."
  
  // 1. Call the debate API
  const response = await fetch('/api/ghost-debate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      puzzleContext: 'Tapestry puzzle - match photos to categories',
      playerMessage: 'I need help understanding this puzzle'
    })
  })
  
  // 2. Get the response
  const { debate, consensus } = await response.json()
  
  // 3. Send each message to the debate panel
  debate.forEach((msg: any) => {
    onDebate?.(msg.ghost, msg.message)
  })
  
  // 4. Send consensus after 1 second
  setTimeout(() => {
    onDebate?.('Consensus', consensus)
  }, 1000)
  
  setDebating(false)  // Button back to "Ask Ghost Council"
}
```

---

## 5. The Debate API (`app/api/ghost-debate/route.ts`)

### What ACTUALLY Executes

```typescript
export async function POST(req: NextRequest) {
  // 1. Get puzzle context from request
  const { puzzleContext, playerMessage } = await req.json()
  
  // 2. Get Groq API key from environment
  const apiKey = process.env.GROQ_API_KEY
  
  // 3. Invoke ALL 5 agents in PARALLEL
  const debatePromises = Object.keys(GHOST_AGENTS).map(async (ghostName) => {
    const context = `Puzzle: ${puzzleContext}\nPlayer asks: ${playerMessage}\n\nWhat's your perspective?`
    const response = await invokeGhostAgent(ghostName, context, apiKey)
    return { ghost: GHOST_AGENTS[ghostName].name, message: response }
  })
  
  // 4. Wait for all 5 to respond
  const debate = await Promise.all(debatePromises)
  
  // 5. Elara synthesizes consensus
  const consensusContext = debate.map(d => `${d.ghost}: ${d.message}`).join('\n')
  const consensus = await invokeGhostAgent(
    'elara', 
    `Based on this debate:\n${consensusContext}\n\nProvide consensus:`,
    apiKey
  )
  
  // 6. Return everything
  return NextResponse.json({ debate, consensus })
}
```

**What's used:**
- ✅ Groq API (5 parallel calls + 1 consensus call = 6 total)
- ✅ `lib/agents/ghostAgents.ts` (agent definitions)
- ✅ `Promise.all()` for parallel execution

**What's NOT used:**
- ❌ No MCP servers called
- ❌ No agent hooks triggered
- ❌ No image generation
- ❌ No memory storage
- ❌ No blockchain vows

---

## 6. Each Agent Call (`lib/agents/ghostAgents.ts`)

### What ACTUALLY Happens

```typescript
export async function invokeGhostAgent(ghostName: string, context: string, apiKey: string) {
  // 1. Get agent definition
  const agent = GHOST_AGENTS[ghostName.toLowerCase()]
  
  // 2. Call Groq API
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: agent.systemPrompt },  // Personality
        { role: 'user', content: context }                // Puzzle context
      ],
      temperature: 0.8,
      max_tokens: 80,
    })
  })
  
  // 3. Parse response
  const data = await response.json()
  return data.choices[0].message.content
}
```

**What's used:**
- ✅ Groq API (https://api.groq.com)
- ✅ llama-3.3-70b-versatile model
- ✅ System prompts (agent personalities)
- ✅ Temperature 0.8 (creative responses)
- ✅ Max 80 tokens (short responses)

**What's NOT used:**
- ❌ No MCP calls
- ❌ No external memory
- ❌ No image generation
- ❌ Just pure Groq API

---

## 7. Debate Panel Updates (`components/GhostDebatePanel.tsx`)

### What ACTUALLY Happens

```typescript
export default function GhostDebatePanel({ messages }: { messages: Message[] }) {
  const { speak } = useSpeech()  // TTS service
  
  useEffect(() => {
    // When new messages arrive
    if (messages.length > lastMessageCount.current) {
      const newMessages = messages.slice(lastMessageCount.current)
      
      // Speak each message using TTS
      newMessages.forEach((msg) => {
        const ghostName = msg.ghost.toLowerCase() as GhostVoice
        speak(msg.message, ghostName)
      })
      
      lastMessageCount.current = messages.length
    }
  }, [messages, speak])
  
  // Display messages
  return (
    <div className="ghost-debate">
      <h3>👻 Ghost Council Debate</h3>
      {messages.map((msg, idx) => (
        <div key={idx} className={`ghost-message ${ghostColors[msg.ghost.toLowerCase()]}`}>
          <strong>{msg.ghost}:</strong> {msg.message}
        </div>
      ))}
    </div>
  )
}
```

**What's used:**
- ✅ `lib/tts/speechService.ts` (text-to-speech)
- ✅ Browser Web Speech API (fallback)
- ✅ CSS styling for ghost colors
- ✅ React useEffect for auto-speaking

**What's NOT used:**
- ❌ No ElevenLabs API (unless configured)
- ❌ Just browser TTS by default

---

## 8. TTS Service (`lib/tts/speechService.ts`)

**What ACTUALLY Happens:**
- Checks if `NEXT_PUBLIC_ELEVENLABS_API_KEY` exists
- If YES: Uses ElevenLabs API (premium voices)
- If NO: Uses browser `speechSynthesis` API (free, built-in)

**What's used by default:**
- ✅ Browser Web Speech API
- ✅ No external API needed

---

## Complete Flow Summary

### When You Click "Ask Ghost Council"

1. **Frontend** (`FoyerScene.tsx`) → Calls `/api/ghost-debate`
2. **API Route** (`app/api/ghost-debate/route.ts`) → Calls Groq API 6 times
3. **Groq API** → Returns 5 agent responses + 1 consensus
4. **Frontend** → Displays in `GhostDebatePanel`
5. **TTS** → Speaks each message using browser API

### What's ACTUALLY Used

✅ **Working:**
- Groq API (llama-3.3-70b-versatile)
- 5 agent personalities (system prompts)
- Parallel invocation (`Promise.all()`)
- Browser TTS (Web Speech API)
- React components
- Next.js Image component
- 26 pre-generated shots

❌ **NOT Used (Just Code That Exists):**
- MCP routes (`/api/mcp/*`) - Never called
- Agent hooks (`.kiro/hooks/`) - Kiro IDE only
- Replicate API - Never called
- Pinecone API - Never called
- ElevenLabs API - Only if configured
- Custom blockchain server - Never called

---

## The Honest Truth

### What Makes This Game Work

1. **Groq API** - Powers all 5 agents
2. **System Prompts** - Give each agent personality
3. **Parallel Execution** - All agents respond at once
4. **React State** - Manages game flow
5. **Pre-generated Art** - 26 beautiful shots
6. **Browser TTS** - Speaks the dialogue

### What's Just There But Not Used

1. MCP routes (fallback implementations)
2. Agent hooks (Kiro IDE configs)
3. External API integrations (optional)

---

## The Real Demo

**What to show:**
1. Start game
2. Get to Foyer puzzle
3. Click "🔮 Ask Ghost Council"
4. Watch debate panel fill with 5 different responses
5. See consensus appear

**What to say:**
"Five AI agents powered by Groq debate in real-time. Each has a unique personality defined in their system prompt. They respond in parallel and reach consensus. It's never the same twice."

**That's it. That's what actually works. And it's impressive.** ✨
