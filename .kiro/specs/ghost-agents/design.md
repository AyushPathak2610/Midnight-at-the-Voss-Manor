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
│         Groq API (llama-3.3-70b)        │
└─────────────────────────────────────────┘
```

### MCP Extension Layer
```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Replicate  │    │   Pinecone   │    │  Blockchain  │
│  Image Gen   │    │    Vector    │    │     Vows     │
│  (for Mira)  │    │  (for Harlan)│    │ (for Selene) │
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

### P4: MCP Capability Isolation
**Property**: Each ghost can only access their designated MCP tools.
**Verification**: MCP routing based on `agent.mcpCapabilities` array.

### P5: Graceful Degradation
**Property**: System works even if MCP extensions fail.
**Verification**: Fallback responses defined for each agent.

## Data Flow

### Debate Trigger Flow
1. Player clicks "Ask for Hint" or "Summon Ghost Council"
2. Frontend sends POST to `/api/ghost-debate` with puzzle context
3. Backend invokes all 5 agents in parallel via Groq API
4. Each agent returns response based on personality
5. Responses streamed to frontend in real-time
6. Elara synthesizes consensus from all perspectives
7. Consensus displayed as final hint

### MCP Integration Flow (Example: Mira's Drawing)
1. Mira's agent response indicates happiness (positive sentiment)
2. Kiro hook detects positive sentiment in Mira's message
3. Hook triggers `generate-crayon-images.js` script
4. Script calls Replicate MCP with prompt based on Mira's message
5. Generated image saved to `public/images/mira-drawings/`
6. Image displayed in UI with crayon effect overlay

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
4. **Nursery**: Meet Mira → Love harvest puzzle → Unlock Chapel
5. **Chapel**: All ghosts → Vow ritual → Final debate → Ending

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
