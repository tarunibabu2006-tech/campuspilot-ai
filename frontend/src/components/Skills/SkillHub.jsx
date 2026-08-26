import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const SEED_SKILLS = [
  { id: 'sk1', name: 'Python Programming 🐍', category: 'Software Development', domain: 'Data Science & AI', level: 'Beginner → Advanced', duration: '3 months', demand: '🔥 Very High', difficulty: '⭐⭐', relatedJobs: ['Data Analyst', 'AI Engineer', 'Backend Dev'], matchPct: 95, icon: '🐍', prereq: 'Basic Math & Logic', desc: 'Master Python fundamentals, OOP, data structures, and popular libraries.' },
  { id: 'sk2', name: 'SQL & Database Architecture 🗄️', category: 'Database', domain: 'Data Science & Backend', level: 'Beginner → Intermediate', duration: '2 months', demand: '🔥 Very High', difficulty: '⭐⭐', relatedJobs: ['Data Analyst', 'Database Admin', 'Backend Developer'], matchPct: 91, icon: '🗄️', prereq: 'None', desc: 'Relational database design, complex JOINs, indexing, and window functions.' },
  { id: 'sk3', name: 'React.js & Frontend Web ⚛️', category: 'Web Development', domain: 'Frontend & Full Stack', level: 'Intermediate', duration: '3 months', demand: '🔥 High', difficulty: '⭐⭐⭐', relatedJobs: ['Frontend Developer', 'Full Stack Developer'], matchPct: 88, icon: '⚛️', prereq: 'HTML, CSS, JavaScript', desc: 'Build modern responsive single-page web applications with React Hooks & Redux.' },
  { id: 'sk4', name: 'Power BI & Data Visualization 📊', category: 'Data Analytics', domain: 'Business Intelligence', level: 'Beginner → Intermediate', duration: '1.5 months', demand: '🔥 High', difficulty: '⭐', relatedJobs: ['BI Analyst', 'Data Analyst', 'Business Consultant'], matchPct: 86, icon: '📊', prereq: 'Excel Basics', desc: 'Transform raw datasets into interactive dashboards and business reports.' },
  { id: 'sk5', name: 'Machine Learning & PyTorch 🤖', category: 'AI & Data Science', domain: 'Artificial Intelligence', level: 'Advanced', duration: '4 months', demand: '🔥 Very High', difficulty: '⭐⭐⭐⭐', relatedJobs: ['ML Engineer', 'Data Scientist', 'AI Researcher'], matchPct: 82, icon: '🤖', prereq: 'Python & Linear Algebra', desc: 'Supervised/Unsupervised learning algorithms, PyTorch neural networks & MLOps.' },
  { id: 'sk6', name: 'AWS Cloud Solutions Architecture ☁️', category: 'Cloud Computing', domain: 'DevOps & Infrastructure', level: 'Intermediate → Advanced', duration: '3 months', demand: '🔥 Very High', difficulty: '⭐⭐⭐', relatedJobs: ['Cloud Architect', 'DevOps Engineer', 'SRE'], matchPct: 79, icon: '☁️', prereq: 'Linux & Networking Basics', desc: 'Deploy resilient cloud infrastructure using EC2, S3, Lambda, and CloudFront.' },
  { id: 'sk7', name: 'Java & Spring Boot Enterprise ☕', category: 'Backend Development', domain: 'Software Engineering', level: 'Intermediate', duration: '4 months', demand: '🔥 High', difficulty: '⭐⭐⭐', relatedJobs: ['Java Developer', 'Backend Architect'], matchPct: 77, icon: '☕', prereq: 'Core Java', desc: 'Build production RESTful microservices and enterprise Java applications.' },
  { id: 'sk8', name: 'Docker & Kubernetes DevOps 🐳', category: 'DevOps', domain: 'Cloud & System Admin', level: 'Advanced', duration: '2 months', demand: '🔥 High', difficulty: '⭐⭐⭐⭐', relatedJobs: ['DevOps Specialist', 'Site Reliability Engineer'], matchPct: 75, icon: '🐳', prereq: 'Linux & Cloud Basics', desc: 'Containerize applications and manage automated Kubernetes clusters.' },
  { id: 'sk9', name: 'Node.js & Express REST APIs 🟢', category: 'Backend Development', domain: 'Web Development', level: 'Intermediate', duration: '2.5 months', demand: '🔥 High', difficulty: '⭐⭐', relatedJobs: ['Node.js Developer', 'Full Stack Engineer'], matchPct: 84, icon: '🟢', prereq: 'JavaScript ES6+', desc: 'Build fast asynchronous server-side APIs with MongoDB and Express.' },
  { id: 'sk10', name: 'Cybersecurity & Ethical Hacking 🛡️', category: 'Security', domain: 'Information Security', level: 'Intermediate → Advanced', duration: '4 months', demand: '🔥 Very High', difficulty: '⭐⭐⭐⭐', relatedJobs: ['Security Analyst', 'Penetration Tester'], matchPct: 73, icon: '🛡️', prereq: 'Networking & Linux', desc: 'Vulnerability assessment, penetration testing, SOC monitoring, and network security.' }
]

