/* Trening 2026 — service worker · app v1.5.0 */
const VER   = 'trening2026-v9';
const SHELL = ['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png',
  './icon-512-maskable.png','./apple-touch-icon.png','./favicon-32.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VER).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((k) => Promise.all(k.filter((x) => x !== VER && x !== VER + '-media').map((x) => caches.delete(x))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((r) => {
      const c = r.clone(); caches.open(VER).then((x) => x.put(req, c)); return r;
    }).catch(() => caches.match('./index.html'))));
    return;
  }
  if (url.hostname.indexOf('githubusercontent.com') !== -1) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((r) => {
      if (r && r.ok) { const c = r.clone(); caches.open(VER + '-media').then((x) => x.put(req, c)); }
      return r;
    })));
    return;
  }
  e.respondWith(fetch(req).catch(() => caches.match(req)));
});
