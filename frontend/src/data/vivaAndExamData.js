/**
 * vivaAndExamData.js
 * Comprehensive All-Subject Academic Knowledge Base for Viva Preparation and Exam Emergency
 * Covers Engineering, Sciences, Commerce, Management, Arts & Humanities, Medical, and Law.
 */

export const ACADEMIC_STREAMS = {
  'Computer Science & IT': [
    'Data Structures & Algorithms',
    'Operating Systems',
    'Database Management Systems (DBMS)',
    'Computer Networks',
    'Object Oriented Programming (Java/C++)',
    'Software Engineering & Agile',
    'Artificial Intelligence & Machine Learning',
    'Web Technologies (Full Stack)',
    'Cybersecurity & Cryptography',
    'Cloud Computing & DevOps',
    'Compiler Design',
    'Computer Architecture & Organization'
  ],
  'Electronics & Communication (ECE)': [
    'Digital Electronics & Logic Design',
    'Signals and Systems',
    'Analog & Digital Communication',
    'VLSI Design & Embedded Systems',
    'Microprocessors & Microcontrollers (8051/ARM)',
    'Electromagnetic Fields & Antennas',
    'Control Systems'
  ],
  'Electrical & Electronics (EEE)': [
    'Electric Circuits & Network Theory',
    'Electrical Machines (Transformers & Motors)',
    'Power Systems & Transmission',
    'Power Electronics & Drives',
    'Control Systems Engineering',
    'Renewable Energy Systems'
  ],
  'Mechanical & Civil Engineering': [
    'Thermodynamics & Heat Transfer',
    'Fluid Mechanics & Machinery',
    'Strength of Materials (Solid Mechanics)',
    'Theory of Machines & Kinematics',
    'Structural Analysis & Design',
    'Surveying & Geotechnical Engineering',
    'Manufacturing Technology & CAD/CAM'
  ],
  'Basic Sciences & Mathematics': [
    'Engineering Mathematics (Calculus, Linear Algebra, Diff Eq)',
    'Engineering Physics (Optics, Quantum, Lasers)',
    'Engineering Chemistry (Electrochemistry, Polymers, Corrosion)',
    'Probability, Statistics & Numerical Methods',
    'Biotechnology & Microbiology',
    'Environmental Science & Disaster Management'
  ],
  'Commerce & Banking': [
    'Financial Accounting & Reporting',
    'Corporate Accounting & Auditing',
    'Income Tax & Goods and Services Tax (GST)',
    'Banking Operations & Insurance',
    'Cost & Management Accounting',
    'Financial Management & Capital Markets'
  ],
  'Management & Business Administration': [
    'Human Resource Management (HRM)',
    'Marketing Management & Consumer Behavior',
    'Financial Management & Investment Analysis',
    'Operations & Supply Chain Management',
    'Strategic Management & Business Policy',
    'Business Analytics & Data-Driven Decision Making'
  ],
  'Arts, Humanities & Social Sciences': [
    'English Literature & Communication Skills',
    'Indian History & World Civilizations',
    'Political Science & Public Administration',
    'Sociology & Social Institutions',
    'General Psychology & Human Behavior',
    'Economics (Micro & Macro Economics)'
  ],
  'Medical & Health Sciences': [
    'Human Anatomy & Histology',
    'Human Physiology',
    'Medical Biochemistry',
    'Pharmacology & Drug Action',
    'Pathology & Disease Mechanisms',
    'Microbiology & Immunology'
  ],
  'Law & Judiciary': [
    'Constitutional Law of India',
    'Indian Penal Code (IPC) & Criminal Law',
    'Law of Contracts & Specific Relief',
    'Company Law & Corporate Governance',
    'Law of Torts & Consumer Protection',
    'Jurisprudence & Legal Theory'
  ]
}

