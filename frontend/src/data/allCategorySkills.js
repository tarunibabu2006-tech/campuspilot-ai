/**
 * allCategorySkills.js
 * Comprehensive All-India Skill Taxonomy across 64+ Academic & Industrial Disciplines
 * Guaranteed 100% Rich Emoji Mapping - Zero Question Marks
 */

export const CATEGORY_ICONS = {
  'Computer Science & Engineering': '💻',
  'Information Technology (IT)': '🌐',
  'Artificial Intelligence & Data Science': '🧠',
  'Electronics & Communication (ECE)': '📡',
  'Electrical & Electronics (EEE)': '⚡',
  'Mechanical Engineering': '⚙️',
  'Civil Engineering & Construction': '🏗️',
  'Chemical Engineering & Petrochemicals': '🧪',
  'Aerospace & Aeronautical Engineering': '🚀',
  'Robotics, Mechatronics & Automation': '🤖',
  'Biomedical & Medical Electronics': '🩺',
  'Automobile & Electric Vehicles (EV)': '🚗',
  'Environmental & Renewable Energy': '🌿',
  'Marine Engineering & Naval Architecture': '🚢',
  'Mining, Metallurgy & Materials': '⛏️',
  'Textile & Fashion Technology': '👗',
  'Production & Industrial Engineering': '🏭',
  'Food Technology & Processing': '🍲',
  'Biotechnology & Bioinformatics': '🧬',
  'Agricultural Engineering & Agronomy': '🌾',

  'Pure & Applied Mathematics': '📐',
  'Physics & Quantum Computing': '⚛️',
  'Chemistry & Materials Science': '🧪',
  'Biology, Zoology & Botany': '🌱',
  'Statistics, Actuarial & Data Analytics': '📈',
  'Microbiology & Immunology': '🔬',
  'Geology & Earth Sciences': '🌍',

  'Commerce & Financial Accounting': '📊',
  'Banking, Insurance & FinTech': '🏦',
  'Corporate Finance & Investment Banking': '💰',
  'Taxation, GST & Auditing': '📜',
  'Economics & International Trade': '🏛️',
  'Chartered Accountancy (CA/CMA/CS)': '📑',

  'Management & Business Administration': '💼',
  'Human Resource Management (HRM)': '👥',
  'Marketing, Advertising & Branding': '📣',
  'Operations & Supply Chain Logistics': '📦',
  'Digital Marketing & Social Media': '📱',
  'Healthcare & Hospital Administration': '🏥',

  'English Literature & Communication': '📚',
  'Indian & Foreign Languages': '🗣️',
  'History, Archeology & Heritage': '🏺',
  'Political Science & International Relations': '🌐',
  'Sociology & Social Welfare': '🤝',
  'Psychology & Cognitive Behavior': '🧘',
  'Philosophy & Ethics': '💡',
  'Journalism, Mass Media & Film': '🎙️',
  'Fine Arts, Painting & Sculpting': '🎨',
  'Music, Dance & Performing Arts': '🎭',

  'Medicine & Surgery (MBBS/MD)': '🏥',
  'Dentistry (BDS/MDS)': '🦷',
  'Pharmacy & Pharmacology': '💊',
  'Nursing & Patient Care': '🩺',
  'Physiotherapy & Rehabilitation': '🏃',
  'Ayurveda, Yoga & Alternative Medicine': '🌿',
  'Veterinary Science & Animal Husbandry': '🐾',

  'Constitutional & Administrative Law': '⚖️',
  'Criminal Law & Criminology': '🛡️',
  'Corporate & Business Law': '🏢',
  'Cyber Law & Intellectual Property (IPR)': '🔒',
  'International Law & Human Rights': '🌍',

  'Design, UI/UX & Graphics': '🎨',
  'Animation, VFX & Game Development': '🎮',
  'Architecture & Interior Design': '🏛️',
  'Hospitality, Hotel & Culinary Arts': '🍳',
  'Tourism, Travel & Aviation': '✈️',
  'Sports Science & Physical Education': '🏅',
  'Defence, Military & Strategic Studies': '🛡️',
  'Vocational, ITI & Technical Trades': '🔧'
}

