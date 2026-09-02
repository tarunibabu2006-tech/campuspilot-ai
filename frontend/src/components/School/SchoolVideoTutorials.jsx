import React from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { DIKSHA_PLATFORM_STATS } from '../../data/schoolMasterData'

export default function SchoolVideoTutorials({ activeSubject, selectedClass }) {
  const videoPlaylists = [
    {
      title: `${activeSubject.name} — Full Chapter Masterclass (Concept + Numericals)`,
      duration: '45 mins',
      channel: 'DIKSHA National NCERT Official',
      views: '1.2M Views',
      topics: ['Complete concept derivations', 'Exemplar problem breakdown', 'Board exam previous year questions'],
      embedLink: 'https://diksha.gov.in'
    },
    {
      title: `${activeSubject.name} — 30 Minutes Last-Minute Revision Sprint`,
      duration: '30 mins',
      channel: 'NCERT E-Pathshala Learning Hub',
      views: '850K Views',
      topics: ['All formulas recap', 'Crucial labeled diagrams', 'Common calculation pitfalls'],
      embedLink: 'https://diksha.gov.in'
    },
    {
      title: `Board Topper 100/100 Answer Sheet Presentation & Time Management`,
      duration: '22 mins',
      channel: 'CampusPilot School Academic Team',
      views: '540K Views',
      topics: ['Step marking hacks', 'How to format 5-mark long answers', 'Rough column calculations'],
      embedLink: 'https://diksha.gov.in'
    }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header with DIKSHA stats */}
      <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #064e3b 100%)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '1.25rem', padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ background: 'rgba(52,211,153,0.2)', color: '#6ee7b7', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
            MINISTRY OF EDUCATION & NCERT INITIATIVE
          </span>
          <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.35rem', margin: '0.3rem 0 0.2rem' }}>
            🎬 DIKSHA & NCERT Video Lectures Hub (36 Indian Languages)
          </h2>
          <p style={{ color: '#a7f3d0', fontSize: '0.82rem', margin: 0 }}>
            {DIKSHA_PLATFORM_STATS.coursesAvailable} · {DIKSHA_PLATFORM_STATS.enrollments} Nationwide
          </p>
        </div>

        <a
          href={DIKSHA_PLATFORM_STATS.officialPortal}
          target="_blank"
          rel="noreferrer"
          style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', textDecoration: 'none', padding: '0.65rem 1.25rem', borderRadius: '0.65rem', fontWeight: '900', fontSize: '0.85rem' }}
        >
          🔗 Open DIKSHA Portal ➔
        </a>
      </div>

      {/* Video Categories Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
        {DIKSHA_PLATFORM_STATS.categories.map((cat, idx) => (
          <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.85rem', padding: '1rem' }}>
            <span style={{ fontSize: '1.4rem' }}>{cat.icon}</span>
            <h4 style={{ color: 'white', fontWeight: '800', fontSize: '0.9rem', margin: '0.3rem 0 0.2rem' }}>{cat.title}</h4>
            <div style={{ color: '#4ade80', fontSize: '0.75rem', fontWeight: '700' }}>{cat.count} · {cat.duration}</div>
          </div>
        ))}
      </div>

      {/* Video Playlist Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {videoPlaylists.map((vid, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -2 }}
            style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '1rem', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
          >
            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <span style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', padding: '0.15rem 0.45rem', borderRadius: '0.35rem', fontSize: '0.7rem', fontWeight: '800' }}>
                  HD Video Masterclass
                </span>
                <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>⏱️ {vid.duration} · {vid.views}</span>
              </div>

              <h4 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem', margin: '0 0 0.35rem' }}>
                {vid.title}
              </h4>
              <div style={{ color: '#cbd5e1', fontSize: '0.78rem' }}>
                By <strong>{vid.channel}</strong>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.5rem' }}>
                {vid.topics.map((t, tIdx) => (
                  <span key={tIdx} style={{ background: 'rgba(96,165,250,0.12)', color: '#93c5fd', padding: '0.15rem 0.45rem', borderRadius: '0.35rem', fontSize: '0.7rem' }}>
                    ✓ {t}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={vid.embedLink}
              target="_blank"
              rel="noreferrer"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', textDecoration: 'none', padding: '0.65rem 1.25rem', borderRadius: '0.6rem', fontWeight: '800', fontSize: '0.85rem' }}
            >
              ▶ Watch Video Lesson ➔
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
