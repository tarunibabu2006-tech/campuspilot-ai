import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

export default function InstallPwaModal() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  useEffect(() => {
    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      // Check if user dismissed recently
      const dismissed = localStorage.getItem('campuspilot_pwa_dismissed')
      if (!dismissed) {
        setShowPrompt(true)
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Online/Offline status listeners
    const handleOnline = () => {
      setIsOffline(false)
      toast.success('🌐 You are back online!')
    }
    const handleOffline = () => {
      setIsOffline(true)
      toast('📴 Offline Mode active. All 100k+ notes & cached tools work offline!', { icon: '⚡', duration: 5000 })
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      toast('To install: Tap browser menu (⋮ or Share) -> "Add to Home Screen" 📲', { duration: 6000 })
      return
    }

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      toast.success('🎉 CampusPilot AI installed on your device!')
      setShowPrompt(false)
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('campuspilot_pwa_dismissed', 'true')
  }

  return (
    <>
      {/* Offline Status Badge */}
      {isOffline && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: 'linear-gradient(90deg, #f59e0b, #d97706)',
          color: '#000',
          padding: '0.4rem 1rem',
          textAlign: 'center',
          fontWeight: '800',
          fontSize: '0.82rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
        }}>
          <span>📴 Offline Mode Active</span>
          <span>•</span>
          <span style={{ fontWeight: '500' }}>You can still view all 100k+ notes, resume builder, and study guides offline!</span>
        </div>
      )}

      {/* Floating Install App Banner */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            style={{
              position: 'fixed',
              bottom: '1.5rem',
              right: '1.5rem',
              zIndex: 9000,
              background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #0f172a 100%)',
              border: '1px solid rgba(139,92,246,0.5)',
              borderRadius: '1.25rem',
              padding: '1.25rem',
              boxShadow: '0 12px 40px rgba(0,0,0,0.6), 0 0 20px rgba(139,92,246,0.3)',
              maxWidth: '340px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.8rem' }}>📱</span>
                <div>
                  <div style={{ color: 'white', fontWeight: '800', fontSize: '0.95rem' }}>Install CampusPilot App</div>
                  <div style={{ color: '#a78bfa', fontSize: '0.75rem' }}>Fast native app • Works offline</div>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.1rem', cursor: 'pointer', padding: '0.2rem' }}
              >
                ✕
              </button>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '0.8rem', margin: 0, lineHeight: 1.4 }}>
              Install on your phone or PC to access 100,000+ notes & study tools even without internet in class!
            </p>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handleInstallClick}
                style={{
                  flex: 1,
                  padding: '0.6rem',
                  borderRadius: '0.6rem',
                  background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '800',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(124,58,237,0.4)'
                }}
              >
                📲 Install App Now
              </button>
              <button
                onClick={handleDismiss}
                style={{
                  padding: '0.6rem 0.8rem',
                  borderRadius: '0.6rem',
                  background: 'rgba(255,255,255,0.06)',
                  color: '#94a3b8',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                Later
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
