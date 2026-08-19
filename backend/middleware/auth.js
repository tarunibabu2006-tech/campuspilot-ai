import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from '../models/User.js'

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'campuspilot_super_secret_jwt_key_2026')

    // Admin user - no DB lookup needed
    if (decoded.id === 'admin' || decoded.role === 'admin') {
      req.user = {
        id: 'admin',
        role: 'admin',
        name: 'Admin',
        email: process.env.ADMIN_EMAIL || 'tarunibabu2006@gmail.com'
      }
      return next()
    }

    // Student user - lookup from DB only if connected and valid ObjectId
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(decoded.id)) {
      try {
        const user = await User.findById(decoded.id).select('-__v')
        if (user) {
          req.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department,
            year: user.year
          }
          return next()
        }
      } catch (dbError) {
        // Fallback to token payload
      }
    }

    // Use decoded token data
    req.user = {
      id: decoded.id,
      name: decoded.name || 'Student',
      email: decoded.email,
      role: decoded.role || 'student',
      department: decoded.department || 'Computer Science & Engineering',
      year: decoded.year || '3'
    }

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' })
  }
}

// Role-based authorization
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Role '${req.user.role}' is not authorized for this route` })
    }
    next()
  }
}

// Legacy exports for backward compatibility
export const authMiddleware = protect
export const adminMiddleware = (req, res, next) => {
  protect(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      next()
    } else {
      res.status(403).json({ message: 'Access denied. Admin privileges required.' })
    }
  })
}
