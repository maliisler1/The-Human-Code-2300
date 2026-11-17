import sys,os,subprocess,json,runpy
d,script=sys.argv[1],sys.argv[2];os.chdir(d)
real=subprocess.run
class Stop(Exception):pass
def fake(a,*k,**kw):
    if a and a[0]=='ffmpeg': raise Stop
    return real(a,*k,**kw)
subprocess.run=fake;sys.argv=[script,'/tmp/x.mp4']
g={}
try: g=runpy.run_path(script,run_name='__main__')
except Stop: 
    import inspect;fr=sys.exc_info()[2]
    while fr:
        if 'vo' in fr.tb_frame.f_globals: g=fr.tb_frame.f_globals
        fr=fr.tb_next
subprocess.run=real
vo=g['vo'];total=g['total'];vdir='vo'
def du(n):
    for p in [f'vo/{n}.wav',f'vo_w/{n}.wav']:
        if os.path.exists(p): return float(real(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',p],capture_output=True,text=True).stdout)
vs=sorted(vo,key=lambda x:x[1]);out=[];prev=0.0;pn='START'
for n,t in vs:
    if t-prev>1.5: out.append((pn,n,round(prev,2),round(t,2),round(t-prev,2)))
    prev=max(prev,t+du(n));pn=n
endv=g.get('vlen',total)-g.get('ET',1)
if endv-prev>1.5: out.append((pn,'END',round(prev,2),round(endv,2),round(endv-prev,2)))
print(d,'total',round(total,1),'gaps',len(out),'sum',round(sum(x[4] for x in out),1))
for x in out: print(x)
json.dump(out,open('/home/claude/gaps_'+os.path.basename(d)+'.json','w'))
