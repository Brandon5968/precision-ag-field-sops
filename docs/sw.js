/* KILL-SWITCH service worker.
   The previous caching SW caused stale content during active development. This
   replacement deletes ALL caches, unregisters itself, and reloads open tabs, so
   every browser self-heals to the live deploy. Offline support will be re-added
   deliberately once the design is settled. */
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach(c => { try { c.navigate(c.url); } catch (e) {} });
  })());
});
