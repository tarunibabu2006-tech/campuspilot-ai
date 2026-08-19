import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  loginMethod: { type: String, enum: ['google', 'email'], default: 'google' },
  department: { type: String },
  year: { type: String },
  skills: [{ type: String }],
  targetRole: { type: String },
  resume: { type: Object },
  progress: { type: Object, default: {} },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now }
})

// Students can ONLY login with Google
// Admin ONLY with email/password

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
