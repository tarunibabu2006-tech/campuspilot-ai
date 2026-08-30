import React from 'react'
import { motion } from 'framer-motion'

export default function FeaturedSection({ onNavigate }) {
  const cards = [
    {
      id: 'notes',
      icon: '📝',
      label: 'Notes Hub',
      tag: '100K+ Notes',
      desc: 'AI-powered notes for all branches. Flashcards + Exam Qs',
      color: '#f59e0b',
      glow: 'rgba(245,158,11,0.3)'
    },
    {
      id: 'jobs',
      icon: '💼',
      label: 'Job Portal',
      tag: '1200+ Jobs',
      desc: 'Latest campus & off-campus openings with match scores',
      color: '#22c55e',
      glow: 'rgba(34,197,94,0.3)'
    },
    {
      id: 'aptitude',
      icon: '🧠',
      label: 'Aptitude Hub',
      tag: '500+ Qs',
      desc: 'Formulas, shortcuts & practice for TCS/Infosys/Wipro',
      color: '#14b8a6',
      glow: 'rgba(20,184,166,0.3)'
    },
    {
      id: 'career-predictor',
      icon: '🔮',
      label: 'Career Predictor',
      tag: 'AI Power',
      desc: '5-year trajectory & salary forecast based on your profile',
      color: '#c084fc',
      glow: 'rgba(192,132,252,0.3)'
    }
  ]

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.1rem', margin: '0 0 0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        ⭐ Featured &amp; Most Popular Modules
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => onNavigate(card.id)}
            style={{
              background: `radial-gradient(ellipse at top left, ${card.glow} 0%, rgba(15,23,42,0.85) 70%)`,
              border: `1px solid ${card.color}40`,
              borderRadius: '1.25rem',
              padding: '1.5rem',
              cursor: 'pointer',
              transition: 'all 0.25s',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.borderColor = card.color + '80'
              e.currentTarget.style.boxShadow = `0 12px 30px ${card.glow}`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = card.color + '40'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '2.2rem' }}>{card.icon}</span>
              <span style={{ background: `${card.color}20`, color: card.color, border: `1px solid ${card.color}40`, padding: '0.2rem 0.65rem', borderRadius: '2rem', fontSize: '0.68rem', fontWeight: '800' }}>
                {card.tag}
              </span>
            </div>
            <h4 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem', margin: '0 0 0.35rem' }}>
              {card.label}
            </h4>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0 0 1rem', lineHeight: 1.4 }}>
              {card.desc}
            </p>
            <div style={{ color: card.color, fontWeight: '700', fontSize: '0.82rem' }}>
              Open Feature →
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
