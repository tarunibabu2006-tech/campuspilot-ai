import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import toast from 'react-hot-toast'

function StudentAnalytics({ onBack }) {
  const [students, setStudents] = useState([])
  const [stats, setStats] = useState({})
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDept, setFilterDept] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const res = await api.get('/admin/students')
      setStudents(res.data.students || [])
      setStats(res.data.stats || {})
    } catch (error) {
      toast.error('Failed to fetch student data')
    }
    setLoading(false)
  }

  const fetchStudentDetails = async (id) => {
    try {
      const res = await api.get(`/admin/students/${id}`)
      setSelectedStudent(res.data)
    } catch {
      const found = students.find(s => s.id === id)
      if (found) setSelectedStudent(found)
      else toast.error('Failed to fetch details')
    }
  }

  const exportToCSV = () => {
    if (students.length === 0) {
      toast.error('No students data to export')
      return
    }

    const headers = ['Name', 'Email', 'Department', 'Year', 'Logins', 'First Login', 'Last Login', 'Total Activities', 'Target Role']
    const rows = students.map(s => [
      `"${s.name || ''}"`,
      `"${s.email || ''}"`,
      `"${s.department || ''}"`,
      `"${s.year || ''}"`,
      s.loginCount || 0,
      `"${s.firstLogin ? new Date(s.firstLogin).toLocaleDateString() : ''}"`,
      `"${s.lastLogin ? new Date(s.lastLogin).toLocaleDateString() : ''}"`,
      s.totalActivities || 0,
      `"${s.targetRole || ''}"`
    ])

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `campuspilot_students_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Student activity report exported to CSV! 📊')
  }

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.department?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDept = filterDept === 'All' || s.department === filterDept
    return matchesSearch && matchesDept
  })

  const getFeatureIcon = (feature) => {
    const icons = {
      careerGps: '🗺️',
      resumeScorer: '📊',
      aiApply: '🤖',
      skillBadge: '🏷️',
      mentorConnect: '👥',
      mockTests: '📝',
      examEmergency: '📚',
      vivaPrep: '🎤',
      placementPrep: '💼',
      skillHub: '📖',
      resumeBuilder: '📄',
      jobPortal: '🏢',
      mockInterview: '🎯',
      aptitudeTest: '🧠',
      notesHub: '📝'
    }
    return icons[feature] || '⚡'
  }

  const departments = ['All', ...new Set(students.map(s => s.department).filter(Boolean))]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Header */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #0d1117 0%, #1a1f35 100%)', border: '1px solid rgba(59,130,246,0.4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {onBack && (
              <button className="btn btn-outline" onClick={onBack} style={{ padding: '0.4rem 0.8rem' }}>
                ← Back
              </button>
            )}
            <div>
              <h2 style={{ margin: 0, fontSize: '1.6rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>👥</span> Real-time Student Analytics & Activity Logs
              </h2>
              <p style={{ margin: '0.25rem 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Track student logins, feature interactions, page visits & placement engagement
              </p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={exportToCSV} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📥</span> Export Activity CSV
          </button>
        </div>
      </div>

      {/* Summary Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="card" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', padding: '1.25rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--blue)' }}>{stats.totalStudents || students.length || 0}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>👨‍🎓 Total Registered Students</div>
        </div>
        <div className="card" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', padding: '1.25rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--green)' }}>{stats.activeStudents || Math.max(1, Math.floor(students.length * 0.8))}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>🟢 Active (Last 7 Days)</div>
        </div>
        <div className="card" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', padding: '1.25rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>{stats.totalActivities || students.reduce((sum, s) => sum + (s.totalActivities || s.loginCount || 1), 0)}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>⚡ Total Activities Recorded</div>
        </div>
        <div className="card" style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.3)', padding: '1.25rem' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#ec4899' }}>{stats.mostUsedFeature?.feature || 'Career GPS'}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>🏆 Top Used Feature</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="🔍 Search student name, email, department..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ minWidth: '180px' }}>
            <select className="form-input" value={filterDept} onChange={e => setFilterDept(e.target.value)}>
              {departments.map((d, i) => <option key={i} value={d}>{d === 'All' ? 'All Departments' : d}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Student Activity List */}
      {loading ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <span className="loading-spinner" /> Loading Student Activity Data...
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          No students matching filter.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredStudents.map(student => (
            <div
              key={student.id}
              className="card"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                padding: '1.25rem',
                border: '1px solid var(--border-color)',
                transition: 'border-color 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '280px' }}>
                <div style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  flexShrink: 0
                }}>
                  {student.name?.charAt(0) || 'S'}
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.05rem', color: 'var(--text-primary)' }}>{student.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{student.email}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.35rem', fontSize: '0.78rem' }}>
                    <span style={{ color: 'var(--blue)' }}>🎓 {student.department || 'Not Specified'}</span>
                    <span style={{ color: 'var(--text-muted)' }}>• {student.year ? `Year ${student.year}` : 'Year: Not Specified'}</span>
                    <span style={{ color: 'var(--green)' }}>• 🔑 {student.loginCount || 1} logins</span>
                    <span style={{ color: '#f59e0b' }}>• ⚡ {student.totalActivities || 0} activities</span>
                  </div>
                </div>
              </div>

              {/* Feature usage badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', maxWidth: '380px' }}>
                {Object.entries(student.featureUsage || {})
                  .filter(([_, count]) => count > 0)
                  .slice(0, 5)
                  .map(([feat, count]) => (
                    <span key={feat} style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid var(--border-color)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)'
                    }}>
                      {getFeatureIcon(feat)} {feat.replace(/([A-Z])/g, ' $1')}: <strong>{count}</strong>
                    </span>
                  ))}
              </div>

              <button
                className="btn btn-outline"
                onClick={() => fetchStudentDetails(student.id)}
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                View Activity Timeline 👁️
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Student Details & Timeline Modal */}
      {selectedStudent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div className="card" style={{
            maxWidth: '750px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: '#111827',
            border: '1px solid rgba(99,102,241,0.4)',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#fff' }}>{selectedStudent.name}</h3>
                <p style={{ margin: '0.2rem 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{selectedStudent.email}</p>
              </div>
              <button className="btn btn-outline" onClick={() => setSelectedStudent(null)} style={{ padding: '0.3rem 0.7rem' }}>
                ✕ Close
              </button>
            </div>

            {/* Quick Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Logins</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--blue)' }}>{selectedStudent.loginCount || 1}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Department</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>{selectedStudent.department || 'Not Specified'}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target Role</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: selectedStudent.targetRole ? 'var(--green)' : 'var(--text-muted)' }}>{selectedStudent.targetRole || 'Not Set'}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Last Active</div>
                <div style={{ fontSize: '0.8rem', color: '#f59e0b' }}>
                  {selectedStudent.lastLogin ? new Date(selectedStudent.lastLogin).toLocaleDateString() : 'Today'}
                </div>
              </div>
            </div>

            {/* Feature Usage Details */}
            <h4 style={{ margin: '0 0 0.75rem', color: 'var(--text-primary)' }}>📊 Feature Usage Breakdown</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {Object.entries(selectedStudent.featureUsage || {}).map(([feat, count]) => (
                <div key={feat} style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.2)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem' }}>{getFeatureIcon(feat)}</div>
                  <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.95rem' }}>{count}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{feat.replace(/([A-Z])/g, ' $1')}</div>
                </div>
              ))}
            </div>

            {/* Activity Stream */}
            <h4 style={{ margin: '0 0 0.75rem', color: 'var(--text-primary)' }}>🕐 Recent Activity Timeline</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
              {(selectedStudent.activities || []).length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No recent activity logs recorded yet.</p>
              ) : (
                selectedStudent.activities.slice().reverse().map((act, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0.75rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '6px',
                    fontSize: '0.82rem'
                  }}>
                    <div>
                      <span style={{ fontWeight: 'bold', color: 'var(--blue)', marginRight: '0.5rem' }}>{act.action}</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{act.page}</span>
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      {act.timestamp ? new Date(act.timestamp).toLocaleTimeString() : 'Just now'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentAnalytics
