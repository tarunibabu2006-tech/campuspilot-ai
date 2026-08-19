import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
  // Basic Info
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String },
  
  // Profile
  department: { type: String, default: 'Computer Science & Engineering' },
  year: { type: String, default: '3' },
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
  
  // Feature Usage Counts
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
  
  createdAt: { type: Date, default: Date.now }
})

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema)
export default Student
