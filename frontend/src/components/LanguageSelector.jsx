import React from 'react'

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi', label: 'हिंदी', flag: '🇮🇳' }
]

function LanguageSelector({ language, setLanguage }) {
  const currentLang = languages.find(l => l.code === language) || languages[0]

  return (
    <div className="flex gap-1">
      {languages.map(lang => (
        <button
          key={lang.code}
          type="button"
          className={`nav-tab ${language === lang.code ? 'active' : ''}`}
          style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem' }}
          onClick={() => setLanguage(lang.code)}
        >
          {lang.flag} {lang.label}
        </button>
      ))}
    </div>
  )
}

export default LanguageSelector
