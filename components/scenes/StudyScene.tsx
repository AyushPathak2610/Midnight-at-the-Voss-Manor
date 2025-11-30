'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSpeech } from '@/lib/tts/speechService'
import { useMusic } from '@/lib/audio/musicService'

interface StudySceneProps {
  onComplete: () => void
  onDebate?: (ghost: string, message: string) => void
}

export default function StudyScene({ onComplete, onDebate }: StudySceneProps) {
  const [stage, setStage] = useState<'intro' | 'harlan' | 'puzzle' | 'complete'>('intro')
  const [showingStory, setShowingStory] = useState(false)
  const [storyPart, setStoryPart] = useState(1)
  const [debating, setDebating] = useState(false)
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 })
  const [collectedOrbs, setCollectedOrbs] = useState(0)
  const totalOrbs = 8
  const { speak } = useSpeech()
  const { playSceneMusic } = useMusic()

  // Start scene music
  useEffect(() => {
    playSceneMusic('study')
  }, [])

  // Speak narration/dialogue when stage changes
  useEffect(() => {
    if (stage === 'intro') {
      speak("Books orbit a pulsing crystal. The room itself seems to twist...", 'narrator')
    } else if (stage === 'harlan') {
      speak("I... I remember fragments. The Eternal Harmony project. I wanted to connect us all... forever.", 'harlan')
    } else if (stage === 'complete') {
      speak("I... I remember now. The family. The love. The experiment... it was meant to preserve that.", 'harlan')
    }
  }, [stage, speak])

  const handleAskHint = async () => {
    setDebating(true)
    try {
      const response = await fetch('/api/ghost-debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          puzzleContext: 'Neural maze puzzle - navigate through Harlan\'s fragmented memories, collect memory orbs while avoiding glitch voids',
          playerMessage: 'How do I navigate this maze?'
        })
      })
      const { debate, consensus } = await response.json()
      
      debate.forEach((msg: any) => {
        onDebate?.(msg.ghost, msg.message)
      })
      
      setTimeout(() => {
        onDebate?.('Consensus', consensus)
      }, 1000)
    } catch (error) {
      console.error('Debate failed:', error)
    }
    setDebating(false)
  }

  const handleMove = (direction: string) => {
    setPlayerPos(prev => {
      const newPos = { ...prev }
      switch(direction) {
        case 'up': newPos.y = Math.max(0, prev.y - 1); break
        case 'down': newPos.y = Math.min(4, prev.y + 1); break
        case 'left': newPos.x = Math.max(0, prev.x - 1); break
        case 'right': newPos.x = Math.min(4, prev.x + 1); break
      }
      
      // Check if collected orb
      const orbKey = `${newPos.x},${newPos.y}`
      if (['1,0', '3,1', '0,2', '4,2', '2,3', '1,4', '3,4', '4,4'].includes(orbKey)) {
        setCollectedOrbs(prev => {
          const newCount = prev + 1
          if (newCount >= totalOrbs) {
            setTimeout(() => setStage('complete'), 500)
          }
          return newCount
        })
      }
      
      return newPos
    })
  }

  return (
    <div className="scene study-scene">
      <div className="background">
        <Image
          src={stage === 'puzzle' ? '/shots/2b_1.png' : stage === 'harlan' ? '/shots/2a_2.png' : '/shots/2a_1.png'}
          alt="Study"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {stage === 'intro' && (
        <div className="dialogue-box">
          <p className="narration">Books orbit a pulsing crystal. The room itself seems to twist...</p>
          <button onClick={() => setStage('harlan')}>Approach the Crystal →</button>
        </div>
      )}

      {stage === 'harlan' && (
        <div className="dialogue-cloud-container">
          <div className="dialogue-cloud">
            <h3>Dr. Harlan Voss (Father/Scientist)</h3>
            
            {!showingStory ? (
              <>
                <p>"I... I remember fragments. The Eternal Harmony project. I wanted to connect us all... forever."</p>
                <p>"Would you like to hear what I remember?"</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <button onClick={() => setShowingStory(true)}>Hear His Story</button>
                  <button onClick={() => setStage('puzzle')}>Enter Neural Maze</button>
                </div>
              </>
            ) : (
              <>
                <div className="story-text">
                  {storyPart === 1 && (
                    <>
                      <p>Dr. Harlan Voss. That's who I was. Neuroscientist. Inventor. Fool.</p>
                      <p>I was brilliant. Everyone said so. My research into neural interfaces was groundbreaking. But brilliance without wisdom is dangerous.</p>
                      <p>I loved my family desperately. Elara, my patient wife. Mira, our daughter who looked at me like I hung the stars...</p>
                    </>
                  )}
                  {storyPart === 2 && (
                    <>
                      <p>But I was always in my study, always working, always distant.</p>
                      <p>I thought: what if we could share thoughts? Share feelings? Be truly, perfectly connected? Eternal Harmony. My magnum opus.</p>
                      <p>I convinced my family to join me. "Just one session," I said. "We'll be closer than ever..."</p>
                    </>
                  )}
                  {storyPart === 3 && (
                    <>
                      <p>I didn't account for the feedback loop. Five minds, all connected, all amplifying each other's neural patterns. The system overloaded in seconds.</p>
                      <p>Now I know. I killed my family. My beautiful wife. My innocent daughter. My brother and his fiancée.</p>
                      <p>I am the architect of our tragedy. And I deserve this eternal prison.</p>
                    </>
                  )}
                </div>
                {storyPart < 3 ? (
                  <button onClick={() => setStoryPart(prev => prev + 1)} className="continue-btn">...</button>
                ) : (
                  <button onClick={() => setStage('puzzle')}>Enter Neural Maze</button>
                )}
                <button onClick={() => setStage('puzzle')} className="skip-btn">Skip Story</button>
              </>
            )}
          </div>
        </div>
      )}

      {stage === 'puzzle' && (
        <div className="puzzle-container">
          <h2>Neural Maze - Harlan's Memories</h2>
          <p>Collect all memory orbs ({collectedOrbs}/{totalOrbs})</p>
          
          <div className="maze-grid">
            {Array.from({ length: 5 }).map((_, y) => (
              <div key={y} className="maze-row">
                {Array.from({ length: 5 }).map((_, x) => {
                  const isPlayer = playerPos.x === x && playerPos.y === y
                  const orbKey = `${x},${y}`
                  const hasOrb = ['1,0', '3,1', '0,2', '4,2', '2,3', '1,4', '3,4', '4,4'].includes(orbKey)
                  const isGlitch = ['2,1', '1,2', '3,3'].includes(orbKey)
                  
                  return (
                    <div 
                      key={x} 
                      className={`maze-cell ${isPlayer ? 'player' : ''} ${hasOrb ? 'orb' : ''} ${isGlitch ? 'glitch' : ''}`}
                    >
                      {isPlayer && '⚡'}
                      {hasOrb && !isPlayer && '💛'}
                      {isGlitch && '❌'}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          <div className="controls">
            <div className="dpad">
              <button onClick={() => handleMove('up')}>↑</button>
              <div className="dpad-middle">
                <button onClick={() => handleMove('left')}>←</button>
                <button onClick={() => handleMove('right')}>→</button>
              </div>
              <button onClick={() => handleMove('down')}>↓</button>
            </div>
            
            <button onClick={handleAskHint} disabled={debating} className="hint-button">
              {debating ? '🔮 Debating...' : '🔮 Ask Council'}
            </button>
          </div>
        </div>
      )}

      {stage === 'complete' && (
        <div className="dialogue-box success">
          <h3 style={{ marginBottom: '20px' }}>✨ Memories Restored!</h3>
          <p className="ghost-harlan">"I... I remember now. The family. The love. The experiment... it was meant to preserve that."</p>
          <button onClick={onComplete}>Continue to Nursery →</button>
        </div>
      )}

      <style jsx>{`
        .scene {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }
        
        .background {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        
        .dialogue-box {
          position: absolute;
          bottom: 50px;
          left: 50%;
          transform: translateX(-50%);
          max-width: 500px;
          padding: 15px 18px 20px 18px;
          background: rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(74, 222, 128, 0.6);
          border-radius: 12px;
          z-index: 10;
          color: #fff;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
        }
        
        .dialogue-box button {
          margin-top: 20px;
        }
        
        .dialogue-cloud-container {
          position: absolute;
          left: 50px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
        }
        
        .dialogue-cloud {
          position: relative;
          max-width: 340px;
          padding: 15px 18px;
          background: rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(74, 222, 128, 0.6);
          border-radius: 20px;
          color: #fff;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
        }
        
        .dialogue-cloud::after {
          content: '';
          position: absolute;
          right: -25px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 25px solid rgba(74, 222, 128, 0.6);
          border-top: 18px solid transparent;
          border-bottom: 18px solid transparent;
        }
        
        .dialogue-cloud h3 {
          margin: 0 0 15px 0;
          color: #4ade80;
          font-size: 19px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        
        .dialogue-cloud p {
          margin: 0 0 12px 0;
          line-height: 1.7;
          font-size: 15px;
          color: #e8e8e8;
        }
        
        .story-text {
          margin: 8px 0;
          min-height: 180px;
        }
        
        .story-text p:last-child {
          margin-bottom: 0;
        }
        
        .continue-btn {
          width: 100%;
          margin-top: 35px;
          padding: 10px;
          font-size: 24px;
          background: rgba(74, 222, 128, 0.15);
          border: 2px solid rgba(74, 222, 128, 0.6);
          color: #4ade80;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Georgia', serif;
        }
        
        .continue-btn:hover {
          background: rgba(74, 222, 128, 0.25);
          transform: scale(1.02);
        }
        
        .skip-btn {
          width: 100%;
          margin-top: 12px;
          padding: 10px;
          font-size: 14px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #aaa;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Georgia', serif;
        }
        
        .skip-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ddd;
        }
        
        .puzzle-container {
          position: absolute;
          inset: 20px;
          padding: 20px;
          background: rgba(0, 0, 0, 0.9);
          border: 2px solid #4ade80;
          border-radius: 8px;
          z-index: 10;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .maze-grid {
          margin: 20px 0;
          border: 2px solid #4ade80;
        }
        
        .maze-row {
          display: flex;
        }
        
        .maze-cell {
          width: 60px;
          height: 60px;
          border: 1px solid #333;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          background: rgba(0, 0, 0, 0.5);
        }
        
        .maze-cell.player {
          background: rgba(74, 144, 226, 0.5);
          animation: pulse 1s infinite;
        }
        
        .maze-cell.orb {
          background: rgba(255, 215, 0, 0.2);
        }
        
        .maze-cell.glitch {
          background: rgba(255, 0, 0, 0.3);
        }
        
        .controls {
          display: flex;
          gap: 40px;
          align-items: center;
          margin-top: 20px;
        }
        
        .dpad {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .dpad-middle {
          display: flex;
          gap: 5px;
          justify-content: center;
        }
        
        button {
          padding: 12px 24px;
          background: rgba(74, 222, 128, 0.15);
          backdrop-filter: blur(5px);
          border: 2px solid rgba(74, 222, 128, 0.6);
          border-radius: 8px;
          color: #4ade80;
          cursor: pointer;
          font-size: 16px;
          font-family: 'Georgia', 'Times New Roman', serif;
          transition: all 0.3s;
        }
        
        button:hover:not(:disabled) {
          background: rgba(74, 222, 128, 0.5);
          transform: scale(1.05);
        }
        
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .hint-button {
          padding: 16px 32px;
        }
        
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 10px rgba(74, 144, 226, 0.5); }
          50% { box-shadow: 0 0 20px rgba(74, 144, 226, 1); }
        }
      `}</style>
    </div>
  )
}
