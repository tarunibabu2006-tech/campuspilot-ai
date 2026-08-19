import express from 'express'
import { protect } from '../middleware/auth.js'
import { generateInterviewQuestion } from '../controllers/geminiController.js'
import { aptitudeQuestions } from '../data/aptitudeQuestions.js'

const router = express.Router()

// Interview questions bank by role
const interviewQuestions = {
  'Frontend Developer': [
    { q: 'What is the virtual DOM in React?', difficulty: 'easy', category: 'technical' },
    { q: 'Explain the difference between var, let, and const.', difficulty: 'easy', category: 'technical' },
    { q: 'What is CSS Flexbox and how does it differ from Grid?', difficulty: 'easy', category: 'technical' },
    { q: 'What are React hooks? Name 5 commonly used hooks.', difficulty: 'medium', category: 'technical' },
    { q: 'Explain the concept of closure in JavaScript.', difficulty: 'medium', category: 'technical' },
    { q: 'What is the event loop in JavaScript?', difficulty: 'medium', category: 'technical' },
    { q: 'How does React reconciliation work?', difficulty: 'hard', category: 'technical' },
    { q: 'Explain code splitting and lazy loading in React.', difficulty: 'hard', category: 'technical' },
    { q: 'What are Web Components and Shadow DOM?', difficulty: 'hard', category: 'technical' },
    { q: 'Describe your approach to responsive web design.', difficulty: 'easy', category: 'behavioral' }
  ],
  'Backend Developer': [
    { q: 'What is REST API? Explain its principles.', difficulty: 'easy', category: 'technical' },
    { q: 'Explain the difference between SQL and NoSQL databases.', difficulty: 'easy', category: 'technical' },
    { q: 'What is middleware in Express.js?', difficulty: 'easy', category: 'technical' },
    { q: 'How does JWT authentication work?', difficulty: 'medium', category: 'technical' },
    { q: 'What are database indexes and when would you use them?', difficulty: 'medium', category: 'technical' },
    { q: 'Explain the concept of database normalization.', difficulty: 'medium', category: 'technical' },
    { q: 'How would you handle rate limiting in an API?', difficulty: 'hard', category: 'technical' },
    { q: 'Explain microservices architecture vs monolithic.', difficulty: 'hard', category: 'technical' },
    { q: 'What is connection pooling and why is it important?', difficulty: 'hard', category: 'technical' },
    { q: 'Tell me about a challenging bug you debugged.', difficulty: 'medium', category: 'behavioral' }
  ],
  'Data Scientist': [
    { q: 'What is the difference between supervised and unsupervised learning?', difficulty: 'easy', category: 'technical' },
    { q: 'Explain bias-variance tradeoff.', difficulty: 'medium', category: 'technical' },
    { q: 'What is overfitting and how do you prevent it?', difficulty: 'medium', category: 'technical' },
    { q: 'Explain the difference between precision and recall.', difficulty: 'medium', category: 'technical' },
    { q: 'What is cross-validation?', difficulty: 'easy', category: 'technical' },
    { q: 'Explain PCA and dimensionality reduction.', difficulty: 'hard', category: 'technical' },
    { q: 'What are ensemble methods?', difficulty: 'hard', category: 'technical' },
    { q: 'How do you handle imbalanced datasets?', difficulty: 'medium', category: 'technical' },
    { q: 'What is gradient descent?', difficulty: 'medium', category: 'technical' },
    { q: 'Describe a data science project you are proud of.', difficulty: 'easy', category: 'behavioral' }
  ],
  'Full Stack Developer': [
    { q: 'Explain the MVC architecture pattern.', difficulty: 'easy', category: 'technical' },
    { q: 'What is CORS and how do you handle it?', difficulty: 'medium', category: 'technical' },
    { q: 'How would you optimize a slow database query?', difficulty: 'medium', category: 'technical' },
    { q: 'What is WebSocket and when would you use it?', difficulty: 'medium', category: 'technical' },
    { q: 'Explain the concept of server-side rendering.', difficulty: 'hard', category: 'technical' },
    { q: 'How do you ensure application security?', difficulty: 'hard', category: 'technical' },
    { q: 'What deployment strategies do you use?', difficulty: 'medium', category: 'technical' },
    { q: 'Explain how caching works at different levels.', difficulty: 'hard', category: 'technical' },
    { q: 'Describe your workflow from design to deployment.', difficulty: 'easy', category: 'behavioral' },
    { q: 'How do you handle tech debt?', difficulty: 'medium', category: 'behavioral' }
  ],
  'HR': [
    { q: 'Tell me about yourself.', difficulty: 'easy', category: 'hr' },
    { q: 'Why do you want to work for our company?', difficulty: 'easy', category: 'hr' },
    { q: 'Where do you see yourself in 5 years?', difficulty: 'easy', category: 'hr' },
    { q: 'What are your strengths and weaknesses?', difficulty: 'easy', category: 'hr' },
    { q: 'Describe a conflict with a teammate and how you resolved it.', difficulty: 'medium', category: 'hr' },
    { q: 'Why should we hire you over other candidates?', difficulty: 'medium', category: 'hr' },
    { q: 'Tell me about a time you failed and what you learned.', difficulty: 'medium', category: 'hr' },
    { q: 'What motivates you at work?', difficulty: 'easy', category: 'hr' },
    { q: 'How do you handle pressure and tight deadlines?', difficulty: 'medium', category: 'hr' },
    { q: 'What salary expectations do you have?', difficulty: 'hard', category: 'hr' }
  ]
}

