import express from 'express'

const router = express.Router()

// 1. GET /api/school/boards
router.get('/boards', (req, res) => {
  res.json({
    success: true,
    boards: [
      { id: 'cbse', name: 'CBSE (Central Board of Secondary Education)' },
      { id: 'tn', name: 'Tamil Nadu State Board (Samacheer Kalvi)' },
      { id: 'up', name: 'UP Board (Madhyamik Shiksha Parishad)' },
      { id: 'maha', name: 'Maharashtra State Board (MSBSHSE)' },
      { id: 'karnataka', name: 'Karnataka Secondary Education (KSEEB)' },
      { id: 'kerala', name: 'Kerala Board of Public Examinations (KBPE)' },
      { id: 'rbse', name: 'Rajasthan Board (RBSE)' },
      { id: 'bseb', name: 'Bihar School Examination Board (BSEB)' },
      { id: 'mp', name: 'MP Board (MPBSE)' },
      { id: 'gseb', name: 'Gujarat Secondary Board (GSEB)' }
    ]
  })
})

// 2. GET /api/school/classes
router.get('/classes', (req, res) => {
  res.json({
    success: true,
    classes: ['10', '12']
  })
})

// 3. GET /api/school/subjects/:class/:board
router.get('/subjects/:class/:board', (req, res) => {
  const { class: cls } = req.params
  res.json({
    success: true,
    class: cls,
    subjects: cls === '10' ? [
      { id: 'maths-10', name: 'Mathematics (Standard & Basic)' },
      { id: 'science-10', name: 'Science (Physics, Chemistry, Biology)' },
      { id: 'social-10', name: 'Social Science' },
      { id: 'english-10', name: 'English (Language & Literature)' },
      { id: 'tamil-10', name: 'Tamil (State Board & CBSE)' },
      { id: 'hindi-10', name: 'Hindi (Course A & B)' }
    ] : [
      { id: 'phy-12', name: 'Physics' },
      { id: 'chem-12', name: 'Chemistry' },
      { id: 'maths-12', name: 'Mathematics' },
      { id: 'bio-12', name: 'Biology' },
      { id: 'acc-12', name: 'Accountancy' },
      { id: 'bst-12', name: 'Business Studies' },
      { id: 'eco-12', name: 'Economics' }
    ]
  })
})

// 4. POST /api/school/doubt/solve
router.post('/doubt/solve', (req, res) => {
  const { question, subject } = req.body
  res.json({
    success: true,
    question,
    subject: subject || 'General Science / Math',
    stepByStep: [
      'Step 1: Parse given parameters and constraints from question.',
      'Step 2: Apply fundamental NCERT formula / theorem.',
      'Step 3: Perform standard algebraic simplification with SI units.',
      'Step 4: Final verification and writing complete statement.'
    ],
    finalAnswer: `The problem simplifies according to NCERT textbook standards. Ensure SI units are written explicitly in final answer.`
  })
})

// 5. GET /api/school/progress/:studentId
router.get('/progress/:studentId', (req, res) => {
  res.json({
    success: true,
    overall: 74,
    consistency: 92,
    studyHoursWeek: '18.5 Hours',
    subjects: {
      'Science': 82,
      'Mathematics': 75,
      'Social Science': 78,
      'English': 68,
      'Language': 60
    }
  })
})

export default router
