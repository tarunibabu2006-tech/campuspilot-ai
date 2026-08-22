import express from 'express'
import { protect } from '../middleware/auth.js'
import Job from '../models/Job.js'

const router = express.Router()

// Get all jobs with filters from MongoDB
router.get('/', async (req, res) => {
  try {
    const { company, location, experience, search, type } = req.query
    
    let query = {}
    
    if (company) query.company = { $regex: company, $options: 'i' }
    if (location) query.location = { $regex: location, $options: 'i' }
    if (experience) query.experience = { $regex: experience, $options: 'i' }
    if (type) query.type = type
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ]
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 })
    const featured = jobs.filter(j => j.featured)
    
    res.json({ jobs, featured, total: jobs.length })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get stats
router.get('/stats', async (req, res) => {
  try {
    const count = await Job.countDocuments()
    res.json({ count })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
    if (!job) return res.status(404).json({ message: 'Job not found' })
    res.json({ job })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Save job
router.post('/save', protect, (req, res) => {
  const { jobId } = req.body
  res.json({ message: 'Job saved successfully', jobId })
})

// Apply for job
router.post('/apply', protect, (req, res) => {
  const { jobId } = req.body
  res.json({ message: 'Application submitted successfully', jobId, appliedAt: new Date().toISOString() })
})

// Admin: Create Job
router.post('/', protect, async (req, res) => {
  try {
    const job = new Job({ ...req.body, postedBy: req.user.id })
    await job.save()
    res.status(201).json({ job })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Admin: Bulk Insert Jobs (from CSV)
router.post('/bulk', protect, async (req, res) => {
  try {
    const jobs = req.body.jobs
    if (!jobs || !Array.isArray(jobs)) {
      return res.status(400).json({ message: 'Invalid payload' })
    }
    const result = await Job.insertMany(jobs)
    res.status(201).json({ message: `${result.length} jobs inserted successfully`, result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
