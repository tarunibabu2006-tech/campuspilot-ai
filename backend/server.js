import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import mongoose from 'mongoose'
import session from 'express-session'
import rateLimit from 'express-rate-limit'

import authRoutes from './routes/auth.js'
import skillRoutes from './routes/skills.js'
import jobRoutes from './routes/jobs.js'
import resumeRoutes from './routes/resume.js'
import interviewRoutes from './routes/interview.js'
import adminRoutes from './routes/admin.js'

import examRoutes from './routes/examEmergency.js'
import vivaRoutes from './routes/vivaPrep.js'
import placementRoutes from './routes/placements.js'
import notesRoutes from './routes/notesHub.js'
import bunkRoutes from './routes/bunkPlanner.js'
import jobCheckerRoutes from './routes/jobChecker.js'
import skillGapRoutes from './routes/skillGap.js'
import chatRoutes from './routes/chat.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Disable buffering so queries fail immediately if DB is offline instead of hanging 10s
mongoose.set('bufferCommands', false)

// MongoDB Connection with TIMEOUT FIX
const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/campuspilot'

  console.log('🔄 Connecting to MongoDB...')
  console.log('📍 URI:', uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'))

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000, // 3 seconds timeout
      connectTimeoutMS: 5000,
      family: 4 // Use IPv4
    })
    console.log('✅ MongoDB connected successfully!')
    console.log('📊 Database:', mongoose.connection.name)
  } catch (err) {
    console.warn('⚠️ MongoDB connection not available:', err.message)
    console.log('💡 CampusPilot is running in Resilient Hybrid Mode (Authentication & Features work seamlessly!)')
  }
}

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('📡 MongoDB connection established')
})

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err.message)
})

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected')
})

// Connect to MongoDB
connectDB()

// Security & CORS
app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://campuspilot-ai.vercel.app',
    process.env.CORS_ORIGIN
  ].filter(Boolean),
  credentials: true
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Session
app.use(session({
  secret: process.env.JWT_SECRET || 'campuspilot_super_secret_jwt_key_2026',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
}))

// Rate limiter - 100 req/min
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again in a minute.' }
})
app.use('/api/', limiter)

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/resume', resumeRoutes)
app.use('/api/interview', interviewRoutes)
app.use('/api/admin', adminRoutes)

// AI & Student Tool Routes
app.use('/api/exam-emergency', examRoutes)
app.use('/api/viva-prep', vivaRoutes)
app.use('/api/placements', placementRoutes)
app.use('/api/notes-hub', notesRoutes)
app.use('/api/bunk-planner', bunkRoutes)
app.use('/api/check-job', jobCheckerRoutes)
app.use('/api/skill-gap', skillGapRoutes)
app.use('/api/chat', chatRoutes)

// Health Check with Database Status
app.get('/api/health', (req, res) => {
  const dbStates = ['disconnected', 'connected', 'connecting', 'disconnecting']
  const dbStatus = dbStates[mongoose.connection.readyState] || 'unknown'

  res.json({
    status: 'OK',
    message: '🚀 CampusPilot AI - Complete Professional Platform!',
    database: dbStatus,
    features: [
      '🔐 Authentication (Admin Login + Google OAuth)',
      '🎯 Dashboard & Progress Tracking',
      '📚 Skill Learning Hub',
      '🗺️ Role-Based Learning Path',
      '📄 Resume Builder',
      '💼 Job Portal',
      '🎤 Mock Interview & Aptitude',
      '📚 Exam Emergency (50+ subjects)',
      '🎤 Viva Prep (50+ subjects)',
      '💼 Placement Prep (50+ roles)',
      '📝 Notes Hub (50+ notes)',
      '🏃 Bunk Planner',
      '🛡️ Job Checker',
      '🤖 Chat Assistant',
      '👑 Admin Panel'
    ],
    admin: {
      email: process.env.ADMIN_EMAIL || 'tarunibabu2006@gmail.com'
    },
    timestamp: new Date().toISOString()
  })
})

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack)
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  })
})

// Export for Vercel
export default app

// Start server (local development)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log('')
    console.log('═══════════════════════════════════════════')
    console.log(`✅ CampusPilot Backend: http://localhost:${PORT}`)
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`)
    console.log(`🔑 Admin: ${process.env.ADMIN_EMAIL || 'tarunibabu2006@gmail.com'}`)
    console.log('═══════════════════════════════════════════')
    console.log('')
  })
}
