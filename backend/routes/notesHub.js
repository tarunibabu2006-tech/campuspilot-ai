import express from 'express'
import Note from '../models/Note.js'
import { protect } from '../middleware/auth.js'
import { processNotes, generateFlashcards, generateNoteContent, ragChatWithNotes } from '../controllers/geminiController.js'
import { addDocumentToVectorStore } from '../utils/VectorStore.js'
import logger from '../utils/logger.js'

const router = express.Router()

// ═══════════════════════════════════════════
// Catalog browsing: category tree with real counts
// ═══════════════════════════════════════════
router.get('/categories', async (req, res) => {
  try {
    const tree = await Note.aggregate([
      { $group: { _id: { category: '$category', subject: '$subject' }, count: { $sum: 1 } } },
      { $sort: { '_id.category': 1, '_id.subject': 1 } }
    ])
    res.json(tree.map(t => ({ category: t._id.category, subject: t._id.subject, count: t.count })))
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ═══════════════════════════════════════════
// Honest catalog stats — real counts, never a fabricated number
// ═══════════════════════════════════════════
router.get('/stats', async (req, res) => {
  try {
    const [totalTopics, totalGenerated] = await Promise.all([
      Note.countDocuments({}),
      Note.countDocuments({ generated: true })
    ])
    res.json({ totalTopics, totalGenerated })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get notes (paginated) with categories/search filters — lightweight projection,
// content/flashcards are only loaded when a single note is opened.
router.get('/', async (req, res) => {
  try {
    const { category, subject, search, page = 1, limit = 30 } = req.query
    const filter = {}
    if (category && category !== 'All') filter.category = category
    if (subject && subject !== 'All') filter.subject = subject
    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { subject: new RegExp(search, 'i') }
      ]
    }

    const pageSize = Math.min(100, Math.max(1, parseInt(limit, 10) || 30))
    const pageNum = Math.max(1, parseInt(page, 10) || 1)

    const [notes, total] = await Promise.all([
      Note.find(filter)
        .select('title category subject level unit readTime generated')
        .sort({ title: 1 })
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize)
        .lean(),
      Note.countDocuments(filter)
    ])

    res.json({ notes, total, page: pageNum, pageSize })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get a single note. If it hasn't been generated yet, generate it for real via
// Gemini right now and cache the result — nothing is ever pre-filled with filler.
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    if (!note) return res.status(404).json({ error: 'Topic not found' })

    if (!note.generated) {
      const generated = await generateNoteContent(
        note.title, note.category, note.subject, note.level, note.unit, req.query.language || 'en'
      )
      note.content = generated.content
      note.readTime = generated.readTime
      note.flashcards = generated.flashcards
      note.generated = true
      note.generatedAt = new Date()
      await note.save()
    }

    res.json(note)
  } catch (error) {
    logger.error(`Note fetch/generate error: ${error.message}`)
    res.status(503).json({ error: 'Could not generate this note right now. Please try again in a moment.' })
  }
})

// Process summary (with Gemini or fallback) — for notes a student pastes in themselves
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

// Generate Flashcards for arbitrary pasted content (with Gemini or fallback)
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
