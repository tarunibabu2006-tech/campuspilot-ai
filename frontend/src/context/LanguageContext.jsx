import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import translations from '../utils/translations'

const LanguageContext = createContext(null)

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_language')
      if (saved && (saved === 'en' || saved === 'ta' || saved === 'hi')) return saved
      const browserLang = navigator.language || navigator.userLanguage || ''
      if (browserLang.startsWith('ta')) return 'ta'
      if (browserLang.startsWith('hi')) return 'hi'
    } catch { }
    return 'en'
  })

  const setLanguage = useCallback((lang) => {
    if (lang === 'en' || lang === 'ta' || lang === 'hi') {
      setLanguageState(lang)
      try {
        localStorage.setItem('campuspilot_language', lang)
      } catch { }
    }
  }, [])

  // Translation lookup with parameter replacement {name}, {count}, etc.
  const t = useCallback((key, params = {}) => {
    if (!key) return ''

    let text = translations[language]?.[key] || translations['en']?.[key]

    // If key not found directly, return key as fallback
    if (text === undefined) {
      // If caller provided a default string as second param instead of params object
      if (typeof params === 'string') return params
      return key
    }

    // Replace parameter placeholders e.g. {name}, {count}, {email}
    if (typeof params === 'object' && params !== null) {
      Object.keys(params).forEach(pKey => {
        text = text.replace(new RegExp(`\\{${pKey}\\}`, 'g'), params[pKey])
      })
    }

    return text
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: ['en', 'ta', 'hi'] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    // Graceful fallback if called outside provider
    const lang = localStorage.getItem('campuspilot_language') || 'en'
    return {
      language: lang,
      setLanguage: () => {},
      t: (key, params = {}) => {
        let text = translations[lang]?.[key] || translations['en']?.[key] || key
        if (typeof params === 'object' && params !== null) {
          Object.keys(params).forEach(pKey => {
            text = text.replace(new RegExp(`\\{${pKey}\\}`, 'g'), params[pKey])
          })
        }
        return text
      }
    }
  }
  return context
}

export default LanguageContext
