import subprocess,sys,json
C="c6/"
import json as _j;OFF=_j.load(open('off6.json'))
CROP={}
LEN={k:float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'c6/L_{k}.mp4'],capture_output=True,text=True).stdout) for k in OFF}
def dur(k): return float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'vo_w/{k}.wav'],capture_output=True,text=True).stdout)
B=[('b',['B01'],['R1']),('b',['B02'],['M1','P1']),('b',['B03'],['R2']),('l','K1'),('l','A1'),('l','K2'),('b',['B04'],['E1']),('l','K3'),
('b',['B05','B23'],['R3','S1']),('l','L1'),('l','K4'),('b',['B06','B07'],['R4','K5']),('b',['B08'],['K6']),('b',['B09','B10'],['R5','K7']),
('l','MO1'),('l','K8'),('l','AN1'),('l','K9'),('b',['B11'],['R6','P2']),('b',['B12'],['R7']),('l','SI1'),('b',['B12','B21'],['K10','SI2']),
('b',['B13','B14'],['R8','E2']),('b',['B15','B16'],['AN2','MO2','M2']),('b',['B17','B23'],['R9','S2']),('b',['B18','B19'],['R10']),
('l','A2'),('l','K11'),('l','L2'),('b',['B25','B20'],['R11','K12']),('b',['B01','B21'],['R12','SI3'])]
REFS={'B05','B06','B10','B14','B15','B16','B17','B18','B21','B23','B25'}
T=0.35;GAP=0.3;MAXS=5.15
E=[];vo=[];V=T;A=0.0;mark={}
for bi,b in enumerate(B):
    mark[bi]=V-T
    if b[0]=='l':
        k=b[1];d=dur(k);pre=min(0.45,OFF[k]);s=OFF[k]-pre;e=min(LEN[k]-0.02,OFF[k]+d+0.4)
        S=V-T
        if S+pre<A+0.25: # push: hold previous? increase pre
            need=A+0.25-(S+pre);add=min(need,s);pre+=add;s-=add
            if S+pre<A+0.25: print("UYARI cakisma",k,round(A+0.25-(S+pre),2))
        E.append(("L_"+k,round(s,3),round(e,3)));vo.append((k,S+pre));A=S+pre+d;V=S+(e-s)
    else:
        shots,lines=b[1],b[2];S=V-T;t=max(A+GAP,S+0.35)
        for k in lines: d=dur(k);vo.append((k,t));t+=d+GAP;A=t-GAP
        end=max(t+0.05,S+1.6*len(shots)) if lines else S+1.4
        L=end-S;n=len(shots);tot=L+(n-1)*T
        caps=[5.55 if sh in REFS else 9.9 for sh in shots]
        segs=[tot/n]*n
        for _ in range(5):
            over=sum(max(0,sg-c) for sg,c in zip(segs,caps));segs=[min(sg,c) for sg,c in zip(segs,caps)]
            free=[i for i in range(n) if segs[i]<caps[i]-1e-6]
            if over<1e-6 or not free: break
            for i in free: segs[i]+=over/len(free)
        if sum(segs)<tot-0.05: print("UYARI uzun",bi,round(tot-sum(segs),2))
        for sh,sg in zip(shots,segs): o=4.5 if sh in REFS else 0.0; E.append((sh,o,round(o+sg,3)))
        V=S+sum(segs)-(n-1)*T
