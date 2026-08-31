import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const GOV_EXAMS_DATA = [
  {
    id: 'upsc-cse',
    category: 'UPSC',
    name: 'UPSC Civil Services Examination (IAS / IPS / IFS / IRS)',
    conductingBody: 'Union Public Service Commission',
    degreeRequired: 'Bachelor’s Degree in any discipline (B.E/B.Tech, B.Sc, B.Com, B.A, MBBS, Law)',
    eligiblePosts: 'IAS, IPS, IFS, IRS, IAAS, IDAS, IRTS Group A Central Services',
    eligibility: 'Graduate in any stream from a recognized university',
    ageLimit: '21 to 32 Years (OBC: 35 Years, SC/ST: 37 Years)',
    salary: '₹56,100 – ₹2,50,000/month (Pay Level 10 to Level 18 Apex)',
    vacancies: '1,050+ Posts Annually',
    examDates: {
      notification: '14 February 2026',
      deadline: '05 March 2026',
      prelims: '24 May 2026',
      mains: '18 September 2026',
      interview: 'Jan – March 2027'
    },
    pattern: [
      { stage: 'Stage 1: Prelims (Objective)', details: 'Paper 1: General Studies (200 M) + Paper 2: CSAT (200 M, 33% Qualifying)' },
      { stage: 'Stage 2: Mains (Descriptive)', details: '9 Papers (1750 Total Marks) — Essay, GS 1, GS 2, GS 3, GS 4, Optional Papers 1 & 2' },
      { stage: 'Stage 3: Personality Test (Interview)', details: '275 Marks at UPSC Dholpur House, New Delhi' }
    ],
    levels: [
      { lvl: 'Level 1 (Easy)', desc: 'Static GK & NCERT 6-12 Foundation MCQs' },
      { lvl: 'Level 2 (Medium)', desc: 'Standard Reference Books (Laxmikanth, Spectrum, Ramesh Singh) Analysis' },
      { lvl: 'Level 3 (Hard)', desc: 'Multi-statement Analytical Prelims Mock Tests + Negative Marking' },
      { lvl: 'Level 4 (Very Very Hard / Qualifier)', desc: 'UPSC Mains GS 1-4 Essay & Case Study Answer Writing Evaluation' }
    ],
    syllabus: [
      { subject: 'Indian Polity & Governance', topics: 'Constitution, Fundamental Rights, Parliament, Judiciary, Federalism, Public Policy' },
      { subject: 'History & Indian National Movement', topics: 'Ancient, Medieval, Modern History (1757-1947), Art & Culture, Post-Independence' },
      { subject: 'Economic & Social Development', topics: 'Macroeconomics, Banking, Inflation, Fiscal Deficit, Poverty, Budget 2026' },
      { subject: 'Geography & Environmental Ecology', topics: 'Physical Geography, Climate Change, Biodiversity, National Parks, Disaster Management' },
      { subject: 'Science, Technology & Current Affairs', topics: 'Space Exploration, Defense Technology, AI, Biotechnology, Global Summits' }
    ],
    applyLink: 'https://upsc.gov.in'
  },
  {
    id: 'ssc-cgl',
    category: 'SSC',
    name: 'SSC CGL (Combined Graduate Level Examination)',
    conductingBody: 'Staff Selection Commission',
    degreeRequired: 'Bachelor’s Degree in any discipline',
    eligiblePosts: 'Assistant Section Officer (CSS/MEA), Income Tax Inspector, Central Excise Inspector, CBI Sub-Inspector, Auditor (CAG)',
    eligibility: 'Graduate in any stream | Age: 18 to 32 Years',
    ageLimit: '18 to 32 Years (Relaxations as per Central Govt Norms)',
    salary: '₹35,400 – ₹1,42,400/month (Pay Level 4 to Level 8)',
    vacancies: '17,500+ Posts',
    examDates: {
      notification: 'June 2026',
      deadline: 'July 2026',
      tier1: 'September 2026',
      tier2: 'December 2026'
    },
    pattern: [
      { stage: 'Tier 1 (CBT Computer Exam)', details: '100 Qs / 200 Marks (Math 50, Reasoning 50, English 50, GK 50) — 60 Minutes' },
      { stage: 'Tier 2 (CBT Final Merit)', details: 'Session 1: Math & Reasoning (180 M) + English & GA (210 M) + Computer (60 M) + Data Entry Typing' }
    ],
    levels: [
      { lvl: 'Level 1 (Easy)', desc: 'Basic arithmetic & one-word grammar questions' },
      { lvl: 'Level 2 (Medium)', desc: 'Standard Tier-1 100-question timed speed mock' },
      { lvl: 'Level 3 (Hard)', desc: 'Advanced geometry, mensuration 3D, and vocabulary reading passages' },
      { lvl: 'Level 4 (Very Very Hard / Qualifier)', desc: 'Tier-2 Comprehensive Merit Qualifier Simulation with 0.33 negative marking' }
    ],
    syllabus: [
      { subject: 'Quantitative Aptitude', topics: 'Algebra, Trigonometry, Geometry, Mensuration, Number Systems, Arithmetic' },
      { subject: 'General Intelligence & Reasoning', topics: 'Analogies, Syllogisms, Matrix, Coding-Decoding, Non-Verbal Puzzles' },
      { subject: 'English Language', topics: 'Reading Comprehension, Spotting Errors, Active/Passive Voice, Direct/Indirect Speech' },
      { subject: 'General Awareness', topics: 'Static GK, Current Affairs 2026, Indian History, Polity, General Science' }
    ],
    applyLink: 'https://ssc.gov.in'
  },
  {
    id: 'banking-sbi-ibps',
    category: 'Banking',
    name: 'SBI & IBPS Probationary Officer (PO) & Specialist Officer',
    conductingBody: 'Institute of Banking Personnel Selection / SBI',
    degreeRequired: 'Graduate in any discipline (B.Com, B.Sc, B.E/B.Tech, BBA, BA)',
    eligiblePosts: 'Probationary Officer (Scale 1), IT Officer, Agriculture Field Officer, Law Officer',
    eligibility: 'Graduate with minimum passing marks',
    ageLimit: '20 to 30 Years',
    salary: '₹65,000 – ₹82,000/month CTC + Leased Accommodation',
    vacancies: '9,500+ Posts across 12 Public Sector Banks',
    examDates: {
      notification: 'August 2026',
      deadline: 'September 2026',
      prelims: 'October 2026',
      mains: 'November 2026',
      interview: 'January 2027'
    },
    pattern: [
      { stage: 'Prelims (Online Test)', details: 'English (30 Qs), Quantitative (35 Qs), Reasoning (35 Qs) — 100 Marks (60 Mins)' },
      { stage: 'Mains & Descriptive Test', details: 'Reasoning/Computer (60 M), Data Analysis (60 M), Banking/GA (40 M), English (40 M) + Essay/Letter (50 M)' },
      { stage: 'Group Discussion & Interview', details: 'GD (20 Marks) + Personal Interview (30 Marks)' }
    ],
    levels: [
      { lvl: 'Level 1 (Easy)', desc: 'Simplification, quadratic equations, and number series' },
      { lvl: 'Level 2 (Medium)', desc: 'Sectional timed Prelims mock exams' },
      { lvl: 'Level 3 (Hard)', desc: 'Complex multi-variable seating puzzles & paragraph DI caselets' },
      { lvl: 'Level 4 (Very Very Hard / Qualifier)', desc: 'SBI PO Mains High-Level Puzzle + Data Analysis + AI Evaluated Essay Writing' }
    ],
    syllabus: [
      { subject: 'Data Analysis & Interpretation', topics: 'Radar Graphs, Missing DI, Caselets, Probability, Permutation' },
      { subject: 'Reasoning Ability', topics: 'Floor Puzzles, Box Puzzles, Critical Logical Deductions, Input-Output' },
      { subject: 'Banking & Financial Awareness', topics: 'RBI Regulations, Repo/Reverse Repo, UPI, Basel III, Bad Bank, Digital Rupee' }
    ],
    applyLink: 'https://ibps.in'
  },
  {
    id: 'railway-rrb',
    category: 'Railway',
    name: 'Railway RRB NTPC, JE & Group D Recruitment',
    conductingBody: 'Railway Recruitment Control Board (Ministry of Railways)',
    degreeRequired: '12th Pass or Any Graduation / Diploma / Engineering',
    eligiblePosts: 'Station Master, Goods Train Manager, Junior Engineer (JE), Senior Commercial Clerk',
    eligibility: '12th Pass / Diploma / Degree as per post',
    ageLimit: '18 to 36 Years (Extended Age Relief)',
    salary: '₹19,900 – ₹72,000/month + Railway Rail Pass & Travel Allowances',
    vacancies: '40,000+ Posts',
    examDates: {
      notification: 'July 2026',
      deadline: 'August 2026',
      cbt1: 'November 2026',
      cbt2: 'February 2027'
    },
    pattern: [
      { stage: 'CBT 1 (Screening)', details: 'GA (40 Qs), Mathematics (30 Qs), General Intelligence (30 Qs) — 100 Marks (90 Mins)' },
      { stage: 'CBT 2 (Final Selection)', details: 'GA (50 Qs), Mathematics (35 Qs), General Intelligence (35 Qs) — 120 Marks (90 Mins)' },
      { stage: 'Skill / Psycho Aptitude Test', details: 'CBAT for Station Master / Typing Test for Clerk' }
    ],
    levels: [
      { lvl: 'Level 1 (Easy)', desc: 'NCERT Science facts & simple ratio-percentage arithmetic' },
      { lvl: 'Level 2 (Medium)', desc: 'Standard 90-minute CBT 1 timed mock' },
      { lvl: 'Level 3 (Hard)', desc: 'Advanced General Science (Physics numericals) & multi-step arithmetic' },
      { lvl: 'Level 4 (Very Very Hard / Qualifier)', desc: 'CBT 2 High-Accuracy Merit Simulation + Psycho Aptitude Battery' }
    ],
    syllabus: [
      { subject: 'General Science (Class 10 NCERT)', topics: 'Optics, Gravitation, Electricity, Periodic Table, Human Physiology, Genetics' },
      { subject: 'Mathematics', topics: 'LCM-HCF, Profit-Loss, Time-Work, Trigonometry, Geometry, Statistics' },
      { subject: 'General Awareness', topics: 'Indian Railways Heritage, Current Affairs, Indian Constitution, Geography' }
    ],
    applyLink: 'https://rrbcdg.gov.in'
  }
]

