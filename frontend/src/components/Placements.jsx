import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const domains = [
  'Engineering & Tech', 'Management & Business', 'Design & Creative', 
  'Finance & Banking', 'Healthcare & Medical', 'Legal & Law'
]

const rolesByDomain = {
  'Engineering & Tech': [
    'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Scientist',
    'ML Engineer', 'DevOps Engineer', 'Cloud Engineer', 'Cybersecurity Analyst',
    'Mobile Developer', 'Software Engineer', 'Data Analyst', 'Data Engineer',
    'QA Engineer', 'Network Engineer', 'AI Engineer', 'Blockchain Developer', 'IoT Engineer'
  ],
  'Management & Business': [
    'Product Manager', 'Project Manager', 'Business Analyst', 'Operations Manager',
    'HR Manager', 'Management Consultant', 'Supply Chain Manager', 'Strategy Lead'
  ],
  'Design & Creative': [
    'UI/UX Designer', 'Graphic Designer', 'Video Editor', 'Content Writer',
    '3D Animator', 'Fashion Designer', 'Interior Designer'
  ],
  'Finance & Banking': [
    'Investment Banker', 'Finance Manager', 'Chartered Accountant', 'Tax Consultant',
    'Risk Analyst', 'Equity Research Analyst', 'Commercial Banker'
  ],
  'Healthcare & Medical': [
    'Clinical Research Associate', 'Biomedical Engineer', 'Pharmacist',
    'Healthcare Administrator', 'Public Health Analyst'
  ],
  'Legal & Law': [
    'Corporate Lawyer', 'IP Attorney', 'Legal Advisor', 'Compliance Officer', 'Litigation Associate'
  ]
}

const topCompanies = [
  'Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro', 'Accenture',
  'Goldman Sachs', 'JP Morgan', 'Deloitte', 'McKinsey', 'Flipkart', 'Adobe', 'Zoho', 'Other'
]

