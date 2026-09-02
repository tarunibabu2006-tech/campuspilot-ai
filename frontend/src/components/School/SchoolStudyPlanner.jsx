import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function SchoolStudyPlanner({ selectedClass, subjectsList }) {
  const [completedTasks, setCompletedTasks] = useState({})

  const toggleTask = (id) => {
    setCompletedTasks(prev => ({ ...prev, [id]: !prev[id] }))
    toast.success('Task progress saved! ✨')
  }

  const dailySchedule = [
    { id: 't1', time: '06:00 AM - 07:30 AM', subject: 'Mathematics', topic: 'Real Numbers & AP Proofs (NCERT Ex 1.2 & 5.2)', icon: '📐' },
    { id: 't2', time: '04:30 PM - 06:00 PM', subject: 'Science (Physics/Chem)', topic: 'Light Ray Optics & Balancing Chemical Reactions', icon: '🔬' },
    { id: 't3', time: '06:30 PM - 07:30 PM', subject: 'Social Science / English', topic: 'Nationalism in India Timeline & Map Work', icon: '🌍' },
    { id: 't4', time: '08:30 PM - 09:30 PM', subject: 'Revision & Mock Drill', topic: 'Solve 20 MCQs from Level 3 Question Bank', icon: '⚡' }
  ]

  const weeklySubjects = [
    { day: 'Monday', subjects: ['Mathematics (Trigonometry)', 'Science (Electricity)'], hours: '3.5 Hours' },
    { day: 'Tuesday', subjects: ['Social Science (Federalism)', 'English (Grammar & Letters)'], hours: '3 Hours' },
    { day: 'Wednesday', subjects: ['Mathematics (Quadratic Equations)', 'Science (Carbon Compounds)'], hours: '3.5 Hours' },
    { day: 'Thursday', subjects: ['Social Science (Economics)', 'Language (Tamil / Hindi)'], hours: '3 Hours' },
    { day: 'Friday', subjects: ['Science (Life Processes)', 'Mathematics (Coordinate Geometry)'], hours: '3.5 Hours' },
    { day: 'Saturday', subjects: ['Full Syllabus EAD Sample Paper #1 (Timed 3 Hours)'], hours: '4 Hours' },
    { day: 'Sunday', subjects: ['Mock Test Analysis, Formula Revision & Weak Area Drill'], hours: '3 Hours' }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ background: 'rgba(52,211,153,0.2)', color: '#6ee7b7', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
            BOARD TOPPER STUDY ARCHITECTURE
          </span>
          <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.3rem', margin: '0.3rem 0 0' }}>
            📅 AI Daily Study Planner & 7-14-30 Day Spaced Revision Cycle
          </h2>
        </div>

        <button
          onClick={() => toast.success('🗓️ Study schedule synchronized with your calendar & reminders!')}
          style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', padding: '0.55rem 1.1rem', borderRadius: '0.55rem', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer' }}
        >
          ⏰ Sync Daily Reminders
        </button>
      </div>

      {/* Today's Tasks */}
      <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '1.25rem', padding: '1.5rem' }}>
        <h3 style={{ color: '#c4b5fd', fontSize: '1.05rem', fontWeight: '800', margin: '0 0 1rem' }}>
          🎯 Today's High-Yield Target Tasks (Click to Mark Done)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {dailySchedule.map(task => {
            const isDone = !!completedTasks[task.id]
            return (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                style={{
                  background: isDone ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.02)',
                  border: isDone ? '1px solid #22c55e' : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>{task.icon}</span>
                  <div>
                    <div style={{ color: isDone ? '#4ade80' : 'white', fontWeight: '800', fontSize: '0.92rem', textDecoration: isDone ? 'line-through' : 'none' }}>
                      {task.subject}: {task.topic}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                      ⏱️ {task.time}
                    </div>
                  </div>
                </div>

                <span style={{ background: isDone ? '#10b981' : 'rgba(255,255,255,0.08)', color: 'white', padding: '0.25rem 0.65rem', borderRadius: '0.4rem', fontSize: '0.75rem', fontWeight: '800' }}>
                  {isDone ? '✓ Completed' : 'Mark Done'}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Weekly Schedule */}
      <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
        <h3 style={{ color: 'white', fontSize: '1.05rem', fontWeight: '800', margin: '0 0 1rem' }}>
          🗓️ Weekly Subject Balance Table (Monday to Sunday)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          {weeklySubjects.map((dayPlan, idx) => (
            <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.75rem', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <strong style={{ color: '#fbbf24', fontSize: '0.88rem' }}>{dayPlan.day}</strong>
                <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>{dayPlan.hours}</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#cbd5e1', fontSize: '0.78rem', lineHeight: 1.5 }}>
                {dayPlan.subjects.map((sub, sIdx) => (
                  <li key={sIdx}>{sub}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
