import express from 'express'
import { predictCareer } from '../controllers/geminiController.js'
import Student from '../models/Student.js'
import mongoose from 'mongoose'

const router = express.Router()

// In-memory store for fallback mode
const memoryCareerPaths = new Map()

// POST /api/career-predictor/predict
router.post('/predict', async (req, res) => {
  try {
    const { currentRole, skills, interests, education } = req.body
    
    if (!currentRole || !skills) {
      return res.status(400).json({ error: 'Current role and skills are required' })
    }

    const result = await predictCareer(currentRole, skills, interests, education)
    
    // Save to student if user ID or email exists
    const userId = req.user?.id || req.body.userId || 'default_student'
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(userId)) {
      try {
        const student = await Student.findById(userId)
        if (student) {
          student.careerPath = result.careerPath
          await student.save()
        }
      } catch (dbErr) {
        console.warn('DB save careerPath error:', dbErr.message)
      }
    }

    memoryCareerPaths.set(userId, result.careerPath)
    res.json(result)
  } catch (error) {
    console.error('Career Predictor Route Error:', error)
    res.status(500).json({ error: error.message })
  }
})

// GET /api/career-predictor/path
router.get('/path', async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId || 'default_student'
    
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(userId)) {
      try {
        const student = await Student.findById(userId)
        if (student && student.careerPath && student.careerPath.length > 0) {
          return res.json({ careerPath: student.careerPath })
        }
      } catch (dbErr) {
        console.warn('DB get careerPath error:', dbErr.message)
      }
    }

    const saved = memoryCareerPaths.get(userId) || []
    res.json({ careerPath: saved })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
