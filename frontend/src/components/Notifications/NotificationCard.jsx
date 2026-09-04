import React from 'react'

export default function NotificationCard({ notification, onMarkRead, onClick }) {
  const { title, message, type, read, createdAt, applyLink, officialWebsite, _id } = notification

  const getTypeIcon = (nType) => {
    switch (nType) {
      case 'applicationStart': return '📢'
      case 'applicationEnd': return '⏳'
      case 'admitCard': return '🎫'
      case 'examDate': return '📅'
      case 'result': return '📊'
      case 'job': return '💼'
      case 'interview': return '🎤'
      default: return '🔔'
    }
  }

  const timeAgo = (date) => {
    if (!date) return ''
    const seconds = Math.floor((new Date() - new Date(date)) / 1000)
    if (seconds < 60) return 'Just now'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <div
      onClick={() => onClick && onClick(notification)}
      style={{
        padding: '12px 14px',
        borderBottom: '1px solid rgba(51, 65, 85, 0.4)',
        background: read ? 'transparent' : 'rgba(37, 99, 235, 0.08)',
        cursor: 'pointer',
        transition: 'background 0.2s',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(51, 65, 85, 0.3)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = read ? 'transparent' : 'rgba(37, 99, 235, 0.08)')}
    >
      <div style={{
        fontSize: '20px',
        lineHeight: 1,
        background: 'rgba(30, 41, 59, 0.6)',
        borderRadius: '8px',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {getTypeIcon(type)}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
          <div style={{
            fontSize: '13px',
            fontWeight: read ? '600' : '700',
            color: read ? '#cbd5e1' : '#ffffff',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '240px'
          }}>
            {title}
          </div>
          <span style={{ fontSize: '10px', color: '#64748b', marginLeft: '6px' }}>
            {timeAgo(createdAt)}
          </span>
        </div>

        <p style={{
          fontSize: '12px',
          color: '#94a3b8',
          margin: '0 0 6px 0',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {message}
        </p>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {(applyLink || officialWebsite) && (
            <a
              href={applyLink || officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                fontSize: '11px',
                color: '#38bdf8',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              Apply ↗
            </a>
          )}

          {!read && onMarkRead && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onMarkRead(_id)
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                fontSize: '11px',
                cursor: 'pointer',
                padding: 0
              }}
            >
              Mark read
            </button>
          )}
        </div>
      </div>

      {!read && (
        <span style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: '#38bdf8',
          marginTop: '6px'
        }} />
      )}
    </div>
  )
}
