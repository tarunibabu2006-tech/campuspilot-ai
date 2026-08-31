import React, { useState } from 'react'
import { aptitudeQuestions } from '../../data/aptitudeQuestions'
import { SEED_APTITUDE_QUESTIONS } from '../../data/seedAptitude'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'

const APTITUDE_LEVELS = [
  {
    level: 1,
    name: 'Level 1: Basic Aptitude (Easy)',
    desc: 'Foundational arithmetic, speed math, basic percentages and series',
    questionsCount: 25,
    xpReward: 40,
    categories: ['Quantitative Aptitude', 'Logical Reasoning'],
    color: '#4ade80'
  },
  {
    level: 2,
    name: 'Level 2: Intermediate Aptitude',
    desc: 'Time-speed-distance, profit-loss, syllogisms, blood relations & verbal ability',
    questionsCount: 50,
    xpReward: 50,
    categories: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability'],
    color: '#38bdf8'
  },
  {
    level: 3,
    name: 'Level 3: Advanced Aptitude (Hard)',
    desc: 'Permutations, combinations, probability, data interpretation & critical reasoning',
    questionsCount: 75,
    xpReward: 60,
    categories: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Technical Aptitude'],
    color: '#c084fc'
  },
  {
    level: 4,
    name: 'Level 4: Very Hardest Level (Placement Qualifier)',
    desc: 'CAT/GATE level complex puzzle caselets, advanced geometry & multi-variable data sufficiency',
    questionsCount: 100,
    xpReward: 100,
    categories: ['High-Order Data Interpretation', 'Advanced Quant Caselets', 'Complex Logical Grid Puzzles'],
    color: '#f43f5e'
  }
]

const APTITUDE_LEARNING_MODULES = [
  {
    title: '1. Time, Work & Pipes & Cisterns',
    category: 'Quantitative Aptitude',
    formula: 'Total Work = LCM of individual times. Combined Work Rate = Sum of individual efficiencies.',
    trick: 'Convert days into units of work. If A does in 12 days and B in 15 days, total work = 60 units (A=5u/day, B=4u/day). Together 9u/day → 60/9 = 6.66 days.',
    example: 'A and B can complete a project in 10 and 20 days. Together: 20 units / (2 + 1) = 6.67 days.'
  },
  {
    title: '2. Speed, Distance, Trains & Boats',
    category: 'Quantitative Aptitude',
    formula: 'Distance = Speed × Time. Relative speed in opposite direction = S1 + S2; Same direction = |S1 - S2|.',
    trick: 'Conversion: km/hr to m/s multiply by 5/18. For boat downstream = B + S; upstream = B - S.',
    example: 'Train 150m long traveling at 54 km/hr (15 m/s) crosses a pole in 150/15 = 10 seconds.'
  },
  {
    title: '3. Profit, Loss, Discount & False Weights',
    category: 'Quantitative Aptitude',
    formula: 'Profit% = (Profit / CP) × 100. Effective discount of D1% and D2% = D1 + D2 - (D1×D2)/100.',
    trick: 'Gain is always calculated on Cost Price. Discount is always calculated on Marked Price.',
    example: 'Successive discounts of 20% and 10% = 20 + 10 - 2 = 28% total discount.'
  },
  {
    title: '4. Syllogisms, Venn Diagrams & Blood Relations',
    category: 'Logical Reasoning',
    formula: 'Draw standard Venn circles. "Some A are B" (overlapping). "All A are B" (A inside B).',
    trick: 'If any possibility contradicts the given conclusion, the conclusion is FALSE.',
    example: 'All Cats are Dogs. All Dogs are Mammals. Conclusion: All Cats are Mammals (Valid).'
  },
  {
    title: '5. Complex Circular & Linear Seating Puzzles (Hardest)',
    category: 'Logical Reasoning (Level 4)',
    formula: 'Circular arrangement: Facing center → Left is Clockwise, Right is Counter-Clockwise.',
    trick: 'Fix the person with maximum relative constraints first to eliminate multiple cases rapidly.',
    example: '8 people sitting around a circle with alternating inside/outside facing directions.'
  }
]

