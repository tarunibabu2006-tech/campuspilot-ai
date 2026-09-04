import express from 'express'
import Exam from '../models/Exam.js'
import StudentPreference from '../models/StudentPreference.js'
import Student from '../models/Student.js'
import { protect } from '../middleware/auth.js'
import mongoose from 'mongoose'

const router = express.Router()

// ── 1. GET ALL EXAMS WITH FILTERS & SEARCH ──────────────────────────
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const { category, conductingBody, stream, eligibility, status, search, includeExpired, page = 1, limit = 50 } = req.query
    const query = {}

    // Auto-filter expired exams by default
    if (includeExpired !== 'true') {
      query.status = { $in: ['active', 'upcoming'] }
      const todayStr = new Date().toISOString().split('T')[0]
      query.$or = [
        { registrationEnd: { $gte: todayStr } },
        { registrationEnd: { $eq: '' } },
        { registrationEnd: { $exists: false } }
      ]
    } else if (status && status !== 'All') {
      query.status = status
    }

    if (category && category !== 'All') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') }
    }
    if (conductingBody && conductingBody !== 'All') {
      query.conductingBody = conductingBody
    }
    if (stream && stream !== 'All') {
      query.stream = { $in: [new RegExp(stream, 'i'), 'Any'] }
    }
    if (eligibility && eligibility !== 'All') {
      query.eligibility = { $regex: new RegExp(eligibility, 'i') }
    }
    if (status && status !== 'All') {
      query.status = status
    }
    if (search) {
      query.$or = [
        { examName: { $regex: search, $options: 'i' } },
        { conductingBody: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { notificationTitle: { $regex: search, $options: 'i' } }
      ]
    }

    const [exams, total] = await Promise.all([
      Exam.find(query)
        .sort({ examDate: 1, createdAt: -1 })
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit))
        .lean(),
      Exam.countDocuments(query)
    ])

    res.json({
      exams,
      total,
      page: parseInt(page),
      limit: parseInt(limit)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── 2. GET UPCOMING EXAMS (SORTED BY DATE) ──────────────────────────
router.get('/upcoming', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const exams = await Exam.find({
      status: { $in: ['active', 'upcoming'] }
    })
      .sort({ examDate: 1 })
      .limit(20)
      .lean()

    res.json(exams)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── 3. GET PERSONALIZED EXAMS FOR STUDENT ───────────────────────────
router.get('/personalized', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const userId = req.user?.id || req.user?._id
    let pref = await StudentPreference.findOne({ userId: userId?.toString() }).lean()
    const student = await Student.findById(userId).lean()

    // Default student preferences if not explicitly set yet
    const studentStream = pref?.stream || student?.department || 'Engineering'
    const studentClass = pref?.class || (student?.year ? 'UG' : 'Graduate')
    const studentInterests = pref?.interests || ['Engineering', 'Government', 'Banking']
    const targetExams = pref?.targetExams || []

    const query = {
      status: { $in: ['active', 'upcoming'] },
      $or: [
        { examName: { $in: targetExams.map(t => new RegExp(t, 'i')) } },
        { stream: { $in: [new RegExp(studentStream, 'i'), 'Any'] } },
        { category: { $in: studentInterests.map(i => new RegExp(i, 'i')) } },
        { eligibility: { $regex: new RegExp(studentClass, 'i') } }
      ]
    }

    const personalized = await Exam.find(query)
      .sort({ examDate: 1 })
      .limit(30)
      .lean()

    res.json({
      exams: personalized,
      studentProfile: {
        stream: studentStream,
        class: studentClass,
        interests: studentInterests,
        targetExams
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── 4. GET EXAMS BY CATEGORY ────────────────────────────────────────
router.get('/category/:category', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const { category } = req.params
    const exams = await Exam.find({
      category: { $regex: new RegExp(`^${category}$`, 'i') }
    })
      .sort({ examDate: 1 })
      .lean()

    res.json(exams)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── 5. GET SINGLE EXAM DETAILS ──────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const exam = await Exam.findById(req.params.id)
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' })
    }

    // Increment view count
    exam.viewCount = (exam.viewCount || 0) + 1
    await exam.save()

    res.json(exam)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── 6. BOOKMARK / TARGET EXAM TOGGLE ────────────────────────────────
router.post('/:id/bookmark', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const exam = await Exam.findById(req.params.id)
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' })
    }

    const userId = (req.user?.id || req.user?._id || '').toString()
    const isBookmarked = exam.bookmarkedBy?.includes(userId)

    if (isBookmarked) {
      exam.bookmarkedBy = exam.bookmarkedBy.filter(id => id !== userId)
    } else {
      exam.bookmarkedBy.push(userId)
    }

    await exam.save()
    res.json({
      bookmarked: !isBookmarked,
      count: exam.bookmarkedBy.length
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
