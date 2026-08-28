import axios from 'axios'

const API_BASE = '/api'

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('campuspilot_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('campuspilot_token')
      localStorage.removeItem('campuspilot_user')
    }
    return Promise.reject(error)
  }
)

// Health check
export const checkHealth = () => api.get('/health')

// ── Auth ──────────────────────────────────────────────────────
export const loginUser = (data) => api.post('/auth/login', data)
export const registerUser = (data) => api.post('/auth/register', data)
export const googleAuth = (data) => api.post('/auth/google', data)
export const getCurrentUser = () => api.get('/auth/me')
export const logoutUser = () => api.post('/auth/logout')

// ── Skills ────────────────────────────────────────────────────
export const getSkills = (params) => api.get('/skills', { params })
export const getSkillById = (id) => api.get(`/skills/${id}`)
export const getAllRoles = (params) => api.get('/skills/roles/all', { params })
export const getRoleDetails = (roleName) => api.get(`/skills/roles/${encodeURIComponent(roleName)}`)
export const updateSkillProgress = (data) => api.post('/skills/progress', data)

// ── Jobs ──────────────────────────────────────────────────────
export const getJobs = (params) => api.get('/jobs', { params })
export const getJobById = (id) => api.get(`/jobs/${id}`)
export const saveJob = (data) => api.post('/jobs/save', data)
export const applyJob = (data) => api.post('/jobs/apply', data)

// ── Resume ────────────────────────────────────────────────────
export const saveResume = (data) => api.post('/resume/save', data)

// ── Interview ────────────────────────────────────────────────
export const getInterviewQuestions = (role, difficulty) => api.get(`/interview/questions/${encodeURIComponent(role)}`, { params: { difficulty } })
export const evaluateAnswer = (data) => api.post('/interview/evaluate', data)
export const getInterviewRoles = () => api.get('/interview/roles')

// ── Aptitude ─────────────────────────────────────────────────
export const getAptitudeQuestions = (params) => api.get('/interview/aptitude', { params })
export const submitAptitudeTest = (data) => api.post('/interview/aptitude/submit', data)

// ── AI-powered features ───────────────────────────────────────
export const generateExamPlan = (data) => api.post('/exam-emergency', data)
export const conductViva = (data) => api.post('/viva-prep', data)
export const getPlacementRoadmap = (data) => api.post('/placements', data)
export const processNotes = (data) => api.post('/notes-hub/process', data)
export const generateFlashcards = (data) => api.post('/notes-hub/flashcards', data)
export const calculateBunks = (data) => api.post('/bunk-planner', data)
export const checkJob = (data) => api.post('/check-job', data)
export const analyzeSkillGap = (data) => api.post('/skill-gap', data)
export const chatWithAI = (data) => api.post('/chat', data)

// ════════════════════════════════════════════════════════════════
// ADMIN API — All CRUD operations
// ════════════════════════════════════════════════════════════════

// Dashboard
export const getAdminDashboard = () => api.get('/admin/dashboard')
export const getAdminSettings = () => api.get('/admin/settings')

// Students
export const getAdminStudents = (params) => api.get('/admin/students', { params })
export const getAdminStudent = (id) => api.get(`/admin/students/${id}`)
export const updateAdminStudent = (id, data) => api.put(`/admin/students/${id}`, data)
export const deleteAdminStudent = (id) => api.delete(`/admin/students/${id}`)
export const resetStudentPassword = (id, data) => api.post(`/admin/students/${id}/reset-password`, data)
export const exportStudentsCSV = () => api.get('/admin/students/export/csv', { responseType: 'blob' })

// Jobs
export const getAdminJobs = (params) => api.get('/admin/jobs', { params })
export const createAdminJob = (data) => api.post('/admin/jobs', data)
export const updateAdminJob = (id, data) => api.put(`/admin/jobs/${id}`, data)
export const deleteAdminJob = (id) => api.delete(`/admin/jobs/${id}`)

// Skills
export const getAdminSkills = (params) => api.get('/admin/skills', { params })
export const createAdminSkill = (data) => api.post('/admin/skills', data)
export const updateAdminSkill = (id, data) => api.put(`/admin/skills/${id}`, data)
export const deleteAdminSkill = (id) => api.delete(`/admin/skills/${id}`)
export const bulkCreateSkills = (data) => api.post('/admin/skills/bulk', data)

// Notes
export const getAdminNotes = (params) => api.get('/admin/notes', { params })
export const createAdminNote = (data) => api.post('/admin/notes', data)
export const updateAdminNote = (id, data) => api.put(`/admin/notes/${id}`, data)
export const deleteAdminNote = (id) => api.delete(`/admin/notes/${id}`)

// Companies / Archives
export const getAdminCompanies = (params) => api.get('/admin/companies', { params })
export const createAdminCompany = (data) => api.post('/admin/companies', data)
export const updateAdminCompany = (id, data) => api.put(`/admin/companies/${id}`, data)
export const deleteAdminCompany = (id) => api.delete(`/admin/companies/${id}`)

// Alumni
export const getAdminAlumni = (params) => api.get('/admin/alumni', { params })
export const createAdminAlumni = (data) => api.post('/admin/alumni', data)
export const updateAdminAlumni = (id, data) => api.put(`/admin/alumni/${id}`, data)
export const deleteAdminAlumni = (id) => api.delete(`/admin/alumni/${id}`)

// Mentors
export const getAdminMentors = (params) => api.get('/admin/mentors', { params })
export const createAdminMentor = (data) => api.post('/admin/mentors', data)
export const updateAdminMentor = (id, data) => api.put(`/admin/mentors/${id}`, data)
export const deleteAdminMentor = (id) => api.delete(`/admin/mentors/${id}`)

// Tests
export const getAdminTests = (params) => api.get('/admin/tests', { params })
export const createAdminTest = (data) => api.post('/admin/tests', data)
export const updateAdminTest = (id, data) => api.put(`/admin/tests/${id}`, data)
export const deleteAdminTest = (id) => api.delete(`/admin/tests/${id}`)

// Groups
export const getAdminGroups = () => api.get('/admin/groups')
export const deleteAdminGroup = (id) => api.delete(`/admin/groups/${id}`)

// XP Management
export const resetAllStudentXP = () => api.post('/admin/students/reset-xp')

export default api
