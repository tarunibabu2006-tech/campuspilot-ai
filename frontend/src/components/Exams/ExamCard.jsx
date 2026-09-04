import React, { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ExamCard({ exam, onBookmarkToggle, isBookmarked = false, onSelectExam }) {
  const [bookmarked, setBookmarked] = useState(isBookmarked)
  const [loadingBookmark, setLoadingBookmark] = useState(false)

  // Calculate days remaining
  const getDaysLeft = (dateString) => {
    if (!dateString) return null
    const diff = new Date(dateString) - new Date()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  const appEndDays = getDaysLeft(exam.applicationEnd)
  const examDays = getDaysLeft(exam.examDate)

  const handleBookmark = async (e) => {
    e.stopPropagation()
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Please login to bookmark target exams')
      return
    }

    try {
      setLoadingBookmark(true)
      const res = await axios.post(`/api/exams/${exam._id}/bookmark`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setBookmarked(res.data.bookmarked)
      if (onBookmarkToggle) onBookmarkToggle(exam._id, res.data.bookmarked)
      toast.success(res.data.bookmarked ? `Targeted ${exam.examName}! 🎯` : 'Removed from target exams')
    } catch (err) {
      toast.error('Failed to update bookmark')
    } finally {
      setLoadingBookmark(false)
    }
  }

  // Badges by conducting body
  const getBodyBadgeStyle = (body) => {
    switch (body?.toUpperCase()) {
      case 'NTA':
        return { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)' }
      case 'UPSC':
        return { bg: 'rgba(239, 68, 68, 0.15)', text: '#f87171', border: 'rgba(239, 68, 68, 0.3)' }
      case 'SSC':
        return { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)' }
      case 'IBPS':
      case 'SBI':
        return { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', border: 'rgba(16, 185, 129, 0.3)' }
      case 'IIT':
        return { bg: 'rgba(168, 85, 247, 0.15)', text: '#c084fc', border: 'rgba(168, 85, 247, 0.3)' }
      default:
        return { bg: 'rgba(148, 163, 184, 0.15)', text: '#cbd5e1', border: 'rgba(148, 163, 184, 0.3)' }
    }
  }

  const badgeStyle = getBodyBadgeStyle(exam.conductingBody)

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => onSelectExam && onSelectExam(exam)}
      style={{
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(51, 65, 85, 0.6)',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        cursor: 'pointer',
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        transition: 'border-color 0.2s ease'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.5)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(51, 65, 85, 0.6)')}
    >
      <div>
        {/* Top Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{
              background: badgeStyle.bg,
              color: badgeStyle.text,
              border: `1px solid ${badgeStyle.border}`,
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.5px'
            }}>
              {exam.conductingBody}
            </span>
            <span style={{
              background: 'rgba(30, 41, 59, 0.8)',
              color: '#94a3b8',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '600'
            }}>
              {exam.category}
            </span>
          </div>

          {/* Target Bookmark Button */}
          <button
            onClick={handleBookmark}
            disabled={loadingBookmark}
            title={bookmarked ? 'Remove Target Exam' : 'Set as Target Exam'}
            style={{
              background: bookmarked ? 'rgba(234, 179, 8, 0.2)' : 'rgba(30, 41, 59, 0.6)',
              border: `1px solid ${bookmarked ? '#eab308' : 'rgba(71, 85, 105, 0.4)'}`,
              color: bookmarked ? '#eab308' : '#94a3b8',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            {bookmarked ? '🎯' : '☆'}
          </button>
        </div>

        {/* Exam Title */}
        <h3 style={{
          fontSize: '17px',
          fontWeight: '700',
          color: '#ffffff',
          margin: '0 0 8px 0',
          lineHeight: '1.4'
        }}>
          {exam.examName}
        </h3>

        {/* Short Description */}
        <p style={{
          fontSize: '13px',
          color: '#94a3b8',
          margin: '0 0 16px 0',
          lineHeight: '1.5',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {exam.notificationDescription || 'Official national level recruitment & entrance examination.'}
        </p>

        {/* Eligibility & Stream Badges */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.5)',
          padding: '10px 12px',
          borderRadius: '10px',
          fontSize: '12px',
          color: '#cbd5e1',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ color: '#64748b' }}>Eligibility:</span>
            <span style={{ fontWeight: '600', color: '#f8fafc' }}>{exam.eligibility}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Stream:</span>
            <span style={{ color: '#38bdf8', fontWeight: '500' }}>
              {(exam.stream || []).join(', ') || 'Any Stream'}
            </span>
          </div>
        </div>

        {/* Key Dates Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          marginBottom: '16px'
        }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(51, 65, 85, 0.4)',
            padding: '8px 10px',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Last Date</div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: appEndDays !== null && appEndDays <= 7 ? '#ef4444' : '#38bdf8' }}>
              {exam.applicationEnd || 'TBA'}
              {appEndDays !== null && appEndDays >= 0 && (
                <span style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.8 }}>({appEndDays}d left)</span>
              )}
            </div>
          </div>

          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(51, 65, 85, 0.4)',
            padding: '8px 10px',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Exam Date</div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#f59e0b' }}>
              {exam.examDate || 'TBA'}
              {examDays !== null && examDays >= 0 && (
                <span style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.8 }}>({examDays}d)</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        paddingTop: '12px',
        borderTop: '1px solid rgba(51, 65, 85, 0.4)'
      }}>
        <a
          href={exam.applyLink || exam.officialWebsite}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            flex: 1,
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            color: '#ffffff',
            padding: '9px 14px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '600',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
            transition: 'opacity 0.2s'
          }}
        >
          Apply Now ↗
        </a>

        <button
          onClick={() => onSelectExam && onSelectExam(exam)}
          style={{
            background: 'rgba(30, 41, 59, 0.8)',
            color: '#cbd5e1',
            border: '1px solid rgba(71, 85, 105, 0.5)',
            padding: '9px 12px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Details
        </button>
      </div>
    </motion.div>
  )
}
