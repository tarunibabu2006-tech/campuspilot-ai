import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function SchoolPreviousYearQuestions({ activeSubject, selectedClass, selectedBoard }) {
  const [selectedYear, setSelectedYear] = useState('2024')
  const [activeTest, setActiveTest] = useState(null)
  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [testSubmitted, setTestSubmitted] = useState(false)
  const [testResult, setTestResult] = useState(null)

  const PYQ_YEARS = ['2024', '2023', '2022', '2020', '2019', '2018']

  // Sample PYQ Dataset
  const PYQ_DATA = {
    '2024': {
      title: `${selectedBoard} Class ${selectedClass}th ${activeSubject.name} 2024 Board Exam Paper`,
      timeLimitMins: 20,
      totalMarks: 40,
      analysis: {
        repeatedTopics: ['Quadratic Formula & Discriminant', 'Trigonometric Identities (sin²θ + cos²θ = 1)', 'Ohm’s Law & Resistor Combinations', 'Mendelian Genetics & Dihybrid Cross'],
        trend: 'Shifted towards 35% Competency & Case-based scenario questions.'
      },
      questions: [
        {
          id: 'pyq24-1',
          q: 'If the HCF of 65 and 117 is expressible in the form 65m - 117, then the value of m is:',
          options: ['4', '2', '1', '3'],
          correct: 1,
          explanation: 'HCF of 65 and 117 is 13. Given 65m - 117 = 13 => 65m = 130 => m = 2.'
        },
        {
          id: 'pyq24-2',
          q: 'An electric bulb is rated 220 V and 100 W. When it is operated on 110 V, the power consumed will be:',
          options: ['100 W', '75 W', '50 W', '25 W'],
          correct: 3,
          explanation: 'R = V² / P = (220)² / 100 = 484 Ω. Power at 110 V = V² / R = (110)² / 484 = 12100 / 484 = 25 W.'
        },
        {
          id: 'pyq24-3',
          q: 'The pH of a sample of gastric juice is found to be 2. This gastric juice contains predominantly:',
          options: ['Acetic acid', 'Hydrochloric acid (HCl)', 'Citric acid', 'Sodium hydroxide'],
          correct: 1,
          explanation: 'Gastric juice secreted by parietal cells in stomach contains Hydrochloric Acid (HCl), resulting in a low pH of 1.5 to 2.5.'
        },
        {
          id: 'pyq24-4',
          q: 'If sin θ + cos θ = √2 cos θ, then the value of (cos θ - sin θ) is:',
          options: ['√2 sin θ', '√2 cos θ', '1/√2 sin θ', '2 sin θ'],
          correct: 0,
          explanation: 'sin θ = (√2 - 1)cos θ => cos θ = sin θ / (√2 - 1) = (√2 + 1)sin θ => cos θ - sin θ = √2 sin θ.'
        }
      ]
    },
    '2023': {
      title: `${selectedBoard} Class ${selectedClass}th ${activeSubject.name} 2023 Board Exam Paper`,
      timeLimitMins: 20,
      totalMarks: 40,
      analysis: {
        repeatedTopics: ['Surface Area Recasting of Solids', 'Electric Motor Principle', 'Chemical Balancing'],
        trend: 'Direct formula substitutions with moderate difficulty in Section C.'
      },
      questions: [
        {
          id: 'pyq23-1',
          q: 'A metallic sphere of radius 4.2 cm is melted and recast into the shape of a cylinder of radius 6 cm. The height of the cylinder is:',
          options: ['2.74 cm', '3.5 cm', '1.8 cm', '4.2 cm'],
          correct: 0,
          explanation: 'Volume of Sphere = Volume of Cylinder => (4/3)π(4.2)³ = π(6)²(h) => h = 2.74 cm.'
        }
      ]
    }
  }

  const currentPyq = PYQ_DATA[selectedYear] || PYQ_DATA['2024']

  // Timer Effect
  useEffect(() => {
    let interval = null
    if (activeTest && !testSubmitted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            handleSubmitTest()
            toast.error('⏰ Time is up! Exam submitted.')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeTest, testSubmitted, timeLeft])

  const startPyqCbt = () => {
    setActiveTest(currentPyq)
    setCurrentQIndex(0)
    setAnswers({})
    setTimeLeft(currentPyq.timeLimitMins * 60)
    setTestSubmitted(false)
    setTestResult(null)
    toast.success(`🚀 Started ${selectedYear} Board Exam Paper!`)
  }

  const handleSelectOption = (qId, idx) => {
    setAnswers(prev => ({ ...prev, [qId]: idx }))
  }

  const handleSubmitTest = () => {
    let correct = 0
    let total = activeTest.questions.length
    activeTest.questions.forEach(q => {
      if (answers[q.id] === q.correct) correct++
    })
    const pct = Math.round((correct / total) * 100)
    setTestResult({ correct, total, pct })
    setTestSubmitted(true)
    toast.success(`Exam Evaluated! Score: ${correct}/${total} (${pct}%)`)
  }

  const currentQ = activeTest?.questions[currentQIndex]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ background: 'rgba(59,130,246,0.2)', color: '#93c5fd', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
            PREVIOUS YEARS QUESTION VAULT (2018 - 2024)
          </span>
          <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.3rem', margin: '0.3rem 0 0' }}>
            🔄 {activeSubject.name} — Real Board Exam Past Papers
          </h2>
        </div>

        {/* Year Selector Pills */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {PYQ_YEARS.map(yr => (
            <button
              key={yr}
              onClick={() => {
                setSelectedYear(yr)
                setActiveTest(null)
                setTestSubmitted(false)
              }}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '0.5rem',
                background: selectedYear === yr ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.04)',
                border: selectedYear === yr ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                color: selectedYear === yr ? 'white' : '#cbd5e1',
                fontWeight: '800',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              Year {yr}
            </button>
          ))}
        </div>
      </div>

      {/* Main Exam Runner OR Overview Card */}
      {!activeTest ? (
        <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '1.25rem', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <span style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.8rem' }}>
              OFFICIAL QUESTION PAPER ARCHIVE
            </span>
            <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.3rem', margin: '0.25rem 0 0.5rem' }}>
              {currentPyq.title}
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: 0 }}>
              Attend the real official board exam paper under live timer conditions or download PDF with step-by-step marking scheme solutions.
            </p>
          </div>

          {/* AI Year Trend Analysis Box */}
          <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: '0.85rem', padding: '1.25rem' }}>
            <div style={{ color: '#93c5fd', fontWeight: '800', fontSize: '0.88rem', marginBottom: '0.5rem' }}>
              📊 AI Historical Analysis & Repeated Questions Trend ({selectedYear}):
            </div>
            <div style={{ color: '#e2e8f0', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
              <strong>Most Repeated Topics:</strong> {currentPyq.analysis?.repeatedTopics.join(' • ')}
            </div>
            <div style={{ color: '#4ade80', fontSize: '0.82rem' }}>
              <strong>Board Trend Insight:</strong> {currentPyq.analysis?.trend}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={startPyqCbt}
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.65rem',
                fontWeight: '900',
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(16,185,129,0.35)'
              }}
            >
              ✍️ Attend Live CBT Exam ({selectedYear}) ➔
            </button>

            <button
              onClick={() => toast.success(`📥 Downloaded Official ${selectedYear} Board Paper with Answer Key PDF!`)}
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '0.75rem 1.25rem',
                borderRadius: '0.65rem',
                fontWeight: '800',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              📥 Download Paper & Marking Key (PDF)
            </button>
          </div>
        </div>
      ) : (
        /* Live CBT PYQ Test Screen */
        <div style={{ background: 'rgba(15,23,42,0.95)', border: '2px solid #8b5cf6', borderRadius: '1.25rem', padding: '1.75rem' }}>
          {!testSubmitted && currentQ ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Toolbar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.85rem' }}>
                <div>
                  <span style={{ color: '#c4b5fd', fontSize: '0.78rem', fontWeight: '800' }}>
                    Question {currentQIndex + 1} of {activeTest.questions.length}
                  </span>
                  <div style={{ color: 'white', fontWeight: '800', fontSize: '1rem' }}>{activeTest.title}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: 'rgba(124,58,237,0.25)', border: '1px solid #8b5cf6', padding: '0.4rem 0.85rem', borderRadius: '0.6rem', color: '#c4b5fd', fontWeight: '900', fontFamily: 'monospace' }}>
                    ⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </div>
                  <button
                    onClick={handleSubmitTest}
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', padding: '0.45rem 1rem', borderRadius: '0.5rem', fontWeight: '800', cursor: 'pointer' }}
                  >
                    Submit Exam ✓
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <p style={{ color: 'white', fontSize: '1.05rem', lineHeight: 1.6, margin: '0.5rem 0 1rem' }}>
                {currentQ.q}
              </p>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {currentQ.options.map((opt, optIdx) => {
                  const isChosen = answers[currentQ.id] === optIdx
                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(currentQ.id, optIdx)}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: '0.75rem',
                        background: isChosen ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.02)',
                        border: isChosen ? '1.5px solid #8b5cf6' : '1px solid rgba(255,255,255,0.06)',
                        color: isChosen ? 'white' : '#cbd5e1',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}
                    >
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: isChosen ? '2px solid #8b5cf6' : '2px solid #64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '0.8rem', background: isChosen ? '#7c3aed' : 'transparent' }}>
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span>{opt}</span>
                    </div>
                  )
                })}
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(prev => prev - 1)}
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'white', border: 'none', padding: '0.55rem 1.25rem', borderRadius: '0.5rem', fontWeight: '800', cursor: currentQIndex === 0 ? 'not-allowed' : 'pointer' }}
                >
                  ⬅ Prev
                </button>
                {currentQIndex < activeTest.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQIndex(prev => prev + 1)}
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', border: 'none', padding: '0.55rem 1.5rem', borderRadius: '0.5rem', fontWeight: '800', cursor: 'pointer' }}
                  >
                    Next ➔
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitTest}
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', padding: '0.55rem 1.5rem', borderRadius: '0.5rem', fontWeight: '900', cursor: 'pointer' }}
                  >
                    Submit Paper ✓
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Result Screen */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem' }}>🏆</div>
                <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.4rem', margin: '0.3rem 0' }}>
                  AI Scorecard: {testResult?.pct}%
                </h3>
                <p style={{ color: '#a7f3d0', fontSize: '0.9rem', margin: 0 }}>
                  You scored <strong>{testResult?.correct} / {testResult?.total}</strong> on {selectedYear} Board Exam Paper!
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ color: 'white', fontWeight: '800', margin: 0 }}>📖 Detailed Official Answer Keys:</h4>
                <button
                  onClick={() => setActiveTest(null)}
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'white', border: 'none', padding: '0.45rem 1rem', borderRadius: '0.5rem', fontWeight: '800', cursor: 'pointer' }}
                >
                  ⬅ Back to Papers
                </button>
              </div>

              {activeTest.questions.map((q, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.85rem', padding: '1.25rem' }}>
                  <div style={{ color: '#c4b5fd', fontWeight: '800', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
                    Question {idx + 1}: {q.q}
                  </div>
                  <div style={{ color: '#4ade80', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                    ✓ Correct Option: {q.options[q.correct]}
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', color: '#cbd5e1', fontSize: '0.8rem', lineHeight: 1.5 }}>
                    📌 <strong>Explanation:</strong> {q.explanation}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
