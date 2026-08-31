import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { getInterviewQuestions, evaluateAnswer } from '../../services/api'
import toast from 'react-hot-toast'

// ─── 5 Interview Readiness Levels ────────────────────────────────────────────
const INTERVIEW_LEVELS = [
  {
    id: 1,
    title: 'Level 1: Self Introduction & HR Basics',
    subtitle: 'Tell me about yourself, strengths, weaknesses & motivation',
    icon: '🙋',
    color: '#4ade80',
    gradient: 'linear-gradient(135deg, #052e16, #14532d)',
    border: 'rgba(74,222,128,0.4)',
    xp: 30,
    timePerQ: 60,
    requiredScore: 6,
    questions: [
      { q: 'Tell me about yourself. Walk me through your background, skills, and why you are here today.' },
      { q: 'What are your top 3 strengths and how have you applied them in academic projects?' },
      { q: 'What is your biggest weakness and what are you actively doing to improve it?' },
      { q: 'Why did you choose your specific branch/department of study?' },
      { q: 'Where do you see yourself 3 years from now professionally?' }
    ]
  },
  {
    id: 2,
    title: 'Level 2: Technical Aptitude & Core Concepts',
    subtitle: 'DSA, OOP, OS, DBMS, CN and domain fundamentals',
    icon: '⚙️',
    color: '#38bdf8',
    gradient: 'linear-gradient(135deg, #0c1e35, #0c4a6e)',
    border: 'rgba(56,189,248,0.4)',
    xp: 40,
    timePerQ: 90,
    requiredScore: 6,
    questions: [
      { q: 'Explain the difference between a Stack and a Queue with a real-world use case for each.' },
      { q: 'What is polymorphism in OOP? Give a concrete code-level example.' },
      { q: 'Explain what a foreign key is in a relational database and why it matters.' },
      { q: 'What is the difference between TCP and UDP? When would you use each?' },
      { q: 'Explain time complexity. What is the Big-O of a Binary Search algorithm?' }
    ]
  },
  {
    id: 3,
    title: 'Level 3: Project Deep Dive & Problem Solving',
    subtitle: 'Explain your best project, architecture, and challenges faced',
    icon: '🛠️',
    color: '#c084fc',
    gradient: 'linear-gradient(135deg, #1e0a3c, #4a1d96)',
    border: 'rgba(192,132,252,0.4)',
    xp: 50,
    timePerQ: 120,
    requiredScore: 7,
    questions: [
      { q: 'Walk me through your most complex academic or personal project. What technologies did you use and why?' },
      { q: 'What was the hardest technical bug or challenge you faced in a project? How did you debug and resolve it?' },
      { q: 'If you were building a URL shortening service like bit.ly, how would you design the system architecture?' },
      { q: 'Describe a situation where you had to learn a new technology quickly for a project deadline. How did you approach it?' },
      { q: 'How would you optimize a slow-performing SQL query on a table with 1 million records?' }
    ]
  },
  {
    id: 4,
    title: 'Level 4: Behavioral & Situational Questions',
    subtitle: 'Teamwork, conflict resolution, leadership & STAR method',
    icon: '🤝',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #27160a, #78350f)',
    border: 'rgba(245,158,11,0.4)',
    xp: 60,
    timePerQ: 90,
    requiredScore: 7,
    questions: [
      { q: 'Tell me about a time you had a disagreement with a teammate during a group project. How did you resolve it?' },
      { q: 'Describe a situation where you had to meet a very tight deadline. What was your strategy?' },
      { q: 'Give an example of a time you showed leadership or initiative without being asked.' },
      { q: 'Tell me about a failure or a project that did not go as planned. What did you learn from it?' },
      { q: 'How do you handle working with people who have a very different working style from yours?' }
    ]
  },
  {
    id: 5,
    title: 'Level 5: Final Round — Offer & Salary Negotiation',
    subtitle: 'CTC discussion, role expectations, company research & closing',
    icon: '🏆',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #2d0a0a, #7f1d1d)',
    border: 'rgba(239,68,68,0.4)',
    xp: 100,
    timePerQ: 90,
    requiredScore: 7,
    questions: [
      { q: 'Why do you want to work specifically at our company, and what do you know about our products or culture?' },
      { q: 'What salary and compensation package are you expecting? How did you arrive at that number?' },
      { q: 'Do you have any competing offers? How are you deciding between opportunities?' },
      { q: 'What would be your 30-60-90 day plan if you joined this role tomorrow?' },
      { q: 'Do you have any questions for us? What would you want to know about the team or the role?' }
    ]
  }
]

