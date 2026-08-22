import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  subject: { type: String },
  readTime: { type: String, default: '5 min' },
  author: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Note || mongoose.model('Note', noteSchema)
