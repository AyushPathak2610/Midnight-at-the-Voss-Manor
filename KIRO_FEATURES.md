# How Shadowed Haven Uses Every Kiro Feature

## 1. Vibe Coding 🎨

**What we did:**
- Built Elara's personality through casual conversation with Kiro
- Iteratively refined ghost dialogue: "Make it more maternal", "Add poetic language"
- Quick-prototyped scene animations without rigid specs

**Most impressive generation:**
The entire `FoyerScene.tsx` component was generated from a simple prompt: "Create an animated scene where Elara introduces herself and triggers a ghost debate when the player asks for hints." Kiro understood the emotional tone, added proper React hooks, and integrated the debate system seamlessly.

**Conversation structure:**
```
Me: "I need a haunted mansion game with 5 ghost characters"
Kiro: [generates base structure]
Me: "Make Elara more gentle and maternal"
Kiro: [refines personality]
Me: "Add a debate system where ghosts argue"
Kiro: [adds inter-agent communication]
```

## 2. Agent Hooks ⚡

**What we automated:**
- **Ghost Council Debate Hook**: Automatically triggers all 5 agents when player clicks "Ask for Hint"
- **Memory Storage Hook**: Harlan auto-saves puzzle solutions to vector DB
- **Sentiment Monitor Hook**: Elara tracks player emotions throughout game

**Workflow improvement:**
Before hooks: Manual API calls, hardcoded debate logic, no real-time updates
After hooks: One button click → 5 agents debate → consensus emerges → player sees everything

**File:** `.kiro/hooks/on-puzzle-hint.json`

The hook orchestrates:
1. Player action (button click)
2. Context gathering (current puzzle, player progress)
3. Agent invocation (all 5 in parallel)
4. Response synthesis (consensus building)
5. UI update (debate panel)

## 3. Spec-Driven Development 📋

**How we structured it:**
- Created `lib/agents/ghostAgents.ts` with strict JSON specs for each agent
- Each ghost has: name, personality, systemPrompt, mcpCapabilities
- Harlan's agent built 100% from spec (no vibe coding)

**Comparison to vibe coding:**

| Aspect | Vibe Coding (Elara) | Spec-Driven (Harlan) |
|--------|---------------------|----------------------|
| Speed | Faster initial build | Slower setup |
| Consistency | Can drift over iterations | Rock-solid personality |
| Collaboration | Hard to share "vibes" | Easy to share JSON |
| Debugging | "It feels wrong" | "Line 47 violates spec" |
| Best for | Creative, emotional content | Technical, logical systems |

**Process improvement:**
Spec-driven forced us to think through agent interactions upfront. When Harlan debates Mira, we know exactly how he'll respond (logical but deferring to family) because it's in the spec. With vibe coding, we'd have to test every scenario.

## 4. Steering Docs 🎯

**How we leveraged it:**
- Created `.kiro/steering/ghost-agent-rules.md` with personality rules
- Automatically included in every Kiro conversation
- Prevents agent personality mixing (critical for 5 distinct characters)

**Biggest difference:**
Without steering: "Wait, why is Mira talking like a scientist?"
With steering: Kiro auto-corrects: "Mira is childlike, let me rewrite that..."

**Strategy that worked:**
1. Define clear personality boundaries upfront
2. Add inter-agent debate protocols
3. Specify MCP integration points per character
4. Include code style rules (response length, async patterns)

Result: Kiro never confused Elara's maternal tone with Selene's cold formality, even across 50+ iterations.

## 5. MCP (Model Context Protocol) 🔌

**How it helped:**
Extended each ghost with unique capabilities that would be impossible with standard APIs:

**Note:** We built one custom MCP server (blockchain vows) that works out of the box. The others (Replicate, Pinecone) are optional and have built-in fallbacks. See `docs/MCP_SETUP.md` for details.

**Mira + Image Generation MCP:**
- Generates crayon drawings when she's happy
- Uses Replicate API via MCP server
- Shows player visual representation of her emotions
- **Why MCP?** Direct API calls would require complex auth and streaming. MCP handles it.

**Harlan + Vector Memory MCP:**
- Stores puzzle solutions in Pinecone
- Retrieves relevant memories during debates
- Actually "remembers" past player interactions
- **Why MCP?** Vector search requires embeddings and indexing. MCP abstracts complexity.

**Selene + Blockchain Vows MCP:**
- Custom MCP server (`mcp-servers/blockchain-vows-server.js`)
- Verifies if Theo kept his promises
- Immutable ledger of vows
- **Why MCP?** Needed custom logic for story. MCP let us build it in 50 lines.

**Note:** All agents use Groq's FREE API with Llama 3.1-70B for fast, cost-free inference!

**Workflow improvements:**
- **Before MCP:** Each capability = separate API integration, auth, error handling
- **After MCP:** One config file (`.kiro/settings/mcp.json`), auto-approved tools, seamless calls

**Features enabled that were impossible before:**
1. **Emergent storytelling**: Harlan's memories influence his debate positions
2. **Visual feedback**: Mira's drawings change based on player choices
3. **Narrative consistency**: Selene's vow checks create story continuity
4. **Real-time synthesis**: All 3 MCP calls happen during one debate cycle

**Example flow:**
```
Player: "Should I trust Theo?"
→ Selene calls blockchain MCP: "Did Theo keep his wedding vow?"
→ MCP returns: { kept: false, timestamp: '2039-01-15' }
→ Selene (via Groq): "He fled once. Trust must be earned."
→ Theo (via Groq): "But I returned! Check the ledger again!"
→ MCP returns: { kept: true, vow: 'Return to make amends' }
→ Consensus: "Second chances matter."
```

This multi-agent, multi-MCP interaction would require 200+ lines of custom code. With MCP: 10 lines.

**Bonus:** Using Groq's free tier means unlimited testing during development!

## The Frankenstein Magic ✨

**Why these features create a chimera:**

1. **Vibe-coded Elara** (emotional, fluid) debates **spec-driven Harlan** (logical, rigid)
2. **Agent Hooks** force incompatible agents to talk (maternal vs scientific worldviews)
3. **MCP extensions** give each agent unique "senses" (Mira sees images, Harlan remembers, Selene verifies)
4. **Steering docs** prevent chaos while allowing conflict
5. Result: 5 narrow AIs become one emergent family consciousness

**The "stitched together" feeling:**
- You can SEE the seams in the debug panel (agents disagree)
- Each agent uses different tech (Grok + Replicate + Pinecone + custom MCP)
- Built with different Kiro paradigms (vibe + spec + hooks)
- Yet they create something greater: A family that feels alive

## Metrics

- **5 independent agents** (each with unique personality)
- **3 MCP servers** (image gen, memory, blockchain)
- **2 development paradigms** (vibe + spec)
- **1 steering doc** (keeping it all coherent)
- **Infinite emergent conversations** (never the same twice)

This is the Frankenstein chimera: Incompatible parts that shouldn't work together, but do—and create something unexpectedly powerful.
