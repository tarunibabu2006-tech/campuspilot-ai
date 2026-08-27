import React, { useState, useEffect, useMemo } from 'react'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { SEED_COMPANIES, COMPANY_CATEGORIES } from '../../data/seedCompanies'
import { SEED_MENTORS } from '../../data/seedMentors'
import { CAREER_ROLE_PRESETS } from '../../data/seedRoles'
import { SEED_SKILLS } from '../../data/seedSkills'
import { SEED_JOBS } from '../../data/seedJobs'
import StudentAnalytics from './StudentAnalytics'
import BulkDataHandler from '../BulkDataHandler'

// ── ADMIN SECTION DEFINITIONS (15.1 to 15.14) ────────────────────
const ADMIN_SECTIONS = [
  { id: '15.1', key: 'archives', label: '15.1 Company Archives', icon: '🏛️' },
  { id: '15.2', key: 'alumni', label: '15.2 Alumni Network', icon: '🎓' },
  { id: '15.3', key: 'groups', label: '15.3 Study Groups', icon: '👥' },
  { id: '15.4', key: 'ai_apply', label: '15.4 AI Apply Tracker', icon: '⚡' },
  { id: '15.5', key: 'mentors', label: '15.5 Mentors & Sessions', icon: '🤝' },
  { id: '15.6', key: 'mock_tests', label: '15.6 Mock Tests & Patterns', icon: '📝' },
  { id: '15.7', key: 'skills', label: '15.7 Skill Hub Modules', icon: '📚' },
  { id: '15.8', key: 'roles', label: '15.8 Role Paths & Roadmaps', icon: '🗺️' },
  { id: '15.9', key: 'resumes', label: '15.9 Resume Templates & CVs', icon: '📄' },
  { id: '15.10', key: 'jobs', label: '15.10 Job Portal & Employer Verifier', icon: '💼' },
  { id: '15.11', key: 'interviews', label: '15.11 Mock Interview Bank', icon: '🎤' },
  { id: '15.12', key: 'aptitude', label: '15.12 Aptitude Test Bank', icon: '🧠' },
  { id: '15.13', key: 'notes', label: '15.13 Notes Hub Manager', icon: '✏️' },
  { id: '15.14', key: 'students', label: '15.14 Student Database (Full Inspector)', icon: '👑' },
  { id: 'analytics', key: 'analytics', label: '📊 Live Campus Analytics', icon: '📈' }
]

// ── SEED REGISTERED STUDENTS DATABASE ────────────────────────────
const INITIAL_STUDENTS_DB = [
  {
    id: 'std_01',
    name: 'Tarun Babu',
    email: 'tarun.babu@college.edu',
    department: 'Computer Science & Engineering',
    year: '4th Year',
    status: 'Active',
    joinedDate: '2024-08-15',
    lastLogin: 'Today, 01:20 AM',
    loginHistory: [
      { timestamp: '2026-08-28 01:20 AM', device: 'Chrome on Windows 11', ip: '192.168.1.15' },
      { timestamp: '2026-08-27 11:45 PM', device: 'Mobile Chrome (Android 14)', ip: '106.51.72.110' },
      { timestamp: '2026-08-26 04:30 PM', device: 'Chrome on Windows 11', ip: '192.168.1.15' }
    ],
    xpPoints: 340,
    streak: 12,
    skills: ['React.js (Advanced)', 'Node.js (Intermediate)', 'Python (Advanced)', 'SQL (Advanced)', 'Data Structures (Expert)'],
    badges: [
      { name: 'Python Master', earnedAt: '2026-08-20', icon: '🐍' },
      { name: 'React Master', earnedAt: '2026-08-24', icon: '⚛️' },
      { name: '7-Day Streak Warrior', earnedAt: '2026-08-27', icon: '🔥' }
    ],
    testsTaken: [
      { testName: 'TCS NQT Full Mock Round', score: '88/100', rank: 3, date: '2026-08-25' },
      { testName: 'Amazon SDE Coding Test', score: '92/100', rank: 1, date: '2026-08-26' },
      { testName: 'DSA Quantitative Round', score: '85/100', rank: 5, date: '2026-08-27' }
    ],
    applications: [
      { company: 'Google India', role: 'Associate Software Engineer', status: 'Under Review', appliedDate: '2026-08-22' },
      { company: 'TCS Digital', role: 'Digital Innovator', status: 'Shortlisted for Interview', appliedDate: '2026-08-24' },
      { company: 'Microsoft', role: 'Software Engineer Trainee', status: 'Applied', appliedDate: '2026-08-26' }
    ],
    sessionsBooked: [
      { mentorName: 'Anish Sundaram (Google SDE-3)', topic: 'System Design & DSA Strategy', scheduledTime: 'Sat, Aug 30 - 6:00 PM', status: 'Confirmed' },
      { mentorName: 'Priya Ramakrishnan (Microsoft)', topic: 'Resume Review & FAANG Strategy', scheduledTime: 'Sun, Aug 31 - 7:30 PM', status: 'Confirmed' }
    ],
    activities: [
      'Solved 5 Binary Search problems in Notes Hub',
      'Exported ATS-friendly Resume (Modern Blue)',
      'Completed 15 min Voice HR Mock Interview (Score 9/10)',
      'Booked 1-on-1 session with Anish Sundaram (Google)'
    ]
  },
  {
    id: 'std_02',
    name: 'Santhiya S',
    email: 'santhiya.s@college.edu',
    department: 'Artificial Intelligence & Data Science',
    year: '4th Year',
    status: 'Active',
    joinedDate: '2024-08-18',
    lastLogin: 'Yesterday, 10:15 PM',
    loginHistory: [
      { timestamp: '2026-08-27 10:15 PM', device: 'Safari on macOS', ip: '115.240.90.12' },
      { timestamp: '2026-08-25 02:10 PM', device: 'Chrome on macOS', ip: '115.240.90.12' }
    ],
    xpPoints: 290,
    streak: 8,
    skills: ['PyTorch (Advanced)', 'Machine Learning (Advanced)', 'FastAPI (Intermediate)', 'Pandas & NumPy (Expert)'],
    badges: [
      { name: 'AI Explorer', earnedAt: '2026-08-22', icon: '🤖' },
      { name: 'Python Master', earnedAt: '2026-08-25', icon: '🐍' }
    ],
    testsTaken: [
      { testName: 'Infosys InfyTQ Mock Test', score: '94/100', rank: 2, date: '2026-08-26' }
    ],
    applications: [
      { company: 'Flipkart', role: 'Data Scientist Intern', status: 'Shortlisted', appliedDate: '2026-08-25' }
    ],
    sessionsBooked: [
      { mentorName: 'Priya Ramakrishnan (Microsoft)', topic: 'Transitioning to Generative AI', scheduledTime: 'Sat, Aug 30 - 4:00 PM', status: 'Confirmed' }
    ],
    activities: [
      'Completed Machine Learning Mathematics Notes in Notes Hub',
      'Created Study Group "🚀 AI & Cloud Engineering Group"'
    ]
  },
  {
    id: 'std_03',
    name: 'Jayyappan K',
    email: 'jayyappan.k@college.edu',
    department: 'Electronics & Communication',
    year: '3rd Year',
    status: 'Active',
    joinedDate: '2024-09-01',
    lastLogin: 'Today, 12:40 AM',
    loginHistory: [
      { timestamp: '2026-08-28 12:40 AM', device: 'Firefox on Linux', ip: '122.164.88.45' }
    ],
    xpPoints: 210,
    streak: 5,
    skills: ['VLSI Design (Intermediate)', 'Verilog (Intermediate)', 'C++ (Advanced)', 'Embedded Systems (Beginner)'],
    badges: [
      { name: 'Hardware Hero', earnedAt: '2026-08-26', icon: '⚡' }
    ],
    testsTaken: [
      { testName: 'Texas Instruments Mock Test', score: '78/100', rank: 8, date: '2026-08-25' }
    ],
    applications: [
      { company: 'Qualcomm', role: 'Hardware Engineer Intern', status: 'Applied', appliedDate: '2026-08-27' }
    ],
    sessionsBooked: [],
    activities: [
      'Read Digital Electronics Notes (Unit 1 & 2)',
      'Generated 25 Aptitude practice questions'
    ]
  },
  {
    id: 'std_04',
    name: 'Kavitha R',
    email: 'kavitha.r@college.edu',
    department: 'Mechanical Engineering',
    year: '4th Year',
    status: 'Active',
    joinedDate: '2024-09-05',
    lastLogin: '2 days ago',
    loginHistory: [
      { timestamp: '2026-08-26 06:10 PM', device: 'Chrome on Windows 10', ip: '182.72.100.34' }
    ],
    xpPoints: 180,
    streak: 3,
    skills: ['AutoCAD (Expert)', 'SolidWorks (Advanced)', 'Thermodynamics (Advanced)', 'Python for Engineers (Beginner)'],
    badges: [
      { name: 'Design Specialist', earnedAt: '2026-08-24', icon: '⚙️' }
    ],
    testsTaken: [
      { testName: 'L&T Core Engineering Test', score: '82/100', rank: 4, date: '2026-08-24' }
    ],
    applications: [
      { company: 'Tata Motors', role: 'Graduate Engineer Trainee', status: 'Under Review', appliedDate: '2026-08-23' }
    ],
    sessionsBooked: [],
    activities: [
      'Reviewed Thermodynamics formula sheets in Notes Hub',
      'Calculated attendance bunks in Bunk Planner'
    ]
  }
]

