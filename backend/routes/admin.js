import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import Student from '../models/Student.js'
import Job from '../models/Job.js'
import Skill from '../models/Skill.js'
import Note from '../models/Note.js'
import Alumni from '../models/Alumni.js'
import CompanyArchive from '../models/CompanyArchive.js'
import { protect, adminMiddleware } from '../middleware/auth.js'
import { memoryStudentStore } from '../middleware/trackActivity.js'

// Lazy-load new models (they may not exist yet)
let Mentor, Test, Group

async function getMentorModel() {
  if (!Mentor) {
    const m = await import('../models/Mentor.js')
    Mentor = m.default
  }
  return Mentor
}

async function getTestModel() {
  if (!Test) {
    const m = await import('../models/Test.js')
    Test = m.default
  }
  return Test
}

async function getGroupModel() {
  if (!Group) {
    const m = await import('../models/Group.js')
    Group = m.default
  }
  return Group
}

const router = express.Router()

// ── Admin-only guard: all routes require admin role ─────────────
router.use(protect, (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' })
  }
  next()
})

// ── Helper: safe DB count ────────────────────────────────────────
async function safeCount(Model) {
  try {
    if (mongoose.connection.readyState !== 1) return 0
    return await Model.countDocuments()
  } catch { return 0 }
}

async function safeFind(Model, query = {}, opts = {}) {
  try {
    if (mongoose.connection.readyState !== 1) return []
    let q = Model.find(query)
    if (opts.sort) q = q.sort(opts.sort)
    if (opts.limit) q = q.limit(opts.limit)
    if (opts.select) q = q.select(opts.select)
    return await q.lean()
  } catch { return [] }
}

// ── XP SYSTEM: Earning Rules ─────────────────────────────────────
// Each action a student ACTUALLY completes earns real XP:
// Daily Login          → +10 XP
// Mock Interview       → +75 XP per session
// Aptitude Test        → +50 XP per test
// Skill Learning Visit → +20 XP
// Resume Built         → +50 XP
// Notes Created        → +15 XP
// Job Applied          → +30 XP
// Career GPS Used      → +25 XP
// Chat / AI Used       → +5 XP
// Placement Prep       → +20 XP
// Exam Emergency       → +15 XP
// Viva Prep            → +15 XP
// Mentor Connected     → +40 XP
// Mock Test Taken      → +60 XP
// ─────────────────────────────────────────────────────────────────

function computeRealStudentXP(s) {
  // If the stored xpPoints is a clean, real value (not the legacy 150 default), trust it
  // A "clean" value means student explicitly earned XP via the XP system
  const stored = s.xpPoints || 0

  // These are legacy/inflated values that need to be recalculated
  const isFakeValue = stored === 150 || stored === 1220

  if (stored > 0 && !isFakeValue) {
    return stored // Real earned XP already stored — trust it
  }

  // Recalculate from meaningful feature usage counts only
  const loginXP = (Math.min(s.loginCount || 0, 100)) * 10       // +10 per unique login (max 100)
  const mockInterviewXP = (s.mockInterview || 0) * 75
  const aptitudeXP = (s.aptitudeTest || 0) * 50
  const skillXP = (s.skillHub || 0) * 20
  const resumeXP = Math.min(s.resumeBuilder || 0, 3) * 50        // max 3 resumes counted
  const notesXP = Math.min(s.notesHub || 0, 20) * 15            // max 20 notes
  const jobXP = (s.jobPortal || 0) * 30
  const careerGpsXP = Math.min(s.careerGps || 0, 5) * 25
  const placementXP = (s.placementPrep || 0) * 20
  const examXP = (s.examEmergency || 0) * 15
  const vivaXP = (s.vivaPrep || 0) * 15
  const mentorXP = (s.mentorConnect || 0) * 40
  const mockTestXP = (s.mockTests || 0) * 60

  const total = loginXP + mockInterviewXP + aptitudeXP + skillXP + resumeXP +
    notesXP + jobXP + careerGpsXP + placementXP + examXP + vivaXP + mentorXP + mockTestXP

  return total
}

