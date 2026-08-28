import mongoose from 'mongoose'

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  experience: { type: Number, default: 1 },
  expertise: [{ type: String }],
  rating: { type: Number, default: 4.5 },
  sessions: { type: Number, default: 0 },
  mentees: { type: Number, default: 0 },
  available: { type: Boolean, default: true },
  bio: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  photo: { type: String, default: '' },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Mentor || mongoose.model('Mentor', mentorSchema)
