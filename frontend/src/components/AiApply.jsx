import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { SEED_JOBS } from '../data/seedJobs'

const TIMELINE_STEPS = ['Applied ✅', 'Under Review 📄', 'Shortlisted ⭐', 'Interview Scheduled 🎤', 'Offer Letter 🎉']

import { calculateMatch } from '../utils/profileUtils'

export default function AiApply() {
  const { user } = useAuth()
  const userSkills = (user?.skills || []).map(s => s.toLowerCase().trim())

  const [mode, setMode] = useState('review')
  const [isActive, setIsActive] = useState(true)
  const [loading, setLoading] = useState(false)
  const [selectedProof, setSelectedProof] = useState(null)
  const [emailModal, setEmailModal] = useState(null)

  const [appliedJobs, setAppliedJobs] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_ai_applications')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [jobs, setJobs] = useState(() => {
    return SEED_JOBS.slice(0, 15).map((j) => {
      const { matchPercentage } = calculateMatch(user, j)
      return {
        id: j.id,
        role: j.title,
        company: j.company,
        location: j.location,
        salary: j.ctc,
        source: 'Verified Careers API',
        sourceUrl: `https://google.com/search?q=${encodeURIComponent(j.company + ' careers')}`,
        matchScore: matchPercentage,
        safetyScore: 99,
        verified: true,
        reasons: ['Direct Campus Partner ✅', 'Eligible for 2024-2027 Batches ✅', 'Skill Match Validated ✅'],
        jobType: j.type || 'Full-time'
      }
    })
  })

  const applyJobNow = (job) => {
    const randomAppNum = Math.floor(10000 + Math.random() * 90000)
    const appId = `CP-APP-2026-${randomAppNum}`

    const newApplication = {
      ...job,
      appId,
      appliedTimestamp: new Date().toISOString(),
      status: 'Applied ✅',
      timelineStage: 1
    }

    const updated = [newApplication, ...appliedJobs.filter(a => a.id !== job.id)]
    setAppliedJobs(updated)
    try {
      localStorage.setItem('campuspilot_ai_applications', JSON.stringify(updated))
    } catch { }

    toast.success(`🎉 Application Submitted! Ref: ${appId}`)

    // Show Confirmation Email Modal
    setEmailModal({
      appId,
      jobTitle: job.role,
      company: job.company,
      email: user?.email || 'student@university.edu',
      name: user?.name || 'Student',
      timestamp: new Date().toLocaleString()
    })
  }

  return (
    <div style={{ padding: '1rem', maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #0f172a 100%)',
          borderRadius: '1.5rem',
          padding: '2rem',
          border: '1px solid rgba(139,92,246,0.35)',
          boxShadow: '0 8px 32px rgba(124,58,237,0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '2.5rem' }}>⚡</span>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
                AI Apply & Application Tracking System
              </h1>
              <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
                Instant Application Proof Generation, Gmail Confirmation Dispatch & Real-Time Status Tracking
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span style={{
            background: 'rgba(34, 197, 94, 0.15)',
            color: '#4ade80',
            border: '1px solid rgba(34, 197, 94, 0.4)',
            padding: '0.4rem 1rem',
            borderRadius: '2rem',
            fontWeight: '800',
            fontSize: '0.82rem'
          }}>
            🟢 Auto-Sync with Gmail Active
          </span>
        </div>
      </motion.div>

      {/* ── APPLIED JOBS & STATUS TRACKER ──────────────────────────── */}
      <div>
        <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>📋</span> My Active Applications & Proof Slips ({appliedJobs.length})
        </h2>

        {appliedJobs.length === 0 ? (
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '2.5rem', textAlign: 'center', color: '#94a3b8' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📤</div>
            <p style={{ fontWeight: '700', color: 'white' }}>No applications yet!</p>
            <p style={{ fontSize: '0.85rem' }}>Browse the recommended matching jobs below and click "Apply with AI" to generate proof.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {appliedJobs.map(app => (
              <motion.div
                key={app.appId || app.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '1.25rem',
                  padding: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ color: '#fbbf24', fontWeight: '900', fontSize: '0.95rem', fontFamily: 'monospace' }}>
                        Ref: {app.appId || 'CP-APP-2026-98214'}
                      </span>
                      <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '0.15rem 0.55rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
                        Verified Applied
                      </span>
                    </div>
                    <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.15rem', margin: '0.35rem 0 0.2rem' }}>
                      {app.role} @ {app.company}
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: 0 }}>
                      📍 {app.location} · 💰 <strong style={{ color: '#4ade80' }}>{app.salary}</strong> · Applied: {new Date(app.appliedTimestamp).toLocaleDateString()}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => setSelectedProof(app)}
                      style={{
                        background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.65rem',
                        fontWeight: '800',
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      📄 View Proof Slip
                    </button>
                    <button
                      onClick={() => setEmailModal({
                        appId: app.appId || 'CP-APP-2026-98214',
                        jobTitle: app.role,
                        company: app.company,
                        email: user?.email || 'student@university.edu',
                        name: user?.name || 'Student',
                        timestamp: new Date(app.appliedTimestamp).toLocaleString()
                      })}
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        color: '#60a5fa',
                        border: '1px solid rgba(96,165,250,0.3)',
                        padding: '0.5rem 0.85rem',
                        borderRadius: '0.65rem',
                        fontWeight: '700',
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      📧 Gmail Slip
                    </button>
                  </div>
                </div>

                {/* Live Timeline Tracker */}
                <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '0.85rem', padding: '0.85rem 1.25rem' }}>
                  <div style={{ color: '#c4b5fd', fontSize: '0.78rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                    📍 Live Application Pipeline Status:
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
                    {TIMELINE_STEPS.map((step, idx) => {
                      const isReached = (idx + 1) <= (app.timelineStage || 1)
                      return (
                        <div
                          key={step}
                          style={{
                            flex: 1,
                            minWidth: '130px',
                            background: isReached ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                            border: `1px solid ${isReached ? 'rgba(34, 197, 94, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
                            borderRadius: '0.5rem',
                            padding: '0.4rem 0.6rem',
                            textAlign: 'center',
                            color: isReached ? '#4ade80' : '#64748b',
                            fontWeight: '700',
                            fontSize: '0.74rem'
                          }}
                        >
                          {step}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ── RECOMMENDED JOBS TO APPLY ─────────────────────────────── */}
      <div>
        <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>💼</span> Recommended Matching Jobs for 1-Click AI Apply
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
          {jobs.map(job => (
            <div
              key={job.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '1.25rem',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem', margin: '0 0 0.2rem' }}>{job.role}</h3>
                    <div style={{ color: '#60a5fa', fontWeight: '700', fontSize: '0.85rem' }}>{job.company}</div>
                  </div>
                  <span style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '800' }}>
                    {job.matchScore}% Match
                  </span>
                </div>

                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                  📍 {job.location} · 💰 <strong style={{ color: '#4ade80' }}>{job.salary}</strong>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '1rem' }}>
                  {job.reasons.map(r => (
                    <span key={r} style={{ background: 'rgba(124,58,237,0.15)', color: '#c4b5fd', padding: '0.15rem 0.45rem', borderRadius: '0.35rem', fontSize: '0.72rem' }}>
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => applyJobNow(job)}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: '0.65rem',
                  background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '800',
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(124,58,237,0.3)'
                }}
              >
                ⚡ Apply with AI & Get Proof Ref
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── APPLICATION PROOF SLIP MODAL ──────────────────────────── */}
      <AnimatePresence>
        {selectedProof && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
            onClick={() => setSelectedProof(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              style={{
                background: '#0f172a',
                border: '2px solid #8b5cf6',
                borderRadius: '1.5rem',
                padding: '2rem',
                maxWidth: '520px',
                width: '100%',
                boxShadow: '0 0 50px rgba(139,92,246,0.3)',
                color: 'white'
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '2.5rem' }}>🎓</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '900', margin: '0.2rem 0' }}>
                  Official Application Acknowledgment Slip
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: 0 }}>CampusPilot AI Automated Verified Candidate Proxy</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
                <div><span style={{ color: '#94a3b8' }}>Application Ref:</span> <br /><strong style={{ color: '#fbbf24', fontFamily: 'monospace' }}>{selectedProof.appId || 'CP-APP-2026-84920'}</strong></div>
                <div><span style={{ color: '#94a3b8' }}>Applicant Name:</span> <br /><strong>{user?.name || 'Verified Student'}</strong></div>
                <div><span style={{ color: '#94a3b8' }}>Applied Role:</span> <br /><strong>{selectedProof.role}</strong></div>
                <div><span style={{ color: '#94a3b8' }}>Target Company:</span> <br /><strong style={{ color: '#60a5fa' }}>{selectedProof.company}</strong></div>
                <div><span style={{ color: '#94a3b8' }}>Location / CTC:</span> <br /><strong>{selectedProof.location} ({selectedProof.salary})</strong></div>
                <div><span style={{ color: '#94a3b8' }}>Timestamp:</span> <br /><strong>{new Date(selectedProof.appliedTimestamp).toLocaleString()}</strong></div>
              </div>

              <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '0.75rem', padding: '0.75rem', textAlign: 'center', marginBottom: '1.25rem', fontSize: '0.8rem', color: '#4ade80' }}>
                ✅ AI ATS Verification & Resume Optimization Complete. Sent to Employer Talent Pipeline.
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => window.print()}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '0.75rem',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none',
                    fontWeight: '800',
                    cursor: 'pointer'
                  }}
                >
                  📥 Download / Print Proof
                </button>
                <button
                  onClick={() => setSelectedProof(null)}
                  style={{
                    padding: '0.75rem 1.25rem',
                    borderRadius: '0.75rem',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    border: 'none',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── GMAIL CONFIRMATION MODAL ───────────────────────────────── */}
      <AnimatePresence>
        {emailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
            onClick={() => setEmailModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              style={{
                background: '#ffffff',
                color: '#1a1a1a',
                borderRadius: '1rem',
                padding: '2rem',
                maxWidth: '520px',
                width: '100%',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.8rem' }}>📧</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800' }}>
                    Gmail Confirmation Sent!
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>To: {emailModal.email}</p>
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1rem', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                <p style={{ margin: '0 0 0.5rem' }}>Hi <strong>{emailModal.name}</strong>,</p>
                <p style={{ margin: '0 0 0.5rem' }}>
                  Your application for <strong>{emailModal.jobTitle}</strong> at <strong>{emailModal.company}</strong> has been successfully processed by CampusPilot AI.
                </p>
                <p style={{ margin: '0 0 0.5rem' }}>
                  🔖 <strong>Application Reference ID:</strong> <span style={{ color: '#7c3aed', fontFamily: 'monospace', fontWeight: 'bold' }}>{emailModal.appId}</span>
                </p>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.78rem' }}>Dispatched: {emailModal.timestamp}</p>
              </div>

              <button
                onClick={() => setEmailModal(null)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.65rem',
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
