import express from 'express'
import { analyzeSkillGap } from '../controllers/geminiController.js'

const router = express.Router()

// GET /api/career-gps/roles
router.get('/roles', (req, res) => {
  const allRoles = [
    // Tech
    'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
    'Data Scientist', 'ML Engineer', 'AI Engineer', 'DevOps Engineer',
    'Cloud Engineer', 'Cybersecurity Analyst', 'Game Developer',
    'Mobile Developer (Android)', 'Mobile Developer (iOS)', 'Flutter Developer',
    'Software Engineer', 'QA Engineer', 'System Architect',
    'Blockchain Developer', 'IoT Engineer', 'AR/VR Developer',
    'Data Analyst', 'Database Administrator', 'Network Engineer',
    'Embedded Systems Engineer', 'Computer Vision Engineer',
    'NLP Engineer', 'Site Reliability Engineer',
    // Business
    'Marketing Manager', 'Digital Marketing Specialist', 'HR Manager',
    'Finance Manager', 'Sales Manager', 'Operations Manager',
    'Business Analyst', 'Management Consultant', 'Project Manager',
    'Product Manager', 'Supply Chain Manager', 'E-commerce Manager',
    'Brand Manager', 'Content Strategist', 'SEO Specialist',
    // Medical
    'Doctor (MBBS)', 'Nurse', 'Pharmacist', 'Lab Technician',
    'Physiotherapist', 'Radiologist', 'Surgeon', 'Dentist',
    'Veterinarian', 'Nutritionist', 'Psychologist', 'Psychiatrist',
    // Law
    'Corporate Lawyer', 'Criminal Lawyer', 'Legal Advisor',
    'Patent Lawyer', 'Civil Rights Lawyer', 'Family Lawyer',
    // Arts & Design
    'Graphic Designer', 'UI/UX Designer', 'Interior Designer',
    'Journalist', 'Content Writer', 'Film Director', 'Photographer',
    'Musician', 'Actor', 'Animator', 'Video Editor',
    // Education
    'Teacher', 'Professor', 'School Principal', 'Career Counselor',
    'Training & Development Manager', 'E-Learning Developer',
    // Engineering
    'Mechanical Engineer', 'Civil Engineer', 'Electrical Engineer',
    'Chemical Engineer', 'Aerospace Engineer', 'Structural Engineer',
    'Environmental Engineer', 'Biomedical Engineer', 'Industrial Engineer',
    // Finance
    'Chartered Accountant (CA)', 'Investment Banker', 'Financial Analyst',
    'Actuary', 'Stock Broker', 'Tax Consultant', 'Auditor',
    // Government & PSU
    'IAS Officer', 'IPS Officer', 'IFS Officer', 'Bank PO',
    'SSC Officer', 'Defence Officer', 'Railway Engineer'
  ]
  res.json({ roles: allRoles, total: allRoles.length })
})

// POST /api/career-gps/analyze
router.post('/analyze', async (req, res) => {
  try {
    const { currentSkills, targetRole, experience, education } = req.body

    if (!currentSkills || !targetRole) {
      return res.status(400).json({ error: 'currentSkills and targetRole are required' })
    }

    const skillsArray = Array.isArray(currentSkills)
      ? currentSkills
      : currentSkills.split(',').map(s => s.trim()).filter(Boolean)

    const result = await analyzeSkillGap(skillsArray, targetRole, 'en')

    // Enrich with experience & education context
    result.profileSummary = {
      currentSkills: skillsArray,
      targetRole,
      experience: experience || '0 years',
      education: education || 'Not specified'
    }

    res.json(result)
  } catch (error) {
    console.error('Career GPS error:', error.message)
    res.status(500).json({ error: 'Analysis failed. Please try again.' })
  }
})

export default router
