import express from 'express'
import { sampleNotes } from '../data/sampleNotes.js'
import { protect } from '../middleware/auth.js'
import { processNotes, generateFlashcards, ragChatWithNotes } from '../controllers/geminiController.js'
import { addDocumentToVectorStore } from '../utils/VectorStore.js'
import logger from '../utils/logger.js'

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

// ═══════════════════════════════════════════
// RAG API: Generate Embeddings & Store
// ═══════════════════════════════════════════
router.post('/embed', protect, async (req, res) => {
  try {
    const { documentId, content } = req.body
    if (!documentId || !content) return res.status(400).json({ error: 'Missing documentId or content' })

    // Split content into small chunks (simple heuristic)
    const chunks = content.split('\n\n').filter(c => c.length > 50)
    
    // Store in Vector DB
    const namespace = await addDocumentToVectorStore(req.user.id, documentId, chunks)
    
    res.json({ message: 'Document embedded successfully', namespace, chunksProcessed: chunks.length })
  } catch (error) {
    logger.error(`Embed Error: ${error.message}`)
    res.status(500).json({ error: 'Failed to embed document' })
  }
})

// ═══════════════════════════════════════════
// RAG API: Chat with Document
// ═══════════════════════════════════════════
router.post('/chat', protect, async (req, res) => {
  try {
    const { documentId, question, language = 'English' } = req.body
    if (!documentId || !question) return res.status(400).json({ error: 'Missing documentId or question' })

    const namespace = `${req.user.id}_${documentId}`
    const answer = await ragChatWithNotes(namespace, question, language)
    
    res.json({ answer })
  } catch (error) {
    logger.error(`Chat Error: ${error.message}`)
    res.status(500).json({ error: 'Failed to process chat' })
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