// Specific Skill Emoji Mapping
export const SKILL_SPECIFIC_ICONS = {
  'Python': '🐍',
  'Java': '☕',
  'C++': '⚡',
  'C Programming': '💻',
  'JavaScript': '💛',
  'TypeScript': '💙',
  'React': '⚛️',
  'Node.js': '🟢',
  'SQL': '🗄️',
  'MongoDB': '🍃',
  'HTML5': '🌐',
  'CSS3': '🎨',
  'Git': '🐙',
  'Docker': '🐳',
  'Kubernetes': '☸️',
  'AWS': '☁️',
  'Azure': '🔷',
  'Linux': '🐧',
  'Machine Learning': '🤖',
  'Deep Learning': '🧠',
  'Data Structures': '🌲',
  'Algorithms': '⚙️',
  'Cybersecurity': '🔒',
  'UI/UX Design': '🎨',
  'Power BI': '📊',
  'Tableau': '📈',
  'Excel': '📗',
  'MATLAB': '🔢',
  'AutoCAD': '📐',
  'SolidWorks': '🛠️',
  'Anatomy': '🫀',
  'Physiology': '🩺',
  'Constitutional Law': '⚖️',
  'GST & Taxation': '📜',
  'Financial Accounting': '💵',
  'Digital Marketing': '📣',
  'Public Speaking': '🎙️',
  'Creative Writing': '✍️'
}

export function getSkillEmoji(skillName = '', categoryName = '') {
  // Check specific skill match
  for (const [key, icon] of Object.entries(SKILL_SPECIFIC_ICONS)) {
    if (skillName.toLowerCase().includes(key.toLowerCase())) {
      return icon
    }
  }

  // Check category match
  if (CATEGORY_ICONS[categoryName]) {
    return CATEGORY_ICONS[categoryName]
  }

  // Generic fallback
  return '💡'
}

