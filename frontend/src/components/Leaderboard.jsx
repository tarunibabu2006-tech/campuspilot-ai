import React, { useState, useEffect } from 'react'
import axios from 'axios'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

const XP_ACTIVITIES = [
  { activity: 'Mock Test Completion', xp: '+50 XP', icon: '📝' },
  { activity: 'Voice Interview Session', xp: '+100 XP', icon: '🎤' },
  { activity: 'Course Completion', xp: '+75 XP', icon: '📚' },
  { activity: 'Skill Assessment', xp: '+50 XP', icon: '💻' },
  { activity: 'Job Application', xp: '+20 XP', icon: '💼' },
  { activity: 'Daily Login', xp: '+10 XP', icon: '🔑' },
  { activity: 'Resume Upload', xp: '+30 XP', icon: '📄' },
  { activity: 'Help Peer (Doubt)', xp: '+25 XP', icon: '🤝' }
]

import { useAppStore } from '../store/appStore'
import toast from 'react-hot-toast'

const BADGE_NAVIGATION_MAP = {
  'Python Master': { tab: 'skills', label: 'Python Skill Module' },
  'Data Analytics Pro': { tab: 'skills', label: 'Data Analytics Module' },
  'AI/ML Explorer': { tab: 'career-predictor', label: 'AI/ML Path' },
  'Coding Champion': { tab: 'aptitude', label: 'Coding & Aptitude Test' },
  'Interview Pro': { tab: 'voice-interview', label: 'Voice Mock Interview' },
  'Resume Expert': { tab: 'resume-scorer', label: 'Resume Scorer' },
  '30-Day Streak': { tab: 'gamification', label: 'Gamification 2.0' },
  'Top Performer': { tab: 'leaderboard', label: 'Live Leaderboard' }
}

const XP_NAVIGATION_MAP = {
  'Mock Test Completion': 'mock-tests',
  'Voice Interview Session': 'voice-interview',
  'Course Completion': 'skills',
  'Skill Assessment': 'skill-badge',
  'Job Application': 'ai-apply',
  'Daily Login': 'gamification',
  'Resume Upload': 'resume-scorer',
  'Help Peer (Doubt)': 'study-groups'
}

