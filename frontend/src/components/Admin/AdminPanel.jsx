import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  getAdminDashboard, getAdminStudents, getAdminStudent,
  updateAdminStudent, deleteAdminStudent, resetStudentPassword,
  getAdminJobs, createAdminJob, updateAdminJob, deleteAdminJob,
  getAdminSkills, createAdminSkill, updateAdminSkill, deleteAdminSkill,
  getAdminNotes, createAdminNote, updateAdminNote, deleteAdminNote,
  getAdminCompanies, createAdminCompany, updateAdminCompany, deleteAdminCompany,
  getAdminAlumni, createAdminAlumni, updateAdminAlumni, deleteAdminAlumni,
  getAdminMentors, createAdminMentor, updateAdminMentor, deleteAdminMentor,
  getAdminTests, createAdminTest, updateAdminTest, deleteAdminTest,
  getAdminGroups, deleteAdminGroup, getAdminSettings, resetAllStudentXP
} from '../../services/api'

// ── Shared styles ─────────────────────────────────────────────────
const card = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }
const inputStyle = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.6rem', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.88rem', outline: 'none', width: '100%', boxSizing: 'border-box', fontFamily: 'inherit' }
const btnPrimary = { background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '0.6rem', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }
const btnDanger = { background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)', padding: '0.4rem 0.8rem', borderRadius: '0.5rem', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer' }
const btnEdit = { background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.3)', padding: '0.4rem 0.8rem', borderRadius: '0.5rem', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer' }
const btnSuccess = { background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)', padding: '0.4rem 0.8rem', borderRadius: '0.5rem', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer' }

// ── Sidebar nav items ─────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'students', icon: '👥', label: 'Students' },
  { id: 'jobs', icon: '💼', label: 'Jobs' },
  { id: 'skills', icon: '📚', label: 'Skills' },
  { id: 'notes', icon: '📝', label: 'Notes' },
  { id: 'companies', icon: '🏢', label: 'Companies' },
  { id: 'alumni', icon: '🎓', label: 'Alumni' },
  { id: 'mentors', icon: '🧑‍🏫', label: 'Mentors' },
  { id: 'tests', icon: '📋', label: 'Mock Tests' },
  { id: 'groups', icon: '👥', label: 'Study Groups' },
  { id: 'settings', icon: '⚙️', label: 'Settings' }
]

// ── Generic Confirm Delete Modal ─────────────────────────────────
function ConfirmModal({ item, onConfirm, onCancel }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
        style={{ background: '#1e1b4b', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '1.25rem', padding: '2rem', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
        <h3 style={{ color: 'white', fontWeight: '800', marginBottom: '0.5rem' }}>Confirm Delete</h3>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>This action cannot be undone. Are you sure you want to delete <strong style={{ color: 'white' }}>{item}</strong>?</p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button onClick={onCancel} style={{ ...btnEdit, padding: '0.65rem 1.5rem' }}>Cancel</button>
          <button onClick={onConfirm} style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)', color: 'white', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '0.6rem', fontWeight: '800', cursor: 'pointer' }}>Delete</button>
        </div>
      </motion.div>
    </div>
  )
}