// ════════════════════════════════════════════════════════════════
// 1. DASHBOARD - Real DB stats
// ════════════════════════════════════════════════════════════════
router.get('/dashboard', async (req, res) => {
  try {
    const isDB = mongoose.connection.readyState === 1

    // Quick DB sanitize: clear legacy fake defaults (150, inflated activity-counts)
    if (isDB) {
      Student.updateMany(
        { xpPoints: { $in: [150, 1220] } },
        { $set: { xpPoints: 0, streak: 0 } }
      ).catch(() => { })
    }

    // Get real student counts
    let dbStudents = []
    try {
      if (isDB) dbStudents = await Student.find().select('name email department year lastLogin loginCount createdAt xpPoints skills badges activities').sort({ createdAt: -1 }).lean()
    } catch { }
    const memStudents = Array.from(memoryStudentStore.values())
    const allEmails = new Set()
    const students = [...dbStudents, ...memStudents].filter(s => {
      if (!s.email || allEmails.has(s.email)) return false
      allEmails.add(s.email)
      return true
    })

    const MentorModel = await getMentorModel()
    const TestModel = await getTestModel()

    const [
      totalJobs, totalSkills, totalNotes, totalAlumni,
      totalCompanies, totalMentors, totalTests
    ] = await Promise.all([
      safeCount(Job), safeCount(Skill), safeCount(Note), safeCount(Alumni),
      safeCount(CompanyArchive), safeCount(MentorModel), safeCount(TestModel)
    ])

    const recentJobs = await safeFind(Job, {}, { sort: { createdAt: -1 }, limit: 5 })
    const recentStudents = students.slice(0, 10).map(s => ({
      _id: s._id || s.id,
      name: s.name,
      email: s.email,
      department: s.department || '',
      year: s.year || '',
      loginCount: s.loginCount || 1,
      lastLogin: s.lastLogin,
      createdAt: s.createdAt,
      xpPoints: computeRealStudentXP(s),
      skills: s.skills || [],
      badges: s.badges || []
    }))

    // Dept breakdown
    const deptMap = {}
    students.forEach(s => {
      const d = s.department || 'Not Specified'
      deptMap[d] = (deptMap[d] || 0) + 1
    })
    const studentsByDepartment = Object.entries(deptMap).map(([_id, count]) => ({ _id, count })).sort((a, b) => b.count - a.count)

    // Year breakdown
    const yearMap = {}
    students.forEach(s => {
      const y = s.year ? `Year ${s.year}` : 'Not Specified'
      yearMap[y] = (yearMap[y] || 0) + 1
    })
    const studentsByYear = Object.entries(yearMap).map(([_id, count]) => ({ _id, count }))

    // Active last 7 days
    const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7)
    const activeStudents = students.filter(s => new Date(s.lastLogin) > weekAgo).length

    res.json({
      totalStudents: students.length,
      activeStudents,
      totalJobs,
      totalSkills,
      totalNotes,
      totalAlumni,
      totalCompanies,
      totalMentors,
      totalTests,
      totalAdmins: 1,
      recentStudents,
      recentJobs,
      studentsByDepartment,
      studentsByYear,
      dbConnected: mongoose.connection.readyState === 1
    })
  } catch (error) {
    console.error('Admin dashboard error:', error)
    res.status(500).json({ message: error.message })
  }
})

