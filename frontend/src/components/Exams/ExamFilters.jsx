import React from 'react'

export default function ExamFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedStream,
  setSelectedStream,
  selectedEligibility,
  setSelectedEligibility,
  selectedStatus,
  setSelectedStatus,
  categories = []
}) {
  const defaultCategories = [
    'All',
    'Engineering',
    'Medical',
    'Government',
    'Banking',
    'Defence',
    'Civil Services',
    'Teaching',
    'Higher Education'
  ]

  const categoryList = categories.length > 0 ? categories : defaultCategories

  const streamOptions = ['All', 'Science', 'Engineering', 'Commerce', 'Arts', 'Medical']
  const eligibilityOptions = ['All', '10th Pass', '12th Pass', 'Graduate', 'Post Graduate', 'B.E / B.Tech']
  const statusOptions = ['All', 'active', 'upcoming']

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(51, 65, 85, 0.5)',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '24px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
    }}>
      {/* Top Search & Dropdown Filters Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px',
        marginBottom: '16px'
      }}>
        {/* Search Bar */}
        <div style={{ position: 'relative', gridColumn: 'span 2' }}>
          <span style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#64748b',
            fontSize: '15px'
          }}>
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exams, conducting body (NTA, UPSC, SSC...), role..."
            style={{
              width: '100%',
              padding: '11px 16px 11px 40px',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(71, 85, 105, 0.5)',
              borderRadius: '10px',
              color: '#ffffff',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Stream Filter */}
        <div>
          <select
            value={selectedStream}
            onChange={(e) => setSelectedStream(e.target.value)}
            style={{
              width: '100%',
              padding: '11px 14px',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(71, 85, 105, 0.5)',
              borderRadius: '10px',
              color: '#cbd5e1',
              fontSize: '13px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {streamOptions.map(opt => (
              <option key={opt} value={opt} style={{ background: '#1e293b' }}>
                Stream: {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Eligibility Filter */}
        <div>
          <select
            value={selectedEligibility}
            onChange={(e) => setSelectedEligibility(e.target.value)}
            style={{
              width: '100%',
              padding: '11px 14px',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(71, 85, 105, 0.5)',
              borderRadius: '10px',
              color: '#cbd5e1',
              fontSize: '13px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {eligibilityOptions.map(opt => (
              <option key={opt} value={opt} style={{ background: '#1e293b' }}>
                Eligibility: {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              width: '100%',
              padding: '11px 14px',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(71, 85, 105, 0.5)',
              borderRadius: '10px',
              color: '#cbd5e1',
              fontSize: '13px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt} style={{ background: '#1e293b' }}>
                Status: {opt === 'All' ? 'All Status' : opt === 'active' ? '🟢 Active' : '🟡 Upcoming'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '4px',
        scrollbarWidth: 'none'
      }}>
        {categoryList.map(cat => {
          const isSelected = selectedCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                background: isSelected
                  ? 'linear-gradient(135deg, #2563eb, #1d4ed8)'
                  : 'rgba(30, 41, 59, 0.6)',
                color: isSelected ? '#ffffff' : '#94a3b8',
                border: isSelected
                  ? '1px solid #3b82f6'
                  : '1px solid rgba(71, 85, 105, 0.4)',
                padding: '7px 14px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: isSelected ? '700' : '500',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                boxShadow: isSelected ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none'
              }}
            >
              {cat}
            </button>
          )
        })}
      </div>
    </div>
  )
}
