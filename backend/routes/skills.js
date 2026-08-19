import express from 'express'
import { protect } from '../middleware/auth.js'
import { allSkills, allRoles } from '../data/allSkills.js'

const router = express.Router()

// Get all skills
router.get('/', (req, res) => {
  const { category, domain, search } = req.query
  let skillsList = Object.entries(allSkills).map(([name, data], index) => ({
    _id: String(index + 1),
    name,
    ...data
  }))

  if (category && category !== 'all') {
    skillsList = skillsList.filter(s => s.category === category)
  }
  if (domain && domain !== 'all') {
    skillsList = skillsList.filter(s => s.domain === domain)
  }
  if (search) {
    const q = search.toLowerCase()
    skillsList = skillsList.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.domain.toLowerCase().includes(q)
    )
  }

  const categories = [...new Set(Object.values(allSkills).map(s => s.category))]
  const domains = [...new Set(Object.values(allSkills).map(s => s.domain))]

  res.json({ skills: skillsList, categories, domains, count: skillsList.length })
})

// Get stats
router.get('/stats', (req, res) => {
  res.json({ count: Object.keys(allSkills).length })
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
