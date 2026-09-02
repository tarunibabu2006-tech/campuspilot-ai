// Comprehensive School Education Master Data for Class 10 & 12 (CBSE & All State Boards)

export const SCHOOL_BOARDS = [
  { id: 'cbse', name: 'CBSE (Central Board of Secondary Education)', flag: '🇮🇳', region: 'National' },
  { id: 'tn', name: 'Tamil Nadu State Board (Samacheer Kalvi)', flag: '🏛️', region: 'Tamil Nadu' },
  { id: 'up', name: 'UP Board (Madhyamik Shiksha Parishad)', flag: '🏛️', region: 'Uttar Pradesh' },
  { id: 'maha', name: 'Maharashtra State Board (MSBSHSE)', flag: '🏛️', region: 'Maharashtra' },
  { id: 'karnataka', name: 'Karnataka Secondary Education (KSEEB)', flag: '🏛️', region: 'Karnataka' },
  { id: 'kerala', name: 'Kerala Board of Public Examinations (KBPE)', flag: '🏛️', region: 'Kerala' },
  { id: 'rbse', name: 'Rajasthan Board (RBSE)', flag: '🏛️', region: 'Rajasthan' },
  { id: 'bseb', name: 'Bihar School Examination Board (BSEB)', flag: '🏛️', region: 'Bihar' },
  { id: 'mp', name: 'MP Board (MPBSE)', flag: '🏛️', region: 'Madhya Pradesh' },
  { id: 'gseb', name: 'Gujarat Secondary Board (GSEB)', flag: '🏛️', region: 'Gujarat' },
  { id: 'icse', name: 'ICSE / ISC Board', flag: '🇮🇳', region: 'National' }
]

