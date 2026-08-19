import express from 'express'
import { createNotification, getNotifications, markNotificationRead } from '../controllers/notificationController.js'

const router = express.Router()

// POST /api/notifications/create
router.post('/create', async (req, res) => {
  try {
    const { userId, type, title, message, data } = req.body
    if (!title || !message) {
      return res.status(400).json({ error: 'Title and message are required' })
    }
    const notification = await createNotification(userId || 'default', type, title, message, data)
    res.json(notification)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/notifications
router.get('/', async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId || 'default'
    const notifications = await getNotifications(userId)
    res.json(notifications)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// PUT /api/notifications/:id/read
router.put('/:id/read', async (req, res) => {
  try {
    const result = await markNotificationRead(req.params.id)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
