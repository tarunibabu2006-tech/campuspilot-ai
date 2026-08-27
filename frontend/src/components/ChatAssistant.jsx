import React, { useState, useRef, useEffect } from 'react'
import { chatWithAI } from '../services/api'
import toast from 'react-hot-toast'

function ChatAssistant({ language }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am your CampusPilot AI assistant. 🎓 How can I help you with your studies, placements, or college life today?'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e) => {
    e?.preventDefault()
    if (!input.trim() || loading) return

    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }])
    setLoading(true)

    try {
      const res = await chatWithAI({ message: userMsg, language })
      setMessages(prev => [...prev, { sender: 'ai', text: res.data.response }])
    } catch (err) {
      toast.error('Failed to get AI response')
      setMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, I ran into an error. Please try again!' }])
    }
    setLoading(false)
  }

  const quickPrompts = [
    'How to prepare for TCS NQT?',
    'Tips to manage 75% attendance',
    'How to prepare for semester exams in 1 week?',
    'Best projects for React developer resume'
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Highlighted Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #0f172a 100%)',
        border: '1px solid rgba(99,102,241,0.4)',
        borderRadius: '1.5rem',
        padding: '1.75rem',
        boxShadow: '0 8px 32px rgba(99,102,241,0.25)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>🤖</span>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900', color: '#fff', background: 'linear-gradient(135deg, #fff, #c7d2fe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                AI Student Campus Copilot
              </h1>
              <p style={{ margin: '0.2rem 0 0', color: '#a5b4fc', fontSize: '0.88rem' }}>
                Ask anything about exams, placement strategies, coding doubt resolutions & college survival in Tamil, Hindi or English.
              </p>
            </div>
          </div>
          <span style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: 'white', padding: '0.35rem 0.85rem', borderRadius: '0.6rem', fontWeight: '800', fontSize: '0.85rem' }}>
            Gemini 1.5 Pro
          </span>
        </div>
      </div>

      <div className="card chat-container">

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="chat-bubble ai">
            <span className="loading-dots">CampusPilot is thinking</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 2 && (
        <div className="flex flex-wrap gap-1 px-2 py-1 mb-1">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              type="button"
              className="lang-btn"
              onClick={() => { setInput(qp) }}
              style={{ fontSize: '0.75rem' }}
            >
              💡 {qp}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSend} className="chat-input-area">
        <input
          type="text"
          className="form-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask anything about exams, placements, attendance, or skills..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()} className="btn btn-primary">
          Send 🚀
        </button>
      </form>
    </div>
    </div>
  )
}

export default ChatAssistant
