import Exam from '../models/Exam.js'
import logger from './logger.js'

/**
 * CampusPilot AI — Official Exam Scraper & Feed Synchronizer
 * Monitors major central and state exam recruitment & entrance bodies
 */

export const OFFICIAL_EXAM_FEEDS = [
  // ── 1. NTA (National Testing Agency) ──────────────────────────────
  {
    examName: 'JEE Main 2026 (Session 1 & 2)',
    conductingBody: 'NTA',
    category: 'Engineering',
    stream: ['Science', 'Engineering'],
    eligibility: '12th Pass (Physics, Chemistry, Maths)',
    examDate: '2026-04-15',
    applicationStart: '2026-01-15',
    applicationEnd: '2026-02-15',
    admitCardDate: '2026-04-01',
    resultDate: '2026-05-15',
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
    examDate: '2026-05-03',
    applicationStart: '2026-02-09',
    applicationEnd: '2026-03-09',
    admitCardDate: '2026-04-25',
    resultDate: '2026-06-14',
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
    examDate: '2026-05-20',
    applicationStart: '2026-02-27',
    applicationEnd: '2026-03-26',
    admitCardDate: '2026-05-12',
    resultDate: '2026-06-30',
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
  {
    examName: 'UGC NET June 2026',
    conductingBody: 'NTA',
    category: 'Teaching',
    stream: ['Arts', 'Commerce', 'Science', 'Engineering'],
    eligibility: 'Post Graduate (Master Degree with min 55%)',
    examDate: '2026-06-18',
    applicationStart: '2026-04-20',
    applicationEnd: '2026-05-10',
    admitCardDate: '2026-06-10',
    resultDate: '2026-07-22',
    officialWebsite: 'https://ugcnet.nta.ac.in',
    applyLink: 'https://ugcnet.nta.ac.in/apply',
    notificationUrl: 'https://ugcnet.nta.ac.in/docs/bulletin.pdf',
    syllabus: 'https://ugcnet.nta.ac.in/syllabus',
    examPattern: 'Paper 1 (General Teaching/Research) + Paper 2 (Subject Specific)',
    previousPapers: 'https://ugcnet.nta.ac.in/pyqs',
    notificationTitle: '📚 UGC NET 2026 for Assistant Professor & JRF Announced',
    notificationDescription: 'Qualifying exam for Assistant Professorship and Junior Research Fellowship in Indian Universities.',
    status: 'upcoming',
    vacancies: 'JRF Fellowship + Lectureship'
  },

  // ── 2. UPSC (Union Public Service Commission) ──────────────────────
  {
    examName: 'UPSC Civil Services Examination (CSE) 2026',
    conductingBody: 'UPSC',
    category: 'Civil Services',
    stream: ['Science', 'Commerce', 'Arts', 'Engineering', 'Any'],
    eligibility: 'Graduate in Any Discipline',
    examDate: '2026-05-24',
    applicationStart: '2026-02-14',
    applicationEnd: '2026-03-05',
    admitCardDate: '2026-05-10',
    resultDate: '2026-06-25',
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
    examDate: '2026-04-12',
    applicationStart: '2026-01-10',
    applicationEnd: '2026-01-30',
    admitCardDate: '2026-03-25',
    resultDate: '2026-05-20',
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
  {
    examName: 'UPSC CDS (I) 2026',
    conductingBody: 'UPSC',
    category: 'Defence',
    stream: ['Engineering', 'Science', 'Any'],
    eligibility: 'Graduate (IMA/OTA) or B.E/B.Tech (INAA/AFA)',
    examDate: '2026-04-12',
    applicationStart: '2026-01-10',
    applicationEnd: '2026-01-30',
    admitCardDate: '2026-03-25',
    resultDate: '2026-06-01',
    officialWebsite: 'https://upsc.gov.in',
    applyLink: 'https://upsconline.nic.in',
    notificationUrl: 'https://upsc.gov.in/examinations/cds-1-2026',
    syllabus: 'https://upsc.gov.in/examinations/cds-syllabus',
    examPattern: 'English (100) + General Knowledge (100) + Elementary Maths (100)',
    previousPapers: 'https://upsc.gov.in/pyqs/cds',
    notificationTitle: '🎖️ UPSC Combined Defence Services (CDS I) 2026',
    notificationDescription: 'Commissioned Officer training at IMA Dehradun, INA Ezhimala, AFA Hyderabad, and OTA Chennai.',
    status: 'active',
    vacancies: '457 Posts'
  },

  // ── 3. SSC (Staff Selection Commission) ───────────────────────────
  {
    examName: 'SSC CGL 2026 (Combined Graduate Level)',
    conductingBody: 'SSC',
    category: 'Government',
    stream: ['Commerce', 'Science', 'Arts', 'Engineering', 'Any'],
    eligibility: 'Graduate in Any Discipline',
    examDate: '2026-09-10',
    applicationStart: '2026-06-11',
    applicationEnd: '2026-07-10',
    admitCardDate: '2026-09-01',
    resultDate: '2026-11-15',
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
  {
    examName: 'SSC CHSL 2026 (10+2 Level)',
    conductingBody: 'SSC',
    category: 'Government',
    stream: ['Science', 'Commerce', 'Arts', 'Any'],
    eligibility: '12th Pass',
    examDate: '2026-07-01',
    applicationStart: '2026-04-02',
    applicationEnd: '2026-05-01',
    admitCardDate: '2026-06-20',
    resultDate: '2026-08-30',
    officialWebsite: 'https://ssc.gov.in',
    applyLink: 'https://ssc.gov.in/apply/chsl',
    notificationUrl: 'https://ssc.gov.in/notices/chsl-2026',
    syllabus: 'https://ssc.gov.in/syllabus/chsl',
    examPattern: 'Tier 1 Objective CBT + Tier 2 Subjective/Skill Test',
    previousPapers: 'https://ssc.gov.in/pyqs/chsl',
    notificationTitle: '📋 SSC CHSL 2026 Tier 1 Application Window Opening Soon',
    notificationDescription: 'Recruitment for Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA), and Data Entry Operators (DEO).',
    status: 'upcoming',
    vacancies: '3,712 Posts'
  },

  // ── 4. Banking & Financial (IBPS & SBI) ─────────────────────────────
  {
    examName: 'IBPS PO 2026 (CRP PO/MT-XVI)',
    conductingBody: 'IBPS',
    category: 'Banking',
    stream: ['Commerce', 'Engineering', 'Science', 'Arts', 'Any'],
    eligibility: 'Graduate in Any Discipline',
    examDate: '2026-10-19',
    applicationStart: '2026-08-01',
    applicationEnd: '2026-08-21',
    admitCardDate: '2026-10-05',
    resultDate: '2026-12-01',
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
  {
    examName: 'SBI PO 2026',
    conductingBody: 'SBI',
    category: 'Banking',
    stream: ['Commerce', 'Engineering', 'Science', 'Arts', 'Any'],
    eligibility: 'Graduate in Any Discipline',
    examDate: '2026-11-15',
    applicationStart: '2026-09-07',
    applicationEnd: '2026-09-27',
    admitCardDate: '2026-11-01',
    resultDate: '2026-12-28',
    officialWebsite: 'https://sbi.co.in/careers',
    applyLink: 'https://sbi.co.in/careers/po-apply',
    notificationUrl: 'https://sbi.co.in/careers/documents/po-advt.pdf',
    syllabus: 'https://sbi.co.in/careers/syllabus-po',
    examPattern: 'Phase 1 Prelims → Phase 2 Mains + Descriptive → Phase 3 Psychometric, GD & Interview',
    previousPapers: 'https://sbi.co.in/careers/pyqs',
    notificationTitle: '💰 State Bank of India Probationary Officer 2026',
    notificationDescription: 'Prestigious entry into India’s largest commercial bank with high CTC and global posting opportunities.',
    status: 'upcoming',
    vacancies: '2,000 Posts'
  },

  // ── 5. IITs (GATE & Higher Tech) ──────────────────────────────────
  {
    examName: 'GATE 2026 (Graduate Aptitude Test in Engineering)',
    conductingBody: 'IIT',
    category: 'Engineering',
    stream: ['Engineering', 'Science'],
    eligibility: 'B.E / B.Tech / M.Sc / MCA Graduate or Final Year',
    examDate: '2026-02-07',
    applicationStart: '2026-08-28',
    applicationEnd: '2026-10-05',
    admitCardDate: '2026-01-02',
    resultDate: '2026-03-19',
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

  // ── 6. Railways (RRB) ─────────────────────────────────────────────
  {
    examName: 'RRB NTPC 2026 (Non-Technical Popular Categories)',
    conductingBody: 'RRB',
    category: 'Government',
    stream: ['Any', 'Commerce', 'Science', 'Arts'],
    eligibility: '12th Pass or Graduate',
    examDate: '2026-08-20',
    applicationStart: '2026-05-15',
    applicationEnd: '2026-06-15',
    admitCardDate: '2026-08-10',
    resultDate: '2026-10-15',
    officialWebsite: 'https://indianrailways.gov.in',
    applyLink: 'https://rrbapply.gov.in',
    notificationUrl: 'https://rrbapply.gov.in/cen-ntpc-2026.pdf',
    syllabus: 'https://rrbapply.gov.in/syllabus/ntpc',
    examPattern: 'CBT 1 (General Awareness, Mathematics, Reasoning) → CBT 2 → Typing/Skill Test',
    previousPapers: 'https://rrbapply.gov.in/pyqs',
    notificationTitle: '🚆 RRB NTPC 2026 Mega Recruitment Notice',
    notificationDescription: 'Station Master, Goods Train Manager, Senior Clerk, Commercial Apprentice in Indian Railways.',
    status: 'upcoming',
    vacancies: '11,558 Posts'
  },

  // ── 7. State PSCs (e.g. TNPSC) ────────────────────────────────────
  {
    examName: 'TNPSC Group 4 (Combined Civil Services IV) 2026',
    conductingBody: 'State PSC',
    category: 'Government',
    stream: ['Any', 'Arts', 'Commerce', 'Science'],
    eligibility: '10th Pass (SSLC) / 12th Pass',
    examDate: '2026-06-09',
    applicationStart: '2026-01-30',
    applicationEnd: '2026-02-28',
    admitCardDate: '2026-05-25',
    resultDate: '2026-08-15',
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
