import express from 'express'

const router = express.Router()

const ROLE_KEYWORDS = {
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
  ]
}

const ACTION_VERBS = [
  'developed', 'built', 'engineered', 'architected', 'designed', 'implemented', 'deployed',
  'integrated', 'optimized', 'refactored', 'scaled', 'automated', 'configured', 'debugged',
  'created', 'led', 'managed', 'coordinated', 'spearheaded', 'facilitated', 'mentored',
  'organized', 'collaborated', 'directed', 'analyzed', 'evaluated', 'tested', 'benchmarked'
]

function calculateDeterministicATS(text = '', targetRole = '') {
  const cleanText = text.trim()
  const lower = cleanText.toLowerCase()
  const words = cleanText.split(/\s+/).filter(Boolean)
  const wordCount = words.length

  // Contact
  let contactScore = 0
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(cleanText)
  const hasPhone = /(\+91[\-\s]?)?[6-9]\d{9}|\b\d{10}\b|\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}/.test(cleanText)
  const hasLinkedIn = /linkedin\.com|linkedin/i.test(cleanText)
  const hasGitHub = /github\.com|github|portfolio|gitlab/i.test(cleanText)

  if (hasEmail) contactScore += 3
  if (hasPhone) contactScore += 3
  if (hasLinkedIn) contactScore += 2
  if (hasGitHub) contactScore += 2

  // Sections
  const hasSummary = /summary|objective|profile|about me/i.test(cleanText)
  const hasSkills = /skills|technical skills|technologies|core competencies/i.test(cleanText)
  const hasEducation = /education|academic background|qualifications|b\.tech|b\.e|b\.sc|mca|college/i.test(cleanText)
  const hasExperience = /experience|internship|internships|work experience/i.test(cleanText)
  const hasProjects = /projects|key projects|academic projects/i.test(cleanText)
  const hasCertifications = /certifications|certificates|courses|achievements|awards/i.test(cleanText)

  const summaryScore = hasSummary ? 10 : 0

  const allSkillsPool = [
    'python', 'java', 'c++', 'c', 'javascript', 'typescript', 'react', 'node', 'sql', 'mysql',
    'mongodb', 'postgresql', 'html', 'css', 'git', 'github', 'docker', 'aws', 'linux', 'dsa',
    'oops', 'rest api', 'spring', 'django', 'flask', 'tailwind', 'express', 'tableau', 'power bi'
  ]
  const detectedSkills = allSkillsPool.filter(s => lower.includes(s))
  const skillsScore = hasSkills ? Math.min(20, 10 + detectedSkills.length) : Math.min(10, detectedSkills.length * 2)

  const experienceScore = hasExperience ? 20 : (hasProjects ? 10 : 5)
  const educationScore = hasEducation ? (/cgpa|percentage|\d\.\d{1,2}/i.test(cleanText) ? 15 : 10) : 5
  const projectsScore = hasProjects ? (hasGitHub ? 15 : 10) : 0
  const certificationsScore = hasCertifications ? 10 : 0

  const metricMatches = cleanText.match(/\b\d+(\.\d+)?%|\b\d+k\b|\b\d+\s*(users|clients|requests|ms|lpa)|\b\d{2,}\b/gi) || []
  const metricsCount = metricMatches.length
  const foundActionVerbs = ACTION_VERBS.filter(v => lower.includes(v))

  const targetKeywords = ROLE_KEYWORDS[targetRole] || ROLE_KEYWORDS['Software Development Engineer (SDE)']
  const matchedKeywords = targetKeywords.filter(kw => lower.includes(kw.toLowerCase()))
  const keywordsMissing = targetKeywords.filter(kw => !matchedKeywords.includes(kw))

  let score = contactScore + summaryScore + skillsScore + experienceScore + educationScore + projectsScore + certificationsScore
  if (metricsCount >= 2) score += 3
  if (foundActionVerbs.length >= 3) score += 2
  if (wordCount < 150) score = Math.round(score * 0.75)
  score = Math.min(100, Math.max(10, Math.round(score)))

  let grade = score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B+' : score >= 55 ? 'B' : score >= 40 ? 'C' : 'D'

  let atsCompat = 40
  if (hasEmail && hasPhone) atsCompat += 15
  if (hasSkills && detectedSkills.length >= 4) atsCompat += 15
  if (hasEducation && hasProjects) atsCompat += 15
  if (metricsCount > 0) atsCompat += 10
  if (wordCount >= 200) atsCompat += 5
  atsCompat = Math.min(100, Math.max(20, atsCompat))

  const strengths = []
  if (hasEmail && hasPhone) strengths.push('Complete contact information with email and phone verified')
  if (hasLinkedIn || hasGitHub) strengths.push('Professional portfolio links (LinkedIn/GitHub) present for recruiters')
  if (detectedSkills.length >= 4) strengths.push(`Strong technical skills inventory (${detectedSkills.slice(0, 5).join(', ')})`)
  if (hasProjects) strengths.push('Dedicated projects section showcasing hands-on practical implementation')
  if (metricsCount >= 2) strengths.push('Quantified achievements with measurable impact metrics detected')
  if (strengths.length === 0) strengths.push('Basic resume structure present')

  const weaknesses = []
  if (!hasLinkedIn || !hasGitHub) weaknesses.push('Missing direct GitHub / LinkedIn profile URLs')
  if (!hasSummary) weaknesses.push('No professional summary or career objective statement')
  if (metricsCount < 2) weaknesses.push('Lack of quantified results (e.g., % improvement, scale of users, response time)')
  if (keywordsMissing.length >= 3) weaknesses.push(`Missing important target role keywords (${keywordsMissing.slice(0, 3).join(', ')})`)

  const suggestions = []
  if (!hasSummary) suggestions.push('Add a 3-sentence Professional Summary highlighting your degree and core tech stack.')
  if (metricsCount < 2) suggestions.push('Quantify project achievements (e.g., "Optimized database query latency by 35%").')
  if (!hasLinkedIn || !hasGitHub) suggestions.push('Add clickable links to your LinkedIn profile and GitHub repositories.')
  if (keywordsMissing.length > 0) suggestions.push(`Incorporate high-priority ATS keywords: ${keywordsMissing.slice(0, 4).join(', ')}.`)

  const quickWins = []
  if (!hasEmail || !hasPhone) quickWins.push('Add phone number and professional email at the top')
  if (!hasGitHub) quickWins.push('Add your GitHub profile URL')
  if (metricsCount === 0) quickWins.push('Add at least two numbers/percentages to your projects')
  if (keywordsMissing.length > 0) quickWins.push(`Add "${keywordsMissing[0]}" to your skills section`)
  if (quickWins.length === 0) quickWins.push('Fine-tune formatting for single-page clean layout')

  let overallFeedback = ''
  if (score >= 80) {
    overallFeedback = 'Outstanding ATS performance! Your resume contains strong section formatting, key technical keywords, and clear contact links suitable for top-tier campus drives.'
  } else if (score >= 60) {
    overallFeedback = 'Good resume foundation. To reach an A+ rating (85%+), quantify your project results with measurable metrics and integrate the recommended missing role keywords.'
  } else {
    overallFeedback = 'Your resume needs critical ATS improvements. Make sure to include distinct sections for Skills, Projects, Education, and Contact Links to ensure ATS parsers do not reject your application.'
  }

  return {
    score,
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
    metricsCount
  }
}

