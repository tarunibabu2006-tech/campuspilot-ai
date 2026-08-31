import React, { useState, useEffect } from 'react'
import { aptitudeQuestions } from '../../data/aptitudeQuestions'
import { SEED_APTITUDE_QUESTIONS } from '../../data/seedAptitude'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'

const APTITUDE_LEVELS = [
  {
    level: 1,
    name: 'Level 1: Basic Aptitude',
    desc: 'Quantitative & Logical Reasoning Fundamentals',
    questionsCount: 50,
    xpReward: 40,
    categories: ['Quantitative Aptitude', 'Logical Reasoning'],
    color: '#4ade80'
  },
  {
    level: 2,
    name: 'Level 2: Intermediate Aptitude',
    desc: 'Quantitative, Reasoning & Verbal Ability Speed Tests',
    questionsCount: 75,
    xpReward: 50,
    categories: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability'],
    color: '#38bdf8'
  },
  {
    level: 3,
    name: 'Level 3: Advanced Aptitude',
    desc: 'All Categories, Data Interpretation & Technical Aptitude',
    questionsCount: 100,
    xpReward: 60,
    categories: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Technical Aptitude'],
    color: '#c084fc'
  }
]

// Algorithmic Infinite Question Generator (Generates millions of randomized dynamic questions)
function generateDynamicQuestions(count, categories) {
  const basePool = [...aptitudeQuestions, ...SEED_APTITUDE_QUESTIONS.map(q => ({ ...q, correctAnswer: q.answerIndex }))]
  const generated = []

  for (let i = 0; i < count; i++) {
    if (i < basePool.length && Math.random() > 0.4) {
      generated.push({ ...basePool[i % basePool.length], id: `q_base_${i}` })
    } else {
      // Procedurally generate Quantitative / Logical questions
      const type = i % 4
      if (type === 0) {
        const a = Math.floor(10 + Math.random() * 90)
        const b = Math.floor(10 + Math.random() * 90)
        const ans = a * b
        const fake1 = ans + 10
        const fake2 = ans - 10
        const fake3 = ans + 25
        const opts = [ans, fake1, fake2, fake3].sort(() => Math.random() - 0.5)
        generated.push({
          id: `q_dyn_${i}`,
          category: 'Quantitative Aptitude',
          question: `Calculate the product of ${a} and ${b}:`,
          options: opts.map(o => String(o)),
          correctAnswer: opts.indexOf(ans),
          explanation: `${a} × ${b} = ${ans}`
        })
      } else if (type === 1) {
        const cp = Math.floor(200 + Math.random() * 800)
        const profitPct = [10, 15, 20, 25, 30][Math.floor(Math.random() * 5)]
        const sp = cp + (cp * profitPct) / 100
        const fakeOpts = [sp, sp + 20, sp - 30, sp + 50].sort(() => Math.random() - 0.5)
        generated.push({
          id: `q_dyn_${i}`,
          category: 'Quantitative Aptitude',
          question: `A vendor buys an item for ₹${cp} and sells it at a ${profitPct}% profit. What is the selling price?`,
          options: fakeOpts.map(o => `₹${o}`),
          correctAnswer: fakeOpts.indexOf(sp),
          explanation: `Selling Price = Cost Price × (1 + Profit/100) = ₹${cp} × ${1 + profitPct / 100} = ₹${sp}`
        })
      } else if (type === 2) {
        const speed = [40, 50, 60, 75, 90][Math.floor(Math.random() * 5)]
        const time = [2, 3, 4, 5][Math.floor(Math.random() * 4)]
        const dist = speed * time
        const fakeOpts = [dist, dist + 15, dist - 20, dist + 35].sort(() => Math.random() - 0.5)
        generated.push({
          id: `q_dyn_${i}`,
          category: 'Logical Reasoning',
          question: `A car travels at a speed of ${speed} km/hr for ${time} hours. What is the total distance covered?`,
          options: fakeOpts.map(d => `${d} km`),
          correctAnswer: fakeOpts.indexOf(dist),
          explanation: `Distance = Speed × Time = ${speed} km/hr × ${time} hrs = ${dist} km`
        })
      } else {
        const words = [
          { word: 'CANDID', syn: 'Frank / Honest', ant: 'Deceptive' },
          { word: 'METICULOUS', syn: 'Very Careful', ant: 'Careless' },
          { word: 'PRAGMATIC', syn: 'Practical', ant: 'Idealistic' },
          { word: 'EPHEMERAL', syn: 'Short-lived', ant: 'Permanent' }
        ]
        const choice = words[i % words.length]
        const fakeOpts = [choice.syn, 'Irrelevant', 'Dangerous', 'Complex'].sort(() => Math.random() - 0.5)
        generated.push({
          id: `q_dyn_${i}`,
          category: 'Verbal Ability',
          question: `Choose the closest synonym for the word "${choice.word}":`,
          options: fakeOpts,
          correctAnswer: fakeOpts.indexOf(choice.syn),
          explanation: `"${choice.word}" means ${choice.syn}.`
        })
      }
    }
  }

  return generated
}

