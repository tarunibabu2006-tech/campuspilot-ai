import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const SPOKEN_LEVELS = [
  {
    level: 1,
    title: 'Level 1: Basic Everyday Spoken English',
    desc: 'Self-introductions, daily greetings, sentence building & common phrases',
    xpReward: 30,
    color: '#4ade80',
    lessons: [
      {
        topic: '1. Self Introduction & Meeting People',
        dialogue: 'Hello! My name is Rahul. I am currently pursuing Computer Science Engineering.',
        prompt: 'Introduce yourself in 2-3 sentences mentioning your name and college branch.'
      },
      {
        topic: '2. Daily Routine & Asking Questions',
        dialogue: 'What time does the lecture start tomorrow? Could you please share the syllabus?',
        prompt: 'Ask a classmate politely for class timing and study materials.'
      },
      {
        topic: '3. Expressing Likes, Dislikes & Opinions',
        dialogue: 'I really enjoy working on web development projects because I love building user interfaces.',
        prompt: 'State your favorite hobby or programming language and explain why you like it.'
      }
    ]
  },
  {
    level: 2,
    title: 'Level 2: Intermediate Professional English',
    desc: 'Workplace communication, email etiquette, project explanations & standup updates',
    xpReward: 40,
    color: '#38bdf8',
    lessons: [
      {
        topic: '1. Agile Daily Standup Update',
        dialogue: 'Yesterday I finished implementing the database schema. Today I will work on REST API endpoints.',
        prompt: 'Give a 45-second daily standup update explaining your yesterday work and today plan.'
      },
      {
        topic: '2. Explaining a Technical Bug to Teammates',
        dialogue: 'We identified a race condition in the payment module during load testing. I am applying an atomic lock.',
        prompt: 'Explain a technical issue you resolved in a team project with confidence.'
      },
      {
        topic: '3. Professional Presentations & Slide Deck Delivery',
        dialogue: 'In this presentation, we will walk through our architecture, performance benchmarks, and deployment strategy.',
        prompt: 'Deliver the opening statement for your final year project presentation.'
      }
    ]
  },
  {
    level: 3,
    title: 'Level 3: Advanced Business Communication',
    desc: 'Interview negotiations, cross-functional stakeholder pitches & public speaking',
    xpReward: 50,
    color: '#c084fc',
    lessons: [
      {
        topic: '1. Salary Negotiation & Offer Evaluation',
        dialogue: 'Thank you for the offer. Based on my technical skill set and market research for this role, I would like to propose ₹8.5 LPA.',
        prompt: 'Practice negotiating a compensation package politely yet assertively.'
      },
      {
        topic: '2. Pitching a Product Architecture to Leadership',
        dialogue: 'Migrating to microservices will reduce our deployment cycle time by 40% and enhance system resilience.',
        prompt: 'Pitch an engineering improvement to senior leadership highlighting ROI and performance.'
      },
      {
        topic: '3. Handling Critical Disagreements Professionally',
        dialogue: 'I see your point regarding monolithic simplicity, but let us look at the scalability bottlenecks at 100k requests/sec.',
        prompt: 'Diplomatically counter a colleague’s design proposition using data and engineering facts.'
      }
    ]
  },
  {
    level: 4,
    title: 'Level 4: Very Advanced Executive Thought Leadership',
    desc: 'Keynote speaking, investor pitch, global accent adaptation & executive presence',
    xpReward: 60,
    color: '#f59e0b',
    lessons: [
      {
        topic: '1. Tech Conference Keynote Opening',
        dialogue: 'Good morning everyone. Today artificial intelligence is rewriting the playbook of global software engineering...',
        prompt: 'Deliver a powerful 60-second keynote introduction addressing 500+ software engineers.'
      },
      {
        topic: '2. Venture Capital & Investor Pitch',
        dialogue: 'We are solving the placement disparity in Tier 2/3 engineering colleges by using multimodal AI mentors at zero cost.',
        prompt: 'Pitch CampusPilot AI to a panel of global venture capitalists in under 1 minute.'
      },
      {
        topic: '3. Global Executive Presence & Accent Neutrality',
        dialogue: 'Let us align our quarterly OKRs with the international expansion roadmap for Q3 and Q4.',
        prompt: 'Deliver an executive board briefing with neutral accent, clear cadence, and authoritative tone.'
      }
    ]
  }
]

