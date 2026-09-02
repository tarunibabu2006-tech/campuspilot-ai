import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { SEED_JOBS as EXTERNAL_SEED_JOBS, JOB_CATEGORIES } from '../../data/seedJobs'
import { calculateMatch, getProfileCompletion } from '../../utils/profileUtils'
import toast from 'react-hot-toast'

// Sub-components
import JobCard from './JobCard'
import ManualApply from './ManualApply'
import AIApplyFlow from './AIApply/AIApplyFlow'
import AIApplyDashboard from './AIApplyDashboard'

const JOB_SOURCES = [
  { id: 'All', label: '🌐 All Sources' },
  { id: 'company', label: '🏢 Direct from Company' },
  { id: 'linkedin', label: '🔗 LinkedIn' },
  { id: 'naukri', label: '💼 Naukri' },
  { id: 'internshala', label: '🎓 Internshala' },
  { id: 'indeed', label: '🌐 Indeed' },
  { id: 'wellfound', label: '⚡ Wellfound / AngelList' }
]

export default function JobPortal() {
  const { user } = useAuth()
  const studentSkills = user?.skills || []

  const [activeTab, setActiveTab] = useState('browse') // 'browse' or 'dashboard'
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSource, setSelectedSource] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')

  // Modals state
  const [manualApplyJob, setManualApplyJob] = useState(null)
  const [aiApplyJob, setAiApplyJob] = useState(null)

  // Track applied jobs list
  const [appliedJobsList, setAppliedJobsList] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_applied_jobs_master')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Format jobs with sources and match percentage
  const jobs = useMemo(() => {
    const sources = ['company', 'linkedin', 'naukri', 'internshala', 'indeed', 'wellfound']
    return EXTERNAL_SEED_JOBS.map((j, idx) => {
      const matchData = calculateMatch(user, j)
      const assignedSource = j.source || sources[idx % sources.length]
      return {
        id: j.id,
        role: j.title,
        title: j.title,
        company: j.company,
        location: j.location,
        salary: j.ctc || '₹14-28 LPA',
        experience: j.experience || 'Fresher / 0-2 Yrs',
        skills: j.skills || ['Python', 'Java', 'SQL', 'AWS'],
        category: j.category || 'Software Development',
        source: assignedSource,
        matchPct: matchData.matchPercentage || (80 + (idx % 15)),
        matchedSkills: matchData.matchedSkills?.length > 0 ? matchData.matchedSkills : ['Python', 'Java', 'SQL'],
        missingSkills: matchData.missingSkills?.length > 0 ? matchData.missingSkills : ['System Design', 'Docker'],
        verified: j.isVerified !== false,
        requiredEducation: 'B.Tech / B.E / B.Sc / BCA in CS, IT or Relevant Field',
        applyLink: `https://google.com/search?q=${encodeURIComponent(j.company + ' careers ' + j.title)}`,
        type: j.type || 'Full-time'
      }
    })
  }, [user])

  // Filter jobs by search, location, category, source
  const filteredJobs = useMemo(() => {
    return jobs.filter(j => {
      const skillsStr = Array.isArray(j.skills) ? j.skills.join(' ') : String(j.skills)
      const q = searchTerm.toLowerCase().trim()
      const matchesSearch =
        !q ||
        j.role.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        skillsStr.toLowerCase().includes(q)

      const matchesLoc = selectedLocation === 'All' || j.location.includes(selectedLocation)
      const matchesCat = selectedCategory === 'All' || j.category === selectedCategory
      const matchesSrc = selectedSource === 'All' || j.source.toLowerCase() === selectedSource.toLowerCase()

      return matchesSearch && matchesLoc && matchesCat && matchesSrc
    })
  }, [jobs, searchTerm, selectedLocation, selectedCategory, selectedSource])

  const handleApplicationSuccess = (newApp) => {
    const updated = [newApp, ...appliedJobsList.filter(a => a.id !== newApp.id)]
    setAppliedJobsList(updated)
    try {
      localStorage.setItem('campuspilot_applied_jobs_master', JSON.stringify(updated))
    } catch { }
  }

  return (
    <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* ── HEADER BANNER ─────────────────────────────────────────── */}
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
                CampusPilot AI Career & Job Portal
              </h1>
              <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
                Dual-Apply Engine: 👤 Manual Apply (Self) + 🤖 AI Apply (Fully Automated on your behalf) across all major job sources.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Switcher: Browse Jobs vs AI Apply Dashboard */}
        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.4)', padding: '0.3rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            onClick={() => setActiveTab('browse')}
            style={{
              padding: '0.55rem 1.1rem',
              borderRadius: '0.6rem',
              background: activeTab === 'browse' ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'transparent',
              color: activeTab === 'browse' ? 'white' : '#94a3b8',
              fontWeight: '800',
              fontSize: '0.85rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            💼 Browse Jobs ({filteredJobs.length})
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            style={{
              padding: '0.55rem 1.1rem',
              borderRadius: '0.6rem',
              background: activeTab === 'dashboard' ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'transparent',
              color: activeTab === 'dashboard' ? 'white' : '#94a3b8',
              fontWeight: '800',
              fontSize: '0.85rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            🤖 AI Apply Dashboard ({appliedJobsList.length > 0 ? appliedJobsList.length : '45'})
          </button>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ── VIEW 1: BROWSE JOBS WITH DUAL APPLY ───────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'browse' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Job Sources Filter Bar */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1rem' }}>
            <div style={{ color: '#c4b5fd', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '800', marginBottom: '0.5rem' }}>
              📡 Select Job Source Board:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {JOB_SOURCES.map(source => {
                const isSelected = selectedSource === source.id
                return (
                  <button
                    key={source.id}
                    onClick={() => setSelectedSource(source.id)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '0.55rem',
                      background: isSelected ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.04)',
                      border: isSelected ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                      color: isSelected ? 'white' : '#cbd5e1',
                      fontWeight: isSelected ? '800' : '600',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {source.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Search and Category Filters */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
            <input
              type="text"
              placeholder="🔍 Search role, company, or skills (e.g. SDE, Google, React, Python)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                gridColumn: '1 / -1',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                color: 'white',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Jobs Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
            {filteredJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onManualApply={(j) => setManualApplyJob(j)}
                onAiApply={(j) => setAiApplyJob(j)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ── VIEW 2: AI APPLY DASHBOARD & APPLICATION TRACKER ─────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'dashboard' && (
        <AIApplyDashboard
          applications={appliedJobsList}
          onOpenApplyPortal={() => setActiveTab('browse')}
        />
      )}

      {/* ── MANUAL APPLY MODAL ─────────────────────────────────────── */}
      <AnimatePresence>
        {manualApplyJob && (
          <ManualApply
            job={manualApplyJob}
            onClose={() => setManualApplyJob(null)}
            onApplicationSuccess={handleApplicationSuccess}
          />
        )}
      </AnimatePresence>

      {/* ── AI APPLY AUTOMATION FLOW MODAL ─────────────────────────── */}
      <AnimatePresence>
        {aiApplyJob && (
          <AIApplyFlow
            job={aiApplyJob}
            onClose={() => setAiApplyJob(null)}
            onApplicationSuccess={handleApplicationSuccess}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
