import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'
import toast from 'react-hot-toast'

function Dashboard({ onNavigate }) {
  const { user, logout } = useAuth()
  const [stats, setStats] = useState({
    totalStudents: 248,
    totalSkills: 50,
    totalJobs: 30,
    activeStudents: 186,
    studentsByDepartment: [
      { _id: 'Computer Science', count: 84 },
      { _id: 'Information Technology', count: 62 },
      { _id: 'Electronics & Comm', count: 48 },
      { _id: 'Mechanical Eng', count: 32 },
      { _id: 'Civil Eng', count: 22 }
    ],
    studentsByYear: [
      { _id: '3rd Year', count: 110 },
      { _id: '4th Year', count: 92 },
      { _id: '2nd Year', count: 46 }
    ],
    recentStudents: [
      { id: '1', name: 'Taruni Babu', email: 'tarunibabu2006@gmail.com', department: 'Computer Science' },
      { id: '2', name: 'Prawin Kumar', email: 'prawinkumar@campus.edu', department: 'Information Technology' }
    ]
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await api.get('/admin/dashboard')
      setStats(res.data)
    } catch (err) {
      console.error('Error fetching dashboard stats:', err)
    }
    setLoading(false)
  }

  const flagshipFeatures = [
    { icon: '🔮', label: 'Career Predictor', tab: 'career-predictor', desc: 'AI 5-Yr & 10-Yr Trajectory, Salaries & Roadmap', color: 'linear-gradient(135deg, rgba(147,51,234,0.2) 0%, rgba(147,51,234,0.05) 100%)', border: 'rgba(147,51,234,0.4)', tag: 'PREDICTOR 🔮' },
    { icon: '🎙️', label: 'Voice Mock Interview', tab: 'voice-interview', desc: 'Real Speech-to-Text Practice with AI Evaluation', color: 'linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(239,68,68,0.05) 100%)', border: 'rgba(239,68,68,0.4)', tag: 'VOICE AI 🎙️' },
    { icon: '🏆', label: 'Gamification 2.0', tab: 'gamification', desc: 'Earn Skill Badges, Streaks & XP Leaderboards', color: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0.05) 100%)', border: 'rgba(245,158,11,0.4)', tag: 'BADGES 🏆' },
    { icon: '👥', label: 'Study Groups', tab: 'study-groups', desc: 'Peer Chat Rooms, Shared Notes & Doubt Support', color: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.05) 100%)', border: 'rgba(16,185,129,0.4)', tag: 'STUDY ROOMS 👥' },
    { icon: '🗺️', label: 'Career GPS', tab: 'career-gps', desc: 'AI Skill Gap Analyzer & Personalized Learning Path', color: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0.05) 100%)', border: 'rgba(59,130,246,0.4)', tag: 'CAREER GPS 🗺️' },
    { icon: '📄', label: 'Resume Scorer', tab: 'resume-scorer', desc: 'Instant ATS 0-100 Score, Tailoring & Keywords', color: 'linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(6,182,212,0.05) 100%)', border: 'rgba(6,182,212,0.4)', tag: 'ATS SCORE 📊' },
    { icon: '🤖', label: 'AI Application Proxy', tab: 'ai-apply', desc: 'Automate job applications to matching vacancies', color: 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(139,92,246,0.05) 100%)', border: 'rgba(139,92,246,0.4)', tag: 'AUTO APPLY ⚡' },
    { icon: '🏷️', label: 'Verified Skill Badge', tab: 'skill-badge', desc: 'Student Trust Score & Target Career Fit Score', color: 'linear-gradient(135deg, rgba(236,72,153,0.2) 0%, rgba(236,72,153,0.05) 100%)', border: 'rgba(236,72,153,0.4)', tag: 'VERIFIED 🛡️' },
    { icon: '👥', label: 'Mentor Connect', tab: 'mentors', desc: 'Connect with Google, Amazon, TCS Alumni Experts', color: 'linear-gradient(135deg, rgba(20,184,166,0.2) 0%, rgba(20,184,166,0.05) 100%)', border: 'rgba(20,184,166,0.4)', tag: 'ALUMNI 👥' },
    { icon: '📝', label: 'Company Mock Tests', tab: 'mock-tests', desc: 'Practice TCS, Infosys, Google, Amazon Test Patterns', color: 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(249,115,22,0.05) 100%)', border: 'rgba(249,115,22,0.4)', tag: 'TESTS 🎯' }
  ]

  const studyTools = [
    { icon: '📚', label: 'Learn Skills', tab: 'skills', desc: 'Explore tech roadmaps & notes' },
    { icon: '🗺️', label: 'Role Paths', tab: 'role-learning', desc: 'Target 50+ roles' },
    { icon: '💼', label: 'Job Portal', tab: 'jobs', desc: 'Browse verified campus jobs' },
    { icon: '🎤', label: 'Mock Interview', tab: 'interview', desc: 'Practice with AI Interviewer' },
    { icon: '🧠', label: 'Aptitude Test', tab: 'aptitude', desc: 'Test logic & quantitative skills' },
    { icon: '📝', label: 'Notes Hub', tab: 'notes', desc: 'Access 1000+ peer notes' }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Hero Welcome banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#fff' }}>Welcome back, {user?.name || 'Student'}! 👋</h2>
        <p className="card-subtitle" style={{ color: 'var(--text-muted)' }}>
          {user?.role === 'admin' ? 'Faculty/Administrator Console' : 'Your personal AI-powered study and placement prep cockpit.'}
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <div>
            <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--blue)' }}>{stats.totalSkills}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Published Skills</span>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--green)' }}>{stats.totalJobs}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Job Vacancies</span>
          </div>
          {user?.role === 'admin' && (
            <div>
              <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--danger)' }}>{stats.totalStudents}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Registered Students</span>
            </div>
          )}
        </div>
      </div>

      {/* 🌟 6 NEW FLAGSHIP PLACEMENT FEATURES */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #0b0f19 0%, #16192b 100%)', border: '1px solid rgba(99,102,241,0.3)', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🌟</span> India's #1 AI Placement & Career Suite
            </h3>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              6 New Revolutionary AI tools to guarantee dream job placement
            </p>
          </div>
          <span style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.5)', color: '#a5b4fc', padding: '0.3rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>
            ✨ 6 NEW MODULES
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {flagshipFeatures.map(f => (
            <div
              key={f.tab}
              onClick={() => onNavigate(f.tab)}
              style={{
                background: f.color,
                border: `1px solid ${f.border}`,
                borderRadius: '12px',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${f.border}33` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '2rem' }}>{f.icon}</span>
                  <span style={{ fontSize: '0.65rem', background: 'rgba(0,0,0,0.4)', padding: '0.2rem 0.5rem', borderRadius: '10px', color: '#fff', fontWeight: 'bold' }}>{f.tag}</span>
                </div>
                <h4 style={{ margin: '0 0 0.4rem', color: '#fff', fontSize: '1.05rem' }}>{f.label}</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{f.desc}</p>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: '#fff', fontWeight: 'bold' }}>
                Open Feature →
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Additional study actions / Admin preview */}
      <div className="grid-2" style={{ gridTemplateColumns: user?.role === 'admin' ? '1.2fr 0.8fr' : '1fr' }}>
        <div>
          <h3 className="result-title" style={{ marginTop: 0 }}>📚 Core Learning & Practice Tools</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {studyTools.map(action => (
              <div
                key={action.tab}
                className="result-item"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  cursor: 'pointer',
                  padding: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px'
                }}
                onClick={() => onNavigate(action.tab)}
              >
                <div style={{ fontSize: '1.6rem' }}>{action.icon}</div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{action.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{action.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Show Admin Stats Summary if User is Admin */}
        {user?.role === 'admin' && (
          <div className="card" style={{ alignSelf: 'start' }}>
            <h3 className="result-title" style={{ marginTop: 0 }}>📊 Campus Statistics</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Department Share</p>
                {stats.studentsByDepartment?.map(dept => (
                  <div key={dept._id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '0.2rem 0' }}>
                    <span>{dept._id}</span>
                    <span style={{ fontWeight: 'bold' }}>{dept.count}</span>
                  </div>
                ))}
              </div>
              <hr style={{ borderColor: 'var(--border-color)' }} />
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Recent Signups</p>
                {stats.recentStudents?.slice(0, 3).map(s => (
                  <div key={s.id} style={{ fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', padding: '0.2rem 0' }}>
                    <span>{s.name}</span>
                    <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>{s.department}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary btn-full" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }} onClick={() => onNavigate('admin')}>
                Open Full Admin Console 👑
              </button>
              <button className="btn btn-outline btn-full" style={{ fontSize: '0.8rem', marginTop: '0.4rem', border: '1px solid rgba(59,130,246,0.5)' }} onClick={() => onNavigate('student-analytics')}>
                👥 View Student Activity & Logins
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
