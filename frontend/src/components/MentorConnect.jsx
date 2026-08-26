import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const MOCK_MENTORS = [
  {
    id: 'm1',
    name: 'Siddharth V',
    role: 'Senior Software Engineer',
    company: 'Google India',
    exp: '6 Yrs',
    location: 'Bengaluru, KA',
    rating: 4.9,
    reviewsCount: 38,
    menteesCount: 120,
    sessionsCount: 85,
    placedStudents: 32,
    pricing: 'Free',
    verified: true,
    verifiedCompany: true,
    category: 'Interview Preparation',
    about: 'Ex-Amazon, currently SDE-2 at Google. Passionate about helping college freshers master Data Structures & System Design for Tier-1 Product Companies.',
    skills: ['DSA', 'System Design', 'C++', 'Java', 'Mock Interviews'],
    availableSlots: ['Today 6:00 PM', 'Tomorrow 10:00 AM', 'Saturday 4:00 PM'],
    aiMatchScore: 94,
    aiMatchReason: 'Recommended because you are preparing for Software Engineering roles and practice coding problems.',
    reviews: [
      { name: 'Rahul M', rating: 5, text: 'Siddharth helped me crack Amazon SDE-1 interview! His System Design feedback was spot on.' },
      { name: 'Priya K', rating: 5, text: 'Best mentor for DSA mock interviews. Very patient & detailed feedback.' }
    ]
  },
  {
    id: 'm2',
    name: 'Deepika S',
    role: 'Lead Data Scientist',
    company: 'Microsoft',
    exp: '5 Yrs',
    location: 'Hyderabad, TS',
    rating: 4.8,
    reviewsCount: 29,
    menteesCount: 95,
    sessionsCount: 64,
    placedStudents: 22,
    pricing: 'Free',
    verified: true,
    verifiedCompany: true,
    category: 'Data Analytics',
    about: 'Data Scientist with 5+ years experience building ML models at Microsoft & Flipkart. Specialized in Python, SQL, Tableau, Power BI & Machine Learning algorithms.',
    skills: ['Python', 'SQL', 'Machine Learning', 'Power BI', 'Pandas'],
    availableSlots: ['Today 7:30 PM', 'Friday 8:00 PM', 'Sunday 11:00 AM'],
    aiMatchScore: 91,
    aiMatchReason: 'Recommended because you are learning SQL, Power BI & target Data Analyst positions.',
    reviews: [
      { name: 'Arjun P', rating: 5, text: 'Deepika guided me on building a strong ML portfolio project that landed me an internship!' }
    ]
  },
  {
    id: 'm3',
    name: 'Vikram N',
    role: 'Full Stack Architect',
    company: 'Zoho Corporation',
    exp: '7 Yrs',
    location: 'Chennai, TN',
    rating: 4.9,
    reviewsCount: 45,
    menteesCount: 150,
    sessionsCount: 110,
    placedStudents: 48,
    pricing: 'Free',
    verified: true,
    verifiedCompany: true,
    category: 'Web Development',
    about: 'Architecting scalable web applications at Zoho for 7 years. Specialized in React, Node.js, Express, Microservices & Low-Level Design.',
    skills: ['React', 'Node.js', 'MongoDB', 'System Design', 'LLD'],
    availableSlots: ['Tomorrow 5:00 PM', 'Saturday 2:00 PM'],
    aiMatchScore: 88,
    aiMatchReason: 'Recommended for Web Development roadmap & Zoho placement process guidance.',
    reviews: [
      { name: 'Karthik S', rating: 5, text: 'Vikram sir cleared all my doubts regarding Low Level Design for Zoho campus drive.' }
    ]
  },
  {
    id: 'm4',
    name: 'Meera Krishnan',
    role: 'HR & Talent Acquisition Lead',
    company: 'TCS',
    exp: '8 Yrs',
    location: 'Chennai, TN',
    rating: 4.9,
    reviewsCount: 52,
    menteesCount: 210,
    sessionsCount: 160,
    placedStudents: 75,
    pricing: 'Free',
    verified: true,
    verifiedCompany: true,
    category: 'Resume / ATS',
    about: 'HR leader with experience screening over 50,000+ student resumes for TCS NQT & campus hiring drives across South India.',
    skills: ['ATS Resume Optimization', 'HR Mock Interview', 'Salary Negotiation', 'Group Discussion'],
    availableSlots: ['Today 8:00 PM', 'Thursday 6:30 PM'],
    aiMatchScore: 85,
    aiMatchReason: 'Recommended for ATS resume feedback & HR round preparation.',
    reviews: [
      { name: 'Sneha I', rating: 5, text: 'Meera maam completely transformed my resume format! My ATS score jumped from 60 to 92.' }
    ]
  }
]