export const CLASS_10_SUBJECTS = [
  {
    id: 'maths-10',
    name: 'Mathematics (Standard & Basic)',
    code: '041 / 241',
    icon: '📐',
    color: '#3b82f6',
    totalMarks: 100,
    theoryMarks: 80,
    internalMarks: 20,
    duration: '3 Hours',
    chaptersCount: 14,
    syllabusPattern: {
      'Section A': { type: '20 MCQs (1 Mark each)', marks: 20 },
      'Section B': { type: '5 Very Short Answer (2 Marks each)', marks: 10 },
      'Section C': { type: '6 Short Answer (3 Marks each)', marks: 18 },
      'Section D': { type: '4 Long Answer (5 Marks each)', marks: 20 },
      'Section E': { type: '3 Case-Based Units (4 Marks each)', marks: 12 }
    },
    chapters: [
      { id: 'ch1', name: 'Real Numbers', weightage: 6, exercises: ['1.1', '1.2'], exemplarCount: 15 },
      { id: 'ch2', name: 'Polynomials', weightage: 5, exercises: ['2.1', '2.2'], exemplarCount: 18 },
      { id: 'ch3', name: 'Pair of Linear Equations in Two Variables', weightage: 7, exercises: ['3.1', '3.2', '3.3'], exemplarCount: 22 },
      { id: 'ch4', name: 'Quadratic Equations', weightage: 6, exercises: ['4.1', '4.2', '4.3'], exemplarCount: 20 },
      { id: 'ch5', name: 'Arithmetic Progressions (AP)', weightage: 6, exercises: ['5.1', '5.2', '5.3'], exemplarCount: 25 },
      { id: 'ch6', name: 'Triangles (Similarity & Theorems)', weightage: 8, exercises: ['6.1', '6.2', '6.3'], exemplarCount: 30 },
      { id: 'ch7', name: 'Coordinate Geometry', weightage: 6, exercises: ['7.1', '7.2'], exemplarCount: 16 },
      { id: 'ch8', name: 'Introduction to Trigonometry', weightage: 8, exercises: ['8.1', '8.2', '8.3'], exemplarCount: 28 },
      { id: 'ch9', name: 'Some Applications of Trigonometry (Heights & Distances)', weightage: 4, exercises: ['9.1'], exemplarCount: 16 },
      { id: 'ch10', name: 'Circles', weightage: 6, exercises: ['10.1', '10.2'], exemplarCount: 20 },
      { id: 'ch11', name: 'Areas Related to Circles', weightage: 4, exercises: ['11.1'], exemplarCount: 14 },
      { id: 'ch12', name: 'Surface Areas and Volumes', weightage: 6, exercises: ['12.1', '12.2'], exemplarCount: 24 },
      { id: 'ch13', name: 'Statistics', weightage: 7, exercises: ['13.1', '13.2', '13.3'], exemplarCount: 18 },
      { id: 'ch14', name: 'Probability', weightage: 4, exercises: ['14.1'], exemplarCount: 15 }
    ]
  },
  {
    id: 'science-10',
    name: 'Science (Physics, Chemistry, Biology)',
    code: '086',
    icon: '🔬',
    color: '#10b981',
    totalMarks: 100,
    theoryMarks: 80,
    internalMarks: 20,
    duration: '3 Hours',
    chaptersCount: 13,
    syllabusPattern: {
      'Section A': { type: '20 Objective Questions (MCQs + Assertion-Reason)', marks: 20 },
      'Section B': { type: '6 Very Short Questions (2 Marks each)', marks: 12 },
      'Section C': { type: '7 Short Questions (3 Marks each)', marks: 21 },
      'Section D': { type: '3 Long Questions (5 Marks each)', marks: 15 },
      'Section E': { type: '3 Source-Based / Case-Based Assessment (4 Marks each)', marks: 12 }
    },
    chapters: [
      { id: 'ch1', name: 'Chemical Reactions and Equations', unit: 'Chemistry', weightage: 7 },
      { id: 'ch2', name: 'Acids, Bases and Salts', unit: 'Chemistry', weightage: 6 },
      { id: 'ch3', name: 'Metals and Non-metals', unit: 'Chemistry', weightage: 7 },
      { id: 'ch4', name: 'Carbon and its Compounds', unit: 'Chemistry', weightage: 6 },
      { id: 'ch5', name: 'Life Processes', unit: 'Biology', weightage: 9 },
      { id: 'ch6', name: 'Control and Coordination', unit: 'Biology', weightage: 6 },
      { id: 'ch7', name: 'How do Organisms Reproduce?', unit: 'Biology', weightage: 7 },
      { id: 'ch8', name: 'Heredity and Evolution', unit: 'Biology', weightage: 4 },
      { id: 'ch9', name: 'Light – Reflection and Refraction', unit: 'Physics', weightage: 9 },
      { id: 'ch10', name: 'The Human Eye and the Colourful World', unit: 'Physics', weightage: 5 },
      { id: 'ch11', name: 'Electricity', unit: 'Physics', weightage: 8 },
      { id: 'ch12', name: 'Magnetic Effects of Electric Current', unit: 'Physics', weightage: 4 },
      { id: 'ch13', name: 'Our Environment', unit: 'Natural Resources', weightage: 5 }
    ]
  },
  {
    id: 'social-10',
    name: 'Social Science (History, Geo, Civics, Eco)',
    code: '087',
    icon: '🌍',
    color: '#f59e0b',
    totalMarks: 100,
    theoryMarks: 80,
    internalMarks: 20,
    duration: '3 Hours',
    chaptersCount: 20,
    syllabusPattern: {
      'Section A': { type: '20 MCQs', marks: 20 },
      'Section B': { type: '4 Very Short (2 Marks each)', marks: 8 },
      'Section C': { type: '5 Short (3 Marks each)', marks: 15 },
      'Section D': { type: '4 Long (5 Marks each)', marks: 20 },
      'Section E': { type: '3 Case-based (4 Marks each)', marks: 12 },
      'Section F': { type: 'Map Skill Based Question', marks: 5 }
    },
    chapters: [
      { id: 'ch1', name: 'The Rise of Nationalism in Europe', unit: 'History', weightage: 6 },
      { id: 'ch2', name: 'Nationalism in India', unit: 'History', weightage: 7 },
      { id: 'ch3', name: 'Resources and Development', unit: 'Geography', weightage: 5 },
      { id: 'ch4', name: 'Agriculture', unit: 'Geography', weightage: 6 },
      { id: 'ch5', name: 'Power Sharing & Federalism', unit: 'Civics', weightage: 7 },
      { id: 'ch6', name: 'Money and Credit', unit: 'Economics', weightage: 6 }
    ]
  },
  {
    id: 'english-10',
    name: 'English (Language & Literature)',
    code: '184',
    icon: '📖',
    color: '#8b5cf6',
    totalMarks: 100,
    theoryMarks: 80,
    internalMarks: 20,
    duration: '3 Hours',
    chaptersCount: 18,
    syllabusPattern: {
      'Section A': { type: 'Reading Skills (2 Unseen Passages)', marks: 20 },
      'Section B': { type: 'Writing Skills & Grammar', marks: 20 },
      'Section C': { type: 'Language Through Literature', marks: 40 }
    },
    chapters: [
      { id: 'ch1', name: 'A Letter to God', unit: 'First Flight Prose' },
      { id: 'ch2', name: 'Nelson Mandela: Long Walk to Freedom', unit: 'First Flight Prose' },
      { id: 'ch3', name: 'Dust of Snow & Fire and Ice', unit: 'First Flight Poetry' },
      { id: 'ch4', name: 'A Triumph of Surgery', unit: 'Footprints Without Feet' }
    ]
  },
  {
    id: 'tamil-10',
    name: 'Tamil Language (State Board & CBSE)',
    code: '006 / TN-10',
    icon: '📜',
    color: '#ec4899',
    totalMarks: 100,
    theoryMarks: 100,
    internalMarks: 0,
    duration: '3 Hours',
    chaptersCount: 9,
    syllabusPattern: {
      'பகுதி 1': { type: 'ஒரு மதிப்பெண் வினாக்கள் (MCQs & செய்யுள்/உரைநடை)', marks: 15 },
      'பகுதி 2': { type: 'இரண்டு மதிப்பெண் வினாக்கள் (குறுவினா)', marks: 18 },
      'பகுதி 3': { type: 'மூன்று மதிப்பெண் வினாக்கள் (சிறுவினா & அணி இலக்கணம்)', marks: 18 },
      'பகுதி 4': { type: 'ஐந்து மதிப்பெண் வினாக்கள் (நெடுவினா & கடிதம்)', marks: 25 },
      'பகுதி 5': { type: 'எட்டு மதிப்பெண் வினாக்கள் (கட்டுரை & விரிவான விடை)', marks: 24 }
    },
    chapters: [
      { id: 'ch1', name: 'இயல் 1: அமுதூற்று (அன்னை மொழியே, தமிழ்ச்சொல் வளம், இரட்டுற மொழிதல்)' },
      { id: 'ch2', name: 'இயல் 2: உயிர்வளி (காற்றே வா, முல்லைப்பாட்டு, புயலிலே ஒரு தோணி)' },
      { id: 'ch3', name: 'இயல் 3: கூட்டாஞ்சோறு (விருந்தோம்பல், காசி காண்டம், மலைபடுகடாம்)' },
      { id: 'ch4', name: 'இயல் 4: நான்காம் தமிழ் (செயற்கை நுண்ணறிவு, பெருமாள் திருமொழி)' }
    ]
  },
  {
    id: 'hindi-10',
    name: 'Hindi (Course A & B)',
    code: '002 / 085',
    icon: '🇮🇳',
    color: '#06b6d4',
    totalMarks: 100,
    theoryMarks: 80,
    internalMarks: 20,
    duration: '3 Hours',
    chaptersCount: 16,
    syllabusPattern: {
      'खंड क': { type: 'अपठित बोध (गद्यांश)', marks: 14 },
      'खंड ख': { type: 'व्यावहारिक व्याकरण (समास, वाक्य, मुहावरे)', marks: 16 },
      'खंड ग': { type: 'पाठ्यपुस्तक व पूरक पुस्तक', marks: 30 },
      'खंड घ': { type: 'रचनात्मक लेखन (अनुच्छेद, पत्र, विज्ञापन)', marks: 20 }
    },
    chapters: [
      { id: 'ch1', name: 'नेताजी का चश्मा (स्वयं प्रकाश)', unit: 'क्षितिज भाग-2' },
      { id: 'ch2', name: 'बालगोबिन भगत (रामवृक्ष बेनीपुरी)', unit: 'क्षितिज भाग-2' },
      { id: 'ch3', name: 'पद (सूरदास)', unit: 'क्षितिज काव्य खंड' }
    ]
  }
]

