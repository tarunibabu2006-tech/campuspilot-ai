import React, { useState, useEffect } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'

function AiCareerPredictor() {
  const [currentRole, setCurrentRole] = useState('Frontend Developer')
  const [skills, setSkills] = useState('React, JavaScript, CSS, HTML, Git')
  const [interests, setInterests] = useState('Full Stack, System Design, AI Integration')
  const [education, setEducation] = useState('B.Tech Computer Science (3rd Year)')
  const [careerPath, setCareerPath] = useState([])
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)

  const presetRoles = [
    { title: 'Frontend Developer', skills: 'React, TypeScript, CSS, Redux, REST APIs', interests: 'UI/UX, Full Stack, Web3' },
    { title: 'Backend Developer', skills: 'Node.js, Express, MongoDB, PostgreSQL, Docker', interests: 'Microservices, Distributed Systems, Cloud' },
    { title: 'AI & Data Scientist', skills: 'Python, PyTorch, Scikit-learn, SQL, Pandas', interests: 'LLMs, Computer Vision, MLOps' },
    { title: 'Cloud & DevOps Engineer', skills: 'AWS, Kubernetes, Docker, Terraform, CI/CD', interests: 'Site Reliability, Infrastructure as Code' },
    { title: 'Cybersecurity Analyst', skills: 'Network Security, Ethical Hacking, Linux, Cryptography', interests: 'Penetration Testing, SOC Analysis' }
  ]

  useEffect(() => {
    fetchCareerPath()
  }, [])

  const fetchCareerPath = async () => {
    try {
      const response = await api.get('/career-predictor/path')
      if (response.data.careerPath && response.data.careerPath.length > 0) {
        setCareerPath(response.data.careerPath)
      }
    } catch (error) {
      console.warn('Could not load saved career path:', error.message)
    }
  }

  const handlePredict = async () => {
    if (!currentRole.trim() || !skills.trim()) {
      toast.error('Please enter your current role and skills!')
      return
    }

    setLoading(true)
    try {
      const response = await api.post('/career-predictor/predict', {
        currentRole: currentRole.trim(),
        skills: skills.split(',').map(s => s.trim()).filter(Boolean),
        interests: interests.split(',').map(i => i.trim()).filter(Boolean),
        education: education.trim()
      })

      setCareerPath(response.data.careerPath || [])
      setSummary(response.data.summary || '')
      toast.success('5-Year & 10-Year Career Roadmap Generated! 🔮')
    } catch (error) {
      toast.error('Prediction failed. Please try again.')
    }
    setLoading(false)
  }

  const applyPreset = (preset) => {
    setCurrentRole(preset.title)
    setSkills(preset.skills)
    setInterests(preset.interests)
    toast.success(`Loaded ${preset.title} profile preset!`)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #311042 50%, #0f172a 100%)',
        border: '1px solid rgba(168, 85, 247, 0.4)',
        boxShadow: '0 8px 32px rgba(168, 85, 247, 0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.8rem' }}>🔮</span>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.75rem', color: '#fff', fontWeight: 800 }}>
                AI Career Predictor
              </h2>
              <p style={{ margin: '0.25rem 0 0', color: '#c084fc', fontSize: '0.95rem' }}>
                AI-Driven 5-Year &amp; 10-Year Trajectory, Salary Projections &amp; Certifications
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-info">🇮🇳 India #1 AI Engine</span>
            <span className="badge badge-success">💰 Salary Benchmarks</span>
            <span className="badge badge-warning">📜 Top Certifications</span>
          </div>
        </div>
      </div>

      {/* Input Form & Presets Grid */}
      <div className="grid grid-2" style={{ gap: '1.5rem' }}>
        {/* Profile Inputs */}
        <div className="card">
          <h3 style={{ color: 'var(--text-primary)', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📋</span> Enter Your Profile
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="form-label">🎯 Current Role / Aspirations</label>
              <input
                type="text"
                className="form-input"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                placeholder="e.g. Frontend Developer, Data Engineer"
              />
            </div>

            <div>
              <label className="form-label">🛠️ Current Skills <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>(comma separated)</span></label>
              <input
                type="text"
                className="form-input"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, JavaScript, Python, SQL"
              />
            </div>

            <div>
              <label className="form-label">💡 Career Interests &amp; Domains</label>
              <input
                type="text"
                className="form-input"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="Cloud, System Design, Generative AI, Leadership"
              />
            </div>

            <div>
              <label className="form-label">🎓 Current Education / Year</label>
              <input
                type="text"
                className="form-input"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="B.Tech Computer Science (3rd Year)"
              />
            </div>

            <button
              onClick={handlePredict}
              disabled={loading}
              className="btn btn-primary"
              style={{
                background: 'linear-gradient(135deg, #9333ea 0%, #4f46e5 100%)',
                padding: '0.85rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                marginTop: '0.5rem',
                boxShadow: '0 4px 15px rgba(147, 51, 234, 0.4)'
              }}
            >
              {loading ? '🔮 Forecasting Career Trajectory...' : 'Predict 5-Year & 10-Year Path 🔮'}
            </button>
          </div>
        </div>

        {/* Quick Role Presets & AI Capabilities */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card">
            <h4 style={{ color: 'var(--text-primary)', marginTop: 0, marginBottom: '0.75rem', fontSize: '0.95rem' }}>
              ⚡ 1-Click Role Presets
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {presetRoles.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => applyPreset(preset)}
                  className="btn btn-outline"
                  style={{
                    textAlign: 'left',
                    justifyContent: 'space-between',
                    padding: '0.6rem 0.85rem',
                    fontSize: '0.85rem',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#f0f2f8' }}>🚀 {preset.title}</span>
                  <span style={{ fontSize: '0.75rem', color: '#a855f7' }}>Load Preset →</span>
                </button>
              ))}
            </div>
          </div>

          <div className="card" style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ color: '#38bdf8', marginTop: 0, marginBottom: '0.5rem', fontSize: '0.95rem' }}>
              🧠 Multi-Agent Career Analysis
            </h4>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>
              <li><strong>Resume Agent:</strong> Evaluates skill match with Fortune 500 tech standards.</li>
              <li><strong>Salary Agent:</strong> Compares Bangalore, Hyderabad &amp; Global compensation benchmarks.</li>
              <li><strong>Growth Agent:</strong> Maps promotions from Junior → Mid → Senior → Staff/Architect.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Career Roadmap Output */}
      {careerPath && careerPath.length > 0 && (
        <div className="card" style={{ border: '1px solid rgba(168, 85, 247, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.4rem', fontWeight: 700 }}>
                📈 Predicted Career Roadmap &amp; Milestones
              </h3>
              {summary && (
                <p style={{ margin: '0.25rem 0 0', color: '#c084fc', fontSize: '0.9rem' }}>
                  {summary}
                </p>
              )}
            </div>
            <button
              onClick={() => window.print()}
              className="btn btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
            >
              🖨️ Export PDF
            </button>
          </div>

          {/* Timeline Stages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {careerPath.map((stage, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  position: 'relative',
                  overflow: 'hidden',
                  borderLeft: `4px solid ${idx === 0 ? '#3b82f6' : idx === 1 ? '#10b981' : idx === 2 ? '#f59e0b' : '#a855f7'}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className="badge badge-info" style={{ fontWeight: 'bold' }}>
                      {stage.stage}
                    </span>
                    <h4 style={{ margin: 0, color: '#f0f2f8', fontSize: '1.15rem', fontWeight: 700 }}>
                      {stage.role}
                    </h4>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>⏳ {stage.timeline}</span>
                    {stage.salary && (
                      <span className="badge badge-safe" style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                        💵 {stage.salary}
                      </span>
                    )}
                  </div>
                </div>

                {/* Skills Row */}
                <div style={{ marginTop: '0.5rem' }}>
                  <p style={{ margin: '0 0 0.35rem 0', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600 }}>
                    🛠️ Mandatory Skills to Master:
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {stage.skills?.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        style={{
                          background: 'rgba(59, 130, 246, 0.15)',
                          color: '#60a5fa',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 500
                        }}
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications Row */}
                {stage.certifications && stage.certifications.length > 0 && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <p style={{ margin: '0 0 0.35rem 0', color: '#fbbf24', fontSize: '0.8rem', fontWeight: 600 }}>
                      📜 Recommended Industry Certifications:
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {stage.certifications.map((cert, cIdx) => (
                        <span
                          key={cIdx}
                          style={{
                            background: 'rgba(245, 158, 11, 0.12)',
                            color: '#fbbf24',
                            border: '1px solid rgba(245, 158, 11, 0.3)',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '6px',
                            fontSize: '0.8rem'
                          }}
                        >
                          ⭐ {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AiCareerPredictor
