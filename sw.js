const CACHE_VERSION = 'v3';
const STATIC_CACHE = `epub-forge-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `epub-forge-runtime-${CACHE_VERSION}`;

const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(STATIC_CACHE).then((cache) => cache.addAll(APP_SHELL)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((key) => ![STATIC_CACHE, RUNTIME_CACHE].includes(key))
        .map((key) => caches.delete(key))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const networkResponse = await fetch(request);
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put('./index.html', networkResponse.clone());
        return networkResponse;
      } catch {
        const cachedPage = await caches.match('./index.html');
        return cachedPage || caches.match('./');
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    const fetchAndCache = fetch(request)
      .then(async (response) => {
        if (response && response.status === 200 && request.url.startsWith(self.location.origin)) {
          const runtime = await caches.open(RUNTIME_CACHE);
          runtime.put(request, response.clone());
        }
        return response;
      })
      .catch(() => cached);

    return cached || fetchAndCache;
  })());
});

async function refreshAppShell() {
  const cache = await caches.open(STATIC_CACHE);
  await Promise.all(
    APP_SHELL.map(async (url) => {
      try {
        const response = await fetch(url, { cache: 'no-store' });
        if (response.ok) await cache.put(url, response);
      } catch {
        // Ignore refresh failures; offline fallback remains available.
      }
    })
  );
}

self.addEventListener('sync', (event) => {
  if (event.tag === 'epub-forge-refresh') {
    event.waitUntil(refreshAppShell());
  }
});

self.addEventListener('message', (event) => {
  if (event.data === 'refresh-cache') {
    event.waitUntil(refreshAppShell());
  }
});
