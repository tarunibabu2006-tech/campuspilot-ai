import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

import ExamCard from './ExamCard'
import ExamFilters from './ExamFilters'
import ExamNotification from './ExamNotification'
import NotificationSettings from './NotificationSettings'
import ExamAdmin from './ExamAdmin'

export default function ExamHub() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin' || user?.email === 'tarunibabu2006@gmail.com'

  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  // Filters State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStream, setSelectedStream] = useState('All')
  const [selectedEligibility, setSelectedEligibility] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')

  // Modals State
  const [selectedExam, setSelectedExam] = useState(null)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'target'

  useEffect(() => {
    fetchExams()
    fetchNotifications()
  }, [])

  const fetchExams = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/exams?limit=100')
      setExams(res.data.exams || [])
    } catch (err) {
      console.error('Error fetching exams:', err)
      toast.error('Failed to load exams')
    } finally {
      setLoading(false)
    }
  }

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const res = await axios.get('/api/notifications?limit=20', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotifications(res.data.notifications || [])
      setUnreadCount(res.data.unread || 0)
    } catch (err) {
      console.warn('Notifications fetch error:', err.message)
    }
  }

  const handleMarkNotificationRead = async (id) => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      await axios.put(`/api/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n))
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (err) {
      console.error(err)
    }
  }

  const handleMarkAllRead = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      await axios.put('/api/notifications/mark-all-read', {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      setUnreadCount(0)
      toast.success('All notifications marked as read')
    } catch (err) {
      toast.error('Failed to mark all as read')
    }
  }

  // Filtered Exams
  const filteredExams = useMemo(() => {
    const userId = (user?.id || user?._id || '').toString()

    return exams.filter(e => {
      // Tab filter
      if (activeTab === 'target' && !e.bookmarkedBy?.includes(userId)) {
        return false
      }

      // Category filter
      if (selectedCategory !== 'All' && e.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false
      }

      // Stream filter
      if (selectedStream !== 'All') {
        const streams = (e.stream || []).map(s => s.toLowerCase())
        if (!streams.includes('any') && !streams.includes(selectedStream.toLowerCase())) {
          return false
        }
      }

      // Eligibility filter
      if (selectedEligibility !== 'All' && !e.eligibility?.toLowerCase().includes(selectedEligibility.toLowerCase())) {
        return false
      }

      // Status filter
      if (selectedStatus !== 'All' && e.status !== selectedStatus) {
        return false
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchName = e.examName?.toLowerCase().includes(q)
        const matchBody = e.conductingBody?.toLowerCase().includes(q)
        const matchCat = e.category?.toLowerCase().includes(q)
        if (!matchName && !matchBody && !matchCat) return false
      }

      return true
    })
  }, [exams, activeTab, selectedCategory, selectedStream, selectedEligibility, selectedStatus, searchQuery, user])

  const categories = useMemo(() => {
    const set = new Set(exams.map(e => e.category).filter(Boolean))
    return ['All', ...Array.from(set)]
  }, [exams])

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', color: '#f8fafc' }}>
      
      {/* ── 1. HERO HEADER BAR ────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(51, 65, 85, 0.6)',
        borderRadius: '24px',
        padding: '28px 32px',
        marginBottom: '28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5)'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>
            <span>🇮🇳</span> Central & State Exam Intelligence
          </div>
          <h1 style={{ margin: '0 0 6px 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.5px' }}>
            Exam Hub & Official Notifications 📢
          </h1>
          <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>
            Automated alerts from NTA, UPSC, SSC, IBPS, IIT GATE, and State PSCs tailored to your profile.
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowSettingsModal(true)}
            style={{
              background: 'rgba(30, 41, 59, 0.9)',
              color: '#38bdf8',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              padding: '10px 18px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            ⚙️ Notification Preferences
          </button>

          {isAdmin && (
            <button
              onClick={() => setShowAdminModal(true)}
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: '#ffffff',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(245, 158, 11, 0.3)'
              }}
            >
              👑 Exam Management
            </button>
          )}
        </div>
      </div>

      {/* ── 2. PERSONALIZED EXAM UPDATES SECTION ──────────────────── */}
      {notifications.length > 0 && (
        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(51, 65, 85, 0.6)',
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '32px',
          boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#ffffff' }}>
                🔔 Your Personalized Exam Updates
              </h2>
              {unreadCount > 0 && (
                <span style={{
                  background: '#ef4444',
                  color: '#ffffff',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '700'
                }}>
                  {unreadCount} New
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#38bdf8',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Mark all as read ✓
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '12px' }}>
            {notifications.slice(0, 4).map(n => (
              <ExamNotification
                key={n._id}
                notification={n}
                onMarkRead={handleMarkNotificationRead}
                onActionClick={(examId) => {
                  const target = exams.find(e => e._id === examId)
                  if (target) setSelectedExam(target)
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── 3. ALL UPCOMING EXAMS & FILTERS ────────────────────────── */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: '800' }}>
            📊 All Upcoming Official Exams
          </h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
            Showing {filteredExams.length} examinations across India
          </p>
        </div>

        {/* View Tabs */}
        <div style={{ display: 'flex', background: 'rgba(30, 41, 59, 0.6)', padding: '4px', borderRadius: '10px', border: '1px solid rgba(51, 65, 85, 0.4)' }}>
          <button
            onClick={() => setActiveTab('all')}
            style={{
              background: activeTab === 'all' ? '#2563eb' : 'transparent',
              color: activeTab === 'all' ? '#ffffff' : '#94a3b8',
              border: 'none',
              padding: '6px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            All Exams ({exams.length})
          </button>
          <button
            onClick={() => setActiveTab('target')}
            style={{
              background: activeTab === 'target' ? '#2563eb' : 'transparent',
              color: activeTab === 'target' ? '#ffffff' : '#94a3b8',
              border: 'none',
              padding: '6px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            🎯 My Target Exams
          </button>
        </div>
      </div>

      {/* Filters Control Bar */}
      <ExamFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStream={selectedStream}
        setSelectedStream={setSelectedStream}
        selectedEligibility={selectedEligibility}
        setSelectedEligibility={setSelectedEligibility}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        categories={categories}
      />

      {/* ── 4. EXAMS GRID ─────────────────────────────────────────── */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔄</div>
          <div>Loading official examinations...</div>
        </div>
      ) : filteredExams.length === 0 ? (
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px dashed #334155',
          borderRadius: '16px',
          padding: '60px 20px',
          textAlign: 'center',
          color: '#94a3b8'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>📋</div>
          <h3 style={{ margin: '0 0 6px 0', color: '#ffffff' }}>No Exams Found</h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px' }}>Try resetting your category or stream filters to view more examinations.</p>
          <button
            onClick={() => {
              setSelectedCategory('All')
              setSelectedStream('All')
              setSelectedEligibility('All')
              setSelectedStatus('All')
              setSearchQuery('')
            }}
            style={{
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '20px'
        }}>
          {filteredExams.map(exam => (
            <ExamCard
              key={exam._id}
              exam={exam}
              isBookmarked={exam.bookmarkedBy?.includes((user?.id || user?._id || '').toString())}
              onBookmarkToggle={(id, isMarked) => {
                const userId = (user?.id || user?._id || '').toString()
                setExams(prev => prev.map(e => {
                  if (e._id === id) {
                    const list = e.bookmarkedBy || []
                    return {
                      ...e,
                      bookmarkedBy: isMarked ? [...list, userId] : list.filter(u => u !== userId)
                    }
                  }
                  return e
                }))
              }}
              onSelectExam={(e) => setSelectedExam(e)}
            />
          ))}
        </div>
      )}

      {/* ── 5. EXAM DETAIL MODAL ───────────────────────────────────── */}
      <AnimatePresence>
        {selectedExam && (
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
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '20px',
                width: '100%',
                maxWidth: '700px',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '28px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ background: 'rgba(37, 99, 235, 0.2)', color: '#60a5fa', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '700' }}>
                      {selectedExam.conductingBody}
                    </span>
                    <span style={{ background: 'rgba(51, 65, 85, 0.6)', color: '#94a3b8', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>
                      {selectedExam.category}
                    </span>
                  </div>
                  <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: '#ffffff' }}>
                    {selectedExam.examName}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedExam(null)}
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

              {/* Description */}
              <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6', margin: '0 0 20px 0' }}>
                {selectedExam.notificationDescription || 'Official examination announcement.'}
              </p>

              {/* Details Grid */}
              <div style={{ background: '#1e293b', padding: '16px 20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #334155' }}>
                <table width="100%" style={{ fontSize: '13px', color: '#cbd5e1', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }}>
                      <td style={{ padding: '8px 0', color: '#94a3b8', width: '35%' }}><strong>Eligibility:</strong></td>
                      <td style={{ padding: '8px 0', color: '#ffffff', fontWeight: '600' }}>{selectedExam.eligibility}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }}>
                      <td style={{ padding: '8px 0', color: '#94a3b8' }}><strong>Eligible Stream:</strong></td>
                      <td style={{ padding: '8px 0', color: '#38bdf8' }}>{(selectedExam.stream || []).join(', ') || 'Any'}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }}>
                      <td style={{ padding: '8px 0', color: '#94a3b8' }}><strong>Application Start:</strong></td>
                      <td style={{ padding: '8px 0' }}>{selectedExam.applicationStart}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }}>
                      <td style={{ padding: '8px 0', color: '#94a3b8' }}><strong>Application End (Deadline):</strong></td>
                      <td style={{ padding: '8px 0', color: '#ef4444', fontWeight: '700' }}>{selectedExam.applicationEnd}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }}>
                      <td style={{ padding: '8px 0', color: '#94a3b8' }}><strong>Exam Date:</strong></td>
                      <td style={{ padding: '8px 0', color: '#f59e0b', fontWeight: '700' }}>{selectedExam.examDate}</td>
                    </tr>
                    {selectedExam.admitCardDate && (
                      <tr style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }}>
                        <td style={{ padding: '8px 0', color: '#94a3b8' }}><strong>Admit Card Release:</strong></td>
                        <td style={{ padding: '8px 0' }}>{selectedExam.admitCardDate}</td>
                      </tr>
                    )}
                    {selectedExam.vacancies && (
                      <tr>
                        <td style={{ padding: '8px 0', color: '#94a3b8' }}><strong>Vacancies / Seats:</strong></td>
                        <td style={{ padding: '8px 0', color: '#10b981', fontWeight: '600' }}>{selectedExam.vacancies}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Exam Pattern & Resources */}
              {selectedExam.examPattern && (
                <div style={{ marginBottom: '16px', background: 'rgba(30, 41, 59, 0.5)', padding: '12px 16px', borderRadius: '8px', fontSize: '13px' }}>
                  <strong style={{ color: '#38bdf8' }}>Exam Pattern: </strong>
                  <span style={{ color: '#cbd5e1' }}>{selectedExam.examPattern}</span>
                </div>
              )}

              {/* Official Links */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {selectedExam.syllabus && (
                  <a
                    href={selectedExam.syllabus}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'rgba(56, 189, 248, 0.15)',
                      color: '#38bdf8',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}
                  >
                    📥 Download Syllabus
                  </a>
                )}

                {selectedExam.previousPapers && (
                  <a
                    href={selectedExam.previousPapers}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'rgba(168, 85, 247, 0.15)',
                      color: '#c084fc',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}
                  >
                    📝 Previous Year Papers (PYQ)
                  </a>
                )}

                {selectedExam.officialWebsite && (
                  <a
                    href={selectedExam.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'rgba(51, 65, 85, 0.5)',
                      color: '#94a3b8',
                      border: '1px solid rgba(71, 85, 105, 0.4)',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}
                  >
                    🌐 Official Portal
                  </a>
                )}
              </div>

              {/* Apply CTA */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  onClick={() => setSelectedExam(null)}
                  style={{
                    background: 'rgba(30, 41, 59, 0.8)',
                    border: '1px solid #475569',
                    color: '#cbd5e1',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  Close
                </button>
                <a
                  href={selectedExam.applyLink || selectedExam.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                    color: '#ffffff',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)'
                  }}
                >
                  Apply on Official Website ↗
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 6. SETTINGS MODAL ──────────────────────────────────────── */}
      <NotificationSettings
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        onSaved={() => {
          fetchNotifications()
          fetchExams()
        }}
      />

      {/* ── 7. ADMIN MODAL ─────────────────────────────────────────── */}
      {showAdminModal && (
        <ExamAdmin
          onClose={() => setShowAdminModal(false)}
          onExamAdded={() => {
            fetchExams()
            fetchNotifications()
          }}
        />
      )}

    </div>
  )
}
