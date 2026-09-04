/**
 * CampusPilot AI — Exam Notification Email Templates
 * Responsive, modern HTML email templates for students
 */

export function buildExamEmailHTML(student, exam, notificationType = 'applicationStart') {
  const frontendUrl = process.env.FRONTEND_URL || 'https://campus-pilot-ai-eta.vercel.app'
  const studentName = student.name || 'Student'
  
  const typeConfigs = {
    applicationStart: {
      badgeColor: '#2563eb',
      badgeText: '📢 APPLICATION STARTED',
      headline: `Applications Open: ${exam.examName}`,
      highlightNote: 'The official application portal is now active. Complete your registration early to choose your preferred test center.'
    },
    applicationEnd: {
      badgeColor: '#dc2626',
      badgeText: '⏳ DEADLINE WARNING',
      headline: `Last Date Approaching: ${exam.examName}`,
      highlightNote: `Urgent! Registration for ${exam.examName} ends on ${exam.applicationEnd}. Complete payment and form submission now.`
    },
    admitCard: {
      badgeColor: '#7c3aed',
      badgeText: '🎫 ADMIT CARD RELEASED',
      headline: `Admit Card Available: ${exam.examName}`,
      highlightNote: 'Download and print your hall ticket immediately. Verify exam center, reporting time, and ID requirements.'
    },
    examDate: {
      badgeColor: '#ea580c',
      badgeText: '📅 EXAM DATE COUNTDOWN',
      headline: `Exam Schedule Reminder: ${exam.examName}`,
      highlightNote: `Your exam is scheduled for ${exam.examDate}. Review syllabus revision notes and attempt mock tests.`
    },
    result: {
      badgeColor: '#16a34a',
      badgeText: '📊 RESULT ANNOUNCED',
      headline: `Results Declared: ${exam.examName}`,
      highlightNote: 'Official results and cutoff merit lists have been published. Check your scorecard via the official link below.'
    },
    syllabusUpdate: {
      badgeColor: '#0891b2',
      badgeText: '📚 SYLLABUS UPDATED',
      headline: `Syllabus / Pattern Change: ${exam.examName}`,
      highlightNote: 'The conducting authority has released an updated exam pattern/syllabus document.'
    },
    patternChange: {
      badgeColor: '#d97706',
      badgeText: '⚠️ PATTERN CHANGE',
      headline: `Exam Pattern Changed: ${exam.examName}`,
      highlightNote: 'Notice of revised marking scheme and question paper format issued.'
    }
  }

  const currentType = typeConfigs[notificationType] || typeConfigs.applicationStart

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${exam.examName} Update</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f172a; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background: #1e293b; border-radius: 16px; border: 1px solid #334155; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
          
          <!-- Header Bar -->
          <tr>
            <td style="padding: 24px 28px; background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); border-bottom: 1px solid #334155;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-size: 20px; font-weight: 800; color: #38bdf8; letter-spacing: -0.5px;">CampusPilot AI</span>
                    <span style="display: block; font-size: 11px; color: #94a3b8; margin-top: 2px; text-transform: uppercase; letter-spacing: 1px;">Official Exam Notification Radar</span>
                  </td>
                  <td align="right">
                    <span style="background: ${currentType.badgeColor}; color: #ffffff; padding: 6px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block;">
                      ${currentType.badgeText}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td style="padding: 28px;">
              <h2 style="margin: 0 0 8px 0; font-size: 22px; color: #ffffff; line-height: 1.3;">${currentType.headline}</h2>
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #94a3b8;">Dear <strong>${studentName}</strong>,</p>
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #cbd5e1; line-height: 1.6;">
                ${exam.notificationDescription || currentType.highlightNote}
              </p>

              <!-- Exam Quick Info Box -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #0f172a; border-radius: 12px; border: 1px solid #334155; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <div style="font-size: 12px; font-weight: 700; color: #38bdf8; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.5px;">
                      📋 Exam Key Details
                    </div>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 13px; color: #cbd5e1;">
                      <tr>
                        <td style="padding: 5px 0; color: #94a3b8; width: 40%;"><strong>Exam Name:</strong></td>
                        <td style="padding: 5px 0; color: #ffffff; font-weight: 600;">${exam.examName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #94a3b8;"><strong>Conducting Body:</strong></td>
                        <td style="padding: 5px 0; color: #ffffff;">${exam.conductingBody}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #94a3b8;"><strong>Category / Stream:</strong></td>
                        <td style="padding: 5px 0; color: #ffffff;">${exam.category} (${(exam.stream || []).join(', ') || 'All Streams'})</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #94a3b8;"><strong>Eligibility:</strong></td>
                        <td style="padding: 5px 0; color: #ffffff;">${exam.eligibility}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #94a3b8;"><strong>Application Window:</strong></td>
                        <td style="padding: 5px 0; color: #38bdf8;">${exam.applicationStart} &nbsp;to&nbsp; <strong>${exam.applicationEnd}</strong></td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #94a3b8;"><strong>Exam Date:</strong></td>
                        <td style="padding: 5px 0; color: #f59e0b; font-weight: 700;">${exam.examDate}</td>
                      </tr>
                      ${exam.vacancies && exam.vacancies !== 'Not Specified' ? `
                      <tr>
                        <td style="padding: 5px 0; color: #94a3b8;"><strong>Vacancies:</strong></td>
                        <td style="padding: 5px 0; color: #10b981; font-weight: 600;">${exam.vacancies}</td>
                      </tr>` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Call to Action Buttons -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <a href="${exam.applyLink || exam.officialWebsite}" target="_blank" style="display: inline-block; background: #2563eb; color: #ffffff; font-size: 15px; font-weight: 700; padding: 14px 28px; text-decoration: none; border-radius: 10px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4); margin-right: 10px;">
                      Apply Now Official →
                    </a>
                    <a href="${frontendUrl}" target="_blank" style="display: inline-block; background: #334155; color: #ffffff; font-size: 14px; font-weight: 600; padding: 14px 22px; text-decoration: none; border-radius: 10px; margin-top: 8px;">
                      Open Exam Hub
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Resources Links -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: rgba(30, 41, 59, 0.5); border-radius: 8px; padding: 12px 16px; border: 1px dashed #334155;">
                <tr>
                  <td style="font-size: 12px; color: #94a3b8;">
                    <strong>Helpful Links:</strong>
                    &nbsp;•&nbsp; <a href="${exam.syllabus || exam.officialWebsite}" target="_blank" style="color: #38bdf8; text-decoration: none;">Download Syllabus</a>
                    &nbsp;•&nbsp; <a href="${exam.previousPapers || exam.officialWebsite}" target="_blank" style="color: #38bdf8; text-decoration: none;">Previous Year Questions</a>
                    &nbsp;•&nbsp; <a href="${exam.officialWebsite}" target="_blank" style="color: #38bdf8; text-decoration: none;">Official Portal</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 28px; background: #0f172a; border-top: 1px solid #334155; font-size: 12px; color: #64748b; text-align: center;">
              <p style="margin: 0 0 6px 0;">
                You received this notification based on your CampusPilot student profile (${student.class || 'Student'} • ${student.stream || exam.category}).
              </p>
              <p style="margin: 0;">
                <a href="${frontendUrl}" style="color: #38bdf8; text-decoration: none;">Manage Notification Preferences</a>
                &nbsp;|&nbsp;
                <a href="${frontendUrl}" style="color: #64748b; text-decoration: none;">CampusPilot AI © 2026</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

export function buildDailyDigestEmailHTML(student, matchingExams = []) {
  const frontendUrl = process.env.FRONTEND_URL || 'https://campus-pilot-ai-eta.vercel.app'
  const studentName = student.name || 'Student'

  const examRows = matchingExams.slice(0, 5).map(e => `
    <tr style="border-bottom: 1px solid #334155;">
      <td style="padding: 12px 0;">
        <div style="font-size: 14px; font-weight: 700; color: #ffffff;">${e.examName}</div>
        <div style="font-size: 12px; color: #94a3b8;">${e.conductingBody} • ${e.category}</div>
      </td>
      <td style="padding: 12px 0; text-align: right;">
        <div style="font-size: 12px; color: #f59e0b; font-weight: 600;">Exam: ${e.examDate}</div>
        <a href="${e.applyLink}" target="_blank" style="display: inline-block; font-size: 12px; color: #38bdf8; text-decoration: none; font-weight: 600; margin-top: 4px;">Apply →</a>
      </td>
    </tr>
  `).join('')

  return `
<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f8fafc;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background: #1e293b; border-radius: 16px; border: 1px solid #334155; padding: 24px;">
          <tr>
            <td>
              <h2 style="color: #38bdf8; margin: 0 0 4px 0;">CampusPilot AI — Daily Exam Radar 🇮🇳</h2>
              <p style="color: #94a3b8; font-size: 14px; margin: 0 0 16px 0;">Good morning ${studentName}, here are your tailored exam notifications for today:</p>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 20px;">
                ${examRows}
              </table>
              <div align="center">
                <a href="${frontendUrl}" style="background: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; display: inline-block;">
                  View All in Exam Hub →
                </a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}
