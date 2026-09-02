import React from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function SchoolParentDashboard({ selectedClass, studentName }) {
  const monthsData = [
    { month: 'Jan', consistency: 82, testsTaken: 4 },
    { month: 'Feb', consistency: 88, testsTaken: 5 },
    { month: 'Mar', consistency: 94, testsTaken: 6 },
    { month: 'Apr', consistency: 90, testsTaken: 5 },
    { month: 'May', consistency: 85, testsTaken: 4 },
    { month: 'Jun', consistency: 92, testsTaken: 7 }
  ]

  const careerMatch = [
    { field: 'Engineering & Technology (Computer Science / AI / Robotics)', match: 92, stream: 'PCM', icon: '💻' },
    { field: 'Medical & Healthcare (MBBS / Biotechnology / Pharma)', match: 84, stream: 'PCB', icon: '🩺' },
    { field: 'Civil Services / Defence Services (NDA / UPSC / TNPSC)', match: 88, stream: 'All Streams', icon: '🏛️' },
    { field: 'Corporate Finance / Chartered Accountancy (CA / Business)', match: 76, stream: 'Commerce', icon: '📊' }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #064e3b 100%)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '1.25rem', padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ background: 'rgba(52,211,153,0.2)', color: '#6ee7b7', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
            PARENT & GUARDIAN OVERSIGHT COCKPIT
          </span>
          <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.35rem', margin: '0.3rem 0 0.2rem' }}>
            👨‍👩‍👧 Parent Dashboard — {studentName}'s Academic Journey
          </h2>
          <p style={{ color: '#a7f3d0', fontSize: '0.82rem', margin: 0 }}>
            Real-time tracking of study consistency, monthly exam score improvement, and career aptitude matching.
          </p>
        </div>

        <button
          onClick={() => toast.success(`📊 Comprehensive Monthly Academic Report generated and sent to registered parent email!`)}
          style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '0.65rem', fontWeight: '900', fontSize: '0.85rem', cursor: 'pointer' }}
        >
          📄 Export Monthly Report (PDF)
        </button>
      </div>

      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '1.25rem', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ color: '#4ade80', fontWeight: '900', fontSize: '2.2rem' }}>92%</div>
          <div style={{ color: '#e2e8f0', fontSize: '0.82rem', fontWeight: '700', marginTop: '0.25rem' }}>Daily Study Consistency</div>
          <div style={{ color: '#a7f3d0', fontSize: '0.72rem' }}>3.2 Hours / Day Average</div>
        </div>

        <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '1.25rem', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ color: '#60a5fa', fontWeight: '900', fontSize: '2.2rem' }}>31 Tests</div>
          <div style={{ color: '#e2e8f0', fontSize: '0.82rem', fontWeight: '700', marginTop: '0.25rem' }}>CBT Mocks & PYQs Completed</div>
          <div style={{ color: '#93c5fd', fontSize: '0.72rem' }}>84.5% Average Score</div>
        </div>

        <div style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '1.25rem', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ color: '#fbbf24', fontWeight: '900', fontSize: '2.2rem' }}>94/100</div>
          <div style={{ color: '#e2e8f0', fontSize: '0.82rem', fontWeight: '700', marginTop: '0.25rem' }}>AI Board Exam Score Forecast</div>
          <div style={{ color: '#fef08a', fontSize: '0.72rem' }}>Top 2% All-India Candidate</div>
        </div>
      </div>

      {/* Monthly Consistency Bar Graph Simulation */}
      <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
        <h3 style={{ color: '#c4b5fd', fontSize: '1.05rem', fontWeight: '800', margin: '0 0 1.25rem' }}>
          📈 6-Month Study Consistency & Mock Test Volume
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.75rem', alignItems: 'flex-end', height: '180px', padding: '0 1rem' }}>
          {monthsData.map((m, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ color: '#4ade80', fontSize: '0.75rem', fontWeight: '800', marginBottom: '0.25rem' }}>
                {m.consistency}%
              </div>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${m.consistency * 1.2}px` }}
                transition={{ duration: 0.8 }}
                style={{
                  width: '100%',
                  maxWidth: '40px',
                  background: 'linear-gradient(180deg, #10b981, #059669)',
                  borderRadius: '0.5rem 0.5rem 0 0'
                }}
              />
              <div style={{ color: '#cbd5e1', fontSize: '0.78rem', fontWeight: '700', marginTop: '0.5rem' }}>
                {m.month}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Future Career Aptitude Matches */}
      <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '1.25rem', padding: '1.5rem' }}>
        <h3 style={{ color: 'white', fontSize: '1.05rem', fontWeight: '800', margin: '0 0 1rem' }}>
          🎯 AI Career Aptitude & Higher Education Stream Recommendations
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
          {careerMatch.map((c, idx) => (
            <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.85rem', padding: '1.1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{c.icon}</span>
                <span style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', padding: '0.15rem 0.5rem', borderRadius: '0.35rem', fontSize: '0.72rem', fontWeight: '800' }}>
                  {c.match}% Match
                </span>
              </div>
              <h4 style={{ color: 'white', fontWeight: '800', fontSize: '0.95rem', margin: '0 0 0.25rem' }}>
                {c.field}
              </h4>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                Recommended Stream: <strong style={{ color: '#60a5fa' }}>{c.stream}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
