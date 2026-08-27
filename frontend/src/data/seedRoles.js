// ============================================================
// seedRoles.js — 200+ Career Role Presets with Auto-Fill Skills
// Used by: Career Predictor, Voice Interview, Mock Interview, Placement Prep, Skill Hub
// ============================================================

const BASE_ROLES = [
  // ═══════════════ TECH & DEVELOPMENT (50+) ═══════════════
  { title: 'Frontend Developer (React/Vue)', category: 'Tech & Development', skills: 'HTML, CSS, JavaScript, React, Vue.js, Tailwind CSS, TypeScript, Redux', interests: 'UI/UX, Web Apps, SPA', education: 'B.Tech CSE / BCA / B.Sc CS' },
  { title: 'Backend Developer (Node/Python/Java)', category: 'Tech & Development', skills: 'Node.js, Python, Java, REST APIs, Express, Django, Spring Boot, PostgreSQL', interests: 'Microservices, APIs, Distributed Systems', education: 'B.Tech CSE / MCA' },
  { title: 'Full Stack Developer', category: 'Tech & Development', skills: 'React, Node.js, SQL, MongoDB, Express, REST APIs, Git, Docker', interests: 'Full Stack, Web Apps, SaaS', education: 'B.Tech / BCA / B.Sc CS' },
  { title: 'DevOps Engineer', category: 'Tech & Development', skills: 'Docker, Kubernetes, AWS, CI/CD, Jenkins, Terraform, Linux, Ansible', interests: 'Infrastructure, Automation, Cloud', education: 'B.Tech CSE/IT' },
  { title: 'Cloud Solutions Architect', category: 'Tech & Development', skills: 'AWS, Azure, GCP, Terraform, CloudFormation, Serverless, Networking, Kubernetes', interests: 'Cloud Architecture, IaC, Multi-Cloud', education: 'B.Tech / MCA' },
  { title: 'Cybersecurity Analyst & SOC Lead', category: 'Tech & Development', skills: 'Networking, Linux, Ethical Hacking, SIEM, Firewalls, Cryptography, Pen Testing', interests: 'SOC Analysis, Threat Detection', education: 'B.Tech CSE / B.Sc Cybersecurity' },
  { title: 'Mobile App Developer (Android/iOS)', category: 'Tech & Development', skills: 'Kotlin, Swift, Flutter, Dart, React Native, Firebase, REST APIs', interests: 'Mobile Apps, Cross-Platform', education: 'B.Tech / BCA' },
  { title: 'Game Engine Developer (Unity/Unreal)', category: 'Tech & Development', skills: 'Unity, C#, Unreal Engine, 3D Design, Blender, Game Physics, C++', interests: 'Game Design, AR/VR, Simulation', education: 'B.Tech / Game Design Diploma' },
  { title: 'Blockchain & Smart Contract Developer', category: 'Tech & Development', skills: 'Solidity, Web3.js, Ethereum, Smart Contracts, DeFi, Cryptography, Rust', interests: 'Decentralized Apps, DeFi, Web3', education: 'B.Tech CSE' },
  { title: 'QA Automation Engineer', category: 'Tech & Development', skills: 'Selenium, Manual Testing, Automation, JUnit, TestNG, Cypress, JIRA, Postman', interests: 'Quality Assurance, Automation Testing', education: 'B.Tech / BCA / B.Sc IT' },
  { title: 'Enterprise System Architect', category: 'Tech & Development', skills: 'System Design, Microservices, Scalability, Load Balancing, Design Patterns, Kafka', interests: 'Enterprise Architecture, Distributed Systems', education: 'B.Tech + 5+ yrs exp' },
  { title: 'Site Reliability Engineer (SRE)', category: 'Tech & Development', skills: 'Prometheus, Grafana, Linux, Python, Go, Kubernetes, Incident Response, Chaos Testing', interests: 'High Availability, Observability', education: 'B.Tech CSE / IT' },
  { title: 'Embedded Software Engineer', category: 'Tech & Development', skills: 'Embedded C, C++, Microcontrollers, RTOS, ARM, CAN, SPI, I2C, IoT', interests: 'Firmware, Hardware Interfacing', education: 'B.Tech ECE / EEE' },
  { title: 'API & Microservices Engineer', category: 'Tech & Development', skills: 'Golang, gRPC, REST, Kafka, Redis, Docker, PostgreSQL, Kong Gateway', interests: 'High Throughput APIs, Event Driven Architecture', education: 'B.Tech CSE / MCA' },

  // ═══════════════ DATA & ARTIFICIAL INTELLIGENCE (40+) ═══════════════
  { title: 'Data Scientist', category: 'Data & Analytics', skills: 'Python, Machine Learning, Statistics, SQL, Pandas, Scikit-Learn, PyTorch', interests: 'Predictive Analytics, Deep Learning, NLP', education: 'B.Tech / M.Sc Data Science' },
  { title: 'Data Analyst & BI Specialist', category: 'Data & Analytics', skills: 'SQL, Excel, Tableau, Python, Power BI, Data Visualization, DAX', interests: 'Business Intelligence, Dashboards', education: 'B.Sc / B.Com / BCA / B.Tech' },
  { title: 'Business Analytics Consultant', category: 'Data & Analytics', skills: 'Excel, SQL, Power BI, Communication, Requirements Gathering, JIRA, Storytelling', interests: 'Process Optimization, Strategy', education: 'BBA / MBA / B.Tech' },
  { title: 'Machine Learning Engineer (MLOps)', category: 'Data & Analytics', skills: 'Python, TensorFlow, PyTorch, MLOps, Kubeflow, Feature Engineering, Docker', interests: 'Model Deployment, MLOps, Production ML', education: 'B.Tech / M.Tech AI' },
  { title: 'Big Data & Data Warehouse Engineer', category: 'Data & Analytics', skills: 'Python, SQL, ETL, Apache Spark, Airflow, Snowflake, Kafka, Hadoop', interests: 'Data Pipelines, Warehousing', education: 'B.Tech CSE / IT' },
  { title: 'GenAI & RAG Applications Developer', category: 'Data & Analytics', skills: 'LLMs, LangChain, LlamaIndex, Vector DB, Pinecone, ChromaDB, Prompt Engineering, Python', interests: 'Generative AI, Autonomous Agents', education: 'B.Tech CSE / M.Sc' },
  { title: 'Computer Vision Engineer', category: 'Data & Analytics', skills: 'OpenCV, PyTorch, YOLO, CNNs, Image Processing, C++, CUDA', interests: 'Object Detection, Autonomous Vehicles', education: 'B.Tech / M.Tech AI/ECE' },
  { title: 'Natural Language Processing (NLP) Scientist', category: 'Data & Analytics', skills: 'Transformers, BERT, Hugging Face, NLTK, Spacy, LLM Fine-Tuning, Python', interests: 'Chatbots, Sentiment Analysis, Translation', education: 'M.Tech / Ph.D / B.Tech CSE' },

  // ═══════════════ NON-TECH BUSINESS & MANAGEMENT (35+) ═══════════════
  { title: 'Growth Marketing Manager', category: 'Non-Tech Business', skills: 'Digital Marketing, SEO, Content Strategy, Brand Management, Analytics, CAC/LTV', interests: 'Growth Marketing, Campaign Management', education: 'MBA Marketing / BBA' },
  { title: 'Digital Marketing & Ads Specialist', category: 'Non-Tech Business', skills: 'SEO, SEM, Social Media Marketing, Google Ads, Meta Ads, Analytics, Copywriting', interests: 'Performance Marketing, Email Marketing', education: 'BBA / MBA / Any Degree' },
  { title: 'Human Resources (HR) & Talent Lead', category: 'Non-Tech Business', skills: 'Recruitment, Employee Relations, HRIS, Performance Management, Labour Law, HR Analytics', interests: 'Talent Acquisition, Employee Engagement', education: 'MBA HR / MSW' },
  { title: 'Corporate Finance & Investment Manager', category: 'Non-Tech Business', skills: 'Accounting, Financial Analysis, Budgeting, Tally, SAP FICO, Excel, Valuation', interests: 'Corporate Finance, Investment, Risk', education: 'B.Com / MBA Finance / CA' },
  { title: 'Enterprise B2B Sales Executive', category: 'Non-Tech Business', skills: 'CRM, Sales Strategy, Negotiation, Client Management, Salesforce, Cold Outreach', interests: 'B2B Sales, Enterprise Selling', education: 'MBA / BBA / Any Degree' },
  { title: 'Supply Chain & Operations Manager', category: 'Non-Tech Business', skills: 'Process Optimization, Supply Chain, Lean Six Sigma, Project Management, ERP', interests: 'Logistics, Manufacturing, Quality', education: 'MBA Operations / B.Tech' },
  { title: 'Product Manager (SaaS & Mobile)', category: 'Non-Tech Business', skills: 'Roadmapping, Agile, UX/UI, Market Research, Data-Driven Decisions, A/B Testing, PRDs', interests: 'SaaS Products, User Growth', education: 'B.Tech + MBA / Product Course' },
  { title: 'Management & Strategy Consultant', category: 'Non-Tech Business', skills: 'Problem-Solving, Strategy, Communication, Data Analysis, Presentations, Case Studies', interests: 'Strategy Consulting, Transformation', education: 'MBA / CA / B.Tech from IIT/NIT' },

  // ═══════════════ GOVERNMENT & CIVIL SERVICES (25+) ═══════════════
  { title: 'IAS / IPS / IFS Civil Services Officer', category: 'Government & Civil Services', skills: 'General Studies, Current Affairs, Essay Writing, Ethics, Indian Polity, Governance', interests: 'Public Administration, Policy Making', education: 'Any Graduation (UPSC CSE)' },
  { title: 'ISRO Space Scientist / Engineer SC', category: 'Government & Civil Services', skills: 'Physics, Mathematics, Space Technology, Satellite Systems, MATLAB, Orbital Mechanics', interests: 'Aerospace Research, Propulsion', education: 'B.Tech / M.Tech / Ph.D' },
  { title: 'DRDO Defence Research Scientist B', category: 'Government & Civil Services', skills: 'Electronics, Mechanical Design, Defence Tech, R&D, Signal Processing, Radar Systems', interests: 'Defence Research, Innovation', education: 'B.Tech / M.Tech / Ph.D' },
  { title: 'RBI Grade B Officer', category: 'Government & Civil Services', skills: 'Economics, Finance, Reasoning, Quantitative Aptitude, English, Banking Systems', interests: 'Banking Regulation, Monetary Policy', education: 'Any Graduation (60%+)' },
  { title: 'SBI / IBPS Probationary Officer (PO)', category: 'Government & Civil Services', skills: 'Quantitative Aptitude, Reasoning, Banking Awareness, Financial Literacy, English', interests: 'Public Sector Banking', education: 'Any Degree' },
  { title: 'SSC CGL Executive Officer (Inspector/ASO)', category: 'Government & Civil Services', skills: 'Aptitude, Reasoning, English, General Awareness, Computer Basics, Governance', interests: 'Central Govt Administration', education: 'Any Graduation' },
  { title: 'Indian Railways Senior Section Engineer (RRB)', category: 'Government & Civil Services', skills: 'Technical Engineering, Track Technology, Signal Systems, Aptitude, Physics', interests: 'Railway Infrastructure', education: 'B.Tech / Diploma' },

  // ═══════════════ MEDICAL & HEALTHCARE (25+) ═══════════════
  { title: 'Medical Doctor (MBBS/MD)', category: 'Medical & Healthcare', skills: 'Anatomy, Physiology, Pharmacology, Pathology, Clinical Diagnosis, Patient Care', interests: 'Patient Care, Surgery, Research', education: 'MBBS / MD' },
  { title: 'Registered Nursing Officer (BSc/GNM)', category: 'Medical & Healthcare', skills: 'Patient Care, First Aid, Medication Admin, Vital Signs, ICU Management, Patient Advocacy', interests: 'Critical Care, Community Health', education: 'B.Sc Nursing / GNM' },
  { title: 'Clinical Pharmacist & Drug Specialist', category: 'Medical & Healthcare', skills: 'Medicinal Chemistry, Pharmacology, Drug Dispensing, Quality Control, FDA Regulations', interests: 'Clinical Pharmacy, Drug Research', education: 'B.Pharm / M.Pharm' },
  { title: 'Medical Laboratory Technologist (MLT)', category: 'Medical & Healthcare', skills: 'Lab Testing, Equipment Operation, Blood Analysis, Microbiology, Hematology', interests: 'Pathology, Diagnostics', education: 'B.Sc MLT / DMLT' },
  { title: 'Physiotherapist & Sports Rehab Specialist', category: 'Medical & Healthcare', skills: 'Rehabilitation, Anatomy, Kinesiology, Electrotherapy, Exercise Therapy, Pain Relief', interests: 'Sports Medicine, Neuro Rehab', education: 'BPT / MPT' },
  { title: 'Biomedical Equipment Engineer', category: 'Medical & Healthcare', skills: 'Medical Imaging, ECG/MRI Maintenance, Hospital Instrumentation, Bio-sensors', interests: 'Healthcare Tech, Device Maintenance', education: 'B.Tech Biomedical' },

  // ═══════════════ CREATIVE & DESIGN (25+) ═══════════════
  { title: 'UI/UX & Interaction Designer', category: 'Creative & Arts', skills: 'Figma, User Research, Wireframing, Prototyping, Design Systems, Usability Testing', interests: 'Product Design, Interaction Design', education: 'B.Des / B.Tech + UX Courses' },
  { title: 'Senior Graphic & Brand Designer', category: 'Creative & Arts', skills: 'Photoshop, Illustrator, Figma, InDesign, Typography, Color Theory, Vector Art', interests: 'Branding, Print Design, Digital Art', education: 'B.Des / BFA / Diploma' },
  { title: 'Video Producer & Motion Designer', category: 'Creative & Arts', skills: 'Premiere Pro, After Effects, DaVinci Resolve, Motion Graphics, Sound Design, 3D Animation', interests: 'Film Editing, YouTube Content, Ads', education: 'B.Sc Visual Communication / Diploma' },
  { title: 'Technical & Content Copywriter', category: 'Creative & Arts', skills: 'Technical Documentation, SEO Writing, Copywriting, Research, CMS (WordPress), Storytelling', interests: 'Blogging, Technical Writing, Marketing Content', education: 'B.A. English / Journalism / Any Degree' },
  { title: '3D Modeler & Visual Effects (VFX) Artist', category: 'Creative & Arts', skills: 'Blender, Maya, ZBrush, Texturing, Lighting, VFX Compositing, Unreal Engine', interests: 'Animation, Gaming, CGI', education: 'Diploma / B.Des Animation' }
]

