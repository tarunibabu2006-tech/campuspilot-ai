export const sampleNotes = [
  // Engineering Notes (15)
  { id: 1, title: 'Data Structures - Arrays', category: 'Engineering', content: 'Arrays are linear data structures storing elements in contiguous memory. Time complexities: Access O(1), Insertion/Deletion O(n).' },
  { id: 2, title: 'Data Structures - Linked Lists', category: 'Engineering', content: 'Linked lists consist of nodes with data and next references. Singly, doubly, and circular variants exist. Insert/Delete is O(1) if pointer known.' },
  { id: 3, title: 'Operating Systems - Process Scheduling', category: 'Engineering', content: 'CPU scheduling algorithms: FCFS, Shortest Job First (SJF), Round Robin (RR), Priority-based. Focus on response time and throughput optimization.' },
  { id: 4, title: 'DBMS - Relational Model & SQL', category: 'Engineering', content: 'Relational databases store tables. SQL queries use SELECT, JOIN, WHERE, GROUP BY. DDL specifies schema; DML updates rows.' },
  { id: 5, title: 'Computer Networks - OSI Model layers', category: 'Engineering', content: '7 Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application. Bridges/Switches work at L2; Routers work at L3.' },
  { id: 6, title: 'Web Dev - React Lifecycle Hooks', category: 'Engineering', content: 'React components have mounting, updating, and unmounting phases. useEffect combines componentDidMount, componentDidUpdate, and componentWillUnmount.' },
  { id: 7, title: 'Algorithms - Quick Sort', category: 'Engineering', content: 'Quick Sort is a Divide and Conquer algorithm. It picks a pivot element and partitions the array. Average time complexity is O(n log n).' },
  { id: 8, title: 'Operating Systems - Deadlocks', category: 'Engineering', content: 'Deadlocks require four conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait. Handled via prevention, avoidance (Banker\'s), or detection.' },
  { id: 9, title: 'DBMS - Database Normalization', category: 'Engineering', content: 'Normalization reduces redundancy. 1NF (atomic values), 2NF (remove partial dependencies), 3NF (remove transitive dependencies), BCNF (stronger 3NF).' },
  { id: 10, title: 'Computer Networks - TCP vs UDP', category: 'Engineering', content: 'TCP is connection-oriented, reliable, guarantees delivery via handshakes. UDP is connectionless, fast, unreliable, used in streaming/DNS.' },
  { id: 11, title: 'Software Engineering - Agile Methodology', category: 'Engineering', content: 'Agile is iterative software development focusing on collaboration. Scrum uses Sprints (2-4 weeks), Daily Standups, and Backlogs.' },
  { id: 12, title: 'Machine Learning - Linear Regression', category: 'Engineering', content: 'Linear Regression models the relationship between dependent and independent variables using a straight line: y = mx + c.' },
  { id: 13, title: 'Cybersecurity - Cryptographic Hash Functions', category: 'Engineering', content: 'Hash functions convert arbitrary input to fixed-size string. One-way property: impossible to reverse. Collision resistance: no two inputs share same hash.' },
  { id: 14, title: 'Cloud Computing - Serverless Architecture', category: 'Engineering', content: 'Serverless lets developers build apps without managing server infrastructure. Cloud provider handles scaling and execution (e.g., AWS Lambda).' },
  { id: 15, title: 'IoT - Core Architecture Protocols', category: 'Engineering', content: 'IoT devices connect via lightweight protocols: MQTT (publish-subscribe pattern), CoAP (REST-based request-response), HTTP.' },

  // Arts Notes (10)
  { id: 16, title: 'Ancient Indian History', category: 'Arts', content: 'Harappan Civilization marks the bronze age urban setup. Maurya empire unified India under Chandragupta and Ashoka, promoting Buddhism.' },
  { id: 17, title: 'Physical Geography - Plate Tectonics', category: 'Arts', content: 'Earth lithosphere is divided into tectonic plates. Plate movements cause earthquakes, volcanic activities, and mountain formations (fold mountains).' },
  { id: 18, title: 'Political Science - Fundamental Rights', category: 'Arts', content: 'Part III of Indian Constitution guarantees six fundamental rights including Right to Equality, Freedom, and Constitutional Remedies (Article 32).' },
  { id: 19, title: 'Sociology - Social Stratification', category: 'Arts', content: 'Societies categorize people into rankings based on wealth, power, and prestige. Common systems: Caste system (closed) and Class system (open).' },
  { id: 20, title: 'Psychology - Classical Conditioning', category: 'Arts', content: 'Pavlov\'s experiment proved learning through association. A neutral stimulus (bell) paired with unconditioned stimulus (food) produces conditioned response.' },
  { id: 21, title: 'Modern World History - World War I', category: 'Arts', content: 'WWI was triggered by the assassination of Archduke Franz Ferdinand in 1914. Fought between Allied Powers and Central Powers. Ended in 1918.' },
  { id: 22, title: 'Human Geography - Demographic Transition', category: 'Arts', content: 'Describes population change over time. Stage 1: High birth & death rates. Stage 2: Falling death, high birth. Stage 3: Falling birth. Stage 4: Low birth & death.' },
  { id: 23, title: 'Economics - Microeconomics Laws of Demand', category: 'Arts', content: 'Law of demand states that other factors remaining constant, price and quantity demanded of any good are inversely related.' },
  { id: 24, title: 'English Literature - Shakespearian Tragedies', category: 'Arts', content: 'Tragedies feature noble protagonists with fatal flaws (hamartia) leading to downfall. Famous works: Hamlet (indecision), Macbeth (ambition).' },
  { id: 25, title: 'Fine Arts - Renaissance Art Techniques', category: 'Arts', content: 'Renaissance art revived classical themes. Key techniques: Linear perspective (depth), Chiaroscuro (light/shadow contrast), Sfumato (soft transitions).' },

  // Science Notes (10)
  { id: 26, title: 'Physics - Classical Mechanics Newton\'s Laws', category: 'Science', content: '1: Inertia. 2: Force = mass × acceleration (F = ma). 3: Action and reaction are equal and opposite.' },
  { id: 27, title: 'Chemistry - Periodic Table Trends', category: 'Science', content: 'Electronegativity, Ionization Energy increase across a period, decrease down a group. Atomic radius decreases across, increases down.' },
  { id: 28, title: 'Biology - Cell Division Mitosis', category: 'Science', content: 'Mitosis produces two genetically identical diploid daughter cells. Stages: Prophase, Metaphase, Anaphase, Telophase.' },
  { id: 29, title: 'Mathematics - Calculus Integration', category: 'Science', content: 'Integration is the process of finding the area under a curve. It acts as the inverse operation of differentiation.' },
  { id: 30, title: 'Environmental Science - Greenhouse Effect', category: 'Science', content: 'Greenhouse gases (CO2, methane, water vapor) trap solar radiation in the atmosphere, keeping the Earth warm enough to support life.' },
  { id: 31, title: 'Biotechnology - Recombinant DNA Technology', category: 'Science', content: 'Splicing genes from different sources. Restriction enzymes cut DNA; ligase seals them. Plasmids serve as vectors to replicate host systems.' },
  { id: 32, title: 'Physics - Thermodynamics Laws', category: 'Science', content: 'Zeroth: Thermal equilibrium. First: Energy conservation. Second: Entropy increases. Third: Absolute zero entropy is constant.' },
  { id: 33, title: 'Chemistry - Organic Chemistry Hybridization', category: 'Science', content: 'Carbon forms sp3 (single bonds, tetrahedral), sp2 (double bonds, planar), sp (triple bonds, linear) hybridized orbitals.' },
  { id: 34, title: 'Biology - Mendelian Genetics', category: 'Science', content: 'Gregor Mendel discovered inheritance principles using pea plants. Law of Segregation, Independent Assortment, and Dominance.' },
  { id: 35, title: 'Mathematics - Probability Distributions', category: 'Science', content: 'Probability models: Binomial (discrete, pass/fail), Poisson (events per interval), Normal (bell-shaped, continuous variables).' },

  // Commerce Notes (5)
  { id: 36, title: 'Accounting - Double Entry System', category: 'Commerce', content: 'Every financial transaction affects at least two accounts. Debit represents receiving benefits, credit represents giving benefits.' },
  { id: 37, title: 'Finance - Time Value of Money', category: 'Commerce', content: 'A rupee today is worth more than a rupee tomorrow due to interest-earning potential. Calculators use Future Value (FV) and Present Value (PV).' },
  { id: 38, title: 'Marketing - The 4 Ps marketing mix', category: 'Commerce', content: 'Product (features), Price (strategy), Place (distribution), Promotion (advertising). Serves as framework for target marketing.' },
  { id: 39, title: 'Business Law - Indian Contract Act 1872', category: 'Commerce', content: 'A contract is a legally enforceable agreement. Essential elements: Offer, Acceptance, Consideration, Capacity, Free Consent.' },
  { id: 40, title: 'Taxation - Indirect vs Direct Taxes', category: 'Commerce', content: 'Direct taxes (income tax) are paid directly by individuals. Indirect taxes (GST) are levied on goods and services, passed to consumers.' },

  // Management Notes (5)
  { id: 41, title: 'Management - Principles of Planning', category: 'Management', content: 'Planning defines goals, establishes strategies, and coordinates activities. Smart goals: Specific, Measurable, Achievable, Relevant, Timely.' },
  { id: 42, title: 'HRM - Recruitment Selection Funnel', category: 'Management', content: 'Sourcing, screening resumes, technical interviews, behavioral evaluations, and offering. Recruitment attracts pool; selection chooses best.' },
  { id: 43, title: 'Organizational Behavior - Theory X & Y', category: 'Management', content: 'McGregor\'s motivation theories. Theory X assumes workers dislike work, needing supervision. Theory Y assumes self-motivated workers.' },
  { id: 44, title: 'Operations - Supply Chain Logistics', category: 'Management', content: 'Coordinates raw materials, manufacturing, warehousing, inventory tracking, and final delivery to consumers.' },
  { id: 45, title: 'Financial Management - Capital Budgeting', category: 'Management', content: 'Evaluation of major investments. Techniques: Net Present Value (NPV), Internal Rate of Return (IRR), Payback Period.' },

  // Medical Notes (5)
  { id: 46, title: 'Anatomy - Cardiovascular System Structure', category: 'Medical', content: 'Four-chambered heart pump. Atria receive blood; ventricles pump it out. Arteries carry oxygenated blood; veins return deoxygenated blood.' },
  { id: 47, title: 'Physiology - Action Potential Transmission', category: 'Medical', content: 'Electrochemical signaling in neurons. Rest state (-70mV) depolarizes (+30mV) with sodium influx, repolarizes with potassium efflux.' },
  { id: 48, title: 'Pharmacology - Pharmacokinetics principles', category: 'Medical', content: 'How body affects drug: Absorption, Distribution, Metabolism, Excretion (ADME). Bioavailability represents percentage entering circulation.' },
  { id: 49, title: 'Pathology - Acute vs Chronic Inflammation', category: 'Medical', content: 'Acute: rapid onset, short duration, characterized by neutrophils. Chronic: slow onset, prolonged, characterized by macrophages/lymphocytes.' },
  { id: 50, title: 'Microbiology - Gram Positive vs Negative Bacteria', category: 'Medical', content: 'Gram-positive have thick peptidoglycan wall (stains purple). Gram-negative have thin peptidoglycan layer and outer membrane (stains pink).' }
]
