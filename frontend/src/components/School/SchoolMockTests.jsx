import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function SchoolMockTests({ activeSubject, selectedClass, selectedBoard }) {
  const [selectedType, setSelectedType] = useState('full') // 'chapter', 'unit', 'half', 'full'
  const [activeTest, setActiveTest] = useState(null)
  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [flagged, setFlagged] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [testSubmitted, setTestSubmitted] = useState(false)
  const [testResult, setTestResult] = useState(null)

  const MOCK_TEST_SERIES = {
    full: [
      {
        id: 'mt-full-1',
        title: `${selectedBoard} Class ${selectedClass}th ${activeSubject.name} Grand Full Syllabus Mock #1`,
        durationMins: 45,
        totalMarks: 50,
        passingPct: 60,
        questions: [
          {
            id: 'm1',
            q: 'If the zeroes of the quadratic polynomial ax² + bx + c, c ≠ 0 are equal, then:',
            options: ['c and a have opposite signs', 'c and b have opposite signs', 'c and a have the same sign', 'c and b have the same sign'],
            correct: 2,
            explanation: 'For equal roots, discriminant D = b² - 4ac = 0 => b² = 4ac. Since b² > 0, 4ac must be positive, which means a and c must have the SAME sign.'
          },
          {
            id: 'm2',
            q: 'Which of the following mirror is used by a dentist to examine a small cavity in a patient’s teeth?',
            options: ['Convex mirror', 'Plane mirror', 'Concave mirror', 'Any combination'],
            correct: 2,
            explanation: 'A concave mirror produces an erect, magnified, and virtual image when the object is placed between the pole and focus.'
          },
          {
            id: 'm3',
            q: 'The value of [(1 + tan²θ)(1 - sin θ)(1 + sin θ)] is equal to:',
            options: ['0', '1', '2', '-1'],
            correct: 1,
            explanation: '(1 + tan²θ) = sec²θ. (1 - sin θ)(1 + sin θ) = 1 - sin²θ = cos²θ. Therefore, sec²θ × cos²θ = 1.'
          }
        ]
      },
      {
        id: 'mt-full-2',
        title: `${selectedBoard} Class ${selectedClass}th ${activeSubject.name} Topper Rank Decider Mock #2`,
        durationMins: 45,
        totalMarks: 50,
        passingPct: 65,
        questions: [
          {
            id: 'm4',
            q: 'During electrolysis of water, the ratio of volume of hydrogen gas to oxygen gas collected is:',
            options: ['1 : 2', '2 : 1', '1 : 1', '8 : 1'],
            correct: 1,
            explanation: 'Water decomposition: 2H₂O ➔ 2H₂ + O₂. The mole and volume ratio of H₂ : O₂ is 2 : 1.'
          }
        ]
      }
    ],
    chapter: [
      {
        id: 'mt-ch-1',
        title: `Chapter 1 Speed Drill: Real Numbers / Chemical Equations`,
        durationMins: 20,
        totalMarks: 20,
        passingPct: 70,
        questions: [
          {
            id: 'mc1',
            q: 'The LCM of smallest two-digit composite number and smallest composite number is:',
            options: ['12', '4', '20', '40'],
            correct: 2,
            explanation: 'Smallest composite number = 4. Smallest 2-digit composite number = 10. LCM(4, 10) = 20.'
          }
        ]
      }
    ]
  }

  const currentList = MOCK_TEST_SERIES[selectedType] || MOCK_TEST_SERIES.full

  // Timer Effect
  useEffect(() => {
    let interval = null
    if (activeTest && !testSubmitted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            handleSubmitExam()
            toast.error('⏰ Time is up! Exam auto-submitted.')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeTest, testSubmitted, timeLeft])

  const launchTest = (testObj) => {
    setActiveTest(testObj)
    setCurrentQIndex(0)
    setAnswers({})
    setFlagged({})
    setTimeLeft(testObj.durationMins * 60)
    setTestSubmitted(false)
    setTestResult(null)
    toast.success(`🚀 Started: ${testObj.title}!`)
  }

  const handleSelectOption = (qId, optIdx) => {
    setAnswers(prev => ({ ...prev, [qId]: optIdx }))
  }

  const toggleFlag = (qId) => {
    setFlagged(prev => ({ ...prev, [qId]: !prev[qId] }))
  }

  const handleSubmitExam = () => {
    if (!activeTest) return
    let correct = 0
    let total = activeTest.questions.length
    activeTest.questions.forEach(q => {
      if (answers[q.id] === q.correct) correct++
    })
    const pct = Math.round((correct / total) * 100)
    const isPassed = pct >= activeTest.passingPct

    setTestResult({
      correct,
      total,
      pct,
      isPassed,
      grade: pct >= 85 ? 'A1 (Outstanding / 95+ Expected)' : pct >= 70 ? 'A2 (Strong Board Readiness)' : pct >= 50 ? 'B1 (Needs Revision)' : 'C (Focus on Basics)'
    })
    setTestSubmitted(true)
    toast.success(`Exam Evaluated: ${pct}%!`)
  }

  const currentQ = activeTest?.questions[currentQIndex]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ background: 'rgba(52,211,153,0.2)', color: '#6ee7b7', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
            50+ FULL MOCK TEST SERIES
          </span>
          <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.3rem', margin: '0.3rem 0 0' }}>
            🎯 CBT Mock Test Series & AI Evaluator ({activeSubject.name})
          </h2>
        </div>

        {/* Test Type Selectors */}
        {!activeTest && (
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {[
              { id: 'full', label: 'Full Syllabus (10 Tests)' },
              { id: 'chapter', label: 'Chapter-wise (15 Tests)' },
              { id: 'unit', label: 'Unit-wise (6 Tests)' },
              { id: 'half', label: 'Half-Yearly (4 Tests)' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '0.5rem',
                  background: selectedType === t.id ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.04)',
                  border: selectedType === t.id ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                  color: selectedType === t.id ? 'white' : '#cbd5e1',
                  fontWeight: '800',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tests Grid OR Test Runner */}
      {!activeTest ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {currentList.map(test => (
            <motion.div
              key={test.id}
              whileHover={{ y: -3 }}
              style={{
                background: 'rgba(15,23,42,0.95)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1rem',
                padding: '1.35rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.75rem' }}>
                    {test.questions.length} Questions
                  </span>
                  <span style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', padding: '0.15rem 0.45rem', borderRadius: '0.35rem', fontSize: '0.7rem', fontWeight: '800' }}>
                    {test.totalMarks} Marks
                  </span>
                </div>

                <h4 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem', margin: '0.3rem 0 0.5rem' }}>
                  {test.title}
                </h4>

                <div style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', margin: '0 0 1.25rem' }}>
                  <div>⏱️ Time Limit: <strong>{test.durationMins} Minutes</strong></div>
                  <div>🎯 Passing Benchmark: <strong style={{ color: '#4ade80' }}>{test.passingPct}%</strong></div>
                  <div>🤖 AI Diagnostic Report Included</div>
                </div>
              </div>

              <button
                onClick={() => launchTest(test)}
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                  color: 'white',
                  border: 'none',
                  padding: '0.7rem',
                  borderRadius: '0.6rem',
                  fontWeight: '900',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  boxShadow: '0 4px 15px rgba(124,58,237,0.3)'
                }}
              >
                ✍️ Start CBT Mock Test ➔
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        /* CBT Runner Screen */
        <div style={{ background: 'rgba(15,23,42,0.95)', border: '2px solid #8b5cf6', borderRadius: '1.25rem', padding: '1.75rem' }}>
          {!testSubmitted && currentQ ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.85rem' }}>
                <div>
                  <span style={{ color: '#c4b5fd', fontSize: '0.78rem', fontWeight: '800' }}>
                    Question {currentQIndex + 1} of {activeTest.questions.length}
                  </span>
                  <div style={{ color: 'white', fontWeight: '800', fontSize: '1rem' }}>{activeTest.title}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ background: 'rgba(124,58,237,0.25)', border: '1px solid #8b5cf6', padding: '0.4rem 0.85rem', borderRadius: '0.6rem', color: '#c4b5fd', fontWeight: '900', fontFamily: 'monospace' }}>
                    ⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </div>
                  <button
                    onClick={handleSubmitExam}
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', padding: '0.45rem 1rem', borderRadius: '0.5rem', fontWeight: '800', cursor: 'pointer' }}
                  >
                    Submit Test ✓
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ color: 'white', fontSize: '1.05rem', lineHeight: 1.6, margin: '0' }}>
                  {currentQ.q}
                </p>
                <button
                  onClick={() => toggleFlag(currentQ.id)}
                  style={{ background: flagged[currentQ.id] ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: flagged[currentQ.id] ? '#fbbf24' : '#cbd5e1', padding: '0.3rem 0.65rem', borderRadius: '0.4rem', fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  {flagged[currentQ.id] ? '🚩 Marked' : '🏳️ Mark Review'}
                </button>
              </div>

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
                    onClick={handleSubmitExam}
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', padding: '0.55rem 1.5rem', borderRadius: '0.5rem', fontWeight: '900', cursor: 'pointer' }}
                  >
                    Submit Test ✓
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
                  AI Grade: {testResult?.grade}
                </h3>
                <p style={{ color: '#a7f3d0', fontSize: '0.9rem', margin: 0 }}>
                  You scored <strong>{testResult?.correct} / {testResult?.total}</strong> ({testResult?.pct}%) in {activeTest.title}!
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ color: 'white', fontWeight: '800', margin: 0 }}>📖 Detailed Official Answer Keys & Explanations:</h4>
                <button
                  onClick={() => setActiveTest(null)}
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'white', border: 'none', padding: '0.45rem 1rem', borderRadius: '0.5rem', fontWeight: '800', cursor: 'pointer' }}
                >
                  ⬅ Back to Test Series
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
