import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
  // Basic Info
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String },
  department: { type: String, default: '' },
  year: { type: String, default: '' },
  skills: [{ type: String }],
  targetRole: { type: String, default: '' },

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

  // Feature Usage Counters
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

  // Gamification 2.0
  xpPoints: { type: Number, default: 150 },
  badges: [{ type: String }],
  streak: { type: Number, default: 3 },
  lastActivityDate: { type: Date, default: Date.now },
  weeklyChallenges: [{
    challenge: { type: String },
    xp: { type: Number, default: 50 },
    completed: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
  }],

  // Career Predictor Data
  careerPath: [{
    stage: { type: String },
    role: { type: String },
    skills: [{ type: String }],
    certifications: [{ type: String }],
    salary: { type: String },
    timeline: { type: String }
  }],

  // Voice Interview Data
  voiceInterviews: [{
    date: { type: Date, default: Date.now },
    role: { type: String },
    score: { type: Number },
    feedback: { type: String },
    transcript: { type: String }
  }],

  // Study Groups
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],

  createdAt: { type: Date, default: Date.now }
})

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema)
export default Student
