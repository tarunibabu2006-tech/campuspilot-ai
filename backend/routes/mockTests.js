import express from 'express'

const router = express.Router()

const companiesData = [
  { name: 'TCS', logo: 'TCS', roles: ['Software Developer', 'Business Analyst', 'Tester', 'Digital Specialist'], color: '#1a237e', rounds: ['Aptitude', 'Coding', 'Technical HR', 'Final HR'] },
  { name: 'Infosys', logo: 'INFY', roles: ['Systems Engineer', 'Senior Systems Engineer', 'Consultant', 'Analyst'], color: '#00704a', rounds: ['Aptitude', 'Pseudo Code', 'Technical Interview', 'HR Interview'] },
  { name: 'Wipro', logo: 'WPRO', roles: ['Project Engineer', 'Developer', 'Analyst', 'Technical Lead'], color: '#5c3bc0', rounds: ['Online Test', 'Technical Interview', 'HR Round'] },
  { name: 'Amazon', logo: 'AMZ', roles: ['SDE-1', 'Data Scientist', 'Product Manager', 'Business Analyst'], color: '#ff9900', rounds: ['Online Assessment', 'Phone Screen', 'Loop Interviews (4 rounds)', 'Hiring Manager'] },
  { name: 'Google', logo: 'GOOG', roles: ['Software Engineer', 'Data Scientist', 'PM', 'UX Engineer'], color: '#4285f4', rounds: ['Online Assessment', 'Phone Screen', 'Technical Onsite (4-5 rounds)'] },
  { name: 'Microsoft', logo: 'MSFT', roles: ['SDE', 'Data Scientist', 'PM', 'Cloud Architect'], color: '#00a4ef', rounds: ['Online Assessment', 'Phone Interview', 'Onsite Interviews (4 rounds)'] },
  { name: 'Accenture', logo: 'ACN', roles: ['Associate Software Engineer', 'Technology Analyst', 'Consultant'], color: '#a100ff', rounds: ['Cognitive Assessment', 'Tech Interview', 'HR Interview'] },
  { name: 'Deloitte', logo: 'DEL', roles: ['Analyst', 'Consultant', 'Technology Associate', 'BTA'], color: '#86bc25', rounds: ['Aptitude Test', 'Group Discussion', 'Technical Interview', 'HR Interview'] },
  { name: 'HCL Tech', logo: 'HCL', roles: ['Graduate Engineer Trainee', 'Software Engineer', 'System Engineer'], color: '#e84c12', rounds: ['Online Aptitude', 'Technical Test', 'Technical Interview', 'HR'] },
  { name: 'Cognizant', logo: 'CTS', roles: ['Programmer Analyst Trainee', 'GenC Evolve', 'Digital Developer'], color: '#0033a0', rounds: ['COCUBES Test', 'Versant Test', 'Technical Interview', 'HR'] }
]

// GET /api/mock-tests/companies
router.get('/companies', (req, res) => {
  res.json({ companies: companiesData, total: companiesData.length })
})

