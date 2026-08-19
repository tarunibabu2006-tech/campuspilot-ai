import React, { useState, useEffect } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'

const STATUS_STYLES = {
  'Applied': { bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.3)', color: '#818cf8' },
  'Shortlisted ✅': { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', color: '#34d399' },
  'Interview Scheduled 🎉': { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', color: '#fbbf24' },
  'inactive': { bg: 'rgba(107,114,128,0.1)', border: 'rgba(107,114,128,0.3)', color: '#9ca3af' },
}

function AiApply() {
  const [preferences, setPreferences] = useState({ roles: '', locations: '', salaryMin: '', salaryMax: '', remote: false })
  const [status, setStatus] = useState(null)
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(false)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    fetchStatus()
    fetchMatches()
  }, [])

  const fetchStatus = async () => {
    try { const r = await api.get('/ai-apply/status'); setStatus(r.data); setIsActive(r.data.status === 'active') } catch {}
  }
  const fetchMatches = async () => {
    try { const r = await api.get('/ai-apply/matches'); setMatches(r.data.matches || []) } catch {}
  }

  const setupProxy = async () => {
    if (!preferences.roles.trim()) { toast.error('Enter at least one target role!'); return }
    setLoading(true)
    try {
      await api.post('/ai-apply/setup', { preferences })
      toast.success('🤖 AI Application Proxy activated!')
      fetchStatus(); fetchMatches(); setIsActive(true)
    } catch { toast.error('Setup failed!') }
    setLoading(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #0d1117 0%, #1a1f35 100%)', border: '1px solid rgba(139,92,246,0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '2.5rem' }}>🤖</span>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.6rem', color: '#fff' }}>AI Application Proxy</h2>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Set preferences → AI applies to matching jobs automatically 24/7</p>
          </div>
          {isActive && <span style={{ marginLeft: 'auto', background: 'rgba(16,185,129,0.2)', border: '1px solid #10b981', color: '#10b981', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 'bold' }}>🟢 ACTIVE</span>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* Preferences Panel */}
        <div className="card">
          <h3 style={{ marginTop: 0, color: 'var(--text-primary)' }}>⚙️ Your Preferences</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label className="form-label">🎯 Target Roles <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>(comma separated)</span></label>
              <input className="form-input" placeholder="Software Developer, Data Analyst, HR Executive..." value={preferences.roles} onChange={e => setPreferences({ ...preferences, roles: e.target.value })} />
            </div>
            <div>
              <label className="form-label">📍 Preferred Locations</label>
              <input className="form-input" placeholder="Chennai, Bangalore, Hyderabad, Remote..." value={preferences.locations} onChange={e => setPreferences({ ...preferences, locations: e.target.value })} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label className="form-label">💰 Min Salary (LPA)</label>
                <input type="number" className="form-input" placeholder="3" value={preferences.salaryMin} onChange={e => setPreferences({ ...preferences, salaryMin: e.target.value })} />
              </div>
              <div>
                <label className="form-label">💰 Max Salary (LPA)</label>
                <input type="number" className="form-input" placeholder="10" value={preferences.salaryMax} onChange={e => setPreferences({ ...preferences, salaryMax: e.target.value })} />
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem' }}>
              <input type="checkbox" checked={preferences.remote} onChange={e => setPreferences({ ...preferences, remote: e.target.checked })} />
              🏠 Remote jobs only
            </label>
            <button className="btn btn-primary" onClick={setupProxy} disabled={loading} style={{ padding: '0.85rem' }}>
              {loading ? <span><span className="loading-spinner" /> Activating...</span> : '🚀 Activate AI Proxy'}
            </button>
          </div>
        </div>

        {/* Status Panel */}
        <div className="card" style={{ background: isActive ? 'rgba(16,185,129,0.03)' : undefined, border: isActive ? '1px solid rgba(16,185,129,0.2)' : undefined }}>
          <h3 style={{ marginTop: 0, color: 'var(--text-primary)' }}>📊 Live Status</h3>
          {status ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {[
                  { label: 'Applications', value: status.applications || 0, color: '#818cf8', icon: '📤' },
                  { label: 'Matches', value: status.matches || 0, color: '#3b82f6', icon: '🎯' },
                  { label: 'Interviews', value: status.interviews || 0, color: '#10b981', icon: '🎉' }
                ].map(s => (
                  <div key={s.label} style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{s.icon}</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(99,102,241,0.05)', borderRadius: '10px', border: '1px solid rgba(99,102,241,0.15)' }}>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.82rem', textAlign: 'center' }}>
                  🤖 AI is scanning job boards, filtering matches, and applying on your behalf 24/7.
                </p>
              </div>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Activate the proxy to start tracking.</p>
          )}
        </div>
      </div>

      {/* Matched Jobs */}
      {matches.length > 0 && (
        <div className="card">
          <h3 style={{ marginTop: 0, color: 'var(--text-primary)' }}>💼 AI Applied Jobs</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {matches.map((job, i) => {
              const style = STATUS_STYLES[job.status] || STATUS_STYLES['Applied']
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '12px', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff', fontSize: '0.7rem' }}>
                      {job.company.slice(0, 3).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '0.9rem' }}>{job.role}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{job.company} · {job.location} · {job.salary}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{job.appliedOn}</span>
                    <span style={{ background: style.bg, border: `1px solid ${style.border}`, color: style.color, padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>{job.status}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default AiApply
