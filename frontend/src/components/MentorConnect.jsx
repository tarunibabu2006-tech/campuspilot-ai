import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { SEED_MENTORS } from '../data/seedMentors'

const SEEDED_MENTOR_ENTRIES = SEED_MENTORS.map(m => ({
  id: m.id,
  name: m.name,
  role: m.role,
  company: m.company,
  exp: m.experience,
  location: m.location,
  rating: m.rating,
  reviewsCount: m.reviews,
  menteesCount: Math.floor(Math.random() * 100) + 50,
  sessionsCount: Math.floor(Math.random() * 80) + 40,
  placedStudents: Math.floor(Math.random() * 40) + 15,
  pricing: 'Free',
  verified: true,
  verifiedCompany: true,
  category: m.expertise[0] || 'Career Guidance',
  about: m.bio,
  skills: m.expertise,
  linkedInUrl: `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(m.name + ' ' + m.company)}`,
  availableSlots: m.availableDays.map(d => `${d} 6:00 PM`),
  aiMatchScore: Math.floor(Math.random() * 15) + 85,
  aiMatchReason: `Highly recommended for ${m.expertise[0]} & ${m.company} guidance.`,
  reviews: [
    { name: 'Student Mentee', rating: 5, text: `Great session with ${m.name}! Got super helpful insights.` }
  ]
}))

const CATEGORIES = ['All', 'Career Guidance', 'Web Development', 'Data Analytics', 'Interview Preparation', 'Core Engineering']

export default function MentorConnect() {
  const [mentors, setMentors] = useState(SEEDED_MENTOR_ENTRIES)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [bookingModal, setBookingModal] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState('')
  const [mentorshipTopic, setMentorshipTopic] = useState('')
  const [detailModal, setDetailModal] = useState(null)
  const [connectionStatus, setConnectionStatus] = useState({})

  const filteredMentors = mentors.filter(m => {
    const matchesCat = selectedCategory === 'All' || m.category === selectedCategory
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCat && matchesSearch
  })

  const handleSendConnection = (mentor) => {
    setConnectionStatus({ ...connectionStatus, [mentor.id]: 'requested' })
    toast.success(`🤝 Connection request sent to ${mentor.name} on LinkedIn & CampusPilot!`)
    window.open(mentor.linkedInUrl, '_blank')
  }

  const handleConfirmBooking = (e) => {
    e.preventDefault()
    if (!selectedSlot) {
      toast.error('Please select an available time slot!')
      return
    }
    toast.success(`🎉 1-on-1 Mentorship session confirmed with ${bookingModal.name} for ${selectedSlot}!`)
    setBookingModal(null)
    setSelectedSlot('')
    setMentorshipTopic('')
  }

  return (
    <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* ── HEADER ─────────────────────────────────────────────────── */}
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
            <span style={{ fontSize: '2.5rem' }}>🤝</span>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
                Industry Mentor & Alumni Connect (LinkedIn Integrated)
              </h1>
              <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
                Connect with Verified Senior Engineers from Google, Microsoft, Amazon, Zoho, TCS & Flipkart
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── SEARCH & CATEGORY FILTER ───────────────────────────────── */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="🔍 Search mentors by name, company, skill (e.g. Google, Python, SDE, Zoho)..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: '260px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            color: 'white',
            fontSize: '0.9rem',
            outline: 'none'
          }}
        />
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          style={{
            background: '#1e1b4b',
            border: '1px solid rgba(139,92,246,0.4)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            color: 'white',
            fontSize: '0.88rem',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* ── MENTORS GRID ───────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredMentors.map(m => {
          const reqStatus = connectionStatus[m.id]
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1.25rem',
                padding: '1.35rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: '800', color: 'white' }}>
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem', margin: '0 0 0.15rem' }}>
                        {m.name} ✓
                      </h3>
                      <div style={{ color: '#60a5fa', fontWeight: '700', fontSize: '0.82rem' }}>
                        {m.role} @ {m.company}
                      </div>
                      <div style={{ color: '#94a3b8', fontSize: '0.74rem' }}>
                        {m.exp} Exp · {m.location}
                      </div>
                    </div>
                  </div>
                  <span style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', padding: '0.2rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.75rem', fontWeight: '800' }}>
                    ★ {m.rating}
                  </span>
                </div>

                <p style={{ color: '#cbd5e1', fontSize: '0.82rem', lineHeight: 1.4, marginBottom: '0.85rem' }}>
                  {m.about}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                  {m.skills.map(s => (
                    <span key={s} style={{ background: 'rgba(124,58,237,0.15)', color: '#c4b5fd', padding: '0.15rem 0.45rem', borderRadius: '0.35rem', fontSize: '0.72rem' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleSendConnection(m)}
                    style={{
                      flex: 1,
                      padding: '0.6rem',
                      borderRadius: '0.65rem',
                      background: reqStatus ? 'rgba(34,197,94,0.2)' : '#0077b5',
                      color: 'white',
                      border: 'none',
                      fontWeight: '800',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    🔗 {reqStatus ? 'Requested ✓' : 'Connect LinkedIn'}
                  </button>
                  <button
                    onClick={() => setBookingModal(m)}
                    style={{
                      flex: 1,
                      padding: '0.6rem',
                      borderRadius: '0.65rem',
                      background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                      color: 'white',
                      border: 'none',
                      fontWeight: '800',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    📅 Book 1-on-1
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* ── 1-ON-1 BOOKING MODAL ───────────────────────────────────── */}
      <AnimatePresence>
        {bookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
            onClick={() => setBookingModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              style={{
                background: 'linear-gradient(135deg, #1e1b4b, #0f172a)',
                border: '1px solid rgba(139,92,246,0.4)',
                borderRadius: '1.5rem',
                padding: '2rem',
                maxWidth: '520px',
                width: '100%'
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.25rem', margin: 0 }}>
                  📅 Book 1-on-1 Session with {bookingModal.name}
                </h3>
                <button
                  onClick={() => setBookingModal(null)}
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleConfirmBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.82rem', marginBottom: '0.4rem', fontWeight: '700' }}>
                    Select Available Time Slot:
                  </label>
                  <select
                    required
                    value={selectedSlot}
                    onChange={e => setSelectedSlot(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '0.65rem',
                      padding: '0.75rem',
                      color: 'white',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  >
                    <option value="">-- Choose Slot --</option>
                    {bookingModal.availableSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.82rem', marginBottom: '0.4rem', fontWeight: '700' }}>
                    What would you like to discuss? (e.g. System Design, Resume Review, Off-Campus Placement Referral):
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={mentorshipTopic}
                    onChange={e => setMentorshipTopic(e.target.value)}
                    placeholder="Provide details so the mentor can prepare personalized guidance..."
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '0.65rem',
                      padding: '0.75rem',
                      color: 'white',
                      fontSize: '0.88rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '0.85rem',
                    borderRadius: '0.75rem',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    fontWeight: '900',
                    fontSize: '0.95rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Confirm Free 1-on-1 Booking ➔
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
