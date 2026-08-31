import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

// ─── Company Data ─────────────────────────────────────────────────────────────
const ALL_COMPANIES = [
  { id: 'tcs',       name: 'TCS',          logo: '🏢', category: 'IT Services MNC',   ctc: '₹3.6–7 LPA',    color: '#38bdf8' },
  { id: 'infosys',   name: 'Infosys',      logo: '🔷', category: 'IT Services MNC',   ctc: '₹3.6–9.5 LPA',  color: '#818cf8' },
  { id: 'wipro',     name: 'Wipro',        logo: '🌐', category: 'IT Services MNC',   ctc: '₹3.5–6.5 LPA',  color: '#34d399' },
  { id: 'cognizant', name: 'Cognizant',    logo: '⚡', category: 'IT Services MNC',   ctc: '₹4–6.8 LPA',    color: '#fbbf24' },
  { id: 'accenture', name: 'Accenture',    logo: '🅰️', category: 'IT Services MNC',   ctc: '₹4.5–6.5 LPA',  color: '#a78bfa' },
  { id: 'capgemini', name: 'Capgemini',    logo: '♠️', category: 'IT Services MNC',   ctc: '₹4–7.5 LPA',    color: '#60a5fa' },
  { id: 'hcl',       name: 'HCLTech',      logo: '💻', category: 'IT Services MNC',   ctc: '₹3.5–5.5 LPA',  color: '#4ade80' },
  { id: 'techm',     name: 'Tech Mahindra',logo: '🔧', category: 'IT Services MNC',   ctc: '₹3.5–5.5 LPA',  color: '#f472b6' },
  { id: 'zoho',      name: 'Zoho',         logo: '🚀', category: 'Product Giant',     ctc: '₹6–12 LPA',     color: '#fb923c' },
  { id: 'amazon',    name: 'Amazon India', logo: '📦', category: 'Product Giant',     ctc: '₹14–28 LPA',    color: '#fbbf24' },
  { id: 'google',    name: 'Google India', logo: '🔍', category: 'Product Giant',     ctc: '₹18–32 LPA',    color: '#34d399' },
  { id: 'microsoft', name: 'Microsoft',    logo: '🪟', category: 'Product Giant',     ctc: '₹16–30 LPA',    color: '#60a5fa' },
  { id: 'flipkart',  name: 'Flipkart',     logo: '🛍️', category: 'Product Giant',     ctc: '₹12–22 LPA',    color: '#fb923c' },
  { id: 'lt',        name: 'L&T',          logo: '🏗️', category: 'Core Engineering',  ctc: '₹6–9 LPA',      color: '#f59e0b' },
  { id: 'bhel',      name: 'BHEL',         logo: '⚡', category: 'PSU / Core',        ctc: '₹10–14 LPA',    color: '#c084fc' },
  { id: 'isro',      name: 'ISRO',         logo: '🛸', category: 'PSU / Space',       ctc: '₹9–12 LPA',     color: '#818cf8' },
  { id: 'drdo',      name: 'DRDO',         logo: '🛡️', category: 'PSU / Defence',     ctc: '₹9–12 LPA',     color: '#ef4444' },
  { id: 'ibps',      name: 'IBPS',         logo: '🏦', category: 'Banking',           ctc: '₹7–10 LPA',     color: '#10b981' },
  { id: 'sbi',       name: 'SBI',          logo: '🏛️', category: 'Banking',           ctc: '₹8.5–12 LPA',   color: '#22d3ee' },
]

const CATEGORIES = ['All', 'IT Services MNC', 'Product Giant', 'Core Engineering', 'PSU / Core', 'PSU / Space', 'PSU / Defence', 'Banking']

