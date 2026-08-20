import AppError from '../utils/AppError.js'
import logger from '../utils/logger.js'

export const validateRequest = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params
  })

  if (!result.success) {
    const issues = result.error.issues || result.error.errors || []
    if (logger && logger.warn) logger.warn(`Validation Error on ${req.originalUrl}: ${JSON.stringify(issues)}`)
    const errorMessage = issues.map(e => e.message).join(', ') || 'Invalid request payload'
    return next(new AppError(errorMessage, 400))
  }
  
  next()
}
