import express from 'express'
import { conductVoiceInterview, analyzeVoiceResponse } from '../controllers/geminiController.js'
import Student from '../models/Student.js'
import mongoose from 'mongoose'

const router = express.Router()

// POST /api/voice-interview/start
router.post('/start', async (req, res) => {
  try {
    const { role, difficulty } = req.body
    
    if (!role) {
      return res.status(400).json({ error: 'Role is required' })
    }

    const result = await conductVoiceInterview(role, difficulty || 'medium')
    res.json(result)
  } catch (error) {
    console.error('Voice interview start route error:', error)
    res.status(500).json({ error: error.message })
  }
})

// POST /api/voice-interview/submit
router.post('/submit', async (req, res) => {
  try {
    const { transcript, role, questionId } = req.body
    
    if (!transcript) {
      return res.status(400).json({ error: 'Transcript is required' })
    }

    // Analyze voice transcript
    const result = await analyzeVoiceResponse(transcript, role || 'Software Engineer', questionId || 1)
    
    // Save interview to student profile if applicable
    const userId = req.user?.id || req.body.userId
    if (userId && mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(userId)) {
      try {
        const student = await Student.findById(userId)
        if (student) {
          student.voiceInterviews.push({
            date: new Date(),
            role: role || 'Software Engineer',
            score: result.score,
            feedback: result.feedback,
            transcript: transcript
          })
          student.voiceInterview = (student.voiceInterview || 0) + 1
          await student.save()
        }
      } catch (dbErr) {
        console.warn('DB save voice interview error:', dbErr.message)
      }
    }
    
    res.json(result)
  } catch (error) {
    console.error('Voice interview submit route error:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