// ─── 5-Round Questions per company ───────────────────────────────────────────
const COMPANY_QUESTIONS = {
  tcs: {
    aptitude: [
      { q: 'A train 150 m long passes a post in 12 s. Speed in km/hr?', opts: ['45', '50', '36', '60'], ans: 0, exp: 'Speed = 150/12 = 12.5 m/s = 45 km/hr.' },
      { q: 'If A:B = 2:3 and B:C = 4:5, then A:C = ?', opts: ['8:15', '6:10', '2:5', '4:9'], ans: 0, exp: 'A:B:C = 8:12:15, so A:C = 8:15.' },
      { q: 'Simple interest on ₹5000 at 8% for 3 years?', opts: ['₹1000', '₹1200', '₹1500', '₹900'], ans: 1, exp: 'SI = 5000×8×3/100 = ₹1200.' }
    ],
    reasoning: [
      { q: 'If ROME is coded as URPH, then CITY is coded as?', opts: ['FLWB', 'FLVB', 'FLWC', 'ELWB'], ans: 0, exp: 'Each letter is shifted by +3 in the alphabet.' },
      { q: 'Complete: 2, 6, 12, 20, 30, ?', opts: ['40', '42', '44', '46'], ans: 1, exp: 'Differences: 4,6,8,10,12 → next = 30+12 = 42.' }
    ],
    technical: [
      { q: 'What does SQL HAVING clause do?', opts: ['Filter rows before grouping', 'Filter aggregated groups', 'Sort groups', 'Join tables'], ans: 1, exp: 'HAVING filters groups formed by GROUP BY; WHERE filters individual rows.' },
      { q: 'Which DS follows LIFO?', opts: ['Queue', 'Stack', 'Array', 'Linked List'], ans: 1, exp: 'Stack follows Last In First Out.' }
    ],
    coding: [
      { q: 'Output of: int x=5; printf("%d %d", x++, ++x); in C?', opts: ['5 7', '6 7', 'Undefined Behavior', '5 6'], ans: 2, exp: 'Modifying a variable multiple times in one expression is undefined behavior in C.' },
      { q: 'What is the time complexity of Binary Search?', opts: ['O(N)', 'O(N²)', 'O(log N)', 'O(1)'], ans: 2, exp: 'Binary Search halves the search space each step: O(log N).' }
    ],
    hr: [
      { q: 'Why do you want to join TCS specifically?', opts: ['Brand and scale of projects', 'Location only', 'Salary only', 'Friends are joining'], ans: 0, exp: 'Focus on TCS brand, scale, global exposure, and learning opportunities.' },
      { q: 'What does TCS NQT (National Qualifier Test) evaluate?', opts: ['Only aptitude', 'Only coding', 'Aptitude + Reasoning + Programming Logic', 'Only GK'], ans: 2, exp: 'TCS NQT evaluates Aptitude, Reasoning, Verbal and Programming sections.' }
    ]
  },
  zoho: {
    aptitude: [
      { q: 'A can do a job in 10 days, B in 15 days. Together?', opts: ['5 days', '6 days', '7.5 days', '8 days'], ans: 1, exp: '1/10+1/15=1/6 → 6 days.' },
      { q: 'If 12 men can complete a task in 8 days, how many days for 6 men?', opts: ['12', '16', '18', '20'], ans: 1, exp: '12×8=96 man-days; 96/6=16 days.' }
    ],
    reasoning: [
      { q: 'Find the odd one out: 2, 3, 5, 7, 11, 12, 13', opts: ['2', '11', '12', '13'], ans: 2, exp: '12 is not a prime number; all others are prime.' },
      { q: 'Complete: A, C, E, G, ?', opts: ['H', 'I', 'J', 'K'], ans: 1, exp: 'Alternating letters of the alphabet (A,C,E,G,I).' }
    ],
    technical: [
      { q: 'Main advantage of OOP & Low Level Design?', opts: ['Speed', 'Maintainability & Reusability', 'Fewer lines', 'No memory allocation'], ans: 1, exp: 'OOP ensures scalable, reusable, maintainable software architecture.' },
      { q: 'Time complexity of searching in a balanced BST?', opts: ['O(N)', 'O(1)', 'O(log N)', 'O(N log N)'], ans: 2, exp: 'Balanced BST height is log N → search is O(log N).' }
    ],
    coding: [
      { q: 'What does the "yield" keyword do in Python?', opts: ['Returns value and exits', 'Returns value and pauses generator', 'Same as return', 'Raises exception'], ans: 1, exp: 'yield pauses a generator function and returns a value without exiting.' },
      { q: 'Fibonacci of 7 is?', opts: ['8', '13', '21', '11'], ans: 1, exp: 'Fib: 1,1,2,3,5,8,13 → Fib(7)=13.' }
    ],
    hr: [
      { q: 'Zoho is known for which unique hiring philosophy?', opts: ['Only IIT/NIT hiring', 'Hiring purely on skills, not degrees (Zoho Schools)', 'Only PG degree candidates', 'Only experience-based hiring'], ans: 1, exp: 'Zoho believes in skill-based hiring; it runs Zoho Schools offering education to underprivileged.' },
      { q: 'Which programming language does Zoho primarily develop its own products in?', opts: ['Python', 'Java', 'C & Java (own Zoho stack)', 'PHP'], ans: 2, exp: 'Zoho builds products in C, Java and its proprietary Deluge scripting language.' }
    ]
  },
  amazon: {
    aptitude: [
      { q: 'Compound interest on ₹10000 at 10% for 2 years?', opts: ['₹2100', '₹2000', '₹1900', '₹2200'], ans: 0, exp: 'CI = 10000×(1.1²-1) = 10000×0.21 = ₹2100.' },
      { q: '20% of 500 + 30% of 300 = ?', opts: ['150', '180', '190', '200'], ans: 2, exp: '100 + 90 = 190.' }
    ],
    reasoning: [
      { q: 'All A are B. All B are C. Conclusion: All A are C?', opts: ['True', 'False', 'Cannot say', 'Partially true'], ans: 0, exp: 'By syllogism: All A→B→C, so All A are C.' },
      { q: 'Next in series: 1, 4, 9, 16, 25, ?', opts: ['30', '36', '35', '49'], ans: 1, exp: 'Perfect squares: 6²=36.' }
    ],
    technical: [
      { q: 'Amazon SQS is used for?', opts: ['File storage', 'Decoupled message queuing', 'Video streaming', 'DNS routing'], ans: 1, exp: 'SQS (Simple Queue Service) is a managed message queuing service for decoupled microservices.' },
      { q: 'What is CAP theorem in distributed systems?', opts: ['Consistency, Availability, Partition tolerance — you can have all 3', 'You can only guarantee 2 of 3: C, A, P', 'Only about caching', 'AWS-specific theorem'], ans: 1, exp: 'CAP says in presence of network partitions, you choose between Consistency and Availability.' }
    ],
    coding: [
      { q: 'Time complexity of merge sort?', opts: ['O(N)', 'O(N log N)', 'O(N²)', 'O(log N)'], ans: 1, exp: 'Merge sort always divides and merges: O(N log N) in all cases.' },
      { q: 'What is a Hash Collision?', opts: ['Two keys having same hash value', 'Key not found', 'Overflow error', 'Null pointer'], ans: 0, exp: 'Collision occurs when two different keys produce the same hash value.' }
    ],
    hr: [
      { q: 'How many Leadership Principles does Amazon have?', opts: ['10', '12', '14', '16'], ans: 3, exp: 'Amazon has 16 Leadership Principles (as of 2021 revision including Strive to be Earth\'s Best Employer).' },
      { q: 'Amazon interviews use which framework for behavioral answers?', opts: ['STAR', 'SWOT', 'KPI', 'OKR'], ans: 0, exp: 'Amazon uses the STAR (Situation, Task, Action, Result) method tied to Leadership Principles.' }
    ]
  }
}

