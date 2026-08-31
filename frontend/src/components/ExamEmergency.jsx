import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ACADEMIC_STREAMS, getSubjectStudyPack } from '../data/vivaAndExamData'

export default function ExamEmergency({ language }) {
  const [stream, setStream] = useState('Computer Science & IT')
  const [subject, setSubject] = useState(ACADEMIC_STREAMS['Computer Science & IT'][0])
  const [examDate, setExamDate] = useState(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 2)
    return tomorrow.toISOString().split('T')[0]
  })
  const [activeTab, setActiveTab] = useState('twomarks') // 'twomarks' | 'sixteenmarks' | 'plan' | 'formulas' | 'topics'
  const [studyPack, setStudyPack] = useState(() => getSubjectStudyPack(ACADEMIC_STREAMS['Computer Science & IT'][0]))
  const [loadingPlan, setLoadingPlan] = useState(false)

  // Update pack when subject changes
  useEffect(() => {
    const pack = getSubjectStudyPack(subject)
    setStudyPack(pack)
  }, [subject])

  const handleStreamChange = (newStream) => {
    setStream(newStream)
    const firstSub = ACADEMIC_STREAMS[newStream]?.[0] || 'General Subject'
    setSubject(firstSub)
  }

  // Calculate days/hours left
  const daysLeft = Math.max(1, Math.ceil((new Date(examDate) - new Date()) / (1000 * 60 * 60 * 24)))

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* ── HEADER BANNER ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #701a75 0%, #4a044e 45%, #0f172a 100%)',
          borderRadius: '1.5rem',
          padding: '2rem',
          border: '1px solid rgba(232,121,249,0.4)',
          boxShadow: '0 8px 32px rgba(217,70,239,0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '2.5rem' }}>🚨</span>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
                Exam Emergency & All-Subject University Exam Preparation
              </h1>
              <p style={{ color: '#f5d0fe', fontSize: '0.85rem', margin: 0 }}>
                2-Mark Short Q&As · 16-Mark Big Question Outlines · Formula Cheat Sheets · Emergency Cramming Timetables
              </p>
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '1rem', padding: '0.6rem 1.2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#fca5a5', fontWeight: '700' }}>Time Until Exam</div>
          <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#f87171' }}>
            ⏳ {daysLeft} Day{daysLeft > 1 ? 's' : ''} Left
          </div>
        </div>
      </motion.div>

      {/* ── STREAM & SUBJECT SELECTOR ──────────────────────────────── */}
      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '1.25rem',
          padding: '1.25rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem'
        }}
      >
        <div>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.35rem', fontWeight: '700' }}>
            📚 1. Select Discipline / Stream:
          </label>
          <select
            value={stream}
            onChange={e => handleStreamChange(e.target.value)}
            style={{
              width: '100%',
              background: '#1e1b4b',
              border: '1px solid rgba(232,121,249,0.4)',
              borderRadius: '0.65rem',
              padding: '0.65rem 0.9rem',
              color: 'white',
              fontSize: '0.88rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {Object.keys(ACADEMIC_STREAMS).map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.35rem', fontWeight: '700' }}>
            📖 2. Select Subject for Exam Prep:
          </label>
          <select
            value={subject}
            onChange={e => setSubject(e.target.value)}
            style={{
              width: '100%',
              background: '#1e1b4b',
              border: '1px solid rgba(232,121,249,0.4)',
              borderRadius: '0.65rem',
              padding: '0.65rem 0.9rem',
              color: 'white',
              fontSize: '0.88rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {(ACADEMIC_STREAMS[stream] || []).map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.35rem', fontWeight: '700' }}>
            📅 3. Exam Date:
          </label>
          <input
            type="date"
            value={examDate}
            onChange={e => setExamDate(e.target.value)}
            style={{
              width: '100%',
              background: '#1e1b4b',
              border: '1px solid rgba(232,121,249,0.4)',
              borderRadius: '0.65rem',
              padding: '0.65rem 0.9rem',
              color: 'white',
              fontSize: '0.88rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          />
        </div>
      </div>

      {/* ── MODE TABS ──────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {[
          { id: 'twomarks', icon: '⚡', label: '2-Mark Short Questions & Answers' },
          { id: 'sixteenmarks', icon: '📑', label: '16-Mark Big Essay Questions' },
          { id: 'plan', icon: '⏱️', label: `${daysLeft}-Day Emergency Study Schedule` },
          { id: 'formulas', icon: '📐', label: 'Formula & Definition Cheat Sheet' },
          { id: 'topics', icon: '🎯', label: 'High-Weightage Important Topics' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.65rem 1.1rem',
              borderRadius: '0.75rem',
              fontWeight: '800',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: activeTab === tab.id
                ? 'linear-gradient(135deg, #d946ef, #a21caf)'
                : 'rgba(255,255,255,0.05)',
              color: activeTab === tab.id ? 'white' : '#cbd5e1',
              border: activeTab === tab.id ? 'none' : '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: 2-MARK SHORT QUESTIONS & ANSWERS
      ════════════════════════════════════════════════════════════════ */}
      {activeTab === 'twomarks' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'rgba(217, 70, 239, 0.1)', border: '1px solid rgba(217, 70, 239, 0.3)', borderRadius: '1rem', padding: '1.25rem' }}>
            <h3 style={{ color: '#f0abfc', fontWeight: '900', fontSize: '1.1rem', margin: '0 0 0.35rem' }}>
              ⚡ High-Frequency 2-Mark University Questions for {subject}
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.82rem', margin: 0 }}>
              Concise, precision definitions & formulas designed for maximum Part-A scoring in university exams.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {studyPack.twoMarks.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '1rem',
                  padding: '1.25rem'
                }}
              >
                <div style={{ color: '#f472b6', fontWeight: '800', fontSize: '0.98rem', marginBottom: '0.5rem' }}>
                  Q{idx + 1}. {item.q}
                </div>
                <div style={{ color: '#ffffff', fontSize: '0.9rem', lineHeight: 1.6, background: 'rgba(0,0,0,0.25)', padding: '0.85rem 1rem', borderRadius: '0.65rem' }}>
                  <strong style={{ color: '#4ade80' }}>Model Answer: </strong>
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: 16-MARK BIG ESSAY QUESTIONS
      ════════════════════════════════════════════════════════════════ */}
      {activeTab === 'sixteenmarks' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '1rem', padding: '1.25rem' }}>
            <h3 style={{ color: '#60a5fa', fontWeight: '900', fontSize: '1.1rem', margin: '0 0 0.35rem' }}>
              📑 16-Mark / 13-Mark Detailed Essay Question Outlines for {subject}
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.82rem', margin: 0 }}>
              Master structural outlines, mandatory diagrams, mathematical steps, and key headings required for full marks.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {studyPack.sixteenMarks.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'linear-gradient(135deg, rgba(30,27,75,0.7), rgba(15,23,42,0.9))',
                  border: '1px solid rgba(139,92,246,0.3)',
                  borderRadius: '1.25rem',
                  padding: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1rem' }}>
                  <h4 style={{ color: 'white', fontWeight: '900', fontSize: '1.1rem', margin: 0 }}>
                    Big Question {idx + 1}: {item.title}
                  </h4>
                  <span style={{ background: 'rgba(168,85,247,0.2)', color: '#c084fc', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.75rem', fontWeight: '800', flexShrink: 0 }}>
                    16 MARKS
                  </span>
                </div>

                <div style={{ color: '#94a3b8', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  📝 Essential Answer Writing Structure & Key Steps:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {item.outline.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        borderRadius: '0.6rem',
                        padding: '0.75rem 1rem',
                        color: '#e2e8f0',
                        fontSize: '0.88rem',
                        lineHeight: 1.5
                      }}
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: EMERGENCY STUDY TIMETABLE
      ════════════════════════════════════════════════════════════════ */}
      {activeTab === 'plan' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '1rem', padding: '1.25rem' }}>
            <h3 style={{ color: '#f87171', fontWeight: '900', fontSize: '1.1rem', margin: '0 0 0.35rem' }}>
              ⏱️ {daysLeft}-Day Hour-by-Hour Emergency Cramming & Revision Schedule
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.82rem', margin: 0 }}>
              Prioritized high-yield blocks designed to cover 80% of university exam weightage in the shortest possible time.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>
              <div style={{ color: '#ef4444', fontWeight: '900', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                🔥 Phase 1: High-Weightage Core Units (Hours 1–4)
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.7 }}>
                <li>Memorize standard definitions and 2-mark question banks</li>
                <li>Master Unit 1 & Unit 2 core theoretical laws & derivations</li>
                <li>Practice drawing all primary architectural and circuit block diagrams</li>
              </ul>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>
              <div style={{ color: '#fbbf24', fontWeight: '900', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                ⚡ Phase 2: Numerical Problems & 16-Marks (Hours 5–8)
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.7 }}>
                <li>Solve 5 past-year numerical questions using formula cheat sheet</li>
                <li>Write out step-by-step algorithms and structural outlines</li>
                <li>Review common pitfalls, edge cases, and unit conversion traps</li>
              </ul>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>
              <div style={{ color: '#4ade80', fontWeight: '900', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                🎯 Phase 3: Final Rapid Recall & Sleep Cycle (Hours 9–10)
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.7 }}>
                <li>Rapid flashcard review of all formula sheets</li>
                <li>Self-test with 5-minute timed blurting of key concepts</li>
                <li>Get 6+ hours of uninterrupted sleep for memory consolidation</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: FORMULA & DEFINITION CHEAT SHEET
      ════════════════════════════════════════════════════════════════ */}
      {activeTab === 'formulas' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '1rem', padding: '1.25rem' }}>
            <h3 style={{ color: '#fbbf24', fontWeight: '900', fontSize: '1.1rem', margin: '0 0 0.35rem' }}>
              📐 Official Formula, Theorem & Definition Cheat Sheet for {subject}
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.82rem', margin: 0 }}>
              Quick-reference equations, properties, asymptotic bounds, and key rules for zero-error exam writing.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {studyPack.cheatSheet.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.75rem',
                  padding: '1rem 1.25rem',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  fontFamily: 'monospace',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <span style={{ color: '#fbbf24' }}>⚡</span> {item}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5: HIGH-WEIGHTAGE IMPORTANT TOPICS
      ════════════════════════════════════════════════════════════════ */}
      {activeTab === 'topics' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '1rem', padding: '1.25rem' }}>
            <h3 style={{ color: '#4ade80', fontWeight: '900', fontSize: '1.1rem', margin: '0 0 0.35rem' }}>
              🎯 High-Weightage Priority Ranking for {subject}
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.82rem', margin: 0 }}>
              Topics categorized by statistical probability of appearance in university question papers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '1rem', padding: '1.25rem' }}>
              <div style={{ color: '#4ade80', fontWeight: '900', fontSize: '1rem', marginBottom: '0.75rem' }}>
                🟢 Priority A+ (90%+ Exam Probability)
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.7 }}>
                <li>Core theoretical principles & fundamental laws</li>
                <li>Mandatory 16-mark big questions and derivations</li>
                <li>Standard 2-mark definitions and formulas</li>
              </ul>
            </div>

            <div style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '1rem', padding: '1.25rem' }}>
              <div style={{ color: '#fbbf24', fontWeight: '900', fontSize: '1rem', marginBottom: '0.75rem' }}>
                🟡 Priority A (75% Exam Probability)
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.7 }}>
                <li>Comparative analysis and trade-off tables</li>
                <li>Standard numerical examples and case studies</li>
                <li>Block diagrams and architectural implementations</li>
              </ul>
            </div>

            <div style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '1rem', padding: '1.25rem' }}>
              <div style={{ color: '#60a5fa', fontWeight: '900', fontSize: '1rem', marginBottom: '0.75rem' }}>
                🔵 Priority B (60% Exam Probability)
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.7 }}>
                <li>Supplementary historical context & advanced developments</li>
                <li>Specialized edge cases and niche variations</li>
                <li>Secondary sub-topics and elective extensions</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
