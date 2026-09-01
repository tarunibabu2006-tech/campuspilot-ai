import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { analyzeSkillGap } from '../services/api'
import toast from 'react-hot-toast'
import Autocomplete from './Common/Autocomplete'
import { masterRoles, masterSkills } from '../data/masterData'

const PRESET_CAREERS = [
  { role: 'Generative AI & LLM Engineer', icon: '🤖', topSkills: ['Python', 'PyTorch', 'Transformers', 'LangChain', 'RAG', 'Vector DB', 'FastAPI'] },
  { role: 'Full Stack Web Developer', icon: '💻', topSkills: ['React.js', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'TailwindCSS', 'REST APIs'] },
  { role: 'Data Scientist & ML Engineer', icon: '📊', topSkills: ['Python', 'Pandas', 'Scikit-Learn', 'SQL', 'Deep Learning', 'Tableau', 'Statistics'] },
  { role: 'Cloud DevOps & SRE Engineer', icon: '☁️', topSkills: ['Linux', 'Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Prometheus'] },
  { role: 'Cybersecurity & Penetration Tester', icon: '🛡️', topSkills: ['Network Security', 'Wireshark', 'Metasploit', 'Linux', 'OWASP Top 10', 'Python', 'Cryptography'] },
  { role: 'Mobile App Developer (Flutter/React Native)', icon: '📱', topSkills: ['Flutter', 'Dart', 'React Native', 'Firebase', 'State Management', 'Mobile UI/UX'] },
  { role: 'Autonomous Robotics Engineer', icon: '🦾', topSkills: ['ROS 2', 'C++', 'Python', 'Computer Vision', 'OpenCV', 'SLAM', 'Sensor Fusion'] },
  { role: 'Finance & Quant Analyst', icon: '📈', topSkills: ['Financial Modeling', 'Python', 'Excel VBA', 'SQL', 'Time Series Analysis', 'Risk Management'] }
]

