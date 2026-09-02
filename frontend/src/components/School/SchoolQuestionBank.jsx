import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { QUESTION_BANK_LEVELS } from '../../data/schoolMasterData'

export default function SchoolQuestionBank({ activeSubject, selectedClass }) {
  const [selectedLevel, setSelectedLevel] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAnswer, setShowAnswer] = useState({})

  const toggleAnswer = (id) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }))
  }

  // Sample questions per level
  const LEVEL_QUESTIONS = {
    1: [
      {
        id: 'l1-1',
        chapter: 'Real Numbers / Reactions',
        marks: '1 Mark (Objective/MCQ)',
        q: 'What is the sum of exponents of prime factors in the prime factorization of 196?',
        answer: '196 = 2² × 7². The exponents are 2 and 2. Sum = 2 + 2 = 4.',
        formula: 'Fundamental Theorem of Arithmetic'
      },
      {
        id: 'l1-2',
        chapter: 'Light Reflection & Refraction',
        marks: '1 Mark (VSA)',
        q: 'State Snell’s Law of refraction of light.',
        answer: 'The ratio of the sine of the angle of incidence to the sine of the angle of refraction is a constant for a given pair of media and color of light: sin(i) / sin(r) = constant (Refractive Index n).',
        formula: 'sin i / sin r = n₂₁'
      }
    ],
    2: [
      {
        id: 'l2-1',
        chapter: 'Polynomials / Acids & Bases',
        marks: '2 Marks (Short Answer)',
        q: 'Find a quadratic polynomial whose zeroes are (3 + √2) and (3 - √2).',
        answer: `Sum of zeroes (S) = (3 + √2) + (3 - √2) = 6.
Product of zeroes (P) = (3 + √2)(3 - √2) = 3² - (√2)² = 9 - 2 = 7.
The quadratic polynomial is k[x² - Sx + P] = x² - 6x + 7.`,
        formula: 'p(x) = k[x² - (α + β)x + αβ]'
      },
      {
        id: 'l2-2',
        chapter: 'Electricity & Circuits',
        marks: '3 Marks (Numerical)',
        q: 'Three resistors of 2 Ω, 3 Ω, and 6 Ω are combined. How can they be connected to give a total resistance of (a) 4 Ω (b) 1 Ω?',
        answer: `(a) To get 4 Ω: Connect 3 Ω and 6 Ω in parallel (R_p = (3×6)/(3+6) = 2 Ω), and connect this in series with the 2 Ω resistor => R_total = 2 + 2 = 4 Ω.
(b) To get 1 Ω: Connect all three in parallel => 1/R = 1/2 + 1/3 + 1/6 = (3+2+1)/6 = 6/6 = 1 => R_total = 1 Ω.`,
        formula: '1/R_p = 1/R1 + 1/R2; R_s = R1 + R2'
      }
    ],
    3: [
      {
        id: 'l3-1',
        chapter: 'Triangles & Trigonometry',
        marks: '4 Marks (Case Study / LA)',
        q: 'From the top of a 7 m high building, the angle of elevation of the top of a cable tower is 60° and the angle of depression of its foot is 45°. Determine the height of the tower.',
        answer: `Let height of building AB = 7 m, and Cable Tower CD = H.
Horizontal distance between building and tower = x.
In right triangle ABC: tan 45° = AB / x => 1 = 7 / x => x = 7 m.
In right triangle ADE (where E is point on tower at height 7m):
tan 60° = DE / AE => √3 = DE / 7 => DE = 7√3 m.
Total height of tower H = CD = CE + DE = 7 + 7√3 = 7(1 + √3) m (approx 19.124 m).`,
        formula: 'tan θ = Opposite / Adjacent'
      }
    ],
    4: [
      {
        id: 'l4-1',
        chapter: 'HOTS & Exemplar Decider',
        marks: '5 Marks (Competency / Very Long Answer)',
        q: 'State and prove Basic Proportionality Theorem (Thales Theorem). Using this theorem, prove that a line drawn through the mid-point of one side of a triangle parallel to another side bisects the third side.',
        answer: `Statement: If a line is drawn parallel to one side of a triangle to intersect the other two sides in distinct points, the other two sides are divided in the same ratio.
Proof:
Consider ΔABC. Line DE || BC intersecting AB at D and AC at E.
Join BE, CD and draw DM ⊥ AC, EN ⊥ AB.
Area(ΔADE) = 1/2 × AD × EN
Area(ΔBDE) = 1/2 × DB × EN
Ratio Area(ΔADE)/Area(ΔBDE) = AD / DB   --- (1)
Similarly Area(ΔADE)/Area(ΔCDE) = AE / EC  --- (2)
Since ΔBDE and ΔCDE are on the same base DE and between the same parallels DE and BC:
Area(ΔBDE) = Area(ΔCDE)
From (1) and (2), AD / DB = AE / EC. (Hence Proved).`,
        formula: 'Thales Theorem: AD/DB = AE/EC'
      }
    ]
  }

  const currentQuestions = LEVEL_QUESTIONS[selectedLevel] || LEVEL_QUESTIONS[1]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
            5,000+ QUESTION VAULT
          </span>
          <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.3rem', margin: '0.3rem 0 0' }}>
            🧠 4-Level Progressive Question Bank ({activeSubject.name})
          </h2>
        </div>

        <button
          onClick={() => toast.success(`📥 Downloaded Level ${selectedLevel} Question Bank with Detailed Solutions!`)}
          style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', padding: '0.55rem 1.1rem', borderRadius: '0.55rem', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer' }}
        >
          📥 Download Level {selectedLevel} Bank (PDF)
        </button>
      </div>

      {/* 4 Levels Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
        {QUESTION_BANK_LEVELS.map(lvl => {
          const isSelected = selectedLevel === lvl.level
          return (
            <motion.div
              key={lvl.level}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedLevel(lvl.level)}
              style={{
                background: isSelected ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.03)',
                border: isSelected ? `2px solid ${lvl.color}` : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '0.85rem',
                padding: '1rem',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <strong style={{ color: isSelected ? 'white' : '#e2e8f0', fontSize: '0.92rem' }}>
                  Level {lvl.level}
                </strong>
                <span style={{ background: 'rgba(255,255,255,0.1)', color: lvl.color, padding: '0.1rem 0.4rem', borderRadius: '0.35rem', fontSize: '0.68rem', fontWeight: '800' }}>
                  {lvl.questionsCount}
                </span>
              </div>
              <div style={{ color: lvl.color, fontWeight: '700', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                {lvl.badge}
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.7rem', lineHeight: 1.4 }}>
                {lvl.description}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Question Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {currentQuestions.map((qObj, idx) => (
          <div
            key={qObj.id}
            style={{
              background: 'rgba(15,23,42,0.95)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1rem',
              padding: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.8rem' }}>
                {qObj.chapter} · <strong style={{ color: '#6ee7b7' }}>{qObj.marks}</strong>
              </span>
              <button
                onClick={() => toggleAnswer(qObj.id)}
                style={{
                  background: showAnswer[qObj.id] ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${showAnswer[qObj.id] ? '#34d399' : 'rgba(255,255,255,0.1)'}`,
                  color: showAnswer[qObj.id] ? '#34d399' : '#cbd5e1',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '0.45rem',
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                {showAnswer[qObj.id] ? 'Hide Solution ▲' : 'View Step-by-Step Solution ▼'}
              </button>
            </div>

            <h4 style={{ color: 'white', fontWeight: '800', fontSize: '1rem', lineHeight: 1.5, margin: '0 0 0.75rem' }}>
              Q{idx + 1}: {qObj.q}
            </h4>

            {showAnswer[qObj.id] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '0.75rem', padding: '1.25rem', marginTop: '0.75rem' }}
              >
                <div style={{ color: '#34d399', fontWeight: '900', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                  ✓ Official Step-by-Step Solution & Theorem:
                </div>
                <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.88rem', lineHeight: 1.6, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
                  {qObj.answer}
                </pre>
                <div style={{ marginTop: '0.5rem', color: '#c4b5fd', fontSize: '0.75rem' }}>
                  🔑 <strong>Underlying Concept:</strong> {qObj.formula}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