n=len(E);DL=[e-s for _,s,e in E];ST=[sum(DL[:i])-i*T for i in range(n)]
vlen=sum(DL)-(n-1)*T;ET=1.0;END=9.0;total=vlen-ET+END
DUR={k:dur(k) for k,_ in vo}
vs=sorted(vo,key=lambda x:x[1]);gaps=[(vs[i][0],vs[i+1][0],round(vs[i+1][1]-vs[i][1]-DUR[vs[i][0]],2)) for i in range(len(vs)-1)]
print("sure",round(total,2),"replik",len(vo),"max bosluk",max(g[2] for g in gaps),"min",min(g[2] for g in gaps))
print([g for g in gaps if g[2]>1.0 or g[2]<0.1])
json.dump({"E":E,"vo":vo,"dur":DUR,"total":total,"mark":mark},open("edl6.json","w"))
if len(sys.argv)<2: sys.exit()
bt=lambda bi:mark[bi]
import sys as _s;_s.path.insert(0,'/home/claude');import seri
_KS=vlen-ET-21.0
MUS=[(m[0],m[1],m[2],max(1.0,min(m[3],_KS-m[1]+1.5))) for m in seri.mus(vlen,ET,END,[(bt(18),bt(26)-bt(18))]) if not m[0].endswith('final.wav') and m[1]<_KS-1.0]+[('/home/claude/b01/cues/kapanis.wav',vlen-ET-21.0,0.55,21.0+END)]
a=["ffmpeg","-y","-v","error"]
for f,s,e in E:a+=["-ss",str(s),"-t",str(e-s),"-i",C+f+".mp4"]
a+=["-f","lavfi","-t",str(END),"-i","color=c=black:s=1920x1080:r=24"]
a+=["-f","lavfi","-t",str(total),"-i","anoisesrc=color=brown:amplitude=0.015:r=48000"]
base=n+2
for c,_,_,_ in MUS:a+=["-i",c]
vb=base+len(MUS)
for nm,t in vo:a+=["-i",f"vo_w/{nm}.wav"]
F=[]
for i in range(n):
    F.append(f"[{i}:v]{CROP.get(E[i][0],'')}scale=1920:1080:flags=lanczos:force_original_aspect_ratio=increase,crop=1920:1080,unsharp=5:5:0.5,eq=brightness=0.02:saturation=1.05,setsar=1,fps=24,format=yuv420p,trim=duration={DL[i]:.3f},setpts=PTS-STARTPTS[v{i}]")
font="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
F.append(f"[{n}:v]format=yuv420p,drawtext=fontfile={font}:text='The Human Code\\: 2300':fontsize=78:fontcolor=white:x=(w-tw)/2:y=h/2-110,drawtext=fontfile={font}:text='Bölüm 7 — On Sekiz Kapsül':fontsize=46:fontcolor=0xff5a5a:x=(w-tw)/2:y=h/2+10,drawtext=fontfile={font}:text='Yakında':fontsize=34:fontcolor=white@0.8:x=(w-tw)/2:y=h/2+80,fade=t=in:st=0:d=1[vend]")
p="v0"
for i in range(1,n):
    F.append(f"[{p}][v{i}]xfade=transition=fade:duration={T}:offset={ST[i]:.3f}[x{i}]");p=f"x{i}"
F.append(f"[{p}][vend]xfade=transition=fade:duration={ET}:offset={vlen-ET:.3f},fade=t=in:st=0:d=1.2[vout]")
L=[]
for j,(nm,t) in enumerate(vo):
    ms=int(t*1000);fx=""
    if nm.startswith("G"): fx="asetrate=48000*0.9,aresample=48000,atempo=1.1111,aecho=0.8:0.6:70:0.22,"
    if False: fx="highpass=f=350,lowpass=f=3200,acrusher=bits=10:mix=0.25,"
    F.append(f"[{vb+j}:a]aresample=48000,{fx}aformat=channel_layouts=stereo,adelay={ms}|{ms}[e{j}]");L.append(f"[e{j}]")
F.append(f"{''.join(L)}amix=inputs={len(L)}:normalize=0:duration=longest,apad=whole_dur={total:.2f},atrim=duration={total:.2f},volume=1.7,asplit=2[dlg][sc]")
ML=[]
for k,(c,t0,vol,d) in enumerate(MUS):
    ms=int(max(t0,0)*1000);F.append(f"[{base+k}:a]aresample=48000,aformat=channel_layouts=stereo,aloop=loop=3:size=3072000,atrim=duration={d:.2f},afade=t=in:d={0.05 if 'hiss' in c else 1.2},afade=t=out:st={max(d-2.0,0.5):.2f}:d=2.0,volume={vol},adelay={ms}|{ms}[m{k}]");ML.append(f"[m{k}]")
F.append(f"{''.join(ML)}amix=inputs={len(ML)}:normalize=0:duration=longest,apad=whole_dur={total:.2f},atrim=duration={total:.2f}[mus]")
F.append(f"[{n+1}:a]lowpass=f=400,aformat=channel_layouts=stereo[amb]")
F.append("[mus][amb]amix=inputs=2:normalize=0[bed]")
F.append("[bed][sc]sidechaincompress=threshold=0.05:ratio=2.5:attack=40:release=700[duck]")
F.append("[dlg][duck]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-16:TP=-1.5:LRA=11[aout]")
a+=["-filter_complex",";".join(F),"-map","[vout]","-map","[aout]","-c:v","libx264","-preset","medium","-crf","17","-pix_fmt","yuv420p","-ar","48000","-c:a","aac","-b:a","160k","-movflags","+faststart","-t",f"{total:.2f}",sys.argv[1]]
subprocess.run(a,check=True);print("ok")