export const CLASS_12_SUBJECTS = {
  science: [
    {
      id: 'phy-12',
      name: 'Physics (Theory & Practical)',
      code: '042',
      icon: '⚡',
      color: '#3b82f6',
      totalMarks: 100,
      theoryMarks: 70,
      internalMarks: 30,
      duration: '3 Hours',
      chaptersCount: 14,
      competitiveLinks: ['JEE Main Physics', 'NEET Physics'],
      chapters: [
        { id: 'ch1', name: 'Electric Charges and Fields', weightage: 6 },
        { id: 'ch2', name: 'Electrostatic Potential and Capacitance', weightage: 6 },
        { id: 'ch3', name: 'Current Electricity', weightage: 7 },
        { id: 'ch4', name: 'Moving Charges and Magnetism', weightage: 6 },
        { id: 'ch5', name: 'Magnetism and Matter', weightage: 4 },
        { id: 'ch6', name: 'Electromagnetic Induction', weightage: 6 },
        { id: 'ch7', name: 'Alternating Current', weightage: 6 },
        { id: 'ch8', name: 'Electromagnetic Waves', weightage: 3 },
        { id: 'ch9', name: 'Ray Optics and Optical Instruments', weightage: 9 },
        { id: 'ch10', name: 'Wave Optics', weightage: 7 },
        { id: 'ch11', name: 'Dual Nature of Radiation and Matter', weightage: 5 },
        { id: 'ch12', name: 'Atoms & Nuclei', weightage: 7 },
        { id: 'ch13', name: 'Semiconductor Electronics (Diodes & Logic)', weightage: 7 }
      ]
    },
    {
      id: 'chem-12',
      name: 'Chemistry (Organic, Inorganic, Physical)',
      code: '043',
      icon: '🧪',
      color: '#10b981',
      totalMarks: 100,
      theoryMarks: 70,
      internalMarks: 30,
      duration: '3 Hours',
      chaptersCount: 10,
      competitiveLinks: ['JEE Chemistry', 'NEET Chemistry'],
      chapters: [
        { id: 'ch1', name: 'Solutions', unit: 'Physical', weightage: 7 },
        { id: 'ch2', name: 'Electrochemistry', unit: 'Physical', weightage: 9 },
        { id: 'ch3', name: 'Chemical Kinetics', unit: 'Physical', weightage: 7 },
        { id: 'ch4', name: 'd- and f-Block Elements', unit: 'Inorganic', weightage: 7 },
        { id: 'ch5', name: 'Coordination Compounds', unit: 'Inorganic', weightage: 7 },
        { id: 'ch6', name: 'Haloalkanes and Haloarenes', unit: 'Organic', weightage: 6 },
        { id: 'ch7', name: 'Alcohols, Phenols and Ethers', unit: 'Organic', weightage: 6 },
        { id: 'ch8', name: 'Aldehydes, Ketones and Carboxylic Acids', unit: 'Organic', weightage: 8 },
        { id: 'ch9', name: 'Amines', unit: 'Organic', weightage: 6 },
        { id: 'ch10', name: 'Biomolecules', unit: 'Organic', weightage: 7 }
      ]
    },
    {
      id: 'maths-12',
      name: 'Mathematics (Calculus & Vectors)',
      code: '041',
      icon: '📈',
      color: '#f59e0b',
      totalMarks: 100,
      theoryMarks: 80,
      internalMarks: 20,
      duration: '3 Hours',
      chaptersCount: 13,
      competitiveLinks: ['JEE Advanced Maths', 'NDA Mathematics'],
      chapters: [
        { id: 'ch1', name: 'Relations and Functions', weightage: 4 },
        { id: 'ch2', name: 'Inverse Trigonometric Functions', weightage: 4 },
        { id: 'ch3', name: 'Matrices and Determinants', weightage: 10 },
        { id: 'ch4', name: 'Continuity and Differentiability', weightage: 8 },
        { id: 'ch5', name: 'Application of Derivatives (AOD)', weightage: 8 },
        { id: 'ch6', name: 'Integrals (Definite & Indefinite)', weightage: 10 },
        { id: 'ch7', name: 'Application of Integrals (Area Under Curves)', weightage: 6 },
        { id: 'ch8', name: 'Differential Equations', weightage: 6 },
        { id: 'ch9', name: 'Vector Algebra', weightage: 7 },
        { id: 'ch10', name: 'Three-Dimensional Geometry (3D)', weightage: 7 },
        { id: 'ch11', name: 'Linear Programming (LPP)', weightage: 5 },
        { id: 'ch12', name: 'Probability & Bayes Theorem', weightage: 8 }
      ]
    },
    {
      id: 'bio-12',
      name: 'Biology (Genetics & Biotechnology)',
      code: '044',
      icon: '🧬',
      color: '#ec4899',
      totalMarks: 100,
      theoryMarks: 70,
      internalMarks: 30,
      duration: '3 Hours',
      chaptersCount: 13,
      competitiveLinks: ['NEET Biology (360 Marks)'],
      chapters: [
        { id: 'ch1', name: 'Sexual Reproduction in Flowering Plants', weightage: 7 },
        { id: 'ch2', name: 'Human Reproduction & Reproductive Health', weightage: 9 },
        { id: 'ch3', name: 'Principles of Inheritance and Variation (Genetics)', weightage: 10 },
        { id: 'ch4', name: 'Molecular Basis of Inheritance (DNA & Replication)', weightage: 10 },
        { id: 'ch5', name: 'Human Health and Disease', weightage: 7 },
        { id: 'ch6', name: 'Biotechnology: Principles and Processes', weightage: 6 },
        { id: 'ch7', name: 'Biotechnology and its Applications', weightage: 6 },
        { id: 'ch8', name: 'Organisms and Populations & Ecosystem', weightage: 8 }
      ]
    }
  ],
  commerce: [
    {
      id: 'acc-12',
      name: 'Accountancy (Partnership & Company Accounts)',
      code: '055',
      icon: '📊',
      color: '#3b82f6',
      totalMarks: 100,
      theoryMarks: 80,
      internalMarks: 20,
      duration: '3 Hours',
      chapters: [
        { id: 'ch1', name: 'Accounting for Partnership: Fundamentals', weightage: 12 },
        { id: 'ch2', name: 'Admission & Retirement of a Partner', weightage: 14 },
        { id: 'ch3', name: 'Accounting for Share Capital (Shares & Debentures)', weightage: 20 },
        { id: 'ch4', name: 'Financial Statements Analysis & Cash Flow Statement', weightage: 20 }
      ]
    },
    {
      id: 'bst-12',
      name: 'Business Studies (Principles & Management)',
      code: '054',
      icon: '🏢',
      color: '#10b981',
      totalMarks: 100,
      theoryMarks: 80,
      internalMarks: 20,
      duration: '3 Hours',
      chapters: [
        { id: 'ch1', name: 'Nature and Significance of Management', weightage: 8 },
        { id: 'ch2', name: 'Principles of Management (Fayol & Taylor)', weightage: 8 },
        { id: 'ch3', name: 'Planning & Organising', weightage: 14 },
        { id: 'ch4', name: 'Financial Management & Marketing Management', weightage: 20 }
      ]
    },
    {
      id: 'eco-12',
      name: 'Economics (Macroeconomics & Indian Economy)',
      code: '030',
      icon: '💰',
      color: '#f59e0b',
      totalMarks: 100,
      theoryMarks: 80,
      internalMarks: 20,
      duration: '3 Hours',
      chapters: [
        { id: 'ch1', name: 'National Income and Related Aggregates', weightage: 10 },
        { id: 'ch2', name: 'Money and Banking', weightage: 6 },
        { id: 'ch3', name: 'Determination of Income and Employment', weightage: 12 },
        { id: 'ch4', name: 'Government Budget and the Economy', weightage: 6 },
        { id: 'ch5', name: 'Indian Economic Development (1947 - Present)', weightage: 20 }
      ]
    }
  ],
  arts: [
    {
      id: 'pol-12',
      name: 'Political Science (Contemporary World & India)',
      code: '028',
      icon: '🏛️',
      color: '#8b5cf6',
      totalMarks: 100,
      theoryMarks: 80,
      internalMarks: 20,
      duration: '3 Hours'
    },
    {
      id: 'his-12',
      name: 'History (Themes in Indian History I, II, III)',
      code: '027',
      icon: '📜',
      color: '#ec4899',
      totalMarks: 100,
      theoryMarks: 80,
      internalMarks: 20,
      duration: '3 Hours'
    },
    {
      id: 'geo-12',
      name: 'Geography (Human & Physical Geography)',
      code: '029',
      icon: '🗺️',
      color: '#06b6d4',
      totalMarks: 100,
      theoryMarks: 70,
      internalMarks: 30,
      duration: '3 Hours'
    }
  ]
}

