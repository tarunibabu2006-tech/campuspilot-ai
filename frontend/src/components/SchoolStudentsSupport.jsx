import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

export default function SchoolStudentsSupport() {
  const [activeTab, setActiveTab] = useState('study-assistant')
  // 'study-assistant', 'career-discovery', 'pathway-10', 'higher-ed-12', 'assessment', 'career-explorer', 'olympiads', 'planner', 'early-skills', 'parent-dashboard'

  // AI Study Assistant state
  const [topicInput, setTopicInput] = useState('')
  const [assistantOutput, setAssistantOutput] = useState(null)
  const [loadingAssistant, setLoadingAssistant] = useState(false)

  // Parent Dashboard state
  const [studentProgress] = useState({
    name: 'Gopika K (Class 11 - MPC Stream)',
    studyHoursWeek: '18.5 Hours',
    consistency: '94% On-Track',
    strengths: ['Mathematics (Calculus & Vectors)', 'Physics (Mechanics)', 'Logical Reasoning'],
    weakAreas: ['Organic Chemistry Reactions', 'Speed in Electrostatics Calculations'],
    careerInterests: ['Computer Science Engineering', 'Artificial Intelligence & Robotics', 'Aerospace Engineering'],
    recentTests: [
      { subject: 'Math - Coordinate Geometry', score: '92/100', date: 'Yesterday' },
      { subject: 'Physics - Laws of Motion', score: '88/100', date: '3 days ago' },
      { subject: 'Chemistry - Chemical Bonding', score: '76/100', date: 'Last week' }
    ]
  })

  const handleGenerateStudyAssistant = (e) => {
    e.preventDefault()
    if (!topicInput.trim()) return

    setLoadingAssistant(true)
    setTimeout(() => {
      setAssistantOutput({
        topic: topicInput,
        simpleExplanation: `Think of ${topicInput} like a real-world system where energy and information flow between interconnected components. In easy terms, it is the fundamental rule that governs how variables interact under physical or mathematical constraints.`,
        chapterSummary: `Key Core Takeaway: 1. Core definitions and SI units. 2. Derivation of the governing equation. 3. Practical real-life applications in engineering and natural science.`,
        oneMarkQuestions: [
          `Q1: State the fundamental law of ${topicInput}. (Ans: Stated as the rate of change under standard temperature and pressure).`,
          `Q2: What is the dimensional formula for ${topicInput}? (Ans: [M L^2 T^-2]).`
        ],
        twoMarkQuestions: [
          `Q1: Distinguish between the two main variations of ${topicInput} with neat diagrams.`,
          `Q2: Give two daily life examples where ${topicInput} is observed.`
        ],
        fiveMarkQuestions: [
          `Q1: State the principle, derive the mathematical formula from first principles, and state two limitations of ${topicInput}.`
        ],
        mcqs: [
          { q: `Which of the following directly impacts ${topicInput}?`, options: ['A. Temperature & Pressure', 'B. Color only', 'C. Gravitational force at infinity', 'D. None of the above'], ans: 'A' }
        ]
      })
      setLoadingAssistant(false)
      toast.success(`✨ AI Study Notes & Exam Blueprint Generated for "${topicInput}"!`)
    }, 800)
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
            <span style={{ fontSize: '2.5rem' }}>🎒</span>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
                School Students Career & Academic Cockpit (Class 6–12)
              </h1>
              <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
                AI Study Assistant, 10th/12th Stream Guidance, Olympiad Preps, Study Planner & Parent Dashboard
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── NAVIGATION TABS ────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {[
          { id: 'study-assistant', label: '📚 AI Study Assistant' },
          { id: 'career-discovery', label: '🎯 Career Discovery' },
          { id: 'pathway-10', label: '🧭 10th ➔ 11th Pathway' },
          { id: 'higher-ed-12', label: '🎓 12th ➔ Higher Education' },
          { id: 'olympiads', label: '🏆 Olympiads & JEE/NEET' },
          { id: 'planner', label: '📅 AI Study Planner' },
          { id: 'early-skills', label: '💻 Early Coding Skills' },
          { id: 'parent-dashboard', label: '👨‍👩‍👧 Parent Dashboard' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: '0.65rem',
              background: activeTab === tab.id ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.04)',
              border: activeTab === tab.id ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
              color: activeTab === tab.id ? 'white' : '#94a3b8',
              fontWeight: '700',
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB 1: AI STUDY ASSISTANT ──────────────────────────────── */}
      {activeTab === 'study-assistant' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
            <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', margin: '0 0 0.5rem' }}>
              🔍 Ask AI Any Difficult School Topic
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 1rem' }}>
              Instant simple explanations in easy language, chapter summary, 1-mark, 2-mark, 5-mark important questions & MCQ quizzes.
            </p>

            <form onSubmit={handleGenerateStudyAssistant} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                required
                placeholder="Enter any school topic (e.g. Newton's Laws, Photosynthesis, Quadratic Equations, Trigonometry)..."
                value={topicInput}
                onChange={e => setTopicInput(e.target.value)}
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
              <button
                type="submit"
                disabled={loadingAssistant}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                  color: 'white',
                  fontWeight: '800',
                  fontSize: '0.85rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {loadingAssistant ? '🤖 Generating...' : 'Explain in Simple Words ➔'}
              </button>
            </form>
          </div>

          {assistantOutput && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '1.25rem', padding: '1.75rem' }}>
              <div style={{ color: '#4ade80', fontWeight: '900', fontSize: '1.3rem', marginBottom: '0.75rem' }}>
                💡 Topic: {assistantOutput.topic}
              </div>

              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '1rem' }}>
                <h4 style={{ color: '#fbbf24', margin: '0 0 0.4rem', fontSize: '0.95rem' }}>🌟 Simple Explanation in Easy Language:</h4>
                <p style={{ color: '#e2e8f0', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                  {assistantOutput.simpleExplanation}
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '1rem' }}>
                <h4 style={{ color: '#38bdf8', margin: '0 0 0.4rem', fontSize: '0.95rem' }}>📖 Chapter Summary & Key Takeaways:</h4>
                <p style={{ color: '#e2e8f0', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                  {assistantOutput.chapterSummary}
                </p>
              </div>

              {/* 1, 2, 5 Mark Questions Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '0.75rem', padding: '1rem' }}>
                  <h5 style={{ color: '#a78bfa', margin: '0 0 0.5rem', fontWeight: '800' }}>⭐ Important 1-Mark Questions:</h5>
                  {assistantOutput.oneMarkQuestions.map((q, i) => (
                    <p key={i} style={{ color: '#cbd5e1', fontSize: '0.8rem', lineHeight: 1.4, margin: '0 0 0.4rem' }}>{q}</p>
                  ))}
                </div>

                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '0.75rem', padding: '1rem' }}>
                  <h5 style={{ color: '#60a5fa', margin: '0 0 0.5rem', fontWeight: '800' }}>⭐⭐ Important 2-Mark Questions:</h5>
                  {assistantOutput.twoMarkQuestions.map((q, i) => (
                    <p key={i} style={{ color: '#cbd5e1', fontSize: '0.8rem', lineHeight: 1.4, margin: '0 0 0.4rem' }}>{q}</p>
                  ))}
                </div>

                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '0.75rem', padding: '1rem' }}>
                  <h5 style={{ color: '#f472b6', margin: '0 0 0.5rem', fontWeight: '800' }}>⭐⭐⭐⭐⭐ 5-Mark Long Essay Question:</h5>
                  {assistantOutput.fiveMarkQuestions.map((q, i) => (
                    <p key={i} style={{ color: '#cbd5e1', fontSize: '0.8rem', lineHeight: 1.4, margin: '0 0 0.4rem' }}>{q}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ── TAB 2: CAREER DISCOVERY & INTERESTS ────────────────────── */}
      {activeTab === 'career-discovery' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {[
            { stream: 'Engineering & Technology (MPC)', suitability: 'Strong in Math, Physics & Logical Coding', degrees: 'B.Tech / B.E in CS, AI, Robotics, ECE, Mech', careers: 'Software Architect, Space Scientist, Robotics Lead' },
            { stream: 'Medical & Healthcare (BiPC)', suitability: 'Strong in Biology, Chemistry & Patient Empathy', degrees: 'MBBS, BDS, B.Pharm, Biotech, Nursing', careers: 'Physician, Surgeon, Geneticist, Clinical Pharmacist' },
            { stream: 'Commerce & Finance (MEC / CEC)', suitability: 'Strong in Numbers, Economics & Business Sense', degrees: 'B.Com (Hons), BBA, CA, CMA, CS, CFA', careers: 'Chartered Accountant, Investment Banker, CFO' },
            { stream: 'Humanities & Social Sciences', suitability: 'Strong in Writing, History, Polity & Analysis', degrees: 'B.A Economics, Political Science, Law (BA LLB)', careers: 'IAS Officer, Supreme Court Advocate, Policy Director' }
          ].map((c, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
              <h3 style={{ color: '#fbbf24', fontWeight: '800', fontSize: '1.1rem', margin: '0 0 0.5rem' }}>{c.stream}</h3>
              <p style={{ color: '#4ade80', fontSize: '0.82rem', fontWeight: '700', margin: '0 0 0.5rem' }}>🎯 Who is this for? {c.suitability}</p>
              <div style={{ color: '#cbd5e1', fontSize: '0.8rem', marginBottom: '0.5rem' }}><strong>Degrees:</strong> {c.degrees}</div>
              <div style={{ color: '#38bdf8', fontSize: '0.8rem' }}><strong>Top Careers:</strong> {c.careers}</div>
            </div>
          ))}
        </motion.div>
      )}

      {/* ── TAB 3: 10th -> 11th PATHWAYS ───────────────────────────── */}
      {activeTab === 'pathway-10' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {[
            { path: '1. Science Stream (PCM / PCB / PCMB)', desc: 'Prepares for JEE, NEET, NDA, IISER, B.Tech & MBBS entrance examinations.' },
            { path: '2. Commerce Stream (Accounts, Commerce, Eco, Math)', desc: 'Prepares for CA Foundation, CUET Commerce, IPMAT (IIMs), CS & Law.' },
            { path: '3. Humanities & Arts Stream', desc: 'Prepares for Civil Services (UPSC), CLAT Law, Journalism, Design & Psychology.' },
            { path: '4. Polytechnic / 3-Year Engineering Diploma', desc: 'Direct technical pathway into Junior Engineering (JE) and lateral entry to 2nd year B.Tech.' },
            { path: '5. ITI Technical Certificate Trades', desc: 'Hands-on practical trade skills (Electrician, Fitter, CNC Machinist) with immediate Railway ALP eligibility.' }
          ].map((p, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.25rem' }}>
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1rem', margin: '0 0 0.4rem' }}>{p.path}</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.82rem', margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
            </div>
          ))}
        </motion.div>
      )}

      {/* ── TAB 4: OLYMPIADS & COMPETITIVE EXAMS ────────────────────── */}
      {activeTab === 'olympiads' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {[
            { name: 'JEE Main & Advanced', body: 'NTA / IITs', eligibility: 'Class 11 & 12 (MPC)', target: 'IITs, NITs, IIITs B.Tech Seats' },
            { name: 'NEET UG', body: 'National Testing Agency', eligibility: 'Class 11 & 12 (BiPC)', target: 'AIIMS & All India MBBS / BDS Seats' },
            { name: 'International Math Olympiad (IMO / RMO)', body: 'HBCSE / TIFR', eligibility: 'Class 8 to 12', target: 'Direct Indian Team Representation' },
            { name: 'National Science Olympiad (NSO)', body: 'SOF Global', eligibility: 'Class 6 to 12', target: 'National Merit Medals & Scholarships' },
            { name: 'CUET UG', body: 'National Testing Agency', eligibility: 'Class 12 in any stream', target: 'Delhi University, JNU, BHU Admissions' },
            { name: 'NDA (National Defence Academy)', body: 'UPSC', eligibility: 'Class 12 (Age 16.5 - 19.5)', target: 'Army / Navy / Air Force Officer Entry' }
          ].map((o, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.25rem' }}>
              <span style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', padding: '0.15rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
                {o.body}
              </span>
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem', margin: '0.4rem 0 0.2rem' }}>{o.name}</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.8rem', margin: '0 0 0.4rem' }}><strong>Eligibility:</strong> {o.eligibility}</p>
              <div style={{ color: '#4ade80', fontSize: '0.78rem', fontWeight: '700' }}>🎯 Outcome: {o.target}</div>
            </div>
          ))}
        </motion.div>
      )}

      {/* ── TAB 8: PARENT DASHBOARD ────────────────────────────────── */}
      {activeTab === 'parent-dashboard' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '1.5rem', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.4rem', margin: '0 0 0.2rem' }}>
                👨‍👩‍👧 Parent & Guardian Academic Monitor
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
                Student: <strong style={{ color: '#ffffff' }}>{studentProgress.name}</strong>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', padding: '0.4rem 1rem', borderRadius: '0.5rem', fontWeight: '800', fontSize: '0.85rem' }}>
                ⏱️ {studentProgress.studyHoursWeek}
              </div>
              <div style={{ background: 'rgba(56,189,248,0.15)', color: '#38bdf8', padding: '0.4rem 1rem', borderRadius: '0.5rem', fontWeight: '800', fontSize: '0.85rem' }}>
                ⚡ {studentProgress.consistency}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ color: '#4ade80', fontWeight: '800', margin: '0 0 0.75rem' }}>💪 Key Academic Strengths</h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.6 }}>
                {studentProgress.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ color: '#f87171', fontWeight: '800', margin: '0 0 0.75rem' }}>⚠️ Focus Areas for Improvement</h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.6 }}>
                {studentProgress.weakAreas.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ color: '#fbbf24', fontWeight: '800', margin: '0 0 0.75rem' }}>📝 Recent Mock Assessments</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {studentProgress.recentTests.map((t, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#cbd5e1' }}>
                    <span>{t.subject}</span>
                    <strong style={{ color: '#4ade80' }}>{t.score}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
