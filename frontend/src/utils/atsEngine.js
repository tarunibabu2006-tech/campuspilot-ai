/**
 * atsEngine.js
 * 100% Real, Deterministic ATS Resume Parser and Scoring Engine
 */

export const ROLE_KEYWORDS = {
  'Software Development Engineer (SDE)': [
    'Data Structures', 'Algorithms', 'Java', 'Python', 'C++', 'OOP', 'SQL', 'DBMS',
    'Git', 'REST API', 'System Design', 'Web Development', 'Testing', 'Docker', 'Linux'
  ],
  'Full Stack Developer': [
    'React', 'Node.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'MongoDB', 'PostgreSQL',
    'Express', 'REST API', 'Git', 'Redux', 'Tailwind', 'Next.js', 'Authentication'
  ],
  'Frontend Developer': [
    'React', 'JavaScript', 'HTML5', 'CSS3', 'TypeScript', 'Redux', 'UI/UX', 'Responsive Design',
    'Tailwind', 'Git', 'Webpack', 'Vite', 'Figma', 'API Integration'
  ],
  'Backend Developer': [
    'Node.js', 'Python', 'Java', 'SQL', 'PostgreSQL', 'MongoDB', 'Microservices', 'REST API',
    'Redis', 'Kafka', 'Docker', 'AWS', 'Authentication', 'System Architecture'
  ],
  'Data Scientist / AI Engineer': [
    'Python', 'Machine Learning', 'Deep Learning', 'Pandas', 'NumPy', 'Scikit-Learn', 'TensorFlow',
    'PyTorch', 'SQL', 'Data Visualization', 'NLP', 'Statistics', 'EDA', 'Matplotlib'
  ],
  'Data Analyst / Business Analyst': [
    'SQL', 'Excel', 'Power BI', 'Tableau', 'Python', 'Data Cleaning', 'Statistics',
    'Dashboard', 'Reporting', 'Data Modeling', 'Business Intelligence', 'Analytics'
  ],
  'Cloud & DevOps Engineer': [
    'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'Linux', 'Terraform', 'Git',
    'CloudFormation', 'Monitoring', 'Bash', 'Networking', 'Security'
  ],
  'Cybersecurity Analyst': [
    'Network Security', 'Ethical Hacking', 'SIEM', 'SOC', 'Firewalls', 'Vulnerability Assessment',
    'Penetration Testing', 'Cryptography', 'Linux', 'Wireshark', 'Incident Response'
  ],
  'Core Mechanical / Civil / Electrical Engineer': [
    'AutoCAD', 'MATLAB', 'SolidWorks', 'PLC', 'SCADA', 'Thermodynamics', 'Circuit Design',
    'Quality Control', 'Manufacturing', 'Simulation', 'Project Management'
  ]
}

const ACTION_VERBS = [
  'developed', 'built', 'engineered', 'architected', 'designed', 'implemented', 'deployed',
  'integrated', 'optimized', 'refactored', 'scaled', 'automated', 'configured', 'debugged',
  'created', 'led', 'managed', 'coordinated', 'spearheaded', 'facilitated', 'mentored',
  'organized', 'collaborated', 'directed', 'analyzed', 'evaluated', 'tested', 'benchmarked',
  'monitored', 'researched', 'solved', 'achieved', 'improved', 'increased', 'reduced', 'saved'
]

/**
 * Analyze a resume text deterministically and calculate real ATS score and breakdown.
 */
