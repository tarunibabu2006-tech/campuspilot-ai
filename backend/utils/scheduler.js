import { notificationEngine } from './notificationEngine.js'
import { syncOfficialExamFeeds } from './examScraper.js'
import { scrapeCompanyDrives } from './driveScraper.js'
import Exam from '../models/Exam.js'
import CompanyDrive from '../models/CompanyDrive.js'
import logger from './logger.js'

/**
 * CampusPilot AI — Automated Opportunity Scheduler & Lifetime Cleanup Engine
 */

export const notificationScheduleConfig = {
  daily: [
    { time: '00:00', task: 'cleanupExpiredOpportunities' },
    { time: '06:00', task: 'syncOfficialFeedsAndDrives' },
    { time: '12:00', task: 'checkNewNotifications' },
    { time: '18:00', task: 'sendExamReminders' }
  ]
}

let schedulerTimer = null

/**
 * Automatically flags past exams and walk-in drives as 'expired' in database
 */
export async function cleanupExpiredOpportunities() {
  try {
    const todayStr = new Date().toISOString().split('T')[0]
    const todayDate = new Date()

    logger.info(`🧹 [Auto-Cleanup] Checking for expired exams & walk-in drives before ${todayStr}...`)

    // 1. Expire past exams
    const expiredExamsResult = await Exam.updateMany(
      {
        status: 'active',
        $or: [
          { registrationEnd: { $lt: todayStr, $ne: '' } },
          { applicationDeadline: { $lt: todayDate } }
        ]
      },
      { $set: { status: 'expired' } }
    )

    // 2. Expire past company walk-in drives
    const expiredDrivesResult = await CompanyDrive.updateMany(
      {
        status: 'active',
        $or: [
          { registrationEnd: { $lt: todayStr, $ne: '' } },
          { walkinDate: { $lt: todayStr, $ne: '' } }
        ]
      },
      { $set: { status: 'expired' } }
    )

    logger.info(
      `✅ [Auto-Cleanup Complete] Marked ${expiredExamsResult.modifiedCount} exams & ${expiredDrivesResult.modifiedCount} drives as expired.`
    )

    return {
      expiredExams: expiredExamsResult.modifiedCount,
      expiredDrives: expiredDrivesResult.modifiedCount
    }
  } catch (err) {
    logger.error(`❌ [Auto-Cleanup Error]: ${err.message}`)
    return { expiredExams: 0, expiredDrives: 0 }
  }
}

export async function runScheduledTasks() {
  logger.info('⏰ Scheduler: Running automated opportunity synchronization & cleanup...')
  try {
    // 1. Run lifetime cleanup for expired deadlines
    const cleanupResult = await cleanupExpiredOpportunities()

    // 2. Sync latest official exam feeds from NTA, UPSC, SSC, Banking, PSCs
    await syncOfficialExamFeeds()

    // 3. Scrape latest company walk-in & off-campus drives
    await scrapeCompanyDrives()

    // 4. Check for upcoming application deadlines & dispatch reminders
    const deadlineResults = await notificationEngine.checkApplicationDeadlines()
    logger.info(`⏰ Scheduler: Processed ${deadlineResults.length} deadline alerts`)

    // 5. Check for upcoming exam countdown alerts
    const examDateResults = await notificationEngine.checkUpcomingExamDates()
    logger.info(`⏰ Scheduler: Processed ${examDateResults.length} exam date countdown alerts`)

    return {
      success: true,
      cleanupResult,
      deadlineAlerts: deadlineResults.length,
      examDateAlerts: examDateResults.length
    }
  } catch (err) {
    logger.error(`Scheduler execution error: ${err.message}`)
    return { success: false, error: err.message }
  }
}

/**
 * Start periodic in-process background scheduler (default: every 6 hours)
 */
export function startNotificationScheduler(intervalMs = 6 * 60 * 60 * 1000) {
  if (schedulerTimer) return

  logger.info(`🚀 Starting CampusPilot Opportunity Scheduler (interval: ${intervalMs / 1000}s)`)

  // Initial run after 15 seconds to let DB connection establish
  setTimeout(() => {
    runScheduledTasks()
  }, 15000)

  schedulerTimer = setInterval(() => {
    runScheduledTasks()
  }, intervalMs)
}

export function stopNotificationScheduler() {
  if (schedulerTimer) {
    clearInterval(schedulerTimer)
    schedulerTimer = null
    logger.info('🛑 Opportunity Scheduler stopped')
  }
}

// Support running directly via CLI (npm run notifications:start)
if (process.argv[1]?.includes('scheduler.js')) {
  import('dotenv').then((d) => d.default.config())
  import('mongoose').then(async (m) => {
    const uri = process.env.MONGODB_URI
    if (uri) {
      await m.default.connect(uri)
      logger.info('Connected to DB for standalone scheduler')
      await runScheduledTasks()
      logger.info('Scheduler run complete. Keeping process alive for scheduled intervals...')
      startNotificationScheduler(3600000) // hourly
    }
  })
}

export default {
  notificationScheduleConfig,
  cleanupExpiredOpportunities,
  runScheduledTasks,
  startNotificationScheduler,
  stopNotificationScheduler
}
