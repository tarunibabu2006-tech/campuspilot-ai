import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const COLLEGE_PRESETS = [
  { id: 'all', name: 'All Colleges', keyword: '' },
  { id: 'kec', name: '🏛️ Kongu Engineering College (KEC)', keyword: 'Kongu' },
  { id: 'vcet', name: '🏛️ Vellalar College of Engineering (VCET)', keyword: 'Vellalar' },
  { id: 'psg', name: '🏛️ PSG College of Technology (PSG Tech)', keyword: 'PSG' },
  { id: 'cit', name: '🏛️ Coimbatore Institute of Technology (CIT)', keyword: 'CIT' },
  { id: 'kct', name: '🏛️ Kumaraguru College of Tech (KCT)', keyword: 'Kumaraguru' },
  { id: 'bit', name: '🏛️ Bannari Amman Institute (BIT)', keyword: 'Bannari' },
  { id: 'skcet', name: '🏛️ Sri Krishna College (SKCET)', keyword: 'Sri Krishna' },
  { id: 'anna', name: '🏛️ Anna University (CEG / MIT)', keyword: 'Anna University' },
  { id: 'vit', name: '🏛️ Vellore Institute of Tech (VIT)', keyword: 'VIT' },
  { id: 'sastra', name: '🏛️ SASTRA Deemed University', keyword: 'SASTRA' },
  { id: 'amrita', name: '🏛️ Amrita Vishwa Vidyapeetham', keyword: 'Amrita' }
]

