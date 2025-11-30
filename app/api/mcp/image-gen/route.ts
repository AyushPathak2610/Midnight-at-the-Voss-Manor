import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()
    const apiKey = process.env.REPLICATE_API_KEY

    console.log('Image generation request:', { prompt, hasApiKey: !!apiKey })

    if (!apiKey || !apiKey.startsWith('r8_')) {
      console.log('No valid Replicate API key, using placeholder')
      // Fallback to placeholder for demo
      return NextResponse.json({ 
        imageUrl: `https://placehold.co/400x300/FFD700/663399?text=Mira's+Family+Drawing`,
        demo: true,
        message: 'Using placeholder - add REPLICATE_API_KEY for real AI art'
      })
    }

    console.log('Calling Replicate API...')
    
    // Call Replicate API for image generation
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait'
      },
      body: JSON.stringify({
        version: '39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b', // SDXL
        input: { 
          prompt: `child's crayon drawing, simple colorful sketch: ${prompt}`,
          negative_prompt: 'realistic, photographic, detailed, professional, 3d',
          width: 512,
          height: 512,
          num_inference_steps: 25
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Replicate API error:', response.status, errorText)
      throw new Error(`Replicate returned ${response.status}`)
    }

    const data = await response.json()
    console.log('Replicate response:', data)
    
    // Return placeholder with note about async generation
    return NextResponse.json({ 
      imageUrl: `https://placehold.co/400x300/FFD700/663399?text=AI+Drawing+Started`,
      demo: true,
      message: 'Replicate generates images async - would show real art in production',
      predictionId: data.id,
      status: data.status
    })
    
  } catch (error) {
    console.error('Image gen error:', error)
    return NextResponse.json({ 
      imageUrl: `https://placehold.co/400x300/FFD700/663399?text=Mira's+Drawing`,
      demo: true,
      error: 'Using placeholder image'
    })
  }
}
