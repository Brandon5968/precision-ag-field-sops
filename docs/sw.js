/* Precision Ag Field SOPs — service worker.
   Network-first with cache fallback for offline field use.

   HARDENED FOR CLOUDFLARE ACCESS: the site sits behind Cloudflare Access. When a
   session expires, requests are 302-redirected to the Access login page. We must
   NEVER cache that login response as if it were chapter content. The guard below
   only caches genuine same-origin 200 responses that were not redirected
   (res.type === 'basic' && !res.redirected), so the login page can never poison
   the offline cache. */

// __BUILD_ID__ is replaced with a fresh value on every build (see
// hooks/offline_manifest.py) so the cache key rotates each deploy and the
// activate handler purges stale caches — otherwise old content persists.
const CACHE = 'pag-sops-__BUILD_ID__';

// let the client read the active cache name (offline-button uses this)
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'GET_CACHE_NAME' && e.source) {
    e.source.postMessage({ type: 'CACHE_NAME', name: CACHE });
  }
});

const PRECACHE = ['/', '/index.html', '/404.html'];

// Only cache real, same-origin, non-redirected 200 responses.
function isCacheable(res) {
  return res && res.ok && res.type === 'basic' && !res.redirected;
}

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(async c => {
      // tolerant precache: one bad URL must not fail the whole install
      for (const u of PRECACHE) {
        try {
          const res = await fetch(u, { credentials: 'same-origin' });
          if (isCacheable(res)) await c.put(u, res.clone());
        } catch (_) { /* ignore */ }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network first, fall back to cache. Cache only safe responses.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // ignore cross-origin (incl. Access host)

  e.respondWith(
    fetch(req)
      .then(res => {
        if (isCacheable(res)) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(req, clone));
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});

// Manual "download everything" triggered by the header button.
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'CACHE_ALL') {
    e.waitUntil(
      caches.open(CACHE).then(async c => {
        const urls = e.data.urls || [];
        let done = 0;
        for (const url of urls) {
          try {
            const res = await fetch(url, { credentials: 'same-origin' });
            // never cache an Access login redirect, even if it returns 200
            if (isCacheable(res)) await c.put(url, res.clone());
          } catch (_) { /* ignore */ }
          done++;
          const clients = await self.clients.matchAll();
          clients.forEach(cl => cl.postMessage({
            type: 'CACHE_PROGRESS', done, total: urls.length
          }));
        }
        const clients = await self.clients.matchAll();
        clients.forEach(cl => cl.postMessage({ type: 'CACHE_DONE' }));
      })
    );
  }
});
