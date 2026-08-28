import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { buildNoteIndex, generateNote, getCategoryList, getNoteStats, NOTE_TAXONOMY } from '../data/notesEngine'

const PAGE_SIZE = 24

// ── Lazy-load full note content only when user clicks "Read" ───
function useNoteLazyLoad(noteRef) {
  const [fullNote, setFullNote] = useState(null)
  const load = useCallback((item) => {
    const note = generateNote(item.category, item.subject, item.topic, item.level, item.unitIdx)
    setFullNote(note)
  }, [])
  return [fullNote, load, () => setFullNote(null)]
}

export default function NotesHub() {
  // ── State ─────────────────────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSubject, setSelectedSubject] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [activeTab, setActiveTab] = useState('notes')
  const [page, setPage] = useState(1)
  const [selectedNoteItem, setSelectedNoteItem] = useState(null)
  const [fullNote, setFullNote] = useState(null)
  const [savedIds, setSavedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('campuspilot_saved_notes') || '[]') } catch { return [] }
  })
  const [aiSummaryModal, setAiSummaryModal] = useState(null)
  const [flashcardNote, setFlashcardNote] = useState(null)
  const [flashcardIdx, setFlashcardIdx] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [quizNote, setQuizNote] = useState(null)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showStats, setShowStats] = useState(false)
  const searchRef = useRef(null)

  // ── Build full index once ─────────────────────────────────────
  const allNotes = useMemo(() => buildNoteIndex(), [])
  const stats = useMemo(() => getNoteStats(), [])
  const categoryList = useMemo(() => getCategoryList(), [])

  // ── Subjects for selected category ───────────────────────────
  const availableSubjects = useMemo(() => {
    if (selectedCategory === 'All') return []
    return Object.keys(NOTE_TAXONOMY[selectedCategory]?.subjects || {})
  }, [selectedCategory])

  // ── Filter notes ──────────────────────────────────────────────
  const filteredNotes = useMemo(() => {
    const q = searchTerm.toLowerCase()
    return allNotes.filter(n => {
      if (activeTab === 'saved') return savedIds.includes(n.id)
      const matchSearch = !q || n.title.toLowerCase().includes(q) || n.subject.toLowerCase().includes(q) || n.topic?.toLowerCase().includes(q) || n.tags?.some(t => t.includes(q))
      const matchCat = selectedCategory === 'All' || n.category === selectedCategory
      const matchSubj = selectedSubject === 'All' || n.subject === selectedSubject
      const matchLevel = selectedLevel === 'All' || n.difficulty === selectedLevel
      return matchSearch && matchCat && matchSubj && matchLevel
    })
  }, [allNotes, searchTerm, selectedCategory, selectedSubject, selectedLevel, activeTab, savedIds])

  // ── Pagination ────────────────────────────────────────────────
  const totalPages = Math.ceil(filteredNotes.length / PAGE_SIZE)
  const pagedNotes = useMemo(() => filteredNotes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [filteredNotes, page])

  // Reset page on filter change
  useEffect(() => { setPage(1) }, [searchTerm, selectedCategory, selectedSubject, selectedLevel, activeTab])

  // ── Save/Unsave ───────────────────────────────────────────────
  const toggleSave = useCallback((id) => {
    setSavedIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      localStorage.setItem('campuspilot_saved_notes', JSON.stringify(next))
      return next
    })
    toast.success('Bookmark updated! 🔖 (+5 XP)')
  }, [])

  // ── Open full note ────────────────────────────────────────────
  const openNote = useCallback((item) => {
    setSelectedNoteItem(item)
    const full = generateNote(item.category, item.subject, item.topic, item.level, item.unitIdx)
    setFullNote(full)
    setActiveTab('reader')
  }, [])

  // ── Open AI Summary ───────────────────────────────────────────
  const openSummary = useCallback((item) => {
    const full = generateNote(item.category, item.subject, item.topic, item.level, item.unitIdx)
    setAiSummaryModal(full)
    toast.success('✨ AI Summary ready!')
  }, [])

  // ── Open Flashcards ───────────────────────────────────────────
  const openFlashcards = useCallback((item) => {
    const full = generateNote(item.category, item.subject, item.topic, item.level, item.unitIdx)
    setFlashcardNote(full)
    setFlashcardIdx(0)
    setShowAnswer(false)
    setActiveTab('flashcards')
    toast.success('🧠 Flashcards loaded!')
  }, [])

  // ── Colors by category ────────────────────────────────────────
  const catColor = (cat) => NOTE_TAXONOMY[cat]?.color || '#7c3aed'
  const catIcon = (cat) => NOTE_TAXONOMY[cat]?.icon || '📝'

  const levelBadgeColor = { 'Beginner': '#22c55e', 'Intermediate': '#f59e0b', 'Advanced': '#ef4444' }

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>

      {/* ── HERO HEADER ─────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #0f172a 100%)',
          border: '1px solid rgba(139,92,246,0.4)',
          borderRadius: '1.5rem', padding: '2rem', marginBottom: '1.5rem',
          boxShadow: '0 8px 32px rgba(124,58,237,0.3)',
          position: 'relative', overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '2.5rem' }}>📝</span>
              <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '900', background: 'linear-gradient(135deg, #fff, #c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Notes Hub
              </h1>
            </div>
            <p style={{ color: '#c4b5fd', margin: 0, fontSize: '0.95rem' }}>
              AI-powered study notes across Engineering, Science, Commerce, Medical, Law & more
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
            <span style={{ background: 'rgba(251,191,36,0.2)', color: '#fbbf24', border: '1px solid #fbbf24', padding: '0.4rem 1.2rem', borderRadius: '2rem', fontWeight: '800', fontSize: '1rem', letterSpacing: '0.5px' }}>
              🔥 100,000+ Verified Notes
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)', padding: '0.2rem 0.7rem', borderRadius: '1rem', fontSize: '0.78rem', fontWeight: '700' }}>
                {stats.total.toLocaleString()}+ Notes
              </span>
              <span style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.3)', padding: '0.2rem 0.7rem', borderRadius: '1rem', fontSize: '0.78rem', fontWeight: '700' }}>
                20+ Branches
              </span>
              <span style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.3)', padding: '0.2rem 0.7rem', borderRadius: '1rem', fontSize: '0.78rem', fontWeight: '700' }}>
                AI Flashcards ✨
              </span>
            </div>
          </div>
        </div>

        {/* Quick category stats bar */}
        <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.25rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {categoryList.slice(0, 8).map(cat => (
            <button key={cat.name} onClick={() => { setSelectedCategory(cat.name); setSelectedSubject('All'); setActiveTab('notes') }}
              style={{ flexShrink: 0, background: selectedCategory === cat.name ? cat.color : 'rgba(255,255,255,0.06)', border: `1px solid ${cat.color}40`, borderRadius: '0.75rem', padding: '0.4rem 0.9rem', color: 'white', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}>
              {cat.icon} {cat.name.split(' ')[0]} ({(cat.displayCount / 1000).toFixed(0)}K+)
            </button>
          ))}
          <button onClick={() => setShowStats(!showStats)}
            style={{ flexShrink: 0, background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '0.75rem', padding: '0.4rem 0.9rem', color: '#fbbf24', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer' }}>
            📊 All Stats
          </button>
        </div>
      </motion.div>

      {/* ── STATS PANEL ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showStats && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem', overflow: 'hidden' }}>
            <h3 style={{ color: 'white', fontWeight: '800', marginBottom: '1rem' }}>📊 Complete Notes Database ({stats.total.toLocaleString()}+ Notes)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '0.75rem' }}>
              {Object.entries(stats.byCategory).map(([cat, data]) => (
                <div key={cat} onClick={() => { setSelectedCategory(cat); setSelectedSubject('All'); setShowStats(false); setActiveTab('notes') }}
                  style={{ background: `${data.color}15`, border: `1px solid ${data.color}40`, borderRadius: '0.75rem', padding: '0.75rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '700', color: 'white', fontSize: '0.85rem' }}>{data.icon} {cat}</span>
                    <span style={{ color: data.color, fontWeight: '800', fontSize: '0.85rem' }}>{data.count.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── NAV TABS ─────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {[
          { id: 'notes', label: '📖 Notes Library' },
          { id: 'flashcards', label: '🧠 AI Flashcards' },
          { id: 'exam', label: '📋 Exam Questions' },
          { id: 'saved', label: `🔖 Saved (${savedIds.length})` },
          { id: 'categories', label: '🗂️ All Categories' }
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{
              flexShrink: 0, padding: '0.65rem 1.25rem', borderRadius: '0.75rem', fontWeight: '700', fontSize: '0.88rem', cursor: 'pointer',
              background: activeTab === t.id ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.05)',
              color: activeTab === t.id ? 'white' : '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.2s'
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── SEARCH & FILTERS ─────────────────────────────────────── */}
      {activeTab !== 'categories' && activeTab !== 'reader' && (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <input ref={searchRef} type="text"
            placeholder={`🔍 Search ${stats.total.toLocaleString()}+ notes (e.g. Binary Tree, Calculus, Contracts, Anatomy...)`}
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            style={{ flex: 1, minWidth: '260px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
          />
          <select value={selectedCategory} onChange={e => { setSelectedCategory(e.target.value); setSelectedSubject('All') }}
            style={{ background: 'rgba(30,27,75,0.9)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '0.75rem', padding: '0.75rem', color: 'white', fontSize: '0.85rem', outline: 'none', cursor: 'pointer' }}>
            <option value="All">All Branches</option>
            {categoryList.map(c => <option key={c.name} value={c.name}>{c.icon} {c.name}</option>)}
          </select>
          {availableSubjects.length > 0 && (
            <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}
              style={{ background: 'rgba(30,27,75,0.9)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '0.75rem', padding: '0.75rem', color: 'white', fontSize: '0.85rem', outline: 'none', cursor: 'pointer' }}>
              <option value="All">All Subjects</option>
              {availableSubjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          )}
          <select value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)}
            style={{ background: 'rgba(30,27,75,0.9)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '0.75rem', padding: '0.75rem', color: 'white', fontSize: '0.85rem', outline: 'none', cursor: 'pointer' }}>
            <option value="All">All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          {(searchTerm || selectedCategory !== 'All' || selectedSubject !== 'All' || selectedLevel !== 'All') && (
            <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedSubject('All'); setSelectedLevel('All') }}
              style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#f87171', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer' }}>
              ✕ Clear
            </button>
          )}
        </div>
      )}

      {/* ── NOTES LIBRARY ─────────────────────────────────────────── */}
      {(activeTab === 'notes' || activeTab === 'saved') && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', margin: 0 }}>
              📚 {activeTab === 'saved' ? 'My Saved Notes' : 'Notes Library'} —{' '}
              <span style={{ color: '#a78bfa' }}>
                {filteredNotes.length.toLocaleString()} notes {filteredNotes.length >= stats.total ? `(All ${stats.total.toLocaleString()}+)` : 'matching'}
              </span>
            </h2>
            <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
              Page {page} of {totalPages.toLocaleString()} · Showing {PAGE_SIZE} per page
            </div>
          </div>

          {pagedNotes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#64748b' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <p>No notes found. Try different search terms or filters.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {pagedNotes.map((note, idx) => (
                <motion.div key={note.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(idx * 0.03, 0.5) }}
                  style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${catColor(note.category)}30`, borderRadius: '1.25rem', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = catColor(note.category) + '80'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = catColor(note.category) + '30'}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <span style={{ background: `${catColor(note.category)}20`, color: catColor(note.category), padding: '0.15rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.7rem', fontWeight: '700' }}>
                        {catIcon(note.category)} {note.subject?.split(' ').slice(0, 3).join(' ')}
                      </span>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <span style={{ background: `${levelBadgeColor[note.difficulty]}20`, color: levelBadgeColor[note.difficulty], padding: '0.1rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.68rem', fontWeight: '700' }}>
                          {note.difficulty}
                        </span>
                        <button onClick={() => toggleSave(note.id)}
                          style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', padding: 0 }}>
                          {savedIds.includes(note.id) ? '🔖' : '📑'}
                        </button>
                      </div>
                    </div>

                    <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1rem', marginBottom: '0.25rem', lineHeight: 1.3 }}>{note.title}</h3>
                    <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginBottom: '0.75rem' }}>📖 {note.units}</div>

                    <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '0.6rem', padding: '0.5rem 0.75rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8' }}>
                      <span>⏱️ {note.readTime}</span>
                      <span>⭐ {note.rating}</span>
                      <span>📥 {note.downloads?.toLocaleString()}</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.35rem' }}>
                    <button onClick={() => openNote(note)}
                      style={{ padding: '0.5rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', border: 'none', fontWeight: '700', fontSize: '0.75rem', cursor: 'pointer' }}>
                      Read 📖
                    </button>
                    <button onClick={() => openSummary(note)}
                      style={{ padding: '0.5rem', borderRadius: '0.6rem', background: 'rgba(74,222,128,0.1)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)', fontWeight: '700', fontSize: '0.75rem', cursor: 'pointer' }}>
                      AI ✨
                    </button>
                    <button onClick={() => openFlashcards(note)}
                      style={{ padding: '0.5rem', borderRadius: '0.6rem', background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)', fontWeight: '700', fontSize: '0.75rem', cursor: 'pointer' }}>
                      Cards 🧠
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <button disabled={page === 1} onClick={() => setPage(1)}
                style={{ padding: '0.5rem 0.75rem', borderRadius: '0.6rem', background: page === 1 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)', color: page === 1 ? '#475569' : 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>
                «
              </button>
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                style={{ padding: '0.5rem 1rem', borderRadius: '0.6rem', background: page === 1 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)', color: page === 1 ? '#475569' : 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>
                ← Prev
              </button>

              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, page - 2)) + i
                if (pageNum > totalPages) return null
                return (
                  <button key={pageNum} onClick={() => setPage(pageNum)}
                    style={{ padding: '0.5rem 0.85rem', borderRadius: '0.6rem', background: page === pageNum ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', fontWeight: page === pageNum ? '800' : '400', cursor: 'pointer' }}>
                    {pageNum}
                  </button>
                )
              })}

              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                style={{ padding: '0.5rem 1rem', borderRadius: '0.6rem', background: page === totalPages ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)', color: page === totalPages ? '#475569' : 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}>
                Next →
              </button>
              <button disabled={page === totalPages} onClick={() => setPage(totalPages)}
                style={{ padding: '0.5rem 0.75rem', borderRadius: '0.6rem', background: page === totalPages ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)', color: page === totalPages ? '#475569' : 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}>
                »
              </button>
              <span style={{ color: '#64748b', fontSize: '0.82rem', marginLeft: '0.5rem' }}>
                Page {page} / {totalPages.toLocaleString()}
              </span>
            </div>
          )}
        </motion.div>
      )}

      {/* ── NOTE READER ───────────────────────────────────────────── */}
      {activeTab === 'reader' && fullNote && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.5rem', padding: '2rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.4rem', margin: 0, marginBottom: '0.5rem' }}>{fullNote.title}</h2>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ background: `${catColor(fullNote.category)}20`, color: catColor(fullNote.category), padding: '0.15rem 0.7rem', borderRadius: '0.4rem', fontSize: '0.78rem', fontWeight: '700' }}>
                    {catIcon(fullNote.category)} {fullNote.subject}
                  </span>
                  <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>📖 {fullNote.units}</span>
                  <span style={{ color: '#fbbf24', fontSize: '0.78rem' }}>⭐ {fullNote.rating}</span>
                  <span style={{ background: `${levelBadgeColor[fullNote.level]}20`, color: levelBadgeColor[fullNote.level], padding: '0.15rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '700' }}>{fullNote.level}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => openFlashcards(selectedNoteItem)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '0.6rem', background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer' }}>
                  🧠 Flashcards
                </button>
                <button onClick={() => toggleSave(fullNote.id)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '0.6rem', background: savedIds.includes(fullNote.id) ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.06)', color: savedIds.includes(fullNote.id) ? '#a78bfa' : '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer' }}>
                  {savedIds.includes(fullNote.id) ? '🔖 Saved' : '📑 Save'}
                </button>
                <button onClick={() => setActiveTab('notes')}
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: '700', fontSize: '0.82rem' }}>
                  ← Back
                </button>
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '1rem', padding: '1.5rem', lineHeight: 1.8, color: '#cbd5e1', fontSize: '0.92rem', fontFamily: 'inherit', whiteSpace: 'pre-wrap', maxHeight: '70vh', overflowY: 'auto' }}>
              {fullNote.content}
            </div>

            {/* Exam Questions */}
            <div style={{ marginTop: '1.5rem' }}>
              <h3 style={{ color: 'white', fontWeight: '800', marginBottom: '0.75rem' }}>📋 University Exam Questions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {fullNote.examQuestions?.map((q, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ color: 'white', fontSize: '0.88rem' }}>❓ {q.q}</span>
                    <span style={{ flexShrink: 0, background: 'rgba(251,191,36,0.15)', color: '#fbbf24', padding: '0.2rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '800' }}>{q.mark}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {fullNote.tags?.map(tag => (
                <span key={tag} onClick={() => { setSearchTerm(tag); setActiveTab('notes') }}
                  style={{ background: 'rgba(139,92,246,0.1)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.2)', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.72rem', cursor: 'pointer' }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── AI FLASHCARDS TAB ─────────────────────────────────────── */}
      {activeTab === 'flashcards' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {!flashcardNote ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#64748b' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠</div>
              <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Click the <strong style={{ color: '#fbbf24' }}>🧠 Cards</strong> button on any note to start flashcards!</p>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Or browse notes and click the Cards button</p>
            </div>
          ) : (
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.5rem', padding: '2rem', textAlign: 'center' }}>
                <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '0.25rem' }}>🧠 AI Flashcards</h2>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '1rem' }}>{flashcardNote.title}</p>
                <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '1.5rem' }}>Card {flashcardIdx + 1} of {flashcardNote.flashcards.length}</div>

                <div onClick={() => setShowAnswer(!showAnswer)}
                  style={{ minHeight: '200px', background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(37,99,235,0.15))', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: '1.5rem', transition: 'all 0.3s' }}>
                  <div style={{ color: '#fbbf24', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                    {showAnswer ? '💡 ANSWER' : '❓ QUESTION — Click to Flip'}
                  </div>
                  <div style={{ color: 'white', fontWeight: '700', fontSize: '1rem', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                    {showAnswer ? flashcardNote.flashcards[flashcardIdx].back : flashcardNote.flashcards[flashcardIdx].front}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <button disabled={flashcardIdx === 0} onClick={() => { setFlashcardIdx(p => p - 1); setShowAnswer(false) }}
                    style={{ flex: 1, padding: '0.65rem', borderRadius: '0.6rem', background: flashcardIdx === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)', color: flashcardIdx === 0 ? '#475569' : 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: flashcardIdx === 0 ? 'not-allowed' : 'pointer' }}>
                    ← Prev
                  </button>
                  <button onClick={() => setShowAnswer(!showAnswer)}
                    style={{ flex: 1, padding: '0.65rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', fontWeight: '700', border: 'none', cursor: 'pointer' }}>
                    Flip 🔄
                  </button>
                  <button disabled={flashcardIdx === flashcardNote.flashcards.length - 1}
                    onClick={() => { setFlashcardIdx(p => p + 1); setShowAnswer(false) }}
                    style={{ flex: 1, padding: '0.65rem', borderRadius: '0.6rem', background: flashcardIdx === flashcardNote.flashcards.length - 1 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)', color: flashcardIdx === flashcardNote.flashcards.length - 1 ? '#475569' : 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: flashcardIdx === flashcardNote.flashcards.length - 1 ? 'not-allowed' : 'pointer' }}>
                    Next →
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginTop: '1rem' }}>
                  {flashcardNote.flashcards.map((_, i) => (
                    <div key={i} onClick={() => { setFlashcardIdx(i); setShowAnswer(false) }}
                      style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === flashcardIdx ? '#7c3aed' : 'rgba(255,255,255,0.2)', cursor: 'pointer' }} />
                  ))}
                </div>

                <button onClick={() => setFlashcardNote(null)}
                  style={{ marginTop: '1.25rem', padding: '0.6rem 1.5rem', borderRadius: '0.75rem', background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}>
                  ✕ Close Flashcards — Browse More Notes
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* ── EXAM QUESTIONS TAB ────────────────────────────────────── */}
      {activeTab === 'exam' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '1rem' }}>📋 Exam Revision — Questions Bank</h2>
          <div style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: '1rem', padding: '1rem 1.5rem', marginBottom: '1.5rem' }}>
            <p style={{ color: '#fbbf24', fontWeight: '700', margin: 0, fontSize: '0.9rem' }}>
              💡 Tip: Click "Read 📖" on any note in the Library tab to see full exam questions. Or use search to find specific topics.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {pagedNotes.slice(0, 12).map(note => (
              <div key={note.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.25rem' }}>
                <h3 style={{ color: 'white', fontWeight: '700', fontSize: '0.92rem', marginBottom: '0.75rem' }}>📖 {note.title}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {examQs(note.topic).map((q, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', fontSize: '0.78rem' }}>
                      <span style={{ color: '#cbd5e1' }}>{q.q}</span>
                      <span style={{ flexShrink: 0, color: '#fbbf24', fontWeight: '700' }}>{q.mark}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => openNote(note)}
                  style={{ marginTop: '0.75rem', width: '100%', padding: '0.5rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', border: 'none', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}>
                  Read Full Notes 📖
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── ALL CATEGORIES TAB ────────────────────────────────────── */}
      {activeTab === 'categories' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '1.25rem' }}>🗂️ All Note Categories ({stats.total.toLocaleString()}+ Notes Total)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
            {categoryList.map(cat => (
              <div key={cat.name} style={{ background: `${cat.color}10`, border: `1px solid ${cat.color}30`, borderRadius: '1.25rem', padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '2rem' }}>{cat.icon}</span>
                    <div>
                      <div style={{ color: 'white', fontWeight: '800', fontSize: '0.95rem' }}>{cat.name}</div>
                      <div style={{ color: cat.color, fontSize: '0.78rem', fontWeight: '700' }}>{stats.byCategory[cat.name]?.count.toLocaleString()}+ notes</div>
                    </div>
                  </div>
                  <button onClick={() => { setSelectedCategory(cat.name); setSelectedSubject('All'); setActiveTab('notes') }}
                    style={{ background: cat.color, color: 'white', border: 'none', borderRadius: '0.6rem', padding: '0.4rem 0.9rem', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}>
                    Browse →
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {cat.subjects.slice(0, 6).map(subj => (
                    <button key={subj} onClick={() => { setSelectedCategory(cat.name); setSelectedSubject(subj); setActiveTab('notes') }}
                      style={{ background: `${cat.color}15`, color: cat.color, border: `1px solid ${cat.color}30`, borderRadius: '0.5rem', padding: '0.2rem 0.55rem', fontSize: '0.7rem', fontWeight: '600', cursor: 'pointer' }}>
                      {subj.split(' ').slice(0, 2).join(' ')}
                    </button>
                  ))}
                  {cat.subjects.length > 6 && (
                    <span style={{ color: '#64748b', fontSize: '0.7rem', padding: '0.2rem 0.4rem' }}>+{cat.subjects.length - 6} more</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── AI SUMMARY MODAL ─────────────────────────────────────── */}
      <AnimatePresence>
        {aiSummaryModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setAiSummaryModal(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              style={{ background: 'linear-gradient(135deg, #1e1b4b, #0f172a)', border: '1px solid rgba(74,222,128,0.4)', borderRadius: '1.5rem', padding: '2rem', maxWidth: '560px', width: '100%' }}
              onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', margin: 0 }}>✨ AI Quick Summary</h3>
                <button onClick={() => setAiSummaryModal(null)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
              </div>
              <h4 style={{ color: '#a78bfa', fontWeight: '700', marginBottom: '1rem', fontSize: '0.95rem' }}>{aiSummaryModal.title}</h4>
              <div style={{ background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1rem', whiteSpace: 'pre-line', color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6 }}>
                {aiSummaryModal.aiSummary}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {aiSummaryModal.tags?.slice(0, 5).map(tag => (
                  <span key={tag} style={{ background: 'rgba(139,92,246,0.1)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.2)', padding: '0.15rem 0.55rem', borderRadius: '1rem', fontSize: '0.72rem' }}>#{tag}</span>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button onClick={() => { openNote(selectedNoteItem || { ...aiSummaryModal, category: aiSummaryModal.branch }); setAiSummaryModal(null) }}
                  style={{ padding: '0.65rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', fontWeight: '700', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}>
                  Read Full Notes 📖
                </button>
                <button onClick={() => setAiSummaryModal(null)}
                  style={{ padding: '0.65rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '0.85rem' }}>
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Helper: exam Qs for a topic string ────────────────────────────
function examQs(topic) {
  return [
    { q: `Define ${topic || 'this concept'} with example`, mark: '2M' },
    { q: `Explain ${topic || 'this concept'} in detail with diagram`, mark: '13M' },
    { q: `Apply ${topic || 'this concept'} to solve a problem`, mark: '16M' }
  ]
}
