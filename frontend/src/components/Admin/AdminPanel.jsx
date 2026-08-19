import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import toast from 'react-hot-toast'

function AdminPanel() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalAdmins: 0,
    totalSkills: 0,
    totalJobs: 0,
    activeStudents: 0,
    inactiveStudents: 0,
    studentsByDepartment: [],
    studentsByYear: [],
    recentStudents: []
  })
  const [students, setStudents] = useState([])
  const [jobs, setJobs] = useState([])
  const [skills, setSkills] = useState([])
  const [activeTab, setActiveTab] = useState('stats')
  const [loading, setLoading] = useState(false)

  const [newJob, setNewJob] = useState({ company: '', role: '', location: 'Pan India', salary: '4-8 LPA', applyLink: '', description: '' })
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Engineering', domain: 'Web Development', description: '', duration: '3 Weeks' })
  const [customNotesList, setCustomNotesList] = useState([
    { id: 1, title: 'Operating Systems - Concurrency & Semaphores', category: 'Engineering', subject: 'Operating Systems', content: 'Detailed analysis of mutex locks, semaphores, producer-consumer problem, and deadlock prevention algorithms.', readTime: '6 min' },
    { id: 2, title: 'Data Structures - Balanced AVL & Red-Black Trees', category: 'Engineering', subject: 'Data Structures', content: 'Tree rotations, balance factor calculations, insertion/deletion runtime proofs, and B-Tree indexing.', readTime: '8 min' }
  ])
  const [newNote, setNewNote] = useState({ title: '', category: 'Engineering', subject: '', content: '', readTime: '5 min' })

  const handlePublishNote = (e) => {
    e.preventDefault()
    if (!newNote.title || !newNote.content || !newNote.subject) {
      toast.error('Please fill in title, subject, and content!')
      return
    }
    const noteObj = {
      id: Date.now(),
      title: newNote.title,
      category: newNote.category,
      subject: newNote.subject,
      content: newNote.content,
      readTime: newNote.readTime || '5 min'
    }
    setCustomNotesList(prev => [noteObj, ...prev])
    setNewNote({ title: '', category: 'Engineering', subject: '', content: '', readTime: '5 min' })
    toast.success('Custom study note published successfully! 📝')
  }

  useEffect(() => {
    fetchAdminData()
  }, [activeTab])

  const fetchAdminData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'stats') {
        const res = await api.get('/admin/dashboard')
        setStats(res.data)
      } else if (activeTab === 'students') {
        const res = await api.get('/admin/students')
        setStudents(res.data.students || [])
      } else if (activeTab === 'jobs') {
        const res = await api.get('/admin/jobs')
        setJobs(res.data.jobs || [])
      } else if (activeTab === 'skills') {
        const res = await api.get('/admin/skills')
        setSkills(res.data.skills || [])
      }
    } catch (err) {
      // Graceful fallback
    }
    setLoading(false)
  }

  const handlePostJob = async (e) => {
    e.preventDefault()
    if (!newJob.company || !newJob.role || !newJob.applyLink) {
      toast.error('Please fill company, role, and apply link!')
      return
    }
    try {
      await api.post('/admin/jobs', newJob)
      toast.success('Job vacancy posted successfully! 💼')
      setNewJob({ company: '', role: '', location: 'Pan India', salary: '4-8 LPA', applyLink: '', description: '' })
      fetchAdminData()
    } catch {
      toast.error('Failed to post job')
    }
  }

  const handleAddSkill = async (e) => {
    e.preventDefault()
    if (!newSkill.name || !newSkill.category) {
      toast.error('Please enter skill name!')
      return
    }
    try {
      await api.post('/admin/skills', newSkill)
      toast.success('Skill module added! 📚')
      setNewSkill({ name: '', category: 'Engineering', domain: 'Web Development', description: '', duration: '3 Weeks' })
      fetchAdminData()
    } catch {
      toast.error('Failed to add skill')
    }
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-1">
        <h2 className="card-title" style={{ marginBottom: 0 }}>👑 Faculty & Admin Management Panel</h2>
        <span className="badge badge-danger">Administrator Privileges</span>
      </div>
      <p className="card-subtitle">Manage registered students, view metrics, post company job vacancies, and publish skill modules!</p>

      {/* Admin Tabs */}
      <div className="flex flex-wrap gap-1 mb-3">
        <button onClick={() => setActiveTab('stats')} className={`nav-tab ${activeTab === 'stats' ? 'active' : ''}`}>
          📊 Dashboard Metrics
        </button>
        <button onClick={() => setActiveTab('students')} className={`nav-tab ${activeTab === 'students' ? 'active' : ''}`}>
          👥 Registered Students ({students.length || stats.totalStudents})
        </button>
        <button onClick={() => setActiveTab('jobs')} className={`nav-tab ${activeTab === 'jobs' ? 'active' : ''}`}>
          💼 Posted Job Vacancies ({jobs.length || stats.totalJobs})
        </button>
        <button onClick={() => setActiveTab('skills')} className={`nav-tab ${activeTab === 'skills' ? 'active' : ''}`}>
          📚 Published Skills ({skills.length || stats.totalSkills})
        </button>
        <button onClick={() => setActiveTab('notes')} className={`nav-tab ${activeTab === 'notes' ? 'active' : ''}`}>
          ✏️ Custom Study Notes
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <span className="loading-spinner"></span> Loading Panel Data...
        </div>
      )}

      {/* Stats Tab */}
      {!loading && activeTab === 'stats' && (
        <div className="result-section">
          <h3 className="result-title">📊 Database Metrics Overview</h3>
          <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
            <div className="stat-card">
              <div className="stat-value text-blue">{stats.totalStudents}</div>
              <div className="stat-label">Total Students</div>
            </div>
            <div className="stat-card">
              <div className="stat-value text-green">{stats.activeStudents}</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-value text-warning">{stats.totalJobs}</div>
              <div className="stat-label">Active Jobs</div>
            </div>
            <div className="stat-card">
              <div className="stat-value text-purple">{stats.totalSkills}</div>
              <div className="stat-label">Total Skills</div>
            </div>
          </div>

          <div className="grid-2">
            <div>
              <h4 className="font-bold text-sm mb-1">🏢 Students by Department</h4>
              {stats.studentsByDepartment?.map(dept => (
                <div key={dept._id} className="result-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.8rem' }}>
                  <span>{dept._id}</span>
                  <span className="badge badge-info">{dept.count} students</span>
                </div>
              ))}
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1">📅 Students by Year</h4>
              {stats.studentsByYear?.map(yr => (
                <div key={yr._id} className="result-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.8rem' }}>
                  <span>Year {yr._id}</span>
                  <span className="badge badge-safe">{yr.count} students</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <h4 className="font-bold text-sm mb-1">🆕 Recently Joined Students</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {stats.recentStudents?.map(s => (
                <div key={s.id} className="result-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>{s.name}</span>
                    <span className="text-xs text-muted" style={{ marginLeft: '0.5rem' }}>{s.email}</span>
                  </div>
                  <span className="badge badge-warning">{s.department}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Students Tab */}
      {!loading && activeTab === 'students' && (
        <div className="result-section">
          <h3 className="result-title">👥 Student Directory & Progress</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.5rem' }}>Name</th>
                  <th style={{ padding: '0.5rem' }}>Email</th>
                  <th style={{ padding: '0.5rem' }}>Department</th>
                  <th style={{ padding: '0.5rem' }}>Year</th>
                  <th style={{ padding: '0.5rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map(st => (
                  <tr key={st.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.6rem', fontWeight: 600 }}>{st.name}</td>
                    <td style={{ padding: '0.6rem', color: 'var(--text-muted)' }}>{st.email}</td>
                    <td style={{ padding: '0.6rem' }}>{st.department}</td>
                    <td style={{ padding: '0.6rem' }}>Year {st.year}</td>
                    <td style={{ padding: '0.6rem' }}>
                      <span className={`badge ${st.active ? 'badge-safe' : 'badge-danger'}`}>
                        {st.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Jobs Tab */}
      {!loading && activeTab === 'jobs' && (
        <div className="result-section">
          <h3 className="result-title">➕ Post New Job Vacancy</h3>
          <form onSubmit={handlePostJob} className="mb-3">
            <div className="grid-2">
              <input type="text" className="form-input mb-1" placeholder="Company Name (e.g. TCS)" value={newJob.company} onChange={e => setNewJob({ ...newJob, company: e.target.value })} required />
              <input type="text" className="form-input mb-1" placeholder="Role Title (e.g. Software Engineer)" value={newJob.role} onChange={e => setNewJob({ ...newJob, role: e.target.value })} required />
            </div>
            <div className="grid-2">
              <input type="text" className="form-input mb-1" placeholder="Location" value={newJob.location} onChange={e => setNewJob({ ...newJob, location: e.target.value })} />
              <input type="text" className="form-input mb-1" placeholder="Salary Package (CTC)" value={newJob.salary} onChange={e => setNewJob({ ...newJob, salary: e.target.value })} />
            </div>
            <input type="url" className="form-input mb-1" placeholder="Direct Apply URL (https://...)" value={newJob.applyLink} onChange={e => setNewJob({ ...newJob, applyLink: e.target.value })} required />
            <textarea className="form-textarea mb-1" placeholder="Job description..." value={newJob.description} onChange={e => setNewJob({ ...newJob, description: e.target.value })} rows={2} />
            <button type="submit" className="btn btn-success btn-full">Post Vacancy 💼</button>
          </form>

          <h3 className="result-title">💼 Active Posted Vacancies</h3>
          {jobs.map(j => (
            <div key={j.id} className="result-item flex justify-between items-center">
              <div>
                <p className="font-bold text-sm text-blue">{j.company} — {j.role}</p>
                <p className="text-xs text-muted">📍 {j.location} • 💰 {j.salary}</p>
              </div>
              <a href={j.applyLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.75rem' }}>View Link ↗</a>
            </div>
          ))}
        </div>
      )}

      {/* Skills Tab */}
      {!loading && activeTab === 'skills' && (
        <div className="result-section">
          <h3 className="result-title">➕ Publish New Skill Module</h3>
          <form onSubmit={handleAddSkill} className="mb-3">
            <div className="grid-2">
              <input type="text" className="form-input mb-1" placeholder="Skill Name (e.g. Docker Fundamentals)" value={newSkill.name} onChange={e => setNewSkill({ ...newSkill, name: e.target.value })} required />
              <select className="form-select mb-1" value={newSkill.category} onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}>
                <option value="Engineering">Engineering</option>
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
                <option value="Diploma">Diploma</option>
              </select>
            </div>
            <textarea className="form-textarea mb-1" placeholder="Module overview notes..." value={newSkill.description} onChange={e => setNewSkill({ ...newSkill, description: e.target.value })} rows={2} />
            <button type="submit" className="btn btn-primary btn-full">Publish Skill Module 📚</button>
          </form>

          <h3 className="result-title">Published Skills</h3>
          {skills.map(s => (
            <div key={s.id} className="result-item flex justify-between items-center">
              <div>
                <p className="font-bold text-sm text-blue">{s.name}</p>
                <span className="badge badge-info">{s.category}</span>
              </div>
              <span className="badge badge-safe">{s.level || 'intermediate'}</span>
            </div>
          ))}
        </div>
      )}

      {/* Custom Notes Tab */}
      {!loading && activeTab === 'notes' && (
        <div className="result-section">
          <h3 className="result-title">✏️ Add Custom Study Note</h3>
          <p className="text-xs text-muted mb-2">Publish customized faculty notes, university syllabus points, and revision summaries for students.</p>
          <form onSubmit={handlePublishNote} className="mb-3">
            <div className="grid-2">
              <input
                type="text"
                className="form-input mb-1"
                placeholder="Note Title (e.g. Advanced Operating Systems Memory Management)"
                value={newNote.title}
                onChange={e => setNewNote({ ...newNote, title: e.target.value })}
                required
              />
              <select
                className="form-select mb-1"
                value={newNote.category}
                onChange={e => setNewNote({ ...newNote, category: e.target.value })}
              >
                <option value="Engineering">Engineering</option>
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Management">Management</option>
                <option value="Arts">Arts</option>
                <option value="Medical">Medical</option>
              </select>
            </div>
            <div className="grid-2">
              <input
                type="text"
                className="form-input mb-1"
                placeholder="Subject (e.g. OS / Algorithms / Finance)"
                value={newNote.subject}
                onChange={e => setNewNote({ ...newNote, subject: e.target.value })}
                required
              />
              <input
                type="text"
                className="form-input mb-1"
                placeholder="Read Time (e.g. 5 min)"
                value={newNote.readTime}
                onChange={e => setNewNote({ ...newNote, readTime: e.target.value })}
              />
            </div>
            <textarea
              className="form-textarea mb-1"
              placeholder="Full study note content, key points, formula derivations, and examination tips..."
              value={newNote.content}
              onChange={e => setNewNote({ ...newNote, content: e.target.value })}
              rows={4}
              required
            />
            <button type="submit" className="btn btn-success btn-full">
              Publish Custom Note 📝
            </button>
          </form>

          <h3 className="result-title">📚 Published Custom Notes ({customNotesList.length})</h3>
          {customNotesList.map(n => (
            <div key={n.id} className="result-item" style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-bold text-sm text-blue">{n.title}</span>
                <span className="badge badge-info">{n.category}</span>
              </div>
              <p className="text-xs text-muted" style={{ margin: 0 }}>{n.content}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                <span>📖 Subject: {n.subject}</span>
                <span>⏱️ {n.readTime || '5 min'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminPanel
