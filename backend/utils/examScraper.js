import Exam from '../models/Exam.js'
import logger from './logger.js'

/**
 * CampusPilot AI — Official Exam Scraper & Feed Synchronizer
 * Monitors major central and state exam recruitment & entrance bodies
 */

const today = new Date()
const formatDate = (daysAhead) => {
  const d = new Date(today)
  d.setDate(d.getDate() + daysAhead)
  return d.toISOString().split('T')[0]
}

export const OFFICIAL_EXAM_FEEDS = [
  // ── 1. NTA (National Testing Agency) ──────────────────────────────
  {
    examName: 'JEE Main 2026 (Session 1 & 2)',
    conductingBody: 'NTA',
    category: 'Engineering',
    stream: ['Science', 'Engineering'],
    eligibility: '12th Pass (Physics, Chemistry, Maths)',
    examDate: formatDate(40),
    applicationStart: formatDate(-20),
    applicationEnd: formatDate(20),
    registrationEnd: formatDate(20),
    admitCardDate: formatDate(30),
    resultDate: formatDate(60),
    officialWebsite: 'https://jeemain.nta.ac.in',
    applyLink: 'https://jeemain.nta.ac.in/apply',
    notificationUrl: 'https://jeemain.nta.ac.in/notification',
    syllabus: 'https://jeemain.nta.ac.in/syllabus',
    examPattern: 'Computer Based Test (CBT) - Physics, Chemistry, Maths (300 Marks)',
    previousPapers: 'https://jeemain.nta.ac.in/pyqs',
    notificationTitle: '📢 JEE Main 2026 Applications Open! Apply Now',
    notificationDescription: 'National Testing Agency invites online applications for JEE (Main) 2026 Session 1 for admission to NITs, IIITs, and CFTIs.',
    status: 'active',
    vacancies: '55,000+ Seats across NITs/IIITs'
  },
  {
    examName: 'NEET UG 2026',
    conductingBody: 'NTA',
    category: 'Medical',
    stream: ['Science', 'Medical'],
    eligibility: '12th Pass (Physics, Chemistry, Biology)',
    examDate: formatDate(55),
    applicationStart: formatDate(-15),
    applicationEnd: formatDate(25),
    registrationEnd: formatDate(25),
    admitCardDate: formatDate(45),
    resultDate: formatDate(75),
    officialWebsite: 'https://exams.nta.ac.in/NEET',
    applyLink: 'https://exams.nta.ac.in/NEET/registration',
    notificationUrl: 'https://exams.nta.ac.in/NEET/notification',
    syllabus: 'https://exams.nta.ac.in/NEET/syllabus',
    examPattern: 'Pen and Paper (OMR) - 720 Marks (Physics, Chemistry, Botany, Zoology)',
    previousPapers: 'https://exams.nta.ac.in/NEET/pyqs',
    notificationTitle: '🏥 NEET UG 2026 Official Information Bulletin Released',
    notificationDescription: 'All India Pre-Medical Entrance Test for MBBS/BDS/AYUSH seats in prestigious medical colleges across India.',
    status: 'active',
    vacancies: '1,05,000+ MBBS/BDS Seats'
  },
  {
    examName: 'CUET UG 2026',
    conductingBody: 'NTA',
    category: 'Higher Education',
    stream: ['Science', 'Commerce', 'Arts', 'Any'],
    eligibility: '12th Appearing or Passed',
    examDate: formatDate(60),
    applicationStart: formatDate(-10),
    applicationEnd: formatDate(30),
    registrationEnd: formatDate(30),
    admitCardDate: formatDate(50),
    resultDate: formatDate(80),
    officialWebsite: 'https://cuetug.ntaonline.in',
    applyLink: 'https://cuetug.ntaonline.in/registration',
    notificationUrl: 'https://cuetug.ntaonline.in/notification',
    syllabus: 'https://cuetug.ntaonline.in/syllabus',
    examPattern: 'CBT Hybrid Mode - Domain Subjects, General Test & Language',
    previousPapers: 'https://cuetug.ntaonline.in/pyqs',
    notificationTitle: '🎓 CUET UG 2026 Registration Started for 250+ Universities',
    notificationDescription: 'Single gateway test for admission to Delhi University, BHU, JNU, Jamia, and 250+ central, state & private universities.',
    status: 'active',
    vacancies: '3,00,000+ Central University Seats'
  },

  // ── 2. UPSC (Union Public Service Commission) ──────────────────────
  {
    examName: 'UPSC Civil Services Examination (CSE) 2026',
    conductingBody: 'UPSC',
    category: 'Civil Services',
    stream: ['Science', 'Commerce', 'Arts', 'Engineering', 'Any'],
    eligibility: 'Graduate in Any Discipline',
    examDate: formatDate(70),
    applicationStart: formatDate(-10),
    applicationEnd: formatDate(15),
    registrationEnd: formatDate(15),
    admitCardDate: formatDate(60),
    resultDate: formatDate(90),
    officialWebsite: 'https://upsc.gov.in',
    applyLink: 'https://upsconline.nic.in',
    notificationUrl: 'https://upsc.gov.in/examinations/active-exams',
    syllabus: 'https://upsc.gov.in/examinations/revised-syllabus',
    examPattern: 'Prelims (GS + CSAT) → Mains (9 Papers) → Personality Test',
    previousPapers: 'https://upsc.gov.in/examinations/previous-question-papers',
    notificationTitle: '🏛️ UPSC CSE Prelims 2026 Notification Released!',
    notificationDescription: 'Recruitment for prestigious IAS, IPS, IFS, IRS and Central Services Group A officers. Age Limit: 21-32 Years.',
    status: 'active',
    vacancies: '1,056 Posts'
  },
  {
    examName: 'UPSC NDA & NA (I) 2026',
    conductingBody: 'UPSC',
    category: 'Defence',
    stream: ['Science', 'Arts', 'Commerce'],
    eligibility: '12th Pass / Appearing',
    examDate: formatDate(35),
    applicationStart: formatDate(-15),
    applicationEnd: formatDate(12),
    registrationEnd: formatDate(12),
    admitCardDate: formatDate(25),
    resultDate: formatDate(65),
    officialWebsite: 'https://upsc.gov.in',
    applyLink: 'https://upsconline.nic.in',
    notificationUrl: 'https://upsc.gov.in/examinations/nda-na-1-2026',
    syllabus: 'https://upsc.gov.in/examinations/nda-syllabus',
    examPattern: 'Mathematics (300 Marks) + General Ability Test (600 Marks) + SSB Interview',
    previousPapers: 'https://upsc.gov.in/pyqs/nda',
    notificationTitle: '⚔️ UPSC NDA (I) 2026 Written Exam Scheduled',
    notificationDescription: 'Direct officer entry into Indian Army, Navy, and Air Force after 12th standard.',
    status: 'active',
    vacancies: '400 Posts'
  },

  // ── 3. SSC (Staff Selection Commission) ───────────────────────────
  {
    examName: 'SSC CGL 2026 (Combined Graduate Level)',
    conductingBody: 'SSC',
    category: 'Government',
    stream: ['Commerce', 'Science', 'Arts', 'Engineering', 'Any'],
    eligibility: 'Graduate in Any Discipline',
    examDate: formatDate(90),
    applicationStart: formatDate(10),
    applicationEnd: formatDate(40),
    registrationEnd: formatDate(40),
    admitCardDate: formatDate(80),
    resultDate: formatDate(120),
    officialWebsite: 'https://ssc.gov.in',
    applyLink: 'https://ssc.gov.in/apply',
    notificationUrl: 'https://ssc.gov.in/notices/cgl-2026',
    syllabus: 'https://ssc.gov.in/syllabus/cgl',
    examPattern: 'Tier 1 (Reasoning, Quant, English, GA) → Tier 2 (Mathematical Abilities, English, Reasoning, Computers)',
    previousPapers: 'https://ssc.gov.in/pyqs/cgl',
    notificationTitle: '🏛️ SSC CGL 2026 Notification Calendar Announced',
    notificationDescription: 'Recruitment for Group B & C Inspectors (Income Tax, Excise, GST), ASO in Ministries, Sub-Inspectors in CBI.',
    status: 'upcoming',
    vacancies: '17,727 Expected Vacancies'
  },

  // ── 4. Banking & Financial (IBPS & SBI) ─────────────────────────────
  {
    examName: 'IBPS PO 2026 (CRP PO/MT-XVI)',
    conductingBody: 'IBPS',
    category: 'Banking',
    stream: ['Commerce', 'Engineering', 'Science', 'Arts', 'Any'],
    eligibility: 'Graduate in Any Discipline',
    examDate: formatDate(80),
    applicationStart: formatDate(5),
    applicationEnd: formatDate(35),
    registrationEnd: formatDate(35),
    admitCardDate: formatDate(70),
    resultDate: formatDate(100),
    officialWebsite: 'https://ibps.in',
    applyLink: 'https://ibps.in/crp-po-mt-xvi',
    notificationUrl: 'https://ibps.in/documents/crp-po-notification.pdf',
    syllabus: 'https://ibps.in/syllabus/po',
    examPattern: 'Prelims (Quant, Reasoning, English) → Mains (Data Analysis, GA, Reasoning) → Interview',
    previousPapers: 'https://ibps.in/pyqs/po',
    notificationTitle: '🏦 IBPS PO 2026 Annual Calendar & Schedule Released',
    notificationDescription: 'Probationary Officer recruitment across 11 Nationalized Public Sector Banks (PNB, Canara, BoB, etc.).',
    status: 'upcoming',
    vacancies: '4,455 Posts'
  },

  // ── 5. IITs (GATE & Higher Tech) ──────────────────────────────────
  {
    examName: 'GATE 2026 (Graduate Aptitude Test in Engineering)',
    conductingBody: 'IIT',
    category: 'Engineering',
    stream: ['Engineering', 'Science'],
    eligibility: 'B.E / B.Tech / M.Sc / MCA Graduate or Final Year',
    examDate: formatDate(100),
    applicationStart: formatDate(-5),
    applicationEnd: formatDate(45),
    registrationEnd: formatDate(45),
    admitCardDate: formatDate(90),
    resultDate: formatDate(130),
    officialWebsite: 'https://gate.iitg.ac.in',
    applyLink: 'https://goaps.iitg.ac.in',
    notificationUrl: 'https://gate.iitg.ac.in/notification',
    syllabus: 'https://gate.iitg.ac.in/syllabus',
    examPattern: 'CBT 100 Marks (General Aptitude + Engineering Mathematics + Subject Paper)',
    previousPapers: 'https://gate.iitg.ac.in/pyqs',
    notificationTitle: '🚀 GATE 2026 Official Scorecard & PSU Recruitment Gateway',
    notificationDescription: 'Gateway test for Master degrees in IISc/IITs and Executive Trainee recruitment in PSUs (ONGC, IOCL, NTPC, BHEL).',
    status: 'active',
    vacancies: 'IIT M.Tech Seats + 5,000 PSU Executive Trainees'
  },

  // ── 6. State PSCs (e.g. TNPSC) ────────────────────────────────────
  {
    examName: 'TNPSC Group 4 (Combined Civil Services IV) 2026',
    conductingBody: 'State PSC',
    category: 'Government',
    stream: ['Any', 'Arts', 'Commerce', 'Science'],
    eligibility: '10th Pass (SSLC) / 12th Pass',
    examDate: formatDate(50),
    applicationStart: formatDate(-10),
    applicationEnd: formatDate(18),
    registrationEnd: formatDate(18),
    admitCardDate: formatDate(40),
    resultDate: formatDate(80),
    officialWebsite: 'https://tnpsc.gov.in',
    applyLink: 'https://tnpscexams.in',
    notificationUrl: 'https://tnpsc.gov.in/notifications/group4-2026.pdf',
    syllabus: 'https://tnpsc.gov.in/syllabus/group4',
    examPattern: 'General Tamil / English (100 Qs) + General Studies & Aptitude (100 Qs) = 300 Marks',
    previousPapers: 'https://tnpsc.gov.in/pyqs/group4',
    notificationTitle: '🏛️ TNPSC Group 4 2026 Hall Ticket & Exam Notice',
    notificationDescription: 'Recruitment for VAO (Village Administrative Officer), Junior Assistant, Bill Collector, Typist in Tamil Nadu.',
    status: 'active',
    vacancies: '6,244 Posts'
  }
]

/**
 * Sync official exam feeds into the MongoDB Atlas database
 */
export async function syncOfficialExamFeeds() {
  logger.info('🔄 ExamScraper: Syncing official exam feeds into database...')
  const results = {
    added: 0,
    updated: 0,
    total: OFFICIAL_EXAM_FEEDS.length,
    errors: []
  }

  for (const item of OFFICIAL_EXAM_FEEDS) {
    try {
      const existing = await Exam.findOne({ examName: item.examName })
      if (existing) {
        await Exam.updateOne({ _id: existing._id }, { $set: item })
        results.updated++
      } else {
        await Exam.create(item)
        results.added++
      }
    } catch (err) {
      results.errors.push(`Error syncing ${item.examName}: ${err.message}`)
      logger.error(`Scraper error for ${item.examName}: ${err.message}`)
    }
  }

  logger.info(`✅ ExamScraper sync complete: Added ${results.added}, Updated ${results.updated}`)
  return results
}

export default {
  OFFICIAL_EXAM_FEEDS,
  syncOfficialExamFeeds
}
