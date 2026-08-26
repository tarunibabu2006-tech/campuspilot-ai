import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const MOCK_ALUMNI = [
  {
    id: '1',
    name: 'Karthik Subbaraj',
    gradYear: '2023',
    dept: 'B.Sc CS',
    company: 'Zoho Corporation',
    role: 'Senior Software Developer',
    exp: '3 Yrs',
    location: 'Chennai, TN',
    skills: ['Java', 'Spring Boot', 'SQL', 'System Design'],
    verified: true,
    availableForMentorship: true,
    openForReferral: true,
    careerJourney: [
      { year: '2023', title: '🎓 B.Sc CS Graduate' },
      { year: '2023', title: '💼 Software Intern @ Zoho' },
      { year: '2024', title: '💻 Software Developer @ Zoho' },
      { year: '2026', title: '🚀 Senior Developer @ Zoho' }
    ],
    interviewTips: 'Zoho focuses heavily on Low-Level Design (Round 3) and clean code logic in Round 2. Master OOPs!'
  },
  {
    id: '2',
    name: 'Ananya Ramesh',
    gradYear: '2024',
    dept: 'B.Tech CSE',
    company: 'TCS Digital',
    role: 'Digital System Engineer',
    exp: '2 Yrs',
    location: 'Bengaluru, KA',
    skills: ['Python', 'Django', 'AWS', 'PostgreSQL'],
    verified: true,
    availableForMentorship: true,
    openForReferral: true,
    careerJourney: [
      { year: '2024', title: '🎓 B.Tech CSE Graduate' },
      { year: '2024', title: '💻 System Engineer @ TCS' },
      { year: '2025', title: '⚡ Promoted to TCS Digital' }
    ],
    interviewTips: 'NQT Aptitude is easy if you practice R.S. Aggarwal. For coding, practice string manipulation.'
  },
  {
    id: '3',
    name: 'Mohammed Rizwan',
    gradYear: '2022',
    dept: 'BCA',
    company: 'Amazon',
    role: 'SDE-2',
    exp: '4 Yrs',
    location: 'Hyderabad, TS',
    skills: ['C++', 'DSA', 'System Design', 'Distributed Systems'],
    verified: true,
    availableForMentorship: false,
    openForReferral: true,
    careerJourney: [
      { year: '2022', title: '🎓 BCA Graduate' },
      { year: '2022', title: '💻 SDE-1 @ Amazon' },
      { year: '2025', title: '🚀 SDE-2 @ Amazon' }
    ],
    interviewTips: 'Prepare Leadership Principles thoroughly! Every interview round has 20-30 mins of behavioral questions.'
  },
  {
    id: '4',
    name: 'Priya Rajendran',
    gradYear: '2024',
    dept: 'B.Com CA',
    company: 'Freshworks',
    role: 'Product Analyst',
    exp: '2 Yrs',
    location: 'Chennai, TN',
    skills: ['Power BI', 'SQL', 'Data Analytics', 'Excel'],
    verified: true,
    availableForMentorship: true,
    openForReferral: false,
    careerJourney: [
      { year: '2024', title: '🎓 B.Com CA Graduate' },
      { year: '2024', title: '📊 Data Analyst Intern' },
      { year: '2025', title: '💼 Product Analyst @ Freshworks' }
    ],
    interviewTips: 'Commerce students can easily switch to Data Analytics if you master SQL & Power BI dashboards!'
  }
]

const COMPANY_STATS = [
  { company: 'Zoho', alumniCount: 24, mentorshipOpen: 12, referralsOpen: 18 },
  { company: 'TCS', alumniCount: 42, mentorshipOpen: 20, referralsOpen: 30 },
  { company: 'Amazon', alumniCount: 12, mentorshipOpen: 5, referralsOpen: 8 },
  { company: 'Infosys', alumniCount: 35, mentorshipOpen: 15, referralsOpen: 25 },
  { company: 'Freshworks', alumniCount: 16, mentorshipOpen: 8, referralsOpen: 11 }
]