export default function Leaderboard() {
  const { user } = useAuth()
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterDept, setFilterDept] = useState('All')
  const [filterYear, setFilterYear] = useState('All')
  const [filterTime, setFilterTime] = useState('All time')
  const [activeSection, setActiveSection] = useState('leaderboard')
  const [selectedStudent, setSelectedStudent] = useState(null)

  useEffect(() => {
    const loadRealLeaderboard = async () => {
      setLoading(true)
      try {
        const res = await api.get('/admin/students')
        if (res.data.students && res.data.students.length > 0) {
          const formatted = res.data.students.map((s, idx) => ({
            rank: idx + 1,
            name: s.name || 'Student',
            department: s.department || 'Computer Science',
            year: s.year ? `${s.year} Year` : '1st Year',
            college: s.college || 'Campus Pilot College',
            xp: s.xp || 0,
            skillsScore: s.skillsScore || (s.skills ? Math.min(100, s.skills.length * 15) : 0),
            interviewScore: s.interviewScore || 0,
            badges: s.badgesCount || (s.badges ? s.badges.length : 0),
            streak: s.streak || 1,
            overallScore: (s.xp || 0) + ((s.skills ? s.skills.length : 0) * 20),
            avatar: s.avatar || null
          })).sort((a, b) => b.xp - a.xp)
          setStudents(formatted)
        } else {
          // Fallback to real logged-in user only
          const currentUserObj = {
            rank: 1,
            name: user?.name || 'Logged In Student',
            department: user?.department || 'Computer Science',
            year: user?.year || '1st Year',
            college: user?.college || 'My Campus',
            xp: user?.xp || 0,
            skillsScore: user?.skills ? Math.min(100, user.skills.length * 20) : 0,
            interviewScore: user?.interviewScore || 0,
            badges: user?.badgesCount || (user?.badges ? user.badges.length : 0),
            streak: user?.streak || 1,
            overallScore: user?.xp || 0,
            avatar: user?.avatar || null
          }
          setStudents([currentUserObj])
        }
      } catch (err) {
        // Render real logged in user only
        const currentUserObj = {
          rank: 1,
          name: user?.name || 'Logged In Student',
          department: user?.department || 'Computer Science',
          year: user?.year || '1st Year',
          college: user?.college || 'My Campus',
          xp: user?.xp || 0,
          skillsScore: user?.skills ? Math.min(100, user.skills.length * 20) : 0,
          interviewScore: user?.interviewScore || 0,
          badges: user?.badgesCount || (user?.badges ? user.badges.length : 0),
          streak: user?.streak || 1,
          overallScore: user?.xp || 0,
          avatar: user?.avatar || null
        }
        setStudents([currentUserObj])
      }
      setLoading(false)
    }
    loadRealLeaderboard()
  }, [user])

  const allDepts = ['All', ...new Set(students.map(s => s.department).filter(Boolean))]
  const allYears = ['All', '1st Year', '2nd Year', '3rd Year', 'Final Year']
  const timeOptions = ['This week', 'This month', 'All time']

  const filtered = students.filter(s =>
    (filterDept === 'All' || s.department === filterDept) &&
    (filterYear === 'All' || s.year === filterYear)
  )

  const userInList = students.find(s => s.name === user?.name)
  const myRank = userInList ? userInList.rank : (user?.xp > 0 ? 1 : 'Unranked')

  const top3 = filtered.slice(0, 3)
  const podiumOrder = top3.length >= 3 ? [top3[1], top3[0], top3[2]] : top3
  const podiumHeights = ['140px', '180px', '110px']
  const podiumColors = ['linear-gradient(135deg, #94a3b8, #cbd5e1)', 'linear-gradient(135deg, #fbbf24, #f59e0b)', 'linear-gradient(135deg, #c97b2f, #b45309)']
  const podiumLabels = ['🥈 2nd', '🥇 1st', '🥉 3rd']

  const sections = [
    { id: 'leaderboard', label: '📊 Live Leaderboard' },
    { id: 'badges', label: '🏅 Badges' },
    { id: 'xp', label: '⚡ XP Guide' }
  ]

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #1a1028, #2d1f54, #1a2540)', borderRadius: '1.5rem', padding: '2rem', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid rgba(250,204,21,0.3)', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '400px', height: '200px', background: 'radial-gradient(circle, rgba(250,204,21,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <h1 style={{ fontSize: '2.2rem', fontWeight: '900', background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem' }}>
          🏆 Verified Student Hall of Fame
        </h1>
        <p style={{ color: '#94a3b8' }}>Real-time student rankings calculated strictly from verified activity, quizzes & interviews.</p>

        {/* My Rank Banner */}
        <div style={{ marginTop: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.3)', borderRadius: '0.75rem', padding: '0.6rem 1.5rem' }}>
          <span style={{ color: '#fbbf24', fontWeight: '700' }}>Your Rank: {typeof myRank === 'number' ? `#${myRank}` : myRank}</span>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Your Total XP: {user?.xp || 0} XP</span>
          <span style={{ color: '#4ade80', fontWeight: '700' }}>⚡ Real Score</span>
        </div>
      </motion.div>

      {/* Section Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {sections.map(s => (
          <button key={s.id} onClick={() => setActiveSection(s.id)}
            style={{
              padding: '0.5rem 1rem', borderRadius: '0.75rem', fontWeight: '600', fontSize: '0.82rem', whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.2s',
              background: activeSection === s.id ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' : 'rgba(255,255,255,0.05)',
              color: activeSection === s.id ? '#1a1a1a' : '#94a3b8',
              border: activeSection === s.id ? 'none' : '1px solid rgba(255,255,255,0.1)'
            }}>{s.label}</button>
        ))}
      </div>

      {/* === LEADERBOARD SECTION === */}
      {activeSection === 'leaderboard' && (
        <>
          {/* Podium */}
          {top3.length >= 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}
            >
              <h2 style={{ color: '#fbbf24', fontWeight: '800', marginBottom: '1.5rem', fontSize: '1.2rem' }}>🥇 Top 3 Podium</h2>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '1rem' }}>
                {podiumOrder.map((s, idx) => s && (
                  <div key={s.rank} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Avatar */}
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: podiumColors[idx], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem', boxShadow: `0 0 20px ${idx === 1 ? 'rgba(251,191,36,0.6)' : 'rgba(255,255,255,0.2)'}` }}>
                      {s.name.charAt(0)}
                    </div>
                    <div style={{ color: 'white', fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.2rem' }}>{s.name.split(' ')[0]}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginBottom: '0.5rem' }}>{s.xp} XP</div>
                    <div style={{ width: '90px', height: podiumHeights[idx], background: podiumColors[idx], borderRadius: '0.5rem 0.5rem 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: `0 -4px 20px ${idx === 1 ? 'rgba(251,191,36,0.3)' : 'rgba(255,255,255,0.1)'}` }}>
                      {podiumLabels[idx]}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Filters */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <select value={filterDept} onChange={e => setFilterDept(e.target.value)}
              style={{ padding: '0.5rem 0.9rem', borderRadius: '0.6rem', background: 'rgba(30,27,75,0.9)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.85rem', cursor: 'pointer' }}>
              {allDepts.map(d => <option key={d}>{d}</option>)}
            </select>
            <select value={filterYear} onChange={e => setFilterYear(e.target.value)}
              style={{ padding: '0.5rem 0.9rem', borderRadius: '0.6rem', background: 'rgba(30,27,75,0.9)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.85rem', cursor: 'pointer' }}>
              {allYears.map(y => <option key={y}>{y}</option>)}
            </select>
            {timeOptions.map(t => (
              <button key={t} onClick={() => setFilterTime(t)}
                style={{
                  padding: '0.5rem 0.9rem', borderRadius: '0.6rem', fontSize: '0.82rem', cursor: 'pointer',
                  background: filterTime === t ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.05)',
                  color: filterTime === t ? '#fbbf24' : '#94a3b8',
                  border: `1px solid ${filterTime === t ? 'rgba(251,191,36,0.4)' : 'rgba(255,255,255,0.1)'}`
                }}>{t}</button>
            ))}
          </div>

          {/* Full Table */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', overflow: 'hidden' }}>
            {/* Table Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 120px 90px 70px 70px 70px 60px 60px 80px', gap: '0.5rem', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: '0.72rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>
              <span>Rank</span><span>Student</span><span>Department</span><span>Year</span>
              <span>XP</span><span>Skills</span><span>Interview</span><span>Badges</span><span>Streak</span><span>Overall</span>
            </div>
            {filtered.slice(0, 20).map((s, i) => (
              <motion.div key={s.rank} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                onClick={() => setSelectedStudent(s)}
                style={{
                  display: 'grid', gridTemplateColumns: '50px 1fr 120px 90px 70px 70px 70px 60px 60px 80px', gap: '0.5rem', padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'background 0.2s',
                  background: i < 3 ? 'rgba(251,191,36,0.04)' : 'transparent'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = i < 3 ? 'rgba(251,191,36,0.04)' : 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontWeight: '800', color: i === 0 ? '#fbbf24' : i === 1 ? '#94a3b8' : i === 2 ? '#c97b2f' : '#64748b', fontSize: '0.9rem' }}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${s.rank}`}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '700', color: 'white', flexShrink: 0 }}>{s.name.charAt(0)}</div>
                  <span style={{ color: 'white', fontWeight: '600', fontSize: '0.85rem' }}>{s.name}</span>
                </div>
                <span style={{ color: '#94a3b8', fontSize: '0.78rem', display: 'flex', alignItems: 'center' }}>{s.department}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.78rem', display: 'flex', alignItems: 'center' }}>{s.year.split(' ')[0] + ' Yr'}</span>
                <span style={{ color: '#facc15', fontWeight: '700', fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}>{s.xp}</span>
                <span style={{ color: '#4ade80', fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}>{Math.round(s.skillsScore)}%</span>
                <span style={{ color: '#60a5fa', fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}>{Math.round(s.interviewScore)}%</span>
                <span style={{ color: '#f472b6', fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}>🏅 {s.badges}</span>
                <span style={{ color: '#fb923c', fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}>🔥 {s.streak}</span>
                <span style={{ color: 'white', fontWeight: '700', fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}>{s.overallScore}</span>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* === BADGES SECTION === */}
      {activeSection === 'badges' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.3rem', marginBottom: '0.4rem' }}>🏅 Achievement Badges</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.25rem' }}>Click on any badge below to jump directly into its learning & test module!</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '🐍', name: 'Python Master', desc: 'Score 80%+ in Python assessment', targetTab: 'skills' },
              { icon: '📊', name: 'Data Analytics Pro', desc: 'Complete Data Analytics module', targetTab: 'skills' },
              { icon: '🤖', name: 'AI/ML Explorer', desc: 'Complete AI/ML learning path', targetTab: 'career-predictor' },
              { icon: '💻', name: 'Coding Champion', desc: 'Solve 50+ coding problems', targetTab: 'aptitude' },
              { icon: '🎤', name: 'Interview Pro', desc: 'Complete 10 mock interviews', targetTab: 'voice-interview' },
              { icon: '📄', name: 'Resume Expert', desc: 'Score 90+ on Resume Scorer', targetTab: 'resume-scorer' },
              { icon: '🔥', name: '30-Day Streak', desc: 'Login 30 consecutive days', targetTab: 'gamification' },
              { icon: '🏆', name: 'Top Performer', desc: 'Reach top 10 on leaderboard', targetTab: 'leaderboard' }
            ].map((badge, i) => (
              <motion.div key={badge.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}
                onClick={() => {
                  useAppStore.getState().setActiveTab(badge.targetTab)
                  toast.success(`Opening ${badge.name} module! 🚀`)
                }}
                style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1rem', padding: '1.25rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'; e.currentTarget.style.borderColor = '#fbbf24' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{badge.icon}</div>
                <div style={{ color: 'white', fontWeight: '700', marginBottom: '0.3rem', fontSize: '1rem' }}>{badge.name}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginBottom: '0.75rem' }}>{badge.desc}</div>
                <div style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', padding: '0.35rem 0.75rem', borderRadius: '0.6rem', fontSize: '0.75rem', fontWeight: '800', display: 'inline-block' }}>
                  Open Module ↗
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* === XP GUIDE SECTION === */}
      {activeSection === 'xp' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.3rem', marginBottom: '0.4rem' }}>⚡ XP Earning Guide</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.25rem' }}>Click on any activity to jump directly into the module and earn XP!</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {XP_ACTIVITIES.map((act, i) => {
              const targetTab = XP_NAVIGATION_MAP[act.activity] || 'dashboard'
              return (
                <motion.div key={act.activity} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  onClick={() => {
                    useAppStore.getState().setActiveTab(targetTab)
                    toast.success(`Opening ${act.activity} module! ⚡`)
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.9rem', padding: '1rem 1.25rem', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = '#facc15' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{act.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'white', fontWeight: '600', fontSize: '0.88rem' }}>{act.activity}</div>
                    <div style={{ color: '#60a5fa', fontSize: '0.72rem', fontWeight: '600', marginTop: '0.1rem' }}>Click to Start ↗</div>
                  </div>
                  <span style={{ color: '#facc15', fontWeight: '800', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>{act.xp}</span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* === SKILL RANKINGS === */}
      {activeSection === 'skills' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.3rem', marginBottom: '1.25rem' }}>🎯 Skill-wise Rankings</h2>
          {['python', 'sql', 'java', 'dataAnalytics', 'aiml', 'webDev'].map((skill, si) => {
            const skillNames = { python: 'Python', sql: 'SQL', java: 'Java', dataAnalytics: 'Data Analytics', aiml: 'AI/ML', webDev: 'Web Development' }
            const skillColors = ['#4ade80', '#60a5fa', '#f472b6', '#fbbf24', '#c084fc', '#34d399']
            const top5 = [...MOCK_STUDENTS].sort((a, b) => (b[skill] || 0) - (a[skill] || 0)).slice(0, 5)
            return (
              <div key={skill} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1rem' }}>
                <h3 style={{ color: skillColors[si], fontWeight: '700', marginBottom: '0.75rem', fontSize: '1rem' }}>💡 {skillNames[skill]}</h3>
                {top5.map((s, i) => (
                  <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: i < 3 ? skillColors[si] : '#64748b', fontWeight: '800', width: '25px', fontSize: '0.85rem' }}>#{i + 1}</span>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: `linear-gradient(135deg, ${skillColors[si]}44, ${skillColors[si]}22)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '700', color: skillColors[si] }}>{s.name.charAt(0)}</div>
                    <span style={{ flex: 1, color: 'white', fontSize: '0.88rem' }}>{s.name}</span>
                    <div style={{ width: '120px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${s[skill] || 60}%`, background: skillColors[si], borderRadius: '3px' }} />
                    </div>
                    <span style={{ color: skillColors[si], fontWeight: '700', fontSize: '0.85rem', width: '40px', textAlign: 'right' }}>{s[skill] || 60}%</span>
                  </div>
                ))}
              </div>
            )
          })}
        </motion.div>
      )}

      {/* === DEPARTMENT LEADERBOARD === */}
      {activeSection === 'dept' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.3rem', marginBottom: '1.25rem' }}>👥 Department Leaderboard</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {DEPARTMENT_LB.map((dept, i) => {
              const pct = (dept.xp / 8450) * 100
              const colors = ['#fbbf24', '#94a3b8', '#c97b2f', '#60a5fa', '#4ade80', '#f472b6', '#c084fc', '#34d399']
              return (
                <motion.div key={dept.dept} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                  style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(255,255,255,${i < 3 ? '0.12' : '0.07'})`, borderRadius: '0.9rem', padding: '1rem 1.25rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: colors[i], fontWeight: '800', fontSize: '1rem' }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}</span>
                    <span style={{ flex: 1, color: 'white', fontWeight: '600' }}>{dept.dept}</span>
                    <span style={{ color: colors[i], fontWeight: '800' }}>{dept.xp.toLocaleString()} XP</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: i * 0.1, duration: 0.8 }}
                      style={{ height: '100%', background: colors[i], borderRadius: '3px' }} />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* === MONTHLY CHAMPIONS === */}
      {activeSection === 'champions' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.3rem', marginBottom: '1.25rem' }}>🏆 Monthly Champions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            {MONTHLY_CHAMPIONS.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(245,158,11,0.05))', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '1.25rem', padding: '1.5rem', textAlign: 'center' }}
              >
                <div style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{c.title.split(' ')[0]}</div>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem', fontSize: '1.2rem', fontWeight: '700', color: '#1a1a1a' }}>{c.avatar}</div>
                <div style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{c.title.split(' ').slice(1).join(' ')}</div>
                <div style={{ color: 'white', fontWeight: '700', marginBottom: '0.2rem' }}>{c.name}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{c.dept}</div>
                <div style={{ color: '#facc15', fontSize: '0.85rem', fontWeight: '700' }}>{c.xp}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Student Profile Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85 }}
              style={{ background: 'linear-gradient(135deg, #1e1b4b, #1a2540)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.5rem', padding: '2rem', maxWidth: '500px', width: '100%' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: '800', color: 'white' }}>{selectedStudent.name.charAt(0)}</div>
                <div>
                  <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem' }}>{selectedStudent.name}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{selectedStudent.department} · {selectedStudent.year}</p>
                  <p style={{ color: '#64748b', fontSize: '0.8rem' }}>{selectedStudent.college}</p>
                </div>
                <span style={{ marginLeft: 'auto', color: '#fbbf24', fontWeight: '800', fontSize: '1.5rem' }}>#{selectedStudent.rank}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                {[
                  { label: 'Total XP', value: `${selectedStudent.xp} XP`, color: '#facc15' },
                  { label: 'Badges', value: `🏅 ${selectedStudent.badges}`, color: '#f472b6' },
                  { label: 'Skills Score', value: `${Math.round(selectedStudent.skillsScore)}%`, color: '#4ade80' },
                  { label: 'Interview Score', value: `${Math.round(selectedStudent.interviewScore)}%`, color: '#60a5fa' },
                  { label: 'Streak', value: `🔥 ${selectedStudent.streak} days`, color: '#fb923c' },
                  { label: 'Overall Score', value: selectedStudent.overallScore, color: '#c084fc' }
                ].map(stat => (
                  <div key={stat.label} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', padding: '0.75rem', textAlign: 'center' }}>
                    <div style={{ color: stat.color, fontWeight: '800', fontSize: '1.1rem' }}>{stat.value}</div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.2rem' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setSelectedStudent(null)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.08)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontWeight: '600' }}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
