import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import { SEED_COMPANIES } from '../../data/seedCompanies'
import { SEED_MENTORS } from '../../data/seedMentors'
import { CAREER_ROLE_PRESETS } from '../../data/seedRoles'
import { SEED_SKILLS } from '../../data/seedSkills'
import { SEED_JOBS } from '../../data/seedJobs'
import StudentAnalytics from './StudentAnalytics'

// ── ADMIN CREDENTIALS CONSTANTS ─────────────────────────────────
const ADMIN_EMAIL = 'tarunibabu2006@gmail.com'
const ADMIN_PASS = 'prawinkumar_0704'

// ── NAVIGATION SECTIONS (1 to 15) ───────────────────────────────
const SECTIONS = [
  { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
  { id: 'students', label: '👥 Students', icon: '👥' },
  { id: 'skills', label: '📚 Skills', icon: '📚' },
  { id: 'jobs', label: '💼 Jobs', icon: '💼' },
  { id: 'notes', label: '📝 Notes', icon: '📝' },
  { id: 'companies', label: '🏢 Companies', icon: '🏢' },
  { id: 'mentors', label: '👨‍🏫 Mentors', icon: '👨‍🏫' },
  { id: 'tests', label: '🎯 Tests', icon: '🎯' },
  { id: 'ai_apply', label: '🤖 AI Apply', icon: '🤖' },
  { id: 'archive', label: '📦 Archive', icon: '📦' },
  { id: 'alumni', label: '🎓 Alumni', icon: '🎓' },
  { id: 'groups', label: '👥 Groups', icon: '👥' },
  { id: 'resumes', label: '📄 Resumes', icon: '📄' },
  { id: 'rolepath', label: '🎯 Role Path', icon: '🎯' },
  { id: 'settings', label: '⚙️ Settings', icon: '⚙️' }
]

// ── INITIAL RICH STUDENTS DATA ──────────────────────────────────
const INITIAL_STUDENTS = [
  {
    id: 's1',
    name: 'Rahul Kumar',
    email: 'rahul@email.com',
    department: 'Computer Science',
    year: '3rd Year',
    loginCount: 45,
    joined: 'Jan 15, 2024',
    lastLogin: 'Today, 10:30 AM',
    skills: ['Python', 'Java', 'SQL', 'React', 'Node.js', 'Docker', 'AWS', 'DSA', 'Git', 'MongoDB', 'C++', 'System Design'],
    achievements: [
      { name: 'Python Master', status: 'Earned', date: 'Jan 2024', unlocked: true },
      { name: 'React Master', status: 'Earned', date: 'Feb 2024', unlocked: true },
      { name: 'Interview Pro', status: '3/5 interviews completed', date: 'In Progress', unlocked: false }
    ],
    activityLog: [
      { time: 'Today 10:30', text: 'Logged In' },
      { time: 'Today 09:15', text: 'Completed Mock Interview (Score 9/10)' },
      { time: 'Yesterday 16:00', text: 'Applied for SDE-1 at Amazon' },
      { time: 'Yesterday 14:20', text: 'Completed Python Test (Score 95%)' }
    ],
    stats: {
      totalLogins: 45,
      coursesCompleted: 12,
      testsTaken: 8,
      jobsApplied: 15,
      xpPoints: 1250,
      badgesEarned: 3,
      currentStreak: 5
    }
  },
  {
    id: 's2',
    name: 'Priya Sundar',
    email: 'priya@email.com',
    department: 'Electronics & Communication',
    year: '2nd Year',
    loginCount: 32,
    joined: 'Feb 10, 2024',
    lastLogin: 'Yesterday, 04:15 PM',
    skills: ['C++', 'Python', 'Digital Electronics', 'Verilog', 'VLSI', 'SQL'],
    achievements: [
      { name: 'Hardware Hero', status: 'Earned', date: 'Feb 2024', unlocked: true },
      { name: 'Python Master', status: 'Earned', date: 'Mar 2024', unlocked: true }
    ],
    activityLog: [
      { time: 'Yesterday 04:15', text: 'Logged In' },
      { time: 'Yesterday 02:30', text: 'Reviewed VLSI Lecture Notes' }
    ],
    stats: {
      totalLogins: 32,
      coursesCompleted: 8,
      testsTaken: 5,
      jobsApplied: 6,
      xpPoints: 890,
      badgesEarned: 2,
      currentStreak: 4
    }
  },
  {
    id: 's3',
    name: 'Amit Ram',
    email: 'amit@email.com',
    department: 'Mechanical Engineering',
    year: '4th Year',
    loginCount: 28,
    joined: 'Mar 01, 2024',
    lastLogin: '2 days ago',
    skills: ['AutoCAD', 'SolidWorks', 'Thermodynamics', 'Fluid Mechanics', 'Python'],
    achievements: [
      { name: 'Design Specialist', status: 'Earned', date: 'Mar 2024', unlocked: true }
    ],
    activityLog: [
      { time: '2 days ago', text: 'Calculated Bunk Attendance' }
    ],
    stats: {
      totalLogins: 28,
      coursesCompleted: 6,
      testsTaken: 4,
      jobsApplied: 9,
      xpPoints: 650,
      badgesEarned: 1,
      currentStreak: 2
    }
  },
  {
    id: 's4',
    name: 'Tarun Babu',
    email: 'tarun.babu@college.edu',
    department: 'Computer Science & Engineering',
    year: '4th Year',
    loginCount: 68,
    joined: 'Jan 05, 2024',
    lastLogin: 'Today, 01:45 AM',
    skills: ['React.js', 'Node.js', 'Python', 'SQL', 'FastAPI', 'DSA', 'Docker', 'AWS'],
    achievements: [
      { name: 'Python Master', status: 'Earned', date: 'Jan 2024', unlocked: true },
      { name: 'React Master', status: 'Earned', date: 'Feb 2024', unlocked: true },
      { name: 'Interview Pro', status: 'Earned', date: 'Mar 2024', unlocked: true }
    ],
    activityLog: [
      { time: 'Today 01:45', text: 'Exported ATS Resume PDF' },
      { time: 'Today 01:10', text: 'Downloaded 5 Study Notes' }
    ],
    stats: {
      totalLogins: 68,
      coursesCompleted: 18,
      testsTaken: 14,
      jobsApplied: 24,
      xpPoints: 1850,
      badgesEarned: 5,
      currentStreak: 15
    }
  }
]

export default function AdminPanel() {
  const { user, login } = useAuth()
  
  // ── ADMIN AUTH STATE ──────────────────────────────────────────
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('campuspilot_admin_auth') === 'true' || user?.email === ADMIN_EMAIL || user?.role === 'admin'
  })
  const [authEmail, setAuthEmail] = useState(ADMIN_EMAIL)
  const [authPassword, setAuthPassword] = useState('')

  // ── ACTIVE NAVIGATION TAB ─────────────────────────────────────
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  // ── MODALS STATE ──────────────────────────────────────────────
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [modalMode, setModalMode] = useState(null) // 'add_student', 'edit_student', 'add_skill', 'add_job', 'add_note', 'add_company', 'add_mentor', 'add_test', 'add_alumni', 'add_role'
  const [modalForm, setModalForm] = useState({})

  // ── DATABASE STORES WITH LOCALSTORAGE SYNC ─────────────────────
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_students_db')
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS
    } catch { return INITIAL_STUDENTS }
  })

  const [skills, setSkills] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_skills_db')
      return saved ? JSON.parse(saved) : [
        { id: 'sk1', name: 'Python', category: 'Programming', level: 'Adv', duration: '3 months', prereq: 'Basic Logic', courses: 45, students: 234, relatedRoles: 'Data Analyst, AI Engineer, Backend Dev' },
        { id: 'sk2', name: 'React.js', category: 'Web Dev', level: 'Adv', duration: '2 months', prereq: 'JavaScript ES6', courses: 32, students: 189, relatedRoles: 'Frontend Developer, Full Stack' },
        { id: 'sk3', name: 'SQL', category: 'Database', level: 'Int', duration: '1.5 months', prereq: 'None', courses: 28, students: 156, relatedRoles: 'Data Analyst, Database Admin' },
        { id: 'sk4', name: 'Docker', category: 'DevOps', level: 'Int', duration: '1 month', prereq: 'Linux Basics', courses: 15, students: 89, relatedRoles: 'DevOps Engineer, Cloud Architect' },
        { id: 'sk5', name: 'Data Structures & Algorithms', category: 'Programming', level: 'Adv', duration: '4 months', prereq: 'C++ or Java', courses: 60, students: 410, relatedRoles: 'Software Engineer, SDE-1' }
      ]
    } catch { return [] }
  })

  const [jobs, setJobs] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_jobs_db')
      return saved ? JSON.parse(saved) : [
        { id: 'jb1', company: 'Google', role: 'SDE-1', ctc: '18-32 LPA', location: 'Bengaluru', experience: 'Fresher', applied: 45, status: 'Active', applyLink: 'https://careers.google.com' },
        { id: 'jb2', company: 'Amazon', role: 'Data Analyst', ctc: '14-22 LPA', location: 'Hyderabad', experience: '0-1 yr', applied: 32, status: 'Active', applyLink: 'https://amazon.jobs' },
        { id: 'jb3', company: 'TCS', role: 'Ninja & Digital', ctc: '3.6-7.5 LPA', location: 'Pan India', experience: 'Fresher', applied: 89, status: 'Active', applyLink: 'https://nextstep.tcs.com' },
        { id: 'jb4', company: 'Infosys', role: 'Power Programmer', ctc: '6-9.5 LPA', location: 'Bengaluru', experience: 'Fresher', applied: 54, status: 'Active', applyLink: 'https://infosys.com' }
      ]
    } catch { return [] }
  })

  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_notes_db')
      return saved ? JSON.parse(saved) : [
        { id: 'nt1', title: 'DSA Complete Guide', category: 'CSE', subject: 'Data Structures', level: 'Adv', readTime: '15 min', rating: '4.9/5', content: 'Comprehensive notes covering Arrays, Trees, Graphs, DP, and greedy algorithms with code.' },
        { id: 'nt2', title: 'DBMS Handbook & SQL', category: 'CSE', subject: 'DBMS', level: 'Int', readTime: '12 min', rating: '4.8/5', content: 'Relational algebra, normal forms 1NF to BCNF, SQL transactions, ACID, indexing.' },
        { id: 'nt3', title: 'Operating Systems Deep Dive', category: 'CSE', subject: 'Operating Systems', level: 'Int', readTime: '10 min', rating: '4.7/5', content: 'Process management, CPU scheduling algorithms, Deadlocks, Paging, Virtual Memory.' },
        { id: 'nt4', title: 'Digital Electronics & Logic', category: 'ECE', subject: 'Digital Circuits', level: 'Beg', readTime: '8 min', rating: '4.8/5', content: 'Boolean algebra, logic gates, flip-flops, multiplexers, counters, and registers.' }
      ]
    } catch { return [] }
  })

  const [companies, setCompanies] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_companies_db')
      return saved ? JSON.parse(saved) : [
        { id: 'cp1', name: 'Google', industry: 'Tech/Product', ctc: '18-32 LPA', students: 45, isArchived: true, hq: 'Bengaluru' },
        { id: 'cp2', name: 'TCS', industry: 'IT Services', ctc: '3.6-7.5 LPA', students: 234, isArchived: true, hq: 'Mumbai' },
        { id: 'cp3', name: 'ONGC', industry: 'Oil & Gas / PSU', ctc: '8-14 LPA', students: 56, isArchived: true, hq: 'Dehradun' },
        { id: 'cp4', name: 'Microsoft', industry: 'Tech/Product', ctc: '16-30 LPA', students: 38, isArchived: true, hq: 'Hyderabad' },
        { id: 'cp5', name: 'Flipkart', industry: 'E-Commerce', ctc: '14-26 LPA', students: 42, isArchived: true, hq: 'Bengaluru' }
      ]
    } catch { return [] }
  })

  const [mentors, setMentors] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_mentors_db')
      return saved ? JSON.parse(saved) : [
        { id: 'm1', name: 'Siddharth S', company: 'Google', role: 'Sr. SWE', sessions: '85+', rating: 4.9, email: 'siddharth@google.com' },
        { id: 'm2', name: 'Deepika S', company: 'Microsoft', role: 'Lead Data Sci', sessions: '95+', rating: 4.9, email: 'deepika@microsoft.com' },
        { id: 'm3', name: 'Vikram N', company: 'Zoho', role: 'Full Stack Staff', sessions: '150+', rating: 4.8, email: 'vikram@zoho.com' }
      ]
    } catch { return [] }
  })

  const [mentorRequests, setMentorRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_mentor_reqs_db')
      return saved ? JSON.parse(saved) : [
        { id: 'mr1', student: 'Rahul K', mentor: 'Siddharth S (Google)', status: 'Pending', date: 'Today, 10:30 AM' },
        { id: 'mr2', student: 'Priya S', mentor: 'Deepika S (Microsoft)', status: 'Accepted', date: 'Yesterday' },
        { id: 'mr3', student: 'Amit R', mentor: 'Vikram N (Zoho)', status: 'Rejected', date: '2 days ago' }
      ]
    } catch { return [] }
  })

  const [tests, setTests] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_tests_db')
      return saved ? JSON.parse(saved) : [
        { id: 't1', name: 'Aptitude Master Test 1', type: 'Aptitude', questions: 50, duration: '60 min', students: 234, cutoff: '75%' },
        { id: 't2', name: 'TCS NQT Full Mock Test', type: 'Company Pattern', questions: 80, duration: '90 min', students: 156, cutoff: '70%' },
        { id: 't3', name: 'DSA & Algorithms Quiz 1', type: 'Skill Assessment', questions: 20, duration: '30 min', students: 89, cutoff: '80%' }
      ]
    } catch { return [] }
  })

  const [aiApplications, setAiApplications] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_applications_db')
      return saved ? JSON.parse(saved) : [
        { id: 'ap1', student: 'Rahul K', company: 'Google', role: 'SDE-1', status: 'Applied', date: 'Today' },
        { id: 'ap2', student: 'Priya S', company: 'Amazon', role: 'Data Analyst', status: 'Shortlisted', date: 'Yesterday' },
        { id: 'ap3', student: 'Amit R', company: 'TCS', role: 'Ninja', status: 'Rejected', date: '2 days ago' },
        { id: 'ap4', student: 'Tarun Babu', company: 'Microsoft', role: 'Software Engineer', status: 'Shortlisted', date: 'Today' }
      ]
    } catch { return [] }
  })

  const [alumni, setAlumni] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_alumni_db')
      return saved ? JSON.parse(saved) : [
        { id: 'al1', name: 'Karthik S', company: 'Zoho', role: 'Sr. Developer', year: '2024', dept: 'CSE' },
        { id: 'al2', name: 'Ananya R', company: 'TCS', role: 'Digital Engineer', year: '2024', dept: 'IT' },
        { id: 'al3', name: 'Mohammed R', company: 'Amazon', role: 'SDE-2', year: '2022', dept: 'CSE' }
      ]
    } catch { return [] }
  })

  const [studyGroups, setStudyGroups] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_studygroups_db')
      return saved ? JSON.parse(saved) : [
        { id: 'g1', name: 'DSA Masters Room', members: 12, streak: 12, active: '4/4 active', admin: 'Arjun K' },
        { id: 'g2', name: 'Python AI Squad', members: 8, streak: 8, active: '3/4 active', admin: 'Santhiya S' },
        { id: 'g3', name: 'Interview Pro Guild', members: 15, streak: 5, active: '4/4 active', admin: 'Tarun B' }
      ]
    } catch { return [] }
  })

  const [resumes, setResumes] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_resumes_db')
      return saved ? JSON.parse(saved) : [
        { id: 'res1', student: 'Rahul K', template: 'Professional Modern', score: '85%', downloads: 12 },
        { id: 'res2', student: 'Priya S', template: 'Minimalist Classic', score: '78%', downloads: 8 },
        { id: 'res3', student: 'Amit R', template: 'ATS-Optimized Standard', score: '92%', downloads: 15 },
        { id: 'res4', student: 'Tarun Babu', template: 'ATS-Optimized Standard', score: '98%', downloads: 22 }
      ]
    } catch { return [] }
  })

  const [rolePaths, setRolePaths] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_admin_rolepaths_db')
      return saved ? JSON.parse(saved) : [
        { id: 'rp1', name: 'Frontend Developer', category: 'Tech', skills: 15, students: 234, salary: '₹6–14 LPA' },
        { id: 'rp2', name: 'Data Scientist & ML Engineer', category: 'Data', skills: 18, students: 156, salary: '₹8–18 LPA' },
        { id: 'rp3', name: 'Product Marketing Manager', category: 'Business', skills: 12, students: 89, salary: '₹7–15 LPA' }
      ]
    } catch { return [] }
  })

  // ── SYNC TO LOCALSTORAGE ───────────────────────────────────────
  useEffect(() => {
    localStorage.setItem('campuspilot_admin_students_db', JSON.stringify(students))
    localStorage.setItem('campuspilot_admin_skills_db', JSON.stringify(skills))
    localStorage.setItem('campuspilot_admin_jobs_db', JSON.stringify(jobs))
    localStorage.setItem('campuspilot_admin_notes_db', JSON.stringify(notes))
    localStorage.setItem('campuspilot_admin_companies_db', JSON.stringify(companies))
    localStorage.setItem('campuspilot_admin_mentors_db', JSON.stringify(mentors))
    localStorage.setItem('campuspilot_admin_mentor_reqs_db', JSON.stringify(mentorRequests))
    localStorage.setItem('campuspilot_admin_tests_db', JSON.stringify(tests))
    localStorage.setItem('campuspilot_admin_applications_db', JSON.stringify(aiApplications))
    localStorage.setItem('campuspilot_admin_alumni_db', JSON.stringify(alumni))
    localStorage.setItem('campuspilot_admin_studygroups_db', JSON.stringify(studyGroups))
    localStorage.setItem('campuspilot_admin_resumes_db', JSON.stringify(resumes))
    localStorage.setItem('campuspilot_admin_rolepaths_db', JSON.stringify(rolePaths))
  }, [students, skills, jobs, notes, companies, mentors, mentorRequests, tests, aiApplications, alumni, studyGroups, resumes, rolePaths])

  // ── ADMIN LOGIN HANDLER ───────────────────────────────────────
  const handleAdminLogin = (e) => {
    e.preventDefault()
    if (authEmail === ADMIN_EMAIL && authPassword === ADMIN_PASS) {
      setIsAdminAuthenticated(true)
      localStorage.setItem('campuspilot_admin_auth', 'true')
      toast.success('👑 Welcome back, Administrator!')
    } else {
      toast.error('Invalid Admin Credentials! (Use tarunibabu2006@gmail.com / prawinkumar_0704)')
    }
  }

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false)
    localStorage.removeItem('campuspilot_admin_auth')
    toast.success('Admin logged out.')
  }

  // ── DELETE GENERIC HANDLER ────────────────────────────────────
  const handleDelete = (setter, id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setter(prev => prev.filter(item => item.id !== id))
      toast.success(`Deleted "${name}"`)
    }
  }

  // ── EXPORT CSV HELPER ─────────────────────────────────────────
  const handleExportCSV = (data, filename) => {
    if (!data || !data.length) {
      toast.error('No data to export!')
      return
    }
    const headers = Object.keys(data[0]).join(',')
    const rows = data.map(obj => Object.values(obj).map(v => typeof v === 'object' ? JSON.stringify(v).replace(/,/g, ';') : `"${v}"`).join(','))
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `${filename}_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success(`📥 Exported ${filename}.csv`)
  }

  // ── SAVE MODAL HANDLER ────────────────────────────────────────
  const handleSaveModal = (e) => {
    e.preventDefault()
    const id = modalForm.id || `custom_${Date.now()}`
    const item = { ...modalForm, id }

    if (modalMode === 'add_student' || modalMode === 'edit_student') {
      if (modalMode === 'edit_student') {
        setStudents(prev => prev.map(s => s.id === item.id ? { ...s, ...item } : s))
      } else {
        setStudents(prev => [{
          ...item,
          loginCount: 1,
          joined: 'Today',
          lastLogin: 'Just now',
          skills: item.skillsInput ? item.skillsInput.split(',').map(s => s.trim()) : ['Python', 'SQL'],
          achievements: [],
          activityLog: [{ time: 'Just now', text: 'Account registered by Administrator' }],
          stats: { totalLogins: 1, coursesCompleted: 0, testsTaken: 0, jobsApplied: 0, xpPoints: 100, badgesEarned: 0, currentStreak: 1 }
        }, ...prev])
      }
    } else if (modalMode === 'add_skill') {
      setSkills(prev => [{ ...item, courses: 10, students: 0 }, ...prev])
    } else if (modalMode === 'add_job') {
      setJobs(prev => [{ ...item, applied: 0, status: 'Active' }, ...prev])
    } else if (modalMode === 'add_note') {
      setNotes(prev => [{ ...item, rating: '5.0/5' }, ...prev])
    } else if (modalMode === 'add_company') {
      setCompanies(prev => [{ ...item, students: 0, isArchived: true }, ...prev])
    } else if (modalMode === 'add_mentor') {
      setMentors(prev => [{ ...item, sessions: '0', rating: 5.0 }, ...prev])
    } else if (modalMode === 'add_test') {
      setTests(prev => [{ ...item, students: 0 }, ...prev])
    } else if (modalMode === 'add_alumni') {
      setAlumni(prev => [item, ...prev])
    } else if (modalMode === 'add_role') {
      setRolePaths(prev => [{ ...item, students: 0 }, ...prev])
    }

    setModalMode(null)
    setModalForm({})
    toast.success('Saved to Database! 🚀')
  }

  // ══════════════════════════════════════════════════════════════
  // IF NOT AUTHENTICATED AS ADMIN: SHOW ADMIN LOGIN SCREEN
  // ══════════════════════════════════════════════════════════════
  if (!isAdminAuthenticated) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '1.5rem', padding: '2.5rem', maxWidth: '440px', width: '100%', boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '3rem' }}>👑</span>
            <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.6rem', margin: '0.5rem 0 0.2rem' }}>Admin Access Only</h2>
            <p style={{ color: '#c4b5fd', fontSize: '0.85rem' }}>Enter authorized administrator credentials to unlock the master database.</p>
          </div>

          <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '700' }}>Admin Email</label>
              <input
                type="email"
                className="form-input"
                value={authEmail}
                onChange={e => setAuthEmail(e.target.value)}
                required
                style={{ width: '100%', marginTop: '0.3rem' }}
              />
            </div>
            <div>
              <label style={{ color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '700' }}>Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••••••"
                value={authPassword}
                onChange={e => setAuthPassword(e.target.value)}
                required
                style={{ width: '100%', marginTop: '0.3rem' }}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full" style={{ padding: '0.8rem', fontWeight: '800', fontSize: '0.95rem', marginTop: '0.5rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
              Unlock Admin Panel 🚀
            </button>
          </form>

          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '0.8rem', marginTop: '1.25rem', fontSize: '0.75rem', color: '#94a3b8' }}>
            <div><strong>Master Admin:</strong> {ADMIN_EMAIL}</div>
            <div><strong>Password:</strong> prawinkumar_0704</div>
          </div>
        </motion.div>
      </div>
    )
  }

  // ══════════════════════════════════════════════════════════════
  // FULL ADMIN PANEL INTERFACE
  // ══════════════════════════════════════════════════════════════
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.5rem', padding: '1rem', maxWidth: '1440px', margin: '0 auto', minHeight: '90vh' }}>
      
      {/* ── SIDEBAR NAVIGATION ──────────────────────────────────── */}
      <aside style={{ background: 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'fit-content', position: 'sticky', top: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ fontSize: '1.8rem' }}>👑</span>
            <div>
              <div style={{ color: 'white', fontWeight: '900', fontSize: '1rem' }}>CampusPilot</div>
              <div style={{ color: '#a78bfa', fontSize: '0.72rem', fontWeight: '700' }}>ADMIN COCKPIT</div>
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {SECTIONS.map(sec => (
              <button
                key={sec.id}
                onClick={() => { setActiveTab(sec.id); setSearchTerm(''); setCategoryFilter('All') }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.6rem 0.85rem',
                  borderRadius: '0.6rem',
                  fontWeight: '700',
                  fontSize: '0.82rem',
                  textAlign: 'left',
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === sec.id ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'transparent',
                  color: activeTab === sec.id ? 'white' : '#94a3b8',
                  transition: 'all 0.15s'
                }}
              >
                <span>{sec.icon}</span>
                <span>{sec.label.replace(/^[^\w]+/, '')}</span>
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={handleAdminLogout}
          style={{ marginTop: '1.5rem', padding: '0.6rem', borderRadius: '0.6rem', background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}
        >
          🔒 Logout Admin
        </button>
      </aside>

      {/* ── MAIN CONTENT AREA ────────────────────────────────────── */}
      <main style={{ minWidth: 0 }}>

        {/* ── 1. DASHBOARD 📊 ───────────────────────────────────── */}
        {activeTab === 'dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #0f172a 100%)', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                <div>
                  <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.5rem', margin: 0 }}>👑 Admin Dashboard</h2>
                  <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: '0.2rem 0 0' }}>Welcome back, Admin! 🎉 • Last login: {new Date().toLocaleTimeString()} (Verified Session)</p>
                </div>
                <span className="badge badge-safe">Real-Time Sync Active</span>
              </div>

              {/* 8 Metrics Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                {[
                  { label: 'Students', count: '1,234', change: '+12% this month', icon: '👥', color: '#60a5fa' },
                  { label: 'Skills', count: '10,456', change: '+8% this month', icon: '📚', color: '#a78bfa' },
                  { label: 'Jobs', count: '5,678', change: '+15% this month', icon: '💼', color: '#38bdf8' },
                  { label: 'Notes', count: '100,456', change: '+25% this month', icon: '📝', color: '#f59e0b' },
                  { label: 'Companies', count: '1,000+', change: '+5% this month', icon: '🏢', color: '#34d399' },
                  { label: 'Mentors', count: '150', change: '+10% this month', icon: '👨‍🏫', color: '#f43f5e' },
                  { label: 'Tests', count: '10,000+', change: '+20% this month', icon: '🎯', color: '#fbbf24' },
                  { label: 'Resumes', count: '856', change: '+7% this month', icon: '📄', color: '#c084fc' }
                ].map(card => (
                  <div key={card.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.9rem', padding: '0.85rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{card.icon}</div>
                    <div style={{ color: card.color, fontWeight: '900', fontSize: '1.2rem' }}>{card.count}</div>
                    <div style={{ color: 'white', fontWeight: '700', fontSize: '0.78rem' }}>{card.label}</div>
                    <div style={{ color: '#34d399', fontSize: '0.68rem', fontWeight: '600', marginTop: '0.2rem' }}>{card.change}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts & Analytics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              
              {/* Feature Usage Bar Chart */}
              <div className="card">
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1rem', marginBottom: '1rem' }}>📊 Feature Usage Statistics</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {[
                    { name: 'Notes Hub (100k+ Notes)', val: 95, color: '#f59e0b' },
                    { name: 'ATS Resume Builder', val: 88, color: '#34d399' },
                    { name: 'AI Career Predictor', val: 78, color: '#60a5fa' },
                    { name: 'Mock Technical & Voice Interview', val: 72, color: '#f43f5e' },
                    { name: 'Aptitude Test Bank', val: 65, color: '#a78bfa' }
                  ].map(f => (
                    <div key={f.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.2rem' }}>
                        <span>{f.name}</span>
                        <span style={{ fontWeight: 'bold' }}>{f.val}%</span>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '1rem', height: '6px', overflow: 'hidden' }}>
                        <div style={{ width: `${f.val}%`, height: '100%', background: f.color, borderRadius: '1rem' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Performing Students */}
              <div className="card">
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1rem', marginBottom: '1rem' }}>🏆 Top Performing Students</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {students.slice(0, 4).map((st, i) => (
                    <div key={st.id} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.6rem', padding: '0.5rem 0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: i === 0 ? '#fbbf24' : '#94a3b8', fontWeight: '900', fontSize: '0.9rem' }}>#{i + 1}</span>
                        <div>
                          <div style={{ color: 'white', fontWeight: '700', fontSize: '0.82rem' }}>{st.name}</div>
                          <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>{st.department}</div>
                        </div>
                      </div>
                      <span style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.8rem' }}>⚡ {st.stats?.xpPoints || 1000} XP</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── 2. STUDENT MANAGEMENT 👥 ───────────────────────────── */}
        {activeTab === 'students' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', margin: 0 }}>👥 Student Management ({students.length} Registered)</h2>
                <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: 0 }}>View, search, edit, inspect full profiles, or export student database.</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => { setModalMode('add_student'); setModalForm({}) }} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}>
                  ➕ Add Student
                </button>
                <button onClick={() => handleExportCSV(students, 'students_database')} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}>
                  📊 Export CSV
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="🔍 Search student name or email..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ flex: 1, minWidth: '220px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '0.6rem', padding: '0.55rem 0.8rem', color: 'white', fontSize: '0.82rem', outline: 'none' }}
              />
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                style={{ background: 'rgba(30,27,75,0.9)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '0.6rem', padding: '0.55rem 0.8rem', color: 'white', fontSize: '0.82rem', outline: 'none' }}
              >
                <option value="All">All Departments</option>
                <option>Computer Science</option>
                <option>Electronics & Communication</option>
                <option>Mechanical Engineering</option>
              </select>
            </div>

            {/* Student Table View */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                    <th style={{ padding: '0.6rem' }}>#</th>
                    <th style={{ padding: '0.6rem' }}>Name</th>
                    <th style={{ padding: '0.6rem' }}>Email</th>
                    <th style={{ padding: '0.6rem' }}>Dept</th>
                    <th style={{ padding: '0.6rem' }}>Year</th>
                    <th style={{ padding: '0.6rem' }}>Login Count</th>
                    <th style={{ padding: '0.6rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.filter(st => {
                    const matchSearch = !searchTerm || st.name.toLowerCase().includes(searchTerm.toLowerCase()) || st.email.toLowerCase().includes(searchTerm.toLowerCase())
                    const matchDept = categoryFilter === 'All' || st.department.includes(categoryFilter)
                    return matchSearch && matchDept
                  }).map((st, idx) => (
                    <tr key={st.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '0.6rem', color: '#94a3b8' }}>{idx + 1}</td>
                      <td style={{ padding: '0.6rem', fontWeight: '700', color: 'white' }}>{st.name}</td>
                      <td style={{ padding: '0.6rem', color: '#94a3b8' }}>{st.email}</td>
                      <td style={{ padding: '0.6rem' }}><span className="badge badge-info">{st.department}</span></td>
                      <td style={{ padding: '0.6rem', color: '#cbd5e1' }}>{st.year}</td>
                      <td style={{ padding: '0.6rem', color: '#fbbf24', fontWeight: '700' }}>{st.loginCount || 1}</td>
                      <td style={{ padding: '0.6rem', textAlign: 'right' }}>
                        <button onClick={() => setSelectedStudent(st)} title="View Full Profile" style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', marginRight: '0.4rem' }}>👁</button>
                        <button onClick={() => { setModalMode('edit_student'); setModalForm(st) }} title="Edit Student" style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', marginRight: '0.4rem' }}>✏️</button>
                        <button onClick={() => handleDelete(setStudents, st.id, st.name)} title="Delete Student" style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 3. SKILL MANAGEMENT 📚 ─────────────────────────────── */}
        {activeTab === 'skills' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', margin: 0 }}>📚 Skill Management ({skills.length} Skills)</h2>
              <button onClick={() => { setModalMode('add_skill'); setModalForm({}) }} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}>
                ➕ Add Skill
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                    <th style={{ padding: '0.6rem' }}>#</th>
                    <th style={{ padding: '0.6rem' }}>Skill Name</th>
                    <th style={{ padding: '0.6rem' }}>Category</th>
                    <th style={{ padding: '0.6rem' }}>Level</th>
                    <th style={{ padding: '0.6rem' }}>Courses</th>
                    <th style={{ padding: '0.6rem' }}>Students</th>
                    <th style={{ padding: '0.6rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {skills.map((sk, idx) => (
                    <tr key={sk.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '0.6rem', color: '#94a3b8' }}>{idx + 1}</td>
                      <td style={{ padding: '0.6rem', fontWeight: '700', color: '#60a5fa' }}>{sk.name}</td>
                      <td style={{ padding: '0.6rem' }}><span className="badge badge-info">{sk.category}</span></td>
                      <td style={{ padding: '0.6rem' }}><span className="badge badge-safe">{sk.level}</span></td>
                      <td style={{ padding: '0.6rem' }}>{sk.courses || 12}</td>
                      <td style={{ padding: '0.6rem', color: '#34d399', fontWeight: '700' }}>{sk.students || 85}</td>
                      <td style={{ padding: '0.6rem', textAlign: 'right' }}>
                        <button onClick={() => handleDelete(setSkills, sk.id, sk.name)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 4. JOB MANAGEMENT 💼 ───────────────────────────────── */}
        {activeTab === 'jobs' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', margin: 0 }}>💼 Job Management ({jobs.length} Postings)</h2>
              <button onClick={() => { setModalMode('add_job'); setModalForm({}) }} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}>
                ➕ Post Job
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                    <th style={{ padding: '0.6rem' }}>#</th>
                    <th style={{ padding: '0.6rem' }}>Company</th>
                    <th style={{ padding: '0.6rem' }}>Role</th>
                    <th style={{ padding: '0.6rem' }}>CTC</th>
                    <th style={{ padding: '0.6rem' }}>Applied</th>
                    <th style={{ padding: '0.6rem' }}>Status</th>
                    <th style={{ padding: '0.6rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((jb, idx) => (
                    <tr key={jb.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '0.6rem', color: '#94a3b8' }}>{idx + 1}</td>
                      <td style={{ padding: '0.6rem', fontWeight: '800', color: '#60a5fa' }}>{jb.company}</td>
                      <td style={{ padding: '0.6rem', color: 'white' }}>{jb.role}</td>
                      <td style={{ padding: '0.6rem', color: '#fbbf24', fontWeight: '700' }}>{jb.ctc}</td>
                      <td style={{ padding: '0.6rem', color: '#34d399', fontWeight: '700' }}>{jb.applied || 20}</td>
                      <td style={{ padding: '0.6rem' }}><span className="badge badge-safe">{jb.status || 'Active'}</span></td>
                      <td style={{ padding: '0.6rem', textAlign: 'right' }}>
                        <button onClick={() => handleDelete(setJobs, jb.id, `${jb.company} - ${jb.role}`)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 5. NOTES MANAGEMENT 📝 ─────────────────────────────── */}
        {activeTab === 'notes' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', margin: 0 }}>📝 Notes Management (100,000+ Algorithmic Engine Connected)</h2>
              <button onClick={() => { setModalMode('add_note'); setModalForm({}) }} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}>
                ➕ Add Note
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                    <th style={{ padding: '0.6rem' }}>#</th>
                    <th style={{ padding: '0.6rem' }}>Title</th>
                    <th style={{ padding: '0.6rem' }}>Category</th>
                    <th style={{ padding: '0.6rem' }}>Level</th>
                    <th style={{ padding: '0.6rem' }}>Rating</th>
                    <th style={{ padding: '0.6rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.map((nt, idx) => (
                    <tr key={nt.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '0.6rem', color: '#94a3b8' }}>{idx + 1}</td>
                      <td style={{ padding: '0.6rem', fontWeight: '700', color: 'white' }}>{nt.title}</td>
                      <td style={{ padding: '0.6rem' }}><span className="badge badge-info">{nt.category}</span></td>
                      <td style={{ padding: '0.6rem' }}><span className="badge badge-safe">{nt.level}</span></td>
                      <td style={{ padding: '0.6rem', color: '#fbbf24', fontWeight: '700' }}>⭐ {nt.rating}</td>
                      <td style={{ padding: '0.6rem', textAlign: 'right' }}>
                        <button onClick={() => handleDelete(setNotes, nt.id, nt.title)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 6. COMPANY MANAGEMENT 🏢 ───────────────────────────── */}
        {activeTab === 'companies' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', margin: 0 }}>🏢 Company Management ({companies.length} Companies)</h2>
              <button onClick={() => { setModalMode('add_company'); setModalForm({}) }} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}>
                ➕ Add Company
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                    <th style={{ padding: '0.6rem' }}>#</th>
                    <th style={{ padding: '0.6rem' }}>Company</th>
                    <th style={{ padding: '0.6rem' }}>Industry</th>
                    <th style={{ padding: '0.6rem' }}>CTC Package</th>
                    <th style={{ padding: '0.6rem' }}>Students Hired</th>
                    <th style={{ padding: '0.6rem' }}>Archive</th>
                    <th style={{ padding: '0.6rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((cp, idx) => (
                    <tr key={cp.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '0.6rem', color: '#94a3b8' }}>{idx + 1}</td>
                      <td style={{ padding: '0.6rem', fontWeight: '800', color: '#60a5fa' }}>{cp.name}</td>
                      <td style={{ padding: '0.6rem' }}><span className="badge badge-info">{cp.industry}</span></td>
                      <td style={{ padding: '0.6rem', color: '#fbbf24', fontWeight: '700' }}>{cp.ctc}</td>
                      <td style={{ padding: '0.6rem', color: '#34d399', fontWeight: '700' }}>{cp.students}+</td>
                      <td style={{ padding: '0.6rem' }}><span className="badge badge-safe">✅ Live</span></td>
                      <td style={{ padding: '0.6rem', textAlign: 'right' }}>
                        <button onClick={() => handleDelete(setCompanies, cp.id, cp.name)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 7. MENTOR MANAGEMENT 👨‍🏫 ───────────────────────────── */}
        {activeTab === 'mentors' && (
          <div>
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', margin: 0 }}>👨‍🏫 Verified Industry Mentors ({mentors.length})</h2>
                <button onClick={() => { setModalMode('add_mentor'); setModalForm({}) }} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}>
                  ➕ Add Mentor
                </button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                      <th style={{ padding: '0.6rem' }}>#</th>
                      <th style={{ padding: '0.6rem' }}>Name</th>
                      <th style={{ padding: '0.6rem' }}>Company</th>
                      <th style={{ padding: '0.6rem' }}>Role</th>
                      <th style={{ padding: '0.6rem' }}>Sessions</th>
                      <th style={{ padding: '0.6rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mentors.map((m, idx) => (
                      <tr key={m.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '0.6rem', color: '#94a3b8' }}>{idx + 1}</td>
                        <td style={{ padding: '0.6rem', fontWeight: '800', color: 'white' }}>{m.name}</td>
                        <td style={{ padding: '0.6rem', color: '#60a5fa' }}>{m.company}</td>
                        <td style={{ padding: '0.6rem', color: '#cbd5e1' }}>{m.role}</td>
                        <td style={{ padding: '0.6rem', color: '#34d399', fontWeight: '700' }}>{m.sessions}</td>
                        <td style={{ padding: '0.6rem', textAlign: 'right' }}>
                          <button onClick={() => handleDelete(setMentors, m.id, m.name)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}>🗑️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mentor Requests Moderation */}
            <div className="card">
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.75rem' }}>📨 Mentor Booking Requests Moderation</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                      <th style={{ padding: '0.6rem' }}>#</th>
                      <th style={{ padding: '0.6rem' }}>Student</th>
                      <th style={{ padding: '0.6rem' }}>Mentor</th>
                      <th style={{ padding: '0.6rem' }}>Status</th>
                      <th style={{ padding: '0.6rem' }}>Date</th>
                      <th style={{ padding: '0.6rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mentorRequests.map((mr, idx) => (
                      <tr key={mr.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '0.6rem', color: '#94a3b8' }}>{idx + 1}</td>
                        <td style={{ padding: '0.6rem', fontWeight: '700', color: 'white' }}>{mr.student}</td>
                        <td style={{ padding: '0.6rem', color: '#60a5fa' }}>{mr.mentor}</td>
                        <td style={{ padding: '0.6rem' }}>
                          <span className={`badge ${mr.status === 'Accepted' ? 'badge-safe' : mr.status === 'Rejected' ? 'badge-danger' : 'badge-warning'}`}>{mr.status}</span>
                        </td>
                        <td style={{ padding: '0.6rem', color: '#94a3b8' }}>{mr.date}</td>
                        <td style={{ padding: '0.6rem', textAlign: 'right' }}>
                          {mr.status === 'Pending' && (
                            <>
                              <button onClick={() => { setMentorRequests(prev => prev.map(r => r.id === mr.id ? { ...r, status: 'Accepted' } : r)); toast.success('Accepted!') }} style={{ background: 'rgba(34,197,94,0.2)', color: '#34d399', border: 'none', borderRadius: '0.4rem', padding: '0.2rem 0.5rem', marginRight: '0.3rem', cursor: 'pointer' }}>✅ Accept</button>
                              <button onClick={() => { setMentorRequests(prev => prev.map(r => r.id === mr.id ? { ...r, status: 'Rejected' } : r)); toast.error('Rejected') }} style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: 'none', borderRadius: '0.4rem', padding: '0.2rem 0.5rem', cursor: 'pointer' }}>❌</button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── 8. TEST MANAGEMENT 🎯 ──────────────────────────────── */}
        {activeTab === 'tests' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', margin: 0 }}>🎯 Test Management ({tests.length} Simulation Tests)</h2>
              <button onClick={() => { setModalMode('add_test'); setModalForm({}) }} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}>
                ➕ Add Test
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                    <th style={{ padding: '0.6rem' }}>#</th>
                    <th style={{ padding: '0.6rem' }}>Test Name</th>
                    <th style={{ padding: '0.6rem' }}>Type</th>
                    <th style={{ padding: '0.6rem' }}>Questions</th>
                    <th style={{ padding: '0.6rem' }}>Students Attempted</th>
                    <th style={{ padding: '0.6rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((ts, idx) => (
                    <tr key={ts.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '0.6rem', color: '#94a3b8' }}>{idx + 1}</td>
                      <td style={{ padding: '0.6rem', fontWeight: '700', color: 'white' }}>{ts.name}</td>
                      <td style={{ padding: '0.6rem' }}><span className="badge badge-info">{ts.type}</span></td>
                      <td style={{ padding: '0.6rem', color: '#cbd5e1' }}>{ts.questions} Questions ({ts.duration})</td>
                      <td style={{ padding: '0.6rem', color: '#34d399', fontWeight: '700' }}>{ts.students}</td>
                      <td style={{ padding: '0.6rem', textAlign: 'right' }}>
                        <button onClick={() => handleDelete(setTests, ts.id, ts.name)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 9. AI APPLY 🤖 ─────────────────────────────────────── */}
        {activeTab === 'ai_apply' && (
          <div className="card">
            <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '1rem' }}>🤖 AI Apply Applications View ({aiApplications.length} Dispatched)</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                    <th style={{ padding: '0.6rem' }}>#</th>
                    <th style={{ padding: '0.6rem' }}>Student</th>
                    <th style={{ padding: '0.6rem' }}>Company</th>
                    <th style={{ padding: '0.6rem' }}>Role</th>
                    <th style={{ padding: '0.6rem' }}>Status</th>
                    <th style={{ padding: '0.6rem' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {aiApplications.map((ap, idx) => (
                    <tr key={ap.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '0.6rem', color: '#94a3b8' }}>{idx + 1}</td>
                      <td style={{ padding: '0.6rem', fontWeight: '700', color: 'white' }}>{ap.student}</td>
                      <td style={{ padding: '0.6rem', color: '#60a5fa' }}>{ap.company}</td>
                      <td style={{ padding: '0.6rem', color: '#cbd5e1' }}>{ap.role}</td>
                      <td style={{ padding: '0.6rem' }}><span className={`badge ${ap.status === 'Shortlisted' ? 'badge-safe' : 'badge-info'}`}>{ap.status}</span></td>
                      <td style={{ padding: '0.6rem', color: '#94a3b8' }}>{ap.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 10. ARCHIVE 📦 ─────────────────────────────────────── */}
        {activeTab === 'archive' && (
          <div className="card">
            <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '1rem' }}>📦 Placement Archive Management (1000+ Companies)</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                    <th style={{ padding: '0.6rem' }}>#</th>
                    <th style={{ padding: '0.6rem' }}>Company</th>
                    <th style={{ padding: '0.6rem' }}>Industry</th>
                    <th style={{ padding: '0.6rem' }}>Students Hired</th>
                    <th style={{ padding: '0.6rem' }}>Avg CTC</th>
                    <th style={{ padding: '0.6rem', textAlign: 'right' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((cp, idx) => (
                    <tr key={cp.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '0.6rem', color: '#94a3b8' }}>{idx + 1}</td>
                      <td style={{ padding: '0.6rem', fontWeight: '800', color: '#60a5fa' }}>{cp.name}</td>
                      <td style={{ padding: '0.6rem' }}><span className="badge badge-info">{cp.industry}</span></td>
                      <td style={{ padding: '0.6rem', color: '#34d399', fontWeight: '700' }}>{cp.students}</td>
                      <td style={{ padding: '0.6rem', color: '#fbbf24', fontWeight: '700' }}>{cp.ctc}</td>
                      <td style={{ padding: '0.6rem', textAlign: 'right' }}><span className="badge badge-safe">Verified 🏛️</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 11. ALUMNI 🎓 ──────────────────────────────────────── */}
        {activeTab === 'alumni' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', margin: 0 }}>🎓 Alumni Management ({alumni.length} Alumni)</h2>
              <button onClick={() => { setModalMode('add_alumni'); setModalForm({}) }} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}>
                ➕ Add Alumni
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                    <th style={{ padding: '0.6rem' }}>#</th>
                    <th style={{ padding: '0.6rem' }}>Name</th>
                    <th style={{ padding: '0.6rem' }}>Company</th>
                    <th style={{ padding: '0.6rem' }}>Role</th>
                    <th style={{ padding: '0.6rem' }}>Passing Year</th>
                    <th style={{ padding: '0.6rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {alumni.map((al, idx) => (
                    <tr key={al.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '0.6rem', color: '#94a3b8' }}>{idx + 1}</td>
                      <td style={{ padding: '0.6rem', fontWeight: '700', color: 'white' }}>{al.name}</td>
                      <td style={{ padding: '0.6rem', color: '#60a5fa' }}>{al.company}</td>
                      <td style={{ padding: '0.6rem', color: '#cbd5e1' }}>{al.role}</td>
                      <td style={{ padding: '0.6rem' }}><span className="badge badge-info">{al.year} ({al.dept || 'Engg'})</span></td>
                      <td style={{ padding: '0.6rem', textAlign: 'right' }}>
                        <button onClick={() => handleDelete(setAlumni, al.id, al.name)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 12. STUDY GROUPS 👥 ─────────────────────────────────── */}
        {activeTab === 'groups' && (
          <div className="card">
            <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '1rem' }}>👥 Study Group Management & Moderation ({studyGroups.length} Active)</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                    <th style={{ padding: '0.6rem' }}>#</th>
                    <th style={{ padding: '0.6rem' }}>Group Name</th>
                    <th style={{ padding: '0.6rem' }}>Members</th>
                    <th style={{ padding: '0.6rem' }}>Streak</th>
                    <th style={{ padding: '0.6rem' }}>Activity Status</th>
                    <th style={{ padding: '0.6rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {studyGroups.map((g, idx) => (
                    <tr key={g.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '0.6rem', color: '#94a3b8' }}>{idx + 1}</td>
                      <td style={{ padding: '0.6rem', fontWeight: '700', color: 'white' }}>{g.name}</td>
                      <td style={{ padding: '0.6rem', color: '#34d399', fontWeight: '700' }}>👥 {g.members}</td>
                      <td style={{ padding: '0.6rem', color: '#f43f5e', fontWeight: '700' }}>🔥 {g.streak} days</td>
                      <td style={{ padding: '0.6rem' }}><span className="badge badge-safe">{g.active}</span></td>
                      <td style={{ padding: '0.6rem', textAlign: 'right' }}>
                        <button onClick={() => handleDelete(setStudyGroups, g.id, g.name)} style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: 'none', borderRadius: '0.4rem', padding: '0.25rem 0.6rem', fontSize: '0.72rem', cursor: 'pointer' }}>🗑️ Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 13. RESUMES 📄 ─────────────────────────────────────── */}
        {activeTab === 'resumes' && (
          <div className="card">
            <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '1rem' }}>📄 Student Resumes & ATS Template Management ({resumes.length})</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                    <th style={{ padding: '0.6rem' }}>#</th>
                    <th style={{ padding: '0.6rem' }}>Student</th>
                    <th style={{ padding: '0.6rem' }}>Template</th>
                    <th style={{ padding: '0.6rem' }}>ATS Parser Score</th>
                    <th style={{ padding: '0.6rem' }}>Downloads</th>
                    <th style={{ padding: '0.6rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {resumes.map((res, idx) => (
                    <tr key={res.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '0.6rem', color: '#94a3b8' }}>{idx + 1}</td>
                      <td style={{ padding: '0.6rem', fontWeight: '700', color: 'white' }}>{res.student}</td>
                      <td style={{ padding: '0.6rem', color: '#60a5fa' }}>{res.template}</td>
                      <td style={{ padding: '0.6rem' }}><span className="badge badge-safe">{res.score}</span></td>
                      <td style={{ padding: '0.6rem', color: '#fbbf24', fontWeight: '700' }}>📥 {res.downloads}</td>
                      <td style={{ padding: '0.6rem', textAlign: 'right' }}>
                        <button onClick={() => handleDelete(setResumes, res.id, `${res.student}'s Resume`)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 14. ROLE PATH 🎯 ───────────────────────────────────── */}
        {activeTab === 'rolepath' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', margin: 0 }}>🎯 Career Role Path Management ({rolePaths.length} Active Presets)</h2>
              <button onClick={() => { setModalMode('add_role'); setModalForm({}) }} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}>
                ➕ Add Role Path
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                    <th style={{ padding: '0.6rem' }}>#</th>
                    <th style={{ padding: '0.6rem' }}>Role Name</th>
                    <th style={{ padding: '0.6rem' }}>Category</th>
                    <th style={{ padding: '0.6rem' }}>Required Skills</th>
                    <th style={{ padding: '0.6rem' }}>Enrolled Students</th>
                    <th style={{ padding: '0.6rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rolePaths.map((rp, idx) => (
                    <tr key={rp.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '0.6rem', color: '#94a3b8' }}>{idx + 1}</td>
                      <td style={{ padding: '0.6rem', fontWeight: '800', color: '#60a5fa' }}>{rp.name}</td>
                      <td style={{ padding: '0.6rem' }}><span className="badge badge-info">{rp.category}</span></td>
                      <td style={{ padding: '0.6rem', color: '#cbd5e1' }}>{rp.skills} Skills ({rp.salary})</td>
                      <td style={{ padding: '0.6rem', color: '#34d399', fontWeight: '700' }}>{rp.students}</td>
                      <td style={{ padding: '0.6rem', textAlign: 'right' }}>
                        <button onClick={() => handleDelete(setRolePaths, rp.id, rp.name)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 15. SETTINGS ⚙️ ─────────────────────────────────────── */}
        {activeTab === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="card">
              <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '1rem' }}>⚙️ Admin Security & Profile Settings</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h4 style={{ color: '#60a5fa', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.5rem' }}>📧 Administrator Profile</h4>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.2rem' }}>Name: <strong>Master Admin</strong></div>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.75rem' }}>Email: <strong>{ADMIN_EMAIL}</strong></div>
                  <button onClick={() => toast.success('Password update link sent!')} className="btn btn-outline" style={{ fontSize: '0.75rem' }}>Change Password</button>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h4 style={{ color: '#34d399', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🔒 Security & Session</h4>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.3rem' }}>Two-Factor Authentication: <span className="badge badge-safe">Enabled</span></div>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.75rem' }}>Session Timeout: <strong>30 minutes</strong></div>
                  <button onClick={() => toast.success('Security settings updated!')} className="btn btn-outline" style={{ fontSize: '0.75rem' }}>Update Security</button>
                </div>
              </div>
            </div>

            {/* Backup & Export Database */}
            <div className="card">
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1rem', marginBottom: '0.75rem' }}>📊 Backup & Export Database</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '1rem' }}>Download full production JSON or CSV snapshot of your platform database.</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button onClick={() => handleExportCSV(students, 'full_students_backup')} className="btn btn-primary" style={{ fontSize: '0.8rem' }}>📥 Export Student Data (CSV)</button>
                <button onClick={() => handleExportCSV(companies, 'companies_backup')} className="btn btn-primary" style={{ fontSize: '0.8rem' }}>📥 Export Company Data (CSV)</button>
                <button onClick={() => handleExportCSV(jobs, 'jobs_backup')} className="btn btn-primary" style={{ fontSize: '0.8rem' }}>📥 Export Jobs Data (CSV)</button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="card" style={{ borderColor: 'rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.05)' }}>
              <h3 style={{ color: '#f87171', fontWeight: '800', fontSize: '1rem', marginBottom: '0.5rem' }}>⚠️ Danger Zone</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.8rem', marginBottom: '0.75rem' }}>Actions here will reset state across tables. Exercise caution.</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => { if (window.confirm('Reset all databases to default seed state?')) { localStorage.clear(); window.location.reload(); } }} className="btn btn-danger" style={{ fontSize: '0.8rem' }}>
                  ⚠️ Reset Database to Defaults
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ══════════════════════════════════════════════════════════════
          STUDENT PROFILE INSPECTOR MODAL (👁 Click)
         ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)', border: '1px solid rgba(139,92,246,0.5)', borderRadius: '1.5rem', padding: '2rem', maxWidth: '680px', width: '100%', maxHeight: '85vh', overflowY: 'auto' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
                <div>
                  <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.3rem', margin: 0 }}>
                    Student Profile — {selectedStudent.name}
                  </h2>
                  <div style={{ color: '#a78bfa', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                    {selectedStudent.email} • {selectedStudent.department} ({selectedStudent.year})
                  </div>
                </div>
                <button onClick={() => setSelectedStudent(null)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}>✕</button>
              </div>

              {/* 📋 Personal Info */}
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '0.85rem', marginBottom: '1rem' }}>
                <h4 style={{ color: '#60a5fa', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.4rem' }}>📋 Personal Info</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
                  <div>Name: <strong style={{ color: 'white' }}>{selectedStudent.name}</strong></div>
                  <div>Email: <strong style={{ color: 'white' }}>{selectedStudent.email}</strong></div>
                  <div>Department: <strong style={{ color: 'white' }}>{selectedStudent.department}</strong></div>
                  <div>Year: <strong style={{ color: 'white' }}>{selectedStudent.year}</strong></div>
                  <div>Joined: <strong style={{ color: 'white' }}>{selectedStudent.joined || 'Jan 15, 2024'}</strong></div>
                  <div>Last Login: <strong style={{ color: '#34d399' }}>{selectedStudent.lastLogin || 'Today'}</strong></div>
                </div>
              </div>

              {/* 📚 Skills */}
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '0.85rem', marginBottom: '1rem' }}>
                <h4 style={{ color: '#a78bfa', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.4rem' }}>📚 Skills ({selectedStudent.skills?.length || 0})</h4>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {selectedStudent.skills?.map((sk, i) => (
                    <span key={i} className="badge badge-info" style={{ fontSize: '0.72rem' }}>{sk}</span>
                  ))}
                </div>
              </div>

              {/* 🏆 Achievements & Badges */}
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '0.85rem', marginBottom: '1rem' }}>
                <h4 style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.4rem' }}>🏆 Achievements</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {selectedStudent.achievements?.map((ach, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem' }}>
                      <span>{ach.unlocked ? '✅' : '🔒'}</span>
                      <strong style={{ color: ach.unlocked ? 'white' : '#94a3b8' }}>{ach.name}</strong>
                      <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>— {ach.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 📊 Activity Log */}
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '0.85rem', marginBottom: '1rem' }}>
                <h4 style={{ color: '#38bdf8', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.4rem' }}>📊 Activity Log</h4>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '0.5rem', padding: '0.6rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {selectedStudent.activityLog?.map((act, i) => (
                    <div key={i} style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                      <span style={{ color: '#60a5fa', fontWeight: '600' }}>{act.time}</span> — {act.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* 📈 Stats Box */}
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '0.85rem' }}>
                <h4 style={{ color: '#34d399', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.4rem' }}>📈 Stats</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
                  <div>Total Logins: <strong>{selectedStudent.stats?.totalLogins || selectedStudent.loginCount}</strong></div>
                  <div>Courses Completed: <strong>{selectedStudent.stats?.coursesCompleted || 12}</strong></div>
                  <div>Tests Taken: <strong>{selectedStudent.stats?.testsTaken || 8}</strong></div>
                  <div>Jobs Applied: <strong>{selectedStudent.stats?.jobsApplied || 15}</strong></div>
                  <div>XP Points: <strong style={{ color: '#fbbf24' }}>{selectedStudent.stats?.xpPoints || 1250}</strong></div>
                  <div>Badges Earned: <strong>{selectedStudent.stats?.badgesEarned || 3}</strong></div>
                  <div>Current Streak: <strong style={{ color: '#f43f5e' }}>🔥 {selectedStudent.stats?.currentStreak || 5} days</strong></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════
          GENERIC ADD / EDIT MODAL FOR ALL SECTIONS
         ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {modalMode && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setModalMode(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)', border: '1px solid rgba(139,92,246,0.5)', borderRadius: '1.5rem', padding: '2rem', maxWidth: '520px', width: '100%' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ color: 'white', fontWeight: '800', margin: 0 }}>
                  📝 {modalMode.replace('_', ' ').toUpperCase()}
                </h3>
                <button onClick={() => setModalMode(null)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}>✕</button>
              </div>

              <form onSubmit={handleSaveModal} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <label style={{ color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '700' }}>Name / Title</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={modalForm.name || modalForm.title || ''}
                    onChange={e => setModalForm({ ...modalForm, name: e.target.value, title: e.target.value })}
                    style={{ width: '100%', marginTop: '0.2rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div>
                    <label style={{ color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '700' }}>Category / Dept / Role</label>
                    <input
                      type="text"
                      className="form-input"
                      value={modalForm.category || modalForm.department || modalForm.role || ''}
                      onChange={e => setModalForm({ ...modalForm, category: e.target.value, department: e.target.value, role: e.target.value })}
                      style={{ width: '100%', marginTop: '0.2rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '700' }}>CTC / Level / Year</label>
                    <input
                      type="text"
                      className="form-input"
                      value={modalForm.ctc || modalForm.level || modalForm.year || modalForm.salary || ''}
                      onChange={e => setModalForm({ ...modalForm, ctc: e.target.value, level: e.target.value, year: e.target.value, salary: e.target.value })}
                      style={{ width: '100%', marginTop: '0.2rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '700' }}>Description / Content / Skills</label>
                  <textarea
                    rows={3}
                    className="form-textarea"
                    value={modalForm.description || modalForm.content || modalForm.skillsInput || ''}
                    onChange={e => setModalForm({ ...modalForm, description: e.target.value, content: e.target.value, skillsInput: e.target.value })}
                    style={{ width: '100%', marginTop: '0.2rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button type="submit" className="btn btn-primary btn-full">Save Changes 💾</button>
                  <button type="button" onClick={() => setModalMode(null)} className="btn btn-outline btn-full">Cancel</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
