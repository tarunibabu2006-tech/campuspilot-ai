import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { SEED_SKILLS, SKILL_CATEGORIES } from '../../data/seedSkills'

const SAMPLE_SKILL_QUIZ = [
  { question: 'What is the most effective approach to mastering this skill domain?', options: ['Theoretical study only', 'Hands-on practical projects + Theory', 'Passive watching', 'Guesswork'], answer: 1 },
  { question: 'In industry applications, which aspect is prioritized?', options: ['Scalability & Best Practices', 'Hardcoded values', 'Skipping error handling', 'No documentation'], answer: 0 },
  { question: 'How is performance evaluated in competitive campus placements?', options: ['Speed, Accuracy & Conceptual Depth', 'Only Speed', 'Only Memorization', 'None'], answer: 0 }
]

export default function SkillHub({ onSelectSkill }) {
  const [skillsList, setSkillsList] = useState(SEED_SKILLS)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [assessmentSkill, setAssessmentSkill] = useState(null)
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizScore, setQuizScore] = useState(null)

  useEffect(() => {
    const fetchBackendSkills = async () => {
      try {
        const res = await axios.get('/api/skills')
        if (res.data.skills && res.data.skills.length > 0) {
          setSkillsList(res.data.skills)
        }
      } catch (err) {
        // Built-in seed skills dataset
      }
    }
    fetchBackendSkills()
  }, [])

  const categories = SKILL_CATEGORIES

  const filtered = skillsList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.desc?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory
    return matchesSearch && matchesCat
  })

  const recommended = [...skillsList].sort((a, b) => (b.matchPct || 80) - (a.matchPct || 80)).slice(0, 6)

  const handleStartTest = (skill) => {
    setAssessmentSkill(skill)
    setQuizIdx(0)
    setQuizAnswers({})
    setQuizScore(null)
  }

  const handleQuizSubmit = () => {
    let sc = 0
    SAMPLE_SKILL_QUIZ.forEach((q, i) => {
      if (quizAnswers[i] === q.answer) sc++
    })
    setQuizScore(sc)
    toast.success(`🎉 Assessment Complete! You scored ${sc}/${SAMPLE_SKILL_QUIZ.length}. +50 XP awarded!`)
  }

  return (
    <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #1e1b4b, #312e81, #1e293b)',
          borderRadius: '1.5rem',
          padding: '2rem',
          marginBottom: '1.5rem',
          border: '1px solid rgba(139,92,246,0.35)',
          boxShadow: '0 8px 32px rgba(124,58,237,0.2)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '900', color: 'white', marginBottom: '0.4rem' }}>
              🇮🇳 All India Skill Hub (50+ Categories)
            </h1>
            <p style={{ color: '#c4b5fd', fontSize: '0.9rem', margin: 0, maxWidth: '700px' }}>
              Unlimited verified learning pathways, notes, videos and AI skill tests across Engineering, Medical, Arts, Commerce, Law, Sciences, and Vocational domains.
            </p>
          </div>
          <span style={{
            background: 'rgba(74,222,128,0.15)',
            color: '#4ade80',
            border: '1px solid rgba(74,222,128,0.4)',
            padding: '0.5rem 1.2rem',
            borderRadius: '2rem',
            fontWeight: '800',
            fontSize: '0.85rem'
          }}>
            ⚡ Unlimited Skills Available
          </span>
        </div>
      </motion.div>

      {/* Recommended Skills */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(37,99,235,0.06))',
        border: '1px solid rgba(139,92,246,0.3)',
        borderRadius: '1.25rem',
        padding: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ color: '#c4b5fd', fontWeight: '800', fontSize: '1.05rem', marginBottom: '0.75rem' }}>
          🎯 Recommended Top In-Demand Skills
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          {recommended.map(rec => (
            <div
              key={rec.id}
              onClick={() => onSelectSkill && onSelectSkill(rec.id)}
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'transform 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div>
                <div style={{ color: 'white', fontWeight: '700', fontSize: '0.85rem' }}>
                  {rec.icon} {rec.name}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>{rec.category}</div>
              </div>
              <span style={{
                background: 'rgba(74,222,128,0.2)',
                color: '#4ade80',
                padding: '0.2rem 0.5rem',
                borderRadius: '0.5rem',
                fontSize: '0.72rem',
                fontWeight: '800'
              }}>
                {rec.matchPct}% Match
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="🔍 Search all skills across India (e.g., Python, Civil, Radiographer, GST, Law, AI)..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: '260px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            color: 'white',
            fontSize: '0.9rem',
            outline: 'none'
          }}
        />
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          style={{
            background: '#1e1b4b',
            border: '1px solid rgba(139,92,246,0.4)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            color: 'white',
            fontSize: '0.88rem',
            outline: 'none',
            cursor: 'pointer',
            maxWidth: '300px'
          }}
        >
          {categories.map(c => (
            <option key={c} value={c}>
              {c === 'All' ? 'All 50+ Disciplines & Categories' : c}
            </option>
          ))}
        </select>
      </div>

      {/* Skills Listing Grid */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.25rem', margin: 0 }}>
          ⚡ Verified Career Skills ({filtered.length} Skills Listed)
        </h2>
        <span style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: '700' }}>
          Unlimited Access
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {filtered.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: Math.min(index * 0.02, 0.5) }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1.25rem',
              padding: '1.35rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '2rem' }}>{skill.icon || '💻'}</span>
                <span style={{
                  background: 'rgba(251,191,36,0.15)',
                  color: '#fbbf24',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '1rem',
                  fontSize: '0.72rem',
                  fontWeight: '800'
                }}>
                  {skill.demand}
                </span>
              </div>
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                {skill.name}
              </h3>
              <div style={{ color: '#818cf8', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                📂 {skill.category}
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                {skill.desc}
              </p>

              <div style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '0.75rem',
                padding: '0.75rem',
                marginBottom: '1rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.4rem',
                fontSize: '0.75rem'
              }}>
                <div><span style={{ color: '#64748b' }}>Level:</span> <span style={{ color: 'white', fontWeight: '600' }}>{skill.level}</span></div>
                <div><span style={{ color: '#64748b' }}>Duration:</span> <span style={{ color: 'white', fontWeight: '600' }}>{skill.duration}</span></div>
                <div><span style={{ color: '#64748b' }}>Difficulty:</span> <span style={{ color: '#fbbf24' }}>{skill.difficulty}</span></div>
                <div><span style={{ color: '#64748b' }}>Resources:</span> <span style={{ color: '#4ade80', fontWeight: '700' }}>Notes + Video</span></div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button
                onClick={() => onSelectSkill ? onSelectSkill(skill.id) : toast.success(`Opening ${skill.name} Notes & Videos!`)}
                style={{
                  flex: 1,
                  padding: '0.6rem',
                  borderRadius: '0.65rem',
                  background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '800',
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                📖 Notes & Videos →
              </button>
              <button
                onClick={() => handleStartTest(skill)}
                style={{
                  padding: '0.6rem 0.9rem',
                  borderRadius: '0.65rem',
                  background: 'rgba(255,255,255,0.06)',
                  color: '#4ade80',
                  border: '1px solid rgba(74,222,128,0.3)',
                  fontWeight: '700',
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                🧪 Test (+50 XP)
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skill Assessment Test Modal */}
      <AnimatePresence>
        {assessmentSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
            onClick={() => setAssessmentSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              style={{
                background: 'linear-gradient(135deg, #1e1b4b, #0f172a)',
                border: '1px solid rgba(139,92,246,0.4)',
                borderRadius: '1.5rem',
                padding: '2rem',
                maxWidth: '520px',
                width: '100%'
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', margin: 0 }}>
                  🧪 Assessment: {assessmentSkill.name}
                </h3>
                <button
                  onClick={() => setAssessmentSkill(null)}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>

              {quizScore === null ? (
                <div>
                  <div style={{ color: '#fbbf24', fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                    Question {quizIdx + 1} of {SAMPLE_SKILL_QUIZ.length}
                  </div>
                  <h4 style={{ color: 'white', fontWeight: '700', fontSize: '1rem', marginBottom: '1rem' }}>
                    {SAMPLE_SKILL_QUIZ[quizIdx].question}
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                    {SAMPLE_SKILL_QUIZ[quizIdx].options.map((opt, oIdx) => {
                      const isSel = quizAnswers[quizIdx] === oIdx
                      return (
                        <button
                          key={oIdx}
                          onClick={() => setQuizAnswers({ ...quizAnswers, [quizIdx]: oIdx })}
                          style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '0.65rem',
                            textAlign: 'left',
                            fontWeight: '600',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            background: isSel ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.06)',
                            color: isSel ? 'white' : '#cbd5e1',
                            border: isSel ? 'none' : '1px solid rgba(255,255,255,0.1)'
                          }}
                        >
                          {String.fromCharCode(65 + oIdx)}. {opt}
                        </button>
                      )
                    })}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      disabled={quizIdx === 0}
                      onClick={() => setQuizIdx(prev => prev - 1)}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        background: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        border: 'none',
                        cursor: quizIdx === 0 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      ← Prev
                    </button>
                    {quizIdx < SAMPLE_SKILL_QUIZ.length - 1 ? (
                      <button
                        onClick={() => setQuizIdx(prev => prev + 1)}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '0.5rem',
                          background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                          color: 'white',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Next →
                      </button>
                    ) : (
                      <button
                        onClick={handleQuizSubmit}
                        style={{
                          padding: '0.5rem 1.25rem',
                          borderRadius: '0.5rem',
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          color: 'white',
                          fontWeight: '800',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Submit Test (+50 XP)
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏅</div>
                  <h4 style={{ color: 'white', fontWeight: '800', fontSize: '1.3rem' }}>
                    You Scored {quizScore}/{SAMPLE_SKILL_QUIZ.length}!
                  </h4>
                  <p style={{ color: '#4ade80', fontWeight: '700', marginBottom: '1.5rem' }}>
                    Skill Benchmark Verified · +50 XP Added!
                  </p>
                  <button
                    onClick={() => setAssessmentSkill(null)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.75rem',
                      background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                      color: 'white',
                      fontWeight: '700',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Close Assessment
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
