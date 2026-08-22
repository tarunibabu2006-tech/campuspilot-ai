import express from 'express'
import Alumni from '../models/Alumni.js'
import mongoose from 'mongoose'

const router = express.Router()

// GET /api/alumni
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }
    const alumni = await Alumni.find().sort({ batch: -1 })
    res.json(alumni)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
