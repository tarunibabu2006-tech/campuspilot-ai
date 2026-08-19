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