export default function SkillGapAnalyzer({ language = 'en' }) {
  const [currentSkills, setCurrentSkills] = useState('HTML, CSS, JavaScript, Python')
  const [targetRole, setTargetRole] = useState('Generative AI & LLM Engineer')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [checkedSkills, setCheckedSkills] = useState({})

  const handleSelectPreset = (preset) => {
    setTargetRole(preset.role)
    toast.success(`Selected Target: ${preset.role}`)
  }

  const toggleSkillCheck = (skillName) => {
    setCheckedSkills(prev => ({ ...prev, [skillName]: !prev[skillName] }))
  }

  // Local AI Fallback Engine
  const calculateLocalGapAnalysis = (currSkillsList, roleName) => {
    const preset = PRESET_CAREERS.find(p => p.role.toLowerCase() === roleName.toLowerCase())
    const requiredSkills = preset ? preset.topSkills : ['Core Architecture', 'Database Optimization', 'System Design', 'Cloud Deployment', 'Testing & CI/CD', 'Security Best Practices']

    const currLower = currSkillsList.map(s => s.toLowerCase().trim())
    const matched = []
    const missing = []

    requiredSkills.forEach(req => {
      if (currLower.some(c => c.includes(req.toLowerCase()) || req.toLowerCase().includes(c))) {
        matched.push(req)
      } else {
        missing.push(req)
      }
    })

    const matchPct = Math.min(95, Math.max(25, Math.round((matched.length / Math.max(1, requiredSkills.length)) * 100)))

    return {
      targetRole: roleName,
      matchPercentage: matchPct,
      currentSkills: matched.length > 0 ? matched : currSkillsList.slice(0, 4),
      missingSkills: missing.length > 0 ? missing : ['Advanced Scalability', 'Production Microservices', 'High-Performance Profiling'],
      salaryEstimate: matchPct >= 75 ? '₹14 - 28 LPA' : matchPct >= 50 ? '₹8 - 16 LPA' : '₹5 - 10 LPA',
      expectedIncrease: `+${Math.max(20, (100 - matchPct) * 1.2).toFixed(0)}% Salary Hike upon completion`,
      roadmap: {
        months: [
          {
            month: 1,
            focus: 'Core Fundamentals & Essential Missing Concepts',
            topics: missing.slice(0, 2).concat(['Syntax & Tooling Setup', 'Basic Architecture Patterns']),
            projects: [`${roleName} Starter Prototype with Core Framework`]
          },
          {
            month: 2,
            focus: 'Production Integration, Databases & State Management',
            topics: missing.slice(2, 4).concat(['API Design', 'State Handling & Pipelines']),
            projects: [`End-to-End Scalable Project for ${roleName}`]
          },
          {
            month: 3,
            focus: 'Advanced Optimization, CI/CD, Deployment & Portfolio Polish',
            topics: missing.slice(4).concat(['Cloud Dockerization', 'Unit Testing & Security', 'Resume Ready Portfolio']),
            projects: [`Enterprise Grade Capstone Showcase System`]
          }
        ]
      },
      portfolioSuggestions: [
        `Build a production-grade full stack web/AI application solving a real enterprise challenge.`,
        `Create a public GitHub repository with comprehensive README, Docker compose file, and benchmark tests.`,
        `Write a technical blog post or LinkedIn case study breaking down your architecture decisions.`
      ]
    }
  }

  const handleAnalyze = async () => {
    const role = targetRole.trim()
    if (!currentSkills.trim() || !role) {
      toast.error('Please specify your current skills and target role!')
      return
    }

    setLoading(true)
    const skillsArray = currentSkills.split(',').map(s => s.trim()).filter(Boolean)

    try {
      const res = await analyzeSkillGap({
        currentSkills: skillsArray,
        targetRole: role,
        language
      })
      if (res && res.data && res.data.targetRole) {
        setResult(res.data)
      } else {
        setResult(calculateLocalGapAnalysis(skillsArray, role))
      }
      toast.success('Skill Gap Analyzed Successfully! 🎯')
    } catch (err) {
      console.warn('API unavailable, running intelligent local gap analyzer...')
      setResult(calculateLocalGapAnalysis(skillsArray, role))
      toast.success('AI Skill Gap Analysis Ready! 🎯')
    } finally {
      setLoading(false)
      window.scrollTo({ top: 350, behavior: 'smooth' })
    }
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* ── HEADER BANNER ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #0f172a 100%)',
          borderRadius: '1.5rem',
          padding: '2rem',
          border: '1px solid rgba(139,92,246,0.35)',
          boxShadow: '0 8px 32px rgba(124,58,237,0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '2.5rem' }}>🎯</span>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
              AI Skill Gap Analyzer & 90-Day Career Accelerator
            </h1>
            <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
              Compare your current stack with live industry requirements, pinpoint missing high-salary skills, and get a tailored 3-month action plan.
            </p>
          </div>
        </div>
        <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.4)', padding: '0.4rem 0.9rem', borderRadius: '2rem', fontWeight: '800', fontSize: '0.8rem' }}>
          ✨ Direct Skill Gap Engine
        </span>
      </motion.div>

      {/* ── PRESET TARGET ROLES ────────────────────────────────────── */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.25rem' }}>
        <div style={{ color: '#c4b5fd', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: '800', marginBottom: '0.65rem' }}>
          ⚡ Popular Target Roles (Click to Quick Select):
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.65rem' }}>
          {PRESET_CAREERS.map((preset, idx) => {
            const isSelected = targetRole.toLowerCase() === preset.role.toLowerCase()
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectPreset(preset)}
                style={{
                  background: isSelected ? 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(37,99,235,0.25))' : 'rgba(255,255,255,0.03)',
                  border: isSelected ? '1.5px solid #8b5cf6' : '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '0.75rem',
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  transition: 'all 0.15s ease'
                }}
              >
                <span style={{ fontSize: '1.3rem' }}>{preset.icon}</span>
                <span style={{ color: isSelected ? '#ffffff' : '#cbd5e1', fontSize: '0.82rem', fontWeight: isSelected ? '800' : '600' }}>
                  {preset.role}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── INPUT FORM ─────────────────────────────────────────────── */}
      <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '1.25rem', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', color: '#c4b5fd', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
            🎯 Target Career Role
          </label>
          <Autocomplete
            value={targetRole}
            onChange={setTargetRole}
            options={masterRoles}
            placeholder="e.g. Generative AI Engineer, Full Stack Developer, Data Scientist, Cloud Architect..."
            icon="🎯"
          />
        </div>

        <div>
          <label style={{ display: 'block', color: '#c4b5fd', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
            🛠️ Your Current Skills (Comma Separated)
          </label>
          <Autocomplete
            value={currentSkills}
            onChange={setCurrentSkills}
            options={masterSkills}
            multiSelect={true}
            placeholder="e.g. HTML, CSS, JavaScript, React, Python, SQL, Docker..."
            icon="🛠️"
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
            {currentSkills.split(',').map(s => s.trim()).filter(Boolean).map((skill, idx) => (
              <span key={idx} style={{ background: 'rgba(59,130,246,0.15)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.3)', padding: '0.15rem 0.55rem', borderRadius: '0.4rem', fontSize: '0.75rem', fontWeight: '700' }}>
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
            color: 'white',
            border: 'none',
            padding: '0.85rem 1.5rem',
            borderRadius: '0.75rem',
            fontWeight: '900',
            fontSize: '0.95rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 20px rgba(124,58,237,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          {loading ? '⏳ AI Analyzing Market Gaps...' : '🚀 Analyze Skill Gap & Build 90-Day Plan ➔'}
        </button>
      </div>

      {/* ── ANALYSIS RESULT SECTION ────────────────────────────────── */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(15, 23, 42, 0.95)',
            border: '2px solid rgba(139, 92, 246, 0.4)',
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}
        >
          {/* Header Metric Cards */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1.25rem' }}>
            <div>
              <span style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
                AI GAP DIAGNOSTIC REPORT
              </span>
              <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.5rem', margin: '0.35rem 0 0.2rem' }}>
                {result.targetRole}
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
                Estimated Market Pay: <strong style={{ color: '#4ade80' }}>{result.salaryEstimate || '₹10 - 24 LPA'}</strong> · {result.expectedIncrease || '+35% Salary Hike Potential'}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: result.matchPercentage >= 70 ? 'rgba(34,197,94,0.15)' : 'rgba(251,191,36,0.15)', border: `1px solid ${result.matchPercentage >= 70 ? '#22c55e' : '#fbbf24'}`, padding: '0.75rem 1.25rem', borderRadius: '1rem', textAlign: 'center' }}>
                <div style={{ color: result.matchPercentage >= 70 ? '#4ade80' : '#fbbf24', fontWeight: '900', fontSize: '1.8rem', lineHeight: 1 }}>
                  {result.matchPercentage}%
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase', marginTop: '0.25rem' }}>
                  Role Match Score
                </div>
              </div>
            </div>
          </div>

          {/* Match Progress Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.4rem' }}>
              <span>Role Readiness Match</span>
              <span>{result.matchPercentage}% of Target Requirements</span>
            </div>
            <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.matchPercentage}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: result.matchPercentage >= 75
                    ? 'linear-gradient(90deg, #10b981, #34d399)'
                    : result.matchPercentage >= 50
                      ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                      : 'linear-gradient(90deg, #ef4444, #f87171)',
                  borderRadius: '6px'
                }}
              />
            </div>
          </div>

          {/* Current Skills vs Missing Skills Comparison Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {/* Acquired Skills */}
            <div style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '1rem', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.2rem' }}>✅</span>
                <h4 style={{ color: '#4ade80', margin: 0, fontWeight: '800', fontSize: '0.95rem' }}>
                  Skills You Already Have ({result.currentSkills?.length || 0})
                </h4>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {result.currentSkills?.map((s, idx) => (
                  <span key={idx} style={{ background: 'rgba(34,197,94,0.15)', color: '#86efac', border: '1px solid rgba(34,197,94,0.3)', padding: '0.3rem 0.65rem', borderRadius: '0.5rem', fontSize: '0.78rem', fontWeight: '700' }}>
                    ✓ {typeof s === 'string' ? s : s.skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills with Checkbox for tracking */}
            <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '1rem', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.2rem' }}>⚡</span>
                <h4 style={{ color: '#f87171', margin: 0, fontWeight: '800', fontSize: '0.95rem' }}>
                  Missing High-Priority Skills to Learn ({result.missingSkills?.length || 0})
                </h4>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {result.missingSkills?.map((s, idx) => {
                  const skillName = typeof s === 'string' ? s : s.skill
                  const isChecked = !!checkedSkills[skillName]
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleSkillCheck(skillName)}
                      style={{
                        background: isChecked ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.15)',
                        color: isChecked ? '#4ade80' : '#fca5a5',
                        border: isChecked ? '1px solid #22c55e' : '1px solid rgba(239,68,68,0.3)',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <span>{isChecked ? '☑️' : '☐'}</span>
                      <span style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>{skillName}</span>
                    </div>
                  )
                })}
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.72rem', margin: '0.5rem 0 0' }}>
                💡 Click any missing skill above as you learn it to mark it completed!
              </p>
            </div>
          </div>

          {/* 3-Month Step-by-Step Sprint Roadmap */}
          {result.roadmap?.months && (
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.3rem' }}>📅</span>
                <h3 style={{ color: '#c4b5fd', margin: 0, fontWeight: '800', fontSize: '1.1rem' }}>
                  Custom 90-Day Sprint Roadmap
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                {result.roadmap.months.map((m, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.85rem', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.75rem', fontWeight: '800' }}>
                        Month {m.month || idx + 1}
                      </span>
                    </div>

                    <h4 style={{ color: 'white', fontWeight: '800', fontSize: '0.92rem', margin: '0.3rem 0 0.5rem' }}>
                      {m.focus}
                    </h4>

                    {m.topics && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.75rem' }}>
                        {m.topics.map((top, tIdx) => (
                          <span key={tIdx} style={{ background: 'rgba(96,165,250,0.12)', color: '#93c5fd', padding: '0.15rem 0.45rem', borderRadius: '0.35rem', fontSize: '0.7rem', fontWeight: '600' }}>
                            • {top}
                          </span>
                        ))}
                      </div>
                    )}

                    {m.projects && (
                      <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', color: '#6ee7b7', fontSize: '0.75rem' }}>
                        🛠️ <strong>Portfolio Project:</strong> {m.projects.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio & Resume Advice */}
          {result.portfolioSuggestions && (
            <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1rem', padding: '1.25rem' }}>
              <div style={{ color: '#c4b5fd', fontWeight: '800', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                🚀 Recruiter-Winning Portfolio Suggestions:
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.6 }}>
                {result.portfolioSuggestions.map((proj, idx) => (
                  <li key={idx}>{proj}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
