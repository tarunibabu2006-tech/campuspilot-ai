import express from 'express'
import Exam from '../models/Exam.js'
import Notification from '../models/Notification.js'
import { adminMiddleware } from '../middleware/auth.js'
import { syncOfficialExamFeeds } from '../utils/examScraper.js'
import { notificationEngine } from '../utils/notificationEngine.js'
import mongoose from 'mongoose'

const router = express.Router()

// Apply adminMiddleware to all routes here
router.use(adminMiddleware)

// ── 1. CREATE NEW EXAM & BROADCAST NOTIFICATION ────────────────────
router.post('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const {
      examName,
      conductingBody,
      category,
      stream,
      eligibility,
      examDate,
      applicationStart,
      applicationEnd,
      admitCardDate,
      resultDate,
      officialWebsite,
      applyLink,
      notificationUrl,
      syllabus,
      examPattern,
      previousPapers,
      notificationTitle,
      notificationDescription,
      notificationType = 'applicationStart',
      status = 'active',
      vacancies,
      sendNotificationsImmediately = true
    } = req.body

    if (!examName || !conductingBody || !category || !eligibility || !applyLink) {
      return res.status(400).json({ error: 'Please provide all required fields (examName, conductingBody, category, eligibility, applyLink)' })
    }

    // Create exam document
    const newExam = await Exam.create({
      examName,
      conductingBody,
      category,
      stream: Array.isArray(stream) ? stream : [stream || 'Any'],
      eligibility,
      examDate,
      applicationStart,
      applicationEnd,
      admitCardDate: admitCardDate || '',
      resultDate: resultDate || '',
      officialWebsite,
      applyLink,
      notificationUrl: notificationUrl || '',
      syllabus: syllabus || '',
      examPattern: examPattern || '',
      previousPapers: previousPapers || '',
      notificationTitle: notificationTitle || `📢 ${examName} Announced!`,
      notificationDescription: notificationDescription || `Applications invited for ${examName} by ${conductingBody}.`,
      notificationType,
      status,
      vacancies: vacancies || 'Not Specified'
    })

    let notificationStats = null
    if (sendNotificationsImmediately) {
      notificationStats = await notificationEngine.processNewExam(newExam, notificationType)
    }

    res.status(201).json({
      message: 'Exam created successfully',
      exam: newExam,
      notifications: notificationStats
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── 2. UPDATE EXAM ──────────────────────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const { triggerNotification, notificationType = 'syllabusUpdate', ...updates } = req.body
    const exam = await Exam.findByIdAndUpdate(req.params.id, updates, { new: true })

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' })
    }

    let notificationStats = null
    if (triggerNotification) {
      notificationStats = await notificationEngine.processNewExam(exam, notificationType)
    }

    res.json({
      message: 'Exam updated successfully',
      exam,
      notifications: notificationStats
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── 3. DELETE EXAM ──────────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const exam = await Exam.findByIdAndDelete(req.params.id)
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' })
    }

    res.json({ message: 'Exam deleted successfully', id: req.params.id })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── 4. MANUAL SCRAPE / SYNC ─────────────────────────────────────────
router.post('/scrape', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const result = await syncOfficialExamFeeds()
    res.json({
      message: 'Official exam feeds synchronized successfully',
      result
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── 5. MANUAL NOTIFICATION BROADCAST FOR AN EXAM ────────────────────
router.post('/:id/notify', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const exam = await Exam.findById(req.params.id)
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' })
    }

    const { type = 'applicationStart', title, message, priority = 'high', skipEmail = false } = req.body
    const stats = await notificationEngine.processNewExam(exam, type, { title, message, priority, skipEmail })

    res.json({
      message: 'Broadcast completed',
      stats
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── 6. NOTIFICATION DELIVERY ANALYTICS ───────────────────────────────
router.get('/analytics', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const [totalNotifications, unreadCount, readCount, examCount] = await Promise.all([
      Notification.countDocuments(),
      Notification.countDocuments({ read: false }),
      Notification.countDocuments({ read: true }),
      Exam.countDocuments()
    ])

    const recentNotifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('examId', 'examName conductingBody')
      .lean()

    res.json({
      totalNotifications,
      unreadCount,
      readCount,
      totalExams: examCount,
      openRate: totalNotifications > 0 ? `${((readCount / totalNotifications) * 100).toFixed(1)}%` : '0%',
      recentNotifications
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
