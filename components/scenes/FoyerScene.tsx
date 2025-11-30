'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSpeech } from '@/lib/tts/speechService'
import { useMusic } from '@/lib/audio/musicService'

interface FoyerSceneProps {
  onComplete: () => void
  onDebate?: (ghost: string, message: string) => void
}

export default function FoyerScene({ onComplete, onDebate }: FoyerSceneProps) {
  const [stage, setStage] = useState<'intro' | 'elara' | 'puzzle' | 'complete'>('intro')
  const [showingStory, setShowingStory] = useState(false)
  const [storyPart, setStoryPart] = useState(1)
  const [debating, setDebating] = useState(false)
  const [puzzleProgress, setPuzzleProgress] = useState(0)
  const [selectedPhotos, setSelectedPhotos] = useState<Record<string, string>>({})
  const { speak } = useSpeech()
  const { playSceneMusic } = useMusic()

  // Start scene music
  useEffect(() => {
    playSceneMusic('foyer')
  }, [])

  // Speak narration/dialogue when stage changes
  useEffect(() => {
    if (stage === 'intro') {
      speak("You enter the foyer. Dust hangs in moonbeams. A lantern ignites on its own...", 'narrator')
    } else if (stage === 'elara') {
      speak("Welcome, traveler. I am Elara... once mother to this family.", 'elara')
    } else if (stage === 'complete') {
      speak("The tapestry weaves itself... memories restored. Thank you.", 'elara')
    }
  }, [stage, speak])

  const handleAskHint = async () => {
    setDebating(true)
    try {
      const response = await fetch('/api/ghost-debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          puzzleContext: 'Tapestry puzzle - player must match family photos to memory categories (Sun=happy times, Ring=promises, Crystal=connections)',
          playerMessage: 'I need help understanding this puzzle'
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

  const photos = [
    { id: 'picnic', category: 'sun', label: 'Family Picnic' },
    { id: 'wedding', category: 'ring', label: 'Wedding Day' },
    { id: 'lab', category: 'crystal', label: 'Lab Work' },
    { id: 'birthday', category: 'sun', label: 'Birthday Party' },
    { id: 'promise', category: 'ring', label: 'Promise Made' },
  ]

  const handlePhotoSelect = (photoId: string, category: string) => {
    const photo = photos.find(p => p.id === photoId)
    if (photo && photo.category === category) {
      setSelectedPhotos(prev => ({ ...prev, [photoId]: category }))
      setPuzzleProgress(prev => prev + 1)
      
      if (Object.keys(selectedPhotos).length + 1 >= 5) {
        setTimeout(() => setStage('complete'), 1000)
      }
    }
  }

  return (
    <div className="scene foyer-scene">
      <div className="background">
        <Image
          src={stage === 'puzzle' ? '/shots/1b_1.png' : stage === 'elara' ? '/shots/1a_2.png' : '/shots/1a_1.png'}
          alt="Foyer"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {stage === 'intro' && (
        <div className="dialogue-box">
          <p className="narration">You enter the foyer. Dust hangs in moonbeams. A lantern ignites on its own...</p>
          <button onClick={() => setStage('elara')}>Continue →</button>
        </div>
      )}

      {stage === 'elara' && (
        <div className="dialogue-cloud-container">
          <div className="dialogue-cloud">
            <h3>Elara (Mother)</h3>
            
            {!showingStory ? (
              <>
                <p>"Welcome, traveler. I am Elara... once mother to this family. We are trapped here, our bonds fractured by tragedy."</p>
                <p>"Would you like to hear my story?"</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <button onClick={() => setShowingStory(true)}>Hear Her Story</button>
                  <button onClick={() => setStage('puzzle')}>Begin Puzzle</button>
                </div>
              </>
            ) : (
              <>
                <div className="story-text">
                  {storyPart === 1 && (
                    <>
                      <p>I was Elara Voss, wife to Harlan and mother to our precious Mira.</p>
                      <p>In 2039, our family lived in this mansion - a place of warmth, laughter, and love. I spent my days tending to Mira, reading her stories, singing lullabies. Harlan worked tirelessly in his study, driven by a beautiful dream.</p>
                      <p>He called it "Eternal Harmony" - a neural link that would connect our family's consciousness forever...</p>
                    </>
                  )}
                  {storyPart === 2 && (
                    <>
                      <p>No more loneliness, no more misunderstandings. Just pure, unfiltered love and connection.</p>
                      <p>The night of the experiment, we all gathered in the study. We wore the neural crowns, held hands, and activated the link. For one perfect moment, I felt everything.</p>
                      <p>Then the overload hit. Pain. Confusion. Darkness...</p>
                    </>
                  )}
                  {storyPart === 3 && (
                    <>
                      <p>When I opened my eyes, I was translucent. Glowing. We were ghosts, trapped between worlds.</p>
                      <p>The neural link didn't connect us - it killed us. And now we're bound to this mansion, our bonds fractured, our memories scattered.</p>
                      <p>I remain here, trying to hold our family together. Even in death, a mother's love endures.</p>
                    </>
                  )}
                </div>
                {storyPart < 3 ? (
                  <button onClick={() => setStoryPart(prev => prev + 1)} className="continue-btn">...</button>
                ) : (
                  <button onClick={() => setStage('puzzle')}>Begin Puzzle</button>
                )}
                <button onClick={() => setStage('puzzle')} className="skip-btn">Skip Story</button>
              </>
            )}
          </div>
        </div>
      )}

      {stage === 'puzzle' && (
        <div className="puzzle-container">
          <h2>Harlan's Threads - Memory Tapestry</h2>
          <p>Match each photo to its memory type</p>
          
          <div className="puzzle-grid">
            {photos.map(photo => (
              <div 
                key={photo.id} 
                className={`photo-card ${selectedPhotos[photo.id] ? 'matched' : ''}`}
              >
                <div className="photo-placeholder">{photo.label}</div>
                {!selectedPhotos[photo.id] && (
                  <div className="category-buttons">
                    <button onClick={() => handlePhotoSelect(photo.id, 'sun')}>☀️ Sun</button>
                    <button onClick={() => handlePhotoSelect(photo.id, 'ring')}>💍 Ring</button>
                    <button onClick={() => handlePhotoSelect(photo.id, 'crystal')}>💎 Crystal</button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="puzzle-controls">
            <button onClick={handleAskHint} disabled={debating}>
              {debating ? '🔮 Ghosts Debating...' : '🔮 Ask Ghost Council'}
            </button>
            <div className="progress">Progress: {puzzleProgress}/5</div>
          </div>
        </div>
      )}

      {stage === 'complete' && (
        <div className="dialogue-box success">
          <h3 style={{ marginBottom: '20px' }}>✨ Puzzle Complete!</h3>
          <p className="ghost-elara">"The tapestry weaves itself... memories restored. Thank you."</p>
          <button onClick={onComplete}>Enter the Study →</button>
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
          border: 2px solid rgba(74, 144, 226, 0.6);
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
          border: 2px solid rgba(74, 144, 226, 0.6);
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
          border-left: 25px solid rgba(74, 144, 226, 0.6);
          border-top: 18px solid transparent;
          border-bottom: 18px solid transparent;
        }
        
        .dialogue-cloud h3 {
          margin: 0 0 15px 0;
          color: #4a90e2;
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
          background: rgba(74, 144, 226, 0.15);
          border: 2px solid rgba(74, 144, 226, 0.6);
          color: #4a90e2;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Georgia', serif;
        }
        
        .continue-btn:hover {
          background: rgba(74, 144, 226, 0.25);
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
        
        .ghost-portrait {
          float: left;
          margin-right: 20px;
          border: 2px solid #4a90e2;
          border-radius: 50%;
          overflow: hidden;
        }
        
        .puzzle-container {
          position: absolute;
          inset: 20px;
          padding: 20px;
          background: rgba(0, 0, 0, 0.85);
          border: 2px solid #4a90e2;
          border-radius: 8px;
          z-index: 10;
          overflow-y: auto;
          color: #fff;
        }
        
        .puzzle-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }
        
        .photo-card {
          padding: 20px;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid #666;
          border-radius: 8px;
          text-align: center;
        }
        
        .photo-card.matched {
          border-color: #4a90e2;
          background: rgba(74, 144, 226, 0.2);
        }
        
        .photo-placeholder {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          font-size: 14px;
        }
        
        .category-buttons {
          display: flex;
          gap: 5px;
          justify-content: center;
        }
        
        .category-buttons button {
          padding: 5px 10px;
          font-size: 12px;
        }
        
        .puzzle-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
        }
        
        button {
          padding: 12px 24px;
          background: rgba(74, 144, 226, 0.15);
          backdrop-filter: blur(5px);
          border: 2px solid rgba(74, 144, 226, 0.6);
          border-radius: 8px;
          color: #4a90e2;
          cursor: pointer;
          font-size: 16px;
          font-family: 'Georgia', 'Times New Roman', serif;
          transition: all 0.3s;
        }
        
        button:hover:not(:disabled) {
          background: rgba(74, 144, 226, 0.5);
          transform: scale(1.05);
        }
        
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .success {
          border-color: #4ade80;
        }
      `}</style>
    </div>
  )
}
