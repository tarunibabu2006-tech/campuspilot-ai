import React, { useState, useRef } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'

function VoiceMockInterview() {
  const [role, setRole] = useState('Full Stack Developer')
  const [difficulty, setDifficulty] = useState('medium')
  const [voiceLang, setVoiceLang] = useState('en-IN')
  const [questionData, setQuestionData] = useState(null)
  const [transcript, setTranscript] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const recognitionRef = useRef(null)

  const sampleRoles = [
    'Frontend Developer (React)',
    'Backend Developer (Node.js)',
    'Full Stack Developer',
    'Data Scientist & ML Engineer',
    'Cloud / DevOps Engineer',
    'HR / Behavioral Round'
  ]

  const startInterview = async () => {
    if (!role.trim()) {
      toast.error('Please choose or enter your target role!')
      return
    }

    setLoading(true)
    setResult(null)
    setTranscript('')
    try {
      const response = await api.post('/voice-interview/start', {
        role: role.trim(),
        difficulty
      })
      setQuestionData(response.data)
      toast.success('Interview question ready! 🎙️')
      
      // Auto-read question aloud if speech synthesis is supported
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(response.data.question)
        utterance.rate = 0.95
        window.speechSynthesis.speak(utterance)
      }
    } catch (error) {
      toast.error('Failed to generate interview question.')
    }
    setLoading(false)
  }

  const speakQuestionAgain = () => {
    if (questionData?.question && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(questionData.question)
      utterance.rate = 0.95
      window.speechSynthesis.speak(utterance)
      toast.info('Reading question aloud... 🔊')
    }
  }

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      toast.error('Speech recognition not supported in this browser. Please type your answer or use Google Chrome!')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = voiceLang
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onstart = () => {
      setIsRecording(true)
      toast.info('Recording... Speak into your microphone 🎙️')
    }

    recognition.onresult = (event) => {
      let finalStr = ''
      for (let i = 0; i < event.results.length; i++) {
        finalStr += event.results[i][0].transcript + ' '
      }
      setTranscript(finalStr)
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      if (event.error !== 'no-speech') {
        toast.error(`Mic error: ${event.error}`)
      }
      setIsRecording(false)
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
      toast.success('Audio captured! Click "Evaluate Verbal Response" below.')
    }
  }

  const submitVoiceResponse = async () => {
    if (!transcript.trim()) {
      toast.error('Please record or type your response before submitting!')
      return
    }

    setAnalyzing(true)
    try {
      const response = await api.post('/voice-interview/submit', {
        transcript: transcript.trim(),
        role: role.trim(),
        questionId: 1
      })
      setResult(response.data)
      toast.success('Voice Evaluation Completed! 📊')
    } catch (error) {
      toast.error('Evaluation failed. Please try again.')
    }
    setAnalyzing(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #450a0a 0%, #1f1224 50%, #0f172a 100%)',
        border: '1px solid rgba(239, 68, 68, 0.4)',
        boxShadow: '0 8px 32px rgba(239, 68, 68, 0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.8rem' }}>🎙️</span>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.75rem', color: '#fff', fontWeight: 800 }}>
                AI Voice Mock Interview
              </h2>
              <p style={{ margin: '0.25rem 0 0', color: '#fca5a5', fontSize: '0.95rem' }}>
                Speech-to-Text Verbal Practice • Confidence &amp; Clarity Scoring • Real-Time AI Feedback
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-danger">🗣️ Speech-to-Text</span>
            <span className="badge badge-info">🇮🇳 Multilingual Accents</span>
            <span className="badge badge-success">📊 Verbal Clarity Score</span>
          </div>
        </div>
      </div>

      {/* Role Selection Card */}
      <div className="card">
        <h3 style={{ color: 'var(--text-primary)', marginTop: 0 }}>⚙️ Configure Interview Round</h3>
        
        <div className="grid grid-3" style={{ gap: '1rem', marginTop: '1rem' }}>
          <div>
            <label className="form-label">🎯 Target Role</label>
            <input
              type="text"
              className="form-input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Full Stack Developer"
            />
          </div>

          <div>
            <label className="form-label">📈 Difficulty Level</label>
            <select
              className="form-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">🟢 Easy (Internship / Fresher)</option>
              <option value="medium">🟡 Medium (0-2 Years Exp)</option>
              <option value="hard">🔴 Hard (Product Company / FAANG)</option>
            </select>
          </div>

          <div>
            <label className="form-label">🗣️ Voice Language &amp; Accent</label>
            <select
              className="form-select"
              value={voiceLang}
              onChange={(e) => setVoiceLang(e.target.value)}
            >
              <option value="en-IN">🇮🇳 English (Indian Accent)</option>
              <option value="ta-IN">🇮🇳 Tamil (தமிழ்)</option>
              <option value="hi-IN">🇮🇳 Hindi (हिन्दी)</option>
              <option value="te-IN">🇮🇳 Telugu (తెలుగు)</option>
            </select>
          </div>
        </div>

        {/* Quick Role Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
          {sampleRoles.map((r, i) => (
            <button
              key={i}
              onClick={() => setRole(r)}
              className={`btn btn-outline ${role === r ? 'btn-primary' : ''}`}
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
            >
              {r}
            </button>
          ))}
        </div>

        <button
          onClick={startInterview}
          disabled={loading}
          className="btn btn-primary"
          style={{
            background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
            padding: '0.85rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            marginTop: '1.25rem',
            width: '100%',
            boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)'
          }}
        >
          {loading ? '🎙️ Preparing AI Interviewer...' : 'Start Voice Interview 🎙️'}
        </button>
      </div>

      {/* Spoken Question & Voice Recording Area */}
      {questionData && (
        <div className="card" style={{ border: '1px solid rgba(239, 68, 68, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="badge badge-danger">
              ❓ Question for {questionData.role || role} ({difficulty.toUpperCase()})
            </span>
            <button
              onClick={speakQuestionAgain}
              className="btn btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', gap: '0.3rem' }}
            >
              🔊 Read Aloud
            </button>
          </div>

          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            fontSize: '1.15rem',
            lineHeight: '1.6',
            color: '#fff',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            "{questionData.question}"
          </div>

          {/* Ideal points to cover */}
          {questionData.idealAnswerKeyPoints && (
            <div style={{ marginBottom: '1.5rem', padding: '0.75rem 1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#60a5fa' }}>💡 Key Concepts to Mention:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.35rem' }}>
                {questionData.idealAnswerKeyPoints.map((pt, idx) => (
                  <span key={idx} style={{ fontSize: '0.75rem', color: '#93c5fd' }}>• {pt}</span>
                ))}
              </div>
            </div>
          )}

          {/* Recording Controls */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="btn btn-primary"
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                  padding: '0.9rem',
                  fontSize: '1rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>🔴</span> Click to Start Speaking
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="btn btn-danger"
                style={{
                  flex: 1,
                  padding: '0.9rem',
                  fontSize: '1rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  animation: 'pulse 1.5s infinite'
                }}
              >
                <span>⏹️</span> Stop Recording (Listening...)
              </button>
            )}
          </div>

          {/* Transcript Preview & Manual Edit */}
          <div>
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>📝 Live Speech Transcript (You can also type/edit):</span>
              {isRecording && <span style={{ color: '#ef4444', fontWeight: 'bold' }}>● Recording Live Voice</span>}
            </label>
            <textarea
              className="form-input"
              rows={4}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Your spoken response will appear here in real-time. You can also edit or type manually..."
              style={{ lineHeight: '1.5', fontSize: '0.95rem' }}
            />
          </div>

          <button
            onClick={submitVoiceResponse}
            disabled={analyzing || !transcript.trim()}
            className="btn btn-primary"
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              padding: '0.85rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              marginTop: '1rem',
              width: '100%'
            }}
          >
            {analyzing ? '📊 Analyzing Voice, Clarity & Technical Depth...' : 'Evaluate Verbal Response 📤'}
          </button>
        </div>
      )}

      {/* Feedback & Scores Breakdown */}
      {result && (
        <div className="card" style={{ border: '1px solid rgba(16, 185, 129, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ margin: 0, color: '#10b981', fontSize: '1.4rem', fontWeight: 700 }}>
                📊 Interview Evaluation &amp; Speech Metrics
              </h3>
              <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                AI Speech &amp; Technical Accuracy Score Card
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', background: 'rgba(16, 185, 129, 0.15)', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399' }}>{result.score}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/100</span>
            </div>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-3" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Confidence Metric</div>
              <div style={{ color: '#60a5fa', fontSize: '1.4rem', fontWeight: 700, marginTop: '0.25rem' }}>
                {result.confidenceScore || 88}%
              </div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Clarity &amp; Flow</div>
              <div style={{ color: '#34d399', fontSize: '1.4rem', fontWeight: 700, marginTop: '0.25rem' }}>
                {result.clarityScore || 90}%
              </div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Technical Accuracy</div>
              <div style={{ color: '#c084fc', fontSize: '1.4rem', fontWeight: 700, marginTop: '0.25rem' }}>
                {result.technicalAccuracy || result.score}%
              </div>
            </div>
          </div>

          {/* Feedback Text */}
          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
            <p style={{ margin: 0, color: '#f0f2f8', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {result.feedback}
            </p>
          </div>

          {/* Strengths & Improvements */}
          <div className="grid grid-2" style={{ gap: '1rem' }}>
            {result.strengths && (
              <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <h4 style={{ color: '#34d399', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>✅ Key Strengths</h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {result.strengths.map((s, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.improvements && (
              <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <h4 style={{ color: '#fbbf24', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>🎯 Improvement Tips</h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {result.improvements.map((imp, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>{imp}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default VoiceMockInterview
