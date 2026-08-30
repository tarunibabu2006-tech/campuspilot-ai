import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import api from '../../services/api'
import { motion } from 'framer-motion'

// ── Animated counter hook ─────────────────────────────────────────
function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return count
}

// ── Static display counter ────────────────────────────────────────
function AnimCounter({ value, suffix = '' }) {
  const count = useCountUp(value)
  return <>{count.toLocaleString()}{suffix}</>
}

export default function Dashboard({ onNavigate }) {
  const { user } = useAuth()
  const { t, language } = useLanguage()
  const [stats, setStats] = useState({ totalStudents: 0, totalSkills: 50, totalJobs: 30 })
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const h = currentTime.getHours()
    if (h < 12) return t('goodMorning')
    if (h < 17) return t('goodAfternoon')
    if (h < 21) return t('goodEvening')
    return t('goodNight')
  }

  const localeMap = { en: 'en-IN', ta: 'ta-IN', hi: 'hi-IN' }
  const formattedDate = currentTime.toLocaleDateString(localeMap[language] || 'en-IN', {
    weekday: 'long', day: 'numeric', month: 'short'
  })

  useEffect(() => {
    api.get('/admin/dashboard').then(res => {
      if (res.data) {
        setStats({
          totalStudents: res.data.totalStudents || 0,
          totalSkills: res.data.totalSkills || 50,
          totalJobs: res.data.totalJobs || 30
        })
      }
    }).catch(() => { })
  }, [])

  // ── Featured modules (top row - most important) ───────────────
  const featuredCards = [
    { id: 'notes', icon: '📝', label: t('card_notes_title'), tag: t('card_notes_tag'), desc: t('card_notes_desc'), color: '#f59e0b', glow: 'rgba(245,158,11,0.3)' },
    { id: 'jobs', icon: '💼', label: t('card_jobs_title'), tag: t('card_jobs_tag'), desc: t('card_jobs_desc'), color: '#22c55e', glow: 'rgba(34,197,94,0.3)' },
    { id: 'aptitude', icon: '🧠', label: t('card_aptitude_title'), tag: t('card_aptitude_tag'), desc: t('card_aptitude_desc'), color: '#14b8a6', glow: 'rgba(20,184,166,0.3)' },
    { id: 'career-predictor', icon: '🔮', label: t('card_careerPredictor_title'), tag: t('card_careerPredictor_tag'), desc: t('card_careerPredictor_desc'), color: '#c084fc', glow: 'rgba(192,132,252,0.3)' },
  ]

  // ── All module cards ──────────────────────────────────────────
  const allDashboardCards = [
    // 🌟 Flagship
    { id: 'profile', icon: '👤', label: t('card_profile_title'), tag: t('card_profile_tag'), desc: t('card_profile_desc'), bg: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(37,99,235,0.15))', border: 'rgba(139,92,246,0.4)' },
    { id: 'leaderboard', icon: '🏆', label: t('card_leaderboard_title'), tag: t('card_leaderboard_tag'), desc: t('card_leaderboard_desc'), bg: 'linear-gradient(135deg, rgba(251,191,36,0.25), rgba(245,158,11,0.15))', border: 'rgba(251,191,36,0.4)' },
    { id: 'company-archives', icon: '🏛️', label: t('card_companyArchives_title'), tag: t('card_companyArchives_tag'), desc: t('card_companyArchives_desc'), bg: 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(37,99,235,0.15))', border: 'rgba(59,130,246,0.4)' },
    { id: 'alumni-network', icon: '🤝', label: t('card_alumniNetwork_title'), tag: t('card_alumniNetwork_tag'), desc: t('card_alumniNetwork_desc'), bg: 'linear-gradient(135deg, rgba(52,211,153,0.25), rgba(5,150,105,0.15))', border: 'rgba(52,211,153,0.4)' },
    { id: 'voice-interview', icon: '🎙️', label: t('card_voiceInterview_title'), tag: t('card_voiceInterview_tag'), desc: t('card_voiceInterview_desc'), bg: 'linear-gradient(135deg, rgba(239,68,68,0.25), rgba(185,28,28,0.15))', border: 'rgba(239,68,68,0.4)' },
    { id: 'gamification', icon: '⚡', label: t('card_gamification_title'), tag: t('card_gamification_tag'), desc: t('card_gamification_desc'), bg: 'linear-gradient(135deg, rgba(245,158,11,0.25), rgba(217,119,6,0.15))', border: 'rgba(245,158,11,0.4)' },
    { id: 'study-groups', icon: '👥', label: t('card_studyGroups_title'), tag: t('card_studyGroups_tag'), desc: t('card_studyGroups_desc'), bg: 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(4,120,87,0.15))', border: 'rgba(16,185,129,0.4)' },
    { id: 'career-gps', icon: '🗺️', label: t('card_careerGps_title'), tag: t('card_careerGps_tag'), desc: t('card_careerGps_desc'), bg: 'linear-gradient(135deg, rgba(96,165,250,0.25), rgba(29,78,216,0.15))', border: 'rgba(96,165,250,0.4)' },
    { id: 'resume-scorer', icon: '📊', label: t('card_resumeScorer_title'), tag: t('card_resumeScorer_tag'), desc: t('card_resumeScorer_desc'), bg: 'linear-gradient(135deg, rgba(6,182,212,0.25), rgba(14,116,144,0.15))', border: 'rgba(6,182,212,0.4)' },
    { id: 'ai-apply', icon: '🤖', label: t('card_aiApply_title'), tag: t('card_aiApply_tag'), desc: t('card_aiApply_desc'), bg: 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(109,40,217,0.15))', border: 'rgba(139,92,246,0.4)' },
    { id: 'skill-badge', icon: '🏷️', label: t('card_skillBadge_title'), tag: t('card_skillBadge_tag'), desc: t('card_skillBadge_desc'), bg: 'linear-gradient(135deg, rgba(244,114,182,0.25), rgba(190,24,93,0.15))', border: 'rgba(244,114,182,0.4)' },
    { id: 'mentors', icon: '🧑‍🏫', label: t('card_mentors_title'), tag: t('card_mentors_tag'), desc: t('card_mentors_desc'), bg: 'linear-gradient(135deg, rgba(20,184,166,0.25), rgba(15,118,110,0.15))', border: 'rgba(20,184,166,0.4)' },
    { id: 'mock-tests', icon: '📝', label: t('card_mockTests_title'), tag: t('card_mockTests_tag'), desc: t('card_mockTests_desc'), bg: 'linear-gradient(135deg, rgba(249,115,22,0.25), rgba(194,65,12,0.15))', border: 'rgba(249,115,22,0.4)' },

    // 📚 Core Study & Prep
    { id: 'skills', icon: '📚', label: t('card_skills_title'), tag: t('card_skills_tag'), desc: t('card_skills_desc'), bg: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(30,58,138,0.1))', border: 'rgba(59,130,246,0.3)' },
    { id: 'role-learning', icon: '🗺️', label: t('card_rolePath_title'), tag: t('card_rolePath_tag'), desc: t('card_rolePath_desc'), bg: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(88,28,135,0.1))', border: 'rgba(168,85,247,0.3)' },
    { id: 'resume', icon: '📄', label: t('card_resume_title'), tag: t('card_resume_tag'), desc: t('card_resume_desc'), bg: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(20,83,45,0.1))', border: 'rgba(34,197,94,0.3)' },
    { id: 'jobs', icon: '💼', label: t('card_jobs_title'), tag: t('card_jobs_tag'), desc: t('card_jobs_desc'), bg: 'linear-gradient(135deg, rgba(234,179,8,0.2), rgba(113,63,18,0.1))', border: 'rgba(234,179,8,0.3)' },
    { id: 'interview', icon: '🎤', label: t('card_interview_title'), tag: t('card_interview_tag'), desc: t('card_interview_desc'), bg: 'linear-gradient(135deg, rgba(244,63,94,0.2), rgba(136,19,55,0.1))', border: 'rgba(244,63,94,0.3)' },
    { id: 'aptitude', icon: '🧠', label: t('card_aptitude_full_title'), tag: t('card_aptitude_tag2'), desc: t('card_aptitude_full_desc'), bg: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(12,74,110,0.1))', border: 'rgba(14,165,233,0.3)' },
    { id: 'exam', icon: '📚', label: t('card_exam_title'), tag: t('card_exam_tag'), desc: t('card_exam_desc'), bg: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(127,29,29,0.1))', border: 'rgba(239,68,68,0.3)' },
    { id: 'viva', icon: '🎤', label: t('card_viva_title'), tag: t('card_viva_tag'), desc: t('card_viva_desc'), bg: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(88,28,135,0.1))', border: 'rgba(168,85,247,0.3)' },
    { id: 'placement', icon: '💼', label: t('card_placement_title'), tag: t('card_placement_tag'), desc: t('card_placement_desc'), bg: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,78,59,0.1))', border: 'rgba(16,185,129,0.3)' },
    { id: 'notes', icon: '📝', label: t('card_notes_full_title'), tag: t('card_notes_tag2'), desc: t('card_notes_full_desc'), bg: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(120,53,15,0.1))', border: 'rgba(245,158,11,0.3)' },
    { id: 'bunk', icon: '🏃', label: t('card_bunk_title'), tag: t('card_bunk_tag'), desc: t('card_bunk_desc'), bg: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(49,46,129,0.1))', border: 'rgba(99,102,241,0.3)' },
    { id: 'job', icon: '🛡️', label: t('card_job_title'), tag: t('card_job_tag'), desc: t('card_job_desc'), bg: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(153,27,27,0.1))', border: 'rgba(239,68,68,0.3)' },
    { id: 'skill', icon: '🗺️', label: t('card_skill_title'), tag: t('card_skill_tag'), desc: t('card_skill_desc'), bg: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(21,94,117,0.1))', border: 'rgba(6,182,212,0.3)' },
    { id: 'chat', icon: '🤖', label: t('card_chat_title'), tag: t('card_chat_tag'), desc: t('card_chat_desc'), bg: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(91,33,182,0.1))', border: 'rgba(139,92,246,0.3)' },
    { id: 'career-predictor', icon: '🔮', label: t('card_careerPredictor_title'), tag: t('card_careerPredictor_tag'), desc: t('card_careerPredictor_desc'), bg: 'linear-gradient(135deg, rgba(192,132,252,0.2), rgba(147,51,234,0.1))', border: 'rgba(192,132,252,0.3)' },
  ]

  const quickActionList = [
    { id: 'exam', label: `📚 ${t('exam')}` },
    { id: 'bunk', label: `🏃 ${t('bunk')}` },
    { id: 'viva', label: `🎤 ${t('viva')}` },
    { id: 'resume', label: `📄 ${t('resume')}` },
    { id: 'aptitude', label: `🧠 ${t('aptitude')}` },
    { id: 'interview', label: `🎤 ${t('interview')}` },
    { id: 'placement', label: `💼 ${t('placement')}` },
    { id: 'job', label: `🛡️ ${t('job')}` },
  ]

  const userName = user?.name ? user.name.split(' ')[0] : 'Student'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>

      {/* ── ADMIN CONTROL BAR (ONLY FOR ADMIN) ────────────────────── */}
      {user?.role === 'admin' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(217,119,6,0.1))',
            border: '1px solid rgba(245,158,11,0.5)',
            borderRadius: '1.25rem',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            boxShadow: '0 4px 20px rgba(245,158,11,0.2)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span style={{ fontSize: '2rem' }}>👑</span>
            <div>
              <div style={{ color: '#fbbf24', fontWeight: '900', fontSize: '1.05rem' }}>
                {t('adminControlCenter')}
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>
                {t('adminBannerDesc', { email: 'tarunibabu2006@gmail.com' })}
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('admin')}
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#1a1a1a',
              border: 'none',
              borderRadius: '0.75rem',
              padding: '0.65rem 1.4rem',
              fontWeight: '900',
              fontSize: '0.88rem',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(245,158,11,0.4)',
              transition: 'transform 0.15s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {t('openRealAdminPanel')}
          </button>
        </motion.div>
      )}

      {/* ── HERO WELCOME ─────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #0f172a 100%)',
          borderRadius: '1.5rem', padding: '2rem',
          border: '1px solid rgba(139,92,246,0.35)',
          boxShadow: '0 8px 32px rgba(124,58,237,0.25)',
          position: 'relative', overflow: 'hidden'
        }}>
        {/* Decorative orbs */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '20%', width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)', borderRadius: '50%' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', position: 'relative' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '2rem' }}>🎓</span>
              <div>
                <p style={{ color: '#a5b4fc', margin: 0, fontSize: '0.85rem', fontWeight: '600' }}>
                  {getGreeting()}, {formattedDate}
                </p>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '900', margin: 0, color: '#fff' }}>
                  {t('welcomeBack', { name: userName })}
                </h2>
              </div>
            </div>
            <p style={{ color: '#a5b4fc', fontSize: '0.9rem', margin: '0 0 1.25rem', maxWidth: '500px' }}>
              {t('heroTagline')}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={() => onNavigate('notes')}
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '0.75rem', fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(124,58,237,0.4)' }}>
                📝 {t('openNotesHub')}
              </button>
              <button onClick={() => onNavigate('jobs')}
                style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.4)', padding: '0.6rem 1.25rem', borderRadius: '0.75rem', fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer' }}>
                💼 {t('browseJobs')}
              </button>
              <button onClick={() => onNavigate('chat')}
                style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.4)', padding: '0.6rem 1.25rem', borderRadius: '0.75rem', fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer' }}>
                🤖 {t('askAi')}
              </button>
            </div>
          </div>

          {/* Platform stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', minWidth: '180px' }}>
            {[
              { icon: '📚', label: t('skillsAvailable'), value: stats.totalSkills, suffix: '+', color: '#4ade80' },
              { icon: '💼', label: t('jobOpenings'), value: stats.totalJobs, suffix: '+', color: '#fbbf24' },
              { icon: '📝', label: t('studyNotes'), value: 100000, suffix: '+', color: '#a78bfa' },
              { icon: '🎯', label: t('careerModules'), value: 28, suffix: ` ${t('toolsSuffix')}`, color: '#60a5fa' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: '1.1rem' }}>{s.icon}</span>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: s.color, lineHeight: 1 }}>
                    <AnimCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── FEATURED MODULES ─────────────────────────────────────── */}
      <div>
        <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', margin: '0 0 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          ⭐ {t('featuredAndPopular')}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {featuredCards.map((card, i) => (
            <motion.div key={card.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              onClick={() => onNavigate(card.id)}
              style={{
                background: `radial-gradient(ellipse at top left, ${card.glow} 0%, rgba(15,23,42,0.8) 70%)`,
                border: `1px solid ${card.color}40`,
                borderRadius: '1.25rem', padding: '1.5rem', cursor: 'pointer',
                transition: 'all 0.25s', position: 'relative', overflow: 'hidden'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = card.color + '80'; e.currentTarget.style.boxShadow = `0 16px 40px ${card.glow}` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = card.color + '40'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', background: `radial-gradient(circle, ${card.color}20 0%, transparent 70%)`, borderRadius: '50%' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '2.2rem' }}>{card.icon}</span>
                <span style={{ background: `${card.color}20`, color: card.color, border: `1px solid ${card.color}40`, padding: '0.2rem 0.65rem', borderRadius: '2rem', fontSize: '0.68rem', fontWeight: '800' }}>
                  {card.tag}
                </span>
              </div>
              <h4 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem', margin: '0 0 0.35rem' }}>{card.label}</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0 0 1rem', lineHeight: 1.4 }}>{card.desc}</p>
              <div style={{ color: card.color, fontWeight: '700', fontSize: '0.82rem' }}>{t('openFeature')}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── QUICK LINKS ROW ──────────────────────────────────────── */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '1.25rem', padding: '1.25rem' }}>
        <h3 style={{ color: 'white', fontWeight: '800', fontSize: '0.95rem', margin: '0 0 0.75rem' }}>⚡ {t('quickActions')}</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {quickActionList.map(q => (
            <button key={q.id} onClick={() => onNavigate(q.id)}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', padding: '0.45rem 0.9rem', borderRadius: '0.6rem', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.2)'; e.currentTarget.style.color = 'white' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#cbd5e1' }}>
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── ALL MODULES GRID ─────────────────────────────────────── */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.5rem', padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1.25rem', fontSize: '1.2rem', fontWeight: '900', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🎓</span> {t('fullFeatureSuite')}
          <span style={{ background: 'rgba(139,92,246,0.2)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.3)', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.72rem', fontWeight: '700', marginLeft: '0.5rem' }}>
            {t('modulesCount', { count: allDashboardCards.length })}
          </span>
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
          {allDashboardCards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(i * 0.025, 0.6) }}
              onClick={() => onNavigate(card.id)}
              style={{
                background: card.bg,
                border: `1px solid ${card.border}`,
                borderRadius: '1.25rem',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '150px'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 10px 30px ${card.border}` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '2.2rem' }}>{card.icon}</span>
                <span style={{ fontSize: '0.63rem', background: 'rgba(0,0,0,0.5)', padding: '0.2rem 0.6rem', borderRadius: '1rem', color: '#fff', fontWeight: '800' }}>
                  {card.tag}
                </span>
              </div>
              <h4 style={{ margin: '0 0 0.3rem', color: '#fff', fontSize: '1rem', fontWeight: '800' }}>{card.label}</h4>
              <p style={{ margin: '0 0 auto', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.35 }}>{card.desc}</p>
              <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#fff', fontWeight: '800' }}>
                {t('openFeature')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── FOOTER BANNER ────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(37,99,235,0.1))', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '1.25rem', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p style={{ color: '#a78bfa', fontWeight: '800', margin: 0, fontSize: '0.95rem' }}>{t('footerTagline')}</p>
          <p style={{ color: '#64748b', margin: '0.25rem 0 0', fontSize: '0.78rem' }}>{t('footerSubtext')}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => onNavigate('profile')} style={{ background: 'rgba(139,92,246,0.2)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.3)', padding: '0.5rem 1rem', borderRadius: '0.6rem', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer' }}>
            {t('completeProfile')}
          </button>
          <button onClick={() => onNavigate('leaderboard')} style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)', padding: '0.5rem 1rem', borderRadius: '0.6rem', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer' }}>
            {t('viewLeaderboard')}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
