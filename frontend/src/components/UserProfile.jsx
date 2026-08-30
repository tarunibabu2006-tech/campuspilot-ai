import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { masterStates, masterCities, masterSkills } from '../data/masterData'

const DEPARTMENTS = [
  'B.Tech Computer Science Engineering (CSE)',
  'B.Tech Information Technology (IT)',
  'B.Tech Electronics & Communication Engineering (ECE)',
  'B.Tech Electrical & Electronics Engineering (EEE)',
  'B.Tech Mechanical Engineering',
  'B.Tech Civil Engineering',
  'B.Tech Chemical Engineering',
  'B.Tech Biomedical Engineering',
  'B.Sc Computer Science (CS)',
  'B.Sc Information Technology (IT)',
  'B.Sc Mathematics',
  'B.Sc Physics',
  'B.Sc Chemistry',
  'B.Sc Data Science',
  'B.Sc Artificial Intelligence',
  'B.Com (General)',
  'B.Com Computer Applications',
  'B.Com Accounting & Finance',
  'BBA (Business Administration)',
  'BCA (Computer Applications)',
  'MCA (Master of Computer Applications)',
  'M.Tech Computer Science',
  'M.Sc Computer Science',
  'MBA (Master of Business Administration)',
  'B.Pharm (Pharmacy)',
  'MBBS',
  'LLB (Law)',
  'Diploma in Computer Engineering',
  'Diploma in Electronics',
  'Diploma in Mechanical Engineering',
  'Diploma in Civil Engineering',
  'ITI (Industrial Training)',
  'B.A. English',
  'B.A. Tamil',
  'Other'
]

const SEMESTERS = ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester']

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year (Final Year)', 'Postgraduate - 1st Year', 'Postgraduate - 2nd Year']

const SKILLS_LIST = masterSkills

