import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  studentName: { type: String, default: 'Student' },
  studentEmail: { type: String, default: '' },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  },
  jobIdStr: { type: String },
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  domain: { type: String },
  type: {
    type: String,
    enum: ['manual', 'ai'],
    default: 'ai'
  },
  source: {
    type: String,
    default: 'company'
  },
  status: {
    type: String,
    enum: ['awaiting_confirmation', 'confirmed', 'applied', 'shortlisted', 'interview', 'rejected', 'selected', 'failed', 'awaiting_manual_verification'],
    default: 'awaiting_confirmation'
  },
  applicationId: { type: String, required: true },
  submissionId: { type: String },
  applicationLink: { type: String },
  salary: { type: String },
  location: { type: String },
  matchScore: { type: Number, default: 85 },
  tailoredSkills: [{ type: String }],
  coverLetter: { type: String },
  appliedDate: { type: Date, default: Date.now },

  // Email Confirmation Verification Data
  emailVerified: { type: Boolean, default: false },
  confirmedAt: { type: Date },
  confirmationEmailId: { type: String },
  confirmationSender: { type: String },
  confirmationSubject: { type: String },
  confirmationSnippet: { type: String },
  verificationAttempts: { type: Number, default: 0 },
  verificationLogs: [{
    timestamp: { type: Date, default: Date.now },
    status: String,
    message: String
  }]
}, { timestamps: true })

const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema)
export default Application
