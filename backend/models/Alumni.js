import mongoose from 'mongoose'

const alumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  batch: { type: String, required: true },
  img: { type: String, required: true }, // The initial for the avatar
  linkedinUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Alumni || mongoose.model('Alumni', alumniSchema)
