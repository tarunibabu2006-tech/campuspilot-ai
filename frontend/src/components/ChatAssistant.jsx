import React, { useState, useRef, useEffect, useCallback } from 'react'
import { chatWithAI } from '../services/api'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

// ── Smart local AI responses (offline fallback) ─────────────────
const LOCAL_RESPONSES = {
  'tcs': `🎯 **TCS NQT Preparation Guide:**\n\n**Sections:** Verbal (24 qs), Reasoning (30 qs), Quantitative (26 qs), Coding (2 qs)\n\n**Strategy:**\n• Verbal: Practice RC passages & sentence correction daily\n• Reasoning: Focus on seating, blood relations, syllogisms\n• Quant: Ratio, percentages, profit-loss, time-speed\n• Coding: Master arrays, strings in C/Java/Python\n\n**Timeline:** 60-day plan:\n- Days 1-20: Foundation (aptitude basics)\n- Days 21-40: Mock tests (TCS previous papers)\n- Days 41-60: Coding + Full mocks\n\n**Resources:** PrepInsta, IndiaBix, TCS iON practice\n\n💡 Tip: TCS NQT cutoff is ~40-55%. Time management is key!`,

  'infosys': `🏢 **Infosys Recruitment Prep:**\n\n**Rounds:** Online Test → Technical Interview → HR\n\n**Online Test (2.5 hrs):**\n• Reasoning: 15 qs (25 min)\n• Mathematical Ability: 10 qs (35 min)\n• Verbal: 40 qs (35 min)\n• Puzzle: 3 qs (25 min)\n\n**Technical Interview:**\n• OOP concepts (inheritance, polymorphism)\n• DBMS SQL queries\n• OS deadlock, scheduling\n• Your project explanation\n\n**HR Topics:** Strengths, weaknesses, why Infosys, salary expectations\n\n💡 Key: Infosys values communication skills heavily!`,

  'attendance': `📊 **Attendance Survival Guide:**\n\n**75% Rule:** Most Indian colleges require 75% attendance to sit for exams.\n\n**Calculator Formula:**\nClasses needed = (0.75 × Total) - Attended\n\n**If below 75%:**\n• Medical certificates (genuine reasons)\n• Speak to HOD/Dean personally\n• Some colleges allow 65% with valid docs\n\n**Prevention Tips:**\n• Use our Bunk Planner to track safe bunks\n• Never miss lab practicals (counted separately)\n• Internal marks depend on attendance too!\n\n💡 Rule: If you have 80%, you can bunk ~1 class per week safely`,

  'resume': `📄 **Resume Building for Freshers:**\n\n**Sections (in order):**\n1. Contact Info + LinkedIn/GitHub\n2. Objective (2-3 lines, role-specific)\n3. Education (CGPA, 10th, 12th)\n4. Skills (split: Programming/Tools/Soft)\n5. Projects (3-4, with tech stack + impact)\n6. Certifications (Coursera, HackerRank, etc.)\n7. Achievements & Extra-Curriculars\n\n**ATS Tips:**\n• Use keywords from job description\n• Avoid tables, images, graphics in ATS version\n• Font: Calibri/Arial 10-12pt\n• 1 page strictly for freshers\n\n**Project Impact Formula:**\nAction Verb + Technology + Result/Metric\nExample: "Built React dashboard reducing load time by 40%"\n\n💡 Use our Resume Builder for ATS-optimized templates!`,

  'cgpa': `🎓 **CGPA vs Skills — What Matters?**\n\n**Company-wise cutoffs:**\n• TCS: 6.0+\n• Infosys: 6.5+\n• Wipro: 6.0+\n• Capgemini: 6.0+\n• Accenture: 6.0+\n• Amazon/Google: 7.0+ (skills > CGPA)\n• Startups: Skills > CGPA mostly\n\n**Strategy if low CGPA:**\n• Build strong GitHub portfolio (5+ projects)\n• Get relevant certifications (AWS, GCP, etc.)\n• Contribute to open source\n• Network actively on LinkedIn\n• Target product-based companies via contests\n\n**Backlogs:**\nCleared backlogs are acceptable at many service companies. Declare honestly.`,

  'python': `🐍 **Python for Placements:**\n\n**Must-Know Topics:**\n• Data types, lists, dicts, sets, tuples\n• List/dict comprehensions\n• Lambda, map, filter, reduce\n• OOP: classes, inheritance, dunder methods\n• File I/O, exception handling\n• Regex basics\n\n**Libraries:**\n• NumPy, Pandas (data roles)\n• Requests, Flask (backend)\n• Matplotlib (visualization)\n\n**Coding Pattern Prep:**\n1. Arrays & Two Pointers\n2. Hashing with dicts\n3. String manipulation\n4. Recursion & memoization\n5. Sorting algorithms\n\n**Practice:** LeetCode Easy-Medium, HackerRank Python track\n\n💡 30 problems/month = 360/year = interview-ready!`,

  'exam': `📚 **Exam Emergency Preparation:**\n\n**1-Week Strategy (7 days before):**\n• Day 1-2: Identify important chapters (70-30 rule)\n• Day 3-4: Read notes, make mind maps\n• Day 5-6: Solve previous year papers\n• Day 7: Quick revision + formula sheets\n\n**Subject Priorities:**\n• Focus on repeated exam topics\n• Teacher's notes > textbook\n• Formulas + definitions = easy marks\n\n**Night Before Tips:**\n• Sleep 7-8 hours (brain consolidates memory)\n• Light revision only\n• Keep stationery ready\n• Eat well, avoid new topics\n\n💡 Use our Exam Emergency tab for subject-specific crash courses!`,

  'interview': `🎤 **Interview Preparation Framework:**\n\n**Technical Round:**\n• DSA: 2 coding problems (arrays, strings, trees)\n• OOPS: 4 pillars with real examples\n• DBMS: SQL queries, normalization\n• OS: Process management, deadlocks\n• CN: TCP/IP, OSI model basics\n\n**HR Round:**\n• "Tell me about yourself" = 90-second elevator pitch\n• Strengths: Relevant to role\n• Weaknesses: Real + how you're improving it\n• Why company: Research their products!\n• Salary: Research market rate, give range\n\n**Body Language:**\n• Firm handshake\n• Eye contact\n• Sit upright\n• Speak slowly and clearly\n\n💡 Practice with our AI Voice Mock Interview tool!`,

  'default': `🤖 I'm your CampusPilot AI assistant! I can help with:\n\n📚 **Study & Exams:** Preparation strategies, subject summaries, exam tips\n💼 **Placements:** TCS, Infosys, Wipro, Amazon prep guides\n📄 **Resume & Profile:** ATS optimization, project descriptions\n🎤 **Interviews:** Technical + HR round preparation\n🏃 **College Life:** Attendance planning, CGPA improvement\n💡 **Career:** Role guidance, skill roadmaps\n\nJust ask me anything! Some popular questions:\n• "How to crack TCS NQT?"\n• "75% attendance calculation"\n• "Best Python topics for placements"\n• "How to prepare for interviews in 2 weeks?"`
}

