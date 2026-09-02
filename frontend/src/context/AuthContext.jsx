import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export const DEFAULT_AUTO_USER = {
  _id: 'student_auto_2026',
  name: 'Taruni Babu',
  email: 'tarunibabu2006@gmail.com',
  role: 'student',
  college: 'Kongu Engineering College',
  department: 'Computer Science & Engineering',
  year: 'Final Year (2026 Batch)',
  skills: ['Python', 'Java', 'React', 'Node.js', 'SQL', 'Git', 'AWS', 'Docker', 'Machine Learning', 'Data Structures & Algorithms'],
  points: 1450,
  level: 5,
  streak: 18,
  badges: ['Top Ranker', 'Coding Maestro', 'Board Prep Star', 'AI Pioneer']
}

export const DEFAULT_AUTO_TOKEN = 'campuspilot_auto_active_jwt_2026'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('campuspilot_user')
    if (savedUser) {
      try {
        return JSON.parse(savedUser)
      } catch { }
    }
    // Auto-login active by default
    try {
      localStorage.setItem('campuspilot_user', JSON.stringify(DEFAULT_AUTO_USER))
      localStorage.setItem('campuspilot_token', DEFAULT_AUTO_TOKEN)
    } catch { }
    return DEFAULT_AUTO_USER
  })

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('campuspilot_token')
    if (savedToken) return savedToken
    return DEFAULT_AUTO_TOKEN
  })

  const [loading, setLoading] = useState(false)

  // Auto-login: verify token or ensure default active session
  useEffect(() => {
    const verifyToken = async () => {
      const savedToken = localStorage.getItem('campuspilot_token')
      if (savedToken && savedToken !== DEFAULT_AUTO_TOKEN) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`
          const res = await axios.get('/api/auth/me')
          if (res.data.user) {
            setUser(res.data.user)
            setToken(savedToken)
          }
        } catch (err) {
          // Fallback to default auto-login session instead of logging out
          login(DEFAULT_AUTO_TOKEN, DEFAULT_AUTO_USER)
        }
      } else if (!savedToken) {
        login(DEFAULT_AUTO_TOKEN, DEFAULT_AUTO_USER)
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
