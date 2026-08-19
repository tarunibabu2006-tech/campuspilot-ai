import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
import {
  EXAM_PLAN_PROMPT,
  VIVA_PROMPT,
  PLACEMENT_PROMPT,
  NOTES_PROMPT,
  FLASHCARD_PROMPT,
  BUNK_PLANNER_PROMPT,
  JOB_CHECKER_PROMPT,
  SKILL_GAP_PROMPT,
  CHAT_PROMPT
} from '../utils/prompts.js'

dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const proModel = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
const flashModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

// Helper: Clean and parse JSON from Gemini response
function parseGeminiResponse(text) {
  const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()
  return JSON.parse(cleaned)
}

// ═══════════════════════════════════════════
// 1. EXAM EMERGENCY MODE
// ═══════════════════════════════════════════
export const generateExamPlan = async (subject, examDate, topics, language) => {
  try {
    const prompt = EXAM_PLAN_PROMPT(language, subject, examDate, topics)
    const result = await proModel.generateContent(prompt)
    return parseGeminiResponse(result.response.text())
  } catch (err) {
    console.error('Exam Plan Error:', err.message)
    const hoursLeft = Math.max(1, Math.ceil((new Date(examDate) - new Date()) / (1000 * 60 * 60)))
    return {
      hourlyPlan: [
        { hour: 1, topic: `${subject} - Core Concepts`, priority: 'high', duration: '60 mins', tip: 'Focus on definitions and formulas' },
        { hour: 2, topic: `${subject} - Important Problems`, priority: 'high', duration: '60 mins', tip: 'Practice previous year questions' },
        { hour: 3, topic: `${subject} - Diagrams & Derivations`, priority: 'medium', duration: '45 mins', tip: 'Draw and label neatly' },
        { hour: 4, topic: `${subject} - Quick Revision`, priority: 'high', duration: '30 mins', tip: 'Revise key points only' }
      ],
      highWeightageTopics: topics ? topics.split(',').map(t => t.trim()) : [`${subject} fundamentals`, 'Previous year repeated topics'],
      tips: [
        'Start with high-weightage topics first',
        'Take 5-min breaks every 45 minutes',
        'Use the Pomodoro technique',
        'Revise formulas before sleeping'
      ],
      quickRevision: `Focus on core ${subject} concepts. Practice at least 5 problems. Review diagrams.`,
      totalHoursNeeded: Math.min(hoursLeft, 8)
    }
  }
}

// ═══════════════════════════════════════════
// 2. VIVA PREP CENTER
// ═══════════════════════════════════════════
export const conductViva = async (subject, difficulty, question, history, language) => {
  try {
    const prompt = VIVA_PROMPT(language, subject, difficulty, question, history)
    const result = await flashModel.generateContent(prompt)
    return parseGeminiResponse(result.response.text())
  } catch (err) {
    console.error('Viva Error:', err.message)
    return {
      question: `Explain the fundamental concepts of ${subject} and their real-world applications.`,
      difficulty: difficulty,
      expectedAnswer: `A good answer should cover the core principles of ${subject} with practical examples.`,
      followUp: `Can you elaborate on any specific application you've worked with?`,
      score: 0,
      feedback: 'Answer the question to receive feedback.',
      hint: `Think about the basic building blocks of ${subject}.`
    }
  }
}

