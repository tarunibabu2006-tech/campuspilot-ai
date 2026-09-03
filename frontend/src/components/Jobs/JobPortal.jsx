import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { SEED_JOBS as EXTERNAL_SEED_JOBS } from '../../data/seedJobs'
import toast from 'react-hot-toast'

// Sub-components
import JobCard from './JobCard'
import JobFilters from './JobFilters'
import ManualApply from './ManualApply'
import AIApplyFlow from './AIApply/AIApplyFlow'
import AIApplyDashboard from './AIApplyDashboard'
import EligibilityCheck from './EligibilityCheck'
import JobSources from './JobSources'
import GmailConnect from '../Settings/GmailConnect'
import EmailPreferences from '../Settings/EmailPreferences'

export default function JobPortal() {
  const { user } = useAuth()

  // Navigation Tabs: 'browse' | 'tracker' | 'sources' | 'gmail'
  const [activeTab, setActiveTab] = useState('browse')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSource, setSelectedSource] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedType, setSelectedType] = useState('All')

  // Modals
  const [manualApplyJob, setManualApplyJob] = useState(null)
  const [aiApplyJob, setAiApplyJob] = useState(null)
  const [eligibilityJob, setEligibilityJob] = useState(null)
  const [showGmailModal, setShowGmailModal] = useState(false)

  // Track applied jobs
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
    const sourceKeys = [
      'company', 'linkedin', 'naukri', 'internshala', 'indeed',
      'wellfound', 'monster', 'timesjobs', 'freshersworld', 'cutshort',
      'hirist', 'hasjob', 'shine', 'upGrad', 'adzuna'
    ]

    return EXTERNAL_SEED_JOBS.map((j, idx) => {
      const assignedSource = j.source || sourceKeys[idx % sourceKeys.length]
      const compSlug = j.company.toLowerCase().replace(/\s+/g, '')
      const roleSlug = (j.title || j.role).toLowerCase().replace(/\s+/g, '-')
      const roleText = j.title || j.role
      const compText = j.company

      let applyLink = `https://${compSlug}.com/careers`

      if (assignedSource === 'linkedin') {
        applyLink = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(compText + ' ' + roleText)}&location=India`
      } else if (assignedSource === 'naukri') {
        applyLink = `https://www.naukri.com/${encodeURIComponent(roleSlug)}-jobs?k=${encodeURIComponent(compText + ' ' + roleText)}`
      } else if (assignedSource === 'internshala') {
        applyLink = `https://internshala.com/jobs/keywords-${encodeURIComponent(roleSlug)}/`
      } else if (assignedSource === 'indeed') {
        applyLink = `https://in.indeed.com/jobs?q=${encodeURIComponent(compText + ' ' + roleText)}&l=India`
      } else if (assignedSource === 'wellfound') {
        applyLink = `https://wellfound.com/jobs?role=${encodeURIComponent(roleText)}`
      } else if (assignedSource === 'monster') {
        applyLink = `https://www.foundit.in/srp/results?query=${encodeURIComponent(compText + ' ' + roleText)}`
      } else if (assignedSource === 'timesjobs') {
        applyLink = `https://www.timesjobs.com/candidate/job-search.html?searchType=personalizedSearch&from=submit&txtKeywords=${encodeURIComponent(compText + ' ' + roleText)}`
      } else if (assignedSource === 'freshersworld') {
        applyLink = `https://www.freshersworld.com/jobs/jobsearch/${encodeURIComponent(roleSlug)}-jobs`
      } else if (assignedSource === 'cutshort') {
        applyLink = `https://cutshort.io/jobs?search=${encodeURIComponent(roleText)}`
      } else if (assignedSource === 'hirist') {
        applyLink = `https://www.hirist.tech/search?q=${encodeURIComponent(compText + ' ' + roleText)}`
      } else if (assignedSource === 'hasjob') {
        applyLink = `https://hasjob.co/search?q=${encodeURIComponent(roleText)}`
      } else if (assignedSource === 'shine') {
        applyLink = `https://www.shine.com/job-search/${encodeURIComponent(roleSlug)}-jobs?q=${encodeURIComponent(compText + ' ' + roleText)}`
      } else if (assignedSource === 'upGrad') {
        applyLink = `https://www.upgrad.com/jobs/?search=${encodeURIComponent(roleText)}`
      } else if (assignedSource === 'adzuna') {
        applyLink = `https://www.adzuna.in/search?q=${encodeURIComponent(compText + ' ' + roleText)}`
      } else {
        const cLower = compText.toLowerCase()
        if (cLower.includes('google')) applyLink = `https://www.google.com/about/careers/applications/jobs/results/?q=${encodeURIComponent(roleText)}`
        else if (cLower.includes('amazon')) applyLink = `https://www.amazon.jobs/en/search?base_query=${encodeURIComponent(roleText)}&loc_query=India`
        else if (cLower.includes('tcs')) applyLink = `https://www.tcs.com/careers/india`
        else if (cLower.includes('infosys')) applyLink = `https://www.infosys.com/careers/apply.html`
        else if (cLower.includes('zoho')) applyLink = `https://www.zoho.com/careers/jobdetails/`
        else if (cLower.includes('flipkart')) applyLink = `https://www.flipkartcareers.com/#!/`
        else applyLink = `https://${compSlug}.com/careers`
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

  // Filter jobs by search, category, source, type
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
      const matchesType = selectedType === 'All' || j.type === selectedType
      const matchesSrc = selectedSource === 'all' || j.source === selectedSource

      return matchesSearch && matchesCat && matchesType && matchesSrc
    })
  }, [jobs, searchTerm, selectedCategory, selectedType, selectedSource])

  const handleApplicationSuccess = (newApp) => {
    const updated = [newApp, ...appliedJobsList]
    setAppliedJobsList(updated)
    try {
      localStorage.setItem('campuspilot_applied_jobs_master', JSON.stringify(updated))
    } catch { }
  }

  return (
    <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* ── TOP NAVIGATION TABS BAR ───────────────────────────────── */}
      <div style={{
        display: 'flex',
        background: 'rgba(15,23,42,0.95)',
        padding: '0.4rem',
        borderRadius: '1.25rem',
        border: '1px solid rgba(139,92,246,0.3)',
        gap: '0.5rem',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveTab('browse')}
          style={{
            flex: 1,
            minWidth: '200px',
            padding: '0.75rem 1.1rem',
            borderRadius: '0.85rem',
            background: activeTab === 'browse' ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'transparent',
            color: activeTab === 'browse' ? 'white' : '#94a3b8',
            border: 'none',
            fontWeight: '900',
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            transition: 'all 0.15s ease'
          }}
        >
          <span>💼</span>
          <span>Browse Jobs ({filteredJobs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('tracker')}
          style={{
            flex: 1,
            minWidth: '200px',
            padding: '0.75rem 1.1rem',
            borderRadius: '0.85rem',
            background: activeTab === 'tracker' ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'transparent',
            color: activeTab === 'tracker' ? 'white' : '#94a3b8',
            border: 'none',
            fontWeight: '900',
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            transition: 'all 0.15s ease'
          }}
        >
          <span>🤖</span>
          <span>AI Apply Dashboard & Tracker ({appliedJobsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sources')}
          style={{
            flex: 1,
            minWidth: '200px',
            padding: '0.75rem 1.1rem',
            borderRadius: '0.85rem',
            background: activeTab === 'sources' ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'transparent',
            color: activeTab === 'sources' ? 'white' : '#94a3b8',
            border: 'none',
            fontWeight: '900',
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            transition: 'all 0.15s ease'
          }}
        >
          <span>🌐</span>
          <span>15 Job Sources Directory</span>
        </button>

        <button
          onClick={() => setActiveTab('gmail')}
          style={{
            flex: 1,
            minWidth: '200px',
            padding: '0.75rem 1.1rem',
            borderRadius: '0.85rem',
            background: activeTab === 'gmail' ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'transparent',
            color: activeTab === 'gmail' ? 'white' : '#94a3b8',
            border: 'none',
            fontWeight: '900',
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            transition: 'all 0.15s ease'
          }}
        >
          <span>🔐</span>
          <span>Gmail Sync & Settings</span>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ── TAB 1: BROWSE JOBS ───────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'browse' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <JobFilters
            searchTerm={searchTerm}
            setSearchQuery={setSearchTerm}
            selectedSource={selectedSource}
            setSelectedSource={setSelectedSource}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.25rem' }}>
            {filteredJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onManualApply={jobToApply => setManualApplyJob(jobToApply)}
                onAiApply={jobToApply => setAiApplyJob(jobToApply)}
                onCheckEligibility={jobToCheck => setEligibilityJob(jobToCheck)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ── TAB 2: AI APPLY DASHBOARD & TRACKER ──────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'tracker' && (
        <AIApplyDashboard
          onConnectGmailClick={() => setShowGmailModal(true)}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ── TAB 3: 15 JOB SOURCES DIRECTORY ─────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'sources' && (
        <JobSources
          onSelectSource={sourceId => {
            setSelectedSource(sourceId)
            setActiveTab('browse')
          }}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ── TAB 4: GMAIL SYNC & PREFERENCES ──────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'gmail' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
            border: '1px solid rgba(139,92,246,0.3)',
            borderRadius: '1.25rem',
            padding: '1.5rem',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h3 style={{ color: 'white', margin: 0, fontSize: '1.3rem', fontWeight: '900' }}>
                🔐 Gmail OAuth & Automated Verification Setup
              </h3>
              <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: '0.2rem 0 0' }}>
                Connect your student Gmail to automatically verify incoming company confirmation emails.
              </p>
            </div>
            <button
              onClick={() => setShowGmailModal(true)}
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                padding: '0.7rem 1.25rem',
                borderRadius: '0.75rem',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              Configure Gmail Connection ➔
            </button>
          </div>

          <EmailPreferences />
        </div>
      )}

      {/* ── MODALS ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {/* Manual Apply Modal */}
        {manualApplyJob && (
          <ManualApply
            job={manualApplyJob}
            onClose={() => setManualApplyJob(null)}
            onApplicationSuccess={handleApplicationSuccess}
          />
        )}

        {/* AI Apply Flow Modal */}
        {aiApplyJob && (
          <AIApplyFlow
            job={aiApplyJob}
            onClose={() => setAiApplyJob(null)}
            onApplicationSuccess={handleApplicationSuccess}
          />
        )}

        {/* Eligibility Check Modal */}
        {eligibilityJob && (
          <EligibilityCheck
            job={eligibilityJob}
            onClose={() => setEligibilityJob(null)}
          />
        )}

        {/* Gmail OAuth Connect Modal */}
        {showGmailModal && (
          <GmailConnect
            onClose={() => setShowGmailModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
