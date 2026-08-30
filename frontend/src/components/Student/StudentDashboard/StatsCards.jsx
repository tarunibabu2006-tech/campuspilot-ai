import React from 'react';
import { motion } from 'framer-motion';

export default function StatsCards({ stats, user }) {
  const cards = [
    { id: 'skills', label: 'Skills Learned', value: stats.skillsLearned || 0, icon: '📚', color: '#7c3aed' },
    { id: 'jobs', label: 'Jobs Applied', value: stats.jobsApplied || 0, icon: '💼', color: '#22c55e' },
    { id: 'interviews', label: 'Mock Interviews', value: stats.interviews || 0, icon: '🎤', color: '#f59e0b' },
    { id: 'xp', label: 'XP Points', value: stats.xp || 0, icon: '⭐', color: '#14b8a6' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
      {cards.map((card, i) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          style={{
            background: `linear-gradient(135deg, ${card.color}33, ${card.color}11)`,
            border: `1px solid ${card.color}44`,
            borderRadius: '1rem',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'default',
          }}
          whileHover={{ scale: 1.03, boxShadow: `0 8px 24px ${card.color}55` }}
        >
          <span style={{ fontSize: '1.8rem' }}>{card.icon}</span>
          <h4 style={{ margin: '0.4rem 0 0.2rem', fontWeight: '800', fontSize: '1rem' }}>{card.label}</h4>
          <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700' }}>{card.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
