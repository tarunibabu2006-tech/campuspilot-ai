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
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  type: {
    type: String,
    enum: ['manual', 'ai'],
    default: 'ai'
  },
  source: {
    type: String,
    enum: ['company', 'linkedin', 'naukri', 'internshala', 'indeed', 'wellfound'],
    default: 'company'
  },
  status: {
    type: String,
    enum: ['pending', 'applied', 'shortlisted', 'interview', 'rejected', 'selected'],
    default: 'applied'
  },
  applicationId: { type: String },
  applicationLink: { type: String },
  confirmationEmail: { type: String },
  appliedDate: { type: Date, default: Date.now },
  salary: { type: String },
  location: { type: String },
  matchScore: { type: Number, default: 80 },
  tailoredSkills: [{ type: String }],
  coverLetter: { type: String },
  tracking: {
    emailSent: { type: Boolean, default: true },
    emailOpened: { type: Boolean, default: false },
    reviewedBy: { type: Date },
    interviewDate: { type: Date }
  }
}, { timestamps: true })

const Application = mongoose.model('Application', applicationSchema)
export default Application
