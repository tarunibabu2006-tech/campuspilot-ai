import mongoose from 'mongoose'

const rolePathSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  domain: { type: String, default: 'Engineering' },
  salaryRange: { type: String, default: '6-18 LPA' },
  demandLevel: { type: String, default: 'Very High' },
  description: { type: String, default: '' },
  skills: [{ type: String }],
  certifications: [{ type: String }],
  careerStages: [{
    stage: { type: String },
    role: { type: String },
    experience: { type: String }
  }],
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.RolePath || mongoose.model('RolePath', rolePathSchema)
