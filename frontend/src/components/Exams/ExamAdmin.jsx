import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ExamAdmin({ onClose, onExamAdded }) {
  const [activeTab, setActiveTab] = useState('add') // 'add' | 'manage' | 'analytics'
  const [loading, setLoading] = useState(false)
  const [exams, setExams] = useState([])
  const [analytics, setAnalytics] = useState(null)

  // Form State
  const [formData, setFormData] = useState({
    examName: '',
    conductingBody: 'NTA',
    category: 'Engineering',
    stream: 'Science',
    eligibility: '12th Pass',
    examDate: '',
    applicationStart: '',
    applicationEnd: '',
    admitCardDate: '',
    resultDate: '',
    officialWebsite: '',
    applyLink: '',
    notificationUrl: '',
    syllabus: '',
    examPattern: '',
    previousPapers: '',
    vacancies: '',
    notificationTitle: '',
    notificationDescription: '',
    notificationType: 'applicationStart',
    status: 'active',
    sendNotificationsImmediately: true
  })

  useEffect(() => {
    fetchExams()
    fetchAnalytics()
  }, [])

  const fetchExams = async () => {
    try {
      const res = await axios.get('/api/exams?limit=100')
      setExams(res.data.exams || [])
    } catch (err) {
      console.error(err)
    }
  }

  const fetchAnalytics = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const res = await axios.get('/api/admin/exams/analytics', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAnalytics(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAddExam = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Admin authentication required')
      return
    }

    try {
      setLoading(true)
      const payload = {
        ...formData,
        stream: formData.stream.split(',').map(s => s.trim())
      }

      const res = await axios.post('/api/admin/exams', payload, {
        headers: { Authorization: `Bearer ${token}` }
      })

      toast.success(`Exam "${res.data.exam.examName}" created! 🚀`)
      if (res.data.notifications) {
        toast.success(`Dispatched to ${res.data.notifications.inAppCreated} eligible students! 🔔`)
      }

      // Reset form
      setFormData({
        examName: '',
        conductingBody: 'NTA',
        category: 'Engineering',
        stream: 'Science',
        eligibility: '12th Pass',
        examDate: '',
        applicationStart: '',
        applicationEnd: '',
        admitCardDate: '',
        resultDate: '',
        officialWebsite: '',
        applyLink: '',
        notificationUrl: '',
        syllabus: '',
        examPattern: '',
        previousPapers: '',
        vacancies: '',
        notificationTitle: '',
        notificationDescription: '',
        notificationType: 'applicationStart',
        status: 'active',
        sendNotificationsImmediately: true
      })

      fetchExams()
      fetchAnalytics()
      if (onExamAdded) onExamAdded()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add exam')
    } finally {
      setLoading(false)
    }
  }

  const handleSyncFeeds = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      setLoading(true)
      toast.loading('Syncing official exam feeds...', { id: 'scrape' })
      const res = await axios.post('/api/admin/exams/scrape', {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success(`Synced ${res.data.result.total} official exam announcements!`, { id: 'scrape' })
      fetchExams()
      fetchAnalytics()
    } catch (err) {
      toast.error('Failed to sync feeds', { id: 'scrape' })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteExam = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return
    const token = localStorage.getItem('token')

    try {
      await axios.delete(`/api/admin/exams/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Exam deleted')
      setExams(exams.filter(e => e._id !== id))
      fetchAnalytics()
    } catch (err) {
      toast.error('Failed to delete exam')
    }
  }

  const handleBroadcastAlert = async (id, name) => {
    const token = localStorage.getItem('token')
    try {
      toast.loading(`Broadcasting alerts for ${name}...`, { id: 'broadcast' })
      const res = await axios.post(`/api/admin/exams/${id}/notify`, {
        type: 'applicationStart'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success(`Alerts sent to ${res.data.stats.inAppCreated} students!`, { id: 'broadcast' })
      fetchAnalytics()
    } catch (err) {
      toast.error('Failed to broadcast', { id: 'broadcast' })
    }
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.8)',
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
        maxWidth: '850px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '28px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        color: '#f8fafc'
      }}>
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ margin: '0 0 4px 0', fontSize: '22px', fontWeight: '800', color: '#f59e0b' }}>
              👑 Exam Management Control
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
              Create exams, run scrapers, and dispatch personalized student notifications.
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

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '12px' }}>
          {[
            { id: 'add', label: '➕ Add New Exam' },
            { id: 'manage', label: `📋 All Exams (${exams.length})` },
            { id: 'analytics', label: '📊 Delivery Analytics' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? '#2563eb' : 'rgba(30, 41, 59, 0.6)',
                color: activeTab === tab.id ? '#ffffff' : '#94a3b8',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}

          <button
            onClick={handleSyncFeeds}
            disabled={loading}
            style={{
              marginLeft: 'auto',
              background: 'rgba(16, 185, 129, 0.2)',
              color: '#34d399',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            🔄 Sync Feeds (Scraper)
          </button>
        </div>

        {/* ── TAB 1: ADD NEW EXAM ── */}
        {activeTab === 'add' && (
          <form onSubmit={handleAddExam} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Exam Name *</label>
                <input
                  type="text"
                  name="examName"
                  required
                  value={formData.examName}
                  onChange={handleInputChange}
                  placeholder="e.g. JEE Main 2026, UPSC Civil Services 2026..."
                  style={{ width: '100%', padding: '9px 12px', background: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Conducting Body *</label>
                <select
                  name="conductingBody"
                  value={formData.conductingBody}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '9px 12px', background: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff', fontSize: '13px' }}
                >
                  <option value="NTA">NTA (National Testing Agency)</option>
                  <option value="UPSC">UPSC (Union Public Service)</option>
                  <option value="SSC">SSC (Staff Selection)</option>
                  <option value="IBPS">IBPS (Banking)</option>
                  <option value="SBI">SBI (State Bank)</option>
                  <option value="IIT">IITs (GATE / JAM)</option>
                  <option value="RRB">RRB (Railways)</option>
                  <option value="State PSC">State PSC (TNPSC/UPPSC)</option>
                  <option value="ICAR">ICAR</option>
                  <option value="Other">Other Authority</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '9px 12px', background: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff', fontSize: '13px' }}
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Medical">Medical</option>
                  <option value="Government">Government</option>
                  <option value="Banking">Banking</option>
                  <option value="Civil Services">Civil Services</option>
                  <option value="Defence">Defence</option>
                  <option value="Teaching">Teaching</option>
                  <option value="Higher Education">Higher Education</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Eligibility *</label>
                <input
                  type="text"
                  name="eligibility"
                  required
                  value={formData.eligibility}
                  onChange={handleInputChange}
                  placeholder="e.g. 12th Pass, Graduate, B.Tech"
                  style={{ width: '100%', padding: '9px 12px', background: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Target Stream(s)</label>
                <input
                  type="text"
                  name="stream"
                  value={formData.stream}
                  onChange={handleInputChange}
                  placeholder="Science, Engineering (comma separated)"
                  style={{ width: '100%', padding: '9px 12px', background: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Dates Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Application Start *</label>
                <input
                  type="date"
                  name="applicationStart"
                  required
                  value={formData.applicationStart}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '9px 12px', background: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Application End (Deadline) *</label>
                <input
                  type="date"
                  name="applicationEnd"
                  required
                  value={formData.applicationEnd}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '9px 12px', background: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Exam Date *</label>
                <input
                  type="date"
                  name="examDate"
                  required
                  value={formData.examDate}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '9px 12px', background: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Links */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Official Portal URL *</label>
                <input
                  type="url"
                  name="officialWebsite"
                  required
                  value={formData.officialWebsite}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  style={{ width: '100%', padding: '9px 12px', background: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Apply Direct Link *</label>
                <input
                  type="url"
                  name="applyLink"
                  required
                  value={formData.applyLink}
                  onChange={handleInputChange}
                  placeholder="https://.../apply"
                  style={{ width: '100%', padding: '9px 12px', background: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Syllabus & PYQ */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Syllabus Link (PDF/URL)</label>
                <input
                  type="url"
                  name="syllabus"
                  value={formData.syllabus}
                  onChange={handleInputChange}
                  placeholder="https://.../syllabus.pdf"
                  style={{ width: '100%', padding: '9px 12px', background: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Previous Papers Link (PYQs)</label>
                <input
                  type="url"
                  name="previousPapers"
                  value={formData.previousPapers}
                  onChange={handleInputChange}
                  placeholder="https://.../pyqs"
                  style={{ width: '100%', padding: '9px 12px', background: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Notification Dispatch Settings */}
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '14px', borderRadius: '10px', border: '1px solid #334155' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#38bdf8' }}>
                <input
                  type="checkbox"
                  name="sendNotificationsImmediately"
                  checked={formData.sendNotificationsImmediately}
                  onChange={handleInputChange}
                />
                <span>⚡ Automatically notify eligible students upon creation</span>
              </label>
              <p style={{ margin: '6px 0 0 24px', fontSize: '12px', color: '#94a3b8' }}>
                The Notification Engine will filter students matching class, stream, and target exams, and dispatch In-App alerts & responsive HTML emails.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                border: 'none',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)',
                marginTop: '8px'
              }}
            >
              {loading ? 'Creating & Notifying...' : 'Publish Exam & Broadcast Alerts 📢'}
            </button>
          </form>
        )}

        {/* ── TAB 2: MANAGE EXAMS TABLE ── */}
        {activeTab === 'manage' && (
          <div style={{ overflowX: 'auto' }}>
            <table width="100%" style={{ borderCollapse: 'collapse', fontSize: '13px', color: '#cbd5e1' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #334155', textAlign: 'left', color: '#94a3b8' }}>
                  <th style={{ padding: '10px 8px' }}>Exam</th>
                  <th style={{ padding: '10px 8px' }}>Body</th>
                  <th style={{ padding: '10px 8px' }}>Category</th>
                  <th style={{ padding: '10px 8px' }}>Exam Date</th>
                  <th style={{ padding: '10px 8px' }}>Status</th>
                  <th style={{ padding: '10px 8px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {exams.map(exam => (
                  <tr key={exam._id} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: '600', color: '#ffffff' }}>{exam.examName}</td>
                    <td style={{ padding: '12px 8px' }}>{exam.conductingBody}</td>
                    <td style={{ padding: '12px 8px' }}>{exam.category}</td>
                    <td style={{ padding: '12px 8px', color: '#f59e0b' }}>{exam.examDate}</td>
                    <td style={{ padding: '12px 8px' }}>
                      <span style={{
                        background: exam.status === 'active' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                        color: exam.status === 'active' ? '#34d399' : '#fbbf24',
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}>
                        {exam.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleBroadcastAlert(exam._id, exam.examName)}
                        title="Broadcast Notification"
                        style={{
                          background: 'rgba(56, 189, 248, 0.15)',
                          color: '#38bdf8',
                          border: 'none',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          marginRight: '6px',
                          fontSize: '12px'
                        }}
                      >
                        📢 Notify
                      </button>
                      <button
                        onClick={() => handleDeleteExam(exam._id, exam.examName)}
                        title="Delete Exam"
                        style={{
                          background: 'rgba(239, 68, 68, 0.15)',
                          color: '#f87171',
                          border: 'none',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── TAB 3: ANALYTICS ── */}
        {activeTab === 'analytics' && (
          <div>
            {analytics ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                  <div style={{ background: '#1e293b', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#38bdf8' }}>{analytics.totalNotifications}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>Total Dispatched</div>
                  </div>
                  <div style={{ background: '#1e293b', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#f59e0b' }}>{analytics.unreadCount}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>Unread In-App</div>
                  </div>
                  <div style={{ background: '#1e293b', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#10b981' }}>{analytics.readCount}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>Read / Viewed</div>
                  </div>
                  <div style={{ background: '#1e293b', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#a855f7' }}>{analytics.openRate}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>Student Read Rate</div>
                  </div>
                </div>

                {/* Recent Notifications Table */}
                <div>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#f8fafc' }}>Recent Delivered Notifications</h4>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {analytics.recentNotifications?.map(n => (
                      <div key={n._id} style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '10px 14px', borderRadius: '8px', marginBottom: '8px', fontSize: '12px', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontWeight: '600', color: '#ffffff' }}>{n.title}</div>
                          <div style={{ color: '#94a3b8' }}>User: {n.userId} • Type: {n.type}</div>
                        </div>
                        <div style={{ textAlign: 'right', color: n.read ? '#10b981' : '#f59e0b' }}>
                          {n.read ? '✓ Read' : '● Unread'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Loading analytics...</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
