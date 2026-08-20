import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import app from '../server.js'

// Mock logger to prevent test output clutter
vi.mock('../utils/logger.js', () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn()
  }
}))

// Mock BullMQ queue so tests don't need a live Redis connection
vi.mock('../queues/aiQueue.js', () => ({
  aiQueue: { add: vi.fn() },
  aiQueueEvents: {}
}))

describe('Auth API Routes', () => {
  describe('POST /api/auth/login', () => {
    it('should return 400 Bad Request when email is missing', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ password: 'somepassword' })

      if (response.status === 500) console.log('DEBUG:', response.body)

      expect(response.status).toBe(400)
      expect(response.body.status).toBe('fail')
      expect(response.body.message).toContain('expected string, received undefined')
    })

    it('should return 400 Bad Request when password is missing', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'admin@campuspilot.ai' })

      expect(response.status).toBe(400)
      expect(response.body.status).toBe('fail')
      expect(response.body.message).toContain('expected string, received undefined')
    })

    it('should return 401 Unauthorized for incorrect admin credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ 
          email: 'tarunibabu2006@gmail.com', // Admin email
          password: 'wrong_password' 
        })

      expect(response.status).toBe(401)
      expect(response.body.message).toBe('Invalid admin password')
    })
  })
})
