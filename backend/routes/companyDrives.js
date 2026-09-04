import express from 'express'
import CompanyDrive from '../models/CompanyDrive.js'
import Student from '../models/Student.js'
import { protect } from '../middleware/auth.js'
import mongoose from 'mongoose'

const router = express.Router()

// ── 1. GET ALL COMPANY DRIVES & WALK-INS (WITH FILTERS) ────────────────
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const { batch, driveType, location, search, status = 'active', page = 1, limit = 50 } = req.query
    const query = {}

    if (status && status !== 'All') {
      query.status = status
    }
    if (batch && batch !== 'All') {
      const batchYear = batch.replace(/\D/g, '')
      if (batchYear) {
        query.batchEligible = { $in: [batchYear, 'Any Batch'] }
      }
    }
    if (driveType && driveType !== 'All') {
      query.driveType = driveType
    }
    if (location && location !== 'All') {
      query.location = { $regex: location, $options: 'i' }
    }
    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { driveTitle: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ]
    }

    const [drives, total] = await Promise.all([
      CompanyDrive.find(query)
        .sort({ registrationEnd: 1, createdAt: -1 })
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit))
        .lean(),
      CompanyDrive.countDocuments(query)
    ])

    res.json({
      drives,
      total,
      page: parseInt(page),
      limit: parseInt(limit)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── 2. GET UPCOMING WALK-IN INTERVIEWS ─────────────────────────────
router.get('/upcoming', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const drives = await CompanyDrive.find({
      driveType: 'Walk-in Interview',
      status: { $in: ['active', 'upcoming'] }
    })
      .sort({ walkinDate: 1, registrationEnd: 1 })
      .limit(20)
      .lean()

    res.json(drives)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── 3. GET DRIVES MATCHED TO LOGGED-IN STUDENT BATCH ────────────────
router.get('/my-eligible', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const userId = req.user?.id || req.user?._id
    const student = await Student.findById(userId).lean()
    const studentYear = student?.year || '2026'

    const drives = await CompanyDrive.find({
      status: { $in: ['active', 'upcoming'] },
      $or: [
        { batchEligible: { $in: [studentYear, 'Any Batch'] } },
        { batchEligible: { $regex: studentYear, $options: 'i' } }
      ]
    })
      .sort({ registrationEnd: 1 })
      .limit(30)
      .lean()

    res.json({
      drives,
      studentBatch: studentYear
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── 4. GET SINGLE DRIVE DETAILS ──────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const drive = await CompanyDrive.findById(req.params.id)
    if (!drive) {
      return res.status(404).json({ error: 'Company drive not found' })
    }

    res.json(drive)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ── 5. REGISTER / INCREMENT REGISTRATION COUNT ────────────────────────
router.post('/:id/register', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }

    const drive = await CompanyDrive.findByIdAndUpdate(
      req.params.id,
      { $inc: { registeredCount: 1 } },
      { new: true }
    )

    if (!drive) {
      return res.status(404).json({ error: 'Company drive not found' })
    }

    res.json({ message: 'Registration recorded', registeredCount: drive.registeredCount })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
