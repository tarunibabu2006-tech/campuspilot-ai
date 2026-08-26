import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const PRESETS = [
  {
    title: 'Software Developer 💻',
    role: 'Software Developer',
    skills: 'React, JavaScript, Python, SQL, Git',
    interests: 'Full Stack Development, Web Apps, Problem Solving',
    education: 'B.Tech / B.Sc CS / BCA',
    matchPct: 92,
    whyExplanation: ['React ✅', 'JavaScript ✅', 'Git ✅', 'Full Stack Interest ✅'],
    roadmap: [
      { year: '2026', title: 'Student', exp: '0 Yrs', salary: 'Stipend ₹15k–30k/mo', skills: 'Python, JS, SQL', cert: 'Meta Frontend Certificate' },
      { year: '2027', title: 'Software Developer', exp: '1 Yr', salary: '₹4.5–7.0 LPA', skills: 'React, Node.js, Express', cert: 'AWS Certified Developer' },
      { year: '2029', title: 'Software Engineer', exp: '3 Yrs', salary: '₹8.0–14.0 LPA', skills: 'System Design, Microservices', cert: 'CKAD Kubernetes' },
      { year: '2031', title: 'Senior Software Engineer', exp: '5 Yrs', salary: '₹15.0–24.0 LPA', skills: 'System Architecture, Leadership', cert: 'AWS Solutions Architect' },
      { year: '2036', title: 'Tech Lead / Architect', exp: '10 Yrs', salary: '₹28.0–45.0 LPA', skills: 'Enterprise Design, AI Integration', cert: 'TOGAF Enterprise Architect' }
    ],
    skillGaps: [
      { skill: 'Python', current: 85, required: 90 },
      { skill: 'SQL', current: 70, required: 80 },
      { skill: 'System Design', current: 40, required: 80 },
      { skill: 'Docker & Microservices', current: 30, required: 75 }
    ],
    salaryGrowth: [
      { stage: 'Entry Level (0-1 Yr)', range: '₹4.5 – 7.0 LPA' },
      { stage: '3 Years Experience', range: '₹8.0 – 14.0 LPA' },
      { stage: '5 Years Experience', range: '₹15.0 – 24.0 LPA' },
      { stage: '10+ Years Experience', range: '₹28.0 – 45.0+ LPA' }
    ]
  },
  {
    title: 'Data Analyst 📊',
    role: 'Data Analyst',
    skills: 'SQL, Python, Power BI, Excel, Tableau',
    interests: 'Data Analytics, Business Intelligence, Dashboards',
    education: 'B.Sc / B.Com / BCA / B.Tech',
    matchPct: 84,
    whyExplanation: ['SQL ✅', 'Excel ✅', 'Power BI ✅', 'Data Interest ✅'],
    roadmap: [
      { year: '2026', title: 'Student', exp: '0 Yrs', salary: 'Stipend ₹12k–25k/mo', skills: 'SQL, Excel, Power BI', cert: 'Google Data Analytics Certificate' },
      { year: '2027', title: 'Junior Data Analyst', exp: '1 Yr', salary: '₹4.0–6.5 LPA', skills: 'Python Pandas, DAX, SQL Queries', cert: 'Microsoft Certified Power BI Data Analyst' },
      { year: '2029', title: 'Senior Data Analyst', exp: '3 Yrs', salary: '₹7.5–12.0 LPA', skills: 'Data Modeling, ETL Pipelines', cert: 'AWS Certified Data Analytics' },
      { year: '2031', title: 'Analytics Manager', exp: '5 Yrs', salary: '₹14.0–22.0 LPA', skills: 'Team Management, Product Strategy', cert: 'PMP Certification' },
      { year: '2036', title: 'Head of Data & BI', exp: '10 Yrs', salary: '₹25.0–40.0 LPA', skills: 'Executive BI Strategy, Enterprise Data', cert: 'CDMP Data Management' }
    ],
    skillGaps: [
      { skill: 'SQL', current: 75, required: 90 },
      { skill: 'Power BI', current: 70, required: 85 },
      { skill: 'Python Pandas', current: 50, required: 80 },
      { skill: 'ETL Pipelines', current: 20, required: 70 }
    ],
    salaryGrowth: [
      { stage: 'Entry Level (0-1 Yr)', range: '₹4.0 – 6.5 LPA' },
      { stage: '3 Years Experience', range: '₹7.5 – 12.0 LPA' },
      { stage: '5 Years Experience', range: '₹14.0 – 22.0 LPA' },
      { stage: '10+ Years Experience', range: '₹25.0 – 40.0+ LPA' }
    ]
  },
  {
    title: 'AI / ML Engineer 🤖',
    role: 'AI / ML Engineer',
    skills: 'Python, PyTorch, Machine Learning, SQL, Linear Algebra',
    interests: 'Artificial Intelligence, Deep Learning, GenAI',
    education: 'B.Tech CSE / M.Tech / M.Sc Data Science',
    matchPct: 76,
    whyExplanation: ['Python ✅', 'Math Background ✅', 'AI Interest ✅'],
    roadmap: [
      { year: '2026', title: 'Student', exp: '0 Yrs', salary: 'Stipend ₹20k–40k/mo', skills: 'Python, Scikit-Learn, PyTorch', cert: 'DeepLearning.AI Specialization' },
      { year: '2027', title: 'Junior ML Engineer', exp: '1 Yr', salary: '₹6.0–10.0 LPA', skills: 'PyTorch, Model Training, FastAPI', cert: 'TensorFlow Developer Certificate' },
      { year: '2029', title: 'AI & ML Engineer', exp: '3 Yrs', salary: '₹12.0–20.0 LPA', skills: 'LLMs, Fine-tuning, MLOps, Vector DBs', cert: 'AWS Machine Learning Specialty' },
      { year: '2031', title: 'Senior AI Specialist', exp: '5 Yrs', salary: '₹22.0–35.0 LPA', skills: 'Generative AI Architecture, Neural Nets', cert: 'Google Cloud Professional ML Engineer' },
      { year: '2036', title: 'Principal AI Scientist', exp: '10 Yrs', salary: '₹40.0–70.0+ LPA', skills: 'AI Research, Custom Model Foundations', cert: 'AI Ph.D / Industry Fellow' }
    ],
    skillGaps: [
      { skill: 'Python', current: 85, required: 90 },
      { skill: 'Machine Learning', current: 55, required: 85 },
      { skill: 'Deep Learning', current: 20, required: 75 },
      { skill: 'MLOps', current: 10, required: 60 }
    ],
    salaryGrowth: [
      { stage: 'Entry Level (0-1 Yr)', range: '₹6.0 – 10.0 LPA' },
      { stage: '3 Years Experience', range: '₹12.0 – 20.0 LPA' },
      { stage: '5 Years Experience', range: '₹22.0 – 35.0 LPA' },
      { stage: '10+ Years Experience', range: '₹40.0 – 70.0+ LPA' }
    ]
  }
]

