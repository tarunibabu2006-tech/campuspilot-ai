import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function NotificationSettings({ isOpen, onClose, onSaved }) {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const [studentClass, setStudentClass] = useState('UG')
  const [stream, setStream] = useState('Engineering')
  const [targetExamsInput, setTargetExamsInput] = useState('')
  const [targetExams, setTargetExams] = useState([])

  const [emailAlerts, setEmailAlerts] = useState(true)
  const [inAppAlerts, setInAppAlerts] = useState(true)
  const [frequency, setFrequency] = useState('instant')

  const [types, setTypes] = useState({
    applicationStart: true,
    applicationEnd: true,
    admitCard: true,
    examDate: true,
    result: true,
    syllabusUpdate: true,
    patternChange: true
  })

  const [categories, setCategories] = useState([
    'Engineering',
    'Government',
    'Banking',
    'Defence',
    'Medical',
    'Civil Services'
  ])

  useEffect(() => {
    if (!isOpen) return
    fetchPreferences()
  }, [isOpen])

  const fetchPreferences = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      setLoading(true)
      const res = await axios.get('/api/notifications/preferences', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data) {
        setStudentClass(res.data.class || 'UG')
        setStream(res.data.stream || 'Engineering')
        setTargetExams(res.data.targetExams || [])
        if (res.data.notificationPreferences) {
          const np = res.data.notificationPreferences
          setEmailAlerts(np.email !== false)
          setInAppAlerts(np.inApp !== false)
          setFrequency(np.frequency || 'instant')
          if (np.types) setTypes(prev => ({ ...prev, ...np.types }))
          if (np.categories?.length > 0) setCategories(np.categories)
        }
      }
    } catch (err) {
      console.warn('Could not load preferences:', err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTargetExam = () => {
    const trimmed = targetExamsInput.trim()
    if (!trimmed) return
    if (!targetExams.includes(trimmed)) {
      setTargetExams([...targetExams, trimmed])
    }
    setTargetExamsInput('')
  }

  const handleRemoveTargetExam = (name) => {
    setTargetExams(targetExams.filter(t => t !== name))
  }

  const toggleCategory = (cat) => {
    if (categories.includes(cat)) {
      setCategories(categories.filter(c => c !== cat))
    } else {
      setCategories([...categories, cat])
    }
  }

  const handleSave = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Please login to save preferences')
      return
    }

    try {
      setSaving(true)
      await axios.post('/api/notifications/preferences', {
        class: studentClass,
        stream,
        targetExams,
        notificationPreferences: {
          email: emailAlerts,
          inApp: inAppAlerts,
          frequency,
          types,
          categories
        }
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      toast.success('Notification preferences saved! 🎯')
      if (onSaved) onSaved()
      onClose()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save preferences')
    } finally {
      setSaving(false)
    }
  }

  if (!isOpen) return null

  const allAvailableCategories = [
    'Engineering',
    'Medical',
    'Government',
    'Banking',
    'Defence',
    'Civil Services',
    'Teaching',
    'Higher Education'
  ]

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: '#0f172a',
        border: '1px solid #334155',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '620px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '28px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        color: '#f8fafc'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: '800', color: '#38bdf8' }}>
              ⚙️ Exam Notification Preferences
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
              Tailor exam alerts to your stream, eligibility, and target career goals.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(51, 65, 85, 0.4)',
              border: 'none',
              color: '#94a3b8',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Loading preferences...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* 1. Profile Eligibility Details */}
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(51, 65, 85, 0.6)' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#f8fafc', marginBottom: '12px' }}>
                🎓 Academic Profile (Eligibility Matching)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Current Level / Class</label>
                  <select
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      background: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  >
                    <option value="10th">10th Standard / Matric</option>
                    <option value="12th">12th Standard / HSC</option>
                    <option value="UG">UG (B.E, B.Tech, B.Sc, B.Com)</option>
                    <option value="Graduate">Graduate (Any Degree)</option>
                    <option value="PG">Post Graduate (Master Degree)</option>
                    <option value="Diploma">Diploma Holder</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Discipline / Stream</label>
                  <select
                    value={stream}
                    onChange={(e) => setStream(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      background: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  >
                    <option value="Engineering">Engineering / Tech</option>
                    <option value="Science">Pure Science / Research</option>
                    <option value="Medical">Medical / Life Sciences</option>
                    <option value="Commerce">Commerce / Finance</option>
                    <option value="Arts">Arts / Humanities</option>
                    <option value="General">General / Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Target Exams */}
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(51, 65, 85, 0.6)' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#f8fafc', marginBottom: '8px' }}>
                🎯 Target Exams (Always Prioritized)
              </div>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 10px 0' }}>
                Add exams you are specifically aiming for (e.g., JEE Main, UPSC CSE, GATE, SSC CGL).
              </p>
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <input
                  type="text"
                  value={targetExamsInput}
                  onChange={(e) => setTargetExamsInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTargetExam()}
                  placeholder="e.g. UPSC CSE, GATE 2026..."
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddTargetExam}
                  style={{
                    background: '#2563eb',
                    border: 'none',
                    color: '#ffffff',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  + Add
                </button>
              </div>

              {/* Tag Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {targetExams.map(exam => (
                  <span
                    key={exam}
                    style={{
                      background: 'rgba(56, 189, 248, 0.15)',
                      color: '#38bdf8',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      padding: '4px 10px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: '600',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    🎯 {exam}
                    <button
                      onClick={() => handleRemoveTargetExam(exam)}
                      style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', padding: 0 }}
                    >
                      ×
                    </button>
                  </span>
                ))}
                {targetExams.length === 0 && (
                  <span style={{ fontSize: '12px', color: '#64748b' }}>No target exams added yet.</span>
                )}
              </div>
            </div>

            {/* 3. Notification Channels & Types */}
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(51, 65, 85, 0.6)' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#f8fafc', marginBottom: '12px' }}>
                🔔 Notification Channels & Triggers
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                  />
                  <span>📧 Email Notifications</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  <input
                    type="checkbox"
                    checked={inAppAlerts}
                    onChange={(e) => setInAppAlerts(e.target.checked)}
                  />
                  <span>📱 In-App Alert Bell</span>
                </label>
              </div>

              {/* Alert Triggers Checklist */}
              <div style={{ borderTop: '1px solid #334155', paddingTop: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', color: '#cbd5e1' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={types.applicationStart}
                    onChange={(e) => setTypes({ ...types, applicationStart: e.target.checked })}
                  />
                  <span>Application Start Alerts</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={types.applicationEnd}
                    onChange={(e) => setTypes({ ...types, applicationEnd: e.target.checked })}
                  />
                  <span>Last Date Reminders</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={types.admitCard}
                    onChange={(e) => setTypes({ ...types, admitCard: e.target.checked })}
                  />
                  <span>Admit Card Releases</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={types.examDate}
                    onChange={(e) => setTypes({ ...types, examDate: e.target.checked })}
                  />
                  <span>Exam Date Reminders</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={types.result}
                    onChange={(e) => setTypes({ ...types, result: e.target.checked })}
                  />
                  <span>Result Announcements</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={types.syllabusUpdate}
                    onChange={(e) => setTypes({ ...types, syllabusUpdate: e.target.checked })}
                  />
                  <span>Syllabus & Pattern Updates</span>
                </label>
              </div>
            </div>

            {/* 4. Exam Categories to Track */}
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(51, 65, 85, 0.6)' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#f8fafc', marginBottom: '8px' }}>
                📋 Categories to Track
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {allAvailableCategories.map(cat => {
                  const isTracked = categories.includes(cat)
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      style={{
                        background: isTracked ? 'rgba(37, 99, 235, 0.2)' : 'rgba(30, 41, 59, 0.6)',
                        color: isTracked ? '#60a5fa' : '#64748b',
                        border: `1px solid ${isTracked ? '#2563eb' : 'rgba(71, 85, 105, 0.4)'}`,
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: isTracked ? '600' : '400',
                        cursor: 'pointer'
                      }}
                    >
                      {isTracked ? '✓ ' : '+ '} {cat}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 5. Frequency */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>Delivery Frequency:</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['instant', 'daily', 'weekly'].map(freq => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setFrequency(freq)}
                    style={{
                      background: frequency === freq ? '#2563eb' : 'rgba(30, 41, 59, 0.6)',
                      color: frequency === freq ? '#ffffff' : '#94a3b8',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: frequency === freq ? '600' : '400',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>

            {/* Save & Cancel Footer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  background: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid #475569',
                  color: '#94a3b8',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                style={{
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '10px 24px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)'
                }}
              >
                {saving ? 'Saving...' : 'Save Preferences 💾'}
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
