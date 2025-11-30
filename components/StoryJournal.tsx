'use client'

import { useState } from 'react'

interface JournalEntry {
  ghost: string
  title: string
  story: string
  unlocked: boolean
}

interface StoryJournalProps {
  entries: JournalEntry[]
}

export default function StoryJournal({ entries }: StoryJournalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null)

  const unlockedEntries = entries.filter(e => e.unlocked)

  if (unlockedEntries.length === 0) {
    return null
  }

  return (
    <>
      {/* Journal Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '15px 25px',
          background: 'rgba(139, 92, 246, 0.9)',
          color: 'white',
          border: '2px solid rgba(167, 139, 250, 0.5)',
          borderRadius: '12px',
          cursor: 'pointer',
          fontSize: '16px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)'
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 92, 246, 0.6)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.4)'
        }}
      >
        <span style={{ fontSize: '24px' }}>📖</span>
        <span>Story Journal ({unlockedEntries.length})</span>
      </button>

      {/* Journal Modal */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => {
            setIsOpen(false)
            setSelectedEntry(null)
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              border: '2px solid rgba(139, 92, 246, 0.5)',
              borderRadius: '16px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                padding: '20px 30px',
                borderBottom: '2px solid rgba(139, 92, 246, 0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <h2 style={{ margin: 0, color: '#a78bfa', fontSize: '28px' }}>
                📖 Story Journal
              </h2>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setSelectedEntry(null)
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#a78bfa',
                  fontSize: '32px',
                  cursor: 'pointer',
                  padding: '0',
                  lineHeight: '1'
                }}
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: '30px', overflowY: 'auto', maxHeight: 'calc(80vh - 80px)' }}>
              {!selectedEntry ? (
                // Entry List
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {unlockedEntries.map((entry, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedEntry(entry)}
                      style={{
                        padding: '20px',
                        background: 'rgba(139, 92, 246, 0.1)',
                        border: '2px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)'
                        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)'
                        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                        <span style={{ fontSize: '32px' }}>
                          {entry.ghost === 'Elara' && '👩'}
                          {entry.ghost === 'Harlan' && '👨‍🔬'}
                          {entry.ghost === 'Mira' && '👧'}
                          {entry.ghost === 'Theo' && '🎭'}
                          {entry.ghost === 'Selene' && '👰'}
                        </span>
                        <div>
                          <h3 style={{ margin: 0, color: '#a78bfa', fontSize: '20px' }}>
                            {entry.ghost}
                          </h3>
                          <p style={{ margin: '5px 0 0 0', color: '#9ca3af', fontSize: '14px' }}>
                            {entry.title}
                          </p>
                        </div>
                      </div>
                      <p style={{ margin: 0, color: '#d1d5db', fontSize: '14px', opacity: 0.8 }}>
                        Click to read their story...
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                // Entry Detail
                <div>
                  <button
                    onClick={() => setSelectedEntry(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#a78bfa',
                      fontSize: '16px',
                      cursor: 'pointer',
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    ← Back to Journal
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <span style={{ fontSize: '48px' }}>
                      {selectedEntry.ghost === 'Elara' && '👩'}
                      {selectedEntry.ghost === 'Harlan' && '👨‍🔬'}
                      {selectedEntry.ghost === 'Mira' && '👧'}
                      {selectedEntry.ghost === 'Theo' && '🎭'}
                      {selectedEntry.ghost === 'Selene' && '👰'}
                    </span>
                    <div>
                      <h2 style={{ margin: 0, color: '#a78bfa', fontSize: '32px' }}>
                        {selectedEntry.ghost}
                      </h2>
                      <p style={{ margin: '5px 0 0 0', color: '#9ca3af', fontSize: '16px' }}>
                        {selectedEntry.title}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      color: '#e5e7eb',
                      fontSize: '16px',
                      lineHeight: '1.8',
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {selectedEntry.story}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
