'use client'

import { useEffect } from 'react'
import Image from 'next/image'

interface TransitionScreenProps {
  onComplete: () => void
}

export default function TransitionScreen({ onComplete }: TransitionScreenProps) {
  useEffect(() => {
    // Play walking/boot sound effect (overlaps with background music)
    const audio = new Audio('/audio/sfx/footsteps.m4a')
    audio.volume = 0.7
    audio.play().catch(err => console.log('Footsteps audio play failed:', err))

    // Auto-advance after 3 seconds
    const timer = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => {
      clearTimeout(timer)
      audio.pause()
      audio.currentTime = 0
    }
  }, [onComplete])

  return (
    <div className="transition-screen">
      <Image
        src="/shots/hallway.png"
        alt="Hallway Transition"
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
      
      <style jsx>{`
        .transition-screen {
          position: fixed;
          inset: 0;
          z-index: 1000;
          animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
