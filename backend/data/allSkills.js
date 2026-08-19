export const allSkills = {
  'Frontend Development': {
    category: 'Tech', domain: 'Engineering', level: 'intermediate', duration: '4-6 months',
    description: 'Build user interfaces with HTML, CSS, JavaScript and React',
    notes: `# Frontend Development\n\n## What is Frontend Development?\nFrontend development is the practice of creating the user interface and user experience of websites and web applications.\n\n## Core Technologies\n\n### HTML (HyperText Markup Language)\n- Elements and tags\n- Attributes and semantic HTML\n- Forms, inputs, tables\n- Links and navigation\n\n### CSS (Cascading Style Sheets)\n- Selectors and properties\n- Box model, Flexbox, Grid\n- Responsive design\n- Animations and transitions\n- Frameworks: Tailwind, Bootstrap\n\n### JavaScript\n- Variables, data types, functions\n- DOM manipulation, events\n- ES6+ features\n- Async/Await, Promises, Fetch API\n\n### React.js\n- Components, Props, State\n- Hooks: useState, useEffect, useContext\n- React Router\n- State management: Redux, Context API\n\n## Resources\n- FreeCodeCamp, CodeWithHarry\n- MDN Web Docs\n- Coursera: Meta Frontend Developer`,
    resources: ['https://www.freecodecamp.org/', 'https://developer.mozilla.org/'],
    videos: ['https://www.youtube.com/watch?v=zJSY8tbf_ys'],
    requiredForRoles: ['Frontend Developer', 'Full Stack Developer', 'Web Developer']
  },
  'Backend Development': {
    category: 'Tech', domain: 'Engineering', level: 'intermediate', duration: '4-6 months',
    description: 'Build server-side applications with Node.js, Express, and databases',
    notes: `# Backend Development\n\n## Core Technologies\n\n### Node.js\n- Event-driven, non-blocking I/O\n- npm package management\n- Express.js framework\n- REST API design\n\n### Databases\n- MongoDB (NoSQL)\n- PostgreSQL/MySQL (SQL)\n- Redis (Caching)\n- ORM: Mongoose, Prisma\n\n### Authentication\n- JWT tokens\n- OAuth 2.0\n- Session management\n- Password hashing (bcrypt)\n\n### API Design\n- RESTful principles\n- GraphQL basics\n- API versioning\n- Rate limiting`,
    resources: ['https://nodejs.org/docs/', 'https://expressjs.com/'],
    videos: ['https://www.youtube.com/watch?v=Oe421EPjeBE'],
    requiredForRoles: ['Backend Developer', 'Full Stack Developer']
  },
  'Data Science': {
    category: 'Tech', domain: 'Engineering', level: 'intermediate', duration: '6-8 months',
    description: 'Extract insights from data using Python, statistics, and machine learning',
    notes: `# Data Science\n\n## Core Concepts\n\n### Statistics\n- Mean, Median, Mode\n- Standard Deviation, Probability\n- Hypothesis Testing\n- Regression Analysis\n\n### Python for Data Science\n- Pandas, NumPy\n- Matplotlib, Seaborn\n- Scikit-learn\n\n### Machine Learning\n- Supervised Learning\n- Unsupervised Learning\n- Model Evaluation\n- Feature Engineering\n\n### Tools\n- Jupyter Notebook, Kaggle\n- Tableau, Power BI\n- TensorFlow, PyTorch`,
    resources: ['https://www.kaggle.com/'],
    videos: ['https://www.youtube.com/watch?v=ua-CiDNNj30'],
    requiredForRoles: ['Data Scientist', 'Data Analyst', 'ML Engineer']
  },
  'Machine Learning': {
    category: 'Tech', domain: 'Engineering', level: 'advanced', duration: '6-9 months',
    description: 'Build intelligent systems that learn from data',
    notes: `# Machine Learning\n\n## Supervised Learning\n- Linear/Logistic Regression\n- Decision Trees, Random Forest\n- SVM, KNN\n- Neural Networks\n\n## Unsupervised Learning\n- K-Means Clustering\n- Hierarchical Clustering\n- PCA, t-SNE\n\n## Deep Learning\n- CNN for images\n- RNN/LSTM for sequences\n- Transformers\n- GANs\n\n## Tools\n- TensorFlow, PyTorch, Keras\n- Scikit-learn\n- Hugging Face`,
    resources: ['https://www.tensorflow.org/'],
    videos: ['https://www.youtube.com/watch?v=i_LwzRVP7bg'],
    requiredForRoles: ['ML Engineer', 'AI Researcher', 'Data Scientist']
  },
  'Cloud Computing': {
    category: 'Tech', domain: 'Engineering', level: 'intermediate', duration: '3-5 months',
    description: 'Deploy and manage applications on cloud platforms',
    notes: `# Cloud Computing\n\n## Major Providers\n- AWS (Amazon Web Services)\n- Microsoft Azure\n- Google Cloud Platform\n\n## Core Services\n- Compute: EC2, Lambda\n- Storage: S3, EBS\n- Database: RDS, DynamoDB\n- Networking: VPC, Load Balancers\n\n## DevOps\n- Docker containers\n- Kubernetes orchestration\n- CI/CD pipelines\n- Infrastructure as Code (Terraform)`,
    resources: ['https://aws.amazon.com/training/'],
    videos: ['https://www.youtube.com/watch?v=3hLmDS179YE'],
    requiredForRoles: ['Cloud Engineer', 'DevOps Engineer']
  },
  'Cybersecurity': {
    category: 'Tech', domain: 'Engineering', level: 'advanced', duration: '6-9 months',
    description: 'Protect systems and networks from digital attacks',
    notes: `# Cybersecurity\n\n## Core Areas\n- Network Security\n- Application Security\n- Information Security\n- Ethical Hacking\n\n## Tools\n- Wireshark, Nmap\n- Metasploit, Burp Suite\n- Kali Linux\n\n## Certifications\n- CompTIA Security+\n- CEH (Certified Ethical Hacker)\n- CISSP`,
    resources: ['https://www.cybrary.it/'],
    videos: ['https://www.youtube.com/watch?v=inWWhr5tnEA'],
    requiredForRoles: ['Cybersecurity Analyst', 'Security Engineer']
  },
  'Mobile Development': {
    category: 'Tech', domain: 'Engineering', level: 'intermediate', duration: '4-6 months',
    description: 'Build native and cross-platform mobile applications',
    notes: `# Mobile Development\n\n## Native\n- Android: Kotlin, Java\n- iOS: Swift, Objective-C\n\n## Cross-Platform\n- React Native\n- Flutter (Dart)\n- Xamarin\n\n## Key Concepts\n- UI/UX for mobile\n- State management\n- API integration\n- App Store deployment`,
    resources: ['https://flutter.dev/'],
    videos: ['https://www.youtube.com/watch?v=VPvVD8t02U8'],
    requiredForRoles: ['Mobile Developer', 'iOS Developer', 'Android Developer']
  },
  'Game Development': {
    category: 'Tech', domain: 'Engineering', level: 'intermediate', duration: '6-9 months',
    description: 'Create interactive games using engines and programming',
    notes: `# Game Development\n\n## Engines\n- Unity (C#)\n- Unreal Engine (C++)\n- Godot\n\n## Core Concepts\n- 2D/3D graphics\n- Physics engines\n- Game AI\n- Multiplayer networking`,
    resources: ['https://unity.com/learn'],
    videos: ['https://www.youtube.com/watch?v=gB1F9G0JXOo'],
    requiredForRoles: ['Game Developer']
  },
  'Marketing': {
    category: 'Non-Tech', domain: 'Arts', level: 'beginner', duration: '2-3 months',
    description: 'Learn digital marketing, SEO, social media, and brand management',
    notes: `# Marketing\n\n## Digital Marketing\n- SEO, SEM\n- Social Media Marketing\n- Email Marketing\n- Content Marketing\n- Google Analytics\n\n## Brand Management\n- Brand Positioning\n- Target Audience Analysis\n- Competitor Analysis\n\n## Tools\n- Google Analytics, SEMrush\n- Mailchimp, Canva, Hootsuite`,
    resources: ['https://analytics.google.com/'],
    videos: ['https://www.youtube.com/watch?v=6gtD9nMGtTE'],
    requiredForRoles: ['Marketing Manager', 'Digital Marketing Specialist']
  },
  'Human Resources': {
    category: 'Non-Tech', domain: 'Arts', level: 'beginner', duration: '2-3 months',
    description: 'Manage recruitment, employee relations, and HR policies',
    notes: `# Human Resources\n\n## Core Areas\n- Recruitment & Selection\n- Employee Relations\n- Performance Management\n- Training & Development\n- Compensation & Benefits\n- HR Policies & Compliance`,
    resources: ['https://www.shrm.org/'],
    videos: [],
    requiredForRoles: ['HR Manager', 'HR Executive']
  },
  'Accounting & Finance': {
    category: 'Non-Tech', domain: 'Commerce', level: 'intermediate', duration: '4-6 months',
    description: 'Master financial analysis, accounting principles, and Excel',
    notes: `# Accounting & Finance\n\n## Core Concepts\n- Financial Statements\n- Ratio Analysis\n- Budgeting & Forecasting\n- Tax Planning\n- Auditing\n\n## Tools\n- Tally, QuickBooks\n- Advanced Excel\n- SAP FICO`,
    resources: ['https://www.investopedia.com/'],
    videos: [],
    requiredForRoles: ['Finance Manager', 'Accountant', 'Financial Analyst']
  },
  'Graphic Design': {
    category: 'Creative', domain: 'Design', level: 'beginner', duration: '3-5 months',
    description: 'Create visual content using design software and principles',
    notes: `# Graphic Design\n\n## Core Skills\n- Color Theory, Typography\n- Composition, Layout\n- Branding & Logo Design\n\n## Tools\n- Adobe Photoshop\n- Adobe Illustrator\n- Figma, Canva\n- InDesign`,
    resources: ['https://www.canva.com/'],
    videos: [],
    requiredForRoles: ['Graphic Designer', 'UI Designer']
  },
  'Video Editing': {
    category: 'Creative', domain: 'Design', level: 'beginner', duration: '2-4 months',
    description: 'Edit and produce professional videos for various platforms',
    notes: `# Video Editing\n\n## Software\n- Adobe Premiere Pro\n- After Effects\n- DaVinci Resolve\n- Final Cut Pro\n\n## Skills\n- Color Grading\n- Sound Design\n- Motion Graphics\n- YouTube Optimization`,
    resources: ['https://www.blackmagicdesign.com/products/davinciresolve'],
    videos: [],
    requiredForRoles: ['Video Editor', 'Content Creator']
  },
  'Content Writing': {
    category: 'Non-Tech', domain: 'Arts', level: 'beginner', duration: '1-3 months',
    description: 'Write compelling content for web, blogs, and marketing',
    notes: `# Content Writing\n\n## Types\n- Blog Writing\n- Copywriting\n- Technical Writing\n- Social Media Content\n- SEO Writing\n\n## Skills\n- Research & Analysis\n- Grammar & Style\n- SEO Optimization\n- Content Strategy`,
    resources: ['https://www.grammarly.com/'],
    videos: [],
    requiredForRoles: ['Content Writer', 'Copywriter', 'Technical Writer']
  },
  'Anatomy & Physiology': {
    category: 'Medical', domain: 'Medical', level: 'advanced', duration: '12 months',
    description: 'Study of human body structure and functions',
    notes: `# Anatomy & Physiology\n\n## Major Systems\n- Skeletal & Muscular\n- Cardiovascular & Respiratory\n- Nervous & Endocrine\n- Digestive & Excretory\n- Reproductive & Immune\n\n## Clinical Applications\n- Pathology basics\n- Diagnostic imaging\n- Surgical anatomy`,
    resources: ['https://www.kenhub.com/'],
    videos: [],
    requiredForRoles: ['Doctor', 'Nurse', 'Physiotherapist']
  },
  'Pharmacology': {
    category: 'Medical', domain: 'Medical', level: 'advanced', duration: '8-12 months',
    description: 'Study of drugs, their effects, and therapeutic applications',
    notes: `# Pharmacology\n\n## Core Topics\n- Drug Classification\n- Pharmacokinetics (ADME)\n- Pharmacodynamics\n- Drug Interactions\n- Adverse Effects\n- Clinical Trials`,
    resources: [],
    videos: [],
    requiredForRoles: ['Pharmacist', 'Doctor']
  },
  'Corporate Law': {
    category: 'Legal', domain: 'Law', level: 'advanced', duration: '6-12 months',
    description: 'Legal framework governing corporations and business entities',
    notes: `# Corporate Law\n\n## Key Areas\n- Company Formation\n- Corporate Governance\n- Mergers & Acquisitions\n- Securities Law\n- Contract Law\n- Intellectual Property`,
    resources: [],
    videos: [],
    requiredForRoles: ['Corporate Lawyer', 'Legal Advisor']
  },
  'Criminal Law': {
    category: 'Legal', domain: 'Law', level: 'advanced', duration: '6-12 months',
    description: 'Study of criminal justice system and legal procedures',
    notes: `# Criminal Law\n\n## Core Topics\n- Indian Penal Code (IPC)\n- Criminal Procedure Code (CrPC)\n- Evidence Act\n- Constitutional Law\n- Cyber Crime Laws`,
    resources: [],
    videos: [],
    requiredForRoles: ['Criminal Lawyer', 'Legal Advisor']
  },
  'Fine Arts & Painting': {
    category: 'Creative', domain: 'Arts', level: 'beginner', duration: '3-6 months',
    description: 'Express creativity through various painting and drawing techniques',
    notes: `# Fine Arts & Painting\n\n## Techniques\n- Sketching & Drawing\n- Watercolor, Oil, Acrylic\n- Digital Art\n- Mixed Media\n\n## History\n- Renaissance to Modern Art\n- Indian Art Traditions\n- Contemporary Art Movements`,
    resources: [],
    videos: [],
    requiredForRoles: ['Painter', 'Art Director', 'Illustrator']
  },
  'Music Theory & Performance': {
    category: 'Creative', domain: 'Arts', level: 'beginner', duration: '6-12 months',
    description: 'Learn music theory, instruments, and performance skills',
    notes: `# Music Theory & Performance\n\n## Theory\n- Notes, Scales, Chords\n- Rhythm & Time Signatures\n- Melody & Harmony\n- Indian Classical Ragas\n\n## Instruments\n- Guitar, Piano, Violin\n- Tabla, Sitar, Flute\n- Vocal Training`,
    resources: [],
    videos: [],
    requiredForRoles: ['Musician', 'Music Producer', 'Singer']
  },
  'Photography': {
    category: 'Creative', domain: 'Design', level: 'beginner', duration: '2-4 months',
    description: 'Capture and edit professional photographs',
    notes: `# Photography\n\n## Technical Skills\n- Camera Settings (ISO, Aperture, Shutter)\n- Composition Rules\n- Lighting Techniques\n- Post-processing (Lightroom, Photoshop)\n\n## Genres\n- Portrait, Landscape\n- Product, Food\n- Wedding, Event\n- Street Photography`,
    resources: [],
    videos: [],
    requiredForRoles: ['Photographer', 'Photojournalist']
  },
  'Agriculture Science': {
    category: 'Science', domain: 'Agriculture', level: 'intermediate', duration: '6-12 months',
    description: 'Modern farming techniques, crop science, and agricultural technology',
    notes: `# Agriculture Science\n\n## Core Topics\n- Crop Production\n- Soil Science\n- Plant Pathology\n- Agricultural Economics\n- Organic Farming\n- Precision Agriculture & IoT`,
    resources: [],
    videos: [],
    requiredForRoles: ['Agricultural Scientist', 'Farm Manager']
  },
  'Data Structures & Algorithms': {
    category: 'Tech', domain: 'Engineering', level: 'intermediate', duration: '3-6 months',
    description: 'Master DSA for competitive programming and interviews',
    notes: `# Data Structures & Algorithms\n\n## Data Structures\n- Arrays, Strings\n- Linked Lists\n- Stacks, Queues\n- Trees (BST, AVL, Heap)\n- Graphs\n- Hash Maps\n\n## Algorithms\n- Sorting: Quick, Merge, Heap\n- Searching: Binary Search\n- Dynamic Programming\n- Greedy Algorithms\n- Backtracking\n- Graph: BFS, DFS, Dijkstra`,
    resources: ['https://leetcode.com/', 'https://www.geeksforgeeks.org/'],
    videos: ['https://www.youtube.com/watch?v=8hly31xKli0'],
    requiredForRoles: ['Software Engineer', 'Backend Developer', 'Full Stack Developer']
  },
  'Python Programming': {
    category: 'Tech', domain: 'Engineering', level: 'beginner', duration: '2-3 months',
    description: 'Learn Python from basics to advanced concepts',
    notes: `# Python Programming\n\n## Basics\n- Variables, Data Types\n- Conditionals, Loops\n- Functions, Modules\n- File Handling\n\n## Advanced\n- OOP in Python\n- Decorators, Generators\n- Error Handling\n- Regular Expressions\n- Libraries: NumPy, Pandas, Flask, Django`,
    resources: ['https://www.python.org/doc/'],
    videos: ['https://www.youtube.com/watch?v=_uQrJ0TkZlc'],
    requiredForRoles: ['Data Scientist', 'Backend Developer', 'ML Engineer', 'DevOps Engineer']
  },
  'Java Programming': {
    category: 'Tech', domain: 'Engineering', level: 'intermediate', duration: '3-5 months',
    description: 'Object-oriented programming with Java',
    notes: `# Java Programming\n\n## Core Java\n- OOP: Classes, Objects, Inheritance\n- Interfaces, Abstract Classes\n- Collections Framework\n- Exception Handling\n- Multithreading\n\n## Advanced\n- Spring Boot\n- Hibernate/JPA\n- Microservices\n- Design Patterns`,
    resources: ['https://docs.oracle.com/javase/'],
    videos: [],
    requiredForRoles: ['Backend Developer', 'Android Developer', 'Software Engineer']
  }
}

