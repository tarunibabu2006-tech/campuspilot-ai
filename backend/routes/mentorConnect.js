import express from 'express'

const router = express.Router()

const mentorsList = [
  { id: 1, name: 'Rahul Sharma', role: 'Senior Software Engineer', company: 'Google', location: 'Bangalore', experience: '8 years', expertise: ['React', 'Node.js', 'System Design', 'DSA'], rating: 4.9, sessions: 142, available: true, linkedIn: '#', about: 'IIT Bombay grad, 8 years at Google. Expert in scalable systems and frontend architecture.' },
  { id: 2, name: 'Priya Patel', role: 'Data Scientist', company: 'Amazon', location: 'Hyderabad', experience: '6 years', expertise: ['Python', 'ML', 'Statistics', 'TensorFlow'], rating: 4.8, sessions: 98, available: true, linkedIn: '#', about: 'NIT Trichy alum with 6 years in ML and AI product development at Amazon India.' },
  { id: 3, name: 'Arun Kumar', role: 'Product Manager', company: 'Microsoft', location: 'Hyderabad', experience: '9 years', expertise: ['Product Strategy', 'Agile', 'UX Research', 'Roadmapping'], rating: 4.7, sessions: 75, available: false, linkedIn: '#', about: 'MBA from IIM-A, now leading product strategy for Microsoft Teams India.' },
  { id: 4, name: 'Sneha Reddy', role: 'HR Manager', company: 'TCS', location: 'Chennai', experience: '7 years', expertise: ['Recruitment', 'Career Counseling', 'Resume Review', 'Interview Prep'], rating: 4.8, sessions: 203, available: true, linkedIn: '#', about: 'Placed 500+ students in top IT companies. Specializes in fresher career guidance.' },
  { id: 5, name: 'Vikram Singh', role: 'DevOps Engineer', company: 'AWS', location: 'Pune', experience: '7 years', expertise: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'], rating: 4.6, sessions: 61, available: true, linkedIn: '#', about: 'AWS Certified Solutions Architect. Helps students crack cloud certifications and DevOps interviews.' },
  { id: 6, name: 'Kavya Iyer', role: 'Full Stack Developer', company: 'Flipkart', location: 'Bangalore', experience: '5 years', expertise: ['MERN Stack', 'Java Spring', 'SQL', 'REST APIs'], rating: 4.9, sessions: 88, available: true, linkedIn: '#', about: 'BITS Pilani grad. Passionate about mentoring students in full stack development and system design.' },
  { id: 7, name: 'Arjun Mehta', role: 'Cybersecurity Analyst', company: 'Infosys', location: 'Pune', experience: '6 years', expertise: ['Ethical Hacking', 'VAPT', 'SOC', 'CEH', 'CISSP'], rating: 4.7, sessions: 54, available: true, linkedIn: '#', about: 'CEH certified analyst. Guides students into cybersecurity careers from scratch.' },
  { id: 8, name: 'Divya Nair', role: 'Data Analyst', company: 'Deloitte', location: 'Chennai', experience: '4 years', expertise: ['Power BI', 'Tableau', 'SQL', 'Excel', 'Python'], rating: 4.8, sessions: 117, available: false, linkedIn: '#', about: 'Helps business and commerce students transition into analytics roles with no-code first approach.' },
  { id: 9, name: 'Sanjay Rao', role: 'Mechanical Engineer', company: 'Tata Motors', location: 'Pune', experience: '10 years', expertise: ['AutoCAD', 'ANSYS', 'Product Design', 'Manufacturing'], rating: 4.6, sessions: 38, available: true, linkedIn: '#', about: 'Core mechanical engineer mentoring students for PSU and core engineering roles.' },
  { id: 10, name: 'Pooja Krishnan', role: 'Finance Analyst', company: 'HDFC Bank', location: 'Mumbai', experience: '5 years', expertise: ['CFA', 'Financial Modelling', 'Valuation', 'Investment Banking'], rating: 4.9, sessions: 72, available: true, linkedIn: '#', about: 'CA + CFA. Mentors commerce students for investment banking and finance analyst roles.' }
]

// GET /api/mentors
router.get('/', async (req, res) => {
  try {
    const { domain, search } = req.query
    let filtered = [...mentorsList]

    if (search) {
      const s = search.toLowerCase()
      filtered = filtered.filter(m =>
        m.name.toLowerCase().includes(s) ||
        m.company.toLowerCase().includes(s) ||
        m.role.toLowerCase().includes(s) ||
        m.expertise.some(e => e.toLowerCase().includes(s))
      )
    }

    if (domain) {
      filtered = filtered.filter(m =>
        m.expertise.some(e => e.toLowerCase().includes(domain.toLowerCase())) ||
        m.role.toLowerCase().includes(domain.toLowerCase())
      )
    }

    res.json({ mentors: filtered, total: filtered.length })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/mentors/connect
router.post('/connect', async (req, res) => {
  try {
    const { mentorId, message } = req.body

    if (!mentorId) {
      return res.status(400).json({ error: 'mentorId is required' })
    }

    const mentor = mentorsList.find(m => m.id === mentorId)
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' })
    }

    if (!mentor.available) {
      return res.status(400).json({ error: `${mentor.name} is currently unavailable. Try another mentor.` })
    }

    res.json({
      success: true,
      message: `✅ Connection request sent to ${mentor.name} at ${mentor.company}! They will respond within 24 hours.`,
      mentor: { name: mentor.name, company: mentor.company, role: mentor.role }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
