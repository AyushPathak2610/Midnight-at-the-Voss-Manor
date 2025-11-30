# Ghost Agent System - Requirements

## Overview
Build 5 independent AI agents (one per ghost character) that debate puzzle solutions in real-time.

## Acceptance Criteria

### AC1: Five Independent Agents
- Each ghost (Elara, Harlan, Mira, Theo, Selene) is a separate Grok API agent
- Each has unique personality defined in system prompt
- Agents can disagree and create dramatic conflict

### AC2: Real-time Debate System
- When player asks for hint, all 5 agents respond simultaneously
- Debate is visible to player in real-time
- Final consensus is synthesized from all perspectives

### AC3: MCP Integration Per Ghost
- **Mira**: Uses image-gen MCP to draw crayon pictures when happy
- **Harlan**: Uses vector-memory MCP to store/retrieve puzzle solutions
- **Selene**: Uses blockchain MCP to verify vows and promises
- **Theo**: Uses text-to-speech MCP for dramatic voice lines
- **Elara**: Uses sentiment-analysis MCP to gauge player emotions

### AC4: Agent Hooks Automation
- Manual hook: "Summon Ghost Council" button triggers debate
- Auto hook: Mira draws when sentiment is positive
- Auto hook: Harlan stores memories after puzzle completion

### AC5: Scene-Based Gameplay
- 5 scenes: Intro → Foyer → Study → Nursery → Chapel
- Each scene uses pre-generated gothic-cyberpunk artwork
- Puzzles integrated into each scene with ghost guidance

## Non-Functional Requirements
- Agent responses must be under 30 words (except Mira: 25 words)
- Debate must complete within 5 seconds
- Fallback responses if API fails
- All MCP calls must be async and non-blocking
