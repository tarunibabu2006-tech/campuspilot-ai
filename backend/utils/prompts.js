const SYSTEM_PROMPTS = {
  ta: 'நீ ஒரு தமிழ் பேசும் AI ஆசிரியர். இந்திய மாணவர்களுக்கு உதவும் வகையில் பதில் சொல். நட்பு மற்றும் உதவியாக பதில் சொல்.',
  hi: 'आप एक हिंदी बोलने वाले AI शिक्षक हैं। भारतीय छात्रों की मदद करें।',
  en: 'You are a friendly AI tutor for Indian students. Help them with academic and career guidance.'
}

export const EXAM_PLAN_PROMPT = (lang, subject, date, topics) => `
${SYSTEM_PROMPTS[lang] || SYSTEM_PROMPTS.en}

Generate an emergency exam study plan. Return ONLY valid JSON, no markdown.

Subject: ${subject}
Exam Date: ${date}
Topics: ${topics || 'All important topics'}

Return this exact JSON structure:
{
  "hourlyPlan": [
    { "hour": 1, "topic": "Topic name", "priority": "high", "duration": "45 mins", "tip": "Focus on..." }
  ],
  "highWeightageTopics": ["topic1", "topic2"],
  "tips": ["tip1", "tip2"],
  "quickRevision": "Last minute revision points",
  "totalHoursNeeded": 8
}`

export const VIVA_PROMPT = (lang, subject, difficulty, question, history) => `
${SYSTEM_PROMPTS[lang] || SYSTEM_PROMPTS.en}

You are conducting a viva voce examination.
Subject: ${subject}
Difficulty: ${difficulty}

${question ? `Previous question asked: ${question}` : 'Generate the first viva question.'}
${history ? `Conversation so far: ${JSON.stringify(history)}` : ''}

Return ONLY valid JSON, no markdown:
{
  "question": "Your viva question here",
  "difficulty": "${difficulty}",
  "expectedAnswer": "The ideal answer a student should give",
  "followUp": "A follow-up question based on the topic",
  "score": 0,
  "feedback": "Detailed feedback on the student's answer if provided",
  "hint": "A small hint if the student is struggling"
}`

export const PLACEMENT_PROMPT = (lang, company, role, skills) => `
${SYSTEM_PROMPTS[lang] || SYSTEM_PROMPTS.en}

Generate a detailed placement preparation roadmap. Return ONLY valid JSON, no markdown.

Company: ${company}
Role: ${role || 'Software Engineer'}
Current Skills: ${skills ? (Array.isArray(skills) ? skills.join(', ') : skills) : 'Not specified'}

Return this exact JSON structure:
{
  "company": "${company}",
  "role": "${role || 'Software Engineer'}",
  "companyInfo": "Brief about the company's hiring process",
  "eligibilityCriteria": "CGPA, backlogs etc.",
  "rounds": [
    { "round": "Online Test", "topics": ["Aptitude", "Coding"], "tips": "Practice tip" }
  ],
  "dsaTopics": [
    { "topic": "Arrays", "importance": "high", "questionsCount": 5 }
  ],
  "resources": [
    { "name": "Resource name", "url": "URL or description", "type": "free/paid" }
  ],
  "mockQuestions": [
    { "question": "Sample question", "difficulty": "medium", "topic": "Arrays" }
  ],
  "timeline": [
    { "week": 1, "focus": "Topic focus", "tasks": ["task1", "task2"] }
  ],
  "salaryRange": "Expected CTC range"
}`

export const NOTES_PROMPT = (lang, notes, title) => `
${SYSTEM_PROMPTS[lang] || SYSTEM_PROMPTS.en}

Process and enhance these study notes. Return ONLY valid JSON, no markdown.

Title: ${title || 'Study Notes'}
Content: ${notes}

Return this exact JSON structure:
{
  "title": "${title || 'Study Notes'}",
  "summary": "Concise summary of the notes",
  "keyPoints": ["Important point 1", "Important point 2"],
  "difficultConcepts": [
    { "concept": "Concept name", "simplifiedExplanation": "Easy explanation" }
  ],
  "examTips": ["How this topic appears in exams"],
  "relatedTopics": ["Related topic 1"],
  "mnemonics": ["Memory aid if applicable"],
  "xpEarned": 50
}`

