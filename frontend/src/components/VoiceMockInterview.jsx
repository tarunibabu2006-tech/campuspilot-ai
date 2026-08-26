import React, { useState, useRef } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'
import Autocomplete from './Common/Autocomplete'
import { masterRoles } from '../data/masterData'

import { CAREER_ROLE_PRESETS } from '../data/seedRoles'

const SAMPLE_ROLES = CAREER_ROLE_PRESETS.map(r => r.title)

export default function VoiceMockInterview() {
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

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(response.data.question)
        utterance.rate = 0.95
        window.speechSynthesis.speak(utterance)
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to generate interview question.')
    } finally {
      setLoading(false)
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) recognitionRef.current.stop()
      setIsRecording(false)
      toast.success('Audio recording stopped.')
    } else {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SpeechRecognition) {
        toast.error('Speech recognition not supported in this browser. Please type your answer below!')
        return
      }

      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = voiceLang

      recognition.onstart = () => {
        setIsRecording(true)
        toast.success('Listening... Speak your answer clearly 🎙️')
      }

      recognition.onresult = (event) => {
        let currentTranscript = ''
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + ' '
        }
        setTranscript(currentTranscript)
      }

      recognition.onerror = (err) => {
        console.error('Speech error:', err)
        toast.error('Voice input error. You can type your answer manually.')
        setIsRecording(false)
      }

      recognition.onend = () => {
        setIsRecording(false)
      }

      recognitionRef.current = recognition
      recognition.start()
    }
  }

  const submitAnswer = async () => {
    if (!transcript.trim()) {
      toast.error('Please record or type your answer before submitting!')
      return
    }

    setAnalyzing(true)
    try {
      const response = await api.post('/voice-interview/evaluate', {
        role: role.trim(),
        question: questionData.question,
        userAnswer: transcript.trim()
      })
      setResult(response.data)
      toast.success('AI Evaluation Complete! 🎉')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to evaluate answer.')
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div style={{ padding: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81, #1e293b)', borderRadius: '1.5rem', padding: '2rem', marginBottom: '1.5rem', border: '1px solid rgba(139,92,246,0.3)' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          🎙️ Voice AI Mock Interview
        </h1>
        <p style={{ color: '#c4b5fd' }}>
          Practice real speech-to-text interviews with AI-evaluated feedback for all Indian student job roles.
        </p>
      </div>

      {/* Configuration Card */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1rem' }}>⚙️ Setup Your Interview</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Target Job Role</label>
            <Autocomplete
              value={role}
              onChange={setRole}
              options={masterRoles}
              placeholder="Search target role (e.g. Data Analyst, TCS Engineer)..."
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Difficulty Level</label>
            <select
              value={difficulty} onChange={e => setDifficulty(e.target.value)}
              style={{ width: '100%', background: 'rgba(30,27,75,0.9)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
            >
              <option value="easy">🟢 Easy (Fresher / Foundational)</option>
              <option value="medium">🟡 Medium (Standard Placement Round)</option>
              <option value="hard">🔴 Hard (Advanced Technical / Product)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Voice Recognition Accent</label>
            <select
              value={voiceLang} onChange={e => setVoiceLang(e.target.value)}
              style={{ width: '100%', background: 'rgba(30,27,75,0.9)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
            >
              <option value="en-IN">🇮🇳 English (India)</option>
              <option value="en-US">🇺🇸 English (US)</option>
              <option value="en-GB">🇬🇧 English (UK)</option>
            </select>
          </div>
        </div>

        {/* Preset Roles Quick Select */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '600' }}>Popular Roles Presets:</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {SAMPLE_ROLES.slice(0, 10).map(r => (
              <button
                key={r} type="button" onClick={() => setRole(r)}
                style={{
                  padding: '0.2rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.75rem', cursor: 'pointer',
                  background: role === r ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.05)',
                  color: role === r ? '#c4b5fd' : '#94a3b8',
                  border: `1px solid ${role === r ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.1)'}`
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={startInterview} disabled={loading}
          style={{ width: '100%', padding: '0.85rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', fontWeight: '700', fontSize: '1rem', border: 'none', cursor: 'pointer' }}
        >
          {loading ? '⏳ Generating Question...' : '🚀 Start Voice Interview'}
        </button>
      </div>

      {/* Question & Audio Recording Area */}
      {questionData && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#fbbf24', fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.4rem' }}>❓ Question for {questionData.role}:</div>
          <h3 style={{ color: 'white', fontWeight: '700', fontSize: '1.2rem', marginBottom: '1.25rem', lineHeight: 1.4 }}>{questionData.question}</h3>

          {/* Voice Record / Transcript Controls */}
          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.25rem', textAlign: 'center' }}>
            <button
              onClick={toggleRecording}
              style={{
                width: '70px', height: '70px', borderRadius: '50%', border: 'none', cursor: 'pointer', fontSize: '2rem',
                background: isRecording ? '#ef4444' : 'linear-gradient(135deg, #7c3aed, #2563eb)',
                color: 'white', boxShadow: isRecording ? '0 0 30px rgba(239,68,68,0.6)' : '0 0 20px rgba(124,58,237,0.4)',
                transition: 'all 0.3s', margin: '0 auto 0.75rem'
              }}
            >
              {isRecording ? '⏹️' : '🎙️'}
            </button>
            <div style={{ color: isRecording ? '#ef4444' : '#94a3b8', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              {isRecording ? '🔴 Listening... Speak now!' : 'Click Microphone to Start Speaking'}
            </div>

            <textarea
              rows={4}
              value={transcript}
              onChange={e => setTranscript(e.target.value)}
              placeholder="Your transcript will appear here automatically while speaking, or type your answer manually..."
              style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <button
            onClick={submitAnswer} disabled={analyzing}
            style={{ width: '100%', padding: '0.85rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', fontWeight: '800', fontSize: '1rem', border: 'none', cursor: 'pointer' }}
          >
            {analyzing ? '🤖 Evaluating your response...' : '✨ Submit Answer for AI Evaluation'}
          </button>
        </div>
      )}

      {/* AI Evaluation Results */}
      {result && (
        <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e1b4b)', border: '1px solid rgba(52,211,153,0.4)', borderRadius: '1.25rem', padding: '1.5rem' }}>
          <h3 style={{ color: '#34d399', fontWeight: '800', fontSize: '1.2rem', marginBottom: '1rem' }}>🎉 AI Evaluation & Feedback</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '0.75rem', textAlign: 'center' }}>
              <div style={{ color: '#fbbf24', fontWeight: '900', fontSize: '1.3rem' }}>{result.score}/100</div>
              <div style={{ color: '#64748b', fontSize: '0.72rem' }}>Overall Score</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '0.75rem', textAlign: 'center' }}>
              <div style={{ color: '#60a5fa', fontWeight: '900', fontSize: '1.3rem' }}>{result.clarity}/10</div>
              <div style={{ color: '#64748b', fontSize: '0.72rem' }}>Clarity</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '0.75rem', textAlign: 'center' }}>
              <div style={{ color: '#c084fc', fontWeight: '900', fontSize: '1.3rem' }}>{result.technicalAccuracy}/10</div>
              <div style={{ color: '#64748b', fontSize: '0.72rem' }}>Tech Accuracy</div>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ color: '#34d399', fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.3rem' }}>💡 Detailed Feedback:</div>
            <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>{result.feedback}</p>
          </div>

          {result.modelAnswer && (
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.75rem' }}>
              <div style={{ color: '#fbbf24', fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.3rem' }}>🌟 Model Answer:</div>
              <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>{result.modelAnswer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
