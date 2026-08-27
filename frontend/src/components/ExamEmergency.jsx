import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const allSubjects = {
  'Engineering': [
    'Data Structures', 'Algorithms', 'Operating Systems', 'DBMS',
    'Computer Networks', 'Software Engineering', 'Web Development',
    'Machine Learning', 'Artificial Intelligence', 'Cybersecurity',
    'Cloud Computing', 'Big Data', 'Blockchain', 'IoT', 'Embedded Systems',
    'Compiler Design', 'Digital Electronics', 'Computer Architecture'
  ],
  'Arts': [
    'History', 'Geography', 'Political Science', 'Sociology',
    'Psychology', 'Philosophy', 'Economics', 'English Literature',
    'Fine Arts', 'Music', 'Theatre', 'Journalism', 'Anthropology'
  ],
  'Science': [
    'Physics', 'Chemistry', 'Biology', 'Mathematics',
    'Statistics', 'Environmental Science', 'Biotechnology',
    'Genetics', 'Microbiology', 'Biochemistry'
  ],
  'Commerce': [
    'Accounting', 'Finance', 'Marketing', 'Economics',
    'Business Law', 'Taxation', 'Auditing', 'Cost Accounting',
    'Banking', 'Investment Analysis'
  ],
  'Management': [
    'HR Management', 'Organizational Behavior', 'Strategic Management',
    'Operations Management', 'Financial Management', 'Marketing Management',
    'Supply Chain', 'Project Management', 'Business Analytics'
  ],
  'Medical': [
    'Anatomy', 'Physiology', 'Pharmacology', 'Pathology',
    'Microbiology', 'Biochemistry', 'Forensic Medicine',
    'Community Medicine', 'Pediatrics', 'Obstetrics'
  ],
  'Law': [
    'Constitutional Law', 'Criminal Law', 'Corporate Law',
    'Contract Law', 'Property Law', 'Family Law',
    'International Law', 'Labor Law', 'Environmental Law'
  ]
}

