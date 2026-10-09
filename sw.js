const C='digitnotes-v3';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  if(new URL(e.request.url).origin!==location.origin)return; // Firebase in CDN gredo mimo
  // vedno najprej strežnik (nova različica), predpomnilnik le brez povezave
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||(e.request.mode==='navigate'?caches.match('app.html'):undefined))));
});
// Push obvestila (FCM) – sistemsko obvestilo tudi, ko je aplikacija zaprta
self.addEventListener('push',e=>{
  let d={};try{d=e.data.json()}catch(x){}
  const m=d.data||d||{};
  e.waitUntil(self.registration.showNotification(m.title||'DigitNotes',{body:m.body||'Imaš novo obvestilo.',icon:'icon_zvezki.png',badge:'icon_zvezki.png',tag:m.mid||'dn',renotify:true,vibrate:[200,100,200,100,300],data:{url:'app.html'}}));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus()}return clients.openWindow('app.html')}));
});
