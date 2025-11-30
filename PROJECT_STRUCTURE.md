# Shadowed Haven - Project Structure

```
shadowed-haven/
│
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── ghost-debate/         # Main agent orchestration
│   │   │   └── route.ts          # Triggers all 5 agents, synthesizes consensus
│   │   └── mcp/                  # MCP integration endpoints
│   │       ├── image-gen/        # Mira's crayon drawings (Replicate)
│   │       ├── memory/           # Harlan's vector storage (Pinecone)
│   │       ├── sentiment/        # Elara's emotion detection
│   │       └── vows/             # Selene's blockchain ledger
│   ├── page.tsx                  # Main game component
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Haunted mansion styling
│
├── components/                   # React components
│   ├── scenes/                   # Animated game scenes
│   │   ├── IntroScene.tsx        # Forest → mansion entrance
│   │   └── FoyerScene.tsx        # Meet Elara, first puzzle
│   └── GhostDebatePanel.tsx      # Real-time debate viewer (bottom right)
│
├── lib/                          # Core logic
│   ├── agents/
│   │   └── ghostAgents.ts        # 5 agent definitions (personalities, prompts)
│   └── mcp/
│       └── mcpClient.ts          # MCP capability wrappers
│
├── mcp-servers/                  # Custom MCP servers
│   └── blockchain-vows-server.js # Selene's promise ledger (Node.js)
│
├── .kiro/                        # Kiro configuration
│   ├── hooks/                    # Agent hooks
│   │   └── on-puzzle-hint.json   # Triggers ghost council debate
│   ├── steering/                 # Development rules
│   │   └── ghost-agent-rules.md  # Agent personalities & protocols
│   └── settings/
│       └── mcp.json              # MCP server configuration
│
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── next.config.js                # Next.js config
│
├── README.md                     # Main project documentation
├── SETUP.md                      # Installation & setup guide
├── KIRO_FEATURES.md              # Detailed Kiro feature usage
├── DEMO_SCRIPT.md                # Video recording script
└── PROJECT_STRUCTURE.md          # This file
```

## Key Files Explained

### Core Game Logic
- **`app/page.tsx`** - Main game state, scene transitions
- **`components/scenes/`** - Each scene is a self-contained animated component
- **`components/GhostDebatePanel.tsx`** - Shows real-time agent messages

### AI Agent System
- **`lib/agents/ghostAgents.ts`** - Defines all 5 ghost personalities
  - Elara: Maternal, gentle (vibe-coded)
  - Harlan: Scientific, amnesiac (spec-driven)
  - Mira: Childlike, innocent (MCP image-gen)
  - Theo: Dramatic, regretful (MCP text-to-speech)
  - Selene: Cold, proud (MCP blockchain)

### API Layer
- **`app/api/ghost-debate/route.ts`** - Orchestrates multi-agent debates
  - Calls all 5 agents in parallel
  - Synthesizes consensus hint
  - Returns debate transcript + final answer

### MCP Integration
- **`app/api/mcp/*/route.ts`** - Endpoints for each MCP capability
- **`lib/mcp/mcpClient.ts`** - Client functions for calling MCP servers
- **`mcp-servers/blockchain-vows-server.js`** - Custom MCP server for Selene

### Kiro Configuration
- **`.kiro/hooks/on-puzzle-hint.json`** - Agent hook definition
- **`.kiro/steering/ghost-agent-rules.md`** - Personality rules (auto-included)
- **`.kiro/settings/mcp.json`** - MCP server connections

## Data Flow

```
Player clicks "Ask for Hint"
    ↓
FoyerScene.tsx calls handleAskForHint()
    ↓
POST /api/ghost-debate
    ↓
ghostAgents.ts invokes all 5 agents via Grok API
    ├─ Elara (maternal perspective)
    ├─ Harlan (logical analysis) → calls MCP memory
    ├─ Mira (childlike view) → calls MCP image-gen
    ├─ Theo (dramatic plea)
    └─ Selene (truth check) → calls MCP blockchain
    ↓
Agents debate independently (parallel execution)
    ↓
Consensus synthesized from all responses
    ↓
Debate transcript + consensus returned to frontend
    ↓
GhostDebatePanel.tsx displays messages in real-time
    ↓
Player sees full debate + final hint
```

## MCP Server Architecture

```
Game Frontend
    ↓
Next.js API Routes (/api/mcp/*)
    ↓
MCP Clients (lib/mcp/mcpClient.ts)
    ↓
    ├─ Replicate MCP (image generation for Mira)
    ├─ Pinecone MCP (vector memory for Harlan)
    └─ Custom Blockchain MCP (vow ledger for Selene)
```

## Agent Hook Flow

```
Player action (button click)
    ↓
Kiro Agent Hook triggered (.kiro/hooks/on-puzzle-hint.json)
    ↓
Hook gathers context:
    - Current puzzle state
    - Player progress
    - Ghost personalities (from steering doc)
    ↓
Hook sends message to Kiro agent
    ↓
Kiro orchestrates ghost debate
    ↓
Results displayed in game UI
```

## Styling Architecture

- **`app/globals.css`** - Base styles, ghost colors, animations
- **Framer Motion** - Scene transitions and ghost animations
- **Inline styles** - Component-specific styling (React style objects)

## Development Workflow

1. **Vibe coding** - Chat with Kiro to refine personalities
2. **Spec updates** - Modify `ghostAgents.ts` for consistent behavior
3. **Hook testing** - Use Kiro's Agent Hooks panel
4. **MCP debugging** - Check network tab for MCP calls
5. **Steering refinement** - Update rules in `.kiro/steering/`

## Production Considerations

- Replace in-memory storage with real Pinecone
- Add rate limiting to Grok API calls
- Implement proper error boundaries
- Add loading states for MCP calls
- Cache agent responses for common queries
- Add more scenes (study, nursery, corridor, chapel)

## Extensibility

Want to add a 6th ghost?
1. Add to `GHOST_AGENTS` in `ghostAgents.ts`
2. Update steering doc with new personality
3. Add MCP capability if needed
4. Create new scene component
5. Update debate logic to include new agent

The architecture is designed for easy expansion!
