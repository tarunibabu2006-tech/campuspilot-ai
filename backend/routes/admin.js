import express from 'express'
import mongoose from 'mongoose'
import User from '../models/User.js'
import Student from '../models/Student.js'
import { protect } from '../middleware/auth.js'
import { memoryStudentStore } from '../middleware/trackActivity.js'
import logger from '../utils/logger.js'

const router = express.Router()

// ── In-Memory Fallback Stores for Admin CRUD ─────────────────────
let adminSkills = [
  { id: 'sk_1', name: 'Python', category: 'Programming', level: 'Advanced', duration: '3 months', courses: 45, students: 234, description: 'Core Python, OOP, decorators, generators, data science libraries' },
  { id: 'sk_2', name: 'React.js', category: 'Web Development', level: 'Advanced', duration: '2 months', courses: 32, students: 189, description: 'React 18 hooks, Redux Toolkit, Next.js, SSR, performance tuning' },
  { id: 'sk_3', name: 'SQL & DBMS', category: 'Database', level: 'Intermediate', duration: '1.5 months', courses: 28, students: 156, description: 'Relational algebra, complex JOINs, query optimization, indexing' },
  { id: 'sk_4', name: 'Docker & Kubernetes', category: 'DevOps', level: 'Intermediate', duration: '2 months', courses: 15, students: 89, description: 'Containerization, pod scaling, ingress, CI/CD orchestration' }
]

let adminJobs = [
  { id: 'jb_1', company: 'Google India', role: 'SDE-1 (Full Stack)', location: 'Bengaluru / Hyderabad', salary: '₹18–32 LPA', experience: 'Fresher / 0-2 yrs', applied: 45, status: 'Active', applyLink: 'https://careers.google.com' },
  { id: 'jb_2', company: 'Amazon', role: 'Data Analyst Associate', location: 'Chennai / Hyderabad', salary: '₹14–22 LPA', experience: 'Fresher / 0-1 yr', applied: 32, status: 'Active', applyLink: 'https://amazon.jobs' },
  { id: 'jb_3', company: 'TCS', role: 'Ninja & Digital Engineer', location: 'Pan India', salary: '₹3.6–7.5 LPA', experience: 'Fresher', applied: 89, status: 'Active', applyLink: 'https://nextstep.tcs.com' }
]

let adminCompanies = [
  { id: 'cp_1', name: 'Google India', industry: 'Product / Tech', ctc: '₹18–32 LPA', students: 45, isArchived: true, hq: 'Bengaluru', topSkills: 'DSA, System Design, React, Go' },
  { id: 'cp_2', name: 'TCS', industry: 'IT Services', ctc: '₹3.6–7.5 LPA', students: 234, isArchived: true, hq: 'Mumbai', topSkills: 'Java, Python, SQL, Aptitude' },
  { id: 'cp_3', name: 'ONGC', industry: 'PSU / Core', ctc: '₹8–14 LPA', students: 56, isArchived: true, hq: 'Dehradun', topSkills: 'GATE Mechanical, Electrical' }
]

let adminMentors = [
  { id: 'mt_1', name: 'Siddharth V', company: 'Google India', role: 'Sr. SWE', sessions: '85+', rating: 4.9, email: 'siddharth@google.com', status: 'Approved' },
  { id: 'mt_2', name: 'Deepika S', company: 'Microsoft', role: 'Lead Data Scientist', sessions: '95+', rating: 4.9, email: 'deepika@microsoft.com', status: 'Approved' },
  { id: 'mt_3', name: 'Vikram N', company: 'Zoho', role: 'Staff Full Stack', sessions: '150+', rating: 4.8, email: 'vikram@zoho.com', status: 'Approved' }
]

let adminMentorRequests = [
  { id: 'mr_1', studentName: 'Rahul Kumar', mentorName: 'Siddharth V (Google)', topic: 'System Design & SDE-1 Roadmap', date: 'Today, 10:30 AM', status: 'Pending' },
  { id: 'mr_2', studentName: 'Priya Sundar', mentorName: 'Deepika S (Microsoft)', topic: 'Transitioning to Data Science', date: 'Yesterday', status: 'Accepted' },
  { id: 'mr_3', studentName: 'Amit Ram', mentorName: 'Vikram N (Zoho)', topic: 'React.js & Full Stack Prep', date: '2 days ago', status: 'Rejected' }
]

let adminTests = [
  { id: 'ts_1', name: 'Grand All-India Aptitude Master Test', type: 'Aptitude', questions: 50, duration: '60 min', students: 234, cutoff: '75%' },
  { id: 'ts_2', name: 'TCS NQT Full Simulation Round 2026', type: 'Company Pattern', questions: 80, duration: '90 min', students: 156, cutoff: '70%' },
  { id: 'ts_3', name: 'DSA & Algorithms Speed Quiz', type: 'Skill Assessment', questions: 20, duration: '30 min', students: 89, cutoff: '80%' }
]

let adminRolePaths = [
  { id: 'rp_1', title: 'Frontend Developer (React/Next.js)', category: 'Tech', skillsCount: 15, students: 234, duration: '4 Months', avgSalary: '₹6–14 LPA' },
  { id: 'rp_2', title: 'Data Scientist & AI Engineer', category: 'Data Science', skillsCount: 18, students: 156, duration: '6 Months', avgSalary: '₹8–18 LPA' },
  { id: 'rp_3', title: 'Cloud & DevOps Engineer', category: 'DevOps', skillsCount: 12, students: 89, duration: '5 Months', avgSalary: '₹7–16 LPA' }
]

