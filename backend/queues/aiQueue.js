import { Queue, Worker, QueueEvents } from 'bullmq'
import dotenv from 'dotenv'
import logger from '../utils/logger.js'

// Need to import the raw models/logic for the worker to process
import { GoogleGenerativeAI } from '@google/generative-ai'
import { parseGeminiResponse } from '../controllers/geminiController.js'

dotenv.config()

const redisConnection = process.env.NODE_ENV === 'test'
  ? { host: 'localhost', port: 6379 }
  : { url: process.env.REDIS_URL || 'redis://localhost:6379' }

// 1. Create the Queue
export const aiQueue = new Queue('ai-processing', { connection: redisConnection })

// 2. Create the Queue Events (for listening to job completion)
export const aiQueueEvents = new QueueEvents('ai-processing', { connection: redisConnection })

// Gemini Setup for Worker
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const proModel = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

// 3. Create the Worker (Runs independently, pulling jobs from Redis)
const worker = new Worker('ai-processing', async (job) => {
  logger.info(`🔄 Processing Job ${job.id} [${job.name}]...`)

  if (job.name === 'score-resume') {
    const { resumeText, targetRole } = job.data
    const prompt = `You are an expert ATS resume reviewer and HR manager.
Resume Content:
${resumeText}

Target Role: ${targetRole || 'General Engineering/Fresher'}

Analyze the resume and return a JSON object:
{
  "score": <number 0-100>,
  "grade": "<A+/A/B+/B/C/D>",
  "suggestions": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>"],
  "optimizedResume": "<optimized summary of resume with high-impact action verbs and keywords>"
}`
    const result = await proModel.generateContent(prompt)
    return parseGeminiResponse(result.response.text())
  }
  
  throw new Error('Unknown job type')
}, { 
  connection: redisConnection,
  concurrency: 5 // Process max 5 AI requests simultaneously (rate limit protection)
})

worker.on('completed', (job) => {
  logger.info(`✅ Job ${job.id} [${job.name}] completed successfully!`)
})

worker.on('failed', (job, err) => {
  logger.error(`❌ Job ${job.id} [${job.name}] failed: ${err.message}`)
})
