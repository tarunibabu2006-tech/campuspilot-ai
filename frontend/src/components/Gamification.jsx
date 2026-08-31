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
        tip: 'Check average salary packages (3.6 LPA to 28 LPA) to align your career goals.'
      },
      {
        id: '1_2',
        title: 'Complete Career Diagnostic Assessment',
        desc: 'Take the automated self-assessment to identify your technical aptitude and interests.',
        xp: 20,
        tip: 'Answers are mapped to real industry job roles.'
      },
      {
        id: '1_3',
        title: 'Set Target Role in Profile',
        desc: 'Lock in your target role (e.g., SDE-1, Data Analyst, Cloud Engineer) in your profile.',
        xp: 15,
        tip: 'Your target role customizes interview questions and job recommendations.'
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
        tip: 'Practice in Python or Java with clean coding conventions.'
      },
      {
        id: '2_2',
        title: 'Complete Arrays, Strings & HashMaps Milestone',
        desc: 'Solve 15 foundational coding problems on string manipulation and array operations.',
        xp: 35,
        tip: 'Focus on time complexity (O(N)) and space optimization.'
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
        tip: '90% of technical rounds have at least 2 SQL live query questions.'
      },
      {
        id: '3_2',
        title: 'Build REST APIs & Connect Frontend',
        desc: 'Develop CRUD endpoints with authentication and database persistence.',
        xp: 35,
        tip: 'Include JWT tokens and request validation.'
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
        tip: 'High-paying product companies test LLD in Round 2.'
      },
      {
        id: '4_2',
        title: 'Deploy Full-Stack Project with Cloud & CI/CD',
        desc: 'Containerize an application with Docker and deploy to cloud platforms.',
        xp: 40,
        tip: 'Showcase live URLs directly in your resume.'
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
        desc: 'Answer 30 questions covering Programming, SQL, DSA, and Web Tech.',
        xp: 40,
        tip: 'Aim for at least 70% accuracy within 30 minutes.'
      },
      {
        id: '5_2',
        title: 'Pass Assessment with >75% Score',
        desc: 'Earn your verified skill completion score and benchmark badge.',
        xp: 40,
        tip: 'Verified assessment scores boost your ATS profile score by 30%.'
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
        tip: 'Use Vedic math and cross-multiplication tricks to solve in <45s.'
      },
      {
        id: '6_2',
        title: 'Master Logical Reasoning & Puzzles',
        desc: 'Practice Seating Arrangements, Blood Relations, Coding-Decoding, and Series.',
        xp: 30,
        tip: 'Draw quick diagram representations to eliminate options rapidly.'
      },
      {
        id: '6_3',
        title: 'Master Verbal Ability & Reading Comprehension',
        desc: 'Revise Subject-Verb agreement, Sentence Correction, and Paragraph Jumbles.',
        xp: 30,
        tip: 'Focus on root words and eliminating grammatically flawed options.'
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
        tip: '30 questions in 30 minutes.'
      },
      {
        id: '7_2',
        title: 'Pass Level 2 Speed & Accuracy Test',
        desc: 'Solve intermediate problem sets with negative marking simulation.',
        xp: 35,
        tip: 'Avoid guesswork; skip questions that take >90 seconds.'
      },
      {
        id: '7_3',
        title: 'Pass Level 3 Advanced Placement Test',
        desc: 'Clear full-length company-level aptitude simulation.',
        xp: 35,
        tip: 'Clearing this level guarantees high qualification odds in campus rounds.'
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
        tip: 'Includes Numerical Ability, Verbal, and Hands-on Coding.'
      },
      {
        id: '8_2',
        title: 'Complete Zoho & Product Giants Mock Test',
        desc: 'Solve output-prediction, C/C++ recursion tracing, and algorithm rounds.',
        xp: 35,
        tip: 'Focus on pointers, recursion, and nested loops.'
      },
      {
        id: '8_3',
        title: 'Complete Core Engineering / PSU Mock Test',
        desc: 'Attempt technical domain exam (GATE / Technical Trainee pattern).',
        xp: 35,
        tip: 'Includes domain-specific technical MCQs.'
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
        tip: 'Use the STAR method (Situation, Task, Action, Result) for behavioral answers.'
      },
      {
        id: '9_2',
        title: 'Complete HR & Managerial Behavioral Round',
        desc: 'Practice "Tell me about yourself", conflict resolution, and career vision questions.',
        xp: 50,
        tip: 'Keep your introduction under 90 seconds and highlight quantifiable achievements.'
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
        tip: 'Speak at a calm, steady pace of 130-150 words per minute.'
      },
      {
        id: '10_2',
        title: 'Complete Voice HR & Spoken English Assessment',
        desc: 'Evaluate fluency, tone, vocabulary, and response structure.',
        xp: 40,
        tip: 'Avoid filler words (um, uh, like) by pausing before answering.'
      },
      {
        id: '10_3',
        title: 'Achieve >80% AI Communication Rating',
        desc: 'Score distinction in AI vocal clarity, confidence, and technical correctness.',
        xp: 40,
        tip: 'Top performers receive verified interview-ready recommendation badges.'
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
        tip: 'Use clean formatting without tables or multi-column layouts.'
      },
      {
        id: '11_2',
        title: 'Apply to 5 Verified Matching Openings',
        desc: 'Submit applications through the Verified Placement Portal with automated reference IDs.',
        xp: 50,
        tip: 'Target jobs with ≥70% calculated real match.'
      },
      {
        id: '11_3',
        title: 'Attend Official Company Interviews',
        desc: 'Participate in written tests and online technical/HR interview rounds.',
        xp: 60,
        tip: 'Stay confident, review past company interview archives, and revise cheat sheets.'
      },
      {
        id: '11_4',
        title: 'Secure Dream Placement Offer 🎉',
        desc: 'Receive official job offer letter and graduate to CampusPilot AI Placement Hall of Fame!',
        xp: 100,
        tip: 'Celebrate your achievement! Your placement journey is complete.'
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

  // Toggle single task completion
  const handleTaskToggle = (lvl, task) => {
    const isDone = !!completedTasks[task.id]
    const updated = { ...completedTasks, [task.id]: !isDone }
    setCompletedTasks(updated)
    localStorage.setItem('campuspilot_completed_gamification_tasks', JSON.stringify(updated))

    if (!isDone) {
      const addedXP = task.xp
      if (user) {
        updateUser({ ...user, xp: (user?.xp || 0) + addedXP })
      }
      toast.success(`⭐ +${addedXP} XP Earned for "${task.title}"!`)

      // Check if all level tasks are done
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
                Enter each level, complete real tasks, earn XP, and unlock your dream campus placement step-by-step
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

            {/* ── STEP-BY-STEP TASKS LIST (INTERACTIVE) ───────────── */}
            <div>
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.15rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>📋</span> Required Level Tasks & Milestones
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {selectedLevel.tasks.map((task, idx) => {
                  const isTaskDone = !!completedTasks[task.id]

                  return (
                    <motion.div
                      key={task.id}
                      whileHover={{ scale: 1.01 }}
                      style={{
                        background: isTaskDone
                          ? 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(15,23,42,0.6))'
                          : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${isTaskDone ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: '1rem',
                        padding: '1.1rem 1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1, minWidth: '240px' }}>
                        <button
                          onClick={() => handleTaskToggle(selectedLevel, task)}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: isTaskDone ? '#22c55e' : 'rgba(255,255,255,0.08)',
                            border: `2px solid ${isTaskDone ? '#22c55e' : '#64748b'}`,
                            color: 'white',
                            fontWeight: '900',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            flexShrink: 0
                          }}
                        >
                          {isTaskDone ? '✓' : idx + 1}
                        </button>

                        <div>
                          <div style={{ color: isTaskDone ? '#4ade80' : 'white', fontWeight: '800', fontSize: '0.98rem' }}>
                            {task.title}
                          </div>
                          <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: '0.2rem' }}>
                            {task.desc}
                          </div>
                          {task.tip && (
                            <div style={{ color: '#fbbf24', fontSize: '0.75rem', marginTop: '0.35rem' }}>
                              💡 <em>{task.tip}</em>
                            </div>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.85rem' }}>
                          +{task.xp} XP
                        </span>

                        <button
                          onClick={() => handleTaskToggle(selectedLevel, task)}
                          style={{
                            background: isTaskDone ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.08)',
                            color: isTaskDone ? '#4ade80' : '#cbd5e1',
                            border: `1px solid ${isTaskDone ? 'rgba(34,197,94,0.5)' : 'rgba(255,255,255,0.15)'}`,
                            borderRadius: '0.6rem',
                            padding: '0.45rem 0.9rem',
                            fontWeight: '700',
                            fontSize: '0.78rem',
                            cursor: 'pointer'
                          }}
                        >
                          {isTaskDone ? 'Completed ✅' : 'Mark as Done ○'}
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
                🗺️ Click on any unlocked level to enter its workspace, complete tasks, and advance:
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
              zIndex: 200,
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
                zIndex: 210
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
