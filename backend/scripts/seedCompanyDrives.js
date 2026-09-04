import mongoose from 'mongoose'
import dotenv from 'dotenv'
import dns from 'dns'
import path from 'path'
import { fileURLToPath } from 'url'
import CompanyDrive from '../models/CompanyDrive.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1'])
} catch (e) {
  // Ignored
}

dotenv.config({ path: path.join(__dirname, '../.env') })
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://tarunibabu2006_db_user:Tarunikababu@cluster0.aespzsi.mongodb.net/campuspilot?retryWrites=true&w=majority'

const initialDrives = [
  {
    companyName: 'TCS (Tata Consultancy Services)',
    driveTitle: 'TCS NQT National Qualifier Test 2026',
    role: 'Ninja Developer & Digital Software Engineer',
    driveType: 'Off-Campus Drive',
    batchEligible: ['2024', '2025', '2026'],
    degreeEligible: ['B.E', 'B.Tech', 'M.E', 'M.Tech', 'MCA', 'B.Sc CS', 'BCA'],
    cgpaCutoff: '60% or 6.0 CGPA',
    ctcPackage: '₹3.36 LPA - ₹9.0 LPA',
    location: 'PAN India (Bengaluru, Chennai, Hyderabad, Pune)',
    venueDetails: 'Online Remote Assessment / TCS iON Digital Zones nationwide',
    walkinDate: '2026-10-15',
    walkinTime: '09:00 AM IST',
    registrationEnd: '2026-09-30',
    applyLink: 'https://nextstep.tcs.com',
    officialNoticeUrl: 'https://nextstep.tcs.com',
    roundsInfo: [
      'Round 1: Online Aptitude + Foundation Coding Assessment',
      'Round 2: Technical Interview (DSA, OOPs, DBMS)',
      'Round 3: HR Interview'
    ],
    badgeText: '🔥 Mass Hiring (15,000+ Openings)',
    description: 'TCS NQT is the flagship entry gate for Ninja (3.36 LPA), Digital (7.0 LPA), and Prime (9.0 LPA) roles across TCS global delivery centers.',
    status: 'active'
  },
  {
    companyName: 'Zoho Corporation',
    driveTitle: 'Zoho Mega Off-Campus Walk-In Drive 2026',
    role: 'Software Development Engineer (SDE 1)',
    driveType: 'Walk-in Interview',
    batchEligible: ['2024', '2025', '2026', '2027'],
    degreeEligible: ['Any Degree', 'B.E', 'B.Tech', 'B.Sc', 'BCA', 'M.Sc'],
    cgpaCutoff: 'No Minimum Criteria (Skill Based Only)',
    ctcPackage: '₹5.5 LPA - ₹12.0 LPA',
    location: 'Chennai, Tenkasi, Coimbatore, Salem',
    venueDetails: 'Zoho Campus, Estancia IT Park, GST Road, Guduvanchery, Chennai - 603202',
    walkinDate: '2026-09-20',
    walkinTime: '08:30 AM IST',
    registrationEnd: '2026-09-18',
    applyLink: 'https://www.zoho.com/careers/',
    officialNoticeUrl: 'https://www.zoho.com/careers/',
    roundsInfo: [
      'Round 1: Written C/C++/Java Aptitude & Output Prediction',
      'Round 2: Basic Programming (5 Problem Solving Problems)',
      'Round 3: Advanced Data Structures & Module Design (4 Hours)',
      'Round 4: Technical & HR Interview'
    ],
    badgeText: '⭐ No CGPA Limit Walk-in',
    description: 'Direct Walk-in drive for Software Engineers at Zoho. Candidate evaluation is 100% based on coding skills and logical thinking with zero degree cutoffs.',
    status: 'active'
  },
  {
    companyName: 'Infosys',
    driveTitle: 'Infosys Specialist Programmer (SP) & DSE Drive',
    role: 'Specialist Programmer (SP) & Digital Specialist Engineer (DSE)',
    driveType: 'Off-Campus Drive',
    batchEligible: ['2025', '2026'],
    degreeEligible: ['B.E', 'B.Tech', 'M.E', 'M.Tech', 'MCA'],
    cgpaCutoff: '65% or 6.5 CGPA',
    ctcPackage: '₹6.25 LPA - ₹9.5 LPA',
    location: 'Bengaluru, Hyderabad, Pune, Chennai',
    venueDetails: 'Infosys Springboard Assessment Platform (Proctored Online Test)',
    walkinDate: '2026-10-05',
    walkinTime: '10:00 AM IST',
    registrationEnd: '2026-09-25',
    applyLink: 'https://www.infosys.com/careers.html',
    officialNoticeUrl: 'https://www.infosys.com/careers.html',
    roundsInfo: [
      'Round 1: Online HackWithInfy Competitive Coding (3 Problems)',
      'Round 2: Technical Deep-dive System Design Interview',
      'Round 3: HR Clearance'
    ],
    badgeText: '💎 High Package Role',
    description: 'Infosys is hiring top coding talent for high-impact engineering roles via HackWithInfy and National Qualifier Assessment.',
    status: 'active'
  },
  {
    companyName: 'Accenture',
    driveTitle: 'Accenture Associate Software Engineer (ASE) Walk-in',
    role: 'Associate Software Engineer & Advanced ASE',
    driveType: 'Walk-in Interview',
    batchEligible: ['2024', '2025', '2026'],
    degreeEligible: ['B.E', 'B.Tech', 'M.E', 'M.Tech', 'MCA', 'M.Sc CS'],
    cgpaCutoff: '60% aggregate without standing backlogs',
    ctcPackage: '₹4.5 LPA - ₹6.5 LPA',
    location: 'Bengaluru, Gurugram, Hyderabad, Mumbai',
    venueDetails: 'Accenture Development Centre, Divyasree Technopolis, Yemalur, Bengaluru',
    walkinDate: '2026-09-28',
    walkinTime: '09:00 AM IST',
    registrationEnd: '2026-09-24',
    applyLink: 'https://www.accenture.com/in-en/careers',
    officialNoticeUrl: 'https://www.accenture.com/in-en/careers',
    roundsInfo: [
      'Round 1: Cognitive & Technical Assessment (90 Mins)',
      'Round 2: Coding Assessment (45 Mins, 2 Problems)',
      'Round 3: Communication Assessment (Automated Voice)',
      'Round 4: Technical & Behavioral Interview'
    ],
    badgeText: '🚀 On-the-Spot Offer',
    description: 'Accenture Walk-in drive for fresh graduates with min 60% aggregate. Role involves cloud application development and full-stack engineering.',
    status: 'active'
  },
  {
    companyName: 'Amazon',
    driveTitle: 'Amazon WOW Off-Campus Drive 2026 (Women Engineers)',
    role: 'Software Development Engineer Intern / FTE (SDE-1)',
    driveType: 'Off-Campus Drive',
    batchEligible: ['2026', '2027'],
    degreeEligible: ['B.E', 'B.Tech', 'M.Tech', 'MCA'],
    cgpaCutoff: 'No CGPA Cutoff',
    ctcPackage: '₹28.0 LPA - ₹44.0 LPA',
    location: 'Bengaluru, Hyderabad, Chennai',
    venueDetails: 'Amazon Online Hiring Portal (Proctored Test)',
    walkinDate: '2026-10-20',
    walkinTime: '11:00 AM IST',
    registrationEnd: '2026-10-01',
    applyLink: 'https://amazon.jobs/',
    officialNoticeUrl: 'https://amazon.jobs/',
    roundsInfo: [
      'Round 1: Online Assessment (Coding + Amazon Work Simulation)',
      'Round 2: Technical Interview 1 (Data Structures & Algorithms)',
      'Round 3: Technical Interview 2 (System Architecture & Principles)',
      'Round 4: Bar Raiser Interview'
    ],
    badgeText: '🏆 FAANG Top Package',
    description: 'Amazon WOW is a networking and hiring platform for women in engineering across India, offering full-time SDE-1 and 6-month internship opportunities.',
    status: 'active'
  },
  {
    companyName: 'Cognizant (CTS)',
    driveTitle: 'Cognizant GenC Elevate & Pro Walk-In Drive',
    role: 'GenC Programmer & GenC Elevate Developer',
    driveType: 'Walk-in Interview',
    batchEligible: ['2024', '2025', '2026'],
    degreeEligible: ['B.E', 'B.Tech', 'MCA', 'M.Sc IT'],
    cgpaCutoff: '60% or 6.0 CGPA',
    ctcPackage: '₹4.0 LPA - ₹5.4 LPA',
    location: 'Chennai, Coimbatore, Kolkata, Hyderabad',
    venueDetails: 'Cognizant MEPZ Campus, Tambaram Sanatorium, Chennai - 600045',
    walkinDate: '2026-09-25',
    walkinTime: '08:30 AM IST',
    registrationEnd: '2026-09-22',
    applyLink: 'https://www.cognizant.com/in/en/careers',
    officialNoticeUrl: 'https://www.cognizant.com/in/en/careers',
    roundsInfo: [
      'Round 1: Quantitative & Technical Aptitude MCQ',
      'Round 2: Skill-based Coding Round (Data Structures & SQL)',
      'Round 3: Technical & HR Discussion'
    ],
    badgeText: '📢 Walk-in Drive',
    description: 'Cognizant walk-in recruitment for GenC Elevate. Candidate must carry resume, academic marksheets, and government ID.',
    status: 'active'
  },
  {
    companyName: 'Wipro',
    driveTitle: 'Wipro Elite National Talent Hunt (NTH) 2026',
    role: 'Project Engineer',
    driveType: 'Off-Campus Drive',
    batchEligible: ['2025', '2026'],
    degreeEligible: ['All Engineering Branches'],
    cgpaCutoff: '60% or 6.0 CGPA',
    ctcPackage: '₹3.5 LPA - ₹6.5 LPA',
    location: 'PAN India',
    venueDetails: 'Wipro Assessment Platform (Online)',
    walkinDate: '2026-10-10',
    walkinTime: '10:00 AM IST',
    registrationEnd: '2026-09-29',
    applyLink: 'https://careers.wipro.com/',
    officialNoticeUrl: 'https://careers.wipro.com/',
    roundsInfo: [
      'Round 1: Aptitude Test + Written English Essay',
      'Round 2: Online Coding Test (2 Problems)',
      'Round 3: Technical & HR Interview'
    ],
    badgeText: '🔥 Mass Hiring',
    description: 'Wipro NTH hiring for engineering graduates across India. High performers selected for Turbo role upgrade (6.5 LPA).',
    status: 'active'
  },
  {
    companyName: 'Capgemini',
    driveTitle: 'Capgemini Excellence Walk-in Recruitment',
    role: 'Analyst & Software Engineer',
    driveType: 'Walk-in Interview',
    batchEligible: ['2024', '2025', '2026'],
    degreeEligible: ['B.E', 'B.Tech', 'MCA'],
    cgpaCutoff: '55% or 5.5 CGPA',
    ctcPackage: '₹4.25 LPA - ₹7.5 LPA',
    location: 'Pune, Bengaluru, Noida',
    venueDetails: 'Capgemini Technology Services, Hinjewadi Phase 3, Pune - 411057',
    walkinDate: '2026-10-02',
    walkinTime: '09:00 AM IST',
    registrationEnd: '2026-09-28',
    applyLink: 'https://www.capgemini.com/in-en/careers/',
    officialNoticeUrl: 'https://www.capgemini.com/in-en/careers/',
    roundsInfo: [
      'Round 1: Technical MCQ & Pseudocode Assessment',
      'Round 2: Hands-on Coding Assessment',
      'Round 3: Spoken English Test',
      'Round 4: HR Interview'
    ],
    badgeText: '⚡ In-Person Walk-in',
    description: 'Capgemini in-person walk-in drive for full-stack engineering roles.',
    status: 'active'
  },
  {
    companyName: 'HCLTech',
    driveTitle: 'HCLTech First Careers Off-Campus Drive',
    role: 'Software Engineer & Technical Analyst',
    driveType: 'Off-Campus Drive',
    batchEligible: ['2024', '2025', '2026', '2027'],
    degreeEligible: ['B.E', 'B.Tech', 'B.Sc CS', 'BCA'],
    cgpaCutoff: '60% aggregate',
    ctcPackage: '₹3.25 LPA - ₹5.0 LPA',
    location: 'Noida, Chennai, Madurai, Lucknow',
    venueDetails: 'HCLTech Assessment Portal (Online)',
    walkinDate: '2026-10-12',
    walkinTime: '09:30 AM IST',
    registrationEnd: '2026-10-05',
    applyLink: 'https://www.hcltech.com/careers',
    officialNoticeUrl: 'https://www.hcltech.com/careers',
    roundsInfo: [
      'Round 1: Online Aptitude & Logical Reasoning',
      'Round 2: Technical Interview',
      'Round 3: HR Clearance'
    ],
    badgeText: '💼 Freshers Friendly',
    description: 'HCLTech entry level hiring for IT support, Cloud Ops, and Software Engineering roles.',
    status: 'active'
  },
  {
    companyName: 'Deloitte India',
    driveTitle: 'Deloitte USI Off-Campus Hiring 2026',
    role: 'Analyst - Technology Consulting',
    driveType: 'Off-Campus Drive',
    batchEligible: ['2025', '2026'],
    degreeEligible: ['B.E', 'B.Tech', 'MCA', 'M.Tech'],
    cgpaCutoff: '65% or 6.5 CGPA',
    ctcPackage: '₹7.6 LPA - ₹11.5 LPA',
    location: 'Hyderabad, Bengaluru, Gurugram',
    venueDetails: 'Deloitte Online Recruitment Platform',
    walkinDate: '2026-10-18',
    walkinTime: '10:00 AM IST',
    registrationEnd: '2026-10-08',
    applyLink: 'https://www2.deloitte.com/ui/en/careers/careers.html',
    officialNoticeUrl: 'https://www2.deloitte.com/ui/en/careers/careers.html',
    roundsInfo: [
      'Round 1: Online Analytical & Logic Test',
      'Round 2: Technical Case Study Round',
      'Round 3: Technical & Managerial Interview'
    ],
    badgeText: '🌟 Premium Consulting',
    description: 'Deloitte US India hiring Analysts across Cloud, Cyber Security, AI, and Enterprise Solutions.',
    status: 'active'
  }
]

async function seedCompanyDrives() {
  try {
    console.log('Connecting to MongoDB Atlas...')
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000
    })
    console.log('✅ Connected to MongoDB Atlas!')

    console.log('Clearing existing Company Drives...')
    await CompanyDrive.deleteMany({})

    console.log('Inserting 10 Official Company Walk-in & Off-campus Drives...')
    const inserted = await CompanyDrive.insertMany(initialDrives)
    console.log(`🎉 Successfully seeded ${inserted.length} Company Drives!`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding Company Drives:', error)
    process.exit(1)
  }
}

seedCompanyDrives()
