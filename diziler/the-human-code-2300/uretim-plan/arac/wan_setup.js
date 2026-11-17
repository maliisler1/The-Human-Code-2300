(async()=>{
window.S=ms=>new Promise(r=>setTimeout(r,ms));
const B=(re)=>[...document.querySelectorAll('button')].find(b=>re.test(b.textContent.trim()));window.B=B;
for(let i=0;i<20&&!B(/^Model/);i++)await S(1000);
if(!/Wan 3\.0/.test(B(/^Model/).textContent)){B(/^Model/).click();await S(1500);B(/^Wan 3\.0/).click();await S(1500);}
if(!document.querySelector('input[type=range]')){B(/^Output/).click();await S(1500);}
window.RAW="https://raw.githubusercontent.com/maliisler1/The-Human-Code-2300/uretim-assets/diziler/the-human-code-2300/";
window.setP=(t)=>{const ta=document.querySelector('textarea');Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(ta,t);ta.dispatchEvent(new Event('input',{bubbles:true}));};
window.setDur=(sec)=>{const r=document.querySelector('input[type=range]');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(r,String(sec-4));r.dispatchEvent(new Event('input',{bubbles:true}));r.dispatchEvent(new Event('change',{bubbles:true}));};
window.addFiles=async(paths)=>{const dt=new DataTransfer();for(const p of paths){const b=await fetch(RAW+p+'?v='+Date.now()).then(r=>r.blob());dt.items.add(new File([b],p.split('/').pop(),{type:p.endsWith('mp3')?'audio/mpeg':'image/jpeg'}));}const fi=document.querySelector('input[type=file]');fi.files=dt.files;fi.dispatchEvent(new Event('change',{bubbles:true}));};
window.btn=()=>B(/^Create Video/);
window.refs=()=>document.querySelectorAll('button[aria-label=Remove]').length;
window.COST={5:'630',6:'770',7:'910',8:'1015'};
window.subJob=async(j,ep)=>{const [k,img,sec,pr]=j;document.querySelectorAll('button[aria-label=Remove]').forEach(b=>b.click());await S(1000);setDur(sec);await S(700);await addFiles(['assets/'+img,'assets/b'+ep+'/'+k+'.mp3']);for(let i=0;i<30&&refs()<2;i++)await S(1000);setP(pr);await S(1000);const b=btn();
 if(!/Wan 3\.0/.test(B(/^Model/).textContent)||refs()!==2||!b.textContent.includes(COST[sec])||b.disabled)return k+' HATA refs='+refs()+' '+b.textContent+' dis='+b.disabled;
 b.click();return k+' gönderildi '+new Date().toLocaleTimeString()};
window.WR=window.WR||[];
window.runBatch=async(ep,keys)=>{const J=await fetch(RAW+'uretim-plan/b'+ep+'/lipjobs.json?x='+Date.now()).then(r=>r.json());for(const k of keys){const j=J.find(x=>x[0]===k);const m=await subJob(j,ep);WR.push(m);if(/HATA/.test(m))break;await S(12000);}WR.push('batch bitti')};
window.SETUP_OK=true;
})();
