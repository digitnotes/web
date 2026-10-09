const {onValueCreated}=require('firebase-functions/v2/database');
const admin=require('firebase-admin');
admin.initializeApp();

// Ko administrator pošlje sporočilo (zapis v inbox/{uid}/{mid}), pošlje push na vse naprave uporabnika.
exports.pushObvestilo=onValueCreated({
  ref:'/inbox/{uid}/{mid}',
  region:'europe-west1',
  instance:'digitnotes-bdeb7-default-rtdb'
},async(event)=>{
  const {uid,mid}=event.params;
  const m=event.data.val();if(!m)return;
  const snap=await admin.database().ref('tokens/'+uid).get();
  const toks=snap.val();if(!toks)return;
  const keys=Object.keys(toks),list=keys.map(k=>toks[k]);
  const res=await admin.messaging().sendEachForMulticast({
    tokens:list,
    data:{title:String(m.title||'DigitNotes'),body:String(m.text||'').slice(0,200),mid},
    webpush:{headers:{Urgency:'high',TTL:'86400'}}
  });
  const rm={};
  res.responses.forEach((r,i)=>{
    const c=r.error&&r.error.code;
    if(!r.success&&(c==='messaging/registration-token-not-registered'||c==='messaging/invalid-registration-token'))rm['tokens/'+uid+'/'+keys[i]]=null;
  });
  if(Object.keys(rm).length)await admin.database().ref().update(rm);
});

// ===== Opomniki po uri + vikend obvestilo (deluje tudi, ko je aplikacija zaprta) =====
const {onSchedule}=require('firebase-functions/v2/scheduler');
const DT={1:['07:10','07:55'],2:['08:00','08:45'],3:['08:50','09:35'],4:['09:40','10:25'],5:['10:30','11:15'],6:['11:20','12:05'],7:['12:10','12:55'],8:['13:00','13:45'],9:['13:50','14:35']};
const mm=x=>+x.slice(0,2)*60+ +x.slice(3,5);
exports.urnikOpomniki=onSchedule({schedule:'every 5 minutes',timeZone:'Europe/Ljubljana',region:'europe-west1'},async()=>{
  const db=admin.database(),all=(await db.ref('u').get()).val()||{};
  const s=new Date().toLocaleString('sv-SE',{timeZone:'Europe/Ljubljana'});
  const date=s.slice(0,10),nm=+s.slice(11,13)*60+ +s.slice(14,16),dow=new Date(date+'T12:00:00Z').getUTCDay();
  if(dow<1||dow>5)return;
  const wd=dow-1;
  for(const [uid,u] of Object.entries(all)){
    if(!u.profile||u.profile.mustChange||u.off?.[date])continue;
    const tm=h=>u.times?.[h]&&u.times[h].e?[u.times[h].s,u.times[h].e]:DT[h];
    const hs=[];for(let h=1;h<=9;h++){const sl=u.tt?.[wd+'_'+h];if(sl&&!sl.malica)hs.push(h)}
    if(!hs.length)continue;
    if(u.settings?.remind){
      for(const h of hs){
        const e=mm(tm(h)[1]);
        if(nm>=e&&nm<e+6){
          const nx=[1,2,3,4,5,6,7,8,9].filter(x=>x>h&&u.tt?.[wd+'_'+x])[0],s2=nx&&u.tt[wd+'_'+nx];
          const nt=!s2?'To je bila zadnja ura današnjega dne.':s2.malica?'Sledi malica.':`Sledi ${u.nb?.[s2.nid]?.name||'naslednja ura'}.`;
          const toks=Object.values((await db.ref('tokens/'+uid).get()).val()||{});
          if(toks.length)await admin.messaging().sendEachForMulticast({tokens:toks,data:{title:'Opomnik: konec ure',body:`Ura ${u.nb?.[u.tt[wd+'_'+h].nid]?.name||''} se je zaključila. ${nt} Ne pozabi naložiti fotografij zapiskov!`,mid:`rem_${date}_${h}`}});
        }
      }
    }
    if(wd===4){
      const e=mm(tm(hs[hs.length-1])[1]);
      if(nm>=e&&nm<e+120)await db.ref(`inbox/${uid}/wk_${date}`).transaction(c=>c||{title:'Lep vikend!',text:'Tvoja zadnja ura v tem tednu se je zaključila. Preden začneš vikend, preveri, ali imaš vpisane vse ure za celoten teden.',t:Date.now(),read:false});
    }
  }
});

// ===== AI pomočnik (demo): povzetek / flashcards =====
const {onRequest}=require('firebase-functions/v2/https');
const {defineSecret}=require('firebase-functions/params');
const AIKEY=defineSecret('ANTHROPIC_API_KEY');
exports.aiAssist=onRequest({region:'europe-west1',secrets:[AIKEY],cors:true,memory:'512MiB',timeoutSeconds:120},async(req,res)=>{
  const db=admin.database();let uid,ym,counted=false;
  try{
    const b=req.body||{};uid=b.uid;
    const pr=(await db.ref('u/'+uid+'/profile').get()).val();
    if(!pr||!b.secret||b.secret!==(pr.ph||pr.password))return res.status(403).json({error:'Neveljavna prijava.'});
    if(!pr.ai||!pr.ai.on)return res.status(403).json({error:'AI pomočnik ti ni omogočen.'});
    ym=new Date().toISOString().slice(0,7);const lim=+pr.ai.limit||0;
    const t=await db.ref(`aiuse/${uid}/${ym}`).transaction(c=>(c||0)<lim?(c||0)+1:undefined);
    if(!t.committed)return res.status(429).json({error:'Mesečna omejitev uporabe AI je dosežena.'});
    counted=true;
    const content=(b.images||[]).slice(0,8).map(d=>({type:'image',source:{type:'base64',media_type:'image/jpeg',data:String(d).replace(/^data:image\/\w+;base64,/,'')}}));
    const notes=(b.texts||[]).join('\n').slice(0,20000);
    const task=b.mode==='cards'
      ?'Iz teh zapiskov pripravi 8 do 12 kartic za učenje (flashcards). Odgovori SAMO z JSON seznamom oblike [{"q":"vprašanje","a":"odgovor"}], brez dodatnega besedila.'
      :'Pripravi pregleden povzetek teh zapiskov: najprej 1–2 stavka o bistvu, nato najpomembnejše točke kot kratke alineje (z "- "). Ne dodajaj ničesar, česar ni v zapiskih.';
    content.push({type:'text',text:`Predmet: ${b.subject||''}\nBesedilni zapiski:\n${notes||'(ni)'}\n\n${task}\nPiši v slovenščini.`});
    const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'x-api-key':AIKEY.value(),'anthropic-version':'2023-06-01','content-type':'application/json'},body:JSON.stringify({model:process.env.AI_MODEL||'claude-sonnet-5-5',max_tokens:2000,messages:[{role:'user',content}]})});
    const j=await r.json();
    if(!r.ok)throw new Error('AI napaka');
    res.json({text:(j.content||[]).map(x=>x.text||'').join('')});
  }catch(e){
    if(counted)await db.ref(`aiuse/${uid}/${ym}`).transaction(c=>Math.max(0,(c||0)-1));
    res.status(500).json({error:'AI trenutno ni na voljo. Poskusi znova.'});
  }
});
