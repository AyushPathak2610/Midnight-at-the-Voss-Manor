'use client'

import { useState } from 'react'
import IntroScene from '@/components/scenes/IntroScene'
import FoyerScene from '@/components/scenes/FoyerScene'
import StudyScene from '@/components/scenes/StudyScene'
import NurseryScene from '@/components/scenes/NurseryScene'
import ChapelScene from '@/components/scenes/ChapelScene'
import GhostDebatePanel from '@/components/GhostDebatePanel'
import TTSToggle from '@/components/TTSToggle'

export default function Home() {
  const [currentScene, setCurrentScene] = useState<'intro' | 'foyer' | 'study' | 'nursery' | 'chapel'>('intro')
  const [debateMessages, setDebateMessages] = useState<Array<{ghost: string, message: string}>>([])

  const addDebateMessage = (ghost: string, message: string) => {
    setDebateMessages(prev => [...prev, { ghost, message }])
  }

  return (
    <div className="game-container">
      <TTSToggle />
      
      {currentScene === 'intro' && <IntroScene onComplete={() => setCurrentScene('foyer')} />}
      {currentScene === 'foyer' && (
        <FoyerScene 
          onComplete={() => setCurrentScene('study')} 
          onDebate={addDebateMessage}
        />
      )}
      {currentScene === 'study' && (
        <StudyScene 
          onComplete={() => setCurrentScene('nursery')} 
          onDebate={addDebateMessage}
        />
      )}
      {currentScene === 'nursery' && (
        <NurseryScene 
          onComplete={() => setCurrentScene('chapel')} 
          onDebate={addDebateMessage}
        />
      )}
      {currentScene === 'chapel' && (
        <ChapelScene 
          onDebate={addDebateMessage}
        />
      )}
      
      <GhostDebatePanel messages={debateMessages} />
    </div>
  )
}
