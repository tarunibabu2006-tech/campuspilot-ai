import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

const SAMPLE_BROADCASTS = [
  {
    id: 1,
    sender: 'Placement Cell (Admin)',
    tag: '📢 Campus Placement Alert',
    title: 'Zoho & TCS On-Campus Drive Registration Deadline',
    message: 'All final year and pre-final year students must complete their profile verification and apply through CampusPilot AI before Friday 5:00 PM.',
    timestamp: 'Today, 10:30 AM',
    color: '#3b82f6'
  },
  {
    id: 2,
    sender: 'Career Mentorship Cell',
    tag: '🎓 Live AMA Session',
    title: 'Crack Google SDE-1 with Siddharth V (Google India)',
    message: 'Join us this Saturday at 6:00 PM for an interactive live session on System Design & DSA roadmaps.',
    timestamp: 'Yesterday, 4:15 PM',
    color: '#8b5cf6'
  },
  {
    id: 3,
    sender: 'Coding Club & Hackathon Committee',
    tag: '⚡ 24hr National Hackathon',
    title: 'CampusPilot AI National Hackathon 2026 Announced',
    message: 'Prizes worth ₹2,00,000 + Direct interview fast-tracks with partner product companies.',
    timestamp: '2 days ago',
    color: '#10b981'
  }
]

export default function AllUsersMessage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState(SAMPLE_BROADCASTS)
  const [newMsg, setNewMsg] = useState('')
  const [msgTitle, setMsgTitle] = useState('')

  const handlePostAnnouncement = (e) => {
    e.preventDefault()
    if (!msgTitle.trim() || !newMsg.trim()) return

    const item = {
      id: Date.now(),
      sender: user?.name ? `${user.name} (${user.role || 'Student'})` : 'Student Leader',
      tag: '💬 Peer Discussion',
      title: msgTitle,
      message: newMsg,
      timestamp: 'Just now',
      color: '#ec4899'
    }

    setMessages([item, ...messages])
    setMsgTitle('')
    setNewMsg('')
    toast.success('📢 Message posted to all students community!')
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #0f172a 100%)',
          borderRadius: '1.5rem',
          padding: '2rem',
          border: '1px solid rgba(139,92,246,0.35)',
          boxShadow: '0 8px 32px rgba(124,58,237,0.25)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '2.5rem' }}>📢</span>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
              Campus-Wide Broadcasts & Student Notices
            </h1>
            <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
              Official Placement Alerts, Mentorship AMAs, Hackathons & Peer Community Announcements
            </p>
          </div>
        </div>
      </motion.div>

      {/* Post Notice Form */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
        <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1rem' }}>
          ✏️ Post a Community Announcement
        </h3>
        <form onSubmit={handlePostAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input
            type="text"
            required
            placeholder="Announcement Title (e.g. Hackathon Team Formation, Study Group Alert)..."
            value={msgTitle}
            onChange={e => setMsgTitle(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '0.65rem',
              padding: '0.75rem 1rem',
              color: 'white',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
          <textarea
            rows={3}
            required
            placeholder="Write your message to all registered students..."
            value={newMsg}
            onChange={e => setNewMsg(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '0.65rem',
              padding: '0.75rem 1rem',
              color: 'white',
              fontSize: '0.9rem',
              outline: 'none',
              resize: 'vertical'
            }}
          />
          <button
            type="submit"
            style={{
              alignSelf: 'flex-start',
              padding: '0.65rem 1.5rem',
              borderRadius: '0.65rem',
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              color: 'white',
              fontWeight: '800',
              fontSize: '0.85rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Broadcast Message 🚀
          </button>
        </form>
      </div>

      {/* Broadcast Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map(msg => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1.25rem',
              padding: '1.5rem',
              borderLeft: `4px solid ${msg.color}`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ color: msg.color, fontWeight: '800', fontSize: '0.78rem' }}>
                {msg.tag}
              </span>
              <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                {msg.timestamp}
              </span>
            </div>
            <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.15rem', margin: '0 0 0.4rem' }}>
              {msg.title}
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: '0 0 0.75rem', lineHeight: 1.5 }}>
              {msg.message}
            </p>
            <div style={{ color: '#818cf8', fontSize: '0.75rem', fontWeight: '700' }}>
              Posted by: {msg.sender}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
