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
    <div className="card chat-container">
      <div className="flex justify-between items-center pb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <h2 className="card-title" style={{ marginBottom: 0, fontSize: '1.2rem' }}>🤖 AI Student Assistant</h2>
        <span className="badge badge-safe">Gemini 1.5 Powered</span>
      </div>

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
  )
}

export default ChatAssistant