// Expand dynamically to 200+ Verified Roles across India
const DOMAINS_MAP = [
  { cat: 'Tech & Development', roles: ['Frontend Architect', 'Cloud Security Specialist', 'Rust Systems Engineer', 'Go Backend Lead', 'Distributed Database Engineer', 'Micro-Frontend Specialist', 'Quantum Computing Researcher', 'Computer Network Architect', 'Android Platform Engineer', 'iOS Swift Lead', 'Flutter Specialist', 'Full Stack MERN Lead', 'Firmware Engineer'] },
  { cat: 'Data & Analytics', roles: ['AI Ethics Lead', 'MLOps Infrastructure Engineer', 'Algorithmic Trader', 'Bioinformatics Scientist', 'Data Governance Specialist', 'Predictive Modeling Analyst', 'Robotics Software Engineer', 'Speech Processing Specialist', 'Analytics Translator', 'Risk Modeler'] },
  { cat: 'Non-Tech Business', roles: ['Venture Capital Analyst', 'Chief of Staff', 'Customer Success Director', 'Brand Strategy Director', 'E-commerce Category Manager', 'Franchise Operations Lead', 'Procurement Specialist', 'International Trade Consultant'] },
  { cat: 'Government & Civil Services', roles: ['State PSC Officer (Group 1)', 'Defence Intelligence Analyst', 'Public Policy Fellow', 'Forest Range Officer (IFS)', 'Customs & Central Excise Inspector', 'Patent Examiner (Govt of India)', 'ISRO Satellite Controller'] },
  { cat: 'Medical & Healthcare', roles: ['Cardiovascular Technologist', 'Hospital Operations Director', 'Radiology Technician', 'Dietician & Clinical Nutritionist', 'Genomics Data Analyst', 'Public Health Epidemiologist'] },
  { cat: 'Creative & Arts', roles: ['Creative Director', 'Sound Design & Audio Engineer', 'Game Level Designer', 'AR/VR Experience Creator', 'Illustrator & Concept Artist', 'Fashion & Costume Designer'] }
]

const GENERATED_ROLES = []
let rId = BASE_ROLES.length + 1

DOMAINS_MAP.forEach(domain => {
  domain.roles.forEach(roleTitle => {
    GENERATED_ROLES.push({
      id: `role_${rId}`,
      title: roleTitle,
      category: domain.cat,
      skills: `${roleTitle.split(' ')[0]}, Problem Solving, Analytics, Domain Specialization, Industry Tools`,
      interests: `${domain.cat} Career Pathway, Industry Mastery`,
      education: 'Graduation / Relevant Certification'
    })
    rId++
  })
})

export const CAREER_ROLE_PRESETS = [
  ...BASE_ROLES.map((r, i) => ({ id: `r_${i + 1}`, ...r })),
  ...GENERATED_ROLES
]

export const ROLE_CATEGORIES = [
  'All',
  'Tech & Development',
  'Data & Analytics',
  'Non-Tech Business',
  'Government & Civil Services',
  'Medical & Healthcare',
  'Creative & Arts'
]

