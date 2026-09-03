import express from 'express'
import Application from '../models/Application.js'
import { verifyConfirmationEmail } from '../utils/emailVerification.js'

const router = express.Router()

// ── 1. VERIFY SINGLE APPLICATION ────────────────────────────────────
router.post('/verify/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await verifyConfirmationEmail(id)
    res.json({
      success: true,
      ...result
    })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// ── 2. SCAN ALL PENDING APPLICATIONS FOR A STUDENT ──────────────────
router.post('/scan-all', async (req, res) => {
  try {
    const { studentEmail } = req.body
    const query = {
      status: 'awaiting_confirmation'
    }
    if (studentEmail) query.studentEmail = studentEmail

    const pendingApps = await Application.find(query).limit(20)
    const verificationResults = []

    for (const app of pendingApps) {
      const resVal = await verifyConfirmationEmail(app)
      verificationResults.push({
        id: app._id,
        applicationId: app.applicationId,
        company: app.company,
        role: app.jobTitle,
        ...resVal
      })
    }

    const verifiedCount = verificationResults.filter(r => r.confirmed).length

    res.json({
      success: true,
      scannedCount: pendingApps.length,
      verifiedCount,
      results: verificationResults,
      message: `Scanned ${pendingApps.length} pending applications. ${verifiedCount} confirmed!`
    })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// ── 3. GET APPLICATION CONFIRMATION STATUS ──────────────────────────
router.get('/status/:id', async (req, res) => {
  try {
    const app = await Application.findById(req.params.id)
    if (!app) return res.status(404).json({ success: false, message: 'Application not found' })

    res.json({
      success: true,
      status: app.status,
      emailVerified: app.emailVerified,
      confirmedAt: app.confirmedAt,
      confirmationSender: app.confirmationSender,
      confirmationSubject: app.confirmationSubject,
      confirmationSnippet: app.confirmationSnippet,
      verificationLogs: app.verificationLogs
    })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

export default router
