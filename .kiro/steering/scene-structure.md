---
inclusion: fileMatch
fileMatchPattern: "components/scenes/*.tsx"
---

# Scene Component Structure

All scene components must follow this pattern:

```typescript
'use client'
import { useState } from 'react'
import Image from 'next/image'

interface SceneProps {
  onComplete: () => void
  onDebate?: (ghost: string, message: string) => void
}

export default function SceneName({ onComplete, onDebate }: SceneProps) {
  const [showPuzzle, setShowPuzzle] = useState(false)
  const [debating, setDebating] = useState(false)

  const handleAskHint = async () => {
    setDebating(true)
    const response = await fetch('/api/ghost-debate', {
      method: 'POST',
      body: JSON.stringify({
        puzzleContext: 'Description of current puzzle',
        playerMessage: 'I need help'
      })
    })
    const { debate, consensus } = await response.json()
    
    // Stream debate messages
    debate.forEach((msg: any) => {
      onDebate?.(msg.ghost, msg.message)
    })
    
    setDebating(false)
  }

  return (
    <div className="scene">
      <Image src="/shots/scene_X.png" alt="Scene" fill />
      {/* Scene content */}
      <button onClick={handleAskHint}>Ask for Hint</button>
    </div>
  )
}
```

## Image Assets

Use pre-generated shots from `/shots/` folder:
- Intro: intro_1.png through intro_4.png
- Foyer (Scene 1): 1a_1.png through 1b_1.png
- Study (Scene 2): 2a_1.png through 2b_1.png
- Nursery (Scene 3): 3a_1.png through 3b_1.png
- Chapel (Scene 5): 5a_1.png through finale_1.png
