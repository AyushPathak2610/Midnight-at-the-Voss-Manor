import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()

    // Simple sentiment analysis for demo
    const positiveWords = ['happy', 'love', 'joy', 'good', 'great', 'wonderful', 'help', 'yes']
    const negativeWords = ['sad', 'hate', 'angry', 'bad', 'terrible', 'no', 'scared', 'lost']

    const lowerText = text.toLowerCase()
    const positiveCount = positiveWords.filter(w => lowerText.includes(w)).length
    const negativeCount = negativeWords.filter(w => lowerText.includes(w)).length

    const score = (positiveCount - negativeCount) / (positiveCount + negativeCount + 1)
    
    let emotion = 'neutral'
    if (score > 0.3) emotion = 'positive'
    if (score < -0.3) emotion = 'negative'
    if (lowerText.includes('scared') || lowerText.includes('help')) emotion = 'fearful'

    return NextResponse.json({ score, emotion })
  } catch (error) {
    console.error('Sentiment error:', error)
    return NextResponse.json({ error: 'Sentiment analysis failed' }, { status: 500 })
  }
}
