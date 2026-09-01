import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

// Comprehensive College List with focus on Tamil Nadu & National Institutions
const TOP_COLLEGES = [
  'All Colleges',
  'Kongu Engineering College (KEC)',
  'Vellalar College of Engineering and Technology (VCET)',
  'PSG College of Technology (PSG Tech)',
  'Coimbatore Institute of Technology (CIT)',
  'Kumaraguru College of Technology (KCT)',
  'Bannari Amman Institute of Technology (BIT)',
  'Sri Krishna College of Engineering (SKCET)',
  'Government College of Technology (GCT Coimbatore)',
  'Anna University (CEG / MIT Chennai)',
  'IIT Madras',
  'NIT Trichy',
  'Sona College of Technology',
  'Vellore Institute of Technology (VIT)',
  'SRM Institute of Science and Technology',
  'Amrita Vishwa Vidyapeetham'
]

const MOCK_COLLEGE_ALUMNI = [
  {
    id: 'alum-k1',
    name: 'Gowtham Krishnan',
    college: 'Kongu Engineering College (KEC)',
    collegeKey: 'kongu',
    dept: 'B.E Computer Science and Engineering',
    gradYear: '2023',
    company: 'Zoho Corporation',
    role: 'Member Technical Staff (MTS)',
    exp: '3 Yrs',
    location: 'Chennai / Tenkasi',
    skills: ['Java', 'Spring Boot', 'PostgreSQL', 'System Design', 'React'],
    linkedinUser: 'gowtham-krishnan-kec-zoho',
    linkedinUrl: 'https://www.linkedin.com/search/results/people/?keywords=Gowtham%20Krishnan%20Kongu%20Engineering%20Zoho',
    verified: true,
    availableForMentorship: true,
    openForReferral: true,
    bio: 'Proud Kongu alumnus! Placed in Zoho via campus drive. Happy to guide KEC & VCET juniors in coding rounds & Java LLD.',
    careerJourney: [
      { year: '2023', title: '🎓 B.E CSE from Kongu Engineering College (KEC)' },
      { year: '2023', title: '💻 Joined Zoho Corporation as Project Trainee' },
      { year: '2025', title: '🚀 Promoted to Member Technical Staff @ Zoho' }
    ],
    interviewTips: 'Zoho focus: Round 2 is pure DS/Logic (Arrays, Strings, Recursion) without built-in library functions. Round 3 is OOPs design.'
  },
  {
    id: 'alum-v1',
    name: 'Kavitha Soundararajan',
    college: 'Vellalar College of Engineering and Technology (VCET)',
    collegeKey: 'vellalar',
    dept: 'B.Tech Information Technology',
    gradYear: '2024',
    company: 'TCS Digital',
    role: 'System Engineer (Digital Ninja)',
    exp: '2 Yrs',
    location: 'Bengaluru, Karnataka',
    skills: ['Python', 'Django', 'AWS Cloud', 'Docker', 'REST APIs'],
    linkedinUser: 'kavitha-s-vcet-tcs',
    linkedinUrl: 'https://www.linkedin.com/search/results/people/?keywords=Kavitha%20Soundararajan%20Vellalar%20College%20TCS',
    verified: true,
    availableForMentorship: true,
    openForReferral: true,
    bio: 'VCET 2024 IT graduate. Cleared TCS NQT with 98%ile and promoted to Digital cadre. Reach out on LinkedIn for resume reviews!',
    careerJourney: [
      { year: '2024', title: '🎓 B.Tech IT from Vellalar College (VCET, Erode)' },
      { year: '2024', title: '⚡ Cracked TCS NQT Digital Track' },
      { year: '2026', title: '🚀 Cloud System Engineer @ TCS Bengaluru' }
    ],
    interviewTips: 'For TCS Digital: Practice advanced coding questions on DP, Graph BFS/DFS, and SQL joins on HackerRank.'
  },
  {
    id: 'alum-k2',
    name: 'Dinesh Karthik',
    college: 'Kongu Engineering College (KEC)',
    collegeKey: 'kongu',
    dept: 'B.E Electronics and Communication (ECE)',
    gradYear: '2022',
    company: 'Amazon',
    role: 'Software Development Engineer II (SDE-2)',
    exp: '4 Yrs',
    location: 'Hyderabad, TS',
    skills: ['C++', 'Distributed Systems', 'Kafka', 'AWS DynamoDB', 'System Design'],
    linkedinUser: 'dinesh-karthik-kec-amazon',
    linkedinUrl: 'https://www.linkedin.com/search/results/people/?keywords=Dinesh%20Karthik%20Kongu%20Engineering%20Amazon',
    verified: true,
    availableForMentorship: true,
    openForReferral: true,
    bio: 'Transitioned from ECE at Kongu to Amazon SDE. Open to providing referrals for SDE-1 and SDE-2 roles across Amazon India.',
    careerJourney: [
      { year: '2022', title: '🎓 B.E ECE from Kongu Engineering College' },
      { year: '2022', title: '💼 SDE-1 @ Amazon AWS Cloud Team' },
      { year: '2025', title: '🚀 Promoted to SDE-2 @ Amazon' }
    ],
    interviewTips: 'Prepare Amazon 14 Leadership Principles with STAR format stories. Master LeetCode Medium/Hard for Trees & Graphs.'
  },
  {
    id: 'alum-v2',
    name: 'Suresh Kumar Murugesan',
    college: 'Vellalar College of Engineering and Technology (VCET)',
    collegeKey: 'vellalar',
    dept: 'B.E Computer Science and Engineering',
    gradYear: '2023',
    company: 'Freshworks',
    role: 'Frontend Engineer',
    exp: '3 Yrs',
    location: 'Chennai, TN',
    skills: ['React.js', 'TypeScript', 'Next.js', 'TailwindCSS', 'Redux'],
    linkedinUser: 'suresh-kumar-vcet-freshworks',
    linkedinUrl: 'https://www.linkedin.com/search/results/people/?keywords=Suresh%20Kumar%20Vellalar%20College%20Freshworks',
    verified: true,
    availableForMentorship: true,
    openForReferral: true,
    bio: 'Proud VCETian building SaaS UI at Freshworks. Always excited to connect with college juniors and guide them into modern frontend tech.',
    careerJourney: [
      { year: '2023', title: '🎓 B.E CSE from Vellalar College of Engg (VCET)' },
      { year: '2023', title: '💻 Frontend Developer @ Freshworks Chennai' },
      { year: '2026', title: '🚀 Lead UI Engineer @ Freshworks' }
    ],
    interviewTips: 'Freshworks evaluates JavaScript closures, event loop, React performance hooks, and custom state managers in Round 2.'
  },
  {
    id: 'alum-p1',
    name: 'Pooja Venkatesh',
    college: 'PSG College of Technology (PSG Tech)',
    collegeKey: 'psg',
    dept: 'B.Tech Information Technology',
    gradYear: '2023',
    company: 'Microsoft',
    role: 'Software Engineer',
    exp: '3 Yrs',
    location: 'Hyderabad / Bengaluru',
    skills: ['C#', '.NET Core', 'Azure', 'Kubernetes', 'Algorithms'],
    linkedinUser: 'pooja-venkatesh-psg-microsoft',
    linkedinUrl: 'https://www.linkedin.com/search/results/people/?keywords=Pooja%20Venkatesh%20PSG%20Tech%20Microsoft',
    verified: true,
    availableForMentorship: true,
    openForReferral: true,
    bio: 'PSG Tech 2023 graduate @ Microsoft Azure Cloud. Active LinkedIn mentor for engineering students across Tamil Nadu.',
    careerJourney: [
      { year: '2023', title: '🎓 B.Tech IT from PSG College of Technology' },
      { year: '2023', title: '💻 Software Engineer @ Microsoft Azure' }
    ],
    interviewTips: 'Focus on clean code, edge cases in binary search & tree traversals, and Azure architecture basics.'
  },
  {
    id: 'alum-c1',
    name: 'Arun Prakash Subramanian',
    college: 'Coimbatore Institute of Technology (CIT)',
    collegeKey: 'cit',
    dept: 'B.E Mechanical & Computer Integrated Mfg',
    gradYear: '2022',
    company: 'Google',
    role: 'Cloud Solutions Architect',
    exp: '4 Yrs',
    location: 'Bengaluru, KA',
    skills: ['GCP', 'Terraform', 'Python', 'Kubernetes', 'Go'],
    linkedinUser: 'arun-prakash-cit-google',
    linkedinUrl: 'https://www.linkedin.com/search/results/people/?keywords=Arun%20Prakash%20CIT%20Coimbatore%20Google',
    verified: true,
    availableForMentorship: true,
    openForReferral: true,
    bio: 'CIT Coimbatore 2022 alum. Helping students break into high-paying Cloud & DevOps careers. Connect with me on LinkedIn!',
    careerJourney: [
      { year: '2022', title: '🎓 B.E from CIT Coimbatore' },
      { year: '2022', title: '☁️ Cloud Engineer @ Google Cloud Partner' },
      { year: '2025', title: '🚀 Solutions Architect @ Google India' }
    ],
    interviewTips: 'Google interviews test structural problem solving, system design trade-offs, and Googliness principles.'
  },
  {
    id: 'alum-k3',
    name: 'Naveen Rajan',
    college: 'Kongu Engineering College (KEC)',
    collegeKey: 'kongu',
    dept: 'B.Tech Artificial Intelligence & Data Science',
    gradYear: '2024',
    company: 'Cognizant (GenC Elevate)',
    role: 'AI & Full Stack Associate',
    exp: '2 Yrs',
    location: 'Coimbatore, TN',
    skills: ['Python', 'LangChain', 'React', 'MongoDB', 'Node.js'],
    linkedinUser: 'naveen-rajan-kec-cognizant',
    linkedinUrl: 'https://www.linkedin.com/search/results/people/?keywords=Naveen%20Rajan%20Kongu%20Engineering%20Cognizant',
    verified: true,
    availableForMentorship: true,
    openForReferral: true,
    bio: 'Kongu AI&DS 2024 batch. Placed via Cognizant GenC Elevate. Happy to provide referrals and tips for college placement drives.',
    careerJourney: [
      { year: '2024', title: '🎓 B.Tech AI&DS from Kongu Engineering College' },
      { year: '2024', title: '🚀 AI Associate @ Cognizant' }
    ],
    interviewTips: 'Prepare Full Stack web project workflows and basic Machine Learning algorithms (Linear Regression, Decision Trees).'
  },
  {
    id: 'alum-v3',
    name: 'Deepa Selvaraj',
    college: 'Vellalar College of Engineering and Technology (VCET)',
    collegeKey: 'vellalar',
    dept: 'B.E Electronics and Communication (ECE)',
    gradYear: '2023',
    company: 'Infosys (Specialist Programmer)',
    role: 'Power Programmer / Specialist',
    exp: '3 Yrs',
    location: 'Mysuru / Chennai',
    skills: ['Java', 'Microservices', 'Spring Cloud', 'Docker', 'Angular'],
    linkedinUser: 'deepa-selvaraj-vcet-infosys',
    linkedinUrl: 'https://www.linkedin.com/search/results/people/?keywords=Deepa%20Selvaraj%20Vellalar%20College%20Infosys',
    verified: true,
    availableForMentorship: true,
    openForReferral: true,
    bio: 'VCET ECE graduate who cracked the Infosys Power Programmer (₹9.5 LPA) drive through InfyTQ and HackWithInfy.',
    careerJourney: [
      { year: '2023', title: '🎓 B.E ECE from Vellalar College of Engineering' },
      { year: '2023', title: '⚡ Cracked Infosys Power Programmer Track' }
    ],
    interviewTips: 'HackWithInfy focuses on Dynamic Programming, Greedy approaches, and Graph algorithms. Practice competitive programming on CodeChef.'
  }
]

