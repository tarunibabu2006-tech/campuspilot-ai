import React from 'react'
import { useLanguage } from '../context/LanguageContext'

function LanguageSelector() {
  const { language, setLanguage, languages } = useLanguage()

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
