import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import Autocomplete from './Common/Autocomplete'
import { masterRoles, masterLocations } from '../data/masterData'

const MOCK_JOBS = [
  {
    id: 'j1',
    role: 'Junior Software Engineer',
    company: 'Zoho Corporation',
    location: 'Chennai, TN',
    salary: '₹6.5 LPA',
    source: 'Company Careers',
    sourceUrl: 'https://zoho.com/careers',
    matchScore: 94,
    scoreBreakdown: { skills: '95%', experience: '90%', location: '100%', salary: '90%' },
    reasons: ['Python ✅', 'SQL ✅', 'Fresher eligible ✅', 'Location preference matched ✅'],
    safetyScore: 98,
    verified: true,
    status: 'Interview Scheduled 🎤',
    appliedOn: 'Yesterday',
    timelineStage: 4,
    jobType: 'Full-time'
  },
  {
    id: 'j2',
    role: 'Data Analyst Intern',
    company: 'Freshworks',
    location: 'Chennai / Hybrid',
    salary: '₹4.8 LPA',
    source: 'LinkedIn',
    sourceUrl: 'https://linkedin.com/jobs',
    matchScore: 91,
    scoreBreakdown: { skills: '92%', experience: '85%', location: '100%', salary: '88%' },
    reasons: ['Power BI ✅', 'SQL ✅', 'Excel ✅', 'Hybrid location match ✅'],
    safetyScore: 95,
    verified: true,
    status: 'Shortlisted ⭐',
    appliedOn: '2 days ago',
    timelineStage: 3,
    jobType: 'Internship'
  },
  {
    id: 'j3',
    role: 'Associate System Engineer',
    company: 'TCS Digital',
    location: 'Bengaluru, KA',
    salary: '₹7.0 LPA',
    source: 'Naukri',
    sourceUrl: 'https://naukri.com',
    matchScore: 88,
    scoreBreakdown: { skills: '88%', experience: '90%', location: '85%', salary: '90%' },
    reasons: ['Java ✅', 'DBMS ✅', 'NQT qualified candidate ✅'],
    safetyScore: 99,
    verified: true,
    status: 'Resume Viewed 👀',
    appliedOn: '3 days ago',
    timelineStage: 2,
    jobType: 'Full-time'
  }
]

const TIMELINE_STEPS = ['Applied ✅', 'Resume Viewed 👀', 'Shortlisted ⭐', 'Interview Scheduled 🎤', 'Offer 🎉']

