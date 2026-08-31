import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const CANDY_LEVELS = [
  {
    id: 1,
    icon: '🏁',
    title: 'LEVEL 1: Choose Your Target Role',
    subtitle: 'Career Discovery & Goal Setting',
    totalXP: 40,
    color: '#818cf8',
    tasks: [
      { id: '1_1', title: 'Select Career Path', xp: 10 },
      { id: '1_2', title: 'Complete Assessment', xp: 20 },
      { id: '1_3', title: 'Set Career Goals', xp: 10 }
    ]
  },
  {
    id: 2,
    icon: '🎯',
    title: 'LEVEL 2: Learning Skills - Level 1',
    subtitle: 'Foundational Knowledge Acquisition',
    totalXP: 50,
    color: '#38bdf8',
    tasks: [
      { id: '2_1', title: 'Learn Basic Skills', xp: 30 },
      { id: '2_2', title: 'Complete First Skill Milestone', xp: 20 }
    ]
  },
  {
    id: 3,
    icon: '📚',
    title: 'LEVEL 3: Learning Skills - Level 2',
    subtitle: 'Intermediate Core Competency',
    totalXP: 50,
    color: '#34d399',
    tasks: [
      { id: '3_1', title: 'Learn Intermediate Skills', xp: 30 },
      { id: '3_2', title: 'Complete Second Skill Milestone', xp: 20 }
    ]
  },
  {
    id: 4,
    icon: '📖',
    title: 'LEVEL 4: Learning Skills - Level 3',
    subtitle: 'Advanced Deep Dive & Frameworks',
    totalXP: 50,
    color: '#fbbf24',
    tasks: [
      { id: '4_1', title: 'Learn Advanced Skills', xp: 30 },
      { id: '4_2', title: 'Complete Third Skill Milestone', xp: 20 }
    ]
  },
  {
    id: 5,
    icon: '📝',
    title: 'LEVEL 5: Test in Learning Skills',
    subtitle: 'Skill Benchmark & Knowledge Verification',
    totalXP: 60,
    color: '#f87171',
    tasks: [
      { id: '5_1', title: 'Take Comprehensive Skill Test', xp: 40 },
      { id: '5_2', title: 'Pass the Assessment (>75% Score)', xp: 20 }
    ]
  },
  {
    id: 6,
    icon: '🧠',
    title: 'LEVEL 6: Aptitude Learning',
    subtitle: 'Quant, Logic & Verbal Formulas',
    totalXP: 90,
    color: '#c084fc',
    tasks: [
      { id: '6_1', title: 'Master Basic Aptitude Formulas', xp: 30 },
      { id: '6_2', title: 'Master Intermediate Shortcuts', xp: 30 },
      { id: '6_3', title: 'Master Advanced Speed Math', xp: 30 }
    ]
  },
  {
    id: 7,
    icon: '📊',
    title: 'LEVEL 7: Aptitude Test',
    subtitle: 'Multi-Tier Placement Exam Simulation',
    totalXP: 120,
    color: '#a78bfa',
    tasks: [
      { id: '7_1', title: 'Pass Level 1 Aptitude Test', xp: 40 },
      { id: '7_2', title: 'Pass Level 2 Aptitude Test', xp: 40 },
      { id: '7_3', title: 'Pass Level 3 Aptitude Test', xp: 40 }
    ]
  },
  {
    id: 8,
    icon: '🎤',
    title: 'LEVEL 8: Mock Test',
    subtitle: 'Company-Specific Timed Assessments',
    totalXP: 90,
    color: '#f472b6',
    tasks: [
      { id: '8_1', title: 'Complete Mock Test 1 (TCS/Infosys)', xp: 30 },
      { id: '8_2', title: 'Complete Mock Test 2 (Zoho/Amazon)', xp: 30 },
      { id: '8_3', title: 'Complete Mock Test 3 (Product/Core)', xp: 30 }
    ]
  },
  {
    id: 9,
    icon: '🎙️',
    title: 'LEVEL 9: Mock Interview',
    subtitle: 'Technical & HR Behavioral Rounds',
    totalXP: 80,
    color: '#60a5fa',
    tasks: [
      { id: '9_1', title: 'Complete Basic Interview Round', xp: 40 },
      { id: '9_2', title: 'Complete Advanced Technical Round', xp: 40 }
    ]
  },
  {
    id: 10,
    icon: '🗣️',
    title: 'LEVEL 10: Voice Interview',
    subtitle: 'Real-Time Voice AI Speech Evaluation',
    totalXP: 120,
    color: '#4ade80',
    tasks: [
      { id: '10_1', title: 'Pass Level 1 Voice Assessment', xp: 40 },
      { id: '10_2', title: 'Pass Level 2 Voice Assessment', xp: 40 },
      { id: '10_3', title: 'Pass Level 3 Voice Assessment', xp: 40 }
    ]
  },
  {
    id: 11,
    icon: '💼',
    title: 'LEVEL 11: Job Finding & Placement',
    subtitle: 'Applications, Interviews & Final Offer',
    totalXP: 835,
    color: '#f59e0b',
    tasks: [
      { id: '11_1', title: 'Search Verified Placement Openings', xp: 10 },
      { id: '11_2', title: 'Apply to 5 Matching Jobs', xp: 25 },
      { id: '11_3', title: 'Apply to 10 Matching Jobs', xp: 50 },
      { id: '11_4', title: 'Get Shortlisted by Company', xp: 100 },
      { id: '11_5', title: 'Attend Company Interview', xp: 150 },
      { id: '11_6', title: 'Secure Dream Placement Offer 🎉', xp: 500 }
    ]
  }
]

