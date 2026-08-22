import express from 'express'
import { protect } from '../middleware/auth.js'
import Skill from '../models/Skill.js'
import { allRoles } from '../data/allSkills.js' // Keep roles as they might not have a model yet

const router = express.Router()

// Get all skills from MongoDB
router.get('/', async (req, res) => {
  try {
    const { category, domain, search } = req.query
    let query = {}

    if (category && category !== 'all') {
      query.category = { $regex: category, $options: 'i' }
    }
    if (domain && domain !== 'all') {
      query.domain = { $regex: domain, $options: 'i' }
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { domain: { $regex: search, $options: 'i' } }
      ]
    }

    const skillsList = await Skill.find(query).sort({ createdAt: -1 })
    
    // Get unique categories and domains from all skills for UI filters
    const allSkills = await Skill.find({}, { category: 1, domain: 1 })
    const categories = [...new Set(allSkills.map(s => s.category))]
    const domains = [...new Set(allSkills.map(s => s.domain))]

    res.json({ skills: skillsList, categories, domains, count: skillsList.length })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get stats
router.get('/stats', async (req, res) => {
  try {
    const count = await Skill.countDocuments()
    res.json({ count })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get skill by ID
router.get('/:id', (req, res) => {
  const skillEntries = Object.entries(allSkills)
  const index = parseInt(req.params.id) - 1

  if (index < 0 || index >= skillEntries.length) {
    return res.status(404).json({ message: 'Skill not found' })
  }

  const [name, data] = skillEntries[index]
  res.json({
    _id: req.params.id,
    name,
    ...data
  })
})

// Get all roles
router.get('/roles/all', (req, res) => {
  const { domain } = req.query
  let rolesList = Object.entries(allRoles).map(([name, data]) => ({
    name,
    ...data
  }))

  if (domain && domain !== 'all') {
    rolesList = rolesList.filter(r => r.domain === domain)
  }

  res.json({ roles: rolesList })
})

// Get role details
router.get('/roles/:roleName', (req, res) => {
  const roleName = decodeURIComponent(req.params.roleName)
  const role = allRoles[roleName]
  if (!role) {
    return res.status(404).json({ message: 'Role not found' })
  }
  res.json({ name: roleName, ...role })
})

// Update skill progress
router.post('/progress', protect, (req, res) => {
  const { skillId, progress } = req.body
  res.json({ message: 'Progress updated', skillId, progress })
})

export default router
