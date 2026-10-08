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