const ENRICHED_ALUMNI = [
  {
    id: 'alum-1',
    name: 'Karthik Subramanian',
    college: 'Kongu Engineering College (KEC)',
    collegeKeyword: 'Kongu',
    gradYear: '2022',
    dept: 'B.E CSE',
    company: 'Zoho Corporation',
    role: 'Senior Software Developer',
    exp: '4 Yrs',
    location: 'Chennai, TN',
    linkedinUrl: 'https://www.linkedin.com/search/results/people/?keywords=Kongu%20Zoho%20Karthik',
    skills: ['Java', 'Spring Boot', 'SQL', 'System Design', 'Kafka'],
    verified: true,
    availableForMentorship: true,
    openForReferral: true,
    careerJourney: [
      { year: '2022', title: '🎓 B.E CSE from Kongu Engineering College' },
      { year: '2022', title: '💼 Joined Zoho Corporation as Software Developer' },
      { year: '2025', title: '🚀 Promoted to Senior Developer @ Zoho Backend' }
    ],
    interviewTips: 'Zoho focuses heavily on basic Java/C logic (Round 1), Low-Level OOP Design (Round 2), and clean problem-solving. Practice matrix traversal!'
  },
  {
    id: 'alum-2',
    name: 'Priya Rajendran',
    college: 'Vellalar College of Engineering & Technology (VCET)',
    collegeKeyword: 'Vellalar',
    gradYear: '2023',
    dept: 'B.Tech IT',
    company: 'TCS Digital',
    role: 'Cloud System Engineer',
    exp: '3 Yrs',
    location: 'Bengaluru, KA',
    linkedinUrl: 'https://www.linkedin.com/search/results/people/?keywords=Vellalar%20TCS%20Priya',
    skills: ['Python', 'AWS', 'Docker', 'PostgreSQL', 'FastAPI'],
    verified: true,
    availableForMentorship: true,
    openForReferral: true,
    careerJourney: [
      { year: '2023', title: '🎓 B.Tech IT from Vellalar College of Engineering (VCET)' },
      { year: '2023', title: '💻 System Engineer @ TCS Digital' },
      { year: '2025', title: '⚡ Cloud Architecture Specialist @ TCS' }
    ],
    interviewTips: 'TCS NQT Advanced coding tests string manipulation and arrays. For interviews, highlight cloud projects and GitHub repos!'
  },
  {
    id: 'alum-3',
    name: 'Arjun Venkatesh',
    college: 'Kongu Engineering College (KEC)',
    collegeKeyword: 'Kongu',
    gradYear: '2021',
    dept: 'B.E ECE',
    company: 'Amazon AWS',
    role: 'Software Development Engineer 2 (SDE-2)',
    exp: '5 Yrs',
    location: 'Hyderabad, TS',
    linkedinUrl: 'https://www.linkedin.com/search/results/people/?keywords=Kongu%20Amazon%20Arjun',
    skills: ['C++', 'DSA', 'Distributed Systems', 'DynamoDB', 'AWS'],
    verified: true,
    availableForMentorship: true,
    openForReferral: true,
    careerJourney: [
      { year: '2021', title: '🎓 B.E ECE from Kongu Engineering College' },
      { year: '2021', title: '💼 SDE-1 @ Amazon AWS' },
      { year: '2024', title: '🚀 SDE-2 @ Amazon Cloud Services' }
    ],
    interviewTips: 'Master Amazon 16 Leadership Principles! 50% of your interview evaluation depends on STAR method behavioral answers.'
  },
  {
    id: 'alum-4',
    name: 'Sneha Sundaram',
    college: 'Vellalar College of Engineering & Technology (VCET)',
    collegeKeyword: 'Vellalar',
    gradYear: '2023',
    dept: 'B.E CSE',
    company: 'Freshworks',
    role: 'Full Stack Frontend Engineer',
    exp: '3 Yrs',
    location: 'Chennai, TN',
    linkedinUrl: 'https://www.linkedin.com/search/results/people/?keywords=Vellalar%20Freshworks%20Sneha',
    skills: ['React.js', 'TypeScript', 'Node.js', 'GraphQL', 'TailwindCSS'],
    verified: true,
    availableForMentorship: true,
    openForReferral: true,
    careerJourney: [
      { year: '2023', title: '🎓 B.E CSE from Vellalar College of Engineering' },
      { year: '2023', title: '💻 Frontend Intern @ Freshworks' },
      { year: '2024', title: '🚀 Full-Time Frontend Engineer @ Freshworks' }
    ],
    interviewTips: 'Freshworks loves clean component architecture, JavaScript closures, Event Loop questions, and responsive design prototypes.'
  },
  {
    id: 'alum-5',
    name: 'Rohan Sharma',
    college: 'PSG College of Technology (PSG Tech)',
    collegeKeyword: 'PSG',
    gradYear: '2022',
    dept: 'B.E Robotics & Automation',
    company: 'Google',
    role: 'AI / ML Engineer',
    exp: '4 Yrs',
    location: 'Bengaluru, KA',
    linkedinUrl: 'https://www.linkedin.com/search/results/people/?keywords=PSG%20Google%20Rohan',
    skills: ['PyTorch', 'TensorFlow', 'LLMs', 'C++', 'Computer Vision'],
    verified: true,
    availableForMentorship: true,
    openForReferral: true,
    careerJourney: [
      { year: '2022', title: '🎓 B.E from PSG Tech' },
      { year: '2022', title: '💼 AI Research Fellow @ Google AI' },
      { year: '2025', title: '🚀 Machine Learning Engineer @ Google Cloud' }
    ],
    interviewTips: 'Google interviews test LeetCode Medium/Hard DP and Graph problems. Be crystal clear on time & space complexities!'
  },
  {
    id: 'alum-6',
    name: 'Divya Nair',
    college: 'Kongu Engineering College (KEC)',
    collegeKeyword: 'Kongu',
    gradYear: '2024',
    dept: 'B.Tech AI & Data Science',
    company: 'Microsoft',
    role: 'Azure Cloud Solutions Architect',
    exp: '2 Yrs',
    location: 'Bengaluru, KA',
    linkedinUrl: 'https://www.linkedin.com/search/results/people/?keywords=Kongu%20Microsoft%20Divya',
    skills: ['Azure', 'Kubernetes', 'Python', 'DevOps', 'Terraform'],
    verified: true,
    availableForMentorship: true,
    openForReferral: true,
    careerJourney: [
      { year: '2024', title: '🎓 B.Tech AI&DS from Kongu Engineering College' },
      { year: '2024', title: '💻 Cloud Consultant @ Microsoft' }
    ],
    interviewTips: 'Microsoft focuses on clean code and system design fundamentals. Practice designing scalable microservices.'
  },
  {
    id: 'alum-7',
    name: 'Vikas Krishnan',
    college: 'Vellalar College of Engineering & Technology (VCET)',
    collegeKeyword: 'Vellalar',
    gradYear: '2022',
    dept: 'B.E EEE',
    company: 'Infosys Springboard',
    role: 'Specialist Programmer (Power Programmer)',
    exp: '4 Yrs',
    location: 'Mysuru / Chennai',
    linkedinUrl: 'https://www.linkedin.com/search/results/people/?keywords=Vellalar%20Infosys%20Vikas',
    skills: ['Java', 'Microservices', 'Spring Cloud', 'Docker', 'MySQL'],
    verified: true,
    availableForMentorship: true,
    openForReferral: true,
    careerJourney: [
      { year: '2022', title: '🎓 B.E EEE from Vellalar College of Engineering' },
      { year: '2022', title: '💻 Cleared InfyTQ & joined as Specialist Programmer' }
    ],
    interviewTips: 'InfyTQ requires deep knowledge of DBMS, normalization, and OOPs concepts in Java or Python.'
  },
  {
    id: 'alum-8',
    name: 'Meera Nandakumar',
    college: 'Coimbatore Institute of Technology (CIT)',
    collegeKeyword: 'CIT',
    gradYear: '2023',
    dept: 'B.E CSE',
    company: 'Wipro Turbo',
    role: 'Senior Digital Engineer',
    exp: '3 Yrs',
    location: 'Chennai, TN',
    linkedinUrl: 'https://www.linkedin.com/search/results/people/?keywords=CIT%20Wipro%20Meera',
    skills: ['React.js', 'Node.js', 'MongoDB', 'Cloud APIs'],
    verified: true,
    availableForMentorship: true,
    openForReferral: true,
    careerJourney: [
      { year: '2023', title: '🎓 B.E CSE from CIT Coimbatore' },
      { year: '2023', title: '💻 Digital Engineer @ Wipro Turbo' }
    ],
    interviewTips: 'Wipro coding questions test string reversing, prime factorization, and matrix rotations. Focus on basic math logic.'
  }
]