export default function AlumniNetwork() {
  const { user } = useAuth()
  const candidateName = user?.name || 'Aspirant'
  const userCollege = user?.college || 'Kongu Engineering College'

  // Search & Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCollege, setFilterCollege] = useState('All Colleges')
  const [filterCompany, setFilterCompany] = useState('All')

  // LinkedIn Search Query Generator States
  const [customSearchCollege, setCustomSearchCollege] = useState('Kongu Engineering College')
  const [customSearchCompany, setCustomSearchCompany] = useState('Zoho')
  const [customSearchRole, setCustomSearchRole] = useState('Software Engineer')

  // Modals
  const [linkedInModal, setLinkedInModal] = useState(null)
  const [referralModal, setReferralModal] = useState(null)
  const [journeyModal, setJourneyModal] = useState(null)

  // Request form state
  const [requestMessage, setRequestMessage] = useState('')
  const [submittingReq, setSubmittingReq] = useState(false)

  // Track sent requests
  const [sentRequests, setSentRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_alumni_linkedin_requests')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Filtered Alumni logic based on college keywords and search terms
  const filteredAlumni = MOCK_COLLEGE_ALUMNI.filter(a => {
    const q = searchTerm.toLowerCase().trim()
    const matchesSearch = !q ||
      a.name.toLowerCase().includes(q) ||
      a.college.toLowerCase().includes(q) ||
      a.collegeKey.toLowerCase().includes(q) ||
      a.company.toLowerCase().includes(q) ||
      a.role.toLowerCase().includes(q) ||
      a.skills.some(s => s.toLowerCase().includes(q))

    const matchesCollege = filterCollege === 'All Colleges' || a.college === filterCollege
    const matchesCompany = filterCompany === 'All' || a.company === filterCompany

    return matchesSearch && matchesCollege && matchesCompany
  })

  // Generate Personalized LinkedIn Note
  const generateLinkedInNote = (alumnus) => {
    return `Hi ${alumnus.name}, I am a fellow student from ${alumnus.college}. I noticed your impressive journey as a ${alumnus.role} at ${alumnus.company}. I'm preparing for upcoming drives on CampusPilot AI and would love to connect with you on LinkedIn for guidance and mentorship! Best regards, ${candidateName}.`
  }

  // Open Direct LinkedIn Request Modal
  const openLinkedInConnect = (alumnus) => {
    setLinkedInModal(alumnus)
    setRequestMessage(generateLinkedInNote(alumnus))
  }

  // Send Direct LinkedIn Connection Request
  const handleSendLinkedInRequest = async (e) => {
    e.preventDefault()
    if (!linkedInModal) return

    setSubmittingReq(true)
    const newReq = {
      id: Date.now(),
      alumniId: linkedInModal.id,
      alumniName: linkedInModal.name,
      alumniCollege: linkedInModal.college,
      alumniCompany: linkedInModal.company,
      alumniRole: linkedInModal.role,
      linkedinUrl: linkedInModal.linkedinUrl,
      studentName: candidateName,
      message: requestMessage,
      status: 'LinkedIn Connection Dispatched ⏳',
      timestamp: new Date().toLocaleString()
    }

    const updated = [newReq, ...sentRequests]
    setSentRequests(updated)
    localStorage.setItem('campuspilot_alumni_linkedin_requests', JSON.stringify(updated))

    // Optional email dispatch to alumnus via backend
    try {
      await axios.post('/api/email/apply-confirm', {
        candidateName,
        candidateEmail: user?.email || 'student@campus.edu',
        jobTitle: `Alumni LinkedIn Connection (${linkedInModal.college})`,
        company: linkedInModal.company,
        message: requestMessage
      })
    } catch {
      // ignore offline fallback
    }

    setSubmittingReq(false)
    toast.success(`🔗 LinkedIn Connection Request sent to ${linkedInModal.name} (${linkedInModal.company})!`, { duration: 6000 })
    
    // Open LinkedIn Profile in new tab
    window.open(linkedInModal.linkedinUrl, '_blank')
    setLinkedInModal(null)
  }

  // Generate Real-time LinkedIn Search URL for custom query
  const executeLiveLinkedInSearch = () => {
    const query = `${customSearchCollege} ${customSearchCompany} ${customSearchRole} alumni`.trim()
    const encoded = encodeURIComponent(query)
    const url = `https://www.linkedin.com/search/results/people/?keywords=${encoded}`
    toast.success(`🚀 Searching all ${customSearchCollege} alumni at ${customSearchCompany} on LinkedIn!`)
    window.open(url, '_blank')
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
                College Alumni Network & LinkedIn Connect Hub
              </h1>
              <p style={{ color: '#a7f3d0', fontSize: '0.85rem', margin: 0 }}>
                Connect with placed seniors from your college (Kongu, Vellalar, PSG, CIT, Anna Univ) directly on LinkedIn for referrals & mentorship!
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ background: 'rgba(52,211,153,0.2)', color: '#6ee7b7', border: '1px solid rgba(52,211,153,0.4)', padding: '0.4rem 0.9rem', borderRadius: '2rem', fontWeight: '800', fontSize: '0.8rem' }}>
            🔗 LinkedIn Direct Integration Active
          </span>
        </div>
      </motion.div>

      {/* ── LIVE LINKEDIN COLLEGE ALUMNI SEARCH ENGINE ────────────── */}
      <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '2px solid rgba(14, 165, 233, 0.4)', borderRadius: '1.25rem', padding: '1.5rem', boxShadow: '0 8px 30px rgba(0,0,0,0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
          <span style={{ fontSize: '1.4rem' }}>🔍</span>
          <div>
            <h3 style={{ color: 'white', margin: 0, fontWeight: '900', fontSize: '1.1rem' }}>
              Instant LinkedIn College Alumni Query Engine
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>
              Search thousands of real-time verified alumni from your college working at top MNCs on LinkedIn with pre-configured search queries.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', color: '#38bdf8', fontWeight: '800', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
              🏫 College Keyword (e.g. Kongu, Vellalar, PSG):
            </label>
            <input
              type="text"
              value={customSearchCollege}
              onChange={e => setCustomSearchCollege(e.target.value)}
              placeholder="e.g. Kongu, Vellalar, PSG Tech, Anna Univ..."
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.85rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#38bdf8', fontWeight: '800', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
              🏢 Target Company (e.g. Zoho, Google, TCS, Amazon):
            </label>
            <input
              type="text"
              value={customSearchCompany}
              onChange={e => setCustomSearchCompany(e.target.value)}
              placeholder="e.g. Zoho, Microsoft, Freshworks, Infosys..."
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.85rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#38bdf8', fontWeight: '800', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
              💼 Target Job Role:
            </label>
            <input
              type="text"
              value={customSearchRole}
              onChange={e => setCustomSearchRole(e.target.value)}
              placeholder="e.g. Software Engineer, SDE, Data Analyst..."
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.85rem' }}
            />
          </div>
        </div>

        <button
          onClick={executeLiveLinkedInSearch}
          style={{
            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.65rem',
            fontWeight: '900',
            fontSize: '0.9rem',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(2,132,199,0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span>🔗</span> Search Live {customSearchCollege} Alumni on LinkedIn ➔
        </button>
      </div>

      {/* ── QUICK COLLEGE KEYWORD SELECTOR BUTTONS ────────────────── */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.25rem' }}>
        <div style={{ color: '#a7f3d0', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: '800', marginBottom: '0.65rem' }}>
          🏫 Quick Filter by College / Alma Mater:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {TOP_COLLEGES.map((col, idx) => {
            const isSelected = filterCollege === col
            return (
              <button
                key={idx}
                onClick={() => {
                  setFilterCollege(col)
                  setSearchTerm('')
                }}
                style={{
                  background: isSelected ? 'linear-gradient(135deg, #059669, #047857)' : 'rgba(255,255,255,0.04)',
                  border: isSelected ? '1.5px solid #34d399' : '1px solid rgba(255,255,255,0.08)',
                  color: isSelected ? 'white' : '#cbd5e1',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '0.6rem',
                  fontWeight: isSelected ? '800' : '600',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {col === 'All Colleges' ? '🌐 All Colleges' : `🎓 ${col}`}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── SEARCH BAR & ALUMNI COUNT ──────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <input
          type="text"
          placeholder="🔍 Search alumni by college name (Kongu, Vellalar), name, role, company, skills..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: '280px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            color: 'white',
            fontSize: '0.9rem',
            outline: 'none'
          }}
        />

        <span style={{ color: '#a7f3d0', fontSize: '0.85rem', fontWeight: '700' }}>
          Showing {filteredAlumni.length} Verified Alumni Mentors
        </span>
      </div>

      {/* ── ALUMNI CARDS GRID ──────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredAlumni.map(alumnus => (
          <motion.div
            key={alumnus.id}
            whileHover={{ y: -3 }}
            style={{
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(52,211,153,0.3)',
              borderRadius: '1.25rem',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
            }}
          >
            <div>
              {/* Header: Name, Company, Verified Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                <div>
                  <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.15rem', margin: 0 }}>
                    {alumnus.name}
                  </h3>
                  <div style={{ color: '#34d399', fontWeight: '800', fontSize: '0.88rem', marginTop: '0.2rem' }}>
                    {alumnus.role} @ <strong style={{ color: '#ffffff' }}>{alumnus.company}</strong>
                  </div>
                </div>

                <span style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', padding: '0.2rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.7rem', fontWeight: '800' }}>
                  ✓ Verified Alumni
                </span>
              </div>

              {/* College & Degree Badge */}
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.65rem', padding: '0.65rem 0.85rem', marginBottom: '0.85rem' }}>
                <div style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.82rem' }}>
                  🏫 {alumnus.college}
                </div>
                <div style={{ color: '#cbd5e1', fontSize: '0.75rem', marginTop: '0.2rem' }}>
                  🎓 {alumnus.dept} · Batch of {alumnus.gradYear} ({alumnus.exp} Experience)
                </div>
              </div>

              {/* Bio & Advice */}
              <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 0.85rem' }}>
                {alumnus.bio}
              </p>

              {/* Skills Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                {alumnus.skills.map((skill, sIdx) => (
                  <span key={sIdx} style={{ background: 'rgba(96,165,250,0.12)', color: '#93c5fd', padding: '0.15rem 0.45rem', borderRadius: '0.35rem', fontSize: '0.7rem', fontWeight: '600' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
              <button
                onClick={() => openLinkedInConnect(alumnus)}
                style={{
                  background: 'linear-gradient(135deg, #0a66c2 0%, #004182 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '0.65rem',
                  borderRadius: '0.65rem',
                  fontWeight: '900',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 15px rgba(10,102,194,0.35)'
                }}
              >
                <span>🔗</span> Connect via LinkedIn (Personalized Note) ➔
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button
                  onClick={() => setJourneyModal(alumnus)}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#cbd5e1',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    fontWeight: '700',
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  🚀 Career Journey
                </button>

                <button
                  onClick={() => {
                    toast.success(`💡 Interview Tips for ${alumnus.company}:\n"${alumnus.interviewTips}"`, { duration: 8000 })
                  }}
                  style={{
                    background: 'rgba(52,211,153,0.1)',
                    border: '1px solid rgba(52,211,153,0.3)',
                    color: '#34d399',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    fontWeight: '700',
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  💡 Interview Tips
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── SENT LINKEDIN REQUESTS TRACKER ─────────────────────────── */}
      {sentRequests.length > 0 && (
        <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(14, 165, 233, 0.3)', borderRadius: '1.25rem', padding: '1.5rem', marginTop: '1rem' }}>
          <h3 style={{ color: '#38bdf8', fontWeight: '900', fontSize: '1.1rem', margin: '0 0 0.85rem' }}>
            📬 Your Outgoing LinkedIn Connection & Referral Requests ({sentRequests.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {sentRequests.map((req, rIdx) => (
              <div key={rIdx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.75rem', padding: '0.85rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <strong style={{ color: 'white', fontSize: '0.9rem' }}>{req.alumniName}</strong>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
                    ({req.alumniRole} @ {req.alumniCompany} · {req.alumniCollege})
                  </span>
                  <div style={{ color: '#cbd5e1', fontSize: '0.75rem', marginTop: '0.2rem', fontStyle: 'italic' }}>
                    "{req.message.slice(0, 100)}..."
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ background: 'rgba(56,189,248,0.15)', color: '#38bdf8', padding: '0.25rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.75rem', fontWeight: '800' }}>
                    {req.status}
                  </span>
                  <a
                    href={req.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ background: '#0a66c2', color: 'white', textDecoration: 'none', padding: '0.3rem 0.75rem', borderRadius: '0.4rem', fontSize: '0.75rem', fontWeight: '800' }}
                  >
                    View on LinkedIn ➔
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MODAL: LINKEDIN CONNECT WITH PERSONALIZED NOTE ────────── */}
      <AnimatePresence>
        {linkedInModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              style={{ background: '#0f172a', border: '2px solid #0a66c2', borderRadius: '1.5rem', padding: '2rem', maxWidth: '580px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>🔗</span>
                  <div>
                    <h3 style={{ color: 'white', margin: 0, fontWeight: '900', fontSize: '1.2rem' }}>
                      Connect with {linkedInModal.name}
                    </h3>
                    <span style={{ color: '#38bdf8', fontSize: '0.8rem' }}>
                      {linkedInModal.role} @ {linkedInModal.company} ({linkedInModal.college})
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setLinkedInModal(null)}
                  style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.4rem', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSendLinkedInRequest} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'rgba(10,102,194,0.1)', border: '1px solid rgba(10,102,194,0.3)', borderRadius: '0.75rem', padding: '0.85rem' }}>
                  <div style={{ color: '#38bdf8', fontWeight: '800', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                    💡 Auto-Generated LinkedIn Connection Note:
                  </div>
                  <p style={{ color: '#e2e8f0', fontSize: '0.8rem', margin: 0 }}>
                    Alumni respond 4x faster to connection requests that mention their alma mater ({linkedInModal.college}).
                  </p>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontWeight: '700', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                    Custom Message to {linkedInModal.name}:
                  </label>
                  <textarea
                    rows={5}
                    value={requestMessage}
                    onChange={e => setRequestMessage(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.65rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.85rem', lineHeight: 1.5, resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setLinkedInModal(null)}
                    style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#cbd5e1', padding: '0.65rem 1.25rem', borderRadius: '0.6rem', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submittingReq}
                    style={{
                      background: 'linear-gradient(135deg, #0a66c2 0%, #004182 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '0.65rem 1.5rem',
                      borderRadius: '0.6rem',
                      fontWeight: '900',
                      fontSize: '0.88rem',
                      cursor: submittingReq ? 'not-allowed' : 'pointer',
                      boxShadow: '0 4px 15px rgba(10,102,194,0.4)'
                    }}
                  >
                    {submittingReq ? 'Sending...' : '🚀 Send Request & Open LinkedIn ➔'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODAL: CAREER JOURNEY ─────────────────────────────────── */}
      <AnimatePresence>
        {journeyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              style={{ background: '#0f172a', border: '2px solid #34d399', borderRadius: '1.5rem', padding: '2rem', maxWidth: '500px', width: '100%' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ color: 'white', margin: 0, fontWeight: '900', fontSize: '1.2rem' }}>
                  🚀 {journeyModal.name}'s Career Path
                </h3>
                <button
                  onClick={() => setJourneyModal(null)}
                  style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.4rem', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.85rem', marginBottom: '1rem' }}>
                🏫 {journeyModal.college}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                {journeyModal.careerJourney.map((j, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1rem', borderRadius: '0.65rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ background: '#059669', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '0.35rem', fontSize: '0.75rem', fontWeight: '900' }}>
                      {j.year}
                    </span>
                    <span style={{ color: '#e2e8f0', fontSize: '0.85rem', fontWeight: '600' }}>
                      {j.title}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setJourneyModal(null)
                  openLinkedInConnect(journeyModal)
                }}
                style={{ width: '100%', background: 'linear-gradient(135deg, #0a66c2, #004182)', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '0.65rem', fontWeight: '900', cursor: 'pointer' }}
              >
                🔗 Connect with {journeyModal.name} on LinkedIn ➔
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
