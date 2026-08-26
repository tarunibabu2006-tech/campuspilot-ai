// ============================================================
// seedAptitude.js — Solved Aptitude & Technical Questions
// Used by: AptitudeTest, Placement Prep
// ============================================================

export const SEED_APTITUDE_QUESTIONS = [
  // ═══════ QUANTITATIVE APTITUDE ═══════
  {
    id: 'q1',
    category: 'Quantitative Aptitude',
    subCategory: 'Averages & Percentages',
    question: 'A student scores 75% in an exam of 200 marks. If 20% marks are deducted for negative marking, what is his final percentage score?',
    options: ['55%', '60%', '65%', '70%'],
    answerIndex: 1,
    explanation: 'Initial marks = 75% of 200 = 150. Deduction = 20% of 150 = 30 marks. Final marks = 150 - 30 = 120 marks. Final percentage = (120 / 200) * 100 = 60%.',
    difficulty: 'Medium',
    companyTag: 'TCS / Infosys'
  },
  {
    id: 'q2',
    category: 'Quantitative Aptitude',
    subCategory: 'Time & Work',
    question: 'A can complete a piece of work in 12 days, and B can complete the same work in 16 days. If they work together for 4 days, what fraction of the work remains unfinished?',
    options: ['5/12', '7/12', '1/3', '1/4'],
    answerIndex: 0,
    explanation: 'A 1 day work = 1/12. B 1 day work = 1/16. Combined 1 day work = 1/12 + 1/16 = 7/48. In 4 days work done = 4 * (7/48) = 7/12. Remaining work = 1 - 7/12 = 5/12.',
    difficulty: 'Hard',
    companyTag: 'Wipro / Cognizant'
  },
  {
    id: 'q3',
    category: 'Quantitative Aptitude',
    subCategory: 'Speed, Distance & Time',
    question: 'A train 150 meters long crosses a telegraph post in 9 seconds. What is the speed of the train in km/hr?',
    options: ['50 km/hr', '60 km/hr', '72 km/hr', '80 km/hr'],
    answerIndex: 1,
    explanation: 'Speed = Distance / Time = 150m / 9s = 50/3 m/s. To convert to km/hr multiply by 18/5: (50/3) * (18/5) = 60 km/hr.',
    difficulty: 'Easy',
    companyTag: 'Accenture / Capgemini'
  },

  // ═══════ LOGICAL REASONING ═══════
  {
    id: 'q4',
    category: 'Logical Reasoning',
    subCategory: 'Number Series',
    question: 'Find the missing number in the series: 4, 9, 25, 49, 121, ?, 289',
    options: ['144', '169', '196', '225'],
    answerIndex: 1,
    explanation: 'The series consists of squares of prime numbers: 2² = 4, 3² = 9, 5² = 25, 7² = 49, 11² = 121, Next prime is 13² = 169, 17² = 289.',
    difficulty: 'Medium',
    companyTag: 'Amazon / Flipkart'
  },
  {
    id: 'q5',
    category: 'Logical Reasoning',
    subCategory: 'Coding-Decoding',
    question: 'If "PYTHON" is coded as "QZUIPO", how is "JAVA" coded in the same language?',
    options: ['KBWB', 'KBBB', 'JBW B', 'KCW B'],
    answerIndex: 0,
    explanation: 'Each letter is shifted forward by +1 position: P->Q, Y->Z, T->U, H->I, O->P, N->O. For JAVA: J+1=K, A+1=B, V+1=W, A+1=B => KBWB.',
    difficulty: 'Easy',
    companyTag: 'TCS Digital'
  },

  // ═══════ VERBAL ABILITY ═══════
  {
    id: 'q6',
    category: 'Verbal Ability',
    subCategory: 'Synonyms & Antonyms',
    question: 'Choose the word which is most SIMILAR in meaning to "PRAGMATIC":',
    options: ['Idealistic', 'Practical', 'Theoretical', 'Reckless'],
    answerIndex: 1,
    explanation: '"Pragmatic" means dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations.',
    difficulty: 'Easy',
    companyTag: 'Deloitte / PwC'
  },
  {
    id: 'q7',
    category: 'Verbal Ability',
    subCategory: 'Sentence Correction',
    question: 'Identify the error in the sentence: "Neither of the two candidates have submitted their original certificates during verification."',
    options: ['Neither of', 'the two candidates', 'have submitted', 'their original certificates'],
    answerIndex: 2,
    explanation: '"Neither" is singular and takes a singular verb. The correct phrase is "has submitted" instead of "have submitted".',
    difficulty: 'Medium',
    companyTag: 'SBI PO / IBPS'
  },

  // ═══════ TECHNICAL COMPUTER SCIENCE ═══════
  {
    id: 'q8',
    category: 'Technical CS',
    subCategory: 'Data Structures',
    question: 'What is the worst-case time complexity of QuickSort?',
    options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
    answerIndex: 1,
    explanation: 'QuickSort worst-case occurs when the pivot chosen is always the smallest or largest element (e.g. sorted array with poor pivot selection), resulting in O(n²) time complexity.',
    difficulty: 'Medium',
    companyTag: 'Google / Microsoft'
  },
  {
    id: 'q9',
    category: 'Technical CS',
    subCategory: 'DBMS',
    question: 'Which SQL command is used to remove all records from a table without deleting the table structure and cannot be rolled back in standard SQL?',
    options: ['DELETE', 'TRUNCATE', 'DROP', 'REMOVE'],
    answerIndex: 1,
    explanation: 'TRUNCATE is a DDL command that quickly removes all rows from a table, resets identity seed, and cannot be rolled back in autocommit mode.',
    difficulty: 'Easy',
    companyTag: 'Oracle / Zoho'
  },
  {
    id: 'q10',
    category: 'Technical CS',
    subCategory: 'Operating Systems',
    question: 'Which of the following conditions is NOT required for a deadlock to occur?',
    options: ['Mutual Exclusion', 'Hold and Wait', 'No Preemption', 'Process Preemption'],
    answerIndex: 3,
    explanation: 'The 4 necessary conditions for deadlock are: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait. "Process Preemption" prevents deadlocks.',
    difficulty: 'Hard',
    companyTag: 'ISRO / DRDO'
  }
]

export const APTITUDE_CATEGORIES = [
  'All Categories',
  'Quantitative Aptitude',
  'Logical Reasoning',
  'Verbal Ability',
  'Technical CS'
]
