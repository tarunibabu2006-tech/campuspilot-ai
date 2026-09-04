import express from 'express'
import CompanyDrive from '../models/CompanyDrive.js'
import Notification from '../models/Notification.js'
import Student from '../models/Student.js'
import { adminMiddleware } from '../middleware/auth.js'
import mongoose from 'mongoose'

const router = express.Router()

router.use(adminMiddleware)

// ── 1. CREATE NEW DRIVE & NOTIFY BATCH STUDENTS ─────────────────────
router.post('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const {
      companyName,
      driveTitle,
      role,
      driveType = 'Off-Campus Drive',
      batchEligible,
      degreeEligible,
      cgpaCutoff,
      ctcPackage,
      location,
      venueDetails,
      walkinDate,
      walkinTime,
      registrationEnd,
      applyLink,
      officialNoticeUrl,
      roundsInfo,
      badgeText,
      description,
      status = 'active',
      notifyStudents = true
    } = req.body

    if (!companyName || !driveTitle || !role || !ctcPackage || !location || !registrationEnd || !applyLink) {
      return res.status(400).json({ error: 'Missing required drive fields' })
    }

    const newDrive = await CompanyDrive.create({
      companyName,
      driveTitle,
      role,
      driveType,
      batchEligible: Array.isArray(batchEligible) ? batchEligible : ['2026'],
      degreeEligible: Array.isArray(degreeEligible) ? degreeEligible : ['B.E', 'B.Tech'],
      cgpaCutoff: cgpaCutoff || 'No Minimum Criteria',
      ctcPackage,
      location,
      venueDetails: venueDetails || 'Online Assessment / Venue shared on registration',
      walkinDate: walkinDate || '',
      walkinTime: walkinTime || '09:00 AM IST',
      registrationEnd,
      applyLink,
      officialNoticeUrl: officialNoticeUrl || '',
      roundsInfo: Array.isArray(roundsInfo) ? roundsInfo : ['Online Test', 'Technical Interview', 'HR Round'],
      badgeText: badgeText || '🔥 Mass Hiring',
      description: description || '',
      status
    })

    let notifiedCount = 0
    if (notifyStudents) {
      // Create in-app notifications for matching students
      const students = await Student.find().lean()
      for (const student of students) {
        await Notification.create({
          userId: student._id.toString(),
          type: 'job',
          title: `🏢 ${companyName}: ${driveTitle}`,
          message: `${driveType} for ${role} (${ctcPackage}). Registration closes on ${registrationEnd}. ${walkinDate ? `Walk-in Date: ${walkinDate}` : ''}`,
          priority: 'high',
          category: 'Company Drive',
          applyLink,
          officialWebsite: applyLink,
          data: {
            companyName,
            role,
            ctcPackage,
            location,
            walkinDate
          }
        })
        notifiedCount++
      }
    }

    res.status(201).json({
      message: 'Company drive created successfully',
      drive: newDrive,
      notifiedStudents: notifiedCount
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── 2. UPDATE DRIVE ────────────────────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const updated = await CompanyDrive.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) {
      return res.status(404).json({ error: 'Company drive not found' })
    }

    res.json({ message: 'Drive updated successfully', drive: updated })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── 3. DELETE DRIVE ────────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const deleted = await CompanyDrive.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: 'Company drive not found' })
    }

    res.json({ message: 'Drive deleted successfully', id: req.params.id })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
