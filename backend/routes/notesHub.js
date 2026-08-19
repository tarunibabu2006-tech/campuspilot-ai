import express from 'express'
import { sampleNotes } from '../data/sampleNotes.js'
import { protect } from '../middleware/auth.js'
import { processNotes, generateFlashcards } from '../controllers/geminiController.js'

const router = express.Router()

// Get all notes with categories
router.get('/', (req, res) => {
  const { category, search } = req.query
  let notes = [...sampleNotes]

  if (category && category !== 'All') {
    notes = notes.filter(n => n.category.toLowerCase() === category.toLowerCase())
  }

  if (search) {
    const q = search.toLowerCase()
    notes = notes.filter(n => 
      n.title.toLowerCase().includes(q) || 
      n.content.toLowerCase().includes(q)
    )
  }

  res.json(notes)
})

// Process summary (with Gemini or fallback)
router.post('/process', async (req, res) => {
  try {
    const { title, notes, language = 'en' } = req.body
    if (!notes) {
      return res.status(400).json({ error: 'Please provide notes content' })
    }
    const result = await processNotes(notes, title, language)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Generate Flashcards (with Gemini or fallback)
router.post('/flashcards', async (req, res) => {
  try {
    const { content, language = 'en' } = req.body
    if (!content) {
      return res.status(400).json({ error: 'Please provide content' })
    }
    const result = await generateFlashcards(content, language)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
