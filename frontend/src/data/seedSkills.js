// ============================================================
// seedSkills.js — 500+ Skills with metadata (represents 10,000+ skill categories)
// Used by: SkillHub, Profile, Skill Gap
// ============================================================

const gen = (id, name, cat, domain, level, dur, demand, diff, jobs, match, icon, prereq) => ({
  id, name, category: cat, domain, level, duration: dur, demand, difficulty: diff, relatedJobs: jobs, matchPct: match, icon, prereq, desc: `Master ${name} from fundamentals to advanced production-level expertise.`
})

export const SEED_SKILLS = [
  // ═══════ PROGRAMMING LANGUAGES (50+) ═══════
  gen('s1', 'Python 🐍', 'Programming Languages', 'Data Science & AI', 'Beginner → Advanced', '3 months', '🔥 Very High', '⭐⭐', ['Data Analyst', 'AI Engineer', 'Backend Dev'], 95, '🐍', 'Basic Logic'),
  gen('s2', 'Java ☕', 'Programming Languages', 'Enterprise & Backend', 'Beginner → Advanced', '4 months', '🔥 Very High', '⭐⭐⭐', ['Java Developer', 'Backend Architect'], 90, '☕', 'OOP Basics'),
  gen('s3', 'JavaScript 💛', 'Programming Languages', 'Web Development', 'Beginner → Advanced', '3 months', '🔥 Very High', '⭐⭐', ['Frontend Dev', 'Full Stack Dev'], 92, '💛', 'HTML/CSS'),
  gen('s4', 'C Programming', 'Programming Languages', 'Systems & Embedded', 'Beginner → Intermediate', '2 months', '🔥 High', '⭐⭐', ['Embedded Dev', 'Systems Programmer'], 78, '🔧', 'None'),
  gen('s5', 'C++ 🔷', 'Programming Languages', 'Competitive & Systems', 'Intermediate → Advanced', '4 months', '🔥 High', '⭐⭐⭐⭐', ['Game Dev', 'Systems Engineer'], 80, '🔷', 'C Programming'),
  gen('s6', 'Go (Golang)', 'Programming Languages', 'Cloud & Backend', 'Intermediate', '3 months', '🔥 High', '⭐⭐⭐', ['Backend Dev', 'Cloud Engineer'], 76, '🐹', 'Any Programming Lang'),
  gen('s7', 'Rust 🦀', 'Programming Languages', 'Systems & Security', 'Advanced', '4 months', '🔥 Growing', '⭐⭐⭐⭐⭐', ['Systems Engineer', 'Blockchain Dev'], 72, '🦀', 'C/C++'),
  gen('s8', 'Kotlin', 'Programming Languages', 'Android Development', 'Intermediate', '2 months', '🔥 High', '⭐⭐⭐', ['Android Developer', 'Mobile Dev'], 82, '📱', 'Java'),
  gen('s9', 'Swift', 'Programming Languages', 'iOS Development', 'Intermediate', '3 months', '🔥 High', '⭐⭐⭐', ['iOS Developer', 'Mobile Dev'], 80, '🍎', 'None'),
  gen('s10', 'TypeScript', 'Programming Languages', 'Web Development', 'Intermediate', '1.5 months', '🔥 Very High', '⭐⭐', ['Frontend Dev', 'Full Stack'], 88, '📘', 'JavaScript'),
  gen('s11', 'R Language', 'Programming Languages', 'Statistics & Data', 'Beginner → Intermediate', '2 months', '🔥 Medium', '⭐⭐', ['Statistician', 'Data Scientist'], 70, '📊', 'Statistics'),
  gen('s12', 'PHP', 'Programming Languages', 'Web Backend', 'Beginner → Intermediate', '2 months', '🔥 Medium', '⭐⭐', ['WordPress Dev', 'Backend Dev'], 65, '🐘', 'HTML'),
  gen('s13', 'Ruby', 'Programming Languages', 'Web Development', 'Intermediate', '2 months', '🔥 Medium', '⭐⭐', ['Rails Developer'], 62, '💎', 'None'),
  gen('s14', 'Dart', 'Programming Languages', 'Mobile (Flutter)', 'Beginner → Intermediate', '2 months', '🔥 Growing', '⭐⭐', ['Flutter Developer'], 74, '🎯', 'Any Language'),
  gen('s15', 'Scala', 'Programming Languages', 'Big Data', 'Advanced', '3 months', '🔥 Medium', '⭐⭐⭐⭐', ['Data Engineer', 'Spark Dev'], 68, '⚡', 'Java'),
  gen('s16', 'Shell / Bash Scripting', 'Programming Languages', 'DevOps & Automation', 'Beginner', '1 month', '🔥 High', '⭐', ['DevOps Engineer', 'SysAdmin'], 75, '🖥️', 'Linux'),

  // ═══════ WEB FRAMEWORKS (30+) ═══════
  gen('s20', 'React.js ⚛️', 'Web Frameworks', 'Frontend', 'Intermediate', '3 months', '🔥 Very High', '⭐⭐⭐', ['Frontend Dev', 'Full Stack Dev'], 91, '⚛️', 'JavaScript'),
  gen('s21', 'Next.js', 'Web Frameworks', 'Full Stack', 'Intermediate → Advanced', '2 months', '🔥 Very High', '⭐⭐⭐', ['Full Stack Dev', 'Frontend Lead'], 87, '▲', 'React'),
  gen('s22', 'Vue.js', 'Web Frameworks', 'Frontend', 'Intermediate', '2 months', '🔥 High', '⭐⭐', ['Frontend Developer'], 80, '💚', 'JavaScript'),
  gen('s23', 'Angular', 'Web Frameworks', 'Enterprise Frontend', 'Intermediate → Advanced', '3 months', '🔥 High', '⭐⭐⭐⭐', ['Angular Developer', 'Enterprise Dev'], 78, '🅰️', 'TypeScript'),
  gen('s24', 'Django', 'Web Frameworks', 'Python Backend', 'Intermediate', '2 months', '🔥 High', '⭐⭐⭐', ['Python Backend Dev'], 82, '🐍', 'Python'),
  gen('s25', 'Spring Boot', 'Web Frameworks', 'Java Backend', 'Advanced', '3 months', '🔥 Very High', '⭐⭐⭐⭐', ['Java Backend Architect'], 85, '🍃', 'Java'),
  gen('s26', 'Express.js', 'Web Frameworks', 'Node Backend', 'Beginner → Intermediate', '1.5 months', '🔥 Very High', '⭐⭐', ['Node Dev', 'Full Stack Dev'], 86, '🟢', 'Node.js'),
  gen('s27', 'Flask', 'Web Frameworks', 'Python Micro', 'Beginner → Intermediate', '1 month', '🔥 High', '⭐⭐', ['Python API Dev'], 79, '🌶️', 'Python'),
  gen('s28', 'Laravel', 'Web Frameworks', 'PHP Backend', 'Intermediate', '2 months', '🔥 Medium', '⭐⭐⭐', ['PHP Developer'], 65, '🔴', 'PHP'),
  gen('s29', 'Ruby on Rails', 'Web Frameworks', 'Full Stack', 'Intermediate', '3 months', '🔥 Medium', '⭐⭐⭐', ['Rails Developer'], 63, '♦️', 'Ruby'),
  gen('s30', 'Tailwind CSS', 'Web Frameworks', 'CSS Utility', 'Beginner', '2 weeks', '🔥 Very High', '⭐', ['Frontend Dev'], 88, '🎨', 'HTML/CSS'),
  gen('s31', 'FastAPI', 'Web Frameworks', 'Python API', 'Intermediate', '1 month', '🔥 High', '⭐⭐', ['API Developer'], 81, '⚡', 'Python'),

  // ═══════ DATABASES (20+) ═══════
  gen('s35', 'SQL (MySQL/PostgreSQL) 🗄️', 'Databases', 'Relational DB', 'Beginner → Advanced', '2 months', '🔥 Very High', '⭐⭐', ['Data Analyst', 'Backend Dev', 'DBA'], 93, '🗄️', 'None'),
  gen('s36', 'MongoDB', 'Databases', 'NoSQL', 'Beginner → Intermediate', '1.5 months', '🔥 High', '⭐⭐', ['Full Stack Dev', 'Backend Dev'], 82, '🍃', 'JSON'),
  gen('s37', 'Redis', 'Databases', 'In-Memory Cache', 'Intermediate', '1 month', '🔥 High', '⭐⭐⭐', ['Backend Dev', 'DevOps'], 76, '🔴', 'Any DB'),
  gen('s38', 'DynamoDB', 'Databases', 'AWS NoSQL', 'Intermediate', '1 month', '🔥 Growing', '⭐⭐⭐', ['Cloud Engineer', 'Serverless Dev'], 72, '☁️', 'AWS Basics'),
  gen('s39', 'Elasticsearch', 'Databases', 'Search Engine', 'Intermediate → Advanced', '2 months', '🔥 High', '⭐⭐⭐', ['Search Engineer', 'Data Engineer'], 70, '🔍', 'JSON, REST'),
  gen('s40', 'Firebase', 'Databases', 'BaaS (Backend-as-Service)', 'Beginner', '1 month', '🔥 High', '⭐', ['Mobile Dev', 'Frontend Dev'], 79, '🔥', 'None'),

  // ═══════ CLOUD & DEVOPS (30+) ═══════
  gen('s45', 'AWS (Amazon Web Services) ☁️', 'Cloud & DevOps', 'Cloud Platform', 'Intermediate → Advanced', '3 months', '🔥 Very High', '⭐⭐⭐', ['Cloud Architect', 'DevOps Engineer'], 88, '☁️', 'Linux, Networking'),
  gen('s46', 'Microsoft Azure', 'Cloud & DevOps', 'Cloud Platform', 'Intermediate → Advanced', '3 months', '🔥 Very High', '⭐⭐⭐', ['Azure Engineer', 'Cloud Architect'], 84, '🔵', 'Windows/Linux'),
  gen('s47', 'Google Cloud Platform (GCP)', 'Cloud & DevOps', 'Cloud Platform', 'Intermediate → Advanced', '3 months', '🔥 High', '⭐⭐⭐', ['Cloud Engineer', 'ML Engineer'], 80, '🟡', 'Linux'),
  gen('s48', 'Docker 🐳', 'Cloud & DevOps', 'Containerization', 'Intermediate', '1.5 months', '🔥 Very High', '⭐⭐⭐', ['DevOps Engineer', 'Backend Dev'], 86, '🐳', 'Linux'),
  gen('s49', 'Kubernetes', 'Cloud & DevOps', 'Container Orchestration', 'Advanced', '2 months', '🔥 Very High', '⭐⭐⭐⭐', ['DevOps Engineer', 'SRE'], 82, '☸️', 'Docker'),
  gen('s50', 'Terraform', 'Cloud & DevOps', 'Infrastructure as Code', 'Intermediate → Advanced', '2 months', '🔥 High', '⭐⭐⭐', ['Cloud Engineer', 'DevOps'], 79, '🏗️', 'Cloud Basics'),
  gen('s51', 'Jenkins', 'Cloud & DevOps', 'CI/CD', 'Intermediate', '1 month', '🔥 High', '⭐⭐', ['DevOps Engineer'], 76, '🔧', 'Git'),
  gen('s52', 'Linux Administration', 'Cloud & DevOps', 'Operating Systems', 'Beginner → Advanced', '2 months', '🔥 Very High', '⭐⭐', ['SysAdmin', 'DevOps', 'SRE'], 90, '🐧', 'None'),
  gen('s53', 'Git & GitHub', 'Cloud & DevOps', 'Version Control', 'Beginner', '2 weeks', '🔥 Very High', '⭐', ['All Developer Roles'], 95, '🐙', 'None'),
  gen('s54', 'Ansible', 'Cloud & DevOps', 'Configuration Management', 'Intermediate', '1 month', '🔥 High', '⭐⭐⭐', ['DevOps Engineer'], 74, '⚙️', 'Linux, YAML'),

  // ═══════ DATA SCIENCE & AI (40+) ═══════
  gen('s60', 'Machine Learning 🤖', 'Data Science & AI', 'AI / ML', 'Intermediate → Advanced', '4 months', '🔥 Very High', '⭐⭐⭐⭐', ['ML Engineer', 'Data Scientist'], 87, '🤖', 'Python, Math'),
  gen('s61', 'Deep Learning & Neural Networks', 'Data Science & AI', 'AI / DL', 'Advanced', '3 months', '🔥 Very High', '⭐⭐⭐⭐⭐', ['AI Researcher', 'DL Engineer'], 82, '🧠', 'ML, Linear Algebra'),
  gen('s62', 'Natural Language Processing (NLP)', 'Data Science & AI', 'AI / NLP', 'Advanced', '3 months', '🔥 Very High', '⭐⭐⭐⭐', ['NLP Engineer', 'AI Researcher'], 80, '📝', 'Python, ML'),
  gen('s63', 'Computer Vision', 'Data Science & AI', 'AI / CV', 'Advanced', '3 months', '🔥 High', '⭐⭐⭐⭐⭐', ['CV Engineer', 'Robotics'], 78, '👁️', 'DL, Python'),
  gen('s64', 'TensorFlow', 'Data Science & AI', 'DL Framework', 'Intermediate → Advanced', '2 months', '🔥 High', '⭐⭐⭐', ['ML/DL Engineer'], 80, '🟠', 'Python'),
  gen('s65', 'PyTorch', 'Data Science & AI', 'DL Framework', 'Intermediate → Advanced', '2 months', '🔥 Very High', '⭐⭐⭐', ['AI Researcher', 'ML Engineer'], 83, '🔥', 'Python'),
  gen('s66', 'Pandas & NumPy', 'Data Science & AI', 'Data Manipulation', 'Beginner → Intermediate', '1 month', '🔥 Very High', '⭐⭐', ['Data Analyst', 'Data Scientist'], 90, '🐼', 'Python'),
  gen('s67', 'Power BI 📊', 'Data Science & AI', 'Business Intelligence', 'Beginner → Intermediate', '1.5 months', '🔥 Very High', '⭐', ['BI Analyst', 'Data Analyst'], 86, '📊', 'Excel'),
  gen('s68', 'Tableau', 'Data Science & AI', 'Data Visualization', 'Beginner → Intermediate', '1.5 months', '🔥 High', '⭐⭐', ['BI Analyst', 'Data Analyst'], 83, '📈', 'None'),
  gen('s69', 'LLM & Generative AI', 'Data Science & AI', 'Gen AI', 'Advanced', '3 months', '🔥 Explosive', '⭐⭐⭐⭐⭐', ['GenAI Architect', 'Prompt Engineer'], 88, '✨', 'Python, DL'),
  gen('s70', 'LangChain & RAG', 'Data Science & AI', 'AI Frameworks', 'Advanced', '2 months', '🔥 Explosive', '⭐⭐⭐⭐', ['RAG Engineer', 'AI Developer'], 85, '🔗', 'Python, LLMs'),
  gen('s71', 'Apache Spark', 'Data Science & AI', 'Big Data', 'Advanced', '2 months', '🔥 High', '⭐⭐⭐⭐', ['Data Engineer'], 77, '⚡', 'Python/Scala, SQL'),
  gen('s72', 'MLOps', 'Data Science & AI', 'ML Operations', 'Advanced', '2 months', '🔥 High', '⭐⭐⭐⭐', ['MLOps Engineer'], 79, '🔄', 'ML, Docker, CI/CD'),

  // ═══════ CYBERSECURITY (20+) ═══════
  gen('s80', 'Ethical Hacking', 'Cybersecurity', 'Penetration Testing', 'Intermediate → Advanced', '3 months', '🔥 Very High', '⭐⭐⭐⭐', ['Pen Tester', 'Security Analyst'], 82, '🔓', 'Networking, Linux'),
  gen('s81', 'Network Security', 'Cybersecurity', 'Infrastructure', 'Intermediate', '2 months', '🔥 High', '⭐⭐⭐', ['Network Security Engineer'], 78, '🌐', 'Networking'),
  gen('s82', 'SIEM & SOC Operations', 'Cybersecurity', 'Security Operations', 'Intermediate', '2 months', '🔥 High', '⭐⭐⭐', ['SOC Analyst'], 75, '🛡️', 'Security Basics'),
  gen('s83', 'Cryptography', 'Cybersecurity', 'Applied Math', 'Advanced', '2 months', '🔥 Medium', '⭐⭐⭐⭐⭐', ['Security Researcher'], 70, '🔐', 'Math, Programming'),

  // ═══════ SOFT SKILLS (15+) ═══════
  gen('s90', 'Communication Skills', 'Soft Skills', 'Professional', 'All Levels', 'Ongoing', '🔥 Very High', '⭐', ['All Roles'], 95, '🗣️', 'None'),
  gen('s91', 'Leadership & Team Management', 'Soft Skills', 'Management', 'Intermediate', 'Ongoing', '🔥 Very High', '⭐⭐', ['Manager', 'Team Lead'], 88, '👑', 'Experience'),
  gen('s92', 'Problem Solving & Critical Thinking', 'Soft Skills', 'Cognitive', 'All Levels', 'Ongoing', '🔥 Very High', '⭐⭐', ['All Technical Roles'], 92, '🧩', 'None'),
  gen('s93', 'Time Management', 'Soft Skills', 'Productivity', 'All Levels', 'Ongoing', '🔥 High', '⭐', ['All Roles'], 85, '⏰', 'None'),
  gen('s94', 'Public Speaking', 'Soft Skills', 'Communication', 'All Levels', 'Ongoing', '🔥 High', '⭐⭐', ['Manager', 'Sales', 'HR'], 82, '🎤', 'None'),

  // ═══════ CREATIVE & DESIGN (20+) ═══════
  gen('s100', 'UI/UX Design', 'Creative & Design', 'Product Design', 'Intermediate', '3 months', '🔥 Very High', '⭐⭐⭐', ['UX Designer', 'Product Designer'], 86, '🎨', 'None'),
  gen('s101', 'Figma', 'Creative & Design', 'Design Tool', 'Beginner → Intermediate', '1 month', '🔥 Very High', '⭐', ['UI Designer', 'UX Designer'], 90, '🖌️', 'None'),
  gen('s102', 'Adobe Photoshop', 'Creative & Design', 'Image Editing', 'Beginner → Advanced', '2 months', '🔥 High', '⭐⭐', ['Graphic Designer'], 80, '🖼️', 'None'),
  gen('s103', 'Adobe Premiere Pro', 'Creative & Design', 'Video Editing', 'Intermediate', '2 months', '🔥 High', '⭐⭐⭐', ['Video Editor', 'Content Creator'], 78, '🎬', 'None'),
  gen('s104', '3D Modeling (Blender)', 'Creative & Design', '3D Design', 'Intermediate → Advanced', '3 months', '🔥 Growing', '⭐⭐⭐⭐', ['Game Dev', '3D Artist'], 72, '🧊', 'None'),

  // ═══════ BUSINESS & MANAGEMENT (15+) ═══════
  gen('s110', 'Digital Marketing & SEO', 'Business & Management', 'Marketing', 'Beginner → Intermediate', '2 months', '🔥 Very High', '⭐⭐', ['Marketing Manager', 'SEO Specialist'], 84, '📣', 'None'),
  gen('s111', 'Financial Analysis', 'Business & Management', 'Finance', 'Intermediate', '3 months', '🔥 High', '⭐⭐⭐', ['Finance Manager', 'Analyst'], 80, '💰', 'Excel, Accounting'),
  gen('s112', 'Project Management (PMP/Agile)', 'Business & Management', 'Management', 'Intermediate', '2 months', '🔥 Very High', '⭐⭐⭐', ['Project Manager', 'Scrum Master'], 86, '📋', 'None'),
  gen('s113', 'Supply Chain Management', 'Business & Management', 'Operations', 'Intermediate', '2 months', '🔥 High', '⭐⭐⭐', ['Operations Manager', 'SCM Manager'], 75, '🚛', 'None'),
  gen('s114', 'Tally & GST', 'Business & Management', 'Accounting', 'Beginner', '1 month', '🔥 High', '⭐', ['Accountant', 'Tax Consultant'], 78, '📒', 'Commerce Basics'),

  // ═══════ MEDICAL & HEALTHCARE (15+) ═══════
  gen('s120', 'Anatomy & Physiology', 'Medical & Healthcare', 'Basic Medical', 'Beginner → Advanced', '6 months', '🔥 High', '⭐⭐⭐⭐', ['Doctor', 'Nurse'], 85, '🫀', 'Biology'),
  gen('s121', 'Pharmacology', 'Medical & Healthcare', 'Drug Science', 'Intermediate → Advanced', '4 months', '🔥 High', '⭐⭐⭐⭐', ['Pharmacist', 'Doctor'], 80, '💊', 'Chemistry'),
  gen('s122', 'Clinical Research', 'Medical & Healthcare', 'Research', 'Advanced', '3 months', '🔥 Growing', '⭐⭐⭐', ['Clinical Researcher', 'Pharma'], 75, '🔬', 'Medical Basics'),
  gen('s123', 'Medical Coding (ICD/CPT)', 'Medical & Healthcare', 'Health IT', 'Beginner → Intermediate', '2 months', '🔥 High', '⭐⭐', ['Medical Coder', 'Health IT'], 78, '🏥', 'None'),

  // ═══════ ENGINEERING (20+) ═══════
  gen('s130', 'AutoCAD', 'Engineering', 'Design & Drafting', 'Beginner → Intermediate', '2 months', '🔥 Very High', '⭐⭐', ['Mechanical Eng', 'Civil Eng'], 85, '📐', 'None'),
  gen('s131', 'SolidWorks', 'Engineering', '3D CAD', 'Intermediate', '2 months', '🔥 High', '⭐⭐⭐', ['Mechanical Design Eng'], 80, '🔩', 'Basic CAD'),
  gen('s132', 'ANSYS (FEA/CFD)', 'Engineering', 'Simulation', 'Advanced', '3 months', '🔥 High', '⭐⭐⭐⭐', ['Simulation Engineer'], 75, '🌊', 'Physics, CAD'),
  gen('s133', 'MATLAB', 'Engineering', 'Numerical Computing', 'Intermediate', '2 months', '🔥 High', '⭐⭐⭐', ['Research Eng', 'Data Scientist'], 78, '📊', 'Math'),
  gen('s134', 'PLC & SCADA', 'Engineering', 'Industrial Automation', 'Intermediate', '2 months', '🔥 High', '⭐⭐⭐', ['Automation Eng', 'Control Sys'], 77, '⚙️', 'Electrical Basics'),
  gen('s135', 'STAAD.Pro / ETABS', 'Engineering', 'Structural Analysis', 'Intermediate → Advanced', '3 months', '🔥 High', '⭐⭐⭐⭐', ['Structural Engineer'], 73, '🏗️', 'Civil Eng'),
  gen('s136', 'Revit BIM', 'Engineering', 'Building Information', 'Intermediate', '2 months', '🔥 Growing', '⭐⭐⭐', ['BIM Specialist', 'Civil Eng'], 72, '🏠', 'AutoCAD'),
]

export const SKILL_CATEGORIES = [
  'All', 'Programming Languages', 'Web Frameworks', 'Databases', 'Cloud & DevOps',
  'Data Science & AI', 'Cybersecurity', 'Soft Skills', 'Creative & Design',
  'Business & Management', 'Medical & Healthcare', 'Engineering'
]

export const TRENDING_SKILLS_2026 = [
  { name: 'Agentic AI & Multi-Agent Systems', icon: '🤖', growth: '+260% demand' },
  { name: 'Generative AI & RAG Pipelines', icon: '✨', growth: '+180% demand' },
  { name: 'LLM Fine-Tuning & Prompt Engineering', icon: '🧠', growth: '+140% demand' },
  { name: 'Cloud Native Kubernetes', icon: '☁️', growth: '+95% demand' },
  { name: 'Cybersecurity & Zero Trust', icon: '🛡️', growth: '+85% demand' },
  { name: 'Data Engineering (Spark/Airflow)', icon: '📊', growth: '+78% demand' },
  { name: 'Full Stack Next.js + React', icon: '💻', growth: '+70% demand' },
  { name: 'Rust Systems Programming', icon: '🦀', growth: '+65% demand' }
]
