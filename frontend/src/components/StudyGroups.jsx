import React, { useState, useEffect } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'

function StudyGroups() {
  const [groups, setGroups] = useState([])
  const [newGroup, setNewGroup] = useState({ name: '', description: '' })
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [message, setMessage] = useState('')
  const [newNote, setNewNote] = useState({ title: '', content: '' })
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchGroups()
  }, [])

  const fetchGroups = async () => {
    try {
      const response = await api.get('/groups')
      const grpList = response.data.groups || []
      setGroups(grpList)
      if (grpList.length > 0 && !selectedGroup) {
        setSelectedGroup(grpList[0])
      }
    } catch (error) {
      console.warn('Error loading study groups:', error.message)
    }
  }

  const createGroup = async () => {
    if (!newGroup.name.trim()) {
      toast.error('Please enter a group title!')
      return
    }

    setLoading(true)
    try {
      const response = await api.post('/groups', {
        name: newGroup.name.trim(),
        description: newGroup.description.trim()
      })
      setGroups(prev => [response.data, ...prev])
      setSelectedGroup(response.data)
      setNewGroup({ name: '', description: '' })
      toast.success('Study Group created successfully! 👥')
    } catch (error) {
      toast.error('Failed to create group.')
    }
    setLoading(false)
  }

  const sendMessage = async () => {
    if (!message.trim() || !selectedGroup) return

    const msgText = message.trim()
    setMessage('')
    try {
      const groupId = selectedGroup._id || selectedGroup.id
      const res = await api.post(`/groups/${groupId}/messages`, { message: msgText })
      
      const newMsgObj = res.data.message || {
        sender: 'me',
        senderName: 'You',
        message: msgText,
        timestamp: new Date()
      }

      setSelectedGroup(prev => ({
        ...prev,
        messages: [...(prev.messages || []), newMsgObj]
      }))
      setGroups(prev => prev.map(g => (g._id === groupId || g.id === groupId) ? {
        ...g,
        messages: [...(g.messages || []), newMsgObj]
      } : g))
    } catch (error) {
      toast.error('Failed to send message.')
    }
  }

  const addSharedNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast.error('Please fill in title and note content!')
      return
    }

    const noteObj = {
      title: newNote.title.trim(),
      content: newNote.content.trim(),
      createdBy: 'You',
      createdAt: new Date()
    }

    setSelectedGroup(prev => ({
      ...prev,
      notes: [...(prev.notes || []), noteObj]
    }))

    setNewNote({ title: '', content: '' })
    setShowNoteModal(false)
    toast.success('Study note shared with group! 📝')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #1e1b4b 50%, #0f172a 100%)',
        border: '1px solid rgba(16, 185, 129, 0.4)',
        boxShadow: '0 8px 32px rgba(16, 185, 129, 0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.8rem' }}>👥</span>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.75rem', color: '#fff', fontWeight: 800 }}>
                Collaborative Study Groups &amp; Peer Learning
              </h2>
              <p style={{ margin: '0.25rem 0 0', color: '#6ee7b7', fontSize: '0.95rem' }}>
                Join Placement Study Rooms • Shared Formula Repositories • Live Peer Discussions
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-safe">💬 Real-Time Chat</span>
            <span className="badge badge-info">📝 Shared Notes</span>
            <span className="badge badge-warning">🤝 Peer Support</span>
          </div>
        </div>
      </div>

      {/* Main Groups Workspace Grid */}
      <div className="grid grid-3" style={{ gap: '1.5rem', alignItems: 'start' }}>
        {/* Left Column: Group Rooms List & Create Group */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.15rem' }}>
              📚 Active Study Rooms
            </h3>
            <p style={{ margin: '0.2rem 0 0.75rem 0', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              Select a room to chat and access shared notes:
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {groups.map((grp) => {
              const grpId = grp._id || grp.id
              const isSelected = selectedGroup && (selectedGroup._id === grpId || selectedGroup.id === grpId)
              return (
                <button
                  key={grpId}
                  onClick={() => setSelectedGroup(grp)}
                  style={{
                    background: isSelected ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-secondary)',
                    border: isSelected ? '1px solid #10b981' : '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.85rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}
                >
                  <div style={{ color: isSelected ? '#34d399' : '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
                    {grp.name}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: '1.3' }}>
                    {grp.description || 'General placement and study discussion'}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>
                      👥 {grp.members?.length || 4} Members
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>
                      📝 {grp.notes?.length || 0} Notes
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Create New Group Card */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
              ➕ Create New Study Group
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Group Name (e.g. AWS & DevOps)"
                value={newGroup.name}
                onChange={(e) => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
                style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
              />
              <input
                type="text"
                className="form-input"
                placeholder="Short Description"
                value={newGroup.description}
                onChange={(e) => setNewGroup(prev => ({ ...prev, description: e.target.value }))}
                style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
              />
              <button
                onClick={createGroup}
                disabled={loading}
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  padding: '0.5rem',
                  fontSize: '0.85rem',
                  fontWeight: 'bold'
                }}
              >
                {loading ? 'Creating...' : 'Create Room 🚀'}
              </button>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Chat & Shared Notes */}
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {selectedGroup ? (
            <>
              {/* Group Title Bar */}
              <div className="card" style={{ padding: '1rem 1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem', fontWeight: 700 }}>
                      {selectedGroup.name}
                    </h3>
                    <p style={{ margin: '0.15rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      {selectedGroup.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowNoteModal(true)}
                    className="btn btn-outline"
                    style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', gap: '0.3rem' }}
                  >
                    📝 Share Study Note
                  </button>
                </div>
              </div>

              {/* Shared Notes Accordion / Showcase */}
              {selectedGroup.notes && selectedGroup.notes.length > 0 && (
                <div className="card" style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                  <h4 style={{ margin: '0 0 0.75rem 0', color: '#60a5fa', fontSize: '0.95rem' }}>
                    📌 Shared Formula &amp; Revision Notes
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {selectedGroup.notes.map((note, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: 'rgba(15, 23, 42, 0.7)',
                          padding: '0.75rem 1rem',
                          borderRadius: '6px',
                          border: '1px solid var(--border-color)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                          <span style={{ fontWeight: 600, color: '#f3f4f6', fontSize: '0.85rem' }}>📄 {note.title}</span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>By {note.createdBy || 'Peer'}</span>
                        </div>
                        <p style={{ margin: 0, color: '#d1d5db', fontSize: '0.8rem', whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>
                          {note.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Live Chat Box */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '420px', padding: '1rem' }}>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingRight: '0.5rem', marginBottom: '1rem' }}>
                  {selectedGroup.messages && selectedGroup.messages.length > 0 ? (
                    selectedGroup.messages.map((msg, i) => {
                      const isMe = msg.sender === 'me'
                      return (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: isMe ? 'flex-end' : 'flex-start',
                            maxWidth: '85%',
                            alignSelf: isMe ? 'flex-end' : 'flex-start'
                          }}
                        >
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.15rem', paddingLeft: isMe ? '0' : '0.25rem', paddingRight: isMe ? '0.25rem' : '0' }}>
                            {msg.senderName || (isMe ? 'You' : 'Peer')}
                          </span>
                          <div
                            style={{
                              background: isMe ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'var(--bg-secondary)',
                              border: isMe ? 'none' : '1px solid var(--border-color)',
                              color: '#fff',
                              padding: '0.65rem 0.95rem',
                              borderRadius: isMe ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                              fontSize: '0.88rem',
                              lineHeight: '1.4'
                            }}
                          >
                            {msg.message}
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', margin: 'auto' }}>
                      No messages yet. Send the first message to kick off the discussion!
                    </div>
                  )}
                </div>

                {/* Message Input Box */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Type your question, code doubt, or placement tip..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    style={{ flex: 1 }}
                  />
                  <button
                    onClick={sendMessage}
                    className="btn btn-primary"
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      padding: '0.6rem 1.25rem',
                      fontWeight: 700
                    }}
                  >
                    Send 📤
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              Select or create a study group room from the left to start collaborating!
            </div>
          )}
        </div>
      </div>

      {/* Share Note Modal */}
      {showNoteModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
          padding: '1rem'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: '#fff' }}>📝 Share Study Note</h3>
              <button
                onClick={() => setShowNoteModal(false)}
                style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Note Title (e.g. Dynamic Programming Memoization)"
                value={newNote.title}
                onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
              />
              <textarea
                className="form-input"
                rows={5}
                placeholder="Enter formula, key concept, or code summary to share..."
                value={newNote.content}
                onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
              />
              <button
                onClick={addSharedNote}
                className="btn btn-primary"
                style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', padding: '0.75rem', fontWeight: 700 }}
              >
                Publish Note to Group 📌
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudyGroups
