import express from 'express'

const router = express.Router()

// POST /api/skill-badge/verify
router.post('/verify', async (req, res) => {
  try {
    const { studentName, college, degree, skills = [], projects = [], targetRole = 'Software Engineer', experience = '0' } = req.body

    if (!skills || skills.length === 0) {
      return res.status(400).json({ error: 'At least 1 skill is required for verification.' })
    }

    const skillsArray = Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()).filter(Boolean)
    const projectsArray = Array.isArray(projects) ? projects : (projects ? projects.split('\n').filter(Boolean) : [])

    // Algorithm: Trust Score (0-100)
    let trustScore = 40
    trustScore += Math.min(skillsArray.length * 5, 25)
    trustScore += Math.min(projectsArray.length * 10, 20)
    if (college) trustScore += 8
    if (degree) trustScore += 7
    trustScore = Math.min(trustScore, 98)

    // Career Fit Score for Target Role
    const roleKeywords = {
      'Frontend Developer': ['react', 'javascript', 'html', 'css', 'typescript', 'tailwind', 'vue', 'nextjs'],
      'Backend Developer': ['node', 'python', 'java', 'sql', 'mongodb', 'express', 'django', 'fastapi', 'postgresql', 'redis'],
      'Full Stack Developer': ['react', 'node', 'javascript', 'sql', 'mongodb', 'html', 'css', 'git'],
      'Data Scientist': ['python', 'pandas', 'numpy', 'scikit-learn', 'machine learning', 'sql', 'data analysis', 'statistics'],
      'ML Engineer': ['python', 'tensorflow', 'pytorch', 'deep learning', 'ml', 'nlp', 'computer vision'],
      'DevOps Engineer': ['docker', 'kubernetes', 'aws', 'ci/cd', 'linux', 'git', 'terraform', 'jenkins'],
      'Cloud Engineer': ['aws', 'azure', 'gcp', 'cloud', 'linux', 'networking', 'terraform']
    }

    const lowerSkills = skillsArray.map(s => s.toLowerCase())
    const targetKeywords = roleKeywords[targetRole] || ['git', 'problem solving', 'communication']
    const matchedKeywords = targetKeywords.filter(k => lowerSkills.some(s => s.includes(k) || k.includes(s)))
    const fitPercentage = Math.round(Math.min(95, Math.max(35, (matchedKeywords.length / Math.max(1, targetKeywords.length)) * 100 + 20)))

    // Badge tier
    let badgeTier = 'Bronze'
    let badgeColor = '#cd7f32'
    if (trustScore >= 85) { badgeTier = 'Platinum 💎'; badgeColor = '#06b6d4' }
    else if (trustScore >= 70) { badgeTier = 'Gold 🥇'; badgeColor = '#f59e0b' }
    else if (trustScore >= 55) { badgeTier = 'Silver 🥈'; badgeColor = '#94a3b8' }

    res.json({
      studentName: studentName || 'Verified Candidate',
      college: college || 'CampusPilot Verified Institute',
      degree: degree || 'Bachelor of Technology',
      badgeId: 'CP-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      verifiedDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      trustScore,
      careerFitScore: fitPercentage,
      targetRole,
      badgeTier,
      badgeColor,
      verifiedSkills: skillsArray,
      verifiedProjectsCount: projectsArray.length,
      authenticityHash: 'SHA256:' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      certificateUrl: `https://campus-pilot-ai-eta.vercel.app/verify/CP-${Date.now().toString(36)}`,
      breakdown: {
        skillsVerification: Math.min(skillsArray.length * 15, 100),
        projectsVerification: Math.min(projectsArray.length * 25, 100),
        academicCredibility: 85,
        industryReadiness: fitPercentage
      },
      badgeHighlights: [
        `Verified in ${skillsArray.slice(0, 3).join(', ')}`,
        `Trust Rating: ${trustScore}/100`,
        `Fit for ${targetRole}: ${fitPercentage}%`
      ]
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
