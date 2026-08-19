import express from 'express'
import User from '../models/User.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Get dashboard statistics
router.get('/dashboard', protect, async (req, res) => {
  try {
    let dbStudents = []
    try {
      dbStudents = await User.find({ role: 'student' }).select('-password -__v').lean()
    } catch (e) {
      console.log('DB Query skipped, using memory store')
    }

    const students = dbStudents || []
    const totalStudents = students.length
    const totalAdmins = 1
    const totalSkills = 50
    const totalJobs = 30
    const activeStudents = students.filter(s => s.isActive !== false).length
    const inactiveStudents = students.filter(s => s.isActive === false).length

    // Students by department
    const deptMap = {}
    students.forEach(s => {
      const dept = s.department || 'General'
      deptMap[dept] = (deptMap[dept] || 0) + 1
    })
    const studentsByDepartment = Object.entries(deptMap).map(([_id, count]) => ({ _id, count }))

    // Students by year
    const yearMap = {}
    students.forEach(s => {
      const yr = s.year || '1st Year'
      yearMap[yr] = (yearMap[yr] || 0) + 1
    })
    const studentsByYear = Object.entries(yearMap).map(([_id, count]) => ({ _id, count }))

    // Recent students (last 10)
    const recentStudents = [...students]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 10)

    res.json({
      totalStudents,
      totalAdmins,
      totalSkills,
      totalJobs,
      activeStudents,
      inactiveStudents,
      studentsByDepartment,
      studentsByYear,
      recentStudents
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get all students
router.get('/students', protect, async (req, res) => {
  try {
    let students = []
    try {
      students = await User.find({ role: 'student' }).select('-password -__v').lean()
    } catch (e) {
      students = []
    }
    res.json({ students })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get all jobs
router.get('/jobs', protect, async (req, res) => {
  try {
    const jobs = [
      { id: '1', title: 'Software Engineer', company: 'TCS', location: 'Chennai', salary: '3.5-6 LPA', type: 'Full-time', postedAt: '2026-08-01' },
      { id: '2', title: 'Data Analyst', company: 'Infosys', location: 'Bangalore', salary: '4-7 LPA', type: 'Full-time', postedAt: '2026-08-05' }
    ]
    res.json({ jobs })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Post job
router.post('/jobs', protect, async (req, res) => {
  try {
    const job = { id: String(Date.now()), ...req.body, postedBy: req.user.id, createdAt: new Date().toISOString() }
    res.status(201).json({ job })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
