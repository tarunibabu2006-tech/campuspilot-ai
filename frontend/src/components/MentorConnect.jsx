import React, { useState, useEffect } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'

function MentorConnect() {
  const [mentors, setMentors] = useState([])
  const [selectedMentor, setSelectedMentor] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [domain, setDomain] = useState('')
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    fetchMentors()
  }, [domain, search])

  const fetchMentors = async () => {
    setIsFetching(true)
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (domain) params.append('domain', domain)
      const r = await api.get(`/mentors?${params.toString()}`)
      setMentors(r.data.mentors || [])
    } catch {
      toast.error('Failed to fetch mentors')
    }
    setIsFetching(false)
  }

  const connectMentor = async () => {
    if (!selectedMentor) return
    if (!message.trim()) { toast.error('Please add a short message!'); return }
    setLoading(true)
    try {
      const r = await api.post('/mentors/connect', { mentorId: selectedMentor.id, message })
      toast.success(r.data.message || 'Request sent! 📧')
      setSelectedMentor(null)
      setMessage('')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to connect!')
    }
    setLoading(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="card" style={{ background: 'linear-gradient(135deg, #0d1117 0%, #1a1f35 100%)', border: '1px solid rgba(236,72,153,0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '2.5rem' }}>👥</span>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.6rem', color: '#fff' }}>Mentor Connect</h2>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Connect with alumni and industry experts for career guidance & referrals</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center' }}>
        <input className="form-input" placeholder="🔍 Search by name, company, or skill..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="form-input" value={domain} onChange={e => setDomain(e.target.value)} style={{ minWidth: '200px' }}>
          <option value="">All Domains</option>
          <option value="Software Engineer">Software Engineering</option>
          <option value="Data">Data & AI</option>
          <option value="Product">Product Management</option>
          <option value="DevOps">DevOps & Cloud</option>
          <option value="Finance">Finance</option>
          <option value="Design">Design</option>
        </select>
      </div>

      {isFetching ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}><span className="loading-spinner" /> Loading mentors...</div>
      ) : mentors.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No mentors found matching your criteria.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {mentors.map(m => (
            <div key={m.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', flexShrink: 0 }}>
                  {m.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ margin: 0, color: '#fff', fontSize: '1.1rem' }}>{m.name}</h3>
                    <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px', color: '#fbbf24' }}>★ {m.rating}</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.2rem' }}>{m.role} @ <strong style={{ color: 'var(--text-primary)' }}>{m.company}</strong></div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>📍 {m.location} • ⏳ {m.experience}</div>
                </div>
              </div>

              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{m.about}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {m.expertise.slice(0, 4).map(e => <span key={e} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', padding: '0.15rem 0.5rem', borderRadius: '12px', fontSize: '0.7rem' }}>{e}</span>)}
                {m.expertise.length > 4 && <span style={{ background: 'transparent', color: 'var(--text-muted)', fontSize: '0.7rem' }}>+{m.expertise.length - 4}</span>}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: m.available ? '#10b981' : '#ef4444' }}>{m.available ? '🟢 Accepting mentees' : '🔴 Fully booked'}</span>
                <button
                  className="btn btn-primary"
                  style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', background: m.available ? 'var(--blue)' : 'var(--bg-secondary)', cursor: m.available ? 'pointer' : 'not-allowed', color: m.available ? '#fff' : 'var(--text-muted)' }}
                  onClick={() => m.available && setSelectedMentor(m)}
                  disabled={!m.available}
                >
                  Request Intro
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedMentor && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', background: '#111827' }}>
            <h3 style={{ margin: '0 0 0.5rem', color: '#fff' }}>Connect with {selectedMentor.name}</h3>
            <p style={{ margin: '0 0 1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Send a brief intro about yourself and what you need help with (Resume review, Referral, Career guidance).</p>
            
            <textarea
              className="form-input"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={`Hi ${selectedMentor.name.split(' ')[0]},\n\nI'm a final year student looking to break into ${selectedMentor.company}. I would love to get some guidance on...`}
              style={{ height: '150px', resize: 'none', marginBottom: '1rem' }}
            />
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-outline" onClick={() => setSelectedMentor(null)} style={{ flex: 1 }}>Cancel</button>
              <button className="btn btn-primary" onClick={connectMentor} disabled={loading} style={{ flex: 2 }}>
                {loading ? <span className="loading-spinner" /> : '📤 Send Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MentorConnect
