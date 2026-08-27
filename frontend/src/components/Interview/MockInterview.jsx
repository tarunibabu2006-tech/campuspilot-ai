import React, { useState } from 'react'
import { getInterviewQuestions, evaluateAnswer } from '../../services/api'
import toast from 'react-hot-toast'

function MockInterview() {
  const [role, setRole] = useState('Frontend Developer')
  const [difficulty, setDifficulty] = useState('medium')
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [history, setHistory] = useState([])
  const [evaluation, setEvaluation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(60)
  const [timerInterval, setTimerInterval] = useState(null)

  const startInterview = async () => {
    setLoading(true)
    setHistory([])
    setEvaluation(null)
    setCurrentIndex(0)
    try {
      const res = await getInterviewQuestions(role, difficulty)
      const list = res.data.questions || []
      setQuestions(list)
      if (list.length > 0) {
        startQuestionTimer()
        toast.success(`Mock Interview started! 🎤`)
      } else {
        toast.error('No questions available for this role')
      }
    } catch {
      toast.error('Failed to start interview')
    }
    setLoading(false)
  }

  const startQuestionTimer = () => {
    if (timerInterval) clearInterval(timerInterval)
    setTimer(60)
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          toast.error('Time is up! Please submit your answer.')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    setTimerInterval(interval)
  }

  const submitAnswer = async () => {
    if (!answer.trim()) {
      toast.error('Please provide a response or say "Skip".')
      return
    }
    if (timerInterval) clearInterval(timerInterval)

    setLoading(true)
    const currentQ = questions[currentIndex]
    try {
      const res = await evaluateAnswer({
        question: currentQ.q,
        answer,
        role,
        difficulty
      })
      const data = res.data
      setHistory(prev => [...prev, {
        question: currentQ.q,
        answer,
        score: data.score,
        feedback: data.feedback,
        improvements: data.improvements || []
      }])
      setEvaluation(data)

      // Move to next or finish
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1)
        setAnswer('')
        startQuestionTimer()
      } else {
        toast.success('Interview Completed! 🎉 View your detailed report.')
      }
    } catch {
      toast.error('Failed to evaluate answer')
    }
    setLoading(false)
  }

  // Speak question
  const speakQuestion = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(utterance)
      toast.success('Speaking question... 🔊')
    } else {
      toast.error('Text-to-speech not supported in this browser')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Highlighted Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #1e3a8a 50%, #0f172a 100%)',
        border: '1px solid rgba(96,165,250,0.4)',
        borderRadius: '1.5rem',
        padding: '2rem',
        boxShadow: '0 8px 32px rgba(59,130,246,0.25)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>🎤</span>
            <div>
              <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '900', color: '#fff', background: 'linear-gradient(135deg, #fff, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                AI Mock Interview Simulator
              </h1>
              <p style={{ margin: '0.25rem 0 0', color: '#bfdbfe', fontSize: '0.92rem' }}>
                Role-specific technical & HR questions, speech pronunciation feedback, timer pressure & AI scoring.
              </p>
            </div>
          </div>
          <span style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: 'white', padding: '0.35rem 0.85rem', borderRadius: '0.6rem', fontWeight: '800', fontSize: '0.85rem' }}>
            Voice & Text AI
          </span>
        </div>
      </div>

      <div className="card">

      {questions.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="grid-2">
            <div className="form-group mb-0">
              <label className="form-label">Target Role</label>
              <select className="form-select" value={role} onChange={e => setRole(e.target.value)}>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="HR">HR Interview</option>
              </select>
            </div>
            <div className="form-group mb-0">
              <label className="form-label">Difficulty Level</label>
              <select className="form-select" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          <button onClick={startInterview} disabled={loading} className="btn btn-primary btn-full">
            Begin Mock Interview Session
          </button>
        </div>
      ) : (
        <div>
          {/* Active Interview Progress */}
          <div className="flex justify-between items-center mb-2">
            <span className="badge badge-info">Question {currentIndex + 1} of {questions.length}</span>
            <span className={`badge ${timer < 15 ? 'badge-danger animate-pulse' : 'badge-warning'}`}>
              ⏱️ Time Left: {timer}s
            </span>
          </div>

          <div className="result-section mb-3">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="result-title" style={{ margin: 0 }}>❓ Question</h3>
              <button
                onClick={() => speakQuestion(questions[currentIndex].q)}
                className="btn btn-outline"
                style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
              >
                🔊 Read Aloud
              </button>
            </div>
            <p className="font-bold text-sm text-blue mt-2" style={{ fontSize: '1.05rem' }}>
              {questions[currentIndex].q}
            </p>

            <div className="form-group mt-3">
              <label className="form-label">Your Response</label>
              <textarea
                className="form-textarea"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                placeholder="Structure your answer using STAR method (Situation, Task, Action, Result)..."
                rows={4}
              />
            </div>

            <button onClick={submitAnswer} disabled={loading} className="btn btn-success btn-full">
              {loading ? 'Evaluating...' : 'Submit & Next Question'}
            </button>
          </div>

          {evaluation && (
            <div className="result-section mb-3" style={{ background: 'rgba(16,185,129,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="result-title" style={{ margin: 0 }}>📊 Latest Feedback</h3>
                <span className="badge badge-safe">Score: {evaluation.score}/10</span>
              </div>
              <p className="text-sm mt-1">{evaluation.feedback}</p>
              {evaluation.improvements && evaluation.improvements.length > 0 && (
                <div className="mt-2" style={{ background: 'rgba(59,130,246,0.1)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                  <p className="text-xs font-bold text-blue">💡 Area of Improvement:</p>
                  <ul style={{ paddingLeft: '1rem', marginTop: '0.25rem' }}>
                    {evaluation.improvements.map((imp, idx) => (
                      <li key={idx} className="text-xs text-muted">{imp}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Transcript History */}
          {history.length > 0 && (
            <div className="mt-3">
              <h3 className="text-sm font-bold mb-1">📝 Interview Report Card</h3>
              {history.map((item, i) => (
                <div key={i} className="result-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <span className="badge badge-info">Q{i + 1}</span>
                    <span className="badge badge-safe">Score: {item.score}/10</span>
                  </div>
                  <p className="text-xs font-bold text-blue">Q: {item.question}</p>
                  <p className="text-xs text-muted">A: {item.answer}</p>
                  <p className="text-xs text-green">Feedback: {item.feedback}</p>
                </div>
              ))}
              <button onClick={() => { setQuestions([]); setHistory([]) }} className="btn btn-outline btn-full mt-2">
                Restart Session 🔄
              </button>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  )
}

export default MockInterview
