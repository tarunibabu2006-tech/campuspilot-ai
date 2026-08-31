import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../../context/AuthContext'
import { useLanguage } from '../../../context/LanguageContext'
import StatsCards from './StatsCards'
import RecentActivity from './RecentActivity'
import QuickActions from './QuickActions'
import FeaturedSection from './FeaturedSection'

// New hooks for student data
import { useDashboardStats, useRecentActivity } from '../../../hooks/useStudentData'

export default function StudentDashboard({ onNavigate }) {
  const { user } = useAuth()
  const { t, language } = useLanguage()

  // Fetch stats and recent activity using custom hooks
  const { data: statsData, loading: statsLoading } = useDashboardStats()
  const { data: activityData, loading: activityLoading } = useRecentActivity()

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const h = currentTime.getHours()
    if (h < 12) return t('goodMorning') || 'Good Morning'
    if (h < 17) return t('goodAfternoon') || 'Good Afternoon'
    if (h < 21) return t('goodEvening') || 'Good Evening'
    return t('goodNight') || 'Good Night'
  }

  const localeMap = { en: 'en-IN', ta: 'ta-IN', hi: 'hi-IN', zh: 'zh-CN' }
  const formattedDate = currentTime.toLocaleDateString(localeMap[language] || 'en-IN', {
    weekday: 'long', day: 'numeric', month: 'short'
  })

  const userName = user?.name ? user.name.split(' ')[0] : 'Student'

  // Use fetched data or fallback defaults
  const stats = {
    skillsLearned: statsData?.skillsLearned ?? 0,
    jobsApplied: statsData?.jobsApplied ?? 0,
    interviews: statsData?.mockInterviews ?? 0,
    xp: statsData?.xpPoints ?? (user?.xp || 0)
  }

  const recentActivities = activityData ?? []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* ── HERO WELCOME BANNER ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #0f172a 100%)',
          borderRadius: '1.5rem',
          padding: '2rem',
          border: '1px solid rgba(139,92,246,0.35)',
          boxShadow: '0 8px 32px rgba(124,58,237,0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
          {/* Left Side: Greeting, Subtitle and Action Buttons */}
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '2.2rem' }}>🎓</span>
              <div>
                <p style={{ color: '#a5b4fc', margin: 0, fontSize: '0.85rem', fontWeight: '600' }}>
                  {getGreeting()}, {formattedDate}
                </p>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '900', margin: 0, color: '#fff' }}>
                  {t('welcomeBack', { name: userName })}
                </h2>
              </div>
            </div>
            <p style={{ color: '#a5b4fc', fontSize: '0.9rem', margin: '0 0 1.25rem', maxWidth: '520px' }}>
              {t('heroTagline')}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate('notes')}
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                  color: 'white',
                  border: 'none',
                  padding: '0.65rem 1.3rem',
                  borderRadius: '0.75rem',
                  fontWeight: '800',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(124,58,237,0.4)'
                }}
              >
                Open Notes Hub
              </button>
              <button
                onClick={() => onNavigate('jobs')}
                style={{
                  background: 'rgba(34,197,94,0.15)',
                  color: '#4ade80',
                  border: '1px solid rgba(34,197,94,0.4)',
                  padding: '0.65rem 1.3rem',
                  borderRadius: '0.75rem',
                  fontWeight: '800',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Browse Jobs
              </button>
              <button
                onClick={() => onNavigate('chat')}
                style={{
                  background: 'rgba(99,102,241,0.15)',
                  color: '#a5b4fc',
                  border: '1px solid rgba(99,102,241,0.4)',
                  padding: '0.65rem 1.3rem',
                  borderRadius: '0.75rem',
                  fontWeight: '800',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Ask AI
              </button>
            </div>
          </div>

          {/* Right Side: 4 Stats Cards Circled by User */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', minWidth: '200px' }}>
            {[
              { icon: '📚', label: 'Skills Available', value: '50+', color: '#4ade80' },
              { icon: '💼', label: 'Job Openings', value: '30+', color: '#fbbf24' },
              { icon: '📄', label: 'Study Notes', value: '100,000+', color: '#a78bfa' },
              { icon: '🎯', label: 'Career Modules', value: '28 Tools', color: '#60a5fa' }
            ].map(s => (
              <div
                key={s.label}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '0.75rem',
                  padding: '0.55rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{s.icon}</span>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '900', color: s.color, lineHeight: 1.1 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── 1. STATS CARDS ───────────────────────────────────────── */}
      <StatsCards stats={stats} user={user} />

      {/* ── 2. QUICK ACTIONS ─────────────────────────────────────── */}
      <QuickActions onNavigate={onNavigate} />

      {/* ── 3. FEATURED MODULES ──────────────────────────────────── */}
      <FeaturedSection onNavigate={onNavigate} />

      {/* ── 4. RECENT ACTIVITY FEED ──────────────────────────────── */}
      <RecentActivity activities={recentActivities} user={user} />
    </div>
  )
}
