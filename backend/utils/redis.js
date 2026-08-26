import { createClient } from 'redis'
import logger from './logger.js'

let redisClient

export const connectRedis = async () => {
  if (!process.env.REDIS_URL) {
    logger.warn('⚠️ REDIS_URL not provided. Redis caching will be disabled.')
    return null
  }

  try {
    redisClient = createClient({
      url: process.env.REDIS_URL,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries >= 3) {
            // Stop retrying after 3 attempts to prevent spamming logs
            return false
          }
          return 3000 // Retry every 3 seconds
        }
      }
    })

    redisClient.on('error', (err) => {
      if (err.code === 'ECONNREFUSED') {
        logger.warn('⚠️ Redis is offline. Caching is disabled.')
      } else {
        logger.error(`Redis Client Error: ${err.message}`)
      }
    })
    redisClient.on('connect', () => logger.info('🔄 Connecting to Redis...'))
    redisClient.on('ready', () => logger.info('✅ Redis connected successfully!'))

    await redisClient.connect()
    return redisClient
  } catch (error) {
    logger.warn(`❌ Failed to connect to Redis: ${error.message}`)
    redisClient = null
    return null
  }
}

export const getRedisClient = () => redisClient

export const getCache = async (key) => {
  if (!redisClient || !redisClient.isOpen) return null
  try {
    const data = await redisClient.get(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    logger.error(`Redis Get Error: ${error.message}`)
    return null
  }
}

export const setCache = async (key, value, expirationInSeconds = 3600) => {
  if (!redisClient || !redisClient.isOpen) return
  try {
    await redisClient.setEx(key, expirationInSeconds, JSON.stringify(value))
  } catch (error) {
    logger.error(`Redis Set Error: ${error.message}`)
  }
}
