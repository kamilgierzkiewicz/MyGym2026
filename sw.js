/* Trening 2026 — service worker */
const VER   = 'trening2026-v4';
const SHELL = [
  './', './index.html', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './icon-512-maskable.png',
  './apple-touch-icon.png', './favicon-32.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VER).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VER && k !== VER + '-media').map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // App shell (same origin): cache-first, fall back to cached index.html for navigations
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((resp) => {
        const copy = resp.clone();
        caches.open(VER).then((c) => c.put(req, copy));
        return resp;
      }).catch(() => caches.match('./index.html')))
    );
    return;
  }

  // Exercise animations from free-exercise-db (raw.githubusercontent): cache-first runtime cache
  if (url.hostname.indexOf('githubusercontent.com') !== -1) {
    e.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((resp) => {
        if (resp && resp.ok) {
          const copy = resp.clone();
          caches.open(VER + '-media').then((c) => c.put(req, copy));
        }
        return resp;
      }).catch(() => hit))
    );
    return;
  }

  // Everything else (MuscleWiki videos, Google links): network, fall back to cache if any
  e.respondWith(fetch(req).catch(() => caches.match(req)));
});
