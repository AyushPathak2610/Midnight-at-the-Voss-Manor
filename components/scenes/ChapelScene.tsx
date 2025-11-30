'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSpeech } from '@/lib/tts/speechService'
import { useMusic } from '@/lib/audio/musicService'

interface ChapelSceneProps {
  onDebate?: (ghost: string, message: string) => void
}

export default function ChapelScene({ onDebate }: ChapelSceneProps) {
  const [stage, setStage] = useState<'intro' | 'reunion' | 'stories' | 'debate' | 'ritual' | 'ending'>('intro')
  const [storyPart, setStoryPart] = useState(1)
  const [debating, setDebating] = useState(false)
  const [ritualProgress, setRitualProgress] = useState(0)
  const [playerChoice, setPlayerChoice] = useState<'ascend' | 'stay' | null>(null)
  const { speak } = useSpeech()
  const { playSceneMusic } = useMusic()

  // Start scene music
  useEffect(() => {
    playSceneMusic('chapel')
  }, [])

  // Speak narration/dialogue when stage changes
  useEffect(() => {
    if (stage === 'intro') {
      speak("The Chapel. Stained glass windows depict the family in happier times. The Nexus Crystal glows golden on the altar.", 'narrator')
    } else if (stage === 'reunion') {
      speak("The five ghosts stand in a circle. The Nexus Crystal pulses with their combined energy.", 'narrator')
      // Speak each ghost's line with a delay
      setTimeout(() => speak("My family... together again.", 'elara'), 2000)
      setTimeout(() => speak("I remember everything now.", 'harlan'), 4000)
      setTimeout(() => speak("Mommy! Daddy! You can see me!", 'mira'), 6000)
      setTimeout(() => speak("Brother... I'm sorry I ran.", 'theo'), 8000)
      setTimeout(() => speak("Theo... I forgive you.", 'selene'), 10000)
    } else if (stage === 'ending') {
      speak("The light consumes everything. When it fades, the mansion stands peaceful in morning light. The five ghosts have found peace. Not through a single mind, but through five independent AI agents learning to work together.", 'narrator')
    }
  }, [stage, speak])

  const triggerFinalDebate = async () => {
    setDebating(true)
    setStage('debate')
    
    try {
      const response = await fetch('/api/ghost-debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          puzzleContext: 'Final decision - should the family ascend to peace or stay together in the mansion?',
          playerMessage: 'What should the family do?'
        })
      })
      const { debate, consensus } = await response.json()
      
      // Stream each ghost's opinion
      for (const msg of debate) {
        await new Promise(resolve => setTimeout(resolve, 2000))
        onDebate?.(msg.ghost, msg.message)
      }
      
      // Final consensus
      await new Promise(resolve => setTimeout(resolve, 2000))
      onDebate?.('Consensus', consensus)
      
      setTimeout(() => {
        setStage('ritual')
        setDebating(false)
      }, 3000)
    } catch (error) {
      console.error('Final debate failed:', error)
      setDebating(false)
    }
  }

  const handleRitualClick = (icon: string) => {
    if (ritualProgress < 5) {
      setRitualProgress(prev => prev + 1)
      if (ritualProgress + 1 >= 5) {
        setTimeout(() => setStage('ending'), 1000)
      }
    }
  }

  return (
    <div className="scene chapel-scene">
      <div className="background">
        <Image
          src={
            stage === 'ending' ? '/shots/finale_1.png' : 
            stage === 'ritual' ? '/shots/5b_1.png' : 
            stage === 'stories' ? '/shots/5_1_1.png' :
            stage === 'reunion' ? '/shots/5a_2.png' :
            '/shots/5a_1.png'
          }
          alt="Chapel"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {stage === 'intro' && (
        <div className="dialogue-box">
          <p className="narration">The Chapel. Stained glass windows depict the family in happier times. The Nexus Crystal glows golden on the altar.</p>
          <button onClick={() => setStage('reunion')}>Approach the Altar →</button>
        </div>
      )}

      {stage === 'reunion' && (
        <div className="dialogue-box reunion">
          <h2>The Family Reunites</h2>
          <div className="ghost-lineup">
            <div className="ghost-card elara">
              <h4>Elara</h4>
              <p>"My family... together again."</p>
            </div>
            <div className="ghost-card harlan">
              <h4>Harlan</h4>
              <p>"I remember everything now."</p>
            </div>
            <div className="ghost-card mira">
              <h4>Mira</h4>
              <p>"Mommy! Daddy! You can see me!"</p>
            </div>
            <div className="ghost-card theo">
              <h4>Theo</h4>
              <p>"Brother... I'm sorry I ran."</p>
            </div>
            <div className="ghost-card selene">
              <h4>Selene</h4>
              <p>"Theo... I forgive you."</p>
            </div>
          </div>
          <p className="narration">The five ghosts stand in a circle. The Nexus Crystal pulses with their combined energy.</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setStage('stories')}>Hear Theo & Selene's Stories</button>
            <button onClick={triggerFinalDebate}>Begin Final Debate</button>
          </div>
        </div>
      )}

      {stage === 'stories' && (
        <div className="dialogue-cloud-container">
          <div className="dialogue-cloud">
            <h2>Theo & Selene</h2>
            <div className="story-text">
              {storyPart === 1 && (
                <>
                  <h3 style={{ color: '#f87171' }}>Theo - The Coward</h3>
                  <p>Theo Voss. Brother to Harlan. Coward. Fool.</p>
                  <p>Selene and I were engaged in 2038. She was brilliant, beautiful, fierce. I was a theater actor - dramatic, passionate, utterly terrified of commitment.</p>
                  <p>Three weeks before our wedding, I panicked. The weight of "forever" crushed me. So I did the unforgivable: I left...</p>
                </>
              )}
              {storyPart === 2 && (
                <>
                  <h3 style={{ color: '#f87171' }}>Theo (continued)</h3>
                  <p>A year later, I returned. I'd rehearsed my apology a thousand times. Harlan offered a solution: "The Eternal Harmony project."</p>
                  <p>Desperate, I agreed. I'd come to make amends. Instead, I'd participated in our collective destruction.</p>
                  <p>I ran from commitment, and now I'm bound to this place forever. This is my penance.</p>
                </>
              )}
              {storyPart === 3 && (
                <>
                  <h3 style={{ color: '#a78bfa' }}>Selene - The Betrayed</h3>
                  <p>Selene Ashford. I was to be Selene Voss. Now I am simply... trapped.</p>
                  <p>I was a corporate lawyer. Sharp, successful, uncompromising. Love was the one illogical thing I allowed myself.</p>
                  <p>Theo Voss swept into my life like a hurricane. When he proposed, I said yes without hesitation...</p>
                </>
              )}
              {storyPart === 4 && (
                <>
                  <h3 style={{ color: '#a78bfa' }}>Selene (continued)</h3>
                  <p>Then, three weeks before our wedding, he vanished. A cowardly note about "needing time." I was humiliated. Heartbroken. Furious.</p>
                  <p>A year later, he returned. His brother offered a neural experiment to prove his sincerity. I agreed - not to forgive, but to understand...</p>
                </>
              )}
              {storyPart === 5 && (
                <>
                  <h3 style={{ color: '#a78bfa' }}>Selene (final)</h3>
                  <p>For one moment, I felt Theo's mind. His regret was genuine. His love was real. Then everything exploded. Pain. Darkness. Death.</p>
                  <p>The bitter irony: I'd spent a year building walls. Now I'm literally bound to the man who hurt me, for eternity.</p>
                  <p>But perhaps... perhaps forgiveness is the only way either of us will find peace.</p>
                </>
              )}
            </div>
            {storyPart < 5 ? (
              <button onClick={() => setStoryPart(prev => prev + 1)} className="continue-btn">...</button>
            ) : (
              <button onClick={triggerFinalDebate}>Begin Final Debate</button>
            )}
            <button onClick={triggerFinalDebate} className="skip-btn">Skip Story</button>
          </div>
        </div>
      )}

      {stage === 'debate' && (
        <div className="dialogue-box debate-box">
          <h2>🔮 The Ghost Council Deliberates</h2>
          <p className="narration">The five AI agents are debating in real-time...</p>
          <div className="debate-status">
            {debating ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>Agents discussing their fate...</p>
              </div>
            ) : (
              <p>Debate complete. Consensus reached.</p>
            )}
          </div>
          <p className="hint">Watch the Ghost Council Debate panel below to see their discussion!</p>
        </div>
      )}

      {stage === 'ritual' && (
        <div className="puzzle-container">
          <h2>The Vow Ritual</h2>
          <p>Click the symbols to complete the ritual ({ritualProgress}/5)</p>
          
          <div className="ritual-wheel">
            <div className="wheel-center">
              <div className="nexus-crystal" style={{ opacity: ritualProgress / 5 }}>
                💎
              </div>
            </div>
            
            <div className="ritual-symbols">
              <button onClick={() => handleRitualClick('ring')} className="symbol-btn">
                💍 Ring
              </button>
              <button onClick={() => handleRitualClick('heart')} className="symbol-btn">
                ❤️ Heart
              </button>
              <button onClick={() => handleRitualClick('hand')} className="symbol-btn">
                🤝 Hands
              </button>
              <button onClick={() => handleRitualClick('star')} className="symbol-btn">
                ⭐ Star
              </button>
              <button onClick={() => handleRitualClick('light')} className="symbol-btn">
                ✨ Light
              </button>
            </div>
          </div>
          
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(ritualProgress / 5) * 100}%` }}></div>
          </div>
        </div>
      )}

      {stage === 'ending' && (
        <div className="dialogue-box ending">
          <h2>✨ Bonds Woven ✨</h2>
          <p className="narration">
            The light consumes everything. When it fades, the mansion stands peaceful in morning light.
          </p>
          <p className="narration">
            The five ghosts - Elara, Harlan, Mira, Theo, and Selene - have found peace.
          </p>
          <p className="narration">
            Not through a single mind, but through five independent AI agents learning to work together.
          </p>
          <div className="credits">
            <h3>Built with Kiro's Frankenstein Features:</h3>
            <ul>
              <li>✅ 5 Independent Grok Agents (one per ghost)</li>
              <li>✅ Agent Hooks (debate triggers, memory storage)</li>
              <li>✅ MCP Extensions (blockchain vows, image gen, vector memory)</li>
              <li>✅ Spec-Driven Development</li>
              <li>✅ Steering Docs for consistent personalities</li>
              <li>✅ Real-time Inter-Agent Debates</li>
            </ul>
          </div>
          <button onClick={() => window.location.reload()}>Play Again</button>
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
          max-width: 550px;
          padding: 15px 18px 20px 18px;
          background: rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(251, 191, 36, 0.6);
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
          backdrop-filter: blur(12px);
          border: 3px solid rgba(251, 191, 36, 0.5);
          border-radius: 20px;
          color: #fff;
          box-shadow: 0 0 30px rgba(251, 191, 36, 0.3);
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
          border-left: 30px solid #fbbf24;
          border-top: 20px solid transparent;
          border-bottom: 20px solid transparent;
        }
        
        .dialogue-cloud h2, .dialogue-cloud h3 {
          margin: 0 0 15px 0;
          color: #fbbf24;
          font-size: 19px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        
        .dialogue-cloud p {
          margin: 10px 0;
          line-height: 1.7;
          font-size: 15px;
          letter-spacing: 0.3px;
        }
        
        .story-cloud {
          max-width: 550px;
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
          background: rgba(251, 191, 36, 0.2);
          border: 2px solid #fbbf24;
          color: #fbbf24;
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
        
        .reunion {
          max-width: 900px;
        }
        
        .ghost-lineup {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          margin: 20px 0;
        }
        
        .ghost-card {
          padding: 20px 15px;
          border: 2px solid;
          border-radius: 10px;
          text-align: center;
          font-size: 13px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          letter-spacing: 0.3px;
        }
        
        .ghost-card h4 {
          margin: 0 0 12px 0;
          font-size: 15px;
          font-weight: 600;
        }
        
        .ghost-card p {
          margin: 0;
          line-height: 1.6;
        }
        
        .ghost-card.elara { border-color: rgba(74, 144, 226, 0.6); background: rgba(74, 144, 226, 0.08); }
        .ghost-card.harlan { border-color: rgba(74, 222, 128, 0.6); background: rgba(74, 222, 128, 0.08); }
        .ghost-card.mira { border-color: rgba(232, 180, 240, 0.6); background: rgba(232, 180, 240, 0.08); }
        .ghost-card.theo { border-color: rgba(248, 113, 113, 0.6); background: rgba(248, 113, 113, 0.08); }
        .ghost-card.selene { border-color: rgba(167, 139, 250, 0.6); background: rgba(167, 139, 250, 0.08); }
        
        .debate-box {
          max-width: 600px;
        }
        
        .debate-status {
          margin: 20px 0;
          padding: 25px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
          backdrop-filter: blur(5px);
        }
        
        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-top-color: #fbbf24;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        .puzzle-container {
          position: absolute;
          inset: 20px;
          padding: 45px;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(251, 191, 36, 0.6);
          border-radius: 12px;
          z-index: 10;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .ritual-wheel {
          margin: 40px 0;
          position: relative;
        }
        
        .wheel-center {
          width: 150px;
          height: 150px;
          border: 3px solid #fbbf24;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 40px;
          background: rgba(251, 191, 36, 0.1);
        }
        
        .nexus-crystal {
          font-size: 60px;
          animation: glow 2s ease-in-out infinite;
        }
        
        .ritual-symbols {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .symbol-btn {
          padding: 20px 30px;
          font-size: 24px;
          background: rgba(251, 191, 36, 0.2);
          border: 2px solid #fbbf24;
          color: #fbbf24;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .symbol-btn:hover {
          background: rgba(251, 191, 36, 0.4);
          transform: scale(1.1);
        }
        
        .progress-bar {
          width: 100%;
          max-width: 500px;
          height: 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
          margin-top: 30px;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #fbbf24, #f59e0b);
          transition: width 0.5s ease;
        }
        
        .ending {
          max-width: 700px;
        }
        
        .credits {
          margin: 30px 0;
          padding: 20px;
          background: rgba(251, 191, 36, 0.1);
          border-radius: 8px;
        }
        
        .credits ul {
          list-style: none;
          padding: 0;
          margin: 15px 0 0 0;
        }
        
        .credits li {
          padding: 8px 0;
          font-size: 14px;
        }
        
        button {
          padding: 12px 24px;
          background: rgba(251, 191, 36, 0.15);
          backdrop-filter: blur(5px);
          border: 2px solid rgba(251, 191, 36, 0.6);
          border-radius: 8px;
          color: #fbbf24;
          cursor: pointer;
          font-size: 16px;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-weight: 500;
          letter-spacing: 0.5px;
          transition: all 0.3s;
        }
        
        button:hover:not(:disabled) {
          background: rgba(251, 191, 36, 0.3);
          border-color: rgba(251, 191, 36, 0.8);
          transform: scale(1.05);
        }
        
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 10px #fbbf24); }
          50% { filter: drop-shadow(0 0 30px #fbbf24); }
        }
      `}</style>
    </div>
  )
}
