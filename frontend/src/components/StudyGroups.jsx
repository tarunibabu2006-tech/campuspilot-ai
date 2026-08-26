import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const INITIAL_GROUPS = [
  {
    id: 'g1',
    name: '🚀 Full Stack & DSA Masters',
    description: 'Cracking TCS Digital, Zoho & Amazon SDE interviews through daily DSA & System Design practice.',
    privacy: 'Public',
    admin: 'Arjun K (CSE Final Yr)',
    createdDate: 'Aug 2026',
    membersCount: 4,
    activeToday: 4,
    streak: 12,
    topics: ['DSA', 'React', 'Node.js', 'System Design'],
    goal: 'Complete 5 DSA problems & 1 Mock Interview this week',
    goalProgress: 65,
    schedule: [
      { time: '7:00 PM', topic: 'Data Structures & Algorithms' },
      { time: '8:00 PM', topic: 'SQL & Database Queries' },
      { time: '9:00 PM', topic: 'Peer Mock Interview Room' }
    ],
    members: [
      { name: 'Arjun K', role: 'Admin', xp: 450, rank: 1, avatar: 'A' },
      { name: 'Tarun B', role: 'Member', xp: 390, rank: 2, avatar: 'T' },
      { name: 'Priya R', role: 'Member', xp: 320, rank: 3, avatar: 'P' },
      { name: 'Sneha I', role: 'Member', xp: 280, rank: 4, avatar: 'S' }
    ],
    messages: [
      { sender: 'Arjun K', time: '6:45 PM', text: 'Hey team! Let\'s focus on Binary Trees and SQL JOINs today.' },
      { sender: 'Priya R', time: '6:50 PM', text: 'Great! I uploaded the TCS 2025 past paper PDF in Shared Resources.' }
    ],
    sharedNotes: [
      { id: 'n1', title: 'Binary Tree Traversal Cheat Sheet', author: 'Arjun K', content: 'Inorder: Left -> Root -> Right\nPreorder: Root -> Left -> Right\nPostorder: Left -> Right -> Root', date: 'Yesterday' }
    ],
    sharedResources: [
      { title: 'TCS Digital 2025 Coding Questions PDF', type: 'PDF', link: '#' },
      { title: 'System Design Interview Crash Course', type: 'YouTube', link: '#' }
    ],
    doubts: [
      { id: 'd1', asker: 'Sneha I', question: 'What is the difference between INNER JOIN and LEFT JOIN in SQL with NULL values?', answers: [{ text: 'INNER JOIN returns only matching rows. LEFT JOIN returns all rows from left table and NULL for non-matching right table rows.', author: 'Arjun K', accepted: true }] }
    ]
  }
]

