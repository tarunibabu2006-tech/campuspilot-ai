// data/govtExamsMasterData.js

export const GOVT_EXAMS_MASTER = [
  {
    id: 'upsc-cse',
    category: 'UPSC',
    name: 'UPSC Civil Services Examination (IAS / IPS / IFS / IRS)',
    shortName: 'UPSC CSE',
    icon: '🇮🇳',
    conductingBody: 'Union Public Service Commission',
    degreeRequired: 'Bachelor’s Degree in any discipline (B.E/B.Tech, B.Sc, B.Com, B.A, MBBS, Law)',
    eligiblePosts: 'IAS (District Collector), IPS (SP/DGP), IFS (Diplomat), IRS (Tax Commissioner)',
    ageLimit: '21 to 32 Years (OBC: 35 | SC/ST: 37 | PwD: 42)',
    salary: '₹56,100 – ₹2,50,000/month (Pay Level 10 to Level 18 Apex)',
    vacancies: '1,050+ Central Group A Posts Annually',
    applyLink: 'https://upsc.gov.in',
    dates: {
      notification: 'February 2026',
      prelims: 'May 2026',
      mains: 'September 2026',
      interview: 'Jan – March 2027'
    },
    cutoffMarks: { prelims: '88 - 93 / 200 (GS Paper 1)', mains: '740 - 760 / 1750', final: '960 - 990 / 2025' },

    // ── LEARNING CONTENT / STUDY MODULES ──────────────────────────────
    learningModules: [
      {
        id: 'upsc-polity-learn',
        subject: 'Indian Polity & Constitutional Law',
        icon: '⚖️',
        readTime: '15 Mins Read',
        summary: 'Preamble, Fundamental Rights, Directive Principles, Parliamentary System & Landmark Judgments.',
        keyFacts: [
          'Article 32 is called the "Heart and Soul of the Constitution" by Dr. B.R. Ambedkar.',
          'Kesavananda Bharati v. State of Kerala (1973): Established the Basic Structure Doctrine.',
          'Money Bills (Article 110) can ONLY be introduced in Lok Sabha with prior recommendation of President.',
          '73rd & 74th Amendments (1992) granted constitutional status to Panchayati Raj and Municipalities.'
        ],
        conceptNotes: `
### 1. Preamble & Basic Structure
The Preamble declares India to be a **Sovereign, Socialist, Secular, Democratic Republic** committed to Justice, Liberty, Equality, and Fraternity. The 42nd Amendment (1976) added *Socialist, Secular, and Integrity*.

### 2. Fundamental Rights (Part III, Articles 12-35)
- **Art 14-18:** Right to Equality (Rule of Law, abolition of untouchability Art 17).
- **Art 19:** 6 Freedoms (Speech, Assembly, Association, Movement, Residence, Profession).
- **Art 21:** Protection of Life and Personal Liberty (includes Right to Privacy via Puttaswamy case 2017).
- **Art 32:** Constitutional Remedies Writs (Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto).
        `
      },
      {
        id: 'upsc-economy-learn',
        subject: 'Indian Economy & Macroeconomics',
        icon: '📈',
        readTime: '18 Mins Read',
        summary: 'Monetary Policy, Fiscal Deficit, Inflation Indices, Banking Reforms & Budget 2026-27.',
        keyFacts: [
          'Monetary Policy Committee (MPC): 6 members target CPI inflation at 4% (+/- 2%).',
          'Repo Rate: Rate at which RBI lends short-term money to commercial banks against G-Secs.',
          'Fiscal Deficit = Total Expenditure - (Revenue Receipts + Non-debt Capital Receipts).',
          'GST Council (Article 279A): Chaired by Union Finance Minister with 3/4th majority voting system.'
        ],
        conceptNotes: `
### 1. Monetary Policy Tools
- **Repo Rate & Reverse Repo:** Quantitative liquidity controls.
- **Cash Reserve Ratio (CRR):** Percentage of NDTL banks must hold with RBI in cash.
- **Statutory Liquidity Ratio (SLR):** Mandated liquid assets (Gold, G-Secs, Cash) held by banks.
        `
      }
    ],

    // ── PREVIOUS YEARS QUESTION PAPERS (PYQ VAULT) ────────────────────
    pyqPapers: [
      {
        id: 'upsc-pyq-2024',
        year: '2024',
        title: 'UPSC CSE 2024 Prelims General Studies (Paper 1)',
        paperType: 'Official Real Paper',
        timeLimitMins: 15,
        totalMarks: 30,
        negativeMark: 0.66,
        questions: [
          {
            id: 'u24-1',
            q: 'Consider the following statements regarding the "Basic Structure Doctrine" of the Indian Constitution:\n1. The phrase "Basic Structure" is explicitly defined under Article 368 of the Constitution.\n2. In the Kesavananda Bharati case (1973), the Supreme Court ruled that Parliament cannot alter the basic structure even through a constitutional amendment.\n3. The Preamble is recognized as part of the Basic Structure.\nWhich of the statements given above are correct?',
            options: ['1 and 2 only', '2 and 3 only', '1 and 3 only', '1, 2 and 3'],
            correct: 1,
            explanation: 'Statement 1 is incorrect: The Constitution does NOT explicitly define "Basic Structure"; it was evolved judicially by the Supreme Court in the 1973 Kesavananda Bharati ruling. Statements 2 and 3 are correct.'
          },
          {
            id: 'u24-2',
            q: 'With reference to the Monetary Policy Committee (MPC) in India, consider the following:\n1. It determines the policy repo rate required to achieve the inflation target.\n2. It is a 6-member committee including the RBI Governor and members appointed by the Central Government.\n3. The RBI Governor has a casting vote in the event of a tie.\nWhich of the statements given above is/are correct?',
            options: ['1 and 2 only', '2 and 3 only', '1, 2 and 3', '1 only'],
            correct: 2,
            explanation: 'All three statements are correct under Section 45ZB of the amended RBI Act 1934: MPC has 6 members, sets repo rate to target 4% (+/-2%) CPI inflation, and RBI Governor holds casting vote.'
          },
          {
            id: 'u24-3',
            q: 'Which of the following Ramsar Wetland sites in India is located at the confluence of the Beas and Satluj rivers?',
            options: ['Sambhar Lake', 'Harike Wetland', 'Loktak Lake', 'Kolleru Lake'],
            correct: 1,
            explanation: 'Harike Wetland in Punjab is situated at the confluence of the Beas and Satluj rivers and was designated a Ramsar site in 1990.'
          }
        ]
      },
      {
        id: 'upsc-pyq-2023',
        year: '2023',
        title: 'UPSC CSE 2023 Prelims General Studies (Paper 1)',
        paperType: 'Official Real Paper',
        timeLimitMins: 15,
        totalMarks: 30,
        negativeMark: 0.66,
        questions: [
          {
            id: 'u23-1',
            q: 'In the context of Indian economy, what does "Sterilization" by the Reserve Bank of India refer to?',
            options: [
              'Controlling commercial banks through statutory reserve ratios (CRR/SLR)',
              'Open Market Operations (OMO) to neutralize the impact of forex inflows/outflows on domestic money supply',
              'Restructuring non-performing assets (NPAs) of public sector banks',
              'Setting priority sector lending limits for foreign banks'
            ],
            correct: 1,
            explanation: 'Sterilization refers to the RBI buying or selling government securities in the open market (OMO) to absorb or inject domestic liquidity caused by foreign exchange interventions.'
          },
          {
            id: 'u23-2',
            q: 'Consider the following pairs of ancient dynasties and their rock-cut architectural monuments:\n1. Pallavas : Shore Temple, Mahabalipuram\n2. Rashtrakutas : Kailasa Temple, Ellora\n3. Cholas : Brihadisvara Temple, Thanjavur\nHow many of the above pairs are correctly matched?',
            options: ['Only one pair', 'Only two pairs', 'All three pairs', 'None of the pairs'],
            correct: 2,
            explanation: 'All three pairs are correct. Pallavas built Shore Temple (Narasimhavarman II), Rashtrakutas built monolithic Kailasa Temple at Ellora (Krishna I), and Cholas built Brihadisvara Temple (Rajaraja I).'
          }
        ]
      }
    ],

    // ── 4 LEVELS WITH MULTIPLE QUESTION PAPERS IN EACH LEVEL ──────────
    progressiveLevels: [
      {
        levelNumber: 1,
        levelTitle: 'Level 1: Foundation & NCERT Drill (Easy)',
        levelBadge: '🟢 Easy / Basic NCERT',
        levelDescription: 'Fundamental NCERT conceptual checkpoints across Polity, History, Science and Geography.',
        papers: [
          {
            id: 'u-l1-p1',
            paperCode: 'UPSC-L1-SET-A',
            title: 'Set 1: Basic Indian Polity & Constitutional Articles',
            timeLimitMins: 10,
            passingCutoff: 60,
            negativeMark: 0.33,
            questions: [
              {
                id: 'u-l1-p1-1',
                q: 'Which Article of the Indian Constitution provides for the "Abolition of Untouchability"?',
                options: ['Article 14', 'Article 17', 'Article 19', 'Article 21'],
                correct: 1,
                explanation: 'Article 17 explicitly abolishes untouchability and forbids its practice in any form.'
              },
              {
                id: 'u-l1-p1-2',
                q: 'What is the minimum age prescribed for an Indian citizen to become the President of India?',
                options: ['25 Years', '30 Years', '35 Years', '40 Years'],
                correct: 2,
                explanation: 'Under Article 58, a candidate must have completed the age of 35 years to be eligible for election as President.'
              },
              {
                id: 'u-l1-p1-3',
                q: 'Which Schedule of the Constitution contains the list of 22 officially recognized languages in India?',
                options: ['7th Schedule', '8th Schedule', '9th Schedule', '10th Schedule'],
                correct: 1,
                explanation: 'The Eighth Schedule of the Indian Constitution lists the 22 official languages.'
              }
            ]
          },
          {
            id: 'u-l1-p2',
            paperCode: 'UPSC-L1-SET-B',
            title: 'Set 2: Ancient History & NCERT Geography Basics',
            timeLimitMins: 10,
            passingCutoff: 60,
            negativeMark: 0.33,
            questions: [
              {
                id: 'u-l1-p2-1',
                q: 'The ancient Harappan site of "Lothal", celebrated for its tidal dockyard, is situated in which state?',
                options: ['Rajasthan', 'Gujarat', 'Punjab', 'Haryana'],
                correct: 1,
                explanation: 'Lothal is located along the Bhogava river in the Bhal region of Gujarat.'
              },
              {
                id: 'u-l1-p2-2',
                q: 'Which is the longest river in Peninsular India (often called Dakshin Ganga)?',
                options: ['Mahanadi', 'Godavari', 'Krishna', 'Cauvery'],
                correct: 1,
                explanation: 'Godavari is the longest river in peninsular India with a total length of about 1,465 km.'
              }
            ]
          }
        ]
      },
      {
        levelNumber: 2,
        levelTitle: 'Level 2: Standard Prelims Speed Mocks (Medium)',
        levelBadge: '🟡 Medium / Standard Exam',
        levelDescription: 'Standard 2-statement speed mocks covering standard textbooks (Laxmikanth, Spectrum, Ramesh Singh).',
        papers: [
          {
            id: 'u-l2-p1',
            paperCode: 'UPSC-L2-SET-A',
            title: 'Set 1: Economy & Finance Commission Speed Mock',
            timeLimitMins: 12,
            passingCutoff: 65,
            negativeMark: 0.66,
            questions: [
              {
                id: 'u-l2-p1-1',
                q: 'Consider the following statements regarding the Finance Commission of India:\n1. It is a constitutional body constituted under Article 280 every fifth year.\n2. Its recommendations on tax devolution are binding on the Union Government.\nWhich of the statements given above is/are correct?',
                options: ['1 only', '2 only', 'Both 1 and 2', 'Neither 1 nor 2'],
                correct: 0,
                explanation: 'Statement 1 is correct (Art 280). Statement 2 is incorrect (Recommendations are advisory in nature).'
              },
              {
                id: 'u-l2-p1-2',
                q: 'What happens to the Gross Domestic Product (GDP) when depreciation of capital goods is subtracted from it?',
                options: ['Gross National Product (GNP)', 'Net Domestic Product (NDP)', 'Net National Product (NNP)', 'National Income at Factor Cost'],
                correct: 1,
                explanation: 'NDP = GDP - Depreciation (Consumption of Fixed Capital).'
              }
            ]
          },
          {
            id: 'u-l2-p2',
            paperCode: 'UPSC-L2-SET-B',
            title: 'Set 2: Environmental Governance & Protected Areas Mock',
            timeLimitMins: 12,
            passingCutoff: 65,
            negativeMark: 0.66,
            questions: [
              {
                id: 'u-l2-p2-1',
                q: 'Which of the following National Parks is famously home to the endangered Great Indian One-Horned Rhinoceros?',
                options: ['Jim Corbett National Park', 'Kaziranga National Park', 'Bandipur National Park', 'Ranthambore National Park'],
                correct: 1,
                explanation: 'Kaziranga National Park in Assam holds the world’s largest population of One-Horned Rhinoceroses.'
              },
              {
                id: 'u-l2-p2-2',
                q: 'Which international environmental protocol was adopted in 1987 to protect the stratospheric ozone layer by phasing out CFCs?',
                options: ['Kyoto Protocol', 'Montreal Protocol', 'Nagoya Protocol', 'Basel Convention'],
                correct: 1,
                explanation: 'The Montreal Protocol on Substances that Deplete the Ozone Layer was signed in 1987.'
              }
            ]
          }
        ]
      },
      {
        levelNumber: 3,
        levelTitle: 'Level 3: Advanced Multi-Statement Analytical Challenge (Hard)',
        levelBadge: '🟠 Hard / Analytical Pairs',
        levelDescription: 'Complex multi-concept questions with tricky pair matching and analytical traps.',
        papers: [
          {
            id: 'u-l3-p1',
            paperCode: 'UPSC-L3-SET-A',
            title: 'Set 1: Parliament Procedures & Constitutional Deadlocks',
            timeLimitMins: 12,
            passingCutoff: 70,
            negativeMark: 0.66,
            questions: [
              {
                id: 'u-l3-p1-1',
                q: 'Consider the following statements regarding the "Joint Sitting" of Parliament:\n1. It is summoned by the President and presided over by the Speaker of the Lok Sabha.\n2. A Joint Sitting can be convened for Ordinary Bills, Financial Bills, and Constitutional Amendment Bills.\n3. In a Joint Sitting, decisions are taken by a simple majority of total members present and voting.\nWhich of the statements given above are correct?',
                options: ['1 and 2 only', '1 and 3 only', '2 and 3 only', '1, 2 and 3'],
                correct: 1,
                explanation: 'Statement 1 & 3 are correct (Art 108). Statement 2 is incorrect: Joint Sitting cannot be convened for Money Bills or Constitutional Amendment Bills (Art 368).'
              },
              {
                id: 'u-l3-p1-2',
                q: 'With reference to the "Carbon Border Adjustment Mechanism (CBAM)", consider:\n1. It is a tariff imposed by the European Union on carbon-intensive imports like steel, aluminium, cement, and electricity.\n2. It aims to prevent carbon leakage and promote decarbonization globally.\nWhich of the statements given above is/are correct?',
                options: ['1 only', '2 only', 'Both 1 and 2', 'Neither 1 nor 2'],
                correct: 2,
                explanation: 'Both statements are correct. The EU CBAM targets carbon-heavy industrial goods imported into Europe.'
              }
            ]
          }
        ]
      },
      {
        levelNumber: 4,
        levelTitle: 'Level 4: Ultimate Hardest Grandmaster Qualifier (Extreme Hardest)',
        levelBadge: '🔴 Extreme Hardest / Qualifier Tier',
        levelDescription: 'The highest difficulty qualifier test. Scoring >= 75% certifies you 100% Exam-Ready and guarantees top rank readiness.',
        papers: [
          {
            id: 'u-l4-p1',
            paperCode: 'UPSC-L4-AIR-1',
            title: 'Set 1: All-India Rank 1 Grandmaster Qualifier Paper',
            timeLimitMins: 10,
            passingCutoff: 75,
            negativeMark: 0.66,
            questions: [
              {
                id: 'u-l4-p1-1',
                q: 'Consider the following statements regarding the Constitutional Amendment process under Article 368:\nStatement I: A Constitutional Amendment Bill can be introduced in either House of Parliament or in State Legislatures.\nStatement II: The President is bound to give assent to a Constitutional Amendment Bill and cannot exercise pocket veto or send it back for reconsideration.\nStatement III: If there is a deadlock between Lok Sabha and Rajya Sabha on a Constitutional Amendment Bill, a Joint Sitting under Article 108 is summoned by the President.\nWhich of the statements given above is/are CORRECT?',
                options: ['Statement I and II only', 'Statement II only', 'Statement II and III only', 'Statement I, II and III'],
                correct: 1,
                explanation: 'Only Statement II is correct (24th Amendment 1971 made presidential assent mandatory). Statement I is incorrect (cannot be introduced in State Legislatures). Statement III is incorrect (No provision for joint sitting for constitutional amendments under Art 368).'
              },
              {
                id: 'u-l4-p1-2',
                q: 'Consider the following statements regarding India’s Balance of Payments:\n1. Software service exports and inward worker remittances are recorded under the "Capital Account".\n2. External Commercial Borrowings (ECBs) and Foreign Direct Investment (FDI) are recorded under the "Current Account".\n3. High Current Account Deficit (CAD) puts downward depreciation pressure on the Indian Rupee.\nWhich of the statements given above is/are CORRECT?',
                options: ['1 and 2 only', '3 only', '1 and 3 only', '1, 2 and 3'],
                correct: 1,
                explanation: 'Statement 1 is incorrect (Invisibles under Current Account). Statement 2 is incorrect (Capital Account). Statement 3 is correct.'
              },
              {
                id: 'u-l4-p1-3',
                q: 'Which of the following river drainage networks correctly flows from North to South in the Indian subcontinent?',
                options: [
                  'Indus → Jhelum → Chenab → Ravi → Beas → Satluj',
                  'Jhelum → Chenab → Indus → Ravi → Satluj → Beas',
                  'Indus → Ravi → Jhelum → Chenab → Satluj → Beas',
                  'Chenab → Indus → Jhelum → Beas → Ravi → Satluj'
                ],
                correct: 0,
                explanation: 'Exact order from North to South is: Indus → Jhelum → Chenab → Ravi → Beas → Satluj.'
              },
              {
                id: 'u-l4-p1-4',
                q: 'Under the Indian Constitution, the power to grant pardons under Article 72 (President) vs Article 161 (Governor) differs in which of the following aspects?\n1. The President can pardon death sentences, whereas the Governor cannot.\n2. The President can grant pardon in respect of punishments by a Court Martial (Military Court), whereas the Governor cannot.\nWhich of the statements given above is/are correct?',
                options: ['1 only', '2 only', 'Both 1 and 2', 'Neither 1 nor 2'],
                correct: 2,
                explanation: 'Both statements 1 and 2 represent the precise constitutional distinctions between Art 72 and Art 161.'
              }
            ]
          },
          {
            id: 'u-l4-p2',
            paperCode: 'UPSC-L4-AIR-2',
            title: 'Set 2: Extreme Pressure Cutoff Decider Simulation',
            timeLimitMins: 10,
            passingCutoff: 75,
            negativeMark: 0.66,
            questions: [
              {
                id: 'u-l4-p2-1',
                q: 'With reference to Carbon Border Adjustment Mechanism (CBAM) and Global Climate Governance, consider:\n1. CBAM is a carbon tariff imposed by the European Union on carbon-intensive imports like steel, cement, and electricity.\n2. Common But Differentiated Responsibilities and Respective Capabilities (CBDR-RC) is enshrined in Article 3 of the UNFCCC.\n3. Article 6 of the Paris Agreement outlines the framework for global international carbon credit trading markets.\nHow many of the statements given above are CORRECT?',
                options: ['Only one', 'Only two', 'All three', 'None'],
                correct: 2,
                explanation: 'All three statements are correct under international climate governance treaties.'
              },
              {
                id: 'u-l4-p2-2',
                q: 'Consider the following statements regarding the "Doctrine of Severability" under Article 13 of the Indian Constitution:\n1. If an unconstitutional part of a law can be separated from the valid part, only the unconstitutional part is void.\n2. The Supreme Court established this in the A.K. Gopalan case (1950).\nWhich of the statements given above is/are correct?',
                options: ['1 only', '2 only', 'Both 1 and 2', 'Neither 1 nor 2'],
                correct: 2,
                explanation: 'Both statements are correct. Article 13(1) and 13(2) incorporate the doctrine of severability.'
              }
            ]
          }
        ]
      }
    ]
  },

  {
    id: 'tnpsc-group1',
    category: 'TNPSC',
    name: 'TNPSC Group 1, 2 & 4 (Tamil Nadu Public Service Commission)',
    shortName: 'TNPSC Group 1 / 2 / 4',
    icon: '🏛️',
    conductingBody: 'Tamil Nadu Public Service Commission',
    degreeRequired: 'Degree for Group 1/2 (B.E/B.Tech, B.Sc, B.Com, B.A) | 10th Pass for Group 4 (VAO / Typist)',
    eligiblePosts: 'Deputy Collector (RDO), Deputy Superintendent of Police (DSP), Commercial Tax Officer (CTO), VAO (Village Administrative Officer)',
    ageLimit: '21 to 39 Years (BC/MBC/SC/ST: Up to 39 Years for Group 1)',
    salary: '₹56,100 – ₹2,05,700/month (Level 22 Pay Matrix for Group 1)',
    vacancies: '4,500+ Posts Annually across Group 1, 2, 2A & 4',
    applyLink: 'https://tnpsc.gov.in',
    dates: {
      notification: 'March 2026',
      prelims: 'July 2026',
      mains: 'November 2026',
      interview: 'Feb 2027'
    },
    cutoffMarks: { prelims: '135 / 200 Questions (Group 1)', group4: '165+ / 200 Questions (VAO/Junior Assistant)' },

    learningModules: [
      {
        id: 'tn-unit8-learn',
        subject: 'Unit 8: History, Culture, Heritage & Thirukkural',
        icon: '📜',
        readTime: '15 Mins Read',
        summary: 'Sangam Era, Keeladi excavations, Thirukkural Governance Doctrines, Freedom Fighters of Tamil Nadu & Dravidian Movement.',
        keyFacts: [
          'Keeladi excavations established an urban river civilization on Vaigai basin dated to 580 BCE.',
          'Rani Velu Nachiyar (1780) was the first Indian queen to wage war against the British East India Company.',
          'VO Chidambaranar launched the Swadeshi Steam Navigation Company in 1906 from Tuticorin to Colombo.',
          'Justice Party passed the Communal G.O. (1921/1922) initiating affirmative reservation in Madras Presidency.'
        ],
        conceptNotes: `
### 1. Archaeological Sites in Tamil Nadu
- **Keeladi (Sivagangai):** Urban civilization, brick structures, drainage system, Tamil-Brahmi inscribed potsherds.
- **Adichanallur (Thoothukudi):** Urn burials, iron weapons, gold diadems, bronze artifacts.

### 2. Thirukkural - High Yield Governance Kurals
- **Kural 390 (Irai Matchi):** "Kodai Ali Sengol Kudiyombal Naangum Udaiyanaam Vendharkku Oli" (Charity, mercy, just sceptre, and care of subjects make an ideal king).
        `
      }
    ],

    pyqPapers: [
      {
        id: 'tnpsc-pyq-2024',
        year: '2024',
        title: 'TNPSC Group 1 2024 Prelims General Studies',
        paperType: 'Official Real Paper',
        timeLimitMins: 15,
        totalMarks: 30,
        negativeMark: 0,
        questions: [
          {
            id: 'tn24-1',
            q: 'Which Sangam archaeological site on the banks of the Vaigai river provided scientific evidence of an urban civilization in Tamil Nadu dating back to the 6th century BCE?',
            options: ['Arikamedu', 'Keeladi', 'Kodumanal', 'Alagankulam'],
            correct: 1,
            explanation: 'Keeladi excavations in Sivagangai district along the Vaigai river basin confirmed an urban civilization with Tamil-Brahmi script dating back to 580 BCE.'
          },
          {
            id: 'tn24-2',
            q: 'The famous Rajamannar Committee was appointed by the Government of Tamil Nadu in 1969 to examine which of the following areas?',
            options: [
              'Panchayati Raj reforms in rural Tamil Nadu',
              'Centre-State Relations and State Autonomy',
              'Electoral reforms and state funding of elections',
              'Reorganization of state administrative districts'
            ],
            correct: 1,
            explanation: 'In 1969, the DMK government headed by Dr. M. Karunanidhi appointed the 3-member P.V. Rajamannar Committee to study Centre-State relations.'
          }
        ]
      }
    ],

    progressiveLevels: [
      {
        levelNumber: 1,
        levelTitle: 'Level 1: Samacheer Kalvi Foundation (Easy)',
        levelBadge: '🟢 Easy / School Books',
        levelDescription: 'Direct school textbook questions from Tamil Nadu Samacheer Kalvi Classes 6-10.',
        papers: [
          {
            id: 'tn-l1-p1',
            paperCode: 'TNPSC-L1-SET-A',
            title: 'Set 1: Tamil Heritage & Sangam Port Cities',
            timeLimitMins: 10,
            passingCutoff: 60,
            negativeMark: 0,
            questions: [
              {
                id: 'tn-l1-p1-1',
                q: 'Which port city was the major naval trade hub of the Early Cholas during the Sangam age?',
                options: ['Korkai', 'Poompuhar (Kaveripoompattinam)', 'Musiri', 'Thondi'],
                correct: 1,
                explanation: 'Poompuhar (Kaveripoompattinam) at the mouth of the Cauvery river was the primary port city and capital of the Early Cholas.'
              },
              {
                id: 'tn-l1-p1-2',
                q: 'What is the total number of verses (Kurals) contained in Thirukkural, organized into 133 chapters?',
                options: ['1000', '1330', '1500', '1250'],
                correct: 1,
                explanation: 'Thirukkural consists of exactly 1,330 couplets (Kurals) divided across 133 Athikarams.'
              }
            ]
          },
          {
            id: 'tn-l1-p2',
            paperCode: 'TNPSC-L1-SET-B',
            title: 'Set 2: Basic Tamil Nadu Geography & Rivers',
            timeLimitMins: 10,
            passingCutoff: 60,
            negativeMark: 0,
            questions: [
              {
                id: 'tn-l1-p2-1',
                q: 'Where does the Cauvery river enter Tamil Nadu territory near Dharmapuri district with a famous waterfall?',
                options: ['Courtallam', 'Hogenakkal Falls', 'Suruli Falls', 'Thiruparappu'],
                correct: 1,
                explanation: 'Cauvery enters Tamil Nadu at Hogenakkal in Dharmapuri district.'
              }
            ]
          }
        ]
      },
      {
        levelNumber: 2,
        levelTitle: 'Level 2: TNPSC Speed Mock & Aptitude (Medium)',
        levelBadge: '🟡 Medium / Standard Exam',
        levelDescription: 'Standard TNPSC Group 1/2 preliminary questions covering Unit 8, Unit 9 and Math aptitude.',
        papers: [
          {
            id: 'tn-l2-p1',
            paperCode: 'TNPSC-L2-SET-A',
            title: 'Set 1: Aptitude & Social Reformers Mock',
            timeLimitMins: 12,
            passingCutoff: 65,
            negativeMark: 0,
            questions: [
              {
                id: 'tn-l2-p1-1',
                q: 'Find the LCM of 24, 36, and 40:',
                options: ['240', '360', '480', '180'],
                correct: 1,
                explanation: 'Prime factors: 24 = 2³ × 3; 36 = 2² × 3²; 40 = 2³ × 5. LCM = 2³ × 3² × 5 = 360.'
              },
              {
                id: 'tn-l2-p1-2',
                q: 'Which pioneering medical practitioner from Tamil Nadu was nominated as the first woman legislator in British India in 1926?',
                options: ['Dr. Muthulakshmi Reddy', 'Moovalur Ramamirtham Ammaiyar', 'Rukmani Lakshmipathi', 'Asambigai Ammal'],
                correct: 0,
                explanation: 'Dr. Muthulakshmi Reddy was nominated to the Madras Legislative Council in 1926.'
              }
            ]
          }
        ]
      },
      {
        levelNumber: 3,
        levelTitle: 'Level 3: Advanced History & Welfare Scheme Analysis (Hard)',
        levelBadge: '🟠 Hard / Scheme Analysis',
        levelDescription: 'Tough matchings on socio-political evolution, high-tier aptitude, and Tamil Nadu industrial indices.',
        papers: [
          {
            id: 'tn-l3-p1',
            paperCode: 'TNPSC-L3-SET-A',
            title: 'Set 1: Justice Party & Communal G.O. Advanced Paper',
            timeLimitMins: 12,
            passingCutoff: 70,
            negativeMark: 0,
            questions: [
              {
                id: 'tn-l3-p1-1',
                q: 'Consider the following statements regarding the Justice Party administration:\n1. Passed resolution enfranchising women with voting rights in 1921.\n2. Established the Staff Selection Board in 1924 (precursor to TNPSC).\n3. Enacted the Hindu Religious Endowments Act in 1926.\nWhich of the statements given above are CORRECT?',
                options: ['1 and 2 only', '2 and 3 only', '1, 2 and 3', '1 and 3 only'],
                correct: 2,
                explanation: 'All three statements are historically accurate milestones enacted by the Justice Party ministry.'
              }
            ]
          }
        ]
      },
      {
        levelNumber: 4,
        levelTitle: 'Level 4: TNPSC Group 1 Grandmaster Qualifier (Extreme Hardest)',
        levelBadge: '🔴 Extreme Hardest / Qualifier Tier',
        levelDescription: 'The highest difficulty qualifier test for Group 1 Top Rankers. Passing guarantees 100% Exam Readiness for Deputy Collector / DSP selection.',
        papers: [
          {
            id: 'tn-l4-p1',
            paperCode: 'TNPSC-L4-AIR-1',
            title: 'Set 1: Deputy Collector / DSP Merit Decider Qualifier',
            timeLimitMins: 10,
            passingCutoff: 75,
            negativeMark: 0,
            questions: [
              {
                id: 'tn-l4-p1-1',
                q: 'Regarding Tamil Nadu’s 69% reservation policy, which Constitutional Amendment placed the Tamil Nadu Backward Classes, Scheduled Castes and Scheduled Tribes (Reservation of Seats) Act 1993 into the 9th Schedule of the Constitution of India?',
                options: ['73rd Constitutional Amendment Act, 1992', '76th Constitutional Amendment Act, 1994', '86th Constitutional Amendment Act, 2002', '103rd Constitutional Amendment Act, 2019'],
                correct: 1,
                explanation: 'The 76th Constitutional Amendment Act (1994) inserted the Tamil Nadu 69% Reservation Act into the Ninth Schedule.'
              },
              {
                id: 'tn-l4-p1-2',
                q: 'Which brave woman warrior was the commander of Rani Velu Nachiyar’s women army ("Udaiyaal Padai") who carried out a heroic suicide mission by setting herself on fire inside the British ammunition depot in 1780?',
                options: ['Kuyili', 'Moovalur Ramamirtham', 'Thillaiyadi Valliammai', 'Anjalai Ammal'],
                correct: 0,
                explanation: 'Commander Kuyili detonated the British armory in Sivagangai fort, securing victory in 1780.'
              },
              {
                id: 'tn-l4-p1-3',
                q: 'Which flagship welfare scheme of the Government of Tamil Nadu provides ₹1,000 monthly financial assistance directly to girl students pursuing higher education who studied in government schools from classes 6 to 12?',
                options: ['Moovalur Ramamirtham Ammaiyar Pudhumai Penn Scheme', 'Kalaignar Magalir Urimai Thogai Scheme', 'Muthulakshmi Reddy Maternity Scheme', 'Naan Mudhalvan Skill Scheme'],
                correct: 0,
                explanation: 'Pudhumai Penn Scheme transfers ₹1,000 per month directly to higher education girl students.'
              }
            ]
          }
        ]
      }
    ]
  },

  {
    id: 'ssc-cgl',
    category: 'SSC',
    name: 'SSC CGL & CHSL (Combined Graduate Level Exam)',
    shortName: 'SSC CGL / CHSL',
    icon: '📊',
    conductingBody: 'Staff Selection Commission (Govt of India)',
    degreeRequired: 'Bachelor’s Degree in any discipline (for CGL) | 12th Pass (for CHSL)',
    eligiblePosts: 'Income Tax Inspector, ASO in Ministry of External Affairs, CBI Sub-Inspector, Central Excise Inspector, CAG Auditor',
    ageLimit: '18 to 32 Years',
    salary: '₹35,400 – ₹1,42,400/month (Pay Level 4 to Level 8)',
    vacancies: '17,500+ Central Government Group B & C Posts',
    applyLink: 'https://ssc.gov.in',
    dates: {
      notification: 'June 2026',
      tier1: 'September 2026',
      tier2: 'December 2026'
    },
    cutoffMarks: { tier1: '138 - 148 / 200 (UR Category)', tier2: '315+ / 390 (Final Merit Post)' },

    learningModules: [
      {
        id: 'ssc-quant-learn',
        subject: 'Quantitative Aptitude & Advanced Mathematics',
        icon: '📐',
        readTime: '15 Mins Read',
        summary: 'Geometry theorems, Trigonometric identities, Algebra formulas, Compound Interest shortcuts.',
        keyFacts: [
          'Incentre angle of triangle = 90° + A/2; Circumcentre angle = 2A.',
          'Length of Direct Common Tangent (DCT) = √(d² - (r1 - r2)²).',
          'If (x + 1/x) = k, then (x² + 1/x²) = k² - 2; (x³ + 1/x³) = k³ - 3k.'
        ],
        conceptNotes: `
### 1. Core Algebra Shortcuts
- $(a + b + c = 0) \\implies a^3 + b^3 + c^3 = 3abc$.
- If $x + 1/x = 2 \\implies x = 1$.
- If $x + 1/x = \\sqrt{3} \\implies x^6 = -1$.
        `
      }
    ],

    pyqPapers: [
      {
        id: 'ssc-pyq-2024',
        year: '2024',
        title: 'SSC CGL 2024 Tier 1 Official Shift 1 Paper',
        paperType: 'Official Real Paper',
        timeLimitMins: 15,
        totalMarks: 30,
        negativeMark: 0.50,
        questions: [
          {
            id: 's24-1',
            q: 'If (x + 1/x) = 4, then find the value of (x⁴ + 1/x⁴):',
            options: ['194', '196', '202', '188'],
            correct: 0,
            explanation: 'x² + 1/x² = 4² - 2 = 14. Then x⁴ + 1/x⁴ = 14² - 2 = 196 - 2 = 194.'
          },
          {
            id: 's24-2',
            q: 'Which classical dance form of India was preserved and popularized by Rukmini Devi Arundale at Kalakshetra in Chennai?',
            options: ['Kathakali', 'Bharatanatyam', 'Odissi', 'Mohiniyattam'],
            correct: 1,
            explanation: 'Rukmini Devi Arundale revived and institutionalized Bharatanatyam.'
          }
        ]
      }
    ],

    progressiveLevels: [
      {
        levelNumber: 1,
        levelTitle: 'Level 1: Basic Arithmetic & Grammar Check (Easy)',
        levelBadge: '🟢 Easy / Speed Drill',
        levelDescription: 'Quick arithmetic, ratio-percentage speed questions, and basic English grammar rules.',
        papers: [
          {
            id: 's-l1-p1',
            paperCode: 'SSC-L1-SET-A',
            title: 'Set 1: Percentage & Ratio Speed Drill',
            timeLimitMins: 10,
            passingCutoff: 60,
            negativeMark: 0.50,
            questions: [
              {
                id: 's-l1-p1-1',
                q: 'If an item marked at ₹800 is sold for ₹680, what is the percentage discount given?',
                options: ['12%', '15%', '18%', '20%'],
                correct: 1,
                explanation: 'Discount = 800 - 680 = ₹120. Discount % = (120 / 800) × 100 = 15%.'
              }
            ]
          }
        ]
      },
      {
        levelNumber: 2,
        levelTitle: 'Level 2: SSC Tier-1 Speed Mock (Medium)',
        levelBadge: '🟡 Medium / Tier-1 Standard',
        levelDescription: 'Standard mixed Quant, Reasoning, English, and General Awareness mock.',
        papers: [
          {
            id: 's-l2-p1',
            paperCode: 'SSC-L2-SET-A',
            title: 'Set 1: General Awareness & Computer Science Mock',
            timeLimitMins: 12,
            passingCutoff: 65,
            negativeMark: 0.50,
            questions: [
              {
                id: 's-l2-p1-1',
                q: 'In networking, which protocol is responsible for securely transferring encrypted web pages and operates by default on port 443?',
                options: ['FTP', 'HTTPS (HTTP over SSL/TLS)', 'SMTP', 'Telnet'],
                correct: 1,
                explanation: 'HTTPS operates on port 443 with SSL/TLS encryption.'
              }
            ]
          }
        ]
      },
      {
        levelNumber: 3,
        levelTitle: 'Level 3: Advanced Geometry & 3D Mensuration (Hard)',
        levelBadge: '🟠 Hard / 3D Mensuration',
        levelDescription: 'Tough 3D geometry, circles tangents, and advanced vocabulary passages.',
        papers: [
          {
            id: 's-l3-p1',
            paperCode: 'SSC-L3-SET-A',
            title: 'Set 1: Solid Geometry & Volume Recasting Paper',
            timeLimitMins: 12,
            passingCutoff: 70,
            negativeMark: 1.0,
            questions: [
              {
                id: 's-l3-p1-1',
                q: 'A solid metallic sphere of radius 6 cm is melted and recast into small cones of radius 2 cm and height 3 cm. How many such cones can be formed?',
                options: ['72', '64', '96', '48'],
                correct: 0,
                explanation: 'Sphere Vol = (4/3)π(6)³ = 288π. Cone Vol = (1/3)π(2)²(3) = 4π. Number = 288π / 4π = 72.'
              }
            ]
          }
        ]
      },
      {
        levelNumber: 4,
        levelTitle: 'Level 4: SSC CGL Tier-2 Grandmaster Merit Qualifier (Extreme Hardest)',
        levelBadge: '🔴 Extreme Hardest / Qualifier Tier',
        levelDescription: 'Highest difficulty merit qualifier. Scoring >= 75% certifies 100% Exam-Readiness for ASO MEA / Income Tax Inspector posts.',
        papers: [
          {
            id: 's-l4-p1',
            paperCode: 'SSC-L4-AIR-1',
            title: 'Set 1: ASO in MEA & Income Tax Inspector Merit Decider',
            timeLimitMins: 10,
            passingCutoff: 75,
            negativeMark: 1.0,
            questions: [
              {
                id: 's-l4-p1-1',
                q: 'In a triangle ABC, BC = 14 cm, AC = 12 cm, and AB = 10 cm. The angle bisector of ∠A meets BC at point D. Find the length of segment BD:',
                options: ['6.36 cm (approx 70/11 cm)', '5.5 cm', '8.4 cm', '7.0 cm'],
                correct: 0,
                explanation: 'Angle Bisector theorem: BD / DC = AB / AC = 10 / 12 = 5 / 6. BD = (5/11) × 14 = 70/11 ≈ 6.36 cm.'
              },
              {
                id: 's-l4-p1-2',
                q: 'Select the word that is opposite in meaning (Antonym) to "PERSPICACIOUS":',
                options: ['Astute', 'Obtuse', 'Sagacious', 'Discerning'],
                correct: 1,
                explanation: '"Perspicacious" means sharp, keen insight. Its direct opposite is "Obtuse" (dull-witted).'
              },
              {
                id: 's-l4-p1-3',
                q: 'If the simple interest on a sum for 3 years at 8% p.a. is ₹2,880, what will be the Compound Interest on the same sum for 2 years at 10% p.a. compounded annually?',
                options: ['₹2,520', '₹2,400', '₹2,650', '₹2,480'],
                correct: 0,
                explanation: 'SI = P × 8 × 3 / 100 = 2880 ⇒ P = ₹12,000. CI for 2 yrs at 10% = 12000 × (1.10² - 1) = 12000 × 0.21 = ₹2,520.'
              }
            ]
          }
        ]
      }
    ]
  },

  {
    id: 'banking-po',
    category: 'Banking',
    name: 'IBPS PO, SBI PO & Specialist Officer (Scale-I Officer)',
    shortName: 'SBI PO / IBPS PO',
    icon: '🏦',
    conductingBody: 'Institute of Banking Personnel Selection / State Bank of India',
    degreeRequired: 'Bachelor’s Degree in any discipline (B.Com, B.Sc, B.E/B.Tech, BBA, B.A)',
    eligiblePosts: 'Probationary Officer (Scale 1 Manager), IT Officer Scale 1, Agricultural Field Officer',
    ageLimit: '20 to 30 Years',
    salary: '₹65,000 – ₹82,000/month CTC + Leased Accommodation & Concessional Bank Loans',
    vacancies: '9,500+ Scale-I Officer Posts across 12 Public Sector Banks',
    applyLink: 'https://ibps.in',
    dates: {
      notification: 'August 2026',
      prelims: 'October 2026',
      mains: 'November 2026',
      interview: 'January 2027'
    },
    cutoffMarks: { prelims: '58 - 63 / 100 Marks', mains: '82 - 88 / 250 Marks', final: '48 - 53 / 100 Normalized' },

    learningModules: [
      {
        id: 'bank-learn-1',
        subject: 'Banking Awareness & Monetary Regulations',
        icon: '🏛️',
        readTime: '14 Mins Read',
        summary: 'Basel III Norms, PCA Framework, Priority Sector Lending, Bad Bank (NARCL) & RBI Circulars.',
        keyFacts: [
          'Basel III: Minimum CRAR mandated by RBI is 11.5% (including 2.5% Capital Conservation Buffer).',
          'Priority Sector Lending (PSL): 40% of Adjusted Net Bank Credit (ANBC) for domestic commercial banks.',
          'Prompt Corrective Action (PCA): Imposed when Net NPA > 6% or CRAR falls below 9%.'
        ],
        conceptNotes: `
### 1. NPA Classification System
- **SMA-0:** Principal/interest overdue 1-30 days.
- **SMA-1:** Principal/interest overdue 31-60 days.
- **SMA-2:** Principal/interest overdue 61-90 days.
- **Sub-Standard Asset:** NPA for $\\le 12$ months.
        `
      }
    ],

    pyqPapers: [
      {
        id: 'sbi-pyq-2024',
        year: '2024',
        title: 'SBI PO 2024 Prelims Official Shift Question Paper',
        paperType: 'Official Real Paper',
        timeLimitMins: 15,
        totalMarks: 30,
        negativeMark: 0.25,
        questions: [
          {
            id: 'b24-1',
            q: 'What is the full form of "PCA" framework invoked by the Reserve Bank of India on financially distressed banks?',
            options: ['Prompt Corrective Action', 'Primary Credit Authority', 'Public Capital Allocation', 'Priority Consumer Arbitration'],
            correct: 0,
            explanation: 'PCA stands for Prompt Corrective Action.'
          },
          {
            id: 'b24-2',
            q: 'Find the wrong number in the following number series:\n12, 14, 32, 102, 414, 2090',
            options: ['14', '32', '102', '414'],
            correct: 3,
            explanation: 'Pattern: (12×1)+2=14; (14×2)+4=32; (32×3)+6=102; (102×4)+8=416 (not 414); (416×5)+10=2090. Thus 414 is wrong.'
          }
        ]
      }
    ],

    progressiveLevels: [
      {
        levelNumber: 1,
        levelTitle: 'Level 1: Prelims Speed Math & Simplification (Easy)',
        levelBadge: '🟢 Easy / Calculation Speed',
        levelDescription: 'Quadratic equations, approximations, number series, and basic percentage calculations.',
        papers: [
          {
            id: 'b-l1-p1',
            paperCode: 'BANK-L1-SET-A',
            title: 'Set 1: Quadratic Equations & Series Speed Test',
            timeLimitMins: 10,
            passingCutoff: 60,
            negativeMark: 0.25,
            questions: [
              {
                id: 'b-l1-p1-1',
                q: 'Solve the quadratic equation: x² - 14x + 48 = 0. Find the roots of x:',
                options: ['6, 8', '-6, -8', '4, 12', '2, 24'],
                correct: 0,
                explanation: 'x² - 6x - 8x + 48 = 0 ⇒ (x - 6)(x - 8) = 0 ⇒ x = 6, 8.'
              }
            ]
          }
        ]
      },
      {
        levelNumber: 2,
        levelTitle: 'Level 2: Sectional Timed Prelims Mock (Medium)',
        levelBadge: '🟡 Medium / Timed Sectional',
        levelDescription: 'Standard SBI PO Prelims paper with puzzles and tabular data interpretation.',
        papers: [
          {
            id: 'b-l2-p1',
            paperCode: 'BANK-L2-SET-A',
            title: 'Set 1: Banking Awareness & Payment Systems Mock',
            timeLimitMins: 12,
            passingCutoff: 65,
            negativeMark: 0.25,
            questions: [
              {
                id: 'b-l2-p1-1',
                q: 'Which of the following describes the operational difference between RTGS and NEFT?',
                options: [
                  'RTGS processes transactions in continuous real-time gross settlement whereas NEFT processes in half-hourly batches.',
                  'NEFT is only available on weekdays whereas RTGS is 24x7.',
                  'RTGS has a maximum limit of ₹10,000 whereas NEFT has no limit.',
                  'NEFT charges higher service tax compared to RTGS.'
                ],
                correct: 0,
                explanation: 'RTGS settles transactions instantly on continuous gross basis; NEFT operates in half-hourly batches.'
              }
            ]
          }
        ]
      },
      {
        levelNumber: 3,
        levelTitle: 'Level 3: Multi-Variable Seating & Caselet DI (Hard)',
        levelBadge: '🟠 Hard / Caselet DI',
        levelDescription: 'Complex paragraph caselet data interpretation and conditional reasoning.',
        papers: [
          {
            id: 'b-l3-p1',
            paperCode: 'BANK-L3-SET-A',
            title: 'Set 1: Probability & High-Level Caselet DI',
            timeLimitMins: 12,
            passingCutoff: 70,
            negativeMark: 0.25,
            questions: [
              {
                id: 'b-l3-p1-1',
                q: 'A bag contains 5 red, 4 blue, and 3 green marbles. Three marbles are drawn at random without replacement. What is the probability that all three marbles are of different colors?',
                options: ['3/11 (approx 60/220)', '1/6', '5/22', '7/44'],
                correct: 0,
                explanation: 'Favorable = 5 × 4 × 3 = 60. Total = 12C3 = 220. Probability = 60/220 = 3/11.'
              }
            ]
          }
        ]
      },
      {
        levelNumber: 4,
        levelTitle: 'Level 4: SBI PO Mains Grandmaster Qualifier (Extreme Hardest)',
        levelBadge: '🔴 Extreme Hardest / Qualifier Tier',
        levelDescription: 'The ultimate hardest level banking qualifier test. Scoring >= 75% certifies 100% Exam Readiness for SBI PO Scale-I selection.',
        papers: [
          {
            id: 'b-l4-p1',
            paperCode: 'BANK-L4-AIR-1',
            title: 'Set 1: SBI PO Scale-1 Officer Merit Decider Paper',
            timeLimitMins: 10,
            passingCutoff: 75,
            negativeMark: 0.25,
            questions: [
              {
                id: 'b-l4-p1-1',
                q: 'Under Basel III regulatory norms, what is the minimum required Tier-1 Capital Adequacy Ratio (CAR) for Scheduled Commercial Banks in India as mandated by the Reserve Bank of India?',
                options: ['5.5%', '7.0%', '9.0%', '11.5% (including Capital Conservation Buffer)'],
                correct: 3,
                explanation: 'RBI mandates minimum 9% CRAR + 2.5% CCB = 11.5% total capital adequacy.'
              },
              {
                id: 'b-l4-p1-2',
                q: 'In a financial year, a bank’s Gross NPA is ₹8,000 Crore, and Provisioning for Bad Loans is ₹3,000 Crore. Total Advances are ₹1,00,000 Crore. What is the Net NPA percentage of the bank?',
                options: ['8.0%', '5.15% (5000 / 97000)', '5.0%', '3.0%'],
                correct: 1,
                explanation: 'Net NPA = 8000 - 3000 = ₹5,000 Cr. Net Advances = 100000 - 3000 = ₹97,000 Cr. Net NPA % = (5000 / 97000) × 100 ≈ 5.15%.'
              },
              {
                id: 'b-l4-p1-3',
                q: 'Statement: "The central bank has unexpectedly increased the Cash Reserve Ratio (CRR) by 50 basis points."\nWhich of the following is an immediate logical outcome of this monetary action?',
                options: [
                  'Commercial banks will have surplus liquidity and lending interest rates will decline.',
                  'Liquidity in the banking system will contract by approx ₹1 Lakh Crore, putting upward pressure on interest rates.',
                  'The value of the domestic currency will immediately crash against the US Dollar.',
                  'Government tax revenue collections will increase by 50%.'
                ],
                correct: 1,
                explanation: 'Hiking CRR forces banks to park more cash with RBI without interest, sucking out liquidity and tightening credit.'
              }
            ]
          }
        ]
      }
    ]
  }
]
