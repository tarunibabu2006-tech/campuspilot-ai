import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, default: '' },
  location: { type: String, default: 'Remote / India' },
  ctc: { type: String, default: '6-12 LPA' },
  experience: { type: String, default: 'Fresher' },
  type: { type: String, enum: ['full-time', 'internship', 'part-time', 'contract'], default: 'full-time' },
  applyLink: { type: String, default: '' },
  skills: [{ type: String }],
  verified: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'closed', 'draft'], default: 'active' },
  applications: { type: Number, default: 0 },
  deadline: { type: Date },
  postedBy: { type: String, default: 'admin' },
  isVerified: { type: Boolean, default: false },
  applicants: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Job || mongoose.model('Job', jobSchema)
