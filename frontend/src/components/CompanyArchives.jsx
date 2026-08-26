import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { SEED_COMPANIES } from '../data/seedCompanies'

// Transform SEED_COMPANIES into full Archive Card structure
const SEEDED_ARCHIVE_DATA = SEED_COMPANIES.map(c => ({
  id: c.id,
  name: c.name,
  logo: c.category.includes('Tech') ? '⚡' : c.category.includes('PSU') ? '🏛️' : c.category.includes('Bank') ? '🏦' : '🏢',
  industry: c.category,
  difficulty: c.ctcFresher.includes('15') || c.ctcFresher.includes('18') ? 'Hard' : c.ctcFresher.includes('8') ? 'Medium' : 'Easy',
  diffColor: c.ctcFresher.includes('15') || c.ctcFresher.includes('18') ? '#ef4444' : c.ctcFresher.includes('8') ? '#facc15' : '#4ade80',
  diffScore: c.ctcFresher.includes('15') ? '8.9/10' : '6.5/10',
  lastVisited: '2026',
  selectedCount: c.hired || 40,
  selectionRate: '15%',
  roles: c.roles.split(', '),
  ctcRange: c.ctcFresher,
  avgCtc: c.avgPkg,
  highestCtc: c.highest,
  ctcHistory: [
    { year: '2024', avg: c.avgPkg, high: c.highest },
    { year: '2025', avg: c.avgPkg, high: c.highest },
    { year: '2026', avg: c.avgPkg, high: c.highest }
  ],
  selectionProcess: [
    { stage: '1. Written / Online Test', desc: 'Aptitude & Technical Basics', duration: '90 mins', difficulty: 'Medium' },
    { stage: '2. Technical Interview', desc: `Core Skills (${c.topSkills}) & Project Review`, duration: '45 mins', difficulty: 'Medium' },
    { stage: '3. HR & Managerial', desc: 'Behavioral & Relocation Discussion', duration: '20 mins', difficulty: 'Easy' }
  ],
  pastPapers: [
    { year: `2025 ${c.name} Placement Paper`, totalQuestions: 40, sections: `Aptitude & ${c.topSkills}` }
  ],
  interviewQuestions: {
    technical: [
      `Explain your main project and role using ${c.topSkills.split(', ')[0] || 'Python'}.`,
      `What are the core concepts required for ${c.roles.split(', ')[0]} at ${c.name}?`,
      'Explain DBMS normalization and SQL JOINs with examples.'
    ],
    hr: [
      `Why do you want to join ${c.name}?`,
      'Are you open to relocation across India?',
      'Where do you see yourself in 3-5 years?'
    ]
  },
  experiences: [
    { name: 'Siddharth M', batch: '2025', dept: 'CSE / ECE', role: c.roles.split(', ')[0], status: 'Selected', rating: 5, review: `Focus heavily on ${c.topSkills}! Written round is critical.` }
  ]
}))

