import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  SCHOOL_BOARDS,
  CLASS_10_SUBJECTS,
  CLASS_12_SUBJECTS,
  QUESTION_BANK_LEVELS,
  DIKSHA_PLATFORM_STATS,
  COMPETITIVE_EXAMS_MAP
} from '../../data/schoolMasterData'
import { useAuth } from '../../context/AuthContext'

// Sub-modules
import SchoolNCERTSolutions from './SchoolNCERTSolutions'
import SchoolSamplePapers from './SchoolSamplePapers'
import SchoolPreviousYearQuestions from './SchoolPreviousYearQuestions'
import SchoolQuestionBank from './SchoolQuestionBank'
import SchoolMockTests from './SchoolMockTests'
import SchoolRevisionNotes from './SchoolRevisionNotes'
import SchoolVideoTutorials from './SchoolVideoTutorials'
import SchoolCompetitiveExams from './SchoolCompetitiveExams'
import SchoolDoubtSolving from './SchoolDoubtSolving'
import SchoolStudyPlanner from './SchoolStudyPlanner'
import SchoolProgressTracking from './SchoolProgressTracking'
import SchoolParentDashboard from './SchoolParentDashboard'

export default function SchoolDashboard() {
  const { user } = useAuth()
  const studentName = user?.name || 'Student'

  // Global School Configuration State
  const [selectedClass, setSelectedClass] = useState('10') // '10' or '12'
  const [selectedBoard, setSelectedBoard] = useState('cbse')
  const [selectedStream, setSelectedStream] = useState('science') // for Class 12: 'science', 'commerce', 'arts'
  const [activeModule, setActiveModule] = useState('dashboard') // 'dashboard', 'ncert', 'sample-papers', 'pyqs', 'qbank', 'mock-tests', 'revision', 'videos', 'competitive', 'doubt', 'planner', 'progress', 'parent'

  // Active Subject Selection for Drill-downs
  const subjectsList = selectedClass === '10'
    ? CLASS_10_SUBJECTS
    : (CLASS_12_SUBJECTS[selectedStream] || CLASS_12_SUBJECTS.science)

  const [activeSubject, setActiveSubject] = useState(subjectsList[0])

  // Change class helper
  const handleClassChange = (cls) => {
    setSelectedClass(cls)
    const newSubjects = cls === '10' ? CLASS_10_SUBJECTS : CLASS_12_SUBJECTS[selectedStream]
    setActiveSubject(newSubjects[0])
    toast.success(`Switched to Class ${cls}th Mode! 📚`)
  }

  const currentBoardObj = SCHOOL_BOARDS.find(b => b.id === selectedBoard) || SCHOOL_BOARDS[0]

  return (
    <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* ── HEADER BANNER ─────────────────────────────────────────── */}
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
          gap: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '2.8rem' }}>🎓</span>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
              <span style={{ background: 'rgba(52,211,153,0.2)', color: '#6ee7b7', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
                Class {selectedClass}th Board Exam Cockpit
              </span>
              <span style={{ background: 'rgba(96,165,250,0.2)', color: '#93c5fd', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
                {currentBoardObj.name}
              </span>
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
              Welcome back, {studentName}! 📚
            </h1>
            <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: '0.25rem 0 0' }}>
              Complete Board Exam Preparation · 0 to 100/100 Readiness · NCERT Solutions, EAD Sample Papers & AI Doubt Solver
            </p>
          </div>
        </div>

        {/* Class & Board Switchers */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Class 10 / 12 Toggle */}
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '0.25rem', borderRadius: '0.65rem', border: '1px solid rgba(255,255,255,0.1)', display: 'flex' }}>
            <button
              onClick={() => handleClassChange('10')}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '0.5rem',
                background: selectedClass === '10' ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'transparent',
                color: selectedClass === '10' ? 'white' : '#94a3b8',
                fontWeight: '800',
                fontSize: '0.82rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Class 10th
            </button>
            <button
              onClick={() => handleClassChange('12')}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '0.5rem',
                background: selectedClass === '12' ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'transparent',
                color: selectedClass === '12' ? 'white' : '#94a3b8',
                fontWeight: '800',
                fontSize: '0.82rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Class 12th
            </button>
          </div>

          {/* Board Selector */}
          <select
            value={selectedBoard}
            onChange={e => {
              setSelectedBoard(e.target.value)
              toast.success(`Board set to ${e.target.selectedOptions[0].text}`)
            }}
            style={{
              background: 'rgba(15,23,42,0.9)',
              border: '1px solid rgba(139,92,246,0.4)',
              color: 'white',
              padding: '0.55rem 0.85rem',
              borderRadius: '0.65rem',
              fontSize: '0.82rem',
              fontWeight: '700',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {SCHOOL_BOARDS.map(b => (
              <option key={b.id} value={b.id}>
                {b.flag} {b.name}
              </option>
            ))}
          </select>

          {/* Stream Selector for Class 12 */}
          {selectedClass === '12' && (
            <select
              value={selectedStream}
              onChange={e => {
                setSelectedStream(e.target.value)
                const newSubs = CLASS_12_SUBJECTS[e.target.value] || CLASS_12_SUBJECTS.science
                setActiveSubject(newSubs[0])
                toast.success(`Stream set to ${e.target.value.toUpperCase()}`)
              }}
              style={{
                background: 'rgba(15,23,42,0.9)',
                border: '1px solid rgba(52,211,153,0.4)',
                color: '#6ee7b7',
                padding: '0.55rem 0.85rem',
                borderRadius: '0.65rem',
                fontSize: '0.82rem',
                fontWeight: '700',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="science">🔬 Science (PCM / PCB)</option>
              <option value="commerce">📊 Commerce Stream</option>
              <option value="arts">🏛️ Arts / Humanities</option>
            </select>
          )}
        </div>
      </motion.div>

      {/* ── SUB-MODULE NAVIGATION BAR ──────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.45rem', overflowX: 'auto', paddingBottom: '0.35rem', scrollbarWidth: 'thin' }}>
        {[
          { id: 'dashboard', label: '📊 Cockpit Overview' },
          { id: 'ncert', label: '📝 NCERT Solutions' },
          { id: 'sample-papers', label: '📄 EAD Sample Papers (45 Sets)' },
          { id: 'pyqs', label: '🔄 PYQs (2018-2024)' },
          { id: 'qbank', label: '🧠 4-Level Question Bank' },
          { id: 'mock-tests', label: '🎯 CBT Mock Tests' },
          { id: 'revision', label: '📘 Mind Maps & Formula Notes' },
          { id: 'videos', label: '🎬 DIKSHA & NCERT Videos' },
          { id: 'competitive', label: '🏆 JEE / NEET / CUET / NDA' },
          { id: 'doubt', label: '🤖 AI Doubt Solver' },
          { id: 'planner', label: '📅 Study Planner' },
          { id: 'progress', label: '📈 Progress Tracking' },
          { id: 'parent', label: '👨‍👩‍👧 Parent Dashboard' }
        ].map(mod => {
          const isActive = activeModule === mod.id
          return (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              style={{
                padding: '0.55rem 0.95rem',
                borderRadius: '0.65rem',
                background: isActive ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.03)',
                border: isActive ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                color: isActive ? 'white' : '#94a3b8',
                fontWeight: '800',
                fontSize: '0.8rem',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {mod.label}
            </button>
          )
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ── VIEW 1: COCKPIT DASHBOARD OVERVIEW ───────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeModule === 'dashboard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Key Metrics Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '1.25rem', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ color: '#4ade80', fontWeight: '900', fontSize: '2.5rem', lineHeight: 1 }}>74%</div>
              <div style={{ color: '#e2e8f0', fontSize: '0.82rem', fontWeight: '700', marginTop: '0.35rem' }}>Overall Syllabus Completed</div>
              <div style={{ color: '#a7f3d0', fontSize: '0.72rem', marginTop: '0.2rem' }}>+12% boost this month</div>
            </div>

            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '1.25rem', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ color: '#f87171', fontWeight: '900', fontSize: '2.5rem', lineHeight: 1 }}>15 Days</div>
              <div style={{ color: '#e2e8f0', fontSize: '0.82rem', fontWeight: '700', marginTop: '0.35rem' }}>Next Board Exam Countdown</div>
              <div style={{ color: '#fca5a5', fontSize: '0.72rem', marginTop: '0.2rem' }}>Mathematics Standard Board Exam</div>
            </div>

            <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '1.25rem', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ color: '#60a5fa', fontWeight: '900', fontSize: '2.5rem', lineHeight: 1 }}>45 / 45</div>
              <div style={{ color: '#e2e8f0', fontSize: '0.82rem', fontWeight: '700', marginTop: '0.35rem' }}>EAD Sample Papers Available</div>
              <div style={{ color: '#93c5fd', fontSize: '0.72rem', marginTop: '0.2rem' }}>Easy (15) · Average (15) · Hard (15)</div>
            </div>

            <div style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '1.25rem', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ color: '#fbbf24', fontWeight: '900', fontSize: '2.5rem', lineHeight: 1 }}>5,200+</div>
              <div style={{ color: '#e2e8f0', fontSize: '0.82rem', fontWeight: '700', marginTop: '0.35rem' }}>4-Level Question Bank</div>
              <div style={{ color: '#fef08a', fontSize: '0.72rem', marginTop: '0.2rem' }}>1M, 2M, 3M & 5M HOTS Questions</div>
            </div>
          </div>

          {/* Quick Action Navigation Grid */}
          <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '1.25rem', padding: '1.5rem' }}>
            <h3 style={{ color: '#c4b5fd', fontSize: '1rem', fontWeight: '800', margin: '0 0 1rem' }}>
              🎯 Quick Preparation Actions
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
              {[
                { id: 'ncert', icon: '📝', label: 'NCERT Solutions', desc: 'All chapter exercises' },
                { id: 'sample-papers', icon: '📄', label: 'EAD Sample Papers', desc: '15 Easy, 15 Avg, 15 Hard' },
                { id: 'pyqs', icon: '🔄', label: 'Attend PYQs', desc: 'Last 7 years papers' },
                { id: 'qbank', icon: '🧠', label: '4-Level Question Bank', desc: '1M to 5M HOTS' },
                { id: 'mock-tests', icon: '🎯', label: 'Live Mock Tests', desc: 'Timed CBT with AI check' },
                { id: 'doubt', icon: '🤖', label: 'AI Doubt Solver', desc: 'Step-by-step instant help' }
              ].map(act => (
                <button
                  key={act.id}
                  onClick={() => setActiveModule(act.id)}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '0.85rem',
                    padding: '1rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.3rem'
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{act.icon}</span>
                  <strong style={{ color: 'white', fontSize: '0.9rem' }}>{act.label}</strong>
                  <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{act.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Subjects Progress & Blueprint Grid */}
          <div>
            <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.2rem', marginBottom: '1rem' }}>
              📚 Class {selectedClass}th Subjects & Blueprint ({subjectsList.length} Subjects)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {subjectsList.map((sub, idx) => {
                const isSelected = activeSubject.id === sub.id
                return (
                  <motion.div
                    key={sub.id}
                    whileHover={{ y: -3 }}
                    onClick={() => setActiveSubject(sub)}
                    style={{
                      background: isSelected ? 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(37,99,235,0.2))' : 'rgba(255,255,255,0.03)',
                      border: isSelected ? '2px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '1rem',
                      padding: '1.25rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '1.6rem' }}>{sub.icon}</span>
                        <span style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', padding: '0.2rem 0.5rem', borderRadius: '0.35rem', fontSize: '0.72rem', fontWeight: '800' }}>
                          Code {sub.code}
                        </span>
                      </div>

                      <h4 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem', margin: '0.2rem 0 0.5rem' }}>
                        {sub.name}
                      </h4>

                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <div>📝 Theory: <strong style={{ color: 'white' }}>{sub.theoryMarks} Marks</strong> | Internal: <strong style={{ color: '#4ade80' }}>{sub.internalMarks} Marks</strong></div>
                        <div>📖 Chapters: <strong style={{ color: 'white' }}>{sub.chaptersCount || sub.chapters?.length} Chapters</strong></div>
                        <div>⏱️ Exam Duration: <strong style={{ color: 'white' }}>{sub.duration}</strong></div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveSubject(sub)
                          setActiveModule('ncert')
                        }}
                        style={{ flex: 1, background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}
                      >
                        NCERT Solutions ➔
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveSubject(sub)
                          setActiveModule('mock-tests')
                        }}
                        style={{ flex: 1, background: 'rgba(255,255,255,0.06)', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.12)', padding: '0.5rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}
                      >
                        Mock Tests ➔
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ── ROUTED SUB-MODULES ───────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeModule === 'ncert' && (
        <SchoolNCERTSolutions activeSubject={activeSubject} selectedClass={selectedClass} onSelectSubject={setActiveSubject} subjectsList={subjectsList} />
      )}

      {activeModule === 'sample-papers' && (
        <SchoolSamplePapers activeSubject={activeSubject} selectedClass={selectedClass} selectedBoard={currentBoardObj.name} />
      )}

      {activeModule === 'pyqs' && (
        <SchoolPreviousYearQuestions activeSubject={activeSubject} selectedClass={selectedClass} selectedBoard={currentBoardObj.name} />
      )}

      {activeModule === 'qbank' && (
        <SchoolQuestionBank activeSubject={activeSubject} selectedClass={selectedClass} />
      )}

      {activeModule === 'mock-tests' && (
        <SchoolMockTests activeSubject={activeSubject} selectedClass={selectedClass} selectedBoard={currentBoardObj.name} />
      )}

      {activeModule === 'revision' && (
        <SchoolRevisionNotes activeSubject={activeSubject} selectedClass={selectedClass} />
      )}

      {activeModule === 'videos' && (
        <SchoolVideoTutorials activeSubject={activeSubject} selectedClass={selectedClass} />
      )}

      {activeModule === 'competitive' && (
        <SchoolCompetitiveExams selectedClass={selectedClass} selectedStream={selectedStream} />
      )}

      {activeModule === 'doubt' && (
        <SchoolDoubtSolving activeSubject={activeSubject} selectedClass={selectedClass} />
      )}

      {activeModule === 'planner' && (
        <SchoolStudyPlanner selectedClass={selectedClass} subjectsList={subjectsList} />
      )}

      {activeModule === 'progress' && (
        <SchoolProgressTracking selectedClass={selectedClass} subjectsList={subjectsList} />
      )}

      {activeModule === 'parent' && (
        <SchoolParentDashboard selectedClass={selectedClass} studentName={studentName} />
      )}
    </div>
  )
}