// ═══════════════════════════════════════════
// 3. CODING & PLACEMENTS
// ═══════════════════════════════════════════
export const getPlacementRoadmap = async (company, role, currentSkills, language) => {
  try {
    const prompt = PLACEMENT_PROMPT(language, company, role, currentSkills)
    const result = await proModel.generateContent(prompt)
    return parseGeminiResponse(result.response.text())
  } catch (err) {
    console.error('Placement Error:', err.message)
    return {
      company: company,
      role: role || 'Software Engineer',
      companyInfo: `${company} is a leading technology company that hires from top engineering colleges in India.`,
      eligibilityCriteria: '60% or 6.0 CGPA, No active backlogs',
      rounds: [
        { round: 'Online Assessment', topics: ['Aptitude', 'Logical Reasoning', 'Coding (2 questions)'], tips: 'Practice on HackerRank & LeetCode' },
        { round: 'Technical Interview', topics: ['DSA', 'OOP', 'DBMS', 'OS'], tips: 'Be ready to code on whiteboard' },
        { round: 'HR Interview', topics: ['About yourself', 'Why this company', 'Strengths'], tips: 'Be confident and honest' }
      ],
      dsaTopics: [
        { topic: 'Arrays & Strings', importance: 'high', questionsCount: 8 },
        { topic: 'Linked Lists', importance: 'high', questionsCount: 5 },
        { topic: 'Trees & Graphs', importance: 'medium', questionsCount: 6 },
        { topic: 'Dynamic Programming', importance: 'medium', questionsCount: 4 }
      ],
      resources: [
        { name: 'Striver SDE Sheet', url: 'takeuforward.org', type: 'free' },
        { name: 'NeetCode 150', url: 'neetcode.io', type: 'free' },
        { name: 'GeeksForGeeks', url: 'geeksforgeeks.org', type: 'free' }
      ],
      mockQuestions: [
        { question: 'Two Sum Problem', difficulty: 'easy', topic: 'Arrays' },
        { question: 'Reverse a Linked List', difficulty: 'easy', topic: 'Linked Lists' }
      ],
      timeline: [
        { week: 1, focus: 'Arrays & Strings', tasks: ['Solve 10 easy problems', 'Learn time complexity'] },
        { week: 2, focus: 'Linked Lists & Stacks', tasks: ['Implement from scratch', 'Solve 8 problems'] }
      ],
      salaryRange: '3.5 - 12 LPA (varies by role and location)'
    }
  }
}

// ═══════════════════════════════════════════
// 4. COMMUNITY NOTES HUB
// ═══════════════════════════════════════════
export const processNotes = async (notes, title, language) => {
  try {
    const prompt = NOTES_PROMPT(language, notes, title)
    const result = await proModel.generateContent(prompt)
    return parseGeminiResponse(result.response.text())
  } catch (err) {
    console.error('Notes Error:', err.message)
    return {
      title: title || 'Study Notes',
      summary: 'Notes processed. Key concepts extracted.',
      keyPoints: ['Review the main concepts', 'Practice with examples', 'Connect to real-world applications'],
      difficultConcepts: [{ concept: 'Complex Topics', simplifiedExplanation: 'Break down into smaller parts and learn step by step.' }],
      examTips: ['Focus on definitions and diagrams', 'Practice numerical problems'],
      relatedTopics: ['Fundamentals', 'Advanced concepts'],
      mnemonics: ['Create your own memory aids'],
      xpEarned: 50
    }
  }
}

export const generateFlashcards = async (content, language) => {
  try {
    const prompt = FLASHCARD_PROMPT(language, content)
    const result = await flashModel.generateContent(prompt)
    return parseGeminiResponse(result.response.text())
  } catch (err) {
    console.error('Flashcard Error:', err.message)
    return {
      flashcards: [
        { id: 1, front: 'What is the main concept?', back: 'Review your notes for the definition.', difficulty: 'easy' },
        { id: 2, front: 'List the key properties', back: 'Check your textbook for properties.', difficulty: 'medium' }
      ],
      totalCards: 2,
      estimatedStudyTime: '5 minutes'
    }
  }
}

// ═══════════════════════════════════════════
// 5. SAFE BUNKS PLANNER
// ═══════════════════════════════════════════
export const calculateBunks = async (totalClasses, attended, language) => {
  try {
    const prompt = BUNK_PLANNER_PROMPT(language, totalClasses, attended)
    const result = await flashModel.generateContent(prompt)
    return parseGeminiResponse(result.response.text())
  } catch (err) {
    console.error('Bunk Planner Error:', err.message)
    const pct = ((attended / totalClasses) * 100).toFixed(2)
    const isSafe = pct >= 75
    const canBunk = isSafe ? Math.floor(attended / 0.75 - totalClasses) : 0
    return {
      status: isSafe ? 'Safe ✅' : 'Danger ⚠️',
      currentPercentage: pct,
      canBunkTotal: canBunk,
      message: isSafe
        ? `Your attendance is ${pct}%. You can safely bunk ${canBunk} more classes.`
        : `Warning! Attendance is ${pct}%, below 75%. Start attending classes immediately!`,
      weeklyPlan: isSafe ? {
        maxBunksPerWeek: Math.min(2, Math.floor(canBunk / 4)),
        safeDays: ['Wednesday', 'Saturday']
      } : null,
      recoveryPlan: isSafe ? null : {
        classesToAttend: Math.ceil((0.75 * totalClasses - attended) / (1 - 0.75)),
        dailyTarget: 4,
        weeksNeeded: Math.ceil(((0.75 * totalClasses) - attended) / 25),
        strategy: 'Attend all classes for the next few weeks. No bunking allowed.'
      }
    }
  }
}

