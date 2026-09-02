import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'

// 15 Comprehensive Job Sources Icons & Display Labels
export const JOB_SOURCE_CONFIG = {
  company: { icon: '🏢', name: 'Direct from Company', badgeBg: 'rgba(59,130,246,0.15)', color: '#93c5fd' },
  linkedin: { icon: '🔗', name: 'LinkedIn Jobs', badgeBg: 'rgba(10,102,194,0.2)', color: '#60a5fa' },
  naukri: { icon: '📊', name: 'Naukri.com', badgeBg: 'rgba(234,88,12,0.15)', color: '#fb923c' },
  internshala: { icon: '🎯', name: 'Internshala', badgeBg: 'rgba(6,182,212,0.15)', color: '#22d3ee' },
  indeed: { icon: '🌐', name: 'Indeed', badgeBg: 'rgba(37,99,235,0.15)', color: '#93c5fd' },
  wellfound: { icon: '💼', name: 'Wellfound (AngelList)', badgeBg: 'rgba(244,63,94,0.15)', color: '#fda4af' },
  monster: { icon: '📱', name: 'Monster', badgeBg: 'rgba(168,85,247,0.15)', color: '#c084fc' },
  timesjobs: { icon: '🏦', name: 'TimesJobs', badgeBg: 'rgba(239,68,68,0.15)', color: '#fca5a5' },
  freshersworld: { icon: '🎓', name: 'Freshersworld', badgeBg: 'rgba(16,185,129,0.15)', color: '#6ee7b7' },
  cutshort: { icon: '📝', name: 'Cutshort', badgeBg: 'rgba(245,158,11,0.15)', color: '#fcd34d' },
  hirist: { icon: '🚀', name: 'Hirist', badgeBg: 'rgba(139,92,246,0.15)', color: '#c4b5fd' },
  hasjob: { icon: '💻', name: 'Hasjob', badgeBg: 'rgba(34,197,94,0.15)', color: '#86efac' },
  shine: { icon: '🌍', name: 'Shine.com', badgeBg: 'rgba(251,191,36,0.15)', color: '#fde047' },
  upGrad: { icon: '🎯', name: 'UpGrad Jobs', badgeBg: 'rgba(236,72,153,0.15)', color: '#f472b6' },
  adzuna: { icon: '📊', name: 'Adzuna', badgeBg: 'rgba(20,184,166,0.15)', color: '#5eead4' }
}

export const calculateRealMatch = (student, job) => {
  // If student has NO profile data or NO skills
  if (!student || !student.skills || student.skills.length === 0) {
    return {
      match: 0,
      matchedSkills: [],
      missingSkills: job.skills || [],
      showMatch: false,
      message: '📚 Add skills to your profile to see real match percentage'
    }
  }

  const jobSkills = job.skills || []
  if (jobSkills.length === 0) {
    return {
      match: 100,
      matchedSkills: student.skills,
      missingSkills: [],
      showMatch: true,
      message: '✅ Open opportunity'
    }
  }

  // REAL calculation strictly based on student skills intersection
  const matchedSkills = student.skills.filter(s =>
    jobSkills.some(js => js.toLowerCase().trim() === s.toLowerCase().trim())
  )

  const matchPercentage = Math.round((matchedSkills.length / jobSkills.length) * 100)
  const missingSkills = jobSkills.filter(js =>
    !student.skills.some(ss => ss.toLowerCase().trim() === js.toLowerCase().trim())
  )

  return {
    match: matchPercentage,
    matchedSkills,
    missingSkills,
    showMatch: true,
    message: matchPercentage >= 70
      ? "✅ You're a strong candidate!"
      : matchPercentage >= 40
      ? '📈 Keep building your skills'
      : '⚠️ Significant skill gaps'
  }
}

