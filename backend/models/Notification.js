import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    default: null,
    index: true
  },
  type: {
    type: String,
    default: 'info', // 'applicationStart', 'applicationEnd', 'admitCard', 'examDate', 'result', 'syllabusUpdate', 'patternChange', 'job', 'interview', 'exam', 'system', 'info'
    index: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  category: {
    type: String,
    default: 'General'
  },
  applyLink: {
    type: String,
    default: ''
  },
  officialWebsite: {
    type: String,
    default: ''
  },
  data: {
    type: Object,
    default: {}
  },
  read: {
    type: Boolean,
    default: false,
    index: true
  },
  readAt: {
    type: Date,
    default: null
  },
  deliveredEmail: {
    type: Boolean,
    default: false
  },
  emailStatus: {
    type: String,
    enum: ['sent', 'failed', 'skipped', 'pending'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
})

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema)
export default Notification
