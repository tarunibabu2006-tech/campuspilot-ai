import express from 'express'
import { protect } from '../middleware/auth.js'
import User from '../models/User.js'
import Job from '../models/Job.js'

const router = express.Router()

/**
 * Calculate REAL match between student and job
 */
const calculateMatch = (student, job) => {
  let match = 0
  let total = 0

  // 1. Skills Match (50%)
  const studentSkills = (student.skills || []).map(s => String(s).toLowerCase().trim()).filter(Boolean)
  const rawJobSkills = Array.isArray(job.skills) ? job.skills : (job.skills ? String(job.skills).split(',').map(s => s.trim()) : [])
  const jobSkills = rawJobSkills.map(s => String(s).toLowerCase().trim()).filter(Boolean)

  let matchedSkills = []
  let missingSkills = []

  if (jobSkills.length > 0) {
    matchedSkills = rawJobSkills.filter(js => {
      const lower = js.toLowerCase().trim()
      return studentSkills.some(ss => ss === lower || ss.includes(lower) || lower.includes(ss))
    })
    missingSkills = rawJobSkills.filter(js => !matchedSkills.includes(js))

    if (studentSkills.length > 0) {
      match += (matchedSkills.length / jobSkills.length) * 50
    }
    total += 50
  }

  // 2. Education Match (20%)
  const studentEdu = (student.department || student.education || '').toLowerCase().trim()
  const jobEdu = (job.requiredEducation || job.education || '').toLowerCase().trim()
  if (jobEdu) {
    if (studentEdu) {
      const isDirectMatch = studentEdu === jobEdu || studentEdu.includes(jobEdu) || jobEdu.includes(studentEdu)
      const isGeneral = jobEdu.includes('degree') || jobEdu.includes('bachelor') || jobEdu.includes('graduate')
      if (isDirectMatch || isGeneral) {
        match += 20
      } else {
        match += 10
      }
    }
    total += 20
  }

  // 3. Experience Match (20%)
  const studentExpYears = typeof student.experience === 'number' ? student.experience : 0
  const reqExp = typeof job.requiredExperience === 'number' ? job.requiredExperience : 0
  if (reqExp === 0) {
    match += studentEdu ? 20 : 10
    total += 20
  } else {
    if (studentExpYears >= reqExp) {
      match += 20
    } else if (studentExpYears > 0) {
      match += (studentExpYears / reqExp) * 20
    }
    total += 20
  }

  // 4. Location Match (10%)
  const studentLoc = (student.city || student.location || student.state || '').toLowerCase().trim()
  const jobLoc = (job.location || '').toLowerCase().trim()
  if (jobLoc) {
    if (studentLoc) {
      const isLocMatch = jobLoc.includes(studentLoc) || studentLoc.includes(jobLoc) || jobLoc.includes('pan india') || jobLoc.includes('remote')
      match += isLocMatch ? 10 : 3
    }
    total += 10
  }

  const matchPercentage = total > 0 ? Math.round((match / total) * 100) : 0
  return { matchPercentage, matchedSkills, missingSkills }
}

// Calculate real match percentage for a student and job
router.get('/:studentId/match/:jobId', async (req, res) => {
  try {
    const student = await User.findById(req.params.studentId)
    const job = await Job.findById(req.params.jobId)

    if (!student || !job) {
      return res.status(404).json({ message: 'Student or Job not found' })
    }

    const result = calculateMatch(student, job)
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get current student's match against all jobs
router.get('/matches', protect, async (req, res) => {
  try {
    const student = await User.findById(req.user.id)
    if (!student) return res.status(404).json({ message: 'Student profile not found' })

    const jobs = await Job.find({}).limit(50)
    const matches = jobs.map(job => {
      const { matchPercentage, matchedSkills, missingSkills } = calculateMatch(student, job)
      return {
        jobId: job._id,
        role: job.title || job.role,
        company: job.company,
        matchPercentage,
        matchedSkills,
        missingSkills
      }
    })

    res.json({ matches })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
