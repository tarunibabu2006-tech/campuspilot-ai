import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export const DEFAULT_AUTO_USER = {
  _id: 'student_auto_2026',
  name: 'Student User',
  email: 'student@campuspilot.ai',
  role: 'student',
  college: 'Engineering College',
  department: 'B.Tech Computer Science Engineering (CSE)',
  year: '4th Year (Final Year)',
  skills: ['Python', 'Java', 'React', 'Node.js', 'SQL', 'Git', 'AWS', 'Docker', 'Data Structures & Algorithms'],
  points: 100,
  xp: 100,
  level: 1,
  streak: 1,
  badges: ['Active Learner']
}

export const DEFAULT_AUTO_TOKEN = 'campuspilot_auto_active_jwt_2026'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('campuspilot_user')
      if (savedUser) {
        return JSON.parse(savedUser)
      }
    } catch { }
    // If no user exists at all, set default
    try {
      localStorage.setItem('campuspilot_user', JSON.stringify(DEFAULT_AUTO_USER))
      localStorage.setItem('campuspilot_token', DEFAULT_AUTO_TOKEN)
    } catch { }
    return DEFAULT_AUTO_USER
  })

  const [token, setToken] = useState(() => {
    return localStorage.getItem('campuspilot_token') || DEFAULT_AUTO_TOKEN
  })

  const [loading, setLoading] = useState(false)

  // Verify token or retain active user session — NEVER overwrite existing user's name/email on refresh!
  useEffect(() => {
    const verifyToken = async () => {
      const savedToken = localStorage.getItem('campuspilot_token')
      const savedUserStr = localStorage.getItem('campuspilot_user')

      if (savedToken && savedToken !== DEFAULT_AUTO_TOKEN) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`
          const res = await axios.get('/api/auth/me')
          if (res.data?.user) {
            setUser(res.data.user)
            localStorage.setItem('campuspilot_user', JSON.stringify(res.data.user))
          }
        } catch (err) {
          // Keep saved user from localStorage if API is offline or deployed on client-only Vercel
          if (savedUserStr) {
            try {
              const parsed = JSON.parse(savedUserStr)
              setUser(parsed)
            } catch { }
          }
        }
      } else if (savedUserStr) {
        try {
          setUser(JSON.parse(savedUserStr))
        } catch { }
      }
      setLoading(false)
    }
    verifyToken()
  }, [])

  // Set auth header whenever token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }, [token])

  const login = (newToken, userData) => {
    setToken(newToken)
    setUser(userData)
    try {
      localStorage.setItem('campuspilot_token', newToken)
      localStorage.setItem('campuspilot_user', JSON.stringify(userData))
      localStorage.setItem('campuspilot_token_time', Date.now().toString())
    } catch { }
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    try {
      localStorage.removeItem('campuspilot_token')
      localStorage.removeItem('campuspilot_user')
      localStorage.removeItem('campuspilot_token_time')
    } catch { }
    delete axios.defaults.headers.common['Authorization']
  }

  const updateUser = (updatedFields) => {
    const updated = { ...user, ...updatedFields }
    setUser(updated)
    try {
      localStorage.setItem('campuspilot_user', JSON.stringify(updated))
    } catch { }
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser, isAuthenticated: !!token, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export default AuthContext
