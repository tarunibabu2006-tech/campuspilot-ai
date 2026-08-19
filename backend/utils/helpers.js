export const formatResponse = (data, status = 200) => ({
  success: status >= 200 && status < 300,
  timestamp: new Date().toISOString(),
  data
})

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  return input.replace(/<[^>]*>/g, '').trim()
}

export const calculateAttendance = (total, attended) => {
  const percentage = ((attended / total) * 100).toFixed(2)
  const canBunk = Math.max(0, Math.floor(attended / 0.75 - total))
  const needToAttend = percentage < 75
    ? Math.ceil((0.75 * total - attended) / (1 - 0.75))
    : 0
  return { percentage, canBunk, needToAttend, isSafe: percentage >= 75 }
}

export const getLanguageName = (code) => {
  const langs = { en: 'English', ta: 'Tamil', hi: 'Hindi' }
  return langs[code] || 'English'
}
