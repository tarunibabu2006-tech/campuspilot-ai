import express from 'express'
import { getPlacementRoadmap } from '../controllers/geminiController.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { company, role, currentSkills, language = 'en' } = req.body

    if (!company) {
      return res.status(400).json({
        error: 'Please provide company name'
      })
    }

    const result = await getPlacementRoadmap(company, role, currentSkills, language)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