// Get interview questions by role
router.get('/questions/:role', (req, res) => {
  const role = decodeURIComponent(req.params.role)
  const difficulty = req.query.difficulty || 'all'

  let questions = interviewQuestions[role] || interviewQuestions['HR']

  if (difficulty !== 'all') {
    questions = questions.filter(q => q.difficulty === difficulty)
  }

  res.json({ role, questions, total: questions.length })
})

// Get all available roles for interview
router.get('/roles', (req, res) => {
  res.json({ roles: Object.keys(interviewQuestions) })
})

// Submit answer for AI evaluation
router.post('/evaluate', protect, async (req, res) => {
  try {
    const { question, answer, role, difficulty } = req.body

    if (!question || !answer) {
      return res.status(400).json({ message: 'Question and answer are required' })
    }

    // Try AI evaluation, fallback to rule-based
    try {
      if (typeof generateInterviewQuestion === 'function') {
        const aiResult = await generateInterviewQuestion({ question, answer, role, difficulty })
        return res.json(aiResult)
      }
    } catch (e) {
      // Fallback below
    }

    // Rule-based evaluation
    const wordCount = answer.split(' ').length
    let score = 5
    let feedback = 'Good attempt!'

    if (wordCount > 50) { score = 8; feedback = 'Excellent! Detailed and well-structured answer.' }
    else if (wordCount > 30) { score = 7; feedback = 'Good answer with reasonable detail.' }
    else if (wordCount > 15) { score = 6; feedback = 'Decent answer. Try to add more examples.' }
    else { score = 4; feedback = 'Too brief. Elaborate with examples and concepts.' }

    if (difficulty === 'hard' && wordCount < 30) { score = Math.max(3, score - 1) }

    res.json({
      score,
      maxScore: 10,
      feedback,
      strengths: wordCount > 30 ? ['Detailed response', 'Shows understanding'] : ['Attempted the question'],
      improvements: wordCount < 30 ? ['Add more detail', 'Use examples', 'Structure your answer'] : ['Could add real-world examples'],
      modelAnswer: `A comprehensive answer would cover the key concepts, provide examples, and demonstrate practical understanding of ${question.substring(0, 50)}...`
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get aptitude questions
router.get('/aptitude', (req, res) => {
  const { category, limit } = req.query

  if (category && aptitudeQuestions[category]) {
    const questions = aptitudeQuestions[category]
    const limitedQuestions = limit ? questions.slice(0, parseInt(limit)) : questions
    return res.json({ category, questions: limitedQuestions, total: questions.length })
  }

  // Return all categories
  const allQuestions = {}
  const totals = {}
  Object.keys(aptitudeQuestions).forEach(cat => {
    allQuestions[cat] = limit ? aptitudeQuestions[cat].slice(0, parseInt(limit)) : aptitudeQuestions[cat]
    totals[cat] = aptitudeQuestions[cat].length
  })

  res.json({ questions: allQuestions, totals, totalQuestions: Object.values(totals).reduce((a, b) => a + b, 0) })
})

// Submit aptitude test
router.post('/aptitude/submit', protect, (req, res) => {
  const { answers, category, timeTaken } = req.body

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ message: 'Answers array required' })
  }

  let correct = 0
  let wrong = 0
  const results = []
  const questions = category ? (aptitudeQuestions[category] || []) : Object.values(aptitudeQuestions).flat()

  answers.forEach(({ questionId, selectedOption }) => {
    const question = questions.find(q => q.id === questionId)
    if (question) {
      const isCorrect = question.answer === selectedOption
      if (isCorrect) correct++
      else wrong++
      results.push({
        questionId,
        isCorrect,
        correctAnswer: question.answer,
        selectedAnswer: selectedOption,
        explanation: question.explanation
      })
    }
  })

  const total = answers.length
  const score = Math.round((correct / total) * 100)
  let grade = 'F'
  if (score >= 90) grade = 'A+'
  else if (score >= 80) grade = 'A'
  else if (score >= 70) grade = 'B'
  else if (score >= 60) grade = 'C'
  else if (score >= 50) grade = 'D'

  res.json({
    score,
    grade,
    correct,
    wrong,
    total,
    timeTaken,
    results,
    message: score >= 70 ? '🎉 Great job! Keep practicing!' : '📚 Keep studying. Practice makes perfect!'
  })
})

export default router
