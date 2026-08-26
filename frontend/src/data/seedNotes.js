// ============================================================
// seedNotes.js — Real Subject Notes across Engineering, Science, Arts, Commerce, Medical, Law
// Used by: NotesHub
// ============================================================

export const SEED_NOTES = [
  // ═══════ COMPUTER SCIENCE & ENGINEERING ═══════
  {
    id: 'n1',
    title: 'Data Structures & Algorithms Comprehensive Notes',
    subject: 'Data Structures & Algorithms',
    branch: 'Computer Science & Engineering',
    semester: 'Semester 3',
    college: 'Anna University / VTU / JNTU',
    author: 'Prof. R. Sundaram (CSE Dept)',
    rating: 4.9,
    downloads: 14200,
    pages: 145,
    fileSize: '4.8 MB',
    type: 'Lecture Notes + Formula Sheet',
    previewText: 'Covers Arrays, Linked Lists, Stacks, Queues, Binary Trees, AVL Trees, B-Trees, Graph Algorithms (Dijkstra, BFS, DFS), Sorting & Searching, Dynamic Programming, and Greedy Algorithms with C++ & Python code snippets.',
    topics: ['Arrays & Strings', 'Trees & Graphs', 'Dynamic Programming', 'Complexity Analysis (Big-O)']
  },
  {
    id: 'n2',
    title: 'Database Management Systems (DBMS) & SQL Handbook',
    subject: 'Database Management Systems',
    branch: 'Computer Science & Engineering',
    semester: 'Semester 4',
    college: 'IIT Madras Curriculum Aligned',
    author: 'Dr. K. Arumugam',
    rating: 4.8,
    downloads: 11800,
    pages: 112,
    fileSize: '3.9 MB',
    type: 'Exam Revision Guide',
    previewText: 'ER Modeling, Relational Algebra, SQL Queries & Joins, Normalization (1NF to BCNF), Transaction Processing, ACID Properties, Concurrency Control, Lock-Based Protocols, Indexing (B+ Trees). Includes 100 solved university exam questions.',
    topics: ['ER Diagram & Schema', 'SQL Queries & Joins', 'Normalization (1NF-BCNF)', 'ACID & Transactions']
  },
  {
    id: 'n3',
    title: 'Operating Systems & System Programming Deep Dive',
    subject: 'Operating Systems',
    branch: 'Computer Science & Engineering',
    semester: 'Semester 4',
    college: 'NIT Trichy',
    author: 'Dr. M. Deepa',
    rating: 4.9,
    downloads: 9500,
    pages: 130,
    fileSize: '4.2 MB',
    type: 'Complete Course Notes',
    previewText: 'Process Management, CPU Scheduling (FCFS, SJF, RR, Priority), Deadlocks (Banker Algorithm), Memory Management (Paging, Segmentation, Virtual Memory, Page Replacement), File Systems, Linux System Calls.',
    topics: ['Process Scheduling', 'Deadlock Detection & Prevention', 'Virtual Memory & Paging', 'File Systems']
  },
  {
    id: 'n4',
    title: 'Computer Networks & Internet Protocols (CN)',
    subject: 'Computer Networks',
    branch: 'Computer Science & Engineering',
    semester: 'Semester 5',
    college: 'VTU Belagavi',
    author: 'Prof. Suresh Kumar',
    rating: 4.7,
    downloads: 8900,
    pages: 98,
    fileSize: '3.1 MB',
    type: 'Handwritten & Typed Notes',
    previewText: 'OSI 7-Layer Model, TCP/IP Protocol Suite, IP Addressing (IPv4/IPv6, Subnetting), Routing Protocols (RIP, OSPF, BGP), Congestion Control, Socket Programming, Network Security basics.',
    topics: ['OSI & TCP/IP Model', 'Subnetting & IP Routing', 'Transport Protocols (TCP/UDP)', 'Network Security']
  },
  {
    id: 'n5',
    title: 'Object Oriented Software Engineering & Agile',
    subject: 'Software Engineering',
    branch: 'Computer Science & Engineering',
    semester: 'Semester 5',
    college: 'SRM Institute',
    author: 'Priya Ramanathan',
    rating: 4.6,
    downloads: 7400,
    pages: 85,
    fileSize: '2.8 MB',
    type: 'Quick Revision Guide',
    previewText: 'SDLC Models (Waterfall, Agile, Scrum), Requirements Engineering, UML Diagrams (Class, Use Case, Sequence), Software Testing (Black-box, White-box), Software Metrics.',
    topics: ['Agile & Scrum', 'UML Diagrams', 'Software Testing Techniques', 'Design Patterns']
  },

  // ═══════ ARTIFICIAL INTELLIGENCE & DATA SCIENCE ═══════
  {
    id: 'n6',
    title: 'Machine Learning Mathematics & Algorithms Notes',
    subject: 'Machine Learning',
    branch: 'Artificial Intelligence & Data Science',
    semester: 'Semester 6',
    college: 'BITS Pilani',
    author: 'Dr. Vikram Shah',
    rating: 4.9,
    downloads: 13500,
    pages: 160,
    fileSize: '5.5 MB',
    type: 'Comprehensive Text & Math',
    previewText: 'Linear Regression, Logistic Regression, Decision Trees, Random Forests, SVM, Naive Bayes, K-Means Clustering, PCA Dimensionality Reduction, Gradient Descent, Model Evaluation Metrics.',
    topics: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation & Tuning', 'Feature Engineering']
  },
  {
    id: 'n7',
    title: 'Deep Learning & Neural Networks Lecture Notes',
    subject: 'Deep Learning',
    branch: 'Artificial Intelligence & Data Science',
    semester: 'Semester 7',
    college: 'IIT Bombay',
    author: 'Prof. Ananya Sen',
    rating: 4.9,
    downloads: 10200,
    pages: 140,
    fileSize: '5.1 MB',
    type: 'Lecture Slides & Derivations',
    previewText: 'Perceptrons, Multilayer Perceptrons, Backpropagation mathematics, CNNs for Vision, RNNs & LSTMs for Sequential Data, Transformers & Attention Mechanism, PyTorch implementation code.',
    topics: ['CNN Architectures', 'RNN & Transformer Models', 'Optimization & Backprop', 'PyTorch Solved Examples']
  },

  // ═══════ MECHANICAL ENGINEERING ═══════
  {
    id: 'n8',
    title: 'Thermodynamics & Thermal Engineering Solved Formulas',
    subject: 'Thermodynamics',
    branch: 'Mechanical Engineering',
    semester: 'Semester 3',
    college: 'Anna University',
    author: 'Prof. S. Balaji',
    rating: 4.8,
    downloads: 11000,
    pages: 105,
    fileSize: '3.7 MB',
    type: 'Formula Sheet + Solved Problems',
    previewText: 'Laws of Thermodynamics, Carnot Cycle, Otto Cycle, Diesel Cycle, Rankine Cycle, Entropy Calculations, Steam Power Plants, Refrigeration & Air Conditioning cycles.',
    topics: ['First & Second Law', 'Air Standard Cycles', 'Steam & Power Cycles', 'Psychrometry']
  },
  {
    id: 'n9',
    title: 'Strength of Materials (SOM) Exam Essentials',
    subject: 'Strength of Materials',
    branch: 'Mechanical Engineering',
    semester: 'Semester 3',
    college: 'COEP Pune',
    author: 'Dr. V. N. Joshi',
    rating: 4.9,
    downloads: 12400,
    pages: 120,
    fileSize: '4.1 MB',
    type: 'Handwritten Solved Examples',
    previewText: 'Stress and Strain, Shear Force & Bending Moment Diagrams (SFD/BMD), Torsion in Shafts, Deflection of Beams, Thin & Thick Cylinders, Columns and Struts.',
    topics: ['Stress-Strain Relations', 'SFD & BMD Calculations', 'Deflection of Beams', 'Torsion & Columns']
  },

  // ═══════ ELECTRICAL & ELECTRONICS ENGINEERING ═══════
  {
    id: 'n10',
    title: 'Circuit Theory & Electrical Networks Handbook',
    subject: 'Circuit Theory',
    branch: 'Electrical & Electronics Engineering',
    semester: 'Semester 3',
    college: 'JNTU Hyderabad',
    author: 'Dr. G. Reddy',
    rating: 4.7,
    downloads: 9800,
    pages: 95,
    fileSize: '3.2 MB',
    type: 'Solved Question Bank',
    previewText: 'KCL, KVL, Mesh & Nodal Analysis, Network Theorems (Thevenin, Norton, Superposition, Maximum Power), Transient Analysis, Two-Port Networks, Resonance.',
    topics: ['Network Theorems', 'Transient Response', 'Two-Port Parameters', 'Resonating Circuits']
  },

  // ═══════ COMMERCE & MANAGEMENT (B.Com / BBA / MBA) ═══════
  {
    id: 'n11',
    title: 'Financial Accounting & Corporate Reporting Standards',
    subject: 'Financial Accounting',
    branch: 'Commerce & Management',
    semester: 'Semester 1',
    college: 'Loyola College Chennai',
    author: 'Dr. S. Xavier (HOD Commerce)',
    rating: 4.8,
    downloads: 8500,
    pages: 110,
    fileSize: '3.5 MB',
    type: 'Comprehensive Study Guide',
    previewText: 'Journal, Ledger, Trial Balance, Final Accounts with Adjustments, Depreciation Accounting, Valuation of Inventory, Indian Accounting Standards (Ind AS), IFRS Overview.',
    topics: ['Journal to Balance Sheet', 'Depreciation Methods', 'Company Final Accounts', 'Ind AS Rules']
  },
  {
    id: 'n12',
    title: 'Corporate Finance & Cost Accounting Notes',
    subject: 'Corporate Finance',
    branch: 'Commerce & Management',
    semester: 'Semester 4',
    college: 'St. Xavier\'s Kolkata',
    author: 'Prof. A. Mukherjee',
    rating: 4.9,
    downloads: 9200,
    pages: 125,
    fileSize: '3.8 MB',
    type: 'Lecture Notes + Case Studies',
    previewText: 'Capital Budgeting (NPV, IRR, Payback), Cost of Capital (WACC), Capital Structure Theories, Working Capital Management, Cost Sheet, Marginal Costing & Breakeven Analysis.',
    topics: ['Capital Budgeting', 'WACC Calculations', 'Marginal Costing', 'Working Capital']
  },

  // ═══════ MEDICAL & PHARMACY ═══════
  {
    id: 'n13',
    title: 'Human Anatomy & Physiology Illustrated Notes',
    subject: 'Human Anatomy',
    branch: 'Medical & Healthcare',
    semester: '1st Year MBBS',
    college: 'MMC Chennai / AIIMS Aligned',
    author: 'Dr. Rajesh Kannan (MD Anatomy)',
    rating: 4.95,
    downloads: 16800,
    pages: 210,
    fileSize: '8.4 MB',
    type: 'Color Diagrams & Clinical Correlation',
    previewText: 'Gross Anatomy of Cardiovascular, Respiratory, Digestive, Nervous, Musculoskeletal, and Endocrine Systems. Histology slides and Embryology clinical cases included.',
    topics: ['Cardiovascular System', 'Neuroanatomy', 'Musculoskeletal Diagrams', 'Histology']
  },
  {
    id: 'n14',
    title: 'Pharmacology & Medicinal Chemistry Classification',
    subject: 'Pharmacology',
    branch: 'Medical & Healthcare',
    semester: '2nd Year MBBS / B.Pharm',
    college: 'JIPMER Puducherry',
    author: 'Dr. Meena Swaminathan',
    rating: 4.9,
    downloads: 14100,
    pages: 175,
    fileSize: '6.2 MB',
    type: 'Drug Classification Charts',
    previewText: 'Autonomic Nervous System drugs, Cardiovascular drugs, Antibiotics & Antimicrobials, Anti-cancer agents, Pharmacokinetics & Pharmacodynamics, Adverse Reactions.',
    topics: ['Drug Classifications', 'Pharmacokinetics', 'Antibiotics & Mechanisms', 'Adverse Effects']
  }
]

export const NOTE_BRANCHES = [
  'All Branches',
  'Computer Science & Engineering',
  'Artificial Intelligence & Data Science',
  'Mechanical Engineering',
  'Electrical & Electronics Engineering',
  'Civil Engineering',
  'Commerce & Management',
  'Medical & Healthcare',
  'Polytechnic & Diploma'
]
