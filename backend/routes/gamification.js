import express from 'express'
import Student from '../models/Student.js'
import mongoose from 'mongoose'

const router = express.Router()

// In-memory gamification state fallback
let memoryGamification = {
  xpPoints: 240,
  badges: ['react', 'python', 'frontend'],
  streak: 5,
  lastActivityDate: new Date(),
  weeklyChallenges: [
    { id: 1, challenge: 'Complete 1 Voice Mock Interview', xp: 50, completed: true },
    { id: 2, challenge: 'Solve 10 Aptitude Questions', xp: 40, completed: false },
    { id: 3, challenge: 'Generate a 5-Year Career Roadmap', xp: 60, completed: true },
    { id: 4, challenge: 'Score > 85 on Resume Scorer', xp: 75, completed: false }
  ]
}

// GET /api/gamification/badges
router.get('/badges', async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId
    if (userId && mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(userId)) {
      const student = await Student.findById(userId)
      if (student) {
        return res.json({ badges: student.badges || [], xpPoints: student.xpPoints || 0 })
      }
    }
    res.json({ badges: memoryGamification.badges, xpPoints: memoryGamification.xpPoints })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/gamification/earn-badge
router.post('/earn-badge', async (req, res) => {
  try {
    const { badge } = req.body
    if (!badge) {
      return res.status(400).json({ error: 'Badge identifier required' })
    }

    const userId = req.user?.id || req.body.userId
    if (userId && mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(userId)) {
      const student = await Student.findById(userId)
      if (student) {
        if (!student.badges.includes(badge)) {
          student.badges.push(badge)
          student.xpPoints = (student.xpPoints || 0) + 50
          await student.save()
        }
        return res.json({ success: true, badges: student.badges, xpPoints: student.xpPoints })
      }
    }

    if (!memoryGamification.badges.includes(badge)) {
      memoryGamification.badges.push(badge)
      memoryGamification.xpPoints += 50
    }
    
    res.json({ success: true, badges: memoryGamification.badges, xpPoints: memoryGamification.xpPoints })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/gamification/streak
router.get('/streak', async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId
    if (userId && mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(userId)) {
      const student = await Student.findById(userId)
      if (student) {
        return res.json({
          streak: student.streak || 0,
          xpPoints: student.xpPoints || 0,
          badges: student.badges || []
        })
      }
    }
    res.json({
      streak: memoryGamification.streak,
      xpPoints: memoryGamification.xpPoints,
      badges: memoryGamification.badges
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/gamification/update-streak
router.post('/update-streak', async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId
    if (userId && mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(userId)) {
      const student = await Student.findById(userId)
      if (student) {
        student.streak = (student.streak || 0) + 1
        student.lastActivityDate = new Date()
        student.xpPoints = (student.xpPoints || 0) + 20
        await student.save()
        return res.json({
          streak: student.streak,
          xpPoints: student.xpPoints,
          message: '🔥 Streak extended! +20 XP awarded'
        })
      }
    }

    memoryGamification.streak += 1
    memoryGamification.xpPoints += 20
    res.json({
      streak: memoryGamification.streak,
      xpPoints: memoryGamification.xpPoints,
      message: '🔥 Streak extended! +20 XP awarded'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/gamification/challenges
router.get('/challenges', async (req, res) => {
  res.json({ challenges: memoryGamification.weeklyChallenges })
})

export default router
