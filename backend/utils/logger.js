import winston from 'winston'
import 'winston-daily-rotate-file'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isVercel = !!process.env.VERCEL || process.env.NODE_ENV === 'production'

const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta) : ''
    }`
  })
)

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  })
]

// Only write to file system in local development (Vercel serverless environment is read-only)
if (!process.env.VERCEL) {
  try {
    const logDir = path.join(__dirname, '../logs')
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true })
    }

    const fileTransport = new winston.transports.DailyRotateFile({
      filename: 'campuspilot-%DATE%.log',
      dirname: logDir,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })

    transports.push(fileTransport)
  } catch (err) {
    // If read-only filesystem or any error creating log file, gracefully fallback to console only
  }
}

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: customFormat,
  transports
})

export default logger