// 4-Level Question Bank Sample Master
export const QUESTION_BANK_LEVELS = [
  {
    level: 1,
    title: 'Level 1: Basic Foundation (1-2 Marks)',
    badge: '🌱 Easy Foundation',
    color: '#10b981',
    description: '1 Mark MCQs, Objective statements, and Very Short Answer (VSA) conceptual checks.',
    questionsCount: '1,500+ Verified Qs'
  },
  {
    level: 2,
    title: 'Level 2: Average Numerical & Conceptual (2-3 Marks)',
    badge: '📈 Moderate Standard',
    color: '#3b82f6',
    description: '2-3 Marks Short Answer (SA), standard formula substitutions, and direct theorem proofs.',
    questionsCount: '1,500+ Verified Qs'
  },
  {
    level: 3,
    title: 'Level 3: Difficult Analytical & Case-Based (3-4 Marks)',
    badge: '🚀 Hard Analytical',
    color: '#f59e0b',
    description: '3-4 Marks Long Answer (LA), multi-step problem solving, and Real-world Case Studies.',
    questionsCount: '1,200+ Verified Qs'
  },
  {
    level: 4,
    title: 'Level 4: Competency & Exemplar Challenging (5 Marks)',
    badge: '🏆 100/100 Qualifier',
    color: '#ef4444',
    description: '5 Marks High Order Thinking Skills (HOTS), NCERT Exemplar Tough Problems, and Board Top Rank Deciders.',
    questionsCount: '1,000+ Verified Qs'
  }
]

