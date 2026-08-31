import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export const CANDY_LEVELS = [
  {
    id: 1,
    icon: '🏁',
    title: 'LEVEL 1: Choose Your Target Role',
    subtitle: 'Career Discovery & Goal Setting',
    totalXP: 50,
    color: '#818cf8',
    description: 'Discover your strengths, analyze dream career paths across Software, Data, Core Engineering & Govt sectors, and define your placement target.',
    actionRoute: 'career-predictor',
    actionLabel: 'Open Career Predictor ➔',
    tasks: [
      {
        id: '1_1',
        title: 'Explore Placement Roles & Salary Ranges',
        desc: 'Review software engineering, data science, analyst, and core sector job profiles.',
        xp: 15,
        tip: 'Check average salary packages (3.6 LPA to 28 LPA) to align your career goals.',
        activityType: 'quiz',
        questions: [
          {
            q: 'Which career path aligns best with your primary interest?',
            options: [
              '💻 Software Development / SDE (Building apps, algorithms, web/mobile)',
              '📊 Data Science & AI / ML (Data analysis, machine learning models, analytics)',
              '☁️ Cloud, DevOps & Cybersecurity (Infrastructure, CI/CD, network security)',
              '⚙️ Core Engineering / Government Sector (Hardware, VLSI, PSU, civil/mech)'
            ],
            correct: 0
          },
          {
            q: 'What is your dream starting package target for campus placement?',
            options: [
              '🎯 ₹3.6 LPA – ₹7 LPA (Mass MNCs: TCS, Infosys, Wipro, Cognizant)',
              '🚀 ₹8 LPA – ₹15 LPA (High-growth Product & Mid-tier tech: Zoho, Freshworks)',
              '💎 ₹16 LPA – ₹30+ LPA (Tier-1 Product Giants: Google, Amazon, Microsoft)'
            ],
            correct: 1
          }
        ]
      },
      {
        id: '1_2',
        title: 'Complete Career Diagnostic Assessment',
        desc: 'Take the automated self-assessment to identify your technical aptitude and interests.',
        xp: 20,
        tip: 'Answers are mapped to real industry job roles.',
        activityType: 'quiz',
        questions: [
          {
            q: 'What is the most critical foundation tested by top tech recruiters in Round 1?',
            options: [
              '🎨 UI Graphic Design tools',
              '⚡ Data Structures, Algorithms & Problem Solving Logic',
              '📱 Social Media Marketing',
              '📄 Length of resume pages'
            ],
            correct: 1
          },
          {
            q: 'Which programming language do you plan to use for technical interviews?',
            options: [
              '🐍 Python (Great for AI/ML, scripting & DSA)',
              '☕ Java (Widely tested by MNCs & Product firms)',
              '⚡ C++ (High speed STL for competitive programming)',
              '🌐 JavaScript / TypeScript (Full Stack Web development)'
            ],
            correct: 0
          },
          {
            q: 'How many months of structured preparation is recommended before final placements?',
            options: [
              '1 week before drive',
              '3 to 6 months of daily practice in DSA and aptitude',
              'Only night before exam',
              'No preparation needed'
            ],
            correct: 1
          }
        ]
      },
      {
        id: '1_3',
        title: 'Set Target Role in Profile',
        desc: 'Lock in your target role (e.g., SDE-1, Data Analyst, Cloud Engineer) in your profile.',
        xp: 15,
        tip: 'Your target role customizes interview questions and job recommendations.',
        activityType: 'quiz',
        questions: [
          {
            q: 'Select and confirm your primary target role on CampusPilot AI:',
            options: [
              '🌟 Software Development Engineer (SDE-1 / Full Stack)',
              '📈 Data Scientist / Business Data Analyst',
              '🛡️ Cybersecurity / Cloud DevOps Engineer',
              '🏛️ PSU / Govt Officer Trainee'
            ],
            correct: 0
          },
          {
            q: 'How often will you track your XP and complete daily tasks on CampusPilot?',
            options: [
              '🔥 Daily streak of at least 15-30 minutes practice',
              '⚡ 3 times a week',
              '📅 Only on weekends'
            ],
            correct: 0
          }
        ]
      }
    ],
    studyGuide: [
      'Understand the difference between Service-based (TCS, Infosys, Wipro) and Product-based (Amazon, Google, Zoho) hiring patterns.',
      'Identify your primary programming language (Python, Java, or C++).',
      'Set a 6-month timeline for aptitude and core skill mastery.'
    ]
  },
  {
    id: 2,
    icon: '🎯',
    title: 'LEVEL 2: Learning Skills - Foundation',
    subtitle: 'Core Programming & Data Structures Basics',
    totalXP: 60,
    color: '#38bdf8',
    description: 'Build an unshakeable foundation in programming logic, variables, control flow, functions, and fundamental data structures.',
    actionRoute: 'skills',
    actionLabel: 'Open Skill Hub ➔',
    tasks: [
      {
        id: '2_1',
        title: 'Master Programming Syntax & Logic',
        desc: 'Learn loops, conditional statements, recursion, and object-oriented concepts.',
        xp: 25,
        tip: 'Practice in Python or Java with clean coding conventions.',
        activityType: 'quiz',
        questions: [
          {
            q: 'What is the time complexity of accessing an element in an array by its index?',
            options: ['O(1) Constant Time', 'O(N) Linear Time', 'O(log N)', 'O(N^2)'],
            correct: 0
          },
          {
            q: 'Which OOP principle is demonstrated by hiding internal object details and exposing a clean interface?',
            options: ['Inheritance', 'Encapsulation', 'Polymorphism', 'Dynamic Binding'],
            correct: 1
          }
        ]
      },
      {
        id: '2_2',
        title: 'Complete Arrays, Strings & HashMaps Milestone',
        desc: 'Solve 15 foundational coding problems on string manipulation and array operations.',
        xp: 35,
        tip: 'Focus on time complexity (O(N)) and space optimization.',
        activityType: 'quiz',
        questions: [
          {
            q: 'What is the average time complexity of insertion and lookup in a Hash Table (HashMap)?',
            options: ['O(N)', 'O(log N)', 'O(1) on average', 'O(N log N)'],
            correct: 2
          },
          {
            q: 'Which algorithmic pattern is optimal for checking if a string is a palindrome or finding pair sum in a sorted array?',
            options: ['Two-Pointer Technique', 'Greedy Search', 'Floyd-Warshall', 'Depth-First Search'],
            correct: 0
          }
        ]
      }
    ],
    studyGuide: [
      'Master Big-O notation for time and space complexity analysis.',
      'Practice Two-Pointer and Sliding Window techniques.',
      'Build basic CLI utilities to apply logic practically.'
    ]
  },
  {
    id: 3,
    icon: '📚',
    title: 'LEVEL 3: Learning Skills - Intermediate',
    subtitle: 'Database Management & Web/App Frameworks',
    totalXP: 70,
    color: '#34d399',
    description: 'Level up with relational databases (SQL), API development, backend architecture, or modern frontend frameworks.',
    actionRoute: 'skills',
    actionLabel: 'Explore Intermediate Skills ➔',
    tasks: [
      {
        id: '3_1',
        title: 'Master SQL Queries & Database Normalization',
        desc: 'Write complex JOINs, GROUP BY, subqueries, and indexing strategies.',
        xp: 35,
        tip: '90% of technical rounds have at least 2 SQL live query questions.',
        activityType: 'quiz',
        questions: [
          {
            q: 'Which SQL JOIN returns all rows from the left table and matched rows from the right table?',
            options: ['INNER JOIN', 'LEFT JOIN (LEFT OUTER JOIN)', 'RIGHT JOIN', 'CROSS JOIN'],
            correct: 1
          },
          {
            q: 'What does the "A" in ACID database transactions stand for?',
            options: ['Availability', 'Atomicity (all or nothing execution)', 'Authentication', 'Asynchronous'],
            correct: 1
          }
        ]
      },
      {
        id: '3_2',
        title: 'Build REST APIs & Connect Frontend',
        desc: 'Develop CRUD endpoints with authentication and database persistence.',
        xp: 35,
        tip: 'Include JWT tokens and request validation.',
        activityType: 'quiz',
        questions: [
          {
            q: 'Which HTTP method should be used to update an existing resource partially?',
            options: ['GET', 'POST', 'PATCH', 'DELETE'],
            correct: 2
          },
          {
            q: 'What HTTP status code indicates that a resource was successfully created?',
            options: ['200 OK', '201 Created', '301 Moved', '404 Not Found'],
            correct: 1
          }
        ]
      }
    ],
    studyGuide: [
      'Understand ACID properties and transactions in relational databases.',
      'Learn how REST APIs interact with HTTP status codes (200, 201, 400, 404, 500).',
      'Create a Git repository and commit your code with descriptive messages.'
    ]
  },
  {
    id: 4,
    icon: '📖',
    title: 'LEVEL 4: Learning Skills - Advanced',
    subtitle: 'System Design, Cloud & Production Readiness',
    totalXP: 80,
    color: '#fbbf24',
    description: 'Learn system architecture, microservices, cloud deployment (AWS/Docker), caching, and industry-grade engineering practices.',
    actionRoute: 'skills',
    actionLabel: 'Explore Advanced Skills ➔',
    tasks: [
      {
        id: '4_1',
        title: 'Learn Low-Level Design & Design Patterns',
        desc: 'Master Factory, Singleton, Observer patterns and OOP principles.',
        xp: 40,
        tip: 'High-paying product companies test LLD in Round 2.',
        activityType: 'quiz',
        questions: [
          {
            q: 'Which design pattern ensures that a class has only one instance and provides a global access point to it?',
            options: ['Factory Pattern', 'Singleton Pattern', 'Observer Pattern', 'Adapter Pattern'],
            correct: 1
          },
          {
            q: 'In the Observer pattern, what happens when the Subject state changes?',
            options: [
              'All registered observers are notified automatically',
              'The server reboots',
              'The database drops the table',
              'Nothing happens'
            ],
            correct: 0
          }
        ]
      },
      {
        id: '4_2',
        title: 'Deploy Full-Stack Project with Cloud & CI/CD',
        desc: 'Containerize an application with Docker and deploy to cloud platforms.',
        xp: 40,
        tip: 'Showcase live URLs directly in your resume.',
        activityType: 'quiz',
        questions: [
          {
            q: 'What is the main advantage of containerizing an application with Docker?',
            options: [
              'Runs identically across development, staging, and production environments',
              'Increases file download size',
              'Eliminates need for any programming code',
              'Slows down build speed'
            ],
            correct: 0
          },
          {
            q: 'What is the purpose of an In-Memory Cache like Redis in system architecture?',
            options: [
              'Serve high-frequency reads sub-millisecond without hitting the database repeatedly',
              'Permanently store massive video files',
              'Render HTML buttons in browser',
              'Replace DNS servers'
            ],
            correct: 0
          }
        ]
      }
    ],
    studyGuide: [
      'Understand caching mechanisms with Redis and database indexing.',
      'Learn asynchronous queues and background workers for heavy operations.',
      'Optimize API response times below 100ms.'
    ]
  },
  {
    id: 5,
    icon: '📝',
    title: 'LEVEL 5: Skill Assessment Test',
    subtitle: 'Comprehensive Skill Verification & Benchmarking',
    totalXP: 80,
    color: '#f87171',
    description: 'Test your technical knowledge with automated timed coding and theory assessments to verify your skills.',
    actionRoute: 'company-mock-tests',
    actionLabel: 'Launch Skill Assessment ➔',
    tasks: [
      {
        id: '5_1',
        title: 'Attempt Technical MCQ Assessment',
        desc: 'Answer questions covering Programming, SQL, DSA, and Web Tech.',
        xp: 40,
        tip: 'Aim for at least 70% accuracy within time limit.',
        activityType: 'quiz',
        questions: [
          {
            q: 'Which data structure follows LIFO (Last In First Out) order?',
            options: ['Queue', 'Stack', 'Array', 'Graph'],
            correct: 1
          },
          {
            q: 'What is the worst-case time complexity of QuickSort?',
            options: ['O(N log N)', 'O(N^2)', 'O(1)', 'O(N)'],
            correct: 1
          }
        ]
      },
      {
        id: '5_2',
        title: 'Pass Assessment with >75% Score',
        desc: 'Earn your verified skill completion score and benchmark badge.',
        xp: 40,
        tip: 'Verified assessment scores boost your ATS profile score by 30%.',
        activityType: 'quiz',
        questions: [
          {
            q: 'Which database indexing structure is most commonly used for B-Tree indices in relational databases?',
            options: ['Linked List', 'B+ Tree', 'Heap', 'Trie'],
            correct: 1
          },
          {
            q: 'What does a 504 Gateway Timeout HTTP status code indicate?',
            options: [
              'The server, while acting as a gateway, did not receive a timely response from upstream server',
              'Password was wrong',
              'Page does not exist',
              'Request was successfully cached'
            ],
            correct: 0
          }
        ]
      }
    ],
    studyGuide: [
      'Review output-based prediction questions in C++/Java/Python.',
      'Practice debugging code snippets under time limits.',
      'Revise core CS fundamentals: OS, DBMS, Computer Networks.'
    ]
  },
  {
    id: 6,
    icon: '🧠',
    title: 'LEVEL 6: Aptitude Learning & Formulas',
    subtitle: 'Quantitative Aptitude, Logical Reasoning & Verbal',
    totalXP: 90,
    color: '#c084fc',
    description: 'Master time-saving speed math formulas, logical deductions, syllogisms, and verbal grammar patterns for screening exams.',
    actionRoute: 'aptitude-test',
    actionLabel: 'Open Aptitude Hub ➔',
    tasks: [
      {
        id: '6_1',
        title: 'Master Quantitative Speed Math Formulas',
        desc: 'Learn shortcuts for Percentages, Profit & Loss, Time & Work, Speed & Distance.',
        xp: 30,
        tip: 'Use Vedic math and cross-multiplication tricks to solve in <45s.',
        activityType: 'quiz',
        questions: [
          {
            q: 'If A can complete a work in 10 days and B in 15 days, in how many days will they finish working together?',
            options: ['5 days', '6 days ((10*15)/(10+15) = 150/25 = 6)', '7.5 days', '8 days'],
            correct: 1
          },
          {
            q: 'A train 120m long passes a pole in 6 seconds. What is the speed of the train in km/hr?',
            options: ['60 km/hr', '72 km/hr ((120/6) * 18/5 = 20 * 3.6 = 72)', '80 km/hr', '54 km/hr'],
            correct: 1
          }
        ]
      },
      {
        id: '6_2',
        title: 'Master Logical Reasoning & Puzzles',
        desc: 'Practice Seating Arrangements, Blood Relations, Coding-Decoding, and Series.',
        xp: 30,
        tip: 'Draw quick diagram representations to eliminate options rapidly.',
        activityType: 'quiz',
        questions: [
          {
            q: 'Pointing to a photograph, a man said: "His mother is the only daughter of my mother." How is the person related to the man?',
            options: ['Son', 'Nephew (Son of sister)', 'Brother', 'Father'],
            correct: 1
          },
          {
            q: 'Find the next number in series: 2, 6, 12, 20, 30, ?',
            options: ['40', '42 (pattern: +4, +6, +8, +10, +12 -> 30+12=42)', '44', '48'],
            correct: 1
          }
        ]
      },
      {
        id: '6_3',
        title: 'Master Verbal Ability & Reading Comprehension',
        desc: 'Revise Subject-Verb agreement, Sentence Correction, and Paragraph Jumbles.',
        xp: 30,
        tip: 'Focus on root words and eliminating grammatically flawed options.',
        activityType: 'quiz',
        questions: [
          {
            q: 'Choose the correct sentence:',
            options: [
              'Neither the teacher nor the students was present.',
              'Neither the teacher nor the students were present.',
              'Neither the teacher or the students are present.',
              'Neither of them have come.'
            ],
            correct: 1
          },
          {
            q: 'What is the synonym of "METICULOUS"?',
            options: ['Careless', 'Thorough & Precise', 'Rapid', 'Hesitant'],
            correct: 1
          }
        ]
      }
    ],
    studyGuide: [
      'Memorize squares up to 30, cubes up to 20, and fraction-to-percentage conversions.',
      'Practice 20 aptitude questions daily with a timer.',
      'Learn the elimination technique for tricky verbal questions.'
    ]
  },
  {
    id: 7,
    icon: '📊',
    title: 'LEVEL 7: Aptitude Practice Tests',
    subtitle: 'Multi-Tier Timed Placement Exam Simulation',
    totalXP: 100,
    color: '#a78bfa',
    description: 'Simulate high-stakes campus placement online tests under strict time constraints with negative marking.',
    actionRoute: 'aptitude-test',
    actionLabel: 'Start Aptitude Practice ➔',
    tasks: [
      {
        id: '7_1',
        title: 'Pass Level 1 Foundation Aptitude Test',
        desc: 'Score 80%+ on fundamental quantitative and logical questions.',
        xp: 30,
        tip: 'Answer with high accuracy.',
        activityType: 'quiz',
        questions: [
          {
            q: 'The cost price of 20 articles is equal to selling price of 15 articles. What is the profit percentage?',
            options: ['25%', '33.33% ((20-15)/15 * 100 = 33.33%)', '20%', '30%'],
            correct: 1
          },
          {
            q: 'If CAT is coded as 3120, how is DOG coded?',
            options: ['4157 (D=4, O=15, G=7)', '4147', '3157', '4158'],
            correct: 0
          }
        ]
      },
      {
        id: '7_2',
        title: 'Pass Level 2 Speed & Accuracy Test',
        desc: 'Solve intermediate problem sets with negative marking simulation.',
        xp: 35,
        tip: 'Avoid guesswork; skip questions that take >90 seconds.',
        activityType: 'quiz',
        questions: [
          {
            q: 'In how many different ways can the letters of the word "CAMPUS" be arranged?',
            options: ['120', '720 (6! = 720)', '360', '5040'],
            correct: 1
          },
          {
            q: 'Two dice are thrown simultaneously. What is the probability of getting a sum of 8?',
            options: ['5/36 ((2,6),(3,5),(4,4),(5,3),(6,2) -> 5 outcomes)', '1/6', '7/36', '1/12'],
            correct: 0
          }
        ]
      },
      {
        id: '7_3',
        title: 'Pass Level 3 Advanced Placement Test',
        desc: 'Clear full-length company-level aptitude simulation.',
        xp: 35,
        tip: 'Clearing this level guarantees high qualification odds in campus rounds.',
        activityType: 'quiz',
        questions: [
          {
            q: 'A sum of money doubles itself in 5 years at simple interest. What is the rate of interest per annum?',
            options: ['15%', '20% (R = 100/5 = 20%)', '25%', '10%'],
            correct: 1
          },
          {
            q: 'Which word is the antonym of "PRAGMATIC"?',
            options: ['Realistic', 'Practical', 'Idealistic / Impractical', 'Logical'],
            correct: 2
          }
        ]
      }
    ],
    studyGuide: [
      'Maintain 85%+ accuracy on Quantitative sections.',
      'Prioritize high-yield topics: Time & Work, Permutations, Data Interpretation.',
      'Review wrong answers immediately after completing each practice test.'
    ]
  },
  {
    id: 8,
    icon: '🏢',
    title: 'LEVEL 8: Company-Specific Mock Tests',
    subtitle: 'Pattern-Specific Tests for TCS, Infosys, Zoho & Amazon',
    totalXP: 100,
    color: '#f472b6',
    description: 'Experience authentic test patterns modeled exactly after TCS NQT, Infosys InfyTQ, Zoho Written, and Product Giants.',
    actionRoute: 'company-mock-tests',
    actionLabel: 'Open Company Mock Tests ➔',
    tasks: [
      {
        id: '8_1',
        title: 'Complete TCS NQT & Infosys Mock Test',
        desc: 'Attempt cognitive + advanced coding sections following the TCS/Infosys pattern.',
        xp: 30,
        tip: 'Includes Numerical Ability, Verbal, and Hands-on Coding.',
        activityType: 'quiz',
        questions: [
          {
            q: 'In TCS NQT Numerical Ability: What is the unit digit of (7^95 - 3^58)?',
            options: ['0', '4 (7^3=3, 3^2=9 -> (13-9)=4)', '6', '7'],
            correct: 1
          },
          {
            q: 'In InfyTQ: Which data structure is used for recursive function call execution?',
            options: ['Queue', 'Call Stack', 'Heap', 'Priority Queue'],
            correct: 1
          }
        ]
      },
      {
        id: '8_2',
        title: 'Complete Zoho & Product Giants Mock Test',
        desc: 'Solve output-prediction, C/C++ recursion tracing, and algorithm rounds.',
        xp: 35,
        tip: 'Focus on pointers, recursion, and nested loops.',
        activityType: 'quiz',
        questions: [
          {
            q: 'Zoho Written Round Question: What will `printf("%d", 5 + 3 * 2 % 4);` print?',
            options: ['7 (3*2=6, 6%4=2, 5+2=7)', '8', '11', '1'],
            correct: 0
          },
          {
            q: 'What is the space complexity of an in-place array reversal algorithm?',
            options: ['O(N)', 'O(1) Auxiliary Space', 'O(log N)', 'O(N^2)'],
            correct: 1
          }
        ]
      },
      {
        id: '8_3',
        title: 'Complete Core Engineering / PSU Mock Test',
        desc: 'Attempt technical domain exam (GATE / Technical Trainee pattern).',
        xp: 35,
        tip: 'Includes domain-specific technical MCQs.',
        activityType: 'quiz',
        questions: [
          {
            q: 'In Computer Networks: Which layer in OSI model is responsible for end-to-end reliability and flow control?',
            options: ['Network Layer', 'Transport Layer (TCP)', 'Data Link Layer', 'Session Layer'],
            correct: 1
          },
          {
            q: 'In Operating Systems: Which scheduling algorithm may lead to process starvation if long processes keep waiting?',
            options: ['Round Robin', 'Shortest Job First (SJF)', 'First Come First Serve', 'Priority without aging'],
            correct: 1
          }
        ]
      }
    ],
    studyGuide: [
      'Analyze the test pattern of your top 3 dream companies.',
      'Practice pseudo-code evaluation and algorithm complexity analysis.',
      'Ensure you can write clean code on an online compiler without IDE autocomplete.'
    ]
  },
  {
    id: 9,
    icon: '🎙️',
    title: 'LEVEL 9: Mock Technical & HR Interviews',
    subtitle: 'Behavioral, Technical & Problem Solving Rounds',
    totalXP: 100,
    color: '#60a5fa',
    description: 'Simulate face-to-face technical grilling and HR behavioral rounds with real scenario questions and expert feedback.',
    actionRoute: 'interview',
    actionLabel: 'Launch Mock Interview ➔',
    tasks: [
      {
        id: '9_1',
        title: 'Complete Technical Interview Round',
        desc: 'Answer project deep-dives, database architecture, and live coding explanations.',
        xp: 50,
        tip: 'Use the STAR method (Situation, Task, Action, Result) for behavioral answers.',
        activityType: 'quiz',
        questions: [
          {
            q: 'When an interviewer asks: "Explain your final year project architecture", what should you highlight first?',
            options: [
              'Jump straight to small styling details',
              'State the core problem statement, your technical stack, and your specific role/contribution',
              'Say you copied it from online',
              'Talk only about college canteen'
            ],
            correct: 1
          },
          {
            q: 'How do you handle an algorithmic question when you do not know the optimal solution immediately?',
            options: [
              'Stay silent for 15 minutes',
              'Communicate a brute-force approach first, explain trade-offs, and collaborate to optimize',
              'Give up and ask to skip',
              'Argue with interviewer'
            ],
            correct: 1
          }
        ]
      },
      {
        id: '9_2',
        title: 'Complete HR & Managerial Behavioral Round',
        desc: 'Practice "Tell me about yourself", conflict resolution, and career vision questions.',
        xp: 50,
        tip: 'Keep your introduction under 90 seconds and highlight quantifiable achievements.',
        activityType: 'quiz',
        questions: [
          {
            q: 'In "Tell me about yourself", what is the best structured order to follow?',
            options: [
              'Life story from kindergarten',
              'Present (Education/Domain) → Past (Projects/Achievements) → Future (Why this company excites you)',
              'Only list hobbies',
              'Talk about salary demands'
            ],
            correct: 1
          },
          {
            q: 'When asked: "Where do you see yourself in 3-5 years?", what shows the highest maturity?',
            options: [
              'Taking your CEO position next month',
              'Growing into a solid technical contributor/team lead who delivers high-impact systems',
              'Switching companies every 6 months',
              'I have no plans'
            ],
            correct: 1
          }
        ]
      }
    ],
    studyGuide: [
      'Prepare detailed explanations for every project listed on your resume.',
      'Be ready to explain how you handled bugs, team conflicts, and tight deadlines.',
      'Have 2-3 thoughtful questions prepared to ask the interviewer at the end.'
    ]
  },
  {
    id: 10,
    icon: '🗣️',
    title: 'LEVEL 10: AI Voice Mock Interview',
    subtitle: 'Real-Time Voice Speech Evaluation & Pronunciation AI',
    totalXP: 120,
    color: '#4ade80',
    description: 'Speak directly with our AI interviewer using your microphone. Get real-time analysis on fluency, grammar, confidence, and technical depth.',
    actionRoute: 'voice-mock-interview',
    actionLabel: 'Start Voice Interview ➔',
    tasks: [
      {
        id: '10_1',
        title: 'Complete Voice Technical Q&A Session',
        desc: 'Speak answers out loud to AI technical questions and receive speech clarity scores.',
        xp: 40,
        tip: 'Speak at a calm, steady pace of 130-150 words per minute.',
        activityType: 'quiz',
        questions: [
          {
            q: 'What is the optimal speaking pace for English technical voice interviews?',
            options: [
              'Extremely fast (>220 wpm) so they cannot interrupt',
              'Steady, clear, and confident pace (130–150 words per minute)',
              'Whispering slowly (<60 wpm)',
              'Speaking without pauses'
            ],
            correct: 1
          },
          {
            q: 'How should you reduce filler words like "um", "uh", "you know" during voice interviews?',
            options: [
              'Take a silent 2-second breath pause before answering to organize thoughts',
              'Keep repeating the interviewer question 5 times',
              'Speed up even more',
              'Turn off microphone'
            ],
            correct: 0
          }
        ]
      },
      {
        id: '10_2',
        title: 'Complete Voice HR & Spoken English Assessment',
        desc: 'Evaluate fluency, tone, vocabulary, and response structure.',
        xp: 40,
        tip: 'Avoid filler words (um, uh, like) by pausing before answering.',
        activityType: 'quiz',
        questions: [
          {
            q: 'Which vocal quality projects the highest confidence in virtual/phone interviews?',
            options: [
              'Monotone robotic voice',
              'Clear articulation with positive inflection and steady volume',
              'Shouting loudly into mic',
              'Mumbling softly'
            ],
            correct: 1
          }
        ]
      },
      {
        id: '10_3',
        title: 'Achieve >80% AI Communication Rating',
        desc: 'Score distinction in AI vocal clarity, confidence, and technical correctness.',
        xp: 40,
        tip: 'Top performers receive verified interview-ready recommendation badges.',
        activityType: 'quiz',
        questions: [
          {
            q: 'What should you do if the interviewer asks a technical question you did not hear clearly?',
            options: [
              'Politely ask: "Pardon me, could you please repeat the question?"',
              'Make up an answer to a random topic',
              'Disconnect the call',
              'Stay silent'
            ],
            correct: 0
          }
        ]
      }
    ],
    studyGuide: [
      'Ensure a quiet environment and clear microphone input.',
      'Structure every voice answer: Direct Answer → Context/Reasoning → Real Example.',
      'Practice speaking without reading notes to build natural conversational flow.'
    ]
  },
  {
    id: 11,
    icon: '💼',
    title: 'LEVEL 11: Placement Job Applications & Dream Offer',
    subtitle: 'Verified Openings, ATS Matching & Final Offer',
    totalXP: 250,
    color: '#f59e0b',
    description: 'Apply to verified campus openings, match ATS requirements with 100% real profile data, attend interviews, and celebrate your final offer!',
    actionRoute: 'jobs',
    actionLabel: 'Browse Verified Placement Jobs ➔',
    tasks: [
      {
        id: '11_1',
        title: 'Optimize ATS Resume Score to 80%+',
        desc: 'Verify that your resume matches target company keywords and technical skills.',
        xp: 40,
        tip: 'Use clean formatting without tables or multi-column layouts.',
        activityType: 'quiz',
        questions: [
          {
            q: 'Which bullet point format is most favored by ATS scanners and recruiters?',
            options: [
              'Action Verb + Task + Quantifiable Impact/Result (e.g., "Optimized API latency by 42% using Redis")',
              'Just writing "I worked on project"',
              'Long 10-line paragraphs without metrics',
              'List of emojis'
            ],
            correct: 0
          }
        ]
      },
      {
        id: '11_2',
        title: 'Apply to 5 Verified Matching Openings',
        desc: 'Submit applications through the Verified Placement Portal with automated reference IDs.',
        xp: 50,
        tip: 'Target jobs with ≥70% calculated real match.',
        activityType: 'quiz',
        questions: [
          {
            q: 'Why does CampusPilot AI calculate match % using real profile skills rather than fake numbers?',
            options: [
              'To ensure students apply to roles they are genuinely qualified for with zero confusion',
              'To hide real data',
              'Just for decoration',
              'No reason'
            ],
            correct: 0
          }
        ]
      },
      {
        id: '11_3',
        title: 'Attend Official Company Interviews',
        desc: 'Participate in written tests and online technical/HR interview rounds.',
        xp: 60,
        tip: 'Stay confident, review past company interview archives, and revise cheat sheets.',
        activityType: 'quiz',
        questions: [
          {
            q: 'On the day of your official campus placement drive, what is the best strategy?',
            options: [
              'Be punctual, well-dressed, keep resume copy ready, and maintain calm confidence',
              'Panic and stay up all night',
              'Arrive 1 hour late',
              'Skip breakfast'
            ],
            correct: 0
          }
        ]
      },
      {
        id: '11_4',
        title: 'Secure Dream Placement Offer 🎉',
        desc: 'Receive official job offer letter and graduate to CampusPilot AI Placement Hall of Fame!',
        xp: 100,
        tip: 'Celebrate your achievement! Your placement journey is complete.',
        activityType: 'quiz',
        questions: [
          {
            q: '🎉 Congratulations on reaching Level 11! Are you ready to claim your campus placement victory?',
            options: [
              '🏆 Yes! I am 100% prepared and ready to secure my dream placement offer!',
              '🚀 Ready to excel in all campus drives!'
            ],
            correct: 0
          }
        ]
      }
    ],
    studyGuide: [
      'Track every application status in your AI Applications portal.',
      'Follow up professionally on all interview invitations.',
      'Help junior campus students by sharing your interview experiences in Alumni Network.'
    ]
  }
]