// POST /api/resume-score/analyze
router.post('/analyze', async (req, res) => {
  try {
    const { resumeText, targetRole } = req.body

    if (!resumeText || resumeText.trim().length < 30) {
      return res.status(400).json({ error: 'Please provide sufficient resume content (min 30 chars).' })
    }

    // Run deterministic real ATS calculation
    const deterministicResult = calculateDeterministicATS(resumeText, targetRole)

    // Attempt Gemini AI enrichment if API key exists
    if (process.env.GEMINI_API_KEY) {
      try {
        const { GoogleGenerativeAI } = await import('@google/generative-ai')
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

        const prompt = `You are an expert HR and ATS recruitment specialist.
Resume Content:
${resumeText}

Target Role: ${targetRole || 'Software Development Engineer'}

Calculated Baseline ATS Score: ${deterministicResult.score}/100

Analyze this resume and refine the feedback. Return ONLY a JSON object (no markdown, no backticks):
{
  "score": ${deterministicResult.score},
  "grade": "${deterministicResult.grade}",
  "sections": {
    "contact": ${deterministicResult.sections.contact},
    "summary": ${deterministicResult.sections.summary},
    "skills": ${deterministicResult.sections.skills},
    "experience": ${deterministicResult.sections.experience},
    "education": ${deterministicResult.sections.education},
    "projects": ${deterministicResult.sections.projects},
    "certifications": ${deterministicResult.sections.certifications}
  },
  "strengths": ${JSON.stringify(deterministicResult.strengths)},
  "weaknesses": ${JSON.stringify(deterministicResult.weaknesses)},
  "suggestions": ${JSON.stringify(deterministicResult.suggestions)},
  "keywordsMissing": ${JSON.stringify(deterministicResult.keywordsMissing)},
  "atsCompatibility": ${deterministicResult.atsCompatibility},
  "overallFeedback": "${deterministicResult.overallFeedback}",
  "quickWins": ${JSON.stringify(deterministicResult.quickWins)}
}`

        const result = await model.generateContent(prompt)
        const text = result.response.text()
        const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()
        const parsed = JSON.parse(cleaned)
        return res.json(parsed)
      } catch (aiErr) {
        console.warn('AI enrichment skipped, returning real ATS parsed metrics:', aiErr.message)
      }
    }

    // Return the real ATS result
    res.json(deterministicResult)
  } catch (error) {
    console.error('Resume scorer error:', error.message)
    res.status(500).json({ error: 'Failed to analyze resume' })
  }
})

export default router
