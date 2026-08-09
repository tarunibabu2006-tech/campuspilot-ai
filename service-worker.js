const CACHE_NAME = "campuspilot-ai-v1";
const CACHE_ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap"
];

// ── INSTALL: Cache all core assets ──────────────────────────────
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Installing CampusPilot AI PWA...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// ── ACTIVATE: Clean up old caches ───────────────────────────────
self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activated — cleaning old caches");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ── FETCH: Serve from cache, fallback to network ─────────────────
self.addEventListener("fetch", (event) => {
  // Skip non-GET and cross-origin API calls
  if (event.request.method !== "GET") return;
  if (event.request.url.includes("/api/")) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((networkResponse) => {
        // Cache successful responses
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
          const cloned = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
        }
        return networkResponse;
      }).catch(() => {
        // Offline fallback: serve main HTML for navigation requests
        if (event.request.mode === "navigate") {
          return caches.match("/index.html");
        }
      });
    })
  );
});

// ── BACKGROUND SYNC: Queue failed API requests ───────────────────
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-applications") {
    console.log("[ServiceWorker] Background sync: retry pending applications");
  }
});
