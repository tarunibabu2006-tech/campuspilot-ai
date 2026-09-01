import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../services/api'
import toast from 'react-hot-toast'
import Autocomplete from './Common/Autocomplete'
import { masterRoles, masterSkills, masterDegrees } from '../data/masterData'

const GPS_CAREER_PRESETS = [
  {
    role: 'AI / Large Language Model (LLM) Architect',
    icon: '🤖',
    avgSalary: '₹18 - 42 LPA',
    marketDemand: '🔥 Ultra High (32k+ Openings)',
    timeToReach: '4 - 6 Months',
    topHirers: ['Google DeepMind', 'Microsoft', 'NVIDIA', 'OpenAI', 'Zomato AI', 'Jio AI'],
    checkpoints: [
      { step: 1, title: 'Python & Linear Algebra Fundamentals', duration: '3 Weeks', focus: 'Vector math, PyTorch tensors, NumPy optimization' },
      { step: 2, title: 'Deep Learning & Transformer Networks', duration: '4 Weeks', focus: 'Self-attention, BERT, GPT architecture, HuggingFace' },
      { step: 3, title: 'RAG & Vector Search Engineering', duration: '3 Weeks', focus: 'Pinecone, ChromaDB, LangChain, Hybrid search' },
      { step: 4, title: 'Fine-Tuning & Quantization (LoRA / vLLM)', duration: '4 Weeks', focus: 'PEFT, LoRA, DeepSpeed, Ollama production serving' },
      { step: 5, title: 'Multi-Agent Swarms & Enterprise Deployment', duration: '3 Weeks', focus: 'LangGraph, CrewAI, Docker, Kubernetes, Fast inference' }
    ]
  },
  {
    role: 'Full Stack Cloud SaaS Engineer',
    icon: '💻',
    avgSalary: '₹10 - 25 LPA',
    marketDemand: '⚡ Very High (55k+ Openings)',
    timeToReach: '3 - 5 Months',
    topHirers: ['Amazon', 'Flipkart', 'Atlassian', 'Swiggy', 'Freshworks', 'Zoho'],
    checkpoints: [
      { step: 1, title: 'Modern Frontend & TypeScript Mastery', duration: '3 Weeks', focus: 'React 18+, Next.js App Router, TailwindCSS, State store' },
      { step: 2, title: 'Scalable Backend APIs & Microservices', duration: '4 Weeks', focus: 'Node.js, Express, Go/Python, REST & GraphQL' },
      { step: 3, title: 'Databases & Caching at Scale', duration: '3 Weeks', focus: 'PostgreSQL indexing, MongoDB, Redis caching, Prisma' },
      { step: 4, title: 'Cloud Infrastructure & CI/CD', duration: '3 Weeks', focus: 'Docker, AWS ECS/S3, GitHub Actions, Vercel/Render' },
      { step: 5, title: 'Production Capstone SaaS Application', duration: '3 Weeks', focus: 'Stripe payments, Auth0/OAuth, Telemetry, Monitoring' }
    ]
  },
  {
    role: 'Cloud DevOps & Site Reliability Engineer',
    icon: '☁️',
    avgSalary: '₹12 - 28 LPA',
    marketDemand: '📈 High Demand (28k+ Openings)',
    timeToReach: '3 - 5 Months',
    topHirers: ['Oracle Cloud', 'Cisco', 'Adobe', 'TCS Digital', 'Infosys Cobalt', 'Wipro'],
    checkpoints: [
      { step: 1, title: 'Linux Deep-Dive & Shell Automation', duration: '2 Weeks', focus: 'Bash scripting, systemd, networking, permissions' },
      { step: 2, title: 'Containerization & Docker Orchestration', duration: '3 Weeks', focus: 'Multi-stage Dockerfiles, compose, security scanning' },
      { step: 3, title: 'Kubernetes Cluster Administration (CKA)', duration: '5 Weeks', focus: 'Pods, Deployments, Ingress, Helm charts, EKS/GKE' },
      { step: 4, title: 'Infrastructure as Code (Terraform)', duration: '3 Weeks', focus: 'Terraform modules, state locking, AWS cloud resources' },
      { step: 5, title: 'Observability & GitOps Pipelines', duration: '3 Weeks', focus: 'Prometheus, Grafana, ArgoCD, Alertmanager, SRE drills' }
    ]
  },
  {
    role: 'Autonomous Drone & Robotics Engineer',
    icon: '🦾',
    avgSalary: '₹10 - 24 LPA',
    marketDemand: '🚀 Rapid Growth (14k+ Openings)',
    timeToReach: '4 - 6 Months',
    topHirers: ['ideaForge', 'Garuda Aerospace', 'Tonbo Imaging', 'DRDO', 'ISRO', 'Ola Electric'],
    checkpoints: [
      { step: 1, title: 'C++ & ROS 2 Middleware Architecture', duration: '4 Weeks', focus: 'ROS 2 nodes, topics, services, actions, C++20' },
      { step: 2, title: 'Computer Vision & Point Cloud Processing', duration: '4 Weeks', focus: 'OpenCV, YOLOv10 object detection, LiDAR clouds' },
      { step: 3, title: 'SLAM & Autonomous Navigation (Nav2)', duration: '4 Weeks', focus: 'Cartographer SLAM, Costmaps, Path planning, Gazebo' },
      { step: 4, title: 'Hardware Integration & Sensor Fusion', duration: '3 Weeks', focus: 'IMU, GPS, Extended Kalman Filters, Motor controllers' }
    ]
  }
]

