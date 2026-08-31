import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const ADVANCED_COURSES_DATA = [
  {
    id: 'genai-llm',
    title: 'Generative AI & LLM Engineering Masterclass',
    badge: '🔥 Highest Industry Demand',
    level: 'Advanced',
    duration: '8 Weeks',
    modulesCount: 6,
    xpReward: 150,
    icon: '🤖',
    desc: 'Master Transformer Architectures, Fine-tuning (LoRA/QLoRA), Prompt Engineering, and building production LLM apps with LangChain & LlamaIndex.',
    modules: [
      'Module 1: Attention Mechanism & Transformer Deep Dive',
      'Module 2: Prompt Engineering, In-Context Learning & Structured Outputs',
      'Module 3: Retrieval-Augmented Generation (RAG) Architecture & Vector Embeddings',
      'Module 4: Fine-Tuning Open Source Models (Llama 3, Mistral) with PEFT / LoRA',
      'Module 5: LLM Evaluation, Guardrails & Hallucination Mitigation',
      'Module 6: Capstone Project — Production Multi-Tenant AI Assistant'
    ]
  },
  {
    id: 'ai-agents',
    title: 'Autonomous AI Agents & Multi-Agent Systems',
    badge: '⚡ Cutting-Edge Tech',
    level: 'Expert',
    duration: '6 Weeks',
    modulesCount: 5,
    xpReward: 140,
    icon: '🐝',
    desc: 'Build self-orchestrating AI agents with AutoGen, CrewAI, and LangGraph that execute complex software tasks, search the web, and execute code.',
    modules: [
      'Module 1: Agentic Architecture — ReAct Framework, Planning & Memory',
      'Module 2: Tool-Calling & Function Execution with Python Sandbox',
      'Module 3: Multi-Agent Collaboration Patterns (Hierarchical & Sequential)',
      'Module 4: Human-in-the-Loop Validation & Agent Failure Recovery',
      'Module 5: Capstone — Autonomous Market Research & Coding Multi-Agent System'
    ]
  },
  {
    id: 'rag-llmops',
    title: 'Enterprise RAG, Vector Databases & LLMOps',
    badge: '💼 Enterprise Standard',
    level: 'Advanced',
    duration: '6 Weeks',
    modulesCount: 5,
    xpReward: 130,
    icon: '📊',
    desc: 'Architect enterprise-grade semantic search, hybrid retrieval (BM25 + Dense Vectors), Pinecone/Milvus DBs, and Langfuse observability pipelines.',
    modules: [
      'Module 1: Chunking Strategies, Metadata Filtering & Embedding Models',
      'Module 2: Advanced Hybrid Search, Re-ranking (Cohere Rerank) & Query Expansion',
      'Module 3: Knowledge Graphs + Vector Hybrid Retrieval (GraphRAG)',
      'Module 4: Observability, Tracing & Cost Optimization with Langfuse/Arize',
      'Module 5: Production Deployment on AWS/GCP with FastEmbed & vLLM'
    ]
  },
  {
    id: 'quantum-computing',
    title: 'Quantum Computing & Qiskit Algorithms',
    badge: '⚛️ Future Tech',
    level: 'Expert',
    duration: '10 Weeks',
    modulesCount: 6,
    xpReward: 160,
    icon: '⚛️',
    desc: 'Quantum mechanics for computer scientists, Qubits, Superposition, Entanglement, Grover algorithm, and running quantum circuits on IBM Quantum.',
    modules: [
      'Module 1: Linear Algebra & Quantum Physics for Computer Scientists',
      'Module 2: Qubit Superposition, Bloch Sphere & Quantum Logic Gates',
      'Module 3: Quantum Entanglement & Bell State Experiments with Qiskit',
      'Module 4: Quantum Fourier Transform & Shor / Grover Search Algorithm',
      'Module 5: Variational Quantum Eigensolver (VQE) for Quantum Chemistry',
      'Module 6: Real Hardware Execution on IBM Quantum Cloud Systems'
    ]
  },
  {
    id: 'robotics-ai',
    title: 'Robotics AI, ROS 2 & Autonomous Navigation (SLAM)',
    badge: '🦾 Hardware + AI',
    level: 'Advanced',
    duration: '8 Weeks',
    modulesCount: 5,
    xpReward: 150,
    icon: '🦾',
    desc: 'Robot Operating System (ROS 2), LiDAR Point Clouds, Computer Vision for Robotics (YOLOv10), and SLAM Autonomous Pathfinding in Gazebo.',
    modules: [
      'Module 1: ROS 2 Architecture, Nodes, Topics & Actions in C++ / Python',
      'Module 2: 3D Simulation with Gazebo & URDF Robot Kinematics Modeling',
      'Module 3: Sensor Fusion (LiDAR, IMU, Depth Cameras) & Kalman Filtering',
      'Module 4: 2D/3D SLAM Mapping & Nav2 Autonomous Obstacle Avoidance',
      'Module 5: Vision-Language-Action (VLA) Models for Physical Robots'
    ]
  }
]

