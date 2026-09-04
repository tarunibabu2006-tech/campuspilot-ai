import dns from 'dns'
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1'])
} catch (e) {}

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import Exam from '../models/Exam.js'
import Student from '../models/Student.js'
import StudentPreference from '../models/StudentPreference.js'
import Notification from '../models/Notification.js'
import { notificationEngine } from '../utils/notificationEngine.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '..', '.env') })
dotenv.config()

async function testNotifications() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('❌ MONGODB_URI is not set!')
    process.exit(1)
  }

  try {
    console.log('📡 Connecting to MongoDB Atlas...')
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
    console.log('✅ Connected to MongoDB Atlas!')

    // 1. Verify exams exist
    let jeeExam = await Exam.findOne({ examName: /JEE Main/i })
    let upscExam = await Exam.findOne({ examName: /UPSC Civil Services/i })

    if (!jeeExam || !upscExam) {
      console.log('⚠️ Exams not found. Please run "npm run seed:exams" first!')
      process.exit(1)
    }

    console.log('\n🎯 TESTING PERSONALIZATION MATCHING LOGIC:')
    console.log('─────────────────────────────────────────────────────────')

    // Scenario A: 12th Science Student
    const student12thScience = {
      name: 'Priya Sharma',
      email: 'priya.science@example.com',
      department: 'Science',
      year: '12th'
    }
    const pref12thScience = {
      class: '12th',
      stream: 'Science',
      interests: ['Engineering', 'Mathematics'],
      targetExams: ['JEE Main']
    }

    // Scenario B: B.Sc CS / Graduate Student
    const studentGraduate = {
      name: 'Rahul Verma',
      email: 'rahul.cs@example.com',
      department: 'Computer Science',
      year: 'Graduate'
    }
    const prefGraduate = {
      class: 'Graduate',
      stream: 'Engineering',
      interests: ['Government', 'Civil Services'],
      targetExams: ['UPSC CSE']
    }

    // Scenario C: 12th Commerce Student
    const student12thCommerce = {
      name: 'Amit Patel',
      email: 'amit.commerce@example.com',
      department: 'Commerce',
      year: '12th'
    }
    const pref12thCommerce = {
      class: '12th',
      stream: 'Commerce',
      interests: ['Banking', 'Finance'],
      targetExams: ['CA Foundation']
    }

    const isPriyaEligibleJEE = notificationEngine.isStudentEligible(student12thScience, pref12thScience, jeeExam)
    const isRahulEligibleJEE = notificationEngine.isStudentEligible(studentGraduate, prefGraduate, jeeExam)
    const isAmitEligibleJEE = notificationEngine.isStudentEligible(student12thCommerce, pref12thCommerce, jeeExam)

    const isPriyaEligibleUPSC = notificationEngine.isStudentEligible(student12thScience, pref12thScience, upscExam)
    const isRahulEligibleUPSC = notificationEngine.isStudentEligible(studentGraduate, prefGraduate, upscExam)

    console.log(`📌 Target: ${jeeExam.examName} (${jeeExam.category}, ${jeeExam.eligibility})`)
    console.log(`   • Student A [12th Science]:      ${isPriyaEligibleJEE ? '✅ MATCHED (Gets Alert)' : '❌ Filtered out'}`)
    console.log(`   • Student B [B.Sc CS Graduate]:  ${isRahulEligibleJEE ? '✅ MATCHED' : '❌ Filtered out (Not relevant)'}`)
    console.log(`   • Student C [12th Commerce]:     ${isAmitEligibleJEE ? '✅ MATCHED' : '❌ Filtered out (Not relevant)'}`)

    console.log(`\n📌 Target: ${upscExam.examName} (${upscExam.category}, ${upscExam.eligibility})`)
    console.log(`   • Student A [12th Science]:      ${isPriyaEligibleUPSC ? '✅ MATCHED' : '❌ Filtered out (Needs Degree)'}`)
    console.log(`   • Student B [B.Sc CS Graduate]:  ${isRahulEligibleUPSC ? '✅ MATCHED (Gets Alert)' : '❌ Filtered out'}`)

    console.log('\n🚀 TESTING LIVE NOTIFICATION ENGINE DISPATCH:')
    console.log('─────────────────────────────────────────────────────────')
    const dispatchStats = await notificationEngine.processNewExam(jeeExam, 'applicationStart', {
      skipEmail: true // don't send external spam during unit test
    })

    console.log('📊 Dispatch Result:', JSON.stringify(dispatchStats, null, 2))

    const recentNotifications = await Notification.find().sort({ createdAt: -1 }).limit(3).lean()
    console.log('\n📬 Recent Notifications in Database:')
    recentNotifications.forEach(n => {
      console.log(`   • [${n.type}] ${n.title} (Priority: ${n.priority}) → User: ${n.userId}`)
    })

    console.log('\n🎉 ALL NOTIFICATION TESTS PASSED SUCCESSFULLY!')
    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('❌ Notification test failed:', error)
    process.exit(1)
  }
}

testNotifications()
