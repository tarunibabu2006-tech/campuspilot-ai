import { google } from 'googleapis'
import logger from './logger.js'

/**
 * Creates Google OAuth2 Client for Gmail Read-Only verification
 */
export function getOAuth2Client() {
  const clientId = process.env.GOOGLE_CLIENT_ID || 'dummy_client_id_for_campus_pilot'
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || 'dummy_client_secret'
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/api/gmail/callback'

  return new google.auth.OAuth2(clientId, clientSecret, redirectUri)
}

/**
 * Generate OAuth URL with gmail.readonly scope
 */
export function getGmailAuthUrl() {
  const oAuth2Client = getOAuth2Client()
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ]
  })
}

/**
 * Search Gmail messages using user's refresh token
 */
export async function searchGmailMessages(refreshToken, query) {
  try {
    const oAuth2Client = getOAuth2Client()
    oAuth2Client.setCredentials({ refresh_token: refreshToken })

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client })
    const res = await gmail.users.messages.list({
      userId: 'me',
      q: query,
      maxResults: 10
    })

    if (!res.data.messages || res.data.messages.length === 0) {
      return []
    }

    const messages = await Promise.all(
      res.data.messages.map(async (msg) => {
        const detail = await gmail.users.messages.get({
          userId: 'me',
          id: msg.id,
          format: 'full'
        })

        const headers = detail.data.payload.headers || []
        const fromHeader = headers.find(h => h.name.toLowerCase() === 'from')?.value || ''
        const subjectHeader = headers.find(h => h.name.toLowerCase() === 'subject')?.value || ''
        const dateHeader = headers.find(h => h.name.toLowerCase() === 'date')?.value || ''

        return {
          id: msg.id,
          from: fromHeader,
          subject: subjectHeader,
          date: dateHeader,
          snippet: detail.data.snippet || ''
        }
      })
    )

    return messages
  } catch (err) {
    logger.warn(`Gmail API Search Notice: ${err.message}`)
    return []
  }
}
