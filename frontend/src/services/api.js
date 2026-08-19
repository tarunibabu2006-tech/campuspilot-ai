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
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
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

// Auth
export const loginUser = (data) => api.post('/auth/login', data)
export const registerUser = (data) => api.post('/auth/register', data)
export const googleAuth = (data) => api.post('/auth/google', data)
export const getCurrentUser = () => api.get('/auth/me')
export const logoutUser = () => api.post('/auth/logout')

// Skills
export const getSkills = (params) => api.get('/skills', { params })
export const getSkillById = (id) => api.get(`/skills/${id}`)
export const getAllRoles = (params) => api.get('/skills/roles/all', { params })
export const getRoleDetails = (roleName) => api.get(`/skills/roles/${encodeURIComponent(roleName)}`)
export const updateSkillProgress = (data) => api.post('/skills/progress', data)

// Jobs
export const getJobs = (params) => api.get('/jobs', { params })
export const getJobById = (id) => api.get(`/jobs/${id}`)
export const saveJob = (data) => api.post('/jobs/save', data)
export const applyJob = (data) => api.post('/jobs/apply', data)

// Resume
export const saveResume = (data) => api.post('/resume/save', data)

// Interview
export const getInterviewQuestions = (role, difficulty) => api.get(`/interview/questions/${encodeURIComponent(role)}`, { params: { difficulty } })
export const evaluateAnswer = (data) => api.post('/interview/evaluate', data)
export const getInterviewRoles = () => api.get('/interview/roles')

// Aptitude
export const getAptitudeQuestions = (params) => api.get('/interview/aptitude', { params })
export const submitAptitudeTest = (data) => api.post('/interview/aptitude/submit', data)

// Admin
export const getAdminDashboard = () => api.get('/admin/dashboard')
export const getAdminStudents = () => api.get('/admin/students')
export const getAdminJobs = () => api.get('/admin/jobs')
export const postAdminJob = (data) => api.post('/admin/jobs', data)

// AI-powered features (Gemini)
export const generateExamPlan = (data) => api.post('/exam-emergency', data)
export const conductViva = (data) => api.post('/viva-prep', data)
export const getPlacementRoadmap = (data) => api.post('/placements', data)
export const processNotes = (data) => api.post('/notes-hub/process', data)
export const generateFlashcards = (data) => api.post('/notes-hub/flashcards', data)
export const calculateBunks = (data) => api.post('/bunk-planner', data)
export const checkJob = (data) => api.post('/check-job', data)
export const analyzeSkillGap = (data) => api.post('/skill-gap', data)
export const chatWithAI = (data) => api.post('/chat', data)

export default api
