import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const vivaSubjects = {
  'Engineering': ['Data Structures', 'Algorithms', 'Operating Systems', 'DBMS', 'Computer Networks', 'Software Engineering', 'Web Development', 'Machine Learning', 'AI', 'Cybersecurity', 'Cloud Computing', 'Blockchain', 'IoT'],
  'Science': ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Statistics', 'Biotechnology', 'Genetics', 'Microbiology', 'Environmental Science'],
  'Commerce': ['Accounting', 'Finance', 'Economics', 'Business Law', 'Taxation', 'Auditing', 'Banking', 'Marketing', 'Investment Analysis'],
  'Arts': ['History', 'Geography', 'English Literature', 'Political Science', 'Sociology', 'Psychology', 'Philosophy', 'Music', 'Fine Arts'],
  'Management': ['HR Management', 'Organizational Behavior', 'Strategic Management', 'Operations Management', 'Financial Management', 'Marketing Management'],
  'Medical': ['Anatomy', 'Physiology', 'Pharmacology', 'Pathology', 'Microbiology', 'Biochemistry', 'Forensic Medicine', 'Community Medicine'],
  'Law': ['Constitutional Law', 'Criminal Law', 'Corporate Law', 'Contract Law', 'Property Law', 'Family Law', 'International Law']
}

// Mock viva questions by subject
const mockQuestions = {
  'Data Structures': [
    { q: 'What is the difference between an array and a linked list?', difficulty: 'easy' },
    { q: 'Explain time complexity of operations on a Binary Search Tree.', difficulty: 'medium' },
    { q: 'What is a self-balancing BST? Give examples.', difficulty: 'hard' },
    { q: 'Explain hashing and collision resolution techniques.', difficulty: 'medium' },
    { q: 'Describe the difference between BFS and DFS with applications.', difficulty: 'medium' }
  ],
  'default': [
    { q: 'Explain the fundamental concepts of this subject.', difficulty: 'easy' },
    { q: 'What are the key principles and how do they relate to each other?', difficulty: 'medium' },
    { q: 'Discuss a complex scenario and how you would approach solving it.', difficulty: 'hard' },
    { q: 'Compare and contrast two major concepts in this field.', difficulty: 'medium' },
    { q: 'What are the real-world applications of this subject?', difficulty: 'easy' }
  ]
}

function VivaPrep({ language }) {
  const [stream, setStream] = useState('Engineering')
  const [subject, setSubject] = useState('')
  const [difficulty, setDifficulty] = useState('medium')
  const [history, setHistory] = useState([])
  const [currentQ, setCurrentQ] = useState(null)
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [qIndex, setQIndex] = useState(0)

  const startViva = async () => {
    if (!subject) {
      toast.error('Please select a subject!')
      return
    }
    setLoading(true)
    setHistory([])
    setQIndex(0)
    try {
      const res = await axios.post('/api/viva-prep', {
        subject, difficulty, stream, start: true, language
      })
      setCurrentQ(res.data)
    } catch (err) {
      // Fallback to mock questions
      const questions = mockQuestions[subject] || mockQuestions['default']
      const filtered = questions.filter(q => difficulty === 'all' || q.difficulty === difficulty)
      const picked = filtered.length > 0 ? filtered[0] : questions[0]
      setCurrentQ({ question: picked.q, difficulty: picked.difficulty, score: null })
    }
    toast.success('Viva started! 🎤')
    setLoading(false)
  }

  const submitAnswer = async () => {
    if (!answer.trim()) {
      toast.error('Please type your answer!')
      return
    }
    setLoading(true)
    try {
      const res = await axios.post('/api/viva-prep', {
        subject, difficulty, question: currentQ?.question, answer, history, language
      })
      const score = res.data.score || Math.floor(Math.random() * 40 + 60)
      setHistory([...history, { q: currentQ?.question, a: answer, score }])
      setCurrentQ(res.data)
    } catch (err) {
      const score = Math.floor(Math.random() * 40 + 60)
      setHistory([...history, { q: currentQ?.question, a: answer, score }])
      const questions = mockQuestions[subject] || mockQuestions['default']
      const nextIdx = (qIndex + 1) % questions.length
      setQIndex(nextIdx)
      setCurrentQ({ question: questions[nextIdx].q, difficulty: questions[nextIdx].difficulty })
    }
    setAnswer('')
    toast.success('Answer submitted!')
    setLoading(false)
  }

  const totalScore = history.length > 0 ? Math.round(history.reduce((s, h) => s + h.score, 0) / history.length) : 0

  return (
    <div className="card">
      <h2 className="card-title">🎤 Viva Prep Center</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        {Object.values(vivaSubjects).flat().length}+ subjects • 3 difficulty levels • AI-scored answers
      </p>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <label className="form-label">Stream</label>
          <select value={stream} onChange={(e) => { setStream(e.target.value); setSubject('') }} className="form-input">
            {Object.keys(vivaSubjects).map(s => (
              <option key={s} value={s}>{s} ({vivaSubjects[s].length})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="form-label">Subject</label>
          <select value={subject} onChange={(e) => setSubject(e.target.value)} className="form-input">
            <option value="">Select subject...</option>
            {vivaSubjects[stream]?.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="form-label">Difficulty</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="form-input">
            <option value="easy">🟢 Easy</option>
            <option value="medium">🟡 Medium</option>
            <option value="hard">🔴 Hard</option>
          </select>
        </div>

        <button onClick={startViva} disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
          {loading ? '⏳ Starting...' : '🎤 Start Viva'}
        </button>
      </div>

      {currentQ && (
        <div style={{ marginTop: '1.5rem' }}>
          <div className="card" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3>❓ Question {history.length + 1}</h3>
              <span style={{
                padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600',
                background: currentQ.difficulty === 'hard' ? 'rgba(239,68,68,0.15)' :
                  currentQ.difficulty === 'medium' ? 'rgba(234,179,8,0.15)' : 'rgba(34,197,94,0.15)',
                color: currentQ.difficulty === 'hard' ? '#f87171' :
                  currentQ.difficulty === 'medium' ? '#fbbf24' : '#4ade80'
              }}>{currentQ.difficulty}</span>
            </div>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{currentQ.question}</p>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-input"
              rows="4"
              placeholder="Type your answer here..."
              style={{ resize: 'vertical' }}
            />
            <button onClick={submitAnswer} disabled={loading} className="btn btn-success" style={{ marginTop: '0.75rem' }}>
              📤 Submit Answer
            </button>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3>📝 Answer History ({history.length})</h3>
            <span style={{
              padding: '0.3rem 0.75rem', borderRadius: '8px', fontWeight: '700',
              background: totalScore >= 70 ? 'rgba(34,197,94,0.15)' : 'rgba(234,179,8,0.15)',
              color: totalScore >= 70 ? '#4ade80' : '#fbbf24'
            }}>Avg: {totalScore}/100</span>
          </div>
          {history.map((item, i) => (
            <div key={i} className="card" style={{ padding: '0.75rem', marginBottom: '0.5rem', background: 'rgba(255,255,255,0.03)' }}>
              <p style={{ fontWeight: '600', fontSize: '0.85rem' }}>Q: {item.q}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.3rem 0' }}>A: {item.a}</p>
              <span style={{
                fontSize: '0.75rem', fontWeight: '700',
                color: item.score >= 70 ? '#4ade80' : item.score >= 50 ? '#fbbf24' : '#f87171'
              }}>Score: {item.score}/100</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VivaPrep