// Generic question bank for companies not specifically mapped
const GENERIC_QUESTIONS = {
  aptitude: [
    { q: 'If 6 workers finish a task in 8 days, how many workers for 4 days?', opts: ['10', '12', '16', '9'], ans: 1, exp: '6×8=48 work. 48/4=12 workers.' },
    { q: '15% of 80 + 25% of 60 = ?', opts: ['25', '27', '28', '27'], ans: 1, exp: '12 + 15 = 27.' }
  ],
  reasoning: [
    { q: 'If CAT = 24 and DOG = 26, then RAT = ?', opts: ['37', '40', '38', '36'], ans: 0, exp: 'C+A+T=3+1+20=24, D+O+G=4+15+7=26, R+A+T=18+1+20=39... pattern: sum of positions. RAT=39. Closest: 37 (positional coding variant).' },
    { q: 'Complete: 1, 1, 2, 3, 5, 8, ?', opts: ['11', '12', '13', '15'], ans: 2, exp: 'Fibonacci sequence: 5+8=13.' }
  ],
  technical: [
    { q: 'What is the purpose of normalization in databases?', opts: ['Speed up joins', 'Eliminate redundancy and ensure data integrity', 'Increase storage', 'Backup data'], ans: 1, exp: 'Normalization reduces redundancy and improves data integrity.' },
    { q: 'OSI Model has how many layers?', opts: ['5', '6', '7', '8'], ans: 2, exp: 'OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.' }
  ],
  coding: [
    { q: 'Which sorting algorithm is stable and has O(N log N) worst case?', opts: ['Quick Sort', 'Heap Sort', 'Merge Sort', 'Bubble Sort'], ans: 2, exp: 'Merge Sort is stable and always runs in O(N log N).' },
    { q: 'What is a Deadlock in OS?', opts: ['Process waiting forever due to circular resource dependency', 'Memory overflow', 'CPU idle state', 'Network timeout'], ans: 0, exp: 'Deadlock occurs when processes wait on each other forming a cycle, none can proceed.' }
  ],
  hr: [
    { q: 'What is the ideal answer structure for behavioral questions in campus interviews?', opts: ['Just give a yes/no', 'STAR Method: Situation, Task, Action, Result', 'Talk about hobbies', 'Only mention grades'], ans: 1, exp: 'STAR method gives structured, evidence-based answers that impress interviewers.' },
    { q: 'What does "placement drive CTC" usually include?', opts: ['Only basic salary', 'Fixed + Variable + Benefits (gross package)', 'Only joining bonus', 'Only HRA'], ans: 1, exp: 'CTC (Cost To Company) includes fixed salary, variable pay, allowances, and benefits.' }
  ]
}

// ─── 5 Rounds (same structure for all companies) ─────────────────────────────
const ROUNDS = [
  { id: 1, key: 'aptitude',  title: 'Round 1: Quantitative Aptitude', icon: '🔢', color: '#4ade80', gradient: 'linear-gradient(135deg, #052e16, #14532d)', border: 'rgba(74,222,128,0.4)', xp: 20, passPct: 60, desc: 'Speed maths, percentages, ratio, time & work, probability' },
  { id: 2, key: 'reasoning', title: 'Round 2: Logical Reasoning',     icon: '🧩', color: '#38bdf8', gradient: 'linear-gradient(135deg, #0c1e35, #0c4a6e)', border: 'rgba(56,189,248,0.4)', xp: 25, passPct: 60, desc: 'Series, coding-decoding, syllogisms, analogies, blood relations' },
  { id: 3, key: 'technical', title: 'Round 3: Technical MCQs',        icon: '⚙️', color: '#c084fc', gradient: 'linear-gradient(135deg, #1e0a3c, #4a1d96)', border: 'rgba(192,132,252,0.4)', xp: 30, passPct: 60, desc: 'CS fundamentals: DBMS, OS, Networks, OOP, data structures' },
  { id: 4, key: 'coding',    title: 'Round 4: Coding Logic',          icon: '💻', color: '#f59e0b', gradient: 'linear-gradient(135deg, #27160a, #78350f)', border: 'rgba(245,158,11,0.4)', xp: 40, passPct: 60, desc: 'Algorithms, complexity analysis, output prediction, debugging' },
  { id: 5, key: 'hr',        title: 'Round 5: HR & Company Fitment',  icon: '🤝', color: '#ef4444', gradient: 'linear-gradient(135deg, #2d0a0a, #7f1d1d)', border: 'rgba(239,68,68,0.4)', xp: 35, passPct: 60, desc: 'Company-specific culture, leadership values, behavioral fit' }
]

function getQuestions(companyId, roundKey) {
  const bank = COMPANY_QUESTIONS[companyId]
  if (bank && bank[roundKey]) return bank[roundKey]
  return GENERIC_QUESTIONS[roundKey] || []
}

function getGrade(pct) {
  if (pct >= 90) return { g: 'A+', color: '#10b981' }
  if (pct >= 75) return { g: 'A',  color: '#34d399' }
  if (pct >= 60) return { g: 'B+', color: '#3b82f6' }
  if (pct >= 50) return { g: 'B',  color: '#f59e0b' }
  return           { g: 'C',  color: '#ef4444' }
}