export const CATEGORY_SKILLS_MAP = {
  'Computer Science & Engineering': [
    'Python Programming', 'Java Enterprise Architecture', 'C++ & Systems Programming', 'Data Structures & Algorithms',
    'Full Stack Web Development (MERN)', 'Database Management Systems (SQL & NoSQL)', 'Operating Systems & Linux Kernel',
    'Computer Networks & Distributed Systems', 'Cloud Computing & DevOps', 'Cybersecurity & Ethical Hacking'
  ],
  'Artificial Intelligence & Data Science': [
    'Machine Learning & Scikit-Learn', 'Deep Learning & PyTorch/TensorFlow', 'Natural Language Processing (NLP)',
    'Computer Vision & OpenCV', 'Big Data Engineering (Spark/Hadoop)', 'Data Visualization (Power BI / Tableau)',
    'Generative AI & LLM Engineering', 'Reinforcement Learning', 'MLOps & Model Deployment'
  ],
  'Electronics & Communication (ECE)': [
    'Digital Electronics & Logic Design', 'VLSI Design & Verilog HDL', 'Embedded Systems & ARM Cortex',
    'Microprocessors & Microcontrollers (8051)', 'Signal Processing (DSP)', 'Wireless & 5G Telecom Networks',
    'IoT & Sensor Interfacing', 'PCB Design & Altium'
  ],
  'Electrical & Electronics (EEE)': [
    'Power Systems & Grid Transmission', 'Electrical Machines & Transformers', 'Power Electronics & Inverters',
    'Electric Vehicle (EV) Powertrains', 'Control Systems Engineering', 'Renewable Solar & Wind Energy',
    'PLC & SCADA Industrial Automation'
  ],
  'Mechanical Engineering': [
    'CAD Modeling (AutoCAD / SolidWorks)', 'Finite Element Analysis (ANSYS / FEA)', 'Thermodynamics & Heat Transfer',
    'Fluid Mechanics & Hydraulics', 'CNC Machining & Manufacturing', 'Robotics & Kinematics',
    'Automobile IC Engines & Dynamics'
  ],
  'Civil Engineering & Construction': [
    'Structural Analysis & Design (STAAD Pro)', 'Building Information Modeling (Revit BIM)', 'Geotechnical & Soil Mechanics',
    'Surveying & Total Station GIS', 'Concrete Technology & Construction Management', 'Environmental Water Resource Engineering'
  ],
  'Commerce & Financial Accounting': [
    'Financial Accounting & Bookkeeping', 'Corporate Auditing & Assurance', 'Goods & Services Tax (GST) & Direct Tax',
    'Financial Modeling & Valuation', 'Cost & Management Accounting', 'Tally Prime & ERP Accounting'
  ],
  'Banking, Insurance & FinTech': [
    'Commercial Banking Operations', 'Investment Banking & Equity Research', 'Risk Management & Basel Norms',
    'FinTech & Blockchain Cryptocurrencies', 'Credit Analysis & Underwriting', 'Insurance & Wealth Advisory'
  ],
  'Management & Business Administration': [
    'Strategic Business Management', 'Human Resource Management (HRM)', 'Marketing & Brand Strategy',
    'Operations & Supply Chain Logistics', 'Project Management & Agile Scrum', 'Business Analytics & Data Decision Making'
  ],
  'Pure & Applied Sciences': [
    'Calculus, Linear Algebra & Diff Equations', 'Engineering Physics & Optics', 'Organic & Inorganic Chemistry',
    'Biochemistry & Molecular Biology', 'Probability & Inferential Statistics', 'Materials Science & Nanotechnology'
  ],
  'Medicine & Health Sciences': [
    'Human Anatomy & Dissection', 'Human Physiology & Organ Systems', 'Pharmacology & Drug Therapeutics',
    'Pathology & Diagnostic Medicine', 'Medical Microbiology & Immunology', 'Clinical Biochemistry'
  ],
  'Law, Legal Studies & Judiciary': [
    'Constitutional Law of India', 'Indian Penal Code (IPC) & Criminal Procedure', 'Corporate & Commercial Law',
    'Law of Contracts & Torts', 'Cyber Law & Data Privacy Protection', 'Intellectual Property Rights (IPR)'
  ],
  'Arts, Humanities & Social Sciences': [
    'English Literature & Critical Theory', 'Indian & Global History', 'Political Science & Public Administration',
    'Sociology & Social Development', 'General & Clinical Psychology', 'Micro & Macro Economics'
  ],
  'Design, UI/UX & Media': [
    'UI/UX Design & Figma Prototyping', 'Graphic Design & Adobe Suite', 'Video Editing & Visual Effects (VFX)',
    '3D Animation (Blender / Maya)', 'Game Development (Unity / Unreal)', 'Digital Journalism & Podcasting'
  ]
}

let counter = 1
export const ALL_SKILLS_FLAT = Object.entries(CATEGORY_SKILLS_MAP).flatMap(([category, skillList]) => {
  return skillList.map((name, idx) => {
    const id = `cat_skill_${counter++}`
    const icon = getSkillEmoji(name, category)
    return {
      id,
      name,
      category,
      domain: category,
      level: idx % 3 === 0 ? 'Beginner → Intermediate' : idx % 3 === 1 ? 'Intermediate → Advanced' : 'Foundational → Expert',
      duration: `${4 + (idx % 8)} Weeks`,
      demand: idx % 2 === 0 ? '🔥 High Demand' : '⭐ Industry Standard',
      difficulty: idx % 3 === 0 ? '⭐⭐' : idx % 3 === 1 ? '⭐⭐⭐' : '⭐⭐⭐⭐',
      icon,
      desc: `Master ${name} with curated lecture notes, practice quizzes, and real-world implementation projects.`
    }
  })
})

export const ALL_CATEGORY_NAMES = ['All', ...Object.keys(CATEGORY_SKILLS_MAP)]
