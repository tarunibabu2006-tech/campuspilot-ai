import React, { useState, useEffect } from 'react'
import { getAptitudeQuestions, submitAptitudeTest } from '../../services/api'
import { aptitudeQuestions } from '../../data/aptitudeQuestions'
import toast from 'react-hot-toast'

function AptitudeTest() {
  const [category, setCategory] = useState('verbal')
  const [questions, setQuestions] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes timer
  const [isStarted, setIsStarted] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [resultsReport, setResultsReport] = useState(null)
  const [timerInterval, setTimerInterval] = useState(null)

  useEffect(() => {
    if (isStarted && !isSubmitted && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            handleSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      setTimerInterval(interval)
      return () => clearInterval(interval)
    }
  }, [isStarted, isSubmitted, timeLeft])

  const startTest = async () => {
    try {
      const catKey = category.charAt(0).toUpperCase() + category.slice(1)
      const filtered = aptitudeQuestions.filter(q => q.category.toLowerCase() === category.toLowerCase())
      // Pick 15 random questions from 250+ in this category
      const shuffled = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 15)
      setQuestions(shuffled.length > 0 ? shuffled : aptitudeQuestions.slice(0, 15))
      setSelectedAnswers({})
      setCurrentIdx(0)
      setTimeLeft(600)
      setIsStarted(true)
      setIsSubmitted(false)
      setResultsReport(null)
      toast.success(`Aptitude test started! 15 Questions • 10 Mins 🧠`)
    } catch {
      toast.error('Failed to load questions')
    }
  }

  const handleSelect = (optionIdx) => {
    if (isSubmitted) return
    setSelectedAnswers(prev => ({ ...prev, [questions[currentIdx].id]: optionIdx }))
  }

  const handleSubmit = async () => {
    if (timerInterval) clearInterval(timerInterval)
    setIsSubmitted(true)

    // Format answers array
    const formattedAnswers = Object.entries(selectedAnswers).map(([qId, val]) => ({
      questionId: qId,
      selectedOption: val
    }))

    try {
      const res = await submitAptitudeTest({
        answers: formattedAnswers,
        category,
        timeTaken: 600 - timeLeft
      })
      setResultsReport(res.data)
      toast.success('Test submitted successfully! 🏁')
    } catch {
      toast.error('Failed to submit results')
    }
  }

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60)
    const s = secs % 60
    return `${mins}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-1">
        <h2 className="card-title" style={{ marginBottom: 0 }}>🧠 Quantitative & Logical Aptitude Test</h2>
        {isStarted && !isSubmitted && (
          <span className={`badge ${timeLeft < 60 ? 'badge-danger animate-pulse' : 'badge-warning'}`} style={{ fontSize: '0.85rem' }}>
            ⏱️ Timer: {formatTime(timeLeft)}
          </span>
        )}
      </div>
      <p className="card-subtitle">100+ questions across Verbal, Quantitative, Logical Reasoning, and Data Interpretation!</p>

      {!isStarted ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Choose Category Track</label>
            <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="verbal">Verbal Ability & Grammar</option>
              <option value="quantitative">Quantitative Aptitude</option>
              <option value="logical">Logical Reasoning</option>
              <option value="dataInterpretation">Data Interpretation</option>
            </select>
          </div>
          <button onClick={startTest} className="btn btn-primary btn-full">
            🚀 Start 10-Minute Timed Mock Test
          </button>
        </div>
      ) : (
        <div>
          {/* Question Navigation Pills */}
          <div className="flex flex-wrap gap-1 mb-3" style={{ maxHeight: '100px', overflowY: 'auto' }}>
            {questions.map((q, i) => {
              const answered = selectedAnswers[q.id] !== undefined
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(i)}
                  className={`nav-tab ${currentIdx === i ? 'active' : ''}`}
                  style={{
                    background: answered ? 'rgba(16,185,129,0.2)' : undefined,
                    borderColor: answered ? 'var(--accent-green)' : undefined
                  }}
                >
                  Q{i + 1}
                </button>
              )
            })}
          </div>

          {/* Current Question */}
          {questions.length > 0 && (
            <div className="result-section mb-3">
              <span className="badge badge-info mb-1">Question {currentIdx + 1} of {questions.length}</span>
              <p className="font-bold text-sm text-blue mb-3" style={{ fontSize: '1.05rem' }}>
                {questions[currentIdx].question}
              </p>

              <div className="space-y-2">
                {questions[currentIdx].options.map((opt, i) => {
                  const isSelected = selectedAnswers[questions[currentIdx].id] === i
                  let bg = 'var(--bg-card)'
                  let border = '1px solid var(--border-color)'

                  if (isSubmitted) {
                    if (i === questions[currentIdx].answer) {
                      bg = 'rgba(16,185,129,0.2)'
                      border = '1px solid var(--green)'
                    } else if (isSelected) {
                      bg = 'rgba(239,68,68,0.2)'
                      border = '1px solid var(--danger)'
                    }
                  } else if (isSelected) {
                    bg = 'rgba(59,130,246,0.2)'
                    border = '1px solid var(--blue)'
                  }

                  return (
                    <div
                      key={i}
                      onClick={() => handleSelect(i)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: bg,
                        border: border,
                        cursor: isSubmitted ? 'default' : 'pointer',
                        fontWeight: isSelected ? 600 : 400,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {String.fromCharCode(65 + i)}. {opt}
                    </div>
                  )
                })}
              </div>

              {isSubmitted && (
                <div className="mt-3" style={{ padding: '0.75rem', background: 'rgba(59,130,246,0.1)', borderRadius: 'var(--radius-sm)' }}>
                  <p className="text-xs font-bold text-blue">💡 Explanation:</p>
                  <p className="text-xs text-muted mt-1">{questions[currentIdx].explanation}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="btn btn-outline"
            >
              ← Previous
            </button>

            {!isSubmitted ? (
              <button onClick={handleSubmit} className="btn btn-success">
                🏁 Submit Test
              </button>
            ) : (
              resultsReport && (
                <span className="badge badge-safe" style={{ fontSize: '0.9rem', padding: '0.4rem 0.8rem' }}>
                  Score: {resultsReport.score}% ({resultsReport.grade})
                </span>
              )
            )}

            <button
              onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentIdx === questions.length - 1}
              className="btn btn-outline"
            >
              Next →
            </button>
          </div>

          {isSubmitted && resultsReport && (
            <div className="result-section mt-3">
              <h3 className="result-title">📊 Final Performance Summary</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">{resultsReport.correct}</div>
                  <div className="stat-label">Correct Answers</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{resultsReport.wrong}</div>
                  <div className="stat-label">Wrong Answers</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{resultsReport.grade}</div>
                  <div className="stat-label">Final Grade</div>
                </div>
              </div>
              <p className="text-sm mt-3 text-center" style={{ fontWeight: 'bold' }}>{resultsReport.message}</p>
              <button onClick={() => setIsStarted(false)} className="btn btn-outline btn-full mt-2">
                Back to Category Select 🔄
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AptitudeTest
