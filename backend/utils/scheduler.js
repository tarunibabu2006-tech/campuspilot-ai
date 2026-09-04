import { notificationEngine } from './notificationEngine.js'
import { syncOfficialExamFeeds } from './examScraper.js'
import logger from './logger.js'

/**
 * CampusPilot AI — Exam Notification Scheduler
 */

export const notificationScheduleConfig = {
  daily: [
    { time: '00:00', task: 'checkApplicationDeadlines' },
    { time: '06:00', task: 'sendDailyDigest' },
    { time: '12:00', task: 'checkNewNotifications' },
    { time: '18:00', task: 'sendExamReminders' }
  ],
  weekly: [
    { day: 'Monday', task: 'generateWeeklyDigest' },
    { day: 'Friday', task: 'sendUpcomingExamAlerts' }
  ],
  monthly: [
    { date: 1, task: 'checkSyllabusUpdates' },
    { date: 15, task: 'sendExamPreparationTips' }
  ]
}

let schedulerTimer = null

export async function runScheduledTasks() {
  logger.info('⏰ Scheduler: Running scheduled exam checks...')
  try {
    // 1. Sync latest official exam feeds
    await syncOfficialExamFeeds()

    // 2. Check for upcoming application deadlines
    const deadlineResults = await notificationEngine.checkApplicationDeadlines()
    logger.info(`⏰ Scheduler: Processed ${deadlineResults.length} deadline alerts`)

    // 3. Check for upcoming exam countdown alerts
    const examDateResults = await notificationEngine.checkUpcomingExamDates()
    logger.info(`⏰ Scheduler: Processed ${examDateResults.length} exam date countdown alerts`)

    return { success: true, deadlineAlerts: deadlineResults.length, examDateAlerts: examDateResults.length }
  } catch (err) {
    logger.error(`Scheduler execution error: ${err.message}`)
    return { success: false, error: err.message }
  }
}

/**
 * Start periodic in-process background scheduler (e.g. every 6 hours or 1 hour)
 */
export function startNotificationScheduler(intervalMs = 6 * 60 * 60 * 1000) {
  if (schedulerTimer) return

  logger.info(`🚀 Starting Exam Notification Scheduler (interval: ${intervalMs / 1000}s)`)
  
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
    logger.info('🛑 Exam Notification Scheduler stopped')
  }
}

// Support running directly via CLI (npm run notifications:start)
if (process.argv[1]?.includes('scheduler.js')) {
  import('dotenv').then(d => d.default.config())
  import('mongoose').then(async m => {
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
  runScheduledTasks,
  startNotificationScheduler,
  stopNotificationScheduler
}
