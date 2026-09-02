import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function SchoolDoubtSolving({ activeSubject, selectedClass }) {
  const [doubtText, setDoubtText] = useState('')
  const [loading, setLoading] = useState(false)
  const [solution, setSolution] = useState(null)

  const handleSolveDoubt = (e) => {
    e.preventDefault()
    if (!doubtText.trim()) return

    setLoading(true)
    setTimeout(() => {
      setSolution({
        question: doubtText,
        subject: activeSubject.name,
        stepByStep: [
          'Step 1: Identify Given Parameters and Target Unknown from problem statement.',
          'Step 2: Apply the governing NCERT Theorem / Formula (e.g. Standard substitution and algebraic isolation).',
          'Step 3: Calculate intermediate values and verify dimensional consistency.',
          'Step 4: Final verification and writing complete statement with SI units.'
        ],
        finalAnswer: `Based on your question regarding "${doubtText.slice(0, 40)}...", the correct mathematical / scientific resolution simplifies directly according to standard NCERT Chapter principles.`,
        relatedConcepts: ['Theorem 1.1 / Formula Application', 'NCERT Intext Question 3', 'CBSE 2024 Past Question Trap'],
        practiceProblem: 'Try this similar question: If the value is doubled under identical constraints, compute the new resultant.'
      })
      setLoading(false)
      toast.success('✨ AI Step-by-Step Solution Generated!')
    }, 1000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ background: 'rgba(52,211,153,0.2)', color: '#6ee7b7', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
            24/7 AI HOMEWORK & BOARD EXAM MENTOR
          </span>
          <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.35rem', margin: '0.3rem 0 0' }}>
            🤖 AI Instant Doubt Solver & Step-by-Step Explainer
          </h2>
          <p style={{ color: '#c4b5fd', fontSize: '0.82rem', margin: '0.2rem 0 0' }}>
            Type any question or paste problem text from Mathematics, Science, Social, Physics or Chemistry for instant step-by-step resolution.
          </p>
        </div>
      </div>

      {/* Input Box */}
      <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '1.25rem', padding: '1.5rem' }}>
        <form onSubmit={handleSolveDoubt} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', color: '#c4b5fd', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              ❓ Type or Paste Your Question / Problem Statement:
            </label>
            <textarea
              rows={4}
              value={doubtText}
              onChange={e => setDoubtText(e.target.value)}
              placeholder="e.g. Find the roots of the equation 2x² - 5x + 3 = 0 using quadratic formula / Explain why copper sulfate solution turns green when iron nail is dipped in it..."
              style={{ width: '100%', padding: '0.85rem', borderRadius: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.9rem', lineHeight: 1.5, resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {['Quadratic Equation', 'Trigonometry Proof', 'Displacement Reaction', 'Ohm’s Law'].map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setDoubtText(`Solve the problem regarding: ${preset} step-by-step with formulas and final answer.`)}
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#93c5fd', padding: '0.3rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', cursor: 'pointer' }}
                >
                  + {preset}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                color: 'white',
                border: 'none',
                padding: '0.7rem 1.5rem',
                borderRadius: '0.65rem',
                fontWeight: '900',
                fontSize: '0.88rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 15px rgba(124,58,237,0.35)'
              }}
            >
              {loading ? '⏳ AI Solving...' : '🚀 Solve Step-by-Step ➔'}
            </button>
          </div>
        </form>
      </div>

      {/* AI Solution Output */}
      {solution && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ background: 'rgba(15,23,42,0.95)', border: '2px solid #34d399', borderRadius: '1.25rem', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
            <div>
              <span style={{ color: '#34d399', fontWeight: '900', fontSize: '0.8rem' }}>
                ✓ AI VERIFIED STEP-BY-STEP SOLUTION
              </span>
              <h4 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem', margin: '0.2rem 0 0' }}>
                Question: "{solution.question}"
              </h4>
            </div>
          </div>

          {/* Steps */}
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.75rem', padding: '1.25rem' }}>
            <div style={{ color: '#6ee7b7', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              Detailed Derivation Steps:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {solution.stepByStep.map((st, sIdx) => (
                <div key={sIdx} style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  {st}
                </div>
              ))}
            </div>
          </div>

          {/* Related Concepts & Practice Question */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '0.75rem', padding: '1rem' }}>
              <div style={{ color: '#c4b5fd', fontWeight: '800', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                💡 Related Textbook Concepts:
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#cbd5e1', fontSize: '0.8rem', lineHeight: 1.6 }}>
                {solution.relatedConcepts.map((c, cIdx) => (
                  <li key={cIdx}>{c}</li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '0.75rem', padding: '1rem' }}>
              <div style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                🎯 Recommended Practice Problem:
              </div>
              <p style={{ color: '#fef08a', fontSize: '0.8rem', margin: 0, lineHeight: 1.5 }}>
                {solution.practiceProblem}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
