import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  loginMethod: { type: String, enum: ['google', 'email'], default: 'google' },
  department: { type: String },
  year: { type: String },
  semester: { type: String },
  phone: { type: String },
  college: { type: String },
  cgpa: { type: Number },
  city: { type: String },
  state: { type: String },
  bio: { type: String },
  avatar: { type: String },
  github: { type: String },
  linkedin: { type: String },
  skills: [{ type: String }],
  targetRole: { type: String },
  experience: { type: Number, default: 0 },
  education: { type: String, default: 'B.Tech / B.E / BCA' },
  resume: { type: Object },
  progress: { type: Object, default: {} },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },

  // Gmail OAuth & Verification Settings
  gmailConnected: { type: Boolean, default: false },
  gmailEmail: { type: String },
  gmailRefreshToken: { type: String },
  gmailAccessToken: { type: String },
  emailNotificationsEnabled: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
