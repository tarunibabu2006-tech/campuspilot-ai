// Master Reference Data for All Indian & Global Roles, Skills, Degrees, Branches, Colleges, & Locations

import { allRoles } from './allRoles.js'
import { allSkills } from './allSkills.js'

// Flatten all roles into a single clean list of distinct role strings
export const masterRoles = [
  // Tech & IT
  'Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Data Scientist', 'Machine Learning Engineer',
  'DevOps Engineer', 'Cloud Solutions Architect', 'Cybersecurity Analyst', 'Software Engineer', 'QA / Automation Tester',
  'Mobile App Developer (Flutter/React Native)', 'iOS Developer (Swift)', 'Android Developer (Kotlin)', 'System Architect',
  'Blockchain Developer', 'IoT Embedded Engineer', 'AR/VR Developer', 'AI Solutions Engineer', 'Site Reliability Engineer (SRE)',
  'Database Administrator (DBA)', 'Big Data Engineer', 'Prompt Engineer / AI Specialist', 'UI/UX Designer',

  // Core Engineering
  'Mechanical Engineer', 'Civil & Structural Engineer', 'Electrical & Electronics Engineer (EEE)',
  'Electronics & Communication Engineer (ECE)', 'Chemical Process Engineer', 'Aerospace Engineer',
  'Robotics & Automation Engineer', 'Automotive Design Engineer', 'VLSI Design Engineer', 'Embedded Systems Engineer',
  'Mechatronics Engineer', 'Biomedical Engineer', 'Environmental Engineer', 'Petroleum Engineer',

  // Business, Management & Finance
  'Product Manager', 'Project Manager', 'Business Analyst', 'Scrum Master', 'Data Analyst', 'Financial Analyst',
  'Investment Banker', 'Equity Research Analyst', 'Digital Marketing Manager', 'SEO / Performance Specialist',
  'Human Resources (HR) Manager', 'Technical Recruiter', 'Operations Manager', 'Supply Chain Manager',
  'Management Consultant', 'Sales / Business Development Manager', 'Customer Success Manager',

  // Medical & Healthcare
  'General Physician', 'Clinical Pharmacist', 'Registered Nurse', 'Radiologist', 'Physiotherapist',
  'Medical Lab Technologist', 'Biomedical Scientist', 'Hospital Administrator', 'Dentist', 'Surgeon',

  // Law & Corporate Compliance
  'Corporate Lawyer', 'Legal Advisor', 'Intellectual Property (IP) Attorney', 'Cyber Law Specialist',
  'Compliance Officer', 'Arbitration & Conflict Specialist', 'Taxation Consultant',

  // Creative Arts, Design & Media
  'Graphic Designer', 'Motion Graphics Artist', 'Video Editor / Director', 'Content Strategist',
  'Technical Writer', 'Architectural Designer', 'Interior Designer', 'Fashion Designer', 'Sound Engineer',

  // Education & Research
  'Assistant Professor / Lecturer', 'STEM Educator', 'Academic Counselor', 'Research Scientist', 'Educational Technologist'
]

// Extract clean skill names list from allSkills
export const masterSkills = Array.from(new Set([
  'React.js', 'Node.js', 'Python Programming', 'Java Enterprise', 'C++ System Programming', 'SQL & Relational Databases',
  'Data Structures & Algorithms', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'System Design',
  'AWS Cloud Solutions', 'Microsoft Azure Architecture', 'Google Cloud Platform (GCP)', 'Docker Containerization',
  'Kubernetes Cluster Orchestration', 'Tailwind CSS', 'TypeScript', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Git & GitHub',
  'REST APIs & GraphQL', 'PostgreSQL', 'MongoDB', 'Redis Caching', 'Apache Kafka', 'Linux Kernel & Shell Scripting',
  'Ethical Hacking & Penetration Testing', 'Network Security', 'Cyber Law & DPDP', 'Spring Boot', 'Django', 'FastAPI',
  'Flutter', 'React Native', 'Kotlin Android', 'Swift iOS', 'Figma UI/UX Design', 'AutoCAD 2D/3D', 'SolidWorks CAD',
  'ANSYS FEA', 'MATLAB & Simulink', 'VLSI & Verilog', 'Embedded C', 'PLC & SCADA Automation', 'Financial Modeling',
  'Product Management', 'Agile & Scrum', 'Digital Marketing', 'SEO & SEM', 'Corporate Finance', 'Legal Research & Drafting',
  ...allSkills.map(s => typeof s === 'string' ? s : s.name).filter(Boolean)
]))

