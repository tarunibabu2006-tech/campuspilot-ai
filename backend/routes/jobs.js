import express from 'express'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Jobs database
const jobsDB = [
  { id: '1', title: 'Software Engineer', company: 'TCS', location: 'Chennai', salary: '3.5-6 LPA', experience: 'Fresher', type: 'Full-time', skills: ['Java', 'SQL', 'Spring'], description: 'Join TCS as a Software Engineer. Work on enterprise applications.', applyLink: 'https://www.tcs.com/careers', featured: true, postedAt: '2026-08-01' },
  { id: '2', title: 'Systems Engineer', company: 'Infosys', location: 'Bangalore', salary: '3.6-5.5 LPA', experience: 'Fresher', type: 'Full-time', skills: ['Python', 'Java', 'SQL'], description: 'Infosys Systems Engineer role for fresh graduates.', applyLink: 'https://www.infosys.com/careers', featured: true, postedAt: '2026-08-02' },
  { id: '3', title: 'Project Engineer', company: 'Wipro', location: 'Hyderabad', salary: '3.5-5 LPA', experience: 'Fresher', type: 'Full-time', skills: ['Java', 'Python', 'SQL', 'Testing'], description: 'Wipro Project Engineer for campus hires.', applyLink: 'https://careers.wipro.com/', featured: false, postedAt: '2026-08-03' },
  { id: '4', title: 'SDE-1', company: 'Amazon', location: 'Bangalore', salary: '15-25 LPA', experience: '0-2 years', type: 'Full-time', skills: ['DSA', 'System Design', 'Java/Python'], description: 'Amazon SDE-1 role. Strong DSA skills required.', applyLink: 'https://www.amazon.jobs/', featured: true, postedAt: '2026-08-04' },
  { id: '5', title: 'Software Engineer L3', company: 'Google', location: 'Bangalore', salary: '25-45 LPA', experience: '0-3 years', type: 'Full-time', skills: ['DSA', 'System Design', 'C++/Python'], description: 'Google L3 Software Engineer. Competitive coding required.', applyLink: 'https://careers.google.com/', featured: true, postedAt: '2026-08-05' },
  { id: '6', title: 'SDE', company: 'Microsoft', location: 'Hyderabad', salary: '18-30 LPA', experience: '0-2 years', type: 'Full-time', skills: ['C++', 'DSA', 'OS', 'DBMS'], description: 'Microsoft Software Development Engineer role.', applyLink: 'https://careers.microsoft.com/', featured: true, postedAt: '2026-08-06' },
  { id: '7', title: 'Data Analyst', company: 'Deloitte', location: 'Mumbai', salary: '5-8 LPA', experience: 'Fresher', type: 'Full-time', skills: ['Python', 'SQL', 'Tableau', 'Excel'], description: 'Data Analyst position at Deloitte India.', applyLink: 'https://www2.deloitte.com/careers', featured: false, postedAt: '2026-08-07' },
  { id: '8', title: 'Frontend Developer', company: 'Flipkart', location: 'Bangalore', salary: '12-20 LPA', experience: '0-2 years', type: 'Full-time', skills: ['React', 'JavaScript', 'CSS', 'TypeScript'], description: 'Frontend role at Flipkart. React expertise needed.', applyLink: 'https://www.flipkartcareers.com/', featured: false, postedAt: '2026-08-08' },
  { id: '9', title: 'Associate Engineer', company: 'Cognizant', location: 'Chennai', salary: '3-5 LPA', experience: 'Fresher', type: 'Full-time', skills: ['Java', '.NET', 'SQL'], description: 'Cognizant GenC program for freshers.', applyLink: 'https://careers.cognizant.com/', featured: false, postedAt: '2026-08-08' },
  { id: '10', title: 'Backend Developer', company: 'Zoho', location: 'Chennai', salary: '6-12 LPA', experience: '0-2 years', type: 'Full-time', skills: ['Java', 'C++', 'DSA', 'DBMS'], description: 'Zoho backend developer. Strong programming fundamentals.', applyLink: 'https://www.zoho.com/careers.html', featured: true, postedAt: '2026-08-09' },
  { id: '11', title: 'ML Engineer', company: 'PhonePe', location: 'Bangalore', salary: '15-25 LPA', experience: '1-3 years', type: 'Full-time', skills: ['Python', 'ML', 'Deep Learning', 'SQL'], description: 'ML Engineer role at PhonePe.', applyLink: 'https://www.phonepe.com/careers/', featured: false, postedAt: '2026-08-09' },
  { id: '12', title: 'DevOps Engineer', company: 'Accenture', location: 'Pune', salary: '5-10 LPA', experience: '0-2 years', type: 'Full-time', skills: ['Docker', 'AWS', 'Linux', 'CI/CD'], description: 'DevOps role at Accenture India.', applyLink: 'https://www.accenture.com/careers', featured: false, postedAt: '2026-08-10' },
  { id: '13', title: 'Content Writer', company: 'Byju\'s', location: 'Bangalore', salary: '3-5 LPA', experience: 'Fresher', type: 'Full-time', skills: ['Writing', 'Research', 'SEO'], description: 'Content Writer for educational platform.', applyLink: 'https://byjus.com/careers/', featured: false, postedAt: '2026-08-10' },
  { id: '14', title: 'Graphic Designer', company: 'Swiggy', location: 'Bangalore', salary: '4-7 LPA', experience: '0-2 years', type: 'Full-time', skills: ['Photoshop', 'Illustrator', 'Figma'], description: 'Graphic Designer for marketing team.', applyLink: 'https://careers.swiggy.com/', featured: false, postedAt: '2026-08-11' },
  { id: '15', title: 'Digital Marketing Exec', company: 'Zomato', location: 'Gurgaon', salary: '3-6 LPA', experience: 'Fresher', type: 'Full-time', skills: ['SEO', 'Social Media', 'Analytics'], description: 'Digital marketing role at Zomato.', applyLink: 'https://www.zomato.com/careers', featured: false, postedAt: '2026-08-11' },
  { id: '16', title: 'Mobile Developer', company: 'Paytm', location: 'Noida', salary: '10-18 LPA', experience: '0-2 years', type: 'Full-time', skills: ['Flutter', 'React Native', 'Kotlin'], description: 'Mobile app developer at Paytm.', applyLink: 'https://paytm.com/careers', featured: false, postedAt: '2026-08-12' },
  { id: '17', title: 'Cybersecurity Analyst', company: 'HCL', location: 'Noida', salary: '5-10 LPA', experience: '0-2 years', type: 'Full-time', skills: ['Security', 'Networking', 'Linux'], description: 'Cybersecurity role at HCL Technologies.', applyLink: 'https://www.hcltech.com/careers', featured: false, postedAt: '2026-08-12' },
  { id: '18', title: 'HR Executive', company: 'Reliance', location: 'Mumbai', salary: '4-7 LPA', experience: 'Fresher', type: 'Full-time', skills: ['Recruitment', 'HR Policies', 'Communication'], description: 'HR Executive at Reliance Industries.', applyLink: 'https://careers.ril.com/', featured: false, postedAt: '2026-08-12' }
]

