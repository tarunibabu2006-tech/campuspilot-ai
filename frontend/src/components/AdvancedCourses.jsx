import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const ADVANCED_COURSES = [
  {
    id: 'genai-llm',
    category: 'Artificial Intelligence & Data Science',
    title: 'Generative AI & LLM Systems Engineering',
    level: 'Advanced / Masterclass',
    eligibility: 'B.E / B.Tech / B.Sc in CS, IT, ECE or equivalent with Python knowledge',
    prerequisites: 'Python, Linear Algebra, PyTorch / TensorFlow Basics',
    skills: 'LLM Fine-Tuning (LoRA/QLoRA), RAG Pipelines, Vector Databases (Pinecone/Chroma), LangChain, LlamaIndex',
    tools: 'PyTorch, HuggingFace Transformers, LangChain, vLLM, DeepSpeed, Ollama',
    duration: '12 Weeks (Hands-On Lab Intensive)',
    certification: 'Certified Generative AI Systems Architect (AGY-Cert)',
    careerRoles: 'LLM Engineer, AI Research Scientist, Generative AI Architect, NLP Engineer',
    industries: 'Enterprise SaaS, Fintech, Healthcare AI, Automated Customer Intelligence',
    jobs: '24,000+ Active Openings (₹14 - 35 LPA)',
    internships: 'AI Research Labs, DeepTech Startups, Global R&D Centers',
    govExams: 'DRDO Scientist B (AI Division), CDAC Senior Project Engineer, NIC Data Scientist',
    provider: 'CampusPilot AI DeepTech Academy',
    fee: '100% Free for University Students',
    mode: 'Interactive Online Lab + Video Masterclasses',
    officialLink: 'https://huggingface.co/learn'
  },
  {
    id: 'autonomous-agents',
    category: 'Artificial Intelligence & Robotics',
    title: 'Autonomous AI Agents & Multi-Agent Swarms',
    level: 'Advanced Masterclass',
    eligibility: 'Computer Science, Electrical, Data Science Graduates',
    prerequisites: 'Object Oriented Programming, REST APIs, Asynchronous Python',
    skills: 'Agentic Workflows, Tool Calling, Planning Algorithms, Memory Management, Swarm Intelligence',
    tools: 'CrewAI, AutoGen, LangGraph, OpenAI Assistant API, BabyAGI',
    duration: '8 Weeks',
    certification: 'Autonomous Systems Developer Certificate',
    careerRoles: 'Agentic Workflow Engineer, AI Automation Specialist, Solutions Architect',
    industries: 'Robotic Process Automation, Trading Systems, Autonomous Customer Service',
    jobs: '12,500+ Openings (₹12 - 28 LPA)',
    internships: 'Enterprise Automation Teams, AI Agents Incubators',
    govExams: 'ISRO Software Scientist, DRDO Robotics Division',
    provider: 'CampusPilot AI Future Tech Labs',
    fee: 'Free Academic Access',
    mode: 'Self-Paced with Code Review',
    officialLink: 'https://github.com/crewAIInc/crewAI'
  },
  {
    id: 'quantum-computing',
    category: 'Quantum Physics & Computer Science',
    title: 'Quantum Computing & Qiskit Algorithms',
    level: 'Cutting-Edge / Research',
    eligibility: 'Graduates in Physics, Mathematics, CS, EEE, ECE',
    prerequisites: 'Complex Numbers, Matrix Multiplication, Quantum Mechanics Basics',
    skills: 'Qubits, Superposition, Quantum Entanglement, Grover’s Search, Shor’s Factoring, VQE',
    tools: 'IBM Qiskit, Cirq, Pennylane, IBM Quantum Experience Cloud',
    duration: '10 Weeks',
    certification: 'IBM Qiskit Certified Quantum Developer',
    careerRoles: 'Quantum Software Engineer, Quantum Research Scientist, Cryptographer',
    industries: 'Quantum Cryptography, Pharmaceutical Drug Discovery, Financial Portfolio Optimization',
    jobs: '4,800+ Global & Indian Research Roles (₹18 - 45 LPA)',
    internships: 'TIFR, IISc Quantum Labs, IBM Quantum Network, CDAC Quantum Center',
    govExams: 'National Quantum Mission (DST India), BARC Scientific Officer, DRDO',
    provider: 'IBM Quantum & CampusPilot AI',
    fee: '100% Open Access',
    mode: 'Cloud Quantum Simulator Labs',
    officialLink: 'https://www.ibm.com/quantum/qiskit'
  },
  {
    id: 'robotics-slam',
    category: 'Robotics & Mechatronics',
    title: 'Autonomous Mobile Robotics (ROS 2, SLAM & Computer Vision)',
    level: 'Advanced Engineering',
    eligibility: 'B.Tech / M.Tech in Mechanical, ECE, EEE, Mechatronics, Robotics, CS',
    prerequisites: 'C++, Python, Coordinate Geometry, Linux Terminal',
    skills: 'LiDAR Point Clouds, Visual SLAM, Kalman Filtering, Sensor Fusion, Motion Planning, ROS 2 Nav2',
    tools: 'ROS 2 Humble, Gazebo, RViz, OpenCV, Cartographer SLAM, Nav2',
    duration: '14 Weeks',
    certification: 'Certified ROS 2 Autonomous Robotics Engineer',
    careerRoles: 'Robotics Software Engineer, Autonomous Vehicle Engineer, Perception Specialist',
    industries: 'Autonomous Vehicles (EV), Warehouse Automation, Defense Drones, Surgical Robotics',
    jobs: '9,200+ Openings (₹10 - 25 LPA)',
    internships: 'Drone Tech Companies, Automotive OEMs, Autonomous Warehouse Labs',
    govExams: 'ISRO Space Robotics, DRDO CAIR (Center for AI & Robotics), Indian Navy Tech',
    provider: 'Open Robotics & CampusPilot AI',
    fee: 'Free for Engineering Students',
    mode: 'Physics Simulator & Hardware In The Loop',
    officialLink: 'https://docs.ros.org/en/humble/'
  },
  {
    id: 'cloud-devops-k8s',
    category: 'Cloud Engineering & Infrastructure',
    title: 'Cloud Native DevOps, Kubernetes & GitOps Architecture',
    level: 'Professional Specialist',
    eligibility: 'Any Engineering / Science Degree graduate',
    prerequisites: 'Linux commands, Docker containerization, Networking (TCP/IP, DNS)',
    skills: 'Kubernetes Cluster Architecture, Helm, Terraform (IaC), CI/CD Pipelines, Prometheus, Grafana, ArgoCD',
    tools: 'Kubernetes, Terraform, GitHub Actions, AWS EKS, Docker, ArgoCD, Grafana',
    duration: '10 Weeks',
    certification: 'Certified Kubernetes Administrator (CKA) / AWS DevOps Pro',
    careerRoles: 'DevOps Engineer, Cloud Architect, Site Reliability Engineer (SRE), Platform Engineer',
    industries: 'Banking, E-Commerce, Global IT Consulting, FinTech',
    jobs: '35,000+ Active Openings (₹9 - 26 LPA)',
    internships: 'Cloud Consulting Firms, Tier-1 MNCs, High-Growth Startups',
    govExams: 'NIC Scientist B, NPCIL Executive Engineer, Bank IT Officer (Scale 1)',
    provider: 'Cloud Native Computing Foundation (CNCF)',
    fee: 'Free Academic Courseware',
    mode: 'Live Cloud Sandboxes',
    officialLink: 'https://kubernetes.io/docs/tutorials/'
  }
]

