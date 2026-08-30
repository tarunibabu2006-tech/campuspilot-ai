import React from 'react'
import { motion } from 'framer-motion'

export default function RecentActivity({ activities = [], user = {} }) {
  const defaultActivities = [
    { action: 'Daily Login Streak Verified', date: new Date(), icon: '🔥', xp: '+10 XP' },
    { action: 'Accessed Notes Hub Curriculum', date: new Date(Date.now() - 3600000), icon: '📝', xp: '+15 XP' },
    { action: 'Skills Progress Tracked', date: new Date(Date.now() - 86400000), icon: '📚', xp: '+20 XP' },
    { action: 'Student Profile Initialized', date: user?.createdAt || new Date(Date.now() - 172800000), icon: '👤', xp: '0 XP' }
  ]

  const displayList = activities && activities.length > 0 ? activities : defaultActivities

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '1.25rem',
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}
    >
      <h3 style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.05rem', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>⚡</span> Recent Activity &amp; Live Engagement Feed
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {displayList.map((item, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '0.75rem',
              padding: '0.75rem 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.2rem' }}>{item.icon || '📌'}</span>
              <div>
                <div style={{ color: '#e2e8f0', fontWeight: '700', fontSize: '0.86rem' }}>
                  {item.action || item.title || 'Student Activity'}
                </div>
                <div style={{ color: '#64748b', fontSize: '0.72rem' }}>
                  {new Date(item.date || item.timestamp || Date.now()).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
            {item.xp && (
              <span style={{
                background: 'rgba(96, 165, 250, 0.15)',
                color: '#60a5fa',
                border: '1px solid rgba(96, 165, 250, 0.3)',
                padding: '0.2rem 0.6rem',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                fontWeight: '800'
              }}>
                {item.xp}
              </span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