// ════════════════════════════════════════════════════════════════
// 2. STUDENTS - Full CRUD
// ════════════════════════════════════════════════════════════════
router.get('/students', async (req, res) => {
  try {
    const { search, department, year, page = 1, limit = 50 } = req.query
    let dbStudents = []

    if (mongoose.connection.readyState === 1) {
      const query = {}
      if (search) query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
      if (department && department !== 'All') query.department = department
      if (year && year !== 'All') query.year = year

      dbStudents = await Student.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .lean()
    }

    const memStudents = Array.from(memoryStudentStore.values())
    const allEmails = new Set(dbStudents.map(s => s.email))
    const combined = [...dbStudents, ...memStudents.filter(s => !allEmails.has(s.email))]

    const mapped = combined.map(s => ({
      _id: s._id || s.id || s.email,
      name: s.name || s.email?.split('@')[0] || 'Student',
      email: s.email,
      department: s.department || '',
      year: s.year || '',
      skills: s.skills || [],
      targetRole: s.targetRole || '',
      linkedin: s.linkedin || '',
      github: s.github || '',
      xpPoints: computeRealStudentXP(s),
      badges: s.badges || [],
      streak: s.streak === 3 ? 0 : (s.streak || 0),
      loginCount: s.loginCount || 1,
      firstLogin: s.firstLogin || s.createdAt,
      lastLogin: s.lastLogin || new Date(),
      loginHistory: (s.loginHistory || []).slice(-5),
      activities: (s.activities || []).slice(-20),
      featureUsage: {
        examEmergency: s.examEmergency || 0,
        vivaPrep: s.vivaPrep || 0,
        placementPrep: s.placementPrep || 0,
        skillHub: s.skillHub || 0,
        resumeBuilder: s.resumeBuilder || 0,
        jobPortal: s.jobPortal || 0,
        mockInterview: s.mockInterview || 0,
        aptitudeTest: s.aptitudeTest || 0,
        notesHub: s.notesHub || 0,
        careerGps: s.careerGps || 0,
        resumeScorer: s.resumeScorer || 0,
        aiApply: s.aiApply || 0,
        mentorConnect: s.mentorConnect || 0,
        mockTests: s.mockTests || 0,
        careerPredictor: s.careerPredictor || 0,
        voiceInterview: s.voiceInterview || 0,
        gamification: s.gamification || 0,
        studyGroups: s.studyGroups || 0
      },
      createdAt: s.createdAt || new Date()
    }))

    let totalCount = mapped.length
    if (mongoose.connection.readyState === 1) {
      try { totalCount = await Student.countDocuments() } catch { }
    }

    res.json({ students: mapped, total: totalCount, page: parseInt(page), limit: parseInt(limit) })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/students/:id', async (req, res) => {
  try {
    let student = null
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(req.params.id)) {
      student = await Student.findById(req.params.id).lean()
    }
    if (!student) {
      student = Array.from(memoryStudentStore.values()).find(s => String(s._id) === req.params.id || s.id === req.params.id || s.email === req.params.id)
    }
    if (!student) return res.status(404).json({ error: 'Student not found' })
    res.json(student)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/students/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'Database not connected' })
    const updated = await Student.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).lean()
    if (!updated) return res.status(404).json({ error: 'Student not found' })
    res.json({ message: 'Student updated', student: updated })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/students/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'Database not connected' })
    await Student.findByIdAndDelete(req.params.id)
    // Also delete from User model
    try { await User.findOneAndDelete({ _id: req.params.id }) } catch { }
    res.json({ message: 'Student deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Reset student password
router.post('/students/:id/reset-password', async (req, res) => {
  try {
    const { newPassword } = req.body
    if (!newPassword) return res.status(400).json({ error: 'New password required' })
    const hashed = await bcrypt.hash(newPassword, 10)
    await User.findByIdAndUpdate(req.params.id, { password: hashed })
    res.json({ message: 'Password reset successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ════════════════════════════════════════════════════════════════
// 3. JOBS - Full CRUD
// ════════════════════════════════════════════════════════════════
router.get('/jobs', async (req, res) => {
  try {
    const { search, status, page = 1, limit = 50 } = req.query
    const query = {}
    if (search) query.$or = [
      { company: { $regex: search, $options: 'i' } },
      { role: { $regex: search, $options: 'i' } }
    ]
    if (status && status !== 'all') query.status = status

    const [jobs, total] = await Promise.all([
      safeFind(Job, query, { sort: { createdAt: -1 } }),
      safeCount(Job)
    ])
    res.json({ jobs, total })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/jobs', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'Database not connected' })
    const job = new Job({ ...req.body, postedBy: 'admin', verified: true, isVerified: true })
    await job.save()
    res.status(201).json({ message: 'Job created', job })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    if (!job) return res.status(404).json({ error: 'Job not found' })
    res.json({ message: 'Job updated', job })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/jobs/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id)
    res.json({ message: 'Job deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ════════════════════════════════════════════════════════════════
// 4. SKILLS - Full CRUD
// ════════════════════════════════════════════════════════════════
router.get('/skills', async (req, res) => {
  try {
    const { search, category, page = 1, limit = 50 } = req.query
    const query = {}
    if (search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } }
    ]
    if (category && category !== 'all') query.category = category
    const [skills, total] = await Promise.all([
      safeFind(Skill, query, { sort: { createdAt: -1 } }),
      safeCount(Skill)
    ])
    res.json({ skills, total })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/skills', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'Database not connected' })
    const skill = new Skill(req.body)
    await skill.save()
    res.status(201).json({ message: 'Skill created', skill })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/skills/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    if (!skill) return res.status(404).json({ error: 'Skill not found' })
    res.json({ message: 'Skill updated', skill })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/skills/:id', async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id)
    res.json({ message: 'Skill deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Bulk upload skills
router.post('/skills/bulk', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'Database not connected' })
    const { skills } = req.body
    if (!Array.isArray(skills)) return res.status(400).json({ error: 'skills must be an array' })
    const inserted = await Skill.insertMany(skills, { ordered: false })
    res.status(201).json({ message: `${inserted.length} skills created`, count: inserted.length })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ════════════════════════════════════════════════════════════════
// 5. NOTES - Full CRUD
// ════════════════════════════════════════════════════════════════
router.get('/notes', async (req, res) => {
  try {
    const { search, category, page = 1, limit = 50 } = req.query
    const query = {}
    if (search) query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } }
    ]
    if (category && category !== 'all') query.category = category
    const [notes, total] = await Promise.all([
      safeFind(Note, query, { sort: { createdAt: -1 } }),
      safeCount(Note)
    ])
    res.json({ notes, total })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/notes', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'Database not connected' })
    const note = new Note({ ...req.body, author: 'admin' })
    await note.save()
    res.status(201).json({ message: 'Note created', note })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    if (!note) return res.status(404).json({ error: 'Note not found' })
    res.json({ message: 'Note updated', note })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/notes/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id)
    res.json({ message: 'Note deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ════════════════════════════════════════════════════════════════
// 6. COMPANIES / ARCHIVES - Full CRUD
// ════════════════════════════════════════════════════════════════
router.get('/companies', async (req, res) => {
  try {
    const { search, page = 1, limit = 50 } = req.query
    const query = {}
    if (search) query.name = { $regex: search, $options: 'i' }
    const [companies, total] = await Promise.all([
      safeFind(CompanyArchive, query, { sort: { createdAt: -1 } }),
      safeCount(CompanyArchive)
    ])
    res.json({ companies, total })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/companies', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'Database not connected' })
    const company = new CompanyArchive(req.body)
    await company.save()
    res.status(201).json({ message: 'Company created', company })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/companies/:id', async (req, res) => {
  try {
    const company = await CompanyArchive.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    if (!company) return res.status(404).json({ error: 'Company not found' })
    res.json({ message: 'Company updated', company })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/companies/:id', async (req, res) => {
  try {
    await CompanyArchive.findByIdAndDelete(req.params.id)
    res.json({ message: 'Company deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ════════════════════════════════════════════════════════════════
// 7. ALUMNI - Full CRUD
// ════════════════════════════════════════════════════════════════
router.get('/alumni', async (req, res) => {
  try {
    const { search } = req.query
    const query = {}
    if (search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } }
    ]
    const [alumni, total] = await Promise.all([
      safeFind(Alumni, query, { sort: { createdAt: -1 } }),
      safeCount(Alumni)
    ])
    res.json({ alumni, total })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/alumni', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'Database not connected' })
    const alumni = new Alumni(req.body)
    await alumni.save()
    res.status(201).json({ message: 'Alumni created', alumni })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/alumni/:id', async (req, res) => {
  try {
    const alumni = await Alumni.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    if (!alumni) return res.status(404).json({ error: 'Alumni not found' })
    res.json({ message: 'Alumni updated', alumni })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/alumni/:id', async (req, res) => {
  try {
    await Alumni.findByIdAndDelete(req.params.id)
    res.json({ message: 'Alumni deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ════════════════════════════════════════════════════════════════
// 8. MENTORS - Full CRUD
// ════════════════════════════════════════════════════════════════
router.get('/mentors', async (req, res) => {
  try {
    const MentorModel = await getMentorModel()
    const { search } = req.query
    const query = {}
    if (search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } }
    ]
    const [mentors, total] = await Promise.all([
      safeFind(MentorModel, query, { sort: { createdAt: -1 } }),
      safeCount(MentorModel)
    ])
    res.json({ mentors, total })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/mentors', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'Database not connected' })
    const MentorModel = await getMentorModel()
    const mentor = new MentorModel(req.body)
    await mentor.save()
    res.status(201).json({ message: 'Mentor created', mentor })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/mentors/:id', async (req, res) => {
  try {
    const MentorModel = await getMentorModel()
    const mentor = await MentorModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    if (!mentor) return res.status(404).json({ error: 'Mentor not found' })
    res.json({ message: 'Mentor updated', mentor })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/mentors/:id', async (req, res) => {
  try {
    const MentorModel = await getMentorModel()
    await MentorModel.findByIdAndDelete(req.params.id)
    res.json({ message: 'Mentor deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ════════════════════════════════════════════════════════════════
// 9. TESTS / MOCK TESTS - Full CRUD
// ════════════════════════════════════════════════════════════════
router.get('/tests', async (req, res) => {
  try {
    const TestModel = await getTestModel()
    const { search, type } = req.query
    const query = {}
    if (search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } }
    ]
    if (type && type !== 'all') query.type = type
    const [tests, total] = await Promise.all([
      safeFind(TestModel, query, { sort: { createdAt: -1 } }),
      safeCount(TestModel)
    ])
    res.json({ tests, total })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/tests', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'Database not connected' })
    const TestModel = await getTestModel()
    const test = new TestModel(req.body)
    await test.save()
    res.status(201).json({ message: 'Test created', test })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/tests/:id', async (req, res) => {
  try {
    const TestModel = await getTestModel()
    const test = await TestModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    if (!test) return res.status(404).json({ error: 'Test not found' })
    res.json({ message: 'Test updated', test })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/tests/:id', async (req, res) => {
  try {
    const TestModel = await getTestModel()
    await TestModel.findByIdAndDelete(req.params.id)
    res.json({ message: 'Test deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ════════════════════════════════════════════════════════════════
// 10. STUDY GROUPS - View & Delete
// ════════════════════════════════════════════════════════════════
router.get('/groups', async (req, res) => {
  try {
    const GroupModel = await getGroupModel()
    const groups = await safeFind(GroupModel, {}, { sort: { createdAt: -1 } })
    const total = await safeCount(GroupModel)
    res.json({ groups, total })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/groups/:id', async (req, res) => {
  try {
    const GroupModel = await getGroupModel()
    await GroupModel.findByIdAndDelete(req.params.id)
    res.json({ message: 'Group deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ════════════════════════════════════════════════════════════════
// 11. SYSTEM SETTINGS & ADMIN MANAGEMENT
// ════════════════════════════════════════════════════════════════
router.get('/settings', async (req, res) => {
  res.json({
    adminEmail: process.env.ADMIN_EMAIL || 'tarunibabu2006@gmail.com',
    platformName: 'CampusPilot AI',
    dbConnected: mongoose.connection.readyState === 1,
    dbStatus: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown',
    nodeEnv: process.env.NODE_ENV || 'development',
    version: '2.0.0',
    features: {
      googleAuth: !!process.env.GOOGLE_CLIENT_ID,
      geminiAI: !!process.env.GEMINI_API_KEY,
      redis: !!process.env.REDIS_URL
    }
  })
})

// Export student CSV data
router.get('/students/export/csv', async (req, res) => {
  try {
    let students = []
    if (mongoose.connection.readyState === 1) {
      students = await Student.find().lean()
    }
    const memStudents = Array.from(memoryStudentStore.values())
    const allEmails = new Set(students.map(s => s.email))
    const all = [...students, ...memStudents.filter(s => !allEmails.has(s.email))]

    const headers = ['Name', 'Email', 'Department', 'Year', 'Skills', 'XP Points', 'Login Count', 'Last Login', 'Joined']
    const rows = all.map(s => [
      s.name || '',
      s.email || '',
      s.department || '',
      s.year || '',
      (s.skills || []).join('; '),
      s.xpPoints || 0,
      s.loginCount || 1,
      s.lastLogin ? new Date(s.lastLogin).toLocaleDateString() : '',
      s.createdAt ? new Date(s.createdAt).toLocaleDateString() : ''
    ])

    const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename=campuspilot_students.csv')
    res.send(csv)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ════════════════════════════════════════════════════════════════
// ADMIN UTILITY: Reset ALL student XP to 0 in MongoDB (one-time cleanup)
// ════════════════════════════════════════════════════════════════
router.post('/students/reset-xp', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ message: 'MongoDB not connected — in-memory store cleared', cleared: 0 })
    }

    // Wipe ALL xpPoints in DB to 0 — students must earn real XP going forward
    const result = await Student.updateMany({}, { $set: { xpPoints: 0, streak: 0 } })
    res.json({
      message: `✅ Reset ${result.modifiedCount} students. All XP cleared. Students will earn real XP as they use the platform.`,
      modifiedCount: result.modifiedCount
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
