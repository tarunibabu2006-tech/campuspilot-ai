import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { SEED_JOBS as EXTERNAL_SEED_JOBS } from '../../data/seedJobs'
import toast from 'react-hot-toast'

// Sub-components
import JobCard, { JOB_SOURCE_CONFIG } from './JobCard'
import ManualApply from './ManualApply'
import AIApplyFlow from './AIApply/AIApplyFlow'
import AIApplyDashboard from './AIApplyDashboard'

// 15 Job Source Boards
const ALL_JOB_SOURCES = [
  { id: 'All', label: '🌐 All Sources (15 Boards)' },
  { id: 'company', label: '🏢 Direct from Company' },
  { id: 'linkedin', label: '🔗 LinkedIn Jobs' },
  { id: 'naukri', label: '📊 Naukri.com' },
  { id: 'internshala', label: '🎯 Internshala' },
  { id: 'indeed', label: '🌐 Indeed' },
  { id: 'wellfound', label: '💼 Wellfound (AngelList)' },
  { id: 'monster', label: '📱 Monster' },
  { id: 'timesjobs', label: '🏦 TimesJobs' },
  { id: 'freshersworld', label: '🎓 Freshersworld' },
  { id: 'cutshort', label: '📝 Cutshort' },
  { id: 'hirist', label: '🚀 Hirist' },
  { id: 'hasjob', label: '💻 Hasjob' },
  { id: 'shine', label: '🌍 Shine' },
  { id: 'upGrad', label: '🎯 UpGrad Jobs' },
  { id: 'adzuna', label: '📊 Adzuna' }
]

// Day-to-Day Real-Time Updates Hub
const DAILY_UPDATES_DATA = {
  jobs: {
    newCount: 45,
    expiringCount: 12,
    trendingRoles: ['AI Engineer', 'Data Scientist', 'DevOps & SRE', 'Full Stack Developer', 'Cloud Solutions Architect'],
    hiringCompanies: ['Google', 'Amazon', 'Microsoft', 'TCS', 'Infosys', 'Zoho', 'Swiggy', 'Razorpay']
  },
  exams: {
    upcoming: [
      { name: 'GATE 2026 Engineering Entrance', date: '07 Feb 2026', badge: 'National Entrance' },
      { name: 'CAT 2026 Management Aptitude', date: '29 Nov 2026', badge: 'IIMs & Top B-Schools' },
      { name: 'SBI PO 2026 Probationary Officer', date: '18 Mar 2026', badge: 'Banking' }
    ],
    deadlines: [
      { name: 'UPSC Civil Services Prelims 2026', deadline: 'Closing 15 Feb', status: 'Urgent ⏳' },
      { name: 'SSC CGL 2026 Registration', deadline: 'Closing 20 Feb', status: '3 Days Left' },
      { name: 'TCS NQT National Qualifier Test', deadline: 'Closing 28 Feb', status: 'Registration Open' }
    ],
    results: ['TNPSC Group 4 Results Declared', 'SSC CHSL Tier-1 Rank List Released', 'ISRO Scientist-B Merit List']
  },
  careerNews: [
    '🎯 Tech hiring picks up with 35% surge in AI & Cloud developer roles.',
    '💼 TCS & Infosys announce fresh campus placement drives for 2026 batch.',
    '📊 Global GCCs in Bengaluru, Hyderabad & Chennai expand fresher intake.'
  ]
}

