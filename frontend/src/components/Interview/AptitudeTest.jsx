import React, { useState } from 'react'
import { aptitudeQuestions } from '../../data/aptitudeQuestions'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const LEARNING_LESSONS = [
  {
    topic: 'Time & Work',
    category: 'Quantitative Aptitude',
    formula: 'Work = Rate × Time. If A takes X days and B takes Y days, together they take (X × Y)/(X + Y) days.',
    trick: 'Assume Total Work = LCM of given days to avoid working with fractions!',
    example: 'A takes 10 days, B takes 15 days. Total Work = LCM(10, 15) = 30 units. A does 3 units/day, B does 2 units/day. Together 5 units/day → 30/5 = 6 days.'
  },
  {
    topic: 'Speed, Distance & Time',
    category: 'Quantitative Aptitude',
    formula: 'Speed = Distance / Time. To convert km/hr to m/s: multiply by 5/18. To convert m/s to km/hr: multiply by 18/5.',
    trick: 'Average Speed = 2XY/(X + Y) when equal distances are traveled at speeds X and Y.',
    example: 'Train passing a post: Distance = Length of train. Train passing a platform: Distance = Length of train + Length of platform.'
  },
  {
    topic: 'Profit & Loss & Discount',
    category: 'Quantitative Aptitude',
    formula: 'Profit % = (Profit / Cost Price) × 100. Loss % = (Loss / Cost Price) × 100.',
    trick: 'Gain or loss is ALWAYS calculated on Cost Price (CP), while Discount is calculated on Marked Price (MP).',
    example: 'Buy at ₹100, sell at ₹120 → Profit = ₹20 (20%). If marked at ₹150 with 20% discount → SP = 150 × 0.8 = ₹120.'
  },
  {
    topic: 'Blood Relations',
    category: 'Logical Reasoning',
    formula: 'Family tree symbols: Square = Male, Circle = Female, Horizontal double line = Married, Vertical line = Generation gap.',
    trick: 'Always start drawing the family tree from yourself or the speaker in statement-based questions.',
    example: '"Pointing to a photo, Rahul said: She is the daughter of my grandfather\'s only son." → Grandfather\'s only son = Rahul\'s father. Daughter = Rahul\'s sister.'
  },
  {
    topic: 'Coding-Decoding',
    category: 'Logical Reasoning',
    formula: 'Alphabet Positions: A=1, B=2 ... Z=26. Reverse pairs (A-Z, B-Y, C-X ... M-N). Shortcut: EJOTY (5, 10, 15, 20, 25).',
    trick: 'Check pattern difference: +1, +2, +3 OR reverse letter positions OR Vowel/Consonant shifts.',
    example: 'If CAT = 24 (3+1+20), DOG = 4+15+7 = 26.'
  },
  {
    topic: 'Sentence Correction & Grammar',
    category: 'Verbal Ability',
    formula: 'Subject-Verb Agreement: Singular subject takes singular verb ("The list of items IS...").',
    trick: 'Ignore words between subject and verb (e.g. "along with", "as well as", "together with").',
    example: 'Incorrect: "The student along with his teachers are present." → Correct: "The student along with his teachers IS present."'
  }
]

