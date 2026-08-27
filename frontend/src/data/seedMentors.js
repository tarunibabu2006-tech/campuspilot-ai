// ============================================================
// seedMentors.js — 100+ Verified Industry Mentors
// Used by: MentorConnect, AlumniNetwork, AdminPanel
// ============================================================

const BASE_MENTORS = [
  {
    id: 'm1',
    name: 'Anish Sundaram',
    role: 'Senior Software Engineer',
    company: 'Google India',
    location: 'Bengaluru, KA',
    experience: '8+ years',
    expertise: ['Data Structures & Algorithms', 'System Design', 'Backend Development', 'Career Guidance'],
    rating: 4.9,
    reviews: 142,
    sessionsConducted: 245,
    sessionPrice: 'Free (CampusPilot Verified)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    bio: 'Ex-Amazon, currently SDE-3 at Google. Helped 200+ students crack FAANG interviews through structured 1-on-1 mock interviews and resume reviews.',
    availableDays: ['Saturday', 'Sunday'],
    alumniCollege: 'IIT Madras (B.Tech CSE 2018)'
  },
  {
    id: 'm2',
    name: 'Priya Ramakrishnan',
    role: 'Lead Data Scientist',
    company: 'Microsoft India',
    location: 'Hyderabad, TS',
    experience: '7+ years',
    expertise: ['Machine Learning', 'Python for Data Science', 'AI Career Prep', 'Interview Practice'],
    rating: 4.9,
    reviews: 118,
    sessionsConducted: 180,
    sessionPrice: 'Free (CampusPilot Verified)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    bio: 'Lead ML Engineer building AI capabilities into Azure. Passionate about guiding non-CS students to transition into Data Science and AI roles.',
    availableDays: ['Friday', 'Saturday'],
    alumniCollege: 'Anna University (B.E. ECE 2017)'
  },
  {
    id: 'm3',
    name: 'Karthik Venkatesh',
    role: 'Staff Product Manager',
    company: 'Flipkart',
    location: 'Bengaluru, KA',
    experience: '10+ years',
    expertise: ['Product Management', 'Product Design', 'GTM Strategy', 'MBA Prep'],
    rating: 4.8,
    reviews: 95,
    sessionsConducted: 150,
    sessionPrice: 'Free (CampusPilot Verified)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    bio: 'Leading Flipkart search & recommendation team. Guides students on breaking into APM (Associate Product Manager) roles from engineering and MBA backgrounds.',
    availableDays: ['Sunday'],
    alumniCollege: 'IIM Ahmedabad (MBA 2016)'
  },
  {
    id: 'm4',
    name: 'Divya Nambiar',
    role: 'DevOps & Cloud Architect',
    company: 'AWS India',
    location: 'Chennai, TN',
    experience: '9+ years',
    expertise: ['AWS Solutions Architecture', 'Kubernetes & Docker', 'Terraform CI/CD', 'Cloud Certifications'],
    rating: 4.95,
    reviews: 130,
    sessionsConducted: 210,
    sessionPrice: 'Free (CampusPilot Verified)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    bio: 'AWS Certified Solutions Architect Professional. Helps students clear cloud certifications and build production-grade DevOps portfolios.',
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    alumniCollege: 'NIT Trichy (B.Tech EEE 2015)'
  },
  {
    id: 'm5',
    name: 'Raghavan Iyer',
    role: 'Assistant Director (IAS Cadre)',
    company: 'Govt. of India',
    location: 'New Delhi',
    experience: '12+ years',
    expertise: ['UPSC Civil Services Strategy', 'Mains Answer Writing', 'Interview Personality Guidance'],
    rating: 5.0,
    reviews: 210,
    sessionsConducted: 320,
    sessionPrice: 'Free (CampusPilot Verified)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    bio: 'Secured Rank 42 in UPSC Civil Services Exam. Mentors serious IAS/IPS aspirants on mains answer writing and interview personality test.',
    availableDays: ['Sunday'],
    alumniCollege: 'Delhi University (B.A. Hons)'
  },
  {
    id: 'm6',
    name: 'Siddharth Nair',
    role: 'Founding Engineer',
    company: 'Razorpay',
    location: 'Bengaluru, KA',
    experience: '6+ years',
    expertise: ['FinTech', 'Golang', 'System Design', 'Startup Careers'],
    rating: 4.85,
    reviews: 88,
    sessionsConducted: 140,
    sessionPrice: 'Free (CampusPilot Verified)',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150',
    bio: 'Built core payment gateway APIs at Razorpay processing millions of transactions per day. Helps students prepare for high-growth tech startups.',
    availableDays: ['Saturday'],
    alumniCollege: 'NIT Calicut (B.Tech CSE 2019)'
  },
  {
    id: 'm7',
    name: 'Meera Chawla',
    role: 'Senior UX Designer',
    company: 'Zoho Corporation',
    location: 'Chennai, TN',
    experience: '7+ years',
    expertise: ['Figma Mastery', 'Design Systems', 'UX Portfolio Review', 'Product Design'],
    rating: 4.9,
    reviews: 104,
    sessionsConducted: 165,
    sessionPrice: 'Free (CampusPilot Verified)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    bio: 'Designed flagship Zoho productivity suites used by millions worldwide. Specializes in reviewing student portfolios and case studies.',
    availableDays: ['Wednesday', 'Saturday'],
    alumniCollege: 'NID Ahmedabad (B.Des)'
  },
  {
    id: 'm8',
    name: 'Arun Kumar Subash',
    role: 'Cybersecurity Consultant',
    company: 'PwC India',
    location: 'Mumbai, MH',
    experience: '8+ years',
    expertise: ['Ethical Hacking', 'SOC Operations', 'CEH / CISSP Prep', 'VAPT Testing'],
    rating: 4.75,
    reviews: 76,
    sessionsConducted: 110,
    sessionPrice: 'Free (CampusPilot Verified)',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    bio: 'Certified Ethical Hacker conducting penetration testing for leading Indian banks. Guides students on cybersecurity career paths and certifications.',
    availableDays: ['Sunday'],
    alumniCollege: 'PSG College of Technology'
  }
]

// Expand to 100+ Verified Mentors from Google, Microsoft, Amazon, TCS, Infosys, Flipkart, Zoho, ISRO, DRDO, HDFC, L&T, Swiggy, etc.
const MENTOR_FIRST_NAMES = ['Aravind', 'Sneha', 'Vikram', 'Deepa', 'Gautam', 'Kavitha', 'Suresh', 'Ananya', 'Rohan', 'Harini', 'Abhishek', 'Pooja', 'Naveen', 'Swati', 'Manish', 'Bhavna', 'Pranav', 'Tanvi', 'Aditya', 'Roshni', 'Kiran', 'Shreya', 'Ashwin', 'Divya']
const MENTOR_LAST_NAMES = ['Sharma', 'Verma', 'Menon', 'Reddy', 'Patel', 'Krishnan', 'Narayanan', 'Murthy', 'Gupta', 'Banerjee', 'Rao', 'Deshmukh', 'Choudhury', 'Iyer', 'Bhattacharya', 'Kulkarni']
const MENTOR_COMPANIES = ['Google India', 'Microsoft India', 'Amazon India', 'Flipkart', 'Zoho', 'Razorpay', 'PhonePe', 'Swiggy', 'Zomato', 'TCS', 'Infosys', 'Wipro', 'HCL', 'Cognizant', 'L&T', 'ISRO', 'DRDO', 'HDFC Bank', 'ICICI Bank', 'Goldman Sachs', 'Siemens', 'Tata Motors']
const MENTOR_ROLES = ['Senior SDE', 'Principal Architect', 'Data Scientist', 'AI/ML Lead', 'DevOps Specialist', 'Product Manager', 'Cybersecurity Lead', 'Engineering Manager', 'Frontend Lead', 'Quant Analyst']
const MENTOR_EXPERTISE_LIST = [
  ['System Design', 'DSA', 'Spring Boot', 'Microservices'],
  ['Python', 'Machine Learning', 'NLP', 'Computer Vision'],
  ['React', 'Next.js', 'Frontend Architecture', 'UI Performance'],
  ['AWS', 'Kubernetes', 'CI/CD', 'Terraform'],
  ['Product Management', 'User Research', 'GTM Strategy', 'Metrics'],
  ['Penetration Testing', 'SOC Operations', 'Network Security', 'CISSP'],
  ['SQL', 'Data Warehousing', 'Spark', 'Big Data'],
  ['AutoCAD', 'SolidWorks', 'Manufacturing Trainee', 'R&D']
]

const GENERATED_MENTORS = []
let mentorId = 9
for (let i = 0; i < 95; i++) {
  const fName = MENTOR_FIRST_NAMES[i % MENTOR_FIRST_NAMES.length]
  const lName = MENTOR_LAST_NAMES[(i * 3) % MENTOR_LAST_NAMES.length]
  const company = MENTOR_COMPANIES[(i * 5) % MENTOR_COMPANIES.length]
  const role = MENTOR_ROLES[(i * 7) % MENTOR_ROLES.length]
  const expertise = MENTOR_EXPERTISE_LIST[(i * 2) % MENTOR_EXPERTISE_LIST.length]
  const rating = (4.7 + (i % 4) * 0.1).toFixed(1)
  const expYears = (4 + (i % 12)) + '+ years'
  const reviews = 40 + (i * 3)
  const sessionsConducted = 60 + (i * 5)

  GENERATED_MENTORS.push({
    id: `m_${mentorId}`,
    name: `${fName} ${lName}`,
    role,
    company,
    location: 'Bengaluru / Hyderabad / Remote',
    experience: expYears,
    expertise,
    rating: parseFloat(rating),
    reviews,
    sessionsConducted,
    sessionPrice: 'Free (CampusPilot Verified)',
    avatar: `https://images.unsplash.com/photo-${1534528741775 + (i * 1000)}?w=150`,
    bio: `Senior ${role} at ${company} with ${expYears} of industry experience. Actively mentoring students for technical rounds, portfolio reviews, and campus placements.`,
    availableDays: ['Saturday', 'Sunday'],
    alumniCollege: 'Verified Tier-1 / Tier-2 College Alumni'
  })
  mentorId++
}

export const SEED_MENTORS = [
  ...BASE_MENTORS,
  ...GENERATED_MENTORS
]

export const MENTOR_DOMAINS = [
  'All Domains',
  'Software Development',
  'Data Science & AI',
  'Product Management',
  'Cloud & DevOps',
  'Civil Services (UPSC)',
  'Cybersecurity',
  'UI/UX Design',
  'FinTech & Startups'
]
