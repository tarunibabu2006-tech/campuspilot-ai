import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String },
  location: { type: String, default: 'Remote / India' },
  salary: { type: String, default: '6-12 LPA' },
  applyLink: { type: String, required: true },
  requirements: [{ type: String }],
  skills: [{ type: String }],
  postedBy: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Job || mongoose.model('Job', jobSchema)
