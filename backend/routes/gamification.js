import express from 'express'
import Student from '../models/Student.js'
import mongoose from 'mongoose'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// All gamification data is personal to the logged-in student — never served
// anonymously, and never keyed by a client-supplied userId (that was the bug:
// without this, req.user was always undefined and every request either fell
// through to a single shared state or reset to zero every time).
router.use(protect)

// In-memory fallback per user (only used while MongoDB is offline), keyed by
// email so it can never collide across different logged-in users.
const userGamificationMap = new Map()

const getDefaultUserState = () => ({
  xpPoints: 0,
  badges: [],
  streak: 0,
  lastActivityDate: null,
  weeklyChallenges: [
    { id: 1, challenge: 'Complete 1 Voice Mock Interview', xp: 50, completed: false },
    { id: 2, challenge: 'Solve 10 Aptitude Questions', xp: 40, completed: false },
    { id: 3, challenge: 'Generate a 5-Year Career Roadmap', xp: 60, completed: false },
    { id: 4, challenge: 'Score > 85 on Resume Scorer', xp: 75, completed: false }
  ]
})

const getUserState = (email) => {
  if (!userGamificationMap.has(email)) {
    userGamificationMap.set(email, getDefaultUserState())
  }
  return userGamificationMap.get(email)
}

// GET /api/gamification/badges
router.get('/badges', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const student = await Student.findOne({ email: req.user.email })
      if (student) {
        return res.json({ badges: student.badges || [], xpPoints: student.xpPoints || 0 })
      }
    }
    const state = getUserState(req.user.email)
    res.json({ badges: state.badges, xpPoints: state.xpPoints })
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

    if (mongoose.connection.readyState === 1) {
      const student = await Student.findOne({ email: req.user.email })
      if (student) {
        if (!student.badges.includes(badge)) {
          student.badges.push(badge)
          student.xpPoints = (student.xpPoints || 0) + 50
          await student.save()
        }
        return res.json({ success: true, badges: student.badges, xpPoints: student.xpPoints })
      }
    }

    const state = getUserState(req.user.email)
    if (!state.badges.includes(badge)) {
      state.badges.push(badge)
      state.xpPoints += 50
    }
    res.json({ success: true, badges: state.badges, xpPoints: state.xpPoints })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/gamification/streak
router.get('/streak', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const student = await Student.findOne({ email: req.user.email })
      if (student) {
        return res.json({
          streak: student.streak || 0,
          xpPoints: student.xpPoints || 0,
          badges: student.badges || []
        })
      }
    }
    const state = getUserState(req.user.email)
    res.json({
      streak: state.streak,
      xpPoints: state.xpPoints,
      badges: state.badges
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/gamification/update-streak
router.post('/update-streak', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const student = await Student.findOne({ email: req.user.email })
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

    const state = getUserState(req.user.email)
    state.streak += 1
    state.xpPoints += 20
    res.json({
      streak: state.streak,
      xpPoints: state.xpPoints,
      message: '🔥 Streak extended! +20 XP awarded'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/gamification/challenges
router.get('/challenges', async (req, res) => {
  const state = getUserState(req.user.email)
  res.json({ challenges: state.weeklyChallenges })
})

// GET /api/gamification/leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }
    const topStudents = await Student.find()
      .sort({ xpPoints: -1 })
      .limit(10)
      .select('name department xpPoints badges')

    const leaderboard = topStudents.map((s, index) => ({
      rank: index + 1,
      name: s.name,
      dept: s.department || 'N/A',
      badges: s.badges?.length || 0,
      score: s.xpPoints || 0
    }))

    res.json(leaderboard)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