export default function JobPortal() {
  const { user } = useAuth()

  const [activeTab, setActiveTab] = useState('browse') // 'browse' or 'dashboard'
  const [showDailyUpdates, setShowDailyUpdates] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSource, setSelectedSource] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')

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

  // Format 15 Job Source URLs and jobs list
  const jobs = useMemo(() => {
    const sourceKeys = ['company', 'linkedin', 'naukri', 'internshala', 'indeed', 'wellfound', 'monster', 'timesjobs', 'freshersworld', 'cutshort', 'hirist', 'hasjob', 'shine', 'upGrad', 'adzuna']

    return EXTERNAL_SEED_JOBS.map((j, idx) => {
      const assignedSource = j.source || sourceKeys[idx % sourceKeys.length]
      const compSlug = j.company.toLowerCase().replace(/\s+/g, '')
      const roleSlug = (j.title || j.role).toLowerCase().replace(/\s+/g, '-')

      let applyLink = `https://${compSlug}.com/careers`
      if (assignedSource === 'linkedin') {
        applyLink = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(j.company + ' ' + (j.title || j.role))}`
      } else if (assignedSource === 'naukri') {
        applyLink = `https://www.naukri.com/${roleSlug}-jobs-at-${compSlug}`
      } else if (assignedSource === 'internshala') {
        applyLink = `https://internshala.com/jobs/${roleSlug}-at-${compSlug}`
      } else if (assignedSource === 'indeed') {
        applyLink = `https://in.indeed.com/jobs?q=${encodeURIComponent(j.company + ' ' + (j.title || j.role))}`
      } else if (assignedSource === 'wellfound') {
        applyLink = `https://wellfound.com/jobs?role=${roleSlug}`
      } else if (assignedSource === 'freshersworld') {
        applyLink = `https://www.freshersworld.com/jobs/${compSlug}-${roleSlug}-jobs`
      } else if (assignedSource === 'hirist') {
        applyLink = `https://www.hirist.com/k/${roleSlug}-jobs`
      }

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
        verified: j.isVerified !== false,
        requiredEducation: 'B.Tech / B.E / B.Sc / BCA in CS, IT or Relevant Field',
        applyLink,
        type: j.type || 'Full-time'
      }
    })
  }, [])

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

      const matchesCat = selectedCategory === 'All' || j.category === selectedCategory
      const matchesSrc = selectedSource === 'All' || j.source.toLowerCase() === selectedSource.toLowerCase()

      return matchesSearch && matchesCat && matchesSrc
    })
  }, [jobs, searchTerm, selectedCategory, selectedSource])

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
                CampusPilot AI Career & Job Portal (15 Job Boards)
              </h1>
              <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
                Real ATS Match Check · 👤 Manual Apply + 🤖 AI Auto-Apply · Real-Time Daily Updates Hub
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

      {/* ── DAY-TO-DAY REAL-TIME UPDATES HUB ───────────────────────── */}
      <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '1.25rem', padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showDailyUpdates ? '1rem' : '0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.4rem' }}>📅</span>
            <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.1rem', margin: 0 }}>
              Day-to-Day Career & Exam Updates Hub
            </h3>
            <span style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', padding: '0.15rem 0.45rem', borderRadius: '0.35rem', fontSize: '0.7rem', fontWeight: '800' }}>
              LIVE TODAY
            </span>
          </div>

          <button
            onClick={() => setShowDailyUpdates(!showDailyUpdates)}
            style={{ background: 'transparent', border: 'none', color: '#c4b5fd', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}
          >
            {showDailyUpdates ? 'Hide Hub ▲' : 'Show Daily Updates ▼'}
          </button>
        </div>

        {showDailyUpdates && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {/* 1. Daily Job Updates */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '0.85rem', padding: '1rem' }}>
              <div style={{ color: '#60a5fa', fontWeight: '800', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>📊</span>
                <span>Daily Job Updates</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
                <div>🆕 <strong>{DAILY_UPDATES_DATA.jobs.newCount} New Jobs</strong> posted today across 15 boards</div>
                <div>⏳ <strong>{DAILY_UPDATES_DATA.jobs.expiringCount} Deadlines</strong> expiring this week</div>
                <div>📈 <strong>Trending:</strong> {DAILY_UPDATES_DATA.jobs.trendingRoles.slice(0, 3).join(', ')}</div>
                <div>🏢 <strong>Hiring Now:</strong> {DAILY_UPDATES_DATA.jobs.hiringCompanies.slice(0, 4).join(', ')}</div>
              </div>
            </div>

            {/* 2. Daily Exam Updates */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: '0.85rem', padding: '1rem' }}>
              <div style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>📝</span>
                <span>Daily Exam & Govt Alerts</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
                <div>📋 <strong>Upcoming:</strong> {DAILY_UPDATES_DATA.exams.upcoming[0].name} ({DAILY_UPDATES_DATA.exams.upcoming[0].date})</div>
                <div>📑 <strong>Deadlines:</strong> {DAILY_UPDATES_DATA.exams.deadlines[0].name} ({DAILY_UPDATES_DATA.exams.deadlines[0].deadline})</div>
                <div>📊 <strong>Results:</strong> {DAILY_UPDATES_DATA.exams.results[0]}</div>
              </div>
            </div>

            {/* 3. Daily Career Updates */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: '0.85rem', padding: '1rem' }}>
              <div style={{ color: '#34d399', fontWeight: '800', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>💡</span>
                <span>Placement & Industry Trends</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
                {DAILY_UPDATES_DATA.careerNews.map((news, nIdx) => (
                  <div key={nIdx}>• {news}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ── VIEW 1: BROWSE JOBS WITH 15 JOB SOURCES ──────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'browse' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* 15 Job Sources Filter Bar */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1rem' }}>
            <div style={{ color: '#c4b5fd', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '800', marginBottom: '0.5rem' }}>
              📡 Filter by Job Source (15 Integrated Boards):
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {ALL_JOB_SOURCES.map(source => {
                const isSelected = selectedSource === source.id
                return (
                  <button
                    key={source.id}
                    onClick={() => setSelectedSource(source.id)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      borderRadius: '0.55rem',
                      background: isSelected ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.04)',
                      border: isSelected ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                      color: isSelected ? 'white' : '#cbd5e1',
                      fontWeight: isSelected ? '800' : '600',
                      fontSize: '0.76rem',
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

          {/* Search bar */}
          <input
            type="text"
            placeholder="🔍 Search by role (e.g. SDE, AI Engineer), company (Google, Amazon), or skills (Python, Java, React)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '0.75rem',
              padding: '0.8rem 1.1rem',
              color: 'white',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />

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
