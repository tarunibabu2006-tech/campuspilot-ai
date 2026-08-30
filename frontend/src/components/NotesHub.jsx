import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const PAGE_SIZE = 24

function NotesHub({ language }) {
  const [stats, setStats] = useState(null)
  const [categoryTree, setCategoryTree] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [notesList, setNotesList] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [listLoading, setListLoading] = useState(true)

  const [selectedNote, setSelectedNote] = useState(null)
  const [noteLoading, setNoteLoading] = useState(false)

  const [aiAnalysis, setAiAnalysis] = useState(null)
  const [flippedCards, setFlippedCards] = useState({})
  const [xp, setXp] = useState(150)
  const [summaryLoading, setSummaryLoading] = useState(false)

  // Real catalog stats — never a hardcoded/fabricated count.
  useEffect(() => {
    axios.get('/api/notes-hub/stats').then(({ data }) => setStats(data)).catch(() => setStats(null))
    axios.get('/api/notes-hub/categories').then(({ data }) => setCategoryTree(data || [])).catch(() => setCategoryTree([]))
  }, [])

  const fetchNotes = useCallback(() => {
    setListLoading(true)
    axios.get('/api/notes-hub', {
      params: {
        category: activeCategory === 'All' ? undefined : activeCategory,
        search: searchQuery || undefined,
        page,
        limit: PAGE_SIZE
      }
    })
      .then(({ data }) => {
        setNotesList(data.notes || [])
        setTotal(data.total || 0)
      })
      .catch(() => toast.error('Notes could not be loaded from the database.'))
      .finally(() => setListLoading(false))
  }, [activeCategory, searchQuery, page])

  useEffect(() => { fetchNotes() }, [fetchNotes])

  const categories = ['All', ...new Set(categoryTree.map(c => c.category))]

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setPage(1)
  }

  const handleSearch = (q) => {
    setSearchQuery(q)
    setPage(1)
  }

  const handleSelectNote = async (noteStub) => {
    setSelectedNote(noteStub)
    setAiAnalysis(null)
    setFlippedCards({})
    setNoteLoading(true)
    try {
      const res = await axios.get(`/api/notes-hub/${noteStub._id}`, { params: { language } })
      setSelectedNote(res.data)
    } catch (e) {
      toast.error('This note could not be generated right now. Please try again.')
      setSelectedNote(null)
    }
    setNoteLoading(false)
  }

  const handleGenerateSummary = async () => {
    if (!selectedNote) return
    setSummaryLoading(true)
    try {
      const res = await axios.post('/api/notes-hub/process', {
        title: selectedNote.title,
        notes: selectedNote.content,
        language
      })
      setAiAnalysis(res.data)
      setXp(prev => prev + 50)
      toast.success('AI Note Summary Generated! +50 XP 🌟')
    } catch (err) {
      setAiAnalysis(null)
      toast.error('Note summary could not be generated.')
    }
    setSummaryLoading(false)
  }

  const toggleCard = (idx) => {
    setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }))
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <h2 className="card-title" style={{ marginBottom: '0.25rem' }}>📚 Notes Library &amp; AI Flashcards</h2>
          <p className="card-subtitle">
            {stats
              ? `${stats.totalTopics.toLocaleString()} topics catalogued • ${stats.totalGenerated.toLocaleString()} written so far — open any topic to generate it instantly`
              : 'Loading catalog…'}
          </p>
        </div>
        <span className="badge" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff', fontSize: '0.9rem', padding: '0.5rem 1rem', borderRadius: '8px' }}>
          ⭐ {xp} XP Earned
        </span>
      </div>

      {/* Categories Bar */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            className={`nav-tab ${activeCategory.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
            style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem', fontWeight: 600 }}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: '1.25rem' }}>
        <input
          type="text"
          className="form-input"
          placeholder={`🔍 Search ${activeCategory === 'All' ? 'all topics' : activeCategory} (e.g. Arrays, Thermodynamics, Contract Law)...`}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Note Grid Browser */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          Showing {notesList.length ? (page - 1) * PAGE_SIZE + 1 : 0}-{(page - 1) * PAGE_SIZE + notesList.length} of {total.toLocaleString()} topics in {activeCategory}
        </span>
      </div>

      {listLoading ? (
        <div className="result-item" style={{ textAlign: 'center', padding: '2.5rem' }}>Loading topics…</div>
      ) : notesList.length === 0 ? (
        <div className="result-item" style={{ textAlign: 'center', padding: '2.5rem' }}>
          No topics found in {activeCategory} matching "{searchQuery}". Try clearing search or selecting another category!
        </div>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '0.85rem',
            maxHeight: '320px',
            overflowY: 'auto',
            padding: '0.75rem',
            background: 'rgba(0,0,0,0.25)',
            borderRadius: '12px',
            marginBottom: '0.75rem',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            {notesList.map(n => (
              <div
                key={n._id}
                onClick={() => handleSelectNote(n)}
                style={{
                  padding: '0.85rem',
                  borderRadius: '10px',
                  background: selectedNote?._id === n._id ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255,255,255,0.03)',
                  border: selectedNote?._id === n._id ? '1px solid #818cf8' : '1px solid rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{n.title}</strong>
                  <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', color: '#a5b4fc', fontWeight: 600 }}>{n.level}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  <span>📖 {n.subject}</span>
                  <span>{n.generated ? `⏱️ ${n.readTime || 'ready'}` : '✨ generate on open'}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <button className="btn btn-outline" disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} style={{ padding: '0.35rem 0.9rem', fontSize: '0.8rem' }}>← Prev</button>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Page {page} of {totalPages}</span>
            <button className="btn btn-outline" disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} style={{ padding: '0.35rem 0.9rem', fontSize: '0.8rem' }}>Next →</button>
          </div>
        </>
      )}

      {/* Selected Note Reader & AI Analysis */}
      {noteLoading && (
        <div className="card" style={{ textAlign: 'center', padding: '2.5rem' }}>
          ⏳ Generating this note with AI for the first time — it'll be cached for everyone after this...
        </div>
      )}

      {!noteLoading && selectedNote && selectedNote.content && (
        <div className="card" style={{ background: 'rgba(30, 41, 59, 0.65)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
            <div>
              <span className="badge badge-info" style={{ marginBottom: '0.35rem', display: 'inline-block' }}>{selectedNote.category} • {selectedNote.subject}</span>
              <h3 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>📖 {selectedNote.title}</h3>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGenerateSummary}
              disabled={summaryLoading}
              style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
            >
              {summaryLoading ? '⏳ Generating AI Insights...' : '⚡ Generate AI Summary & Key Points (+50 XP)'}
            </button>
          </div>

          {/* Full Note Content Display */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.25rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ color: '#93c5fd', fontSize: '0.95rem', marginBottom: '0.5rem' }}>📄 Note Overview &amp; Subject Notes:</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.925rem', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-wrap' }}>
              {selectedNote.content}
            </p>
          </div>

          {/* AI Analysis Summary */}
          {aiAnalysis && (
            <div style={{ marginBottom: '1.5rem', padding: '1.25rem', background: 'rgba(15,23,42,0.85)', borderRadius: '12px', borderLeft: '4px solid #818cf8' }}>
              <h4 style={{ color: '#818cf8', marginBottom: '0.5rem', fontSize: '1rem' }}>📋 AI Summary: {aiAnalysis.title}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.5' }}>{aiAnalysis.summary}</p>

              {aiAnalysis.keyPoints && (
                <div style={{ marginBottom: '0.85rem' }}>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.85rem' }}>🎯 Key Revision Points:</strong>
                  <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1.2rem', marginTop: '0.35rem', lineHeight: '1.5' }}>
                    {aiAnalysis.keyPoints.map((kp, idx) => <li key={idx}>{kp}</li>)}
                  </ul>
                </div>
              )}

              {aiAnalysis.examTips && (
                <div>
                  <strong style={{ color: '#fbbf24', fontSize: '0.85rem' }}>💡 High-Scoring Exam Tips:</strong>
                  <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1.2rem', marginTop: '0.35rem', lineHeight: '1.5' }}>
                    {aiAnalysis.examTips.map((tip, idx) => <li key={idx}>{tip}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Interactive Flashcards */}
          {selectedNote.flashcards && selectedNote.flashcards.length > 0 && (
            <div>
              <h4 style={{ color: '#a5b4fc', marginBottom: '0.75rem', fontSize: '1rem' }}>
                🎴 Topic Flashcards ({selectedNote.flashcards.length}) — Click to Flip
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                {selectedNote.flashcards.map((fc, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleCard(idx)}
                    style={{
                      minHeight: '140px',
                      padding: '1.25rem',
                      borderRadius: '12px',
                      background: flippedCards[idx] ? 'linear-gradient(135deg, #4338ca, #3730a3)' : 'linear-gradient(135deg, #1e1b4b, #312e81)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.7rem', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                        {flippedCards[idx] ? '💡 ANSWER' : '❓ QUESTION'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.925rem', fontWeight: flippedCards[idx] ? 'normal' : '600', color: '#fff', textAlign: 'center', margin: 'auto 0', lineHeight: '1.4' }}>
                      {flippedCards[idx] ? fc.back : fc.front}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', textAlign: 'right' }}>
                      🔄 Flip
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default NotesHub