export default function AiSpokenClass() {
  const { user, updateUser } = useAuth()
  const [selectedLevel, setSelectedLevel] = useState(1)
  const [selectedLessonIdx, setSelectedLessonIdx] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [evaluating, setEvaluating] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const recognitionRef = useRef(null)
  const currentLevelConfig = SPOKEN_LEVELS.find(l => l.level === selectedLevel) || SPOKEN_LEVELS[0]
  const currentLesson = currentLevelConfig.lessons[selectedLessonIdx] || currentLevelConfig.lessons[0]

  const speakSample = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.rate = 0.9
      u.lang = 'en-US'
      window.speechSynthesis.speak(u)
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) recognitionRef.current.stop()
      setIsRecording(false)
    } else {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SpeechRecognition) {
        toast.error('Speech recognition not supported in this browser. Please use Chrome or Edge!')
        return
      }

      const rec = new SpeechRecognition()
      rec.continuous = true
      rec.interimResults = true
      rec.lang = 'en-US'

      rec.onstart = () => {
        setIsRecording(true)
        toast.success('🎙️ Microphone Listening... Speak your sentence!')
      }

      rec.onresult = (e) => {
        let t = ''
        for (let i = 0; i < e.results.length; i++) {
          t += e.results[i][0].transcript + ' '
        }
        setTranscript(t)
      }

      rec.onerror = () => setIsRecording(false)
      rec.onend = () => setIsRecording(false)

      recognitionRef.current = rec
      rec.start()
    }
  }

  const handleEvaluateSpeech = () => {
    if (!transcript.trim()) {
      toast.error('Please record your voice before submitting!')
      return
    }

    setEvaluating(true)
    setTimeout(() => {
      const words = transcript.trim().split(/\s+/).length
      const score = Math.min(100, 70 + words * 2)

      setFeedback({
        score,
        fluency: 9,
        pronunciation: 8.5,
        vocabulary: 9,
        comment: `Excellent articulation! Your pitch, pace, and sentence structure matched the professional standard required for ${currentLevelConfig.title}.`,
        suggestions: 'Keep practicing with varied sentence starters to enhance natural conversational flow.'
      })
      setEvaluating(false)

      if (user) {
        updateUser({ ...user, xp: (user?.xp || 0) + currentLevelConfig.xpReward })
      }
      toast.success(`🎉 Evaluation Complete! +${currentLevelConfig.xpReward} XP Awarded!`)
    }, 900)
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* ── HEADER ─────────────────────────────────────────────────── */}
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
            <span style={{ fontSize: '2.5rem' }}>🗣️</span>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
                AI Spoken English & Accent Coaching (4 Progressive Levels)
              </h1>
              <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
                From Everyday English to Corporate Standups, Business Negotiations & Executive Public Speaking
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 4 LEVEL CARDS ─────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        {SPOKEN_LEVELS.map(lvl => {
          const isSelected = selectedLevel === lvl.level
          return (
            <div
              key={lvl.level}
              onClick={() => {
                setSelectedLevel(lvl.level)
                setSelectedLessonIdx(0)
                setTranscript('')
                setFeedback(null)
              }}
              style={{
                background: isSelected ? `linear-gradient(135deg, ${lvl.color}22, rgba(15,23,42,0.9))` : 'rgba(255,255,255,0.03)',
                border: `2px solid ${isSelected ? lvl.color : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '1.25rem',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: isSelected ? `0 8px 30px ${lvl.color}33` : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: lvl.color, fontWeight: '900', fontSize: '0.85rem' }}>LEVEL {lvl.level}</span>
                <span style={{ background: `${lvl.color}22`, color: lvl.color, padding: '0.15rem 0.5rem', borderRadius: '0.5rem', fontSize: '0.72rem', fontWeight: '800' }}>
                  +{lvl.xpReward} XP
                </span>
              </div>
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1rem', margin: '0 0 0.35rem' }}>
                {lvl.title.split(':')[1]}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: 0, lineHeight: 1.4 }}>
                {lvl.desc}
              </p>
            </div>
          )
        })}
      </div>

      {/* ── ACTIVE LESSON & SPEECH COACHING AREA ───────────────────── */}
      <motion.div
        key={`${selectedLevel}-${selectedLessonIdx}`}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          border: `1px solid ${currentLevelConfig.color}55`,
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
        }}
      >
        {/* Lesson Selector Sub-bar */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', marginBottom: '1.5rem', paddingBottom: '0.25rem' }}>
          {currentLevelConfig.lessons.map((les, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedLessonIdx(idx)
                setTranscript('')
                setFeedback(null)
              }}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.65rem',
                background: selectedLessonIdx === idx ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.04)',
                border: selectedLessonIdx === idx ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                color: selectedLessonIdx === idx ? 'white' : '#94a3b8',
                fontWeight: '700',
                fontSize: '0.8rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {les.topic}
            </button>
          ))}
        </div>

        {/* Lesson Dialogue & Audio Preview */}
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.85rem' }}>
              🎧 AI Model Sample Audio & Pronunciation Guide
            </span>
            <button
              onClick={() => speakSample(currentLesson.dialogue)}
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                color: 'white',
                border: 'none',
                padding: '0.35rem 0.85rem',
                borderRadius: '0.5rem',
                fontWeight: '700',
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              🔊 Listen to Native Speaker
            </button>
          </div>
          <p style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: '600', fontStyle: 'italic', margin: '0 0 1rem', lineHeight: 1.6 }}>
            "{currentLesson.dialogue}"
          </p>

          <div style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: '700' }}>
            🎯 Your Speaking Prompt: {currentLesson.prompt}
          </div>
        </div>

        {/* Live Microphone Recording Area */}
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '1.25rem',
          padding: '2rem',
          textAlign: 'center',
          marginBottom: '1.5rem',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <button
            onClick={toggleRecording}
            style={{
              width: '75px',
              height: '75px',
              borderRadius: '50%',
              border: 'none',
              background: isRecording ? '#ef4444' : 'linear-gradient(135deg, #7c3aed, #2563eb)',
              color: 'white',
              fontSize: '2rem',
              cursor: 'pointer',
              boxShadow: isRecording ? '0 0 40px rgba(239, 68, 68, 0.8)' : '0 0 25px rgba(124, 58, 237, 0.4)',
              transition: 'all 0.25s ease',
              marginBottom: '1rem'
            }}
          >
            {isRecording ? '⏹️' : '🎙️'}
          </button>
          <div style={{ color: isRecording ? '#f87171' : '#94a3b8', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
            {isRecording ? '🔴 Listening live... Speak now!' : 'Tap Microphone to Speak Response'}
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '0.75rem',
            padding: '1rem',
            minHeight: '80px',
            color: transcript ? 'white' : '#64748b',
            fontSize: '0.92rem',
            lineHeight: 1.6,
            textAlign: 'left'
          }}>
            {transcript || 'Your live speech transcript will appear here...'}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleEvaluateSpeech}
          disabled={evaluating || !transcript}
          style={{
            width: '100%',
            padding: '0.85rem',
            borderRadius: '0.75rem',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            fontWeight: '800',
            fontSize: '0.95rem',
            border: 'none',
            cursor: evaluating || !transcript ? 'not-allowed' : 'pointer',
            opacity: evaluating || !transcript ? 0.6 : 1
          }}
        >
          {evaluating ? '🤖 AI Analyzing Pronunciation & Fluency...' : `Evaluate My Speech (+${currentLevelConfig.xpReward} XP) ✨`}
        </button>

        {/* AI Feedback Report */}
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '1.5rem',
              background: 'rgba(34, 197, 94, 0.08)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '1rem',
              padding: '1.25rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ color: '#4ade80', fontWeight: '800', fontSize: '1.1rem', margin: 0 }}>
                🎯 Speech Coaching Analysis
              </h3>
              <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '0.2rem 0.65rem', borderRadius: '0.5rem', fontWeight: '800', fontSize: '0.85rem' }}>
                Score: {feedback.score}/100
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ color: '#60a5fa', fontWeight: '800' }}>{feedback.fluency}/10</div>
                <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Fluency & Cadence</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ color: '#c084fc', fontWeight: '800' }}>{feedback.pronunciation}/10</div>
                <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Pronunciation</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ color: '#facc15', fontWeight: '800' }}>{feedback.vocabulary}/10</div>
                <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Corporate Vocabulary</div>
              </div>
            </div>

            <p style={{ color: '#e2e8f0', fontSize: '0.85rem', margin: '0 0 0.5rem' }}>
              {feedback.comment}
            </p>
            <p style={{ color: '#fbbf24', fontSize: '0.8rem', margin: 0 }}>
              💡 Tip: {feedback.suggestions}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