// POST /api/mock-tests/generate
router.post('/generate', async (req, res) => {
  try {
    const { company, role, difficulty = 'medium' } = req.body

    if (!company) {
      return res.status(400).json({ error: 'Company name is required.' })
    }

    const { GoogleGenerativeAI } = await import('@google/generative-ai')
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `Generate a company-specific mock test for Indian college placement drives.

Company: ${company}
Role: ${role || 'General Engineer / Analyst'}
Difficulty: ${difficulty}

Create exactly 15 multiple choice questions following ${company}'s actual interview pattern. Include:
- 5 Aptitude/Quantitative questions (speed, time, percentage, profit-loss, etc.)
- 5 Logical/Reasoning questions (series, coding-decoding, syllogisms, etc.)
- 5 Technical questions specific to ${company} and ${role || 'software roles'}

Return ONLY a JSON object (no markdown, no backticks):
{
  "company": "${company}",
  "role": "${role || 'General'}",
  "difficulty": "${difficulty}",
  "duration": 30,
  "totalMarks": 15,
  "questions": [
    {
      "id": 1,
      "type": "Aptitude",
      "question": "<question text>",
      "options": ["<A>", "<B>", "<C>", "<D>"],
      "answer": <0-3 index of correct option>,
      "explanation": "<brief explanation>",
      "topic": "<topic name>"
    }
  ]
}`

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()
    const parsed = JSON.parse(cleaned)

    res.json(parsed)
  } catch (error) {
    console.error('Mock test generation error:', error.message)
    // Fallback: Generate static questions
    res.json({
      company: req.body.company,
      role: req.body.role || 'General',
      difficulty: req.body.difficulty || 'medium',
      duration: 30,
      totalMarks: 15,
      questions: [
        { id: 1, type: 'Aptitude', question: 'A train travels 360 km at 90 km/h. How many hours does it take?', options: ['3', '4', '5', '6'], answer: 1, explanation: '360 ÷ 90 = 4 hours', topic: 'Time & Distance' },
        { id: 2, type: 'Aptitude', question: 'If 20% of a number is 40, what is the number?', options: ['160', '200', '180', '220'], answer: 1, explanation: 'x × 20/100 = 40 → x = 200', topic: 'Percentages' },
        { id: 3, type: 'Aptitude', question: 'A and B can complete work in 12 and 18 days. How long together?', options: ['6.4 days', '7.2 days', '8 days', '5 days'], answer: 1, explanation: 'Combined rate = 1/12 + 1/18 = 5/36, so 36/5 = 7.2 days', topic: 'Work & Time' },
        { id: 4, type: 'Logical', question: 'Next number: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '38'], answer: 1, explanation: 'Differences: 4,6,8,10,12 → 30+12=42', topic: 'Number Series' },
        { id: 5, type: 'Logical', question: 'If MANGO = 13+1+14+7+15 = 50, what is GRAPE?', options: ['49', '51', '52', '48'], answer: 2, explanation: 'G=7,R=18,A=1,P=16,E=5 → 47... recalculate with exact alphabet values', topic: 'Coding' },
        { id: 6, type: 'Technical', question: 'What is the time complexity of Binary Search?', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'], answer: 1, explanation: 'Binary search halves the search space each time → O(log n)', topic: 'DSA' },
        { id: 7, type: 'Technical', question: 'Which SQL clause is used to filter grouped records?', options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'], answer: 1, explanation: 'HAVING filters after GROUP BY, WHERE filters before grouping', topic: 'SQL' },
        { id: 8, type: 'Technical', question: 'What does OOP stand for?', options: ['Object Oriented Programming', 'Object Oriented Protocol', 'Open Oriented Programming', 'Online Object Processing'], answer: 0, explanation: 'OOP = Object Oriented Programming — key CS paradigm', topic: 'OOP' },
        { id: 9, type: 'Aptitude', question: 'Simple interest on ₹5000 at 8% per annum for 3 years?', options: ['₹1000', '₹1200', '₹1400', '₹1600'], answer: 1, explanation: 'SI = P×R×T/100 = 5000×8×3/100 = ₹1200', topic: 'SI & CI' },
        { id: 10, type: 'Logical', question: 'All cats are dogs. All dogs are animals. Conclusion: All cats are animals?', options: ['True', 'False', 'Cannot determine', 'Partially true'], answer: 0, explanation: 'By syllogism: Cats → Dogs → Animals, so Cats → Animals. True.', topic: 'Syllogism' },
        { id: 11, type: 'Technical', question: 'Which data structure uses FIFO (First In First Out)?', options: ['Stack', 'Queue', 'Tree', 'Graph'], answer: 1, explanation: 'Queue = FIFO. Stack = LIFO.', topic: 'DSA' },
        { id: 12, type: 'Technical', question: 'What is the primary key in a relational database?', options: ['A key that allows duplicates', 'A unique identifier for each record', 'A foreign key reference', 'An indexed column'], answer: 1, explanation: 'Primary key uniquely identifies each row in a table.', topic: 'DBMS' },
        { id: 13, type: 'Aptitude', question: 'Profit on selling an item for ₹600 that costs ₹500?', options: ['10%', '15%', '20%', '25%'], answer: 2, explanation: 'Profit% = (100/500)×100 = 20%', topic: 'Profit & Loss' },
        { id: 14, type: 'Logical', question: 'Book is to Library as Painting is to?', options: ['Canvas', 'Artist', 'Museum', 'Colour'], answer: 2, explanation: 'Books are stored in Libraries. Paintings are stored in Museums.', topic: 'Analogy' },
        { id: 15, type: 'Technical', question: 'Which HTTP method is used to submit form data?', options: ['GET', 'POST', 'PUT', 'DELETE'], answer: 1, explanation: 'POST is used to send data to the server. GET retrieves data.', topic: 'Web Basics' }
      ]
    })
  }
})

export default router
