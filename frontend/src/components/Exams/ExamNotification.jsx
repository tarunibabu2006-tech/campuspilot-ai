import React from 'react'
import { motion } from 'framer-motion'

export default function ExamNotification({ notification, onActionClick, onMarkRead }) {
  const { title, message, priority, type, category, applyLink, officialWebsite, createdAt, read, _id, examId } = notification

  const getTypeBadge = (nType) => {
    switch (nType) {
      case 'applicationStart':
        return { icon: '📢', label: 'Applications Open', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' }
      case 'applicationEnd':
        return { icon: '⏳', label: 'Closing Soon', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' }
      case 'admitCard':
        return { icon: '🎫', label: 'Admit Card', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.15)' }
      case 'examDate':
        return { icon: '📅', label: 'Exam Countdown', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' }
      case 'result':
        return { icon: '📊', label: 'Result Declared', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' }
      default:
        return { icon: '🔔', label: 'Exam Alert', color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.15)' }
    }
  }

  const badge = getTypeBadge(type)

  const timeAgo = (date) => {
    if (!date) return 'Just now'
    const seconds = Math.floor((new Date() - new Date(date)) / 1000)
    if (seconds < 60) return 'Just now'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: read ? 'rgba(15, 23, 42, 0.6)' : 'rgba(30, 41, 59, 0.8)',
        borderLeft: `4px solid ${priority === 'high' ? '#ef4444' : badge.color}`,
        borderTop: '1px solid rgba(51, 65, 85, 0.5)',
        borderRight: '1px solid rgba(51, 65, 85, 0.5)',
        borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        transition: 'all 0.2s',
        position: 'relative'
      }}
    >
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            background: badge.bg,
            color: badge.color,
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '700',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>{badge.icon}</span> {badge.label}
          </span>

          {category && (
            <span style={{
              background: 'rgba(51, 65, 85, 0.5)',
              color: '#94a3b8',
              padding: '3px 8px',
              borderRadius: '6px',
              fontSize: '11px'
            }}>
              {category}
            </span>
          )}

          {!read && (
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#38bdf8',
              display: 'inline-block'
            }} />
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '11px', color: '#64748b' }}>{timeAgo(createdAt)}</span>
          {!read && onMarkRead && (
            <button
              onClick={() => onMarkRead(_id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                fontSize: '11px',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Mark Read
            </button>
          )}
        </div>
      </div>

      {/* Main Title & Message */}
      <div>
        <h4 style={{
          fontSize: '15px',
          fontWeight: '700',
          color: '#ffffff',
          margin: '0 0 4px 0'
        }}>
          {title}
        </h4>
        <p style={{
          fontSize: '13px',
          color: '#94a3b8',
          margin: 0,
          lineHeight: '1.5'
        }}>
          {message}
        </p>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
        {(applyLink || officialWebsite) && (
          <a
            href={applyLink || officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'rgba(37, 99, 235, 0.2)',
              color: '#60a5fa',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Apply Now Official ↗
          </a>
        )}

        {examId && (
          <button
            onClick={() => onActionClick && onActionClick(examId)}
            style={{
              background: 'rgba(51, 65, 85, 0.4)',
              color: '#cbd5e1',
              border: '1px solid rgba(71, 85, 105, 0.4)',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            View Exam Details
          </button>
        )}
      </div>
    </motion.div>
  )
}
