import express from 'express'
import { checkJob } from '../controllers/geminiController.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { jobDescription, language = 'en' } = req.body

    if (!jobDescription) {
      return res.status(400).json({
        error: 'Please provide job description'
      })
    }

    const result = await checkJob(jobDescription, language)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
