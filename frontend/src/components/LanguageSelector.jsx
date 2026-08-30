import React from 'react'
import { useLanguage } from '../context/LanguageContext'

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi', label: 'हिंदी', flag: '🇮🇳' }
]

function LanguageSelector({ language: propLang, setLanguage: propSetLang }) {
  const context = useLanguage()
  const currentLang = propLang || context.language || 'en'
  const changeLang = propSetLang || context.setLanguage

  return (
    <div className="flex gap-1">
      {languages.map(lang => (
        <button
          key={lang.code}
          type="button"
          className={`nav-tab ${currentLang === lang.code ? 'active' : ''}`}
          style={{
            padding: '0.35rem 0.65rem',
            fontSize: '0.78rem',
            fontWeight: currentLang === lang.code ? '800' : '600',
            background: currentLang === lang.code ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.06)',
            border: currentLang === lang.code ? '1px solid rgba(139,92,246,0.5)' : '1px solid rgba(255,255,255,0.1)',
            color: currentLang === lang.code ? '#ffffff' : '#94a3b8',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: currentLang === lang.code ? '0 2px 8px rgba(124,58,237,0.35)' : 'none'
          }}
          onClick={() => changeLang(lang.code)}
        >
          {lang.flag} {lang.label}
        </button>
      ))}
    </div>
  )
}

export default LanguageSelector
