import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useAppStore } from '../store/appStore'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const CAREER_JOURNEY_LEVELS = [
  {
    id: 1,
    icon: '🏁',
    title: 'Level 1: Choose Your Path',
    tagline: 'Define your career roadmap & self-assessment',
    maxXP: 40,
    targetTab: 'role-learning',
    tasks: [
      { id: 'l1_t1', name: 'Select Target Role', xp: 10, targetTab: 'role-learning' },
      { id: 'l1_t2', name: 'Complete Career Assessment', xp: 20, targetTab: 'career-predictor' },
      { id: 'l1_t3', name: 'Set Career Goals', xp: 10, targetTab: 'profile' }
    ]
  },
  {
    id: 2,
    icon: '🎯',
    title: 'Level 2: Learn Required Skills',
    tagline: 'Master technical & foundational skills step-by-step',
    maxXP: 210,
    targetTab: 'skills',
    tasks: [
      { id: 'l2_t1', name: 'Skill 1: Basic → Advanced', xp: 50, targetTab: 'skills' },
      { id: 'l2_t2', name: 'Skill 2: Basic → Advanced', xp: 50, targetTab: 'skills' },
      { id: 'l2_t3', name: 'Skill 3: Basic → Intermediate', xp: 30, targetTab: 'skills' },
      { id: 'l2_t4', name: 'Skill 4: Basic → Advanced', xp: 60, targetTab: 'skills' },
      { id: 'l2_t5', name: 'Skill 5: Soft Skills', xp: 20, targetTab: 'skills' }
    ]
  },
  {
    id: 3,
    icon: '📝',
    title: 'Level 3: Build Your Resume',
    tagline: 'Create an ATS-friendly, high-scoring resume',
    maxXP: 140,
    targetTab: 'resume',
    tasks: [
      { id: 'l3_t1', name: 'Fill Personal Details', xp: 10, targetTab: 'resume' },
      { id: 'l3_t2', name: 'Add Education', xp: 20, targetTab: 'resume' },
      { id: 'l3_t3', name: 'Add Skills', xp: 20, targetTab: 'resume' },
      { id: 'l3_t4', name: 'Add Projects', xp: 30, targetTab: 'resume' },
      { id: 'l3_t5', name: 'Add Experience / Internships', xp: 30, targetTab: 'resume' },
      { id: 'l3_t6', name: 'Choose Template', xp: 10, targetTab: 'resume' },
      { id: 'l3_t7', name: 'Download PDF', xp: 20, targetTab: 'resume' }
    ]
  },
  {
    id: 4,
    icon: '🧠',
    title: 'Level 4: Aptitude Test',
    tagline: 'Clear Quant, Logic, Verbal & Tech benchmarks',
    maxXP: 160,
    targetTab: 'aptitude',
    tasks: [
      { id: 'l4_t1', name: 'Quantitative Aptitude (3-4 sub-levels)', xp: 40, targetTab: 'aptitude' },
      { id: 'l4_t2', name: 'Logical Reasoning (3-4 sub-levels)', xp: 40, targetTab: 'aptitude' },
      { id: 'l4_t3', name: 'Verbal Ability (3-4 sub-levels)', xp: 40, targetTab: 'aptitude' },
      { id: 'l4_t4', name: 'Technical Aptitude (3-4 sub-levels)', xp: 40, targetTab: 'aptitude' }
    ]
  },
  {
    id: 5,
    icon: '🎤',
    title: 'Level 5: Mock Interview',
    tagline: 'Practice AI-evaluated technical & voice interviews',
    maxXP: 240,
    targetTab: 'voice-interview',
    tasks: [
      { id: 'l5_t1', name: 'Level 1: Basic Questions', xp: 30, targetTab: 'interview' },
      { id: 'l5_t2', name: 'Level 2: Intermediate Questions', xp: 40, targetTab: 'interview' },
      { id: 'l5_t3', name: 'Level 3: Advanced Questions', xp: 50, targetTab: 'interview' },
      { id: 'l5_t4', name: 'Voice Interview (Level 1: Basic)', xp: 30, targetTab: 'voice-interview' },
      { id: 'l5_t5', name: 'Voice Interview (Level 2: Intermediate)', xp: 40, targetTab: 'voice-interview' },
      { id: 'l5_t6', name: 'Voice Interview (Level 3: Advanced)', xp: 50, targetTab: 'voice-interview' }
    ]
  },
  {
    id: 6,
    icon: '💼',
    title: 'Level 6: Find Your Dream Job',
    tagline: 'Apply, get shortlisted, interview and receive offer letter',
    maxXP: 855,
    targetTab: 'jobs',
    tasks: [
      { id: 'l6_t1', name: 'Complete Profile 100%', xp: 20, targetTab: 'profile' },
      { id: 'l6_t2', name: 'Search Verified Jobs', xp: 10, targetTab: 'jobs' },
      { id: 'l6_t3', name: 'Apply to 5 Jobs', xp: 25, targetTab: 'ai-apply' },
      { id: 'l6_t4', name: 'Apply to 10 Jobs', xp: 50, targetTab: 'ai-apply' },
      { id: 'l6_t5', name: 'Get Shortlisted', xp: 100, targetTab: 'ai-apply' },
      { id: 'l6_t6', name: 'Attend Interview', xp: 150, targetTab: 'ai-apply' },
      { id: 'l6_t7', name: 'Get Offer Letter 🎉', xp: 500, targetTab: 'ai-apply' }
    ]
  }
]