// DIKSHA & NCERT Video Integration Hub
export const DIKSHA_PLATFORM_STATS = {
  name: 'DIKSHA National Portal for Teachers & Students (NCERT)',
  languagesCount: '36 Indian Languages',
  coursesAvailable: '19,698+ NCERT Curated Interactive Courses',
  enrollments: '182.3 Million+ Nationwide Enrollments',
  officialPortal: 'https://diksha.gov.in',
  categories: [
    { title: 'Chapter Concept Videos', duration: '10-15 mins each', icon: '🎬', count: '500+ Videos' },
    { title: 'Exemplar & Problem Solving', duration: '8-12 mins each', icon: '📐', count: '450+ Videos' },
    { title: 'Topper Board Exam Strategies', duration: '20-30 mins', icon: '🎯', count: '120+ Sessions' },
    { title: 'Last-Minute Revision Sprints', duration: '5-10 mins', icon: '⚡', count: '200+ Capsules' }
  ]
}

// Competitive Exam Mappings for Class 12
export const COMPETITIVE_EXAMS_MAP = [
  {
    id: 'jee-main',
    name: 'JEE Main 2026',
    stream: 'Science (PCM)',
    icon: '⚡',
    organizer: 'National Testing Agency (NTA)',
    seats: '55,000+ Seats in NITs, IIITs & GFTIs',
    pattern: '90 Questions (300 Marks) · Physics, Chem, Math',
    cutoffs: '93.5%ile (General Qualifying Cutoff for JEE Advanced)',
    sampleTest: {
      title: 'JEE Main 2026 Full Syllabus High-Yield Mock Test',
      durationMins: 180,
      totalMarks: 300,
      questions: [
        {
          id: 'jee-q1',
          subject: 'Physics',
          q: 'A block of mass m is placed on a smooth inclined plane of inclination θ. If the whole system is accelerated horizontally with an acceleration a such that the block does not slide, the value of a is:',
          options: ['g tan θ', 'g sin θ', 'g cos θ', 'g cot θ'],
          correct: 0,
          explanation: 'Pseudo force ma cos θ balances mg sin θ along the incline => ma cos θ = mg sin θ => a = g tan θ.'
        },
        {
          id: 'jee-q2',
          subject: 'Mathematics',
          q: 'The value of the integral ∫ (0 to π/2) [sin x / (sin x + cos x)] dx is:',
          options: ['π/4', 'π/2', 'π', '0'],
          correct: 0,
          explanation: 'Using property ∫ f(x)dx = ∫ f(a-x)dx, 2I = ∫ 1 dx from 0 to π/2 = π/2 => I = π/4.'
        }
      ]
    }
  },
  {
    id: 'neet-ug',
    name: 'NEET UG 2026 (Medical Entrance)',
    stream: 'Science (PCB)',
    icon: '🩺',
    organizer: 'NTA / NMC',
    seats: '1,08,000+ MBBS & BDS Govt/Pvt Seats',
    pattern: '200 Questions (720 Marks) · Biology (360), Physics (180), Chem (180)',
    cutoffs: '610+ / 720 for Govt Medical College (AIQ)',
    sampleTest: {
      title: 'NEET 2026 High-Yield Biology & Chemistry Mock Paper',
      durationMins: 200,
      totalMarks: 720,
      questions: [
        {
          id: 'neet-q1',
          subject: 'Biology',
          q: 'In a dihybrid cross, if two heterozygous individuals (AaBb x AaBb) are crossed, what is the phenotypic ratio of offspring in F2 generation?',
          options: ['9:3:3:1', '1:2:1', '3:1', '9:7'],
          correct: 0,
          explanation: 'Standard Mendelian dihybrid phenotypic ratio is 9 (dominant for both) : 3 (recombinant 1) : 3 (recombinant 2) : 1 (double recessive).'
        }
      ]
    }
  },
  {
    id: 'cuet-ug',
    name: 'CUET UG 2026 (Central Universities)',
    stream: 'All Streams (Arts, Science, Commerce)',
    icon: '🏛️',
    organizer: 'NTA',
    seats: 'Admission to DU, BHU, JNU, Jamia, Central Universities',
    pattern: 'Domain Subjects (50 Qs) + General Test + English Language'
  },
  {
    id: 'nda-na',
    name: 'NDA & NA Examination (UPSC)',
    stream: 'Class 12 Defence Career (Army, Navy, Air Force)',
    icon: '🎖️',
    organizer: 'Union Public Service Commission (UPSC)',
    seats: 'Officer Commission in Armed Forces & ₹56,100 starting stipend',
    pattern: 'Maths (300 Marks) + General Ability Test (600 Marks) + SSB Interview'
  },
  {
    id: 'clat-ug',
    name: 'CLAT 2026 (National Law Universities)',
    stream: 'Law & Humanities / All Streams',
    icon: '⚖️',
    organizer: 'Consortium of NLUs',
    seats: 'BA LLB & BBA LLB at NLSIU Bengaluru, NALSAR, WBNUJS'
  }
]
