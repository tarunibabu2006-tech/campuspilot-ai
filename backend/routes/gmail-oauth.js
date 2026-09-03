import express from 'express'
import { getGmailAuthUrl, getOAuth2Client } from '../utils/gmailClient.js'
import User from '../models/User.js'
import logger from '../utils/logger.js'

const router = express.Router()

// ── 1. GET GMAIL OAUTH URL ──────────────────────────────────────────
router.get('/auth-url', (req, res) => {
  try {
    const url = getGmailAuthUrl()
    res.json({ success: true, url })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// ── 2. OAUTH CALLBACK (Saves refresh token to Student profile) ───────
router.get('/callback', async (req, res) => {
  try {
    const { code, state } = req.query
    if (!code) {
      return res.status(400).send('Authorization code missing')
    }

    const oAuth2Client = getOAuth2Client()
    const { tokens } = await oAuth2Client.getToken(code)

    // In production, user is authenticated via session or state parameter
    // If state contains userId or from session:
    const userId = state || req.session?.userId
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        gmailConnected: true,
        gmailRefreshToken: tokens.refresh_token,
        gmailAccessToken: tokens.access_token
      })
    }

    res.redirect('/?tab=jobs&gmail=connected')
  } catch (err) {
    logger.error(`Gmail OAuth Callback error: ${err.message}`)
    res.redirect('/?tab=jobs&gmail=error')
  }
})

// ── 3. SIMULATED 1-CLICK CONNECT (Instant test connection for demo) ──
router.post('/connect-simulated', async (req, res) => {
  try {
    const { email } = req.body
    res.json({
      success: true,
      connected: true,
      email: email || 'student@gmail.com',
      message: '✅ Gmail connected successfully for automated confirmation scanning!'
    })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// ── 4. DISCONNECT GMAIL ─────────────────────────────────────────────
router.post('/disconnect', async (req, res) => {
  try {
    const { userId } = req.body
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        gmailConnected: false,
        gmailRefreshToken: null,
        gmailAccessToken: null
      })
    }
    res.json({ success: true, message: 'Gmail disconnected.' })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

export default router
