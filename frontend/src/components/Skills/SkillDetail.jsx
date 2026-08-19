import React, { useState, useEffect } from 'react'
import { getSkillById, updateSkillProgress } from '../../services/api'
import toast from 'react-hot-toast'

function SkillDetail({ skillId, onBack }) {
  const [skill, setSkill] = useState(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    fetchSkillDetail()
  }, [skillId])

  const fetchSkillDetail = async () => {
    setLoading(true)
    try {
      const res = await getSkillById(skillId)
      // The API returns the raw skill object directly as data
      setSkill(res.data)
      setProgress(res.data.progress || 0)
    } catch (err) {
      toast.error('Failed to load skill details')
    }
    setLoading(false)
  }

  const markComplete = async () => {
    try {
      await updateSkillProgress({ skillId, progress: 100 })
      setProgress(100)
      toast.success('Module marked as 100% complete! 🎉 +100 XP')
    } catch {
      toast.error('Failed to update progress')
    }
  }

  if (loading) return <div className="card text-center py-4 text-muted">Loading module content...</div>
  if (!skill) return <div className="card text-center py-4 text-muted">Skill module not found.</div>

  return (
    <div className="card">
      <button onClick={onBack} className="btn btn-outline mb-2" style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}>
        ← Back to Skill Hub
      </button>

      <div className="flex justify-between items-center flex-wrap gap-1 mb-1">
        <h2 className="card-title" style={{ marginBottom: 0 }}>📚 {skill.name}</h2>
        <button onClick={markComplete} className="btn btn-success" style={{ fontSize: '0.8rem' }}>
          ✅ Mark Module Complete
        </button>
      </div>

      <div className="flex gap-1 mb-2">
        <span className="badge badge-info">{skill.category}</span>
        <span className="badge badge-safe">{skill.domain}</span>
        <span className="badge badge-warning">{skill.level}</span>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
          <span>Module Progress</span>
          <span>{progress}%</span>
        </div>
        <div style={{ height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'var(--green)', transition: 'width 0.3s ease' }}></div>
        </div>
      </div>

      <p className="text-sm text-muted mb-3">{skill.description}</p>

      {/* Detailed Notes Section */}
      <div className="result-section mb-2">
        <h3 className="result-title">📖 Comprehensive Study Notes (5-10 Pages Content)</h3>
        <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-primary)', fontSize: '0.85rem', lineHeight: '1.6' }}>
          {skill.notes || 'Detailed lecture notes and code snippets available.'}
        </div>
      </div>

      {/* Recommended Learning Resources */}
      {skill.resources && skill.resources.length > 0 && (
        <div className="mb-2">
          <h3 className="text-sm font-bold mb-1">🌐 Recommended Documentation & Articles:</h3>
          <div className="flex flex-wrap gap-1">
            {skill.resources.map((res, i) => (
              <a key={i} href={res} target="_blank" rel="noopener noreferrer" className="badge badge-info" style={{ textDecoration: 'none' }}>
                🔗 {res} ↗
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Video Resources */}
      {skill.videos && skill.videos.length > 0 && (
        <div className="mb-2">
          <h3 className="text-sm font-bold mb-1">🎥 Video Tutorials:</h3>
          {skill.videos.map((vid, i) => (
            <a key={i} href={vid} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-full mt-1" style={{ fontSize: '0.8rem', justifyContent: 'flex-start' }}>
              ▶️ Watch Tutorial {i + 1} ({vid})
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default SkillDetail