// ── Generic Form Modal ────────────────────────────────────────────
function FormModal({ title, fields, values, onChange, onSave, onClose, saving }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', overflowY: 'auto' }}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #1e1b4b, #0f172a)', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '1.5rem', padding: '2rem', maxWidth: '560px', width: '100%' }}
        onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ color: 'white', fontWeight: '900', margin: 0, fontSize: '1.2rem' }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '60vh', overflowY: 'auto' }}>
          {fields.map(f => (
            <div key={f.key}>
              <label style={{ color: '#94a3b8', fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea value={values[f.key] || ''} onChange={e => onChange(f.key, e.target.value)}
                  rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder={f.placeholder || ''} />
              ) : f.type === 'select' ? (
                <select value={values[f.key] || ''} onChange={e => onChange(f.key, e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}>
                  {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : (
                <input type={f.type || 'text'} value={values[f.key] || ''} onChange={e => onChange(f.key, e.target.value)}
                  style={inputStyle} placeholder={f.placeholder || ''} />
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ ...btnEdit, padding: '0.65rem 1.25rem' }}>Cancel</button>
          <button onClick={onSave} disabled={saving} style={{ ...btnPrimary, opacity: saving ? 0.7 : 1 }}>
            {saving ? '⏳ Saving...' : '✅ Save'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ── Student Detail Modal ─────────────────────────────────────────
function StudentDetailModal({ student, onClose, onEdit, onDelete }) {
  if (!student) return null
  const feats = student.featureUsage || {}
  const totalUsage = Object.values(feats).reduce((a, b) => a + b, 0)
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', overflowY: 'auto' }}>
      <motion.div initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #0f172a, #1e1b4b)', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '1.5rem', padding: '2rem', maxWidth: '700px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '800', color: 'white' }}>
              {(student.name || 'S')[0].toUpperCase()}
            </div>
            <div>
              <h3 style={{ color: 'white', fontWeight: '900', margin: 0 }}>{student.name}</h3>
              <p style={{ color: '#94a3b8', margin: '0.2rem 0 0', fontSize: '0.85rem' }}>{student.email}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}>✕</button>
        </div>

        {/* Basic Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
          {[
            { label: 'Department', value: student.department || 'Not specified' },
            { label: 'Year', value: student.year ? `Year ${student.year}` : 'Not specified' },
            { label: 'Target Role', value: student.targetRole || 'Not specified' },
            { label: 'XP Points', value: `${student.xpPoints || 0} XP` },
            { label: 'Login Count', value: student.loginCount || 1 },
            { label: 'Streak', value: `${student.streak || 0} days` },
            { label: 'First Login', value: student.firstLogin ? new Date(student.firstLogin).toLocaleDateString() : 'N/A' },
            { label: 'Last Login', value: student.lastLogin ? new Date(student.lastLogin).toLocaleDateString() : 'N/A' }
          ].map(item => (
            <div key={item.label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem' }}>
              <div style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase' }}>{item.label}</div>
              <div style={{ color: 'white', fontWeight: '700', fontSize: '0.88rem', marginTop: '0.15rem' }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Skills */}
        {student.skills?.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ color: '#a78bfa', fontWeight: '700', fontSize: '0.82rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Skills</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {student.skills.map(s => (
                <span key={s} style={{ background: 'rgba(124,58,237,0.15)', color: '#c4b5fd', border: '1px solid rgba(124,58,237,0.3)', padding: '0.2rem 0.65rem', borderRadius: '1rem', fontSize: '0.75rem' }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Badges */}
        {student.badges?.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ color: '#fbbf24', fontWeight: '700', fontSize: '0.82rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Badges</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {student.badges.map(b => (
                <span key={b} style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)', padding: '0.2rem 0.65rem', borderRadius: '1rem', fontSize: '0.75rem' }}>🏅 {b}</span>
              ))}
            </div>
          </div>
        )}

        {/* Feature Usage */}
        <div style={{ marginBottom: '1.25rem' }}>
          <h4 style={{ color: '#4ade80', fontWeight: '700', fontSize: '0.82rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Feature Usage (Total: {totalUsage})</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.4rem' }}>
            {Object.entries(feats).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).map(([key, val]) => (
              <div key={key} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.5rem', padding: '0.45rem 0.7rem', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}</span>
                <span style={{ color: '#4ade80', fontWeight: '700', fontSize: '0.78rem' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Login History */}
        {student.loginHistory?.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ color: '#60a5fa', fontWeight: '700', fontSize: '0.82rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Login History</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '150px', overflowY: 'auto' }}>
              {student.loginHistory.slice(-5).reverse().map((l, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', padding: '0.4rem 0.75rem', display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                  <span>📅 {l.date ? new Date(l.date).toLocaleString() : 'N/A'}</span>
                  {l.device && <span>📱 {l.device}</span>}
                  {l.ip && <span>🌐 {l.ip}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activities */}
        {student.activities?.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ color: '#f59e0b', fontWeight: '700', fontSize: '0.82rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Recent Activities</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', maxHeight: '150px', overflowY: 'auto' }}>
              {student.activities.slice(-10).reverse().map((a, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', padding: '0.4rem 0.75rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                  <span style={{ color: '#fbbf24' }}>{a.action}</span>
                  {a.page && <span> on <span style={{ color: 'white' }}>{a.page}</span></span>}
                  {a.timestamp && <span> · {new Date(a.timestamp).toLocaleString()}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button onClick={() => onEdit(student)} style={{ ...btnEdit, padding: '0.6rem 1.2rem' }}>✏️ Edit</button>
          <button onClick={() => onDelete(student)} style={{ ...btnDanger, padding: '0.6rem 1.2rem' }}>🗑️ Delete</button>
        </div>
      </motion.div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// DASHBOARD TAB
// ════════════════════════════════════════════════════════════════
function AdminDashboard({ dashData, loading }) {
  if (loading) return <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>⏳ Loading real data...</div>

  const statCards = [
    { label: 'Total Students', value: dashData?.totalStudents ?? 0, icon: '👥', color: '#60a5fa' },
    { label: 'Active (7 days)', value: dashData?.activeStudents ?? 0, icon: '🟢', color: '#4ade80' },
    { label: 'Total Jobs', value: dashData?.totalJobs ?? 0, icon: '💼', color: '#fbbf24' },
    { label: 'Total Skills', value: dashData?.totalSkills ?? 0, icon: '📚', color: '#a78bfa' },
    { label: 'Notes', value: dashData?.totalNotes ?? 0, icon: '📝', color: '#f59e0b' },
    { label: 'Companies', value: dashData?.totalCompanies ?? 0, icon: '🏢', color: '#34d399' },
    { label: 'Alumni', value: dashData?.totalAlumni ?? 0, icon: '🎓', color: '#fb7185' },
    { label: 'Mentors', value: dashData?.totalMentors ?? 0, icon: '🧑‍🏫', color: '#38bdf8' },
    { label: 'Mock Tests', value: dashData?.totalTests ?? 0, icon: '📋', color: '#f472b6' },
    { label: 'Admins', value: 1, icon: '👑', color: '#fbbf24' }
  ]

  return (
    <div>
      {/* DB Status */}
      <div style={{ background: dashData?.dbConnected ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${dashData?.dbConnected ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '0.75rem', padding: '0.75rem 1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: dashData?.dbConnected ? '#4ade80' : '#f87171' }} />
        <span style={{ color: dashData?.dbConnected ? '#4ade80' : '#f87171', fontWeight: '700', fontSize: '0.85rem' }}>
          Database: {dashData?.dbConnected ? '✅ Connected — Showing REAL Data' : '⚠️ Not Connected — Showing partial data from memory'}
        </span>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {statCards.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            style={{ ...card, border: `1px solid ${s.color}30`, background: `${s.color}08` }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{s.icon}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: s.color, lineHeight: 1 }}>{s.value.toLocaleString()}</div>
            <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent Students */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <div style={card}>
          <h3 style={{ color: 'white', fontWeight: '800', margin: '0 0 1rem', fontSize: '0.95rem' }}>👥 Recent Students</h3>
          {(dashData?.recentStudents || []).length === 0
            ? <p style={{ color: '#64748b', fontSize: '0.85rem' }}>No students registered yet</p>
            : <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {(dashData?.recentStudents || []).map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem' }}>
                  <div>
                    <div style={{ color: 'white', fontWeight: '700', fontSize: '0.85rem' }}>{s.name}</div>
                    <div style={{ color: '#64748b', fontSize: '0.72rem' }}>{s.email} · {s.department || 'N/A'}</div>
                  </div>
                  <span style={{ color: '#a78bfa', fontSize: '0.72rem', fontWeight: '700' }}>
                    {s.loginCount || 1} logins
                  </span>
                </div>
              ))}
            </div>
          }
        </div>

        <div style={card}>
          <h3 style={{ color: 'white', fontWeight: '800', margin: '0 0 1rem', fontSize: '0.95rem' }}>🏢 Students by Department</h3>
          {(dashData?.studentsByDepartment || []).length === 0
            ? <p style={{ color: '#64748b', fontSize: '0.85rem' }}>No department data yet</p>
            : <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {(dashData?.studentsByDepartment || []).slice(0, 8).map((d, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>{d._id}</span>
                  <span style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa', padding: '0.15rem 0.6rem', borderRadius: '1rem', fontSize: '0.72rem', fontWeight: '800' }}>{d.count}</span>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// STUDENTS TAB
// ════════════════════════════════════════════════════════════════
function StudentsTab() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [editModal, setEditModal] = useState(null)
  const [deleteModal, setDeleteModal] = useState(null)
  const [saving, setSaving] = useState(false)
  const [editValues, setEditValues] = useState({})

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getAdminStudents({ search })
      setStudents(res.data.students || [])
    } catch { toast.error('Failed to load students') }
    setLoading(false)
  }, [search])

  useEffect(() => { load() }, [load])

  const handleEdit = (s) => {
    setEditValues({
      name: s.name,
      email: s.email,
      department: s.department,
      year: s.year,
      targetRole: s.targetRole,
      xpPoints: s.xpPoints || 0,
      linkedin: s.linkedin,
      github: s.github
    })
    setEditModal(s)
  }

  const saveEdit = async () => {
    setSaving(true)
    try {
      await updateAdminStudent(editModal._id, editValues)
      toast.success('Student updated! ✅')
      setEditModal(null)
      load()
    } catch { toast.error('Update failed') }
    setSaving(false)
  }

  const handleDelete = async () => {
    try {
      await deleteAdminStudent(deleteModal._id)
      toast.success('Student deleted')
      setDeleteModal(null)
      load()
    } catch { toast.error('Delete failed') }
  }

  const handleResetXP = async () => {
    if (window.confirm('Are you sure you want to reset ALL student XP to 0? Every student will start with real 0 XP and only earn points as they actively use features.')) {
      try {
        const res = await resetAllStudentXP()
        toast.success(res.data?.message || 'All student XP reset to 0! ✅')
        load()
      } catch {
        toast.error('Failed to reset XP')
      }
    }
  }

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Department', 'Year', 'XP Points', 'Login Count', 'Last Login']
    const rows = students.map(s => [s.name, s.email, s.department, s.year, s.xpPoints || 0, s.loginCount, s.lastLogin ? new Date(s.lastLogin).toLocaleDateString() : ''])
    const csv = [headers, ...rows].map(r => r.map(v => `"${String(v || '').replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'students.csv'; a.click()
    toast.success('CSV exported!')
  }

  return (
    <div>
      {selected && <StudentDetailModal student={selected} onClose={() => setSelected(null)} onEdit={s => { setSelected(null); handleEdit(s) }} onDelete={s => { setSelected(null); setDeleteModal(s) }} />}
      {deleteModal && <ConfirmModal item={deleteModal.name} onConfirm={handleDelete} onCancel={() => setDeleteModal(null)} />}
      {editModal && (
        <FormModal title={`Edit: ${editModal.name}`}
          fields={[
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'xpPoints', label: 'Real XP Points', type: 'number' },
            { key: 'department', label: 'Department' },
            { key: 'year', label: 'Year', type: 'select', options: [{ value: '', label: 'Select Year' }, ...['1', '2', '3', '4'].map(y => ({ value: y, label: `Year ${y}` }))] },
            { key: 'targetRole', label: 'Target Role' },
            { key: 'linkedin', label: 'LinkedIn URL' },
            { key: 'github', label: 'GitHub URL' }
          ]}
          values={editValues}
          onChange={(k, v) => setEditValues(prev => ({ ...prev, [k]: v }))}
          onSave={saveEdit}
          onClose={() => setEditModal(null)}
          saving={saving}
        />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <h2 style={{ color: 'white', fontWeight: '900', margin: 0 }}>👥 Students ({students.length})</h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button onClick={handleResetXP} style={{ ...btnDanger, padding: '0.5rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            🧹 Reset All XP to 0
          </button>
          <button onClick={exportCSV} style={{ ...btnSuccess, padding: '0.5rem 1rem' }}>📥 Export CSV</button>
          <button onClick={load} style={{ ...btnEdit, padding: '0.5rem 1rem' }}>🔄 Refresh</button>
        </div>
      </div>

      <input type="text" placeholder="🔍 Search by name or email..." value={search} onChange={e => setSearch(e.target.value)}
        style={{ ...inputStyle, marginBottom: '1rem', maxWidth: '400px' }} />

      {loading ? <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>⏳ Loading students...</div> : (
        students.length === 0
          ? <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
            <p>No students registered yet. Students will appear here when they login/register.</p>
          </div>
          : <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  {['#', 'Name', 'Email', 'Department', 'Year', 'XP', 'Logins', 'Last Login', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '0.65rem 0.75rem', color: '#64748b', fontSize: '0.72rem', textAlign: 'left', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={s._id || i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '0.75rem', color: '#64748b', fontSize: '0.78rem' }}>{i + 1}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: '800', flexShrink: 0 }}>
                          {(s.name || 'S')[0].toUpperCase()}
                        </div>
                        <span style={{ color: 'white', fontWeight: '700', fontSize: '0.85rem' }}>{s.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem', color: '#94a3b8', fontSize: '0.8rem' }}>{s.email}</td>
                    <td style={{ padding: '0.75rem', color: '#94a3b8', fontSize: '0.78rem' }}>{s.department || '—'}</td>
                    <td style={{ padding: '0.75rem', color: '#94a3b8', fontSize: '0.78rem' }}>{s.year ? `Yr ${s.year}` : '—'}</td>
                    <td style={{ padding: '0.75rem', color: '#fbbf24', fontSize: '0.78rem', fontWeight: '700' }}>{s.xpPoints || 0}</td>
                    <td style={{ padding: '0.75rem', color: '#4ade80', fontSize: '0.78rem', fontWeight: '700' }}>{s.loginCount || 1}</td>
                    <td style={{ padding: '0.75rem', color: '#64748b', fontSize: '0.72rem' }}>{s.lastLogin ? new Date(s.lastLogin).toLocaleDateString() : '—'}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button onClick={() => setSelected(s)} style={btnSuccess}>View</button>
                        <button onClick={() => handleEdit(s)} style={btnEdit}>Edit</button>
                        <button onClick={() => setDeleteModal(s)} style={btnDanger}>Del</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      )}
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// GENERIC CRUD TAB (Jobs, Skills, Notes, Companies, Alumni, Mentors, Tests)
// ════════════════════════════════════════════════════════════════
function CrudTab({ config }) {
  const { title, icon, fetchFn, createFn, updateFn, deleteFn, fields, rowRenderer, searchable = true } = config
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null) // null | 'create' | 'edit'
  const [editItem, setEditItem] = useState(null)
  const [values, setValues] = useState({})
  const [deleteModal, setDeleteModal] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetchFn({ search })
      const key = Object.keys(res.data).find(k => Array.isArray(res.data[k]))
      setItems(res.data[key] || [])
      setTotal(res.data.total || 0)
    } catch { toast.error(`Failed to load ${title}`) }
    setLoading(false)
  }, [fetchFn, search, title])

  useEffect(() => { load() }, [load])

  const openCreate = () => {
    const defaults = {}
    fields.forEach(f => { defaults[f.key] = f.default || '' })
    setValues(defaults)
    setEditItem(null)
    setModal('create')
  }

  const openEdit = (item) => {
    const vals = {}
    fields.forEach(f => { vals[f.key] = item[f.key] || f.default || '' })
    setValues(vals)
    setEditItem(item)
    setModal('edit')
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (modal === 'create') {
        await createFn(values)
        toast.success(`${title.slice(0, -1)} created! ✅`)
      } else {
        await updateFn(editItem._id, values)
        toast.success(`${title.slice(0, -1)} updated! ✅`)
      }
      setModal(null)
      load()
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Save failed')
    }
    setSaving(false)
  }

  const handleDelete = async () => {
    try {
      await deleteFn(deleteModal._id)
      toast.success('Deleted successfully')
      setDeleteModal(null)
      load()
    } catch { toast.error('Delete failed') }
  }

  return (
    <div>
      {deleteModal && <ConfirmModal item={deleteModal.name || deleteModal.title || deleteModal.role || 'this item'} onConfirm={handleDelete} onCancel={() => setDeleteModal(null)} />}
      {modal && (
        <FormModal
          title={modal === 'create' ? `Add New ${icon}` : `Edit ${icon}`}
          fields={fields}
          values={values}
          onChange={(k, v) => setValues(prev => ({ ...prev, [k]: v }))}
          onSave={handleSave}
          onClose={() => setModal(null)}
          saving={saving}
        />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <h2 style={{ color: 'white', fontWeight: '900', margin: 0 }}>{icon} {title} <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '500' }}>({total.toLocaleString()})</span></h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={load} style={{ ...btnEdit, padding: '0.5rem 0.9rem' }}>🔄 Refresh</button>
          {createFn && <button onClick={openCreate} style={{ ...btnPrimary }}>{icon} Add New</button>}
        </div>
      </div>

      {searchable && (
        <input type="text" placeholder={`🔍 Search ${title.toLowerCase()}...`} value={search} onChange={e => setSearch(e.target.value)}
          style={{ ...inputStyle, marginBottom: '1rem', maxWidth: '400px' }} />
      )}

      {loading ? <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>⏳ Loading...</div> :
        items.length === 0
          ? <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
            <p>No {title.toLowerCase()} found. {createFn ? `Click "${icon} Add New" to add one.` : ''}</p>
          </div>
          : <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {items.map((item, i) => (
              <motion.div key={item._id || i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                style={{ ...card, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: '0.85rem 1.1rem' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {rowRenderer(item)}
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                  {updateFn && <button onClick={() => openEdit(item)} style={btnEdit}>✏️ Edit</button>}
                  {deleteFn && <button onClick={() => setDeleteModal(item)} style={btnDanger}>🗑️ Del</button>}
                </div>
              </motion.div>
            ))}
          </div>
      }
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// SETTINGS TAB
// ════════════════════════════════════════════════════════════════
function SettingsTab() {
  const [settings, setSettings] = useState(null)
  useEffect(() => {
    getAdminSettings().then(r => setSettings(r.data)).catch(() => { })
  }, [])

  return (
    <div>
      <h2 style={{ color: 'white', fontWeight: '900', margin: '0 0 1.5rem' }}>⚙️ System Settings</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {settings && Object.entries({
          'Admin Email': settings.adminEmail,
          'Platform': settings.platformName,
          'Database': settings.dbStatus,
          'Environment': settings.nodeEnv,
          'Version': settings.version,
          'Google Auth': settings.features?.googleAuth ? '✅ Enabled' : '❌ Not configured',
          'Gemini AI': settings.features?.geminiAI ? '✅ Enabled' : '❌ Not configured',
          'Redis': settings.features?.redis ? '✅ Connected' : '❌ Not configured'
        }).map(([k, v]) => (
          <div key={k} style={card}>
            <div style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{k}</div>
            <div style={{ color: 'white', fontWeight: '700', fontSize: '0.9rem' }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ ...card, marginTop: '1.25rem', background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.2)' }}>
        <h4 style={{ color: '#fbbf24', fontWeight: '800', margin: '0 0 0.75rem' }}>👑 Admin Credentials</h4>
        <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7 }}>
          <div><strong style={{ color: 'white' }}>Email:</strong> tarunibabu2006@gmail.com</div>
          <div><strong style={{ color: 'white' }}>Password:</strong> Set via ADMIN_PASSWORD env variable (default: prawinkumar_0704)</div>
          <div><strong style={{ color: 'white' }}>Role:</strong> Admin (full access)</div>
        </div>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// MAIN ADMIN PANEL
// ════════════════════════════════════════════════════════════════
export default function AdminPanel() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [dashData, setDashData] = useState(null)
  const [dashLoading, setDashLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    if (activeNav === 'dashboard') {
      setDashLoading(true)
      getAdminDashboard().then(r => { setDashData(r.data); setDashLoading(false) }).catch(() => setDashLoading(false))
    }
  }, [activeNav])

  // CRUD configs for each tab
  const CRUD_CONFIGS = {
    jobs: {
      title: 'Jobs', icon: '💼',
      fetchFn: getAdminJobs, createFn: createAdminJob, updateFn: updateAdminJob, deleteFn: deleteAdminJob,
      fields: [
        { key: 'company', label: 'Company Name', placeholder: 'e.g. Google' },
        { key: 'role', label: 'Job Role', placeholder: 'e.g. Software Engineer' },
        { key: 'location', label: 'Location', placeholder: 'e.g. Bangalore' },
        { key: 'ctc', label: 'CTC / Salary', placeholder: 'e.g. 8-15 LPA' },
        { key: 'experience', label: 'Experience Required', placeholder: 'e.g. Fresher / 1-3 years' },
        { key: 'type', label: 'Job Type', type: 'select', options: [{ value: 'full-time', label: 'Full-time' }, { value: 'internship', label: 'Internship' }, { value: 'part-time', label: 'Part-time' }, { value: 'contract', label: 'Contract' }] },
        { key: 'applyLink', label: 'Apply Link / URL', placeholder: 'https://...' },
        { key: 'description', label: 'Job Description', type: 'textarea', placeholder: 'Job description...' }
      ],
      rowRenderer: (item) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontWeight: '800', color: 'white', fontSize: '0.92rem' }}>{item.role}</span>
            <span style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.25)', padding: '0.1rem 0.55rem', borderRadius: '1rem', fontSize: '0.68rem', fontWeight: '700' }}>{item.status || 'active'}</span>
            {item.verified && <span style={{ color: '#60a5fa', fontSize: '0.68rem' }}>✅ Verified</span>}
          </div>
          <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: '0.15rem' }}>
            🏢 {item.company} · 📍 {item.location || 'N/A'} · 💰 {item.ctc || 'N/A'} · 👔 {item.type || 'Full-time'}
          </div>
        </div>
      )
    },
    skills: {
      title: 'Skills', icon: '📚',
      fetchFn: getAdminSkills, createFn: createAdminSkill, updateFn: updateAdminSkill, deleteFn: deleteAdminSkill,
      fields: [
        { key: 'name', label: 'Skill Name', placeholder: 'e.g. React.js' },
        { key: 'category', label: 'Category', placeholder: 'e.g. Frontend Development' },
        { key: 'domain', label: 'Domain', placeholder: 'e.g. Web Development' },
        { key: 'level', label: 'Level', type: 'select', options: [{ value: 'beginner', label: 'Beginner' }, { value: 'intermediate', label: 'Intermediate' }, { value: 'advanced', label: 'Advanced' }] },
        { key: 'duration', label: 'Duration', placeholder: 'e.g. 4 weeks' },
        { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Skill description...' }
      ],
      rowRenderer: (item) => (
        <div>
          <span style={{ fontWeight: '700', color: 'white' }}>{item.name}</span>
          <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: '0.15rem' }}>
            📂 {item.category} · 🌐 {item.domain} · ⭐ {item.level} · ⏱️ {item.duration || 'N/A'}
          </div>
        </div>
      )
    },
    notes: {
      title: 'Notes', icon: '📝',
      fetchFn: getAdminNotes, createFn: createAdminNote, updateFn: updateAdminNote, deleteFn: deleteAdminNote,
      fields: [
        { key: 'title', label: 'Note Title', placeholder: 'e.g. Data Structures - Arrays' },
        { key: 'category', label: 'Category', placeholder: 'e.g. Computer Science' },
        { key: 'subject', label: 'Subject', placeholder: 'e.g. Data Structures & Algorithms' },
        { key: 'readTime', label: 'Read Time', placeholder: 'e.g. 15 min' },
        { key: 'content', label: 'Content', type: 'textarea', placeholder: 'Note content...' }
      ],
      rowRenderer: (item) => (
        <div>
          <span style={{ fontWeight: '700', color: 'white' }}>{item.title}</span>
          <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: '0.15rem' }}>
            📂 {item.category} · 📖 {item.subject || 'N/A'} · ⏱️ {item.readTime || 'N/A'}
          </div>
        </div>
      )
    },
    companies: {
      title: 'Companies', icon: '🏢',
      fetchFn: getAdminCompanies, createFn: createAdminCompany, updateFn: updateAdminCompany, deleteFn: deleteAdminCompany,
      fields: [
        { key: 'name', label: 'Company Name', placeholder: 'e.g. Infosys' },
        { key: 'ctc', label: 'CTC Range', placeholder: 'e.g. 3.5-7 LPA' },
        { key: 'role', label: 'Primary Role', placeholder: 'e.g. Software Engineer' },
        { key: 'experiencesCount', label: 'Experience Count', type: 'number', placeholder: '0', default: '0' },
        { key: 'pastPapersCount', label: 'Past Papers Count', type: 'number', placeholder: '0', default: '0' }
      ],
      rowRenderer: (item) => (
        <div>
          <span style={{ fontWeight: '700', color: 'white', fontSize: '0.95rem' }}>{item.name}</span>
          <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: '0.15rem' }}>
            💰 {item.ctc} · 💼 {item.role} · 📝 {item.pastPapersCount || 0} papers · 💬 {item.experiencesCount || 0} experiences
          </div>
        </div>
      )
    },
    alumni: {
      title: 'Alumni', icon: '🎓',
      fetchFn: getAdminAlumni, createFn: createAdminAlumni, updateFn: updateAdminAlumni, deleteFn: deleteAdminAlumni,
      fields: [
        { key: 'name', label: 'Full Name', placeholder: 'e.g. Rahul Sharma' },
        { key: 'company', label: 'Company', placeholder: 'e.g. Google' },
        { key: 'role', label: 'Role / Designation', placeholder: 'e.g. SDE-2' },
        { key: 'batch', label: 'Batch Year', placeholder: 'e.g. 2023' },
        { key: 'img', label: 'Avatar Initial', placeholder: 'e.g. R', default: 'A' },
        { key: 'linkedinUrl', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/...' }
      ],
      rowRenderer: (item) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800', fontSize: '0.85rem' }}>
            {item.img || (item.name || 'A')[0]}
          </div>
          <div>
            <span style={{ fontWeight: '700', color: 'white' }}>{item.name}</span>
            <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>🏢 {item.company} · 💼 {item.role} · 🎓 Batch {item.batch}</div>
          </div>
        </div>
      )
    },
    mentors: {
      title: 'Mentors', icon: '🧑‍🏫',
      fetchFn: getAdminMentors, createFn: createAdminMentor, updateFn: updateAdminMentor, deleteFn: deleteAdminMentor,
      fields: [
        { key: 'name', label: 'Full Name', placeholder: 'e.g. Priya Menon' },
        { key: 'email', label: 'Email', type: 'email', placeholder: 'mentor@company.com' },
        { key: 'company', label: 'Company', placeholder: 'e.g. Amazon' },
        { key: 'role', label: 'Role', placeholder: 'e.g. Senior SDE' },
        { key: 'experience', label: 'Experience (years)', type: 'number', placeholder: '5', default: '1' },
        { key: 'rating', label: 'Rating (1-5)', type: 'number', placeholder: '4.5', default: '4.5' },
        { key: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Mentor biography...' },
        { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/...' }
      ],
      rowRenderer: (item) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: '700', color: 'white' }}>{item.name}</span>
            <span style={{ background: item.available ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: item.available ? '#4ade80' : '#f87171', border: `1px solid ${item.available ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`, padding: '0.1rem 0.5rem', borderRadius: '1rem', fontSize: '0.65rem', fontWeight: '700' }}>
              {item.available ? 'Available' : 'Busy'}
            </span>
            {item.approved && <span style={{ color: '#60a5fa', fontSize: '0.7rem' }}>✅ Approved</span>}
          </div>
          <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.15rem' }}>
            🏢 {item.company} · 💼 {item.role} · ⭐ {item.rating} · {item.experience}yr exp · {item.sessions || 0} sessions
          </div>
        </div>
      )
    },
    tests: {
      title: 'Mock Tests', icon: '📋',
      fetchFn: getAdminTests, createFn: createAdminTest, updateFn: updateAdminTest, deleteFn: deleteAdminTest,
      fields: [
        { key: 'name', label: 'Test Name', placeholder: 'e.g. TCS NQT Mock 2024' },
        { key: 'company', label: 'Company', placeholder: 'e.g. TCS' },
        { key: 'type', label: 'Type', type: 'select', options: [{ value: 'aptitude', label: 'Aptitude' }, { value: 'technical', label: 'Technical' }, { value: 'coding', label: 'Coding' }, { value: 'hr', label: 'HR' }, { value: 'mock', label: 'Full Mock' }] },
        { key: 'category', label: 'Category', placeholder: 'e.g. Placement Prep' },
        { key: 'duration', label: 'Duration (minutes)', type: 'number', placeholder: '60', default: '60' },
        { key: 'totalMarks', label: 'Total Marks', type: 'number', placeholder: '100', default: '100' },
        { key: 'difficulty', label: 'Difficulty', type: 'select', options: [{ value: 'easy', label: 'Easy' }, { value: 'medium', label: 'Medium' }, { value: 'hard', label: 'Hard' }] }
      ],
      rowRenderer: (item) => (
        <div>
          <span style={{ fontWeight: '700', color: 'white' }}>{item.name}</span>
          <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.15rem' }}>
            🏢 {item.company} · 📂 {item.type} · ⏱️ {item.duration}min · ⭐ {item.totalMarks}marks · 📊 {item.difficulty} · 🔢 {(item.questions || []).length} Qs · {item.attempts || 0} attempts
          </div>
        </div>
      )
    },
    groups: {
      title: 'Study Groups', icon: '👥',
      fetchFn: getAdminGroups, createFn: null, updateFn: null, deleteFn: deleteAdminGroup,
      fields: [],
      rowRenderer: (item) => (
        <div>
          <span style={{ fontWeight: '700', color: 'white' }}>{item.name}</span>
          <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.15rem' }}>
            👥 {(item.members || []).length} members · 📝 {(item.messages || []).length} messages · 📅 {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
          </div>
        </div>
      )
    }
  }

  const currentNavItem = NAV_ITEMS.find(n => n.id === activeNav)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>

      {/* ── SIDEBAR ───────────────────────────────────────────────── */}
      <motion.aside
        initial={{ x: -20 }} animate={{ x: 0 }}
        style={{
          width: sidebarOpen ? '220px' : '64px',
          flexShrink: 0,
          background: 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)',
          borderRight: '1px solid rgba(139,92,246,0.2)',
          display: 'flex', flexDirection: 'column',
          transition: 'width 0.25s', overflow: 'hidden',
          position: 'sticky', top: 0, height: '100vh'
        }}
      >
        {/* Sidebar Header */}
        <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button onClick={() => setSidebarOpen(p => !p)}
            style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '0.5rem', width: '32px', height: '32px', color: '#a78bfa', cursor: 'pointer', flexShrink: 0, fontSize: '1rem' }}>
            ☰
          </button>
          {sidebarOpen && (
            <div>
              <div style={{ color: 'white', fontWeight: '900', fontSize: '0.88rem', lineHeight: 1.2 }}>Admin Panel</div>
              <div style={{ color: '#64748b', fontSize: '0.62rem' }}>CampusPilot AI</div>
            </div>
          )}
        </div>

        {/* Admin User */}
        {sidebarOpen && (
          <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '800', color: '#1a1a1a', flexShrink: 0 }}>👑</div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ color: '#fbbf24', fontWeight: '800', fontSize: '0.72rem' }}>Admin</div>
              <div style={{ color: '#64748b', fontSize: '0.62rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>tarunibabu2006@gmail.com</div>
            </div>
          </div>
        )}

        {/* Nav items */}
        <nav style={{ flex: 1, padding: '0.5rem', overflowY: 'auto' }}>
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => setActiveNav(item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: sidebarOpen ? '0.65rem 0.75rem' : '0.65rem', borderRadius: '0.6rem',
                background: activeNav === item.id ? 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(37,99,235,0.25))' : 'transparent',
                border: activeNav === item.id ? '1px solid rgba(139,92,246,0.4)' : '1px solid transparent',
                color: activeNav === item.id ? '#c4b5fd' : '#64748b',
                cursor: 'pointer', marginBottom: '0.2rem', transition: 'all 0.15s',
                fontWeight: activeNav === item.id ? '800' : '600', fontSize: '0.84rem',
                textAlign: 'left', whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => { if (activeNav !== item.id) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
              onMouseLeave={e => { if (activeNav !== item.id) e.currentTarget.style.background = 'transparent' }}
              title={!sidebarOpen ? item.label : ''}
            >
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Sidebar footer */}
        {sidebarOpen && (
          <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ color: '#334155', fontSize: '0.62rem', textAlign: 'center' }}>© 2026 CampusPilot AI v2.0</div>
          </div>
        )}
      </motion.aside>

      {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
      <main style={{ flex: 1, padding: '1.5rem', overflowX: 'hidden', minWidth: 0 }}>

        {/* Page header */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>{currentNavItem?.icon}</span>
          <div>
            <h1 style={{ color: 'white', fontWeight: '900', margin: 0, fontSize: '1.3rem' }}>
              {currentNavItem?.label}
            </h1>
            <p style={{ color: '#475569', margin: '0.1rem 0 0', fontSize: '0.75rem' }}>
              CampusPilot AI Admin Panel · All data from MongoDB database
            </p>
          </div>
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div key={activeNav}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}>
            {activeNav === 'dashboard' && <AdminDashboard dashData={dashData} loading={dashLoading} />}
            {activeNav === 'students' && <StudentsTab />}
            {activeNav === 'settings' && <SettingsTab />}
            {['jobs', 'skills', 'notes', 'companies', 'alumni', 'mentors', 'tests', 'groups'].includes(activeNav) && (
              <CrudTab config={CRUD_CONFIGS[activeNav]} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
