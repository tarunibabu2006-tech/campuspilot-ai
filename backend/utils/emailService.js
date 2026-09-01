// utils/emailService.js
import nodemailer from 'nodemailer'
import logger from './logger.js'

/**
 * CampusPilot AI — Email Notification Service
 *
 * Sends real Gmail emails to students for:
 *  - Job Application Confirmation (on behalf of company)
 *  - Interview Scheduled Notification
 *  - Shortlisted Alert
 *  - Offer Letter Received
 */

let transporter = null

function createTransporter() {
  if (transporter) return transporter

  const user = process.env.MAIL_USER || process.env.ADMIN_EMAIL
  const pass = process.env.MAIL_PASS  // Gmail App Password — 16 chars, no spaces

  if (!user || !pass) {
    logger.warn('⚠️  MAIL_USER / MAIL_PASS not set — email sending disabled.')
    return null
  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  })

  return transporter
}

// ─── Company SMTP personas ────────────────────────────────────────────────────
const COMPANY_FROM_NAMES = {
  TCS: 'TCS Talent Acquisition',
  Infosys: 'Infosys Recruitment Team',
  Wipro: 'Wipro HR Operations',
  Cognizant: 'Cognizant Campus Recruitment',
  Accenture: 'Accenture Talent Connect',
  Capgemini: 'Capgemini Campus Hiring',
  HCLTech: 'HCLTech HR Team',
  'Tech Mahindra': 'Tech Mahindra Talent Team',
  Zoho: 'Zoho Careers',
  Amazon: 'Amazon Campus Recruiting',
  'Amazon India': 'Amazon Campus Recruiting',
  Google: 'Google University Programs',
  'Google India': 'Google University Programs',
  Microsoft: 'Microsoft University Recruiting',
  Flipkart: 'Flipkart Campus Hiring',
  'L&T': 'L&T HR Division',
  BHEL: 'BHEL Recruitment Cell',
  ISRO: 'ISRO HR Wing',
  DRDO: 'DRDO Recruitment Authority',
  IBPS: 'IBPS Examination Cell',
  SBI: 'SBI HR Corporate Centre',
}

function getFromName(company) {
  return COMPANY_FROM_NAMES[company] || `${company} Talent Acquisition`
}

