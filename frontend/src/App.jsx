import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import ParticlesBg from './components/Background/ParticlesBg'
import LanguageSelector from './components/LanguageSelector'
import { useAppStore } from './store/appStore'

import Login from './components/Auth/Login'
import Register from './components/Auth/Register'

import Dashboard from './components/Dashboard/Dashboard'
import SkillHub from './components/Skills/SkillHub'
import SkillDetail from './components/Skills/SkillDetail'
import RoleBasedLearning from './components/Skills/RoleBasedLearning'
import ResumeBuilder from './components/Resume/ResumeBuilder'
import JobPortal from './components/Jobs/JobPortal'
import MockInterview from './components/Interview/MockInterview'
import AptitudeTest from './components/Interview/AptitudeTest'
import AdminPanel from './components/Admin/AdminPanel'

import ExamEmergency from './components/ExamEmergency'
import VivaPrep from './components/VivaPrep'
import Placements from './components/Placements'
import NotesHub from './components/NotesHub'
import BunkPlanner from './components/BunkPlanner'
import JobChecker from './components/JobChecker'
import SkillGapAnalyzer from './components/SkillGapAnalyzer'
import ChatAssistant from './components/ChatAssistant'

// NEW FEATURES & ENHANCEMENTS
import CareerGps from './components/CareerGps'
import ResumeScorer from './components/ResumeScorer'
import AiApply from './components/AiApply'
import MentorConnect from './components/MentorConnect'
import CompanyMockTests from './components/CompanyMockTests'
import SkillBadge from './components/SkillBadge'
import StudentAnalytics from './components/Admin/StudentAnalytics'
import AiCareerPredictor from './components/AiCareerPredictor'
import VoiceMockInterview from './components/VoiceMockInterview'
import Gamification from './components/Gamification'
import StudyGroups from './components/StudyGroups'
import NotificationsModal from './components/NotificationsModal'

// BRAND NEW ENTERPRISE PAGES
import UserProfile from './components/UserProfile'
import CompanyArchives from './components/CompanyArchives'
import AlumniNetwork from './components/AlumniNetwork'
import Leaderboard from './components/Leaderboard'

