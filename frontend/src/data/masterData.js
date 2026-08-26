// Master Reference Data for All Indian & Global Roles, Skills, Degrees, Branches, Colleges, & Locations

import { allRoles } from './allRoles.js'
import { allSkills } from './allSkills.js'

// Flatten all roles into a single clean list of distinct role strings
export const masterRoles = [
  // Tech & IT
  'Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Data Scientist', 'Machine Learning Engineer',
  'DevOps Engineer', 'Cloud Solutions Architect', 'Cybersecurity Analyst', 'Software Engineer', 'QA / Automation Tester',
  'Mobile App Developer (Flutter/React Native)', 'iOS Developer (Swift)', 'Android Developer (Kotlin)', 'System Architect',
  'Blockchain Developer', 'IoT Embedded Engineer', 'AR/VR Developer', 'AI Solutions Engineer', 'Site Reliability Engineer (SRE)',
  'Database Administrator (DBA)', 'Big Data Engineer', 'Prompt Engineer / AI Specialist', 'UI/UX Designer',

  // Core Engineering
  'Mechanical Engineer', 'Civil & Structural Engineer', 'Electrical & Electronics Engineer (EEE)',
  'Electronics & Communication Engineer (ECE)', 'Chemical Process Engineer', 'Aerospace Engineer',
  'Robotics & Automation Engineer', 'Automotive Design Engineer', 'VLSI Design Engineer', 'Embedded Systems Engineer',
  'Mechatronics Engineer', 'Biomedical Engineer', 'Environmental Engineer', 'Petroleum Engineer',

  // Business, Management & Finance
  'Product Manager', 'Project Manager', 'Business Analyst', 'Scrum Master', 'Data Analyst', 'Financial Analyst',
  'Investment Banker', 'Equity Research Analyst', 'Digital Marketing Manager', 'SEO / Performance Specialist',
  'Human Resources (HR) Manager', 'Technical Recruiter', 'Operations Manager', 'Supply Chain Manager',
  'Management Consultant', 'Sales / Business Development Manager', 'Customer Success Manager',

  // Medical & Healthcare
  'General Physician', 'Clinical Pharmacist', 'Registered Nurse', 'Radiologist', 'Physiotherapist',
  'Medical Lab Technologist', 'Biomedical Scientist', 'Hospital Administrator', 'Dentist', 'Surgeon',

  // Law & Corporate Compliance
  'Corporate Lawyer', 'Legal Advisor', 'Intellectual Property (IP) Attorney', 'Cyber Law Specialist',
  'Compliance Officer', 'Arbitration & Conflict Specialist', 'Taxation Consultant',

  // Creative Arts, Design & Media
  'Graphic Designer', 'Motion Graphics Artist', 'Video Editor / Director', 'Content Strategist',
  'Technical Writer', 'Architectural Designer', 'Interior Designer', 'Fashion Designer', 'Sound Engineer',

  // Education & Research
  'Assistant Professor / Lecturer', 'STEM Educator', 'Academic Counselor', 'Research Scientist', 'Educational Technologist'
]

// Extract clean skill names list from allSkills
export const masterSkills = Array.from(new Set([
  'React.js', 'Node.js', 'Python Programming', 'Java Enterprise', 'C++ System Programming', 'SQL & Relational Databases',
  'Data Structures & Algorithms', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'System Design',
  'AWS Cloud Solutions', 'Microsoft Azure Architecture', 'Google Cloud Platform (GCP)', 'Docker Containerization',
  'Kubernetes Cluster Orchestration', 'Tailwind CSS', 'TypeScript', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Git & GitHub',
  'REST APIs & GraphQL', 'PostgreSQL', 'MongoDB', 'Redis Caching', 'Apache Kafka', 'Linux Kernel & Shell Scripting',
  'Ethical Hacking & Penetration Testing', 'Network Security', 'Cyber Law & DPDP', 'Spring Boot', 'Django', 'FastAPI',
  'Flutter', 'React Native', 'Kotlin Android', 'Swift iOS', 'Figma UI/UX Design', 'AutoCAD 2D/3D', 'SolidWorks CAD',
  'ANSYS FEA', 'MATLAB & Simulink', 'VLSI & Verilog', 'Embedded C', 'PLC & SCADA Automation', 'Financial Modeling',
  'Product Management', 'Agile & Scrum', 'Digital Marketing', 'SEO & SEM', 'Corporate Finance', 'Legal Research & Drafting',
  ...allSkills.map(s => typeof s === 'string' ? s : s.name).filter(Boolean)
]))