const TOTAL_JOURNEY_XP = 1645 // Sum of all levels

export default function Gamification() {
  const { user, updateUser } = useAuth()
  const { setActiveTab } = useAppStore()

  // State for user's completed tasks
  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(`cp_career_tasks_${user?.id || 'default'}`)
      return saved ? JSON.parse(saved) : ['l1_t1', 'l1_t2', 'l1_t3'] // Default level 1 completed as sample
    } catch {
      return ['l1_t1', 'l1_t2', 'l1_t3']
    }
  })

  const [activeTabSection, setActiveTabSection] = useState('journey')
  const [loading, setLoading] = useState(false)

  // Real Stats from user
  const userXp = user?.xp || user?.xpPoints || (completedTasks.length * 15) || 40
  const userStreak = user?.streak || 3
  const userBadges = user?.badgesCount || (user?.badges ? user.badges.length : 1)

  // Calculate Level Status
  const getLevelProgress = (level) => {
    const levelTaskIds = level.tasks.map(t => t.id)
    const doneCount = levelTaskIds.filter(id => completedTasks.includes(id)).length
    const earnedXP = level.tasks
      .filter(t => completedTasks.includes(t.id))
      .reduce((sum, t) => sum + t.xp, 0)

    let status = 'locked'
    if (level.id === 1 || completedTasks.includes(`l${level.id - 1}_t1`)) {
      status = doneCount === level.tasks.length ? 'completed' : 'in_progress'
    }

    return { doneCount, totalTasks: level.tasks.length, earnedXP, status }
  }

  const overallEarnedXP = CAREER_JOURNEY_LEVELS.reduce((sum, lvl) => {
    return sum + lvl.tasks.filter(t => completedTasks.includes(t.id)).reduce((s, t) => s + t.xp, 0)
  }, 0)

  const overallProgressPct = Math.min(100, Math.round((overallEarnedXP / TOTAL_JOURNEY_XP) * 100))

  const toggleTask = (taskId, xpValue, taskName) => {
    const isCompleted = completedTasks.includes(taskId)
    let updated
    if (isCompleted) {
      updated = completedTasks.filter(id => id !== taskId)
      toast(`Task unmarked: ${taskName}`)
    } else {
      updated = [...completedTasks, taskId]
      toast.success(`🎉 Completed "${taskName}"! +${xpValue} XP Earned!`)
      if (user) {
        updateUser({ ...user, xp: (user?.xp || 0) + xpValue })
      }
    }
    setCompletedTasks(updated)
    try {
      localStorage.setItem(`cp_career_tasks_${user?.id || 'default'}`, JSON.stringify(updated))
    } catch {}
  }

  const handleCheckIn = () => {
    setLoading(true)
    setTimeout(() => {
      const newStreak = userStreak + 1
      const newXp = userXp + 20
      if (user) updateUser({ ...user, xp: newXp, streak: newStreak })
      toast.success('🔥 Daily Streak +1! +20 XP awarded!')
      setLoading(false)
    }, 500)
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* ── HEADER BANNER ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #0f172a 100%)',
          borderRadius: '1.5rem',
          padding: '2rem',
          border: '1px solid rgba(139,92,246,0.35)',
          boxShadow: '0 8px 32px rgba(124,58,237,0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '2.5rem' }}>🎮</span>
              <div>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#fff', margin: 0 }}>
                  Gamification — Level-Based Career Journey
                </h1>
                <p style={{ color: '#a5b4fc', fontSize: '0.85rem', margin: 0 }}>
                  Complete structured career milestones from Day 1 to your Dream Job Offer.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleCheckIn}
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#1a1a1a',
              border: 'none',
              borderRadius: '0.75rem',
              padding: '0.65rem 1.4rem',
              fontWeight: '900',
              fontSize: '0.88rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 15px rgba(245,158,11,0.4)',
              transition: 'transform 0.15s'
            }}
          >
            {loading ? 'Logging In...' : `🔥 Daily Login (${userStreak} Day Streak)`}
          </button>
        </div>
      </motion.div>

      {/* ── PROGRESS DASHBOARD SUMMARY BOX ────────────────────────── */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.95)',
        border: '1px solid rgba(139, 92, 246, 0.4)',
        borderRadius: '1.25rem',
        padding: '1.5rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        fontFamily: 'monospace'
      }}>
        <div style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '0.75rem',
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#38bdf8', margin: 0 }}>
            🎯 Your Career Journey Progress
          </h2>
          <span style={{ color: '#4ade80', fontWeight: '800', fontSize: '0.9rem' }}>
            Overall Progress: {overallProgressPct}%
          </span>
        </div>

        {/* Level checklist status */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
          {CAREER_JOURNEY_LEVELS.map(lvl => {
            const { earnedXP, status } = getLevelProgress(lvl)
            const isDone = status === 'completed'
            const isInProg = status === 'in_progress'

            return (
              <div
                key={lvl.id}
                style={{
                  background: isDone ? 'rgba(34, 197, 94, 0.1)' : isInProg ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                  border: `1px solid ${isDone ? 'rgba(34, 197, 94, 0.4)' : isInProg ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
                  borderRadius: '0.75rem',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.85rem' }}>
                  {lvl.icon} Level {lvl.id}: {lvl.title.split(':')[1]?.trim() || lvl.title}
                </span>
                <span style={{
                  color: isDone ? '#4ade80' : isInProg ? '#38bdf8' : '#94a3b8',
                  fontSize: '0.78rem',
                  fontWeight: '800'
                }}>
                  {isDone ? `✅ Complete (${earnedXP} XP)` : isInProg ? `⬜ In Progress (${earnedXP}/${lvl.maxXP} XP)` : '🔒 Locked'}
                </span>
              </div>
            )
          })}
        </div>

        {/* Metrics Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '0.75rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#cbd5e1',
          fontSize: '0.85rem'
        }}>
          <div>🔥 <strong style={{ color: '#facc15' }}>Total XP:</strong> {overallEarnedXP}/{TOTAL_JOURNEY_XP}</div>
          <div>⭐ <strong style={{ color: '#38bdf8' }}>Overall Progress:</strong> {overallProgressPct}%</div>
          <div>🏆 <strong style={{ color: '#f472b6' }}>Badges Earned:</strong> {userBadges}</div>
          <div>📅 <strong style={{ color: '#fb923c' }}>Streak:</strong> {userStreak} days</div>
        </div>
      </div>

      {/* ── DETAILED LEVEL-BY-LEVEL TASKS & JUMPS ─────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {CAREER_JOURNEY_LEVELS.map(lvl => {
          const { doneCount, totalTasks, earnedXP, status } = getLevelProgress(lvl)

          return (
            <motion.div
              key={lvl.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${status === 'completed' ? 'rgba(74, 222, 128, 0.3)' : status === 'in_progress' ? 'rgba(139, 92, 246, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
                borderRadius: '1.25rem',
                padding: '1.5rem'
              }}
            >
              {/* Level Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '2rem' }}>{lvl.icon}</span>
                  <div>
                    <h3 style={{ color: '#ffffff', fontWeight: '900', fontSize: '1.15rem', margin: 0 }}>
                      {lvl.title}
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0.15rem 0 0' }}>
                      {lvl.tagline}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    background: status === 'completed' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(124, 58, 237, 0.15)',
                    color: status === 'completed' ? '#4ade80' : '#c4b5fd',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '2rem',
                    fontSize: '0.78rem',
                    fontWeight: '800'
                  }}>
                    {earnedXP} / {lvl.maxXP} XP · ({doneCount}/{totalTasks} Tasks)
                  </span>
                  <button
                    onClick={() => setActiveTab(lvl.targetTab)}
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.4rem 0.9rem',
                      borderRadius: '0.6rem',
                      fontWeight: '800',
                      fontSize: '0.78rem',
                      cursor: 'pointer'
                    }}
                  >
                    Open Module →
                  </button>
                </div>
              </div>

              {/* Task Items */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.65rem' }}>
                {lvl.tasks.map(task => {
                  const isTaskDone = completedTasks.includes(task.id)
                  return (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id, task.xp, task.name)}
                      style={{
                        background: isTaskDone ? 'rgba(34, 197, 94, 0.08)' : 'rgba(255, 255, 255, 0.04)',
                        border: `1px solid ${isTaskDone ? 'rgba(34, 197, 94, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
                        borderRadius: '0.75rem',
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{
                          fontSize: '1rem',
                          color: isTaskDone ? '#4ade80' : '#64748b'
                        }}>
                          {isTaskDone ? '✅' : '⬜'}
                        </span>
                        <span style={{
                          color: isTaskDone ? '#ffffff' : '#cbd5e1',
                          fontWeight: '700',
                          fontSize: '0.82rem',
                          textDecoration: isTaskDone ? 'line-through' : 'none'
                        }}>
                          {task.name}
                        </span>
                      </div>
                      <span style={{
                        background: 'rgba(250, 204, 21, 0.15)',
                        color: '#facc15',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '0.4rem',
                        fontSize: '0.72rem',
                        fontWeight: '800'
                      }}>
                        +{task.xp} XP
                      </span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
