window.sleep=ms=>new Promise(r=>setTimeout(r,ms));
window.RAW='https://raw.githubusercontent.com/maliisler1/the-human-code-2300/uretim-ham/uretim-plan/ruya/';
window.GF='https://raw.githubusercontent.com/maliisler1/the-human-code-2300/uretim-ham/gelen/ruya/frames/';
window.vta=()=>[...document.querySelectorAll('textarea')].find(t=>t.offsetParent);
window.vbtn=txt=>[...document.querySelectorAll('button')].filter(b=>b.offsetParent).find(b=>b.innerText.includes(txt));
window.vchips=()=>[...document.querySelectorAll('button')].filter(b=>b.offsetParent && /^(Image|Audio) \d+$/.test((b.getAttribute('aria-label')||b.textContent).trim())).length;
window.clearRefs=async()=>{ for(let i=0;i<12;i++){ const r=[...document.querySelectorAll('button')].filter(b=>(b.getAttribute('aria-label')||b.textContent).trim()=='Remove'&&b.parentElement&&b.parentElement.offsetParent); if(!r.length)break; r[0].click(); await sleep(400);} return vchips();};
window.setDur=async(sec)=>{ let s=document.querySelector('.toolbox-duration-slider-input'); if(!s){ vbtn('Output').click(); await sleep(900); s=document.querySelector('.toolbox-duration-slider-input');}
 const ar=[...document.querySelectorAll('button,div,span')].filter(e=>e.offsetParent&&e.children.length<=2&&e.textContent.trim()=='16:9'); if(ar.length){ (ar[0].closest('button')||ar[0]).click(); await sleep(300);}
 Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(s,String(sec-4)); s.dispatchEvent(new Event('input',{bubbles:true})); s.dispatchEvent(new Event('change',{bubbles:true})); await sleep(400); document.body.click(); await sleep(300);};
window.setTA=v=>{const ta=vta(); Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(ta,v); ta.dispatchEvent(new Event('input',{bubbles:true}));};
window.vinput=()=>[...document.querySelectorAll('input[type=file]')].find(i=>/mp3|audio/.test(i.accept)&&/jpg|image/.test(i.accept));
window.addFiles=async(files)=>{ for(const f of files){ const inp=vinput(); const n0=vchips(); const dt=new DataTransfer(); dt.items.add(f); inp.files=dt.files; inp.dispatchEvent(new Event('change',{bubbles:true})); for(let i=0;i<25&&vchips()==n0;i++) await sleep(1000);} return vchips();};
window.TAIL=' The character speaks exactly the dialogue in Audio 1 with precise natural lip sync, subtle natural head and eye movement, blinking, breathing, realistic skin, photorealistic live-action family fantasy film, cinematic lighting, 35mm film look. Keep the same face, clothes and setting as Image 1. No text, no subtitles, no music.';
window.shrink=async(blob)=>{ const im=await createImageBitmap(blob); const W=1280,H=Math.round(im.height*1280/im.width); const c=document.createElement('canvas'); c.width=W;c.height=H; c.getContext('2d').drawImage(im,0,0,W,H); return await new Promise(r=>c.toBlob(r,'image/jpeg',0.88));};
window.lipGen=async(imgUrl,audUrl,prompt,sec,name)=>{ await clearRefs(); if(vchips()) return name+' CANTCLEAR'; await setDur(sec); document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true})); await sleep(300);
 const ib=await shrink(await (await fetch(imgUrl)).blob()); const ab=await (await fetch(audUrl)).blob();
 const n=await addFiles([new File([ib],name+'.jpg',{type:'image/jpeg'}),new File([ab],name+'.mp3',{type:'audio/mpeg'})]);
 if(n!=2){ await clearRefs(); return name+' REFS '+n;} setTA(prompt+TAIL); await sleep(500);
 if(!document.body.innerText.includes('Wan 3.0')) return 'MODEL?'; const b0=bal(); vbtn('Create Video').click(); for(let i=0;i<10&&bal()==b0;i++) await sleep(1000); return name+(bal()<b0?' sent':' NOCHARGE');};
