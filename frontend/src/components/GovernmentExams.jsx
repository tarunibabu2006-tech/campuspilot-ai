import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const GOV_EXAMS_DATA = [
  {
    id: 'upsc-cse',
    category: 'UPSC',
    name: 'UPSC Civil Services (IAS / IPS / IFS)',
    conductingBody: 'Union Public Service Commission',
    eligibility: 'Any Graduation Degree | Age: 21–32 Years (Relaxation for OBC/SC/ST)',
    salary: '₹56,100 – ₹2,50,000/month (Level 10-18)',
    vacancies: '1,000+ Annually',
    examDates: {
      notification: 'February 2026',
      prelims: 'May 2026',
      mains: 'September 2026',
      interview: 'Jan–March 2027'
    },
    pattern: [
      { stage: 'Stage 1: Prelims', details: 'GS Paper 1 (200 Marks) + CSAT Paper 2 (200 Marks, 33% Qualifying)' },
      { stage: 'Stage 2: Mains', details: '9 Descriptive Papers (1750 Marks total) — Essay, GS 1-4, Optional 1-2' },
      { stage: 'Stage 3: Interview', details: 'Personality Test (275 Marks) at Dholpur House, New Delhi' }
    ],
    syllabus: [
      { subject: 'History & Culture', topics: 'Ancient, Medieval, Modern Indian History, Art & Architecture, Post-Independence' },
      { subject: 'Polity & Governance', topics: 'Constitution, Executive, Judiciary, Parliament, Local Govt, Social Justice' },
      { subject: 'Economy', topics: 'Macroeconomics, Fiscal Policy, Banking, Inflation, Agriculture, Infrastructure' },
      { subject: 'Geography & Environment', topics: 'Physical Geography, Climatology, Biodiversity, Climate Change, Disasters' },
      { subject: 'Science & Tech & Current Affairs', topics: 'Space, AI/Defense Tech, Biotechnology, Daily National/International News' }
    ],
    applyLink: 'https://upsc.gov.in',
    notesRef: 'UPSC Civil Services (IAS/IPS) — Indian Polity & Constitution'
  },
  {
    id: 'ssc-cgl',
    category: 'SSC',
    name: 'SSC CGL (Combined Graduate Level)',
    conductingBody: 'Staff Selection Commission',
    eligibility: 'Bachelor’s Degree in any discipline | Age: 18–32 Years',
    salary: '₹35,400 – ₹1,42,400/month (Level 4–8)',
    vacancies: '15,000+ Posts',
    examDates: {
      notification: 'June 2026',
      tier1: 'September 2026',
      tier2: 'December 2026'
    },
    pattern: [
      { stage: 'Tier 1 (CBT)', details: '100 Qs / 200 Marks (Reasoning 50, Quant 50, English 50, GK 50) — 60 mins' },
      { stage: 'Tier 2 (CBT)', details: 'Paper 1: Math & Reasoning (180 Marks) + English & GA (210 Marks) + Computer Test (60 Marks)' }
    ],
    syllabus: [
      { subject: 'Quantitative Aptitude', topics: 'Geometry, Mensuration, Trigonometry, Algebra, Percentages, Profit-Loss, Time-Work' },
      { subject: 'General Intelligence & Reasoning', topics: 'Analogies, Syllogisms, Series, Coding-Decoding, Non-Verbal Puzzles' },
      { subject: 'English Comprehension', topics: 'Grammar, Error Spotting, Cloze Test, Reading Passages, Idioms & Phrases' },
      { subject: 'General Awareness', topics: 'Static GK, Indian History, Polity, Geography, Current Affairs 2026' }
    ],
    applyLink: 'https://ssc.gov.in',
    notesRef: 'SSC CGL & CHSL Tier 1 & 2 — Quantitative Aptitude'
  },
  {
    id: 'ibps-sbi-po',
    category: 'Banking',
    name: 'SBI & IBPS Probationary Officer (PO)',
    conductingBody: 'Institute of Banking Personnel Selection / SBI',
    eligibility: 'Graduate in any discipline | Age: 20–30 Years',
    salary: '₹65,000 – ₹78,000/month CTC',
    vacancies: '8,000+ Vacancies across Public Sector Banks',
    examDates: {
      notification: 'August 2026',
      prelims: 'October 2026',
      mains: 'November 2026',
      interview: 'January 2027'
    },
    pattern: [
      { stage: 'Prelims Exam', details: 'English (30 Qs), Quant (35 Qs), Reasoning (35 Qs) — 100 Marks (60 Mins)' },
      { stage: 'Mains Exam', details: 'Reasoning & Computer (60 M), Data Analysis (60 M), GA/Banking (40 M), English (40 M) + Descriptive (50 M)' },
      { stage: 'Group Discussion & Interview', details: 'GD (20 Marks) + Personal Interview (30 Marks)' }
    ],
    syllabus: [
      { subject: 'Data Analysis & Interpretation', topics: 'Tabular, Pie, Bar Graphs, Caselets, Probability, Number Series' },
      { subject: 'Reasoning & Computer Aptitude', topics: 'Seating Arrangement (Circular, Linear), Puzzles, Input-Output, Coding' },
      { subject: 'Banking & Financial Awareness', topics: 'RBI Guidelines, Monetary Policy, UPI/Digital Banking, Union Budget 2026' }
    ],
    applyLink: 'https://ibps.in',
    notesRef: 'Banking Exams (SBI / IBPS PO & Clerk) — Banking Awareness'
  },
  {
    id: 'rrb-ntpc',
    category: 'Railway',
    name: 'Railway RRB NTPC & Group D Recruitment',
    conductingBody: 'Railway Recruitment Boards',
    eligibility: '12th Pass or Any Degree | Age: 18–33 Years',
    salary: '₹19,900 – ₹63,200/month (7th CPC Pay Scale)',
    vacancies: '35,000+ Posts (Station Master, Clerk, Goods Guard)',
    examDates: {
      notification: 'July 2026',
      cbt1: 'October 2026',
      cbt2: 'January 2027'
    },
    pattern: [
      { stage: 'CBT 1 (Screening)', details: 'GA (40 Qs), Math (30 Qs), Reasoning (30 Qs) — 100 Marks (90 mins)' },
      { stage: 'CBT 2 (Final Selection)', details: 'GA (50 Qs), Math (35 Qs), Reasoning (35 Qs) — 120 Marks (90 mins)' },
      { stage: 'Typing / CBAT', details: 'Computer-based Aptitude Test (for Station Master) / Typing Skill Test' }
    ],
    syllabus: [
      { subject: 'General Science', topics: 'Physics, Chemistry, Biology based on Class 10 NCERT Curriculum' },
      { subject: 'Mathematics', topics: 'Number System, Decimals, Fractions, LCM-HCF, Ratio, SI-CI, Mensuration' },
      { subject: 'General Awareness', topics: 'Indian Railways Facts, Static GK, Important Days, Sports, Current Events' }
    ],
    applyLink: 'https://rrbcdg.gov.in',
    notesRef: 'Railway RRB (NTPC & Group D) — General Science Master Notes'
  },
  {
    id: 'defence-cds-nda',
    category: 'Defence',
    name: 'Defence Services — NDA & CDS Examination',
    conductingBody: 'UPSC / Ministry of Defence',
    eligibility: '12th (NDA) / Any Degree (CDS) | Male & Female Candidates',
    salary: '₹56,100 – ₹1,77,500/month (Lieutenant Rank + Allowances)',
    vacancies: '800+ Annually (Army, Navy, Air Force Officers)',
    examDates: {
      ndaExam: 'April & September 2026',
      cdsExam: 'April & September 2026',
      ssbInterview: '5-Day SSB Process'
    },
    pattern: [
      { stage: 'Written Examination', details: 'English (100 M), General Knowledge (100 M), Elementary Math (100 M)' },
      { stage: 'SSB Interview (5 Days)', details: 'Stage 1: Screening (OIR + PPDT) | Stage 2: Psychological Tests, GTO Tasks & Interview' }
    ],
    syllabus: [
      { subject: 'English', topics: 'Grammar, Vocab, Comprehension, Ordering of Words, Sentence Improvement' },
      { subject: 'General Knowledge', topics: 'Indian Armed Forces, Missiles, Defense Tech, Physics, Chemistry, History' },
      { subject: 'Mathematics', topics: 'Arithmetic, Algebra, Trigonometry, Geometry, Mensuration, Statistics' }
    ],
    applyLink: 'https://upsc.gov.in',
    notesRef: 'Defence Exams (NDA / CDS / AFCAT) — English & GAT Guide'
  },
  {
    id: 'state-psc',
    category: 'State PSC',
    name: 'State PSC (TNPSC / KPSC / APPSC / UPPSC Group 1 & 2)',
    conductingBody: 'State Public Service Commissions',
    eligibility: 'Any Bachelor Degree | Knowledge of State Official Language',
    salary: '₹37,700 – ₹1,38,500/month (Deputy Collector, DSP, Sub-Registrar)',
    vacancies: '5,000+ State-wise',
    examDates: {
      group1Notification: 'May 2026',
      group1Prelims: 'August 2026',
      group1Mains: 'November 2026'
    },
    pattern: [
      { stage: 'Prelims Examination', details: 'General Studies (150 Qs) + Aptitude & Mental Ability (50 Qs) — 300 Marks' },
      { stage: 'Mains Examination', details: '3 Descriptive Papers covering History, Polity, Economy & State Administration (750 Marks)' },
      { stage: 'Interview', details: 'Personal Interview & Viva-Voce (100 Marks)' }
    ],
    syllabus: [
      { subject: 'State Heritage & History', topics: 'State Freedom Fighters, Archaeological Sites, State Literature, Culture' },
      { subject: 'Indian Constitution & State Governance', topics: 'Panchayati Raj, State Govt Schemes, Welfare Programs, Social Justice' },
      { subject: 'Aptitude & Mental Ability', topics: 'Logical Reasoning, Data Interpretation, Percentage, Ratio, Simple Interest' }
    ],
    applyLink: 'https://tnpsc.gov.in',
    notesRef: 'State PSC Exams — State History, Culture & Administration'
  }
]

