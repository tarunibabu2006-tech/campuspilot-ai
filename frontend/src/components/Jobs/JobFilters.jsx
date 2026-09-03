import React from 'react'

export const JOB_SOURCES_LIST = [
  { id: 'all', label: '🌐 All 15 Job Boards', icon: '🌐' },
  { id: 'company', label: '🏢 Direct Company Careers', icon: '🏢' },
  { id: 'linkedin', label: '🔗 LinkedIn Jobs', icon: '🔗' },
  { id: 'naukri', label: '📊 Naukri.com', icon: '📊' },
  { id: 'internshala', label: '🎯 Internshala', icon: '🎯' },
  { id: 'indeed', label: '🌐 Indeed India', icon: '🌐' },
  { id: 'wellfound', label: '💼 Wellfound (AngelList)', icon: '💼' },
  { id: 'monster', label: '📱 Monster / Foundit', icon: '📱' },
  { id: 'timesjobs', label: '🏦 TimesJobs', icon: '🏦' },
  { id: 'freshersworld', label: '🎓 Freshersworld', icon: '🎓' },
  { id: 'cutshort', label: '📝 Cutshort', icon: '📝' },
  { id: 'hirist', label: '🚀 Hirist Tech', icon: '🚀' },
  { id: 'hasjob', label: '💻 Hasjob', icon: '💻' },
  { id: 'shine', label: '🌍 Shine.com', icon: '🌍' },
  { id: 'upGrad', label: '🎯 upGrad Jobs', icon: '🎯' },
  { id: 'adzuna', label: '📊 Adzuna India', icon: '📊' }
]

export default function JobFilters({
  searchTerm,
  setSearchQuery,
  selectedSource,
  setSelectedSource,
  selectedCategory,
  setSelectedCategory,
  selectedType,
  setSelectedType
}) {
  const categories = ['All', 'Software Development', 'Data Science & AI', 'Full Stack', 'Cloud & DevOps', 'Core Engineering', 'Product & Analytics']
  const jobTypes = ['All', 'Full-time', 'Internship', 'Contract', 'Remote']

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.95)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '1.25rem',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      {/* Search Input */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="🔍 Search roles, companies (Google, TCS, Amazon), or skills (Python, React)..."
          value={searchTerm}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            minWidth: '260px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            color: 'white',
            fontSize: '0.9rem',
            outline: 'none'
          }}
        />

        {/* Category Select */}
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          style={{
            background: '#1e293b',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            color: 'white',
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          {categories.map(c => (
            <option key={c} value={c}>{c === 'All' ? '📂 All Categories' : c}</option>
          ))}
        </select>

        {/* Type Select */}
        <select
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
          style={{
            background: '#1e293b',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            color: 'white',
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          {jobTypes.map(t => (
            <option key={t} value={t}>{t === 'All' ? '⏱️ All Job Types' : t}</option>
          ))}
        </select>
      </div>

      {/* 15 Job Source Board Pills */}
      <div>
        <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
          🌐 Filter by Job Source (15 Integrated Platforms):
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
          {JOB_SOURCES_LIST.map(src => {
            const isActive = selectedSource === src.id
            return (
              <button
                key={src.id}
                onClick={() => setSelectedSource(src.id)}
                style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: '0.6rem',
                  background: isActive ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255, 255, 255, 0.04)',
                  border: isActive ? '1px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: isActive ? 'white' : '#cbd5e1',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? '800' : '600',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {src.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
