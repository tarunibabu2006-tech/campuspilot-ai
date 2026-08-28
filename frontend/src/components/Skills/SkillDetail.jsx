import React, { useState, useEffect, useCallback } from 'react'
import { getSkillById, updateSkillProgress } from '../../services/api'
import { SEED_SKILLS } from '../../data/seedSkills'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

// Helper: build fallback skill if network fails
function buildFallbackSkill(skillId) {
  const matched = SEED_SKILLS.find(s => s.id === skillId || s.name.toLowerCase() === String(skillId).toLowerCase())
  const name = matched ? matched.name : `Skill Module (${skillId})`
  const category = matched ? matched.category : 'Technology'
  const domain = matched ? matched.domain : 'Engineering'
  const level = matched ? matched.level : 'Beginner → Advanced'
  const duration = matched ? matched.duration : '4-6 weeks'
  const desc = matched ? (matched.desc || matched.description) : `Master ${name} from fundamentals to advanced industry implementation.`

  return {
    _id: skillId,
    id: skillId,
    name,
    category,
    domain,
    level,
    duration,
    description: desc,
    notes: `# ${name} — Complete Study & Mastery Guide

## 📌 Module Overview
Master **${name}** from core foundational concepts to advanced production architecture, placement interview problem patterns, and hands-on project implementation.

---

## 🎯 1. Fundamental Principles & Architecture
- **Core Purpose:** High-performance problem solving, scalable architecture, and enterprise standards in ${category}.
- **Syntax & Semantics:** Essential syntax, standard libraries, idiomatic design patterns, and debugging workflows.
- **Memory & Execution Model:** Runtime mechanics, memory management, concurrency handling, and system optimization.

---

## 💡 2. Key Concepts & Practical Implementation
1. **Building Blocks:** Setting up development environment, package management, and basic code structure.
2. **Intermediate Techniques:** State management, data persistence, API integrations, and async event handling.
3. **Advanced Architecture:** Design patterns (Singleton, Factory, Observer), microservices, caching, and CI/CD pipelines.
4. **Performance Tuning:** Profiling, reducing latency, eliminating bottlenecks, and writing secure production-grade code.

---

## 💼 3. Campus Placement & Interview Focus Areas
- **Top 5 Interview Questions:**
  1. *Explain the core internal architecture of ${name} and how it differs from traditional alternatives.*
  2. *What are the most common memory/performance pitfalls when deploying ${name} at scale?*
  3. *How do you handle asynchronous operations, error boundaries, and race conditions?*
  4. *Describe a complex problem you solved using ${name} and the architectural trade-offs made.*
  5. *Explain unit testing, mocking, and integration testing strategies for ${name}.*

---

## 🛠️ 4. Recommended Capstone Projects
- **Tier 1 (Fresher):** CRUD Application with Authentication & Database Integration.
- **Tier 2 (Intermediate):** Real-time Collaborative Tool with WebSockets & Caching.
- **Tier 3 (Advanced):** High-throughput Distributed System with Load Balancing & Analytics.`,
    resources: [
      'https://developer.mozilla.org/',
      'https://www.freecodecamp.org/',
      'https://github.com/kamranahmedse/developer-roadmap'
    ],
    videos: [
      'https://www.youtube.com/watch?v=zJSY8tbf_ys',
      'https://www.youtube.com/watch?v=Oe421EPjeBE'
    ],
    requiredForRoles: matched?.relatedJobs || ['Software Engineer', 'Full Stack Developer', 'System Architect']
  }
}

export default function SkillDetail({ skillId, onBack }) {
  const [skill, setSkill] = useState(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(`skill_progress_${skillId}`)
      return saved ? parseInt(saved) : 0
    } catch { return 0 }
  })
  const [activeSubTab, setActiveSubTab] = useState('notes')

  const fetchSkillDetail = useCallback(async () => {
    setLoading(true)
    try {
      if (skillId) {
        const res = await getSkillById(skillId)
        if (res.data && (res.data.name || res.data.notes)) {
          setSkill(res.data)
          if (res.data.progress) setProgress(res.data.progress)
          setLoading(false)
          return
        }
      }
    } catch (err) {
      console.warn('API lookup failed, activating smart local skill fallback')
    }

    // Smart Fallback
    const fallback = buildFallbackSkill(skillId)
    setSkill(fallback)
    setLoading(false)
  }, [skillId])

  useEffect(() => {
    fetchSkillDetail()
  }, [fetchSkillDetail])

  const markComplete = async () => {
    const newProgress = progress === 100 ? 0 : 100
    setProgress(newProgress)
    try {
      localStorage.setItem(`skill_progress_${skillId}`, String(newProgress))
      await updateSkillProgress({ skillId, progress: newProgress })
    } catch { }

    if (newProgress === 100) {
      toast.success('🎉 Module marked as 100% complete! +100 XP awarded!')
    } else {
      toast('Progress reset to 0%')
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⏳</div>
        <p style={{ fontWeight: '700' }}>Loading comprehensive skill curriculum & study notes...</p>
      </div>
    )
  }

  if (!skill) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
        <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.15)', padding: '0.5rem 1rem', borderRadius: '0.6rem', cursor: 'pointer', marginBottom: '1rem' }}>
          ← Back to Skill Hub
        </button>
        <p>Skill module could not be initialized.</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* ── TOP NAV BUTTON & HEADER ───────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #0f172a 100%)',
          borderRadius: '1.5rem', padding: '1.75rem',
          border: '1px solid rgba(139,92,246,0.35)',
          boxShadow: '0 8px 32px rgba(124,58,237,0.2)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button onClick={onBack}
            style={{
              background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.15)',
              padding: '0.45rem 1rem', borderRadius: '0.6rem', fontWeight: '700', fontSize: '0.82rem',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          >
            ← Back to Skill Hub
          </button>

          <button onClick={markComplete}
            style={{
              background: progress === 100 ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(74,222,128,0.15)',
              color: progress === 100 ? '#fff' : '#4ade80',
              border: progress === 100 ? 'none' : '1px solid rgba(74,222,128,0.4)',
              padding: '0.5rem 1.25rem', borderRadius: '0.75rem', fontWeight: '800', fontSize: '0.85rem',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem',
              boxShadow: progress === 100 ? '0 4px 15px rgba(16,185,129,0.4)' : 'none'
            }}
          >
            {progress === 100 ? '✅ Module Completed (100%)' : 'Mark as Complete ✅'}
          </button>
        </div>

        <h1 style={{ color: 'white', fontWeight: '900', fontSize: '1.8rem', margin: '0 0 0.5rem' }}>
          📚 {skill.name}
        </h1>
        <p style={{ color: '#c4b5fd', fontSize: '0.9rem', margin: '0 0 1rem' }}>
          {skill.description}
        </p>

        {/* Badges */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <span style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd', border: '1px solid rgba(124,58,237,0.4)', padding: '0.2rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '700' }}>
            📂 {skill.category || 'Technology'}
          </span>
          <span style={{ background: 'rgba(59,130,246,0.2)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.4)', padding: '0.2rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '700' }}>
            🌐 {skill.domain || 'Engineering'}
          </span>
          <span style={{ background: 'rgba(251,191,36,0.2)', color: '#fde047', border: '1px solid rgba(251,191,36,0.4)', padding: '0.2rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '700' }}>
            ⭐ {skill.level || 'Intermediate'}
          </span>
          <span style={{ background: 'rgba(34,197,94,0.2)', color: '#86efac', border: '1px solid rgba(34,197,94,0.4)', padding: '0.2rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '700' }}>
            ⏱️ {skill.duration || '4-6 weeks'}
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#cbd5e1', fontWeight: '700', marginBottom: '0.4rem' }}>
            <span>Module Mastery Progress</span>
            <span style={{ color: progress === 100 ? '#4ade80' : '#fbbf24' }}>{progress}%</span>
          </div>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #7c3aed, #10b981)', transition: 'width 0.4s ease' }} />
          </div>
        </div>
      </motion.div>

      {/* ── SUB-TABS ─────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {[
          { id: 'notes', label: '📖 Comprehensive Notes' },
          { id: 'resources', label: '🌐 Learning Links' },
          { id: 'videos', label: '🎥 Video Tutorials' },
          { id: 'roles', label: '💼 Target Career Roles' }
        ].map(t => (
          <button key={t.id} onClick={() => setActiveSubTab(t.id)}
            style={{
              padding: '0.6rem 1.1rem', borderRadius: '0.75rem', fontWeight: '700', fontSize: '0.84rem', cursor: 'pointer',
              background: activeSubTab === t.id ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.05)',
              color: activeSubTab === t.id ? 'white' : '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.2s', flexShrink: 0
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── NOTES CONTENT ────────────────────────────────────────── */}
      {activeSubTab === 'notes' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.75rem' }}
        >
          <div style={{ color: '#e2e8f0', fontSize: '0.92rem', lineHeight: 1.8, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
            {skill.notes}
          </div>
        </motion.div>
      )}

      {/* ── RESOURCES CONTENT ────────────────────────────────────── */}
      {activeSubTab === 'resources' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}
        >
          <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1rem' }}>🌐 Verified Documentation & Guides</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {(skill.resources && skill.resources.length > 0 ? skill.resources : [
              'https://developer.mozilla.org/',
              'https://www.freecodecamp.org/',
              'https://github.com/kamranahmedse/developer-roadmap'
            ]).map((res, i) => (
              <a key={i} href={res} target="_blank" rel="noopener noreferrer"
                style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.75rem', padding: '0.85rem 1.25rem', color: '#60a5fa',
                  textDecoration: 'none', fontWeight: '700', fontSize: '0.88rem',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.15)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
              >
                <span>🔗 Official Resource & Guide #{i + 1}</span>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{res} ↗</span>
              </a>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── VIDEOS CONTENT ───────────────────────────────────────── */}
      {activeSubTab === 'videos' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}
        >
          <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1rem' }}>🎥 Recommended Video Lectures</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {(skill.videos && skill.videos.length > 0 ? skill.videos : [
              'https://www.youtube.com/watch?v=zJSY8tbf_ys',
              'https://www.youtube.com/watch?v=Oe421EPjeBE'
            ]).map((vid, i) => (
              <a key={i} href={vid} target="_blank" rel="noopener noreferrer"
                style={{
                  background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
                  borderRadius: '0.75rem', padding: '0.85rem 1.25rem', color: '#fca5a5',
                  textDecoration: 'none', fontWeight: '700', fontSize: '0.88rem',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)' }}
              >
                <span>▶️ High-Yield Video Tutorial #{i + 1}</span>
                <span style={{ fontSize: '0.78rem', color: '#f87171' }}>Watch on YouTube ↗</span>
              </a>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── CAREER ROLES CONTENT ─────────────────────────────────── */}
      {activeSubTab === 'roles' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}
        >
          <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1rem' }}>💼 Campus Roles Requiring {skill.name}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {(skill.requiredForRoles || ['Software Engineer', 'Full Stack Developer', 'Cloud Engineer']).map((role, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem', padding: '0.85rem 1rem' }}>
                <div style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.9rem', marginBottom: '0.2rem' }}>👔 {role}</div>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Direct match for {skill.name}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
