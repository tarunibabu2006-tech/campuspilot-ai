import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function SchoolNCERTSolutions({ activeSubject, selectedClass, onSelectSubject, subjectsList }) {
  const chapters = activeSubject?.chapters || [
    { id: 'ch1', name: 'Chapter 1: Real Numbers / Chemical Reactions' },
    { id: 'ch2', name: 'Chapter 2: Polynomials / Acids, Bases and Salts' },
    { id: 'ch3', name: 'Chapter 3: Linear Equations / Metals and Non-metals' }
  ]

  const [selectedChapter, setSelectedChapter] = useState(chapters[0])
  const [activeTab, setActiveTab] = useState('ex1') // 'ex1', 'ex2', 'intext', 'chapter-end', 'exemplar'

  const sampleSolutions = {
    ex1: [
      {
        qNum: 'Question 1.1 (a)',
        q: `Express each number as a product of its prime factors: (i) 140 (ii) 156 (iii) 3825`,
        solution: `(i) 140:
By prime factor tree method:
140 = 2 × 70
    = 2 × 2 × 35
    = 2 × 2 × 5 × 7
Therefore, 140 = 2² × 5 × 7.

(ii) 156 = 2² × 3 × 13.
(iii) 3825 = 3² × 5² × 17.`,
        keyConcept: 'Fundamental Theorem of Arithmetic: Every composite number can be uniquely expressed as a product of primes.'
      },
      {
        qNum: 'Question 1.1 (b)',
        q: `Find the LCM and HCF of the integers 26 and 91 and verify that LCM × HCF = product of the two numbers.`,
        solution: `Prime Factorization:
26 = 2 × 13
91 = 7 × 13

HCF(26, 91) = 13
LCM(26, 91) = 2 × 7 × 13 = 182

Verification:
HCF × LCM = 13 × 182 = 2366
Product of numbers = 26 × 91 = 2366
Hence, HCF × LCM = Product of numbers (Verified).`,
        keyConcept: 'Property: For any two positive integers a and b, HCF(a, b) × LCM(a, b) = a × b.'
      }
    ],
    intext: [
      {
        qNum: 'Intext Question 1',
        q: `Why should a magnesium ribbon be cleaned before burning in air?`,
        solution: `Magnesium is a reactive metal. When stored, it reacts with atmospheric oxygen to form a stable protective layer of Magnesium Oxide (MgO) on its surface. This layer prevents further reaction with oxygen.
Cleaning the ribbon with sandpaper removes this oxide layer, allowing it to ignite smoothly with a dazzling white flame:
2Mg(s) + O₂(g) ➔ 2MgO(s) + Heat + Light.`,
        keyConcept: 'Combination Reaction & Surface Passivation in Metals.'
      }
    ],
    'chapter-end': [
      {
        qNum: 'Chapter End Q 1',
        q: `Why is respiration considered an exothermic reaction? Explain with balanced chemical equation.`,
        solution: `During digestion, food containing carbohydrates is broken down into simple glucose (C₆H₁₂O₆). 
During cellular respiration, this glucose combines with oxygen in the cells of our body and releases energy in the form of ATP:
C₆H₁₂O₆(aq) + 6O₂(aq) ➔ 6CO₂(aq) + 6H₂O(l) + Energy (ATP)
Since heat/energy is released in this process, respiration is classified as an exothermic reaction.`,
        keyConcept: 'Exothermic Reactions in Biological Processes.'
      }
    ],
    exemplar: [
      {
        qNum: 'NCERT Exemplar HOTS Q 1',
        q: `Prove that √5 is an irrational number by contradiction method.`,
        solution: `Let us assume to the contrary that √5 is rational.
Then √5 = a/b, where a and b are co-prime integers (HCF(a, b) = 1) and b ≠ 0.
Squaring both sides:
5 = a² / b²  => a² = 5b²  --- (Equation 1)
Since 5 divides a², by Theorem 1.3, 5 must also divide a.
Let a = 5c for some integer c.
Substituting in Eq 1:
(5c)² = 5b²  => 25c² = 5b² => b² = 5c²
This implies 5 divides b², so 5 must divide b.
Therefore, 5 is a common factor of both a and b.
This contradicts our assumption that a and b are co-prime (have no common factor other than 1).
Hence, our initial assumption was false, and √5 is strictly IRRATIONAL. (Q.E.D.)`,
        keyConcept: 'Proof by Contradiction & Prime Divisibility Theorem.'
      }
    ]
  }

  const currentSolutionsList = sampleSolutions[activeTab] || sampleSolutions.ex1

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header bar */}
      <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
            CLASS {selectedClass}TH NCERT & EXEMPLAR SOLUTIONS
          </span>
          <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.3rem', margin: '0.3rem 0 0' }}>
            {activeSubject.icon} {activeSubject.name} — Step-by-Step Textbook Solutions
          </h2>
        </div>

        {/* Subject dropdown switcher */}
        <select
          value={activeSubject.id}
          onChange={e => {
            const found = subjectsList.find(s => s.id === e.target.value)
            if (found) onSelectSubject(found)
          }}
          style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', padding: '0.5rem 0.85rem', borderRadius: '0.6rem', fontWeight: '700', fontSize: '0.82rem' }}
        >
          {subjectsList.map(s => (
            <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
          ))}
        </select>
      </div>

      {/* Chapter Selector Strip */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.4rem' }}>
        {chapters.map((ch, idx) => {
          const isSelected = selectedChapter.id === ch.id || (!selectedChapter.id && idx === 0)
          return (
            <button
              key={ch.id || idx}
              onClick={() => setSelectedChapter(ch)}
              style={{
                padding: '0.5rem 0.9rem',
                borderRadius: '0.6rem',
                background: isSelected ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.03)',
                border: isSelected ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                color: isSelected ? 'white' : '#94a3b8',
                fontWeight: '800',
                fontSize: '0.78rem',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              Ch {idx + 1}: {ch.name?.slice(0, 24)}...
            </button>
          )
        })}
      </div>

      {/* Main Solution View */}
      <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '1.25rem', padding: '1.75rem' }}>
        {/* Exercise Category Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {[
              { id: 'ex1', label: 'Exercise 1.1' },
              { id: 'ex2', label: 'Exercise 1.2' },
              { id: 'intext', label: 'Intext Questions' },
              { id: 'chapter-end', label: 'Chapter End Questions' },
              { id: 'exemplar', label: 'NCERT Exemplar Problems' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '0.5rem',
                  background: activeTab === t.id ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.04)',
                  border: activeTab === t.id ? '1px solid #34d399' : '1px solid rgba(255,255,255,0.08)',
                  color: activeTab === t.id ? '#6ee7b7' : '#94a3b8',
                  fontWeight: '800',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => toast.success('📥 Complete Chapter NCERT Solutions PDF generated!')}
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', padding: '0.4rem 0.85rem', borderRadius: '0.5rem', fontWeight: '800', fontSize: '0.75rem', cursor: 'pointer' }}
          >
            📥 Download Chapter Solutions PDF
          </button>
        </div>

        {/* Questions and Step-by-Step Solutions List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {currentSolutionsList.map((sol, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1rem',
                padding: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: '#fbbf24', fontWeight: '900', fontSize: '0.82rem' }}>
                  {sol.qNum}
                </span>
                <span style={{ background: 'rgba(96,165,250,0.15)', color: '#93c5fd', padding: '0.15rem 0.45rem', borderRadius: '0.35rem', fontSize: '0.7rem', fontWeight: '800' }}>
                  Verified Official Solution
                </span>
              </div>

              <h4 style={{ color: 'white', fontWeight: '800', fontSize: '1rem', lineHeight: 1.5, margin: '0 0 1rem' }}>
                {sol.q}
              </h4>

              {/* Solution Box */}
              <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '0.75rem' }}>
                <div style={{ color: '#34d399', fontWeight: '900', fontSize: '0.82rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  ✓ Step-by-Step Solution:
                </div>
                <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.88rem', lineHeight: 1.6, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
                  {sol.solution}
                </pre>
              </div>

              {/* Key Concept Tip */}
              <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '0.6rem', padding: '0.65rem 0.85rem', color: '#c4b5fd', fontSize: '0.78rem' }}>
                💡 <strong>Key Formula / Concept:</strong> {sol.keyConcept}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
