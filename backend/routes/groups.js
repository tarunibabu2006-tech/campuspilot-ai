import express from 'express'
import Group from '../models/Group.js'
import mongoose from 'mongoose'

const router = express.Router()

// In-memory study groups for fallback
let memoryGroups = [
  {
    _id: 'grp_1',
    id: 'grp_1',
    name: '🚀 Full Stack & DSA Masters',
    description: 'Daily LeetCode discussions, React architecture, and system design mock rounds.',
    createdBy: 'S.Santhiya',
    members: [
      { id: '1', name: 'S.Santhiya', email: 'santhiya@college.edu' },
      { id: '2', name: 'Taruni Babu', email: 'taruni@college.edu' },
      { id: '3', name: 'Jayyappan', email: 'jayyappan@college.edu' },
      { id: '4', name: 'Kavitha R', email: 'kavitha@college.edu' }
    ],
    notes: [
      {
        title: 'Binary Search Trees & DP Cheat Sheet',
        content: 'Key recursive formulas for 0/1 Knapsack: dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w-wt[i]])',
        createdBy: 'S.Santhiya',
        createdAt: new Date(Date.now() - 86400000)
      }
    ],
    messages: [
      {
        sender: 'other',
        senderName: 'S.Santhiya',
        message: 'Welcome everyone! Let us share our Amazon & TCS placement preparation notes here.',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        sender: 'me',
        senderName: 'You',
        message: 'Thanks! I have uploaded the Quick Revision formulas for DSA.',
        timestamp: new Date(Date.now() - 1800000)
      }
    ],
    createdAt: new Date()
  },
  {
    _id: 'grp_2',
    id: 'grp_2',
    name: '🤖 AI & Cloud Engineering Group',
    description: 'Machine Learning algorithms, AWS certifications, and Python backend projects.',
    createdBy: 'Taruni Babu',
    members: [
      { id: '1', name: 'Taruni Babu', email: 'taruni@college.edu' },
      { id: '2', name: 'Arun Kumar', email: 'arun@college.edu' }
    ],
    notes: [
      {
        title: 'Transformers & LLM Fundamentals',
        content: 'Attention is all you need: Attention(Q,K,V) = softmax(QK^T / sqrt(d_k)) * V',
        createdBy: 'Taruni Babu',
        createdAt: new Date()
      }
    ],
    messages: [
      {
        sender: 'other',
        senderName: 'Taruni Babu',
        message: 'Hey folks, check out the new Gemini AI integration notes in the repo!',
        timestamp: new Date(Date.now() - 600000)
      }
    ],
    createdAt: new Date()
  }
]

// GET /api/groups
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const dbGroups = await Group.find().sort({ createdAt: -1 })
      if (dbGroups && dbGroups.length > 0) {
        return res.json({ groups: dbGroups })
      }
    }
  } catch (err) {
    console.warn('DB get groups error, using memory fallback:', err.message)
  }

  res.json({ groups: memoryGroups })
})

// POST /api/groups
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body
    if (!name) {
      return res.status(400).json({ error: 'Group name is required' })
    }

    const createdBy = req.user?.name || 'Student'
    const newGroup = {
      _id: 'grp_' + Date.now(),
      id: 'grp_' + Date.now(),
      name,
      description: description || '',
      createdBy,
      members: [{ id: req.user?.id || 'me', name: createdBy, email: req.user?.email || 'student@college.edu' }],
      notes: [],
      messages: [{
        sender: 'other',
        senderName: 'System',
        message: `Group "${name}" created! Start collaborating.`,
        timestamp: new Date()
      }],
      createdAt: new Date()
    }

    if (mongoose.connection.readyState === 1) {
      try {
        const created = await Group.create(newGroup)
        return res.status(201).json(created)
      } catch (dbErr) {
        console.warn('DB create group error:', dbErr.message)
      }
    }

    memoryGroups.unshift(newGroup)
    res.status(201).json(newGroup)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/groups/:id/messages
router.post('/:id/messages', async (req, res) => {
  try {
    const { message } = req.body
    const groupId = req.params.id

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message content is required' })
    }

    const msgObj = {
      sender: 'me',
      senderName: req.user?.name || 'You',
      message: message.trim(),
      timestamp: new Date()
    }

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(groupId)) {
      try {
        const group = await Group.findById(groupId)
        if (group) {
          group.messages.push(msgObj)
          await group.save()
          return res.json({ success: true, message: msgObj })
        }
      } catch (dbErr) {
        console.warn('DB send message error:', dbErr.message)
      }
    }

    const memGroup = memoryGroups.find(g => g._id === groupId || g.id === groupId)
    if (memGroup) {
      memGroup.messages.push(msgObj)
      return res.json({ success: true, message: msgObj })
    }

    res.status(404).json({ error: 'Group not found' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
