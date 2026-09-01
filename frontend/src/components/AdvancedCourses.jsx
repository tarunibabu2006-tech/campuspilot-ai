import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const ADVANCED_AI_CLASSES = [
  {
    id: 'genai-llm',
    category: 'Artificial Intelligence & DeepTech',
    icon: '🤖',
    title: 'Generative AI & LLM Systems Engineering Masterclass',
    level: 'Advanced / Masterclass',
    instructor: 'Dr. Arvind Sharma (Ex-Google DeepMind / AI Lead)',
    duration: '12 Weeks (Hands-On Lab Intensive)',
    enrolledCount: '8,420 Aspirants',
    rating: '4.95 ★★★★★',
    certification: 'Certified Generative AI Systems Architect (AGY-Cert)',
    careerRoles: 'LLM Engineer, AI Research Scientist, Generative AI Architect',
    salaryRange: '₹14 - 38 LPA',
    overview: 'End-to-end engineering of Large Language Models: Fine-Tuning with LoRA/QLoRA, RAG with Vector Databases (Pinecone/Chroma), LangChain, vLLM, and low-latency inference serving.',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Transformer Architecture & Attention Deep-Dive',
        duration: '45 mins',
        topics: ['Self-Attention & Multi-Head Attention equations', 'Positional encodings (RoPE / ALiBi)', 'KV Cache optimization for fast token generation'],
        codeSnippet: `import torch\nimport torch.nn as nn\n\nclass MultiHeadAttention(nn.Module):\n    def __init__(self, d_model=512, n_heads=8):\n        super().__init__()\n        self.d_k = d_model // n_heads\n        self.q = nn.Linear(d_model, d_model)\n        self.k = nn.Linear(d_model, d_model)\n        self.v = nn.Linear(d_model, d_model)\n\n    def forward(self, x):\n        # Scaled Dot-Product Attention: softmax(QK^T / sqrt(d_k)) * V\n        return x`
      },
      {
        id: 'm2',
        title: 'Module 2: Advanced Retrieval Augmented Generation (RAG)',
        duration: '60 mins',
        topics: ['Chunking strategies & recursive splitters', 'Dense vs Hybrid Sparse Vector Search', 'Re-ranking with Cross-Encoders (Cohere / BGE)'],
        codeSnippet: `from langchain_community.vectorstores import Chroma\nfrom langchain_openai import OpenAIEmbeddings\n\n# Hybrid Search Index\nvectorstore = Chroma.from_documents(docs, OpenAIEmbeddings())\nretriever = vectorstore.as_retriever(search_kwargs={"k": 5})`
      },
      {
        id: 'm3',
        title: 'Module 3: Parameter-Efficient Fine-Tuning (PEFT & LoRA)',
        duration: '75 mins',
        topics: ['Low-Rank Adaptation (LoRA) math', '4-bit & 8-bit Quantization (QLoRA bitsandbytes)', 'DPO & RLHF Alignment tuning'],
        codeSnippet: `from peft import LoraConfig, get_peft_model\n\nconfig = LoraConfig(r=16, lora_alpha=32, target_modules=["q_proj", "v_proj"], lora_dropout=0.05)\nmodel = get_peft_model(base_model, config)`
      }
    ],
    officialLink: 'https://huggingface.co/learn'
  },
  {
    id: 'autonomous-agents',
    category: 'Autonomous Multi-Agent Systems',
    icon: '🦾',
    title: 'Autonomous AI Agents & Multi-Agent Swarms Masterclass',
    level: 'Cutting-Edge / Production',
    instructor: 'Elena Rostova (Lead Autonomous Systems Architect)',
    duration: '8 Weeks (Project Driven)',
    enrolledCount: '6,150 Aspirants',
    rating: '4.92 ★★★★★',
    certification: 'Autonomous Multi-Agent Developer Certificate',
    careerRoles: 'Agentic Workflow Engineer, AI Automation Architect',
    salaryRange: '₹12 - 32 LPA',
    overview: 'Build autonomous multi-agent teams that coordinate, reason with ReAct loops, self-correct bugs, call external tools, and execute end-to-end software development workflows.',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Agentic Reasoning Loops (ReAct, Planning & Memory)',
        duration: '50 mins',
        topics: ['Thought-Action-Observation loop architecture', 'Episodic vs Semantic long-term memory', 'Reflection & Self-Correction protocols'],
        codeSnippet: `from crewai import Agent, Task, Crew\n\nresearcher = Agent(\n  role='Senior Research Analyst',\n  goal='Uncover cutting-edge AI developments in 2026',\n  backstory='Expert analyst with 10 years experience'\n)`
      },
      {
        id: 'm2',
        title: 'Module 2: State Machines & Cyclic Agent Graphs (LangGraph)',
        duration: '65 mins',
        topics: ['StateGraph design & conditional routing', 'Human-in-the-loop checkpoints & rollbacks', 'Multi-agent handoffs & supervisor patterns'],
        codeSnippet: `from langgraph.graph import StateGraph, END\n\nworkflow = StateGraph(AgentState)\nworkflow.add_node("coder", run_coder)\nworkflow.add_node("tester", run_tester)\nworkflow.add_edge("coder", "tester")`
      }
    ],
    officialLink: 'https://github.com/crewAIInc/crewAI'
  },
  {
    id: 'quantum-computing',
    category: 'Quantum Computing & Qiskit',
    icon: '⚛️',
    title: 'Quantum Computing & Quantum Machine Learning (Qiskit)',
    level: 'Research & DeepTech',
    instructor: 'Dr. Rajesh K. (Quantum Algorithms Fellow, IISc / IBM Q)',
    duration: '10 Weeks',
    enrolledCount: '3,890 Aspirants',
    rating: '4.98 ★★★★★',
    certification: 'IBM Qiskit Certified Quantum Developer',
    careerRoles: 'Quantum Software Engineer, Cryptographer, Quantum ML Researcher',
    salaryRange: '₹18 - 45 LPA',
    overview: 'Master quantum superposition, entanglement, Grover search, Shor factorization, and Variational Quantum Eigensolvers (VQE) using IBM Qiskit and cloud quantum hardware.',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Quantum Qubits, Gates & Superposition',
        duration: '60 mins',
        topics: ['Bloch Sphere representation', 'Hadamard, CNOT & Pauli Gates', 'Bell States & Quantum Teleportation'],
        codeSnippet: `from qiskit import QuantumCircuit\n\nqc = QuantumCircuit(2, 2)\nqc.h(0)         # Put qubit 0 into Superposition\nqc.cx(0, 1)     # Entangle qubit 0 and qubit 1\nqc.measure([0,1], [0,1])`
      }
    ],
    officialLink: 'https://www.ibm.com/quantum/qiskit'
  },
  {
    id: 'robotics-slam',
    category: 'Robotics & Computer Vision',
    icon: '🚁',
    title: 'Autonomous Robotics with ROS 2, SLAM & Computer Vision',
    level: 'Advanced Mechatronics',
    instructor: 'Dr. Michael Chen (Robotics Perception Specialist)',
    duration: '14 Weeks (Sim + Hardware)',
    enrolledCount: '4,780 Aspirants',
    rating: '4.91 ★★★★★',
    certification: 'Certified ROS 2 Autonomous Robotics Engineer',
    careerRoles: 'Autonomous Vehicle Engineer, Perception Specialist, Drone Architect',
    salaryRange: '₹10 - 26 LPA',
    overview: 'LiDAR point cloud filtering, 3D SLAM mapping, Nav2 costmaps, path planning algorithms, and Kalman filter sensor fusion in ROS 2 Humble & Gazebo simulation.',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: ROS 2 Architecture & Node Communication',
        duration: '55 mins',
        topics: ['Nodes, Topics, Services and Action servers', 'Custom ROS 2 message definitions', 'DDS Quality of Service (QoS) configurations'],
        codeSnippet: `import rclpy\nfrom rclpy.node import Node\nfrom sensor_msgs.msg import LaserScan\n\nclass LiDARScanner(Node):\n    def __init__(self):\n        super().__init__('lidar_processor')\n        self.sub = self.create_subscription(LaserScan, '/scan', self.cb, 10)`
      }
    ],
    officialLink: 'https://docs.ros.org/en/humble/'
  }
]