export default function StudyGroups() {
  const [groups, setGroups] = useState(INITIAL_GROUPS)
  const [selectedGroup, setSelectedGroup] = useState(INITIAL_GROUPS[0])
  const [activeTab, setActiveTab] = useState('chat') // 'chat', 'notes', 'resources', 'doubts', 'mock', 'leaderboard'

  const [messageText, setMessageText] = useState('')
  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [newNoteContent, setNewNoteContent] = useState('')
  const [newDoubt, setNewDoubt] = useState('')

  const [aiAssistantQuery, setAiAssistantQuery] = useState('')
  const [aiAssistantResponse, setAiAssistantResponse] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)

  const [mockRoomActive, setMockRoomActive] = useState(false)

  const sendMessage = (e) => {
    e.preventDefault()
    if (!messageText.trim()) return
    const msg = { sender: 'You', time: 'Just now', text: messageText.trim() }
    const updated = { ...selectedGroup, messages: [...selectedGroup.messages, msg] }
    setSelectedGroup(updated)
    setGroups(groups.map(g => g.id === updated.id ? updated : g))
    setMessageText('')
  }

  const addNote = (e) => {
    e.preventDefault()
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return
    const note = { id: `n_${Date.now()}`, title: newNoteTitle, author: 'You', content: newNoteContent, date: 'Today' }
    const updated = { ...selectedGroup, sharedNotes: [...selectedGroup.sharedNotes, note] }
    setSelectedGroup(updated)
    setGroups(groups.map(g => g.id === updated.id ? updated : g))
    setNewNoteTitle('')
    setNewNoteContent('')
    toast.success('📝 Shared Note added!')
  }

  const askDoubt = (e) => {
    e.preventDefault()
    if (!newDoubt.trim()) return
    const doubtObj = { id: `d_${Date.now()}`, asker: 'You', question: newDoubt.trim(), answers: [] }
    const updated = { ...selectedGroup, doubts: [...selectedGroup.doubts, doubtObj] }
    setSelectedGroup(updated)
    setGroups(groups.map(g => g.id === updated.id ? updated : g))
    setNewDoubt('')
    toast.success('❓ Doubt posted to study group!')
  }

  const askAiAssistant = () => {
    if (!aiAssistantQuery.trim()) return
    setAiLoading(true)
    setAiAssistantResponse(null)

    setTimeout(() => {
      setAiAssistantResponse({
        answer: `🤖 AI Study Group Assistant Answer for: "${aiAssistantQuery}"\n\n- Key Concept: Focus on breaking down the problem into smaller sub-problems.\n- Recommended Practice: Solve 2 LeetCode Medium questions on this topic.\n- Quiz Generator: 1. What is the time complexity of building a heap? (Answer: O(N)).`,
        suggestedNotes: 'Summarized into shared notes automatically.'
      })
      setAiLoading(false)
      toast.success('🤖 AI Assistant generated response!')
    }, 1000)
  }

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header Banner */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #064e3b, #047857, #1e293b)', borderRadius: '1.5rem', padding: '2rem', marginBottom: '1.5rem', border: '1px solid rgba(52,211,153,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
      >
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            👥 Peer Study Groups & Collaborations
          </h1>
          <p style={{ color: '#a7f3d0' }}>
            Real-time chat, shared notes, doubt solving, group streak, peer mock interviews & AI Study Assistant.
          </p>
        </div>
        {selectedGroup && (
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '0.75rem 1.25rem', textAlign: 'center', border: '1px solid rgba(52,211,153,0.3)' }}>
            <div style={{ color: '#fbbf24', fontWeight: '900', fontSize: '1.2rem' }}>🔥 {selectedGroup.streak} Day Group Streak</div>
            <div style={{ color: '#a7f3d0', fontSize: '0.78rem' }}>{selectedGroup.activeToday}/{selectedGroup.membersCount} members active today</div>
          </div>
        )}
      </motion.div>

      {/* Main Group Layout */}
      {selectedGroup && (
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.25rem', alignItems: 'start' }}>
          {/* Left Sidebar: Group Info & Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Group Profile Card */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem' }}>{selectedGroup.name}</h3>
                <span style={{ background: 'rgba(52,211,153,0.2)', color: '#34d399', padding: '0.15rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.7rem', fontWeight: '700' }}>{selectedGroup.privacy}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.75rem' }}>{selectedGroup.description}</p>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.75rem' }}>Admin: {selectedGroup.admin}</div>

              {/* Goal Progress */}
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ color: '#fbbf24', fontWeight: '700', fontSize: '0.78rem', marginBottom: '0.3rem' }}>🎯 Group Goal:</div>
                <div style={{ color: 'white', fontSize: '0.8rem', marginBottom: '0.4rem' }}>{selectedGroup.goal}</div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${selectedGroup.goalProgress}%`, background: '#fbbf24', borderRadius: '3px' }} />
                </div>
              </div>

              {/* Today's Schedule */}
              <div style={{ color: '#60a5fa', fontWeight: '700', fontSize: '0.78rem', marginBottom: '0.4rem' }}>📅 Today's Study Plan</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {selectedGroup.schedule.map(s => (
                  <div key={s.time} style={{ fontSize: '0.75rem', color: '#94a3b8', background: 'rgba(255,255,255,0.03)', padding: '0.3rem 0.5rem', borderRadius: '0.4rem' }}>
                    <strong style={{ color: 'white' }}>{s.time}</strong> — {s.topic}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {[
                { id: 'chat', label: '💬 Real-time Chat' },
                { id: 'notes', label: '📝 Shared Notes' },
                { id: 'resources', label: '📚 Shared Resources' },
                { id: 'doubts', label: '❓ Doubt Solving' },
                { id: 'mock', label: '🎤 Peer Mock Interview' },
                { id: 'leaderboard', label: '🏆 Group Leaderboard' },
                { id: 'ai', label: '🤖 AI Study Assistant' }
              ].map(t => (
                <button
                  key={t.id} onClick={() => setActiveTab(t.id)}
                  style={{
                    padding: '0.7rem 1rem', borderRadius: '0.75rem', textAlign: 'left', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s',
                    background: activeTab === t.id ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255,255,255,0.03)',
                    color: activeTab === t.id ? 'white' : '#94a3b8',
                    border: activeTab === t.id ? 'none' : '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Main Content Area */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem', minHeight: '550px' }}>
            {/* REAL TIME CHAT TAB */}
            {activeTab === 'chat' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '500px' }}>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1rem' }}>💬 Group Chat Room</h3>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingRight: '0.5rem', marginBottom: '1rem' }}>
                  {selectedGroup.messages.map((m, idx) => (
                    <div key={idx} style={{ alignSelf: m.sender === 'You' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '0.15rem' }}>{m.sender} · {m.time}</div>
                      <div style={{
                        padding: '0.75rem 1rem', borderRadius: '1rem', fontSize: '0.88rem', color: 'white',
                        background: m.sender === 'You' ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255,255,255,0.06)',
                        border: m.sender === 'You' ? 'none' : '1px solid rgba(255,255,255,0.1)'
                      }}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={sendMessage} style={{ display: 'flex', gap: '0.75rem' }}>
                  <input
                    type="text" placeholder="Type message, share code or ask doubts..." value={messageText} onChange={e => setMessageText(e.target.value)}
                    style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
                  />
                  <button type="submit" style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', fontWeight: '700', border: 'none', cursor: 'pointer' }}>Send 🚀</button>
                </form>
              </div>
            )}

            {/* SHARED NOTES TAB */}
            {activeTab === 'notes' && (
              <div>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1rem' }}>📝 Collaborative Shared Notes</h3>

                {/* New Note Form */}
                <form onSubmit={addNote} style={{ background: 'rgba(255,255,255,0.04)', padding: '1rem', borderRadius: '0.9rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <input
                    type="text" placeholder="Note Title (e.g. SQL Window Functions)..." value={newNoteTitle} onChange={e => setNewNoteTitle(e.target.value)}
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
                  />
                  <textarea
                    rows={3} placeholder="Note Content (Markdown supported)..." value={newNoteContent} onChange={e => setNewNoteContent(e.target.value)}
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                  />
                  <button type="submit" style={{ alignSelf: 'flex-end', padding: '0.5rem 1.25rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', fontWeight: '700', border: 'none', cursor: 'pointer' }}>+ Save Note</button>
                </form>

                {/* Notes List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {selectedGroup.sharedNotes.map(n => (
                    <div key={n.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.9rem', padding: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                        <h4 style={{ color: '#34d399', fontWeight: '700', margin: 0 }}>{n.title}</h4>
                        <span style={{ color: '#64748b', fontSize: '0.75rem' }}>by {n.author} · {n.date}</span>
                      </div>
                      <pre style={{ color: '#cbd5e1', fontSize: '0.85rem', whiteSpace: 'pre-wrap', fontFamily: 'monospace', margin: 0, background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '0.6rem' }}>{n.content}</pre>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SHARED RESOURCES TAB */}
            {activeTab === 'resources' && (
              <div>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1rem' }}>📚 Group Shared Resources</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
                  {selectedGroup.sharedResources.map((res, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.9rem', padding: '1rem' }}>
                      <span style={{ background: 'rgba(52,211,153,0.2)', color: '#34d399', padding: '0.15rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.7rem', fontWeight: '700' }}>{res.type}</span>
                      <h4 style={{ color: 'white', fontWeight: '700', fontSize: '0.95rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>{res.title}</h4>
                      <a href={res.link} style={{ color: '#60a5fa', fontSize: '0.8rem', textDecoration: 'none', fontWeight: '600' }}>Open Resource →</a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DOUBT SOLVING TAB */}
            {activeTab === 'doubts' && (
              <div>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1rem' }}>❓ Peer Doubt Solving</h3>
                <form onSubmit={askDoubt} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <input
                    type="text" placeholder="Ask your doubt to group (e.g. Explain SQL JOINs)..." value={newDoubt} onChange={e => setNewDoubt(e.target.value)}
                    style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
                  />
                  <button type="submit" style={{ padding: '0.75rem 1.25rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', fontWeight: '700', border: 'none', cursor: 'pointer' }}>Ask Question</button>
                </form>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {selectedGroup.doubts.map(d => (
                    <div key={d.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>
                      <div style={{ color: '#fbbf24', fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.5rem' }}>❓ {d.question}</div>
                      <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.75rem' }}>Asked by {d.asker}</div>
                      {d.answers.map((ans, idx) => (
                        <div key={idx} style={{ background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                            <span style={{ color: '#4ade80', fontWeight: '700', fontSize: '0.8rem' }}>✅ Accepted Answer (+25 XP awarded)</span>
                            <span style={{ color: '#64748b', fontSize: '0.72rem' }}>by {ans.author}</span>
                          </div>
                          <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: 0 }}>{ans.text}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PEER MOCK INTERVIEW ROOM */}
            {activeTab === 'mock' && (
              <div>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🎤 Peer Mock Interview Room</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Conduct 1-on-1 mock interview sessions with group members with timer & questions feedback.</p>

                <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(5,150,105,0.06))', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '1.25rem', padding: '2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎙️</div>
                  <h4 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                    {mockRoomActive ? '🔴 Live Session in Progress: Technical Interview Round' : 'Ready to start Peer Interview'}
                  </h4>
                  <p style={{ color: '#a7f3d0', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                    Interviewer: Arjun K · Candidate: You · Topic: Data Structures & System Design
                  </p>
                  <button
                    onClick={() => { setMockRoomActive(!mockRoomActive); toast.success(mockRoomActive ? 'Session ended.' : '🎙️ Peer Mock Interview Room active!'); }}
                    style={{ padding: '0.75rem 2rem', borderRadius: '0.75rem', background: mockRoomActive ? '#ef4444' : 'linear-gradient(135deg, #10b981, #059669)', color: 'white', fontWeight: '800', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}
                  >
                    {mockRoomActive ? 'End Interview Session' : '🚀 Launch Mock Interview Room'}
                  </button>
                </div>
              </div>
            )}

            {/* GROUP LEADERBOARD */}
            {activeTab === 'leaderboard' && (
              <div>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1rem' }}>🏆 Group XP Leaderboard</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {selectedGroup.members.map(m => (
                    <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.9rem', padding: '0.9rem 1.25rem' }}>
                      <span style={{ color: m.rank === 1 ? '#fbbf24' : '#94a3b8', fontWeight: '800', fontSize: '1rem' }}>#{m.rank}</span>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: '800', color: 'white' }}>{m.avatar}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: 'white', fontWeight: '700', fontSize: '0.95rem' }}>{m.name} {m.role === 'Admin' && <span style={{ color: '#fbbf24', fontSize: '0.72rem' }}>👑 Admin</span>}</div>
                      </div>
                      <span style={{ color: '#fbbf24', fontWeight: '900', fontSize: '1rem' }}>{m.xp} XP</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI STUDY ASSISTANT */}
            {activeTab === 'ai' && (
              <div>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🤖 AI Study Group Assistant</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.25rem' }}>Ask AI to solve group doubts, generate custom study quizzes & summarize notes.</p>

                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <input
                    type="text" placeholder="Ask AI (e.g. Generate 3 SQL quiz questions for group)..." value={aiAssistantQuery} onChange={e => setAiAssistantQuery(e.target.value)}
                    style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
                  />
                  <button onClick={askAiAssistant} disabled={aiLoading} style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', fontWeight: '700', border: 'none', cursor: 'pointer' }}>
                    {aiLoading ? '🤖 Generating...' : 'Ask AI'}
                  </button>
                </div>

                {aiAssistantResponse && (
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '1rem', padding: '1.25rem' }}>
                    <pre style={{ color: '#cbd5e1', fontSize: '0.88rem', whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>{aiAssistantResponse.answer}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
