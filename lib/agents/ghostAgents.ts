// Five independent Grok agents - one per ghost
// Each has unique personality and decision-making logic

export interface GhostAgent {
  name: string
  personality: string
  systemPrompt: string
  mcpCapabilities?: string[]
}

export const GHOST_AGENTS: Record<string, GhostAgent> = {
  elara: {
    name: 'Elara',
    personality: 'gentle, maternal, seeks family harmony',
    systemPrompt: `You are Elara, the mother ghost. You speak softly and prioritize family bonds above all. 
    When debating puzzle hints, you focus on emotional connections and memories of love.
    Keep responses under 30 words. Use gentle, poetic language.`,
    mcpCapabilities: ['sentiment-analysis']
  },
  
  harlan: {
    name: 'Harlan',
    personality: 'scientific, amnesiac, logical but confused',
    systemPrompt: `You are Dr. Harlan Voss, the scientist ghost with fragmented memories. 
    You analyze problems logically but struggle to remember emotional context.
    When debating, you cite facts but defer to family on emotional matters.
    Keep responses under 30 words. Use technical language mixed with uncertainty.`,
    mcpCapabilities: ['vector-memory-storage']
  },
  
  mira: {
    name: 'Mira',
    personality: 'childlike, innocent, seeks play and attention',
    systemPrompt: `You are Mira, the child ghost. You speak simply and focus on happy memories and play.
    When debating, you advocate for joy and family time. You miss your parents.
    Keep responses under 25 words. Use simple, childlike language with occasional excitement.`,
    mcpCapabilities: ['image-generation']
  },
  
  theo: {
    name: 'Theo',
    personality: 'dramatic, regretful, romantic',
    systemPrompt: `You are Theo, the brother ghost who fled love and returned too late.
    You speak dramatically and focus on redemption and keeping promises.
    When debating, you emphasize second chances and making amends.
    Keep responses under 30 words. Use passionate, theatrical language.`,
    mcpCapabilities: ['text-to-speech']
  },
  
  selene: {
    name: 'Selene',
    personality: 'cold but softening, proud, seeks truth',
    systemPrompt: `You are Selene, the jilted bride ghost. You were hurt but are learning to forgive.
    You speak with dignity and focus on truth and accountability.
    When debating, you demand honesty but show growing compassion.
    Keep responses under 30 words. Use formal, measured language.`,
    mcpCapabilities: ['blockchain-vows-ledger']
  }
}

export async function invokeGhostAgent(
  ghostName: string, 
  context: string,
  apiKey: string
): Promise<string> {
  const agent = GHOST_AGENTS[ghostName.toLowerCase()]
  if (!agent) throw new Error(`Unknown ghost: ${ghostName}`)

  try {
    // Call Groq API with agent's personality (FREE tier available!)
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // Available in your Groq account
        messages: [
          { role: 'system', content: agent.systemPrompt },
          { role: 'user', content: context }
        ],
        temperature: 0.8,
        max_tokens: 80,
        top_p: 1,
        stream: false
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Groq API error for ${ghostName}:`, response.status, errorText)
      console.error('Request was:', { model: 'llama3-70b-8192', messages: [{ role: 'system', content: agent.systemPrompt }, { role: 'user', content: context }] })
      throw new Error(`Groq API returned ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    
    // Validate response structure
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid Groq API response:', data)
      throw new Error('Invalid API response structure')
    }

    return data.choices[0].message.content
  } catch (error) {
    console.error(`Error invoking ${ghostName}:`, error)
    // Return fallback response based on personality
    return getFallbackResponse(ghostName, context)
  }
}

function getFallbackResponse(ghostName: string, context: string): string {
  const fallbacks: Record<string, string> = {
    elara: "The heart remembers what the mind forgets... focus on love.",
    harlan: "I... I struggle to recall. But family bonds transcend logic.",
    mira: "Daddy! Show the happy times! Like when we played together!",
    theo: "Brother, your family moments define you. Not the experiments.",
    selene: "Truth matters. Love transcends science. Show the bonds."
  }
  return fallbacks[ghostName.toLowerCase()] || "I sense the answer lies in family connections."
}
