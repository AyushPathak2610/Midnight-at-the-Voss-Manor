# Ghost Agent System - Requirements

## Overview
Build 5 independent AI agents (one per ghost character) that debate puzzle solutions in real-time.

## Acceptance Criteria

### AC1: Five Independent Agents
- Each ghost (Elara, Harlan, Mira, Theo, Selene) is a separate Groq API agent
- Each has unique personality defined in system prompt
- Agents can disagree and create dramatic conflict
- Uses llama-3.3-70b-versatile model

### AC2: Real-time Debate System
- When player asks for hint, all 5 agents respond simultaneously
- Debate is visible to player in real-time
- Final consensus is synthesized from all perspectives

### AC3: Voice Acting Integration
- Each agent has unique Azure TTS neural voice
- Fallback to browser TTS if Azure not configured
- Speech queue system prevents overlapping dialogue
- Caching system for performance

### AC4: Scene-Based Gameplay
- 6 scenes: Intro → Foyer → Study → Nursery → Hallway → Chapel
- Each scene uses Gemini-generated gothic-cyberpunk artwork (26 images total)
- Background music composed with Suno AI (6 atmospheric scores)
- Puzzles integrated into each scene with ghost guidance

### AC5: Multi-Modal AI Integration
- **Text/Reasoning**: Groq (5 agent debates)
- **Speech**: Azure TTS (6 unique voices)
- **Visuals**: Google Gemini (26 scene images)
- **Audio**: Suno AI (6 background scores)
- **Development**: Kiro IDE (vibe + spec + steering)

## Non-Functional Requirements
- Agent responses must be under 30 words (except Mira: 25 words)
- Debate must complete within 5 seconds
- Fallback responses if API fails
- All MCP calls must be async and non-blocking
