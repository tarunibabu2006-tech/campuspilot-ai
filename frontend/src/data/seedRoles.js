// ============================================================
// seedRoles.js — All Career Role Presets with Auto-Fill Skills
// Used by: Career Predictor, Voice Interview, Mock Interview, Placement Prep
// ============================================================

export const CAREER_ROLE_PRESETS = [
  // ═══════════════ TECH & DEVELOPMENT ═══════════════
  { id: 'r1', title: 'Frontend Developer (React/Vue)', category: 'Tech & Development', skills: 'HTML, CSS, JavaScript, React, Vue.js, Tailwind CSS, TypeScript, Redux', interests: 'UI/UX, Web Apps, SPA', education: 'B.Tech CSE / BCA / B.Sc CS' },
  { id: 'r2', title: 'Backend Developer (Node/Python/Java)', category: 'Tech & Development', skills: 'Node.js, Python, Java, REST APIs, Express, Django, Spring Boot, PostgreSQL', interests: 'Microservices, APIs, Distributed Systems', education: 'B.Tech CSE / MCA' },
  { id: 'r3', title: 'Full Stack Developer', category: 'Tech & Development', skills: 'React, Node.js, SQL, MongoDB, Express, REST APIs, Git, Docker', interests: 'Full Stack, Web Apps, SaaS', education: 'B.Tech / BCA / B.Sc CS' },
  { id: 'r4', title: 'DevOps Engineer', category: 'Tech & Development', skills: 'Docker, Kubernetes, AWS, CI/CD, Jenkins, Terraform, Linux, Ansible', interests: 'Infrastructure, Automation, Cloud', education: 'B.Tech CSE/IT' },
  { id: 'r5', title: 'Cloud Engineer', category: 'Tech & Development', skills: 'AWS, Azure, GCP, Terraform, CloudFormation, Serverless, Networking', interests: 'Cloud Architecture, IaC, Multi-Cloud', education: 'B.Tech / MCA' },
  { id: 'r6', title: 'Cybersecurity Analyst', category: 'Tech & Development', skills: 'Networking, Linux, Ethical Hacking, SIEM, Firewalls, Cryptography, Pen Testing', interests: 'SOC Analysis, Threat Detection', education: 'B.Tech CSE / B.Sc Cybersecurity' },
  { id: 'r7', title: 'Mobile Developer (Android/iOS)', category: 'Tech & Development', skills: 'Kotlin, Swift, Flutter, Dart, React Native, Firebase, REST APIs', interests: 'Mobile Apps, Cross-Platform', education: 'B.Tech / BCA' },
  { id: 'r8', title: 'Game Developer', category: 'Tech & Development', skills: 'Unity, C#, Unreal Engine, 3D Design, Blender, Game Physics', interests: 'Game Design, AR/VR, Simulation', education: 'B.Tech / Game Design Diploma' },
  { id: 'r9', title: 'Blockchain Developer', category: 'Tech & Development', skills: 'Solidity, Web3.js, Ethereum, Smart Contracts, DeFi, Cryptography', interests: 'Decentralized Apps, DeFi, NFT', education: 'B.Tech CSE' },
  { id: 'r10', title: 'QA / Test Engineer', category: 'Tech & Development', skills: 'Selenium, Manual Testing, Automation, JUnit, TestNG, Cypress, JIRA', interests: 'Quality Assurance, Automation Testing', education: 'B.Tech / BCA / B.Sc IT' },
  { id: 'r11', title: 'System Architect', category: 'Tech & Development', skills: 'System Design, Microservices, Scalability, Load Balancing, Design Patterns', interests: 'Enterprise Architecture, Distributed Systems', education: 'B.Tech + 5+ yrs exp' },

  // ═══════════════ DATA & ANALYTICS ═══════════════
  { id: 'r12', title: 'Data Scientist', category: 'Data & Analytics', skills: 'Python, Machine Learning, Statistics, SQL, Pandas, Scikit-Learn, PyTorch', interests: 'Predictive Analytics, Deep Learning, NLP', education: 'B.Tech / M.Sc Data Science' },
  { id: 'r13', title: 'Data Analyst', category: 'Data & Analytics', skills: 'SQL, Excel, Tableau, Python, Power BI, Data Visualization', interests: 'Business Intelligence, Dashboards', education: 'B.Sc / B.Com / BCA / B.Tech' },
  { id: 'r14', title: 'Business Analyst', category: 'Data & Analytics', skills: 'Excel, SQL, Power BI, Communication, Requirements Gathering, JIRA', interests: 'Process Optimization, Strategy', education: 'BBA / MBA / B.Tech' },
  { id: 'r15', title: 'ML Engineer', category: 'Data & Analytics', skills: 'Python, TensorFlow, PyTorch, MLOps, Kubeflow, Feature Engineering', interests: 'Model Deployment, MLOps, Production ML', education: 'B.Tech / M.Tech AI' },
  { id: 'r16', title: 'Data Engineer', category: 'Data & Analytics', skills: 'Python, SQL, ETL, Apache Spark, Airflow, Snowflake, Kafka', interests: 'Data Pipelines, Warehousing', education: 'B.Tech CSE / IT' },
  { id: 'r17', title: 'BI Developer', category: 'Data & Analytics', skills: 'Power BI, Tableau, SQL, DAX, Data Modeling, SSRS, SSIS', interests: 'Business Intelligence, Reporting', education: 'B.Tech / B.Com / BCA' },

  // ═══════════════ NON-TECH BUSINESS ═══════════════
  { id: 'r18', title: 'Marketing Manager', category: 'Non-Tech Business', skills: 'Digital Marketing, SEO, Content Strategy, Brand Management, Analytics', interests: 'Growth Marketing, Campaign Management', education: 'MBA Marketing / BBA' },
  { id: 'r19', title: 'Digital Marketing Specialist', category: 'Non-Tech Business', skills: 'SEO, SEM, Social Media Marketing, Google Ads, Analytics, Content Marketing', interests: 'Performance Marketing, Email Marketing', education: 'BBA / MBA / Any Degree' },
  { id: 'r20', title: 'HR Manager', category: 'Non-Tech Business', skills: 'Recruitment, Employee Relations, HRIS, Performance Management, Labour Law', interests: 'Talent Acquisition, Employee Engagement', education: 'MBA HR / MSW' },
  { id: 'r21', title: 'Finance Manager', category: 'Non-Tech Business', skills: 'Accounting, Financial Analysis, Budgeting, Tally, SAP FICO, Excel', interests: 'Corporate Finance, Investment, Risk', education: 'B.Com / MBA Finance / CA' },
  { id: 'r22', title: 'Sales Manager', category: 'Non-Tech Business', skills: 'CRM, Sales Strategy, Negotiation, Client Management, Salesforce', interests: 'B2B Sales, Enterprise Selling', education: 'MBA / BBA / Any Degree' },
  { id: 'r23', title: 'Operations Manager', category: 'Non-Tech Business', skills: 'Process Optimization, Supply Chain, Lean Six Sigma, Project Management', interests: 'Logistics, Manufacturing, Quality', education: 'MBA Operations / B.Tech' },
  { id: 'r24', title: 'Product Manager', category: 'Non-Tech Business', skills: 'Roadmapping, Agile, UX/UI, Market Research, Data-Driven Decisions, A/B Testing', interests: 'SaaS Products, User Growth', education: 'B.Tech + MBA / Product Course' },
  { id: 'r25', title: 'Management Consultant', category: 'Non-Tech Business', skills: 'Problem-Solving, Strategy, Communication, Data Analysis, Presentations', interests: 'Strategy Consulting, Transformation', education: 'MBA / CA / B.Tech from IIT/NIT' },

  // ═══════════════ GOVERNMENT & CIVIL SERVICES ═══════════════
  { id: 'r26', title: 'IAS / IPS / IFS Officer (UPSC)', category: 'Government & Civil Services', skills: 'General Studies, Current Affairs, Essay Writing, Ethics, Indian Polity', interests: 'Public Administration, Governance', education: 'Any Graduation (UPSC CSE)' },
  { id: 'r27', title: 'ISRO Scientist', category: 'Government & Civil Services', skills: 'Physics, Mathematics, Space Technology, Satellite Systems, MATLAB', interests: 'Aerospace Research, Propulsion', education: 'B.Tech / M.Tech / Ph.D' },
  { id: 'r28', title: 'RBI Grade B Officer', category: 'Government & Civil Services', skills: 'Economics, Finance, Reasoning, Quantitative Aptitude, English', interests: 'Banking Regulation, Monetary Policy', education: 'Any Graduation (60%+)' },
  { id: 'r29', title: 'SSC CGL Officer', category: 'Government & Civil Services', skills: 'Aptitude, Reasoning, English, General Awareness, Computer Basics', interests: 'Government Administration', education: 'Any Graduation' },
  { id: 'r30', title: 'DRDO Scientist', category: 'Government & Civil Services', skills: 'Electronics, Mechanical Design, Defence Tech, R&D, Signal Processing', interests: 'Defence Research, Innovation', education: 'B.Tech / M.Tech / Ph.D' },

  // ═══════════════ MEDICAL & HEALTHCARE ═══════════════
  { id: 'r31', title: 'Doctor (MBBS/MD)', category: 'Medical & Healthcare', skills: 'Anatomy, Physiology, Pharmacology, Pathology, Clinical Diagnosis', interests: 'Patient Care, Surgery, Research', education: 'MBBS / MD' },
  { id: 'r32', title: 'Nurse (BSc/GNM)', category: 'Medical & Healthcare', skills: 'Patient Care, First Aid, Medication Admin, Vital Signs, ICU Management', interests: 'Critical Care, Community Health', education: 'B.Sc Nursing / GNM' },
  { id: 'r33', title: 'Pharmacist', category: 'Medical & Healthcare', skills: 'Medicinal Chemistry, Pharmacology, Drug Dispensing, Quality Control', interests: 'Clinical Pharmacy, Drug Research', education: 'B.Pharm / M.Pharm' },
  { id: 'r34', title: 'Lab Technician', category: 'Medical & Healthcare', skills: 'Lab Testing, Equipment Operation, Blood Analysis, Microbiology', interests: 'Pathology, Diagnostics', education: 'B.Sc MLT / DMLT' },
  { id: 'r35', title: 'Physiotherapist', category: 'Medical & Healthcare', skills: 'Rehabilitation, Anatomy, Kinesiology, Electrotherapy, Exercise Therapy', interests: 'Sports Medicine, Neuro Rehab', education: 'BPT / MPT' },
  { id: 'r36', title: 'Veterinarian', category: 'Medical & Healthcare', skills: 'Animal Anatomy, Veterinary Surgery, Parasitology, Vaccination', interests: 'Animal Healthcare, Livestock', education: 'BVSc & AH' },

  // ═══════════════ CREATIVE & ARTS ═══════════════
  { id: 'r37', title: 'Graphic Designer', category: 'Creative & Arts', skills: 'Photoshop, Illustrator, Figma, InDesign, Typography, Color Theory', interests: 'Branding, Print Design, Digital Art', education: 'B.Des / BFA / Diploma' },
  { id: 'r38', title: 'Video Editor', category: 'Creative & Arts', skills: 'Premiere Pro, After Effects, DaVinci Resolve, Motion Graphics, Sound Design', interests: 'Film Editing, YouTube Content, Ads', education: 'B.Sc Visual Communication / Diploma' },
  { id: 'r39', title: 'Content Writer', category: 'Creative & Arts', skills: 'Writing, Editing, SEO Writing, Copywriting, Research, CMS (WordPress)', interests: 'Blogging, Technical Writing, Marketing Content', education: 'B.A. English / Journalism / Any Degree' },
  { id: 'r40', title: 'Photographer', category: 'Creative & Arts', skills: 'Camera Operation, Lighting, Photo Editing, Lightroom, Composition', interests: 'Fashion, Product, Events Photography', education: 'Diploma / Self-Taught / B.Des' },
  { id: 'r41', title: 'UX/UI Designer', category: 'Creative & Arts', skills: 'Figma, Adobe XD, User Research, Wireframing, Prototyping, Design Systems', interests: 'Product Design, Interaction Design', education: 'B.Des / B.Tech + UX Courses' },

  // ═══════════════ EMERGING ROLES ═══════════════
  { id: 'r42', title: 'Sustainability Manager', category: 'Emerging Roles', skills: 'ESG Reporting, Green Technology, Carbon Accounting, Environmental Policy', interests: 'Climate Tech, Clean Energy', education: 'MBA / B.Tech Environmental / M.Sc' },
  { id: 'r43', title: 'AI Ethics Lead', category: 'Emerging Roles', skills: 'AI Governance, Bias Testing, Fairness Metrics, Policy Framework, Responsible AI', interests: 'AI Regulation, Data Privacy', education: 'M.Tech AI / Law + Tech / MBA' },
  { id: 'r44', title: 'Prompt Engineer', category: 'Emerging Roles', skills: 'LLM Prompting, AI Interactions, Chain-of-Thought, GPT/Claude/Gemini APIs', interests: 'Generative AI, Content Automation', education: 'Any Degree + AI Skills' },
  { id: 'r45', title: 'GenAI Architect', category: 'Emerging Roles', skills: 'LLM Integration, RAG Pipelines, Vector Databases, Model Fine-Tuning, LangChain', interests: 'Enterprise AI, Model Deployment', education: 'B.Tech / M.Tech AI + Experience' },
  { id: 'r46', title: 'Agentic AI Developer', category: 'Emerging Roles', skills: 'Multi-Agent Systems, Tool-Use AI, LangGraph, AutoGen, Function Calling', interests: 'Autonomous AI Agents, Workflow Automation', education: 'B.Tech CSE / M.Tech AI' },
  { id: 'r47', title: 'RAG Engineer', category: 'Emerging Roles', skills: 'Retrieval-Augmented Generation, Embeddings, Pinecone, ChromaDB, LangChain', interests: 'Knowledge Systems, Enterprise Search', education: 'B.Tech / M.Tech' },
  { id: 'r48', title: 'Solar Consultant', category: 'Emerging Roles', skills: 'Solar PV Design, Energy Audit, AutoCAD, PVsyst, Grid Integration', interests: 'Renewable Energy, Clean Tech', education: 'B.Tech EEE / Energy Management' },

  // ═══════════════ LAW ═══════════════
  { id: 'r49', title: 'Corporate Lawyer', category: 'Law', skills: 'Contract Drafting, M&A, Corporate Governance, SEBI Regulations, IP Law', interests: 'Corporate Legal, Compliance', education: 'LLB / LLM / BA LLB (5-Year)' },
  { id: 'r50', title: 'Data Privacy & Cyber Law Specialist', category: 'Law', skills: 'GDPR, Indian DPDP Act, IT Act, Cyber Forensics, Privacy Compliance', interests: 'Tech Law, Data Protection', education: 'LLB / LLM Cyber Law' },

  // ═══════════════ EDUCATION ═══════════════
  { id: 'r51', title: 'University Professor (UGC)', category: 'Education', skills: 'Subject Expertise, Research, UGC-NET, Ph.D. Thesis, Academic Writing', interests: 'Teaching, Research Publications', education: 'Ph.D + UGC-NET' },

  // ═══════════════ ADDITIONAL SPECIALIZED ═══════════════
  { id: 'r52', title: 'Strategic Advisor', category: 'Non-Tech Business', skills: 'Business Strategy, Market Analysis, Financial Modeling, Stakeholder Management', interests: 'Corporate Strategy, Growth Advisory', education: 'MBA / CA / CFA' },
  { id: 'r53', title: 'Director of Business Development', category: 'Non-Tech Business', skills: 'Partnership Development, Revenue Growth, Enterprise Sales, GTM Strategy', interests: 'Enterprise Expansion, M&A', education: 'MBA / B.Tech + Experience' },
  { id: 'r54', title: 'Supply Chain & Logistics Manager', category: 'Non-Tech Business', skills: 'SCM, Procurement, Warehouse Management, ERP (SAP), Demand Planning', interests: 'E-commerce Logistics, Manufacturing', education: 'MBA Operations / B.Tech IE' },
  { id: 'r55', title: 'Financial Planner / Wealth Manager', category: 'Non-Tech Business', skills: 'Mutual Funds, Insurance, Tax Planning, Investment Advisory, CFP', interests: 'Personal Finance, Portfolio Management', education: 'MBA Finance / CA / CFP' }
]

export const ROLE_CATEGORIES = [
  'All',
  'Tech & Development',
  'Data & Analytics',
  'Non-Tech Business',
  'Government & Civil Services',
  'Medical & Healthcare',
  'Creative & Arts',
  'Emerging Roles',
  'Law',
  'Education'
]
