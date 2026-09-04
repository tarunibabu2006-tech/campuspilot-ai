import dns from 'dns'
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1'])
} catch (e) {}

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import Exam from '../models/Exam.js'
import { OFFICIAL_EXAM_FEEDS } from '../utils/examScraper.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '..', '.env') })
dotenv.config()

async function seedExams() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('❌ MONGODB_URI is not set!')
    process.exit(1)
  }

  try {
    console.log('📡 Connecting to MongoDB Atlas...')
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
    console.log('✅ Connected to MongoDB Atlas!')

    console.log(`🌱 Seeding ${OFFICIAL_EXAM_FEEDS.length} official exams...`)

    let addedCount = 0
    let updatedCount = 0

    for (const examData of OFFICIAL_EXAM_FEEDS) {
      const existing = await Exam.findOne({ examName: examData.examName })
      if (existing) {
        await Exam.updateOne({ _id: existing._id }, { $set: examData })
        updatedCount++
      } else {
        await Exam.create(examData)
        addedCount++
      }
    }

    const totalExams = await Exam.countDocuments()
    console.log('══════════════════════════════════════════════════════════')
    console.log(`✅ Exam Seeding Complete!`)
    console.log(`   Added: ${addedCount}`)
    console.log(`   Updated: ${updatedCount}`)
    console.log(`   Total Exams in DB: ${totalExams}`)
    console.log('══════════════════════════════════════════════════════════')

    const sample = await Exam.find().select('examName conductingBody category eligibility examDate').limit(5)
    console.log('📋 Sample Seeded Exams:')
    sample.forEach(s => {
      console.log(`   • [${s.conductingBody}] ${s.examName} (${s.category}) — Date: ${s.examDate}`)
    })

    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

seedExams()
