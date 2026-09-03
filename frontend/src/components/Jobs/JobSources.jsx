import React from 'react'
import { motion } from 'framer-motion'
import { JOB_SOURCES_LIST } from './JobFilters'

export default function JobSources({ onSelectSource }) {
  const sourcesData = [
    { id: 'company', name: 'Direct Company Careers', icon: '🏢', desc: 'Google, Amazon, TCS, Infosys, Zoho, Flipkart official career portals', link: 'https://careers.google.com' },
    { id: 'linkedin', name: 'LinkedIn Jobs', icon: '🔗', desc: 'Global professional network job listings & recruiter connects', link: 'https://www.linkedin.com/jobs' },
    { id: 'naukri', name: 'Naukri.com', icon: '📊', desc: 'India’s #1 Job Portal with 500,000+ active hiring openings', link: 'https://www.naukri.com' },
    { id: 'internshala', name: 'Internshala', icon: '🎯', desc: 'Leading internship & freshers job platform for college students', link: 'https://internshala.com' },
    { id: 'indeed', name: 'Indeed India', icon: '🌐', desc: 'Comprehensive job search aggregator across companies', link: 'https://in.indeed.com' },
    { id: 'wellfound', name: 'Wellfound (AngelList)', icon: '💼', desc: 'Top high-growth startup & tech job opportunities', link: 'https://wellfound.com' },
    { id: 'monster', name: 'Monster / Foundit', icon: '📱', desc: 'Enterprise hiring portal for engineering & management candidates', link: 'https://www.foundit.in' },
    { id: 'timesjobs', name: 'TimesJobs', icon: '🏦', desc: 'Times Group career network for corporate jobs', link: 'https://www.timesjobs.com' },
    { id: 'freshersworld', name: 'Freshersworld', icon: '🎓', desc: 'Dedicated freshers recruitment portal for 2024, 2025, 2026 batches', link: 'https://www.freshersworld.com' },
    { id: 'cutshort', name: 'Cutshort', icon: '📝', desc: 'AI-powered match hiring for developers and product builders', link: 'https://cutshort.io' },
    { id: 'hirist', name: 'Hirist Tech', icon: '🚀', desc: 'Exclusive tech & software engineering jobs portal', link: 'https://www.hirist.tech' },
    { id: 'hasjob', name: 'Hasjob', icon: '💻', desc: 'HasGeek tech community job board', link: 'https://hasjob.co' },
    { id: 'shine', name: 'Shine.com', icon: '🌍', desc: 'HT Media jobs portal across IT & Non-IT sectors', link: 'https://www.shine.com' },
    { id: 'upGrad', name: 'upGrad Jobs', icon: '🎯', desc: 'Career placement network for upGrad learners & tech roles', link: 'https://www.upgrad.com/jobs' },
    { id: 'adzuna', name: 'Adzuna India', icon: '📊', desc: 'Zero-spam job search engine across all Indian cities', link: 'https://www.adzuna.in' }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
        border: '1px solid rgba(139,92,246,0.3)',
        borderRadius: '1.25rem',
        padding: '1.5rem',
        color: 'white'
      }}>
        <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900' }}>
          🌐 15 Multi-Platform Job Sources Integrated
        </h3>
        <p style={{ color: '#c4b5fd', fontSize: '0.88rem', margin: '0.25rem 0 0' }}>
          CampusPilot AI aggregates and verifies job postings from all 15 premier Indian career portals.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {sourcesData.map(src => (
          <motion.div
            key={src.id}
            whileHover={{ y: -3 }}
            style={{
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '1rem',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '0.75rem'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{src.icon}</span>
                <h4 style={{ color: 'white', fontWeight: '800', margin: 0, fontSize: '1.05rem' }}>
                  {src.name}
                </h4>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.4, margin: '0.5rem 0 0' }}>
                {src.desc}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => onSelectSource(src.id)}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem',
                  borderRadius: '0.55rem',
                  fontWeight: '800',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                Filter Jobs
              </button>
              <a
                href={src.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#93c5fd',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.55rem',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                Visit Site ➔
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