// ─── Scorecard Helper ─────────────────────────────────────────────────────────
function getGrade(avg) {
  if (avg >= 9) return { grade: 'A+', label: 'Outstanding', color: '#10b981' }
  if (avg >= 8) return { grade: 'A', label: 'Excellent', color: '#34d399' }
  if (avg >= 7) return { grade: 'B+', label: 'Good', color: '#3b82f6' }
  if (avg >= 6) return { grade: 'B', label: 'Satisfactory', color: '#f59e0b' }
  return { grade: 'C', label: 'Needs Improvement', color: '#ef4444' }
}

export default function MockInterview() {
  const { user, updateUser } = useAuth()

  // Persist progress in localStorage
  const [unlockedLevel, setUnlockedLevel] = useState(() => {
    return parseInt(localStorage.getItem('mock_interview_unlocked') || '1', 10)
  })
  const [levelScores, setLevelScores] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mock_interview_scores') || '{}') } catch { return {} }
  })

  // Active session state
  const [activeLevel, setActiveLevel] = useState(null)      // which level user entered
  const [phase, setPhase] = useState('map')                  // 'map' | 'session' | 'result'
  const [currentQIdx, setCurrentQIdx] = useState(0)
  const [answer, setAnswer] = useState('')
  const [history, setHistory] = useState([])
  const [evaluation, setEvaluation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(60)
  const [showCelebration, setShowCelebration] = useState(null)

  const timerRef = useRef(null)

  // Persist progress
  useEffect(() => {
    localStorage.setItem('mock_interview_unlocked', String(unlockedLevel))
  }, [unlockedLevel])

  useEffect(() => {
    localStorage.setItem('mock_interview_scores', JSON.stringify(levelScores))
  }, [levelScores])

  // Timer management
  const startTimer = (seconds) => {
    if (timerRef.current) clearInterval(timerRef.current)
    setTimer(seconds)
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          toast.error('⏱️ Time up! Submit your answer now.')
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
  }

  // Enter a level
  const enterLevel = (lvl) => {
    setActiveLevel(lvl)
    setHistory([])
    setEvaluation(null)
    setCurrentQIdx(0)
    setAnswer('')
    setPhase('session')
    startTimer(lvl.timePerQ)
    toast.success(`🎤 Level ${lvl.id} Interview Started!`)
  }

  // Submit an answer
  const submitAnswer = async () => {
    if (!answer.trim()) {
      toast.error('Please type your answer before submitting!')
      return
    }
    stopTimer()
    setLoading(true)

    const currentQ = activeLevel.questions[currentQIdx]

    // Build history entry (evaluate locally if API fails)
    let evalData = null
    try {
      const res = await evaluateAnswer({
        question: currentQ.q,
        answer,
        role: activeLevel.title,
        difficulty: activeLevel.id <= 2 ? 'easy' : activeLevel.id <= 4 ? 'medium' : 'hard'
      })
      evalData = res.data
    } catch {
      // Local fallback scoring
      const wordCount = answer.trim().split(/\s+/).length
      const score = Math.min(10, Math.max(4, Math.round(5 + (wordCount / 15))))
      evalData = {
        score,
        feedback: score >= 7
          ? 'Good structured answer. Covers the key aspects effectively.'
          : 'Consider elaborating with specific examples using the STAR method.',
        improvements: ['Add concrete real examples', 'Quantify your achievements', 'Structure using STAR method']
      }
    }

    const newEntry = {
      question: currentQ.q,
      answer,
      score: evalData.score,
      feedback: evalData.feedback,
      improvements: evalData.improvements || []
    }
    const updatedHistory = [...history, newEntry]
    setHistory(updatedHistory)
    setEvaluation(evalData)

    const isLast = currentQIdx + 1 >= activeLevel.questions.length
    if (!isLast) {
      setCurrentQIdx(prev => prev + 1)
      setAnswer('')
      startTimer(activeLevel.timePerQ)
    } else {
      // Level complete — calculate result
      const avgScore = updatedHistory.reduce((s, h) => s + h.score, 0) / updatedHistory.length
      const passed = avgScore >= activeLevel.requiredScore

      setLevelScores(prev => ({ ...prev, [activeLevel.id]: avgScore }))

      if (passed) {
        const nextLevel = Math.min(5, activeLevel.id + 1)
        if (nextLevel > unlockedLevel) setUnlockedLevel(nextLevel)
        if (user) updateUser({ ...user, xp: (user?.xp || 0) + activeLevel.xp })
        setShowCelebration({ level: activeLevel, avgScore, passed: true })
      } else {
        setShowCelebration({ level: activeLevel, avgScore, passed: false })
      }

      setPhase('result')
    }

    setLoading(false)
  }

  const speakQuestion = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.rate = 0.9; u.lang = 'en-US'
      window.speechSynthesis.speak(u)
    }
  }

  const goToMap = () => {
    stopTimer()
    setPhase('map')
    setActiveLevel(null)
    setHistory([])
    setEvaluation(null)
    setShowCelebration(null)
  }

  const retryLevel = () => {
    setShowCelebration(null)
    enterLevel(activeLevel)
  }

  // ─── OVERALL READINESS ──────────────────────────────────────────────────────
  const completedLevels = Object.keys(levelScores).length
  const totalAvg = completedLevels > 0
    ? (Object.values(levelScores).reduce((s, v) => s + v, 0) / completedLevels).toFixed(1)
    : null

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>

      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '2.5rem' }}>🎤</span>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
                AI Mock Interview — 5-Level Readiness System
              </h1>
              <p style={{ color: '#93c5fd', fontSize: '0.85rem', margin: 0 }}>
                Complete all 5 levels to be 100% interview-ready for any campus placement drive
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {totalAvg && (
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.85rem', padding: '0.5rem 1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Overall Avg Score</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '900', color: getGrade(parseFloat(totalAvg)).color }}>{totalAvg}/10</div>
            </div>
          )}
          <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.85rem', padding: '0.5rem 1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Progress</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '900', color: completedLevels === 5 ? '#4ade80' : '#fbbf24' }}>
              {completedLevels}/5 Levels
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── READINESS PROGRESS BAR ──────────────────────────────────────────── */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ color: '#cbd5e1', fontSize: '0.82rem', fontWeight: '700' }}>📈 Interview Readiness</span>
          <span style={{ color: completedLevels === 5 ? '#4ade80' : '#fbbf24', fontWeight: '800', fontSize: '0.85rem' }}>
            {completedLevels === 5 ? '✅ FULLY PREPARED!' : `${completedLevels * 20}% Prepared`}
          </span>
        </div>
        <div style={{ width: '100%', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', height: '12px', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completedLevels * 20}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              height: '100%',
              borderRadius: '8px',
              background: completedLevels === 5
                ? 'linear-gradient(90deg, #10b981, #059669)'
                : 'linear-gradient(90deg, #3b82f6, #8b5cf6)'
            }}
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MAP VIEW — 5 Level Cards                                               */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {phase === 'map' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {INTERVIEW_LEVELS.map((lvl) => {
            const isUnlocked = lvl.id <= unlockedLevel
            const score = levelScores[lvl.id]
            const passed = score !== undefined && score >= lvl.requiredScore
            const gradeInfo = score !== undefined ? getGrade(score) : null

            return (
              <motion.div
                key={lvl.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: lvl.id * 0.07 }}
                style={{
                  background: isUnlocked ? lvl.gradient : 'rgba(255,255,255,0.02)',
                  border: `2px solid ${isUnlocked ? lvl.border : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: '1.25rem',
                  padding: '1.5rem',
                  opacity: isUnlocked ? 1 : 0.45,
                  cursor: isUnlocked ? 'default' : 'not-allowed',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}
              >
                {/* Left side */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: 1, minWidth: '240px' }}>
                  <span style={{ fontSize: '2.5rem', flexShrink: 0 }}>{passed ? '✅' : isUnlocked ? lvl.icon : '🔒'}</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <span style={{ color: isUnlocked ? lvl.color : '#64748b', fontWeight: '900', fontSize: '0.8rem' }}>
                        LEVEL {lvl.id}
                      </span>
                      <span style={{ background: `${lvl.color}22`, color: lvl.color, padding: '0.1rem 0.45rem', borderRadius: '0.4rem', fontSize: '0.7rem', fontWeight: '800' }}>
                        +{lvl.xp} XP
                      </span>
                      {score !== undefined && (
                        <span style={{ background: `${gradeInfo.color}22`, color: gradeInfo.color, padding: '0.1rem 0.45rem', borderRadius: '0.4rem', fontSize: '0.7rem', fontWeight: '800' }}>
                          Grade {gradeInfo.grade} ({score.toFixed(1)}/10)
                        </span>
                      )}
                    </div>
                    <div style={{ color: 'white', fontWeight: '800', fontSize: '1rem', marginBottom: '0.2rem' }}>
                      {lvl.title}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                      {lvl.subtitle} · {lvl.questions.length} questions · {lvl.timePerQ}s/question
                    </div>
                  </div>
                </div>

                {/* Right side — action button */}
                <div style={{ flexShrink: 0 }}>
                  {!isUnlocked ? (
                    <span style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: '700' }}>
                      🔒 Complete Level {lvl.id - 1} first
                    </span>
                  ) : (
                    <button
                      onClick={() => enterLevel(lvl)}
                      style={{
                        background: passed
                          ? 'rgba(255,255,255,0.1)'
                          : `linear-gradient(135deg, ${lvl.color}, ${lvl.color}99)`,
                        color: passed ? '#cbd5e1' : '#0f172a',
                        border: `1px solid ${passed ? 'rgba(255,255,255,0.15)' : 'transparent'}`,
                        borderRadius: '0.75rem',
                        padding: '0.6rem 1.25rem',
                        fontWeight: '900',
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {passed ? '🔁 Re-attempt Level' : '▶ Start Level'}
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}

          {/* Fully Prepared Banner */}
          {completedLevels === 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'linear-gradient(135deg, #052e16, #065f46)',
                border: '2px solid #10b981',
                borderRadius: '1.25rem',
                padding: '1.75rem',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🏆</div>
              <h2 style={{ color: '#4ade80', fontWeight: '900', fontSize: '1.5rem', margin: '0 0 0.5rem' }}>
                You Are 100% Interview Ready!
              </h2>
              <p style={{ color: '#a7f3d0', fontSize: '0.9rem', margin: 0 }}>
                Congratulations! You have passed all 5 levels of mock interview preparation. You are equipped for any campus placement drive!
              </p>
            </motion.div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SESSION VIEW — Active Interview                                         */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {phase === 'session' && activeLevel && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          {/* Session Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button
              onClick={goToMap}
              style={{ background: 'rgba(255,255,255,0.08)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.65rem', padding: '0.45rem 1rem', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer' }}
            >
              ← Exit Interview
            </button>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ background: `${activeLevel.color}22`, color: activeLevel.color, padding: '0.3rem 0.75rem', borderRadius: '0.5rem', fontWeight: '800', fontSize: '0.8rem' }}>
                {activeLevel.icon} Level {activeLevel.id}
              </span>
              <span style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', padding: '0.3rem 0.75rem', borderRadius: '0.5rem', fontWeight: '800', fontSize: '0.8rem' }}>
                Q {currentQIdx + 1} / {activeLevel.questions.length}
              </span>
              <span style={{
                background: timer < 15 ? 'rgba(239,68,68,0.2)' : 'rgba(251,191,36,0.15)',
                color: timer < 15 ? '#f87171' : '#fbbf24',
                padding: '0.3rem 0.75rem',
                borderRadius: '0.5rem',
                fontWeight: '900',
                fontSize: '0.85rem',
                animation: timer < 10 ? 'pulse 0.5s infinite' : 'none'
              }}>
                ⏱️ {timer}s
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '8px', height: '6px', overflow: 'hidden' }}>
            <div style={{ width: `${((currentQIdx) / activeLevel.questions.length) * 100}%`, background: activeLevel.color, height: '100%', transition: 'width 0.4s ease' }} />
          </div>

          {/* Question Card */}
          <motion.div
            key={currentQIdx}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              background: activeLevel.gradient,
              border: `1px solid ${activeLevel.border}`,
              borderRadius: '1.25rem',
              padding: '1.75rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span style={{ color: activeLevel.color, fontWeight: '900', fontSize: '0.82rem' }}>
                ❓ QUESTION {currentQIdx + 1}
              </span>
              <button
                onClick={() => speakQuestion(activeLevel.questions[currentQIdx].q)}
                style={{ background: 'rgba(255,255,255,0.1)', color: '#cbd5e1', border: 'none', borderRadius: '0.5rem', padding: '0.3rem 0.7rem', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer' }}
              >
                🔊 Listen
              </button>
            </div>

            <p style={{ color: 'white', fontSize: '1.1rem', fontWeight: '700', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
              {activeLevel.questions[currentQIdx].q}
            </p>

            <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '0.5rem', padding: '0.6rem 0.9rem', marginBottom: '1.25rem', fontSize: '0.75rem', color: '#94a3b8' }}>
              💡 Tip: Use the <strong style={{ color: activeLevel.color }}>STAR Method</strong> — Situation → Task → Action → Result
            </div>

            <textarea
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="Type your structured answer here... (Use STAR: Situation, Task, Action, Result)"
              rows={5}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.07)',
                border: `1px solid ${activeLevel.border}`,
                borderRadius: '0.75rem',
                padding: '1rem',
                color: 'white',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                outline: 'none',
                resize: 'vertical',
                boxSizing: 'border-box',
                marginBottom: '1rem'
              }}
            />

            <button
              onClick={submitAnswer}
              disabled={loading || !answer.trim()}
              style={{
                width: '100%',
                padding: '0.9rem',
                borderRadius: '0.75rem',
                background: loading || !answer.trim()
                  ? 'rgba(255,255,255,0.08)'
                  : `linear-gradient(135deg, ${activeLevel.color}, ${activeLevel.color}99)`,
                color: loading || !answer.trim() ? '#64748b' : '#0f172a',
                fontWeight: '900',
                fontSize: '1rem',
                border: 'none',
                cursor: loading || !answer.trim() ? 'not-allowed' : 'pointer',
                boxShadow: !loading && answer.trim() ? `0 4px 20px ${activeLevel.color}44` : 'none'
              }}
            >
              {loading
                ? '🤖 AI Evaluating Your Answer...'
                : currentQIdx + 1 < activeLevel.questions.length
                  ? `Submit & Next Question (${currentQIdx + 1}/${activeLevel.questions.length}) ➔`
                  : `Submit Final Answer & See Results 🏁`
              }
            </button>
          </motion.div>

          {/* Last Evaluation Feedback */}
          {evaluation && history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.3)',
                borderRadius: '1rem',
                padding: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ color: '#4ade80', fontWeight: '800' }}>📊 Previous Answer Feedback</span>
                <span style={{ background: evaluation.score >= 7 ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)', color: evaluation.score >= 7 ? '#4ade80' : '#fbbf24', padding: '0.2rem 0.6rem', borderRadius: '0.5rem', fontWeight: '900', fontSize: '0.85rem' }}>
                  Score: {evaluation.score}/10
                </span>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: 0, lineHeight: 1.6 }}>
                {evaluation.feedback}
              </p>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* RESULT VIEW — Scorecard after level completion                          */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {phase === 'result' && activeLevel && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          {/* Level Report Card */}
          {(() => {
            const avgScore = history.reduce((s, h) => s + h.score, 0) / history.length
            const passed = avgScore >= activeLevel.requiredScore
            const gradeInfo = getGrade(avgScore)
            return (
              <>
                <div style={{
                  background: passed ? 'linear-gradient(135deg, #052e16, #065f46)' : 'linear-gradient(135deg, #27160a, #78350f)',
                  border: `2px solid ${passed ? '#10b981' : '#f59e0b'}`,
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{passed ? '🎉' : '⚠️'}</div>
                  <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.5rem', margin: '0 0 0.5rem' }}>
                    {passed ? `Level ${activeLevel.id} Passed!` : `Level ${activeLevel.id} — Retry Needed`}
                  </h2>
                  <p style={{ color: passed ? '#a7f3d0' : '#fde68a', fontSize: '0.9rem', margin: '0 0 1.25rem' }}>
                    {passed
                      ? `Excellent performance! You scored ${avgScore.toFixed(1)}/10 (need ${activeLevel.requiredScore}). +${activeLevel.xp} XP earned!`
                      : `You scored ${avgScore.toFixed(1)}/10 but need ${activeLevel.requiredScore}+ to pass. Review feedback and retry!`
                    }
                  </p>

                  {/* Score Grid */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '0.85rem', padding: '0.75rem 1.25rem', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Avg Score</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: '900', color: gradeInfo.color }}>{avgScore.toFixed(1)}/10</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '0.85rem', padding: '0.75rem 1.25rem', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Grade</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: '900', color: gradeInfo.color }}>{gradeInfo.grade}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '0.85rem', padding: '0.75rem 1.25rem', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Questions</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: '900', color: 'white' }}>{history.length}/{activeLevel.questions.length}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                      onClick={retryLevel}
                      style={{ background: 'rgba(255,255,255,0.1)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '0.75rem', padding: '0.65rem 1.25rem', fontWeight: '800', cursor: 'pointer' }}
                    >
                      🔁 Retry Level {activeLevel.id}
                    </button>
                    <button
                      onClick={goToMap}
                      style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: 'white', border: 'none', borderRadius: '0.75rem', padding: '0.65rem 1.25rem', fontWeight: '800', cursor: 'pointer' }}
                    >
                      ← Back to Level Map
                    </button>
                  </div>
                </div>

                {/* Q&A Review */}
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
                  <h3 style={{ color: 'white', fontWeight: '800', margin: '0 0 1rem', fontSize: '1.05rem' }}>
                    📝 Full Interview Report Card
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {history.map((h, i) => {
                      const hGrade = getGrade(h.score)
                      return (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.85rem', padding: '1rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{ color: '#94a3b8', fontWeight: '700', fontSize: '0.78rem' }}>Q{i + 1}</span>
                            <span style={{ background: `${hGrade.color}22`, color: hGrade.color, padding: '0.15rem 0.5rem', borderRadius: '0.4rem', fontWeight: '800', fontSize: '0.75rem' }}>
                              {h.score}/10 · {hGrade.grade}
                            </span>
                          </div>
                          <p style={{ color: '#e2e8f0', fontSize: '0.85rem', fontWeight: '700', margin: '0 0 0.35rem' }}>❓ {h.question}</p>
                          <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: '0 0 0.5rem', lineHeight: 1.5 }}>📝 {h.answer}</p>
                          <p style={{ color: '#4ade80', fontSize: '0.78rem', margin: 0 }}>💬 {h.feedback}</p>
                          {h.improvements?.length > 0 && (
                            <div style={{ marginTop: '0.5rem' }}>
                              {h.improvements.map((imp, j) => (
                                <span key={j} style={{ background: 'rgba(59,130,246,0.12)', color: '#93c5fd', padding: '0.2rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.72rem', marginRight: '0.3rem', display: 'inline-block', marginTop: '0.2rem' }}>
                                  ↑ {imp}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </>
            )
          })()}
        </motion.div>
      )}
    </div>
  )
}