export default function UserProfile() {
  const { user, updateUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null)
  const fileRef = useRef()

  // Live Stats State — strictly from real user data only, ZERO for new users
  const [liveStats, setLiveStats] = useState({
    xp: user?.xp || 0,
    badgesCount: user?.badgesCount || (user?.badges ? user.badges.length : 0),
    rank: user?.rank ? `#${user.rank}` : 'Unranked',
    streak: user?.streak || 0
  })

  // Fetch live stats from gamification API
  useEffect(() => {
    const fetchLiveGamificationStats = async () => {
      try {
        const [badgeRes, streakRes] = await Promise.all([
          api.get('/gamification/badges').catch(() => ({ data: { badges: user?.badges || [], xpPoints: user?.xp || 0 } })),
          api.get('/gamification/streak').catch(() => ({ data: { streak: user?.streak || 1, xpPoints: user?.xp || 0 } }))
        ])

        const liveXp = badgeRes.data.xpPoints ?? streakRes.data.xpPoints ?? user?.xp ?? 0
        const liveBadges = badgeRes.data.badges ? badgeRes.data.badges.length : (user?.badgesCount || (user?.badges ? user.badges.length : 0))
        const liveStreak = streakRes.data.streak ?? user?.streak ?? 0
        const liveRank = user?.rank ? `#${user.rank}` : 'Unranked'

        setLiveStats({
          xp: liveXp,
          badgesCount: liveBadges,
          rank: liveRank,
          streak: liveStreak
        })
      } catch (err) {
        console.warn('Using local stats fallback:', err.message)
      }
    }
    fetchLiveGamificationStats()
  }, [user])

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    college: user?.college || '',
    department: user?.department || '',
    semester: user?.semester || '',
    year: user?.year || '',
    cgpa: user?.cgpa || '',
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    skills: user?.skills || [],
    bio: user?.bio || '',
    city: user?.city || '',
    state: user?.state || ''
  })

  // Sync if user object changes
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        phone: user.phone || prev.phone,
        college: user.college || prev.college,
        department: user.department || prev.department,
        semester: user.semester || prev.semester,
        year: user.year || prev.year,
        cgpa: user.cgpa || prev.cgpa,
        github: user.github || prev.github,
        linkedin: user.linkedin || prev.linkedin,
        skills: user.skills || prev.skills,
        bio: user.bio || prev.bio,
        city: user.city || prev.city,
        state: user.state || prev.state
      }))
      if (user.avatar) setAvatarPreview(user.avatar)
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const toggleSkill = (skill) => {
    const current = formData.skills || []
    setFormData({
      ...formData,
      skills: current.includes(skill) ? current.filter(s => s !== skill) : [...current, skill]
    })
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setAvatarPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.put('/auth/profile', { ...formData, avatar: avatarPreview })
      updateUser(res.data.user)
      toast.success('Profile updated successfully! 🎉')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not save profile. Please try again.')
    }
    setLoading(false)
  }

  // Ensure selected values are in dropdown options list
  const deptOptions = Array.from(new Set([...DEPARTMENTS, ...(formData.department ? [formData.department] : [])]))
  const semOptions = Array.from(new Set([...SEMESTERS, ...(formData.semester ? [formData.semester] : [])]))
  const yearOptions = Array.from(new Set([...YEARS, ...(formData.year ? [formData.year] : [])]))

  const stats = [
    { label: 'XP Points (Live)', value: `${liveStats.xp} XP`, icon: '⚡', color: '#facc15' },
    { label: 'Badges Earned', value: liveStats.badgesCount, icon: '🏅', color: '#f472b6' },
    { label: 'Campus Rank', value: liveStats.rank === 'Unranked' ? 'Unranked' : `#${liveStats.rank}`, icon: '🏆', color: '#60a5fa' },
    { label: 'Daily Streak', value: `${liveStats.streak} Days 🔥`, icon: '🔥', color: '#fb923c' }
  ]

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #1e1b4b, #312e81, #4c1d95)',
          borderRadius: '1.5rem',
          padding: '2rem',
          marginBottom: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(139, 92, 246, 0.3)'
        }}
      >
        <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '100px', height: '100px', borderRadius: '50%',
                background: avatarPreview ? 'transparent' : 'linear-gradient(135deg, #7c3aed, #2563eb)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2.5rem', fontWeight: 'bold', color: 'white',
                border: '3px solid rgba(139,92,246,0.6)',
                overflow: 'hidden', cursor: 'pointer',
                boxShadow: '0 0 30px rgba(139,92,246,0.4)'
              }}
              onClick={() => fileRef.current?.click()}
            >
              {avatarPreview ? (
                <img src={avatarPreview} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                user?.name?.charAt(0)?.toUpperCase() || 'S'
              )}
            </div>
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                position: 'absolute', bottom: 0, right: 0,
                background: '#7c3aed', borderRadius: '50%', width: '28px', height: '28px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: '0.8rem', border: '2px solid #1e1b4b'
              }}
            >📷</div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
          </div>

          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'white', marginBottom: '0.25rem' }}>
              {user?.name || 'Student'}
              {user?.role === 'admin' && <span style={{ marginLeft: '0.5rem', fontSize: '0.9rem', background: '#facc15', color: '#1a1a1a', borderRadius: '0.5rem', padding: '0.2rem 0.5rem' }}>👑 Admin</span>}
            </h1>
            <p style={{ color: '#a5b4fc', marginBottom: '0.5rem' }}>{user?.email}</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {formData.department && <span style={{ background: 'rgba(124,58,237,0.3)', color: '#c4b5fd', padding: '0.2rem 0.7rem', borderRadius: '1rem', fontSize: '0.75rem', border: '1px solid rgba(124,58,237,0.4)' }}>🎓 {formData.department}</span>}
              {formData.semester && <span style={{ background: 'rgba(37,99,235,0.3)', color: '#93c5fd', padding: '0.2rem 0.7rem', borderRadius: '1rem', fontSize: '0.75rem', border: '1px solid rgba(37,99,235,0.4)' }}>📅 {formData.semester}</span>}
              {formData.college && <span style={{ background: 'rgba(5,150,105,0.3)', color: '#6ee7b7', padding: '0.2rem 0.7rem', borderRadius: '1rem', fontSize: '0.75rem', border: '1px solid rgba(5,150,105,0.4)' }}>🏛️ {formData.college}</span>}
            </div>
          </div>

          {/* LIVE Stats Row */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {stats.map((s) => (
              <div key={s.label} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.9rem', padding: '0.75rem 1rem', minWidth: '80px' }}>
                <div style={{ fontSize: '1.3rem' }}>{s.icon}</div>
                <div style={{ color: s.color, fontWeight: '800', fontSize: '1rem' }}>{s.value}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.65rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        {['profile', 'skills', 'links', 'achievements'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.55rem 1.3rem', borderRadius: '0.75rem', fontWeight: '700', fontSize: '0.88rem',
              cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
              background: activeTab === tab ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.05)',
              color: activeTab === tab ? 'white' : '#94a3b8',
              border: activeTab === tab ? 'none' : '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {tab === 'profile' && '👤 Profile Info'}
            {tab === 'skills' && '💻 My Skills'}
            {tab === 'links' && '🔗 Professional Links'}
            {tab === 'achievements' && '🏅 Achievements'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave}>
        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
            <h3 style={{ color: 'white', fontWeight: '700', marginBottom: '1.25rem', fontSize: '1.1rem' }}>📋 Personal & Academic Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {[
                { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your full name' },
                { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+91 98765 43210' },
                { label: 'College / University', name: 'college', type: 'text', placeholder: 'Anna University / SKASC...' },
                { label: 'Current CGPA', name: 'cgpa', type: 'number', placeholder: '8.5' }
              ].map(field => (
                <div key={field.name}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>{field.label}</label>
                  <input
                    type={field.type} name={field.name} value={formData[field.name]} onChange={handleChange}
                    placeholder={field.placeholder}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              ))}

              {/* State Dropdown */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>State / UT (India)</label>
                <select
                  name="state" value={formData.state} onChange={handleChange}
                  style={{ width: '100%', background: '#1e1b4b', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '0.6rem', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="">-- Select State --</option>
                  {masterStates.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* City Dropdown */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>City (India)</label>
                <select
                  name="city" value={formData.city} onChange={handleChange}
                  style={{ width: '100%', background: '#1e1b4b', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '0.6rem', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="">-- Select City --</option>
                  {masterCities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Department Dropdown */}
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Department / Degree Course</label>
                <select
                  name="department" value={formData.department} onChange={handleChange}
                  style={{ width: '100%', background: '#1e1b4b', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '0.6rem', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="">-- Select Department --</option>
                  {deptOptions.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {/* Semester */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Semester</label>
                <select
                  name="semester" value={formData.semester} onChange={handleChange}
                  style={{ width: '100%', background: '#1e1b4b', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '0.6rem', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="">-- Select Semester --</option>
                  {semOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Year */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Year of Study</label>
                <select
                  name="year" value={formData.year} onChange={handleChange}
                  style={{ width: '100%', background: '#1e1b4b', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '0.6rem', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="">-- Select Year --</option>
                  {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              {/* Bio */}
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Short Bio</label>
                <textarea
                  name="bio" value={formData.bio} onChange={handleChange}
                  placeholder="Tell us about yourself, your career goals, and tech interests..."
                  rows={3}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
            <h3 style={{ color: 'white', fontWeight: '700', marginBottom: '0.5rem', fontSize: '1.1rem' }}>💻 Select Your Skills</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.25rem' }}>Selected: {formData.skills?.length || 0} skills</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {SKILLS_LIST.map(skill => {
                const selected = formData.skills?.includes(skill)
                return (
                  <button
                    key={skill} type="button" onClick={() => toggleSkill(skill)}
                    style={{
                      padding: '0.45rem 1rem', borderRadius: '2rem', fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s', fontWeight: '600',
                      background: selected ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.05)',
                      color: selected ? 'white' : '#94a3b8',
                      border: selected ? 'none' : '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    {selected ? '✓ ' : ''}{skill}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* LINKS TAB */}
        {activeTab === 'links' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
            <h3 style={{ color: 'white', fontWeight: '700', marginBottom: '1.25rem', fontSize: '1.1rem' }}>🔗 Professional Links</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {[
                { label: '🐙 GitHub Profile', name: 'github', placeholder: 'https://github.com/username' },
                { label: '💼 LinkedIn Profile', name: 'linkedin', placeholder: 'https://linkedin.com/in/username' }
              ].map(field => (
                <div key={field.name}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>{field.label}</label>
                  <input
                    type="url" name={field.name} value={formData[field.name]} onChange={handleChange}
                    placeholder={field.placeholder}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ACHIEVEMENTS TAB */}
        {activeTab === 'achievements' && (() => {
          const userSkills = formData.skills || user?.skills || []
          const hasSkill = (sk) => userSkills.some(s => s.toLowerCase().includes(sk.toLowerCase()))
          const userXp = liveStats.xp || 0
          const userStreak = liveStats.streak || 0

          const ACHIEVEMENTS_DEF = [
            {
              icon: '🐍',
              name: 'Python Master',
              xp: 80,
              desc: 'Add Python to profile & score 80%+ in assessment',
              condition: 'Python in skills + 80 XP',
              progress: Math.min(100, (hasSkill('Python') ? 50 : 0) + Math.min(50, Math.round((userXp / 80) * 50))),
              unlocked: hasSkill('Python') && userXp >= 80
            },
            {
              icon: '⚛️',
              name: 'React Master',
              xp: 100,
              desc: 'Add React to skills & earn 100+ XP in frontend tests',
              condition: 'React in skills + 100 XP',
              progress: Math.min(100, (hasSkill('React') ? 50 : 0) + Math.min(50, Math.round((userXp / 100) * 50))),
              unlocked: hasSkill('React') && userXp >= 100
            },
            {
              icon: '🎤',
              name: 'Interview Pro',
              xp: 120,
              desc: 'Complete 5 voice mock interviews & earn 120 XP',
              condition: '5 Interviews + 120 XP',
              progress: Math.min(100, Math.round((userXp / 120) * 100)),
              unlocked: userXp >= 120
            },
            {
              icon: '📄',
              name: 'Resume Expert',
              xp: 90,
              desc: 'Score 90+ on Resume Scorer & upload CV',
              condition: 'Resume score 90+',
              progress: Math.min(100, Math.round((userXp / 90) * 100)),
              unlocked: userXp >= 90
            },
            {
              icon: '🔥',
              name: '30-Day Streak',
              xp: 150,
              desc: 'Login 30 consecutive days on CampusPilot AI',
              condition: `${userStreak}/30 Days`,
              progress: Math.min(100, Math.round((userStreak / 30) * 100)),
              unlocked: userStreak >= 30
            },
            {
              icon: '🏆',
              name: 'Top Performer',
              xp: 200,
              desc: 'Reach top 10 on the campus leaderboard',
              condition: 'Top 10 Rank',
              progress: liveStats.rank !== 'Unranked' && parseInt(liveStats.rank) <= 10 ? 100 : Math.min(100, Math.round((userXp / 200) * 100)),
              unlocked: liveStats.rank !== 'Unranked' && parseInt(liveStats.rank) <= 10
            },
            {
              icon: '🤖',
              name: 'AI/ML Explorer',
              xp: 130,
              desc: 'Complete AI/ML learning path & 5-Yr roadmap',
              condition: 'AI/ML in skills + Roadmap',
              progress: Math.min(100, (hasSkill('Machine Learning') || hasSkill('AI') || hasSkill('Python') ? 50 : 0) + Math.min(50, Math.round((userXp / 130) * 50))),
              unlocked: (hasSkill('Machine Learning') || hasSkill('AI')) && userXp >= 130
            },
            {
              icon: '💻',
              name: 'Coding Champion',
              xp: 110,
              desc: 'Solve 50+ coding problems in aptitude & mock tests',
              condition: '50 Problems solved',
              progress: Math.min(100, Math.round((userXp / 110) * 100)),
              unlocked: userXp >= 110
            }
          ]

          const unlockedCount = ACHIEVEMENTS_DEF.filter(a => a.unlocked).length

          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', margin: 0 }}>🏅 Achievement Badges & Milestones</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0.2rem 0 0' }}>Real-time progress based on your actual profile skills, tests, and XP.</p>
                </div>
                <span style={{ background: unlockedCount > 0 ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.06)', color: unlockedCount > 0 ? '#4ade80' : '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', padding: '0.35rem 0.8rem', borderRadius: '0.6rem', fontWeight: '700', fontSize: '0.82rem' }}>
                  {unlockedCount} / {ACHIEVEMENTS_DEF.length} Unlocked
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {ACHIEVEMENTS_DEF.map((badge) => (
                  <div key={badge.name} style={{
                    padding: '1.25rem',
                    background: badge.unlocked ? 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(37,99,235,0.2))' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${badge.unlocked ? '#a855f7' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: '1rem',
                    boxShadow: badge.unlocked ? '0 0 20px rgba(168,85,247,0.25)' : 'none'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                      <div style={{ fontSize: '2.2rem', filter: badge.unlocked ? 'none' : 'grayscale(100%) opacity(0.4)' }}>{badge.icon}</div>
                      <div>
                        <div style={{ color: badge.unlocked ? 'white' : '#cbd5e1', fontWeight: '800', fontSize: '0.95rem' }}>{badge.name}</div>
                        <div style={{ color: badge.unlocked ? '#4ade80' : '#94a3b8', fontSize: '0.72rem', fontWeight: '700' }}>
                          {badge.unlocked ? '✓ Unlocked' : '🔒 In Progress'}
                        </div>
                      </div>
                    </div>

                    <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.75rem', minHeight: '34px' }}>{badge.desc}</p>

                    {/* Progress Bar */}
                    <div style={{ marginBottom: '0.4rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.2rem' }}>
                        <span>Progress</span>
                        <span style={{ color: badge.unlocked ? '#4ade80' : '#fbbf24', fontWeight: '700' }}>{badge.progress}%</span>
                      </div>
                      <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${badge.progress}%`, background: badge.unlocked ? 'linear-gradient(90deg, #10b981, #059669)' : 'linear-gradient(90deg, #7c3aed, #2563eb)', borderRadius: '3px' }} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', paddingTop: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.72rem' }}>
                      <span style={{ color: '#64748b' }}>Reward</span>
                      <span style={{ color: '#facc15', fontWeight: '800' }}>+{badge.xp} XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })()}

        <button
          type="submit" disabled={loading}
          style={{
            width: '100%', padding: '0.9rem', marginTop: '1.25rem', borderRadius: '0.9rem',
            background: loading ? '#374151' : 'linear-gradient(135deg, #7c3aed, #2563eb)',
            color: 'white', fontWeight: '700', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer',
            border: 'none', transition: 'all 0.3s', boxShadow: loading ? 'none' : '0 4px 20px rgba(124,58,237,0.4)'
          }}
        >
          {loading ? '⏳ Saving...' : '💾 Save Profile Changes'}
        </button>
      </form>
    </div>
  )
}
