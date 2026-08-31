// Service worker for "Our Little Table". Precaches the lightweight app
// shell (HTML/CSS/JS/icons) so the app opens instantly and works
// offline once installed; photos and music are cached the first time
// they're actually viewed/played, rather than all up front.
//
// Bump CACHE_VERSION whenever you push a real content/code update so
// returning visitors pick up the new files instead of a stale cache.
const CACHE_VERSION = 'v10';
const SHELL_CACHE = `shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;

const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './css/table.css',
  './css/story.css',
  './css/scrollalbum.css',
  './css/birds.css',
  './css/decor.css',
  './css/doodles.css',
  './css/fireworks.css',
  './css/gate.css',
  './js/data.js',
  './js/gate.js',
  './js/app.js',
  './js/table-view.js',
  './js/timeline-view.js',
  './js/story-view.js',
  './js/router.js',
  './js/birds.js',
  './js/decor.js',
  './js/doodles.js',
  './js/fireworks.js',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== SHELL_CACHE && k !== RUNTIME_CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // leave cross-origin requests (e.g. Google Fonts) to the browser

  // the SPA shell itself: network-first so edits show up right away,
  // falling back to the cached copy when offline
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
		  if (res.ok) {
			const responseToCache = res.clone();

			caches.open(RUNTIME_CACHE).then((cache) => {
			  cache.put(req, responseToCache);
			});
		  }

		  return res;
		})
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // everything else (photos, music, fonts already cached, etc.):
  // cache-first, filling the runtime cache the first time it's seen
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          if (res.ok) {
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(req, res.clone()));
          }
          return res;
        })
        .catch(() => cached);
    })
  );
});