function generateAptitudeQuestions(count, level) {
  const basePool = [...aptitudeQuestions, ...SEED_APTITUDE_QUESTIONS.map(q => ({ ...q, correctAnswer: q.answerIndex }))]
  const generated = []

  for (let i = 0; i < count; i++) {
    if (i < basePool.length && level <= 2) {
      generated.push({ ...basePool[i % basePool.length], id: `q_base_${i}` })
    } else {
      const type = i % 4
      if (type === 0) {
        const a = Math.floor(15 + Math.random() * 85)
        const b = Math.floor(12 + Math.random() * 65)
        const ans = a * b
        const fake1 = ans + 10
        const fake2 = ans - 10
        const fake3 = ans + 25
        const opts = [ans, fake1, fake2, fake3].sort(() => Math.random() - 0.5)
        generated.push({
          id: `q_dyn_${i}`,
          category: 'Quantitative Aptitude',
          question: `[Level ${level}] Calculate the product of ${a} and ${b}:`,
          options: opts.map(o => String(o)),
          correctAnswer: opts.indexOf(ans),
          explanation: `${a} × ${b} = ${ans}`
        })
      } else if (type === 1) {
        const cp = Math.floor(250 + Math.random() * 750)
        const profitPct = [10, 15, 20, 25, 30][Math.floor(Math.random() * 5)]
        const sp = cp + (cp * profitPct) / 100
        const fakeOpts = [sp, sp + 25, sp - 25, sp + 50].sort(() => Math.random() - 0.5)
        generated.push({
          id: `q_dyn_${i}`,
          category: 'Quantitative Aptitude',
          question: `[Level ${level}] An item bought for ₹${cp} is sold at a ${profitPct}% profit. Find selling price:`,
          options: fakeOpts.map(o => `₹${o}`),
          correctAnswer: fakeOpts.indexOf(sp),
          explanation: `SP = CP × (1 + Profit/100) = ₹${cp} × ${1 + profitPct / 100} = ₹${sp}`
        })
      } else {
        const speed = [45, 60, 75, 90][Math.floor(Math.random() * 4)]
        const time = [2, 3, 4, 5][Math.floor(Math.random() * 4)]
        const dist = speed * time
        const fakeOpts = [dist, dist + 15, dist - 20, dist + 30].sort(() => Math.random() - 0.5)
        generated.push({
          id: `q_dyn_${i}`,
          category: 'Logical & Speed Reasoning',
          question: `[Level ${level}] A vehicle travels at ${speed} km/hr for ${time} hours. Total distance covered:`,
          options: fakeOpts.map(d => `${d} km`),
          correctAnswer: fakeOpts.indexOf(dist),
          explanation: `Distance = Speed × Time = ${speed} × ${time} = ${dist} km`
        })
      }
    }
  }
  return generated
}