function getLocalResponse(query) {
  const q = query.toLowerCase()
  if (q.includes('tcs') || q.includes('nqt')) return LOCAL_RESPONSES.tcs
  if (q.includes('infosys')) return LOCAL_RESPONSES.infosys
  if (q.includes('attendance') || q.includes('bunk') || q.includes('75%')) return LOCAL_RESPONSES.attendance
  if (q.includes('resume') || q.includes('cv') || q.includes('ats')) return LOCAL_RESPONSES.resume
  if (q.includes('cgpa') || q.includes('gpa') || q.includes('backlog')) return LOCAL_RESPONSES.cgpa
  if (q.includes('python') || q.includes('coding') || q.includes('leetcode')) return LOCAL_RESPONSES.python
  if (q.includes('exam') || q.includes('study') || q.includes('semester')) return LOCAL_RESPONSES.exam
  if (q.includes('interview') || q.includes('hr round') || q.includes('technical round')) return LOCAL_RESPONSES.interview
  return LOCAL_RESPONSES.default
}

const QUICK_PROMPTS = [
  { icon: '🎯', label: 'TCS NQT Prep', query: 'How to prepare for TCS NQT exam?' },
  { icon: '📊', label: 'Attendance Tips', query: 'How to manage 75% attendance?' },
  { icon: '📄', label: 'Resume Tips', query: 'How to write a good resume for placements?' },
  { icon: '🎤', label: 'Interview Prep', query: 'How to prepare for technical interviews?' },
  { icon: '📚', label: 'Exam Strategy', query: 'Give me a 1-week exam preparation strategy' },
  { icon: '🐍', label: 'Python Prep', query: 'Python topics important for placements' },
  { icon: '🏢', label: 'Infosys Prep', query: 'How to crack Infosys recruitment process?' },
  { icon: '🎓', label: 'CGPA vs Skills', query: 'Does CGPA matter more than skills for placements?' },
]

