import React from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'

export default function EligibilityCheck({ job, onClose, onNavigateProfile }) {
  const { user } = useAuth()
  const studentSkills = user?.skills || []

  const jobSkills = job?.skills || ['Python', 'Java', 'SQL', 'AWS']
  const studentExp = user?.experience || 0
  const studentEdu = user?.department || user?.education || 'B.Tech / B.E in CS/IT'

  const hasProfile = user && studentSkills.length > 0

  const matchedSkills = hasProfile
    ? studentSkills.filter(s => jobSkills.some(j => j.toLowerCase() === s.toLowerCase()))
    : []

  const missingSkills = hasProfile
    ? jobSkills.filter(j => !studentSkills.some(s => s.toLowerCase() === j.toLowerCase()))
    : jobSkills

  const matchPercentage = hasProfile
    ? Math.round((matchedSkills.length / Math.max(jobSkills.length, 1)) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        zIndex: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        style={{
          background: '#0f172a',
          border: '2px solid #8b5cf6',
          borderRadius: '1.5rem',
          padding: '2rem',
          maxWidth: '520px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(124,58,237,0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.8rem' }}>📊</span>
            <div>
              <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.2rem', margin: 0 }}>
                Real ATS Eligibility Check
              </h3>
              <span style={{ color: '#c4b5fd', fontSize: '0.8rem' }}>
                {job?.title || job?.role} @ {job?.company}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.4rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {!hasProfile ? (
          <div style={{ background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📚</div>
            <h4 style={{ color: '#fde047', fontWeight: '800', margin: '0 0 0.5rem' }}>
              Complete Profile to Calculate Real Match
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.5, margin: '0 0 1rem' }}>
              You haven't added skills to your profile yet. Add your programming languages, frameworks, and education to see your exact percentage match for {job?.company}.
            </p>
            <button
              onClick={() => {
                onClose()
                if (onNavigateProfile) onNavigateProfile()
              }}
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: 'white',
                border: 'none',
                padding: '0.65rem 1.25rem',
                borderRadius: '0.65rem',
                fontWeight: '800',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Update Profile Skills Now ➔
            </button>
          </div>
        ) : (
          <>
            {/* Match Score Display */}
            <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '1rem', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase' }}>Overall ATS Profile Match</div>
                <div style={{ color: matchPercentage >= 70 ? '#4ade80' : matchPercentage >= 40 ? '#facc15' : '#f87171', fontSize: '2.2rem', fontWeight: '900', margin: '0.2rem 0' }}>
                  {matchPercentage}%
                </div>
                <div style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>
                  {matchPercentage >= 70 ? '✅ Strong Candidate Match!' : '⚠️ Missing key skills required for role'}
                </div>
              </div>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: `conic-gradient(#4ade80 ${matchPercentage * 3.6}deg, rgba(255,255,255,0.1) 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '900', fontSize: '0.85rem' }}>
                  {matchPercentage}%
                </div>
              </div>
            </div>

            {/* Skill Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
              <div style={{ background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.25)', borderRadius: '0.75rem', padding: '0.85rem' }}>
                <div style={{ color: '#34d399', fontWeight: '800', marginBottom: '0.4rem' }}>
                  ✅ Matched Skills ({matchedSkills.length}/{jobSkills.length}):
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {matchedSkills.length > 0 ? (
                    matchedSkills.map(s => (
                      <span key={s} style={{ background: 'rgba(52,211,153,0.2)', color: '#4ade80', padding: '0.2rem 0.5rem', borderRadius: '0.4rem', fontWeight: '700' }}>
                        ✓ {s}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: '#94a3b8' }}>No direct skill overlaps found yet.</span>
                  )}
                </div>
              </div>

              <div style={{ background: 'rgba(248, 113, 113, 0.08)', border: '1px solid rgba(248, 113, 113, 0.25)', borderRadius: '0.75rem', padding: '0.85rem' }}>
                <div style={{ color: '#f87171', fontWeight: '800', marginBottom: '0.4rem' }}>
                  ⚠️ Missing Required Skills ({missingSkills.length}):
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {missingSkills.map(s => (
                    <span key={s} style={{ background: 'rgba(248,113,113,0.15)', color: '#fca5a5', padding: '0.2rem 0.5rem', borderRadius: '0.4rem' }}>
                      + {s}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem', padding: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>💼 Experience: <strong style={{ color: '#4ade80' }}>✅ Match (Fresher Eligible)</strong></span>
                <span>🎓 Education: <strong style={{ color: '#4ade80' }}>✅ {studentEdu.split(' ')[0]} Match</strong></span>
              </div>
            </div>
          </>
        )}

        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            border: 'none',
            padding: '0.65rem',
            borderRadius: '0.65rem',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          Close Match Analysis
        </button>
      </motion.div>
    </motion.div>
  )
}
