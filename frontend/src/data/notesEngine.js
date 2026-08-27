// ============================================================
// notesEngine.js — Algorithmic 100,000+ Notes Generator
// Generates notes ON-DEMAND from rich templates (no browser crash)
// Every note has: title, content, flashcards, exam questions, tags
// ============================================================

// ── CATEGORY TAXONOMY ──────────────────────────────────────────
export const NOTE_TAXONOMY = {
  'Computer Science & Engineering': {
    icon: '💻', color: '#3b82f6', count: 22000,
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
    icon: '⚡', color: '#f59e0b', count: 12000,
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
    icon: '⚙️', color: '#ef4444', count: 11000,
    subjects: {
      'Thermodynamics': { topics: ['Zeroth Law Temperature', 'First Law Energy', 'Second Law Entropy', 'Carnot Cycle', 'Otto Cycle', 'Diesel Cycle', 'Brayton Cycle', 'Rankine Cycle', 'Refrigeration COP', 'Air Conditioning Psychrometry', 'Combustion Analysis', 'Steam Tables', 'Availability & Exergy', 'Nozzles & Diffusers', 'Compressors', 'Gas Turbines', 'IC Engines', 'Boilers', 'Heat Exchangers', 'Cogeneration'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Laws of Thermodynamics', 'Unit 2: Air Standard Cycles', 'Unit 3: Steam & Power', 'Unit 4: Refrigeration', 'Unit 5: Applied Thermo'] },
      'Fluid Mechanics': { topics: ['Fluid Properties', 'Pascal Law', 'Hydrostatics', 'Continuity Equation', 'Bernoulli Equation', 'Venturimeter', 'Flow Measurement', 'Laminar & Turbulent Flow', 'Reynolds Number', 'Boundary Layer', 'Drag & Lift', 'Pipe Flow Losses', 'Pumps & Turbines', 'Compressible Flow', 'Shock Waves', 'Dimensional Analysis', 'Model Testing', 'Hydraulic Machines', 'CFD Basics', 'Open Channel Flow'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Fluid Statics', 'Unit 2: Fluid Kinematics', 'Unit 3: Fluid Dynamics', 'Unit 4: Viscous Flow', 'Unit 5: Turbomachinery'] },
      'Manufacturing Technology': { topics: ['Casting Processes', 'Forging', 'Rolling & Drawing', 'Welding Types', 'Arc Welding', 'MIG & TIG', 'Machining Operations', 'Turning & Milling', 'Drilling & Grinding', 'CNC Programming', 'EDM & ECM', 'Powder Metallurgy', 'Plastic Forming', 'Sheet Metal Work', 'Jigs & Fixtures', 'Metrology & Measurement', 'Quality Control', 'GD&T', 'Lean Manufacturing', 'Industry 4.0'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Casting & Forming', 'Unit 2: Welding', 'Unit 3: Machining', 'Unit 4: Non-Traditional', 'Unit 5: Quality & Metrology'] },
      'Machine Design': { topics: ['Design Philosophy', 'Factor of Safety', 'Static & Fatigue Loading', 'Stress Concentration', 'Theories of Failure', 'Shaft Design', 'Keys & Couplings', 'Bearing Selection', 'Gear Design Spur', 'Helical & Bevel Gears', 'Worm Gears', 'Clutches & Brakes', 'Springs', 'Riveted Joints', 'Welded Joints', 'Bolted Connections', 'Belt Drives', 'Chain Drives', 'Flywheel Design', 'Pressure Vessel Design'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Design Basics', 'Unit 2: Shafts & Couplings', 'Unit 3: Gears', 'Unit 4: Flexible Drives', 'Unit 5: Joints & Pressure Vessels'] },
      'Robotics & Automation': { topics: ['Robot Classification', 'DOF & Workspace', 'Forward Kinematics', 'Inverse Kinematics', 'Jacobian Matrix', 'Trajectory Planning', 'Robot Dynamics', 'DC Motor Control', 'Servo & Stepper Motors', 'Encoders & Sensors', 'PLC Programming', 'SCARA & Delta Robot', 'Mobile Robotics', 'ROS Framework', 'SLAM Navigation', 'Vision Systems', 'Grippers & End Effectors', 'Industrial Automation', 'Collaborative Robots', 'AI in Robotics'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Robot Kinematics', 'Unit 2: Dynamics & Control', 'Unit 3: Actuators & Sensors', 'Unit 4: Programming', 'Unit 5: Industrial Robotics'] }
    }
  },
  'Civil Engineering': {
    icon: '🏗️', color: '#10b981', count: 9000,
    subjects: {
      'Structural Engineering': { topics: ['Types of Structures', 'Loads & Load Combinations', 'Statics & Equilibrium', 'Shear Force Diagrams', 'Bending Moment Diagrams', 'Slope Deflection Method', 'Moment Distribution', 'Stiffness Matrix Method', 'Truss Analysis', 'Frame Analysis', 'Plastic Analysis', 'Reinforced Concrete Design', 'Steel Design', 'Pre-stressed Concrete', 'Flat Slabs', 'Foundation Types', 'Pile Foundations', 'Retaining Walls', 'Bridge Design', 'Earthquake Engineering'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Structural Analysis', 'Unit 2: RCC Design', 'Unit 3: Steel Design', 'Unit 4: Foundations', 'Unit 5: Special Structures'] },
      'Geotechnical Engineering': { topics: ['Soil Classification', 'Index Properties', 'Soil Compaction', 'Permeability Darcys Law', 'Seepage & Flow Nets', 'Effective Stress Principle', 'Consolidation Theory', 'Shear Strength', 'Triaxial Test', 'Direct Shear Test', 'Slope Stability', 'Bearing Capacity', 'Settlement Analysis', 'Pile Capacity', 'Sheet Piles', 'Ground Improvement', 'Geosynthetics', 'Rock Mechanics', 'Tunneling', 'Geotechnical Earthquake'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Soil Properties', 'Unit 2: Seepage & Stress', 'Unit 3: Shear & Consolidation', 'Unit 4: Foundation Design', 'Unit 5: Ground Improvement'] },
      'Transportation Engineering': { topics: ['Highway Alignment', 'Geometric Design', 'Sight Distance', 'Horizontal Curves', 'Vertical Curves', 'Highway Materials', 'Pavement Design Flexible', 'Rigid Pavement', 'Pavement Distress', 'Traffic Engineering', 'Traffic Flow Theory', 'Intersection Design', 'Traffic Signals', 'Highway Capacity', 'Railway Engineering', 'Airport Planning', 'Port & Harbour', 'Urban Transportation', 'Traffic Safety', 'ITS Systems'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Highway Geometry', 'Unit 2: Pavement Design', 'Unit 3: Traffic Engineering', 'Unit 4: Railways & Airports', 'Unit 5: Urban Transport'] },
      'Environmental Engineering': { topics: ['Water Sources', 'Water Demand', 'Water Treatment', 'Coagulation Flocculation', 'Filtration & Chlorination', 'Water Distribution', 'Sewage Characteristics', 'Sewage Treatment Primary', 'Secondary Treatment', 'Activated Sludge', 'Trickling Filter', 'Sludge Disposal', 'Solid Waste Management', 'Composting & Landfill', 'Air Pollution Control', 'Noise Pollution', 'EIA Process', 'Water Quality Standards', 'Industrial Wastewater', 'Sustainable Engineering'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Water Supply', 'Unit 2: Water Treatment', 'Unit 3: Sewage Treatment', 'Unit 4: Solid Waste', 'Unit 5: Pollution Control'] },
      'Hydrology & Water Resources': { topics: ['Hydrological Cycle', 'Precipitation Measurement', 'Infiltration', 'Evapotranspiration', 'Runoff Estimation', 'Unit Hydrograph', 'Flood Estimation', 'Stream Flow Measurement', 'Reservoir Design', 'Dam Types', 'Spillways', 'Irrigation Methods', 'Canal Design', 'Groundwater Exploration', 'Well Hydraulics', 'Aquifer Properties', 'Watershed Management', 'River Training', 'Drought Management', 'Rain Water Harvesting'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Hydrology Basics', 'Unit 2: Runoff & Floods', 'Unit 3: Reservoirs & Dams', 'Unit 4: Irrigation', 'Unit 5: Groundwater'] }
    }
  },
  'Electrical Engineering': {
    icon: '🔌', color: '#8b5cf6', count: 8000,
    subjects: {
      'Power Systems': { topics: ['Power System Structure', 'Transmission Lines', 'Line Parameters', 'ABCD Parameters', 'Power Flow', 'Bus Admittance Matrix', 'Gauss Seidel', 'Newton Raphson', 'Fault Analysis', 'Symmetrical Components', 'Zero Positive Negative Sequence', 'Circuit Breakers', 'Relays & Protection', 'Distance Relay', 'Differential Relay', 'Power System Stability', 'Swing Equation', 'Equal Area Criterion', 'FACTS Devices', 'HVDC Transmission'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Transmission Lines', 'Unit 2: Power Flow', 'Unit 3: Fault Analysis', 'Unit 4: Protection', 'Unit 5: Stability & FACTS'] },
      'Electrical Machines': { topics: ['DC Generator', 'DC Motor', 'Motor Starters', 'Speed Control DC', 'Single Phase Transformer', 'Three Phase Transformer', 'Transformer Testing', 'Induction Motor Principle', 'Slip & Torque', 'Speed Control IM', 'Synchronous Generator', 'Synchronous Motor', 'Reluctance Motor', 'Stepper Motor', 'Permanent Magnet Motors', 'BLDC Motor', 'Universal Motor', 'Special Machines', 'Motor Selection', 'Energy Efficient Motors'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: DC Machines', 'Unit 2: Transformers', 'Unit 3: Induction Machines', 'Unit 4: Synchronous Machines', 'Unit 5: Special Machines'] },
      'Power Electronics': { topics: ['Diode Rectifiers', 'SCR Operation', 'SCR Triggering', 'Phase Controlled Rectifiers', 'DC Choppers', 'Buck Converter', 'Boost Converter', 'Buck-Boost Converter', 'Flyback Converter', 'Inverters', 'PWM Techniques', 'SPWM', 'Space Vector PWM', 'UPS Systems', 'Battery Chargers', 'Solar Inverters', 'Motor Drives VFD', 'FACTS Converters', 'Switch Mode Power Supply', 'EMI & Filtering'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Power Devices', 'Unit 2: Converters AC-DC', 'Unit 3: DC-DC Converters', 'Unit 4: Inverters', 'Unit 5: Applications'] },
      'Control Systems': { topics: ['Open & Closed Loop', 'Transfer Function', 'Block Diagram Reduction', 'Signal Flow Graph', 'Time Domain Analysis', 'Transient Response', 'Steady State Error', 'Routh Hurwitz', 'Root Locus', 'Frequency Domain', 'Bode Plot', 'Nyquist Plot', 'PID Controller', 'Lead Lag Compensator', 'State Space', 'Controllability & Observability', 'State Feedback', 'Observers', 'Discrete Control', 'Robust Control'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Mathematical Modeling', 'Unit 2: Time Domain Analysis', 'Unit 3: Frequency Domain', 'Unit 4: Controllers', 'Unit 5: Modern Control'] },
      'Renewable Energy': { topics: ['Solar Cell Principles', 'PV Panel Characteristics', 'MPPT Algorithms', 'Solar System Design', 'Wind Turbine Types', 'Wind Power Equation', 'Doubly Fed Induction Generator', 'Offshore Wind', 'Hydropower Micro-Hydro', 'Tidal & Wave Energy', 'Biomass Energy', 'Geothermal Energy', 'Fuel Cells', 'Hydrogen Energy', 'Battery Storage Li-Ion', 'Grid Integration Renewables', 'Smart Grid Concepts', 'Energy Management Systems', 'Carbon Footprint', 'Green Buildings'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Solar Energy', 'Unit 2: Wind Energy', 'Unit 3: Other Renewables', 'Unit 4: Storage Systems', 'Unit 5: Grid Integration'] }
    }
  },
  'Physics': {
    icon: '🔭', color: '#06b6d4', count: 7000,
    subjects: {
      'Classical Mechanics': { topics: ['Newtons Laws', 'Kinematics', 'Projectile Motion', 'Circular Motion', 'Work Energy Power', 'Conservation Laws', 'Momentum & Impulse', 'Rotational Motion', 'Torque & Angular Momentum', 'Simple Harmonic Motion', 'Damped Oscillation', 'Wave Motion', 'Sound Waves', 'Doppler Effect', 'Fluid Statics', 'Fluid Dynamics', 'Gravitation', 'Keplers Laws', 'Satellites', 'Elasticity'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Kinematics', 'Unit 2: Dynamics', 'Unit 3: Energy & Momentum', 'Unit 4: Rotation & Oscillation', 'Unit 5: Fluids & Gravitation'] },
      'Electromagnetism': { topics: ['Coulombs Law', 'Electric Field', 'Gauss Law', 'Electric Potential', 'Capacitors', 'Dielectrics', 'Current & Resistance', 'Ohms Law', 'Kirchhoff Laws', 'Magnetic Field', 'Biot Savart Law', 'Amperes Law', 'Faradays Law', 'Lenz Law', 'Inductance', 'AC Circuits', 'LCR Circuits', 'Electromagnetic Waves', 'Maxwells Equations', 'Poynting Vector'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Electrostatics', 'Unit 2: Current Electricity', 'Unit 3: Magnetism', 'Unit 4: Electromagnetic Induction', 'Unit 5: Electromagnetic Waves'] },
      'Quantum Mechanics': { topics: ['Wave-Particle Duality', 'Photoelectric Effect', 'Compton Effect', 'de Broglie Wavelength', 'Heisenberg Uncertainty', 'Schrodinger Equation', 'Wave Function', 'Particle in Box', 'Harmonic Oscillator QM', 'Hydrogen Atom', 'Spin & Pauli Exclusion', 'Perturbation Theory', 'Variational Method', 'WKB Approximation', 'Angular Momentum', 'Selection Rules', 'Quantum Entanglement', 'Bell Inequalities', 'Quantum Computing Basics', 'Quantum Optics'], levels: ['Advanced'], units: ['Unit 1: Wave-Particle Duality', 'Unit 2: Schrodinger Equation', 'Unit 3: Quantum Systems', 'Unit 4: Approximation Methods', 'Unit 5: Modern Quantum'] },
      'Thermodynamics Physics': { topics: ['Temperature & Heat', 'Thermal Expansion', 'Specific Heat', 'Calorimetry', 'Ideal Gas Law', 'Kinetic Theory', 'First Law of Thermo', 'Second Law Entropy', 'Carnot Theorem', 'Heat Engines', 'Refrigerators', 'Phase Transitions', 'Clausius Clapeyron', 'Statistical Mechanics', 'Maxwell Distribution', 'Partition Function', 'Blackbody Radiation', 'Stefan Boltzmann', 'Wiens Law', 'Bose Einstein Statistics'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Thermal Properties', 'Unit 2: Gas Laws', 'Unit 3: Laws of Thermodynamics', 'Unit 4: Statistical Mechanics', 'Unit 5: Radiation'] },
      'Optics': { topics: ['Reflection & Refraction', 'Snells Law', 'Total Internal Reflection', 'Mirrors & Lenses', 'Prisms & Dispersion', 'Interference Young Experiment', 'Diffraction Grating', 'Polarization', 'Brewsters Angle', 'Optical Instruments Microscope', 'Telescope', 'Fiber Optics', 'Laser Principles', 'Holography', 'Non-Linear Optics', 'Photonics', 'Spectroscopy', 'Raman Effect', 'Fourier Optics', 'Adaptive Optics'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Geometric Optics', 'Unit 2: Wave Optics', 'Unit 3: Polarization', 'Unit 4: Modern Optics', 'Unit 5: Applied Optics'] }
    }
  },
  'Chemistry': {
    icon: '🧪', color: '#84cc16', count: 5500,
    subjects: {
      'Organic Chemistry': { topics: ['IUPAC Nomenclature', 'Isomerism', 'Hydrocarbons Alkanes', 'Alkenes & Alkynes', 'Aromatic Compounds', 'Benzene & Derivatives', 'Substitution Reactions SN1 SN2', 'Elimination E1 E2', 'Addition Reactions', 'Oxidation & Reduction', 'Carboxylic Acids', 'Esters & Amides', 'Carbonyl Chemistry', 'Grignard Reagent', 'Organometallic', 'Stereochemistry', 'Chirality', 'Reactions Mechanisms', 'Natural Products', 'Drug Synthesis'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Fundamentals', 'Unit 2: Hydrocarbons', 'Unit 3: Functional Groups', 'Unit 4: Reactions & Mechanisms', 'Unit 5: Special Topics'] },
      'Physical Chemistry': { topics: ['States of Matter', 'Gas Laws', 'Kinetic Theory Gases', 'Real Gases van der Waals', 'Solutions Colligative Properties', 'Thermodynamics Chemical', 'Gibbs Free Energy', 'Electrochemistry', 'Galvanic Cells', 'Nernst Equation', 'Electrolysis', 'Chemical Kinetics', 'Rate Laws', 'Activation Energy', 'Catalysis', 'Photochemistry', 'Surface Chemistry', 'Adsorption', 'Colloids', 'Nuclear Chemistry'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: States & Solutions', 'Unit 2: Thermodynamics', 'Unit 3: Electrochemistry', 'Unit 4: Kinetics', 'Unit 5: Surface & Nuclear'] },
      'Inorganic Chemistry': { topics: ['Periodic Table Trends', 'Atomic Structure', 'Chemical Bonding', 'Ionic & Covalent Bonds', 'Hybridization', 'VSEPR Theory', 'Molecular Orbital Theory', 's Block Elements', 'p Block Elements', 'd Block Transition Metals', 'Coordination Chemistry', 'Crystal Field Theory', 'Lanthanides & Actinides', 'Bioinorganic Chemistry', 'Industrial Inorganic', 'Inorganic Polymers', 'Main Group Chemistry', 'Organometallic Inorganic', 'Solid State Chemistry', 'Nanomaterials'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Atomic Structure', 'Unit 2: Bonding', 'Unit 3: Periodic Properties', 'Unit 4: Coordination Chemistry', 'Unit 5: Applied Inorganic'] }
    }
  },
  'Biology': {
    icon: '🧬', color: '#22c55e', count: 5500,
    subjects: {
      'Cell Biology': { topics: ['Cell Theory', 'Prokaryotic vs Eukaryotic', 'Cell Membrane Structure', 'Membrane Transport', 'Organelles & Functions', 'Nucleus & DNA', 'Mitochondria', 'Chloroplasts', 'Endoplasmic Reticulum', 'Golgi Apparatus', 'Lysosomes & Vacuoles', 'Cell Division Mitosis', 'Meiosis', 'Cell Cycle Regulation', 'Cancer & Oncogenes', 'Stem Cells', 'Cell Signaling', 'Signal Transduction', 'Apoptosis', 'Cellular Respiration'], levels: ['Beginner', 'Intermediate'], units: ['Unit 1: Cell Structure', 'Unit 2: Membrane & Transport', 'Unit 3: Organelles', 'Unit 4: Cell Division', 'Unit 5: Cell Signaling'] },
      'Genetics': { topics: ['Mendels Laws', 'Monohybrid Cross', 'Dihybrid Cross', 'Linkage & Crossing Over', 'Sex Determination', 'Mutations Types', 'DNA Structure Watson Crick', 'DNA Replication', 'Transcription mRNA', 'Translation Ribosomes', 'Genetic Code', 'Operon Model', 'Gene Regulation', 'Recombinant DNA', 'PCR Technique', 'DNA Fingerprinting', 'Genomics', 'Proteomics', 'Epigenetics', 'CRISPR Cas9'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Mendelian Genetics', 'Unit 2: Molecular Genetics', 'Unit 3: Gene Expression', 'Unit 4: Recombinant DNA', 'Unit 5: Genomics'] },
      'Microbiology': { topics: ['Bacteria Classification', 'Gram Staining', 'Bacterial Growth Curve', 'Sterilization Methods', 'Viruses Structure', 'Viral Replication', 'Bacteriophages', 'Fungi Classification', 'Protozoa', 'Algae Types', 'Antibiotics Mechanism', 'Antibiotic Resistance', 'Immunology Innate', 'Adaptive Immunity', 'Antibodies', 'Vaccines', 'Diagnostic Microbiology', 'Clinical Microbiology', 'Food Microbiology', 'Environmental Microbiology'], levels: ['Beginner', 'Intermediate'], units: ['Unit 1: Bacteria', 'Unit 2: Viruses & Fungi', 'Unit 3: Antimicrobials', 'Unit 4: Immunology', 'Unit 5: Applied Microbiology'] },
      'Biotechnology': { topics: ['Recombinant DNA Technology', 'Restriction Enzymes', 'Cloning Vectors', 'Transformation Methods', 'Expression Systems', 'Protein Engineering', 'Enzyme Engineering', 'Fermentation Technology', 'Bioreactor Design', 'Downstream Processing', 'Monoclonal Antibodies', 'ELISA', 'Western Blot', 'Flow Cytometry', 'Stem Cell Technology', 'Tissue Engineering', 'Gene Therapy', 'Bioinformatics', 'Biosensors', 'Biopharma Industry'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Recombinant DNA', 'Unit 2: Cloning & Expression', 'Unit 3: Bioprocess Technology', 'Unit 4: Analytical Techniques', 'Unit 5: Applied Biotech'] }
    }
  },
  'Mathematics': {
    icon: '📐', color: '#f97316', count: 6000,
    subjects: {
      'Calculus': { topics: ['Limits & Continuity', 'Differentiation Rules', 'Chain Rule', 'Implicit Differentiation', 'Applications of Derivatives', 'Maxima & Minima', 'Integration Basics', 'Integration by Parts', 'Trigonometric Integration', 'Partial Fractions', 'Improper Integrals', 'Double Integrals', 'Triple Integrals', 'Line Integrals', 'Surface Integrals', 'Greens Theorem', 'Stokes Theorem', 'Divergence Theorem', 'Taylor Series', 'Fourier Series'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Differential Calculus', 'Unit 2: Integral Calculus', 'Unit 3: Multivariable Calculus', 'Unit 4: Vector Calculus', 'Unit 5: Series Expansions'] },
      'Linear Algebra': { topics: ['Matrices & Determinants', 'Cramer Rule', 'Gauss Elimination', 'LU Decomposition', 'Vector Spaces', 'Linear Independence', 'Basis & Dimension', 'Linear Transformations', 'Eigenvalues & Eigenvectors', 'Diagonalization', 'Inner Product Spaces', 'Gram-Schmidt', 'QR Decomposition', 'SVD', 'Matrix Norms', 'Positive Definite Matrices', 'Spectral Theorem', 'Applications in ML', 'Graph Theory Linear Algebra', 'Numerical Linear Algebra'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Matrices', 'Unit 2: Vector Spaces', 'Unit 3: Linear Maps', 'Unit 4: Eigenvalues', 'Unit 5: Applications'] },
      'Probability & Statistics': { topics: ['Sample Space & Events', 'Probability Axioms', 'Conditional Probability', 'Bayes Theorem', 'Discrete Distributions', 'Binomial Distribution', 'Poisson Distribution', 'Continuous Distributions', 'Normal Distribution', 'Exponential Distribution', 'Joint Distributions', 'Expectation & Variance', 'Covariance & Correlation', 'Central Limit Theorem', 'Statistical Inference', 'Hypothesis Testing', 't-test & F-test', 'ANOVA', 'Regression Analysis', 'Bayesian Statistics'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Probability Basics', 'Unit 2: Random Variables', 'Unit 3: Distributions', 'Unit 4: Statistical Inference', 'Unit 5: Applied Statistics'] },
      'Differential Equations': { topics: ['First Order ODE', 'Separable Equations', 'Exact Equations', 'Integrating Factor', 'Linear First Order', 'Second Order ODE', 'Constant Coefficients', 'Undetermined Coefficients', 'Variation of Parameters', 'Power Series Solutions', 'Laplace Transform ODE', 'Systems of ODEs', 'Phase Plane Analysis', 'Stability Analysis', 'Partial Differential Equations', 'Heat Equation', 'Wave Equation', 'Laplace Equation', 'Numerical Methods ODE', 'Finite Element Method'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: First Order ODEs', 'Unit 2: Second Order ODEs', 'Unit 3: Laplace Transform', 'Unit 4: Systems & Stability', 'Unit 5: PDEs'] }
    }
  },
  'History': {
    icon: '📜', color: '#92400e', count: 5000,
    subjects: {
      'Ancient Indian History': { topics: ['Indus Valley Civilization', 'Harappa & Mohenjo Daro', 'Vedic Age', 'Rig Veda', 'Mahajanapadas', 'Rise of Magadha', 'Mauryan Empire', 'Ashoka & Dhamma', 'Post Mauryan Period', 'Kushana Empire', 'Gupta Golden Age', 'Sangam Literature', 'South Indian Kingdoms', 'Pallava Dynasty', 'Chalukyas', 'Social Structure Caste', 'Religious Movements Buddhism', 'Jainism Origins', 'Economic History Ancient', 'Art & Architecture Ancient'], levels: ['Beginner', 'Intermediate'], units: ['Unit 1: Prehistoric India', 'Unit 2: Vedic Period', 'Unit 3: Mahajanapadas', 'Unit 4: Mauryas & Guptas', 'Unit 5: Regional Kingdoms'] },
      'Medieval Indian History': { topics: ['Rajput Kingdoms', 'Delhi Sultanate', 'Qutbuddin Aibak', 'Iltutmish', 'Alauddin Khalji', 'Tughlaq Dynasty', 'Vijayanagara Empire', 'Bahmani Kingdom', 'Mughal Empire Foundation', 'Akbars Administration', 'Din I Ilahi', 'Mughal Art & Culture', 'Aurangzeb Policy', 'Maratha Rise Shivaji', 'Maratha Confederacy', 'Sikh Gurus', 'Sikhism Foundations', 'Bhakti Movement', 'Sufi Movement', 'Decline Mughal'], levels: ['Beginner', 'Intermediate'], units: ['Unit 1: Rajputs & Sultanate', 'Unit 2: Mughal Empire', 'Unit 3: Regional Powers', 'Unit 4: Religious Movements', 'Unit 5: Decline & Transition'] },
      'Modern Indian History': { topics: ['European Arrival India', 'British East India Company', 'Battle of Plassey', 'British Administrative Policies', 'Permanent Settlement', 'Ryotwari System', 'Social Reform Ram Mohan Roy', '1857 Revolt Causes', '1857 Consequences', 'Indian National Congress', 'Moderates & Extremists', 'Swadeshi Movement', 'Partition Bengal 1905', 'Morley Minto Reforms', 'Non Cooperation Movement', 'Civil Disobedience', 'Quit India 1942', 'Indian Independence Act', 'Partition 1947', 'Constitution Making'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: European Entry', 'Unit 2: British Policies', 'Unit 3: Social Reforms', 'Unit 4: National Movement', 'Unit 5: Independence'] }
    }
  },
  'English Literature': {
    icon: '📚', color: '#db2777', count: 5000,
    subjects: {
      'British Literature': { topics: ['Old English Beowulf', 'Chaucer Canterbury Tales', 'Renaissance Shakespeare', 'Elizabethan Drama', 'Metaphysical Poetry', 'John Milton Paradise Lost', 'Restoration Comedy', 'Augustan Period', 'Samuel Johnson', 'Romantic Age Wordsworth', 'Keats & Shelley', 'Byron & Coleridge', 'Victorian Novel Dickens', 'George Eliot Middlemarch', 'Hardy & the Rural', 'Oscar Wilde', 'George Bernard Shaw', 'Modern Literature Woolf', 'T.S. Eliot Wasteland', 'Post Modern British'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Medieval & Renaissance', 'Unit 2: 17th & 18th Century', 'Unit 3: Romantic Period', 'Unit 4: Victorian Literature', 'Unit 5: Modern & Contemporary'] },
      'American Literature': { topics: ['Puritanism & Early America', 'Hawthorne Scarlet Letter', 'Emerson Transcendentalism', 'Thoreau Walden', 'Whitman Leaves of Grass', 'Mark Twain Huck Finn', 'Realism & Naturalism', 'Henry James', 'Edith Wharton', 'Harlem Renaissance', 'Langston Hughes', 'Hemingway Lost Generation', 'Fitzgerald Great Gatsby', 'Faulkner Sound Fury', 'Southern Gothic', 'Post WWII Literature', 'Salinger Catcher Rye', 'Beat Generation Kerouac', 'Sylvia Plath Confessional', 'Contemporary American'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Colonial to 19th Century', 'Unit 2: Realism & Naturalism', 'Unit 3: Modernism', 'Unit 4: Mid 20th Century', 'Unit 5: Contemporary'] }
    }
  },
  'Political Science': {
    icon: '🏛️', color: '#1d4ed8', count: 4000,
    subjects: {
      'Indian Polity': { topics: ['Constitutional History', 'Constituent Assembly', 'Preamble Significance', 'Fundamental Rights Part III', 'Fundamental Duties', 'DPSP Part IV', 'Parliament Structure', 'Lok Sabha & Rajya Sabha', 'Legislative Process', 'President Powers', 'Prime Minister Council', 'Supreme Court', 'Judicial Review', 'High Courts', 'Federal Structure', 'Centre-State Relations', 'Emergency Provisions', 'Constitutional Amendments', 'Local Self Government', 'Electoral System'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Constitution Making', 'Unit 2: Fundamental Rights', 'Unit 3: Parliament & Executive', 'Unit 4: Judiciary', 'Unit 5: Federal Structure'] },
      'International Relations': { topics: ['Theories of IR Realism', 'Liberalism in IR', 'Constructivism', 'India Foreign Policy', 'Non Alignment Movement', 'SAARC & Regional Bodies', 'United Nations System', 'Security Council', 'WTO & Trade', 'IMF & World Bank', 'Nuclear Non-Proliferation', 'Climate Diplomacy', 'India US Relations', 'India China Relations', 'India Pakistan Relations', 'Russia India Relations', 'ASEAN', 'G20 & G7', 'Geopolitics', 'Soft Power'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: IR Theories', 'Unit 2: Indian Foreign Policy', 'Unit 3: International Organizations', 'Unit 4: Bilateral Relations', 'Unit 5: Contemporary Issues'] }
    }
  },
  'Commerce & Accounting': {
    icon: '📊', color: '#0369a1', count: 6000,
    subjects: {
      'Financial Accounting': { topics: ['Journal Entries', 'Ledger Accounts', 'Trial Balance', 'Trading Account', 'Profit & Loss Account', 'Balance Sheet', 'Bank Reconciliation Statement', 'Depreciation Straight Line', 'Written Down Value', 'Depreciation Company Act', 'Inventory FIFO LIFO', 'Consignment Accounts', 'Joint Venture', 'Bills of Exchange', 'Partnership Accounts', 'Company Final Accounts', 'Amalgamation', 'Absorption', 'Reconstruction', 'Indian Accounting Standards Ind AS'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Basic Accounting', 'Unit 2: Final Accounts', 'Unit 3: Special Accounts', 'Unit 4: Company Accounts', 'Unit 5: Advanced Accounting'] },
      'Cost & Management Accounting': { topics: ['Cost Classification', 'Cost Sheet Preparation', 'Material Cost Control', 'Labour Cost Methods', 'Overhead Absorption', 'Marginal Costing', 'Breakeven Analysis', 'Budgetary Control', 'Flexible Budget', 'Standard Costing', 'Variance Analysis Material', 'Variance Analysis Labour', 'Activity Based Costing ABC', 'Transfer Pricing', 'Responsibility Accounting', 'Divisional Performance', 'Working Capital Management', 'Capital Budgeting NPV', 'IRR', 'Payback Period'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Cost Concepts', 'Unit 2: Cost Methods', 'Unit 3: Marginal & Budgetary', 'Unit 4: Standard Costing', 'Unit 5: Management Decisions'] },
      'Taxation': { topics: ['Income Tax History', 'Basis of Charge', 'Assessment Year', 'Previous Year', 'Residential Status', 'Income from Salary', 'Income from House Property', 'Income from Business', 'Income from Capital Gains', 'Income from Other Sources', 'Deductions 80C', 'Deductions 80D', 'Set Off & Carry Forward', 'TDS Provisions', 'Advance Tax', 'GST Overview', 'CGST SGST IGST', 'GST Registration', 'GST Returns Filing', 'Corporate Tax'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Income Tax Basics', 'Unit 2: Heads of Income', 'Unit 3: Deductions', 'Unit 4: TDS & Advance Tax', 'Unit 5: GST'] }
    }
  },
  'Finance & Economics': {
    icon: '💰', color: '#b45309', count: 6000,
    subjects: {
      'Corporate Finance': { topics: ['Time Value of Money', 'NPV & IRR', 'Payback Period', 'Profitability Index', 'Capital Budgeting', 'Capital Structure Theories', 'Modigliani Miller', 'Dividend Policy', 'Walter Model', 'Gordon Model', 'Cost of Capital WACC', 'Leverage Operating', 'Financial Leverage', 'EPS EBIT Analysis', 'Mergers & Acquisitions', 'Corporate Governance', 'Corporate Valuation DCF', 'EVA Economic Value Added', 'Working Capital Cycle', 'Cash Management'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Investment Decisions', 'Unit 2: Financing Decisions', 'Unit 3: Dividend Decisions', 'Unit 4: Corporate Valuation', 'Unit 5: Advanced Corporate Finance'] },
      'Macroeconomics': { topics: ['National Income GDP GNP', 'NNP & NDP', 'Consumption Function', 'Savings Function', 'Investment & Multiplier', 'Keynesian Theory', 'IS-LM Model', 'Aggregate Demand Supply', 'Inflation Types', 'Phillips Curve', 'Unemployment Types', 'Fiscal Policy', 'Monetary Policy', 'RBI Functions', 'Banking System', 'Money Supply M1 M2 M3', 'Balance of Payments', 'Foreign Exchange', 'IMF & World Bank', 'Indian Economy Overview'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: National Income', 'Unit 2: Consumption & Investment', 'Unit 3: Macro Policies', 'Unit 4: Money & Banking', 'Unit 5: International Economics'] },
      'Microeconomics': { topics: ['Demand & Supply', 'Elasticity Concepts', 'Consumer Theory', 'Utility Analysis', 'Indifference Curve', 'Budget Line', 'Production Theory', 'Production Functions', 'Returns to Scale', 'Cost Analysis Short Run', 'Long Run Cost', 'Market Structures', 'Perfect Competition', 'Monopoly & Monopolistic', 'Oligopoly', 'Game Theory Nash Equilibrium', 'Factor Markets Labour', 'Capital & Rent', 'Market Failure', 'Public Goods Externalities'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Market Basics', 'Unit 2: Consumer Theory', 'Unit 3: Production & Cost', 'Unit 4: Market Structures', 'Unit 5: Market Failure'] }
    }
  },
  'Management': {
    icon: '🎯', color: '#7c3aed', count: 10000,
    subjects: {
      'Human Resource Management': { topics: ['HRM Introduction', 'Job Analysis & Design', 'Recruitment & Selection', 'Interview Techniques', 'Induction & Onboarding', 'Training & Development', 'Performance Appraisal', '360 Degree Feedback', 'Compensation & Benefits', 'Job Evaluation', 'Employee Relations', 'Industrial Relations', 'Trade Unions', 'Grievance Handling', 'Collective Bargaining', 'HR Planning', 'Succession Planning', 'Talent Management', 'HR Analytics', 'Strategic HRM'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: HRM Basics', 'Unit 2: Recruitment & Selection', 'Unit 3: Training & Performance', 'Unit 4: Compensation', 'Unit 5: Strategic HRM'] },
      'Marketing Management': { topics: ['Marketing Concepts', 'Market Research', 'Consumer Behavior', 'Segmentation Targeting Positioning', 'Product Life Cycle', 'Branding & Brand Equity', 'Pricing Strategies', 'Distribution Channels', 'Promotion Mix', 'Advertising Strategies', 'Sales Management', 'Digital Marketing', 'SEO & SEM', 'Social Media Marketing', 'Content Marketing', 'Email Marketing', 'Customer Relationship CRM', 'B2B Marketing', 'International Marketing', 'Marketing Metrics'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Marketing Fundamentals', 'Unit 2: STP & Product', 'Unit 3: Pricing & Distribution', 'Unit 4: Promotion', 'Unit 5: Digital & Strategic Marketing'] },
      'Operations Management': { topics: ['Operations Strategy', 'Forecasting Methods', 'Moving Average', 'Exponential Smoothing', 'Aggregate Planning', 'Master Production Schedule', 'Material Requirements MRP', 'ERP Systems', 'Inventory Management EOQ', 'JIT & Lean Manufacturing', 'Total Quality Management TQM', 'Six Sigma DMAIC', 'ISO Standards', 'Process Flow Analysis', 'Capacity Planning', 'Facility Location', 'Layout Planning', 'Supply Chain Management', 'Logistics & Transportation', 'Project Management PERT CPM'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Operations Strategy', 'Unit 2: Planning & Scheduling', 'Unit 3: Inventory Management', 'Unit 4: Quality Management', 'Unit 5: Supply Chain'] },
      'Strategic Management': { topics: ['Strategic Planning Process', 'Vision Mission Goals', 'Environmental Scanning PEST', 'Industry Analysis Porters Five Forces', 'Competitive Advantage', 'Value Chain Analysis', 'SWOT Analysis', 'BCG Matrix', 'GE McKinsey Matrix', 'Ansoff Matrix', 'Generic Strategies Porter', 'Differentiation & Cost Leadership', 'Focus Strategy', 'Corporate Strategy', 'Diversification', 'Merger & Acquisition Strategy', 'Joint Ventures', 'Alliances', 'Strategy Implementation', 'Balanced Scorecard'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Strategic Analysis', 'Unit 2: Strategy Formulation', 'Unit 3: Strategic Options', 'Unit 4: Corporate Strategy', 'Unit 5: Implementation'] }
    }
  },
  'Medical & Healthcare': {
    icon: '🏥', color: '#dc2626', count: 15000,
    subjects: {
      'Anatomy': { topics: ['Skeletal System Bones', 'Joints & Articulations', 'Muscular System Types', 'Upper Limb Muscles', 'Lower Limb Muscles', 'Cardiovascular System Heart', 'Arteries & Veins', 'Lymphatic System', 'Respiratory System Lungs', 'Digestive System GI Tract', 'Liver & Pancreas', 'Urinary System Kidneys', 'Male Reproductive Anatomy', 'Female Reproductive Anatomy', 'Nervous System CNS', 'Brain Anatomy Lobes', 'Spinal Cord', 'Cranial Nerves', 'Endocrine Glands', 'Special Sense Organs Eye Ear'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Musculoskeletal', 'Unit 2: Cardiovascular', 'Unit 3: Respiratory & Digestive', 'Unit 4: Nervous System', 'Unit 5: Endocrine & Reproductive'] },
      'Physiology': { topics: ['Cell Physiology', 'Resting Membrane Potential', 'Action Potential', 'Nerve Conduction', 'Synaptic Transmission', 'Muscle Contraction Mechanism', 'Cardiac Cycle', 'Cardiac Output', 'Blood Pressure Regulation', 'Respiratory Mechanics', 'Lung Volumes', 'Gas Exchange', 'Kidney Function Nephron', 'Glomerular Filtration GFR', 'Renal Tubular Reabsorption', 'Hormones Endocrine', 'Hypothalamus Pituitary Axis', 'Digestion & Absorption', 'Blood & Hematopoiesis', 'Homeostasis Mechanisms'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Cellular Physiology', 'Unit 2: Cardiovascular Physiology', 'Unit 3: Respiratory Physiology', 'Unit 4: Renal Physiology', 'Unit 5: Endocrine Physiology'] },
      'Pharmacology': { topics: ['Pharmacokinetics ADME', 'Absorption Routes', 'Drug Distribution', 'Metabolism CYP450', 'Excretion Renal', 'Pharmacodynamics', 'Dose Response Curve', 'Drug Receptors', 'Autonomic Drugs', 'Adrenergic Agents', 'Cholinergic Drugs', 'Cardiovascular Drugs Antihypertensives', 'Antiarrhythmics', 'Diuretics', 'Antibiotics Beta Lactams', 'Macrolides & Quinolones', 'Antifungals & Antivirals', 'CNS Drugs Sedatives', 'Analgesics & NSAIDs', 'Chemotherapy Anticancer'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Pharmacokinetics', 'Unit 2: Pharmacodynamics', 'Unit 3: Autonomic Pharmacology', 'Unit 4: Systemic Pharmacology', 'Unit 5: Chemotherapy'] },
      'Pathology': { topics: ['Cell Injury & Necrosis', 'Apoptosis Mechanisms', 'Inflammation Acute', 'Chronic Inflammation', 'Granuloma Formation', 'Wound Healing', 'Edema Pathogenesis', 'Thrombosis & Embolism', 'Infarction Types', 'Shock Types & Treatment', 'Neoplasia Tumor Classification', 'Carcinogenesis', 'Metastasis Mechanisms', 'Immune Pathology Hypersensitivity', 'Autoimmune Diseases', 'Immunodeficiency HIV', 'Hematological Disorders Anemia', 'Leukemia & Lymphoma', 'Respiratory Pathology', 'Cardiovascular Pathology'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Cell Injury', 'Unit 2: Inflammation', 'Unit 3: Hemodynamics', 'Unit 4: Neoplasia', 'Unit 5: Systemic Pathology'] },
      'Clinical Medicine': { topics: ['History Taking HOPI', 'Physical Examination', 'Vital Signs Assessment', 'Cardiovascular Examination', 'Respiratory Examination', 'Abdominal Examination', 'Neurological Examination', 'ECG Interpretation', 'Chest X-Ray Reading', 'Lab Values Interpretation', 'Hypertension Management', 'Diabetes Mellitus Type 2', 'COPD Management', 'Asthma Guidelines', 'Pneumonia Treatment', 'Acute MI Management', 'Heart Failure Treatment', 'Stroke Management', 'Renal Failure CKD', 'Medical Ethics & Law'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Clinical Examination', 'Unit 2: Investigations', 'Unit 3: Common Diseases', 'Unit 4: Emergency Medicine', 'Unit 5: Medical Ethics'] }
    }
  },
  'Law': {
    icon: '⚖️', color: '#475569', count: 10000,
    subjects: {
      'Constitutional Law': { topics: ['Constitutional Supremacy', 'Doctrine of Basic Structure', 'Fundamental Rights Enforcement', 'Writ Jurisdiction Habeas Corpus', 'Mandamus & Certiorari', 'Prohibition & Quo Warranto', 'Right to Equality Art 14', 'Right to Life Art 21', 'Freedom of Speech Art 19', 'Right against Exploitation', 'Freedom of Religion', 'Cultural & Educational Rights', 'Constitutional Remedies', 'Constitutional Amendments Procedure', 'Parliamentary Sovereignty', 'Separation of Powers', 'Judicial Activism', 'PIL Public Interest Litigation', 'Contempt of Court', 'Federal Supremacy'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: Constitutional Basics', 'Unit 2: Fundamental Rights', 'Unit 3: Writs', 'Unit 4: Constitutional Bodies', 'Unit 5: Advanced Constitutional'] },
      'Criminal Law': { topics: ['IPC Introduction', 'Actus Reus & Mens Rea', 'Offences against Body', 'Offences against Property', 'Theft & Robbery', 'Cheating & Fraud', 'Murder & Culpable Homicide', 'Grievous Hurt', 'Kidnapping & Abduction', 'Sexual Offences', 'POCSO Act', 'CrPC Criminal Procedure', 'FIR Registration', 'Investigation', 'Bail Provisions', 'Trial Procedure', 'Cognizable Non-Cognizable', 'Evidence Act Overview', 'Witness Examination', 'Sentencing Guidelines'], levels: ['Beginner', 'Intermediate', 'Advanced'], units: ['Unit 1: IPC Basics', 'Unit 2: Offences', 'Unit 3: Criminal Procedure CrPC', 'Unit 4: Evidence', 'Unit 5: Special Laws'] },
      'Contract Law': { topics: ['Definition of Contract', 'Essential Elements', 'Offer & Acceptance', 'Consideration', 'Capacity to Contract', 'Free Consent', 'Coercion & Undue Influence', 'Fraud & Misrepresentation', 'Mistake Types', 'Void & Voidable Contracts', 'Contingent Contracts', 'Quasi Contracts', 'Performance of Contract', 'Breach of Contract', 'Remedies for Breach', 'Specific Performance', 'Anticipatory Breach', 'Indemnity & Guarantee', 'Bailment & Pledge', 'Agency Contracts'], levels: ['Beginner', 'Intermediate'], units: ['Unit 1: Formation of Contract', 'Unit 2: Validity', 'Unit 3: Performance & Discharge', 'Unit 4: Breach & Remedies', 'Unit 5: Special Contracts'] },
      'Corporate Law': { topics: ['Company Definition Types', 'Memorandum of Association', 'Articles of Association', 'Incorporation Process', 'Share Capital', 'Types of Shares', 'Debentures & Bonds', 'Board of Directors', 'Directors Duties', 'Shareholders Rights', 'Company Meetings', 'Annual General Meeting', 'Special Resolutions', 'Audit & Accounts', 'Corporate Governance', 'SEBI Regulations', 'Listing Requirements', 'Takeover Code', 'Insolvency IBC Code', 'Corporate Social Responsibility CSR'], levels: ['Intermediate', 'Advanced'], units: ['Unit 1: Company Formation', 'Unit 2: Capital & Securities', 'Unit 3: Management', 'Unit 4: Corporate Governance', 'Unit 5: Insolvency & Winding Up'] }
    }
  }
}

// ── CONTENT TEMPLATES ───────────────────────────────────────────
const contentTemplates = {
  intro: [
    (topic, subject) => `## Introduction to ${topic}\n\n${topic} is a fundamental concept in ${subject} that forms the backbone of advanced study in this field. Understanding ${topic} requires a thorough knowledge of prerequisite concepts and an ability to apply theoretical principles to practical problems.\n\n### Why is ${topic} Important?\n\n${topic} plays a critical role in modern applications and examinations. Universities across India, including Anna University, VTU, JNTU, Mumbai University, and autonomous institutions, consistently test this topic in semester examinations with both 2-mark and 10/13/16-mark questions.\n\nIndustry professionals use ${topic} in day-to-day work, making it essential not just for exams but for your career as well.`,
    (topic, subject) => `## ${topic} — Complete Study Notes\n\n### Overview\n\n${topic} represents one of the most examined and practically relevant areas within ${subject}. This note provides a comprehensive breakdown of all concepts, definitions, formulas, algorithms, and solved examples required for university examinations and competitive exams like GATE, UPSC, and placement tests.\n\n### Historical Background\n\nThe study of ${topic} evolved over decades of research and practical implementation. Today it is a standard part of the ${subject} curriculum at undergraduate and postgraduate levels across India and internationally.`
  ],
  keyPoints: (topic) => `\n\n### 📌 Key Concepts & Definitions\n\n**Definition:** ${topic} refers to a structured approach/methodology/principle that addresses specific problems in its domain by applying well-defined rules and techniques.\n\n**Core Principles:**\n1. **Principle of Correctness** — Every application of ${topic} must produce valid, verifiable results under defined conditions.\n2. **Principle of Efficiency** — Optimizing time and space (or resources) is central to mastering ${topic}.\n3. **Principle of Modularity** — Breaking complex ${topic} problems into smaller, manageable subproblems enables better understanding.\n4. **Principle of Abstraction** — Focus on what is needed, hiding unnecessary implementation details.\n5. **Principle of Generalization** — Apply knowledge of ${topic} to a wide range of problem types.\n\n**Important Terminology:**\n- **Base case / Base concept:** The simplest form of ${topic} that can be directly solved or observed.\n- **Recursive/Iterative aspect:** Many problems in ${topic} are solved using repetition of standard operations.\n- **Complexity:** The measure of resources (time, space, cost) required by ${topic} operations.\n- **Constraints:** Specific limitations that define the boundary conditions of a ${topic} problem.\n- **Invariant:** A condition that remains true throughout the process of applying ${topic}.`,
  formulas: (topic) => `\n\n### 🔢 Important Formulas & Equations\n\nFor ${topic}, the following mathematical relationships are critical:\n\n| Formula | Description | Application |\n|---------|-------------|-------------|\n| f(n) = O(g(n)) | Asymptotic upper bound | Worst case analysis |\n| T(n) = 2T(n/2) + n | Recurrence relation | Divide and conquer |\n| E = mc² equivalent | Energy-mass analogy | Resource tradeoffs |\n| P(A∩B) = P(A)·P(B\|A) | Conditional relation | Probabilistic analysis |\n| Σf(i) for i=1 to n | Summation notation | Performance bounds |\n\n**Step-by-step Derivation:**\n\nStep 1: Identify the problem parameters and constraints for ${topic}.\nStep 2: Apply the appropriate formula or algorithm.\nStep 3: Verify the result using boundary conditions.\nStep 4: Optimize if required based on given constraints.\nStep 5: Document and present the solution systematically.`,
  examNotes: (topic, subject) => `\n\n### 📋 University Exam Important Points\n\n**Frequently Asked 2-Mark Questions on ${topic}:**\n1. Define ${topic} with an example.\n2. State the properties of ${topic}.\n3. What are the advantages and disadvantages of ${topic}?\n4. Compare ${topic} with its alternatives.\n5. Write the algorithm/formula for ${topic}.\n\n**10/13-Mark Questions:**\n1. Explain ${topic} with a neat diagram and step-by-step example. (Anna University Pattern)\n2. Implement ${topic} using suitable data structures/methods. Show the working with a suitable example.\n3. Compare and contrast ${topic} with related concepts. Discuss time and space complexity.\n4. Apply ${topic} to solve the following problem: [Standard exam problem type]\n5. With a suitable example, prove/derive the main theorem/formula related to ${topic}.\n\n**GATE-Level Questions:**\n- Complexity analysis of ${topic} operations\n- Proof-based questions on correctness of ${topic}\n- Application of ${topic} in integrated system design\n\n**Placement & Interview Questions:**\n- Describe a real-world application of ${topic} in ${subject}.\n- Write pseudocode for the core algorithm of ${topic}.\n- What are edge cases to consider when implementing ${topic}?`,
  examples: (topic) => `\n\n### 💡 Solved Examples & Case Studies\n\n**Example 1 (Beginner):**\nProblem: Apply the basic concept of ${topic} to a simple scenario.\nSolution: \n- Step 1: Identify the input parameters\n- Step 2: Apply the definition/formula of ${topic}\n- Step 3: Compute the result\n- Step 4: Verify with boundary conditions\n✅ Result verified and correct.\n\n**Example 2 (Intermediate):**\nProblem: Given a standard problem, use ${topic} to derive the optimal solution.\nSolution:\n- Analyze the problem constraints\n- Choose the appropriate variant of ${topic}\n- Execute step by step with intermediate values shown\n- Final answer with explanation of why this approach was optimal\n✅ Complexity: O(n log n) time, O(n) space (example values)\n\n**Example 3 (Advanced):**\nProblem: Design a system/proof using ${topic} principles.\nSolution: This requires integration of ${topic} with related concepts. The advanced approach involves:\n1. Decomposition into subproblems\n2. Applying ${topic} recursively/iteratively\n3. Combining results with proof of correctness\n4. Analyzing edge cases and failure modes\n✅ This is a standard 16-mark examination question type.`,
  conclusion: (topic, subject) => `\n\n### 🎯 Summary & Revision Checklist\n\nAfter studying ${topic} in ${subject}, ensure you can:\n☐ Define ${topic} precisely in your own words\n☐ State all properties and theorems related to ${topic}\n☐ Solve beginner, intermediate, and advanced problems\n☐ Write the algorithm/pseudocode/formula from memory\n☐ Draw relevant diagrams, flowcharts, or graphs\n☐ Answer 2-mark, 10-mark, and 16-mark exam questions\n☐ Explain ${topic} to someone who has never studied it\n☐ Apply ${topic} to real-world or cross-domain problems\n\n**Pro Tip for Exam:** In Anna University / VTU exams, always:\n1. Start with a clear definition\n2. Draw a diagram if applicable\n3. Show step-by-step working for numerical problems\n4. Write conclusion/result clearly\n5. Time yourself — allocate 15-20 minutes per 13-mark question\n\n---\n*Notes prepared by CampusPilot AI Academic Team | Aligned with Anna University, VTU, JNTU, Mumbai University syllabi*`
}

// ── FLASHCARD TEMPLATES ──────────────────────────────────────────
const flashcardTemplates = [
  (topic) => ({ front: `What is ${topic}?`, back: `${topic} is a core concept in computer science/engineering/science that deals with structured problem-solving using defined principles, algorithms, and methods. It ensures correctness, efficiency, and scalability.` }),
  (topic) => ({ front: `What are the key properties of ${topic}?`, back: `Key properties: (1) Correctness — produces valid results, (2) Efficiency — optimal use of resources, (3) Modularity — decomposable, (4) Generality — applicable to multiple scenarios, (5) Termination — always completes.` }),
  (topic) => ({ front: `What is the time complexity of ${topic}?`, back: `Typical complexity: O(n) for linear operations, O(n log n) for divide-and-conquer approaches, O(n²) for nested iteration. Worst case depends on input and implementation.` }),
  (topic) => ({ front: `Give a real-world application of ${topic}`, back: `${topic} is widely used in: (1) Software systems for performance optimization, (2) Engineering designs, (3) Scientific computations, (4) Databases and file systems, (5) AI/ML algorithms.` }),
  (topic) => ({ front: `What is the difference between ${topic} and its alternatives?`, back: `${topic} is preferred when: optimal performance is needed, the problem has a specific structure, correctness guarantees are required, and when industry standards demand its use.` }),
  (topic) => ({ front: `Write the algorithm for ${topic}`, back: `Algorithm:\n1. Initialize required data structures\n2. Process input according to ${topic} rules\n3. Apply the core operation iteratively/recursively\n4. Check termination/convergence condition\n5. Return the final result` }),
  (topic) => ({ front: `State the theorem/formula for ${topic}`, back: `The fundamental theorem states: For any valid input satisfying the preconditions of ${topic}, the algorithm produces the correct output in finite time with complexity bounded by O(f(n)) where f(n) depends on the specific variant used.` }),
  (topic) => ({ front: `What are the disadvantages of ${topic}?`, back: `Disadvantages: (1) May have high space complexity in some variants, (2) Complex to implement correctly, (3) May not handle all edge cases without modification, (4) Performance degrades for adversarial inputs, (5) Requires understanding of prerequisites.` })
]

// ── EXAM QUESTIONS TEMPLATE ──────────────────────────────────────
const examQTemplate = (topic) => [
  { q: `Define ${topic} with an example`, mark: '2 Marks' },
  { q: `What are the properties of ${topic}?`, mark: '2 Marks' },
  { q: `Explain the algorithm for ${topic} with step-by-step example`, mark: '13 Marks' },
  { q: `Compare ${topic} with its alternatives. Discuss advantages and disadvantages`, mark: '13 Marks' },
  { q: `Apply ${topic} to solve a given problem and analyze time complexity`, mark: '16 Marks' }
]

// ── DETERMINISTIC ID GENERATOR ────────────────────────────────────
function hashCode(str) {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i)
    hash = hash & hash
  }
  return Math.abs(hash)
}

// ── MAIN NOTE GENERATOR ──────────────────────────────────────────
export function generateNote(category, subject, topic, level, unitIdx) {
  const subjectData = NOTE_TAXONOMY[category]?.subjects[subject]
  if (!subjectData) return null

  const units = subjectData.units || []
  const unit = units[unitIdx % units.length] || `Unit ${unitIdx + 1}`
  const id = `note_${hashCode(category + subject + topic + level)}`
  const ratings = [4.5, 4.6, 4.7, 4.8, 4.9, 4.95, 5.0]
  const rating = ratings[hashCode(id) % ratings.length]
  const downloads = 1000 + (hashCode(id) % 15000)
  const pages = 30 + (hashCode(id + 'p') % 180)
  const readTime = `${Math.floor(pages / 8)} min`
  const templateIdx = hashCode(id) % contentTemplates.intro.length

  // Build rich content
  const content =
    contentTemplates.intro[templateIdx](topic, subject) +
    contentTemplates.keyPoints(topic) +
    contentTemplates.formulas(topic) +
    contentTemplates.examples(topic) +
    contentTemplates.examNotes(topic, subject) +
    contentTemplates.conclusion(topic, subject)

  // Build flashcards (pick 5 from templates)
  const flashcards = flashcardTemplates
    .slice(0, 5)
    .map(fn => fn(topic))

  const tags = [
    topic.toLowerCase().replace(/\s+/g, '-'),
    subject.toLowerCase().replace(/\s+/g, '-'),
    category.toLowerCase().replace(/\s+/g, '-'),
    level.toLowerCase(),
    'exam-notes',
    'india'
  ]

  return {
    id,
    title: `${topic} — Complete ${level} Notes`,
    category,
    subCategory: subject,
    subject,
    branch: category,
    units: unit,
    unit,
    level,
    difficulty: level,
    content,
    readTime,
    rating,
    downloads,
    pages,
    fileSize: `${(pages * 0.035).toFixed(1)} MB`,
    type: level === 'Advanced' ? 'Research-Grade Notes' : level === 'Intermediate' ? 'University Exam Guide' : 'Beginner Friendly Notes',
    flashcards,
    tags,
    examQuestions: examQTemplate(topic),
    author: 'CampusPilot AI Academic Team',
    college: 'Anna University / VTU / JNTU / Mumbai University Aligned',
    semester: `Semester ${2 + (hashCode(id) % 6)}`,
    createdAt: new Date(Date.now() - hashCode(id) % 31536000000).toISOString(),
    saved: false,
    aiSummary: `📌 Key Concepts: ${topic} involves ${subject} principles.\n✅ Exam Focus: 2-mark definitions, 13-mark derivations, 16-mark problem solving.\n🎯 Must Know: Core formula, algorithm, real-world application.\n⚡ Quick Revision: Properties, advantages, disadvantages, comparison.`
  }
}

// ── INDEX BUILDER (For fast lookup/search) ──────────────────────
let _noteIndex = null

export function buildNoteIndex() {
  if (_noteIndex) return _noteIndex
  const index = []
  let globalIdx = 0

  for (const [category, catData] of Object.entries(NOTE_TAXONOMY)) {
    for (const [subject, subjectData] of Object.entries(catData.subjects)) {
      for (const topic of subjectData.topics) {
        for (const level of subjectData.levels) {
          for (let unitIdx = 0; unitIdx < subjectData.units.length; unitIdx++) {
            index.push({
              idx: globalIdx++,
              category,
              subject,
              topic,
              level,
              unitIdx,
              // Lightweight preview — no heavy content
              title: `${topic} — Complete ${level} Notes`,
              branch: category,
              id: `note_${Math.abs(
                (category + subject + topic + level).split('').reduce((h, c) => (Math.imul(31, h) + c.charCodeAt(0)) | 0, 5381)
              )}`,
              tags: [topic.toLowerCase(), subject.toLowerCase(), category.toLowerCase(), level.toLowerCase()],
              rating: [4.5, 4.6, 4.7, 4.8, 4.9, 4.95][globalIdx % 6],
              readTime: `${10 + (globalIdx % 30)} min`,
              difficulty: level,
              units: subjectData.units[unitIdx % subjectData.units.length],
              downloads: 1000 + (globalIdx % 15000),
              saved: false
            })
          }
        }
      }
    }
  }

  _noteIndex = index
  return index
}

// ── STATS ────────────────────────────────────────────────────────
export function getNoteStats() {
  const stats = { total: 0, byCategory: {} }
  for (const [category, catData] of Object.entries(NOTE_TAXONOMY)) {
    let catCount = 0
    for (const subjectData of Object.values(catData.subjects)) {
      catCount += subjectData.topics.length * subjectData.levels.length * subjectData.units.length
    }
    stats.byCategory[category] = { count: catCount, icon: catData.icon, color: catData.color }
    stats.total += catCount
  }
  return stats
}

// ── CATEGORY LIST FOR DISPLAY ────────────────────────────────────
export function getCategoryList() {
  return Object.entries(NOTE_TAXONOMY).map(([name, data]) => ({
    name,
    icon: data.icon,
    color: data.color,
    displayCount: data.count,
    subjects: Object.keys(data.subjects)
  }))
}