const CATEGORIES = [
  'All Categories', 'Job Search', 'Resume / ATS', 'Interview Preparation',
  'Coding', 'AI/ML', 'Data Analytics', 'Web Development', 'Cloud', 'Career Guidance'
]

export default function MentorConnect() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [filterPrice, setFilterPrice] = useState('All')

  const [detailModal, setDetailModal] = useState(null)
  const [bookingModal, setBookingModal] = useState(null)

  const [bookingSlot, setBookingSlot] = useState('')
  const [bookingMsg, setBookingMsg] = useState('')

  const filteredMentors = MOCK_MENTORS.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'All Categories' || m.category === selectedCategory
    const matchesPrice = filterPrice === 'All' || m.pricing === filterPrice
    return matchesSearch && matchesCategory && matchesPrice
  })

  const topRated = [...MOCK_MENTORS].sort((a, b) => b.rating - a.rating)[0]

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    if (!bookingSlot) { toast.error('Please select a time slot!'); return }
    toast.success(`🎉 30-min Session booked with ${bookingModal.name} for ${bookingSlot}! Confirmation sent to your email.`)
    setBookingModal(null)
    setBookingSlot('')
    setBookingMsg('')
  }

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #831843, #9d174d, #1e293b)', borderRadius: '1.5rem', padding: '2rem', marginBottom: '1.5rem', border: '1px solid rgba(244,114,182,0.3)' }}
      >
        <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '0.5rem' }}>
          👥 AI-Matched Industry Mentor Connect
        </h1>
        <p style={{ color: '#fbcfe8', marginBottom: '1.25rem' }}>
          Book 1-on-1 sessions with verified engineers & HR leaders from Google, Amazon, Microsoft, Zoho & TCS.
        </p>

        {/* Search & Filters */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="🔍 Search mentor by name, company, skill (e.g. Python, Google)..."
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            style={{ flex: 1, minWidth: '240px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
          />
          <select
            value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
            style={{ background: 'rgba(131,24,67,0.9)', border: '1px solid rgba(244,114,182,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </motion.div>

      {/* AI Mentor Match Highlight */}
      {topRated && (
        <div style={{ background: 'linear-gradient(135deg, rgba(244,114,182,0.12), rgba(192,132,252,0.06))', border: '1px solid rgba(244,114,182,0.3)', borderRadius: '1.25rem', padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '2.2rem' }}>🤖</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span style={{ color: '#f472b6', fontWeight: '800', fontSize: '1rem' }}>🤖 AI Best Mentor Match ({topRated.aiMatchScore}% Match)</span>
            </div>
            <div style={{ color: 'white', fontWeight: '700', fontSize: '1.05rem' }}>{topRated.name} — {topRated.role} @ {topRated.company}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: '0.2rem' }}>"{topRated.aiMatchReason}"</div>
          </div>
          <button
            onClick={() => setBookingModal(topRated)}
            style={{ padding: '0.65rem 1.25rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', color: 'white', fontWeight: '800', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            Book 30-min Session →
          </button>
        </div>
      )}

      {/* Mentors Grid */}
      <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.3rem', marginBottom: '1rem' }}>👨‍🏫 Available Mentors ({filteredMentors.length})</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {filteredMentors.map((m, index) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 }}
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: '800', color: 'white' }}>
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {m.name} {m.verifiedCompany && <span title="Company Verified" style={{ color: '#f472b6', fontSize: '0.85rem' }}>✅</span>}
                    </h3>
                    <p style={{ color: '#f472b6', fontWeight: '700', fontSize: '0.85rem' }}>{m.role} @ {m.company}</p>
                    <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{m.exp} Exp · {m.location}</p>
                  </div>
                </div>
                <div style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', padding: '0.2rem 0.55rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '800' }}>
                  ★ {m.rating} ({m.reviewsCount})
                </div>
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '0.82rem', marginBottom: '1rem', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {m.about}
              </p>

              {/* Stats Bar */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.4rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '0.6rem', marginBottom: '1rem', textAlign: 'center' }}>
                <div>
                  <div style={{ color: '#f472b6', fontWeight: '800', fontSize: '0.85rem' }}>{m.menteesCount}+</div>
                  <div style={{ color: '#64748b', fontSize: '0.68rem' }}>Mentees</div>
                </div>
                <div>
                  <div style={{ color: '#60a5fa', fontWeight: '800', fontSize: '0.85rem' }}>{m.sessionsCount}+</div>
                  <div style={{ color: '#64748b', fontSize: '0.68rem' }}>Sessions</div>
                </div>
                <div>
                  <div style={{ color: '#4ade80', fontWeight: '800', fontSize: '0.85rem' }}>{m.placedStudents}+</div>
                  <div style={{ color: '#64748b', fontSize: '0.68rem' }}>Placed</div>
                </div>
              </div>

              {/* Expertise Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                {m.skills.map(s => (
                  <span key={s} style={{ background: 'rgba(244,114,182,0.15)', color: '#f472b6', padding: '0.15rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.72rem', border: '1px solid rgba(244,114,182,0.3)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button
                onClick={() => setDetailModal(m)}
                style={{ flex: 1, padding: '0.6rem', borderRadius: '0.6rem', background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', fontWeight: '600', fontSize: '0.82rem', cursor: 'pointer' }}
              >
                👤 View Profile
              </button>
              <button
                onClick={() => setBookingModal(m)}
                style={{ flex: 1, padding: '0.6rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', color: 'white', border: 'none', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer' }}
              >
                📅 Book 30-min
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Profile Modal */}
      <AnimatePresence>
        {detailModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setDetailModal(null)}
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              style={{ background: 'linear-gradient(135deg, #831843, #0f172a)', border: '1px solid rgba(244,114,182,0.4)', borderRadius: '1.5rem', padding: '2rem', maxWidth: '600px', width: '100%', maxHeight: '85vh', overflowY: 'auto' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '55px', height: '55px', borderRadius: '50%', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: '800', color: 'white' }}>{detailModal.name.charAt(0)}</div>
                  <div>
                    <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem' }}>{detailModal.name}</h3>
                    <p style={{ color: '#f472b6', fontWeight: '700', fontSize: '0.88rem' }}>{detailModal.role} @ {detailModal.company}</p>
                  </div>
                </div>
                <button onClick={() => setDetailModal(null)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}>✕</button>
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '0.88rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>{detailModal.about}</p>

              <h4 style={{ color: '#f472b6', fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.5rem' }}>⭐ Mentee Reviews</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {detailModal.reviews.map((r, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.75rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                      <span style={{ color: 'white', fontWeight: '700', fontSize: '0.85rem' }}>{r.name}</span>
                      <span style={{ color: '#fbbf24', fontSize: '0.8rem' }}>★ {r.rating}.0</span>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>"{r.text}"</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => { setDetailModal(null); setBookingModal(detailModal); }}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', color: 'white', fontWeight: '700', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}
              >
                📅 Book 30-min Mentorship Session
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Session Modal */}
      <AnimatePresence>
        {bookingModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setBookingModal(null)}
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              style={{ background: 'linear-gradient(135deg, #831843, #0f172a)', border: '1px solid rgba(244,114,182,0.4)', borderRadius: '1.5rem', padding: '2rem', maxWidth: '500px', width: '100%' }}
              onClick={e => e.stopPropagation()}
            >
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '0.25rem' }}>📅 Book 30-min Session with {bookingModal.name}</h3>
              <p style={{ color: '#f472b6', fontSize: '0.85rem', marginBottom: '1.25rem' }}>{bookingModal.role} @ {bookingModal.company}</p>

              <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '600' }}>Select Available Time Slot</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {bookingModal.availableSlots.map(slot => (
                      <button
                        key={slot} type="button" onClick={() => setBookingSlot(slot)}
                        style={{
                          padding: '0.65rem 1rem', borderRadius: '0.6rem', textAlign: 'left', fontWeight: '600', fontSize: '0.88rem', cursor: 'pointer',
                          background: bookingSlot === slot ? 'linear-gradient(135deg, #ec4899, #8b5cf6)' : 'rgba(255,255,255,0.06)',
                          color: bookingSlot === slot ? 'white' : '#cbd5e1',
                          border: bookingSlot === slot ? 'none' : '1px solid rgba(255,255,255,0.1)'
                        }}
                      >
                        ⏱️ {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Message / Topic to Discuss</label>
                  <textarea
                    rows={3} required placeholder="What would you like guidance on? (e.g. Mock Interview, Resume Review)..."
                    value={bookingMsg} onChange={e => setBookingMsg(e.target.value)}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setBookingModal(null)} style={{ flex: 1, padding: '0.75rem', borderRadius: '0.6rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ flex: 1, padding: '0.75rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Confirm Booking</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
