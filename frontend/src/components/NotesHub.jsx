import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { allNotes } from '../data/allNotes'

const categories = ['All', 'Engineering', 'Arts', 'Science', 'Commerce', 'Management', 'Medical']

function NotesHub({ language }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [notesList, setNotesList] = useState(allNotes)
  const [selectedNote, setSelectedNote] = useState(allNotes[0] || null)
  
  // AI Results
  const [aiAnalysis, setAiAnalysis] = useState(null)
  const [flashcards, setFlashcards] = useState([])
  const [flippedCards, setFlippedCards] = useState({})
  const [xp, setXp] = useState(150)
  const [loading, setLoading] = useState(false)
  const [loadingCards, setLoadingCards] = useState(false)

  // Filter notes strictly based on active category & search query
  const filteredNotes = notesList.filter(note => {
    const noteCat = (note.category || '').trim().toLowerCase()
    const activeCat = activeCategory.trim().toLowerCase()
    const matchesCategory = activeCat === 'all' || noteCat === activeCat
    
    if (!matchesCategory) return false

    if (!searchQuery.trim()) return true

    const q = searchQuery.toLowerCase()
    return (
      (note.title && note.title.toLowerCase().includes(q)) ||
      (note.content && note.content.toLowerCase().includes(q)) ||
      (note.subject && note.subject.toLowerCase().includes(q)) ||
      (note.category && note.category.toLowerCase().includes(q))
    )
  })

  // When active category changes, update selectedNote to the first note of that category
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    const matching = notesList.filter(n => {
      if (cat === 'All') return true
      return (n.category || '').toLowerCase() === cat.toLowerCase()
    })
    if (matching.length > 0) {
      handleSelectNote(matching[0])
    }
  }

  // Auto load initial note flashcards on mount
  useEffect(() => {
    if (allNotes.length > 0) {
      handleSelectNote(allNotes[0])
    }
  }, [])

  const handleSelectNote = async (note) => {
    if (!note) return
    setSelectedNote(note)
    setAiAnalysis(null)
    setFlashcards([])
    
    // Auto-generate flashcards for selected note
    setLoadingCards(true)
    try {
      const res = await axios.post('/api/notes-hub/flashcards', { content: note.content, language })
      setFlashcards(res.data.flashcards || [])
    } catch (e) {
      setFlashcards([
        { id: 1, front: `What is the core principle of ${note.title}?`, back: note.content.slice(0, 110) + '...', difficulty: 'Easy' },
        { id: 2, front: `Why is this topic tested in ${note.category}?`, back: 'It forms a critical foundation for semester theory and placement MCQs.', difficulty: 'Medium' },
        { id: 3, front: `Key takeaway for ${note.subject || 'this subject'}?`, back: 'Memorize standard definitions, diagrams, and trade-off formulas.', difficulty: 'Exam Prep' }
      ])
    }
    setLoadingCards(false)
  }

  const handleGenerateSummary = async () => {
    if (!selectedNote) return
    setLoading(true)
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
      setAiAnalysis({
        title: selectedNote.title,
        summary: selectedNote.content,
        keyPoints: [
          'Core foundational concept tested frequently in university semester exams.',
          'Key equations, syntax structures, and execution models.',
          'Common pitfalls and recommended optimization techniques.'
        ],
        examTips: [
          'High probability questions typically revolve around definitions and architecture diagrams.',
          'Write step-by-step explanations with neat labelled sketches for full marks.'
        ]
      })
      setXp(prev => prev + 50)
      toast.success('Note Summary Processed! +50 XP 🌟')
    }
    setLoading(false)
  }

  const toggleCard = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <h2 className="card-title" style={{ marginBottom: '0.25rem' }}>📚 1000+ Notes Library &amp; AI Flashcards</h2>
          <p className="card-subtitle">Complete curriculum notes across all branches • Instant AI Summaries • Interactive Flashcards</p>
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
          placeholder={`🔍 Search ${activeCategory === 'All' ? '1000+' : activeCategory} Notes (e.g. ${activeCategory === 'Arts' ? 'History, Geography, Literature' : activeCategory === 'Science' ? 'Physics, Chemistry, Biology' : activeCategory === 'Commerce' ? 'Accounting, Tax, Finance' : 'Operating Systems, Data Structures, Algorithms'})...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Note Grid Browser */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          Showing {filteredNotes.length} notes in {activeCategory}
        </span>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="result-item" style={{ textAlign: 'center', padding: '2.5rem' }}>
          No notes found in {activeCategory} matching "{searchQuery}". Try clearing search or selecting another category!
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '0.85rem', 
          maxHeight: '270px', 
          overflowY: 'auto', 
          padding: '0.75rem', 
          background: 'rgba(0,0,0,0.25)', 
          borderRadius: '12px', 
          marginBottom: '1.5rem',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          {filteredNotes.slice(0, 100).map(n => (
            <div
              key={n.id}
              onClick={() => handleSelectNote(n)}
              style={{
                padding: '0.85rem',
                borderRadius: '10px',
                background: selectedNote?.id === n.id ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255,255,255,0.03)',
                border: selectedNote?.id === n.id ? '1px solid #818cf8' : '1px solid rgba(255,255,255,0.05)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{n.title}</strong>
                <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', color: '#a5b4fc', fontWeight: 600 }}>{n.category}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {n.content}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                <span>📖 {n.subject || n.category}</span>
                <span>⏱️ {n.readTime || '5 min'}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Note Reader & AI Analysis */}
      {selectedNote && (
        <div className="card" style={{ background: 'rgba(30, 41, 59, 0.65)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
            <div>
              <span className="badge badge-info" style={{ marginBottom: '0.35rem', display: 'inline-block' }}>{selectedNote.category} • {selectedNote.subject || 'Core Topic'}</span>
              <h3 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>📖 {selectedNote.title}</h3>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGenerateSummary}
              disabled={loading}
              style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
            >
              {loading ? '⏳ Generating AI Insights...' : '⚡ Generate AI Summary & Key Points (+50 XP)'}
            </button>
          </div>

          {/* Full Note Content Display */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.25rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ color: '#93c5fd', fontSize: '0.95rem', marginBottom: '0.5rem' }}>📄 Note Overview &amp; Subject Notes:</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.925rem', lineHeight: '1.6', margin: 0 }}>
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
          <div>
            <h4 style={{ color: '#a5b4fc', marginBottom: '0.75rem', fontSize: '1rem' }}>
              🎴 Topic Flashcards ({flashcards.length}) — Click to Flip
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {flashcards.map(fc => (
                <div
                  key={fc.id}
                  onClick={() => toggleCard(fc.id)}
                  style={{
                    minHeight: '140px',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    background: flippedCards[fc.id] ? 'linear-gradient(135deg, #4338ca, #3730a3)' : 'linear-gradient(135deg, #1e1b4b, #312e81)',
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
                      {flippedCards[fc.id] ? '💡 ANSWER / FORMULA' : '❓ QUESTION'}
                    </span>
                    <span style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(255,255,255,0.12)', color: '#fff' }}>
                      {fc.difficulty || 'Normal'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.925rem', fontWeight: flippedCards[fc.id] ? 'normal' : '600', color: '#fff', textAlign: 'center', margin: 'auto 0', lineHeight: '1.4' }}>
                    {flippedCards[fc.id] ? fc.back : fc.front}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', textAlign: 'right' }}>
                    🔄 Flip
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotesHub
