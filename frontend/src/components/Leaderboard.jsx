import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

const MOCK_STUDENTS = Array.from({ length: 40 }, (_, i) => ({
  rank: i + 1,
  name: ['Arjun Kumar', 'Priya Rajan', 'Mohammed Ali', 'Sneha Iyer', 'Karthik S', 'Divya M', 'Rahul Sharma', 'Lakshmi P', 'Vignesh R', 'Anitha K'][i % 10] + ` ${i + 1}`,
  department: ['B.Sc CS', 'BCA', 'B.Tech CSE', 'B.Com', 'B.Sc IT', 'BBA', 'B.Tech ECE', 'MCA', 'B.Tech Mech', 'B.Com CA'][i % 10],
  year: ['1st Year', '2nd Year', '3rd Year', 'Final Year'][i % 4],
  college: ['Anna University', 'Bharathiar University', 'Madurai Kamaraj University', 'VIT Chennai'][i % 4],
  xp: Math.max(50, 1200 - (i * 28) + Math.floor(Math.random() * 30)),
  skillsScore: Math.max(40, 95 - (i * 1.3) + Math.floor(Math.random() * 10)),
  interviewScore: Math.max(40, 92 - (i * 1.2) + Math.floor(Math.random() * 10)),
  badges: Math.max(1, 12 - Math.floor(i / 3)),
  streak: Math.max(1, 25 - i + Math.floor(Math.random() * 5)),
  overallScore: Math.max(40, 980 - (i * 22)),
  avatar: null,
  prevRank: i + 1 + Math.floor(Math.random() * 5) - 2,
  python: Math.floor(Math.random() * 40) + 60,
  sql: Math.floor(Math.random() * 40) + 55,
  java: Math.floor(Math.random() * 40) + 50,
  dataAnalytics: Math.floor(Math.random() * 40) + 45,
  aiml: Math.floor(Math.random() * 40) + 40,
  webDev: Math.floor(Math.random() * 40) + 55
}))

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

const BADGES = [
  { icon: '🐍', name: 'Python Master', desc: 'Score 80%+ in Python assessment' },
  { icon: '📊', name: 'Data Analytics Pro', desc: 'Complete Data Analytics module' },
  { icon: '🤖', name: 'AI/ML Explorer', desc: 'Complete AI/ML learning path' },
  { icon: '💻', name: 'Coding Champion', desc: 'Solve 50+ coding problems' },
  { icon: '🎤', name: 'Interview Pro', desc: 'Complete 10 mock interviews' },
  { icon: '📄', name: 'Resume Expert', desc: 'Score 90+ on Resume Scorer' },
  { icon: '🔥', name: '30-Day Streak', desc: 'Login 30 consecutive days' },
  { icon: '🏆', name: 'Top Performer', desc: 'Reach top 10 on leaderboard' }
]

const MONTHLY_CHAMPIONS = [
  { title: '🏆 August Champion', name: 'Arjun Kumar', dept: 'B.Tech CSE', xp: '1,200 XP', avatar: 'A' },
  { title: '⭐ Best Coder', name: 'Priya Rajan', dept: 'B.Sc CS', xp: '950 XP', avatar: 'P' },
  { title: '🎤 Best Interviewer', name: 'Karthik S', dept: 'BCA', xp: '880 XP', avatar: 'K' },
  { title: '🚀 Most Improved', name: 'Sneha Iyer', dept: 'B.Com', xp: '+42% this month', avatar: 'S' }
]

const DEPARTMENT_LB = [
  { dept: 'B.Tech CSE', xp: 8450, rank: 1 },
  { dept: 'B.Sc CS', xp: 7920, rank: 2 },
  { dept: 'BCA', xp: 7540, rank: 3 },
  { dept: 'MCA', xp: 6890, rank: 4 },
  { dept: 'B.Sc IT', xp: 6450, rank: 5 },
  { dept: 'B.Com CA', xp: 5980, rank: 6 },
  { dept: 'B.Tech ECE', xp: 5650, rank: 7 },
  { dept: 'BBA', xp: 4320, rank: 8 }
]

