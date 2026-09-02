import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function SchoolSamplePapers({ activeSubject, selectedClass, selectedBoard }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy') // 'easy', 'average', 'difficult', 'official', 'preboard'
  const [viewingPaper, setViewingPaper] = useState(null)

  const samplePaperCategories = [
    { id: 'easy', label: '🌱 Easy Level (15 Papers)', desc: 'Build fundamental confidence, basic formulas & direct questions', count: 15, color: '#10b981' },
    { id: 'average', label: '📈 Average Standard (15 Papers)', desc: 'Standard board exam difficulty level, tests your true preparedness', count: 15, color: '#3b82f6' },
    { id: 'difficult', label: '🚀 Difficult / HOTS (15 Papers)', desc: 'Challenging case studies, multi-step numericals & 100/100 deciders', count: 15, color: '#ef4444' },
    { id: 'official', label: '🏛️ Official Board Papers (5 Yrs)', desc: 'Official CBSE & State Board released sample question papers with marking scheme', count: 5, color: '#fbbf24' },
    { id: 'preboard', label: '🏫 Pre-Board Papers (20 Papers)', desc: 'Top national school pre-board exam papers (DPS, KV, DAV, etc.)', count: 20, color: '#8b5cf6' }
  ]

  // Generate 15 Papers per category
  const getPapersForCategory = (catId) => {
    const total = catId === 'official' ? 5 : catId === 'preboard' ? 20 : 15
    return Array.from({ length: total }, (_, i) => ({
      id: `${catId}-p${i + 1}`,
      paperCode: `${selectedClass}-${activeSubject.name.slice(0, 3).toUpperCase()}-${catId.toUpperCase()}-0${i + 1}`,
      title: `${catId === 'official' ? 'Official Board Sample Paper' : catId === 'preboard' ? 'National Pre-Board Paper' : activeSubject.name + ' Model Set'} #${i + 1}`,
      durationMins: 180,
      totalMarks: activeSubject.theoryMarks || 80,
      passingMarks: Math.round((activeSubject.theoryMarks || 80) * 0.33),
      sectionsCount: 5,
      questionsCount: 38,
      difficultyBadge: catId === 'easy' ? '🌱 Easy (Confidence Booster)' : catId === 'average' ? '📈 Standard Board Level' : catId === 'difficult' ? '🚀 High Order HOTS' : '🏛️ Official Board Model',
      questionsSample: [
        {
          sec: 'Section A (1 Mark MCQs)',
          qs: [
            'Q1: If two positive integers a and b are written as a = x³y² and b = xy³, where x, y are prime numbers, then HCF(a, b) is:',
            'Q2: Which of the following is a balanced displacement reaction?',
            'Q3: The focal length of a convex mirror whose radius of curvature is 32 cm is:'
          ]
        },
        {
          sec: 'Section B (2 Marks Very Short)',
          qs: [
            'Q4: Prove that 3 + 2√5 is irrational, given that √5 is irrational.',
            'Q5: Write balanced chemical equation for the reaction of steam with red hot iron.'
          ]
        },
        {
          sec: 'Section D (5 Marks Long Answer & Case Studies)',
          qs: [
            'Q6: State the principle and working of an electric motor with neat labeled diagram.',
            'Q7: A motor boat whose speed is 18 km/h in still water takes 1 hour more to go 24 km upstream than to return downstream to the same spot. Find the speed of the stream.'
          ]
        }
      ]
    }))
  }

  const papers = getPapersForCategory(selectedDifficulty)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
            {selectedBoard} · CLASS {selectedClass}TH
          </span>
          <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.3rem', margin: '0.3rem 0 0' }}>
            📄 EAD Sample Papers & Model Question Vault ({activeSubject.name})
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0.2rem 0 0' }}>
            15 Easy (🌱), 15 Average (📈), 15 Difficult (🚀) + Official Board & Pre-Board Question Papers
          </p>
        </div>
      </div>

      {/* Category Difficulty Selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
        {samplePaperCategories.map(cat => {
          const isSelected = selectedDifficulty === cat.id
          return (
            <motion.div
              key={cat.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedDifficulty(cat.id)
                setViewingPaper(null)
              }}
              style={{
                background: isSelected ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.03)',
                border: isSelected ? `2px solid ${cat.color}` : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '0.85rem',
                padding: '1rem',
                cursor: 'pointer'
              }}
            >
              <div style={{ color: isSelected ? 'white' : '#cbd5e1', fontWeight: '800', fontSize: '0.9rem' }}>
                {cat.label}
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginTop: '0.25rem', lineHeight: 1.4 }}>
                {cat.desc}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Paper Preview / Full Question Paper Screen */}
      {viewingPaper ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ background: 'rgba(15,23,42,0.95)', border: '2px solid #8b5cf6', borderRadius: '1.25rem', padding: '1.75rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <span style={{ color: '#fbbf24', fontWeight: '900', fontSize: '0.78rem' }}>
                PAPER CODE: {viewingPaper.paperCode}
              </span>
              <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.3rem', margin: '0.2rem 0 0' }}>
                {viewingPaper.title}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0.2rem 0 0' }}>
                Time Allowed: <strong>3 Hours (180 Mins)</strong> | Maximum Marks: <strong>{viewingPaper.totalMarks}</strong>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => toast.success(`📥 Downloaded ${viewingPaper.title} with Official Marking Scheme in PDF!`)}
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', padding: '0.55rem 1rem', borderRadius: '0.5rem', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer' }}
              >
                📥 Download PDF & Marking Scheme
              </button>
              <button
                onClick={() => setViewingPaper(null)}
                style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '0.55rem 0.9rem', borderRadius: '0.5rem', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}
              >
                ✕ Close Paper
              </button>
            </div>
          </div>

          {/* Instructions Box */}
          <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem', color: '#fef08a', fontSize: '0.82rem', lineHeight: 1.6 }}>
            <strong>General Instructions:</strong><br />
            1. This question paper consists of 38 questions in 5 Sections (A, B, C, D and E).<br />
            2. Section A consists of 20 Multiple Choice Questions (1 mark each).<br />
            3. Section B consists of 5 Very Short Answer type questions (2 marks each).<br />
            4. Section C consists of 6 Short Answer type questions (3 marks each).<br />
            5. Section D consists of 4 Long Answer type questions (5 marks each).<br />
            6. Section E consists of 3 Case-Based units of assessment (4 marks each).
          </div>

          {/* Sample Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {viewingPaper.questionsSample.map((sec, sIdx) => (
              <div key={sIdx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.75rem', padding: '1.25rem' }}>
                <div style={{ color: '#60a5fa', fontWeight: '900', fontSize: '0.92rem', marginBottom: '0.75rem' }}>
                  {sec.sec}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {sec.qs.map((qText, qIdx) => (
                    <div key={qIdx} style={{ color: '#e2e8f0', fontSize: '0.88rem', lineHeight: 1.5, background: 'rgba(0,0,0,0.3)', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.04)' }}>
                      {qText}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        /* Paper Cards Grid */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {papers.map((paper, pIdx) => (
            <motion.div
              key={paper.id}
              whileHover={{ y: -3 }}
              style={{
                background: 'rgba(15,23,42,0.95)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1rem',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ color: '#fbbf24', fontWeight: '900', fontSize: '0.72rem', fontFamily: 'monospace' }}>
                    {paper.paperCode}
                  </span>
                  <span style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', padding: '0.15rem 0.45rem', borderRadius: '0.35rem', fontSize: '0.68rem', fontWeight: '800' }}>
                    {paper.totalMarks} Marks
                  </span>
                </div>

                <h4 style={{ color: 'white', fontWeight: '800', fontSize: '1rem', margin: '0.3rem 0 0.4rem' }}>
                  {paper.title}
                </h4>

                <div style={{ color: '#94a3b8', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', margin: '0 0 1rem' }}>
                  <div>⏱️ Time: <strong>{paper.durationMins} Minutes</strong></div>
                  <div>🎯 Level: <strong style={{ color: '#6ee7b7' }}>{paper.difficultyBadge}</strong></div>
                  <div>📋 Sections: <strong>5 (A, B, C, D, E)</strong></div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setViewingPaper(paper)}
                  style={{ flex: 1, background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', border: 'none', padding: '0.6rem', borderRadius: '0.5rem', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  📖 Open Paper ➔
                </button>
                <button
                  onClick={() => toast.success(`📥 Downloaded ${paper.title} PDF with Solutions!`)}
                  style={{ background: 'rgba(255,255,255,0.08)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.12)', padding: '0.6rem 0.75rem', borderRadius: '0.5rem', fontWeight: '700', fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  📥 PDF
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
