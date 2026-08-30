import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import ParticlesBg from './components/Background/ParticlesBg';
import StudyGroups from './components/Student/StudyGroups';
import LanguageSelector from './components/LanguageSelector';
import { useAppStore } from './store/appStore';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import Dashboard from './components/Dashboard/Dashboard';
import SkillHub from './components/Skills/SkillHub';
import SkillDetail from './components/Skills/SkillDetail';
import RoleBasedLearning from './components/Skills/RoleBasedLearning';
import ResumeBuilder from './components/Resume/ResumeBuilder';
import JobPortal from './components/Jobs/JobPortal';
import MockInterview from './components/Interview/MockInterview';
import AptitudeTest from './components/Interview/AptitudeTest';
import AdminPanel from './components/Admin/AdminPanel';

import ExamEmergency from './components/ExamEmergency';
import VivaPrep from './components/VivaPrep';
import Placements from './components/Placements';
import NotesHub from './components/NotesHub';
import BunkPlanner from './components/BunkPlanner';
import JobChecker from './components/JobChecker';
import SkillGapAnalyzer from './components/SkillGapAnalyzer';
import ChatAssistant from './components/ChatAssistant';

// NEW FEATURES & ENHANCEMENTS
import CareerGps from './components/CareerGps';
import ResumeScorer from './components/ResumeScorer';
import AiApply from './components/AiApply';
import MentorConnect from './components/MentorConnect';
import CompanyMockTests from './components/CompanyMockTests';
import SkillBadge from './components/SkillBadge';
import StudentAnalytics from './components/Admin/StudentAnalytics';
import AiCareerPredictor from './components/AiCareerPredictor';
import VoiceMockInterview from './components/VoiceMockInterview';
import Gamification from './components/Gamification';
import AllUsersMessage from './components/Student/AllUsersMessage';
import NotificationsModal from './components/NotificationsModal';

// BRAND NEW ENTERPRISE PAGES
import UserProfile from './components/UserProfile';
import CompanyArchives from './components/CompanyArchives';
import AlumniNetwork from './components/AlumniNetwork';
import Leaderboard from './components/Leaderboard';

import StudentLayout from './components/Student/StudentLayout';

// Student specific pages
import StudentDashboard from './components/Student/StudentDashboard';
import StudentProfile from './components/Student/StudentProfile';
import StudentSkills from './components/Student/StudentSkills';
import StudentSettings from './components/Student/StudentSettings';



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
import AllUsersMessage from './components/Student/AllUsersMessage';
import NotificationsModal from './components/NotificationsModal'

// BRAND NEW ENTERPRISE PAGES
import UserProfile from './components/UserProfile'
import CompanyArchives from './components/CompanyArchives'
import AlumniNetwork from './components/AlumniNetwork'
import Leaderboard from './components/Leaderboard'

import StudentLayout from './components/Student/StudentLayout'

function MainApp() {
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const [authMode, setAuthMode] = useState('login')

  const {
    activeTab, setActiveTab,
    selectedSkillId, setSelectedSkillId,
    showNotifications, setShowNotifications,
    notificationCount
  } = useAppStore()

  const { language, t } = useLanguage()

  if (authLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-primary, #090d16)', color: 'white' }}>
        <div>
          <span className="loading-spinner"></span> {t('loading')}
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

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard': return <StudentDashboard onNavigate={(tab) => setActiveTab(tab)} />
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
      case 'study-groups': return <StudyGroups />;
      case 'all-users-message': return <AllUsersMessage />;
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
    <div style={{ position: 'relative', minHeight: '100vh', background: '#090d16' }}>
      <ParticlesBg />
      <NotificationsModal isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

      <StudentLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNotifications={() => setShowNotifications(true)}
        notificationCount={notificationCount}
      >
        {renderActiveTab()}
      </StudentLayout>
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

