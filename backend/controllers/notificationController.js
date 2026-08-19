import Notification from '../models/Notification.js'
import mongoose from 'mongoose'

// In-memory fallback for resilient hybrid mode
const memoryNotifications = [
  {
    _id: 'notif_1',
    userId: 'default',
    type: 'job',
    title: '🚀 High Match Job Alert',
    message: 'Google is hiring Software Engineer Interns! 92% match with your profile.',
    read: false,
    createdAt: new Date()
  },
  {
    _id: 'notif_2',
    userId: 'default',
    type: 'interview',
    title: '🎙️ Mock Interview Reminder',
    message: 'Your scheduled Full Stack mock interview is ready.',
    read: false,
    createdAt: new Date(Date.now() - 3600000)
  },
  {
    _id: 'notif_3',
    userId: 'default',
    type: 'mentor',
    title: '👥 Mentor Guidance Accepted',
    message: 'Senior Engineer from Microsoft accepted your mentorship connect request!',
    read: false,
    createdAt: new Date(Date.now() - 7200000)
  }
]

export const createNotification = async (userId, type, title, message, data = {}) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const notif = await Notification.create({ userId, type, title, message, data })
      return notif
    }
  } catch (err) {
    console.warn('DB notification error, using memory fallback:', err.message)
  }

  const memNotif = {
    _id: 'notif_' + Date.now(),
    userId: userId || 'default',
    type: type || 'info',
    title,
    message,
    data,
    read: false,
    createdAt: new Date()
  }
  memoryNotifications.unshift(memNotif)
  return memNotif
}

export const getNotifications = async (userId) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const notifs = await Notification.find({
        $or: [{ userId }, { userId: 'all' }, { userId: 'default' }]
      }).sort({ createdAt: -1 }).limit(20)
      if (notifs && notifs.length > 0) return notifs
    }
  } catch (err) {
    console.warn('DB getNotifications error, using memory fallback:', err.message)
  }

  return memoryNotifications
}

export const markNotificationRead = async (id) => {
  try {
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      await Notification.findByIdAndUpdate(id, { read: true })
      return { success: true }
    }
  } catch (err) {
    console.warn('DB markNotificationRead error:', err.message)
  }

  const item = memoryNotifications.find(n => n._id === id)
  if (item) item.read = true
  return { success: true }
}
