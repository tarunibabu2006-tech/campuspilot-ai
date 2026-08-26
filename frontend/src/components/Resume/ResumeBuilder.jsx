import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { saveResume } from '../../services/api'
import toast from 'react-hot-toast'

function ResumeBuilder() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || 'Alex Johnson',
    email: user?.email || 'alex@college.edu',
    phone: '+91 9876543210',
    linkedin: 'https://linkedin.com/in/alexjohnson',
    github: 'https://github.com/alexjohnson',
    portfolio: 'https://alexjohnson.dev',
    summary: 'Enthusiastic Computer Science student passionate about full-stack web development, DSA problem solving, and building scalable cloud solutions.',
    education: [
      { degree: 'B.Tech in Computer Science', institution: 'XYZ Institute of Technology', year: '2022 - 2026', grade: '8.5 CGPA' }
    ],
    skills: {
      technical: ['JavaScript', 'React.js', 'Node.js', 'Express', 'SQL', 'Git', 'Data Structures'],
      soft: ['Communication', 'Teamwork', 'Problem Solving'],
      languages: ['English', 'Tamil', 'Hindi']
    },
    projects: [
      { name: 'CampusPilot AI', technologies: 'React, Node.js, Express, Gemini AI', description: 'Built an AI-powered student assistant with exam emergency planner, mock viva, and scam detector.', link: 'https://github.com/alexjohnson/campus-pilot-ai' }
    ],
    experience: [
      { role: 'Web Developer Intern', company: 'Tech Corp', duration: '3 Months', details: 'Developed responsive frontend UI components and integrated RESTful backend APIs.' }
    ]
  })

  const [eduInput, setEduInput] = useState({ degree: '', institution: '', year: '', grade: '' })
  const [projInput, setProjInput] = useState({ name: '', technologies: '', description: '', link: '' })
  const [skillCategory, setSkillCategory] = useState('technical')
  const [skillInput, setSkillInput] = useState('')
  const [template, setTemplate] = useState('modern')

  const handleSave = async () => {
    try {
      await saveResume(formData)
      toast.success('Resume saved successfully! 📄')
    } catch {
      toast.error('Failed to save resume')
    }
  }

  const addEducation = () => {
    if (!eduInput.degree || !eduInput.institution) return
    setFormData(prev => ({ ...prev, education: [...prev.education, eduInput] }))
    setEduInput({ degree: '', institution: '', year: '', grade: '' })
  }

  const addProject = () => {
    if (!projInput.name) return
    setFormData(prev => ({ ...prev, projects: [...prev.projects, projInput] }))
    setProjInput({ name: '', technologies: '', description: '', link: '' })
  }

  const addSkill = () => {
    if (!skillInput.trim()) return
    setFormData(prev => {
      const currentList = prev.skills[skillCategory] || []
      return {
        ...prev,
        skills: {
          ...prev.skills,
          [skillCategory]: [...currentList, skillInput.trim()]
        }
      }
    })
    setSkillInput('')
  }

  const removeSkill = (cat, index) => {
    setFormData(prev => {
      const currentList = prev.skills[cat] || []
      return {
        ...prev,
        skills: {
          ...prev.skills,
          [cat]: currentList.filter((_, i) => i !== index)
        }
      }
    })
  }

  const handleDownloadText = () => {
    const textContent = `
==================================================
${formData.name.toUpperCase()}
Email: ${formData.email} | Phone: ${formData.phone}
LinkedIn: ${formData.linkedin} | GitHub: ${formData.github} | Portfolio: ${formData.portfolio}
==================================================

SUMMARY:
${formData.summary}

EDUCATION:
${formData.education.map(e => `- ${e.degree} | ${e.institution} (${e.year}) [${e.grade}]`).join('\n')}

TECHNICAL SKILLS:
${formData.skills.technical.join(', ')}

SOFT SKILLS:
${formData.skills.soft.join(', ')}

LANGUAGES:
${formData.skills.languages.join(', ')}

PROJECTS:
${formData.projects.map(p => `- ${p.name} (${p.technologies}) [Link: ${p.link || 'N/A'}]\n  ${p.description}`).join('\n\n')}

EXPERIENCE:
${formData.experience.map(x => `- ${x.role} at ${x.company} (${x.duration})\n  ${x.details}`).join('\n\n')}
`
    const blob = new Blob([textContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${formData.name.replace(/\s+/g, '_')}_Resume.txt`
    a.click()
    toast.success('Resume Text / Markdown generated! 📥')
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-1">
        <h2 className="card-title" style={{ marginBottom: 0 }}>📄 Premium Resume Builder</h2>
        <div>
          <label className="form-label" style={{ display: 'inline', marginRight: '0.5rem' }}>Style Template:</label>
          <select className="form-select" style={{ display: 'inline-block', width: 'auto', padding: '0.2rem 0.5rem' }} value={template} onChange={e => setTemplate(e.target.value)}>
            <option value="modern">Modern Professional (Blue & Grey)</option>
            <option value="minimalist">Minimalist Classic (Serif & Clean)</option>
            <option value="ats">ATS Optimized Standard (High Pass-Rate)</option>
            <option value="creative">Creative Portfolio (Purple Accent)</option>
            <option value="executive">Executive Leadership (Emerald Dark)</option>
          </select>
        </div>
      </div>
      <p className="card-subtitle">Fill in your contact links (LinkedIn, GitHub, Portfolio), structure skills by categories, and generate click-friendly outputs!</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Form Inputs */}
        <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <h3 className="font-bold text-sm text-blue mb-2">👤 Personal & Social Links</h3>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input type="text" className="form-input" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
            </div>
          </div>
          <div className="grid-3">
            <div className="form-group">
              <label className="form-label">LinkedIn URL</label>
              <input type="url" className="form-input" placeholder="https://linkedin.com/in/..." value={formData.linkedin} onChange={e => setFormData({ ...formData, linkedin: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">GitHub URL</label>
              <input type="url" className="form-input" placeholder="https://github.com/..." value={formData.github} onChange={e => setFormData({ ...formData, github: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Portfolio URL</label>
              <input type="url" className="form-input" placeholder="https://..." value={formData.portfolio} onChange={e => setFormData({ ...formData, portfolio: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Professional Summary</label>
            <textarea className="form-textarea" value={formData.summary} onChange={e => setFormData({ ...formData, summary: e.target.value })} rows={3} />
          </div>

          <h3 className="font-bold text-sm text-blue mt-3 mb-1">🔧 Categorized Skills</h3>
          <div className="grid-2" style={{ gap: '0.5rem', marginBottom: '0.5rem' }}>
            <select className="form-select" value={skillCategory} onChange={e => setSkillCategory(e.target.value)}>
              <option value="technical">Technical Skills</option>
              <option value="soft">Soft Skills</option>
              <option value="languages">Languages</option>
            </select>
            <div className="flex gap-1">
              <input type="text" className="form-input" value={skillInput} onChange={e => setSkillInput(e.target.value)} placeholder="Add skill" />
              <button onClick={addSkill} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem' }}>Add</button>
            </div>
          </div>
          {Object.entries(formData.skills).map(([cat, list]) => (
            <div key={cat} style={{ marginBottom: '0.5rem' }}>
              <span className="text-xs text-muted" style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{cat}:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {list.map((s, i) => (
                  <span key={i} className="badge badge-info" style={{ cursor: 'pointer' }} onClick={() => removeSkill(cat, i)}>
                    {s} ✕
                  </span>
                ))}
              </div>
            </div>
          ))}

          <h3 className="font-bold text-sm text-blue mt-3 mb-1">🎓 Education</h3>
          <div className="form-group">
            <input type="text" className="form-input mb-1" placeholder="Degree (e.g. B.Tech CS)" value={eduInput.degree} onChange={e => setEduInput({ ...eduInput, degree: e.target.value })} />
            <input type="text" className="form-input mb-1" placeholder="Institution" value={eduInput.institution} onChange={e => setEduInput({ ...eduInput, institution: e.target.value })} />
            <div className="grid-2">
              <input type="text" className="form-input" placeholder="Year" value={eduInput.year} onChange={e => setEduInput({ ...eduInput, year: e.target.value })} />
              <input type="text" className="form-input" placeholder="Grade/CGPA" value={eduInput.grade} onChange={e => setEduInput({ ...eduInput, grade: e.target.value })} />
            </div>
            <button onClick={addEducation} className="btn btn-outline btn-full mt-1" style={{ fontSize: '0.75rem', padding: '0.35rem' }}>+ Add Education</button>
          </div>

          <h3 className="font-bold text-sm text-blue mt-3 mb-1">💻 Projects</h3>
          <div className="form-group">
            <input type="text" className="form-input mb-1" placeholder="Project Name" value={projInput.name} onChange={e => setProjInput({ ...projInput, name: e.target.value })} />
            <input type="text" className="form-input mb-1" placeholder="Tech Stack (e.g. React, Node)" value={projInput.technologies} onChange={e => setProjInput({ ...projInput, technologies: e.target.value })} />
            <input type="url" className="form-input mb-1" placeholder="Project Link (GitHub/Live)" value={projInput.link} onChange={e => setProjInput({ ...projInput, link: e.target.value })} />
            <textarea className="form-textarea mb-1" placeholder="Short description..." value={projInput.description} onChange={e => setProjInput({ ...projInput, description: e.target.value })} rows={2} />
            <button onClick={addProject} className="btn btn-outline btn-full" style={{ fontSize: '0.75rem', padding: '0.35rem' }}>+ Add Project</button>
          </div>

          <div className="grid-2 mt-3">
            <button onClick={handleSave} className="btn btn-success btn-full">💾 Save Resume</button>
            <button onClick={handleDownloadText} className="btn btn-primary btn-full">📥 Export Resume</button>
          </div>
        </div>

        {/* Live Resume Sheet Preview */}
        <div style={{
          background: template === 'executive' ? '#064e3b' : '#ffffff',
          color: template === 'executive' ? '#f0fdf4' : '#111827',
          padding: '1.5rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid #e5e7eb',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          fontFamily: template === 'minimalist' ? 'Georgia, serif' : template === 'ats' ? 'Courier, monospace' : 'Inter, sans-serif'
        }}>
          <div style={{ borderBottom: `2px solid ${template === 'creative' ? '#9333ea' : template === 'executive' ? '#34d399' : '#2563eb'}`, paddingBottom: '0.75rem', marginBottom: '1rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: template === 'creative' ? '#7e22ce' : template === 'executive' ? '#34d399' : '#1d4ed8', textTransform: 'uppercase' }}>{formData.name}</h1>
            <p style={{ fontSize: '0.8rem', color: '#4b5563', marginTop: '0.2rem' }}>
              📧 <a href={`mailto:${formData.email}`} style={{ color: '#2563eb', textDecoration: 'none' }}>{formData.email}</a> | 📞 {formData.phone}
            </p>
            <p style={{ fontSize: '0.75rem', color: '#4b5563', marginTop: '0.2rem' }}>
              🌐 <a href={formData.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none', marginRight: '0.5rem' }}>LinkedIn</a>
              | <a href={formData.github} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none', margin: '0 0.5rem' }}>GitHub</a>
              | <a href={formData.portfolio} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none', marginLeft: '0.5rem' }}>Portfolio</a>
            </p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e40af', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.2rem', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              Professional Summary
            </h2>
            <p style={{ fontSize: '0.8rem', lineHeight: 1.5, color: '#374151' }}>{formData.summary}</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e40af', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.2rem', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              Skills & Categories
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#374151', margin: '0.2rem 0' }}>
              <strong>Technical:</strong> {formData.skills.technical.join(', ')}
            </p>
            <p style={{ fontSize: '0.8rem', color: '#374151', margin: '0.2rem 0' }}>
              <strong>Soft Skills:</strong> {formData.skills.soft.join(', ')}
            </p>
            <p style={{ fontSize: '0.8rem', color: '#374151', margin: '0.2rem 0' }}>
              <strong>Languages:</strong> {formData.skills.languages.join(', ')}
            </p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e40af', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.2rem', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              Education
            </h2>
            {formData.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '0.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700 }}>
                  <span>{edu.degree}</span>
                  <span>{edu.year}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280' }}>
                  <span>{edu.institution}</span>
                  <span>{edu.grade}</span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e40af', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.2rem', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              Featured Projects
            </h2>
            {formData.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700 }}>
                  <span>{proj.name}</span>
                  <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 400 }}>{proj.technologies}</span>
                </div>
                {proj.link && (
                  <p style={{ fontSize: '0.7rem', margin: '0.1rem 0' }}>
                    🔗 <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>{proj.link}</a>
                  </p>
                )}
                <p style={{ fontSize: '0.75rem', color: '#4b5563', marginTop: '0.1rem' }}>{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder
