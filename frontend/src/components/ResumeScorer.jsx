import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import api from '../services/api'
import Autocomplete from './Common/Autocomplete'
import { masterRoles } from '../data/masterData'
import { analyzeResumeATS } from '../utils/atsEngine'

const GRADE_COLORS = {
  'A+': '#10b981',
  'A': '#34d399',
  'B+': '#3b82f6',
  'B': '#60a5fa',
  'C': '#f59e0b',
  'D': '#ef4444'
}

function ScoreRing({ score }) {
  const circumference = 2 * Math.PI * 45
  const strokeDash = (score / 100) * circumference
  const color = score >= 80 ? '#10b981' : score >= 60 ? '#3b82f6' : score >= 40 ? '#f59e0b' : '#ef4444'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <svg width="130" height="130" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="65" cy="65" r="45" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <circle
          cx="65" cy="65" r="45" fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={`${strokeDash} ${circumference}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      <div style={{ marginTop: '-90px', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', fontWeight: '900', color }}>{score}</div>
        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>/ 100</div>
      </div>
      <div style={{ marginTop: '55px' }} />
    </div>
  )
}

export default function ResumeScorer() {
  const [resumeText, setResumeText] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef(null)

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    const reader = new FileReader()

    if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      reader.onload = (event) => {
        const content = event.target?.result
        if (typeof content === 'string') {
          setResumeText(content)
          toast.success(`Loaded ${file.name} successfully!`)
        }
      }
      reader.readAsText(file)
    } else {
      // For PDF or binary docs, read text extraction or notify user
      reader.onload = (event) => {
        const content = event.target?.result
        if (typeof content === 'string') {
          // Clean simple binary-to-text printable characters
          const printable = content.replace(/[^\x20-\x7E\n\r\t]/g, ' ').replace(/\s+/g, ' ')
          if (printable.length > 50) {
            setResumeText(printable)
            toast.success(`Extracted text from ${file.name}!`)
          } else {
            toast.success(`File attached. Please also verify/paste text if needed.`)
          }
        }
      }
      reader.readAsText(file)
    }
  }

  const analyze = async () => {
    if (!resumeText.trim() || resumeText.length < 30) {
      toast.error('Please paste at least 30 characters of your resume!')
      return
    }

    setLoading(true)
    try {
      // 1. Compute real client-side ATS analysis
      const localResult = analyzeResumeATS(resumeText, targetRole)

      // 2. Call backend for enriched analysis
      try {
        const r = await api.post('/resume-score/analyze', { resumeText, targetRole })
        if (r.data && typeof r.data.score === 'number') {
          setResult(r.data)
        } else {
          setResult(localResult)
        }
      } catch (err) {
        // Fallback gracefully to the real deterministic ATS engine
        setResult(localResult)
      }

      toast.success('Resume ATS check complete! 📊')
    } catch (err) {
      console.error(err)
      toast.error('Analysis failed. Please try again.')
    }
    setLoading(false)
  }

  const sectionColors = {
    contact: '#3b82f6',
    summary: '#8b5cf6',
    skills: '#10b981',
    experience: '#f59e0b',
    education: '#06b6d4',
    projects: '#ec4899',
    certifications: '#a78bfa'
  }

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem' }}>
      {/* ── HEADER BANNER ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #065f46 45%, #0f172a 100%)',
          border: '1px solid rgba(16,185,129,0.4)',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(16,185,129,0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>📊</span>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900', color: '#fff' }}>
                AI ATS Resume Scanner & Real Match Analyzer
              </h1>
              <p style={{ margin: '0.25rem 0 0', color: '#a7f3d0', fontSize: '0.88rem' }}>
                100% Real ATS Parser · Keyword Matching · Quantified Metrics · Section Breakdown · Zero Fake Scores
              </p>
            </div>
          </div>
        </div>
        <span style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', padding: '0.4rem 1rem', borderRadius: '2rem', fontWeight: '800', fontSize: '0.85rem' }}>
          ATS Engine v2026
        </span>
      </motion.div>

      {/* ── INPUT WORKSPACE ────────────────────────────────────────── */}
      {!result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '1.25rem',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h3 style={{ margin: 0, color: 'white', fontWeight: '800', fontSize: '1.15rem' }}>
              📋 Paste Resume Text or Upload File
            </h3>

            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".txt,.pdf,.doc,.docx,.md"
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: '#cbd5e1',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '0.6rem',
                  padding: '0.45rem 0.9rem',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                📁 {fileName ? fileName : 'Upload Resume (.txt, .pdf, .docx)'}
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.82rem', marginBottom: '0.4rem', fontWeight: '600' }}>
              Resume Text Content:
            </label>
            <textarea
              value={resumeText}
              onChange={e => setResumeText(e.target.value)}
              style={{
                width: '100%',
                height: '240px',
                resize: 'vertical',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '0.75rem',
                padding: '1rem',
                color: 'white',
                outline: 'none',
                lineHeight: 1.5
              }}
              placeholder="Paste your full resume text here...&#10;&#10;Name: Rahul Sharma&#10;Email: rahul.sharma@email.com | Phone: +91 9876543210&#10;LinkedIn: linkedin.com/in/rahul | GitHub: github.com/rahul&#10;&#10;SUMMARY:&#10;Final year B.Tech CSE student passionate about scalable web architectures and Python/React development...&#10;&#10;SKILLS:&#10;Python, Java, React, SQL, DSA, Git, REST API, Docker&#10;&#10;PROJECTS:&#10;CampusPilot AI: Developed a real-time placement portal serving 500+ users, reducing query latency by 35% using Redis caching...&#10;&#10;EDUCATION:&#10;B.Tech CSE, 2022-2026, CGPA: 8.8"
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.82rem', marginBottom: '0.4rem', fontWeight: '600' }}>
              🎯 Target Placement Role <span style={{ color: '#64748b' }}>(Select to compare role-specific keywords)</span>
            </label>
            <Autocomplete
              value={targetRole}
              onChange={setTargetRole}
              options={masterRoles}
              placeholder="Search target role (e.g. Software Development Engineer, Full Stack Developer, Data Analyst)..."
              icon="🎯"
            />
          </div>

          <button
            onClick={analyze}
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.9rem',
              borderRadius: '0.75rem',
              background: loading ? '#374151' : 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              fontWeight: '900',
              fontSize: '1rem',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(16,185,129,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {loading ? '🔍 Running ATS Parsing Algorithms...' : '🔍 Analyze Resume with Real ATS Scanner'}
          </button>
        </motion.div>
      )}

      {/* ── ATS ANALYSIS RESULTS ───────────────────────────────────── */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <button
            onClick={() => { setResult(null); setResumeText(''); setFileName('') }}
            style={{
              alignSelf: 'flex-start',
              background: 'rgba(255,255,255,0.08)',
              color: '#cbd5e1',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '0.65rem',
              padding: '0.5rem 1.1rem',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            ← Analyze Another Resume
          </button>

          {/* 1. Score Overview Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(30,27,75,0.9), rgba(15,23,42,0.95))',
              border: '1px solid rgba(139,92,246,0.3)',
              borderRadius: '1.25rem',
              padding: '1.75rem',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '2rem',
              alignItems: 'center'
            }}
          >
            <ScoreRing score={result.score || 0} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900', color: 'white' }}>
                  ATS Score & Rating
                </h3>
                <span
                  style={{
                    background: GRADE_COLORS[result.grade] || '#6366f1',
                    color: '#fff',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.88rem',
                    fontWeight: '900'
                  }}
                >
                  Grade {result.grade}
                </span>
              </div>

              <p style={{ color: '#cbd5e1', margin: '0 0 1rem', fontSize: '0.92rem', lineHeight: 1.6 }}>
                {result.overallFeedback}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>ATS Compatibility:</span>
                  <div style={{ width: '140px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', height: '8px', overflow: 'hidden' }}>
                    <div style={{ width: `${result.atsCompatibility || 0}%`, background: '#3b82f6', height: '100%', borderRadius: '8px' }} />
                  </div>
                  <span style={{ color: '#60a5fa', fontSize: '0.85rem', fontWeight: '800' }}>
                    {result.atsCompatibility}%
                  </span>
                </div>

                {result.metricsCount !== undefined && (
                  <span style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', padding: '0.2rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '700' }}>
                    🔢 {result.metricsCount} Quantified Metrics Detected
                  </span>
                )}
                {result.wordCount !== undefined && (
                  <span style={{ background: 'rgba(255,255,255,0.06)', color: '#cbd5e1', padding: '0.2rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '700' }}>
                    📝 {result.wordCount} Total Words
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 2. Section Breakdown */}
          {result.sections && (
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1.25rem',
                padding: '1.5rem'
              }}
            >
              <h3 style={{ marginTop: 0, color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1rem' }}>
                📊 Section-by-Section ATS Evaluation Breakdown
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {Object.entries(result.sections).map(([section, score]) => {
                  const max = { contact: 10, summary: 10, skills: 20, experience: 20, education: 15, projects: 15, certifications: 10 }[section] || 10
                  const pct = Math.min(100, Math.round((score / max) * 100))
                  const color = sectionColors[section] || '#6366f1'

                  return (
                    <div key={section} style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <span style={{ color: '#cbd5e1', fontSize: '0.85rem', width: '130px', textTransform: 'capitalize', fontWeight: '600' }}>
                        {section}
                      </span>
                      <div style={{ flex: 1, minWidth: '180px', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', height: '8px', overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, background: color, height: '100%', borderRadius: '8px', transition: 'width 1s ease' }} />
                      </div>
                      <span style={{ color, fontSize: '0.85rem', fontWeight: '800', width: '60px', textAlign: 'right' }}>
                        {score} / {max}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* 3. Role Keywords: Matched vs Missing */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
            {/* Missing Keywords */}
            {result.keywordsMissing && result.keywordsMissing.length > 0 && (
              <div
                style={{
                  background: 'rgba(239,68,68,0.06)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: '1.25rem',
                  padding: '1.5rem'
                }}
              >
                <h3 style={{ marginTop: 0, color: '#f87171', fontWeight: '800', fontSize: '1.05rem', marginBottom: '0.75rem' }}>
                  🔑 Missing Target ATS Keywords
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.8rem', margin: '0 0 0.75rem' }}>
                  Add these keywords to your resume text to increase your ranking in recruiter ATS scans:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {result.keywordsMissing.map((k, i) => (
                    <span key={i} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.35)', color: '#fca5a5', padding: '0.3rem 0.75rem', borderRadius: '1rem', fontSize: '0.78rem', fontWeight: '700' }}>
                      + {k}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Matched Keywords */}
            {result.matchedKeywords && result.matchedKeywords.length > 0 && (
              <div
                style={{
                  background: 'rgba(16,185,129,0.06)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  borderRadius: '1.25rem',
                  padding: '1.5rem'
                }}
              >
                <h3 style={{ marginTop: 0, color: '#34d399', fontWeight: '800', fontSize: '1.05rem', marginBottom: '0.75rem' }}>
                  ✓ Successfully Matched Keywords
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.8rem', margin: '0 0 0.75rem' }}>
                  These verified skills were successfully recognized by the ATS scanner:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {result.matchedKeywords.map((k, i) => (
                    <span key={i} style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.35)', color: '#86efac', padding: '0.3rem 0.75rem', borderRadius: '1rem', fontSize: '0.78rem', fontWeight: '700' }}>
                      ✓ {k}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 4. Strengths & Quick Wins */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {/* Strengths */}
            {result.strengths?.length > 0 && (
              <div
                style={{
                  background: 'rgba(16,185,129,0.05)',
                  border: '1px solid rgba(16,185,129,0.25)',
                  borderRadius: '1.25rem',
                  padding: '1.5rem'
                }}
              >
                <h3 style={{ marginTop: 0, color: '#4ade80', fontWeight: '800', fontSize: '1.05rem', marginBottom: '0.75rem' }}>
                  ✅ Verified Strengths
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  {result.strengths.map((s, i) => (
                    <li key={i} style={{ marginBottom: '0.35rem' }}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Wins */}
            {result.quickWins?.length > 0 && (
              <div
                style={{
                  background: 'rgba(245,158,11,0.05)',
                  border: '1px solid rgba(245,158,11,0.25)',
                  borderRadius: '1.25rem',
                  padding: '1.5rem'
                }}
              >
                <h3 style={{ marginTop: 0, color: '#fbbf24', fontWeight: '800', fontSize: '1.05rem', marginBottom: '0.75rem' }}>
                  ⚡ High-Impact Quick Wins
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  {result.quickWins.map((s, i) => (
                    <li key={i} style={{ marginBottom: '0.35rem' }}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 5. Actionable Improvement Suggestions */}
          {result.suggestions?.length > 0 && (
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1.25rem',
                padding: '1.5rem'
              }}
            >
              <h3 style={{ marginTop: 0, color: '#60a5fa', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1rem' }}>
                💡 Actionable Improvement Steps for Higher ATS Rank
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {result.suggestions.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      padding: '0.85rem 1rem',
                      background: 'rgba(59,130,246,0.06)',
                      border: '1px solid rgba(59,130,246,0.18)',
                      borderRadius: '0.75rem',
                      alignItems: 'flex-start'
                    }}
                  >
                    <span style={{ color: '#60a5fa', fontWeight: '900', fontSize: '0.9rem', flexShrink: 0 }}>
                      {i + 1}.
                    </span>
                    <span style={{ color: '#e2e8f0', fontSize: '0.88rem', lineHeight: 1.5 }}>
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