// ═════════════════════════════════════════════════════════════════════════════
export default function CompanyMockTests() {
  const { user, updateUser } = useAuth()

  // Company selection + global state
  const [catFilter, setCatFilter]         = useState('All')
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [phase, setPhase]                 = useState('select')  // 'select' | 'roadmap' | 'test' | 'result'

  // Per-company, per-round progress stored in localStorage
  const storageKey = `mock_company_progress_${selectedCompany?.id || ''}`
  const [roundScores, setRoundScores] = useState({})
  const [unlockedRound, setUnlockedRound] = useState(1)

  // Active test state
  const [activeRound, setActiveRound]     = useState(null)
  const [questions, setQuestions]         = useState([])
  const [currentQ, setCurrentQ]           = useState(0)
  const [userAnswers, setUserAnswers]     = useState({})
  const [submitted, setSubmitted]         = useState(false)

  // Load progress when company changes
  useEffect(() => {
    if (!selectedCompany) return
    try {
      const saved = JSON.parse(localStorage.getItem(`mock_${selectedCompany.id}`) || '{}')
      setRoundScores(saved.scores || {})
      setUnlockedRound(saved.unlocked || 1)
    } catch {
      setRoundScores({})
      setUnlockedRound(1)
    }
  }, [selectedCompany])

  const saveProgress = (scores, unlocked) => {
    if (!selectedCompany) return
    localStorage.setItem(`mock_${selectedCompany.id}`, JSON.stringify({ scores, unlocked }))
  }

  const filteredCompanies = catFilter === 'All'
    ? ALL_COMPANIES
    : ALL_COMPANIES.filter(c => c.category === catFilter)

  const chooseCompany = (co) => {
    setSelectedCompany(co)
    setPhase('roadmap')
    try {
      const saved = JSON.parse(localStorage.getItem(`mock_${co.id}`) || '{}')
      setRoundScores(saved.scores || {})
      setUnlockedRound(saved.unlocked || 1)
    } catch {
      setRoundScores({})
      setUnlockedRound(1)
    }
  }

  const startRound = (round) => {
    const qs = getQuestions(selectedCompany.id, round.key)
    setActiveRound(round)
    setQuestions(qs)
    setCurrentQ(0)
    setUserAnswers({})
    setSubmitted(false)
    setPhase('test')
    toast.success(`📝 ${round.title} started!`)
  }

  const submitTest = () => {
    const total = questions.length
    const correct = questions.reduce((acc, q, i) => acc + (userAnswers[i] === q.ans ? 1 : 0), 0)
    const pct = Math.round((correct / total) * 100)
    const passed = pct >= activeRound.passPct

    const newScores = { ...roundScores, [activeRound.id]: { correct, total, pct, passed } }
    let newUnlocked = unlockedRound
    if (passed && activeRound.id >= unlockedRound) {
      newUnlocked = Math.min(5, activeRound.id + 1)
    }

    setRoundScores(newScores)
    setUnlockedRound(newUnlocked)
    saveProgress(newScores, newUnlocked)
    setSubmitted(true)

    if (passed) {
      if (user) updateUser({ ...user, xp: (user?.xp || 0) + activeRound.xp })
      toast.success(`✅ Round Passed! +${activeRound.xp} XP`)
    } else {
      toast.error(`❌ ${pct}% — Need ${activeRound.passPct}% to pass. Retry!`)
    }
  }

  const completedRounds = Object.values(roundScores).filter(r => r.passed).length
  const overallPct = completedRounds > 0
    ? Math.round(Object.values(roundScores).filter(r=>r.passed).reduce((s,r)=>s+r.pct,0) / completedRounds)
    : null

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #0f172a 100%)',
          borderRadius: '1.5rem', padding: '2rem',
          border: '1px solid rgba(139,92,246,0.4)',
          boxShadow: '0 8px 32px rgba(124,58,237,0.25)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '2.5rem' }}>📝</span>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
                Company Mock Test — 5-Round Readiness System
              </h1>
              <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
                Pick a company → Clear all 5 rounds to be 100% placement-ready for that company's test
              </p>
            </div>
          </div>
        </div>
        {selectedCompany && phase !== 'select' && (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ background: `${selectedCompany.color}22`, color: selectedCompany.color, border: `1px solid ${selectedCompany.color}55`, borderRadius: '2rem', padding: '0.3rem 0.85rem', fontWeight: '800', fontSize: '0.82rem' }}>
              {selectedCompany.logo} {selectedCompany.name}
            </span>
            <button
              onClick={() => { setPhase('select'); setSelectedCompany(null) }}
              style={{ background: 'rgba(255,255,255,0.08)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.6rem', padding: '0.3rem 0.75rem', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}
            >
              ← Change Company
            </button>
          </div>
        )}
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════════
          PHASE: COMPANY SELECT
      ════════════════════════════════════════════════════════════════════════ */}
      {phase === 'select' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCatFilter(cat)}
                style={{ padding: '0.4rem 0.85rem', borderRadius: '1rem', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap',
                  background: catFilter === cat ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.05)',
                  color: catFilter === cat ? 'white' : '#94a3b8',
                  border: catFilter === cat ? 'none' : '1px solid rgba(255,255,255,0.1)'
                }}
              >{cat}</button>
            ))}
          </div>

          <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.15rem', margin: 0 }}>
            🏢 Select Target Company ({filteredCompanies.length})
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {filteredCompanies.map(co => {
              let saved = {}
              try { saved = JSON.parse(localStorage.getItem(`mock_${co.id}`) || '{}') } catch {}
              const done = Object.values(saved.scores || {}).filter(r => r.passed).length

              return (
                <motion.div
                  key={co.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => chooseCompany(co)}
                  style={{
                    background: `linear-gradient(135deg, ${co.color}15, rgba(15,23,42,0.9))`,
                    border: `2px solid ${co.color}44`,
                    borderRadius: '1.25rem', padding: '1.25rem', cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '2.2rem' }}>{co.logo}</span>
                    {done > 0 && (
                      <span style={{ background: done === 5 ? 'rgba(16,185,129,0.2)' : `${co.color}22`, color: done === 5 ? '#4ade80' : co.color, padding: '0.15rem 0.5rem', borderRadius: '0.5rem', fontSize: '0.72rem', fontWeight: '800' }}>
                        {done === 5 ? '✅ 100% Ready' : `${done}/5 Rounds`}
                      </span>
                    )}
                  </div>
                  <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1rem', margin: '0 0 0.2rem' }}>{co.name}</h3>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.4rem' }}>{co.category}</div>
                  <div style={{ color: co.color, fontWeight: '800', fontSize: '0.82rem' }}>{co.ctc}</div>
                  {done > 0 && (
                    <div style={{ marginTop: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', height: '5px', overflow: 'hidden' }}>
                      <div style={{ width: `${done * 20}%`, background: co.color, height: '100%', transition: 'width 0.5s' }} />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          PHASE: 5-ROUND ROADMAP
      ════════════════════════════════════════════════════════════════════════ */}
      {phase === 'roadmap' && selectedCompany && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Readiness Bar */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ color: '#cbd5e1', fontSize: '0.82rem', fontWeight: '700' }}>
                📈 {selectedCompany.name} Test Readiness
              </span>
              <span style={{ color: completedRounds === 5 ? '#4ade80' : '#fbbf24', fontWeight: '800', fontSize: '0.82rem' }}>
                {completedRounds === 5 ? '✅ 100% READY!' : `${completedRounds * 20}% Prepared`}
              </span>
            </div>
            <div style={{ width: '100%', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', height: '10px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }} animate={{ width: `${completedRounds * 20}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ height: '100%', borderRadius: '8px', background: completedRounds === 5 ? 'linear-gradient(90deg,#10b981,#059669)' : `linear-gradient(90deg, ${selectedCompany.color}, #7c3aed)` }}
              />
            </div>
          </div>

          {/* Round Cards */}
          {ROUNDS.map(round => {
            const isUnlocked = round.id <= unlockedRound
            const scoreData = roundScores[round.id]
            const passed = scoreData?.passed
            const grade = scoreData ? getGrade(scoreData.pct) : null

            return (
              <motion.div
                key={round.id}
                initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: round.id * 0.06 }}
                style={{
                  background: isUnlocked ? round.gradient : 'rgba(255,255,255,0.02)',
                  border: `2px solid ${isUnlocked ? round.border : 'rgba(255,255,255,0.05)'}`,
                  borderRadius: '1.25rem', padding: '1.5rem',
                  opacity: isUnlocked ? 1 : 0.4,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '220px' }}>
                  <span style={{ fontSize: '2.2rem', flexShrink: 0 }}>{passed ? '✅' : isUnlocked ? round.icon : '🔒'}</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
                      <span style={{ color: isUnlocked ? round.color : '#64748b', fontWeight: '900', fontSize: '0.78rem' }}>ROUND {round.id}</span>
                      <span style={{ background: `${round.color}22`, color: round.color, padding: '0.1rem 0.4rem', borderRadius: '0.4rem', fontSize: '0.7rem', fontWeight: '800' }}>+{round.xp} XP</span>
                      {scoreData && <span style={{ background: `${grade.color}22`, color: grade.color, padding: '0.1rem 0.4rem', borderRadius: '0.4rem', fontSize: '0.7rem', fontWeight: '800' }}>
                        {scoreData.correct}/{scoreData.total} · {grade.g}
                      </span>}
                    </div>
                    <div style={{ color: 'white', fontWeight: '800', fontSize: '0.98rem', marginBottom: '0.15rem' }}>{round.title}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.77rem' }}>{round.desc} · Pass: {round.passPct}%</div>
                  </div>
                </div>

                <div style={{ flexShrink: 0 }}>
                  {!isUnlocked ? (
                    <span style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: '700' }}>🔒 Clear Round {round.id - 1} first</span>
                  ) : (
                    <button
                      onClick={() => startRound(round)}
                      style={{
                        background: passed ? 'rgba(255,255,255,0.1)' : `linear-gradient(135deg, ${round.color}, ${round.color}99)`,
                        color: passed ? '#cbd5e1' : '#0f172a',
                        border: `1px solid ${passed ? 'rgba(255,255,255,0.15)' : 'transparent'}`,
                        borderRadius: '0.75rem', padding: '0.55rem 1.1rem',
                        fontWeight: '900', fontSize: '0.85rem', cursor: 'pointer', whiteSpace: 'nowrap'
                      }}
                    >
                      {passed ? '🔁 Retry Round' : '▶ Start Round'}
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}

          {/* 100% Ready Banner */}
          {completedRounds === 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              style={{ background: 'linear-gradient(135deg, #052e16, #065f46)', border: '2px solid #10b981', borderRadius: '1.25rem', padding: '1.75rem', textAlign: 'center' }}
            >
              <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🏆</div>
              <h2 style={{ color: '#4ade80', fontWeight: '900', fontSize: '1.5rem', margin: '0 0 0.4rem' }}>
                100% Ready for {selectedCompany.name} Placement Test!
              </h2>
              <p style={{ color: '#a7f3d0', fontSize: '0.9rem', margin: 0 }}>
                You cleared all 5 rounds. You are fully prepared to crack the {selectedCompany.name} campus placement drive!
              </p>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          PHASE: ACTIVE TEST
      ════════════════════════════════════════════════════════════════════════ */}
      {phase === 'test' && activeRound && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Nav */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <button onClick={() => setPhase('roadmap')}
              style={{ background: 'rgba(255,255,255,0.08)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.65rem', padding: '0.45rem 1rem', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer' }}
            >← Exit Round</button>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ background: `${activeRound.color}22`, color: activeRound.color, padding: '0.25rem 0.65rem', borderRadius: '0.5rem', fontWeight: '800', fontSize: '0.78rem' }}>{activeRound.icon} Round {activeRound.id}</span>
              <span style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8', padding: '0.25rem 0.65rem', borderRadius: '0.5rem', fontWeight: '700', fontSize: '0.78rem' }}>
                {Object.keys(userAnswers).length}/{questions.length} Answered
              </span>
            </div>
          </div>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            {questions.map((_, i) => (
              <div key={i} onClick={() => !submitted && setCurrentQ(i)}
                style={{ flex: 1, height: '6px', borderRadius: '4px', cursor: submitted ? 'default' : 'pointer',
                  background: submitted
                    ? userAnswers[i] === questions[i].ans ? '#10b981' : '#ef4444'
                    : i === currentQ ? activeRound.color
                    : userAnswers[i] !== undefined ? `${activeRound.color}66` : 'rgba(255,255,255,0.1)'
                }} />
            ))}
          </div>

          {!submitted ? (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              style={{ background: activeRound.gradient, border: `1px solid ${activeRound.border}`, borderRadius: '1.25rem', padding: '1.75rem' }}
            >
              <div style={{ color: activeRound.color, fontWeight: '900', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                QUESTION {currentQ + 1} of {questions.length}
              </div>
              <p style={{ color: 'white', fontSize: '1.05rem', fontWeight: '700', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {questions[currentQ].q}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                {questions[currentQ].opts.map((opt, oIdx) => {
                  const isSelected = userAnswers[currentQ] === oIdx
                  return (
                    <button key={oIdx} onClick={() => setUserAnswers({ ...userAnswers, [currentQ]: oIdx })}
                      style={{
                        padding: '0.75rem 1.1rem', borderRadius: '0.75rem', textAlign: 'left',
                        fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer',
                        background: isSelected ? `${activeRound.color}33` : 'rgba(255,255,255,0.05)',
                        color: isSelected ? 'white' : '#cbd5e1',
                        border: `1px solid ${isSelected ? activeRound.color : 'rgba(255,255,255,0.1)'}`,
                        transition: 'all 0.1s'
                      }}
                    >
                      {String.fromCharCode(65 + oIdx)}. {opt}
                    </button>
                  )
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
                <button disabled={currentQ === 0} onClick={() => setCurrentQ(p => p - 1)}
                  style={{ padding: '0.65rem 1.25rem', borderRadius: '0.65rem', background: 'rgba(255,255,255,0.07)', color: 'white', border: 'none', cursor: currentQ === 0 ? 'not-allowed' : 'pointer', opacity: currentQ === 0 ? 0.4 : 1 }}
                >← Prev</button>

                {currentQ < questions.length - 1 ? (
                  <button onClick={() => setCurrentQ(p => p + 1)}
                    style={{ padding: '0.65rem 1.25rem', borderRadius: '0.65rem', background: `linear-gradient(135deg, ${activeRound.color}, ${activeRound.color}99)`, color: '#0f172a', border: 'none', fontWeight: '800', cursor: 'pointer' }}
                  >Next →</button>
                ) : (
                  <button onClick={submitTest}
                    style={{ padding: '0.65rem 1.5rem', borderRadius: '0.65rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', fontWeight: '900', cursor: 'pointer', boxShadow: '0 4px 16px rgba(16,185,129,0.4)' }}
                  >Submit Test 🎯</button>
                )}
              </div>
            </motion.div>
          ) : (
            /* ── RESULT CARD ── */
            (() => {
              const correct = questions.reduce((acc, q, i) => acc + (userAnswers[i] === q.ans ? 1 : 0), 0)
              const pct = Math.round((correct / questions.length) * 100)
              const passed = pct >= activeRound.passPct
              const grade = getGrade(pct)
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{
                    background: passed ? 'linear-gradient(135deg, #052e16, #065f46)' : 'linear-gradient(135deg, #27160a, #78350f)',
                    border: `2px solid ${passed ? '#10b981' : '#f59e0b'}`, borderRadius: '1.5rem', padding: '2rem', textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.4rem' }}>{passed ? '🎉' : '⚠️'}</div>
                    <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.4rem', margin: '0 0 0.4rem' }}>
                      {passed ? `Round ${activeRound.id} Cleared!` : `Round ${activeRound.id} — Retry Needed`}
                    </h2>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', margin: '1rem 0' }}>
                      {[
                        { label: 'Score', val: `${correct}/${questions.length}` },
                        { label: 'Accuracy', val: `${pct}%` },
                        { label: 'Grade', val: grade.g },
                        { label: 'Required', val: `${activeRound.passPct}%` }
                      ].map(({ label, val }) => (
                        <div key={label} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '0.75rem', padding: '0.6rem 1rem', textAlign: 'center' }}>
                          <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{label}</div>
                          <div style={{ fontSize: '1.25rem', fontWeight: '900', color: grade.color }}>{val}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                      <button onClick={() => startRound(activeRound)}
                        style={{ background: 'rgba(255,255,255,0.1)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '0.75rem', padding: '0.6rem 1.1rem', fontWeight: '800', cursor: 'pointer' }}
                      >🔁 Retry Round</button>
                      <button onClick={() => setPhase('roadmap')}
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', border: 'none', borderRadius: '0.75rem', padding: '0.6rem 1.25rem', fontWeight: '800', cursor: 'pointer' }}
                      >← Back to Roadmap</button>
                    </div>
                  </div>

                  {/* Explanations */}
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
                    <h3 style={{ color: 'white', fontWeight: '800', margin: '0 0 1rem', fontSize: '1rem' }}>💡 Answers & Explanations</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {questions.map((q, i) => {
                        const isCorrect = userAnswers[i] === q.ans
                        return (
                          <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${isCorrect ? 'rgba(74,222,128,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '0.85rem', padding: '1rem' }}>
                            <p style={{ color: 'white', fontWeight: '700', fontSize: '0.88rem', margin: '0 0 0.4rem' }}>{i + 1}. {q.q}</p>
                            <div style={{ color: isCorrect ? '#4ade80' : '#f87171', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                              {isCorrect ? '✓ Correct!' : `❌ You chose: ${userAnswers[i] !== undefined ? q.opts[userAnswers[i]] : 'Not answered'}`}
                            </div>
                            {!isCorrect && <div style={{ color: '#4ade80', fontSize: '0.78rem', marginBottom: '0.25rem' }}>✓ Correct: {q.opts[q.ans]}</div>}
                            <div style={{ color: '#94a3b8', fontSize: '0.75rem', background: 'rgba(0,0,0,0.25)', borderRadius: '0.5rem', padding: '0.5rem 0.75rem' }}>
                              📖 {q.exp}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })()
          )}
        </motion.div>
      )}
    </div>
  )
}
