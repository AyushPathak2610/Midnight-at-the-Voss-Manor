'use client'

import { useState, useEffect } from 'react'
import { speechService } from '@/lib/tts/speechService'

export default function TTSToggle() {
  const [enabled, setEnabled] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    const newState = speechService.toggle()
    setEnabled(newState)
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  if (!speechService.isSupported()) {
    return null
  }

  return (
    <button
      onClick={handleToggle}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '10px 20px',
        background: enabled ? 'rgba(74, 144, 226, 0.9)' : 'rgba(100, 100, 100, 0.7)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        transition: 'all 0.3s'
      }}
      title={enabled ? 'Disable voice narration' : 'Enable voice narration'}
    >
      <span style={{ fontSize: '18px' }}>{enabled ? '🔊' : '🔇'}</span>
      <span>Voice</span>
    </button>
  )
}
