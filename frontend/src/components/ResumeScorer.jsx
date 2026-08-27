import React, { useState } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'
import Autocomplete from './Common/Autocomplete'
import { masterRoles } from '../data/masterData'

const GRADE_COLORS = { 'A+': '#10b981', 'A': '#34d399', 'B+': '#3b82f6', 'B': '#60a5fa', 'C': '#f59e0b', 'D': '#ef4444' }

function ScoreRing({ score }) {
  const circumference = 2 * Math.PI * 45
  const strokeDash = (score / 100) * circumference
  const color = score >= 80 ? '#10b981' : score >= 60 ? '#3b82f6' : score >= 40 ? '#f59e0b' : '#ef4444'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="60" cy="60" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
        <circle cx="60" cy="60" r="45" fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={`${strokeDash} ${circumference}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease' }} />
      </svg>
      <div style={{ marginTop: '-80px', textAlign: 'center' }}>
        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color }}>{score}</div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>/ 100</div>
      </div>
      <div style={{ marginTop: '50px' }} />
    </div>
  )
}

function ResumeScorer() {
  const [resumeText, setResumeText] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyze = async () => {
    if (!resumeText.trim() || resumeText.length < 50) {
      toast.error('Please paste at least 50 characters of your resume!')
      return
    }
    setLoading(true)
    try {
      const r = await api.post('/resume-score/analyze', { resumeText, targetRole })
      setResult(r.data)
      toast.success('Resume analyzed! 📊')
    } catch {
      toast.error('Analysis failed. Try again.')
    }
    setLoading(false)
  }

  const sectionColors = { contact: '#3b82f6', summary: '#8b5cf6', skills: '#10b981', experience: '#f59e0b', education: '#06b6d4', projects: '#ec4899', certifications: '#a78bfa' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Highlighted Header */}
      <div style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #0f172a 100%)',
        border: '1px solid rgba(16,185,129,0.4)',
        borderRadius: '1.5rem',
        padding: '2rem',
        boxShadow: '0 8px 32px rgba(16,185,129,0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>📊</span>
            <div>
              <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '900', color: '#fff', background: 'linear-gradient(135deg, #fff, #a7f3d0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                AI ATS Resume Scorer & Analyzer
              </h1>
              <p style={{ margin: '0.25rem 0 0', color: '#a7f3d0', fontSize: '0.92rem' }}>
                Instant ATS score, section-by-section breakdown, keyword suggestions & improvement tips for Indian placements.
              </p>
            </div>
          </div>
          <span style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', padding: '0.35rem 0.85rem', borderRadius: '0.6rem', fontWeight: '800', fontSize: '0.85rem' }}>
            ATS Engine 2026
          </span>
        </div>
      </div>

      {/* Input */}
      {!result && (
        <div className="card">
          <h3 style={{ marginTop: 0, color: 'var(--text-primary)' }}>📋 Paste Your Resume</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="form-label">Resume Content <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>(paste full text from Word/PDF)</span></label>
              <textarea
                className="form-input"
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
                style={{ height: '220px', resize: 'vertical', fontFamily: 'monospace', fontSize: '0.8rem' }}
                placeholder="Paste your resume text here...&#10;&#10;Name: John Doe&#10;Email: john@email.com&#10;Skills: Python, React, SQL...&#10;Education: B.Tech CSE, VIT Chennai&#10;..."
              />
            </div>
            <div>
              <label className="form-label">🎯 Target Role <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>(optional — for tailored analysis)</span></label>
              <Autocomplete
                value={targetRole}
                onChange={setTargetRole}
                options={masterRoles}
                placeholder="Search target role (Data Scientist, Mechanical Engineer, Product Manager)..."
                icon="🎯"
              />
            </div>
            <button className="btn btn-primary" onClick={analyze} disabled={loading} style={{ width: '100%', padding: '0.85rem' }}>
              {loading ? <span><span className="loading-spinner" /> Analyzing Resume...</span> : '🔍 Score My Resume'}
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <>
          <button className="btn btn-outline" onClick={() => { setResult(null); setResumeText('') }} style={{ alignSelf: 'flex-start' }}>← Analyze Another</button>

          {/* Score Overview */}
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.5rem', alignItems: 'center' }} className="card">
            <ScoreRing score={result.score || 0} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-primary)' }}>Overall Score</h3>
                <span style={{ background: GRADE_COLORS[result.grade] || '#6366f1', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>{result.grade}</span>
              </div>
              <p style={{ color: 'var(--text-muted)', margin: '0 0 0.5rem', fontSize: '0.9rem' }}>{result.overallFeedback}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>ATS Compatibility:</span>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: '8px', height: '6px', maxWidth: '200px' }}>
                  <div style={{ width: `${result.atsCompatibility || 0}%`, background: '#3b82f6', height: '100%', borderRadius: '8px', transition: 'width 1s ease' }} />
                </div>
                <span style={{ color: '#3b82f6', fontSize: '0.8rem', fontWeight: 'bold' }}>{result.atsCompatibility}%</span>
              </div>
            </div>
          </div>

          {/* Section Scores */}
          {result.sections && (
            <div className="card">
              <h3 style={{ marginTop: 0 }}>📊 Section Breakdown</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {Object.entries(result.sections).map(([section, score]) => {
                  const max = { contact: 10, summary: 10, skills: 20, experience: 20, education: 20, projects: 15, certifications: 5 }[section] || 10
                  const pct = (score / max) * 100
                  const color = sectionColors[section] || '#6366f1'
                  return (
                    <div key={section} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem', width: '100px', textTransform: 'capitalize' }}>{section}</span>
                      <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: '8px', height: '8px' }}>
                        <div style={{ width: `${pct}%`, background: color, height: '100%', borderRadius: '8px', transition: 'width 1s ease' }} />
                      </div>
                      <span style={{ color, fontSize: '0.82rem', fontWeight: 'bold', width: '50px', textAlign: 'right' }}>{score}/{max}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {/* Strengths */}
            {result.strengths?.length > 0 && (
              <div className="card" style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <h3 style={{ marginTop: 0, color: 'var(--green)' }}>✅ Strengths</h3>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  {result.strengths.map((s, i) => <li key={i} style={{ marginBottom: '0.35rem' }}>{s}</li>)}
                </ul>
              </div>
            )}

            {/* Quick Wins */}
            {result.quickWins?.length > 0 && (
              <div className="card" style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <h3 style={{ marginTop: 0, color: '#f59e0b' }}>⚡ Quick Wins</h3>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  {result.quickWins.map((s, i) => <li key={i} style={{ marginBottom: '0.35rem' }}>{s}</li>)}
                </ul>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {result.suggestions?.length > 0 && (
            <div className="card">
              <h3 style={{ marginTop: 0, color: '#3b82f6' }}>💡 Improvement Suggestions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {result.suggestions.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '10px' }}>
                    <span style={{ color: '#3b82f6', fontWeight: 'bold', flexShrink: 0 }}>{i + 1}.</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Missing Keywords */}
          {result.keywordsMissing?.length > 0 && (
            <div className="card">
              <h3 style={{ marginTop: 0, color: 'var(--danger)' }}>🔑 Missing ATS Keywords</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {result.keywordsMissing.map((k, i) => (
                  <span key={i} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', padding: '0.3rem 0.7rem', borderRadius: '20px', fontSize: '0.8rem' }}>{k}</span>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ResumeScorer
