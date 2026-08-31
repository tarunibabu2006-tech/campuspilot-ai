import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function BunkPlanner() {
  const [totalClasses, setTotalClasses] = useState('60')
  const [attended, setAttended] = useState('48')
  const [targetPct, setTargetPct] = useState('75')

  const tot = Math.max(1, parseInt(totalClasses) || 0)
  const att = Math.max(0, parseInt(attended) || 0)
  const tgt = Math.min(100, Math.max(1, parseFloat(targetPct) || 75))

  const currentPct = ((att / tot) * 100).toFixed(1)
  const isSafe = parseFloat(currentPct) >= tgt

  // If Safe: How many classes can be bunked while staying >= tgt%
  // att / (tot + X) >= tgt / 100  =>  X = floor( (att * 100 / tgt) - tot )
  const canBunk = isSafe ? Math.max(0, Math.floor((att * 100) / tgt - tot)) : 0

  // If Unsafe: How many consecutive classes must be attended to reach tgt%
  // (att + Y) / (tot + Y) >= tgt / 100  =>  Y = ceil( (tgt * tot - 100 * att) / (100 - tgt) )
  const mustAttend = !isSafe
    ? Math.ceil(((tgt / 100) * tot - att) / (1 - tgt / 100))
    : 0

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* ── HEADER BANNER ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #0f172a 100%)',
          borderRadius: '1.5rem',
          padding: '2rem',
          border: '1px solid rgba(139,92,246,0.35)',
          boxShadow: '0 8px 32px rgba(124,58,237,0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '2.5rem' }}>🏃</span>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
                Bunk Planner & Attendance Tracker
              </h1>
              <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
                Instant Safe / Unsafe Status, Attendance Percentage & Number of Bunks Calculation
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── INPUTS & RESULTS GRID ─────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {/* Input Form */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '1.25rem',
          padding: '1.5rem'
        }}>
          <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.15rem', marginBottom: '1.25rem' }}>
            ⚙️ Enter Attendance Details
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '700' }}>
                Total Classes Conducted
              </label>
              <input
                type="number"
                min="1"
                value={totalClasses}
                onChange={e => setTotalClasses(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '0.65rem',
                  padding: '0.75rem 1rem',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '700',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '700' }}>
                Classes Attended
              </label>
              <input
                type="number"
                min="0"
                max={tot}
                value={attended}
                onChange={e => setAttended(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '0.65rem',
                  padding: '0.75rem 1rem',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '700',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '700' }}>
                Required Minimum Attendance % (e.g. 75%)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={targetPct}
                onChange={e => setTargetPct(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '0.65rem',
                  padding: '0.75rem 1rem',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '700',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        </div>

        {/* Big Safe / Unsafe Result Card */}
        <motion.div
          animate={{ scale: [0.98, 1] }}
          style={{
            background: isSafe
              ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(15, 23, 42, 0.9))'
              : 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(15, 23, 42, 0.9))',
            border: `2px solid ${isSafe ? '#22c55e' : '#ef4444'}`,
            borderRadius: '1.25rem',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: isSafe ? '0 10px 35px rgba(34, 197, 94, 0.2)' : '0 10px 35px rgba(239, 68, 68, 0.2)'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: '800' }}>
                CURRENT STATUS
              </span>
              <span style={{
                background: isSafe ? '#22c55e' : '#ef4444',
                color: '#ffffff',
                padding: '0.35rem 1rem',
                borderRadius: '2rem',
                fontWeight: '900',
                fontSize: '0.9rem',
                letterSpacing: '1px'
              }}>
                {isSafe ? '🟢 SAFE' : '🔴 UNSAFE'}
              </span>
            </div>

            <div style={{ textAlign: 'center', margin: '1rem 0' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: '900', color: isSafe ? '#4ade80' : '#f87171' }}>
                {currentPct}%
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                {att} of {tot} Classes Attended (Requirement: {tgt}%)
              </div>
            </div>

            {/* Advice Action Message */}
            <div style={{
              background: 'rgba(0,0,0,0.35)',
              borderRadius: '0.85rem',
              padding: '1rem',
              textAlign: 'center',
              border: `1px solid ${isSafe ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`
            }}>
              {isSafe ? (
                <div>
                  <div style={{ color: '#4ade80', fontWeight: '900', fontSize: '1.2rem', marginBottom: '0.25rem' }}>
                    🎉 You can safely bunk {canBunk} {canBunk === 1 ? 'class' : 'classes'}!
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
                    Your attendance will remain above {tgt}% even if you skip {canBunk} {canBunk === 1 ? 'class' : 'classes'}.
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ color: '#f87171', fontWeight: '900', fontSize: '1.2rem', marginBottom: '0.25rem' }}>
                    🚨 You MUST attend the next {mustAttend} {mustAttend === 1 ? 'class' : 'classes'}!
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
                    You are below the {tgt}% threshold. Attend {mustAttend} consecutive classes without bunking to recover.
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: '1rem', textAlign: 'center', color: '#64748b', fontSize: '0.72rem' }}>
            * Instant calculation updated live as you type
          </div>
        </motion.div>
      </div>
    </div>
  )
}