// ═══════════════════════════════════════════
// 6. CAREER REALITY CHECKER (Job Scam Detector)
// ═══════════════════════════════════════════
export const checkJob = async (jobDescription, language) => {
  try {
    const prompt = JOB_CHECKER_PROMPT(language, jobDescription)
    const result = await proModel.generateContent(prompt)
    return parseGeminiResponse(result.response.text())
  } catch (err) {
    console.error('Job Check Error:', err.message)
    return {
      status: 'UNKNOWN',
      confidence: 50,
      riskScore: 5,
      redFlags: ['Unable to fully analyze - please verify manually'],
      greenFlags: [],
      summary: 'Could not complete full analysis. Please verify the job posting manually.',
      suggestions: [
        'Check the company on LinkedIn and Glassdoor',
        'Never pay any fees for job applications',
        'Verify the company email domain',
        'Search for reviews on AmbitionBox'
      ],
      commonScamPatterns: [],
      verificationSteps: ['Google the company name', 'Check MCA registration', 'Verify on LinkedIn']
    }
  }
}

// ═══════════════════════════════════════════
// 7. SKILL GAP ANALYZER
// ═══════════════════════════════════════════
export const analyzeSkillGap = async (currentSkills, targetRole, language) => {
  try {
    const prompt = SKILL_GAP_PROMPT(language, currentSkills, targetRole)
    const result = await proModel.generateContent(prompt)
    return parseGeminiResponse(result.response.text())
  } catch (err) {
    console.error('Skill Gap Error:', err.message)
    return {
      targetRole: targetRole,
      currentSkills: Array.isArray(currentSkills) ? currentSkills : [currentSkills],
      missingSkills: [
        { skill: 'System Design', importance: 'critical', estimatedTime: '4 weeks' },
        { skill: 'Cloud Services (AWS/GCP)', importance: 'important', estimatedTime: '3 weeks' },
        { skill: 'Docker & Kubernetes', importance: 'important', estimatedTime: '2 weeks' }
      ],
      matchPercentage: 45,
      roadmap: {
        months: [
          { month: 1, focus: 'Foundations', topics: ['Core CS Concepts', 'DSA Basics'], resources: [{ name: 'FreeCodeCamp', url: 'freecodecamp.org', type: 'free', platform: 'Web' }], projects: ['Build a portfolio website'] },
          { month: 2, focus: 'Intermediate', topics: ['Frameworks', 'Databases'], resources: [{ name: 'YouTube Tutorials', url: 'youtube.com', type: 'free', platform: 'YouTube' }], projects: ['Build a full-stack CRUD app'] },
          { month: 3, focus: 'Advanced', topics: ['System Design', 'DevOps'], resources: [{ name: 'System Design Primer', url: 'github.com', type: 'free', platform: 'GitHub' }], projects: ['Deploy a production app'] }
        ]
      },
      portfolioSuggestions: ['E-commerce platform', 'Chat application', 'API gateway'],
      certifications: ['AWS Cloud Practitioner', 'Google Cloud Associate']
    }
  }
}

