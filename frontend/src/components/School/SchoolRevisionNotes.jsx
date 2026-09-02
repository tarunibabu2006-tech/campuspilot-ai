import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function SchoolRevisionNotes({ activeSubject, selectedClass }) {
  const chapters = activeSubject?.chapters || [
    { id: 'ch1', name: 'Real Numbers / Chemical Reactions' },
    { id: 'ch2', name: 'Polynomials / Acids & Bases' }
  ]
  const [selectedChapter, setSelectedChapter] = useState(chapters[0])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
            LAST-MINUTE BOARD REVISION ENGINE
          </span>
          <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.3rem', margin: '0.3rem 0 0' }}>
            📘 Mind Maps, Important Formulas & Chapter Summaries ({activeSubject.name})
          </h2>
        </div>

        <button
          onClick={() => toast.success(`📥 Downloaded Complete One-Page Revision Cheat-Sheets for ${activeSubject.name}!`)}
          style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', padding: '0.55rem 1.1rem', borderRadius: '0.55rem', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer' }}
        >
          📥 Download Formula Cheat-Sheet (PDF)
        </button>
      </div>

      {/* Chapter Selection Bar */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.4rem' }}>
        {chapters.map((ch, idx) => {
          const isSelected = selectedChapter.id === ch.id || (!selectedChapter.id && idx === 0)
          return (
            <button
              key={ch.id || idx}
              onClick={() => setSelectedChapter(ch)}
              style={{
                padding: '0.5rem 0.9rem',
                borderRadius: '0.6rem',
                background: isSelected ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.03)',
                border: isSelected ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                color: isSelected ? 'white' : '#94a3b8',
                fontWeight: '800',
                fontSize: '0.78rem',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              {ch.name}
            </button>
          )
        })}
      </div>

      {/* Main Revision Notes Body */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {/* Mind Map / Overview */}
        <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem' }}>📊</span>
            <h3 style={{ color: '#c4b5fd', margin: 0, fontWeight: '900', fontSize: '1.1rem' }}>
              Visual Mind Map & Concept Hierarchy
            </h3>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)', color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.7 }}>
            <div>📍 <strong>Core Pillars:</strong></div>
            <div style={{ paddingLeft: '1rem' }}>
              • <strong>Pillar 1:</strong> Fundamental Definitions & SI Units / Laws<br />
              • <strong>Pillar 2:</strong> Core Governing Equations & Direct Derivations<br />
              • <strong>Pillar 3:</strong> Real-world Industrial & Laboratory Applications<br />
              • <strong>Pillar 4:</strong> Common Exam Traps & Examiner Pitfalls
            </div>
          </div>
        </div>

        {/* Important Formulas & Equations */}
        <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '1.25rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem' }}>🔑</span>
            <h3 style={{ color: '#6ee7b7', margin: 0, fontWeight: '900', fontSize: '1.1rem' }}>
              Crucial Formulas & Reaction Equations
            </h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#fef08a', fontSize: '0.85rem', lineHeight: 1.8 }}>
            <li><strong>Quadratic Roots:</strong> x = [-b ± √(b² - 4ac)] / 2a</li>
            <li><strong>Arithmetic Progression nth Term:</strong> a_n = a + (n - 1)d</li>
            <li><strong>Sum of AP:</strong> S_n = n/2 [2a + (n - 1)d] = n/2 [a + l]</li>
            <li><strong>Mirror Formula:</strong> 1/f = 1/v + 1/u; Magnification m = -v/u</li>
            <li><strong>Ohm’s Law:</strong> V = I × R; Power P = V × I = I²R = V²/R</li>
          </ul>
        </div>

        {/* One-Page Last Minute Capsule */}
        <div style={{ gridColumn: '1 / -1', background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '1.25rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem' }}>⚡</span>
            <h3 style={{ color: '#fbbf24', margin: 0, fontWeight: '900', fontSize: '1.1rem' }}>
              One-Page Summary & Exam-Day Quick Points
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', color: '#cbd5e1', fontSize: '0.82rem', lineHeight: 1.6 }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.85rem', borderRadius: '0.6rem', border: '1px solid rgba(255,255,255,0.05)' }}>
              <strong style={{ color: 'white' }}>1. Always mention SI units:</strong> Marks are deducted if final answers in Physics or Math omit units (m/s, Watts, cm², etc.).
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.85rem', borderRadius: '0.6rem', border: '1px solid rgba(255,255,255,0.05)' }}>
              <strong style={{ color: 'white' }}>2. Draw neat pencil diagrams:</strong> Always label rays of light with directional arrows and show circuit polarity (+/-).
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.85rem', borderRadius: '0.6rem', border: '1px solid rgba(255,255,255,0.05)' }}>
              <strong style={{ color: 'white' }}>3. State theorems before using:</strong> Explicitly write "By Basic Proportionality Theorem" or "By Pythagoras Theorem" in proofs.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
