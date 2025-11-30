import { NextRequest, NextResponse } from 'next/server'
import { invokeGhostAgent, GHOST_AGENTS } from '@/lib/agents/ghostAgents'

export async function POST(req: NextRequest) {
  try {
    const { puzzleContext, playerMessage } = await req.json()
    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: 'Missing GROQ_API_KEY' }, { status: 500 })
    }

    // Invoke all 5 agents in parallel - they debate independently
    const debatePromises = Object.keys(GHOST_AGENTS).map(async (ghostName) => {
      const context = `Puzzle: ${puzzleContext}\nPlayer asks: ${playerMessage}\n\nWhat's your perspective on helping them?`
      const response = await invokeGhostAgent(ghostName, context, apiKey)
      return { ghost: GHOST_AGENTS[ghostName].name, message: response }
    })

    const debate = await Promise.all(debatePromises)

    // Synthesize consensus (simple majority logic)
    const consensusContext = debate.map(d => `${d.ghost}: ${d.message}`).join('\n')
    const consensus = await invokeGhostAgent(
      'elara', 
      `Based on this debate:\n${consensusContext}\n\nProvide a single consensus hint (one sentence):`,
      apiKey
    )

    return NextResponse.json({ debate, consensus })
  } catch (error) {
    console.error('Ghost debate error:', error)
    return NextResponse.json({ error: 'Debate failed' }, { status: 500 })
  }
}
