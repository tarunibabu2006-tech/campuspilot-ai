import React, { useState, useEffect } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'
import Autocomplete from './Common/Autocomplete'
import { masterRoles, masterSkills, masterDegrees } from '../data/masterData'

function CareerGps() {
  const [currentSkills, setCurrentSkills] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [experience, setExperience] = useState('0')
  const [education, setEducation] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [roles, setRoles] = useState([])
  const [step, setStep] = useState(1)

  useEffect(() => {
    api.get('/career-gps/roles').then(r => setRoles(r.data.roles || [])).catch(() => { })
  }, [])

  const analyze = async () => {
    if (!currentSkills.trim()) { toast.error('Enter your current skills!'); return }
    if (!targetRole) { toast.error('Select a target role!'); return }
    setLoading(true)
    try {
      const r = await api.post('/career-gps/analyze', {
        currentSkills: currentSkills.split(',').map(s => s.trim()).filter(Boolean),
        targetRole, experience, education
      })
      setResult(r.data)
      setStep(2)
      toast.success('Career roadmap generated! 🗺️')
    } catch {
      toast.error('Analysis failed. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #0d1117 0%, #1a1f35 100%)', border: '1px solid rgba(99,102,241,0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '2.5rem' }}>🗺️</span>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.6rem', color: '#fff' }}>Career GPS</h2>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Enter your skills → Get personalized roadmap to your dream role
            </p>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="card">
          <h3 style={{ color: 'var(--text-primary)', marginTop: 0 }}>📋 Your Profile</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="form-label">🛠️ Current Skills <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>(comma separated)</span></label>
              <Autocomplete
                value={currentSkills}
                onChange={setCurrentSkills}
                options={masterSkills}
                multiSelect={true}
                placeholder="Search & select your skills (Python, SQL, React, AutoCAD)..."
                icon="🛠️"
              />
            </div>
            <div>
              <label className="form-label">🎯 Target Role</label>
              <Autocomplete
                value={targetRole}
                onChange={setTargetRole}
                options={masterRoles.length > 0 ? masterRoles : roles}
                placeholder="Search target role (Full Stack, Mechanical Engineer, Data Scientist)..."
                icon="🎯"
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="form-label">📅 Experience (years)</label>
                <select className="form-input" value={experience} onChange={e => setExperience(e.target.value)}>
                  <option value="0">Student / Fresher</option>
                  <option value="1">1 Year</option>
                  <option value="2">2 Years</option>
                  <option value="3">3+ Years</option>
                </select>
              </div>
              <div>
                <label className="form-label">🎓 Education / Degree</label>
                <Autocomplete
                  value={education}
                  onChange={setEducation}
                  options={masterDegrees}
                  placeholder="Degree (e.g. B.Tech Computer Science)"
                  icon="🎓"
                />
              </div>
            </div>
            <button className="btn btn-primary" onClick={analyze} disabled={loading} style={{ width: '100%', padding: '0.85rem' }}>
              {loading ? <span><span className="loading-spinner" /> Generating Roadmap...</span> : '🚀 Analyze My Career Path'}
            </button>
          </div>
        </div>
      )}

      {step === 2 && result && (
        <>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="btn btn-outline" onClick={() => { setStep(1); setResult(null) }}>← Analyze Again</button>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Results for: <strong style={{ color: 'var(--blue)' }}>{targetRole}</strong></span>
          </div>

          {/* Match Score */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div className="card" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15),rgba(16,185,129,0.05))', border: '1px solid rgba(16,185,129,0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--green)' }}>{result.matchPercentage || 50}%</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Current Match</div>
            </div>
            <div className="card" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15),rgba(99,102,241,0.05))', border: '1px solid rgba(99,102,241,0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--blue)' }}>{result.missingSkills?.length || 0}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Skills to Learn</div>
            </div>
            <div className="card" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15),rgba(245,158,11,0.05))', border: '1px solid rgba(245,158,11,0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b' }}>{result.roadmap?.months?.length || 3}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Month Roadmap</div>
            </div>
          </div>

          {/* Missing Skills */}
          {result.missingSkills?.length > 0 && (
            <div className="card">
              <h3 style={{ marginTop: 0, color: 'var(--danger)' }}>❌ Skills to Acquire</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {result.missingSkills.map((sk, i) => (
                  <span key={i} style={{
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                    color: '#f87171', padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.82rem'
                  }}>
                    {typeof sk === 'object' ? `${sk.skill} (${sk.importance})` : sk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Roadmap */}
          {result.roadmap?.months && (
            <div className="card">
              <h3 style={{ marginTop: 0, color: 'var(--text-primary)' }}>📅 Month-by-Month Roadmap</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {result.roadmap.months.map((month, i) => (
                  <div key={i} style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <span style={{ background: 'var(--blue)', color: '#fff', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem', flexShrink: 0 }}>M{i + 1}</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{month.focus || `Month ${i + 1} Focus`}</strong>
                    </div>
                    {month.topics && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        {month.topics.map((t, j) => (
                          <span key={j} style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: 'var(--blue)', padding: '0.25rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem' }}>{t}</span>
                        ))}
                      </div>
                    )}
                    {month.resources && month.resources.length > 0 && (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>
                        📚 Resources: {Array.isArray(month.resources) ? month.resources.map(r => typeof r === 'object' ? r.name : r).join(', ') : month.resources}
                      </p>
                    )}
                    {month.projects && month.projects.length > 0 && (
                      <p style={{ color: 'var(--green)', fontSize: '0.8rem', margin: '0.25rem 0 0' }}>🛠️ Project: {month.projects[0]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {result.certifications?.length > 0 && (
            <div className="card">
              <h3 style={{ marginTop: 0 }}>🏆 Recommended Certifications</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {result.certifications.map((c, i) => (
                  <span key={i} style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b', padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.82rem' }}>🏅 {c}</span>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default CareerGps
