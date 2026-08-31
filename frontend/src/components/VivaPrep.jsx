import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { ACADEMIC_STREAMS, getSubjectStudyPack } from '../data/vivaAndExamData'

export default function VivaPrep({ language }) {
  const { user, updateUser } = useAuth()

  const [stream, setStream] = useState('Computer Science & IT')
  const [subject, setSubject] = useState(ACADEMIC_STREAMS['Computer Science & IT'][0])
  const [activeTab, setActiveTab] = useState('mock') // 'mock' | 'qna' | 'lab' | 'formulas'
  const [difficulty, setDifficulty] = useState('medium')

  // Mock Viva Session State
  const [sessionActive, setSessionActive] = useState(false)
  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [evaluation, setEvaluation] = useState(null)
  const [studyPack, setStudyPack] = useState(() => getSubjectStudyPack(ACADEMIC_STREAMS['Computer Science & IT'][0]))

  // Update pack when subject changes
  useEffect(() => {
    const pack = getSubjectStudyPack(subject)
    setStudyPack(pack)
    setSessionActive(false)
    setHistory([])
    setEvaluation(null)
    setCurrentQIndex(0)
    setAnswer('')
  }, [subject])

  const handleStreamChange = (newStream) => {
    setStream(newStream)
    const firstSub = ACADEMIC_STREAMS[newStream]?.[0] || 'General Subject'
    setSubject(firstSub)
  }

  const speakQuestion = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.rate = 0.92
      u.lang = 'en-US'
      window.speechSynthesis.speak(u)
      toast.success('🔊 Reading question aloud...')
    } else {
      toast.error('Text-to-speech not supported in this browser.')
    }
  }

  const startMockViva = () => {
    setSessionActive(true)
    setCurrentQIndex(0)
    setHistory([])
    setEvaluation(null)
    setAnswer('')
    toast.success(`🎤 ${subject} Viva Session Started!`)
  }

  const submitAnswer = async () => {
    if (!answer.trim()) {
      toast.error('Please type or speak your answer before submitting!')
      return
    }

    setLoading(true)
    const currentQ = studyPack.viva[currentQIndex] || { q: 'Explain core concept', diff: 'medium' }

    let evalResult = null
    try {
      const res = await axios.post('/api/viva-prep', {
        subject,
        difficulty,
        question: currentQ.q,
        answer,
        stream,
        language
      })
      evalResult = res.data
    } catch {
      // Local fallback evaluation
      const words = answer.trim().split(/\s+/).length
      const score = Math.min(10, Math.max(4, Math.round(5 + words / 12)))
      evalResult = {
        score,
        feedback: score >= 7
          ? 'Well-articulated answer demonstrating solid conceptual understanding.'
          : 'Good attempt. Include more technical terminology and practical examples to impress examiners.',
        improvements: ['Cite standard definitions', 'Mention practical applications', 'Keep answers concise and confident']
      }
    }

    const newHistory = [...history, {
      question: currentQ.q,
      answer,
      score: evalResult.score || 8,
      feedback: evalResult.feedback
    }]
    setHistory(newHistory)
    setEvaluation(evalResult)

    if (user) {
      updateUser({ ...user, xp: (user?.xp || 0) + 15 })
    }

    if (currentQIndex + 1 < studyPack.viva.length) {
      setCurrentQIndex(prev => prev + 1)
      setAnswer('')
    } else {
      toast.success('🎉 Viva completed! Review your performance report.')
    }
    setLoading(false)
  }

  const totalScore = history.length > 0
    ? Math.round(history.reduce((s, h) => s + (h.score || 0), 0) / history.length)
    : 0

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* ── HEADER BANNER ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #1e3a8a 45%, #0f172a 100%)',
          borderRadius: '1.5rem',
          padding: '2rem',
          border: '1px solid rgba(96,165,250,0.4)',
          boxShadow: '0 8px 32px rgba(59,130,246,0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '2.5rem' }}>🎤</span>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
                All-Subject Viva Voice & Lab Examination Preparation
              </h1>
              <p style={{ color: '#bfdbfe', fontSize: '0.85rem', margin: 0 }}>
                Interactive AI Mock Viva · Top 50 FAQs · Lab Practical Questions · Rapid Formula Recaps across all disciplines
              </p>
            </div>
          </div>
        </div>
        <span style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: 'white', padding: '0.4rem 1rem', borderRadius: '2rem', fontWeight: '800', fontSize: '0.82rem' }}>
          University & Lab Ready
        </span>
      </motion.div>

      {/* ── STREAM & SUBJECT SELECTOR ──────────────────────────────── */}
      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '1.25rem',
          padding: '1.25rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem'
        }}
      >
        <div>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.35rem', fontWeight: '700' }}>
            📚 1. Select Discipline / Stream:
          </label>
          <select
            value={stream}
            onChange={e => handleStreamChange(e.target.value)}
            style={{
              width: '100%',
              background: '#1e1b4b',
              border: '1px solid rgba(139,92,246,0.4)',
              borderRadius: '0.65rem',
              padding: '0.65rem 0.9rem',
              color: 'white',
              fontSize: '0.88rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {Object.keys(ACADEMIC_STREAMS).map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.35rem', fontWeight: '700' }}>
            📖 2. Select Subject:
          </label>
          <select
            value={subject}
            onChange={e => setSubject(e.target.value)}
            style={{
              width: '100%',
              background: '#1e1b4b',
              border: '1px solid rgba(59,130,246,0.4)',
              borderRadius: '0.65rem',
              padding: '0.65rem 0.9rem',
              color: 'white',
              fontSize: '0.88rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {(ACADEMIC_STREAMS[stream] || []).map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.35rem', fontWeight: '700' }}>
            ⚡ 3. Viva Difficulty Level:
          </label>
          <select
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
            style={{
              width: '100%',
              background: '#1e1b4b',
              border: '1px solid rgba(59,130,246,0.4)',
              borderRadius: '0.65rem',
              padding: '0.65rem 0.9rem',
              color: 'white',
              fontSize: '0.88rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="easy">🟢 Easy (Basic Definitions & Concepts)</option>
            <option value="medium">🟡 Medium (Standard University External Viva)</option>
            <option value="hard">🔴 Hard (Deep Dive & Edge Cases)</option>
          </select>
        </div>
      </div>

      {/* ── MODE TABS ──────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {[
          { id: 'mock', icon: '🎤', label: 'Interactive AI Mock Viva' },
          { id: 'qna', icon: '📋', label: 'Top 50 Most Frequently Asked Q&As' },
          { id: 'lab', icon: '🔬', label: 'Lab Practical & Procedure Questions' },
          { id: 'formulas', icon: '⚡', label: 'Rapid Formula & Key Concepts Sheet' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.65rem 1.1rem',
              borderRadius: '0.75rem',
              fontWeight: '800',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: activeTab === tab.id
                ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                : 'rgba(255,255,255,0.05)',
              color: activeTab === tab.id ? 'white' : '#94a3b8',
              border: activeTab === tab.id ? 'none' : '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          TAB 1: LIVE INTERACTIVE MOCK VIVA
      ════════════════════════════════════════════════════════════════ */}
      {activeTab === 'mock' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {!sessionActive ? (
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1.25rem',
                padding: '2rem',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎙️</div>
              <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.4rem', margin: '0 0 0.5rem' }}>
                Simulate University External Viva for {subject}
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                Face realistic viva questions with text-to-speech examiner audio, instant score ratings out of 10, confidence feedback, and XP points.
              </p>
              <button
                onClick={startMockViva}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.75rem',
                  padding: '0.85rem 2rem',
                  fontWeight: '900',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(59,130,246,0.35)'
                }}
              >
                🚀 Begin Mock Viva Session ➔
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Progress & Controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ color: '#60a5fa', fontWeight: '800', fontSize: '0.9rem' }}>
                  Question {currentQIndex + 1} of {studyPack.viva.length}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => speakQuestion(studyPack.viva[currentQIndex]?.q || '')}
                    style={{ background: 'rgba(255,255,255,0.08)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.5rem', padding: '0.35rem 0.75rem', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}
                  >
                    🔊 Read Question
                  </button>
                  <button
                    onClick={() => setSessionActive(false)}
                    style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.5rem', padding: '0.35rem 0.75rem', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}
                  >
                    End Viva
                  </button>
                </div>
              </div>

              {/* Question Card */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #1e1b4b, #0f172a)',
                  border: '1px solid rgba(139,92,246,0.35)',
                  borderRadius: '1.25rem',
                  padding: '1.75rem'
                }}
              >
                <div style={{ color: '#fbbf24', fontSize: '0.78rem', fontWeight: '800', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  👨‍🏫 Examiner Question ({studyPack.viva[currentQIndex]?.diff || 'medium'}):
                </div>
                <h3 style={{ color: 'white', fontSize: '1.2rem', fontWeight: '800', lineHeight: 1.5, margin: '0 0 1.25rem' }}>
                  "{studyPack.viva[currentQIndex]?.q}"
                </h3>

                <textarea
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  placeholder="Type your spoken viva response here... (Explain core concepts, definitions, and examples clearly)"
                  style={{
                    width: '100%',
                    height: '140px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    color: 'white',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    outline: 'none',
                    resize: 'vertical',
                    marginBottom: '1rem'
                  }}
                />

                <button
                  onClick={submitAnswer}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    borderRadius: '0.75rem',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    fontWeight: '900',
                    fontSize: '1rem',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? '🤖 AI Evaluating Response...' : 'Submit Viva Answer & Next Question ➔'}
                </button>
              </div>

              {/* Latest Evaluation */}
              {evaluation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '1rem',
                    padding: '1.25rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#4ade80', fontWeight: '900' }}>📊 Examiner Rating: {evaluation.score}/10</span>
                    <span style={{ color: '#fbbf24', fontSize: '0.8rem', fontWeight: '700' }}>+15 XP Earned</span>
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: '0 0 0.5rem', lineHeight: 1.5 }}>
                    {evaluation.feedback}
                  </p>
                </motion.div>
              )}

              {/* History */}
              {history.length > 0 && (
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '1.25rem' }}>
                  <h4 style={{ color: 'white', margin: '0 0 0.75rem', fontSize: '0.95rem', fontWeight: '800' }}>
                    📝 Session Review (Avg Score: {totalScore}/10)
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {history.map((h, i) => (
                      <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.6rem', padding: '0.85rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#60a5fa', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                          <span>Q{i + 1}: {h.question}</span>
                          <span style={{ color: '#4ade80' }}>Score: {h.score}/10</span>
                        </div>
                        <div style={{ color: '#cbd5e1', fontSize: '0.8rem', fontStyle: 'italic' }}>Your answer: "{h.answer}"</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          TAB 2: TOP 50 VIVA Q&As
      ════════════════════════════════════════════════════════════════ */}
      {activeTab === 'qna' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.15rem', margin: 0 }}>
              📋 High-Yield Viva Questions & Verified Answers for {subject}
            </h3>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{studyPack.viva.length} Essential Questions</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {studyPack.viva.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '1rem',
                  padding: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{ color: '#60a5fa', fontWeight: '800', fontSize: '0.98rem' }}>
                    Q{idx + 1}. {item.q}
                  </div>
                  <span
                    style={{
                      background: item.diff === 'easy' ? 'rgba(74,222,128,0.15)' : item.diff === 'medium' ? 'rgba(251,191,36,0.15)' : 'rgba(239,68,68,0.15)',
                      color: item.diff === 'easy' ? '#4ade80' : item.diff === 'medium' ? '#fbbf24' : '#f87171',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '0.4rem',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      flexShrink: 0
                    }}
                  >
                    {item.diff}
                  </span>
                </div>
                <div style={{ color: '#e2e8f0', fontSize: '0.88rem', lineHeight: 1.6, background: 'rgba(0,0,0,0.25)', padding: '0.85rem 1rem', borderRadius: '0.65rem' }}>
                  <strong style={{ color: '#4ade80' }}>Ideal Viva Answer: </strong>
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          TAB 3: LAB PRACTICAL QUESTIONS
      ════════════════════════════════════════════════════════════════ */}
      {activeTab === 'lab' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '1rem', padding: '1.25rem' }}>
            <h3 style={{ color: '#60a5fa', fontWeight: '900', fontSize: '1.1rem', margin: '0 0 0.4rem' }}>
              🔬 Lab Practical & Experiment Viva Protocols
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: 0 }}>
              Standard lab examiner questions on experimental procedures, error sources, precautions, and equipment calibration.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>
              <h4 style={{ color: '#fbbf24', margin: '0 0 0.5rem', fontWeight: '800' }}>⚠️ Key Precautions & Error Sources</h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.7 }}>
                <li>Proper grounding and zero-error calibration before taking readings</li>
                <li>Eliminating parallax error when reading analog scales or meters</li>
                <li>Ensuring clean, secure connections to prevent loose-contact noise</li>
                <li>Documenting ambient temperature and environmental test conditions</li>
              </ul>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>
              <h4 style={{ color: '#4ade80', margin: '0 0 0.5rem', fontWeight: '800' }}>🎯 What Examiners Look For</h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.7 }}>
                <li>Clear understanding of the underlying theoretical equation</li>
                <li>Ability to interpret the graphs, slopes, and cutoff points</li>
                <li>Explaining how parameter changes affect final outputs</li>
                <li>Real-world industrial application of the lab experiment</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          TAB 4: RAPID FORMULAS & CHEAT SHEET
      ════════════════════════════════════════════════════════════════ */}
      {activeTab === 'formulas' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '1rem', padding: '1.25rem' }}>
            <h3 style={{ color: '#fbbf24', fontWeight: '900', fontSize: '1.1rem', margin: '0 0 0.4rem' }}>
              ⚡ Last-Minute Rapid Formula & Concept Cheat Sheet
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: 0 }}>
              Essential laws, complexity bounds, equations, and quick facts for immediate revision.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {studyPack.cheatSheet.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.75rem',
                  padding: '1rem 1.25rem',
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  fontWeight: '700',
                  fontFamily: 'monospace',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <span style={{ color: '#fbbf24' }}>📌</span> {item}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