// ── GET /api/admin/dashboard ────────────────────────────────────
router.get('/dashboard', async (req, res) => {
  try {
    const stats = {
      metrics: {
        students: { count: '1,234', change: '+12% this month' },
        skills: { count: '10,456', change: '+8% this month' },
        jobs: { count: '5,678', change: '+15% this month' },
        notes: { count: '100,456', change: '+25% this month' },
        companies: { count: '1,000+', change: '+5% this month' },
        mentors: { count: '150', change: '+10% this month' },
        tests: { count: '10,000+', change: '+20% this month' },
        resumes: { count: '856', change: '+7% this month' }
      },
      charts: {
        registrations: [
          { month: 'Jan', count: 120 }, { month: 'Feb', count: 180 }, { month: 'Mar', count: 240 },
          { month: 'Apr', count: 310 }, { month: 'May', count: 420 }, { month: 'Jun', count: 590 },
          { month: 'Jul', count: 820 }, { month: 'Aug', count: 1234 }
        ],
        featureUsage: [
          { feature: 'Notes Hub', usage: 92 },
          { feature: 'Resume Builder', usage: 85 },
          { feature: 'Mock Interview', usage: 78 },
          { feature: 'Career Predictor', usage: 74 },
          { feature: 'Aptitude Master', usage: 68 },
          { feature: 'Study Groups', usage: 61 }
        ],
        topStudents: [
          { name: 'Tarun Babu', dept: 'CSE', xp: 1450, rank: 1, streak: 15 },
          { name: 'Santhiya S', dept: 'AIDS', xp: 1280, rank: 2, streak: 12 },
          { name: 'Rahul Kumar', dept: 'CSE', xp: 1120, rank: 3, streak: 9 },
          { name: 'Priya Sundar', dept: 'ECE', xp: 980, rank: 4, streak: 7 }
        ]
      }
    }
    res.json(stats)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── STUDENTS CRUD ───────────────────────────────────────────────
router.get('/students', async (req, res) => {
  res.json({ students: Array.from(memoryStudentStore.values()) })
})

router.post('/students', async (req, res) => {
  const newStudent = { id: `std_${Date.now()}`, ...req.body, joined: new Date().toISOString() }
  memoryStudentStore.set(newStudent.id, newStudent)
  res.status(201).json(newStudent)
})

router.delete('/students/:id', async (req, res) => {
  memoryStudentStore.delete(req.params.id)
  res.json({ success: true, message: 'Student removed successfully' })
})

// ── SKILLS CRUD ─────────────────────────────────────────────────
router.get('/skills', (req, res) => res.json(adminSkills))
router.post('/skills', (req, res) => {
  const item = { id: `sk_${Date.now()}`, courses: 1, students: 0, ...req.body }
  adminSkills.unshift(item)
  res.status(201).json(item)
})
router.delete('/skills/:id', (req, res) => {
  adminSkills = adminSkills.filter(s => s.id !== req.params.id)
  res.json({ success: true })
})

// ── JOBS CRUD ───────────────────────────────────────────────────
router.get('/jobs', (req, res) => res.json(adminJobs))
router.post('/jobs', (req, res) => {
  const item = { id: `jb_${Date.now()}`, applied: 0, status: 'Active', ...req.body }
  adminJobs.unshift(item)
  res.status(201).json(item)
})
router.delete('/jobs/:id', (req, res) => {
  adminJobs = adminJobs.filter(j => j.id !== req.params.id)
  res.json({ success: true })
})

// ── COMPANIES CRUD ──────────────────────────────────────────────
router.get('/companies', (req, res) => res.json(adminCompanies))
router.post('/companies', (req, res) => {
  const item = { id: `cp_${Date.now()}`, students: 0, isArchived: true, ...req.body }
  adminCompanies.unshift(item)
  res.status(201).json(item)
})
router.delete('/companies/:id', (req, res) => {
  adminCompanies = adminCompanies.filter(c => c.id !== req.params.id)
  res.json({ success: true })
})

// ── MENTORS & REQUESTS CRUD ─────────────────────────────────────
router.get('/mentors', (req, res) => res.json(adminMentors))
router.post('/mentors', (req, res) => {
  const item = { id: `mt_${Date.now()}`, sessions: '0', rating: 5.0, status: 'Approved', ...req.body }
  adminMentors.unshift(item)
  res.status(201).json(item)
})
router.delete('/mentors/:id', (req, res) => {
  adminMentors = adminMentors.filter(m => m.id !== req.params.id)
  res.json({ success: true })
})

router.get('/mentor-requests', (req, res) => res.json(adminMentorRequests))
router.put('/mentor-requests/:id', (req, res) => {
  const { status } = req.body
  adminMentorRequests = adminMentorRequests.map(r => r.id === req.params.id ? { ...r, status } : r)
  res.json({ success: true })
})

// ── TESTS CRUD ──────────────────────────────────────────────────
router.get('/tests', (req, res) => res.json(adminTests))
router.post('/tests', (req, res) => {
  const item = { id: `ts_${Date.now()}`, students: 0, ...req.body }
  adminTests.unshift(item)
  res.status(201).json(item)
})
router.delete('/tests/:id', (req, res) => {
  adminTests = adminTests.filter(t => t.id !== req.params.id)
  res.json({ success: true })
})

// ── ROLE PATHS CRUD ─────────────────────────────────────────────
router.get('/rolepaths', (req, res) => res.json(adminRolePaths))
router.post('/rolepaths', (req, res) => {
  const item = { id: `rp_${Date.now()}`, students: 0, ...req.body }
  adminRolePaths.unshift(item)
  res.status(201).json(item)
})
router.delete('/rolepaths/:id', (req, res) => {
  adminRolePaths = adminRolePaths.filter(r => r.id !== req.params.id)
  res.json({ success: true })
})

export default router
