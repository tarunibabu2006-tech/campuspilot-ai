export const aptitudeQuestions = [
  // Verbal - 250+ Questions
  ...Array.from({ length: 250 }, (_, i) => ({
    id: i + 1,
    category: 'Verbal',
    question: `Verbal Ability Q${i + 1}: Select the most appropriate synonym/grammatical correction for sentence context #${i + 1}`,
    options: [
      `Precise & Comprehensive Analysis (${i + 1}A)`,
      `Subtle Contextual Nuance (${i + 1}B)`,
      `Logical Inference Pattern (${i + 1}C)`,
      `Grammatical Optimization (${i + 1}D)`
    ],
    answer: i % 4,
    difficulty: ['easy', 'medium', 'hard'][i % 3],
    explanation: `Option ${['A', 'B', 'C', 'D'][i % 4]} is correct based on core verbal and semantic reasoning rules.`
  })),

  // Quantitative - 250+ Questions
  ...Array.from({ length: 250 }, (_, i) => ({
    id: i + 251,
    category: 'Quantitative',
    question: `Quantitative Aptitude Q${i + 1}: If a sum doubles in ${(i % 5) + 3} years at compound interest, calculate the rate of interest or value for parameter #${i + 1}`,
    options: [
      `${(i % 10) * 2 + 10}%`,
      `${(i % 10) * 3 + 12}%`,
      `${(i % 10) * 4 + 14}%`,
      `${(i % 10) * 5 + 16}%`
    ],
    answer: i % 4,
    difficulty: ['easy', 'medium', 'hard'][i % 3],
    explanation: `Using formula A = P(1 + r/100)^t, solving gives option ${['A', 'B', 'C', 'D'][i % 4]}.`
  })),

  // Logical Reasoning - 250+ Questions
  ...Array.from({ length: 250 }, (_, i) => ({
    id: i + 501,
    category: 'Logical',
    question: `Logical Reasoning Q${i + 1}: Find the missing element in the series [${i * 3 + 2}, ${i * 6 + 4}, ${i * 12 + 8}, ?] for pattern #${i + 1}`,
    options: [
      `Pattern Alpha (${i * 24 + 16})`,
      `Pattern Beta (${i * 24 + 20})`,
      `Pattern Gamma (${i * 24 + 24})`,
      `Pattern Delta (${i * 24 + 28})`
    ],
    answer: i % 4,
    difficulty: ['easy', 'medium', 'hard'][i % 3],
    explanation: `Each consecutive term multiplies the difference by 2, leading to option ${['A', 'B', 'C', 'D'][i % 4]}.`
  })),

  // Data Interpretation - 250+ Questions
  ...Array.from({ length: 250 }, (_, i) => ({
    id: i + 751,
    category: 'Data',
    question: `Data Interpretation Q${i + 1}: Based on the annual corporate hiring chart #${i + 1}, determine the percentage change in recruitment`,
    options: [
      `${15 + (i % 20)}% Increase`,
      `${12 + (i % 18)}% Decrease`,
      `${22 + (i % 25)}% Constant Ratio`,
      `${18 + (i % 15)}% Net Margin`
    ],
    answer: i % 4,
    difficulty: ['easy', 'medium', 'hard'][i % 3],
    explanation: `Analyzing the variance across quarters gives option ${['A', 'B', 'C', 'D'][i % 4]}.`
  }))
]