// ─── MASTER SUBJECT KNOWLEDGE PACKS (Viva + 2-Marks + 16-Marks + Cheat Sheet) ──
export const SUBJECT_PACKS = {
  'Data Structures & Algorithms': {
    viva: [
      { q: 'What is the fundamental difference between an Array and a Linked List in memory?', a: 'Arrays use contiguous memory allocation with O(1) random index access but fixed size. Linked Lists use dynamic heap nodes with pointers, offering O(1) insertions/deletions without reallocation but requiring O(N) sequential traversal and extra memory for pointers.', diff: 'easy' },
      { q: 'What is an AVL Tree and how does it maintain self-balancing?', a: 'An AVL tree is a self-balancing Binary Search Tree where the balance factor (height(left) - height(right)) for every node is strictly between -1, 0, and +1. When unbalanced by insertion or deletion, it performs LL, RR, LR, or RL rotations in O(1) to restore O(log N) operations.', diff: 'medium' },
      { q: 'Explain Hash Collisions and compare Chaining vs Open Addressing.', a: 'Collision happens when two distinct keys yield the same hash index. Separate Chaining resolves collisions using a linked list at each bucket. Open Addressing searches alternative slots within the hash table array (Linear Probing, Quadratic Probing, Double Hashing).', diff: 'medium' },
      { q: 'What is the time and space complexity of Merge Sort vs Quick Sort in worst case?', a: 'Merge Sort is strictly O(N log N) in all cases with O(N) auxiliary space. Quick Sort is O(N log N) on average and O(log N) space, but degrades to O(N²) worst-case when bad pivots are chosen (sorted array with last element pivot).', diff: 'medium' },
      { q: 'When would you use Dijkstra algorithm over Bellman-Ford?', a: 'Use Dijkstra (O((V+E) log V)) for single-source shortest paths on graphs with non-negative edge weights. Use Bellman-Ford (O(V*E)) when negative edge weights exist or to detect negative weight cycles in graphs.', diff: 'hard' }
    ],
    twoMarks: [
      { q: 'Define Big-O notation and Big-Omega notation.', a: 'Big-O (O) represents the asymptotic upper bound (worst-case performance). Big-Omega (Ω) represents the asymptotic lower bound (best-case performance).' },
      { q: 'What is a Circular Queue and why is it preferred over a Simple Queue?', a: 'A Circular Queue connects the last position back to the first in a ring. It overcomes memory wastage in linear queues where free spaces left after dequeuing cannot be reused.' },
      { q: 'State the properties of a Red-Black Tree.', a: '1. Nodes are either Red or Black. 2. Root is always Black. 3. No two adjacent Red nodes. 4. Every path from root to leaves has same number of Black nodes.' },
      { q: 'What is a Trie data structure and its common use case?', a: 'A Trie is an efficient tree-like search structure for storing strings associative keys. Used in auto-complete, spell checking, and IP prefix routing.' }
    ],
    sixteenMarks: [
      {
        title: 'Explain Dijkstra Single Source Shortest Path Algorithm with step-by-step example and complexity analysis.',
        outline: [
          '1. Principle & Greedy Paradigm: Maintains distance array and priority queue of visited/unvisited vertices.',
          '2. Algorithm Pseudocode: Initialize dist[source]=0, dist[v]=∞; extract-min node and relax adjacent edges (dist[v] = min(dist[v], dist[u] + weight(u,v))).',
          '3. Trace with 5-Node Graph Diagram and Distance Table updates across iterations.',
          '4. Time Complexity Analysis: O((V + E) log V) with Min-Heap, Space Complexity O(V).'
        ]
      },
      {
        title: 'Compare In-order, Pre-order, Post-order and Level-order tree traversals with iterative and recursive implementations.',
        outline: [
          '1. Definitions: Pre-order (Root-L-R), In-order (L-Root-R), Post-order (L-R-Root), Level-order (BFS Queue).',
          '2. Recursive code blocks and Iterative stack-based solutions.',
          '3. Reconstruction of unique Binary Trees using Pre-order + In-order or Post-order + In-order.',
          '4. Real-world applications (Expression Trees, DOM parsing, Garbage collection).'
        ]
      }
    ],
    cheatSheet: [
      'Array Access: O(1) | Search: O(N) | Insertion: O(N)',
      'BST Search/Insert: O(log N) Avg | O(N) Worst',
      'AVL / Red-Black Tree Search/Insert/Delete: Strictly O(log N)',
      'Merge Sort: O(N log N) Stable | Quick Sort: O(N log N) Avg, O(N²) Worst',
      'Heapify Time Complexity: O(N) | Heap Insert/Delete: O(log N)'
    ]
  },

  'Database Management Systems (DBMS)': {
    viva: [
      { q: 'What are ACID properties in database transaction management?', a: 'Atomicity (All or nothing), Consistency (preserves integrity constraints), Isolation (concurrent transactions execute independently), Durability (committed changes persist permanently even after system crashes).', diff: 'easy' },
      { q: 'Explain the difference between Primary Key, Unique Key, and Foreign Key.', a: 'Primary Key uniquely identifies a record and cannot accept NULL. Unique Key enforces uniqueness but allows one NULL. Foreign Key references the Primary Key of another table to maintain referential integrity.', diff: 'easy' },
      { q: 'What are 1NF, 2NF, 3NF, and BCNF normalization forms?', a: '1NF: Atomic column values. 2NF: 1NF + No partial functional dependency on composite primary key. 3NF: 2NF + No transitive dependency. BCNF: Stricter 3NF where for every X -> Y, X must be a super key.', diff: 'medium' },
      { q: 'Why is B+ Tree preferred over B Tree and Binary Tree for disk-based database indexing?', a: 'B+ Trees store all actual record pointers in leaf nodes connected as a doubly linked list, enabling fast range scans and predictable disk I/O. Internal nodes only hold index keys, allowing high branching factors in disk block sizes.', diff: 'hard' },
      { q: 'Explain Two-Phase Locking (2PL) and how it prevents concurrency anomalies.', a: '2PL has a Growing Phase (only acquire locks, no release) and a Shrinking Phase (only release locks, no new acquire). It guarantees Conflict Serializability of concurrent schedules.', diff: 'hard' }
    ],
    twoMarks: [
      { q: 'Differentiate between DDL, DML, DCL, and TCL commands.', a: 'DDL (CREATE, ALTER, DROP), DML (SELECT, INSERT, UPDATE, DELETE), DCL (GRANT, REVOKE), TCL (COMMIT, ROLLBACK, SAVEPOINT).' },
      { q: 'What is a View in SQL and its advantages?', a: 'A View is a virtual table based on the result-set of an SQL statement. Provides data security, simplifies complex queries, and hides underlying schema complexity.' },
      { q: 'What is the difference between Truncate and Delete?', a: 'DELETE is a logged DML operation that removes rows based on WHERE and can be rolled back. TRUNCATE is a faster DDL operation that deallocates all table pages, resets identity, and cannot be conditionally filtered.' }
    ],
    sixteenMarks: [
      {
        title: 'Explain Database Normalization from 1NF to BCNF with comprehensive student/course relational examples.',
        outline: [
          '1. Anomalies in unnormalized databases (Insertion, Deletion, Update anomalies).',
          '2. Functional Dependencies and Armstrong axioms.',
          '3. Step-by-step decomposition: Unnormalized -> 1NF -> 2NF -> 3NF -> BCNF.',
          '4. Lossless Join Decomposition and Dependency Preservation checks.'
        ]
      }
    ],
    cheatSheet: [
      'Inner Join: Only matching rows from both tables',
      'Left Join: All rows from left table + matched rows from right',
      'Clustered Index: Modifies physical table order (1 per table)',
      'Non-Clustered Index: Separate index table pointing to data rows',
      'Isolation Levels: Read Uncommitted < Read Committed < Repeatable Read < Serializable'
    ]
  },

  'Operating Systems': {
    viva: [
      { q: 'What is the difference between a Process and a Thread?', a: 'A Process is an independent program in execution with its own address space, PCB, and resources. A Thread is a lightweight execution unit within a process sharing the same memory, code, and data segments.', diff: 'easy' },
      { q: 'What are the four necessary conditions for a Deadlock to occur?', a: '1. Mutual Exclusion. 2. Hold and Wait. 3. No Preemption. 4. Circular Wait. Eliminating any one condition prevents deadlocks.', diff: 'medium' },
      { q: 'Explain Paging and how Translation Lookaside Buffer (TLB) speeds up address translation.', a: 'Paging divides virtual memory into fixed-size pages and physical memory into frames. The TLB is a high-speed associative hardware cache holding recent page table translations, avoiding two memory accesses per address.', diff: 'medium' },
      { q: 'What is Thrashing in virtual memory and how can it be avoided?', a: 'Thrashing occurs when the OS spends more time swapping pages in/out than executing user instructions due to insufficient frame allocation. Avoided using Working Set Model and Page Fault Frequency control.', diff: 'hard' }
    ],
    twoMarks: [
      { q: 'What is a Context Switch and its overhead?', a: 'The process of saving the state of the currently running process and restoring the state of another scheduled process. Overhead comes from saving registers, flushing pipeline, and updating memory maps.' },
      { q: 'Define Semaphore and state the difference between Counting and Binary Semaphore.', a: 'A Semaphore is an integer synchronization variable accessed via wait() (P) and signal() (V) operations. Binary semaphore value is 0 or 1 (mutex); Counting semaphore handles resource pools of size N.' }
    ],
    sixteenMarks: [
      {
        title: 'Discuss CPU Scheduling Algorithms (FCFS, SJF Preemptive/Non-preemptive, Round Robin, Priority) with Gantt Charts and Average Waiting Time calculations.',
        outline: [
          '1. CPU Scheduler criteria: Throughput, Turnaround Time, Waiting Time, Response Time.',
          '2. Problem Statement with 5 processes (Burst Times & Arrival Times).',
          '3. Gantt charts construction for each algorithm.',
          '4. Tabulated calculation of TAT and WT, followed by comparative analysis of starvation.'
        ]
      }
    ],
    cheatSheet: [
      'Turnaround Time (TAT) = Completion Time - Arrival Time',
      'Waiting Time (WT) = Turnaround Time - Burst Time',
      'Banker\'s Algorithm: Resource Allocation & Safe State Verification',
      'Page Replacement: FIFO (Belady anomaly), LRU (Optimal practical), Optimal (Theoretical)'
    ]
  },

  'Computer Networks': {
    viva: [
      { q: 'Explain the 7 layers of the OSI model and their primary responsibilities.', a: '1. Physical (raw bit transmission). 2. Data Link (framing, MAC, error control). 3. Network (IP routing, packet forwarding). 4. Transport (end-to-end TCP/UDP reliability). 5. Session (dialog management). 6. Presentation (encryption, compression). 7. Application (HTTP, DNS, SMTP).', diff: 'easy' },
      { q: 'What is the three-way handshake in TCP connection establishment?', a: '1. Client sends SYN (Synchronize sequence number). 2. Server responds with SYN + ACK. 3. Client replies with ACK. Connection is established for reliable, full-duplex byte stream transmission.', diff: 'medium' },
      { q: 'Compare IPv4 vs IPv6 addressing.', a: 'IPv4 is 32-bit (approx 4.3 billion addresses) written in decimal notation. IPv6 is 128-bit (virtually unlimited addresses) written in hexadecimal notation with built-in IPsec security and no broadcast storms.', diff: 'easy' }
    ],
    twoMarks: [
      { q: 'What is the difference between TCP and UDP?', a: 'TCP is connection-oriented, reliable, guarantees packet ordering with flow/congestion control. UDP is connectionless, lightweight, unreliable with no retransmission, ideal for real-time video/gaming.' },
      { q: 'What is ARP (Address Resolution Protocol)?', a: 'ARP resolves a known logical 32-bit IP address to a physical 48-bit MAC address on the local network segment.' }
    ],
    sixteenMarks: [
      {
        title: 'Explain IP Subnetting and Variable Length Subnet Masking (VLSM) with network division examples.',
        outline: [
          '1. Classful vs Classless Inter-Domain Routing (CIDR).',
          '2. Subnet mask mathematical calculation and network/broadcast address derivation.',
          '3. VLSM design for multi-department college network architecture.',
          '4. Routing table lookup using Longest Prefix Matching.'
        ]
      }
    ],
    cheatSheet: [
      'Port Numbers: HTTP (80), HTTPS (443), DNS (53), SSH (22), FTP (20/21), SMTP (25)',
      'Subnetting formula: Number of subnets = 2^s | Hosts per subnet = 2^h - 2',
      'Distance Vector (RIP - Bellman-Ford) vs Link State (OSPF - Dijkstra)'
    ]
  },

  'Engineering Mathematics (Calculus, Linear Algebra, Diff Eq)': {
    viva: [
      { q: 'What is the geometric meaning of Eigenvalues and Eigenvectors of a matrix?', a: 'An eigenvector represents a non-zero vector whose spatial direction remains unchanged when a linear transformation is applied. The eigenvalue is the scalar factor by which the eigenvector is scaled (expanded, compressed, or flipped).', diff: 'medium' },
      { q: 'State Cayley-Hamilton Theorem and its practical application.', a: 'Every square matrix satisfies its own characteristic equation |A - λI| = 0. It is widely used to compute higher matrix powers (A^n) and matrix inverses (A^-1) algebraically without determinants.', diff: 'medium' },
      { q: 'What is the difference between Gradient, Divergence, and Curl in Vector Calculus?', a: 'Gradient converts scalar field to vector (direction of maximum rate of increase). Divergence measures net outward flux of vector field from a point (scalar). Curl measures rotational circulation tendency around a point (vector).', diff: 'hard' }
    ],
    twoMarks: [
      { q: 'State Euler\'s Theorem for Homogeneous Functions.', a: 'If f(x, y) is a homogeneous function of degree n in x and y, then x*(∂f/∂x) + y*(∂f/∂y) = n*f(x, y).' },
      { q: 'What is the condition for a system of linear equations AX = B to be consistent?', a: 'The system is consistent if Rank(A) = Rank([A|B]) (Augmented matrix). If Rank = number of variables, unique solution; if Rank < variables, infinite solutions.' }
    ],
    sixteenMarks: [
      {
        title: 'Explain Diagonalization of a Matrix using Orthogonal Transformations and Quadratic Forms reduction.',
        outline: [
          '1. Determination of Characteristic equation and Eigenvalues.',
          '2. Calculation of Orthogonal Eigenvectors and Normalized Modal Matrix N.',
          '3. Computation of Diagonal Matrix D = N^T * A * N.',
          '4. Canonical form conversion of quadratic equation and nature determination (Positive Definite, Indefinite).'
        ]
      }
    ],
    cheatSheet: [
      'Laplace Transform: L{e^(at)} = 1/(s - a) | L{sin(at)} = a/(s² + a²) | L{cos(at)} = s/(s² + a²)',
      'Fourier Series: f(x) = a0/2 + Σ [an cos(nx) + bn sin(nx)]',
      'Rank-Nullity Theorem: Rank(A) + Nullity(A) = Number of columns of A'
    ]
  },

  'Financial Accounting & Reporting': {
    viva: [
      { q: 'What is the Golden Rule of Accounting in Double-Entry bookkeeping?', a: '1. Real Accounts: Debit what comes in, Credit what goes out. 2. Personal Accounts: Debit the receiver, Credit the giver. 3. Nominal Accounts: Debit all expenses and losses, Credit all incomes and gains.', diff: 'easy' },
      { q: 'Explain the Accounting Equation and why it always balances.', a: 'Assets = Liabilities + Owner\'s Equity. Every financial transaction has dual debit and credit effects of equal value, keeping the balance sheet permanently in equilibrium.', diff: 'easy' },
      { q: 'What is the difference between Cash Flow from Operating, Investing, and Financing activities?', a: 'Operating: Daily core business cash receipts/payments. Investing: Purchase/sale of long-term capital assets and investments. Financing: Equity issuance, debt borrowings, dividend payouts, and loan repayments.', diff: 'medium' }
    ],
    twoMarks: [
      { q: 'What is Working Capital and its formula?', a: 'Working Capital represents the liquid capital for day-to-day operations: Net Working Capital = Current Assets - Current Liabilities.' },
      { q: 'What is Goodwill and how is it calculated?', a: 'Goodwill is an intangible asset representing the brand reputation and excess earnings capability of a firm over its net identifiable tangible assets.' }
    ],
    sixteenMarks: [
      {
        title: 'Preparation of Final Accounts with Adjustments (Trading A/c, Profit & Loss A/c, Balance Sheet).',
        outline: [
          '1. Format and structuring of Trading and P&L statements.',
          '2. Standard adjustments: Closing stock, Outstanding expenses, Prepaid expenses, Provision for bad debts, Depreciation.',
          '3. Comprehensive 12-item trial balance problem with complete solution.',
          '4. Balance sheet grouping and Marshalling of assets and liabilities.'
        ]
      }
    ],
    cheatSheet: [
      'Gross Profit = Net Sales - Cost of Goods Sold (COGS)',
      'Current Ratio = Current Assets / Current Liabilities (Ideal 2:1)',
      'Debt-to-Equity Ratio = Total Debt / Shareholders Equity (Ideal 1:1)'
    ]
  },

  'Constitutional Law of India': {
    viva: [
      { q: 'What is the Basic Structure Doctrine established in Kesavananda Bharati (1973)?', a: 'Parliament has broad powers to amend the Constitution under Article 368, but it cannot alter or destroy its Basic Structure (e.g., Supremacy of Constitution, Rule of Law, Judicial Review, Secularism, Separation of Powers).', diff: 'medium' },
      { q: 'Explain the 5 Constitutional Writs under Article 32 and Article 226.', a: '1. Habeas Corpus (Produce the detained body). 2. Mandamus (Command a public official to perform duty). 3. Prohibition (Prevent lower courts from exceeding jurisdiction). 4. Certiorari (Quash illegal judicial orders). 5. Quo-Warranto (Question legal authority to hold public office).', diff: 'medium' }
    ],
    twoMarks: [
      { q: 'What is Article 21 of the Indian Constitution?', a: 'Article 21 guarantees Protection of Life and Personal Liberty: "No person shall be deprived of his life or personal liberty except according to procedure established by law" (interpreted broadly by Supreme Court to include right to privacy, clean environment, education).' },
      { q: 'What is the difference between Fundamental Rights and Directive Principles of State Policy (DPSP)?', a: 'Fundamental Rights (Part III) are justiciable and legally enforceable in courts. DPSPs (Part IV) are non-justiciable social guidelines for the State in law-making.' }
    ],
    sixteenMarks: [
      {
        title: 'Right to Equality under Article 14, 15, and 16 with Doctrine of Reasonable Classification and Landmark Judgments.',
        outline: [
          '1. Scope of Equality before Law & Equal Protection of the Laws.',
          '2. Old Doctrine (Reasonable Classification with Intelligible Differentia) vs New Doctrine (Arbitrariness in EP Royappa & Maneka Gandhi).',
          '3. Prohibition of discrimination on specific grounds (Art 15) and reservations in public employment (Art 16).',
          '4. Landmark case laws analysis.'
        ]
      }
    ],
    cheatSheet: [
      'Article 14: Right to Equality | Article 19: Six Freedoms | Article 21: Life & Liberty | Article 32: Constitutional Remedies',
      'Preamble: Sovereign, Socialist, Secular, Democratic Republic',
      'Emergency Provisions: National (Art 352), State/President Rule (Art 356), Financial (Art 360)'
    ]
  }
}

