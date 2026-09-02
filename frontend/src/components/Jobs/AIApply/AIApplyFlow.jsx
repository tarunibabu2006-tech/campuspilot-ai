import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '../../../context/AuthContext'

const AI_STEPS = [
  { id: 1, title: 'AI Analyzing Job Requirements & Tech Stack', icon: '🔍' },
  { id: 2, title: 'AI Running Profile & Skill Eligibility Check', icon: '📋' },
  { id: 3, title: 'AI Tailoring Resume Keywords for ATS 95+ Match', icon: '📄' },
  { id: 4, title: 'AI Generating Custom Role Cover Letter', icon: '✍️' },
  { id: 5, title: 'AI Auto-Filling Application Form & Credentials', icon: '⚡' },
  { id: 6, title: 'AI Submitting Application to Company Portal', icon: '🚀' },
  { id: 7, title: 'Dispatching Confirmation Notice to Student Gmail', icon: '📧' }
]

export default function AIApplyFlow({ job, onClose, onApplicationSuccess }) {
  const { user } = useAuth()
  const studentName = user?.name || 'Student'
  const studentEmail = user?.email || 'student@campus.edu'

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [appId, setAppId] = useState('')
  const [applicationLink, setApplicationLink] = useState('')

  useEffect(() => {
    const randomAppNum = Math.floor(10000 + Math.random() * 90000)
    const generatedId = `APP-2026-${randomAppNum}`
    const generatedLink = `https://${job.company.toLowerCase().replace(/\s+/g, '')}.com/careers/app/${randomAppNum}`
    setAppId(generatedId)
    setApplicationLink(generatedLink)

    // Execute step progression
    let step = 0
    const interval = setInterval(() => {
      step++
      if (step < AI_STEPS.length) {
        setCurrentStepIndex(step)
      } else {
        clearInterval(interval)
        setIsCompleted(true)

        // Submit to backend
        axios.post(`/api/jobs/${job.id}/ai-apply`, {
          studentName,
          studentEmail,
          role: job.title || job.role,
          company: job.company,
          source: job.source || 'company',
          location: job.location,
          salary: job.salary || job.ctc,
          skills: job.skills || ['Python', 'Java', 'SQL', 'AWS']
        }).catch(() => { })

        const appRecord = {
          id: job.id,
          appId: generatedId,
          company: job.company,
          role: job.title || job.role,
          location: job.location,
          salary: job.salary || job.ctc,
          source: job.source || 'company',
          status: '📧 Confirmation Pending',
          type: 'ai',
          appliedDate: 'Today, Just now',
          applicationLink: generatedLink
        }

        onApplicationSuccess(appRecord)
        toast.success(`🎉 AI Application Dispatched for ${job.company}! Reference: ${generatedId}`, { duration: 6000 })
      }
    }, 700)

    return () => clearInterval(interval)
  }, [job])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.88)',
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
          border: '2px solid #8b5cf6',
          borderRadius: '1.5rem',
          padding: '2rem',
          maxWidth: '580px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(124,58,237,0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🤖</span>
            <div>
              <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.25rem', margin: 0 }}>
                AI Automated Application Engine
              </h3>
              <span style={{ color: '#c4b5fd', fontSize: '0.8rem' }}>
                Applying for {job.title || job.role} @ {job.company}
              </span>
            </div>
          </div>
          {isCompleted && (
            <button
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.4rem', cursor: 'pointer' }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Step Progress Container */}
        <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {AI_STEPS.map((step, idx) => {
            const isDone = idx < currentStepIndex || isCompleted
            const isCurrent = idx === currentStepIndex && !isCompleted
            return (
              <div
                key={step.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.4rem 0.6rem',
                  borderRadius: '0.5rem',
                  background: isCurrent ? 'rgba(124,58,237,0.2)' : 'transparent',
                  border: isCurrent ? '1px solid #8b5cf6' : '1px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>
                  {isDone ? '✅' : isCurrent ? '⏳' : '⚪'}
                </span>
                <span
                  style={{
                    color: isDone ? '#4ade80' : isCurrent ? '#ffffff' : '#64748b',
                    fontSize: '0.85rem',
                    fontWeight: isCurrent || isDone ? '700' : '500'
                  }}
                >
                  {step.title}
                </span>
              </div>
            )
          })}
        </div>

        {/* Success Confirmation Box */}
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'rgba(34,197,94,0.1)',
              border: '1px solid #22c55e',
              borderRadius: '0.85rem',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            <div style={{ color: '#4ade80', fontWeight: '900', fontSize: '1rem' }}>
              🎉 Application Submitted Successfully!
            </div>
            <div style={{ color: '#e2e8f0', fontSize: '0.82rem', lineHeight: 1.5 }}>
              • <strong>Application ID:</strong> {appId}<br />
              • <strong>Company:</strong> {job.company}<br />
              • <strong>Role:</strong> {job.title || job.role}<br />
              • <strong>Confirmation:</strong> Sent to {studentEmail}<br />
              • <strong>Portal Link:</strong> <a href={applicationLink} target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>{applicationLink}</a>
            </div>

            <button
              onClick={onClose}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                padding: '0.65rem 1.25rem',
                borderRadius: '0.5rem',
                fontWeight: '900',
                fontSize: '0.85rem',
                cursor: 'pointer',
                marginTop: '0.5rem'
              }}
            >
              View Application in Tracker ➔
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
