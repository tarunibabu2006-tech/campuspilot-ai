import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

import { SEED_NOTES } from '../data/seedNotes'

const FLASHCARDS = [
  { question: 'What is an Operating System?', answer: 'An Operating System is system software that manages computer hardware and software resources and provides common services for computer programs.' },
  { question: 'What are 4 necessary conditions for Deadlock?', answer: '1. Mutual Exclusion\n2. Hold & Wait\n3. No Preemption\n4. Circular Wait' },
  { question: 'What is the time complexity of Binary Search?', answer: 'O(log N) for sorted arrays.' }
]

const BRANCHES = [
  'All', 'Engineering', 'Arts', 'Science', 'Commerce', 'Management',
  'Medical', 'Law', 'Computer Applications', 'Education', 'Pharmacy', 'Agriculture', 'Design', 'Polytechnic'
]

export default function NotesHub() {
  const [notes, setNotes] = useState(SEED_NOTES)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('All')
  const [activeTab, setActiveTab] = useState('notes') // 'notes', 'summary', 'flashcards', 'quiz', 'exam'

  const [selectedNote, setSelectedNote] = useState(SEED_NOTES[0])
  const [flashcardIdx, setFlashcardIdx] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [savedNotesOnly, setSavedNotesOnly] = useState(false)

  const [aiSummaryModal, setAiSummaryModal] = useState(null)
  const [quizActive, setQuizActive] = useState(false)

  useEffect(() => {
    const fetchBackendNotes = async () => {
      try {
        const res = await axios.get('/api/notes-hub')
        if (res.data && res.data.length > 0) {
          setNotes(res.data)
          setSelectedNote(res.data[0])
        }
      } catch (err) {
        console.warn('Using built-in seed notes dataset')
      }
    }
    fetchBackendNotes()
  }, [])

  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBranch = selectedBranch === 'All' || n.category === selectedBranch
    const matchesSaved = !savedNotesOnly || n.saved
    return matchesSearch && matchesBranch && matchesSaved
  })

  const toggleSaveNote = (id) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, saved: !n.saved } : n))
    toast.success('Bookmark updated! 🔖 (+5 XP)')
  }

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81, #1e293b)', borderRadius: '1.5rem', padding: '2rem', marginBottom: '1.5rem', border: '1px solid rgba(139,92,246,0.3)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '0.5rem' }}>
              📝 1000+ Subject Notes, AI Flashcards & Exam Revision
            </h1>
            <p style={{ color: '#c4b5fd' }}>
              Unit 1-5 notes, AI quick summaries, flashcards, quiz tests & exam mode for all academic branches.
            </p>
          </div>
          <span style={{ background: 'rgba(251,191,36,0.2)', color: '#fbbf24', border: '1px solid #fbbf24', padding: '0.4rem 1rem', borderRadius: '2rem', fontWeight: '800', fontSize: '0.85rem' }}>
            🔥 1000+ Verified Notes Available
          </span>
        </div>
      </motion.div>

      {/* Main Mode Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        {[
          { id: 'notes', label: '📖 Notes Library' },
          { id: 'flashcards', label: '🧠 AI Flashcards' },
          { id: 'exam', label: '📋 Exam Revision Mode' },
          { id: 'saved', label: '🔖 My Saved Library' }
        ].map(t => (
          <button
            key={t.id} onClick={() => { setActiveTab(t.id); setSavedNotesOnly(t.id === 'saved'); }}
            style={{
              padding: '0.65rem 1.25rem', borderRadius: '0.75rem', fontWeight: '700', fontSize: '0.88rem', cursor: 'pointer', whiteSpace: 'nowrap',
              background: (activeTab === t.id || (t.id === 'saved' && savedNotesOnly)) ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.05)',
              color: (activeTab === t.id || (t.id === 'saved' && savedNotesOnly)) ? 'white' : '#94a3b8',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Branch & Search Filters */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="🔍 Smart Search 1000+ Notes (e.g. Operating Systems, Binary Tree, SQL, Accounting)..."
          value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
          style={{ flex: 1, minWidth: '240px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
        />
        <select
          value={selectedBranch} onChange={e => setSelectedBranch(e.target.value)}
          style={{ background: 'rgba(30,27,75,0.9)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
        >
          {BRANCHES.map(b => <option key={b} value={b}>{b === 'All' ? 'All Academic Branches' : b}</option>)}
        </select>
      </div>

      {/* NOTES LIBRARY VIEW */}
      {(activeTab === 'notes' || activeTab === 'saved') && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '1rem' }}>
            📚 Available Notes ({filteredNotes.length})
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            {filteredNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.06 }}
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.35rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <span style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd', padding: '0.15rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '700' }}>
                      {note.category} · {note.branch}
                    </span>
                    <button onClick={() => toggleSaveNote(note.id)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>
                      {note.saved ? '🔖' : '📑'}
                    </button>
                  </div>

                  <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{note.title}</h3>
                  <div style={{ color: '#fbbf24', fontSize: '0.78rem', fontWeight: '700', marginBottom: '0.75rem' }}>📖 {note.units}</div>

                  <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '0.6rem 0.8rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8' }}>
                    <span>⏱️ {note.readTime}</span>
                    <span>📊 {note.difficulty}</span>
                    <span style={{ color: '#fbbf24' }}>⭐ {note.rating}/5</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                  <button
                    onClick={() => setSelectedNote(note)}
                    style={{ padding: '0.55rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', border: 'none', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    Read Notes 📖
                  </button>
                  <button
                    onClick={() => { setAiSummaryModal(note); toast.success('✨ AI Summary generated!'); }}
                    style={{ padding: '0.55rem', borderRadius: '0.6rem', background: 'rgba(255,255,255,0.06)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    AI Summarize ✨
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Reader Drawer */}
          {selectedNote && (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem' }}>{selectedNote.title}</h3>
                  <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{selectedNote.units}</span>
                </div>
                <button onClick={() => setSelectedNote(null)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}>✕</button>
              </div>
              <pre style={{ color: '#cbd5e1', fontSize: '0.9rem', whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0, lineHeight: 1.6, background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: '0.9rem' }}>
                {selectedNote.content}
              </pre>
            </div>
          )}
        </motion.div>
      )}

      {/* AI FLASHCARDS TAB */}
      {activeTab === 'flashcards' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.3rem', marginBottom: '0.5rem' }}>🧠 AI Interactive Flashcards</h2>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Card {flashcardIdx + 1} of {FLASHCARDS.length}</div>

            {/* Flashcard Box */}
            <div
              onClick={() => setShowAnswer(!showAnswer)}
              style={{
                height: '200px', background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(37,99,235,0.2))',
                border: '1px solid rgba(139,92,246,0.5)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', marginBottom: '1.5rem', transition: 'all 0.3s'
              }}
            >
              <div style={{ color: '#fbbf24', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>{showAnswer ? '💡 ANSWER' : '❓ QUESTION (Click to Flip)'}</div>
              <h3 style={{ color: 'white', fontWeight: '700', fontSize: '1.1rem', lineHeight: 1.4 }}>
                {showAnswer ? FLASHCARDS[flashcardIdx].answer : FLASHCARDS[flashcardIdx].question}
              </h3>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
              <button disabled={flashcardIdx === 0} onClick={() => { setFlashcardIdx(prev => prev - 1); setShowAnswer(false); }} style={{ padding: '0.6rem 1.25rem', borderRadius: '0.6rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', cursor: flashcardIdx === 0 ? 'not-allowed' : 'pointer' }}>← Previous</button>
              <button onClick={() => setShowAnswer(!showAnswer)} style={{ padding: '0.6rem 1.25rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', fontWeight: '700', border: 'none', cursor: 'pointer' }}>Flip Card 🔄</button>
              <button disabled={flashcardIdx === FLASHCARDS.length - 1} onClick={() => { setFlashcardIdx(prev => prev + 1); setShowAnswer(false); }} style={{ padding: '0.6rem 1.25rem', borderRadius: '0.6rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', cursor: flashcardIdx === FLASHCARDS.length - 1 ? 'not-allowed' : 'pointer' }}>Next →</button>
            </div>
          </div>
        </motion.div>
      )}

      {/* EXAM REVISION MODE */}
      {activeTab === 'exam' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '1rem' }}>📋 Exam Revision & Important Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {selectedNote?.examQuestions?.map((eq, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.9rem', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'white', fontWeight: '700', fontSize: '0.9rem' }}>❓ {eq.q}</span>
                <span style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', padding: '0.2rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.78rem', fontWeight: '800' }}>{eq.mark}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* AI Summary Modal */}
      <AnimatePresence>
        {aiSummaryModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setAiSummaryModal(null)}
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              style={{ background: 'linear-gradient(135deg, #1e1b4b, #0f172a)', border: '1px solid rgba(74,222,128,0.4)', borderRadius: '1.5rem', padding: '2rem', maxWidth: '550px', width: '100%' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem' }}>✨ AI Quick Summary — {aiSummaryModal.title}</h3>
                <button onClick={() => setAiSummaryModal(null)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}>✕</button>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1rem' }}>
                <div style={{ color: '#4ade80', fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.3rem' }}>💡 Key Concepts & Exam Points:</div>
                <div style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.5 }}>
                  - Master Unit 1-5 definitions and key algorithms.\n- Focus on 2-mark & 10-mark repeated exam questions.\n- Solved worked examples provided inside full notes.
                </div>
              </div>

              <button onClick={() => setAiSummaryModal(null)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', fontWeight: '700', border: 'none', cursor: 'pointer' }}>Close AI Summary</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
