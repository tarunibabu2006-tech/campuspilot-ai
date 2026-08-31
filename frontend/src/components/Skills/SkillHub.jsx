import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { ALL_SKILLS_FLAT, ALL_CATEGORY_NAMES, CATEGORY_SKILLS_MAP } from '../../data/allCategorySkills'
import { MASTER_CATEGORY_NOTES } from '../../data/categoryNotes'

// Multi-category mapping (One Skill -> Multiple Categories)
const MULTI_CATEGORY_SKILL_MAPPINGS = {
  'Python Programming': ['Computer Science & Engineering', 'Artificial Intelligence & Data Science', 'Pure & Applied Sciences', 'Economics & Policy', 'Pharmacy & Pharmaceutical Sciences', 'Banking & Financial Services', 'ITI, Polytechnic & Technical Trades'],
  'SQL & Database Architecture': ['Computer Science & Engineering', 'Commerce & Accounting', 'Banking & Financial Services', 'Artificial Intelligence & Data Science', 'Economics & Policy', 'Healthcare Analytics'],
  'Data Structures & Algorithms': ['Computer Science & Engineering', 'Artificial Intelligence & Data Science', 'Pure & Applied Sciences', 'Electronics & Communication Engineering'],
  'Machine Learning & Predictive Modeling': ['Artificial Intelligence & Data Science', 'Computer Science & Engineering', 'Banking & Financial Services', 'Pure & Applied Sciences', 'Healthcare & Medical Technology', 'Agriculture & Precision Farming'],
  'Digital Marketing & SEO Strategy': ['Commerce & Accounting', 'Media, Journalism & Mass Communication', 'Management & Business Administration', 'Arts & Humanities'],
  'Financial Modeling & Valuation': ['Banking & Financial Services', 'Commerce & Accounting', 'Economics & Policy', 'Management & Business Administration'],
  'Cloud Architecture (AWS / Azure / GCP)': ['Computer Science & Engineering', 'Artificial Intelligence & Data Science', 'Electronics & Communication Engineering', 'Enterprise Management'],
  'Cybersecurity & Network Defense': ['Computer Science & Engineering', 'Defence, Military & Strategic Studies', 'Law & Legal Studies', 'Electronics & Communication Engineering'],
  'Project Management & Agile Scrum': ['Management & Business Administration', 'Computer Science & Engineering', 'Civil Engineering', 'Mechanical Engineering', 'Healthcare Management'],
  'UI/UX Design & Prototyping': ['Design, UI/UX & Animation', 'Computer Science & Engineering', 'Media, Journalism & Mass Communication', 'Architecture & Interior Design']
}