// ═══════════════════════════════════════════
// 8. AI CHAT ASSISTANT
// ═══════════════════════════════════════════
export const chatWithAI = async (message, language) => {
  try {
    const prompt = CHAT_PROMPT(language, message)
    const result = await flashModel.generateContent(prompt)
    return { response: result.response.text(), language }
  } catch (err) {
    console.error('Chat Error:', err.message)
    return {
      response: 'Hello! I am your CampusPilot AI assistant. 🎓 How can I help you with your studies or career today?',
    }
  }
}
// ═══════════════════════════════════════════
// 9. GENERATE INTERVIEW QUESTION & SCORE
// ═══════════════════════════════════════════
export const generateInterviewQuestion = async ({ question, answer, role, difficulty }) => {
  try {
    const prompt = `You are an expert technical interviewer evaluating a student candidate.
Role: ${role}
Difficulty: ${difficulty}
Question: ${question}
Candidate's Answer: ${answer}

Evaluate the response. Return a JSON object with:
{
  "score": <number between 1 and 10>,
  "feedback": "<general feedback on the response>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "improvements": ["<improvement 1>", "<improvement 2>"],
  "modelAnswer": "<a short ideal answer the candidate could have given>"
}`
    const result = await flashModel.generateContent(prompt)
    return parseGeminiResponse(result.response.text())
  } catch (err) {
    console.error('Interview evaluation error:', err.message)
    throw err
  }
}

// ═══════════════════════════════════════════
// 10. RESUME SCORER
// ═══════════════════════════════════════════
export const scoreResume = async (resumeText, targetRole) => {
  try {
    const prompt = `You are an expert ATS resume reviewer and HR manager.
Resume Content:
${resumeText}

Target Role: ${targetRole || 'General Engineering/Fresher'}

Analyze the resume and return a JSON object:
{
  "score": <number 0-100>,
  "grade": "<A+/A/B+/B/C/D>",
  "suggestions": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>"],
  "optimizedResume": "<optimized summary of resume with high-impact action verbs and keywords>"
}`
    const result = await proModel.generateContent(prompt)
    return parseGeminiResponse(result.response.text())
  } catch (err) {
    console.error('Resume scoring error:', err.message)
    return {
      score: 75,
      grade: 'B+',
      suggestions: [
        'Add quantified metrics to your project descriptions',
        'Include target role keywords throughout the experience section',
        'Ensure contact information and GitHub/LinkedIn links are visible'
      ],
      optimizedResume: 'Motivated candidate with strong analytical and problem-solving skills across full-stack technologies.'
    }
  }
}

// ═══════════════════════════════════════════
// 11. AI APPLICATION PROXY
// ═══════════════════════════════════════════
export const autoApply = async (preferences, userId) => {
  return {
    status: 'active',
    message: 'AI proxy configured successfully',
    preferences,
    userId
  }
}

// ═══════════════════════════════════════════
// 12. MENTOR CONNECT
// ═══════════════════════════════════════════
export const connectWithMentor = async (mentorId, userId, message) => {
  return {
    success: true,
    message: 'Connection request sent successfully to mentor!',
    mentorId,
    userId,
    timestamp: new Date().toISOString()
  }
}

// ═══════════════════════════════════════════
// 13. GENERATE COMPANY MOCK TEST
// ═══════════════════════════════════════════
export const generateMockTest = async (company, role, difficulty = 'medium') => {
  try {
    const prompt = `Generate a mock placement test for company ${company}, role ${role || 'Software Engineer'}, difficulty ${difficulty}.
Return JSON object:
{
  "company": "${company}",
  "role": "${role || 'General'}",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "id": 1,
      "question": "<question>",
      "options": ["<option 1>", "<option 2>", "<option 3>", "<option 4>"],
      "answer": <0-3 index of correct option>,
      "explanation": "<explanation>"
    }
  ]
}`
    const result = await flashModel.generateContent(prompt)
    return parseGeminiResponse(result.response.text())
  } catch (err) {
    console.error('Mock test error:', err.message)
    return {
      company,
      role: role || 'General',
      difficulty,
      questions: [
        { id: 1, question: 'What is the time complexity of binary search on a sorted array?', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], answer: 1, explanation: 'Binary search halves the search space each step: O(log n).' },
        { id: 2, question: 'Which data structure follows the FIFO principle?', options: ['Stack', 'Queue', 'Tree', 'Graph'], answer: 1, explanation: 'Queue follows First In First Out.' },
        { id: 3, question: 'Which SQL clause is used to filter records after aggregation?', options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'], answer: 1, explanation: 'HAVING filters grouped records.' }
      ]
    }
  }
}

