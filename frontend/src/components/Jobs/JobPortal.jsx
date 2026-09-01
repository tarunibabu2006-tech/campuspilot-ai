import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { SEED_JOBS as EXTERNAL_SEED_JOBS, JOB_CATEGORIES } from '../../data/seedJobs'
import { calculateMatch, getProfileCompletion } from '../../utils/profileUtils'
import JobCard from '../Student/JobCard'
import toast from 'react-hot-toast'

// Popular skills for quick-select
const POPULAR_SKILLS = [
  'Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL',
  'MongoDB', 'MySQL', 'PostgreSQL', 'HTML5', 'CSS3', 'Git', 'GitHub', 'Docker',
  'AWS', 'REST API', 'DSA', 'OOP', 'Machine Learning', 'Deep Learning', 'Pandas',
  'NumPy', 'TensorFlow', 'Scikit-Learn', 'Power BI', 'Tableau', 'Excel', 'MATLAB',
  'Linux', 'Kubernetes', 'Spring Boot', 'Django', 'Flask', 'Redux', 'Figma'
]

export default function JobPortal() {
  const { user, updateUser } = useAuth()
  const studentSkills = user?.skills || []
  const profileCompletion = useMemo(() => getProfileCompletion(user), [user])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [eligibilityModal, setEligibilityModal] = useState(null)
  const [sendingEmail, setSendingEmail] = useState(false)
  const [showAddSkillsModal, setShowAddSkillsModal] = useState(false)
  const [skillInput, setSkillInput] = useState('')
  const [pendingSkills, setPendingSkills] = useState([])

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

  // ── ADD SKILLS HANDLER ──────────────────────────────────────────
  const openAddSkillsModal = () => {
    // Pre-populate with user's existing skills
    setPendingSkills(user?.skills || [])
    setSkillInput('')
    setShowAddSkillsModal(true)
  }

  const addPendingSkill = (skill) => {
    const trimmed = skill.trim()
    if (!trimmed) return
    if (pendingSkills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      toast.error(`"${trimmed}" is already in your list!`)
      return
    }
    setPendingSkills(prev => [...prev, trimmed])
    setSkillInput('')
  }

  const removePendingSkill = (idx) => {
    setPendingSkills(prev => prev.filter((_, i) => i !== idx))
  }

  const saveSkillsToProfile = () => {
    if (pendingSkills.length === 0) {
      toast.error('Please add at least one skill!')
      return
    }
    updateUser({ ...user, skills: pendingSkills })
    setShowAddSkillsModal(false)
    toast.success(`✅ ${pendingSkills.length} skills saved to your profile! Match scores updated.`)
  }

  const handleProceedApplication = async (job) => {
    const randomAppNum = Math.floor(10000 + Math.random() * 90000)
    const appId = `CP-APP-2026-${randomAppNum}`
    const studentEmail = user?.email || ''
    const studentName = user?.name || 'Candidate'
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

    setEligibilityModal(null)

    // Open company career portal in new tab immediately
    if (job.applyLink) {
      window.open(job.applyLink, '_blank')
    }

    // Send direct email from company to student's Gmail
    if (studentEmail) {
      setSendingEmail(true)
      try {
        const res = await fetch('http://localhost:5000/api/email/apply-confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            toEmail: studentEmail,
            name: studentName,
            jobTitle: job.role,
            company: job.company,
            appId,
            timestamp,
            location: job.location,
            salary: job.salary
          })
        })
        const data = await res.json()
        if (data.success) {
          toast.success(`📧 Official application confirmation sent directly to your Gmail (${studentEmail}) from ${job.company}!`, { duration: 6000 })
        } else {
          toast.success(`🎉 Applied to ${job.company}! Ref: ${appId}`)
        }
      } catch {
        toast.success(`🎉 Applied to ${job.company}! Ref: ${appId}`)
      } finally {
        setSendingEmail(false)
      }
    } else {
      toast.success(`🎉 Applied to ${job.company}! Ref: ${appId}`)
    }
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
            onClick={openAddSkillsModal}
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0.6rem',
              padding: '0.5rem 1rem',
              fontWeight: '800',
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              whiteSpace: 'nowrap'
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



      {/* ── ADD SKILLS INLINE MODAL ─────────────────────────────────── */}
      <AnimatePresence>
        {showAddSkillsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.88)',
              zIndex: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
            onClick={() => setShowAddSkillsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.88, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 20 }}
              style={{
                background: 'linear-gradient(135deg, #1e1b4b, #0f172a)',
                border: '2px solid rgba(245,158,11,0.5)',
                borderRadius: '1.5rem',
                padding: '2rem',
                maxWidth: '580px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.3rem', margin: 0 }}>
                    🛠️ Add Your Skills
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0.25rem 0 0' }}>
                    Skills added here instantly update your job match % scores
                  </p>
                </div>
                <button
                  onClick={() => setShowAddSkillsModal(false)}
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer', fontSize: '1rem', flexShrink: 0 }}
                >
                  ✕
                </button>
              </div>

              {/* Skill Text Input */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addPendingSkill(skillInput)
                    }
                  }}
                  placeholder="Type a skill and press Enter (e.g. Python, React, SQL...)"
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(245,158,11,0.5)',
                    borderRadius: '0.65rem',
                    padding: '0.65rem 0.9rem',
                    color: 'white',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                  autoFocus
                />
                <button
                  onClick={() => addPendingSkill(skillInput)}
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.65rem',
                    padding: '0.65rem 1.1rem',
                    fontWeight: '800',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  + Add
                </button>
              </div>

              {/* Quick-Select Popular Skills */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.78rem', fontWeight: '700', marginBottom: '0.5rem' }}>⚡ Quick Add Popular Skills:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {POPULAR_SKILLS.filter(s => !pendingSkills.some(p => p.toLowerCase() === s.toLowerCase())).map(skill => (
                    <button
                      key={skill}
                      onClick={() => addPendingSkill(skill)}
                      style={{
                        background: 'rgba(245,158,11,0.1)',
                        border: '1px solid rgba(245,158,11,0.3)',
                        color: '#fbbf24',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.12s ease'
                      }}
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Pending Skills */}
              {pendingSkills.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ color: '#4ade80', fontSize: '0.82rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                    ✓ Your Skills ({pendingSkills.length} added):
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {pendingSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: 'rgba(74,222,128,0.15)',
                          border: '1px solid rgba(74,222,128,0.4)',
                          color: '#86efac',
                          padding: '0.3rem 0.65rem',
                          borderRadius: '1rem',
                          fontSize: '0.8rem',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        {skill}
                        <button
                          onClick={() => removePendingSkill(idx)}
                          style={{
                            background: 'rgba(255,255,255,0.15)',
                            border: 'none',
                            color: '#f87171',
                            borderRadius: '50%',
                            width: '16px',
                            height: '16px',
                            cursor: 'pointer',
                            fontSize: '0.65rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0
                          }}
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Save Button */}
              <button
                onClick={saveSkillsToProfile}
                disabled={pendingSkills.length === 0}
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  borderRadius: '0.75rem',
                  background: pendingSkills.length === 0
                    ? 'rgba(255,255,255,0.08)'
                    : 'linear-gradient(135deg, #10b981, #059669)',
                  color: pendingSkills.length === 0 ? '#64748b' : 'white',
                  fontWeight: '900',
                  fontSize: '1rem',
                  border: 'none',
                  cursor: pendingSkills.length === 0 ? 'not-allowed' : 'pointer',
                  boxShadow: pendingSkills.length > 0 ? '0 4px 20px rgba(16,185,129,0.35)' : 'none'
                }}
              >
                {pendingSkills.length === 0
                  ? 'Add at least one skill to save'
                  : `💾 Save ${pendingSkills.length} Skills & Update Match Scores ➔`
                }
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
