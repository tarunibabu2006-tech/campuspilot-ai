import mongoose from 'mongoose'

const interviewSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  role: { type: String, required: true },
  difficulty: { type: String, default: 'medium' },
  questions: [{ type: Object }],
  score: { type: Number, default: 0 },
  feedback: { type: String },
  completedAt: { type: Date, default: Date.now }
})

export default mongoose.models.Interview || mongoose.model('Interview', interviewSchema)
