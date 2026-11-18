(async()=>{
window.S=ms=>new Promise(r=>setTimeout(r,ms));
const B=(re)=>[...document.querySelectorAll('button')].find(b=>re.test(b.textContent.trim()));window.B=B;
for(let i=0;i<20&&!B(/^Model/);i++)await S(1000);
window.RAW="https://raw.githubusercontent.com/maliisler1/The-Human-Code-2300/uretim-assets/diziler/the-human-code-2300/";
if(!/Minimax H3 Fast/.test(B(/^Model/).textContent)){B(/^Model/).click();await S(1500);B(/^Minimax H3 Fast/).click();await S(1500);}
if(!document.querySelector('input[type=range]')){B(/^Output/).click();await S(1500);}
window.setDur=(sec)=>{const r=document.querySelector('input[type=range]');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(r,String(sec-4));r.dispatchEvent(new Event('input',{bubbles:true}));r.dispatchEvent(new Event('change',{bubbles:true}));};
window.setP=(t)=>{const ta=document.querySelector('textarea');Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(ta,t);ta.dispatchEvent(new Event('input',{bubbles:true}));};
window.addFiles=async(paths)=>{const dt=new DataTransfer();for(const p of paths){const b=await fetch(RAW+p+'?v='+Date.now()).then(r=>r.blob());dt.items.add(new File([b],p.split('/').pop(),{type:'image/jpeg'}));}const fi=document.querySelector('input[type=file]');fi.files=dt.files;fi.dispatchEvent(new Event('change',{bubbles:true}));};
window.refs=()=>document.querySelectorAll('button[aria-label=Remove]').length;
window.MR=window.MR||[];
window.mmJob=async(k,img,pr)=>{document.querySelectorAll('button[aria-label=Remove]').forEach(b=>b.click());await S(1000);setDur(10);await S(700);if(img){await addFiles(['assets/'+img]);for(let i=0;i<30&&refs()<1;i++)await S(1000);}setP(pr);await S(1200);const b=B(/^Create Video/);
 if(!/Minimax H3 Fast/.test(B(/^Model/).textContent)||!/^Create Video0/.test(b.textContent)||b.disabled||(img&&refs()!==1))return k+' HATA '+b.textContent+' refs='+refs();
 b.click();return k+' gönderildi '+new Date().toLocaleTimeString()};
window.mmBatch=async(file,keys)=>{const J=await fetch(RAW+file+'?x='+Date.now()).then(r=>r.json());for(const k of keys){MR.push(await mmJob(k,J[k][0],J[k][1]));await S(8000);}MR.push('bitti')};
})();
