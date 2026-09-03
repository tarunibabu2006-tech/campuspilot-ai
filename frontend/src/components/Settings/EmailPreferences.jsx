import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

export default function EmailPreferences() {
  const { user, updateUser } = useAuth()

  const [instantConfirm, setInstantConfirm] = useState(true)
  const [dailyDigest, setDailyDigest] = useState(true)
  const [interviewAlerts, setInterviewAlerts] = useState(true)
  const [scanFrequency, setScanFrequency] = useState('5m')

  const handleSave = () => {
    updateUser({ emailNotificationsEnabled: instantConfirm })
    toast.success('⚙️ Email preferences updated successfully!')
  }

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.95)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '1.25rem',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      color: 'white'
    }}>
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>📧</span> Email Verification & Notification Preferences
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0.2rem 0 0' }}>
          Manage your automated confirmation dispatch, Gmail scan interval, and alert preferences.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.88rem' }}>
        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '0.85rem 1rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <div style={{ fontWeight: '800' }}>Instant Company Confirmation Email Dispatch</div>
            <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Receive direct HTML emails on behalf of company HR personas when applying.</div>
          </div>
          <input
            type="checkbox"
            checked={instantConfirm}
            onChange={e => setInstantConfirm(e.target.checked)}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
        </label>

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '0.85rem 1rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <div style={{ fontWeight: '800' }}>Interview & Assessment Alerts</div>
            <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Receive instant notifications for shortlisted status and interview schedules.</div>
          </div>
          <input
            type="checkbox"
            checked={interviewAlerts}
            onChange={e => setInterviewAlerts(e.target.checked)}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
        </label>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem 1rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: '800' }}>Automated Verification Scan Interval</div>
            <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>How often platform monitors Gmail for company confirmation emails.</div>
          </div>
          <select
            value={scanFrequency}
            onChange={e => setScanFrequency(e.target.value)}
            style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '0.5rem', fontSize: '0.82rem', fontWeight: '700' }}
          >
            <option value="5m">Every 5 Minutes (Recommended)</option>
            <option value="15m">Every 15 Minutes</option>
            <option value="1h">Hourly Digest</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSave}
        style={{
          background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
          color: 'white',
          border: 'none',
          padding: '0.75rem',
          borderRadius: '0.75rem',
          fontWeight: '800',
          fontSize: '0.88rem',
          cursor: 'pointer',
          alignSelf: 'flex-start'
        }}
      >
        Save Notification Settings
      </button>
    </div>
  )
}
