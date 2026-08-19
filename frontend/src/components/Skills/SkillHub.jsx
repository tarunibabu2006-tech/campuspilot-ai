import React, { useState, useEffect } from 'react'
import { allSkills } from '../../data/allSkills'
import toast from 'react-hot-toast'

function SkillHub({ onSelectSkill }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDomain, setSelectedDomain] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredSkills, setFilteredSkills] = useState(allSkills)
  const [visibleCount, setVisibleCount] = useState(24)

  const categories = ['all', ...new Set(allSkills.map(s => s.category))]
  const domains = ['all', ...new Set(allSkills.map(s => s.domain))]

  useEffect(() => {
    let list = allSkills

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase()
      list = list.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.domain.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      )
    }

    if (selectedCategory !== 'all') {
      list = list.filter(s => s.category === selectedCategory)
    }

    if (selectedDomain !== 'all') {
      list = list.filter(s => s.domain === selectedDomain)
    }

    setFilteredSkills(list)
    setVisibleCount(24)
  }, [selectedCategory, selectedDomain, searchTerm])

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <h2 className="card-title" style={{ margin: 0 }}>📚 1000+ Skill Learning Hub</h2>
        <span className="badge badge-safe" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
          🔥 1050+ Industry Skills
        </span>
      </div>
      <p className="card-subtitle">
        Master in-demand skills across Engineering, Management, Medical, Law, Creative Arts, and Core CS!
      </p>

      {/* Filters & Search */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          className="form-input"
          placeholder="🔍 Smart Search 1000+ Skills (e.g. React, Python, Product Management, VLSI, Corporate Law, Figma)..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ fontSize: '0.95rem', padding: '0.85rem 1rem' }}
        />

        <div className="grid-2" style={{ gap: '0.75rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Filter Category</label>
            <select className="form-select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Filter Domain</label>
            <select className="form-select" value={selectedDomain} onChange={e => setSelectedDomain(e.target.value)}>
              {domains.map(dom => (
                <option key={dom} value={dom}>{dom === 'all' ? 'All Domains' : dom}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 className="result-title" style={{ margin: 0 }}>
          ⚡ Available Skills ({filteredSkills.length})
        </h3>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Showing {Math.min(visibleCount, filteredSkills.length)} of {filteredSkills.length}
        </span>
      </div>

      {filteredSkills.length === 0 ? (
        <div className="result-item" style={{ textAlign: 'center', padding: '2.5rem' }}>
          No skills found matching your search. Try adjusting the filters!
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {filteredSkills.slice(0, visibleCount).map(skill => (
            <div
              key={skill.id}
              className="result-item"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                border: '1px solid var(--border-color)',
                borderRadius: '12px'
              }}
              onClick={() => onSelectSkill && onSelectSkill(skill.id)}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#818cf8' }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border-color)' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>{skill.category}</span>
                  <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>{skill.domain}</span>
                </div>
                <h4 style={{ margin: '0.25rem 0', fontSize: '1.05rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{skill.name}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.4rem 0' }}>{skill.description}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                <span className="badge badge-safe" style={{ fontSize: '0.7rem' }}>{skill.level}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>⏱️ {skill.duration}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {visibleCount < filteredSkills.length && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            type="button"
            onClick={() => setVisibleCount(prev => prev + 24)}
            className="btn btn-outline"
            style={{ padding: '0.6rem 2rem' }}
          >
            Load More Skills ({filteredSkills.length - visibleCount} remaining) ↓
          </button>
        </div>
      )}
    </div>
  )
}

export default SkillHub
