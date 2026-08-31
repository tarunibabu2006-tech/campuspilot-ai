import React from 'react'
import { motion } from 'framer-motion'
import { calculateMatch, getMatchLevel } from '../../utils/profileUtils'

export default function JobCard({ job, user, onApply, onSave, isSaved }) {
  const { matchPercentage, matchedSkills, missingSkills } = calculateMatch(user, job)
  const matchLevel = getMatchLevel(matchPercentage)
  const studentSkills = user?.skills || []

  // Dynamic badge color & styling
  const getBadgeStyle = () => {
    if (studentSkills.length === 0) {
      return {
        background: 'rgba(148, 163, 184, 0.12)',
        color: '#94a3b8',
        border: '1px solid rgba(148, 163, 184, 0.25)'
      }
    }
    if (matchPercentage >= 70) {
      return {
        background: 'rgba(74, 222, 128, 0.15)',
        color: '#4ade80',
        border: '1px solid rgba(74, 222, 128, 0.4)'
      }
    }
    if (matchPercentage >= 40) {
      return {
        background: 'rgba(251, 191, 36, 0.15)',
        color: '#fbbf24',
        border: '1px solid rgba(251, 191, 36, 0.4)'
      }
    }
    return {
      background: 'rgba(248, 113, 113, 0.15)',
      color: '#f87171',
      border: '1px solid rgba(248, 113, 113, 0.4)'
    }
  }

  const badgeStyle = getBadgeStyle()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="job-card"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '1.25rem',
        padding: '1.35rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
      }}
    >
      <div>
        {/* Card Header: Role & Match Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div>
            <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', margin: '0 0 0.2rem' }}>
              {job.role || job.title}
            </h3>
            <div style={{ color: '#60a5fa', fontWeight: '700', fontSize: '0.85rem' }}>
              {job.company} {job.verified !== false && <span style={{ color: '#4ade80' }}>✓ Verified</span>}
            </div>
          </div>

          <div className="match-badge">
            {studentSkills.length === 0 ? (
              <span
                style={{
                  ...badgeStyle,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '1rem',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  display: 'inline-block',
                  textAlign: 'center'
                }}
              >
                {!user ? 'Complete profile to see match' : 'Add skills to see match'}
              </span>
            ) : (
              <span
                className={`match-${matchLevel}`}
                style={{
                  ...badgeStyle,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '1rem',
                  fontSize: '0.78rem',
                  fontWeight: '800',
                  display: 'inline-block'
                }}
              >
                {matchPercentage}% Match {matchPercentage >= 70 ? '🟢' : matchPercentage >= 40 ? '🟡' : '🔴'}
              </span>
            )}
          </div>
        </div>

        {/* Quick Job Details */}
        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '0.75rem',
            padding: '0.75rem',
            margin: '0.75rem 0',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.4rem',
            fontSize: '0.78rem'
          }}
        >
          <div>
            <span style={{ color: '#64748b' }}>Location:</span> <span style={{ color: 'white' }}>{job.location}</span>
          </div>
          <div>
            <span style={{ color: '#64748b' }}>Package:</span> <span style={{ color: '#4ade80', fontWeight: '700' }}>{job.salary || job.ctc}</span>
          </div>
          <div>
            <span style={{ color: '#64748b' }}>Experience:</span> <span style={{ color: 'white' }}>{job.experience}</span>
          </div>
          <div>
            <span style={{ color: '#64748b' }}>Type:</span> <span style={{ color: '#38bdf8' }}>{job.type || 'Full-time'}</span>
          </div>
        </div>

        {/* Required Skills & Match Indicator */}
        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1rem' }}>
          <div style={{ marginBottom: '0.25rem' }}>
            <strong style={{ color: '#cbd5e1' }}>Required Skills:</strong>{' '}
            {Array.isArray(job.skills) ? job.skills.join(', ') : job.skills}
          </div>
          {studentSkills.length > 0 && matchedSkills.length > 0 && (
            <div style={{ color: '#4ade80', fontSize: '0.72rem', marginTop: '0.3rem' }}>
              ✓ You match: <strong>{matchedSkills.join(', ')}</strong>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onApply({ ...job, matchPercentage, matchedSkills, missingSkills })}
        style={{
          width: '100%',
          padding: '0.7rem',
          borderRadius: '0.65rem',
          background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
          color: 'white',
          border: 'none',
          fontWeight: '800',
          fontSize: '0.85rem',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(124,58,237,0.3)',
          transition: 'transform 0.15s ease'
        }}
      >
        ⚡ Check Eligibility & Apply ➔
      </button>
    </motion.div>
  )
}
