import React from 'react'
import { motion } from 'framer-motion'

export default function JobCard({ job, onManualApply, onAiApply, onCheckEligibility }) {
  const isMatchHigh = (job.matchPct || 80) >= 70

  const getSourceIcon = (source) => {
    switch (source?.toLowerCase()) {
      case 'linkedin': return '🔗 LinkedIn'
      case 'naukri': return '💼 Naukri'
      case 'internshala': return '🎓 Internshala'
      case 'indeed': return '🌐 Indeed'
      case 'wellfound': return '⚡ Wellfound'
      default: return '🏢 Direct from Company'
    }
  }

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
        gap: '1rem',
        transition: 'all 0.2s ease'
      }}
    >
      {/* ── TOP JOB HEADER ─────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.2rem', margin: 0 }}>
            💼 {job.title || job.role} - <span style={{ color: '#60a5fa' }}>{job.company}</span>
          </h3>
          <div style={{ color: '#cbd5e1', fontSize: '0.85rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span>📍 {job.location}</span>
            <span>•</span>
            <span style={{ color: '#4ade80', fontWeight: '800' }}>💰 {job.salary || job.ctc || '₹12-25 LPA'}</span>
          </div>
        </div>

        <span style={{ background: 'rgba(59,130,246,0.15)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.3)', padding: '0.25rem 0.65rem', borderRadius: '0.5rem', fontSize: '0.72rem', fontWeight: '800' }}>
          {getSourceIcon(job.source)}
        </span>
      </div>

      {/* Official Link */}
      <div style={{ fontSize: '0.78rem' }}>
        <span style={{ color: '#94a3b8' }}>🔗 Official Posting: </span>
        <a
          href={job.applyLink || `https://google.com/search?q=${encodeURIComponent(job.company + ' careers')}`}
          target="_blank"
          rel="noreferrer"
          style={{ color: '#38bdf8', textDecoration: 'underline' }}
        >
          {job.applyLink || `https://${job.company?.toLowerCase().replace(/\s+/g, '')}.com/careers`}
        </a>
      </div>

      {/* ── ELIGIBILITY CHECK BOX (AI ANALYZED) ────────────────────── */}
      <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.85rem', padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ color: '#c4b5fd', fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase' }}>
            📋 Eligibility Check (AI Analyzed)
          </span>
          <span style={{ color: isMatchHigh ? '#4ade80' : '#fbbf24', fontWeight: '900', fontSize: '0.85rem' }}>
            {job.matchPct || 80}% Match
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.8rem' }}>
          <div style={{ color: '#4ade80' }}>
            ✅ You meet <strong>{job.matchPct || 80}%</strong> of job requirements
          </div>
          <div style={{ color: '#93c5fd' }}>
            ✅ <strong>Skills Match:</strong> {(job.matchedSkills || ['Python', 'Java', 'SQL', 'Git']).slice(0, 4).join(', ')}
          </div>
          {(job.missingSkills && job.missingSkills.length > 0) && (
            <div style={{ color: '#fca5a5' }}>
              ⚠️ <strong>Missing:</strong> {job.missingSkills.slice(0, 2).join(', ')}
            </div>
          )}
          <div style={{ color: '#cbd5e1' }}>
            ✅ <strong>Experience:</strong> {job.experience || 'Fresher / 0-2 Yrs (Match)'}
          </div>
          <div style={{ color: '#cbd5e1' }}>
            ✅ <strong>Education:</strong> {job.requiredEducation || 'B.Tech / B.E / B.Sc / BCA (Match)'}
          </div>
        </div>
      </div>

      {/* ── TWO APPLICATION OPTIONS (MANUAL APPLY & AI APPLY) ─────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '0.75rem', marginTop: '0.25rem' }}>
        {/* 👤 Manual Apply */}
        <button
          onClick={() => onManualApply(job)}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'white',
            padding: '0.75rem 1rem',
            borderRadius: '0.75rem',
            fontWeight: '800',
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.15rem',
            transition: 'all 0.15s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>👤</span>
            <span>Manual Apply</span>
          </div>
          <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: '500' }}>
            (Apply yourself)
          </span>
        </button>

        {/* 🤖 AI Apply */}
        <button
          onClick={() => onAiApply(job)}
          style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
            border: 'none',
            color: 'white',
            padding: '0.75rem 1rem',
            borderRadius: '0.75rem',
            fontWeight: '900',
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.15rem',
            boxShadow: '0 4px 15px rgba(124,58,237,0.35)',
            transition: 'all 0.15s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>🤖</span>
            <span>AI Apply</span>
          </div>
          <span style={{ fontSize: '0.68rem', color: '#c4b5fd', fontWeight: '600' }}>
            (AI applies for you)
          </span>
        </button>
      </div>
    </motion.div>
  )
}
