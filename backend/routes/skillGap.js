import express from 'express'
import { analyzeSkillGap } from '../controllers/geminiController.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { currentSkills, targetRole, language = 'en' } = req.body

    if (!currentSkills || !targetRole) {
      return res.status(400).json({
        error: 'Please provide currentSkills and targetRole'
      })
    }

    const result = await analyzeSkillGap(currentSkills, targetRole, language)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
