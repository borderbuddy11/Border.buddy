// Service Worker — BorderBuddy
// ⚠️ Changer CACHE_VERSION à chaque mise à jour deployée

const CACHE_VERSION = 'borderbuddy-v7';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './icons/icon.svg',
  './livret-borderbuddy.pdf',
  './audio/encour-01.mp3',
  './audio/encour-02.mp3',
  './audio/encour-03.mp3',
  './audio/encour-04.mp3',
  './audio/encour-05.mp3',
  './audio/medit-01.mp3',
  './audio/medit-02.mp3',
  './audio/medit-03.mp3',
  './audio/medit-04.mp3',
  './audio/medit-05.mp3',
  './audio/medit-06.mp3',
];

// Installation
self.addEventListener('install', event => {
  console.log('[SW] Installation version :', CACHE_VERSION);
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => Promise.allSettled(
        ASSETS.map(url => cache.add(url).catch(err =>
          console.warn('[SW] Cache raté :', url, err)
        ))
      ))
      .then(() => self.skipWaiting()) // ← Active immédiatement sans attendre
  );
});

// Activation — supprime TOUS les anciens caches
self.addEventListener('activate', event => {
  console.log('[SW] Activation version :', CACHE_VERSION);
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_VERSION)
          .map(key => {
            console.log('[SW] Suppression ancien cache :', key);
            return caches.delete(key);
          })
      ))
      .then(() => self.clients.claim()) // ← Prend le contrôle de tous les onglets ouverts
  );
});

// Fetch — Network First (toujours essayer le réseau d'abord)
// Cela garantit qu'on voit les mises à jour immédiatement
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Succès réseau → mettre en cache ET retourner
        if (response && response.status === 200 && response.type !== 'opaque') {
          const toCache = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(event.request, toCache));
        }
        return response;
      })
      .catch(() => {
        // Pas de réseau → fallback sur le cache
        return caches.match(event.request)
          .then(cached => cached || caches.match('./index.html'));
      })
  );
});