export default function Gamification() {
  const { user, updateUser } = useAuth()

  const [unlockedLevel, setUnlockedLevel] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_unlocked_level')
      return saved ? parseInt(saved, 10) : 1
    } catch {
      return 1
    }
  })

  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_completed_gamification_tasks')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  const [selectedLevel, setSelectedLevel] = useState(null)
  const [showCelebration, setShowCelebration] = useState(null)

  // ── ACTIVE TASK INTERACTIVE MODAL STATE ───────────────────────────
  const [activeTaskModal, setActiveTaskModal] = useState(null)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [taskSubmitted, setTaskSubmitted] = useState(false)

  // Open task interactive modal
  const handleOpenTaskActivity = (lvl, task) => {
    setSelectedAnswers({})
    setTaskSubmitted(false)
    setActiveTaskModal({
      level: lvl,
      task: task
    })
  }

  // Answer selection in task modal
  const handleSelectAnswer = (qIndex, optIndex) => {
    if (taskSubmitted) return
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: optIndex }))
  }

  // Submit task answers
  const handleSubmitTaskActivity = () => {
    if (!activeTaskModal) return
    const { level, task } = activeTaskModal
    const questions = task.questions || []

    // Ensure all questions answered
    const unanswered = questions.findIndex((_, idx) => selectedAnswers[idx] === undefined)
    if (unanswered !== -1) {
      toast.error(`Please answer Question ${unanswered + 1} before submitting!`)
      return
    }

    setTaskSubmitted(true)

    // Mark task done
    const updated = { ...completedTasks, [task.id]: true }
    setCompletedTasks(updated)
    localStorage.setItem('campuspilot_completed_gamification_tasks', JSON.stringify(updated))

    const addedXP = task.xp
    if (user) {
      updateUser({ ...user, xp: (user?.xp || 0) + addedXP })
    }

    toast.success(`🎉 Excellent! You earned +${addedXP} XP for completing "${task.title}"!`)

    // Check if whole level is now done
    setTimeout(() => {
      setActiveTaskModal(null)
      const allLevelTasksDone = level.tasks.every(t => updated[t.id])
      if (allLevelTasksDone) {
        const nextLvl = Math.min(11, level.id + 1)
        if (nextLvl > unlockedLevel) {
          setUnlockedLevel(nextLvl)
          localStorage.setItem('campuspilot_unlocked_level', String(nextLvl))
        }
        setShowCelebration(level)
      }
    }, 1200)
  }

  // Toggle task directly
  const handleTaskToggle = (lvl, task) => {
    const isDone = !!completedTasks[task.id]
    if (!isDone && task.questions && task.questions.length > 0) {
      handleOpenTaskActivity(lvl, task)
      return
    }

    const updated = { ...completedTasks, [task.id]: !isDone }
    setCompletedTasks(updated)
    localStorage.setItem('campuspilot_completed_gamification_tasks', JSON.stringify(updated))

    if (!isDone) {
      const addedXP = task.xp
      if (user) {
        updateUser({ ...user, xp: (user?.xp || 0) + addedXP })
      }
      toast.success(`⭐ +${addedXP} XP Earned for "${task.title}"!`)

      const allLevelTasksDone = lvl.tasks.every(t => t.id === task.id || updated[t.id])
      if (allLevelTasksDone) {
        const nextLvl = Math.min(11, lvl.id + 1)
        if (nextLvl > unlockedLevel) {
          setUnlockedLevel(nextLvl)
          localStorage.setItem('campuspilot_unlocked_level', String(nextLvl))
        }
        setShowCelebration(lvl)
      }
    }
  }

  // Instant Complete Whole Level
  const handleCompleteFullLevel = (lvl) => {
    const updated = { ...completedTasks }
    let newlyAddedXP = 0

    lvl.tasks.forEach(t => {
      if (!updated[t.id]) {
        updated[t.id] = true
        newlyAddedXP += t.xp
      }
    })

    setCompletedTasks(updated)
    localStorage.setItem('campuspilot_completed_gamification_tasks', JSON.stringify(updated))

    if (newlyAddedXP > 0 && user) {
      updateUser({ ...user, xp: (user?.xp || 0) + newlyAddedXP })
    }

    const nextLvl = Math.min(11, lvl.id + 1)
    if (nextLvl > unlockedLevel) {
      setUnlockedLevel(nextLvl)
      localStorage.setItem('campuspilot_unlocked_level', String(nextLvl))
    }

    setShowCelebration(lvl)
    toast.success(`🎉 Level ${lvl.id} Complete! +${newlyAddedXP > 0 ? newlyAddedXP : lvl.totalXP} XP Synced!`)
  }

  // Open a level detail view
  const handleOpenLevel = (lvl) => {
    if (lvl.id > unlockedLevel) {
      toast.error(`🔒 Level ${lvl.id} is locked! Complete Level ${lvl.id - 1} first to unlock.`, {
        icon: '🔒'
      })
      return
    }
    setSelectedLevel(lvl)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Calculate total XP earned from tasks
  const totalCalculatedXP = Object.entries(completedTasks).reduce((acc, [taskId, isDone]) => {
    if (!isDone) return acc
    for (const lvl of CANDY_LEVELS) {
      const found = lvl.tasks.find(t => t.id === taskId)
      if (found) return acc + found.xp
    }
    return acc
  }, 0)

  // Overall progression percentage
  const totalTasksCount = CANDY_LEVELS.reduce((acc, l) => acc + l.tasks.length, 0)
  const completedTasksCount = Object.values(completedTasks).filter(Boolean).length
  const overallProgressPct = Math.round((completedTasksCount / totalTasksCount) * 100)

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
      {/* ── HEADER BANNER ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #0f172a 100%)',
          borderRadius: '1.5rem',
          padding: '2rem',
          border: '1px solid rgba(139,92,246,0.35)',
          boxShadow: '0 8px 32px rgba(124,58,237,0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '2.5rem' }}>🎮</span>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
                11-Level Career Journey & Gamified Placement Mastery
              </h1>
              <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
                Click any task inside each level to answer questions, earn real XP, and unlock your dream job offer
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#1a1a1a',
            fontWeight: '900',
            fontSize: '0.9rem',
            padding: '0.5rem 1.25rem',
            borderRadius: '2rem',
            boxShadow: '0 4px 15px rgba(245,158,11,0.35)'
          }}>
            ⭐ {totalCalculatedXP} XP Earned
          </span>
          <span style={{
            background: 'rgba(34,197,94,0.15)',
            color: '#4ade80',
            border: '1px solid rgba(34,197,94,0.4)',
            padding: '0.5rem 1.1rem',
            borderRadius: '2rem',
            fontWeight: '800',
            fontSize: '0.85rem'
          }}>
            🔓 Level {unlockedLevel}/11 Unlocked ({overallProgressPct}%)
          </span>
        </div>
      </motion.div>

      {/* ── DETAILED LEVEL WORKSPACE VIEW (IF A LEVEL IS OPENED) ──────── */}
      <AnimatePresence mode="wait">
        {selectedLevel ? (
          <motion.div
            key="level-detail-view"
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -15 }}
            style={{
              background: 'linear-gradient(135deg, rgba(30,27,75,0.95), rgba(15,23,42,0.98))',
              border: `2px solid ${selectedLevel.color}`,
              borderRadius: '1.5rem',
              padding: '2rem',
              boxShadow: `0 12px 40px ${selectedLevel.color}33`,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            {/* Top Navigation Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.25rem' }}>
              <button
                onClick={() => setSelectedLevel(null)}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '0.75rem',
                  padding: '0.6rem 1.25rem',
                  fontWeight: '800',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                ← Back to All 11 Levels
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{
                  background: `${selectedLevel.color}22`,
                  color: selectedLevel.color,
                  border: `1px solid ${selectedLevel.color}55`,
                  padding: '0.4rem 0.9rem',
                  borderRadius: '1rem',
                  fontSize: '0.82rem',
                  fontWeight: '800'
                }}>
                  {selectedLevel.tasks.filter(t => completedTasks[t.id]).length}/{selectedLevel.tasks.length} Tasks Done
                </span>
                <span style={{
                  background: 'rgba(250, 204, 21, 0.15)',
                  color: '#facc15',
                  border: '1px solid rgba(250, 204, 21, 0.3)',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '1rem',
                  fontSize: '0.82rem',
                  fontWeight: '800'
                }}>
                  +{selectedLevel.totalXP} Level XP
                </span>
              </div>
            </div>

            {/* Level Title & Overview Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '18px',
                background: `${selectedLevel.color}25`,
                border: `2px solid ${selectedLevel.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                flexShrink: 0
              }}>
                {selectedLevel.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: selectedLevel.color, fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {selectedLevel.subtitle}
                </div>
                <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.6rem', margin: '0.2rem 0 0.5rem' }}>
                  {selectedLevel.title}
                </h2>
                <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  {selectedLevel.description}
                </p>
              </div>
            </div>

            {/* Direct Tool Shortcut Action */}
            {selectedLevel.actionRoute && (
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1rem',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div style={{ color: '#e2e8f0', fontSize: '0.88rem' }}>
                  ⚡ <strong>Interactive Tool Available:</strong> Launch the dedicated feature directly for this level.
                </div>
                <button
                  onClick={() => {
                    window.location.hash = `#${selectedLevel.actionRoute}`
                  }}
                  style={{
                    background: `linear-gradient(135deg, ${selectedLevel.color}, #3b82f6)`,
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.65rem',
                    padding: '0.55rem 1.15rem',
                    fontWeight: '800',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: `0 4px 15px ${selectedLevel.color}44`
                  }}
                >
                  {selectedLevel.actionLabel}
                </button>
              </div>
            )}

            {/* ── STEP-BY-STEP TASKS LIST (INTERACTIVE CLICK-TO-ANSWER) ── */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.15rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>📋</span> Required Level Tasks & Milestones
                </h3>
                <span style={{ color: '#a5b4fc', fontSize: '0.8rem' }}>
                  👉 Click on any task card to answer & submit
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {selectedLevel.tasks.map((task, idx) => {
                  const isTaskDone = !!completedTasks[task.id]

                  return (
                    <motion.div
                      key={task.id}
                      whileHover={{ scale: 1.015 }}
                      onClick={() => handleOpenTaskActivity(selectedLevel, task)}
                      style={{
                        background: isTaskDone
                          ? 'linear-gradient(135deg, rgba(34,197,94,0.14), rgba(15,23,42,0.7))'
                          : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${isTaskDone ? 'rgba(34,197,94,0.45)' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: '1rem',
                        padding: '1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        cursor: 'pointer',
                        boxShadow: isTaskDone ? '0 4px 20px rgba(34,197,94,0.15)' : 'none',
                        transition: 'border-color 0.2s, transform 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1, minWidth: '240px' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: isTaskDone ? '#22c55e' : 'rgba(255,255,255,0.08)',
                            border: `2px solid ${isTaskDone ? '#22c55e' : selectedLevel.color}`,
                            color: 'white',
                            fontWeight: '900',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          {isTaskDone ? '✓' : idx + 1}
                        </div>

                        <div>
                          <div style={{ color: isTaskDone ? '#4ade80' : 'white', fontWeight: '800', fontSize: '1.02rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {task.title}
                            {isTaskDone && (
                              <span style={{ background: 'rgba(34,197,94,0.2)', color: '#4ade80', padding: '0.1rem 0.4rem', borderRadius: '0.4rem', fontSize: '0.68rem', fontWeight: '800' }}>
                                PASSED
                              </span>
                            )}
                          </div>
                          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                            {task.desc}
                          </div>
                          {task.tip && (
                            <div style={{ color: '#fbbf24', fontSize: '0.78rem', marginTop: '0.35rem' }}>
                              💡 <em>{task.tip}</em>
                            </div>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <span style={{ color: '#fbbf24', fontWeight: '900', fontSize: '0.9rem', background: 'rgba(251,191,36,0.1)', padding: '0.3rem 0.65rem', borderRadius: '0.5rem' }}>
                          +{task.xp} XP
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOpenTaskActivity(selectedLevel, task)
                          }}
                          style={{
                            background: isTaskDone
                              ? 'rgba(34,197,94,0.2)'
                              : `linear-gradient(135deg, ${selectedLevel.color}, #2563eb)`,
                            color: isTaskDone ? '#4ade80' : 'white',
                            border: isTaskDone ? '1px solid rgba(34,197,94,0.5)' : 'none',
                            borderRadius: '0.65rem',
                            padding: '0.55rem 1.1rem',
                            fontWeight: '800',
                            fontSize: '0.82rem',
                            cursor: 'pointer',
                            boxShadow: isTaskDone ? 'none' : `0 4px 15px ${selectedLevel.color}44`
                          }}
                        >
                          {isTaskDone ? 'Review Answers ✓' : 'Click to Answer ➔'}
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* ── STUDY GUIDE & CHEAT SHEET ────────────────────────── */}
            {selectedLevel.studyGuide && selectedLevel.studyGuide.length > 0 && (
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '1.25rem' }}>
                <h4 style={{ color: '#c4b5fd', fontSize: '0.9rem', fontWeight: '800', margin: '0 0 0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>📖</span> High-Impact Preparation Strategy & Advice
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#cbd5e1', fontSize: '0.84rem', lineHeight: 1.6 }}>
                  {selectedLevel.studyGuide.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── COMPLETE LEVEL & UNLOCK NEXT BUTTON ───────────────── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
              <button
                onClick={() => setSelectedLevel(null)}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  color: '#94a3b8',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.75rem',
                  padding: '0.75rem 1.25rem',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                ← Back to Journey Map
              </button>

              <button
                onClick={() => handleCompleteFullLevel(selectedLevel)}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.75rem',
                  padding: '0.85rem 2rem',
                  fontWeight: '900',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>🎉 Complete Level {selectedLevel.id} & Unlock Level {Math.min(11, selectedLevel.id + 1)}</span> ➔
              </button>
            </div>
          </motion.div>
        ) : (
          /* ── MAIN 11-LEVELS ROADMAP VIEW ────────────────────────────── */
          <motion.div
            key="all-levels-map-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem', fontWeight: '700' }}>
                🗺️ Click on any unlocked level to enter its workspace, answer tasks, and advance:
              </div>
              <div style={{ color: '#4ade80', fontSize: '0.82rem', fontWeight: '800' }}>
                {unlockedLevel}/11 Unlocked
              </div>
            </div>

            {CANDY_LEVELS.map((lvl, index) => {
              const isUnlocked = lvl.id <= unlockedLevel
              const tasksDone = lvl.tasks.filter(t => completedTasks[t.id]).length
              const isFullyDone = tasksDone === lvl.tasks.length
              const progressPct = Math.round((tasksDone / lvl.tasks.length) * 100)

              return (
                <motion.div
                  key={lvl.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -15 : 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  whileHover={isUnlocked ? { scale: 1.015, y: -2 } : {}}
                  onClick={() => handleOpenLevel(lvl)}
                  style={{
                    background: isFullyDone
                      ? 'linear-gradient(135deg, rgba(34,197,94,0.14), rgba(15,23,42,0.95))'
                      : isUnlocked
                        ? 'rgba(255,255,255,0.03)'
                        : 'rgba(255,255,255,0.01)',
                    border: isFullyDone
                      ? '1px solid #22c55e'
                      : isUnlocked
                        ? `1px solid ${lvl.color}66`
                        : '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '1.25rem',
                    padding: '1.5rem',
                    opacity: isUnlocked ? 1 : 0.45,
                    cursor: isUnlocked ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                    boxShadow: isUnlocked ? `0 4px 20px ${lvl.color}15` : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    {/* Left: Icon and Level Info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        background: isFullyDone ? '#22c55e' : isUnlocked ? `${lvl.color}22` : 'rgba(255,255,255,0.05)',
                        border: `2px solid ${isFullyDone ? '#22c55e' : isUnlocked ? lvl.color : '#64748b'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.6rem',
                        flexShrink: 0
                      }}>
                        {isFullyDone ? '✅' : isUnlocked ? lvl.icon : '🔒'}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <h3 style={{ color: isUnlocked ? '#ffffff' : '#94a3b8', fontWeight: '900', fontSize: '1.15rem', margin: 0 }}>
                            {lvl.title}
                          </h3>
                          {isFullyDone && (
                            <span style={{ background: 'rgba(34,197,94,0.2)', color: '#4ade80', padding: '0.15rem 0.5rem', borderRadius: '0.5rem', fontSize: '0.7rem', fontWeight: '800' }}>
                              COMPLETED
                            </span>
                          )}
                          {!isUnlocked && (
                            <span style={{ background: 'rgba(255,255,255,0.08)', color: '#94a3b8', padding: '0.15rem 0.5rem', borderRadius: '0.5rem', fontSize: '0.7rem', fontWeight: '700' }}>
                              LOCKED
                            </span>
                          )}
                        </div>
                        <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0.2rem 0 0' }}>
                          {lvl.subtitle} · <strong style={{ color: lvl.color }}>+{lvl.totalXP} Max XP</strong>
                        </p>
                      </div>
                    </div>

                    {/* Right: Progress and Action Button */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: isFullyDone ? '#4ade80' : isUnlocked ? '#cbd5e1' : '#64748b', fontWeight: '800', fontSize: '0.85rem' }}>
                          {tasksDone}/{lvl.tasks.length} Completed ({progressPct}%)
                        </div>
                        <div style={{ width: '130px', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', marginTop: '0.3rem', overflow: 'hidden' }}>
                          <div style={{ width: `${progressPct}%`, height: '100%', background: isFullyDone ? '#22c55e' : lvl.color, borderRadius: '3px', transition: 'width 0.3s ease' }} />
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenLevel(lvl)
                        }}
                        style={{
                          background: isUnlocked
                            ? `linear-gradient(135deg, ${lvl.color}, #2563eb)`
                            : 'rgba(255,255,255,0.05)',
                          color: isUnlocked ? 'white' : '#64748b',
                          border: 'none',
                          borderRadius: '0.65rem',
                          padding: '0.6rem 1.1rem',
                          fontWeight: '800',
                          fontSize: '0.82rem',
                          cursor: isUnlocked ? 'pointer' : 'not-allowed',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {isFullyDone ? 'Review Level ➔' : isUnlocked ? 'Enter Level ➔' : '🔒 Locked'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── INTERACTIVE TASK ACTIVITY / QUESTIONS MODAL ───────────── */}
      <AnimatePresence>
        {activeTaskModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              zIndex: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              backdropFilter: 'blur(6px)'
            }}
            onClick={() => setActiveTaskModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{
                background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
                border: `2px solid ${activeTaskModal.level.color}`,
                borderRadius: '1.5rem',
                padding: '2rem',
                maxWidth: '620px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: `0 20px 60px ${activeTaskModal.level.color}44`,
                position: 'relative'
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                <div>
                  <div style={{ color: activeTaskModal.level.color, fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase' }}>
                    {activeTaskModal.level.title}
                  </div>
                  <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.25rem', margin: '0.25rem 0' }}>
                    {activeTaskModal.task.title}
                  </h3>
                  <div style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                    {activeTaskModal.task.desc}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', padding: '0.3rem 0.6rem', borderRadius: '0.5rem', fontWeight: '800', fontSize: '0.82rem' }}>
                    +{activeTaskModal.task.xp} XP
                  </span>
                  <button
                    onClick={() => setActiveTaskModal(null)}
                    style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Questions / Interactive Choices */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
                {(activeTaskModal.task.questions || []).map((qObj, qIdx) => (
                  <div
                    key={qIdx}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '1rem',
                      padding: '1.25rem'
                    }}
                  >
                    <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.85rem', display: 'flex', gap: '0.5rem' }}>
                      <span style={{ color: activeTaskModal.level.color }}>Q{qIdx + 1}.</span>
                      <span>{qObj.q}</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {qObj.options.map((opt, optIdx) => {
                        const isSelected = selectedAnswers[qIdx] === optIdx
                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelectAnswer(qIdx, optIdx)}
                            style={{
                              background: isSelected
                                ? `linear-gradient(135deg, ${activeTaskModal.level.color}33, rgba(37,99,235,0.2))`
                                : 'rgba(255,255,255,0.04)',
                              border: isSelected
                                ? `2px solid ${activeTaskModal.level.color}`
                                : '1px solid rgba(255,255,255,0.08)',
                              borderRadius: '0.75rem',
                              padding: '0.75rem 1rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              cursor: taskSubmitted ? 'default' : 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <div
                              style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                border: `2px solid ${isSelected ? activeTaskModal.level.color : '#64748b'}`,
                                background: isSelected ? activeTaskModal.level.color : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}
                            >
                              {isSelected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff' }} />}
                            </div>
                            <span style={{ color: isSelected ? '#ffffff' : '#cbd5e1', fontSize: '0.88rem', fontWeight: isSelected ? '700' : '500' }}>
                              {opt}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => setActiveTaskModal(null)}
                  style={{
                    flex: 1,
                    padding: '0.85rem',
                    borderRadius: '0.75rem',
                    background: 'rgba(255,255,255,0.08)',
                    color: 'white',
                    border: 'none',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmitTaskActivity}
                  disabled={taskSubmitted}
                  style={{
                    flex: 2,
                    padding: '0.85rem',
                    borderRadius: '0.75rem',
                    background: taskSubmitted
                      ? '#22c55e'
                      : `linear-gradient(135deg, ${activeTaskModal.level.color}, #10b981)`,
                    color: 'white',
                    border: 'none',
                    fontWeight: '900',
                    fontSize: '1rem',
                    cursor: taskSubmitted ? 'default' : 'pointer',
                    boxShadow: '0 4px 20px rgba(16,185,129,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {taskSubmitted ? '✅ Answers Verified & +XP Earned!' : 'Submit Answers & Earn XP ➔'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CONGRATULATIONS CELEBRATION MODAL ── */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              zIndex: 230,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
            onClick={() => setShowCelebration(null)}
          >
            <div style={{ position: 'absolute', left: '8%', top: '25%', fontSize: '4rem' }}>
              🎊 🌟 🎈
            </div>
            <div style={{ position: 'absolute', right: '8%', top: '25%', fontSize: '4rem' }}>
              🎈 🌟 🎊
            </div>

            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8 }}
              style={{
                background: 'linear-gradient(135deg, #1e1b4b, #0f172a)',
                border: '2px solid #22c55e',
                borderRadius: '2rem',
                padding: '2.5rem',
                maxWidth: '520px',
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 0 60px rgba(34,197,94,0.4)',
                position: 'relative',
                zIndex: 240
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>🎉</div>
              <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.8rem', margin: '0 0 0.5rem' }}>
                Congratulations! Level {showCelebration.id} Complete!
              </h2>
              <p style={{ color: '#4ade80', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1rem' }}>
                You mastered {showCelebration.title}!
              </p>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', padding: '1rem', marginBottom: '1.5rem', color: '#fbbf24', fontWeight: '800' }}>
                +{showCelebration.totalXP} XP Synced to Live Leaderboard & Profile ⚡
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => setShowCelebration(null)}
                  style={{
                    flex: 1,
                    padding: '0.85rem',
                    borderRadius: '0.75rem',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
                {showCelebration.id < 11 && (
                  <button
                    onClick={() => {
                      const next = CANDY_LEVELS.find(l => l.id === showCelebration.id + 1)
                      setShowCelebration(null)
                      if (next) {
                        setSelectedLevel(next)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    }}
                    style={{
                      flex: 2,
                      padding: '0.85rem',
                      borderRadius: '0.75rem',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      fontWeight: '900',
                      fontSize: '1rem',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Proceed to Level {showCelebration.id + 1} ➔
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