window.bal=()=>parseInt(document.body.innerText.slice(0,12).replace(/[^0-9]/g,''));
window.runList=async(L,logName)=>{ window[logName]=[]; for(const [a,img,p,s] of L){ let r; for(let t=0;t<3;t++){ try{ r=await lipGen(img,RAW+'lip/'+a+'.mp3',p,s,a);}catch(e){r='ERR '+a+e} if(r.includes('sent')) break; await sleep(3000);} window[logName].push(r); await sleep(2000);} window[logName].push('done');};
'ml.js loaded';
window.genCount=()=>(document.body.innerText.match(/Generating/g)||[]).length;
window.setupFrame=async()=>{ const cur=[...document.querySelectorAll('button')].filter(b=>b.offsetParent).find(b=>/^(Frame|Reference|Text) to Video/.test(b.innerText)); if(!cur.innerText.startsWith('Frame')){ cur.click(); await sleep(800); [...document.querySelectorAll('button')].find(b=>b.innerText.startsWith('Frame to Video')).click(); await sleep(1200);}
 if(!document.body.innerText.includes('Minimax H3 Fast')){ [...document.querySelectorAll('button')].filter(b=>b.offsetParent).find(b=>b.innerText.startsWith('Model')).click(); await sleep(800); [...document.querySelectorAll('strong')].find(e=>e.textContent.trim()=='Minimax H3 Fast').click(); await sleep(800);} await setDur(10); document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true})); return document.body.innerText.includes('Minimax H3 Fast');};
window.STY=' Photorealistic live-action family fantasy film, real human actors, natural human body movement and subtle facial expressions, realistic skin and hair, cinematic lighting, 35mm film look, shallow depth of field, smooth slow camera movement. Characters do not talk, mouths closed. No text, no subtitles, no music.';
window.frameGen=async(imgUrl,prompt,name)=>{ for(let i=0;i<4;i++){ const r=[...document.querySelectorAll('button')].filter(b=>(b.getAttribute('aria-label')||b.textContent).trim()=='Remove'&&b.parentElement&&b.parentElement.offsetParent); if(!r.length)break; r[0].click(); await sleep(400);}
 if(!document.body.innerText.includes('Add a start frame')) return name+' CANTCLEAR';
 const ib=await shrink(await (await fetch(imgUrl)).blob());
 const orig=HTMLInputElement.prototype.click; window.__picked=null; HTMLInputElement.prototype.click=function(){ if(this.type=='file'){window.__picked=this; return;} return orig.call(this);};
 [...document.querySelectorAll('button')].find(b=>b.innerText.trim()=='Add a start frame').click(); await sleep(600); HTMLInputElement.prototype.click=orig;
 const dt=new DataTransfer(); dt.items.add(new File([ib],name+'.jpg',{type:'image/jpeg'})); window.__picked.files=dt.files; window.__picked.dispatchEvent(new Event('change',{bubbles:true}));
 for(let i=0;i<25&&document.body.innerText.includes('Add a start frame');i++) await sleep(1000);
 if(document.body.innerText.includes('Add a start frame')) return name+' NOFRAME';
 setTA(prompt+STY); await sleep(500); const g0=genCount(); vbtn('Create Video').click(); for(let i=0;i<10&&genCount()==g0;i++) await sleep(1000); return name+(genCount()>g0?' sent':' NOSTART');};
window.runFrames=async(L,logName)=>{ window[logName]=[]; for(const [n,img,p] of L){ let r; for(let t=0;t<3;t++){ try{ r=await frameGen(img,p,n);}catch(e){r='ERR '+n+e} if(r.includes('sent')) break; await sleep(3000);} window[logName].push(r); await sleep(1500);} window[logName].push('done');};
'ml.js loaded2';
window.addFiles=async(files)=>{ const orig=HTMLInputElement.prototype.click; window.__picked=null; HTMLInputElement.prototype.click=function(){ if(this.type=='file'){window.__picked=this; return;} return orig.call(this);};
 const ab=[...document.querySelectorAll('button')].filter(b=>b.offsetParent).find(b=>/Add references/.test(b.innerText)); ab&&ab.click(); await sleep(600); HTMLInputElement.prototype.click=orig;
 const inp=window.__picked||vinput(); const dt=new DataTransfer(); files.forEach(f=>dt.items.add(f)); inp.files=dt.files; inp.dispatchEvent(new Event('change',{bubbles:true}));
 for(let i=0;i<30&&vchips()<files.length;i++) await sleep(1000); return vchips();};
