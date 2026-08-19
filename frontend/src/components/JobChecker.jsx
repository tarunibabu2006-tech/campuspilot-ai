import React, { useState } from 'react'
import { checkJob } from '../services/api'
import toast from 'react-hot-toast'

const sampleScam = `Urgent hiring! Work from home online data entry. Earn Rs. 50,000 per month without any experience! Registration fee Rs. 999 mandatory for security deposit. Contact on WhatsApp 9876543210.`

function JobChecker({ language }) {
  const [jobDescription, setJobDescription] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCheck = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please paste a job description!')
      return
    }
    setLoading(true)
    try {
      const res = await checkJob({ jobDescription, language })
      setResult(res.data)
      toast.success('Job posting analyzed! 🛡️')
    } catch (err) {
      toast.error('Failed to check job description')
    }
    setLoading(false)
  }

  const loadSample = () => {
    setJobDescription(sampleScam)
    toast('Sample suspicious job description loaded', { icon: '🔍' })
  }

  return (
    <div className="card">
      <h2 className="card-title">🛡️ Career Reality Checker (Scam Detector)</h2>
      <p className="card-subtitle">Paste any job posting or internship offer to detect red flags, fee scams, and fake promises!</p>

      <div className="form-group">
        <div className="flex justify-between items-center mb-1">
          <label className="form-label" style={{ marginBottom: 0 }}>Job Description / Offer Text</label>
          <button type="button" onClick={loadSample} className="text-xs text-blue" style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            Load Sample Scam
          </button>
        </div>
        <textarea
          className="form-textarea"
          value={jobDescription}
          onChange={e => setJobDescription(e.target.value)}
          placeholder="Paste the job description, WhatsApp message, email, or offer letter here..."
          rows={6}
        />
      </div>

      <button onClick={handleCheck} disabled={loading} className="btn btn-primary btn-full">
        {loading ? <><span className="loading-spinner"></span> Analyzing...</> : '🔍 Check Job Legitimacy'}
      </button>

      {result && (
        <div className="result-section">
          <div className="flex justify-between items-center mb-1">
            <h3 className="result-title" style={{ marginBottom: 0 }}>🛡️ Scam Detection Verdict</h3>
            <span className={`badge badge-${result.status === 'SAFE' ? 'safe' : result.status === 'AVOID' ? 'danger' : 'warning'}`} style={{ fontSize: '0.9rem', padding: '0.4rem 0.8rem' }}>
              {result.status}
            </span>
          </div>

          <div className="stats-grid mt-2">
            <div className="stat-card">
              <div className="stat-value">{result.confidence || 85}%</div>
              <div className="stat-label">AI Confidence</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{result.redFlags?.length || 0}</div>
              <div className="stat-label">Red Flags</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{result.greenFlags?.length || 0}</div>
              <div className="stat-label">Green Flags</div>
            </div>
          </div>

          {result.summary && (
            <div className="mb-2" style={{ padding: '0.75rem', background: 'rgba(59,130,246,0.1)', borderRadius: 'var(--radius-sm)' }}>
              <p className="text-sm">{result.summary}</p>
            </div>
          )}

          {/* Red Flags */}
          {result.redFlags && result.redFlags.length > 0 && (
            <div className="mb-2">
              <p className="text-sm font-bold text-red mb-1">🚨 Red Flags Detected:</p>
              {result.redFlags.map((flag, i) => (
                <div key={i} className="result-item" style={{ borderLeft: '4px solid var(--accent-red)' }}>
                  <p className="text-sm font-bold">⚠️ {flag}</p>
                </div>
              ))}
            </div>
          )}

          {/* Green Flags */}
          {result.greenFlags && result.greenFlags.length > 0 && (
            <div className="mb-2">
              <p className="text-sm font-bold text-green mb-1">✅ Positive Indicators:</p>
              {result.greenFlags.map((flag, i) => (
                <div key={i} className="result-item" style={{ borderLeft: '4px solid var(--accent-green)' }}>
                  <p className="text-sm">✔ {flag}</p>
                </div>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {result.suggestions && (
            <div className="mt-2" style={{ padding: '0.75rem', background: 'rgba(245,158,11,0.1)', borderRadius: 'var(--radius-sm)' }}>
              <p className="text-sm font-bold text-orange">💡 Next Actionable Steps:</p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.3rem' }}>
                {result.suggestions.map((s, i) => (
                  <li key={i} className="text-sm" style={{ marginBottom: '0.2rem' }}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Verification Steps */}
          {result.verificationSteps && (
            <div className="mt-2">
              <p className="text-sm font-bold mb-1">🔍 Standard Verification Checklist:</p>
              <div className="flex flex-wrap gap-1">
                {result.verificationSteps.map((step, i) => (
                  <span key={i} className="badge badge-info">{step}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default JobChecker
