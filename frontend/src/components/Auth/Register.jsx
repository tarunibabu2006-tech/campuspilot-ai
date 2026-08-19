import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { registerUser } from '../../services/api'
import toast from 'react-hot-toast'
import ParticlesBg from '../Background/ParticlesBg'

function Register({ onSwitchToLogin }) {
  const { login } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [department, setDepartment] = useState('Engineering')
  const [year, setYear] = useState('1')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      toast.error('Please enter all fields!')
      return
    }

    setLoading(true)
    try {
      const res = await registerUser({ name, email, password, department, year })
      login(res.data.token, res.data.user)
      toast.success(`Account registered! Welcome, ${res.data.user.name}! 🎓`)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <ParticlesBg />
      <div className="card" style={{ width: '100%', maxWidth: '440px', zIndex: 10, backdropFilter: 'blur(10px)', background: 'rgba(26, 31, 53, 0.85)' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '3rem' }}>🎓</span>
          <h2 className="card-title" style={{ marginTop: '0.5rem' }}>Join CampusPilot AI</h2>
          <p className="card-subtitle">Create your account to unlock AI prep resources</p>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., Priyan Sharma"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g., priyan@college.edu"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Department Stream</label>
              <select className="form-select" value={department} onChange={e => setDepartment(e.target.value)}>
                <option value="Engineering">Engineering</option>
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
                <option value="Diploma">Diploma</option>
                <option value="Medical">Medical</option>
                <option value="Law">Law</option>
                <option value="Design">Design</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Year of Study</label>
              <select className="form-select" value={year} onChange={e => setYear(e.target.value)}>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary btn-full" style={{ marginTop: '0.5rem' }}>
            {loading ? 'Creating Account...' : 'Create Account 🚀'}
          </button>
        </form>

        <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} style={{ background: 'none', border: 'none', color: 'var(--blue)', cursor: 'pointer', padding: 0, fontWeight: 'bold' }}>
            Sign In Here
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