const TRENDING_SKILLS_2026 = [
  { name: 'AI Engineering & LLMs', icon: '🔥', growth: '+140% demand' },
  { name: 'Generative AI & RAG', icon: '🤖', growth: '+125% demand' },
  { name: 'Cloud Native & Kubernetes', icon: '☁️', growth: '+95% demand' },
  { name: 'Cybersecurity & Zero Trust', icon: '🛡️', growth: '+85% demand' },
  { name: 'Data Engineering & Snowflake', icon: '📊', growth: '+78% demand' },
  { name: 'Full Stack Next.js', icon: '💻', growth: '+70% demand' }
]

const SAMPLE_SKILL_QUIZ = [
  { question: 'What is the correct file extension for Python files?', options: ['.pyt', '.pt', '.py', '.python'], answer: 2 },
  { question: 'Which keyword is used to define a function in Python?', options: ['func', 'def', 'function', 'create'], answer: 1 },
  { question: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Question Language', 'Standard System Logic', 'Sequential Query List'], answer: 0 }
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
        console.warn('Using built-in seed skills dataset')
      }
    }
    fetchBackendSkills()
  }, [])

  const categories = ['All', ...new Set(skillsList.map(s => s.category).filter(Boolean))]

  const filtered = skillsList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.domain?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory
    return matchesSearch && matchesCat
  })

  const recommended = [...skillsList].sort((a, b) => (b.matchPct || 80) - (a.matchPct || 80)).slice(0, 4)

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
    <div style={{ padding: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81, #1e293b)', borderRadius: '1.5rem', padding: '2rem', marginBottom: '1.5rem', border: '1px solid rgba(139,92,246,0.3)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '0.5rem' }}>
              📚 1000+ Skill Learning Hub & Assessments
            </h1>
            <p style={{ color: '#c4b5fd' }}>
              Master in-demand tech, core engineering & management skills with AI recommendations and skill tests.
            </p>
          </div>
          <span style={{ background: 'rgba(74,222,128,0.2)', color: '#4ade80', border: '1px solid #4ade80', padding: '0.4rem 1rem', borderRadius: '2rem', fontWeight: '800', fontSize: '0.85rem' }}>
            🔥 1050+ Industry Skills Available
          </span>
        </div>
      </motion.div>

      {/* Trending Skills 2026 */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <h3 style={{ color: '#fbbf24', fontWeight: '800', fontSize: '1.05rem', marginBottom: '0.75rem' }}>🔥 Trending Skills 2026</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
          {TRENDING_SKILLS_2026.map(ts => (
            <div key={ts.name} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '0.75rem', padding: '0.75rem 1rem' }}>
              <div style={{ color: 'white', fontWeight: '700', fontSize: '0.85rem' }}>{ts.icon} {ts.name}</div>
              <div style={{ color: '#4ade80', fontSize: '0.72rem', fontWeight: '700', marginTop: '0.2rem' }}>{ts.growth}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Personalized Skill Recommendation */}
      <div style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(37,99,235,0.06))', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <h3 style={{ color: '#c4b5fd', fontWeight: '800', fontSize: '1.05rem', marginBottom: '0.75rem' }}>🎯 Recommended Skills For You (Profile Matched)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
          {recommended.map(rec => (
            <div key={rec.id} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: 'white', fontWeight: '700', fontSize: '0.85rem' }}>{rec.name}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>{rec.domain}</div>
              </div>
              <span style={{ background: 'rgba(74,222,128,0.2)', color: '#4ade80', padding: '0.2rem 0.5rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '800' }}>
                {rec.matchPct}% Match
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Category Filter */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="🔍 Smart Search 1000+ Skills (e.g. Python, SQL, React, DevOps)..."
          value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
          style={{ flex: 1, minWidth: '240px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
        />
        <select
          value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
          style={{ background: 'rgba(30,27,75,0.9)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
        >
          {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
        </select>
      </div>

      {/* Available Skills Grid */}
      <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.3rem', marginBottom: '1rem' }}>⚡ Available Skills ({filtered.length})</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {filtered.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.06 }}
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.35rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.8rem' }}>{skill.icon || '💻'}</span>
                <span style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.72rem', fontWeight: '800' }}>
                  {skill.demand}
                </span>
              </div>
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{skill.name}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.75rem', lineHeight: 1.4 }}>{skill.desc || skill.description}</p>

              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '0.75rem', marginBottom: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', fontSize: '0.75rem' }}>
                <div><span style={{ color: '#64748b' }}>Level:</span> <span style={{ color: 'white', fontWeight: '600' }}>{skill.level}</span></div>
                <div><span style={{ color: '#64748b' }}>Duration:</span> <span style={{ color: 'white', fontWeight: '600' }}>{skill.duration}</span></div>
                <div><span style={{ color: '#64748b' }}>Difficulty:</span> <span style={{ color: '#fbbf24' }}>{skill.difficulty}</span></div>
                <div><span style={{ color: '#64748b' }}>Prereq:</span> <span style={{ color: 'white' }}>{skill.prereq || 'None'}</span></div>
              </div>

              {skill.relatedJobs && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: '700', marginBottom: '0.3rem' }}>Related Career Roles:</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                    {skill.relatedJobs.map(r => <span key={r} style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd', padding: '0.1rem 0.4rem', borderRadius: '0.3rem', fontSize: '0.7rem' }}>{r}</span>)}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button
                onClick={() => onSelectSkill ? onSelectSkill(skill.id) : toast.success(`🚀 Added ${skill.name} to learning roadmap!`)}
                style={{ flex: 1, padding: '0.55rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', border: 'none', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}
              >
                Start Learning →
              </button>
              <button
                onClick={() => handleStartTest(skill)}
                style={{ padding: '0.55rem 0.8rem', borderRadius: '0.6rem', background: 'rgba(255,255,255,0.06)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}
              >
                🧪 Take Test
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skill Assessment Test Modal */}
      <AnimatePresence>
        {assessmentSkill && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setAssessmentSkill(null)}
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              style={{ background: 'linear-gradient(135deg, #1e1b4b, #0f172a)', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '1.5rem', padding: '2rem', maxWidth: '500px', width: '100%' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem' }}>🧪 Skill Assessment — {assessmentSkill.name}</h3>
                <button onClick={() => setAssessmentSkill(null)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}>✕</button>
              </div>

              {quizScore === null ? (
                <div>
                  <div style={{ color: '#fbbf24', fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Question {quizIdx + 1} of {SAMPLE_SKILL_QUIZ.length}</div>
                  <h4 style={{ color: 'white', fontWeight: '700', fontSize: '1rem', marginBottom: '1rem' }}>{SAMPLE_SKILL_QUIZ[quizIdx].question}</h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                    {SAMPLE_SKILL_QUIZ[quizIdx].options.map((opt, oIdx) => {
                      const isSel = quizAnswers[quizIdx] === oIdx
                      return (
                        <button
                          key={oIdx} onClick={() => setQuizAnswers({ ...quizAnswers, [quizIdx]: oIdx })}
                          style={{
                            padding: '0.7rem 1rem', borderRadius: '0.6rem', textAlign: 'left', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer',
                            background: isSel ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.06)',
                            color: isSel ? 'white' : '#cbd5e1', border: isSel ? 'none' : '1px solid rgba(255,255,255,0.1)'
                          }}
                        >
                          {String.fromCharCode(65 + oIdx)}. {opt}
                        </button>
                      )
                    })}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button disabled={quizIdx === 0} onClick={() => setQuizIdx(prev => prev - 1)} style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', cursor: quizIdx === 0 ? 'not-allowed' : 'pointer' }}>← Prev</button>
                    {quizIdx < SAMPLE_SKILL_QUIZ.length - 1 ? (
                      <button onClick={() => setQuizIdx(prev => prev + 1)} style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', border: 'none', cursor: 'pointer' }}>Next →</button>
                    ) : (
                      <button onClick={handleQuizSubmit} style={{ padding: '0.5rem 1.2rem', borderRadius: '0.5rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', fontWeight: '800', border: 'none', cursor: 'pointer' }}>Submit Test</button>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏅</div>
                  <h4 style={{ color: 'white', fontWeight: '800', fontSize: '1.3rem' }}>You Scored {quizScore}/{SAMPLE_SKILL_QUIZ.length}!</h4>
                  <p style={{ color: '#4ade80', fontWeight: '700', marginBottom: '1.5rem' }}>Skill Level: Intermediate · +50 XP Added!</p>
                  <button onClick={() => setAssessmentSkill(null)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', fontWeight: '700', border: 'none', cursor: 'pointer' }}>Close Assessment</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
