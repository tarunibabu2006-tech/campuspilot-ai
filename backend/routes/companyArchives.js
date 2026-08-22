import express from 'express'
import CompanyArchive from '../models/CompanyArchive.js'
import mongoose from 'mongoose'

const router = express.Router()

// GET /api/company-archives
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' })
    }
    const archives = await CompanyArchive.find().sort({ createdAt: -1 })
    res.json(archives)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