export default function AlumniNetwork() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCompany, setFilterCompany] = useState('All')
  const [filterDept, setFilterDept] = useState('All')

  const [referralModal, setReferralModal] = useState(null)
  const [adviceModal, setAdviceModal] = useState(null)
  const [journeyModal, setJourneyModal] = useState(null)
  const [becomeMentorModal, setBecomeMentorModal] = useState(false)

  const [referralForm, setReferralForm] = useState({ jobRole: '', jobLink: '', message: '', resumeAttached: true })
  const [adviceForm, setAdviceForm] = useState({ question: '', topic: 'Career Guidance' })

  const filteredAlumni = MOCK_ALUMNI.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCompany = filterCompany === 'All' || a.company === filterCompany
    const matchesDept = filterDept === 'All' || a.dept === filterDept
    return matchesSearch && matchesCompany && matchesDept
  })

  const handleReferralSubmit = (e) => {
    e.preventDefault()
    toast.success(`📩 Referral request sent to ${referralModal.name} at ${referralModal.company}!`)
    setReferralModal(null)
  }

  const handleAdviceSubmit = (e) => {
    e.preventDefault()
    toast.success(`💬 Question submitted! ${adviceModal.name} will reply soon.`)
    setAdviceModal(null)
  }

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #065f46, #047857, #1e293b)', borderRadius: '1.5rem', padding: '2rem', marginBottom: '1.5rem', border: '1px solid rgba(52,211,153,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
      >
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '0.5rem' }}>
            🤝 Verified Alumni Network & Referrals
          </h1>
          <p style={{ color: '#a7f3d0' }}>
            Connect with placed seniors, request job referrals, ask career advice & trace real alumni journeys.
          </p>
        </div>
        <button
          onClick={() => setBecomeMentorModal(true)}
          style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', fontWeight: '800', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(16,185,129,0.4)', whiteSpace: 'nowrap' }}
        >
          🧑‍🏫 Become a Mentor
        </button>
      </motion.div>

      {/* Company-wise Alumni Highlights */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <h3 style={{ color: '#34d399', fontWeight: '800', fontSize: '1.05rem', marginBottom: '0.75rem' }}>🏢 Company-wise Alumni Community</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {COMPANY_STATS.map(c => (
            <div key={c.company} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '0.75rem', padding: '0.75rem 1rem' }}>
              <div style={{ color: 'white', fontWeight: '700', fontSize: '0.95rem' }}>{c.company}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: '0.2rem' }}>👥 {c.alumniCount} Alumni</div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem', fontSize: '0.7rem' }}>
                <span style={{ color: '#34d399' }}>🤝 {c.referralsOpen} Referrals</span>
                <span style={{ color: '#60a5fa' }}>🧑‍🏫 {c.mentorshipOpen} Mentors</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filters */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="🔍 Search alumni by name, role, skills (e.g. Python, Developer)..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ flex: 1, minWidth: '240px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
        />
        <select
          value={filterCompany} onChange={e => setFilterCompany(e.target.value)}
          style={{ background: 'rgba(6,95,70,0.9)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
        >
          <option value="All">All Companies</option>
          <option value="Zoho">Zoho</option>
          <option value="TCS Digital">TCS Digital</option>
          <option value="Amazon">Amazon</option>
          <option value="Freshworks">Freshworks</option>
        </select>
      </div>

      {/* Alumni Directory Grid */}
      <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.3rem', marginBottom: '1rem' }}>👨‍💼 Alumni Directory ({filteredAlumni.length})</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {filteredAlumni.map((alum, index) => (
          <motion.div
            key={alum.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 }}
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: '800', color: 'white' }}>
                  {alum.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {alum.name} {alum.verified && <span title="Verified Alumni" style={{ color: '#34d399', fontSize: '0.85rem' }}>✅</span>}
                  </h3>
                  <p style={{ color: '#34d399', fontWeight: '700', fontSize: '0.85rem' }}>{alum.role} @ {alum.company}</p>
                  <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{alum.dept} · Batch of {alum.gradYear} · {alum.location}</p>
                </div>
              </div>

              {/* Skills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                {alum.skills.map(skill => (
                  <span key={skill} style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', padding: '0.15rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.72rem', border: '1px solid rgba(52,211,153,0.3)' }}>
                    {skill}
                  </span>
                ))}
              </div>

              {/* Interview Tip Preview */}
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.6rem', padding: '0.6rem 0.8rem', marginBottom: '1rem', borderLeft: '3px solid #34d399' }}>
                <div style={{ color: '#34d399', fontSize: '0.7rem', fontWeight: '700' }}>💡 Interview Advice</div>
                <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>"{alum.interviewTips.slice(0, 75)}..."</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button
                  onClick={() => setAdviceModal(alum)}
                  style={{ flex: 1, padding: '0.5rem', borderRadius: '0.6rem', background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  💬 Ask Advice
                </button>
                <button
                  onClick={() => setJourneyModal(alum)}
                  style={{ flex: 1, padding: '0.5rem', borderRadius: '0.6rem', background: 'rgba(52,211,153,0.15)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  🚀 Career Journey
                </button>
              </div>
              {alum.openForReferral && (
                <button
                  onClick={() => setReferralModal(alum)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  📄 Request Referral at {alum.company}
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Referral Request Modal */}
      <AnimatePresence>
        {referralModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setReferralModal(null)}
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              style={{ background: 'linear-gradient(135deg, #064e3b, #111827)', border: '1px solid rgba(52,211,153,0.4)', borderRadius: '1.5rem', padding: '2rem', maxWidth: '500px', width: '100%' }}
              onClick={e => e.stopPropagation()}
            >
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '0.25rem' }}>📄 Request Referral from {referralModal.name}</h3>
              <p style={{ color: '#34d399', fontSize: '0.85rem', marginBottom: '1.25rem' }}>{referralModal.role} @ {referralModal.company}</p>

              <form onSubmit={handleReferralSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Job Title / Role Target</label>
                  <input
                    type="text" required placeholder="e.g. Software Engineer / Data Analyst" value={referralForm.jobRole} onChange={e => setReferralForm({ ...referralForm, jobRole: e.target.value })}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Job Opening Link (Optional)</label>
                  <input
                    type="url" placeholder="https://careers.company.com/job/123" value={referralForm.jobLink} onChange={e => setReferralForm({ ...referralForm, jobLink: e.target.value })}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Short Message to Alumni</label>
                  <textarea
                    rows={3} required placeholder="Hi! I am a final year CS student with Python & SQL skills..." value={referralForm.message} onChange={e => setReferralForm({ ...referralForm, message: e.target.value })}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontSize: '0.82rem' }}>
                  <span>✓ Profile Resume Attached Automatically</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setReferralModal(null)} style={{ flex: 1, padding: '0.75rem', borderRadius: '0.6rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ flex: 1, padding: '0.75rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Send Request</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ask Advice Modal */}
      <AnimatePresence>
        {adviceModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setAdviceModal(null)}
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              style={{ background: 'linear-gradient(135deg, #0f172a, #064e3b)', border: '1px solid rgba(52,211,153,0.4)', borderRadius: '1.5rem', padding: '2rem', maxWidth: '500px', width: '100%' }}
              onClick={e => e.stopPropagation()}
            >
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '0.25rem' }}>💬 Ask Career Advice — {adviceModal.name}</h3>
              <p style={{ color: '#34d399', fontSize: '0.85rem', marginBottom: '1.25rem' }}>{adviceModal.role} @ {adviceModal.company}</p>

              <form onSubmit={handleAdviceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Advice Topic</label>
                  <select
                    value={adviceForm.topic} onChange={e => setAdviceForm({ ...adviceForm, topic: e.target.value })}
                    style={{ width: '100%', background: 'rgba(6,95,70,0.9)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
                  >
                    <option>Career Guidance</option>
                    <option>Interview Preparation</option>
                    <option>Resume Review Tips</option>
                    <option>Skill Development</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Your Question</label>
                  <textarea
                    rows={4} required placeholder="Ask about preparation tips, tech stack, rounds..." value={adviceForm.question} onChange={e => setAdviceForm({ ...adviceForm, question: e.target.value })}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setAdviceModal(null)} style={{ flex: 1, padding: '0.75rem', borderRadius: '0.6rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ flex: 1, padding: '0.75rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Submit Question</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Career Journey Flow Modal */}
      <AnimatePresence>
        {journeyModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setJourneyModal(null)}
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              style={{ background: 'linear-gradient(135deg, #064e3b, #0f172a)', border: '1px solid rgba(52,211,153,0.4)', borderRadius: '1.5rem', padding: '2rem', maxWidth: '550px', width: '100%' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem' }}>🚀 Career Journey — {journeyModal.name}</h3>
                  <p style={{ color: '#34d399', fontSize: '0.85rem' }}>{journeyModal.dept} Grad → {journeyModal.company}</p>
                </div>
                <button onClick={() => setJourneyModal(null)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}>✕</button>
              </div>

              {/* Journey Stepper */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ position: 'absolute', left: '7px', top: '10px', bottom: '10px', width: '2px', background: '#34d399' }} />
                {journeyModal.careerJourney.map((step, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-1.5rem', top: '3px', width: '12px', height: '12px', borderRadius: '50%', background: '#34d399', border: '2px solid #064e3b' }} />
                    <span style={{ color: '#34d399', fontSize: '0.75rem', fontWeight: '700' }}>{step.year}</span>
                    <div style={{ color: 'white', fontWeight: '700', fontSize: '0.95rem' }}>{step.title}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ color: '#34d399', fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.3rem' }}>🔑 Recommended Preparation Tips:</div>
                <p style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>"{journeyModal.interviewTips}"</p>
              </div>

              <button onClick={() => setJourneyModal(null)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.6rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Close Journey View</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Become a Mentor Modal */}
      <AnimatePresence>
        {becomeMentorModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setBecomeMentorModal(false)}
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              style={{ background: 'linear-gradient(135deg, #064e3b, #0f172a)', border: '1px solid rgba(52,211,153,0.4)', borderRadius: '1.5rem', padding: '2rem', maxWidth: '500px', width: '100%' }}
              onClick={e => e.stopPropagation()}
            >
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '0.25rem' }}>🧑‍🏫 Register as an Alumni Mentor</h3>
              <p style={{ color: '#34d399', fontSize: '0.85rem', marginBottom: '1.25rem' }}>Guide current college students & help them secure dream placements!</p>

              <form onSubmit={e => { e.preventDefault(); toast.success('🎉 Mentor registration submitted for verification!'); setBecomeMentorModal(false); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Mentoring Domain / Focus Areas</label>
                  <input type="text" required placeholder="e.g. System Design, Resume Review, Python Coding" style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Available Hours / Week</label>
                  <select style={{ width: '100%', background: 'rgba(6,95,70,0.9)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}>
                    <option>1-2 Hours (Weekends)</option>
                    <option>3-5 Hours</option>
                    <option>Flexible / As Needed</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setBecomeMentorModal(false)} style={{ flex: 1, padding: '0.75rem', borderRadius: '0.6rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ flex: 1, padding: '0.75rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Submit Verification</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