// Get all jobs with filters
router.get('/', (req, res) => {
  const { company, location, experience, search, salary, type } = req.query
  let jobs = [...jobsDB]

  if (company) jobs = jobs.filter(j => j.company.toLowerCase().includes(company.toLowerCase()))
  if (location) jobs = jobs.filter(j => j.location.toLowerCase().includes(location.toLowerCase()))
  if (experience) jobs = jobs.filter(j => j.experience.toLowerCase().includes(experience.toLowerCase()))
  if (type) jobs = jobs.filter(j => j.type === type)
  if (search) {
    const q = search.toLowerCase()
    jobs = jobs.filter(j =>
      j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      j.skills.some(s => s.toLowerCase().includes(q))
    )
  }

  const featured = jobs.filter(j => j.featured)
  res.json({ jobs, featured, total: jobs.length })
})

// Get stats
router.get('/stats', (req, res) => {
  res.json({ count: jobsDB.length })
})

// Get job by ID
router.get('/:id', (req, res) => {
  const job = jobsDB.find(j => j.id === req.params.id)
  if (!job) return res.status(404).json({ message: 'Job not found' })
  res.json({ job })
})

// Save job
router.post('/save', protect, (req, res) => {
  const { jobId } = req.body
  res.json({ message: 'Job saved successfully', jobId })
})

// Apply for job
router.post('/apply', protect, (req, res) => {
  const { jobId } = req.body
  res.json({ message: 'Application submitted successfully', jobId, appliedAt: new Date().toISOString() })
})

export default router
