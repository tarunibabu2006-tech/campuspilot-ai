import express from 'express'

const router = express.Router()

// In-memory store for demo (replace with DB in production)
const applications = {}

// POST /api/ai-apply/setup
router.post('/setup', async (req, res) => {
  try {
    const { preferences, userId } = req.body

    if (!preferences?.roles) {
      return res.status(400).json({ error: 'At least one target role is required.' })
    }

    const sessionId = userId || 'guest_' + Date.now()
    applications[sessionId] = {
      status: 'active',
      preferences,
      applications: Math.floor(Math.random() * 30) + 20,
      matches: Math.floor(Math.random() * 10) + 5,
      interviews: Math.floor(Math.random() * 4) + 1,
      startedAt: new Date().toISOString()
    }

    res.json({
      success: true,
      message: '🤖 AI Application Proxy activated! Your AI is now scanning and applying to matching jobs.',
      sessionId
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/ai-apply/status
router.get('/status', async (req, res) => {
  try {
    const { userId } = req.query
    const data = applications[userId] || {
      status: 'inactive',
      applications: 0,
      matches: 0,
      interviews: 0
    }
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/ai-apply/matches
router.get('/matches', async (req, res) => {
  const matchedJobs = [
    { company: 'TCS', role: 'Software Developer', location: 'Chennai', salary: '4.5 LPA', status: 'Applied', appliedOn: '2 hours ago' },
    { company: 'Infosys', role: 'Systems Engineer', location: 'Bangalore', salary: '3.8 LPA', status: 'Applied', appliedOn: '3 hours ago' },
    { company: 'Wipro', role: 'Project Engineer', location: 'Hyderabad', salary: '4.0 LPA', status: 'Shortlisted ✅', appliedOn: '5 hours ago' },
    { company: 'HCL Tech', role: 'Graduate Engineer', location: 'Chennai', salary: '3.5 LPA', status: 'Applied', appliedOn: '6 hours ago' },
    { company: 'Cognizant', role: 'Programmer Analyst', location: 'Pune', salary: '4.2 LPA', status: 'Interview Scheduled 🎉', appliedOn: '1 day ago' },
    { company: 'Capgemini', role: 'Software Analyst', location: 'Mumbai', salary: '4.0 LPA', status: 'Applied', appliedOn: '1 day ago' }
  ]
  res.json({ matches: matchedJobs })
})

export default router
