import React from 'react'

export default function QuickActions({ onNavigate }) {
  // Requirement: Remove icons from "Open Notes Hub", "Browse Jobs", and "Ask AI"
  const actions = [
    { id: 'notes', label: 'Open Notes Hub', bg: 'linear-gradient(135deg, #f59e0b, #d97706)', text: '#1a1a1a', border: null },
    { id: 'jobs', label: 'Browse Jobs', bg: 'rgba(34, 197, 94, 0.15)', text: '#4ade80', border: 'rgba(34, 197, 94, 0.4)' },
    { id: 'chat', label: 'Ask AI', bg: 'rgba(129, 140, 248, 0.15)', text: '#a5b4fc', border: 'rgba(129, 140, 248, 0.4)' },
    { id: 'interview', label: '🎤 Mock Interview', bg: 'rgba(244, 63, 94, 0.15)', text: '#fb7185', border: 'rgba(244, 63, 94, 0.4)' },
    { id: 'aptitude', label: '🧠 Aptitude Test', bg: 'rgba(6, 182, 212, 0.15)', text: '#38bdf8', border: 'rgba(6, 182, 212, 0.4)' },
    { id: 'resume', label: '📄 Resume Builder', bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', border: 'rgba(16, 185, 129, 0.4)' },
    { id: 'government-exams', label: '🏛️ Govt Exams', bg: 'rgba(234, 179, 8, 0.15)', text: '#fde047', border: 'rgba(234, 179, 8, 0.4)' },
    { id: 'ai-spoken', label: '🗣️ AI Spoken Class', bg: 'rgba(168, 85, 247, 0.15)', text: '#c084fc', border: 'rgba(168, 85, 247, 0.4)' },
  ]

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '1.25rem',
      padding: '1.25rem',
      marginBottom: '1.5rem'
    }}>
      <h3 style={{ color: '#ffffff', fontWeight: '800', fontSize: '0.98rem', margin: '0 0 0.85rem' }}>
        ⚡ Quick Actions
      </h3>
      <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
        {actions.map(a => (
          <button
            key={a.id}
            onClick={() => onNavigate(a.id)}
            style={{
              background: a.bg,
              color: a.text,
              border: a.border ? `1px solid ${a.border}` : 'none',
              padding: '0.6rem 1.1rem',
              borderRadius: '0.75rem',
              fontWeight: '800',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {a.label}
          </button>
        ))}
      </div>
    </div>
  )
}