export const allRoles = {
  'Frontend Developer': { domain: 'Engineering', department: 'Computer Science', skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript'], salary: '4-12 LPA' },
  'Backend Developer': { domain: 'Engineering', department: 'Computer Science', skills: ['Node.js', 'Python', 'Java', 'SQL', 'MongoDB'], salary: '5-15 LPA' },
  'Full Stack Developer': { domain: 'Engineering', department: 'Computer Science', skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'SQL'], salary: '6-18 LPA' },
  'Data Scientist': { domain: 'Engineering', department: 'Computer Science', skills: ['Python', 'Statistics', 'ML', 'SQL', 'Tableau'], salary: '6-20 LPA' },
  'ML Engineer': { domain: 'Engineering', department: 'Computer Science', skills: ['Python', 'TensorFlow', 'PyTorch', 'Math', 'Statistics'], salary: '8-25 LPA' },
  'DevOps Engineer': { domain: 'Engineering', department: 'Computer Science', skills: ['Docker', 'Kubernetes', 'AWS', 'Linux', 'CI/CD'], salary: '6-20 LPA' },
  'Cloud Engineer': { domain: 'Engineering', department: 'Computer Science', skills: ['AWS', 'Azure', 'GCP', 'Docker', 'Terraform'], salary: '6-22 LPA' },
  'Cybersecurity Analyst': { domain: 'Engineering', department: 'Computer Science', skills: ['Networking', 'Linux', 'Python', 'Security Tools'], salary: '5-18 LPA' },
  'Game Developer': { domain: 'Engineering', department: 'Computer Science', skills: ['Unity', 'C#', 'C++', '3D Design', 'Physics'], salary: '4-15 LPA' },
  'Mobile Developer': { domain: 'Engineering', department: 'Computer Science', skills: ['Kotlin', 'Swift', 'Flutter', 'React Native'], salary: '5-16 LPA' },
  'Marketing Manager': { domain: 'Arts', department: 'Business', skills: ['Digital Marketing', 'Analytics', 'Brand Management', 'SEO'], salary: '4-12 LPA' },
  'Digital Marketing Specialist': { domain: 'Arts', department: 'Business', skills: ['SEO', 'SEM', 'Social Media', 'Content Marketing'], salary: '3-8 LPA' },
  'HR Manager': { domain: 'Arts', department: 'Business', skills: ['Recruitment', 'Employee Relations', 'HR Policies', 'Compliance'], salary: '4-12 LPA' },
  'Finance Manager': { domain: 'Commerce', department: 'Finance', skills: ['Accounting', 'Financial Analysis', 'Excel', 'Tally'], salary: '5-15 LPA' },
  'Content Writer': { domain: 'Arts', department: 'English', skills: ['Writing', 'Editing', 'Research', 'SEO', 'Grammar'], salary: '2-6 LPA' },
  'Graphic Designer': { domain: 'Design', department: 'Arts', skills: ['Photoshop', 'Illustrator', 'Figma', 'Canva'], salary: '3-8 LPA' },
  'Video Editor': { domain: 'Design', department: 'Arts', skills: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'], salary: '3-8 LPA' },
  'Social Media Manager': { domain: 'Arts', department: 'Business', skills: ['Instagram', 'Facebook', 'Content Creation', 'Analytics'], salary: '3-7 LPA' },
  'Doctor': { domain: 'Medical', department: 'Medicine', skills: ['Anatomy', 'Physiology', 'Pharmacology', 'Clinical Skills'], salary: '8-30 LPA' },
  'Nurse': { domain: 'Medical', department: 'Nursing', skills: ['Patient Care', 'First Aid', 'Medical Knowledge'], salary: '3-8 LPA' },
  'Pharmacist': { domain: 'Medical', department: 'Pharmacy', skills: ['Pharmacology', 'Drug Management', 'Patient Counseling'], salary: '3-8 LPA' },
  'Lab Technician': { domain: 'Medical', department: 'Lab Sciences', skills: ['Lab Equipment', 'Sample Analysis', 'Report Writing'], salary: '2-5 LPA' },
  'Corporate Lawyer': { domain: 'Law', department: 'Law', skills: ['Corporate Law', 'Contracts', 'M&A', 'Legal Research'], salary: '6-25 LPA' },
  'Criminal Lawyer': { domain: 'Law', department: 'Law', skills: ['Criminal Law', 'Court Procedures', 'Legal Writing'], salary: '4-15 LPA' },
  'Legal Advisor': { domain: 'Law', department: 'Law', skills: ['Legal Research', 'Compliance', 'Contract Drafting'], salary: '5-12 LPA' },
  'Painter': { domain: 'Arts', department: 'Fine Arts', skills: ['Painting', 'Sketching', 'Art History', 'Color Theory'], salary: '2-8 LPA' },
  'Musician': { domain: 'Arts', department: 'Music', skills: ['Music Theory', 'Instrument', 'Performance', 'Composition'], salary: '2-10 LPA' },
  'Actor': { domain: 'Arts', department: 'Drama', skills: ['Acting', 'Voice Modulation', 'Stage Presence', 'Dance'], salary: '2-50 LPA' },
  'Dancer': { domain: 'Arts', department: 'Dance', skills: ['Classical Dance', 'Contemporary', 'Choreography'], salary: '2-10 LPA' },
  'Photographer': { domain: 'Design', department: 'Arts', skills: ['Camera', 'Lighting', 'Editing', 'Composition'], salary: '2-8 LPA' },
  'Sales Manager': { domain: 'Commerce', department: 'Business', skills: ['Negotiation', 'CRM', 'Communication', 'Analytics'], salary: '4-12 LPA' },
  'Operations Manager': { domain: 'Commerce', department: 'Business', skills: ['Supply Chain', 'Process Management', 'Analytics'], salary: '5-15 LPA' },
  'Management Consultant': { domain: 'Management', department: 'Business', skills: ['Strategy', 'Analysis', 'Presentation', 'Problem Solving'], salary: '8-30 LPA' }
}

export default { allSkills, allRoles }
