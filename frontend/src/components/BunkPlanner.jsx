import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const MOCK_SUBJECTS = [
  { id: '1', name: 'Python Programming', total: 40, attended: 37, pct: 92.5, status: '🟢 Safe', safeBunks: 8, color: '#4ade80' },
  { id: '2', name: 'DBMS & SQL', total: 36, attended: 28, pct: 77.8, status: '🟡 Warning', safeBunks: 1, color: '#fbbf24' },
  { id: '3', name: 'Java Enterprise', total: 38, attended: 27, pct: 71.1, status: '🔴 Critical', safeBunks: 0, color: '#ef4444' },
  { id: '4', name: 'Discrete Mathematics', total: 45, attended: 38, pct: 84.4, status: '🟢 Safe', safeBunks: 5, color: '#4ade80' }
]

const TIMETABLE = [
  { time: '9:00 AM', subject: 'Python Programming', currentPct: 92.5, canBunk: true },
  { time: '10:00 AM', subject: 'DBMS & SQL', currentPct: 77.8, canBunk: false },
  { time: '11:15 AM', subject: 'Java Enterprise', currentPct: 71.1, canBunk: false },
  { time: '2:00 PM', subject: 'Discrete Mathematics', currentPct: 84.4, canBunk: true }
]

export default function BunkPlanner() {
  const [totalClasses, setTotalClasses] = useState('60')
  const [attended, setAttended] = useState('48')
  const [targetPct, setTargetPct] = useState('75')

  const [subjects, setSubjects] = useState(MOCK_SUBJECTS)
  const [activeTab, setActiveTab] = useState('calculator') // 'calculator', 'subjects', 'simulator', 'advisor', 'leave'

  const [simAttend, setSimAttend] = useState(5)
  const [simBunk, setSimBunk] = useState(2)

  const [aiQuery, setAiQuery] = useState('')
  const [aiAdvice, setAiAdvice] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)

  const tot = parseInt(totalClasses) || 60
  const att = parseInt(attended) || 48
  const tgt = parseFloat(targetPct) || 75

  const currentPct = ((att / tot) * 100).toFixed(1)
  const safeBunks = Math.max(0, Math.floor((att - (tgt / 100) * tot) / (tgt / 100)))

  // Calculate needed classes if below target
  const neededClasses = currentPct < tgt ? Math.ceil(((tgt / 100) * tot - att) / (1 - tgt / 100)) : 0

  // Warning if 1 more bunk drops below target
  const bunkOneDropPct = (((att) / (tot + 1)) * 100).toFixed(1)

  const simResultPct = (((att + simAttend) / (tot + simAttend + simBunk)) * 100).toFixed(1)

  const askAdvisor = () => {
    setAiLoading(true)
    setAiAdvice(null)

    setTimeout(() => {
      setAiAdvice({
        verdict: '🟡 Yes, but Miss ONLY Python!',
        reason: 'Your Python attendance is 92.5% (Safe). However, DO NOT miss DBMS (77.8%) or Java (71.1%) as Java is below 75% and DBMS will drop to 75.6% if missed!',
        actionPlan: 'Attend Java & DBMS without fail. You can safely miss 1 Python lecture tomorrow.'
      })
      setAiLoading(false)
      toast.success('🤖 AI Attendance Advisor analyzed your schedule!')
    }, 800)
  }

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81, #1e293b)', borderRadius: '1.5rem', padding: '2rem', marginBottom: '1.5rem', border: '1px solid rgba(139,92,246,0.3)' }}
      >
        <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '0.5rem' }}>
          🏃 Safe Bunks & Smart Attendance Tracker
        </h1>
        <p style={{ color: '#c4b5fd' }}>
          Calculate safe bunks, subject-wise attendance, simulator scenarios, recovery plans & AI bunk advisor.
        </p>
      </motion.div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        {[
          { id: 'calculator', label: '📊 Safe Bunk Calculator' },
          { id: 'subjects', label: '📚 Subject-wise Attendance' },
          { id: 'simulator', label: '📈 Attendance Simulator' },
          { id: 'advisor', label: '🤖 AI Attendance Advisor' },
          { id: 'timetable', label: '🗓️ Timetable & Leave' }
        ].map(t => (
          <button
            key={t.id} onClick={() => setActiveTab(t.id)}
            style={{
              padding: '0.6rem 1.2rem', borderRadius: '0.75rem', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', whiteSpace: 'nowrap',
              background: activeTab === t.id ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.05)',
              color: activeTab === t.id ? 'white' : '#94a3b8',
              border: activeTab === t.id ? 'none' : '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* CALCULATOR TAB */}
      {activeTab === 'calculator' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            {/* Input Form */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1rem' }}>⚙️ Attendance Input</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Total Classes Conducted</label>
                  <input type="number" value={totalClasses} onChange={e => setTotalClasses(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Classes Attended</label>
                  <input type="number" value={attended} onChange={e => setAttended(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Target Cutoff % (Default: 75%)</label>
                  <input type="number" value={targetPct} onChange={e => setTargetPct(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }} />
                </div>
              </div>
            </div>

            {/* Live Result Card */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', margin: 0 }}>📊 Attendance Result</h3>
                  <span style={{
                    padding: '0.25rem 0.75rem', borderRadius: '1rem', fontWeight: '800', fontSize: '0.8rem',
                    background: currentPct >= 80 ? 'rgba(74,222,128,0.2)' : currentPct >= 75 ? 'rgba(251,191,36,0.2)' : 'rgba(239,68,68,0.2)',
                    color: currentPct >= 80 ? '#4ade80' : currentPct >= 75 ? '#fbbf24' : '#ef4444',
                    border: `1px solid ${currentPct >= 80 ? '#4ade80' : currentPct >= 75 ? '#fbbf24' : '#ef4444'}`
                  }}>
                    {currentPct >= 80 ? '🟢 Safe' : currentPct >= 75 ? '🟡 Warning' : '🔴 Critical'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.9rem', textAlign: 'center' }}>
                    <div style={{ color: currentPct >= tgt ? '#4ade80' : '#ef4444', fontWeight: '900', fontSize: '1.5rem' }}>{currentPct}%</div>
                    <div style={{ color: '#64748b', fontSize: '0.72rem' }}>Current Attendance</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.9rem', textAlign: 'center' }}>
                    <div style={{ color: '#fbbf24', fontWeight: '900', fontSize: '1.5rem' }}>{safeBunks}</div>
                    <div style={{ color: '#64748b', fontSize: '0.72rem' }}>Safe Bunks Available</div>
                  </div>
                </div>

                {/* Warning details */}
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '0.75rem', marginBottom: '0.75rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
                  ⚠️ If you bunk 1 more class: Attendance becomes <strong style={{ color: '#fbbf24' }}>{bunkOneDropPct}%</strong>
                </div>

                {neededClasses > 0 && (
                  <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.75rem', padding: '0.75rem', fontSize: '0.82rem', color: '#ef4444' }}>
                    🚨 You need to attend the next <strong>{neededClasses} consecutive classes</strong> to reach your {tgt}% target.
                  </div>
                )}
              </div>

              <p style={{ color: '#64748b', fontSize: '0.7rem', margin: 0, marginTop: '1rem', fontStyle: 'italic' }}>
                * Disclaimer: Calculations are based on your entered data. College regulations may vary.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* SUBJECT-WISE ATTENDANCE TAB */}
      {activeTab === 'subjects' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '1rem' }}>📚 Subject-wise Attendance Breakdown</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {subjects.map(s => (
              <div key={s.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.1rem', padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1rem', margin: 0 }}>{s.name}</h3>
                  <span style={{ color: s.color, fontWeight: '800', fontSize: '0.8rem' }}>{s.status}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.4rem' }}>
                  <span>{s.attended}/{s.total} attended</span>
                  <span style={{ color: s.color, fontWeight: '700' }}>{s.pct}%</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                  <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: '3px' }} />
                </div>
                <div style={{ color: '#fbbf24', fontSize: '0.78rem', fontWeight: '700' }}>
                  {s.safeBunks > 0 ? `🟢 ${s.safeBunks} safe bunks left` : '🔴 0 bunks left — Must attend next classes!'}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ATTENDANCE SIMULATOR TAB */}
      {activeTab === 'simulator' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.5rem' }}>
            <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '0.5rem' }}>📈 Attendance What-If Simulator</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Simulate future attendance percentages based on upcoming classes you plan to attend or bunk.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '600' }}>Classes to Attend Next: {simAttend}</label>
                <input type="range" min="0" max="20" value={simAttend} onChange={e => setSimAttend(parseInt(e.target.value))} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '600' }}>Classes to Bunk Next: {simBunk}</label>
                <input type="range" min="0" max="10" value={simBunk} onChange={e => setSimBunk(parseInt(e.target.value))} style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '1rem', padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Simulated Projected Attendance:</div>
              <div style={{ color: simResultPct >= 75 ? '#4ade80' : '#ef4444', fontWeight: '900', fontSize: '2.2rem' }}>{simResultPct}%</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.82rem', marginTop: '0.5rem' }}>
                If you attend {simAttend} classes and bunk {simBunk} classes → Total ({att + simAttend}/{tot + simAttend + simBunk})
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* AI ATTENDANCE ADVISOR TAB */}
      {activeTab === 'advisor' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.5rem' }}>
            <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '0.5rem' }}>🤖 AI Attendance Advisor</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Ask AI whether it is safe to bunk tomorrow's specific classes.</p>

            <button onClick={askAdvisor} disabled={aiLoading} style={{ width: '100%', padding: '0.85rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', fontWeight: '800', fontSize: '1rem', border: 'none', cursor: 'pointer', marginBottom: '1.5rem' }}>
              {aiLoading ? '🤖 Analyzing Schedule...' : '🤖 Ask AI: "Can I bunk tomorrow?"'}
            </button>

            {aiAdvice && (
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '1rem', padding: '1.25rem' }}>
                <h3 style={{ color: '#fbbf24', fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{aiAdvice.verdict}</h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.88rem', marginBottom: '0.75rem' }}>{aiAdvice.reason}</p>
                <div style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', padding: '0.75rem', borderRadius: '0.6rem', fontSize: '0.82rem', fontWeight: '600' }}>
                  💡 Action Plan: {aiAdvice.actionPlan}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* TIMETABLE & LEAVE TAB */}
      {activeTab === 'timetable' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem', marginBottom: '1rem' }}>🗓️ Tomorrow's Timetable & Bunk Simulator</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {TIMETABLE.map(t => (
              <div key={t.time} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.9rem', padding: '1rem 1.25rem' }}>
                <div>
                  <span style={{ color: '#60a5fa', fontWeight: '700', fontSize: '0.85rem' }}>{t.time}</span>
                  <div style={{ color: 'white', fontWeight: '700', fontSize: '1rem' }}>{t.subject}</div>
                  <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Current: {t.currentPct}%</span>
                </div>
                <button
                  onClick={() => toast.success(t.canBunk ? `🟢 Safe to skip ${t.subject}!` : `🔴 DO NOT skip ${t.subject}! Attendance will drop below 75%`)}
                  style={{
                    padding: '0.5rem 1rem', borderRadius: '0.6rem', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer',
                    background: t.canBunk ? 'rgba(74,222,128,0.15)' : 'rgba(239,68,68,0.15)',
                    color: t.canBunk ? '#4ade80' : '#ef4444',
                    border: `1px solid ${t.canBunk ? '#4ade80' : '#ef4444'}`
                  }}
                >
                  {t.canBunk ? '🟢 Skip Lecture' : '🔴 DO NOT Skip'}
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
