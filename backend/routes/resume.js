import express from 'express'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

const savedResumes = {}

// POST /api/resume/save
router.post('/save', authMiddleware, (req, res) => {
  const userId = req.user?.id || 'demo_student_id'
  savedResumes[userId] = {
    ...req.body,
    updatedAt: new Date().toISOString()
  }
  res.json({ message: 'Resume saved successfully! 📄', resume: savedResumes[userId] })
})

// GET /api/resume/me
router.get('/me', authMiddleware, (req, res) => {
  const userId = req.user?.id || 'demo_student_id'
  const resume = savedResumes[userId] || null
  res.json({ resume })
})

export default router