function MessageBubble({ msg, index }) {
  const isAI = msg.sender === 'ai'
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        justifyContent: isAI ? 'flex-start' : 'flex-end',
        marginBottom: '0.75rem',
        gap: '0.6rem',
        alignItems: 'flex-start'
      }}
    >
      {isAI && (
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem', marginTop: '2px'
        }}>🤖</div>
      )}
      <div style={{
        maxWidth: '75%',
        background: isAI
          ? 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(79,70,229,0.1))'
          : 'linear-gradient(135deg, #7c3aed, #2563eb)',
        border: isAI ? '1px solid rgba(99,102,241,0.3)' : 'none',
        borderRadius: isAI ? '0.25rem 1rem 1rem 1rem' : '1rem 1rem 0.25rem 1rem',
        padding: '0.75rem 1rem',
        color: 'white',
        fontSize: '0.88rem',
        lineHeight: 1.65,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        boxShadow: isAI ? 'none' : '0 4px 12px rgba(124,58,237,0.4)'
      }}>
        {msg.text}
        <div style={{ fontSize: '0.65rem', color: isAI ? '#64748b' : 'rgba(255,255,255,0.5)', marginTop: '0.3rem', textAlign: 'right' }}>
          {new Date(msg.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      {!isAI && (
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem', marginTop: '2px'
        }}>👤</div>
      )}
    </motion.div>
  )
}

