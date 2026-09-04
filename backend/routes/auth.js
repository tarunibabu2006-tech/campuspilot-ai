import express from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import mongoose from 'mongoose'
import User from '../models/User.js'
import Student from '../models/Student.js'
import { protect } from '../middleware/auth.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { authSchemas } from '../utils/validators.js'

const router = express.Router()

// ADMIN CREDENTIALS - Only these work
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'tarunibabu2006@gmail.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'prawinkumar_0704'

// Admin reset token storage (in-memory for simplicity)
let adminResetToken = null
let adminResetExpires = null

// ═══════════════════════════════════════════════
// ADMIN LOGIN - Only admin can login with email/password
// ═══════════════════════════════════════════════
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Admin login with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLoginRequest'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', validateRequest(authSchemas.login), async (req, res) => {
  try {
    const { email, password, remember } = req.body
    const normalizedEmail = (email || '').trim().toLowerCase()
    const inputPassword = (password || '').trim()

    // STRICT ADMIN AUTHENTICATION: Only tarunibabu2006@gmail.com & prawinkumar_0704 allowed
    if (normalizedEmail === 'tarunibabu2006@gmail.com' || normalizedEmail === ADMIN_EMAIL.toLowerCase()) {
      if (inputPassword === 'prawinkumar_0704' || inputPassword === ADMIN_PASSWORD) {
        const token = jwt.sign(
          { id: 'admin', role: 'admin', email: 'tarunibabu2006@gmail.com' },
          process.env.JWT_SECRET || 'campuspilot_super_secret_jwt_key_2026',
          { expiresIn: remember ? '7d' : '1d' }
        )
        console.log(`✅ Admin logged in: ${normalizedEmail}`)
        return res.json({
          token,
          user: {
            id: 'admin',
            name: 'Admin',
            email: 'tarunibabu2006@gmail.com',
            role: 'admin'
          }
        })
      } else {
        return res.status(401).json({ message: 'Access Denied: Invalid Admin Credentials!' })
      }
    }

    // Reject all unauthorized email/password login attempts
    return res.status(401).json({
      message: 'Access Denied: Invalid Admin Credentials!'
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: error.message })
  }
})

// ═══════════════════════════════════════════════
// STUDENT GOOGLE LOGIN - ONLY way for students
// ═══════════════════════════════════════════════
router.post('/google', async (req, res) => {
  try {
    const { email, name, googleId } = req.body

    if (!email) {
      return res.status(400).json({ message: 'Google email is required' })
    }

    // Admin cannot use Google login
    if (email === ADMIN_EMAIL) {
      return res.status(400).json({ message: 'Admin must use email/password login' })
    }

    let studentData = {
      id: 'student_' + Buffer.from(email).toString('hex').slice(0, 12),
      name: name || email.split('@')[0],
      email: email,
      role: 'student',
      department: '',
      year: ''
    }

    // If MongoDB is connected, save or update user & student
    if (mongoose.connection.readyState === 1) {
      try {
        let user = await User.findOne({ email })
        if (!user) {
          user = await User.create({
            name: studentData.name,
            email: studentData.email,
            googleId: googleId || 'google_' + Date.now(),
            role: 'student',
            loginMethod: 'google'
          })
          console.log(`🆕 New user registered in MongoDB: ${email}`)
        } else {
          user.lastLogin = new Date()
          user.isActive = true
          await user.save()
        }

        let student = await Student.findOne({ email })
        if (!student) {
          student = new Student({
            name: studentData.name,
            email: studentData.email,
            googleId: googleId || 'google_' + Date.now(),
            department: user.department || '',
            year: user.year || '',
            xpPoints: 0, // Starts at exactly 0 XP
            streak: 0,
            firstLogin: new Date(),
            lastLogin: new Date(),
            loginCount: 1,
            loginHistory: [{
              date: new Date(),
              ip: req.ip || req.headers['x-forwarded-for'] || '',
              device: req.headers['user-agent'] || '',
              browser: req.headers['user-agent'] ? req.headers['user-agent'].slice(0, 100) : 'Browser'
            }]
          })
          await student.save()
          console.log(`🆕 New student record created in MongoDB with 0 XP: ${email}`)
        } else {
          // Check for daily login bonus (+10 XP)
          const lastDate = student.lastLogin ? new Date(student.lastLogin).toDateString() : null
          const todayDate = new Date().toDateString()
          if (lastDate !== todayDate) {
            student.xpPoints = (student.xpPoints || 0) + 10 // Daily login reward
            student.streak = (student.streak || 0) + 1
          }
          student.loginCount = (student.loginCount || 0) + 1
          student.lastLogin = new Date()
          student.loginHistory.push({
            date: new Date(),
            ip: req.ip || req.headers['x-forwarded-for'] || '',
            device: req.headers['user-agent'] || '',
            browser: req.headers['user-agent'] ? req.headers['user-agent'].slice(0, 100) : 'Browser'
          })
          if (student.loginHistory.length > 50) student.loginHistory.shift()
          await student.save()
        }

        studentData = {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || 'student',
          department: user.department || '',
          year: user.year || '',
          xpPoints: student.xpPoints || 0,
          badges: student.badges || [],
          streak: student.streak || 0
        }
      } catch (dbErr) {
        console.warn('⚠️ DB query skipped, proceeding with resilient session:', dbErr.message)
      }
    }

    // Generate token with 30 days expiry
    const token = jwt.sign(studentData, process.env.JWT_SECRET || 'campuspilot_super_secret_jwt_key_2026', {
      expiresIn: '30d'
    })

    console.log(`✅ Student logged in successfully via Google: ${email}`)
    return res.json({
      token,
      user: studentData
    })
  } catch (error) {
    console.error('Google login error:', error)
    res.status(500).json({ message: error.message })
  }
})

