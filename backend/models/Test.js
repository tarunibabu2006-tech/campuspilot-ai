import mongoose from 'mongoose'

const testSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  type: { type: String, enum: ['aptitude', 'technical', 'coding', 'hr', 'mock'], default: 'aptitude' },
  category: { type: String, required: true },
  duration: { type: Number, default: 60 }, // minutes
  totalMarks: { type: Number, default: 100 },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  questions: [{
    question: { type: String, required: true },
    options: [{ type: String }],
    answer: { type: String },
    explanation: { type: String },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    marks: { type: Number, default: 1 }
  }],
  attempts: { type: Number, default: 0 },
  avgScore: { type: Number, default: 0 },
  tags: [{ type: String }],
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Test || mongoose.model('Test', testSchema)