export default function AptitudeTest() {
  const [activeTab, setActiveTab] = useState('learning') // 'learning' or 'test'
  const [category, setCategory] = useState('verbal')
  const [questions, setQuestions] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [isStarted, setIsStarted] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const startTest = () => {
    const filtered = aptitudeQuestions.filter(q => q.category.toLowerCase() === category.toLowerCase())
    const shuffled = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 10)
    setQuestions(shuffled.length > 0 ? shuffled : aptitudeQuestions.slice(0, 10))
    setSelectedAnswers({})
    setCurrentIdx(0)
    setIsStarted(true)
    setIsSubmitted(false)
    setScore(0)
    toast.success(`Aptitude Test started! 10 Questions 🧠`)
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
    toast.success('🎉 Test Submitted! Check explanations below.')
  }

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header Banner */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81, #1e293b)', borderRadius: '1.5rem', padding: '2rem', marginBottom: '1.5rem', border: '1px solid rgba(139,92,246,0.3)' }}
      >
        <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '0.5rem' }}>
          🧠 Aptitude Master & Campus Placement Test
        </h1>
        <p style={{ color: '#c4b5fd' }}>
          Learn Quantitative, Logical Reasoning & Verbal shortcuts, formulas, tricks and practice 250+ placement test questions.
        </p>
      </motion.div>

      {/* Main Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('learning')}
          style={{
            padding: '0.65rem 1.25rem', borderRadius: '0.75rem', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer',
            background: activeTab === 'learning' ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.05)',
            color: activeTab === 'learning' ? 'white' : '#94a3b8',
            border: activeTab === 'learning' ? 'none' : '1px solid rgba(255,255,255,0.1)'
          }}
        >
          📚 Aptitude Learning Hub & Formulas
        </button>
        <button
          onClick={() => setActiveTab('test')}
          style={{
            padding: '0.65rem 1.25rem', borderRadius: '0.75rem', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer',
            background: activeTab === 'test' ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.05)',
            color: activeTab === 'test' ? 'white' : '#94a3b8',
            border: activeTab === 'test' ? 'none' : '1px solid rgba(255,255,255,0.1)'
          }}
        >
          🧠 Practice Mock Test (250+ Questions)
        </button>
      </div>

      {/* APTITUDE LEARNING HUB */}
      {activeTab === 'learning' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '1rem' }}>📚 Formulas, Speed Tricks & Concept Lessons</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {LEARNING_LESSONS.map((lesson, idx) => (
              <motion.div key={lesson.topic} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.25rem' }}
              >
                <span style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd', padding: '0.15rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '700' }}>{lesson.category}</span>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginTop: '0.5rem', marginBottom: '0.75rem' }}>{lesson.topic}</h3>

                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ color: '#fbbf24', fontWeight: '700', fontSize: '0.78rem', marginBottom: '0.2rem' }}>📐 Standard Formula:</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>{lesson.formula}</div>
                </div>

                <div style={{ background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '0.75rem', padding: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ color: '#4ade80', fontWeight: '700', fontSize: '0.78rem', marginBottom: '0.2rem' }}>⚡ 10-Second Shortcut Trick:</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>{lesson.trick}</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '0.75rem' }}>
                  <div style={{ color: '#60a5fa', fontWeight: '700', fontSize: '0.78rem', marginBottom: '0.2rem' }}>📝 Worked Example:</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>{lesson.example}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* PRACTICE MOCK TEST */}
      {activeTab === 'test' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {!isStarted ? (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '2rem', textAlign: 'center' }}>
              <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.3rem', marginBottom: '1rem' }}>⚙️ Setup Aptitude Test</h2>

              <div style={{ maxWidth: '300px', margin: '0 auto 1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '600' }}>Select Category</label>
                <select
                  value={category} onChange={e => setCategory(e.target.value)}
                  style={{ width: '100%', background: 'rgba(30,27,75,0.9)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
                >
                  <option value="verbal">🗣️ Verbal Ability</option>
                  <option value="quantitative">🔢 Quantitative Aptitude</option>
                  <option value="logical">🧩 Logical Reasoning</option>
                </select>
              </div>

              <button
                onClick={startTest}
                style={{ padding: '0.85rem 2rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', fontWeight: '800', fontSize: '1rem', border: 'none', cursor: 'pointer' }}
              >
                🚀 Start Test (10 Questions)
              </button>
            </div>
          ) : (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
              {!isSubmitted ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <span style={{ color: '#fbbf24', fontWeight: '700', fontSize: '0.9rem' }}>Question {currentIdx + 1} of {questions.length}</span>
                    <button onClick={() => setIsStarted(false)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '0.4rem', padding: '0.3rem 0.7rem', cursor: 'pointer', fontSize: '0.78rem' }}>Exit Test</button>
                  </div>

                  <h3 style={{ color: 'white', fontWeight: '700', fontSize: '1.1rem', marginBottom: '1.25rem', lineHeight: 1.4 }}>{questions[currentIdx]?.question}</h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    {questions[currentIdx]?.options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[questions[currentIdx].id] === oIdx
                      return (
                        <button
                          key={oIdx} onClick={() => handleSelectOption(questions[currentIdx].id, oIdx)}
                          style={{
                            padding: '0.8rem 1.25rem', borderRadius: '0.75rem', textAlign: 'left', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer',
                            background: isSelected ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.05)',
                            color: isSelected ? 'white' : '#cbd5e1',
                            border: `1px solid ${isSelected ? '#7c3aed' : 'rgba(255,255,255,0.1)'}`
                          }}
                        >
                          {String.fromCharCode(65 + oIdx)}. {opt}
                        </button>
                      )
                    })}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      disabled={currentIdx === 0} onClick={() => setCurrentIdx(prev => prev - 1)}
                      style={{ padding: '0.6rem 1.25rem', borderRadius: '0.6rem', background: 'rgba(255,255,255,0.06)', color: 'white', border: 'none', cursor: currentIdx === 0 ? 'not-allowed' : 'pointer' }}
                    >
                      ← Previous
                    </button>
                    {currentIdx < questions.length - 1 ? (
                      <button
                        onClick={() => setCurrentIdx(prev => prev + 1)}
                        style={{ padding: '0.6rem 1.25rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer' }}
                      >
                        Next →
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        style={{ padding: '0.6rem 1.5rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', fontWeight: '800', cursor: 'pointer' }}
                      >
                        Submit Test 🎯
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎯</div>
                    <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.4rem' }}>Score: {score} / {questions.length}</h3>
                    <p style={{ color: '#4ade80', fontWeight: '700' }}>{Math.round((score / questions.length) * 100)}% Accuracy · +30 XP Earned! ⚡</p>
                  </div>

                  <h4 style={{ color: 'white', fontWeight: '800', marginBottom: '1rem' }}>💡 Explanations</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                    {questions.map((q, idx) => {
                      const userAns = selectedAnswers[q.id]
                      const isCorrect = userAns === q.correctAnswer
                      return (
                        <div key={q.id} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${isCorrect ? 'rgba(74,222,128,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '0.9rem', padding: '1rem' }}>
                          <div style={{ color: 'white', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.4rem' }}>{idx + 1}. {q.question}</div>
                          <div style={{ color: isCorrect ? '#4ade80' : '#ef4444', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                            {isCorrect ? '✓ Correct Answer!' : `❌ Your Answer: ${userAns !== undefined ? q.options[userAns] : 'Not answered'}`}
                          </div>
                          <div style={{ color: '#4ade80', fontSize: '0.8rem', marginBottom: '0.4rem' }}>Correct Answer: {q.options[q.correctAnswer]}</div>
                          <div style={{ color: '#94a3b8', fontSize: '0.8rem', background: 'rgba(0,0,0,0.3)', padding: '0.6rem', borderRadius: '0.5rem' }}>Explanation: {q.explanation}</div>
                        </div>
                      )
                    })}
                  </div>

                  <button
                    onClick={() => setIsStarted(false)}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', fontWeight: '700', border: 'none', cursor: 'pointer' }}
                  >
                    Back to Test Setup
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
