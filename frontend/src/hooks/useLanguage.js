import { useState, useCallback, useEffect } from 'react'

const translations = {
  en: {
    // Nav
    exam: 'Exam Emergency', viva: 'Viva Prep', placement: 'Placements',
    notes: 'Notes Hub', bunk: 'Bunk Planner', job: 'Job Checker',
    skill: 'Skill Gap', chat: 'AI Chat', dashboard: 'Dashboard',
    skills: 'Skill Hub', rolePath: 'Role Path', resume: 'Resume Builder',
    jobs: 'Job Portal', interview: 'Mock Interview', aptitude: 'Aptitude Test',
    admin: 'Admin Panel',
    // Common
    submit: 'Submit', generate: 'Generate', loading: 'Loading...',
    search: 'Search', filter: 'Filter', save: 'Save', cancel: 'Cancel',
    back: 'Back', next: 'Next', download: 'Download', apply: 'Apply',
    login: 'Login', register: 'Register', logout: 'Logout',
    email: 'Email', password: 'Password', name: 'Full Name',
    department: 'Department', year: 'Year', remember: 'Remember Me',
    welcome: 'Welcome back', hero: 'Your AI Study Companion',
    noResults: 'No results found', tryAgain: 'Try again',
    // Features
    subject: 'Subject', examDate: 'Exam Date', difficulty: 'Difficulty',
    easy: 'Easy', medium: 'Medium', hard: 'Hard',
    score: 'Score', grade: 'Grade', correct: 'Correct', wrong: 'Wrong',
    // Dashboard
    totalStudents: 'Total Students', totalSkills: 'Total Skills',
    totalJobs: 'Total Jobs', quickActions: 'Quick Actions',
    // Footer
    footer: 'Made with ❤️ for Indian Students • CampusPilot AI'
  },
  ta: {
    // Nav
    exam: 'தேர்வு அவசரம்', viva: 'வைவா தயாரிப்பு', placement: 'வேலை வாய்ப்பு',
    notes: 'குறிப்புகள்', bunk: 'புங்க் திட்டம்', job: 'வேலை சோதகர்',
    skill: 'திறன் இடைவெளி', chat: 'AI அரட்டை', dashboard: 'டாஷ்போர்டு',
    skills: 'திறன் மையம்', rolePath: 'பாத்திரம் பாதை', resume: 'ரெசுமே கட்டமைப்பான்',
    jobs: 'வேலை போர்டல்', interview: 'போலி நேர்காணல்', aptitude: 'திறன் தேர்வு',
    admin: 'நிர்வாக குழு',
    // Common
    submit: 'சமர்ப்பி', generate: 'உருவாக்கு', loading: 'ஏற்றுகிறது...',
    search: 'தேடு', filter: 'வடிகட்டு', save: 'சேமி', cancel: 'ரத்து',
    back: 'பின்செல்', next: 'அடுத்து', download: 'பதிவிறக்கு', apply: 'விண்ணப்பி',
    login: 'உள்நுழை', register: 'பதிவு', logout: 'வெளியேறு',
    email: 'மின்னஞ்சல்', password: 'கடவுச்சொல்', name: 'முழு பெயர்',
    department: 'துறை', year: 'ஆண்டு', remember: 'என்னை நினைவில் கொள்',
    welcome: 'வணக்கம்', hero: 'உங்கள் AI படிப்பு துணை',
    noResults: 'முடிவுகள் இல்லை', tryAgain: 'மீண்டும் முயற்சிக்கவும்',
    // Features
    subject: 'பாடம்', examDate: 'தேர்வு தேதி', difficulty: 'சிரமம்',
    easy: 'எளிது', medium: 'நடுத்தரம்', hard: 'கடினம்',
    score: 'மதிப்பெண்', grade: 'தரம்', correct: 'சரி', wrong: 'தவறு',
    // Dashboard
    totalStudents: 'மொத்த மாணவர்கள்', totalSkills: 'மொத்த திறன்கள்',
    totalJobs: 'மொத்த வேலைகள்', quickActions: 'விரைவு செயல்கள்',
    // Footer
    footer: 'இந்திய மாணவர்களுக்காக ❤️ உடன் உருவாக்கப்பட்டது • CampusPilot AI'
  },
  hi: {
    // Nav
    exam: 'परीक्षा आपातकालीन', viva: 'वाइवा तैयारी', placement: 'प्लेसमेंट',
    notes: 'नोट्स हब', bunk: 'बंक प्लानर', job: 'जॉब चेकर',
    skill: 'स्किल गैप', chat: 'AI चैट', dashboard: 'डैशबोर्ड',
    skills: 'स्किल हब', rolePath: 'रोल पाथ', resume: 'रिज्यूम बिल्डर',
    jobs: 'जॉब पोर्टल', interview: 'मॉक इंटरव्यू', aptitude: 'एप्टीट्यूड टेस्ट',
    admin: 'एडमिन पैनल',
    // Common
    submit: 'जमा करें', generate: 'जनरेट करें', loading: 'लोड हो रहा...',
    search: 'खोजें', filter: 'फ़िल्टर', save: 'सेव करें', cancel: 'रद्द करें',
    back: 'वापस', next: 'अगला', download: 'डाउनलोड', apply: 'आवेदन करें',
    login: 'लॉगिन', register: 'रजिस्टर', logout: 'लॉगआउट',
    email: 'ईमेल', password: 'पासवर्ड', name: 'पूरा नाम',
    department: 'विभाग', year: 'वर्ष', remember: 'मुझे याद रखें',
    welcome: 'वापस स्वागत है', hero: 'आपका AI अध्ययन साथी',
    noResults: 'कोई परिणाम नहीं', tryAgain: 'पुन: प्रयास करें',
    // Features
    subject: 'विषय', examDate: 'परीक्षा तिथि', difficulty: 'कठिनाई',
    easy: 'आसान', medium: 'मध्यम', hard: 'कठिन',
    score: 'अंक', grade: 'ग्रेड', correct: 'सही', wrong: 'गलत',
    // Dashboard
    totalStudents: 'कुल छात्र', totalSkills: 'कुल स्किल्स',
    totalJobs: 'कुल जॉब्स', quickActions: 'त्वरित कार्य',
    // Footer
    footer: 'भारतीय छात्रों के लिए ❤️ से बनाया • CampusPilot AI'
  }
}

export const useLanguage = (initialLang) => {
  const [language, setLanguage] = useState(() => {
    // Priority: prop > localStorage > browser detection > default
    if (initialLang) return initialLang
    const saved = localStorage.getItem('campuspilot_language')
    if (saved) return saved
    // Auto-detect browser language
    const browserLang = navigator.language || navigator.userLanguage
    if (browserLang.startsWith('ta')) return 'ta'
    if (browserLang.startsWith('hi')) return 'hi'
    return 'en'
  })

  useEffect(() => {
    localStorage.setItem('campuspilot_language', language)
  }, [language])

  const t = useCallback((key) => {
    return translations[language]?.[key] || translations['en'][key] || key
  }, [language])

  const changeLanguage = useCallback((lang) => {
    setLanguage(lang)
    localStorage.setItem('campuspilot_language', lang)
  }, [])

  return { language, setLanguage: changeLanguage, t }
}

export default useLanguage
