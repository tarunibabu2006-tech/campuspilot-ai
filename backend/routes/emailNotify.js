// routes/emailNotify.js
import express from 'express'
import { sendApplicationConfirmationEmail, sendInterviewAlertEmail } from '../utils/emailService.js'
import logger from '../utils/logger.js'

const router = express.Router()

/**
 * POST /api/email/apply-confirm
 * Body: { toEmail, name, jobTitle, company, appId, timestamp, location, salary }
 * Sends a real company-branded confirmation email to the student's Gmail
 */
router.post('/apply-confirm', async (req, res) => {
  try {
    const { toEmail, name, jobTitle, company, appId, timestamp, location, salary } = req.body

    if (!toEmail || !jobTitle || !company || !appId) {
      return res.status(400).json({ error: 'toEmail, jobTitle, company, and appId are required.' })
    }

    const result = await sendApplicationConfirmationEmail(toEmail, {
      name: name || 'Student',
      jobTitle,
      company,
      appId,
      timestamp: timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      location: location || 'India (Multiple Locations)',
      salary: salary || 'Competitive CTC'
    })

    if (result.success) {
      logger.info(`[emailNotify] Apply confirm sent → ${toEmail}, Ref: ${appId}`)
      return res.json({
        success: true,
        message: `✅ Application confirmation email delivered to ${toEmail} on behalf of ${company}.`,
        messageId: result.messageId
      })
    } else {
      return res.status(500).json({
        success: false,
        message: result.reason === 'no_transporter'
          ? 'Email service not configured. Please set MAIL_USER and MAIL_PASS in backend .env'
          : `Email delivery failed: ${result.error}`
      })
    }
  } catch (err) {
    logger.error(`[emailNotify] apply-confirm error: ${err.message}`)
    return res.status(500).json({ error: err.message })
  }
})

/**
 * POST /api/email/interview-alert
 * Body: { toEmail, name, jobTitle, company, interviewDate, interviewTime, mode, appId }
 * Sends an interview scheduled notification email
 */
router.post('/interview-alert', async (req, res) => {
  try {
    const { toEmail, name, jobTitle, company, interviewDate, interviewTime, mode, appId } = req.body

    if (!toEmail || !jobTitle || !company) {
      return res.status(400).json({ error: 'toEmail, jobTitle, and company are required.' })
    }

    const result = await sendInterviewAlertEmail(toEmail, {
      name: name || 'Student',
      jobTitle,
      company,
      interviewDate: interviewDate || 'To be Announced',
      interviewTime,
      mode: mode || 'Online Video Interview',
      appId: appId || 'CP-APP-2026-XXXXX'
    })

    if (result.success) {
      return res.json({ success: true, message: 'Interview alert email sent!', messageId: result.messageId })
    } else {
      return res.status(500).json({ success: false, message: result.error || result.reason })
    }
  } catch (err) {
    logger.error(`[emailNotify] interview-alert error: ${err.message}`)
    return res.status(500).json({ error: err.message })
  }
})

export default router
