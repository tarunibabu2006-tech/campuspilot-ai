import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import NotificationCard from './NotificationCard'
import toast from 'react-hot-toast'

export default function NotificationBell({ onNavigateToExams }) {
  const [open, setOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    fetchUnread()
    const interval = setInterval(fetchUnread, 30000) // Poll every 30s
    return () => clearInterval(interval)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const fetchUnread = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const res = await axios.get('/api/notifications/unread', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUnreadCount(res.data.unreadCount || 0)
      if (res.data.recent) {
        setNotifications(res.data.recent)
      }
    } catch (err) {
      // Ignore background network error
    }
  }

  const handleOpenDropdown = async () => {
    setOpen(!open)
    if (!open) {
      const token = localStorage.getItem('token')
      if (!token) return

      try {
        setLoading(true)
        const res = await axios.get('/api/notifications?limit=10', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setNotifications(res.data.notifications || [])
        setUnreadCount(res.data.unread || 0)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleMarkRead = async (id) => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      await axios.put(`/api/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n))
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (err) {
      console.error(err)
    }
  }

  const handleMarkAllRead = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      await axios.put('/api/notifications/mark-all-read', {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      setUnreadCount(0)
      toast.success('All marked as read')
    } catch (err) {
      toast.error('Failed to mark read')
    }
  }

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Bell Icon Trigger */}
      <button
        onClick={handleOpenDropdown}
        title="Exam & Platform Notifications"
        style={{
          background: 'rgba(30, 41, 59, 0.7)',
          border: '1px solid rgba(71, 85, 105, 0.5)',
          borderRadius: '10px',
          width: '38px',
          height: '38px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          color: '#cbd5e1',
          fontSize: '18px',
          transition: 'all 0.2s'
        }}
      >
        <span>🔔</span>
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: '#ffffff',
            borderRadius: '10px',
            padding: '2px 6px',
            fontSize: '10px',
            fontWeight: '800',
            minWidth: '16px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(239, 68, 68, 0.6)',
            animation: 'pulse 2s infinite'
          }}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Popup */}
      {open && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: '48px',
          width: '360px',
          background: '#0f172a',
          border: '1px solid #334155',
          borderRadius: '16px',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.7)',
          zIndex: 99999,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{
            padding: '14px 16px',
            background: 'rgba(30, 41, 59, 0.8)',
            borderBottom: '1px solid #334155',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '15px', fontWeight: '700', color: '#ffffff' }}>Exam & Career Alerts</span>
              {unreadCount > 0 && (
                <span style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '2px 6px', borderRadius: '8px', fontSize: '11px', fontWeight: '700' }}>
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#38bdf8',
                  fontSize: '11px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List Content */}
          <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
            {loading ? (
              <div style={{ padding: '30px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                Loading updates...
              </div>
            ) : notifications.length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: '#64748b' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>🔕</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#94a3b8' }}>No notifications right now</div>
                <div style={{ fontSize: '11px', marginTop: '4px' }}>You will receive personalized exam alerts based on your profile.</div>
              </div>
            ) : (
              notifications.map(n => (
                <NotificationCard
                  key={n._id}
                  notification={n}
                  onMarkRead={handleMarkRead}
                  onClick={() => {
                    setOpen(false)
                    if (onNavigateToExams) onNavigateToExams()
                  }}
                />
              ))
            )}
          </div>

          {/* Footer View All Link */}
          <div style={{
            padding: '10px 16px',
            background: '#0b1120',
            borderTop: '1px solid #334155',
            textAlign: 'center'
          }}>
            <button
              onClick={() => {
                setOpen(false)
                if (onNavigateToExams) onNavigateToExams()
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#38bdf8',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Open Complete Exam Hub 📢 →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