export default function SkillHub({ onSelectSkill }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeViewMode, setActiveViewMode] = useState('skills') // 'skills', 'multi-mapping', 'category-notes', 'pipeline'
  const [selectedCategoryForNotes, setSelectedCategoryForNotes] = useState('Computer Science & Information Technology')
  const [selectedMultiSkill, setSelectedMultiSkill] = useState('Python')

  // All 64 categories from new data file
  const categories = ALL_CATEGORY_NAMES

  // Filter skills: search by name/category/desc + category dropdown
  const filtered = ALL_SKILLS_FLAT.filter(s => {
    const term = searchTerm.toLowerCase()
    const matchesSearch = !searchTerm ||
      s.name.toLowerCase().includes(term) ||
      s.category.toLowerCase().includes(term) ||
      s.desc.toLowerCase().includes(term)
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory
    return matchesSearch && matchesCat
  })

  const currentCategoryNote = MASTER_CATEGORY_NOTES[selectedCategoryForNotes] || MASTER_CATEGORY_NOTES['Computer Science & Engineering']

  return (
    <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '2.5rem' }}>🇮🇳</span>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
                All India Skill Hub & Career Pipelines
              </h1>
              <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
                Verified Learning Pathways across Engineering, Medicine, Arts, Commerce, Sciences, Law, Agriculture & Vocational Domains
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── VIEW MODE SWITCHER TABS ────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {[
          { id: 'skills', label: '⚡ Browse All Skills' },
          { id: 'multi-mapping', label: '🔀 One Skill → Multiple Categories' },
          { id: 'pipeline', label: '🧭 Career Progression Pipeline' },
          { id: 'category-notes', label: '📖 Master Category Notes (64+ Domains)' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveViewMode(tab.id)}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '0.75rem',
              background: activeViewMode === tab.id ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.04)',
              border: activeViewMode === tab.id ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
              color: activeViewMode === tab.id ? 'white' : '#94a3b8',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: activeViewMode === tab.id ? '0 4px 15px rgba(124,58,237,0.3)' : 'none'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── VIEW 1: BROWSE ALL SKILLS ──────────────────────────────── */}
      {activeViewMode === 'skills' && (
        <>
          {/* Search & Category Filter */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="🔍 Search all skills across India (e.g. Python, VLSI, GST, Anatomy, Machine Learning)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                minWidth: '260px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                color: 'white',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              style={{
                background: '#1e1b4b',
                border: '1px solid rgba(139,92,246,0.4)',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                color: 'white',
                fontSize: '0.88rem',
                outline: 'none',
                cursor: 'pointer',
                maxWidth: '320px'
              }}
            >
              {categories.map(c => (
                <option key={c} value={c}>
                  {c === 'All' ? '🌐 All 64 Disciplines & Domains' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Results Summary */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
              Showing <strong style={{ color: '#a78bfa' }}>{filtered.length}</strong> skill{filtered.length !== 1 ? 's' : ''}
              {selectedCategory !== 'All' && <> in <strong style={{ color: '#38bdf8' }}>{selectedCategory}</strong></>}
              {searchTerm && <> matching <strong style={{ color: '#34d399' }}>"{searchTerm}"</strong></>}
            </span>
            {(selectedCategory !== 'All' || searchTerm) && (
              <button
                onClick={() => { setSelectedCategory('All'); setSearchTerm('') }}
                style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', padding: '0.3rem 0.8rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.78rem', fontWeight: '700' }}
              >
                ✕ Clear Filters
              </button>
            )}
          </div>

          {/* Skills Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {filtered.map(skill => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '1.25rem',
                  padding: '1.35rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '2rem' }}>{skill.icon || '💻'}</span>
                    <span style={{
                      background: 'rgba(251,191,36,0.15)',
                      color: '#fbbf24',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '1rem',
                      fontSize: '0.72rem',
                      fontWeight: '800'
                    }}>
                      {skill.demand}
                    </span>
                  </div>
                  <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                    {skill.name}
                  </h3>
                  <div style={{ color: '#818cf8', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    📂 {skill.category}
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                    {skill.desc}
                  </p>

                  <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '0.75rem',
                    padding: '0.75rem',
                    marginBottom: '1rem',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.4rem',
                    fontSize: '0.75rem'
                  }}>
                    <div><span style={{ color: '#64748b' }}>Level:</span> <span style={{ color: 'white', fontWeight: '600' }}>{skill.level}</span></div>
                    <div><span style={{ color: '#64748b' }}>Demand:</span> <span style={{ color: '#fbbf24', fontWeight: '600' }}>{skill.demand}</span></div>
                    <div><span style={{ color: '#64748b' }}>Resources:</span> <span style={{ color: '#4ade80', fontWeight: '700' }}>Notes + Video</span></div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => onSelectSkill ? onSelectSkill(skill.id) : toast.success(`Opening ${skill.name} Notes & Videos!`)}
                    style={{
                      flex: 1,
                      padding: '0.6rem',
                      borderRadius: '0.65rem',
                      background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                      color: 'white',
                      border: 'none',
                      fontWeight: '800',
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    📖 Notes & Videos →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* ── VIEW 2: ONE SKILL → MULTIPLE CATEGORIES ───────────────── */}
      {activeViewMode === 'multi-mapping' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(139, 92, 246, 0.35)',
            borderRadius: '1.5rem',
            padding: '2rem'
          }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.3rem', margin: '0 0 0.35rem' }}>
              🔀 Multi-Discipline Skill Mapping (One Skill → Multiple Career Sectors)
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
              Discover how a single foundational skill unlocks career opportunities across multiple industries.
            </p>
          </div>

          {/* Skill Selector Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {Object.keys(MULTI_CATEGORY_SKILL_MAPPINGS).map(skillName => (
              <button
                key={skillName}
                onClick={() => setSelectedMultiSkill(skillName)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.65rem',
                  background: selectedMultiSkill === skillName ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255,255,255,0.05)',
                  border: selectedMultiSkill === skillName ? '1px solid #34d399' : '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                {skillName}
              </button>
            ))}
          </div>

          {/* Mapping Diagram & Target Categories */}
          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd', border: '1px solid #8b5cf6', padding: '0.4rem 1.25rem', borderRadius: '2rem', fontSize: '1rem', fontWeight: '900' }}>
                ⭐ {selectedMultiSkill}
              </span>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.6rem' }}>
                Transfers directly across the following {MULTI_CATEGORY_SKILL_MAPPINGS[selectedMultiSkill]?.length || 0} professional career domains:
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
              {MULTI_CATEGORY_SKILL_MAPPINGS[selectedMultiSkill]?.map((cat, idx) => (
                <div
                  key={cat}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(139,92,246,0.3)',
                    borderRadius: '1rem',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>🎯</span>
                  <div>
                    <div style={{ color: 'white', fontWeight: '800', fontSize: '0.88rem' }}>
                      {cat}
                    </div>
                    <div style={{ color: '#4ade80', fontSize: '0.72rem', fontWeight: '700', marginTop: '0.2rem' }}>
                      Industry Applicable ✓
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── VIEW 3: FULL CAREER PROGRESSION PIPELINE ──────────────── */}
      {activeViewMode === 'pipeline' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(139, 92, 246, 0.35)',
            borderRadius: '1.5rem',
            padding: '2rem'
          }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.3rem', margin: '0 0 0.35rem' }}>
              🧭 End-to-End Career Progression Pipeline Architecture
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
              Category ➔ Skills ➔ Roles ➔ Government Exams ➔ Courses ➔ Certifications ➔ Internships ➔ Placement Jobs
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { step: '1. Category & Discipline Selection', desc: 'Choose from 64+ accredited domains (Computer Science, ECE, Medical, Commerce, Law, etc.).', icon: '📂', color: '#818cf8' },
              { step: '2. Foundational & Advanced Skill Acquisition', desc: 'Master comprehensive curriculum notes, practical derivations & curated video tutorials.', icon: '💡', color: '#38bdf8' },
              { step: '3. Target Career Roles Mapping', desc: 'Align your skillset with private industry roles (SDE, Analyst, Consultant) & Public Sector roles.', icon: '💼', color: '#4ade80' },
              { step: '4. Government Exams Alignment', desc: 'Prepare for UPSC CSE, SSC CGL, Banking PO, Railway RRB, Defence CDS/NDA & State PSCs.', icon: '🏛️', color: '#fbbf24' },
              { step: '5. Advanced Courses & Hands-On Labs', desc: 'Complete cutting-edge modules in Generative AI, LLMOps, Quantum Computing & Robotics SLAM.', icon: '🚀', color: '#f472b6' },
              { step: '6. Industry Certifications', desc: 'Earn recognized credentials (AWS, Google Cloud, CKA, CFA, ACCA, NISM) to stand out.', icon: '📜', color: '#c084fc' },
              { step: '7. Verified Internships & Real-World Projects', desc: 'Build production-ready portfolios and gain accredited internship experience.', icon: '🛠️', color: '#34d399' },
              { step: '8. 1-Click AI Apply & High-Package Hiring', desc: 'Direct application to verified employer portals with automated proof slip generation.', icon: '🎉', color: '#60a5fa' }
            ].map((p, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${p.color}44`,
                  borderRadius: '1rem',
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${p.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                  {p.icon}
                </div>
                <div>
                  <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1rem', margin: '0 0 0.2rem' }}>
                    {p.step}
                  </h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.84rem', margin: 0, lineHeight: 1.4 }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── VIEW 4: MASTER CATEGORY NOTES (64+ DOMAINS) ───────────── */}
      {activeViewMode === 'category-notes' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(139, 92, 246, 0.35)',
            borderRadius: '1.5rem',
            padding: '2rem'
          }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.3rem', margin: '0 0 0.35rem' }}>
              📖 Master Category Notes (64+ Accredited Disciplines)
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
              Deep-dive domain overviews, industry demand projections, mapped government exams & professional certifications.
            </p>
          </div>

          {/* Category Dropdown */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '700' }}>
              Select Discipline / Domain:
            </label>
            <select
              value={selectedCategoryForNotes}
              onChange={e => setSelectedCategoryForNotes(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '450px',
                background: '#1e1b4b',
                border: '1px solid rgba(139,92,246,0.4)',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                color: 'white',
                fontSize: '0.9rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {Object.keys(MASTER_CATEGORY_NOTES).map(catKey => (
                <option key={catKey} value={catKey}>
                  {catKey}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Category Blueprint */}
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.2rem', margin: 0 }}>
                {currentCategoryNote.title}
              </h3>
              <span style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '800' }}>
                {currentCategoryNote.demand}
              </span>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {currentCategoryNote.desc}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '0.75rem', padding: '1rem' }}>
                <div style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                  💼 Target Career Roles:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {currentCategoryNote.careerRoles?.map(r => (
                    <span key={r} style={{ background: 'rgba(251,191,36,0.15)', color: '#fde047', padding: '0.15rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.75rem' }}>
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '0.75rem', padding: '1rem' }}>
                <div style={{ color: '#60a5fa', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                  🏛️ Applicable Government Exams:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {currentCategoryNote.govExams?.map(g => (
                    <span key={g} style={{ background: 'rgba(96,165,250,0.15)', color: '#93c5fd', padding: '0.15rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.75rem' }}>
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '0.75rem', padding: '1rem' }}>
                <div style={{ color: '#c084fc', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                  📜 Top Industry Certifications:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {currentCategoryNote.certifications?.map(c => (
                    <span key={c} style={{ background: 'rgba(192,132,252,0.15)', color: '#d8b4fe', padding: '0.15rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.75rem' }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