// ─── Email Templates ──────────────────────────────────────────────────────────
function buildApplicationConfirmHTML({ name, jobTitle, company, appId, timestamp, location, salary }) {
  const fromName = getFromName(company)
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Application Confirmation — ${company}</title>
<style>
  body { margin:0; padding:0; background:#f0f4f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; }
  .wrapper { max-width:580px; margin:32px auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,0.1); }
  .header { background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); padding:32px 36px; }
  .header h1 { color:#ffffff; font-size:22px; font-weight:800; margin:0 0 4px; }
  .header p  { color:#c4b5fd; font-size:13px; margin:0; }
  .badge-row { display:flex; gap:8px; align-items:center; margin-top:14px; }
  .badge { background:rgba(74,222,128,0.2); color:#4ade80; border:1px solid rgba(74,222,128,0.4); padding:4px 12px; border-radius:20px; font-size:11px; font-weight:700; }
  .body { padding:32px 36px; }
  .greeting { font-size:16px; color:#1e293b; margin:0 0 12px; }
  .ref-box { background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:20px; margin:20px 0; }
  .ref-box .ref-label { font-size:11px; text-transform:uppercase; letter-spacing:0.08em; color:#64748b; font-weight:700; margin:0 0 4px; }
  .ref-box .ref-id { font-size:20px; font-weight:900; color:#7c3aed; font-family:monospace; letter-spacing:0.04em; }
  .detail-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:20px 0; }
  .detail-item { background:#f8fafc; border-radius:8px; padding:12px 14px; }
  .detail-item .label { font-size:11px; color:#64748b; text-transform:uppercase; letter-spacing:0.06em; font-weight:700; margin:0 0 4px; }
  .detail-item .value { font-size:14px; color:#1e293b; font-weight:700; margin:0; }
  .timeline { margin:24px 0; }
  .timeline-title { font-size:13px; font-weight:800; color:#1e293b; margin:0 0 12px; }
  .step { display:flex; align-items:center; gap:10px; margin:8px 0; }
  .step-dot { width:10px; height:10px; border-radius:50%; background:#e2e8f0; flex-shrink:0; }
  .step-dot.active { background:#10b981; box-shadow:0 0 8px rgba(16,185,129,0.5); }
  .step-label { font-size:13px; color:#64748b; }
  .step-label.active { color:#10b981; font-weight:700; }
  .info-box { background:#eff6ff; border:1px solid #bfdbfe; border-radius:10px; padding:14px 16px; margin:20px 0; font-size:13px; color:#1e40af; line-height:1.6; }
  .footer { background:#f8fafc; border-top:1px solid #e2e8f0; padding:20px 36px; text-align:center; font-size:12px; color:#94a3b8; }
  .footer strong { color:#64748b; }
  @media (max-width:480px) {
    .detail-grid { grid-template-columns:1fr; }
    .header, .body { padding:24px 20px; }
    .footer { padding:16px 20px; }
  }
</style>
</head>
<body>
<div class="wrapper">
  <div class="header">
    <h1>✅ Application Successfully Received!</h1>
    <p>${fromName} · CampusPilot AI Verified Application</p>
    <div class="badge-row">
      <span class="badge">🟢 Application Submitted</span>
      <span class="badge">🔖 Ref: ${appId}</span>
    </div>
  </div>

  <div class="body">
    <p class="greeting">Dear <strong>${name}</strong>,</p>
    <p style="color:#475569; font-size:14px; line-height:1.7; margin:0 0 16px;">
      Thank you for applying to <strong>${company}</strong> through <strong>CampusPilot AI</strong>.
      We have successfully received your application for the position of
      <strong>${jobTitle}</strong> and it has been forwarded to our recruitment team for evaluation.
    </p>

    <div class="ref-box">
      <div class="ref-label">Application Reference ID</div>
      <div class="ref-id">${appId}</div>
      <div style="font-size:12px; color:#64748b; margin-top:6px;">Applied on: ${timestamp}</div>
    </div>

    <div class="detail-grid">
      <div class="detail-item">
        <div class="label">Position</div>
        <div class="value">${jobTitle}</div>
      </div>
      <div class="detail-item">
        <div class="label">Company</div>
        <div class="value">${company}</div>
      </div>
      <div class="detail-item">
        <div class="label">Location</div>
        <div class="value">${location || 'India (Multiple Locations)'}</div>
      </div>
      <div class="detail-item">
        <div class="label">CTC Package</div>
        <div class="value" style="color:#10b981;">${salary || 'Competitive'}</div>
      </div>
    </div>

    <div class="timeline">
      <div class="timeline-title">📊 Application Progress Timeline</div>
      <div class="step"><div class="step-dot active"></div><span class="step-label active">✅ Applied — In Progress</span></div>
      <div class="step"><div class="step-dot"></div><span class="step-label">📄 Under Review by ${company} Team</span></div>
      <div class="step"><div class="step-dot"></div><span class="step-label">⭐ Shortlisting</span></div>
      <div class="step"><div class="step-dot"></div><span class="step-label">🎤 Interview Scheduled</span></div>
      <div class="step"><div class="step-dot"></div><span class="step-label">🎉 Offer Letter Dispatch</span></div>
    </div>

    <div class="info-box">
      📌 <strong>What Happens Next?</strong><br/>
      Our team at ${company} will review your application within <strong>7–10 business days</strong>.
      If shortlisted, you will receive an invitation for the <strong>online assessment / interview</strong> on this email.
      Keep this reference ID safe for any follow-up queries.
    </div>

    <p style="color:#64748b; font-size:13px; line-height:1.6; margin:0;">
      This email was dispatched via <strong>CampusPilot AI Placement Platform</strong> on your behalf.
      Your application data is verified and securely forwarded to the ${company} Talent Acquisition system.
    </p>
  </div>

  <div class="footer">
    <strong>CampusPilot AI</strong> · Your Complete Campus Placement OS<br/>
    Dispatched by: ${fromName} via CampusPilot AI Verified Channel<br/>
    <span style="color:#cbd5e1;">© 2026 CampusPilot AI. All rights reserved.</span>
  </div>
</div>
</body>
</html>
`
}

function buildInterviewAlertHTML({ name, jobTitle, company, interviewDate, interviewTime, mode, appId }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><title>Interview Scheduled — ${company}</title>
<style>
  body { margin:0; padding:0; background:#f0f4f8; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; }
  .wrapper { max-width:560px; margin:32px auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,0.1); }
  .header { background:linear-gradient(135deg, #065f46, #064e3b); padding:32px 36px; }
  .header h1 { color:#ffffff; font-size:22px; font-weight:800; margin:0 0 6px; }
  .header p { color:#6ee7b7; font-size:13px; margin:0; }
  .body { padding:32px 36px; }
  .interview-card { background:#f0fdf4; border:2px solid #4ade80; border-radius:12px; padding:20px; text-align:center; margin:20px 0; }
  .interview-card h2 { color:#065f46; font-size:20px; margin:0 0 8px; }
  .interview-card .date { font-size:18px; font-weight:800; color:#059669; }
  .interview-card .time { font-size:14px; color:#6b7280; margin-top:4px; }
  .footer { background:#f8fafc; border-top:1px solid #e2e8f0; padding:20px 36px; text-align:center; font-size:12px; color:#94a3b8; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="header">
    <h1>🎤 Interview Scheduled!</h1>
    <p>${getFromName(company)} · CampusPilot AI Platform</p>
  </div>
  <div class="body">
    <p>Dear <strong>${name}</strong>,</p>
    <p style="color:#475569; font-size:14px; line-height:1.7;">
      Congratulations! You have been shortlisted for an interview at <strong>${company}</strong>
      for the role of <strong>${jobTitle}</strong>. Please find your interview details below:
    </p>

    <div class="interview-card">
      <h2>🗓 Your Interview Details</h2>
      <div class="date">${interviewDate}</div>
      <div class="time">⏰ ${interviewTime || 'TBD — confirmation sent separately'}</div>
      <div style="margin-top:8px; font-size:13px; color:#065f46;"><strong>Mode:</strong> ${mode || 'Online Video Interview'}</div>
      <div style="margin-top:4px; font-size:12px; color:#6b7280;">Ref: ${appId}</div>
    </div>

    <p style="color:#475569; font-size:13px; line-height:1.7;">
      📌 Prepare with CampusPilot AI's <strong>Mock Interview</strong> and
      <strong>Company Mock Test</strong> features for best results.
      The meeting link / venue will be shared separately 24 hours before the interview.
    </p>
  </div>
  <div class="footer">
    <strong>CampusPilot AI</strong> — Best of luck! 🚀<br/>
    © 2026 CampusPilot AI. All rights reserved.
  </div>
</div>
</body>
</html>
`
}

// ─── Public API ───────────────────────────────────────────────────────────────
export async function sendApplicationConfirmationEmail(toEmail, payload) {
  const t = createTransporter()
  if (!t) {
    logger.warn(`Email skipped (no mailer) → to: ${toEmail}`)
    return { success: false, reason: 'no_transporter' }
  }

  try {
    const fromUser = process.env.MAIL_USER || process.env.ADMIN_EMAIL
    const fromName = getFromName(payload.company)
    const html = buildApplicationConfirmHTML(payload)

    const info = await t.sendMail({
      from: `"${fromName} via CampusPilot AI" <${fromUser}>`,
      to: toEmail,
      subject: `✅ Application Confirmation — ${payload.jobTitle} at ${payload.company} [Ref: ${payload.appId}]`,
      html,
      text: [
        `Dear ${payload.name},`,
        '',
        `Your application for ${payload.jobTitle} at ${payload.company} has been received.`,
        `Application Reference ID: ${payload.appId}`,
        `Dispatched: ${payload.timestamp}`,
        '',
        'CampusPilot AI — Your Campus Placement OS'
      ].join('\n')
    })

    logger.info(`✅ Email sent to ${toEmail} | Company: ${payload.company} | Ref: ${payload.appId} | msgId: ${info.messageId}`)
    return { success: true, messageId: info.messageId }
  } catch (err) {
    logger.error(`❌ Email send failed → ${toEmail}: ${err.message}`)
    return { success: false, error: err.message }
  }
}

export async function sendInterviewAlertEmail(toEmail, payload) {
  const t = createTransporter()
  if (!t) return { success: false, reason: 'no_transporter' }

  try {
    const fromUser = process.env.MAIL_USER || process.env.ADMIN_EMAIL
    const html = buildInterviewAlertHTML(payload)

    const info = await t.sendMail({
      from: `"${getFromName(payload.company)} via CampusPilot AI" <${fromUser}>`,
      to: toEmail,
      subject: `🎤 Interview Scheduled — ${payload.jobTitle} at ${payload.company} [${payload.interviewDate}]`,
      html
    })

    logger.info(`✅ Interview email sent to ${toEmail} | Ref: ${payload.appId}`)
    return { success: true, messageId: info.messageId }
  } catch (err) {
    logger.error(`❌ Interview email failed → ${toEmail}: ${err.message}`)
    return { success: false, error: err.message }
  }
}
