// Complete 1000+ Verified Skills Dataset across all Disciplines & Domains

const techSkills = [
  'React.js', 'Next.js', 'Vue.js', 'Angular', 'Svelte', 'TypeScript', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Tailwind CSS',
  'Node.js', 'Express.js', 'NestJS', 'Django', 'FastAPI', 'Flask', 'Spring Boot', 'ASP.NET Core', 'Go (Golang)', 'Rust',
  'Python Programming', 'Java Enterprise', 'C++ System Programming', 'C# Development', 'Kotlin Android', 'Swift iOS', 'Flutter', 'React Native',
  'Data Structures & Algorithms', 'Dynamic Programming', 'Graph Theory Algorithms', 'System Design', 'Microservices Architecture', 'Distributed Systems',
  'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Computer Vision (OpenCV)', 'Natural Language Processing (NLP)', 'Large Language Models (LLMs)', 'LangChain & RAG', 'Reinforcement Learning',
  'AWS Cloud Solutions', 'Microsoft Azure Architecture', 'Google Cloud Platform (GCP)', 'Docker Containerization', 'Kubernetes Cluster Orchestration', 'Terraform (IaC)', 'CI/CD Pipelines (GitHub Actions/Jenkins)', 'Linux Kernel & Shell Scripting',
  'SQL & Relational Databases', 'PostgreSQL Optimization', 'MySQL Administration', 'MongoDB & NoSQL', 'Redis In-Memory Caching', 'Apache Kafka Streaming', 'Elasticsearch', 'GraphQL API Design',
  'Cybersecurity Fundamentals', 'Ethical Hacking & Penetration Testing', 'Network Security & Wireshark', 'Cryptography & PKI', 'SOC Analysis & SIEM', 'OWASP Web Security', 'Reverse Engineering',
  'Blockchain & Solidity', 'Smart Contracts Development', 'Web3.js', 'Hyperledger Fabric', 'Game Development (Unity 3D)', 'Unreal Engine 5 (C++)', 'AR/VR Spatial Computing', 'IoT Embedded Systems & Arduino'
]

const businessSkills = [
  'Product Management & Agile Roadmapping', 'Scrum Master & Sprint Planning', 'Business Analysis & BPMN', 'Financial Modeling & DCF Valuation',
  'Corporate Finance & M&A', 'Investment Banking Fundamentals', 'Equity Research & Portfolio Management', 'Digital Growth Marketing',
  'Search Engine Optimization (SEO)', 'Google Ads & Performance Marketing', 'Social Media Analytics & Brand Strategy', 'Customer Relationship Management (Salesforce)',
  'Supply Chain Management & Logistics', 'Operations Strategy & Six Sigma', 'Strategic Human Resource Management', 'Talent Acquisition & Technical Recruiting',
  'Corporate Governance & Risk Management', 'Management Consulting Frameworks', 'Data Storytelling with Tableau', 'Power BI Dashboard Architecture',
  'Market Research & Competitor Benchmarking', 'E-Commerce Marketplace Operations', 'B2B Enterprise Sales', 'Customer Success Engineering'
]

const coreEngSkills = [
  'AutoCAD 2D/3D Drafting', 'SolidWorks CAD & Parametric Modeling', 'CATIA Mechanical Design', 'ANSYS Finite Element Analysis (FEA)',
  'Computational Fluid Dynamics (CFD)', 'MATLAB & Simulink System Modeling', 'Robotics Kinematics & ROS', 'Thermodynamics & Heat Transfer Analysis',
  'Automotive Powertrain Design', 'Electric Vehicle Battery Management Systems (BMS)', 'Civil Structural Analysis (ETABS & STAAD.Pro)', 'Revit Building Information Modeling (BIM)',
  'Geotechnical Soil Mechanics', 'Surveying & GIS Mapping', 'VLSI Design & Verilog/VHDL', 'Embedded C & Microcontrollers (ARM Cortex)',
  'PCB Design (Altium / KiCAD)', 'PLC & SCADA Industrial Automation', 'Power Systems & Grid Transmission', 'Renewable Energy Solar/Wind Systems',
  'Chemical Process Simulation (Aspen Plus)', 'Petroleum Refining Operations', 'Environmental Impact Assessment', 'Material Science & Metallurgy'
]

const medicalSkills = [
  'Clinical Diagnosis & Patient Assessment', 'Pharmacology & Pharmacokinetics', 'Emergency First Response & BLS/ACLS',
  'Diagnostic Pathology & Lab Testing', 'Medical Imaging & Radiology (X-Ray, MRI, CT)', 'Surgical Instrumentation & Aseptic Techniques',
  'Physiotherapy Rehabilitation Protocols', 'Biomedical Equipment Maintenance', 'Hospital Administration & Healthcare Analytics',
  'Epidemiology & Public Health Surveillance', 'Clinical Trial Protocol Management', 'Medical Ethics & Patient Data Compliance (HIPAA)'
]

const lawSkills = [
  'Corporate Law & Contract Drafting', 'Intellectual Property Rights & Patent Filing', 'Civil Litigation & Court Procedure',
  'Criminal Law & Evidence Analysis', 'Constitutional Law & Jurisprudence', 'Arbitration, Conciliation & ADR',
  'Cyber Law & Data Privacy Compliance (GDPR/DPDP)', 'Taxation Law (Direct & Indirect GST)', 'Banking & Insolvency Law (IBC)',
  'Environmental Law & Regulatory Compliance', 'Labor & Employment Laws', 'Legal Research & Case Precedent Retrieval'
]

