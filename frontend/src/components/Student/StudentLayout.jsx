import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSelector from '../LanguageSelector';

const StudentLayout = ({
  children,
  activeTab,
  setActiveTab,
  onOpenNotifications,
  notificationCount = 0
}) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuSections = [
    {
      title: 'Core Platform',
      items: [
        { id: 'dashboard', icon: '📊', label: 'Dashboard' },
        { id: 'profile', icon: '👤', label: 'My Profile' },
        { id: 'skills', icon: '📚', label: 'Skill Hub (All India)' },
        { id: 'notes', icon: '📝', label: 'Notes Hub (Govt & Core)' },
        { id: 'jobs', icon: '💼', label: 'Job Portal' },
        { id: 'gamification', icon: '🎮', label: 'Career Journey (Levels)' },
        { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
      ]
    },
    {
      title: 'Practice & Interviews',
      items: [
        { id: 'aptitude', icon: '🧠', label: 'Aptitude Test (1M+ Qs)' },
        { id: 'voice-interview', icon: '🎙️', label: 'Voice Mock Interview' },
        { id: 'interview', icon: '🎤', label: 'Mock Interview (AI)' },
        { id: 'mock-tests', icon: '🏢', label: 'Company Mock Tests' },
        { id: 'ai-spoken', icon: '🗣️', label: 'AI Spoken Class' },
        { id: 'viva', icon: '💬', label: 'Viva Prep' },
        { id: 'exam', icon: '🚨', label: 'Exam Emergency' },
      ]
    },
    {
      title: 'Career & Applications',
      items: [
        { id: 'resume', icon: '📄', label: 'Resume Builder' },
        { id: 'resume-scorer', icon: '📈', label: 'Resume Scorer' },
        { id: 'ai-apply', icon: '⚡', label: 'AI Apply & Track' },
        { id: 'government-exams', icon: '🏛️', label: 'Government Exams' },
        { id: 'advanced-courses', icon: '🚀', label: 'Advanced AI Courses' },
        { id: 'school-support', icon: '🎒', label: 'School Students Support' },
        { id: 'career-predictor', icon: '🔮', label: 'Career Predictor' },
        { id: 'career-gps', icon: '🗺️', label: 'Career GPS' },
        { id: 'skill-gap', icon: '🎯', label: 'Skill Gap Analyzer' },
        { id: 'bunk', icon: '🏃', label: 'Bunk Planner' },
      ]
    },
    {
      title: 'Network & Community',
      items: [
        { id: 'mentors', icon: '🧑‍🏫', label: 'Mentor Connect' },
        { id: 'alumni-network', icon: '🤝', label: 'Alumni Network' },
        { id: 'study-groups', icon: '👥', label: 'Study Groups' },
        { id: 'company-archives', icon: '🏛️', label: 'Company Archives' },
        { id: 'chat', icon: '🤖', label: 'Ask AI 24/7' },
      ]
    }
  ];

  if (user?.role === 'admin') {
    menuSections.push({
      title: 'Administration',
      items: [
        { id: 'admin', icon: '👑', label: 'Admin Control Center' },
        { id: 'student-analytics', icon: '📊', label: 'Student Analytics' },
        { id: 'all-users-message', icon: '📢', label: 'Broadcast Message' }
      ]
    });
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'transparent' }}>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 40
          }}
        />
      )}

      {/* Sidebar Navigation */}
      <aside style={{
        width: '270px',
        background: 'rgba(10, 14, 26, 0.92)',
        backdropFilter: 'blur(16px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 50,
        overflowY: 'auto',
        transition: 'transform 0.3s ease',
        transform: sidebarOpen ? 'translateX(0)' : undefined
      }}>
        {/* Brand Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            boxShadow: '0 0 15px rgba(124, 58, 237, 0.5)'
          }}>
            🎓
          </div>
          <div>
            <h1 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
              CampusPilot <span style={{ color: '#818cf8', fontSize: '0.8rem', fontWeight: '700' }}>AI</span>
            </h1>
            <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: 0 }}>All India Career Platform</p>
          </div>
        </div>

        {/* User Card */}
        <div style={{
          margin: '0.75rem 1rem',
          padding: '0.75rem 1rem',
          borderRadius: '0.85rem',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          cursor: 'pointer'
        }} onClick={() => setActiveTab('profile')}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '800',
            fontSize: '0.9rem',
            boxShadow: '0 0 10px rgba(16, 185, 129, 0.4)'
          }}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name || 'Student'}
            </div>
            <div style={{ color: '#38bdf8', fontSize: '0.72rem', fontWeight: '600' }}>
              ⚡ {user?.xp || 0} XP · Level {Math.floor((user?.xp || 0) / 100) + 1}
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav style={{ padding: '0.5rem 0.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {menuSections.map(sec => (
            <div key={sec.title}>
              <div style={{
                fontSize: '0.68rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#64748b',
                padding: '0 0.75rem 0.4rem',
              }}>
                {sec.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {sec.items.map(item => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.55rem 0.85rem',
                        borderRadius: '0.65rem',
                        background: isActive
                          ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.35), rgba(37, 99, 235, 0.25))'
                          : 'transparent',
                        color: isActive ? '#ffffff' : '#94a3b8',
                        border: isActive ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid transparent',
                        fontWeight: isActive ? '800' : '600',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                        boxShadow: isActive ? '0 2px 10px rgba(124, 58, 237, 0.25)' : 'none'
                      }}
                      onMouseEnter={e => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                          e.currentTarget.style.color = '#ffffff';
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#94a3b8';
                        }
                      }}
                    >
                      <span style={{ fontSize: '1.05rem', minWidth: '22px' }}>{item.icon}</span>
                      <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer with Language and Logout */}
        <div style={{
          padding: '1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(255, 255, 255, 0.01)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem'
        }}>
          <LanguageSelector />
          <button
            onClick={logout}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.55rem',
              borderRadius: '0.65rem',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              fontWeight: '700',
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Navbar */}
        <header style={{
          height: '64px',
          background: 'rgba(10, 14, 26, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          position: 'sticky',
          top: 0,
          zIndex: 30
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: 'white',
                padding: '0.4rem 0.75rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              ☰
            </button>
            <span style={{ color: '#cbd5e1', fontSize: '0.85rem', fontWeight: '700' }}>
              🇮🇳 CampusPilot AI Platform
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {/* Notifications button */}
            <button
              onClick={onOpenNotifications}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: 'white',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                fontSize: '1.1rem'
              }}
              title="Notifications"
            >
              🔔
              {notificationCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  background: '#ef4444',
                  color: 'white',
                  fontSize: '0.65rem',
                  fontWeight: '800',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 8px rgba(239, 68, 68, 0.8)'
                }}>
                  {notificationCount}
                </span>
              )}
            </button>

            {/* User Avatar */}
            <div
              onClick={() => setActiveTab('profile')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '2rem',
                padding: '0.3rem 0.85rem 0.3rem 0.4rem',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '800',
                fontSize: '0.75rem'
              }}>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
              </div>
              <span style={{ color: 'white', fontWeight: '700', fontSize: '0.82rem' }}>
                {user?.name ? user.name.split(' ')[0] : 'Student'}
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <main style={{ flex: 1, padding: '1.5rem', minHeight: 'calc(100vh - 64px)' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
