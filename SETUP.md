# Shadowed Haven - Complete Setup Guide

## Prerequisites

- Node.js 18+ installed
- Groq API key (FREE from https://console.groq.com/keys)
- Optional: Replicate API key for real image generation
- Optional: Pinecone API key for vector memory

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Environment Setup

```bash
cp .env.example .env
```

Edit `.env` and add your keys:

```env
GROQ_API_KEY=gsk_your-key-here      # FREE!
REPLICATE_API_KEY=r8_your-key-here  # Optional
PINECONE_API_KEY=your-key-here      # Optional
```

### Getting API Keys

**Groq (Required - FREE!):**
1. Go to https://console.groq.com/keys
2. Sign up with GitHub or email (takes 30 seconds)
3. Click "Create API Key"
4. Copy and add to `.env` as `GROQ_API_KEY`
5. Free tier includes: 30 requests/minute, 14,400/day - plenty for this project!

**Replicate (Optional - for Mira's crayon drawings):**
1. Go to https://replicate.com/account/api-tokens
2. Sign up with GitHub (free trial includes $5 credit)
3. Click "Create token"
4. Copy and add to `.env` as `REPLICATE_API_KEY`
5. Note: App uses placeholder images if not configured

**Pinecone (Optional - for Harlan's memory):**
1. Go to https://app.pinecone.io
2. Sign up (free tier, no credit card required)
3. Create a new project
4. Go to "API Keys" and copy your key
5. Add to `.env` as `PINECONE_API_KEY`
6. Note: App uses in-memory storage if not configured

## Step 3: MCP Server Setup

The blockchain vows server is included and works automatically!

**Test it:**
```bash
npm run test-mcp
```

You should see: `Blockchain Vows MCP Server started`

**Note:** The other MCP servers (Replicate, Pinecone) are optional and require `uvx`. The app has built-in fallbacks, so you don't need them. See `docs/MCP_SETUP.md` if you want to enable them.

## Step 4: Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## Step 5: Test Agent Hooks

1. In Kiro IDE, open the Agent Hooks panel
2. You should see "Ghost Council Debate Trigger"
3. Click to test the hook manually
4. Or trigger it in-game by clicking "Ask Ghosts for Hint"

## Kiro Features Demonstrated

### 1. Vibe Coding
- Open `components/scenes/FoyerScene.tsx`
- Chat with Kiro: "Make Elara's dialogue more poetic"
- Watch Kiro refine the personality naturally

### 2. Agent Hooks
- File: `.kiro/hooks/on-puzzle-hint.json`
- Triggers all 5 agents when player needs help
- View in Kiro's Agent Hooks panel

### 3. Spec-Driven Development
- File: `lib/agents/ghostAgents.ts`
- Harlan's agent built from strict JSON spec
- Try: "Add a new ghost agent using the same spec pattern"

### 4. Steering Docs
- File: `.kiro/steering/ghost-agent-rules.md`
- Automatically included in all Kiro conversations
- Ensures agent personalities stay consistent

### 5. MCP Extensions
- Config: `.kiro/settings/mcp.json`
- One custom MCP server (blockchain vows) - works out of the box!
- Two optional MCP servers (Replicate, Pinecone) - have fallbacks
- Test: `npm run test-mcp` to verify blockchain server
- Details: See `docs/MCP_SETUP.md` for full setup guide

## Testing the Full Experience

1. **Start the game** - Watch intro animation
2. **Meet Elara** - She introduces the family
3. **Click "Ask Ghosts for Hint"** - Watch all 5 agents debate
4. **Open debug panel** (bottom right) - See real-time agent messages
5. **Notice MCP calls** - Mira generates images, Selene checks vows

## Troubleshooting

**"Missing GROQ_API_KEY" error:**
- Make sure `.env` file exists with valid key
- Get free key at https://console.groq.com/keys
- Restart dev server after adding key

**Agents not responding:**
- Check Groq API key is valid (starts with "gsk_")
- Check network connection
- View browser console for errors
- Groq free tier: 30 req/min is usually enough

**MCP servers not working:**
- Blockchain vows: Should work automatically (test with `npm run test-mcp`)
- Replicate/Pinecone: Optional, require `uvx` - see `docs/MCP_SETUP.md`
- App has fallbacks for all MCP features - works great without them!

**Agent Hook not visible:**
- Open Kiro IDE
- Go to Agent Hooks panel (left sidebar)
- Refresh if needed

## Building for Production

```bash
npm run build
npm start
```

## Demo Video Tips

1. Show the intro scene (beautiful animations)
2. Trigger ghost debate - show debug panel
3. Highlight each agent's unique personality
4. Show MCP integration (Mira's crayon drawing)
5. Emphasize: "5 incompatible agents working together"

## Hackathon Submission Checklist

- ✅ Video showing gameplay (2-3 minutes)
- ✅ README.md with project description
- ✅ All Kiro features demonstrated
- ✅ MCP servers configured
- ✅ Agent hooks visible and working
- ✅ Steering docs in place
- ✅ Code runs without errors
- ✅ One-paragraph pitch ready

## Questions?

Check the main README.md for architecture details and the one-paragraph pitch for judges.