export default function Leaderboard() {
  const [students, setStudents] = useState(MOCK_STUDENTS)
  const [loading, setLoading] = useState(false)
  const [filterDept, setFilterDept] = useState('All')
  const [filterYear, setFilterYear] = useState('All')
  const [filterTime, setFilterTime] = useState('All time')
  const [activeSection, setActiveSection] = useState('leaderboard')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [skillFilter, setSkillFilter] = useState('overallScore')

  const allDepts = ['All', ...new Set(MOCK_STUDENTS.map(s => s.department))]
  const allYears = ['All', '1st Year', '2nd Year', '3rd Year', 'Final Year']
  const timeOptions = ['This week', 'This month', 'All time']

  const filtered = students.filter(s =>
    (filterDept === 'All' || s.department === filterDept) &&
    (filterYear === 'All' || s.year === filterYear)
  )

  const top3 = filtered.slice(0, 3)
  const rest = filtered.slice(3)
  const myRank = 12

  const rankImprovement = myRank - 18

  const podiumOrder = top3.length >= 3 ? [top3[1], top3[0], top3[2]] : top3
  const podiumHeights = ['140px', '180px', '110px']
  const podiumColors = ['linear-gradient(135deg, #94a3b8, #cbd5e1)', 'linear-gradient(135deg, #fbbf24, #f59e0b)', 'linear-gradient(135deg, #c97b2f, #b45309)']
  const podiumLabels = ['🥈 2nd', '🥇 1st', '🥉 3rd']

  const sections = [
    { id: 'leaderboard', label: '📊 Leaderboard' },
    { id: 'badges', label: '🏅 Badges' },
    { id: 'xp', label: '⚡ XP Guide' },
    { id: 'skills', label: '🎯 Skill Rankings' },
    { id: 'dept', label: '👥 Departments' },
    { id: 'champions', label: '🏆 Champions' }
  ]

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #1a1028, #2d1f54, #1a2540)', borderRadius: '1.5rem', padding: '2rem', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid rgba(250,204,21,0.3)', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '400px', height: '200px', background: 'radial-gradient(circle, rgba(250,204,21,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <h1 style={{ fontSize: '2.2rem', fontWeight: '900', background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem' }}>
          🏆 College Hall of Fame
        </h1>
        <p style={{ color: '#94a3b8' }}>Top performers based on skills, mock tests, interviews & daily engagement.</p>

        {/* My Rank Banner */}
        <div style={{ marginTop: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.3)', borderRadius: '0.75rem', padding: '0.6rem 1.5rem' }}>
          <span style={{ color: '#fbbf24', fontWeight: '700' }}>You are #{myRank}</span>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Previous rank: #18</span>
          <span style={{ color: '#4ade80', fontWeight: '700' }}>📈 +{Math.abs(rankImprovement)} positions</span>
        </div>
      </motion.div>

      {/* Section Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {sections.map(s => (
          <button key={s.id} onClick={() => setActiveSection(s.id)}
            style={{ padding: '0.5rem 1rem', borderRadius: '0.75rem', fontWeight: '600', fontSize: '0.82rem', whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.2s',
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
                style={{ padding: '0.5rem 0.9rem', borderRadius: '0.6rem', fontSize: '0.82rem', cursor: 'pointer',
                  background: filterTime === t ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.05)',
                  color: filterTime === t ? '#fbbf24' : '#94a3b8',
                  border: `1px solid ${filterTime === t ? 'rgba(251,191,36,0.4)' : 'rgba(255,255,255,0.1)'}` }}>{t}</button>
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
                style={{ display: 'grid', gridTemplateColumns: '50px 1fr 120px 90px 70px 70px 70px 60px 60px 80px', gap: '0.5rem', padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'background 0.2s',
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
          <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.3rem', marginBottom: '1.25rem' }}>🏅 Achievement Badges</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {BADGES.map((badge, i) => (
              <motion.div key={badge.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', padding: '1.25rem', textAlign: 'center', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{badge.icon}</div>
                <div style={{ color: 'white', fontWeight: '700', marginBottom: '0.3rem' }}>{badge.name}</div>
                <div style={{ color: '#64748b', fontSize: '0.78rem' }}>{badge.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* === XP GUIDE SECTION === */}
      {activeSection === 'xp' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.3rem', marginBottom: '1.25rem' }}>⚡ XP Earning Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {XP_ACTIVITIES.map((act, i) => (
              <motion.div key={act.activity} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.9rem', padding: '1rem 1.25rem' }}
              >
                <span style={{ fontSize: '1.5rem' }}>{act.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'white', fontWeight: '600', fontSize: '0.88rem' }}>{act.activity}</div>
                </div>
                <span style={{ color: '#facc15', fontWeight: '800', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>{act.xp}</span>
              </motion.div>
            ))}
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
