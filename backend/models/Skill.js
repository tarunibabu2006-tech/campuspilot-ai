import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  domain: { type: String, required: true },
  description: { type: String },
  notes: { type: String },
  resources: [{ type: String }],
  videos: [{ type: String }],
  duration: { type: String },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  requiredForRoles: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Skill || mongoose.model('Skill', skillSchema)
