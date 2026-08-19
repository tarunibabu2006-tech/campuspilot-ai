import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import ParticlesBg from './components/Background/ParticlesBg'
import LanguageSelector from './components/LanguageSelector'
import useLanguage from './hooks/useLanguage'

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

// NEW FEATURES
import CareerGps from './components/CareerGps'
import ResumeScorer from './components/ResumeScorer'
import AiApply from './components/AiApply'
import MentorConnect from './components/MentorConnect'
import CompanyMockTests from './components/CompanyMockTests'
import SkillBadge from './components/SkillBadge'

function MainApp() {
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth()
  const [authMode, setAuthMode] = useState('login')
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedSkillId, setSelectedSkillId] = useState(null)
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

    // 🌟 6 NEW FLAGSHIP FEATURES (Front & Center)
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
      
      // 🌟 6 NEW FLAGSHIP FEATURES
      case 'career-gps': return <CareerGps />
      case 'resume-scorer': return <ResumeScorer />
      case 'ai-apply': return <AiApply />
      case 'skill-badge': return <SkillBadge />
      case 'mentors': return <MentorConnect />
      case 'mock-tests': return <CompanyMockTests />
      
      default: return <Dashboard onNavigate={(tab) => setActiveTab(tab)} />
    }
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <ParticlesBg />

      <header className="header" style={{ position: 'relative', zIndex: 20 }}>
        <div className="header-inner">
          <div className="logo" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')}>
            <span className="logo-icon">🎓</span>
            CampusPilot AI
          </div>

          <div className="flex items-center gap-1">
            <LanguageSelector language={language} setLanguage={setLanguage} />
            <div className="flex items-center gap-1 ml-2" style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '0.75rem' }}>
              <span className="text-xs font-bold text-blue">👤 {user?.name}</span>
              <button onClick={logout} className="btn btn-outline" style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}>
                {t('logout')} 🚪
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="nav-tabs" style={{ position: 'relative', zIndex: 20, maxHeight: '120px', overflowY: 'auto' }}>
        {studentTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

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
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{
        style: { background: '#1a1f35', color: '#f0f2f8', border: '1px solid #2a3050' }
      }} />
      <MainApp />
    </AuthProvider>
  )
}

export default App