export default function AdminPanel() {
  // ── Active Section State ──────────────────────────────────────
  const [activeSection, setActiveSection] = useState('15.1')
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [selectedStudentForModal, setSelectedStudentForModal] = useState(null)

  // ── Database State with LocalStorage Persistence ───────────────
  const [companies, setCompanies] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_companies')
      return saved ? JSON.parse(saved) : SEED_COMPANIES.slice(0, 30)
    } catch { return SEED_COMPANIES.slice(0, 30) }
  })

  const [alumniList, setAlumniList] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_alumni')
      return saved ? JSON.parse(saved) : SEED_MENTORS.slice(0, 20).map(m => ({ ...m, status: 'Verified' }))
    } catch { return SEED_MENTORS.slice(0, 20) }
  })

  const [studyGroups, setStudyGroups] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_groups')
      return saved ? JSON.parse(saved) : [
        { id: 'grp_1', name: '🚀 Full Stack & DSA Masters', members: 24, active: true, createdBy: 'Tarun Babu', topic: 'LeetCode & System Design', reports: 0 },
        { id: 'grp_2', name: '🤖 AI & Machine Learning Hub', members: 18, active: true, createdBy: 'Santhiya S', topic: 'PyTorch & NLP', reports: 0 },
        { id: 'grp_3', name: '💼 TCS & Infosys Fast-Track Prep', members: 42, active: true, createdBy: 'Arjun K', topic: 'Aptitude & Coding', reports: 1 }
      ]
    } catch { return [] }
  })

  const [aiApplyJobs, setAiApplyJobs] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_ai_apply')
      return saved ? JSON.parse(saved) : SEED_JOBS.slice(0, 15).map(j => ({ ...j, autoApplyCount: 42, verified: true }))
    } catch { return SEED_JOBS.slice(0, 15) }
  })

  const [mentorsList, setMentorsList] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_mentors')
      return saved ? JSON.parse(saved) : SEED_MENTORS.slice(0, 25).map(m => ({ ...m, status: 'Approved' }))
    } catch { return SEED_MENTORS.slice(0, 25) }
  })

  const [mockTests, setMockTests] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_mocktests')
      return saved ? JSON.parse(saved) : [
        { id: 'mt_1', name: 'TCS NQT Grand Simulation 2026', company: 'TCS', duration: '90 min', questions: 80, cutoff: '75%', attempts: 340, avgScore: '68%' },
        { id: 'mt_2', name: 'Infosys InfyTQ Round-1 Test', company: 'Infosys', duration: '60 min', questions: 40, cutoff: '70%', attempts: 280, avgScore: '71%' },
        { id: 'mt_3', name: 'Amazon SDE-1 Coding & DSA Round', company: 'Amazon', duration: '120 min', questions: 3, cutoff: '85%', attempts: 190, avgScore: '59%' },
        { id: 'mt_4', name: 'Wipro Elite National Talent Test', company: 'Wipro', duration: '60 min', questions: 50, cutoff: '65%', attempts: 210, avgScore: '74%' }
      ]
    } catch { return [] }
  })

  const [skillsList, setSkillsList] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_skills')
      return saved ? JSON.parse(saved) : SEED_SKILLS.slice(0, 20)
    } catch { return SEED_SKILLS.slice(0, 20) }
  })

  const [rolePaths, setRolePaths] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_roles')
      return saved ? JSON.parse(saved) : CAREER_ROLE_PRESETS.slice(0, 20)
    } catch { return CAREER_ROLE_PRESETS.slice(0, 20) }
  })

  const [resumeTemplates, setResumeTemplates] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_resumes')
      return saved ? JSON.parse(saved) : [
        { id: 't1', name: 'Modern Professional (Blue)', style: 'Contemporary 2-Column', atsScore: '98/100', downloads: 14200, active: true },
        { id: 't2', name: 'Minimalist Classic', style: 'Serif Elegant', atsScore: '95/100', downloads: 9800, active: true },
        { id: 't3', name: 'ATS Optimized Standard', style: 'Single Column High-Parse', atsScore: '100/100', downloads: 18500, active: true },
        { id: 't4', name: 'Creative Portfolio (Purple)', style: 'Modern Visual Accent', atsScore: '92/100', downloads: 6400, active: true },
        { id: 't5', name: 'Executive Leadership (Emerald)', style: 'Corporate Accent', atsScore: '96/100', downloads: 5200, active: true }
      ]
    } catch { return [] }
  })

  const [interviewQuestions, setInterviewQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_interviews')
      return saved ? JSON.parse(saved) : [
        { id: 'iq_1', question: 'Explain the difference between Process and Thread with memory allocation.', category: 'Operating Systems', difficulty: 'Medium', expectedTime: '3 min' },
        { id: 'iq_2', question: 'How do Virtual DOM and reconciliation work in React.js?', category: 'Web Development', difficulty: 'Medium', expectedTime: '4 min' },
        { id: 'iq_3', question: 'Tell me about a time you faced a difficult deadline in a college project.', category: 'HR Behavioral', difficulty: 'Easy', expectedTime: '2 min' },
        { id: 'iq_4', question: 'Derive time complexity for Dijkstra Algorithm using Min-Heap.', category: 'DSA', difficulty: 'Hard', expectedTime: '5 min' }
      ]
    } catch { return [] }
  })

  const [aptitudeQuestions, setAptitudeQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_aptitude')
      return saved ? JSON.parse(saved) : [
        { id: 'aq_1', q: 'A train 120m long passes a pole in 6 seconds. What is the speed of the train?', answer: '72 km/hr', category: 'Time & Distance', difficulty: 'Easy' },
        { id: 'aq_2', q: 'Find the odd one out: 3, 5, 11, 14, 17, 21', answer: '14 (Even number)', category: 'Logical Reasoning', difficulty: 'Easy' },
        { id: 'aq_3', q: 'A pipe can fill a tank in 4 hours, B in 6 hours. Both open together, time taken?', answer: '2.4 hours (2 hrs 24 mins)', category: 'Pipes & Cisterns', difficulty: 'Medium' }
      ]
    } catch { return [] }
  })

  const [studentsList, setStudentsList] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_students')
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS_DB
    } catch { return INITIAL_STUDENTS_DB }
  })

  // ── Auto-save to LocalStorage ───────────────────────────────────
  useEffect(() => {
    localStorage.setItem('campuspilot_admin_companies', JSON.stringify(companies))
    localStorage.setItem('campuspilot_admin_alumni', JSON.stringify(alumniList))
    localStorage.setItem('campuspilot_admin_groups', JSON.stringify(studyGroups))
    localStorage.setItem('campuspilot_admin_ai_apply', JSON.stringify(aiApplyJobs))
    localStorage.setItem('campuspilot_admin_mentors', JSON.stringify(mentorsList))
    localStorage.setItem('campuspilot_admin_mocktests', JSON.stringify(mockTests))
    localStorage.setItem('campuspilot_admin_skills', JSON.stringify(skillsList))
    localStorage.setItem('campuspilot_admin_roles', JSON.stringify(rolePaths))
    localStorage.setItem('campuspilot_admin_resumes', JSON.stringify(resumeTemplates))
    localStorage.setItem('campuspilot_admin_interviews', JSON.stringify(interviewQuestions))
    localStorage.setItem('campuspilot_admin_aptitude', JSON.stringify(aptitudeQuestions))
    localStorage.setItem('campuspilot_admin_students', JSON.stringify(studentsList))
  }, [companies, alumniList, studyGroups, aiApplyJobs, mentorsList, mockTests, skillsList, rolePaths, resumeTemplates, interviewQuestions, aptitudeQuestions, studentsList])

  // ── Generic CRUD Helpers ───────────────────────────────────────
  const handleDeleteItem = (listSetter, id, itemName) => {
    if (window.confirm(`Are you sure you want to delete "${itemName}"?`)) {
      listSetter(prev => prev.filter(item => item.id !== id))
      toast.success(`Deleted "${itemName}" from database.`)
    }
  }

  // ── Modals / Form Inline Inputs ────────────────────────────────
  const [showAddModal, setShowAddModal] = useState(false)
  const [formData, setFormData] = useState({})

  const handleOpenAdd = () => {
    setFormData({})
    setShowAddModal(true)
  }

  const handleSaveAdd = (e) => {
    e.preventDefault()
    const newId = `custom_${Date.now()}`
    const item = { id: newId, ...formData }

    switch (activeSection) {
      case '15.1':
        setCompanies(prev => [item, ...prev]); break
      case '15.2':
        setAlumniList(prev => [{ ...item, status: 'Verified' }, ...prev]); break
      case '15.3':
        setStudyGroups(prev => [{ ...item, members: 1, active: true, reports: 0 }, ...prev]); break
      case '15.4':
        setAiApplyJobs(prev => [{ ...item, autoApplyCount: 0, verified: true }, ...prev]); break
      case '15.5':
        setMentorsList(prev => [{ ...item, status: 'Approved', reviews: 0, sessionsConducted: 0 }, ...prev]); break
      case '15.6':
        setMockTests(prev => [{ ...item, attempts: 0, avgScore: '0%' }, ...prev]); break
      case '15.7':
        setSkillsList(prev => [item, ...prev]); break
      case '15.8':
        setRolePaths(prev => [item, ...prev]); break
      case '15.9':
        setResumeTemplates(prev => [{ ...item, downloads: 0, active: true }, ...prev]); break
      case '15.10':
        setAiApplyJobs(prev => [item, ...prev]); break
      case '15.11':
        setInterviewQuestions(prev => [item, ...prev]); break
      case '15.12':
        setAptitudeQuestions(prev => [item, ...prev]); break
      case '15.14':
        setStudentsList(prev => [{
          ...item,
          status: 'Active',
          joinedDate: new Date().toISOString().split('T')[0],
          lastLogin: 'Just now',
          xpPoints: 0,
          streak: 1,
          loginHistory: [{ timestamp: 'Just now', device: 'Web App', ip: '127.0.0.1' }],
          skills: item.skills ? item.skills.split(',').map(s => s.trim()) : [],
          badges: [],
          testsTaken: [],
          applications: [],
          sessionsBooked: [],
          activities: ['Account created by Administrator']
        }, ...prev]); break
      default: break
    }

    setShowAddModal(false)
    toast.success(`🎉 New item published successfully!`)
  }

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1250px', margin: '0 auto' }}>

      {/* ── HEADER BANNER ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #0f172a 100%)',
          border: '1px solid rgba(139,92,246,0.4)',
          borderRadius: '1.5rem', padding: '2rem', marginBottom: '1.5rem',
          boxShadow: '0 8px 32px rgba(124,58,237,0.25)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '2.5rem' }}>👑</span>
              <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '900', color: 'white', background: 'linear-gradient(135deg, #fff, #c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Enterprise Admin & Master Database Cockpit
              </h1>
            </div>
            <p style={{ color: '#c4b5fd', margin: 0, fontSize: '0.92rem' }}>
              Full database CRUD control across 14 modules: Companies, Alumni, Mentors, Tests, Skills, Roles, and Students.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)', padding: '0.35rem 0.85rem', borderRadius: '1rem', fontWeight: '800', fontSize: '0.82rem' }}>
              🟢 Full DB Access
            </span>
            <span style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)', padding: '0.35rem 0.85rem', borderRadius: '1rem', fontWeight: '800', fontSize: '0.82rem' }}>
              ⚡ 14 Modules Live
            </span>
          </div>
        </div>

        {/* Quick Database Stats Ribbon */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.6rem', marginTop: '1.25rem' }}>
          {[
            { label: 'Students', val: studentsList.length, icon: '🎓', color: '#60a5fa' },
            { label: 'Companies', val: companies.length, icon: '🏛️', color: '#f59e0b' },
            { label: 'Mentors', val: mentorsList.length, icon: '🤝', color: '#34d399' },
            { label: 'Study Groups', val: studyGroups.length, icon: '👥', color: '#a78bfa' },
            { label: 'Mock Tests', val: mockTests.length, icon: '📝', color: '#f43f5e' },
            { label: 'Job Feeds', val: aiApplyJobs.length, icon: '💼', color: '#38bdf8' }
          ].map(s => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem', padding: '0.6rem 0.8rem', textAlign: 'center' }}>
              <div style={{ color: s.color, fontWeight: '900', fontSize: '1.1rem' }}>{s.icon} {s.val}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: '600' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── SECTION NAV TABS (15.1 to 15.14) ────────────────────── */}
      <div style={{ display: 'flex', gap: '0.45rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
        {ADMIN_SECTIONS.map(sec => (
          <button
            key={sec.id}
            onClick={() => { setActiveSection(sec.id); setSearchTerm(''); setCategoryFilter('All') }}
            style={{
              flexShrink: 0,
              padding: '0.6rem 1rem',
              borderRadius: '0.75rem',
              fontWeight: '700',
              fontSize: '0.82rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              background: activeSection === sec.id ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.05)',
              color: activeSection === sec.id ? 'white' : '#94a3b8',
              border: activeSection === sec.id ? '1px solid rgba(139,92,246,0.5)' : '1px solid rgba(255,255,255,0.08)',
              transition: 'all 0.2s'
            }}
          >
            {sec.icon} {sec.label}
          </button>
        ))}
      </div>

      {/* ── CONTROLS: SEARCH & ACTIONS ───────────────────────────── */}
      {activeSection !== 'analytics' && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flex: 1, minWidth: '260px' }}>
            <input
              type="text"
              placeholder={`🔍 Search in ${ADMIN_SECTIONS.find(s => s.id === activeSection)?.label}...`}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '0.6rem', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.85rem', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleOpenAdd}
              style={{ padding: '0.65rem 1.2rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #059669, #10b981)', color: 'white', border: 'none', fontWeight: '800', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              ➕ Add New Entry
            </button>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 15.1 ARCHIVES MANAGEMENT */}
      {/* ════════════════════════════════════════════════════════════ */}
      {activeSection === '15.1' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: 'white', fontWeight: '800', margin: 0 }}>🏛️ 15.1 Company Archives Management ({companies.length} Records)</h3>
            <span className="badge badge-info">Bulk Import Ready</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: '#94a3b8' }}>
                  <th style={{ padding: '0.6rem' }}>Company</th>
                  <th style={{ padding: '0.6rem' }}>Sector</th>
                  <th style={{ padding: '0.6rem' }}>CTC Package</th>
                  <th style={{ padding: '0.6rem' }}>Roles & Skills</th>
                  <th style={{ padding: '0.6rem' }}>Hired</th>
                  <th style={{ padding: '0.6rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {companies.filter(c => !searchTerm || c.name.toLowerCase().includes(searchTerm.toLowerCase())).map(c => (
                  <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.6rem', fontWeight: '700', color: '#60a5fa' }}>{c.name}</td>
                    <td style={{ padding: '0.6rem' }}><span className="badge badge-info">{c.category}</span></td>
                    <td style={{ padding: '0.6rem', color: '#fbbf24', fontWeight: '700' }}>{c.ctcFresher || c.avgPkg}</td>
                    <td style={{ padding: '0.6rem', color: '#cbd5e1', maxWidth: '280px' }}>{c.roles}</td>
                    <td style={{ padding: '0.6rem', color: '#34d399', fontWeight: '700' }}>{c.hired || 50}+</td>
                    <td style={{ padding: '0.6rem', textAlign: 'right' }}>
                      <button onClick={() => handleDeleteItem(setCompanies, c.id, c.name)} style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.4rem', padding: '0.25rem 0.6rem', fontSize: '0.72rem', cursor: 'pointer' }}>
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 15.2 ALUMNI MANAGEMENT */}
      {/* ════════════════════════════════════════════════════════════ */}
      {activeSection === '15.2' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: 'white', fontWeight: '800', margin: 0 }}>🎓 15.2 Alumni Network Management ({alumniList.length} Alumni Mentors)</h3>
            <span className="badge badge-safe">Verified Alumni</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
            {alumniList.filter(a => !searchTerm || a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.company.toLowerCase().includes(searchTerm.toLowerCase())).map(a => (
              <div key={a.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <div style={{ fontWeight: '800', color: 'white', fontSize: '0.95rem' }}>{a.name}</div>
                    <div style={{ color: '#60a5fa', fontSize: '0.78rem', fontWeight: '600' }}>{a.role} @ {a.company}</div>
                  </div>
                  <span className="badge badge-safe">{a.status || 'Verified'}</span>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.75rem', margin: '0.4rem 0' }}>{a.bio || 'Verified college alumni offering career guidance and company referrals.'}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                  <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: '700' }}>⭐ {a.rating || 4.9} ({a.reviews || 40} reviews)</span>
                  <button onClick={() => handleDeleteItem(setAlumniList, a.id, a.name)} style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'none', borderRadius: '0.4rem', padding: '0.25rem 0.6rem', fontSize: '0.72rem', cursor: 'pointer' }}>
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 15.3 STUDY GROUPS MANAGEMENT */}
      {/* ════════════════════════════════════════════════════════════ */}
      {activeSection === '15.3' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: 'white', fontWeight: '800', margin: 0 }}>👥 15.3 Study Groups Moderation & Monitoring ({studyGroups.length} Groups)</h3>
            <span className="badge badge-info">Real-time Channels</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {studyGroups.map(grp => (
              <div key={grp.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontWeight: '800', color: 'white', fontSize: '0.95rem' }}>{grp.name}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Admin: <strong style={{ color: '#c4b5fd' }}>{grp.createdBy}</strong> • Focus: {grp.topic}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="badge badge-safe">👥 {grp.members} Members</span>
                  <span className={`badge ${grp.reports > 0 ? 'badge-danger' : 'badge-safe'}`}>{grp.reports} Flagged</span>
                  <button onClick={() => handleDeleteItem(setStudyGroups, grp.id, grp.name)} style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.4rem', padding: '0.3rem 0.7rem', fontSize: '0.75rem', cursor: 'pointer', fontWeight: '700' }}>
                    🗑️ Delete Group
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 15.4 AI APPLY MANAGEMENT */}
      {/* ════════════════════════════════════════════════════════════ */}
      {activeSection === '15.4' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: 'white', fontWeight: '800', margin: 0 }}>⚡ 15.4 AI Auto-Apply Tracker & Job Feeds ({aiApplyJobs.length} Live Openings)</h3>
            <span className="badge badge-safe">1-Click Apply Ready</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: '#94a3b8' }}>
                  <th style={{ padding: '0.6rem' }}>Company & Role</th>
                  <th style={{ padding: '0.6rem' }}>Location & CTC</th>
                  <th style={{ padding: '0.6rem' }}>Applications Sent</th>
                  <th style={{ padding: '0.6rem' }}>Verification</th>
                  <th style={{ padding: '0.6rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {aiApplyJobs.map(job => (
                  <tr key={job.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.6rem' }}>
                      <strong style={{ color: '#60a5fa' }}>{job.company}</strong>
                      <div style={{ color: '#cbd5e1', fontSize: '0.75rem' }}>{job.title || job.role}</div>
                    </td>
                    <td style={{ padding: '0.6rem' }}>
                      <div>{job.location || 'Pan India'}</div>
                      <div style={{ color: '#fbbf24', fontWeight: '700' }}>{job.salary || '4-8 LPA'}</div>
                    </td>
                    <td style={{ padding: '0.6rem', color: '#34d399', fontWeight: '700' }}>{job.autoApplyCount || 34} Students</td>
                    <td style={{ padding: '0.6rem' }}><span className="badge badge-safe">Verified Employer</span></td>
                    <td style={{ padding: '0.6rem', textAlign: 'right' }}>
                      <button onClick={() => handleDeleteItem(setAiApplyJobs, job.id, `${job.company} - ${job.title || job.role}`)} style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'none', borderRadius: '0.4rem', padding: '0.25rem 0.6rem', fontSize: '0.72rem', cursor: 'pointer' }}>
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 15.5 MENTORS MANAGEMENT */}
      {/* ════════════════════════════════════════════════════════════ */}
      {activeSection === '15.5' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: 'white', fontWeight: '800', margin: 0 }}>🤝 15.5 Industry Mentors Database & Approvals ({mentorsList.length} Mentors)</h3>
            <span className="badge badge-info">100+ Verified</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
            {mentorsList.filter(m => !searchTerm || m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.company.toLowerCase().includes(searchTerm.toLowerCase())).map(m => (
              <div key={m.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                  <div>
                    <div style={{ fontWeight: '800', color: 'white' }}>{m.name}</div>
                    <div style={{ color: '#60a5fa', fontSize: '0.78rem' }}>{m.role} @ {m.company}</div>
                  </div>
                  <span className="badge badge-safe">{m.status || 'Approved'}</span>
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginBottom: '0.5rem' }}>Exp: {m.experience} • Sessions: {m.sessionsConducted || 25}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: '700' }}>⭐ {m.rating || 4.9}</span>
                  <button onClick={() => handleDeleteItem(setMentorsList, m.id, m.name)} style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'none', borderRadius: '0.4rem', padding: '0.25rem 0.6rem', fontSize: '0.72rem', cursor: 'pointer' }}>
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 15.6 MOCK TESTS MANAGEMENT */}
      {/* ════════════════════════════════════════════════════════════ */}
      {activeSection === '15.6' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: 'white', fontWeight: '800', margin: 0 }}>📝 15.6 Company Mock Test Patterns ({mockTests.length} Simulations)</h3>
            <span className="badge badge-info">TCS / Infosys / Amazon</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {mockTests.map(test => (
              <div key={test.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontWeight: '800', color: 'white', fontSize: '0.95rem' }}>{test.name}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Duration: {test.duration} • {test.questions} Questions • Cutoff: {test.cutoff}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="badge badge-safe">{test.attempts} Attempts</span>
                  <span className="badge badge-info">Avg: {test.avgScore}</span>
                  <button onClick={() => handleDeleteItem(setMockTests, test.id, test.name)} style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: 'none', borderRadius: '0.4rem', padding: '0.3rem 0.7rem', fontSize: '0.75rem', cursor: 'pointer' }}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 15.7 SKILL HUB MANAGEMENT */}
      {/* ════════════════════════════════════════════════════════════ */}
      {activeSection === '15.7' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: 'white', fontWeight: '800', margin: 0 }}>📚 15.7 Skill Hub Modules ({skillsList.length} Skills Active)</h3>
            <span className="badge badge-info">All Academic Branches</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
            {skillsList.filter(s => !searchTerm || s.name.toLowerCase().includes(searchTerm.toLowerCase())).map(s => (
              <div key={s.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.8rem', padding: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '700', color: 'white', fontSize: '0.9rem' }}>{s.name}</div>
                  <span className="badge badge-info" style={{ fontSize: '0.68rem', marginTop: '0.2rem' }}>{s.category}</span>
                </div>
                <button onClick={() => handleDeleteItem(setSkillsList, s.id, s.name)} style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'none', borderRadius: '0.4rem', padding: '0.25rem 0.5rem', fontSize: '0.72rem', cursor: 'pointer' }}>
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 15.8 ROLE PATH MANAGEMENT */}
      {/* ════════════════════════════════════════════════════════════ */}
      {activeSection === '15.8' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: 'white', fontWeight: '800', margin: 0 }}>🗺️ 15.8 Role Paths & Roadmaps ({rolePaths.length} Presets)</h3>
            <span className="badge badge-safe">200+ Career Roles</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '0.75rem' }}>
            {rolePaths.filter(r => !searchTerm || r.title.toLowerCase().includes(searchTerm.toLowerCase())).map(r => (
              <div key={r.title} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.9rem', padding: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <div style={{ fontWeight: '800', color: 'white', fontSize: '0.9rem' }}>{r.icon} {r.title}</div>
                  <span className="badge badge-info">{r.category}</span>
                </div>
                <div style={{ color: '#cbd5e1', fontSize: '0.75rem' }}>Skills: {r.skills?.join(', ')}</div>
                <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
                  <button onClick={() => handleDeleteItem(setRolePaths, r.title, r.title)} style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'none', borderRadius: '0.4rem', padding: '0.2rem 0.5rem', fontSize: '0.7rem', cursor: 'pointer' }}>
                    🗑️ Delete Role
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 15.9 RESUME BUILDER MANAGEMENT */}
      {/* ════════════════════════════════════════════════════════════ */}
      {activeSection === '15.9' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: 'white', fontWeight: '800', margin: 0 }}>📄 15.9 ATS Resume Templates Manager</h3>
            <span className="badge badge-safe">PDF Engine Connected</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {resumeTemplates.map(tmpl => (
              <div key={tmpl.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '800', color: 'white', fontSize: '0.95rem' }}>{tmpl.name}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Layout: {tmpl.style} • ATS Parser Score: <strong style={{ color: '#34d399' }}>{tmpl.atsScore}</strong></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="badge badge-info">📥 {tmpl.downloads?.toLocaleString()} Exports</span>
                  <button onClick={() => handleDeleteItem(setResumeTemplates, tmpl.id, tmpl.name)} style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: 'none', borderRadius: '0.4rem', padding: '0.3rem 0.7rem', fontSize: '0.75rem', cursor: 'pointer' }}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 15.10 JOB PORTAL MANAGEMENT */}
      {/* ════════════════════════════════════════════════════════════ */}
      {activeSection === '15.10' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: 'white', fontWeight: '800', margin: 0 }}>💼 15.10 Job Portal & Employer Verification ({aiApplyJobs.length} Jobs)</h3>
            <span className="badge badge-safe">Scam Filter Active</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {aiApplyJobs.map(j => (
              <div key={j.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.8rem', padding: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '800', color: '#60a5fa' }}>{j.company} — {j.title || j.role}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>📍 {j.location} • 💰 {j.salary} • Status: <span style={{ color: '#34d399', fontWeight: 'bold' }}>Verified Official</span></div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleDeleteItem(setAiApplyJobs, j.id, `${j.company} - ${j.title || j.role}`)} style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'none', borderRadius: '0.4rem', padding: '0.25rem 0.6rem', fontSize: '0.72rem', cursor: 'pointer' }}>
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 15.11 MOCK INTERVIEW QUESTION BANK */}
      {/* ════════════════════════════════════════════════════════════ */}
      {activeSection === '15.11' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: 'white', fontWeight: '800', margin: 0 }}>🎤 15.11 AI Mock Interview Question Bank ({interviewQuestions.length} Questions)</h3>
            <span className="badge badge-info">Voice Enabled</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {interviewQuestions.map(iq => (
              <div key={iq.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.9rem', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                  <div style={{ fontWeight: '700', color: 'white', fontSize: '0.92rem' }}>Q: {iq.question}</div>
                  <span className="badge badge-info">{iq.category}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                  <span style={{ color: '#fbbf24', fontSize: '0.75rem' }}>Difficulty: {iq.difficulty} • Expected: {iq.expectedTime}</span>
                  <button onClick={() => handleDeleteItem(setInterviewQuestions, iq.id, iq.question)} style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'none', borderRadius: '0.4rem', padding: '0.2rem 0.6rem', fontSize: '0.72rem', cursor: 'pointer' }}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 15.12 APTITUDE TEST BANK */}
      {/* ════════════════════════════════════════════════════════════ */}
      {activeSection === '15.12' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: 'white', fontWeight: '800', margin: 0 }}>🧠 15.12 Aptitude Master Question Bank ({aptitudeQuestions.length} Questions)</h3>
            <span className="badge badge-info">Quantitative & Logical</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {aptitudeQuestions.map(aq => (
              <div key={aq.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.9rem', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                  <div style={{ fontWeight: '700', color: 'white', fontSize: '0.92rem' }}>Q: {aq.q}</div>
                  <span className="badge badge-info">{aq.category}</span>
                </div>
                <div style={{ color: '#34d399', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.4rem' }}>Answer: {aq.answer}</div>
                <div style={{ textAlign: 'right' }}>
                  <button onClick={() => handleDeleteItem(setAptitudeQuestions, aq.id, aq.q)} style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'none', borderRadius: '0.4rem', padding: '0.2rem 0.6rem', fontSize: '0.72rem', cursor: 'pointer' }}>
                    🗑️ Delete Question
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 15.13 NOTES HUB MANAGEMENT */}
      {/* ════════════════════════════════════════════════════════════ */}
      {activeSection === '15.13' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: 'white', fontWeight: '800', margin: 0 }}>✏️ 15.13 Notes Hub Manager (100,000+ Algorithmic Engine)</h3>
            <span className="badge badge-safe">17 Academic Streams</span>
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>
            Notes Hub is dynamically powered by the <strong>100,000+ Notes Algorithmic Engine</strong> with full PDF export, flashcard studio, and exam question bank. You can also inject custom faculty lecture notes using the <strong>Add New Entry</strong> button above!
          </p>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 15.14 STUDENT DATABASE — FULL INSPECTOR MODAL */}
      {/* ════════════════════════════════════════════════════════════ */}
      {activeSection === '15.14' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ color: 'white', fontWeight: '800', margin: 0 }}>👑 15.14 Registered Students Master Directory ({studentsList.length} Students)</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: 0 }}>Click "🔍 Inspect Student Profile" on any row to view complete login history, tests, badges, and booked sessions.</p>
            </div>
            <span className="badge badge-safe">Full Student Profiling</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: '#94a3b8' }}>
                  <th style={{ padding: '0.6rem' }}>Student Name</th>
                  <th style={{ padding: '0.6rem' }}>Email</th>
                  <th style={{ padding: '0.6rem' }}>Department & Year</th>
                  <th style={{ padding: '0.6rem' }}>XP Points / Streak</th>
                  <th style={{ padding: '0.6rem' }}>Last Login</th>
                  <th style={{ padding: '0.6rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentsList.filter(st => !searchTerm || st.name.toLowerCase().includes(searchTerm.toLowerCase()) || st.department.toLowerCase().includes(searchTerm.toLowerCase())).map(st => (
                  <tr key={st.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.6rem', fontWeight: '800', color: 'white' }}>{st.name}</td>
                    <td style={{ padding: '0.6rem', color: '#94a3b8' }}>{st.email}</td>
                    <td style={{ padding: '0.6rem' }}>
                      <span className="badge badge-info">{st.department}</span>
                      <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>{st.year}</div>
                    </td>
                    <td style={{ padding: '0.6rem' }}>
                      <span style={{ color: '#fbbf24', fontWeight: '800' }}>⚡ {st.xpPoints || 0} XP</span>
                      <div style={{ color: '#f43f5e', fontSize: '0.72rem' }}>🔥 {st.streak || 0} days</div>
                    </td>
                    <td style={{ padding: '0.6rem', color: '#34d399' }}>{st.lastLogin || 'Recent'}</td>
                    <td style={{ padding: '0.6rem', textAlign: 'right' }}>
                      <button
                        onClick={() => setSelectedStudentForModal(st)}
                        style={{ padding: '0.35rem 0.8rem', borderRadius: '0.4rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', border: 'none', fontWeight: '700', fontSize: '0.75rem', cursor: 'pointer', marginRight: '0.4rem' }}
                      >
                        🔍 Inspect Profile
                      </button>
                      <button
                        onClick={() => handleDeleteItem(setStudentsList, st.id, st.name)}
                        style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'none', borderRadius: '0.4rem', padding: '0.35rem 0.6rem', fontSize: '0.75rem', cursor: 'pointer' }}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* CAMPUS ANALYTICS TAB */}
      {/* ════════════════════════════════════════════════════════════ */}
      {activeSection === 'analytics' && (
        <StudentAnalytics />
      )}

      {/* ── STUDENT PROFILE INSPECTOR MODAL ───────────────────────── */}
      <AnimatePresence>
        {selectedStudentForModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setSelectedStudentForModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)', border: '1px solid rgba(139,92,246,0.5)', borderRadius: '1.5rem', padding: '2rem', maxWidth: '750px', width: '100%', maxHeight: '85vh', overflowY: 'auto' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.4rem', margin: 0 }}>
                    👑 {selectedStudentForModal.name} — Full Student Profile
                  </h2>
                  <div style={{ color: '#c4b5fd', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                    {selectedStudentForModal.email} • {selectedStudentForModal.department} ({selectedStudentForModal.year})
                  </div>
                </div>
                <button onClick={() => setSelectedStudentForModal(null)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
              </div>

              {/* Grid Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.75rem', textAlign: 'center' }}>
                  <div style={{ color: '#fbbf24', fontWeight: '900', fontSize: '1.3rem' }}>⚡ {selectedStudentForModal.xpPoints} XP</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Total Experience</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.75rem', textAlign: 'center' }}>
                  <div style={{ color: '#f43f5e', fontWeight: '900', fontSize: '1.3rem' }}>🔥 {selectedStudentForModal.streak} Days</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Current Streak</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.75rem', textAlign: 'center' }}>
                  <div style={{ color: '#34d399', fontWeight: '900', fontSize: '1.3rem' }}>🏆 {selectedStudentForModal.badges?.length || 0}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Earned Badges</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.75rem', textAlign: 'center' }}>
                  <div style={{ color: '#60a5fa', fontWeight: '900', fontSize: '1.3rem' }}>💼 {selectedStudentForModal.applications?.length || 0}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Job Applications</div>
                </div>
              </div>

              {/* Skills */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ color: '#a78bfa', fontWeight: '800', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🔧 Mastered Skills:</h4>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {selectedStudentForModal.skills?.map((s, i) => (
                    <span key={i} className="badge badge-info">{s}</span>
                  ))}
                </div>
              </div>

              {/* Badges Earned */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ color: '#a78bfa', fontWeight: '800', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🏆 Badges Earned:</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {selectedStudentForModal.badges?.map((b, i) => (
                    <div key={i} style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '0.6rem', padding: '0.35rem 0.75rem', fontSize: '0.78rem', color: '#fbbf24', fontWeight: '700' }}>
                      {b.icon} {b.name} <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>({b.earnedAt})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tests Taken */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ color: '#a78bfa', fontWeight: '800', fontSize: '0.9rem', marginBottom: '0.5rem' }}>📝 Mock Tests & Exam Scores:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {selectedStudentForModal.testsTaken?.map((t, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', padding: '0.5rem 0.8rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span style={{ color: 'white', fontWeight: '600' }}>{t.testName}</span>
                      <span style={{ color: '#34d399', fontWeight: '800' }}>Score: {t.score} (Rank #{t.rank})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Job Applications */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ color: '#a78bfa', fontWeight: '800', fontSize: '0.9rem', marginBottom: '0.5rem' }}>💼 Job & Internship Applications:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {selectedStudentForModal.applications?.map((app, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', padding: '0.5rem 0.8rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <div>
                        <strong style={{ color: '#60a5fa' }}>{app.company}</strong> — <span style={{ color: '#cbd5e1' }}>{app.role}</span>
                      </div>
                      <span className="badge badge-safe">{app.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sessions Booked */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ color: '#a78bfa', fontWeight: '800', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🤝 Booked Mentor Sessions:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {selectedStudentForModal.sessionsBooked?.map((sess, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', padding: '0.5rem 0.8rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <div>
                        <strong style={{ color: '#34d399' }}>{sess.mentorName}</strong>
                        <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>{sess.topic} • 🕒 {sess.scheduledTime}</div>
                      </div>
                      <span className="badge badge-safe">{sess.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Login History */}
              <div>
                <h4 style={{ color: '#a78bfa', fontWeight: '800', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🔒 Device & Login History:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {selectedStudentForModal.loginHistory?.map((log, i) => (
                    <div key={i} style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '0.4rem', padding: '0.4rem 0.7rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8' }}>
                      <span>🕒 {log.timestamp}</span>
                      <span>💻 {log.device}</span>
                      <span>🌐 IP: {log.ip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── GENERIC ADD ITEM MODAL ─────────────────────────────────── */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)', border: '1px solid rgba(139,92,246,0.5)', borderRadius: '1.5rem', padding: '2rem', maxWidth: '560px', width: '100%' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ color: 'white', fontWeight: '800', margin: 0 }}>
                  ➕ Add New to {ADMIN_SECTIONS.find(s => s.id === activeSection)?.label}
                </h3>
                <button onClick={() => setShowAddModal(false)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}>✕</button>
              </div>

              <form onSubmit={handleSaveAdd} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <label style={{ color: '#c4b5fd', fontSize: '0.8rem', fontWeight: '700' }}>Title / Name / Header:</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter name or title..."
                    value={formData.name || formData.title || ''}
                    onChange={e => setFormData({ ...formData, name: e.target.value, title: e.target.value })}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '0.6rem', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.85rem', outline: 'none', marginTop: '0.2rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div>
                    <label style={{ color: '#c4b5fd', fontSize: '0.8rem', fontWeight: '700' }}>Category / Department / Company:</label>
                    <input
                      type="text"
                      placeholder="e.g. Computer Science / IT"
                      value={formData.category || formData.department || formData.company || ''}
                      onChange={e => setFormData({ ...formData, category: e.target.value, department: e.target.value, company: e.target.value })}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '0.6rem', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.85rem', outline: 'none', marginTop: '0.2rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ color: '#c4b5fd', fontSize: '0.8rem', fontWeight: '700' }}>Package / Role / Year:</label>
                    <input
                      type="text"
                      placeholder="e.g. 6-12 LPA / 4th Year"
                      value={formData.ctcFresher || formData.salary || formData.role || formData.year || ''}
                      onChange={e => setFormData({ ...formData, ctcFresher: e.target.value, salary: e.target.value, role: e.target.value, year: e.target.value })}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '0.6rem', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.85rem', outline: 'none', marginTop: '0.2rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ color: '#c4b5fd', fontSize: '0.8rem', fontWeight: '700' }}>Description / Details / Skills:</label>
                  <textarea
                    rows={3}
                    placeholder="Enter detailed content, required skills, syllabus details..."
                    value={formData.details || formData.description || formData.roles || ''}
                    onChange={e => setFormData({ ...formData, details: e.target.value, description: e.target.value, roles: e.target.value })}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '0.6rem', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.85rem', outline: 'none', marginTop: '0.2rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button type="submit" style={{ padding: '0.75rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #059669, #10b981)', color: 'white', fontWeight: '800', border: 'none', cursor: 'pointer' }}>
                    Publish to Database 🚀
                  </button>
                  <button type="button" onClick={() => setShowAddModal(false)} style={{ padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.06)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