const topicsBySubject = {
  'Data Structures': ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'BST', 'Graphs', 'Hash Tables', 'Heaps', 'Tries', 'Sorting', 'Searching', 'DP', 'Greedy', 'Backtracking', 'Divide & Conquer', 'String Algorithms', 'Segment Trees', 'Disjoint Sets', 'Fenwick Trees'],
  'Algorithms': ['Time Complexity', 'Space Complexity', 'Bubble Sort', 'Quick Sort', 'Merge Sort', 'Heap Sort', 'Binary Search', 'BFS', 'DFS', 'Dijkstra', 'Bellman-Ford', 'Floyd-Warshall', 'Kruskal', 'Prim', 'DP Patterns', 'Greedy', 'Backtracking', 'NP Completeness', 'Approximation Algorithms', 'Randomized Algorithms'],
  'Operating Systems': ['Process Management', 'Threads', 'FCFS Scheduling', 'SJF Scheduling', 'Round Robin', 'Priority Scheduling', 'Deadlocks', 'Prevention', 'Avoidance', 'Memory Management', 'Paging', 'Segmentation', 'Virtual Memory', 'Page Replacement', 'File Systems', 'I/O Systems', 'Disk Scheduling', 'Synchronization', 'Semaphores', 'Monitors'],
  'DBMS': ['ER Model', 'Relational Model', 'SQL Basics', 'SQL Joins', 'Subqueries', '1NF', '2NF', '3NF', 'BCNF', 'Transactions', 'ACID', 'Concurrency', 'Locking', 'Recovery', 'Indexing', 'B-Trees', 'Hashing', 'Query Optimization', 'NoSQL', 'MongoDB'],
  'Computer Networks': ['OSI Model', 'TCP/IP', 'Physical Layer', 'Data Link', 'Network Layer', 'Transport Layer', 'Application Layer', 'IP Addressing', 'Subnetting', 'Routing', 'TCP vs UDP', 'HTTP', 'DNS', 'DHCP', 'ARP', 'Security', 'Firewalls', 'VPN', 'Wireless', 'Socket Programming'],
  'Physics': ['Mechanics', 'Kinematics', 'Newton Laws', 'Work Energy', 'Rotation', 'Gravitation', 'Thermodynamics', 'Oscillations', 'Waves', 'Electrostatics', 'Current Electricity', 'Magnetism', 'EM Induction', 'AC Circuits', 'EM Waves', 'Optics', 'Modern Physics', 'Nuclear Physics', 'Quantum Mechanics', 'Relativity'],
  'Chemistry': ['Atomic Structure', 'Periodic Table', 'Chemical Bonding', 'States of Matter', 'Thermochemistry', 'Equilibrium', 'Redox', 'Electrochemistry', 'Kinetics', 'Organic Basics', 'Hydrocarbons', 'Alcohols', 'Aldehydes', 'Acids', 'Amines', 'Polymers', 'Biomolecules', 'Coordination Chemistry', 'Surface Chemistry', 'Industrial Chemistry'],
  'Biology': ['Cell Structure', 'Cell Division', 'Biomolecules', 'Plant Anatomy', 'Digestion', 'Respiration', 'Circulation', 'Excretion', 'Neural Control', 'Reproduction', 'Genetics', 'Molecular Biology', 'Evolution', 'Ecology', 'Biodiversity', 'Biotechnology', 'Health', 'Immunology', 'Endocrinology', 'Plant Physiology'],
  'Mathematics': ['Sets', 'Functions', 'Trigonometry', 'Complex Numbers', 'Quadratics', 'Permutations', 'Combinations', 'Binomial', 'Sequences', 'Straight Lines', 'Conic Sections', 'Limits', 'Derivatives', 'Integration', 'Diff Equations', 'Vectors', '3D Geometry', 'Probability', 'Statistics', 'Matrices'],
  'Accounting': ['Principles', 'Double Entry', 'Journal', 'Ledger', 'Trial Balance', 'Trading A/c', 'P&L A/c', 'Balance Sheet', 'Depreciation', 'Financial Statements', 'Cash Flow', 'Ratio Analysis', 'Cost Accounting', 'Marginal Costing', 'Budgeting', 'Standard Costing', 'Auditing', 'Accounting Standards', 'Bank Reconciliation', 'Inventory'],
  'Anatomy': ['Cell Biology', 'Histology', 'Osteology', 'Upper Limb', 'Lower Limb', 'Thorax', 'Abdomen', 'Pelvis', 'Head & Neck', 'Brain', 'Spinal Cord', 'Cranial Nerves', 'Cardiovascular', 'Respiratory', 'GI Tract', 'Urinary System', 'Reproductive', 'Embryology', 'Arthrology', 'Myology'],
  'Constitutional Law': ['Preamble', 'Fundamental Rights', 'Right to Equality', 'Right to Freedom', 'Right against Exploitation', 'Right to Religion', 'Cultural Rights', 'Constitutional Remedies', 'DPSP', 'Fundamental Duties', 'Union Executive', 'Parliament', 'Supreme Court', 'High Courts', 'Federalism', 'Emergency', 'Amendment', 'Judicial Review', 'PIL', 'State Government'],
  'History': ['Indus Valley', 'Vedic Period', 'Maurya Empire', 'Gupta Empire', 'Mughal Empire', 'Delhi Sultanate', 'British Rule', 'National Movement', 'Gandhi', 'Independence', 'World War I', 'World War II', 'Cold War', 'French Revolution', 'Industrial Revolution', 'Renaissance', 'Greek History', 'Roman Empire', 'Medieval Europe', 'Modern World']
}

