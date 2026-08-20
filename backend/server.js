import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import mongoose from 'mongoose'
import session from 'express-session'
import rateLimit from 'express-rate-limit'

import logger from './utils/logger.js'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './utils/swagger.js'

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

// NEW FEATURE ROUTES
import careerGpsRoutes from './routes/careerGps.js'
import resumeScorerRoutes from './routes/resumeScorer.js'
import aiApplyRoutes from './routes/aiApply.js'
import mentorRoutes from './routes/mentorConnect.js'
import mockTestRoutes from './routes/mockTests.js'
import skillBadgeRoutes from './routes/skillBadge.js'
import careerPredictorRoutes from './routes/careerPredictor.js'
import voiceInterviewRoutes from './routes/voiceInterview.js'
import gamificationRoutes from './routes/gamification.js'
import notificationRoutes from './routes/notifications.js'
import groupRoutes from './routes/groups.js'
import { trackActivity } from './middleware/trackActivity.js'
import { connectRedis } from './utils/redis.js'

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
    logger.info('✅ MongoDB connected successfully!')
    logger.info(`📊 Database: ${mongoose.connection.name}`)
  } catch (err) {
    logger.warn(`⚠️ MongoDB connection not available: ${err.message}`)
    logger.info('💡 CampusPilot is running in Resilient Hybrid Mode (Authentication & Features work seamlessly!)')
  }
}

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  logger.info('📡 MongoDB connection established')
})

mongoose.connection.on('error', (err) => {
  logger.error(`❌ MongoDB connection error: ${err.message}`)
})

mongoose.connection.on('disconnected', () => {
  logger.warn('⚠️ MongoDB disconnected')
})

// Connect to MongoDB & Redis
connectRedis()
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

// ═══════════════════════════════════════════
// 📖 Swagger API Docs (available at /api-docs)
// ═══════════════════════════════════════════
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { background-color: #1a1f35; }',
  customSiteTitle: 'CampusPilot AI - API Docs',
  customfavIcon: '/favicon.ico'
}))
// JSON endpoint for external tools (Postman, Insomnia)
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})
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

// Student Activity & Login Tracker Middleware
app.use(trackActivity)

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

// NEW FEATURE ROUTES
app.use('/api/career-gps', careerGpsRoutes)
app.use('/api/resume-score', resumeScorerRoutes)
app.use('/api/ai-apply', aiApplyRoutes)
app.use('/api/mentors', mentorRoutes)
app.use('/api/mock-tests', mockTestRoutes)
app.use('/api/skill-badge', skillBadgeRoutes)
app.use('/api/career-predictor', careerPredictorRoutes)
app.use('/api/voice-interview', voiceInterviewRoutes)
app.use('/api/gamification', gamificationRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/groups', groupRoutes)

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
      '📝 Notes Hub (1000+ notes)',
      '🏃 Bunk Planner',
      '🛡️ Job Checker',
      '🤖 Chat Assistant',
      '👑 Admin Panel',
      '🗺️ Career GPS (Skill Gap + Roadmap)',
      '📊 Resume Scorer (AI 0-100 Score)',
      '🤖 AI Application Proxy (Auto Apply)',
      '👥 Mentor Connect (Industry Experts)',
      '📝 Company Mock Tests (TCS/Amazon/Google)'
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
  logger.error(`❌ Error: ${err.stack}`)
  
  const statusCode = err.statusCode || 500
  const status = err.status || 'error'

  res.status(statusCode).json({
    status,
    error: err.name || 'Internal Server Error',
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

// Export for Vercel
export default app

// Start server (local development)
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info('═══════════════════════════════════════════')
    logger.info(`✅ CampusPilot Backend: http://localhost:${PORT}`)
    logger.info(`📡 Health Check: http://localhost:${PORT}/api/health`)
    logger.info(`🔑 Admin: ${process.env.ADMIN_EMAIL || 'tarunibabu2006@gmail.com'}`)
    logger.info('═══════════════════════════════════════════')
  })
}