// All Engineering, Arts & Science, Diploma, Polytechnic, Management, Medical & Law Degrees
export const masterDegrees = [
  // Engineering & Technology
  'B.E. / B.Tech (Bachelor of Engineering / Technology)',
  'M.E. / M.Tech (Master of Engineering / Technology)',

  // Diploma & Polytechnic
  'Diploma in Engineering / Technology (Polytechnic)',
  'Diploma in Computer Science Engineering (DCE)',
  'Diploma in Mechanical Engineering (DME)',
  'Diploma in Electrical & Electronics Engineering (DEEE)',
  'Diploma in Civil Engineering (DCivil)',
  'Diploma in Electronics & Communication Engineering (DECE)',
  'Diploma in Automobile Engineering',
  'Diploma in Chemical Engineering',
  'ITI (Industrial Training Institute) Certificate',
  'D.El.Ed (Diploma in Elementary Education)',

  // Arts & Science Degrees
  'B.Sc (Bachelor of Science)',
  'M.Sc (Master of Science)',
  'B.A (Bachelor of Arts)',
  'M.A (Master of Arts)',
  'B.Com (Bachelor of Commerce)',
  'M.Com (Master of Commerce)',
  'BCA (Bachelor of Computer Applications)',
  'MCA (Master of Computer Applications)',
  'BBA (Bachelor of Business Administration)',
  'MBA (Master of Business Administration)',
  'B.Litt (Bachelor of Literature)',
  'B.S.W (Bachelor of Social Work)',
  'M.S.W (Master of Social Work)',
  'B.F.A (Bachelor of Fine Arts)',
  'M.F.A (Master of Fine Arts)',
  'B.Voc (Bachelor of Vocation)',
  'B.Ed (Bachelor of Education)',
  'M.Ed (Master of Education)',
  'B.Lib.Sc (Bachelor of Library Science)',
  'M.Phil (Master of Philosophy)',

  // Medical, Pharmacy, Nursing & Law Degrees
  'MBBS (Bachelor of Medicine & Surgery)',
  'B.Pharm (Bachelor of Pharmacy)',
  'Pharm.D (Doctor of Pharmacy)',
  'BDS (Bachelor of Dental Surgery)',
  'BPT (Bachelor of Physiotherapy)',
  'B.Sc Nursing',
  'BAMS (Ayurveda)',
  'BHMS (Homoeopathy)',
  'BSMS (Siddha Medicine)',
  'BUMS (Unani Medicine)',
  'LLB (Bachelor of Laws)',
  'LLM (Master of Laws)',
  'B.Des / M.Des (Design)',
  'B.Arch (Bachelor of Architecture)',
  'Ph.D (Doctor of Philosophy)'
]

// All Branches & Specializations (Engineering, Arts, Science, Commerce, Diploma, Medical, Law)
export const masterBranches = [
  // Computer Science & IT (Arts & Science + Engineering)
  'Computer Science (B.Sc CS / BCA / MCA)',
  'Computer Science & Engineering (CSE)',
  'Information Technology (B.Sc IT / B.Tech IT)',
  'Artificial Intelligence & Data Science (AI & DS / B.Sc AI)',
  'Cyber Security & Digital Forensics',
  'Software Systems & Web Technology',
  'Computer Technology (CT)',
  'Computer Networking & Security',

  // Pure & Applied Sciences (Arts & Science)
  'Physics / Applied Physics (B.Sc / M.Sc)',
  'Chemistry / Industrial Chemistry (B.Sc / M.Sc)',
  'Mathematics & Statistics (B.Sc / M.Sc)',
  'Biotechnology & Bioinformatics (B.Sc / M.Sc)',
  'Microbiology & Clinical Lab Technology (B.Sc / M.Sc)',
  'Biochemistry & Clinical Biochemistry',
  'Botany / Plant Biology (B.Sc / M.Sc)',
  'Zoology / Animal Sciences (B.Sc / M.Sc)',
  'Environmental Science & Ecology',
  'Food Science, Nutrition & Dietetics',
  'Electronics & Communication (B.Sc Electronics / ECE)',
  'Costume Design & Fashion Technology (B.Sc CDF)',
  'Catering Science & Hotel Management (B.Sc CSHM)',
  'Library & Information Science',
  'Physical Education & Sports Science',
  'Agriculture & Horticulture (B.Sc Agriculture)',
  'Geology & Earth Science',
  'Fisheries & Aquaculture',

  // Commerce & Finance (Arts & Science)
  'Commerce - General (B.Com / M.Com)',
  'Commerce - Professional Accounting (B.Com PA)',
  'Commerce - Accounting & Finance (B.Com A&F)',
  'Commerce - Computer Applications (B.Com CA)',
  'Commerce - Information Technology (B.Com IT)',
  'Commerce - Banking & Insurance (B.Com B&I)',
  'Commerce - Corporate Secretaryship (B.Com CS)',
  'Commerce - International Business (B.Com IB)',
  'Commerce - Business Analytics & Fintech',
  'Commerce - Taxation & Tax Procedures',
  'Commerce - Logistics & Supply Chain Management',

  // Arts, Media & Humanities (Arts & Science)
  'Visual Communication & Media Arts (B.Sc VisCom)',
  'Journalism & Mass Communication',
  'English Literature & Linguistics (B.A / M.A)',
  'Tamil Literature & Classical Studies (B.A / M.A)',
  'Hindi Literature (B.A / M.A)',
  'Economics & Econometrics (B.A / M.A / B.Sc)',
  'Psychology & Clinical Psychology (B.Sc / M.Sc / B.A)',
  'Sociology & Social Work (B.S.W / M.S.W)',
  'History, Tourism & Travel Management',
  'Political Science & Public Administration',
  'Fine Arts, Animation & Graphic Design (B.F.A)',
  'Geography & Geoinformatics',
  'Philosophy & Religious Studies',
  'Home Science & Family Resource Management',

  // Core Engineering Branches
  'Electronics & Communication Engineering (ECE)',
  'Electrical & Electronics Engineering (EEE)',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Aerospace & Aeronautical Engineering',
  'Robotics & Automation Engineering',
  'Mechatronics Engineering',
  'Biomedical Engineering',
  'Automobile Engineering',
  'Mining Engineering',
  'Textile Engineering / Technology',
  'Production Engineering / Manufacturing',
  'Instrumentation Engineering',
  'Marine Engineering',
  'Petroleum Engineering',
  'Agricultural Engineering',
  'Printing & Packaging Technology',

  // Diploma / Polytechnic Branches
  'Diploma - Computer Science Engineering',
  'Diploma - Mechanical Engineering',
  'Diploma - Electrical & Electronics Engineering',
  'Diploma - Civil Engineering',
  'Diploma - Electronics & Communication Engineering',
  'Diploma - Automobile Engineering',
  'Diploma - Chemical Engineering',
  'Diploma - Printing Technology',
  'Diploma - Textile Technology',
  'Diploma - Architecture',
  'Diploma - Information Technology',

  // Management, Medical & Law
  'Business Administration (BBA / MBA)',
  'Human Resource Management (HRM)',
  'General Medicine / Clinical Sciences (MBBS)',
  'Pharmacy & Clinical Pharmacology (B.Pharm)',
  'Nursing & Community Health (B.Sc Nursing)',
  'Dentistry / Dental Surgery (BDS)',
  'Corporate Law & Intellectual Property (LLB / LLM)',
  'Architecture & Urban Planning (B.Arch)',
  'Education & Teaching (B.Ed / M.Ed)'
]

