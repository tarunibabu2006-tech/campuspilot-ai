// ============================================================
// notesEngine.js — Real curriculum topic taxonomy.
// Used to seed the Notes Hub catalog (topic titles/metadata only — see
// backend/scripts/seedNoteCatalog.js). Actual note content is written for
// real by Gemini the first time a student opens a topic and cached from
// then on (backend/routes/notesHub.js) — nothing here is pre-fabricated
// content, ratings, or download counts.
// ============================================================

// ── CATEGORY TAXONOMY ──────────────────────────────────────────
export const NOTE_TAXONOMY = {
  'Computer Science & Engineering': {
    icon: '💻', color: '#3b82f6',
    subjects: {
      'Data Structures & Algorithms': {
        topics: ['Arrays & Strings', 'Linked Lists', 'Stacks & Queues', 'Trees & BST', 'AVL Trees', 'B-Trees', 'Heap & Priority Queue', 'Graph Algorithms', 'BFS & DFS', 'Dijkstra Algorithm', 'Floyd Warshall', 'Sorting Algorithms', 'Binary Search', 'Dynamic Programming', 'Greedy Algorithms', 'Backtracking', 'Divide & Conquer', 'Hashing', 'Trie', 'Segment Tree', 'Fenwick Tree', 'Union Find', 'Two Pointers', 'Sliding Window', 'Bit Manipulation'],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: Linear Data Structures', 'Unit 2: Non-Linear Structures', 'Unit 3: Graph Theory', 'Unit 4: Algorithm Design', 'Unit 5: Complexity Analysis']
      },
      'Operating Systems': {
        topics: ['Process Management', 'CPU Scheduling', 'FCFS & SJF', 'Round Robin', 'Priority Scheduling', 'Deadlock Detection', 'Banker Algorithm', 'Memory Management', 'Paging & Segmentation', 'Virtual Memory', 'Page Replacement', 'File Systems', 'UNIX System Calls', 'Semaphores & Mutex', 'Thread Synchronization', 'Inter-Process Communication', 'Device Drivers', 'I/O Management', 'Shell Programming', 'Linux Commands'],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: Process & Scheduling', 'Unit 2: Deadlock', 'Unit 3: Memory Management', 'Unit 4: File Systems', 'Unit 5: System Programming']
      },
      'Database Management Systems': {
        topics: ['ER Modeling', 'Relational Algebra', 'SQL Queries', 'Joins & Subqueries', 'Normalization 1NF-BCNF', 'Transaction ACID', 'Concurrency Control', 'Lock Protocols', 'B+ Tree Indexing', 'Query Optimization', 'NoSQL Databases', 'MongoDB', 'PostgreSQL', 'Stored Procedures', 'Triggers', 'Views', 'Data Warehousing', 'ETL Processes', 'PL/SQL', 'Distributed Databases'],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: ER & Relational Model', 'Unit 2: SQL & Queries', 'Unit 3: Normalization', 'Unit 4: Transactions', 'Unit 5: Advanced Topics']
      },
      'Computer Networks': {
        topics: ['OSI 7-Layer Model', 'TCP/IP Suite', 'IP Addressing IPv4', 'IPv6 & Subnetting', 'Routing Protocols RIP', 'OSPF & BGP', 'TCP vs UDP', 'Socket Programming', 'DNS & DHCP', 'HTTP/HTTPS', 'Network Security', 'Cryptography Basics', 'SSL/TLS', 'Firewalls', 'VPN', 'Wireless Networks', 'Bluetooth & WiFi', 'Mobile Networks 4G/5G', 'SDN', 'Network Monitoring'],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: Network Models', 'Unit 2: IP & Routing', 'Unit 3: Transport Layer', 'Unit 4: Application Layer', 'Unit 5: Network Security']
      },
      'Software Engineering': {
        topics: ['SDLC Models', 'Waterfall Model', 'Agile & Scrum', 'Kanban', 'Requirements Engineering', 'UML Use Case', 'UML Class Diagram', 'UML Sequence Diagram', 'Design Patterns', 'MVC Architecture', 'Software Testing', 'Black Box Testing', 'White Box Testing', 'Unit Testing', 'Integration Testing', 'Software Metrics', 'Risk Management', 'Version Control Git', 'CI/CD Pipelines', 'DevOps Practices'],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: SDLC & Agile', 'Unit 2: Requirements', 'Unit 3: UML & Design', 'Unit 4: Testing', 'Unit 5: Project Management']
      },
      'Machine Learning': {
        topics: ['Supervised Learning', 'Linear Regression', 'Logistic Regression', 'Decision Trees', 'Random Forest', 'SVM', 'Naive Bayes', 'Unsupervised Learning', 'K-Means Clustering', 'Hierarchical Clustering', 'PCA', 'Dimensionality Reduction', 'Feature Engineering', 'Cross Validation', 'Hyperparameter Tuning', 'Gradient Descent', 'Overfitting & Regularization', 'Bias Variance Tradeoff', 'Model Evaluation Metrics', 'Ensemble Methods'],
        levels: ['Intermediate', 'Advanced'],
        units: ['Unit 1: ML Fundamentals', 'Unit 2: Supervised Learning', 'Unit 3: Unsupervised Learning', 'Unit 4: Model Evaluation', 'Unit 5: Advanced ML']
      },
      'Web Development': {
        topics: ['HTML5 Semantics', 'CSS3 & Flexbox', 'JavaScript ES6+', 'React.js Hooks', 'Node.js & Express', 'REST APIs', 'GraphQL', 'MongoDB Atlas', 'Authentication JWT', 'OAuth 2.0', 'TypeScript', 'Next.js SSR', 'Vue.js', 'Angular', 'WebSockets', 'Progressive Web Apps', 'Web Security OWASP', 'Performance Optimization', 'SEO Best Practices', 'Deployment & Cloud'],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: Frontend Basics', 'Unit 2: JavaScript & React', 'Unit 3: Backend & APIs', 'Unit 4: Database Integration', 'Unit 5: DevOps & Deployment']
      },
      'Cybersecurity': {
        topics: ['Network Security', 'Cryptography', 'Symmetric Encryption AES', 'Asymmetric RSA', 'Digital Signatures', 'PKI', 'Ethical Hacking', 'Penetration Testing', 'SQL Injection', 'XSS Attacks', 'CSRF', 'Buffer Overflow', 'Malware Analysis', 'Forensics', 'Incident Response', 'OWASP Top 10', 'Security Auditing', 'Compliance ISO 27001', 'Cloud Security', 'Zero Trust'],
        levels: ['Intermediate', 'Advanced'],
        units: ['Unit 1: Security Fundamentals', 'Unit 2: Cryptography', 'Unit 3: Attack Vectors', 'Unit 4: Defense Strategies', 'Unit 5: Compliance & Governance']
      },
      'Cloud Computing': {
        topics: ['Cloud Models IaaS PaaS SaaS', 'AWS Services', 'Azure Platform', 'Google Cloud', 'Docker Containers', 'Kubernetes Orchestration', 'Microservices', 'Serverless Architecture', 'Load Balancing', 'Auto Scaling', 'Cloud Storage S3', 'CDN', 'CI/CD on Cloud', 'Cloud Security', 'Cost Optimization', 'Cloud Migration', 'Hybrid Cloud', 'Multi-Cloud', 'DevOps on Cloud', 'Cloud Certifications'],
        levels: ['Intermediate', 'Advanced'],
        units: ['Unit 1: Cloud Fundamentals', 'Unit 2: Major Cloud Platforms', 'Unit 3: Containers & K8s', 'Unit 4: Cloud Architecture', 'Unit 5: Security & Cost']
      },
      'Artificial Intelligence': {
        topics: ['AI Fundamentals', 'Search Algorithms BFS DFS', 'A* Algorithm', 'Hill Climbing', 'Simulated Annealing', 'Genetic Algorithms', 'Knowledge Representation', 'Logic & Inference', 'Expert Systems', 'Fuzzy Logic', 'Natural Language Processing', 'Sentiment Analysis', 'Named Entity Recognition', 'Speech Recognition', 'Computer Vision', 'Object Detection YOLO', 'Reinforcement Learning', 'Q-Learning', 'Deep Q-Networks', 'AI Ethics'],
        levels: ['Intermediate', 'Advanced'],
        units: ['Unit 1: AI Foundations', 'Unit 2: Search & Optimization', 'Unit 3: Knowledge & Logic', 'Unit 4: NLP & Vision', 'Unit 5: Reinforcement Learning']
      }
    }
  },
  'Electronics & Communication': {
    icon: '⚡', color: '#f59e0b',
    subjects: {
      'Digital Electronics': {
        topics: ['Number Systems Binary Hex', 'Boolean Algebra', 'Logic Gates', 'Combinational Circuits', 'Multiplexers', 'Decoders & Encoders', 'Flip Flops', 'Sequential Circuits', 'Counters', 'Shift Registers', 'Memory Devices', 'PLDs & CPLDs', 'FPGA', 'ALU Design', 'Control Unit', 'Pipelining', 'Cache Memory', 'Timing Analysis', 'Digital Filters', 'VHDL Basics'],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: Number Systems', 'Unit 2: Combinational Logic', 'Unit 3: Sequential Logic', 'Unit 4: Memory & Storage', 'Unit 5: Programmable Devices']
      },
      'Analog Electronics': {
        topics: ['PN Junction Diodes', 'Zener Diodes', 'BJT Operation', 'BJT Amplifiers', 'MOSFET', 'FET Amplifiers', 'Op-Amp Basics', 'Inverting Amplifier', 'Non-Inverting Amplifier', 'Summing Amplifier', 'Comparators', 'Oscillators Colpitts', 'Power Amplifiers', 'Rectifiers', 'Filters Active Passive', 'Timer 555 Circuits', 'Voltage Regulators', 'Phase Locked Loops', 'ADC DAC Converters', 'Signal Conditioning'],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: Semiconductor Devices', 'Unit 2: BJT & FET', 'Unit 3: Op-Amp Applications', 'Unit 4: Oscillators & Filters', 'Unit 5: Power Electronics']
      },
      'Signals & Systems': {
        topics: ['Signal Classification', 'Fourier Series', 'Fourier Transform', 'Laplace Transform', 'Z-Transform', 'Sampling Theorem', 'Convolution', 'Correlation', 'LTI Systems', 'BIBO Stability', 'Transfer Function', 'Bode Plots', 'Nyquist Criterion', 'DSP Fundamentals', 'FFT Algorithm', 'FIR Filters', 'IIR Filters', 'Multirate Signal Processing', 'Wavelet Transform', 'Signal Compression'],
        levels: ['Intermediate', 'Advanced'],
        units: ['Unit 1: Signal Basics', 'Unit 2: Fourier Analysis', 'Unit 3: Laplace & Z-Transform', 'Unit 4: LTI Systems', 'Unit 5: DSP']
      },
      'Microprocessors & Embedded': {
        topics: ['8085 Architecture', '8086 Instruction Set', 'Memory Interfacing', 'I/O Interfacing', 'Interrupts', 'DMA', '8051 Microcontroller', 'AVR Arduino', 'ARM Cortex', 'Embedded C', 'RTOS Concepts', 'FreeRTOS', 'Peripheral Interfaces UART SPI I2C', 'ADC Interfacing', 'Motor Control', 'PIC Microcontroller', 'Assembly Language', 'Embedded Linux', 'IoT Protocols', 'MQTT & BLE'],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: Microprocessor Basics', 'Unit 2: 8085/8086 Programming', 'Unit 3: Microcontrollers', 'Unit 4: Embedded Systems', 'Unit 5: IoT & RTOS']
      },
      'Communication Systems': {
        topics: ['AM Modulation', 'FM Modulation', 'PM Modulation', 'AM Demodulation', 'FM Demodulation', 'Superheterodyne Receiver', 'Noise in Communication', 'SNR Calculations', 'Digital Modulation ASK FSK PSK', 'QAM', 'OFDM', 'Spread Spectrum', 'Multiplexing FDM TDM', 'Error Detection & Correction', 'Channel Coding', 'Turbo Codes', 'CDMA', 'GSM Architecture', 'LTE & 5G', 'Satellite Communication'],
        levels: ['Intermediate', 'Advanced'],
        units: ['Unit 1: Analog Modulation', 'Unit 2: Digital Communication', 'Unit 3: Noise & SNR', 'Unit 4: Multiplexing & Coding', 'Unit 5: Modern Communication Systems']
      },
      'VLSI Design': {
        topics: ['CMOS Technology', 'MOS Transistor', 'Inverter Design', 'NAND NOR Gates CMOS', 'Combinational CMOS', 'Sequential CMOS', 'Stick Diagrams', 'Layout Design Rules', 'SPICE Simulation', 'Static Timing Analysis', 'Clock Distribution', 'Power Dissipation', 'Low Power VLSI', 'SRAM & DRAM Design', 'ROM Design', 'Standard Cell Library', 'ASIC Flow', 'DFT Scan Insertion', 'Physical Design', 'Synthesis & Place Route'],
        levels: ['Advanced'],
        units: ['Unit 1: MOS Fundamentals', 'Unit 2: CMOS Logic Design', 'Unit 3: Layout & Fabrication', 'Unit 4: Digital VLSI', 'Unit 5: ASIC & Physical Design']
      }
    }
  },
  'Mechanical Engineering': {
    icon: '⚙️', color: '#ef4444',
    subjects: {
      'Thermodynamics': { topics: ['Zeroth Law Temperature', 'First Law Energy', 'Second Law Entropy', 'Carnot Cycle', 'Otto Cycle', 'Diesel Cycle', 'Brayton Cycle', 'Rankine Cycle', 'Refrigeration COP', 'Air Conditioning Psychrometry', 'Combustion Analysis', 'Steam Tables', 'Availability & Exergy', 'Nozzles & Diffusers', 'Compressors', 'Gas Turbines', 'IC Engines', 'Boilers', 'Heat Exchangers', 'Cogeneration'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Laws of Thermodynamics', 'Unit 2: Air Standard Cycles', 'Unit 3: Steam & Power', 'Unit 4: Refrigeration', 'Unit 5: Applied Thermo'] },
      'Fluid Mechanics': { topics: ['Fluid Properties', 'Pascal Law', 'Hydrostatics', 'Continuity Equation', 'Bernoulli Equation', 'Venturimeter', 'Flow Measurement', 'Laminar & Turbulent Flow', 'Reynolds Number', 'Boundary Layer', 'Drag & Lift', 'Pipe Flow Losses', 'Pumps & Turbines', 'Compressible Flow', 'Shock Waves', 'Dimensional Analysis', 'Model Testing', 'Hydraulic Machines', 'CFD Basics', 'Open Channel Flow'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Fluid Statics', 'Unit 2: Fluid Kinematics', 'Unit 3: Fluid Dynamics', 'Unit 4: Viscous Flow', 'Unit 5: Turbomachinery'] },
      'Manufacturing Technology': { topics: ['Casting Processes', 'Forging', 'Rolling & Drawing', 'Welding Types', 'Arc Welding', 'MIG & TIG', 'Machining Operations', 'Turning & Milling', 'Drilling & Grinding', 'CNC Programming', 'EDM & ECM', 'Powder Metallurgy', 'Plastic Forming', 'Sheet Metal Work', 'Jigs & Fixtures', 'Metrology & Measurement', 'Quality Control', 'GD&T', 'Lean Manufacturing', 'Industry 4.0'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Casting & Forming', 'Unit 2: Welding', 'Unit 3: Machining', 'Unit 4: Non-Traditional', 'Unit 5: Quality & Metrology'] },
      'Machine Design': { topics: ['Design Philosophy', 'Factor of Safety', 'Static & Fatigue Loading', 'Stress Concentration', 'Theories of Failure', 'Shaft Design', 'Keys & Couplings', 'Bearing Selection', 'Gear Design Spur', 'Helical & Bevel Gears', 'Worm Gears', 'Clutches & Brakes', 'Springs', 'Riveted Joints', 'Welded Joints', 'Bolted Connections', 'Belt Drives', 'Chain Drives', 'Flywheel Design', 'Pressure Vessel Design'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Design Basics', 'Unit 2: Shafts & Couplings', 'Unit 3: Gears', 'Unit 4: Flexible Drives', 'Unit 5: Joints & Pressure Vessels'] },
      'Robotics & Automation': { topics: ['Robot Classification', 'DOF & Workspace', 'Forward Kinematics', 'Inverse Kinematics', 'Jacobian Matrix', 'Trajectory Planning', 'Robot Dynamics', 'DC Motor Control', 'Servo & Stepper Motors', 'Encoders & Sensors', 'PLC Programming', 'SCARA & Delta Robot', 'Mobile Robotics', 'ROS Framework', 'SLAM Navigation', 'Vision Systems', 'Grippers & End Effectors', 'Industrial Automation', 'Collaborative Robots', 'AI in Robotics'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Robot Kinematics', 'Unit 2: Dynamics & Control', 'Unit 3: Actuators & Sensors', 'Unit 4: Programming', 'Unit 5: Industrial Robotics'] }
    }
  },
  'Civil Engineering': {
    icon: '🏗️', color: '#10b981',
    subjects: {
      'Structural Engineering': { topics: ['Types of Structures', 'Loads & Load Combinations', 'Statics & Equilibrium', 'Shear Force Diagrams', 'Bending Moment Diagrams', 'Slope Deflection Method', 'Moment Distribution', 'Stiffness Matrix Method', 'Truss Analysis', 'Frame Analysis', 'Plastic Analysis', 'Reinforced Concrete Design', 'Steel Design', 'Pre-stressed Concrete', 'Flat Slabs', 'Foundation Types', 'Pile Foundations', 'Retaining Walls', 'Bridge Design', 'Earthquake Engineering'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Structural Analysis', 'Unit 2: RCC Design', 'Unit 3: Steel Design', 'Unit 4: Foundations', 'Unit 5: Special Structures'] },
      'Geotechnical Engineering': { topics: ['Soil Classification', 'Index Properties', 'Soil Compaction', 'Permeability Darcys Law', 'Seepage & Flow Nets', 'Effective Stress Principle', 'Consolidation Theory', 'Shear Strength', 'Triaxial Test', 'Direct Shear Test', 'Slope Stability', 'Bearing Capacity', 'Settlement Analysis', 'Pile Capacity', 'Sheet Piles', 'Ground Improvement', 'Geosynthetics', 'Rock Mechanics', 'Tunneling', 'Geotechnical Earthquake'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Soil Properties', 'Unit 2: Seepage & Stress', 'Unit 3: Shear & Consolidation', 'Unit 4: Foundation Design', 'Unit 5: Ground Improvement'] },
      'Transportation Engineering': { topics: ['Highway Alignment', 'Geometric Design', 'Sight Distance', 'Horizontal Curves', 'Vertical Curves', 'Highway Materials', 'Pavement Design Flexible', 'Rigid Pavement', 'Pavement Distress', 'Traffic Engineering', 'Traffic Flow Theory', 'Intersection Design', 'Traffic Signals', 'Highway Capacity', 'Railway Engineering', 'Airport Planning', 'Port & Harbour', 'Urban Transportation', 'Traffic Safety', 'ITS Systems'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Highway Geometry', 'Unit 2: Pavement Design', 'Unit 3: Traffic Engineering', 'Unit 4: Railways & Airports', 'Unit 5: Urban Transport'] },
      'Environmental Engineering': { topics: ['Water Sources', 'Water Demand', 'Water Treatment', 'Coagulation Flocculation', 'Filtration & Chlorination', 'Water Distribution', 'Sewage Characteristics', 'Sewage Treatment Primary', 'Secondary Treatment', 'Activated Sludge', 'Trickling Filter', 'Sludge Disposal', 'Solid Waste Management', 'Composting & Landfill', 'Air Pollution Control', 'Noise Pollution', 'EIA Process', 'Water Quality Standards', 'Industrial Wastewater', 'Sustainable Engineering'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Water Supply', 'Unit 2: Water Treatment', 'Unit 3: Sewage Treatment', 'Unit 4: Solid Waste', 'Unit 5: Pollution Control'] },
      'Hydrology & Water Resources': { topics: ['Hydrological Cycle', 'Precipitation Measurement', 'Infiltration', 'Evapotranspiration', 'Runoff Estimation', 'Unit Hydrograph', 'Flood Estimation', 'Stream Flow Measurement', 'Reservoir Design', 'Dam Types', 'Spillways', 'Irrigation Methods', 'Canal Design', 'Groundwater Exploration', 'Well Hydraulics', 'Aquifer Properties', 'Watershed Management', 'River Training', 'Drought Management', 'Rain Water Harvesting'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Hydrology Basics', 'Unit 2: Runoff & Floods', 'Unit 3: Reservoirs & Dams', 'Unit 4: Irrigation', 'Unit 5: Groundwater'] }
    }
  },
  'Electrical Engineering': {
    icon: '🔌', color: '#8b5cf6',
    subjects: {
      'Power Systems': { topics: ['Power System Structure', 'Transmission Lines', 'Line Parameters', 'ABCD Parameters', 'Power Flow', 'Bus Admittance Matrix', 'Gauss Seidel', 'Newton Raphson', 'Fault Analysis', 'Symmetrical Components', 'Zero Positive Negative Sequence', 'Circuit Breakers', 'Relays & Protection', 'Distance Relay', 'Differential Relay', 'Power System Stability', 'Swing Equation', 'Equal Area Criterion', 'FACTS Devices', 'HVDC Transmission'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Transmission Lines', 'Unit 2: Power Flow', 'Unit 3: Fault Analysis', 'Unit 4: Protection', 'Unit 5: Stability & FACTS'] },
      'Electrical Machines': { topics: ['DC Generator', 'DC Motor', 'Motor Starters', 'Speed Control DC', 'Single Phase Transformer', 'Three Phase Transformer', 'Transformer Testing', 'Induction Motor Principle', 'Slip & Torque', 'Speed Control IM', 'Synchronous Generator', 'Synchronous Motor', 'Reluctance Motor', 'Stepper Motor', 'Permanent Magnet Motors', 'BLDC Motor', 'Universal Motor', 'Special Machines', 'Motor Selection', 'Energy Efficient Motors'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: DC Machines', 'Unit 2: Transformers', 'Unit 3: Induction Machines', 'Unit 4: Synchronous Machines', 'Unit 5: Special Machines'] },
      'Power Electronics': { topics: ['Diode Rectifiers', 'SCR Operation', 'SCR Triggering', 'Phase Controlled Rectifiers', 'DC Choppers', 'Buck Converter', 'Boost Converter', 'Buck-Boost Converter', 'Flyback Converter', 'Inverters', 'PWM Techniques', 'SPWM', 'Space Vector PWM', 'UPS Systems', 'Battery Chargers', 'Solar Inverters', 'Motor Drives VFD', 'FACTS Converters', 'Switch Mode Power Supply', 'EMI & Filtering'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Power Devices', 'Unit 2: Converters AC-DC', 'Unit 3: DC-DC Converters', 'Unit 4: Inverters', 'Unit 5: Applications'] },
      'Control Systems': { topics: ['Open & Closed Loop', 'Transfer Function', 'Block Diagram Reduction', 'Signal Flow Graph', 'Time Domain Analysis', 'Transient Response', 'Steady State Error', 'Routh Hurwitz', 'Root Locus', 'Frequency Domain', 'Bode Plot', 'Nyquist Plot', 'PID Controller', 'Lead Lag Compensator', 'State Space', 'Controllability & Observability', 'State Feedback', 'Observers', 'Discrete Control', 'Robust Control'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Mathematical Modeling', 'Unit 2: Time Domain Analysis', 'Unit 3: Frequency Domain', 'Unit 4: Controllers', 'Unit 5: Modern Control'] },
      'Renewable Energy': { topics: ['Solar Cell Principles', 'PV Panel Characteristics', 'MPPT Algorithms', 'Solar System Design', 'Wind Turbine Types', 'Wind Power Equation', 'Doubly Fed Induction Generator', 'Offshore Wind', 'Hydropower Micro-Hydro', 'Tidal & Wave Energy', 'Biomass Energy', 'Geothermal Energy', 'Fuel Cells', 'Hydrogen Energy', 'Battery Storage Li-Ion', 'Grid Integration Renewables', 'Smart Grid Concepts', 'Energy Management Systems', 'Carbon Footprint', 'Green Buildings'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Solar Energy', 'Unit 2: Wind Energy', 'Unit 3: Other Renewables', 'Unit 4: Storage Systems', 'Unit 5: Grid Integration'] }
    }
  },
  'Physics': {
    icon: '🔭', color: '#06b6d4',
    subjects: {
      'Classical Mechanics': { topics: ['Newtons Laws', 'Kinematics', 'Projectile Motion', 'Circular Motion', 'Work Energy Power', 'Conservation Laws', 'Momentum & Impulse', 'Rotational Motion', 'Torque & Angular Momentum', 'Simple Harmonic Motion', 'Damped Oscillation', 'Wave Motion', 'Sound Waves', 'Doppler Effect', 'Fluid Statics', 'Fluid Dynamics', 'Gravitation', 'Keplers Laws', 'Satellites', 'Elasticity'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Kinematics', 'Unit 2: Dynamics', 'Unit 3: Energy & Momentum', 'Unit 4: Rotation & Oscillation', 'Unit 5: Fluids & Gravitation'] },
      'Electromagnetism': { topics: ['Coulombs Law', 'Electric Field', 'Gauss Law', 'Electric Potential', 'Capacitors', 'Dielectrics', 'Current & Resistance', 'Ohms Law', 'Kirchhoff Laws', 'Magnetic Field', 'Biot Savart Law', 'Amperes Law', 'Faradays Law', 'Lenz Law', 'Inductance', 'AC Circuits', 'LCR Circuits', 'Electromagnetic Waves', 'Maxwells Equations', 'Poynting Vector'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Electrostatics', 'Unit 2: Current Electricity', 'Unit 3: Magnetism', 'Unit 4: Electromagnetic Induction', 'Unit 5: Electromagnetic Waves'] },
      'Quantum Mechanics': { topics: ['Wave-Particle Duality', 'Photoelectric Effect', 'Compton Effect', 'de Broglie Wavelength', 'Heisenberg Uncertainty', 'Schrodinger Equation', 'Wave Function', 'Particle in Box', 'Harmonic Oscillator QM', 'Hydrogen Atom', 'Spin & Pauli Exclusion', 'Perturbation Theory', 'Variational Method', 'WKB Approximation', 'Angular Momentum', 'Selection Rules', 'Quantum Entanglement', 'Bell Inequalities', 'Quantum Computing Basics', 'Quantum Optics'], levels: ['Advanced'], units: ['Unit 1: Wave-Particle Duality', 'Unit 2: Schrodinger Equation', 'Unit 3: Quantum Systems', 'Unit 4: Approximation Methods', 'Unit 5: Modern Quantum'] },
      'Thermodynamics Physics': { topics: ['Temperature & Heat', 'Thermal Expansion', 'Specific Heat', 'Calorimetry', 'Ideal Gas Law', 'Kinetic Theory', 'First Law of Thermo', 'Second Law Entropy', 'Carnot Theorem', 'Heat Engines', 'Refrigerators', 'Phase Transitions', 'Clausius Clapeyron', 'Statistical Mechanics', 'Maxwell Distribution', 'Partition Function', 'Blackbody Radiation', 'Stefan Boltzmann', 'Wiens Law', 'Bose Einstein Statistics'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Thermal Properties', 'Unit 2: Gas Laws', 'Unit 3: Laws of Thermodynamics', 'Unit 4: Statistical Mechanics', 'Unit 5: Radiation'] },
      'Optics': { topics: ['Reflection & Refraction', 'Snells Law', 'Total Internal Reflection', 'Mirrors & Lenses', 'Prisms & Dispersion', 'Interference Young Experiment', 'Diffraction Grating', 'Polarization', 'Brewsters Angle', 'Optical Instruments Microscope', 'Telescope', 'Fiber Optics', 'Laser Principles', 'Holography', 'Non-Linear Optics', 'Photonics', 'Spectroscopy', 'Raman Effect', 'Fourier Optics', 'Adaptive Optics'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Geometric Optics', 'Unit 2: Wave Optics', 'Unit 3: Polarization', 'Unit 4: Modern Optics', 'Unit 5: Applied Optics'] }
    }
  },
  'Chemistry': {
    icon: '🧪', color: '#84cc16',
    subjects: {
      'Organic Chemistry': { topics: ['IUPAC Nomenclature', 'Isomerism', 'Hydrocarbons Alkanes', 'Alkenes & Alkynes', 'Aromatic Compounds', 'Benzene & Derivatives', 'Substitution Reactions SN1 SN2', 'Elimination E1 E2', 'Addition Reactions', 'Oxidation & Reduction', 'Carboxylic Acids', 'Esters & Amides', 'Carbonyl Chemistry', 'Grignard Reagent', 'Organometallic', 'Stereochemistry', 'Chirality', 'Reactions Mechanisms', 'Natural Products', 'Drug Synthesis'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Fundamentals', 'Unit 2: Hydrocarbons', 'Unit 3: Functional Groups', 'Unit 4: Reactions & Mechanisms', 'Unit 5: Special Topics'] },
      'Physical Chemistry': { topics: ['States of Matter', 'Gas Laws', 'Kinetic Theory Gases', 'Real Gases van der Waals', 'Solutions Colligative Properties', 'Thermodynamics Chemical', 'Gibbs Free Energy', 'Electrochemistry', 'Galvanic Cells', 'Nernst Equation', 'Electrolysis', 'Chemical Kinetics', 'Rate Laws', 'Activation Energy', 'Catalysis', 'Photochemistry', 'Surface Chemistry', 'Adsorption', 'Colloids', 'Nuclear Chemistry'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: States & Solutions', 'Unit 2: Thermodynamics', 'Unit 3: Electrochemistry', 'Unit 4: Kinetics', 'Unit 5: Surface & Nuclear'] },
      'Inorganic Chemistry': { topics: ['Periodic Table Trends', 'Atomic Structure', 'Chemical Bonding', 'Ionic & Covalent Bonds', 'Hybridization', 'VSEPR Theory', 'Molecular Orbital Theory', 's Block Elements', 'p Block Elements', 'd Block Transition Metals', 'Coordination Chemistry', 'Crystal Field Theory', 'Lanthanides & Actinides', 'Bioinorganic Chemistry', 'Industrial Inorganic', 'Inorganic Polymers', 'Main Group Chemistry', 'Organometallic Inorganic', 'Solid State Chemistry', 'Nanomaterials'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Atomic Structure', 'Unit 2: Bonding', 'Unit 3: Periodic Properties', 'Unit 4: Coordination Chemistry', 'Unit 5: Applied Inorganic'] }
    }
  },
  'Biology': {
    icon: '🧬', color: '#22c55e',
    subjects: {
      'Cell Biology': { topics: ['Cell Theory', 'Prokaryotic vs Eukaryotic', 'Cell Membrane Structure', 'Membrane Transport', 'Organelles & Functions', 'Nucleus & DNA', 'Mitochondria', 'Chloroplasts', 'Endoplasmic Reticulum', 'Golgi Apparatus', 'Lysosomes & Vacuoles', 'Cell Division Mitosis', 'Meiosis', 'Cell Cycle Regulation', 'Cancer & Oncogenes', 'Stem Cells', 'Cell Signaling', 'Signal Transduction', 'Apoptosis', 'Cellular Respiration'], levels: ['Beginner', 'Intermediate'], units: ['Unit 1: Cell Structure', 'Unit 2: Membrane & Transport', 'Unit 3: Organelles', 'Unit 4: Cell Division', 'Unit 5: Cell Signaling'] },
      'Genetics': { topics: ['Mendels Laws', 'Monohybrid Cross', 'Dihybrid Cross', 'Linkage & Crossing Over', 'Sex Determination', 'Mutations Types', 'DNA Structure Watson Crick', 'DNA Replication', 'Transcription mRNA', 'Translation Ribosomes', 'Genetic Code', 'Operon Model', 'Gene Regulation', 'Recombinant DNA', 'PCR Technique', 'DNA Fingerprinting', 'Genomics', 'Proteomics', 'Epigenetics', 'CRISPR Cas9'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Mendelian Genetics', 'Unit 2: Molecular Genetics', 'Unit 3: Gene Expression', 'Unit 4: Recombinant DNA', 'Unit 5: Genomics'] },
      'Microbiology': { topics: ['Bacteria Classification', 'Gram Staining', 'Bacterial Growth Curve', 'Sterilization Methods', 'Viruses Structure', 'Viral Replication', 'Bacteriophages', 'Fungi Classification', 'Protozoa', 'Algae Types', 'Antibiotics Mechanism', 'Antibiotic Resistance', 'Immunology Innate', 'Adaptive Immunity', 'Antibodies', 'Vaccines', 'Diagnostic Microbiology', 'Clinical Microbiology', 'Food Microbiology', 'Environmental Microbiology'], levels: ['Beginner', 'Intermediate'], units: ['Unit 1: Bacteria', 'Unit 2: Viruses & Fungi', 'Unit 3: Antimicrobials', 'Unit 4: Immunology', 'Unit 5: Applied Microbiology'] },
      'Biotechnology': { topics: ['Recombinant DNA Technology', 'Restriction Enzymes', 'Cloning Vectors', 'Transformation Methods', 'Expression Systems', 'Protein Engineering', 'Enzyme Engineering', 'Fermentation Technology', 'Bioreactor Design', 'Downstream Processing', 'Monoclonal Antibodies', 'ELISA', 'Western Blot', 'Flow Cytometry', 'Stem Cell Technology', 'Tissue Engineering', 'Gene Therapy', 'Bioinformatics', 'Biosensors', 'Biopharma Industry'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Recombinant DNA', 'Unit 2: Cloning & Expression', 'Unit 3: Bioprocess Technology', 'Unit 4: Analytical Techniques', 'Unit 5: Applied Biotech'] }
    }
  },
  'Mathematics': {
    icon: '📐', color: '#f97316',
    subjects: {
      'Calculus': { topics: ['Limits & Continuity', 'Differentiation Rules', 'Chain Rule', 'Implicit Differentiation', 'Applications of Derivatives', 'Maxima & Minima', 'Integration Basics', 'Integration by Parts', 'Trigonometric Integration', 'Partial Fractions', 'Improper Integrals', 'Double Integrals', 'Triple Integrals', 'Line Integrals', 'Surface Integrals', 'Greens Theorem', 'Stokes Theorem', 'Divergence Theorem', 'Taylor Series', 'Fourier Series'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Differential Calculus', 'Unit 2: Integral Calculus', 'Unit 3: Multivariable Calculus', 'Unit 4: Vector Calculus', 'Unit 5: Series Expansions'] },
      'Linear Algebra': { topics: ['Matrices & Determinants', 'Cramer Rule', 'Gauss Elimination', 'LU Decomposition', 'Vector Spaces', 'Linear Independence', 'Basis & Dimension', 'Linear Transformations', 'Eigenvalues & Eigenvectors', 'Diagonalization', 'Inner Product Spaces', 'Gram-Schmidt', 'QR Decomposition', 'SVD', 'Matrix Norms', 'Positive Definite Matrices', 'Spectral Theorem', 'Applications in ML', 'Graph Theory Linear Algebra', 'Numerical Linear Algebra'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Matrices', 'Unit 2: Vector Spaces', 'Unit 3: Linear Maps', 'Unit 4: Eigenvalues', 'Unit 5: Applications'] },
      'Probability & Statistics': { topics: ['Sample Space & Events', 'Probability Axioms', 'Conditional Probability', 'Bayes Theorem', 'Discrete Distributions', 'Binomial Distribution', 'Poisson Distribution', 'Continuous Distributions', 'Normal Distribution', 'Exponential Distribution', 'Joint Distributions', 'Expectation & Variance', 'Covariance & Correlation', 'Central Limit Theorem', 'Statistical Inference', 'Hypothesis Testing', 't-test & F-test', 'ANOVA', 'Regression Analysis', 'Bayesian Statistics'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Probability Basics', 'Unit 2: Random Variables', 'Unit 3: Distributions', 'Unit 4: Statistical Inference', 'Unit 5: Applied Statistics'] },
      'Differential Equations': { topics: ['First Order ODE', 'Separable Equations', 'Exact Equations', 'Integrating Factor', 'Linear First Order', 'Second Order ODE', 'Constant Coefficients', 'Undetermined Coefficients', 'Variation of Parameters', 'Power Series Solutions', 'Laplace Transform ODE', 'Systems of ODEs', 'Phase Plane Analysis', 'Stability Analysis', 'Partial Differential Equations', 'Heat Equation', 'Wave Equation', 'Laplace Equation', 'Numerical Methods ODE', 'Finite Element Method'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: First Order ODEs', 'Unit 2: Second Order ODEs', 'Unit 3: Laplace Transform', 'Unit 4: Systems & Stability', 'Unit 5: PDEs'] }
    }
  },
  'History': {
    icon: '📜', color: '#92400e',
    subjects: {
      'Ancient Indian History': { topics: ['Indus Valley Civilization', 'Harappa & Mohenjo Daro', 'Vedic Age', 'Rig Veda', 'Mahajanapadas', 'Rise of Magadha', 'Mauryan Empire', 'Ashoka & Dhamma', 'Post Mauryan Period', 'Kushana Empire', 'Gupta Golden Age', 'Sangam Literature', 'South Indian Kingdoms', 'Pallava Dynasty', 'Chalukyas', 'Social Structure Caste', 'Religious Movements Buddhism', 'Jainism Origins', 'Economic History Ancient', 'Art & Architecture Ancient'], levels: ['Beginner', 'Intermediate'], units: ['Unit 1: Prehistoric India', 'Unit 2: Vedic Period', 'Unit 3: Mahajanapadas', 'Unit 4: Mauryas & Guptas', 'Unit 5: Regional Kingdoms'] },
      'Medieval Indian History': { topics: ['Rajput Kingdoms', 'Delhi Sultanate', 'Qutbuddin Aibak', 'Iltutmish', 'Alauddin Khalji', 'Tughlaq Dynasty', 'Vijayanagara Empire', 'Bahmani Kingdom', 'Mughal Empire Foundation', 'Akbars Administration', 'Din I Ilahi', 'Mughal Art & Culture', 'Aurangzeb Policy', 'Maratha Rise Shivaji', 'Maratha Confederacy', 'Sikh Gurus', 'Sikhism Foundations', 'Bhakti Movement', 'Sufi Movement', 'Decline Mughal'], levels: ['Beginner', 'Intermediate'], units: ['Unit 1: Rajputs & Sultanate', 'Unit 2: Mughal Empire', 'Unit 3: Regional Powers', 'Unit 4: Religious Movements', 'Unit 5: Decline & Transition'] },
      'Modern Indian History': { topics: ['European Arrival India', 'British East India Company', 'Battle of Plassey', 'British Administrative Policies', 'Permanent Settlement', 'Ryotwari System', 'Social Reform Ram Mohan Roy', '1857 Revolt Causes', '1857 Consequences', 'Indian National Congress', 'Moderates & Extremists', 'Swadeshi Movement', 'Partition Bengal 1905', 'Morley Minto Reforms', 'Non Cooperation Movement', 'Civil Disobedience', 'Quit India 1942', 'Indian Independence Act', 'Partition 1947', 'Constitution Making'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: European Entry', 'Unit 2: British Policies', 'Unit 3: Social Reforms', 'Unit 4: National Movement', 'Unit 5: Independence'] }
    }
  },
  'English Literature': {
    icon: '📚', color: '#db2777',
    subjects: {
      'British Literature': { topics: ['Old English Beowulf', 'Chaucer Canterbury Tales', 'Renaissance Shakespeare', 'Elizabethan Drama', 'Metaphysical Poetry', 'John Milton Paradise Lost', 'Restoration Comedy', 'Augustan Period', 'Samuel Johnson', 'Romantic Age Wordsworth', 'Keats & Shelley', 'Byron & Coleridge', 'Victorian Novel Dickens', 'George Eliot Middlemarch', 'Hardy & the Rural', 'Oscar Wilde', 'George Bernard Shaw', 'Modern Literature Woolf', 'T.S. Eliot Wasteland', 'Post Modern British'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Medieval & Renaissance', 'Unit 2: 17th & 18th Century', 'Unit 3: Romantic Period', 'Unit 4: Victorian Literature', 'Unit 5: Modern & Contemporary'] },
      'American Literature': { topics: ['Puritanism & Early America', 'Hawthorne Scarlet Letter', 'Emerson Transcendentalism', 'Thoreau Walden', 'Whitman Leaves of Grass', 'Mark Twain Huck Finn', 'Realism & Naturalism', 'Henry James', 'Edith Wharton', 'Harlem Renaissance', 'Langston Hughes', 'Hemingway Lost Generation', 'Fitzgerald Great Gatsby', 'Faulkner Sound Fury', 'Southern Gothic', 'Post WWII Literature', 'Salinger Catcher Rye', 'Beat Generation Kerouac', 'Sylvia Plath Confessional', 'Contemporary American'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Colonial to 19th Century', 'Unit 2: Realism & Naturalism', 'Unit 3: Modernism', 'Unit 4: Mid 20th Century', 'Unit 5: Contemporary'] }
    }
  },
  'Political Science': {
    icon: '🏛️', color: '#1d4ed8',
    subjects: {
      'Indian Polity': { topics: ['Constitutional History', 'Constituent Assembly', 'Preamble Significance', 'Fundamental Rights Part III', 'Fundamental Duties', 'DPSP Part IV', 'Parliament Structure', 'Lok Sabha & Rajya Sabha', 'Legislative Process', 'President Powers', 'Prime Minister Council', 'Supreme Court', 'Judicial Review', 'High Courts', 'Federal Structure', 'Centre-State Relations', 'Emergency Provisions', 'Constitutional Amendments', 'Local Self Government', 'Electoral System'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Constitution Making', 'Unit 2: Fundamental Rights', 'Unit 3: Parliament & Executive', 'Unit 4: Judiciary', 'Unit 5: Federal Structure'] },
      'International Relations': { topics: ['Theories of IR Realism', 'Liberalism in IR', 'Constructivism', 'India Foreign Policy', 'Non Alignment Movement', 'SAARC & Regional Bodies', 'United Nations System', 'Security Council', 'WTO & Trade', 'IMF & World Bank', 'Nuclear Non-Proliferation', 'Climate Diplomacy', 'India US Relations', 'India China Relations', 'India Pakistan Relations', 'Russia India Relations', 'ASEAN', 'G20 & G7', 'Geopolitics', 'Soft Power'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: IR Theories', 'Unit 2: Indian Foreign Policy', 'Unit 3: International Organizations', 'Unit 4: Bilateral Relations', 'Unit 5: Contemporary Issues'] }
    }
  },
  'Commerce & Accounting': {
    icon: '📊', color: '#0369a1',
    subjects: {
      'Financial Accounting': { topics: ['Journal Entries', 'Ledger Accounts', 'Trial Balance', 'Trading Account', 'Profit & Loss Account', 'Balance Sheet', 'Bank Reconciliation Statement', 'Depreciation Straight Line', 'Written Down Value', 'Depreciation Company Act', 'Inventory FIFO LIFO', 'Consignment Accounts', 'Joint Venture', 'Bills of Exchange', 'Partnership Accounts', 'Company Final Accounts', 'Amalgamation', 'Absorption', 'Reconstruction', 'Indian Accounting Standards Ind AS'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Basic Accounting', 'Unit 2: Final Accounts', 'Unit 3: Special Accounts', 'Unit 4: Company Accounts', 'Unit 5: Advanced Accounting'] },
      'Cost & Management Accounting': { topics: ['Cost Classification', 'Cost Sheet Preparation', 'Material Cost Control', 'Labour Cost Methods', 'Overhead Absorption', 'Marginal Costing', 'Breakeven Analysis', 'Budgetary Control', 'Flexible Budget', 'Standard Costing', 'Variance Analysis Material', 'Variance Analysis Labour', 'Activity Based Costing ABC', 'Transfer Pricing', 'Responsibility Accounting', 'Divisional Performance', 'Working Capital Management', 'Capital Budgeting NPV', 'IRR', 'Payback Period'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Cost Concepts', 'Unit 2: Cost Methods', 'Unit 3: Marginal & Budgetary', 'Unit 4: Standard Costing', 'Unit 5: Management Decisions'] },
      'Taxation': { topics: ['Income Tax History', 'Basis of Charge', 'Assessment Year', 'Previous Year', 'Residential Status', 'Income from Salary', 'Income from House Property', 'Income from Business', 'Income from Capital Gains', 'Income from Other Sources', 'Deductions 80C', 'Deductions 80D', 'Set Off & Carry Forward', 'TDS Provisions', 'Advance Tax', 'GST Overview', 'CGST SGST IGST', 'GST Registration', 'GST Returns Filing', 'Corporate Tax'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Income Tax Basics', 'Unit 2: Heads of Income', 'Unit 3: Deductions', 'Unit 4: TDS & Advance Tax', 'Unit 5: GST'] }
    }
  },
  'Finance & Economics': {
    icon: '💰', color: '#b45309',
    subjects: {
      'Corporate Finance': { topics: ['Time Value of Money', 'NPV & IRR', 'Payback Period', 'Profitability Index', 'Capital Budgeting', 'Capital Structure Theories', 'Modigliani Miller', 'Dividend Policy', 'Walter Model', 'Gordon Model', 'Cost of Capital WACC', 'Leverage Operating', 'Financial Leverage', 'EPS EBIT Analysis', 'Mergers & Acquisitions', 'Corporate Governance', 'Corporate Valuation DCF', 'EVA Economic Value Added', 'Working Capital Cycle', 'Cash Management'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Investment Decisions', 'Unit 2: Financing Decisions', 'Unit 3: Dividend Decisions', 'Unit 4: Corporate Valuation', 'Unit 5: Advanced Corporate Finance'] },
      'Macroeconomics': { topics: ['National Income GDP GNP', 'NNP & NDP', 'Consumption Function', 'Savings Function', 'Investment & Multiplier', 'Keynesian Theory', 'IS-LM Model', 'Aggregate Demand Supply', 'Inflation Types', 'Phillips Curve', 'Unemployment Types', 'Fiscal Policy', 'Monetary Policy', 'RBI Functions', 'Banking System', 'Money Supply M1 M2 M3', 'Balance of Payments', 'Foreign Exchange', 'IMF & World Bank', 'Indian Economy Overview'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: National Income', 'Unit 2: Consumption & Investment', 'Unit 3: Macro Policies', 'Unit 4: Money & Banking', 'Unit 5: International Economics'] },
      'Microeconomics': { topics: ['Demand & Supply', 'Elasticity Concepts', 'Consumer Theory', 'Utility Analysis', 'Indifference Curve', 'Budget Line', 'Production Theory', 'Production Functions', 'Returns to Scale', 'Cost Analysis Short Run', 'Long Run Cost', 'Market Structures', 'Perfect Competition', 'Monopoly & Monopolistic', 'Oligopoly', 'Game Theory Nash Equilibrium', 'Factor Markets Labour', 'Capital & Rent', 'Market Failure', 'Public Goods Externalities'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Market Basics', 'Unit 2: Consumer Theory', 'Unit 3: Production & Cost', 'Unit 4: Market Structures', 'Unit 5: Market Failure'] }
    }
  },
  'Management': {
    icon: '🎯', color: '#7c3aed',
    subjects: {
      'Human Resource Management': { topics: ['HRM Introduction', 'Job Analysis & Design', 'Recruitment & Selection', 'Interview Techniques', 'Induction & Onboarding', 'Training & Development', 'Performance Appraisal', '360 Degree Feedback', 'Compensation & Benefits', 'Job Evaluation', 'Employee Relations', 'Industrial Relations', 'Trade Unions', 'Grievance Handling', 'Collective Bargaining', 'HR Planning', 'Succession Planning', 'Talent Management', 'HR Analytics', 'Strategic HRM'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: HRM Basics', 'Unit 2: Recruitment & Selection', 'Unit 3: Training & Performance', 'Unit 4: Compensation', 'Unit 5: Strategic HRM'] },
      'Marketing Management': { topics: ['Marketing Concepts', 'Market Research', 'Consumer Behavior', 'Segmentation Targeting Positioning', 'Product Life Cycle', 'Branding & Brand Equity', 'Pricing Strategies', 'Distribution Channels', 'Promotion Mix', 'Advertising Strategies', 'Sales Management', 'Digital Marketing', 'SEO & SEM', 'Social Media Marketing', 'Content Marketing', 'Email Marketing', 'Customer Relationship CRM', 'B2B Marketing', 'International Marketing', 'Marketing Metrics'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Marketing Fundamentals', 'Unit 2: STP & Product', 'Unit 3: Pricing & Distribution', 'Unit 4: Promotion', 'Unit 5: Digital & Strategic Marketing'] },
      'Operations Management': { topics: ['Operations Strategy', 'Forecasting Methods', 'Moving Average', 'Exponential Smoothing', 'Aggregate Planning', 'Master Production Schedule', 'Material Requirements MRP', 'ERP Systems', 'Inventory Management EOQ', 'JIT & Lean Manufacturing', 'Total Quality Management TQM', 'Six Sigma DMAIC', 'ISO Standards', 'Process Flow Analysis', 'Capacity Planning', 'Facility Location', 'Layout Planning', 'Supply Chain Management', 'Logistics & Transportation', 'Project Management PERT CPM'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Operations Strategy', 'Unit 2: Planning & Scheduling', 'Unit 3: Inventory Management', 'Unit 4: Quality Management', 'Unit 5: Supply Chain'] },
      'Strategic Management': { topics: ['Strategic Planning Process', 'Vision Mission Goals', 'Environmental Scanning PEST', 'Industry Analysis Porters Five Forces', 'Competitive Advantage', 'Value Chain Analysis', 'SWOT Analysis', 'BCG Matrix', 'GE McKinsey Matrix', 'Ansoff Matrix', 'Generic Strategies Porter', 'Differentiation & Cost Leadership', 'Focus Strategy', 'Corporate Strategy', 'Diversification', 'Merger & Acquisition Strategy', 'Joint Ventures', 'Alliances', 'Strategy Implementation', 'Balanced Scorecard'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Strategic Analysis', 'Unit 2: Strategy Formulation', 'Unit 3: Strategic Options', 'Unit 4: Corporate Strategy', 'Unit 5: Implementation'] }
    }
  },
  'Medical & Healthcare': {
    icon: '🏥', color: '#dc2626',
    subjects: {
      'Anatomy': { topics: ['Skeletal System Bones', 'Joints & Articulations', 'Muscular System Types', 'Upper Limb Muscles', 'Lower Limb Muscles', 'Cardiovascular System Heart', 'Arteries & Veins', 'Lymphatic System', 'Respiratory System Lungs', 'Digestive System GI Tract', 'Liver & Pancreas', 'Urinary System Kidneys', 'Male Reproductive Anatomy', 'Female Reproductive Anatomy', 'Nervous System CNS', 'Brain Anatomy Lobes', 'Spinal Cord', 'Cranial Nerves', 'Endocrine Glands', 'Special Sense Organs Eye Ear'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Musculoskeletal', 'Unit 2: Cardiovascular', 'Unit 3: Respiratory & Digestive', 'Unit 4: Nervous System', 'Unit 5: Endocrine & Reproductive'] },
      'Physiology': { topics: ['Cell Physiology', 'Resting Membrane Potential', 'Action Potential', 'Nerve Conduction', 'Synaptic Transmission', 'Muscle Contraction Mechanism', 'Cardiac Cycle', 'Cardiac Output', 'Blood Pressure Regulation', 'Respiratory Mechanics', 'Lung Volumes', 'Gas Exchange', 'Kidney Function Nephron', 'Glomerular Filtration GFR', 'Renal Tubular Reabsorption', 'Hormones Endocrine', 'Hypothalamus Pituitary Axis', 'Digestion & Absorption', 'Blood & Hematopoiesis', 'Homeostasis Mechanisms'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Cellular Physiology', 'Unit 2: Cardiovascular Physiology', 'Unit 3: Respiratory Physiology', 'Unit 4: Renal Physiology', 'Unit 5: Endocrine Physiology'] },
      'Pharmacology': { topics: ['Pharmacokinetics ADME', 'Absorption Routes', 'Drug Distribution', 'Metabolism CYP450', 'Excretion Renal', 'Pharmacodynamics', 'Dose Response Curve', 'Drug Receptors', 'Autonomic Drugs', 'Adrenergic Agents', 'Cholinergic Drugs', 'Cardiovascular Drugs Antihypertensives', 'Antiarrhythmics', 'Diuretics', 'Antibiotics Beta Lactams', 'Macrolides & Quinolones', 'Antifungals & Antivirals', 'CNS Drugs Sedatives', 'Analgesics & NSAIDs', 'Chemotherapy Anticancer'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Pharmacokinetics', 'Unit 2: Pharmacodynamics', 'Unit 3: Autonomic Pharmacology', 'Unit 4: Systemic Pharmacology', 'Unit 5: Chemotherapy'] },
      'Pathology': { topics: ['Cell Injury & Necrosis', 'Apoptosis Mechanisms', 'Inflammation Acute', 'Chronic Inflammation', 'Granuloma Formation', 'Wound Healing', 'Edema Pathogenesis', 'Thrombosis & Embolism', 'Infarction Types', 'Shock Types & Treatment', 'Neoplasia Tumor Classification', 'Carcinogenesis', 'Metastasis Mechanisms', 'Immune Pathology Hypersensitivity', 'Autoimmune Diseases', 'Immunodeficiency HIV', 'Hematological Disorders Anemia', 'Leukemia & Lymphoma', 'Respiratory Pathology', 'Cardiovascular Pathology'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Cell Injury', 'Unit 2: Inflammation', 'Unit 3: Hemodynamics', 'Unit 4: Neoplasia', 'Unit 5: Systemic Pathology'] },
      'Clinical Medicine': { topics: ['History Taking HOPI', 'Physical Examination', 'Vital Signs Assessment', 'Cardiovascular Examination', 'Respiratory Examination', 'Abdominal Examination', 'Neurological Examination', 'ECG Interpretation', 'Chest X-Ray Reading', 'Lab Values Interpretation', 'Hypertension Management', 'Diabetes Mellitus Type 2', 'COPD Management', 'Asthma Guidelines', 'Pneumonia Treatment', 'Acute MI Management', 'Heart Failure Treatment', 'Stroke Management', 'Renal Failure CKD', 'Medical Ethics & Law'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Clinical Examination', 'Unit 2: Investigations', 'Unit 3: Common Diseases', 'Unit 4: Emergency Medicine', 'Unit 5: Medical Ethics'] }
    }
  },
  'Law': {
    icon: '⚖️', color: '#475569',
    subjects: {
      'Constitutional Law': { topics: ['Constitutional Supremacy', 'Doctrine of Basic Structure', 'Fundamental Rights Enforcement', 'Writ Jurisdiction Habeas Corpus', 'Mandamus & Certiorari', 'Prohibition & Quo Warranto', 'Right to Equality Art 14', 'Right to Life Art 21', 'Freedom of Speech Art 19', 'Right against Exploitation', 'Freedom of Religion', 'Cultural & Educational Rights', 'Constitutional Remedies', 'Constitutional Amendments Procedure', 'Parliamentary Sovereignty', 'Separation of Powers', 'Judicial Activism', 'PIL Public Interest Litigation', 'Contempt of Court', 'Federal Supremacy'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Constitutional Basics', 'Unit 2: Fundamental Rights', 'Unit 3: Writs', 'Unit 4: Constitutional Bodies', 'Unit 5: Advanced Constitutional'] },
      'Criminal Law': { topics: ['IPC Introduction', 'Actus Reus & Mens Rea', 'Offences against Body', 'Offences against Property', 'Theft & Robbery', 'Cheating & Fraud', 'Murder & Culpable Homicide', 'Grievous Hurt', 'Kidnapping & Abduction', 'Sexual Offences', 'POCSO Act', 'CrPC Criminal Procedure', 'FIR Registration', 'Investigation', 'Bail Provisions', 'Trial Procedure', 'Cognizable Non-Cognizable', 'Evidence Act Overview', 'Witness Examination', 'Sentencing Guidelines'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: IPC Basics', 'Unit 2: Offences', 'Unit 3: Criminal Procedure CrPC', 'Unit 4: Evidence', 'Unit 5: Special Laws'] },
      'Contract Law': { topics: ['Definition of Contract', 'Essential Elements', 'Offer & Acceptance', 'Consideration', 'Capacity to Contract', 'Free Consent', 'Coercion & Undue Influence', 'Fraud & Misrepresentation', 'Mistake Types', 'Void & Voidable Contracts', 'Contingent Contracts', 'Quasi Contracts', 'Performance of Contract', 'Breach of Contract', 'Remedies for Breach', 'Specific Performance', 'Anticipatory Breach', 'Indemnity & Guarantee', 'Bailment & Pledge', 'Agency Contracts'], levels: ['Beginner', 'Intermediate'], units: ['Unit 1: Formation of Contract', 'Unit 2: Validity', 'Unit 3: Performance & Discharge', 'Unit 4: Breach & Remedies', 'Unit 5: Special Contracts'] },
      'Corporate Law': { topics: ['Company Definition Types', 'Memorandum of Association', 'Articles of Association', 'Incorporation Process', 'Share Capital', 'Types of Shares', 'Debentures & Bonds', 'Board of Directors', 'Directors Duties', 'Shareholders Rights', 'Company Meetings', 'Annual General Meeting', 'Special Resolutions', 'Audit & Accounts', 'Corporate Governance', 'SEBI Regulations', 'Listing Requirements', 'Takeover Code', 'Insolvency IBC Code', 'Corporate Social Responsibility CSR'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Company Formation', 'Unit 2: Capital & Securities', 'Unit 3: Management', 'Unit 4: Corporate Governance', 'Unit 5: Insolvency & Winding Up'] }
    }
  },

  // ════════════════════════════════════════════════════════════
  // GOVERNMENT EXAM NOTES — Complete structured notes for all major exams
  // ════════════════════════════════════════════════════════════

  'UPSC': {
    icon: '🏛️', color: '#7c3aed',
    subjects: {
      'UPSC Basic Notes': {
        topics: [
          'What is UPSC — Full Form & Conducting Authority',
          'UPSC Exam Purpose & Type — National Level Civil Services',
          'UPSC Official Website & Registration Portal',
          'UPSC Eligibility — Educational Qualification',
          'UPSC Age Limit & Number of Attempts',
          'UPSC Nationality Requirements',
          'Age Relaxation — SC/ST/OBC/PwD/Ex-Servicemen',
          'UPSC Exam Stages Overview — Prelims Mains Interview',
          'UPSC Preliminary Exam — Pattern Subjects Marks Duration',
          'UPSC Mains Exam — GS Papers Essay Optional Language',
          'UPSC Interview & Personality Test — Format & Scoring',
          'UPSC Negative Marking Rules',
          'UPSC Syllabus — General Studies GS1 GS2 GS3 GS4',
          'UPSC Syllabus — Current Affairs & CSAT',
          'UPSC Syllabus — Essay & Ethics Integrity Aptitude',
          'UPSC Syllabus — Optional Subject Selection Guide',
          'UPSC Syllabus — English & Indian Language Papers',
          'UPSC Notification Date & Application Timeline',
          'UPSC Application Fee & Admit Card',
          'UPSC Result Date & Final Merit List'
        ],
        levels: ['Beginner', 'Intermediate'],
        units: ['Unit 1: UPSC Overview', 'Unit 2: Eligibility', 'Unit 3: Exam Pattern', 'Unit 4: Syllabus', 'Unit 5: Application Process']
      },
      'UPSC Career & Services': {
        topics: [
          'IAS — Indian Administrative Service Role & Responsibilities',
          'IPS — Indian Police Service Role & Responsibilities',
          'IFS — Indian Foreign Service & Diplomacy',
          'IRS — Indian Revenue Service Roles',
          'Other Group A & Group B Central Services',
          'UPSC Study Plan — Month-wise Preparation Strategy',
          'UPSC Recommended Books — History Polity Geography Economy',
          'UPSC Previous Year Papers Analysis',
          'UPSC Mock Tests & Test Series Strategy',
          'UPSC Current Affairs — Sources & Daily Reading Habit',
          'UPSC Optional Subject — How to Choose & Strategy',
          'UPSC Answer Writing Practice — UPSC Mains Strategy',
          'UPSC Interview Preparation — DAF & Personality Grooming',
          'UPSC Topper Strategies & Success Stories',
          'UPSC General Studies Paper 1 — History Geography Society',
          'UPSC General Studies Paper 2 — Polity Governance IR',
          'UPSC General Studies Paper 3 — Economy Environment Technology',
          'UPSC General Studies Paper 4 — Ethics Integrity Aptitude',
          'UPSC CSAT Paper 2 — Comprehension Reasoning Maths',
          'UPSC Important Topics — Environment Climate Biodiversity'
        ],
        levels: ['Intermediate', 'Advanced'],
        units: ['Unit 1: IAS IPS IFS IRS', 'Unit 2: Study Plan', 'Unit 3: Subject-wise Strategy', 'Unit 4: Answer Writing', 'Unit 5: Interview Prep']
      }
    }
  },

  'SSC': {
    icon: '📝', color: '#0369a1',
    subjects: {
      'SSC Basic Notes': {
        topics: [
          'What is SSC — Full Form & Conducting Authority',
          'SSC Major Exams — CGL CHSL MTS GD CPO JE Stenographer Selection Post',
          'SSC CGL — Eligibility Qualification Age Limit',
          'SSC CHSL — Eligibility & 10+2 Level Posts',
          'SSC MTS — Eligibility Age Limit & Multi-Tasking Staff Posts',
          'SSC GD Constable — Eligibility & Physical Standards',
          'SSC CPO Sub-Inspector — Selection Process',
          'SSC JE — Junior Engineer Exam for Technical Candidates',
          'SSC Stenographer — Speed Test & Grade C Grade D',
          'SSC Selection Post Phase — Category-wise Recruitment',
          'SSC Nationality Requirements & Domicile',
          'SSC Age Relaxation — SC/ST/OBC/Ex-Servicemen',
          'SSC Exam Stages — Tier 1 Tier 2 Tier 3 Skill Test',
          'SSC Exam Pattern — Marks Duration Negative Marking',
          'SSC Syllabus — General Intelligence & Reasoning',
          'SSC Syllabus — Quantitative Aptitude Number System Algebra',
          'SSC Syllabus — English Language & Comprehension',
          'SSC Syllabus — General Awareness Current Affairs',
          'SSC Syllabus — Computer Knowledge & Data Entry',
          'SSC Notification & Application Process Guide'
        ],
        levels: ['Beginner', 'Intermediate'],
        units: ['Unit 1: SSC Overview', 'Unit 2: Major Exams', 'Unit 3: Eligibility', 'Unit 4: Exam Pattern', 'Unit 5: Syllabus']
      },
      'SSC Career & Preparation': {
        topics: [
          'SSC Career — Income Tax Inspector & Audit Officer',
          'SSC Career — Assistant Section Officer CSS',
          'SSC Career — Auditor Accountant Compiler Posts',
          'SSC Career — Junior Engineer Technical Posts',
          'SSC Career — Constable & Sub-Inspector GD',
          'SSC Preparation — Best Books for Reasoning',
          'SSC Preparation — Best Books for Quantitative Aptitude',
          'SSC Preparation — English Grammar & Vocabulary Tips',
          'SSC Preparation — General Awareness Static GK',
          'SSC Previous Year Papers — CGL CHSL Topic-wise Analysis',
          'SSC Mock Tests — Speed & Accuracy Training',
          'SSC Reasoning — Analogy Classification Matrix',
          'SSC Quant — Percentage Ratio Profit Loss Time Work',
          'SSC English — Cloze Test Error Spotting Reading Comprehension',
          'SSC GK — Science Polity History Geography Economy',
          'SSC Tier 2 Preparation — Paper 1 Quant Paper 2 English',
          'SSC Descriptive Paper — Essay Letter Writing',
          'SSC Skill Test — Typing Speed DEST & CPT',
          'SSC Physical Test — PET for GD Constable & CPO',
          'SSC Document Verification & Medical Examination'
        ],
        levels: ['Intermediate', 'Advanced'],
        units: ['Unit 1: Post-wise Careers', 'Unit 2: Subject Preparation', 'Unit 3: Previous Papers', 'Unit 4: Mock Tests', 'Unit 5: Physical & Skill Tests']
      }
    }
  },

  'Banking': {
    icon: '🏦', color: '#047857',
    subjects: {
      'Banking Exams Basic Notes': {
        topics: [
          'What are Banking Exams — Conducting Organizations Overview',
          'SBI PO — Eligibility Prelims Mains Interview Process',
          'SBI Clerk — Junior Associate Exam Pattern & Syllabus',
          'IBPS PO — CWE Pattern Institute of Banking Personnel Selection',
          'IBPS Clerk — Prelims Mains Pattern & Posts',
          'IBPS SO — Specialist Officer IT HR Agriculture Law',
          'IBPS RRB — Regional Rural Banks Officer & Office Assistant',
          'RBI Grade B — Phase 1 Phase 2 Interview Process',
          'RBI Assistant — Prelims Mains Language Test',
          'NABARD Grade A & Grade B — Development Banking',
          'SEBI Grade A — Securities & Exchange Board Officer',
          'Banking Eligibility — Educational Qualification Age Limit',
          'Banking Age Relaxation — SC/ST/OBC/PwD/Ex-Servicemen',
          'Banking Exam Stages — Prelims Mains Interview Language Test',
          'Banking Exam Pattern — Marks Duration Negative Marking',
          'Banking Syllabus — Quantitative Aptitude Data Interpretation',
          'Banking Syllabus — Reasoning Ability Puzzles Seating',
          'Banking Syllabus — English Language Reading Comprehension',
          'Banking Syllabus — General Awareness Banking Current Affairs',
          'Banking Syllabus — Computer Aptitude & Financial Awareness'
        ],
        levels: ['Beginner', 'Intermediate'],
        units: ['Unit 1: Banking Exam Overview', 'Unit 2: Major Exams', 'Unit 3: Eligibility', 'Unit 4: Exam Pattern', 'Unit 5: Syllabus']
      },
      'Banking Career & Preparation': {
        topics: [
          'Banking Career — Probationary Officer PO Roles',
          'Banking Career — Clerk & Customer Service Posts',
          'Banking Career — Specialist Officer IT RAJBHASHA HR Law',
          'Banking Career — Assistant & Grade A/B Officer',
          'Banking Career — Branch Manager & Senior Manager Growth',
          'Banking Awareness — RBI Monetary Policy Repo Rate',
          'Banking Awareness — Types of Banks Commercial RRB NBFC',
          'Banking Awareness — BASEL Norms Capital Adequacy',
          'Banking Awareness — NPA Provisioning Banking Terms',
          'Banking Awareness — Financial Inclusion Jan Dhan Yojana',
          'Banking Awareness — Digital Banking NEFT RTGS IMPS UPI',
          'Banking Awareness — Negotiable Instruments Cheque DD',
          'Banking Quant — Data Interpretation Table Chart',
          'Banking Quant — Number Series Simplification DI',
          'Banking Reasoning — Puzzles Direction Sense Blood Relation',
          'Banking English — Error Correction Sentence Rearrangement',
          'Banking Mock Tests — Speed Accuracy Time Management',
          'Banking GK — Important Government Schemes Committees',
          'Banking GK — International Organizations IMF WTO SWIFT',
          'Banking Interview Preparation — Banking Knowledge HR Questions'
        ],
        levels: ['Intermediate', 'Advanced'],
        units: ['Unit 1: Career Paths', 'Unit 2: Banking Awareness', 'Unit 3: Quantitative Aptitude', 'Unit 4: Reasoning & English', 'Unit 5: Interview Prep']
      }
    }
  },

  'Railway': {
    icon: '🚆', color: '#b45309',
    subjects: {
      'Railway Exams Basic Notes': {
        topics: [
          'Railway Recruitment — RRB & RRC Overview',
          'RRB NTPC — Non-Technical Popular Categories Exam',
          'RRB Group D — Track Maintainer Helper & Other Posts',
          'RRB ALP — Assistant Loco Pilot & Technician',
          'RRB JE — Junior Engineer Civil Mechanical Electrical IT',
          'RPF Constable — Railway Protection Force Recruitment',
          'RPF Sub-Inspector — SI Recruitment & Selection Process',
          'Railway Eligibility — Qualification Age Limit Nationality',
          'Railway Medical Standards — A1 B1 B2 C1 C2 Categories',
          'Railway Age Relaxation — SC/ST/OBC/PwD/Ex-Servicemen',
          'Railway Exam Stages — CBT 1 CBT 2 Skill Test PET Medical',
          'Railway CBT Pattern — Questions Marks Duration Negative Marking',
          'Railway Syllabus — Mathematics Number System Algebra Geometry',
          'Railway Syllabus — General Intelligence & Reasoning',
          'Railway Syllabus — General Science Physics Chemistry Bio',
          'Railway Syllabus — General Awareness Current Affairs',
          'Railway Syllabus — Technical Subjects for ALP JE',
          'Railway Application Process — Official Website RRB Zones',
          'Railway Document Verification & Medical Examination',
          'Railway Physical Efficiency Test — PET for RPF Posts'
        ],
        levels: ['Beginner', 'Intermediate'],
        units: ['Unit 1: Railway Overview', 'Unit 2: Major Exams', 'Unit 3: Eligibility', 'Unit 4: Exam Pattern', 'Unit 5: Syllabus']
      },
      'Railway Career & Preparation': {
        topics: [
          'Railway Career — Station Master & Ticket Collector',
          'Railway Career — Clerk & Commercial Apprentice',
          'Railway Career — Technician & Assistant Loco Pilot',
          'Railway Career — Junior Engineer Technical Posts',
          'Railway Career — Track Maintainer Level 1 Posts',
          'Railway Career — Constable & Sub-Inspector RPF',
          'Railway Maths — Percentage Ratio Profit Loss Distance',
          'Railway Maths — Time & Work Train Problems Pipes Cistern',
          'Railway General Science — Physics Laws Motion Electricity',
          'Railway General Science — Chemistry Periodic Table Reactions',
          'Railway General Science — Biology Human Body Nutrition',
          'Railway GK — History Geography Polity Economy',
          'Railway GK — Indian Railways History Zones Headquarters',
          'Railway GK — Current Affairs Railway Budget Union Budget',
          'Railway Reasoning — Analogy Classification Coding Number',
          'Railway CBT Previous Papers — Topic-wise Practice',
          'Railway Mock Tests — Online Practice Test Strategy',
          'Railway ALP Technical — Relevant Trade Syllabus',
          'Railway JE Technical — Civil Mechanical Electrical IT',
          'Railway Interview & Document Verification Checklist'
        ],
        levels: ['Intermediate', 'Advanced'],
        units: ['Unit 1: Career Paths', 'Unit 2: Mathematics', 'Unit 3: General Science', 'Unit 4: GK & Current Affairs', 'Unit 5: Technical Preparation']
      }
    }
  },

  'Defence': {
    icon: '🪖', color: '#1d4ed8',
    subjects: {
      'Defence Exams Basic Notes': {
        topics: [
          'Defence Career Overview — Army Navy Air Force',
          'NDA Exam — National Defence Academy Overview',
          'NDA Eligibility — Age Qualification Marital Status Nationality',
          'NDA Exam Pattern — Mathematics GAT Paper Marks Duration',
          'NDA SSB Interview — 5-Day Selection Process',
          'CDS Exam — Combined Defence Services Overview',
          'CDS Eligibility — IMA INA AFA OTA Specific Qualifications',
          'CDS Exam Pattern — English GK Elementary Maths',
          'AFCAT — Air Force Common Admission Test Overview',
          'AFCAT Eligibility & Exam Pattern',
          'Agniveer Recruitment — Army Navy Air Force',
          'Agniveer Eligibility — Age Physical Educational',
          'Territorial Army — Officer Recruitment Process',
          'Defence Physical Standards — Height Weight Running',
          'Defence Medical Standards — SHAPE1 MedCat A B C',
          'Defence Written Exam Syllabus — Maths English GK Science',
          'SSB Interview Stages — OIR PPDT GTO Psychology Interview',
          'SSB Group Testing Officer Tests — WAT SRT',
          'SSB Interview — Personal Interview & Conference',
          'Merit List — Written Marks SSB Marks Combined'
        ],
        levels: ['Beginner', 'Intermediate'],
        units: ['Unit 1: Defence Overview', 'Unit 2: NDA & CDS', 'Unit 3: AFCAT & Agniveer', 'Unit 4: SSB Selection', 'Unit 5: Physical & Medical']
      },
      'Defence Career & Preparation': {
        topics: [
          'Army Officer — Lieutenant to General Career Progression',
          'Navy Officer — Sub-Lieutenant to Admiral',
          'Air Force Officer — Flying Technical Ground Duty Branches',
          'Soldier Agniveer — Technical Tradesmen Clerk Posts',
          'Technical Officer — Engineering Posts in Defence',
          'NDA Maths Preparation — Algebra Trigonometry Calculus',
          'NDA GAT Preparation — English Reasoning History Geography',
          'CDS English — Comprehension Grammar Vocabulary',
          'CDS GK — Indian History Polity Geography Science',
          'CDS Maths — Arithmetic Mensuration Geometry Statistics',
          'AFCAT Verbal Reasoning — Analogy Antonym Synonym',
          'AFCAT Military Aptitude — Spatial Reasoning Mechanical',
          'SSB Preparation — OIR Verbal Non-Verbal Reasoning',
          'SSB PPDT — Picture Perception Discussion Practice',
          'SSB GTO Tasks — Command Task PGT HGT Snake Race',
          'SSB Psychology — WAT SRT SDT Interview Practice',
          'Physical Training — Running Swimming Push-ups Pull-ups',
          'Personality Development — Leadership Communication',
          'Defence Current Affairs — Defence News Exercises Treaties',
          'Mock SSB — Simulation Tests & Practice Sessions'
        ],
        levels: ['Intermediate', 'Advanced'],
        units: ['Unit 1: Career Paths', 'Unit 2: Written Preparation', 'Unit 3: SSB Preparation', 'Unit 4: Physical Training', 'Unit 5: Personality Development']
      }
    }
  },

  'Police': {
    icon: '👮', color: '#374151',
    subjects: {
      'Police Exams Basic Notes': {
        topics: [
          'Police Recruitment Overview — Central & State Police',
          'SSC GD Constable — CISF BSF CRPF ITBP SSB AR NIA',
          'SSC CPO — Delhi Police & CAPF Sub-Inspector',
          'State Police Constable — State-wise Recruitment',
          'State Police SI Sub-Inspector — Exam & Selection',
          'UPSC CAPF AC — Assistant Commandant Exam',
          'Police Eligibility — Qualification Age Nationality',
          'Police Physical Standards — Height Chest Running',
          'Police Age Relaxation — SC/ST/OBC/Ex-Servicemen',
          'Police Selection — Written Exam PET PMT Medical Interview',
          'Police Written Exam Pattern — Marks Duration',
          'Police Syllabus — General Knowledge & Current Affairs',
          'Police Syllabus — Reasoning Ability Mental Alertness',
          'Police Syllabus — Mathematics Elementary Arithmetic',
          'Police Syllabus — General Science Physics Chemistry Bio',
          'Police Syllabus — Constitution Basic Law & Rights',
          'Police Physical Efficiency Test — Running Long High Jump',
          'Police Physical Measurement Test — Height Chest',
          'Police Medical Examination Standards',
          'Police Document Verification & Certificate Requirements'
        ],
        levels: ['Beginner', 'Intermediate'],
        units: ['Unit 1: Police Exam Overview', 'Unit 2: Major Exams', 'Unit 3: Eligibility', 'Unit 4: Exam Pattern', 'Unit 5: Physical Standards']
      },
      'Police Career & Preparation': {
        topics: [
          'Police Career — Constable & Head Constable',
          'Police Career — Sub-Inspector & Assistant Sub-Inspector',
          'Police Career — Inspector & Circle Inspector',
          'Police Career — CAPF Assistant Commandant',
          'IPS through UPSC — Career Path & Posting',
          'Police GK — Indian Polity Constitution Law',
          'Police GK — Indian History Freedom Struggle',
          'Police GK — Geography Physical Political',
          'Police GK — General Science Biology Chemistry Physics',
          'Police GK — Current Affairs National International',
          'Police Maths — Arithmetic Percentage Ratio Algebra',
          'Police Reasoning — Analogy Classification Coding Series',
          'Police Reasoning — Directions Blood Relations Puzzles',
          'Police Running Training — 1600m 800m Sprint Programs',
          'Police Long Jump High Jump Physical Training',
          'Police Mock Tests — Online Practice Tests',
          'Police Previous Papers — State-wise Question Analysis',
          'Police Interview Preparation — UPSC CAPF Interview',
          'Police Law — IPC CrPC Evidence Act Basics',
          'Police Cyber Crime — Digital Forensics Basics'
        ],
        levels: ['Intermediate', 'Advanced'],
        units: ['Unit 1: Career Paths', 'Unit 2: GK & Current Affairs', 'Unit 3: Maths & Reasoning', 'Unit 4: Physical Training', 'Unit 5: Law Basics']
      }
    }
  },

  'State PSC': {
    icon: '🏛️', color: '#7c2d12',
    subjects: {
      'State PSC Basic Notes': {
        topics: [
          'What is State PSC — State Public Service Commission',
          'TNPSC — Tamil Nadu Public Service Commission Overview',
          'TNPSC Groups — Group 1 2 2A 4 VAO CCSE Exams',
          'Kerala PSC — Overview & Major Exams',
          'Karnataka PSC KPSC — KAS & Other Exams',
          'APPSC — Andhra Pradesh Public Service Commission',
          'TSPSC — Telangana State Public Service Commission',
          'MPSC — Maharashtra Public Service Commission',
          'WBPSC — West Bengal Public Service Commission',
          'UPPSC — Uttar Pradesh Public Service Commission',
          'BPSC — Bihar Public Service Commission',
          'RPSC — Rajasthan Public Service Commission',
          'MPPSC — Madhya Pradesh Public Service Commission',
          'State PSC Eligibility — Qualification Age Domicile',
          'State PSC Age Relaxation — Reservation Category-wise',
          'State PSC Exam Stages — Preliminary Mains Interview',
          'State PSC Exam Pattern — Marks Duration Negative Marking',
          'State PSC Syllabus — State GK History Geography Economy',
          'State PSC Syllabus — Indian Polity Constitution',
          'State PSC Syllabus — Regional Language & Current Affairs'
        ],
        levels: ['Beginner', 'Intermediate'],
        units: ['Unit 1: PSC Overview', 'Unit 2: State-wise PSCs', 'Unit 3: Eligibility', 'Unit 4: Exam Pattern', 'Unit 5: Syllabus']
      },
      'State PSC Career & Preparation': {
        topics: [
          'State PSC Career — Deputy Collector & Administrative Officer',
          'State PSC Career — Revenue Officer & Tahsildar',
          'State PSC Career — Commercial Tax Officer',
          'State PSC Career — Municipal Administration Roles',
          'State PSC Career — Assistant Section Officer & Clerk',
          'TNPSC Preparation — Tamil Nadu History & Culture',
          'TNPSC Preparation — Tamil Nadu Geography Economy',
          'TNPSC Tamil — Tamil Language Paper Preparation',
          'State PSC Indian History — Ancient Medieval Modern',
          'State PSC Indian Polity — Constitution Parliament Judiciary',
          'State PSC Geography — Physical India State Geography',
          'State PSC Economy — Indian Economy & State Economy',
          'State PSC Science — Physics Chemistry Biology',
          'State PSC Current Affairs — State National International',
          'State PSC Aptitude — Maths Reasoning',
          'State PSC Previous Papers — Prelims Mains Analysis',
          'State PSC Mock Tests — Online Practice',
          'State PSC Answer Writing — Mains Strategy',
          'State PSC Interview — Certificate Verification Process',
          'State PSC Books — Standard Reference Books State-wise'
        ],
        levels: ['Intermediate', 'Advanced'],
        units: ['Unit 1: Career Paths', 'Unit 2: State History & GK', 'Unit 3: Indian Polity & Economy', 'Unit 4: Previous Papers', 'Unit 5: Interview Prep']
      }
    }
  },

  'Teaching': {
    icon: '👩🏫', color: '#0891b2',
    subjects: {
      'Teaching Exams Basic Notes': {
        topics: [
          'Government Teaching Career Overview — Central vs State',
          'CTET — Central Teacher Eligibility Test Overview',
          'CTET Paper 1 — Classes 1 to 5 Primary Level',
          'CTET Paper 2 — Classes 6 to 8 Upper Primary Level',
          'State TET — State-wise Teacher Eligibility Tests',
          'UGC NET — National Eligibility Test for Assistant Professor',
          'CSIR NET — Science & Technology NET for Lecturer',
          'KVS Recruitment — Kendriya Vidyalaya Sangathan Teacher',
          'NVS Recruitment — Navodaya Vidyalaya Samiti Teacher',
          'State Teacher Recruitment — TRB DSSSB MPTET etc',
          'Teaching Eligibility — 12th Graduation B.Ed D.El.Ed',
          'Teaching Eligibility — Post Graduation for TGT PGT',
          'Teaching Age Limit & Reservation',
          'CTET Exam Pattern — Paper 1 & Paper 2 Marks Duration',
          'CTET Syllabus — Child Development & Pedagogy',
          'CTET Syllabus — Teaching Methodology Paper 1 & 2',
          'CTET Syllabus — Language I & Language II',
          'CTET Syllabus — Mathematics Science Social Studies',
          'UGC NET Exam Pattern — Paper 1 & Subject Paper 2',
          'UGC NET Syllabus — Teaching Research Aptitude'
        ],
        levels: ['Beginner', 'Intermediate'],
        units: ['Unit 1: Teaching Exam Overview', 'Unit 2: CTET & State TET', 'Unit 3: UGC NET CSIR NET', 'Unit 4: Eligibility & Pattern', 'Unit 5: Syllabus']
      },
      'Teaching Career & Preparation': {
        topics: [
          'Teaching Career — Primary Teacher Class 1 to 5',
          'Teaching Career — TGT Trained Graduate Teacher 6-10',
          'Teaching Career — PGT Post Graduate Teacher 11-12',
          'Teaching Career — Lecturer & Assistant Professor',
          'Teaching Career — Research & Academic Roles in College',
          'Child Development — Piaget Vygotsky Kohlberg Theories',
          'Child Development — Learning Theories Behaviorism Constructivism',
          'Teaching Methodology — Inclusive Education & Special Needs',
          'Teaching Methodology — Continuous & Comprehensive Evaluation',
          'Teaching Methodology — Lesson Planning & Bloom Taxonomy',
          'CTET Pedagogy — Language Acquisition & Development',
          'CTET Maths Pedagogy — Number Concept Teaching Methods',
          'CTET Science Pedagogy — Activity-based Science Learning',
          'CTET Social Science Pedagogy — Map Work & History',
          'UGC NET Paper 1 — Research Methodology & ICT',
          'UGC NET Paper 1 — Communication & Logical Reasoning',
          'UGC NET Paper 1 — Higher Education System in India',
          'UGC NET Subject Preparation — Education Commerce History',
          'Teaching Mock Tests — CTET TET NET Practice Papers',
          'Teaching Interview — Demo Lesson & Panel Interview Tips'
        ],
        levels: ['Intermediate', 'Advanced'],
        units: ['Unit 1: Career Paths', 'Unit 2: Child Development', 'Unit 3: Teaching Methodology', 'Unit 4: Paper-wise Prep', 'Unit 5: Mock Tests & Interview']
      }
    }
  },

  // ════════════════════════════════════════════════════════════
  // SKILL-WISE NOTES — Rich structured notes per skill
  // Format: What is it → Why → Concepts → Terms → Steps → Examples → Practical → Tools → Mistakes → Interview Qs → MCQs → Project → Advanced → Career
  // ════════════════════════════════════════════════════════════

  'Python & CSE Skills': {
    icon: '💻', color: '#3b82f6',
    subjects: {
      'Python Programming': {
        topics: [
          'Python Introduction — What is Python & Why Learn It',
          'Python Installation & IDE Setup — VS Code PyCharm Jupyter',
          'Python Variables & Data Types — int float str bool',
          'Python Operators — Arithmetic Comparison Logical Bitwise',
          'Python Conditional Statements — if elif else',
          'Python Loops — for while break continue pass',
          'Python Functions — def return arguments default args',
          'Python Lists — Indexing Slicing Methods list comprehension',
          'Python Tuples — Immutable Sequences & Packing Unpacking',
          'Python Sets — Union Intersection Difference Operations',
          'Python Dictionaries — Key-Value pairs Methods Iteration',
          'Python Strings — Formatting Methods RegEx Pattern',
          'Python File Handling — Read Write Append CSV JSON',
          'Python Exception Handling — try except finally raise',
          'Python OOP — Classes Objects Inheritance Polymorphism',
          'Python Modules & Packages — import pip PyPI',
          'Python Lambda & Higher-Order Functions — map filter reduce',
          'Python Iterators Generators & yield keyword',
          'Python Decorators — Function Decorator Class Decorator',
          'Python Regular Expressions — re module Pattern Matching',
          'Python APIs — requests library REST API calls',
          'Python Database — sqlite3 SQLAlchemy MySQL Connector',
          'Python Multithreading & Multiprocessing — concurrent.futures',
          'Python Async Programming — asyncio await coroutines',
          'Python Testing — unittest pytest TDD approach',
          'Python Design Patterns — Singleton Factory Observer',
          'Python Web Development — Flask FastAPI Django basics',
          'Python Data Science — NumPy Pandas Matplotlib intro',
          'Python AI/ML — Scikit-learn TensorFlow PyTorch intro',
          'Python Projects — Calculator Student Manager Expense Tracker API App'
        ],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: Python Basics', 'Unit 2: Data Structures', 'Unit 3: OOP & Advanced', 'Unit 4: Libraries & APIs', 'Unit 5: Projects & Career']
      },
      'Web Development': {
        topics: [
          'HTML5 — Structure Tags Semantic Elements Forms Tables',
          'CSS3 — Selectors Box Model Flexbox Grid Animations',
          'JavaScript — Variables Functions DOM Events Fetch API',
          'React.js — Components Props State Hooks Context API',
          'Angular — Components Modules Services RxJS',
          'Vue.js — Directives Components Vuex Router',
          'Node.js & Express — REST API Middleware Authentication',
          'Django — MVT Models Views Templates ORM',
          'Flask — Routes Templates Forms SQLAlchemy',
          'Spring Boot — Beans REST Controllers JPA Hibernate',
          'SQL & MySQL — CRUD Joins Normalization Stored Procedures',
          'PostgreSQL — Advanced Queries JSON Indexing',
          'MongoDB — Documents Collections Aggregation Atlas',
          'Firebase — Realtime DB Firestore Auth Hosting',
          'Git & GitHub — Clone Commit Push PR Branching',
          'REST API — HTTP Methods Status Codes JSON Postman',
          'GraphQL — Schema Resolvers Queries Mutations',
          'Docker & Containers — Dockerfile Compose Networking',
          'AWS Deployment — EC2 S3 RDS Lambda API Gateway',
          'Web Security — OWASP XSS CSRF SQL Injection Auth JWT'
        ],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: Frontend HTML CSS JS', 'Unit 2: Frontend Frameworks', 'Unit 3: Backend & APIs', 'Unit 4: Databases & Cloud', 'Unit 5: Security & Deployment']
      },
      'Data Structures & Algorithms': {
        topics: [
          'DSA Introduction — Why DSA Matters in Interviews',
          'Time & Space Complexity — Big O Big Theta Omega',
          'Arrays — Operations Search Sort Two Pointer Sliding Window',
          'Strings — Pattern Matching KMP Rabin-Karp Palindrome',
          'Linked Lists — Singly Doubly Circular Operations',
          'Stacks — Push Pop LIFO Applications Expression Evaluation',
          'Queues — FIFO Deque Priority Queue Circular Queue',
          'Trees — Binary Tree BST AVL Red-Black B-Tree',
          'Heaps — Min-Heap Max-Heap Heap Sort Priority Queue',
          'Graphs — Representation DFS BFS Topological Sort',
          'Graph Algorithms — Dijkstra Bellman-Ford Floyd-Warshall',
          'Hashing — Hash Table Collision Resolution Load Factor',
          'Trie — Insert Search Prefix Autocomplete Implementation',
          'Segment Tree & Fenwick Tree — Range Queries',
          'Sorting Algorithms — Bubble Quick Merge Heap Radix Count',
          'Binary Search — Classic Variants Rotated Array',
          'Dynamic Programming — Memoization Tabulation DP on Strings',
          'DP Problems — LCS LIS Knapsack Coin Change Matrix Chain',
          'Greedy Algorithms — Activity Selection Huffman Coding',
          'Backtracking — N-Queens Sudoku Solver Permutations'
        ],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: Basics & Complexity', 'Unit 2: Linear Structures', 'Unit 3: Trees & Graphs', 'Unit 4: Algorithms', 'Unit 5: Advanced Problems']
      },
      'Cloud & DevOps': {
        topics: [
          'Linux Commands — Navigation File Management Permissions',
          'Shell Scripting — bash sh Variables Loops Functions',
          'Git Advanced — Rebase Cherry-pick Stash Submodules',
          'Docker — Images Containers Volumes Networking Compose',
          'Kubernetes — Pods Deployments Services Ingress ConfigMap',
          'CI/CD — Jenkins GitHub Actions GitLab CI ArgoCD',
          'AWS Core — EC2 S3 VPC IAM RDS Lambda CloudFront',
          'AWS Advanced — ECS EKS SQS SNS DynamoDB Step Functions',
          'Azure — Virtual Machines Blob Storage Azure DevOps AKS',
          'Google Cloud — GCE GKE BigQuery Cloud Functions Pub/Sub',
          'Terraform — Infrastructure as Code State Modules Providers',
          'Ansible — Playbooks Roles Inventory Ad-hoc Commands',
          'Networking — TCP/IP DNS HTTP HTTPS Load Balancing',
          'Monitoring — Prometheus Grafana ELK Stack Datadog',
          'Cloud Security — IAM Policies Encryption VPC Security Groups'
        ],
        levels: ['Intermediate', 'Advanced'],
        units: ['Unit 1: Linux & Git', 'Unit 2: Docker & K8s', 'Unit 3: CI/CD', 'Unit 4: Cloud Platforms', 'Unit 5: IaC & Security']
      }
    }
  },

  'AI / ML / Data Science Skills': {
    icon: '🤖', color: '#7c3aed',
    subjects: {
      'Python for Data Science': {
        topics: [
          'Python for Data Science Introduction & Setup — Anaconda Jupyter',
          'NumPy — Arrays Broadcasting Slicing Mathematical Operations',
          'Pandas — Series DataFrame Read CSV Merge GroupBy Apply',
          'Data Cleaning — Missing Values Duplicates Outliers Data Types',
          'Exploratory Data Analysis — Describe Correlation Heatmap',
          'Data Visualization — Matplotlib Seaborn Plotly Interactive',
          'Statistics for DS — Mean Median Mode Variance SD Skewness',
          'Probability — Distributions Bayes Theorem Central Limit',
          'Feature Engineering — Encoding Scaling Selection Creation',
          'Supervised Learning — Linear Regression Logistic Regression',
          'Classification — Decision Trees Random Forest SVM KNN',
          'Ensemble Methods — Bagging Boosting XGBoost LightGBM',
          'Unsupervised Learning — K-Means DBSCAN Hierarchical',
          'Dimensionality Reduction — PCA t-SNE UMAP',
          'Model Evaluation — Accuracy Precision Recall F1 ROC-AUC',
          'Cross Validation — KFold StratifiedKFold GridSearchCV',
          'Deep Learning — Neural Networks Backpropagation Keras',
          'CNN — Convolutional Layers Pooling Image Classification',
          'RNN & LSTM — Sequence Data Time Series Text',
          'NLP — Tokenization TF-IDF Word2Vec BERT Transformers',
          'Computer Vision — OpenCV YOLO Object Detection Segmentation',
          'Generative AI — GANs VAEs Diffusion Models',
          'LLMs & Transformers — GPT BERT T5 Fine-tuning',
          'Prompt Engineering — Zero-shot Few-shot Chain-of-Thought',
          'RAG — Retrieval Augmented Generation Vector Databases',
          'AI Agents — Tool Use Planning Memory LangChain',
          'TensorFlow & PyTorch — Model Building Training Deployment',
          'Power BI — Dashboard Reports DAX Measures Data Model',
          'Tableau — Visualizations Calculated Fields Dashboards',
          'ML Deployment — Flask FastAPI Docker Streamlit MLflow',
          'MLOps — Versioning Monitoring CI/CD for ML DVC'
        ],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: Python & NumPy Pandas', 'Unit 2: Statistics & EDA', 'Unit 3: Machine Learning', 'Unit 4: Deep Learning & NLP', 'Unit 5: GenAI & MLOps']
      },
      'SQL for Data Science': {
        topics: [
          'SQL Introduction — What Why RDBMS vs NoSQL',
          'SQL DDL — CREATE ALTER DROP TRUNCATE',
          'SQL DML — SELECT INSERT UPDATE DELETE',
          'SQL WHERE Clause — Conditions AND OR NOT IN BETWEEN LIKE',
          'SQL JOINs — INNER LEFT RIGHT FULL CROSS SELF JOIN',
          'SQL Aggregate Functions — COUNT SUM AVG MIN MAX',
          'SQL GROUP BY & HAVING — Grouping & Filtering Groups',
          'SQL Subqueries — Nested Correlated EXISTS IN',
          'SQL Window Functions — ROW_NUMBER RANK DENSE_RANK LEAD LAG',
          'SQL CTEs — Common Table Expressions Recursive CTEs',
          'SQL Stored Procedures — Parameters IN OUT INOUT',
          'SQL Views & Materialized Views',
          'SQL Indexing — B-Tree Hash Index Optimization',
          'SQL Normalization — 1NF 2NF 3NF BCNF',
          'SQL Interview Questions — Top 50 Practice Problems'
        ],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: SQL Basics', 'Unit 2: Joins & Aggregation', 'Unit 3: Advanced SQL', 'Unit 4: Performance', 'Unit 5: Interview Prep']
      }
    }
  },

  'Agriculture & Horticulture Skills': {
    icon: '🌾', color: '#15803d',
    subjects: {
      'Agriculture Fundamentals': {
        topics: [
          'Agriculture Introduction — Importance & Types of Farming',
          'Soil Science — Soil Formation Composition Texture Structure',
          'Soil Testing — pH NPK Organic Matter Soil Health Card',
          'Soil Conservation — Erosion Control Bunding Terracing',
          'Crop Science — Kharif Rabi Zaid Crops Classification',
          'Crop Varieties — HYV Hybrid GMO Seed Selection',
          'Irrigation Methods — Drip Sprinkler Flood Furrow',
          'Water Management — Watershed Management Groundwater',
          'Pest Management — IPM Biological Chemical Control',
          'Disease Management — Fungal Bacterial Viral Plant Disease',
          'Fertilizer Management — NPK Micronutrients Organic vs Chemical',
          'Organic Farming — Principles Certification Composting Vermicompost',
          'Farm Management — Record Keeping Cost Benefit Analysis',
          'Agricultural Economics — Price Support MSP Market Linkage',
          'Agri-Tech — Precision Farming IoT Drones in Agriculture',
          'GIS in Agriculture — Remote Sensing NDVI Crop Monitoring',
          'Agricultural Data Analysis — Yield Prediction R Python',
          'Agricultural Marketing — APMC e-NAM Export FPO',
          'Agricultural Credit — NABARD KCC Crop Insurance PMFBY',
          'Government Schemes — PM-KISAN PMFBY RKVY Agricultural Schemes'
        ],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: Soil & Water', 'Unit 2: Crop Science', 'Unit 3: Pest & Disease', 'Unit 4: Technology', 'Unit 5: Marketing & Policy']
      },
      'Horticulture Fundamentals': {
        topics: [
          'Horticulture Introduction — Branches Pomology Olericulture Floriculture',
          'Plant Propagation — Seeds Cuttings Grafting Budding Layering',
          'Nursery Management — Potting Media Germination Growth',
          'Floriculture — Rose Chrysanthemum Jasmine Cut Flower Production',
          'Vegetable Science — Solanaceae Cucurbits Legumes Leafy Vegetables',
          'Pomology — Mango Banana Citrus Guava Apple Production',
          'Landscaping — Garden Design Turf Management Trees Shrubs',
          'Greenhouse Technology — Types Control Environment Hydroponics',
          'Post-Harvest Technology — Storage Grading Packaging Cold Chain',
          'Irrigation & Fertigation — Drip Irrigation for Horticulture',
          'Pest & Disease — Integrated Pest Management Horticulture'
        ],
        levels: ['Beginner', 'Intermediate'],
        units: ['Unit 1: Propagation & Nursery', 'Unit 2: Floriculture', 'Unit 3: Vegetables & Fruits', 'Unit 4: Greenhouse & Technology', 'Unit 5: Post-Harvest']
      }
    }
  },

  'Medical Nursing Pharmacy Skills': {
    icon: '🩺', color: '#dc2626',
    subjects: {
      'Medical Fundamentals': {
        topics: [
          'Basic Anatomy — Human Body Systems Overview',
          'Anatomy — Skeletal Muscular Cardiovascular Respiratory',
          'Anatomy — Nervous Digestive Endocrine Reproductive Systems',
          'Physiology — How Body Systems Work & Maintain Homeostasis',
          'Medical Terminology — Prefixes Suffixes Root Words Abbreviations',
          'Clinical Skills — History Taking Physical Examination Techniques',
          'Patient Care — Fundamental Nursing & Medical Care Principles',
          'Medical Documentation — SOAP Notes Discharge Summary',
          'Pharmacology Basics — Drug Classification Routes MOA',
          'First Aid — CPR Burns Fractures Wounds Bleeding Control',
          'Emergency Care — Triage ABC Assessment Emergency Protocols',
          'Infection Control — Hand Hygiene PPE Sterilization Isolation',
          'Medical Ethics — Informed Consent Confidentiality Patient Rights',
          'Healthcare Communication — Therapeutic Communication Active Listening',
          'Clinical Research Basics — Study Design Ethics IRB GCP',
          'Hospital Management — Ward Operations Quality Patient Safety',
          'Vital Signs — BP Pulse RR Temperature SPO2 Monitoring',
          'ECG Basics — Rhythm Interpretation P QRS T Waves',
          'Lab Values — CBC Blood Chemistry LFT KFT Interpretation',
          'Medical Equipment — Ventilators Monitors Defibrillators'
        ],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: Anatomy & Physiology', 'Unit 2: Clinical Skills', 'Unit 3: Pharmacology', 'Unit 4: Emergency Care', 'Unit 5: Ethics & Research']
      },
      'Nursing Skills': {
        topics: [
          'Nursing Procedures — Bed Making IV Insertion Catheterization',
          'Clinical Assessment — Head-to-Toe Assessment Nursing Process',
          'Medication Administration — 5 Rights Oral IV IM SC Routes',
          'ICU Care — Critical Care Monitoring Ventilator Management',
          'Pediatric Nursing — Child Development Immunization Pediatric Doses',
          'Maternity Nursing — Antenatal Intrapartum Postpartum Care',
          'Community Health — Public Health Programs ASHA ANM Roles',
          'Nursing Documentation — Nursing Care Plans NANDA Diagnoses'
        ],
        levels: ['Beginner', 'Intermediate'],
        units: ['Unit 1: Nursing Procedures', 'Unit 2: Clinical Assessment', 'Unit 3: Specialized Care', 'Unit 4: Community Health', 'Unit 5: Documentation']
      },
      'Pharmacy Skills': {
        topics: [
          'Pharmacology — Drug Classification MOA Pharmacokinetics',
          'Pharmaceutics — Dosage Forms Formulation Tablet Capsule Liquid',
          'Drug Analysis — HPLC UV-Vis Titration Quality Testing',
          'Quality Control QC — Specifications Sampling Testing Release',
          'Quality Assurance QA — GMP GDP GCP Audit Documentation',
          'Pharmacovigilance — ADR Reporting Signal Detection PSUR',
          'Regulatory Affairs — CDSCO FDA Dossier Submission',
          'Clinical Research — Protocol CRF ICF Data Management',
          'Hospital Pharmacy — Drug Dispensing Drug Interaction Check',
          'Drug Safety — Contraindications Overdose Management'
        ],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: Pharmacology', 'Unit 2: Formulation', 'Unit 3: Quality', 'Unit 4: Regulatory', 'Unit 5: Clinical Research']
      }
    }
  },

  'Commerce Finance Banking Skills': {
    icon: '💰', color: '#b45309',
    subjects: {
      'Accounting & Commerce': {
        topics: [
          'Accounting Fundamentals — Bookkeeping Double Entry Principle',
          'Financial Accounting — Journal Ledger Trial Balance',
          'Trading & P&L Account — Gross Profit Net Profit Calculation',
          'Balance Sheet — Assets Liabilities Equity Format',
          'Bank Reconciliation — BRS Preparation Steps',
          'Depreciation — SLM WDV Companies Act Rates',
          'GST — CGST SGST IGST Returns Filing Input Tax Credit',
          'Income Tax — Heads of Income Deductions TDS Filing ITR',
          'Tally ERP 9 & Tally Prime — Voucher Entry Reports GST',
          'Excel for Accounting — VLOOKUP Pivot Tables Financial Functions',
          'Financial Reporting — Ind AS IFRS Disclosure Requirements',
          'Auditing — Types Internal External Audit Procedures',
          'Cost Accounting — Job Process Standard Marginal Costing',
          'Budgetary Control — Fixed Flexible Budget Variance Analysis',
          'Working Capital Management — Cash Inventory Receivables'
        ],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: Basic Accounting', 'Unit 2: Final Accounts', 'Unit 3: Taxation', 'Unit 4: Cost Accounting', 'Unit 5: Reporting & Audit']
      },
      'Finance & Investment Skills': {
        topics: [
          'Financial Analysis — Ratio Analysis Liquidity Profitability',
          'Financial Modelling — DCF Model LBO Model Excel Best Practices',
          'Investment Analysis — Equity Valuation P/E EV/EBITDA DCF',
          'Portfolio Management — MPT Risk Return Diversification',
          'Banking Operations — Account Types KYC CIBIL Credit Appraisal',
          'Credit Analysis — Financial Statement Analysis Credit Rating',
          'Risk Management — Market Credit Operational Liquidity Risk',
          'Insurance — Life Non-Life Underwriting Premium Calculation',
          'Capital Markets — Primary Secondary NSE BSE Trading',
          'Stock Market Analysis — Technical Fundamental Chart Reading',
          'Economics for Finance — GDP Inflation Interest Rate Impact',
          'Excel for Finance — Advanced Functions VBA Macros Dashboards',
          'Power BI for Finance — Financial Dashboards KPI Reporting',
          'SQL for Finance — Banking Data Queries Reporting',
          'FinTech — Digital Banking Blockchain RegTech Trends'
        ],
        levels: ['Intermediate', 'Advanced'],
        units: ['Unit 1: Analysis & Modelling', 'Unit 2: Investment', 'Unit 3: Banking & Credit', 'Unit 4: Risk & Insurance', 'Unit 5: Tools & FinTech']
      }
    }
  },

  'Education Teaching Skills': {
    icon: '🎓', color: '#0891b2',
    subjects: {
      'Teaching Fundamentals': {
        topics: [
          'Teaching Profession — Role Responsibilities Ethics',
          'Learning Theories — Behaviourism Cognitivism Constructivism',
          'Piaget Cognitive Development — Sensorimotor Preoperational Concrete Formal',
          'Vygotsky — Zone of Proximal Development Scaffolding',
          'Bloom Taxonomy — Knowledge Comprehension Application Analysis',
          'Lesson Planning — Objectives Content Methods Assessment',
          'Classroom Management — Rules Routines Positive Discipline',
          'Curriculum Development — Needs Analysis Design Evaluation',
          'Assessment & Evaluation — Formative Summative Rubrics',
          'Educational Psychology — Motivation Attention Memory Learning',
          'Inclusive Education — Special Needs Differentiation Universal Design',
          'Educational Technology — LMS Moodle Google Classroom',
          'E-Learning & Online Teaching — Zoom Teams Blended Learning',
          'Content Creation for Teaching — Presentations Videos Infographics',
          'Public Speaking & Communication — Teacher Communication Skills',
          'Student Counselling — Academic Emotional Career Guidance',
          'Presentation Skills — Slide Design Delivery Engagement',
          'Research in Education — Action Research Educational Research',
          'Higher Education — University Teaching Research Publication',
          'Teacher Professional Development — CPD Reflective Practice'
        ],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: Learning Theories', 'Unit 2: Planning & Management', 'Unit 3: Assessment', 'Unit 4: Technology', 'Unit 5: Professional Development']
      }
    }
  },

  'Design Media Creative Skills': {
    icon: '🎨', color: '#db2777',
    subjects: {
      'UI/UX & Graphic Design': {
        topics: [
          'Design Principles — Balance Contrast Alignment Proximity Color',
          'Typography — Font Types Hierarchy Readability Pairing',
          'Color Theory — Color Wheel Harmony Contrast Branding Colors',
          'UI Design — Wireframing Prototyping Components Design System',
          'UX Design — User Research Persona User Journey Usability',
          'Figma — Frames Components Auto Layout Prototyping Dev Mode',
          'Adobe Photoshop — Layers Masks Retouching Photo Editing',
          'Adobe Illustrator — Vector Paths Pen Tool Logos Illustrations',
          'Canva — Social Media Templates Brand Kit Design Quick',
          'Graphic Design — Branding Logo Poster Packaging Design',
          'Fashion Design — Illustration Pattern Making Draping Garment',
          'Textile Design — Print Weave Dyeing Fabric Selection',
          '3D Design — Blender 3D Modelling Rendering Animation',
          'Motion Graphics — After Effects Animation Kinetic Typography',
          'Product Design — Ideation Prototyping User Testing Iteration'
        ],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: Design Principles', 'Unit 2: UI/UX Figma', 'Unit 3: Photoshop & Illustrator', 'Unit 4: Branding & Fashion', 'Unit 5: 3D & Motion']
      },
      'Media & Journalism Skills': {
        topics: [
          'Journalism Fundamentals — News Values Objectivity Ethics',
          'News Writing — Inverted Pyramid 5W1H Lead Writing',
          'Reporting — Beat Reporting Field Reporting Sources',
          'Investigative Journalism — Research Data Journalism RTI',
          'Content Creation — Blogs Social Media Scripts Articles',
          'Video Production — Shooting Lighting Audio Editing',
          'Photography — Composition Lighting DSLR Editing Lightroom',
          'Script Writing — Story Structure Screenplay Format Drama',
          'Social Media Management — Strategy Analytics Engagement',
          'Digital Marketing — SEO SEM Email Social Paid Ads',
          'Public Relations — Press Release Media Relations Crisis PR',
          'Broadcasting — Radio TV News Reading Anchoring',
          'Storytelling — Narrative Arc Character Building Plot',
          'Podcast Production — Recording Editing Publishing',
          'Content Strategy — Editorial Calendar Analytics SEO Content'
        ],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: Journalism Basics', 'Unit 2: Reporting & Writing', 'Unit 3: Video & Photography', 'Unit 4: Digital Media', 'Unit 5: PR & Storytelling']
      }
    }
  },

  'Defence Police Forensics Skills': {
    icon: '🛡️', color: '#374151',
    subjects: {
      'Defence & Leadership Skills': {
        topics: [
          'Leadership Principles — Authority Responsibility Discipline',
          'Strategic Thinking — Mission Planning Decision Making',
          'Physical Fitness — Endurance Strength Flexibility Training',
          'Navigation — Map Reading Compass GPS Land Navigation',
          'Survival Skills — First Aid Shelter Food Water',
          'Communication — Military Communication Radio Protocol',
          'Teamwork & Group Cohesion — Unit Dynamics Team Building',
          'Discipline & Ethics — Military Code of Conduct',
          'Disaster Management — Natural Disaster Response NDRF',
          'Cybersecurity for Defence — Cyber Warfare Threats Defence',
          'Technology in Defence — Drones Satellites AI in Military',
          'Intelligence Analysis — OSINT Collection Analysis Reporting'
        ],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: Leadership', 'Unit 2: Physical & Navigation', 'Unit 3: Communication', 'Unit 4: Technology', 'Unit 5: Intelligence']
      },
      'Forensic Science Skills': {
        topics: [
          'Forensic Science Introduction — Branches Applications',
          'Criminal Investigation — Scene of Crime Procedure Chain of Custody',
          'Crime Analysis — Pattern Analysis Modus Operandi Profiling',
          'Forensic Science — Physical Biological Chemical Evidence',
          'Digital Forensics — Computer Mobile Network Forensics',
          'Cybercrime Investigation — Phishing Ransomware MITM',
          'Fingerprint Analysis — Types Ridge Patterns AFIS Database',
          'DNA Forensics — PCR STR Analysis DNA Fingerprinting',
          'Evidence Collection — Documentation Packaging Preservation',
          'Criminal Psychology — Profiling Behaviour Analysis Motive',
          'Report Writing — Forensic Report Expert Witness Testimony',
          'Legal Procedures — Evidence Act FIR Chargesheet Court'
        ],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: Forensics Basics', 'Unit 2: Evidence Collection', 'Unit 3: Digital Forensics', 'Unit 4: Criminal Psychology', 'Unit 5: Legal Procedures']
      }
    }
  },

  'Statistics Actuarial Science Skills': {
    icon: '📉', color: '#7c3aed',
    subjects: {
      'Statistics & Data Analysis': {
        topics: [
          'Statistics Introduction — Descriptive vs Inferential',
          'Data Types — Nominal Ordinal Interval Ratio Scales',
          'Measures of Central Tendency — Mean Median Mode Weighted',
          'Measures of Dispersion — Variance SD Range IQR CV',
          'Probability Fundamentals — Sample Space Events Rules',
          'Probability Distributions — Binomial Poisson Normal Exponential',
          'Sampling Methods — Simple Random Stratified Cluster Systematic',
          'Hypothesis Testing — Null Alternative Type I Type II Error',
          't-test — One Sample Two Sample Paired t-test',
          'ANOVA — One-way Two-way MANOVA F-statistic',
          'Chi-Square Test — Goodness of Fit Independence',
          'Regression Analysis — Simple Multiple Logistic Regression',
          'Correlation — Pearson Spearman Kendall Tau',
          'Time Series Analysis — Trend Seasonality ARIMA Forecasting',
          'Bayesian Statistics — Prior Posterior Likelihood Bayes Factor',
          'R Programming — dplyr ggplot2 tidyr Statistical Modelling',
          'Python Statistics — scipy numpy statsmodels pandas',
          'SPSS — Descriptives Frequencies Tests Data View',
          'SAS — PROC MEANS PROC FREQ PROC REG PROC ANOVA',
          'Statistical Modelling — GLM Mixed Models Survival Analysis',
          'Risk Analysis — VaR Expected Shortfall Scenario Analysis',
          'Actuarial Mathematics — Life Tables Annuities Premium Calculation',
          'Financial Mathematics — Time Value Money Bond Pricing Options'
        ],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        units: ['Unit 1: Descriptive Statistics', 'Unit 2: Probability', 'Unit 3: Inferential Statistics', 'Unit 4: Regression & Time Series', 'Unit 5: Actuarial & Financial Math']
      }
    }
  },

  'Vocational ITI Polytechnic Skills': {
    icon: '🔧', color: '#b45309',
    subjects: {
      'ITI Trade Skills': {
        topics: [
          'Electrician Trade — Wiring Circuits Safety Regulations',
          'Fitter Trade — Fitting Filing Drilling Tapping Marking',
          'Welder Trade — Arc Welding MIG TIG Gas Welding Safety',
          'Machinist Trade — Lathe Milling Drilling Operations',
          'Turner Trade — Chuck Work Taper Turning Threading',
          'Mechanic Trade — Motor Vehicle Repair Maintenance',
          'Wireman Trade — Electrical Wiring Panel Switchgear',
          'Electronics Trade — PCB Repair Soldering Testing Instruments',
          'CNC Operation — Programming G-Code M-Code Setup',
          'Refrigeration & AC Trade — Refrigerant Charging Repair',
          'Plumbing Trade — Pipe Fitting Joint Making Sanitary',
          'Draughtsman Trade — Technical Drawing CAD Engineering Drawing',
          'Computer Hardware & Networking — Assembly Troubleshooting'
        ],
        levels: ['Beginner', 'Intermediate'],
        units: ['Unit 1: Electrical Trades', 'Unit 2: Mechanical Trades', 'Unit 3: Electronics', 'Unit 4: CNC & Automation', 'Unit 5: Support Trades']
      },
      'Diploma Engineering Skills': {
        topics: [
          'Engineering Drawing — Orthographic Isometric Sectional Views',
          'CAD — AutoCAD Basics 2D Drawing 3D Modelling',
          'Engineering Mathematics — Algebra Trigonometry Calculus',
          'Basic Electronics — Components Circuits Breadboard Testing',
          'Electrical Systems — AC DC Circuits Transformers Motors',
          'Mechanical Design — Machine Elements Tolerances Fits',
          'Civil Engineering Basics — Surveying Materials Structures',
          'Programming Basics — C C++ Python for Diploma Students',
          'Networking — LAN WAN Protocols TCP/IP Configuration',
          'Industrial Automation — PLC SCADA HMI Basics',
          'Quality Control — Inspection Methods Measurement Standards',
          'Workshop Practice — Safety Tools Hands-on Practical Skills'
        ],
        levels: ['Beginner', 'Intermediate'],
        units: ['Unit 1: Engineering Drawing & CAD', 'Unit 2: Mathematics & Science', 'Unit 3: Core Engineering', 'Unit 4: Programming & Networks', 'Unit 5: Industrial Skills']
      }
    }
  }
}

export default NOTE_TAXONOMY