// All Degrees
export const masterDegrees = [
  'B.E. / B.Tech (Bachelor of Engineering / Technology)',
  'B.Sc (Bachelor of Science)',
  'BCA (Bachelor of Computer Applications)',
  'MCA (Master of Computer Applications)',
  'M.E. / M.Tech (Master of Engineering / Technology)',
  'MBA (Master of Business Administration)',
  'BBA (Bachelor of Business Administration)',
  'B.Com (Bachelor of Commerce)',
  'M.Com (Master of Commerce)',
  'MBBS (Bachelor of Medicine & Surgery)',
  'B.Pharm / Pharm.D (Pharmacy)',
  'BDS (Dental Surgery)',
  'LLB (Bachelor of Laws)',
  'LLM (Master of Laws)',
  'B.Des / M.Des (Design)',
  'Diploma in Engineering / Technology',
  'Ph.D (Doctor of Philosophy)'
]

// All Branches / Streams
export const masterBranches = [
  'Computer Science & Engineering (CSE)',
  'Information Technology (IT)',
  'Artificial Intelligence & Data Science (AI & DS)',
  'Cyber Security & Digital Forensics',
  'Electronics & Communication Engineering (ECE)',
  'Electrical & Electronics Engineering (EEE)',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Aerospace & Aeronautical Engineering',
  'Biotechnology / Bioinformatics',
  'Robotics & Automation Engineering',
  'Mechatronics Engineering',
  'Biomedical Engineering',
  'Business Administration / Management',
  'Finance & Accounting',
  'Marketing & International Business',
  'Human Resource Management',
  'Data Analytics & Business Intelligence',
  'General Medicine / Clinical Sciences',
  'Pharmacy & Clinical Pharmacology',
  'Corporate Law & Intellectual Property',
  'UI/UX & Communication Design',
  'Physics / Chemistry / Mathematics'
]

// Top Indian & Global Colleges
export const masterColleges = [
  'IIT Madras (Indian Institute of Technology)',
  'IIT Bombay (Indian Institute of Technology)',
  'IIT Delhi (Indian Institute of Technology)',
  'IIT Kharagpur',
  'IIT Kanpur',
  'IIT Roorkee',
  'Anna University (CEG / MIT Campus, Chennai)',
  'NIT Trichy (National Institute of Technology)',
  'VIT Vellore (Vellore Institute of Technology)',
  'SRM Institute of Science and Technology (Kattankulathur)',
  'BITS Pilani (Birla Institute of Technology and Science)',
  'PSG College of Technology (Coimbatore)',
  'Amrita Vishwa Vidyapeetham (Coimbatore / Chennai)',
  'SASTRA Deemed University (Thanjavur)',
  'SSN College of Engineering (Chennai)',
  'Thiagarajar College of Engineering (Madurai)',
  'Coimbatore Institute of Technology (CIT)',
  'Government College of Technology (GCT Coimbatore)',
  'IIM Ahmedabad (Indian Institute of Management)',
  'IIM Bangalore',
  'IIM Calcutta',
  'IISc Bangalore (Indian Institute of Science)',
  'Loyola College (Chennai)',
  'Madras Christian College (MCC)',
  'St. Xavier\'s College (Mumbai)',
  'Presidency College (Chennai)',
  'Madras Medical College (MMC)',
  'JIPMER (Puducherry)',
  'Christian Medical College (CMC Vellore)',
  'TNDALU (Tamil Nadu Dr. Ambedkar Law University)',
  'National Law School of India University (NLSIU Bangalore)'
]

// All Indian & Global Tech / Corporate Job Locations
export const masterLocations = [
  'Bangalore (Bengaluru), Karnataka',
  'Hyderabad, Telangana',
  'Chennai, Tamil Nadu',
  'Coimbatore, Tamil Nadu',
  'Pune, Maharashtra',
  'Mumbai, Maharashtra',
  'Gurgaon (Gurugram), Delhi NCR',
  'Noida, Uttar Pradesh',
  'Delhi NCR',
  'Kolkata, West Bengal',
  'Ahmedabad, Gujarat',
  'Kochi / Trivandrum, Kerala',
  'Chandigarh / Mohali',
  'Remote (India)',
  'Remote (Global / USA)',
  'San Francisco / Silicon Valley, USA',
  'Seattle, USA',
  'New York, USA',
  'London, United Kingdom',
  'Singapore',
  'Dubai / Abu Dhabi, UAE',
  'Berlin / Munich, Germany'
]