export default function AiApply() {
  const [mode, setMode] = useState('review') // 'auto' or 'review'
  const [isActive, setIsActive] = useState(true)
  const [loading, setLoading] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)

  const [rules, setRules] = useState({
    fresherOnly: true,
    internship: true,
    fullTime: true,
    noUnpaid: true,
    minMatch: '80',
    minSalary: '4',
    verifiedOnly: true
  })

  const [preferences, setPreferences] = useState({
    roles: 'Software Developer, Data Analyst',
    locations: 'Chennai, Bengaluru, Remote',
    salaryMin: '4',
    salaryMax: '10',
    remote: false
  })

  const [jobs, setJobs] = useState(MOCK_JOBS)

  const stats = {
    applications: 42,
    matches: 87,
    interviews: 8,
    shortlisted: 12,
    rejected: 15,
    pending: 7,
    successRate: '19%'
  }

  const toggleRule = (key) => setRules(prev => ({ ...prev, [key]: !prev[key] }))

  const handleActivate = () => {
    setLoading(true)
    setTimeout(() => {
      setIsActive(!isActive)
      setLoading(false)
      toast.success(isActive ? 'AI Apply Proxy paused' : '🚀 AI Finds & Prepares Applications 24/7 Activated!')
    }, 600)
  }

  const applyJobNow = (jobId) => {
    toast.success('✨ Tailored resume applied to job successfully!')
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'Applied ✅', timelineStage: 1 } : j))
  }

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81, #1e293b)', borderRadius: '1.5rem', padding: '2rem', marginBottom: '1.5rem', border: '1px solid rgba(124,58,237,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
      >
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            🤖 AI Application System & Job Matching
          </h1>
          <p style={{ color: '#c4b5fd' }}>
            AI finds matching jobs, tailors your resume & prepares applications 24/7 according to your strict rules.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ background: isActive ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.1)', color: isActive ? '#4ade80' : '#94a3b8', border: `1px solid ${isActive ? '#4ade80' : '#94a3b8'}`, padding: '0.4rem 1rem', borderRadius: '2rem', fontWeight: '700', fontSize: '0.85rem' }}>
            {isActive ? '🟢 24/7 SEARCH ACTIVE' : '🔴 PAUSED'}
          </span>
          <button
            onClick={handleActivate} disabled={loading}
            style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: isActive ? 'rgba(239,68,68,0.2)' : 'linear-gradient(135deg, #7c3aed, #2563eb)', color: isActive ? '#ef4444' : 'white', border: isActive ? '1px solid #ef4444' : 'none', fontWeight: '800', cursor: 'pointer' }}
          >
            {isActive ? 'Pause AI Search' : '🚀 Activate 24/7 AI Proxy'}
          </button>
        </div>
      </motion.div>

      {/* Analytics Dashboard Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Applications', value: stats.applications, icon: '📤', color: '#60a5fa' },
          { label: 'Matches Found', value: stats.matches, icon: '🎯', color: '#c084fc' },
          { label: 'Interviews', value: stats.interviews, icon: '🎤', color: '#fbbf24' },
          { label: 'Shortlisted', value: stats.shortlisted, icon: '⭐', color: '#4ade80' },
          { label: 'Pending', value: stats.pending, icon: '⏳', color: '#f472b6' },
          { label: 'Success Rate', value: stats.successRate, icon: '📈', color: '#34d399' }
        ].map(s => (
          <div key={s.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.9rem', padding: '0.9rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{s.icon}</div>
            <div style={{ color: s.color, fontWeight: '900', fontSize: '1.2rem' }}>{s.value}</div>
            <div style={{ color: '#64748b', fontSize: '0.72rem', marginTop: '0.1rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Mode & Application Control Rules */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {/* Mode Selector */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.25rem' }}>
          <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem', marginBottom: '0.75rem' }}>🎯 Application Approval Mode</h3>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
            <button
              onClick={() => setMode('review')}
              style={{
                flex: 1, padding: '0.75rem', borderRadius: '0.75rem', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer',
                background: mode === 'review' ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.05)',
                color: mode === 'review' ? '#fbbf24' : '#94a3b8',
                border: `1px solid ${mode === 'review' ? 'rgba(251,191,36,0.4)' : 'rgba(255,255,255,0.1)'}`
              }}
            >
              🟡 Review Before Apply (Recommended)
            </button>
            <button
              onClick={() => setMode('auto')}
              style={{
                flex: 1, padding: '0.75rem', borderRadius: '0.75rem', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer',
                background: mode === 'auto' ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.05)',
                color: mode === 'auto' ? '#60a5fa' : '#94a3b8',
                border: `1px solid ${mode === 'auto' ? 'rgba(37,99,235,0.4)' : 'rgba(255,255,255,0.1)'}`
              }}
            >
              🔵 Auto-Apply Supported
            </button>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.4 }}>
            {mode === 'review' ? 'AI finds matching jobs, optimizes your resume & alerts you to review before applying.' : 'AI automatically applies to verified matching job listings where direct apply is enabled.'}
          </p>
        </div>

        {/* Application Rules */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.25rem' }}>
          <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem', marginBottom: '0.75rem' }}>🛡️ Strict Application Rules</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {[
              { key: 'fresherOnly', label: 'Fresher Eligible Only' },
              { key: 'internship', label: 'Allow Internships' },
              { key: 'fullTime', label: 'Allow Full-Time' },
              { key: 'noUnpaid', label: 'No Unpaid Jobs' },
              { key: 'verifiedOnly', label: 'Verified Companies Only' }
            ].map(r => (
              <label key={r.key} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#cbd5e1', fontSize: '0.8rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={rules[r.key]} onChange={() => toggleRule(r.key)} />
                {r.label}
              </label>
            ))}
          </div>
          <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.75rem', fontSize: '0.8rem' }}>
            <span style={{ color: '#94a3b8' }}>Min Match: <strong style={{ color: '#c084fc' }}>≥ {rules.minMatch}%</strong></span>
            <span style={{ color: '#94a3b8' }}>Min Salary: <strong style={{ color: '#4ade80' }}>≥ ₹{rules.minSalary} LPA</strong></span>
          </div>
        </div>
      </div>

      {/* Recommended & Applied Jobs Feed */}
      <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.3rem', marginBottom: '1rem' }}>🔥 AI Recommended & Applied Jobs ({jobs.length})</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: 'white', fontSize: '0.8rem' }}>
                  {job.company.slice(0, 3).toUpperCase()}
                </div>
                <div>
                  <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {job.role} {job.verified && <span title="Verified Listing" style={{ color: '#4ade80', fontSize: '0.85rem' }}>🛡️ Verified (Safety: {job.safetyScore}/100)</span>}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{job.company} · {job.location} · <strong style={{ color: '#4ade80' }}>{job.salary}</strong> · {job.jobType}</p>
                </div>
              </div>

              {/* Match Score Badge */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', padding: '0.3rem 0.8rem', borderRadius: '1rem', fontWeight: '800', fontSize: '0.9rem', border: '1px solid rgba(74,222,128,0.3)', display: 'inline-block' }}>
                  {job.matchScore}% Match 🟢
                </div>
                <div style={{ color: '#64748b', fontSize: '0.72rem', marginTop: '0.2rem' }}>Source: {job.source}</div>
              </div>
            </div>

            {/* Why AI Selected This Job? */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '0.75rem 1rem', marginBottom: '1rem' }}>
              <div style={{ color: '#c084fc', fontWeight: '700', fontSize: '0.8rem', marginBottom: '0.3rem' }}>🧠 Why AI Selected This Job?</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {job.reasons.map(r => (
                  <span key={r} style={{ background: 'rgba(192,132,252,0.15)', color: '#c084fc', padding: '0.15rem 0.55rem', borderRadius: '0.4rem', fontSize: '0.75rem' }}>
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {/* Application Timeline Tracker */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.4rem' }}>🔔 Application Timeline Status:</div>
              <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
                {TIMELINE_STEPS.map((step, idx) => (
                  <span key={step} style={{
                    padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.72rem', fontWeight: '700', whiteSpace: 'nowrap',
                    background: idx + 1 <= job.timelineStage ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.05)',
                    color: idx + 1 <= job.timelineStage ? '#4ade80' : '#64748b',
                    border: `1px solid ${idx + 1 <= job.timelineStage ? 'rgba(74,222,128,0.4)' : 'rgba(255,255,255,0.08)'}`
                  }}>
                    {step}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href={job.sourceUrl} target="_blank" rel="noreferrer"
                style={{ padding: '0.5rem 1rem', borderRadius: '0.6rem', background: 'rgba(255,255,255,0.06)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.3)', textDecoration: 'none', fontWeight: '600', fontSize: '0.82rem' }}
              >
                🔗 View Original Job
              </a>
              <button
                onClick={() => applyJobNow(job.id)}
                style={{ padding: '0.5rem 1.25rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', border: 'none', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer' }}
              >
                ✨ Apply with AI Tailored Resume
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
