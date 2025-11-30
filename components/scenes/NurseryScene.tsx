'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSpeech } from '@/lib/tts/speechService'
import { useMusic } from '@/lib/audio/musicService'

interface NurserySceneProps {
  onComplete: () => void
  onDebate?: (ghost: string, message: string) => void
}

export default function NurseryScene({ onComplete, onDebate }: NurserySceneProps) {
  const [stage, setStage] = useState<'intro' | 'mira' | 'puzzle' | 'complete'>('intro')
  const [showingStory, setShowingStory] = useState(false)
  const [storyPart, setStoryPart] = useState(1)
  const [debating, setDebating] = useState(false)
  const [connectedBranches, setConnectedBranches] = useState<string[]>([])
  const { speak } = useSpeech()
  const { playSceneMusic } = useMusic()

  // Start scene music
  useEffect(() => {
    playSceneMusic('nursery')
  }, [])

  // Speak narration/dialogue when stage changes
  useEffect(() => {
    if (stage === 'intro') {
      speak("Toys float in zero gravity. Crayon drawings animate on the walls...", 'narrator')
    } else if (stage === 'mira') {
      speak("Hi! I'm Mira! Do you wanna play?", 'mira')
    } else if (stage === 'complete') {
      speak("Yay! The tree is pretty now! I remember everything! Thank you for playing with me!", 'mira')
    }
  }, [stage, speak])

  const handleAskHint = async () => {
    setDebating(true)
    try {
      const response = await fetch('/api/ghost-debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          puzzleContext: 'Love Harvest puzzle - connect memory bubbles to tree branches to make the family tree bloom',
          playerMessage: 'Which memories belong where?'
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

  const memories = [
    { id: 'lullaby', branch: 'bedtime', label: '🎵 Lullaby' },
    { id: 'story', branch: 'bedtime', label: '📖 Story Time' },
    { id: 'picnic', branch: 'play', label: '🧺 Picnic' },
    { id: 'toys', branch: 'play', label: '🧸 Toys' },
    { id: 'hug', branch: 'love', label: '🤗 Hugs' },
    { id: 'kiss', branch: 'love', label: '💋 Goodnight Kiss' },
  ]

  const handleConnect = (memoryId: string, branch: string) => {
    const memory = memories.find(m => m.id === memoryId)
    if (memory && memory.branch === branch && !connectedBranches.includes(memoryId)) {
      setConnectedBranches(prev => {
        const newConnected = [...prev, memoryId]
        if (newConnected.length >= memories.length) {
          setTimeout(() => setStage('complete'), 1000)
        }
        return newConnected
      })
    }
  }

  return (
    <div className="scene nursery-scene">
      <div className="background">
        <Image
          src={stage === 'puzzle' ? '/shots/3b_1.png' : stage === 'mira' ? '/shots/3a_2.png' : '/shots/3a_1.png'}
          alt="Nursery"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {stage === 'intro' && (
        <div className="dialogue-box">
          <p className="narration">Toys float in zero gravity. Crayon drawings animate on the walls...</p>
          <button onClick={() => setStage('mira')}>Look in the Crib →</button>
        </div>
      )}

      {stage === 'mira' && (
        <div className="dialogue-cloud-container">
          <div className="dialogue-cloud">
            <h3>Mira (Daughter)</h3>
            
            {!showingStory ? (
              <>
                <p>"Hi! I'm Mira! Do you wanna play? Mommy and Daddy are here but... they can't see me anymore."</p>
                <p>"Wanna hear my story?"</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <button onClick={() => setShowingStory(true)}>Hear Her Story</button>
                  <button onClick={() => setStage('puzzle')}>Help Mira Remember</button>
                </div>
              </>
            ) : (
              <>
                <div className="story-text">
                  {storyPart === 1 && (
                    <>
                      <p>Hi! I'm Mira! I'm seven years old! Well... I was seven. I don't really understand what happened.</p>
                      <p>I remember the good times though! Mommy used to read me stories every night. My favorite was about a princess who could talk to animals.</p>
                      <p>Daddy was always busy in his study. But sometimes, on Sundays, he would take me to the garden. We'd look for butterflies...</p>
                    </>
                  )}
                  {storyPart === 2 && (
                    <>
                      <p>Uncle Theo was funny! He'd visit and do magic tricks. He could make coins disappear and pull flowers from behind my ear.</p>
                      <p>Aunt Selene was pretty but scary. But once, she braided my hair and told me I looked like a princess.</p>
                      <p>The night everything changed, Daddy said we were going to play a special game. We all wore shiny crowns with wires...</p>
                    </>
                  )}
                  {storyPart === 3 && (
                    <>
                      <p>Then I woke up here. In my nursery. But I was see-through, like a jellyfish!</p>
                      <p>I don't really understand death. All I know is we can't leave the mansion. We can't hug anymore - our hands go through each other. And I miss being alive.</p>
                      <p>But you're here now! You're helping us remember the happy times. Thank you for playing with me!</p>
                    </>
                  )}
                </div>
                {storyPart < 3 ? (
                  <button onClick={() => setStoryPart(prev => prev + 1)} className="continue-btn">...</button>
                ) : (
                  <button onClick={() => setStage('puzzle')}>Help Mira Remember</button>
                )}
                <button onClick={() => setStage('puzzle')} className="skip-btn">Skip Story</button>
              </>
            )}
          </div>
        </div>
      )}

      {stage === 'puzzle' && (
        <div className="puzzle-container">
          <h2>Love Harvest - Family Tree</h2>
          <p>Connect memories to the right branches ({connectedBranches.length}/{memories.length})</p>
          
          <div className="tree-container">
            <div className="tree-branches">
              <div className="branch">
                <h4>🌙 Bedtime</h4>
                <div className="branch-slots">
                  {memories.filter(m => m.branch === 'bedtime').map(m => (
                    <div key={m.id} className={`slot ${connectedBranches.includes(m.id) ? 'filled' : ''}`}>
                      {connectedBranches.includes(m.id) ? '🌸' : '○'}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="branch">
                <h4>🎈 Play</h4>
                <div className="branch-slots">
                  {memories.filter(m => m.branch === 'play').map(m => (
                    <div key={m.id} className={`slot ${connectedBranches.includes(m.id) ? 'filled' : ''}`}>
                      {connectedBranches.includes(m.id) ? '🌸' : '○'}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="branch">
                <h4>💕 Love</h4>
                <div className="branch-slots">
                  {memories.filter(m => m.branch === 'love').map(m => (
                    <div key={m.id} className={`slot ${connectedBranches.includes(m.id) ? 'filled' : ''}`}>
                      {connectedBranches.includes(m.id) ? '🌸' : '○'}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="memory-bubbles">
              {memories.filter(m => !connectedBranches.includes(m.id)).map(memory => (
                <div key={memory.id} className="bubble">
                  <div className="bubble-label">{memory.label}</div>
                  <div className="bubble-actions">
                    <button onClick={() => handleConnect(memory.id, 'bedtime')}>🌙</button>
                    <button onClick={() => handleConnect(memory.id, 'play')}>🎈</button>
                    <button onClick={() => handleConnect(memory.id, 'love')}>💕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={handleAskHint} disabled={debating} className="hint-button">
            {debating ? '🔮 Debating...' : '🔮 Ask Council'}
          </button>
        </div>
      )}

      {stage === 'complete' && (
        <div className="dialogue-box success">
          <h3 style={{ marginBottom: '20px' }}>✨ Tree in Full Bloom!</h3>
          <p className="ghost-mira">"Yay! The tree is pretty now! I remember everything! Thank you for playing with me!"</p>
          <button onClick={onComplete}>Continue to Chapel →</button>
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
          border: 2px solid rgba(232, 180, 240, 0.6);
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
          border: 2px solid rgba(232, 180, 240, 0.6);
          border-radius: 20px;
          color: #fff;
          box-shadow: 0 0 30px rgba(232, 180, 240, 0.3);
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
        }
        
        .dialogue-cloud::after {
          content: '';
          position: absolute;
          right: -30px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 30px solid #e8b4f0;
          border-top: 20px solid transparent;
          border-bottom: 20px solid transparent;
        }
        
        .dialogue-cloud h3 {
          margin: 0 0 15px 0;
          color: #e8b4f0;
          font-size: 19px;
          font-weight: 600;
        }
        
        .dialogue-cloud p {
          margin: 10px 0;
          line-height: 1.7;
          font-size: 15px;
        }
        
        .story-cloud {
          max-width: 380px;
        }
        
        .story-text {
          margin: 8px 0;
          min-height: 180px;
        }
        
        .continue-btn {
          width: 100%;
          margin-top: 35px;
          padding: 10px;
          font-size: 24px;
          background: rgba(232, 180, 240, 0.15);
          border: 2px solid rgba(232, 180, 240, 0.6);
          color: #e8b4f0;
          font-family: 'Georgia', serif;
        }
        
        .skip-btn {
          width: 100%;
          margin-top: 10px;
          padding: 8px;
          font-size: 14px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid #666;
          color: #999;
        }
        
        .puzzle-container {
          position: absolute;
          inset: 20px;
          padding: 20px;
          background: rgba(0, 0, 0, 0.9);
          border: 2px solid #e8b4f0;
          border-radius: 8px;
          z-index: 10;
          color: #fff;
          overflow-y: auto;
        }
        
        .tree-container {
          display: flex;
          gap: 40px;
          margin: 20px 0;
        }
        
        .tree-branches {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .branch {
          padding: 15px;
          background: rgba(232, 180, 240, 0.1);
          border: 2px solid #e8b4f0;
          border-radius: 8px;
        }
        
        .branch-slots {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }
        
        .slot {
          width: 40px;
          height: 40px;
          border: 2px solid #666;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        
        .slot.filled {
          border-color: #e8b4f0;
          background: rgba(232, 180, 240, 0.3);
        }
        
        .memory-bubbles {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .bubble {
          padding: 15px;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid #e8b4f0;
          border-radius: 20px;
        }
        
        .bubble-label {
          margin-bottom: 10px;
          font-size: 18px;
        }
        
        .bubble-actions {
          display: flex;
          gap: 10px;
        }
        
        .bubble-actions button {
          padding: 8px 16px;
          font-size: 20px;
        }
        
        button {
          padding: 12px 24px;
          background: rgba(232, 180, 240, 0.15);
          backdrop-filter: blur(5px);
          border: 2px solid rgba(232, 180, 240, 0.6);
          border-radius: 8px;
          color: #e8b4f0;
          cursor: pointer;
          font-size: 16px;
          font-family: 'Georgia', 'Times New Roman', serif;
          transition: all 0.3s;
        }
        
        button:hover:not(:disabled) {
          background: rgba(232, 180, 240, 0.5);
          transform: scale(1.05);
        }
        
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .hint-button {
          margin-top: 20px;
          padding: 16px 32px;
        }
      `}</style>
    </div>
  )
}
