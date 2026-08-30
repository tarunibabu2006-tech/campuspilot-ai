import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

const LanguageContext = createContext(null)

const translations = {
  en: {
    exam: 'Exam Emergency', viva: 'Viva Prep', placement: 'Placements',
    notes: 'Notes Hub', bunk: 'Bunk Planner', job: 'Job Checker',
    skill: 'Skill Gap', chat: 'AI Chat', dashboard: 'Dashboard',
    skills: 'Skill Hub', rolePath: 'Role Path', resume: 'Resume Builder',
    jobs: 'Job Portal', interview: 'Mock Interview', aptitude: 'Aptitude Test',
    admin: 'Admin Panel',
    submit: 'Submit', generate: 'Generate', loading: 'Loading...',
    search: 'Search', filter: 'Filter', save: 'Save', cancel: 'Cancel',
    back: 'Back', next: 'Next', download: 'Download', apply: 'Apply',
    login: 'Login', register: 'Register', logout: 'Logout',
    email: 'Email', password: 'Password', name: 'Full Name',
    department: 'Department', year: 'Year', remember: 'Remember Me',
    welcome: 'Welcome back', hero: 'Your AI Study Companion',
    noResults: 'No results found', tryAgain: 'Try again',
    subject: 'Subject', examDate: 'Exam Date', difficulty: 'Difficulty',
    easy: 'Easy', medium: 'Medium', hard: 'Hard',
    score: 'Score', grade: 'Grade', correct: 'Correct', wrong: 'Wrong',
    totalStudents: 'Registered Students', totalSkills: 'Total Skills',
    totalJobs: 'Active Job Vacancies', quickActions: 'Quick Actions',
    adminSubtitle: 'Faculty/Administrator Console',
    studentSubtitle: 'Your personal AI-powered study and placement prep cockpit.',
    footer: 'Made with ❤️ for Indian Students • CampusPilot AI'
  },
  ta: {
    exam: 'தேர்வு அவசரம்', viva: 'வைவா தயாரிப்பு', placement: 'வேலை வாய்ப்பு',
    notes: 'குறிப்புகள்', bunk: 'புங்க் திட்டம்', job: 'வேலை சோதகர்',
    skill: 'திறன் இடைவெளி', chat: 'AI அரட்டை', dashboard: 'டாஷ்போர்டு',
    skills: 'திறன் மையம்', rolePath: 'பாத்திரம் பாதை', resume: 'ரெசுமே கட்டமைப்பான்',
    jobs: 'வேலை போர்டல்', interview: 'போலி நேர்காணல்', aptitude: 'திறன் தேர்வு',
    admin: 'நிர்வாக குழு',
    submit: 'சமர்ப்பி', generate: 'உருவாக்கு', loading: 'ஏற்றுகிறது...',
    search: 'தேடு', filter: 'வடிகட்டு', save: 'சேமி', cancel: 'ரத்து',
    back: 'பின்செல்', next: 'அடுத்து', download: 'பதிவிறக்கு', apply: 'விண்ணப்பி',
    login: 'உள்நுழை', register: 'பதிவு', logout: 'வெளியேறு',
    email: 'மின்னஞ்சல்', password: 'கடவுச்சொல்', name: 'முழு பெயர்',
    department: 'துறை', year: 'ஆண்டு', remember: 'என்னை நினைவில் கொள்',
    welcome: 'வணக்கம்', hero: 'உங்கள் AI படிப்பு துணை',
    noResults: 'முடிவுகள் இல்லை', tryAgain: 'மீண்டும் முயற்சிக்கவும்',
    subject: 'பாடம்', examDate: 'தேர்வு தேதி', difficulty: 'சிரமம்',
    easy: 'எளிது', medium: 'நடுத்தரம்', hard: 'கடினம்',
    score: 'மதிப்பெண்', grade: 'தரம்', correct: 'சரி', wrong: 'தவறு',
    totalStudents: 'பதிவு செய்த மாணவர்கள்', totalSkills: 'மொத்த திறன்கள்',
    totalJobs: 'செயலில் உள்ள வேலைகள்', quickActions: 'விரைவு செயல்கள்',
    adminSubtitle: 'பீடம்/நிர்வாக பணியகம்',
    studentSubtitle: 'உங்கள் தனிப்பட்ட AI-இயங்கும் படிப்பு மற்றும் வேலைவாய்ப்பு தயாரிப்பு களம்.',
    footer: 'இந்திய மாணவர்களுக்காக ❤️ உடன் உருவாக்கப்பட்டது • CampusPilot AI'
  },
  hi: {
    exam: 'परीक्षा आपातकालीन', viva: 'वाइवा तैयारी', placement: 'प्लेसमेंट',
    notes: 'नोट्स हब', bunk: 'बंक प्लानर', job: 'जॉब चेकर',
    skill: 'स्किल गैप', chat: 'AI चैट', dashboard: 'डैशबोर्ड',
    skills: 'स्किल हब', rolePath: 'रोल पाथ', resume: 'रिज्यूम बिल्डर',
    jobs: 'जॉब पोर्टल', interview: 'मॉक इंटरव्यू', aptitude: 'एप्टीट्यूड टेस्ट',
    admin: 'एडमिन पैनल',
    submit: 'जमा करें', generate: 'जनरेट करें', loading: 'लोड हो रहा...',
    search: 'खोजें', filter: 'फ़िल्टर', save: 'सेव करें', cancel: 'रद्द करें',
    back: 'वापस', next: 'अगला', download: 'डाउनलोड', apply: 'आवेदन करें',
    login: 'लॉगिन', register: 'रजिस्टर', logout: 'लॉगआउट',
    email: 'ईमेल', password: 'पासवर्ड', name: 'पूरा नाम',
    department: 'विभाग', year: 'वर्ष', remember: 'मुझे याद रखें',
    welcome: 'वापस स्वागत है', hero: 'आपका AI अध्ययन साथी',
    noResults: 'कोई परिणाम नहीं', tryAgain: 'पुन: प्रयास करें',
    subject: 'विषय', examDate: 'परीक्षा तिथि', difficulty: 'कठिनाई',
    easy: 'आसान', medium: 'मध्यम', hard: 'कठिन',
    score: 'अंक', grade: 'ग्रेड', correct: 'सही', wrong: 'गलत',
    totalStudents: 'पंजीकृत छात्र', totalSkills: 'कुल स्किल्स',
    totalJobs: 'सक्रिय नौकरियां', quickActions: 'त्वरित कार्य',
    adminSubtitle: 'फैकल्टी/एडमिन कंसोल',
    studentSubtitle: 'आपका व्यक्तिगत AI-संचालित अध्ययन और प्लेसमेंट तैयारी केंद्र।',
    footer: 'भारतीय छात्रों के लिए ❤️ से बनाया • CampusPilot AI'
  },
  zh: {
    exam: '考试应急', viva: '口试准备', placement: '校招准备',
    notes: '笔记中心', bunk: '缺勤规划', job: '招聘核查',
    skill: '技能差距', chat: 'AI聊天', dashboard: '仪表板',
    skills: '技能中心', rolePath: '职业路径', resume: '简历生成器',
    jobs: '招聘门户', interview: '模拟面试', aptitude: '能力测试',
    admin: '管理面板',
    submit: '提交', generate: '生成', loading: '加载中...',
    search: '搜索', filter: '筛选', save: '保存', cancel: '取消',
    back: '返回', next: '下一步', download: '下载', apply: '申请',
    login: '登录', register: '注册', logout: '退出登录',
    email: '邮箱', password: '密码', name: '姓名',
    department: '专业', year: '年级', remember: '记住我',
    welcome: '欢迎回来', hero: '您的AI学习伙伴',
    noResults: '未找到结果', tryAgain: '重试',
    subject: '科目', examDate: '考试日期', difficulty: '难度',
    easy: '简单', medium: '中等', hard: '困难',
    score: '分数', grade: '等级', correct: '正确', wrong: '错误',
    totalStudents: '注册学生数', totalSkills: '技能总数',
    totalJobs: '在招职位数', quickActions: '快捷操作',
    adminSubtitle: '教职工/管理员控制台',
    studentSubtitle: '您的个人AI学习与求职准备中心。',
    footer: '为印度学生倾心打造 ❤️ • CampusPilot AI'
  }
}

export const languageList = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
  { code: 'zh', label: '中文', flag: '🇨🇳' }
]

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('campuspilot_language')
    if (saved && translations[saved]) return saved
    const browserLang = navigator.language || navigator.userLanguage || ''
    if (browserLang.startsWith('ta')) return 'ta'
    if (browserLang.startsWith('hi')) return 'hi'
    if (browserLang.startsWith('zh')) return 'zh'
    return 'en'
  })

  useEffect(() => {
    localStorage.setItem('campuspilot_language', language)
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((lang) => {
    if (translations[lang]) setLanguageState(lang)
  }, [])

  const t = useCallback((key) => {
    return translations[language]?.[key] || translations.en[key] || key
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: languageList }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}

export default useLanguage
