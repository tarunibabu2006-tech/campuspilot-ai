import Student from '../models/Student.js'
import StudentPreference from '../models/StudentPreference.js'
import Exam from '../models/Exam.js'
import Notification from '../models/Notification.js'
import { buildExamEmailHTML, buildDailyDigestEmailHTML } from './emailTemplates.js'
import nodemailer from 'nodemailer'
import logger from './logger.js'

class NotificationEngine {
  constructor() {
    this.transporter = null
  }

  getTransporter() {
    if (this.transporter) return this.transporter

    const user = process.env.MAIL_USER || process.env.ADMIN_EMAIL
    const pass = process.env.MAIL_PASS

    if (!user || !pass) {
      logger.warn('⚠️ NotificationEngine: MAIL_USER/MAIL_PASS not configured. Email dispatch will be simulated.')
      return null
    }

    try {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass }
      })
      return this.transporter
    } catch (err) {
      logger.error(`NotificationEngine Transporter Error: ${err.message}`)
      return null
    }
  }

  /**
   * Determine whether a student is eligible for a specific exam
   */
  isStudentEligible(student, pref, exam) {
    const studentClass = (pref?.class || student?.year ? 'UG' : 'Graduate').toLowerCase()
    const studentStream = (pref?.stream || student?.department || 'Engineering').toLowerCase()
    const studentInterests = (pref?.interests || student?.skills || []).map(i => i.toLowerCase())
    const studentTargets = (pref?.targetExams || []).map(t => t.toLowerCase())

    const examNameLower = exam.examName.toLowerCase()
    const examCategoryLower = exam.category.toLowerCase()
    const examEligibilityLower = (exam.eligibility || '').toLowerCase()
    const examStreams = (exam.stream || []).map(s => s.toLowerCase())

    // 1. Direct Target Exam Match - highest priority
    const hasTargetMatch = studentTargets.some(t => examNameLower.includes(t) || t.includes(examNameLower))
    if (hasTargetMatch) return true

    // 2. Stream Match
    const hasStreamMatch = examStreams.includes('any') ||
      examStreams.some(s => studentStream.includes(s) || s.includes(studentStream))

    // 3. Category / Interest Match
    const hasCategoryMatch = studentInterests.some(interest =>
      examCategoryLower.includes(interest) || interest.includes(examCategoryLower)
    )

    // 4. Class / Eligibility Match
    let hasEligibilityMatch = false
    if (examEligibilityLower.includes('any') || examEligibilityLower.includes('graduate')) {
      hasEligibilityMatch = true
    } else if (examEligibilityLower.includes('12th') && (studentClass.includes('12th') || studentClass.includes('ug'))) {
      hasEligibilityMatch = true
    } else if (examEligibilityLower.includes('10th')) {
      hasEligibilityMatch = true
    } else if (examEligibilityLower.includes('b.e') || examEligibilityLower.includes('b.tech') || examEligibilityLower.includes('engineering')) {
      hasEligibilityMatch = studentStream.includes('eng') || studentStream.includes('tech') || studentStream.includes('science')
    } else {
      hasEligibilityMatch = true
    }

    // Must satisfy either target exam OR (stream/category match AND eligibility match)
    return hasTargetMatch || ((hasStreamMatch || hasCategoryMatch) && hasEligibilityMatch)
  }

  /**
   * Find all eligible students for a given exam
   */
  async findEligibleStudents(exam) {
    try {
      // 1. Fetch all students from DB
      const students = await Student.find().lean()
      if (!students || students.length === 0) return []

      // 2. Fetch preferences in bulk
      const preferences = await StudentPreference.find().lean()
      const prefMap = new Map()
      preferences.forEach(p => {
        if (p.userId) prefMap.set(p.userId.toString(), p)
        if (p.studentEmail) prefMap.set(p.studentEmail.toLowerCase(), p)
      })

      // 3. Filter eligible students
      const eligible = []
      for (const student of students) {
        const pref = prefMap.get(student._id.toString()) || prefMap.get((student.email || '').toLowerCase())
        if (this.isStudentEligible(student, pref, exam)) {
          eligible.push({ student, preference: pref })
        }
      }

      return eligible
    } catch (err) {
      logger.error(`findEligibleStudents Error: ${err.message}`)
      return []
    }
  }

  /**
   * Process and distribute a notification for an exam to all eligible students
   */
  async processNewExam(exam, notificationType = 'applicationStart', options = {}) {
    logger.info(`📢 NotificationEngine: Processing exam "${exam.examName}" [Type: ${notificationType}]`)
    const stats = {
      examName: exam.examName,
      type: notificationType,
      eligibleCount: 0,
      inAppCreated: 0,
      emailsSent: 0,
      emailsSkipped: 0,
      emailsFailed: 0,
      errors: []
    }

    try {
      const eligible = await this.findEligibleStudents(exam)
      stats.eligibleCount = eligible.length

      const transporter = this.getTransporter()
      const fromUser = process.env.MAIL_USER || process.env.ADMIN_EMAIL || 'notifications@campuspilot.ai'

      for (const item of eligible) {
        const { student, preference } = item
        const studentEmail = student.email
        const studentId = student._id.toString()

        // 1. Generate Notification Title & Message
        const title = options.title || exam.notificationTitle || `📢 ${exam.examName} Notification: ${notificationType}`
        const message = options.message || exam.notificationDescription || `${exam.conductingBody} has published an update for ${exam.examName}. Application deadline: ${exam.applicationEnd}`

        // 2. Create In-App Notification
        try {
          await Notification.create({
            userId: studentId,
            examId: exam._id,
            type: notificationType,
            title,
            message,
            priority: options.priority || (notificationType === 'applicationEnd' ? 'high' : 'medium'),
            category: exam.category,
            applyLink: exam.applyLink,
            officialWebsite: exam.officialWebsite,
            data: {
              examName: exam.examName,
              conductingBody: exam.conductingBody,
              examDate: exam.examDate,
              applicationEnd: exam.applicationEnd
            }
          })
          stats.inAppCreated++
        } catch (inAppErr) {
          stats.errors.push(`InApp fail for ${studentEmail}: ${inAppErr.message}`)
        }

        // 3. Send Email Notification if student preferences allow
        const emailAllowed = preference?.notificationPreferences?.email !== false
        const typeAllowed = preference?.notificationPreferences?.types?.[notificationType] !== false

        if (emailAllowed && typeAllowed && studentEmail && !options.skipEmail) {
          if (transporter) {
            try {
              const htmlContent = buildExamEmailHTML(student, exam, notificationType)
              await transporter.sendMail({
                from: `"CampusPilot Exam Radar" <${fromUser}>`,
                to: studentEmail,
                subject: `${title}`,
                html: htmlContent
              })
              stats.emailsSent++
            } catch (mailErr) {
              stats.emailsFailed++
              stats.errors.push(`Email fail to ${studentEmail}: ${mailErr.message}`)
            }
          } else {
            stats.emailsSkipped++
          }
        } else {
          stats.emailsSkipped++
        }
      }

      logger.info(`✅ NotificationEngine finished for "${exam.examName}": InApp: ${stats.inAppCreated}, Emails: ${stats.emailsSent}, Skipped: ${stats.emailsSkipped}`)
      return stats
    } catch (err) {
      logger.error(`NotificationEngine processNewExam Fatal: ${err.message}`)
      stats.errors.push(err.message)
      return stats
    }
  }

  /**
   * Check for exams with upcoming application deadlines (<= 7 days or <= 2 days)
   */
  async checkApplicationDeadlines() {
    try {
      const now = new Date()
      const activeExams = await Exam.find({ status: 'active' })
      const results = []

      for (const exam of activeExams) {
        if (!exam.applicationEnd) continue
        const endDate = new Date(exam.applicationEnd)
        const diffDays = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24))

        if (diffDays >= 0 && diffDays <= 7) {
          const res = await this.processNewExam(exam, 'applicationEnd', {
            title: `⏳ ${exam.examName} Application Deadline: ${diffDays === 0 ? 'Today!' : `${diffDays} days left!`}`,
            message: `Hurry! The registration for ${exam.examName} closes on ${exam.applicationEnd}. Apply before the deadline.`,
            priority: 'high'
          })
          results.push(res)
        }
      }
      return results
    } catch (err) {
      logger.error(`checkApplicationDeadlines Error: ${err.message}`)
      return []
    }
  }

  /**
   * Check for upcoming exam dates (<= 30 days or <= 7 days)
   */
  async checkUpcomingExamDates() {
    try {
      const now = new Date()
      const activeExams = await Exam.find({ status: { $in: ['active', 'upcoming'] } })
      const results = []

      for (const exam of activeExams) {
        if (!exam.examDate) continue
        const examDate = new Date(exam.examDate)
        const diffDays = Math.ceil((examDate - now) / (1000 * 60 * 60 * 24))

        if (diffDays === 30 || diffDays === 7 || diffDays === 1) {
          const res = await this.processNewExam(exam, 'examDate', {
            title: `📅 ${exam.examName} in ${diffDays} days!`,
            message: `Prepare your revision plan! ${exam.examName} is scheduled for ${exam.examDate}. Download syllabus and practice PYQs.`,
            priority: 'medium'
          })
          results.push(res)
        }
      }
      return results
    } catch (err) {
      logger.error(`checkUpcomingExamDates Error: ${err.message}`)
      return []
    }
  }
}

export const notificationEngine = new NotificationEngine()
export default notificationEngine
