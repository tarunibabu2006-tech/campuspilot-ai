import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

function JobPortal() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedRoleType, setSelectedRoleType] = useState('all')
  const [selectedCompany, setSelectedCompany] = useState('all')
  const [savedJobs, setSavedJobs] = useState({})
  const [appliedJobs, setAppliedJobs] = useState({})
  const [allJobs, setAllJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [visibleCount, setVisibleCount] = useState(24)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('/api/jobs')
        setAllJobs(res.data.jobs || [])
        setFilteredJobs(res.data.jobs || [])
      } catch (err) {
        console.error('Error fetching jobs:', err)
        toast.error('Failed to load jobs from database')
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  // Extract unique filter options dynamically from MongoDB data
  const locations = ['all', ...new Set(allJobs.map(j => j.location))].slice(0, 12)
  const roleTypes = ['all', 'Tech / Software', 'Non-Tech / Business', 'Healthcare & Clinical', 'Legal & Regulatory', 'Design & Media']
  const companies = ['all', ...new Set(allJobs.map(j => j.company))].slice(0, 15)

  useEffect(() => {
    let list = allJobs

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase()
      list = list.filter(j =>
        j.company.toLowerCase().includes(q) ||
        j.role.toLowerCase().includes(q) ||
        (j.roleType && j.roleType.toLowerCase().includes(q)) ||
        (j.domain && j.domain.toLowerCase().includes(q)) ||
        j.location.toLowerCase().includes(q) ||
        (j.skills && j.skills.toLowerCase().includes(q))
      )
    }

    if (selectedRoleType !== 'all') {
      list = list.filter(j => j.roleType === selectedRoleType || j.domain === selectedRoleType)
    }

    if (selectedLocation !== 'all') {
      list = list.filter(j => j.location === selectedLocation)
    }

    if (selectedCompany !== 'all') {
      list = list.filter(j => j.company === selectedCompany)
    }

    setFilteredJobs(list)
    setVisibleCount(24)
  }, [searchTerm, selectedRoleType, selectedLocation, selectedCompany])

  const handleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const nextState = !prev[jobId]
      toast.success(nextState ? 'Job bookmarked! 🔖' : 'Bookmark removed')
      return { ...prev, [jobId]: nextState }
    })
  }

  const handleApply = (job) => {
    setAppliedJobs(prev => ({ ...prev, [job.id]: true }))
    toast.success(`Redirecting to ${job.company} Career Portal... 🚀`)
    setTimeout(() => {
      window.open(job.applyLink, '_blank', 'noopener,noreferrer')
    }, 800)
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <h2 className="card-title" style={{ margin: 0 }}>💼 Campus Placement &amp; Job Portal</h2>
        <span className="badge badge-safe" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
          🔥 1000+ Verified Openings
        </span>
      </div>
      <p className="card-subtitle">
        Direct hiring drives from top MNCs across Technology, Business, Medical, Law, and Media.
      </p>

      {/* Smart Search & Filter Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem' }}>
        <input
          type="text"
          className="form-input"
          placeholder="🔍 Smart Search by Role Type, Job Title, Company, Skill (e.g. Frontend, Tech, Business, Medical, Legal, Google)..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ fontSize: '0.95rem', padding: '0.85rem 1rem' }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Role Type / Domain</label>
            <select className="form-select" value={selectedRoleType} onChange={e => setSelectedRoleType(e.target.value)}>
              {roleTypes.map(type => (
                <option key={type} value={type}>{type === 'all' ? 'All Role Types' : `🎯 ${type}`}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Location</label>
            <select className="form-select" value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)}>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc === 'all' ? 'All Locations' : `📍 ${loc}`}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Company</label>
            <select className="form-select" value={selectedCompany} onChange={e => setSelectedCompany(e.target.value)}>
              {companies.map(comp => (
                <option key={comp} value={comp}>{comp === 'all' ? 'All Companies' : `🏢 ${comp}`}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 className="result-title" style={{ margin: 0 }}>
          ⚡ Active Vacancies ({filteredJobs.length})
        </h3>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Showing {Math.min(visibleCount, filteredJobs.length)} of {filteredJobs.length}
        </span>
      </div>

      {loading ? (
        <div className="text-center py-10"><span className="loading-spinner"></span> Loading Live Jobs from Database...</div>
      ) : filteredJobs.length === 0 ? (
        <div className="result-item" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>No vacancies found matching your search query.</p>
          <button 
            type="button" 
            onClick={() => { setSearchTerm(''); setSelectedRoleType('all'); setSelectedLocation('all'); setSelectedCompany('all'); }} 
            className="btn btn-outline" 
            style={{ marginTop: '0.75rem' }}
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1rem' }}>
          {filteredJobs.slice(0, visibleCount).map((job) => {
            const isSaved = savedJobs[job.id]
            const isApplied = appliedJobs[job.id]
            return (
              <div 
                key={job.id} 
                className="card" 
                style={{ 
                  padding: '1.25rem', 
                  border: job.isFeatured ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-color)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  background: job.isFeatured ? 'rgba(245, 158, 11, 0.03)' : 'var(--bg-card)',
                  position: 'relative'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="badge badge-info" style={{ fontWeight: 'bold' }}>{job.company}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {job.isFeatured && <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>Featured</span>}
                      <span 
                        style={{ cursor: 'pointer', fontSize: '1.1rem' }} 
                        onClick={() => handleSaveJob(job.id)}
                        title={isSaved ? "Saved" : "Save Job"}
                      >
                        {isSaved ? '🔖' : '📑'}
                      </span>
                    </div>
                  </div>

                  {/* Role Type & Domain Badge */}
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                    <span style={{ 
                      fontSize: '0.7rem', 
                      background: 'rgba(99, 102, 241, 0.15)', 
                      color: '#a5b4fc', 
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      padding: '0.15rem 0.5rem', 
                      borderRadius: '6px',
                      fontWeight: 600
                    }}>
                      🎯 Role Type: {job.roleType || job.domain || 'General'}
                    </span>
                    <span style={{ 
                      fontSize: '0.7rem', 
                      background: 'rgba(16, 185, 129, 0.12)', 
                      color: '#6ee7b7', 
                      border: '1px solid rgba(16, 185, 129, 0.25)',
                      padding: '0.15rem 0.5rem', 
                      borderRadius: '6px' 
                    }}>
                      🏢 {job.domain || 'All Domains'}
                    </span>
                  </div>

                  <h4 style={{ margin: '0.35rem 0 0.25rem 0', fontSize: '1.05rem', fontWeight: 'bold', color: 'var(--accent-blue)' }}>
                    {job.role}
                  </h4>
                  
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.35rem 0' }}>
                    📍 {job.location} • 💰 {job.salary}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', margin: '0.6rem 0' }}>
                    <span className="badge badge-safe" style={{ fontSize: '0.65rem' }}>{job.experience}</span>
                    <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>{job.batch}</span>
                    {job.skills && <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>{job.skills}</span>}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleApply(job)}
                  className={`btn btn-full ${isApplied ? 'btn-success' : 'btn-primary'}`}
                  style={{ marginTop: '0.75rem', fontSize: '0.825rem', padding: '0.45rem' }}
                >
                  {isApplied ? '✓ Application Tracked' : 'Apply Directly ↗'}
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Load more button */}
      {visibleCount < filteredJobs.length && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button 
            type="button"
            onClick={() => setVisibleCount(prev => prev + 24)}
            className="btn btn-outline"
            style={{ padding: '0.6rem 2rem' }}
          >
            Load More Vacancies ({filteredJobs.length - visibleCount} remaining) ↓
          </button>
        </div>
      )}
    </div>
  )
}

export default JobPortal
