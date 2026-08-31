import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../../context/AuthContext'
import { useLanguage } from '../../../context/LanguageContext'
import StatsCards from './StatsCards'
import RecentActivity from './RecentActivity'
import QuickActions from './QuickActions'
import FeaturedSection from './FeaturedSection'

import { useDashboardStats, useRecentActivity } from '../../../hooks/useStudentData'

export default function StudentDashboard({ onNavigate }) {
  const { user } = useAuth()
  const { t, language } = useLanguage()

  const { data: statsData } = useDashboardStats()
  const { data: activityData } = useRecentActivity()

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
          padding: '2rem 2.25rem',
          border: '1px solid rgba(139,92,246,0.35)',
          boxShadow: '0 8px 32px rgba(124,58,237,0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.75rem', position: 'relative', zIndex: 1 }}>
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
                  boxShadow: '0 4px 12px rgba(124,58,237,0.4)',
                  transition: 'all 0.15s ease'
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
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
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
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                Ask AI
              </button>
            </div>
          </div>

          {/* Right Side: Exact 4 Stat Cards Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', minWidth: '220px' }}>
            {/* Card 1: 50+ Skills Available */}
            <div
              onClick={() => onNavigate('skills')}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '1rem',
                padding: '0.75rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>📚</span>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: '900', color: '#4ade80', lineHeight: 1.1 }}>
                  50+
                </div>
                <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '0.15rem', fontWeight: '600' }}>
                  Skills Available
                </div>
              </div>
            </div>

            {/* Card 2: 30+ Job Openings */}
            <div
              onClick={() => onNavigate('jobs')}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '1rem',
                padding: '0.75rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>💼</span>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: '900', color: '#fbbf24', lineHeight: 1.1 }}>
                  30+
                </div>
                <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '0.15rem', fontWeight: '600' }}>
                  Job Openings
                </div>
              </div>
            </div>

            {/* Card 3: 100,000+ Study Notes */}
            <div
              onClick={() => onNavigate('notes')}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '1rem',
                padding: '0.75rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>📝</span>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: '900', color: '#c084fc', lineHeight: 1.1 }}>
                  100,000+
                </div>
                <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '0.15rem', fontWeight: '600' }}>
                  Study Notes
                </div>
              </div>
            </div>

            {/* Card 4: 28 Tools Career Modules */}
            <div
              onClick={() => onNavigate('career-gps')}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '1rem',
                padding: '0.75rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>🎯</span>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: '900', color: '#38bdf8', lineHeight: 1.1 }}>
                  28 Tools
                </div>
                <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '0.15rem', fontWeight: '600' }}>
                  Career Modules
                </div>
              </div>
            </div>
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