export default function CareerGps() {
  const [currentSkills, setCurrentSkills] = useState('Python, JavaScript, SQL')
  const [targetRole, setTargetRole] = useState('AI / Large Language Model (LLM) Architect')
  const [experience, setExperience] = useState('0')
  const [education, setEducation] = useState('B.Tech / B.E Computer Science')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const handleSelectPreset = (p) => {
    setTargetRole(p.role)
    toast.success(`GPS Route set to: ${p.role} 📍`)
  }

  const buildLocalGpsRoute = () => {
    const preset = GPS_CAREER_PRESETS.find(p => p.role.toLowerCase() === targetRole.toLowerCase())
    const currSkillsArr = currentSkills.split(',').map(s => s.trim()).filter(Boolean)

    if (preset) {
      return {
        targetRole: preset.role,
        matchPercentage: Math.min(85, Math.max(35, currSkillsArr.length * 15)),
        avgSalary: preset.avgSalary,
        marketDemand: preset.marketDemand,
        timeToReach: preset.timeToReach,
        topHirers: preset.topHirers,
        checkpoints: preset.checkpoints,
        missingSkills: ['Advanced Scalability Architecture', 'Distributed Systems', 'System Design Optimization'],
        certifications: ['AWS Certified Solutions Architect', 'AGY DeepTech Professional Cert', 'GitHub Foundations']
      }
    }

    return {
      targetRole,
      matchPercentage: Math.min(80, Math.max(40, currSkillsArr.length * 12)),
      avgSalary: '₹9 - 22 LPA',
      marketDemand: '⚡ Active Market Demand (18,000+ Jobs)',
      timeToReach: '3 - 5 Months',
      topHirers: ['TCS', 'Infosys', 'Accenture', 'Cognizant', 'Google', 'Microsoft'],
      checkpoints: [
        { step: 1, title: 'Foundations & Tooling Mastery', duration: '3 Weeks', focus: 'Core syntax, industry toolchains, version control' },
        { step: 2, title: 'Intermediate Specialization & Frameworks', duration: '4 Weeks', focus: 'Core frameworks, API integrations, databases' },
        { step: 3, title: 'Advanced Production Best Practices', duration: '4 Weeks', focus: 'Cloud deployment, testing, performance profiling' },
        { step: 4, title: 'Capstone Portfolio & Interview Readiness', duration: '3 Weeks', focus: 'Showcase project, system design interview prep' }
      ],
      missingSkills: ['Cloud Infrastructure', 'System Design', 'Production Testing'],
      certifications: ['Industry Recognized Professional Certificate', 'Domain Specialization Badge']
    }
  }

  const analyzeCareerPath = async () => {
    if (!currentSkills.trim()) {
      toast.error('Please enter your current skills!')
      return
    }
    if (!targetRole.trim()) {
      toast.error('Please select or type your target dream role!')
      return
    }

    setLoading(true)
    try {
      const r = await api.post('/career-gps/analyze', {
        currentSkills: currentSkills.split(',').map(s => s.trim()).filter(Boolean),
        targetRole,
        experience,
        education
      })
      if (r && r.data && r.data.targetRole) {
        setResult(r.data)
      } else {
        setResult(buildLocalGpsRoute())
      }
      setStep(2)
      toast.success('🗺️ Career GPS Route Calculated!')
    } catch {
      setResult(buildLocalGpsRoute())
      setStep(2)
      toast.success('🗺️ AI Career GPS Route Ready!')
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
          <span style={{ fontSize: '2.5rem' }}>🗺️</span>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
              Career GPS Navigation System
            </h1>
            <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
              Current Skills (Origin) ➔ Dream Role (Destination). Step-by-step milestone checkpoints, hiring companies & salary trajectory.
            </p>
          </div>
        </div>
        <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.4)', padding: '0.4rem 0.9rem', borderRadius: '2rem', fontWeight: '800', fontSize: '0.8rem' }}>
          📍 Turn-by-Turn Career Route
        </span>
      </motion.div>

      {/* ── STEP 1: ROUTE CONFIGURATION ───────────────────────────── */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Quick Preset Routes */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.25rem' }}>
            <div style={{ color: '#c4b5fd', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: '800', marginBottom: '0.65rem' }}>
              📍 Popular Fast-Track Career Destinations (Click to Navigate):
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem' }}>
              {GPS_CAREER_PRESETS.map((p, idx) => {
                const isSelected = targetRole.toLowerCase() === p.role.toLowerCase()
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectPreset(p)}
                    style={{
                      background: isSelected ? 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(37,99,235,0.25))' : 'rgba(255,255,255,0.03)',
                      border: isSelected ? '1.5px solid #8b5cf6' : '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '0.85rem',
                      padding: '1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '1.4rem' }}>{p.icon}</span>
                        <span style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', padding: '0.15rem 0.5rem', borderRadius: '0.35rem', fontSize: '0.7rem', fontWeight: '800' }}>
                          {p.avgSalary}
                        </span>
                      </div>
                      <h4 style={{ color: 'white', fontWeight: '800', fontSize: '0.92rem', margin: '0.3rem 0 0.2rem' }}>
                        {p.role}
                      </h4>
                      <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                        ⏱️ Est. Journey: {p.timeToReach}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Form Input Container */}
          <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '1.25rem', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', color: '#c4b5fd', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                📍 Origin: Your Current Skills
              </label>
              <Autocomplete
                value={currentSkills}
                onChange={setCurrentSkills}
                options={masterSkills}
                multiSelect={true}
                placeholder="Search skills (Python, SQL, React, AWS, Docker)..."
                icon="🛠️"
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#c4b5fd', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                🏁 Destination: Target Dream Role
              </label>
              <Autocomplete
                value={targetRole}
                onChange={setTargetRole}
                options={masterRoles}
                placeholder="Search dream role (LLM Architect, Cloud SRE, Data Scientist)..."
                icon="🎯"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', color: '#c4b5fd', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                  ⏳ Experience Level
                </label>
                <select
                  value={experience}
                  onChange={e => setExperience(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.65rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.88rem' }}
                >
                  <option value="0">Student / Fresher (0 Years)</option>
                  <option value="1">Junior Engineer (1-2 Years)</option>
                  <option value="3">Mid-Level Engineer (3-5 Years)</option>
                  <option value="5">Senior Lead (5+ Years)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', color: '#c4b5fd', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                  🎓 Degree / Educational Background
                </label>
                <Autocomplete
                  value={education}
                  onChange={setEducation}
                  options={masterDegrees}
                  placeholder="e.g. B.Tech Computer Science, B.Sc, BCA..."
                  icon="🎓"
                />
              </div>
            </div>

            <button
              onClick={analyzeCareerPath}
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
              {loading ? '🛰️ Calculating Optimal GPS Route...' : '🗺️ Calculate Fastest Career Route ➔'}
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: CALCULATED GPS ROUTE VIEW ─────────────────────── */}
      {step === 2 && result && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {/* Top Return Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button
              onClick={() => { setStep(1); setResult(null) }}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
                padding: '0.5rem 1.25rem',
                borderRadius: '0.65rem',
                fontWeight: '800',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              ⬅ Change Destination or Skills
            </button>

            <span style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>
              Navigating to: <strong style={{ color: '#60a5fa' }}>{result.targetRole}</strong>
            </span>
          </div>

          {/* Key Trajectory Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '1rem', padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ color: '#4ade80', fontWeight: '900', fontSize: '1.8rem' }}>{result.avgSalary || '₹12 - 28 LPA'}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', marginTop: '0.2rem' }}>Expected Compensation</div>
            </div>

            <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '1rem', padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ color: '#60a5fa', fontWeight: '900', fontSize: '1.8rem' }}>{result.timeToReach || '3 - 5 Months'}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', marginTop: '0.2rem' }}>Estimated Route Duration</div>
            </div>

            <div style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '1rem', padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ color: '#fbbf24', fontWeight: '900', fontSize: '1.8rem' }}>{result.matchPercentage || 60}%</div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', marginTop: '0.2rem' }}>Current Preparedness</div>
            </div>
          </div>

          {/* Hiring Companies Bar */}
          {result.topHirers && (
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1rem 1.25rem' }}>
              <div style={{ color: '#c4b5fd', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '800', marginBottom: '0.5rem' }}>
                🏢 Actively Hiring Employers for {result.targetRole}:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {result.topHirers.map((company, idx) => (
                  <span key={idx} style={{ background: 'rgba(255,255,255,0.06)', color: 'white', padding: '0.3rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: '700', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {company}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Turn-By-Turn GPS Milestone Route */}
          <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '2px solid rgba(139, 92, 246, 0.4)', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.8rem' }}>📍</span>
              <div>
                <h3 style={{ color: 'white', margin: 0, fontWeight: '900', fontSize: '1.3rem' }}>
                  Turn-by-Turn GPS Career Route Milestones
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>
                  Follow each checkpoint systematically to reach full placement eligibility.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}>
              {(result.checkpoints || result.roadmap?.months)?.map((cp, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '1rem',
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem'
                  }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1rem', flexShrink: 0 }}>
                    {idx + 1}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <h4 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem', margin: 0 }}>
                        {cp.title || cp.focus}
                      </h4>
                      <span style={{ background: 'rgba(96,165,250,0.15)', color: '#93c5fd', padding: '0.15rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
                        ⏱️ {cp.duration || `Month ${idx + 1}`}
                      </span>
                    </div>

                    <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: '0 0 0.5rem', lineHeight: 1.5 }}>
                      <strong>Key Focus:</strong> {cp.focus || cp.topics?.join(', ')}
                    </p>

                    {cp.projects && (
                      <div style={{ color: '#4ade80', fontSize: '0.78rem', fontWeight: '700' }}>
                        🛠️ Milestone Project: {Array.isArray(cp.projects) ? cp.projects.join(', ') : cp.projects}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Bar */}
          {result.certifications && (
            <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '1rem', padding: '1.25rem' }}>
              <div style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                🏆 Recommended Resume Credentials:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {result.certifications.map((cert, idx) => (
                  <span key={idx} style={{ background: 'rgba(251,191,36,0.15)', color: '#fef08a', padding: '0.3rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: '700', border: '1px solid rgba(251,191,36,0.3)' }}>
                    🏅 {cert}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