function Placements({ language }) {
  const [selectedDomain, setSelectedDomain] = useState('Engineering & Tech')
  const [selectedRole, setSelectedRole] = useState('Full Stack Developer')
  const [company, setCompany] = useState('TCS')
  const [customCompany, setCustomCompany] = useState('')
  const [currentSkills, setCurrentSkills] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    const targetCompany = company === 'Other' ? (customCompany.trim() || 'Tech Company') : company
    setLoading(true)
    try {
      const res = await axios.post('/api/placements', {
        company: targetCompany,
        role: selectedRole,
        currentSkills: currentSkills ? currentSkills.split(',').map(s => s.trim()) : [],
        language
      })
      setResult(res.data)
      toast.success(`Placement roadmap for ${targetCompany} (${selectedRole}) generated! 💼`)
    } catch (err) {
      toast.error('Failed to generate roadmap from server. Using standard template.')
      setResult({
        company: targetCompany,
        role: selectedRole,
        companyInfo: `${targetCompany} is actively hiring for ${selectedRole} positions.`,
        eligibilityCriteria: '60% or 6.5 CGPA with no active backlogs.',
        rounds: [
          { round: 'Round 1: Online Assessment', topics: ['Aptitude', 'Logical Reasoning', 'Domain Specific MCQs'], tips: 'Practice timed mock assessments.' },
          { round: 'Round 2: Technical Interview', topics: ['Core Fundamentals', 'Project Walkthrough', 'Live Problem Solving'], tips: 'Explain your reasoning clearly out loud.' },
          { round: 'Round 3: Managerial / HR Round', topics: ['Behavioral Questions', 'Cultural Fit', 'Scenario Questions'], tips: 'Use the STAR method for situational queries.' }
        ],
        dsaTopics: [
          { topic: 'Key Core Domain Skills', importance: 'high', questionsCount: 15 },
          { topic: 'Practical Implementation', importance: 'high', questionsCount: 10 },
          { topic: 'System & Architecture Basics', importance: 'medium', questionsCount: 8 }
        ],
        resources: [
          { name: 'CampusPilot Skill Hub', url: 'http://localhost:3000', type: 'free' },
          { name: 'Official Documentation & Standards', url: 'https://developer.mozilla.org', type: 'free' }
        ],
        mockQuestions: [
          { question: `What are the core best practices when working as a ${selectedRole}?`, difficulty: 'medium', topic: 'Architecture' },
          { question: `How do you resolve high priority production blockers?`, difficulty: 'hard', topic: 'Problem Solving' }
        ],
        timeline: [
          { week: 1, focus: 'Foundational Review', tasks: ['Review core concepts and definitions', 'Build sample mock project'] },
          { week: 2, focus: 'Interview Drills', tasks: ['Solve 20 practice questions', 'Prepare 3 project case studies'] }
        ],
        salaryRange: '4.5 - 18 LPA (depending on evaluation & tier)'
      })
    }
    setLoading(false)
  }

  return (
    <div className="card">
      <h2 className="card-title">💼 Coding & Placements Center</h2>
      <p className="card-subtitle">50+ Target Roles • Company-Specific Prep • DSA & Domain Roadmaps • Mock Questions</p>

      <div className="form-group" style={{ marginTop: '1.5rem' }}>
        <label className="form-label">1. Choose Domain & Target Role</label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          {domains.map(d => (
            <button
              key={d}
              type="button"
              className={`nav-tab ${selectedDomain === d ? 'active' : ''}`}
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
              onClick={() => {
                setSelectedDomain(d)
                setSelectedRole(rolesByDomain[d][0])
              }}
            >
              {d}
            </button>
          ))}
        </div>

        <select
          className="form-input"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          style={{ marginBottom: '1rem' }}
        >
          {rolesByDomain[selectedDomain]?.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">2. Target Company</label>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          {topCompanies.map(c => (
            <button
              key={c}
              type="button"
              className={`nav-tab ${company === c ? 'active' : ''}`}
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.7rem' }}
              onClick={() => { setCompany(c); setCustomCompany('') }}
            >
              {c}
            </button>
          ))}
        </div>
        {company === 'Other' && (
          <input
            type="text"
            className="form-input"
            placeholder="Type company name (e.g. Swiggy, Zomato, Oracle)..."
            value={customCompany}
            onChange={(e) => setCustomCompany(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />
        )}
      </div>

      <div className="form-group">
        <label className="form-label">3. Your Current Skills / Tech Stack (comma separated)</label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. JavaScript, React, Python, SQL, Communication..."
          value={currentSkills}
          onChange={(e) => setCurrentSkills(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="btn btn-primary"
        style={{ width: '100%', marginTop: '1rem' }}
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? '⏳ Generating Custom Roadmap...' : `🚀 Generate Roadmap for ${company === 'Other' ? (customCompany || 'Company') : company}`}
      </button>

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <div className="card" style={{ background: 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>🎯 {result.company} - {result.role}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{result.companyInfo}</p>
              </div>
              <span className="badge" style={{ background: 'var(--primary-color)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
                💰 Package: {result.salaryRange}
              </span>
            </div>

            <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
              <strong>📋 Eligibility: </strong>
              <span style={{ color: 'var(--text-secondary)' }}>{result.eligibilityCriteria}</span>
            </div>

            {/* Rounds */}
            <h4 style={{ marginTop: '1.5rem', marginBottom: '0.75rem', color: '#a5b4fc' }}>🔄 Selection Rounds & Strategy</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {result.rounds?.map((r, i) => (
                <div key={i} style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h5 style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{r.round}</h5>
                  <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem', paddingLeft: '1.2rem' }}>
                    {r.topics?.map((t, ti) => <li key={ti}>{t}</li>)}
                  </ul>
                  <p style={{ fontSize: '0.8rem', color: '#818cf8', marginTop: '0.5rem', fontStyle: 'italic' }}>💡 {r.tips}</p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <h4 style={{ marginTop: '1.5rem', marginBottom: '0.75rem', color: '#a5b4fc' }}>📅 Preparation Timeline</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {result.timeline?.map((tl, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderRadius: '8px' }}>
                  <div style={{ minWidth: '80px', fontWeight: 'bold', color: 'var(--primary-color)' }}>Week {tl.week}</div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>{tl.focus}</strong>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{tl.tasks?.join(' • ')}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mock Questions */}
            {result.mockQuestions && result.mockQuestions.length > 0 && (
              <>
                <h4 style={{ marginTop: '1.5rem', marginBottom: '0.75rem', color: '#a5b4fc' }}>❓ Sample Technical Interview Questions</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {result.mockQuestions.map((q, i) => (
                    <div key={i} style={{ padding: '0.75rem', background: 'rgba(15,23,42,0.5)', borderRadius: '8px', borderLeft: '4px solid var(--primary-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{q.question}</span>
                        <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}>
                          {q.difficulty || 'medium'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Placements