// =====================================================================================
// COMPREHENSIVE LIST: ALL MAJOR INDIAN COLLEGES, UNIVERSITIES & POLYTECHNICS
// Includes: Arts & Science, Engineering, Diploma/Polytechnic, Medical, Law, Management
// Coverage: Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, Telangana, Maharashtra,
//           Delhi NCR, West Bengal, Rajasthan, Gujarat, MP, UP, Punjab, and more
// =====================================================================================
export const masterColleges = [

  // ==========================================
  // TAMIL NADU - ARTS & SCIENCE COLLEGES
  // ==========================================
  // Coimbatore District Arts & Science
  'PSG College of Arts and Science (PSG CAS Coimbatore)',
  'Sri Krishna Arts and Science College (SKASC Coimbatore)',
  'Dr. N.G.P. Arts and Science College (Coimbatore)',
  'Hindusthan College of Arts and Science (HICAS Coimbatore)',
  'Rathinam College of Arts and Science (Coimbatore)',
  'Bishop Appasamy College of Arts and Science (Coimbatore)',
  'CMS College of Science and Commerce (Coimbatore)',
  'Kovai Kalaimagal College of Arts and Science (Coimbatore)',
  'Dr. SNS Rajalakshmi College of Arts and Science (Coimbatore)',
  'AJK College of Arts and Science (Coimbatore)',
  'Sri Ramakrishna College of Arts and Science (SRCAS Coimbatore)',
  'Government Arts College (Coimbatore)',
  'PSGR Krishnammal College for Women (Coimbatore)',
  'Avinashilingam Institute for Home Science and Higher Education (Coimbatore)',
  'Sri GVG Visalakshi College for Women (Udumalpet)',
  'Nirmala College for Women (Coimbatore)',
  'Providence College for Women (Coonoor)',
  'Karpagam Academy of Higher Education - Arts & Science (Coimbatore)',
  'SNS College of Arts and Science (Coimbatore)',

  // Erode District Arts & Science
  'Kongu Arts and Science College (KASC Erode)',
  'Vellalar College for Women (Erode)',
  'Kaamadhenu Arts and Science College (Sathyamangalam)',
  'Vivekanandha College of Arts and Science for Women (Elayampalayam, Tiruchengode)',
  'Vivekanandha College of Arts and Science (Autonomous, Tiruchengode)',
  'Nandha Arts and Science College (Erode)',
  'Sri Vasavi College (Self-Finance, Erode)',
  'Erode Arts and Science College (Autonomous, Erode)',
  'Chikkanna Government Arts College (Autonomous, Tirupur)',
  'Sri Sarada College for Women (Autonomous, Salem)',
  'Government Arts College (Erode)',

  // Salem, Namakkal & Dharmapuri Arts & Science
  'Government Arts College (Salem)',
  'Periyar University Arts & Science College (Salem)',
  'AVS College of Arts and Science (Salem)',
  'Sri Sarada College for Women (Autonomous, Salem)',
  'Paavai College of Arts and Science (Namakkal)',
  'Mahendra Arts and Science College (Namakkal)',
  'Muthayammal College of Arts and Science (Rasipuram)',
  'Government Arts College (Dharmapuri)',
  'Government Arts College for Women (Dharmapuri)',
  'KSG College of Arts and Science (Coimbatore)',

  // Chennai District Arts & Science
  'Loyola College (Autonomous, Chennai)',
  'Madras Christian College (MCC, Chennai)',
  'Stella Maris College (Autonomous, Chennai)',
  'Women\'s Christian College (WCC, Chennai)',
  'Presidency College (Autonomous, Chennai)',
  'Government Arts College for Men (Nandanam, Chennai)',
  'Queen Mary\'s College (Chennai)',
  'Ethiraj College for Women (Chennai)',
  'M.O.P. Vaishnav College for Women (Chennai)',
  'SDNB Vaishnav College for Women (Chromepet, Chennai)',
  'Meenakshi College for Women (Chennai)',
  'D.G. Vaishnav College (Chennai)',
  'Guru Nanak College (Autonomous, Chennai)',
  'New College (Autonomous, Chennai)',
  'Pachaiyappa\'s College (Autonomous, Chennai)',
  'Sir Theagaraya College (STC, Chennai)',
  'Voorhees College (Vellore)',
  'C. Abdul Hakeem College (Melvisharam, Vellore)',

  // Trichy, Madurai, Tirunelveli & Southern TN Arts & Science
  'St. Joseph\'s College (Autonomous, Tiruchirappalli)',
  'Bishop Heber College (Autonomous, Tiruchirappalli)',
  'Jamal Mohamed College (Autonomous, Tiruchirappalli)',
  'Holy Cross College (Autonomous, Tiruchirappalli)',
  'Seethalakshmi Ramaswami College (Autonomous, Tiruchirappalli)',
  'Government Arts College (Tiruchirappalli)',
  'Periyar EVR College (Trichy)',
  'The American College (Madurai)',
  'Lady Doak College (Madurai)',
  'Thiagarajar College (Madurai)',
  'Fatima College (Autonomous, Madurai)',
  'Sourashtra College (Madurai)',
  'Ayya Nadar Janaki Ammal College (ANJAC Sivakasi)',
  'Sri Meenakshi Vidiyal Arts and Science College (Trichy)',
  'Subbalakshmi Lakshmipathy College of Science (Madurai)',
  'St. Xavier\'s College (Autonomous, Palayamkottai)',
  'Sri Paramakalyani College (Autonomous, Alwarkurichi)',
  'Kamaraj College (Thoothukudi)',
  'VO Chidambaram College (Thoothukudi)',
  'St. John\'s College (Tirunelveli)',
  'Scott Christian College (Nagercoil)',
  'Alagappa Government Arts College (Karaikudi)',
  'Government Arts College (Karur)',
  'Government Arts College (Ooty / Udhagamandalam)',
  'Park\'s College (Tirupur)',
  'NGM College (Pollachi)',
  'Sacred Heart College (Autonomous, Tirupattur)',
  'Sri Venkateshwara Arts and Science College (Pullipalayam, Tiruchengode)',

  // Tirupur, Pollachi, Udumalpet Arts & Science
  'Nallamuthu Gounder Mahalingam College (NGM College, Pollachi)',
  'Dr. N. G. P. Arts and Science College (Kalapatti, Coimbatore)',
  'KG College of Arts and Science (Coimbatore)',
  'Sankara College of Science and Commerce (Coimbatore)',

  // ==========================================
  // TAMIL NADU - ENGINEERING COLLEGES
  // ==========================================
  'Anna University (CEG Campus, Guindy, Chennai)',
  'Anna University (MIT Campus, Chromepet, Chennai)',
  'Anna University (ACTech Campus, Guindy, Chennai)',
  'Anna University (SAP Campus, Guindy, Chennai)',
  'Anna University Regional Campus (Coimbatore)',
  'Anna University Regional Campus (Tiruchirappalli)',
  'Anna University Regional Campus (Madurai)',
  'Anna University Regional Campus (Tirunelveli)',
  'IIT Madras (Indian Institute of Technology Madras)',
  'NIT Trichy (National Institute of Technology Tiruchirappalli)',
  'VIT Vellore (Vellore Institute of Technology)',
  'VIT Chennai (Vellore Institute of Technology)',
  'SRM Institute of Science and Technology (Kattankulathur, Chennai)',
  'SRM Institute of Science and Technology (Ramapuram, Chennai)',
  'SRM Institute of Science and Technology (Vadapalani, Chennai)',
  'SRM Institute of Science and Technology (Tiruchirappalli)',
  'PSG College of Technology (PSG Tech Coimbatore)',
  'PSG Institute of Technology and Applied Research (PSG iTech Coimbatore)',
  'SSN College of Engineering (Sri Sivasubramaniya Nadar, Chennai)',
  'SASTRA Deemed University (Thanjavur)',
  'Coimbatore Institute of Technology (CIT Coimbatore)',
  'Government College of Technology (GCT Coimbatore)',
  'Thiagarajar College of Engineering (TCE Madurai)',
  'Kongu Engineering College (KEC Erode)',
  'Kumaraguru College of Technology (KCT Coimbatore)',
  'KPR Institute of Engineering and Technology (KPRIET Coimbatore)',
  'Sri Krishna College of Engineering and Technology (SKCET Coimbatore)',
  'Sri Krishna College of Technology (SKCT Coimbatore)',
  'Bannari Amman Institute of Technology (BIT Sathyamangalam)',
  'Mepco Schlenk Engineering College (Sivakasi)',
  'Rajalakshmi Engineering College (REC Chennai)',
  'Rajalakshmi Institute of Technology (RIT Chennai)',
  'St. Joseph\'s College of Engineering (Chennai)',
  'St. Joseph\'s Institute of Technology (Chennai)',
  'Sri Sairam Engineering College (Chennai)',
  'Sri Sairam Institute of Technology (Chennai)',
  'Sona College of Technology (Salem)',
  'Government College of Engineering (Salem)',
  'Government College of Engineering (Bargur)',
  'Government College of Engineering (Tirunelveli)',
  'Government College of Engineering (Erode / IRTT)',
  'Government College of Engineering (Thanjavur)',
  'Government College of Engineering (Dharmapuri)',
  'Government College of Engineering (Bodinayakanur)',
  'Government College of Engineering (Srirangam)',
  'Sri Venkateswara College of Engineering (SVCE Sriperumbudur)',
  'K.S. Rangasamy College of Technology (KSRCT Tiruchengode)',
  'K.S.R. College of Engineering (Tiruchengode)',
  'Vel Tech Rangarajan Dr. Sagunthala R&D Institute (Chennai)',
  'Hindustan Institute of Technology and Science (HITS Chennai)',
  'Karunya Institute of Technology and Sciences (Coimbatore)',
  'Saveetha Engineering College (Chennai)',
  'Saveetha Institute of Medical and Technical Sciences (SIMATS)',
  'Vels Institute of Science, Technology & Advanced Studies (VISTAS Chennai)',
  'SRM Valliammai Engineering College (Kattankulathur)',
  'Easwari Engineering College (Chennai)',
  'RMK Engineering College (Chennai)',
  'RMD Engineering College (Chennai)',
  'RMK College of Engineering and Technology (Chennai)',
  'Karpagam Academy of Higher Education (Coimbatore)',
  'Karpagam College of Engineering (Coimbatore)',
  'Velammal Engineering College (Chennai)',
  'Velammal Institute of Technology (Chennai)',
  'Velammal College of Engineering and Technology (Madurai)',
  'Dr. N.G.P. Institute of Technology (Coimbatore)',
  'KCG College of Technology (Chennai)',
  'Panimalar Engineering College (Chennai)',
  'Meenakshi Sundararajan Engineering College (Chennai)',
  'Jerusalem College of Engineering (Chennai)',
  'B.S. Abdur Rahman Crescent Institute of Science and Technology (Chennai)',
  'National Engineering College (NEC Kovilpatti)',
  'PSNA College of Engineering and Technology (Dindigul)',
  'Kamaraj College of Engineering and Technology (Virudhunagar)',
  'Sri Ramakrishna Engineering College (SREC Coimbatore)',
  'Sri Ramakrishna Institute of Technology (SRIT Coimbatore)',
  'Dr. Mahalingam College of Engineering and Technology (MCET Pollachi)',
  'Hindusthan College of Engineering and Technology (HICET Coimbatore)',
  'SNS College of Technology (Coimbatore)',
  'SNS College of Engineering (Coimbatore)',
  'PPG Institute of Technology (Coimbatore)',
  'Kathir College of Engineering (Coimbatore)',
  'KITE - KGiSL Institute of Technology (Coimbatore)',
  'Coimbatore Institute of Engineering and Technology (CIET)',
  'Park College of Engineering and Technology (Coimbatore)',
  'Francis Xavier Engineering College (Tirunelveli)',
  'RVS College of Engineering and Technology (Coimbatore / Dindigul)',
  'Paavai Engineering College (Namakkal)',
  'Gnanamani College of Technology (Namakkal)',
  'Excel Engineering College (Komarapalayam)',
  'M.Kumarasamy College of Engineering (Karur)',
  'VSB Engineering College (Karur)',
  'Saranathan College of Engineering (Tiruchirappalli)',
  'CARE College of Engineering (Tiruchirappalli)',
  'K.Ramakrishnan College of Engineering (KRCE Trichy)',
  'K.Ramakrishnan College of Technology (KRCT Trichy)',
  'M.A.M. College of Engineering (Trichy)',
  'Adhiyamaan College of Engineering (Hosur)',
  'Er. Perumal Manimekalai College of Engineering (Hosur)',
  'Mahendra Engineering College (Namakkal)',
  'Muthayammal Engineering College (Rasipuram)',
  'Sengunthar Engineering College (Tiruchengode)',
  'Erode Sengunthar Engineering College (Erode)',
  'Nandha Engineering College (Erode)',
  'Vivekanandha College of Engineering for Women (Tiruchengode)',
  'Vivekanandha Institute of Engineering and Technology (Tiruchengode)',
  'Sri Venkateshwara College of Engineering (Sriperumbudur)',
  'Sri Venkateshwara Institute of Science and Technology (Tiruvallur)',
  'Selvam College of Technology (Namakkal)',
  'Dhanalakshmi Srinivasan Engineering College (Perambalur)',
  'Dhanalakshmi Srinivasan College of Engineering (Coimbatore)',
  'JCT College of Engineering and Technology (Coimbatore)',
  'Velalar College of Engineering and Technology (Erode)',
  'Info Institute of Engineering (Coimbatore)',

  // ==========================================
  // TAMIL NADU - POLYTECHNIC & DIPLOMA COLLEGES
  // ==========================================
  'PSG Polytechnic College (Coimbatore)',
  'Government Polytechnic College (Coimbatore)',
  'Government Polytechnic College (Salem)',
  'Government Polytechnic College (Erode)',
  'Government Polytechnic College (Trichy)',
  'Government Polytechnic College for Women (Coimbatore)',
  'Government Polytechnic College for Women (Chennai)',
  'Kongu Polytechnic College (Erode)',
  'Nachimuthu Polytechnic College (Pollachi)',
  'NPR Polytechnic College (Natham, Dindigul)',
  'Central Polytechnic College (Chennai / Taramani)',
  'Thiagarajar Polytechnic College (Salem)',
  'Sakthi Polytechnic College (Erode)',
  'Sri Ramakrishna Mission Vidyalaya Polytechnic (SRMVP Coimbatore)',
  'KPR Polytechnic College (Coimbatore)',
  'Nandha Polytechnic College (Erode)',
  'Vivekanandha Polytechnic College (Tiruchengode)',
  'Bannari Amman Polytechnic College (Sathyamangalam)',
  'Arasan Ganesan Polytechnic College (Sivakasi)',
  'Kumaraguru Polytechnic College (Coimbatore)',

  // ==========================================
  // TAMIL NADU - MEDICAL, PHARMACY, LAW, EDUCATION UNIVERSITIES & COLLEGES
  // ==========================================
  'Madras Medical College (MMC Chennai)',
  'Stanley Medical College (Chennai)',
  'Kilpauk Medical College (KMC Chennai)',
  'Christian Medical College (CMC Vellore)',
  'Coimbatore Medical College (CMC Coimbatore)',
  'Madurai Medical College (Madurai)',
  'Tirunelveli Medical College (TMC Tirunelveli)',
  'PSG Institute of Medical Sciences and Research (PSG IMS&R Coimbatore)',
  'Vinayaka Mission\'s Medical College (Salem)',
  'TNDALU (Tamil Nadu Dr. Ambedkar Law University, Chennai)',
  'Government Law College (Coimbatore)',
  'Government Law College (Madurai)',

  // ==========================================
  // TAMIL NADU - STATE & DEEMED UNIVERSITIES
  // ==========================================
  'Alagappa University (Karaikudi)',
  'Annamalai University (Chidambaram)',
  'Bharathiar University (Coimbatore)',
  'Bharathidasan University (Tiruchirappalli)',
  'Madurai Kamaraj University (Madurai)',
  'Manonmaniam Sundaranar University (Tirunelveli)',
  'Periyar University (Salem)',
  'Tamil Nadu Agricultural University (TNAU Coimbatore)',
  'Tamil Nadu Veterinary and Animal Sciences University (TANUVAS)',
  'Tamil Nadu Dr. M.G.R. Medical University (Chennai)',
  'University of Madras (Chennai)',
  'Gandhigram Rural Institute (Dindigul)',
  'Mother Teresa Women\'s University (Kodaikanal)',
  'Tamil Nadu Open University (TNOU Chennai)',
  'Tamil Nadu Teachers Education University (TNTEU Chennai)',
  'Thiruvalluvar University (Vellore)',
  'Tamil Nadu Physical Education and Sports University (TNPESU Chennai)',

  // ==========================================
  // KARNATAKA - ARTS, SCIENCE, ENGINEERING & MANAGEMENT
  // ==========================================
  'Christ University (Bannerghatta / Kengeri / Hosur Road, Bangalore)',
  'St. Joseph\'s University (Bangalore)',
  'Mount Carmel College (MCC Bangalore)',
  'Jyoti Nivas College (Bangalore)',
  'Kristu Jayanti College (Autonomous, Bangalore)',
  'St. Joseph\'s College of Commerce (SJCC Bangalore)',
  'Seshadripuram College (Bangalore)',
  'MES College of Arts, Science and Commerce (Bangalore)',
  'IISc Bangalore (Indian Institute of Science)',
  'IIM Bangalore (Indian Institute of Management)',
  'NITK Surathkal (National Institute of Technology Karnataka)',
  'RV College of Engineering (RVCE Bangalore)',
  'BMS College of Engineering (BMSCE Bangalore)',
  'BMS Institute of Technology and Management (BMSIT Bangalore)',
  'Ramaiah Institute of Technology (MSRIT Bangalore)',
  'PES University (Ring Road / Electronic City Campus, Bangalore)',
  'Manipal Institute of Technology (MAHE Manipal)',
  'Bangalore Institute of Technology (BIT Bangalore)',
  'Sir M. Visvesvaraya Institute of Technology (Sir MVIT Bangalore)',
  'Dayananda Sagar College of Engineering (DSCE Bangalore)',
  'Dayananda Sagar University (DSU Bangalore)',
  'IIIT Bangalore',
  'NLSIU Bangalore (National Law School of India University)',
  'Bangalore University',
  'Visvesvaraya Technological University (VTU Belagavi)',
  'Mysore University (University of Mysore)',
  'Jain University (Bangalore)',
  'Reva University (Bangalore)',
  'CMR Institute of Technology (CMRIT Bangalore)',
  'New Horizon College of Engineering (NHCE Bangalore)',
  'Nitte Meenakshi Institute of Technology (NMIT Bangalore)',
  'Siddaganga Institute of Technology (SIT Tumkur)',
  'NIE Mysore (The National Institute of Engineering)',

  // ==========================================
  // KERALA - ARTS, SCIENCE & ENGINEERING
  // ==========================================
  'University of Kerala (Thiruvananthapuram)',
  'Mahatma Gandhi University (MGU Kottayam)',
  'Cochin University of Science and Technology (CUSAT Kochi)',
  'University of Calicut (Thenjipalam)',
  'Kannur University',
  'Kerala University of Health Sciences (KUHS Thrissur)',
  'NIT Calicut (National Institute of Technology Calicut)',
  'IIT Palakkad',
  'IISER Thiruvananthapuram',
  'Government Engineering College Thrissur (GEC Thrissur)',
  'TKM College of Engineering (Kollam)',
  'Mar Athanasius College of Engineering (MACE Kothamangalam)',
  'College of Engineering Trivandrum (CET)',
  'St. Teresa\'s College (Ernakulam)',
  'Sacred Heart College (Autonomous, Thevara, Kochi)',
  'Maharaja\'s College (Autonomous, Ernakulam)',
  'St. Thomas College (Autonomous, Thrissur)',
  'Government Arts and Science College (Kerala - Multiple Districts)',

  // ==========================================
  // ANDHRA PRADESH & TELANGANA - ARTS, SCIENCE & ENGINEERING
  // ==========================================
  'IIT Hyderabad (Indian Institute of Technology)',
  'NIT Warangal (National Institute of Technology Warangal)',
  'IIIT Hyderabad (International Institute of Information Technology)',
  'BITS Pilani Hyderabad Campus',
  'Osmania University (OU Hyderabad)',
  'JNTU Hyderabad (Jawaharlal Nehru Technological University)',
  'Chaitanya Bharathi Institute of Technology (CBIT Hyderabad)',
  'Vasavi College of Engineering (Hyderabad)',
  'VNR Vignana Jyothi Institute (VNR VJIET Hyderabad)',
  'Gokaraju Rangaraju Institute of Engineering and Technology (GRIET Hyderabad)',
  'Institute of Aeronautical Engineering (IARE Hyderabad)',
  'University of Hyderabad (HCU)',
  'NALSAR University of Law (Hyderabad)',
  'Andhra University (Visakhapatnam)',
  'JNTU Kakinada',
  'JNTU Anantapur',
  'K L Deemed to be University (KLEF Vijayawada)',
  'IIT Tirupati',
  'NIT Andhra Pradesh (Tadepalligudem)',
  'Sri Venkateswara University (SVU Tirupati)',
  'Acharya Nagarjuna University (Guntur)',
  'Nizam College (Autonomous, Hyderabad)',
  'St. Francis College for Women (Hyderabad)',

  // ==========================================
  // MAHARASHTRA - ARTS, SCIENCE & ENGINEERING (MUMBAI, PUNE, NAGPUR)
  // ==========================================
  'IIT Bombay (Indian Institute of Technology Bombay)',
  'ICT Mumbai (Institute of Chemical Technology)',
  'COEP Technological University (College of Engineering Pune)',
  'VJTI Mumbai (Veermata Jijabai Technological Institute)',
  'SPIT Mumbai (Sardar Patel Institute of Technology)',
  'MIT World Peace University (MIT-WPU Pune)',
  'Vishwakarma Institute of Technology (VIT Pune)',
  'Symbiosis International University (Pune / Mumbai)',
  'NMIMS Mumbai (Narsee Monjee Institute of Management Studies)',
  'St. Xavier\'s College (Autonomous, Mumbai)',
  'TISS Mumbai (Tata Institute of Social Sciences)',
  'University of Mumbai',
  'Savitribai Phule Pune University (SPPU Pune)',
  'VNIT Nagpur (Visvesvaraya National Institute of Technology)',
  'Walchand College of Engineering (Sangli)',
  'PICT Pune (Pune Institute of Computer Technology)',
  'Pimpri Chinchwad College of Engineering (PCCOE Pune)',
  'Fergusson College (Autonomous, Pune)',
  'Elphinstone College (Mumbai)',
  'Wilson College (Mumbai)',
  'Ramnarain Ruia Autonomous College (Mumbai)',
  'Sophia College for Women (Mumbai)',
  'ILS Law College (Pune)',
  'Government College of Engineering Amravati (GCOE Amravati)',

  // ==========================================
  // DELHI NCR - ARTS, SCIENCE, COMMERCE & ENGINEERING
  // ==========================================
  'IIT Delhi (Indian Institute of Technology Delhi)',
  'Delhi Technological University (DTU Delhi)',
  'NSUT Delhi (Netaji Subhas University of Technology)',
  'IIIT Delhi',
  'Jamia Millia Islamia (JMI New Delhi)',
  'Jawaharlal Nehru University (JNU New Delhi)',
  'St. Stephen\'s College (Delhi University)',
  'SRCC (Shri Ram College of Commerce, Delhi)',
  'Hindu College (Delhi University)',
  'Hansraj College (Delhi University)',
  'Miranda House (Delhi University)',
  'Lady Shri Ram College for Women (LSR Delhi)',
  'Ramjas College (Delhi University)',
  'Sri Venkateswara College (DU New Delhi)',
  'Kirori Mal College (Delhi University)',
  'Gargi College (Delhi University)',
  'Deshbandhu College (Delhi University)',
  'Dyal Singh College (Delhi University)',
  'Shaheed Sukhdev College of Business Studies (Delhi)',
  'Indraprastha College for Women (Delhi)',
  'Amity University (Noida / Gurgaon / Jaipur)',
  'Shiv Nadar University (Greater Noida)',
  'Ashoka University (Sonepat)',
  'National Law University Delhi (NLU Delhi)',
  'IIM Lucknow (Noida Campus)',

  // ==========================================
  // WEST BENGAL & EAST INDIA
  // ==========================================
  'IIT Kharagpur',
  'Jadavpur University (Kolkata)',
  'Presidency University (Kolkata)',
  'St. Xavier\'s College (Autonomous, Kolkata)',
  'University of Calcutta (Kolkata)',
  'NIT Durgapur',
  'IIEST Shibpur (Indian Institute of Engineering Science and Technology)',
  'Scottish Church College (Kolkata)',
  'Bethune College (Kolkata)',
  'IIM Calcutta (Joka)',

  // ==========================================
  // RAJASTHAN, MADHYA PRADESH & CENTRAL INDIA
  // ==========================================
  'IIT Jodhpur',
  'IIT Indore',
  'BITS Pilani (Birla Institute of Technology and Science)',
  'MNIT Jaipur (Malaviya National Institute of Technology)',
  'NIT Bhopal (MANIT Bhopal)',
  'IIT Gandhinagar',
  'DAIICT Gandhinagar',
  'University of Rajasthan (Jaipur)',
  'Manipal University Jaipur',
  'Banasthali Vidyapith (Rajasthan)',
  'IIM Ahmedabad',
  'IIM Indore',
  'IIM Udaipur',
  'NLIU Bhopal (National Law Institute University)',

  // ==========================================
  // PUNJAB, HARYANA, CHANDIGARH & NORTH INDIA
  // ==========================================
  'Thapar Institute of Engineering & Technology (TIET Patiala)',
  'PEC Chandigarh (Punjab Engineering College)',
  'Panjab University (Chandigarh)',
  'IIT Roorkee',
  'IIT Kanpur',
  'NIT Kurukshetra',
  'NIT Jalandhar (Dr. B.R. Ambedkar NIT)',
  'Lovely Professional University (LPU Phagwara)',
  'Chitkara University (Rajpura, Punjab)',
  'Chandigarh University (Mohali)',
  'AMU Aligarh (Aligarh Muslim University)',
  'BHU Varanasi (Banaras Hindu University / IIT BHU)',
  'MNNIT Allahabad (NIT Allahabad)',
  'IIT Ropar',
  'IIT Patna',
  'IIT Mandi',
  'IIT Guwahati',
  'IIT Bhubaneswar',

  // ==========================================
  // ALL IITs, NITs, IIITs, IIMs & AIIMS (NATIONAL)
  // ==========================================
  'IIT Gandhinagar', 'IIT Palakkad', 'IIT Tirupati', 'IIT Dhanbad (ISM Dhanbad)',
  'IIT Bhilai', 'IIT Goa', 'IIT Jammu', 'IIT Dharwad',
  'NIT Trichy', 'NIT Surathkal', 'NIT Warangal', 'NIT Calicut',
  'NIT Durgapur', 'NIT Silchar', 'NIT Hamirpur', 'NIT Jamshedpur',
  'NIT Patna', 'NIT Raipur', 'NIT Srinagar', 'NIT Agartala',
  'NIT Meghalaya', 'NIT Nagaland', 'NIT Sikkim', 'NIT Goa',
  'NIT Puducherry', 'NIT Arunachal Pradesh', 'NIT Mizoram', 'NIT Manipur', 'NIT Uttarakhand',
  'IIIT Allahabad', 'IIIT Hyderabad', 'IIIT Bangalore',
  'IIIT Gwalior (ABV-IIITM)', 'IIIT Jabalpur (PDPM-IIITDM)',
  'IIIT Kancheepuram (IIITDM Chennai)', 'IIIT Lucknow', 'IIIT Pune',
  'IIIT Surat', 'IIIT Vadodara', 'IIIT Guwahati', 'IIIT Kota',
  'IIIT Sri City', 'IIIT Trichy (Tiruchirappalli)',
  'IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'IIM Lucknow',
  'IIM Kozhikode', 'IIM Indore', 'IIM Shillong', 'IIM Rohtak',
  'IIM Ranchi', 'IIM Raipur', 'IIM Trichy (Tiruchirappalli)',
  'IIM Udaipur', 'IIM Kashipur', 'IIM Visakhapatnam',
  'AIIMS New Delhi', 'AIIMS Bhubaneswar', 'AIIMS Jodhpur',
  'AIIMS Bhopal', 'AIIMS Rishikesh', 'AIIMS Patna', 'AIIMS Raipur',
  'JIPMER Puducherry'
]