const ARCHIVE_DATA = [
  {
    id: 'tcs',
    name: 'TCS (Tata Consultancy Services)',
    logo: '🏢',
    industry: 'IT Services & Consulting',
    difficulty: 'Easy',
    diffColor: '#4ade80',
    diffScore: '6.2/10',
    lastVisited: '2026',
    selectedCount: 42,
    selectionRate: '18%',
    roles: ['Software Developer', 'System Engineer', 'Digital Innovator'],
    ctcRange: '₹3.5–7.0 LPA',
    avgCtc: '₹4.5 LPA',
    highestCtc: '₹7.0 LPA',
    ctcHistory: [
      { year: '2024', avg: '₹3.8 LPA', high: '₹7.0 LPA' },
      { year: '2025', avg: '₹4.2 LPA', high: '₹7.5 LPA' },
      { year: '2026', avg: '₹4.5 LPA', high: '₹7.0 LPA' }
    ],
    selectionProcess: [
      { stage: '1. Online Test', desc: 'NQT Aptitude + Verbal + Reasoning', duration: '90 mins', difficulty: 'Easy-Medium' },
      { stage: '2. Coding Round', desc: '2 Hands-on Coding Problems (Strings, Arrays)', duration: '45 mins', difficulty: 'Medium' },
      { stage: '3. Technical Interview', desc: 'DBMS, OOPs, Data Structures, Mini Project', duration: '30 mins', difficulty: 'Medium' },
      { stage: '4. HR Round', desc: 'Behavioral, Relocation, Communication Check', duration: '15 mins', difficulty: 'Easy' }
    ],
    pastPapers: [
      { year: '2025 TCS NQT Paper', totalQuestions: 42, sections: '20 Aptitude, 15 Technical, 2 Coding, 5 HR' },
      { year: '2024 TCS Digital Paper', totalQuestions: 35, sections: '15 Advanced Quant, 15 CS Fundamentals, 5 Coding' }
    ],
    interviewQuestions: {
      technical: [
        'Tell me about your final year project and your role in it.',
        'What is Database Normalization? Explain 1NF, 2NF, 3NF.',
        'What is the key difference between a Python List and a Tuple?',
        'Write an SQL query to find the 2nd highest salary from an Employee table.',
        'What are the 4 main pillars of Object-Oriented Programming (OOP)?'
      ],
      hr: [
        'Tell me about yourself and why TCS?',
        'Are you comfortable relocating to any TCS campus across India?',
        'Where do you see yourself in 5 years?',
        'How do you handle tight deadlines or stressful project situations?'
      ]
    },
    experiences: [
      { name: 'Karthik S', batch: '2025', dept: 'B.Sc CS', role: 'Digital Developer', status: 'Selected', rating: 5, review: 'Technical round mainly focused on SQL JOINs and Python dictionary basics. Very friendly interviewer!' },
      { name: 'Priya R', batch: '2025', dept: 'B.Tech CSE', role: 'System Engineer', status: 'Selected', rating: 4, review: 'NQT test was easy to moderate. Coding round had 1 array manipulation and 1 string question.' }
    ]
  },
  {
    id: 'zoho',
    name: 'Zoho Corporation',
    logo: '⚡',
    industry: 'SaaS & Enterprise Software',
    difficulty: 'Hard',
    diffColor: '#ef4444',
    diffScore: '8.8/10',
    lastVisited: '2026',
    selectedCount: 14,
    selectionRate: '5%',
    roles: ['Software Development Engineer', 'UI/UX Developer', 'QA Automation Engineer'],
    ctcRange: '₹6.0–12.0 LPA',
    avgCtc: '₹7.5 LPA',
    highestCtc: '₹12.0 LPA',
    ctcHistory: [
      { year: '2024', avg: '₹6.5 LPA', high: '₹10.0 LPA' },
      { year: '2025', avg: '₹7.0 LPA', high: '₹11.0 LPA' },
      { year: '2026', avg: '₹7.5 LPA', high: '₹12.0 LPA' }
    ],
    selectionProcess: [
      { stage: '1. Written C/Java Test', desc: 'Output prediction & basic syntax logic', duration: '60 mins', difficulty: 'Medium' },
      { stage: '2. Basic Programming', desc: '5 Problems (Pattern printing, Matrix, Strings)', duration: '180 mins', difficulty: 'Hard' },
      { stage: '3. Advanced Programming', desc: 'Design LLD (Library System, Railway Reservation)', duration: '180 mins', difficulty: 'Very Hard' },
      { stage: '4. Tech & HR Round', desc: 'Code optimization, resume deep-dive', duration: '45 mins', difficulty: 'Medium' }
    ],
    pastPapers: [
      { year: '2025 Zoho Advanced Coding', totalQuestions: 5, sections: 'Low-Level System Design & Complex Data Structures' },
      { year: '2024 Zoho Aptitude & Output C Test', totalQuestions: 25, sections: '20 C Output Pointers & 5 Quant' }
    ],
    interviewQuestions: {
      technical: [
        'Design a Console-based Railway Ticket Reservation System in Java/C++.',
        'What is a memory leak and how do you prevent it in C/C++?',
        'Explain how HashMap works internally under the hood in Java.',
        'Implement an LRU Cache without using built-in libraries.'
      ],
      hr: [
        'Why Zoho over big MNCs?',
        'Are you comfortable working in Tenkasi or Chennai locations?',
        'Describe a project where you solved a tricky bug.'
      ]
    },
    experiences: [
      { name: 'Arjun K', batch: '2025', dept: 'B.Tech IT', role: 'Software Developer', status: 'Selected', rating: 5, review: 'Round 3 Low-Level Design of Parking Lot took 3 hours! Make sure your OOP concepts are crystal clear.' }
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon India',
    logo: '📦',
    industry: 'E-Commerce & Cloud Computing',
    difficulty: 'Hard',
    diffColor: '#ef4444',
    diffScore: '9.1/10',
    lastVisited: '2026',
    selectedCount: 8,
    selectionRate: '3%',
    roles: ['SDE-1', 'Cloud Support Engineer', 'Data Analyst'],
    ctcRange: '₹14.0–28.0 LPA',
    avgCtc: '₹18.0 LPA',
    highestCtc: '₹28.0 LPA',
    ctcHistory: [
      { year: '2024', avg: '₹16.0 LPA', high: '₹25.0 LPA' },
      { year: '2025', avg: '₹17.5 LPA', high: '₹27.0 LPA' },
      { year: '2026', avg: '₹18.0 LPA', high: '₹28.0 LPA' }
    ],
    selectionProcess: [
      { stage: '1. Online Assessment (OA)', desc: '2 DSA Questions + Work Style Survey', duration: '90 mins', difficulty: 'Hard' },
      { stage: '2. Technical Interview 1', desc: 'Data Structures (Trees, Graphs, DP)', duration: '60 mins', difficulty: 'Hard' },
      { stage: '3. Technical Interview 2', desc: 'System Design & Problem Solving', duration: '60 mins', difficulty: 'Hard' },
      { stage: '4. Bar Raiser Round', desc: 'Amazon Leadership Principles & Behavioral', duration: '60 mins', difficulty: 'Hard' }
    ],
    pastPapers: [
      { year: '2025 Amazon OA Test', totalQuestions: 2, sections: '1 Dynamic Programming + 1 Graph Shortest Path' }
    ],
    interviewQuestions: {
      technical: [
        'Given a binary tree, serialize and deserialize it back into the original tree.',
        'Find the longest palindromic substring in O(N) or O(N log N) time.',
        'How would you design a URL Shortener like bit.ly?'
      ],
      hr: [
        'Give an example of a time when you demonstrated Customer Obsession.',
        'Describe a situation where you had a conflict with a teammate and how you resolved it.'
      ]
    },
    experiences: [
      { name: 'Sneha I', batch: '2025', dept: 'B.Tech CSE', role: 'SDE-1', status: 'Selected', rating: 5, review: 'Bar Raiser round focuses deeply on Leadership Principles! STAR method answers are mandatory.' }
    ]
  },
  {
    id: 'infosys',
    name: 'Infosys',
    logo: '🔷',
    industry: 'IT Services & Consulting',
    difficulty: 'Medium',
    diffColor: '#facc15',
    diffScore: '7.0/10',
    lastVisited: '2026',
    selectedCount: 38,
    selectionRate: '22%',
    roles: ['System Engineer', 'Specialist Programmer', 'Power Programmer'],
    ctcRange: '₹3.6–9.5 LPA',
    avgCtc: '₹4.8 LPA',
    highestCtc: '₹9.5 LPA',
    ctcHistory: [
      { year: '2024', avg: '₹4.2 LPA', high: '₹8.0 LPA' },
      { year: '2025', avg: '₹4.5 LPA', high: '₹9.0 LPA' },
      { year: '2026', avg: '₹4.8 LPA', high: '₹9.5 LPA' }
    ],
    selectionProcess: [
      { stage: '1. Online Test', desc: 'Logical, Quant, Verbal, Pseudo-code', duration: '100 mins', difficulty: 'Medium' },
      { stage: '2. HackWithInfy / Technical', desc: 'Coding round for Specialist Programmer', duration: '180 mins', difficulty: 'Hard' },
      { stage: '3. Technical + HR Interview', desc: 'Project discussion, SQL, Web Basics', duration: '40 mins', difficulty: 'Easy-Medium' }
    ],
    pastPapers: [
      { year: '2025 Infosys HackWithInfy', totalQuestions: 3, sections: '1 Greedy Algorithm + 1 String + 1 Math' }
    ],
    interviewQuestions: {
      technical: [
        'Explain the difference between Primary Key and Unique Key in SQL.',
        'What is an API and how does REST architecture work?',
        'Explain recursion with a simple code example.'
      ],
      hr: [
        'Why Infosys?',
        'Are you ready to sign a service agreement if required?'
      ]
    },
    experiences: [
      { name: 'Divya M', batch: '2025', dept: 'BCA', role: 'System Engineer', status: 'Selected', rating: 4, review: 'Pseudocode section in written test is key! Practice C output questions.' }
    ]
  }
]

const MOST_ASKED = [
  { question: 'SQL JOIN (Inner, Left, Right, Full)', count: '87 times asked' },
  { question: 'OOP Concepts (Encapsulation, Polymorphism, Inheritance, Abstraction)', count: '72 times asked' },
  { question: 'Tell Me About Yourself & Project Overview', count: '65 times asked' },
  { question: 'Python List vs Tuple & Dictionary Operations', count: '59 times asked' },
  { question: 'Database Normalization (1NF, 2NF, 3NF)', count: '52 times asked' },
  { question: 'DBMS Primary Key vs Unique Key vs Foreign Key', count: '48 times asked' }
]

export default function CompanyArchives() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDifficulty, setFilterDifficulty] = useState('All')
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [aiPrepModal, setAiPrepModal] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState(null)

  const ALL_ARCHIVE_DATA = [...ARCHIVE_DATA, ...SEEDED_ARCHIVE_DATA]

  const filtered = ALL_ARCHIVE_DATA.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.roles.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesDiff = filterDifficulty === 'All' || c.difficulty === filterDifficulty
    return matchesSearch && matchesDiff
  })

  const generateAiPrep = (company) => {
    setAiPrepModal(company)
    setAiLoading(true)
    setAiResponse(null)

    setTimeout(() => {
      setAiResponse({
        skills: ['SQL Joins & Indexing', 'Python Data Structures', 'DBMS Normalization', 'Basic DSA (Arrays, Strings)'],
        expectedQuestions: [
          `Explain your final year project architecture and tech stack for ${company.name}.`,
          'Write a query to fetch top 3 highest salaries using DENSE_RANK().',
          'What happens when you enter a URL in the browser bar?'
        ],
        aptitudeTips: 'Focus heavily on Logical Reasoning & Speed Math. Practice 20 questions daily.',
        codingTips: 'Practice String reversal, Pattern printing, and Array manipulation questions.',
        resumeTip: `Highlight your ${company.roles[0]} relevant projects and explicitly mention SQL & Python.`
      })
      setAiLoading(false)
      toast.success(`🤖 AI Preparation Roadmap generated for ${company.name}!`)
    }, 1200)
  }

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81, #1e293b)', borderRadius: '1.5rem', padding: '2rem', marginBottom: '1.5rem', border: '1px solid rgba(139,92,246,0.3)' }}
      >
        <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '0.5rem' }}>
          🏛️ Company Archives & Placement Intelligence
        </h1>
        <p style={{ color: '#a5b4fc', marginBottom: '1.25rem' }}>
          Past placement data, selection processes, CTC trends, previous papers & AI-powered company preparation.
        </p>

        {/* Search & Filters */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="🔍 Search company or job role (e.g. TCS, Developer)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ flex: 1, minWidth: '240px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
          />
          <select
            value={filterDifficulty}
            onChange={e => setFilterDifficulty(e.target.value)}
            style={{ background: 'rgba(30,27,75,0.9)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">🟢 Easy</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Hard">🔴 Hard</option>
          </select>
        </div>
      </motion.div>

      {/* Frequently Asked Questions Priority Section */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <h3 style={{ color: '#fbbf24', fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.75rem' }}>🔥 Most Asked Interview Questions (Across All Companies)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
          {MOST_ASKED.map(q => (
            <div key={q.question} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '0.75rem', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'white', fontSize: '0.83rem', fontWeight: '600' }}>{q.question}</span>
              <span style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', padding: '0.2rem 0.5rem', borderRadius: '0.5rem', fontSize: '0.7rem', fontWeight: '700', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>{q.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Company Cards Grid */}
      <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.3rem', marginBottom: '1rem' }}>🏢 Company Archive Cards ({filtered.length})</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {filtered.map((company, index) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 }}
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem', borderTop: `4px solid ${company.diffColor}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>{company.logo}</span>
                  <div>
                    <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem' }}>{company.name}</h3>
                    <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{company.industry}</span>
                  </div>
                </div>
                <span style={{ background: `${company.diffColor}22`, color: company.diffColor, padding: '0.25rem 0.6rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '700', border: `1px solid ${company.diffColor}44` }}>
                  {company.difficulty} ({company.diffScore})
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.7rem' }}>Avg CTC</div>
                  <div style={{ color: '#4ade80', fontWeight: '800', fontSize: '0.95rem' }}>{company.avgCtc}</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.7rem' }}>Highest CTC</div>
                  <div style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.95rem' }}>{company.highestCtc}</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.7rem' }}>Students Placed</div>
                  <div style={{ color: '#60a5fa', fontWeight: '800', fontSize: '0.95rem' }}>{company.selectedCount} students</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.7rem' }}>Selection Rate</div>
                  <div style={{ color: '#f472b6', fontWeight: '800', fontSize: '0.95rem' }}>{company.selectionRate}</div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.4rem' }}>Job Roles:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {company.roles.map(role => (
                    <span key={role} style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd', padding: '0.15rem 0.55rem', borderRadius: '0.4rem', fontSize: '0.72rem', border: '1px solid rgba(124,58,237,0.3)' }}>
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button
                onClick={() => setSelectedCompany(company)}
                style={{ flex: 1, padding: '0.6rem', borderRadius: '0.6rem', background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', fontWeight: '600', fontSize: '0.82rem', cursor: 'pointer' }}
              >
                📄 View Archives
              </button>
              <button
                onClick={() => generateAiPrep(company)}
                style={{ flex: 1, padding: '0.6rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', border: 'none', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer' }}
              >
                🤖 AI Prepare
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Company Drawer Modal */}
      <AnimatePresence>
        {selectedCompany && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setSelectedCompany(null)}
          >
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              style={{ background: 'linear-gradient(135deg, #1e1b4b, #111827)', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '1.5rem', padding: '2rem', maxWidth: '750px', width: '100%', maxHeight: '85vh', overflowY: 'auto' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '2rem' }}>{selectedCompany.logo}</span>
                  <div>
                    <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.4rem' }}>{selectedCompany.name}</h2>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{selectedCompany.industry} · Last visited: {selectedCompany.lastVisited}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedCompany(null)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
              </div>

              {/* CTC History */}
              <h4 style={{ color: '#fbbf24', fontWeight: '700', marginBottom: '0.5rem' }}>💰 Salary CTC History Trend</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', overflow: 'hidden' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.06)', textTransform: 'uppercase', fontSize: '0.75rem', color: '#94a3b8' }}>
                    <th style={{ padding: '0.6rem 1rem', textAlign: 'left' }}>Year</th>
                    <th style={{ padding: '0.6rem 1rem', textAlign: 'left' }}>Average CTC</th>
                    <th style={{ padding: '0.6rem 1rem', textAlign: 'left' }}>Highest CTC</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCompany.ctcHistory.map(row => (
                    <tr key={row.year} style={{ borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem', color: 'white' }}>
                      <td style={{ padding: '0.6rem 1rem' }}>{row.year}</td>
                      <td style={{ padding: '0.6rem 1rem', color: '#4ade80', fontWeight: '700' }}>{row.avg}</td>
                      <td style={{ padding: '0.6rem 1rem', color: '#fbbf24', fontWeight: '700' }}>{row.high}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Selection Process */}
              <h4 style={{ color: '#60a5fa', fontWeight: '700', marginBottom: '0.5rem' }}>📊 Selection Process & Rounds</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {selectedCompany.selectionProcess.map(sp => (
                  <div key={sp.stage} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ color: 'white', fontWeight: '700', fontSize: '0.9rem' }}>{sp.stage}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{sp.desc}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#f472b6', fontSize: '0.75rem', fontWeight: '700' }}>⏱️ {sp.duration}</div>
                      <div style={{ color: '#fbbf24', fontSize: '0.72rem' }}>{sp.difficulty}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Technical Questions */}
              <h4 style={{ color: '#f472b6', fontWeight: '700', marginBottom: '0.5rem' }}>🎤 Previous Technical Interview Questions</h4>
              <ul style={{ paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {selectedCompany.interviewQuestions.technical.map(q => <li key={q}>{q}</li>)}
              </ul>

              {/* HR Questions */}
              <h4 style={{ color: '#c084fc', fontWeight: '700', marginBottom: '0.5rem' }}>👔 Previous HR Interview Questions</h4>
              <ul style={{ paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {selectedCompany.interviewQuestions.hr.map(q => <li key={q}>{q}</li>)}
              </ul>

              <button
                onClick={() => { setSelectedCompany(null); generateAiPrep(selectedCompany); }}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', fontWeight: '700', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}
              >
                🤖 Generate AI Preparation Roadmap for {selectedCompany.name}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Prep Result Modal */}
      <AnimatePresence>
        {aiPrepModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setAiPrepModal(null)}
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              style={{ background: 'linear-gradient(135deg, #0f172a, #1e1b4b)', border: '1px solid rgba(124,58,237,0.5)', borderRadius: '1.5rem', padding: '2rem', maxWidth: '650px', width: '100%', maxHeight: '85vh', overflowY: 'auto' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem' }}>🤖 AI Preparation Guide — {aiPrepModal.name}</h3>
                <button onClick={() => setAiPrepModal(null)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}>✕</button>
              </div>

              {aiLoading ? (
                <div style={{ textAlign: 'center', padding: '3rem 0', color: '#a5b4fc' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🤖 Thinking...</div>
                  <p>Analyzing company past papers, interview pattern & skills requirements...</p>
                </div>
              ) : aiResponse && (
                <div>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h5 style={{ color: '#4ade80', fontWeight: '700', marginBottom: '0.4rem' }}>🎯 Recommended Skills to Master</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {aiResponse.skills.map(s => <span key={s} style={{ background: 'rgba(74,222,128,0.2)', color: '#4ade80', padding: '0.2rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.78rem' }}>{s}</span>)}
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <h5 style={{ color: '#fbbf24', fontWeight: '700', marginBottom: '0.4rem' }}>❓ AI Predicted Interview Questions</h5>
                    <ul style={{ paddingLeft: '1.2rem', color: '#e2e8f0', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {aiResponse.expectedQuestions.map(q => <li key={q}>{q}</li>)}
                    </ul>
                  </div>

                  <div style={{ marginBottom: '1rem', background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1rem', borderRadius: '0.75rem' }}>
                    <div style={{ color: '#60a5fa', fontWeight: '700', fontSize: '0.82rem', marginBottom: '0.2rem' }}>💡 Aptitude Strategy</div>
                    <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>{aiResponse.aptitudeTips}</div>
                  </div>

                  <div style={{ marginBottom: '1rem', background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1rem', borderRadius: '0.75rem' }}>
                    <div style={{ color: '#f472b6', fontWeight: '700', fontSize: '0.82rem', marginBottom: '0.2rem' }}>💡 Coding Round Tip</div>
                    <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>{aiResponse.codingTips}</div>
                  </div>

                  <div style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1rem', borderRadius: '0.75rem' }}>
                    <div style={{ color: '#c084fc', fontWeight: '700', fontSize: '0.82rem', marginBottom: '0.2rem' }}>📄 Resume Optimization Tip</div>
                    <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>{aiResponse.resumeTip}</div>
                  </div>

                  <button onClick={() => setAiPrepModal(null)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Close AI Preparation Guide</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
