import React from 'react'
import { motion } from 'framer-motion'

export default function SchoolProgressTracking({ selectedClass, subjectsList }) {
  const subjectProgress = [
    { name: 'Science (Physics, Chem, Bio)', pct: 82, color: '#10b981', status: 'Strong / Ahead of Schedule' },
    { name: 'Mathematics (Standard & Basic)', pct: 75, color: '#3b82f6', status: 'Good / Practice Trigonometry' },
    { name: 'Social Science (History, Geo, Civics)', pct: 78, color: '#f59e0b', status: 'Strong / Map Work Pending' },
    { name: 'English Language & Literature', pct: 68, color: '#8b5cf6', status: 'Moderate / Focus on Letter Formats' },
    { name: 'Tamil / Hindi Language', pct: 60, color: '#ec4899', status: 'Needs Grammar & Essay Revision' }
  ]

  const testHistory = [
    { date: '28 Aug 2026', testName: 'Class 10 Science Full Syllabus Pre-Board #1', score: '76/80 (95%)', badge: 'Topper Rank 1' },
    { date: '21 Aug 2026', testName: 'Mathematics Standard Unit Test: Triangles & Trigonometry', score: '36/40 (90%)', badge: 'A1 Grade' },
    { date: '14 Aug 2026', testName: 'Social Science Chapter 1-4 Speed Drill', score: '32/40 (80%)', badge: 'A2 Grade' }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ background: 'rgba(52,211,153,0.2)', color: '#6ee7b7', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
            ACADEMIC PERFORMANCE COCKPIT
          </span>
          <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.3rem', margin: '0.3rem 0 0' }}>
            📈 Class {selectedClass}th Progress & Diagnostic Analytics
          </h2>
        </div>
      </div>

      {/* Subject-wise Progress Bars */}
      <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
        <h3 style={{ color: '#c4b5fd', fontSize: '1.05rem', fontWeight: '800', margin: '0 0 1.25rem' }}>
          📊 Subject-by-Subject Syllabus Mastery
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {subjectProgress.map((sub, idx) => (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <strong style={{ color: 'white', fontSize: '0.88rem' }}>{sub.name}</strong>
                <span style={{ color: sub.color, fontWeight: '900', fontSize: '0.88rem' }}>{sub.pct}%</span>
              </div>
              <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '5px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${sub.pct}%` }}
                  transition={{ duration: 0.8 }}
                  style={{ height: '100%', background: sub.color, borderRadius: '5px' }}
                />
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginTop: '0.2rem' }}>
                Status: {sub.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths and Weaknesses Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '1rem', padding: '1.25rem' }}>
          <div style={{ color: '#4ade80', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            ✅ Verified High Strengths (90%+ Accuracy):
          </div>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#a7f3d0', fontSize: '0.82rem', lineHeight: 1.7 }}>
            <li>Real Numbers & Quadratic Equations (Algebra)</li>
            <li>Chemical Reactions & Balancing Equations</li>
            <li>Electricity Circuit Numericals (Ohm's Law)</li>
            <li>Nationalism in India Timeline Events</li>
          </ul>
        </div>

        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '1rem', padding: '1.25rem' }}>
          <div style={{ color: '#f87171', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            ⚠️ High-Yield Improvement Focus (Score Booster):
          </div>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#fca5a5', fontSize: '0.82rem', lineHeight: 1.7 }}>
            <li>Trigonometric Identity Proofs (sin²θ + cos²θ = 1)</li>
            <li>Human Eye Defect Ray Diagrams & Lens Formula</li>
            <li>Carbon Compounds Functional Groups Naming</li>
            <li>Formal Letter & Analytical Paragraph Writing</li>
          </ul>
        </div>
      </div>

      {/* Recent Test History Table */}
      <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
        <h3 style={{ color: 'white', fontSize: '1.05rem', fontWeight: '800', margin: '0 0 1rem' }}>
          📜 Recent Mock Test History & Scorecards
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {testHistory.map((test, idx) => (
            <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.65rem', padding: '0.85rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <strong style={{ color: 'white', fontSize: '0.88rem' }}>{test.testName}</strong>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>📅 {test.date}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#4ade80', fontWeight: '900', fontSize: '0.9rem' }}>{test.score}</span>
                <span style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', padding: '0.15rem 0.5rem', borderRadius: '0.35rem', fontSize: '0.7rem', fontWeight: '800' }}>
                  {test.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
