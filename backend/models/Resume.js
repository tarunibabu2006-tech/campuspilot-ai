import mongoose from 'mongoose'

const resumeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  summary: { type: String },
  education: [{ type: Object }],
  skills: [{ type: String }],
  projects: [{ type: Object }],
  experience: [{ type: Object }],
  updatedAt: { type: Date, default: Date.now }
})

export default mongoose.models.Resume || mongoose.model('Resume', resumeSchema)
