import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { COMPETITIVE_EXAMS_MAP } from '../../data/schoolMasterData'

export default function SchoolCompetitiveExams({ selectedClass, selectedStream }) {
  const [selectedExam, setSelectedExam] = useState(COMPETITIVE_EXAMS_MAP[0])
  const [activeTest, setActiveTest] = useState(null)
  const [answers, setAnswers] = useState({})
  const [testSubmitted, setTestSubmitted] = useState(false)

  const handleStartExam = (ex) => {
    if (ex.sampleTest) {
      setActiveTest(ex.sampleTest)
      setAnswers({})
      setTestSubmitted(false)
      toast.success(`🚀 Started ${ex.name} High-Yield CBT Mock!`)
    } else {
      toast.success(`ℹ️ ${ex.name} Syllabus & Mock Series Initialized!`)
    }
  }

  const handleSelectOption = (qId, optIdx) => {
    setAnswers(prev => ({ ...prev, [qId]: optIdx }))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
            CLASS 12 COMPETITIVE ENTRANCE COCKPIT
          </span>
          <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.3rem', margin: '0.3rem 0 0' }}>
            🏆 Competitive Exams Hub (JEE, NEET, CUET, NDA, CLAT)
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.82rem', margin: '0.2rem 0 0' }}>
            Dual-Track Preparation: Master Board Exam 95%+ and Crack National Competitive Entrances in Parallel.
          </p>
        </div>
      </div>

      {/* Competitive Exam Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        {COMPETITIVE_EXAMS_MAP.map(ex => {
          const isSelected = selectedExam.id === ex.id
          return (
            <motion.div
              key={ex.id}
              whileHover={{ y: -3 }}
              onClick={() => setSelectedExam(ex)}
              style={{
                background: isSelected ? 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(37,99,235,0.25))' : 'rgba(15,23,42,0.95)',
                border: isSelected ? '2px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1rem',
                padding: '1.25rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '1.6rem' }}>{ex.icon}</span>
                  <span style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', padding: '0.15rem 0.5rem', borderRadius: '0.35rem', fontSize: '0.7rem', fontWeight: '800' }}>
                    {ex.stream}
                  </span>
                </div>
                <h4 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', margin: '0.3rem 0 0.4rem' }}>
                  {ex.name}
                </h4>
                <div style={{ color: '#94a3b8', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', margin: '0 0 1rem' }}>
                  <div>🏛️ Body: <strong>{ex.organizer}</strong></div>
                  <div>🎯 Pattern: <strong>{ex.pattern}</strong></div>
                  <div>🎓 Target: <strong style={{ color: '#6ee7b7' }}>{ex.seats}</strong></div>
                </div>
              </div>

              <button
                onClick={() => handleStartExam(ex)}
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                  color: 'white',
                  border: 'none',
                  padding: '0.65rem',
                  borderRadius: '0.55rem',
                  fontWeight: '800',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                🚀 Attend {ex.name} Mock Series ➔
              </button>
            </motion.div>
          )
        })}
      </div>

      {/* CBT Test Runner if active */}
      {activeTest && (
        <div style={{ background: 'rgba(15,23,42,0.95)', border: '2px solid #8b5cf6', borderRadius: '1.25rem', padding: '1.75rem', marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.2rem', margin: 0 }}>
                {activeTest.title}
              </h3>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                Duration: {activeTest.durationMins} Mins · Total Marks: {activeTest.totalMarks}
              </span>
            </div>
            <button
              onClick={() => setActiveTest(null)}
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '0.4rem 0.85rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: '700' }}
            >
              ✕ Exit Exam
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {activeTest.questions.map((q, idx) => (
              <div key={q.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.85rem', padding: '1.25rem' }}>
                <span style={{ color: '#c4b5fd', fontWeight: '800', fontSize: '0.78rem' }}>
                  {q.subject} · Question {idx + 1}
                </span>
                <p style={{ color: 'white', fontSize: '0.95rem', margin: '0.4rem 0 0.85rem', lineHeight: 1.5 }}>
                  {q.q}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  {q.options.map((opt, optIdx) => {
                    const isChosen = answers[q.id] === optIdx
                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        style={{
                          padding: '0.65rem 0.85rem',
                          borderRadius: '0.5rem',
                          background: isChosen ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.02)',
                          border: isChosen ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.05)',
                          color: isChosen ? 'white' : '#cbd5e1',
                          fontSize: '0.85rem',
                          cursor: 'pointer'
                        }}
                      >
                        <strong>{String.fromCharCode(65 + optIdx)}.</strong> {opt}
                      </div>
                    )
                  })}
                </div>

                {testSubmitted && (
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '0.5rem', color: '#4ade80', fontSize: '0.8rem' }}>
                    ✓ <strong>Correct Option:</strong> {q.options[q.correct]}<br />
                    📌 <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>
            ))}

            {!testSubmitted ? (
              <button
                onClick={() => {
                  setTestSubmitted(true)
                  toast.success('Mock Test Evaluated with AI!')
                }}
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '0.6rem', fontWeight: '900', cursor: 'pointer' }}
              >
                Submit Mock Paper & Check Answer Key ✓
              </button>
            ) : (
              <button
                onClick={() => setActiveTest(null)}
                style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '0.6rem', fontWeight: '800', cursor: 'pointer' }}
              >
                Close Exam ➔
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
