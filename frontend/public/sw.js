// ============================================================
// CampusPilot AI — Service Worker (Offline Cache & PWA)
// ============================================================

const CACHE_NAME = 'campuspilot-v2'
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/index-3cb4b87a.css'
]

// Install Event — Cache Core Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('⚡ [Service Worker] Pre-caching static assets for offline mode')
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('⚡ [Service Worker] Pre-cache partial warning:', err)
      })
    })
  )
  self.skipWaiting()
})

// Activate Event — Clean up Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('⚡ [Service Worker] Removing old cache:', key)
            return caches.delete(key)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch Event — Stale-While-Revalidate Strategy
self.addEventListener('fetch', (event) => {
  // Skip cross-origin or non-GET requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return
  }

  // API calls: Network first, with fallback
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return response
        })
        .catch(() => {
          return new Response(JSON.stringify({ error: 'Offline Mode: CampusPilot AI is running from local cache' }), {
            headers: { 'Content-Type': 'application/json' }
          })
        })
    )
    return
  }

  // Static Assets: Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone)
            })
          }
          return networkResponse
        })
        .catch(() => {
          // If offline and not in cache, fallback to index.html for SPA routing
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/index.html')
          }
        })

      return cachedResponse || fetchPromise
    })
  )
})