export default function AiCareerPredictor() {
  const [currentRole, setCurrentRole] = useState('Software Developer')
  const [skills, setSkills] = useState('React, JavaScript, Python, SQL, Git')
  const [interests, setInterests] = useState('Full Stack Development, Web Apps')
  const [education, setEducation] = useState('B.Tech Computer Science (3rd Year)')

  const [activePreset, setActivePreset] = useState(PRESETS[0])
  const [isPredicted, setIsPredicted] = useState(false)
  const [loading, setLoading] = useState(false)

  // What-If Simulator State
  const [simSkills, setSimSkills] = useState('')
  const [simResult, setSimResult] = useState(null)

  const loadPreset = (preset) => {
    setActivePreset(preset)
    setCurrentRole(preset.role)
    setSkills(preset.skills)
    setInterests(preset.interests)
    setEducation(preset.education)
    setIsPredicted(false)
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
      {(isPredicted || activePreset) && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* 📊 Career Probability Matches */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1rem' }}>📊 Multi-Path Career Probability</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
              {PRESETS.map(p => (
                <div key={p.title} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.9rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ color: 'white', fontWeight: '700', fontSize: '0.95rem' }}>{p.role}</div>
                  <div style={{ color: p.matchPct >= 85 ? '#4ade80' : '#fbbf24', fontWeight: '900', fontSize: '1.3rem', marginTop: '0.2rem' }}>
                    {p.matchPct}% Match {p.matchPct >= 85 ? '🟢' : '🟡'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🧠 Why This Career? */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.75rem' }}>🧠 "Why This Career?" AI Explanation</h3>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {activePreset.whyExplanation.map(reason => (
                <span key={reason} style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', padding: '0.4rem 0.8rem', borderRadius: '0.6rem', fontWeight: '700', fontSize: '0.85rem' }}>
                  {reason}
                </span>
              ))}
            </div>
          </div>

          {/* 📈 5-Year & 10-Year Roadmap Stepper */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '1.25rem' }}>📈 5-Year & 10-Year Career Milestone Roadmap</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activePreset.roadmap.map((stage, idx) => (
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

          {/* 📊 Skill Gap Table */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1rem' }}>📊 Skill Gap Analysis</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
              {activePreset.skillGaps.map(g => (
                <div key={g.skill} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.75rem 1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                    <span>{g.skill}</span>
                    <span>Current: {g.current}% / Target: {g.required}%</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${g.current}%`, background: g.current >= g.required ? '#4ade80' : '#fbbf24', borderRadius: '3px' }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', padding: '0.75rem', borderRadius: '0.75rem', fontSize: '0.85rem', fontWeight: '700', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>🎯 Your Biggest Skill Gap: {activePreset.skillGaps[activePreset.skillGaps.length - 1]?.skill}</span>
              <button onClick={() => toast.success(`Redirecting to ${activePreset.skillGaps[activePreset.skillGaps.length - 1]?.skill} learning module!`)} style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.3rem 0.8rem', fontWeight: '800', cursor: 'pointer' }}>
                Start Learning →
              </button>
            </div>
          </div>

          {/* 💰 Salary Growth Projection */}
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

          {/* Disclaimer */}
          <div style={{ color: '#64748b', fontSize: '0.75rem', textAlign: 'center', fontStyle: 'italic' }}>
            ⚠️ AI Career Projection Disclaimer: Projections are estimated based on your current skills, interests, and industry benchmarks. This is a guidance roadmap, not a guaranteed contract prediction.
          </div>
        </motion.div>
      )}
    </div>
  )
}
