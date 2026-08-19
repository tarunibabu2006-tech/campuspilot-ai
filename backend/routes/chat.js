import express from 'express'
import { chatWithAI } from '../controllers/geminiController.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { message, language = 'en' } = req.body

    if (!message) {
      return res.status(400).json({
        error: 'Please provide a message'
      })
    }

    const result = await chatWithAI(message, language)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
