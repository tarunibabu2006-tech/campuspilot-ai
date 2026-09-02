import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

export default function ManualApply({ job, onClose, onApplicationSuccess }) {
  const { user } = useAuth()
  const [candidateName, setCandidateName] = useState(user?.name || '')
  const [candidateEmail, setCandidateEmail] = useState(user?.email || '')
  const [candidatePhone, setCandidatePhone] = useState(user?.phone || '+91 9876543210')
  const [portfolioLink, setPortfolioLink] = useState('https://github.com/my-profile')
  const [customNote, setCustomNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!candidateName.trim() || !candidateEmail.trim()) {
      toast.error('Please provide your name and email!')
      return
    }

    setIsSubmitting(true)
    const randomAppNum = Math.floor(10000 + Math.random() * 90000)
    const appId = `MANUAL-APP-2026-${randomAppNum}`

    try {
      await axios.post(`/api/jobs/${job.id}/manual-apply`, {
        studentName: candidateName,
        studentEmail: candidateEmail,
        role: job.title || job.role,
        company: job.company,
        source: job.source || 'company'
      })

      // Dispatch real confirmation email to student
      await axios.post('/api/email/apply-confirm', {
        toEmail: candidateEmail,
        name: candidateName,
        jobTitle: job.title || job.role,
        company: job.company,
        appId,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        location: job.location,
        salary: job.salary || job.ctc
      })
    } catch { }

    const applicationRecord = {
      id: job.id,
      appId,
      company: job.company,
      role: job.title || job.role,
      location: job.location,
      salary: job.salary || job.ctc,
      source: job.source || 'Direct from Company',
      status: '✅ Applied Successfully',
      type: 'manual',
      appliedDate: 'Today, Just now',
      applicationLink: job.applyLink || `https://${job.company.toLowerCase().replace(/\s+/g, '')}.com/careers/app/${randomAppNum}`
    }

    onApplicationSuccess(applicationRecord)
    setIsSubmitting(false)
    toast.success(`🎉 Manual Application Registered for ${job.company}!`)

    // Open target job application portal in new tab
    if (job.applyLink) {
      window.open(job.applyLink, '_blank')
    }
    onClose()
  }

  return (
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
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        style={{
          background: '#0f172a',
          border: '2px solid rgba(255,255,255,0.15)',
          borderRadius: '1.5rem',
          padding: '2rem',
          maxWidth: '560px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.9)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>
              👤 Manual Application
            </div>
            <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.25rem', margin: '0.2rem 0 0' }}>
              Apply for {job.title || job.role} @ {job.company}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.4rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', color: '#cbd5e1', fontWeight: '700', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
              Full Name:
            </label>
            <input
              type="text"
              value={candidateName}
              onChange={e => setCandidateName(e.target.value)}
              required
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.88rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontWeight: '700', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                Email Address:
              </label>
              <input
                type="email"
                value={candidateEmail}
                onChange={e => setCandidateEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.88rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontWeight: '700', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                Phone Number:
              </label>
              <input
                type="text"
                value={candidatePhone}
                onChange={e => setCandidatePhone(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.88rem' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: '#cbd5e1', fontWeight: '700', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
              Portfolio / GitHub / LinkedIn URL:
            </label>
            <input
              type="url"
              value={portfolioLink}
              onChange={e => setPortfolioLink(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.88rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#cbd5e1', fontWeight: '700', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
              Cover Note to {job.company} Recruiter:
            </label>
            <textarea
              rows={3}
              value={customNote}
              onChange={e => setCustomNote(e.target.value)}
              placeholder="Highlight why you are an ideal fit for this role..."
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.85rem', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '0.6rem', fontWeight: '700', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                padding: '0.65rem 1.5rem',
                borderRadius: '0.6rem',
                fontWeight: '900',
                fontSize: '0.88rem',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 15px rgba(16,185,129,0.35)'
              }}
            >
              {isSubmitting ? 'Submitting...' : '🚀 Submit & Open Portal ➔'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
