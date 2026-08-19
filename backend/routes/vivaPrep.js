import express from 'express'
import { conductViva } from '../controllers/geminiController.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { subject, difficulty = 'medium', question, history, language = 'en' } = req.body

    if (!subject) {
      return res.status(400).json({
        error: 'Please provide subject'
      })
    }

    const result = await conductViva(subject, difficulty, question, history, language)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
