import express from 'express'
import Notification from '../models/Notification.js'
import StudentPreference from '../models/StudentPreference.js'
import Student from '../models/Student.js'
import { protect } from '../middleware/auth.js'
import mongoose from 'mongoose'

const router = express.Router()

// ── 1. GET STUDENT NOTIFICATIONS (PAGINATED & FILTERED) ──────────────
router.get('/', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const userId = (req.user?.id || req.user?._id || '').toString()
    const { type, unreadOnly, page = 1, limit = 30 } = req.query

    const query = {
      $or: [
        { userId: userId },
        { userId: 'default' },
        { userId: req.user?.email }
      ]
    }

    if (type && type !== 'All') {
      query.type = type
    }
    if (unreadOnly === 'true') {
      query.read = false
    }

    const [notifications, total, unread] = await Promise.all([
      Notification.find(query)
        .sort({ createdAt: -1 })
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit))
        .populate('examId', 'examName conductingBody category officialWebsite applyLink syllabus previousPapers examDate')
        .lean(),
      Notification.countDocuments(query),
      Notification.countDocuments({ ...query, read: false })
    ])

    res.json({
      notifications,
      total,
      unread,
      page: parseInt(page),
      limit: parseInt(limit)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── 2. GET UNREAD NOTIFICATION COUNT & PREVIEW ───────────────────────
router.get('/unread', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ unreadCount: 0, recent: [] })
    }

    const userId = (req.user?.id || req.user?._id || '').toString()
    const query = {
      $or: [
        { userId: userId },
        { userId: 'default' },
        { userId: req.user?.email }
      ],
      read: false
    }

    const [unreadCount, recent] = await Promise.all([
      Notification.countDocuments(query),
      Notification.find(query)
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('examId', 'examName conductingBody category examDate')
        .lean()
    ])

    res.json({ unreadCount, recent })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── 3. MARK SINGLE NOTIFICATION AS READ ─────────────────────────────
router.put('/:id/read', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true, readAt: new Date() },
      { new: true }
    )

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' })
    }

    res.json({ message: 'Marked as read', notification })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── 4. MARK ALL NOTIFICATIONS AS READ ───────────────────────────────
router.put('/mark-all-read', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const userId = (req.user?.id || req.user?._id || '').toString()
    const result = await Notification.updateMany(
      {
        $or: [
          { userId: userId },
          { userId: 'default' },
          { userId: req.user?.email }
        ],
        read: false
      },
      {
        read: true,
        readAt: new Date()
      }
    )

    res.json({ message: 'All notifications marked as read', modifiedCount: result.modifiedCount })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── 5. GET STUDENT NOTIFICATION PREFERENCES ─────────────────────────
router.get('/preferences', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const userId = (req.user?.id || req.user?._id || '').toString()
    const userEmail = req.user?.email || ''
    
    let pref = await StudentPreference.findOne({
      $or: [{ userId }, { studentEmail: userEmail }]
    }).lean()

    if (!pref) {
      const student = await Student.findById(userId).lean()
      pref = {
        userId,
        studentEmail: userEmail,
        class: student?.year ? 'UG' : 'Graduate',
        stream: student?.department || 'Engineering',
        interests: ['Engineering', 'Government', 'Banking'],
        targetExams: [],
        notificationPreferences: {
          email: true,
          inApp: true,
          frequency: 'instant',
          types: {
            applicationStart: true,
            applicationEnd: true,
            admitCard: true,
            examDate: true,
            result: true,
            syllabusUpdate: true,
            patternChange: true
          },
          categories: ['Engineering', 'Government', 'Banking']
        }
      }
    }

    res.json(pref)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── 6. UPDATE STUDENT NOTIFICATION PREFERENCES ──────────────────────
router.post('/preferences', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const userId = (req.user?.id || req.user?._id || '').toString()
    const userEmail = req.user?.email || ''

    const {
      class: studentClass,
      stream,
      interests,
      targetExams,
      notificationPreferences
    } = req.body

    const updateDoc = {
      userId,
      studentEmail: userEmail,
      ...(studentClass && { class: studentClass }),
      ...(stream && { stream }),
      ...(interests && { interests }),
      ...(targetExams && { targetExams }),
      ...(notificationPreferences && { notificationPreferences })
    }

    const pref = await StudentPreference.findOneAndUpdate(
      { $or: [{ userId }, { studentEmail: userEmail }] },
      { $set: updateDoc },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    res.json({ message: 'Preferences updated successfully', preferences: pref })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
