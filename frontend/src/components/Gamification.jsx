import React, { useState, useEffect } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const TIER_CONFIG = [
  { name: 'Bronze', icon: '🥉', minXP: 0, maxXP: 200, color: '#c97b2f', bg: 'rgba(201,123,47,0.15)' },
  { name: 'Silver', icon: '🥈', minXP: 200, maxXP: 500, color: '#94a3b8', bg: 'rgba(148,163,184,0.15)' },
  { name: 'Gold', icon: '🥇', minXP: 500, maxXP: 1000, color: '#fbbf24', bg: 'rgba(251,191,36,0.15)' },
  { name: 'Platinum', icon: '💎', minXP: 1000, maxXP: 2000, color: '#67e8f9', bg: 'rgba(103,232,249,0.15)' },
  { name: 'Diamond', icon: '💍', minXP: 2000, maxXP: 5000, color: '#c084fc', bg: 'rgba(192,132,252,0.15)' }
]

const LEVEL_CONFIG = [
  { level: 1, name: 'Newcomer', minXP: 0, maxXP: 50 },
  { level: 2, name: 'Learner', minXP: 50, maxXP: 120 },
  { level: 3, name: 'Explorer', minXP: 120, maxXP: 200 },
  { level: 4, name: 'Skill Explorer', minXP: 200, maxXP: 300 },
  { level: 5, name: 'Rising Star', minXP: 300, maxXP: 450 },
  { level: 6, name: 'Achiever', minXP: 450, maxXP: 650 },
  { level: 7, name: 'Expert', minXP: 650, maxXP: 900 },
  { level: 8, name: 'Master', minXP: 900, maxXP: 1200 },
  { level: 9, name: 'Legend', minXP: 1200, maxXP: 1600 },
  { level: 10, name: 'Campus Champion', minXP: 1600, maxXP: 9999 }
]

const ALL_BADGES = [
  { id: 'python', icon: '🐍', name: 'Python Master', desc: 'Score 80%+ in Python assessment', xp: 80, color: '#4ade80', how: 'Complete Python skill module & score 80%+' },
  { id: 'data', icon: '📊', name: 'Data Analytics Pro', desc: 'Complete Data Analytics module', xp: 90, color: '#60a5fa', how: 'Finish all Data Analytics lessons' },
  { id: 'ai', icon: '🤖', name: 'AI/ML Explorer', desc: 'Complete AI/ML learning path', xp: 120, color: '#c084fc', how: 'Finish AI/ML skill learning path' },
  { id: 'code', icon: '💻', name: 'Coding Champion', desc: 'Solve 50+ coding problems', xp: 150, color: '#fbbf24', how: 'Solve 50 coding problems in mock tests' },
  { id: 'interview', icon: '🎤', name: 'Interview Pro', desc: 'Complete 10 mock interviews', xp: 100, color: '#f472b6', how: 'Do 10 mock interview sessions' },
  { id: 'resume', icon: '📄', name: 'Resume Expert', desc: 'Score 90+ on Resume Scorer', xp: 80, color: '#34d399', how: 'Upload & score 90+ on Resume Scorer' },
  { id: 'streak30', icon: '🔥', name: '30-Day Streak', desc: 'Login 30 consecutive days', xp: 200, color: '#fb923c', how: 'Login every day for 30 consecutive days' },
  { id: 'top', icon: '🏆', name: 'Top Performer', desc: 'Reach top 10 on leaderboard', xp: 250, color: '#facc15', how: 'Earn enough XP to enter top 10' },
  { id: 'project', icon: '🚀', name: 'Project Builder', desc: 'Upload 3+ projects to profile', xp: 110, color: '#a78bfa', how: 'Add 3 projects to your profile' },
  { id: 'career', icon: '🌟', name: 'Career Ready', desc: 'Complete all placement modules', xp: 300, color: '#e879f9', how: 'Finish all Career GPS + Placement modules' }
]