// All Indian & Global Tech / Corporate Job Locations
export const masterLocations = [
  'Bangalore (Bengaluru), Karnataka',
  'Hyderabad, Telangana',
  'Chennai, Tamil Nadu',
  'Coimbatore, Tamil Nadu',
  'Madurai, Tamil Nadu',
  'Trichy (Tiruchirappalli), Tamil Nadu',
  'Salem, Tamil Nadu',
  'Erode, Tamil Nadu',
  'Tirunelveli, Tamil Nadu',
  'Pune, Maharashtra',
  'Mumbai, Maharashtra',
  'Gurgaon (Gurugram), Delhi NCR',
  'Noida, Uttar Pradesh',
  'Delhi NCR',
  'Kolkata, West Bengal',
  'Ahmedabad, Gujarat',
  'Kochi / Trivandrum, Kerala',
  'Chandigarh / Mohali',
  'Jaipur, Rajasthan',
  'Indore, Madhya Pradesh',
  'Bhopal, Madhya Pradesh',
  'Lucknow, Uttar Pradesh',
  'Remote (India)',
  'Remote (Global / USA)'
]

// All Indian States & Union Territories (Official)
export const masterStates = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
  'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi (NCT)',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand',
  'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal'
]

// All Major Indian Cities across all States
export const masterCities = [
  // Tamil Nadu
  'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli (Trichy)', 'Salem', 'Erode', 'Tiruppur', 'Vellore',
  'Tirunelveli', 'Thoothukudi (Tuticorin)', 'Nagercoil', 'Thanjavur', 'Dindigul', 'Karur', 'Namakkal',
  'Kanchipuram', 'Tiruvannamalai', 'Cuddalore', 'Nagapattinam', 'Pudukkottai', 'Ramanathapuram',
  'Sivakasi', 'Virudhunagar', 'Hosur', 'Ambur', 'Ariyalur', 'Mayiladuthurai', 'Ooty (Udhagamandalam)',
  'Pollachi', 'Udumalpet', 'Sathyamangalam', 'Gobichettipalayam', 'Tiruchengode', 'Rasipuram',

  // Karnataka
  'Bengaluru (Bangalore)', 'Mysuru (Mysore)', 'Mangaluru (Mangalore)', 'Hubballi-Dharwad', 'Belagavi (Belgaum)',
  'Kalaburagi (Gulbarga)', 'Ballari (Bellary)', 'Shivamogga (Shimoga)', 'Tumakuru (Tumkur)', 'Davangere',
  'Udupi', 'Hassan', 'Bidar', 'Hospet', 'Gadag', 'Robertsonpet (KGF)',

  // Kerala
  'Thiruvananthapuram (Trivandrum)', 'Kochi (Cochin)', 'Kozhikode (Calicut)', 'Thrissur', 'Kollam (Quilon)',
  'Kannur', 'Alappuzha (Alleppey)', 'Kottayam', 'Palakkad', 'Malappuram', 'Thalassery', 'Pathanamthitta',

  // Andhra Pradesh & Telangana
  'Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam', 'Ramagundam',
  'Visakhapatnam (Vizag)', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry', 'Tirupati',
  'Kakinada', 'Kadapa', 'Anantapur', 'Eluru', 'Ongole', 'Vizianagaram',

  // Maharashtra
  'Mumbai', 'Pune', 'Nagpur', 'Thane', 'Pimpri-Chinchwad', 'Nashik', 'Kalyan-Dombivli', 'Vasai-Virar',
  'Aurangabad (Chhatrapati Sambhaji Nagar)', 'Navi Mumbai', 'Solapur', 'Mira-Bhayandar', 'Bhiwandi',
  'Amravati', 'Nanded', 'Kolhapur', 'Ulhasnagar', 'Sangli', 'Malegaon', 'Akola', 'Latur', 'Dhule', 'Ahmednagar',

  // Delhi NCR & North India
  'New Delhi', 'Noida', 'Greater Noida', 'Gurugram (Gurgaon)', 'Faridabad', 'Ghaziabad', 'Sonepat',
  'Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda',
  'Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur', 'Bhilwara', 'Alwar',
  'Dehradun', 'Haridwar', 'Roorkee', 'Haldwani',
  'Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Prayagraj (Allahabad)', 'Meerut', 'Bareilly', 'Aligarh', 'Moradabad', 'Gorakhpur',

  // Eastern & Central India
  'Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Kharagpur',
  'Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri', 'Sambalpur',
  'Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur',
  'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro',
  'Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain',
  'Raipur', 'Bhilai', 'Bilaspur',

  // Union Territories & Northeast
  'Guwahati', 'Dispur', 'Silchar', 'Shillong', 'Imphal', 'Aizawl', 'Agartala', 'Gangtok', 'Itanagar', 'Kohima',
  'Panaji', 'Margao', 'Puducherry', 'Port Blair', 'Leh', 'Srinagar', 'Jammu'
]