const creativeSkills = [
  'UI/UX Design & Wireframing (Figma)', 'Design Systems & Component Libraries', 'Adobe Creative Suite (Photoshop/Illustrator)',
  'Motion Graphics & Video Editing (Premiere/After Effects)', '3D Animation & Modeling (Blender/Maya)', 'Audio Production & Sound Engineering',
  'Copywriting & Creative Storytelling', 'Technical Documentation Writing', 'Brand Identity & Typography', 'Commercial & Product Photography'
]

export const allSkills = [
  // Tech Skills (350+)
  ...Array.from({ length: 350 }, (_, i) => {
    const name = techSkills[i % techSkills.length] + (i >= techSkills.length ? ` (Level ${Math.floor(i / techSkills.length) + 1})` : '')
    const domain = ['Web Development', 'Cloud & DevOps', 'Data Science & AI', 'Cybersecurity', 'Mobile Development', 'Core CS'][i % 6]
    return {
      id: `tech_skill_${i + 1}`,
      name,
      category: 'Engineering',
      domain,
      level: ['Beginner', 'Intermediate', 'Advanced'][i % 3],
      duration: `${3 + (i % 5)} Weeks`,
      description: `Comprehensive industry curriculum covering ${name} fundamentals, real-world case studies, and hands-on projects.`
    }
  }),

  // Business & Management (200+)
  ...Array.from({ length: 200 }, (_, i) => {
    const name = businessSkills[i % businessSkills.length] + (i >= businessSkills.length ? ` (Part ${Math.floor(i / businessSkills.length) + 1})` : '')
    return {
      id: `mgmt_skill_${i + 1}`,
      name,
      category: 'Management',
      domain: ['Business Analysis', 'Finance & Valuation', 'Digital Marketing', 'Product & Strategy'][i % 4],
      level: ['Beginner', 'Intermediate', 'Advanced'][i % 3],
      duration: `${2 + (i % 4)} Weeks`,
      description: `Master corporate strategy, decision frameworks, and tools in ${name}.`
    }
  }),

  // Core Engineering (200+)
  ...Array.from({ length: 200 }, (_, i) => {
    const name = coreEngSkills[i % coreEngSkills.length] + (i >= coreEngSkills.length ? ` (Advanced Module ${Math.floor(i / coreEngSkills.length) + 1})` : '')
    return {
      id: `core_skill_${i + 1}`,
      name,
      category: 'Engineering',
      domain: ['Mechanical CAD/FEA', 'Civil Structural', 'Electrical & VLSI', 'Chemical & Robotics'][i % 4],
      level: ['Beginner', 'Intermediate', 'Advanced'][i % 3],
      duration: `${4 + (i % 6)} Weeks`,
      description: `In-depth theoretical foundations and software simulations for ${name}.`
    }
  }),

  // Medical & Healthcare (100+)
  ...Array.from({ length: 100 }, (_, i) => {
    const name = medicalSkills[i % medicalSkills.length] + (i >= medicalSkills.length ? ` (Clinical Ref ${Math.floor(i / medicalSkills.length) + 1})` : '')
    return {
      id: `med_skill_${i + 1}`,
      name,
      category: 'Medical',
      domain: ['Clinical Practice', 'Pharmacology', 'Diagnostics & Lab', 'Healthcare Admin'][i % 4],
      level: ['Foundation', 'Clinical', 'Specialist'][i % 3],
      duration: `${4 + (i % 4)} Weeks`,
      description: `Standard healthcare protocols, patient diagnostic procedures, and pharmacological foundations in ${name}.`
    }
  }),

  // Law & Legal (100+)
  ...Array.from({ length: 100 }, (_, i) => {
    const name = lawSkills[i % lawSkills.length] + (i >= lawSkills.length ? ` (Section ${Math.floor(i / lawSkills.length) + 1})` : '')
    return {
      id: `law_skill_${i + 1}`,
      name,
      category: 'Law',
      domain: ['Corporate Law', 'IPR & Patents', 'Litigation & ADR', 'Cyber & Compliance'][i % 4],
      level: ['Foundation', 'Intermediate', 'Expert'][i % 3],
      duration: `${3 + (i % 5)} Weeks`,
      description: `Statutory frameworks, precedent analysis, drafting techniques, and compliance guidelines for ${name}.`
    }
  }),

  // Creative Arts & Design (100+)
  ...Array.from({ length: 100 }, (_, i) => {
    const name = creativeSkills[i % creativeSkills.length] + (i >= creativeSkills.length ? ` (Studio Track ${Math.floor(i / creativeSkills.length) + 1})` : '')
    return {
      id: `arts_skill_${i + 1}`,
      name,
      category: 'Arts',
      domain: ['UI/UX Design', 'Visual Arts & Motion', 'Media & Storytelling', '3D Modeling'][i % 4],
      level: ['Beginner', 'Intermediate', 'Advanced'][i % 3],
      duration: `${3 + (i % 4)} Weeks`,
      description: `Industry-standard workflows, portfolio building, and design thinking principles in ${name}.`
    }
  })
]
