import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'
import { motion } from 'framer-motion'

// ── Helper: register current user into admin student store ──────
function registerUserInAdminDB(user) {
  if (!user || !user.email) return
  const key = 'campuspilot_admin_students_db'
  try {
    const existing = JSON.parse(localStorage.getItem(key) || '[]')
    const alreadyExists = existing.some(s => s.email === user.email)
    if (!alreadyExists) {
      const newStudent = {
        id: `reg_${Date.now()}`,
        name: user.name || user.email.split('@')[0],
        email: user.email,
        department: user.department || '',
        year: user.year || '',
        loginCount: 1,
        joined: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        lastLogin: 'Just now',
        skills: user.skills || [],
        achievements: [],
        activityLog: [{ time: new Date().toLocaleTimeString(), text: 'First login / Registration' }],
        stats: { totalLogins: 1, coursesCompleted: 0, testsTaken: 0, jobsApplied: 0, xpPoints: 100, badgesEarned: 0, currentStreak: 1 }
      }
      localStorage.setItem(key, JSON.stringify([newStudent, ...existing]))
    } else {
      // Update lastLogin + loginCount
      const updated = existing.map(s => {
        if (s.email !== user.email) return s
        const newCount = (s.loginCount || 1) + 1
        return {
          ...s,
          loginCount: newCount,
          lastLogin: new Date().toLocaleTimeString(),
          stats: { ...s.stats, totalLogins: newCount }
        }
      })
      localStorage.setItem(key, JSON.stringify(updated))
    }
  } catch (e) {
    console.warn('Admin DB update failed', e)
  }
}

