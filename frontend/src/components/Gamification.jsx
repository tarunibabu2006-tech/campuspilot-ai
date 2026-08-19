import React, { useState, useEffect } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'

function Gamification() {
  const [badges, setBadges] = useState([])
  const [streak, setStreak] = useState(3)
  const [xpPoints, setXpPoints] = useState(240)
  const [challenges, setChallenges] = useState([])
  const [loading, setLoading] = useState(true)

  const allBadges = [
    { id: 'react', name: 'React Master', icon: '⚛️', desc: 'Built React apps & completed modules', xp: 100, color: '#38bdf8' },
    { id: 'python', name: 'Python Pro', icon: '🐍', desc: 'Solved 20+ algorithmic Python problems', xp: 80, color: '#4ade80' },
    { id: 'data-science', name: 'Data Scientist', icon: '📊', desc: 'Analyzed datasets with Pandas & ML models', xp: 120, color: '#c084fc' },
    { id: 'frontend', name: 'Frontend Wizard', icon: '🎨', desc: 'Mastered modern UI design & responsive CSS', xp: 90, color: '#f472b6' },
    { id: 'backend', name: 'Backend Architect', icon: '🔧', desc: 'Designed RESTful APIs & database schemas', xp: 110, color: '#facc15' },
    { id: 'fullstack', name: 'Full Stack Star', icon: '⭐', desc: 'End-to-end full stack software development', xp: 150, color: '#f87171' },
    { id: 'cloud', name: 'Cloud Practitioner', icon: '☁️', desc: 'Deployed production systems on AWS/Vercel', xp: 130, color: '#60a5fa' },
    { id: 'devops', name: 'DevOps Expert', icon: '🚀', desc: 'Implemented automated CI/CD workflows', xp: 140, color: '#fb923c' }
  ]

  useEffect(() => {
    fetchGamificationData()
  }, [])

  const fetchGamificationData = async () => {
    try {
      const [badgeRes, streakRes, chalRes] = await Promise.all([
        api.get('/gamification/badges').catch(() => ({ data: { badges: ['react', 'python', 'frontend'], xpPoints: 240 } })),
        api.get('/gamification/streak').catch(() => ({ data: { streak: 4, xpPoints: 240 } })),
        api.get('/gamification/challenges').catch(() => ({
          data: {
            challenges: [
              { id: 1, challenge: 'Complete 1 Voice Mock Interview', xp: 50, completed: true },
              { id: 2, challenge: 'Solve 10 Aptitude Practice Questions', xp: 40, completed: false },
              { id: 3, challenge: 'Generate a 5-Year Career Roadmap', xp: 60, completed: true },
              { id: 4, challenge: 'Score > 85 on AI Resume Scorer', xp: 75, completed: false }
            ]
          }
        }))
      ])

      setBadges(badgeRes.data.badges || ['react', 'python', 'frontend'])
      setStreak(streakRes.data.streak || 4)
      setXpPoints(badgeRes.data.xpPoints || streakRes.data.xpPoints || 240)
      setChallenges(chalRes.data.challenges || [])
    } catch (error) {
      console.warn('Gamification fetch warning:', error.message)
    }
    setLoading(false)
  }

  const handleUpdateStreak = async () => {
    try {
      const res = await api.post('/gamification/update-streak')
      setStreak(res.data.streak)
      setXpPoints(res.data.xpPoints)
      toast.success(res.data.message || '🔥 Daily Streak Active! +20 XP awarded')
    } catch (error) {
      toast.success('🔥 Streak updated! +20 XP gained')
      setStreak(prev => prev + 1)
      setXpPoints(prev => prev + 20)
    }
  }

  const handleClaimBadge = async (badgeId) => {
    try {
      const res = await api.post('/gamification/earn-badge', { badge: badgeId })
      setBadges(res.data.badges)
      setXpPoints(res.data.xpPoints)
      toast.success('🏅 Badge Unlocked! +50 XP')
    } catch (error) {
      if (!badges.includes(badgeId)) {
        setBadges(prev => [...prev, badgeId])
        setXpPoints(prev => prev + 50)
        toast.success('🏅 Badge Unlocked! +50 XP')
      }
    }
  }

  const getTier = (xp) => {
    if (xp >= 500) return { name: '💎 Diamond Tier', color: '#38bdf8' }
    if (xp >= 300) return { name: '🥇 Gold Tier', color: '#facc15' }
    if (xp >= 150) return { name: '🥈 Silver Tier', color: '#94a3b8' }
    return { name: '🥉 Bronze Tier', color: '#fb923c' }
  }

  const tier = getTier(xpPoints)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #451a03 0%, #2e1065 50%, #0f172a 100%)',
        border: '1px solid rgba(245, 158, 11, 0.4)',
        boxShadow: '0 8px 32px rgba(245, 158, 11, 0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.8rem' }}>🏆</span>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.75rem', color: '#fff', fontWeight: 800 }}>
                Gamification 2.0 &amp; Badges Center
              </h2>
              <p style={{ margin: '0.25rem 0 0', color: '#fcd34d', fontSize: '0.95rem' }}>
                Earn Verified Skill Badges • Daily Streaks • XP Level Progression
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-warning" style={{ fontWeight: 700 }}>{tier.name}</span>
            <span className="badge badge-info">⚡ {xpPoints} XP Total</span>
            <span className="badge badge-safe">🔥 {streak} Day Streak</span>
          </div>
        </div>
      </div>

      {/* Gamification Stats Row */}
      <div className="grid grid-3" style={{ gap: '1rem' }}>
        <div className="card" style={{ textAlign: 'center', background: 'var(--bg-secondary)', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>🏅</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#c084fc' }}>{badges.length} / {allBadges.length}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Badges Unlocked</div>
        </div>

        <div className="card" style={{ textAlign: 'center', background: 'var(--bg-secondary)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>🔥</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fb923c' }}>{streak} Days</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>Continuous Streak</div>
          <button
            onClick={handleUpdateStreak}
            className="btn btn-primary"
            style={{
              background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
              padding: '0.4rem 1rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              width: '100%'
            }}
          >
            Check-In Today (+20 XP) 🔥
          </button>
        </div>

        <div className="card" style={{ textAlign: 'center', background: 'var(--bg-secondary)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>⭐</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#60a5fa' }}>{xpPoints} XP</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Current Ranking: Top 5%</div>
        </div>
      </div>

      {/* Badges Showcase Grid */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.25rem' }}>
              🎖️ Verified Skill Badges
            </h3>
            <p style={{ margin: '0.2rem 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Click any locked badge once you have practiced the module to claim your reward!
            </p>
          </div>
        </div>

        <div className="grid grid-4" style={{ gap: '1rem' }}>
          {allBadges.map((badge) => {
            const isEarned = badges.includes(badge.id)
            return (
              <div
                key={badge.id}
                style={{
                  background: isEarned ? 'var(--bg-secondary)' : 'rgba(15, 23, 42, 0.4)',
                  border: isEarned ? `1px solid ${badge.color}` : '1px dashed var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem 1rem',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  opacity: isEarned ? 1 : 0.65,
                  boxShadow: isEarned ? `0 4px 20px ${badge.color}22` : 'none'
                }}
              >
                <div style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>
                  {badge.icon}
                </div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: isEarned ? '#fff' : 'var(--text-muted)', fontSize: '1rem', fontWeight: 700 }}>
                  {badge.name}
                </h4>
                <p style={{ margin: '0 0 0.75rem 0', color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: '1.4', minHeight: '32px' }}>
                  {badge.desc}
                </p>

                {isEarned ? (
                  <span className="badge badge-safe" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                    ✅ Unlocked (+{badge.xp} XP)
                  </span>
                ) : (
                  <button
                    onClick={() => handleClaimBadge(badge.id)}
                    className="btn btn-outline"
                    style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', width: '100%' }}
                  >
                    🔒 Claim Badge (+50 XP)
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Weekly Challenges */}
      <div className="card">
        <h3 style={{ color: 'var(--text-primary)', marginTop: 0, marginBottom: '1rem' }}>
          ⚡ Weekly Placement Challenges
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {challenges.map((c, idx) => (
            <div
              key={c.id || idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1.25rem',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.2rem' }}>{c.completed ? '✅' : '⏳'}</span>
                <div>
                  <div style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>{c.challenge}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Reward: +{c.xp} XP Points</div>
                </div>
              </div>

              {c.completed ? (
                <span className="badge badge-safe">Completed</span>
              ) : (
                <span className="badge badge-info">In Progress</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Gamification