window.loadList=async(name,skip=0)=>{ let L=await (await fetch(RAW+name+'?'+Date.now())).json(); return L.map(([a,i,p,s])=>[a,i.replace('GF:',GF),p,s]).slice(skip);};
'ml.js loaded3';
window.REFC={
mira:'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-nano-banana-2.1/images/37017cd8-9271-4c55-b265-feea04856731/7748874f-f501-4f97-a104-2f2871f7a74a/Photorealistic_character_reference_portrait_of_the_same_girl.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMzUwZmY5ZDRjMmE2MjdhMyIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5NTE5MzA0NH0.PxjYEsTHZNhZfYzJL9_ACemHUEKfuOF7Qbn_-_E_dOY',
elias:'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-nano-banana-2.1/images/2880560c-7ae9-4e4d-b0b2-2e462ed9c971/ddf28806-3608-4548-a311-4ded1cff6b33/Photorealistic_character_reference_portrait__kind_old_archiv.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNTAzOTg0ZjgyYzQ0ZTA5MSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5NTIyNjg3Mn0.0kYmCpDpqdty3VSoCXMabNqFkLSQKATdWlcDnnx9sV8',
theo:'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-nano-banana-2.1/images/195578b9-663c-41c2-9952-305def5c758f/a077070e-7159-43d9-b9e2-3b903b982c1c/Photorealistic_character_reference_portrait__14_year_old_boy.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYTE3Nzk2MDhmMzlhMjM1ZSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5NTIwMjU2OH0.IN5ZRVigDoIpGuF1r075Jv-FuhBdcuswLEX4-nH6vs0',
anna:'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-nano-banana-2.1/images/88f8d828-9edb-4dd5-b00c-e258cc39cdfc/4248eb56-c213-4fca-b26f-5a365c2b3e0e/Photorealistic_character_reference_portrait__the_mother_of_t.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMGM0Yzc4NTkzZmU4OWNhMyIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5NTIzNDEzN30.WKhkjdB5YgVR-MQHNwu2Bb-mod38cEx2k5WDDdxhSqw'};
window.ichips=()=>[...document.querySelectorAll('button')].filter(b=>b.offsetParent && /^Image \d+$/.test((b.getAttribute('aria-label')||b.textContent).trim())).length;
window.setupImage=async()=>{ [...document.querySelectorAll('[role=tab]')].find(t=>t.textContent.trim()=='Image').click(); await sleep(1500);
 if(!document.body.innerText.includes('Nano Banana 2\n')){ [...document.querySelectorAll('button')].filter(b=>b.offsetParent).find(b=>b.innerText.startsWith('Model')).click(); await sleep(800); [...document.querySelectorAll('strong')].find(e=>e.textContent.trim()=='Nano Banana 2').click(); await sleep(800);} return document.body.innerText.includes('Nano Banana 2');};
window.imgGen=async(key,prompt,refs)=>{ for(let i=0;i<6;i++){ const r=[...document.querySelectorAll('button')].filter(b=>(b.getAttribute('aria-label')||b.textContent).trim()=='Remove'&&b.parentElement&&b.parentElement.offsetParent); if(!r.length)break; r[0].click(); await sleep(400);}
 if(refs.length){ const files=[]; for(const k of refs){ files.push(new File([await shrink(await (await fetch(REFC[k])).blob())],k+'.jpg',{type:'image/jpeg'})); }
  const orig=HTMLInputElement.prototype.click; window.__picked=null; HTMLInputElement.prototype.click=function(){ if(this.type=='file'){window.__picked=this; return;} return orig.call(this);};
  [...document.querySelectorAll('button')].filter(b=>b.offsetParent).find(b=>/Add references/.test(b.innerText)).click(); await sleep(600); HTMLInputElement.prototype.click=orig;
  const dt=new DataTransfer(); files.forEach(f=>dt.items.add(f)); window.__picked.files=dt.files; window.__picked.dispatchEvent(new Event('change',{bubbles:true}));
  for(let i=0;i<30&&ichips()<refs.length;i++) await sleep(1000); if(ichips()<refs.length) return key+' REFS '+ichips(); }
 setTA((key+' | '+prompt).slice(0,500)); await sleep(400); const g0=genCount(); vbtn('Create Image').click(); for(let i=0;i<10&&genCount()==g0;i++) await sleep(1000); return key+' sent';};
window.runImgs=async(L,logName)=>{ window[logName]=[]; for(const [k,p,r] of L){ let x; for(let t=0;t<3;t++){ try{ x=await imgGen(k,p,r);}catch(e){x='ERR '+k+e} if(x.includes('sent')) break; await sleep(3000);} window[logName].push(x); await sleep(1500);} window[logName].push('done');};
'ml.js loaded4';

window.outInfo=()=>document.body.innerText.split('Output')[1]?.slice(0,20).replace(/\n/g,' ');
