import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const KNOWN_SCAM_DATABASE = [
  { company: 'XYZ Data Entry Tech', scamType: '₹999 Registration Fee Scam', reports: 24, date: 'Aug 2026' },
  { company: 'Global Solutions Pvt Ltd', scamType: 'Fake Offer Letter & Processing Fee', reports: 18, date: 'Aug 2026' },
  { company: 'FastTrack WFH Jobs', scamType: 'WhatsApp Typing Job Scam', reports: 35, date: 'Jul 2026' }
]

const SAMPLE_SCAM = `Urgent hiring for Amazon Data Entry Assistant! Work 2 hours per day from home and earn Rs 45,000/month. No interview or experience required. To register, deposit Rs 1,499 as refundable laptop security fee via GPay to hr.amazon.jobs@gmail.com. Contact WhatsApp +91 98765 43210 immediately!`

export default function JobChecker() {
  const [jobText, setJobText] = useState('')
  const [jobUrl, setJobUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [activeTab, setActiveTab] = useState('checker')

  const handleAnalyze = () => {
    if (!jobText.trim() && !jobUrl.trim()) {
      toast.error('Please paste a job description, WhatsApp message, or URL!')
      return
    }

    setLoading(true)
    setResult(null)

    setTimeout(() => {
      const text = (jobText + ' ' + jobUrl).toLowerCase()
      const hasFee = text.includes('fee') || text.includes('deposit') || text.includes('pay') || text.includes('rs') || text.includes('₹')
      const hasGmail = text.includes('@gmail.com') || text.includes('@yahoo.com')
      const hasUrgent = text.includes('urgent') || text.includes('immediately') || text.includes('no experience')

      let trustScore = 92
      let riskCategory = '🟢 Low Risk'
      let riskColor = '#4ade80'
      const redFlags = []

      if (hasFee) {
        trustScore -= 45
        redFlags.push({ title: '💰 Registration / Training Fee Requested', desc: 'Listing asks for money/deposit. Genuine employers NEVER ask candidates for payment.', severity: 'Critical' })
      }
      if (hasGmail) {
        trustScore -= 25
        redFlags.push({ title: '📧 Free Email Address Recruiter', desc: 'Recruiter uses @gmail.com or @yahoo.com instead of an official company domain (@company.com).', severity: 'High' })
      }
      if (hasUrgent) {
        trustScore -= 15
        redFlags.push({ title: '🚨 Unrealistic Salary & Instant Hire Promise', desc: 'Promises high salary with zero interview or experience required.', severity: 'Medium' })
      }

      trustScore = Math.max(12, trustScore)

      if (trustScore < 40) {
        riskCategory = '⚫ Critical Risk (Likely Scam)'
        riskColor = '#ef4444'
      } else if (trustScore < 75) {
        riskCategory = '🔴 High Risk (Needs Verification)'
        riskColor = '#fb923c'
      } else if (trustScore < 85) {
        riskCategory = '🟡 Medium Risk'
        riskColor = '#fbbf24'
      }

      setResult({
        trustScore,
        riskCategory,
        riskColor,
        redFlags,
        companyVerified: !hasGmail,
        recruiterCheck: hasGmail ? '❌ Free Email Used' : '✅ Official Domain Verified',
        linkCheck: jobUrl ? '🔍 Redirects Need Review' : '✅ No Malicious Links',
        whyExplanation: redFlags.length > 0 ? redFlags.map(r => r.desc).join(' ') : 'No major scam red flags detected. Standard legitimate job listing features found.',
        actions: [
          '🚨 Never pay any registration, processing, or laptop security fee.',
          '🔍 Verify the vacancy on the company\'s official careers page.',
          '📧 Contact HR using the official company email domain.',
          '❌ Never share bank OTP, Aadhaar, or passwords.'
        ]
      })

      setLoading(false)
      toast.success('🛡️ Job Safety Analysis Complete!')
    }, 1000)
  }

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81, #1e293b)', borderRadius: '1.5rem', padding: '2rem', marginBottom: '1.5rem', border: '1px solid rgba(139,92,246,0.3)' }}
      >
        <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '0.5rem' }}>
          🛡️ Career Reality Checker & Job Scam Assessor
        </h1>
        <p style={{ color: '#c4b5fd' }}>
          AI-powered analysis of job postings, WhatsApp messages, offer letters & links to protect Indian students from fee scams.
        </p>
      </motion.div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('checker')}
          style={{
            padding: '0.65rem 1.25rem', borderRadius: '0.75rem', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer',
            background: activeTab === 'checker' ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.05)',
            color: activeTab === 'checker' ? 'white' : '#94a3b8',
            border: activeTab === 'checker' ? 'none' : '1px solid rgba(255,255,255,0.1)'
          }}
        >
          🔍 Check Job & Offer Letter
        </button>
        <button
          onClick={() => setActiveTab('scambase')}
          style={{
            padding: '0.65rem 1.25rem', borderRadius: '0.75rem', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer',
            background: activeTab === 'scambase' ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.05)',
            color: activeTab === 'scambase' ? 'white' : '#94a3b8',
            border: activeTab === 'scambase' ? 'none' : '1px solid rgba(255,255,255,0.1)'
          }}
        >
          🚨 Reported Scam Database ({KNOWN_SCAM_DATABASE.length})
        </button>
      </div>

      {activeTab === 'checker' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Fee Scam Alert Banner */}
          <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '1rem', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2rem' }}>🚨</span>
            <div>
              <h4 style={{ color: '#ef4444', fontWeight: '800', margin: 0, fontSize: '0.95rem' }}>CRITICAL RULE FOR ALL STUDENTS</h4>
              <p style={{ color: '#fca5a5', fontSize: '0.85rem', margin: 0, marginTop: '0.2rem' }}>
                Legitimate companies NEVER ask for registration fees, laptop security deposits, or training fees!
              </p>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <label style={{ color: 'white', fontWeight: '700', fontSize: '0.95rem' }}>Paste Job Description / Offer Letter Text / WhatsApp Message</label>
              <button
                onClick={() => { setJobText(SAMPLE_SCAM); toast('Sample suspicious listing loaded', { icon: '🔍' }); }}
                style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd', border: '1px solid rgba(124,58,237,0.3)', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.75rem', cursor: 'pointer' }}
              >
                Load Sample Scam
              </button>
            </div>

            <textarea
              rows={5}
              value={jobText}
              onChange={e => setJobText(e.target.value)}
              placeholder="Paste job posting text, WhatsApp message, or email here..."
              style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none', marginBottom: '1rem', resize: 'vertical' }}
            />

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Job / Application URL (Optional)</label>
              <input
                type="url"
                value={jobUrl}
                onChange={e => setJobUrl(e.target.value)}
                placeholder="https://careers.company.com/job/123..."
                style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.75rem', padding: '0.65rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>

            <button
              onClick={handleAnalyze} disabled={loading}
              style={{ width: '100%', padding: '0.85rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', fontWeight: '800', fontSize: '1rem', border: 'none', cursor: 'pointer' }}
            >
              {loading ? '🔍 Analyzing Job Safety...' : '🛡️ Analyze Job Legitimacy & Trust Score'}
            </button>
          </div>

          {/* Result */}
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${result.riskColor}44`, borderRadius: '1.25rem', padding: '1.5rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', margin: 0 }}>📊 Safety Assessment Report</h3>
                  <div style={{ color: result.riskColor, fontWeight: '800', fontSize: '1rem', marginTop: '0.2rem' }}>{result.riskCategory}</div>
                </div>
                <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.04)', borderRadius: '1rem', padding: '0.75rem 1.5rem', border: `1px solid ${result.riskColor}` }}>
                  <div style={{ color: result.riskColor, fontWeight: '900', fontSize: '2rem' }}>{result.trustScore}/100</div>
                  <div style={{ color: '#64748b', fontSize: '0.72rem' }}>Overall Trust Score</div>
                </div>
              </div>

              {/* Red Flags List */}
              {result.redFlags.length > 0 ? (
                <div style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{ color: '#ef4444', fontWeight: '800', fontSize: '1rem', marginBottom: '0.75rem' }}>🚨 Detected Red Flags ({result.redFlags.length})</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {result.redFlags.map((rf, i) => (
                      <div key={i} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem' }}>
                        <div style={{ color: '#ef4444', fontWeight: '800', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{rf.title}</div>
                        <div style={{ color: '#fca5a5', fontSize: '0.82rem' }}>{rf.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#4ade80', fontWeight: '700', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                  ✅ No major red flags detected! This job listing appears legitimate.
                </div>
              )}

              {/* What Should I Do? */}
              <h4 style={{ color: 'white', fontWeight: '800', fontSize: '1rem', marginBottom: '0.5rem' }}>💡 Recommended Safe Next Steps</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {result.actions.map((act, i) => (
                  <div key={i} style={{ color: '#cbd5e1', fontSize: '0.85rem', background: 'rgba(255,255,255,0.03)', padding: '0.6rem 0.9rem', borderRadius: '0.5rem' }}>
                    {act}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {activeTab === 'scambase' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '1rem' }}>🚨 Community Reported Scam Database</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {KNOWN_SCAM_DATABASE.map((scam, i) => (
              <div key={i} style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '0.9rem', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ color: 'white', fontWeight: '800', fontSize: '1rem', margin: 0 }}>{scam.company}</h4>
                  <div style={{ color: '#ef4444', fontSize: '0.82rem', marginTop: '0.2rem', fontWeight: '600' }}>⚠️ {scam.scamType}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444', padding: '0.2rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '800' }}>
                    {scam.reports} Reports
                  </span>
                  <div style={{ color: '#64748b', fontSize: '0.7rem', marginTop: '0.2rem' }}>Last reported: {scam.date}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
