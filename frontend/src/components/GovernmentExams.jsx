import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { GOVT_EXAMS_MASTER } from '../data/govtExamsMasterData'
import { useAuth } from '../context/AuthContext'

export default function GovernmentExams() {
  const { user } = useAuth()
  const candidateName = user?.name || 'Aspirant'

  const [selectedExam, setSelectedExam] = useState(GOVT_EXAMS_MASTER[0])
  const [activeTab, setActiveTab] = useState('levels') // 'levels', 'pyq', 'learn', 'flow', 'dates'
  
  // Drill-down inside a level: null or 1, 2, 3, 4
  const [activeLevelDrilldown, setActiveLevelDrilldown] = useState(null)

  // Active reading module state (for Learning Hub)
  const [readingModule, setReadingModule] = useState(null)

  // Test Runner State (CBT Exam Mode)
  const [activeTest, setActiveTest] = useState(null) // active test object or null
  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [flagged, setFlagged] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [testSubmitted, setTestSubmitted] = useState(false)
  const [testResult, setTestResult] = useState(null)

  // Timer Effect
  useEffect(() => {
    let interval = null
    if (activeTest && !testSubmitted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            handleSubmitExam()
            toast.error('⏰ Time is up! Exam auto-submitted.')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeTest, testSubmitted, timeLeft])

  // Launch any test (PYQ or a specific Level paper)
  const launchExam = (testObj, parentLevel = null) => {
    setActiveTest({ ...testObj, parentLevel })
    setCurrentQIndex(0)
    setAnswers({})
    setFlagged({})
    setTimeLeft(testObj.timeLimitMins * 60)
    setTestSubmitted(false)
    setTestResult(null)
    toast.success(`🚀 Started: ${testObj.title}! Best of luck!`)
    window.scrollTo({ top: 350, behavior: 'smooth' })
  }

  const handleSelectOption = (qId, optionIdx) => {
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }))
  }

  const handleClearOption = (qId) => {
    setAnswers(prev => {
      const copy = { ...prev }
      delete copy[qId]
      return copy
    })
  }

  const toggleFlag = (qId) => {
    setFlagged(prev => ({ ...prev, [qId]: !prev[qId] }))
  }

  // AI Evaluation Logic
  const handleSubmitExam = () => {
    if (!activeTest) return

    let correctCount = 0
    let wrongCount = 0
    let unattempted = 0
    let totalScore = 0
    const marksPerQ = 10
    const negMark = activeTest.negativeMark || 0

    activeTest.questions.forEach(q => {
      const selected = answers[q.id]
      if (selected === undefined) {
        unattempted++
      } else if (selected === q.correct) {
        correctCount++
        totalScore += marksPerQ
      } else {
        wrongCount++
        totalScore -= (negMark * marksPerQ)
      }
    })

    const maxScore = activeTest.questions.length * marksPerQ
    const percentage = Math.max(0, Math.round((totalScore / maxScore) * 100))
    const passingCutoff = activeTest.passingCutoff || 65
    const isEligible = percentage >= passingCutoff
    const isHardestLevel = activeTest.parentLevel?.levelNumber === 4 || activeTest.title?.includes('Hardest') || activeTest.title?.includes('Qualifier')

    // AI Evaluation Verdict Generation
    let aiEvaluation = {}
    if (percentage >= 85) {
      aiEvaluation = {
        grade: 'A+ (Top 1% Exceptional Mastery)',
        speedRating: 'Fast & Highly Accurate',
        strengths: 'Outstanding conceptual clarity, zero negative penalty leakage, solid elimination technique.',
        aiAdvice: 'You are performing at an All-India Rank 1 to 50 caliber! Maintain momentum by taking full-length timed mocks.',
        rankPrediction: 'Predicted All-India Rank: Top 0.5% (AIR < 100)'
      }
    } else if (percentage >= 70) {
      aiEvaluation = {
        grade: 'A (Cutoff Cleared / Strong Readiness)',
        speedRating: 'Good Speed & Competent Accuracy',
        strengths: 'Strong grasp of core static concepts and direct elimination methods.',
        aiAdvice: 'Clear the negative marking traps in multi-statement questions by reading exceptions carefully.',
        rankPrediction: 'Predicted Rank: Qualified for Mains / Final Selection (Top 5%)'
      }
    } else if (percentage >= 50) {
      aiEvaluation = {
        grade: 'B (Moderate / Needs Focused Revision)',
        speedRating: 'Average Speed / Moderate Guesswork',
        strengths: 'Basic formulas and definitions are intact.',
        aiAdvice: 'Revisit the Learning Hub notes on constitutional articles and high-yield numerical shortcuts before re-attempting.',
        rankPrediction: 'Near Cutoff Boundary (Needs +15% boost to ensure safe merit rank)'
      }
    } else {
      aiEvaluation = {
        grade: 'C (Foundation Review Needed)',
        speedRating: 'Struggled with Tricky Statements',
        strengths: 'Completed full attempt.',
        aiAdvice: 'Go through Level 1 Foundation Sets first to build fundamental NCERT memory, then progress to Level 2.',
        rankPrediction: 'Below Cutoff (Requires systematic module revision)'
      }
    }

    const result = {
      score: Math.max(0, Math.round(totalScore)),
      maxScore,
      percentage,
      correctCount,
      wrongCount,
      unattempted,
      isEligible,
      passingCutoff,
      isHardestLevel,
      aiEvaluation,
      completedAt: new Date().toLocaleString(),
      examName: selectedExam.name,
      testTitle: activeTest.title
    }

    setTestResult(result)
    setTestSubmitted(true)

    if (isEligible) {
      if (isHardestLevel) {
        toast.success(`🏆 AI EVALUATION: Outstanding! You scored ${percentage}% on Level 4! Certified 100% Exam-Ready!`, { duration: 7000 })
      } else {
        toast.success(`🎉 AI EVALUATION: Level Passed with ${percentage}%! Ready for next level!`, { duration: 5000 })
      }
    } else {
      toast.error(`⚠️ AI EVALUATION: Scored ${percentage}% (Cutoff: ${passingCutoff}%). Review AI suggestions and retry!`, { duration: 6000 })
    }
  }

  const exitExam = () => {
    setActiveTest(null)
    setTestSubmitted(false)
    setTestResult(null)
  }

  const currentLevelObj = selectedExam.progressiveLevels?.find(l => l.levelNumber === activeLevelDrilldown)
  const currentQ = activeTest?.questions[currentQIndex]

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
            <span style={{ fontSize: '2.5rem' }}>🏛️</span>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
                All Government Exams & Public Sector Career Hub
              </h1>
              <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
                Click any Level (Level 1 to 4) to open its set of Question Papers, attend live CBT exams & get instant AI Evaluation!
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.4)', padding: '0.4rem 0.9rem', borderRadius: '2rem', fontWeight: '800', fontSize: '0.8rem' }}>
            🤖 AI Exam Evaluator Active
          </span>
        </div>
      </motion.div>

      {/* ── EXAM SELECTOR TILES ─────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
        {GOVT_EXAMS_MASTER.map(ex => {
          const isSelected = selectedExam.id === ex.id
          return (
            <motion.div
              key={ex.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedExam(ex)
                setActiveTest(null)
                setTestSubmitted(false)
                setActiveLevelDrilldown(null)
              }}
              style={{
                background: isSelected ? 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(37,99,235,0.25))' : 'rgba(255,255,255,0.03)',
                border: isSelected ? '2px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1rem',
                padding: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{ex.icon}</span>
                <span style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', padding: '0.15rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.7rem', fontWeight: '800' }}>
                  {ex.category}
                </span>
              </div>
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '0.95rem', margin: '0.2rem 0' }}>
                {ex.shortName}
              </h3>
              <div style={{ color: '#4ade80', fontSize: '0.75rem', fontWeight: '700' }}>
                {ex.vacancies}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* ── EXAM MAIN CONTAINER ─────────────────────────────────────── */}
      <motion.div
        key={selectedExam.id}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
        }}
      >
        {/* Selected Exam Title Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
              {selectedExam.category} OFFICIAL NOTIFICATION & PREPARATION BLUEPRINT
            </span>
            <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.4rem', margin: '0.4rem 0 0.2rem' }}>
              {selectedExam.icon} {selectedExam.name}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
              Conducted by: <strong style={{ color: '#ffffff' }}>{selectedExam.conductingBody}</strong> · Salary: <strong style={{ color: '#4ade80' }}>{selectedExam.salary}</strong>
            </p>
          </div>

          <a
            href={selectedExam.applyLink}
            target="_blank"
            rel="noreferrer"
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              padding: '0.6rem 1.25rem',
              borderRadius: '0.65rem',
              fontWeight: '900',
              fontSize: '0.85rem',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(16,185,129,0.35)'
            }}
          >
            🔗 Official Online Application Portal ➔
          </a>
        </div>

        {/* Navigation Tabs (Hidden during active test) */}
        {!activeTest && (
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { id: 'levels', label: '📊 4 Exam Difficulty Levels' },
              { id: 'pyq', label: `📑 Previous Year Papers (${selectedExam.pyqPapers?.length || 0} Sets)` },
              { id: 'learn', label: `📖 Deep Syllabus & Learning Hub` },
              { id: 'flow', label: '🧭 Candidate Preparation Flow' },
              { id: 'dates', label: '🗓️ Dates & Eligibility' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id)
                  setReadingModule(null)
                  setActiveLevelDrilldown(null)
                }}
                style={{
                  padding: '0.55rem 1.1rem',
                  borderRadius: '0.65rem',
                  background: activeTab === t.id ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.04)',
                  border: activeTab === t.id ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                  color: activeTab === t.id ? 'white' : '#94a3b8',
                  fontWeight: '800',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* ── TAB 1: 4 EXAM DIFFICULTY LEVELS WITH INSIDE QUESTION PAPERS */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {!activeTest && activeTab === 'levels' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* View A: When user is viewing the 4 Level Cards */}
            {activeLevelDrilldown === null ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1rem', padding: '1rem 1.25rem' }}>
                  <span style={{ color: '#c4b5fd', fontWeight: '800', fontSize: '0.9rem' }}>
                    👇 Click on ANY Level below to go INSIDE and attend its Question Papers:
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  {selectedExam.progressiveLevels?.map(lvl => {
                    const isHardest = lvl.levelNumber === 4
                    return (
                      <motion.div
                        key={lvl.levelNumber}
                        whileHover={{ y: -4, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveLevelDrilldown(lvl.levelNumber)}
                        style={{
                          background: isHardest
                            ? 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(185,28,28,0.08))'
                            : 'rgba(255,255,255,0.03)',
                          borderRadius: '1rem',
                          padding: '1.35rem',
                          border: `2px solid ${isHardest ? '#ef4444' : '#8b5cf6'}`,
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          boxShadow: isHardest ? '0 8px 25px rgba(239,68,68,0.2)' : '0 8px 25px rgba(124,58,237,0.15)'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                            <div style={{ color: isHardest ? '#f87171' : '#4ade80', fontWeight: '900', fontSize: '1.05rem' }}>
                              Level {lvl.levelNumber} ({lvl.levelNumber === 1 ? 'Easy' : lvl.levelNumber === 2 ? 'Medium' : lvl.levelNumber === 3 ? 'Hard' : 'Very Very Hard / Qualifier'})
                            </div>
                            <span style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', padding: '0.15rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
                              {lvl.papers?.length} Papers
                            </span>
                          </div>

                          <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: '0.5rem 0', lineHeight: 1.5 }}>
                            {lvl.levelDescription}
                          </p>

                          {isHardest && (
                            <div style={{ marginTop: '0.6rem', background: 'rgba(239,68,68,0.2)', color: '#f87171', padding: '0.35rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
                              🚨 Qualifier Level: Must pass to be certified exam-ready!
                            </div>
                          )}
                        </div>

                        <div style={{
                          marginTop: '1.25rem',
                          background: isHardest ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #7c3aed, #2563eb)',
                          color: 'white',
                          padding: '0.6rem',
                          borderRadius: '0.6rem',
                          fontWeight: '900',
                          fontSize: '0.85rem',
                          textAlign: 'center',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                        }}>
                          👉 Click to Open Level {lvl.levelNumber} Papers ➔
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ) : (
              /* View B: INSIDE the Selected Level -> Shows its set of Question Papers */
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: `2px solid ${activeLevelDrilldown === 4 ? 'rgba(239,68,68,0.5)' : 'rgba(139,92,246,0.4)'}`,
                  borderRadius: '1.25rem',
                  padding: '1.75rem'
                }}
              >
                {/* Header with Back Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                  <button
                    onClick={() => setActiveLevelDrilldown(null)}
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: 'white',
                      padding: '0.55rem 1.2rem',
                      borderRadius: '0.65rem',
                      fontWeight: '800',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    ⬅ Back to All 4 Levels
                  </button>

                  <div>
                    <span style={{ background: activeLevelDrilldown === 4 ? 'rgba(239,68,68,0.2)' : 'rgba(124,58,237,0.2)', color: activeLevelDrilldown === 4 ? '#f87171' : '#c4b5fd', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
                      LEVEL {activeLevelDrilldown} QUESTION PAPERS
                    </span>
                    <h3 style={{ color: activeLevelDrilldown === 4 ? '#f87171' : 'white', margin: '0.25rem 0 0', fontSize: '1.2rem', fontWeight: '900' }}>
                      {currentLevelObj?.levelTitle}
                    </h3>
                  </div>
                </div>

                <p style={{ color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  Select any question paper below to attend under live CBT exam conditions. Upon submission, the AI Evaluator will grade your attempt, provide diagnostic feedback, and record your score.
                </p>

                {/* Multiple Question Papers Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                  {currentLevelObj?.papers?.map((paper, pIdx) => (
                    <motion.div
                      key={paper.id || pIdx}
                      whileHover={{ y: -3 }}
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '1rem',
                        padding: '1.35rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                          <span style={{ color: '#fbbf24', fontWeight: '900', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                            Code: {paper.paperCode}
                          </span>
                          <span style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', padding: '0.15rem 0.45rem', borderRadius: '0.35rem', fontSize: '0.7rem', fontWeight: '800' }}>
                            {paper.questions?.length} Questions
                          </span>
                        </div>

                        <h4 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem', margin: '0.3rem 0 0.5rem' }}>
                          {paper.title}
                        </h4>

                        <div style={{ color: '#94a3b8', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', margin: '0 0 1.25rem' }}>
                          <div>⏱️ Duration: <strong style={{ color: 'white' }}>{paper.timeLimitMins} Minutes</strong></div>
                          <div>🎯 Passing Cutoff: <strong style={{ color: '#4ade80' }}>{paper.passingCutoff}%</strong></div>
                          <div>⚠️ Negative Penalty: <strong style={{ color: '#f87171' }}>-{paper.negativeMark} Marks</strong></div>
                        </div>
                      </div>

                      <button
                        onClick={() => launchExam(paper, currentLevelObj)}
                        style={{
                          background: activeLevelDrilldown === 4 ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #7c3aed, #2563eb)',
                          color: 'white',
                          border: 'none',
                          padding: '0.75rem',
                          borderRadius: '0.65rem',
                          fontWeight: '900',
                          fontSize: '0.88rem',
                          cursor: 'pointer',
                          textAlign: 'center',
                          boxShadow: activeLevelDrilldown === 4 ? '0 4px 15px rgba(239,68,68,0.35)' : '0 4px 15px rgba(124,58,237,0.25)'
                        }}
                      >
                        ✍️ Attend This Exam Paper (Live CBT) ➔
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* ── TAB 2: PREVIOUS YEARS QUESTION PAPERS (PYQ VAULT) ────────── */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {!activeTest && activeTab === 'pyq' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '1rem', padding: '1.25rem' }}>
              <h3 style={{ color: '#93c5fd', margin: '0 0 0.35rem', fontSize: '1.05rem', fontWeight: '800' }}>
                📑 Previous Year Question Papers Vault (Touch ANY Paper to Attend)
              </h3>
              <p style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                Every past paper from 2018 to 2024 is listed below. Click <strong>"Attend This Exam"</strong> to enter the real interactive CBT test arena with timers and instant AI Evaluation.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {selectedExam.pyqPapers?.map((pyq, pIdx) => (
                <motion.div
                  key={pyq.id || pIdx}
                  whileHover={{ y: -3 }}
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.75rem', fontWeight: '900' }}>
                        Year {pyq.year}
                      </span>
                      <span style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', padding: '0.15rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.7rem', fontWeight: '800' }}>
                        Verified Official
                      </span>
                    </div>

                    <h4 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem', margin: '0.4rem 0 0.5rem' }}>
                      {pyq.title}
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1.25rem' }}>
                      <div>⏱️ Time Limit: <strong style={{ color: 'white' }}>{pyq.timeLimitMins} Minutes</strong></div>
                      <div>📝 Questions: <strong style={{ color: 'white' }}>{pyq.questions?.length} Qs</strong> · Total: <strong style={{ color: '#4ade80' }}>{pyq.totalMarks} Marks</strong></div>
                      <div>⚠️ Negative Penalty: <strong style={{ color: '#f87171' }}>-{pyq.negativeMark} Marks</strong></div>
                    </div>
                  </div>

                  <button
                    onClick={() => launchExam(pyq)}
                    style={{
                      background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem',
                      borderRadius: '0.65rem',
                      fontWeight: '900',
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(37,99,235,0.3)',
                      textAlign: 'center'
                    }}
                  >
                    ✍️ Attend {pyq.year} Exam Paper ➔
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* ── TAB 3: INTERACTIVE LEARNING HUB ─────────────────────────── */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {!activeTest && activeTab === 'learn' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1rem', padding: '1.25rem' }}>
              <h3 style={{ color: '#c4b5fd', margin: '0 0 0.35rem', fontSize: '1.05rem', fontWeight: '800' }}>
                📖 Interactive Concept Learning & Revision Hub
              </h3>
              <p style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                Learn high-yield topics, memory tricks, key facts, and formulas before attempting past papers and hardest level qualifier exams.
              </p>
            </div>

            {readingModule ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #8b5cf6', borderRadius: '1rem', padding: '1.75rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '1.8rem', marginRight: '0.5rem' }}>{readingModule.icon}</span>
                    <strong style={{ color: 'white', fontSize: '1.2rem' }}>{readingModule.subject}</strong>
                  </div>
                  <button
                    onClick={() => setReadingModule(null)}
                    style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#cbd5e1', padding: '0.4rem 0.8rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem' }}
                  >
                    ✕ Close Lesson
                  </button>
                </div>

                <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.88rem', marginBottom: '0.5rem' }}>
                    ⚡ High-Yield Key Exam Facts:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#fef08a', fontSize: '0.85rem', lineHeight: 1.7 }}>
                    {readingModule.keyFacts?.map((fact, idx) => (
                      <li key={idx}>{fact}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.7, whiteSpace: 'pre-line', background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                  {readingModule.conceptNotes}
                </div>
              </motion.div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {selectedExam.learningModules?.map((mod, mIdx) => (
                  <motion.div
                    key={mod.id || mIdx}
                    whileHover={{ y: -3 }}
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '1.8rem' }}>{mod.icon}</span>
                        <span style={{ background: 'rgba(96,165,250,0.15)', color: '#93c5fd', padding: '0.15rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.7rem', fontWeight: '700' }}>
                          ⏱️ {mod.readTime}
                        </span>
                      </div>
                      <h4 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem', margin: '0.3rem 0 0.5rem' }}>
                        {mod.subject}
                      </h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 1rem' }}>
                        {mod.summary}
                      </p>
                    </div>

                    <button
                      onClick={() => setReadingModule(mod)}
                      style={{
                        background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                        color: 'white',
                        border: 'none',
                        padding: '0.65rem',
                        borderRadius: '0.6rem',
                        fontWeight: '800',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      📖 Open & Learn Lesson ➔
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* ── TAB 4: CANDIDATE FLOW ──────────────────────────────────── */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {!activeTest && activeTab === 'flow' && (
          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { title: 'Student Profile & Educational Category', desc: selectedExam.degreeRequired, icon: '🎓' },
                { title: 'Eligible Career Roles & Posts', desc: selectedExam.eligiblePosts, icon: '💼' },
                { title: 'Age Limit & Relaxations', desc: selectedExam.ageLimit, icon: '⏳' },
                { title: 'Salary & Compensation Scale', desc: selectedExam.salary, icon: '💰' },
                { title: 'Official Application Cycle', desc: `Notification: ${selectedExam.dates?.notification} | Exam: ${selectedExam.dates?.prelims || selectedExam.dates?.tier1}`, icon: '🗓️' }
              ].map((step, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '0.85rem 1rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '1.4rem' }}>{step.icon}</span>
                  <div>
                    <div style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.88rem' }}>{step.title}</div>
                    <div style={{ color: '#cbd5e1', fontSize: '0.82rem', marginTop: '0.15rem' }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* ── TAB 5: DATES & ELIGIBILITY ─────────────────────────────── */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {!activeTest && activeTab === 'dates' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ color: '#60a5fa', fontWeight: '800', margin: '0 0 0.75rem', fontSize: '1.05rem' }}>🎓 Degree & Age Eligibility</h4>
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 0.75rem' }}>
                <strong>Degree Required:</strong> {selectedExam.degreeRequired}
              </p>
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 0.75rem' }}>
                <strong>Eligible Posts:</strong> {selectedExam.eligiblePosts}
              </p>
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                <strong>Age Limit:</strong> {selectedExam.ageLimit}
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ color: '#fbbf24', fontWeight: '800', margin: '0 0 0.75rem', fontSize: '1.05rem' }}>🗓️ Exam Dates & Expected Cutoffs</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {Object.entries(selectedExam.dates || {}).map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.35rem' }}>
                    <span style={{ textTransform: 'capitalize' }}>{k}:</span>
                    <strong style={{ color: '#ffffff' }}>{v}</strong>
                  </div>
                ))}
              </div>

              <div style={{ background: 'rgba(251,191,36,0.08)', borderRadius: '0.6rem', padding: '0.75rem', border: '1px solid rgba(251,191,36,0.2)', fontSize: '0.8rem' }}>
                <strong style={{ color: '#fbbf24' }}>Past Cutoff Benchmarks:</strong>
                <div style={{ color: '#e2e8f0', marginTop: '0.25rem' }}>
                  {Object.entries(selectedExam.cutoffMarks || {}).map(([k, v]) => (
                    <div key={k}>• {k}: {v}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* ── CBT INTERACTIVE EXAM RUNNER ARENA ───────────────────────── */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {activeTest && !testSubmitted && currentQ && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Top Toolbar */}
            <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '1rem', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ color: '#60a5fa', fontWeight: '800', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  Live Examination CBT Arena
                </span>
                <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.15rem', margin: '0.2rem 0 0' }}>
                  {activeTest.title}
                </h3>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ background: timeLeft < 120 ? 'rgba(239,68,68,0.25)' : 'rgba(124,58,237,0.25)', border: `1px solid ${timeLeft < 120 ? '#ef4444' : '#8b5cf6'}`, padding: '0.45rem 1rem', borderRadius: '0.75rem', color: timeLeft < 120 ? '#f87171' : '#c4b5fd', fontWeight: '900', fontSize: '1.2rem', fontFamily: 'monospace' }}>
                  ⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
                <button
                  onClick={handleSubmitExam}
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none',
                    padding: '0.55rem 1.25rem',
                    borderRadius: '0.65rem',
                    fontWeight: '900',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Submit Exam ✓
                </button>
                <button
                  onClick={exitExam}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: '#94a3b8',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '0.65rem',
                    fontWeight: '700',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  ✕ Exit
                </button>
              </div>
            </div>

            {/* Main Question & Question Palette Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.25rem' }}>
              {/* Question Screen */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ color: '#c4b5fd', fontWeight: '800', fontSize: '0.9rem' }}>
                      Question {currentQIndex + 1} of {activeTest.questions.length}
                    </span>
                    <button
                      onClick={() => toggleFlag(currentQ.id)}
                      style={{
                        background: flagged[currentQ.id] ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${flagged[currentQ.id] ? '#fbbf24' : 'rgba(255,255,255,0.1)'}`,
                        color: flagged[currentQ.id] ? '#fbbf24' : '#cbd5e1',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '0.5rem',
                        fontWeight: '700',
                        fontSize: '0.78rem',
                        cursor: 'pointer'
                      }}
                    >
                      {flagged[currentQ.id] ? '🚩 Marked for Review' : '🏳️ Mark for Review'}
                    </button>
                  </div>

                  <p style={{ color: 'white', fontSize: '1rem', lineHeight: 1.7, whiteSpace: 'pre-line', margin: '0 0 1.5rem' }}>
                    {currentQ.q}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {currentQ.options.map((opt, optIdx) => {
                      const isChosen = answers[currentQ.id] === optIdx
                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectOption(currentQ.id, optIdx)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.85rem',
                            padding: '0.85rem 1rem',
                            borderRadius: '0.75rem',
                            background: isChosen ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.02)',
                            border: isChosen ? '1.5px solid #8b5cf6' : '1px solid rgba(255,255,255,0.06)',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: isChosen ? '2px solid #8b5cf6' : '2px solid #64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '900', color: isChosen ? 'white' : '#94a3b8', background: isChosen ? '#7c3aed' : 'transparent' }}>
                            {String.fromCharCode(65 + optIdx)}
                          </div>
                          <span style={{ color: isChosen ? 'white' : '#cbd5e1', fontSize: '0.9rem' }}>
                            {opt}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Bottom Navigation Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem' }}>
                  <button
                    disabled={currentQIndex === 0}
                    onClick={() => setCurrentQIndex(prev => prev - 1)}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: currentQIndex === 0 ? '#64748b' : 'white',
                      padding: '0.6rem 1.25rem',
                      borderRadius: '0.6rem',
                      fontWeight: '800',
                      cursor: currentQIndex === 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    ⬅ Previous
                  </button>

                  <button
                    onClick={() => handleClearOption(currentQ.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#94a3b8',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Clear Response
                  </button>

                  {currentQIndex < activeTest.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQIndex(prev => prev + 1)}
                      style={{
                        background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                        color: 'white',
                        border: 'none',
                        padding: '0.6rem 1.5rem',
                        borderRadius: '0.6rem',
                        fontWeight: '800',
                        cursor: 'pointer'
                      }}
                    >
                      Next ➔
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitExam}
                      style={{
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        border: 'none',
                        padding: '0.6rem 1.5rem',
                        borderRadius: '0.6rem',
                        fontWeight: '900',
                        cursor: 'pointer'
                      }}
                    >
                      Submit Exam ✓
                    </button>
                  )}
                </div>
              </div>

              {/* Question Palette Sidebar */}
              <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.25rem' }}>
                <h4 style={{ color: 'white', margin: '0 0 0.75rem', fontSize: '0.92rem', fontWeight: '800' }}>
                  Question Palette ({activeTest.questions.length} Qs)
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {activeTest.questions.map((q, idx) => {
                    const isAnswered = answers[q.id] !== undefined
                    const isFlag = flagged[q.id]
                    const isCurrent = currentQIndex === idx

                    let bg = 'rgba(255,255,255,0.05)'
                    let color = '#94a3b8'
                    let border = '1px solid rgba(255,255,255,0.1)'

                    if (isCurrent) {
                      border = '2px solid #60a5fa'
                    }
                    if (isAnswered) {
                      bg = '#10b981'
                      color = 'white'
                      border = 'none'
                    } else if (isFlag) {
                      bg = '#fbbf24'
                      color = '#1e1b4b'
                      border = 'none'
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQIndex(idx)}
                        style={{
                          height: '40px',
                          borderRadius: '0.5rem',
                          background: bg,
                          color,
                          border,
                          fontWeight: '800',
                          fontSize: '0.85rem',
                          cursor: 'pointer'
                        }}
                      >
                        {idx + 1}
                      </button>
                    )
                  })}
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.75rem', color: '#cbd5e1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#10b981' }} />
                    Answered ({Object.keys(answers).length})
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#fbbf24' }} />
                    Marked for Review ({Object.values(flagged).filter(Boolean).length})
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)' }} />
                    Unanswered ({activeTest.questions.length - Object.keys(answers).length})
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* ── AI EVALUATION SCORECARD & CERTIFICATE SCREEN ────────────── */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {testSubmitted && testResult && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Top Back / Retake Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <button
                onClick={exitExam}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'white',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '0.65rem',
                  fontWeight: '800',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                ⬅ Back to Level Question Papers
              </button>

              <button
                onClick={() => launchExam(activeTest, activeTest.parentLevel)}
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '0.65rem',
                  fontWeight: '800',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                🔄 Re-Attempt This Paper
              </button>
            </div>

            {/* 100% Exam Readiness Certificate Card (for Level 4 / Hardest) */}
            {testResult.isEligible && testResult.isHardestLevel ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  background: 'linear-gradient(135deg, #064e3b 0%, #065f46 40%, #022c22 100%)',
                  border: '2px solid #34d399',
                  borderRadius: '1.5rem',
                  padding: '2.5rem',
                  boxShadow: '0 15px 50px rgba(52,211,153,0.3)',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🏆</div>
                <span style={{ background: 'rgba(52,211,153,0.2)', color: '#6ee7b7', padding: '0.3rem 0.85rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '0.05em' }}>
                  OFFICIAL READINESS & CUTOFF CLEARANCE CERTIFICATION
                </span>

                <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.8rem', margin: '0.75rem 0 0.25rem' }}>
                  100% Exam-Ready & Cleared for {testResult.examName}!
                </h2>
                <p style={{ color: '#a7f3d0', fontSize: '0.95rem', margin: '0 auto 1.5rem', maxWidth: '600px' }}>
                  Candidate <strong>{candidateName}</strong> has conquered the Level 4 Hardest Qualifier Paper with an AI Evaluated Score of <strong>{testResult.percentage}%</strong>.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem 1.5rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <div style={{ color: '#a7f3d0', fontSize: '0.75rem', textTransform: 'uppercase' }}>Final Score</div>
                    <div style={{ color: '#34d399', fontWeight: '900', fontSize: '1.5rem' }}>{testResult.score} / {testResult.maxScore}</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem 1.5rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <div style={{ color: '#a7f3d0', fontSize: '0.75rem', textTransform: 'uppercase' }}>Accuracy</div>
                    <div style={{ color: 'white', fontWeight: '900', fontSize: '1.5rem' }}>{testResult.correctCount}/{testResult.correctCount + testResult.wrongCount}</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem 1.5rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <div style={{ color: '#a7f3d0', fontSize: '0.75rem', textTransform: 'uppercase' }}>AI Rank Prediction</div>
                    <div style={{ color: '#6ee7b7', fontWeight: '900', fontSize: '1.5rem' }}>Top 0.5% (AIR &lt; 100)</div>
                  </div>
                </div>

                <div style={{ color: '#d1fae5', fontSize: '0.82rem', fontFamily: 'monospace' }}>
                  🔖 Verification Ref: CP-GOV-READY-{Math.floor(100000 + Math.random() * 900000)} · Verified: {testResult.completedAt}
                </div>
              </motion.div>
            ) : null}

            {/* AI Evaluator Detailed Diagnostic Box */}
            <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(139, 92, 246, 0.35)', borderRadius: '1.25rem', padding: '1.75rem', boxShadow: '0 8px 30px rgba(0,0,0,0.4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.8rem' }}>🤖</span>
                <div>
                  <h3 style={{ color: 'white', margin: 0, fontSize: '1.15rem', fontWeight: '900' }}>
                    AI Exam Diagnostic Evaluation Report
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: 0 }}>
                    Paper: <strong>{testResult.testTitle}</strong> · Candidate: <strong>{candidateName}</strong>
                  </p>
                </div>
              </div>

              {/* Score & Verdict Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.72rem', textTransform: 'uppercase' }}>Score / Percentage</div>
                  <div style={{ color: testResult.percentage >= testResult.passingCutoff ? '#4ade80' : '#f87171', fontWeight: '900', fontSize: '1.4rem' }}>
                    {testResult.score} / {testResult.maxScore} ({testResult.percentage}%)
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '0.2rem' }}>
                    Cutoff: <strong>{testResult.passingCutoff}%</strong> ({testResult.isEligible ? '✅ Cleared' : '❌ Needs Improvement'})
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.72rem', textTransform: 'uppercase' }}>AI Performance Grade</div>
                  <div style={{ color: '#fbbf24', fontWeight: '900', fontSize: '1.2rem' }}>
                    {testResult.aiEvaluation?.grade}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '0.2rem' }}>
                    Speed: <strong>{testResult.aiEvaluation?.speedRating}</strong>
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.72rem', textTransform: 'uppercase' }}>Breakdown</div>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.3rem', fontSize: '0.9rem' }}>
                    <span style={{ color: '#4ade80' }}>✓ {testResult.correctCount} Correct</span>
                    <span style={{ color: '#f87171' }}>✗ {testResult.wrongCount} Wrong</span>
                    <span style={{ color: '#94a3b8' }}>⚪ {testResult.unattempted} Skip</span>
                  </div>
                </div>
              </div>

              {/* AI Recommendations */}
              <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '0.75rem', padding: '1rem', fontSize: '0.85rem', lineHeight: 1.6, color: '#e2e8f0' }}>
                <div style={{ color: '#c4b5fd', fontWeight: '800', marginBottom: '0.35rem' }}>
                  💡 AI Actionable Advice for Next Attempt:
                </div>
                <div>{testResult.aiEvaluation?.aiAdvice}</div>
                <div style={{ marginTop: '0.4rem', color: '#4ade80', fontWeight: '700' }}>
                  📊 {testResult.aiEvaluation?.rankPrediction}
                </div>
              </div>
            </div>

            {/* In-Depth Question Diagnostics & Official Explanations */}
            <div>
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '1rem' }}>
                📖 Official Answer Keys & Detailed Explanations ({activeTest.questions.length} Questions)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activeTest.questions.map((q, idx) => {
                  const userAns = answers[q.id]
                  const isCorrect = userAns === q.correct
                  return (
                    <div key={q.id} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${isCorrect ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)'}`, borderRadius: '1rem', padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#c4b5fd', fontWeight: '800', fontSize: '0.85rem' }}>
                          Question {idx + 1}
                        </span>
                        <span style={{ background: isCorrect ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', color: isCorrect ? '#4ade80' : '#f87171', padding: '0.15rem 0.55rem', borderRadius: '0.4rem', fontSize: '0.75rem', fontWeight: '800' }}>
                          {isCorrect ? '✅ Correct (+10)' : userAns === undefined ? '⚪ Unattempted' : '❌ Incorrect (-Penalty)'}
                        </span>
                      </div>

                      <p style={{ color: 'white', fontSize: '0.92rem', lineHeight: 1.6, whiteSpace: 'pre-line', margin: '0 0 1rem' }}>
                        {q.q}
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                        {q.options.map((opt, optIdx) => {
                          const isUserSelected = userAns === optIdx
                          const isRight = optIdx === q.correct
                          let bg = 'rgba(255,255,255,0.02)'
                          let border = '1px solid rgba(255,255,255,0.05)'
                          let color = '#cbd5e1'

                          if (isRight) {
                            bg = 'rgba(34,197,94,0.15)'
                            border = '1px solid #22c55e'
                            color = '#4ade80'
                          } else if (isUserSelected && !isRight) {
                            bg = 'rgba(239,68,68,0.15)'
                            border = '1px solid #ef4444'
                            color = '#f87171'
                          }

                          return (
                            <div key={optIdx} style={{ padding: '0.6rem 0.85rem', borderRadius: '0.5rem', background: bg, border, color, fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
                              <span><strong>{String.fromCharCode(65 + optIdx)}.</strong> {opt}</span>
                              {isRight && <strong>✓ Official Correct Key</strong>}
                              {isUserSelected && !isRight && <strong>✗ Your Answer</strong>}
                            </div>
                          )
                        })}
                      </div>

                      <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '0.6rem', padding: '0.85rem 1rem', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.6 }}>
                        📌 <strong>Official In-Depth Explanation:</strong><br />
                        {q.explanation}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
