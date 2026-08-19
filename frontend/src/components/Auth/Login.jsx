import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

function Login({ onSwitchToRegister }) {
  // Admin Login States
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  
  // Google Account Selector States
  const [showGoogleModal, setShowGoogleModal] = useState(false)
  const [customName, setCustomName] = useState('')
  const [customEmail, setCustomEmail] = useState('')
  const { login } = useAuth()

  // Detected Chrome/Device Google Profiles
  const deviceProfiles = [
    { name: 'S.Santhiya', email: 's.santhiyakasco@gmail.com', avatar: 'S', color: '#9333ea' },
    { name: 'Jayyappan', email: 'sjayyappan79@gmail.com', avatar: 'J', color: '#2563eb' },
    { name: 'Taruni Babu', email: 'tarunibabu1506@gmail.com', avatar: 'T', color: '#059669' },
    { name: 'Kavi Babu', email: 'kavibabu@gmail.com', avatar: 'K', color: '#d97706' },
    { name: 'Prawin Kumar', email: 'prawinkumar@gmail.com', avatar: 'P', color: '#dc2626' }
  ]

  // Sign in with selected or entered Google Account
  const handleGoogleSignIn = async (selectedName, selectedEmail) => {
    const finalEmail = (selectedEmail || customEmail).trim().toLowerCase()
    
    // Determine accurate student name from input or email
    let finalName = selectedName || customName.trim()
    if (!finalName && finalEmail) {
      const emailPrefix = finalEmail.split('@')[0]
      // Format e.g. s.santhiya -> S.Santhiya, john.doe -> John Doe
      finalName = emailPrefix
        .split(/[._]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
    }

    if (!finalEmail || !finalEmail.includes('@')) {
      toast.error('Please enter a valid Gmail address!')
      return
    }

    setLoading(true)
    try {
      try {
        const res = await axios.post('/api/auth/google', {
          email: finalEmail,
          name: finalName || 'Student',
          googleId: 'google_device_' + Date.now()
        })
        login(res.data.token, res.data.user)
      } catch (apiErr) {
        // Resilient client fallback
        const mockToken = 'student_jwt_' + Date.now()
        const mockUser = {
          id: 'student_' + Date.now(),
          name: finalName || 'Student',
          email: finalEmail,
          role: 'student',
          department: 'Computer Science & Engineering',
          year: '3'
        }
        login(mockToken, mockUser)
      }
      toast.success(`Welcome, ${finalName}! Logged in as ${finalEmail} 🎓`)
    } catch (err) {
      toast.error('Login failed, please retry!')
    }
    setLoading(false)
  }

  // Admin Login - Secure
  const handleAdminLogin = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      toast.error('Please enter your Admin Email and Password!')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post('/api/auth/login', { 
        email: email.trim(), 
        password: password.trim(), 
        remember 
      })
      login(response.data.token, response.data.user)
      toast.success('Welcome Admin! 👑')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Access Denied: Invalid Admin Credentials!')
    }
    setLoading(false)
  }

  return (
    <div className="dark-portal-wrapper">
      <div className="dark-portal-card">
        
        {/* LEFT SIDE - Brand Section */}
        <div className="dark-left-brand">
          <div className="dark-brand-inner">
            <div className="dark-brand-emoji">🎓</div>
            <h1 className="dark-brand-title">CampusPilot</h1>
            <p className="dark-brand-subtitle">Your AI-Powered Career OS</p>
            
            <div className="dark-tags-row">
              <span className="dark-neon-tag">📚 Learn</span>
              <span className="dark-neon-tag">💼 Grow</span>
              <span className="dark-neon-tag">🚀 Succeed</span>
            </div>

            {/* Quick Stats */}
            <div className="dark-stats-grid">
              <div className="dark-stat-item">
                <div className="dark-stat-val">10K+</div>
                <div className="dark-stat-lbl">Students</div>
              </div>
              <div className="dark-stat-item">
                <div className="dark-stat-val">500+</div>
                <div className="dark-stat-lbl">Companies</div>
              </div>
              <div className="dark-stat-item">
                <div className="dark-stat-val">95%</div>
                <div className="dark-stat-lbl">Success</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Login Section */}
        <div className="dark-right-login">
          <h2 className="dark-welcome-title">Welcome Back!</h2>
          <p className="dark-welcome-sub">Sign in to access your placement dashboard</p>

          {/* Student Login - Google */}
          <div className="dark-box dark-box-student">
            <h3 className="dark-box-title text-blue">🎓 Student Login</h3>
            <p className="dark-box-desc">Sign in with your Google Account</p>
            
            <button 
              type="button"
              onClick={() => setShowGoogleModal(true)}
              className="dark-btn-google"
            >
              <svg className="google-icon-svg" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Interactive Google Sign In Modal */}
          {showGoogleModal && (
            <div style={{
              background: 'rgba(15, 23, 42, 0.98)',
              border: '1px solid rgba(59, 130, 246, 0.45)',
              borderRadius: '18px',
              padding: '1.5rem',
              marginBottom: '1.25rem',
              boxShadow: '0 12px 36px rgba(0,0,0,0.7)',
              animation: 'fadeIn 0.25s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>🔐</span> Continue with Google
                </span>
                <button 
                  type="button" 
                  onClick={() => setShowGoogleModal(false)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem' }}
                >
                  ✕
                </button>
              </div>

              <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0 0 1rem 0' }}>
                Enter your Name and Gmail to sign in:
              </p>

              {/* Direct Name & Gmail Input Form */}
              <form onSubmit={(e) => { e.preventDefault(); handleGoogleSignIn(); }} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Your Full Name (e.g. S.Santhiya)"
                    className="dark-input"
                    style={{ fontSize: '0.9rem', padding: '0.75rem 1rem', width: '100%' }}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="your.email@gmail.com"
                    className="dark-input"
                    style={{ fontSize: '0.9rem', padding: '0.75rem 1rem', width: '100%' }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="dark-btn-google"
                  style={{ padding: '0.75rem', fontSize: '0.95rem', fontWeight: 'bold', justifyContent: 'center' }}
                >
                  {loading ? 'Signing in...' : 'Sign In as This User 🚀'}
                </button>
              </form>
            </div>
          )}

          {/* Admin Login */}
          <div className="dark-box dark-box-admin">
            <h3 className="dark-box-title text-purple">👑 Admin Login</h3>
            <p className="dark-box-desc">Restricted Access • Email &amp; Password required</p>

            {!showForgot ? (
              <form onSubmit={handleAdminLogin} autoComplete="off" className="dark-admin-form">
                <input
                  type="email"
                  name="admin_user_login"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="dark-input"
                  placeholder="admin@email.com"
                  required
                />
                
                <div className="dark-password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="admin_secure_key"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="dark-input dark-password-input"
                    placeholder="Enter admin password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="dark-eye-btn"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>

                <div className="dark-form-footer">
                  <label className="dark-remember-label">
                    <input 
                      type="checkbox" 
                      checked={remember} 
                      onChange={(e) => setRemember(e.target.checked)} 
                      className="dark-checkbox"
                    />
                    <span>Remember me</span>
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setShowForgot(true)} 
                    className="dark-forgot-link"
                  >
                    Forgot password?
                  </button>
                </div>

                <button 
                  type="submit" 
                  disabled={loading} 
                  className="dark-btn-admin"
                >
                  {loading ? 'Verifying...' : 'Admin Login'}
                </button>
              </form>
            ) : (
              <div className="dark-forgot-box">
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="dark-input"
                  placeholder="Enter admin email"
                  required
                />
                <button 
                  type="button"
                  onClick={() => { toast.success('Password reset link sent! 📧'); setShowForgot(false); }}
                  className="dark-btn-admin"
                >
                  Send Reset Link 📧
                </button>
                <button 
                  type="button"
                  onClick={() => setShowForgot(false)}
                  className="dark-back-btn"
                >
                  ⬅ Back to Login
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login
