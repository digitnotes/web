// DigitNotes 2.0 – service worker (obseg: /web/app/)
const C = 'dn2-v2-1-2';
const SHELL = ['./', 'index.html', 'app.css', 'app.js', 'config.js', 'theme.js', 'manifest.webmanifest', '../Logo.png', '../icon-192.png'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(SHELL)).catch(() => {})); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => self.clients.claim())));
// samo lastne datoteke aplikacije; zahtev na strežnik (osebni podatki) NE shranjujemo v predpomnilnik
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request, { cache: 'no-cache' }).then(r => { if (r.ok) { const c = r.clone(); caches.open(C).then(x => x.put(e.request, c)); } return r; })
    .catch(() => caches.match(e.request).then(r => r || (e.request.mode === 'navigate' ? caches.match('index.html') : undefined))));
});
self.addEventListener('push', e => {
  let m = {}; try { m = e.data ? e.data.json() : {}; } catch { m = { body: e.data && e.data.text() }; }
  e.waitUntil((async () => {
    await self.registration.showNotification(m.title || 'DigitNotes', { body: m.body || 'Imaš novo obvestilo.', icon: '../icon-192.png', badge: '../icon-192.png', tag: m.tag || 'dn', renotify: false, vibrate: [200, 100, 200], data: { url: m.url || './' } });
    (await self.clients.matchAll({ type: 'window' })).forEach(c => c.postMessage('push'));
  })());
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(l => { for (const c of l) if ('focus' in c) return c.focus(); return self.clients.openWindow(e.notification.data?.url || './'); }));
});
