import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true, index: true },
  subject: { type: String, default: '', index: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' },
  unit: { type: String, default: '' },
  content: { type: String, default: '' },
  readTime: { type: String, default: '5 min' },
  flashcards: [{
    front: { type: String },
    back: { type: String }
  }],
  author: { type: String, default: 'admin' },
  // True once real content has actually been written for this topic (by AI on first
  // open, or by an admin via the Custom Notes panel). Catalog entries start false —
  // real, requestable topics with no fabricated content, ratings, or download counts.
  generated: { type: Boolean, default: false, index: true },
  generatedAt: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
})

noteSchema.index({ title: 'text', subject: 'text' })
noteSchema.index({ category: 1, subject: 1 })
noteSchema.index({ title: 1, subject: 1, category: 1, level: 1 }, { unique: true })

export default mongoose.models.Note || mongoose.model('Note', noteSchema)
