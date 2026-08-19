import express from 'express'
import { generateExamPlan } from '../controllers/geminiController.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { subject, examDate, topics, language = 'en' } = req.body

    if (!subject || !examDate) {
      return res.status(400).json({
        error: 'Please provide subject and examDate'
      })
    }

    const result = await generateExamPlan(subject, examDate, topics, language)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