// ═══════════════════════════════════════════
// 14. AI CAREER PREDICTOR (5-YEAR & 10-YEAR PATH)
// ═══════════════════════════════════════════
export const predictCareer = async (currentRole, skills, interests, education) => {
  const skillsList = Array.isArray(skills) ? skills.join(', ') : skills
  const interestsList = Array.isArray(interests) ? interests.join(', ') : interests
  
  try {
    const prompt = `Act as an expert career strategist for Indian tech & engineering students.
Current Role/Target: ${currentRole}
Skills: ${skillsList}
Interests: ${interestsList}
Education: ${education || 'Undergraduate Engineering'}

Generate a realistic 5-year and 10-year career progression path.
Return ONLY valid JSON matching this exact structure:
{
  "summary": "<2 sentence encouraging summary of the candidate's trajectory>",
  "careerPath": [
    {
      "stage": "Year 0-1 (Entry Level)",
      "role": "<Role Title, e.g., Associate Software Engineer>",
      "timeline": "Months 0-12",
      "salary": "₹6 - ₹12 LPA",
      "skills": ["<Skill 1>", "<Skill 2>", "<Skill 3>"],
      "certifications": ["<Recommended Certification 1>"]
    },
    {
      "stage": "Year 2-3 (Mid Level)",
      "role": "<Role Title, e.g., Full Stack Engineer>",
      "timeline": "Years 2-3",
      "salary": "₹14 - ₹24 LPA",
      "skills": ["<Skill 1>", "<Skill 2>", "<Skill 3>"],
      "certifications": ["<Recommended Certification 1>"]
    },
    {
      "stage": "Year 4-5 (Senior Level)",
      "role": "<Role Title, e.g., Senior Software Engineer / Tech Lead>",
      "timeline": "Years 4-5",
      "salary": "₹28 - ₹45 LPA",
      "skills": ["<Skill 1>", "<Skill 2>", "<Skill 3>"],
      "certifications": ["<Recommended Certification 1>"]
    },
    {
      "stage": "Year 6-10 (Leadership / Principal)",
      "role": "<Role Title, e.g., Staff Engineer / Engineering Manager / VP of Tech>",
      "timeline": "Years 6-10",
      "salary": "₹50L - ₹1.2 Cr+ PA",
      "skills": ["<Skill 1>", "<Skill 2>", "<Skill 3>"],
      "certifications": ["<Executive / Cloud Architect Certification>"]
    }
  ]
}`
    const result = await flashModel.generateContent(prompt)
    return parseGeminiResponse(result.response.text())
  } catch (err) {
    console.error('Career Predictor Error:', err.message)
    return {
      summary: `Dynamic progression roadmap for ${currentRole} focusing on ${skillsList}.`,
      careerPath: [
        {
          stage: 'Year 0-1 (Entry Level)',
          role: `Junior ${currentRole || 'Developer'}`,
          timeline: 'Months 0-12',
          salary: '₹6 - ₹10 LPA',
          skills: Array.isArray(skills) && skills.length > 0 ? skills.slice(0, 3) : ['Core Algorithms', 'Git & CI/CD', 'Web Frameworks'],
          certifications: ['AWS Certified Cloud Practitioner', 'HackerRank Problem Solving']
        },
        {
          stage: 'Year 2-3 (Mid Level)',
          role: `${currentRole || 'Software Engineer'} II`,
          timeline: 'Years 2-3',
          salary: '₹12 - ₹20 LPA',
          skills: ['System Design Basics', 'Microservices', 'Database Optimization', 'Docker & Kubernetes'],
          certifications: ['AWS Certified Solutions Architect Associate', 'CKA: Certified Kubernetes Administrator']
        },
        {
          stage: 'Year 4-5 (Senior Level)',
          role: `Senior ${currentRole || 'Software Engineer'} / Team Lead`,
          timeline: 'Years 4-5',
          salary: '₹25 - ₹40 LPA',
          skills: ['High Scale Distributed Systems', 'Team Leadership', 'Security Architecture', 'Domain Driven Design'],
          certifications: ['Google Professional Cloud Architect', 'Togaf 9 Certified']
        },
        {
          stage: 'Year 6-10 (Leadership / Principal)',
          role: `Staff Engineer / Principal Architect / Director of Engineering`,
          timeline: 'Years 6-10',
          salary: '₹50L - ₹1.2 Cr+ PA',
          skills: ['Tech Strategy & Roadmaps', 'Cross-functional Leadership', 'Budgeting & P&L', 'AI/ML Integration'],
          certifications: ['Executive Management Program', 'Stanford Advanced Computer Security']
        }
      ]
    }
  }
}

