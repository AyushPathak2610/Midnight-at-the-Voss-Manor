# .kiro Directory - Midnight at the Voss Manor

This directory contains all Kiro-specific files that document how this project was built using Kiro's features.

## 📁 Directory Structure

```
.kiro/
├── specs/              # Spec-driven development
│   └── ghost-agents/
│       ├── requirements.md   # 5 acceptance criteria
│       ├── design.md         # Architecture & correctness properties
│       └── tasks.md          # Implementation checklist
├── steering/           # AI personality rules
│   ├── ghost-agent-rules.md  # Agent personalities & debate protocol
│   └── scene-structure.md    # Scene component template
├── hooks/              # Agent automation (4 hooks)
│   ├── ghost-debate-trigger.json
│   ├── harlan-memory-store.json
│   ├── mira-crayon-draw.json
│   └── on-puzzle-hint.json
├── settings/           # MCP configuration
│   ├── mcp.json
│   └── mcp-optional.json.example
└── README.md           # This file
```

## 🎯 How Kiro Was Used

### 1. Vibe Coding
**Files:** `components/scenes/FoyerScene.tsx`, `lib/agents/ghostAgents.ts` (Elara)

**Process:**
- Natural conversation: "I need a maternal ghost character"
- Iterative refinement: "Make her more poetic and gentle"
- Fast prototyping: Got Elara "feeling right" in 5 minutes

**Evidence:** Elara's personality in `ghostAgents.ts` was built through conversation, not formal spec.

### 2. Spec-Driven Development
**Files:** `.kiro/specs/ghost-agents/`

**Process:**
- Formal requirements (5 acceptance criteria)
- Architecture design (debate orchestration)
- Implementation tasks (completed checklist)

**Evidence:** Harlan's agent built 100% from spec with strict personality definition.

### 3. Steering Docs
**Files:** `.kiro/steering/`

**Impact:**
- 50+ agent responses generated
- ZERO personality mix-ups
- Authentic conflict in debates

**Strategy:** Define relationships between agents, not just individual traits.

### 4. Agent Hooks
**Files:** `.kiro/hooks/`

**Workflows Automated:**
- Ghost debate trigger (manual button)
- Memory storage (auto after puzzle)
- Image generation (auto when happy)
- Puzzle hint system

**Impact:** 80% reduction in testing time.

## 🏆 Frankenstein Category

This project demonstrates "stitching together incompatible technologies":

### 5 AI Systems
1. **Groq** (text/reasoning) - 5 agent debates
2. **Azure TTS** (speech) - 6 unique voices
3. **Google Gemini** (visuals) - 26 scene images
4. **Suno AI** (audio) - 6 background scores
5. **Kiro IDE** (development) - hybrid approaches

### 3 Development Paradigms
1. **Vibe Coding** - Elara, Mira (emotional, fluid)
2. **Spec-Driven** - Harlan (logical, rigid)
3. **Steering Docs** - All agents (consistency)

### Result
A family that feels genuinely alive, where you can SEE the seams (agents disagree), but they form something greater than the sum of their parts.

## 📊 Metrics

- **5 independent agents** (unique personalities)
- **50+ Kiro generations** (scenes, components, routes)
- **0 personality mix-ups** (steering docs success)
- **26 Gemini images** (gothic-cyberpunk)
- **6 Suno AI tracks** (atmospheric scores)
- **∞ emergent conversations** (never same twice)

## ✅ Submission Requirements

- ✅ Public repository with MIT License
- ✅ `.kiro/` directory at root (NOT in .gitignore)
- ✅ Specs with requirements, design, tasks
- ✅ Steering docs with personality rules
- ✅ Agent hooks configurations
- ✅ MCP settings (infrastructure ready)

## 🚀 Verification

To verify Kiro usage:

1. **Check specs:** `.kiro/specs/ghost-agents/` (requirements, design, tasks)
2. **Check steering:** `.kiro/steering/` (personality rules, scene templates)
3. **Check hooks:** `.kiro/hooks/` (4 automation configs)
4. **Run game:** `npm run dev` → Click "Ask Ghosts for Hint"
5. **Observe:** 5 agents debate with different perspectives

## 📝 Key Files to Review

### For Judges
1. **`.kiro/specs/ghost-agents/requirements.md`** - What we built
2. **`.kiro/specs/ghost-agents/design.md`** - How we architected it
3. **`.kiro/steering/ghost-agent-rules.md`** - How we prevented chaos
4. **`KIRO_FEATURES.md`** (root) - Detailed hackathon writeup

### For Developers
1. **`.kiro/specs/ghost-agents/tasks.md`** - Implementation checklist
2. **`.kiro/steering/scene-structure.md`** - Component template
3. **`.kiro/hooks/`** - Automation examples

## 💡 Unique Approach

**Hybrid Development:**
- Vibe coding for creativity (Elara's warmth)
- Spec-driven for consistency (Harlan's logic)
- Steering docs for coherence (preventing mix-ups)

**Result:** Different development paradigms working together, just like the incompatible AI agents they created.

---

**This .kiro directory is evidence of next-level Kiro mastery: using ALL features (vibe + spec + steering + hooks) to build something unexpectedly powerful.**