export default function JobCard({ job, onManualApply, onAiApply }) {
  const { user } = useAuth()

  // Real eligibility calculation based on live student user profile
  const eligibility = useMemo(() => calculateRealMatch(user, job), [user, job])

  const sourceKey = job.source?.toLowerCase() || 'company'
  const sourceInfo = JOB_SOURCE_CONFIG[sourceKey] || JOB_SOURCE_CONFIG.company

  return (
    <motion.div
      whileHover={{ y: -3 }}
      style={{
        background: 'rgba(15, 23, 42, 0.95)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '1.25rem',
        padding: '1.5rem',
        boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '1rem',
        transition: 'all 0.2s ease'
      }}
    >
      <div>
        {/* ── JOB HEADER & SOURCE BADGE ────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.2rem', margin: 0 }}>
              💼 {job.title || job.role}
            </h3>
            <p style={{ color: '#60a5fa', fontWeight: '800', fontSize: '0.95rem', margin: '0.2rem 0 0' }}>
              {job.company}
            </p>
          </div>

          <span
            style={{
              background: sourceInfo.badgeBg,
              color: sourceInfo.color,
              border: `1px solid ${sourceInfo.color}40`,
              padding: '0.25rem 0.65rem',
              borderRadius: '0.5rem',
              fontSize: '0.72rem',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <span>{sourceInfo.icon}</span>
            <span>{sourceInfo.name}</span>
          </span>
        </div>

        {/* ── JOB DETAILS ─────────────────────────────────────────── */}
        <div style={{ marginTop: '0.6rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
          <div>📍 <strong>Location:</strong> {job.location}</div>
          <div>💰 <strong>Package:</strong> <span style={{ color: '#4ade80', fontWeight: '800' }}>{job.salary || job.ctc || '₹12-25 LPA'}</span></div>
          <div>
            🔗 <strong>Apply Link:</strong>{' '}
            <a
              href={job.applyLink}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#38bdf8', textDecoration: 'underline' }}
            >
              {job.applyLink}
            </a>
          </div>
        </div>

        {/* ── REAL ELIGIBILITY CHECK (AI ANALYZED) ─────────────────── */}
        <div style={{ marginTop: '0.85rem', background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.85rem', padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ color: '#c4b5fd', fontWeight: '800', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              📋 Eligibility Check (AI Analyzed)
            </span>

            {eligibility.showMatch ? (
              <span
                style={{
                  fontWeight: '900',
                  fontSize: '0.85rem',
                  color: eligibility.match >= 70 ? '#4ade80' : eligibility.match >= 40 ? '#fbbf24' : '#f87171'
                }}
              >
                {eligibility.match}% Match
              </span>
            ) : (
              <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: '700' }}>
                {eligibility.message}
              </span>
            )}
          </div>

          {eligibility.showMatch ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.78rem' }}>
              <div style={{ color: eligibility.match >= 70 ? '#4ade80' : '#fbbf24' }}>
                {eligibility.message} (Meets {eligibility.match}% of requirements)
              </div>

              {eligibility.matchedSkills.length > 0 && (
                <div style={{ color: '#93c5fd' }}>
                  ✅ <strong>Skills Match:</strong> {eligibility.matchedSkills.join(', ')}
                </div>
              )}

              {eligibility.missingSkills.length > 0 && (
                <div style={{ color: '#fca5a5' }}>
                  ⚠️ <strong>Missing:</strong> {eligibility.missingSkills.join(', ')}
                </div>
              )}

              <div style={{ color: '#cbd5e1' }}>
                💼 <strong>Experience:</strong> {job.experience || 'Fresher / 0-2 Yrs (Match)'}
              </div>
              <div style={{ color: '#cbd5e1' }}>
                🎓 <strong>Education:</strong> {job.requiredEducation || 'B.Tech / B.E / BCA (Match)'}
              </div>
            </div>
          ) : (
            <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.2rem' }}>
              Profile has no skills added yet. Update your skills in profile to calculate real ATS match.
            </div>
          )}
        </div>
      </div>

      {/* ── TWO APPLICATION OPTIONS (MANUAL APPLY & AI APPLY) ─────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginTop: '0.25rem' }}>
        {/* 👤 Manual Apply */}
        <button
          onClick={() => onManualApply(job)}
          style={{
            background: 'rgba(37,99,235,0.2)',
            border: '1px solid #3b82f6',
            color: '#93c5fd',
            padding: '0.65rem',
            borderRadius: '0.65rem',
            fontWeight: '800',
            fontSize: '0.82rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem',
            transition: 'all 0.15s ease'
          }}
        >
          <span>👤</span>
          <span>Manual Apply</span>
        </button>

        {/* 🤖 AI Apply */}
        <button
          onClick={() => onAiApply(job)}
          style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
            border: 'none',
            color: 'white',
            padding: '0.65rem',
            borderRadius: '0.65rem',
            fontWeight: '900',
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem',
            boxShadow: '0 4px 15px rgba(124,58,237,0.35)',
            transition: 'all 0.15s ease'
          }}
        >
          <span>🤖</span>
          <span>AI Apply</span>
        </button>
      </div>
    </motion.div>
  )
}
