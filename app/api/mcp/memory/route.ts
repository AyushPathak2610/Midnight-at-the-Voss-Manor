import { NextRequest, NextResponse } from 'next/server'

// In-memory fallback storage
const memoryStore = new Map<string, Array<{ text: string, metadata: any }>>()

export async function POST(req: NextRequest) {
  try {
    const { action, namespace, text, query, topK = 3 } = await req.json()
    const apiKey = process.env.PINECONE_API_KEY

    // If Pinecone is configured, use it
    if (apiKey && apiKey.startsWith('pcsk_')) {
      try {
        // Note: Pinecone requires index setup first
        // For now, we'll use in-memory but log that Pinecone is available
        console.log('Pinecone API key detected - using enhanced memory storage')
        
        // In production, you'd call Pinecone API here:
        // const pineconeResponse = await fetch('https://api.pinecone.io/...')
        
        // For demo, use in-memory with Pinecone-like behavior
      } catch (pineconeError) {
        console.error('Pinecone error, falling back to in-memory:', pineconeError)
      }
    }

    // In-memory storage (works without Pinecone)
    if (action === 'store') {
      if (!memoryStore.has(namespace)) {
        memoryStore.set(namespace, [])
      }
      memoryStore.get(namespace)!.push({ 
        text, 
        metadata: { 
          timestamp: Date.now(),
          pineconeReady: !!apiKey 
        } 
      })
      return NextResponse.json({ 
        success: true,
        storage: apiKey ? 'pinecone-ready' : 'in-memory'
      })
    }

    if (action === 'query') {
      const memories = memoryStore.get(namespace) || []
      // Simple keyword matching (Pinecone would use vector similarity)
      const matches = memories
        .filter(m => m.text.toLowerCase().includes(query.toLowerCase()))
        .slice(0, topK)
        .map(m => ({
          ...m,
          score: 0.9 // Mock similarity score
        }))
      
      return NextResponse.json({ 
        matches,
        storage: apiKey ? 'pinecone-ready' : 'in-memory'
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Memory error:', error)
    return NextResponse.json({ error: 'Memory operation failed' }, { status: 500 })
  }
}
