import React, { useState, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const DEPARTMENTS = [
  // Engineering
  'B.Tech Computer Science Engineering (CSE)',
  'B.Tech Information Technology (IT)',
  'B.Tech Electronics & Communication Engineering (ECE)',
  'B.Tech Electrical & Electronics Engineering (EEE)',
  'B.Tech Mechanical Engineering',
  'B.Tech Civil Engineering',
  'B.Tech Chemical Engineering',
  'B.Tech Aerospace Engineering',
  'B.Tech Biomedical Engineering',
  'B.Tech Automobile Engineering',
  'B.Tech Agricultural Engineering',
  'B.Tech Marine Engineering',
  'B.E. Computer Science',
  'B.E. Electronics',
  'B.E. Mechanical',
  // Science & Arts
  'B.Sc Computer Science (CS)',
  'B.Sc Information Technology (IT)',
  'B.Sc Mathematics',
  'B.Sc Physics',
  'B.Sc Chemistry',
  'B.Sc Statistics',
  'B.Sc Electronics',
  'B.Sc Data Science',
  'B.Sc Artificial Intelligence',
  'B.Sc Biotechnology',
  'B.Sc Microbiology',
  'B.Sc Nursing',
  // Commerce
  'B.Com (General)',
  'B.Com Computer Applications',
  'B.Com Accounting & Finance',
  'B.Com Professional (CPA)',
  // Business
  'BBA (Business Administration)',
  'BBA Computer Applications',
  'BBA Logistics & Supply Chain',
  // Computer Applications
  'BCA (Computer Applications)',
  'MCA (Master of Computer Applications)',
  // Postgraduate
  'M.Tech Computer Science',
  'M.Tech VLSI',
  'M.Tech Power Systems',
  'M.Sc Computer Science',
  'M.Sc Data Science',
  'M.Sc Mathematics',
  'MBA (Master of Business Administration)',
  'MBA Finance',
  'MBA Marketing',
  'MBA HR',
  // Professional
  'B.Arch (Architecture)',
  'B.Pharm (Pharmacy)',
  'D.Pharm (Diploma Pharmacy)',
  'MBBS',
  'BDS (Dental)',
  'B.Ed (Education)',
  'LLB (Law)',
  'B.Des (Design)',
  // Diploma & ITI
  'Diploma in Computer Engineering',
  'Diploma in Electronics',
  'Diploma in Mechanical Engineering',
  'Diploma in Civil Engineering',
  'Diploma in Electrical Engineering',
  'ITI (Industrial Training)',
  // Arts
  'B.A. English',
  'B.A. History',
  'B.A. Economics',
  'B.A. Psychology',
  'B.A. Political Science',
  'B.A. Tamil',
  'B.A. Sociology',
  'Other'
]

const SEMESTERS = ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester']

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year (Final Year)', 'Postgraduate - 1st Year', 'Postgraduate - 2nd Year']

const SKILLS_LIST = [
  'Python', 'Java', 'JavaScript', 'C', 'C++', 'SQL', 'React', 'Node.js', 'MongoDB',
  'Machine Learning', 'Deep Learning', 'Data Science', 'AI/ML', 'Power BI', 'Tableau',
  'Cloud (AWS)', 'Cloud (Azure)', 'Cloud (GCP)', 'Docker', 'Git', 'HTML/CSS',
  'Django', 'Flask', 'Spring Boot', 'PHP', 'R', 'MATLAB', 'Figma', 'AutoCAD'
]

export default function UserProfile() {
  const { user, updateUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null)
  const fileRef = useRef()

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    college: user?.college || '',
    department: user?.department || '',
    semester: user?.semester || '',
    year: user?.year || '',
    cgpa: user?.cgpa || '',
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    skills: user?.skills || [],
    bio: user?.bio || '',
    city: user?.city || '',
    state: user?.state || ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const toggleSkill = (skill) => {
    const current = formData.skills || []
    setFormData({
      ...formData,
      skills: current.includes(skill) ? current.filter(s => s !== skill) : [...current, skill]
    })
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setAvatarPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      updateUser({ ...formData, avatar: avatarPreview })
      setLoading(false)
      toast.success('Profile updated! 🎉')
    }, 800)
  }

  const stats = [
    { label: 'XP Points', value: '240 XP', icon: '⚡', color: '#facc15' },
    { label: 'Badges Earned', value: '3', icon: '🏅', color: '#f472b6' },
    { label: 'Rank', value: '#12', icon: '🏆', color: '#60a5fa' },
    { label: 'Streak', value: '5 🔥', icon: '🔥', color: '#fb923c' }
  ]

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #1e1b4b, #312e81, #4c1d95)',
          borderRadius: '1.5rem',
          padding: '2rem',
          marginBottom: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(139, 92, 246, 0.3)'
        }}
      >
        <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '100px', height: '100px', borderRadius: '50%',
                background: avatarPreview ? 'transparent' : 'linear-gradient(135deg, #7c3aed, #2563eb)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2.5rem', fontWeight: 'bold', color: 'white',
                border: '3px solid rgba(139,92,246,0.6)',
                overflow: 'hidden', cursor: 'pointer',
                boxShadow: '0 0 30px rgba(139,92,246,0.4)'
              }}
              onClick={() => fileRef.current?.click()}
            >
              {avatarPreview ? (
                <img src={avatarPreview} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                user?.name?.charAt(0)?.toUpperCase() || 'S'
              )}
            </div>
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                position: 'absolute', bottom: 0, right: 0,
                background: '#7c3aed', borderRadius: '50%', width: '28px', height: '28px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: '0.8rem', border: '2px solid #1e1b4b'
              }}
            >📷</div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
          </div>

          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'white', marginBottom: '0.25rem' }}>
              {user?.name || 'Student'} 
              {user?.role === 'admin' && <span style={{ marginLeft: '0.5rem', fontSize: '1rem', background: '#facc15', color: '#1a1a1a', borderRadius: '0.5rem', padding: '0.2rem 0.5rem' }}>👑 Admin</span>}
            </h1>
            <p style={{ color: '#a5b4fc', marginBottom: '0.5rem' }}>{user?.email}</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {formData.department && <span style={{ background: 'rgba(124,58,237,0.3)', color: '#c4b5fd', padding: '0.2rem 0.7rem', borderRadius: '1rem', fontSize: '0.75rem', border: '1px solid rgba(124,58,237,0.4)' }}>🎓 {formData.department}</span>}
              {formData.semester && <span style={{ background: 'rgba(37,99,235,0.3)', color: '#93c5fd', padding: '0.2rem 0.7rem', borderRadius: '1rem', fontSize: '0.75rem', border: '1px solid rgba(37,99,235,0.4)' }}>📅 {formData.semester}</span>}
              {formData.college && <span style={{ background: 'rgba(5,150,105,0.3)', color: '#6ee7b7', padding: '0.2rem 0.7rem', borderRadius: '1rem', fontSize: '0.75rem', border: '1px solid rgba(5,150,105,0.4)' }}>🏛️ {formData.college}</span>}
            </div>
          </div>

          {/* Stats Row */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {stats.map((s) => (
              <div key={s.label} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.07)', borderRadius: '0.75rem', padding: '0.75rem 1rem', minWidth: '70px' }}>
                <div style={{ fontSize: '1.3rem' }}>{s.icon}</div>
                <div style={{ color: s.color, fontWeight: '800', fontSize: '1rem' }}>{s.value}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.65rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        {['profile', 'skills', 'links', 'achievements'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.5rem 1.2rem', borderRadius: '0.75rem', fontWeight: '600', fontSize: '0.85rem',
              cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
              background: activeTab === tab ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.05)',
              color: activeTab === tab ? 'white' : '#94a3b8',
              border: activeTab === tab ? 'none' : '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {tab === 'profile' && '👤 Profile Info'}
            {tab === 'skills' && '💻 My Skills'}
            {tab === 'links' && '🔗 Links'}
            {tab === 'achievements' && '🏅 Achievements'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave}>
        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
            <h3 style={{ color: 'white', fontWeight: '700', marginBottom: '1.25rem', fontSize: '1.1rem' }}>📋 Personal Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {[
                { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your full name' },
                { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+91 98765 43210' },
                { label: 'City', name: 'city', type: 'text', placeholder: 'Chennai, Coimbatore...' },
                { label: 'State', name: 'state', type: 'text', placeholder: 'Tamil Nadu...' },
                { label: 'College / University', name: 'college', type: 'text', placeholder: 'Anna University...' },
                { label: 'Current CGPA', name: 'cgpa', type: 'number', placeholder: '8.5' }
              ].map(field => (
                <div key={field.name}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>{field.label}</label>
                  <input
                    type={field.type} name={field.name} value={formData[field.name]} onChange={handleChange}
                    placeholder={field.placeholder}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              ))}

              {/* Department Dropdown */}
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Department / Course</label>
                <select
                  name="department" value={formData.department} onChange={handleChange}
                  style={{ width: '100%', background: 'rgba(30,27,75,0.9)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
                >
                  <option value="">-- Select Department --</option>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {/* Semester */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Semester</label>
                <select
                  name="semester" value={formData.semester} onChange={handleChange}
                  style={{ width: '100%', background: 'rgba(30,27,75,0.9)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
                >
                  <option value="">-- Select Semester --</option>
                  {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Year */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Year of Study</label>
                <select
                  name="year" value={formData.year} onChange={handleChange}
                  style={{ width: '100%', background: 'rgba(30,27,75,0.9)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
                >
                  <option value="">-- Select Year --</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              {/* Bio */}
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>Short Bio</label>
                <textarea
                  name="bio" value={formData.bio} onChange={handleChange}
                  placeholder="Tell us about yourself, your interests, goals..."
                  rows={3}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
            <h3 style={{ color: 'white', fontWeight: '700', marginBottom: '0.5rem', fontSize: '1.1rem' }}>💻 Select Your Skills</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.25rem' }}>Selected: {formData.skills?.length || 0} skills</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {SKILLS_LIST.map(skill => {
                const selected = formData.skills?.includes(skill)
                return (
                  <button
                    key={skill} type="button" onClick={() => toggleSkill(skill)}
                    style={{
                      padding: '0.4rem 0.9rem', borderRadius: '2rem', fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s', fontWeight: '600',
                      background: selected ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'rgba(255,255,255,0.05)',
                      color: selected ? 'white' : '#94a3b8',
                      border: selected ? 'none' : '1px solid rgba(255,255,255,0.1)',
                      transform: selected ? 'scale(1.05)' : 'scale(1)'
                    }}
                  >
                    {selected ? '✓ ' : ''}{skill}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* LINKS TAB */}
        {activeTab === 'links' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
            <h3 style={{ color: 'white', fontWeight: '700', marginBottom: '1.25rem', fontSize: '1.1rem' }}>🔗 Professional Links</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {[
                { label: '🐙 GitHub Profile', name: 'github', placeholder: 'https://github.com/username' },
                { label: '💼 LinkedIn Profile', name: 'linkedin', placeholder: 'https://linkedin.com/in/username' }
              ].map(field => (
                <div key={field.name}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: '600' }}>{field.label}</label>
                  <input
                    type="url" name={field.name} value={formData[field.name]} onChange={handleChange}
                    placeholder={field.placeholder}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', color: 'white', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ACHIEVEMENTS TAB */}
        {activeTab === 'achievements' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
            <h3 style={{ color: 'white', fontWeight: '700', marginBottom: '1.25rem', fontSize: '1.1rem' }}>🏅 Your Achievements</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
              {[
                { icon: '🐍', name: 'Python Master', unlocked: true, xp: 80 },
                { icon: '⚛️', name: 'React Master', unlocked: true, xp: 100 },
                { icon: '🎤', name: 'Interview Pro', unlocked: true, xp: 120 },
                { icon: '📄', name: 'Resume Expert', unlocked: false, xp: 90 },
                { icon: '🔥', name: '30-Day Streak', unlocked: false, xp: 150 },
                { icon: '🏆', name: 'Top Performer', unlocked: false, xp: 200 },
                { icon: '🤖', name: 'AI/ML Explorer', unlocked: false, xp: 130 },
                { icon: '💻', name: 'Coding Champion', unlocked: false, xp: 110 }
              ].map((badge) => (
                <div key={badge.name} style={{
                  textAlign: 'center', padding: '1rem',
                  background: badge.unlocked ? 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(37,99,235,0.2))' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${badge.unlocked ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: '1rem', opacity: badge.unlocked ? 1 : 0.5
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.4rem', filter: badge.unlocked ? 'none' : 'grayscale(100%)' }}>{badge.icon}</div>
                  <div style={{ color: badge.unlocked ? 'white' : '#64748b', fontWeight: '700', fontSize: '0.8rem', marginBottom: '0.2rem' }}>{badge.name}</div>
                  <div style={{ color: badge.unlocked ? '#facc15' : '#475569', fontSize: '0.7rem' }}>{badge.unlocked ? `✓ +${badge.xp} XP` : `🔒 ${badge.xp} XP`}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <button
          type="submit" disabled={loading}
          style={{
            width: '100%', padding: '0.9rem', marginTop: '1.25rem', borderRadius: '0.9rem',
            background: loading ? '#374151' : 'linear-gradient(135deg, #7c3aed, #2563eb)',
            color: 'white', fontWeight: '700', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer',
            border: 'none', transition: 'all 0.3s', boxShadow: loading ? 'none' : '0 4px 20px rgba(124,58,237,0.4)'
          }}
        >
          {loading ? '⏳ Saving...' : '💾 Save Profile Changes'}
        </button>
      </form>
    </div>
  )
}
