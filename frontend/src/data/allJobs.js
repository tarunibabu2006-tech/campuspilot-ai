export const allJobs = [
  // Tech Jobs - 300+
  ...Array.from({ length: 300 }, (_, i) => {
    const companies = ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro', 'HCL Tech', 'Adobe', 'Oracle', 'Cisco', 'Qualcomm', 'Intel']
    const roles = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Scientist', 'DevOps Engineer', 'ML Engineer', 'Cloud Architect', 'Cybersecurity Analyst']
    const locations = ['Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Gurgaon', 'Mumbai', 'Noida', 'Remote (India)']
    const company = companies[i % companies.length]
    const role = roles[i % roles.length]
    const location = locations[i % locations.length]
    const exp = ['0-1 yrs (Freshers)', '1-3 yrs', '2-5 yrs', 'Entry Level'][i % 4]
    const salary = `${5 + (i % 12)} - ${12 + (i % 18)} LPA`
    return {
      id: i + 1,
      company,
      role,
      domain: 'Technology',
      roleType: 'Tech / Software',
      jobType: ['Full-time', 'Internship', 'Off-Campus Drive'][i % 3],
      location,
      experience: exp,
      salary,
      type: ['Full-time', 'Internship', 'Off-Campus Drive'][i % 3],
      batch: '2024 / 2025 / 2026 Batch',
      skills: ['React', 'Node.js', 'Python', 'Java', 'SQL', 'AWS'][i % 6],
      applyLink: `https://www.${company.toLowerCase().replace(/\s+/g, '')}.com/careers/job-${i + 100}`,
      postedDaysAgo: (i % 7) + 1,
      isFeatured: i % 5 === 0
    }
  }),

  // Business & Non-Tech Jobs - 250+
  ...Array.from({ length: 250 }, (_, i) => {
    const companies = ['Deloitte', 'PwC', 'EY', 'KPMG', 'McKinsey & Co', 'BCG', 'Accenture', 'Capgemini', 'JPMorgan Chase', 'Morgan Stanley']
    const roles = ['Business Analyst', 'Associate Consultant', 'Marketing Specialist', 'HR Operations Lead', 'Financial Analyst', 'Product Manager', 'Risk Auditor']
    const locations = ['Mumbai', 'Bangalore', 'Gurgaon', 'Hyderabad', 'Chennai', 'Kolkata']
    const company = companies[i % companies.length]
    const role = roles[i % roles.length]
    const location = locations[i % locations.length]
    const exp = ['Freshers Eligible', '0-2 yrs', '1-3 yrs'][i % 3]
    const salary = `${4.5 + (i % 8)} - ${10 + (i % 14)} LPA`
    return {
      id: i + 301,
      company,
      role,
      domain: 'Business & Management',
      roleType: 'Non-Tech / Business',
      jobType: 'Full-time',
      location,
      experience: exp,
      salary,
      type: 'Full-time',
      batch: 'All Graduates',
      skills: ['Business Analytics', 'Excel', 'Tableau', 'Strategy', 'Financial Modeling'][i % 5],
      applyLink: `https://www.${company.toLowerCase().replace(/[^a-z]/g, '')}.com/careers/job-${i + 300}`,
      postedDaysAgo: (i % 5) + 1,
      isFeatured: i % 6 === 0
    }
  }),

  // Healthcare & Medical - 150+
  ...Array.from({ length: 150 }, (_, i) => {
    const companies = ['Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare', 'Medanta', 'AIIMS Labs', 'Narayana Health', 'Manipal Hospitals', 'Dr. Lal PathLabs']
    const roles = ['Medical Officer', 'Clinical Pharmacist', 'Diagnostic Lab Technician', 'Radiology Specialist', 'Physiotherapist', 'Biomedical Engineer']
    const locations = ['Bangalore', 'Delhi NCR', 'Chennai', 'Mumbai', 'Hyderabad', 'Kochi']
    const company = companies[i % companies.length]
    const role = roles[i % roles.length]
    const location = locations[i % locations.length]
    const salary = `${4.0 + (i % 7)} - ${9 + (i % 10)} LPA`
    return {
      id: i + 551,
      company,
      role,
      domain: 'Medical & Healthcare',
      roleType: 'Healthcare & Clinical',
      jobType: 'Full-time',
      location,
      experience: '0-2 yrs',
      salary,
      type: 'Full-time',
      batch: 'Medical & Science Graduates',
      skills: ['Clinical Diagnosis', 'Patient Care', 'Lab Testing', 'Pharmacology'][i % 4],
      applyLink: `https://www.${company.toLowerCase().replace(/[^a-z]/g, '')}.com/careers/job-${i + 500}`,
      postedDaysAgo: (i % 4) + 1,
      isFeatured: i % 7 === 0
    }
  }),

  // Law & Legal - 150+
  ...Array.from({ length: 150 }, (_, i) => {
    const firms = ['AZB & Partners', 'Shardul Amarchand', 'Cyril Amarchand', 'Khaitan & Co', 'Trilegal', 'L&L Partners', 'Economic Laws Practice']
    const roles = ['Corporate Legal Associate', 'Legal Researcher', 'Compliance Analyst', 'Contract Specialist', 'IPR Patent Analyst']
    const locations = ['New Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai']
    const company = firms[i % firms.length]
    const role = roles[i % roles.length]
    const location = locations[i % locations.length]
    const salary = `${6.0 + (i % 9)} - ${14 + (i % 12)} LPA`
    return {
      id: i + 701,
      company,
      role,
      domain: 'Law & Judiciary',
      roleType: 'Legal & Regulatory',
      jobType: 'Full-time',
      location,
      experience: 'Freshers / LLB / LLM',
      salary,
      type: 'Full-time',
      batch: 'Law Graduates (3/5 yr LLB)',
      skills: ['Corporate Governance', 'Contract Drafting', 'Compliance', 'IPR Laws'][i % 4],
      applyLink: `https://www.${company.toLowerCase().replace(/[^a-z]/g, '')}.com/careers/job-${i + 700}`,
      postedDaysAgo: (i % 6) + 1,
      isFeatured: i % 8 === 0
    }
  }),

  // Arts, Design & Media - 150+
  ...Array.from({ length: 150 }, (_, i) => {
    const companies = ['Ogilvy', 'DDB Mudra', 'WPP India', 'Zoho Media', 'Hotstar', 'Netflix India', 'Sony Pictures India', 'Byjus Studios']
    const roles = ['UI/UX Product Designer', 'Visual Graphics Specialist', 'Motion Graphics Animator', 'Digital Content Strategist', 'Video Editor / Director']
    const locations = ['Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Remote']
    const company = companies[i % companies.length]
    const role = roles[i % roles.length]
    const location = locations[i % locations.length]
    const salary = `${4.5 + (i % 8)} - ${11 + (i % 15)} LPA`
    return {
      id: i + 851,
      company,
      role,
      domain: 'Creative Arts & Media',
      roleType: 'Design & Media',
      jobType: ['Full-time', 'Contract / Project'][i % 2],
      location,
      experience: 'Portfolio Based / 0-2 yrs',
      salary,
      type: 'Full-time',
      batch: 'All Disciplines with Portfolio',
      skills: ['Figma', 'Adobe Creative Cloud', 'Design Systems', 'Motion Graphics'][i % 4],
      applyLink: `https://www.${company.toLowerCase().replace(/[^a-z]/g, '')}.com/careers/job-${i + 850}`,
      postedDaysAgo: (i % 5) + 1,
      isFeatured: i % 7 === 0
    }
  })
]
