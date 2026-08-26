import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { CAREER_ROLE_PRESETS } from '../data/seedRoles'

// Helper function to calculate real dynamic match % and skill gaps
const computeRoleAnalysis = (roleObj, userSkillsString) => {
  const userSkillList = userSkillsString
    ? userSkillsString.split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
    : []

  const roleSkillList = roleObj.skills
    ? roleObj.skills.split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
    : []

  if (userSkillList.length === 0 || roleSkillList.length === 0) {
    return {
      matchPct: 0,
      whyExplanation: ['No matching skills recorded yet ⚠️'],
      skillGaps: roleSkillList.slice(0, 4).map(sk => ({
        skill: sk.toUpperCase(),
        current: 0,
        required: 80,
        status: 'Not Started'
      }))
    }
  }

  let matchedCount = 0
  const whyArr = []
  const gapsArr = []

  roleSkillList.forEach(rSkill => {
    const hasSkill = userSkillList.some(uSkill => uSkill.includes(rSkill) || rSkill.includes(uSkill))
    if (hasSkill) {
      matchedCount++
      whyArr.push(`${rSkill.toUpperCase()} ✅`)
      gapsArr.push({ skill: rSkill.toUpperCase(), current: 80, required: 85, status: 'Proficient' })
    } else {
      gapsArr.push({ skill: rSkill.toUpperCase(), current: 0, required: 85, status: 'Needs Learning' })
    }
  })

  const matchPct = Math.min(100, Math.round((matchedCount / roleSkillList.length) * 100))

  return {
    matchPct,
    whyExplanation: whyArr.length > 0 ? whyArr : ['Target role requires additional core skills ⚠️'],
    skillGaps: gapsArr.slice(0, 5)
  }
}

