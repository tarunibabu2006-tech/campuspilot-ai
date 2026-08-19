import express from 'express'
import { calculateBunks } from '../controllers/geminiController.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { totalClasses, attended, language = 'en' } = req.body

    if (!totalClasses || !attended) {
      return res.status(400).json({
        error: 'Please provide totalClasses and attended'
      })
    }

    const result = await calculateBunks(parseInt(totalClasses), parseInt(attended), language)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
