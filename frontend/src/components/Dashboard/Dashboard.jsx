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
    { icon: '🗺️', label: 'Career GPS', tab: 'career-gps', desc: 'Skill gap analyzer & roadmap', color: 'rgba(16,185,129,0.1)' },
    { icon: '📊', label: 'Resume Scorer', tab: 'resume-scorer', desc: 'AI 0-100 score & feedback', color: 'rgba(59,130,246,0.1)' },
    { icon: '🤖', label: 'AI Apply', tab: 'ai-apply', desc: 'Auto-apply to matching jobs', color: 'rgba(139,92,246,0.1)' },
    { icon: '👥', label: 'Mentors', tab: 'mentors', desc: 'Connect with experts', color: 'rgba(236,72,153,0.1)' },
    { icon: '📝', label: 'Mock Tests', tab: 'mock-tests', desc: 'Company-specific practice', color: 'rgba(245,158,11,0.1)' },
    { icon: '📚', label: 'Learn Skills', tab: 'skills', desc: 'Browse courses & notes', color: 'rgba(59,130,246,0.1)' },
    { icon: '💼', label: 'Job Portal', tab: 'jobs', desc: 'Search & apply companies', color: 'rgba(245,158,11,0.1)' },
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
                  border: '1px solid var(--border-color)'
                }}
                onClick={() => onNavigate(action.tab)}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{action.icon}</div>
                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{action.label}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{action.desc}</div>
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
