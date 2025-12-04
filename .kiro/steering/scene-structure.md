---
inclusion: fileMatch
fileMatchPattern: "components/scenes/*.tsx"
---

# Scene Component Structure

All scene components must follow this pattern:

```typescript
'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { speechService } from '@/lib/tts/speechService'
import { useMusic } from '@/lib/audio/musicService'
import { soundEffects } from '@/lib/audio/soundEffects'

interface SceneProps {
  onComplete: () => void
}

export default function SceneName({ onComplete }: SceneProps) {
  const [stage, setStage] = useState<'intro' | 'puzzle' | 'complete'>('intro')
  const [showingHint, setShowingHint] = useState(false)
  const [currentHint, setCurrentHint] = useState('')
  const { playSceneMusic } = useMusic()

  // Start scene music
  useEffect(() => {
    playSceneMusic('act1_4') // or 'intro', 'act5', 'finale'
  }, [playSceneMusic])

  // Speak narration when stage changes
  useEffect(() => {
    if (stage === 'intro') {
      speechService.speak("Scene narration...", 'narrator')
    }
  }, [stage])

  const handleAskHint = async () => {
    setShowingHint(true)
    
    try {
      const response = await fetch('/api/character-hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          character: 'elara',
          puzzleContext: 'Description of current puzzle',
          characterBackground: 'Character background info',
          hintNumber: 1
        })
      })
      
      const { story, hint } = await response.json()
      
      setCurrentHint(story)
      speechService.speak(story, 'elara', true)
      
      setTimeout(() => {
        setCurrentHint(`${story}\n\n${hint}`)
        speechService.speak(hint, 'elara', true)
        
        setTimeout(() => {
          setShowingHint(false)
          setCurrentHint('')
        }, 15000)
      }, 6000)
      
    } catch (error) {
      console.error('Failed to get hint:', error)
    }
  }

  return (
    <div className="scene">
      <Image src="/shots/scene_X.png" alt="Scene" fill />
      {/* Scene content */}
      <button onClick={handleAskHint} disabled={showingHint}>
        {showingHint ? '💭 Ghost is speaking...' : '💭 Ask for Hint'}
      </button>
    </div>
  )
}
```

## Image Assets

Use Gemini-generated shots from `public/shots/` folder:
- Intro: intro_1.png through intro_4.png, int_start.png
- Foyer (Scene 1): 1a_1.png, 1a_2.png, 1a_3.png, 1b_1.png
- Study (Scene 2): 2a_1.png, 2a_2.png, 2a_3.png, 2b_1.png
- Nursery (Scene 3): 3a_1.png, 3a_2.png, 3a_3.png, 3b_1.png
- Hallway (Scene 4): 4a_1.png, 4a_2.png, 4a_3.png, 4b_2.png, 5_1_1.png
- Chapel (Scene 5): 5a_1.png, 5a_2.png, 5a_3.png, 5b_1.png, finale_1.png

All images generated with Google Gemini (Nano Banano Pro) using gothic-cyberpunk prompts.

## Music Assets

Background music from `public/audio/music/`:
- `intro.m4a` - Intro scene (dark atmospheric horror)
- `Act1_4.m4a` - Foyer, Study, Nursery, Hallway scenes (continuous emotional score)
- `act5.mp3` - Chapel scene (hopeful, transcendent)
- `finale.mp3` - Ending scene (peaceful resolution)

All music composed with Suno AI using thematic prompts.
