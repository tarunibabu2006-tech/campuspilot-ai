import React, { useState } from 'react'
import { analyzeSkillGap } from '../services/api'
import toast from 'react-hot-toast'

const rolesList = ['Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Data Scientist', 'DevOps Engineer']

function SkillGapAnalyzer({ language }) {
  const [currentSkills, setCurrentSkills] = useState('HTML, CSS, JavaScript')
  const [targetRole, setTargetRole] = useState('Full Stack Developer')
  const [customRole, setCustomRole] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    const role = targetRole === 'Other' ? customRole : targetRole
    if (!currentSkills.trim() || !role) {
      toast.error('Please enter your skills and target role!')
      return
    }

    setLoading(true)
    try {
      const res = await analyzeSkillGap({
        currentSkills: currentSkills.split(',').map(s => s.trim()),
        targetRole: role,
        language
      })
      setResult(res.data)
      toast.success('Skill gap analyzed! 🗺️')
    } catch (err) {
      toast.error('Failed to analyze skill gap')
    }
    setLoading(false)
  }

  return (
    <div className="card">
      <h2 className="card-title">🗺️ Skill Gap Analyzer & Roadmap</h2>
      <p className="card-subtitle">Compare your current skills against your dream job role and get a 3-month personalized learning roadmap!</p>

      <div className="form-group">
        <label className="form-label">Target Role</label>
        <div className="flex flex-wrap gap-1 mb-1">
          {rolesList.map(r => (
            <button
              key={r}
              type="button"
              className={`nav-tab ${targetRole === r ? 'active' : ''}`}
              onClick={() => { setTargetRole(r); setCustomRole('') }}
            >
              {r}
            </button>
          ))}
          <button
            type="button"
            className={`nav-tab ${targetRole === 'Other' ? 'active' : ''}`}
            onClick={() => setTargetRole('Other')}
          >
            ✏️ Other
          </button>
        </div>
      </div>

      {targetRole === 'Other' && (
        <div className="form-group">
          <label className="form-label">Custom Role</label>
          <input
            type="text"
            className="form-input"
            value={customRole}
            onChange={e => setCustomRole(e.target.value)}
            placeholder="e.g., Cloud Architect, AI/ML Engineer"
          />
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Your Current Skills (Comma Separated)</label>
        <input
          type="text"
          className="form-input"
          value={currentSkills}
          onChange={e => setCurrentSkills(e.target.value)}
          placeholder="e.g., HTML, CSS, JavaScript, React, Python"
        />
      </div>

      <button onClick={handleAnalyze} disabled={loading} className="btn btn-primary btn-full">
        {loading ? <><span className="loading-spinner"></span> Analyzing...</> : '🚀 Analyze Skill Gap'}
      </button>

      {result && (
        <div className="result-section">
          <div className="flex justify-between items-center mb-1">
            <h3 className="result-title" style={{ marginBottom: 0 }}>🎯 Role Match: {result.targetRole}</h3>
            <span className="badge badge-info" style={{ fontSize: '0.9rem', padding: '0.4rem 0.8rem' }}>
              {result.matchPercentage || 50}% Match
            </span>
          </div>

          <div className="progress-bar mb-2">
            <div
              className="progress-fill safe"
              style={{ width: `${result.matchPercentage || 50}%` }}
            ></div>
          </div>

          {/* Current vs Missing */}
          <div className="grid-2 mb-2">
            <div style={{ padding: '0.75rem', background: 'rgba(16,185,129,0.1)', borderRadius: 'var(--radius-sm)' }}>
              <p className="text-sm font-bold text-green mb-1">✅ Skills You Have:</p>
              <div className="flex flex-wrap gap-1">
                {result.currentSkills?.map((s, i) => (
                  <span key={i} className="badge badge-safe">{s}</span>
                ))}
              </div>
            </div>

            <div style={{ padding: '0.75rem', background: 'rgba(239,68,68,0.1)', borderRadius: 'var(--radius-sm)' }}>
              <p className="text-sm font-bold text-red mb-1">⚡ Skills To Learn:</p>
              <div className="flex flex-wrap gap-1">
                {result.missingSkills?.map((s, i) => (
                  <span key={i} className="badge badge-danger">
                    {typeof s === 'string' ? s : s.skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 3-Month Roadmap */}
          {result.roadmap?.months && (
            <div className="mb-2">
              <p className="text-sm font-bold mb-1">📅 3-Month Learning Roadmap:</p>
              {result.roadmap.months.map((m, i) => (
                <div key={i} className="result-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div className="flex justify-between items-center style-full" style={{ width: '100%' }}>
                    <span className="badge badge-safe">Month {m.month || i + 1}</span>
                    <span className="text-xs text-muted">{m.focus}</span>
                  </div>
                  {m.topics && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {m.topics.map((t, idx) => (
                        <span key={idx} className="badge badge-info">{t}</span>
                      ))}
                    </div>
                  )}
                  {m.projects && (
                    <p className="text-xs text-muted mt-1">🛠️ Portfolio Project: {m.projects.join(', ')}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Portfolio Suggestions */}
          {result.portfolioSuggestions && (
            <div className="mt-2" style={{ padding: '0.75rem', background: 'rgba(139,92,246,0.1)', borderRadius: 'var(--radius-sm)' }}>
              <p className="text-sm font-bold text-purple">🚀 Portfolio Project Ideas:</p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.3rem' }}>
                {result.portfolioSuggestions.map((proj, i) => (
                  <li key={i} className="text-sm" style={{ marginBottom: '0.2rem' }}>{proj}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SkillGapAnalyzer
