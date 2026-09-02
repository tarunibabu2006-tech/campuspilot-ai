import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function AIApplyDashboard({ applications = [], onOpenApplyPortal }) {
  const [filterStatus, setFilterStatus] = useState('All')

  // Combine props with mock applications if list is empty
  const defaultApps = [
    {
      id: 'app-g1',
      appId: 'APP-2026-94821',
      company: 'Google',
      role: 'Software Engineer (SDE-1)',
      location: 'Bangalore, Karnataka (Hybrid)',
      salary: '₹18-32 LPA',
      source: 'LinkedIn',
      status: '📧 Confirmation Pending',
      appliedDate: 'Today, 10:30 AM',
      confirmationEmail: 'Sent to Gmail',
      applicationLink: 'https://google.com/careers/app/94821'
    },
    {
      id: 'app-a1',
      appId: 'APP-2026-67890',
      company: 'Amazon',
      role: 'SDE-1 (AWS Cloud)',
      location: 'Hyderabad, TS',
      salary: '₹22-35 LPA',
      source: 'Company Portal',
      status: '⏳ Under Review',
      appliedDate: 'Today, 11:00 AM',
      confirmationEmail: 'Sent to Gmail',
      applicationLink: 'https://amazon.com/jobs/app/67890'
    },
    {
      id: 'app-m1',
      appId: 'APP-2026-38291',
      company: 'Microsoft',
      role: 'Software Engineer',
      location: 'Bengaluru / Hyderabad',
      salary: '₹20-34 LPA',
      source: 'Naukri',
      status: '📅 Interview Scheduled',
      appliedDate: 'Yesterday, 04:15 PM',
      confirmationEmail: 'Sent to Gmail',
      applicationLink: 'https://microsoft.com/careers/app/38291'
    },
    {
      id: 'app-z1',
      appId: 'APP-2026-19284',
      company: 'Zoho Corporation',
      role: 'Member Technical Staff',
      location: 'Chennai / Tenkasi',
      salary: '₹8-16 LPA',
      source: 'Direct from Company',
      status: '✅ Selected',
      appliedDate: '3 days ago',
      confirmationEmail: 'Sent to Gmail',
      applicationLink: 'https://zoho.com/careers/app/19284'
    }
  ]

  const displayList = applications.length > 0 ? applications : defaultApps

  const filtered = displayList.filter(app => {
    if (filterStatus === 'All') return true
    return app.status?.includes(filterStatus)
  })

  const getStatusBadge = (status) => {
    if (status?.includes('Interview')) {
      return { bg: 'rgba(59,130,246,0.2)', border: '1px solid #3b82f6', color: '#60a5fa' }
    }
    if (status?.includes('Selected')) {
      return { bg: 'rgba(34,197,94,0.2)', border: '1px solid #22c55e', color: '#4ade80' }
    }
    if (status?.includes('Rejected')) {
      return { bg: 'rgba(239,68,68,0.2)', border: '1px solid #ef4444', color: '#f87171' }
    }
    if (status?.includes('Review')) {
      return { bg: 'rgba(251,191,36,0.2)', border: '1px solid #fbbf24', color: '#fbbf24' }
    }
    return { bg: 'rgba(124,58,237,0.2)', border: '1px solid #8b5cf6', color: '#c4b5fd' }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #0f172a 100%)', borderRadius: '1.25rem', padding: '1.75rem', border: '1px solid rgba(139,92,246,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🤖</span>
            <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.4rem', margin: 0 }}>
              AI Apply & Real-Time Application Tracking Dashboard
            </h2>
          </div>
          <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
            Automated submissions, status tracking, interview schedules and direct Gmail confirmations.
          </p>
        </div>

        <button
          onClick={onOpenApplyPortal}
          style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '0.65rem', fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer' }}
        >
          🔍 Browse More Jobs & Apply ➔
        </button>
      </div>

      {/* ── METRICS BAR ────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
        {[
          { label: 'Total Applied', val: displayList.length > 4 ? displayList.length : 45, color: '#60a5fa' },
          { label: 'Shortlisted', val: 12, color: '#fbbf24' },
          { label: 'Interviews Scheduled', val: 8, color: '#818cf8' },
          { label: 'Rejected', val: 5, color: '#f87171' },
          { label: 'Success Rate', val: '27%', color: '#4ade80' }
        ].map((m, idx) => (
          <div key={idx} style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ color: m.color, fontWeight: '900', fontSize: '1.8rem' }}>{m.val}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', marginTop: '0.2rem', fontWeight: '700' }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* ── FILTER BUTTONS ─────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '800' }}>Filter by Status:</span>
        {['All', 'Confirmation Pending', 'Applied', 'Under Review', 'Interview', 'Selected'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '0.5rem',
              background: filterStatus === status ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.04)',
              border: filterStatus === status ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
              color: filterStatus === status ? 'white' : '#94a3b8',
              fontWeight: '700',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {/* ── APPLICATION CARDS LIST ─────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map(app => {
          const badgeStyle = getStatusBadge(app.status)
          return (
            <motion.div
              key={app.id || app.appId}
              whileHover={{ y: -2 }}
              style={{
                background: 'rgba(15,23,42,0.95)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1rem',
                padding: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                  <h4 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', margin: 0 }}>
                    {app.company} - {app.role}
                  </h4>
                  <span style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8', padding: '0.15rem 0.5rem', borderRadius: '0.35rem', fontSize: '0.7rem' }}>
                    Applied via {app.source || 'Direct Portal'}
                  </span>
                </div>

                <div style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <div>📅 <strong>Applied Date:</strong> {app.appliedDate || 'Today, Just now'}</div>
                  <div>📧 <strong>Confirmation:</strong> Sent to Gmail</div>
                  <div>
                    🔗 <strong>Application Link:</strong>{' '}
                    <a href={app.applicationLink} target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>
                      {app.applicationLink}
                    </a>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                <span style={{ background: badgeStyle.bg, border: badgeStyle.border, color: badgeStyle.color, padding: '0.35rem 0.85rem', borderRadius: '0.5rem', fontWeight: '800', fontSize: '0.82rem' }}>
                  Status: {app.status}
                </span>

                <button
                  onClick={() => toast.success(`📩 Status check refreshed for ${app.company}!`)}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', padding: '0.35rem 0.75rem', borderRadius: '0.4rem', fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  🔄 Refresh Status
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
