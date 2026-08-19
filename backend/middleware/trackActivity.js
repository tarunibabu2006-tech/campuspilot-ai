import mongoose from 'mongoose'
import Student from '../models/Student.js'

// In-memory activity store when MongoDB is in fallback mode
export const memoryStudentStore = new Map()

export const trackActivity = async (req, res, next) => {
  const originalSend = res.send

  res.send = function (data) {
    // Fire and forget tracking so response is never blocked
    setImmediate(() => {
      trackStudentActivity(req, res).catch(err => {
        console.error('Activity tracker warning:', err.message)
      })
    })
    return originalSend.call(this, data)
  }

  next()
}

const trackStudentActivity = async (req, res) => {
  try {
    const path = req.path || req.originalUrl || ''
    if (path === '/api/health' || path.startsWith('/api/admin')) return

    // Extract user info from JWT header or body (for auth calls)
    let email = req.user?.email || (req.body && req.body.email)
    let name = req.user?.name || (req.body && req.body.name) || (email ? email.split('@')[0] : 'Student')
    let userId = req.user?.id

    if (!email && !userId) return
    if (email === process.env.ADMIN_EMAIL || req.user?.role === 'admin') return

    const studentKey = email || userId

    const featureMap = {
      '/api/exam-emergency': 'examEmergency',
      '/api/viva-prep': 'vivaPrep',
      '/api/placements': 'placementPrep',
      '/api/skills': 'skillHub',
      '/api/resume': 'resumeBuilder',
      '/api/jobs': 'jobPortal',
      '/api/interview': 'mockInterview',
      '/api/interview/aptitude': 'aptitudeTest',
      '/api/notes': 'notesHub',
      '/api/career-gps': 'careerGps',
      '/api/resume-score': 'resumeScorer',
      '/api/ai-apply': 'aiApply',
      '/api/mentors': 'mentorConnect',
      '/api/mock-tests': 'mockTests',
      '/api/skill-badge': 'skillBadge'
    }

    let matchedFeature = null
    for (const [routePath, field] of Object.entries(featureMap)) {
      if (path.includes(routePath)) {
        matchedFeature = field
        break
      }
    }

    const activity = {
      action: req.method,
      page: path,
      feature: matchedFeature || 'General Page',
      details: {
        statusCode: res.statusCode,
        query: req.query
      },
      timestamp: new Date()
    }

    // 1. Update in-memory store
    let memStudent = memoryStudentStore.get(studentKey)
    if (!memStudent) {
      memStudent = {
        id: studentKey,
        name: name,
        email: email || `${studentKey}@student.edu`,
        department: req.user?.department || 'Computer Science & Engineering',
        year: req.user?.year || '3',
        loginCount: 1,
        firstLogin: new Date(),
        lastLogin: new Date(),
        loginHistory: [{
          date: new Date(),
          ip: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
          device: req.headers['user-agent'] ? req.headers['user-agent'].slice(0, 100) : 'Browser',
          browser: req.headers['user-agent'] ? req.headers['user-agent'].slice(0, 100) : 'Web'
        }],
        activities: [],
        examEmergency: 0,
        vivaPrep: 0,
        placementPrep: 0,
        skillHub: 0,
        resumeBuilder: 0,
        jobPortal: 0,
        mockInterview: 0,
        aptitudeTest: 0,
        notesHub: 0,
        careerGps: 0,
        resumeScorer: 0,
        aiApply: 0,
        mentorConnect: 0,
        mockTests: 0,
        skillBadge: 0,
        createdAt: new Date()
      }
      memoryStudentStore.set(studentKey, memStudent)
    }

    memStudent.activities.push(activity)
    if (memStudent.activities.length > 50) memStudent.activities.shift()
    if (matchedFeature) {
      memStudent[matchedFeature] = (memStudent[matchedFeature] || 0) + 1
    }

    if (path === '/api/auth/google' || path === '/api/auth/login') {
      memStudent.loginCount = (memStudent.loginCount || 0) + 1
      memStudent.lastLogin = new Date()
      memStudent.loginHistory.push({
        date: new Date(),
        ip: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
        device: req.headers['user-agent'] ? req.headers['user-agent'].slice(0, 100) : 'Browser',
        browser: req.headers['user-agent'] ? req.headers['user-agent'].slice(0, 100) : 'Web'
      })
    }

    // 2. If MongoDB is ready, persist to MongoDB
    if (mongoose.connection.readyState === 1 && email) {
      let student = await Student.findOne({ email })
      if (!student) {
        student = new Student({
          name: name,
          email: email,
          googleId: req.body?.googleId || '',
          firstLogin: new Date(),
          lastLogin: new Date(),
          loginCount: 1,
          loginHistory: [{
            date: new Date(),
            ip: req.ip || req.headers['x-forwarded-for'] || '',
            device: req.headers['user-agent'] || ''
          }]
        })
      }

      student.activities.push(activity)
      if (matchedFeature) {
        student[matchedFeature] = (student[matchedFeature] || 0) + 1
      }

      if (path === '/api/auth/google' || path === '/api/auth/login') {
        student.loginCount = (student.loginCount || 0) + 1
        student.lastLogin = new Date()
        student.loginHistory.push({
          date: new Date(),
          ip: req.ip || req.headers['x-forwarded-for'] || '',
          device: req.headers['user-agent'] || ''
        })
      }

      await student.save()
    }
  } catch (error) {
    console.error('Activity tracking error:', error.message)
  }
}