const XP_TABLE = [
  { activity: 'Daily Check-in', xp: 20, icon: '🔑', category: 'daily' },
  { activity: 'Complete Quiz', xp: 30, icon: '📝', category: 'quiz' },
  { activity: 'Voice Mock Interview', xp: 100, icon: '🎤', category: 'interview' },
  { activity: 'Complete Course Module', xp: 75, icon: '📚', category: 'learning' },
  { activity: 'Skill Assessment', xp: 50, icon: '💡', category: 'skills' },
  { activity: 'Certificate Upload', xp: 50, icon: '🏅', category: 'cert' },
  { activity: 'Job Application', xp: 20, icon: '💼', category: 'job' },
  { activity: 'Help a Peer (Doubt)', xp: 30, icon: '🤝', category: 'social' },
  { activity: 'Resume Upload & Score', xp: 40, icon: '📄', category: 'resume' },
  { activity: 'Complete Mock Test', xp: 50, icon: '🏢', category: 'test' },
  { activity: 'Maintain 7-Day Streak', xp: 100, icon: '🔥', category: 'streak' },
  { activity: 'Solve Coding Problem', xp: 25, icon: '👨‍💻', category: 'coding' }
]

const WEEKLY_CHALLENGES = [
  { id: 1, title: 'Complete 3 quizzes', xp: 75, completed: true, icon: '📝' },
  { id: 2, title: 'Finish 1 mock interview', xp: 100, completed: false, icon: '🎤' },
  { id: 3, title: 'Maintain 7-day streak', xp: 150, completed: false, icon: '🔥' },
  { id: 4, title: 'Complete one skill assessment', xp: 50, completed: true, icon: '💡' },
  { id: 5, title: 'Apply to 3 jobs via AI Apply', xp: 60, completed: false, icon: '💼' }
]

const REWARDS = [
  { icon: '🎨', name: 'Profile Frame', xp: 300, desc: 'Golden profile border' },
  { icon: '🏅', name: 'Special Badge', xp: 500, desc: 'Exclusive badge for your profile' },
  { icon: '🎤', name: 'Extra Mock Interview', xp: 200, desc: '2 bonus AI interview sessions' },
  { icon: '📄', name: 'Resume Review', xp: 350, desc: 'Expert AI resume review' },
  { icon: '🤖', name: 'AI Interview Credits', xp: 400, desc: '10 extra AI interview credits' },
  { icon: '⭐', name: 'Profile Boost', xp: 600, desc: 'Featured on leaderboard for a week' }
]

const SKILL_BADGES = [
  { skill: 'Python', pct: 82, color: '#4ade80', badge: 'Python Explorer', threshold: 80, unlocked: true },
  { skill: 'SQL', pct: 65, color: '#60a5fa', badge: 'SQL Master', threshold: 80, unlocked: false },
  { skill: 'Java', pct: 55, color: '#fbbf24', badge: 'Java Pro', threshold: 75, unlocked: false },
  { skill: 'Data Analytics', pct: 70, color: '#c084fc', badge: 'Analytics Expert', threshold: 80, unlocked: false },
  { skill: 'AI/ML', pct: 45, color: '#f472b6', badge: 'AI Pioneer', threshold: 70, unlocked: false },
  { skill: 'React', pct: 90, color: '#34d399', badge: 'React Master', threshold: 85, unlocked: true }
]