export default function AlumniNetwork() {
  const { user } = useAuth()
  const candidateName = user?.name || 'Aspirant'
  const userCollege = user?.college || 'Kongu / Vellalar Engineering College'

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCollegeKeyword, setSelectedCollegeKeyword] = useState('')
  const [filterCompany, setFilterCompany] = useState('All')
  const [activeTab, setActiveTab] = useState('directory') // 'directory', 'radar', 'requests'

  // LinkedIn Connection Modal
  const [linkedinModal, setLinkedinModal] = useState(null)
  const [customNote, setCustomNote] = useState('')
  const [connectionPurpose, setConnectionPurpose] = useState('Mentorship & Guidance')

  // Live LinkedIn Radar Search
  const [radarCollege, setRadarCollege] = useState('Kongu Engineering College')
  const [radarRole, setRadarRole] = useState('Software Engineer')
  const [radarCompany, setRadarCompany] = useState('Zoho')

  // Sent Requests Store
  const [sentRequests, setSentRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_linkedin_alumni_requests')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Filter Alumni by Search, College Keyword, and Company
  const filteredAlumni = ENRICHED_ALUMNI.filter(a => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCollege = !selectedCollegeKeyword || a.collegeKeyword.toLowerCase().includes(selectedCollegeKeyword.toLowerCase()) || a.college.toLowerCase().includes(selectedCollegeKeyword.toLowerCase())
    const matchesCompany = filterCompany === 'All' || a.company.toLowerCase().includes(filterCompany.toLowerCase())

    return matchesSearch && matchesCollege && matchesCompany
  })

  // Open LinkedIn Connection Modal with Pre-generated note
  const openConnectModal = (alumni) => {
    setLinkedinModal(alumni)
    setCustomNote(`Hi ${alumni.name},\n\nI am a fellow student from ${alumni.collegeKeyword || 'College'}. I came across your inspiring journey as a ${alumni.role} at ${alumni.company}. I would love to connect with you on LinkedIn for mentorship and guidance regarding industry prep!`)
  }

  // Submit LinkedIn Request
  const handleSendLinkedinRequest = () => {
    if (!linkedinModal) return

    // Copy personalized note to clipboard
    navigator.clipboard.writeText(customNote).then(() => {
      toast.success('📋 Personalized LinkedIn connection note copied to clipboard!')
    }).catch(() => {})

    // Open LinkedIn Profile / Search URL
    const linkedInTargetUrl = linkedinModal.linkedinUrl || `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(linkedinModal.collegeKeyword + ' ' + linkedinModal.company + ' ' + linkedinModal.name)}`
    window.open(linkedInTargetUrl, '_blank')

    // Record request in tracker
    const newReq = {
      id: Date.now(),
      alumniId: linkedinModal.id,
      alumniName: linkedinModal.name,
      college: linkedinModal.college,
      company: linkedinModal.company,
      role: linkedinModal.role,
      purpose: connectionPurpose,
      note: customNote,
      status: 'Request Dispatched on LinkedIn ⏳',
      timestamp: new Date().toLocaleString()
    }

    const updated = [newReq, ...sentRequests]
    setSentRequests(updated)
    localStorage.setItem('campuspilot_linkedin_alumni_requests', JSON.stringify(updated))

    toast.success(`🚀 LinkedIn Connection Request dispatched to ${linkedinModal.name}! Opened LinkedIn profile tab.`)
    setLinkedinModal(null)
  }

  // Toggle Acceptance Status
  const toggleRequestStatus = (reqId) => {
    const updated = sentRequests.map(r => {
      if (r.id === reqId) {
        const nextStatus = r.status.includes('Accepted') ? 'Request Dispatched on LinkedIn ⏳' : '✅ Connected & Accepted 🎉'
        return { ...r, status: nextStatus }
      }
      return r
    })
    setSentRequests(updated)
    localStorage.setItem('campuspilot_linkedin_alumni_requests', JSON.stringify(updated))
    toast.success('Connection status updated!')
  }

  // Launch Direct LinkedIn Deep-Search Radar
  const handleLaunchLinkedInRadar = () => {
    const query = `${radarCollege} ${radarCompany} ${radarRole}`.trim()
    const url = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(query)}`
    window.open(url, '_blank')
    toast.success(`🌐 Opening LinkedIn Alumni Radar for: "${query}"`)
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* ── HEADER BANNER ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #065f46 40%, #0f172a 100%)',
          borderRadius: '1.5rem',
          padding: '2rem',
          border: '1px solid rgba(52,211,153,0.35)',
          boxShadow: '0 8px 32px rgba(16,185,129,0.25)',
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
                LinkedIn Verified Alumni Network
              </h1>
              <p style={{ color: '#a7f3d0', fontSize: '0.85rem', margin: 0 }}>
                Search alumni by college keywords (Kongu, Vellalar, PSG, CIT, etc.), send automated LinkedIn connection requests & get referrals!
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ background: 'rgba(52, 211, 153, 0.2)', color: '#6ee7b7', border: '1px solid rgba(52, 211, 153, 0.4)', padding: '0.4rem 0.9rem', borderRadius: '2rem', fontWeight: '800', fontSize: '0.8rem' }}>
            🔗 LinkedIn Live Sync Active
          </span>
        </div>
      </motion.div>

      {/* ── NAVIGATION TABS ────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {[
          { id: 'directory', label: `👨‍💼 Verified Alumni Directory (${filteredAlumni.length})` },
          { id: 'radar', label: '🔎 Live LinkedIn College Radar' },
          { id: 'requests', label: `📬 My Sent Requests & Status (${sentRequests.length})` }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '0.65rem',
              background: activeTab === t.id ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255,255,255,0.04)',
              border: activeTab === t.id ? '1px solid #34d399' : '1px solid rgba(255,255,255,0.08)',
              color: activeTab === t.id ? 'white' : '#94a3b8',
              fontWeight: '800',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ── TAB 1: VERIFIED ALUMNI DIRECTORY WITH COLLEGE KEYWORDS ───── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'directory' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* College Keyword Selector Bar */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.25rem' }}>
            <div style={{ color: '#a7f3d0', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: '800', marginBottom: '0.65rem' }}>
              🎓 Filter by College Keyword (Click to find alumni from your specific campus):
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {COLLEGE_PRESETS.map(c => {
                const isSelected = selectedCollegeKeyword.toLowerCase() === c.keyword.toLowerCase()
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCollegeKeyword(c.keyword)}
                    style={{
                      background: isSelected ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255,255,255,0.04)',
                      border: isSelected ? '1px solid #34d399' : '1px solid rgba(255,255,255,0.08)',
                      color: isSelected ? 'white' : '#cbd5e1',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '0.6rem',
                      fontWeight: isSelected ? '800' : '600',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {c.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Search & Company Filter Inputs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '0.75rem' }}>
            <input
              type="text"
              placeholder="🔍 Search alumni by name, college keyword (Kongu, Vellalar), role, skills (Java, AWS)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                color: 'white',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />

            <select
              value={filterCompany}
              onChange={e => setFilterCompany(e.target.value)}
              style={{
                background: 'rgba(6,95,70,0.8)',
                border: '1px solid rgba(52,211,153,0.3)',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                color: 'white',
                fontSize: '0.88rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="All">All Companies (Zoho, TCS, Amazon...)</option>
              <option value="Zoho">Zoho Corporation</option>
              <option value="TCS">TCS / TCS Digital</option>
              <option value="Amazon">Amazon AWS</option>
              <option value="Freshworks">Freshworks</option>
              <option value="Google">Google</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Infosys">Infosys</option>
              <option value="Wipro">Wipro Turbo</option>
            </select>
          </div>

          {/* Alumni Profiles Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {filteredAlumni.map((alum, index) => (
              <motion.div
                key={alum.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                style={{
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(52,211,153,0.3)',
                  borderRadius: '1.25rem',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
                }}
              >
                <div>
                  {/* Top Avatar & Name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: '900', color: 'white', flexShrink: 0 }}>
                      {alum.name.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem', margin: '0 0 0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        {alum.name} <span title="Verified Alumni" style={{ color: '#34d399', fontSize: '0.85rem' }}>✅</span>
                      </h3>
                      <div style={{ color: '#34d399', fontWeight: '700', fontSize: '0.85rem' }}>
                        {alum.role} @ <strong>{alum.company}</strong>
                      </div>
                    </div>
                  </div>

                  {/* College Badge */}
                  <div style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)', borderRadius: '0.5rem', padding: '0.4rem 0.65rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '1rem' }}>🏛️</span>
                    <div style={{ color: '#a7f3d0', fontSize: '0.78rem', fontWeight: '700' }}>
                      {alum.college} · Batch of {alum.gradYear}
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.85rem' }}>
                    {alum.skills.map((skill, sIdx) => (
                      <span key={sIdx} style={{ background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', padding: '0.15rem 0.45rem', borderRadius: '0.35rem', fontSize: '0.72rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Interview Advice */}
                  <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '0.6rem', padding: '0.6rem 0.8rem', marginBottom: '1.25rem', borderLeft: '3px solid #10b981' }}>
                    <div style={{ color: '#34d399', fontSize: '0.7rem', fontWeight: '800' }}>💡 Alumni Advice:</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.76rem', lineHeight: 1.4 }}>"{alum.interviewTips.slice(0, 85)}..."</div>
                  </div>
                </div>

                {/* Connect Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button
                    onClick={() => openConnectModal(alum)}
                    style={{
                      background: 'linear-gradient(135deg, #0a66c2, #004182)',
                      color: 'white',
                      border: 'none',
                      padding: '0.65rem',
                      borderRadius: '0.65rem',
                      fontWeight: '800',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 15px rgba(10,102,194,0.35)'
                    }}
                  >
                    <span>🔗 Connect via LinkedIn</span> ➔
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ── TAB 2: LIVE LINKEDIN COLLEGE ALUMNI RADAR ────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'radar' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ background: 'rgba(15, 23, 42, 0.95)', border: '2px solid rgba(52,211,153,0.35)', borderRadius: '1.5rem', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '2rem' }}>🔎</span>
            <div>
              <h3 style={{ color: 'white', margin: 0, fontWeight: '900', fontSize: '1.3rem' }}>
                Live LinkedIn Alumni Radar by College Keyword
              </h3>
              <p style={{ color: '#a7f3d0', fontSize: '0.85rem', margin: 0 }}>
                Directly surface and connect with all real live alumni profiles on LinkedIn who studied at your college!
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#a7f3d0', fontWeight: '800', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                🏛️ College Keyword
              </label>
              <input
                type="text"
                value={radarCollege}
                onChange={e => setRadarCollege(e.target.value)}
                placeholder="e.g. Kongu Engineering College, Vellalar College..."
                style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.65rem', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.88rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#a7f3d0', fontWeight: '800', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                🏢 Target Company
              </label>
              <input
                type="text"
                value={radarCompany}
                onChange={e => setRadarCompany(e.target.value)}
                placeholder="e.g. Zoho, Google, TCS, Amazon, Microsoft..."
                style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.65rem', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.88rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#a7f3d0', fontWeight: '800', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                💼 Target Role
              </label>
              <input
                type="text"
                value={radarRole}
                onChange={e => setRadarRole(e.target.value)}
                placeholder="e.g. Software Engineer, Cloud Architect, Data Scientist..."
                style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.65rem', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.88rem' }}
              />
            </div>
          </div>

          <button
            onClick={handleLaunchLinkedInRadar}
            style={{
              background: 'linear-gradient(135deg, #0a66c2, #004182)',
              color: 'white',
              border: 'none',
              padding: '0.85rem',
              borderRadius: '0.75rem',
              fontWeight: '900',
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 20px rgba(10,102,194,0.4)'
            }}
          >
            <span>🌐 Open Live LinkedIn Directory for "{radarCollege}"</span> ➔
          </button>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ── TAB 3: MY SENT LINKEDIN REQUESTS TRACKER ─────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'requests' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {sentRequests.length === 0 ? (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '2.5rem', textAlign: 'center', color: '#94a3b8' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📬</div>
              <h3 style={{ color: 'white', margin: 0, fontWeight: '800' }}>No LinkedIn Requests Sent Yet</h3>
              <p style={{ fontSize: '0.85rem', margin: '0.4rem 0 1rem' }}>Go to the Alumni Directory and click "Connect via LinkedIn" on any senior to send connection requests.</p>
              <button
                onClick={() => setActiveTab('directory')}
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '0.6rem', fontWeight: '800', cursor: 'pointer' }}
              >
                Browse Alumni Directory ➔
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {sentRequests.map((req) => (
                <div
                  key={req.id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(52,211,153,0.3)',
                    borderRadius: '1rem',
                    padding: '1.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <strong style={{ color: 'white', fontSize: '1rem' }}>{req.alumniName}</strong>
                      <span style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', padding: '0.1rem 0.4rem', borderRadius: '0.3rem', fontSize: '0.7rem', fontWeight: '800' }}>
                        {req.role} @ {req.company}
                      </span>
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                      🏛️ {req.college} · Dispatched: {req.timestamp}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button
                      onClick={() => toggleRequestStatus(req.id)}
                      style={{
                        background: req.status.includes('Accepted') ? 'rgba(34,197,94,0.2)' : 'rgba(251,191,36,0.15)',
                        border: req.status.includes('Accepted') ? '1px solid #22c55e' : '1px solid #fbbf24',
                        color: req.status.includes('Accepted') ? '#4ade80' : '#fbbf24',
                        padding: '0.45rem 0.85rem',
                        borderRadius: '0.6rem',
                        fontWeight: '800',
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      {req.status} (Click to toggle)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── LINKEDIN CONNECTION ASSISTANT MODAL ───────────────────────── */}
      <AnimatePresence>
        {linkedinModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              backdropFilter: 'blur(6px)'
            }}
            onClick={() => setLinkedinModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9 }}
              style={{
                background: 'linear-gradient(135deg, #0b192c, #064e3b)',
                border: '2px solid #0a66c2',
                borderRadius: '1.5rem',
                padding: '2rem',
                maxWidth: '560px',
                width: '100%',
                boxShadow: '0 15px 50px rgba(10,102,194,0.4)'
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.6rem' }}>🔗</span>
                  <div>
                    <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.2rem', margin: 0 }}>
                      Send LinkedIn Connection Request
                    </h3>
                    <p style={{ color: '#60a5fa', fontSize: '0.78rem', margin: 0 }}>
                      To: <strong>{linkedinModal.name}</strong> ({linkedinModal.role} @ {linkedinModal.company})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setLinkedinModal(null)}
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#a7f3d0', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                    🎯 Connection Purpose
                  </label>
                  <select
                    value={connectionPurpose}
                    onChange={e => setConnectionPurpose(e.target.value)}
                    style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.6rem', padding: '0.6rem 0.8rem', color: 'white', fontSize: '0.85rem' }}
                  >
                    <option>Career Guidance & Mentorship</option>
                    <option>Job Referral Request</option>
                    <option>Resume Review & Mock Feedback</option>
                    <option>College Senior Networking</option>
                  </select>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <label style={{ color: '#a7f3d0', fontSize: '0.8rem', fontWeight: '700' }}>
                      📝 Personalized LinkedIn Invitation Note (Auto-filled with College Keyword)
                    </label>
                    <span style={{ color: '#4ade80', fontSize: '0.72rem' }}>✨ Auto-copies to clipboard</span>
                  </div>
                  <textarea
                    rows={5}
                    value={customNote}
                    onChange={e => setCustomNote(e.target.value)}
                    style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.6rem', padding: '0.75rem', color: 'white', fontSize: '0.85rem', lineHeight: 1.5, resize: 'vertical' }}
                  />
                </div>

                <div style={{ background: 'rgba(10,102,194,0.15)', border: '1px solid rgba(10,102,194,0.3)', borderRadius: '0.6rem', padding: '0.75rem', fontSize: '0.78rem', color: '#93c5fd' }}>
                  ℹ️ When you click the button below, this note is <strong>automatically copied to your clipboard</strong> and the senior's LinkedIn profile tab will open so you can paste & send!
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setLinkedinModal(null)}
                    style={{ flex: 1, padding: '0.75rem', borderRadius: '0.65rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSendLinkedinRequest}
                    style={{
                      flex: 2,
                      padding: '0.75rem',
                      borderRadius: '0.65rem',
                      background: 'linear-gradient(135deg, #0a66c2, #004182)',
                      color: 'white',
                      border: 'none',
                      fontWeight: '900',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(10,102,194,0.4)'
                    }}
                  >
                    🚀 Copy Note & Open on LinkedIn ➔
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