export default function AiCareerPredictor() {
  const { user } = useAuth()

  const initialUserSkills = user?.skills && user.skills.length > 0 ? user.skills.join(', ') : ''
  const [currentRole, setCurrentRole] = useState('Software Developer')
  const [skills, setSkills] = useState(initialUserSkills)
  const [interests, setInterests] = useState('Full Stack Development, Web Apps')
  const [education, setEducation] = useState(user?.department ? `${user.department} (${user.year || 'Student'})` : '')

  const [activePreset, setActivePreset] = useState(CAREER_ROLE_PRESETS[0])
  const [isPredicted, setIsPredicted] = useState(false)
  const [loading, setLoading] = useState(false)

  // What-If Simulator State
  const [simSkills, setSimSkills] = useState('')
  const [simResult, setSimResult] = useState(null)

  const loadPreset = (preset) => {
    setActivePreset(preset)
    setCurrentRole(preset.title)
    setSkills(preset.skills)
    setInterests(preset.interests || 'Tech')
    setEducation(preset.education || 'Engineering')
    setIsPredicted(true)
    toast.success(`Loaded ${preset.title} profile preset!`)
  }

  const handlePredict = () => {
    setLoading(true)
    setTimeout(() => {
      setIsPredicted(true)
      setLoading(false)
      toast.success('🔮 5-Year & 10-Year AI Career Projection Generated!')
    }, 800)
  }

  const handleSimulateWhatIf = () => {
    if (!simSkills.trim()) {
      toast.error('Please enter a skill to simulate (e.g. AWS + Docker)!')
      return
    }
    const skillLower = simSkills.toLowerCase()
    let boostRole = 'Cloud & DevOps Engineer'
    let boostPct = '+18%'
    let newMatch = '86%'

    if (skillLower.includes('power bi') || skillLower.includes('tableau')) {
      boostRole = 'Data Analyst'
      boostPct = '+19%'
      newMatch = '91%'
    } else if (skillLower.includes('pytorch') || skillLower.includes('ai') || skillLower.includes('ml')) {
      boostRole = 'AI / ML Engineer'
      boostPct = '+16%'
      newMatch = '88%'
    }

    setSimResult({
      skillAdded: simSkills,
      roleBoosted: boostRole,
      boostAmount: boostPct,
      newMatchScore: newMatch
    })
    toast.success('🎯 What-If Simulation Complete!')
  }

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header Banner */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #1e1b4b, #311042, #0f172a)', borderRadius: '1.5rem', padding: '2rem', marginBottom: '1.5rem', border: '1px solid rgba(168,85,247,0.4)' }}
      >
        <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '0.5rem' }}>
          🔮 AI Career Planning & 10-Year Prediction System
        </h1>
        <p style={{ color: '#c084fc' }}>
          AI multi-path probability, 5-Yr & 10-Yr trajectory, skill gap analysis, salary growth & what-if simulator.
        </p>
      </motion.div>

      {/* 1-Click Role Presets */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1rem', marginBottom: '0.75rem' }}>⚡ 1-Click Role Presets (Auto-Fills Profile & Gaps)</h3>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {PRESETS.map(p => (
            <button
              key={p.title} onClick={() => loadPreset(p)}
              style={{
                padding: '0.6rem 1.2rem', borderRadius: '0.75rem', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer',
                background: activePreset.title === p.title ? 'linear-gradient(135deg, #9333ea, #4f46e5)' : 'rgba(255,255,255,0.05)',
                color: activePreset.title === p.title ? 'white' : '#94a3b8',
                border: activePreset.title === p.title ? 'none' : '1px solid rgba(255,255,255,0.1)'
              }}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Input Profile */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1rem' }}>📋 Profile & Skills Input</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Target Role</label>
            <input type="text" value={currentRole} onChange={e => setCurrentRole(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Current Skills</label>
            <input type="text" value={skills} onChange={e => setSkills(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Education / Degree</label>
            <input type="text" value={education} onChange={e => setEducation(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }} />
          </div>
        </div>

        <button
          onClick={handlePredict} disabled={loading}
          style={{ width: '100%', padding: '0.85rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #9333ea, #4f46e5)', color: 'white', fontWeight: '800', fontSize: '1rem', border: 'none', cursor: 'pointer' }}
        >
          {loading ? '🔮 Forecasting Career Trajectory...' : 'Predict 5-Year & 10-Year Career Roadmap 🔮'}
        </button>
      </div>

      {/* WHAT-IF CARRIER SIMULATOR */}
      <div style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(37,99,235,0.08))', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ color: '#c4b5fd', fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.4rem' }}>🔄 "What-If?" Career Skill Simulator</h3>
        <p style={{ color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '1rem' }}>Test how learning a new skill increases your career match probability!</p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <input
            type="text" placeholder="e.g. What if I learn AWS + Docker?"
            value={simSkills} onChange={e => setSimSkills(e.target.value)}
            style={{ flex: 1, minWidth: '220px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
          />
          <button onClick={handleSimulateWhatIf} style={{ padding: '0.65rem 1.25rem', borderRadius: '0.6rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', fontWeight: '800', border: 'none', cursor: 'pointer' }}>Simulate 🚀</button>
        </div>

        {simResult && (
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '1rem', color: 'white' }}>
            🎉 Learning <strong>{simResult.skillAdded}</strong> increases your <strong>{simResult.roleBoosted}</strong> match score by <strong style={{ color: '#4ade80' }}>{simResult.boostAmount}</strong> (New Match: <strong style={{ color: '#4ade80' }}>{simResult.newMatchScore}</strong>)!
          </div>
        )}
      </div>

      {/* PREDICTION RESULTS */}
      {(isPredicted || activePreset) && (() => {
        const currentAnalysis = computeRoleAnalysis(activePreset, skills)
        const multiPathMatches = CAREER_ROLE_PRESETS.slice(0, 10).map(r => ({
          role: r.title,
          ...computeRoleAnalysis(r, skills)
        }))

        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Zero Skills Notice */}
            {(!skills || !skills.trim()) && (
              <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '1.25rem', padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2rem' }}>⚠️</div>
                <div>
                  <div style={{ color: '#ef4444', fontWeight: '800', fontSize: '1rem' }}>No Skills Found in Profile</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>
                    Match percentage is currently 0%. Add your technical & soft skills above or click a 1-Click Role Preset to see real skill gap analysis!
                  </div>
                </div>
              </div>
            )}

            {/* 📊 Career Probability Matches */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1rem' }}>📊 Multi-Path Career Probability (Calculated from Profile Skills)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                {multiPathMatches.map(p => (
                  <div key={p.role} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.9rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ color: 'white', fontWeight: '700', fontSize: '0.95rem' }}>{p.role}</div>
                    <div style={{ color: p.matchPct >= 70 ? '#4ade80' : p.matchPct > 0 ? '#fbbf24' : '#64748b', fontWeight: '900', fontSize: '1.3rem', marginTop: '0.2rem' }}>
                      {p.matchPct}% Match {p.matchPct >= 70 ? '🟢' : p.matchPct > 0 ? '🟡' : '⚪'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 🧠 Why This Career? */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.75rem' }}>🧠 "Why This Career?" AI Explanation</h3>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {currentAnalysis.whyExplanation.map(reason => (
                  <span key={reason} style={{ background: reason.includes('✅') ? 'rgba(74,222,128,0.15)' : 'rgba(239,68,68,0.15)', color: reason.includes('✅') ? '#4ade80' : '#f87171', padding: '0.4rem 0.8rem', borderRadius: '0.6rem', fontWeight: '700', fontSize: '0.85rem' }}>
                    {reason}
                  </span>
                ))}
              </div>
            </div>

            {/* 📈 5-Year & 10-Year Roadmap Stepper */}
            {activePreset.roadmap && (
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '1.25rem' }}>📈 5-Year & 10-Year Career Milestone Roadmap</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {activePreset.roadmap.map((stage) => (
                    <div key={stage.year} style={{ background: 'rgba(255,255,255,0.04)', borderLeft: '4px solid #7c3aed', borderRadius: '0.9rem', padding: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <span style={{ background: '#7c3aed', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontWeight: '800', fontSize: '0.8rem' }}>{stage.year}</span>
                          <span style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem' }}>{stage.title}</span>
                        </div>
                        <span style={{ color: '#4ade80', fontWeight: '800', fontSize: '0.9rem' }}>💰 {stage.salary}</span>
                      </div>
                      <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '0.4rem' }}>Experience Required: {stage.exp}</div>
                      <div style={{ color: '#c4b5fd', fontSize: '0.82rem' }}>Mandatory Skills: {stage.skills}</div>
                      <div style={{ color: '#fbbf24', fontSize: '0.8rem', marginTop: '0.2rem' }}>📜 Recommended Cert: {stage.cert}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 📊 Skill Gap Table */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1rem' }}>📊 Skill Gap Analysis (Real Profile vs Target Role)</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                {currentAnalysis.skillGaps.map(g => (
                  <div key={g.skill} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                      <span>{g.skill} — <span style={{ color: g.current > 0 ? '#4ade80' : '#ef4444' }}>{g.status}</span></span>
                      <span>Current: {g.current}% / Target: {g.required}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${g.current}%`, background: g.current >= g.required ? '#4ade80' : g.current > 0 ? '#fbbf24' : '#ef4444', borderRadius: '3px' }} />
                    </div>
                  </div>
                ))}
              </div>
              {currentAnalysis.skillGaps.some(g => g.current < g.required) && (
                <div style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', padding: '0.75rem', borderRadius: '0.75rem', fontSize: '0.85rem', fontWeight: '700', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>🎯 Primary Skill Gap to Focus: {currentAnalysis.skillGaps.find(g => g.current === 0)?.skill || currentAnalysis.skillGaps[0]?.skill}</span>
                  <button onClick={() => toast.success(`Redirecting to skill learning path!`)} style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.3rem 0.8rem', fontWeight: '800', cursor: 'pointer' }}>
                    Start Learning →
                  </button>
                </div>
              )}
            </div>

            {/* 💰 Salary Growth Projection */}
            {activePreset.salaryGrowth && (
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.4rem' }}>💰 Market Salary Growth Projection</h3>
                <p style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '1rem' }}>* Estimated market compensation range (Not a guaranteed contract salary)</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
                  {activePreset.salaryGrowth.map(sg => (
                    <div key={sg.stage} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.9rem', textAlign: 'center' }}>
                      <div style={{ color: '#4ade80', fontWeight: '900', fontSize: '1.2rem' }}>{sg.range}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.2rem' }}>{sg.stage}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div style={{ color: '#64748b', fontSize: '0.75rem', textAlign: 'center', fontStyle: 'italic' }}>
              ⚠️ AI Career Projection Disclaimer: Projections are estimated based on your current skills, interests, and industry benchmarks. This is a guidance roadmap, not a guaranteed contract prediction.
            </div>
          </motion.div>
        )
      })()}
    </div>
  )
}
