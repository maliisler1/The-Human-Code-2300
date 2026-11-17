import sys,os,subprocess,runpy,numpy as np
d,script,mp4=sys.argv[1],sys.argv[2],sys.argv[3];os.chdir(d)
real=subprocess.run
class Stop(Exception):pass
def fake(a,*k,**kw):
    if a and a[0]=='ffmpeg': raise Stop
    return real(a,*k,**kw)
subprocess.run=fake;sys.argv=[script,'/tmp/x.mp4'];g={}
try: runpy.run_path(script,run_name='__main__')
except Stop:
    fr=sys.exc_info()[2]
    while fr:
        if 'vo' in fr.tb_frame.f_globals: g=fr.tb_frame.f_globals
        fr=fr.tb_next
subprocess.run=real
def load(f): return np.frombuffer(real(["ffmpeg","-v","error","-i",f,"-ac","1","-ar","16000","-f","s16le","-"],capture_output=True).stdout,dtype=np.int16).astype(float)
def env(x):h=160;n=len(x)//h;return np.sqrt((x[:n*h].reshape(n,h)**2).mean(1))
F=env(load(mp4));bad=0;n=0
for k,t in g['vo']:
    p=[q for q in (f'vo/{k}.wav',f'vo_w/{k}.wav') if os.path.exists(q)][0]
    a=env(load(p))
    if len(F)==0 or t*100>len(F): print("bos",k,t,len(F));continue
    i0=int(t*100)-100;i0=max(i0,0);seg=F[i0:i0+len(a)+200]
    s=(seg-seg.mean())/seg.std();b=(a-a.mean())/a.std();c=np.correlate(s,b,'valid')/len(b);j=c.argmax();off=(max(i0,0)+j)/100-t;n+=1
    if abs(off)>0.05: bad+=1;print('!!',k,round(off,2),round(c[j],2))
print(mp4,'replik',n,'kaymis',bad)