export default function AdvancedCourses() {
  const { user, updateUser } = useAuth()
  const [selectedCourse, setSelectedCourse] = useState(ADVANCED_COURSES_DATA[0])
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspilot_enrolled_courses')
      return saved ? JSON.parse(saved) : ['genai-llm']
    } catch {
      return ['genai-llm']
    }
  })
  const [completedModules, setCompletedModules] = useState({})

  const handleEnroll = (courseId) => {
    if (enrolledCourses.includes(courseId)) {
      toast('Already enrolled in this course!')
      return
    }
    const updated = [...enrolledCourses, courseId]
    setEnrolledCourses(updated)
    localStorage.setItem('campuspilot_enrolled_courses', JSON.stringify(updated))
    toast.success(`🎉 Enrolled in ${selectedCourse.title}! Happy learning.`)
  }

  const handleCompleteModule = (courseId, moduleIdx) => {
    const key = `${courseId}_${moduleIdx}`
    if (completedModules[key]) return

    setCompletedModules(prev => ({ ...prev, [key]: true }))
    if (user) {
      updateUser({ ...user, xp: (user?.xp || 0) + 25 })
    }
    toast.success('⭐ Module Completed! +25 XP Added!')
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* ── HEADER ─────────────────────────────────────────────────── */}
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
            <span style={{ fontSize: '2.5rem' }}>🚀</span>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
                Advanced Future-Tech Courses & Certifications
              </h1>
              <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
                Generative AI, Autonomous Agents, LLMOps, Quantum Computing, Robotics SLAM & Cloud Architecture
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── SPLIT VIEW (COURSE LIST + INTERACTIVE MODULE LEARNING) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {/* Left Side: Course Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {ADVANCED_COURSES_DATA.map(course => {
            const isSelected = selectedCourse.id === course.id
            const isEnrolled = enrolledCourses.includes(course.id)

            return (
              <div
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                style={{
                  background: isSelected ? 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(37,99,235,0.15))' : 'rgba(255,255,255,0.03)',
                  border: isSelected ? '2px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '1.25rem',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>{course.icon}</span>
                  <span style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', padding: '0.15rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
                    {course.badge}
                  </span>
                </div>

                <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem', margin: '0 0 0.35rem' }}>
                  {course.title}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: '0 0 0.6rem', lineHeight: 1.4 }}>
                  {course.desc.slice(0, 85)}...
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.5rem', fontSize: '0.75rem' }}>
                  <span style={{ color: '#4ade80', fontWeight: '700' }}>⭐ +{course.xpReward} XP</span>
                  <span style={{ color: isEnrolled ? '#60a5fa' : '#818cf8', fontWeight: '800' }}>
                    {isEnrolled ? '✓ Enrolled (Active)' : 'Enroll Now →'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Side: Selected Course Curriculum & Learning Progression */}
        <motion.div
          key={selectedCourse.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(139, 92, 246, 0.4)',
            borderRadius: '1.5rem',
            padding: '1.75rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
          }}
        >
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <span style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
                  {selectedCourse.level} LEVEL · {selectedCourse.duration}
                </span>
                <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.35rem', margin: '0.4rem 0 0.2rem' }}>
                  {selectedCourse.title}
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: 0 }}>
                  {selectedCourse.desc}
                </p>
              </div>

              {!enrolledCourses.includes(selectedCourse.id) ? (
                <button
                  onClick={() => handleEnroll(selectedCourse.id)}
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                    color: 'white',
                    padding: '0.6rem 1.25rem',
                    borderRadius: '0.65rem',
                    fontWeight: '800',
                    fontSize: '0.85rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(124,58,237,0.3)'
                  }}
                >
                  🚀 Enroll Free (+{selectedCourse.xpReward} XP)
                </button>
              ) : (
                <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '0.4rem 0.9rem', borderRadius: '0.6rem', fontWeight: '800', fontSize: '0.8rem' }}>
                  ✓ Enrolled in Course
                </span>
              )}
            </div>
          </div>

          {/* Modules Progression Checklist */}
          <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1rem' }}>
            📚 Complete Course Syllabus & Hands-On Labs ({selectedCourse.modules.length} Modules):
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {selectedCourse.modules.map((mod, idx) => {
              const isDone = !!completedModules[`${selectedCourse.id}_${idx}`]
              return (
                <div
                  key={idx}
                  style={{
                    background: isDone ? 'rgba(34, 197, 94, 0.08)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isDone ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: '0.85rem',
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <div>
                    <div style={{ color: isDone ? '#4ade80' : '#ffffff', fontWeight: '700', fontSize: '0.9rem' }}>
                      {mod}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.2rem' }}>
                      Includes video lectures, code repository, and hands-on lab environment.
                    </div>
                  </div>

                  <button
                    onClick={() => handleCompleteModule(selectedCourse.id, idx)}
                    style={{
                      background: isDone ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.08)',
                      color: isDone ? '#4ade80' : '#ffffff',
                      border: `1px solid ${isDone ? '#22c55e' : 'rgba(255,255,255,0.15)'}`,
                      padding: '0.4rem 0.85rem',
                      borderRadius: '0.5rem',
                      fontWeight: '700',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {isDone ? '✓ Completed (+25 XP)' : 'Mark Done'}
                  </button>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