export function analyzeResumeATS(text = '', targetRole = '') {
  const cleanText = text.trim()
  if (!cleanText || cleanText.length < 30) {
    return {
      score: 0,
      grade: 'D',
      sections: { contact: 0, summary: 0, skills: 0, experience: 0, education: 0, projects: 0, certifications: 0 },
      strengths: [],
      weaknesses: ['Resume content is too short for ATS evaluation.'],
      suggestions: ['Please provide your complete resume text including education, skills, and projects.'],
      keywordsMissing: [],
      matchedKeywords: [],
      atsCompatibility: 0,
      overallFeedback: 'No valid resume text detected. Please paste your full resume.',
      quickWins: ['Paste complete resume text to see your score.']
    }
  }

  const lower = cleanText.toLowerCase()
  const words = cleanText.split(/\s+/).filter(Boolean)
  const wordCount = words.length

  // 1. CONTACT INFO ANALYSIS (Max: 10 pts)
  let contactScore = 0
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(cleanText)
  const hasPhone = /(\+91[\-\s]?)?[6-9]\d{9}|\b\d{10}\b|\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}/.test(cleanText)
  const hasLinkedIn = /linkedin\.com|linkedin/i.test(cleanText)
  const hasGitHub = /github\.com|github|portfolio|gitlab/i.test(cleanText)

  if (hasEmail) contactScore += 3
  if (hasPhone) contactScore += 3
  if (hasLinkedIn) contactScore += 2
  if (hasGitHub) contactScore += 2

  // 2. SECTION HEADERS DETECTION
  const hasSummary = /summary|objective|profile|about me|professional summary/i.test(cleanText)
  const hasSkills = /skills|technical skills|technologies|core competencies|proficiencies|tools/i.test(cleanText)
  const hasEducation = /education|academic background|qualifications|b\.tech|b\.e|b\.sc|mca|college|university|cgpa|gpa|degree/i.test(cleanText)
  const hasExperience = /experience|internship|internships|work experience|employment|work history/i.test(cleanText)
  const hasProjects = /projects|key projects|academic projects|technical projects|portfolio/i.test(cleanText)
  const hasCertifications = /certifications|certificates|courses|achievements|awards|hackathons|publications/i.test(cleanText)

  // 3. SECTION SCORES
  // Summary (Max: 10)
  let summaryScore = 0
  if (hasSummary) {
    summaryScore = 7
    // Check if summary has good length (20-60 words)
    if (lower.includes('seeking') || lower.includes('passionate') || lower.includes('developer') || lower.includes('engineer') || lower.includes('student')) {
      summaryScore = 10
    }
  }

  // Skills (Max: 20)
  let skillsScore = 0
  let detectedSkillsList = []
  if (hasSkills) {
    skillsScore = 10
    // Check common tech skills
    const allSkillsPool = [
      'python', 'java', 'c++', 'c', 'javascript', 'typescript', 'react', 'node', 'sql', 'mysql',
      'mongodb', 'postgresql', 'html', 'css', 'git', 'github', 'docker', 'aws', 'linux', 'dsa',
      'oops', 'rest api', 'spring', 'django', 'flask', 'tailwind', 'express', 'tableau', 'power bi',
      'machine learning', 'excel', 'pandas', 'numpy', 'figma', 'postman'
    ]
    detectedSkillsList = allSkillsPool.filter(s => lower.includes(s))
    const skillCountBonus = Math.min(10, detectedSkillsList.length)
    skillsScore += skillCountBonus
  }

  // Experience (Max: 20)
  let experienceScore = 0
  if (hasExperience) {
    experienceScore = 14
    if (lower.includes('intern') || lower.includes('developer') || lower.includes('trainee') || lower.includes('team') || lower.includes('contributed')) {
      experienceScore = 20
    }
  } else {
    // For freshers, if strong projects exist, give partial credit
    if (hasProjects) experienceScore = 10
  }

  // Education (Max: 15)
  let educationScore = 0
  if (hasEducation) {
    educationScore = 10
    if (/cgpa|percentage|gpa|\d\.\d{1,2}|202\d/i.test(cleanText)) {
      educationScore = 15
    }
  }

  // Projects (Max: 15)
  let projectsScore = 0
  if (hasProjects) {
    projectsScore = 10
    if (hasGitHub || lower.includes('github') || lower.includes('developed') || lower.includes('built') || lower.includes('tech stack')) {
      projectsScore = 15
    }
  }

  // Certifications (Max: 10)
  let certificationsScore = 0
  if (hasCertifications) {
    certificationsScore = 10
  }

  // 4. QUANTIFIABLE METRICS & ACTION VERBS
  const metricMatches = cleanText.match(/\b\d+(\.\d+)?%|\b\d+k\b|\b\d+\s*(users|clients|requests|ms|seconds|stars|downloads|lpa|lakhs)|\b\d{2,}\b/gi) || []
  const metricsCount = metricMatches.length
  const foundActionVerbs = ACTION_VERBS.filter(v => lower.includes(v))

  // 5. TARGET ROLE KEYWORD MATCHING
  const targetKeywords = ROLE_KEYWORDS[targetRole] || ROLE_KEYWORDS['Software Development Engineer (SDE)']
  const matchedKeywords = targetKeywords.filter(kw => lower.includes(kw.toLowerCase()))
  const keywordsMissing = targetKeywords.filter(kw => !matchedKeywords.includes(kw))

  // 6. TOTAL ATS SCORE CALCULATION
  const rawScore = contactScore + summaryScore + skillsScore + experienceScore + educationScore + projectsScore + certificationsScore
  // Normalize score with word count and metrics multiplier
  let normalizedScore = Math.min(100, Math.round(rawScore))

  // Adjustments based on metrics & action verbs
  if (metricsCount >= 3) normalizedScore = Math.min(100, normalizedScore + 3)
  if (foundActionVerbs.length >= 4) normalizedScore = Math.min(100, normalizedScore + 2)
  if (wordCount < 150) normalizedScore = Math.max(25, Math.round(normalizedScore * 0.75))

  // Grade Mapping
  let grade = 'B'
  if (normalizedScore >= 90) grade = 'A+'
  else if (normalizedScore >= 80) grade = 'A'
  else if (normalizedScore >= 70) grade = 'B+'
  else if (normalizedScore >= 55) grade = 'B'
  else if (normalizedScore >= 40) grade = 'C'
  else grade = 'D'

  // ATS Compatibility Score
  let atsCompat = 40
  if (hasEmail && hasPhone) atsCompat += 15
  if (hasSkills && detectedSkillsList.length >= 4) atsCompat += 15
  if (hasEducation && hasProjects) atsCompat += 15
  if (metricsCount > 0) atsCompat += 10
  if (wordCount >= 200 && wordCount <= 900) atsCompat += 5
  atsCompat = Math.min(100, Math.max(20, atsCompat))

  // 7. STRENGTHS GENERATION
  const strengths = []
  if (hasEmail && hasPhone) strengths.push('Complete contact information with email and phone verified')
  if (hasLinkedIn || hasGitHub) strengths.push('Professional portfolio links (LinkedIn/GitHub) present for recruiters')
  if (detectedSkillsList.length >= 5) strengths.push(`Strong technical skills inventory (${detectedSkillsList.slice(0, 5).join(', ')})`)
  if (hasProjects) strengths.push('Dedicated projects section showcasing hands-on practical implementation')
  if (metricsCount >= 2) strengths.push('Quantified achievements with measurable impact metrics detected')
  if (foundActionVerbs.length >= 3) strengths.push('Action-oriented bullet points using industry-standard verbs')
  if (strengths.length === 0) strengths.push('Basic resume framework established')

  // 8. WEAKNESSES GENERATION
  const weaknesses = []
  if (!hasLinkedIn || !hasGitHub) weaknesses.push('Missing direct GitHub / LinkedIn profile URLs')
  if (!hasSummary) weaknesses.push('No professional summary or career objective statement')
  if (metricsCount < 2) weaknesses.push('Lack of quantified results (e.g., % improvement, scale of users, response time)')
  if (!hasExperience) weaknesses.push('No internship or work experience section highlighted')
  if (keywordsMissing.length >= 4) weaknesses.push(`Missing important target role keywords (${keywordsMissing.slice(0, 3).join(', ')})`)
  if (wordCount < 250) weaknesses.push('Resume length is too brief; freshers should aim for 350–600 words')

  // 9. ACTIONABLE SUGGESTIONS
  const suggestions = []
  if (!hasSummary) suggestions.push('Add a 3-sentence Professional Summary highlighting your degree, core tech stack, and placement goal.')
  if (metricsCount < 3) suggestions.push('Quantify at least 3 project achievements: e.g. "Reduced page load time by 35%" or "Processed 10,000+ records in SQL".')
  if (!hasLinkedIn || !hasGitHub) suggestions.push('Add clickable links to your LinkedIn profile and GitHub repositories in the contact header.')
  if (keywordsMissing.length > 0) suggestions.push(`Incorporate high-priority ATS keywords: ${keywordsMissing.slice(0, 4).join(', ')}.`)
  if (foundActionVerbs.length < 4) suggestions.push('Begin every project bullet point with strong action verbs: "Architected", "Engineered", "Implemented", "Optimized".')

  // 10. QUICK WINS
  const quickWins = []
  if (!hasEmail || !hasPhone) quickWins.push('Add phone number and professional email at the top')
  if (!hasGitHub) quickWins.push('Add your GitHub profile URL')
  if (metricsCount === 0) quickWins.push('Add at least two numbers/percentages to your projects')
  if (keywordsMissing.length > 0) quickWins.push(`Add "${keywordsMissing[0]}" to your skills section`)
  if (quickWins.length === 0) quickWins.push('Fine-tune formatting for single-page clean layout')

  let overallFeedback = ''
  if (normalizedScore >= 80) {
    overallFeedback = `Outstanding ATS performance! Your resume contains strong section formatting, key technical keywords, and clear contact links suitable for top-tier campus drives.`
  } else if (normalizedScore >= 60) {
    overallFeedback = `Good resume foundation. To reach an A+ rating (85%+), quantify your project results with measurable metrics and integrate the recommended missing role keywords.`
  } else {
    overallFeedback = `Your resume needs critical ATS improvements. Make sure to include distinct sections for Skills, Projects, Education, and Contact Links to ensure ATS parsers do not reject your application.`
  }

  return {
    score: normalizedScore,
    grade,
    sections: {
      contact: contactScore,
      summary: summaryScore,
      skills: skillsScore,
      experience: experienceScore,
      education: educationScore,
      projects: projectsScore,
      certifications: certificationsScore
    },
    strengths,
    weaknesses,
    suggestions,
    keywordsMissing,
    matchedKeywords,
    atsCompatibility: atsCompat,
    overallFeedback,
    quickWins,
    wordCount,
    metricsCount,
    detectedSkillsCount: detectedSkillsList.length
  }
}
