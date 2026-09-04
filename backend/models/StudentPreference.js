import mongoose from 'mongoose'

const studentPreferenceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  studentEmail: {
    type: String,
    required: true,
    index: true
  },
  class: {
    type: String,
    enum: ['10th', '12th', 'UG', 'PG', 'Graduate', 'Diploma'],
    default: 'UG'
  },
  stream: {
    type: String,
    enum: ['Science', 'Commerce', 'Arts', 'Engineering', 'Medical', 'General'],
    default: 'Engineering'
  },
  interests: [{
    type: String,
    trim: true // e.g. ['Engineering', 'Data Science', 'Banking', 'Civil Services', 'Defence']
  }],
  targetExams: [{
    type: String,
    trim: true // e.g. ['JEE Main', 'UPSC CSE', 'GATE', 'IBPS PO', 'SSC CGL']
  }],
  notificationPreferences: {
    email: {
      type: Boolean,
      default: true
    },
    inApp: {
      type: Boolean,
      default: true
    },
    frequency: {
      type: String,
      enum: ['instant', 'daily', 'weekly'],
      default: 'instant'
    },
    types: {
      applicationStart: { type: Boolean, default: true },
      applicationEnd: { type: Boolean, default: true },
      admitCard: { type: Boolean, default: true },
      examDate: { type: Boolean, default: true },
      result: { type: Boolean, default: true },
      syllabusUpdate: { type: Boolean, default: true },
      patternChange: { type: Boolean, default: true }
    },
    categories: [{
      type: String // e.g. ['Engineering', 'Government', 'Banking', 'Medical', 'Defence']
    }]
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

studentPreferenceSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

const StudentPreference = mongoose.models.StudentPreference || mongoose.model('StudentPreference', studentPreferenceSchema)
export default StudentPreference
