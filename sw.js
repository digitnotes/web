const C='digitnotes-v4';
const DB='https://digitnotes-bdeb7-default-rtdb.europe-west1.firebasedatabase.app';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!=='dn-meta').map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  if(new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||(e.request.mode==='navigate'?caches.match('app.html'):undefined))));
});

// Push brez vsebine: strežnik le "pozvoni", vsebino prebere telefon iz baze
self.addEventListener('push',e=>{
  e.waitUntil((async()=>{
    const opt=(n)=>({body:n.body||'',icon:'icon_zvezki.png',badge:'icon_zvezki.png',tag:n.tag,renotify:false,vibrate:[200,100,200,100,300],data:{url:'app.html'}});
    let list=[];
    try{
      const meta=await caches.open('dn-meta');
      const r=await meta.match(self.registration.scope+'__uid'),uid=r&&await r.text();
      if(uid){
        const [ib,rm]=await Promise.all([fetch(DB+'/inbox/'+uid+'.json').then(x=>x.json()),fetch(DB+'/rem/'+uid+'.json').then(x=>x.json())]);
        const items=[];
        Object.entries(ib||{}).forEach(([k,v])=>{if(v&&!v.read)items.push({t:v.t,title:v.title,body:v.text,tag:k})});
        Object.entries(rm||{}).forEach(([k,v])=>{if(v)items.push({t:v.t,title:v.title,body:v.body,tag:k})});
        items.sort((a,b)=>b.t-a.t);
        const sr=await meta.match(self.registration.scope+'__shown');
        let shown=[];try{shown=sr?await sr.json():[]}catch(x){}
        const open=(await self.registration.getNotifications()).map(n=>n.tag);
        const fresh=items.filter(i=>Date.now()-i.t<15*60000&&!shown.includes(i.tag)&&!open.includes(i.tag)).slice(0,3);
        list=fresh.length?fresh:(items[0]?[items[0]]:[]);
        shown=shown.concat(fresh.map(i=>i.tag)).slice(-40);
        await meta.put(self.registration.scope+'__shown',new Response(JSON.stringify(shown)));
      }
    }catch(x){}
    if(!list.length)list=[{title:'DigitNotes',body:'Imaš novo obvestilo.',tag:'dn'}];
    for(const n of list)await self.registration.showNotification(n.title,opt(n));
  })());
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus()}return clients.openWindow('app.html')}));
});