function MainApp() {
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth()
  const [authMode, setAuthMode] = useState('login')

  const {
    activeTab, setActiveTab,
    selectedSkillId, setSelectedSkillId,
    showNotifications, setShowNotifications,
    notificationCount
  } = useAppStore()

  const { language, setLanguage, t } = useLanguage()

  if (authLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-primary)', color: 'white' }}>
        <div>
          <span className="loading-spinner"></span> Auto-Logging In...
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return authMode === 'login' ? (
      <Login onSwitchToRegister={() => setAuthMode('register')} />
    ) : (
      <Register onSwitchToLogin={() => setAuthMode('login')} />
    )
  }

  const handleSelectSkillModule = (skillId) => {
    setSelectedSkillId(skillId)
    setActiveTab('skill-detail')
  }

  const studentTabs = [
    { id: 'dashboard', label: `🎯 ${t('dashboard')}` },

    // 🌟 10 FLAGSHIP AI & PLACEMENT ENHANCEMENTS
    { id: 'profile', label: `👤 Profile` },
    { id: 'leaderboard', label: `🏆 Leaderboard` },
    { id: 'company-archives', label: `🏛️ Archives` },
    { id: 'alumni-network', label: `🤝 Alumni` },
    { id: 'career-predictor', label: `🔮 Career Predictor` },
    { id: 'voice-interview', label: `🎙️ Voice Interview` },
    { id: 'gamification', label: `🏆 Gamification 2.0` },
    { id: 'study-groups', label: `👥 Study Groups` },
    { id: 'career-gps', label: `🗺️ Career GPS` },
    { id: 'resume-scorer', label: `📄 Resume Scorer` },
    { id: 'ai-apply', label: `🤖 AI Apply` },
    { id: 'skill-badge', label: `🏷️ Skill Badge` },
    { id: 'mentors', label: `👥 Mentors` },
    { id: 'mock-tests', label: `📝 Mock Tests` },

    // Core Study & Placement Hubs
    { id: 'skills', label: `📚 ${t('skills')}` },
    { id: 'role-learning', label: `🗺️ ${t('rolePath')}` },
    { id: 'resume', label: `📄 ${t('resume')}` },
    { id: 'jobs', label: `💼 ${t('jobs')}` },
    { id: 'interview', label: `🎤 ${t('interview')}` },
    { id: 'aptitude', label: `🧠 ${t('aptitude')}` },
    { id: 'exam', label: `📚 ${t('exam')}` },
    { id: 'viva', label: `🎤 ${t('viva')}` },
    { id: 'placement', label: `💼 ${t('placement')}` },
    { id: 'notes', label: `📝 ${t('notes')}` },
    { id: 'bunk', label: `🏃 ${t('bunk')}` },
    { id: 'job', label: `🛡️ ${t('job')}` },
    { id: 'skill', label: `🗺️ ${t('skill')}` },
    { id: 'chat', label: `🤖 ${t('chat')}` }
  ]

  if (user?.role === 'admin') {
    studentTabs.unshift({ id: 'admin', label: `👑 ${t('admin')}` })
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard onNavigate={(tab) => setActiveTab(tab)} />
      case 'skills': return <SkillHub onSelectSkill={handleSelectSkillModule} />
      case 'skill-detail': return <SkillDetail skillId={selectedSkillId} onBack={() => setActiveTab('skills')} />
      case 'role-learning': return <RoleBasedLearning onSelectSkill={handleSelectSkillModule} />
      case 'resume': return <ResumeBuilder />
      case 'jobs': return <JobPortal />
      case 'interview': return <MockInterview />
      case 'aptitude': return <AptitudeTest />
      case 'admin': return <AdminPanel />
      case 'exam': return <ExamEmergency language={language} />
      case 'viva': return <VivaPrep language={language} />
      case 'placement': return <Placements language={language} />
      case 'notes': return <NotesHub language={language} />
      case 'bunk': return <BunkPlanner language={language} />
      case 'job': return <JobChecker language={language} />
      case 'skill': return <SkillGapAnalyzer language={language} />
      case 'chat': return <ChatAssistant language={language} />

      // 🌟 FLAGSHIP ENHANCEMENTS
      case 'profile': return <UserProfile />
      case 'leaderboard': return <Leaderboard />
      case 'company-archives': return <CompanyArchives />
      case 'alumni-network': return <AlumniNetwork />
      case 'career-predictor': return <AiCareerPredictor />
      case 'voice-interview': return <VoiceMockInterview />
      case 'gamification': return <Gamification />
      case 'study-groups': return <StudyGroups />
      case 'career-gps': return <CareerGps />
      case 'resume-scorer': return <ResumeScorer />
      case 'ai-apply': return <AiApply />
      case 'skill-badge': return <SkillBadge />
      case 'mentors': return <MentorConnect />
      case 'mock-tests': return <CompanyMockTests />
      case 'student-analytics': return <StudentAnalytics onBack={() => setActiveTab('admin')} />

      default: return <Dashboard onNavigate={(tab) => setActiveTab(tab)} />
    }
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <ParticlesBg />
      <NotificationsModal isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

      <header className="header" style={{ position: 'relative', zIndex: 20 }}>
        <div className="header-inner">
          <div className="logo" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')}>
            <span className="logo-icon">🎓</span>
            CampusPilot AI
          </div>

          <div className="flex items-center gap-1">
            {/* Real-time Notifications Bell */}
            <button
              onClick={() => setShowNotifications(true)}
              className="btn btn-outline"
              style={{ fontSize: '0.85rem', padding: '0.3rem 0.6rem', position: 'relative', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              title="Real-Time Alerts"
            >
              <span>🔔</span>
              <span style={{
                background: '#ef4444',
                color: '#fff',
                borderRadius: '10px',
                padding: '0.1rem 0.4rem',
                fontSize: '0.65rem',
                fontWeight: 'bold'
              }}>
                {notificationCount}
              </span>
            </button>

            <LanguageSelector />
            <div className="flex items-center gap-1 ml-2" style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '0.75rem' }}>
              {user?.role === 'admin' ? (
                <button
                  onClick={() => setActiveTab('admin')}
                  style={{
                    background: activeTab === 'admin' ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: activeTab === 'admin' ? '#fff' : '#1a1a1a',
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    boxShadow: '0 2px 10px rgba(245,158,11,0.4)'
                  }}
                >
                  👑 Admin Panel
                </button>
              ) : (
                <span className="text-xs font-bold text-blue">👤 {user?.name}</span>
              )}
              <button onClick={logout} className="btn btn-outline" style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}>
                {t('logout')} 🚪
              </button>
            </div>
          </div>
        </div>
      </header>

      {activeTab !== 'dashboard' && (
        <div style={{ position: 'relative', zIndex: 20, padding: '0.75rem 1.5rem', background: 'rgba(15,23,42,0.8)', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(8px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setActiveTab('dashboard')}
              style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '0.6rem', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              🏠 Back to Dashboard
            </button>
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>/</span>
            <span style={{ color: 'white', fontWeight: '700', fontSize: '0.9rem', textTransform: 'capitalize' }}>
              {studentTabs.find(t => t.id === activeTab)?.label || activeTab}
            </span>
          </div>

          <select
            value={activeTab}
            onChange={e => setActiveTab(e.target.value)}
            style={{ background: 'rgba(30,27,75,0.9)', border: '1px solid rgba(139,92,246,0.3)', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '0.6rem', fontSize: '0.82rem', cursor: 'pointer', outline: 'none' }}
          >
            {studentTabs.map(t => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>
      )}

      <main className="main-content" style={{ position: 'relative', zIndex: 20 }}>
        {renderActiveTab()}
      </main>

      <footer className="footer" style={{ position: 'relative', zIndex: 20 }}>
        {t('footer')}
      </footer>
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{
          style: { background: '#1a1f35', color: '#f0f2f8', border: '1px solid #2a3050' }
        }} />
        <MainApp />
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App
