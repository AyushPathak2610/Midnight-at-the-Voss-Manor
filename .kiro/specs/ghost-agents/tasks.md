# Ghost Agent System - Implementation Tasks

## Completed Tasks

- [x] 1. Set up project structure
  - [x] 1.1 Initialize Next.js 14 with TypeScript
  - [x] 1.2 Configure project dependencies (Groq SDK, Azure TTS)
  - [x] 1.3 Set up environment variables (.env.example)

- [x] 2. Implement 5 ghost agents
  - [x] 2.1 Create ghostAgents.ts with personality definitions
  - [x] 2.2 Implement Elara (maternal, vibe-coded)
  - [x] 2.3 Implement Harlan (logical, spec-driven)
  - [x] 2.4 Implement Mira (childlike, steering-enforced)
  - [x] 2.5 Implement Theo (dramatic, iterative)
  - [x] 2.6 Implement Selene (cold, personality-first)

- [x] 3. Build debate orchestration system
  - [x] 3.1 Create /api/ghost-debate route
  - [x] 3.2 Implement parallel agent invocation (Promise.all)
  - [x] 3.3 Add consensus synthesis (Elara mediates)
  - [x] 3.4 Add error handling and fallbacks

- [x] 4. Integrate Azure TTS voice acting
  - [x] 4.1 Create speechService.ts
  - [x] 4.2 Map each agent to unique neural voice
  - [x] 4.3 Implement speech queue system
  - [x] 4.4 Add caching for performance
  - [x] 4.5 Add browser TTS fallback

- [x] 5. Build scene components
  - [x] 5.1 IntroScene (forest entrance)
  - [x] 5.2 FoyerScene (Elara + tapestry puzzle)
  - [x] 5.3 StudyScene (Harlan + neural maze)
  - [x] 5.4 NurseryScene (Mira + love harvest)
  - [x] 5.5 HallwayScene (Theo & Selene + rose door)
  - [x] 5.6 ChapelScene (reunion + vow ritual)

- [x] 6. Generate visual assets
  - [x] 6.1 Create prompts for Gemini image generation
  - [x] 6.2 Generate 26 gothic-cyberpunk scenes
  - [x] 6.3 Organize images in public/shots/
  - [x] 6.4 Ensure visual consistency across scenes

- [x] 7. Compose background music
  - [x] 7.1 Create prompts for Suno AI composition
  - [x] 7.2 Generate 6 atmospheric scores (one per act)
  - [x] 7.3 Integrate music service with scene transitions
  - [x] 7.4 Add finale theme for ending

- [x] 8. Implement puzzle systems
  - [x] 8.1 Tapestry matching puzzle (Foyer)
  - [x] 8.2 Neural maze puzzle (Study)
  - [x] 8.3 Love harvest puzzle (Nursery)
  - [x] 8.4 Rose door maze puzzle (Hallway)
  - [x] 8.5 Vow ritual puzzle (Chapel)

- [x] 9. Create Kiro documentation
  - [x] 9.1 Write steering docs (ghost-agent-rules.md)
  - [x] 9.2 Write scene structure template
  - [x] 9.3 Document requirements and design
  - [x] 9.4 Create agent hooks configurations

- [x] 10. Polish and documentation
  - [x] 10.1 Write comprehensive README
  - [x] 10.2 Create QUICKSTART guide
  - [x] 10.3 Write KIRO_FEATURES hackathon writeup
  - [x] 10.4 Add error handling and troubleshooting
  - [x] 10.5 Test all scenes and puzzles

## Development Approach

### Vibe Coding (Elara, Mira)
- Natural conversation with Kiro
- Iterative refinement of personality
- Fast prototyping of emotional content

### Spec-Driven (Harlan)
- Formal personality definition
- Strict system prompt
- Predictable behavior in debates

### Steering Docs (All Agents)
- Prevent personality mixing
- Define inter-agent relationships
- Enforce debate protocol

## Key Decisions

1. **Groq over OpenAI**: Free tier, faster responses, better for roleplay
2. **Parallel invocation**: True independence, faster debates
3. **Elara for consensus**: Maternal personality = natural mediator
4. **Azure TTS**: Professional voices, 500k chars/month free
5. **Gemini for images**: Consistent gothic-cyberpunk aesthetic
6. **Suno for music**: Thematic scores matching character arcs

## Testing Strategy

- Manual testing of each scene
- Debate system tested with various puzzle contexts
- Voice acting tested with all character combinations
- Error handling tested by simulating API failures
- Cross-browser testing for TTS fallback
