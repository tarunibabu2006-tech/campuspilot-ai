import mongoose from 'mongoose'
import dotenv from 'dotenv'
import CompanyArchive from '../models/CompanyArchive.js'
import Alumni from '../models/Alumni.js'
import Student from '../models/Student.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/campuspilot'

const seedData = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected.')

    console.log('🧹 Clearing old data...')
    await CompanyArchive.deleteMany({})
    await Alumni.deleteMany({})
    await Student.deleteMany({})

    console.log('🌱 Seeding Company Archives...')
    const companies = [
      { name: 'TCS Digital', ctc: '7.0 LPA', role: 'System Engineer', tags: ['Java', 'SQL', 'Aptitude'], experiencesCount: 24, pastPapersCount: 5 },
      { name: 'Zoho', ctc: '8.5 LPA', role: 'Member Technical Staff', tags: ['C/C++', 'DS & Algo', 'Advanced Programming'], experiencesCount: 15, pastPapersCount: 8 },
      { name: 'Amazon', ctc: '44.0 LPA', role: 'SDE-1', tags: ['System Design', 'Graphs', 'Dynamic Programming'], experiencesCount: 42, pastPapersCount: 12 },
      { name: 'Cognizant GenC Next', ctc: '6.75 LPA', role: 'Developer', tags: ['Python', 'DBMS', 'Logical'], experiencesCount: 18, pastPapersCount: 3 }
    ]
    await CompanyArchive.insertMany(companies)

    console.log('🌱 Seeding Alumni Network...')
    const alumni = [
      { name: 'Rahul Sharma', company: 'Amazon', role: 'SDE-1', batch: '2023', img: 'R', linkedinUrl: 'https://linkedin.com/in/rahul' },
      { name: 'Priya Patel', company: 'Microsoft', role: 'Software Engineer', batch: '2022', img: 'P', linkedinUrl: 'https://linkedin.com/in/priya' },
      { name: 'Karthik N', company: 'Zoho', role: 'MTS', batch: '2024', img: 'K', linkedinUrl: 'https://linkedin.com/in/karthik' },
      { name: 'Sneha Reddy', company: 'TCS Digital', role: 'System Engineer', batch: '2024', img: 'S', linkedinUrl: 'https://linkedin.com/in/sneha' }
    ]
    await Alumni.insertMany(alumni)

    console.log('🌱 Seeding Students (Leaderboard)...')
    const students = [
      { name: 'S.Santhiya', email: 'santhiya@campuspilot.ai', department: 'CSE', xpPoints: 9850, badges: ['react', 'node', 'python', 'aws', 'docker', 'sql', 'js', 'html', 'css', 'git', 'algo', 'sysdesign'] },
      { name: 'Rahul M', email: 'rahul@campuspilot.ai', department: 'IT', xpPoints: 9200, badges: ['react', 'node', 'python', 'aws', 'docker', 'sql', 'js', 'html', 'css', 'git'] },
      { name: 'Anita K', email: 'anita@campuspilot.ai', department: 'ECE', xpPoints: 8950, badges: ['react', 'node', 'python', 'aws', 'docker', 'sql', 'js', 'html', 'css'] },
      { name: 'John Doe', email: 'john@campuspilot.ai', department: 'CSE', xpPoints: 8100, badges: ['react', 'node', 'python', 'aws', 'docker', 'sql', 'js'] },
      { name: 'Priya S', email: 'priya@campuspilot.ai', department: 'MECH', xpPoints: 7800, badges: ['react', 'node', 'python', 'aws', 'docker', 'sql'] }
    ]
    await Student.insertMany(students)

    console.log('🎉 Seeding Complete! Database is populated.')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error Seeding Data:', error)
    process.exit(1)
  }
}

seedData()