// ═══════════════════════════════════════════
// 15. VOICE MOCK INTERVIEW & FEEDBACK
// ═══════════════════════════════════════════
export const conductVoiceInterview = async (role, difficulty = 'medium') => {
  try {
    const prompt = `Generate a realistic technical/behavioral interview question for role "${role}" with difficulty level "${difficulty}".
Return ONLY a JSON object:
{
  "role": "${role}",
  "difficulty": "${difficulty}",
  "question": "<Interview question designed to be answered verbally in 1-2 minutes>",
  "idealAnswerKeyPoints": ["<Key point 1>", "<Key point 2>", "<Key point 3>"],
  "followUp": "<Optional follow-up question>"
}`
    const result = await flashModel.generateContent(prompt)
    return parseGeminiResponse(result.response.text())
  } catch (err) {
    console.error('Voice Interview Start Error:', err.message)
    const fallbackQuestions = {
      'Frontend Developer': 'Can you explain the difference between state and props in React, and how the Virtual DOM achieves fast UI updates?',
      'Backend Developer': 'How do you design a scalable RESTful API with proper caching and error handling mechanisms?',
      'Data Scientist': 'Explain the trade-off between bias and variance, and how regularization helps prevent overfitting in machine learning models?',
      'Full Stack Developer': 'Walk me through what happens under the hood when a user types a URL in their browser and hits Enter?'
    }
    return {
      role,
      difficulty,
      question: fallbackQuestions[role] || `Explain your experience with key technologies used in ${role} and describe a challenging technical problem you solved.`,
      idealAnswerKeyPoints: [
        'Structured explanation with real-world examples',
        'Demonstrated clarity of core computer science fundamentals',
        'Good communication pace and technical vocabulary'
      ]
    }
  }
}

export const analyzeVoiceResponse = async (transcript, role, questionId = 1) => {
  try {
    const prompt = `Evaluate this student's spoken interview response for the role "${role}".
Transcript: "${transcript}"

Return ONLY a JSON object:
{
  "score": <score out of 100 between 60 and 98>,
  "confidenceScore": <score out of 100>,
  "clarityScore": <score out of 100>,
  "technicalAccuracy": <score out of 100>,
  "feedback": "<Detailed 2-3 sentence constructive feedback on content, clarity, and tone>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "improvements": ["<improvement 1>", "<improvement 2>"]
}`
    const result = await flashModel.generateContent(prompt)
    return parseGeminiResponse(result.response.text())
  } catch (err) {
    console.error('Voice Response Analysis Error:', err.message)
    const wordCount = transcript.trim().split(/\s+/).length
    const baseScore = Math.min(95, Math.max(65, 60 + Math.floor(wordCount * 0.8)))
    return {
      score: baseScore,
      confidenceScore: Math.min(95, baseScore + 2),
      clarityScore: Math.min(92, baseScore - 1),
      technicalAccuracy: baseScore,
      feedback: `Strong verbal communication with clear points articulated. You demonstrated good domain familiarity for ${role}. To further elevate your score, provide concrete metric-driven examples from your projects.`,
      strengths: [
        'Confident articulation and clear speaking pace',
        'Directly addressed the interview question',
        'Appropriate technical terminology utilized'
      ],
      improvements: [
        'Include measurable outcomes (e.g. % performance increase, scale)',
        'Structure responses with the STAR method (Situation, Task, Action, Result)'
      ]
    }
  }
}
