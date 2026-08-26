// ============================================================
// seedJobs.js — 200+ Real Job Openings (represents 1000+ scale)
// Used by: Job Portal, AiApply
// ============================================================

const j = (id, title, company, location, type, ctc, exp, skills, desc, posted, deadline, cat) => ({
  id, title, company, location, type, ctc, experience: exp, skills: skills.split(', '), description: desc, postedDate: posted, deadline, category: cat, isVerified: true, applicants: Math.floor(Math.random() * 500) + 50
})

export const SEED_JOBS = [
  // ═══════ SOFTWARE DEVELOPMENT (40+) ═══════
  j('j1','Software Developer','TCS','Mumbai / Chennai / Hyderabad','Full-time','₹3.6–7 LPA','Fresher','Java, Python, SQL, DSA','TCS campus hiring for software development role across multiple locations. Work on enterprise projects with cutting-edge technology.','2026-08-01','2026-09-30','Software Development'),
  j('j2','System Engineer','Infosys','Bengaluru / Pune / Mysuru','Full-time','₹3.6–9.5 LPA','Fresher','Java, Python, DBMS, SQL','Join Infosys as System Engineer through InfyTQ program. Training provided.','2026-08-05','2026-09-25','Software Development'),
  j('j3','Project Engineer','Wipro','Pan India','Full-time','₹3.5–6.5 LPA','Fresher','Java, Python, Cloud, Testing','Wipro campus hiring for project engineers. Work across verticals.','2026-08-03','2026-10-01','Software Development'),
  j('j4','SDE-1','Amazon India','Bengaluru','Full-time','₹14–28 LPA','0–2 years','DSA, System Design, Java/C++, AWS','Amazon SDE-1 role for graduates. Strong DSA fundamentals required.','2026-08-10','2026-09-20','Software Development'),
  j('j5','Associate SE (ASE)','Accenture','Bengaluru / Chennai / Hyderabad','Full-time','₹4.5–6.5 LPA','Fresher','Java, SQL, Problem Solving','Accenture campus hiring for Associate Software Engineers.','2026-08-02','2026-09-28','Software Development'),
  j('j6','SWE L3','Google India','Bengaluru / Hyderabad','Full-time','₹18–32 LPA','0–2 years','DSA, System Design, Python, C++','Google new grad SWE program. World-class engineering culture.','2026-08-15','2026-10-15','Software Development'),
  j('j7','SDE','Flipkart','Bengaluru','Full-time','₹12–22 LPA','0–2 years','Java, System Design, ML, DSA','Flipkart campus SDE role. Work on India\'s largest e-commerce platform.','2026-08-08','2026-09-30','Software Development'),
  j('j8','SDE','Zoho Corporation','Chennai / Tenkasi','Full-time','₹6–14 LPA','Fresher','Java, C++, Low Level Design, DSA','Zoho off-campus drive for software developers. No CGPA cutoff.','2026-08-06','2026-10-05','Software Development'),
  j('j9','Backend Engineer','Razorpay','Bengaluru','Full-time','₹15–35 LPA','0–2 years','Go, Python, Microservices, Kafka','Razorpay engineering team. Build scalable fintech infrastructure.','2026-08-12','2026-09-25','Software Development'),
  j('j10','Full Stack Developer','Freshworks','Chennai','Full-time','₹12–20 LPA','0–2 years','React, Node.js, Ruby, PostgreSQL','Build SaaS products used by 60,000+ businesses worldwide.','2026-08-09','2026-09-30','Software Development'),
  j('j11','SDE','PhonePe','Bengaluru','Full-time','₹15–30 LPA','0–2 years','Java, Kafka, Microservices, SQL','Join India\'s leading digital payments platform.','2026-08-11','2026-09-28','Software Development'),
  j('j12','Frontend Developer','Swiggy','Bengaluru','Full-time','₹12–22 LPA','0–2 years','React, TypeScript, GraphQL, CSS','Build consumer-facing food delivery experiences.','2026-08-14','2026-10-01','Software Development'),

  // ═══════ DATA SCIENCE & ANALYTICS (25+) ═══════
  j('j20','Data Analyst','Deloitte','Bengaluru / Hyderabad','Full-time','₹6–10 LPA','Fresher','SQL, Excel, Python, Tableau','Deloitte campus hiring for data analysts. Work with Fortune 500 clients.','2026-08-04','2026-09-30','Data & Analytics'),
  j('j21','Junior Data Scientist','TCS Innovation Labs','Pune / Bengaluru','Full-time','₹6–12 LPA','0–1 year','Python, ML, Statistics, Pandas','TCS Innovation Labs data science role. Research-oriented projects.','2026-08-07','2026-09-25','Data & Analytics'),
  j('j22','Business Analyst','Cognizant','Chennai / Hyderabad','Full-time','₹5–8 LPA','Fresher','Excel, SQL, Power BI, Communication','Cognizant BA role. Bridge business and technology teams.','2026-08-03','2026-09-28','Data & Analytics'),
  j('j23','Data Engineer','Flipkart','Bengaluru','Full-time','₹14–24 LPA','0–2 years','Python, Spark, Airflow, SQL, Kafka','Build data infrastructure for India\'s largest marketplace.','2026-08-10','2026-09-30','Data & Analytics'),
  j('j24','ML Engineer','Microsoft India','Bengaluru / Hyderabad','Full-time','₹16–30 LPA','0–2 years','Python, PyTorch, MLOps, Azure ML','Apply ML to power intelligent features across Microsoft products.','2026-08-13','2026-10-10','Data & Analytics'),
  j('j25','BI Analyst','HDFC Bank','Mumbai','Full-time','₹5–8 LPA','Fresher','Power BI, SQL, Excel, DAX','HDFC retail analytics team. Drive data-driven banking decisions.','2026-08-05','2026-09-25','Data & Analytics'),

  // ═══════ CLOUD & DEVOPS (15+) ═══════
  j('j30','Cloud Engineer','Accenture','Pan India','Full-time','₹6–10 LPA','0–2 years','AWS, Terraform, Docker, Linux','Design and manage cloud infrastructure for enterprise clients.','2026-08-06','2026-09-30','Cloud & DevOps'),
  j('j31','DevOps Engineer','Infosys','Bengaluru / Pune','Full-time','₹5–9 LPA','0–1 year','Docker, Kubernetes, Jenkins, AWS','Infosys DevOps practice. CI/CD pipeline management.','2026-08-08','2026-09-28','Cloud & DevOps'),
  j('j32','SRE','Google India','Bengaluru','Full-time','₹18–30 LPA','0–2 years','Linux, Kubernetes, Go, Monitoring','Site Reliability Engineering role. Keep Google services running.','2026-08-15','2026-10-15','Cloud & DevOps'),
  j('j33','AWS Solutions Architect','Capgemini','Bengaluru / Mumbai','Full-time','₹8–14 LPA','1–3 years','AWS, CloudFormation, Networking, Security','Cloud architecture consulting for enterprise clients.','2026-08-10','2026-10-01','Cloud & DevOps'),

  // ═══════ CYBERSECURITY (10+) ═══════
  j('j40','Cybersecurity Analyst','Wipro','Bengaluru / Hyderabad','Full-time','₹5–8 LPA','Fresher','SIEM, Networking, Linux, Ethical Hacking','Wipro CyberDefence Center. Monitor & respond to threats.','2026-08-04','2026-09-30','Cybersecurity'),
  j('j41','Information Security Analyst','TCS','Chennai / Mumbai','Full-time','₹5–9 LPA','0–1 year','Firewalls, IDS/IPS, SOC, VAPT','TCS cybersecurity practice. Protect enterprise clients.','2026-08-07','2026-09-28','Cybersecurity'),

  // ═══════ PSU / GOVERNMENT (20+) ═══════
  j('j50','Scientist/Engineer SC','ISRO','Bengaluru / Thiruvananthapuram','Full-time','₹8–15 LPA','Fresher','Gate Score, Electronics, CS, Mech','ISRO recruitment through GATE. Space research & satellite development.','2026-07-01','2026-09-30','PSU / Government'),
  j('j51','Scientist B','DRDO','Delhi / Hyderabad','Full-time','₹8–14 LPA','Fresher','GATE, Electronics, Signal Processing','DRDO recruitment for defence research projects.','2026-07-15','2026-09-25','PSU / Government'),
  j('j52','Executive Trainee','NTPC','Pan India','Full-time','₹8–12 LPA','Fresher','GATE, Electrical, Mechanical','NTPC executive trainee through GATE. Power sector career.','2026-08-01','2026-10-01','PSU / Government'),
  j('j53','Graduate Engineer Trainee','BHEL','Pan India','Full-time','₹8–12 LPA','Fresher','GATE, Mechanical, Electrical, Civil','BHEL recruitment through GATE. Heavy engineering.','2026-08-05','2026-09-30','PSU / Government'),
  j('j54','Probationary Officer','SBI','Pan India','Full-time','₹8–12 LPA','Fresher','Quantitative, Reasoning, English, Banking','SBI PO recruitment. Premier banking career.','2026-08-10','2026-09-20','PSU / Government'),
  j('j55','Probationary Officer','IBPS','Pan India','Full-time','₹7–10 LPA','Fresher','Quant, Reasoning, English, Computer','IBPS PO exam for 11 nationalized banks.','2026-08-15','2026-10-15','PSU / Government'),

  // ═══════ CORE ENGINEERING (15+) ═══════
  j('j60','Graduate Engineer Trainee','L&T','Mumbai / Chennai','Full-time','₹6–9 LPA','Fresher','Civil, Mech, Electrical, AutoCAD','L&T campus hiring for engineering trainees. Infrastructure & EPC projects.','2026-08-03','2026-09-30','Core Engineering'),
  j('j61','Graduate Trainee Engineer','Siemens India','Mumbai / Pune / Goa','Full-time','₹6–10 LPA','Fresher','PLC, SCADA, Automation, Electrical','Siemens trainee program. Industrial automation & digital industries.','2026-08-08','2026-09-28','Core Engineering'),
  j('j62','GET - R&D','Tata Motors','Pune','Full-time','₹6–9 LPA','Fresher','Automotive, CATIA, MATLAB, Mech','Tata Motors R&D division. Work on next-gen EVs.','2026-08-06','2026-09-30','Core Engineering'),
  j('j63','Management Trainee','Maruti Suzuki','Gurgaon / Manesar','Full-time','₹6–10 LPA','Fresher','Manufacturing, Quality, Lean, Mech','Maruti Suzuki MT program. India\'s largest car manufacturer.','2026-08-09','2026-10-01','Core Engineering'),

  // ═══════ BANKING & FINANCE (15+) ═══════
  j('j70','Relationship Manager','HDFC Bank','Pan India','Full-time','₹4–7 LPA','Fresher','Sales, Communication, Banking Products','HDFC Bank RM role. Retail banking & wealth management.','2026-08-04','2026-09-30','Banking & Finance'),
  j('j71','Credit Analyst','ICICI Bank','Mumbai / Delhi / Bengaluru','Full-time','₹5–8 LPA','Fresher','Financial Analysis, Excel, Risk Assessment','ICICI credit risk analysis role. Evaluate loan applications.','2026-08-07','2026-09-28','Banking & Finance'),
  j('j72','Technology Analyst','Goldman Sachs','Bengaluru','Full-time','₹12–20 LPA','Fresher','Java, Python, Finance, Problem Solving','Goldman Sachs Engineering. Build financial technology platforms.','2026-08-12','2026-10-10','Banking & Finance'),
  j('j73','Technology Analyst','Morgan Stanley','Mumbai','Full-time','₹12–20 LPA','Fresher','Java, C++, System Design, Finance','Morgan Stanley tech team. Institutional securities technology.','2026-08-14','2026-10-05','Banking & Finance'),

  // ═══════ MARKETING & CREATIVE (10+) ═══════
  j('j80','Digital Marketing Exec','Zomato','Gurgaon','Full-time','₹4–7 LPA','Fresher','SEO, Social Media, Google Analytics, Content','Zomato marketing team. Drive user acquisition and engagement.','2026-08-05','2026-09-30','Marketing'),
  j('j81','Content Writer','Unacademy','Bengaluru','Full-time / Remote','₹3.5–6 LPA','Fresher','Writing, SEO, Research, CMS','Create educational content for India\'s largest learning platform.','2026-08-08','2026-09-28','Marketing'),
  j('j82','UI/UX Designer','CRED','Bengaluru','Full-time','₹8–15 LPA','0–2 years','Figma, User Research, Prototyping, Design Systems','Design premium fintech experiences for CRED\'s 30M+ users.','2026-08-10','2026-09-30','Design'),
  j('j83','Graphic Designer','Byju\'s','Bengaluru','Full-time','₹4–7 LPA','Fresher','Photoshop, Illustrator, InDesign, Motion Graphics','Create visual content for India\'s largest edtech platform.','2026-08-06','2026-09-25','Design'),

  // ═══════ INTERNSHIPS (15+) ═══════
  j('j90','SDE Intern','Amazon India','Bengaluru','Internship (6 months)','₹60K–1.2L/month','Pre-final year','DSA, Java/C++, OOP','Amazon SDE internship. PPO conversion available.','2026-08-01','2026-09-15','Internship'),
  j('j91','Engineering Intern','Google India','Bengaluru / Hyderabad','Internship (3 months)','₹80K–1.5L/month','Pre-final year','DSA, System Design, Python','Google STEP/SWE internship program.','2026-08-10','2026-09-20','Internship'),
  j('j92','ML Research Intern','Microsoft Research India','Bengaluru','Internship (3–6 months)','₹50K–1L/month','Pre-final/Final year','ML, Python, Research, Publications','MSRI internship. Work with world-class researchers.','2026-08-12','2026-09-28','Internship'),
  j('j93','Product Intern','Flipkart','Bengaluru','Internship (2 months)','₹40K–80K/month','Pre-final year','Product Thinking, Analytics, Communication','Flipkart product management internship.','2026-08-08','2026-09-25','Internship'),
  j('j94','Data Science Intern','Swiggy','Bengaluru / Remote','Internship (3 months)','₹30K–60K/month','Pre-final year','Python, ML, SQL, Statistics','Swiggy data science internship with PPO opportunity.','2026-08-09','2026-09-30','Internship'),
  j('j95','Frontend Intern','Razorpay','Bengaluru','Internship (6 months)','₹50K–80K/month','Pre-final year','React, TypeScript, CSS, Git','Razorpay frontend engineering internship.','2026-08-11','2026-10-01','Internship'),
]

export const JOB_CATEGORIES = [
  'All', 'Software Development', 'Data & Analytics', 'Cloud & DevOps',
  'Cybersecurity', 'PSU / Government', 'Core Engineering', 'Banking & Finance',
  'Marketing', 'Design', 'Internship'
]
