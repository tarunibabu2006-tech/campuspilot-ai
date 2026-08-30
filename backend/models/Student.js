import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
  // Basic Info
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String },
  password: { type: String },
  role: { type: String, default: 'student' },
  department: { type: String, default: '' },
  year: { type: String, default: '' },
  semester: { type: String, default: '' },
  phone: { type: String, default: '' },
  college: { type: String, default: '' },
  cgpa: { type: Number },
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' },
  skills: [{ type: String }],
  targetRole: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  github: { type: String, default: '' },
  portfolio: { type: String, default: '' },

  // Login Tracking
  loginCount: { type: Number, default: 1 },
  firstLogin: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  loginHistory: [{
    date: { type: Date, default: Date.now },
    ip: { type: String },
    device: { type: String },
    browser: { type: String }
  }],

  // Activity Tracking
  activities: [{
    action: { type: String },
    page: { type: String },
    details: { type: Object },
    timestamp: { type: Date, default: Date.now }
  }],

  // Feature Usage Stats & Stats Summary
  testsTaken: { type: Number, default: 0 },
  jobsApplied: { type: Number, default: 0 },
  mockInterviews: { type: Number, default: 0 },
  studyGroupsCount: { type: Number, default: 0 },
  mentorSessionsCount: { type: Number, default: 0 },

  // Feature Counters
  examEmergency: { type: Number, default: 0 },
  vivaPrep: { type: Number, default: 0 },
  placementPrep: { type: Number, default: 0 },
  skillHub: { type: Number, default: 0 },
  resumeBuilder: { type: Number, default: 0 },
  jobPortal: { type: Number, default: 0 },
  mockInterview: { type: Number, default: 0 },
  aptitudeTest: { type: Number, default: 0 },
  notesHub: { type: Number, default: 0 },
  careerGps: { type: Number, default: 0 },
  resumeScorer: { type: Number, default: 0 },
  aiApply: { type: Number, default: 0 },
  mentorConnect: { type: Number, default: 0 },
  mockTests: { type: Number, default: 0 },
  skillBadge: { type: Number, default: 0 },
  careerPredictor: { type: Number, default: 0 },
  voiceInterview: { type: Number, default: 0 },
  gamification: { type: Number, default: 0 },
  studyGroups: { type: Number, default: 0 },

  // Gamification: Clean real XP default = 0
  xpPoints: { type: Number, default: 0 },
  badges: [{ type: String }],
  streak: { type: Number, default: 0 },
  lastActivityDate: { type: Date, default: Date.now },

  // Relations & Sub-docs
  resumes: [{
    template: { type: String, default: 'modern' },
    data: { type: Object },
    createdAt: { type: Date, default: Date.now }
  }],
  studyGroupList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  mentorSessionList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }],

  createdAt: { type: Date, default: Date.now }
})

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema)
export default Student