export default function Gamification() {
  const { user, updateUser } = useAuth()

  const [unlockedLevel, setUnlockedLevel] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_unlocked_level')
      return saved ? parseInt(saved) : 2
    } catch {
      return 2
    }
  })

  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_completed_gamification_tasks')
      return saved ? JSON.parse(saved) : { '1_1': true, '1_2': true, '1_3': true }
    } catch {
      return { '1_1': true, '1_2': true, '1_3': true }
    }
  })

  const [showCelebration, setShowCelebration] = useState(null)

  const handleTaskToggle = (lvl, task) => {
    const isDone = !!completedTasks[task.id]
    const updated = { ...completedTasks, [task.id]: !isDone }
    setCompletedTasks(updated)
    localStorage.setItem('campuspilot_completed_gamification_tasks', JSON.stringify(updated))

    if (!isDone) {
      const addedXP = task.xp
      if (user) {
        updateUser({ ...user, xp: (user?.xp || 0) + addedXP })
      }
      toast.success(`⭐ +${addedXP} XP Earned for "${task.title}"!`)

      const allLevelTasksDone = lvl.tasks.every(t => t.id === task.id || updated[t.id])
      if (allLevelTasksDone) {
        const nextLvl = Math.min(11, lvl.id + 1)
        if (nextLvl > unlockedLevel) {
          setUnlockedLevel(nextLvl)
          localStorage.setItem('campuspilot_unlocked_level', String(nextLvl))
        }
        setShowCelebration(lvl)
      }
    }
  }

  const totalCalculatedXP = Object.entries(completedTasks).reduce((acc, [taskId, isDone]) => {
    if (!isDone) return acc
    for (const lvl of CANDY_LEVELS) {
      const found = lvl.tasks.find(t => t.id === taskId)
      if (found) return acc + found.xp
    }
    return acc
  }, 0)

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
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
            <span style={{ fontSize: '2.5rem' }}>🎮</span>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
                11-Level Career Journey (Candy Crush Progression)
              </h1>
              <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
                Unlock levels step-by-step from Career Discovery to Final Job Offer with Real-time XP Sync
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#1a1a1a',
            fontWeight: '900',
            fontSize: '0.9rem',
            padding: '0.5rem 1.25rem',
            borderRadius: '2rem',
            boxShadow: '0 4px 15px rgba(245,158,11,0.35)'
          }}>
            ⭐ {totalCalculatedXP} XP Earned
          </span>
          <span style={{
            background: 'rgba(34,197,94,0.15)',
            color: '#4ade80',
            border: '1px solid rgba(34,197,94,0.4)',
            padding: '0.5rem 1.1rem',
            borderRadius: '2rem',
            fontWeight: '800',
            fontSize: '0.85rem'
          }}>
            🔓 Level {unlockedLevel}/11 Unlocked
          </span>
        </div>
      </motion.div>

      {/* ── CANDY CRUSH ROADMAP (LEVEL BY LEVEL) ────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {CANDY_LEVELS.map((lvl, index) => {
          const isUnlocked = lvl.id <= unlockedLevel
          const tasksDone = lvl.tasks.filter(t => completedTasks[t.id]).length
          const isFullyDone = tasksDone === lvl.tasks.length
          const progressPct = Math.round((tasksDone / lvl.tasks.length) * 100)

          return (
            <motion.div
              key={lvl.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              style={{
                background: isFullyDone
                  ? 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(15,23,42,0.95))'
                  : isUnlocked
                    ? 'rgba(255,255,255,0.03)'
                    : 'rgba(255,255,255,0.01)',
                border: isFullyDone
                  ? '1px solid #22c55e'
                  : isUnlocked
                    ? `1px solid ${lvl.color}55`
                    : '1px solid rgba(255,255,255,0.05)',
                borderRadius: '1.25rem',
                padding: '1.5rem',
                opacity: isUnlocked ? 1 : 0.5,
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: isFullyDone ? '#22c55e' : isUnlocked ? `${lvl.color}22` : 'rgba(255,255,255,0.05)',
                    border: `2px solid ${isFullyDone ? '#22c55e' : isUnlocked ? lvl.color : '#64748b'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.6rem'
                  }}>
                    {isFullyDone ? '✅' : isUnlocked ? lvl.icon : '🔒'}
                  </div>
                  <div>
                    <h3 style={{ color: isUnlocked ? '#ffffff' : '#94a3b8', fontWeight: '900', fontSize: '1.15rem', margin: '0 0 0.2rem' }}>
                      {lvl.title}
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>
                      {lvl.subtitle} · <strong style={{ color: lvl.color }}>+{lvl.totalXP} Max XP</strong>
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: isFullyDone ? '#4ade80' : isUnlocked ? '#cbd5e1' : '#64748b', fontWeight: '800', fontSize: '0.85rem' }}>
                      {tasksDone}/{lvl.tasks.length} Completed ({progressPct}%)
                    </div>
                    <div style={{ width: '130px', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', marginTop: '0.3rem', overflow: 'hidden' }}>
                      <div style={{ width: `${progressPct}%`, height: '100%', background: isFullyDone ? '#22c55e' : lvl.color, borderRadius: '3px', transition: 'width 0.3s ease' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tasks checklist */}
              {isUnlocked && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.5rem', marginTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem' }}>
                  {lvl.tasks.map(t => {
                    const isTaskDone = !!completedTasks[t.id]
                    return (
                      <div
                        key={t.id}
                        onClick={() => handleTaskToggle(lvl, t)}
                        style={{
                          background: isTaskDone ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${isTaskDone ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.08)'}`,
                          borderRadius: '0.65rem',
                          padding: '0.6rem 0.85rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{ color: isTaskDone ? '#4ade80' : '#e2e8f0', fontSize: '0.82rem', fontWeight: '700' }}>
                          {isTaskDone ? '✓' : '○'} {t.title}
                        </span>
                        <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: '800' }}>
                          +{t.xp} XP
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* ── CONGRATULATIONS CELEBRATION MODAL ── */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
            onClick={() => setShowCelebration(null)}
          >
            {/* Dual Confetti */}
            <div style={{ position: 'absolute', left: '8%', top: '25%', fontSize: '4rem' }}>
              🎊 🌟 🎈
            </div>
            <div style={{ position: 'absolute', right: '8%', top: '25%', fontSize: '4rem' }}>
              🎈 🌟 🎊
            </div>

            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8 }}
              style={{
                background: 'linear-gradient(135deg, #1e1b4b, #0f172a)',
                border: '2px solid #22c55e',
                borderRadius: '2rem',
                padding: '2.5rem',
                maxWidth: '520px',
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 0 60px rgba(34,197,94,0.4)',
                position: 'relative',
                zIndex: 210
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>🎉</div>
              <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.8rem', margin: '0 0 0.5rem' }}>
                Congratulations! Level Complete!
              </h2>
              <p style={{ color: '#4ade80', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1rem' }}>
                You mastered {showCelebration.title}!
              </p>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', padding: '1rem', marginBottom: '1.5rem', color: '#fbbf24', fontWeight: '800' }}>
                +{showCelebration.totalXP} XP Synced to Live Leaderboard & Profile ⚡
              </div>

              <button
                onClick={() => setShowCelebration(null)}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  borderRadius: '0.75rem',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  fontWeight: '900',
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Continue Next Level ➔
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