export default function AdvancedCourses() {
  const [selectedCourse, setSelectedCourse] = useState(ADVANCED_COURSES[0])
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = ADVANCED_COURSES.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.skills.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
                Complete Course Architecture Across Generative AI, Autonomous Agents, Quantum Computing, Robotics SLAM & Cloud Native
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search advanced courses & technologies (e.g. Generative AI, ROS 2, Quantum, Kubernetes)..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '0.75rem',
          padding: '0.75rem 1rem',
          color: 'white',
          fontSize: '0.9rem',
          outline: 'none'
        }}
      />

      {/* Course Selector Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        {filtered.map(c => {
          const isSelected = selectedCourse.id === c.id
          return (
            <div
              key={c.id}
              onClick={() => setSelectedCourse(c)}
              style={{
                background: isSelected ? 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(37,99,235,0.2))' : 'rgba(255,255,255,0.03)',
                border: isSelected ? '2px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1rem',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', padding: '0.2rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
                {c.category}
              </span>
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.05rem', margin: '0.5rem 0 0.25rem' }}>
                {c.title}
              </h3>
              <div style={{ color: '#fbbf24', fontSize: '0.78rem', fontWeight: '700' }}>
                ⏳ {c.duration} · {c.level}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── COURSE BLUEPRINT (COMPLETE SPECIFICATION) ─────────────── */}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.72rem', fontWeight: '800' }}>
              {selectedCourse.category}
            </span>
            <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.5rem', margin: '0.4rem 0 0.2rem' }}>
              {selectedCourse.title}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
              Provided by: <strong style={{ color: '#ffffff' }}>{selectedCourse.provider}</strong> · Fee: <strong style={{ color: '#4ade80' }}>{selectedCourse.fee}</strong>
            </p>
          </div>

          <a
            href={selectedCourse.officialLink}
            target="_blank"
            rel="noreferrer"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              color: 'white',
              padding: '0.65rem 1.3rem',
              borderRadius: '0.65rem',
              fontWeight: '900',
              fontSize: '0.88rem',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(124,58,237,0.4)'
            }}
          >
            🚀 Launch Course & Labs ➔
          </a>
        </div>

        {/* Complete Parameter Matrix */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {[
            { label: '🎓 Eligibility & Background', val: selectedCourse.eligibility, icon: '📜' },
            { label: '🔑 Prerequisites', val: selectedCourse.prerequisites, icon: '🧩' },
            { label: '💡 Core Skills Covered', val: selectedCourse.skills, icon: '⚡' },
            { label: '🛠️ Industry Tools & Frameworks', val: selectedCourse.tools, icon: '🧰' },
            { label: '📜 Professional Certification', val: selectedCourse.certification, icon: '🏆' },
            { label: '💼 Target Career Roles', val: selectedCourse.careerRoles, icon: '👔' },
            { label: '🏭 High-Growth Industries', val: selectedCourse.industries, icon: '🏢' },
            { label: '💰 Placement Jobs & Salary Scope', val: selectedCourse.jobs, icon: '📈' },
            { label: '🏛️ Applicable Government Careers', val: selectedCourse.govExams, icon: '🇮🇳' },
            { label: '💻 Delivery Mode & Learning Type', val: selectedCourse.mode, icon: '🖥️' }
          ].map((item, idx) => (
            <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.85rem', padding: '1rem' }}>
              <div style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.82rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>{item.icon}</span> {item.label}
              </div>
              <p style={{ color: '#e2e8f0', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                {item.val}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
