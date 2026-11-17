import sys,glob,subprocess,numpy as np,os
def ld(f,sr=8000):
    return np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',f,'-vn','-ac','1','-ar',str(sr),'-f','s16le','-'],capture_output=True).stdout,np.int16).astype(float)
def env(x,h=80):
    x=np.abs(x);n=len(x)//h;return x[:n*h].reshape(n,h).mean(1)
lips=sys.argv[1];raws=sys.argv[2:]
L={os.path.basename(f)[:-4]:env(ld(f)) for f in glob.glob(lips+'/*.mp3')}
for r in raws:
    a=ld(r)
    if len(a)<100: print(os.path.basename(r),'SESSIZ',subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',r],capture_output=True,text=True).stdout.strip());continue
    e=env(a);best=[]
    for k,l in L.items():
        if len(l)>len(e): l2=l[:len(e)]
        else: l2=l
        c=np.correlate((e-e.mean())/ (e.std()+1e-9),(l2-l2.mean())/(l2.std()+1e-9),'valid')/len(l2)
        i=int(np.argmax(c));best.append((c[i],k,i*80/8000))
    best.sort(reverse=True);print(os.path.basename(r),[(round(s,2),k,round(o,2)) for s,k,o in best[:2]], round(len(a)/8000,2))
