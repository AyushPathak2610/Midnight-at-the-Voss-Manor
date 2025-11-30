# Ghost Agent Development Rules

## Agent Personalities (NEVER mix these up)

1. **Elara** - Maternal, gentle, focuses on family harmony
2. **Harlan** - Scientific, amnesiac, logical but emotionally confused  
3. **Mira** - Childlike, innocent, wants play and attention
4. **Theo** - Dramatic, regretful, seeks redemption
5. **Selene** - Cold but softening, demands truth and accountability

## Inter-Agent Debate Protocol

When implementing ghost debates:
- Each agent MUST respond independently based on their personality
- Agents can disagree - conflict is good for drama
- Mira often sides with emotional choices
- Harlan provides logical analysis but defers to family
- Selene demands honesty, Theo seeks forgiveness
- Final consensus should feel earned, not forced

## MCP Integration Points

- **Mira**: Uses image-gen MCP to draw crayon pictures when happy
- **Harlan**: Uses vector-memory MCP to store/retrieve puzzle solutions
- **Selene**: Uses blockchain MCP to verify "vows" and promises
- **Theo**: Uses text-to-speech MCP for dramatic voice lines
- **Elara**: Uses sentiment-analysis MCP to gauge player emotions

## Code Style

- Keep agent responses under 30 words
- Use async/await for all agent calls
- Show debate in real-time to player (streaming preferred)
- Never hardcode responses - always call Groq API
