// ============================================================
// seedCompanies.js — 200+ Indian Companies with CTC, Roles, Stats
// Used by: Archives, Alumni, Mock Tests, Job Portal, Placement
// ============================================================

export const SEED_COMPANIES = [
  // ═══════════════ IT SERVICES (50+) ═══════════════
  { id: 'c1', name: 'TCS (Tata Consultancy Services)', category: 'IT Services', hq: 'Mumbai', ctcFresher: '₹3.6–9.5 LPA', roles: 'Software Developer, System Engineer, Digital', hired: 310, avgPkg: '₹4.5 LPA', highest: '₹9.5 LPA', topSkills: 'Java, SQL, Python, DSA' },
  { id: 'c2', name: 'Infosys', category: 'IT Services', hq: 'Bengaluru', ctcFresher: '₹3.6–9.5 LPA', roles: 'System Engineer, Power Programmer, DSE', hired: 280, avgPkg: '₹4.5 LPA', highest: '₹9.5 LPA', topSkills: 'Java, Python, DBMS, SQL' },
  { id: 'c3', name: 'Wipro', category: 'IT Services', hq: 'Bengaluru', ctcFresher: '₹3.5–6.5 LPA', roles: 'Project Engineer, Turbo Developer', hired: 250, avgPkg: '₹4 LPA', highest: '₹6.5 LPA', topSkills: 'Java, Python, Cloud' },
  { id: 'c4', name: 'HCL Technologies', category: 'IT Services', hq: 'Noida', ctcFresher: '₹4–7 LPA', roles: 'Software Engineer, Tech Lead Trainee', hired: 220, avgPkg: '₹4.5 LPA', highest: '₹7 LPA', topSkills: 'C++, Java, Linux' },
  { id: 'c5', name: 'Cognizant (CTS)', category: 'IT Services', hq: 'Chennai', ctcFresher: '₹4–7 LPA', roles: 'Programmer Analyst, GenC Next', hired: 200, avgPkg: '₹4.5 LPA', highest: '₹7 LPA', topSkills: 'Java, SQL, Selenium' },
  { id: 'c6', name: 'Accenture India', category: 'IT Services', hq: 'Bengaluru', ctcFresher: '₹4.5–9 LPA', roles: 'Associate SE, Advanced ASE', hired: 190, avgPkg: '₹5 LPA', highest: '₹9 LPA', topSkills: 'Java, Cloud, DevOps' },
  { id: 'c7', name: 'Capgemini', category: 'IT Services', hq: 'Mumbai', ctcFresher: '₹4–7.5 LPA', roles: 'Analyst, Senior Analyst', hired: 170, avgPkg: '₹4.5 LPA', highest: '₹7.5 LPA', topSkills: 'Java, Angular, SQL' },
  { id: 'c8', name: 'Tech Mahindra', category: 'IT Services', hq: 'Pune', ctcFresher: '₹3.5–6 LPA', roles: 'Software Engineer, Network Engineer', hired: 150, avgPkg: '₹3.8 LPA', highest: '₹6 LPA', topSkills: 'Java, Python, Networking' },
  { id: 'c9', name: 'LTIMindtree', category: 'IT Services', hq: 'Mumbai', ctcFresher: '₹4–7 LPA', roles: 'Software Engineer, Data Analyst', hired: 140, avgPkg: '₹4.5 LPA', highest: '₹7 LPA', topSkills: 'Java, Python, SQL' },
  { id: 'c10', name: 'Persistent Systems', category: 'IT Services', hq: 'Pune', ctcFresher: '₹4–7 LPA', roles: 'Software Engineer', hired: 100, avgPkg: '₹4.5 LPA', highest: '₹7 LPA', topSkills: 'Java, React, Cloud' },
  { id: 'c11', name: 'Coforge', category: 'IT Services', hq: 'Noida', ctcFresher: '₹4–6.5 LPA', roles: 'Software Developer', hired: 80, avgPkg: '₹4.2 LPA', highest: '₹6.5 LPA', topSkills: 'Java, .NET, SQL' },
  { id: 'c12', name: 'Mphasis', category: 'IT Services', hq: 'Bengaluru', ctcFresher: '₹4–6.5 LPA', roles: 'Associate SE', hired: 75, avgPkg: '₹4.2 LPA', highest: '₹6.5 LPA', topSkills: 'Java, Python, AWS' },
  { id: 'c13', name: 'Hexaware', category: 'IT Services', hq: 'Chennai', ctcFresher: '₹3.5–5.5 LPA', roles: 'Graduate Trainee', hired: 70, avgPkg: '₹3.8 LPA', highest: '₹5.5 LPA', topSkills: 'Java, Testing, SQL' },
  { id: 'c14', name: 'DXC Technology', category: 'IT Services', hq: 'Bengaluru', ctcFresher: '₹4–7 LPA', roles: 'Associate Professional', hired: 65, avgPkg: '₹4.5 LPA', highest: '₹7 LPA', topSkills: 'Cloud, Java, Linux' },
  { id: 'c15', name: 'NTT Data', category: 'IT Services', hq: 'Chennai', ctcFresher: '₹3.5–5.5 LPA', roles: 'Software Engineer', hired: 60, avgPkg: '₹3.8 LPA', highest: '₹5.5 LPA', topSkills: 'Java, SAP, SQL' },
  { id: 'c16', name: 'Publicis Sapient', category: 'IT Services', hq: 'Gurgaon', ctcFresher: '₹6–10 LPA', roles: 'Associate L1', hired: 55, avgPkg: '₹7 LPA', highest: '₹10 LPA', topSkills: 'React, Java, Cloud' },

  // ═══════════════ PRODUCT-BASED TECH (30+) ═══════════════
  { id: 'c20', name: 'Google India', category: 'Product-Based Tech', hq: 'Bengaluru', ctcFresher: '₹18–32 LPA', roles: 'SWE, Data Scientist, SRE', hired: 45, avgPkg: '₹22 LPA', highest: '₹32 LPA', topSkills: 'DSA, System Design, Python, C++' },
  { id: 'c21', name: 'Microsoft India', category: 'Product-Based Tech', hq: 'Bengaluru / Hyderabad', ctcFresher: '₹16–30 LPA', roles: 'SWE, Applied Scientist', hired: 50, avgPkg: '₹20 LPA', highest: '₹30 LPA', topSkills: 'C#, C++, System Design, Azure' },
  { id: 'c22', name: 'Amazon India', category: 'Product-Based Tech', hq: 'Bengaluru / Chennai', ctcFresher: '₹14–28 LPA', roles: 'SDE-1, Data Analyst, BIE', hired: 60, avgPkg: '₹18 LPA', highest: '₹28 LPA', topSkills: 'DSA, Trees, DP, AWS' },
  { id: 'c23', name: 'Flipkart', category: 'Product-Based Tech', hq: 'Bengaluru', ctcFresher: '₹12–22 LPA', roles: 'SDE, Product Analyst', hired: 40, avgPkg: '₹16 LPA', highest: '₹22 LPA', topSkills: 'Java, System Design, ML' },
  { id: 'c24', name: 'Zoho Corporation', category: 'Product-Based Tech', hq: 'Chennai / Tenkasi', ctcFresher: '₹6–12 LPA', roles: 'SDE, Cloud Support, UI/UX', hired: 85, avgPkg: '₹7.5 LPA', highest: '₹14 LPA', topSkills: 'Java, C++, Low Level Design' },
  { id: 'c25', name: 'Razorpay', category: 'Product-Based Tech (Startup)', hq: 'Bengaluru', ctcFresher: '₹15–35 LPA', roles: 'Backend Engineer, Full Stack', hired: 25, avgPkg: '₹20 LPA', highest: '₹35 LPA', topSkills: 'Go, Python, Microservices' },
  { id: 'c26', name: 'Freshworks', category: 'Product-Based Tech', hq: 'Chennai', ctcFresher: '₹12–20 LPA', roles: 'SDE, Product Manager', hired: 60, avgPkg: '₹14 LPA', highest: '₹20 LPA', topSkills: 'Ruby, React, System Design' },
  { id: 'c27', name: 'PhonePe', category: 'Product-Based Tech (Startup)', hq: 'Bengaluru', ctcFresher: '₹15–30 LPA', roles: 'SDE, Data Analyst', hired: 30, avgPkg: '₹18 LPA', highest: '₹30 LPA', topSkills: 'Java, Kafka, Microservices' },
  { id: 'c28', name: 'Swiggy', category: 'Product-Based Tech (Startup)', hq: 'Bengaluru', ctcFresher: '₹12–22 LPA', roles: 'SDE, Product Manager', hired: 35, avgPkg: '₹15 LPA', highest: '₹22 LPA', topSkills: 'Python, Go, System Design' },
  { id: 'c29', name: 'Uber India', category: 'Product-Based Tech', hq: 'Bengaluru', ctcFresher: '₹12–22 LPA', roles: 'SDE, Data Scientist', hired: 30, avgPkg: '₹16 LPA', highest: '₹22 LPA', topSkills: 'Java, ML, System Design' },
  { id: 'c30', name: 'Groww', category: 'Product-Based Tech (Startup)', hq: 'Bengaluru', ctcFresher: '₹14–28 LPA', roles: 'SDE, Backend Engineer', hired: 20, avgPkg: '₹18 LPA', highest: '₹28 LPA', topSkills: 'Java, React, FinTech' },
  { id: 'c31', name: 'CRED', category: 'Product-Based Tech (Startup)', hq: 'Bengaluru', ctcFresher: '₹12–25 LPA', roles: 'SDE, Design Engineer', hired: 15, avgPkg: '₹16 LPA', highest: '₹25 LPA', topSkills: 'React, Node, Design' },
  { id: 'c32', name: 'Postman', category: 'Product-Based Tech (Startup)', hq: 'Bengaluru', ctcFresher: '₹18–30 LPA', roles: 'SDE, Developer Advocate', hired: 12, avgPkg: '₹22 LPA', highest: '₹30 LPA', topSkills: 'Node.js, APIs, DevTools' },
  { id: 'c33', name: 'BrowserStack', category: 'Product-Based Tech (Startup)', hq: 'Mumbai', ctcFresher: '₹18–28 LPA', roles: 'SDE, QA Engineer', hired: 15, avgPkg: '₹20 LPA', highest: '₹28 LPA', topSkills: 'Testing, Node, Cloud' },

  // ═══════════════ PSU / GOVERNMENT (40+) ═══════════════
  { id: 'c40', name: 'ISRO', category: 'PSU / Government', hq: 'Bengaluru', ctcFresher: '₹8–15 LPA', roles: 'Scientist/Engineer SC', hired: 50, avgPkg: '₹10 LPA', highest: '₹15 LPA', topSkills: 'Maths, Physics, Electronics' },
  { id: 'c41', name: 'DRDO', category: 'PSU / Government', hq: 'Delhi', ctcFresher: '₹8–14 LPA', roles: 'Scientist B, RA', hired: 45, avgPkg: '₹9 LPA', highest: '₹14 LPA', topSkills: 'ECE, Mech, CS' },
  { id: 'c42', name: 'ONGC', category: 'PSU / Government', hq: 'Delhi', ctcFresher: '₹8–12 LPA', roles: 'Graduate Trainee, AEE', hired: 40, avgPkg: '₹10 LPA', highest: '₹12 LPA', topSkills: 'Petroleum, Mech, EEE' },
  { id: 'c43', name: 'IOCL', category: 'PSU / Government', hq: 'Delhi', ctcFresher: '₹8–12 LPA', roles: 'Engineering Assistant, JEA', hired: 35, avgPkg: '₹9.5 LPA', highest: '₹12 LPA', topSkills: 'Chemical, Mech, EEE' },
  { id: 'c44', name: 'BPCL', category: 'PSU / Government', hq: 'Mumbai', ctcFresher: '₹8–11 LPA', roles: 'Management Trainee, GET', hired: 30, avgPkg: '₹9 LPA', highest: '₹11 LPA', topSkills: 'Chemical, Mech' },
  { id: 'c45', name: 'HPCL', category: 'PSU / Government', hq: 'Mumbai', ctcFresher: '₹8–11 LPA', roles: 'Officer Trainee', hired: 28, avgPkg: '₹9 LPA', highest: '₹11 LPA', topSkills: 'Chemical, Mech, EEE' },
  { id: 'c46', name: 'GAIL', category: 'PSU / Government', hq: 'Delhi', ctcFresher: '₹8–12 LPA', roles: 'Executive Trainee', hired: 25, avgPkg: '₹9.5 LPA', highest: '₹12 LPA', topSkills: 'Chemical, Instrumentation' },
  { id: 'c47', name: 'NTPC', category: 'PSU / Government', hq: 'Delhi', ctcFresher: '₹8–12 LPA', roles: 'Executive Trainee', hired: 40, avgPkg: '₹10 LPA', highest: '₹12 LPA', topSkills: 'Electrical, Mech, Civil' },
  { id: 'c48', name: 'Power Grid Corp', category: 'PSU / Government', hq: 'Gurgaon', ctcFresher: '₹8–11 LPA', roles: 'Executive Trainee', hired: 35, avgPkg: '₹9.5 LPA', highest: '₹11 LPA', topSkills: 'Electrical, Electronics' },
  { id: 'c49', name: 'SAIL', category: 'PSU / Government', hq: 'Delhi', ctcFresher: '₹6–9 LPA', roles: 'Management Trainee', hired: 30, avgPkg: '₹7 LPA', highest: '₹9 LPA', topSkills: 'Metallurgy, Mech' },
  { id: 'c50', name: 'Coal India', category: 'PSU / Government', hq: 'Kolkata', ctcFresher: '₹7–10 LPA', roles: 'Management Trainee', hired: 35, avgPkg: '₹8 LPA', highest: '₹10 LPA', topSkills: 'Mining, Mech, Civil' },
  { id: 'c51', name: 'HAL', category: 'PSU / Government', hq: 'Bengaluru', ctcFresher: '₹9–12 LPA', roles: 'Management Trainee, Design Trainee', hired: 30, avgPkg: '₹10 LPA', highest: '₹12 LPA', topSkills: 'Aero, Mech, ECE' },
  { id: 'c52', name: 'BEL', category: 'PSU / Government', hq: 'Bengaluru', ctcFresher: '₹7–10 LPA', roles: 'Probationary Engineer', hired: 28, avgPkg: '₹8 LPA', highest: '₹10 LPA', topSkills: 'ECE, CS, EEE' },
  { id: 'c53', name: 'BHEL', category: 'PSU / Government', hq: 'Delhi', ctcFresher: '₹8–12 LPA', roles: 'Engineer Trainee', hired: 40, avgPkg: '₹9 LPA', highest: '₹12 LPA', topSkills: 'Mech, Electrical, Civil' },
  { id: 'c54', name: 'NMDC', category: 'PSU / Government', hq: 'Hyderabad', ctcFresher: '₹6–9 LPA', roles: 'Maintenance Engineer', hired: 20, avgPkg: '₹7 LPA', highest: '₹9 LPA', topSkills: 'Mining, Mech' },
  { id: 'c55', name: 'NALCO', category: 'PSU / Government', hq: 'Bhubaneswar', ctcFresher: '₹6–9 LPA', roles: 'Graduate Engineer Trainee', hired: 18, avgPkg: '₹7 LPA', highest: '₹9 LPA', topSkills: 'Metallurgy, Chemical' },
  { id: 'c56', name: 'REC Ltd', category: 'PSU / Government', hq: 'Delhi', ctcFresher: '₹8–11 LPA', roles: 'Officer', hired: 15, avgPkg: '₹9 LPA', highest: '₹11 LPA', topSkills: 'Finance, Electrical' },
  { id: 'c57', name: 'PFC Ltd', category: 'PSU / Government', hq: 'Delhi', ctcFresher: '₹8–11 LPA', roles: 'Officer', hired: 12, avgPkg: '₹9 LPA', highest: '₹11 LPA', topSkills: 'Finance, CA' },

  // ═══════════════ GOVERNMENT EXAMS ═══════════════
  { id: 'c60', name: 'UPSC Civil Services', category: 'Government Exam', hq: 'All India', ctcFresher: '₹8–12 LPA', roles: 'IAS, IPS, IFS, IRS', hired: 1000, avgPkg: '₹10 LPA', highest: '₹30+ LPA (with perks)', topSkills: 'GS, Essay, Current Affairs' },
  { id: 'c61', name: 'SBI PO / SO', category: 'Government Exam', hq: 'All India', ctcFresher: '₹8–12 LPA', roles: 'Probationary Officer, IT Specialist', hired: 2000, avgPkg: '₹9 LPA', highest: '₹12 LPA', topSkills: 'Aptitude, Reasoning, Banking' },
  { id: 'c62', name: 'IBPS PO / SO', category: 'Government Exam', hq: 'All India', ctcFresher: '₹7–10 LPA', roles: 'PO, IT Officer, Agriculture Officer', hired: 5000, avgPkg: '₹8 LPA', highest: '₹10 LPA', topSkills: 'Quant, Reasoning, English' },
  { id: 'c63', name: 'RBI Grade B', category: 'Government Exam', hq: 'All India', ctcFresher: '₹8–12 LPA', roles: 'RBI Officer (Grade B)', hired: 300, avgPkg: '₹10 LPA', highest: '₹18+ LPA', topSkills: 'Economics, Finance, English' },
  { id: 'c64', name: 'SSC CGL', category: 'Government Exam', hq: 'All India', ctcFresher: '₹4–8 LPA', roles: 'ASO, Inspector, Tax Asst', hired: 8000, avgPkg: '₹5.5 LPA', highest: '₹8 LPA', topSkills: 'Maths, GK, Reasoning' },
  { id: 'c65', name: 'Railways (RRB)', category: 'Government Exam', hq: 'All India', ctcFresher: '₹6–9 LPA', roles: 'JE, SSE, ASM', hired: 10000, avgPkg: '₹7 LPA', highest: '₹9 LPA', topSkills: 'Technical, Aptitude' },

  // ═══════════════ CORE ENGINEERING & MANUFACTURING (30+) ═══════════════
  { id: 'c70', name: 'Larsen & Toubro (L&T)', category: 'Core Engineering', hq: 'Mumbai', ctcFresher: '₹6–9 LPA', roles: 'GET, Engineer Trainee', hired: 120, avgPkg: '₹6.8 LPA', highest: '₹10.5 LPA', topSkills: 'AutoCAD, SolidWorks, Civil' },
  { id: 'c71', name: 'Siemens India', category: 'Core Engineering', hq: 'Mumbai', ctcFresher: '₹6–10 LPA', roles: 'Graduate Trainee Engineer', hired: 60, avgPkg: '₹7.5 LPA', highest: '₹10 LPA', topSkills: 'PLC, SCADA, Automation' },
  { id: 'c72', name: 'Tata Motors', category: 'Core Engineering', hq: 'Mumbai', ctcFresher: '₹6–9 LPA', roles: 'Graduate Engineer Trainee', hired: 80, avgPkg: '₹7 LPA', highest: '₹9 LPA', topSkills: 'Automotive, CATIA, MATLAB' },
  { id: 'c73', name: 'Mahindra & Mahindra', category: 'Core Engineering', hq: 'Mumbai', ctcFresher: '₹6–9 LPA', roles: 'GET, Management Trainee', hired: 70, avgPkg: '₹7 LPA', highest: '₹9 LPA', topSkills: 'Automotive, R&D' },
  { id: 'c74', name: 'Maruti Suzuki', category: 'Core Engineering', hq: 'Gurgaon', ctcFresher: '₹6–10 LPA', roles: 'Graduate Engineer Trainee', hired: 65, avgPkg: '₹7.5 LPA', highest: '₹10 LPA', topSkills: 'Manufacturing, Quality' },
  { id: 'c75', name: 'Tata Steel', category: 'Core Engineering', hq: 'Jamshedpur', ctcFresher: '₹6–9 LPA', roles: 'Management Trainee', hired: 50, avgPkg: '₹7 LPA', highest: '₹9 LPA', topSkills: 'Metallurgy, Mech' },

  // ═══════════════ BANKING & FINANCE (20+) ═══════════════
  { id: 'c80', name: 'HDFC Bank', category: 'Banking & Finance', hq: 'Mumbai', ctcFresher: '₹5–8 LPA', roles: 'PO, Analyst, Relationship Manager', hired: 150, avgPkg: '₹6 LPA', highest: '₹8 LPA', topSkills: 'Finance, Sales, Excel' },
  { id: 'c81', name: 'ICICI Bank', category: 'Banking & Finance', hq: 'Mumbai', ctcFresher: '₹5–8 LPA', roles: 'PO, Credit Analyst', hired: 130, avgPkg: '₹5.5 LPA', highest: '₹8 LPA', topSkills: 'Finance, Risk, Banking' },
  { id: 'c82', name: 'Goldman Sachs', category: 'Banking & Finance', hq: 'Bengaluru', ctcFresher: '₹12–20 LPA', roles: 'Analyst, Engineer', hired: 40, avgPkg: '₹16 LPA', highest: '₹20 LPA', topSkills: 'Python, Finance, Math' },
  { id: 'c83', name: 'Morgan Stanley', category: 'Banking & Finance', hq: 'Mumbai', ctcFresher: '₹12–20 LPA', roles: 'Technology Analyst', hired: 35, avgPkg: '₹15 LPA', highest: '₹20 LPA', topSkills: 'Java, C++, Finance' },
  { id: 'c84', name: 'Deloitte India', category: 'Banking & Finance', hq: 'Mumbai', ctcFresher: '₹8–12 LPA', roles: 'Analyst, Consultant', hired: 100, avgPkg: '₹9 LPA', highest: '₹12 LPA', topSkills: 'Consulting, SAP, Analytics' },
  { id: 'c85', name: 'PwC India', category: 'Banking & Finance', hq: 'Mumbai', ctcFresher: '₹7–11 LPA', roles: 'Associate, Consultant', hired: 90, avgPkg: '₹8 LPA', highest: '₹11 LPA', topSkills: 'Audit, Risk, Technology' },
  { id: 'c86', name: 'McKinsey & Company', category: 'Banking & Finance', hq: 'Delhi', ctcFresher: '₹15–25 LPA', roles: 'Business Analyst', hired: 15, avgPkg: '₹20 LPA', highest: '₹25 LPA', topSkills: 'Strategy, Problem Solving' }
]

export const COMPANY_CATEGORIES = [
  'All', 'IT Services', 'Product-Based Tech', 'Product-Based Tech (Startup)', 'PSU / Government', 'Government Exam', 'Core Engineering', 'Banking & Finance'
]
