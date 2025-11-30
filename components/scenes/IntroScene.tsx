'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSpeech } from '@/lib/tts/speechService'
import { useMusic } from '@/lib/audio/musicService'

interface IntroSceneProps {
  onComplete: () => void
}

export default function IntroScene({ onComplete }: IntroSceneProps) {
  const [currentShot, setCurrentShot] = useState(1)
  const totalShots = 4
  const { speak } = useSpeech()
  const { playSceneMusic } = useMusic()

  const narrations = [
    "Lost in the storm...",
    "Something watches from the shadows...",
    "A mansion looms ahead...",
    "The gate opens... there's no turning back."
  ]

  useEffect(() => {
    // Start intro music
    playSceneMusic('intro')
  }, [])

  useEffect(() => {
    // Speak the narration for current shot
    if (currentShot <= totalShots) {
      speak(narrations[currentShot - 1], 'narrator')
    }
  }, [currentShot])

  useEffect(() => {
    if (currentShot <= totalShots) {
      const timer = setTimeout(() => {
        setCurrentShot(prev => prev + 1)
      }, 3000)
      return () => clearTimeout(timer)
    } else {
      setTimeout(onComplete, 1000)
    }
  }, [currentShot, onComplete])

  return (
    <div className="scene intro-scene">
      <div className="shot-container">
        {currentShot <= totalShots && (
          <Image
            src={`/shots/intro_${currentShot}.png`}
            alt={`Intro shot ${currentShot}`}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        )}
      </div>
      
      <div className="intro-overlay">
        <h1 className="title">SHADOWED HAVEN</h1>
        <p className="narration">{narrations[currentShot - 1]}</p>
      </div>

      <button className="skip-button" onClick={onComplete}>
        Skip Intro →
      </button>

      <style jsx>{`
        .scene {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #0a0a1a;
        }
        
        .shot-container {
          position: absolute;
          inset: 0;
          animation: fadeIn 1s ease-in;
        }
        
        .intro-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);
          z-index: 5;
        }
        
        .title {
          font-size: 64px;
          color: #4a90e2;
          text-shadow: 0 0 20px rgba(74, 144, 226, 0.8);
          margin-bottom: 40px;
          letter-spacing: 4px;
        }
        
        .narration {
          font-size: 28px;
          color: #e8b4f0;
          text-shadow: 0 0 10px rgba(232, 180, 240, 0.6);
          animation: glow 2s ease-in-out infinite;
          max-width: 800px;
          text-align: center;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
        }
        
        .skip-button {
          position: absolute;
          top: 20px;
          right: 20px;
          padding: 12px 24px;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(5px);
          border: 2px solid rgba(74, 144, 226, 0.6);
          border-radius: 8px;
          color: #4a90e2;
          cursor: pointer;
          z-index: 10;
          font-size: 16px;
          font-family: 'Georgia', 'Times New Roman', serif;
          transition: all 0.3s;
        }
        
        .skip-button:hover {
          background: rgba(74, 144, 226, 0.3);
          transform: scale(1.05);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px rgba(232, 180, 240, 0.6); }
          50% { text-shadow: 0 0 20px rgba(232, 180, 240, 1); }
        }
      `}</style>
    </div>
  )
}