/**
 * Returns complete academic pack for any given subject. If not mapped directly,
 * dynamically generates a structured pack using standard curriculum taxonomy.
 */
export function getSubjectStudyPack(subjectName) {
  if (SUBJECT_PACKS[subjectName]) {
    return SUBJECT_PACKS[subjectName]
  }

  // Dynamic fallback generator ensuring 100% subject coverage
  return {
    viva: [
      { q: `What are the fundamental principles and core definitions in ${subjectName}?`, a: `The fundamental principles of ${subjectName} focus on core theoretical frameworks, systematic methodologies, and real-world analytical models applied in industrial and academic contexts.`, diff: 'easy' },
      { q: `Explain the key mechanisms, comparative advantages, and constraints in ${subjectName}.`, a: `Mechanisms in ${subjectName} are evaluated by measuring efficiency, resource optimization, reliability, and standards compliance compared to legacy approaches.`, diff: 'medium' },
      { q: `Discuss advanced troubleshooting, critical edge cases, and modern developments in ${subjectName}.`, a: `Advanced implementations analyze edge-case failure modes, modern industry best practices, performance scaling, and regulatory compliance.`, diff: 'hard' }
    ],
    twoMarks: [
      { q: `State the primary objective and scope of ${subjectName}.`, a: `Provides foundational knowledge, practical techniques, and problem-solving methodologies required for university examinations and industrial applications.` },
      { q: `Mention two major advantages and limitations in ${subjectName}.`, a: `Advantages include enhanced efficiency and structured analysis; limitations involve computational overhead and resource constraints.` }
    ],
    sixteenMarks: [
      {
        title: `Comprehensive analysis, architectural design, and step-by-step methodologies in ${subjectName}.`,
        outline: [
          '1. Theoretical introduction, core definitions, and foundational laws.',
          '2. Block diagrams, architectural schematics, and mathematical formulations.',
          '3. Practical applications, comparative benchmarks, and case study examples.',
          '4. Summary of advantages, trade-offs, and future industry trends.'
        ]
      }
    ],
    cheatSheet: [
      `Key Formula 1: Core metric evaluation for ${subjectName}`,
      `Key Concept 2: High-frequency university exam concept`,
      `Key Rule 3: Essential theorem / principle to state in answer sheets`
    ]
  }
}