export default function GovernmentExams({ onNavigateNotes }) {
  const [selectedExam, setSelectedExam] = useState(GOV_EXAMS_DATA[0])
  const [activeTab, setActiveTab] = useState('flow') // 'flow', 'levels', 'syllabus', 'dates'

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
            <span style={{ fontSize: '2.5rem' }}>🏛️</span>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
                All Government Exams & Public Sector Career Hub
              </h1>
              <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
                Complete End-to-End Preparation Flow, 4 Progressive Exam Difficulty Levels, Syllabi & Direct Official Portal Links
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── EXAM SELECTOR CARDS ─────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
        {GOV_EXAMS_DATA.map(ex => {
          const isSelected = selectedExam.id === ex.id
          return (
            <div
              key={ex.id}
              onClick={() => setSelectedExam(ex)}
              style={{
                background: isSelected ? 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(37,99,235,0.2))' : 'rgba(255,255,255,0.03)',
                border: isSelected ? '2px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1rem',
                padding: '1rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', padding: '0.15rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
                {ex.category}
              </span>
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '0.95rem', margin: '0.4rem 0 0.2rem' }}>
                {ex.name.split('(')[0]}
              </h3>
              <div style={{ color: '#4ade80', fontSize: '0.75rem', fontWeight: '700' }}>
                {ex.vacancies}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── EXAM DETAIL BLUEPRINT ──────────────────────────────────── */}
      <motion.div
        key={selectedExam.id}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
              {selectedExam.category} OFFICIAL NOTIFICATION & PREPARATION BLUEPRINT
            </span>
            <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.4rem', margin: '0.4rem 0 0.2rem' }}>
              {selectedExam.name}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
              Conducted by: <strong style={{ color: '#ffffff' }}>{selectedExam.conductingBody}</strong>
            </p>
          </div>

          <a
            href={selectedExam.applyLink}
            target="_blank"
            rel="noreferrer"
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              padding: '0.6rem 1.25rem',
              borderRadius: '0.65rem',
              fontWeight: '900',
              fontSize: '0.85rem',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(16,185,129,0.35)'
            }}
          >
            🔗 Official Online Application Portal ➔
          </a>
        </div>

        {/* Sub Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'flow', label: '🧭 Full Candidate Preparation Flow' },
            { id: 'levels', label: '📊 4 Exam Difficulty Levels' },
            { id: 'syllabus', label: '📚 Deep Syllabus' },
            { id: 'dates', label: '🗓️ Dates & Eligibility' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.65rem',
                background: activeTab === t.id ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.04)',
                border: activeTab === t.id ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                color: activeTab === t.id ? 'white' : '#94a3b8',
                fontWeight: '700',
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Complete Candidate Pipeline Flow */}
        {activeTab === 'flow' && (
          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontFamily: 'inherit' }}>
              {[
                { title: 'Student Profile & Educational Category', desc: selectedExam.degreeRequired, icon: '🎓' },
                { title: 'Eligible Career Roles & Posts', desc: selectedExam.eligiblePosts, icon: '💼' },
                { title: 'Age Limit & Relaxations', desc: selectedExam.ageLimit, icon: '⏳' },
                { title: 'Multi-Stage Exam Pattern', desc: selectedExam.pattern.map(p => p.stage).join(' ➔ '), icon: '📐' },
                { title: 'Salary & Compensation Scale', desc: selectedExam.salary, icon: '💰' },
                { title: 'Official Application Cycle', desc: `Notification: ${selectedExam.examDates.notification} | Exam: ${selectedExam.examDates.prelims || selectedExam.examDates.cbt1 || selectedExam.examDates.tier1}`, icon: '🗓️' }
              ].map((step, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '0.85rem 1rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '1.4rem' }}>{step.icon}</span>
                  <div>
                    <div style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.88rem' }}>{step.title}</div>
                    <div style={{ color: '#cbd5e1', fontSize: '0.82rem', marginTop: '0.15rem' }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: 4 Difficulty Levels */}
        {activeTab === 'levels' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {selectedExam.levels.map((lvl, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', padding: '1.25rem', border: `1px solid ${idx === 3 ? '#ef4444' : '#8b5cf6'}` }}>
                <div style={{ color: idx === 3 ? '#f87171' : '#4ade80', fontWeight: '900', fontSize: '1rem', marginBottom: '0.35rem' }}>
                  {lvl.lvl}
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                  {lvl.desc}
                </p>
                {idx === 3 && (
                  <div style={{ marginTop: '0.75rem', background: 'rgba(239,68,68,0.15)', color: '#f87171', padding: '0.3rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
                    🚨 Qualifier Level: Must pass to be certified exam-ready!
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Deep Syllabus */}
        {activeTab === 'syllabus' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {selectedExam.syllabus.map((s, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.85rem', padding: '1.2rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ color: '#4ade80', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                  📌 {s.subject}
                </div>
                <p style={{ color: '#e2e8f0', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                  {s.topics}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Dates & Eligibility */}
        {activeTab === 'dates' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ color: '#60a5fa', fontWeight: '800', margin: '0 0 0.75rem' }}>🎓 Eligibility Criteria</h4>
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                {selectedExam.eligibility} <br /><br />
                <strong>Age Limit:</strong> {selectedExam.ageLimit}
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ color: '#fbbf24', fontWeight: '800', margin: '0 0 0.75rem' }}>🗓️ Exam Dates Schedule</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem' }}>
                {Object.entries(selectedExam.examDates).map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                    <span style={{ textTransform: 'capitalize' }}>{k}:</span>
                    <strong style={{ color: '#ffffff' }}>{v}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
