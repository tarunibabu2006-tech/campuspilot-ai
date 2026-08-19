import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'
import toast from 'react-hot-toast'

function Dashboard({ onNavigate }) {
  const { user, logout } = useAuth()
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalSkills: 0,
    totalJobs: 0,
    activeStudents: 0,
    studentsByDepartment: [],
    studentsByYear: [],
    recentStudents: []
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

  const quickActions = [
    { icon: '📚', label: 'Learn Skills', tab: 'skills', desc: 'Browse courses & notes', color: 'rgba(59,130,246,0.1)' },
    { icon: '🗺️', label: 'Role Path', tab: 'role-learning', desc: 'Step-by-step roadmaps', color: 'rgba(16,185,129,0.1)' },
    { icon: '📄', label: 'Resume Builder', tab: 'resume', desc: 'Build premium resumes', color: 'rgba(139,92,246,0.1)' },
    { icon: '💼', label: 'Job Portal', tab: 'jobs', desc: 'Search & apply companies', color: 'rgba(245,158,11,0.1)' },
    { icon: '🎤', label: 'Mock Interview', tab: 'interview', desc: 'Practice with AI', color: 'rgba(239,68,68,0.1)' },
    { icon: '🧠', label: 'Aptitude Test', tab: 'aptitude', desc: 'Practice MCQ rounds', color: 'rgba(79,70,229,0.1)' },
    { icon: '📚', label: 'Exam Emergency', tab: 'exam', desc: 'Last minute study plans', color: 'rgba(236,72,153,0.1)' },
    { icon: '🎯', label: 'Placement Prep', tab: 'placement', desc: 'Company target track', color: 'rgba(20,184,166,0.1)' }
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

      {/* Main Grid: Student actions / Stats preview */}
      <div className="grid-2" style={{ gridTemplateColumns: user?.role === 'admin' ? '1.2fr 0.8fr' : '1fr' }}>
        <div>
          <h3 className="result-title" style={{ marginTop: 0 }}>🚀 Quick Feature Cockpit</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {quickActions.map(action => (
              <div
                key={action.tab}
                className="result-item"
                style={{
                  background: action.color,
                  cursor: 'pointer',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'transform 0.2s',
                  border: '1px solid transparent'
                }}
                onClick={() => onNavigate(action.tab)}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '2rem' }}>{action.icon}</div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 'bold' }}>{action.label}</h4>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{action.desc}</p>
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
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
