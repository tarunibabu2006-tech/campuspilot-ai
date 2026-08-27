import React, { useState, useEffect } from 'react'
import { getAllRoles, getSkills } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import Autocomplete from '../Common/Autocomplete'
import { masterRoles } from '../../data/masterData'

function RoleBasedLearning({ onSelectSkill }) {
  const { user, updateUser } = useAuth()
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Frontend Developer')
  const [roles, setRoles] = useState([])
  const [requiredSkills, setRequiredSkills] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchRoles()
  }, [])

  useEffect(() => {
    if (targetRole) {
      fetchRoleSkills(targetRole)
    }
  }, [targetRole])

  const fetchRoles = async () => {
    try {
      const res = await getAllRoles()
      setRoles(res.data.roles || [])
    } catch (err) {
      console.error('Error fetching roles:', err)
    }
  }

  const fetchRoleSkills = async (roleName) => {
    setLoading(true)
    try {
      // Find role definition in response
      const matchedRole = roles.find(r => r.name === roleName)
      const searchRes = await getSkills()
      const allSkillsList = searchRes.data.skills || []

      // If we found the role definition, filter. Otherwise show relevant skills.
      if (matchedRole) {
        const skillsFiltered = allSkillsList.filter(s =>
          matchedRole.skills.some(skillName => s.name.toLowerCase().includes(skillName.toLowerCase()))
        )
        setRequiredSkills(skillsFiltered.length > 0 ? skillsFiltered : allSkillsList.slice(0, 12))
      } else {
        // Fallback filter
        const fallbackSkills = allSkillsList.filter(s =>
          s.requiredForRoles?.some(r => r.toLowerCase().includes(roleName.toLowerCase()))
        )
        setRequiredSkills(fallbackSkills.length > 0 ? fallbackSkills : allSkillsList.slice(0, 12))
      }
    } catch (err) {
      toast.error('Failed to load role modules')
    }
    setLoading(false)
  }

  const handleRoleSelect = (roleName) => {
    setTargetRole(roleName)
    updateUser({ targetRole: roleName })
    toast.success(`Target role set to ${roleName}! 🎯`)
  }

  const matchPct = requiredSkills.length > 0 ? 33 : 0 // Demo milestone progress

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Highlighted Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #3b0764 50%, #0f172a 100%)',
        border: '1px solid rgba(192,132,252,0.4)',
        borderRadius: '1.5rem',
        padding: '2rem',
        boxShadow: '0 8px 32px rgba(147,51,234,0.25)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>🗺️</span>
            <div>
              <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '900', color: '#fff', background: 'linear-gradient(135deg, #fff, #f0abfc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Role Path & Structured Roadmap
              </h1>
              <p style={{ margin: '0.25rem 0 0', color: '#e9d5ff', fontSize: '0.92rem' }}>
                Select your target career role from 200+ domains → Step-by-step modular learning syllabus & project milestones.
              </p>
            </div>
          </div>
          <span style={{ background: 'linear-gradient(135deg, #c084fc, #9333ea)', color: 'white', padding: '0.35rem 0.85rem', borderRadius: '0.6rem', fontWeight: '800', fontSize: '0.85rem' }}>
            200+ Roles
          </span>
        </div>
      </div>

      <div className="card">

      {/* Target Role Selector & Autocomplete */}
      <div className="mb-3">
        <label className="form-label">Search or Select Your Target Career Role (All Domains)</label>
        <div style={{ marginBottom: '0.85rem' }}>
          <Autocomplete
            value={targetRole}
            onChange={handleRoleSelect}
            options={masterRoles}
            placeholder="Type or search any role (e.g. Data Scientist, Mechanical Engineer, Corporate Lawyer)..."
            icon="🎯"
          />
        </div>
        <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', padding: '0.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
          {masterRoles.slice(0, 30).map(r => (
            <button
              key={r}
              onClick={() => handleRoleSelect(r)}
              className={`nav-tab ${targetRole === r ? 'active' : ''}`}
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.6rem' }}
            >
              🎯 {r}
            </button>
          ))}
        </div>
      </div>

      {targetRole && (
        <>
          {/* Progress Header */}
          <div className="result-section mb-3">
            <div className="flex justify-between items-center mb-1">
              <h3 className="result-title" style={{ marginBottom: 0 }}>📊 Progress for {targetRole}</h3>
              <span className="badge badge-info">{matchPct}% Mastery ({requiredSkills.length} Modules Required)</span>
            </div>
            <div style={{ height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${matchPct}%`, background: 'var(--blue)', transition: 'width 0.3s ease' }}></div>
            </div>
          </div>

          {/* Module List */}
          {loading ? (
            <p className="text-sm text-muted text-center py-4">Loading required skill modules...</p>
          ) : requiredSkills.length === 0 ? (
            <p className="text-sm text-muted text-center py-4">No specific pre-mapped modules found. Open Skill Hub to learn custom subjects!</p>
          ) : (
            <div className="space-y-2">
              {requiredSkills.map((skill, index) => {
                return (
                  <div key={skill._id} className="result-item flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="badge badge-info">Step {index + 1}</span>
                        <p className="font-bold text-sm text-blue">{skill.name}</p>
                      </div>
                      <p className="text-xs text-muted mt-1">{skill.description}</p>
                    </div>

                    <div className="flex items-center gap-1" style={{ flexShrink: 0 }}>
                      <button
                        onClick={() => onSelectSkill(skill._id)}
                        className="btn btn-primary"
                        style={{ fontSize: '0.75rem', padding: '0.35rem 0.6rem' }}
                      >
                        Study Module →
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
      </div>
    </div>
  )
}

export default RoleBasedLearning