export default function Gamification() {
  const [unlockedBadges, setUnlockedBadges] = useState(['python', 'interview', 'resume'])
  const [xp, setXp] = useState(240)
  const [streak, setStreak] = useState(5)
  const [longestStreak, setLongestStreak] = useState(18)
  const [challenges, setChallenges] = useState(WEEKLY_CHALLENGES)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(false)

  const currentLevel = LEVEL_CONFIG.findLast(l => xp >= l.minXP) || LEVEL_CONFIG[0]
  const nextLevel = LEVEL_CONFIG.find(l => l.minXP > xp) || LEVEL_CONFIG[LEVEL_CONFIG.length - 1]
  const levelPct = Math.min(100, ((xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100)

  const currentTier = TIER_CONFIG.findLast(t => xp >= t.minXP) || TIER_CONFIG[0]
  const nextTier = TIER_CONFIG.find(t => t.minXP > xp) || TIER_CONFIG[TIER_CONFIG.length - 1]
  const tierPct = Math.min(100, ((xp - currentTier.minXP) / (nextTier.minXP - currentTier.minXP)) * 100)

  const weeklyDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const activeWeekDays = [true, true, true, true, true, false, false]

  const completedChallenges = challenges.filter(c => c.completed).length
  const challengeXP = challenges.filter(c => c.completed).reduce((sum, c) => sum + c.xp, 0)

  const checkIn = async () => {
    setLoading(true)
    setTimeout(() => {
      setXp(prev => prev + 20)
      setStreak(prev => prev + 1)
      toast.success('🔑 Daily Check-in! +20 XP 🔥')
      setLoading(false)
    }, 600)
  }

  const toggleChallenge = (id) => {
    setChallenges(prev => prev.map(c => c.id === id ? { ...c, completed: !c.completed } : c))
  }

  const tabs = [
    { id: 'overview', label: '🎯 Overview' },
    { id: 'badges', label: '🏅 Badges' },
    { id: 'challenges', label: '📅 Challenges' },
    { id: 'rewards', label: '🎁 Rewards' },
    { id: 'skills', label: '💻 Skill Badges' }
  ]

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', borderRadius: '1.5rem', padding: '2rem', marginBottom: '1.5rem', border: '1px solid rgba(192,132,252,0.3)', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(192,132,252,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <h1 style={{ fontSize: '2rem', fontWeight: '900', background: 'linear-gradient(135deg, #c084fc, #7c3aed, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.25rem' }}>
          🏆 Gamification 2.0
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Earn XP, unlock badges, climb tiers, and dominate the leaderboard!</p>

        {/* Stats Row */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Total XP', value: `${xp} XP`, icon: '⚡', color: '#facc15' },
            { label: 'Level', value: `${currentLevel.level} — ${currentLevel.name}`, icon: '🎯', color: '#60a5fa' },
            { label: 'Tier', value: `${currentTier.icon} ${currentTier.name}`, icon: '🏅', color: currentTier.color },
            { label: 'Current Streak', value: `${streak} days 🔥`, icon: '🔥', color: '#fb923c' },
            { label: 'Badges', value: unlockedBadges.length, icon: '🏅', color: '#f472b6' },
            { label: 'Rank', value: '#12', icon: '🏆', color: '#c084fc' }
          ].map(s => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '0.9rem', padding: '0.75rem 1rem', textAlign: 'center', minWidth: '100px', flex: '1', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{s.icon}</div>
              <div style={{ color: s.color, fontWeight: '800', fontSize: '0.9rem' }}>{s.value}</div>
              <div style={{ color: '#64748b', fontSize: '0.7rem', marginTop: '0.1rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <button onClick={checkIn} disabled={loading} style={{ marginTop: '1.25rem', padding: '0.65rem 1.5rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', fontWeight: '700', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '0.9rem' }}>
          {loading ? '⏳ Checking In...' : '🔑 Daily Check-in (+20 XP)'}
        </button>
      </motion.div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{ padding: '0.5rem 1rem', borderRadius: '0.75rem', fontWeight: '600', fontSize: '0.82rem', whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.2s',
              background: activeTab === t.id ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.05)',
              color: activeTab === t.id ? 'white' : '#94a3b8',
              border: activeTab === t.id ? 'none' : '1px solid rgba(255,255,255,0.1)'
            }}>{t.label}</button>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Level Progress */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            {/* Level Card */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(96,165,250,0.3)', borderRadius: '1.25rem', padding: '1.5rem' }}>
              <h3 style={{ color: '#60a5fa', fontWeight: '700', marginBottom: '0.75rem' }}>🎯 Level Progress</h3>
              <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'white', marginBottom: '0.25rem' }}>Level {currentLevel.level} — {currentLevel.name}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{xp} / {nextLevel.minXP} XP to Level {nextLevel.level}</div>
              <div style={{ height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${levelPct}%` }} transition={{ duration: 1, delay: 0.3 }}
                  style={{ height: '100%', background: 'linear-gradient(90deg, #2563eb, #7c3aed)', borderRadius: '5px' }} />
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: '0.4rem' }}>{Math.round(levelPct)}% complete · {nextLevel.minXP - xp} XP to next level</div>
            </div>

            {/* Tier Card */}
            <div style={{ background: currentTier.bg, border: `1px solid ${currentTier.color}44`, borderRadius: '1.25rem', padding: '1.5rem' }}>
              <h3 style={{ color: currentTier.color, fontWeight: '700', marginBottom: '0.75rem' }}>🏅 Tier Progression</h3>
              <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                {TIER_CONFIG.map((t, i) => (
                  <span key={t.name} style={{ fontSize: '1.1rem', opacity: xp >= t.minXP ? 1 : 0.3 }} title={t.name}>{t.icon}</span>
                ))}
              </div>
              <div style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{currentTier.icon} {currentTier.name} Tier</div>
              <div style={{ height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden', marginBottom: '0.4rem' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${tierPct}%` }} transition={{ duration: 1, delay: 0.4 }}
                  style={{ height: '100%', background: currentTier.color, borderRadius: '5px' }} />
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{nextTier.minXP - xp} XP to {nextTier.icon} {nextTier.name}</div>
            </div>
          </div>

          {/* Streak */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(251,146,60,0.3)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1rem' }}>
            <h3 style={{ color: '#fb923c', fontWeight: '700', marginBottom: '1rem' }}>🔥 Streak Tracker</h3>
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#fb923c', fontWeight: '900', fontSize: '2rem' }}>{streak}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Current Streak</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#fbbf24', fontWeight: '900', fontSize: '2rem' }}>{longestStreak}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Longest Streak</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#4ade80', fontWeight: '900', fontSize: '2rem' }}>21</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Active Days (Month)</div>
              </div>
            </div>
            {/* Weekly Calendar */}
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {weeklyDays.map((day, i) => (
                <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ color: '#64748b', fontSize: '0.7rem', marginBottom: '0.3rem' }}>{day}</div>
                  <div style={{ width: '100%', paddingTop: '100%', position: 'relative', borderRadius: '0.4rem', background: activeWeekDays[i] ? 'linear-gradient(135deg, #fb923c, #f59e0b)' : 'rgba(255,255,255,0.05)', border: `1px solid ${activeWeekDays[i] ? 'rgba(251,146,60,0.5)' : 'rgba(255,255,255,0.1)'}` }}>
                    <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                      {activeWeekDays[i] ? '✓' : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard Integration */}
          <div style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.08), rgba(245,158,11,0.04))', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '1.25rem', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '2rem' }}>🏆</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fbbf24', fontWeight: '700', marginBottom: '0.2rem' }}>Your Rank: #12</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>You are 2 positions away from Top 10! Keep going 💪</div>
            </div>
            <button style={{ padding: '0.5rem 1rem', borderRadius: '0.6rem', background: 'rgba(251,191,36,0.2)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)', fontWeight: '600', cursor: 'pointer', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
              View Leaderboard →
            </button>
          </div>
        </motion.div>
      )}

      {/* BADGES */}
      {activeTab === 'badges' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '1.25rem' }}>🏅 Badge Collection ({unlockedBadges.length}/{ALL_BADGES.length} Unlocked)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
            {ALL_BADGES.map((badge, i) => {
              const unlocked = unlockedBadges.includes(badge.id)
              return (
                <motion.div key={badge.id} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}
                  style={{ textAlign: 'center', padding: '1.25rem', borderRadius: '1rem', transition: 'transform 0.2s',
                    background: unlocked ? `linear-gradient(135deg, ${badge.color}22, ${badge.color}10)` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${unlocked ? badge.color + '55' : 'rgba(255,255,255,0.07)'}`,
                    opacity: unlocked ? 1 : 0.6
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ fontSize: '2.2rem', marginBottom: '0.4rem', filter: unlocked ? 'none' : 'grayscale(100%) brightness(0.5)' }}>{badge.icon}</div>
                  <div style={{ color: unlocked ? 'white' : '#475569', fontWeight: '700', fontSize: '0.82rem', marginBottom: '0.25rem' }}>{badge.name}</div>
                  <div style={{ color: '#64748b', fontSize: '0.72rem', marginBottom: '0.5rem' }}>{badge.desc}</div>
                  {unlocked ? (
                    <span style={{ background: `${badge.color}33`, color: badge.color, padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.72rem', fontWeight: '700' }}>✓ +{badge.xp} XP</span>
                  ) : (
                    <div style={{ color: '#475569', fontSize: '0.72rem' }}>🔒 {badge.how}</div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* CHALLENGES */}
      {activeTab === 'challenges' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem' }}>📅 This Week's Challenges</h2>
            <div style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '0.75rem', padding: '0.4rem 1rem', color: '#fbbf24', fontWeight: '700', fontSize: '0.85rem' }}>
              {completedChallenges}/{challenges.length} done · +{challengeXP} XP earned
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', marginBottom: '1.5rem', overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${(completedChallenges / challenges.length) * 100}%` }} transition={{ duration: 0.8 }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #fbbf24, #f59e0b)', borderRadius: '4px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {challenges.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: c.completed ? 'rgba(74,222,128,0.07)' : 'rgba(255,255,255,0.03)', border: `1px solid ${c.completed ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '0.9rem', padding: '1rem 1.25rem', cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={() => toggleChallenge(c.id)}
              >
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', border: `2px solid ${c.completed ? '#4ade80' : '#475569'}`, background: c.completed ? '#4ade80' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                  {c.completed && <span style={{ color: '#1a1a1a', fontSize: '0.8rem', fontWeight: '800' }}>✓</span>}
                </div>
                <span style={{ fontSize: '1.2rem' }}>{c.icon}</span>
                <span style={{ flex: 1, color: c.completed ? '#94a3b8' : 'white', fontWeight: '600', fontSize: '0.9rem', textDecoration: c.completed ? 'line-through' : 'none' }}>{c.title}</span>
                <span style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>+{c.xp} XP</span>
              </motion.div>
            ))}
          </div>

          {/* XP Activity Table */}
          <h3 style={{ color: 'white', fontWeight: '700', fontSize: '1rem', marginBottom: '1rem' }}>⚡ How to Earn XP</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {XP_TABLE.map((act, i) => (
              <div key={act.activity} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '0.75rem', padding: '0.75rem 1rem' }}>
                <span style={{ fontSize: '1.2rem' }}>{act.icon}</span>
                <span style={{ flex: 1, color: '#94a3b8', fontSize: '0.82rem' }}>{act.activity}</span>
                <span style={{ color: '#facc15', fontWeight: '800', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>+{act.xp} XP</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* REWARDS */}
      {activeTab === 'rewards' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '0.5rem' }}>🎁 Rewards Store</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Spend your XP to unlock premium platform perks.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {REWARDS.map((r, i) => {
              const canAfford = xp >= r.xp
              return (
                <motion.div key={r.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
                  style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(255,255,255,${canAfford ? '0.12' : '0.06'})`, borderRadius: '1.1rem', padding: '1.25rem' }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{r.icon}</div>
                  <div style={{ color: 'white', fontWeight: '700', marginBottom: '0.25rem' }}>{r.name}</div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '0.75rem' }}>{r.desc}</div>
                  <button style={{
                    width: '100%', padding: '0.5rem', borderRadius: '0.6rem', fontWeight: '700', fontSize: '0.85rem', cursor: canAfford ? 'pointer' : 'not-allowed',
                    background: canAfford ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.05)',
                    color: canAfford ? 'white' : '#475569', border: 'none'
                  }} onClick={() => canAfford && toast.success(`🎁 ${r.name} unlocked!`)}>
                    {canAfford ? `🔓 Unlock · ${r.xp} XP` : `🔒 Need ${r.xp} XP`}
                  </button>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* SKILL BADGES */}
      {activeTab === 'skills' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '0.5rem' }}>💻 Skill-Specific Badges</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Reach skill thresholds to unlock exclusive badges and earn XP.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {SKILL_BADGES.map((s, i) => (
              <motion.div key={s.skill} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                style={{ background: s.unlocked ? `linear-gradient(135deg, ${s.color}18, ${s.color}08)` : 'rgba(255,255,255,0.03)', border: `1px solid ${s.unlocked ? s.color + '44' : 'rgba(255,255,255,0.08)'}`, borderRadius: '1rem', padding: '1.25rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: s.color, fontWeight: '800', fontSize: '1rem' }}>{s.skill}</span>
                    {s.unlocked && <span style={{ background: `${s.color}33`, color: s.color, padding: '0.15rem 0.5rem', borderRadius: '1rem', fontSize: '0.7rem', fontWeight: '700' }}>🏅 {s.badge} Unlocked!</span>}
                  </div>
                  <span style={{ color: s.unlocked ? s.color : '#64748b', fontWeight: '800', fontSize: '0.9rem' }}>{s.pct}%</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.pct}%` }} transition={{ delay: i * 0.1, duration: 0.8 }}
                    style={{ height: '100%', background: s.color, borderRadius: '4px' }} />
                </div>
                {!s.unlocked && <div style={{ color: '#64748b', fontSize: '0.78rem' }}>🔒 {s.badge} — Need {s.threshold}% (currently {s.pct}%, need {s.threshold - s.pct}% more)</div>}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