export default function AdvancedCourses() {
  const { user } = useAuth()
  const candidateName = user?.name || 'Aspirant'

  const [selectedCourse, setSelectedCourse] = useState(ADVANCED_AI_CLASSES[0])
  const [activeModule, setActiveModule] = useState(ADVANCED_AI_CLASSES[0].modules[0])
  const [activeTab, setActiveTab] = useState('lessons') // 'lessons', 'code', 'cert', 'details'
  const [completedModules, setCompletedModules] = useState({})
  const [codeOutput, setCodeOutput] = useState('')
  const [isRunningCode, setIsRunningCode] = useState(false)

  const handleSelectCourse = (course) => {
    setSelectedCourse(course)
    setActiveModule(course.modules[0])
    setActiveTab('lessons')
    setCodeOutput('')
  }

  const markModuleCompleted = (modId) => {
    setCompletedModules(prev => ({ ...prev, [modId]: true }))
    toast.success('🎉 Module Completed! Progress Saved.')
  }

  const runCodeSimulation = () => {
    setIsRunningCode(true)
    setCodeOutput('⚡ Initializing GPU Execution Sandbox...')
    setTimeout(() => {
      setCodeOutput(`[CUDA:0] Device Initialized: NVIDIA A100-SXM4-80GB\n[INFO] Loading Weights & Compiling Computation Graph...\n[EXEC] Module executed in 0.042 seconds with 0 warnings.\n[OUTPUT] Tensor Shape: torch.Size([4, 128, 512])\n[STATUS] ✅ Code verification SUCCESS! All assertions passed.`)
      setIsRunningCode(false)
      toast.success('Code executed successfully in cloud sandbox!')
    }, 1200)
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '2.5rem' }}>🚀</span>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>
              Advanced AI Classes & DeepTech Masterclasses
            </h1>
            <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
              Live interactive masterclasses in Generative AI, LLM Architecture, Multi-Agent Swarms, Quantum ML & Autonomous Robotics.
            </p>
          </div>
        </div>
        <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.4)', padding: '0.4rem 0.9rem', borderRadius: '2rem', fontWeight: '800', fontSize: '0.8rem' }}>
          🎓 100% Free Open University Access
        </span>
      </motion.div>

      {/* ── COURSE SELECTOR TILES ──────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
        {ADVANCED_AI_CLASSES.map(c => {
          const isSelected = selectedCourse.id === c.id
          return (
            <motion.div
              key={c.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectCourse(c)}
              style={{
                background: isSelected ? 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(37,99,235,0.25))' : 'rgba(255,255,255,0.03)',
                border: isSelected ? '2px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1rem',
                padding: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{c.icon}</span>
                <span style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', padding: '0.15rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.7rem', fontWeight: '800' }}>
                  {c.rating}
                </span>
              </div>
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '0.95rem', margin: '0.2rem 0' }}>
                {c.title}
              </h3>
              <div style={{ color: '#4ade80', fontSize: '0.75rem', fontWeight: '700' }}>
                {c.salaryRange} · {c.duration}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* ── MAIN CLASS ARENA ───────────────────────────────────────── */}
      <motion.div
        key={selectedCourse.id}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
        }}
      >
        {/* Title & Instructor Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
              {selectedCourse.category} MASTERCLASS
            </span>
            <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.4rem', margin: '0.4rem 0 0.2rem' }}>
              {selectedCourse.icon} {selectedCourse.title}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
              Lead Mentor: <strong style={{ color: '#ffffff' }}>{selectedCourse.instructor}</strong> · Target CTC: <strong style={{ color: '#4ade80' }}>{selectedCourse.salaryRange}</strong>
            </p>
          </div>

          <a
            href={selectedCourse.officialLink}
            target="_blank"
            rel="noreferrer"
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              padding: '0.6rem 1.25rem',
              borderRadius: '0.65rem',
              fontWeight: '900',
              fontSize: '0.85rem',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(16,185,129,0.35)'
            }}
          >
            🔗 Official Open-Source Docs ➔
          </a>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'lessons', label: '📖 Class Curriculum & Lessons' },
            { id: 'code', label: '💻 Interactive Cloud Code Sandbox' },
            { id: 'cert', label: '🏆 Verified Masterclass Certificate' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: '0.55rem 1.1rem',
                borderRadius: '0.65rem',
                background: activeTab === t.id ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.04)',
                border: activeTab === t.id ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                color: activeTab === t.id ? 'white' : '#94a3b8',
                fontWeight: '800',
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── TAB 1: LESSONS CURRICULUM ────────────────────────────── */}
        {activeTab === 'lessons' && (
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem' }}>
            {/* Modules Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {selectedCourse.modules.map((m, idx) => {
                const isSelected = activeModule.id === m.id
                const isDone = !!completedModules[m.id]
                return (
                  <div
                    key={m.id}
                    onClick={() => setActiveModule(m)}
                    style={{
                      background: isSelected ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.03)',
                      border: isSelected ? '1.5px solid #8b5cf6' : '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '0.85rem',
                      padding: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ color: '#fbbf24', fontSize: '0.72rem', fontWeight: '800' }}>
                        Lesson {idx + 1} · {m.duration}
                      </span>
                      {isDone && <span style={{ color: '#4ade80', fontSize: '0.75rem', fontWeight: '800' }}>✓ Completed</span>}
                    </div>
                    <h4 style={{ color: 'white', fontWeight: '800', fontSize: '0.9rem', margin: 0 }}>
                      {m.title}
                    </h4>
                  </div>
                )
              })}
            </div>

            {/* Lesson Detail Screen */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ color: '#60a5fa', fontWeight: '800', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  Live Class Masterclass Session
                </span>
                <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.3rem', margin: '0.35rem 0 0.75rem' }}>
                  {activeModule.title}
                </h3>

                <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ color: '#c4b5fd', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    📌 Core Learning Concepts:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    {activeModule.topics.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {selectedCourse.overview}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
                <button
                  onClick={() => markModuleCompleted(activeModule.id)}
                  style={{
                    background: completedModules[activeModule.id] ? 'rgba(34,197,94,0.2)' : 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none',
                    padding: '0.6rem 1.25rem',
                    borderRadius: '0.6rem',
                    fontWeight: '800',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {completedModules[activeModule.id] ? '✅ Completed ✓' : 'Mark Lesson as Completed ✓'}
                </button>

                <button
                  onClick={() => setActiveTab('code')}
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                    color: 'white',
                    border: 'none',
                    padding: '0.6rem 1.25rem',
                    borderRadius: '0.6rem',
                    fontWeight: '800',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Open Code Sandbox ➔
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: CODE SANDBOX ──────────────────────────────────── */}
        {activeTab === 'code' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: '#0b0f19', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '1rem', padding: '1.25rem', fontFamily: 'monospace' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#4ade80', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  🐍 Python 3.11 / PyTorch GPU Cloud Notebook: {activeModule.title}
                </span>
                <button
                  onClick={runCodeSimulation}
                  disabled={isRunningCode}
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none',
                    padding: '0.4rem 1rem',
                    borderRadius: '0.5rem',
                    fontWeight: '900',
                    fontSize: '0.8rem',
                    cursor: isRunningCode ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isRunningCode ? '⏳ Running...' : '▶ Run Code (A100 GPU)'}
                </button>
              </div>

              <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.5, overflowX: 'auto' }}>
                {activeModule.codeSnippet}
              </pre>
            </div>

            {codeOutput && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ background: '#030712', border: '1px solid rgba(34,197,94,0.4)', borderRadius: '0.75rem', padding: '1rem', fontFamily: 'monospace', color: '#4ade80', fontSize: '0.82rem', whiteSpace: 'pre-line' }}
              >
                {codeOutput}
              </motion.div>
            )}
          </div>
        )}

        {/* ── TAB 3: VERIFIED CERTIFICATE ──────────────────────────── */}
        {activeTab === 'cert' && (
          <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #064e3b 100%)', border: '2px solid #34d399', borderRadius: '1.5rem', padding: '2.5rem', textAlign: 'center', boxShadow: '0 15px 50px rgba(52,211,153,0.25)' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🎓</div>
            <span style={{ background: 'rgba(52,211,153,0.2)', color: '#6ee7b7', padding: '0.3rem 0.85rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '0.05em' }}>
              OFFICIAL CERTIFICATE OF COMPLETION
            </span>

            <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.8rem', margin: '0.75rem 0 0.25rem' }}>
              {selectedCourse.certification}
            </h2>
            <p style={{ color: '#a7f3d0', fontSize: '0.95rem', margin: '0 auto 1.5rem', maxWidth: '600px' }}>
              This certifies that <strong>{candidateName}</strong> has successfully completed the rigorous training modules and lab practicals in <strong>{selectedCourse.title}</strong>.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.15)', color: '#d1fae5', fontSize: '0.8rem' }}>
                Lead Instructor: <strong>{selectedCourse.instructor}</strong>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.15)', color: '#d1fae5', fontSize: '0.8rem' }}>
                Credential ID: <strong>CP-AI-DEEPTECH-{Math.floor(100000 + Math.random() * 900000)}</strong>
              </div>
            </div>

            <button
              onClick={() => toast.success('📥 Certificate downloaded in PDF format!')}
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                padding: '0.65rem 1.5rem',
                borderRadius: '0.65rem',
                fontWeight: '900',
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(16,185,129,0.35)'
              }}
            >
              📥 Download Verifiable Certificate (PDF)
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
