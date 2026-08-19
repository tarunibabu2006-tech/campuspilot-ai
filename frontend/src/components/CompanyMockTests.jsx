import React, { useState, useEffect } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'

function CompanyMockTests() {
  const [companies, setCompanies] = useState([])
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [role, setRole] = useState('')
  const [difficulty, setDifficulty] = useState('medium')
  
  const [test, setTest] = useState(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get('/mock-tests/companies').then(r => setCompanies(r.data.companies || [])).catch(() => {})
  }, [])

  const startTest = async () => {
    if (!selectedCompany) { toast.error('Select a company first!'); return }
    setLoading(true)
    try {
      const r = await api.post('/mock-tests/generate', { company: selectedCompany.name, role: role || selectedCompany.roles[0], difficulty })
      setTest(r.data)
      setCurrentQ(0)
      setAnswers({})
      setResult(null)
      toast.success(`${selectedCompany.name} mock test generated! 🎯`)
    } catch {
      toast.error('Failed to generate test. Try again.')
    }
    setLoading(false)
  }

  const submitTest = () => {
    let score = 0
    let correctAns = {}
    test.questions.forEach((q, i) => {
      if (answers[i] === q.answer) score++
      correctAns[i] = q.answer
    })
    setResult({ score, total: test.questions.length, percentage: Math.round((score / test.questions.length) * 100), correctAns })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (result) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
        <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, #0d1117 0%, #1a1f35 100%)', border: `1px solid ${selectedCompany?.color || 'var(--blue)'}` }}>
          <h2 style={{ color: '#fff', margin: '0 0 0.5rem' }}>Test Completed! 🎉</h2>
          <p style={{ color: 'var(--text-muted)', margin: '0 0 1.5rem' }}>{test?.company} • {test?.role} • {test?.difficulty} Mode</p>
          
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: `4px solid ${result.percentage >= 70 ? '#10b981' : result.percentage >= 40 ? '#f59e0b' : '#ef4444'}`, marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff' }}>{result.score}/{result.total}</span>
            <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{result.percentage}%</span>
          </div>

          <div>
            <button className="btn btn-primary" onClick={() => { setResult(null); setTest(null) }}>Take Another Test</button>
          </div>
        </div>

        <h3 style={{ margin: '1rem 0 0', color: 'var(--text-primary)' }}>Detailed Analysis</h3>
        {test?.questions.map((q, i) => {
          const isCorrect = answers[i] === q.answer
          const isAttempted = answers[i] !== undefined
          return (
            <div key={i} className="card" style={{ borderLeft: `4px solid ${isCorrect ? '#10b981' : isAttempted ? '#ef4444' : '#6b7280'}`, padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '0.1rem 0.5rem', borderRadius: '12px' }}>{q.type} • {q.topic}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: isCorrect ? '#10b981' : isAttempted ? '#ef4444' : '#6b7280' }}>
                  {isCorrect ? '✅ Correct' : isAttempted ? '❌ Incorrect' : '⚪ Skipped'}
                </span>
              </div>
              <p style={{ margin: '0 0 1rem', fontSize: '1rem', color: '#fff', lineHeight: 1.5 }}>{i + 1}. {q.question}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                {q.options.map((opt, optIdx) => {
                  let bg = 'rgba(255,255,255,0.03)'
                  let border = '1px solid var(--border-color)'
                  if (optIdx === q.answer) { bg = 'rgba(16,185,129,0.1)'; border = '1px solid #10b981' }
                  else if (optIdx === answers[i] && !isCorrect) { bg = 'rgba(239,68,68,0.1)'; border = '1px solid #ef4444' }
                  
                  return (
                    <div key={optIdx} style={{ padding: '0.75rem', borderRadius: '8px', background: bg, border, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      {String.fromCharCode(65 + optIdx)}. {opt}
                    </div>
                  )
                })}
              </div>
              
              <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', padding: '0.85rem', borderRadius: '8px' }}>
                <strong style={{ color: '#60a5fa', fontSize: '0.85rem', display: 'block', marginBottom: '0.25rem' }}>💡 Explanation:</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{q.explanation}</span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  if (test) {
    const q = test.questions[currentQ]
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, color: '#fff' }}>{test.company} Mock Test</h2>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>{test.role} • Question {currentQ + 1} of {test.questions.length}</p>
          </div>
          <button className="btn btn-outline" style={{ color: '#ef4444', borderColor: '#ef4444' }} onClick={() => { if(window.confirm('Quit test?')) setTest(null) }}>Quit</button>
        </div>

        {/* Progress */}
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: `${((currentQ + 1) / test.questions.length) * 100}%`, height: '100%', background: 'var(--blue)', transition: 'width 0.3s' }} />
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'inline-block', padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            {q.type} • {q.topic}
          </div>
          <h3 style={{ margin: '0 0 1.5rem', color: '#fff', fontSize: '1.2rem', lineHeight: 1.5 }}>{currentQ + 1}. {q.question}</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setAnswers({ ...answers, [currentQ]: i })}
                style={{
                  textAlign: 'left', padding: '1rem', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s',
                  background: answers[currentQ] === i ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${answers[currentQ] === i ? '#3b82f6' : 'var(--border-color)'}`,
                  color: answers[currentQ] === i ? '#fff' : 'var(--text-secondary)'
                }}
              >
                <span style={{ display: 'inline-block', width: '24px', height: '24px', borderRadius: '50%', background: answers[currentQ] === i ? '#3b82f6' : 'rgba(255,255,255,0.1)', color: '#fff', textAlign: 'center', lineHeight: '24px', marginRight: '0.75rem', fontSize: '0.8rem' }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn btn-outline" disabled={currentQ === 0} onClick={() => setCurrentQ(prev => prev - 1)}>← Previous</button>
          
          {currentQ === test.questions.length - 1 ? (
            <button className="btn btn-primary" style={{ background: '#10b981', borderColor: '#10b981' }} onClick={submitTest}>Submit Test 📤</button>
          ) : (
            <button className="btn btn-primary" onClick={() => setCurrentQ(prev => prev + 1)}>Next Question →</button>
          )}
        </div>
        
        {/* Navigation Grid */}
        <div className="card">
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Question Palette:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {test.questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQ(i)}
                style={{
                  width: '35px', height: '35px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', cursor: 'pointer',
                  background: currentQ === i ? '#fff' : answers[i] !== undefined ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                  color: currentQ === i ? '#000' : '#fff', border: 'none'
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="card" style={{ background: 'linear-gradient(135deg, #0d1117 0%, #1a1f35 100%)', border: '1px solid rgba(245,158,11,0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '2.5rem' }}>📝</span>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.6rem', color: '#fff' }}>Company Mock Tests</h2>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Take full-length AI generated mock tests following actual company patterns.</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
        {companies.map(c => (
          <div
            key={c.name}
            onClick={() => { setSelectedCompany(c); setRole(c.roles[0]) }}
            style={{
              padding: '1.5rem', borderRadius: '12px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
              background: selectedCompany?.name === c.name ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.02)',
              border: `2px solid ${selectedCompany?.name === c.name ? c.color : 'transparent'}`
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem', color: c.color, fontWeight: '900', letterSpacing: '-1px' }}>{c.logo}</div>
            <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 'bold' }}>{c.name}</div>
          </div>
        ))}
      </div>

      {selectedCompany && (
        <div className="card" style={{ borderTop: `4px solid ${selectedCompany.color}` }}>
          <h3 style={{ marginTop: 0, color: '#fff' }}>Configure Test: {selectedCompany.name}</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label className="form-label">🎯 Target Role</label>
              <select className="form-input" value={role} onChange={e => setRole(e.target.value)}>
                {selectedCompany.roles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">🔥 Difficulty</label>
              <select className="form-input" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                <option value="easy">Easy (Initial Rounds)</option>
                <option value="medium">Medium (Standard)</option>
                <option value="hard">Hard (Advanced / NQT)</option>
              </select>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            <h4 style={{ margin: '0 0 0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>{selectedCompany.name} Interview Process</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {selectedCompany.rounds.map((r, i) => (
                <span key={i} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{i+1}. {r} {i < selectedCompany.rounds.length-1 && '→'}</span>
              ))}
            </div>
          </div>

          <button className="btn btn-primary" onClick={startTest} disabled={loading} style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', background: selectedCompany.color, borderColor: selectedCompany.color }}>
            {loading ? <span><span className="loading-spinner"/> Generating AI Mock Test...</span> : `🚀 Start ${selectedCompany.name} Mock Test`}
          </button>
        </div>
      )}
    </div>
  )
}

export default CompanyMockTests
