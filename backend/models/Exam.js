import mongoose from 'mongoose'

const examSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  conductingBody: {
    type: String,
    required: true,
    trim: true,
    index: true // e.g., 'NTA', 'UPSC', 'SSC', 'IBPS', 'SBI', 'IIT', 'RRB', 'State PSC'
  },
  category: {
    type: String,
    required: true,
    trim: true,
    index: true // 'Engineering', 'Medical', 'Government', 'Banking', 'Defence', 'Civil Services', 'Teaching', 'Higher Education'
  },
  stream: [{
    type: String,
    trim: true // 'Science', 'Commerce', 'Arts', 'Engineering', 'Medical', 'Any'
  }],
  eligibility: {
    type: String,
    required: true // '10th Pass', '12th Pass', 'UG / Diploma', 'Graduate', 'Post Graduate', 'B.E / B.Tech'
  },
  examDate: {
    type: String,
    required: true // Can be ISO date or formatted string like '2026-04-15'
  },
  applicationStart: {
    type: String,
    required: true // '2026-01-15'
  },
  applicationEnd: {
    type: String,
    required: true // '2026-02-15'
  },
  admitCardDate: {
    type: String,
    default: ''
  },
  resultDate: {
    type: String,
    default: ''
  },
  officialWebsite: {
    type: String,
    required: true
  },
  applyLink: {
    type: String,
    required: true
  },
  notificationUrl: {
    type: String,
    default: ''
  },
  syllabus: {
    type: String,
    default: ''
  },
  examPattern: {
    type: String,
    default: ''
  },
  previousPapers: {
    type: String,
    default: ''
  },
  notificationTitle: {
    type: String,
    default: ''
  },
  notificationDescription: {
    type: String,
    default: ''
  },
  notificationType: {
    type: String,
    default: 'applicationStart' // 'applicationStart', 'applicationEnd', 'admitCard', 'examDate', 'result', 'syllabusUpdate', 'patternChange'
  },
  status: {
    type: String,
    enum: ['active', 'upcoming', 'expired'],
    default: 'active',
    index: true
  },
  vacancies: {
    type: String,
    default: 'Not Specified'
  },
  ageLimit: {
    type: String,
    default: '18-30 Years'
  },
  salaryScale: {
    type: String,
    default: ''
  },
  bookmarkedBy: [{
    type: String // user IDs
  }],
  viewCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Auto-update updatedAt
examSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

const Exam = mongoose.models.Exam || mongoose.model('Exam', examSchema)
export default Exam