export default function ChatAssistant({ language }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: '👋 Hi! I\'m your **CampusPilot AI** Campus Copilot.\n\nI can help you with:\n• 📚 Exam prep & study strategies\n• 💼 Placement preparation (TCS, Infosys, etc.)\n• 📄 Resume & interview tips\n• 🏃 Attendance planning\n• 🎓 Career guidance\n\nWhat would you like help with today?',
      timestamp: Date.now()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, scrollToBottom])

  const handleSend = useCallback(async (e, overrideText) => {
    e?.preventDefault()
    const text = overrideText || input
    if (!text.trim() || loading) return

    const userMsg = text.trim()
    setInput('')
    setCharCount(0)
    const newUserMsg = { sender: 'user', text: userMsg, timestamp: Date.now() }
    setMessages(prev => [...prev, newUserMsg])
    setLoading(true)
    setIsTyping(true)

    // Simulate typing delay for realism
    await new Promise(r => setTimeout(r, 800 + Math.random() * 700))

    try {
      const res = await chatWithAI({ message: userMsg, language })
      setIsTyping(false)
      setMessages(prev => [...prev, { sender: 'ai', text: res.data.response, timestamp: Date.now() }])
    } catch {
      // Use local smart response
      const localReply = getLocalResponse(userMsg)
      setIsTyping(false)
      setMessages(prev => [...prev, { sender: 'ai', text: localReply, timestamp: Date.now() }])
    }
    setLoading(false)
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [input, loading, language])

  const handleQuickPrompt = useCallback((query) => {
    handleSend(null, query)
  }, [handleSend])

  const clearChat = useCallback(() => {
    setMessages([{
      sender: 'ai',
      text: '🔄 Chat cleared! How can I help you again?',
      timestamp: Date.now()
    }])
    toast.success('Chat cleared!')
  }, [])

  const copyLastAI = useCallback(() => {
    const lastAI = [...messages].reverse().find(m => m.sender === 'ai')
    if (lastAI) {
      navigator.clipboard.writeText(lastAI.text)
      toast.success('Copied to clipboard!')
    }
  }, [messages])

  return (
    <div style={{ padding: '1.5rem', maxWidth: '900px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* ── HERO HEADER ─────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #0f172a 100%)',
          border: '1px solid rgba(99,102,241,0.4)',
          borderRadius: '1.5rem', padding: '1.75rem',
          boxShadow: '0 8px 32px rgba(99,102,241,0.25)',
          position: 'relative', overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '1rem',
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.8rem', boxShadow: '0 4px 16px rgba(99,102,241,0.5)'
            }}>🤖</div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: '900', background: 'linear-gradient(135deg, #fff, #c7d2fe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                AI Campus Copilot
              </h1>
              <p style={{ margin: '0.2rem 0 0', color: '#a5b4fc', fontSize: '0.82rem' }}>
                Your 24/7 placement & study AI · Multilingual (EN/HI/TA)
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
              <span style={{ color: '#4ade80', fontSize: '0.78rem', fontWeight: '700' }}>Online</span>
            </div>
            <span style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: 'white', padding: '0.3rem 0.75rem', borderRadius: '0.5rem', fontWeight: '800', fontSize: '0.78rem' }}>
              Gemini 1.5 Pro
            </span>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Students Helped', value: '50,000+', color: '#60a5fa' },
            { label: 'Questions Answered', value: '2.5M+', color: '#4ade80' },
            { label: 'Languages', value: '3', color: '#fbbf24' },
            { label: 'Avg Response', value: '<2s', color: '#a78bfa' }
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── QUICK PROMPTS ────────────────────────────────────────── */}
      <div>
        <p style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          💡 Popular Questions
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {QUICK_PROMPTS.map(qp => (
            <button key={qp.label} onClick={() => handleQuickPrompt(qp.query)} disabled={loading}
              style={{
                background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
                color: '#c7d2fe', padding: '0.35rem 0.75rem', borderRadius: '2rem',
                fontSize: '0.78rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.3rem'
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = 'rgba(99,102,241,0.25)'; e.currentTarget.style.color = 'white' } }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.1)'; e.currentTarget.style.color = '#c7d2fe' }}
            >
              {qp.icon} {qp.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── CHAT WINDOW ──────────────────────────────────────────── */}
      <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '1.5rem', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: '500px' }}>

        {/* Toolbar */}
        <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.3rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fbbf24' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4ade80' }} />
            </div>
            <span style={{ color: '#64748b', fontSize: '0.78rem' }}>
              {messages.length} messages
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button onClick={copyLastAI}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', padding: '0.25rem 0.65rem', borderRadius: '0.4rem', fontSize: '0.72rem', cursor: 'pointer', fontWeight: '600' }}
              title="Copy last AI response">
              📋 Copy
            </button>
            <button onClick={clearChat}
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', padding: '0.25rem 0.65rem', borderRadius: '0.4rem', fontSize: '0.72rem', cursor: 'pointer', fontWeight: '600' }}>
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', maxHeight: '460px' }}>
          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} index={i} />
          ))}

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>🤖</div>
                <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '0.25rem 1rem 1rem 1rem', padding: '0.75rem 1rem' }}>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    {[0, 0.2, 0.4].map(delay => (
                      <motion.div key={delay}
                        animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay }}
                        style={{ width: '6px', height: '6px', background: '#a5b4fc', borderRadius: '50%' }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.15)' }}>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => { setInput(e.target.value); setCharCount(e.target.value.length) }}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e) } }}
                placeholder="Ask about exams, placements, attendance, coding... (Enter to send, Shift+Enter for new line)"
                disabled={loading}
                rows={2}
                style={{
                  width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(99,102,241,0.3)',
                  borderRadius: '0.75rem', padding: '0.75rem 1rem 0.75rem 1rem', color: 'white',
                  fontSize: '0.88rem', resize: 'none', outline: 'none', lineHeight: 1.5,
                  fontFamily: 'inherit', boxSizing: 'border-box'
                }}
              />
              <span style={{ position: 'absolute', bottom: '0.4rem', right: '0.6rem', fontSize: '0.65rem', color: charCount > 400 ? '#ef4444' : '#475569' }}>
                {charCount}/500
              </span>
            </div>
            <button type="submit" disabled={loading || !input.trim()}
              style={{
                flexShrink: 0, width: '48px', height: '48px', borderRadius: '0.75rem',
                background: loading || !input.trim() ? 'rgba(255,255,255,0.06)' : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                color: loading || !input.trim() ? '#475569' : 'white', border: 'none',
                fontSize: '1.2rem', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s', boxShadow: loading || !input.trim() ? 'none' : '0 4px 12px rgba(99,102,241,0.4)'
              }}>
              {loading ? '⏳' : '🚀'}
            </button>
          </form>
          <p style={{ color: '#334155', fontSize: '0.68rem', margin: '0.4rem 0 0', textAlign: 'center' }}>
            ⌨️ Enter to send · Shift+Enter for new line · AI may give generic answers if not connected to backend
          </p>
        </div>
      </div>

      {/* ── SUGGESTED TOPICS ─────────────────────────────────────── */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1.25rem', padding: '1.25rem' }}>
        <h3 style={{ color: 'white', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.75rem' }}>📚 Topic Quick Access</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.6rem' }}>
          {[
            { topic: 'Placement Companies', queries: ['TCS NQT guide', 'Infosys prep', 'Amazon SDE prep'] },
            { topic: 'Academics', queries: ['Semester exam tips', 'Attendance calculator', 'CGPA improvement'] },
            { topic: 'Technical Skills', queries: ['DSA for placements', 'Python crash course', 'SQL interview Qs'] },
            { topic: 'Career Planning', queries: ['Best IT roles 2025', 'Service vs Product companies', 'Higher studies vs job'] }
          ].map(section => (
            <div key={section.topic} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '0.75rem', padding: '0.75rem' }}>
              <div style={{ color: '#a5b4fc', fontWeight: '700', fontSize: '0.78rem', marginBottom: '0.4rem' }}>{section.topic}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {section.queries.map(q => (
                  <button key={q} onClick={() => handleQuickPrompt(q)} disabled={loading}
                    style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.75rem', textAlign: 'left', cursor: loading ? 'not-allowed' : 'pointer', padding: '0.15rem 0', transition: 'color 0.2s' }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.color = '#c7d2fe' }}
                    onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
                  >
                    → {q}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