const EXAM_CATEGORIES = ['All', 'UPSC', 'SSC', 'Banking', 'Railway', 'Defence', 'State PSC']

export default function GovernmentExams({ onNavigateNotes }) {
  const [selectedCat, setSelectedCat] = useState('All')
  const [selectedExam, setSelectedExam] = useState(GOV_EXAMS_DATA[0])
  const [activeTab, setActiveTab] = useState('overview') // overview, pattern, syllabus, plan

  const filtered = GOV_EXAMS_DATA.filter(e => selectedCat === 'All' || e.category === selectedCat)

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
            <span style={{ fontSize: '2.5rem' }}>🇮🇳</span>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
                All Government Exams Preparation Hub
              </h1>
              <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
                Complete syllabus, exam pattern, official dates, study timetable & direct official apply links
              </p>
            </div>
          </div>
        </div>
        <span style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.4)', padding: '0.4rem 1rem', borderRadius: '2rem', fontWeight: '800', fontSize: '0.82rem' }}>
          ⭐ 100% Free Preparation
        </span>
      </motion.div>

      {/* ── CATEGORY FILTER TABS ───────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {EXAM_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: '0.75rem',
              background: selectedCat === cat ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.04)',
              border: selectedCat === cat ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
              color: selectedCat === cat ? 'white' : '#94a3b8',
              fontWeight: selectedCat === cat ? '800' : '600',
              fontSize: '0.84rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {cat === 'All' ? 'All Exams' : `${cat} Exams`}
          </button>
        ))}
      </div>

      {/* ── MAIN SPLIT VIEW (EXAMS LIST + DETAIL FLOW) ─────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {/* Left Side: Exam Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {filtered.map(exam => {
            const isSelected = selectedExam.id === exam.id
            return (
              <div
                key={exam.id}
                onClick={() => setSelectedExam(exam)}
                style={{
                  background: isSelected ? 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(37,99,235,0.15))' : 'rgba(255,255,255,0.03)',
                  border: isSelected ? '2px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '1.25rem',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                  <span style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', padding: '0.15rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
                    {exam.category}
                  </span>
                  <span style={{ color: '#4ade80', fontSize: '0.75rem', fontWeight: '700' }}>
                    {exam.vacancies}
                  </span>
                </div>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem', margin: '0 0 0.35rem' }}>
                  {exam.name}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: '0 0 0.6rem' }}>
                  🏛️ {exam.conductingBody}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', fontSize: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.5rem' }}>
                  <span>💰 {exam.salary.split('(')[0]}</span>
                  <span style={{ color: '#818cf8', fontWeight: '700' }}>View Syllabus →</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Side: Selected Exam Full Detail Blueprint */}
        <motion.div
          key={selectedExam.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(139, 92, 246, 0.4)',
            borderRadius: '1.5rem',
            padding: '1.75rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
          }}
        >
          {/* Top Header of Selected Exam */}
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <span style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
                  {selectedExam.category} OFFICIAL BLUEPRINT
                </span>
                <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.35rem', margin: '0.4rem 0 0.2rem' }}>
                  {selectedExam.name}
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: 0 }}>
                  Conducted by: {selectedExam.conductingBody}
                </p>
              </div>
              <a
                href={selectedExam.applyLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  padding: '0.5rem 1.1rem',
                  borderRadius: '0.65rem',
                  fontWeight: '800',
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  boxShadow: '0 2px 10px rgba(16,185,129,0.3)'
                }}
              >
                🔗 Official Portal Apply
              </a>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem' }}>
            {[
              { id: 'overview', label: '📋 Eligibility & Dates' },
              { id: 'pattern', label: '📐 Exam Pattern' },
              { id: 'syllabus', label: '📚 Full Syllabus' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '0.45rem',
                  borderRadius: '0.6rem',
                  background: activeTab === tab.id ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.04)',
                  border: activeTab === tab.id ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                  color: activeTab === tab.id ? '#ffffff' : '#94a3b8',
                  fontWeight: '700',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Overview, Eligibility & Dates */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.85rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                  🎓 Candidate Eligibility Criteria
                </div>
                <p style={{ color: '#e2e8f0', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                  {selectedExam.eligibility}
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.85rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ color: '#4ade80', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  🗓️ Expected Exam Calendar & Dates (2026–2027)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem' }}>
                  {Object.entries(selectedExam.examDates).map(([k, v]) => (
                    <div key={k} style={{ background: 'rgba(0,0,0,0.25)', padding: '0.5rem 0.75rem', borderRadius: '0.5rem' }}>
                      <span style={{ color: '#94a3b8', textTransform: 'capitalize' }}>{k}: </span>
                      <strong style={{ color: '#ffffff' }}>{v}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '0.85rem', padding: '1rem' }}>
                <div style={{ color: '#c4b5fd', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  📖 Related Exam Study Notes Available in Notes Hub:
                </div>
                <p style={{ color: '#ffffff', fontSize: '0.85rem', margin: '0 0 0.5rem' }}>
                  "{selectedExam.notesRef}"
                </p>
                <button
                  onClick={() => onNavigateNotes ? onNavigateNotes() : toast.success('Open Notes Hub to view free full syllabus notes!')}
                  style={{
                    padding: '0.45rem 0.9rem',
                    borderRadius: '0.5rem',
                    background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                    color: 'white',
                    border: 'none',
                    fontWeight: '700',
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  Open Notes in Notes Hub →
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Exam Pattern */}
          {activeTab === 'pattern' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {selectedExam.pattern.map((p, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.85rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ color: '#60a5fa', fontWeight: '800', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                    {p.stage}
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '0.84rem', margin: 0, lineHeight: 1.5 }}>
                    {p.details}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Full Syllabus Breakdown */}
          {activeTab === 'syllabus' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {selectedExam.syllabus.map((s, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.85rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ color: '#4ade80', fontWeight: '800', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                    📌 {s.subject}
                  </div>
                  <p style={{ color: '#e2e8f0', fontSize: '0.82rem', margin: 0, lineHeight: 1.5 }}>
                    {s.topics}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
