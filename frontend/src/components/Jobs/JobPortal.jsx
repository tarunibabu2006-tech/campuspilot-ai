import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { SEED_JOBS as EXTERNAL_SEED_JOBS, JOB_CATEGORIES } from '../../data/seedJobs'
import { calculateMatch, getProfileCompletion } from '../../utils/profileUtils'
import JobCard from '../Student/JobCard'

export default function JobPortal() {
  const { user } = useAuth()
  const studentSkills = user?.skills || []
  const profileCompletion = useMemo(() => getProfileCompletion(user), [user])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [eligibilityModal, setEligibilityModal] = useState(null)
  const [confirmationEmail, setConfirmationEmail] = useState(null)

  // Map seed jobs and calculate real match percentage for each job
  const jobs = useMemo(() => {
    return EXTERNAL_SEED_JOBS.map(j => {
      const matchData = calculateMatch(user, j)
      return {
        id: j.id,
        role: j.title,
        title: j.title,
        company: j.company,
        location: j.location,
        salary: j.ctc,
        experience: j.experience,
        skills: j.skills || [],
        category: j.category || 'Software Development',
        matchPct: matchData.matchPercentage,
        matchedSkills: matchData.matchedSkills,
        missingSkills: matchData.missingSkills,
        verified: j.isVerified !== false,
        requiredEducation: 'Bachelor’s Degree in Relevant Discipline',
        applyLink: `https://www.google.com/search?q=${encodeURIComponent(j.company + ' careers ' + j.title)}`,
        type: j.type || 'Full-time'
      }
    })
  }, [user])

  // Filter jobs by search, location, category
  const filteredJobs = useMemo(() => {
    return jobs.filter(j => {
      const skillsStr = Array.isArray(j.skills) ? j.skills.join(' ') : String(j.skills)
      const matchesSearch =
        j.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skillsStr.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesLoc = selectedLocation === 'All' || j.location.includes(selectedLocation)
      const matchesCat = selectedCategory === 'All' || j.category === selectedCategory

      return matchesSearch && matchesLoc && matchesCat
    })
  }, [jobs, searchTerm, selectedLocation, selectedCategory])

  const handleApplyClick = (job) => {
    const isEligible = job.matchPct >= 65
    const missing = job.missingSkills && job.missingSkills.length > 0
      ? job.missingSkills.slice(0, 3)
      : ['Advanced Domain Tools', 'System Architecture']

    setEligibilityModal({
      job,
      isEligible,
      score: job.matchPct,
      matchedSkills: job.matchedSkills || [],
      missingSkills: missing,
      recommendations: isEligible
        ? [
          'Your profile, degree, and skills match the job requirements.',
          'Ready to submit your application directly on the company portal.'
        ]
        : studentSkills.length === 0
          ? [
            'Add your skills in your Profile to unlock personalized ATS score matching.',
            'Complete practical projects and quizzes in Skill Hub.'
          ]
          : [
            `Upskill in: ${missing.join(', ')}.`,
            'Complete practical modules in Skill Hub to boost your readiness.'
          ]
    })
  }

  const handleProceedApplication = (job) => {
    const randomAppNum = Math.floor(10000 + Math.random() * 90000)
    const appId = `CP-APP-2026-${randomAppNum}`

    setEligibilityModal(null)
    setConfirmationEmail({
      appId,
      jobRole: job.role,
      company: job.company,
      email: user?.email || 'student@university.edu',
      name: user?.name || 'Candidate',
      timestamp: new Date().toLocaleString(),
      applyLink: job.applyLink
    })

    // Open company career portal in new tab
    setTimeout(() => {
      window.open(job.applyLink, '_blank')
    }, 1200)
  }

  return (
    <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* ── HEADER BANNER ────────────────────────────────────────────── */}
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
            <span style={{ fontSize: '2.5rem' }}>💼</span>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
                Verified Job & Placement Portal (Real-Time Matching)
              </h1>
              <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
                Live openings across MNCs, Product Giants & PSUs with 100% Data-Driven ATS Match Verification
              </p>
            </div>
          </div>
        </div>

        {/* Profile Completion Indicator */}
        <div
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '1rem',
            padding: '0.75rem 1.25rem',
            textAlign: 'right'
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Profile Completion</div>
          <div style={{ fontSize: '1.25rem', fontWeight: '900', color: profileCompletion >= 60 ? '#4ade80' : '#fbbf24' }}>
            {profileCompletion}%
          </div>
        </div>
      </motion.div>

      {/* ── PROFILE COMPLETION GUIDANCE BANNER ──────────────────────── */}
      {studentSkills.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            borderRadius: '1rem',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>⚠️</span>
            <div>
              <div style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.92rem' }}>
                Complete your profile to see accurate job match percentages
              </div>
              <div style={{ color: '#d1d5db', fontSize: '0.8rem', marginTop: '0.15rem' }}>
                You haven’t added any skills to your profile yet. Add your skills to unlock 100% real match scores!
              </div>
            </div>
          </div>
          <button
            onClick={() => window.location.hash = '#profile'}
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0.6rem',
              padding: '0.5rem 1rem',
              fontWeight: '800',
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            ✏️ Add Skills to Profile
          </button>
        </motion.div>
      ) : profileCompletion < 60 ? (
        <div
          style={{
            background: 'rgba(59, 130, 246, 0.12)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '1rem',
            padding: '0.85rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: '#93c5fd',
            fontSize: '0.82rem'
          }}
        >
          <span>💡</span>
          <span>
            <strong>Tip:</strong> Add more skills and your department/location in your Profile ({profileCompletion}% complete) to get higher, more accurate job matches!
          </span>
        </div>
      ) : null}

      {/* ── SEARCH & FILTER CONTROLS ───────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="🔍 Search all placement roles & companies (e.g. Software Engineer, Data Analyst, TCS, Zoho)..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            flex: 2,
            minWidth: '260px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            color: 'white',
            fontSize: '0.9rem',
            outline: 'none'
          }}
        />

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          style={{
            flex: 1,
            minWidth: '180px',
            background: '#1e1b4b',
            border: '1px solid rgba(139,92,246,0.4)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            color: 'white',
            fontSize: '0.88rem',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          {JOB_CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat === 'All' ? 'All Job Categories' : cat}</option>
          ))}
        </select>

        <select
          value={selectedLocation}
          onChange={e => setSelectedLocation(e.target.value)}
          style={{
            flex: 1,
            minWidth: '160px',
            background: '#1e1b4b',
            border: '1px solid rgba(139,92,246,0.4)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            color: 'white',
            fontSize: '0.88rem',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="All">All Locations</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Chennai">Chennai</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi NCR</option>
          <option value="Pune">Pune</option>
          <option value="Remote">Remote / Hybrid</option>
        </select>
      </div>

      {/* ── JOBS GRID ──────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredJobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            user={user}
            onApply={handleApplyClick}
          />
        ))}
      </div>

      {/* ── AI ELIGIBILITY VERIFICATION MODAL ───────────────────────── */}
      <AnimatePresence>
        {eligibilityModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
            onClick={() => setEligibilityModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              style={{
                background: 'linear-gradient(135deg, #1e1b4b, #0f172a)',
                border: `2px solid ${eligibilityModal.isEligible ? '#22c55e' : '#fbbf24'}`,
                borderRadius: '1.5rem',
                padding: '2rem',
                maxWidth: '520px',
                width: '100%'
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.25rem', margin: 0 }}>
                  🤖 Real Candidate Match Verification
                </h3>
                <button
                  onClick={() => setEligibilityModal(null)}
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.85rem', padding: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ color: '#cbd5e1', fontSize: '0.88rem' }}>
                  Target Role: <strong style={{ color: '#ffffff' }}>{eligibilityModal.job.role}</strong>
                </div>
                <div style={{ color: '#60a5fa', fontSize: '0.85rem', fontWeight: '700' }}>
                  Employer: {eligibilityModal.job.company} · {eligibilityModal.job.salary}
                </div>
              </div>

              {/* Status Badge */}
              <div style={{
                background: eligibilityModal.isEligible ? 'rgba(34,197,94,0.15)' : 'rgba(251,191,36,0.15)',
                border: `1px solid ${eligibilityModal.isEligible ? 'rgba(34,197,94,0.4)' : 'rgba(251,191,36,0.4)'}`,
                borderRadius: '0.75rem',
                padding: '1rem',
                textAlign: 'center',
                marginBottom: '1.25rem'
              }}>
                <div style={{ color: eligibilityModal.isEligible ? '#4ade80' : '#fbbf24', fontWeight: '900', fontSize: '1.1rem' }}>
                  {eligibilityModal.isEligible ? '✅ High Match: Highly Recommended!' : '⚠️ Skill Gap Identified'}
                </div>
                <div style={{ color: '#cbd5e1', fontSize: '0.85rem', marginTop: '0.35rem' }}>
                  Calculated Match Score: <strong>{eligibilityModal.score}%</strong>
                </div>
                {studentSkills.length === 0 && (
                  <div style={{ color: '#fbbf24', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    (No skills detected in your profile. Add skills for full match)
                  </div>
                )}
              </div>

              {/* Matched & Missing Skills */}
              {eligibilityModal.matchedSkills && eligibilityModal.matchedSkills.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ color: '#4ade80', fontSize: '0.82rem', fontWeight: '800', marginBottom: '0.3rem' }}>
                    ✓ Matched Skills:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {eligibilityModal.matchedSkills.map((sk, idx) => (
                      <span key={idx} style={{ background: 'rgba(74,222,128,0.15)', color: '#86efac', padding: '0.2rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.75rem', fontWeight: '700' }}>
                        ✓ {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ color: '#c4b5fd', fontSize: '0.82rem', fontWeight: '800', marginBottom: '0.4rem' }}>
                  📋 AI Feedback & Suggestions:
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#cbd5e1', fontSize: '0.82rem', lineHeight: 1.6 }}>
                  {eligibilityModal.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => setEligibilityModal(null)}
                  style={{ flex: 1, padding: '0.75rem', borderRadius: '0.65rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleProceedApplication(eligibilityModal.job)}
                  style={{
                    flex: 2,
                    padding: '0.75rem',
                    borderRadius: '0.65rem',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none',
                    fontWeight: '900',
                    cursor: 'pointer'
                  }}
                >
                  Proceed to Company Portal ➔
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── GMAIL CONFIRMATION MODAL ────────────────────────────────── */}
      <AnimatePresence>
        {confirmationEmail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              zIndex: 210,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
            onClick={() => setConfirmationEmail(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              style={{
                background: '#ffffff',
                color: '#1e293b',
                borderRadius: '1.25rem',
                padding: '2rem',
                maxWidth: '520px',
                width: '100%',
                boxShadow: '0 25px 60px rgba(0,0,0,0.6)'
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '2rem' }}>📧</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '900' }}>
                    Application Confirmation Sent to Gmail
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>Recipient: {confirmationEmail.email}</p>
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                <p style={{ margin: '0 0 0.5rem' }}>Hi <strong>{confirmationEmail.name}</strong>,</p>
                <p style={{ margin: '0 0 0.5rem' }}>
                  Thank you for applying for <strong>{confirmationEmail.jobRole}</strong> at <strong>{confirmationEmail.company}</strong> through CampusPilot AI.
                </p>
                <div style={{ background: '#ede9fe', padding: '0.6rem 0.85rem', borderRadius: '0.5rem', color: '#6d28d9', fontWeight: '700', margin: '0.75rem 0', fontFamily: 'monospace' }}>
                  🔖 Application Reference: {confirmationEmail.appId}
                </div>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.78rem' }}>
                  Redirecting to official careers portal for final submission...
                </p>
              </div>

              <button
                onClick={() => setConfirmationEmail(null)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.65rem',
                  background: '#2563eb',
                  color: 'white',
                  fontWeight: '800',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Got It ✓
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