export default function AptitudeTest() {
  const { user, updateUser } = useAuth()
  const [activeTab, setActiveTab] = useState('test') // 'learning', 'test'
  const [selectedLevel, setSelectedLevel] = useState(1)
  const [isStarted, setIsStarted] = useState(false)
  const [questions, setQuestions] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const currentLevelConfig = APTITUDE_LEVELS.find(l => l.level === selectedLevel) || APTITUDE_LEVELS[0]

  const startLevelTest = (lvl) => {
    const config = APTITUDE_LEVELS.find(l => l.level === lvl)
    setSelectedLevel(lvl)
    const qList = generateAptitudeQuestions(config.questionsCount, lvl)
    setQuestions(qList)
    setSelectedAnswers({})
    setCurrentIdx(0)
    setIsStarted(true)
    setIsSubmitted(false)
    setScore(0)
    toast.success(`🚀 ${config.name} Started!`)
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
    toast.success(`🎉 Test Complete! Scored ${sc}/${questions.length}. +${currentLevelConfig.xpReward} XP awarded!`)
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
                Aptitude Learning & Testing Suite (4 Progressive Levels)
              </h1>
              <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
                From Basic Quant to CAT/GATE Level Very Hardest Placement Exam Simulations
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── SUB TABS (LEARNING vs TEST) ────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={() => { setActiveTab('test'); setIsStarted(false); }}
          style={{
            padding: '0.6rem 1.25rem',
            borderRadius: '0.75rem',
            background: activeTab === 'test' ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.04)',
            border: activeTab === 'test' ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
            color: activeTab === 'test' ? 'white' : '#94a3b8',
            fontWeight: '700',
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          🧠 Take 4-Level Aptitude Tests
        </button>
        <button
          onClick={() => setActiveTab('learning')}
          style={{
            padding: '0.6rem 1.25rem',
            borderRadius: '0.75rem',
            background: activeTab === 'learning' ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.04)',
            border: activeTab === 'learning' ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
            color: activeTab === 'learning' ? 'white' : '#94a3b8',
            fontWeight: '700',
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          📚 Aptitude Learning Hub & Speed Formulas
        </button>
      </div>

      {/* ── VIEW 1: 4-LEVEL TESTS SETUP ────────────────────────────── */}
      {activeTab === 'test' && !isStarted && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
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
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', margin: '0 0 0.4rem' }}>
                  {lvl.name}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem', lineHeight: 1.4 }}>
                  {lvl.desc}
                </p>
              </div>

              <button
                onClick={() => startLevelTest(lvl.level)}
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
                Start {lvl.name.split('(')[0]} ({lvl.questionsCount} Qs) ➔
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── ACTIVE TEST INTERFACE ──────────────────────────────────── */}
      {activeTab === 'test' && isStarted && (
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
                  style={{ background: 'rgba(255,255,255,0.08)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.5rem', padding: '0.35rem 0.8rem', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  Exit Test
                </button>
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
                      onClick={() => setSelectedAnswers({ ...selectedAnswers, [questions[currentIdx].id]: oIdx })}
                      style={{
                        padding: '0.85rem 1.25rem',
                        borderRadius: '0.75rem',
                        textAlign: 'left',
                        fontWeight: '600',
                        fontSize: '0.92rem',
                        cursor: 'pointer',
                        background: isSelected ? 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(37,99,235,0.3))' : 'rgba(255,255,255,0.04)',
                        color: isSelected ? '#ffffff' : '#cbd5e1',
                        border: isSelected ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)'
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
                  style={{ padding: '0.65rem 1.25rem', borderRadius: '0.6rem', background: 'rgba(255,255,255,0.06)', color: 'white', border: 'none', cursor: currentIdx === 0 ? 'not-allowed' : 'pointer' }}
                >
                  ← Previous
                </button>
                {currentIdx < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx(prev => prev + 1)}
                    style={{ padding: '0.65rem 1.5rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', border: 'none', fontWeight: '800', cursor: 'pointer' }}
                  >
                    Next ➔
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    style={{ padding: '0.65rem 1.75rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', fontWeight: '800', border: 'none', cursor: 'pointer' }}
                  >
                    Submit Level Test 🎯
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏆</div>
              <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.5rem', margin: '0 0 0.35rem' }}>
                {currentLevelConfig.name} Complete!
              </h2>
              <div style={{ color: '#4ade80', fontWeight: '800', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                Score: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)
              </div>
              <div style={{ color: '#facc15', fontWeight: '700', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                +{currentLevelConfig.xpReward} XP Points Synced to Profile & Leaderboard! ⚡
              </div>

              <button
                onClick={() => setIsStarted(false)}
                style={{ padding: '0.85rem 2rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', fontWeight: '800', border: 'none', cursor: 'pointer' }}
              >
                Back to Level Select
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* ── VIEW 2: APTITUDE LEARNING & FORMULAS ───────────────────── */}
      {activeTab === 'learning' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {APTITUDE_LEARNING_MODULES.map((mod, idx) => (
            <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
              <span style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.75rem', fontWeight: '800' }}>
                {mod.category}
              </span>
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.15rem', margin: '0.5rem 0 0.75rem' }}>
                {mod.title}
              </h3>
              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '0.75rem', padding: '0.85rem', marginBottom: '0.75rem', color: '#cbd5e1', fontSize: '0.85rem' }}>
                <strong style={{ color: '#fbbf24' }}>📐 Formula:</strong> {mod.formula}
              </div>
              <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: '0.75rem', padding: '0.85rem', marginBottom: '0.75rem', color: '#4ade80', fontSize: '0.85rem' }}>
                <strong>⚡ 10-Second Shortcut:</strong> {mod.trick}
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                <strong>📝 Worked Problem:</strong> {mod.example}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
