# Ghost Agent System - Design

## Architecture

### Agent Layer
```
┌─────────────────────────────────────────┐
│         Player Interface (React)         │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      Ghost Debate Orchestrator          │
│  (app/api/ghost-debate/route.ts)        │
└─────────────────────────────────────────┘
         ↓         ↓         ↓
    ┌────────┐ ┌────────┐ ┌────────┐
    │ Elara  │ │ Harlan │ │  Mira  │
    │ Agent  │ │ Agent  │ │ Agent  │
    └────────┘ └────────┘ └────────┘
         ↓         ↓         ↓
    ┌────────┐ ┌────────┐
    │  Theo  │ │ Selene │
    │ Agent  │ │ Agent  │
    └────────┘ └────────┘
         ↓
┌─────────────────────────────────────────┐
│    Groq API (llama-3.3-70b-versatile)   │
└─────────────────────────────────────────┘
```

### Multi-Modal AI Stack
```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Azure TTS   │    │    Gemini    │    │   Suno AI    │
│  (Voices)    │    │   (Images)   │    │   (Music)    │
│  6 neural    │    │  26 scenes   │    │  6 scores    │
└──────────────┘    └──────────────┘    └──────────────┘
```

## Correctness Properties

### P1: Agent Independence
**Property**: Each agent must generate responses independently without seeing other agents' responses first.
**Verification**: Agents are invoked via `Promise.all()` in parallel.

### P2: Personality Consistency
**Property**: Each agent's response must match their defined personality traits.
**Verification**: System prompts enforce character voice; responses are under word limits.

### P3: Debate Convergence
**Property**: The debate must produce a single consensus hint within 5 seconds.
**Verification**: Timeout on API calls; Elara synthesizes final consensus.

### P4: Voice Consistency
**Property**: Each agent must use their designated voice consistently.
**Verification**: Voice mapping in speechService.ts enforces character-voice pairing.

### P5: Graceful Degradation
**Property**: System works even if Azure TTS fails.
**Verification**: Fallback to browser TTS; game remains playable.

## Data Flow

### Debate Trigger Flow
1. Player clicks "Ask for Hint" or "Summon Ghost Council"
2. Frontend sends POST to `/api/ghost-debate` with puzzle context
3. Backend invokes all 5 agents in parallel via Groq API
4. Each agent returns response based on personality
5. Responses streamed to frontend in real-time
6. Elara synthesizes consensus from all perspectives
7. Consensus displayed as final hint

### Voice Acting Flow
1. Agent generates text response via Groq API
2. speechService.speak() called with text and character name
3. If Azure TTS configured: Generate audio with character's neural voice
4. If not configured: Use browser's built-in TTS
5. Audio cached to avoid re-generation
6. Speech queued to prevent overlapping dialogue

## Scene Structure

Each scene follows this pattern:
```typescript
interface Scene {
  id: string
  backgroundImage: string // from shots/ folder
  ghost: GhostAgent
  puzzle: PuzzleConfig
  onComplete: () => void
  onDebate: (ghost: string, message: string) => void
}
```

### Scene Progression
1. **Intro**: Forest → Gate → Enter mansion (no puzzle)
2. **Foyer**: Meet Elara → Tapestry puzzle → Unlock Study
3. **Study**: Meet Harlan → Neural maze puzzle → Unlock Nursery
4. **Nursery**: Meet Mira → Love harvest puzzle → Unlock Hallway
5. **Hallway**: Meet Theo & Selene → Rose door maze → Unlock Chapel
6. **Chapel**: All ghosts reunite → Vow ritual → Family debate → Ending

## Technical Decisions

### Why Groq over OpenAI?
- Free tier with generous limits
- Faster response times (important for real-time debate)
- llama-3.3-70b model is excellent for character roleplay

### Why Parallel Invocation?
- Ensures true agent independence
- Faster than sequential (5 agents in ~2s vs ~10s)
- Creates authentic debate dynamics

### Why Elara for Consensus?
- Maternal personality makes her natural mediator
- Prioritizes family harmony over individual opinions
- Provides emotional closure to debates
