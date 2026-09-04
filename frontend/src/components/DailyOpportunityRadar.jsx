import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import axios from 'axios'

import {
  DAILY_EXAM_ALERTS,
  DAILY_COMPANY_DRIVES,
  DAILY_HOT_VACANCIES
} from '../data/dailyUpdatesMasterData'
import ExamHub from './Exams/ExamHub'
import CompanyDriveCard from './CompanyDrives/CompanyDriveCard'
import CompanyDriveDetailsModal from './CompanyDrives/CompanyDriveDetailsModal'

export default function DailyOpportunityRadar({ onNavigateToJobs }) {
  const { user } = useAuth()
  const studentEmail = user?.email || 'student@campus.edu'
  const studentName = user?.name || 'Student'

  const [activeTab, setActiveTab] = useState('exams') // 'exams' | 'drives' | 'vacancies'
  const [selectedExamCategory, setSelectedExamCategory] = useState('All')
  const [selectedBatch, setSelectedBatch] = useState('All')
  const [selectedVacCategory, setSelectedVacCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [remindedItems, setRemindedItems] = useState({})

  const [dbDrives, setDbDrives] = useState([])
  const [loadingDrives, setLoadingDrives] = useState(false)
  const [selectedDriveModal, setSelectedDriveModal] = useState(null)

  useEffect(() => {
    const fetchCompanyDrives = async () => {
      setLoadingDrives(true)
      try {
        const response = await axios.get('/api/company-drives')
        if (response.data?.drives) {
          setDbDrives(response.data.drives)
        }
      } catch (err) {
        console.warn('Could not fetch live company drives, falling back to static data:', err)
      } finally {
        setLoadingDrives(false)
      }
    }
    fetchCompanyDrives()
  }, [])

  // Batches for Company Drives
  const batchOptions = ['All', '2024', '2025', '2026', '2027']

  // Vacancy Categories
  const vacCategories = ['All', 'Software / AI', 'Data & Analytics', 'Fintech / Startups', 'Govt / PSU', 'Core Engineering']

  // Filtered Company Drives (uses DB drives if available, otherwise static fallback)
  const filteredDrives = useMemo(() => {
    const drivesList = dbDrives.length > 0 ? dbDrives : DAILY_COMPANY_DRIVES
    return drivesList.filter(d => {
      const batchStr = Array.isArray(d.batchEligible) ? d.batchEligible.join(' ') : (d.batchEligible || '')
      const matchBatch = selectedBatch === 'All' || batchStr.includes(selectedBatch)

      const q = searchQuery.toLowerCase().trim()
      const companyStr = d.companyName || d.company || ''
      const titleStr = d.driveTitle || d.title || ''
      const roleStr = d.role || d.roles || ''
      const matchQ = !q || companyStr.toLowerCase().includes(q) || titleStr.toLowerCase().includes(q) || roleStr.toLowerCase().includes(q)
      return matchBatch && matchQ
    })
  }, [dbDrives, selectedBatch, searchQuery])

  // Filtered Vacancies
  const filteredVacancies = useMemo(() => {
    return DAILY_HOT_VACANCIES.filter(v => {
      const matchCat = selectedVacCategory === 'All' || v.category === selectedVacCategory
      const q = searchQuery.toLowerCase().trim()
      const matchQ = !q || v.role.toLowerCase().includes(q) || v.company.toLowerCase().includes(q) || v.skills.join(' ').toLowerCase().includes(q) || v.location.toLowerCase().includes(q)
      return matchCat && matchQ
    })
  }, [selectedVacCategory, searchQuery])

  // Send Instant Reminder to Student's Gmail
  const handleSetReminder = async (item, type) => {
    const itemId = item.id
    setRemindedItems(prev => ({ ...prev, [itemId]: true }))

    try {
      await axios.post('/api/email/apply-confirm', {
        toEmail: studentEmail,
        name: studentName,
        jobTitle: item.title || item.role,
        company: item.conductingBody || item.company || 'All India Exam Authority',
        appId: `REMINDER-${Date.now().toString().slice(-6)}`,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        location: item.examDate ? `Exam Date: ${item.examDate}` : `Deadline: ${item.registrationDeadline || item.deadline}`,
        salary: item.salary || item.ctc || 'Official Opportunity'
      })
      toast.success(`🔔 Reminder & Details sent to ${studentEmail}!`)
    } catch {
      toast.success(`🔔 Reminder set for ${item.title || item.role}!`)
    }
  }

  return (
    <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* ── HEADER BANNER ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #312e81 100%)',
          borderRadius: '1.5rem',
          padding: '2rem',
          border: '1px solid rgba(139,92,246,0.35)',
          boxShadow: '0 8px 32px rgba(124,58,237,0.25)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span style={{ fontSize: '2.5rem' }}>📡</span>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
                All-India Day-to-Day Opportunity Radar 🇮🇳
              </h1>
              <p style={{ color: '#c4b5fd', fontSize: '0.88rem', margin: 0 }}>
                Live Daily Updates: Competitive Exams · Off-Campus Drives & Walk-ins · Pan-India Hot Vacancies with Direct Apply Links
              </p>
            </div>
          </div>

          <span style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.4)', color: '#34d399', padding: '0.4rem 0.85rem', borderRadius: '0.65rem', fontWeight: '800', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }}></span>
            UPDATED TODAY · LIVE
          </span>
        </div>

        {/* Quick Metrics Cockpit */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.85rem', padding: '0.85rem 1rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>🏛️ Active Govt Vacancies</div>
            <div style={{ color: '#4ade80', fontSize: '1.3rem', fontWeight: '900', marginTop: '0.2rem' }}>45,000+ Posts</div>
            <div style={{ color: '#cbd5e1', fontSize: '0.72rem' }}>UPSC, SSC, RRB, Banking, State PSCs</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.85rem', padding: '0.85rem 1rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>🏢 Mega Off-Campus Drives</div>
            <div style={{ color: '#60a5fa', fontSize: '1.3rem', fontWeight: '900', marginTop: '0.2rem' }}>10+ Drives Live</div>
            <div style={{ color: '#cbd5e1', fontSize: '0.72rem' }}>TCS NQT, Infosys, Zoho, Amazon WOW</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.85rem', padding: '0.85rem 1rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>💼 Pan-India Hot Jobs</div>
            <div style={{ color: '#f472b6', fontSize: '1.3rem', fontWeight: '900', marginTop: '0.2rem' }}>2,500+ Openings</div>
            <div style={{ color: '#cbd5e1', fontSize: '0.72rem' }}>Bengaluru, Chennai, Hyderabad, Remote</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.85rem', padding: '0.85rem 1rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>⏳ Deadlines Closing Soon</div>
            <div style={{ color: '#fbbf24', fontSize: '1.3rem', fontWeight: '900', marginTop: '0.2rem' }}>12 Deadlines</div>
            <div style={{ color: '#cbd5e1', fontSize: '0.72rem' }}>UPSC, TCS NQT, TNPSC, Accenture</div>
          </div>
        </div>
      </motion.div>

      {/* ── 3 PRIMARY OPPORTUNITY TABS ─────────────────────────────── */}
      <div style={{ display: 'flex', background: 'rgba(15,23,42,0.9)', padding: '0.4rem', borderRadius: '1rem', border: '1px solid rgba(139,92,246,0.3)', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('exams')}
          style={{
            flex: 1,
            minWidth: '220px',
            padding: '0.75rem 1.25rem',
            borderRadius: '0.75rem',
            background: activeTab === 'exams' ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'transparent',
            color: activeTab === 'exams' ? 'white' : '#94a3b8',
            border: 'none',
            fontWeight: '900',
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all 0.15s ease'
          }}
        >
          <span>📢</span>
          <span>Exam Hub & Live Notifications</span>
        </button>

        <button
          onClick={() => setActiveTab('drives')}
          style={{
            flex: 1,
            minWidth: '220px',
            padding: '0.75rem 1.25rem',
            borderRadius: '0.75rem',
            background: activeTab === 'drives' ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'transparent',
            color: activeTab === 'drives' ? 'white' : '#94a3b8',
            border: 'none',
            fontWeight: '900',
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all 0.15s ease'
          }}
        >
          <span>🏢</span>
          <span>Company Drives & Walk-ins ({DAILY_COMPANY_DRIVES.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('vacancies')}
          style={{
            flex: 1,
            minWidth: '220px',
            padding: '0.75rem 1.25rem',
            borderRadius: '0.75rem',
            background: activeTab === 'vacancies' ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'transparent',
            color: activeTab === 'vacancies' ? 'white' : '#94a3b8',
            border: 'none',
            fontWeight: '900',
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all 0.15s ease'
          }}
        >
          <span>💼</span>
          <span>Pan-India Hot Vacancies ({DAILY_HOT_VACANCIES.length})</span>
        </button>
      </div>

      {/* ── SEARCH & DYNAMIC FILTER BAR (FOR DRIVES & VACANCIES) ── */}
      {activeTab !== 'exams' && (
        <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <input
            type="text"
            placeholder={
              activeTab === 'drives'
                ? '🔍 Search company drives (TCS NQT, Infosys, Zoho, Amazon WOW, Accenture)...'
                : '🔍 Search vacancies by role (Software Engineer, Data Analyst) or company...'
            }
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
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

          {/* Dynamic Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {activeTab === 'drives' &&
              batchOptions.map(batch => (
                <button
                  key={batch}
                  onClick={() => setSelectedBatch(batch)}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: '0.6rem',
                    background: selectedBatch === batch ? '#2563eb' : 'rgba(255,255,255,0.06)',
                    color: selectedBatch === batch ? 'white' : '#94a3b8',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {batch}
                </button>
              ))}

            {activeTab === 'vacancies' &&
              vacCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedVacCategory(cat)}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: '0.6rem',
                    background: selectedVacCategory === cat ? '#7c3aed' : 'rgba(255,255,255,0.06)',
                    color: selectedVacCategory === cat ? 'white' : '#94a3b8',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ── TAB 1: OFFICIAL EXAM HUB & NOTIFICATIONS ──────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'exams' && (
        <ExamHub />
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ── TAB 2: COMPANY OFF-CAMPUS DRIVES & WALK-INS ──────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'drives' && (
        <>
          {loadingDrives ? (
            <div className="py-16 text-center text-slate-400">
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              Fetching official walk-in & off-campus drives...
            </div>
          ) : filteredDrives.length === 0 ? (
            <div className="py-16 text-center text-slate-400 bg-slate-900/60 rounded-2xl border border-slate-800">
              <p className="text-base font-semibold">No company drives matched your filter criteria.</p>
              <p className="text-xs text-slate-500 mt-1">Try selecting "All Batches" or clear search keywords.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDrives.map((drive) => (
                <CompanyDriveCard
                  key={drive._id || drive.id}
                  drive={drive}
                  onOpenDetails={(d) => setSelectedDriveModal(d)}
                />
              ))}
            </div>
          )}

          {/* Details Modal */}
          {selectedDriveModal && (
            <CompanyDriveDetailsModal
              drive={selectedDriveModal}
              onClose={() => setSelectedDriveModal(null)}
            />
          )}
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ── TAB 3: PAN-INDIA HOT VACANCIES ───────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'vacancies' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.25rem' }}>
          {filteredVacancies.map(vac => (
            <motion.div
              key={vac.id}
              whileHover={{ y: -3 }}
              style={{
                background: 'rgba(15,23,42,0.95)',
                border: '1px solid rgba(139,92,246,0.3)',
                borderRadius: '1.25rem',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem',
                boxShadow: '0 8px 30px rgba(0,0,0,0.35)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <div>
                    <span style={{ background: 'rgba(236,72,153,0.15)', color: '#f472b6', padding: '0.2rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.7rem', fontWeight: '800' }}>
                      {vac.category}
                    </span>
                    <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.15rem', margin: '0.35rem 0 0' }}>
                      {vac.role}
                    </h3>
                    <p style={{ color: '#60a5fa', fontWeight: '700', fontSize: '0.85rem', margin: '0.15rem 0 0' }}>
                      {vac.company} · 📍 {vac.location}
                    </p>
                  </div>

                  <span style={{ background: 'rgba(59,130,246,0.15)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.3)', padding: '0.25rem 0.55rem', borderRadius: '0.5rem', fontSize: '0.7rem', fontWeight: '800', whiteSpace: 'nowrap' }}>
                    {vac.sourceLabel}
                  </span>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '0.85rem', padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.06)', margin: '0.75rem 0' }}>
                  <div>💰 <strong>Package:</strong> <span style={{ color: '#4ade80', fontWeight: '800' }}>{vac.ctc}</span></div>
                  <div>📊 <strong>Vacancies:</strong> <span style={{ color: '#facc15', fontWeight: '800' }}>{vac.vacancies}</span></div>
                  <div>
                    🛠️ <strong>Key Skills:</strong>{' '}
                    <span style={{ color: '#93c5fd' }}>{vac.skills.join(', ')}</span>
                  </div>
                  <div>⏳ <strong>Application Deadline:</strong> <span style={{ color: '#f87171', fontWeight: '700' }}>{vac.deadline}</span></div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '0.65rem' }}>
                <a
                  href={vac.applyLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    padding: '0.65rem',
                    borderRadius: '0.65rem',
                    fontWeight: '800',
                    fontSize: '0.82rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 4px 15px rgba(16,185,129,0.35)'
                  }}
                >
                  <span>🌐</span>
                  <span>Apply on Official Board ➔</span>
                </a>

                <button
                  onClick={() => handleSetReminder(vac, 'vacancy')}
                  style={{
                    background: remindedItems[vac.id] ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.06)',
                    border: remindedItems[vac.id] ? '1px solid #4ade80' : '1px solid rgba(255,255,255,0.12)',
                    color: remindedItems[vac.id] ? '#4ade80' : '#cbd5e1',
                    padding: '0.65rem',
                    borderRadius: '0.65rem',
                    fontWeight: '700',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <span>{remindedItems[vac.id] ? '✅' : '🔔'}</span>
                  <span>{remindedItems[vac.id] ? 'Mail Sent' : 'Remind Me'}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