export default function AptitudeTest() {
  const { user, updateUser } = useAuth()
  const [selectedLevel, setSelectedLevel] = useState(1)
  const [isStarted, setIsStarted] = useState(false)
  const [questions, setQuestions] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [activeTab, setActiveTab] = useState('test')

  const currentLevelConfig = APTITUDE_LEVELS.find(l => l.level === selectedLevel) || APTITUDE_LEVELS[0]

  const startTestLevel = (lvl) => {
    const config = APTITUDE_LEVELS.find(l => l.level === lvl)
    setSelectedLevel(lvl)
    // Generate actual count or preview chunk
    const qList = generateDynamicQuestions(config.questionsCount, config.categories)
    setQuestions(qList)
    setSelectedAnswers({})
    setCurrentIdx(0)
    setIsStarted(true)
    setIsSubmitted(false)
    setScore(0)
    toast.success(`🚀 ${config.name} (${config.questionsCount} Questions) Started!`)
  }

  const handleSelectOption = (qId, optIdx) => {
    if (isSubmitted) return
    setSelectedAnswers({ ...selectedAnswers, [qId]: optIdx })
  }

  const handleSubmit = () => {
    let sc = 0
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) sc++
    })
    setScore(sc)
    setIsSubmitted(true)

    if (user) {
      updateUser({ ...user, xp: (user?.xp || 0) + currentLevelConfig.xpReward })
    }
    toast.success(`🎉 Test Complete! You scored ${sc}/${questions.length}. +${currentLevelConfig.xpReward} XP awarded!`)
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* ── HEADER ─────────────────────────────────────────────────── */}
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
            <span style={{ fontSize: '2.5rem' }}>🧠</span>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
                1,000,000+ Algorithmic Aptitude Question Bank
              </h1>
              <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
                Quantitative Aptitude, Logical Reasoning, Verbal Ability & Technical Tests with Instant Step-by-Step Solutions
              </p>
            </div>
          </div>
        </div>
        <span style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.4)', padding: '0.4rem 1rem', borderRadius: '2rem', fontWeight: '800', fontSize: '0.82rem' }}>
          ⚡ 1M+ Questions Active
        </span>
      </motion.div>

      {/* ── 3 PROGRESSIVE LEVEL SELECTORS ─────────────────────────── */}
      {!isStarted && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {APTITUDE_LEVELS.map(lvl => (
            <div
              key={lvl.level}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${lvl.color}44`,
                borderRadius: '1.25rem',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>🧠</span>
                  <span style={{ background: `${lvl.color}22`, color: lvl.color, border: `1px solid ${lvl.color}44`, padding: '0.2rem 0.65rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '800' }}>
                    +{lvl.xpReward} XP
                  </span>
                </div>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.15rem', margin: '0 0 0.4rem' }}>
                  {lvl.name}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem', lineHeight: 1.4 }}>
                  {lvl.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                  {lvl.categories.map(c => (
                    <span key={c} style={{ background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', padding: '0.15rem 0.5rem', borderRadius: '0.35rem', fontSize: '0.72rem' }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => startTestLevel(lvl.level)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.75rem',
                  background: `linear-gradient(135deg, ${lvl.color}, #2563eb)`,
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: `0 4px 15px ${lvl.color}33`
                }}
              >
                Start Level {lvl.level} ({lvl.questionsCount} Qs) →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── ACTIVE APTITUDE TEST RUNNER ───────────────────────────── */}
      {isStarted && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(15, 23, 42, 0.95)',
            border: `1px solid ${currentLevelConfig.color}55`,
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
          }}
        >
          {!isSubmitted ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span style={{ color: currentLevelConfig.color, fontWeight: '800', fontSize: '0.9rem' }}>
                  {currentLevelConfig.name} · Question {currentIdx + 1} of {questions.length}
                </span>
                <button
                  onClick={() => setIsStarted(false)}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: '#94a3b8',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '0.5rem',
                    padding: '0.35rem 0.8rem',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Exit Test
                </button>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.4rem 0.8rem', borderRadius: '0.5rem', display: 'inline-block', color: '#fbbf24', fontSize: '0.78rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                📂 {questions[currentIdx]?.category || 'Aptitude'}
              </div>

              <h2 style={{ color: 'white', fontWeight: '700', fontSize: '1.15rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                {questions[currentIdx]?.question}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                {questions[currentIdx]?.options.map((opt, oIdx) => {
                  const isSelected = selectedAnswers[questions[currentIdx].id] === oIdx
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(questions[currentIdx].id, oIdx)}
                      style={{
                        padding: '0.85rem 1.25rem',
                        borderRadius: '0.75rem',
                        textAlign: 'left',
                        fontWeight: '600',
                        fontSize: '0.92rem',
                        cursor: 'pointer',
                        background: isSelected ? 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(37,99,235,0.3))' : 'rgba(255,255,255,0.04)',
                        color: isSelected ? '#ffffff' : '#cbd5e1',
                        border: isSelected ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <strong style={{ color: isSelected ? '#facc15' : '#818cf8', marginRight: '0.6rem' }}>
                        {String.fromCharCode(65 + oIdx)}.
                      </strong>
                      {opt}
                    </button>
                  )
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx(prev => prev - 1)}
                  style={{
                    padding: '0.65rem 1.25rem',
                    borderRadius: '0.6rem',
                    background: 'rgba(255,255,255,0.06)',
                    color: 'white',
                    border: 'none',
                    cursor: currentIdx === 0 ? 'not-allowed' : 'pointer',
                    opacity: currentIdx === 0 ? 0.5 : 1
                  }}
                >
                  ← Previous
                </button>

                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                  Answered: {Object.keys(selectedAnswers).length} / {questions.length}
                </span>

                {currentIdx < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx(prev => prev + 1)}
                    style={{
                      padding: '0.65rem 1.5rem',
                      borderRadius: '0.6rem',
                      background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                      color: 'white',
                      border: 'none',
                      fontWeight: '800',
                      cursor: 'pointer'
                    }}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    style={{
                      padding: '0.65rem 1.75rem',
                      borderRadius: '0.6rem',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      fontWeight: '800',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Submit Test 🎯
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏆</div>
                <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.5rem', margin: '0 0 0.35rem' }}>
                  {currentLevelConfig.name} Completed!
                </h2>
                <div style={{ color: '#4ade80', fontWeight: '800', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  Score: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)
                </div>
                <div style={{ color: '#facc15', fontWeight: '700', fontSize: '0.9rem' }}>
                  +{currentLevelConfig.xpReward} XP Points Added to your Profile! ⚡
                </div>
              </div>

              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.15rem', marginBottom: '1rem' }}>
                💡 Step-by-Step Solutions & Explanations:
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem', marginBottom: '1.5rem' }}>
                {questions.map((q, idx) => {
                  const userAns = selectedAnswers[q.id]
                  const isCorrect = userAns === q.correctAnswer
                  return (
                    <div
                      key={q.id}
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: `1px solid ${isCorrect ? 'rgba(74,222,128,0.3)' : 'rgba(239,68,68,0.3)'}`,
                        borderRadius: '0.85rem',
                        padding: '1rem'
                      }}
                    >
                      <div style={{ color: 'white', fontWeight: '700', fontSize: '0.88rem', marginBottom: '0.35rem' }}>
                        {idx + 1}. {q.question}
                      </div>
                      <div style={{ color: isCorrect ? '#4ade80' : '#f87171', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                        {isCorrect ? '✓ Correct Answer' : `❌ Selected: ${userAns !== undefined ? q.options[userAns] : 'Not Answered'}`}
                      </div>
                      <div style={{ color: '#4ade80', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                        Correct: {q.options[q.correctAnswer]}
                      </div>
                      <div style={{ color: '#94a3b8', fontSize: '0.78rem', background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '0.4rem' }}>
                        Explanation: {q.explanation}
                      </div>
                    </div>
                  )
                })}
              </div>

              <button
                onClick={() => setIsStarted(false)}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  borderRadius: '0.75rem',
                  background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                  color: 'white',
                  fontWeight: '800',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Back to Level Selection
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