function ExamEmergency({ language }) {
  const [stream, setStream] = useState('Engineering')
  const [subject, setSubject] = useState('')
  const [topic, setTopic] = useState('')
  const [examDate, setExamDate] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleStreamChange = (e) => {
    setStream(e.target.value)
    setSubject('')
    setTopic('')
  }

  const generatePlan = async () => {
    if (!subject || !examDate) {
      toast.error('Please select subject and exam date!')
      return
    }
    setLoading(true)
    try {
      const res = await axios.post('/api/exam-emergency', {
        subject, topic: topic || 'All topics', examDate, stream, language
      })
      setResult(res.data)
      toast.success('Study plan generated! 📚')
    } catch (err) {
      // Fallback mock response
      const daysLeft = Math.max(1, Math.ceil((new Date(examDate) - new Date()) / (1000 * 60 * 60 * 24)))
      const subTopics = topicsBySubject[subject] || ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4', 'Topic 5']
      const hourlyPlan = subTopics.slice(0, Math.min(8, subTopics.length)).map((t, i) => ({
        hour: i + 1, topic: t,
        priority: i < 3 ? 'high' : i < 6 ? 'medium' : 'low'
      }))
      setResult({
        subject, daysLeft, hourlyPlan,
        tips: [
          'Focus on high-priority topics first',
          'Practice previous year questions',
          'Take breaks every 45 minutes',
          'Revise key formulas before sleep',
          `You have ${daysLeft} day(s) left - stay focused!`
        ]
      })
      toast.success('Study plan generated (offline mode)! 📚')
    }
    setLoading(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Highlighted Header */}
      <div style={{
        background: 'linear-gradient(135deg, #701a75 0%, #4a044e 50%, #0f172a 100%)',
        border: '1px solid rgba(232,121,249,0.4)',
        borderRadius: '1.5rem',
        padding: '2rem',
        boxShadow: '0 8px 32px rgba(217,70,239,0.25)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>⚡</span>
            <div>
              <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '900', color: '#fff', background: 'linear-gradient(135deg, #fff, #f5d0fe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Exam Emergency & Revision Planner
              </h1>
              <p style={{ margin: '0.25rem 0 0', color: '#f5d0fe', fontSize: '0.92rem' }}>
                {Object.values(allSubjects).flat().length}+ Subjects across Engineering, Medical, Arts & Commerce • AI Last-Minute Revision & Cheat Sheets.
              </p>
            </div>
          </div>
          <span style={{ background: 'linear-gradient(135deg, #d946ef, #a21caf)', color: 'white', padding: '0.35rem 0.85rem', borderRadius: '0.6rem', fontWeight: '800', fontSize: '0.85rem' }}>
            Emergency Mode
          </span>
        </div>
      </div>

      <div className="card">

      <div className="form-grid" style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <label className="form-label">Stream</label>
          <select value={stream} onChange={handleStreamChange} className="form-input">
            {Object.keys(allSubjects).map(s => (
              <option key={s} value={s}>{s} ({allSubjects[s].length} subjects)</option>
            ))}
          </select>
        </div>

        <div>
          <label className="form-label">Subject</label>
          <select value={subject} onChange={(e) => { setSubject(e.target.value); setTopic('') }} className="form-input">
            <option value="">Select subject...</option>
            {allSubjects[stream]?.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="form-label">Topic (optional)</label>
          <select value={topic} onChange={(e) => setTopic(e.target.value)} className="form-input">
            <option value="">All Topics</option>
            {subject && topicsBySubject[subject]?.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className="form-label">Exam Date</label>
          <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} className="form-input" />
        </div>

        <button onClick={generatePlan} disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
          {loading ? '⏳ Generating...' : '🚀 Generate Study Plan'}
        </button>
      </div>

      {result && (
        <div style={{ marginTop: '1.5rem' }}>
          <div className="card" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>📋 Study Plan - {subject} {topic && `→ ${topic}`}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {result.daysLeft} day(s) until exam
            </p>

            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {result.hourlyPlan?.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.6rem 0.75rem', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <span>Hour {item.hour}: <strong>{item.topic}</strong></span>
                  <span style={{
                    padding: '0.15rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600',
                    background: item.priority === 'high' ? 'rgba(239,68,68,0.15)' :
                      item.priority === 'medium' ? 'rgba(234,179,8,0.15)' : 'rgba(34,197,94,0.15)',
                    color: item.priority === 'high' ? '#f87171' :
                      item.priority === 'medium' ? '#fbbf24' : '#4ade80'
                  }}>{item.priority}</span>
                </div>
              ))}
            </div>

            {result.tips && (
              <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '8px', background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.15)' }}>
                <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>💡 Tips</p>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem' }}>
                  {result.tips.map((tip, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{tip}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default ExamEmergency
