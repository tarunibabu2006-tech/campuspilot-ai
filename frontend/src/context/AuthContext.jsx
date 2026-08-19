import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('campuspilot_user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const [token, setToken] = useState(() => {
    return localStorage.getItem('campuspilot_token') || null
  })

  const [loading, setLoading] = useState(true)

  // Auto-login: verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      const savedToken = localStorage.getItem('campuspilot_token')
      if (savedToken) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`
          const res = await axios.get('/api/auth/me')
          if (res.data.user) {
            setUser(res.data.user)
            setToken(savedToken)
          }
        } catch (err) {
          // Token expired or invalid
          logout()
        }
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
    localStorage.setItem('campuspilot_token', newToken)
    localStorage.setItem('campuspilot_user', JSON.stringify(userData))
    localStorage.setItem('campuspilot_token_time', Date.now().toString())
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('campuspilot_token')
    localStorage.removeItem('campuspilot_user')
    localStorage.removeItem('campuspilot_token_time')
    delete axios.defaults.headers.common['Authorization']
  }

  const updateUser = (updatedFields) => {
    const updated = { ...user, ...updatedFields }
    setUser(updated)
    localStorage.setItem('campuspilot_user', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser, isAuthenticated: !!token, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export default AuthContext
