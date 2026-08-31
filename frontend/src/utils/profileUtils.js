/**
 * profileUtils.js
 * REAL DATA ONLY calculations for CampusPilot AI Job Portal & Career Matching
 */

/**
 * Calculate REAL match percentage between a student and a job.
 * Weights:
 * - Skills Match: 50%
 * - Education Match: 20%
 * - Experience Match: 20%
 * - Location Match: 10%
 *
 * @param {Object} student - Student profile object (skills, education/department, experience, location/city/state)
 * @param {Object} job - Job object (skills, requiredEducation, requiredExperience/experience, location)
 * @returns {{ matchPercentage: number, matchedSkills: string[], missingSkills: string[], total: number }}
 */
export const calculateMatch = (student, job) => {
  if (!student || !job) {
    return { matchPercentage: 0, matchedSkills: [], missingSkills: [], total: 100 }
  }

  const studentSkills = (student.skills || []).map(s => String(s).toLowerCase().trim()).filter(Boolean)
  const rawJobSkills = Array.isArray(job.skills)
    ? job.skills
    : typeof job.skills === 'string'
      ? job.skills.split(',').map(s => s.trim())
      : []
  const jobSkills = rawJobSkills.map(s => String(s).toLowerCase().trim()).filter(Boolean)

  let match = 0
  let total = 0
  let matchedSkills = []
  let missingSkills = []

  // 1. Skills Match (50%)
  if (jobSkills.length > 0) {
    matchedSkills = rawJobSkills.filter(js => {
      const lower = js.toLowerCase().trim()
      return studentSkills.some(ss => ss === lower || ss.includes(lower) || lower.includes(ss))
    })
    missingSkills = rawJobSkills.filter(js => !matchedSkills.includes(js))

    if (studentSkills.length > 0) {
      match += (matchedSkills.length / jobSkills.length) * 50
    }
    total += 50
  }

  // 2. Education Match (20%)
  const studentEdu = (student.education || student.department || student.college || '').toLowerCase().trim()
  const jobEdu = (job.requiredEducation || job.education || '').toLowerCase().trim()

  if (jobEdu) {
    if (studentEdu) {
      const isDirectMatch = studentEdu === jobEdu || studentEdu.includes(jobEdu) || jobEdu.includes(studentEdu)
      const isGeneralGraduate = jobEdu.includes('degree') || jobEdu.includes('bachelor') || jobEdu.includes('graduate') || jobEdu.includes('b.tech') || jobEdu.includes('b.e')

      if (isDirectMatch || (isGeneralGraduate && (studentEdu.includes('b.tech') || studentEdu.includes('b.e') || studentEdu.includes('b.sc') || studentEdu.includes('bca') || studentEdu.includes('mca')))) {
        match += 20
      } else {
        match += 10
      }
    }
    total += 20
  }

  // 3. Experience Match (20%)
  const studentExpYears = typeof student.experience === 'number'
    ? student.experience
    : (parseFloat(student.experience) || 0)

  let requiredExpYears = 0
  if (typeof job.requiredExperience === 'number') {
    requiredExpYears = job.requiredExperience
  } else if (typeof job.experience === 'string') {
    const isFresher = /fresher|intern|pre-final|entry/i.test(job.experience)
    if (isFresher) {
      requiredExpYears = 0
    } else {
      const numbers = job.experience.match(/\d+/)
      requiredExpYears = numbers ? parseInt(numbers[0], 10) : 0
    }
  }

  if (requiredExpYears === 0) {
    // Fresher friendly role - full credit if student has education
    match += studentEdu ? 20 : 10
    total += 20
  } else {
    if (studentExpYears >= requiredExpYears) {
      match += 20
    } else if (studentExpYears > 0) {
      match += (studentExpYears / requiredExpYears) * 20
    }
    total += 20
  }

  // 4. Location Match (10%)
  const studentLocation = (student.location || student.city || student.state || '').toLowerCase().trim()
  const jobLocation = (job.location || '').toLowerCase().trim()

  if (jobLocation) {
    if (studentLocation) {
      const isLocMatch =
        jobLocation.includes(studentLocation) ||
        studentLocation.includes(jobLocation) ||
        jobLocation.includes('pan india') ||
        jobLocation.includes('remote') ||
        jobLocation.includes('hybrid')
      match += isLocMatch ? 10 : 3
    }
    total += 10
  }

  const matchPercentage = total > 0 ? Math.round((match / total) * 100) : 0

  return {
    matchPercentage,
    matchedSkills,
    missingSkills,
    total
  }
}

/**
 * Calculate Student Profile Completion Percentage
 * Formula:
 * - Name: 20%
 * - Education/Department: 20%
 * - Skills (>0 skills): 30%
 * - Experience/Year/Semester: 15%
 * - Location/City/State: 15%
 *
 * @param {Object} student
 * @returns {number} 0 to 100
 */
export const getProfileCompletion = (student) => {
  if (!student) return 0
  let completed = 0
  if (student.name && student.name.trim().length > 0) completed += 20
  if (student.department || student.education || student.college) completed += 20
  if (Array.isArray(student.skills) && student.skills.length > 0) completed += 30
  if (student.experience !== undefined || student.year || student.semester) completed += 15
  if (student.city || student.location || student.state) completed += 15
  return Math.min(100, completed)
}

/**
 * Get match rating level: 'high' (>=70), 'medium' (>=40), 'low' (<40)
 */
export const getMatchLevel = (percentage) => {
  if (percentage >= 70) return 'high'
  if (percentage >= 40) return 'medium'
  return 'low'
}
