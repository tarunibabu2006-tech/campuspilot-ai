import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const SCHOOL_STREAMS = [
  {
    id: 'mpc',
    name: 'Maths, Physics, Chemistry (PCM / MPC)',
    suitableFor: 'Engineering, Architecture, Data Science, Defence, Pilot, Pure Sciences',
    careers: 'Software Engineer, Aerospace Engineer, AI Scientist, Architect, Commercial Pilot',
    competitiveExams: 'JEE Main & Advanced, BITSAT, NDA, State Engineering CETs, IISER IAT',
    icon: '🚀'
  },
  {
    id: 'bipc',
    name: 'Biology, Physics, Chemistry (PCB / BiPC)',
    suitableFor: 'Medicine, Dentistry, Pharmacy, Biotechnology, Agriculture, Veterinary',
    careers: 'MBBS Doctor, Dental Surgeon, Biomedical Researcher, Clinical Pharmacist, Geneticist',
    competitiveExams: 'NEET UG, AIIMS, ICAR AIEEA, CUET Biology, State Medical Entrances',
    icon: '🧬'
  },
  {
    id: 'commerce',
    name: 'Commerce & Accountancy (with Maths / IP)',
    suitableFor: 'Chartered Accountancy, Finance, Investment Banking, Management, Corporate Law',
    careers: 'Chartered Accountant (CA), Investment Banker, CFO, Corporate Lawyer, Actuary',
    competitiveExams: 'CA Foundation, CS Executive Entrance, CUET Commerce, IPMAT (IIM 5-yr), CLAT',
    icon: '📊'
  },
  {
    id: 'humanities',
    name: 'Humanities & Social Sciences (Arts)',
    suitableFor: 'Civil Services, Journalism, Psychology, International Relations, Design',
    careers: 'IAS/IPS Officer, Investigative Journalist, Clinical Psychologist, Diplomat, UX Designer',
    competitiveExams: 'UPSC CSE (Foundation), CUET Humanities, CLAT (Law), NID / NIFT Design',
    icon: '🏛️'
  }
]

const OLYMPIADS_DATA = [
  {
    id: 'imo',
    title: 'International Mathematics Olympiad (IMO / SOF)',
    classes: 'Classes 1–12',
    subjects: 'Number Theory, Algebra, Geometry, Combinatorics & Logical Reasoning',
    examDates: 'November & December Annually',
    tips: 'Focus on pattern recognition and R.D. Sharma / NCERT exemplar problem solving.'
  },
  {
    id: 'nso',
    title: 'National Science Olympiad (NSO / SOF)',
    classes: 'Classes 1–12',
    subjects: 'Physics, Chemistry, Biology & Higher-Order Thinking Skills (HOTS)',
    examDates: 'October & November Annually',
    tips: 'Emphasize scientific concepts, experimental applications, and diagrammatic analysis.'
  },
  {
    id: 'ico',
    title: 'International Cyber / Computer Olympiad (NCO / ICO)',
    classes: 'Classes 2–12',
    subjects: 'Algorithms, Flowcharts, Python/Scratch Basics, Hardware & Cyber Safety',
    examDates: 'December Annually',
    tips: 'Practice coding logic, binary arithmetic, and modern Internet technologies.'
  },
  {
    id: 'ntse',
    title: 'National Talent Search Exam (NTSE Foundation)',
    classes: 'Classes 9 & 10',
    subjects: 'MAT (Mental Ability Test) & SAT (Scholastic Aptitude Test)',
    examDates: 'Stage 1 (State) & Stage 2 (National)',
    tips: 'Master mental ability puzzles, series, blood relations, and NCERT Class 9-10 science/social.'
  }
]

export default function SchoolStudentsSupport() {
  const [activeTab, setActiveTab] = useState('streams') // 'streams', 'olympiads', 'quiz'
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizScore, setQuizScore] = useState(null)

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                School Students Career Guidance & Olympiad Hub
              </h1>
              <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
                Classes 6 to 12 Stream Guidance, Competitive Foundation (JEE / NEET / CUET) & Olympiads
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── MAIN TABS ──────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {[
          { id: 'streams', label: '🧭 Class 10 & 12 Stream Selector' },
          { id: 'olympiads', label: '🏆 Olympiads & Foundation Guide' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.55rem 1.25rem',
              borderRadius: '0.75rem',
              background: activeTab === tab.id ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.04)',
              border: activeTab === tab.id ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
              color: activeTab === tab.id ? 'white' : '#94a3b8',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB 1: STREAM GUIDANCE ─────────────────────────────────── */}
      {activeTab === 'streams' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {SCHOOL_STREAMS.map(stream => (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1.25rem',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>{stream.icon}</div>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.15rem', marginBottom: '0.5rem' }}>
                  {stream.name}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                  <strong style={{ color: '#cbd5e1' }}>Best For:</strong> {stream.suitableFor}
                </p>

                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.8rem' }}>
                  <div style={{ color: '#4ade80', fontWeight: '700', marginBottom: '0.2rem' }}>💼 Top Career Paths:</div>
                  <div style={{ color: '#e2e8f0' }}>{stream.careers}</div>
                </div>

                <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: '0.75rem', padding: '0.85rem', fontSize: '0.8rem' }}>
                  <div style={{ color: '#c4b5fd', fontWeight: '700', marginBottom: '0.2rem' }}>🎯 Key Competitive Entrances:</div>
                  <div style={{ color: '#ffffff' }}>{stream.competitiveExams}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ── TAB 2: OLYMPIADS & FOUNDATION GUIDE ─────────────────────── */}
      {activeTab === 'olympiads' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {OLYMPIADS_DATA.map(olymp => (
            <motion.div
              key={olymp.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1.25rem',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '2rem' }}>🏅</span>
                  <span style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.72rem', fontWeight: '800' }}>
                    {olymp.classes}
                  </span>
                </div>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', margin: '0 0 0.5rem' }}>
                  {olymp.title}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 0.75rem' }}>
                  <strong style={{ color: '#cbd5e1' }}>Syllabus:</strong> {olymp.subjects}
                </p>
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '0.75rem', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                  <span style={{ color: '#60a5fa', fontWeight: '700' }}>🗓️ Exam Timeline:</span> <span style={{ color: 'white' }}>{olymp.examDates}</span>
                </div>
                <div style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: '0.75rem', padding: '0.75rem', fontSize: '0.8rem', color: '#4ade80' }}>
                  💡 Preparation Tip: {olymp.tips}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