export const FLASHCARD_PROMPT = (lang, content) => `
${SYSTEM_PROMPTS[lang] || SYSTEM_PROMPTS.en}

Generate study flashcards from this content. Return ONLY valid JSON, no markdown.

Content: ${content}

Return this exact JSON structure:
{
  "flashcards": [
    { "id": 1, "front": "Question or term", "back": "Answer or definition", "difficulty": "easy" }
  ],
  "totalCards": 10,
  "estimatedStudyTime": "15 minutes"
}`

export const BUNK_PLANNER_PROMPT = (lang, total, attended) => `
${SYSTEM_PROMPTS[lang] || SYSTEM_PROMPTS.en}

Calculate attendance and bunk planning. Return ONLY valid JSON, no markdown.

Total Classes: ${total}
Classes Attended: ${attended}
Required: 75% minimum

Return this exact JSON structure:
{
  "status": "Safe ✅ or Danger ⚠️",
  "currentPercentage": "calculated percentage",
  "canBunkTotal": "number of classes that can be bunked",
  "message": "Friendly message in ${lang}",
  "weeklyPlan": {
    "maxBunksPerWeek": 2,
    "safeDays": ["Monday", "Wednesday"]
  },
  "recoveryPlan": null
}

If attendance is below 75%, set recoveryPlan to:
{
  "classesToAttend": "number needed",
  "dailyTarget": "classes per day",
  "weeksNeeded": "estimated weeks",
  "strategy": "recovery strategy"
}`

export const JOB_CHECKER_PROMPT = (lang, jobDesc) => `
${SYSTEM_PROMPTS[lang] || SYSTEM_PROMPTS.en}

Analyze this job posting for potential scams. Be thorough. Return ONLY valid JSON, no markdown.

Job Description:
${jobDesc}

Return this exact JSON structure:
{
  "status": "SAFE or RISKY or AVOID",
  "confidence": 85,
  "riskScore": 3,
  "redFlags": ["Red flag 1", "Red flag 2"],
  "greenFlags": ["Green flag 1"],
  "summary": "Brief analysis in ${lang}",
  "suggestions": ["What the student should do"],
  "commonScamPatterns": ["Pattern this matches if any"],
  "verificationSteps": ["Step 1: Check company website"]
}`

export const SKILL_GAP_PROMPT = (lang, skills, role) => `
${SYSTEM_PROMPTS[lang] || SYSTEM_PROMPTS.en}

Analyze skill gap and create a learning roadmap. Return ONLY valid JSON, no markdown.

Current Skills: ${Array.isArray(skills) ? skills.join(', ') : skills}
Target Role: ${role}

Return this exact JSON structure:
{
  "targetRole": "${role}",
  "currentSkills": ["skill1"],
  "missingSkills": [
    { "skill": "Skill name", "importance": "critical/important/nice-to-have", "estimatedTime": "2 weeks" }
  ],
  "matchPercentage": 45,
  "roadmap": {
    "months": [
      {
        "month": 1,
        "focus": "Foundation Building",
        "topics": ["topic1", "topic2"],
        "resources": [
          { "name": "Resource", "url": "URL", "type": "free", "platform": "YouTube" }
        ],
        "projects": ["Build a TODO app"]
      }
    ]
  },
  "portfolioSuggestions": ["Project idea 1"],
  "certifications": ["Relevant certification"]
}`

export const CHAT_PROMPT = (lang, message) => `
${SYSTEM_PROMPTS[lang] || SYSTEM_PROMPTS.en}

You are CampusPilot AI, a friendly assistant for Indian college students.
You help with academics, career guidance, placement preparation, and student life.
Always be encouraging and practical.

Student's message: ${message}

Respond helpfully in ${lang}. Keep it conversational and student-friendly. Use emojis occasionally.`

export default SYSTEM_PROMPTS
