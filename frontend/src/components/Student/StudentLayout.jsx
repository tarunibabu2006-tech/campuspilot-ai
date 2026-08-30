import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import LanguageSelector from '../LanguageSelector'

export default function StudentLayout({
  activeTab,
  setActiveTab,
  children,
  onOpenNotifications,
  notificationCount = 0
}) {
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const isMobile = useMediaQuery('(max-width: 1024px)')
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)

  // Auto-close sidebar on mobile, keep open on desktop
  useEffect(() => {
    setSidebarOpen(!isMobile)
  }, [isMobile])

  const menuSections = [
    {
      title: t('overview') || 'Main Navigation',
      items: [
        { id: 'dashboard', icon: '📊', label: t('dashboard') },
        { id: 'profile', icon: '👤', label: t('profile') },
        { id: 'leaderboard', icon: '⭐', label: t('leaderboard') },
        { id: 'gamification', icon: '🏆', label: t('gamification') || 'Achievements' },
      ]
    },
    {
      title: t('skills') || 'Learning & Skills',
      items: [
        { id: 'skills', icon: '📚', label: t('skills') },
        { id: 'role-learning', icon: '🗺️', label: t('rolePath') },
        { id: 'notes', icon: '📝', label: t('notes') },
        { id: 'skill-badge', icon: '🏷️', label: t('skillBadge') },
        { id: 'career-gps', icon: '🧭', label: t('careerGps') },
        { id: 'career-predictor', icon: '🔮', label: t('careerPredictor') },
      ]
    },
    {
      title: t('jobs') || 'Career & Jobs',
      items: [
        { id: 'jobs', icon: '💼', label: t('jobs') },
        { id: 'resume', icon: '📄', label: t('resume') },
        { id: 'resume-scorer', icon: '📊', label: t('resumeScorer') },
        { id: 'ai-apply', icon: '🤖', label: t('aiApply') },
        { id: 'company-archives', icon: '🏛️', label: t('companyArchives') },
        { id: 'alumni-network', icon: '🤝', label: t('alumniNetwork') },
      ]
    },
    {
      title: t('interview') || 'Tests & Interviews',
      items: [
        { id: 'interview', icon: '🎤', label: t('interview') },
        { id: 'voice-interview', icon: '🎙️', label: t('voiceInterview') },
        { id: 'aptitude', icon: '🧠', label: t('aptitude') },
        { id: 'mock-tests', icon: '📝', label: t('mockTests') },
        { id: 'exam', icon: '📚', label: t('exam') },
        { id: 'viva', icon: '🧪', label: t('viva') },
        { id: 'placement', icon: '💼', label: t('placement') },
      ]
    },
    {
      title: t('studyGroups') || 'Community & Tools',
      items: [
        { id: 'study-groups', icon: '👥', label: t('studyGroups') },
        { id: 'mentors', icon: '🧑‍🏫', label: t('mentors') },
        { id: 'chat', icon: '🤖', label: t('chat') },
        { id: 'bunk', icon: '🏃', label: t('bunk') },
        { id: 'job', icon: '🛡️', label: t('job') },
      ]
    }
  ]

  if (user?.role === 'admin') {
    menuSections.unshift({
      title: 'Administrator',
      items: [
        { id: 'admin', icon: '👑', label: t('adminPanel') }
      ]
    })
  }

  const handleNavClick = (id) => {
    setActiveTab(id)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary, #090d16)', color: 'white', position: 'relative' }}>

      {/* ── Mobile Overlay Backdrop ───────────────────────────────── */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(4px)',
              zIndex: 45
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Left Sidebar Navigation ──────────────────────────────── */}
      <motion.aside
        style={{
          position: isMobile ? 'fixed' : 'sticky',
          top: 0,
          left: 0,
          bottom: 0,
          width: '270px',
          height: '100vh',
          background: 'linear-gradient(180deg, #151238 0%, #0d1224 60%, #090d16 100%)',
          borderRight: '1px solid rgba(139, 92, 246, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
          transform: (isMobile && !sidebarOpen) ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.2s ease',
          boxShadow: (isMobile && sidebarOpen) ? '0 0 30px rgba(0,0,0,0.8)' : 'none',
          overflowY: 'hidden'
        }}
      >
        {/* Sidebar Brand Header */}
        <div style={{
          padding: '1.25rem 1.2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <div
            onClick={() => handleNavClick('dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
          >
            <div style={{
              width: '36px', height: '36px', borderRadius: '0.65rem',
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.25rem', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)'
            }}>
              🎓
            </div>
            <div>
              <div style={{ fontWeight: '900', fontSize: '1.05rem', color: '#ffffff', letterSpacing: '-0.3px' }}>
                CampusPilot <span style={{ color: '#818cf8', fontSize: '0.8rem', fontWeight: '800' }}>AI</span>
              </div>
              <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Student Career Cockpit</div>
            </div>
          </div>

          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                color: '#cbd5e1',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem'
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* User Mini Profile Card */}
        <div style={{
          padding: '0.85rem 1.2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(124, 58, 237, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', fontWeight: '800', color: '#1a1a1a', flexShrink: 0
          }}>
            {user?.avatar ? (
              <img src={user.avatar} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              user?.name?.charAt(0)?.toUpperCase() || 'S'
            )}
          </div>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <div style={{ fontWeight: '800', fontSize: '0.88rem', color: '#ffffff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {user?.name || 'Student'}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#a5b4fc', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>⚡ {user?.xp || 0} XP</span>
              <span>•</span>
              <span style={{ color: '#4ade80' }}>{user?.department ? user.department.split(' ')[0] : 'Campus'}</span>
            </div>
          </div>
        </div>

        {/* Sidebar Nav Items List */}
        <nav style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0.75rem 0.65rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem'
        }}>
          {menuSections.map((sec, idx) => (
            <div key={sec.title || idx}>
              {sec.title && (
                <div style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.68rem',
                  fontWeight: '800',
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px'
                }}>
                  {sec.title}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {sec.items.map((item) => {
                  const isActive = activeTab === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.6rem 0.85rem',
                        borderRadius: '0.65rem',
                        background: isActive ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.45), rgba(37, 99, 235, 0.35))' : 'transparent',
                        border: isActive ? '1px solid rgba(139, 92, 246, 0.5)' : '1px solid transparent',
                        color: isActive ? '#ffffff' : '#94a3b8',
                        cursor: 'pointer',
                        fontWeight: isActive ? '800' : '600',
                        fontSize: '0.86rem',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                        boxShadow: isActive ? '0 2px 10px rgba(124, 58, 237, 0.25)' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                          e.currentTarget.style.color = '#e2e8f0'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.color = '#94a3b8'
                        }
                      }}
                    >
                      <span style={{ fontSize: '1.15rem', flexShrink: 0 }}>{item.icon}</span>
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div style={{
          padding: '0.85rem 1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <button
            onClick={logout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.55rem',
              borderRadius: '0.55rem',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              fontWeight: '700',
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.22)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)'}
          >
            <span>🚪</span>
            <span>{t('logout') || 'Logout'}</span>
          </button>
          <div style={{ fontSize: '0.62rem', color: '#475569', textAlign: 'center' }}>
            © 2026 CampusPilot AI v2.0
          </div>
        </div>
      </motion.aside>

      {/* ── Main Content Area with Header ────────────────────────── */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>

        {/* Top Navbar Header */}
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          backdropFilter: 'blur(12px)',
          background: 'rgba(13, 18, 36, 0.85)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '0.75rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem'
        }}>
          {/* Left: Sidebar Hamburger Toggle + Active Tab Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <button
              onClick={() => setSidebarOpen(prev => !prev)}
              aria-label="Toggle Menu"
              style={{
                background: 'rgba(255, 255, 255, 0.07)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                width: '36px',
                height: '36px',
                borderRadius: '0.55rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.2rem',
                flexShrink: 0,
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(124, 58, 237, 0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)'}
            >
              ☰
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
              <span style={{ color: '#818cf8', fontWeight: '800', fontSize: '1rem', textTransform: 'capitalize', whiteSpace: 'nowrap' }}>
                {t(activeTab) || activeTab}
              </span>
            </div>
          </div>

          {/* Right Header Actions: Notifications, Language, Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {/* Real-time Notifications Bell */}
            <button
              onClick={onOpenNotifications}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                padding: '0.4rem 0.65rem',
                borderRadius: '0.55rem',
                cursor: 'pointer',
                fontSize: '0.85rem',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
              title={t('realTimeAlerts') || 'Notifications'}
            >
              <span>🔔</span>
              {notificationCount > 0 && (
                <span style={{
                  background: '#ef4444',
                  color: '#fff',
                  borderRadius: '10px',
                  padding: '0.05rem 0.35rem',
                  fontSize: '0.65rem',
                  fontWeight: 'bold'
                }}>
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Profile Avatar / Quick Admin Button */}
            {user?.role === 'admin' ? (
              <button
                onClick={() => handleNavClick('admin')}
                style={{
                  background: activeTab === 'admin' ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: activeTab === 'admin' ? '#fff' : '#1a1a1a',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: '900',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  boxShadow: '0 2px 8px rgba(245,158,11,0.3)'
                }}
              >
                👑 {t('adminPanel') || 'Admin'}
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('profile')}
                style={{
                  background: 'rgba(124, 58, 237, 0.15)',
                  border: '1px solid rgba(139, 92, 246, 0.35)',
                  color: '#c4b5fd',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <span>👤</span>
                <span style={{ display: isMobile ? 'none' : 'inline' }}>{user?.name?.split(' ')[0] || 'Profile'}</span>
              </button>
            )}
          </div>
        </header>

        {/* Dynamic Page Content Area */}
        <main style={{ flex: 1, padding: isMobile ? '1rem 0.75rem' : '1.5rem 2rem', overflowX: 'hidden' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
