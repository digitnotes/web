// Stari service worker (DigitNotes 1). Počisti predpomnilnik in se odstrani,
// da ne moti nove aplikacije v mapi app/. Datoteko pusti na strežniku vsaj nekaj mesecev.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) await caches.delete(k);
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url);
})()));
