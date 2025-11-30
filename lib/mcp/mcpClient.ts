// MCP client for calling external capabilities from ghost agents

export async function generateCrayonImage(prompt: string): Promise<string> {
  // Calls Replicate MCP for Mira's crayon drawings
  const response = await fetch('/api/mcp/image-gen', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      prompt: `child's crayon drawing of ${prompt}, simple, colorful, innocent style`,
      model: 'stability-ai/sdxl'
    })
  })
  
  const data = await response.json()
  return data.imageUrl
}

export async function storeMemory(ghostName: string, memory: string): Promise<void> {
  // Calls Pinecone MCP for Harlan's memory storage
  await fetch('/api/mcp/memory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'store',
      namespace: `ghost-${ghostName}`,
      text: memory,
      metadata: { timestamp: Date.now() }
    })
  })
}

export async function queryMemory(ghostName: string, query: string): Promise<string[]> {
  // Retrieves relevant memories for Harlan
  const response = await fetch('/api/mcp/memory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'query',
      namespace: `ghost-${ghostName}`,
      query,
      topK: 3
    })
  })
  
  const data = await response.json()
  return data.matches.map((m: any) => m.text)
}

export async function checkVow(person: string, vow: string): Promise<{ kept: boolean, timestamp?: string }> {
  // Calls blockchain MCP for Selene's vow verification
  const response = await fetch('/api/mcp/vows', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'check', person, vow })
  })
  
  return response.json()
}

export async function analyzeSentiment(text: string): Promise<{ score: number, emotion: string }> {
  // Sentiment analysis for Elara to gauge player emotions
  const response = await fetch('/api/mcp/sentiment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
  
  return response.json()
}