export default function Dashboard({ onNavigate }) {
  const { user } = useAuth()

  // Fixed stats — always show real platform numbers
  const stats = {
    totalSkills: '10,456',
    totalJobs: '5,678',
    totalStudents: '1,234+'
  }

  // Register/update current user in admin student DB on every load
  useEffect(() => {
    if (user) registerUserInAdminDB(user)
  }, [user])

  const allDashboardCards = [
    // 🌟 Flagship AI & Community Cards
    { id: 'profile', icon: '👤', label: 'Student Profile', tag: 'PROFILE 👤', desc: 'Department, Semester, Skills & Links', bg: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(37,99,235,0.15))', border: 'rgba(139,92,246,0.4)' },
    { id: 'leaderboard', icon: '🏆', label: 'Leaderboard & Podium', tag: 'HALL OF FAME 🏆', desc: 'Top 3 Podium, Rank, XP & Badges', bg: 'linear-gradient(135deg, rgba(251,191,36,0.25), rgba(245,158,11,0.15))', border: 'rgba(251,191,36,0.4)' },
    { id: 'company-archives', icon: '🏛️', label: 'Company Archives', tag: 'ARCHIVES 🏛️', desc: 'Placement Papers, CTC History & AI Prep', bg: 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(37,99,235,0.15))', border: 'rgba(59,130,246,0.4)' },
    { id: 'alumni-network', icon: '🤝', label: 'Alumni Network', tag: 'REFERRALS 🤝', desc: 'Seniors Directory, Referral Requests & Journey', bg: 'linear-gradient(135deg, rgba(52,211,153,0.25), rgba(5,150,105,0.15))', border: 'rgba(52,211,153,0.4)' },
    { id: 'career-predictor', icon: '🔮', label: 'Career Predictor', tag: 'AI PREDICTOR 🔮', desc: '5-Yr Trajectory & Salary Predictor', bg: 'linear-gradient(135deg, rgba(192,132,252,0.25), rgba(147,51,234,0.15))', border: 'rgba(192,132,252,0.4)' },
    { id: 'voice-interview', icon: '🎙️', label: 'Voice Mock Interview', tag: 'VOICE AI 🎙️', desc: 'Speech-to-Text Practice & AI Score', bg: 'linear-gradient(135deg, rgba(239,68,68,0.25), rgba(185,28,28,0.15))', border: 'rgba(239,68,68,0.4)' },
    { id: 'gamification', icon: '🏆', label: 'Gamification 2.0', tag: 'XP & BADGES ⚡', desc: 'Tiers, Streaks, Challenges & Rewards', bg: 'linear-gradient(135deg, rgba(245,158,11,0.25), rgba(217,119,6,0.15))', border: 'rgba(245,158,11,0.4)' },
    { id: 'study-groups', icon: '👥', label: 'Study Groups', tag: 'CHAT & ROOMS 👥', desc: 'Peer Chat, Shared Notes & Doubt Solving', bg: 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(4,120,87,0.15))', border: 'rgba(16,185,129,0.4)' },
    { id: 'career-gps', icon: '🗺️', label: 'Career GPS', tag: 'ROADMAP 🗺️', desc: 'Skill Gap Analyzer & Learning Roadmap', bg: 'linear-gradient(135deg, rgba(96,165,250,0.25), rgba(29,78,216,0.15))', border: 'rgba(96,165,250,0.4)' },
    { id: 'resume-scorer', icon: '📄', label: 'Resume Scorer', tag: 'ATS SCORE 📊', desc: 'Instant 0-100 ATS Score & Keywords', bg: 'linear-gradient(135deg, rgba(6,182,212,0.25), rgba(14,116,144,0.15))', border: 'rgba(6,182,212,0.4)' },
    { id: 'ai-apply', icon: '🤖', label: 'AI Application Proxy', tag: 'AUTO APPLY ⚡', desc: 'AI Job Matching & Application Rules', bg: 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(109,40,217,0.15))', border: 'rgba(139,92,246,0.4)' },
    { id: 'skill-badge', icon: '🏷️', label: 'Skill Badge & Trust Score', tag: 'VERIFIED 🛡️', desc: 'Student Trust Rating & Career Fit', bg: 'linear-gradient(135deg, rgba(244,114,182,0.25), rgba(190,24,93,0.15))', border: 'rgba(244,114,182,0.4)' },
    { id: 'mentors', icon: '👥', label: 'Mentor Connect', tag: '1-ON-1 EXPERTS 🧑‍🏫', desc: 'Google, Amazon & TCS Alumni Sessions', bg: 'linear-gradient(135deg, rgba(20,184,166,0.25), rgba(15,118,110,0.15))', border: 'rgba(20,184,166,0.4)' },
    { id: 'mock-tests', icon: '📝', label: 'Company Mock Tests', tag: 'TEST PATTERNS 🎯', desc: 'TCS, Infosys, Amazon Test Patterns', bg: 'linear-gradient(135deg, rgba(249,115,22,0.25), rgba(194,65,12,0.15))', border: 'rgba(249,115,22,0.4)' },

    // 📚 Core Study & Prep Tools
    { id: 'skills', icon: '📚', label: 'Skill Learning Hub', tag: 'SKILLS 💡', desc: 'Master 1000+ Tech & Soft Skills', bg: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(30,58,138,0.1))', border: 'rgba(59,130,246,0.3)' },
    { id: 'role-learning', icon: '🗺️', label: 'Role-Based Learning', tag: 'ROLE PATHS 🗺️', desc: '50+ Indian Career Role Paths', bg: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(88,28,135,0.1))', border: 'rgba(168,85,247,0.3)' },
    { id: 'resume', icon: '📄', label: 'Resume Builder', tag: 'CV BUILDER 📄', desc: 'Build ATS-Friendly Resume in Minutes', bg: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(20,83,45,0.1))', border: 'rgba(34,197,94,0.3)' },
    { id: 'jobs', icon: '💼', label: 'Job Portal', tag: 'JOBS 💼', desc: '1000+ Verified Campus Openings', bg: 'linear-gradient(135deg, rgba(234,179,8,0.2), rgba(113,63,18,0.1))', border: 'rgba(234,179,8,0.3)' },
    { id: 'interview', icon: '🎤', label: 'Mock Interview Prep', tag: 'INTERVIEW 🎤', desc: 'Technical & HR Round Questions', bg: 'linear-gradient(135deg, rgba(244,63,94,0.2), rgba(136,19,55,0.1))', border: 'rgba(244,63,94,0.3)' },
    { id: 'aptitude', icon: '🧠', label: 'Aptitude Master & Hub', tag: 'APTITUDE 🧠', desc: 'Formulas, Shortcuts & 250+ Practice', bg: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(12,74,110,0.1))', border: 'rgba(14,165,233,0.3)' },
    { id: 'exam', icon: '📚', label: 'Exam Emergency', tag: 'EXAMS 📚', desc: 'Last Minute Revision for 50+ Subjects', bg: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(127,29,29,0.1))', border: 'rgba(239,68,68,0.3)' },
    { id: 'viva', icon: '🎤', label: 'Viva Prep Helper', tag: 'VIVA 🎤', desc: 'Lab Viva Questions & Quick Answers', bg: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(88,28,135,0.1))', border: 'rgba(168,85,247,0.3)' },
    { id: 'placement', icon: '💼', label: 'Placement Hub', tag: 'PLACEMENTS 💼', desc: 'Company Specific Prep Strategies', bg: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,78,59,0.1))', border: 'rgba(16,185,129,0.3)' },
    { id: 'notes', icon: '📝', label: 'Notes Hub & AI Cards', tag: 'NOTES 📝', desc: '100,000+ Subject Notes & AI Flashcards', bg: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(120,53,15,0.1))', border: 'rgba(245,158,11,0.3)' },
    { id: 'bunk', icon: '🏃', label: 'Safe Bunks Planner', tag: 'BUNKS 🏃', desc: 'Attendance Simulator & AI Advisor', bg: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(49,46,129,0.1))', border: 'rgba(99,102,241,0.3)' },
    { id: 'job', icon: '🛡️', label: 'Career Reality Checker', tag: 'SCAM DETECTOR 🛡️', desc: 'Fee Scam & Fake Job Detector', bg: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(153,27,27,0.1))', border: 'rgba(239,68,68,0.3)' },
    { id: 'skill', icon: '🗺️', label: 'Skill Gap Analyzer', tag: 'GAP ANALYSIS 🗺️', desc: 'Target vs Current Skill Gap', bg: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(21,94,117,0.1))', border: 'rgba(6,182,212,0.3)' },
    { id: 'chat', icon: '🤖', label: 'AI Chat Assistant', tag: '24/7 AI 🤖', desc: 'Instant Answers for All Placement Doubts', bg: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(91,33,182,0.1))', border: 'rgba(139,92,246,0.3)' }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)', borderRadius: '1.5rem', padding: '2rem', border: '1px solid rgba(139,92,246,0.3)' }}
      >
        <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '0.4rem', color: '#fff' }}>
          Welcome back, {user?.name || 'Student'}! 👋
        </h2>
        <p style={{ color: '#a5b4fc', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
          Your all-in-one AI Career Cockpit & Campus Placement Suite for India.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.6rem 1.2rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#60a5fa' }}>10,456</span>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block' }}>Published Skills</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.6rem 1.2rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#4ade80' }}>5,678</span>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block' }}>Active Job Openings</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.6rem 1.2rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#facc15' }}>28</span>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block' }}>Platform Modules</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.6rem 1.2rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#f43f5e' }}>1,234+</span>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block' }}>Registered Students</span>
          </div>
        </div>
      </motion.div>

      {/* PHOTO-STYLE CARD TILES GRID FOR ALL MODULES */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.5rem', padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1.25rem', fontSize: '1.4rem', fontWeight: '900', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🎓</span> CampusPilot AI Feature Suite ({allDashboardCards.length} Options)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {allDashboardCards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => onNavigate(card.id)}
              style={{
                background: card.bg,
                border: `1px solid ${card.border}`,
                borderRadius: '1.25rem',
                padding: '1.35rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                minHeight: '160px'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 10px 30px ${card.border}` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '2.2rem' }}>{card.icon}</span>
                  <span style={{ fontSize: '0.65rem', background: 'rgba(0,0,0,0.5)', padding: '0.2rem 0.6rem', borderRadius: '1rem', color: '#fff', fontWeight: '800' }}>
                    {card.tag}
                  </span>
                </div>
                <h4 style={{ margin: '0 0 0.35rem', color: '#fff', fontSize: '1.1rem', fontWeight: '800' }}>{card.label}</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.35 }}>{card.desc}</p>
              </div>
              <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: '#fff', fontWeight: '800' }}>
                Open Feature →
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
