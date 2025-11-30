'use client'

import { useEffect, useRef } from 'react'
import { useSpeech, GhostVoice } from '@/lib/tts/speechService'

interface Message {
  ghost: string
  message: string
}

export default function GhostDebatePanel({ messages }: { messages: Message[] }) {
  const { speak } = useSpeech()
  const lastMessageCount = useRef(0)

  const ghostColors: Record<string, string> = {
    elara: 'ghost-elara',
    harlan: 'ghost-harlan',
    mira: 'ghost-mira',
    theo: 'ghost-theo',
    selene: 'ghost-selene'
  }

  useEffect(() => {
    // Speak new messages as they arrive
    if (messages.length > lastMessageCount.current) {
      const newMessages = messages.slice(lastMessageCount.current)
      
      // Queue each new message - the speech service will handle them sequentially
      newMessages.forEach((msg) => {
        const ghostName = msg.ghost.toLowerCase() as GhostVoice
        speak(msg.message, ghostName)
      })
      
      lastMessageCount.current = messages.length
    }
  }, [messages, speak])

  return (
    <div className="ghost-debate">
      <h3 style={{ marginBottom: '10px', color: '#4a90e2' }}>👻 Ghost Council Debate</h3>
      {messages.length === 0 && (
        <p style={{ opacity: 0.6, fontStyle: 'italic' }}>Waiting for ghosts to speak...</p>
      )}
      {messages.map((msg, idx) => (
        <div key={idx} className={`ghost-message ${ghostColors[msg.ghost.toLowerCase()]}`}>
          <strong>{msg.ghost}:</strong> {msg.message}
        </div>
      ))}
    </div>
  )
}