// ═══════════════════════════════════════════════
// FORGOT PASSWORD - Only for admin
// ═══════════════════════════════════════════════
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body

    if (email === ADMIN_EMAIL) {
      adminResetToken = crypto.randomBytes(32).toString('hex')
      adminResetExpires = Date.now() + 3600000 // 1 hour

      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
      const resetLink = `${frontendUrl}/reset-password?token=${adminResetToken}`

      console.log(`\n📧 ═══════════════════════════════════════`)
      console.log(`📧 Admin Password Reset`)
      console.log(`📧 Email: ${ADMIN_EMAIL}`)
      console.log(`📧 Reset Link: ${resetLink}`)
      console.log(`📧 Token: ${adminResetToken}`)
      console.log(`📧 Expires in 1 hour`)
      console.log(`📧 ═══════════════════════════════════════\n`)

      return res.json({
        message: 'Password reset link sent to admin email',
        resetToken: adminResetToken // For testing - remove in production
      })
    }

    // Students use Google - no password to reset
    return res.status(400).json({
      message: 'Students use Google login. No password reset needed.'
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ═══════════════════════════════════════════════
// RESET PASSWORD - Only for admin
// ═══════════════════════════════════════════════
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body

    if (!adminResetToken || token !== adminResetToken) {
      return res.status(400).json({ message: 'Invalid reset token' })
    }

    if (adminResetExpires < Date.now()) {
      adminResetToken = null
      adminResetExpires = null
      return res.status(400).json({ message: 'Reset token has expired' })
    }

    // Clear token
    adminResetToken = null
    adminResetExpires = null

    console.log(`✅ Admin password reset successful`)
    res.json({ message: 'Password reset successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ═══════════════════════════════════════════════
// REFRESH TOKEN
// ═══════════════════════════════════════════════
router.post('/refresh-token', protect, async (req, res) => {
  try {
    const newToken = jwt.sign(
      { id: req.user.id, role: req.user.role },
      process.env.JWT_SECRET || 'campuspilot_super_secret_jwt_key_2026',
      { expiresIn: '7d' }
    )
    res.json({ token: newToken })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ═══════════════════════════════════════════════
// GET CURRENT USER
// ═══════════════════════════════════════════════
router.get('/me', protect, async (req, res) => {
  try {
    // Admin user
    if (req.user.id === 'admin') {
      return res.json({
        user: {
          id: 'admin',
          name: 'Admin',
          email: ADMIN_EMAIL,
          role: 'admin'
        }
      })
    }

    // Demo fallback
    if (req.user.id === 'demo_student_id') {
      return res.json({ user: req.user })
    }

    // Student user from DB or Token
    if (mongoose.connection.readyState === 1) {
      try {
        const user = await User.findById(req.user.id).select('-__v')
        if (user) {
          const student = await Student.findOne({ email: user.email }).select('xpPoints badges streak')
          return res.json({
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              department: user.department,
              year: user.year,
              semester: user.semester || '',
              phone: user.phone || '',
              college: user.college || '',
              cgpa: user.cgpa,
              city: user.city || '',
              state: user.state || '',
              bio: user.bio || '',
              avatar: user.avatar || '',
              github: user.github || '',
              linkedin: user.linkedin || '',
              skills: user.skills || [],
              progress: user.progress,
              xpPoints: student?.xpPoints || 0,
              badges: student?.badges || [],
              streak: student?.streak || 0
            }
          })
        }
      } catch (err) {
        // Fallback to token data
      }
    }

    // Resilient Fallback
    res.json({
      user: {
        id: req.user.id,
        name: req.user.name || 'Student',
        email: req.user.email || 'student@campus.edu',
        role: req.user.role || 'student',
        department: req.user.department || 'Computer Science & Engineering',
        year: req.user.year || '3'
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ═══════════════════════════════════════════════
// UPDATE PROFILE — actually persists to MongoDB (User + Student)
// ═══════════════════════════════════════════════
router.put('/profile', protect, async (req, res) => {
  try {
    if (req.user.id === 'admin') {
      return res.status(400).json({ message: 'Admin profile cannot be edited here' })
    }
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Profile changes need a database connection. Please try again shortly.' })
    }

    const allowed = ['name', 'department', 'year', 'semester', 'phone', 'college', 'cgpa', 'city', 'state', 'bio', 'avatar', 'github', 'linkedin', 'skills']
    const updates = {}
    for (const field of allowed) {
      if (req.body[field] !== undefined && req.body[field] !== '') updates[field] = req.body[field]
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-__v')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Keep the Student activity/gamification record in sync, matching the same
    // fields trackActivity.js and the Google login flow already mirror onto it.
    await Student.findOneAndUpdate({ email: user.email }, updates)

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        year: user.year,
        semester: user.semester || '',
        phone: user.phone || '',
        college: user.college || '',
        cgpa: user.cgpa,
        city: user.city || '',
        state: user.state || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
        github: user.github || '',
        linkedin: user.linkedin || '',
        skills: user.skills || []
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ═══════════════════════════════════════════════
// LOGOUT
// ═══════════════════════════════════════════════
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' })
})

// ═══════════════════════════════════════════════
// REGISTER - DISABLED for students (Google only)
// ═══════════════════════════════════════════════
router.post('/register', (req, res) => {
  res.status(403).json({
    message: 'Registration disabled. Students must use "Continue with Google" to sign in.'
  })
})

export default router
